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
    <div className="min-h-screen bg-background text-foreground">
      {/* ── HERO HEADER ── */}
      <header className="relative overflow-hidden border-b border-border bg-muted/40 py-14 md:py-20">
        <HeroBackground />
        <div className="content-page relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Strategic Market Commentary
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Executive Insights
              </h1>
              <p className="max-w-[72ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                Concise, high-conviction briefs on structural inflections, regulatory catalysts, and capital allocation across Indian and global market sectors.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <div className="rounded-2xl border border-border bg-card px-4 py-2 shadow-sm">
                <div className="font-mono text-lg font-bold text-primary">{posts.length}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Briefs</div>
              </div>
              <div className="rounded-2xl border border-border bg-card px-4 py-2 shadow-sm">
                <div className="font-mono text-lg font-bold text-foreground">{categories.length - 1}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Categories</div>
              </div>
              <div className="rounded-2xl border border-border bg-card px-4 py-2 shadow-sm">
                <div className="font-mono text-lg font-bold text-emerald-700 dark:text-emerald-400">100%</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">CXO Actionable</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── INTEGRATED FILTER CONTROLS ── */}
      <section className="sticky top-16 z-30 border-b border-border bg-card/95 shadow-sm backdrop-blur-xl">
        <div className="content-page py-3.5 space-y-3">
          {/* Row 1: Search + Sort + Reset */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search strategic briefs, theses, catalysts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-9 text-xs text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Reset Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground">
                <ArrowUpDown className="h-3.5 w-3.5 text-primary" />
                <span className="hidden text-muted-foreground md:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="cursor-pointer bg-transparent text-xs font-semibold text-foreground focus:outline-none"
                >
                  <option value="date">Latest Published</option>
                  <option value="readingTime">Shortest Read Time</option>
                  <option value="title">Alphabetical (A-Z)</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex shrink-0 cursor-pointer items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-500/20 dark:text-rose-300"
                >
                  <X className="h-3.5 w-3.5" /> Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Category Pills */}
          <div className="horizontal-scroll-region flex min-w-0 items-center gap-1.5 py-2" role="region" aria-label="Filter insights by category" tabIndex={0} data-lenis-prevent>
            {categories.map((c) => {
              const count = c === 'All' ? posts.length : posts.filter((p) => p.category === c).length;
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={`flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'border border-primary bg-primary font-bold text-primary-foreground shadow-sm'
                      : 'border border-border bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  <span>{c}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      active ? 'bg-primary-foreground/25 text-primary-foreground' : 'bg-muted text-muted-foreground'
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
      <main className="content-page py-8 md:py-12">
        <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
          <p>
            Showing <strong className="text-foreground">{filteredAndSorted.length}</strong> of{' '}
            <span className="text-muted-foreground">{posts.length} executive briefs</span>
            {category !== 'All' && <span> in <strong className="text-primary">{category}</strong></span>}
            {query && <span> for "<strong className="text-foreground">{query}</strong>"</span>}
          </p>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 py-20 text-center shadow-sm">
            <div className="text-5xl mb-4">💡</div>
            <h2 className="mb-2 text-xl font-bold text-foreground">No strategic briefs match your criteria</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Try adjusting your search keywords or clearing active category filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90"
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
