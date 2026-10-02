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
    const q = (request.nextUrl.searchParams.get('q') ?? '').trim();
    if (q.length > 200) {
        return NextResponse.json({ error: 'Search query is too long.' }, { status: 400 });
    }
    const perKindRaw = Number(request.nextUrl.searchParams.get('perKind'));
    const perKind = Number.isFinite(perKindRaw) && perKindRaw > 0 ? Math.min(perKindRaw, 20) : 8;

    try {
        const result = await searchContent(q, { perKind });
        return NextResponse.json(result, {
            headers: {
                // Results depend only on the public query and public content.
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
        });
    } catch (error) {
        logger.error('Unified search failed', {
            queryLength: q.length,
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
