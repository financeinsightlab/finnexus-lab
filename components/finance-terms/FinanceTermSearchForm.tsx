'use client';

import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export default function FinanceTermSearchForm({
  query = '',
  category = '',
  categories = [],
}: {
  query?: string;
  category?: string;
  categories?: string[];
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q')?.trim();
    if (q) trackEvent('finance_term_search', { query: q.slice(0, 120) });
  }, [searchParams]);

  return (
    <form action="/finance-terms" method="get" role="search" className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px_auto]">
      <label className="sr-only" htmlFor="finance-term-search">Search finance terms</label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          id="finance-term-search"
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search WACC, DCF, CAPM, synonyms or keywords"
          className="min-h-12 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <label className="sr-only" htmlFor="finance-term-category">Filter finance terms by category</label>
      <select id="finance-term-category" name="category" defaultValue={category} className="min-h-12 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <option value="">All categories</option>
        {categories.map((name) => <option key={name} value={name}>{name}</option>)}
      </select>
      <button type="submit" className="min-h-12 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        Search terms
      </button>
    </form>
  );
}
