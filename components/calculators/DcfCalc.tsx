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

export default function DcfCalc({ slug, isPremiumUser }: { slug: string; isPremiumUser?: boolean }) {
  // Advanced M&A Inputs (Defaults)
  const [revenue, setRevenue] = useState<number | string>(10000000); // 10M
  const [revGrowth, setRevGrowth] = useState<number | string>(15); // 15%
  const [ebitdaMargin, setEbitdaMargin] = useState<number | string>(20); // 20%
  const [taxRate, setTaxRate] = useState<number | string>(21); // 21%
  const [capexNwcRate, setCapexNwcRate] = useState<number | string>(5); // 5%
  const [ltGrowth, setLtGrowth] = useState<number | string>(2.5); // 2.5%
  const [wacc, setWacc] = useState<number | string>(10); // 10%
  const [cashEq, setCashEq] = useState<number | string>(2000000); // 2M
  const [totalDebt, setTotalDebt] = useState<number | string>(1500000); // 1.5M
  const [shares, setShares] = useState<number | string>(1000000); // 1M

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
      if (msSinceFirstUse > 30 * 60 * 1000) {
        setIsLocked(true);
      }
    }
  }, [slug, isPremiumUser]);

  useEffect(() => {
    if (isPremiumUser || localStorage.getItem(`unlocked_${slug}`)) {
      setIsLocked(false);
    }
  }, [slug, isPremiumUser]);

  // Prevent NaN crashes on inputs
  const num = (val: number | string) => Number(val) || 0;

  // Fully-Expanded Top-Down Calculations Engine
  const calculations = useMemo(() => {
    const _rev = num(revenue);
    const _revGr = num(revGrowth);
    const _ebitdaM = num(ebitdaMargin);
    const _taxR = num(taxRate);
    const _capexR = num(capexNwcRate);
    const _ltGr = num(ltGrowth);
    const _wacc = num(wacc);
    const _cash = num(cashEq);
    const _debt = num(totalDebt);
    const _shares = num(shares);

    const modelError = _wacc <= _ltGr;
    
    // Yr 0 (Current) Baselines
    const yr0Ebitda = _rev * (_ebitdaM / 100);
    const yr0Tax = yr0Ebitda * (_taxR / 100);
    const yr0Nopat = yr0Ebitda - yr0Tax;
    const yr0Capex = _rev * (_capexR / 100);
    const yr0Fcf = yr0Nopat - yr0Capex;

    // Excel Matrix Arrays (Initialized w/ Yr 0)
    const rowRev: (number | string)[] = [_rev];
    const rowEbitda: (number | string)[] = [yr0Ebitda];
    const rowTax: (number | string)[] = [-yr0Tax];
    const rowNopat: (number | string)[] = [yr0Nopat];
    const rowCapex: (number | string)[] = [-yr0Capex];
    const rowFcf: (number | string)[] = [yr0Fcf];
    const rowDf: (number | string)[] = [1.000];
    const rowPv: (number | string)[] = [yr0Fcf];
    
    let sumPvFcf = 0;
    let currentPeriodRev = _rev;
    const chartData = [];

    // Base loop for 5-Year explicit forecast period
    let lastFcf = yr0Fcf;

    for (let year = 1; year <= 5; year++) {
      currentPeriodRev = currentPeriodRev * (1 + (_revGr / 100)); // Grow Topline
      const cEbitda = currentPeriodRev * (_ebitdaM / 100);
      const cTax = cEbitda * (_taxR / 100);
      const cNopat = cEbitda - cTax;
      const cCapex = currentPeriodRev * (_capexR / 100);
      const cFcf = cNopat - cCapex; // Unlevered Free Cash Flow
      
      const df = Math.pow(1 + (_wacc / 100), year); // Discount Factor
      const pvFcf = cFcf / df; // PV of FCF
      
      sumPvFcf += pvFcf;
      lastFcf = cFcf;

      rowRev.push(Math.round(currentPeriodRev));
      rowEbitda.push(Math.round(cEbitda));
      rowTax.push(Math.round(-cTax));
      rowNopat.push(Math.round(cNopat));
      rowCapex.push(Math.round(-cCapex));
      rowFcf.push(Math.round(cFcf));
      rowDf.push((1/df).toFixed(3));
      rowPv.push(Math.round(pvFcf));

      chartData.push({
        stage: `Year ${year}`,
        value: !modelError && pvFcf > 0 ? Math.round(pvFcf) : 0,
        fill: '#0ea5e9' // Light blue for near-term cash
      });
    }

    // Terminal Value (Gordon Growth Method)
    const terminalYearFcf = lastFcf * (1 + (_ltGr / 100));
    let terminalValue = 0;
    let pvTerminalValue = 0;

    if (!modelError) {
      terminalValue = terminalYearFcf / ((_wacc / 100) - (_ltGr / 100));
      const dfTerminal = Math.pow(1 + (_wacc / 100), 5);
      pvTerminalValue = terminalValue / dfTerminal;
      
      rowRev.push('---');
      rowEbitda.push('---');
      rowTax.push('---');
      rowNopat.push('---');
      rowCapex.push('---');
      rowFcf.push(Math.round(terminalValue));
      rowDf.push((1/dfTerminal).toFixed(3));
      rowPv.push(Math.round(pvTerminalValue));

      chartData.push({
        stage: 'Terminal Value',
        value: pvTerminalValue > 0 ? Math.round(pvTerminalValue) : 0,
        fill: '#0d9488' // Dark teal for terminal lump sum
      });
    } else {
      ['---', '---', '---', '---', '---', 'Error', 'Error', 'Error'].forEach((val, i) => {
        const arrs = [rowRev, rowEbitda, rowTax, rowNopat, rowCapex, rowFcf, rowDf, rowPv];
        arrs[i].push(val);
      });
    }

    // Equity Bridge Build
    const enterpriseValue = sumPvFcf + pvTerminalValue;
    const equityValue = enterpriseValue + _cash - _debt;
    const sharePrice = _shares > 0 ? equityValue / _shares : 0;
    const pvTvPercentage = enterpriseValue > 0 ? (pvTerminalValue / enterpriseValue) * 100 : 0;

    // Dynamic Analyst Diagnosis
    let insightText = '';
    if (modelError) {
      insightText = `Mathematical Integrity Error: The Gordon Growth model dictates that a company cannot grow faster than the overall economy forever. Your Terminal Growth Rate (${_ltGr}%) must be strictly lower than your Discount Rate (${_wacc}%), otherwise the mathematical sum of the terminal value approaches Infinity causing a model crash. Fix 'WACC' or 'Terminal %'.`;
    } else if (pvTvPercentage > 85) {
      insightText = `Highly Speculative Valuation: This DCF values the business at $${(equityValue/1000000).toFixed(1)}M. However, an alarming ${Math.round(pvTvPercentage)}% of the total Enterprise value comes solely from the "Terminal Value" lump sum (the dark teal bar). Investors are paying almost exclusively for cash flows occurring well past Year 5. If your near-term growth assumptions fail, the terminal value will collapse entirely. Investors historically assign a higher WACC to mitigate this far-future risk.`;
    } else if (pvTvPercentage < 50 && _revGr < 5) {
      insightText = `Mature Cash Cow: This valuation profile is heavily weighted toward near-term predictable cash generation. Because topline top-line growth is modeled at just ${_revGr}%, a massive portion of the fundamental value relies on harvesting current EBITDA. This is a very safe, low-risk DCF profile typical of utility companies or mature industrials. The calculated theoretical share price of $${sharePrice.toFixed(2)} represents a solid value-investing baseline.`;
    } else {
      insightText = `Balanced Growth Profile: Your math yields an M&A-grade structured model. The Equity Value of $${(equityValue/1000000).toFixed(1)}M is buoyed by aggressive ${_revGr}% revenue execution in the next 5 years, while maintaining a mathematically safe ${_ltGr}% perpetual terminal cap. The Terminal Present Value accounts for ${Math.round(pvTvPercentage)}% of the total valuation, perfectly hitting the standard Wall Street benchmarking band for a growing technology or mid-market firm.`;
    }

    return { 
      modelError,
      enterpriseValue,
      equityValue,
      sharePrice,
      sumPvFcf,
      pvTerminalValue,
      chartData,
      rowRev,
      rowEbitda,
      rowTax,
      rowNopat,
      rowCapex,
      rowFcf,
      rowDf,
      rowPv,
      insightText
    };
  }, [revenue, revGrowth, ebitdaMargin, taxRate, capexNwcRate, ltGrowth, wacc, cashEq, totalDebt, shares]);

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
    <th className="border border-gray-300 bg-gray-100 px-3 py-1 text-center font-bold text-gray-600 font-sans tracking-tight shadow-sm text-[11px] uppercase">
      {label}
    </th>
  );
  const ExcelRowIndex = ({ i }: { i: string }) => (
    <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400 font-sans text-xs w-6 shadow-sm border-r-2 border-r-gray-300">
      {i}
    </td>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 relative">
      <div className="wrap max-w-[1400px] mx-auto space-y-8 px-4">
        
        {/* Header */}
        <div className="mb-6">
          <p className="text-teal-600 font-medium mb-2 uppercase tracking-wider text-sm">FinNexus Advanced M&A Model</p>
          <h1 className="text-3xl font-bold text-brand-navy">Fully Expanded Top-Down DCF</h1>
          <p className="text-brand-slate text-sm max-w-2xl mt-2">
            Calculate intrinsic business value using Wall Street's exact "Unlevered Free Cash Flow" methodology, mapping out fully explicit operating margins before establishing terminal valuation.
          </p>
        </div>

        {/* Dynamic App Layout: Sidebar + Main Content */}
        <div className="grid lg:grid-cols-4 gap-8 relative">
          
          {/* Inputs Sidebar */}
          <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit sticky top-24 z-20">
            <h3 className="font-bold text-brand-navy border-b pb-3 uppercase tracking-wider text-sm">Operating Assumptions</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Topline Revenue (Yr 0)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400 font-bold">$</span>
                  <input type="number" className="input w-full pl-8 bg-gray-50" value={revenue} onChange={e => setRevenue(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Rev Growth</label>
                  <div className="relative">
                    <input type="number" className="input w-full pr-7 bg-gray-50" step="0.1" value={revGrowth} onChange={e => setRevGrowth(e.target.value)} />
                    <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">EBITDA Mgn</label>
                  <div className="relative">
                    <input type="number" className="input w-full pr-7 bg-gray-50" step="0.1" value={ebitdaMargin} onChange={e => setEbitdaMargin(e.target.value)} />
                    <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider" title="Effective Corporate Tax Rate">Tax Rate</label>
                  <div className="relative">
                    <input type="number" className="input w-full pr-7 bg-gray-50" step="0.1" value={taxRate} onChange={e => setTaxRate(e.target.value)} />
                    <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider" title="Capital Expenditures & Net Working Capital (% of Rev)">Capex+NWC</label>
                  <div className="relative">
                    <input type="number" className="input w-full pr-7 bg-gray-50" step="0.1" value={capexNwcRate} onChange={e => setCapexNwcRate(e.target.value)} />
                    <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-brand-navy border-b pb-2 pt-4 uppercase tracking-wider text-sm">Valuation Parameters</h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Terminal Gr</label>
                  <div className="relative">
                    <input type="number" className="input w-full pr-7 bg-blue-50/50" step="0.1" value={ltGrowth} onChange={e => setLtGrowth(e.target.value)} />
                    <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">WACC (Disc)</label>
                  <div className="relative">
                    <input type="number" className="input w-full pr-7 bg-blue-50/50" step="0.1" value={wacc} onChange={e => setWacc(e.target.value)} />
                    <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-brand-navy border-b pb-2 pt-4 uppercase tracking-wider text-sm">Balance Sheet Bridge</h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider" title="Cash & Equivalents">Total Cash</label>
                  <div className="relative">
                    <span className="absolute left-2 top-2.5 text-gray-400 text-xs">$</span>
                    <input type="number" className="input w-full pl-5 text-sm" value={cashEq} onChange={e => setCashEq(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider" title="Total Interest-Bearing Debt">Total Debt</label>
                  <div className="relative">
                    <span className="absolute left-2 top-2.5 text-gray-400 text-xs">$</span>
                    <input type="number" className="input w-full pl-5 text-sm" value={totalDebt} onChange={e => setTotalDebt(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Shares Outstanding (#)</label>
                <input type="number" className="input w-full text-center tracking-widest bg-gray-50" value={shares} onChange={e => setShares(e.target.value)} />
              </div>

            </div>
          </div>

          {/* Results Main Pane */}
          <div className={`lg:col-span-3 space-y-6 flex flex-col ${isLocked ? 'blur-md pointer-events-none select-none opacity-40' : ''} transition-all duration-700 w-full`}>
            
            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 relative z-10">Target Equity Value</p>
                <h4 className={`text-4xl tracking-tighter font-bold relative z-10 ${calculations.modelError ? 'text-red-500' : 'text-brand-navy'}`}>
                  {calculations.modelError ? 'Error (Check WACC)' : `$${(calculations.equityValue / 1000000).toFixed(2)}M`}
                </h4>
                <p className="text-[11px] uppercase tracking-wider text-brand-slate mt-2 relative z-10">Market Cap (EV + Cash - Debt)</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 ring-2 ring-green-500/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Implied Share Price</p>
                <h4 className={`text-4xl tracking-tighter font-bold ${calculations.modelError ? 'text-red-500' : 'text-green-600'}`}>
                  {calculations.modelError ? 'N/A' : `$${calculations.sharePrice.toFixed(2)}`}
                </h4>
                <p className="text-[11px] uppercase tracking-wider text-brand-slate mt-2">Target Common Stock Price</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Total Enterprise Value</p>
                <h4 className="text-3xl tracking-tighter font-bold text-gray-700">
                  {calculations.modelError ? 'N/A' : `$${(calculations.enterpriseValue / 1000000).toFixed(2)}M`}
                </h4>
                <p className="text-[11px] uppercase tracking-wider text-brand-slate mt-2 mt-3">Sum of All Present Values (PV)</p>
              </div>
            </div>

            {/* The Original 6-Bar Composed Chart showing PV Composition */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative z-10 w-full">
              <h3 className="font-bold text-brand-navy mb-1 leading-tight uppercase tracking-wider text-sm flex items-center justify-between">
                <span>Component Breakdown of Present Value (PV)</span>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">Discounted Matrix</span>
              </h3>
              <p className="text-[11px] text-gray-500 mb-4 tracking-wide">
                Visualizing how much of the intrinsic Enterprise Value arises from near-term execution (Years 1-5) versus far-future speculative Gordon Growth (Terminal Value).
              </p>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calculations.chartData} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                    <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#475569'}} />
                    <YAxis tickFormatter={(val) => `$${(val/1000000).toFixed(1)}M`} axisLine={false} tickLine={false} tick={{fontSize: 11}} width={60} />
                    <Tooltip 
                      formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Present Value ($)']}
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
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
                <span>DCF_Full_Operating_Model_v7.xlsx</span>
              </div>
              
              <div className="bg-white border-b border-gray-300 px-3 py-1.5 text-[11px] text-gray-600 font-mono shadow-sm flex items-center gap-2">
                <span className="font-bold italic text-gray-400 select-none cursor-default px-1 hover:bg-gray-100 rounded">fx</span> 
                <div className="bg-white border border-blue-300 w-full px-2 py-0.5 text-black h-5 flex items-center shadow-inner">
                  =SUM(PV_Explicit) + PV_Terminal
                </div>
              </div>

              <div className="overflow-x-auto w-full hide-scrollbar">
                <table className="w-full text-[11px] whitespace-nowrap border-collapse min-w-[800px] select-text">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 border-b-2 border-r border-gray-300 w-8 z-10"></th>
                      <ExcelHeader label="Financial Line Item" />
                      <ExcelHeader label="Base (Yr 0)" />
                      <ExcelHeader label="Year 1" />
                      <ExcelHeader label="Year 2" />
                      <ExcelHeader label="Year 3" />
                      <ExcelHeader label="Year 4" />
                      <ExcelHeader label="Year 5" />
                      <ExcelHeader label="Terminal" />
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    
                    {/* Operating Metrics */}
                    <tr className="hover:bg-blue-50/30 group">
                      <ExcelRowIndex i="1" />
                      <td className="border border-gray-200 px-2 py-1 font-bold bg-white text-black pl-3 group-hover:bg-blue-50/0">Topline Revenue</td>
                      {calculations.rowRev.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-1 text-right font-mono ${idx===0 ? 'text-blue-700 bg-yellow-50 font-bold' : ''}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>
                    
                    <tr className="hover:bg-blue-50/30 group">
                      <ExcelRowIndex i="2" />
                      <td className="border border-gray-200 px-2 py-1 bg-white pl-3 text-gray-700 group-hover:bg-blue-50/0">EBITDA</td>
                      {calculations.rowEbitda.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-1 text-right font-mono text-gray-600 ${idx===0 ? 'text-blue-700 bg-yellow-50' : ''}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-blue-50/30 group text-red-600">
                      <ExcelRowIndex i="3" />
                      <td className="border border-gray-200 px-2 py-1 bg-white pl-3 group-hover:bg-blue-50/0">Less: Operating Cash Taxes</td>
                      {calculations.rowTax.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-1 text-right font-mono ${idx===0 ? 'text-blue-700 bg-yellow-50' : ''}`}>
                          {typeof val === 'number' ? `(${Math.abs(val).toLocaleString()})` : val}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-blue-50/30 group bg-gray-50/50">
                      <ExcelRowIndex i="4" />
                      <td className="border border-gray-200 px-2 py-1 bg-gray-50 pl-3 font-semibold group-hover:bg-blue-50/0">Net Operating Profit (NOPAT)</td>
                      {calculations.rowNopat.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-1 text-right font-mono font-semibold text-black ${idx===0 ? 'text-blue-700 bg-yellow-50' : 'border-t border-t-gray-400'}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-blue-50/30 group text-red-600">
                      <ExcelRowIndex i="5" />
                      <td className="border border-gray-200 px-2 py-1 bg-white pl-3 group-hover:bg-blue-50/0">Less: Reinvestment (Capex/NWC)</td>
                      {calculations.rowCapex.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-1 text-right font-mono ${idx===0 ? 'text-blue-700 bg-yellow-50' : ''}`}>
                          {typeof val === 'number' ? `(${Math.abs(val).toLocaleString()})` : val}
                        </td>
                      ))}
                    </tr>

                    {/* UFCF */}
                    <tr className="bg-blue-50/20 group">
                      <ExcelRowIndex i="6" />
                      <td className="border border-gray-200 px-2 py-1 font-bold bg-blue-50/30 text-brand-navy pl-3 uppercase tracking-wider text-[10px]">Unlevered Free Cash Flow</td>
                      {calculations.rowFcf.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-1 text-right font-mono font-bold text-brand-navy bg-blue-50/30 ${idx===0 ? 'text-blue-700 bg-yellow-100' : 'border-t-2 border-t-gray-400'}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>

                    {/* Discounting */}
                    <tr>
                      <ExcelRowIndex i="7" />
                      <td className="border border-gray-200 px-2 py-1 bg-white pl-3 italic text-gray-500 text-[10px]">WACC Discount Factor</td>
                      {calculations.rowDf.map((val, idx) => (
                        <td key={idx} className="border border-gray-200 px-2 py-1 text-right font-mono italic text-gray-400">
                          {val}
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-yellow-50/30 group">
                      <ExcelRowIndex i="8" />
                      <td className="border border-gray-200 px-2 py-1 font-bold bg-yellow-50/50 text-black pl-3 shadow-inner">Present Value (PV)</td>
                      {calculations.rowPv.map((val, idx) => (
                        <td key={idx} className={`border border-gray-200 px-2 py-1 text-right font-mono font-bold text-black border-t border-t-gray-300 ${idx===7 ? 'bg-teal-50 text-teal-900 border-2 border-teal-500 shadow-md transform scale-105 z-10 relative' : ''} ${idx===0 ? 'bg-yellow-50' : ''}`}>
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </td>
                      ))}
                    </tr>

                    {/* Spacer Line */}
                    <tr>
                      <ExcelRowIndex i="9" />
                      <td colSpan={8} className="border border-gray-200 bg-gray-100/50 py-1"></td>
                    </tr>

                    {/* Valuation Bridge */}
                    <tr className="hover:bg-gray-50/50">
                      <ExcelRowIndex i="10" />
                      <td className="border border-gray-200 px-2 py-1 bg-white font-semibold pl-3 tracking-tight">Sum of P.V. Explicit (Years 1-5)</td>
                      <td className="border border-gray-200 px-2 py-1 text-right font-mono text-black">{calculations.modelError ? 'Error' : Math.round(calculations.sumPvFcf).toLocaleString()}</td>
                      <td colSpan={6} className="bg-white border border-transparent"></td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <ExcelRowIndex i="11" />
                      <td className="border border-gray-200 px-2 py-1 bg-white font-semibold pl-3 tracking-tight">Present Value of Terminal (Yr 6+)</td>
                      <td className="border border-gray-200 px-2 py-1 text-right font-mono text-black border-b border-b-gray-400">{calculations.modelError ? 'Error' : Math.round(calculations.pvTerminalValue).toLocaleString()}</td>
                      <td colSpan={6} className="bg-white border border-transparent"></td>
                    </tr>
                    
                    <tr className="bg-gray-50/50">
                      <ExcelRowIndex i="12" />
                      <td className="border border-gray-200 px-2 py-1 bg-white font-extrabold uppercase pl-3 text-[10px] tracking-widest text-brand-navy">Enterprise Value</td>
                      <td className="border border-gray-200 px-2 py-1 text-right font-mono font-bold text-[12px] text-brand-navy">
                        {calculations.modelError ? 'Error' : Math.round(calculations.enterpriseValue).toLocaleString()}
                      </td>
                      <td colSpan={6} className="bg-white border border-transparent"></td>
                    </tr>

                    <tr className="hover:bg-gray-50/50">
                      <ExcelRowIndex i="13" />
                      <td className="border border-gray-200 px-2 py-1 bg-white pl-3 text-green-700">Plus: Cash & Equivalents</td>
                      <td className="border border-gray-200 px-2 py-1 text-right font-mono text-blue-700 bg-yellow-50">{Math.round(num(cashEq)).toLocaleString()}</td>
                      <td colSpan={6} className="bg-white border border-transparent"></td>
                    </tr>

                    <tr className="hover:bg-gray-50/50">
                      <ExcelRowIndex i="14" />
                      <td className="border border-gray-200 px-2 py-1 bg-white pl-3 text-red-600">Less: Total Outstanding Debt</td>
                      <td className="border border-gray-200 px-2 py-1 text-right font-mono text-blue-700 border-b border-b-gray-400 bg-yellow-50">({Math.round(num(totalDebt)).toLocaleString()})</td>
                      <td colSpan={6} className="bg-white border border-transparent"></td>
                    </tr>

                    <tr className="bg-[#e2f1e8]">
                      <ExcelRowIndex i="15" />
                      <td className="border border-gray-200 px-2 py-2 font-extrabold uppercase pl-3 text-[11px] tracking-widest text-[#0f5c2e]">Implied Equity Value</td>
                      <td className="border border-gray-200 px-2 py-2 text-right font-mono font-bold text-[14px] text-[#0f5c2e]">
                        <span className="border-b-2 border-double border-[#0f5c2e] pb-0.5">
                          {calculations.modelError ? 'Error' : Math.round(calculations.equityValue).toLocaleString()}
                        </span>
                      </td>
                      <td colSpan={6} className="bg-white border border-transparent"></td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 border-t-2 border-t-white">
                      <ExcelRowIndex i="16" />
                      <td className="border border-gray-200 px-2 py-1 bg-white pl-3 italic text-gray-500">Divided By: Fully Diluted Shares</td>
                      <td className="border border-gray-200 px-2 py-1 text-right font-mono text-blue-700 border-b border-b-gray-400 bg-yellow-50">{Math.round(num(shares)).toLocaleString()}</td>
                      <td colSpan={6} className="bg-white border border-transparent border-t border-t-gray-200"></td>
                    </tr>

                    <tr className="bg-[#eef3fb]">
                      <ExcelRowIndex i="17" />
                      <td className="border border-gray-200 px-2 py-2 font-extrabold uppercase pl-3 text-[11px] tracking-widest text-blue-800 shadow-inner">Target Share Price</td>
                      <td className="border border-gray-200 px-2 py-2 text-right font-mono font-extrabold text-[15px] text-blue-900 shadow-inner">
                        <span className="border-b-4 border-double border-blue-900 pb-0.5 px-2 bg-white rounded-sm shadow border">
                          {calculations.modelError ? 'Error' : `$${calculations.sharePrice.toFixed(2)}`}
                        </span>
                      </td>
                      <td colSpan={6} className="bg-white border border-transparent shadow-inner"></td>
                    </tr>

                    <tr>
                      <ExcelRowIndex i="18" />
                      <td colSpan={8} className="border border-gray-300 bg-gray-100/80 py-0.5 text-[9px] italic text-gray-400 pl-4 border-t shadow-inner uppercase tracking-wider">Ready</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Dynamic Summary Box */}
            <div className="bg-brand-navy p-6 rounded-xl shadow-lg relative overflow-hidden w-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
              </div>
              <h3 className="font-bold text-white mb-2 text-sm flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
                AI M&A Diligence Engine
              </h3>
              <p className="text-blue-50 text-sm leading-relaxed relative z-10 pt-2 font-light">
                {calculations.insightText}
              </p>
            </div>
            
          </div>
          
          {/* Paywall Overlay */}
          {isLocked && (
            <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center pt-20 bg-gray-900/10 backdrop-blur-sm -m-6 rounded-3xl">
              <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg text-center border border-gray-100 flex flex-col items-center relative z-50">
                <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-3">Model Locked</h3>
                <p className="text-brand-slate mb-8">
                  You've used your 1 free evaluation run of the complex M&A DCF Model. Subscribe/Buy now to unlock permanent access to this professional tool and all 10 financial calculators.
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
          <h2 className="text-2xl font-bold text-brand-navy mb-6">M&A Valuation Glossary</h2>
          <p className="text-brand-slate mb-8">Understanding the complex mechanics of Discounted Cash Flow math.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">💰</span> Free Cash Flow (FCF)</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> The actual cash a company generates after subtracting the money required to maintain its asset base. This is the pure cash that can be paid out to investors or used for acquisitions.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">📉</span> Discount Rate (WACC)</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> Expected return for investors. Because $100 today is worth more than $100 in five years (due to inflation and risk), we use this percentage to "discount" future cash back to its Present Value.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">🏁</span> Terminal Value</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> It is impossible to manually forecast every single year until the end of time. The Terminal Value is a massive mathematical assumption representing the entire value of the business from Year 6 into infinity.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">⚖️</span> Margin of Safety</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> The buffer against your own optimism. If a stock is theoretically worth $100, legendary investors like Warren Buffett will only buy it for $70, demanding a 30% margin of safety in case their growth assumptions were wrong.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">⚡</span> Net Working Capital (NWC)</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> The difference between your Current Assets and Current Liabilities. In a DCF, we subtract the "Change in NWC" because growing businesses often have cash tied up in inventory or unpaid customer invoices (receivables).</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">🏦</span> Enterprise Value vs Equity Value</h4>
              <p className="text-sm text-brand-slate leading-relaxed"><strong>What it is:</strong> Enterprise Value is the value of the entire business operations. Equity Value is what is left for shareholders after you pay off all the debt. Think of it like a house: House Value (Enterprise) - Mortgage (Debt) = Your Equity.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
