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
  if (label.startsWith('EXTREME BULL') || label.startsWith('CONSENSUS BULL')) return 'hsl(var(--success))';
  if (label.startsWith('EXTREME BEAR') || label.startsWith('CONSENSUS BEAR')) return 'hsl(var(--error))';
  return 'hsl(var(--content-muted))';
}

function temperatureMuted(label: string) {
  if (label.startsWith('EXTREME BULL') || label.startsWith('CONSENSUS BULL')) return 'hsl(var(--success-muted))';
  if (label.startsWith('EXTREME BEAR') || label.startsWith('CONSENSUS BEAR')) return 'hsl(var(--error-muted))';
  return 'hsl(var(--surface-muted))';
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
    <div className="min-h-screen bg-background text-content-primary">
      <JsonLd data={radarLd} />

      <section className="relative overflow-hidden bg-surface">
        <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(800px 400px at 20% -10%, rgba(13,110,110,0.6), transparent), radial-gradient(700px 400px at 90% 0%, rgba(37,99,235,0.4), transparent), radial-gradient(500px 300px at 50% 110%, rgba(245,158,11,0.2), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-14">
          <nav className="text-xs text-content-muted mb-8"><Link href="/" className="hover:text-brand">Home</Link><span className="mx-2">/</span><span className="text-content-secondary">Contrarian Signal Radar</span></nav>
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-center">
            <div>
              <p className="section-label text-brand mb-3 flex items-center gap-2"><span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" /></span>Intelligence Layer</p>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">Contrarian<br className="hidden md:block" /> <span className="bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">Signal Radar</span></h1>
              <p className="text-content-secondary text-lg md:text-xl max-w-xl leading-relaxed">A visual summary of stored sector indicators, plus a simple keyword-derived signal from available research and insight content. These values are not a market-wide consensus survey, live market data, or investment advice.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3"><QuarterSelector base="/radar" activeKey={quarter.key} /><span className="text-xs text-content-muted">Showing <span className="text-brand font-semibold">{quarter.label}</span> ({quarter.kind})</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ l: 'Sectors in view', v: sectors.length, icon: '📡' }, { l: 'Indicator ≥ 55', v: sectors.filter((s) => s.temperature >= 55).length, icon: '🐂', c: 'hsl(var(--success))' }, { l: 'Indicator < 45', v: sectors.filter((s) => s.temperature < 45).length, icon: '🐻', c: 'hsl(var(--error))' }, { l: 'Extreme values', v: extremes.length, icon: '⚡', c: 'hsl(var(--warning))' }].map((x) => (
                <div key={x.l} className="rounded-2xl bg-surface-raised border border-border p-5 backdrop-blur"><div className="text-2xl mb-2">{x.icon}</div><p className="text-3xl font-extrabold" style={x.c ? { color: x.c } : {}}>{x.v}</p><p className="text-[11px] uppercase tracking-widest text-content-muted mt-1">{x.l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {extremes.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border-y border-amber-500/20 py-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center gap-3"><span className="text-amber-400 font-bold text-sm">⚡ Extreme site-defined indicator values in {extremes.length} sector{extremes.length > 1 ? 's' : ''}:</span>{extremes.map((s) => <span key={s.sector} className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ color: temperatureColor(s.label), borderColor: 'hsl(var(--border))', background: temperatureMuted(s.label) }}>{s.sector}: {s.temperature}° — {shortLabel(s.label)}</span>)}</div>
        </div>
      )}

      <section className="py-14"><div className="max-w-7xl mx-auto px-6"><PremiumRadar sectors={sectors} activeKey={quarter.key} /></div></section>

      <section className="py-14 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8"><div><p className="section-label text-brand mb-2">By the numbers</p><h2 className="text-3xl font-extrabold">All sector indicators</h2></div><Link href="/tracker" className="text-sm font-semibold text-brand hover:text-brand-hover">Explore sector trackers →</Link></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.sort((a, b) => Math.abs(b.temperature - 50) - Math.abs(a.temperature - 50)).map((s) => { const c = temperatureColor(s.label); const slug = s.sector.toLowerCase().replace(/\s+/g, '-'); return (
              <Link key={s.sector} href={`/tracker/${slug}?q=${quarter.key}`} className="group rounded-2xl bg-surface-raised border border-border p-5 hover:border-brand/40 hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between"><p className="font-bold text-content-primary group-hover:text-brand-hover">{s.sector}</p><span className="text-lg font-extrabold" style={{ color: c }}>{s.temperature}°</span></div>
                <div className="mt-3 h-2 bg-surface-raised rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${s.temperature}%`, background: c }} /></div>
                <div className="mt-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md" style={{ background: temperatureMuted(s.label), color: c }}>{s.label.split(' — ')[0]}</span><span className="text-xs text-content-muted">{s.contrarian[0] ? '⚡ ' + s.contrarian[0] : '—'}</span></div>
              </Link>); })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-brand mb-3 text-center">Methodology</p><h2 className="text-3xl font-extrabold text-center mb-10">How the radar works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[{ icon: '🗃️', title: 'Stored baseline', desc: 'Baseline indicator values come from the selected quarter in the shared tracker data and match the corresponding sector page.' }, { icon: '🧠', title: 'Keyword-derived content signal', desc: 'When related research or insight text is available, a simple keyword heuristic estimates sentiment. It is not a measured market consensus.' }, { icon: '⚠️', title: 'Threshold display', desc: 'Fixed ranges drive the bullish, bearish, and extreme labels. They are descriptive UI thresholds, not validated forecasts or investment recommendations.' }].map((x) => (
              <div key={x.title} className="rounded-2xl bg-surface-raised border border-border p-6 text-center"><span className="text-3xl mb-3 block">{x.icon}</span><h3 className="text-lg font-bold text-content-primary mb-2">{x.title}</h3><p className="text-sm text-content-muted leading-relaxed">{x.desc}</p></div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[{ range: '80–100°', label: 'High indicator', note: 'Site-defined range', color: 'hsl(var(--success))' }, { range: '35–65°', label: 'Mid-range', note: 'Site-defined range', color: 'hsl(var(--content-muted))' }, { range: '0–20°', label: 'Low indicator', note: 'Site-defined range', color: 'hsl(var(--error))' }].map((r) => (
              <div key={r.range} className="flex items-center gap-3 rounded-xl border border-border bg-surface-raised px-5 py-3"><span className="text-xl font-extrabold" style={{ color: r.color }}>{r.range}</span><div><p className="text-sm font-bold text-content-primary">{r.label}</p><p className="text-[11px] text-content-muted">{r.note}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <PromotionSlot placement="BETWEEN_CONTENT" path="/radar" contentType="PAGE" />
      <ContentFaq relatedType="PAGE" relatedSlug="radar" title="Radar methodology questions" />
      <RelatedContentSection sourceType="PAGE" sourceSlug="radar" />
      <RelatedContentSection sourceType="PAGE" sourceSlug="radar" linkKind="CTA" />

      <section className="py-14 border-t border-white/10"><div className="max-w-7xl mx-auto px-6 text-center"><h2 className="text-3xl font-extrabold mb-4">Explore additional tracker sections</h2><p className="text-content-muted max-w-2xl mx-auto mb-8">Some sector pages include Pro-gated metrics. Pro access costs ₹999 for one calendar month after manual UPI payment approval; no automatic renewal is used.</p><div className="flex flex-wrap justify-center gap-4"><Link href="/pricing" className="btn-primary">Review current plan details →</Link><Link href="/contact" className="btn-outline-white">Send an enquiry</Link></div></div></section>
    </div>
  );
}
