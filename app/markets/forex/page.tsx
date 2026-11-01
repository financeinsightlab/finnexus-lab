import React from 'react';
import type { Metadata } from 'next';
import ForexClient from './ForexClient';

export const metadata: Metadata = {
  title: 'Forex & Currencies Terminal — Interbank Exchange Rates | KunwarAnalytics',
  description:
    'Institutional foreign exchange intelligence covering USD/INR, EUR/USD, GBP/USD, cross-rates matrix, central bank reference rates, and currency conversion models.',
};

export default function ForexPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">FOREX</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Foreign Exchange & Currency Markets Terminal
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            Interbank Spot Rates
          </span>
          <span className="text-emerald-400 font-semibold">• 24/5 OTC</span>
        </div>
      </div>

      <ForexClient />
    </div>
  );
}

