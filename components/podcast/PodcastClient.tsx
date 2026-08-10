// FILE: components/podcast/PodcastClient.tsx
'use client';

import { useMemo, useState } from 'react';
import { Search, X, ChevronDown, Radio } from 'lucide-react';
import type { PodcastEpisode } from '@/types';
import PodcastEpisodeCard from '@/components/podcast/PodcastEpisodeCard';

const PAGE_SIZE = 6;
const ALL_FORMATS = ['Solo Analysis', 'Expert Interview', 'Quarterly Tracker', 'Research Summary'] as const;

interface PodcastClientProps {
  episodes: PodcastEpisode[];
  initialFormat?: string;
}

export default function PodcastClient({ episodes, initialFormat = 'All' }: PodcastClientProps) {
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState<string>(
    ALL_FORMATS.includes(initialFormat as (typeof ALL_FORMATS)[number]) ? initialFormat : 'All'
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const availableFormats = useMemo(() => {
    const present = new Set(episodes.map((e) => e.format));
    return ['All', ...ALL_FORMATS.filter((f) => present.has(f))];
  }, [episodes]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const matches = episodes.filter((episode) => {
      const matchFormat = format === 'All' || episode.format === format;
      const haystack = [
        episode.title,
        episode.description,
        episode.format,
        episode.guestName ?? '',
        episode.guestRole ?? '',
        ...(episode.tags ?? []),
      ]
        .join(' ')
        .toLowerCase();
      const matchQuery = !q || haystack.includes(q);
      return matchFormat && matchQuery;
    });
    return matches;
  }, [episodes, query, format]);

  const shown = filtered.slice(0, visibleCount);
  const hasActiveFilters = query.trim() !== '' || format !== 'All';

  const clearAllFilters = () => {
    setQuery('');
    setFormat('All');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section id="episodes" className="wrap max-w-6xl py-16 md:py-20 scroll-mt-24">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="section-label text-cinema-cyan">The Library</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">All Episodes</h2>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <Radio className="w-4 h-4 text-cinema-cyan" />
          <span>
            {filtered.length} episode{filtered.length === 1 ? '' : 's'}
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 font-semibold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cinema-cyan" />
          <input
            type="text"
            placeholder="Search episodes, guests, topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-3 bg-cinema-charcoal border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cinema-cyan/60 focus:ring-1 focus:ring-cinema-cyan/40 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Format chips */}
        <div className="flex flex-wrap items-center gap-2">
          {availableFormats.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFormat(f);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                format === f
                  ? 'bg-cinema-cyan text-cinema-black border-cinema-cyan shadow-glow-cyan'
                  : 'bg-cinema-charcoal text-gray-300 border-white/10 hover:border-cinema-cyan/50 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Episode list */}
      <div className="space-y-5">
        {shown.map((episode) => (
          <PodcastEpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>

      {/* Load more */}
      {visibleCount < filtered.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cinema-charcoal border border-white/10 text-sm font-semibold text-white hover:border-cinema-cyan/50 hover:text-cinema-cyan transition-all cursor-pointer"
          >
            <ChevronDown className="w-4 h-4" />
            Load more ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 glass-cinema rounded-2xl border border-white/10">
          <div className="text-5xl mb-4">🎙️</div>
          <p className="text-lg font-semibold text-white mb-1">No episodes found</p>
          <p className="text-gray-400">
            {hasActiveFilters
              ? 'Try adjusting your search or filters.'
              : 'New episodes drop every two weeks. Check back soon!'}
          </p>
        </div>
      )}
    </section>
  );
}
