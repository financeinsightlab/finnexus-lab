'use client';

import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { COMPREHENSIVE_FINANCE_TERMS, type FinanceTermSlideData } from '@/lib/finance-terms-data';

export type FinanceTermSlide = FinanceTermSlideData;

const CATEGORY_COLORS: Record<string, string> = {
  Finance: 'from-teal-500/20 via-emerald-500/5 to-card border-teal-500/35',
  'Corporate Finance': 'from-teal-500/20 via-emerald-500/5 to-card border-teal-500/35',
  Valuation: 'from-violet-500/20 via-purple-500/5 to-card border-violet-500/35',
  'Portfolio Management': 'from-blue-500/20 via-cyan-500/5 to-card border-blue-500/35',
  'Derivatives & Risk': 'from-amber-500/20 via-orange-500/5 to-card border-amber-500/35',
  'Banking & BFSI': 'from-rose-500/20 via-red-500/5 to-card border-rose-500/35',
  'International Finance': 'from-sky-500/20 via-indigo-500/5 to-card border-sky-500/35',
  'Behavioural Finance': 'from-fuchsia-500/20 via-pink-500/5 to-card border-fuchsia-500/35',
  'Business Analytics': 'from-cyan-500/20 via-teal-500/5 to-card border-cyan-500/35',
  'Business Forecasting': 'from-amber-500/20 via-yellow-500/5 to-card border-amber-500/35',
  'Machine Learning': 'from-indigo-500/20 via-violet-500/5 to-card border-indigo-500/35',
  'Marketing Analytics': 'from-pink-500/20 via-rose-500/5 to-card border-pink-500/35',
  'Project Management': 'from-emerald-500/20 via-teal-500/5 to-card border-emerald-500/35',
  Accounting: 'from-sky-500/20 via-slate-500/5 to-card border-sky-500/35',
  Economics: 'from-amber-500/20 via-orange-500/5 to-card border-amber-500/35',
  Investment: 'from-emerald-500/20 via-teal-500/5 to-card border-emerald-500/35',
  Banking: 'from-rose-500/20 via-red-500/5 to-card border-rose-500/35',
  Analytics: 'from-indigo-500/20 via-violet-500/5 to-card border-indigo-500/35',
  Strategy: 'from-orange-500/20 via-amber-500/5 to-card border-orange-500/35',
};

const FALLBACK_GRADIENT = 'from-teal-500/15 via-card to-card border-teal-500/30';

function getCategoryStyle(category: string) {
  return CATEGORY_COLORS[category] ?? FALLBACK_GRADIENT;
}

const DIFFICULTY_BADGE: Record<string, string> = {
  BEGINNER: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
  INTERMEDIATE: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',
  ADVANCED: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
  EXPERT: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
};

export default function FinanceTermsCarousel({
  terms,
  showExploreLink = true,
}: {
  terms?: FinanceTermSlide[];
  showExploreLink?: boolean;
}) {
  // Merge user DB terms with rich default terms so carousel always looks institutional
  const combinedTerms = useMemo(() => {
    if (!terms || terms.length === 0) return COMPREHENSIVE_FINANCE_TERMS;
    const dbSlugs = new Set(terms.map((t) => t.slug.toLowerCase()));
    const extraDefaults = COMPREHENSIVE_FINANCE_TERMS.filter((d) => !dbSlugs.has(d.slug.toLowerCase()));
    return [...terms, ...extraDefaults];
  }, [terms]);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const regionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Compute all available categories
  const allCategories = useMemo(() => {
    const cats = ['All', ...new Set(combinedTerms.map((t) => t.category).filter(Boolean))].sort();
    return cats;
  }, [combinedTerms]);

  // Compute subcategories for the active category
  const allSubCategories = useMemo(() => {
    const baseList =
      activeCategory === 'All'
        ? combinedTerms
        : combinedTerms.filter((t) => t.category === activeCategory);
    const subs = [
      ...new Set(
        baseList
          .map((t) => t.subCategory)
          .filter((s): s is string => typeof s === 'string' && s.trim().length > 0),
      ),
    ].sort();
    return subs;
  }, [combinedTerms, activeCategory]);

  // Filter slides based on category and subcategory
  const slides = useMemo(() => {
    return combinedTerms.filter((term) => {
      const matchCat = activeCategory === 'All' || term.category === activeCategory;
      const matchSub = activeSubCategory === 'All' || term.subCategory === activeSubCategory;
      return matchCat && matchSub;
    });
  }, [combinedTerms, activeCategory, activeSubCategory]);

  const paused = hovered || focused || userPaused || reducedMotion || animating;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Reset index when filters change
  useEffect(() => {
    setIndex(0);
  }, [activeCategory, activeSubCategory]);

  // Navigation handlers
  const goTo = useCallback(
    (next: number, dir: 'left' | 'right') => {
      if (animating || slides.length < 2) return;
      setDirection(dir);
      if (!reducedMotion) {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 380);
      }
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [animating, reducedMotion, slides.length],
  );

  const previous = useCallback(() => goTo(index - 1, 'left'), [goTo, index]);
  const next = useCallback(() => goTo(index + 1, 'right'), [goTo, index]);

  // Auto-advance
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = window.setInterval(() => {
      goTo(index + 1, 'right');
    }, 8500);
    return () => window.clearInterval(id);
  }, [paused, slides.length, goTo, index]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else previous();
    }
    touchStartX.current = null;
  };

  if (slides.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
          No terms found for this filter combination.
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setActiveSubCategory('All');
            }}
            className="ml-2 font-semibold text-primary underline"
          >
            Reset filters
          </button>
        </div>
      </section>
    );
  }

  const current = slides[index % slides.length];
  const gradientClass = getCategoryStyle(current.category);
  const difficultyClass = DIFFICULTY_BADGE[current.difficulty] ?? DIFFICULTY_BADGE.INTERMEDIATE;

  const slideClass = reducedMotion
    ? ''
    : animating
      ? direction === 'right'
        ? 'animate-slide-left'
        : 'animate-slide-right'
      : '';

  return (
    <>
      <style>{`
        @keyframes slideLeft {
          0% { opacity: 0; transform: translateX(28px) scale(0.99); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideRight {
          0% { opacity: 0; transform: translateX(-28px) scale(0.99); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-slide-left {
          animation: slideLeft 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-right {
          animation: slideRight 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <section
        ref={regionRef}
        aria-roledescription="carousel"
        aria-label="Finance and Business Analytics Terms Slides"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previous();
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            next();
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <BookOpen className="h-3.5 w-3.5" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                Finance & Analytics Mastery Glossary
              </p>
            </div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Master Institutional Finance — One Slide at a Time
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Everything in one slide — simple meaning, real-world examples, and interview-ready answers covering all 14 curriculum subjects.
            </p>
          </div>
          {showExploreLink && (
            <Link
              href="/finance-terms"
              className="inline-flex min-h-10 shrink-0 items-center gap-2 self-start rounded-xl border border-border bg-card/80 px-4 py-2 text-xs font-bold text-foreground shadow-sm transition-all hover:border-teal-500/50 hover:text-brand-hover dark:hover:text-brand-hover sm:self-auto"
            >
              <span>Explore full glossary</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Categories & Subcategories Filter Tabs */}
        <div className="mb-6 space-y-3">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mr-1">
              Category:
            </span>
            {allCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveSubCategory('All');
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-md shadow-teal-500/20'
                    : 'border border-border bg-card/70 text-muted-foreground hover:border-teal-500/40 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Subcategories Pills */}
          {allSubCategories.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-muted-foreground mr-1 flex items-center gap-1">
                <Layers className="h-3 w-3" />
                Subcategory:
              </span>
              <button
                type="button"
                onClick={() => setActiveSubCategory('All')}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                  activeSubCategory === 'All'
                    ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/40 font-semibold'
                    : 'border border-border/60 bg-background/60 text-muted-foreground hover:bg-muted'
                }`}
              >
                All
              </button>
              {allSubCategories.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setActiveSubCategory(sub)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                    activeSubCategory === sub
                      ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/40 font-semibold shadow-sm'
                      : 'border border-border/60 bg-background/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Slide Container with BOTH-SIDE Navigation Arrows ── */}
        <div className="relative">
          {/* LEFT ARROW — Prominently placed on the left edge */}
          <button
            type="button"
            onClick={previous}
            disabled={slides.length < 2}
            aria-label="Previous finance term slide"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-teal-500/40 bg-background/95 text-foreground shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:border-teal-500 hover:bg-primary-hover hover:text-primary-foreground active:scale-95 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* RIGHT ARROW — Prominently placed on the right edge */}
          <button
            type="button"
            onClick={next}
            disabled={slides.length < 2}
            aria-label="Next finance term slide"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-teal-500/40 bg-background/95 text-foreground shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:border-teal-500 hover:bg-primary-hover hover:text-primary-foreground active:scale-95 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* MAIN SLIDE CARD */}
          <div
            className={`relative overflow-hidden rounded-3xl border-2 bg-gradient-to-br ${gradientClass} shadow-2xl transition-all duration-500`}
          >
            {/* Ambient Background Glow matching slide */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

            {/* Slide Index Counter & Quick Dots */}
            <div className="absolute right-4 top-4 z-10 flex items-center gap-3">
              <div className="hidden gap-1 md:flex">
                {slides.slice(0, Math.min(slides.length, 12)).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i, i > index ? 'right' : 'left')}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index % slides.length
                        ? 'w-6 bg-teal-500'
                        : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-bold tabular-nums text-muted-foreground shadow-sm backdrop-blur-md border border-border/50">
                {(index % slides.length) + 1} / {slides.length}
              </span>
            </div>

            {/* Slide Content */}
            <div className={`p-6 sm:p-8 lg:p-10 ${slideClass}`}>
              {/* Badge Row */}
              <div className="flex flex-wrap items-center gap-2 pr-20">
                <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-bold text-foreground backdrop-blur-sm">
                  {current.category}
                </span>

                {current.subCategory && (
                  <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-700 dark:text-teal-300 backdrop-blur-sm">
                    {current.subCategory}
                  </span>
                )}

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${difficultyClass}`}
                >
                  {current.difficulty?.charAt(0) + current.difficulty?.slice(1).toLowerCase()}
                </span>
              </div>

              {/* Term Title */}
              <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {current.term}
              </h3>

              {/* Mathematical Formula Chip (if formula is defined) */}
              {current.formula && (
                <div className="mt-3.5 inline-flex items-center gap-2 rounded-xl border border-teal-500/20 bg-background/80 px-4 py-2 font-mono text-sm font-semibold text-teal-700 dark:text-teal-300 shadow-sm backdrop-blur-sm">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-sans">Formula:</span>
                  <span>{current.formula}</span>
                </div>
              )}

              {/* ── Everything on Slide — 3 Distinct Intuitive Detail Panels with Unique Colors ── */}
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {/* 1. Simple Meaning (Emerald / Mint Theme) */}
                <div className="group/box rounded-2xl border-2 border-emerald-500/35 bg-gradient-to-br from-emerald-500/15 via-emerald-500/[0.04] to-card/90 dark:from-success-muted/75 dark:via-success-muted/25 dark:to-card/90 p-5 shadow-lg shadow-emerald-500/5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/70 hover:shadow-xl hover:shadow-emerald-500/15 hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="h-4 w-4" />
                      <p className="text-xs font-black uppercase tracking-widest">Simple Meaning</p>
                    </div>
                    <span className="rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                      Core Concept
                    </span>
                  </div>
                  <p className="mt-3.5 text-sm font-medium leading-relaxed text-foreground/95">
                    {current.simpleMeaning}
                  </p>
                </div>

                {/* 2. Real-World Practical Example (Cyan / Sky Theme) */}
                <div className="group/box rounded-2xl border-2 border-cyan-500/35 bg-gradient-to-br from-cyan-500/15 via-sky-500/[0.04] to-card/90 dark:from-info-muted/75 dark:via-info-muted/25 dark:to-card/90 p-5 shadow-lg shadow-cyan-500/5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/70 hover:shadow-xl hover:shadow-cyan-500/15 hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                      <TrendingUp className="h-4 w-4" />
                      <p className="text-xs font-black uppercase tracking-widest">Real-World Example</p>
                    </div>
                    <span className="rounded-md border border-cyan-500/30 bg-cyan-500/15 px-2 py-0.5 text-[10px] font-bold text-cyan-700 dark:text-cyan-300">
                      Industry Case
                    </span>
                  </div>
                  <p className="mt-3.5 text-sm font-medium leading-relaxed text-foreground/95">
                    {current.example}
                  </p>
                </div>

                {/* 3. Interview-Ready Answer (Royal Purple / Violet Theme) */}
                <div className="group/box rounded-2xl border-2 border-purple-500/35 bg-gradient-to-br from-purple-500/15 via-fuchsia-500/[0.04] to-card/90 dark:from-accent-violet-muted/75 dark:via-accent-violet-muted/25 dark:to-card/90 p-5 shadow-lg shadow-purple-500/5 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/70 hover:shadow-xl hover:shadow-purple-500/15 hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                      <HelpCircle className="h-4 w-4" />
                      <p className="text-xs font-black uppercase tracking-widest">Interview Answer</p>
                    </div>
                    <span className="rounded-md border border-purple-500/30 bg-purple-500/15 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300">
                      High Impact
                    </span>
                  </div>
                  <blockquote className="mt-3.5 border-l-2 border-purple-500/70 pl-3.5 text-sm font-medium italic leading-relaxed text-foreground/95">
                    &ldquo;{current.interviewAnswer}&rdquo;
                  </blockquote>
                </div>
              </div>

              {/* Keywords / Related Concept Tags */}
              {current.keywords && current.keywords.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-muted-foreground mr-1">Related Tags:</span>
                  {current.keywords.slice(0, 8).map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full border border-border/60 bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer Row: Full Article Link & Controls */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-5">
                <Link
                  href={`/finance-terms/${current.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 dark:text-teal-400 underline-offset-4 hover:underline"
                >
                  <span>Read full {current.term} study page</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>

                <div className="flex items-center gap-2">
                  {!reducedMotion && slides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setUserPaused((v) => !v)}
                      aria-pressed={userPaused}
                      aria-label={userPaused ? 'Resume auto slides' : 'Pause auto slides'}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {userPaused ? (
                        <>
                          <Play className="h-3.5 w-3.5" />
                          <span>Resume Auto</span>
                        </>
                      ) : (
                        <>
                          <Pause className="h-3.5 w-3.5" />
                          <span>Pause</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
