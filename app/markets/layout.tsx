import React from 'react';
import type { Metadata } from 'next';
import TopMarketTicker from '@/components/markets/TopMarketTicker';
import MarketNav from '@/components/markets/MarketNav';

export const metadata: Metadata = {
  title: 'Global Financial Market Terminal | KunwarAnalytics',
  description:
    'Institutional financial market intelligence terminal covering Indian equities, global indices, F&O derivatives, sovereign bonds, forex, commodities, and economic data.',
};

function MarketStatusClocks() {
  return (
    <div className="w-full bg-[#080d17] border-b border-neutral-800/80 px-3 py-1.5 text-[11px] font-mono text-neutral-400 select-none">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none">
          {/* Mumbai */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-white font-semibold">MUMBAI (IST):</span>
            <span>09:15 - 15:30</span>
            <span className="text-[10px] px-1 py-0.2 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
              OPEN
            </span>
          </div>

          {/* New York */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-white font-semibold">NEW YORK (EDT):</span>
            <span>09:30 - 16:00</span>
            <span className="text-[10px] px-1 py-0.2 bg-amber-950 text-amber-400 border border-amber-800 rounded">
              PRE-MKT
            </span>
          </div>

          {/* London */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-white font-semibold">LONDON (GMT):</span>
            <span>08:00 - 16:30</span>
            <span className="text-[10px] px-1 py-0.2 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
              OPEN
            </span>
          </div>

          {/* Tokyo */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
            <span className="text-white font-semibold">TOKYO (JST):</span>
            <span>09:00 - 15:30</span>
            <span className="text-[10px] px-1 py-0.2 bg-neutral-900 text-neutral-400 border border-neutral-700 rounded">
              CLOSED
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-neutral-500 shrink-0">
          <span>Feed: Real-time & 15m Delayed</span>
          <span>•</span>
          <span className="text-cyan-400">Institutional Gateway Online</span>
        </div>
      </div>
    </div>
  );
}

export default function MarketsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070b14] text-neutral-100 flex flex-col font-sans">
      {/* 1. Scrolling Market Ticker */}
      <TopMarketTicker />

      {/* 2. Global Exchange Sessions & Clocks */}
      <MarketStatusClocks />

      {/* 3. Persistent Terminal Navigation Bar */}
      <MarketNav />

      {/* 4. Terminal Main Viewport */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-4 py-5">
        {children}
      </main>

      {/* 5. Institutional Disclaimer & Attribution Footer */}
      <footer className="w-full bg-[#05080f] border-t border-neutral-800/80 py-4 px-4 text-center text-xs font-mono text-neutral-500">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            KunwarAnalytics Financial Terminal © {new Date().getFullYear()} — Engineered for quantitative research and institutional analysis.
          </div>
          <div className="text-[11px] text-neutral-400">
            Disclaimer: For analytical and research purposes only. Not financial advice. Exchange data delayed as per exchange regulations.
          </div>
        </div>
      </footer>
    </div>
  );
}

