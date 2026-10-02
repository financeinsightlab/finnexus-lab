// lib/promotions/catalog.ts — the vocabulary of the promotion engine.
//
// Pure data, safe to import from client components. Everything the engine,
// the admin UI, the API validators and the frontend slots agree on lives here:
//
//   • page types  — what kind of page a pathname is (HOME, RESEARCH, …)
//   • slots       — the named positions that frontend components render
//   • modes       — targeting, rotation, device and theme enumerations
//   • legacy maps — how the pre-engine `placement` / `targetPages` columns map
//                   onto the new vocabulary (used by the SQL backfill AND the
//                   in-memory adapter so both agree)

// ─── Page types ──────────────────────────────────────────────────────────────

export const PAGE_TYPES = [
  'HOME',
  'RESEARCH',
  'INSIGHT',
  'TOOL',
  'CALCULATOR',
  'FINANCE_TERM',
  'COURSE',
  'STUDY',
  'PLACEMENT_PREP',
  'DATA_LAB',
  'CASE_STUDY',
  'CERTIFICATE',
  'PREDICTION',
  'PODCAST',
  'TRACKER',
  'RADAR',
  'PRICING',
  'ENTERPRISE',
  'SERVICES',
  'ABOUT',
  'CONTACT',
  'PROJECTS',
  'RESUME',
  'SPEAKING',
  'ASK',
  'AUTHOR',
  'STATUS',
  'DATA_FRESHNESS',
  'LEGAL',
  'DASHBOARD',
  'ACCOUNT',
  'CHECKOUT',
  'AUTH',
  'ADMIN',
  'OTHER',
] as const;

export type PageType = (typeof PAGE_TYPES)[number];

export interface PageTypeMeta {
  key: PageType;
  label: string;
  /** Group heading used by the admin selector. */
  group: 'Core' | 'Learning' | 'Content' | 'Company' | 'Private';
  /** Short description of which URLs belong to the type. */
  description: string;
  /** Promotions may never render on these page types, whatever the targeting says. */
  blocked?: boolean;
  /** GLOBAL targeting reaches only page types with `globalEligible: true`. */
  globalEligible: boolean;
}

export const PAGE_TYPE_META: Record<PageType, PageTypeMeta> = {
  HOME: { key: 'HOME', label: 'Homepage', group: 'Core', description: '/', globalEligible: true },
  RESEARCH: { key: 'RESEARCH', label: 'Research', group: 'Core', description: '/research and every research report', globalEligible: true },
  INSIGHT: { key: 'INSIGHT', label: 'Insights', group: 'Core', description: '/insights and every insight article', globalEligible: true },
  TOOL: { key: 'TOOL', label: 'Tools hub', group: 'Core', description: '/tools (the tools & models catalogue)', globalEligible: true },
  CALCULATOR: { key: 'CALCULATOR', label: 'Calculators', group: 'Core', description: 'Every individual calculator under /tools/…', globalEligible: true },
  FINANCE_TERM: { key: 'FINANCE_TERM', label: 'Finance terms', group: 'Core', description: '/finance-terms and every glossary term', globalEligible: true },
  COURSE: { key: 'COURSE', label: 'Courses (PGDM)', group: 'Learning', description: '/pgdm, course pages, lectures, lessons and cheat sheets', globalEligible: true },
  STUDY: { key: 'STUDY', label: 'Study materials', group: 'Learning', description: '/study, study courses and their lessons', globalEligible: true },
  PLACEMENT_PREP: { key: 'PLACEMENT_PREP', label: 'Placement prep', group: 'Learning', description: '/study/placement-prep', globalEligible: true },
  CERTIFICATE: { key: 'CERTIFICATE', label: 'Certificates', group: 'Learning', description: '/certificates and certificate pathway pages', globalEligible: true },
  DATA_LAB: { key: 'DATA_LAB', label: 'Data Lab', group: 'Content', description: '/data-lab and every project', globalEligible: true },
  CASE_STUDY: { key: 'CASE_STUDY', label: 'Case studies', group: 'Content', description: '/case-studies and every case study', globalEligible: true },
  PREDICTION: { key: 'PREDICTION', label: 'Predictions', group: 'Content', description: '/predictions and the public ledger', globalEligible: true },
  PODCAST: { key: 'PODCAST', label: 'Podcast', group: 'Content', description: '/podcast and every episode', globalEligible: true },
  TRACKER: { key: 'TRACKER', label: 'Sector trackers', group: 'Content', description: '/tracker and every sector tracker', globalEligible: true },
  RADAR: { key: 'RADAR', label: 'Signal radar', group: 'Content', description: '/radar', globalEligible: true },
  ASK: { key: 'ASK', label: 'Ask Kunwar', group: 'Content', description: '/ask', globalEligible: true },
  AUTHOR: { key: 'AUTHOR', label: 'Author pages', group: 'Content', description: '/authors/…', globalEligible: true },
  PRICING: { key: 'PRICING', label: 'Pricing', group: 'Company', description: '/pricing', globalEligible: true },
  ENTERPRISE: { key: 'ENTERPRISE', label: 'Enterprise', group: 'Company', description: '/enterprise', globalEligible: true },
  SERVICES: { key: 'SERVICES', label: 'Services', group: 'Company', description: '/services', globalEligible: true },
  ABOUT: { key: 'ABOUT', label: 'About', group: 'Company', description: '/about', globalEligible: true },
  CONTACT: { key: 'CONTACT', label: 'Contact', group: 'Company', description: '/contact', globalEligible: true },
  PROJECTS: { key: 'PROJECTS', label: 'Projects', group: 'Company', description: '/projects', globalEligible: true },
  RESUME: { key: 'RESUME', label: 'Resume', group: 'Company', description: '/resume', globalEligible: true },
  SPEAKING: { key: 'SPEAKING', label: 'Speaking', group: 'Company', description: '/speaking', globalEligible: true },
  STATUS: { key: 'STATUS', label: 'Status', group: 'Company', description: '/status', globalEligible: false },
  DATA_FRESHNESS: { key: 'DATA_FRESHNESS', label: 'Data freshness', group: 'Company', description: '/data-freshness', globalEligible: false },
  LEGAL: { key: 'LEGAL', label: 'Legal pages', group: 'Company', description: '/privacy, /terms, /cookies, /gdpr, /security, /ethics', globalEligible: false },
  DASHBOARD: { key: 'DASHBOARD', label: 'Member dashboard', group: 'Private', description: '/dashboard (signed-in members only; never reached by Global targeting)', globalEligible: false },
  ACCOUNT: { key: 'ACCOUNT', label: 'Account settings', group: 'Private', description: '/account — promotions are never shown here', blocked: true, globalEligible: false },
  CHECKOUT: { key: 'CHECKOUT', label: 'Checkout', group: 'Private', description: '/checkout — promotions are never shown here', blocked: true, globalEligible: false },
  AUTH: { key: 'AUTH', label: 'Sign-in', group: 'Private', description: '/auth — promotions are never shown here', blocked: true, globalEligible: false },
  ADMIN: { key: 'ADMIN', label: 'Admin', group: 'Private', description: '/admin — promotions are never shown here', blocked: true, globalEligible: false },
  OTHER: { key: 'OTHER', label: 'Other public pages', group: 'Company', description: 'Any public page not listed above', globalEligible: true },
};

/** Page types an admin can pick in the targeting UI (blocked types are hidden). */
export const SELECTABLE_PAGE_TYPES: PageType[] = PAGE_TYPES.filter((key) => !PAGE_TYPE_META[key].blocked && key !== 'OTHER');

export function isPageType(value: string): value is PageType {
  return (PAGE_TYPES as readonly string[]).includes(value);
}

// ─── Slots ───────────────────────────────────────────────────────────────────

export const PROMOTION_SLOTS = [
  'HOME_HERO',
  'HOME_SECTION',
  'CONTENT_TOP',
  'CONTENT_MIDDLE',
  'CONTENT_BOTTOM',
  'SIDEBAR',
  'SIDEBAR_PRIMARY',
  'COURSE_SIDEBAR',
  'CALCULATOR_RESULT',
  'TOOL_SECTION',
  'FINANCE_TERM_RELATED',
  'CTA_SECTION',
  'DASHBOARD',
  'FOOTER',
] as const;

export type PromotionSlot = (typeof PROMOTION_SLOTS)[number];

export interface SlotMeta {
  key: PromotionSlot;
  label: string;
  description: string;
  /** Page types whose templates actually render this slot. */
  pageTypes: readonly PageType[] | 'ALL_PUBLIC';
  /** When true the slot exists only on detail pages (e.g. a report), not on the section hub. */
  detailOnly?: boolean;
  /** Default number of promotions a template renders in this slot. */
  maxPerPage: number;
  /** Visual treatment the frontend uses. */
  variant: 'inline' | 'sidebar' | 'floating';
}

const CONTENT_PAGE_TYPES: readonly PageType[] = [
  'RESEARCH', 'INSIGHT', 'TOOL', 'CALCULATOR', 'FINANCE_TERM', 'COURSE', 'STUDY', 'PLACEMENT_PREP',
  'DATA_LAB', 'CASE_STUDY', 'CERTIFICATE', 'PREDICTION', 'PODCAST', 'TRACKER',
];

export const SLOT_META: Record<PromotionSlot, SlotMeta> = {
  HOME_HERO: { key: 'HOME_HERO', label: 'Homepage · after hero', description: 'Full-width card directly under the homepage hero.', pageTypes: ['HOME'], maxPerPage: 1, variant: 'inline' },
  HOME_SECTION: { key: 'HOME_SECTION', label: 'Homepage · mid-page', description: 'Full-width card between the platform pillars and the courses section.', pageTypes: ['HOME'], maxPerPage: 1, variant: 'inline' },
  CONTENT_TOP: { key: 'CONTENT_TOP', label: 'Content · top', description: 'Before the main content on section hubs and detail pages.', pageTypes: CONTENT_PAGE_TYPES, maxPerPage: 1, variant: 'inline' },
  CONTENT_MIDDLE: { key: 'CONTENT_MIDDLE', label: 'Content · between sections', description: 'Between the body and the closing sections of a report, article, course or study page.', pageTypes: ['RESEARCH', 'INSIGHT', 'CASE_STUDY', 'DATA_LAB', 'COURSE', 'STUDY'], detailOnly: true, maxPerPage: 1, variant: 'inline' },
  CONTENT_BOTTOM: { key: 'CONTENT_BOTTOM', label: 'Content · bottom', description: 'After the main content, before related links and FAQs. The classic in-content card.', pageTypes: [...CONTENT_PAGE_TYPES, 'PRICING', 'RADAR'], maxPerPage: 1, variant: 'inline' },
  SIDEBAR: { key: 'SIDEBAR', label: 'Floating sidebar card', description: 'The dismissible right-side showcase card that floats on every public page (loads client-side).', pageTypes: 'ALL_PUBLIC', maxPerPage: 1, variant: 'floating' },
  SIDEBAR_PRIMARY: { key: 'SIDEBAR_PRIMARY', label: 'Article sidebar', description: 'Sticky sidebar widget on research reports and insight articles (desktop).', pageTypes: ['RESEARCH', 'INSIGHT'], detailOnly: true, maxPerPage: 2, variant: 'sidebar' },
  COURSE_SIDEBAR: { key: 'COURSE_SIDEBAR', label: 'Course sidebar', description: 'Sticky rail beside PGDM course, lecture, lesson and study-course pages (inline on small screens).', pageTypes: ['COURSE', 'STUDY'], detailOnly: true, maxPerPage: 1, variant: 'sidebar' },
  CALCULATOR_RESULT: { key: 'CALCULATOR_RESULT', label: 'After calculator result', description: 'Directly under the interactive calculator on /tools/… pages.', pageTypes: ['CALCULATOR'], maxPerPage: 1, variant: 'inline' },
  TOOL_SECTION: { key: 'TOOL_SECTION', label: 'Tools hub section', description: 'Between the header and the tools grid on /tools.', pageTypes: ['TOOL'], maxPerPage: 1, variant: 'inline' },
  FINANCE_TERM_RELATED: { key: 'FINANCE_TERM_RELATED', label: 'Finance term · related resources', description: 'Inside the related-resources area of an individual finance term.', pageTypes: ['FINANCE_TERM'], detailOnly: true, maxPerPage: 1, variant: 'inline' },
  CTA_SECTION: { key: 'CTA_SECTION', label: 'CTA section', description: 'Next to the call-to-action blocks on the homepage, pricing and services pages.', pageTypes: ['HOME', 'PRICING', 'SERVICES'], maxPerPage: 1, variant: 'inline' },
  DASHBOARD: { key: 'DASHBOARD', label: 'Member dashboard', description: 'Under the welcome header of the signed-in dashboard. Requires explicit Dashboard targeting.', pageTypes: ['DASHBOARD'], maxPerPage: 1, variant: 'inline' },
  FOOTER: { key: 'FOOTER', label: 'Above footer', description: 'Last block of the page, just above the global footer.', pageTypes: [...CONTENT_PAGE_TYPES, 'HOME', 'PRICING', 'SERVICES', 'ABOUT', 'CONTACT'], maxPerPage: 1, variant: 'inline' },
};

export function isPromotionSlot(value: string): value is PromotionSlot {
  return (PROMOTION_SLOTS as readonly string[]).includes(value);
}

/** True when the template for `pageType` renders `slot` (hub pages excluded for detail-only slots). */
export function slotRendersOn(slot: PromotionSlot, pageType: PageType, isHub: boolean): boolean {
  const meta = SLOT_META[slot];
  if (PAGE_TYPE_META[pageType].blocked) return false;
  if (meta.detailOnly && isHub) return false;
  if (meta.pageTypes === 'ALL_PUBLIC') return pageType !== 'DASHBOARD' || slot === 'SIDEBAR';
  return meta.pageTypes.includes(pageType);
}

// ─── Targeting, rotation, device and theme modes ────────────────────────────

export const TARGET_TYPES = ['GLOBAL', 'PATH', 'PAGE_TYPE', 'CONTENT', 'TAG'] as const;
export type TargetType = (typeof TARGET_TYPES)[number];

export const TARGET_MODES = ['INCLUDE', 'EXCLUDE'] as const;
export type TargetMode = (typeof TARGET_MODES)[number];

export const ROTATION_MODES = ['PRIORITY', 'ROTATE', 'WEIGHTED', 'RANDOM'] as const;
export type RotationMode = (typeof ROTATION_MODES)[number];

export const ROTATION_MODE_META: Record<RotationMode, { label: string; description: string }> = {
  PRIORITY: { label: 'Priority', description: 'Strict priority order. Promotions with the same priority take turns deterministically.' },
  ROTATE: { label: 'Rotate', description: 'Takes turns evenly with every other rotating promotion in the slot, ignoring priority differences between them.' },
  WEIGHTED: { label: 'Weighted rotation', description: 'Like Rotate, but each placement weight controls how often the promotion leads.' },
  RANDOM: { label: 'Pseudo-random', description: 'Order is shuffled per page and hour (deterministic, cache-safe).' },
};

export const THEME_MODES = ['ALL', 'LIGHT', 'DARK'] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

export const DEVICES = ['mobile', 'tablet', 'desktop'] as const;
export type Device = (typeof DEVICES)[number];

export const DISCLOSURE_TYPES = ['SPONSORED', 'AFFILIATE', 'PARTNER', 'ADVERTISEMENT'] as const;

// ─── Legacy vocabulary (pre-engine columns) ─────────────────────────────────

export const LEGACY_PLACEMENTS = [
  'ALL', 'GLOBAL', 'HOME_HERO', 'HOME_SECTION', 'SIDEBAR', 'COURSE_PAGE', 'TOOL_PAGE', 'CALCULATOR_PAGE',
  'RESEARCH_PAGE', 'ARTICLE_PAGE', 'STUDY_PAGE', 'DASHBOARD', 'FOOTER', 'BETWEEN_CONTENT', 'CTA_BLOCK',
] as const;

/**
 * Where a legacy single `placement` value actually rendered. `ALL`/`GLOBAL`
 * rendered through the floating card plus the in-content card at the bottom of
 * content pages, so that is what they map to — not every slot in the catalogue.
 */
export const LEGACY_PLACEMENT_TO_SLOTS: Record<string, PromotionSlot[]> = {
  ALL: ['SIDEBAR', 'CONTENT_BOTTOM'],
  GLOBAL: ['SIDEBAR', 'CONTENT_BOTTOM'],
  HOME_HERO: ['HOME_HERO'],
  HOME_SECTION: ['HOME_SECTION'],
  SIDEBAR: ['SIDEBAR'],
  COURSE_PAGE: ['CONTENT_BOTTOM'],
  TOOL_PAGE: ['CONTENT_BOTTOM'],
  CALCULATOR_PAGE: ['CONTENT_BOTTOM'],
  RESEARCH_PAGE: ['CONTENT_BOTTOM'],
  ARTICLE_PAGE: ['CONTENT_BOTTOM'],
  STUDY_PAGE: ['CONTENT_BOTTOM'],
  BETWEEN_CONTENT: ['CONTENT_BOTTOM'],
  DASHBOARD: ['DASHBOARD'],
  FOOTER: ['FOOTER'],
  CTA_BLOCK: ['CTA_SECTION'],
};

/**
 * Legacy page-specific placements only rendered on the page types whose
 * templates requested them. When such a promotion targeted "all pages", the
 * page-type restriction is what kept it on the right pages — so the backfill
 * turns it into explicit page-type targeting.
 */
export const LEGACY_PLACEMENT_PAGE_TYPES: Record<string, PageType[]> = {
  HOME_HERO: ['HOME'],
  HOME_SECTION: ['HOME'],
  COURSE_PAGE: ['COURSE', 'STUDY'],
  TOOL_PAGE: ['TOOL', 'CALCULATOR'],
  CALCULATOR_PAGE: ['CALCULATOR'],
  RESEARCH_PAGE: ['RESEARCH'],
  ARTICLE_PAGE: ['INSIGHT', 'FINANCE_TERM', 'CASE_STUDY', 'DATA_LAB'],
  STUDY_PAGE: ['STUDY'],
  BETWEEN_CONTENT: ['PRICING', 'RADAR', 'TRACKER', 'FINANCE_TERM'],
  DASHBOARD: ['DASHBOARD'],
};

/** Legacy `targetContentTypes` values → page types. */
export const LEGACY_CONTENT_TYPE_TO_PAGE_TYPES: Record<string, PageType[]> = {
  HOME: ['HOME'],
  PAGE: ['PRICING', 'RADAR'],
  RESEARCH: ['RESEARCH'],
  INSIGHT: ['INSIGHT'],
  ARTICLE: ['INSIGHT'],
  COURSE: ['COURSE'],
  PGDM: ['COURSE'],
  PGDM_COURSE: ['COURSE'],
  COURSE_LESSON: ['COURSE', 'STUDY'],
  STUDY: ['STUDY'],
  STUDY_COURSE: ['STUDY'],
  TOOL: ['CALCULATOR', 'TOOL'],
  CALCULATOR: ['CALCULATOR'],
  FINANCE_TERM: ['FINANCE_TERM'],
  CASE_STUDY: ['CASE_STUDY'],
  DATASET: ['DATA_LAB'],
  DATA_LAB: ['DATA_LAB'],
  TRACKER: ['TRACKER'],
  CERTIFICATE: ['CERTIFICATE'],
  PREDICTION: ['PREDICTION'],
  PODCAST: ['PODCAST'],
  DASHBOARD: ['DASHBOARD'],
};

export const LEGACY_GLOBAL_TOKENS = new Set(['all', '*', 'global', 'universal', 'all pages', 'everywhere']);
