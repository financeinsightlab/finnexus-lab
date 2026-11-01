import { NextResponse } from 'next/server';
import { requireCron } from '@/lib/auth-guards';
import {
    ingestFrankfurterFx,
    ingestWorldBankMacro,
    ingestRbiMonetaryPolicy,
} from '@/lib/financial-data';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Live data ingest cron (Pillar C1/C2).
 *
 * Runs daily (via Vercel Cron or GitHub Actions scheduled workflow) and pulls free,
 * key-less public metrics (FX + World Bank + RBI).
 * All observations are persisted to the database with full provenance.
 * No external account needed.
 *
 * vercel.json:
 * { "crons": [{ "path": "/api/cron/live-ingest", "schedule": "0 2 * * *" }] }
 */

export async function GET(request: Request) {
    const unauthorized = requireCron(request);
    if (unauthorized) return unauthorized;

    const startedAt = Date.now();
    const results: Array<{ provider: string; ok: boolean; fetched: number; inserted: number; updated: number; error?: string }> = [];

    try {
        // Ingest FX from Frankfurter (ECB reference rates)
        const fxResult = await ingestFrankfurterFx({
            base: 'USD',
            symbols: ['INR', 'EUR', 'GBP', 'JPY'],
        });
        results.push({
            provider: 'Frankfurter (ECB)',
            ok: !fxResult.error,
            fetched: fxResult.fetched,
            inserted: fxResult.inserted,
            updated: fxResult.updated,
            ...(fxResult.error ? { error: fxResult.error } : {}),
        });

        // Ingest macro indicators from World Bank
        const wbResult = await ingestWorldBankMacro();
        results.push({
            provider: 'World Bank Open Data',
            ok: !wbResult.error,
            fetched: wbResult.fetched,
            inserted: wbResult.inserted,
            updated: wbResult.updated,
            ...(wbResult.error ? { error: wbResult.error } : {}),
        });

        // Ingest RBI Monetary policy benchmark rates
        const rbiResult = await ingestRbiMonetaryPolicy();
        results.push({
            provider: 'Reserve Bank of India',
            ok: true,
            fetched: rbiResult.points.length,
            inserted: rbiResult.inserted,
            updated: 0,
        });

        const totalFetched = results.reduce((sum, r) => sum + r.fetched, 0);
        const totalInserted = results.reduce((sum, r) => sum + r.inserted, 0);
        const totalUpdated = results.reduce((sum, r) => sum + r.updated, 0);
        const allOk = results.every((r) => r.ok);

        return NextResponse.json(
            {
                ok: allOk,
                ingestedAt: new Date().toISOString(),
                durationMs: Date.now() - startedAt,
                totals: { fetched: totalFetched, inserted: totalInserted, updated: totalUpdated },
                providers: results,
            },
            { status: allOk ? 200 : 207 },
        );
    } catch (error) {
        logger.error('Live ingest failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json(
            { ok: false, error: 'Ingest failed', durationMs: Date.now() - startedAt },
            { status: 500 },
        );
    }
}
