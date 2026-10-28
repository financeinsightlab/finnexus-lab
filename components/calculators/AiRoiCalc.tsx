'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { runAiRoi, parseAiRoiInputs, aiRoiToQuery, AI_ROI_DEFAULTS, type AiRoiInputs } from '@/lib/finance/ai-roi';

export default function AiRoiCalc({ slug, isPremiumUser }: { slug: string; isPremiumUser?: boolean }) {
  // Inputs
  const [humanSalary, setHumanSalary] = useState(85000);
  const [teamSize, setTeamSize] = useState(5);
  const [automationPercent, setAutomationPercent] = useState(40);
  const [aiMonthlyCost, setAiMonthlyCost] = useState(2000);
  const [capex, setCapex] = useState(15000);
  const [rampMonths, setRampMonths] = useState(0); // legacy: full savings from month 1
  const [realisationPct, setRealisationPct] = useState(100);
  const [linkCopied, setLinkCopied] = useState(false);

  const [isLocked, setIsLocked] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Paywall / Gating Logic
  useEffect(() => {
    if (isPremiumUser) {
      setIsLocked(false);
      return;
    }

    const key = `used_tool_${slug}`;
    const firstUsed = localStorage.getItem(key);
    
    if (!firstUsed) {
      localStorage.setItem(key, Date.now().toString());
    } else {
      const msSinceFirstUse = Date.now() - parseInt(firstUsed);
      if (msSinceFirstUse > 30 * 60 * 1000) { // 30 minutes free session
        setIsLocked(false) /* dead client gate removed; server Paywall governs access */;
      }
    }
  }, [slug, isPremiumUser]);

  useEffect(() => {
    if (isPremiumUser || localStorage.getItem(`unlocked_${slug}`)) {
      setIsLocked(false);
    }
  }, [slug, isPremiumUser]);

  // Persistence via the tested engine codec.
  const AUTOSAVE_KEY = 'ka_ai_roi_autosave_v1';
  const engineInputs: AiRoiInputs = {
    humanSalaryAnnual: humanSalary, teamSize, automationPct: automationPercent / 100,
    aiMonthlyCost, capex, horizonMonths: 36, rampMonths, savingsRealisationPct: realisationPct / 100,
  };
  const applyInputs = (i: AiRoiInputs) => {
    setHumanSalary(i.humanSalaryAnnual); setTeamSize(i.teamSize); setAutomationPercent(i.automationPct * 100);
    setAiMonthlyCost(i.aiMonthlyCost); setCapex(i.capex); setRampMonths(i.rampMonths);
    setRealisationPct(i.savingsRealisationPct * 100);
  };
  useEffect(() => {
    try {
      let base = AI_ROI_DEFAULTS;
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) base = parseAiRoiInputs(JSON.parse(saved));
      const params = new URLSearchParams(window.location.search);
      if ([...params.keys()].length > 0) base = parseAiRoiInputs(Object.fromEntries(params.entries()), base);
      applyInputs(base);
    } catch { /* keep defaults */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try { localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(engineInputs)); } catch { /* private mode */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [humanSalary, teamSize, automationPercent, aiMonthlyCost, capex, rampMonths, realisationPct]);
  const copyShareLink = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${aiRoiToQuery(engineInputs)}`); } catch { /* blocked */ }
    setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000);
  };

  // Calculations (delegated to lib/finance/ai-roi.ts)
  const calculations = useMemo(() => {
    const engine = runAiRoi(engineInputs);
    const humanCostPerMonth = engine.humanCostMonthly ?? 0;
    const netMonthlySavings = engine.netMonthlySavingsSteady ?? 0;
    const netAnnualSavings = engine.netSavingsYear1 ?? 0; // ramp-aware year-1 (honest)
    const roi = engine.roiYear1Pct ?? Infinity;
    const paybackMonths = netMonthlySavings > 0 ? capex / netMonthlySavings : Infinity;

    const chartData = engine.series.map((r) => ({ month: `Month ${r.month}`, humanCost: Math.round(r.cumulativeHumanCost), aiCost: Math.round(r.cumulativeAiScenarioCost) }));
    const rowMonths = engine.series.map((r) => `Mo ${r.month}`);
    const rowHumanStatusQuo = engine.series.map((r) => (r.month === 0 ? 0 : Math.round(humanCostPerMonth)));
    const rowAugmentedHumanPayroll = engine.series.map((r) => (r.month === 0 ? 0 : Math.round(humanCostPerMonth - (r.monthlyNet + aiMonthlyCost))));
    const rowAiSoftwareCost = engine.series.map((r) => (r.month === 0 ? 0 : Math.round(aiMonthlyCost)));
    const rowMonthlyCapexAmortization = engine.series.map((r) => (r.month === 0 ? `(${Math.round(capex).toLocaleString()})` : 0));
    const rowNetMonthlyDelta = engine.series.map((r) => Math.round(r.monthlyNet));
    const rowCumulativeNetPosition = engine.series.map((r) => Math.round(r.cumulativeNet));

    // Dynamic Analyst Summary
    let insightText = '';
    if (netMonthlySavings <= 0) {
      insightText = `Critical Warning: This AI deployment is actively wealth-destroying. The running software and API costs ($${aiMonthlyCost * 12}/yr) completely erase the theoretical human labor savings. Your Year 1 ROI is heavily negative. The specific "automation displacement" of ${automationPercent}% on your team of ${teamSize} is far too low to justify the running costs. You must either renegotiate your software vendor pricing dramatically downward, or find a higher-velocity workflow where the AI agent can augment >60% of human output. Do not deploy this capital under current assumptions.`;
    } else if (paybackMonths < 6) {
      insightText = `World-Class Deployment "No-Brainer": You have discovered an exceptionally profitable automation vector. By augmenting ${automationPercent}% of the output of your ${teamSize}-person team, you are effectively creating $${Math.round(netAnnualSavings).toLocaleString()} in pure net-new operating cash flow every year. Your aggressive payback period of just ${paybackMonths.toFixed(1)} months means this $${capex} project essentially pays for itself in the same fiscal half it is deployed. With a massive Year 1 ROI of ${Math.round(roi)}%, you have a definitive green light to immediately execute this deployment before labor constraints or macro-conditions shift. Scale this aggressively across other departments.`;
    } else if (paybackMonths <= 18) {
      insightText = `Strong Operating Leverage: This AI integration represents a highly sound strategic investment with an acceptable capital recovery profile. Expanding your operational leverage by automating ${automationPercent}% of the workload will result in $${Math.round(netAnnualSavings).toLocaleString()} in net annual savings. The ${paybackMonths.toFixed(1)}-month payback timeline is directly in line with traditional enterprise software amortization standards. While it requires tying up $${capex} upfront, the Year 1 ROI of ${Math.round(roi)}% proves that this technology transition will yield a permanently lower baseline operating cost. Proceed to the pilot phase.`;
    } else {
      insightText = `Marginal Efficiency Play: The underlying unit economics here are positive, but the capital velocity is sluggish. It will take a lengthy ${paybackMonths.toFixed(1)} months just to recover your initial $${capex} implementation cost. This long-tail payback means you are exposing yourself to significant technology risk—the AI models you are purchasing today may become obsolete or incredibly cheap by the time you finally break even. Re-evaluate your upfront Capex quote with implementation consultants, or target a smaller initial wedge that requires less upfront capital deployment.`;
    }

    return { 
      netAnnualSavings, 
      roi, 
      paybackMonths, 
      chartData, 
      insightText,
      netMonthlySavings,
      rowMonths,
      rowHumanStatusQuo,
      rowAugmentedHumanPayroll,
      rowAiSoftwareCost,
      rowMonthlyCapexAmortization,
      rowNetMonthlyDelta,
      rowCumulativeNetPosition,
      engine
    };
  }, [humanSalary, teamSize, automationPercent, aiMonthlyCost, capex, rampMonths, realisationPct]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag: `unlocked_${slug}` }),
      });
      if (response.ok) {
        localStorage.setItem(`unlocked_${slug}`, 'true');
        setIsLocked(false);
        setShowEmailGate(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPremiumUser || localStorage.getItem(`unlocked_${slug}`)) {
      setIsLocked(false);
    }
  }, [slug, isPremiumUser]);

  // Excel Cell Helper
  const ExcelHeader = ({ label }: { label: string }) => (
    <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-center font-bold text-gray-600 font-sans tracking-tight text-[11px] uppercase whitespace-nowrap">
      {label}
    </th>
  );
  const ExcelRowIndex = ({ i }: { i: string }) => (
    <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400 font-sans text-xs w-6 shadow-sm border-r-2 border-r-gray-300 sticky left-0 z-20">
      {i}
    </td>
  );

  return (
    <div className="min-h-screen py-10 relative">
      <div className="content-page">
        
        {/* Header */}
        <div className="mb-6">
          <p className="text-teal-600 font-medium mb-2">Premium Web Calculator</p>
          <h1 className="text-3xl font-bold text-brand-navy dark:text-white">Enterprise AI & Automation ROI Model</h1>
          <p className="text-brand-slate dark:text-slate-300">Simulate the cost-displacement and capital velocity of employing AI Agents versus Human Capital.</p>
        </div>

        {/* About Tool Box */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border-l-4 border-l-brand-teal border border-gray-100 mb-8 flex gap-4 max-w-4xl">
          <div className="text-3xl pt-1">💡</div>
          <div>
            <h3 className="font-bold text-brand-navy dark:text-white mb-1">What this tool actually does</h3>
            <p className="text-sm text-brand-slate dark:text-slate-300 leading-relaxed">
              This financial model helps CFOs and founders determine exactly how much capital they will save by deploying AI agents into their workforce. By comparing the <strong>"Human Status Quo"</strong> cost against the newly augmented <strong>"AI + Human"</strong> cost base, this tool reveals your true ROI, net cost displacement, and how quickly your upfront implementation costs (Capex) will be safely recovered.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button type="button" onClick={copyShareLink} className="btn-secondary text-sm">{linkCopied ? 'Link copied ✓' : 'Copy share link'}</button>
          <button type="button" onClick={() => applyInputs(AI_ROI_DEFAULTS)} className="btn-secondary text-sm">Reset</button>
          <span className="text-xs text-gray-500">Autosaves locally · ramp-aware payback: {calculations.engine.paybackMonth !== null ? `month ${calculations.engine.paybackMonth}` : 'never within 36mo'}</span>
        </div>
        {calculations.engine.errors.length > 0 && (
          <div role="alert" className="mb-4 rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/40 p-4 text-sm text-red-800 dark:text-red-200"><ul className="list-disc pl-5">{calculations.engine.errors.map((e) => <li key={e}>{e}</li>)}</ul></div>
        )}
        {calculations.engine.warnings.length > 0 && (
          <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-900 dark:text-amber-200"><ul className="list-disc pl-5">{calculations.engine.warnings.map((w) => <li key={w}>{w}</li>)}</ul></div>
        )}

        <div className="grid lg:grid-cols-4 gap-8 relative">
          
          {/* Inputs Sidebar */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24 z-20">
            <h3 className="font-bold text-brand-navy dark:text-white border-b pb-4">Assumptions</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-slate dark:text-slate-300 mb-1">Human Salary (Loaded)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input type="number" className="input w-full pl-8" value={humanSalary} onChange={e => setHumanSalary(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate dark:text-slate-300 mb-1">Employees Affected (#)</label>
                <input type="number" className="input w-full" value={teamSize} onChange={e => setTeamSize(Number(e.target.value))} />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate dark:text-slate-300 mb-1">Productivity Automation</label>
                <div className="relative">
                  <input type="number" className="input w-full pr-8" step="1" value={automationPercent} onChange={e => setAutomationPercent(Number(e.target.value))} />
                  <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-brand-slate dark:text-slate-300 mb-1">AI Agent Mthly Cost</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input type="number" className="input w-full pl-8" value={aiMonthlyCost} onChange={e => setAiMonthlyCost(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate dark:text-slate-300 mb-1">Upfront Capex (Setup)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input type="number" className="input w-full pl-8" value={capex} onChange={e => setCapex(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate dark:text-slate-300 mb-1">Adoption Ramp (months to full savings, 0 = instant)</label>
                <input type="number" className="input w-full" step="1" value={rampMonths} onChange={e => setRampMonths(Number(e.target.value))} />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate dark:text-slate-300 mb-1">Savings Realisation % (time saved → cash saved)</label>
                <div className="relative">
                  <input type="number" className="input w-full pr-8" step="1" value={realisationPct} onChange={e => setRealisationPct(Number(e.target.value))} />
                  <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Main Pane */}
          <div className={`lg:col-span-3 space-y-8 ${isLocked ? 'blur-md pointer-events-none select-none opacity-40' : ''} transition-all duration-700`}>
            
            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">Net Annual Savings</p>
                <h4 className={`text-3xl font-bold ${calculations.netAnnualSavings > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  ${Math.round(calculations.netAnnualSavings).toLocaleString()}
                </h4>
                <p className="text-xs text-brand-slate dark:text-slate-300 mt-2">Cash velocity generated per year.</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">Gross Return on CAPEX</p>
                <h4 className={`text-3xl font-bold ${calculations.roi > 50 ? 'text-brand-navy dark:text-white' : 'text-orange-500'}`}>
                  {calculations.roi > 5000 ? '>5,000' : calculations.roi.toFixed(0)}%
                </h4>
                <p className="text-xs text-brand-slate dark:text-slate-300 mt-2">Gross annual return on the initial implementation cost.</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">Breakeven Timeline</p>
                <h4 className="text-3xl font-bold text-brand-navy dark:text-white">
                  {calculations.paybackMonths > 120 ? 'Never' : calculations.paybackMonths.toFixed(1)} <span className="text-lg font-normal">months</span>
                </h4>
                <p className="text-xs text-brand-slate dark:text-slate-300 mt-2">Time to fully recover upfront investment.</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 relative z-10">
              <h3 className="font-bold text-brand-navy dark:text-white mb-6">Cumulative Operations Cost: Human vs AI Augmented</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calculations.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                    <XAxis dataKey="month" tick={{fontSize: 12}} tickMargin={10} minTickGap={30} />
                    <YAxis tickFormatter={(val) => `$${(val/1000)}k`} tick={{fontSize: 12}} width={80} />
                    <Tooltip 
                      formatter={(value: any, name: any) => {
                        const formatted = `$${Number(value).toLocaleString()}`;
                        return [formatted, name === 'humanCost' ? 'Human Status Quo' : 'AI Augmented Cost'];
                      }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="humanCost" stroke="#94a3b8" fillOpacity={1} fill="url(#colorHuman)" strokeWidth={2} />
                    <Area type="monotone" dataKey="aiCost" stroke="#0d9488" fillOpacity={1} fill="url(#colorAi)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-center text-gray-500 mt-4">The gap between the gray (Human Status Quo) and teal (AI Augmented) areas represents total cash saved.</p>
            </div>

            {/* THE MASSIVE FULL M&A EXCEL SHEET DATA BLOCK */}
            <div className={`bg-white dark:bg-slate-900 border border-gray-300 shadow-lg rounded-sm overflow-hidden relative w-full mb-8 font-sans`}>
              
              <div className="bg-success text-white px-3 py-1 text-[11px] font-medium flex items-center gap-2 border-b border-success">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 3h20v4H2zm0 6h6v12H2zm8 0h12v3H10zm0 4.5h12v3H10zm0 4.5h12v3H10z"/>
                </svg>
                <span>AI_Deployment_Capex_Amortization.xlsx</span>
              </div>
              
              <div className="bg-white dark:bg-slate-900 border-b border-gray-300 px-3 py-1.5 text-[11px] text-gray-600 font-mono shadow-sm flex items-center gap-2">
                <span className="font-bold italic text-gray-400 select-none cursor-default px-1 hover:bg-gray-100 rounded">fx</span> 
                <div className="bg-white dark:bg-slate-900 border border-blue-300 w-full px-2 py-0.5 text-black h-5 flex items-center shadow-inner">
                  =(Human_Status_Quo) - (Augmented_Payroll + API_Software_Cost)
                </div>
              </div>

              <div className="horizontal-scroll-region w-full" role="region" aria-label="AI return model table" tabIndex={0} data-lenis-prevent>
                <table className="w-full text-[11px] whitespace-nowrap border-collapse min-w-[3000px] select-text">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 border-b-2 border-r border-gray-300 w-8 z-30 sticky left-0 shrink-0"></th>
                      <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-bold text-gray-600 font-sans tracking-tight text-[11px] uppercase whitespace-nowrap sticky left-6 z-30 min-w-[200px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                        Financial Line Item
                      </th>
                      {calculations.rowMonths.map((m, i) => (
                        <ExcelHeader key={i} label={m} />
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    
                    <tr className="hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white/50 group bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white/50">
                      <ExcelRowIndex i="1" />
                      <td className="border border-gray-200 dark:border-slate-700 px-2 py-2 font-bold bg-white dark:bg-slate-900 text-gray-700 pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white/0">Human Baseline (Status Quo)</td>
                      {calculations.rowHumanStatusQuo.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 dark:border-slate-700 px-2 py-2 text-right font-mono ${idx===0 ? 'text-blue-700 bg-yellow-50 font-bold' : 'text-gray-500'}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <ExcelRowIndex i="2" />
                      <td colSpan={38} className="border border-gray-200 dark:border-slate-700 bg-gray-100/50 py-1 sticky left-6 z-20"></td>
                    </tr>
                    
                    <tr className="hover:bg-blue-50/30 group">
                      <ExcelRowIndex i="3" />
                      <td className="border border-gray-200 dark:border-slate-700 px-2 py-2 bg-white dark:bg-slate-900 pl-3 text-brand-navy dark:text-white font-bold sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">Augmented Human Payroll</td>
                      {calculations.rowAugmentedHumanPayroll.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 dark:border-slate-700 px-2 py-2 text-right font-mono text-gray-600 ${idx===0 ? 'text-blue-700 bg-yellow-50' : ''}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-blue-50/30 group">
                      <ExcelRowIndex i="4" />
                      <td className="border border-gray-200 dark:border-slate-700 px-2 py-2 bg-white dark:bg-slate-900 pl-3 text-teal-700 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">AI API Server Constraints</td>
                      {calculations.rowAiSoftwareCost.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 dark:border-slate-700 px-2 py-2 text-right font-mono text-gray-600 ${idx===0 ? 'text-blue-700 bg-yellow-50' : ''}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-blue-50/30 group text-red-600">
                      <ExcelRowIndex i="5" />
                      <td className="border border-gray-200 dark:border-slate-700 px-2 py-2 bg-white dark:bg-slate-900 pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">Capex Deployment (One-Time)</td>
                      {calculations.rowMonthlyCapexAmortization.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 dark:border-slate-700 px-2 py-2 text-right font-mono ${idx===0 ? 'text-blue-700 bg-yellow-50 font-bold' : ''}`}>
                          {val === 0 ? '-' : val}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <ExcelRowIndex i="6" />
                      <td colSpan={38} className="border border-gray-200 dark:border-slate-700 bg-gray-100/50 py-1 sticky left-6 z-20"></td>
                    </tr>

                    <tr className="hover:bg-blue-50/30 group bg-yellow-50/20">
                      <ExcelRowIndex i="7" />
                      <td className="border border-gray-200 dark:border-slate-700 px-2 py-2 bg-yellow-50/30 pl-3 font-semibold text-black sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0 border-t-2 border-t-gray-400">Net Monthly Savings Delta (-Loss / +Created)</td>
                      {calculations.rowNetMonthlyDelta.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 dark:border-slate-700 px-2 py-2 text-right font-mono font-semibold ${val < 0 ? 'text-red-500' : 'text-green-600'} ${idx===0 ? 'text-blue-700 bg-yellow-50' : 'border-t-2 border-t-gray-400'}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-surface-muted">
                      <ExcelRowIndex i="8" />
                      <td className="border border-gray-200 dark:border-slate-700 px-2 py-2 font-extrabold uppercase pl-3 text-[11px] tracking-widest text-info sticky left-6 z-20 shadow-inner">Cumulative ROI Position</td>
                      {calculations.rowCumulativeNetPosition.map((val, idx) => {
                        const isBreakeven = idx > 0 && calculations.rowCumulativeNetPosition[idx-1] < 0 && val >= 0;
                        return (
                          <td key={idx} className={`border border-gray-200 dark:border-slate-700 px-2 py-2 text-right font-mono font-extrabold text-[13px] shadow-inner ${val < 0 ? 'text-red-500' : 'text-info'} ${isBreakeven ? 'bg-green-100 border-2 border-green-500 text-green-700' : ''}`}>
                            <span className="border-b-2 border-double border-current pb-0.5">
                              {typeof val === 'number' ? Math.round(val).toLocaleString() : val}
                            </span>
                          </td>
                        )
                      })}
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Dynamic Summary Box (Moved below chart) */}
            <div className="bg-brand-navy p-6 rounded-2xl shadow-lg relative overflow-hidden mt-8 z-10">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
              </div>
              <h3 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-teal animate-pulse"></span>
                Dynamic Analyst Summary
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {calculations.insightText}
              </p>
            </div>
            
          </div>

          {/* Paywall Overlay */}
          {isLocked && (
            <div className="paywall-overlay absolute inset-0 z-50 flex flex-col items-center justify-center pt-20">
              <div className="paywall-panel ui-scroll-region w-full bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl shadow-2xl max-w-lg text-center border border-gray-100 relative z-50" data-lenis-prevent>
                <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-3">Free Session Expired</h3>
                <p className="text-brand-slate dark:text-slate-300 mb-8">
                  You've used your free preview of the AI Agent ROI Calculator. Subscribe/Buy now to unlock permanent access to this tool and all 10 premium financial models.
                </p>
                
                {!showEmailGate ? (
                  <button onClick={() => setShowEmailGate(true)} className="btn btn-primary w-full text-lg py-4">
                    Unlock Premium Access
                  </button>
                ) : (
                  <form onSubmit={handleSubscribe} className="w-full space-y-4">
                    <input 
                      type="email" 
                      placeholder="Enter your work email..." 
                      className="input w-full"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" disabled={loading} className="btn btn-primary w-full shadow-lg shadow-brand-teal/30">
                      {loading ? 'Verifying...' : 'Pay & Subscribe Access'}
                    </button>
                    <button type="button" onClick={() => setShowEmailGate(false)} className="text-sm text-gray-500 mt-2 hover:text-content-primary">
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Educational Glossary Section */}
        <div className="mt-16 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-6">Financial Glossary & Formulas</h2>
          <p className="text-brand-slate dark:text-slate-300 mb-8">Understanding the enterprise math driving this AI displacement calculator.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy dark:text-white text-lg flex items-center gap-2"><span className="text-2xl">👷</span> Fully Loaded Cost</h4>
              <p className="text-sm text-brand-slate dark:text-slate-300 leading-relaxed"><strong>What it is:</strong> A worker costs far more than their base salary. Once you add health insurance, employment taxes, 401k matches, and software licenses, an employee's "fully loaded cost" is roughly 1.25x to 1.4x of their base pay.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy dark:text-white text-lg flex items-center gap-2"><span className="text-2xl">⚙️</span> Productivity Displacement</h4>
              <p className="text-sm text-brand-slate dark:text-slate-300 leading-relaxed"><strong>What it is:</strong> If an AI agent makes a 5-person team 40% faster, the company just acquired the productive output of 2 entire extra humans without hiring them. The financial value created is exactly 40% of the total human payroll offset by the software costs.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy dark:text-white text-lg flex items-center gap-2"><span className="text-2xl">🏗️</span> implementation Capex</h4>
              <p className="text-sm text-brand-slate dark:text-slate-300 leading-relaxed"><strong>What it is:</strong> Capital Expenditure. This is the massive, one-time upfront cost required to build, securely train, and implement AI pipelines inside your enterprise (often paying agencies or consulting firms to set it up).</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy dark:text-white text-lg flex items-center gap-2"><span className="text-2xl">🚀</span> Gross Return on CAPEX (ROI)</h4>
              <p className="text-sm text-brand-slate dark:text-slate-300 leading-relaxed"><strong>What it is:</strong> The ultimate CFO metric. It measures how much pure cash your upfront Capital Expenditure generated in a single year.</p>
              <p className="text-sm text-brand-slate dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white p-3 rounded-lg border border-gray-100 font-mono">Formula: (Net Annual Savings / Capex) * 100</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
