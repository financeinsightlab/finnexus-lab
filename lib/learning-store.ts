// lib/learning-store.ts — persisted learning progress (Pillar E1)
//
// Thin persistence layer over the `Enrollment` / `LessonProgress` tables. The
// rules (percentages, next lesson, streaks) live in `lib/learning-progress.ts`
// so they stay testable; this module only talks to the database.

import { prisma } from '@/lib/prisma';
import {
    computeCourseProgress,
    type CourseDefinition,
    type CourseProgress,
    type LessonProgressState,
} from '@/lib/learning-progress';

export interface RecordLessonInput {
    completed?: boolean;
    secondsSpent?: number;
}

/** Upsert a lesson-progress row and bump the parent enrollment's activity. */
export async function recordLessonProgress(
    userId: string,
    courseSlug: string,
    lessonSlug: string,
    input: RecordLessonInput = {},
) {
    const now = new Date();
    const lesson = await prisma.lessonProgress.upsert({
        where: { userId_courseSlug_lessonSlug: { userId, courseSlug, lessonSlug } },
        create: {
            userId,
            courseSlug,
            lessonSlug,
            completed: input.completed ?? false,
            secondsSpent: Math.max(0, input.secondsSpent ?? 0),
            completedAt: input.completed ? now : null,
        },
        update: {
            ...(input.completed !== undefined ? { completed: input.completed, completedAt: input.completed ? now : null } : {}),
            ...(input.secondsSpent !== undefined ? { secondsSpent: Math.max(0, input.secondsSpent) } : {}),
        },
    });

    await prisma.enrollment.upsert({
        where: { userId_courseSlug: { userId, courseSlug } },
        create: { userId, courseSlug, status: 'ACTIVE', lastActivityAt: now },
        update: { lastActivityAt: now },
    });

    return lesson;
}

export async function enroll(userId: string, courseSlug: string, trackSlug?: string) {
    return prisma.enrollment.upsert({
        where: { userId_courseSlug: { userId, courseSlug } },
        create: { userId, courseSlug, trackSlug, status: 'ACTIVE' },
        update: { lastActivityAt: new Date() },
    });
}

export async function listEnrollments(userId: string) {
    return prisma.enrollment.findMany({
        where: { userId },
        orderBy: { lastActivityAt: 'desc' },
    });
}

export async function getLessonStates(userId: string, courseSlug: string): Promise<LessonProgressState[]> {
    const rows = await prisma.lessonProgress.findMany({ where: { userId, courseSlug } });
    return rows.map((row) => ({
        lessonSlug: row.lessonSlug,
        completed: row.completed,
        secondsSpent: row.secondsSpent,
        completedAt: row.completedAt ? row.completedAt.toISOString() : null,
    }));
}

/**
 * Lesson progress is deliberately not the same as course completion. A course
 * is only marked complete by the final-assessment route after every published
 * lesson is complete and the learner passes its CMS-managed final test.
 */
export async function getCourseProgressForUser(
  userId: string,
  course: CourseDefinition,
): Promise<CourseProgress> {
  const states = await getLessonStates(userId, course.slug);
  return computeCourseProgress(course, states);
}

/** Distinct ISO activity dates (YYYY-MM-DD) for streak maths. */
export async function getActivityDates(userId: string): Promise<string[]> {
    const rows = await prisma.lessonProgress.findMany({
        where: { userId },
        select: { updatedAt: true },
        orderBy: { updatedAt: 'desc' },
        take: 400,
    });
    const days = new Set(rows.map((r) => r.updatedAt.toISOString().slice(0, 10)));
    return Array.from(days);
}
