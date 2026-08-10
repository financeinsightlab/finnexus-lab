// FILE: components/case-studies/CaseStudiesClient.tsx
'use client';

import { useMemo, useState } from 'react';
import { Search, X, LayoutGrid } from 'lucide-react';
import type { CaseStudy } from '@/types';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';

interface CaseStudiesClientProps {
  studies: CaseStudy[];
}

export default function CaseStudiesClient({ studies }: CaseStudiesClientProps) {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('All');
  const [engagement, setEngagement] = useState('All');

  const industries = useMemo(() => {
    const present = new Set(studies.map((s) => s.industry).filter(Boolean) as string[]);
    return ['All', ...present];
  }, [studies]);

  const engagements = useMemo(() => {
    const present = new Set(studies.map((s) => s.engagementType));
    return ['All', ...present];
  }, [studies]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return studies.filter((s) => {
      const matchIndustry = industry === 'All' || s.industry === industry;
      const matchEngagement = engagement === 'All' || s.engagementType === engagement;
      const haystack = [s.title, s.outcome, s.clientType, s.engagementType, s.industry ?? '', ...(s.tags ?? [])]
        .join(' ')
        .toLowerCase();
      const matchQuery = !q || haystack.includes(q);
      return matchIndustry && matchEngagement && matchQuery;
    });
  }, [studies, query, industry, engagement]);

  const hasFilters = query.trim() !== '' || industry !== 'All' || engagement !== 'All';

  const clearAll = () => {
    setQuery('');
    setIndustry('All');
    setEngagement('All');
  };

  return (
    <section id="case-studies" className="wrap max-w-7xl py-16 md:py-20 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="section-label text-cinema-cyan">Engagement archive</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Selected Case Studies</h2>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-400">
          <LayoutGrid className="w-4 h-4 text-cinema-cyan" />
          <span>{filtered.length} case stud{filtered.length === 1 ? 'y' : 'ies'}</span>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 font-semibold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cinema-cyan" />
          <input
            type="text"
            placeholder="Search case studies, industries, tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-3 bg-cinema-charcoal border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cinema-cyan/60 focus:ring-1 focus:ring-cinema-cyan/40 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Industry select */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Industry:</span>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setIndustry(ind)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                industry === ind
                  ? 'bg-cinema-cyan text-cinema-black border-cinema-cyan shadow-glow-cyan'
                  : 'bg-cinema-charcoal text-gray-300 border-white/10 hover:border-cinema-cyan/50 hover:text-white'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-cinema rounded-2xl border border-white/10">
          <div className="text-5xl mb-4">📁</div>
          <p className="text-lg font-semibold text-white mb-1">No case studies found</p>
          <p className="text-gray-400">
            {hasFilters ? 'Try adjusting your search or filters.' : 'Check back soon for new case studies.'}
          </p>
        </div>
      )}
    </section>
  );
}
