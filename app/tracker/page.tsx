import type { Metadata } from 'next';
import Link from 'next/link';
import { getHeatMapData, temperatureColor, getQuarterByKey } from '@/lib/trackerData';
import { Sparkline } from '@/components/tracker/TrackerCharts';
import SectorVideo from '@/components/tracker/SectorVideo';
import QuarterSelector from '@/components/tracker/QuarterSelector';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Sector Intelligence Trackers',
  description: 'Live, quarter-updated market intelligence across 8+ Indian sectors — consensus temperature, KPIs, competitive landscape, regulatory timeline, SWOT and outlook by year & quarter.',
};

interface Props { searchParams: Promise<{ q?: string }> }

const METHODOLOGY = [
  { step: '01', icon: '📡', title: 'Signal Capture', desc: 'We continuously ingest company filings, exchange data, regulatory releases, earnings-call transcripts and primary research across each sector.' },
  { step: '02', icon: '🧮', title: 'Quantitative Scoring', desc: 'Every KPI is normalised, indexed and trended. Our consensus engine blends quarterly baselines with live content signals into a 0–100 sector temperature.' },
  { step: '03', icon: '🗂️', title: 'Peer Benchmarking', desc: 'Competitive landscapes are built from a standardised universe so market-share and margin claims are directly comparable across players.' },
  { step: '04', icon: '🧭', title: 'Analyst Review', desc: 'Senior analysts stress-test every number against independent sources before it publishes.' },
];

export default async function TrackerIndexPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const quarter = getQuarterByKey(q);
  const heatMap = getHeatMapData(q);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: `Sector Intelligence Trackers — ${quarter.label}`,
    numberOfItems: heatMap.length,
    itemListElement: heatMap.map((h, i) => ({ '@type': 'ListItem', position: i + 1, name: `${h.name} Sector Tracker (${quarter.label})`, url: `https://kunwaranalytics.in/tracker` })),
  };
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What are Kunwar Analytics sector trackers?', acceptedAnswer: { '@type': 'Answer', text: 'Quarter-updated market intelligence dashboards covering KPIs, consensus temperature, competitive landscape, regulatory timeline, SWOT and outlook across 8+ Indian market sectors.' } },
      { '@type': 'Question', name: 'How often is tracker data updated?', acceptedAnswer: { '@type': 'Answer', text: 'Trackers are refreshed quarterly. Each quarter\'s snapshot is preserved so you can compare year-on-year and quarter-on-quarter changes.' } },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0a1120] dark:text-slate-100">
      <JsonLd data={[jsonLd, faqLd]} />

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
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 max-w-3xl">Live market intelligence,<br className="hidden md:block" /> built like a <span className="text-teal-400">research desk</span>.</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">Quarter-updated data, consensus temperature and competitive landscapes across 8 high-impact Indian sectors — with the rigour and transparency of a top consulting practice.</p>
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
              <SectionHeader label={`Market Pulse · ${quarter.label}`} title="Sector landscape" subtitle="Live consensus temperature, current headline and trend across every sector. Open a card for the full deep-dive." />
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
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
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
                        <span className="text-[11px] text-slate-400">Data as of {quarter.label}</span>
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
          <ScrollReveal><SectionHeader label="Methodology" title="How we build each tracker" subtitle="A disciplined, four-stage process that mirrors how institutional research desks and consultancies validate market intelligence." align="center" /></ScrollReveal>
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

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-slate-50 dark:bg-[#0d1526]">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal><SectionHeader label="FAQ" title="Frequently asked questions" subtitle="Everything you need to know about our sector intelligence trackers." align="center" /></ScrollReveal>
          <div className="mt-10 space-y-4">
            {[
              { q: 'What are Kunwar Analytics sector trackers?', a: 'Quarter-updated market intelligence dashboards covering KPIs, consensus temperature, competitive landscape, regulatory timeline, SWOT and outlook across 8+ Indian market sectors.' },
              { q: 'How often is tracker data updated?', a: 'Trackers are refreshed quarterly. Each quarter\'s snapshot is preserved so you can compare year-on-year and quarter-on-quarter changes using the quarter selector.' },
              { q: 'What is the consensus temperature?', a: 'A 0–100 score indicating how bullish or bearish consensus is for a sector. It is drawn from a single curated source shared across the tracker and the Contrarian Signal Radar, so the two always agree.' },
              { q: 'Is this financial advice?', a: 'No. These trackers are educational market-intelligence dashboards for research and analysis; they are not investment advice or a recommendation to buy or sell any security.' },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] open:shadow-lg transition-all">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-slate-900 dark:text-white list-none">
                  <span>{f.q}</span><span className="text-teal-600 dark:text-teal-400 text-lg transition-transform group-open:rotate-45 flex-shrink-0">+</span>
                </summary>
                <p className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-[#0f1c2d] text-white">
        <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(700px 300px at 80% 100%, rgba(13,110,110,0.6), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="section-label text-teal-400 mb-3">Get the edge</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Full trackers for Pro members</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">Unlock proprietary profitability metrics, benchmark tables and forward outlooks for every sector — refreshed quarterly by year and quarter.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/pricing" className="btn-primary bg-teal-600 hover:bg-teal-500">Subscribe from ₹999/month →</Link>
              <Link href="/contact" className="btn-outline-white">Talk to the research desk</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
