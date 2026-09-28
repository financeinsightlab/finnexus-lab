import { NextResponse } from 'next/server';
import { requireCron } from '@/lib/auth-guards';
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
 * Vercel Cron — live-data ingest (Pillar C1).
 *
 * Runs daily and pulls free, key-less public metrics (FX + World Bank). Today it
 * returns a provenance-stamped snapshot; wiring these into the tracker pages and
 * a `MetricSnapshot` table is a drop-in next step. No external account needed.
 *
 * vercel.json:
 * { "crons": [{ "path": "/api/cron/live-ingest", "schedule": "0 2 * * *" }] }
 */

const FX_BASE = 'USD';
const FX_SYMBOLS = ['INR', 'EUR', 'GBP', 'JPY'] as const;

const WORLD_BANK_SERIES: { country: string; indicator: string }[] = [
    { country: 'IN', indicator: 'NY.GDP.MKTP.CD' },
    { country: 'IN', indicator: 'FP.CPI.TOTL.ZG' },
];

async function ingest(): Promise<MetricPoint[]> {
    const points: MetricPoint[] = [];

    const fx = await fetchJson<FrankfurterTimeseries>(frankfurterUrl(FX_BASE, FX_SYMBOLS));
    if (fx) points.push(...parseFrankfurterLatest(fx));

    for (const series of WORLD_BANK_SERIES) {
        const rows = await fetchJson<WorldBankRow[]>(worldBankUrl(series.country, series.indicator));
        const dataRows = Array.isArray(rows) && Array.isArray(rows[1]) ? (rows[1] as WorldBankRow[]) : [];
        if (dataRows.length > 0) points.push(...parseWorldBankLatest(dataRows));
    }

    return points;
}

export async function GET(request: Request) {
    const unauthorized = requireCron(request);
    if (unauthorized) return unauthorized;

    const startedAt = Date.now();
    try {
        const points = await ingest();
        return NextResponse.json(
            {
                ok: true,
                ingestedAt: new Date().toISOString(),
                count: points.length,
                durationMs: Date.now() - startedAt,
                metrics: points.map((point) => ({ ...point, provenance: buildProvenance(point) })),
            },
            { status: 200 },
        );
    } catch (error) {
        logger.error('Live ingest failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ ok: false, error: 'Ingest failed' }, { status: 500 });
    }
}
