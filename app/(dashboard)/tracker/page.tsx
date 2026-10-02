import type { Metadata } from 'next';
import Link from 'next/link';
import { getHeatMapData, temperatureColor, getQuarterByKey } from '@/lib/trackerData';
import { Sparkline } from '@/components/tracker/TrackerCharts';
import SectorVideo from '@/components/tracker/SectorVideo';
import QuarterSelector from '@/components/tracker/QuarterSelector';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import JsonLd from '@/components/seo/JsonLd';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';

export const metadata: Metadata = {
  title: 'Sector Intelligence Trackers',
  description: 'Quarter-keyed sector tracker snapshots for quick commerce, fintech, EV adoption, food delivery and other Indian sectors. Values are not intraday quotes.',
  alternates: { canonical: '/tracker' },
};

interface Props { searchParams: Promise<{ q?: string }> }

const METHODOLOGY = [
  { step: '01', icon: '🗃️', title: 'Stored snapshots', desc: 'Tracker pages render quarter-keyed data stored in the application. Coverage and detail vary by sector.' },
  { step: '02', icon: '🧭', title: 'Displayed indicators', desc: 'Temperatures, headlines, charts, and comparisons are site-defined summaries of the stored dataset, not a market-wide analyst survey.' },
  { step: '03', icon: '📅', title: 'Actuals & projections', desc: 'The quarter selector labels snapshots as Actual or Projection. Projection values are estimates and may not match realized outcomes.' },
  { step: '04', icon: '⚠️', title: 'Limitations', desc: 'These pages are not an intraday feed, and per-metric source and refresh timestamps are not published for every value. Verify important inputs independently; this is not investment advice.' },
];

export default async function TrackerIndexPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const quarter = getQuarterByKey(q);
  const heatMap = getHeatMapData(q);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: `Sector Intelligence Trackers — ${quarter.label}`,
    numberOfItems: heatMap.length,
    itemListElement: heatMap.map((h, i) => ({ '@type': 'ListItem', position: i + 1, name: `${h.name} Sector Tracker (${quarter.label})`, url: `https://kunwaranalytics.in/tracker/${h.slug}` })),
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0a1120] dark:text-slate-100">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0f1c2d] text-white">
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(800px 400px at 20% -10%, rgba(13,110,110,0.5), transparent), radial-gradient(700px 400px at 90% 0%, rgba(37,99,235,0.35), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <nav className="text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-teal-400">Home</Link><span className="mx-2">/</span><span className="text-slate-200">Sector Trackers</span>
          </nav>
          <p className="section-label text-teal-400 mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" /></span>
            Sector Intelligence Trackers
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 max-w-3xl">Sector market intelligence snapshots</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">Quarter-keyed data and site-defined indicators across supported Indian sectors. Values may be actuals or projections as labeled; this is not an intraday feed, and refresh timing is not guaranteed.</p>
          <div className="mt-7">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">View by year &amp; quarter — <span className="text-teal-400">{quarter.label}</span> ({quarter.kind})</p>
            <QuarterSelector base="/tracker" activeKey={quarter.key} light />
          </div>
        </div>
      </section>

      {/* Sector landscape grid */}
      <section id="landscape" className="py-16 md:py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <ScrollReveal>
              <SectionHeader label={`${quarter.kind} snapshot · ${quarter.label}`} title="Sector landscape" subtitle="Site-defined indicator, headline, and trend for the selected stored quarter. Open a tracker for its available detail." />
            </ScrollReveal>
            <div className="mb-2"><QuarterSelector base="/tracker" activeKey={quarter.key} /></div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {heatMap.map((h, i) => {
              const color = temperatureColor(h.temperature, h.label);
              return (
                <ScrollReveal key={h.slug} delay={i * 50}>
                  <Link href={`/tracker/${h.slug}?q=${quarter.key}`} id={`tracker-card-${h.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
                    <div className="relative h-48 w-full overflow-hidden bg-[#0b1623]">
                      <SectorVideo slug={h.slug} priority={i < 4} />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur bg-black/40">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />{h.temperature}° · {h.label}
                      </span>
                      <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-end justify-between">
                        <div><p className="text-lg font-bold text-white drop-shadow">{h.name}</p><p className="text-[10px] uppercase tracking-widest text-slate-300">{h.tagline}</p></div>
                        <span className="text-2xl drop-shadow">{h.icon}</span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h.headline}</p>
                      <div className="mt-3"><Sparkline data={h.latest.keyMetrics[0].sparkline} color={color} /></div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-white/10">
                        <span className="text-[11px] text-slate-400">{quarter.kind}: {quarter.label}</span>
                        <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">Open tracker →</span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 md:py-20 bg-slate-50 dark:bg-[#0d1526]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal><SectionHeader label="Data notes" title="How to read each tracker" subtitle="These views are based on stored, quarter-keyed data; individual source and refresh details are not available for every metric." align="center" /></ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {METHODOLOGY.map((m, i) => (
              <ScrollReveal key={m.step} delay={i * 70}>
                <div className="relative h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-6">
                  <span className="absolute top-5 right-6 text-4xl font-extrabold text-slate-100 dark:text-white/5">{m.step}</span>
                  <div className="text-3xl mb-4">{m.icon}</div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{m.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PromotionSlot placement="BETWEEN_CONTENT" path="/tracker" contentType="TRACKER" />
      <ContentFaq relatedType="PAGE" relatedSlug="tracker" title="Sector tracker questions" />
      <RelatedContentSection sourceType="PAGE" sourceSlug="tracker" />
      <RelatedContentSection sourceType="PAGE" sourceSlug="tracker" linkKind="CTA" />

      {/* CTA */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-[#0f1c2d] text-white">
        <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(700px 300px at 80% 100%, rgba(13,110,110,0.6), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="section-label text-teal-400 mb-3">Pro access</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Additional sections on supported trackers</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">Some sector pages include Pro-gated metrics. Pro access costs ₹999 for one calendar month after manual UPI payment approval; no automatic renewal is used.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/pricing" className="btn-primary bg-teal-600 hover:bg-teal-500">Review current plan details →</Link>
              <Link href="/contact" className="btn-outline-white">Send an enquiry</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
