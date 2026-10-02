import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi, ADMIN_ROLES } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { PAGE_TYPE_META, SLOT_META, slotRendersOn } from '@/lib/promotions/catalog';
import { normalizeRules, placementRuleSchema, targetRuleSchema } from '@/lib/promotions/admin';
import { getPageRegistry } from '@/lib/promotions/page-registry';
import { describeTargetRule, matchTargetRule, targetsMatchPage, TIER_LABELS } from '@/lib/promotions/targeting';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const previewSchema = z.object({
  targets: z.array(targetRuleSchema).max(500).default([]),
  placements: z.array(placementRuleSchema).max(20).default([]),
  limit: z.number().int().min(10).max(500).default(150),
});

/**
 * POST — targeting preview for the editor.
 * Given draft rules, lists the real pages the promotion WILL appear on (and
 * why), a sample of pages it will NOT appear on (and why), and which of the
 * chosen slots exist on those pages.
 */
export async function POST(request: Request) {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, previewSchema);
  if (!parsed.ok) return parsed.response;
  try {
    const limit = parsed.data.limit ?? 150;
    const { targets, placements } = normalizeRules({ targets: parsed.data.targets ?? [], placements: parsed.data.placements ?? [] });
    const registry = await getPageRegistry();
    const matched: Array<{ path: string; title: string; pageType: string; reason: string; slots: string[] }> = [];
    const unmatched: Array<{ path: string; title: string; pageType: string; reason: string }> = [];
    let matchedTotal = 0;
    const slotsWithoutPages = new Set(placements.map((placement) => placement.slot));

    for (const page of registry) {
      const ctx = { pathname: page.path, pageType: page.pageType, isHub: page.isHub, contentKey: page.contentKey, tags: page.tags };
      const excluded = targets.find((rule) => rule.mode === 'EXCLUDE' && matchTargetRule(rule, ctx));
      const match = excluded ? null : targetsMatchPage(targets, ctx);
      if (match) {
        matchedTotal += 1;
        const slots = placements.filter((placement) => slotRendersOn(placement.slot, page.pageType, page.isHub)).map((placement) => placement.slot);
        for (const slot of slots) slotsWithoutPages.delete(slot);
        if (matched.length < limit) matched.push({ path: page.path, title: page.title, pageType: page.pageType, reason: `${TIER_LABELS[match.tier]}: ${describeTargetRule(match.rule)}`, slots });
      } else if (unmatched.length < 40) {
        const reason = excluded
          ? `Excluded by rule: ${describeTargetRule(excluded)}`
          : targets.some((rule) => rule.mode === 'INCLUDE' && rule.targetType === 'GLOBAL') && !PAGE_TYPE_META[page.pageType].globalEligible
            ? `Global targeting does not reach ${PAGE_TYPE_META[page.pageType].label.toLowerCase()} pages`
            : 'No targeting rule matches this page';
        unmatched.push({ path: page.path, title: page.title, pageType: page.pageType, reason });
      }
    }

    const warnings: string[] = [];
    if (!targets.some((rule) => rule.mode === 'INCLUDE')) warnings.push('No include rule: this promotion will not appear anywhere until you add pages, page types or Global.');
    if (placements.length === 0) warnings.push('No placement selected: choose at least one slot.');
    for (const slot of slotsWithoutPages) warnings.push(`Slot "${SLOT_META[slot].label}" is not rendered on any of the targeted pages.`);
    if (matchedTotal === 0 && targets.some((rule) => rule.mode === 'INCLUDE')) warnings.push('The current rules do not match any known page.');

    return NextResponse.json(
      { matchedTotal, totalPages: registry.length, matched, unmatched, warnings },
      { headers: { 'Cache-Control': 'private, no-store' } },
    );
  } catch (error) {
    logger.error('Promotion preview failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Preview unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
