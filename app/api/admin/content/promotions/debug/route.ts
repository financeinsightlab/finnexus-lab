import { NextResponse } from 'next/server';
import { authorizeApi, ADMIN_ROLES } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { DEVICES, PAGE_TYPE_META, PROMOTION_SLOTS, SLOT_META, isPromotionSlot, slotRendersOn, type Device } from '@/lib/promotions/catalog';
import { loadAllPromotionRecords } from '@/lib/promotions/admin';
import { getPromotionHref } from '@/lib/promotions/href';
import { effectiveRules, resolvePageContext, selectPromotions, TIER_LABELS } from '@/lib/promotions/targeting';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET — live targeting debugger.
 *
 * /api/admin/content/promotions/debug?path=/research/ai-search&slot=CONTENT_BOTTOM
 *   [&device=mobile][&theme=dark][&at=2026-10-15T12:00:00Z][&tags=a,b]
 *
 * Evaluates EVERY promotion (active or not) against the page+slot with the
 * exact engine used in production and explains each decision. Without `slot`
 * it lists which slots the page renders and the winners per slot.
 */
export async function GET(request: Request) {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    const requestedSlot = (searchParams.get('slot') || '').toUpperCase();
    const slot = isPromotionSlot(requestedSlot) ? requestedSlot : null;
    const deviceParam = searchParams.get('device');
    const device = (DEVICES as readonly string[]).includes(deviceParam ?? '') ? (deviceParam as Device) : null;
    const themeParam = searchParams.get('theme');
    const theme = themeParam === 'dark' || themeParam === 'light' ? themeParam : null;
    const atParam = searchParams.get('at');
    const now = atParam && Number.isFinite(Date.parse(atParam)) ? Date.parse(atParam) : Date.now();
    const tags = (searchParams.get('tags') || '').split(',').map((tag) => tag.trim()).filter(Boolean);

    const context = resolvePageContext(path, { tags });
    const promotions = await loadAllPromotionRecords();
    const pageMeta = PAGE_TYPE_META[context.pageType];
    const renderedSlots = PROMOTION_SLOTS.filter((key) => slotRendersOn(key, context.pageType, context.isHub));

    const describe = (promotionId: string) => {
      const promotion = promotions.find((item) => item.id === promotionId)!;
      const rules = effectiveRules(promotion);
      return {
        id: promotion.id,
        brandName: promotion.brandName,
        title: promotion.title,
        active: promotion.active,
        priority: promotion.priority,
        rotationMode: promotion.rotationMode,
        startsAt: promotion.startsAt,
        endsAt: promotion.endsAt,
        placements: rules.placements,
        targets: rules.targets,
        derivedFromLegacy: rules.derivedFromLegacy,
        href: getPromotionHref(promotion),
      };
    };

    const evaluateSlot = (slotKey: (typeof PROMOTION_SLOTS)[number]) => {
      const result = selectPromotions(promotions, { context, slot: slotKey, device, theme, now }, { limit: SLOT_META[slotKey].maxPerPage });
      return {
        slot: slotKey,
        label: SLOT_META[slotKey].label,
        rendered: slotRendersOn(slotKey, context.pageType, context.isHub),
        limit: SLOT_META[slotKey].maxPerPage,
        winners: result.selected.map((promotion) => promotion.id),
        ranked: result.ranked.map((candidate, index) => ({ id: candidate.promotion.id, position: index + 1, tier: candidate.tier, tierLabel: TIER_LABELS[candidate.tier], weight: candidate.weight, rotationMode: candidate.rotationMode })),
        evaluations: result.evaluations.map((evaluation) => ({ ...evaluation, tierLabel: evaluation.tier ? TIER_LABELS[evaluation.tier] : null, promotion: describe(evaluation.promotionId) })),
      };
    };

    const payload = {
      input: { path: context.pathname, slot, device, theme, at: new Date(now).toISOString(), tags: context.tags },
      page: { ...context, pageTypeLabel: pageMeta.label, blocked: Boolean(pageMeta.blocked), globalEligible: pageMeta.globalEligible, renderedSlots },
      totalPromotions: promotions.length,
      slots: slot ? [evaluateSlot(slot)] : renderedSlots.map((key) => evaluateSlot(key)),
    };
    return NextResponse.json(payload, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.error('Promotion debugger failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Debugger unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
