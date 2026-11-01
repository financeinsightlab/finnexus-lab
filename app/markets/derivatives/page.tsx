import React from 'react';
import type { Metadata } from 'next';
import DerivativesClient from './DerivativesClient';

export const metadata: Metadata = {
  title: 'Derivatives & Options Terminal — NIFTY Options Chain & FII/DII | KunwarAnalytics',
  description:
    'Institutional derivatives analytics featuring NIFTY 50 options chain ladder, Put-Call Ratio (PCR), Max Pain analysis, Open Interest heat, and FII/DII institutional flows.',
};

export default function DerivativesPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">DERIVATIVES (F&O)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Derivatives Intelligence & Options Open Interest Matrix
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            Underlying: NIFTY 50 Index
          </span>
          <span className="text-cyan-400 font-semibold">• 15-MIN DELAY</span>
        </div>
      </div>

      <DerivativesClient />
    </div>
  );
}

