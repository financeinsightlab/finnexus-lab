import type { PromotionSlot, RotationMode, TargetMode, TargetType, ThemeMode } from '@/lib/promotions/catalog';

/** Targeting rule as edited in the admin and accepted by the admin API. */
export interface TargetRuleDraft {
  mode: TargetMode;
  targetType: TargetType;
  targetValue: string;
  includeDescendants: boolean;
}

/** Placement rule as edited in the admin and accepted by the admin API. */
export interface PlacementRuleDraft {
  slot: PromotionSlot;
  weight: number;
}

/** Shape returned by GET /api/admin/content/promotions (lib/promotions/admin.ts → AdminPromotion). */
export interface AdminPromotion {
  id: string;
  brandName: string;
  title: string;
  shortDescription: string;
  fullDescription: string | null;
  logoUrl: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  lightCreativeUrl: string | null;
  darkCreativeUrl: string | null;
  ctaText: string;
  destinationUrl: string;
  affiliateUrl: string | null;
  trackingUrl: string | null;
  category: string;
  placement: string;
  targetPages: string[];
  targetContentTypes: string[];
  startsAt: string | null;
  endsAt: string | null;
  active: boolean;
  priority: number;
  displayFrequency: number;
  rotationMode: string;
  frequencyCap: number | null;
  mobileVisible: boolean;
  tabletVisible: boolean;
  desktopVisible: boolean;
  themeMode: string;
  disclosureType: string;
  disclosureText: string;
  campaignId: string | null;
  utmParameters: unknown;
  createdAt: string;
  updatedAt: string;
  targets: TargetRuleDraft[];
  placements: PlacementRuleDraft[];
  effectiveTargets: TargetRuleDraft[];
  effectivePlacements: PlacementRuleDraft[];
  derivedFromLegacy: boolean;
  targetSummary: string;
}

/** Editor state. Strings for every text input; rules are structured. */
export interface PromotionDraft {
  id?: string;
  brandName: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  logoUrl: string;
  imageUrl: string;
  videoUrl: string;
  lightCreativeUrl: string;
  darkCreativeUrl: string;
  ctaText: string;
  destinationUrl: string;
  affiliateUrl: string;
  trackingUrl: string;
  category: string;
  targets: TargetRuleDraft[];
  placements: PlacementRuleDraft[];
  startsAtLocal: string;
  endsAtLocal: string;
  active: boolean;
  priority: number;
  displayFrequency: number;
  rotationMode: RotationMode;
  frequencyCap: number | null;
  mobileVisible: boolean;
  tabletVisible: boolean;
  desktopVisible: boolean;
  themeMode: ThemeMode;
  disclosureType: string;
  disclosureText: string;
  campaignId: string;
  utmText: string;
}

export interface RegistryPage {
  path: string;
  title: string;
  isHub: boolean;
  contentKey: string | null;
}

export interface RegistryGroup {
  pageType: string;
  label: string;
  total: number;
  pages: RegistryPage[];
}

export interface PageRegistryResponse {
  query: string;
  totalPages: number;
  groups: RegistryGroup[];
  pageTypes: Array<{ key: string; label: string; group: string; description: string; globalEligible: boolean; blocked?: boolean; count: number }>;
}

export interface TargetingPreviewResponse {
  matchedTotal: number;
  totalPages: number;
  matched: Array<{ path: string; title: string; pageType: string; reason: string; slots: string[] }>;
  unmatched: Array<{ path: string; title: string; pageType: string; reason: string }>;
  warnings: string[];
}

export interface MetricRow {
  key: string;
  label: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface PromotionReportResponse {
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

export interface DebugEvaluation {
  promotionId: string;
  eligible: boolean;
  tier: number | null;
  tierLabel: string | null;
  reasons: string[];
  derivedFromLegacy: boolean;
  promotion: {
    id: string;
    brandName: string;
    title: string;
    active: boolean;
    priority: number;
    rotationMode: string;
    startsAt: string | null;
    endsAt: string | null;
    placements: PlacementRuleDraft[];
    targets: TargetRuleDraft[];
    derivedFromLegacy: boolean;
    href: string;
  };
}

export interface DebugSlotResult {
  slot: string;
  label: string;
  rendered: boolean;
  limit: number;
  winners: string[];
  ranked: Array<{ id: string; position: number; tier: number; tierLabel: string; weight: number; rotationMode: string }>;
  evaluations: DebugEvaluation[];
}

export interface DebugResponse {
  input: { path: string; slot: string | null; device: string | null; theme: string | null; at: string; tags: string[] };
  page: { pathname: string; pageType: string; pageTypeLabel: string; isHub: boolean; contentKey: string | null; tags: string[]; blocked: boolean; globalEligible: boolean; renderedSlots: string[] };
  totalPromotions: number;
  slots: DebugSlotResult[];
}
