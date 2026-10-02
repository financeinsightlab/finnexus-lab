import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

export type RelatedContentLink = {
  id: string;
  sourceType: string;
  sourceSlug: string;
  targetType: string;
  targetSlug: string;
  anchorText: string | null;
  displayOrder: number;
  linkKind: string;
};

const readRelations = unstable_cache(
  async (sourceType: string, sourceSlug: string, linkKind: string) => prisma.relatedContent.findMany({
    where: {
      sourceType,
      sourceSlug,
      linkKind,
      published: true,
      NOT: { targetType: sourceType, targetSlug: sourceSlug },
    },
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    take: 8,
    select: {
      id: true,
      sourceType: true,
      sourceSlug: true,
      targetType: true,
      targetSlug: true,
      anchorText: true,
      displayOrder: true,
      linkKind: true,
    },
  }),
  ['public-related-content-v1'],
  { revalidate: 1800, tags: ['public-related-content'] },
);

export function getRelatedContent(sourceType: string, sourceSlug: string, linkKind: 'RELATED' | 'CTA' = 'RELATED') {
  return readRelations(sourceType.trim().toUpperCase(), sourceSlug.trim(), linkKind);
}

const ROUTES: Record<string, (slug: string) => string> = {
  PAGE: (slug) => slug === 'home' ? '/' : `/${encodeURIComponent(slug)}`,
  TRACKER: (slug) => `/tracker/${encodeURIComponent(slug)}`,
  COURSE: (slug) => `/pgdm/${encodeURIComponent(slug)}`, 
  PGDM_COURSE: (slug) => `/pgdm/${encodeURIComponent(slug)}`,
  STUDY_COURSE: (slug) => `/study/${encodeURIComponent(slug)}`,
  STUDY: (slug) => `/study/${encodeURIComponent(slug)}`,
  TOOL: (slug) => `/tools/${encodeURIComponent(slug)}`,
  CALCULATOR: (slug) => `/tools/${encodeURIComponent(slug)}`,
  RESEARCH: (slug) => `/research/${encodeURIComponent(slug)}`,
  INSIGHT: (slug) => `/insights/${encodeURIComponent(slug)}`,
  FINANCE_TERM: (slug) => `/finance-terms/${encodeURIComponent(slug)}`,
  DATASET: (slug) => `/data-lab/${encodeURIComponent(slug)}`,
  CASE_STUDY: (slug) => `/case-studies/${encodeURIComponent(slug)}`,
  PREDICTION_LEDGER: () => '/predictions/ledger',
  ASK: () => '/ask',
  PRICING: () => '/pricing',
  CONTACT: () => '/contact',
  DATA_LAB: () => '/data-lab',
  TOOLS: () => '/tools',
};

export function relatedContentHref(targetType: string, targetSlug: string) {
  return ROUTES[targetType.trim().toUpperCase()]?.(targetSlug.trim()) ?? null;
}
