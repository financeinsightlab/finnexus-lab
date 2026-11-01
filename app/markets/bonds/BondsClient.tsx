'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

interface YieldPoint {
  maturity: string;
  indiaGsec: number;
  usTreasury: number;
}

const YIELD_CURVE_DATA: YieldPoint[] = [
  { maturity: '3M', indiaGsec: 6.65, usTreasury: 4.58 },
  { maturity: '6M', indiaGsec: 6.72, usTreasury: 4.45 },
  { maturity: '1Y', indiaGsec: 6.78, usTreasury: 4.32 },
  { maturity: '2Y', indiaGsec: 6.75, usTreasury: 4.15 },
  { maturity: '3Y', indiaGsec: 6.79, usTreasury: 4.18 },
  { maturity: '5Y', indiaGsec: 6.81, usTreasury: 4.22 },
  { maturity: '10Y', indiaGsec: 6.84, usTreasury: 4.28 },
  { maturity: '30Y', indiaGsec: 7.08, usTreasury: 4.51 },
];

const POLICY_RATES = [
  { bank: 'Reserve Bank of India (RBI)', rate: '6.50%', stance: 'Neutral / Withdrawal of Accommodation', nextMeeting: 'Dec 06, 2024' },
  { bank: 'US Federal Reserve (FOMC)', rate: '4.75% - 5.00%', stance: 'Easing Cycle / Data Dependent', nextMeeting: 'Nov 07, 2024' },
  { bank: 'European Central Bank (ECB)', rate: '3.25%', stance: 'Disinflation Track / Rate Cuts', nextMeeting: 'Dec 12, 2024' },
  { bank: 'Bank of England (BoE)', rate: '5.00%', stance: 'Gradual Easing', nextMeeting: 'Nov 07, 2024' },
  { bank: 'Bank of Japan (BoJ)', rate: '0.25%', stance: 'Normalization / Rate Hike Watch', nextMeeting: 'Dec 19, 2024' },
];

export default function BondsClient() {
  const india10Y = 6.84;
  const us10Y = 4.28;
  const spreadBps = Math.round((india10Y - us10Y) * 100);

  return (
    <div className="space-y-6 font-sans text-neutral-200">
      {/* Top Sovereign Yield Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-md font-mono">
          <div className="text-xs text-neutral-400">India 10-Year Benchmark G-Sec</div>
          <div className="text-2xl font-bold text-white mt-1">6.84%</div>
          <div className="text-[11px] text-emerald-400 mt-1">▼ 2 bps on mild inflation outlook</div>
        </div>

        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-md font-mono">
          <div className="text-xs text-neutral-400">US 10-Year Treasury Note</div>
          <div className="text-2xl font-bold text-white mt-1">4.28%</div>
          <div className="text-[11px] text-rose-400 mt-1">▲ 4 bps on strong payroll expectations</div>
        </div>

        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-md font-mono">
          <div className="text-xs text-neutral-400">India - US 10Y Yield Spread</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">+{spreadBps} bps</div>
          <div className="text-[11px] text-neutral-500 mt-1">Comfortably within 250-350 bps buffer</div>
        </div>
      </div>

      {/* Sovereign Yield Curves Chart */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider font-sans">
              Sovereign Yield Curve Comparison (India vs United States)
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">Term Structure of Interest Rates</span>
        </div>

        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={YIELD_CURVE_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="maturity" stroke="#6b7280" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#6b7280"
                fontSize={11}
                domain={[3.5, 7.5]}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as YieldPoint;
                    return (
                      <div className="bg-[#0a0f1d] border border-neutral-700 p-2.5 rounded shadow-xl text-xs font-mono space-y-1">
                        <div className="text-neutral-400 font-semibold">Maturity: {data.maturity}</div>
                        <div className="text-amber-400 font-bold">India G-Sec: {data.indiaGsec.toFixed(2)}%</div>
                        <div className="text-cyan-400 font-bold">US Treasury: {data.usTreasury.toFixed(2)}%</div>
                        <div className="text-neutral-300 border-t border-neutral-800 pt-1">
                          Spread: {Math.round((data.indiaGsec - data.usTreasury) * 100)} bps
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
              <Line
                type="monotone"
                dataKey="indiaGsec"
                name="India G-Sec Curve (%)"
                stroke="#fbbf24"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#fbbf24' }}
              />
              <Line
                type="monotone"
                dataKey="usTreasury"
                name="US Treasury Curve (%)"
                stroke="#38bdf8"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#38bdf8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Central Bank Policy Rates */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-3 border-b border-neutral-800 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
          Global Central Bank Policy Benchmark Rates
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#080d1a] border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                <th className="py-2.5 px-3">Central Bank</th>
                <th className="py-2.5 px-3 text-right">Policy Benchmark Rate</th>
                <th className="py-2.5 px-3">Monetary Policy Stance</th>
                <th className="py-2.5 px-3 text-right">Next Scheduled Meeting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {POLICY_RATES.map((p) => (
                <tr key={p.bank} className="hover:bg-neutral-800/30">
                  <td className="py-2.5 px-3 font-bold text-white font-sans">{p.bank}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-emerald-400">{p.rate}</td>
                  <td className="py-2.5 px-3 text-neutral-300 font-sans">{p.stance}</td>
                  <td className="py-2.5 px-3 text-right text-neutral-400">{p.nextMeeting}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

