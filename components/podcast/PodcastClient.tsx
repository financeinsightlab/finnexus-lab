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
    <section id="episodes" className="content-page py-16 md:py-20 scroll-mt-24">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="section-label text-primary">The Library</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">All Episodes</h2>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Radio className="h-4 w-4 text-primary" />
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
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search episodes, guests, topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-9 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
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
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-secondary text-secondary-foreground hover:border-primary/50'
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
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:border-primary/50 hover:text-primary"
          >
            <ChevronDown className="w-4 h-4" />
            Load more ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-border bg-card py-16 text-center shadow-sm">
          <div className="text-5xl mb-4">🎙️</div>
          <p className="mb-1 text-lg font-semibold text-foreground">No episodes found</p>
          <p className="text-muted-foreground">
            {hasActiveFilters
              ? 'Try adjusting your search or filters.'
              : 'New episodes drop every two weeks. Check back soon!'}
          </p>
        </div>
      )}
    </section>
  );
}
