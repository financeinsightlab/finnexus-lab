'use client';

import { useState, useRef, useCallback } from 'react';
import type { SectorConsensus } from '@/lib/sentimentEngine';

// ─── SVG geometry helpers ─────────────────────────────────────────────────────

const TWO_PI  = Math.PI * 2;
const CX      = 300;  // SVG center x
const CY      = 300;  // SVG center y
const R_MAX   = 220;  // outer ring radius
const R_BULL  = 0.80; // outer bull zone threshold (fraction of R_MAX)
const R_BEAR  = 0.35; // inner bear zone threshold

function polarToXY(angleDeg: number, r: number): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function temperatureToRadius(temperature: number): number {
  // 0 → inner (bear), 50 → middle, 100 → outer (bull)
  const fraction = temperature / 100;
  const minR     = 40;
  return minR + fraction * (R_MAX - minR);
}

const TEMP_COLOR: Record<string, string> = {
  'EXTREME BULL':    '#22c55e',
  'CONSENSUS BULL':  '#86efac',
  'MIXED SIGNALS':   '#94a3b8',
  'CONSENSUS BEAR':  '#fca5a5',
  'EXTREME BEAR':    '#ef4444',
};

function temperatureColor(label: string): string {
  for (const key in TEMP_COLOR) {
    if (label.includes(key.split(' ')[0] + ' ' + label.split(' ')[1])) {
      // just do simple starts-with match
    }
  }
  if (label.startsWith('EXTREME BULL'))   return '#22c55e';
  if (label.startsWith('CONSENSUS BULL')) return '#86efac';
  if (label.startsWith('EXTREME BEAR'))   return '#ef4444';
  if (label.startsWith('CONSENSUS BEAR')) return '#fca5a5';
  return '#94a3b8';
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ConsensusRadarProps {
  sectors: SectorConsensus[];
}

export default function ConsensusRadar({ sectors }: ConsensusRadarProps) {
  const [active, setActive] = useState<SectorConsensus | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const angleStep = 360 / sectors.length;

  const handleDotClick = useCallback((s: SectorConsensus) => {
    setActive((prev) => (prev?.sector === s.sector ? null : s));
  }, []);

  const hasExtreme = sectors.some(
    (s) => s.temperature > 80 || s.temperature < 20,
  );

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start w-full">
      {/* ── SVG Radar ── */}
      <div className="relative flex-shrink-0">
        <svg
          ref={svgRef}
          viewBox="0 0 600 600"
          width="100%"
          style={{ maxWidth: 560 }}
          aria-label="Contrarian Signal Radar"
        >
          {/* Background */}
          <circle cx={CX} cy={CY} r={R_MAX + 30} fill="#0b1623" />

          {/* Concentric zone rings */}
          {/* Bear zone */}
          <circle cx={CX} cy={CY} r={R_MAX * R_BEAR} fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.15)" strokeWidth={1} />
          {/* Neutral band */}
          <circle cx={CX} cy={CY} r={R_MAX * R_BULL} fill="rgba(148,163,184,0.04)" stroke="rgba(148,163,184,0.12)" strokeWidth={1} strokeDasharray="4 4" />
          {/* Bull zone outer */}
          <circle cx={CX} cy={CY} r={R_MAX} fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.15)" strokeWidth={1} />

          {/* Center dot */}
          <circle cx={CX} cy={CY} r={5} fill="#0d6e6e" opacity={0.8} />

          {/* Zone labels */}
          <text x={CX + R_MAX * R_BEAR + 4} y={CY + 3} fill="rgba(239,68,68,0.5)" fontSize="9" fontFamily="Inter,sans-serif">BEAR</text>
          <text x={CX + R_MAX + 4}           y={CY + 3} fill="rgba(34,197,94,0.5)"  fontSize="9" fontFamily="Inter,sans-serif">BULL</text>

          {/* Alert outer amber ring when extremes present */}
          {hasExtreme && (
            <circle
              cx={CX}
              cy={CY}
              r={R_MAX + 12}
              fill="none"
              stroke="rgba(245,158,11,0.4)"
              strokeWidth={3}
              strokeDasharray="8 6"
            />
          )}

          {/* Spokes + dots + labels */}
          {sectors.map((s, i) => {
            const angle     = i * angleStep;
            const outerPt   = polarToXY(angle, R_MAX + 5);
            const labelPt   = polarToXY(angle, R_MAX + 34);
            const dotR      = temperatureToRadius(s.temperature);
            const dotPt     = polarToXY(angle, dotR);
            const isActive  = active?.sector === s.sector;
            const dotColor  = temperatureColor(s.label);
            const isExtreme = s.temperature > 80 || s.temperature < 20;

            // Text anchor
            const lx = labelPt.x;
            const anchor = lx < CX - 20 ? 'end' : lx > CX + 20 ? 'start' : 'middle';

            return (
              <g key={s.sector}>
                {/* Spoke line */}
                <line
                  x1={CX}
                  y1={CY}
                  x2={outerPt.x}
                  y2={outerPt.y}
                  stroke={isActive ? 'rgba(13,110,110,0.6)' : 'rgba(148,163,184,0.15)'}
                  strokeWidth={isActive ? 2 : 1}
                />

                {/* Pulse ring for extremes */}
                {isExtreme && (
                  <circle
                    cx={dotPt.x}
                    cy={dotPt.y}
                    r={16}
                    fill={`${dotColor}18`}
                    stroke={`${dotColor}50`}
                    strokeWidth={1.5}
                  />
                )}

                {/* Temperature dot */}
                <circle
                  cx={dotPt.x}
                  cy={dotPt.y}
                  r={isActive ? 12 : 9}
                  fill={dotColor}
                  stroke={isActive ? '#fff' : 'rgba(255,255,255,0.3)'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  style={{ cursor: 'pointer', transition: 'r 0.2s' }}
                  onClick={() => handleDotClick(s)}
                  role="button"
                  aria-label={`${s.sector}: ${s.temperature}° ${s.label}`}
                />

                {/* Temperature label on dot */}
                <text
                  x={dotPt.x}
                  y={dotPt.y + 4}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="8"
                  fontWeight="700"
                  fontFamily="IBM Plex Mono,monospace"
                  style={{ pointerEvents: 'none' }}
                >
                  {s.temperature}
                </text>

                {/* Sector label at tip */}
                <text
                  x={labelPt.x}
                  y={labelPt.y}
                  textAnchor={anchor}
                  fill={isActive ? '#0d6e6e' : '#cbd5e1'}
                  fontSize="11"
                  fontWeight={isActive ? '700' : '500'}
                  fontFamily="Inter,sans-serif"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDotClick(s)}
                >
                  {s.sector}
                </text>
              </g>
            );
          })}

          {/* Center title */}
          <text x={CX} y={CY - 14} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.08em">
            CONSENSUS
          </text>
          <text x={CX} y={CY + 6} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.08em">
            RADAR
          </text>
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-3 px-2">
          {[
            { color: '#ef4444', label: 'Extreme Bear (<20°)' },
            { color: '#94a3b8', label: 'Mixed (35–65°)' },
            { color: '#22c55e', label: 'Extreme Bull (>80°)' },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Side Panel ── */}
      <div className="flex-1 min-w-0">
        {active ? (
          <div className="bg-[#0f1c2d] border border-[#1e3a5f] rounded-2xl p-6 space-y-5 animate-fade-up">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    background: `${temperatureColor(active.label)}22`,
                    color: temperatureColor(active.label),
                    border: `1px solid ${temperatureColor(active.label)}44`,
                  }}
                >
                  {active.label}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mt-2">{active.sector}</h3>
              <p className="text-slate-400 text-sm mt-1">
                {active.total} pieces of content analysed
              </p>
            </div>

            {/* Temperature gauge */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Bearish</span>
                <span className="font-bold" style={{ color: temperatureColor(active.label) }}>
                  {active.temperature}°
                </span>
                <span>Bullish</span>
              </div>
              <div className="h-3 bg-[#1e293b] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${active.temperature}%`,
                    background: `linear-gradient(90deg, #ef4444, ${temperatureColor(active.label)}, #22c55e)`,
                    backgroundSize: '300% 100%',
                    backgroundPosition: `${100 - active.temperature}% 0`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                <span>Bearish: {active.bearishCount}</span>
                <span>Neutral: {active.total - active.bullishCount - active.bearishCount}</span>
                <span>Bullish: {active.bullishCount}</span>
              </div>
            </div>

            {/* Contrarian signals */}
            {active.contrarian.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
                  ⚡ What is being ignored
                </p>
                <ul className="space-y-2">
                  {active.contrarian.map((sig) => (
                    <li
                      key={sig}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <span className="text-amber-400 mt-0.5 flex-shrink-0">→</span>
                      <span className="capitalize">{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <a
              href={`/tracker/${active.sector.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d6e6e] hover:text-teal-400 transition-colors"
            >
              Read the full sector analysis →
            </a>
          </div>
        ) : (
          <div className="bg-[#0f1c2d] border border-[#1e3a5f] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="text-5xl mb-4">📡</div>
            <p className="text-slate-400 text-sm max-w-xs">
              Click any sector dot on the radar to see the consensus breakdown and contrarian signals.
            </p>
          </div>
        )}

        {/* Sector quick-list */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {sectors.map((s) => {
            const isActive = active?.sector === s.sector;
            const dotColor = temperatureColor(s.label);
            return (
              <button
                key={s.sector}
                onClick={() => handleDotClick(s)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all text-xs"
                style={{
                  background: isActive ? `${dotColor}15` : 'rgba(15,28,45,0.6)',
                  borderColor: isActive ? `${dotColor}50` : '#1e3a5f',
                  color: isActive ? '#e2e8f0' : '#64748b',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: dotColor }}
                />
                <span className="font-medium truncate">{s.sector}</span>
                <span
                  className="ml-auto font-bold font-mono"
                  style={{ color: dotColor }}
                >
                  {s.temperature}°
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
