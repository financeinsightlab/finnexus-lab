'use client';

import { useState } from 'react';
import Link from 'next/link';

/* PGDM Finance Lab — Portfolio Risk & Return Lab (two-asset Markowitz)
   Matches lecture: F04 · Risk & Return Foundations */

const inp =
  'w-full bg-surface border border-input rounded-xl px-3.5 py-2.5 text-content-primary text-sm font-mono focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-colors';
const lbl = 'text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block';

function portfolioStats(w1: number, e1: number, e2: number, s1: number, s2: number, rho: number) {
  const w2 = 1 - w1;
  const er = w1 * e1 + w2 * e2;
  const varp = w1 * w1 * s1 * s1 + w2 * w2 * s2 * s2 + 2 * w1 * w2 * rho * s1 * s2;
  return { er, sp: Math.sqrt(Math.max(varp, 0)), w2 };
}

export default function PortfolioRiskCalc() {
  const [e1, setE1] = useState(14);
  const [s1, setS1] = useState(20);
  const [e2, setE2] = useState(8);
  const [s2, setS2] = useState(6);
  const [rho, setRho] = useState(0.2);
  const [w1, setW1] = useState(60); // % in asset A

  const wf = w1 / 100;
  const { er, sp, w2 } = portfolioStats(wf, e1, e2, s1, s2, rho);
  const naive = wf * s1 + w2 * s2;
  const saving = naive - sp;

  const sweep = Array.from({ length: 11 }, (_, i) => i / 10).map((x) => portfolioStats(x, e1, e2, s1, s2, rho));
  const maxEr = Math.max(e1, e2);
  const maxSp = Math.max(...sweep.map((p) => p.sp));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-teal-300 bg-teal-500/10 border border-teal-500/25 rounded-full px-3 py-1">
          PGDM Finance Lab · F04 Unit 3
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-content-primary">Portfolio Risk & Return Lab</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Two-asset Markowitz engine from{' '}
          <Link href="/pgdm/security-analysis-portfolio-management/risk-return-foundations" className="text-teal-300 hover:underline">
            Risk & Return Foundations
          </Link>
          . Drag the sliders and watch the free lunch appear.
        </p>
      </div>

      {/* inputs */}
      <div className="grid sm:grid-cols-2 gap-5 rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5">
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300">Asset A — Equity fund</p>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>E[R] %</label><input type="number" step={0.5} value={e1} onChange={(e) => setE1(parseFloat(e.target.value))} className={inp} /></div>
            <div><label className={lbl}>σ %</label><input type="number" step={0.5} value={s1} onChange={(e) => setS1(parseFloat(e.target.value))} className={inp} /></div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Asset B — Debt fund</p>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>E[R] %</label><input type="number" step={0.5} value={e2} onChange={(e) => setE2(parseFloat(e.target.value))} className={inp} /></div>
            <div><label className={lbl}>σ %</label><input type="number" step={0.5} value={s2} onChange={(e) => setS2(parseFloat(e.target.value))} className={inp} /></div>
          </div>
        </div>

        <div>
          <label className={lbl}>Correlation ρ (A,B) — <span className="text-teal-300 font-mono">{rho.toFixed(2)}</span></label>
          <input type="range" min={-1} max={1} step={0.05} value={rho} onChange={(e) => setRho(parseFloat(e.target.value))} className="w-full accent-teal-400" />
          <div className="flex justify-between text-[10px] text-gray-500 font-mono"><span>−1 hedge</span><span>0</span><span>+1 no benefit</span></div>
        </div>
        <div>
          <label className={lbl}>Weight in A — <span className="text-teal-300 font-mono">{w1}% / {100 - w1}%</span></label>
          <input type="range" min={0} max={100} step={5} value={w1} onChange={(e) => setW1(parseInt(e.target.value))} className="w-full accent-teal-400" />
          <div className="flex justify-between text-[10px] text-gray-500 font-mono"><span>all B</span><span>50/50</span><span>all A</span></div>
        </div>
      </div>

      {/* outputs */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-cinema-graphite/70 p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Portfolio E[R]</p>
          <p className="text-2xl font-mono font-bold text-teal-300">{er.toFixed(2)}%</p>
          <p className="text-[11px] text-gray-500 font-mono mt-2">{w1}%×{e1} + {100 - w1}%×{e2}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-cinema-graphite/70 p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Portfolio σ</p>
          <p className="text-2xl font-mono font-bold text-violet-300">{sp.toFixed(2)}%</p>
          <p className="text-[11px] text-gray-500 font-mono mt-2">naive average would be {naive.toFixed(2)}%</p>
        </div>
        <div className={`rounded-2xl border p-5 ${saving > 0.05 ? 'border-success/30 bg-success-muted' : 'border-white/10 bg-cinema-graphite/70'}`}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-1">Diversification saving</p>
          <p className="text-2xl font-mono font-bold text-emerald-300">{saving.toFixed(2)} pts</p>
          <p className="text-[11px] text-gray-500 mt-2">{saving > 0.05 ? 'risk removed at zero return cost — the free lunch' : 'no benefit at ρ = 1'}</p>
        </div>
      </div>

      {/* frontier sweep */}
      <div className="rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
          The frontier — σ as you sweep weight A from 0% → 100% (ρ = {rho.toFixed(2)})
        </p>
        <div className="relative h-44 rounded-xl bg-surface-muted border border-border overflow-hidden">
          {/* axes */}
          <div className="absolute inset-4">
            {sweep.map((p, i) => {
              const x = 24 + (p.sp / (maxSp || 1)) * 66;
              const y = 78 - (p.er / (maxEr || 1)) * 62;
              const isCur = Math.abs(p.w2 - wf) < 0.05;
              return (
                <div
                  key={i}
                  className={`absolute rounded-full transition-all duration-300 ${isCur ? 'w-3.5 h-3.5 bg-teal-400 shadow-[0_0_14px_rgba(45,212,191,0.8)] -translate-x-1/2 -translate-y-1/2 z-10' : 'w-2 h-2 bg-content-muted/50 -translate-x-1/2 -translate-y-1/2'}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={`${Math.round(p.w2 * 100)}% A → σ ${p.sp.toFixed(1)}%, E[R] ${p.er.toFixed(1)}%`}
                />
              );
            })}
            <span className="absolute left-0 bottom-0 text-[9px] font-mono text-gray-600">← σ low</span>
            <span className="absolute right-0 bottom-0 text-[9px] font-mono text-gray-600">σ high →</span>
            <span className="absolute left-0 top-0 text-[9px] font-mono text-gray-600">E[R] high</span>
          </div>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-4">
          {sweep.filter((_, i) => i % 2 === 0).map((p, i) => (
            <div key={i} className="rounded-lg bg-surface border border-border px-2 py-1.5 text-center">
              <p className="text-[10px] font-mono text-gray-500">{Math.round(p.w2 * 100)}% A</p>
              <p className="text-[11px] font-mono text-gray-300">σ {p.sp.toFixed(1)}</p>
              <p className="text-[10px] font-mono text-brand">R {p.er.toFixed(1)}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
          Drop ρ toward −1 and watch the curve bend left — same returns, less risk. That bend IS Markowitz (F04 Unit 4).
        </p>
      </div>
    </div>
  );
}
