'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AdvancedChart from '@/components/markets/AdvancedChart';
import {
  TOP_TICKER_ITEMS,
  MARKET_BREADTH,
  STOCK_UNIVERSE,
  FII_DII_FLOWS,
  MARKET_NEWS,
  type MarketQuote,
} from '@/lib/markets-data';

type RegionTab = 'India' | 'US' | 'Europe' | 'Asia' | 'Global';

export default function MarketsOverviewClient() {
  const [selectedRegion, setSelectedRegion] = useState<RegionTab>('India');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('NIFTY50');

  // Filter indices by region
  const regionalQuotes = useMemo(() => {
    if (selectedRegion === 'Global') {
      return TOP_TICKER_ITEMS;
    }
    return TOP_TICKER_ITEMS.filter((item) => item.region === selectedRegion);
  }, [selectedRegion]);

  // Selected quote for the primary chart
  const activeQuote = useMemo(() => {
    return (
      TOP_TICKER_ITEMS.find((q) => q.symbol === selectedSymbol) ||
      regionalQuotes[0] ||
      TOP_TICKER_ITEMS[0]
    );
  }, [selectedSymbol, regionalQuotes]);

  // Top Gainers & Losers from STOCK_UNIVERSE
  const sortedStocks = useMemo(() => {
    return [...STOCK_UNIVERSE].sort((a, b) => b.changePercent - a.changePercent);
  }, []);

  const topGainers = sortedStocks.slice(0, 5);
  const topLosers = [...sortedStocks].reverse().slice(0, 5);
  const volumeLeaders = [...STOCK_UNIVERSE].sort((a, b) => b.marketCapCr - a.marketCapCr).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Section: Regional Navigation & Active Index Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2 Cols): Primary Interactive Chart */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0e1626] border border-neutral-800 rounded-lg p-2.5">
            <div className="flex bg-neutral-900 border border-neutral-800 rounded p-0.5 text-xs font-mono">
              {(['India', 'US', 'Europe', 'Asia', 'Global'] as RegionTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setSelectedRegion(tab);
                    const firstInRegion = TOP_TICKER_ITEMS.find((q) => tab === 'Global' || q.region === tab);
                    if (firstInRegion) setSelectedSymbol(firstInRegion.symbol);
                  }}
                  className={`px-3 py-1.5 rounded transition-all ${
                    selectedRegion === tab
                      ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
              <span>Timezone:</span>
              <span className="text-white font-medium">{activeQuote.timezone}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{activeQuote.marketStatus}</span>
            </div>
          </div>

          <AdvancedChart
            symbol={activeQuote.symbol}
            name={activeQuote.name}
            basePrice={activeQuote.price}
            currency={activeQuote.currency === 'INR' ? '₹' : activeQuote.currency === 'USD' ? '$' : '€'}
            source={activeQuote.source}
          />
        </div>

        {/* Right Column (1 Col): Regional Indices Quotes List */}
        <div className="space-y-4">
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3.5 shadow-lg">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-400 font-mono">
                {selectedRegion} Market Benchmarks
              </h3>
              <span className="text-[11px] text-neutral-400 font-mono">{regionalQuotes.length} Indices</span>
            </div>

            <div className="space-y-1.5 max-h-[460px] overflow-y-auto scrollbar-none">
              {regionalQuotes.map((q) => {
                const isSelected = q.symbol === activeQuote.symbol;
                const isPos = q.change >= 0;

                return (
                  <div
                    key={q.symbol}
                    onClick={() => setSelectedSymbol(q.symbol)}
                    className={`p-2.5 rounded border transition-all cursor-pointer font-mono ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/50 shadow-sm'
                        : 'bg-[#080d1a] border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white font-sans">{q.name}</span>
                      <span className="text-white font-bold">
                        {q.currency === 'INR' ? '₹' : q.currency === 'USD' ? '$' : '€'}
                        {q.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] mt-1 text-neutral-400">
                      <span className="text-[10px] text-neutral-500 font-mono">{q.source}</span>
                      <span className={`font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPos ? '+' : ''}{q.change.toFixed(2)} ({isPos ? '+' : ''}{q.changePercent.toFixed(2)}%)
                      </span>
                    </div>

                    {/* Day Range Mini Bar */}
                    <div className="mt-2 pt-1 border-t border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-400">
                      <span>L: {q.low.toLocaleString()}</span>
                      <div className="w-20 bg-neutral-800 h-1 rounded overflow-hidden mx-2 relative">
                        <div
                          className="bg-cyan-400 h-full rounded"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, ((q.price - q.low) / (q.high - q.low || 1)) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                      <span>H: {q.high.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Breadth Snapshot */}
          <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3.5 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-800 pb-2 mb-2 font-bold uppercase text-neutral-300">
              <span>Market Breadth (NSE Cash)</span>
              <span className="text-emerald-400">ADR: {MARKET_BREADTH.advanceDeclineRatio}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-center">
              <div className="bg-emerald-950/40 border border-emerald-800/80 p-2 rounded">
                <div className="text-neutral-400 text-[10px]">ADVANCES</div>
                <div className="text-emerald-400 font-bold text-base">{MARKET_BREADTH.advances}</div>
              </div>
              <div className="bg-rose-950/40 border border-rose-800/80 p-2 rounded">
                <div className="text-neutral-400 text-[10px]">DECLINES</div>
                <div className="text-rose-400 font-bold text-base">{MARKET_BREADTH.declines}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono mt-2 text-neutral-400">
              <span>52W Highs: <strong className="text-white">{MARKET_BREADTH.highs52W}</strong></span>
              <span>52W Lows: <strong className="text-white">{MARKET_BREADTH.lows52W}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Gainers, Losers, Volume Shockers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Top Gainers */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">Top Gainers (NSE)</h4>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">1D %</span>
          </div>

          <div className="space-y-2">
            {topGainers.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/markets/company/${stock.symbol}`}
                className="flex items-center justify-between p-2 rounded bg-[#080d1a] border border-neutral-800/80 hover:border-neutral-700 transition-colors group"
              >
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-cyan-400 font-mono">
                    {stock.symbol}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate max-w-[130px]">
                    {stock.name}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs font-semibold text-white">
                    ₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs font-bold text-emerald-400">
                    +{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">Top Losers (NSE)</h4>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">1D %</span>
          </div>

          <div className="space-y-2">
            {topLosers.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/markets/company/${stock.symbol}`}
                className="flex items-center justify-between p-2 rounded bg-[#080d1a] border border-neutral-800/80 hover:border-neutral-700 transition-colors group"
              >
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-cyan-400 font-mono">
                    {stock.symbol}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate max-w-[130px]">
                    {stock.name}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs font-semibold text-white">
                    ₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs font-bold text-rose-400">
                    {stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Most Active / Volume Leaders */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">Market Cap Leaders</h4>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">Mkt Cap</span>
          </div>

          <div className="space-y-2">
            {volumeLeaders.map((stock) => (
              <Link
                key={stock.symbol}
                href={`/markets/company/${stock.symbol}`}
                className="flex items-center justify-between p-2 rounded bg-[#080d1a] border border-neutral-800/80 hover:border-neutral-700 transition-colors group"
              >
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-cyan-400 font-mono">
                    {stock.symbol}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate max-w-[130px]">
                    {stock.sector}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs font-semibold text-white">
                    ₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-cyan-300">
                    ₹{Math.round(stock.marketCapCr / 1000)}k Cr
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Institutional FII/DII Net & Market Wire */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* FII / DII Summary */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono">
                Institutional Flow Activity (Latest Session)
              </h3>
              <Link href="/markets/derivatives" className="text-xs text-cyan-400 hover:underline font-mono">
                View Full F&O &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="bg-[#080d1a] border border-neutral-800 p-3 rounded">
                <div className="text-neutral-400 text-xs">FII Net Inflow</div>
                <div className="text-rose-400 font-bold text-lg mt-1">
                  ₹{FII_DII_FLOWS[0].fiiNet.toLocaleString()} Cr
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">Date: {FII_DII_FLOWS[0].date}</div>
              </div>

              <div className="bg-[#080d1a] border border-neutral-800 p-3 rounded">
                <div className="text-neutral-400 text-xs">DII Net Inflow</div>
                <div className="text-emerald-400 font-bold text-lg mt-1">
                  +₹{FII_DII_FLOWS[0].diiNet.toLocaleString()} Cr
                </div>
                <div className="text-[10px] text-neutral-500 mt-1">Domestic Institutional Support</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
            <span>DII net buying provides institutional liquidity cushion against foreign outflows.</span>
            <Link
              href="/markets/india"
              className="text-cyan-400 hover:text-cyan-300 font-mono font-medium shrink-0 ml-2"
            >
              India Terminal &rarr;
            </Link>
          </div>
        </div>

        {/* Latest Market News Wire Preview */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono">
              Institutional Market Wire
            </h3>
            <Link href="/markets/news" className="text-xs text-cyan-400 hover:underline font-mono">
              All News &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            {MARKET_NEWS.slice(0, 3).map((item) => (
              <div key={item.id} className="p-2.5 bg-[#080d1a] border border-neutral-800/80 rounded hover:border-neutral-700 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                  <span className="px-1.5 py-0.2 bg-neutral-800 rounded text-cyan-400 font-semibold uppercase">
                    {item.category}
                  </span>
                  <span>{item.publishedAt}</span>
                </div>
                <a
                  href={item.url}
                  className="font-bold text-xs text-white hover:text-cyan-400 transition-colors block line-clamp-1"
                >
                  {item.title}
                </a>
                <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

