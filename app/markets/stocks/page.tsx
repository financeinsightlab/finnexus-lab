import React from 'react';
import type { Metadata } from 'next';
import ScreenerTable from '@/components/markets/ScreenerTable';

export const metadata: Metadata = {
  title: 'Institutional Equity Screener — Valuation, Ratios & Fundamentals | KunwarAnalytics',
  description:
    'Institutional stock screener filtering Indian and global equities by Market Cap, P/E, P/B, ROE, ROCE, Debt/Equity, Dividend Yield, and Technical Momentum indicators.',
};

export default function ScreenerPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">EQUITY SCREENER</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Institutional Equity Screener & Valuation Filters
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            Filtered Universe
          </span>
          <span className="text-cyan-400 font-semibold">• EXPORT SUPPORTED</span>
        </div>
      </div>

      <ScreenerTable />
    </div>
  );
}

