import { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import DataLabHero from '@/components/data-lab/DataLabHero';
import DataLabCapabilities from '@/components/data-lab/DataLabCapabilities';
import DataLabHowItWorks from '@/components/data-lab/DataLabHowItWorks';
import DataLabSpotlight from '@/components/data-lab/DataLabSpotlight';
import DataLabExplorer from '@/components/data-lab/DataLabExplorer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getAllDataLab } from '@/lib/content';
import Link from 'next/link';
import { ArrowUpRight, Download, ChartSpline } from 'lucide-react';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import ResearchSubNav from '@/components/hub-navigation/ResearchSubNav';

export const metadata: Metadata = {
  title: 'Data Lab | Kunwar Analytics',
  description:
    'Browse published data-analysis project pages, interactive views, and downloads where available. Data sources and update details vary by project.',
};

export default function DataLabPage() {
  const projects = getAllDataLab();
  const featured = projects.find(p => p.featured) ?? projects[0];

  // Dataset / DataCatalog structured data for SEO + GEO
  const catalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'DataCatalog',
    name: 'Kunwar Analytics Data Lab',
    description:
      'Published data-analysis project pages with interactive views where available. Source detail, update timing, and downloadable files vary by project.',
    url: 'https://kunwaranalytics.in/data-lab',
    dataset: projects.map(p => ({
      '@type': 'Dataset',
      name: p.title,
      description: p.businessQuestion,
      url: `https://kunwaranalytics.in/data-lab/${p.slug}`,
      ...(p.image ? { image: `https://kunwaranalytics.in${p.image}` } : {}),
      creator: { '@type': 'Organization', name: 'Kunwar Analytics' },
      keywords: [...p.tools, p.sector].join(', '),
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={catalogSchema} />

      <ResearchSubNav
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Research', href: '/research' },
          { label: 'Data Lab', href: '/data-lab' },
        ]}
        title="Reproducible Data Lab"
        subtitle="Empirical data-driven projects, statistical modeling, and interactive quantitative visualisations."
        badge="DATA LAB"
      />

      {/* ===== 3D ANIMATED HERO ===== */}
      <DataLabHero />

      {/* Promotion slot: CONTENT_TOP */}
      <PromotionSlot slot="CONTENT_TOP" path="/data-lab" />

      {/* ===== CAPABILITIES ===== */}
      <DataLabCapabilities />

      {/* ===== HOW IT WORKS ===== */}
      <DataLabHowItWorks />

      {/* ===== FEATURED SPOTLIGHT ===== */}
      {featured && <DataLabSpotlight project={featured} />}

      {/* ===== ALL PROJECTS EXPLORER ===== */}
      <DataLabExplorer projects={projects} />

      {/* ===== INTERACTIVE TERMINAL CTA ===== */}
      <section className="py-20 border-t border-border-subtle bg-surface-raised relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-brand/5 pointer-events-none" />
        <div className="wrap relative z-10 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <span>⚡</span> Continuous Ingestion
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-content-primary mb-4">
              Need custom dataset pipeline or alternative data?
            </h2>
            <p className="text-content-secondary leading-relaxed mb-8 text-sm sm:text-base">
              We engineer custom data acquisition scripts, scrape alternative signals, and build proprietary valuation models tailored for family offices, PE/VC firms, and hedge funds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-brand/20"
              >
                Commission Data Project <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/research"
                className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
              >
                View Published Research
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Promotion slot: CONTENT_BOTTOM */}
      <PromotionSlot slot="CONTENT_BOTTOM" path="/data-lab" />
    </div>
  );
}
