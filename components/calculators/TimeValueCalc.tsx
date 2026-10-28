'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { computeEmi, computePvFv, gordonValue } from '@/lib/finance/tvm';

/* PGDM Finance Lab — Time-Value Machine
   Matches lecture: F06 · Time Value of Money & WACC
   Modes: EMI (annuity), PV, FV, Growing Perpetuity (Gordon) */

type Mode = 'emi' | 'pv' | 'fv' | 'gordon';

const MODES: { id: Mode; label: string; formula: string }[] = [
  { id: 'emi', label: 'Loan EMI', formula: 'EMI = P·r·(1+r)ⁿ / [(1+r)ⁿ−1]' },
  { id: 'pv', label: 'Present Value', formula: 'PV = CF / (1+r)ⁿ' },
  { id: 'fv', label: 'Future Value', formula: 'FV = PV × (1+r)ⁿ' },
  { id: 'gordon', label: 'Growing Perpetuity', formula: 'V = C₁ / (r−g)' },
];

const inp =
  'w-full bg-surface border border-border rounded-xl px-3.5 py-2.5 text-content-primary text-sm font-mono focus:outline-none focus:border-brand transition-colors';
const lbl = 'text-[11px] font-bold uppercase tracking-widest text-content-muted mb-1.5 block';

function Field({
  label, value, onChange, step = 1, suffix,
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
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted text-xs font-mono">{suffix}</span>}
      </div>
    </div>
  );
}

const inr = (v: number) =>
  v >= 1e7 ? `₹${(v / 1e7).toFixed(2)} cr`
  : v >= 1e5 ? `₹${(v / 1e5).toFixed(2)} lakh`
  : `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

function ResultCard({ label, value, sub, highlight = false }: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${highlight ? 'border-brand/30 bg-brand-muted' : 'border-border bg-surface-raised'}`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${highlight ? 'text-brand' : 'text-content-muted'}`}>{label}</p>
      <p className={`text-2xl font-mono font-extrabold ${highlight ? 'text-content-primary' : 'text-content-primary'}`}>{value}</p>
      {sub && <p className="text-[11px] text-content-muted font-mono mt-2">{sub}</p>}
    </div>
  );
}

export default function TimeValueCalc() {
  const [mode, setMode] = useState<Mode>('emi');

  // EMI inputs
  const [principal, setPrincipal] = useState(5000000);
  const [annualRate, setAnnualRate] = useState(9);
  const [years, setYears] = useState(20);

  // PV/FV inputs
  const [cash, setCash] = useState(1000000);
  const [discRate, setDiscRate] = useState(13);
  const [periods, setPeriods] = useState(4);

  // Gordon inputs
  const [c1, setC1] = useState(128.1);
  const [waccG, setWaccG] = useState(12);
  const [g, setG] = useState(5);

  // Persistence across all four modes (autosave + share links).
  const AUTOSAVE_KEY = 'ka_tvm_autosave_v1';
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      const fromUrl = new URLSearchParams(window.location.search);
      const read = (k: string): number | null => {
        const rawU = fromUrl.get(k); const nU = rawU !== null ? Number(rawU) : NaN;
        if (Number.isFinite(nU)) return nU;
        if (saved) { const v = (JSON.parse(saved) as Record<string, number>)[k]; if (Number.isFinite(v)) return v; }
        return null;
      };
      const p0 = read('principal'); if (p0 !== null) setPrincipal(p0);
      const a0 = read('annualRate'); if (a0 !== null) setAnnualRate(a0);
      const y0 = read('years'); if (y0 !== null) setYears(y0);
      const c0 = read('cash'); if (c0 !== null) setCash(c0);
      const d0 = read('discRate'); if (d0 !== null) setDiscRate(d0);
      const n0 = read('periods'); if (n0 !== null) setPeriods(n0);
      const cf = read('c1'); if (cf !== null) setC1(cf);
      const w0 = read('waccG'); if (w0 !== null) setWaccG(w0);
      const g0 = read('g'); if (g0 !== null) setG(g0);
    } catch { /* keep defaults */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ principal, annualRate, years, cash, discRate, periods, c1, waccG, g })); } catch { /* private mode */ }
  }, [principal, annualRate, years, cash, discRate, periods, c1, waccG, g]);
  const [linkCopied, setLinkCopied] = useState(false);
  const copyShareLink = async () => {
    const q = new URLSearchParams({ principal: String(principal), annualRate: String(annualRate), years: String(years), cash: String(cash), discRate: String(discRate), periods: String(periods), c1: String(c1), waccG: String(waccG), g: String(g) });
    try { await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${q.toString()}`); } catch { /* blocked */ }
    setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000);
  };

  // EMI calculations — delegated to the tested engine (lib/finance/tvm.ts).
  const emiEngine = useMemo(() => computeEmi(principal, annualRate / 100, years), [principal, annualRate, years]);
  const emiCalc = {
    rM: emiEngine.monthlyRate ?? 0, nM: emiEngine.months ?? 0, emi: emiEngine.emi ?? 0,
    totalPay: emiEngine.totalPayment ?? 0, interest: emiEngine.totalInterest ?? 0,
    amort: emiEngine.schedule.slice(0, 6).map((row) => ({ m: row.month, int: row.interest, prin: row.principal, balance: row.balance })),
  };

  // PV / FV calculations
  const tvmEngine = useMemo(() => computePvFv(cash, discRate / 100, periods), [cash, discRate, periods]);
  const tvmCalc = { pv: tvmEngine.presentValue ?? 0, fv: tvmEngine.futureValue ?? 0, annFactor: tvmEngine.annuityFactor ?? 0 };

  // Gordon Growth Model
  const gordEngine = gordonValue(c1, waccG / 100, g / 100);
  const gord = gordEngine.value ?? NaN;

  const engineErrors = [...emiEngine.errors, ...tvmEngine.errors, ...(gordEngine.error ? [gordEngine.error] : [])];

  const activeMode = MODES.find(m => m.id === mode)!;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand bg-brand-muted border border-brand/25 rounded-full px-3 py-1">
          PGDM Finance Lab · F06
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-content-primary">Time-Value Machine</h1>
        <p className="text-sm text-content-muted">
          From{' '}
          <Link href="/pgdm/financial-modeling-valuation/time-value-money-and-wacc" className="text-brand hover:underline">
            Lecture 3
          </Link>{' '}
          — every discounting pattern in one calculator.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`text-xs font-bold rounded-xl px-4 py-2 border transition-all ${
              mode === m.id
                ? 'bg-brand-muted text-brand border-brand/40'
                : 'bg-surface-muted text-content-muted border-border hover:text-content-primary hover:border-border-strong'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Active formula badge */}
      <div className="rounded-xl bg-surface-muted border border-border px-4 py-2 text-center">
        <p className="text-[10px] text-content-muted font-mono">{activeMode.formula}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={copyShareLink} className="text-xs font-bold px-4 py-2 rounded-xl border border-border bg-surface-raised hover:border-brand transition-colors text-content-primary">{linkCopied ? '✓ Link Copied' : '🔗 Copy Share Link'}</button>
        <span className="text-xs text-content-muted">Inputs autosave locally · full amortisation schedule computed (first 6 rows shown)</span>
      </div>
      {engineErrors.length > 0 && (
        <div role="alert" className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/40 p-4 text-sm text-red-800 dark:text-red-200"><ul className="list-disc pl-5">{engineErrors.map((e) => <li key={e}>{e}</li>)}</ul></div>
      )}

      {/* ── EMI MODE ── */}
      {mode === 'emi' && (
        <div className="space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-border bg-surface p-5">
            <Field label="Loan principal (₹)" value={principal} onChange={setPrincipal} step={100000} />
            <Field label="Annual interest rate" value={annualRate} onChange={setAnnualRate} step={0.1} suffix="%" />
            <Field label="Loan tenure" value={years} onChange={setYears} step={1} suffix="yrs" />
          </div>

          {/* KPI cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <ResultCard label="Monthly EMI" value={inr(emiCalc.emi)} sub="Fixed monthly payment" highlight />
            <ResultCard label="Total repayment" value={inr(emiCalc.totalPay)} sub={`Over ${years} years`} />
            <ResultCard
              label="Total interest paid"
              value={inr(emiCalc.interest)}
              sub={`${((emiCalc.interest / principal) * 100).toFixed(1)}% of principal`}
            />
          </div>

          {/* Amortization table */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-3">
              Amortisation schedule — first 6 months
            </p>
            <div className="horizontal-scroll-region" role="region" aria-label="Loan amortisation schedule" tabIndex={0} data-lenis-prevent>
              <table className="w-full min-w-[520px] text-[12px] font-mono">
                <thead>
                  <tr className="text-content-muted text-left border-b border-border">
                    <th className="pb-2">Month</th>
                    <th className="pb-2">EMI</th>
                    <th className="pb-2">Interest</th>
                    <th className="pb-2">Principal</th>
                    <th className="pb-2 text-right">Remaining</th>
                  </tr>
                </thead>
                <tbody className="text-content-secondary">
                  {emiCalc.amort.map((row) => (
                    <tr key={row.m} className="border-t border-border-subtle">
                      <td className="py-1.5">{row.m}</td>
                      <td>₹{emiCalc.emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="text-warning/90">₹{row.int.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="text-brand/90">₹{row.prin.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="text-right text-content-muted">{inr(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-content-muted mt-3">
              Early EMIs are mostly interest — the annuity front-loads the lender&apos;s return. Prepay early to save significantly.
            </p>
          </div>
        </div>
      )}

      {/* ── PV MODE ── */}
      {mode === 'pv' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-border bg-surface p-5">
            <Field label="Future cash flow (₹)" value={cash} onChange={setCash} step={100000} />
            <Field label="Discount rate" value={discRate} onChange={setDiscRate} step={0.5} suffix="%" />
            <Field label="Years away" value={periods} onChange={setPeriods} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <ResultCard
              label="Present value today"
              value={inr(tvmCalc.pv)}
              sub={`${inr(cash)} ÷ (1 + ${discRate}%)^${periods}`}
              highlight
            />
            <ResultCard
              label={`${periods}-year annuity factor @ ${discRate}%`}
              value={tvmCalc.annFactor.toFixed(3)}
              sub="× level annual cash flow = its PV"
            />
          </div>
          <div className="rounded-2xl border border-border bg-surface-muted p-4">
            <p className="text-[11px] text-content-muted">
              <strong>Key insight:</strong> ₹1 received {periods} years from today at {discRate}% discount rate is only worth{' '}
              {inr(tvmCalc.pv)} today — because that amount invested at {discRate}% would grow to {inr(cash)}.
              Discounting is the inverse of compounding.
            </p>
          </div>
        </div>
      )}

      {/* ── FV MODE ── */}
      {mode === 'fv' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-border bg-surface p-5">
            <Field label="Amount invested (₹)" value={cash} onChange={setCash} step={100000} />
            <Field label="Annual return rate" value={discRate} onChange={setDiscRate} step={0.5} suffix="%" />
            <Field label="Years invested" value={periods} onChange={setPeriods} />
          </div>
          <ResultCard
            label="Future value"
            value={inr(tvmCalc.fv)}
            sub={`${inr(cash)} × (1 + ${discRate}%)^${periods} · multiplied ${(tvmCalc.fv / cash).toFixed(2)}×`}
            highlight
          />
          {/* Compounding table */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-3">Compounding year-by-year</p>
            <div className="horizontal-scroll-region" role="region" aria-label="Compounding schedule" tabIndex={0} data-lenis-prevent>
              <table className="w-full min-w-[420px] text-[12px] font-mono">
                <thead>
                  <tr className="text-content-muted text-left border-b border-border">
                    <th className="pb-2">Year</th>
                    <th className="pb-2 text-right">Value</th>
                    <th className="pb-2 text-right">Interest earned</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.min(periods, 10) }, (_, i) => {
                    const yr = i + 1;
                    const val = cash * Math.pow(1 + discRate / 100, yr);
                    const prevVal = cash * Math.pow(1 + discRate / 100, yr - 1);
                    return (
                      <tr key={yr} className="border-t border-border-subtle">
                        <td className="py-1.5">{yr}</td>
                        <td className="text-right font-bold text-brand">{inr(val)}</td>
                        <td className="text-right text-success">{inr(val - prevVal)}</td>
                      </tr>
                    );
                  })}
                  {periods > 10 && (
                    <tr className="border-t border-border-subtle text-content-muted">
                      <td colSpan={3} className="py-1.5 text-center text-[11px] italic">… showing first 10 years only …</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── GORDON GROWTH (PERPETUITY) MODE ── */}
      {mode === 'gordon' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-border bg-surface p-5">
            <Field label="Next-year cash flow C₁ (₹ cr)" value={c1} onChange={setC1} step={0.1} />
            <Field label="Discount rate / WACC" value={waccG} onChange={setWaccG} step={0.5} suffix="%" />
            <Field label="Perpetual growth rate g" value={g} onChange={setG} step={0.25} suffix="%" />
          </div>
          <div className="rounded-2xl border border-brand/30 bg-brand-muted p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-1">Terminal value (Gordon Growth)</p>
            {Number.isFinite(gord) ? (
              <>
                <p className="text-3xl font-mono font-extrabold text-content-primary">
                  {c1 >= 100 ? inr(gord) : `₹${gord.toFixed(1)} cr`}
                </p>
                <p className="text-[11px] text-content-muted font-mono mt-2">
                  {c1} ÷ ({waccG}% − {g}%) = {c1} ÷ {(waccG - g).toFixed(2)}%
                </p>
              </>
            ) : (
              <p className="text-lg font-bold text-error font-mono">
                WACC must exceed g — the formula diverges when r ≤ g
              </p>
            )}
            <p className="text-[11px] text-content-muted mt-3 leading-relaxed">
              This is the terminal-value engine of the DCF — try the defaults from Lecture 4&apos;s NeoCap example
              (C₁ = 128.1, WACC 12%, g 5% → ₹1,830 cr).
            </p>
          </div>

          {/* Sensitivity grid */}
          {Number.isFinite(gord) && (
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-content-muted mb-4">
                Sensitivity — Terminal Value vs WACC &amp; g
              </p>
              <div className="horizontal-scroll-region" role="region" aria-label="Gordon growth sensitivity table" tabIndex={0} data-lenis-prevent>
                <table className="text-[11px] font-mono border-collapse min-w-[400px]">
                  <thead>
                    <tr>
                      <th className="border border-border bg-surface-muted px-3 py-1 text-content-muted">g↓ / WACC→</th>
                      {[waccG - 2, waccG - 1, waccG, waccG + 1, waccG + 2].map(w => (
                        <th key={w} className={`border border-border px-3 py-1 ${w === waccG ? 'bg-brand-muted text-brand font-bold' : 'bg-surface-muted text-content-muted'}`}>
                          {w.toFixed(1)}%
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[g - 1, g - 0.5, g, g + 0.5, g + 1].filter(gv => gv < waccG - 1).map(gv => (
                      <tr key={gv}>
                        <td className={`border border-border px-3 py-1 ${gv === g ? 'bg-brand-muted text-brand font-bold' : 'bg-surface-muted text-content-muted'}`}>
                          {gv.toFixed(1)}%
                        </td>
                        {[waccG - 2, waccG - 1, waccG, waccG + 1, waccG + 2].map(w => {
                          const spread = w - gv;
                          const val = spread > 0 ? c1 / (spread / 100) : null;
                          const isActive = Math.abs(w - waccG) < 0.01 && Math.abs(gv - g) < 0.01;
                          return (
                            <td key={w} className={`border border-border px-3 py-1 text-right ${isActive ? 'bg-brand-muted text-brand font-extrabold ring-1 ring-brand' : 'text-content-secondary'}`}>
                              {val !== null ? (val >= 100 ? `${(val).toFixed(0)} cr` : `${val.toFixed(1)} cr`) : '—'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
