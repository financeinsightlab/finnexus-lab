// Signed-in learner progress and adaptive recommendations. This response is
// user-specific and must never be cached by Next.js or an intermediary.

import { NextResponse } from 'next/server';
import { authorizeApi } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { activeStreak, computeCourseProgress, rankNextLessons, type LessonProgressState } from '@/lib/learning-progress';
import { getActivityDates, listEnrollments } from '@/lib/learning-store';
import { getCourses } from '@/lib/pgdm/learning-adapter';
import { resolveLearningCourse } from '@/lib/learning-courses';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const privateHeaders = { 'Cache-Control': 'private, no-store' };

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) {
        auth.response.headers.set('Cache-Control', 'private, no-store');
        return auth.response;
    }

    try {
        const today = new Date().toISOString().slice(0, 10);
        const [enrollments, activityDates, lessonsByCourse] = await Promise.all([
            listEnrollments(auth.user.id),
            getActivityDates(auth.user.id),
            prisma.lessonProgress.findMany({
                where: { userId: auth.user.id },
                select: { courseSlug: true, lessonSlug: true, completed: true, secondsSpent: true, completedAt: true },
            }),
        ]);

        const fallbackSlug = getCourses()[0]?.slug;
        const courseSlugs = [...new Set([...enrollments.map((enrollment) => enrollment.courseSlug), ...(fallbackSlug ? [fallbackSlug] : [])])];
        const resolved = await Promise.all(courseSlugs.map(async (slug) => [slug, await resolveLearningCourse(slug).catch(() => undefined)] as const));
        const courseBySlug = new Map(resolved.filter((entry): entry is readonly [string, NonNullable<(typeof entry)[1]>] => Boolean(entry[1])));

        const statesFor = (courseSlug: string): LessonProgressState[] => lessonsByCourse
            .filter((row) => row.courseSlug === courseSlug)
            .map((row) => ({
                lessonSlug: row.lessonSlug,
                completed: row.completed,
                secondsSpent: row.secondsSpent,
                completedAt: row.completedAt ? row.completedAt.toISOString() : null,
            }));

        const progress = enrollments.flatMap((enrollment) => {
            const course = courseBySlug.get(enrollment.courseSlug);
            if (!course) return [];
            return [{
                status: enrollment.status,
                lastActivityAt: enrollment.lastActivityAt,
                ...computeCourseProgress(course, statesFor(course.slug)),
            }];
        });

        const recentEnrollment = enrollments.find((enrollment) => {
            const course = courseBySlug.get(enrollment.courseSlug);
            return course && !course.lessons.every((lesson) => lessonsByCourse.some(
                (state) => state.courseSlug === enrollment.courseSlug && state.lessonSlug === lesson.slug && state.completed,
            ));
        }) ?? enrollments[0];
        const recommendationCourse = (recentEnrollment ? courseBySlug.get(recentEnrollment.courseSlug) : undefined)
            ?? (fallbackSlug ? courseBySlug.get(fallbackSlug) : undefined);
        const recommendations = recommendationCourse
            ? rankNextLessons(recommendationCourse, statesFor(recommendationCourse.slug), {
                recentTags: recommendationCourse.tags,
                completedCourses: enrollments.filter((enrollment) => enrollment.status === 'COMPLETED').map((enrollment) => enrollment.courseSlug),
                limit: 3,
            }).map((recommendation) => ({
                ...recommendation,
                courseSlug: recommendationCourse.slug,
                courseTitle: recommendationCourse.title,
            }))
            : [];

        return NextResponse.json({
            streak: activeStreak(activityDates, today),
            enrolled: progress,
            recommendations,
        }, { headers: privateHeaders });
    } catch (error) {
        logger.error('Error loading learning progress', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500, headers: privateHeaders });
    }
}
