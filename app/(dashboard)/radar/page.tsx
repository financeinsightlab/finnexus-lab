import type { Metadata } from 'next';
import { getAllSectorConsensus } from '@/lib/sentimentEngine';
import { getQuarterByKey } from '@/lib/trackerData';
import PremiumRadar from '@/components/ui/PremiumRadar';
import QuarterSelector from '@/components/tracker/QuarterSelector';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contrarian Signal Radar',
  description: 'Live consensus-monitoring across Indian market sectors. Animated radar surfacing what the market is ignoring — the contrarian edge every analyst needs.',
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

  const radarLd = [
    { '@context': 'https://schema.org', '@type': 'Dataset', name: `Contrarian Signal Radar — ${quarter.label}`, description: 'Live consensus temperature across Indian market sectors, surfacing contrarian signals.', url: `https://kunwaranalytics.in/radar?q=${quarter.key}`, temporalCoverage: '2024/2026', creator: { '@type': 'Organization', name: 'Kunwar Analytics' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is the Contrarian Signal Radar?', acceptedAnswer: { '@type': 'Answer', text: 'A live consensus dashboard across every sector we track, surfacing what the market is ignoring.' } },
      { '@type': 'Question', name: 'Where does the radar data come from?', acceptedAnswer: { '@type': 'Answer', text: 'The radar reads the same curated quarterly dataset as the sector trackers, so temperatures always match.' } },
      { '@type': 'Question', name: 'Can I compare quarters?', acceptedAnswer: { '@type': 'Answer', text: 'Use the quarter selector to switch between quarter snapshots and watch each sector\'s temperature shift.' } },
    ] },
  ];

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
              <p className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed">Consensus-monitoring across every sector we track. The sweeping beam surfaces what the market is <span className="text-amber-400 font-semibold">ignoring</span> — and the contrarian edge every analyst needs.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3"><QuarterSelector base="/radar" activeKey={quarter.key} light /><span className="text-xs text-slate-500">Showing <span className="text-teal-400 font-semibold">{quarter.label}</span> ({quarter.kind})</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ l: 'Sectors Monitored', v: sectors.length, icon: '📡' }, { l: 'Bullish', v: sectors.filter((s) => s.temperature >= 55).length, icon: '🐂', c: '#22c55e' }, { l: 'Bearish', v: sectors.filter((s) => s.temperature < 45).length, icon: '🐻', c: '#f87171' }, { l: 'Extreme Signals', v: extremes.length, icon: '⚡', c: '#fbbf24' }].map((x) => (
                <div key={x.l} className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur"><div className="text-2xl mb-2">{x.icon}</div><p className="text-3xl font-extrabold" style={x.c ? { color: x.c } : {}}>{x.v}</p><p className="text-[11px] uppercase tracking-widest text-slate-400 mt-1">{x.l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {extremes.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border-y border-amber-500/20 py-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center gap-3"><span className="text-amber-400 font-bold text-sm">⚡ Extreme consensus detected in {extremes.length} sector{extremes.length > 1 ? 's' : ''}:</span>{extremes.map((s) => <span key={s.sector} className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ color: temperatureColor(s.label), borderColor: temperatureColor(s.label) + '50', background: temperatureColor(s.label) + '15' }}>{s.sector}: {s.temperature}° — {s.label.split(' — ')[0]}</span>)}</div>
        </div>
      )}

      <section className="py-14"><div className="max-w-7xl mx-auto px-6"><PremiumRadar sectors={sectors} activeKey={quarter.key} /></div></section>

      <section className="py-14 bg-[#0d1526]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8"><div><p className="section-label text-teal-400 mb-2">By the numbers</p><h2 className="text-3xl font-extrabold">All sector temperatures</h2></div><Link href="/tracker" className="text-sm font-semibold text-teal-400 hover:text-teal-300">Explore full trackers →</Link></div>
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
            {[{ icon: '🧠', title: 'Signal Capture', desc: 'Every research piece and insight is keyword-scored for bullish and bearish signals across each sector.' }, { icon: '🌡️', title: 'Temperature Source', desc: 'The radar reads the same curated quarterly dataset as the trackers, so the numbers always match.' }, { icon: '🎯', title: 'Contrarian Edge', desc: 'When temperature exceeds 80° or drops below 20°, the radar flags what the crowd is ignoring.' }].map((x) => (
              <div key={x.title} className="rounded-2xl bg-gradient-to-br from-[#111c31] to-[#0b1623] border border-white/10 p-6 text-center"><span className="text-3xl mb-3 block">{x.icon}</span><h3 className="text-lg font-bold text-white mb-2">{x.title}</h3><p className="text-sm text-slate-400 leading-relaxed">{x.desc}</p></div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[{ range: '80–100°', label: 'Extreme Bull', note: 'Contrarian caution', color: '#22c55e' }, { range: '35–65°', label: 'Mixed Signals', note: 'Balanced view', color: '#a3b2c8' }, { range: '0–20°', label: 'Extreme Bear', note: 'Contrarian opportunity', color: '#ef4444' }].map((r) => (
              <div key={r.range} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3"><span className="text-xl font-extrabold" style={{ color: r.color }}>{r.range}</span><div><p className="text-sm font-bold text-white">{r.label}</p><p className="text-[11px] text-slate-400">{r.note}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0d1526]">
        <div className="max-w-3xl mx-auto px-6">
          <p className="section-label text-teal-400 mb-2 text-center">FAQ</p><h2 className="text-3xl font-extrabold text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-4">
            {[{ q: 'What is the Contrarian Signal Radar?', a: 'A live consensus dashboard across every sector we track. It surfaces what the market is ignoring — the contrarian signals most analysts miss.' }, { q: 'Where does the radar data come from?', a: 'The radar reads the same curated quarterly dataset as the sector trackers, so the temperatures always match. Live research signals are shown separately as a supplementary indicator.' }, { q: 'How do I read the temperature?', a: 'The centre shows the average across sectors. Each dot sits on a bull-to-bear axis: closer to the outer ring = more bullish, closer to centre = more bearish. Extremes pulse.' }, { q: 'Can I compare quarters?', a: 'Yes. Use the quarter selector to switch between quarter snapshots and watch how each sector\'s temperature shifts.' }].map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white/5 border border-white/10 open:shadow-lg transition-all"><summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-white list-none"><span>{f.q}</span><span className="text-teal-400 text-lg transition-transform group-open:rotate-45 flex-shrink-0">+</span></summary><p className="px-6 pb-5 text-sm text-slate-300 leading-relaxed">{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-white/10"><div className="max-w-7xl mx-auto px-6 text-center"><h2 className="text-3xl font-extrabold mb-4">Turn signal into edge</h2><p className="text-slate-400 max-w-2xl mx-auto mb-8">Get the full contrarian playbook and deep-dive sector analysis for every signal on this radar.</p><div className="flex flex-wrap justify-center gap-4"><Link href="/pricing" className="btn-primary bg-teal-600 hover:bg-teal-500">Subscribe from ₹999/month →</Link><Link href="/contact" className="btn-outline-white">Talk to the research desk</Link></div></div></section>
    </div>
  );
}
