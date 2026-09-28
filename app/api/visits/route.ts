// app/api/visits/route.ts — record / advance the "last seen" marker (Pillar F4)
//
// The dashboard reads the existing marker to compute "new since your last
// visit", then a small client effect POSTs here to advance the marker to now.
// Idempotent and cookie-only, so it needs no database and no external service.

import { NextResponse } from 'next/server';
import { LAST_VISIT_COOKIE, writeLastVisit } from '@/lib/visit-store';

export const runtime = 'nodejs';

export async function GET() {
    return NextResponse.json({ cookie: LAST_VISIT_COOKIE });
}

export async function POST() {
    const now = new Date().toISOString();
    await writeLastVisit(now);
    return NextResponse.json({ since: now });
}
