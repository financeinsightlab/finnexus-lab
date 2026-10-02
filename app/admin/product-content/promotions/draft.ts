import { isPromotionSlot, ROTATION_MODES, THEME_MODES, type RotationMode, type ThemeMode } from '@/lib/promotions/catalog';
import { normalizePath } from '@/lib/promotions/targeting';
import { dateToLocal, localToIso } from '../ui';
import type { AdminPromotion, PlacementRuleDraft, PromotionDraft, TargetRuleDraft } from './types';

export const DEFAULT_DISCLOSURE = 'Sponsored · Paid promotion';

export function blankDraft(): PromotionDraft {
  return {
    brandName: '',
    title: '',
    shortDescription: '',
    fullDescription: '',
    logoUrl: '',
    imageUrl: '',
    videoUrl: '',
    lightCreativeUrl: '',
    darkCreativeUrl: '',
    ctaText: 'Learn more',
    destinationUrl: '',
    affiliateUrl: '',
    trackingUrl: '',
    category: 'Education',
    // Deliberately empty: targeting must be chosen explicitly (never Global by default).
    targets: [],
    placements: [{ slot: 'CONTENT_BOTTOM', weight: 1 }],
    startsAtLocal: '',
    endsAtLocal: '',
    active: false,
    priority: 0,
    displayFrequency: 1,
    rotationMode: 'PRIORITY',
    frequencyCap: null,
    mobileVisible: true,
    tabletVisible: true,
    desktopVisible: true,
    themeMode: 'ALL',
    disclosureType: 'SPONSORED',
    disclosureText: DEFAULT_DISCLOSURE,
    campaignId: '',
    utmText: '{}',
  };
}

function asRotationMode(value: string | null | undefined): RotationMode {
  return (ROTATION_MODES as readonly string[]).includes(value ?? '') ? (value as RotationMode) : 'PRIORITY';
}

function asThemeMode(value: string | null | undefined): ThemeMode {
  return (THEME_MODES as readonly string[]).includes(value ?? '') ? (value as ThemeMode) : 'ALL';
}

/** Editor state for an existing promotion. Legacy records get their derived rules materialised. */
export function draftFromPromotion(promotion: AdminPromotion): PromotionDraft {
  return {
    id: promotion.id,
    brandName: promotion.brandName,
    title: promotion.title,
    shortDescription: promotion.shortDescription,
    fullDescription: promotion.fullDescription ?? '',
    logoUrl: promotion.logoUrl ?? '',
    imageUrl: promotion.imageUrl ?? '',
    videoUrl: promotion.videoUrl ?? '',
    lightCreativeUrl: promotion.lightCreativeUrl ?? '',
    darkCreativeUrl: promotion.darkCreativeUrl ?? '',
    ctaText: promotion.ctaText,
    destinationUrl: promotion.destinationUrl,
    affiliateUrl: promotion.affiliateUrl ?? '',
    trackingUrl: promotion.trackingUrl ?? '',
    category: promotion.category,
    targets: promotion.effectiveTargets.map((rule) => ({ ...rule })),
    placements: promotion.effectivePlacements.filter((rule) => isPromotionSlot(rule.slot)).map((rule) => ({ ...rule })),
    startsAtLocal: dateToLocal(promotion.startsAt),
    endsAtLocal: dateToLocal(promotion.endsAt),
    active: promotion.active,
    priority: promotion.priority,
    displayFrequency: promotion.displayFrequency,
    rotationMode: asRotationMode(promotion.rotationMode),
    frequencyCap: promotion.frequencyCap ?? null,
    mobileVisible: promotion.mobileVisible,
    tabletVisible: promotion.tabletVisible ?? true,
    desktopVisible: promotion.desktopVisible,
    themeMode: asThemeMode(promotion.themeMode),
    disclosureType: promotion.disclosureType,
    disclosureText: promotion.disclosureText,
    campaignId: promotion.campaignId ?? '',
    utmText: JSON.stringify(promotion.utmParameters ?? {}, null, 2),
  };
}

/** Duplicate-in-editor: same creative and rules, new (inactive) record. */
export function cloneDraft(draft: PromotionDraft): PromotionDraft {
  return { ...draft, id: undefined, title: `${draft.title} (copy)`, active: false, targets: draft.targets.map((rule) => ({ ...rule })), placements: draft.placements.map((rule) => ({ ...rule })) };
}

const trimOrNull = (value: string) => (value.trim() ? value.trim() : null);

/** Convert editor state into the admin API payload. Throws a readable error for bad UTM JSON. */
export function draftToPayload(draft: PromotionDraft) {
  let utmParameters: unknown = null;
  if (draft.utmText.trim()) {
    utmParameters = JSON.parse(draft.utmText);
    if (!utmParameters || typeof utmParameters !== 'object' || Array.isArray(utmParameters)) throw new Error('UTM parameters must be a JSON object such as {"utm_source":"kunwar"}.');
  }
  return {
    id: draft.id,
    brandName: draft.brandName.trim(),
    title: draft.title.trim(),
    shortDescription: draft.shortDescription.trim(),
    fullDescription: trimOrNull(draft.fullDescription),
    logoUrl: trimOrNull(draft.logoUrl),
    imageUrl: trimOrNull(draft.imageUrl),
    videoUrl: trimOrNull(draft.videoUrl),
    lightCreativeUrl: trimOrNull(draft.lightCreativeUrl),
    darkCreativeUrl: trimOrNull(draft.darkCreativeUrl),
    ctaText: draft.ctaText.trim(),
    destinationUrl: draft.destinationUrl.trim(),
    affiliateUrl: trimOrNull(draft.affiliateUrl),
    trackingUrl: trimOrNull(draft.trackingUrl),
    category: draft.category.trim(),
    targets: draft.targets,
    placements: draft.placements,
    startsAt: draft.startsAtLocal ? localToIso(draft.startsAtLocal) : null,
    endsAt: draft.endsAtLocal ? localToIso(draft.endsAtLocal) : null,
    active: draft.active,
    priority: draft.priority,
    displayFrequency: draft.displayFrequency,
    rotationMode: draft.rotationMode,
    frequencyCap: draft.frequencyCap,
    mobileVisible: draft.mobileVisible,
    tabletVisible: draft.tabletVisible,
    desktopVisible: draft.desktopVisible,
    themeMode: draft.themeMode,
    disclosureType: draft.disclosureType,
    disclosureText: draft.disclosureText.trim(),
    campaignId: trimOrNull(draft.campaignId),
    utmParameters,
  };
}

// ─── Rule helpers ────────────────────────────────────────────────────────────

export function ruleKey(rule: TargetRuleDraft): string {
  return `${rule.mode}|${rule.targetType}|${normalizeRuleValue(rule)}`;
}

export function hasRule(rules: TargetRuleDraft[], rule: TargetRuleDraft): boolean {
  const key = ruleKey(rule);
  return rules.some((candidate) => ruleKey(candidate) === key);
}

/** Add rules, replacing any existing rule with the same key (so toggling descendants updates in place). */
export function upsertRules(rules: TargetRuleDraft[], additions: TargetRuleDraft[]): TargetRuleDraft[] {
  const next = [...rules];
  for (const addition of additions) {
    const key = ruleKey(addition);
    const index = next.findIndex((candidate) => ruleKey(candidate) === key);
    const normalized: TargetRuleDraft = {
      mode: addition.mode,
      targetType: addition.targetType,
      targetValue: normalizeRuleValue(addition),
      includeDescendants: addition.targetType === 'PATH' ? Boolean(addition.includeDescendants) : false,
    };
    if (index >= 0) next[index] = normalized;
    else next.push(normalized);
  }
  return next;
}

/** Mirror of the server-side normalisation (lib/promotions/targeting.ts → normalizeTargetRule). */
export function normalizeRuleValue(rule: Pick<TargetRuleDraft, 'targetType' | 'targetValue'>): string {
  const raw = rule.targetValue.trim();
  switch (rule.targetType) {
    case 'GLOBAL':
      return '';
    case 'PATH':
      return normalizePath(raw);
    case 'PAGE_TYPE':
      return raw.toUpperCase();
    case 'CONTENT': {
      const [type, ...rest] = raw.split(':');
      return `${type.trim().toUpperCase()}:${rest.join(':').trim().toLowerCase()}`;
    }
    case 'TAG':
      return raw.toLowerCase();
    default:
      return raw;
  }
}

export function removeRules(rules: TargetRuleDraft[], removals: TargetRuleDraft[]): TargetRuleDraft[] {
  const keys = new Set(removals.map(ruleKey));
  return rules.filter((rule) => !keys.has(ruleKey(rule)));
}

export function togglePlacement(placements: PlacementRuleDraft[], slot: PlacementRuleDraft['slot']): PlacementRuleDraft[] {
  return placements.some((rule) => rule.slot === slot) ? placements.filter((rule) => rule.slot !== slot) : [...placements, { slot, weight: 1 }];
}

export function setPlacementWeight(placements: PlacementRuleDraft[], slot: PlacementRuleDraft['slot'], weight: number): PlacementRuleDraft[] {
  const clamped = Math.min(10, Math.max(1, Math.round(Number.isFinite(weight) ? weight : 1)));
  return placements.map((rule) => (rule.slot === slot ? { ...rule, weight: clamped } : rule));
}

/** Short human label for a rule (client-side twin of describeTargetRule with the mode prefix). */
export function ruleBadge(rule: TargetRuleDraft): { text: string; tone: 'primary' | 'danger' | 'warning' } {
  const prefix = rule.mode === 'EXCLUDE' ? 'Exclude ' : '';
  let text: string;
  switch (rule.targetType) {
    case 'GLOBAL':
      text = 'Global · all public pages';
      break;
    case 'PATH':
      text = rule.includeDescendants ? `${rule.targetValue} + sub-pages` : rule.targetValue;
      break;
    case 'PAGE_TYPE':
      text = `Type: ${rule.targetValue}`;
      break;
    case 'CONTENT':
      text = `Content: ${rule.targetValue}`;
      break;
    case 'TAG':
      text = `Tag: ${rule.targetValue}`;
      break;
    default:
      text = rule.targetValue;
  }
  return { text: prefix + text, tone: rule.mode === 'EXCLUDE' ? 'danger' : rule.targetType === 'GLOBAL' ? 'warning' : 'primary' };
}
