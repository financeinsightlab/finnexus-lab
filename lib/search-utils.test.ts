import { describe, expect, it } from 'vitest';
import { score, tokenize } from './search-utils';

describe('tokenize', () => {
    it('lowercases and splits on whitespace', () => {
        expect(tokenize('India  Quick Commerce')).toEqual(['india', 'quick', 'commerce']);
    });

    it('returns an empty array for blank input', () => {
        expect(tokenize('')).toEqual([]);
        expect(tokenize('   ')).toEqual([]);
    });
});

describe('score', () => {
    it('returns 0 when nothing matches (item is filtered out)', () => {
        expect(score(['hydrogen'], 'DCF Model', 'valuation basics', [])).toBe(0);
    });

    it('weights title over tags over description', () => {
        const titleOnly = score(['solar'], 'Solar Power', '', []);
        const tagOnly = score(['solar'], 'Power', '', ['solar']);
        const descOnly = score(['solar'], 'Power', 'solar farms', []);

        expect(titleOnly).toBe(5);
        expect(tagOnly).toBe(3);
        expect(descOnly).toBe(1);
        expect(titleOnly).toBeGreaterThan(tagOnly);
        expect(tagOnly).toBeGreaterThan(descOnly);
    });

    it('accumulates across tokens and fields', () => {
        // "quick" hits title (+5), "commerce" hits tag (+3)
        expect(score(['quick', 'commerce'], 'Quick Retail', '', ['commerce'])).toBe(8);
    });

    it('is case-insensitive when tokens come from tokenize()', () => {
        // `score` lowercases the haystack but expects normalised tokens, so the
        // real contract is exercised through `tokenize`.
        expect(score(tokenize('EV'), 'EV Battery', '', [])).toBe(5);
        expect(score(tokenize('ev'), 'ev battery', '', [])).toBe(5);
    });
});
