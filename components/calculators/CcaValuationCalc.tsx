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
  Legend,
  Cell
} from 'recharts';

export default function CcaValuationCalc({ slug, isPremiumUser }: { slug: string; isPremiumUser?: boolean }) {
  // Target Company Inputs
  const [targetRev, setTargetRev] = useState(50);
  const [targetEbitda, setTargetEbitda] = useState(12);
  const [targetNetDebt, setTargetNetDebt] = useState(15);
  const [targetShares, setTargetShares] = useState(10);
  const [privateDiscount, setPrivateDiscount] = useState(25);

  // Peer A (High Growth Leader)
  const [peerAMc, setPeerAMc] = useState(800);
  const [peerADebt, setPeerADebt] = useState(50);
  const [peerARev, setPeerARev] = useState(100);
  const [peerAEbitda, setPeerAEbitda] = useState(20);

  // Peer B (Stable Mid-Market)
  const [peerBMc, setPeerBMc] = useState(400);
  const [peerBDebt, setPeerBDebt] = useState(100);
  const [peerBRev, setPeerBRev] = useState(80);
  const [peerBEbitda, setPeerBEbitda] = useState(15);

  // Peer C (Mature Laggard)
  const [peerCMc, setPeerCMc] = useState(200);
  const [peerCDebt, setPeerCDebt] = useState(20);
  const [peerCRev, setPeerCRev] = useState(60);
  const [peerCEbitda, setPeerCEbitda] = useState(10);

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
      if (msSinceFirstUse > 30 * 60 * 1000) { 
        setIsLocked(true);
      }
    }
  }, [slug, isPremiumUser]);

  // Calculations
  const calculations = useMemo(() => {
    // Helper to calculate EV and Multiples securely
    const calcPeer = (mc: number, debt: number, rev: number, ebitda: number) => {
      const ev = mc + debt;
      const evRev = rev > 0 ? ev / rev : 0;
      const evEbitda = ebitda > 0 ? ev / ebitda : 0;
      return { ev, evRev, evEbitda };
    };

    const peerA = calcPeer(peerAMc, peerADebt, peerARev, peerAEbitda);
    const peerB = calcPeer(peerBMc, peerBDebt, peerBRev, peerBEbitda);
    const peerC = calcPeer(peerCMc, peerCDebt, peerCRev, peerCEbitda);

    const evRevArray = [peerA.evRev, peerB.evRev, peerC.evRev].sort((a,b)=>a-b);
    const evEbitdaArray = [peerA.evEbitda, peerB.evEbitda, peerC.evEbitda].sort((a,b)=>a-b);

    const meanEvRev = (peerA.evRev + peerB.evRev + peerC.evRev) / 3;
    const meanEvEbitda = (peerA.evEbitda + peerB.evEbitda + peerC.evEbitda) / 3;
    
    // Median is the middle element of the sorted 3-item array
    const medianEvRev = evRevArray[1];
    const medianEvEbitda = evEbitdaArray[1];

    // Valuation Output
    const targetEvFromRev = targetRev * medianEvRev;
    const targetEvFromEbitda = targetEbitda * medianEvEbitda;
    
    // Blended EV (50% Rev Multiple, 50% EBITDA Multiple)
    const blendedEv = (targetEvFromRev + targetEvFromEbitda) / 2;
    
    // Apply Liquidity Discount
    const discountedEv = blendedEv * (1 - (privateDiscount / 100));

    // Equity Bridge
    const impliedEquityValue = discountedEv - targetNetDebt;
    const impliedSharePrice = targetShares > 0 ? impliedEquityValue / targetShares : 0;

    // Charting Data
    const chartData = [
      { name: 'Peer A (Fast Growth)', evEbitda: Number(peerA.evEbitda.toFixed(1)), evRev: Number(peerA.evRev.toFixed(1)) },
      { name: 'Peer B (Average Match)', evEbitda: Number(peerB.evEbitda.toFixed(1)), evRev: Number(peerB.evRev.toFixed(1)) },
      { name: 'Peer C (Laggard)', evEbitda: Number(peerC.evEbitda.toFixed(1)), evRev: Number(peerC.evRev.toFixed(1)) },
      { name: 'Median Target', evEbitda: Number(medianEvEbitda.toFixed(1)), evRev: Number(medianEvRev.toFixed(1)) }
    ];

    // Excel Matrix Rows
    const excelComps = [
      { name: 'Competitor A', mc: peerAMc, debt: peerADebt, ev: peerA.ev, rev: peerARev, ebitda: peerAEbitda, evRev: peerA.evRev, evEbitda: peerA.evEbitda },
      { name: 'Competitor B', mc: peerBMc, debt: peerBDebt, ev: peerB.ev, rev: peerBRev, ebitda: peerBEbitda, evRev: peerB.evRev, evEbitda: peerB.evEbitda },
      { name: 'Competitor C', mc: peerCMc, debt: peerCDebt, ev: peerC.ev, rev: peerCRev, ebitda: peerCEbitda, evRev: peerC.evRev, evEbitda: peerC.evEbitda },
    ];

    // Analyst Summary
    let insightText = '';
    const discountAmount = blendedEv - discountedEv;
    const multipleSpread = evEbitdaArray[2] - evEbitdaArray[0];

    if (multipleSpread > 15) {
      insightText = `Volatile Peer Group Warning: Your selected peers have a massive ${multipleSpread.toFixed(1)}x spread between the highest and lowest EV/EBITDA multiple. This indicates these companies operate in wildly different margin structures or growth trajectories, breaking the core principle of a "Comparable" analysis. We forcibly applied the Median EV/EBITDA (${medianEvEbitda.toFixed(1)}x) to filter out the outliers, resulting in an Implied Target Enterprise Value of $${Math.round(discountedEv).toLocaleString()}M. We recommend replacing the highest and lowest peers to tighten the grouping.`;
    } else if (impliedEquityValue <= 0) {
      insightText = `Insolvent Valuation Detected: Based on the industry median EV/EBITDA multiple of ${medianEvEbitda.toFixed(1)}x, your Subject Company's Enterprise Value ($${Math.round(discountedEv)}M) is physically lower than its outstanding Net Debt load ($${targetNetDebt}M). This means the Equity Value of the business is $0.00 and the company is functionally insolvent. You must either rapidly pay down debt, aggressively expand EBITDA, or restructure to avoid bankruptcy.`;
    } else if (privateDiscount >= 30) {
      insightText = `Heavy Liquidity Penalty: You are applying a massive ${privateDiscount}% Private Company Illiquidity Discount. While stripping $${Math.round(discountAmount)}M off your Enterprise Value protects the buyer from the risk of holding private stock, it severely damages the Founder's buyout returns. If you want to achieve closer to the public market multiple of ${medianEvEbitda.toFixed(1)}x, you must focus on improving the target's financial reporting standards and customer concentration to reduce the perceived private market risk before entering M&A talks.`;
    } else {
      insightText = `Stable Trading Benchmark: We have established a firm mathematical baseline for M&A negotiations. By analyzing the market's current premium on Peer B and C, we derived a median industry EV/EBITDA multiple of ${medianEvEbitda.toFixed(1)}x. Applying this to your Target's $${targetEbitda}M EBITDA, and safely deducting the ${privateDiscount}% illiquidity discount, we arrive at a defensible $${Math.round(discountedEv)}M Enterprise Value. After sweeping your $${targetNetDebt}M debt balance, the final fair-market Equity Value is $${Math.round(impliedEquityValue)}M, or $${impliedSharePrice.toFixed(2)} per share.`;
    }

    return { 
      medianEvRev,
      medianEvEbitda,
      meanEvRev,
      meanEvEbitda,
      blendedEv,
      discountedEv,
      impliedEquityValue,
      impliedSharePrice,
      chartData, 
      insightText,
      excelComps
    };
  }, [targetRev, targetEbitda, targetNetDebt, targetShares, privateDiscount, peerAMc, peerADebt, peerARev, peerAEbitda, peerBMc, peerBDebt, peerBRev, peerBEbitda, peerCMc, peerCDebt, peerCRev, peerCEbitda]);

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
           <h1 className="text-3xl font-bold text-brand-navy">Comparable Company Analysis (CCA)</h1>
           <p className="text-brand-slate">Mathematically value a private target company against public market trading multiples.</p>
        </div>

        {/* About Tool Box */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-brand-teal border border-gray-100 mb-8 flex gap-4 max-w-4xl">
          <div className="text-3xl pt-1">💡</div>
          <div>
            <h3 className="font-bold text-brand-navy mb-1">What this tool actually does</h3>
            <p className="text-sm text-brand-slate leading-relaxed">
              Commonly called "Trading Comps", this is the foundational tool Investment Bankers use to value businesses. Rather than guessing future cash flows (like a DCF), this model finds out exactly what the open market is willing to pay right now for $1 of Revenue or EBITDA in your industry based on 3 public competitors, and then maps that exact multiple onto your Target Company to derive a fair-market M&A Purchase Price.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 relative">
          
          {/* Inputs Sidebar */}
          <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24 z-20">
            <h3 className="font-bold text-brand-navy border-b pb-4">Financial Inputs (in Millions)</h3>
            
            <div className="space-y-4">
              
              {/* TARGET COMPANY INPUTS */}
              <div className="bg-blue-50/50 -mx-6 px-6 py-4 pb-4">
                <h4 className="font-bold text-blue-900 text-[11px] uppercase tracking-widest mb-3">Target / Subject Company</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">LTM Revenue ($M)</label>
                    <input type="number" className="input w-full py-1.5" value={targetRev} onChange={e => setTargetRev(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">LTM EBITDA ($M)</label>
                    <input type="number" className="input w-full py-1.5" value={targetEbitda} onChange={e => setTargetEbitda(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Net Debt ($M)</label>
                    <input type="number" className="input w-full py-1.5" value={targetNetDebt} onChange={e => setTargetNetDebt(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Total Shares (M)</label>
                    <input type="number" className="input w-full py-1.5" value={targetShares} onChange={e => setTargetShares(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mt-2 mb-1">Private Illiquidity Discount</label>
                    <div className="relative">
                      <input type="number" className="input w-full py-1.5 pr-8" step="1" value={privateDiscount} onChange={e => setPrivateDiscount(Number(e.target.value))} />
                      <span className="absolute right-3 top-2 text-gray-400 text-sm">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* COMPETITOR A */}
              <div className="pt-2">
                <h4 className="font-bold text-gray-800 text-xs mb-3 border-b pb-1">Peer A (High Growth Leader)</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">Mkt Cap</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerAMc} onChange={e => setPeerAMc(Number(e.target.value))} />
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">Net Debt</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerADebt} onChange={e => setPeerADebt(Number(e.target.value))} />
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">Revenue</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerARev} onChange={e => setPeerARev(Number(e.target.value))} />
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">EBITDA</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerAEbitda} onChange={e => setPeerAEbitda(Number(e.target.value))} />
                  </div>
                </div>
              </div>

              {/* COMPETITOR B */}
              <div className="pt-2">
                <h4 className="font-bold text-gray-800 text-xs mb-3 border-b pb-1">Peer B (Stable Average)</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">Mkt Cap</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerBMc} onChange={e => setPeerBMc(Number(e.target.value))} />
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">Net Debt</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerBDebt} onChange={e => setPeerBDebt(Number(e.target.value))} />
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">Revenue</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerBRev} onChange={e => setPeerBRev(Number(e.target.value))} />
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">EBITDA</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerBEbitda} onChange={e => setPeerBEbitda(Number(e.target.value))} />
                  </div>
                </div>
              </div>

              {/* COMPETITOR C */}
              <div className="pt-2">
                <h4 className="font-bold text-gray-800 text-xs mb-3 border-b pb-1">Peer C (Laggard)</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">Mkt Cap</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerCMc} onChange={e => setPeerCMc(Number(e.target.value))} />
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">Net Debt</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerCDebt} onChange={e => setPeerCDebt(Number(e.target.value))} />
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">Revenue</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerCRev} onChange={e => setPeerCRev(Number(e.target.value))} />
                  </div>
                  <div>
                     <label className="block text-[10px] text-gray-500 uppercase">EBITDA</label>
                     <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={peerCEbitda} onChange={e => setPeerCEbitda(Number(e.target.value))} />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Results Main Pane */}
          <div className={`lg:col-span-3 space-y-8 ${isLocked ? 'blur-md pointer-events-none select-none opacity-40' : ''} transition-all duration-700`}>
            
            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-blue-600 mb-1 uppercase tracking-widest">Implied Enterprise Value</p>
                  <h4 className="text-3xl font-bold text-brand-navy">${Math.round(calculations.discountedEv).toLocaleString()}M</h4>
                  <p className="text-xs text-brand-slate mt-2">Target valuation derived from median multiples (discounted by {privateDiscount}%).</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-green-600 mb-1 uppercase tracking-widest">Implied Equity Value</p>
                  <h4 className={`text-3xl font-bold ${calculations.impliedEquityValue > 0 ? 'text-brand-navy' : 'text-red-500'}`}>
                    ${Math.round(calculations.impliedEquityValue).toLocaleString()}M
                  </h4>
                  <p className="text-xs text-brand-slate mt-2">Cash left for Founders/Sponsors after sweeping $M Net Debt.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group flex flex-col justify-center align-middle">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 text-center">
                  <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-widest">Implied Share Price</p>
                  <h4 className="text-4xl font-extrabold text-[#111827]">
                    ${calculations.impliedSharePrice.toFixed(2)}
                  </h4>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative z-10">
              <h3 className="font-bold text-brand-navy mb-6">Trading Multiple Benchmarks (Target vs Competitors)</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calculations.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" tick={{fontSize: 12}} tickMargin={10} />
                    <YAxis tick={{fontSize: 12}} width={40} />
                    <Tooltip 
                      formatter={(value: any, name: any) => [value + 'x', name]}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{fill: '#f8fafc'}}
                    />
                    <Legend iconType="circle" />
                    <Bar dataKey="evEbitda" name="EV / EBITDA Multiple" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="evRev" name="EV / Revenue Multiple" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={40} />
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
                <span>Trading_Comps_Valuation_Benchmarking.xlsx</span>
              </div>
              
              <div className="bg-white border-b border-gray-300 px-3 py-1.5 text-[11px] text-gray-600 font-mono shadow-sm flex items-center gap-2">
                <span className="font-bold italic text-gray-400 select-none cursor-default px-1 hover:bg-gray-100 rounded">fx</span> 
                <div className="bg-white border border-blue-300 w-full px-2 py-0.5 text-black h-5 flex items-center shadow-inner">
                  =MEDIAN(Peer_Group_Multiples) * Target_Financials
                </div>
              </div>

              <div className="overflow-x-auto w-full hide-scrollbar">
                <table className="w-full text-[11px] whitespace-nowrap border-collapse min-w-full select-text">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 border-b-2 border-r border-gray-300 w-8 z-30 sticky left-0 shrink-0"></th>
                      <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-bold text-gray-600 font-sans tracking-tight uppercase whitespace-nowrap sticky left-6 z-30 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                        Subject / Peer Comparison ($M)
                      </th>
                      <ExcelHeader label="Market Cap" />
                      <ExcelHeader label="Net Debt" />
                      <ExcelHeader label="Enterprise Value (EV)" />
                      <ExcelHeader label="LTM Revenue" />
                      <ExcelHeader label="LTM EBITDA" />
                      <ExcelHeader label="EV / Rev (x)" />
                      <ExcelHeader label="EV / EBITDA (x)" />
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    
                    {calculations.excelComps.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/30 group">
                        <ExcelRowIndex i={String(idx + 1)} />
                        <td className="border border-gray-200 px-2 py-2 bg-white text-gray-700 pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">{comp.name}</td>
                        <td className="border border-gray-200 px-2 py-2 text-right font-mono">${comp.mc.toLocaleString()}</td>
                        <td className="border border-gray-200 px-2 py-2 text-right font-mono">${comp.debt.toLocaleString()}</td>
                        <td className="border border-gray-200 px-2 py-2 text-right font-mono font-bold">${comp.ev.toLocaleString()}</td>
                        <td className="border border-gray-200 px-2 py-2 text-right font-mono bg-gray-50/50">${comp.rev.toLocaleString()}</td>
                        <td className="border border-gray-200 px-2 py-2 text-right font-mono bg-gray-50/50">${comp.ebitda.toLocaleString()}</td>
                        <td className="border border-gray-200 px-2 py-2 text-right font-mono font-bold text-teal-700 bg-teal-50/30">{comp.evRev.toFixed(2)}x</td>
                        <td className="border border-gray-200 px-2 py-2 text-right font-mono font-bold text-teal-700 bg-teal-50/30">{comp.evEbitda.toFixed(2)}x</td>
                      </tr>
                    ))}

                    <tr>
                      <ExcelRowIndex i="4" />
                      <td colSpan={8} className="border border-gray-200 bg-gray-100/50 py-1 sticky left-6 z-20"></td>
                    </tr>

                    {/* Means and Medians */}
                    <tr className="bg-gray-50/80">
                      <ExcelRowIndex i="5" />
                      <td className="border border-gray-200 px-2 py-2 font-bold text-gray-500 pl-3 sticky left-6 z-20">Peer Group MEAN (Average)</td>
                      <td colSpan={5} className="border border-gray-200 bg-gray-50/80"></td>
                      <td className="border border-gray-200 px-2 py-2 text-right font-mono font-bold text-gray-600">{calculations.meanEvRev.toFixed(2)}x</td>
                      <td className="border border-gray-200 px-2 py-2 text-right font-mono font-bold text-gray-600">{calculations.meanEvEbitda.toFixed(2)}x</td>
                    </tr>

                    <tr className="bg-blue-50/20">
                      <ExcelRowIndex i="6" />
                      <td className="border border-gray-200 px-2 py-2 font-bold text-blue-900 pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Peer Group MEDIAN</td>
                      <td colSpan={5} className="border border-gray-200"></td>
                      <td className="border border-gray-200 px-2 py-2 text-right font-mono font-bold text-blue-700 bg-blue-50/50 border-2 border-blue-400 shadow-sm">{calculations.medianEvRev.toFixed(2)}x</td>
                      <td className="border border-gray-200 px-2 py-2 text-right font-mono font-bold text-blue-700 bg-blue-50/50 border-2 border-blue-400 shadow-sm">{calculations.medianEvEbitda.toFixed(2)}x</td>
                    </tr>

                    <tr>
                      <ExcelRowIndex i="7" />
                      <td colSpan={8} className="border border-gray-200 bg-gray-100/50 py-1 sticky left-6 z-20"></td>
                    </tr>

                    {/* Target Valuation Bridge */}
                    <tr className="hover:bg-blue-50/30 group/target">
                      <ExcelRowIndex i="8" />
                      <td className="border border-gray-200 px-2 py-2 font-bold bg-white text-brand-navy pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] uppercase">Target Subject Company Bridge</td>
                      <td className="border border-gray-200 px-2 py-2 bg-gray-50/50 text-center font-mono text-gray-400 text-[9px] uppercase">Implied EV</td>
                      <td className="border border-gray-200 px-2 py-2 bg-gray-50/50 text-center font-mono text-gray-400 text-[9px] uppercase">Your Input</td>
                      <td className="border border-gray-200 px-2 py-2 bg-gray-50/50 text-center font-mono text-gray-400 text-[9px] uppercase">Implied Equity</td>
                      <td className="border border-gray-200 px-2 py-2 text-right font-mono bg-yellow-50 font-bold border-t-2 border-t-brand-navy">${targetRev.toLocaleString()}</td>
                      <td className="border border-gray-200 px-2 py-2 text-right font-mono bg-yellow-50 font-bold border-t-2 border-t-brand-navy">${targetEbitda.toLocaleString()}</td>
                      <td colSpan={2} className="border border-gray-200 bg-white"></td>
                    </tr>

                    <tr className="bg-[#eef3fb]">
                      <ExcelRowIndex i="9" />
                      <td className="border border-gray-200 px-2 py-2 font-extrabold text-[11px] text-[#0b5c96] pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">Final Implied Market Value</td>
                      <td className="border border-gray-200 px-2 py-2 text-center font-mono font-extrabold text-[13px] text-[#0b5c96] shadow-inner">${Math.round(calculations.discountedEv).toLocaleString()}</td>
                      <td className="border border-gray-200 px-2 py-2 text-center font-mono font-extrabold text-[11px] text-red-600 shadow-inner">- ${targetNetDebt.toLocaleString()} Debt</td>
                      <td className="border border-gray-200 px-2 py-2 text-center font-mono font-extrabold text-[13px] text-green-700 shadow-inner border-2 border-green-500 bg-green-50">${Math.round(calculations.impliedEquityValue).toLocaleString()}</td>
                      <td colSpan={4} className="border border-gray-200 bg-[#eef3fb]"></td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Dynamic Summary Box */}
            <div className="bg-brand-navy p-6 rounded-2xl shadow-lg relative overflow-hidden mt-8 z-10 w-full flex flex-col justify-center border-t-4 border-t-blue-500">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
              </div>
              <h3 className="font-bold text-white mb-2 text-sm flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
                IB Valuation Analyst Engine
              </h3>
              <p className="text-blue-50 text-sm leading-relaxed relative z-10 pt-2 font-light">
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
                <h3 className="text-2xl font-bold text-brand-navy mb-3">Model Locked</h3>
                <p className="text-brand-slate mb-8">
                  You've reached your free evaluation limit for the CCA Trading Comps Model. Subscribe/Buy now to unlock permanent access to this professional IB tool and all 10 premium financial calculators.
                </p>
                
                {!showEmailGate ? (
                  <button onClick={() => setShowEmailGate(true)} className="btn btn-primary w-full text-lg py-4 shadow-xl">
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
                    <button type="submit" disabled={loading} className="btn btn-primary w-full shadow-xl shadow-brand-teal/30">
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
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Trading Comps Glossary & Math</h2>
          <p className="text-brand-slate mb-8">Understanding the complex mechanics of Investment Banking Valuation Multiples.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">💰</span> Enterprise Value (EV)</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> The absolute total value of the operations of the business regardless of how it is financed. It is calculated as Market Capitalization (Shares x Price) PLUS Net Debt.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">⚖️</span> Net Debt</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> Total Long and Short-term Debt minus Total Cash and Cash Equivalents. When you buy a house for $500k but assume a $100k mortgage, the Equity Value is only $400k. The exact same logic applies to acquiring companies.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">📉</span> Private Company Discount</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> Also called an Illiquidity Discount. A public stock can be sold on the NASDAQ in 5 seconds. A private company might take 9 months to sell. Buyers demand a 15-30% discount on Valuation to compensate for this severe lack of liquidity.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">📊</span> Why use the Median?</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> Peer groups often contain one absurdly over-valued company (e.g., TSLA skewing automakers) or one bankrupt company. Taking the Mean (Average) breaks the math. The Median completely filters out extreme outliers to find the true market center.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
