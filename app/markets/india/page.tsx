import React from 'react';
import type { Metadata } from 'next';
import IndiaMarketsClient from './IndiaMarketsClient';

export const metadata: Metadata = {
  title: 'Indian Equity Markets Terminal — NSE / BSE Live Benchmarks | KunwarAnalytics',
  description:
    'Institutional Indian equity intelligence covering NIFTY 50, SENSEX, Bank NIFTY, Nifty IT, sectoral rotation, market breadth, advances/declines, and valuation multiples.',
};

export default function IndiaMarketsPage() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">INDIA EQUITIES</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Indian Equity Markets & Sector Dynamics
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            Primary: NSE / BSE
          </span>
          <span className="text-emerald-400 font-semibold">• REGULAR HOURS</span>
        </div>
      </div>

      <IndiaMarketsClient />
    </div>
  );
}

