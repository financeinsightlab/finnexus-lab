import { describe, expect, it } from 'vitest';
import { evaluateRateLimit } from './rate-limit-logic';

describe('evaluateRateLimit', () => {
    it('allows requests through the limit and reports remaining window time', () => {
        const startedAt = new Date('2025-01-01T00:00:00.000Z');
        expect(evaluateRateLimit(5, startedAt, 5, 60, Date.parse('2025-01-01T00:00:30.000Z'))).toEqual({
            allowed: true,
            limit: 5,
            count: 5,
            retryAfterSeconds: 30,
            resetAt: '2025-01-01T00:01:00.000Z',
        });
    });

    it('blocks counts over the limit and never returns a zero retry delay', () => {
        const result = evaluateRateLimit(6, new Date('2025-01-01T00:00:00.000Z'), 5, 60, Date.parse('2025-01-01T00:01:01.000Z'));
        expect(result.allowed).toBe(false);
        expect(result.retryAfterSeconds).toBe(1);
    });
});
