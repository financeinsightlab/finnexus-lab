import React from 'react';
import type { Metadata } from 'next';
import CommoditiesClient from './CommoditiesClient';

export const metadata: Metadata = {
  title: 'Commodities Terminal — Gold, Silver, Crude Oil & Metals | KunwarAnalytics',
  description:
    'Institutional commodities intelligence tracking Gold, Silver, Brent crude, WTI, Natural Gas, Copper, Gold/Silver ratio, crack spreads, and energy benchmarks.',
};

export default function CommoditiesPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">COMMODITIES</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Global Commodities & Energy Intelligence Terminal
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            Futures & Spot Feeds
          </span>
          <span className="text-emerald-400 font-semibold">• ACTIVE</span>
        </div>
      </div>

      <CommoditiesClient />
    </div>
  );
}

