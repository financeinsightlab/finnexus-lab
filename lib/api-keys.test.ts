import { describe, expect, it } from 'vitest';
import {
    checkUsage,
    generateApiKey,
    hashApiKey,
    keyPrefix,
    rateLimitForPlan,
    verifyApiKey,
} from './api-keys';

describe('generateApiKey', () => {
    it('produces a prefixed secret, its hash, and a display prefix', () => {
        const key = generateApiKey('live');
        expect(key.secret.startsWith('ka_live_')).toBe(true);
        expect(key.hash).toBe(hashApiKey(key.secret));
        expect(key.secret.startsWith(key.prefix)).toBe(true);
        expect(key.prefix).toMatch(/^ka_live_[0-9a-f]{4}$/);
    });

    it('never exposes the secret in the prefix', () => {
        const key = generateApiKey('test');
        expect(key.secret.split('_')[3]).not.toContain(key.prefix.split('_')[2]);
    });
});

describe('verifyApiKey', () => {
    it('accepts the matching secret and rejects others', () => {
        const key = generateApiKey();
        expect(verifyApiKey(key.secret, key.hash)).toBe(true);
        expect(verifyApiKey(`${key.secret}x`, key.hash)).toBe(false);
    });
});

describe('keyPrefix', () => {
    it('extracts a display prefix and returns empty for malformed keys', () => {
        const key = generateApiKey('live');
        expect(keyPrefix(key.secret)).toBe(key.prefix);
        expect(keyPrefix('nonsense')).toBe('');
    });
});

describe('rateLimitForPlan', () => {
    it('returns higher quotas for higher plans and defaults to FREE', () => {
        expect(rateLimitForPlan('elite').limit).toBeGreaterThan(rateLimitForPlan('free').limit);
        expect(rateLimitForPlan(undefined)).toEqual(rateLimitForPlan('FREE'));
    });
});

describe('checkUsage', () => {
    it('reports remaining quota and blocks past the limit', () => {
        const rule = { limit: 3, windowSeconds: 60 };
        const ok = checkUsage(1, rule, 0);
        expect(ok.allowed).toBe(true);
        expect(ok.remaining).toBe(2);
        expect(ok.resetAt).toBe(60);
        expect(checkUsage(3, rule, 0).allowed).toBe(false);
    });
});
