import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { getTool, TOOLS } from '@/lib/tools-registry';
import { getCalculatorVisual } from '@/lib/tool-images';
import Image from 'next/image';
import Link from 'next/link';
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

  // Subject-specific verified visual asset
  const visual = getCalculatorVisual(slug);
  const heroImg = visual.src;

  // Contextual related calculators in same category or adjacent
  const relatedCalculators = TOOLS.filter(
    (t) => t.slug !== slug && (t.category === tool?.category || ['Valuation', 'Financial Model'].includes(t.category))
  ).slice(0, 3);

  let Component;
  if (slug === 'saas-ltv-cac-model') Component = <SaaSCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'ai-agent-roi-calculator') Component = <AiRoiCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  else if (slug === 'b2b-enterprise-marketing-roi') Component = <B2BMarketingCalc slug={slug} isPremiumUser={isCalculatorAvailable} />;
  // DCF is freemium: the core model renders for everyone; Pro scenarios /
  // sensitivity / cross-check / exports gate on the server-decided plan flag.
  else if (slug === 'dcf-valuation-model') Component = <DcfCalc slug={slug} isPremiumUser={hasPlanPremiumAccess} />;
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
    <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground transition-colors duration-200">
      <JsonLd data={toolSchema} />

      {/* ── Institutional Calculator Header ── */}
      <header className="border-b border-border bg-gradient-to-b from-card via-card to-background pt-8 pb-8">
        <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/tools" className="hover:text-foreground transition-colors">Calculators &amp; Models</Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{tool?.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-3xl">
              {/* Badges: Category, Difficulty, Access */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  {tool?.category}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                  tool?.gated
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}>
                  {tool?.gated ? 'Institutional Pro' : 'Free Interactive Tool'}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground border border-border">
                  {tool?.difficulty} Level
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  Format: {tool?.tool}
                </span>
              </div>

              {/* Title & One-sentence purpose */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-2">
                {tool?.title}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {tool?.desc}
              </p>

              {/* Contextual Related Calculators */}
              {relatedCalculators.length > 0 && (
                <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-muted-foreground font-medium">Related Models:</span>
                  {relatedCalculators.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/tools/${rel.slug}`}
                      className="px-2.5 py-1 rounded-md bg-muted/70 hover:bg-muted text-foreground border border-border/80 transition-colors"
                    >
                      {rel.title.split('—')[0].trim()} →
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Subject-Specific Visual Banner */}
            <div className="w-full sm:w-80 lg:w-96 h-48 rounded-2xl border border-border overflow-hidden shadow-lg shrink-0 relative bg-slate-950">
              <Image
                src={heroImg}
                alt={visual.alt}
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
                <span className="font-semibold bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {visual.badge}
                </span>
                <span className="font-mono text-[10px] text-teal-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Deterministic Math
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Promotion slot: CONTENT_TOP */}
      <div className="relative z-10">
        <PromotionSlot slot="CONTENT_TOP" path={`/tools/${slug}`} tags={tool?.category ? [tool.category] : []} />
      </div>

      {/* ── Calculator Workspace or Paywall ── */}
      <main className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {tool?.gated && !hasPlanPremiumAccess ? (
          <div className="py-6">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-2">
                Institutional Financial Tool
              </p>
              <h2 className="text-2xl font-extrabold text-foreground mb-3">{tool.title}</h2>
              <Paywall user={session?.user} minimumPlan="PRO" preview={<p className="text-muted-foreground leading-relaxed">{tool.desc}</p>}>
                {Component}
              </Paywall>
            </div>
          </div>
        ) : (
          Component
        )}
      </main>

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
