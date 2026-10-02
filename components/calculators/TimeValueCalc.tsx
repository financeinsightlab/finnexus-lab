'use client';

import { useState } from 'react';
import Link from 'next/link';

/* PGDM Finance Lab — Time-Value Machine
   Matches lecture: F06 · Time Value of Money & WACC */

type Mode = 'emi' | 'pv' | 'fv' | 'gordon';

const MODES: { id: Mode; label: string }[] = [
  { id: 'emi', label: 'Loan EMI' },
  { id: 'pv', label: 'Present Value' },
  { id: 'fv', label: 'Future Value' },
  { id: 'gordon', label: 'Growing Perpetuity' },
];

const inp =
  'w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-teal-500/50 transition-colors';
const lbl = 'text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block';

function Field({
  label, value, onChange, step = 1,
}: { label: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <input
        type="number" step={step} value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={inp}
      />
    </div>
  );
}

const inr = (v: number) =>
  v >= 1e7 ? `₹${(v / 1e7).toFixed(2)} cr` : v >= 1e5 ? `₹${(v / 1e5).toFixed(2)} lakh` : `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

export default function TimeValueCalc() {
  const [mode, setMode] = useState<Mode>('emi');

  // EMI
  const [principal, setPrincipal] = useState(5000000);
  const [annualRate, setAnnualRate] = useState(9);
  const [years, setYears] = useState(20);

  // PV/FV
  const [cash, setCash] = useState(1000000);
  const [discRate, setDiscRate] = useState(13);
  const [periods, setPeriods] = useState(4);

  // Gordon
  const [c1, setC1] = useState(128.1);
  const [waccG, setWaccG] = useState(12);
  const [g, setG] = useState(5);

  const rM = annualRate / 100 / 12;
  const nM = years * 12;
  const emi = rM > 0 ? (principal * rM) / (1 - Math.pow(1 + rM, -nM)) : principal / nM;
  const totalPay = emi * nM;
  const interest = totalPay - principal;

  const pv = cash / Math.pow(1 + discRate / 100, periods);
  const fv = cash * Math.pow(1 + discRate / 100, periods);
  const annFactor = (1 - Math.pow(1 + discRate / 100, -periods)) / (discRate / 100);

  const gord = waccG > g ? c1 / ((waccG - g) / 100) : NaN;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-teal-300 bg-teal-500/10 border border-teal-500/25 rounded-full px-3 py-1">
          PGDM Finance Lab · F06
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Time-Value Machine</h1>
        <p className="text-sm text-gray-400">
          From{' '}
          <Link href="/pgdm/financial-modeling-valuation/time-value-money-and-wacc" className="text-teal-300 hover:underline">
            Lecture 3
          </Link>{' '}
          — every discounting pattern in one calculator.
        </p>
      </div>

      {/* tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`text-xs font-bold rounded-xl px-4 py-2 border transition-all ${
              mode === m.id
                ? 'bg-teal-500/15 text-teal-300 border-teal-500/40'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/25'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'emi' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5 sm:grid-cols-3">
            <Field label="Loan amount (₹)" value={principal} onChange={setPrincipal} step={100000} />
            <Field label="Annual rate (%)" value={annualRate} onChange={setAnnualRate} step={0.05} />
            <Field label="Tenure (years)" value={years} onChange={setYears} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-teal-500/30 bg-teal-500/[0.07] p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300 mb-1">Monthly EMI</p>
              <p className="text-2xl font-mono font-extrabold text-white">₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-cinema-graphite/70 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Total interest</p>
              <p className="text-2xl font-mono font-bold text-amber-300">{inr(interest)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-cinema-graphite/70 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Total payment</p>
              <p className="text-2xl font-mono font-bold text-gray-200">{inr(totalPay)}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Amortisation — first 6 months</p>
            <div className="horizontal-scroll-region" role="region" aria-label="Loan amortisation schedule" tabIndex={0} data-lenis-prevent>
            <table className="w-full min-w-[520px] text-[12px] font-mono">
              <thead>
                <tr className="text-gray-500 text-left">
                  <th className="pb-2">Month</th><th className="pb-2">EMI</th><th className="pb-2">Interest</th><th className="pb-2">Principal</th><th className="pb-2 text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {(() => {
                  const rows: { m: number; interest: number; balance: number }[] = [];
                  let bal = principal;
                  for (let k = 0; k < 6; k++) {
                    const intK = bal * rM;
                    rows.push({ m: k + 1, interest: intK, balance: bal - (emi - intK) });
                    bal -= (emi - intK);
                  }
                  return rows.map((row) => (
                    <tr key={row.m} className="border-t border-white/5">
                      <td className="py-1.5">{row.m}</td>
                      <td>₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="text-amber-300/90">₹{row.interest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="text-teal-300/90">₹{(emi - row.interest).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="text-right text-gray-400">{inr(row.balance)}</td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
            </div>
            <p className="text-[11px] text-gray-500 mt-3">Early EMIs are mostly interest — the annuity front-loads the lender&apos;s return. Prepay early, save more.</p>
          </div>
        </div>
      )}

      {mode === 'pv' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5 sm:grid-cols-3">
            <Field label="Future cash flow (₹)" value={cash} onChange={setCash} step={100000} />
            <Field label="Discount rate (%)" value={discRate} onChange={setDiscRate} step={0.5} />
            <Field label="Years away" value={periods} onChange={setPeriods} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-teal-500/30 bg-teal-500/[0.07] p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300 mb-1">Present value today</p>
              <p className="text-3xl font-mono font-extrabold text-white">{inr(pv)}</p>
              <p className="text-[11px] text-gray-500 font-mono mt-2">{inr(cash)} ÷ (1 + {discRate}%)^{periods}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-cinema-graphite/70 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{periods}-year annuity factor @{discRate}%</p>
              <p className="text-3xl font-mono font-bold text-violet-300">{annFactor.toFixed(3)}</p>
              <p className="text-[11px] text-gray-500 mt-2">× level annual cash flow = its PV</p>
            </div>
          </div>
        </div>
      )}

      {mode === 'fv' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5 sm:grid-cols-3">
            <Field label="Amount invested (₹)" value={cash} onChange={setCash} step={100000} />
            <Field label="Return rate (%)" value={discRate} onChange={setDiscRate} step={0.5} />
            <Field label="Years invested" value={periods} onChange={setPeriods} />
          </div>
          <div className="rounded-2xl border border-teal-500/30 bg-teal-500/[0.07] p-5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300 mb-1">Future value</p>
            <p className="text-3xl font-mono font-extrabold text-white">{inr(fv)}</p>
            <p className="text-[11px] text-gray-500 font-mono mt-2">{inr(cash)} × (1 + {discRate}%)^{periods} · multiplied {(fv / cash).toFixed(2)}×</p>
          </div>
        </div>
      )}

      {mode === 'gordon' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5 sm:grid-cols-3">
            <Field label="Next-year cash flow C₁" value={c1} onChange={setC1} step={0.1} />
            <Field label="Discount rate / WACC (%)" value={waccG} onChange={setWaccG} step={0.5} />
            <Field label="Perpetual growth g (%)" value={g} onChange={setG} step={0.25} />
          </div>
          <div className="rounded-2xl border border-teal-500/30 bg-teal-500/[0.07] p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300 mb-1">Terminal value (Gordon)</p>
            {Number.isFinite(gord) ? (
              <>
                <p className="text-3xl font-mono font-extrabold text-white">{c1 >= 100 ? inr(gord) : `₹${gord.toFixed(1)} cr`}</p>
                <p className="text-[11px] text-gray-500 font-mono mt-2">
                  {c1} ÷ ({waccG}% − {g}%) = {c1} ÷ {(waccG - g).toFixed(2)}%
                </p>
              </>
            ) : (
              <p className="text-lg font-bold text-red-400 font-mono">WACC must exceed g — r &gt; g or the formula explodes</p>
            )}
            <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
              This is the terminal-value engine of the DCF — try the defaults from Lecture 4&apos;s NeoCap example
              (C₁ = 128.1, WACC 12%, g 5% → ₹1,830 cr).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
