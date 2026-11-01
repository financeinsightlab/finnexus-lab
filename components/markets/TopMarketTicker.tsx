'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TOP_TICKER_ITEMS, type MarketQuote } from '@/lib/markets-data';

export default function TopMarketTicker() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list to achieve continuous seamless ticker tape
  const items = [...TOP_TICKER_ITEMS, ...TOP_TICKER_ITEMS];

  return (
    <div 
      className="w-full bg-[#0b0f17] border-y border-neutral-800/80 text-xs overflow-hidden select-none relative z-30 font-mono"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Real-time Financial Market Ticker"
    >
      <div className="flex items-center">
        {/* Fixed Terminal Badge */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#0f172a] text-cyan-400 font-semibold border-r border-neutral-800 uppercase tracking-wider text-[11px] z-10 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          MARKETS
        </div>

        {/* Scrolling Strip */}
        <div 
          className="flex whitespace-nowrap overflow-x-hidden scrollbar-none py-1.5"
          style={{
            animation: isPaused ? 'none' : 'ticker-slide 65s linear infinite',
          }}
        >
          {items.map((quote: MarketQuote, idx: number) => {
            const isPositive = quote.change >= 0;
            const targetUrl = quote.region === 'India' && quote.assetClass === 'equity'
              ? `/markets/company/${quote.symbol}`
              : quote.region === 'India'
                ? '/markets/india'
                : quote.assetClass === 'forex'
                  ? '/markets/forex'
                  : quote.assetClass === 'commodity'
                    ? '/markets/commodities'
                    : quote.assetClass === 'bond'
                      ? '/markets/bonds'
                      : '/markets/global';

            return (
              <Link
                key={`${quote.symbol}-${idx}`}
                href={targetUrl}
                className="inline-flex items-center gap-2 px-3 border-r border-neutral-800/60 hover:bg-neutral-800/40 transition-colors group"
              >
                <span className="font-semibold text-neutral-300 group-hover:text-cyan-400 transition-colors">
                  {quote.name}
                </span>
                <span className="text-neutral-100 font-medium">
                  {quote.currency === 'INR' ? '₹' : quote.currency === 'USD' ? '$' : quote.currency === 'EUR' ? '€' : ''}
                  {quote.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  <span>{isPositive ? '▲' : '▼'}</span>
                  <span>{Math.abs(quote.change).toFixed(2)}</span>
                  <span>({isPositive ? '+' : ''}{quote.changePercent.toFixed(2)}%)</span>
                </span>
                <span className="text-[10px] text-neutral-500 uppercase px-1 py-0.2 bg-neutral-900 rounded border border-neutral-800">
                  {quote.delay}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

