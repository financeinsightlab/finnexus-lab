// lib/promotions/admin.ts — server-side admin helpers (validation, persistence,
// reporting). Used only by /api/admin/content/promotions/* route handlers.

import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { toInputJson } from '@/lib/validation';
import {
  DISCLOSURE_TYPES,
  PAGE_TYPES,
  PROMOTION_SLOTS,
  ROTATION_MODES,
  TARGET_MODES,
  TARGET_TYPES,
  THEME_MODES,
  type PromotionSlot,
} from './catalog';
import { isHttpUrl } from './href';
import { toRecordFromRow, type PromotionRecord } from './engine';
import {
  dedupeTargetRules,
  effectiveRules,
  normalizePlacementRule,
  normalizeTargetRule,
  summarizeTargets,
  type PlacementRule,
  type TargetRule,
} from './targeting';

// ─── Validation ──────────────────────────────────────────────────────────────

const optionalUrl = z.string().trim().max(2048).nullable().optional();
const optionalDateTime = z.string().datetime().or(z.literal('')).nullable().optional();

export const targetRuleSchema = z.object({
  mode: z.enum(TARGET_MODES).default('INCLUDE'),
  targetType: z.enum(TARGET_TYPES),
  targetValue: z.string().trim().max(2048).default(''),
  includeDescendants: z.boolean().default(false),
});

export const placementRuleSchema = z.object({
  slot: z.enum(PROMOTION_SLOTS),
  weight: z.number().int().min(1).max(10).default(1),
});

export const promotionInputSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  brandName: z.string().trim().min(1).max(120),
  title: z.string().trim().min(3).max(180),
  shortDescription: z.string().trim().min(10).max(500),
  fullDescription: z.string().trim().max(6000).nullable().optional(),
  logoUrl: optionalUrl,
  imageUrl: optionalUrl,
  videoUrl: optionalUrl,
  lightCreativeUrl: optionalUrl,
  darkCreativeUrl: optionalUrl,
  ctaText: z.string().trim().min(1).max(60),
  destinationUrl: z.string().trim().url().max(2048),
  affiliateUrl: optionalUrl,
  trackingUrl: optionalUrl,
  category: z.string().trim().min(1).max(80),
  targets: z.array(targetRuleSchema).max(500).default([]),
  placements: z.array(placementRuleSchema).min(1, 'Choose at least one placement').max(PROMOTION_SLOTS.length),
  startsAt: optionalDateTime,
  endsAt: optionalDateTime,
  active: z.boolean().default(false),
  priority: z.number().int().min(-100).max(1000).default(0),
  displayFrequency: z.number().int().min(1).max(10).default(1),
  rotationMode: z.enum(ROTATION_MODES).default('PRIORITY'),
  frequencyCap: z.number().int().min(1).max(100).nullable().optional(),
  mobileVisible: z.boolean().default(true),
  tabletVisible: z.boolean().default(true),
  desktopVisible: z.boolean().default(true),
  themeMode: z.enum(THEME_MODES).default('ALL'),
  disclosureType: z.enum(DISCLOSURE_TYPES).or(z.string().trim().min(1).max(40)).default('SPONSORED'),
  disclosureText: z.string().trim().min(6).max(120).default('Sponsored · Paid promotion'),
  campaignId: z.string().trim().max(120).nullable().optional(),
  utmParameters: z.record(z.union([z.string().max(200), z.number().finite()])).nullable().optional(),
}).superRefine((input, ctx) => {
  for (const key of ['destinationUrl', 'affiliateUrl', 'trackingUrl', 'logoUrl', 'imageUrl', 'videoUrl', 'lightCreativeUrl', 'darkCreativeUrl'] as const) {
    const value = input[key];
    if (typeof value === 'string' && value.trim().length > 0 && !isHttpUrl(value.trim())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: [key], message: 'Only http and https URLs are allowed' });
    }
  }
  if (input.startsAt && input.endsAt && new Date(input.startsAt) >= new Date(input.endsAt)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['endsAt'], message: 'End time must be later than start time' });
  }
  const normalized = input.targets.map((rule) => normalizeTargetRule(rule));
  normalized.forEach((rule, index) => {
    if (!rule) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['targets', index], message: 'Invalid targeting rule' });
  });
  if (!normalized.some((rule) => rule && rule.mode === 'INCLUDE')) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['targets'], message: 'Choose at least one page, page type, content item, tag or Global' });
  }
  if (!input.mobileVisible && !input.tabletVisible && !input.desktopVisible) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['desktopVisible'], message: 'Enable at least one device' });
  }
});

export type PromotionInput = z.input<typeof promotionInputSchema>;
export type TargetRuleInput = z.input<typeof targetRuleSchema>;
export type PlacementRuleInput = z.input<typeof placementRuleSchema>;

export function normalizeRules(input: { targets: TargetRuleInput[]; placements: PlacementRuleInput[] }): { targets: TargetRule[]; placements: PlacementRule[] } {
  const targets = dedupeTargetRules(input.targets.map((rule) => normalizeTargetRule(rule)).filter((rule): rule is TargetRule => rule !== null));
  const seen = new Set<string>();
  const placements = input.placements
    .map((rule) => normalizePlacementRule(rule))
    .filter((rule): rule is PlacementRule => rule !== null && !seen.has(rule.slot) && Boolean(seen.add(rule.slot)));
  return { targets, placements };
}

// ─── Legacy column summaries (kept in sync for backwards compatibility) ──────

const SLOT_TO_LEGACY_PLACEMENT: Record<PromotionSlot, string> = {
  HOME_HERO: 'HOME_HERO',
  HOME_SECTION: 'HOME_SECTION',
  CONTENT_TOP: 'BETWEEN_CONTENT',
  CONTENT_MIDDLE: 'BETWEEN_CONTENT',
  CONTENT_BOTTOM: 'BETWEEN_CONTENT',
  SIDEBAR: 'SIDEBAR',
  SIDEBAR_PRIMARY: 'SIDEBAR',
  COURSE_SIDEBAR: 'COURSE_PAGE',
  CALCULATOR_RESULT: 'CALCULATOR_PAGE',
  TOOL_SECTION: 'TOOL_PAGE',
  FINANCE_TERM_RELATED: 'ARTICLE_PAGE',
  CTA_SECTION: 'CTA_BLOCK',
  DASHBOARD: 'DASHBOARD',
  FOOTER: 'FOOTER',
};

/**
 * Derive the legacy `placement` / `targetPages` / `targetContentTypes` columns
 * from explicit rules so older readers (and the pre-migration adapter) see a
 * faithful summary. Rules are the source of truth.
 */
export function legacySummary(targets: TargetRule[], placements: PlacementRule[]): { placement: string; targetPages: string[]; targetContentTypes: string[] } {
  const includes = targets.filter((rule) => rule.mode === 'INCLUDE');
  const targetPages = includes.some((rule) => rule.targetType === 'GLOBAL')
    ? ['ALL']
    : includes.filter((rule) => rule.targetType === 'PATH').map((rule) => rule.targetValue).slice(0, 60);
  const targetContentTypes = includes.filter((rule) => rule.targetType === 'PAGE_TYPE').map((rule) => rule.targetValue).slice(0, 30);
  const placement = placements.length > 1 && placements.some((p) => p.slot === 'SIDEBAR') && placements.some((p) => p.slot === 'CONTENT_BOTTOM')
    ? 'ALL'
    : SLOT_TO_LEGACY_PLACEMENT[placements[0]?.slot ?? 'CONTENT_BOTTOM'];
  return { placement, targetPages, targetContentTypes };
}

// ─── Persistence ─────────────────────────────────────────────────────────────

const NEW_COLUMN_PATTERN = /PromotionTarget|PromotionPlacement|tabletVisible|themeMode|rotationMode|frequencyCap|videoUrl|Unknown argument/i;

export interface SaveResult {
  promotion: AdminPromotion;
  created: boolean;
  warning?: string;
}

export async function savePromotion(rawInput: PromotionInput): Promise<SaveResult> {
  const { id, targets: rawTargets, placements: rawPlacements, ...raw } = promotionInputSchema.parse(rawInput);
  const { targets, placements } = normalizeRules({ targets: rawTargets, placements: rawPlacements });
  const summary = legacySummary(targets, placements);
  const base = {
    brandName: raw.brandName,
    title: raw.title,
    shortDescription: raw.shortDescription,
    fullDescription: raw.fullDescription?.trim() || null,
    logoUrl: raw.logoUrl?.trim() || null,
    imageUrl: raw.imageUrl?.trim() || null,
    lightCreativeUrl: raw.lightCreativeUrl?.trim() || null,
    darkCreativeUrl: raw.darkCreativeUrl?.trim() || null,
    ctaText: raw.ctaText,
    destinationUrl: raw.destinationUrl,
    affiliateUrl: raw.affiliateUrl?.trim() || null,
    trackingUrl: raw.trackingUrl?.trim() || null,
    category: raw.category,
    placement: summary.placement,
    targetPages: summary.targetPages,
    targetContentTypes: summary.targetContentTypes,
    startsAt: raw.startsAt && raw.startsAt.trim() ? new Date(raw.startsAt) : null,
    endsAt: raw.endsAt && raw.endsAt.trim() ? new Date(raw.endsAt) : null,
    active: raw.active,
    priority: raw.priority,
    displayFrequency: raw.displayFrequency,
    mobileVisible: raw.mobileVisible,
    desktopVisible: raw.desktopVisible,
    disclosureType: raw.disclosureType,
    disclosureText: raw.disclosureText,
    campaignId: raw.campaignId?.trim() || null,
    utmParameters: raw.utmParameters === undefined ? undefined : raw.utmParameters === null ? Prisma.DbNull : toInputJson(raw.utmParameters),
  };
  const extended = {
    ...base,
    videoUrl: raw.videoUrl?.trim() || null,
    tabletVisible: raw.tabletVisible,
    themeMode: raw.themeMode,
    rotationMode: raw.rotationMode,
    frequencyCap: raw.frequencyCap ?? null,
  };

  try {
    const promotion = await prisma.$transaction(async (tx) => {
      const saved = id
        ? await tx.promotion.update({ where: { id }, data: extended })
        : await tx.promotion.create({ data: extended });
      await tx.promotionTarget.deleteMany({ where: { promotionId: saved.id } });
      await tx.promotionPlacement.deleteMany({ where: { promotionId: saved.id } });
      if (targets.length) await tx.promotionTarget.createMany({ data: targets.map((rule) => ({ promotionId: saved.id, ...rule })) });
      if (placements.length) await tx.promotionPlacement.createMany({ data: placements.map((rule) => ({ promotionId: saved.id, ...rule })) });
      return tx.promotion.findUniqueOrThrow({ where: { id: saved.id }, include: { targets: true, placements: true } });
    });
    return { promotion: toAdminPromotion(promotion as unknown as PromotionRow), created: !id };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!NEW_COLUMN_PATTERN.test(message)) throw error;
    // Targeting migration not applied yet: persist the legacy summary only.
    logger.warn('promotions: saving without targeting tables (migration pending)', { error: message });
    const saved = id ? await prisma.promotion.update({ where: { id }, data: base }) : await prisma.promotion.create({ data: base });
    return {
      promotion: toAdminPromotion(saved as unknown as PromotionRow),
      created: !id,
      warning: 'The promotion targeting migration has not been applied to this database yet. Legacy placement/page fields were saved; run `prisma migrate deploy` to enable full targeting.',
    };
  }
}

// ─── Serialisation ───────────────────────────────────────────────────────────

type PromotionRow = Parameters<typeof toRecordFromRow>[0];

export interface AdminPromotion extends PromotionRecord {
  effectiveTargets: TargetRule[];
  effectivePlacements: PlacementRule[];
  derivedFromLegacy: boolean;
  targetSummary: string;
}

export function toAdminPromotion(row: PromotionRow): AdminPromotion {
  const record = toRecordFromRow(row);
  const rules = effectiveRules(record);
  return {
    ...record,
    effectiveTargets: rules.targets,
    effectivePlacements: rules.placements,
    derivedFromLegacy: rules.derivedFromLegacy,
    targetSummary: summarizeTargets(rules.targets).label,
  };
}

export async function listAdminPromotions(): Promise<AdminPromotion[]> {
  const orderBy = [{ active: 'desc' as const }, { priority: 'desc' as const }, { createdAt: 'desc' as const }];
  try {
    const rows = await prisma.promotion.findMany({ orderBy, take: 500, include: { targets: true, placements: true } });
    return rows.map((row) => toAdminPromotion(row as unknown as PromotionRow));
  } catch (error) {
    logger.warn('promotions: admin list falling back to legacy columns', { error: String(error) });
    const rows = await prisma.promotion.findMany({ orderBy, take: 500 });
    return rows.map((row) => toAdminPromotion(row as unknown as PromotionRow));
  }
}

export async function loadAllPromotionRecords(): Promise<PromotionRecord[]> {
  return listAdminPromotions();
}

// ─── Reporting ───────────────────────────────────────────────────────────────

export interface MetricRow {
  key: string;
  label: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface PromotionReport {
  days: number;
  since: string;
  totals: { impressions: number; clicks: number; ctr: number };
  byPromotion: Array<MetricRow & { id: string; brandName: string; title: string; active: boolean; campaignId: string | null }>;
  byCampaign: MetricRow[];
  byPage: MetricRow[];
  bySlot: MetricRow[];
  byDevice: MetricRow[];
  byPageType: MetricRow[];
  byDay: MetricRow[];
  conversions: null;
  note: string;
}

function ctr(impressions: number, clicks: number): number {
  return impressions ? Math.round((clicks / impressions) * 10000) / 100 : 0;
}

function rowsFromCounts(counts: Map<string, { impressions: number; clicks: number }>, labelFor: (key: string) => string = (key) => key): MetricRow[] {
  return [...counts.entries()]
    .map(([key, value]) => ({ key, label: labelFor(key), impressions: value.impressions, clicks: value.clicks, ctr: ctr(value.impressions, value.clicks) }))
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks);
}

export async function buildPromotionReport(days: number): Promise<PromotionReport> {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const promotions = await prisma.promotion.findMany({
    orderBy: [{ active: 'desc' }, { createdAt: 'desc' }],
    take: 500,
    select: { id: true, brandName: true, title: true, active: true, campaignId: true },
  });
  const promotionById = new Map(promotions.map((promotion) => [promotion.id, promotion]));

  const byPromotionCounts = new Map<string, { impressions: number; clicks: number }>();
  const byCampaignCounts = new Map<string, { impressions: number; clicks: number }>();
  const bump = (map: Map<string, { impressions: number; clicks: number }>, key: string, eventType: string, count: number) => {
    const entry = map.get(key) ?? { impressions: 0, clicks: 0 };
    if (eventType === 'CLICK') entry.clicks += count;
    else entry.impressions += count;
    map.set(key, entry);
  };

  const grouped = await prisma.promotionEvent.groupBy({ by: ['promotionId', 'eventType'], where: { createdAt: { gte: since } }, _count: { _all: true } });
  for (const row of grouped) {
    bump(byPromotionCounts, row.promotionId, row.eventType, row._count._all);
    const campaign = promotionById.get(row.promotionId)?.campaignId || 'No campaign ID';
    bump(byCampaignCounts, campaign, row.eventType, row._count._all);
  }

  const dimension = async (column: 'path' | 'slot' | 'device' | 'pageType') => {
    const counts = new Map<string, { impressions: number; clicks: number }>();
    try {
      const rows = await prisma.promotionEvent.groupBy({ by: [column, 'eventType'], where: { createdAt: { gte: since } }, _count: { _all: true } });
      for (const row of rows) bump(counts, String((row as Record<string, unknown>)[column] ?? 'Unknown'), row.eventType, row._count._all);
    } catch (error) {
      logger.warn(`promotions: report dimension ${column} unavailable`, { error: String(error) });
    }
    return counts;
  };

  const [pathCounts, slotCounts, deviceCounts, pageTypeCounts] = await Promise.all([dimension('path'), dimension('slot'), dimension('device'), dimension('pageType')]);

  const dayCounts = new Map<string, { impressions: number; clicks: number }>();
  try {
    const rows = await prisma.$queryRaw<Array<{ day: Date; eventType: string; count: bigint }>>`
      SELECT date_trunc('day', "createdAt") AS day, "eventType", count(*)::bigint AS count
      FROM "PromotionEvent"
      WHERE "createdAt" >= ${since}
      GROUP BY 1, 2
      ORDER BY 1 ASC`;
    for (const row of rows) bump(dayCounts, new Date(row.day).toISOString().slice(0, 10), row.eventType, Number(row.count));
  } catch (error) {
    logger.warn('promotions: daily report unavailable', { error: String(error) });
  }

  const byPromotion = promotions.map((promotion) => {
    const counts = byPromotionCounts.get(promotion.id) ?? { impressions: 0, clicks: 0 };
    return { key: promotion.id, label: `${promotion.brandName} · ${promotion.title}`, ...promotion, impressions: counts.impressions, clicks: counts.clicks, ctr: ctr(counts.impressions, counts.clicks) };
  });
  const totals = byPromotion.reduce((acc, row) => ({ impressions: acc.impressions + row.impressions, clicks: acc.clicks + row.clicks }), { impressions: 0, clicks: 0 });

  return {
    days,
    since: since.toISOString(),
    totals: { ...totals, ctr: ctr(totals.impressions, totals.clicks) },
    byPromotion,
    byCampaign: rowsFromCounts(byCampaignCounts),
    byPage: rowsFromCounts(pathCounts).slice(0, 100),
    bySlot: rowsFromCounts(slotCounts, (key) => (key === 'Unknown' || key === 'null' ? 'Unknown (legacy events)' : key)),
    byDevice: rowsFromCounts(deviceCounts, (key) => (key === 'Unknown' || key === 'null' ? 'Unknown (legacy events)' : key)),
    byPageType: rowsFromCounts(pageTypeCounts, (key) => (key === 'Unknown' || key === 'null' ? 'Unknown (legacy events)' : key)),
    byDay: [...dayCounts.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => ({ key, label: key, impressions: value.impressions, clicks: value.clicks, ctr: ctr(value.impressions, value.clicks) })),
    conversions: null,
    note: `Raw viewable impression and click events from the last ${days} days. Not unique reach. Conversions: Not configured.`,
  };
}

export const PAGE_TYPE_KEYS = PAGE_TYPES;
