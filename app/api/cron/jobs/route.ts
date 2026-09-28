// app/api/cron/jobs/route.ts — background job worker (Pillar G3)
//
// Vercel Cron drains the queue on a schedule. Configure in vercel.json:
// { "crons": [{ "path": "/api/cron/jobs", "schedule": "*/10 * * * *" }] }
//
// The shared CRON_SECRET guard (lib/auth-guards.requireCron) protects the route.

import { NextResponse } from 'next/server';
import { requireCron } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { processDueJobs } from '@/lib/jobs-store';

export const runtime = 'nodejs';

export async function GET(request: Request) {
    const unauthorized = requireCron(request);
    if (unauthorized) return unauthorized;

    try {
        const result = await processDueJobs(25);
        return NextResponse.json({ ok: true, ...result, at: new Date().toISOString() });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logger.error('Job worker failed', { error: message });
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
