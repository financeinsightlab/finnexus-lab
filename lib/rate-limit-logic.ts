export interface PersistentRateLimitResult {
    allowed: boolean;
    limit: number;
    count: number;
    retryAfterSeconds: number;
    resetAt: string;
}

export function evaluateRateLimit(
    count: number,
    windowStartedAt: Date,
    limit: number,
    windowSeconds: number,
    now = Date.now(),
): PersistentRateLimitResult {
    const resetAt = new Date(windowStartedAt.getTime() + windowSeconds * 1000);
    return {
        allowed: count <= limit,
        limit,
        count,
        retryAfterSeconds: Math.max(1, Math.ceil((resetAt.getTime() - now) / 1000)),
        resetAt: resetAt.toISOString(),
    };
}
