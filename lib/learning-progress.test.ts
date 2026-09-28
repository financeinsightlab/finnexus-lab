import { describe, expect, it } from 'vitest';
import {
    activeStreak,
    computeCourseProgress,
    prerequisitesMet,
    rankNextLessons,
    type CourseDefinition,
    type LessonProgressState,
} from '@/lib/learning-progress';

const course: CourseDefinition = {
    slug: 'analyst-foundations',
    title: 'Analyst Foundations',
    lessons: [
        { slug: 'l1', title: 'Spreadsheet DNA', minutes: 20, weight: 3, tags: ['excel'] },
        { slug: 'l2', title: 'SQL Select', minutes: 30, prerequisites: ['l1'], weight: 2, tags: ['sql'] },
        { slug: 'l3', title: 'SQL Joins', minutes: 40, prerequisites: ['l2'], weight: 1, tags: ['sql'] },
        { slug: 'l4', title: 'Dashboarding', minutes: 50, prerequisites: ['l1'], weight: 1, tags: ['bi'] },
    ],
};

const state = (over: Partial<LessonProgressState> & { lessonSlug: string }): LessonProgressState => ({
    completed: false,
    secondsSpent: 0,
    completedAt: null,
    ...over,
});

describe('computeCourseProgress', () => {
    it('reports percent, seconds and the first unfinished lesson', () => {
        const progress = computeCourseProgress(course, [
            state({ lessonSlug: 'l1', completed: true, secondsSpent: 600 }),
            state({ lessonSlug: 'l2', secondsSpent: 120 }),
        ]);
        expect(progress.totalLessons).toBe(4);
        expect(progress.completedLessons).toBe(1);
        expect(progress.percent).toBe(25);
        expect(progress.secondsSpent).toBe(720);
        expect(progress.nextLessonSlug).toBe('l2');
        expect(progress.isComplete).toBe(false);
    });

    it('flags completion when every lesson is done', () => {
        const progress = computeCourseProgress(
            course,
            course.lessons.map((l) => state({ lessonSlug: l.slug, completed: true, secondsSpent: 60 })),
        );
        expect(progress.percent).toBe(100);
        expect(progress.isComplete).toBe(true);
        expect(progress.nextLessonSlug).toBeNull();
    });

    it('ignores unknown slugs and an empty-course edge case', () => {
        const progress = computeCourseProgress(
            { slug: 'x', title: 'X', lessons: [] },
            [state({ lessonSlug: 'ghost' })],
        );
        expect(progress.percent).toBe(0);
        expect(progress.isComplete).toBe(false);
    });
});

describe('prerequisitesMet', () => {
    it('accepts a Set or array of completed slugs', () => {
        const lesson = course.lessons[1];
        expect(prerequisitesMet(lesson, ['l1'])).toBe(true);
        expect(prerequisitesMet(lesson, new Set(['l1']))).toBe(true);
        expect(prerequisitesMet(lesson, [])).toBe(false);
    });

    it('treats a lesson with no prerequisites as met', () => {
        expect(prerequisitesMet(course.lessons[0], [])).toBe(true);
    });
});

describe('rankNextLessons', () => {
    it('never proposes a lesson whose prerequisites are unmet', () => {
        const ranked = rankNextLessons(course, [], { limit: 10 });
        const slugs = ranked.map((r) => r.lesson.slug);
        expect(slugs).toContain('l1');
        expect(slugs).not.toContain('l3'); // needs l2
    });

    it('prefers lessons matching recent activity', () => {
        const ranked = rankNextLessons(course, [state({ lessonSlug: 'l1', completed: true })], {
            recentTags: ['bi'],
            limit: 1,
        });
        expect(ranked[0].lesson.slug).toBe('l4');
        expect(ranked[0].reason).toMatch(/recent activity/i);
    });

    it('excludes completed lessons', () => {
        const ranked = rankNextLessons(course, [state({ lessonSlug: 'l1', completed: true })], { limit: 10 });
        expect(ranked.map((r) => r.lesson.slug)).not.toContain('l1');
    });
});

describe('activeStreak', () => {
    it('counts consecutive days ending today', () => {
        expect(activeStreak(['2026-09-26', '2026-09-27', '2026-09-28'], '2026-09-28')).toBe(3);
    });

    it('lets a streak end yesterday when today has no activity yet', () => {
        expect(activeStreak(['2026-09-26', '2026-09-27'], '2026-09-28')).toBe(2);
    });

    it('returns 0 for a broken or empty history', () => {
        expect(activeStreak([], '2026-09-28')).toBe(0);
        expect(activeStreak(['2026-09-20'], '2026-09-28')).toBe(0);
    });
});
