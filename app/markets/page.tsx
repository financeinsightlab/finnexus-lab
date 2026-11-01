import React from 'react';
import type { Metadata } from 'next';
import MarketsOverviewClient from './MarketsOverviewClient';

export const metadata: Metadata = {
  title: 'Global Markets Terminal — Multi-Asset Overview | KunwarAnalytics',
  description:
    'Institutional financial market overview covering NIFTY 50, SENSEX, S&P 500, NASDAQ, FTSE 100, DAX, Nikkei 225, market breadth, and real-time terminal analytics.',
};

export default function MarketsOverviewPage() {
  return (
    <div className="space-y-4">
      {/* Page Title & Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">OVERVIEW</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Global Market Intelligence Terminal
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SYSTEM: NORMAL</span>
          <span>•</span>
          <span>LATENCY: 18ms</span>
        </div>
      </div>

      <MarketsOverviewClient />
    </div>
  );
}

