'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import {
  Configure,
  Hits,
  InstantSearch,
  RefinementList,
  SearchBox,
  Stats,
} from 'react-instantsearch';
import { algoliasearch } from 'algoliasearch';
import Tag from '@/components/ui/Tag';
import { CATEGORY_VARIANT, formatDate } from '@/lib/utils';

type ResearchHit = {
  type: 'research';
  slug: string;
  title: string;
  summary: string;
  sector: string;
  tags: string[];
  date: string;
  author: string;
  url: string;
};

type InsightHit = {
  type: 'insight';
  slug: string;
  title: string;
  thesis: string;
  category: string;
  date: string;
  author: string;
  url: string;
};

type AlgoliaHit = ResearchHit | InsightHit | (Record<string, unknown> & { type?: string; url?: string });

function SearchSubmitIcon({ classNames }: { classNames: { submitIcon?: string } }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={classNames.submitIcon ?? ''}
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="18" r="8" />
      <path d="M26 26 L36 36" />
    </svg>
  );
}

function ResetIcon({ classNames }: { classNames: { resetIcon?: string } }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={classNames.resetIcon ?? ''}
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4 L16 16" />
      <path d="M16 4 L4 16" />
    </svg>
  );
}

function HitComponent({ hit }: { hit: AlgoliaHit }) {
  const type = hit?.type;

  if (type === 'research') {
    const h = hit as ResearchHit;
    return (
      <div className="h-full">
        <article className="research-card p-6 flex flex-col h-full">
          <div className="flex justify-between gap-3 mb-3">
            <Tag text={h.sector ?? 'Research'} variant="teal" />
          </div>

          <h3 className="text-lg font-bold text-brand-navy leading-snug mb-2 line-clamp-2 hover:text-brand-teal transition-colors">
            {h.title}
          </h3>

          <p className="text-sm text-brand-slate leading-relaxed flex-1 line-clamp-3 mb-4">
            {h.summary}
          </p>

          {Array.isArray(h.tags) && h.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {h.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-1 rounded-full bg-white/10 text-gray-600 font-mono border border-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
            <span className="text-[11px] text-gray-400 font-mono">{formatDate(h.date)}</span>
            <Link
              href={h.url}
              className="text-sm font-semibold text-brand-teal hover:text-brand-navy"
            >
              Read Report →
            </Link>
          </div>
        </article>
      </div>
    );
  }

  if (type === 'insight') {
    const h = hit as InsightHit;
    const variant = CATEGORY_VARIANT[h.category] ?? 'teal';

    return (
      <div className="h-full">
        <article className="card p-5 flex flex-col h-full">
          <Tag text={h.category} variant={variant} className="mb-3" />

          <h3 className="text-base font-bold text-brand-navy leading-snug mb-2 line-clamp-2">
            {h.title}
          </h3>

          <p className="text-sm text-brand-slate italic leading-relaxed flex-1 line-clamp-3 mb-4">
            {h.thesis}
          </p>

          <div className="flex justify-between pt-3 border-t border-gray-100">
            <span className="text-[11px] text-gray-400 font-mono">{formatDate(h.date)}</span>
            <Link
              href={h.url}
              className="text-sm font-semibold text-brand-teal hover:text-brand-navy"
            >
              Read →
            </Link>
          </div>
        </article>
      </div>
    );
  }

  return null;
}

export default function AlgoliaSearch() {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
  const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

  const searchClient = useMemo(() => {
    if (!appId || !searchKey) return null;
    return algoliasearch(appId, searchKey);
  }, [appId, searchKey]);

  if (!searchClient) {
    return (
      <div className="wrap py-14">
        <div className="card p-8">
          <p className="section-label mb-2">Algolia not configured</p>
          <p className="text-brand-slate">
            Missing <code>NEXT_PUBLIC_ALGOLIA_SEARCH_KEY</code>. Set it in your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <InstantSearch searchClient={searchClient} indexName="finnexus_content">
      <div>
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
          <div className="wrap py-6">
            <div className="flex flex-col gap-4">
              <Configure hitsPerPage={12} />

              <div className="relative">
                <SearchBox
                  placeholder="Search research and insights..."
                  classNames={{
                    form: 'flex items-center',
                    input: 'search-input focus-ring pr-20',
                    submit: 'absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center pr-2',
                    submitIcon: 'text-brand-teal',
                    reset: 'absolute right-10 top-1/2 -translate-y-1/2 flex items-center justify-center pr-2',
                    resetIcon: 'text-brand-slate',
                    loadingIndicator: 'hidden',
                    root: 'w-full',
                    loadingIcon: 'hidden',
                  }}
                  submitIconComponent={SearchSubmitIcon}
                  resetIconComponent={ResetIcon}
                />
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="min-w-[220px] flex-1">
                  <p className="section-label mb-3">Sector</p>
                  <RefinementList
                    attribute="sector"
                    limit={50}
                    classNames={{
                      root: 'flex flex-wrap gap-2',
                      noRefinementRoot: 'hidden',
                      list: 'flex flex-wrap gap-2',
                      item: 'pill pill-off cursor-pointer',
                      selectedItem: 'pill pill-on',
                      label: 'cursor-pointer',
                      checkbox: 'hidden',
                      labelText: 'text-sm',
                      count: 'hidden',
                      searchBox: 'hidden',
                      noResults: 'hidden',
                      showMore: 'hidden',
                      disabledShowMore: 'hidden',
                    }}
                  />
                </div>

                <div className="min-w-[220px] flex-1">
                  <p className="section-label mb-3">Type</p>
                  <RefinementList
                    attribute="type"
                    limit={10}
                    operator="or"
                    transformItems={(items) =>
                      items.map((item) => ({
                        ...item,
                        label: item.value === 'research' ? 'Research' : 'Insights',
                      }))
                    }
                    classNames={{
                      root: 'flex flex-wrap gap-2',
                      noRefinementRoot: 'hidden',
                      list: 'flex flex-wrap gap-2',
                      item: 'pill pill-off cursor-pointer',
                      selectedItem: 'pill pill-on',
                      label: 'cursor-pointer',
                      checkbox: 'hidden',
                      labelText: 'text-sm',
                      count: 'hidden',
                      searchBox: 'hidden',
                      noResults: 'hidden',
                      showMore: 'hidden',
                      disabledShowMore: 'hidden',
                    }}
                  />
                </div>
              </div>

              <div className="text-sm text-brand-slate flex items-center justify-between gap-4">
                <div className="min-w-[140px]">
                  <Stats
                    translations={{
                      rootElementText: ({ nbHits }) => `${nbHits} results`,
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  Use filters to narrow by sector and type.
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="wrap py-14">
          <Hits
            hitComponent={HitComponent}
            classNames={{
              root: '',
              emptyRoot: '',
              list: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
              item: 'h-full',
              bannerRoot: '',
              bannerImage: '',
              bannerLink: '',
            }}
          />
        </main>
      </div>
    </InstantSearch>
  );
}

