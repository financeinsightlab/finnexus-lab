import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

export type PromotionPlacement =
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

const readPromotions = unstable_cache(
  async (placement: string) => prisma.promotion.findMany({
    where: { active: true, placement },
    orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
    take: 40,
  }),
  ['active-promotions-v1'],
  { revalidate: 300, tags: ['public-promotions'] },
);

export async function getPromotionForSlot(input: {
  placement: PromotionPlacement;
  path: string;
  contentType?: string;
}) {
  const candidates = await readPromotions(input.placement);
  const now = Date.now();
  const eligible = candidates.filter((campaign) => {
    const starts = campaign.startsAt?.getTime();
    const ends = campaign.endsAt?.getTime();
    const inSchedule = (!starts || starts <= now) && (!ends || ends >= now);
    const pageTargeted = campaign.targetPages.length === 0 || campaign.targetPages.includes('ALL') || campaign.targetPages.includes(input.path);
    const typeTargeted = campaign.targetContentTypes.length === 0 || campaign.targetContentTypes.includes('ALL') || (!!input.contentType && campaign.targetContentTypes.includes(input.contentType.toUpperCase()));
    return inSchedule && pageTargeted && typeTargeted;
  });

  if (eligible.length === 0) return null;
  const topPriority = eligible[0].priority;
  const rotation = eligible.filter((campaign) => campaign.priority === topPriority);
  const weightedCycle = rotation.flatMap((campaign) =>
    Array.from({ length: Math.max(1, Math.min(campaign.displayFrequency, 10)) }, () => campaign),
  );
  const timeSlot = Math.floor(now / (5 * 60 * 1000));
  return weightedCycle[timeSlot % weightedCycle.length] ?? rotation[0] ?? null;
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
    if (promotion.utmParameters && typeof promotion.utmParameters === 'object' && !Array.isArray(promotion.utmParameters)) {
      for (const [key, value] of Object.entries(promotion.utmParameters as Record<string, unknown>)) {
        if (/^[a-zA-Z0-9_.-]{1,64}$/.test(key) && (typeof value === 'string' || typeof value === 'number')) {
          url.searchParams.set(key, String(value).slice(0, 200));
        }
      }
    }
    return url.toString();
  } catch {
    return promotion.destinationUrl;
  }
}
