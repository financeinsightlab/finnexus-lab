// lib/promotions/engine.ts — server-side promotion selection.
//
// One cached query loads every active promotion with its rules (120 s,
// tag `public-promotions`, invalidated by the admin API). Each request then
// evaluates slots in memory via lib/promotions/targeting — no per-slot
// queries, no N+1, no global mutable state, and the same answer for the same
// page within a cache window so static/ISR output stays consistent.

import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import type { Device, PromotionSlot } from './catalog';
import { SLOT_META } from './catalog';
import { getPromotionHref } from './href';
import {
  resolvePageContext,
  selectPromotions,
  type Evaluation,
  type PageContext,
  type PlacementRule,
  type PromotionRules,
  type TargetRule,
} from './targeting';

export const PROMOTIONS_CACHE_TAG = 'public-promotions';
const ACTIVE_LIMIT = 200;

/** A promotion row together with its explicit rules (relations may be empty for un-migrated rows). */
export interface PromotionRecord extends PromotionRules {
  id: string;
  brandName: string;
  title: string;
  shortDescription: string;
  fullDescription: string | null;
  logoUrl: string | null;
  imageUrl: string | null;
  lightCreativeUrl: string | null;
  darkCreativeUrl: string | null;
  videoUrl: string | null;
  ctaText: string;
  destinationUrl: string;
  affiliateUrl: string | null;
  trackingUrl: string | null;
  category: string;
  placement: string;
  targetPages: string[];
  targetContentTypes: string[];
  startsAt: Date | string | null;
  endsAt: Date | string | null;
  active: boolean;
  priority: number;
  displayFrequency: number;
  mobileVisible: boolean;
  tabletVisible: boolean;
  desktopVisible: boolean;
  themeMode: string;
  rotationMode: string;
  frequencyCap: number | null;
  disclosureType: string;
  disclosureText: string;
  campaignId: string | null;
  utmParameters: unknown;
  conversionTrackingUrl: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  targets: TargetRule[];
  placements: PlacementRule[];
}

/** Public, serialisable shape handed to the card components and the public API. */
export interface PromotionDTO {
  id: string;
  slot: PromotionSlot | null;
  brandName: string;
  title: string;
  shortDescription: string;
  logoUrl: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  lightCreativeUrl: string | null;
  darkCreativeUrl: string | null;
  ctaText: string;
  disclosureType: string;
  disclosureText: string;
  href: string;
  mobileVisible: boolean;
  tabletVisible: boolean;
  desktopVisible: boolean;
  themeMode: string;
  frequencyCap: number | null;
}

export type RawPromotionRow = Omit<PromotionRecord, 'targets' | 'placements' | 'videoUrl' | 'tabletVisible' | 'themeMode' | 'rotationMode' | 'frequencyCap'> & {
  targets?: Array<{ mode: string; targetType: string; targetValue: string; includeDescendants: boolean }>;
  placements?: Array<{ slot: string; weight: number }>;
  tabletVisible?: boolean;
  themeMode?: string;
  rotationMode?: string;
  frequencyCap?: number | null;
  videoUrl?: string | null;
};

/** Normalise a Prisma row (with or without relations / new columns) into a PromotionRecord. */
export function toRecordFromRow(row: RawPromotionRow): PromotionRecord {
  return {
    ...row,
    videoUrl: row.videoUrl ?? null,
    tabletVisible: row.tabletVisible ?? true,
    themeMode: row.themeMode ?? 'ALL',
    rotationMode: row.rotationMode ?? 'PRIORITY',
    frequencyCap: row.frequencyCap ?? null,
    targets: (row.targets ?? []).map((target) => ({
      mode: target.mode === 'EXCLUDE' ? 'EXCLUDE' : 'INCLUDE',
      targetType: target.targetType as TargetRule['targetType'],
      targetValue: target.targetValue,
      includeDescendants: Boolean(target.includeDescendants),
    })),
    placements: (row.placements ?? []).map((placement) => ({
      slot: placement.slot as PromotionSlot,
      weight: placement.weight,
    })),
  };
}

export function toPromotionDTO(promotion: PromotionRecord, slot: PromotionSlot | null = null): PromotionDTO {
  return {
    id: promotion.id,
    slot,
    brandName: promotion.brandName,
    title: promotion.title,
    shortDescription: promotion.shortDescription,
    logoUrl: promotion.logoUrl,
    imageUrl: promotion.imageUrl,
    videoUrl: promotion.videoUrl,
    lightCreativeUrl: promotion.lightCreativeUrl,
    darkCreativeUrl: promotion.darkCreativeUrl,
    ctaText: promotion.ctaText,
    disclosureType: promotion.disclosureType,
    disclosureText: promotion.disclosureText,
    href: getPromotionHref(promotion),
    mobileVisible: promotion.mobileVisible,
    tabletVisible: promotion.tabletVisible,
    desktopVisible: promotion.desktopVisible,
    themeMode: promotion.themeMode,
    frequencyCap: promotion.frequencyCap,
  };
}

// ─── Loading ─────────────────────────────────────────────────────────────────

const ACTIVE_WHERE = { active: true } as const;
const ACTIVE_ORDER = [{ priority: 'desc' as const }, { createdAt: 'asc' as const }];

/**
 * Loads active promotions with their rules. When the targeting tables do not
 * exist yet (app deployed before the migration ran) it falls back to the plain
 * row and the legacy-column adapter in targeting.ts takes over.
 */
export async function fetchActivePromotions(): Promise<PromotionRecord[]> {
  try {
    const rows = await prisma.promotion.findMany({
      where: ACTIVE_WHERE,
      include: { targets: true, placements: true },
      orderBy: ACTIVE_ORDER,
      take: ACTIVE_LIMIT,
    });
    return rows.map((row) => toRecordFromRow(row as unknown as RawPromotionRow));
  } catch (error) {
    logger.warn('promotions: relation query failed, falling back to legacy columns', { error: String(error) });
    const rows = await prisma.promotion.findMany({ where: ACTIVE_WHERE, orderBy: ACTIVE_ORDER, take: ACTIVE_LIMIT });
    return rows.map((row) => toRecordFromRow(row as unknown as RawPromotionRow));
  }
}

const cachedActivePromotions = unstable_cache(fetchActivePromotions, ['active-promotions-v4'], {
  revalidate: 120,
  tags: [PROMOTIONS_CACHE_TAG],
});

/** Request-deduplicated, cache-backed list of active promotions. Never throws. */
export const getActivePromotions = cache(async (): Promise<PromotionRecord[]> => {
  try {
    return await cachedActivePromotions();
  } catch (cacheError) {
    try {
      return await fetchActivePromotions();
    } catch (error) {
      logger.error('promotions: unable to load active promotions', { cacheError: String(cacheError), error: String(error) });
      return [];
    }
  }
});

// ─── Selection ───────────────────────────────────────────────────────────────

export interface EligiblePromotionsInput {
  /** Current pathname (query strings are ignored). */
  pathname: string;
  /** Slot requested by the component. */
  slot: PromotionSlot;
  /** Optional tags/categories of the current content for TAG rules. */
  tags?: readonly string[] | null;
  /** Override the content key derived from the URL (rarely needed). */
  contentKey?: string | null;
  /** How many promotions the slot renders. Defaults to the slot's catalogue value. */
  limit?: number;
  /** Only when the caller knows the device/theme (client-side requests). Server renders rely on CSS. */
  device?: Device | null;
  theme?: 'light' | 'dark' | null;
  /** Time reference for schedule + rotation. Defaults to Date.now(). */
  now?: number;
}

export interface EligiblePromotionsResult {
  promotions: PromotionRecord[];
  context: PageContext;
  evaluations: Evaluation[];
}

/**
 * Central selection entry point. Pure once the promotions are loaded, so the
 * admin debugger can call it with a custom list and explain every decision.
 */
export function evaluateEligiblePromotions(promotions: readonly PromotionRecord[], input: EligiblePromotionsInput): EligiblePromotionsResult {
  const context = resolvePageContext(input.pathname, { tags: input.tags, contentKey: input.contentKey });
  const limit = input.limit ?? SLOT_META[input.slot].maxPerPage;
  const result = selectPromotions(promotions, {
    context,
    slot: input.slot,
    device: input.device ?? null,
    theme: input.theme ?? null,
    now: input.now ?? Date.now(),
  }, { limit });
  return { promotions: result.selected, context, evaluations: result.evaluations };
}

export async function getEligiblePromotions(input: EligiblePromotionsInput): Promise<EligiblePromotionsResult> {
  const promotions = await getActivePromotions();
  return evaluateEligiblePromotions(promotions, input);
}

/** Convenience for components: DTOs ready to render for one slot. Never throws. */
export async function getPromotionsForSlot(input: EligiblePromotionsInput): Promise<PromotionDTO[]> {
  try {
    const { promotions } = await getEligiblePromotions(input);
    return promotions.map((promotion) => toPromotionDTO(promotion, input.slot));
  } catch (error) {
    logger.error('promotions: slot selection failed', { slot: input.slot, pathname: input.pathname, error: String(error) });
    return [];
  }
}

/** Backwards-compatible single-promotion helper. */
export async function getPromotionForSlot(input: EligiblePromotionsInput): Promise<PromotionDTO | null> {
  const [first] = await getPromotionsForSlot({ ...input, limit: 1 });
  return first ?? null;
}
