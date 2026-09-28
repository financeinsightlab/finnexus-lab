import { describe, expect, it } from 'vitest';
import {
    collectFreshContent,
    contentTimestamp,
    insightToItem,
    isNewSince,
    researchToItem,
    studyToItem,
    type FreshContentItem,
} from '@/lib/recent-activity';

function item(partial: Partial<FreshContentItem> & { id: string; date: string }): FreshContentItem {
    return {
        title: partial.title ?? partial.id,
        href: `/x/${partial.id}`,
        kind: partial.kind ?? 'Research',
        meta: partial.meta,
        ...partial,
    };
}

describe('contentTimestamp', () => {
    it('parses ISO strings and Dates', () => {
        expect(contentTimestamp('2026-01-02T00:00:00.000Z')).toBe(Date.parse('2026-01-02T00:00:00.000Z'));
        expect(contentTimestamp(new Date('2026-03-04T00:00:00.000Z'))).toBe(
            Date.parse('2026-03-04T00:00:00.000Z'),
        );
    });

    it('returns null for empty or invalid input', () => {
        expect(contentTimestamp(null)).toBeNull();
        expect(contentTimestamp(undefined)).toBeNull();
        expect(contentTimestamp('')).toBeNull();
        expect(contentTimestamp('not-a-date')).toBeNull();
    });
});

describe('isNewSince', () => {
    it('treats everything as new for a first visit (null since)', () => {
        expect(isNewSince('2020-01-01T00:00:00.000Z', null)).toBe(true);
    });

    it('compares strictly newer-than', () => {
        const since = '2026-01-01T00:00:00.000Z';
        expect(isNewSince('2026-01-02T00:00:00.000Z', since)).toBe(true);
        expect(isNewSince('2026-01-01T00:00:00.000Z', since)).toBe(false);
        expect(isNewSince('2025-12-31T00:00:00.000Z', since)).toBe(false);
    });

    it('never flags an undated item as new', () => {
        expect(isNewSince(null, '2026-01-01T00:00:00.000Z')).toBe(false);
    });
});

describe('collectFreshContent', () => {
    const groups = [
        [
            item({ id: 'r1', date: '2026-02-01T00:00:00.000Z', kind: 'Research' }),
            item({ id: 'r0', date: '2025-11-01T00:00:00.000Z', kind: 'Research' }),
        ],
        [
            item({ id: 'i1', date: '2026-02-03T00:00:00.000Z', kind: 'Insight' }),
            item({ id: 'i2', date: '2026-02-02T00:00:00.000Z', kind: 'Insight' }),
        ],
        [item({ id: 's1', date: '2026-02-04T00:00:00.000Z', kind: 'Study' })],
    ];

    it('keeps only items newer than `since`, newest first', () => {
        const result = collectFreshContent(groups, '2026-02-01T12:00:00.000Z');
        expect(result.items.map((i) => i.id)).toEqual(['s1', 'i1', 'i2']);
        expect(result.total).toBe(3);
        expect(result.latest).toBe('2026-02-04T00:00:00.000Z');
    });

    it('tallies counts per kind', () => {
        const result = collectFreshContent(groups, '2026-02-01T12:00:00.000Z');
        expect(result.counts).toEqual({ Study: 1, Insight: 2 });
    });

    it('returns everything for a first visit (null since)', () => {
        const result = collectFreshContent(groups, null);
        expect(result.total).toBe(5);
        expect(result.items).toHaveLength(5);
    });

    it('respects the limit while reporting the full total', () => {
        const result = collectFreshContent(groups, null, { limit: 2 });
        expect(result.items).toHaveLength(2);
        expect(result.total).toBe(5);
    });

    it('reports an empty result when nothing is new', () => {
        const result = collectFreshContent(groups, '2030-01-01T00:00:00.000Z');
        expect(result.items).toEqual([]);
        expect(result.latest).toBeNull();
        expect(result.total).toBe(0);
    });

    it('ignores undated items', () => {
        const result = collectFreshContent(
            [[item({ id: 'x', date: '', kind: 'Podcast' })]],
            null,
        );
        expect(result.total).toBe(0);
    });
});

describe('domain mappers', () => {
    it('maps research posts to /research/<slug>', () => {
        const mapped = researchToItem({ slug: 'sector-x', title: 'Sector X', date: '2026-01-01', sector: 'Energy' });
        expect(mapped).toMatchObject({
            id: 'research:sector-x',
            href: '/research/sector-x',
            kind: 'Research',
            meta: 'Energy',
        });
    });

    it('maps insights to /insights/<slug>', () => {
        const mapped = insightToItem({ slug: 'thesis', title: 'Thesis', date: '2026-01-01', category: 'Equities' });
        expect(mapped.href).toBe('/insights/thesis');
        expect(mapped.kind).toBe('Insight');
    });

    it('maps study materials using publishedAt, falling back to createdAt', () => {
        const published = studyToItem({
            slug: 'm1',
            title: 'Material 1',
            publishedAt: new Date('2026-05-01T00:00:00.000Z'),
            type: 'PDF',
        });
        expect(published.date).toBe('2026-05-01T00:00:00.000Z');
        expect(published.href).toBe('/study/m1');

        const draft = studyToItem({ slug: 'm2', title: 'Material 2', createdAt: '2026-04-01T00:00:00.000Z' });
        expect(draft.date).toBe('2026-04-01T00:00:00.000Z');
    });
});
