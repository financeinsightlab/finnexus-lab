'use client';

import { useState, useMemo, type ReactNode } from 'react';
import Link from 'next/link';
import CardImageBanner from '@/components/ui/CardImageBanner';
import { TOOLS, type Tool } from '@/lib/tools-registry';
import { getCalculatorVisual } from '@/lib/tool-images';

const DIFFICULTY_BADGES = {
  Beginner: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Advanced: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
};

export default function ToolsHubClient({ topSlot, bottomSlot }: { topSlot?: ReactNode; bottomSlot?: ReactNode }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically assemble unique categories preserving order and completeness
  const categories = useMemo(() => {
    const set = new Set<string>();
    TOOLS.forEach((t) => set.add(t.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter tools by category and search term
  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesCat = selectedCat === 'All' || tool.category === selectedCat;
      if (!matchesCat) return false;
      if (!q) return true;

      const titleMatch = tool.title.toLowerCase().includes(q);
      const descMatch = tool.desc.toLowerCase().includes(q);
      const catMatch = tool.category.toLowerCase().includes(q);
      const includesMatch = tool.includes.some((inc) => inc.toLowerCase().includes(q));
      return titleMatch || descMatch || catMatch || includesMatch;
    });
  }, [selectedCat, searchQuery]);

  const freeCount = useMemo(() => TOOLS.filter((t) => !t.gated).length, []);
  const premiumCount = useMemo(() => TOOLS.filter((t) => t.gated).length, []);

  const handleResetFilters = () => {
    setSelectedCat('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* ── Compact Institutional Page Header ── */}
      <header className="relative border-b border-border bg-gradient-to-b from-card via-card to-background pt-12 pb-10">
        <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  Kunwar Financial Workstation
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  v2.4 Audited Engine
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                Financial Calculators &amp; Valuation Models
              </h1>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Institutional-grade valuation engines, cash flow models, and quantitative frameworks engineered for finance professionals, analysts, and students.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-foreground">{freeCount} Free Tools</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-semibold text-foreground">{premiumCount} Pro Models</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-card border border-border shadow-xs text-xs font-mono text-muted-foreground">
                {TOOLS.length} Total Models
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Sticky Filter & Search Toolbar ── */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground" aria-hidden="true">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                id="calculator-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators (e.g., DCF, WACC, DuPont, SaaS, ROI)..."
                aria-label="Search financial calculators"
                className="w-full pl-10 pr-9 py-2 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground text-sm"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results Count & Reset */}
            <div className="flex items-center justify-between lg:justify-end gap-3 text-xs text-muted-foreground">
              <span>
                Showing <strong className="text-foreground">{filteredTools.length}</strong> of {TOOLS.length} models
              </span>
              {(selectedCat !== 'All' || searchQuery) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-2.5 py-1 text-teal-600 dark:text-teal-400 hover:underline font-medium"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            {categories.map((category) => {
              const isActive = selectedCat === category;
              const count = category === 'All' ? TOOLS.length : TOOLS.filter((t) => t.category === category).length;
              return (
                <button
                  key={category}
                  id={`filter-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  type="button"
                  onClick={() => setSelectedCat(category)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                    isActive
                      ? 'bg-teal-600 text-white font-semibold shadow-xs'
                      : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Promotion slot: TOOL_SECTION (server-rendered) */}
      {topSlot}

      {/* ── Main Calculators Grid ── */}
      <main className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="calculators-grid">
        {filteredTools.length === 0 ? (
          <div className="text-center py-16 px-4 bg-card border border-border rounded-2xl max-w-xl mx-auto shadow-xs">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-xl" aria-hidden="true">
              🔍
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">No matching models found</h3>
            <p className="text-sm text-muted-foreground mb-6">
              We couldn’t find any financial calculator matching &ldquo;{searchQuery}&rdquo; in {selectedCat === 'All' ? 'any category' : selectedCat}.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-teal-600 text-white hover:bg-teal-700 shadow-xs transition-colors"
            >
              Clear filters and view all models
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => {
              const visual = getCalculatorVisual(tool.slug);
              const difficultyClass = DIFFICULTY_BADGES[tool.difficulty] || 'bg-muted text-muted-foreground';

              return (
                <article
                  key={tool.id}
                  className="group relative flex flex-col bg-card border border-border hover:border-teal-500/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-1"
                >
                  {/* ── Verified Visual Banner ── */}
                  <div className="relative h-44 w-full border-b border-border bg-slate-950 overflow-hidden">
                    <CardImageBanner
                      src={visual.src}
                      alt={visual.alt}
                      icon={tool.icon}
                      badge={visual.badge}
                      gradientFrom={visual.gradientFrom}
                      gradientTo={visual.gradientTo}
                    />

                    {/* Top Right Badges: Access Status & Difficulty */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border shadow-xs ${
                          tool.gated
                            ? 'bg-amber-500/90 text-white border-amber-400/50 backdrop-blur-xs'
                            : 'bg-emerald-600/90 text-white border-emerald-400/50 backdrop-blur-xs'
                        }`}
                      >
                        {tool.gated ? 'Pro' : 'Free'}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border shadow-xs backdrop-blur-xs ${difficultyClass} bg-card/90`}
                      >
                        {tool.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* ── Card Content ── */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Header: Category & Tool Format */}
                    <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                      <span className="font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        {tool.category}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                        {tool.tool}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-foreground tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-2 line-clamp-1">
                      <Link href={`/tools/${tool.slug}`} className="focus:outline-none focus:underline">
                        {tool.title}
                      </Link>
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {tool.desc}
                    </p>

                    {/* Feature Highlights from Audited Engine */}
                    <div className="mb-5 pt-3 border-t border-border/60 mt-auto">
                      <p className="text-[11px] font-semibold text-foreground uppercase tracking-wider mb-2">
                        Key Capabilities:
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1.5">
                        {visual.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" aria-hidden="true" />
                            <span className="line-clamp-1">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Footer: Action Link */}
                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">
                        Instant Solver
                      </span>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm py-1"
                      >
                        <span>Open Model</span>
                        <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Promotion slots: CONTENT_BOTTOM + FOOTER */}
      {bottomSlot}
    </div>
  );
}