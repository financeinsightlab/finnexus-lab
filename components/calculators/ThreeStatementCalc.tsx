'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

export default function ThreeStatementCalc({ slug, isPremiumUser }: { slug: string; isPremiumUser?: boolean }) {
  // Income Statement Inputs
  const [baseRevenue, setBaseRevenue] = useState(5_000_000);
  const [revenueGrowth, setRevenueGrowth] = useState(30);
  const [cogsPercent, setCogsPercent] = useState(35);
  const [opexPercent, setOpexPercent] = useState(40);
  const [taxRate, setTaxRate] = useState(25);

  // Balance Sheet Inputs
  const [initialCash, setInitialCash] = useState(2_000_000);
  const [initialDebt, setInitialDebt] = useState(1_500_000);
  const [dsodays, setDsoDays] = useState(45); // days sales outstanding
  const [interestRate, setInterestRate] = useState(8);

  // Capital Expenditure
  const [capexPercent, setCapexPercent] = useState(5);
  const [depreciationYears, setDepreciationYears] = useState(5);

  const [isLocked, setIsLocked] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'pl' | 'bs' | 'cf'>('pl');

  useEffect(() => {
    if (isPremiumUser) { setIsLocked(false); return; }
    const key = `used_tool_${slug}`;
    const firstUsed = localStorage.getItem(key);
    if (!firstUsed) {
      localStorage.setItem(key, Date.now().toString());
    } else {
      if (Date.now() - parseInt(firstUsed) > 30 * 60 * 1000) setIsLocked(true);
    }
  }, [slug, isPremiumUser]);

  useEffect(() => {
    if (isPremiumUser || localStorage.getItem(`unlocked_${slug}`)) setIsLocked(false);
  }, [slug, isPremiumUser]);

  const calculations = useMemo(() => {
    const years = [1, 2, 3, 4, 5];
    const model: Array<{
      year: string;
      revenue: number; cogs: number; grossProfit: number; grossMargin: number;
      opex: number; ebitda: number; ebitdaMargin: number;
      capex: number; depreciation: number; ebit: number;
      interestExpense: number; ebt: number; taxes: number; netIncome: number; netMargin: number;
      // Balance Sheet
      accountsReceivable: number; totalAssets: number;
      totalDebt: number; equity: number;
      // Cash Flow
      cashFromOps: number; cashFromInvesting: number; cashFromFinancing: number;
      endingCash: number;
    }> = [];

    let prevCash = initialCash;
    let prevDebt = initialDebt;
    let cumulativeCapex = 0;

    for (let i = 0; i < 5; i++) {
      const year = years[i];
      const revenue = baseRevenue * Math.pow(1 + revenueGrowth / 100, year);
      const cogs = revenue * (cogsPercent / 100);
      const grossProfit = revenue - cogs;
      const grossMargin = (grossProfit / revenue) * 100;

      const opex = revenue * (opexPercent / 100);
      const ebitda = grossProfit - opex;
      const ebitdaMargin = (ebitda / revenue) * 100;

      const capex = revenue * (capexPercent / 100);
      cumulativeCapex += capex;
      const depreciation = cumulativeCapex / depreciationYears;

      const ebit = ebitda - depreciation;
      const interestExpense = prevDebt * (interestRate / 100);
      const ebt = ebit - interestExpense;
      const taxes = Math.max(0, ebt * (taxRate / 100));
      const netIncome = ebt - taxes;
      const netMargin = (netIncome / revenue) * 100;

      // Balance Sheet
      const accountsReceivable = revenue * (dsodays / 365);
      const ppne = cumulativeCapex * ((depreciationYears - 1) / depreciationYears); // simplified
      const totalAssets = prevCash + accountsReceivable + ppne;
      const totalDebt = prevDebt;
      const equity = totalAssets - totalDebt;

      // Cash Flow
      const cashFromOps = netIncome + depreciation - (accountsReceivable - (i > 0 ? model[i-1].accountsReceivable : 0));
      const cashFromInvesting = -capex;
      const cashFromFinancing = 0; // simplified — no new debt
      const endingCash = prevCash + cashFromOps + cashFromInvesting + cashFromFinancing;

      prevCash = endingCash;

      model.push({
        year: `Year ${year}`,
        revenue: Math.round(revenue), cogs: Math.round(cogs),
        grossProfit: Math.round(grossProfit), grossMargin: parseFloat(grossMargin.toFixed(1)),
        opex: Math.round(opex), ebitda: Math.round(ebitda), ebitdaMargin: parseFloat(ebitdaMargin.toFixed(1)),
        capex: Math.round(capex), depreciation: Math.round(depreciation),
        ebit: Math.round(ebit), interestExpense: Math.round(interestExpense),
        ebt: Math.round(ebt), taxes: Math.round(taxes),
        netIncome: Math.round(netIncome), netMargin: parseFloat(netMargin.toFixed(1)),
        accountsReceivable: Math.round(accountsReceivable),
        totalAssets: Math.round(totalAssets), totalDebt: Math.round(totalDebt),
        equity: Math.round(equity),
        cashFromOps: Math.round(cashFromOps),
        cashFromInvesting: Math.round(cashFromInvesting),
        cashFromFinancing: Math.round(cashFromFinancing),
        endingCash: Math.round(endingCash),
      });
    }

    const chartData = model.map(m => ({
      name: m.year,
      Revenue: m.revenue,
      'Gross Profit': m.grossProfit,
      EBITDA: m.ebitda,
      'Net Income': m.netIncome,
    }));

    const yr5 = model[4];
    let insightText = '';
    if (yr5.netMargin < 0) {
      insightText = `Loss-Making Structure: Despite ${revenueGrowth}% growth, your company will remain unprofitable in Year 5 with a Net Margin of ${yr5.netMargin.toFixed(1)}%. The combined weight of COGS (${cogsPercent}%) and OpEx (${opexPercent}%) represents ${cogsPercent + opexPercent}% of Revenue—you are spending $${((cogsPercent + opexPercent) / 100).toFixed(2)} for every $1 earned. Immediately cut OpEx or raise pricing to reduce COGS pressure. Avoid further debt drawdown until you achieve at least 10%+ EBITDA margin.`;
    } else if (yr5.ebitdaMargin < 15) {
      insightText = `Margin Compression Warning: Year 5 EBITDA Margin of ${yr5.ebitdaMargin.toFixed(1)}% is below the 15% institutional investment threshold. With $${(yr5.interestExpense/1e6).toFixed(2)}M in annual interest costs from your $${(initialDebt/1e6).toFixed(1)}M debt, your P&L has very little buffer against revenue volatility. Consider accelerating debt paydown with Year 1-3 operating cash flows to reduce your interest burden before Year 4 growth scaling.`;
    } else {
      insightText = `Healthy 3-Statement Architecture: Your 5-year model projects a compounding revenue trajectory from $${(baseRevenue/1e6).toFixed(1)}M to $${(yr5.revenue/1e6).toFixed(1)}M. The Year 5 EBITDA margin of ${yr5.ebitdaMargin.toFixed(1)}% is strong for a growth-stage company. Cash from Operations ($${(yr5.cashFromOps/1e6).toFixed(1)}M in Year 5) substantially covers CapEx ($${(yr5.capex/1e6).toFixed(1)}M), indicating the business generates true free cash flow—a core prerequisite for institutional debt or equity financing.`;
    }

    return { model, chartData, insightText };
  }, [baseRevenue, revenueGrowth, cogsPercent, opexPercent, taxRate, initialCash, initialDebt, dsodays, interestRate, capexPercent, depreciationYears]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tag: `unlocked_${slug}` }) });
      if (res.ok) { localStorage.setItem(`unlocked_${slug}`, 'true'); setIsLocked(false); setShowEmailGate(false); }
    } finally { setLoading(false); }
  };

  const fmt = (n: number) => n >= 1_000_000 ? `$${(n/1_000_000).toFixed(2)}M` : n >= 1_000 ? `$${(n/1_000).toFixed(0)}K` : `$${n}`;
  const ExcelHeader = ({ label }: { label: string }) => (
    <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-center font-bold text-gray-600 text-[11px] uppercase whitespace-nowrap">{label}</th>
  );
  const ExcelIdx = ({ i }: { i: string }) => (
    <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400 text-xs w-6 sticky left-0 z-20">{i}</td>
  );

  const tabContent = () => {
    const { model } = calculations;
    if (activeTab === 'pl') return (
      <table className="w-full text-[11px] whitespace-nowrap border-collapse min-w-[700px] select-text">
        <thead>
          <tr>
            <th className="bg-gray-100 border border-gray-300 w-8 sticky left-0"></th>
            <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-bold text-gray-600 uppercase text-[11px] sticky left-6 z-30 min-w-[220px]">Income Statement ($)</th>
            {model.map(m => <ExcelHeader key={m.year} label={m.year} />)}
          </tr>
        </thead>
        <tbody>
          {[
            { label: 'Revenue', key: 'revenue', bold: true },
            { label: '  COGS', key: 'cogs', neg: true },
            { label: 'Gross Profit', key: 'grossProfit', bold: true, highlight: 'green' },
            { label: '  Gross Margin %', key: 'grossMargin', pct: true },
            { label: '  Operating Expenses', key: 'opex', neg: true },
            { label: 'EBITDA', key: 'ebitda', bold: true, highlight: 'blue' },
            { label: '  EBITDA Margin %', key: 'ebitdaMargin', pct: true },
            { label: '  Depreciation', key: 'depreciation', neg: true },
            { label: 'EBIT', key: 'ebit', bold: true },
            { label: '  Interest Expense', key: 'interestExpense', neg: true },
            { label: 'EBT', key: 'ebt', bold: true },
            { label: '  Income Tax', key: 'taxes', neg: true },
            { label: 'Net Income', key: 'netIncome', bold: true, highlight: 'navy' },
            { label: '  Net Margin %', key: 'netMargin', pct: true },
          ].map((row, idx) => (
            <tr key={idx} className={`hover:bg-blue-50/30 group ${row.highlight === 'navy' ? 'bg-[#eef3fb]' : row.highlight === 'green' ? 'bg-green-50/20' : row.highlight === 'blue' ? 'bg-sky-50/20' : ''}`}>
              <ExcelIdx i={String(idx + 1)} />
              <td className={`border border-gray-200 px-2 py-1.5 pl-3 sticky left-6 z-20 ${row.bold ? 'font-bold text-gray-800' : 'text-gray-500 pl-6'} bg-white group-hover:bg-blue-50/10`}>
                {row.label}
              </td>
              {model.map((m, mi) => {
                const val = (m as any)[row.key];
                const isNeg = row.neg && val > 0;
                const isPct = row.pct;
                return (
                  <td key={mi} className={`border border-gray-200 px-2 py-1.5 text-right font-mono ${row.bold ? 'font-bold' : ''} ${(row.highlight === 'navy') ? 'text-[#0b5c96] text-[13px]' : isNeg ? 'text-red-600' : 'text-gray-700'}`}>
                    {isPct ? `${val}%` : isNeg ? `(${fmt(val)})` : fmt(val)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );

    if (activeTab === 'bs') return (
      <table className="w-full text-[11px] whitespace-nowrap border-collapse min-w-[700px] select-text">
        <thead>
          <tr>
            <th className="bg-gray-100 border border-gray-300 w-8 sticky left-0"></th>
            <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-bold text-gray-600 uppercase text-[11px] sticky left-6 z-30 min-w-[220px]">Balance Sheet ($)</th>
            {model.map(m => <ExcelHeader key={m.year} label={m.year} />)}
          </tr>
        </thead>
        <tbody>
          {[
            { label: 'ASSETS', section: true },
            { label: 'Cash & Equivalents', key: 'endingCash', bold: true },
            { label: 'Accounts Receivable', key: 'accountsReceivable' },
            { label: 'Total Assets', key: 'totalAssets', bold: true, highlight: 'blue' },
            { label: 'LIABILITIES & EQUITY', section: true },
            { label: 'Total Debt', key: 'totalDebt', bold: false },
            { label: 'Shareholders Equity', key: 'equity', bold: true, highlight: 'green' },
          ].map((row, idx) => (
            <tr key={idx} className={`${row.section ? 'bg-gray-100' : 'hover:bg-blue-50/30'} ${row.highlight === 'blue' ? 'bg-sky-50/20' : row.highlight === 'green' ? 'bg-green-50/20' : ''}`}>
              <ExcelIdx i={row.section ? '' : String(idx)} />
              <td className={`border border-gray-200 px-2 py-1.5 sticky left-6 z-20 ${row.section ? 'font-extrabold text-gray-500 uppercase tracking-widest text-[10px] bg-gray-100' : row.bold ? 'font-bold text-gray-800 pl-3 bg-white' : 'text-gray-500 pl-6 bg-white'}`}>
                {row.label}
              </td>
              {row.section ? <td colSpan={5} className="border border-gray-200 bg-gray-100"></td> :
                model.map((m, mi) => (
                  <td key={mi} className={`border border-gray-200 px-2 py-1.5 text-right font-mono ${row.bold ? 'font-bold' : ''} ${row.highlight === 'blue' ? 'text-[#0b5c96]' : row.highlight === 'green' ? 'text-green-700' : 'text-gray-700'}`}>
                    {row.key ? fmt((m as any)[row.key] ?? 0) : ''}
                  </td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    );

    // Cash Flow Statement
    return (
      <table className="w-full text-[11px] whitespace-nowrap border-collapse min-w-[700px] select-text">
        <thead>
          <tr>
            <th className="bg-gray-100 border border-gray-300 w-8 sticky left-0"></th>
            <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-bold text-gray-600 uppercase text-[11px] sticky left-6 z-30 min-w-[220px]">Cash Flow Statement ($)</th>
            {model.map(m => <ExcelHeader key={m.year} label={m.year} />)}
          </tr>
        </thead>
        <tbody>
          {[
            { label: 'OPERATING ACTIVITIES', section: true },
            { label: 'Cash from Operations', key: 'cashFromOps', bold: true, highlight: 'green' },
            { label: 'INVESTING ACTIVITIES', section: true },
            { label: 'CapEx (Investments)', key: 'cashFromInvesting', bold: false, neg: true },
            { label: 'FINANCING ACTIVITIES', section: true },
            { label: 'Debt / Equity Raised', key: 'cashFromFinancing', bold: false },
            { label: 'NET ENDING CASH', key: 'endingCash', bold: true, highlight: 'navy' },
          ].map((row, idx) => (
            <tr key={idx} className={`${row.section ? 'bg-gray-100' : 'hover:bg-blue-50/30'} ${row.highlight === 'navy' ? 'bg-[#eef3fb]' : row.highlight === 'green' ? 'bg-green-50/20' : ''}`}>
              <ExcelIdx i={row.section ? '' : String(idx)} />
              <td className={`border border-gray-200 px-2 py-1.5 sticky left-6 z-20 ${row.section ? 'font-extrabold text-gray-500 uppercase tracking-widest text-[10px] bg-gray-100' : row.bold ? 'font-bold text-gray-800 pl-3 bg-white' : 'text-gray-600 pl-6 bg-white'}`}>
                {row.label}
              </td>
              {row.section ? <td colSpan={5} className="border border-gray-200 bg-gray-100"></td> :
                model.map((m, mi) => {
                  const val = row.key ? ((m as any)[row.key] ?? 0) : 0;
                  return (
                    <td key={mi} className={`border border-gray-200 px-2 py-1.5 text-right font-mono ${row.bold ? 'font-bold' : ''} ${row.highlight === 'navy' ? 'text-[#0b5c96] text-[13px]' : val < 0 ? 'text-red-600' : 'text-gray-700'}`}>
                      {val < 0 ? `(${fmt(Math.abs(val))})` : fmt(val)}
                    </td>
                  );
                })
              }
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 relative">
      <div className="wrap max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-teal-600 font-medium mb-2">Premium Web Calculator</p>
          <h1 className="text-3xl font-bold text-brand-navy">Startup 3-Statement Financial Model</h1>
          <p className="text-brand-slate">Full 5-year integrated P&L, Balance Sheet & Cash Flow projection engine.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-brand-teal border border-gray-100 mb-8 flex gap-4 max-w-4xl">
          <div className="text-3xl pt-1">💡</div>
          <div>
            <h3 className="font-bold text-brand-navy mb-1">What this tool actually does</h3>
            <p className="text-sm text-brand-slate leading-relaxed">
              The 3-Statement Model is the backbone of institutional finance. It links a live Income Statement (P&L) directly to a Balance Sheet and Cash Flow Statement so that changes to one statement automatically cascade through all three—exactly as a CFO would structure a board presentation or an investment bank would in a due diligence data room.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 relative">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24 z-20 space-y-4">
            <h3 className="font-bold text-brand-navy border-b pb-4">Model Assumptions</h3>
            
            <div className="bg-blue-50/50 -mx-6 px-6 py-4">
              <h4 className="font-bold text-blue-900 text-[11px] uppercase tracking-widest mb-3">Income Statement</h4>
              <div className="space-y-3">
                {[
                  { label: 'Base Revenue (Year 0)', val: baseRevenue, set: setBaseRevenue, prefix: '$' },
                  { label: 'Annual Revenue Growth %', val: revenueGrowth, set: setRevenueGrowth, suffix: '%' },
                  { label: 'COGS as % of Revenue', val: cogsPercent, set: setCogsPercent, suffix: '%' },
                  { label: 'OpEx as % of Revenue', val: opexPercent, set: setOpexPercent, suffix: '%' },
                  { label: 'Corporate Tax Rate %', val: taxRate, set: setTaxRate, suffix: '%' },
                ].map(({ label, val, set, prefix, suffix }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                    <div className="relative">
                      {prefix && <span className="absolute left-3 top-2 text-gray-400 text-sm">{prefix}</span>}
                      <input type="number" className={`input w-full py-1.5 text-sm ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-8' : ''}`} value={val} onChange={e => set(Number(e.target.value))} />
                      {suffix && <span className="absolute right-3 top-2 text-gray-400 text-sm">{suffix}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <h4 className="font-bold text-gray-800 text-xs border-b pb-1">Balance Sheet & CapEx</h4>
              {[
                { label: 'Opening Cash ($)', val: initialCash, set: setInitialCash, prefix: '$' },
                { label: 'Opening Debt ($)', val: initialDebt, set: setInitialDebt, prefix: '$' },
                { label: 'DSO (Receivables Days)', val: dsodays, set: setDsoDays },
                { label: 'Interest Rate on Debt %', val: interestRate, set: setInterestRate, suffix: '%' },
                { label: 'CapEx as % of Revenue', val: capexPercent, set: setCapexPercent, suffix: '%' },
                { label: 'Asset Life (Depreciation Yrs)', val: depreciationYears, set: setDepreciationYears },
              ].map(({ label, val, set, prefix, suffix }) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <div className="relative">
                    {prefix && <span className="absolute left-3 top-2 text-gray-400 text-sm">{prefix}</span>}
                    <input type="number" className={`input w-full py-1 text-sm bg-gray-50 ${prefix ? 'pl-7' : ''}`} value={val} onChange={e => set(Number(e.target.value))} />
                    {suffix && <span className="absolute right-3 top-2 text-gray-400 text-sm">{suffix}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className={`lg:col-span-3 space-y-8 ${isLocked ? 'blur-md pointer-events-none select-none opacity-40' : ''} transition-all duration-700`}>
            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { label: 'Year 5 Revenue', val: fmt(calculations.model[4]?.revenue ?? 0), color: 'blue', sub: `${revenueGrowth}% CAGR from base` },
                { label: 'Year 5 EBITDA', val: fmt(calculations.model[4]?.ebitda ?? 0), color: 'green', sub: `${calculations.model[4]?.ebitdaMargin ?? 0}% margin` },
                { label: 'Year 5 Net Income', val: fmt(calculations.model[4]?.netIncome ?? 0), color: (calculations.model[4]?.netIncome ?? 0) > 0 ? 'teal' : 'red', sub: `${calculations.model[4]?.netMargin ?? 0}% net margin` },
              ].map(({ label, val, color, sub }) => (
                <div key={label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                  <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500 bg-${color}-100`}></div>
                  <div className="relative z-10">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                    <h4 className="text-3xl font-bold text-brand-navy">{val}</h4>
                    <p className="text-xs text-brand-slate mt-1">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-brand-navy mb-6">5-Year Integrated Financial Waterfall</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calculations.chartData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={v => v >= 1e6 ? `$${(v/1e6).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`} width={70} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: any) => fmt(v)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }} />
                    <Legend iconType="circle" />
                    <Area type="monotone" dataKey="Revenue" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.08} strokeWidth={2} />
                    <Area type="monotone" dataKey="Gross Profit" stroke="#0d9488" fill="#0d9488" fillOpacity={0.1} strokeWidth={2} />
                    <Area type="monotone" dataKey="EBITDA" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.12} strokeWidth={2} />
                    <Area type="monotone" dataKey="Net Income" stroke="#22c55e" fill="#22c55e" fillOpacity={0.12} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Excel Sheet Tabs */}
            <div className="bg-white border border-gray-300 shadow-lg rounded-sm overflow-hidden">
              <div className="bg-[#107c41] text-white px-3 py-1 text-[11px] font-medium flex items-center gap-2">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h20v4H2zm0 6h6v12H2zm8 0h12v3H10zm0 4.5h12v3H10zm0 4.5h12v3H10z"/></svg>
                <span>3_Statement_Financial_Model.xlsx</span>
              </div>
              <div className="bg-white border-b border-gray-300 px-3 py-1.5 text-[11px] flex items-center gap-2">
                <span className="font-bold italic text-gray-400 px-1">fx</span>
                <div className="bg-white border border-blue-300 w-full px-2 py-0.5 h-5 flex items-center shadow-inner text-xs">
                  ={activeTab === 'pl' ? 'Revenue*(1-COGS%)-OpEx-Depreciation-Interest*(1-TaxRate)' : activeTab === 'bs' ? 'TotalAssets=Cash+AR+PPE | TotalDebt+Equity=TotalAssets' : 'EndingCash=OpeningCash+CFO+CFI+CFF'}
                </div>
              </div>

              {/* Sheet Tabs Navigation */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                {[{ id: 'pl', label: '📊 P&L' }, { id: 'bs', label: '🏦 Balance Sheet' }, { id: 'cf', label: '💵 Cash Flow' }].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'pl' | 'bs' | 'cf')}
                    className={`px-4 py-2 text-[11px] font-bold border-r border-gray-200 transition-colors ${activeTab === tab.id ? 'bg-[#107c41] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto w-full">
                {tabContent()}
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-brand-navy p-6 rounded-2xl shadow-lg relative overflow-hidden border-t-4 border-t-blue-500">
              <h3 className="font-bold text-white mb-2 text-sm flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
                CFO Financial Model Analyst
              </h3>
              <p className="text-blue-50 text-sm leading-relaxed pt-2 font-light">{calculations.insightText}</p>
            </div>
          </div>

          {/* Paywall */}
          {isLocked && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pt-20">
              <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg text-center border border-gray-100 flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-3">Model Locked</h3>
                <p className="text-brand-slate mb-8">Unlock full access to the 3-Statement Financial Model and all 10 premium calculators.</p>
                {!showEmailGate ? (
                  <button onClick={() => setShowEmailGate(true)} className="btn btn-primary w-full text-lg py-4 shadow-xl">Unlock Premium Access</button>
                ) : (
                  <form onSubmit={handleSubscribe} className="w-full space-y-4">
                    <input type="email" placeholder="Enter your work email..." className="input w-full" value={email} onChange={e => setEmail(e.target.value)} required />
                    <button type="submit" disabled={loading} className="btn btn-primary w-full">{loading ? 'Verifying...' : 'Pay & Subscribe'}</button>
                    <button type="button" onClick={() => setShowEmailGate(false)} className="text-sm text-gray-500">Cancel</button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Glossary */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">3-Statement Model Glossary</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '📊', title: 'EBITDA', body: 'Earnings Before Interest, Taxes, Depreciation and Amortization. The closest proxy to operating cash generation. Institutional investors use EBITDA multiples (e.g., 8x EBITDA) to value businesses.' },
              { icon: '🔗', title: 'Linked Statements', body: 'The 3 statements are fundamentally linked: Net Income flows from the P&L into Retained Earnings on the Balance Sheet. CapEx flows from the P&L into the Cash Flow Statement and into Fixed Assets on the Balance Sheet.' },
              { icon: '📅', title: 'Days Sales Outstanding (DSO)', body: 'How long it takes to collect payment from customers. A high DSO means you are financing your customers which destroys cash. It is calculated as (Accounts Receivable / Revenue) × 365.' },
              { icon: '🏗️', title: 'Capital Expenditure (CapEx)', body: 'Long-term investments into physical assets (servers, factories, machinery). CapEx does NOT immediately hit the P&L. Instead it is Depreciated over many years, causing the real cash cost to be hidden from the Income Statement.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="space-y-2">
                <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">{icon}</span> {title}</h4>
                <p className="text-sm text-brand-slate leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
