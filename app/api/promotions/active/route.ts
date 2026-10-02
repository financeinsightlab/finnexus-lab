import { NextResponse } from 'next/server';
import { isPromotionSlot, PAGE_TYPE_META, type PromotionSlot } from '@/lib/promotions/catalog';
import { getEligiblePromotions, toPromotionDTO } from '@/lib/promotions/engine';
import { normalizePath, resolvePageContext } from '@/lib/promotions/targeting';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Public, cacheable promotion lookup used by the floating sidebar card.
 *
 * GET /api/promotions/active?path=/research/ai-search[&slot=SIDEBAR][&tags=a,b]
 *
 * Returns the ordered eligible candidates (max 3) for the slot. Per-visitor
 * decisions (dismissal, device, theme, frequency cap) are made in the browser
 * so the response is identical for everyone and can be cached at the edge.
 */
export async function GET(request: Request) {
  const headers = {
    'Cache-Control': 'public, max-age=0, s-maxage=120, stale-while-revalidate=600',
    Vary: 'Accept-Encoding',
  };
  try {
    const { searchParams } = new URL(request.url);
    const path = normalizePath(searchParams.get('path') || '/');
    const requestedSlot = (searchParams.get('slot') || 'SIDEBAR').toUpperCase();
    const slot: PromotionSlot = isPromotionSlot(requestedSlot) ? requestedSlot : 'SIDEBAR';
    const tags = (searchParams.get('tags') || '').split(',').map((tag) => tag.trim()).filter(Boolean).slice(0, 20);

    const context = resolvePageContext(path, { tags });
    if (PAGE_TYPE_META[context.pageType].blocked) {
      return NextResponse.json({ promotions: [], promotion: null }, { headers: { 'Cache-Control': 'private, no-store' } });
    }

    const { promotions } = await getEligiblePromotions({ pathname: path, slot, tags, limit: 3 });
    const dtos = promotions.map((promotion) => toPromotionDTO(promotion, slot));
    return NextResponse.json({ promotions: dtos, promotion: dtos[0] ?? null }, { headers });
  } catch {
    return NextResponse.json({ promotions: [], promotion: null }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  }
}
