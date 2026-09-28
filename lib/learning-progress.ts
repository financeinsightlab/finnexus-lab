// lib/learning-progress.ts — pure learning-progress & adaptive recommendation core
// (Pillar E1 persistence math + Pillar E3 adaptive next-lesson engine)
//
// All functions here are dependency-light and deterministic so they can be unit
// tested without a database. The DB store (`lib/learning-store.ts`) persists the
// inputs/outputs; this module owns the *rules*.

export interface LessonDefinition {
    slug: string;
    title: string;
    /** Estimated minutes — used to budget a study session. */
    minutes?: number;
    /** Slugs that should be completed before this lesson. */
    prerequisites?: string[];
    /** Higher = more foundational; used as a tie-breaker. */
    weight?: number;
    tags?: string[];
}

export interface CourseDefinition {
    slug: string;
    title: string;
    trackSlug?: string;
    lessons: LessonDefinition[];
    tags?: string[];
}

export interface LessonProgressState {
    lessonSlug: string;
    completed: boolean;
    secondsSpent: number;
    completedAt?: string | null;
}

export interface CourseProgress {
    courseSlug: string;
    totalLessons: number;
    completedLessons: number;
    /** 0–100, rounded to one decimal. */
    percent: number;
    secondsSpent: number;
    isComplete: boolean;
    /** Slug of the first uncompleted lesson in course order, or null. */
    nextLessonSlug: string | null;
}

function asSet(values: ReadonlySet<string> | readonly string[]): Set<string> {
    return values instanceof Set ? (values as Set<string>) : new Set(values);
}

/**
 * Compute progress for a single course given the user's lesson states.
 * Unknown lesson slugs in `states` are ignored (forward-compatible).
 */
export function computeCourseProgress(
    course: CourseDefinition,
    states: readonly LessonProgressState[],
): CourseProgress {
    const bySlug = new Map(states.map((s) => [s.lessonSlug, s]));
    let completed = 0;
    let seconds = 0;
    let nextLessonSlug: string | null = null;

    for (const lesson of course.lessons) {
        const state = bySlug.get(lesson.slug);
        if (state?.completed) {
            completed += 1;
            seconds += Math.max(0, state.secondsSpent || 0);
        } else {
            seconds += Math.max(0, state?.secondsSpent || 0);
            if (nextLessonSlug === null) nextLessonSlug = lesson.slug;
        }
    }

    const total = course.lessons.length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 1000) / 10;

    return {
        courseSlug: course.slug,
        totalLessons: total,
        completedLessons: completed,
        percent,
        secondsSpent: seconds,
        isComplete: total > 0 && completed === total,
        nextLessonSlug,
    };
}

/** True when every prerequisite of `lesson` is in `completed`. */
export function prerequisitesMet(
    lesson: LessonDefinition,
    completed: ReadonlySet<string> | readonly string[],
): boolean {
    const done = asSet(completed);
    return (lesson.prerequisites ?? []).every((p) => done.has(p));
}

export interface RecommendationContext {
    /** Tags the learner has recently engaged with (most-weighted first). */
    recentTags?: string[];
    /** Titles/tags of courses already completed — lightly de-prioritised. */
    completedCourses?: string[];
    /** Max items to return. */
    limit?: number;
}

export interface LessonRecommendation {
    lesson: LessonDefinition;
    score: number;
    /** Human-readable reason, safe to surface in the UI. */
    reason: string;
}

/**
 * Adaptive next-lesson ranking (Pillar E3).
 *
 * Rules, in order of influence:
 *   1. A lesson is only eligible if its prerequisites are met.
 *   2. Already-completed lessons are excluded.
 *   3. Lessons whose tags match the learner's recent activity rank higher.
 *   4. Foundational lessons (higher `weight`) break ties so learners build up.
 *   5. The first eligible lesson in course order is always a safe fallback.
 */
export function rankNextLessons(
    course: CourseDefinition,
    states: readonly LessonProgressState[],
    context: RecommendationContext = {},
): LessonRecommendation[] {
    const completed = new Set(states.filter((s) => s.completed).map((s) => s.lessonSlug));
    const recentTags = new Set((context.recentTags ?? []).map((t) => t.toLowerCase()));
    const limit = context.limit ?? 3;

    const scored: LessonRecommendation[] = course.lessons
        .filter((lesson) => !completed.has(lesson.slug) && prerequisitesMet(lesson, completed))
        .map((lesson) => {
            const tags = (lesson.tags ?? []).map((t) => t.toLowerCase());
            const affinity = tags.filter((t) => recentTags.has(t)).length;
            const weight = lesson.weight ?? 0;
            const score = affinity * 10 + weight;
            const reason = affinity > 0
                ? 'Matches your recent activity'
                : weight > 0
                    ? 'Builds on your foundations'
                    : 'Next in sequence';
            return { lesson, score, reason };
        });

    return scored
        .sort((a, b) => b.score - a.score || a.lesson.title.localeCompare(b.lesson.title))
        .slice(0, Math.max(0, limit));
}

/**
 * Streak of consecutive days (ending today or yesterday) with recorded activity.
 * `activityDates` are ISO date strings (YYYY-MM-DD); duplicates are fine.
 */
export function activeStreak(activityDates: readonly string[], today: string): number {
    if (activityDates.length === 0) return 0;
    const days = new Set(activityDates);
    const cursor = new Date(`${today}T00:00:00Z`);
    if (Number.isNaN(cursor.getTime())) return 0;

    const key = (d: Date) => d.toISOString().slice(0, 10);
    // Allow the streak to start yesterday if the learner hasn't studied today yet.
    if (!days.has(key(cursor))) {
        cursor.setUTCDate(cursor.getUTCDate() - 1);
        if (!days.has(key(cursor))) return 0;
    }

    let streak = 0;
    while (days.has(key(cursor))) {
        streak += 1;
        cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    return streak;
}
