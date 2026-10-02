import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

export type PromotionPlacement =
  | 'ALL'
  | 'GLOBAL'
  | 'HOME_HERO'
  | 'HOME_SECTION'
  | 'SIDEBAR'
  | 'COURSE_PAGE'
  | 'TOOL_PAGE'
  | 'CALCULATOR_PAGE'
  | 'RESEARCH_PAGE'
  | 'ARTICLE_PAGE'
  | 'STUDY_PAGE'
  | 'DASHBOARD'
  | 'FOOTER'
  | 'BETWEEN_CONTENT'
  | 'CTA_BLOCK';

export function normalizePath(p: string): string {
  if (!p) return '/';
  const clean = p.split('?')[0].split('#')[0].trim().toLowerCase();
  if (clean === '' || clean === 'home' || clean === '/home') return '/';
  return clean.replace(/\/+$/, '') || '/';
}

export function matchesPath(targetPages: string[], currentPath: string): boolean {
  if (!targetPages || targetPages.length === 0) return true;
  const current = normalizePath(currentPath);
  for (const raw of targetPages) {
    const t = raw.trim();
    if (!t) continue;
    const lower = t.toLowerCase();
    if (lower === 'all' || lower === '*' || lower === 'global' || lower.includes('all pages') || lower === 'universal') return true;
    const normalizedTarget = normalizePath(lower);
    if (normalizedTarget === current) return true;
    // Prefix matching for sections (e.g. /research targets /research/anything)
    if (normalizedTarget !== '/' && current.startsWith(normalizedTarget)) return true;
    // If target has external URL, check pathname
    try {
      if (t.includes('://')) {
        const u = new URL(t);
        if (normalizePath(u.pathname) === current) return true;
      }
    } catch {}
  }
  // If targetPages contains no internal path specifier, treat leniently
  const hasInternalPath = targetPages.some((p) => {
    const low = p.trim().toLowerCase();
    return low.startsWith('/') || ['all', '*', 'home'].includes(low);
  });
  if (!hasInternalPath) return true;

  return false;
}

function makePlacementCache(placement: string) {
  const fetcher = () =>
    prisma.promotion.findMany({
      where: { active: true, placement },
      orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
      take: 40,
    });

  const cached = unstable_cache(
    fetcher,
    [`active-promotions-v3-${placement}`],
    { revalidate: 120, tags: ['public-promotions'] },
  );

  return async () => {
    try {
      return await cached();
    } catch {
      return await fetcher();
    }
  };
}

const cacheByPlacement = new Map<string, ReturnType<typeof makePlacementCache>>();

function getPlacementCache(placement: string) {
  if (!cacheByPlacement.has(placement)) {
    cacheByPlacement.set(placement, makePlacementCache(placement));
  }
  return cacheByPlacement.get(placement)!;
}

function selectWinningCampaign<T extends { priority: number; displayFrequency: number }>(
  eligible: T[],
  now: number,
): T | null {
  if (eligible.length === 0) return null;
  const sorted = [...eligible].sort((a, b) => b.priority - a.priority);
  const topPriority = sorted[0].priority;
  const rotation = sorted.filter((c) => c.priority === topPriority);
  const weightedCycle = rotation.flatMap((c) =>
    Array.from({ length: Math.max(1, Math.min(c.displayFrequency, 10)) }, () => c),
  );
  const timeSlot = Math.floor(now / (5 * 60 * 1000));
  return weightedCycle[timeSlot % weightedCycle.length] ?? rotation[0] ?? null;
}

export async function getPromotionForSlot(input: {
  placement: PromotionPlacement | string;
  path: string;
  contentType?: string;
}) {
  const now = Date.now();

  const isEligible = (campaign: {
    startsAt: Date | null;
    endsAt: Date | null;
    targetPages: string[];
    targetContentTypes: string[];
  }) => {
    const starts = campaign.startsAt?.getTime();
    const ends = campaign.endsAt?.getTime();
    const inSchedule = (!starts || starts <= now) && (!ends || ends >= now);
    const pageTargeted = matchesPath(campaign.targetPages, input.path);
    const typeTargeted =
      campaign.targetContentTypes.length === 0 ||
      campaign.targetContentTypes.includes('ALL') ||
      (!!input.contentType &&
        campaign.targetContentTypes.some(
          (t) => t.toUpperCase() === input.contentType?.toUpperCase(),
        ));
    return inSchedule && pageTargeted && typeTargeted;
  };

  // 1. Try exact slot placement match first (e.g. dedicated RESEARCH_PAGE campaign)
  const candidates = await getPlacementCache(input.placement)();
  const directEligible = candidates.filter(isEligible);
  if (directEligible.length > 0) {
    return selectWinningCampaign(directEligible, now);
  }

  // 2. Universal Global Fallback: any active campaign targeting this page or ALL pages
  const allActive = await getAllActivePromotions();
  const universalEligible = allActive.filter(isEligible);
  if (universalEligible.length > 0) {
    return selectWinningCampaign(universalEligible, now);
  }

  return null;
}

const allActiveFetcher = () =>
  prisma.promotion.findMany({
    where: { active: true },
    orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
    take: 50,
  });

const cachedAllActive = unstable_cache(
  allActiveFetcher,
  ['active-promotions-all-v3'],
  { revalidate: 30, tags: ['public-promotions'] },
);

async function getAllActivePromotions() {
  if (process.env.NODE_ENV === 'development') {
    return await allActiveFetcher();
  }
  try {
    return await cachedAllActive();
  } catch {
    return await allActiveFetcher();
  }
}

export async function getSidebarPromotion(input: {
  path: string;
  contentType?: string;
}) {
  // 1. Try slot strictly matching SIDEBAR
  const directSidebar = await getPromotionForSlot({
    placement: 'SIDEBAR',
    path: input.path,
    contentType: input.contentType,
  });
  if (directSidebar) return directSidebar;

  // 2. Fall back to any active campaign targeting this page
  const allActive = await getAllActivePromotions();
  const now = Date.now();
  const eligible = allActive.filter((campaign) => {
    const starts = campaign.startsAt?.getTime();
    const ends = campaign.endsAt?.getTime();
    const inSchedule = (!starts || starts <= now) && (!ends || ends >= now);
    return inSchedule && matchesPath(campaign.targetPages, input.path);
  });

  return selectWinningCampaign(eligible, now);
}

export function getPromotionHref(promotion: {
  destinationUrl: string;
  affiliateUrl: string | null;
  trackingUrl: string | null;
  utmParameters: unknown;
}) {
  const target = promotion.trackingUrl || promotion.affiliateUrl || promotion.destinationUrl;
  try {
    const url = new URL(target);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return promotion.destinationUrl;
    if (
      promotion.utmParameters &&
      typeof promotion.utmParameters === 'object' &&
      !Array.isArray(promotion.utmParameters)
    ) {
      for (const [key, value] of Object.entries(
        promotion.utmParameters as Record<string, unknown>,
      )) {
        if (
          /^[a-zA-Z0-9_.-]{1,64}$/.test(key) &&
          (typeof value === 'string' || typeof value === 'number')
        ) {
          url.searchParams.set(key, String(value).slice(0, 200));
        }
      }
    }
    return url.toString();
  } catch {
    return promotion.destinationUrl;
  }
}
