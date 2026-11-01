'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavSection {
  href: string;
  label: string;
  badge?: string;
  icon?: string;
}

const SECTIONS: NavSection[] = [
  { href: '/markets', label: 'Overview' },
  { href: '/markets/india', label: 'India Equities', badge: 'NSE/BSE' },
  { href: '/markets/global', label: 'Global Indices' },
  { href: '/markets/stocks', label: 'Screener', badge: 'Active' },
  { href: '/markets/sector-heatmap', label: 'Heatmap' },
  { href: '/markets/forex', label: 'Forex' },
  { href: '/markets/commodities', label: 'Commodities' },
  { href: '/markets/bonds', label: 'Bonds & Yields' },
  { href: '/markets/derivatives', label: 'Derivatives (F&O)', badge: 'PCR' },
  { href: '/markets/economy', label: 'Macro Economy' },
  { href: '/markets/calendar', label: 'Calendar' },
  { href: '/markets/news', label: 'News Wire' },
  { href: '/tracker', label: 'Sector Trackers' },
  { href: '/radar', label: 'Contrarian Radar' },
  { href: '/predictions/ledger', label: 'Prediction Ledger', badge: 'Scored' },
  { href: '/data-freshness', label: 'Data Freshness', badge: 'SLA' },
];

export default function MarketNav() {
  const pathname = usePathname();

  return (
    <nav 
      aria-label="Financial Terminal Navigation" 
      className="w-full bg-[#0d131f] border-b border-neutral-800 sticky top-16 z-20 shadow-md backdrop-blur-md"
    >
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 flex items-center overflow-x-auto scrollbar-none py-1.5">
        <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
          <div className="text-[11px] font-bold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 px-2 py-1 rounded mr-1 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            TERMINAL
          </div>

          {SECTIONS.map((sec) => {
            const isActive = pathname === sec.href;
            return (
              <Link
                key={sec.href}
                href={sec.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 font-semibold shadow-sm'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:bg-neutral-800/60 hover:border-neutral-700/50'
                }`}
              >
                <span>{sec.label}</span>
                {sec.badge && (
                  <span className={`text-[10px] px-1 py-0.2 rounded font-mono uppercase ${
                    isActive ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {sec.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
