'use client';

import { useState, useMemo } from 'react';
import InsightCard from '@/components/insights/InsightCard';
import type { InsightPost } from '@/types';
import { Search, X, ArrowUpDown, Sparkles } from 'lucide-react';
import HeroBackground from '@/components/ui/HeroBackground';

interface InsightsClientProps {
  posts: InsightPost[];
}

export default function InsightsClient({ posts }: InsightsClientProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'readingTime' | 'title'>('date');

  // Extract all unique categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
    return ['All', ...unique];
  }, [posts]);

  // Filter and sort logic
  const filteredAndSorted = useMemo(() => {
    const q = query.toLowerCase().trim();

    const filtered = posts.filter((p) => {
      const matchCat = category === 'All' || p.category === category;
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.thesis.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);

      return matchCat && matchQuery;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'readingTime') {
        return (a.readingTime || 0) - (b.readingTime || 0);
      }
      return a.title.localeCompare(b.title);
    });
  }, [query, category, sortBy, posts]);

  const hasActiveFilters = query || category !== 'All' || sortBy !== 'date';

  const clearAllFilters = () => {
    setQuery('');
    setCategory('All');
    setSortBy('date');
  };

  return (
    <div className="min-h-screen bg-cinema-black text-gray-100">
      {/* ── HERO HEADER ── */}
      <header className="relative overflow-hidden bg-cinema-ink py-14 md:py-20 border-b border-white/5">
        <HeroBackground />
        <div className="wrap relative z-10 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cinema-cyan/10 text-cinema-cyan text-xs font-bold rounded-full uppercase tracking-wider border border-cinema-cyan/30">
                <Sparkles className="w-3.5 h-3.5" />
                Strategic Market Commentary
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Executive Insights
              </h1>
              <p className="text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed">
                Concise, high-conviction briefs on structural inflections, regulatory catalysts, and capital allocation across Indian and global market sectors.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                <div className="text-lg font-bold text-cinema-cyan font-mono">{posts.length}</div>
                <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Briefs</div>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                <div className="text-lg font-bold text-white font-mono">{categories.length - 1}</div>
                <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Categories</div>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                <div className="text-lg font-bold text-emerald-400 font-mono">100%</div>
                <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">CXO Actionable</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── INTEGRATED FILTER CONTROLS ── */}
      <section className="sticky top-16 z-30 bg-surface-overlay/95 backdrop-blur-xl border-b border-white/10 shadow-xl">
        <div className="wrap max-w-6xl py-3.5 space-y-3">
          {/* Row 1: Search + Sort + Reset */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cinema-cyan" />
              <input
                type="text"
                placeholder="Search strategic briefs, theses, catalysts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Reset Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 bg-surface border border-border rounded-xl px-3 py-1.5 text-xs text-content-secondary">
                <ArrowUpDown className="w-3.5 h-3.5 text-cinema-cyan" />
                <span className="text-gray-400 hidden md:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-content-primary text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="date" className="bg-surface text-content-primary">Latest Published</option>
                  <option value="readingTime" className="bg-surface text-content-primary">Shortest Read Time</option>
                  <option value="title" className="bg-surface text-content-primary">Alphabetical (A-Z)</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 px-3 py-1.5 bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 rounded-xl text-xs font-semibold text-rose-300 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" /> Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((c) => {
              const count = c === 'All' ? posts.length : posts.filter((p) => p.category === c).length;
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    active
                      ? 'bg-brand text-primary-foreground font-bold shadow-md shadow-cinema-cyan/25'
                      : 'bg-surface-muted hover:bg-accent text-content-secondary hover:text-content-primary border border-border'
                  }`}
                >
                  <span>{c}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      active ? 'bg-primary-foreground/15 text-primary-foreground' : 'bg-surface-muted text-content-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS GRID ── */}
      <main className="wrap max-w-6xl py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 text-xs text-gray-400">
          <p>
            Showing <strong className="text-white">{filteredAndSorted.length}</strong> of{' '}
            <span className="text-gray-400">{posts.length} executive briefs</span>
            {category !== 'All' && <span> in <strong className="text-cinema-cyan">{category}</strong></span>}
            {query && <span> for "<strong className="text-white">{query}</strong>"</span>}
          </p>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-8 max-w-lg mx-auto">
            <div className="text-5xl mb-4">💡</div>
            <h2 className="text-xl font-bold text-white mb-2">No strategic briefs match your criteria</h2>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Try adjusting your search keywords or clearing active category filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-brand text-primary-foreground text-xs font-bold rounded-xl hover:bg-primary-hover transition-all cursor-pointer shadow-lg shadow-cinema-cyan/20"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSorted.map((post) => (
              <InsightCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
