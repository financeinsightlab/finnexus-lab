// lib/api-keys.ts — usage-metered API key primitives (Pillar A5)
//
// Selling the intelligence as an API (Pillar A5) needs safe key handling. The
// rules, encoded here as pure functions:
//
//   1. Never store a raw key — store a SHA-256 hash.
//   2. Always show a short, non-secret prefix (e.g. `ka_live_3f9c…`) so a user
//      can recognise a key in a list without the secret leaking.
//   3. Compare in constant time to avoid timing side-channels.
//
// Key creation/verification against the database lives in the route layer; this
// module is dependency-light and fully unit-testable.

import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export const API_KEY_PREFIX = 'ka';
export type ApiKeyEnvironment = 'live' | 'test';

export interface GeneratedApiKey {
    /** The full secret — shown to the user exactly once. */
    secret: string;
    /** SHA-256 hex digest stored in the database. */
    hash: string;
    /** Non-secret display prefix, e.g. `ka_live_3f9c`. */
    prefix: string;
}

/** `ka_live_<prefix(8)>_<secret(32)>`. */
export function generateApiKey(environment: ApiKeyEnvironment = 'live'): GeneratedApiKey {
    const id = randomBytes(8).toString('hex'); // 16 chars
    const secretPart = randomBytes(24).toString('base64url'); // 32 chars
    const secret = `${API_KEY_PREFIX}_${environment}_${id}_${secretPart}`;
    return {
        secret,
        hash: hashApiKey(secret),
        prefix: `${API_KEY_PREFIX}_${environment}_${id.slice(0, 4)}`,
    };
}

export function hashApiKey(secret: string): string {
    return createHash('sha256').update(secret).digest('hex');
}

/** Constant-time comparison of two hex digests. */
export function safeEqualHex(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    try {
        return timingSafeEqual(Buffer.from(a, 'hex'), Buffer.from(b, 'hex'));
    } catch {
        return false;
    }
}

/** Verify a presented secret against a stored hash without leaking the key. */
export function verifyApiKey(presented: string, storedHash: string): boolean {
    return safeEqualHex(hashApiKey(presented), storedHash);
}

/** Extract the non-secret display prefix from a full key, or '' when malformed. */
export function keyPrefix(secret: string): string {
    const parts = secret.split('_');
    if (parts.length < 4 || parts[0] !== API_KEY_PREFIX) return '';
    return `${parts[0]}_${parts[1]}_${parts[2].slice(0, 4)}`;
}

export interface RateLimitRule {
    /** Requests allowed per window. */
    limit: number;
    /** Window length in seconds. */
    windowSeconds: number;
}

/** Per-plan default quotas for the public API. */
export const API_RATE_LIMITS: Record<string, RateLimitRule> = {
    FREE: { limit: 60, windowSeconds: 3600 },
    PRO: { limit: 1_000, windowSeconds: 3600 },
    ELITE: { limit: 5_000, windowSeconds: 3600 },
    TEAM: { limit: 20_000, windowSeconds: 3600 },
    ENTERPRISE: { limit: 100_000, windowSeconds: 3600 },
};

export function rateLimitForPlan(plan: string | null | undefined): RateLimitRule {
    const key = (plan ?? 'FREE').toUpperCase();
    return API_RATE_LIMITS[key] ?? API_RATE_LIMITS.FREE;
}

export interface UsageCheck {
    allowed: boolean;
    remaining: number;
    /** Unix epoch (seconds) when the current window resets. */
    resetAt: number;
}

/**
 * Fixed-window usage check. `prisma`-free so it can be exercised in tests; the
 * route passes the current window's count.
 */
export function checkUsage(
    used: number,
    rule: RateLimitRule,
    windowStart: number,
): UsageCheck {
    const resetAt = windowStart + rule.windowSeconds;
    const remaining = Math.max(0, rule.limit - used);
    return { allowed: used < rule.limit, remaining, resetAt };
}
