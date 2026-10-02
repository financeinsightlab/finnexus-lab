'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

export type FinanceTermSlide = {
  slug: string;
  term: string;
  simpleMeaning: string;
  example: string;
  interviewAnswer: string;
  formula: string | null;
  category: string;
};

const ACCENTS = [
  'border-teal-500/40 from-teal-500/10 via-card to-card',
  'border-sky-500/40 from-sky-500/10 via-card to-card',
  'border-violet-500/40 from-violet-500/10 via-card to-card',
  'border-amber-500/40 from-amber-500/10 via-card to-card',
  'border-emerald-500/40 from-emerald-500/10 via-card to-card',
  'border-rose-500/40 from-rose-500/10 via-card to-card',
];

export default function FinanceTermsCarousel({ terms }: { terms: FinanceTermSlide[] }) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const slides = terms.slice(0, 8);
  const paused = hovered || focused || userPaused || reducedMotion;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;
  const currentIndex = index % slides.length;
  const current = slides[currentIndex];
  const previous = () => setIndex((value) => (value - 1 + slides.length) % slides.length);
  const next = () => setIndex((value) => (value + 1) % slides.length);

  return (
    <section
      ref={regionRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Finance terms, one at a time"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
        if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
      }}
      className="mx-auto max-w-7xl px-4 py-12 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-6 lg:px-8"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Finance Terms</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Master finance — one term at a time</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Plain-language definitions, practical examples and interview-ready explanations.</p>
        </div>
        <Link href="/finance-terms" className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:self-auto">
          Explore all finance terms <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <article className={`min-h-[330px] rounded-3xl border bg-gradient-to-br ${ACCENTS[currentIndex % ACCENTS.length]} bg-card p-6 shadow-sm sm:min-h-[300px] sm:p-9`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground">{current.category}</span>
          <span className="text-xs font-medium tabular-nums text-muted-foreground" aria-label={`Slide ${currentIndex + 1} of ${slides.length}`}>
            {currentIndex + 1} / {slides.length}
          </span>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{current.term}</p>
            <p className="mt-2 text-xl font-semibold leading-snug text-foreground sm:text-2xl">{current.simpleMeaning}</p>
            {current.formula && <p className="mt-4 inline-block rounded-lg bg-muted px-3 py-2 font-mono text-sm text-foreground">{current.formula}</p>}
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick example</p>
              <p className="mt-1 text-sm leading-6 text-foreground">{current.example}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Interview answer</p>
              <p className="mt-1 text-sm leading-6 text-foreground">&ldquo;{current.interviewAnswer}&rdquo;</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <Link href={`/finance-terms/${current.slug}`} className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Read the full {current.term} guide
          </Link>
          <div className="flex items-center gap-2">
            {slides.length > 1 && (
              <>
                <button type="button" onClick={previous} aria-label="Previous finance term" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                {!reducedMotion && (
                  <button type="button" onClick={() => setUserPaused((value) => !value)} aria-pressed={userPaused} aria-label={userPaused ? 'Resume automatic slides' : 'Pause automatic slides'} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {userPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
                  </button>
                )}
                <button type="button" onClick={next} aria-label="Next finance term" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </article>
      <span className="sr-only" aria-live="polite">Slide {currentIndex + 1} of {slides.length}: {current.term}</span>
    </section>
  );
}
