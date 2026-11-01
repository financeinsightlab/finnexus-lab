// FILE: components/research/ResearchClient.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ResearchCard from '@/components/research/ResearchCard';
import type { ResearchPost } from '@/types';
import {
  type UnifiedResearchReport,
  RESEARCH_COLLECTIONS,
  mapSectorToCollection,
} from '@/lib/research-collections';
import CustomResearchInquirySection from '@/components/research/CustomResearchInquirySection';
import {
  Search,
  X,
  ArrowUpDown,
  Tag as TagIcon,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileText,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import HeroBackground from '@/components/ui/HeroBackground';

interface ResearchClientProps {
  posts: (ResearchPost | UnifiedResearchReport)[];
}

export default function ResearchClient({ posts }: ResearchClientProps) {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
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
    return Array.from(tagSet).slice(0, 14);
  }, [posts]);

  // Find featured report
  const featuredReport = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  // Filter and sort logic
  const filteredAndSorted = useMemo(() => {
    const q = query.toLowerCase().trim();

    const filtered = posts.filter((p) => {
      const matchSector = sector === 'All' || p.sector === sector;
      const matchTag = !selectedTag || (p.tags && p.tags.includes(selectedTag));
      const colSlug = (p as UnifiedResearchReport).collectionSlug || mapSectorToCollection(p.sector);
      const matchCollection = !selectedCollection || colSlug === selectedCollection;

      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchSector && matchTag && matchCollection && matchQuery;
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
  }, [query, sector, selectedTag, selectedCollection, sortBy, posts]);

  const hasActiveFilters =
    query || sector !== 'All' || selectedTag !== null || selectedCollection !== null || sortBy !== 'date';

  const clearAllFilters = () => {
    setQuery('');
    setSector('All');
    setSelectedTag(null);
    setSelectedCollection(null);
    setSortBy('date');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── HERO HEADER ── */}
      <header className="relative overflow-hidden border-b border-border bg-muted/40 py-12 md:py-16">
        <HeroBackground />
        <div className="content-page relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Kunwar Analytics Research Intelligence
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl leading-tight">
                Institutional Financial Research &amp; Sector Intelligence
              </h1>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl">
                Independent financial research, sector intelligence and data-driven analysis for investors, analysts, founders and business decision-makers.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#research-library"
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm inline-flex items-center gap-1.5"
                >
                  Explore Research Library <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#custom-research"
                  className="px-5 py-2.5 rounded-xl border border-border bg-card text-xs font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  Commission Custom Research
                </a>
              </div>
            </div>

            {/* Quick Metrics Badges (Verified Metrics Only - No invented 100% peer-review claims) */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
              <div className="rounded-2xl border border-border bg-card px-4 py-2.5 shadow-sm">
                <div className="font-mono text-lg font-bold text-primary">{posts.length}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Published Reports</div>
              </div>
              <div className="rounded-2xl border border-border bg-card px-4 py-2.5 shadow-sm">
                <div className="font-mono text-lg font-bold text-foreground">{sectors.length - 1}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Active Sectors</div>
              </div>
              <div className="rounded-2xl border border-border bg-card px-4 py-2.5 shadow-sm">
                <div className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">11</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Collections</div>
              </div>
              <div className="rounded-2xl border border-border bg-card px-4 py-2.5 shadow-sm">
                <div className="font-mono text-lg font-bold text-teal-600 dark:text-teal-400">Model-Backed</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Verified Rigor</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── FEATURED REPORT SPOTLIGHT (Shown when no search/filters active) ── */}
      {!hasActiveFilters && featuredReport && (
        <section className="content-page pt-10 pb-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-background p-6 md:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand/10 text-brand border border-brand/20">
                    Featured Research
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-surface-muted text-content-muted border border-border">
                    {featuredReport.sector}
                  </span>
                  {featuredReport.readingTime && (
                    <span className="text-[11px] font-mono text-content-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand" /> {featuredReport.readingTime}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-content-primary leading-tight">
                  <Link href={`/research/${featuredReport.slug}`} className="hover:text-brand transition-colors">
                    {featuredReport.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-content-muted leading-relaxed line-clamp-3">
                  {featuredReport.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={`/research/${featuredReport.slug}`}
                    className="px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    Read Full Report <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs text-content-muted font-mono">
                    By {featuredReport.author}
                  </span>
                </div>
              </div>

              {featuredReport.coverImage && (
                <div className="w-full lg:w-96 shrink-0 h-52 sm:h-60 rounded-2xl overflow-hidden border border-border bg-surface">
                  <img
                    src={featuredReport.coverImage}
                    alt={featuredReport.title}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── EDITORIAL COLLECTIONS SELECTOR ── */}
      <section className="content-page py-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-primary" /> Curated Research Collections
          </h3>
          {selectedCollection && (
            <button
              onClick={() => setSelectedCollection(null)}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Clear Collection Filter
            </button>
          )}
        </div>

        <div className="horizontal-scroll-region flex gap-2 pb-2 overflow-x-auto" role="region" aria-label="Filter research collections" tabIndex={0} data-lenis-prevent>
          {Object.entries(RESEARCH_COLLECTIONS).map(([key, col]) => {
            const isActive = selectedCollection === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCollection(isActive ? null : key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-brand/15 text-brand border-brand shadow-xs'
                    : 'bg-surface border-border text-content-muted hover:text-content-primary hover:bg-surface-muted'
                }`}
              >
                <span>{col.icon}</span>
                <span>{col.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── INTEGRATED FILTER CONTROLS ── */}
      <section id="research-library" className="sticky top-16 z-30 border-b border-border bg-card/95 shadow-sm backdrop-blur-xl">
        <div className="content-page py-3.5 space-y-3">
          {/* Row 1: Search + Sort + Reset */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reports, valuation models, metrics..."
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
                  <option value="pages">Most Comprehensive</option>
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
          <div className="horizontal-scroll-region flex min-w-0 items-center gap-1.5 py-2 overflow-x-auto" role="region" aria-label="Filter research by sector" tabIndex={0} data-lenis-prevent>
            {sectors.map((s) => {
              const count = s === 'All' ? posts.length : posts.filter((p) => p.sector === s).length;
              const active = sector === s;
              return (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  aria-pressed={active}
                  className={`flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
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

          {/* Row 3: Trending Topic Tags */}
          <div className="horizontal-scroll-region flex min-w-0 items-center gap-1.5 pb-2 pt-1 text-xs overflow-x-auto" role="region" aria-label="Filter research by topic" tabIndex={0} data-lenis-prevent>
            <span className="mr-1 flex shrink-0 items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              <TagIcon className="h-3 w-3 text-primary" /> Topics:
            </span>
            {allTags.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(active ? null : tag)}
                  aria-pressed={active}
                  className={`flex min-h-11 shrink-0 items-center rounded-lg px-2.5 py-0.5 text-[11px] font-mono transition-colors cursor-pointer ${
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
            <span className="text-muted-foreground">{posts.length} research publications</span>
            {sector !== 'All' && <span> in <strong className="text-primary">{sector}</strong></span>}
            {selectedTag && <span> tagged <strong className="text-primary">#{selectedTag}</strong></span>}
            {selectedCollection && (
              <span> in collection <strong className="text-primary">{RESEARCH_COLLECTIONS[selectedCollection]?.title}</strong></span>
            )}
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

      {/* ── RESEARCH DESTINATIONS OVERVIEW (Explaining Research vs Insights vs Data Lab vs Case Studies) ── */}
      <section className="content-page py-12 border-t border-border">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Research Architecture
          </span>
          <h2 className="text-2xl font-extrabold text-foreground mt-1">
            Specialized Analytical Destinations
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Each research format delivers a distinct analytical depth tailored to different stages of decision-making.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/research"
            className="rounded-2xl border border-border bg-card p-5 hover:border-brand/40 hover:bg-brand-muted/20 transition-all flex flex-col"
          >
            <span className="text-2xl mb-2">📑</span>
            <h4 className="text-sm font-bold text-content-primary mb-1">In-Depth Reports</h4>
            <p className="text-xs text-content-muted leading-relaxed flex-1">
              Comprehensive 5,000+ word deep-dives, supply chain geometry, and DCF/EBITDA financial models.
            </p>
            <span className="text-xs font-bold text-brand mt-4 inline-flex items-center gap-1">
              Active View <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            href="/insights"
            className="rounded-2xl border border-border bg-card p-5 hover:border-brand/40 hover:bg-brand-muted/20 transition-all flex flex-col"
          >
            <span className="text-2xl mb-2">⚡</span>
            <h4 className="text-sm font-bold text-content-primary mb-1">Strategy Insights</h4>
            <p className="text-xs text-content-muted leading-relaxed flex-1">
              High-conviction commentary, tactical observations, and sector inflection memos (800–2,000 words).
            </p>
            <span className="text-xs font-bold text-brand mt-4 inline-flex items-center gap-1">
              Browse Insights <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            href="/data-lab"
            className="rounded-2xl border border-border bg-card p-5 hover:border-brand/40 hover:bg-brand-muted/20 transition-all flex flex-col"
          >
            <span className="text-2xl mb-2">🔬</span>
            <h4 className="text-sm font-bold text-content-primary mb-1">Data Lab</h4>
            <p className="text-xs text-content-muted leading-relaxed flex-1">
              Reproducible data science projects, interactive charting components, and empirical modeling code.
            </p>
            <span className="text-xs font-bold text-brand mt-4 inline-flex items-center gap-1">
              Open Data Lab <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            href="/case-studies"
            className="rounded-2xl border border-border bg-card p-5 hover:border-brand/40 hover:bg-brand-muted/20 transition-all flex flex-col"
          >
            <span className="text-2xl mb-2">💼</span>
            <h4 className="text-sm font-bold text-content-primary mb-1">Case Studies</h4>
            <p className="text-xs text-content-muted leading-relaxed flex-1">
              Empirical transformation narratives, strategic framework execution, and verified client outcomes.
            </p>
            <span className="text-xs font-bold text-brand mt-4 inline-flex items-center gap-1">
              View Case Studies <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </section>

      {/* ── COMMERCIAL COMMISSION SECTION (Revenue Stream A) ── */}
      <div className="content-page py-12">
        <CustomResearchInquirySection />
      </div>
    </div>
  );
}
