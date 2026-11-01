import React from 'react';
import type { Metadata } from 'next';
import BondsClient from './BondsClient';

export const metadata: Metadata = {
  title: 'Fixed Income & Bonds Terminal — Sovereign Yield Curves | KunwarAnalytics',
  description:
    'Institutional bond market intelligence tracking Indian G-Secs, US Treasuries, term-structure yield curves, 10Y spreads, and global central bank benchmark rates.',
};

export default function BondsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">BONDS & FIXED INCOME</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Sovereign Yield Curves & Central Bank Benchmarks
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            CCIL / Fed Direct
          </span>
          <span className="text-emerald-400 font-semibold">• EOD BENCHMARKS</span>
        </div>
      </div>

      <BondsClient />
    </div>
  );
}

