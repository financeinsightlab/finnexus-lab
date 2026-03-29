'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function CryptoTokenomicsCalc({ slug, isPremiumUser }: { slug: string; isPremiumUser?: boolean }) {
  // Inputs
  const [totalSupply, setTotalSupply] = useState(1_000_000_000);
  const [tokenPrice, setTokenPrice] = useState(0.10);
  
  const [teamAllocation, setTeamAllocation] = useState(20);
  const [investorAllocation, setInvestorAllocation] = useState(15);
  const [communityAllocation, setCommunityAllocation] = useState(65);

  const [teamCliff, setTeamCliff] = useState(12);
  const [teamLinear, setTeamLinear] = useState(24);
  const [investorCliff, setInvestorCliff] = useState(6);
  const [investorLinear, setInvestorLinear] = useState(18);

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
    const fdv = totalSupply * tokenPrice;
    
    // Validate Allocations
    const sum = teamAllocation + investorAllocation + communityAllocation;
    let safeTeam = teamAllocation;
    let safeInvestor = investorAllocation;
    let safeCommunity = communityAllocation;
    if (sum !== 100) {
      safeTeam = (teamAllocation / sum) * 100;
      safeInvestor = (investorAllocation / sum) * 100;
      safeCommunity = (communityAllocation / sum) * 100;
    }

    const totalTeam = totalSupply * (safeTeam / 100);
    const totalInvestor = totalSupply * (safeInvestor / 100);
    const totalCommunity = totalSupply * (safeCommunity / 100);

    const chartData = [];
    const rowMonths = [];
    const rowTeamTokens = [];
    const rowInvestorTokens = [];
    const rowCommunityTokens = [];
    const rowTotalCirculating = [];
    const rowMarketCap = [];

    // TGE Logic: Day 1 (Month 0) - only 10% of community tokens unlock
    const tgeCommunityUnlocked = totalCommunity * 0.10;
    
    for (let month = 0; month <= 48; month++) {
      rowMonths.push(`Mo ${month}`);
      
      // Calculate Team Unlock
      let teamUnlockedPercentage = 0;
      if (month > teamCliff) {
        teamUnlockedPercentage = Math.min(1, (month - teamCliff) / (teamLinear || 1));
      }
      const currentTeam = totalTeam * teamUnlockedPercentage;

      // Calculate Investor Unlock
      let investorUnlockedPercentage = 0;
      if (month > investorCliff) {
        investorUnlockedPercentage = Math.min(1, (month - investorCliff) / (investorLinear || 1));
      }
      const currentInvestor = totalInvestor * investorUnlockedPercentage;

      // Calculate Community Unlock (10% at TGE, 90% linearly over 48 months starting month 1)
      let currentCommunity = tgeCommunityUnlocked;
      if (month > 0) {
        currentCommunity += (totalCommunity * 0.90) * Math.min(1, month / 48);
      }

      const totalCirculating = currentTeam + currentInvestor + currentCommunity;
      const currentMarketCap = totalCirculating * tokenPrice;
      
      chartData.push({
        month: `Month ${month}`,
        Team: Math.round(currentTeam),
        Investors: Math.round(currentInvestor),
        Community: Math.round(currentCommunity),
      });

      rowTeamTokens.push(Math.round(currentTeam));
      rowInvestorTokens.push(Math.round(currentInvestor));
      rowCommunityTokens.push(Math.round(currentCommunity));
      rowTotalCirculating.push(Math.round(totalCirculating));
      rowMarketCap.push(Math.round(currentMarketCap));
    }

    // Day 1 Market Cap (Month 0 circulating supply * price)
    const day1Circulating = rowTotalCirculating[0];
    const day1MarketCap = rowMarketCap[0];

    // Analyst Summary
    let insightText = '';
    const initialFloatPercent = (day1Circulating / totalSupply) * 100;

    if (initialFloatPercent < 5 && fdv > 500_000_000) {
      insightText = `High Risk / Low-Float Structure: Your initial circulating supply is dangerously low at ${initialFloatPercent.toFixed(1)}%, creating an artificial scarcity squeeze. Combined with an overvalued Fully Diluted Valuation (FDV) of $${fdv.toLocaleString()}, your token is extremely susceptible to violent pump-and-dump mechanics. Retail investors will buy the manipulated small float, only to be crushed when your massive Team & Investor cliffs unlock at Month ${Math.min(teamCliff, investorCliff)}. You must inject more liquidity at TGE or lower your launch price to ensure long-term ecosystem health.`;
    } else if (safeTeam + safeInvestor > 50) {
      insightText = `Venture Cartel Warning: Inside actors (Team and Investors) control an overwhelming ${(safeTeam + safeInvestor).toFixed(1)}% of the total supply. True decentralization cannot be achieved under this tokenomic model. When these massive allocations clear their ${investorCliff}-month cliffs, the resulting sell pressure will completely overwhelm any retail demand or community utility. We strongly advise increasing the Community & Ecosystem allocation to >60% to ensure sustainable, decentralized network growth.`;
    } else if (investorCliff < 12 && safeInvestor > 10) {
      insightText = `Predatory Unlocks Detected: Early investors are allocated a massive slice of the network, and their ${investorCliff}-month cliff is incredibly short. They will have thousands of unlocked tokens capable of destroying the order books before the core protocol even achieves true product-market fit. Push the investor cliff back to at least 12 months, or enforce a much slower ${Math.max(24, investorLinear)}-month linear vesting schedule to align their incentives with long-term survival.`;
    } else {
      insightText = `Healthy Web3 Distribution: This is a robust and sustainable Tokenomics structure. Your Day 1 Market Cap of $${day1MarketCap.toLocaleString()} provides enough initial liquidity without crushing the price. More importantly, keeping the Team and Investor allocations reasonably sized with healthy cliffs protects the retail community from sudden, massive dump events. The gradual ${Math.round((tgeCommunityUnlocked/totalSupply)*100)}% Ecosystem unlock at TGE allows the network to incentivize developers and early users efficiently. Proceed to launch.`;
    }

    return { 
      fdv, 
      day1MarketCap, 
      day1Circulating,
      safeTeam,
      safeInvestor,
      safeCommunity,
      chartData, 
      insightText,
      rowMonths,
      rowTeamTokens,
      rowInvestorTokens,
      rowCommunityTokens,
      rowTotalCirculating,
      rowMarketCap
    };
  }, [totalSupply, tokenPrice, teamAllocation, investorAllocation, communityAllocation, teamCliff, teamLinear, investorCliff, investorLinear]);

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
           <h1 className="text-3xl font-bold text-brand-navy">Web3 Tokenomics & Vesting Model</h1>
           <p className="text-brand-slate">Simulate inflationary unlocking, Fully Diluted Valuation, and circulating token supply manipulation.</p>
        </div>

        {/* About Tool Box */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-brand-teal border border-gray-100 mb-8 flex gap-4 max-w-4xl">
          <div className="text-3xl pt-1">💡</div>
          <div>
            <h3 className="font-bold text-brand-navy mb-1">What this tool actually does</h3>
            <p className="text-sm text-brand-slate leading-relaxed">
              This dynamic Tokenomics model is designed for Web3 Founders and Crypto Investors. It visualizes exactly how heavily a token's total supply is diluted over time by mapping strict "Vesting Cliffs" and linear unlock schedules. By predicting exactly when Team Members and VC Investors dump their tokens into the Circulating Supply, users can analyze if the token structure is healthy or a "VC Rug-Pull."
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 relative">
          
          {/* Inputs Sidebar */}
          <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24 z-20">
            <h3 className="font-bold text-brand-navy border-b pb-4">Protocol Assumptions</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-slate mb-1">Total Fixed Supply</label>
                <input type="number" className="input w-full" value={totalSupply} onChange={e => setTotalSupply(Number(e.target.value))} />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-slate mb-1">Initial Launch Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input type="number" className="input w-full pl-8" step="0.01" value={tokenPrice} onChange={e => setTokenPrice(Number(e.target.value))} />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-bold text-brand-navy text-sm mb-3">Token Allocations</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Core Team %</label>
                    <input type="number" className="input w-full py-1.5" value={teamAllocation} onChange={e => setTeamAllocation(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">VC Investors %</label>
                    <input type="number" className="input w-full py-1.5" value={investorAllocation} onChange={e => setInvestorAllocation(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Ecosystem / Community %</label>
                    <input type="number" className="input w-full py-1.5" value={communityAllocation} onChange={e => setCommunityAllocation(Number(e.target.value))} />
                  </div>
                  {(calculations.safeTeam !== teamAllocation) && (
                     <p className="text-[10px] text-red-500 font-bold">Allocations must equal 100%. Auto-scaling percentages.</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-bold text-brand-navy text-sm mb-3">Vesting Schedules</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-medium text-gray-500 mt-1 uppercase">Team Cliff</label>
                      <input type="number" className="input w-full py-1 text-sm bg-gray-50 border border-gray-200" value={teamCliff} onChange={e => setTeamCliff(Number(e.target.value))} />
                      <span className="text-[10px] text-gray-400">Months</span>
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-gray-500 mt-1 uppercase">Team Linear</label>
                      <input type="number" className="input w-full py-1 text-sm bg-gray-50 border border-gray-200" value={teamLinear} onChange={e => setTeamLinear(Number(e.target.value))} />
                      <span className="text-[10px] text-gray-400">Months</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-medium text-gray-500 mt-1 uppercase">VC Cliff</label>
                      <input type="number" className="input w-full py-1 text-sm bg-gray-50 border border-gray-200" value={investorCliff} onChange={e => setInvestorCliff(Number(e.target.value))} />
                      <span className="text-[10px] text-gray-400">Months</span>
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-gray-500 mt-1 uppercase">VC Linear</label>
                      <input type="number" className="input w-full py-1 text-sm bg-gray-50 border border-gray-200" value={investorLinear} onChange={e => setInvestorLinear(Number(e.target.value))} />
                      <span className="text-[10px] text-gray-400">Months</span>
                    </div>
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
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-red-500 mb-1 uppercase tracking-widest">Fully Diluted Value</p>
                  <h4 className="text-3xl font-bold text-brand-navy">${Math.round(calculations.fdv).toLocaleString()}</h4>
                  <p className="text-xs text-brand-slate mt-2">Total network value if ALL tokens were unlocked today (FDV).</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-green-600 mb-1 uppercase tracking-widest">Day 1 Market Cap</p>
                  <h4 className="text-3xl font-bold text-brand-navy">${Math.round(calculations.day1MarketCap).toLocaleString()}</h4>
                  <p className="text-xs text-brand-slate mt-2">Cash required to absorb actual unlocked Float at Token Generation Event.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-blue-600 mb-1 uppercase tracking-widest">Initial Float Volume</p>
                  <h4 className="text-3xl font-bold text-brand-navy">
                    {calculations.day1Circulating >= 1_000_000 ? (calculations.day1Circulating/1_000_000).toFixed(1) + 'M' : calculations.day1Circulating.toLocaleString()} <span className="text-lg font-normal">Tokens</span>
                  </h4>
                  <p className="text-xs text-brand-slate mt-2">Only {((calculations.day1Circulating / totalSupply) * 100).toFixed(1)}% of total supply is tradeable on Day 1.</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative z-10">
              <h3 className="font-bold text-brand-navy mb-6">48-Month Token Inflation & Unlock Schedule</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calculations.chartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="month" tick={{fontSize: 12}} tickMargin={10} minTickGap={30} />
                    <YAxis tickFormatter={(val) => val >= 1_000_000 ? `${(val/1_000_000).toFixed(0)}M` : val} tick={{fontSize: 12}} width={60} />
                    <Tooltip 
                      formatter={(value: any, name: any) => [Number(value).toLocaleString(), name + ' Tokens']}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" />
                    <Area type="monotone" dataKey="Community" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" strokeWidth={0} />
                    <Area type="monotone" dataKey="Investors" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" strokeWidth={0} />
                    <Area type="monotone" dataKey="Team" stackId="1" stroke="#f43f5e" fill="#f43f5e" strokeWidth={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* THE MASSIVE FULL M&A EXCEL SHEET DATA BLOCK */}
            <div className={`bg-white border border-gray-300 shadow-lg rounded-sm overflow-hidden relative w-full mb-8 font-sans`}>
              
              <div className="bg-[#107c41] text-white px-3 py-1 text-[11px] font-medium flex items-center gap-2 border-b border-[#0b542c]">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 3h20v4H2zm0 6h6v12H2zm8 0h12v3H10zm0 4.5h12v3H10zm0 4.5h12v3H10z"/>
                </svg>
                <span>Token_Emission_Schedule_48M.xlsx</span>
              </div>
              
              <div className="bg-white border-b border-gray-300 px-3 py-1.5 text-[11px] text-gray-600 font-mono shadow-sm flex items-center gap-2">
                <span className="font-bold italic text-gray-400 select-none cursor-default px-1 hover:bg-gray-100 rounded">fx</span> 
                <div className="bg-white border border-blue-300 w-full px-2 py-0.5 text-black h-5 flex items-center shadow-inner">
                  =SUM(Team_Unlocked, Investor_Unlocked, Community_Unlocked)
                </div>
              </div>

              <div className="overflow-x-auto w-full hide-scrollbar">
                <table className="w-full text-[11px] whitespace-nowrap border-collapse min-w-[3000px] select-text">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 border-b-2 border-r border-gray-300 w-8 z-30 sticky left-0 shrink-0"></th>
                      <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-bold text-gray-600 font-sans tracking-tight text-[11px] uppercase whitespace-nowrap sticky left-6 z-30 min-w-[200px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                        Token Supply Tranche
                      </th>
                      {calculations.rowMonths.map((m, i) => (
                        <ExcelHeader key={i} label={m} />
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    
                    <tr className="hover:bg-blue-50/30 group">
                      <ExcelRowIndex i="1" />
                      <td className="border border-gray-200 px-2 py-2 font-bold bg-white text-gray-700 pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">Ecosystem / Community Unlocked</td>
                      {calculations.rowCommunityTokens.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono text-gray-500`}>
                          {val.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    
                    <tr className="hover:bg-blue-50/30 group bg-purple-50/10">
                      <ExcelRowIndex i="2" />
                      <td className="border border-gray-200 px-2 py-2 bg-purple-50/20 pl-3 text-purple-800 font-semibold sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">VC / Private Investors Unlocked</td>
                      {calculations.rowInvestorTokens.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono text-purple-700`}>
                          {val.toLocaleString()}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-blue-50/30 group bg-red-50/10">
                      <ExcelRowIndex i="3" />
                      <td className="border border-gray-200 px-2 py-2 bg-red-50/20 pl-3 text-red-800 font-semibold sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50/0">Core Team Unlocked</td>
                      {calculations.rowTeamTokens.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono text-red-700`}>
                          {val.toLocaleString()}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <ExcelRowIndex i="4" />
                      <td colSpan={50} className="border border-gray-200 bg-gray-100/50 py-1 sticky left-6 z-20"></td>
                    </tr>

                    <tr className="bg-[#eef3fb]">
                      <ExcelRowIndex i="5" />
                      <td className="border border-gray-200 px-2 py-2 font-extrabold uppercase pl-3 text-[11px] tracking-widest text-[#0b5c96] sticky left-6 z-20 shadow-inner">Total Circulating Supply</td>
                      {calculations.rowTotalCirculating.map((val, idx) => {
                        return (
                          <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono font-extrabold text-[13px] text-[#0b5c96] shadow-inner`}>
                            <span className="border-b-2 border-double border-current pb-0.5">
                              {val.toLocaleString()}
                            </span>
                          </td>
                        )
                      })}
                    </tr>

                    <tr className="hover:bg-blue-50/30 group text-green-700 font-bold border-t-2 border-t-gray-400 border-b-2 border-b-gray-400">
                      <ExcelRowIndex i="6" />
                      <td className="border border-gray-200 px-2 py-2 bg-green-50/30 pl-3 sticky left-6 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-green-50/0">Implied Market Cap @ Entry Price</td>
                      {calculations.rowMarketCap.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-2 text-right font-mono`}>
                          ${val.toLocaleString()}
                        </td>
                      ))}
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
                Web3 Analyst Audit Engine
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
                  You've reached your free evaluation limit for the Tokenomics Model. Subscribe/Buy now to unlock permanent access to this Web3 tool and all 10 premium financial calculators.
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
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Tokenomics & Vesting Glossary</h2>
          <p className="text-brand-slate mb-8">Understanding the complex mechanics of Web3 network liquidity and inflation.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">🌍</span> Fully Diluted Valuation (FDV)</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> The absolute maximum market cap of a project if every single token in existence were immediately unlocked and sold at the current price. An FDV heavily detached from the actual Circulating Market Cap is a massive red flag.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">📉</span> Vesting Cliff</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> A specific multi-month waiting period immediately post-launch where Team members and Investors own zero tradeable tokens. A short cliff heavily incentivizes "Rug Pulls" and massive early token dumps by insiders.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">⏳</span> Linear Unlock</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> After the Cliff clears, tokens are slowly and systematically unlocked over a linear scale (usually 24 to 48 months). This ensures insiders can't dump their entire allocation on retail buyers on the exact same day.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">🛑</span> Low Float Squeeze</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> When less than 10% of the token exists on the market at launch... meaning you only need a little bit of buying pressure to artificially pump the token price to absurd FDVs before insiders unlock and crash it.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
