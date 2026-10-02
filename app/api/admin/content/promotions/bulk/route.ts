import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authorizeApi, ADMIN_ROLES } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { revalidateProductContent } from '@/lib/product-content-admin';
import { logger } from '@/lib/logger';
import { legacySummary, listAdminPromotions, normalizeRules, placementRuleSchema, targetRuleSchema } from '@/lib/promotions/admin';
import { effectiveRules } from '@/lib/promotions/targeting';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

const bulkSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('activate'), ids: z.array(z.string().min(1).max(64)).min(1).max(200) }),
  z.object({ action: z.literal('deactivate'), ids: z.array(z.string().min(1).max(64)).min(1).max(200) }),
  z.object({ action: z.literal('duplicate'), ids: z.array(z.string().min(1).max(64)).min(1).max(50) }),
  z.object({
    action: z.literal('assign'),
    ids: z.array(z.string().min(1).max(64)).min(1).max(200),
    /** add = merge into existing rules; replace = overwrite the given rule kinds. */
    mode: z.enum(['add', 'replace']).default('add'),
    targets: z.array(targetRuleSchema).max(500).optional(),
    placements: z.array(placementRuleSchema).max(20).optional(),
  }),
]);

/**
 * POST — bulk operations: activate / deactivate / duplicate / assign targets
 * and placements to many promotions at once.
 */
export async function POST(request: Request) {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, bulkSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    let affected = 0;
    if (body.action === 'activate' || body.action === 'deactivate') {
      const result = await prisma.promotion.updateMany({ where: { id: { in: body.ids } }, data: { active: body.action === 'activate' } });
      affected = result.count;
    } else if (body.action === 'duplicate') {
      const all = await listAdminPromotions();
      const selected = all.filter((promotion) => body.ids.includes(promotion.id));
      for (const source of selected) {
        const { targets, placements } = effectiveRules(source);
        const summary = legacySummary(targets, placements);
        await prisma.$transaction(async (tx) => {
          const copy = await tx.promotion.create({
            data: {
              brandName: source.brandName,
              title: `${source.title} (copy)`,
              shortDescription: source.shortDescription,
              fullDescription: source.fullDescription,
              logoUrl: source.logoUrl,
              imageUrl: source.imageUrl,
              videoUrl: source.videoUrl,
              lightCreativeUrl: source.lightCreativeUrl,
              darkCreativeUrl: source.darkCreativeUrl,
              ctaText: source.ctaText,
              destinationUrl: source.destinationUrl,
              affiliateUrl: source.affiliateUrl,
              trackingUrl: source.trackingUrl,
              category: source.category,
              placement: summary.placement,
              targetPages: summary.targetPages,
              targetContentTypes: summary.targetContentTypes,
              startsAt: source.startsAt ? new Date(source.startsAt) : null,
              endsAt: source.endsAt ? new Date(source.endsAt) : null,
              active: false,
              priority: source.priority,
              displayFrequency: source.displayFrequency,
              mobileVisible: source.mobileVisible,
              tabletVisible: source.tabletVisible,
              desktopVisible: source.desktopVisible,
              themeMode: source.themeMode,
              rotationMode: source.rotationMode,
              frequencyCap: source.frequencyCap,
              disclosureType: source.disclosureType,
              disclosureText: source.disclosureText,
              campaignId: source.campaignId,
              utmParameters: source.utmParameters === null || source.utmParameters === undefined ? undefined : (source.utmParameters as object),
            },
          });
          if (targets.length) await tx.promotionTarget.createMany({ data: targets.map((rule) => ({ promotionId: copy.id, ...rule })) });
          if (placements.length) await tx.promotionPlacement.createMany({ data: placements.map((rule) => ({ promotionId: copy.id, ...rule })) });
        });
        affected += 1;
      }
    } else {
      const all = await listAdminPromotions();
      const selected = all.filter((promotion) => body.ids.includes(promotion.id));
      const mode = body.mode ?? 'add';
      const incoming = normalizeRules({ targets: body.targets ?? [], placements: body.placements ?? [] });
      for (const promotion of selected) {
        const current = effectiveRules(promotion);
        const nextTargets = body.targets === undefined
          ? current.targets
          : mode === 'replace'
            ? incoming.targets
            : normalizeRules({ targets: [...current.targets, ...incoming.targets], placements: [] }).targets;
        const nextPlacements = body.placements === undefined
          ? current.placements
          : mode === 'replace'
            ? incoming.placements
            : normalizeRules({ targets: [], placements: [...current.placements, ...incoming.placements] }).placements;
        if (!nextTargets.some((rule) => rule.mode === 'INCLUDE') || nextPlacements.length === 0) {
          return NextResponse.json({ error: `"${promotion.title}" would be left without an include rule or a placement.` }, { status: 400, headers: NO_STORE });
        }
        const summary = legacySummary(nextTargets, nextPlacements);
        await prisma.$transaction(async (tx) => {
          await tx.promotion.update({ where: { id: promotion.id }, data: summary });
          await tx.promotionTarget.deleteMany({ where: { promotionId: promotion.id } });
          await tx.promotionPlacement.deleteMany({ where: { promotionId: promotion.id } });
          await tx.promotionTarget.createMany({ data: nextTargets.map((rule) => ({ promotionId: promotion.id, ...rule })) });
          await tx.promotionPlacement.createMany({ data: nextPlacements.map((rule) => ({ promotionId: promotion.id, ...rule })) });
        });
        affected += 1;
      }
    }

    try {
      revalidateProductContent({ type: 'PROMOTION' });
    } catch {
      // non-fatal
    }
    const promotions = await listAdminPromotions();
    return NextResponse.json({ ok: true, affected, promotions }, { headers: NO_STORE });
  } catch (error) {
    logger.warn('Promotion bulk operation failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Bulk operation failed' }, { status: 409, headers: NO_STORE });
  }
}
