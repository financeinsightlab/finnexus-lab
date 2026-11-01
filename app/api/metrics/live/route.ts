import { NextResponse } from 'next/server';
import { withCache } from '@/lib/cache';
import { getLatestMetrics } from '@/lib/financial-data';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Live financial metrics with full provenance (Pillar C1/C2).
 *
 * Reads persisted observations from the database. Falls back to live provider
 * fetch if the database is empty (cold start).
 *
 * All sources are FREE and key-less:
 *   • Frankfurter — ECB reference FX rates
 *   • World Bank Open Data — macro indicators (CC BY 4.0)
 *
 * Results are cached in-process for 6 hours to stay far inside the providers'
 * courtesy limits. Every metric includes source, source URL, licence and as-of
 * date; when a provider is unreachable it is simply omitted (never a 500).
 */

const CACHE_KEY = 'live:metrics:v1';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

async function loadMetrics() {
    return getLatestMetrics();
}

export async function GET() {
    try {
        const points = await withCache(CACHE_KEY, loadMetrics, CACHE_TTL_MS);

        return NextResponse.json(
            {
                updatedAt: new Date().toISOString(),
                count: points.length,
                metrics: points.map((point) => ({
                    key: point.key,
                    label: point.label,
                    value: point.value,
                    unit: point.unit,
                    asOf: point.observedAt,
                    source: point.source,
                    sourceUrl: point.sourceUrl,
                    license: point.license,
                    frequency: point.frequency,
                    delayMinutes: point.delayMinutes,
                    freshness: point.freshness,
                    provenance: {
                        source: point.source,
                        sourceUrl: point.sourceUrl,
                        license: point.license,
                        asOf: point.observedAt,
                        ageDays: point.freshness.ageDays,
                    },
                })),
            },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
                },
            },
        );
    } catch (error) {
        logger.error('Live metrics failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Metrics unavailable' }, { status: 502 });
    }
}
