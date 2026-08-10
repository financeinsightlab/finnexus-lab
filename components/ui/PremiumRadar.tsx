'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import type { SectorConsensus } from '@/lib/sentimentEngine';
import { getQuarterByKey } from '@/lib/trackerData';

const CX = 320, CY = 320, R_MAX = 250;
const COLORS: Record<string, string> = {
  'EXTREME BULL': '#22c55e', 'CONSENSUS BULL': '#4ade80', 'MIXED SIGNALS': '#a3b2c8', 'CONSENSUS BEAR': '#f87171', 'EXTREME BEAR': '#ef4444',
};
function color(label: string) { for (const k of ['EXTREME BULL', 'CONSENSUS BULL', 'EXTREME BEAR', 'CONSENSUS BEAR']) { if (label.startsWith(k)) return COLORS[k]; } return COLORS['MIXED SIGNALS']; }
function polar(angleDeg: number, r: number) { const rad = ((angleDeg - 90) * Math.PI) / 180; return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }; }

interface Props { sectors: SectorConsensus[]; activeKey?: string }

export default function PremiumRadar({ sectors, activeKey }: Props) {
  const [active, setActive] = useState<SectorConsensus | null>(null);
  const [beamDeg, setBeamDeg] = useState(0);
  const frameRef = useRef<number>(0);
  const quarter = getQuarterByKey(activeKey);

  useEffect(() => {
    const step = () => { setBeamDeg((d) => (d + 0.4) % 360); frameRef.current = requestAnimationFrame(step); };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const angleStep = 360 / sectors.length;
  const stats = useMemo(() => {
    const avg = sectors.length ? Math.round(sectors.reduce((a, s) => a + s.temperature, 0) / sectors.length) : 0;
    const bull = sectors.filter((s) => s.temperature >= 55).length;
    const bear = sectors.filter((s) => s.temperature < 45).length;
    return { avg, bull, bear, neutral: sectors.length - bull - bear };
  }, [sectors]);

  const beamP1 = polar(beamDeg, R_MAX);
  const beamP2 = polar(beamDeg + 34, R_MAX);

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0b1623] to-[#0f1c2d] border border-white/10 p-4 overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(500px 400px at 30% 20%, rgba(13,110,110,0.35), transparent), radial-gradient(400px 300px at 80% 90%, rgba(37,99,235,0.25), transparent)' }} />
        <div className="relative">
          <svg viewBox="0 0 640 640" className="w-full" aria-label="Premium Contrarian Signal Radar">
            <circle cx={CX} cy={CY} r={R_MAX + 16} fill="#0b1623" stroke="rgba(148,163,184,0.15)" strokeWidth={1} />
            {[0.35, 0.55, 0.75, 1.0].map((f, i) => (
              <circle key={i} cx={CX} cy={CY} r={R_MAX * f} fill="none" stroke={i === 3 ? 'rgba(34,197,94,0.25)' : 'rgba(148,163,184,0.10)'} strokeWidth={1} strokeDasharray={i % 2 ? '3 4' : 'none'} />
            ))}
            <circle cx={CX} cy={CY} r={R_MAX * 0.35} fill="rgba(239,68,68,0.05)" />
            <circle cx={CX} cy={CY} r={R_MAX} fill="none" stroke="rgba(34,197,94,0.18)" strokeWidth={1} />
            <path d={`M ${CX} ${CY} L ${beamP1.x} ${beamP1.y} A ${R_MAX} ${R_MAX} 0 0 0 ${beamP2.x} ${beamP2.y} Z`} fill="rgba(34,197,94,0.06)" />
            <line x1={CX} y1={CY} x2={beamP1.x} y2={beamP1.y} stroke="rgba(74,222,128,0.5)" strokeWidth={1.5} />
            <text x={CX + R_MAX * 0.35 + 8} y={CY - 8} fill="rgba(239,68,68,0.5)" fontSize="10" fontWeight="700" letterSpacing="1">BEAR</text>
            <text x={CX + R_MAX - 8} y={CY + 20} textAnchor="end" fill="rgba(34,197,94,0.5)" fontSize="10" fontWeight="700" letterSpacing="1">BULL</text>
            {sectors.map((s, i) => {
              const angle = i * angleStep;
              const outer = polar(angle, R_MAX + 8);
              const dotR = 45 + (s.temperature / 100) * (R_MAX - 45);
              const dot = polar(angle, dotR);
              const labelPt = polar(angle, R_MAX + 30);
              const c = color(s.label);
              const isActive = active?.sector === s.sector;
              const isExtreme = s.temperature > 80 || s.temperature < 20;
              const anchor = labelPt.x < CX - 30 ? 'end' : labelPt.x > CX + 30 ? 'start' : 'middle';
              return (
                <g key={s.sector} style={{ cursor: 'pointer' }} onClick={() => setActive(isActive ? null : s)}>
                  <line x1={CX} y1={CY} x2={outer.x} y2={outer.y} stroke={isActive ? c : 'rgba(148,163,184,0.12)'} strokeWidth={isActive ? 2 : 1} />
                  <circle cx={dot.x} cy={dot.y} r={isActive ? 26 : 20} fill={`${c}18`} />
                  {isExtreme && (<><circle cx={dot.x} cy={dot.y} r={14} fill="none" stroke={`${c}60`} strokeWidth={1.5}><animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" /></circle></>)}
                  <circle cx={dot.x} cy={dot.y} r={isActive ? 15 : 11} fill={c} stroke="#fff" strokeWidth={2} style={{ transition: 'r .2s' }} />
                  <text x={dot.x} y={dot.y + 4} textAnchor="middle" fill="#0b1623" fontSize="10" fontWeight="800" fontFamily="IBM Plex Mono,monospace">{s.temperature}</text>
                  <text x={labelPt.x} y={labelPt.y} textAnchor={anchor} fill={isActive ? '#fff' : '#94a3b8'} fontSize="12" fontWeight={isActive ? '800' : '600'} fontFamily="Inter,sans-serif">{s.sector}</text>
                </g>
              );
            })}
            <circle cx={CX} cy={CY} r={26} fill="#0f1c2d" stroke="rgba(13,110,110,0.5)" strokeWidth={1.5} />
            <text x={CX} y={CY - 2} textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="800" fontFamily="Inter,sans-serif">{stats.avg}°</text>
            <text x={CX} y={CY + 14} textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600" letterSpacing="1">AVG</text>
          </svg>
        </div>
        <div className="relative flex flex-wrap items-center gap-4 mt-2 px-2">
          {[['Extreme Bear', '#ef4444'], ['Mixed', '#a3b2c8'], ['Extreme Bull', '#22c55e']].map(([l, c]) => (
            <span key={l} className="flex items-center gap-1.5 text-[10px] text-slate-400"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /> {l}</span>
          ))}
          <span className="text-[10px] text-slate-500 ml-auto hidden sm:inline">{quarter.label} · {quarter.kind}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[{ l: 'Avg Temp', v: `${stats.avg}°`, c: '#4ade80' }, { l: 'Bullish', v: stats.bull, c: '#22c55e' }, { l: 'Bearish', v: stats.bear, c: '#f87171' }].map((x) => (
            <div key={x.l} className="rounded-2xl bg-gradient-to-br from-[#111c31] to-[#0b1623] border border-white/10 p-3 text-center"><p className="text-2xl font-extrabold" style={{ color: x.c }}>{x.v}</p><p className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">{x.l}</p></div>
          ))}
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-[#111c31] to-[#0b1623] border border-white/10 p-6 min-h-[240px]">
          {active ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3"><span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: `${color(active.label)}22`, color: color(active.label) }}>{active.label.split(' — ')[0]}</span><span className="text-2xl font-extrabold text-white">{active.temperature}°</span></div>
              <h3 className="text-2xl font-extrabold text-white">{active.sector}</h3>
              <p className="text-slate-400 text-sm">{active.total} pieces of content analysed</p>
              <div><div className="h-3 bg-[#1e293b] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${active.temperature}%`, background: color(active.label) }} /></div><div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>Bearish {active.bearishCount}</span><span>Neutral {active.total - active.bullishCount - active.bearishCount}</span><span>Bullish {active.bullishCount}</span></div></div>
              {active.contrarian.length > 0 && (<div><p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">⚡ What is being ignored</p><ul className="space-y-1.5">{active.contrarian.map((sig) => <li key={sig} className="flex items-start gap-2 text-sm text-slate-300"><span className="text-amber-400">→</span><span className="capitalize">{sig}</span></li>)}</ul></div>)}
              <a href={`/tracker/${active.sector.toLowerCase().replace(/\s+/g, '-')}?q=${quarter.key}`} className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300">Read full sector analysis →</a>
            </div>
          ) : (<div className="flex flex-col items-center justify-center h-full min-h-[180px] text-center"><div className="text-4xl mb-3">📡</div><p className="text-slate-400 text-sm max-w-xs">Click any sector dot to see its consensus breakdown and contrarian signals.</p></div>)}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sectors.map((s) => { const c = color(s.label); const isActive = active?.sector === s.sector; return (
            <button key={s.sector} onClick={() => setActive(isActive ? null : s)} className="flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all text-xs" style={{ background: isActive ? `${c}15` : 'rgba(15,28,45,0.6)', borderColor: isActive ? `${c}50` : 'rgba(255,255,255,0.1)', color: isActive ? '#e2e8f0' : '#94a3b8' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: c }} /><span className="font-medium truncate flex-1">{s.sector}</span><span className="font-bold font-mono" style={{ color: c }}>{s.temperature}°</span>
            </button>); })}
        </div>
      </div>
    </div>
  );
}
