import type { Metadata } from 'next';
import { getAllInsights } from '@/lib/content';
import InsightsClient from '../../components/insights/InsightsClient';
import { prisma } from "@/lib/prisma";
import type { InsightPost } from '@/types';
import JsonLd, { faqSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Strategic Insights | Kunwar Analytics — Market Briefs & Executive Notes',
  description:
    'High-conviction market analysis, strategic commentary, and data-driven perspectives on high-growth Indian business sectors and macroeconomic inflections.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Strategic Insights | Kunwar Analytics',
    description:
      'Executive analytical briefs and strategic market notes across Indian business sectors.',
    url: 'https://kunwaranalytics.in/insights',
    type: 'website',
  },
};

export default async function InsightsPage() {
  const fileInsights = getAllInsights();

  let dbPosts: any[] = [];
  try {
    dbPosts = await (prisma as any).post.findMany({
      where: { type: 'INSIGHT', published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.error('Insights DB fetch failed:', e);
  }

  const cmsInsights: InsightPost[] = dbPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    thesis: p.excerpt || 'Executive strategic analysis and quantitative market commentary.',
    category: (p.category || p.sector || 'Sector Analysis') as InsightPost['category'],
    author: p.author?.name || 'Kunwar Analytics Strategic Desk',
    date: p.publishedAt ? new Date(p.publishedAt).toISOString() : (p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString()),
    readingTime: p.estimatedReadingTime || 7,
    featured: true,
    coverImage: p.featuredImage || undefined,
    tags: Array.isArray(p.tags) ? p.tags : [],
  }));

  // Merge unique by slug
  const slugSet = new Set(cmsInsights.map((p) => p.slug));
  const mergedPosts: InsightPost[] = [
    ...cmsInsights,
    ...fileInsights.filter((p) => !slugSet.has(p.slug)),
  ];

  const insightsFaq = faqSchema([
    {
      question: 'What is the format of Kunwar Analytics Insights?',
      answer:
        'Insights are concise, high-conviction executive briefs (6–9 min read) designed for CXOs, fund managers, and board members, focusing on actionable inflections.',
    },
    {
      question: 'How do Insights differ from Research Reports?',
      answer:
        'Research reports provide exhaustive 6,000+ word deep dives with complete DCF valuation models, whereas Insights deliver focused tactical commentary on specific catalysts.',
    },
  ]);

  return (
    <>
      <JsonLd data={insightsFaq} />
      <InsightsClient posts={mergedPosts} />
    </>
  );
}
