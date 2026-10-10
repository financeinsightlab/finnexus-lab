import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { getTool } from '@/lib/tools-registry';
import Image from 'next/image';
import { auth } from '@/auth';
import { hasPremiumAccess } from '@/lib/utils';
import Paywall from '@/components/premium/Paywall';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import RelatedFinanceTerms from '@/components/finance-terms/RelatedFinanceTerms';

import SaaSCalc from '@/components/calculators/SaaSCalc';
import AiRoiCalc from '@/components/calculators/AiRoiCalc';
import B2BMarketingCalc from '@/components/calculators/B2BMarketingCalc';
import DcfCalc from '@/components/calculators/DcfCalc';
import CryptoTokenomicsCalc from '@/components/calculators/CryptoTokenomicsCalc';
import CcaValuationCalc from '@/components/calculators/CcaValuationCalc';
import ThreeStatementCalc from '@/components/calculators/ThreeStatementCalc';
import QCommerceCalc from '@/components/calculators/QCommerceCalc';
import MarketSizingCalc from '@/components/calculators/MarketSizingCalc';
import PortersFiveForcesCalc from '@/components/calculators/PortersFiveForcesCalc';
import WaccCalc from '@/components/calculators/WaccCalc';
import TimeValueCalc from '@/components/calculators/TimeValueCalc';
import PortfolioRiskCalc from '@/components/calculators/PortfolioRiskCalc';
import CpmCalc from '@/components/calculators/CpmCalc';
import RatioAnalyzerCalc from '@/components/calculators/RatioAnalyzerCalc';
import AutonomousWorkforceCalc from '@/components/calculators/AutonomousWorkforceCalc';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const title = `${tool.title.replace(/ — .*$/, '')} | Kunwar Analytics`.slice(0, 70);
  return {
    title: { absolute: title },
    description: tool.desc.slice(0, 158),
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title,
      description: tool.desc.slice(0, 158),
      url: `https://kunwaranalytics.in/tools/${slug}`,
      images: ['/og/default.png'],
    },
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  const tool = getTool(slug);
  const hasPlanPremiumAccess = hasPremiumAccess(session?.user || {});
  // Server-side tool.gated check below is authoritative. Public tools stay
  // usable without triggering the calculators' legacy client-only trial UI.
  const isCalculatorAvailable = hasPlanPremiumAccess || !tool?.gated;

  // Select Hero Image
  let heroImg = '/card-valuation-3d.png';
  if (['crypto-tokenomics-model'].includes(slug)) heroImg = '/card-web3-3d.png';
  if (['saas-ltv-cac-model', 'ai-agent-roi-calculator', 'b2b-enterprise-marketing-roi', 'q-commerce-model'].includes(slug)) heroImg = '/card-saas-3d.png';

  let Component;
  if (slug === 'saas-ltv-cac-model') Component = <SaaSCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'ai-agent-roi-calculator') Component = <AiRoiCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'b2b-enterprise-marketing-roi') Component = <B2BMarketingCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'dcf-valuation-model') Component = <DcfCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'crypto-tokenomics-model') Component = <CryptoTokenomicsCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'cca-valuation') Component = <CcaValuationCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === '3-statement-model') Component = <ThreeStatementCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'q-commerce-model') Component = <QCommerceCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'market-sizing-framework') Component = <MarketSizingCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'porters-five-forces') Component = <PortersFiveForcesCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'wacc-calculator') Component = <WaccCalc />;
  else if (slug === 'time-value-machine') Component = <TimeValueCalc />;
  else if (slug === 'portfolio-risk-lab') Component = <PortfolioRiskCalc />;
  else if (slug === 'critical-path-simulator') Component = <CpmCalc />;
  else if (slug === 'ratio-analyzer') Component = <RatioAnalyzerCalc />;
  else if (slug === 'autonomous-workforce') Component = <AutonomousWorkforceCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else notFound();

  const toolSchema = tool ? [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.title,
      description: tool.desc,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web browser',
      url: `https://kunwaranalytics.in/tools/${slug}`,
      offers: tool.gated
        ? { '@type': 'Offer', description: 'Included with an active Pro or higher subscription.', url: `https://kunwaranalytics.in/checkout/pro` }
        : { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      publisher: { '@type': 'Organization', name: 'Kunwar Analytics' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kunwaranalytics.in' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://kunwaranalytics.in/tools' },
        { '@type': 'ListItem', position: 3, name: tool.title, item: `https://kunwaranalytics.in/tools/${slug}` },
      ],
    },
  ] : [];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
       {/* 3D Hero Banner */}
       <div className="relative w-full h-48 md:h-64 border-b border-border overflow-hidden">
          <Image src={heroImg} alt={slug} fill priority loading="eager" className="object-cover opacity-90 dark:opacity-70 dark:mix-blend-lighten mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
       </div>
       
       <JsonLd data={toolSchema} />

       {/* Promotion slot: CONTENT_TOP */}
       <div className="relative z-10">
          <PromotionSlot slot="CONTENT_TOP" path={`/tools/${slug}`} tags={tool?.category ? [tool.category] : []} />
       </div>

       {/* Calculator Component or Paywall */}
       <div className="-mt-16 z-10 relative">
          {tool?.gated && !hasPlanPremiumAccess ? (
            <div className="content-page py-8">
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Institutional Financial Tool</p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">{tool.title}</h1>
                <Paywall user={session?.user} minimumPlan="PRO" preview={<p className="text-muted-foreground leading-relaxed">{tool.desc}</p>}>
                  {Component}
                </Paywall>
              </div>
            </div>
          ) : (
            Component
          )}
       </div>
       {/* Promotion slot: CALCULATOR_RESULT — directly under the calculator */}
       <PromotionSlot slot="CALCULATOR_RESULT" path={`/tools/${slug}`} tags={tool?.category ? [tool.category] : []} />
       {tool && <RelatedFinanceTerms categories={tool.category ? [tool.category] : []} keywords={[slug, tool.title]} title="Related finance terms" limit={4} />}
       <PromotionSlot slot="CONTENT_BOTTOM" path={`/tools/${slug}`} tags={tool?.category ? [tool.category] : []} />
       <RelatedContentSection sourceType="TOOL" sourceSlug={slug} />
       <RelatedContentSection sourceType="TOOL" sourceSlug={slug} linkKind="CTA" />
       <ContentFaq relatedType="TOOL" relatedSlug={slug} />
       <PromotionSlot slot="FOOTER" path={`/tools/${slug}`} tags={tool?.category ? [tool.category] : []} />
    </div>
  );
}
