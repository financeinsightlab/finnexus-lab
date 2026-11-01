'use client';

import { useState } from 'react';

type LabTab =
  | 'dcf'
  | 'wacc'
  | 'three-statement'
  | 'ratios'
  | 'credit'
  | 'cca'
  | 'lbo'
  | 'ev-bridge'
  | 'nwc'
  | 'excel';

export default function FinanceLabView() {
  const [activeLab, setActiveLab] = useState<LabTab>('dcf');

  // 1. DCF Lab State
  const [fcf1, setFcf1] = useState(100);
  const [fcf2, setFcf2] = useState(125);
  const [fcf3, setFcf3] = useState(150);
  const [fcf4, setFcf4] = useState(180);
  const [fcf5, setFcf5] = useState(210);
  const [wacc, setWacc] = useState(11.5);
  const [termGrowth, setTermGrowth] = useState(4.5);
  const [netDebt, setNetDebt] = useState(120);
  const [shares, setShares] = useState(10);

  // 2. WACC Lab State
  const [rf, setRf] = useState(6.84); // India 10Y Benchmark
  const [beta, setBeta] = useState(1.15);
  const [rm, setRm] = useState(13.5);
  const [kd, setKd] = useState(8.5);
  const [taxRate, setTaxRate] = useState(25.17); // Indian statutory corporate tax
  const [weightEquity, setWeightEquity] = useState(70);

  // 3. Three-Statement Scenario State
  const [selectedScenario, setSelectedScenario] = useState<'depr' | 'capex' | 'inventory' | 'buyback'>('depr');

  // 4. Credit / DSCR State
  const [ebitda, setEbitda] = useState(80);
  const [taxPaid, setTaxPaid] = useState(18);
  const [principal, setPrincipal] = useState(22);
  const [interest, setInterest] = useState(12);

  // 5. CCA Multiples State
  const [targetEbitda, setTargetEbitda] = useState(150);
  const [peerMultiple, setPeerMultiple] = useState(14.5);
  const [targetNetDebt, setTargetNetDebt] = useState(180);

  // 6. LBO State
  const [entryMultiple, setEntryMultiple] = useState(10.0);
  const [entryEbitda, setEntryEbitda] = useState(100);
  const [leverageDebtPct, setLeverageDebtPct] = useState(60);
  const [exitMultiple, setExitMultiple] = useState(11.0);
  const [exitEbitda, setExitEbitda] = useState(160);
  const [holdingYears, setHoldingYears] = useState(5);
  const [endingDebt, setEndingDebt] = useState(250);

  // 7. EV Bridge State
  const [bridgeMktCap, setBridgeMktCap] = useState(1000);
  const [bridgeDebt, setBridgeDebt] = useState(250);
  const [bridgeCash, setBridgeCash] = useState(80);
  const [bridgeMinority, setBridgeMinority] = useState(25);
  const [bridgeAssociates, setBridgeAssociates] = useState(40);

  // 8. Working Capital & Cash Conversion Cycle
  const [dso, setDso] = useState(45);
  const [dio, setDio] = useState(60);
  const [dpo, setDpo] = useState(50);

  // ─── Mathematical Computations ──────────────────────────────────────────────
  // 1. DCF
  const r = wacc / 100;
  const g = termGrowth / 100;
  const pv1 = fcf1 / Math.pow(1 + r, 1);
  const pv2 = fcf2 / Math.pow(1 + r, 2);
  const pv3 = fcf3 / Math.pow(1 + r, 3);
  const pv4 = fcf4 / Math.pow(1 + r, 4);
  const pv5 = fcf5 / Math.pow(1 + r, 5);
  const sumPvFcff = pv1 + pv2 + pv3 + pv4 + pv5;
  const terminalValue = (fcf5 * (1 + g)) / Math.max(0.001, r - g);
  const pvTv = terminalValue / Math.pow(1 + r, 5);
  const enterpriseValue = sumPvFcff + pvTv;
  const equityValue = enterpriseValue - netDebt;
  const targetPrice = equityValue / Math.max(0.1, shares);

  // 2. WACC
  const mrp = rm - rf;
  const costOfEquity = rf + beta * mrp;
  const afterTaxCostOfDebt = kd * (1 - taxRate / 100);
  const weightDebt = 100 - weightEquity;
  const calculatedWacc = (weightEquity / 100) * costOfEquity + (weightDebt / 100) * afterTaxCostOfDebt;

  // 3. Credit / DSCR
  const netOperatingCash = ebitda - taxPaid;
  const totalDebtService = principal + interest;
  const dscr = totalDebtService > 0 ? Math.round((netOperatingCash / totalDebtService) * 100) / 100 : 0;
  const icr = interest > 0 ? Math.round((ebitda / interest) * 100) / 100 : 0;

  // 5. CCA
  const impliedEv = targetEbitda * peerMultiple;
  const impliedEquityVal = impliedEv - targetNetDebt;

  // 6. LBO
  const totalEntryEv = entryEbitda * entryMultiple;
  const sponsorSunkEquity = totalEntryEv * (1 - leverageDebtPct / 100);
  const totalExitEv = exitEbitda * exitMultiple;
  const sponsorExitEquity = Math.max(0, totalExitEv - endingDebt);
  const moic = sponsorSunkEquity > 0 ? Math.round((sponsorExitEquity / sponsorSunkEquity) * 10) / 10 : 0;
  const irr = sponsorSunkEquity > 0 && holdingYears > 0
    ? Math.round((Math.pow(sponsorExitEquity / sponsorSunkEquity, 1 / holdingYears) - 1) * 1000) / 10
    : 0;

  // 7. EV Bridge
  const computedEv = bridgeMktCap + bridgeDebt - bridgeCash + bridgeMinority - bridgeAssociates;

  // 8. Working Capital CCC
  const ccc = dso + dio - dpo;

  return (
    <div className="space-y-6 pt-2 font-sans text-neutral-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>OPERATING SYSTEM</span>
            <span>/</span>
            <span>TECHNICAL LAB</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
            Finance Technical Modelling Workstations
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            10 interactive workstations combining exact financial calculations with Indian benchmark nuances.
          </p>
        </div>
        <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded">
          ✓ REAL-TIME FORMULA ENGINE ACTIVE
        </div>
      </div>

      {/* Lab Module Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 pb-2 border-b border-neutral-800 overflow-x-auto scrollbar-none font-mono text-xs">
        {[
          { id: 'dcf', label: '1. DCF Model', icon: '📈' },
          { id: 'wacc', label: '2. WACC & CAPM', icon: '⚖️' },
          { id: 'three-statement', label: '3. 3-Statement Linkages', icon: '📄' },
          { id: 'ratios', label: '4. Ratio & DuPont', icon: '📊' },
          { id: 'credit', label: '5. Credit & DSCR', icon: '🏦' },
          { id: 'cca', label: '6. Comp Multiples (CCA)', icon: '🔍' },
          { id: 'lbo', label: '7. LBO & MoIC Waterfall', icon: '💼' },
          { id: 'ev-bridge', label: '8. EV to Equity Bridge', icon: '🌉' },
          { id: 'nwc', label: '9. Working Capital & CCC', icon: '🔄' },
          { id: 'excel', label: '10. Excel Functions', icon: '🧮' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveLab(tab.id as LabTab)}
            className={`px-3 py-2 rounded transition-all whitespace-nowrap flex items-center gap-1.5 border ${
              activeLab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold shadow-sm'
                : 'bg-[#0e1626] border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── WORKSTATION 1: DCF VALUATION MODEL ── */}
      {activeLab === 'dcf' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              DCF Drivers & Cash Flow Projections (₹ Crores)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              {[
                { yr: 'Yr 1', v: fcf1, set: setFcf1 },
                { yr: 'Yr 2', v: fcf2, set: setFcf2 },
                { yr: 'Yr 3', v: fcf3, set: setFcf3 },
                { yr: 'Yr 4', v: fcf4, set: setFcf4 },
                { yr: 'Yr 5', v: fcf5, set: setFcf5 },
              ].map((item) => (
                <div key={item.yr} className="bg-[#080d1a] border border-neutral-800 p-2 rounded">
                  <span className="text-[10px] text-neutral-400 block">{item.yr} UFCF</span>
                  <input
                    type="number"
                    value={item.v}
                    onChange={(e) => item.set(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent text-white font-bold text-xs focus:outline-none mt-1"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
              <div>
                <label className="text-neutral-400 block mb-1">Discount Rate (WACC %)</label>
                <input
                  type="number"
                  step="0.1"
                  value={wacc}
                  onChange={(e) => setWacc(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Perpetual Growth Rate (g %)</label>
                <input
                  type="number"
                  step="0.1"
                  value={termGrowth}
                  onChange={(e) => setTermGrowth(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Net Debt (₹ Cr)</label>
                <input
                  type="number"
                  value={netDebt}
                  onChange={(e) => setNetDebt(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Diluted Shares (Cr)</label>
                <input
                  type="number"
                  step="0.1"
                  value={shares}
                  onChange={(e) => setShares(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Implied Valuation Output
            </h3>
            <div className="space-y-2">
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">PV of 5-Yr Cash Flows</span>
                <span className="text-white font-bold">₹{Math.round(sumPvFcff)} Cr</span>
              </div>
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">PV of Terminal Value</span>
                <span className="text-white font-bold">₹{Math.round(pvTv)} Cr</span>
              </div>
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">Enterprise Value (EV)</span>
                <span className="text-cyan-400 font-bold">₹{Math.round(enterpriseValue)} Cr</span>
              </div>
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">Equity Value (EV − Net Debt)</span>
                <span className="text-emerald-400 font-bold">₹{Math.round(equityValue)} Cr</span>
              </div>
            </div>

            <div className="p-4 rounded bg-cyan-950/40 border border-cyan-500/40 text-center mt-3">
              <span className="text-[11px] text-cyan-300 font-semibold uppercase block mb-1">
                Implied Fair Value Per Share
              </span>
              <div className="text-3xl font-extrabold text-white">
                ₹{targetPrice.toFixed(2)}
              </div>
              <span className="text-[10px] text-neutral-400 mt-1 block">
                Gordon Growth TV accounts for {Math.round((pvTv / (enterpriseValue || 1)) * 100)}% of total EV
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── WORKSTATION 2: WACC & CAPM INDIA ── */}
      {activeLab === 'wacc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Cost of Capital Parameters (India Benchmarks)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-neutral-400 block mb-1">Risk-Free Rate (Rf % — India 10Y G-Sec)</label>
                <input
                  type="number"
                  step="0.01"
                  value={rf}
                  onChange={(e) => setRf(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white font-bold"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Equity Beta (β)</label>
                <input
                  type="number"
                  step="0.05"
                  value={beta}
                  onChange={(e) => setBeta(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Expected Market Return (Rm %)</label>
                <input
                  type="number"
                  step="0.1"
                  value={rm}
                  onChange={(e) => setRm(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Pre-Tax Cost of Debt (Kd %)</label>
                <input
                  type="number"
                  step="0.1"
                  value={kd}
                  onChange={(e) => setKd(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Corporate Tax Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Equity Weight (E/V %)</label>
                <input
                  type="number"
                  value={weightEquity}
                  onChange={(e) => setWeightEquity(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              WACC Build-up Breakdown
            </h3>
            <div className="space-y-2">
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">Equity Risk Premium (Rm − Rf)</span>
                <span className="text-white font-bold">{mrp.toFixed(2)}%</span>
              </div>
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">Cost of Equity (Ke via CAPM)</span>
                <span className="text-cyan-400 font-bold">{costOfEquity.toFixed(2)}%</span>
              </div>
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">After-Tax Cost of Debt [Kd × (1−T)]</span>
                <span className="text-emerald-400 font-bold">{afterTaxCostOfDebt.toFixed(2)}%</span>
              </div>
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">Capital Structure Weight (D / V)</span>
                <span className="text-neutral-300 font-bold">{weightDebt}%</span>
              </div>
            </div>

            <div className="p-4 rounded bg-emerald-950/40 border border-emerald-500/40 text-center mt-3">
              <span className="text-[11px] text-emerald-300 font-semibold uppercase block mb-1">
                Calculated Weighted Average Cost of Capital (WACC)
              </span>
              <div className="text-3xl font-extrabold text-white">
                {calculatedWacc.toFixed(2)}%
              </div>
              <span className="text-[10px] text-neutral-400 mt-1 block">
                Typical Indian corporate WACC range: 11.5% to 14.0%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── WORKSTATION 3: THREE-STATEMENT LINKAGES ── */}
      {activeLab === 'three-statement' && (
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-3 gap-2">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Interactive Multi-Statement Flow Scenarios
            </h3>
            <div className="flex bg-[#080d1a] border border-neutral-800 rounded p-0.5 text-xs font-mono">
              {[
                { id: 'depr', label: '₹10 Cr Depreciation' },
                { id: 'capex', label: '₹50 Cr Debt-Financed CapEx' },
                { id: 'inventory', label: '₹20 Cr Inventory Write-Down' },
                { id: 'buyback', label: '₹30 Cr Share Buyback' },
              ].map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenario(sc.id as any)}
                  className={`px-3 py-1 rounded transition-colors ${
                    selectedScenario === sc.id
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          {selectedScenario === 'depr' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-[#080d1a] border border-neutral-800 p-4 rounded-lg space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[11px] block">1. Income Statement</span>
                <p className="text-neutral-300 font-sans text-xs">
                  Operating expenses increase by ₹10 Cr. EBIT decreases by ₹10 Cr. At 25% tax, PAT decreases by <strong>₹7.5 Cr</strong>.
                </p>
              </div>
              <div className="bg-[#080d1a] border border-neutral-800 p-4 rounded-lg space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[11px] block">2. Cash Flow Statement</span>
                <p className="text-neutral-300 font-sans text-xs">
                  Net Income starts -₹7.5 Cr. Add back non-cash Depreciation (+₹10 Cr). Cash Flow from Operations increases by <strong>+₹2.5 Cr</strong> (the tax shield).
                </p>
              </div>
              <div className="bg-[#080d1a] border border-neutral-800 p-4 rounded-lg space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[11px] block">3. Balance Sheet</span>
                <p className="text-neutral-300 font-sans text-xs">
                  Cash is up by +₹2.5 Cr. PP&E is down by -₹10 Cr (Net Assets: -₹7.5 Cr). Retained earnings down by -₹7.5 Cr. Both sides balance!
                </p>
              </div>
            </div>
          )}

          {selectedScenario === 'capex' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-[#080d1a] border border-neutral-800 p-4 rounded-lg space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[11px] block">1. Income Statement</span>
                <p className="text-neutral-300 font-sans text-xs">
                  No immediate change in Year 0. CapEx is capitalized on the Balance Sheet; Depreciation will begin in Year 1.
                </p>
              </div>
              <div className="bg-[#080d1a] border border-neutral-800 p-4 rounded-lg space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[11px] block">2. Cash Flow Statement</span>
                <p className="text-neutral-300 font-sans text-xs">
                  CFI shows -₹50 Cr outflow for CapEx. CFF shows +₹50 Cr inflow from Debt Issuance. Net Cash change is <strong>₹0 Cr</strong>.
                </p>
              </div>
              <div className="bg-[#080d1a] border border-neutral-800 p-4 rounded-lg space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[11px] block">3. Balance Sheet</span>
                <p className="text-neutral-300 font-sans text-xs">
                  PP&E increases by +₹50 Cr. Long-Term Debt increases by +₹50 Cr. Both Assets and Liabilities increase symmetrically.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── WORKSTATION 4: RATIO & DUPONT LAB ── */}
      {activeLab === 'ratios' && (
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-4">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
            3-Stage DuPont ROE Decomposition Engine
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            <div className="bg-[#080d1a] border border-neutral-800 p-4 rounded">
              <span className="text-[11px] text-neutral-400 block">1. Net Profit Margin</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">14.5%</div>
              <span className="text-[10px] text-neutral-500 block mt-1">Profitability: PAT / Revenue</span>
            </div>
            <div className="bg-[#080d1a] border border-neutral-800 p-4 rounded">
              <span className="text-[11px] text-neutral-400 block">2. Total Asset Turnover</span>
              <div className="text-2xl font-bold text-cyan-400 mt-1">1.25x</div>
              <span className="text-[10px] text-neutral-500 block mt-1">Efficiency: Revenue / Assets</span>
            </div>
            <div className="bg-[#080d1a] border border-neutral-800 p-4 rounded">
              <span className="text-[11px] text-neutral-400 block">3. Equity Multiplier (Leverage)</span>
              <div className="text-2xl font-bold text-indigo-400 mt-1">1.60x</div>
              <span className="text-[10px] text-neutral-500 block mt-1">Gearing: Assets / Equity</span>
            </div>
          </div>
          <div className="p-4 bg-cyan-950/40 border border-cyan-500/40 rounded text-center font-mono">
            <span className="text-xs text-cyan-300 font-semibold block uppercase">Implied Return on Equity (ROE)</span>
            <div className="text-3xl font-extrabold text-white mt-1">29.0%</div>
            <span className="text-[11px] text-neutral-400 mt-1 block">
              14.5% Net Margin × 1.25 Turnover × 1.60 Equity Multiplier = 29.0% ROE
            </span>
          </div>
        </div>
      )}

      {/* ── WORKSTATION 5: CREDIT & DSCR LAB ── */}
      {activeLab === 'credit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono text-xs">
          <div className="lg:col-span-7 bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-3">
            <h3 className="font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Credit Cash Flow & Debt Service Inputs (₹ Cr)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-neutral-400 block mb-1">EBITDA</label>
                <input
                  type="number"
                  value={ebitda}
                  onChange={(e) => setEbitda(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Direct Taxes Paid</label>
                <input
                  type="number"
                  value={taxPaid}
                  onChange={(e) => setTaxPaid(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Annual Principal Repayment</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Interest Expense</label>
                <input
                  type="number"
                  value={interest}
                  onChange={(e) => setInterest(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-3">
            <h3 className="font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Bank Covenant Underwriting
            </h3>
            <div className="space-y-2">
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">Net Operating Cash</span>
                <span className="text-white font-bold">₹{netOperatingCash} Cr</span>
              </div>
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">Total Debt Service</span>
                <span className="text-white font-bold">₹{totalDebtService} Cr</span>
              </div>
              <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
                <span className="text-neutral-400">Interest Coverage (ICR)</span>
                <span className="text-cyan-400 font-bold">{icr}x</span>
              </div>
            </div>

            <div className="p-4 rounded bg-emerald-950/40 border border-emerald-500/40 text-center">
              <span className="text-[11px] text-emerald-300 font-semibold uppercase block mb-1">
                Debt Service Coverage Ratio (DSCR)
              </span>
              <div className="text-3xl font-extrabold text-white">{dscr}x</div>
              <span
                className={`text-[10px] font-bold mt-1.5 inline-block px-2.5 py-0.5 rounded ${
                  dscr >= 1.5
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : dscr >= 1.25
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {dscr >= 1.5 ? '✓ APPROVED: High Lending Cushion' : dscr >= 1.25 ? '⚠ CONDITIONAL: Tight Debt Service' : '✕ REJECTED: High Default Risk'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── WORKSTATION 6: CCA COMPARABLE MULTIPLES ── */}
      {activeLab === 'cca' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono text-xs">
          <div className="lg:col-span-7 bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-3">
            <h3 className="font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Comparable Companies Valuation Inputs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-neutral-400 block mb-1">Target EBITDA (₹ Cr)</label>
                <input
                  type="number"
                  value={targetEbitda}
                  onChange={(e) => setTargetEbitda(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Peer Median EV/EBITDA</label>
                <input
                  type="number"
                  step="0.1"
                  value={peerMultiple}
                  onChange={(e) => setPeerMultiple(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Target Net Debt (₹ Cr)</label>
                <input
                  type="number"
                  value={targetNetDebt}
                  onChange={(e) => setTargetNetDebt(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-3">
            <h3 className="font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Relative Valuation Output
            </h3>
            <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
              <span className="text-neutral-400">Implied Enterprise Value</span>
              <span className="text-cyan-400 font-bold">₹{Math.round(impliedEv)} Cr</span>
            </div>
            <div className="p-4 bg-cyan-950/40 border border-cyan-500/40 rounded text-center">
              <span className="text-[11px] text-cyan-300 font-semibold block uppercase">Implied Equity Value</span>
              <div className="text-3xl font-extrabold text-white mt-1">₹{Math.round(impliedEquityVal)} Cr</div>
            </div>
          </div>
        </div>
      )}

      {/* ── WORKSTATION 7: LBO DEBT WATERFALL & IRR ── */}
      {activeLab === 'lbo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono text-xs">
          <div className="lg:col-span-7 bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-3">
            <h3 className="font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Sponsor Buyout & Exit Assumptions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-neutral-400 block mb-1">Entry EBITDA (₹ Cr)</label>
                <input
                  type="number"
                  value={entryEbitda}
                  onChange={(e) => setEntryEbitda(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Entry EV Multiple</label>
                <input
                  type="number"
                  step="0.5"
                  value={entryMultiple}
                  onChange={(e) => setEntryMultiple(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Debt Financing %</label>
                <input
                  type="number"
                  value={leverageDebtPct}
                  onChange={(e) => setLeverageDebtPct(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Exit EBITDA (₹ Cr)</label>
                <input
                  type="number"
                  value={exitEbitda}
                  onChange={(e) => setExitEbitda(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Exit Multiple</label>
                <input
                  type="number"
                  step="0.5"
                  value={exitMultiple}
                  onChange={(e) => setExitMultiple(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Holding Period (Years)</label>
                <input
                  type="number"
                  value={holdingYears}
                  onChange={(e) => setHoldingYears(parseFloat(e.target.value) || 5)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-3">
            <h3 className="font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Sponsor Returns (MoIC & IRR)
            </h3>
            <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
              <span className="text-neutral-400">Sponsor Equity Invested</span>
              <span className="text-white font-bold">₹{Math.round(sponsorSunkEquity)} Cr</span>
            </div>
            <div className="p-2.5 bg-[#080d1a] rounded border border-neutral-800 flex justify-between">
              <span className="text-neutral-400">Sponsor Exit Equity</span>
              <span className="text-white font-bold">₹{Math.round(sponsorExitEquity)} Cr</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 bg-cyan-950/40 border border-cyan-500/40 rounded text-center">
                <span className="text-[10px] text-cyan-300 uppercase block">Multiple on Invested Capital</span>
                <div className="text-2xl font-black text-white mt-1">{moic}x</div>
              </div>
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded text-center">
                <span className="text-[10px] text-emerald-300 uppercase block">Internal Rate of Return</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">{irr}%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── WORKSTATION 8: EV BRIDGE ── */}
      {activeLab === 'ev-bridge' && (
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-4 font-mono text-xs">
          <h3 className="font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
            Enterprise Value to Equity Value Bridge Calculator
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <label className="text-neutral-400 block mb-1">Market Cap (+)</label>
              <input
                type="number"
                value={bridgeMktCap}
                onChange={(e) => setBridgeMktCap(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Total Debt (+)</label>
              <input
                type="number"
                value={bridgeDebt}
                onChange={(e) => setBridgeDebt(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Cash & Equiv (−)</label>
              <input
                type="number"
                value={bridgeCash}
                onChange={(e) => setBridgeCash(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Minority Interest (+)</label>
              <input
                type="number"
                value={bridgeMinority}
                onChange={(e) => setBridgeMinority(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Associates/JV (−)</label>
              <input
                type="number"
                value={bridgeAssociates}
                onChange={(e) => setBridgeAssociates(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
              />
            </div>
          </div>
          <div className="p-4 bg-cyan-950/40 border border-cyan-500/40 rounded text-center">
            <span className="text-[11px] text-cyan-300 font-semibold block uppercase">Enterprise Value (EV)</span>
            <div className="text-3xl font-extrabold text-white mt-1">₹{computedEv} Cr</div>
            <span className="text-[10px] text-neutral-400 block mt-1">
              Formula: Market Cap + Total Debt − Cash + Minority Interest − Equity in Affiliates
            </span>
          </div>
        </div>
      )}

      {/* ── WORKSTATION 9: WORKING CAPITAL & CCC ── */}
      {activeLab === 'nwc' && (
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-4 font-mono text-xs">
          <h3 className="font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
            Cash Conversion Cycle (CCC) & Operating Working Capital
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-neutral-400 block mb-1">Days Sales Outstanding (DSO)</label>
              <input
                type="number"
                value={dso}
                onChange={(e) => setDso(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Days Inventory Outstanding (DIO)</label>
              <input
                type="number"
                value={dio}
                onChange={(e) => setDio(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Days Payables Outstanding (DPO)</label>
              <input
                type="number"
                value={dpo}
                onChange={(e) => setDpo(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#080d1a] border border-neutral-800 rounded p-2 text-white"
              />
            </div>
          </div>
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded text-center">
            <span className="text-[11px] text-emerald-300 font-semibold block uppercase">Cash Conversion Cycle</span>
            <div className="text-3xl font-extrabold text-white mt-1">{ccc} Days</div>
            <span className="text-[10px] text-neutral-400 block mt-1">
              DSO ({dso}d) + DIO ({dio}d) − DPO ({dpo}d) = {ccc} days working capital liquidity gap
            </span>
          </div>
        </div>
      )}

      {/* ── WORKSTATION 10: EXCEL FUNCTIONS ── */}
      {activeLab === 'excel' && (
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-5 space-y-4">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
            Institutional Excel Financial Functions & Auditing Keybindings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            {[
              { func: '=XNPV(rate, values, dates)', desc: 'Calculates NPV for irregular non-periodic cash flow intervals — standard for M&A closing dates.' },
              { func: '=XIRR(values, dates, [guess])', desc: 'Computes internal rate of return for exact transaction dates. Mandatory for PE buyout models.' },
              { func: '=INDEX(range, MATCH(val, lookup, 0))', desc: 'Two-way matrix lookup immune to column insertions, superior to legacy VLOOKUP.' },
              { func: '=OFFSET(reference, rows, cols)', desc: 'Dynamic range referencing utilized for flexible rolling debt schedules.' },
              { func: '=PMT(rate, nper, pv)', desc: 'Calculates constant installment loan amortization for bank debt service.' },
              { func: 'Ctrl + [ / F5 + Enter', desc: 'Directly trace precedent cells across sheets, speeding up model error auditing by 10x.' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded bg-[#080d1a] border border-neutral-800">
                <span className="text-cyan-400 font-bold block mb-1">{item.func}</span>
                <p className="text-neutral-400 font-sans text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
