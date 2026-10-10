'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

/* PGDM Finance Lab — WACC Calculator (CAPM build-up)
   Matches lecture: F06 · Time Value of Money & the Cost of Capital
   Formula: WACC = (E/V)·Re + (D/V)·Rd·(1−t)
   where Re = Rf + β·MRP  [CAPM] */

const inp =
  'w-full bg-surface border border-border rounded-xl px-3.5 py-2.5 text-content-primary text-sm font-mono focus:outline-none focus:border-brand transition-colors';
const lbl = 'text-[11px] font-bold uppercase tracking-widest text-content-muted mb-1.5 block';

function NumField({
  label, value, onChange, step = 0.1, suffix = '%', tooltip,
}: {
  label: string; value: number; onChange: (v: number) => void;
  step?: number; suffix?: string; tooltip?: string;
}) {
  return (
    <div>
      <label className={lbl} title={tooltip}>{label}{tooltip && <span className="ml-1 text-brand cursor-help">ⓘ</span>}</label>
      <div className="relative">
        <input
          type="number" step={step} value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={inp}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted text-xs font-mono">{suffix}</span>
      </div>
    </div>
  );
}

function KpiCard({ label, value, sub, accent = false }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? 'border-brand/30 bg-brand-muted' : 'border-border bg-surface-raised'}`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${accent ? 'text-brand' : 'text-content-muted'}`}>{label}</p>
      <p className={`text-2xl font-mono font-extrabold ${accent ? 'text-content-primary' : 'text-brand'}`}>{value}</p>
      {sub && <p className="text-[11px] text-content-muted font-mono mt-2">{sub}</p>}
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
  const [showFormulas, setShowFormulas] = useState(false);

  const calc = useMemo(() => {
    // CAPM: Re = Rf + β × MRP
    const re = rf + beta * mrp;
    // After-tax cost of debt
    const rdAt = rd * (1 - tax / 100);
    // Capital structure weights (D/E ratio → E=1, D=de, V=1+de)
    const v = 1 + de;
    const wE = 1 / v;
    const wD = de / v;
    // WACC = (E/V)·Re + (D/V)·Rd·(1−t)
    const wacc = wE * re + wD * rdAt;

    // D/E sensitivity sweep
    const dePoints = [0, 0.25, 0.5, 0.75, 1, 1.5, 2];
    const rows = dePoints.map((d) => {
      const vd = 1 + d;
      const w = (1 / vd) * re + (d / vd) * rdAt;
      return { de: d, wacc: w };
    });
    const maxW = Math.max(...rows.map((r) => r.wacc));
    const minW = Math.min(...rows.map((r) => r.wacc));

    // Intrinsic value insight
    let insight = '';
    if (wacc > 15) {
      insight = `High WACC of ${wacc.toFixed(2)}% — this is typical for early-stage or distressed businesses. A higher discount rate means investors demand more return for the perceived risk, compressing valuations. Consider whether β reflects comparable liquid peers.`;
    } else if (wacc < 8) {
      insight = `Low WACC of ${wacc.toFixed(2)}% — typical of investment-grade rated firms or regulated utilities with predictable cash flows. Low cost of capital translates directly into higher DCF valuations.`;
    } else {
      insight = `Balanced WACC of ${wacc.toFixed(2)}% — within the 8–15% institutional range for mid-market Indian corporates. Your equity weight is ${(wE * 100).toFixed(0)}%, supporting a defensible valuation.`;
    }

    return { re, rdAt, wacc, wE, wD, rows, maxW, minW, insight };
  }, [rf, mrp, beta, rd, tax, de]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand bg-brand-muted border border-brand/25 rounded-full px-3 py-1">
          PGDM Finance Lab · F06 Unit 4
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-content-primary">WACC Calculator — CAPM Build-Up</h1>
        <p className="text-sm text-content-muted max-w-xl mx-auto">
          WACC = E/V·R<sub>e</sub> + D/V·R<sub>d</sub>(1−t) where R<sub>e</sub> = R<sub>f</sub> + β·MRP.
          {' '}Companion to{' '}
          <Link href="/pgdm/financial-modeling-valuation/time-value-money-and-wacc" className="text-brand hover:underline">
            TVM &amp; WACC Lecture
          </Link>.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-2 md:grid-cols-3">
        <div className="col-span-full">
          <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-3">Cost of Equity — CAPM Inputs</p>
        </div>
        <NumField label="Risk-free rate (Rf)" value={rf} onChange={setRf}
          tooltip="Yield on long-dated government bond — India 10Y G-Sec as proxy" />
        <NumField label="Market risk premium (MRP)" value={mrp} onChange={setMrp}
          tooltip="Expected market return minus Rf — Damodaran's India ERP ≈ 7–9%" />
        <NumField label="Levered beta (β)" value={beta} onChange={setBeta} step={0.05} suffix="β"
          tooltip="Sensitivity to market — 1.0 = market, >1 = more volatile, <1 = defensive" />
        <div className="col-span-full border-t border-border pt-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-3">Cost of Debt & Capital Structure</p>
        </div>
        <NumField label="Pre-tax cost of debt (Rd)" value={rd} onChange={setRd}
          tooltip="Yield on the company's outstanding bonds or bank loans" />
        <NumField label="Corporate tax rate (t)" value={tax} onChange={setTax}
          tooltip="Effective statutory rate — India base rate 25.17%" />
        <NumField label="Debt / Equity ratio (D/E)" value={de} onChange={setDe} step={0.05} suffix="×"
          tooltip="Total financial debt ÷ market value of equity" />
      </div>

      {/* KPI Outputs */}
      <div className="grid sm:grid-cols-3 gap-4">
        <KpiCard
          label="Cost of Equity · CAPM"
          value={`${calc.re.toFixed(2)}%`}
          sub={`${rf} + ${beta} × ${mrp}`}
        />
        <KpiCard
          label="After-tax Cost of Debt"
          value={`${calc.rdAt.toFixed(2)}%`}
          sub={`${rd}% × (1 − ${tax/100})`}
        />
        <KpiCard
          label="WACC"
          value={`${calc.wacc.toFixed(2)}%`}
          sub={`${(calc.wE * 100).toFixed(0)}% Eq · ${(calc.wD * 100).toFixed(0)}% Dt`}
          accent
        />
      </div>

      {/* Insight box */}
      <div className="rounded-2xl border border-brand/20 bg-brand-muted/40 px-5 py-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2">Analyst Insight</p>
        <p className="text-sm text-content-secondary leading-relaxed">{calc.insight}</p>
      </div>

      {/* D/E sensitivity */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-4">
          D/E Sensitivity — How capital structure moves WACC
        </p>
        <div className="space-y-2.5">
          {calc.rows.map((r) => {
            const w = 6 + ((r.wacc - calc.minW) / ((calc.maxW - calc.minW) || 1)) * 78;
            const active = Math.abs(r.de - de) < 0.01;
            return (
              <div key={r.de} className="flex items-center gap-3">
                <span className={`w-16 text-right text-[11px] font-mono ${active ? 'text-brand font-bold' : 'text-content-muted'}`}>
                  {r.de.toFixed(2)}×
                </span>
                <div className="flex-1 h-5 rounded-lg bg-surface-muted border border-border overflow-hidden">
                  <div
                    className={`h-full rounded-lg transition-all duration-300 ${active ? 'bg-gradient-to-r from-teal-500 to-emerald-400' : 'bg-surface-muted'}`}
                    style={{ width: `${w}%` }}
                  />
                </div>
                <span className={`w-16 text-[11px] font-mono ${active ? 'text-brand font-bold' : 'text-content-muted'}`}>
                  {r.wacc.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-content-muted mt-4 leading-relaxed">
          More debt reduces WACC (tax shield benefit) until distress risk reprices R<sub>d</sub> upward.
          Indian corporate sweet spot is D/E 0.25–1.0×.
        </p>
      </div>

      {/* Formula Reference Toggle */}
      <div className="rounded-2xl border border-border bg-surface p-5">
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-content-muted hover:text-brand transition-colors"
        >
          <span className={`transition-transform duration-200 ${showFormulas ? 'rotate-90' : ''}`}>▶</span>
          Formula Reference &amp; Exam Notes
        </button>
        {showFormulas && (
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {[
              { label: 'CAPM — Cost of Equity', formula: 'Rₑ = Rf + β × MRP', note: 'β > 1 → more systematic risk than market' },
              { label: 'After-tax Cost of Debt', formula: 'Rd(1−t)', note: 'Interest is tax-deductible — shields earnings' },
              { label: 'WACC Formula', formula: 'WACC = (E/V)·Rₑ + (D/V)·Rd·(1−t)', note: 'V = E + D at market values' },
              { label: 'Unlevered Beta', formula: 'βu = βL / [1 + (1−t)·D/E]', note: 'Strip leverage to compare across firms (Hamada equation)' },
            ].map(f => (
              <div key={f.label} className="rounded-xl bg-surface-muted border border-border p-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-content-muted">{f.label}</p>
                <p className="text-sm font-mono font-bold text-brand mt-1">{f.formula}</p>
                <p className="text-[11px] text-content-secondary mt-2">{f.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
