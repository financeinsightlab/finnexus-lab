import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Macroeconomic Intelligence Terminal — India & Global Indicators | KunwarAnalytics',
  description:
    'Institutional macroeconomic tracking covering GDP growth, CPI inflation, RBI repo rate, CAD, forex reserves, fiscal deficit, and PMI indicators.',
};

interface MacroIndicator {
  name: string;
  category: 'India Macro' | 'Global Benchmarks';
  value: string;
  change: string;
  isPositive: boolean;
  frequency: string;
  asOf: string;
  source: string;
  description: string;
}

const MACRO_INDICATORS: MacroIndicator[] = [
  {
    name: 'India Real GDP Growth (YoY)',
    category: 'India Macro',
    value: '6.70%',
    change: '-1.1% from Q4',
    isPositive: true,
    frequency: 'Quarterly',
    asOf: 'Q1 FY25 (Apr-Jun)',
    source: 'MOSPI / CSO',
    description: 'Resilient domestic consumption and gross fixed capital formation balancing subdued government capital expenditure during election quarter.',
  },
  {
    name: 'India CPI Headline Inflation',
    category: 'India Macro',
    value: '5.49%',
    change: '+1.84% MoM',
    isPositive: false,
    frequency: 'Monthly',
    asOf: 'Sep 2024',
    source: 'MOSPI',
    description: 'Elevated primarily by erratic vegetable prices and base effects. Core CPI inflation remains anchored near 3.5%.',
  },
  {
    name: 'RBI Policy Repo Rate',
    category: 'India Macro',
    value: '6.50%',
    change: 'Unchanged for 10th meeting',
    isPositive: true,
    frequency: 'Bi-Monthly',
    asOf: 'Oct 2024',
    source: 'Reserve Bank of India',
    description: 'MPC shifted monetary policy stance from "Withdrawal of Accommodation" to "Neutral", signaling potential rate ease in early 2025.',
  },
  {
    name: 'India Foreign Exchange Reserves',
    category: 'India Macro',
    value: '$688.26 Billion',
    change: '-$2.16B WoW',
    isPositive: true,
    frequency: 'Weekly',
    asOf: 'Oct 18, 2024',
    source: 'Reserve Bank of India',
    description: 'Equivalent to over 11.5 months of projected imports, providing deep institutional shielding against external currency shocks.',
  },
  {
    name: 'Current Account Deficit (CAD)',
    category: 'India Macro',
    value: '1.1% of GDP',
    change: '$9.7 Billion (Q1)',
    isPositive: true,
    frequency: 'Quarterly',
    asOf: 'Q1 FY25',
    source: 'Reserve Bank of India',
    description: 'Robust services export surplus and strong overseas worker remittances largely offset merchandise trade deficits.',
  },
  {
    name: 'India Manufacturing PMI',
    category: 'India Macro',
    value: '57.5',
    change: '+1.0 MoM',
    isPositive: true,
    frequency: 'Monthly',
    asOf: 'Oct 2024',
    source: 'S&P Global',
    description: 'Consistent expansion above the 50.0 neutral threshold for 40 consecutive months driven by new export orders and industrial output.',
  },
  {
    name: 'United States Real GDP (Annualized)',
    category: 'Global Benchmarks',
    value: '2.80%',
    change: '-0.2% from Q2',
    isPositive: true,
    frequency: 'Quarterly (Adv)',
    asOf: 'Q3 2024',
    source: 'US Bureau of Economic Analysis (BEA)',
    description: 'Driven by robust consumer spending and federal government defense outlays, supporting soft-landing consensus.',
  },
  {
    name: 'United States CPI Inflation (YoY)',
    category: 'Global Benchmarks',
    value: '2.40%',
    change: '-0.1% MoM',
    isPositive: true,
    frequency: 'Monthly',
    asOf: 'Sep 2024',
    source: 'US Bureau of Labor Statistics (BLS)',
    description: 'Disinflation trajectory progressing toward the Federal Reserve 2.0% objective despite shelter cost stickiness.',
  },
  {
    name: 'Federal Funds Effective Rate',
    category: 'Global Benchmarks',
    value: '4.83%',
    change: '-50 bps in Sep',
    isPositive: true,
    frequency: 'Target Range 4.75%-5.00%',
    asOf: 'Oct 2024',
    source: 'Federal Reserve Board',
    description: 'Commenced policy normalization cycle with jumbo 50 bps reduction to sustain maximum employment.',
  },
  {
    name: 'Eurozone Real GDP Growth',
    category: 'Global Benchmarks',
    value: '0.90%',
    change: '+0.4% QoQ',
    isPositive: true,
    frequency: 'Quarterly',
    asOf: 'Q3 2024',
    source: 'Eurostat',
    description: 'Mild recovery led by southern European economies (Spain, Portugal) offsetting manufacturing drag in Germany.',
  },
];

export default function EconomyPage() {
  const indiaMacro = MACRO_INDICATORS.filter((i) => i.category === 'India Macro');
  const globalMacro = MACRO_INDICATORS.filter((i) => i.category === 'Global Benchmarks');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">MACRO ECONOMY</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Macroeconomic Intelligence & Structural Telemetry
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            Official Statistical Releases
          </span>
          <span className="text-emerald-400 font-semibold">• VERIFIED SOURCES</span>
        </div>
      </div>

      {/* Indian Macro Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            India Macroeconomic Matrix (MOSPI / RBI)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {indiaMacro.map((item) => (
            <div
              key={item.name}
              className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between text-xs font-mono text-neutral-400">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px]">
                    {item.frequency}
                  </span>
                  <span>As of: {item.asOf}</span>
                </div>

                <h3 className="font-bold text-sm text-white mt-2 font-sans">{item.name}</h3>

                <div className="flex items-baseline gap-2 mt-2 font-mono">
                  <span className="text-2xl font-bold text-white">{item.value}</span>
                  <span className={`text-xs font-semibold ${item.isPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {item.change}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 font-sans mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500 flex justify-between">
                <span>Source: {item.source}</span>
                <span className="text-cyan-400">Official Release</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Macro Section */}
      <div className="space-y-3 pt-4 border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            Global G10 Economic Telemetry (Fed / BEA / ECB)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {globalMacro.map((item) => (
            <div
              key={item.name}
              className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between text-xs font-mono text-neutral-400">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px]">
                    {item.frequency}
                  </span>
                  <span>{item.asOf}</span>
                </div>

                <h3 className="font-bold text-xs text-white mt-2 font-sans">{item.name}</h3>

                <div className="flex items-baseline gap-2 mt-2 font-mono">
                  <span className="text-xl font-bold text-white">{item.value}</span>
                  <span className="text-xs font-semibold text-emerald-400">{item.change}</span>
                </div>

                <p className="text-[11px] text-neutral-400 font-sans mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-800/80 text-[10px] font-mono text-neutral-500 flex justify-between">
                <span>{item.source}</span>
                <span className="text-indigo-400">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

