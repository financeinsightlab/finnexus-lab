'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Configure,
  Hits,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch';
import { algoliasearch } from 'algoliasearch';

type AlgoliaHit = {
  objectID: string;
  type?: string;
  title?: string;
  summary?: string;
  thesis?: string;
  url?: string;
  sector?: string;
  category?: string;
};

function SearchSubmitIcon({ classNames }: { classNames: { submitIcon?: string } }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={classNames.submitIcon ?? ''}
      width="18"
      height="18"
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
      width="16"
      height="16"
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

function CompactHit({ hit, onPick }: { hit: AlgoliaHit; onPick: () => void }) {
  const url = hit.url ?? '/';
  const title = hit.title ?? 'Untitled';
  const subtitle =
    hit.type === 'research'
      ? hit.summary
      : hit.type === 'insight'
        ? hit.thesis
        : '';
  const badge =
    hit.type === 'research'
      ? hit.sector ?? 'Research'
      : hit.type === 'insight'
        ? hit.category ?? 'Insight'
        : hit.type ?? 'Content';

  return (
    <Link
      href={url}
      onClick={onPick}
      className="flex flex-col gap-1 px-4 py-3 hover:bg-brand-silver/60 active:bg-brand-silver transition-colors text-left min-h-[44px] justify-center border-b border-gray-100"
    >
      <div className="flex items-center gap-2">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
            hit.type === 'insight'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-teal-100 text-teal-800'
          }`}
        >
          {badge}
        </span>
        <span className="text-xs text-gray-400">{hit.type === 'insight' ? 'Insight' : 'Research'}</span>
      </div>
      <span className="font-semibold text-brand-navy line-clamp-2">{title}</span>
      {subtitle ? (
        <span className="text-sm text-brand-slate line-clamp-2">{subtitle}</span>
      ) : null}
    </Link>
  );
}

type GlobalSearchProps = {
  open: boolean;
  onClose: () => void;
};

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
  const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

  const searchClient = useMemo(() => {
    if (!appId || !searchKey) return null;
    return algoliasearch(appId, searchKey);
  }, [appId, searchKey]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, handleEscape]);

  if (!open) return null;

  if (!searchClient) {
    return (
      <div
        className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={panelRef}
          className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-gray-200 p-6"
        >
          <p className="font-semibold text-brand-navy mb-2">Search unavailable</p>
          <p className="text-sm text-brand-slate mb-4">
            Add <code className="text-xs bg-gray-100 px-1 rounded">NEXT_PUBLIC_ALGOLIA_SEARCH_KEY</code> to enable search.
          </p>
          <div className="flex gap-2">
            <Link href="/research" className="btn btn-primary flex-1 text-center" onClick={onClose}>
              Browse research
            </Link>
            <button type="button" className="btn btn-outline flex-1" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="w-full sm:max-w-xl max-h-[min(90vh,720px)] flex flex-col bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-brand-navy to-brand-slate shrink-0">
          <h2 id="global-search-title" className="text-sm font-bold text-white tracking-wide">
            Search FinNexus Lab
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-white/90 hover:bg-white/15 transition-colors focus-ring"
            aria-label="Close search"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <InstantSearch searchClient={searchClient} indexName="finnexus_content">
          <div className="flex flex-col flex-1 min-h-0">
            <Configure hitsPerPage={8} />
            <div className="p-4 border-b border-gray-100 shrink-0">
              <SearchBox
                placeholder="Search reports, insights, topics…"
                autoFocus
                classNames={{
                  form: 'relative flex items-center',
                  input:
                    'w-full pl-4 pr-24 py-3.5 rounded-xl border-2 border-gray-200 text-base text-brand-navy placeholder:text-gray-400 focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/15 transition-shadow',
                  submit:
                    'absolute right-12 top-1/2 -translate-y-1/2 flex items-center justify-center p-2 rounded-lg text-brand-teal hover:bg-teal-50',
                  submitIcon: '',
                  reset:
                    'absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100',
                  resetIcon: '',
                  loadingIndicator: 'hidden',
                  root: 'w-full',
                  loadingIcon: 'hidden',
                }}
                submitIconComponent={SearchSubmitIcon}
                resetIconComponent={ResetIcon}
              />
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain min-h-[200px]">
              <Hits
                hitComponent={({ hit }) => <CompactHit hit={hit as AlgoliaHit} onPick={onClose} />}
                classNames={{
                  root: 'pb-2',
                  emptyRoot: 'px-4 py-12 text-center text-brand-slate text-sm',
                  list: 'flex flex-col',
                  item: 'list-none',
                  bannerRoot: '',
                  bannerImage: '',
                  bannerLink: '',
                }}
              />
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0">
              <Link
                href="/research"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full min-h-[48px] rounded-xl bg-brand-navy text-white font-semibold text-sm hover:bg-brand-teal transition-colors focus-ring"
              >
                Open full research search
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
