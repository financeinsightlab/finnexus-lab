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

export default function SaaSCalc({ slug, isPremiumUser }: { slug: string; isPremiumUser?: boolean }) {
  // Inputs
  const [arpu, setArpu] = useState(100);
  const [margin, setMargin] = useState(85);
  const [churn, setChurn] = useState(2.5);
  const [cac, setCac] = useState(400);

  const [isLocked, setIsLocked] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Paywall / Gating Logic (Free Use Once)
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
        setIsLocked(true);
      }
    }
  }, [slug, isPremiumUser]);

  useEffect(() => {
    if (isPremiumUser || localStorage.getItem(`unlocked_${slug}`)) {
      setIsLocked(false);
    }
  }, [slug, isPremiumUser]);

  // Calculations
  const calculations = useMemo(() => {
    // Prevent division by zero
    const safeChurn = churn <= 0 ? 0.1 : churn;
    
    // LTV = (ARPU * Gross Margin) / Churn Rate
    const mGrossProfit = arpu * (margin / 100);
    const ltv = mGrossProfit / (safeChurn / 100);
    
    // Payback Period (Months)
    const payback = cac / mGrossProfit;
    
    // LTV : CAC Ratio
    const ltvCac = ltv / cac;

    // Generate Chart and Excel Data (36 months cohort retention and profit)
    const chartData = [];
    const rowMonths = [];
    const rowActiveCohort = [];
    const rowMonthlyRev = [];
    const rowGrossProfit = [];
    const rowCumProfit = [];
    
    let cumulativeProfit = -cac; // Start at loss (CAC)

    for (let month = 0; month <= 36; month++) {
      rowMonths.push(`Mo ${month}`);
      
      if (month === 0) {
        chartData.push({ month: `Month 0`, cumulativeProfit: -cac, breakeven: 0 });
        rowActiveCohort.push('100.0%');
        rowMonthlyRev.push(Math.round(arpu));
        rowGrossProfit.push(Math.round(mGrossProfit));
        rowCumProfit.push(Math.round(-cac));
      } else {
        const survivalRate = Math.pow(1 - (safeChurn / 100), month);
        const monthlyExpectedProfit = mGrossProfit * survivalRate;
        const expectedRevenue = arpu * survivalRate;
        
        cumulativeProfit += monthlyExpectedProfit;
        
        chartData.push({
          month: `Month ${month}`,
          cumulativeProfit: Math.round(cumulativeProfit),
          breakeven: 0
        });
        
        rowActiveCohort.push(`${(survivalRate * 100).toFixed(1)}%`);
        rowMonthlyRev.push(Math.round(expectedRevenue));
        rowGrossProfit.push(Math.round(monthlyExpectedProfit));
        rowCumProfit.push(Math.round(cumulativeProfit));
      }
    }

    let insightText = '';
    if (ltvCac < 1) {
      insightText = `Critical Warning: Your current unit economics demonstrate that you are severely losing money on every single customer acquired. Your Lifetime Value ($${Math.round(ltv)}) is actively lower than your Customer Acquisition Cost ($${cac}). This is an unsustainable growth model that will drain your runway. Your immediate and singular focus must be on radically altering your core engine: either by drastically increasing your pricing (ARPU), fixing the high churn rate of ${churn}%, or slashing your marketing acquisition spend. Attempting to scale sales right now will only accelerate cash burn and destroy enterprise value. We strongly recommend auditing your paid channels and shifting focus entirely to customer retention and organic growth before allocating another dollar to scale.`;
    } else if (ltvCac < 3) {
      insightText = `Needs Improvement: Your LTV:CAC ratio of ${ltvCac.toFixed(1)}x is positive, meaning you are technically profitable on a per-customer basis, but you are currently operating below the "Golden SaaS Benchmark" of 3.0x. This indicates a state of survival, not hyper-growth. Because your acquisition costs take ${payback.toFixed(1)} months to recover, scaling your marketing spend right now would be highly capital inefficient and trap too much cash in customer acquisition. You should focus your efforts on marginal optimizations: reducing your ${churn}% churn rate through better customer success initiatives, or experimenting with upsells to boost your average monthly revenue. Achieve a 3.0x ratio before aggressively raising capital or expanding ad spend.`;
    } else if (ltvCac >= 3 && payback <= 12) {
      insightText = `World-Class Health: Exceptional unit economics detected! With an LTV:CAC over 3.0x and a lightning-fast payback period of under 12 months (${payback.toFixed(1)} months), your growth engine is highly optimized. Every dollar you put into your marketing machine is generating $${ltvCac.toFixed(1)} in return, and you are recovering that initial cost rapidly. You have a definitive "green light" from a financial perspective to confidently accelerate your marketing budgets and hire more sales reps. At this stage, your biggest risk is under-spending and letting competitors capture your market share. Continue to monitor your ${churn}% churn rate as you scale to ensure cohort quality does not degrade with higher acquisition volume.`;
    } else {
      insightText = `Good Standing with Capital Constraints: Your expected lifetime value is strong at $${Math.round(ltv)}, providing a solid long-term profit margin per customer. However, your payback period is stretched to ${payback.toFixed(1)} months. This dynamic is completely acceptable for sticky Enterprise B2B SaaS where contracts take years to mature, but it is dangerous for SMB tools. Because it takes over a year to recover your $${cac} acquisition cost, scaling fast requires a massive upfront cash balance to absorb the temporary burn. Ensure you have significant venture backing or cash reserves safely secured to support this slow capital recovery cycle before leaning into targeted growth.`;
    }

    return { ltv, payback, ltvCac, chartData, insightText, rowMonths, rowActiveCohort, rowMonthlyRev, rowGrossProfit, rowCumProfit };
  }, [arpu, margin, churn, cac]);

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
        // Unlock permanently
        localStorage.setItem(`unlocked_${slug}`, 'true');
        setIsLocked(false);
        setShowEmailGate(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // If permanently unlocked previously
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
    <div className="min-h-screen bg-gray-50 py-10 relative">
      <div className="wrap max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <p className="text-teal-600 font-medium mb-2">Premium Web Calculator</p>
          <h1 className="text-3xl font-bold text-brand-navy">SaaS LTV/CAC & Unit Economics Model</h1>
          <p className="text-brand-slate">Simulate customer lifetime value, payback periods, and cohort profitability.</p>
        </div>

        {/* About Tool Box */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-brand-teal border border-gray-100 mb-8 flex gap-4 max-w-4xl">
          <div className="text-3xl pt-1">💡</div>
          <div>
            <h3 className="font-bold text-brand-navy mb-1">What this tool actually does</h3>
            <p className="text-sm text-brand-slate leading-relaxed">
              This calculator projects the fundamental unit economics of a subscription business. By modeling the relationship between how much a customer costs to acquire <strong>(CAC)</strong> and how much profit they generate over their lifetime <strong>(LTV)</strong> before canceling, this tool helps founders and investors answer a single critical question: <em>"Is it financially safe to scale my marketing spend right now?"</em>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 relative">
          
          {/* Inputs Sidebar */}
          <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
            <h3 className="font-bold text-brand-navy border-b pb-4">Assumptions</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-slate mb-1">ARPU (Monthly Avg Revenue)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input type="number" className="input w-full pl-8" value={arpu} onChange={e => setArpu(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate mb-1">Gross Margin (%)</label>
                <div className="relative">
                  <input type="number" className="input w-full pr-8" value={margin} onChange={e => setMargin(Number(e.target.value))} />
                  <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate mb-1">Monthly Churn Rate (%)</label>
                <div className="relative">
                  <input type="number" className="input w-full pr-8" step="0.1" value={churn} onChange={e => setChurn(Number(e.target.value))} />
                  <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate mb-1">CAC (Acquisition Cost)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input type="number" className="input w-full pl-8" value={cac} onChange={e => setCac(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </div>

          {/* Results Main Pane */}
          <div className={`lg:col-span-3 space-y-8 ${isLocked ? 'blur-md pointer-events-none select-none opacity-40' : ''} transition-all duration-700`}>
            
            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">Lifetime Value (LTV)</p>
                <h4 className="text-3xl font-bold text-brand-navy">${calculations.ltv.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
                <p className="text-xs text-brand-slate mt-2">Expected total gross profit per customer.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">LTV : CAC Ratio</p>
                <h4 className={`text-3xl font-bold ${calculations.ltvCac >= 3 ? 'text-green-600' : 'text-red-500'}`}>
                  {calculations.ltvCac.toFixed(1)}x
                </h4>
                <p className="text-xs text-brand-slate mt-2">Target &gt; 3.0x for healthy SaaS.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">CAC Payback Period</p>
                <h4 className="text-3xl font-bold text-brand-navy">{calculations.payback.toFixed(1)} <span className="text-lg font-normal">months</span></h4>
                <p className="text-xs text-brand-slate mt-2">Time required to recover acquisition cost.</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-brand-navy mb-6">Cumulative Profit per Customer (36 Mo. Cohort)</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calculations.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                    <XAxis dataKey="month" tick={{fontSize: 12}} tickMargin={10} minTickGap={30} />
                    <YAxis tickFormatter={(val) => `$${val}`} tick={{fontSize: 12}} width={80} />
                    <Tooltip 
                      formatter={(value: any) => [`$${value}`, 'Cumulative Profit']}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cumulativeProfit" 
                      stroke="#0d9488" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorProfit)" 
                    />
                    {/* Breakeven line exactly at 0 */}
                    <Line type="step" dataKey="breakeven" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-center text-gray-500 mt-4">Red dashed line represents the breakeven threshold ($0).</p>
            </div>

            {/* THE MASSIVE FULL M&A EXCEL SHEET DATA BLOCK */}
            <div className={`bg-white border border-gray-300 shadow-lg rounded-sm overflow-hidden relative w-full mb-8 font-sans`}>
              
              <div className="bg-[#107c41] text-white px-3 py-1 text-[11px] font-medium flex items-center gap-2 border-b border-[#0b542c]">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 3h20v4H2zm0 6h6v12H2zm8 0h12v3H10zm0 4.5h12v3H10zm0 4.5h12v3H10z"/>
                </svg>
                <span>SaaS_Cohort_LTV_Amortization_Schedule.xlsx</span>
              </div>
              
              <div className="bg-white border-b border-gray-300 px-3 py-1.5 text-[11px] text-gray-600 font-mono shadow-sm flex items-center gap-2">
                <span className="font-bold italic text-gray-400 select-none cursor-default px-1 hover:bg-gray-100 rounded">fx</span> 
                <div className="bg-white border border-blue-300 w-full px-2 py-0.5 text-black h-5 flex items-center shadow-inner">
                  =SUM(Expected_Monthly_Profit) - CAC
                </div>
              </div>

              <div className="overflow-x-auto w-full hide-scrollbar">
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
                    
                    <tr className="hover:bg-blue-50/30 group">
                      <ExcelRowIndex i="1" />
                      <td className="border border-gray-200 px-2 py-2 font-bold bg-white text-black pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">Active Cohort Target</td>
                      {calculations.rowActiveCohort.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono ${idx===0 ? 'text-blue-700 bg-yellow-50 font-bold' : 'text-gray-500'}`}>
                          {val}
                        </td>
                      ))}
                    </tr>
                    
                    <tr className="hover:bg-blue-50/30 group">
                      <ExcelRowIndex i="2" />
                      <td className="border border-gray-200 px-2 py-2 bg-white pl-3 text-gray-700 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">Risk-Adjusted Expected Revenue</td>
                      {calculations.rowMonthlyRev.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono text-gray-600 ${idx===0 ? 'text-blue-700 bg-yellow-50' : ''}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-blue-50/30 group bg-gray-50/50">
                      <ExcelRowIndex i="3" />
                      <td className="border border-gray-200 px-2 py-2 bg-gray-50 pl-3 font-semibold sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">Expected Monthly Gross Profit</td>
                      {calculations.rowGrossProfit.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono font-semibold text-black ${idx===0 ? 'text-blue-700 bg-yellow-50' : 'border-t border-t-gray-400'}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <ExcelRowIndex i="4" />
                      <td colSpan={38} className="border border-gray-200 bg-gray-100/50 py-1 sticky left-6 z-20"></td>
                    </tr>

                    <tr className="bg-[#eef3fb]">
                      <ExcelRowIndex i="5" />
                      <td className="border border-gray-200 px-2 py-2 font-extrabold uppercase pl-3 text-[11px] tracking-widest text-[#0b5c96] sticky left-6 z-20 shadow-inner">Cumulative Net Profit (CAC Recovery)</td>
                      {calculations.rowCumProfit.map((val, idx) => {
                        const isBreakeven = idx > 0 && calculations.rowCumProfit[idx-1] < 0 && val >= 0;
                        return (
                          <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono font-extrabold text-[13px] shadow-inner ${val < 0 ? 'text-red-500' : 'text-[#0b5c96]'} ${isBreakeven ? 'bg-green-100 border-2 border-green-500' : ''}`}>
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
            <div className="bg-brand-navy p-6 rounded-2xl shadow-lg relative overflow-hidden mt-8">
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
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-20">
              <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg text-center border border-gray-100 flex flex-col items-center">
                <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-3">Free Session Expired</h3>
                <p className="text-brand-slate mb-8">
                  You've used your free preview of the SaaS LTV/CAC Model. Subscribe now for permanent access to all 10 premium financial calculators and models.
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
                      {loading ? 'Verifying...' : 'Subscribe & Unlock'}
                    </button>
                    <button type="button" onClick={() => setShowEmailGate(false)} className="text-sm text-gray-500 mt-2 hover:text-gray-800">
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Educational Section - How to calculate terms */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Financial Glossary & Formulas</h2>
          <p className="text-brand-slate mb-8">Not from a finance background? No problem. Here is exactly what these assumptions mean and how to calculate them from your own business data before entering them into the tool.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">💰</span> Average Revenue Per User (ARPU)</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> The average amount of money a single active customer pays you every month.</p>
              <p className="text-sm text-brand-slate leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 font-mono">Formula: Total Monthly Recurring Revenue (MRR) / Total Active Customers</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">📉</span> Monthly Churn Rate</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> The percentage of your customers who cancel their subscription every month. A high churn rate acts like a hole in a bucket, destroying your long-term profits.</p>
              <p className="text-sm text-brand-slate leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 font-mono">Formula: (Customers Lost This Month / Customers at Start of Month) * 100</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">📊</span> Gross Margin %</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> The percentage of revenue left over after subtracting the direct costs of delivering your software (like AWS server hosting and direct support logic).</p>
              <p className="text-sm text-brand-slate leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 font-mono">Formula: ((Total Revenue - Cost of Goods Sold) / Total Revenue) * 100</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">🎯</span> Customer Acquisition Cost (CAC)</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> The total amount of money you spend on sales and marketing to acquire exactly one new paying customer.</p>
              <p className="text-sm text-brand-slate leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 font-mono">Formula: Total Sales & Marketing Spend / Number of New Customers Acquired</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
