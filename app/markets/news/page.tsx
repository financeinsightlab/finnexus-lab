import React from 'react';
import type { Metadata } from 'next';
import NewsClient from './NewsClient';

export const metadata: Metadata = {
  title: 'Financial News Wire — Institutional Market Intelligence | KunwarAnalytics',
  description:
    'Curated financial news wire tracking macro developments, RBI policy, corporate earnings, global equity trends, and commodity movements.',
};

export default function NewsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">NEWS WIRE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Institutional Market News Wire & Regulatory Dispatches
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            Live Curated Feed
          </span>
          <span className="text-emerald-400 font-semibold">• MULTI-SOURCE</span>
        </div>
      </div>

      <NewsClient />
    </div>
  );
}

