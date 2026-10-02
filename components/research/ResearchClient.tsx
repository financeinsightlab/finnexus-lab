// FILE: components/research/ResearchClient.tsx
'use client';

import { useState, useMemo } from 'react';
import ResearchCard from '@/components/research/ResearchCard';
import type { ResearchPost } from '@/types';
import { Search, X, ArrowUpDown, Tag as TagIcon, Sparkles } from 'lucide-react';
import HeroBackground from '@/components/ui/HeroBackground';

interface ResearchClientProps {
  posts: ResearchPost[];
}

export default function ResearchClient({ posts }: ResearchClientProps) {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'pages' | 'title'>('date');

  // Extract all unique sectors
  const sectors = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.sector).filter(Boolean)));
    return ['All', ...unique];
  }, [posts]);

  // Extract all unique popular tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).slice(0, 12);
  }, [posts]);

  // Filter and sort logic
  const filteredAndSorted = useMemo(() => {
    const q = query.toLowerCase().trim();

    const filtered = posts.filter((p) => {
      const matchSector = sector === 'All' || p.sector === sector;
      const matchTag = !selectedTag || (p.tags && p.tags.includes(selectedTag));
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchSector && matchTag && matchQuery;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'pages') {
        return (b.pageCount || 0) - (a.pageCount || 0);
      }
      return a.title.localeCompare(b.title);
    });
  }, [query, sector, selectedTag, sortBy, posts]);

  const hasActiveFilters = query || sector !== 'All' || selectedTag !== null || sortBy !== 'date';

  const clearAllFilters = () => {
    setQuery('');
    setSector('All');
    setSelectedTag(null);
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
                Institutional Market Intelligence
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Research Library
              </h1>
              <p className="max-w-[72ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                Institutional deep dives, quantitative valuation models, and supply chain analyses across high-growth global and Indian market sectors.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <div className="rounded-2xl border border-border bg-card px-4 py-2 shadow-sm">
                <div className="font-mono text-lg font-bold text-primary">{posts.length}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Reports</div>
              </div>
              <div className="rounded-2xl border border-border bg-card px-4 py-2 shadow-sm">
                <div className="font-mono text-lg font-bold text-foreground">{sectors.length - 1}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Sectors</div>
              </div>
              <div className="rounded-2xl border border-border bg-card px-4 py-2 shadow-sm">
                <div className="font-mono text-lg font-bold text-emerald-700 dark:text-emerald-400">100%</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Peer-Reviewed</div>
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
                placeholder="Search reports, models, tags, metrics..."
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
                  <option value="pages">Most Comprehensive (Pages)</option>
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

          {/* Row 2: Category / Sector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {sectors.map((s) => {
              const count = s === 'All' ? posts.length : posts.filter((p) => p.sector === s).length;
              const active = sector === s;
              return (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    active
                      ? 'border border-primary bg-primary font-bold text-primary-foreground shadow-sm'
                      : 'border border-border bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  <span>{s}</span>
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

          {/* Row 3: Trending Topic Tags (Compact) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs">
            <span className="mr-1 flex shrink-0 items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              <TagIcon className="h-3 w-3 text-primary" /> Topics:
            </span>
            {allTags.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(active ? null : tag)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono transition-colors cursor-pointer shrink-0 ${
                    active
                      ? 'border border-primary bg-primary/15 font-bold text-primary'
                      : 'border border-border bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RESEARCH REPORTS GRID ── */}
      <main className="content-page py-8 md:py-12">
        <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
          <p>
            Showing <strong className="text-foreground">{filteredAndSorted.length}</strong> of{' '}
            <span className="text-muted-foreground">{posts.length} research papers</span>
            {sector !== 'All' && <span> in <strong className="text-primary">{sector}</strong></span>}
            {selectedTag && <span> tagged <strong className="text-primary">#{selectedTag}</strong></span>}
            {query && <span> for "<strong className="text-foreground">{query}</strong>"</span>}
          </p>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 py-20 text-center shadow-sm">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="mb-2 text-xl font-bold text-foreground">No research papers match your criteria</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Try adjusting your query, clearing the active sector, or selecting another topic tag.
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
              <ResearchCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
