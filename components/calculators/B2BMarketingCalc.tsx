'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function B2BMarketingCalc({ slug, isPremiumUser }: { slug: string; isPremiumUser?: boolean }) {
  // Inputs
  const [marketingSpend, setMarketingSpend] = useState(50000);
  const [totalLeads, setTotalLeads] = useState(500);
  const [sqlRate, setSqlRate] = useState(20);
  const [winRate, setWinRate] = useState(25);
  const [acv, setAcv] = useState(15000);

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
      if (msSinceFirstUse > 30 * 60 * 1000) { // 30 mins free session
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
    const safeLeads = totalLeads <= 0 ? 1 : totalLeads;
    
    const cpl = marketingSpend / safeLeads;
    const sqls = safeLeads * (sqlRate / 100);
    const closedWon = sqls * (winRate / 100);
    
    // Prevent division by zero if 0 won
    const blendedCac = closedWon > 0 ? marketingSpend / closedWon : marketingSpend;
    
    const revenue = closedWon * acv;
    const roi = marketingSpend > 0 ? ((revenue - marketingSpend) / marketingSpend) * 100 : 9999;

    // Funnel Data (Chart)
    const chartData = [
      { stage: 'Raw Leads', count: Math.round(safeLeads), fill: '#94a3b8' },
      { stage: 'Qualified (SQLs)', count: Math.round(sqls), fill: '#0ea5e9' },
      { stage: 'Closed Won', count: Math.round(closedWon), fill: '#0d9488' }
    ];

    // Excel Matrix Arrays
    const rowStages = ['Stage 1: Raw Traffic', 'Stage 2: Sales Qualified', 'Stage 3: Closed Won'];
    
    const rowVolume = [
      Math.round(safeLeads),
      Math.round(sqls),
      Math.round(closedWon)
    ];
    
    const rowConversion = [
      '100.0%',
      `${sqlRate.toFixed(1)}%`,
      `${winRate.toFixed(1)}%`
    ];

    const rowCpa = [
      Math.round(marketingSpend / safeLeads),
      Math.round(marketingSpend / (sqls || 1)),
      Math.round(blendedCac)
    ];

    const rowPipelineGross = [
      Math.round(safeLeads * acv), // Theoretical max if all won
      Math.round(sqls * acv), // Active pipeline before win rate discount
      Math.round(revenue) // Actual booked
    ];

    // Dynamic AI Analyst Diagnosis
    let insightText = '';
    
    if (roi < 0 || revenue < marketingSpend) {
      if (sqlRate >= 25 && winRate < 10) {
        insightText = `Sales Execution Failure: You are burning cash. Your Marketing team is actually generating a healthy volume of qualified leads (${sqlRate}% SQL Rate), but your Sales Reps are completely failing to close them (abysmal ${winRate}% Win Rate). The core problem is not at the top of the funnel. You must immediately pause top-of-funnel ad scale and ruthlessly audit your Sales team's objection handling, discovery processes, and closing mechanics. Every dollar spent on marketing right now is being wasted by poor sales execution.`;
      } else if (sqlRate < 10) {
        insightText = `Garbage Traffic Warning: Your pipeline is flooded with unqualified junk. While your Cost Per Lead might look cheap, Sales is rejecting over 90% of the leads marketing is generating. This indicates poor ad targeting, misaligned messaging, or incentivizing the wrong behavior (e.g. sweepstakes). Your sales team's time is being wasted sorting through low-intent prospects. Re-allocate your $${marketingSpend.toLocaleString()} budget away from volume-based lead generation and shift purely into Account-Based Marketing (ABM) or high-intent search channels.`;
      } else {
        insightText = `Dangerous Unit Economics: The fundamental math of your go-to-market engine is broken. Even with average conversion rates, your Blended CAC ($${Math.round(blendedCac).toLocaleString()}) massively exceeds the actual revenue ($${acv.toLocaleString()}) that a closed deal brings in. To fix this, you must either drastically raise your product pricing to support a high CAC, or totally abandon expensive paid acquisition and pivot toward organic, high-margin growth loops like SEO, virality, or partnerships.`;
      }
    } else {
      if (roi > 300) {
        insightText = `Elite Marketing Efficiency: This is a world-class growth engine. For every $1 you allocate to marketing, you are generating over $${(roi/100).toFixed(1)} in closed-won B2B revenue. With a highly efficient Blended CAC of just $${Math.round(blendedCac).toLocaleString()} capturing $${acv.toLocaleString()} contracts, you have established profound Product-Market Fit with a repeatable sales motion. Do not optimize this further; your singular priority should be securing aggressively more capital to hyper-scale this exact marketing spend before competitors adapt to your tactics.`;
      } else {
        insightText = `Profitable but Fragile: Your marketing pipeline is technically cash-flow positive, yielding an acceptable ${Math.round(roi)}% return on ad spend. However, your Blended CAC is sitting dangerously close to your Average Contract Value threshold. A slight increase in ad costs or a single bad month by your sales team could flip this entire engine into negative territory. Focus strictly on mid-funnel conversion rate optimization (CRO) and aggressive lifecycle email nurturing to boost your ${winRate}% Win Rate without spending more on top-of-funnel acquisition.`;
      }
    }

    return { 
      cpl, 
      sqls, 
      closedWon, 
      blendedCac, 
      revenue, 
      roi, 
      chartData, 
      insightText,
      rowStages,
      rowVolume,
      rowConversion,
      rowCpa,
      rowPipelineGross
    };
  }, [marketingSpend, totalLeads, sqlRate, winRate, acv]);

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
    <div className="min-h-screen bg-gray-50 py-10 relative">
      <div className="wrap max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <p className="text-teal-600 font-medium mb-2">Premium Web Calculator</p>
          <h1 className="text-3xl font-bold text-brand-navy">B2B Enterprise Marketing ROI & Pipeline Model</h1>
          <p className="text-brand-slate">Simulate ad-spend efficiency, sales funnel conversion drop-offs, and Blended CAC.</p>
        </div>

        {/* About Tool Box */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-brand-teal border border-gray-100 mb-8 flex gap-4 max-w-4xl">
          <div className="text-3xl pt-1">💡</div>
          <div>
            <h3 className="font-bold text-brand-navy mb-1">What this tool actually does</h3>
            <p className="text-sm text-brand-slate leading-relaxed">
              This financial mapping tool diagnoses the health of your B2B sales engine. By tracking performance from the very top of the funnel (Advertising Spend & Raw Leads) down through the sales team's closing ability (SQLs and Win Rates), this dashboard calculates your true <strong>Marketing Pipeline ROI</strong> and pinpoints exactly where revenue is leaking in your organization.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 relative">
          
          {/* Inputs Sidebar */}
          <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24 z-20">
            <h3 className="font-bold text-brand-navy border-b pb-4">Pipeline Inputs</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-slate mb-1">Monthly Marketing Spend</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input type="number" className="input w-full pl-8" value={marketingSpend} onChange={e => setMarketingSpend(Number(e.target.value))} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate mb-1">Total Leads Generated (#)</label>
                <input type="number" className="input w-full" value={totalLeads} onChange={e => setTotalLeads(Number(e.target.value))} />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate mb-1">Sales Qualified Rate (SQLs)</label>
                <div className="relative">
                  <input type="number" className="input w-full pr-8" step="1" value={sqlRate} onChange={e => setSqlRate(Number(e.target.value))} />
                  <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate mb-1">Sales Win Rate (%)</label>
                <div className="relative">
                  <input type="number" className="input w-full pr-8" step="1" value={winRate} onChange={e => setWinRate(Number(e.target.value))} />
                  <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-brand-slate mb-1">Avg Contract Value (ACV)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input type="number" className="input w-full pl-8" value={acv} onChange={e => setAcv(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </div>

          {/* Results Main Pane */}
          <div className={`lg:col-span-3 space-y-8 ${isLocked ? 'blur-md pointer-events-none select-none opacity-40' : ''} transition-all duration-700`}>
            
            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">New Monthly Revenue</p>
                <h4 className={`text-3xl font-bold ${calculations.revenue >= marketingSpend ? 'text-green-600' : 'text-red-500'}`}>
                  ${Math.round(calculations.revenue).toLocaleString()}
                </h4>
                <p className="text-xs text-brand-slate mt-2">Gross revenue from closed-won deals.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">Blended CAC</p>
                <h4 className="text-3xl font-bold text-brand-navy">
                  ${Math.round(calculations.blendedCac).toLocaleString()}
                </h4>
                <p className="text-xs text-brand-slate mt-2">Fully loaded cost to acquire one customer.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">Pipeline ROI</p>
                <h4 className={`text-3xl font-bold ${calculations.roi > 0 ? 'text-brand-navy' : 'text-orange-500'}`}>
                  {calculations.roi > 5000 ? '>5,000' : calculations.roi.toFixed(0)}%
                </h4>
                <p className="text-xs text-brand-slate mt-2">Gross marketing return on ad spend.</p>
              </div>
            </div>

            {/* Funnel Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative z-10">
              <h3 className="font-bold text-brand-navy mb-6">Sales Funnel Diagnostics (Volume Drop-Off)</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calculations.chartData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{fontSize: 13, fill: '#475569', fontWeight: 500}} />
                    <Tooltip 
                      formatter={(value: any, name: any, props: any) => {
                        return [Number(value).toLocaleString(), 'Volume Count'];
                      }}
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={50}>
                      {
                        calculations.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* THE MASSIVE FULL M&A EXCEL SHEET DATA BLOCK */}
            <div className={`bg-white border border-gray-300 shadow-lg rounded-sm overflow-hidden relative w-full mb-8 font-sans`}>
              
              <div className="bg-[#107c41] text-white px-3 py-1 text-[11px] font-medium flex items-center gap-2 border-b border-[#0b542c]">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 3h20v4H2zm0 6h6v12H2zm8 0h12v3H10zm0 4.5h12v3H10zm0 4.5h12v3H10z"/>
                </svg>
                <span>B2B_Pipeline_Conversion_Matrix.xlsx</span>
              </div>
              
              <div className="bg-white border-b border-gray-300 px-3 py-1.5 text-[11px] text-gray-600 font-mono shadow-sm flex items-center gap-2">
                <span className="font-bold italic text-gray-400 select-none cursor-default px-1 hover:bg-gray-100 rounded">fx</span> 
                <div className="bg-white border border-blue-300 w-full px-2 py-0.5 text-black h-5 flex items-center shadow-inner">
                  =(Volume_Count * ACV)
                </div>
              </div>

              <div className="overflow-x-auto w-full hide-scrollbar flex justify-start">
                <table className="text-[11px] whitespace-nowrap border-collapse select-text min-w-full">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 border-b-2 border-r border-gray-300 w-8 z-30 sticky left-0 shrink-0"></th>
                      <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-bold text-gray-600 font-sans tracking-tight text-[11px] uppercase whitespace-nowrap sticky left-6 z-30 min-w-[200px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                        Funnel Stage Metrics
                      </th>
                      {calculations.rowStages.map((m, i) => (
                        <ExcelHeader key={i} label={m} />
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    
                    <tr className="hover:bg-blue-50/30 group">
                      <ExcelRowIndex i="1" />
                      <td className="border border-gray-200 px-2 py-2 font-bold bg-white text-black pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">Unit Volume</td>
                      {calculations.rowVolume.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono ${idx===2 ? 'text-teal-700 bg-teal-50 font-bold' : ''}`}>
                          {val.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    
                    <tr className="hover:bg-blue-50/30 group">
                      <ExcelRowIndex i="2" />
                      <td className="border border-gray-200 px-2 py-2 bg-white pl-3 text-gray-700 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">Conversion % (from prev stage)</td>
                      {calculations.rowConversion.map((val, idx) => (
                        <td key={idx} className="border border-gray-200 px-2 py-2 text-right font-mono text-gray-500">
                          {val}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <ExcelRowIndex i="3" />
                      <td colSpan={4} className="border border-gray-200 bg-gray-100/50 py-1 sticky left-6 z-20"></td>
                    </tr>

                    <tr className="hover:bg-blue-50/30 group text-red-700">
                      <ExcelRowIndex i="4" />
                      <td className="border border-gray-200 px-2 py-2 bg-white pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">True Cost per Unit (CAC Build)</td>
                      {calculations.rowCpa.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono ${idx===2 ? 'font-bold' : ''}`}>
                          ${val.toLocaleString()}
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-[#eef3fb]">
                      <ExcelRowIndex i="5" />
                      <td className="border border-gray-200 px-2 py-2 font-extrabold uppercase pl-3 text-[11px] tracking-widest text-[#0b5c96] sticky left-6 z-20 shadow-inner">Total Pipeline Gross Value</td>
                      {calculations.rowPipelineGross.map((val, idx) => (
                        <td key={idx} className="border border-gray-200 px-2 py-2 text-right font-mono font-extrabold text-[13px] text-[#0b5c96] shadow-inner">
                          {idx === 2 ? (
                            <span className="border-b-2 border-double border-[#0b5c96] pb-0.5">
                              ${val.toLocaleString()}
                            </span>
                          ) : (
                            `$${val.toLocaleString()}`
                          )}
                        </td>
                      ))}
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Dynamic Summary Box */}
            <div className="bg-brand-navy p-6 rounded-2xl shadow-lg relative overflow-hidden mt-8 z-10">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
              </div>
              <h3 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-teal animate-pulse"></span>
                Dynamic Analyst Diagnosis
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {calculations.insightText}
              </p>
            </div>
            
          </div>

          {/* Paywall Overlay */}
          {isLocked && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pt-20">
              <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg text-center border border-gray-100 flex flex-col items-center relative z-50">
                <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-3">Free Session Expired</h3>
                <p className="text-brand-slate mb-8">
                  You've used your free preview of the B2B Marketing Model. Subscribe/Buy now to unlock permanent access to this tool and all 10 premium financial calculators.
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
                    <button type="button" onClick={() => setShowEmailGate(false)} className="text-sm text-gray-500 mt-2 hover:text-gray-800">
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Educational Glossary Section */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Marketing & Sales Glossary</h2>
          <p className="text-brand-slate mb-8">Understanding the complex mechanics of B2B enterprise pipeline conversion.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">🗑️</span> Sales Qualified Leads (SQLs)</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> Not every raw lead is actually a potential customer. SQLs are the subset of leads that the Sales team has manually vetted and agreed are worth dedicating human capital to chase. A low raw-to-SQL rate means Marketing is driving bad traffic.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">🤝</span> Win Rate</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> Of the fully qualified leads (SQLs) that the sales team pitches, what percentage actually sign the contract? This measures the pure execution and closing ability of the sales representatives.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">💸</span> Blended CAC</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> The Total Marketing Spend divided simply by the Total Closed Won Deals. It's "blended" because it ignores source attribution and just looks at the raw macro efficiency of the entire go-to-market engine.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">📈</span> Pipeline ROI</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> Pure marketing return. This measures exactly how much Gross Revenue your closed deals brought in compared strictly to what you spent on the marketing budget that quarter.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
