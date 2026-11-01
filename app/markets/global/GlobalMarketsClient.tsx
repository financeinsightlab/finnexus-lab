'use client';

import React, { useState } from 'react';
import AdvancedChart from '@/components/markets/AdvancedChart';
import { TOP_TICKER_ITEMS, type MarketQuote } from '@/lib/markets-data';

export default function GlobalMarketsClient() {
  const globalIndices = TOP_TICKER_ITEMS.filter(
    (q) => q.region !== 'India' && q.assetClass === 'index'
  );

  const [selectedSymbol, setSelectedSymbol] = useState<string>(globalIndices[0]?.symbol || 'SPX');
  const activeQuote = globalIndices.find((q) => q.symbol === selectedSymbol) || globalIndices[0];

  const usIndices = globalIndices.filter((q) => q.region === 'US');
  const europeIndices = globalIndices.filter((q) => q.region === 'Europe');
  const asiaIndices = globalIndices.filter((q) => q.region === 'Asia');

  return (
    <div className="space-y-6">
      {/* Active Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <AdvancedChart
            symbol={activeQuote.symbol}
            name={activeQuote.name}
            basePrice={activeQuote.price}
            currency={activeQuote.currency === 'USD' ? '$' : activeQuote.currency === 'EUR' ? '€' : ''}
            source={activeQuote.source}
          />
        </div>

        {/* Selected Index Profile Card */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg space-y-4">
          <div className="border-b border-neutral-800 pb-2">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">Index Profile</span>
            <h3 className="text-lg font-bold text-white font-sans mt-0.5">{activeQuote.name}</h3>
            <div className="text-xs font-mono text-neutral-400 mt-0.5">
              Region: <strong className="text-white">{activeQuote.region}</strong> | Exchange: {activeQuote.source}
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-neutral-800/60">
              <span className="text-neutral-400">Current Price</span>
              <span className="text-white font-bold">{activeQuote.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800/60">
              <span className="text-neutral-400">Day High</span>
              <span className="text-emerald-400 font-semibold">{activeQuote.high.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800/60">
              <span className="text-neutral-400">Day Low</span>
              <span className="text-rose-400 font-semibold">{activeQuote.low.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800/60">
              <span className="text-neutral-400">Previous Close</span>
              <span className="text-neutral-200">{activeQuote.previousClose.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800/60">
              <span className="text-neutral-400">Market Status</span>
              <span className="text-emerald-400 font-semibold">{activeQuote.marketStatus}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800/60">
              <span className="text-neutral-400">Timezone</span>
              <span className="text-neutral-300">{activeQuote.timezone}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Data Delay</span>
              <span className="text-neutral-400">{activeQuote.delay}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Grouping Tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* US */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono">
              United States Markets
            </h4>
            <span className="text-xs text-neutral-400 font-mono">EDT / USD</span>
          </div>

          <div className="space-y-2 font-mono">
            {usIndices.map((q) => {
              const isSelected = q.symbol === activeQuote.symbol;
              const isPos = q.change >= 0;
              return (
                <div
                  key={q.symbol}
                  onClick={() => setSelectedSymbol(q.symbol)}
                  className={`p-2.5 rounded border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500'
                      : 'bg-[#080d1a] border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white font-sans">{q.name}</span>
                    <span className="text-white font-bold">${q.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] mt-1">
                    <span className="text-neutral-500">{q.source}</span>
                    <span className={`font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPos ? '+' : ''}{q.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Europe */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono">
              European Markets
            </h4>
            <span className="text-xs text-neutral-400 font-mono">GMT/CET</span>
          </div>

          <div className="space-y-2 font-mono">
            {europeIndices.map((q) => {
              const isSelected = q.symbol === activeQuote.symbol;
              const isPos = q.change >= 0;
              return (
                <div
                  key={q.symbol}
                  onClick={() => setSelectedSymbol(q.symbol)}
                  className={`p-2.5 rounded border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500'
                      : 'bg-[#080d1a] border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white font-sans">{q.name}</span>
                    <span className="text-white font-bold">{q.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] mt-1">
                    <span className="text-neutral-500">{q.source}</span>
                    <span className={`font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPos ? '+' : ''}{q.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Asia Pacific */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono">
              Asia-Pacific Markets
            </h4>
            <span className="text-xs text-neutral-400 font-mono">JST/HKT</span>
          </div>

          <div className="space-y-2 font-mono">
            {asiaIndices.map((q) => {
              const isSelected = q.symbol === activeQuote.symbol;
              const isPos = q.change >= 0;
              return (
                <div
                  key={q.symbol}
                  onClick={() => setSelectedSymbol(q.symbol)}
                  className={`p-2.5 rounded border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500'
                      : 'bg-[#080d1a] border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white font-sans">{q.name}</span>
                    <span className="text-white font-bold">{q.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] mt-1">
                    <span className="text-neutral-500">{q.source}</span>
                    <span className={`font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPos ? '+' : ''}{q.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

