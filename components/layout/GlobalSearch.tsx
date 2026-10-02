'use client';

// components/layout/GlobalSearch.tsx
//
// Primary search modal — opens via the Search button in the Navbar or Ctrl+K.
// Since Algolia keys are optional, this ALWAYS uses our own server-side search
// facade at /api/search — no Algolia dependency, zero keys needed.

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { lockBodyScroll } from '@/components/ui/bodyScrollLock';

interface SearchHit {
    kind: string;
    title: string;
    description: string;
    url: string;
    tags: string[];
    score: number;
}

interface SearchGroup {
    kind: string;
    label: string;
    items: SearchHit[];
}

interface SearchResponse {
    query: string;
    total: number;
    groups: SearchGroup[];
}

const KIND_ICON: Record<string, string> = {
    research: '📊',
    insight: '💡',
    'data-lab': '🧪',
    'case-study': '📁',
    podcast: '🎙️',
    'pgdm-subject': '🎓',
    'pgdm-lecture': '📘',
    tool: '🧮',
    study: '📚',
    'finance-term': '📖',
};

type GlobalSearchProps = {
    open: boolean;
    onClose: () => void;
};

function useDesktopMediaQuery() {
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        setIsDesktop(mq.matches);
        const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);
    return isDesktop;
}

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<SearchResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const isDesktop = useDesktopMediaQuery();

    // Focus the dialog when opened and return focus to its trigger when closed.
    useEffect(() => {
        if (!open) {
            if (previousFocusRef.current) {
                const previousFocus = previousFocusRef.current;
                previousFocusRef.current = null;
                requestAnimationFrame(() => previousFocus.focus());
            }
            return;
        }

        if (!previousFocusRef.current) {
            previousFocusRef.current = document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;
        }
        const timer = window.setTimeout(() => {
            if (isDesktop) inputRef.current?.focus();
            else dialogRef.current?.focus();
        }, 50);
        return () => window.clearTimeout(timer);
    }, [open, isDesktop]);

    // Lock scroll, support Escape, and keep keyboard focus inside this modal.
    useEffect(() => {
        if (!open) return;
        const releaseBodyScroll = lockBodyScroll();
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
                return;
            }
            if (e.key !== 'Tab') return;

            const dialog = dialogRef.current;
            if (!dialog) return;
            const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )).filter((element) => element.offsetParent !== null);
            if (!focusable.length) {
                e.preventDefault();
                dialog.focus();
                return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
                e.preventDefault();
                first.focus();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => {
            releaseBodyScroll();
            window.removeEventListener('keydown', handleKey);
        };
    }, [open, onClose]);

    // Reset state when closed
    useEffect(() => {
        if (!open) {
            setQuery('');
            setResult(null);
            setError(null);
        }
    }, [open]);

    // Debounced search
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
        const timer = setTimeout(async () => {
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
        }, 220);
        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [query]);

    const totalShown = useMemo(
        () => (result ? result.groups.reduce((sum, g) => sum + g.items.length, 0) : 0),
        [result]
    );

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            const trimmed = query.trim();
            if (trimmed) window.location.href = `/research?q=${encodeURIComponent(trimmed)}`;
        },
        [query]
    );

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-start bg-black/60 backdrop-blur-sm px-4 pt-[10vh] pb-4"
            role="presentation"
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                ref={dialogRef}
                className="flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-surface-overlay shadow-2xl shadow-black/60"
                style={{ maxHeight: 'min(80vh, 48rem)' }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="global-search-title"
                tabIndex={-1}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border bg-surface-muted px-4 py-3">
                    <h2 id="global-search-title" className="text-sm font-bold tracking-wide text-content-primary">
                        🔍 Search Kunwar Analytics
                    </h2>
                    <div className="flex items-center gap-2">
                        <kbd className="hidden rounded border border-border bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-content-muted sm:block">
                            ESC
                        </kbd>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-content-secondary transition hover:bg-accent hover:text-content-primary"
                            aria-label="Close search"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Search input */}
                <form onSubmit={handleSubmit} className="shrink-0 border-b border-border p-3">
                    <div className="relative flex items-center">
                        <svg className="absolute left-3 h-4 w-4 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="search"
                            placeholder="Search research, insights, tools, courses…"
                            className="w-full rounded-xl border border-border bg-surface-muted py-3 pl-10 pr-10 text-sm text-content-primary placeholder:text-content-muted outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                            enterKeyHint="search"
                            autoComplete="off"
                        />
                        {loading && (
                            <span className="absolute right-3 text-xs text-brand animate-pulse">…</span>
                        )}
                    </div>
                </form>

                {/* Results */}
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                    {error ? (
                        <p className="px-4 py-12 text-center text-sm text-error">{error}</p>
                    ) : query.trim().length < 2 ? (
                        <div className="px-4 py-10 text-center">
                            <p className="text-sm text-content-muted">
                                Type at least 2 characters to search across research, insights, Data Lab, courses and tools.
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-2">
                                {['Quick commerce', 'DCF valuation', 'Fintech', 'PGDM finance'].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        type="button"
                                        onClick={() => setQuery(suggestion)}
                                        className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs text-content-secondary transition hover:bg-accent hover:text-content-primary"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : loading && !result ? (
                        <p className="px-4 py-12 text-center text-sm text-content-muted">Searching…</p>
                    ) : totalShown === 0 ? (
                        <p className="px-4 py-12 text-center text-sm text-content-muted">
                            No results for &ldquo;{query.trim()}&rdquo;. Try different keywords.
                        </p>
                    ) : (
                        <div className="flex flex-col divide-y divide-white/5">
                            {result?.groups.map((group) => (
                                <div key={group.kind}>
                                    <p className="bg-surface-muted px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-content-muted">
                                        {KIND_ICON[group.kind] ?? '📄'} {group.label}
                                    </p>
                                    {group.items.map((item) => (
                                        <Link
                                            key={`${group.kind}-${item.url}`}
                                            href={item.url}
                                            onClick={onClose}
                                            className="flex min-h-[52px] flex-col justify-center gap-0.5 px-4 py-3 transition hover:bg-surface-muted"
                                        >
                                            <span className="line-clamp-1 font-medium text-sm text-content-primary">
                                                {item.title}
                                            </span>
                                            {item.description ? (
                                                <span className="line-clamp-1 text-xs text-content-muted">
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

                {/* Footer */}
                <div className="shrink-0 border-t border-border bg-surface-muted px-4 py-2.5">
                    <Link
                        href={query.trim() ? `/research?q=${encodeURIComponent(query.trim())}` : '/research'}
                        onClick={onClose}
                        className="flex min-h-[40px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
                    >
                        <span>Open full research search</span>
                        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
