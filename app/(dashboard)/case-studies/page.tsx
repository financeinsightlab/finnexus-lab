// FILE: app/case-studies/page.tsx (server component)
import { Metadata } from 'next';
import { getAllCaseStudies } from '@/lib/content';
import JsonLd from '@/components/seo/JsonLd';
import CaseStudiesClient from '@/components/case-studies/CaseStudiesClient';
import { prisma } from '@/lib/prisma';
import { Briefcase, Building2, TrendingUp, Target, ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/types';

export const metadata: Metadata = {
  title: 'Case Studies | Kunwar Analytics',
  description:
    'Consulting-grade case studies across market entry, cost transformation, M&A due diligence, pricing, digital transformation, supply chain, and turnarounds — in the style of top strategy and Big 4 firms.',
};

const BASE = 'https://kunwaranalytics.in';

export default async function CaseStudiesPage() {
  // 1. Legacy MDX case studies
  const legacyStudies = getAllCaseStudies();

  // 2. New CMS posts (if any)
  let dbStudies: any[] = [];
  try {
    dbStudies = await (prisma as any).post.findMany({
      where: { type: 'CASE_STUDY', published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.error('Case Studies DB fetch failed:', e);
  }

  const dbMapped: CaseStudy[] = dbStudies.map((s) => ({
    slug: s.slug,
    title: s.title,
    date: new Date(s.createdAt).toISOString(),
    outcome: s.excerpt || 'New corporate transformation project.',
    engagementType: 'Strategic Advisory',
    clientType: 'Enterprise',
    industry: s.category ?? 'Enterprise',
    featured: false,
  }));

  // Merge (CMS first, then legacy), dedupe by slug
  const allStudies: CaseStudy[] = [
    ...dbMapped,
    ...legacyStudies.filter((l) => !dbMapped.some((d) => d.slug === l.slug)),
  ];

  const industries = new Set(allStudies.map((s) => s.industry).filter(Boolean) as string[]);
  const engagements = new Set(allStudies.map((s) => s.engagementType));

  return (
    <div className="min-h-screen bg-cinema-black text-white overflow-hidden">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Case Studies | Kunwar Analytics',
          url: `${BASE}/case-studies`,
          description: metadata.description,
        }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative aurora-bg pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-cinema-cyan/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-cinema-violet/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] bg-grid pointer-events-none" />

        <div className="wrap max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cinema-cyan/10 border border-cinema-cyan/30 text-cinema-cyan text-xs font-bold uppercase tracking-widest mb-6">
              <Briefcase className="w-3.5 h-3.5" /> Case Studies
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Analytical work,
              <span className="block bg-gradient-to-r from-cinema-cyan via-cinema-aurora to-cinema-violet bg-clip-text text-transparent">
                in practice.
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
              Consulting-grade engagements across market entry, cost transformation, M&A due
              diligence, pricing, digital transformation, supply chain, and turnarounds — each
              documenting the challenge, the approach, and the measurable outcome.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
              {[
                { label: 'Case studies', value: allStudies.length, icon: Briefcase },
                { label: 'Industries', value: industries.size, icon: Building2 },
                { label: 'Engagement types', value: engagements.size, icon: Target },
                { label: 'Avg. savings/impact', value: '₹150Cr+', icon: TrendingUp },
              ].map((s) => (
                <div key={s.label} className="glass-cinema rounded-xl border border-white/10 px-4 py-3 text-center">
                  <s.icon className="w-4 h-4 text-cinema-cyan mx-auto mb-1.5" />
                  <div className="text-xl md:text-2xl font-extrabold text-white tabular-nums">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#case-studies"
              className="mt-9 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cinema-cyan text-cinema-black font-bold shadow-glow-cyan hover:scale-[1.03] active:scale-95 transition-transform"
            >
              Browse the archive <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ ARCHIVE ═══════════ */}
      <CaseStudiesClient studies={allStudies} />

      {/* ═══════════ CTA ═══════════ */}
      <section className="aurora-bg border-t border-white/5">
        <div className="wrap max-w-4xl py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Have a similar challenge?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Whether you&apos;re a startup entering a new market, a PE firm evaluating an investment, or a
            platform builder optimising unit economics — we can help.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cinema-cyan text-cinema-black font-bold shadow-glow-cyan hover:scale-[1.03] active:scale-95 transition-transform"
            >
              Start a conversation
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Explore our services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
