'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { STOCK_UNIVERSE, INDIAN_SECTORAL_INDICES, type StockFundamental } from '@/lib/markets-data';

type MetricMode = '1D' | '1Y';

export default function SectorHeatmapView() {
  const [metric, setMetric] = useState<MetricMode>('1D');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  // Group stocks by sector
  const sectorGroups = useMemo(() => {
    const groups: Record<string, StockFundamental[]> = {};
    STOCK_UNIVERSE.forEach((stock) => {
      if (!groups[stock.sector]) {
        groups[stock.sector] = [];
      }
      groups[stock.sector].push(stock);
    });
    return groups;
  }, []);

  const sectors = Object.keys(sectorGroups).sort();

  // Color generator based on return
  const getTileColor = (val: number) => {
    if (val >= 3.0) return 'bg-emerald-600 border-emerald-500 text-white';
    if (val >= 1.5) return 'bg-emerald-700/80 border-emerald-600 text-emerald-100';
    if (val > 0) return 'bg-emerald-950/90 border-emerald-800 text-emerald-200';
    if (val === 0) return 'bg-neutral-800 border-neutral-700 text-neutral-300';
    if (val > -1.5) return 'bg-rose-950/90 border-rose-800 text-rose-200';
    if (val > -3.0) return 'bg-rose-800/80 border-rose-700 text-rose-100';
    return 'bg-rose-600 border-rose-500 text-white';
  };

  return (
    <div className="space-y-4 font-sans text-neutral-200">
      {/* Top Controls */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3.5 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <h3 className="font-bold text-sm text-white tracking-wide uppercase">
            Market Heatmap (Capitalization Weighted)
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Performance Horizon Toggle */}
          <div className="flex bg-neutral-900 border border-neutral-800 rounded p-0.5 text-xs font-mono">
            <button
              onClick={() => setMetric('1D')}
              className={`px-3 py-1 rounded transition-colors ${
                metric === '1D'
                  ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              1D Change
            </button>
            <button
              onClick={() => setMetric('1Y')}
              className={`px-3 py-1 rounded transition-colors ${
                metric === '1Y'
                  ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              1Y Return
            </button>
          </div>

          {/* Sector Filter Toggle */}
          {selectedSector && (
            <button
              onClick={() => setSelectedSector(null)}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1 bg-neutral-800 rounded border border-neutral-700"
            >
              Show All Sectors
            </button>
          )}
        </div>
      </div>

      {/* Sector Quick Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 font-mono text-xs">
        {INDIAN_SECTORAL_INDICES.map((sec) => {
          const isPos = sec.changePercent >= 0;
          return (
            <div
              key={sec.symbol}
              onClick={() => setSelectedSector(sec.name)}
              className="bg-[#0e1626] border border-neutral-800/80 hover:border-neutral-700 p-2 rounded cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="text-neutral-400 truncate text-[11px] font-sans">{sec.name}</div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-bold text-white">{sec.value.toLocaleString()}</span>
                <span className={`font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPos ? '+' : ''}{sec.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Heatmap Grid */}
      <div className="space-y-4">
        {sectors
          .filter((sec) => !selectedSector || sec.toLowerCase().includes(selectedSector.toLowerCase()) || selectedSector.toLowerCase().includes(sec.toLowerCase()))
          .map((sec) => {
            const stocks = sectorGroups[sec];
            const totalSectorCap = stocks.reduce((sum, s) => sum + s.marketCapCr, 0);

            return (
              <div key={sec} className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2.5">
                  <span className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono">
                    {sec}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    Total Mkt Cap: ₹{totalSectorCap.toLocaleString()} Cr ({stocks.length} assets)
                  </span>
                </div>

                {/* Weighted Stock Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {stocks.map((stock) => {
                    const perf = metric === '1D' ? stock.changePercent : stock.oneYearReturn;
                    const tileClass = getTileColor(perf);

                    return (
                      <Link
                        key={stock.symbol}
                        href={`/markets/company/${stock.symbol}`}
                        className={`p-3 rounded border transition-all duration-150 hover:scale-[1.02] flex flex-col justify-between ${tileClass}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-sm font-mono tracking-tight">{stock.symbol}</div>
                            <div className="text-[11px] opacity-80 truncate max-w-[140px] font-sans">
                              {stock.name}
                            </div>
                          </div>
                          <div className="text-right font-mono">
                            <div className="text-sm font-bold">
                              {perf >= 0 ? '+' : ''}
                              {perf.toFixed(2)}%
                            </div>
                            <div className="text-[10px] opacity-75">{metric}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono mt-3 pt-2 border-t border-white/10">
                          <span>₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                          <span>₹{Math.round(stock.marketCapCr / 1000)}k Cr</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Heatmap Legend */}
      <div className="bg-[#0b101b] border border-neutral-800 rounded p-2.5 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400">
        <span>Color Legend ({metric} Performance):</span>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px]">&lt; -3%</span>
          <span className="px-2 py-0.5 rounded bg-rose-800 text-white text-[10px]">-1.5%</span>
          <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-200 text-[10px]">0%</span>
          <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px]">0.0%</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-200 text-[10px]">+1.5%</span>
          <span className="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px]">+3%</span>
          <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px]">&gt; +3%</span>
        </div>
      </div>
    </div>
  );
}

