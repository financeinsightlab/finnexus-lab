'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { STOCK_UNIVERSE, type StockFundamental } from '@/lib/markets-data';

type SortField =
  | 'symbol'
  | 'name'
  | 'sector'
  | 'marketCapCr'
  | 'price'
  | 'changePercent'
  | 'peRatio'
  | 'pbRatio'
  | 'roe'
  | 'roce'
  | 'debtToEquity'
  | 'oneYearReturn';

type SortDirection = 'asc' | 'desc';

export default function ScreenerTable() {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [marketCapTier, setMarketCapTier] = useState<'ALL' | 'LARGE' | 'MID' | 'SMALL'>('ALL');
  const [maxPE, setMaxPE] = useState<string>('');
  const [minROE, setMinROE] = useState<string>('');
  const [maxDE, setMaxDE] = useState<string>('');
  const [min1YReturn, setMin1YReturn] = useState<string>('');

  const [sortField, setSortField] = useState<SortField>('marketCapCr');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Sectors list
  const sectors = useMemo(() => {
    const set = new Set(STOCK_UNIVERSE.map((s) => s.sector));
    return ['ALL', ...Array.from(set).sort()];
  }, []);

  // Filtered and sorted stocks
  const filteredStocks = useMemo(() => {
    return STOCK_UNIVERSE.filter((stock) => {
      // Search
      if (search) {
        const query = search.toLowerCase();
        const matchesSymbol = stock.symbol.toLowerCase().includes(query);
        const matchesName = stock.name.toLowerCase().includes(query);
        if (!matchesSymbol && !matchesName) return false;
      }
      // Sector
      if (selectedSector !== 'ALL' && stock.sector !== selectedSector) {
        return false;
      }
      // Market Cap
      if (marketCapTier === 'LARGE' && stock.marketCapCr < 50000) return false;
      if (marketCapTier === 'MID' && (stock.marketCapCr < 15000 || stock.marketCapCr >= 50000)) return false;
      if (marketCapTier === 'SMALL' && stock.marketCapCr >= 15000) return false;

      // Valuation & Fundamentals
      if (maxPE && stock.peRatio > parseFloat(maxPE)) return false;
      if (minROE && stock.roe < parseFloat(minROE)) return false;
      if (maxDE && stock.debtToEquity > parseFloat(maxDE)) return false;
      if (min1YReturn && stock.oneYearReturn < parseFloat(min1YReturn)) return false;

      return true;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        const cmp = (valA as string).localeCompare(valB as string);
        return sortDir === 'asc' ? cmp : -cmp;
      }
      return sortDir === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [search, selectedSector, marketCapTier, maxPE, minROE, maxDE, min1YReturn, sortField, sortDir]);

  // Pagination
  const totalPages = Math.ceil(filteredStocks.length / pageSize) || 1;
  const paginatedStocks = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredStocks.slice(start, start + pageSize);
  }, [filteredStocks, page]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedSector('ALL');
    setMarketCapTier('ALL');
    setMaxPE('');
    setMinROE('');
    setMaxDE('');
    setMin1YReturn('');
    setPage(1);
  };

  const handleExportCsv = () => {
    const headers = [
      'Symbol',
      'Name',
      'Sector',
      'Industry',
      'Price (INR)',
      '1D Change (%)',
      'Market Cap (Cr)',
      'P/E',
      'P/B',
      'ROE (%)',
      'ROCE (%)',
      'Debt/Equity',
      'Div Yield (%)',
      '1Y Return (%)',
    ];
    const rows = filteredStocks.map((s) => [
      `"${s.symbol}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.sector}"`,
      `"${s.industry}"`,
      s.price.toFixed(2),
      s.changePercent.toFixed(2),
      s.marketCapCr.toFixed(0),
      s.peRatio.toFixed(2),
      s.pbRatio.toFixed(2),
      s.roe.toFixed(2),
      s.roce.toFixed(2),
      s.debtToEquity.toFixed(2),
      s.divYield.toFixed(2),
      s.oneYearReturn.toFixed(2),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `kunwar-equity-screener-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-sans text-neutral-200">
      {/* Filter Toolbar */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="font-bold text-sm text-white tracking-wide uppercase">Equity Screener Parameters</h3>
            <span className="text-xs font-mono text-neutral-400">
              ({filteredStocks.length} of {STOCK_UNIVERSE.length} matching)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetFilters}
              className="text-xs text-neutral-400 hover:text-white px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={handleExportCsv}
              className="text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 hover:bg-cyan-900/60 px-3 py-1 rounded transition-colors flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          {/* Search */}
          <div>
            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Search Ticker / Name</label>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="e.g. RELIANCE, TCS..."
              className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          {/* Sector */}
          <div>
            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Sector</label>
            <select
              value={selectedSector}
              onChange={(e) => {
                setSelectedSector(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2 py-1.5 text-neutral-200 focus:outline-none focus:border-cyan-500 text-xs"
            >
              {sectors.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          {/* Cap Tier */}
          <div>
            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Market Cap Tier</label>
            <select
              value={marketCapTier}
              onChange={(e) => {
                setMarketCapTier(e.target.value as any);
                setPage(1);
              }}
              className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2 py-1.5 text-neutral-200 focus:outline-none focus:border-cyan-500 text-xs"
            >
              <option value="ALL">All Market Caps</option>
              <option value="LARGE">Large Cap (&gt; ₹50k Cr)</option>
              <option value="MID">Mid Cap (₹15k - ₹50k Cr)</option>
              <option value="SMALL">Small Cap (&lt; ₹15k Cr)</option>
            </select>
          </div>

          {/* Max P/E */}
          <div>
            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Max P/E</label>
            <input
              type="number"
              value={maxPE}
              onChange={(e) => {
                setMaxPE(e.target.value);
                setPage(1);
              }}
              placeholder="e.g. 35"
              className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          {/* Min ROE */}
          <div>
            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Min ROE (%)</label>
            <input
              type="number"
              value={minROE}
              onChange={(e) => {
                setMinROE(e.target.value);
                setPage(1);
              }}
              placeholder="e.g. 15"
              className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          {/* Max D/E */}
          <div>
            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Max Debt/Equity</label>
            <input
              type="number"
              step="0.1"
              value={maxDE}
              onChange={(e) => {
                setMaxDE(e.target.value);
                setPage(1);
              }}
              placeholder="e.g. 0.8"
              className="w-full bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1.5 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Screener Data Table */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0a0f1a] border-b border-neutral-800 text-[11px] text-neutral-400 font-mono uppercase tracking-wider select-none">
                <th
                  onClick={() => handleSort('symbol')}
                  className="py-2.5 px-3 cursor-pointer hover:text-white"
                >
                  Symbol {sortField === 'symbol' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-2.5 px-3 cursor-pointer hover:text-white"
                >
                  Company {sortField === 'name' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('sector')}
                  className="py-2.5 px-3 cursor-pointer hover:text-white"
                >
                  Sector {sortField === 'sector' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  Price (₹) {sortField === 'price' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('changePercent')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  1D % {sortField === 'changePercent' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('marketCapCr')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  Mkt Cap (₹ Cr) {sortField === 'marketCapCr' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('peRatio')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  P/E {sortField === 'peRatio' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('pbRatio')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  P/B {sortField === 'pbRatio' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('roe')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  ROE % {sortField === 'roe' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('roce')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  ROCE % {sortField === 'roce' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('debtToEquity')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  D/E {sortField === 'debtToEquity' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  onClick={() => handleSort('oneYearReturn')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-white"
                >
                  1Y Return {sortField === 'oneYearReturn' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono">
              {paginatedStocks.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-neutral-400">
                    No stocks matching the selected screener criteria. Try broadening your filters.
                  </td>
                </tr>
              ) : (
                paginatedStocks.map((stock) => {
                  const is1DPos = stock.changePercent >= 0;
                  const is1YPos = stock.oneYearReturn >= 0;

                  return (
                    <tr
                      key={stock.symbol}
                      className="hover:bg-neutral-800/40 transition-colors group cursor-pointer"
                    >
                      <td className="py-2.5 px-3">
                        <Link
                          href={`/markets/company/${stock.symbol}`}
                          className="font-bold text-cyan-400 hover:text-cyan-300 underline-offset-2 hover:underline"
                        >
                          {stock.symbol}
                        </Link>
                      </td>
                      <td className="py-2.5 px-3 font-sans font-medium text-neutral-200">
                        {stock.name}
                      </td>
                      <td className="py-2.5 px-3 font-sans text-neutral-400">
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[11px]">
                          {stock.sector}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-white font-semibold">
                        {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-semibold ${
                          is1DPos ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {is1DPos ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                      </td>
                      <td className="py-2.5 px-3 text-right text-neutral-300">
                        {stock.marketCapCr.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right text-neutral-300">
                        {stock.peRatio.toFixed(1)}x
                      </td>
                      <td className="py-2.5 px-3 text-right text-neutral-300">
                        {stock.pbRatio.toFixed(1)}x
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-400">
                        {stock.roe.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right text-cyan-300">
                        {stock.roce.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right text-neutral-300">
                        {stock.debtToEquity.toFixed(2)}
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-semibold ${
                          is1YPos ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {is1YPos ? '+' : ''}
                        {stock.oneYearReturn.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="bg-[#0a0f1a] border-t border-neutral-800 px-4 py-2.5 flex items-center justify-between text-xs font-mono">
          <div className="text-neutral-400">
            Showing{' '}
            <span className="text-white font-semibold">
              {filteredStocks.length === 0 ? 0 : (page - 1) * pageSize + 1}
            </span>{' '}
            to{' '}
            <span className="text-white font-semibold">
              {Math.min(page * pageSize, filteredStocks.length)}
            </span>{' '}
            of <span className="text-white font-semibold">{filteredStocks.length}</span> stocks
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <span className="px-2 text-neutral-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages}
              className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

