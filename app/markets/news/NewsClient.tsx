'use client';

import React, { useState, useMemo } from 'react';
import { MARKET_NEWS, type MarketNewsItem } from '@/lib/markets-data';

export default function NewsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Macro', 'Equities', 'Central Banks', 'Commodities', 'Earnings'];

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'ALL') return MARKET_NEWS;
    return MARKET_NEWS.filter((n) => n.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-4 font-sans text-neutral-200">
      {/* Category Tabs */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex bg-neutral-900 border border-neutral-800 rounded p-0.5 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-neutral-400">
          Showing <strong className="text-white">{filteredNews.length}</strong> wire bulletins
        </div>
      </div>

      {/* News Feed Stream */}
      <div className="space-y-3">
        {filteredNews.map((item: MarketNewsItem) => (
          <div
            key={item.id}
            className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-md hover:border-neutral-700 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 text-[10px] uppercase font-bold">
                  {item.category}
                </span>
                <span>•</span>
                <span>{item.publishedAt}</span>
                <span>•</span>
                <span>{item.readTime}</span>
              </div>

              <h3 className="font-bold text-base text-white hover:text-cyan-400 transition-colors">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>

              <p className="text-xs text-neutral-300 leading-relaxed max-w-4xl">
                {item.summary}
              </p>
            </div>

            <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">
                Source: {item.source}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:underline font-mono flex items-center gap-1"
              >
                Read Wire &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

