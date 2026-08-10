import type { Metadata } from 'next';
import { getAllResearch } from '@/lib/content';
import { prisma } from '@/lib/prisma';
import ResearchClient from '@/components/research/ResearchClient';
import type { ResearchPost } from '@/types';
import JsonLd, { faqSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Research Library | Kunwar Analytics — Institutional Market Reports',
  description:
    'Institutional-grade macroeconomic, sector intelligence, fintech, and deep tech research papers with quantitative modeling and strategic frameworks.',
  alternates: { canonical: '/research' },
  openGraph: {
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

  const researchFaq = faqSchema([
    {
      question: 'What methodology does Kunwar Analytics use for research reports?',
      answer:
        'Kunwar Analytics employs quantitative valuation models, bottom-up unit economics, macroeconomic liquidity framework analysis, and primary supply chain verification.',
    },
    {
      question: 'How frequently are research reports updated?',
      answer:
        'Sector reports and financial metrics are reviewed quarterly and updated whenever major structural regulatory or financial inflections occur.',
    },
    {
      question: 'Can I cite Kunwar Analytics research for institutional analysis?',
      answer:
        'Yes, institutional investors, media, and academic researchers may cite our papers with proper attribution and link back to the research report.',
    },
  ]);

  return (
    <>
      <JsonLd data={researchFaq} />
      <ResearchClient posts={mergedPosts} />
    </>
  );
}
