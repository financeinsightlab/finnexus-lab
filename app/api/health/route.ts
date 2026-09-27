import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Liveness/readiness probe. Verifies the database round-trips and reports the
 * deployed revision. Returns 200 when healthy, 503 otherwise, so uptime checks
 * can alert on it.
 */
export async function GET() {
    const startedAt = Date.now();
    let database: 'up' | 'down' = 'up';
    let dbLatencyMs: number | null = null;

    try {
        const t = Date.now();
        await prisma.$queryRaw`SELECT 1`;
        dbLatencyMs = Date.now() - t;
    } catch (error) {
        database = 'down';
        logger.error('Health check: database unreachable', {
            error: error instanceof Error ? error.message : String(error),
        });
    }

    const healthy = database === 'up';
    return NextResponse.json(
        {
            status: healthy ? 'ok' : 'degraded',
            database,
            dbLatencyMs,
            uptimeMs: Math.round(process.uptime() * 1000),
            version: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.npm_package_version ?? 'dev',
            timestamp: new Date().toISOString(),
            durationMs: Date.now() - startedAt,
        },
        { status: healthy ? 200 : 503 },
    );
}
