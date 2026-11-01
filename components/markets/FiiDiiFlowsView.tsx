'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';
import { FII_DII_FLOWS } from '@/lib/markets-data';

export default function FiiDiiFlowsView() {
  const chartData = [...FII_DII_FLOWS].reverse().map((item) => ({
    date: item.date,
    fiiNet: item.fiiNet,
    diiNet: item.diiNet,
    combinedNet: item.fiiNet + item.diiNet,
  }));

  const totalFii = FII_DII_FLOWS.reduce((sum, item) => sum + item.fiiNet, 0);
  const totalDii = FII_DII_FLOWS.reduce((sum, item) => sum + item.diiNet, 0);
  const netInstitutional = totalFii + totalDii;

  return (
    <div className="space-y-4 font-sans text-neutral-200">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3.5 shadow-md">
          <div className="text-xs text-neutral-400 font-mono">FII Cumulative Net (Past 5 Sessions)</div>
          <div className={`text-xl font-bold font-mono mt-1 ${totalFii >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalFii >= 0 ? '+' : ''}₹{totalFii.toLocaleString()} Cr
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">Foreign Institutional Investors</div>
        </div>

        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3.5 shadow-md">
          <div className="text-xs text-neutral-400 font-mono">DII Cumulative Net (Past 5 Sessions)</div>
          <div className={`text-xl font-bold font-mono mt-1 ${totalDii >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalDii >= 0 ? '+' : ''}₹{totalDii.toLocaleString()} Cr
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">Domestic Mutual Funds & Insurers</div>
        </div>

        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3.5 shadow-md">
          <div className="text-xs text-neutral-400 font-mono">Combined Net Absorption</div>
          <div className={`text-xl font-bold font-mono mt-1 ${netInstitutional >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {netInstitutional >= 0 ? '+' : ''}₹{netInstitutional.toLocaleString()} Cr
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">Net Domestic Liquidity Cushion</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Institutional Net Flow Dynamics (₹ Crores)
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">Daily Cash Segment Turnover</span>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#0a0f1d] border border-neutral-700 p-2.5 rounded shadow-xl text-xs font-mono space-y-1">
                        <div className="text-neutral-400 font-semibold">{data.date}</div>
                        <div className="text-rose-400">FII Net: ₹{data.fiiNet.toLocaleString()} Cr</div>
                        <div className="text-emerald-400">DII Net: ₹{data.diiNet.toLocaleString()} Cr</div>
                        <div className="border-t border-neutral-800 pt-1 font-bold text-white">
                          Net: ₹{data.combinedNet.toLocaleString()} Cr
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
              <ReferenceLine y={0} stroke="#4b5563" />
              <Bar dataKey="fiiNet" name="FII Net Buy/Sell" fill="#f43f5e" radius={[2, 2, 0, 0]} />
              <Bar dataKey="diiNet" name="DII Net Buy/Sell" fill="#10b981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Flow Table */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg overflow-hidden shadow-lg">
        <div className="p-3 border-b border-neutral-800 text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
          Historical Daily Breakdown (NSE & BSE Consolidated)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#070b14] border-b border-neutral-800 text-[11px] font-mono text-neutral-400 uppercase">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">FII Net (₹ Cr)</th>
                <th className="py-2.5 px-3 text-right">DII Net (₹ Cr)</th>
                <th className="py-2.5 px-3 text-right">Combined Net (₹ Cr)</th>
                <th className="py-2.5 px-3 text-right">Institutional Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono">
              {FII_DII_FLOWS.map((row) => {
                const combined = row.fiiNet + row.diiNet;
                const isAbsorbed = combined >= 0;

                return (
                  <tr key={row.date} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-2 px-3 text-neutral-300 font-semibold">{row.date}</td>
                    <td
                      className={`py-2 px-3 text-right font-medium ${
                        row.fiiNet >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {row.fiiNet >= 0 ? '+' : ''}
                      {row.fiiNet.toLocaleString()}
                    </td>
                    <td
                      className={`py-2 px-3 text-right font-medium ${
                        row.diiNet >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {row.diiNet >= 0 ? '+' : ''}
                      {row.diiNet.toLocaleString()}
                    </td>
                    <td
                      className={`py-2 px-3 text-right font-bold ${
                        combined >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {combined >= 0 ? '+' : ''}
                      {combined.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                          isAbsorbed
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        {isAbsorbed ? 'Net Inflow' : 'Net Outflow'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

