import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { STOCK_UNIVERSE, type StockFundamental } from '@/lib/markets-data';
import AdvancedChart from '@/components/markets/AdvancedChart';

interface Props {
  params: Promise<{ symbol: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const upper = decodeURIComponent(symbol).toUpperCase();
  const stock = STOCK_UNIVERSE.find((s) => s.symbol.toUpperCase() === upper);

  if (!stock) {
    return {
      title: `${upper} — Company Intelligence | KunwarAnalytics`,
    };
  }

  return {
    title: `${stock.name} (${stock.symbol}) — Valuation, Financials & Technicals | KunwarAnalytics`,
    description: `Comprehensive equity intelligence on ${stock.name} (${stock.symbol}): P/E ${stock.peRatio}x, ROE ${stock.roe}%, 5-year financials, technical charts, and peer comparison.`,
  };
}

export default async function CompanyDetailPage({ params }: Props) {
  const { symbol } = await params;
  const upper = decodeURIComponent(symbol).toUpperCase();
  const stock = STOCK_UNIVERSE.find((s) => s.symbol.toUpperCase() === upper);

  if (!stock) {
    return (
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-8 text-center space-y-4 max-w-xl mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-800 text-rose-400 flex items-center justify-center mx-auto text-xl font-mono">
          !
        </div>
        <h2 className="text-xl font-bold text-white font-mono">Symbol Not Found: {upper}</h2>
        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
          The requested ticker is not currently present in the tracked coverage universe. You can browse all available institutional equities in the Screener.
        </p>
        <div className="pt-2">
          <Link
            href="/markets/stocks"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold hover:bg-cyan-500/30 transition-colors"
          >
            &larr; Open Equity Screener
          </Link>
        </div>
      </div>
    );
  }

  const isPos1D = stock.changePercent >= 0;
  const isPos1Y = stock.oneYearReturn >= 0;

  // Sector peers
  const peers = STOCK_UNIVERSE.filter(
    (s) => s.sector === stock.sector && s.symbol !== stock.symbol
  ).slice(0, 4);

  return (
    <div className="space-y-6 font-sans text-neutral-200">
      {/* Top Header Card */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-5 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Link href="/markets" className="hover:text-cyan-400">MARKETS</Link>
              <span>/</span>
              <Link href="/markets/stocks" className="hover:text-cyan-400">EQUITIES</Link>
              <span>/</span>
              <span className="text-cyan-400">{stock.symbol}</span>
            </div>

            <div className="flex items-baseline gap-3 mt-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{stock.name}</h1>
              <span className="font-mono text-xs px-2.5 py-0.5 bg-neutral-900 text-cyan-400 rounded border border-neutral-800 font-bold">
                NSE: {stock.symbol}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
              <span>Sector: <strong className="text-white">{stock.sector}</strong></span>
              <span>•</span>
              <span>Industry: <strong className="text-white">{stock.industry}</strong></span>
            </div>
          </div>

          <div className="text-right font-mono">
            <div className="text-3xl font-bold text-white">
              ₹{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`text-sm font-semibold flex items-center justify-end gap-1 mt-0.5 ${isPos1D ? 'text-emerald-400' : 'text-rose-400'}`}>
              <span>{isPos1D ? '▲' : '▼'}</span>
              <span>{isPos1D ? '+' : ''}{stock.changePercent.toFixed(2)}% (1D)</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5">NSE Real-time Delayed</div>
          </div>
        </div>

        {/* Fundamental KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 pt-4 font-mono text-xs">
          <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
            <div className="text-[10px] text-neutral-400">MARKET CAP</div>
            <div className="text-sm font-bold text-white mt-0.5">₹{stock.marketCapCr.toLocaleString()} Cr</div>
          </div>

          <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
            <div className="text-[10px] text-neutral-400">P/E RATIO</div>
            <div className="text-sm font-bold text-cyan-400 mt-0.5">{stock.peRatio.toFixed(1)}x</div>
          </div>

          <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
            <div className="text-[10px] text-neutral-400">P/B RATIO</div>
            <div className="text-sm font-bold text-white mt-0.5">{stock.pbRatio.toFixed(1)}x</div>
          </div>

          <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
            <div className="text-[10px] text-neutral-400">ROE %</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">{stock.roe.toFixed(1)}%</div>
          </div>

          <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
            <div className="text-[10px] text-neutral-400">ROCE %</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">{stock.roce.toFixed(1)}%</div>
          </div>

          <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
            <div className="text-[10px] text-neutral-400">DEBT / EQUITY</div>
            <div className="text-sm font-bold text-white mt-0.5">{stock.debtToEquity.toFixed(2)}</div>
          </div>

          <div className="bg-[#080d1a] border border-neutral-800 p-2.5 rounded">
            <div className="text-[10px] text-neutral-400">1Y RETURN</div>
            <div className={`text-sm font-bold mt-0.5 ${isPos1Y ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPos1Y ? '+' : ''}{stock.oneYearReturn.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Chart */}
      <AdvancedChart
        symbol={stock.symbol}
        name={stock.name}
        basePrice={stock.price}
        currency="₹"
        source="NSE India Official Feed"
      />

      {/* 5-Year Historical Financial Statements */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
              5-Year Audited Financial Performance (₹ Crores)
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">Consolidated Annual Statements</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#080d1a] border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                <th className="py-2.5 px-4 text-left">Metric (₹ Cr)</th>
                {stock.financials.revenue.map((r) => (
                  <th key={r.year} className="py-2.5 px-4">{r.year}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {/* Revenue */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-2.5 px-4 text-left font-bold text-white font-sans">Gross Revenue</td>
                {stock.financials.revenue.map((r) => (
                  <td key={r.year} className="py-2.5 px-4 font-semibold text-neutral-200">
                    ₹{r.value.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* EBITDA */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-2.5 px-4 text-left font-bold text-neutral-300 font-sans">Operating Profit (EBITDA)</td>
                {stock.financials.ebitda.map((r) => (
                  <td key={r.year} className="py-2.5 px-4 text-neutral-300">
                    ₹{r.value.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* PAT */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-2.5 px-4 text-left font-bold text-emerald-400 font-sans">Net Profit (PAT)</td>
                {stock.financials.pat.map((r) => (
                  <td key={r.year} className="py-2.5 px-4 font-bold text-emerald-400">
                    ₹{r.value.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* EPS */}
              <tr className="hover:bg-neutral-800/30">
                <td className="py-2.5 px-4 text-left font-bold text-cyan-300 font-sans">Earnings Per Share (EPS ₹)</td>
                {stock.financials.eps.map((r) => (
                  <td key={r.year} className="py-2.5 px-4 font-bold text-cyan-300">
                    ₹{r.value.toFixed(2)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Description & Sector Peer Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Description */}
        <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono border-b border-neutral-800 pb-2">
            Company Profile & Moat
          </h3>
          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
            {stock.description}
          </p>
          <div className="pt-2 border-t border-neutral-800 text-xs font-mono space-y-1 text-neutral-400">
            <div>52W High: <strong className="text-emerald-400">₹{stock.high52W.toLocaleString()}</strong></div>
            <div>52W Low: <strong className="text-rose-400">₹{stock.low52W.toLocaleString()}</strong></div>
            <div>RSI (14): <strong className="text-white">{stock.rsi.toFixed(1)}</strong></div>
            <div>Dividend Yield: <strong className="text-white">{stock.divYield.toFixed(2)}%</strong></div>
          </div>
        </div>

        {/* Sector Peers */}
        <div className="lg:col-span-2 bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-cyan-300 font-mono">
              Sector Peer Valuation Multiples ({stock.sector})
            </h3>
            <Link href="/markets/stocks" className="text-xs text-cyan-400 hover:underline font-mono">
              Full Screener &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-[#080d1a] border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                  <th className="py-2 px-3">Symbol</th>
                  <th className="py-2 px-3">Company</th>
                  <th className="py-2 px-3 text-right">Price (₹)</th>
                  <th className="py-2 px-3 text-right">Mkt Cap (₹ Cr)</th>
                  <th className="py-2 px-3 text-right">P/E</th>
                  <th className="py-2 px-3 text-right">ROE %</th>
                  <th className="py-2 px-3 text-right">1Y Return</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {peers.map((peer) => {
                  const peerPos = peer.oneYearReturn >= 0;
                  return (
                    <tr key={peer.symbol} className="hover:bg-neutral-800/30">
                      <td className="py-2 px-3 font-bold text-cyan-400">
                        <Link href={`/markets/company/${peer.symbol}`} className="hover:underline">
                          {peer.symbol}
                        </Link>
                      </td>
                      <td className="py-2 px-3 text-neutral-200 font-sans">{peer.name}</td>
                      <td className="py-2 px-3 text-right text-white">₹{peer.price.toFixed(2)}</td>
                      <td className="py-2 px-3 text-right text-neutral-300">{peer.marketCapCr.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right text-neutral-300">{peer.peRatio.toFixed(1)}x</td>
                      <td className="py-2 px-3 text-right text-emerald-400">{peer.roe.toFixed(1)}%</td>
                      <td className={`py-2 px-3 text-right font-semibold ${peerPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {peerPos ? '+' : ''}{peer.oneYearReturn.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

