import { NextResponse } from 'next/server';
import { withCache } from '@/lib/cache';
import {
    buildProvenance,
    fetchJson,
    frankfurterUrl,
    parseFrankfurterLatest,
    parseWorldBankLatest,
    worldBankUrl,
    type FrankfurterTimeseries,
    type MetricPoint,
    type WorldBankRow,
} from '@/lib/live-data';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Live financial metrics with full provenance (Pillar C1).
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

const FX_BASE = 'USD';
const FX_SYMBOLS = ['INR', 'EUR', 'GBP', 'JPY'] as const;

const WORLD_BANK_SERIES: { country: string; indicator: string }[] = [
    { country: 'IN', indicator: 'NY.GDP.MKTP.CD' }, // GDP (current US$)
    { country: 'IN', indicator: 'FP.CPI.TOTL.ZG' }, // Inflation, consumer prices
];

async function loadMetrics(): Promise<MetricPoint[]> {
    const points: MetricPoint[] = [];

    const fx = await fetchJson<FrankfurterTimeseries>(frankfurterUrl(FX_BASE, FX_SYMBOLS));
    if (fx) points.push(...parseFrankfurterLatest(fx));

    for (const series of WORLD_BANK_SERIES) {
        const rows = await fetchJson<WorldBankRow[]>(worldBankUrl(series.country, series.indicator));
        // World Bank returns [metadata, rows].
        const dataRows = Array.isArray(rows) && Array.isArray(rows[1]) ? (rows[1] as WorldBankRow[]) : [];
        if (dataRows.length > 0) points.push(...parseWorldBankLatest(dataRows));
    }

    return points;
}

export async function GET() {
    try {
        const points = await withCache(CACHE_KEY, loadMetrics, CACHE_TTL_MS);

        return NextResponse.json(
            {
                updatedAt: new Date().toISOString(),
                count: points.length,
                metrics: points.map((point) => ({
                    ...point,
                    provenance: buildProvenance(point),
                })),
            },
            {
                status: 200,
                headers: {
                    // Cache at the edge too; metrics move on a daily cadence.
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
