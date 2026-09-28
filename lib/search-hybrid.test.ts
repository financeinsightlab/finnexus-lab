import { describe, expect, it } from 'vitest';
import {
    blendScores,
    contentFields,
    cosineSimilarity,
    hybridScore,
    rankHybrid,
} from './search-hybrid';

describe('hybridScore', () => {
    it('returns 0 for an empty token list', () => {
        expect(hybridScore([], contentFields('Any', 'thing', []))).toBe(0);
    });

    it('weights a title hit above a description-only hit', () => {
        const inTitle = hybridScore(['inflation'], contentFields('Inflation report', 'about markets', []));
        const inBody = hybridScore(['inflation'], contentFields('Market report', 'about inflation', []));
        expect(inTitle).toBeGreaterThan(inBody);
    });

    it('rewards longer (more specific) tokens', () => {
        const short = hybridScore(['gdp'], contentFields('gdp report', '', []));
        const long = hybridScore(['diversification'], contentFields('diversification report', '', []));
        expect(long).toBeGreaterThan(short);
    });
});

describe('cosineSimilarity', () => {
    it('is 1 for identical vectors and 0 for an empty vector', () => {
        expect(cosineSimilarity([1, 2, 3], [1, 2, 3])).toBeCloseTo(1);
        expect(cosineSimilarity([], [1, 2])).toBe(0);
        expect(cosineSimilarity([0, 0], [1, 1])).toBe(0);
    });
});

describe('blendScores', () => {
    it('returns the lexical score when no vector is supplied', () => {
        expect(blendScores(4.2, null)).toBe(4.2);
    });

    it('interpolates between lexical and vector by alpha', () => {
        expect(blendScores(0, 1, 0.5)).toBe(0.5);
        expect(blendScores(0, 1, 0)).toBe(0);
        expect(blendScores(0, 1, 1)).toBe(1);
    });
});

describe('rankHybrid', () => {
    const items = [
        { id: 'a', title: 'Inflation dynamics', desc: 'prices' },
        { id: 'b', title: 'FX reserves', desc: 'inflation and currency' },
        { id: 'c', title: 'Bond yields', desc: 'rates' },
    ];
    const toFields = (item: (typeof items)[number]) => contentFields(item.title, item.desc, []);

    it('drops non-matching items and sorts by score', () => {
        const ranked = rankHybrid(items, 'inflation', toFields, { keyOf: (i) => i.id });
        expect(ranked.map((r) => r.item.id)).toEqual(['a', 'b']);
    });

    it('uses vectors when provided', () => {
        const vectors = new Map<string, number[]>([
            ['a', [1, 0]],
            ['c', [1, 0]],
        ]);
        const ranked = rankHybrid(items, 'yields', toFields, {
            keyOf: (i) => i.id,
            vectors,
            queryVector: [1, 0],
            alpha: 0.5,
        });
        expect(ranked[0].item.id).toBe('c');
    });

    it('returns nothing for a blank query', () => {
        expect(rankHybrid(items, '   ', toFields)).toEqual([]);
    });
});
