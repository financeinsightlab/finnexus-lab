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
    'The quantitative engine behind Kunwar Analytics — interactive Power BI dashboards, Python analyses, and financial models with live charts, simulators, and downloadable datasets.',
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
      'Interactive financial intelligence projects — Python analyses, Power BI dashboards, and financial models with downloadable datasets.',
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
    <div className="min-h-screen bg-cinema-ink">
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
      <section id="explorer" className="relative overflow-hidden bg-cinema-ink scroll-mt-24">
        <div className="absolute inset-0 cinema-grid opacity-15" />
        <div className="wrap relative z-10 max-w-6xl pb-24">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pt-24">
              <div>
                <span className="text-cinema-cyan text-sm font-semibold uppercase tracking-widest">
                  The Collection
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
                  Explore Every Project
                </h2>
                <p className="mt-3 text-gray-400 max-w-2xl">
                  Search, filter by tool or sector, and open any project to interact with its model, chart, and dataset.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Download className="w-4 h-4 text-cinema-aurora" />
                Every project ships a downloadable CSV
              </div>
            </div>
          </ScrollReveal>
          <DataLabExplorer projects={projects} />
        </div>
      </section>

      {/* ===== REQUEST A PROJECT CTA ===== */}
      <section id="interactive" className="relative overflow-hidden bg-cinema-black">
        <div className="absolute inset-0 cinema-mesh opacity-40" />
        <div className="absolute inset-0 cinema-noise" />
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-cinema-glow-blue/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cinema-violet/20 blur-[120px]" />
        <div className="wrap relative z-10 max-w-4xl py-24 text-center">
          <span className="text-cinema-cyan text-sm font-semibold uppercase tracking-widest">
            Have a question that needs data?
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">
            Request a <span className="cinema-text-glow">Data Lab</span> Project
          </h2>
          <p className="mt-5 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We build rigorous, data-backed analyses for retail investors, analysts,
            and enterprises. Tell us the question — we&apos;ll turn it into an interactive model.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cinema-cyan px-7 py-3.5 text-base font-semibold text-cinema-ink hover:shadow-cinema-lg transition group"
            >
              Request a Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-base font-medium text-white hover:border-cinema-cyan/50 transition"
            >
              <ChartSpline className="w-4 h-4 text-cinema-cyan" />
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
