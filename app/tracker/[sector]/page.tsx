import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTrackerBySlug, getQuarter, getLatestQuarter, getQuarterByKey, temperatureColor, shortLabel, type Direction, type Impact, type Status } from '@/lib/trackerData';
import { MetricTrendChart, SubSectorDonut, ProjectionChart, TemperatureGauge } from '@/components/tracker/TrackerCharts';
import SectorVideo from '@/components/tracker/SectorVideo';
import QuarterSelector from '@/components/tracker/QuarterSelector';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import JsonLd from '@/components/seo/JsonLd';
import { getSectorConsensus } from '@/lib/sentimentEngine';
import { getAllResearch } from '@/lib/content';

function DirectionBadge({ change, changeType }: { change: string; changeType: Direction }) {
  const styles: Record<Direction, string> = {
    up: 'bg-green-50 text-green-700 ring-green-200 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/30',
    down: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/30',
    flat: 'bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-500/10 dark:text-slate-300 dark:ring-slate-500/30',
  };
  const arrow = changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '→';
  return <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ring-1 ${styles[changeType]}`}>{arrow} {change}</span>;
}

function ImpactBadge({ impact }: { impact: Impact }) {
  const styles: Record<Impact, string> = { High: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400', Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400', Low: 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400' };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles[impact]}`}>{impact} Impact</span>;
}

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = { Implemented: 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400', Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400', Planned: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles[status]}`}>{status}</span>;
}

const catalystStyles: Record<string, string> = {
  Catalyst: 'bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:ring-teal-500/30',
  Watch: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/30',
  Risk: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/30',
};
const trendBadge: Record<Direction, string> = { up: 'text-green-600 dark:text-green-400', down: 'text-red-600 dark:text-red-400', flat: 'text-slate-500 dark:text-slate-400' };

interface Props { params: Promise<{ sector: string }>; searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sector } = await params;
  const t = getTrackerBySlug(sector);
  if (!t) return { title: 'Sector Tracker' };
  const latest = getLatestQuarter(t);
  return { title: `${t.name} Sector Tracker`, description: latest.headline };
}

export async function generateStaticParams() {
  return (await import('@/lib/trackerData')).getTrackerBySlug('') ? [] : (await import('@/lib/trackerData.data')).TRACKERS.map((t: { slug: string }) => ({ sector: t.slug }));
}

export default async function SectorTrackerPage({ params, searchParams }: Props) {
  const { sector } = await params;
  const { q: qParam } = await searchParams;
  const t = getTrackerBySlug(sector);
  if (!t) notFound();

  const quarterRef = getQuarterByKey(qParam);
  const quarterKey = quarterRef.key;
  const q = getQuarter(t, quarterKey);
  const color = temperatureColor(q.temperature, q.consensus);
  const live = getSectorConsensus(t.name, quarterKey);
  const related = getAllResearch().filter((p) => p.sector === t.name).slice(0, 3);

  const sections = [
    { id: 'overview', label: 'Overview' }, { id: 'kpis', label: 'KPIs' }, { id: 'mix', label: 'Sub-sectors' },
    { id: 'landscape', label: 'Competitive' }, { id: 'trends', label: 'Trends' }, { id: 'regulatory', label: 'Regulatory' },
    { id: 'swot', label: 'SWOT' }, { id: 'outlook', label: 'Outlook' }, { id: 'pro', label: 'Pro Metrics' },
  ];

  const breadcrumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kunwaranalytics.in/' },
    { '@type': 'ListItem', position: 2, name: 'Sector Trackers', item: 'https://kunwaranalytics.in/tracker' },
    { '@type': 'ListItem', position: 3, name: `${t.name} Sector Tracker`, item: `https://kunwaranalytics.in/tracker/${sector}` },
  ] };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0a1120] dark:text-slate-100">
      <JsonLd data={[breadcrumbLd]} />

      {/* Hero */}
      <section className="relative overflow-hidden text-white bg-[#0f1c2d]">
        <div className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(800px 320px at 15% -10%, ${t.coverGradient[0]}66, transparent), radial-gradient(700px 320px at 95% 0%, ${t.coverGradient[1]}55, transparent)` }} />
        <div className="relative max-w-7xl mx-auto px-6 pt-6 pb-14">
          <nav className="flex items-center gap-2 text-sm mb-8 flex-wrap">
            <Link href="/tracker" className="inline-flex items-center gap-1.5 text-teal-400 hover:text-white font-semibold transition-colors">← All sector trackers</Link>
            <span className="text-slate-600">|</span>
            <Link href="/" className="text-slate-400 hover:text-teal-400 transition-colors">Home</Link><span className="text-slate-600">/</span><span className="text-slate-200">{t.name}</span>
          </nav>
          <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">
            <div>
              <p className="text-teal-400 font-semibold flex items-center gap-2 mb-3"><span className="text-2xl">{t.icon}</span> {t.shortName}</p>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">{t.name} <span className="text-teal-400">Sector Tracker</span></h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">{q.headline}</p>
              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Compare by year &amp; quarter — <span className="text-teal-400">{quarterRef.label}</span> ({quarterRef.kind})</p>
                <QuarterSelector base={`/tracker/${sector}`} activeKey={quarterKey} light />
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="inline-flex items-center gap-2 text-xs font-semibold bg-teal-600/90 text-white px-3 py-1.5 rounded-full">Data as of {quarterRef.label}</span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-slate-200 px-3 py-1.5 rounded-full">{quarterRef.kind} snapshot</span>
              </div>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-[11px] font-bold uppercase tracking-widest text-teal-400 mb-3">Executive Summary</p>
                <p className="text-slate-200 leading-relaxed">{t.thesis}</p>
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" /></span>
                  <p className="text-sm font-bold text-white">Consensus temperature</p>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${color}22`, color }}>{live.temperature}° · {shortLabel(live.label)}</span>
                  {live.liveTemperature !== null && <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-300">Live content signal: {live.liveTemperature}°</span>}
                  <span className="text-xs text-slate-400">Single source of truth — mirrors the {quarterRef.label} tracker snapshot.</span>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl border bg-white/5 border-white/10 p-6 text-center">
                <TemperatureGauge value={q.temperature} color={color} />
                <p className="text-sm font-bold uppercase tracking-widest mt-3" style={{ color }}>{shortLabel(q.consensus)}</p>
                <p className="text-xs text-slate-400 mt-1">Consensus Temperature · {quarterRef.label}</p>
                <Link href="/radar" className="text-xs text-teal-400 hover:underline inline-block mt-4">View full radar →</Link>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 h-52 bg-[#0b1623]">
                <SectorVideo slug={t.slug} priority />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="pointer-events-none absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-widest text-white/90">▶ How {t.shortName} works</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky nav */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-[#0a1120]/90 backdrop-blur border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <nav className="flex gap-1 py-3 whitespace-nowrap text-sm">
            {sections.map((s) => <a key={s.id} href={`#${s.id}`} className="px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">{s.label}</a>)}
          </nav>
        </div>
      </div>

      {/* KPIs */}
      <section id="overview" className="py-14 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader label="Dashboard" title={`Key performance indicators — ${quarterRef.label}`} subtitle="Core metrics tracked each quarter, with historical trend." />
            <div className="mb-2"><QuarterSelector base={`/tracker/${sector}`} activeKey={quarterKey} /></div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" id="kpis">
            {q.keyMetrics.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 50}>
                <div className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{m.label}</p>
                  <div className="mt-2 flex items-baseline gap-1"><span className="text-3xl font-extrabold text-slate-900 dark:text-white">{m.value}</span>{m.suffix && <span className="text-sm font-medium text-slate-400">{m.suffix}</span>}</div>
                  <div className="mt-1"><DirectionBadge change={m.change} changeType={m.changeType} /></div>
                  <div className="mt-3"><MetricTrendChart data={m.sparkline.map((v, j) => ({ label: `Q${j + 1}`, value: v }))} color={color} /></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-sectors */}
      <section id="mix" className="py-14 bg-slate-50 dark:bg-[#0d1526] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Composition" title="Sub-sector breakdown" subtitle="How the sector splits across segments, with share and growth." />
          <div className="mt-8 grid lg:grid-cols-[380px_1fr] gap-8">
            <ScrollReveal><div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-6">
              <SubSectorDonut data={t.subSectors} />
              <div className="mt-2 space-y-2">{t.subSectors.map((s, i) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><span className="w-2.5 h-2.5 rounded-full" style={{ background: ['#0d6e6e', '#2563eb', '#ea580c', '#7c3aed', '#db2777', '#059669'][i % 6] }} />{s.name}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{s.share}%</span>
                </div>))}
              </div>
            </div></ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.subSectors.map((s, i) => (
                <ScrollReveal key={s.name} delay={i * 40}><div className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-5">
                  <div className="flex items-center justify-between"><h4 className="font-bold text-slate-900 dark:text-white">{s.name}</h4><span className="text-sm font-bold text-teal-600 dark:text-teal-400">{s.share}%</span></div>
                  <div className="flex gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400"><span>Growth: <span className="font-semibold text-slate-700 dark:text-slate-200">{s.growth}</span></span>{s.cagr && <span>· CAGR <span className="font-semibold text-slate-700 dark:text-slate-200">{s.cagr}</span></span>}</div>
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/10"><p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Key players</p><div className="flex flex-wrap gap-1.5">{s.players.map((p) => <span key={p} className="text-xs bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">{p}</span>)}</div></div>
                </div></ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitive */}
      <section id="landscape" className="py-14 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Peer Benchmarking" title="Competitive landscape" subtitle="A standardised view of the leading players across the sector." />
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50 dark:bg-white/5 text-left text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="px-5 py-3 font-semibold">Rank</th><th className="px-5 py-3 font-semibold">Player</th><th className="px-5 py-3 font-semibold hidden md:table-cell">Metric</th><th className="px-5 py-3 font-semibold">Value</th><th className="px-5 py-3 font-semibold">Trend</th><th className="px-5 py-3 font-semibold hidden lg:table-cell">Notes</th>
              </tr></thead>
              <tbody>{t.competitive.map((c, i) => (
                <tr key={c.player} className={`border-t border-slate-100 dark:border-white/10 ${i === 0 ? 'bg-teal-50/50 dark:bg-teal-500/5' : ''}`}>
                  <td className="px-5 py-4"><span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-xs font-extrabold ${i === 0 ? 'bg-teal-600 text-white' : i === 1 ? 'bg-slate-700 text-white' : i === 2 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300'}`}>{c.rank}</span></td>
                  <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">{c.player}</td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300 hidden md:table-cell">{c.metric}</td>
                  <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">{c.value}</td>
                  <td className="px-5 py-4"><DirectionBadge change={c.trend === 'flat' ? 'stable' : c.trend === 'up' ? 'gaining' : 'losing'} changeType={c.trend} /></td>
                  <td className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400 hidden lg:table-cell">{c.note}</td>
                </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trends */}
      <section id="trends" className="py-14 bg-slate-50 dark:bg-[#0d1526] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Thematic Analysis" title="Market trends & catalysts" subtitle="The forces shaping the sector over the next 12 months." />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {t.trends.map((trend, i) => (
              <ScrollReveal key={trend.title} delay={i * 50}><div className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-6">
                <div className="flex items-start justify-between gap-3"><h4 className="font-bold text-slate-900 dark:text-white">{trend.title}</h4><ImpactBadge impact={trend.impact} /></div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{trend.description}</p>
              </div></ScrollReveal>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">What to watch</h3>
            <div className="flex flex-wrap gap-3">{t.catalysts.map((c) => (
              <span key={c.title} className="inline-flex items-center gap-2 rounded-full ring-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-white/5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catalystStyles[c.type]}`}>{c.type}</span>{c.title}<span className="text-xs text-slate-400">· {c.timing}</span>
              </span>))}
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory */}
      <section id="regulatory" className="py-14 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Policy & Risk" title="Regulatory timeline" subtitle="Key policy and regulatory milestones relevant to the sector." />
          <div className="mt-8 space-y-0 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200 dark:before:bg-white/10 max-w-3xl">
            {t.regulatory.map((r) => (
              <div key={r.title} className="relative pl-10 pb-8">
                <span className={`absolute left-0 top-1 w-5 h-5 rounded-full ring-4 ${r.status === 'Implemented' ? 'bg-green-500 ring-green-100 dark:ring-green-500/20' : r.status === 'Pending' ? 'bg-amber-500 ring-amber-100 dark:ring-amber-500/20' : 'bg-blue-500 ring-blue-100 dark:ring-blue-500/20'}`} />
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2"><h4 className="font-bold text-slate-900 dark:text-white">{r.title}</h4><StatusBadge status={r.status} /></div>
                  <p className="text-xs text-slate-400 mt-1">Timeline: {r.date}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SWOT */}
      <section id="swot" className="py-14 bg-slate-50 dark:bg-[#0d1526] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Strategic Assessment" title="SWOT analysis" subtitle="A balanced view of internal strengths and external factors." />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              { title: 'Strengths', color: 'text-green-700 dark:text-green-400', items: t.swot.strengths, icon: '💪' },
              { title: 'Weaknesses', color: 'text-red-700 dark:text-red-400', items: t.swot.weaknesses, icon: '⚠️' },
              { title: 'Opportunities', color: 'text-blue-700 dark:text-blue-400', items: t.swot.opportunities, icon: '🚀' },
              { title: 'Threats', color: 'text-amber-700 dark:text-amber-400', items: t.swot.threats, icon: '🛑' },
            ].map((box, i) => (
              <ScrollReveal key={box.title} delay={i * 40}><div className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-6">
                <div className="flex items-center gap-2 mb-4"><span className="text-xl">{box.icon}</span><h3 className={`font-bold ${box.color}`}>{box.title}</h3></div>
                <ul className="space-y-2.5">{box.items.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"><span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-current opacity-50 flex-shrink-0" />{item}</li>)}</ul>
              </div></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outlook */}
      <section id="outlook" className="py-14 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Forecast" title="Future outlook" subtitle={`Projected market trajectory to 2027 (CAGR ${t.outlook.cagr}).`} />
          <div className="mt-8 grid lg:grid-cols-[1fr_420px] gap-8">
            <ScrollReveal><div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-6">
              <div className="flex items-end justify-between mb-2"><p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Market size projection</p><p className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">{t.outlook.marketSize2027}</p></div>
              <ProjectionChart data={t.outlook.projection} color={color} />
            </div></ScrollReveal>
            <div className="grid gap-5">
              <ScrollReveal><div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-6"><p className="text-[11px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-3">Key drivers</p><ul className="space-y-2">{t.outlook.drivers.map((d) => <li key={d} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"><span className="mt-0.5 text-green-600 dark:text-green-400">✓</span>{d}</li>)}</ul></div></ScrollReveal>
              <ScrollReveal delay={60}><div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-6"><p className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3">Key risks</p><ul className="space-y-2">{t.outlook.risks.map((r) => <li key={r} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"><span className="mt-0.5 text-red-600 dark:text-red-400">✕</span>{r}</li>)}</ul></div></ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pro metrics */}
      <section id="pro" className="py-14 bg-slate-50 dark:bg-[#0d1526] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Pro Access" title="Deeper metrics" subtitle="Proprietary profitability metrics and benchmarks that power our forward modelling." />
          <div className="mt-8 relative">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {t.proMetrics.map((m) => (
                <div key={m.label} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-5">
                  <div className="flex items-center justify-between"><p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">🔒 {m.label}</p><span className={`text-sm font-bold ${trendBadge[m.trend]}`}>{m.trend === 'up' ? '↑' : m.trend === 'down' ? '↓' : '→'}</span></div>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">{m.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{m.note}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 dark:bg-[#0a1120]/70 backdrop-blur-md">
              <div className="text-center px-6 py-8 max-w-md">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Unlock with Pro</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">Get the full deep-dive: {t.proMetrics.length}+ proprietary metrics, benchmark tables, quarterly trend database and forward scenarios for every sector.</p>
                <div className="flex flex-wrap justify-center gap-3"><Link href="/pricing" className="btn-primary">Subscribe from ₹999/month →</Link><Link href="/contact" className="btn-outline">Talk to the research desk</Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 bg-white dark:bg-[#0a1120] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader label="FAQ" title="Frequently asked questions" subtitle={`Answers about the ${t.name} sector tracker.`} align="center" />
          <div className="mt-10 space-y-4">
            {[
              { q: `What does the ${t.name} tracker cover?`, a: `Quarter-updated KPIs, sub-sector breakdown, competitive landscape, market trends, regulatory timeline, SWOT and forward outlook for ${t.name} — all drawn from a single verified source.` },
              { q: `What is the current ${t.name} consensus?`, a: `The consensus temperature for ${quarterRef.label} is ${q.temperature}° (${shortLabel(q.consensus)}), sourced from the same curated dataset used across all our trackers and the Contrarian Signal Radar.` },
              { q: 'How do I compare quarters?', a: 'Use the quarter selector at the top of the page to switch between quarter snapshots and see how each KPI, headline and temperature changed.' },
              { q: 'Is this financial advice?', a: 'No. These trackers are educational market-intelligence dashboards for research and analysis; they are not investment advice or a recommendation to buy or sell any security.' },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111c31] open:shadow-lg transition-all">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-slate-900 dark:text-white list-none"><span>{f.q}</span><span className="text-teal-600 dark:text-teal-400 text-lg transition-transform group-open:rotate-45 flex-shrink-0">+</span></summary>
                <p className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related research */}
      {related.length > 0 && (
        <section className="py-14 bg-slate-50 dark:bg-[#0d1526]">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader label="Research Library" title="Related research" />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((post) => (
                <Link key={post.slug} href={`/research/${post.slug}`} className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111c31] p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-2">{post.sector}</p>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{post.title}</h3>
                  <p className="text-xs text-slate-400 mt-2">{post.date.slice(0, 10)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="py-10 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <Link href="/tracker" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline">← All sector trackers</Link>
          <span className="text-xs text-slate-400">© {new Date().getFullYear()} Kunwar Analytics · Sector Intelligence</span>
        </div>
      </div>
    </div>
  );
}
