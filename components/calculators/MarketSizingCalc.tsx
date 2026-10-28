'use client';

import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { runMarketSizing, parseMarketSizingInputs, marketSizingToQuery, MS_DEFAULTS, type MarketSizingInputs } from '@/lib/finance/market-sizing';

export default function MarketSizingCalc({ slug, isPremiumUser }: { slug: string; isPremiumUser?: boolean }) {
  // Market Parameters
  const [totalPopulation, setTotalPopulation] = useState(1_400_000_000);
  const [targetSegmentPercent, setTargetSegmentPercent] = useState(15);
  const [addressablePercent, setAddressablePercent] = useState(40);
  const [obtainablePercent, setObtainablePercent] = useState(5);
  const [avgRevenuePerUser, setAvgRevenuePerUser] = useState(5_000);
  const [marketGrowthRate, setMarketGrowthRate] = useState(18);

  // Bottom-Up Validation
  const [avgTransactionValue, setAvgTransactionValue] = useState(350);
  const [transactionsPerYear, setTransactionsPerYear] = useState(14);
  const [targetCustomers, setTargetCustomers] = useState(50_000);

  const [isLocked, setIsLocked] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (isPremiumUser) { setIsLocked(false); return; }
    const key = `used_tool_${slug}`;
    const firstUsed = localStorage.getItem(key);
    if (!firstUsed) { localStorage.setItem(key, Date.now().toString()); }
    else if (Date.now() - parseInt(firstUsed) > 30 * 60 * 1000) setIsLocked(false) /* dead client gate removed; server Paywall governs access */;
  }, [slug, isPremiumUser]);

  useEffect(() => {
    if (isPremiumUser || localStorage.getItem(`unlocked_${slug}`)) setIsLocked(false);
  }, [slug, isPremiumUser]);

  // Persistence via the tested engine codec.
  const AUTOSAVE_KEY = 'ka_ms_autosave_v1';
  const engineInputs: MarketSizingInputs = {
    totalPopulation, targetSegmentPct: targetSegmentPercent / 100, addressablePct: addressablePercent / 100,
    obtainablePct: obtainablePercent / 100, avgRevenuePerUser, marketGrowthRate: marketGrowthRate / 100,
    targetCustomers, avgTransactionValue, transactionsPerYear, projectionYears: 5,
  };
  const applyInputs = (i: MarketSizingInputs) => {
    setTotalPopulation(i.totalPopulation); setTargetSegmentPercent(i.targetSegmentPct * 100);
    setAddressablePercent(i.addressablePct * 100); setObtainablePercent(i.obtainablePct * 100);
    setAvgRevenuePerUser(i.avgRevenuePerUser); setMarketGrowthRate(i.marketGrowthRate * 100);
    setTargetCustomers(i.targetCustomers); setAvgTransactionValue(i.avgTransactionValue); setTransactionsPerYear(i.transactionsPerYear);
  };
  useEffect(() => {
    try {
      let base = MS_DEFAULTS;
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) base = parseMarketSizingInputs(JSON.parse(saved));
      const params = new URLSearchParams(window.location.search);
      if ([...params.keys()].length > 0) base = parseMarketSizingInputs(Object.fromEntries(params.entries()), base);
      applyInputs(base);
    } catch { /* keep defaults */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try { localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(engineInputs)); } catch { /* private mode */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPopulation, targetSegmentPercent, addressablePercent, obtainablePercent, avgRevenuePerUser, marketGrowthRate, avgTransactionValue, transactionsPerYear, targetCustomers]);
  const copyShareLink = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${marketSizingToQuery(engineInputs)}`); } catch { /* blocked */ }
    setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000);
  };

  const calculations = useMemo(() => {
    // Engine validates percentages honestly (no silent 0–100 clamping) and
    // derives users and money from ONE consistent assumption path.
    const engine = runMarketSizing(engineInputs);
    const tam = engine.tam ?? 0; const sam = engine.sam ?? 0; const som = engine.som ?? 0;
    const bottomUpRev = engine.bottomUpRevenue ?? 0;
    const projections = engine.projections.map((p) => ({ year: `Year ${p.year}`, TAM: Math.round(p.tam), SAM: Math.round(p.sam), SOM: Math.round(p.som) }));
    const convergenceRatio = engine.convergenceRatio ?? 0;
    const tamUsers = engine.tamUsers ?? 0; const samUsers = engine.samUsers ?? 0; const somUsers = engine.somUsers ?? 0;

    let insightText = '';
    if (convergenceRatio > 3) {
      insightText = `Top-Down / Bottom-Up Disconnect: Your Top-Down SOM (${formatNum(som)}) is ${convergenceRatio.toFixed(1)}x larger than your Bottom-Up Revenue estimate (${formatNum(bottomUpRev)}). This is a massive red flag. Investors will penalize you for it. Either your Top-Down Obtainable Market % (${obtainablePercent}%) is aggressively overstated, or your Bottom-Up plan for ${targetCustomers.toLocaleString()} customers needs to be dramatically expanded. Align the two methodologies before your pitch or expect hard questions.`;
    } else if (convergenceRatio < 0.5 && convergenceRatio > 0) {
      insightText = `Bottom-Up Ambition Exceeds Market: Your Bottom-Up Revenue plan (${formatNum(bottomUpRev)}) actually exceeds your estimated Top-Down SOM (${formatNum(som)}). This typically means you either need to raise your Obtainable Market % assumption OR you've underestimated the size of the addressable market. This is actually a great problem to have — you have identified demand that your TAM model is missing. Expand your market definition.`;
    } else {
      insightText = `Strong Market Sizing Convergence: Your Top-Down SOM (${formatNum(som)}) and Bottom-Up Revenue Plan (${formatNum(bottomUpRev)}) are within ${(Math.abs(1 - convergenceRatio) * 100).toFixed(0)}% of each other — this is institutional-quality market sizing. A convergence ratio this tight will give Tier-1 VCs very high confidence in your financial projections. The TAM grows to ${formatNum(projections[4]?.TAM ?? 0)} in Year 5 at a ${marketGrowthRate}% CAGR, strongly supporting an early Series A narrative.`;
    }

    return { tam, sam, som, bottomUpRev, projections, convergenceRatio, tamUsers, samUsers, somUsers, insightText, engine };
  }, [totalPopulation, targetSegmentPercent, addressablePercent, obtainablePercent, avgRevenuePerUser, marketGrowthRate, avgTransactionValue, transactionsPerYear, targetCustomers]);

  function formatNum(n: number) {
    // INR-first: this model sizes the India market (1.4B population default).
    if (n >= 1e12) return `₹${(n / 1e12).toFixed(2)} lakh-crore`;
    if (n >= 1e7) return `₹${(n / 1e7).toFixed(1)} crore`;
    if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} lakh`;
    if (n >= 1e3) return `₹${(n / 1e3).toFixed(0)}K`;
    return `₹${n}`;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tag: `unlocked_${slug}` }) });
      if (res.ok) { localStorage.setItem(`unlocked_${slug}`, 'true'); setIsLocked(false); setShowEmailGate(false); }
    } finally { setLoading(false); }
  };

  const COLORS = { TAM: '#1e3a5f', SAM: '#0d9488', SOM: '#f59e0b' };

  return (
    <div className="min-h-screen py-10 relative">
      <div className="content-page">
        <div className="mb-6">
          <p className="text-teal-600 font-medium mb-2">Premium Web Calculator</p>
          <h1 className="text-3xl font-bold text-brand-navy dark:text-white">Market Sizing Framework (TAM / SAM / SOM)</h1>
          <p className="text-brand-slate dark:text-slate-300">Institutional-grade Top-Down & Bottom-Up market estimation framework for investor pitches.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border-l-brand-teal border border-gray-100 mb-8 flex gap-4 max-w-4xl">
          <div className="text-3xl pt-1">💡</div>
          <div>
            <h3 className="font-bold text-brand-navy dark:text-white mb-1">What this tool actually does</h3>
            <p className="text-sm text-brand-slate dark:text-slate-300 leading-relaxed">
              Every VC pitch requires a rigorously defended TAM/SAM/SOM slide. This calculator builds two parallel estimates simultaneously — a Top-Down population funnel AND a Bottom-Up unit economics model — and then cross-validates both to ensure your market sizing is internally consistent. Mismatches instantly flag modeling errors before you get into the room.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button type="button" onClick={copyShareLink} className="btn-secondary text-sm">{linkCopied ? 'Link copied ✓' : 'Copy share link'}</button>
          <button type="button" onClick={() => applyInputs(MS_DEFAULTS)} className="btn-secondary text-sm">Reset</button>
          <span className="text-xs text-gray-500">Autosaves locally · percentages are validated, never silently clamped (audited fix)</span>
        </div>
        {calculations.engine.errors.length > 0 && (
          <div role="alert" className="mb-4 rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/40 p-4 text-sm text-red-800 dark:text-red-200"><ul className="list-disc pl-5">{calculations.engine.errors.map((e) => <li key={e}>{e}</li>)}</ul></div>
        )}
        {calculations.engine.warnings.length > 0 && (
          <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-900 dark:text-amber-200"><ul className="list-disc pl-5">{calculations.engine.warnings.map((w) => <li key={w}>{w}</li>)}</ul></div>
        )}

        <div className="grid lg:grid-cols-4 gap-8 relative">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24 z-20 space-y-4">
            <h3 className="font-bold text-brand-navy dark:text-white border-b pb-4">Market Assumptions</h3>
            <div className="bg-blue-50/50 -mx-6 px-6 py-4">
              <h4 className="font-bold text-blue-900 text-[11px] uppercase tracking-widest mb-3">Top-Down Parameters</h4>
              <div className="space-y-3">
                {[
                  { label: 'Total Addressable Population', val: totalPopulation, set: setTotalPopulation },
                  { label: 'Target Segment of Population %', val: targetSegmentPercent, set: setTargetSegmentPercent, suffix: '%' },
                  { label: 'Digitally Addressable (SAM) %', val: addressablePercent, set: setAddressablePercent, suffix: '%' },
                  { label: 'Realistically Obtainable (SOM) %', val: obtainablePercent, set: setObtainablePercent, suffix: '%' },
                  { label: 'Avg Revenue Per User / yr (ARPU)', val: avgRevenuePerUser, set: setAvgRevenuePerUser, prefix: '₹' },
                  { label: 'Annual Market Growth Rate %', val: marketGrowthRate, set: setMarketGrowthRate, suffix: '%' },
                ].map(({ label, val, set, prefix, suffix }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                    <div className="relative">
                      {prefix && <span className="absolute left-3 top-2 text-gray-400 text-sm">{prefix}</span>}
                      <input type="number" className={`input w-full py-1.5 text-sm ${prefix ? 'pl-7' : ''}`} value={val} onChange={e => set(Number(e.target.value))} />
                      {suffix && <span className="absolute right-3 top-2 text-gray-400 text-sm">{suffix}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 space-y-3">
              <h4 className="font-bold text-gray-800 text-xs border-b pb-1">Bottom-Up Validation</h4>
              {[
                { label: 'Avg Transaction Value ($)', val: avgTransactionValue, set: setAvgTransactionValue, prefix: '$' },
                { label: 'Transactions per Customer / Year', val: transactionsPerYear, set: setTransactionsPerYear },
                { label: 'Target # of Customers (Year 1)', val: targetCustomers, set: setTargetCustomers },
              ].map(({ label, val, set, prefix }) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                  <div className="relative">
                    {prefix && <span className="absolute left-3 top-2 text-gray-400 text-sm">{prefix}</span>}
                    <input type="number" className="input w-full py-1 text-sm bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" value={val} onChange={e => set(Number(e.target.value))} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className={`lg:col-span-3 space-y-8 ${isLocked ? 'blur-md pointer-events-none select-none opacity-40' : ''} transition-all duration-700`}>
            {/* TAM/SAM/SOM KPI Cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { label: 'TAM — Total Addressable Market', val: formatNum(calculations.tam), users: calculations.tamUsers, color: 'blue', desc: 'If you captured 100% of the target segment.' },
                { label: 'SAM — Serviceable Addressable', val: formatNum(calculations.sam), users: calculations.samUsers, color: 'teal', desc: `Digitally reachable ${addressablePercent}% of TAM.` },
                { label: 'SOM — Serviceable Obtainable', val: formatNum(calculations.som), users: calculations.somUsers, color: 'green', desc: `Realistic ${obtainablePercent}% market capture goal.` },
              ].map(({ label, val, users, color, desc }) => (
                <div key={label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                  <div className={`absolute -right-2 -top-2 w-20 h-20 rounded-full opacity-40 group-hover:scale-150 transition-transform bg-${color}-100`}></div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                    <h4 className="text-3xl font-extrabold text-brand-navy dark:text-white">{val}</h4>
                    <p className="text-xs text-brand-slate dark:text-slate-300 mt-1">{Math.round(users).toLocaleString()} potential users</p>
                    <p className="text-[10px] text-gray-400 mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Up Validation */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-brand-navy dark:text-white mb-4">Bottom-Up vs Top-Down Cross-Validation</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-xs font-bold text-yellow-800 uppercase tracking-widest mb-1">Top-Down SOM</p>
                  <p className="text-2xl font-bold text-brand-navy dark:text-white">{formatNum(calculations.som)}</p>
                </div>
                <div className="flex items-center justify-center text-gray-400 text-3xl font-thin">vs</div>
                <div className="text-center p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <p className="text-xs font-bold text-sky-800 uppercase tracking-widest mb-1">Bottom-Up Revenue</p>
                  <p className="text-2xl font-bold text-brand-navy dark:text-white">{formatNum(calculations.bottomUpRev)}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{targetCustomers.toLocaleString()} × ${avgTransactionValue} × {transactionsPerYear}x</p>
                </div>
              </div>
              <div className={`mt-4 p-3 rounded-lg text-sm text-center font-semibold ${Math.abs(1 - calculations.convergenceRatio) < 0.5 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {Math.abs(1 - calculations.convergenceRatio) < 0.5 ? '✅ Models Converge — Pitch-Ready Sizing' : `⚠️ Convergence Ratio ${calculations.convergenceRatio.toFixed(2)}x — Misalignment Detected`}
              </div>
            </div>

            {/* 5-Year Projection Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-brand-navy dark:text-white mb-6">5-Year TAM / SAM / SOM Growth at {marketGrowthRate}% CAGR</h3>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calculations.projections} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={v => v >= 1e9 ? `$${(v/1e9).toFixed(1)}B` : v >= 1e6 ? `$${(v/1e6).toFixed(0)}M` : `$${v}`} width={80} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: any) => formatNum(v)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }} />
                    <Bar dataKey="TAM" name="TAM" fill={COLORS.TAM} radius={[4, 4, 0, 0]} barSize={30} />
                    <Bar dataKey="SAM" name="SAM" fill={COLORS.SAM} radius={[4, 4, 0, 0]} barSize={30} />
                    <Bar dataKey="SOM" name="SOM" fill={COLORS.SOM} radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Excel Matrix */}
            <div className="bg-white dark:bg-slate-900 border border-gray-300 shadow-lg rounded-sm overflow-hidden">
              <div className="bg-success text-white px-3 py-1 text-[11px] font-medium flex items-center gap-2">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h20v4H2zm0 6h6v12H2zm8 0h12v3H10zm0 4.5h12v3H10zm0 4.5h12v3H10z"/></svg>
                <span>Market_Sizing_TAM_SAM_SOM_Framework.xlsx</span>
              </div>
              <div className="bg-white dark:bg-slate-900 border-b border-gray-300 px-3 py-1.5 text-[11px] flex items-center gap-2">
                <span className="font-bold italic text-gray-400 px-1">fx</span>
                <div className="bg-white dark:bg-slate-900 border border-blue-300 w-full px-2 py-0.5 h-5 flex items-center shadow-inner text-xs">=Population * Segment% * Addressable% * Obtainable% * ARPU</div>
              </div>
              <div className="horizontal-scroll-region w-full" role="region" aria-label="Market sizing model table" tabIndex={0} data-lenis-prevent>
                <table className="w-full text-[11px] whitespace-nowrap border-collapse select-text">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 border border-gray-300 w-8 sticky left-0"></th>
                      <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-bold text-gray-600 uppercase sticky left-6 z-30 min-w-[280px]">Market Sizing Parameter</th>
                      <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-center font-bold text-gray-600 uppercase">Current Year</th>
                      {calculations.projections.slice(1).map(p => (
                        <th key={p.year} className="border border-gray-300 bg-gray-100 px-4 py-2 text-center font-bold text-gray-600 uppercase">{p.year}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { i: '1', label: 'Total Population Analyzed', vals: [totalPopulation, ...calculations.projections.slice(1).map(p => totalPopulation)], fmt: (v: number) => v.toLocaleString() },
                      { i: '2', label: `Target Segment (${targetSegmentPercent}%)`, vals: [calculations.tamUsers, ...calculations.projections.slice(1).map(p => calculations.tamUsers)], fmt: (v: number) => Math.round(v).toLocaleString() },
                      { i: '3', label: `TAM — Total Addressable Market`, vals: calculations.projections.map(p => p.TAM), fmt: formatNum, highlight: 'blue', bold: true },
                      { i: '4', label: `SAM — Serviceable Addressable (${addressablePercent}% of TAM)`, vals: calculations.projections.map(p => p.SAM), fmt: formatNum, highlight: 'teal', bold: true },
                      { i: '5', label: `SOM — Serviceable Obtainable (${obtainablePercent}% of SAM)`, vals: calculations.projections.map(p => p.SOM), fmt: formatNum, highlight: 'gold', bold: true },
                    ].map(row => (
                      <tr key={row.i} className={`hover:bg-blue-50/30 group ${row.highlight === 'blue' ? 'bg-sky-50/20' : row.highlight === 'teal' ? 'bg-teal-50/20' : row.highlight === 'gold' ? 'bg-yellow-50/30' : ''}`}>
                        <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400 text-xs w-6 sticky left-0 z-20">{row.i}</td>
                        <td className={`border border-gray-200 dark:border-slate-700 px-3 py-2 sticky left-6 z-20 bg-white dark:bg-slate-900 ${row.bold ? 'font-bold text-gray-800' : 'text-gray-600'}`}>{row.label}</td>
                        {row.vals.map((v, vi) => (
                          <td key={vi} className={`border border-gray-200 dark:border-slate-700 px-3 py-2 text-right font-mono ${row.bold ? 'font-bold' : ''} ${row.highlight === 'blue' ? 'text-info' : row.highlight === 'teal' ? 'text-teal-700' : row.highlight === 'gold' ? 'text-yellow-700' : 'text-gray-700'}`}>
                            {row.fmt(v)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-brand-navy p-6 rounded-2xl shadow-lg relative overflow-hidden border-t-4 border-t-yellow-500">
              <h3 className="font-bold text-white mb-2 text-sm flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse"></span>
                VC Market Sizing Analyst Engine
              </h3>
              <p className="text-yellow-50 text-sm leading-relaxed pt-2 font-light">{calculations.insightText}</p>
            </div>
          </div>

          {isLocked && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pt-20">
              <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-2xl max-w-lg text-center border border-gray-100 flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-brand-navy dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-3">Model Locked</h3>
                <p className="text-brand-slate dark:text-slate-300 mb-8">Unlock the Market Sizing Framework and all 10 premium calculators.</p>
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

        <div className="mt-16 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-6">Market Sizing Glossary</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '🌍', title: 'TAM — Total Addressable Market', body: 'The maximum theoretical revenue opportunity if your solution captured 100% of the target segment. Do NOT confuse this with reality — TAM is a ceiling, not a target. An overstated TAM is the biggest red flag for experienced VCs.' },
              { icon: '🎯', title: 'SAM — Serviceable Addressable Market', body: 'The subset of TAM that your specific product, geography, and distribution model can realistically reach. If you are building for India, SAM excludes markets you cannot serve yet (US, EU, etc.).' },
              { icon: '🏆', title: 'SOM — Serviceable Obtainable Market', body: 'The realistic revenue target you can actually capture within the next 3–5 years given your current funding, team, and market position. SOM is the only number investors care about for near-term financial models.' },
              { icon: '🔄', title: 'ARPU — Average Revenue Per User', body: 'The average annualized revenue extracted from each paying customer. Multiplied by the estimated user pool, ARPU is the engine that converts "number of people" into "dollars of revenue" — the critical bridge between user count and market size.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="space-y-2">
                <h4 className="font-bold text-brand-navy dark:text-white text-lg flex items-center gap-2"><span className="text-2xl">{icon}</span> {title}</h4>
                <p className="text-sm text-brand-slate dark:text-slate-300 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
