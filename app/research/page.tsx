import type { Metadata } from 'next';
import { getAllUnifiedResearch } from '@/lib/research-content';
import ResearchClient from '@/components/research/ResearchClient';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import ResearchSubNav from '@/components/hub-navigation/ResearchSubNav';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: 'Research Intelligence — Institutional Financial Research | Kunwar Analytics' },
  description:
    'Independent financial research, sector intelligence, and quantitative models across Indian and global market sectors for investors, analysts, founders, and business leaders.',
  alternates: { canonical: 'https://kunwaranalytics.in/research' },
  openGraph: {
    images: ['/og/default.png'],
    title: 'Research Intelligence | Kunwar Analytics',
    description:
      'Independent financial research, sector intelligence and data-driven analysis for investors, analysts, founders and business decision-makers.',
    url: 'https://kunwaranalytics.in/research',
    type: 'website',
  },
};

export default async function ResearchPage() {
  const mergedPosts = await getAllUnifiedResearch();

  const jsonLd = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Research Intelligence', url: 'https://kunwaranalytics.in/research' },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <ResearchSubNav
        title="Research Intelligence"
        subtitle="Independent financial research, sector intelligence, and quantitative models across Indian and global market sectors."
        badge="RESEARCH INTELLIGENCE"
      />
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
