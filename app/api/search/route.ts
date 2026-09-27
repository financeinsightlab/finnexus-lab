import { NextRequest, NextResponse } from 'next/server';
import { searchContent } from '@/lib/search';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Unified search endpoint backing the site-wide search box.
 * GET /api/search?q=quick+commerce&perKind=8
 */
export async function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams.get('q') ?? '';
    const perKindRaw = Number(request.nextUrl.searchParams.get('perKind'));
    const perKind = Number.isFinite(perKindRaw) && perKindRaw > 0 ? Math.min(perKindRaw, 50) : 8;

    try {
        const result = await searchContent(q, { perKind });
        return NextResponse.json(result);
    } catch (error) {
        logger.error('Unified search failed', {
            query: q,
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
