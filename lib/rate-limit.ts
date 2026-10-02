import { prisma } from '@/lib/prisma';
import { evaluateRateLimit, type PersistentRateLimitResult } from '@/lib/rate-limit-logic';

export { evaluateRateLimit } from '@/lib/rate-limit-logic';

/**
 * Consume one fixed-window token using a single PostgreSQL upsert. Because the
 * counter lives in the existing database, throttling is shared across serverless
 * instances without Redis or another paid service.
 */
export async function consumeRateLimit(
    scope: string,
    subjectId: string,
    options: { limit: number; windowSeconds: number },
): Promise<PersistentRateLimitResult> {
    const { limit, windowSeconds } = options;
    if (!Number.isInteger(limit) || limit < 1 || !Number.isInteger(windowSeconds) || windowSeconds < 1) {
        throw new Error('Invalid rate-limit configuration');
    }

    const now = new Date();
    const cutoff = new Date(now.getTime() - windowSeconds * 1000);
    const key = `${scope}:${subjectId}`;
    const rows = await prisma.$queryRaw<Array<{ count: number; windowStartedAt: Date }>>`
        INSERT INTO "RateLimitBucket" ("key", "count", "windowStartedAt", "updatedAt")
        VALUES (${key}, 1, ${now}, ${now})
        ON CONFLICT ("key") DO UPDATE SET
            "count" = CASE
                WHEN "RateLimitBucket"."windowStartedAt" <= ${cutoff} THEN 1
                ELSE "RateLimitBucket"."count" + 1
            END,
            "windowStartedAt" = CASE
                WHEN "RateLimitBucket"."windowStartedAt" <= ${cutoff} THEN ${now}
                ELSE "RateLimitBucket"."windowStartedAt"
            END,
            "updatedAt" = ${now}
        RETURNING "count", "windowStartedAt"
    `;

    const bucket = rows[0];
    if (!bucket) throw new Error('Rate-limit counter did not return a bucket');

    return evaluateRateLimit(bucket.count, bucket.windowStartedAt, limit, windowSeconds);
}
