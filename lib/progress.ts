// lib/progress.ts — persisted-progress + adaptive learning core
//
// Pillar E1 + E3. The *storage* of progress lives in Prisma (see
// `Enrollment`/`LessonProgress`), but all the interesting decisions — how far
// through a track is a learner, what should they do next, what should they
// review today — are pure functions over plain records. That makes them
// testable and keeps the DB layer dumb.
//
// Nothing here calls the network or the database. Given a list of lesson
// completions it answers: "percent done?", "what's next?", "what's due for
// review?".

export interface LessonMeta {
    slug: string;
    title: string;
    /** Order within the track (ascending). */
    order: number;
    /** Optional prerequisite lesson slugs. */
    requires?: string[];
}

export interface LessonCompletion {
    lessonSlug: string;
    /** 0–100 best score for the lesson, or null when simply marked read. */
    score: number | null;
    completedAt: Date | string;
}

export interface TrackProgress {
    trackSlug: string;
    totalLessons: number;
    completedLessons: number;
    /** 0–100, rounded to one decimal. */
    percent: number;
    /** Average best score across scored lessons, or null when none scored. */
    averageScore: number | null;
}

function toTime(value: Date | string): number {
    return value instanceof Date ? value.getTime() : new Date(value).getTime();
}

function round(value: number, decimals: number): number {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
}

/** Progress summary for one track given its lessons and the user's completions. */
export function summarizeTrack(
    trackSlug: string,
    lessons: readonly LessonMeta[],
    completions: readonly LessonCompletion[],
): TrackProgress {
    const completed = new Set(completions.map((c) => c.lessonSlug));
    const completedLessons = lessons.filter((lesson) => completed.has(lesson.slug)).length;
    const totalLessons = lessons.length;

    const scores = completions
        .map((c) => c.score)
        .filter((score): score is number => typeof score === 'number');

    return {
        trackSlug,
        totalLessons,
        completedLessons,
        percent: totalLessons === 0 ? 0 : round((completedLessons / totalLessons) * 100, 1),
        averageScore: scores.length === 0
            ? null
            : round(scores.reduce((acc, value) => acc + value, 0) / scores.length, 1),
    };
}

/**
 * The next lesson to attempt: the lowest-ordered, not-yet-completed lesson whose
 * prerequisites are all satisfied. Returns null when the track is finished or
 * every remaining lesson is blocked on a missing prerequisite.
 */
export function nextLesson(
    lessons: readonly LessonMeta[],
    completions: readonly LessonCompletion[],
): LessonMeta | null {
    const completed = new Set(completions.map((c) => c.lessonSlug));
    const ordered = [...lessons].sort((a, b) => a.order - b.order);

    for (const lesson of ordered) {
        if (completed.has(lesson.slug)) continue;
        const ready = (lesson.requires ?? []).every((slug) => completed.has(slug));
        if (ready) return lesson;
    }
    return null;
}

export interface ReviewItem {
    lessonSlug: string;
    /** Days since the lesson was last completed. */
    daysSince: number;
    /** Recommended days to wait before this review (spaced repetition). */
    intervalDays: number;
    /** True when the interval has elapsed and it is worth reviewing now. */
    due: boolean;
}

/**
 * A lightweight, SM-2-inspired spaced-repetition schedule. Strong scores earn a
 * longer interval; weak scores come back sooner. No state is required beyond the
 * completion record, so the schedule is fully reproducible.
 */
export function reviewQueue(
    completions: readonly LessonCompletion[],
    now: Date = new Date(),
): ReviewItem[] {
    const intervals = [1, 3, 7, 21, 45];

    return completions
        .map((completion) => {
            const daysSince = Math.max(0, Math.floor((now.getTime() - toTime(completion.completedAt)) / 86_400_000));
            const score = completion.score ?? 60; // un-scored completions start gentle
            // 0 → interval 1; 100 → interval 45.
            const bucket = score >= 90 ? 4 : score >= 75 ? 3 : score >= 60 ? 2 : score >= 40 ? 1 : 0;
            const intervalDays = intervals[bucket];
            return {
                lessonSlug: completion.lessonSlug,
                daysSince,
                intervalDays,
                due: daysSince >= intervalDays,
            };
        })
        .sort((a, b) => Number(b.due) - Number(a.due) || b.daysSince - a.daysSince);
}

/** Best score per lesson, keeping the most recent completion as the tiebreak. */
export function bestScores(completions: readonly LessonCompletion[]): Map<string, number> {
    const best = new Map<string, number>();
    for (const completion of completions) {
        if (typeof completion.score !== 'number') continue;
        const current = best.get(completion.lessonSlug);
        if (current === undefined || completion.score > current) {
            best.set(completion.lessonSlug, completion.score);
        }
    }
    return best;
}
