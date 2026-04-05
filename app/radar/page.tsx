import type { Metadata } from 'next';
import { getAllSectorConsensus } from '@/lib/sentimentEngine';
import ConsensusRadar from '@/components/ui/ConsensusRadar';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contrarian Signal Radar | FinNexus Lab',
  description:
    'Live consensus-monitoring across Indian market sectors. Surface what the market is ignoring — the contrarian edge every analyst needs.',
};

function temperatureColor(label: string) {
  if (label.startsWith('EXTREME BULL'))   return '#22c55e';
  if (label.startsWith('CONSENSUS BULL')) return '#86efac';
  if (label.startsWith('EXTREME BEAR'))   return '#ef4444';
  if (label.startsWith('CONSENSUS BEAR')) return '#fca5a5';
  return '#94a3b8';
}

export default function RadarPage() {
  const sectors = getAllSectorConsensus();
  const extremes = sectors.filter(
    (s) => s.temperature > 80 || s.temperature < 20,
  );

  return (
    <div className="min-h-screen">
      {/* ─── Header ─── */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="section-label">Intelligence Layer</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4">
            📡 Contrarian Signal Radar
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Consensus-monitoring across every sector we track. Click a dot to see what the
            market is ignoring — and what contrarian signals are being missed.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Updated every time new research is published. Keyword-scored across all content.
          </p>
        </div>
      </section>

      {/* ─── Alert Banner ─── */}
      {extremes.length > 0 && (
        <div className="bg-amber-50 border-y border-amber-200 py-4">
          <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center gap-3">
            <span className="text-amber-700 font-bold text-sm">
              ⚡ Extreme consensus detected in {extremes.length} sector{extremes.length > 1 ? 's' : ''}:
            </span>
            {extremes.map((s) => (
              <span
                key={s.sector}
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{
                  color:        temperatureColor(s.label),
                  borderColor:  temperatureColor(s.label) + '50',
                  background:   temperatureColor(s.label) + '15',
                }}
              >
                {s.sector}: {s.temperature}° — {s.label.split(' — ')[0]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ─── Radar ─── */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <ConsensusRadar sectors={sectors} />
        </div>
      </section>

      {/* ─── Sector Table ─── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-bold text-brand-navy mb-6">
            All Sector Temperatures
          </h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Sector</th>
                  <th className="text-center px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Temperature</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Consensus</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Top Contrarian Signal</th>
                  <th className="text-center px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Content</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sectors
                  .sort((a, b) => Math.abs(b.temperature - 50) - Math.abs(a.temperature - 50))
                  .map((s) => {
                    const color  = temperatureColor(s.label);
                    const sectorSlug = s.sector.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <tr key={s.sector} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-brand-navy">{s.sector}</td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${s.temperature}%`, background: color }}
                              />
                            </div>
                            <span className="font-bold font-mono text-xs" style={{ color }}>
                              {s.temperature}°
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md"
                            style={{ background: color + '18', color }}
                          >
                            {s.label.split(' — ')[0]}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-500 max-w-[220px]">
                          {s.contrarian[0] ? (
                            <span className="capitalize italic">{s.contrarian[0]}</span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-center text-xs text-gray-400">
                          {s.total}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            href={`/tracker/${sectorSlug}`}
                            className="text-[11px] text-brand-teal hover:underline font-semibold whitespace-nowrap"
                          >
                            View Tracker →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl font-bold text-brand-navy mb-4">How the Radar Works</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
            Every piece of research and insight is keyword-scored for bullish and bearish signals.
            The temperature gauge reflects how bullish the recent narrative is across each sector.
            When temperature exceeds 80° or drops below 20°, contrarian caution is warranted.
          </p>
          <div className="grid grid-cols-3 gap-6 text-xs text-gray-500">
            {[
              { range: '80–100°', label: 'Extreme Bull', note: 'Contrarian caution', color: '#22c55e' },
              { range: '35–65°',  label: 'Mixed Signals', note: 'Balanced view', color: '#94a3b8' },
              { range: '0–20°',   label: 'Extreme Bear', note: 'Contrarian opportunity', color: '#ef4444' },
            ].map((r) => (
              <div key={r.range} className="card p-4 text-center">
                <p className="font-bold text-base" style={{ color: r.color }}>{r.range}</p>
                <p className="font-semibold text-brand-navy mt-1">{r.label}</p>
                <p className="text-gray-400 mt-0.5">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
