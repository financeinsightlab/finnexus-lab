import { describe, expect, it } from 'vitest';
import { evaluateSla, slaSummary, slaWorklist, type SlaInput } from './freshness-sla';

const now = new Date('2026-06-01T00:00:00Z');

function daysAgo(days: number): Date {
    return new Date(now.getTime() - days * 86_400_000);
}

describe('evaluateSla', () => {
    it('marks fresh content as ok', () => {
        const result = evaluateSla({ type: 'insight', title: 'T', slug: 's', updatedAt: daysAgo(5) }, now);
        expect(result.status).toBe('ok');
        expect(result.ageDays).toBe(5);
    });

    it('flags aging content as warning', () => {
        const result = evaluateSla({ type: 'insight', title: 'T', slug: 's', updatedAt: daysAgo(40) }, now);
        expect(result.status).toBe('warning');
    });

    it('flags overdue content as breach with negative daysRemaining', () => {
        const result = evaluateSla({ type: 'insight', title: 'T', slug: 's', updatedAt: daysAgo(90) }, now);
        expect(result.status).toBe('breach');
        expect(result.daysRemaining).toBeLessThan(0);
    });

    it('handles predictions by resolve-by date', () => {
        const breach = evaluateSla(
            { type: 'prediction', title: 'P', slug: 'p', updatedAt: daysAgo(10), dueAt: daysAgo(3) },
            now,
        );
        expect(breach.status).toBe('breach');
        const soon = evaluateSla(
            { type: 'prediction', title: 'P', slug: 'p', updatedAt: daysAgo(1), dueAt: new Date('2026-06-05T00:00:00Z') },
            now,
        );
        expect(soon.status).toBe('warning');
    });
});

describe('slaWorklist', () => {
    it('returns only items needing attention, worst first', () => {
        const items: SlaInput[] = [
            { type: 'insight', title: 'ok', slug: 'a', updatedAt: daysAgo(1) },
            { type: 'insight', title: 'warn', slug: 'b', updatedAt: daysAgo(40) },
            { type: 'tracker', title: 'breach', slug: 'c', updatedAt: daysAgo(30) },
        ];
        const worklist = slaWorklist(items, now);
        expect(worklist.map((w) => w.slug)).toEqual(['c', 'b']);
    });
});

describe('slaSummary', () => {
    it('counts by status', () => {
        const results = [
            evaluateSla({ type: 'insight', title: 'a', slug: 'a', updatedAt: daysAgo(1) }, now),
            evaluateSla({ type: 'insight', title: 'b', slug: 'b', updatedAt: daysAgo(40) }, now),
            evaluateSla({ type: 'insight', title: 'c', slug: 'c', updatedAt: daysAgo(90) }, now),
        ];
        expect(slaSummary(results)).toEqual({ ok: 1, warning: 1, breach: 1 });
    });
});
