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

      {/* ===== 3D ANIMATED HERO ===== */}
      <DataLabHero />

      {/* ===== CAPABILITIES ===== */}
      <DataLabCapabilities />

      {/* ===== HOW IT WORKS ===== */}
      <DataLabHowItWorks />

      {/* ===== FEATURED SPOTLIGHT ===== */}
      {featured && <DataLabSpotlight project={featured} />}

      {/* ===== EXPLORER ===== */}
      <section id="explorer" className="relative scroll-mt-24 overflow-hidden bg-background">
        <div className="absolute inset-0 hidden cinema-grid opacity-15 dark:block" />
        <div className="content-page relative z-10 pb-24">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pt-24">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  The Collection
                </span>
                <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                  Explore Every Project
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Search and filter the published project pages. Interactive views and file downloads differ by project.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Download className="h-4 w-4 text-emerald-600 dark:text-cinema-aurora" />
                Downloads are available on selected pages
              </div>
            </div>
          </ScrollReveal>
          <DataLabExplorer projects={projects} />
        </div>
      </section>

      {/* ===== REQUEST A PROJECT CTA ===== */}
      <section id="interactive" className="relative overflow-hidden bg-muted/50">
        <div className="absolute inset-0 hidden cinema-mesh opacity-40 dark:block" />
        <div className="absolute inset-0 hidden cinema-noise dark:block" />
        <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] dark:bg-cinema-glow-blue/20" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px] dark:bg-cinema-violet/20" />
        <div className="content-page relative z-10 py-24 text-center">
          <span className="text-cinema-cyan text-sm font-semibold uppercase tracking-widest">
            Data-analysis enquiry
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-5xl">
            Ask about a <span className="cinema-text-glow">Data Lab</span> topic
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            You may enquire about a data or analysis question. A request does not confirm current capacity, availability, scope, price, or delivery; any potential work would require separate written agreement.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?service=Data%20Analytics%20Project"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:shadow-lg"
            >
              Submit an enquiry
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-base font-medium text-foreground transition hover:border-primary/50"
            >
              <ChartSpline className="h-4 w-4 text-primary" />
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
