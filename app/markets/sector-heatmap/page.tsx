import React from 'react';
import type { Metadata } from 'next';
import SectorHeatmapView from '@/components/markets/SectorHeatmapView';

export const metadata: Metadata = {
  title: 'Interactive Sector & Market Heatmap | KunwarAnalytics',
  description:
    'Visual market-capitalization weighted heatmap across Indian and global equities with 1D change and 1Y return gradients, sector clustering, and valuation tiles.',
};

export default function SectorHeatmapPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">SECTOR HEATMAP</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Capitalization Weighted Sector Heatmap
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            Color Gradient: Performance Driven
          </span>
          <span className="text-emerald-400 font-semibold">• INTERACTIVE</span>
        </div>
      </div>

      <SectorHeatmapView />
    </div>
  );
}

