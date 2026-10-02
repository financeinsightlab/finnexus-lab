import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';
import FinanceTermSearchForm from '@/components/finance-terms/FinanceTermSearchForm';
import FinanceTermsCarousel from '@/components/finance-terms/FinanceTermsCarousel';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import {
  FINANCE_TERMS_BASE,
  FINANCE_TERM_PAGE_SIZE,
  getFinanceTermCategories,
  getFinanceTermIndex,
  getFeaturedFinanceTerms,
} from '@/lib/finance-terms';

export const metadata: Metadata = {
  title: 'Finance Terms in Simple Words | Kunwar Analytics',
  description: 'Search finance and business terms with plain-language meanings, simple examples, interview-ready explanations and formulas.',
  alternates: { canonical: FINANCE_TERMS_BASE },
  openGraph: {
    title: 'Finance Terms in Simple Words | Kunwar Analytics',
    description: 'A searchable glossary of finance, business and analytics terms with clear examples and practical explanations.',
    url: FINANCE_TERMS_BASE,
    type: 'website',
  },
};

type SearchParams = Promise<{ q?: string; category?: string; page?: string }>;

export default async function FinanceTermsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = (params.q ?? '').trim().slice(0, 120);
  const category = (params.category ?? '').trim().slice(0, 80);
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1);
  let indexAvailable = true;
  const [result, categories, featuredTerms] = await Promise.all([
    getFinanceTermIndex({ query, category, page, pageSize: FINANCE_TERM_PAGE_SIZE }).catch(() => {
      indexAvailable = false;
      return { terms: [], total: 0 };
    }),
    getFinanceTermCategories().catch(() => []),
    getFeaturedFinanceTerms(24).catch(() => []),
  ]);
  const totalPages = Math.max(1, Math.ceil(result.total / FINANCE_TERM_PAGE_SIZE));
  const baseParams = new URLSearchParams();
  if (query) baseParams.set('q', query);
  if (category) baseParams.set('category', category);
  const makePageHref = (nextPage: number) => {
    const next = new URLSearchParams(baseParams);
    next.set('page', String(nextPage));
    return `/finance-terms?${next.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={[
        { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Finance Terms in Simple Words', description: metadata.description, url: FINANCE_TERMS_BASE },
        breadcrumbSchema([
          { name: 'Home', url: 'https://kunwaranalytics.in' },
          { name: 'Finance Terms', url: FINANCE_TERMS_BASE },
        ]),
      ]} />
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link><span className="px-2">/</span><span aria-current="page">Finance Terms</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Finance in simple words</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">Understand finance terms. Explain them with confidence.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Explore definitions, practical examples, formulas and interview-ready explanations for finance, business and analytics concepts. Every published term has its own stable page.</p>
          <div className="mt-7">
            <Suspense fallback={<div className="h-12 rounded-xl bg-muted" />}>
              <FinanceTermSearchForm query={query} category={category} categories={categories} />
            </Suspense>
          </div>
        </div>
      </header>

      {/* ===== INTERACTIVE FINANCE TERMS SLIDE DECK (Identical to Home Screen) ===== */}
      <div className="border-b border-border/60 bg-gradient-to-b from-background via-muted/15 to-background">
        <FinanceTermsCarousel terms={featuredTerms} showExploreLink={false} />
      </div>
      <PromotionSlot slot="CONTENT_TOP" path="/finance-terms" />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-foreground">{query ? `Results for “${query}”` : category ? `${category} terms` : 'Browse the glossary'}</h2>
          <p className="text-sm text-muted-foreground">{result.total.toLocaleString()} {result.total === 1 ? 'term' : 'terms'}</p>
        </div>
        {categories.length > 0 && (
          <nav aria-label="Finance term categories" className="mb-6 flex flex-wrap gap-2">
            <Link href={query ? `/finance-terms?q=${encodeURIComponent(query)}` : '/finance-terms'} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${!category ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>All categories</Link>
            {categories.map((name) => {
              const search = new URLSearchParams();
              if (query) search.set('q', query);
              search.set('category', name);
              return <Link key={name} href={`/finance-terms?${search}`} aria-current={category === name ? 'page' : undefined} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${category === name ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>{name}</Link>;
            })}
          </nav>
        )}
        {result.terms.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.terms.map((term) => (
              <li key={term.id}>
                <Link href={`/finance-terms/${term.slug}`} className="group block h-full rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{term.category}</span>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">{term.difficulty.toLowerCase()}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-foreground group-hover:text-primary">{term.term}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{term.simpleMeaning}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-primary">Read definition <span aria-hidden="true" className="ml-1">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
            <p className="font-semibold text-foreground">{!indexAvailable ? 'The glossary is temporarily unavailable.' : query ? 'No published terms matched that search.' : 'No finance terms have been published yet.'}</p>
            <p className="mt-2 text-sm text-muted-foreground">{!indexAvailable ? 'Please try again later.' : 'Try an abbreviation, a partial phrase or a synonym.'}</p>
          </div>
        )}
        {totalPages > 1 && (
          <nav aria-label="Glossary pagination" className="mt-8 flex items-center justify-center gap-3">
            {page > 1 && <Link href={makePageHref(page - 1)} rel="prev" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-accent">Previous page</Link>}
            <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            {page < totalPages && <Link href={makePageHref(page + 1)} rel="next" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-accent">Next page</Link>}
          </nav>
        )}
        <div className="my-8">
          <PromotionSlot slot="CONTENT_BOTTOM" path="/finance-terms" />
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
          Looking for learning paths or tools? <Link href="/pgdm" className="font-semibold text-primary hover:underline">Browse individual PGDM courses</Link> or <Link href="/tools" className="font-semibold text-primary hover:underline">explore calculators</Link>.
        </div>
      </main>
      <PromotionSlot slot="FOOTER" path="/finance-terms" />
    </div>
  );
}
