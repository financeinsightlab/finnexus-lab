// FILE: components/research/ResearchClient.tsx
'use client';

import { useState, useMemo } from 'react';
import ResearchCard from '@/components/research/ResearchCard';
import type { ResearchPost } from '@/types';

interface ResearchClientProps {
  posts: ResearchPost[];
}

export default function ResearchClient({ posts }: ResearchClientProps) {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All');

  const sectors = useMemo(() => {
    return ['All', ...Array.from(new Set(posts.map(p => p.sector)))];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter(p => {
      const matchSector = sector === 'All' || p.sector === sector;
      const matchQuery = !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q));
      return matchSector && matchQuery;
    });
  }, [query, sector, posts]);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <header className="bg-brand-navy py-20">
        <div className="wrap">
          <p className="section-label text-teal-300 mb-5">Research Library</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            In-Depth Analysis
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Comprehensive research reports on Indian market sectors, with detailed analysis,
            data-driven insights, and strategic recommendations.
          </p>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="wrap py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search research reports..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent"
              />
            </div>

            {/* Sector Filter */}
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`pill ${sector === s ? 'pill-on' : 'pill-off'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="wrap py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="text-brand-slate">
            {filtered.length} research {filtered.length === 1 ? 'report' : 'reports'}
            {query && ` for "${query}"`}
            {sector !== 'All' && ` in ${sector}`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📊</div>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">No research found</h2>
            <p className="text-brand-slate mb-8 max-w-md mx-auto">
              Try adjusting your search terms or selecting a different sector.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSector('All');
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <ResearchCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}