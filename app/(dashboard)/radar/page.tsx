import type { Metadata } from 'next';
import { getAllSectorConsensus } from '@/lib/sentimentEngine';
import { getQuarterByKey, shortLabel } from '@/lib/trackerData';
import PremiumRadar from '@/components/ui/PremiumRadar';
import QuarterSelector from '@/components/tracker/QuarterSelector';
import JsonLd from '@/components/seo/JsonLd';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contrarian Signal Radar',
  description: 'Quarter-keyed sector indicators from stored tracker data with supplementary keyword-based content signals. Not live market consensus or investment advice.',
};

function temperatureColor(label: string) {
  if (label.startsWith('EXTREME BULL')) return '#22c55e';
  if (label.startsWith('CONSENSUS BULL')) return '#4ade80';
  if (label.startsWith('EXTREME BEAR')) return '#ef4444';
  if (label.startsWith('CONSENSUS BEAR')) return '#f87171';
  return '#a3b2c8';
}

interface Props { searchParams: Promise<{ q?: string }> }

export default async function RadarPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const quarter = getQuarterByKey(q);
  const sectors = getAllSectorConsensus(quarter.key);
  const extremes = sectors.filter((s) => s.temperature > 80 || s.temperature < 20);

  const radarLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Contrarian Signal Radar — ${quarter.label}`,
    description: 'Site-defined quarter-keyed sector indicators with supplementary keyword-based content signals. Values are not live market consensus.',
    url: `https://kunwaranalytics.in/radar?q=${quarter.key}`,
    creator: { '@type': 'Organization', name: 'Kunwar Analytics' },
  };

  return (
    <div className="min-h-screen bg-[#0a1120] text-white">
      <JsonLd data={radarLd} />

      <section className="relative overflow-hidden bg-[#0b1623]">
        <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(800px 400px at 20% -10%, rgba(13,110,110,0.6), transparent), radial-gradient(700px 400px at 90% 0%, rgba(37,99,235,0.4), transparent), radial-gradient(500px 300px at 50% 110%, rgba(245,158,11,0.2), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-14">
          <nav className="text-xs text-slate-500 mb-8"><Link href="/" className="hover:text-teal-400">Home</Link><span className="mx-2">/</span><span className="text-slate-300">Contrarian Signal Radar</span></nav>
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-center">
            <div>
              <p className="section-label text-teal-400 mb-3 flex items-center gap-2"><span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" /></span>Intelligence Layer</p>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">Contrarian<br className="hidden md:block" /> <span className="bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">Signal Radar</span></h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed">A visual summary of stored sector indicators, plus a simple keyword-derived signal from available research and insight content. These values are not a market-wide consensus survey, live market data, or investment advice.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3"><QuarterSelector base="/radar" activeKey={quarter.key} light /><span className="text-xs text-slate-500">Showing <span className="text-teal-400 font-semibold">{quarter.label}</span> ({quarter.kind})</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ l: 'Sectors in view', v: sectors.length, icon: '📡' }, { l: 'Indicator ≥ 55', v: sectors.filter((s) => s.temperature >= 55).length, icon: '🐂', c: '#22c55e' }, { l: 'Indicator < 45', v: sectors.filter((s) => s.temperature < 45).length, icon: '🐻', c: '#f87171' }, { l: 'Extreme values', v: extremes.length, icon: '⚡', c: '#fbbf24' }].map((x) => (
                <div key={x.l} className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur"><div className="text-2xl mb-2">{x.icon}</div><p className="text-3xl font-extrabold" style={x.c ? { color: x.c } : {}}>{x.v}</p><p className="text-[11px] uppercase tracking-widest text-slate-400 mt-1">{x.l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {extremes.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border-y border-amber-500/20 py-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center gap-3"><span className="text-amber-400 font-bold text-sm">⚡ Extreme site-defined indicator values in {extremes.length} sector{extremes.length > 1 ? 's' : ''}:</span>{extremes.map((s) => <span key={s.sector} className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ color: temperatureColor(s.label), borderColor: temperatureColor(s.label) + '50', background: temperatureColor(s.label) + '15' }}>{s.sector}: {s.temperature}° — {shortLabel(s.label)}</span>)}</div>
        </div>
      )}

      <section className="py-14"><div className="max-w-7xl mx-auto px-6"><PremiumRadar sectors={sectors} activeKey={quarter.key} /></div></section>

      <section className="py-14 bg-[#0d1526]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8"><div><p className="section-label text-teal-400 mb-2">By the numbers</p><h2 className="text-3xl font-extrabold">All sector indicators</h2></div><Link href="/tracker" className="text-sm font-semibold text-teal-400 hover:text-teal-300">Explore sector trackers →</Link></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.sort((a, b) => Math.abs(b.temperature - 50) - Math.abs(a.temperature - 50)).map((s) => { const c = temperatureColor(s.label); const slug = s.sector.toLowerCase().replace(/\s+/g, '-'); return (
              <Link key={s.sector} href={`/tracker/${slug}?q=${quarter.key}`} className="group rounded-2xl bg-gradient-to-br from-[#111c31] to-[#0b1623] border border-white/10 p-5 hover:border-white/25 hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between"><p className="font-bold text-white group-hover:text-teal-300">{s.sector}</p><span className="text-lg font-extrabold" style={{ color: c }}>{s.temperature}°</span></div>
                <div className="mt-3 h-2 bg-[#1e293b] rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${s.temperature}%`, background: c }} /></div>
                <div className="mt-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md" style={{ background: c + '18', color: c }}>{s.label.split(' — ')[0]}</span><span className="text-xs text-slate-500">{s.contrarian[0] ? '⚡ ' + s.contrarian[0] : '—'}</span></div>
              </Link>); })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-teal-400 mb-3 text-center">Methodology</p><h2 className="text-3xl font-extrabold text-center mb-10">How the radar works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[{ icon: '🗃️', title: 'Stored baseline', desc: 'Baseline indicator values come from the selected quarter in the shared tracker data and match the corresponding sector page.' }, { icon: '🧠', title: 'Keyword-derived content signal', desc: 'When related research or insight text is available, a simple keyword heuristic estimates sentiment. It is not a measured market consensus.' }, { icon: '⚠️', title: 'Threshold display', desc: 'Fixed ranges drive the bullish, bearish, and extreme labels. They are descriptive UI thresholds, not validated forecasts or investment recommendations.' }].map((x) => (
              <div key={x.title} className="rounded-2xl bg-gradient-to-br from-[#111c31] to-[#0b1623] border border-white/10 p-6 text-center"><span className="text-3xl mb-3 block">{x.icon}</span><h3 className="text-lg font-bold text-white mb-2">{x.title}</h3><p className="text-sm text-slate-400 leading-relaxed">{x.desc}</p></div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[{ range: '80–100°', label: 'High indicator', note: 'Site-defined range', color: '#22c55e' }, { range: '35–65°', label: 'Mid-range', note: 'Site-defined range', color: '#a3b2c8' }, { range: '0–20°', label: 'Low indicator', note: 'Site-defined range', color: '#ef4444' }].map((r) => (
              <div key={r.range} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3"><span className="text-xl font-extrabold" style={{ color: r.color }}>{r.range}</span><div><p className="text-sm font-bold text-white">{r.label}</p><p className="text-[11px] text-slate-400">{r.note}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <PromotionSlot slot="CONTENT_BOTTOM" path="/radar" />
      <ContentFaq relatedType="PAGE" relatedSlug="radar" title="Radar methodology questions" />
      <RelatedContentSection sourceType="PAGE" sourceSlug="radar" />
      <RelatedContentSection sourceType="PAGE" sourceSlug="radar" linkKind="CTA" />

      <section className="py-14 border-t border-white/10"><div className="max-w-7xl mx-auto px-6 text-center"><h2 className="text-3xl font-extrabold mb-4">Explore additional tracker sections</h2><p className="text-slate-400 max-w-2xl mx-auto mb-8">Some sector pages include Pro-gated metrics. Pro access costs ₹999 for one calendar month after manual UPI payment approval; no automatic renewal is used.</p><div className="flex flex-wrap justify-center gap-4"><Link href="/pricing" className="btn-primary bg-teal-600 hover:bg-teal-500">Review current plan details →</Link><Link href="/contact" className="btn-outline-white">Send an enquiry</Link></div></div></section>
    </div>
  );
}
