'use client';

// components/layout/GlobalSearchFallback.tsx
//
// Keyless search panel. Used when Algolia env vars are absent so the site-wide
// search box still works — it calls the server-side unified facade at
// /api/search (see lib/search.ts) instead of collapsing to an "unavailable"
// message. Zero external keys required.

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useModalAccessibility } from '@/components/ui/useModalAccessibility';

export interface FallbackHit {
    kind: string;
    title: string;
    description: string;
    url: string;
    tags: string[];
    score: number;
}

interface FallbackGroup {
    kind: string;
    label: string;
    items: FallbackHit[];
}

interface SearchResponse {
    query: string;
    total: number;
    groups: FallbackGroup[];
}

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 40 40"
            aria-hidden="true"
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

export default function GlobalSearchFallback({
    onClose,
    panelStyle,
    desktopAutofocus,
}: {
    onClose: () => void;
    panelStyle: { maxHeight: number };
    desktopAutofocus: boolean;
}) {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<SearchResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    useModalAccessibility(true, dialogRef, onClose, {
        initialFocusRef: desktopAutofocus ? inputRef : undefined,
    });

    useEffect(() => {
        const trimmed = query.trim();
        if (trimmed.length < 2) {
            setResult(null);
            setError(null);
            setLoading(false);
            return;
        }
        const controller = new AbortController();
        setLoading(true);
        const handle = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&perKind=6`, {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error(`Search failed (${res.status})`);
                const data = (await res.json()) as SearchResponse;
                setResult(data);
                setError(null);
            } catch (err) {
                if ((err as Error).name === 'AbortError') return;
                setError('Search is temporarily unavailable. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 250);

        return () => {
            controller.abort();
            clearTimeout(handle);
        };
    }, [query]);

    const totalShown = useMemo(
        () => (result ? result.groups.reduce((sum, group) => sum + group.items.length, 0) : 0),
        [result]
    );

    const submit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            const trimmed = query.trim();
            if (trimmed) window.location.href = `/research?q=${encodeURIComponent(trimmed)}`;
        },
        [query]
    );

    return (
        <div
            ref={dialogRef}
            className="viewport-dialog-panel ui-scroll-region flex w-full min-w-0 max-w-xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0f1c2d]"
            style={panelStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby="global-search-title"
            tabIndex={-1}
            data-lenis-prevent
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div className="flex min-w-0 shrink-0 items-center justify-between gap-2 border-b border-gray-100 bg-gradient-to-r from-brand-navy to-brand-slate px-3 py-3 sm:gap-3 sm:px-4 dark:border-white/10">
                <h2 id="global-search-title" className="min-w-0 truncate text-sm font-bold tracking-wide text-white">
                    Search Kunwar Analytics
                </h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-white/90 transition-colors hover:bg-white/15 focus-ring"
                    aria-label="Close search"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form onSubmit={submit} className="min-w-0 shrink-0 border-b border-gray-100 p-3 sm:p-4 dark:border-white/10">
                <div className="relative flex min-w-0 items-center">
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="search"
                        placeholder="Search reports, insights, topics…"
                        className="box-border w-full min-w-0 max-w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-3 pr-12 text-base text-brand-navy placeholder:text-gray-400 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/30 dark:border-white/10 dark:bg-[#0a1120] dark:text-slate-100 sm:pl-4"
                        enterKeyHint="search"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-brand-teal hover:bg-teal-50 dark:hover:bg-white/10"
                        aria-label="Search"
                    >
                        <SearchIcon />
                    </button>
                </div>
            </form>

            <div className="ui-scroll-region min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain" data-lenis-prevent>
                {error ? (
                    <p className="px-4 py-12 text-center text-sm text-red-600 dark:text-red-400">{error}</p>
                ) : query.trim().length < 2 ? (
                    <p className="px-4 py-12 text-center text-sm text-brand-slate dark:text-slate-400">
                        Type at least two characters to search across research, insights, Data Lab, courses and tools.
                    </p>
                ) : loading && !result ? (
                    <p className="px-4 py-12 text-center text-sm text-brand-slate dark:text-slate-400">Searching…</p>
                ) : totalShown === 0 ? (
                    <p className="px-4 py-12 text-center text-sm text-brand-slate dark:text-slate-400">
                        No matches for “{query.trim()}”.
                    </p>
                ) : (
                    <div className="flex flex-col">
                        {result?.groups.map((group) => (
                            <div key={group.kind} className="min-w-0">
                                <p className="bg-gray-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-brand-slate dark:bg-white/5 dark:text-slate-400 sm:px-4">
                                    {group.label}
                                </p>
                                {group.items.map((item) => (
                                    <Link
                                        key={`${group.kind}-${item.url}`}
                                        href={item.url}
                                        onClick={onClose}
                                        className="flex min-h-[44px] min-w-0 max-w-full flex-col justify-center gap-1 border-b border-gray-100 px-3 py-3 text-left last:border-b-0 hover:bg-brand-silver/60 dark:border-white/10 dark:hover:bg-white/5 sm:px-4"
                                    >
                                        <span className="break-words font-semibold text-brand-navy dark:text-slate-100">
                                            {item.title}
                                        </span>
                                        {item.description ? (
                                            <span className="break-words text-sm text-brand-slate dark:text-slate-400">
                                                {item.description}
                                            </span>
                                        ) : null}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="min-w-0 shrink-0 border-t border-gray-100 bg-gray-50 p-3 dark:border-white/10 dark:bg-white/5 sm:p-4">
                <Link
                    href={query.trim() ? `/research?q=${encodeURIComponent(query.trim())}` : '/research'}
                    onClick={onClose}
                    className="focus-ring flex min-h-[48px] w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-brand-navy px-3 text-center text-sm font-semibold leading-snug text-white transition-colors hover:bg-brand-teal"
                >
                    <span className="min-w-0 flex-1 text-pretty sm:flex-none">Open full research search</span>
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
