'use client';

import React, { useState } from 'react';
import AdvancedChart from '@/components/markets/AdvancedChart';

interface CommodityItem {
  symbol: string;
  name: string;
  category: 'Precious Metals' | 'Energy' | 'Base Metals' | 'Agriculture';
  price: number;
  currency: string;
  unit: string;
  change: number;
  changePercent: number;
  high52W: number;
  low52W: number;
  source: string;
}

const COMMODITIES: CommodityItem[] = [
  { symbol: 'GOLD', name: 'Gold Spot', category: 'Precious Metals', price: 2748.50, currency: '$', unit: 'oz', change: 14.20, changePercent: 0.52, high52W: 2790.15, low52W: 1984.30, source: 'LBMA / COMEX' },
  { symbol: 'SILVER', name: 'Silver Spot', category: 'Precious Metals', price: 33.82, currency: '$', unit: 'oz', change: 0.45, changePercent: 1.35, high52W: 34.86, low52W: 21.92, source: 'LBMA / COMEX' },
  { symbol: 'BRENT', name: 'Brent Crude Oil', category: 'Energy', price: 74.29, currency: '$', unit: 'bbl', change: -0.65, changePercent: -0.87, high52W: 92.40, low52W: 68.68, source: 'ICE Futures Europe' },
  { symbol: 'WTI', name: 'WTI Crude Oil', category: 'Energy', price: 70.45, currency: '$', unit: 'bbl', change: -0.58, changePercent: -0.82, high52W: 87.67, low52W: 65.27, source: 'NYMEX' },
  { symbol: 'NATGAS', name: 'Natural Gas', category: 'Energy', price: 2.78, currency: '$', unit: 'MMBtu', change: 0.06, changePercent: 2.21, high52W: 3.64, low52W: 1.58, source: 'NYMEX Henry Hub' },
  { symbol: 'COPPER', name: 'Copper Futures', category: 'Base Metals', price: 4.36, currency: '$', unit: 'lb', change: -0.02, changePercent: -0.46, high52W: 5.20, low52W: 3.65, source: 'LME' },
  { symbol: 'ALUMINUM', name: 'Aluminum Spot', category: 'Base Metals', price: 2618.00, currency: '$', unit: 'tonne', change: 12.50, changePercent: 0.48, high52W: 2770.00, low52W: 2130.00, source: 'LME' },
  { symbol: 'WHEAT', name: 'US Wheat', category: 'Agriculture', price: 572.25, currency: '¢', unit: 'bushel', change: -4.50, changePercent: -0.78, high52W: 720.00, low52W: 520.00, source: 'CBOT' },
];

export default function CommoditiesClient() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('GOLD');
  const activeItem = COMMODITIES.find((c) => c.symbol === selectedSymbol) || COMMODITIES[0];

  const goldPrice = COMMODITIES.find((c) => c.symbol === 'GOLD')?.price || 2748.5;
  const silverPrice = COMMODITIES.find((c) => c.symbol === 'SILVER')?.price || 33.82;
  const goldSilverRatio = goldPrice / silverPrice;

  const brentPrice = COMMODITIES.find((c) => c.symbol === 'BRENT')?.price || 74.29;
  const wtiPrice = COMMODITIES.find((c) => c.symbol === 'WTI')?.price || 70.45;
  const brentWtiSpread = brentPrice - wtiPrice;

  return (
    <div className="space-y-6">
      {/* Top Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <AdvancedChart
            symbol={activeItem.symbol}
            name={`${activeItem.name} (${activeItem.unit})`}
            basePrice={activeItem.price}
            currency={activeItem.currency}
            source={activeItem.source}
          />
        </div>

        {/* Commodity Profile & Spread Analytics */}
        <div className="space-y-4">
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
            <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono border-b border-neutral-800 pb-2 mb-3">
              Commodity Macro Spreads
            </h3>
            <div className="space-y-3 font-mono">
              {/* Gold/Silver Ratio */}
              <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
                <div className="text-[11px] text-neutral-400">Gold / Silver Ratio</div>
                <div className="text-lg font-bold text-amber-400 mt-0.5">
                  {goldSilverRatio.toFixed(2)}x
                </div>
                <div className="text-[10px] text-neutral-500">Historical norm: 60x - 80x (Currently elevated)</div>
              </div>

              {/* Brent / WTI Spread */}
              <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
                <div className="text-[11px] text-neutral-400">Brent / WTI Crack Spread</div>
                <div className="text-lg font-bold text-cyan-300 mt-0.5">
                  ${brentWtiSpread.toFixed(2)} / bbl
                </div>
                <div className="text-[10px] text-neutral-500">Transatlantic seaborne logistics premium</div>
              </div>
            </div>
          </div>

          {/* Quick Select List */}
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3.5 shadow-lg">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-300 font-mono border-b border-neutral-800 pb-2 mb-2">
              All Commodities
            </h4>
            <div className="space-y-1.5 font-mono text-xs max-h-[300px] overflow-y-auto scrollbar-none">
              {COMMODITIES.map((c) => {
                const isSelected = c.symbol === activeItem.symbol;
                const isPos = c.change >= 0;
                return (
                  <div
                    key={c.symbol}
                    onClick={() => setSelectedSymbol(c.symbol)}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-cyan-950/50 border border-cyan-500/60'
                        : 'bg-[#080d1a] border border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white font-sans">{c.name}</div>
                      <div className="text-[10px] text-neutral-400">{c.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">
                        {c.currency}{c.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className={`text-[11px] font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPos ? '+' : ''}{c.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Categorized Commodities Table */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-3 border-b border-neutral-800 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
          Global Raw Materials & Energy Benchmark Matrix
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#080d1a] border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                <th className="py-2.5 px-3">Commodity</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Price</th>
                <th className="py-2.5 px-3 text-right">Unit</th>
                <th className="py-2.5 px-3 text-right">24H Chg %</th>
                <th className="py-2.5 px-3 text-right">52W Range</th>
                <th className="py-2.5 px-3 text-right">Benchmark Exchange</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {COMMODITIES.map((c) => {
                const isPos = c.change >= 0;
                return (
                  <tr key={c.symbol} className="hover:bg-neutral-800/30">
                    <td className="py-2 px-3 font-bold text-white font-sans">{c.name}</td>
                    <td className="py-2 px-3 text-neutral-400 font-sans">{c.category}</td>
                    <td className="py-2 px-3 text-right font-bold text-white">
                      {c.currency}{c.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-3 text-right text-neutral-400">{c.unit}</td>
                    <td className={`py-2 px-3 text-right font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPos ? '+' : ''}{c.changePercent.toFixed(2)}%
                    </td>
                    <td className="py-2 px-3 text-right text-neutral-300">
                      {c.currency}{c.low52W} - {c.currency}{c.high52W}
                    </td>
                    <td className="py-2 px-3 text-right text-neutral-500">{c.source}</td>
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

