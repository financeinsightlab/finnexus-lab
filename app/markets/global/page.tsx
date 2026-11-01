import React from 'react';
import type { Metadata } from 'next';
import GlobalMarketsClient from './GlobalMarketsClient';

export const metadata: Metadata = {
  title: 'Global Indices Terminal — US, Europe & Asia-Pacific | KunwarAnalytics',
  description:
    'Institutional tracking of world equity benchmarks including S&P 500, NASDAQ, Dow Jones, Russell 2000, FTSE 100, DAX, Nikkei 225, and Hang Seng with real-time indicators.',
};

export default function GlobalMarketsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">GLOBAL INDICES</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Global Equity Indices & Cross-Market Intelligence
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            Multi-Exchange Gateway
          </span>
          <span className="text-emerald-400 font-semibold">• 15-MIN DELAY</span>
        </div>
      </div>

      <GlobalMarketsClient />
    </div>
  );
}

