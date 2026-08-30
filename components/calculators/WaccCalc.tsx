'use client';

import { useState } from 'react';
import Link from 'next/link';

/* PGDM Finance Lab — WACC Calculator (CAPM build-up)
   Matches lecture: F06 · Time Value of Money & the Cost of Capital */

const inp =
  'w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-teal-500/50 transition-colors';
const lbl = 'text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block';

function NumField({
  label, value, onChange, step = 0.1, suffix = '%',
}: { label: string; value: number; onChange: (v: number) => void; step?: number; suffix?: string }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <div className="relative">
        <input
          type="number" step={step} value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={inp}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">{suffix}</span>
      </div>
    </div>
  );
}

export default function WaccCalc() {
  const [rf, setRf] = useState(6.8);
  const [mrp, setMrp] = useState(8);
  const [beta, setBeta] = useState(1.2);
  const [rd, setRd] = useState(9.5);
  const [tax, setTax] = useState(25);
  const [de, setDe] = useState(0.5); // D/E ratio

  const re = rf + beta * mrp;
  const rdAt = rd * (1 - tax / 100);
  const ev = 1 + de; // E=1
  const wE = 1 / ev;
  const wD = de / ev;
  const wacc = wE * re + wD * rdAt;

  const rows = [0, 0.25, 0.5, 1, 1.5, 2].map((d) => {
    const w = (1 / (1 + d)) * re + (d / (1 + d)) * rdAt;
    return { de: d, wacc: w };
  });
  const maxW = Math.max(...rows.map((r) => r.wacc));
  const minW = Math.min(...rows.map((r) => r.wacc));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-teal-300 bg-teal-500/10 border border-teal-500/25 rounded-full px-3 py-1">
          PGDM Finance Lab · F06 Unit 4
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">WACC Calculator — CAPM Build-Up</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          WACC = E/V·R<sub>e</sub> + D/V·R<sub>d</sub>(1−t). Every input is live — relive Lecture 3 of{' '}
          <Link href="/pgdm/financial-modeling-valuation/time-value-money-and-wacc" className="text-teal-300 hover:underline">
            TVM & WACC
          </Link>.
        </p>
      </div>

      {/* inputs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5">
        <NumField label="Risk-free rate (Rf)" value={rf} onChange={setRf} />
        <NumField label="Market risk premium" value={mrp} onChange={setMrp} />
        <NumField label="Levered beta (β)" value={beta} onChange={setBeta} step={0.05} suffix="β" />
        <NumField label="Cost of debt (Rd)" value={rd} onChange={setRd} />
        <NumField label="Tax rate (t)" value={tax} onChange={setTax} />
        <NumField label="Debt / Equity (D/E)" value={de} onChange={setDe} step={0.05} suffix="×" />
      </div>

      {/* outputs */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-cinema-graphite/70 p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Cost of Equity · CAPM</p>
          <p className="text-2xl font-mono font-bold text-teal-300">{re.toFixed(2)}%</p>
          <p className="text-[11px] text-gray-500 font-mono mt-2">{rf} + {beta} × {mrp}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-cinema-graphite/70 p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">After-tax Cost of Debt</p>
          <p className="text-2xl font-mono font-bold text-amber-300">{rdAt.toFixed(2)}%</p>
          <p className="text-[11px] text-gray-500 font-mono mt-2">{rd} × (1 − {tax /100})</p>
        </div>
        <div className="rounded-2xl border border-teal-500/30 bg-teal-500/[0.07] p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300 mb-1">WACC</p>
          <p className="text-3xl font-mono font-extrabold text-white">{wacc.toFixed(2)}%</p>
          <p className="text-[11px] text-gray-500 font-mono mt-2">
            {(wE * 100).toFixed(0)}% Eq · {(wD * 100).toFixed(0)}% Dt
          </p>
        </div>
      </div>

      {/* D/E sensitivity */}
      <div className="rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
          How capital structure moves WACC (sweep D/E)
        </p>
        <div className="space-y-2.5">
          {rows.map((r) => {
            const w = 6 + ((r.wacc - minW) / (maxW - minW || 1)) * 78;
            const active = Math.abs(r.de - de) < 0.01;
            return (
              <div key={r.de} className="flex items-center gap-3">
                <span className={`w-16 text-right text-[11px] font-mono ${active ? 'text-teal-300 font-bold' : 'text-gray-500'}`}>
                  {r.de.toFixed(2)}×
                </span>
                <div className="flex-1 h-5 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-lg transition-all duration-300 ${active ? 'bg-gradient-to-r from-teal-500 to-emerald-400' : 'bg-white/15'}`}
                    style={{ width: `${w}%` }}
                  />
                </div>
                <span className={`w-16 text-[11px] font-mono ${active ? 'text-teal-300 font-bold' : 'text-gray-500'}`}>
                  {r.wacc.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
          More debt dilutes expensive equity — until distress risk reprices Rd. The happy zone for most
          Indian corporates is D/E 0.25–1.0×.
        </p>
      </div>
    </div>
  );
}
