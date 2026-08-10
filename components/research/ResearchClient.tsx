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
    <div className="min-h-screen bg-cinema-black text-gray-100">
      {/* ── HERO HEADER ── */}
      <header className="relative overflow-hidden bg-cinema-ink py-14 md:py-20 border-b border-white/5">
        <HeroBackground />
        <div className="wrap relative z-10 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cinema-cyan/10 text-cinema-cyan text-xs font-bold rounded-full uppercase tracking-wider border border-cinema-cyan/30">
                <Sparkles className="w-3.5 h-3.5" />
                Institutional Market Intelligence
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Research Library
              </h1>
              <p className="text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed">
                Institutional deep dives, quantitative valuation models, and supply chain analyses across high-growth global and Indian market sectors.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                <div className="text-lg font-bold text-cinema-cyan font-mono">{posts.length}</div>
                <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Reports</div>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                <div className="text-lg font-bold text-white font-mono">{sectors.length - 1}</div>
                <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Sectors</div>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                <div className="text-lg font-bold text-emerald-400 font-mono">100%</div>
                <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Peer-Reviewed</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── INTEGRATED FILTER CONTROLS ── */}
      <section className="sticky top-16 z-30 bg-[#0B101D]/95 backdrop-blur-xl border-b border-white/10 shadow-xl">
        <div className="wrap max-w-6xl py-3.5 space-y-3">
          {/* Row 1: Search + Sort + Reset */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cinema-cyan" />
              <input
                type="text"
                placeholder="Search reports, models, tags, metrics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-gray-400 focus:outline-none focus:border-cinema-cyan focus:ring-1 focus:ring-cinema-cyan transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Reset Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-cinema-cyan" />
                <span className="text-gray-400 hidden md:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="date" className="bg-[#0E1526] text-white">Latest Published</option>
                  <option value="pages" className="bg-[#0E1526] text-white">Most Comprehensive (Pages)</option>
                  <option value="title" className="bg-[#0E1526] text-white">Alphabetical (A-Z)</option>
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
                      ? 'bg-cinema-cyan text-black font-bold shadow-md shadow-cinema-cyan/25'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                  }`}
                >
                  <span>{s}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      active ? 'bg-black/25 text-black' : 'bg-white/10 text-gray-400'
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
            <span className="text-[11px] uppercase tracking-wider text-gray-400 flex items-center gap-1 shrink-0 mr-1">
              <TagIcon className="w-3 h-3 text-cinema-cyan" /> Topics:
            </span>
            {allTags.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(active ? null : tag)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono transition-colors cursor-pointer shrink-0 ${
                    active
                      ? 'bg-cinema-cyan/20 border border-cinema-cyan text-cinema-cyan font-bold'
                      : 'bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white'
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
      <main className="wrap max-w-6xl py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 text-xs text-gray-400">
          <p>
            Showing <strong className="text-white">{filteredAndSorted.length}</strong> of{' '}
            <span className="text-gray-400">{posts.length} research papers</span>
            {sector !== 'All' && <span> in <strong className="text-cinema-cyan">{sector}</strong></span>}
            {selectedTag && <span> tagged <strong className="text-cinema-cyan">#{selectedTag}</strong></span>}
            {query && <span> for "<strong className="text-white">{query}</strong>"</span>}
          </p>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-8 max-w-lg mx-auto">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-xl font-bold text-white mb-2">No research papers match your criteria</h2>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Try adjusting your query, clearing the active sector, or selecting another topic tag.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-cinema-cyan text-black text-xs font-bold rounded-xl hover:bg-cinema-cyan/90 transition-all cursor-pointer shadow-lg shadow-cinema-cyan/20"
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
