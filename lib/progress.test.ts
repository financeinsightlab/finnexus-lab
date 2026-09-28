import { describe, expect, it } from 'vitest';
import {
    bestScores,
    nextLesson,
    reviewQueue,
    summarizeTrack,
    type LessonMeta,
} from './progress';

const lessons: LessonMeta[] = [
    { slug: 'l1', title: 'Intro', order: 1 },
    { slug: 'l2', title: 'Core', order: 2, requires: ['l1'] },
    { slug: 'l3', title: 'Advanced', order: 3, requires: ['l2'] },
];

describe('summarizeTrack', () => {
    it('computes percent and average score', () => {
        const summary = summarizeTrack('t', lessons, [
            { lessonSlug: 'l1', score: 90, completedAt: new Date() },
            { lessonSlug: 'l2', score: 70, completedAt: new Date() },
        ]);
        expect(summary.totalLessons).toBe(3);
        expect(summary.completedLessons).toBe(2);
        expect(summary.percent).toBeCloseTo(66.7);
        expect(summary.averageScore).toBe(80);
    });

    it('handles an empty track', () => {
        const summary = summarizeTrack('empty', [], []);
        expect(summary.percent).toBe(0);
        expect(summary.averageScore).toBeNull();
    });
});

describe('nextLesson', () => {
    it('returns the first incomplete, unlocked lesson', () => {
        expect(nextLesson(lessons, [])?.slug).toBe('l1');
        expect(nextLesson(lessons, [{ lessonSlug: 'l1', score: 80, completedAt: new Date() }])?.slug).toBe('l2');
    });

    it('returns null when everything is done', () => {
        const done = lessons.map((l) => ({ lessonSlug: l.slug, score: 80, completedAt: new Date() }));
        expect(nextLesson(lessons, done)).toBeNull();
    });

    it('skips lessons whose prerequisites are unmet', () => {
        const gated: LessonMeta[] = [
            { slug: 'a', title: 'A', order: 1, requires: ['z'] },
            { slug: 'b', title: 'B', order: 2 },
        ];
        expect(nextLesson(gated, [])?.slug).toBe('b');
    });
});

describe('reviewQueue', () => {
    it('marks items due once their interval has elapsed', () => {
        const now = new Date('2026-02-01T00:00:00Z');
        const queue = reviewQueue(
            [
                { lessonSlug: 'old', score: 95, completedAt: new Date('2025-12-01T00:00:00Z') },
                { lessonSlug: 'new', score: 95, completedAt: new Date('2026-01-31T00:00:00Z') },
            ],
            now,
        );
        const old = queue.find((q) => q.lessonSlug === 'old');
        const fresh = queue.find((q) => q.lessonSlug === 'new');
        expect(old?.due).toBe(true);
        expect(fresh?.due).toBe(false);
    });
});

describe('bestScores', () => {
    it('keeps the maximum score per lesson', () => {
        const best = bestScores([
            { lessonSlug: 'l1', score: 50, completedAt: new Date() },
            { lessonSlug: 'l1', score: 88, completedAt: new Date() },
            { lessonSlug: 'l2', score: null, completedAt: new Date() },
        ]);
        expect(best.get('l1')).toBe(88);
        expect(best.has('l2')).toBe(false);
    });
});
