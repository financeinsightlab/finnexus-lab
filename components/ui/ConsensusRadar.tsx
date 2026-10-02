'use client';

import { useState, useRef, useCallback } from 'react';
import type { SectorConsensus } from '@/lib/sentimentEngine';

// ─── SVG geometry helpers ─────────────────────────────────────────────────────

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

function temperatureColor(label: string): string {
  if (label.startsWith('EXTREME BULL') || label.startsWith('CONSENSUS BULL')) {
    return 'hsl(var(--success))';
  }
  if (label.startsWith('EXTREME BEAR') || label.startsWith('CONSENSUS BEAR')) {
    return 'hsl(var(--error))';
  }
  return 'hsl(var(--content-muted))';
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
      <div className="relative w-full max-w-[560px] min-w-0 flex-shrink-0">
        <svg
          ref={svgRef}
          viewBox="0 0 600 600"
          width="100%"
          role="group"
          aria-label="Contrarian Signal Radar. Activate a sector marker to view details."
        >
          {/* Background */}
          <circle cx={CX} cy={CY} r={R_MAX + 30} fill="hsl(var(--surface-muted))" />

          {/* Concentric zone rings */}
          {/* Bear zone */}
          <circle cx={CX} cy={CY} r={R_MAX * R_BEAR} fill="hsl(var(--error) / 0.06)" stroke="hsl(var(--error) / 0.2)" strokeWidth={1} />
          {/* Neutral band */}
          <circle cx={CX} cy={CY} r={R_MAX * R_BULL} fill="hsl(var(--content-muted) / 0.04)" stroke="hsl(var(--border-strong) / 0.5)" strokeWidth={1} strokeDasharray="4 4" />
          {/* Bull zone outer */}
          <circle cx={CX} cy={CY} r={R_MAX} fill="hsl(var(--success) / 0.05)" stroke="hsl(var(--success) / 0.2)" strokeWidth={1} />

          {/* Center dot */}
          <circle cx={CX} cy={CY} r={5} fill="hsl(var(--brand))" opacity={0.8} />

          {/* Zone labels */}
          <text x={CX + R_MAX * R_BEAR + 4} y={CY + 3} fill="hsl(var(--error) / 0.78)" fontSize="9" fontFamily="Inter,sans-serif">BEAR</text>
          <text x={CX + R_MAX + 4}           y={CY + 3} fill="hsl(var(--success) / 0.78)"  fontSize="9" fontFamily="Inter,sans-serif">BULL</text>

          {/* Alert outer amber ring when extremes present */}
          {hasExtreme && (
            <circle
              cx={CX}
              cy={CY}
              r={R_MAX + 12}
              fill="none"
              stroke="hsl(var(--warning) / 0.55)"
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
                  stroke={isActive ? 'hsl(var(--brand) / 0.72)' : 'hsl(var(--border-strong) / 0.5)'}
                  strokeWidth={isActive ? 2 : 1}
                />

                {/* Pulse ring for extremes */}
                {isExtreme && (
                  <circle
                    cx={dotPt.x}
                    cy={dotPt.y}
                    r={16}
                    fill={dotColor}
                    fillOpacity={0.13}
                    stroke={dotColor}
                    strokeOpacity={0.42}
                    strokeWidth={1.5}
                  />
                )}

                {/* Temperature dot */}
                <circle
                  cx={dotPt.x}
                  cy={dotPt.y}
                  r={isActive ? 12 : 9}
                  fill={dotColor}
                  stroke={isActive ? 'hsl(var(--surface))' : 'hsl(var(--border-strong))'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  style={{ cursor: 'pointer', transition: 'r 0.2s' }}
                  onClick={() => handleDotClick(s)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleDotClick(s);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${s.sector}: ${s.temperature}° ${s.label}`}
                />

                {/* Temperature label on dot */}
                <text
                  x={dotPt.x}
                  y={dotPt.y + 4}
                  textAnchor="middle"
                  fill="hsl(var(--content-inverse))"
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
                  fill={isActive ? 'hsl(var(--brand))' : 'hsl(var(--content-secondary))'}
                  fontSize="11"
                  fontWeight={isActive ? '700' : '500'}
                  fontFamily="Inter,sans-serif"
                >
                  {s.sector}
                </text>
              </g>
            );
          })}

          {/* Center title */}
          <text x={CX} y={CY - 14} textAnchor="middle" fill="hsl(var(--content-muted))" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.08em">
            CONSENSUS
          </text>
          <text x={CX} y={CY + 6} textAnchor="middle" fill="hsl(var(--content-muted))" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="0.08em">
            RADAR
          </text>
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 px-2">
          {[
            { color: 'hsl(var(--error))', label: 'Extreme Bear (<20°)' },
            { color: 'hsl(var(--content-muted))', label: 'Mixed (35–65°)' },
            { color: 'hsl(var(--success))', label: 'Extreme Bull (>80°)' },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-[10px] text-content-muted">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Side Panel ── */}
      <div className="flex-1 min-w-0">
        {active ? (
          <div className="bg-surface-raised border border-border rounded-2xl p-6 space-y-5 animate-fade-up">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    background: 'hsl(var(--accent-muted))',
                    color: temperatureColor(active.label),
                    border: '1px solid hsl(var(--border))',
                  }}
                >
                  {active.label}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-content-primary mt-2">{active.sector}</h3>
              <p className="text-content-muted text-sm mt-1">
                {active.total} pieces of content analysed
              </p>
            </div>

            {/* Temperature gauge */}
            <div>
              <div className="flex justify-between text-xs text-content-muted mb-1.5">
                <span>Bearish</span>
                <span className="font-bold" style={{ color: temperatureColor(active.label) }}>
                  {active.temperature}°
                </span>
                <span>Bullish</span>
              </div>
              <div className="h-3 bg-surface-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${active.temperature}%`,
                    background: `linear-gradient(90deg, hsl(var(--error)), ${temperatureColor(active.label)}, hsl(var(--success)))`,
                    backgroundSize: '300% 100%',
                    backgroundPosition: `${100 - active.temperature}% 0`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-content-muted mt-1">
                <span>Bearish: {active.bearishCount}</span>
                <span>Neutral: {active.total - active.bullishCount - active.bearishCount}</span>
                <span>Bullish: {active.bullishCount}</span>
              </div>
            </div>

            {/* Contrarian signals */}
            {active.contrarian.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-warning mb-3">
                  ⚡ What is being ignored
                </p>
                <ul className="space-y-2">
                  {active.contrarian.map((sig) => (
                    <li
                      key={sig}
                      className="flex items-start gap-2 text-sm text-content-secondary"
                    >
                      <span className="text-warning mt-0.5 flex-shrink-0">→</span>
                      <span className="capitalize">{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <a
              href={`/tracker/${active.sector.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover transition-colors"
            >
              Read the full sector analysis →
            </a>
          </div>
        ) : (
          <div className="bg-surface-raised border border-border rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="text-5xl mb-4">📡</div>
            <p className="text-content-muted text-sm max-w-xs">
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
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all text-xs ${isActive
                  ? 'border-brand/40 bg-brand-muted text-content-primary'
                  : 'border-border bg-surface-muted text-content-secondary hover:bg-accent'
                }`}
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
