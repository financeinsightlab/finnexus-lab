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
    <section id="case-studies" className="content-page py-16 md:py-20 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="section-label text-primary">Engagement archive</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">Selected Case Studies</h2>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <LayoutGrid className="h-4 w-4 text-primary" />
          <span>{filtered.length} case stud{filtered.length === 1 ? 'y' : 'ies'}</span>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 font-semibold text-rose-700 transition-colors hover:bg-rose-500/20 dark:text-rose-400"
            >
              <X className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search case studies, industries, tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-9 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Industry select */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Industry:</span>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setIndustry(ind)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                industry === ind
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-secondary text-secondary-foreground hover:border-primary/50'
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
        <div className="rounded-2xl border border-border bg-card py-20 text-center shadow-sm">
          <div className="text-5xl mb-4">📁</div>
          <p className="mb-1 text-lg font-semibold text-foreground">No case studies found</p>
          <p className="text-muted-foreground">
            {hasFilters ? 'Try adjusting your search or filters.' : 'Check back soon for new case studies.'}
          </p>
        </div>
      )}
    </section>
  );
}
