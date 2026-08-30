'use client';

import { useState } from 'react';
import Link from 'next/link';

/* PGDM Finance Lab — Ratio Analyzer
   Matches lectures: F06 · Three-Statement Architecture & DCF (credit analysis) */

const inp =
  'w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-teal-500/50 transition-colors';
const lbl = 'text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block';

function NumField({
  label, value, onChange, step = 1,
}: { label: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <div className="relative">
        <input
          type="number" step={step} value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={inp}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">₹cr</span>
      </div>
    </div>
  );
}

type Band = 'good' | 'watch' | 'risk';

function judge(value: number, low: number, high: number, invert = false): Band | null {
  if (!Number.isFinite(value)) return null;
  let b: Band;
  if (value < low) b = invert ? 'good' : 'risk';
  else if (value > high) b = invert ? 'risk' : 'good';
  else b = 'watch';
  return b;
}

const bandStyle: Record<Band, string> = {
  good: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  watch: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  risk: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
};
const bandLabel: Record<Band, string> = { good: 'STRONG', watch: 'WATCH', risk: 'STRETCHED' };

function RatioRow({ name, value, unit, band, note }: { name: string; value: string; unit: string; band: Band | null; note: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
      <div className="w-44 shrink-0">
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-[10px] text-gray-500 font-mono">{unit}</p>
      </div>
      <p className="w-20 shrink-0 text-lg font-mono font-bold text-teal-300 text-right">{value}</p>
      {band ? (
        <span className={`mt-1 shrink-0 text-[9px] font-bold tracking-widest border rounded-full px-2 py-0.5 ${bandStyle[band]}`}>
          {bandLabel[band]}
        </span>
      ) : (
        <span className="mt-1 shrink-0 text-[9px] font-bold tracking-widest border rounded-full px-2 py-0.5 bg-white/5 text-gray-500 border-white/10">—</span>
      )}
      <p className="text-[11px] text-gray-400 leading-snug pt-1">{note}</p>
    </div>
  );
}

const DEFAULTS = {
  revenue: 500, cogs: 300, ebitda: 85, dep: 20, ebit: 65, interest: 18, pat: 34,
  cash: 25, inventory: 60, receivables: 75, currentAssets: 200, currentLiabilities: 130,
  payables: 55, totalDebt: 160, equity: 190, totalAssets: 430,
};

export default function RatioAnalyzerCalc() {
  const [f, setF] = useState(DEFAULTS);
  const set = (k: keyof typeof DEFAULTS) => (v: number) => setF((s) => ({ ...s, [k]: v }));

  const safe = (a: number, b: number) => (b === 0 ? NaN : a / b);

  const current = safe(f.currentAssets, f.currentLiabilities);
  const quick = safe(f.currentAssets - f.inventory, f.currentLiabilities);
  const cashR = safe(f.cash, f.currentLiabilities);
  const grossM = safe(f.revenue - f.cogs, f.revenue) * 100;
  const ebitdaM = safe(f.ebitda, f.revenue) * 100;
  const ebitM = safe(f.ebit, f.revenue) * 100;
  const netM = safe(f.pat, f.revenue) * 100;
  const roa = safe(f.pat, f.totalAssets) * 100;
  const roe = safe(f.pat, f.equity) * 100;
  const roce = safe(f.ebit, f.totalAssets - f.currentLiabilities) * 100;
  const de = safe(f.totalDebt, f.equity);
  const debtRatio = safe(f.totalDebt, f.totalAssets);
  const intCov = safe(f.ebit, f.interest);
  const invDays = safe(f.inventory, f.cogs) * 365;
  const recDays = safe(f.receivables, f.revenue) * 365;
  const payDays = safe(f.payables, f.cogs) * 365;
  const ccc = invDays + recDays - payDays;
  const at = safe(f.revenue, f.totalAssets);
  const eqMult = safe(f.totalAssets, f.equity);
  const dupontParts = [netM / 100, at, eqMult];
  const dupontCheck = dupontParts.reduce((x, y) => x * y, 1) * 100;

  const fmt = (v: number, d = 2) => (Number.isFinite(v) ? v.toFixed(d) : '—');
  const pct = (v: number) => (Number.isFinite(v) ? `${v.toFixed(1)}%` : '—');

  const groups: { title: string; rows: { name: string; value: string; unit: string; band: Band | null; note: string }[] }[] = [
    {
      title: 'Liquidity — can it pay tomorrow?',
      rows: [
        { name: 'Current ratio', value: fmt(current) + '×', unit: 'CA / CL', band: judge(current, 1.0, 1.33), note: 'Below 1.0 = working-capital deficit; above ~2 may idle cash.' },
        { name: 'Quick ratio', value: fmt(quick) + '×', unit: '(CA − Inventory) / CL', band: judge(quick, 0.7, 1.0), note: 'The acid test: strips stock that may not convert fast.' },
        { name: 'Cash ratio', value: fmt(cashR) + '×', unit: 'Cash / CL', band: judge(cashR, 0.15, 0.5), note: 'Immediate cover — very context-dependent (retail runs lean).' },
      ],
    },
    {
      title: 'Profitability — does it earn?',
      rows: [
        { name: 'Gross margin', value: pct(grossM), unit: '(Rev − COGS) / Rev', band: judge(grossM, 25, 35), note: 'Pricing power vs input costs — compare within industry only.' },
        { name: 'EBITDA margin', value: pct(ebitdaM), unit: 'EBITDA / Rev', band: judge(ebitdaM, 12, 20), note: 'Operating cash-ish earnings before D&A and capital structure.' },
        { name: 'Operating margin', value: pct(ebitM), unit: 'EBIT / Rev', band: judge(ebitM, 8, 15), note: 'Core operating profitability after depreciation.' },
        { name: 'Net margin', value: pct(netM), unit: 'PAT / Rev', band: judge(netM, 5, 10), note: 'The residual for shareholders per rupee of sales.' },
        { name: 'ROA', value: pct(roa), unit: 'PAT / Total assets', band: judge(roa, 5, 10), note: 'Asset productivity regardless of financing.' },
        { name: 'ROE', value: pct(roe), unit: 'PAT / Equity', band: judge(roe, 12, 20), note: 'Shareholder return — check DuPont below for HOW it is earned.' },
        { name: 'ROCE', value: pct(roce), unit: 'EBIT / (TA − CL)', band: judge(roce, 12, 18), note: 'Return on capital employed — vs WACC is the value test.' },
      ],
    },
    {
      title: 'Leverage — how is it financed?',
      rows: [
        { name: 'Debt / Equity', value: fmt(de) + '×', unit: 'Total debt / Equity', band: judge(de, 0.5, 1.0, true), note: 'Indian corporate comfort zone ≈ 0.25–1.0×; lenders covenant here.' },
        { name: 'Debt ratio', value: fmt(debtRatio) + '×', unit: 'Debt / Total assets', band: judge(debtRatio, 0.33, 0.5, true), note: 'Share of the balance sheet funded by debt.' },
        { name: 'Interest coverage', value: fmt(intCov) + '×', unit: 'EBIT / Interest', band: judge(intCov, 2.5, 4), note: 'Below ~2× distress territory; banks price loans off this.' },
      ],
    },
    {
      title: 'Efficiency — how fast does it turn?',
      rows: [
        { name: 'Inventory days', value: fmt(invDays, 0) + 'd', unit: 'Inv / COGS × 365', band: judge(invDays, 60, 90, true), note: 'Cash locked in stock (F06: NWC drag in FCFF).' },
        { name: 'Receivable days', value: fmt(recDays, 0) + 'd', unit: 'AR / Revenue × 365', band: judge(recDays, 30, 60, true), note: 'Credit given to customers — creeping up = quiet lending.' },
        { name: 'Payable days', value: fmt(payDays, 0) + 'd', unit: 'AP / COGS × 365', band: judge(payDays, 30, 60), note: 'Credit taken from suppliers — longer is free financing (to a point).' },
        { name: 'Cash conversion cycle', value: fmt(ccc, 0) + 'd', unit: 'InvD + RecD − PayD', band: judge(ccc, 45, 90, true), note: 'Days cash stays stuck in operations; negative = the retail dream.' },
        { name: 'Asset turnover', value: fmt(at) + '×', unit: 'Revenue / Total assets', band: judge(at, 0.8, 1.5), note: 'Sales generated per rupee of assets.' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-teal-300 bg-teal-500/10 border border-teal-500/25 rounded-full px-3 py-1">
          PGDM Finance Lab · F06
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Ratio Analyzer — 18 Ratios + DuPont</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Enter one P&L and one balance sheet — liquidity, profitability, leverage, efficiency and the DuPont
          decomposition update live. Companion to{' '}
          <Link href="/pgdm/financial-modeling-valuation/three-statement-architecture" className="text-teal-300 hover:underline">
            Three-Statement Architecture
          </Link>{' '}
          and{' '}
          <Link href="/pgdm/financial-modeling-valuation/dcf-valuation-fcff-to-share-price" className="text-teal-300 hover:underline">
            DCF Valuation
          </Link>.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl border border-white/10 bg-cinema-charcoal/60 p-5">
        <p className="col-span-full text-[10px] font-bold uppercase tracking-widest text-gray-500">Profit &amp; loss (₹ cr)</p>
        <NumField label="Revenue" value={f.revenue} onChange={set('revenue')} />
        <NumField label="COGS" value={f.cogs} onChange={set('cogs')} />
        <NumField label="EBITDA" value={f.ebitda} onChange={set('ebitda')} />
        <NumField label="Depreciation" value={f.dep} onChange={set('dep')} />
        <NumField label="EBIT" value={f.ebit} onChange={set('ebit')} />
        <NumField label="Interest" value={f.interest} onChange={set('interest')} />
        <NumField label="PAT (net income)" value={f.pat} onChange={set('pat')} />
        <div className="flex items-end">
          <button
            onClick={() => setF(DEFAULTS)}
            className="w-full text-[11px] font-bold uppercase tracking-widest text-gray-400 border border-white/10 rounded-xl px-3 py-2.5 hover:border-teal-500/40 hover:text-teal-300 transition-colors"
          >
            Reset inputs
          </button>
        </div>
        <p className="col-span-full text-[10px] font-bold uppercase tracking-widest text-gray-500 pt-2">Balance sheet (₹ cr)</p>
        <NumField label="Cash" value={f.cash} onChange={set('cash')} />
        <NumField label="Inventory" value={f.inventory} onChange={set('inventory')} />
        <NumField label="Receivables" value={f.receivables} onChange={set('receivables')} />
        <NumField label="Current assets" value={f.currentAssets} onChange={set('currentAssets')} />
        <NumField label="Current liabilities" value={f.currentLiabilities} onChange={set('currentLiabilities')} />
        <NumField label="Payables" value={f.payables} onChange={set('payables')} />
        <NumField label="Total debt" value={f.totalDebt} onChange={set('totalDebt')} />
        <NumField label="Equity" value={f.equity} onChange={set('equity')} />
        <NumField label="Total assets" value={f.totalAssets} onChange={set('totalAssets')} />
      </div>

      {/* headline strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { k: 'ROE', v: pct(roe), s: 'DuPont: ' + pct(dupontCheck) + ' check' },
          { k: 'ROCE vs WACC', v: pct(roce), s: 'value creation if > WACC' },
          { k: 'Interest cover', v: fmt(intCov) + '×', s: 'solvency breath' },
          { k: 'Cash cycle', v: fmt(ccc, 0) + 'd', s: 'working-capital drag' },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border border-teal-500/25 bg-teal-500/[0.06] p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300 mb-1">{x.k}</p>
            <p className="text-2xl font-mono font-extrabold text-white">{x.v}</p>
            <p className="text-[10px] text-gray-500 font-mono mt-1">{x.s}</p>
          </div>
        ))}
      </div>

      {groups.map((g) => (
        <div key={g.title} className="rounded-2xl border border-white/10 bg-cinema-graphite/70 p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{g.title}</p>
          {g.rows.map((r) => (
            <RatioRow key={r.name} {...r} />
          ))}
        </div>
      ))}

      {/* DuPont */}
      <div className="rounded-2xl border border-violet-500/25 bg-violet-500/[0.06] p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300 mb-4">
          DuPont decomposition — ROE = Net margin × Asset turnover × Equity multiplier
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {[
            { l: 'Net margin', v: pct(netM) },
            { l: '× Asset turnover', v: fmt(at) + '×' },
            { l: '× Equity multiplier', v: fmt(eqMult) + '×' },
          ].map((x) => (
            <div key={x.l} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{x.l}</p>
              <p className="text-lg font-mono font-bold text-violet-300">{x.v}</p>
            </div>
          ))}
          <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 px-4 py-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-teal-300">= ROE</p>
            <p className="text-lg font-mono font-extrabold text-white">{pct(roe)}</p>
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
          Read the engine, not just the number: a high ROE from the equity multiplier (leverage) is riskier than the
          same ROE from margin or turnover. Banks and rating agencies unpack exactly this way.
        </p>
      </div>

      <p className="text-[11px] text-gray-500 leading-relaxed text-center">
        Benchmarks are indicative Indian-corporate ranges — always compare within the same industry and against the
        company&apos;s own trend. Ratios describe; they do not diagnose. Cross-read with cash flows before concluding.
      </p>
    </div>
  );
}
