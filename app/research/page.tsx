import type { Metadata } from 'next';
import { getAllResearch } from '@/lib/content';
import { prisma } from '@/lib/prisma';
import ResearchClient from '@/components/research/ResearchClient';
import type { ResearchPost } from '@/types';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';

export const metadata: Metadata = {
  title: { absolute: 'Research Library — Institutional Market Reports' },
  description:
    'Institutional-grade macroeconomic, sector intelligence, fintech, and deep tech research papers with quantitative modeling and strategic frameworks.',
  alternates: { canonical: '/research' },
  openGraph: {
      images: ['/og/default.png'],
    title: 'Research Library | Kunwar Analytics',
    description:
      'In-depth institutional research reports, financial modeling, and strategic market intelligence.',
    url: 'https://kunwaranalytics.in/research',
    type: 'website',
  },
};

export default async function ResearchPage() {
  const fileResearch = getAllResearch();

  let dbReports: any[] = [];
  try {
    dbReports = await (prisma as any).post.findMany({
      where: { type: 'RESEARCH', published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.error('CMS fetch failed:', e);
  }

  const cmsResearch: ResearchPost[] = dbReports.map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.excerpt || '',
    sector: r.sector || r.tags?.[0] || 'Strategic Research',
    tags: r.tags || [],
    author: r.author?.name || 'Kunwar Analytics Research Desk',
    date: r.publishedAt?.toISOString() || r.createdAt?.toISOString() || new Date().toISOString(),
    featured: true,
    pageCount: r.pageCount || (r.estimatedReadingTime ? Math.ceil(r.estimatedReadingTime * 2.5) : 50),
    coverImage: r.featuredImage || undefined,
  }));

  // Merge unique by slug (CMS overrides file if exists)
  const slugSet = new Set(cmsResearch.map((p) => p.slug));
  const mergedPosts: ResearchPost[] = [
    ...cmsResearch,
    ...fileResearch.filter((p) => !slugSet.has(p.slug)),
  ];

  return (
    <>
      <PromotionSlot slot="CONTENT_TOP" path="/research" />
      <ResearchClient posts={mergedPosts} />
      <PromotionSlot slot="CONTENT_BOTTOM" path="/research" />
      <RelatedContentSection sourceType="PAGE" sourceSlug="research" />
      <RelatedContentSection sourceType="PAGE" sourceSlug="research" linkKind="CTA" />
      <ContentFaq relatedType="PAGE" relatedSlug="research" />
      <PromotionSlot slot="FOOTER" path="/research" />
    </>
  );
}
