'use client';

import { useState } from 'react';

type LabTab = 'dcf' | 'wacc' | 'three-statement' | 'ratios' | 'credit' | 'excel';

export default function FinanceLabView() {
  const [activeLab, setActiveLab] = useState<LabTab>('dcf');

  // DCF Lab State
  const [fcf1, setFcf1] = useState(100);
  const [fcf2, setFcf2] = useState(125);
  const [fcf3, setFcf3] = useState(150);
  const [fcf4, setFcf4] = useState(180);
  const [fcf5, setFcf5] = useState(210);
  const [wacc, setWacc] = useState(11.5);
  const [termGrowth, setTermGrowth] = useState(4.5);
  const [netDebt, setNetDebt] = useState(120);
  const [shares, setShares] = useState(10);

  // WACC Lab State
  const [rf, setRf] = useState(7.1);
  const [beta, setBeta] = useState(1.15);
  const [rm, setRm] = useState(14.0);
  const [kd, setKd] = useState(8.5);
  const [taxRate, setTaxRate] = useState(25.0);
  const [weightEquity, setWeightEquity] = useState(70);

  // Three-Statement Scenario State
  const [selectedScenario, setSelectedScenario] = useState<'depr' | 'capex' | 'inventory' | 'buyback'>('depr');

  // Credit / DSCR State
  const [ebitda, setEbitda] = useState(80);
  const [taxPaid, setTaxPaid] = useState(18);
  const [principal, setPrincipal] = useState(22);
  const [interest, setInterest] = useState(12);

  // 1. DCF Calculations
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

  // 2. WACC Calculations
  const mrp = rm - rf;
  const costOfEquity = rf + beta * mrp;
  const afterTaxCostOfDebt = kd * (1 - taxRate / 100);
  const weightDebt = 100 - weightEquity;
  const calculatedWacc = (weightEquity / 100) * costOfEquity + (weightDebt / 100) * afterTaxCostOfDebt;

  // 3. Credit / DSCR Calculations
  const netOperatingCash = ebitda - taxPaid;
  const totalDebtService = principal + interest;
  const dscr = totalDebtService > 0 ? Math.round((netOperatingCash / totalDebtService) * 100) / 100 : 0;
  const icr = interest > 0 ? Math.round((ebitda / interest) * 100) / 100 : 0;

  return (
    <div className="space-y-6 pt-2">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Finance Technical Lab</h2>
        <p className="text-sm text-slate-400">
          Hands-on financial modeling workstations. Test DCF assumptions, calculate real WACC (India G-Sec benchmarks), audit 3-statement linkages, and check loan covenants.
        </p>
      </div>

      {/* Lab Module Selector Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
        {[
          { id: 'dcf', label: '1. DCF Valuation Model', icon: '📈' },
          { id: 'wacc', label: '2. WACC & CAPM India', icon: '💰' },
          { id: 'three-statement', label: '3. Three-Statement Linkage', icon: '📄' },
          { id: 'ratios', label: '4. Ratio & DuPont Lab', icon: '📊' },
          { id: 'credit', label: '5. Credit & DSCR Lab', icon: '🏦' },
          { id: 'excel', label: '6. Excel Modeling Functions', icon: '🧮' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveLab(tab.id as LabTab)}
            className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2 ${
              activeLab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── LAB 1: DCF MODEL ── */}
      {activeLab === 'dcf' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Model Inputs (₹ Crore)</h3>
              <span className="text-xs text-amber-400 font-mono">Dynamic Unlevered DCF</span>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-300 block">Forecasted Free Cash Flows to Firm (FCFF):</label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: 'Year 1', val: fcf1, set: setFcf1 },
                  { label: 'Year 2', val: fcf2, set: setFcf2 },
                  { label: 'Year 3', val: fcf3, set: setFcf3 },
                  { label: 'Year 4', val: fcf4, set: setFcf4 },
                  { label: 'Year 5', val: fcf5, set: setFcf5 },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block mb-1">{item.label}</span>
                    <input
                      type="number"
                      value={item.val}
                      onChange={(e) => item.set(Number(e.target.value) || 0)}
                      className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">WACC (Discount Rate)</span>
                  <span className="text-amber-400 font-bold">{wacc}%</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="18"
                  step="0.25"
                  value={wacc}
                  onChange={(e) => setWacc(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Terminal Growth Rate (g)</span>
                  <span className="text-amber-400 font-bold">{termGrowth}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="7"
                  step="0.25"
                  value={termGrowth}
                  onChange={(e) => setTermGrowth(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Net Debt (Debt − Cash, ₹ Cr)</label>
                <input
                  type="number"
                  value={netDebt}
                  onChange={(e) => setNetDebt(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Shares Outstanding (Cr)</label>
                <input
                  type="number"
                  value={shares}
                  onChange={(e) => setShares(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>
          </div>

          {/* DCF Outputs */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Valuation Output</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400">PV of 5-Year Cash Flows</span>
                  <span className="text-sm font-mono font-bold text-slate-200">₹{Math.round(sumPvFcff)} Cr</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400">PV of Terminal Value</span>
                  <span className="text-sm font-mono font-bold text-slate-200">₹{Math.round(pvTv)} Cr</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <span className="text-xs font-semibold text-amber-300">Enterprise Value (EV)</span>
                  <span className="text-base font-mono font-black text-amber-400">₹{Math.round(enterpriseValue)} Cr</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400">Less: Net Debt</span>
                  <span className="text-sm font-mono font-bold text-rose-400">− ₹{netDebt} Cr</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400">Implied Equity Value</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">₹{Math.round(equityValue)} Cr</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-center">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1">Target Fair Value Per Share</span>
              <div className="text-3xl font-black text-amber-400 font-mono">
                ₹{Math.round(targetPrice * 10) / 10}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Based on Gordon Growth Perpetuity Method</span>
            </div>
          </div>
        </div>
      )}

      {/* ── LAB 2: WACC & CAPM ── */}
      {activeLab === 'wacc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">CAPM & WACC Parameters (India)</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Risk-Free Rate (Rf: 10Y G-Sec %)</label>
                <input
                  type="number"
                  step="0.05"
                  value={rf}
                  onChange={(e) => setRf(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Beta (β - Systematic Risk)</label>
                <input
                  type="number"
                  step="0.05"
                  value={beta}
                  onChange={(e) => setBeta(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Expected Market Return (Rm %)</label>
                <input
                  type="number"
                  step="0.25"
                  value={rm}
                  onChange={(e) => setRm(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Pre-Tax Cost of Debt (Kd %)</label>
                <input
                  type="number"
                  step="0.25"
                  value={kd}
                  onChange={(e) => setKd(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Capital Structure: Equity ({weightEquity}%) vs Debt ({weightDebt}%)</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={weightEquity}
                onChange={(e) => setWeightEquity(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Cost of Capital Breakdown</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Market Risk Premium (Rm − Rf)</span>
                <span className="text-sm font-mono font-bold text-slate-200">{Math.round(mrp * 100) / 100}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Cost of Equity (Ke = Rf + β × MRP)</span>
                <span className="text-sm font-mono font-bold text-cyan-400">{Math.round(costOfEquity * 100) / 100}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">After-Tax Cost of Debt (Kd × [1 − T])</span>
                <span className="text-sm font-mono font-bold text-slate-200">{Math.round(afterTaxCostOfDebt * 100) / 100}%</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-center">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1">Blended WACC</span>
              <div className="text-4xl font-black text-amber-400 font-mono">
                {Math.round(calculatedWacc * 100) / 100}%
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Weight(E) × Ke + Weight(D) × Kd(1−T)</span>
            </div>
          </div>
        </div>
      )}

      {/* ── LAB 3: THREE-STATEMENT LINKAGE ── */}
      {activeLab === 'three-statement' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Select a Standard Transaction Scenario:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'depr', label: '1. ₹10 Cr Depreciation Increase (25% tax)' },
                { id: 'capex', label: '2. ₹50 Cr Debt-Financed CapEx' },
                { id: 'inventory', label: '3. ₹20 Cr Inventory on Credit (A/P)' },
                { id: 'buyback', label: '4. ₹30 Cr Share Buyback (Cash)' },
              ].map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenario(sc.id as any)}
                  className={`p-3 rounded-xl text-xs font-semibold text-left transition border ${
                    selectedScenario === sc.id
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          {selectedScenario === 'depr' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase">1. Income Statement</span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• Operating Expense (Depr): <span className="text-rose-400">+₹10 Cr</span></li>
                  <li>• Pre-Tax Operating Income: <span className="text-rose-400">−₹10 Cr</span></li>
                  <li>• Tax Saved (25% tax shield): <span className="text-emerald-400">+₹2.5 Cr</span></li>
                  <li className="font-bold pt-1 border-t border-slate-800">• Net Income: <span className="text-rose-400">−₹7.5 Cr</span></li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase">2. Cash Flow Statement</span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• Net Income starting line: <span className="text-rose-400">−₹7.5 Cr</span></li>
                  <li>• Non-Cash Depr Add-back: <span className="text-emerald-400">+₹10.0 Cr</span></li>
                  <li>• Cash Flow from Ops (CFO): <span className="text-emerald-400">+₹2.5 Cr</span></li>
                  <li className="font-bold pt-1 border-t border-slate-800">• Net Change in Cash: <span className="text-emerald-400">+₹2.5 Cr</span></li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase">3. Balance Sheet</span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• Cash (Asset): <span className="text-emerald-400">+₹2.5 Cr</span></li>
                  <li>• PP&E (Net of Depr): <span className="text-rose-400">−₹10.0 Cr</span></li>
                  <li>• Total Assets: <span className="text-rose-400">−₹7.5 Cr</span></li>
                  <li className="font-bold pt-1 border-t border-slate-800">• Retained Earnings: <span className="text-rose-400">−₹7.5 Cr</span> (Balances!)</li>
                </ul>
              </div>
            </div>
          )}

          {selectedScenario === 'capex' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase">1. Income Statement</span>
                <p className="text-xs text-slate-300">
                  No immediate impact. CapEx is capitalized on Balance Sheet and depreciated over useful life in subsequent periods.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase">2. Cash Flow Statement</span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• Cash Flow from Investing (CFI): <span className="text-rose-400">−₹50 Cr</span> (CapEx)</li>
                  <li>• Cash Flow from Financing (CFF): <span className="text-emerald-400">+₹50 Cr</span> (Debt Issued)</li>
                  <li className="font-bold pt-1 border-t border-slate-800">• Net Change in Cash: <span className="text-slate-400">₹0 Cr</span></li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase">3. Balance Sheet</span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• PP&E (Assets): <span className="text-emerald-400">+₹50 Cr</span></li>
                  <li>• Long-Term Debt (Liabilities): <span className="text-emerald-400">+₹50 Cr</span></li>
                  <li className="font-bold pt-1 border-t border-slate-800">• Assets = Liabilities balances perfectly!</li>
                </ul>
              </div>
            </div>
          )}

          {selectedScenario === 'inventory' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase">1. Income Statement</span>
                <p className="text-xs text-slate-300">
                  No impact until goods are sold (when they become COGS).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase">2. Cash Flow Statement</span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• Δ Working Capital: Inventory +₹20 Cr (cash outflow)</li>
                  <li>• Δ Accounts Payable: +₹20 Cr (cash inflow)</li>
                  <li className="font-bold pt-1 border-t border-slate-800">• Net Cash Impact: <span className="text-slate-400">₹0 Cr</span></li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase">3. Balance Sheet</span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• Current Assets (Inventory): <span className="text-emerald-400">+₹20 Cr</span></li>
                  <li>• Current Liabilities (A/P): <span className="text-emerald-400">+₹20 Cr</span></li>
                  <li className="font-bold pt-1 border-t border-slate-800">• Assets = Liabilities balances!</li>
                </ul>
              </div>
            </div>
          )}

          {selectedScenario === 'buyback' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase">1. Income Statement</span>
                <p className="text-xs text-slate-300">
                  No immediate P&L line impact (buyback is an equity transaction). Future EPS rises because share count falls.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase">2. Cash Flow Statement</span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• Cash Flow from Financing (CFF): <span className="text-rose-400">−₹30 Cr</span></li>
                  <li className="font-bold pt-1 border-t border-slate-800">• Net Change in Cash: <span className="text-rose-400">−₹30 Cr</span></li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase">3. Balance Sheet</span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• Cash (Assets): <span className="text-rose-400">−₹30 Cr</span></li>
                  <li>• Shareholders' Equity (Treasury/RE): <span className="text-rose-400">−₹30 Cr</span></li>
                  <li className="font-bold pt-1 border-t border-slate-800">• Assets ↓ ₹30 = Equity ↓ ₹30 (Balances!)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── LAB 4: CREDIT & DSCR ── */}
      {activeLab === 'credit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Borrower Financials (₹ Crore)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Operating EBITDA (₹ Cr)</label>
                <input
                  type="number"
                  value={ebitda}
                  onChange={(e) => setEbitda(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Direct Taxes Paid (₹ Cr)</label>
                <input
                  type="number"
                  value={taxPaid}
                  onChange={(e) => setTaxPaid(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Annual Principal Repayment (₹ Cr)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Annual Interest Expense (₹ Cr)</label>
                <input
                  type="number"
                  value={interest}
                  onChange={(e) => setInterest(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Covenant & Credit Assessment</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Net Operating Cash (EBITDA − Tax)</span>
                <span className="text-sm font-mono font-bold text-white">₹{netOperatingCash} Cr</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Total Debt Service (Principal + Int)</span>
                <span className="text-sm font-mono font-bold text-white">₹{totalDebtService} Cr</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Interest Coverage Ratio (EBITDA / Int)</span>
                <span className="text-sm font-mono font-bold text-cyan-400">{icr}x</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-center">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block mb-1">Debt Service Coverage Ratio (DSCR)</span>
              <div className="text-4xl font-black text-emerald-400 font-mono">
                {dscr}x
              </div>
              <span className={`text-xs font-bold mt-2 inline-block px-3 py-1 rounded-full ${
                dscr >= 1.5 ? 'bg-emerald-500/20 text-emerald-400' :
                dscr >= 1.25 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {dscr >= 1.5 ? '✓ APPROVED: High Lending Cushion' : dscr >= 1.25 ? '⚠ CONDITIONAL: Tight Debt Service' : '✕ REJECTED: Inadequate Coverage'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── LAB 5: RATIO & DUPONT ── */}
      {activeLab === 'ratios' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">3-Stage DuPont ROE Decomposition</h3>
          <p className="text-xs text-slate-400">
            DuPont breaks down Return on Equity into Operating Efficiency (Net Margin), Asset Efficiency (Turnover), and Financial Leverage (Equity Multiplier).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">1. Net Profit Margin</span>
              <div className="text-2xl font-black text-amber-400 font-mono">14.5%</div>
              <span className="text-[11px] text-slate-500 mt-1 block">Net Income / Revenue</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">2. Asset Turnover</span>
              <div className="text-2xl font-black text-cyan-400 font-mono">1.25x</div>
              <span className="text-[11px] text-slate-500 mt-1 block">Revenue / Total Assets</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">3. Financial Leverage</span>
              <div className="text-2xl font-black text-violet-400 font-mono">1.60x</div>
              <span className="text-[11px] text-slate-500 mt-1 block">Total Assets / Total Equity</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Implied ROE</span>
            <div className="text-3xl font-black text-amber-400 font-mono mt-1">
              29.0%
            </div>
            <span className="text-xs text-slate-400 mt-1 block">14.5% × 1.25 × 1.60 = 29.0% Return on Equity</span>
          </div>
        </div>
      )}

      {/* ── LAB 6: EXCEL FUNCTIONS ── */}
      {activeLab === 'excel' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Essential Excel Financial Modeling Shortcuts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { func: '=XNPV(rate, values, dates)', desc: 'Calculates NPV for irregular cash flow intervals — essential for non-annual M&A deals.' },
              { func: '=XIRR(values, dates, [guess])', desc: 'Internal Rate of Return with exact transaction dates. Mandatory for PE buyout models.' },
              { func: '=INDEX(range, MATCH(val, lookup, 0))', desc: 'Fast dynamic lookup, immune to column insertions unlike VLOOKUP.' },
              { func: '=OFFSET(reference, rows, cols)', desc: 'Used for dynamic financial statement corkscrew schedules.' },
              { func: '=PMT(rate, nper, pv)', desc: 'Computes constant loan EMI payments for debt service schedules.' },
              { func: 'Ctrl + [ / F5 Enter', desc: 'Trace precedent cells / return to original cell — speeds up financial model auditing by 10x.' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono font-bold text-amber-400 block mb-1">{item.func}</span>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
