// app/api/learning/route.ts — persisted learning progress + adaptive
// recommendations for the signed-in learner (Pillar E1/E3).

import { NextResponse } from 'next/server';
import { authorizeApi } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { activeStreak, computeCourseProgress, rankNextLessons } from '@/lib/learning-progress';
import { getActivityDates, listEnrollments } from '@/lib/learning-store';
import { getCourse, getCourses } from '@/lib/pgdm/learning-adapter';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const today = new Date().toISOString().slice(0, 10);
        const [enrollments, activityDates] = await Promise.all([
            listEnrollments(auth.user.id),
            getActivityDates(auth.user.id),
        ]);

        const lessonsByCourse = await prisma.lessonProgress.findMany({
            where: { userId: auth.user.id },
            select: { courseSlug: true, lessonSlug: true, completed: true, secondsSpent: true, completedAt: true },
        });

        const courses = getCourses();
        const enrolledSlugs = new Set(enrollments.map((e) => e.courseSlug));

        const progress = enrollments
            .map((enrollment) => {
                const course = getCourse(enrollment.courseSlug);
                if (!course) return null;
                const states = lessonsByCourse
                    .filter((row) => row.courseSlug === enrollment.courseSlug)
                    .map((row) => ({
                        lessonSlug: row.lessonSlug,
                        completed: row.completed,
                        secondsSpent: row.secondsSpent,
                        completedAt: row.completedAt ? row.completedAt.toISOString() : null,
                    }));
                return {
                    status: enrollment.status,
                    lastActivityAt: enrollment.lastActivityAt,
                    ...computeCourseProgress(course, states),
                };
            })
            .filter((value): value is NonNullable<typeof value> => value !== null);

        // Recommendations: rank the next lessons in the learner's most recently
        // touched course; fall back to the first (foundational) course.
        const recentCourseSlug =
            enrollments.find((e) => !getCourse(e.courseSlug)?.lessons.every((l) =>
                lessonsByCourse.some((s) => s.courseSlug === e.courseSlug && s.lessonSlug === l.slug && s.completed)))?.courseSlug
            ?? enrollments[0]?.courseSlug
            ?? courses[0]?.slug;

        const recommendationCourse = recentCourseSlug ? getCourse(recentCourseSlug) : undefined;
        const recommendationStates = recommendationCourse
            ? lessonsByCourse
                .filter((row) => row.courseSlug === recommendationCourse.slug)
                .map((row) => ({
                    lessonSlug: row.lessonSlug,
                    completed: row.completed,
                    secondsSpent: row.secondsSpent,
                    completedAt: row.completedAt ? row.completedAt.toISOString() : null,
                }))
            : [];

        const recommendations = recommendationCourse
            ? rankNextLessons(recommendationCourse, recommendationStates, {
                recentTags: recommendationCourse.tags,
                completedCourses: Array.from(enrolledSlugs),
                limit: 3,
            }).map((rec) => ({ ...rec, courseSlug: recommendationCourse.slug, courseTitle: recommendationCourse.title }))
            : [];

        return NextResponse.json({
            streak: activeStreak(activityDates, today),
            enrolled: progress,
            recommendations,
        });
    } catch (error) {
        logger.error('Error loading learning progress', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
