'use client';

import React, { useState, useMemo } from 'react';
import AdvancedChart from '@/components/markets/AdvancedChart';

interface FxPair {
  symbol: string;
  name: string;
  rate: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  source: string;
}

const FX_PAIRS: FxPair[] = [
  { symbol: 'USDINR', name: 'USD / INR', rate: 84.08, change: 0.04, changePercent: 0.05, high24h: 84.12, low24h: 83.98, source: 'RBI / Interbank Forex' },
  { symbol: 'EURUSD', name: 'EUR / USD', rate: 1.0854, change: -0.0018, changePercent: -0.17, high24h: 1.0890, low24h: 1.0840, source: 'ECB / Interbank' },
  { symbol: 'GBPUSD', name: 'GBP / USD', rate: 1.2985, change: -0.0022, changePercent: -0.17, high24h: 1.3020, low24h: 1.2960, source: 'Bank of England' },
  { symbol: 'EURINR', name: 'EUR / INR', rate: 91.26, change: -0.11, changePercent: -0.12, high24h: 91.50, low24h: 91.10, source: 'RBI Reference' },
  { symbol: 'GBPINR', name: 'GBP / INR', rate: 109.18, change: -0.14, changePercent: -0.13, high24h: 109.50, low24h: 108.95, source: 'RBI Reference' },
  { symbol: 'JPYINR', name: '100 JPY / INR', rate: 55.32, change: 0.18, changePercent: 0.33, high24h: 55.60, low24h: 55.10, source: 'RBI Reference' },
  { symbol: 'USDJPY', name: 'USD / JPY', rate: 152.02, change: -0.42, changePercent: -0.28, high24h: 152.80, low24h: 151.70, source: 'Bank of Japan' },
  { symbol: 'USDCNY', name: 'USD / CNY', rate: 7.124, change: 0.008, changePercent: 0.11, high24h: 7.135, low24h: 7.115, source: 'PBOC Fixing' },
];

export default function ForexClient() {
  const [selectedPair, setSelectedPair] = useState<string>('USDINR');
  const [convertAmount, setConvertAmount] = useState<number>(1000);
  const [fromCurr, setFromCurr] = useState<string>('USD');
  const [toCurr, setToCurr] = useState<string>('INR');

  const activePair = FX_PAIRS.find((p) => p.symbol === selectedPair) || FX_PAIRS[0];

  // Simple currency conversion rates relative to USD
  const usdRates: Record<string, number> = {
    USD: 1.0,
    INR: 84.08,
    EUR: 0.9213, // 1 / 1.0854
    GBP: 0.7701, // 1 / 1.2985
    JPY: 152.02,
  };

  const convertedValue = useMemo(() => {
    const fromInUsd = convertAmount / (usdRates[fromCurr] || 1);
    return fromInUsd * (usdRates[toCurr] || 1);
  }, [convertAmount, fromCurr, toCurr, usdRates]);

  return (
    <div className="space-y-6">
      {/* Top Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <AdvancedChart
            symbol={activePair.symbol}
            name={activePair.name}
            basePrice={activePair.rate}
            currency=""
            source={activePair.source}
          />
        </div>

        {/* Currency Converter & Pair Inspector */}
        <div className="space-y-4">
          {/* Converter */}
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
            <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono border-b border-neutral-800 pb-2 mb-3">
              Institutional Currency Converter
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Amount</label>
                <input
                  type="number"
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#080d1a] border border-neutral-800 rounded px-3 py-2 text-white font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block mb-1">From</label>
                  <select
                    value={fromCurr}
                    onChange={(e) => setFromCurr(e.target.value)}
                    className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {Object.keys(usdRates).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">To</label>
                  <select
                    value={toCurr}
                    onChange={(e) => setToCurr(e.target.value)}
                    className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {Object.keys(usdRates).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-[#080d1a] border border-neutral-800 rounded p-3 text-center">
                <div className="text-neutral-400 text-[11px]">Converted Value</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">
                  {toCurr === 'INR' ? '₹' : toCurr === 'USD' ? '$' : toCurr === 'EUR' ? '€' : ''}
                  {convertedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">
                  1 {fromCurr} = {((usdRates[toCurr] || 1) / (usdRates[fromCurr] || 1)).toFixed(4)} {toCurr}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Rates List */}
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3.5 shadow-lg">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-300 font-mono border-b border-neutral-800 pb-2 mb-2">
              Major Currency Pairs
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              {FX_PAIRS.map((p) => {
                const isSelected = p.symbol === activePair.symbol;
                const isPos = p.change >= 0;
                return (
                  <div
                    key={p.symbol}
                    onClick={() => setSelectedPair(p.symbol)}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-cyan-950/50 border border-cyan-500/60'
                        : 'bg-[#080d1a] border border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white font-sans">{p.name}</div>
                      <div className="text-[10px] text-neutral-500">{p.source}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{p.rate.toFixed(4)}</div>
                      <div className={`text-[11px] font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPos ? '+' : ''}{p.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Cross Rates Matrix */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-3 border-b border-neutral-800 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
          Global FX Cross-Rates Matrix (Interbank Indicative)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#080d1a] border-b border-neutral-800 text-neutral-400 uppercase">
                <th className="py-2.5 px-3 text-left">Base Currency</th>
                <th className="py-2.5 px-3">USD</th>
                <th className="py-2.5 px-3">EUR</th>
                <th className="py-2.5 px-3">GBP</th>
                <th className="py-2.5 px-3">INR</th>
                <th className="py-2.5 px-3">JPY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {['USD', 'EUR', 'GBP', 'INR', 'JPY'].map((base) => (
                <tr key={base} className="hover:bg-neutral-800/30">
                  <td className="py-2 px-3 text-left font-bold text-white font-sans">{base}</td>
                  {['USD', 'EUR', 'GBP', 'INR', 'JPY'].map((target) => {
                    const rate = (usdRates[target] || 1) / (usdRates[base] || 1);
                    const isSelf = base === target;
                    return (
                      <td
                        key={target}
                        className={`py-2 px-3 ${isSelf ? 'text-neutral-600 bg-neutral-900/40' : 'text-neutral-200'}`}
                      >
                        {isSelf ? '1.0000' : rate.toFixed(4)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

