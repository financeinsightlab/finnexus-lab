import { describe, expect, it } from 'vitest';
import {
  dedupeTargetRules,
  effectiveRules,
  evaluatePromotion,
  legacyPlacementsFromPromotion,
  legacyTargetsFromPromotion,
  normalizePath,
  normalizeTargetRule,
  orderCandidates,
  resolvePageContext,
  rotationSeed,
  selectPromotions,
  stableHash,
  summarizeTargets,
  type PromotionRules,
  type TargetRule,
} from './targeting';
import { getPromotionHref, sanitizeUtmParameters } from './href';
import { deviceVisibilityClass, pickCreative, themeVisibilityClass } from './display';
import { PROMOTION_SLOTS, SLOT_META, slotRendersOn } from './catalog';

const NOW = Date.parse('2026-10-15T12:00:00Z');

function promo(id: string, overrides: Partial<PromotionRules> = {}): PromotionRules {
  return {
    id,
    active: true,
    priority: 0,
    startsAt: null,
    endsAt: null,
    createdAt: '2026-01-01T00:00:00Z',
    mobileVisible: true,
    tabletVisible: true,
    desktopVisible: true,
    themeMode: 'ALL',
    rotationMode: 'PRIORITY',
    targets: [],
    placements: [{ slot: 'CONTENT_BOTTOM', weight: 1 }],
    ...overrides,
  };
}

const include = (targetType: TargetRule['targetType'], targetValue = '', includeDescendants = false): TargetRule => ({ mode: 'INCLUDE', targetType, targetValue, includeDescendants });
const exclude = (targetType: TargetRule['targetType'], targetValue = '', includeDescendants = false): TargetRule => ({ mode: 'EXCLUDE', targetType, targetValue, includeDescendants });

function select(promotions: PromotionRules[], path: string, slot: Parameters<typeof selectPromotions>[1]['slot'] = 'CONTENT_BOTTOM', extra: Partial<Parameters<typeof selectPromotions>[1]> = {}, limit = 5) {
  return selectPromotions(promotions, { context: resolvePageContext(path), slot, now: NOW, ...extra }, { limit }).selected.map((p) => p.id);
}

describe('normalizePath', () => {
  it('normalises slashes, case, query strings, hashes and encoding', () => {
    expect(normalizePath('research')).toBe('/research');
    expect(normalizePath('/Research/')).toBe('/research');
    expect(normalizePath('/research/ai-search?utm=1#top')).toBe('/research/ai-search');
    expect(normalizePath('//research//ai-search//')).toBe('/research/ai-search');
    expect(normalizePath('/research/ai%2Dsearch')).toBe('/research/ai-search');
    expect(normalizePath('https://kunwaranalytics.in/tools/sip-calculator/?x=1')).toBe('/tools/sip-calculator');
    expect(normalizePath('')).toBe('/');
    expect(normalizePath('home')).toBe('/');
    expect(normalizePath('   ')).toBe('/');
  });
});

describe('resolvePageContext', () => {
  it('classifies hubs, detail pages and private areas', () => {
    expect(resolvePageContext('/')).toMatchObject({ pageType: 'HOME', isHub: true });
    expect(resolvePageContext('/research')).toMatchObject({ pageType: 'RESEARCH', isHub: true, contentKey: null });
    expect(resolvePageContext('/research/ai-search')).toMatchObject({ pageType: 'RESEARCH', isHub: false, contentKey: 'RESEARCH:ai-search' });
    expect(resolvePageContext('/tools')).toMatchObject({ pageType: 'TOOL', isHub: true });
    expect(resolvePageContext('/tools/sip-calculator')).toMatchObject({ pageType: 'CALCULATOR', contentKey: 'TOOL:sip-calculator' });
    expect(resolvePageContext('/pgdm/economics/lecture-1')).toMatchObject({ pageType: 'COURSE', isHub: false, contentKey: 'COURSE:economics' });
    expect(resolvePageContext('/study/placement-prep')).toMatchObject({ pageType: 'PLACEMENT_PREP' });
    expect(resolvePageContext('/study/excel-basics/lessons/intro')).toMatchObject({ pageType: 'STUDY', contentKey: 'STUDY:excel-basics' });
    expect(resolvePageContext('/finance-terms/npv')).toMatchObject({ pageType: 'FINANCE_TERM', contentKey: 'FINANCE_TERM:npv' });
    expect(resolvePageContext('/dashboard')).toMatchObject({ pageType: 'DASHBOARD' });
    expect(resolvePageContext('/admin/product-content')).toMatchObject({ pageType: 'ADMIN' });
    expect(resolvePageContext('/auth/signin')).toMatchObject({ pageType: 'AUTH' });
    expect(resolvePageContext('/privacy')).toMatchObject({ pageType: 'LEGAL' });
    expect(resolvePageContext('/something-new')).toMatchObject({ pageType: 'OTHER' });
  });

  it('lower-cases and de-duplicates tags', () => {
    expect(resolvePageContext('/research/x', { tags: ['FinTech', 'fintech', ' AI '] }).tags).toEqual(['fintech', 'ai']);
  });
});

describe('targeting precedence', () => {
  it('never shows a promotion without include rules (global must be explicit)', () => {
    const p = promo('a', { targets: [] });
    const evaluation = evaluatePromotion(p, { context: resolvePageContext('/research'), slot: 'CONTENT_BOTTOM', now: NOW });
    expect(evaluation.eligible).toBe(false);
    expect(evaluation.reasons[0]).toMatch(/No targeting rules/);
  });

  it('matches exact pages without matching descendants unless includeDescendants is set', () => {
    const exact = promo('exact', { targets: [include('PATH', '/research')] });
    const section = promo('section', { targets: [include('PATH', '/research', true)] });
    expect(select([exact, section], '/research')).toEqual(['exact', 'section']);
    expect(select([exact, section], '/research/ai-search')).toEqual(['section']);
    expect(select([exact, section], '/research-notes')).toEqual([]);
    expect(select([exact, section], '/Research/?utm_source=x')).toEqual(['exact', 'section']);
  });

  it('applies exclusion before any include rule', () => {
    const p = promo('a', { targets: [include('GLOBAL'), exclude('PATH', '/research/ai-search')] });
    expect(select([p], '/research/other')).toEqual(['a']);
    expect(select([p], '/research/ai-search')).toEqual([]);
    const sectionExcluded = promo('b', { targets: [include('PAGE_TYPE', 'RESEARCH'), exclude('PATH', '/research', true)] });
    expect(select([sectionExcluded], '/research/anything')).toEqual([]);
    const typeExcluded = promo('c', { targets: [include('GLOBAL'), exclude('PAGE_TYPE', 'PRICING')] });
    expect(select([typeExcluded], '/pricing')).toEqual([]);
    expect(select([typeExcluded], '/radar')).toEqual(['c']);
  });

  it('orders by specificity tier before priority', () => {
    const global = promo('global', { priority: 100, targets: [include('GLOBAL')] });
    const type = promo('type', { priority: 90, targets: [include('PAGE_TYPE', 'RESEARCH')] });
    const section = promo('section', { priority: 80, targets: [include('PATH', '/research', true)] });
    const content = promo('content', { priority: 70, targets: [include('CONTENT', 'RESEARCH:ai-search')] });
    const exact = promo('exact', { priority: 0, targets: [include('PATH', '/research/ai-search')] });
    expect(select([global, type, section, content, exact], '/research/ai-search')).toEqual(['exact', 'content', 'section', 'type', 'global']);
  });

  it('matches tags and content keys supplied by the page', () => {
    const tagged = promo('tag', { targets: [include('TAG', 'fintech')] });
    const ctx = resolvePageContext('/insights/post', { tags: ['FinTech'] });
    expect(selectPromotions([tagged], { context: ctx, slot: 'CONTENT_BOTTOM', now: NOW }).selected.map((p) => p.id)).toEqual(['tag']);
    expect(select([tagged], '/insights/post')).toEqual([]);
  });

  it('keeps global targeting off private and blocked pages', () => {
    const global = promo('g', { targets: [include('GLOBAL')], placements: PROMOTION_SLOTS.map((slot) => ({ slot, weight: 1 })) });
    expect(select([global], '/dashboard', 'DASHBOARD')).toEqual([]);
    expect(select([global], '/admin', 'CONTENT_BOTTOM')).toEqual([]);
    expect(select([global], '/checkout', 'SIDEBAR')).toEqual([]);
    const dashboardOnly = promo('d', { targets: [include('PAGE_TYPE', 'DASHBOARD')], placements: [{ slot: 'DASHBOARD', weight: 1 }] });
    expect(select([dashboardOnly], '/dashboard', 'DASHBOARD')).toEqual(['d']);
  });
});

describe('slots and placements', () => {
  it('only serves promotions assigned to the requested slot', () => {
    const p = promo('a', { targets: [include('GLOBAL')], placements: [{ slot: 'HOME_HERO', weight: 1 }, { slot: 'FOOTER', weight: 1 }] });
    expect(select([p], '/', 'HOME_HERO')).toEqual(['a']);
    expect(select([p], '/', 'FOOTER')).toEqual(['a']);
    expect(select([p], '/', 'HOME_SECTION')).toEqual([]);
  });

  it('reports slots the page template does not render', () => {
    const p = promo('a', { targets: [include('GLOBAL')], placements: [{ slot: 'HOME_HERO', weight: 1 }] });
    const evaluation = evaluatePromotion(p, { context: resolvePageContext('/research/x'), slot: 'HOME_HERO', now: NOW });
    expect(evaluation.eligible).toBe(false);
    expect(evaluation.reasons[0]).toMatch(/not rendered/);
    expect(slotRendersOn('CONTENT_MIDDLE', 'RESEARCH', true)).toBe(false);
    expect(slotRendersOn('CONTENT_MIDDLE', 'RESEARCH', false)).toBe(true);
    expect(slotRendersOn('SIDEBAR', 'DASHBOARD', true)).toBe(true);
    expect(slotRendersOn('SIDEBAR', 'ADMIN', true)).toBe(false);
  });

  it('allows multiple promotions per page and per slot, honouring the limit', () => {
    const list = ['a', 'b', 'c'].map((id, index) => promo(id, { priority: 10 - index, targets: [include('PAGE_TYPE', 'RESEARCH')] }));
    expect(select(list, '/research', 'CONTENT_BOTTOM', {}, 2)).toEqual(['a', 'b']);
    expect(select(list, '/research', 'CONTENT_BOTTOM', {}, 5)).toEqual(['a', 'b', 'c']);
    expect(select(list, '/research', 'CONTENT_BOTTOM', {}, 0)).toEqual([]);
  });

  it('every slot in the catalogue is rendered on at least one page type', () => {
    for (const slot of PROMOTION_SLOTS) {
      const meta = SLOT_META[slot];
      expect(meta.pageTypes === 'ALL_PUBLIC' || meta.pageTypes.length > 0).toBe(true);
    }
  });
});

describe('schedule and status', () => {
  it('drops inactive and out-of-window promotions using server time', () => {
    const inactive = promo('inactive', { active: false, targets: [include('GLOBAL')] });
    const future = promo('future', { startsAt: '2026-11-01T00:00:00Z', targets: [include('GLOBAL')] });
    const past = promo('past', { endsAt: '2026-10-01T00:00:00Z', targets: [include('GLOBAL')] });
    const live = promo('live', { startsAt: '2026-10-01T00:00:00Z', endsAt: '2026-12-31T23:59:59Z', targets: [include('GLOBAL')] });
    expect(select([inactive, future, past, live], '/research')).toEqual(['live']);
    const reasons = [inactive, future, past].map((p) => evaluatePromotion(p, { context: resolvePageContext('/research'), slot: 'CONTENT_BOTTOM', now: NOW }).reasons[0]);
    expect(reasons[0]).toBe('Inactive');
    expect(reasons[1]).toMatch(/Scheduled to start/);
    expect(reasons[2]).toMatch(/Ended/);
  });
});

describe('device and theme', () => {
  it('filters by device/theme only when they are known', () => {
    const desktopOnly = promo('desktop', { mobileVisible: false, tabletVisible: false, targets: [include('GLOBAL')] });
    const darkOnly = promo('dark', { themeMode: 'DARK', targets: [include('GLOBAL')] });
    expect(select([desktopOnly, darkOnly], '/research').sort()).toEqual(['dark', 'desktop']);
    expect(select([desktopOnly, darkOnly], '/research', 'CONTENT_BOTTOM', { device: 'mobile' })).toEqual(['dark']);
    expect(select([desktopOnly, darkOnly], '/research', 'CONTENT_BOTTOM', { device: 'tablet', theme: 'light' })).toEqual([]);
    expect(select([desktopOnly, darkOnly], '/research', 'CONTENT_BOTTOM', { device: 'desktop', theme: 'dark' }).sort()).toEqual(['dark', 'desktop']);
    const hiddenEverywhere = promo('none', { mobileVisible: false, tabletVisible: false, desktopVisible: false, targets: [include('GLOBAL')] });
    expect(select([hiddenEverywhere], '/research')).toEqual([]);
    // A slot the About page does not render is reported, not silently filled.
    expect(select([darkOnly], '/about')).toEqual([]);
    expect(select([darkOnly.id === 'dark' ? { ...darkOnly, placements: [{ slot: 'FOOTER', weight: 1 }] } : darkOnly], '/about', 'FOOTER')).toEqual(['dark']);
  });

  it('produces static Tailwind visibility classes', () => {
    expect(deviceVisibilityClass({ mobileVisible: true, tabletVisible: true, desktopVisible: true })).toBe('');
    expect(deviceVisibilityClass({ mobileVisible: true, tabletVisible: false, desktopVisible: false })).toBe('md:hidden');
    expect(deviceVisibilityClass({ mobileVisible: false, tabletVisible: true, desktopVisible: false })).toBe('hidden md:block lg:hidden');
    expect(deviceVisibilityClass({ mobileVisible: false, tabletVisible: false, desktopVisible: true })).toBe('hidden lg:block');
    expect(deviceVisibilityClass({ mobileVisible: true, tabletVisible: false, desktopVisible: true })).toBe('md:max-lg:hidden');
    expect(deviceVisibilityClass({ mobileVisible: false, tabletVisible: true, desktopVisible: true })).toBe('hidden md:block');
    expect(deviceVisibilityClass({ mobileVisible: false, tabletVisible: false, desktopVisible: false })).toBeNull();
    expect(themeVisibilityClass('LIGHT')).toBe('dark:hidden');
    expect(themeVisibilityClass('DARK')).toBe('hidden dark:block');
    expect(themeVisibilityClass(undefined)).toBe('');
  });

  it('falls back to the light creative when no dark creative exists', () => {
    expect(pickCreative({ imageUrl: 'https://x/img.png', lightCreativeUrl: null, darkCreativeUrl: null, logoUrl: null, videoUrl: null })).toEqual({ video: null, light: 'https://x/img.png', dark: 'https://x/img.png' });
    expect(pickCreative({ imageUrl: null, lightCreativeUrl: 'https://x/l.png', darkCreativeUrl: 'https://x/d.png', logoUrl: null, videoUrl: null })).toEqual({ video: null, light: 'https://x/l.png', dark: 'https://x/d.png' });
    expect(pickCreative({ imageUrl: null, lightCreativeUrl: null, darkCreativeUrl: null, logoUrl: 'https://x/logo.png', videoUrl: null }).light).toBe('https://x/logo.png');
    expect(pickCreative({ imageUrl: null, lightCreativeUrl: null, darkCreativeUrl: null, logoUrl: null, videoUrl: 'https://x/v.mp4' }).video).toBe('https://x/v.mp4');
  });
});

describe('rotation', () => {
  const page = resolvePageContext('/research/ai-search');

  it('is deterministic for the same page and time window and needs no shared state', () => {
    const list = ['a', 'b', 'c'].map((id) => promo(id, { priority: 5, rotationMode: 'ROTATE', targets: [include('GLOBAL')] }));
    const first = selectPromotions(list, { context: page, slot: 'CONTENT_BOTTOM', now: NOW }, { limit: 3 }).selected.map((p) => p.id);
    const again = selectPromotions([...list].reverse(), { context: page, slot: 'CONTENT_BOTTOM', now: NOW + 1000 }, { limit: 3 }).selected.map((p) => p.id);
    expect(again).toEqual(first);
    const seen = new Set<string>();
    for (let window = 0; window < 6; window += 1) {
      seen.add(selectPromotions(list, { context: page, slot: 'CONTENT_BOTTOM', now: NOW + window * 5 * 60 * 1000 }, { limit: 1 }).selected[0].id);
    }
    expect(seen.size).toBe(3);
  });

  it('shares equal-priority ties in PRIORITY mode but never overtakes a higher priority', () => {
    const top = promo('top', { priority: 50, targets: [include('GLOBAL')] });
    const ties = ['x', 'y'].map((id) => promo(id, { priority: 10, targets: [include('GLOBAL')] }));
    const low = promo('low', { priority: 1, targets: [include('GLOBAL')] });
    const leaders = new Set<string>();
    for (let window = 0; window < 4; window += 1) {
      const order = selectPromotions([low, ...ties, top], { context: page, slot: 'CONTENT_BOTTOM', now: NOW + window * 5 * 60 * 1000 }, { limit: 4 }).selected.map((p) => p.id);
      expect(order[0]).toBe('top');
      expect(order[3]).toBe('low');
      leaders.add(order[1]);
    }
    expect(leaders).toEqual(new Set(['x', 'y']));
  });

  it('weights the rotation by placement weight', () => {
    const heavy = promo('heavy', { priority: 1, rotationMode: 'WEIGHTED', targets: [include('GLOBAL')], placements: [{ slot: 'CONTENT_BOTTOM', weight: 9 }] });
    const light = promo('light', { priority: 1, rotationMode: 'WEIGHTED', targets: [include('GLOBAL')], placements: [{ slot: 'CONTENT_BOTTOM', weight: 1 }] });
    let heavyLeads = 0;
    for (let window = 0; window < 20; window += 1) {
      const winner = selectPromotions([light, heavy], { context: page, slot: 'CONTENT_BOTTOM', now: NOW + window * 5 * 60 * 1000 }, { limit: 1 }).selected[0].id;
      if (winner === 'heavy') heavyLeads += 1;
    }
    expect(heavyLeads).toBeGreaterThanOrEqual(15);
  });

  it('places the rotating pool at its highest member priority', () => {
    const fixedHigh = promo('fixedHigh', { priority: 100, targets: [include('GLOBAL')] });
    const rotA = promo('rotA', { priority: 20, rotationMode: 'ROTATE', targets: [include('GLOBAL')] });
    const rotB = promo('rotB', { priority: 5, rotationMode: 'ROTATE', targets: [include('GLOBAL')] });
    const fixedMid = promo('fixedMid', { priority: 10, targets: [include('GLOBAL')] });
    const order = select([fixedMid, rotB, rotA, fixedHigh], '/research/ai-search');
    expect(order[0]).toBe('fixedHigh');
    expect(order.slice(1, 3).sort()).toEqual(['rotA', 'rotB']);
    expect(order[3]).toBe('fixedMid');
  });

  it('random mode is a deterministic shuffle', () => {
    const list = ['a', 'b', 'c', 'd'].map((id) => promo(id, { rotationMode: 'RANDOM', targets: [include('GLOBAL')] }));
    const seed = rotationSeed(NOW, '/x', 'CONTENT_BOTTOM');
    const candidates = list.map((p) => ({ promotion: p, tier: 5 as const, weight: 1, rotationMode: 'RANDOM' as const }));
    expect(orderCandidates(candidates, seed).map((c) => c.promotion.id)).toEqual(orderCandidates(candidates, seed).map((c) => c.promotion.id));
    expect(stableHash('a')).not.toBe(stableHash('b'));
    expect(rotationSeed(NOW, '/a', 'X')).not.toBe(rotationSeed(NOW, '/b', 'X'));
  });
});

describe('legacy adapter', () => {
  it('converts legacy columns the same way the SQL backfill does', () => {
    expect(legacyTargetsFromPromotion({ placement: 'ALL', targetPages: ['ALL'], targetContentTypes: [] })).toEqual([include('GLOBAL')]);
    expect(legacyTargetsFromPromotion({ placement: 'SIDEBAR', targetPages: ['/research'], targetContentTypes: [] })).toEqual([include('PATH', '/research', true)]);
    expect(legacyTargetsFromPromotion({ placement: 'COURSE_PAGE', targetPages: ['pgdm/economics', '/'], targetContentTypes: [] })).toEqual([include('PATH', '/pgdm/economics', true), include('PATH', '/')]);
    expect(legacyTargetsFromPromotion({ placement: 'RESEARCH_PAGE', targetPages: ['ALL'], targetContentTypes: ['RESEARCH', 'TOOL'] })).toEqual([include('PAGE_TYPE', 'RESEARCH'), include('PAGE_TYPE', 'CALCULATOR'), include('PAGE_TYPE', 'TOOL')]);
    expect(legacyTargetsFromPromotion({ placement: 'ARTICLE_PAGE', targetPages: [], targetContentTypes: [] }).map((r) => r.targetValue)).toEqual(['INSIGHT', 'FINANCE_TERM', 'CASE_STUDY', 'DATA_LAB']);
    expect(legacyPlacementsFromPromotion({ placement: 'ALL', displayFrequency: 3 })).toEqual([{ slot: 'SIDEBAR', weight: 3 }, { slot: 'CONTENT_BOTTOM', weight: 3 }]);
    expect(legacyPlacementsFromPromotion({ placement: 'CTA_BLOCK', displayFrequency: 50 })).toEqual([{ slot: 'CTA_SECTION', weight: 10 }]);
    expect(legacyPlacementsFromPromotion({ placement: 'RESEARCH_PAGE', displayFrequency: 0 })).toEqual([{ slot: 'CONTENT_BOTTOM', weight: 1 }]);
  });

  it('uses explicit rules when present and the adapter otherwise', () => {
    const withRules = effectiveRules(promo('a', { placement: 'ALL', targetPages: ['ALL'], targets: [include('PATH', '/x')], placements: [{ slot: 'FOOTER', weight: 1 }] }));
    expect(withRules.derivedFromLegacy).toBe(false);
    expect(withRules.targets).toEqual([include('PATH', '/x')]);
    const legacy = effectiveRules({ ...promo('b', { targets: [], placements: [] }), placement: 'HOME_HERO', targetPages: [], targetContentTypes: [] });
    expect(legacy.derivedFromLegacy).toBe(true);
    expect(legacy.targets).toEqual([include('PAGE_TYPE', 'HOME')]);
    expect(legacy.placements).toEqual([{ slot: 'HOME_HERO', weight: 1 }]);
  });
});

describe('rule normalisation', () => {
  it('normalises and validates rules from API input', () => {
    expect(normalizeTargetRule({ targetType: 'path', targetValue: 'Research/AI-Search/', includeDescendants: true })).toEqual(include('PATH', '/research/ai-search', true));
    expect(normalizeTargetRule({ targetType: 'PAGE_TYPE', targetValue: 'research' })).toEqual(include('PAGE_TYPE', 'RESEARCH'));
    expect(normalizeTargetRule({ targetType: 'PAGE_TYPE', targetValue: 'NOPE' })).toBeNull();
    expect(normalizeTargetRule({ targetType: 'CONTENT', targetValue: 'research:AI-Search' })).toEqual(include('CONTENT', 'RESEARCH:ai-search'));
    expect(normalizeTargetRule({ targetType: 'CONTENT', targetValue: 'no-colon' })).toBeNull();
    expect(normalizeTargetRule({ targetType: 'TAG', targetValue: ' FinTech ' })).toEqual(include('TAG', 'fintech'));
    expect(normalizeTargetRule({ mode: 'exclude', targetType: 'GLOBAL', targetValue: 'ignored' })).toEqual(exclude('GLOBAL'));
    expect(dedupeTargetRules([include('PATH', '/a'), include('PATH', '/a', true), include('PATH', '/b')])).toEqual([include('PATH', '/a', true), include('PATH', '/b')]);
  });

  it('summarises targeting for the campaign list', () => {
    expect(summarizeTargets([include('GLOBAL'), exclude('PATH', '/x')]).label).toBe('All public pages · 1 exclusion');
    expect(summarizeTargets([include('PAGE_TYPE', 'RESEARCH'), include('PATH', '/a'), include('PATH', '/b')]).label).toBe('Research · 2 pages');
    expect(summarizeTargets([]).label).toMatch(/No targeting/);
  });
});

describe('getPromotionHref', () => {
  it('prefers tracking → affiliate → destination and appends only missing UTM keys', () => {
    expect(getPromotionHref({ destinationUrl: 'https://a.com/', affiliateUrl: 'https://b.com/?ref=x', trackingUrl: null, utmParameters: { utm_source: 'kunwar', ref: 'OVERRIDE' } })).toBe('https://b.com/?ref=x&utm_source=kunwar');
    expect(getPromotionHref({ destinationUrl: 'https://a.com/', affiliateUrl: null, trackingUrl: 'https://t.com/go?utm_source=partner', utmParameters: { utm_source: 'kunwar', utm_medium: 'promo' } })).toBe('https://t.com/go?utm_source=partner&utm_medium=promo');
    expect(getPromotionHref({ destinationUrl: 'https://a.com/x', affiliateUrl: 'javascript:alert(1)', trackingUrl: null, utmParameters: null })).toBe('https://a.com/x');
    expect(getPromotionHref({ destinationUrl: 'not a url', affiliateUrl: null, trackingUrl: null, utmParameters: null })).toBe('#');
    expect(sanitizeUtmParameters({ 'bad key!': 'x', utm_campaign: 'ok', nested: { a: 1 }, utm_term: 42 })).toEqual({ utm_campaign: 'ok', utm_term: '42' });
  });
});
