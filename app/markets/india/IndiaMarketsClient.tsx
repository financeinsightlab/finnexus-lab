'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdvancedChart from '@/components/markets/AdvancedChart';
import {
  INDIAN_SECTORAL_INDICES,
  MARKET_BREADTH,
  STOCK_UNIVERSE,
  TOP_TICKER_ITEMS,
} from '@/lib/markets-data';

export default function IndiaMarketsClient() {
  const [selectedIndex, setSelectedIndex] = useState(INDIAN_SECTORAL_INDICES[0].symbol);

  const activeIndex = INDIAN_SECTORAL_INDICES.find((i) => i.symbol === selectedIndex) || INDIAN_SECTORAL_INDICES[0];

  // Top gainers / losers / active
  const sortedGainers = [...STOCK_UNIVERSE].sort((a, b) => b.changePercent - a.changePercent);
  const topGainers = sortedGainers.slice(0, 5);
  const topLosers = [...sortedGainers].reverse().slice(0, 5);
  const mostActive = [...STOCK_UNIVERSE].sort((a, b) => b.marketCapCr - a.marketCapCr).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Sectoral Indices Grid */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              National Stock Exchange (NSE) Sectoral Benchmarks
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">Select index to inspect chart</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 font-mono">
          {INDIAN_SECTORAL_INDICES.map((idx) => {
            const isSelected = idx.symbol === activeIndex.symbol;
            const isPos = idx.changePercent >= 0;

            return (
              <button
                key={idx.symbol}
                onClick={() => setSelectedIndex(idx.symbol)}
                className={`p-2.5 rounded border text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-500 shadow-sm'
                    : 'bg-[#080d1a] border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800/40'
                }`}
              >
                <div className="text-[11px] font-sans font-medium text-neutral-300 truncate">
                  {idx.name}
                </div>
                <div className="text-xs font-bold text-white mt-1">
                  {idx.value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </div>
                <div className={`text-[11px] font-semibold mt-0.5 ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPos ? '+' : ''}{idx.changePercent.toFixed(2)}%
                </div>
                <div className="text-[10px] text-neutral-500 mt-1 flex justify-between">
                  <span>P/E: {idx.peRatio}</span>
                  <span>P/B: {idx.pbRatio}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Chart for Selected Sector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <AdvancedChart
            symbol={activeIndex.symbol}
            name={activeIndex.name}
            basePrice={activeIndex.value}
            currency="₹"
            source="NSE India Sectoral Feeds"
          />
        </div>

        {/* Market Breadth & Sentiment Breakdown */}
        <div className="space-y-4">
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
            <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono border-b border-neutral-800 pb-2 mb-3">
              NSE Cash Market Breadth
            </h4>

            {/* Advance Decline Meter */}
            <div className="space-y-2 font-mono">
              <div className="flex justify-between text-xs">
                <span className="text-emerald-400 font-bold">Advances: {MARKET_BREADTH.advances}</span>
                <span className="text-neutral-400">Total: {MARKET_BREADTH.totalTraded}</span>
                <span className="text-rose-400 font-bold">Declines: {MARKET_BREADTH.declines}</span>
              </div>
              <div className="w-full h-3 rounded bg-neutral-900 overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(MARKET_BREADTH.advances / MARKET_BREADTH.totalTraded) * 100}%` }}
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${(MARKET_BREADTH.declines / MARKET_BREADTH.totalTraded) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-neutral-400 pt-1">
                <span>Advance / Decline Ratio: <strong className="text-white">{MARKET_BREADTH.advanceDeclineRatio}</strong></span>
                <span>Unchanged: {MARKET_BREADTH.unchanged}</span>
              </div>
            </div>

            {/* 52-Week Extreme Stat */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-800 font-mono text-center">
              <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
                <div className="text-[10px] text-neutral-400">52-WEEK HIGHS</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">{MARKET_BREADTH.highs52W}</div>
                <div className="text-[10px] text-neutral-500">New High Marks</div>
              </div>
              <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
                <div className="text-[10px] text-neutral-400">52-WEEK LOWS</div>
                <div className="text-lg font-bold text-rose-400 mt-0.5">{MARKET_BREADTH.lows52W}</div>
                <div className="text-[10px] text-neutral-500">New Low Marks</div>
              </div>
            </div>
          </div>

          {/* Quick Sector Valuation Multiples Table */}
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3.5 shadow-lg">
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-300 font-mono border-b border-neutral-800 pb-2 mb-2">
              Key Valuation Metrics ({activeIndex.name})
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Price to Earnings (P/E)</span>
                <span className="text-white font-bold">{activeIndex.peRatio}x</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Price to Book (P/B)</span>
                <span className="text-white font-bold">{activeIndex.pbRatio}x</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Dividend Yield</span>
                <span className="text-emerald-400 font-bold">{activeIndex.divYield}%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Constituent Weights</span>
                <span className="text-cyan-400 font-bold">Free Float Market Cap</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gainers / Losers / Active Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gainers */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400 font-mono">
              Top Gainers Today
            </h4>
            <span className="text-xs text-neutral-500 font-mono">NSE Cash</span>
          </div>
          <div className="space-y-2 font-mono">
            {topGainers.map((s) => (
              <Link
                key={s.symbol}
                href={`/markets/company/${s.symbol}`}
                className="flex items-center justify-between p-2 rounded bg-[#080d1a] border border-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="font-bold text-white text-xs">{s.symbol}</div>
                  <div className="text-[11px] text-neutral-400 font-sans">{s.sector}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white">₹{s.price.toFixed(2)}</div>
                  <div className="text-xs font-bold text-emerald-400">+{s.changePercent.toFixed(2)}%</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Losers */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-rose-400 font-mono">
              Top Losers Today
            </h4>
            <span className="text-xs text-neutral-500 font-mono">NSE Cash</span>
          </div>
          <div className="space-y-2 font-mono">
            {topLosers.map((s) => (
              <Link
                key={s.symbol}
                href={`/markets/company/${s.symbol}`}
                className="flex items-center justify-between p-2 rounded bg-[#080d1a] border border-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="font-bold text-white text-xs">{s.symbol}</div>
                  <div className="text-[11px] text-neutral-400 font-sans">{s.sector}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white">₹{s.price.toFixed(2)}</div>
                  <div className="text-xs font-bold text-rose-400">{s.changePercent.toFixed(2)}%</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Most Active */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-400 font-mono">
              Most Active By Market Cap
            </h4>
            <span className="text-xs text-neutral-500 font-mono">NSE Cash</span>
          </div>
          <div className="space-y-2 font-mono">
            {mostActive.map((s) => (
              <Link
                key={s.symbol}
                href={`/markets/company/${s.symbol}`}
                className="flex items-center justify-between p-2 rounded bg-[#080d1a] border border-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="font-bold text-white text-xs">{s.symbol}</div>
                  <div className="text-[11px] text-neutral-400 font-sans">{s.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white">₹{s.price.toFixed(2)}</div>
                  <div className="text-xs text-cyan-300 font-bold">₹{Math.round(s.marketCapCr / 1000)}k Cr</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

