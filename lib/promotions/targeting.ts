// lib/promotions/targeting.ts — pure promotion targeting & selection logic.
//
// No database, no Next.js imports: this module is shared by the server engine,
// the public/admin API routes, the admin targeting preview (client) and tests.
//
// SELECTION PRECEDENCE (deterministic, documented in docs/PROMOTIONS.md):
//   1. Blocked page types (admin, auth, account, checkout) never render anything.
//   2. Inactive promotions and promotions outside their schedule are dropped.
//   3. The promotion must be assigned to the requested slot, and the slot must
//      exist on the page type.
//   4. Any matching EXCLUDE rule removes the promotion.
//   5. The best matching INCLUDE rule gives the promotion a specificity tier:
//        1 exact page · 2 specific content · 3 section (path prefix)
//        4 page type / tag · 5 global
//      No matching include rule → not shown. Empty rules → not shown (global
//      must be chosen explicitly).
//   6. Device and theme targeting are applied when the caller knows them.
//   7. Ordering: lower tier first, then higher priority, then rotation (same
//      priority / rotating promotions take deterministic turns), then age.

import {
  LEGACY_CONTENT_TYPE_TO_PAGE_TYPES,
  LEGACY_GLOBAL_TOKENS,
  LEGACY_PLACEMENT_PAGE_TYPES,
  LEGACY_PLACEMENT_TO_SLOTS,
  PAGE_TYPE_META,
  SLOT_META,
  isPageType,
  isPromotionSlot,
  slotRendersOn,
  type Device,
  type PageType,
  type PromotionSlot,
  type RotationMode,
  type TargetMode,
  type TargetType,
  type ThemeMode,
} from './catalog';

// ─── Path normalisation ──────────────────────────────────────────────────────

/**
 * Canonical form used for every path comparison:
 * leading slash, no trailing slash, no query/hash, decoded, lower-case,
 * collapsed duplicate slashes. Full URLs are reduced to their pathname.
 */
export function normalizePath(input: string | null | undefined): string {
  if (!input) return '/';
  let value = String(input).trim();
  if (!value) return '/';
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) {
    try {
      value = new URL(value).pathname;
    } catch {
      return '/';
    }
  }
  value = value.split('?')[0].split('#')[0];
  try {
    value = decodeURIComponent(value);
  } catch {
    // Keep the raw value when it is not valid percent-encoding.
  }
  value = value.trim().toLowerCase();
  if (value === '' || value === 'home' || value === '/home') return '/';
  if (!value.startsWith('/')) value = `/${value}`;
  value = value.replace(/\/{2,}/g, '/').replace(/\/+$/, '');
  return value || '/';
}

/** True when `candidate` is `base` itself or a descendant path of it. */
export function isSameOrDescendantPath(base: string, candidate: string): boolean {
  if (base === '/') return true;
  return candidate === base || candidate.startsWith(`${base}/`);
}

// ─── Page classification ─────────────────────────────────────────────────────

export interface PageContext {
  /** Normalised pathname. */
  pathname: string;
  pageType: PageType;
  /** True for section hubs (/research, /tools, …) and the homepage. */
  isHub: boolean;
  /** Stable content key for CONTENT targeting, e.g. `RESEARCH:ai-search`. */
  contentKey: string | null;
  /** Lower-cased tags/categories supplied by the page for TAG targeting. */
  tags: string[];
}

const LEGAL_PATHS = new Set(['/privacy', '/terms', '/cookies', '/gdpr', '/security', '/ethics']);
const SINGLE_PAGE_TYPES: Record<string, PageType> = {
  '/pricing': 'PRICING',
  '/enterprise': 'ENTERPRISE',
  '/services': 'SERVICES',
  '/about': 'ABOUT',
  '/contact': 'CONTACT',
  '/projects': 'PROJECTS',
  '/resume': 'RESUME',
  '/speaking': 'SPEAKING',
  '/ask': 'ASK',
  '/radar': 'RADAR',
  '/status': 'STATUS',
  '/data-freshness': 'DATA_FRESHNESS',
};

/** Classify a pathname into a page type plus content key. Pure and total. */
export function resolvePageContext(
  rawPath: string,
  extras: { tags?: readonly string[] | null; contentKey?: string | null } = {},
): PageContext {
  const pathname = normalizePath(rawPath);
  const tags = [...new Set((extras.tags ?? []).map((tag) => String(tag).trim().toLowerCase()).filter(Boolean))];
  const segments = pathname === '/' ? [] : pathname.slice(1).split('/');
  const [first, second, third] = segments;
  const build = (pageType: PageType, isHub: boolean, contentKey: string | null = null): PageContext => ({
    pathname,
    pageType,
    isHub,
    contentKey: extras.contentKey ? extras.contentKey.toUpperCase() : contentKey,
    tags,
  });
  const content = (type: string, slug: string | undefined) => (slug ? `${type}:${slug}` : null);

  if (segments.length === 0) return build('HOME', true);
  if (first === 'admin') return build('ADMIN', segments.length === 1);
  if (first === 'auth' || first === 'api') return build('AUTH', true);
  if (first === 'account') return build('ACCOUNT', true);
  if (first === 'checkout') return build('CHECKOUT', true);
  if (first === 'dashboard') return build('DASHBOARD', segments.length === 1);
  if (LEGAL_PATHS.has(pathname)) return build('LEGAL', true);
  if (segments.length === 1 && SINGLE_PAGE_TYPES[pathname]) return build(SINGLE_PAGE_TYPES[pathname], true);

  switch (first) {
    case 'research':
      return second ? build('RESEARCH', false, content('RESEARCH', second)) : build('RESEARCH', true);
    case 'insights':
      return second ? build('INSIGHT', false, content('INSIGHT', second)) : build('INSIGHT', true);
    case 'tools':
      return second ? build('CALCULATOR', false, content('TOOL', second)) : build('TOOL', true);
    case 'finance-terms':
      return second ? build('FINANCE_TERM', false, content('FINANCE_TERM', second)) : build('FINANCE_TERM', true);
    case 'pgdm':
      if (!second || second === 'search') return build('COURSE', true);
      return build('COURSE', false, content('COURSE', second));
    case 'study':
      if (!second) return build('STUDY', true);
      if (second === 'placement-prep') return build('PLACEMENT_PREP', true);
      return build('STUDY', false, content('STUDY', second));
    case 'data-lab':
      return second ? build('DATA_LAB', false, content('DATA_LAB', second)) : build('DATA_LAB', true);
    case 'case-studies':
      return second ? build('CASE_STUDY', false, content('CASE_STUDY', second)) : build('CASE_STUDY', true);
    case 'certificates':
      if (!second) return build('CERTIFICATE', true);
      if (second === 'issued') return build('CERTIFICATE', false, content('CERTIFICATE', third));
      return build('CERTIFICATE', false, content('CERTIFICATE', second));
    case 'predictions':
      return build('PREDICTION', !second);
    case 'podcast':
      return second ? build('PODCAST', false, content('PODCAST', second)) : build('PODCAST', true);
    case 'tracker':
      return second ? build('TRACKER', false, content('TRACKER', second)) : build('TRACKER', true);
    case 'authors':
      return build('AUTHOR', !second, content('AUTHOR', second));
    default:
      return build('OTHER', segments.length === 1);
  }
}

// ─── Rule shapes ─────────────────────────────────────────────────────────────

export interface TargetRule {
  mode: TargetMode;
  targetType: TargetType;
  targetValue: string;
  includeDescendants: boolean;
}

export interface PlacementRule {
  slot: PromotionSlot;
  weight: number;
}

/** The subset of a Promotion row the engine needs. Legacy columns are optional. */
export interface PromotionRules {
  id: string;
  active: boolean;
  priority: number;
  startsAt: Date | string | null;
  endsAt: Date | string | null;
  createdAt: Date | string;
  mobileVisible: boolean;
  tabletVisible?: boolean | null;
  desktopVisible: boolean;
  themeMode?: string | null;
  rotationMode?: string | null;
  targets?: TargetRule[] | null;
  placements?: PlacementRule[] | null;
  /** Legacy single placement column. */
  placement?: string | null;
  /** Legacy free-text page list. */
  targetPages?: string[] | null;
  /** Legacy content-type list. */
  targetContentTypes?: string[] | null;
  /** Legacy rotation weight. */
  displayFrequency?: number | null;
}

/** Normalise an arbitrary rule object (API input, DB row) into a valid TargetRule, or null. */
export function normalizeTargetRule(input: {
  mode?: string | null;
  targetType?: string | null;
  targetValue?: string | null;
  includeDescendants?: boolean | null;
}): TargetRule | null {
  const mode: TargetMode = input.mode?.toUpperCase() === 'EXCLUDE' ? 'EXCLUDE' : 'INCLUDE';
  const targetType = String(input.targetType ?? '').toUpperCase();
  const rawValue = String(input.targetValue ?? '').trim();
  switch (targetType) {
    case 'GLOBAL':
      return { mode, targetType: 'GLOBAL', targetValue: '', includeDescendants: false };
    case 'PATH': {
      const value = normalizePath(rawValue);
      return { mode, targetType: 'PATH', targetValue: value, includeDescendants: Boolean(input.includeDescendants) };
    }
    case 'PAGE_TYPE': {
      const value = rawValue.toUpperCase();
      if (!isPageType(value)) return null;
      return { mode, targetType: 'PAGE_TYPE', targetValue: value, includeDescendants: false };
    }
    case 'CONTENT': {
      if (!rawValue.includes(':')) return null;
      const [type, ...rest] = rawValue.split(':');
      const slug = rest.join(':').trim().toLowerCase();
      if (!type.trim() || !slug) return null;
      return { mode, targetType: 'CONTENT', targetValue: `${type.trim().toUpperCase()}:${slug}`, includeDescendants: false };
    }
    case 'TAG': {
      const value = rawValue.toLowerCase();
      if (!value) return null;
      return { mode, targetType: 'TAG', targetValue: value, includeDescendants: false };
    }
    default:
      return null;
  }
}

export function normalizePlacementRule(input: { slot?: string | null; weight?: number | null }): PlacementRule | null {
  const slot = String(input.slot ?? '').toUpperCase();
  if (!isPromotionSlot(slot)) return null;
  const weight = Math.min(10, Math.max(1, Math.round(Number(input.weight) || 1)));
  return { slot, weight };
}

/** Remove duplicate rules (same mode/type/value) while preserving order. */
export function dedupeTargetRules(rules: TargetRule[]): TargetRule[] {
  const seen = new Set<string>();
  const result: TargetRule[] = [];
  for (const rule of rules) {
    const key = `${rule.mode}|${rule.targetType}|${rule.targetValue}`;
    if (seen.has(key)) {
      // Keep the most permissive descendant flag when the same path is listed twice.
      const existing = result.find((r) => `${r.mode}|${r.targetType}|${r.targetValue}` === key);
      if (existing && rule.includeDescendants) existing.includeDescendants = true;
      continue;
    }
    seen.add(key);
    result.push({ ...rule });
  }
  return result;
}

// ─── Legacy adapter (mirrors prisma/migrations/…promotion_targeting backfill) ─

export function legacyTargetsFromPromotion(p: Pick<PromotionRules, 'placement' | 'targetPages' | 'targetContentTypes'>): TargetRule[] {
  const rules: TargetRule[] = [];
  const pages = (p.targetPages ?? []).map((value) => String(value).trim()).filter(Boolean);
  const pathEntries = pages.filter((value) => !LEGACY_GLOBAL_TOKENS.has(value.toLowerCase()) && !value.toLowerCase().includes('all pages'));
  const contentTypes = (p.targetContentTypes ?? []).map((value) => String(value).trim().toUpperCase()).filter(Boolean);
  const typePageTypes = contentTypes.includes('ALL')
    ? []
    : [...new Set(contentTypes.flatMap((type) => LEGACY_CONTENT_TYPE_TO_PAGE_TYPES[type] ?? (isPageType(type) ? [type] : [])))];
  const placementPageTypes = LEGACY_PLACEMENT_PAGE_TYPES[(p.placement ?? '').toUpperCase()] ?? [];

  if (pathEntries.length > 0) {
    for (const entry of pathEntries) {
      const value = normalizePath(entry);
      rules.push({ mode: 'INCLUDE', targetType: 'PATH', targetValue: value, includeDescendants: value !== '/' });
    }
    return dedupeTargetRules(rules);
  }

  const pageTypes = typePageTypes.length > 0 ? typePageTypes : placementPageTypes;
  if (pageTypes.length > 0) {
    for (const pageType of pageTypes) rules.push({ mode: 'INCLUDE', targetType: 'PAGE_TYPE', targetValue: pageType, includeDescendants: false });
    return dedupeTargetRules(rules);
  }
  rules.push({ mode: 'INCLUDE', targetType: 'GLOBAL', targetValue: '', includeDescendants: false });
  return rules;
}

export function legacyPlacementsFromPromotion(p: Pick<PromotionRules, 'placement' | 'displayFrequency'>): PlacementRule[] {
  const slots = LEGACY_PLACEMENT_TO_SLOTS[(p.placement ?? '').toUpperCase()] ?? ['CONTENT_BOTTOM'];
  const weight = Math.min(10, Math.max(1, Number(p.displayFrequency) || 1));
  return slots.map((slot) => ({ slot, weight }));
}

/** Effective rules: explicit rows win; otherwise the legacy columns are adapted. */
export function effectiveRules(p: PromotionRules): { targets: TargetRule[]; placements: PlacementRule[]; derivedFromLegacy: boolean } {
  const targets = (p.targets ?? []).map((rule) => normalizeTargetRule(rule)).filter((rule): rule is TargetRule => rule !== null);
  const placements = (p.placements ?? []).map((rule) => normalizePlacementRule(rule)).filter((rule): rule is PlacementRule => rule !== null);
  const hasExplicitRules = (p.targets?.length ?? 0) > 0 || (p.placements?.length ?? 0) > 0;
  if (hasExplicitRules) return { targets: dedupeTargetRules(targets), placements, derivedFromLegacy: false };
  return { targets: legacyTargetsFromPromotion(p), placements: legacyPlacementsFromPromotion(p), derivedFromLegacy: true };
}

// ─── Rule descriptions (admin preview / debugger) ────────────────────────────

export function describeTargetRule(rule: TargetRule): string {
  switch (rule.targetType) {
    case 'GLOBAL':
      return 'Global (all public pages)';
    case 'PATH':
      return rule.includeDescendants ? `Section ${rule.targetValue} and its sub-pages` : `Exact page ${rule.targetValue}`;
    case 'PAGE_TYPE':
      return `Page type: ${isPageType(rule.targetValue) ? PAGE_TYPE_META[rule.targetValue].label : rule.targetValue}`;
    case 'CONTENT':
      return `Content ${rule.targetValue}`;
    case 'TAG':
      return `Tag "${rule.targetValue}"`;
    default:
      return rule.targetValue;
  }
}

export const TIER_LABELS: Record<MatchTier, string> = {
  1: 'Exact page match',
  2: 'Specific content match',
  3: 'Section match',
  4: 'Page type / tag match',
  5: 'Global targeting',
};

// ─── Evaluation ──────────────────────────────────────────────────────────────

export type MatchTier = 1 | 2 | 3 | 4 | 5;

export interface RuleMatch {
  tier: MatchTier;
  rule: TargetRule;
}

/** Does a single rule apply to this page? Returns the specificity tier when it does. */
export function matchTargetRule(rule: TargetRule, ctx: PageContext): RuleMatch | null {
  switch (rule.targetType) {
    case 'GLOBAL':
      return PAGE_TYPE_META[ctx.pageType].globalEligible ? { tier: 5, rule } : null;
    case 'PATH': {
      if (ctx.pathname === rule.targetValue) return { tier: 1, rule };
      if (rule.includeDescendants && isSameOrDescendantPath(rule.targetValue, ctx.pathname)) {
        return { tier: rule.targetValue === '/' ? 5 : 3, rule };
      }
      return null;
    }
    case 'PAGE_TYPE':
      return rule.targetValue === ctx.pageType ? { tier: 4, rule } : null;
    case 'CONTENT':
      return ctx.contentKey && ctx.contentKey === rule.targetValue ? { tier: 2, rule } : null;
    case 'TAG':
      return ctx.tags.includes(rule.targetValue) ? { tier: 4, rule } : null;
    default:
      return null;
  }
}

/** True when any INCLUDE rule reaches the page and no EXCLUDE rule removes it. */
export function targetsMatchPage(targets: TargetRule[], ctx: PageContext): RuleMatch | null {
  for (const rule of targets) {
    if (rule.mode === 'EXCLUDE' && matchTargetRule(rule, ctx)) return null;
  }
  let best: RuleMatch | null = null;
  for (const rule of targets) {
    if (rule.mode !== 'INCLUDE') continue;
    const match = matchTargetRule(rule, ctx);
    if (match && (!best || match.tier < best.tier)) best = match;
  }
  return best;
}

export interface EvaluationInput {
  context: PageContext;
  /** Slot being rendered; null evaluates targeting only (admin preview). */
  slot: PromotionSlot | null;
  device?: Device | null;
  theme?: 'light' | 'dark' | null;
  /** Epoch milliseconds used for schedule checks. */
  now: number;
}

export interface Evaluation {
  promotionId: string;
  eligible: boolean;
  tier: MatchTier | null;
  /** Human-readable reasons, first one is the decisive one. */
  reasons: string[];
  derivedFromLegacy: boolean;
}

function toTime(value: Date | string | null | undefined): number | null {
  if (!value) return null;
  const time = value instanceof Date ? value.getTime() : new Date(value).getTime();
  return Number.isFinite(time) ? time : null;
}

function isDeviceVisible(p: PromotionRules, device: Device): boolean {
  if (device === 'mobile') return p.mobileVisible;
  if (device === 'tablet') return p.tabletVisible ?? true;
  return p.desktopVisible;
}

export function evaluatePromotion(p: PromotionRules, input: EvaluationInput): Evaluation {
  const { context, slot, now } = input;
  const { targets, placements, derivedFromLegacy } = effectiveRules(p);
  const fail = (reason: string): Evaluation => ({ promotionId: p.id, eligible: false, tier: null, reasons: [reason], derivedFromLegacy });
  const pageMeta = PAGE_TYPE_META[context.pageType];

  if (pageMeta.blocked) return fail(`Promotions never render on ${pageMeta.label.toLowerCase()} pages`);
  if (!p.active) return fail('Inactive');

  const starts = toTime(p.startsAt);
  const ends = toTime(p.endsAt);
  if (starts !== null && starts > now) return fail(`Scheduled to start ${new Date(starts).toISOString()}`);
  if (ends !== null && ends < now) return fail(`Ended ${new Date(ends).toISOString()}`);

  if (slot) {
    if (!placements.some((placement) => placement.slot === slot)) {
      const assigned = placements.map((placement) => SLOT_META[placement.slot].label).join(', ') || 'none';
      return fail(`Not assigned to slot ${SLOT_META[slot].label} (assigned: ${assigned})`);
    }
    if (!slotRendersOn(slot, context.pageType, context.isHub)) {
      return fail(`Slot ${SLOT_META[slot].label} is not rendered on ${pageMeta.label.toLowerCase()} ${context.isHub ? 'hub' : 'pages'}`);
    }
  }

  for (const rule of targets) {
    if (rule.mode === 'EXCLUDE' && matchTargetRule(rule, context)) return fail(`Excluded by rule: ${describeTargetRule(rule)}`);
  }
  if (!targets.some((rule) => rule.mode === 'INCLUDE')) return fail('No targeting rules — add pages, page types or choose Global');
  const match = targetsMatchPage(targets, context);
  if (!match) {
    const hasGlobal = targets.some((rule) => rule.mode === 'INCLUDE' && rule.targetType === 'GLOBAL');
    return fail(hasGlobal ? `Global targeting does not reach ${pageMeta.label.toLowerCase()} pages` : 'No targeting rule matches this page');
  }

  if (!p.mobileVisible && !(p.tabletVisible ?? true) && !p.desktopVisible) return fail('Hidden on every device');
  if (input.device && !isDeviceVisible(p, input.device)) return fail(`Hidden on ${input.device}`);

  const themeMode = (p.themeMode ?? 'ALL').toUpperCase() as ThemeMode;
  if (input.theme && themeMode !== 'ALL' && themeMode.toLowerCase() !== input.theme) {
    return fail(`${themeMode === 'DARK' ? 'Dark' : 'Light'} theme only`);
  }

  const reasons = [`${TIER_LABELS[match.tier]}: ${describeTargetRule(match.rule)}`];
  if (input.device) reasons.push(`Visible on ${input.device}`);
  if (themeMode !== 'ALL') reasons.push(`${themeMode === 'DARK' ? 'Dark' : 'Light'} theme only`);
  return { promotionId: p.id, eligible: true, tier: match.tier, reasons, derivedFromLegacy };
}

// ─── Ordering & rotation ─────────────────────────────────────────────────────

/** FNV-1a 32-bit hash — small, fast, deterministic across runtimes. */
export function stableHash(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

export const ROTATION_INTERVAL_MS = 5 * 60 * 1000;

/**
 * Rotation seed: changes every 5 minutes and differs per page+slot, so a cached
 * page is stable within its cache window while different pages (and the next
 * window) move the rotation forward. No in-memory state is involved.
 */
export function rotationSeed(now: number, pathname: string, slot: string): number {
  return (Math.floor(now / ROTATION_INTERVAL_MS) + stableHash(`${pathname}|${slot}`)) >>> 0;
}

export interface Candidate<T extends PromotionRules = PromotionRules> {
  promotion: T;
  tier: MatchTier;
  weight: number;
  rotationMode: RotationMode;
}

function rotationModeOf(p: PromotionRules): RotationMode {
  const mode = (p.rotationMode ?? 'PRIORITY').toUpperCase();
  return mode === 'ROTATE' || mode === 'WEIGHTED' || mode === 'RANDOM' ? mode : 'PRIORITY';
}

function byPriorityThenAge<T extends PromotionRules>(a: Candidate<T>, b: Candidate<T>): number {
  if (b.promotion.priority !== a.promotion.priority) return b.promotion.priority - a.promotion.priority;
  const ageA = toTime(a.promotion.createdAt) ?? 0;
  const ageB = toTime(b.promotion.createdAt) ?? 0;
  if (ageA !== ageB) return ageA - ageB;
  return a.promotion.id.localeCompare(b.promotion.id);
}

/** Weighted, deterministic rotation of a pool: returns the pool in rotated order. */
function rotatePool<T extends PromotionRules>(pool: Candidate<T>[], seed: number): Candidate<T>[] {
  if (pool.length <= 1) return pool;
  if (pool.some((candidate) => candidate.rotationMode === 'RANDOM')) {
    const hourSeed = Math.floor(seed / (60 / 5));
    return [...pool].sort((a, b) => stableHash(`${hourSeed}|${a.promotion.id}`) - stableHash(`${hourSeed}|${b.promotion.id}`));
  }
  const weighted = pool.some((candidate) => candidate.rotationMode === 'WEIGHTED');
  const cycle = pool.flatMap((candidate) => Array.from({ length: weighted ? candidate.weight : 1 }, () => candidate));
  const start = seed % cycle.length;
  const rotated: Candidate<T>[] = [];
  for (let i = 0; i < cycle.length; i += 1) {
    const candidate = cycle[(start + i) % cycle.length];
    if (!rotated.includes(candidate)) rotated.push(candidate);
  }
  return rotated;
}

/**
 * Order eligible candidates for one slot.
 * Tier → priority → rotation → age. Within a tier, promotions whose rotation
 * mode is not PRIORITY form a pool that takes turns; the pool sits at the
 * position of its highest-priority member. PRIORITY promotions with equal
 * priority also take turns so that ties are shared fairly.
 */
export function orderCandidates<T extends PromotionRules>(candidates: Candidate<T>[], seed: number): Candidate<T>[] {
  const tiers = new Map<MatchTier, Candidate<T>[]>();
  for (const candidate of candidates) {
    const list = tiers.get(candidate.tier) ?? [];
    list.push(candidate);
    tiers.set(candidate.tier, list);
  }
  const ordered: Candidate<T>[] = [];
  for (const tier of [...tiers.keys()].sort((a, b) => a - b)) {
    const group = [...(tiers.get(tier) ?? [])].sort(byPriorityThenAge);
    const pool = group.filter((candidate) => candidate.rotationMode !== 'PRIORITY');
    const fixed = group.filter((candidate) => candidate.rotationMode === 'PRIORITY');
    if (pool.length >= 2) {
      const poolPriority = Math.max(...pool.map((candidate) => candidate.promotion.priority));
      const rotatedPool = rotatePool(pool, seed);
      ordered.push(
        ...fixed.filter((candidate) => candidate.promotion.priority > poolPriority),
        ...rotatedPool,
        ...fixed.filter((candidate) => candidate.promotion.priority <= poolPriority),
      );
      continue;
    }
    // Equal-priority ties take deterministic turns.
    let index = 0;
    while (index < group.length) {
      let end = index + 1;
      while (end < group.length && group[end].promotion.priority === group[index].promotion.priority) end += 1;
      const tie = group.slice(index, end);
      if (tie.length > 1) {
        const start = seed % tie.length;
        ordered.push(...tie.slice(start), ...tie.slice(0, start));
      } else {
        ordered.push(...tie);
      }
      index = end;
    }
  }
  return ordered;
}

export interface SelectionResult<T extends PromotionRules> {
  selected: T[];
  evaluations: Evaluation[];
  /** Ordered eligible candidates before the limit was applied. */
  ranked: Candidate<T>[];
}

/** Evaluate every promotion for a page+slot and return the ordered winners. */
export function selectPromotions<T extends PromotionRules>(
  promotions: readonly T[],
  input: EvaluationInput,
  options: { limit?: number; seed?: number } = {},
): SelectionResult<T> {
  const limit = Math.max(0, options.limit ?? 1);
  const seed = options.seed ?? rotationSeed(input.now, input.context.pathname, input.slot ?? '');
  const evaluations: Evaluation[] = [];
  const candidates: Candidate<T>[] = [];
  for (const promotion of promotions) {
    const evaluation = evaluatePromotion(promotion, input);
    evaluations.push(evaluation);
    if (!evaluation.eligible || evaluation.tier === null) continue;
    const { placements } = effectiveRules(promotion);
    const weight = input.slot ? placements.find((placement) => placement.slot === input.slot)?.weight ?? 1 : 1;
    candidates.push({ promotion, tier: evaluation.tier, weight, rotationMode: rotationModeOf(promotion) });
  }
  const ranked = orderCandidates(candidates, seed);
  return { selected: ranked.slice(0, limit).map((candidate) => candidate.promotion), evaluations, ranked };
}

// ─── Summaries for the admin UI ──────────────────────────────────────────────

export function summarizeTargets(targets: TargetRule[]): { label: string; includeCount: number; excludeCount: number; isGlobal: boolean } {
  const includes = targets.filter((rule) => rule.mode === 'INCLUDE');
  const excludes = targets.filter((rule) => rule.mode === 'EXCLUDE');
  const isGlobal = includes.some((rule) => rule.targetType === 'GLOBAL');
  const paths = includes.filter((rule) => rule.targetType === 'PATH').length;
  const types = includes.filter((rule) => rule.targetType === 'PAGE_TYPE').map((rule) => (isPageType(rule.targetValue) ? PAGE_TYPE_META[rule.targetValue].label : rule.targetValue));
  const contents = includes.filter((rule) => rule.targetType === 'CONTENT').length;
  const tags = includes.filter((rule) => rule.targetType === 'TAG').length;
  const parts: string[] = [];
  if (isGlobal) parts.push('All public pages');
  if (types.length) parts.push(types.slice(0, 3).join(', ') + (types.length > 3 ? ` +${types.length - 3}` : ''));
  if (paths) parts.push(`${paths} page${paths === 1 ? '' : 's'}`);
  if (contents) parts.push(`${contents} content item${contents === 1 ? '' : 's'}`);
  if (tags) parts.push(`${tags} tag${tags === 1 ? '' : 's'}`);
  if (excludes.length) parts.push(`${excludes.length} exclusion${excludes.length === 1 ? '' : 's'}`);
  return { label: parts.join(' · ') || 'No targeting (never shown)', includeCount: includes.length, excludeCount: excludes.length, isGlobal };
}
