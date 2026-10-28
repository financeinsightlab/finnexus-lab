'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { runPortfolio, portfolioStats as engineStats, parsePortfolioInputs, portfolioInputsToQuery, PORTFOLIO_DEFAULTS, type TwoAssetInputs } from '@/lib/finance/portfolio';

/* PGDM Finance Lab — Portfolio Risk & Return Lab (two-asset Markowitz)
   Matches lecture: F04 · Risk & Return Foundations
   
   Portfolio return:  E[Rp] = w₁·E[R₁] + w₂·E[R₂]
   Portfolio variance: σ²p = w₁²σ₁² + w₂²σ₂² + 2·w₁·w₂·ρ·σ₁·σ₂
   Sharpe ratio:      S = (E[Rp] − Rf) / σp
*/

const inp =
  'w-full bg-surface border border-border rounded-xl px-3.5 py-2.5 text-content-primary text-sm font-mono focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-colors';
const lbl = 'text-[11px] font-bold uppercase tracking-widest text-content-muted mb-1.5 block';

export default function PortfolioRiskCalc() {
  const [e1, setE1] = useState(14);
  const [s1, setS1] = useState(20);
  const [e2, setE2] = useState(8);
  const [s2, setS2] = useState(6);
  const [rho, setRho] = useState(0.2);
  const [w1, setW1] = useState(60); // % in Asset A
  const [rf, setRf] = useState(6.5); // risk-free rate for Sharpe

  const wf = w1 / 100;

  // Engine (lib/finance/portfolio.ts) — maths is scale-invariant, % units pass through.
  const engineInputs: TwoAssetInputs = { expectedReturn1: e1, sigma1: s1, expectedReturn2: e2, sigma2: s2, correlation: rho, riskFreeRate: rf };
  const engine = useMemo(() => runPortfolio(engineInputs), [e1, s1, e2, s2, rho, rf]);
  const cur = useMemo(() => engineStats(wf, engineInputs), [wf, e1, s1, e2, s2, rho, rf]);
  const er = cur.expectedReturn; const sp = cur.sigma; const w2 = 1 - wf;
  const naive = wf * s1 + w2 * s2;
  const saving = naive - sp;
  const sharpe = cur.sharpe ?? 0;
  const mvpW = engine.minimumVariance?.weight1 ?? 0.5;
  const mvpEr = engine.minimumVariance?.expectedReturn ?? 0;
  const mvpSp = engine.minimumVariance?.sigma ?? 0;
  const sweep = engine.frontier.map((pt) => ({ er: pt.expectedReturn, sp: pt.sigma, w2: 1 - pt.weight1 }));

  // Persistence (autosave + share links).
  const AUTOSAVE_KEY = 'ka_portfolio_autosave_v1';
  const applyInputs = (i: TwoAssetInputs) => { setE1(i.expectedReturn1); setS1(i.sigma1); setE2(i.expectedReturn2); setS2(i.sigma2); setRho(i.correlation); setRf(i.riskFreeRate); };
  useEffect(() => {
    try {
      let base = PORTFOLIO_DEFAULTS;
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) base = parsePortfolioInputs(JSON.parse(saved));
      const params = new URLSearchParams(window.location.search);
      if ([...params.keys()].length > 0) base = parsePortfolioInputs(Object.fromEntries(params.entries()), base);
      applyInputs(base);
    } catch { /* keep defaults */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try { localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(engineInputs)); } catch { /* private mode */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [e1, s1, e2, s2, rho, rf]);
  const [linkCopied, setLinkCopied] = useState(false);
  const copyShareLink = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${portfolioInputsToQuery(engineInputs)}`); } catch { /* blocked */ }
    setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000);
  };

  const maxEr = Math.max(e1, e2);
  const maxSp = Math.max(...sweep.map((p) => p.sp));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand bg-brand-muted border border-brand/25 rounded-full px-3 py-1">
          PGDM Finance Lab · F04 Unit 3
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-content-primary">Portfolio Risk &amp; Return Lab</h1>
        <p className="text-sm text-content-muted max-w-xl mx-auto">
          Two-asset Markowitz engine from{' '}
          <Link href="/pgdm/security-analysis-portfolio-management/risk-return-foundations" className="text-brand hover:underline">
            Risk &amp; Return Foundations
          </Link>
          . Drag the sliders and watch the diversification free lunch appear.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-5 rounded-2xl border border-border bg-surface p-5">
        {/* Asset A */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Asset A — Equity Fund</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>E[R] %</label>
              <input type="number" step={0.5} value={e1} onChange={(e) => setE1(parseFloat(e.target.value))} className={inp} />
            </div>
            <div>
              <label className={lbl}>σ (Std Dev) %</label>
              <input type="number" step={0.5} value={s1} onChange={(e) => setS1(parseFloat(e.target.value))} className={inp} />
            </div>
          </div>
        </div>

        {/* Asset B */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-warning">Asset B — Debt Fund</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>E[R] %</label>
              <input type="number" step={0.5} value={e2} onChange={(e) => setE2(parseFloat(e.target.value))} className={inp} />
            </div>
            <div>
              <label className={lbl}>σ (Std Dev) %</label>
              <input type="number" step={0.5} value={s2} onChange={(e) => setS2(parseFloat(e.target.value))} className={inp} />
            </div>
          </div>
        </div>

        {/* Correlation slider */}
        <div>
          <label className={lbl}>
            Correlation ρ (A, B) —{' '}
            <span className="text-brand font-mono">{rho.toFixed(2)}</span>
          </label>
          <input
            type="range" min={-1} max={1} step={0.05} value={rho}
            onChange={(e) => setRho(parseFloat(e.target.value))}
            className="w-full accent-brand"
          />
          <div className="flex justify-between text-[10px] text-content-muted font-mono mt-1">
            <span>−1 perfect hedge</span>
            <span>0 uncorrelated</span>
            <span>+1 no benefit</span>
          </div>
        </div>

        {/* Weight slider */}
        <div>
          <label className={lbl}>
            Weight in A —{' '}
            <span className="text-brand font-mono">{w1}% / {100 - w1}%</span>
          </label>
          <input
            type="range" min={0} max={100} step={5} value={w1}
            onChange={(e) => setW1(parseInt(e.target.value))}
            className="w-full accent-brand"
          />
          <div className="flex justify-between text-[10px] text-content-muted font-mono mt-1">
            <span>all B</span>
            <span>50/50</span>
            <span>all A</span>
          </div>
        </div>

        {/* Risk-free rate */}
        <div>
          <label className={lbl}>Risk-free rate (for Sharpe) %</label>
          <input type="number" step={0.1} value={rf} onChange={(e) => setRf(parseFloat(e.target.value))} className={inp} />
        </div>
      </div>

      {/* KPI outputs */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-surface-raised p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-1">Portfolio E[R]</p>
          <p className="text-2xl font-mono font-bold text-brand">{er.toFixed(2)}%</p>
          <p className="text-[11px] text-content-muted font-mono mt-2">{w1}%×{e1} + {100-w1}%×{e2}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-raised p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-1">Portfolio σ</p>
          <p className="text-2xl font-mono font-bold text-accent-violet">{sp.toFixed(2)}%</p>
          <p className="text-[11px] text-content-muted font-mono mt-2">naive avg: {naive.toFixed(2)}%</p>
        </div>
        <div className={`rounded-2xl border p-5 ${saving > 0.05 ? 'border-success/30 bg-success-muted' : 'border-border bg-surface-raised'}`}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-1">Risk Saving</p>
          <p className="text-2xl font-mono font-bold text-success">{saving.toFixed(2)} pp</p>
          <p className="text-[11px] text-content-muted mt-2">
            {saving > 0.05 ? 'free lunch via diversification' : 'no benefit at ρ = 1'}
          </p>
        </div>
        <div className="rounded-2xl border border-brand/30 bg-brand-muted p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-1">Sharpe Ratio</p>
          <p className="text-2xl font-mono font-bold text-content-primary">{sharpe.toFixed(3)}</p>
          <p className="text-[11px] text-content-muted font-mono mt-2">(E[R]−Rf) / σ</p>
        </div>
      </div>

      {/* MVP info */}
      <div className="rounded-2xl border border-warning/30 bg-warning-muted/40 p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-warning mb-2">
          Minimum Variance Portfolio (MVP)
        </p>
        <p className="text-sm text-content-secondary">
          Optimal weight in A: <strong className="font-mono text-brand">{(mvpW * 100).toFixed(1)}%</strong>
          {' '}gives the lowest possible σ of{' '}
          <strong className="font-mono text-brand">{mvpSp.toFixed(2)}%</strong>
          {' '}with E[R] = <strong className="font-mono">{mvpEr.toFixed(2)}%</strong>.
          {' '}Move the Weight slider to {Math.round(mvpW * 100)}% to verify.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={copyShareLink} className="text-xs font-bold px-4 py-2 rounded-xl border border-border bg-surface-raised hover:border-brand transition-colors text-content-primary">{linkCopied ? '✓ Link Copied' : '🔗 Copy Share Link'}</button>
        <span className="text-xs text-content-muted">Inputs autosave locally</span>
      </div>
      {engine.errors.length > 0 && (
        <div role="alert" className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/40 p-4 text-sm text-red-800 dark:text-red-200"><ul className="list-disc pl-5">{engine.errors.map((e) => <li key={e}>{e}</li>)}</ul></div>
      )}
      {engine.warnings.length > 0 && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-900 dark:text-amber-200"><ul className="list-disc pl-5">{engine.warnings.map((w) => <li key={w}>{w}</li>)}</ul></div>
      )}
      {engine.tangency && (
        <div className="rounded-2xl border border-brand/30 bg-brand-muted p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2">Tangency Portfolio (Maximum Sharpe) — new</p>
          <p className="text-sm text-content-secondary">
            Weight in A: <strong className="font-mono text-brand">{(engine.tangency.weight1 * 100).toFixed(1)}%</strong>
            {' '}· E[R] = <strong className="font-mono">{engine.tangency.expectedReturn.toFixed(2)}%</strong>
            {' '}· σ = <strong className="font-mono">{engine.tangency.sigma.toFixed(2)}%</strong>
            {' '}· Sharpe = <strong className="font-mono">{engine.tangency.sharpe !== null ? engine.tangency.sharpe.toFixed(3) : 'n.m.'}</strong>.
            This is the portfolio the Capital Market Line is tangent to — every mean-variance investor holds it plus cash.
          </p>
        </div>
      )}

      {/* Efficient frontier scatter */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-4">
          Efficient Frontier — σ vs E[R] as weight A sweeps 0% → 100% (ρ = {rho.toFixed(2)})
        </p>
        <div className="relative h-48 rounded-xl bg-surface-muted border border-border overflow-hidden">
          <div className="absolute inset-4">
            {sweep.map((p, i) => {
              const x = 4 + (p.sp / (maxSp || 1)) * 88;
              const y = 88 - (p.er / (maxEr || 1)) * 80;
              const wInA = i / 20;
              const isCur = Math.abs(wInA - wf) < 0.03;
              const isMvp = Math.abs(wInA - mvpW) < 0.03;
              return (
                <div
                  key={i}
                  className={`absolute rounded-full transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
                    isCur
                      ? 'w-4 h-4 bg-brand shadow-[0_0_14px_rgba(0,128,128,0.8)] z-10'
                      : isMvp
                      ? 'w-3 h-3 bg-warning z-10'
                      : 'w-2 h-2 bg-content-muted/40'
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={`${Math.round(wInA * 100)}% A → σ ${p.sp.toFixed(1)}%, E[R] ${p.er.toFixed(1)}%`}
                />
              );
            })}
            <span className="absolute left-0 bottom-0 text-[9px] font-mono text-content-muted">← σ low</span>
            <span className="absolute right-0 bottom-0 text-[9px] font-mono text-content-muted">σ high →</span>
            <span className="absolute left-0 top-0 text-[9px] font-mono text-content-muted">E[R] high ↑</span>
          </div>
        </div>
        <div className="flex gap-4 mt-3 text-[10px] font-mono text-content-muted">
          <span><span className="inline-block w-3 h-3 rounded-full bg-brand mr-1 align-middle"></span>Your mix</span>
          <span><span className="inline-block w-3 h-3 rounded-full bg-warning mr-1 align-middle"></span>MVP</span>
        </div>
        <p className="text-[11px] text-content-muted mt-3 leading-relaxed">
          Drop ρ toward −1 and watch the curve bend left — same returns, less risk.
          That bend IS Markowitz (F04 Unit 4).
        </p>
      </div>

      {/* Data table */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-3">Frontier data grid</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {sweep.filter((_, i) => i % 4 === 0).map((p, i) => {
            const wInA = (i * 4) / 20;
            const isCur = Math.abs(wInA - wf) < 0.03;
            return (
              <div key={i} className={`rounded-lg border px-2 py-1.5 text-center ${isCur ? 'bg-brand-muted border-brand/30' : 'bg-surface border-border'}`}>
                <p className="text-[10px] font-mono text-content-muted">{Math.round(wInA * 100)}% A</p>
                <p className={`text-[11px] font-mono font-bold ${isCur ? 'text-brand' : 'text-content-secondary'}`}>σ {p.sp.toFixed(1)}</p>
                <p className="text-[10px] font-mono text-brand">R {p.er.toFixed(1)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
