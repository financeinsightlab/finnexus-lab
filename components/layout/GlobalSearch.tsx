'use client';

// components/layout/GlobalSearch.tsx
//
// THE site search modal — opens via the Search button in the Navbar or Ctrl+K.
// (The former duplicate CommandPalette was removed; its arrow-key navigation
// and "Jump to" quick actions were ported here so there is one coherent ⌘K.)
// Since Algolia keys are optional, this ALWAYS uses our own server-side search
// facade at /api/search — no Algolia dependency, zero keys needed.

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QUICK_ACTIONS } from '@/lib/navigation';


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

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const [result, setResult] = useState<SearchResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);


    // Reset state when closed
    useEffect(() => {
        if (!open) {
            setQuery('');
            setResult(null);
            setError(null);
            setActive(0);
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

    // Flat, keyboard-navigable row list: quick actions before typing,
    // grouped search hits (in display order) afterwards.
    const rows = useMemo(() => {
        if (query.trim().length < 2) {
            return QUICK_ACTIONS.map((a) => ({ title: a.label, description: a.description ?? '', url: a.href }));
        }
        return result ? result.groups.flatMap((g) => g.items) : [];
    }, [query, result]);

    useEffect(() => { setActive(0); }, [rows.length, query]);

    const goTo = useCallback(
        (url: string) => { onClose(); router.push(url); },
        [onClose, router]
    );

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            // Enter opens the highlighted row; with no rows it falls back to
            // the full research search (the footer's explicit action).
            if (rows[active]) { goTo(rows[active].url); return; }
            const trimmed = query.trim();
            if (trimmed) window.location.href = `/research?q=${encodeURIComponent(trimmed)}`;
        },
        [query, rows, active, goTo]
    );

    const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActive((v) => (rows.length ? (v + 1) % rows.length : 0));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActive((v) => (rows.length ? (v - 1 + rows.length) % rows.length : 0));
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-start bg-black/60 backdrop-blur-sm"
            role="presentation"
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                paddingLeft: 'max(1rem, env(safe-area-inset-left))',
                paddingRight: 'max(1rem, env(safe-area-inset-right))',
                paddingTop: 'max(10vh, calc(env(safe-area-inset-top) + 1rem))',
                paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
            }}
        >
            <div
                ref={dialogRef}
                className="viewport-dialog-panel ui-scroll-region flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-surface-overlay shadow-2xl shadow-black/60"
                style={{ maxHeight: 'min(45rem, calc(100dvh - max(10vh, calc(env(safe-area-inset-top) + 1rem)) - max(1rem, env(safe-area-inset-bottom))))' }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="global-search-title"
                tabIndex={-1}
                data-lenis-prevent
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
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-content-secondary transition hover:bg-accent hover:text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400"
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
                            onKeyDown={onInputKeyDown}
                            aria-label="Search Kunwar Analytics"
                            aria-describedby="global-search-hint"
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
                <div className="ui-scroll-region min-h-0 flex-1 overflow-y-auto overscroll-y-contain" data-lenis-prevent>
                    {error ? (
                        <p className="px-4 py-12 text-center text-sm text-error">{error}</p>
                    ) : query.trim().length < 2 ? (
                        <div>
                            <p className="bg-surface-muted px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-content-muted">
                                ⚡ Jump to
                            </p>
                            {QUICK_ACTIONS.map((action, index) => (
                                <Link
                                    key={action.href}
                                    href={action.href}
                                    onClick={onClose}
                                    onMouseEnter={() => setActive(index)}
                                    className={`flex min-h-[52px] flex-col justify-center gap-0.5 px-4 py-3 transition hover:bg-surface-muted ${index === active ? 'bg-surface-muted' : ''}`}
                                >
                                    <span className="break-words font-medium text-sm text-content-primary">
                                        {action.icon} {action.label}
                                    </span>
                                    {action.description ? (
                                        <span className="break-words text-xs text-content-muted">{action.description}</span>
                                    ) : null}
                                </Link>
                            ))}
                            <div className="px-4 py-6 text-center">
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
                        </div>
                    ) : loading && !result ? (
                        <p className="px-4 py-12 text-center text-sm text-content-muted">Searching…</p>
                    ) : totalShown === 0 ? (
                        <p className="px-4 py-12 text-center text-sm text-content-muted">
                            No results for &ldquo;{query.trim()}&rdquo;. Try different keywords.
                        </p>
                    ) : (
                        <div className="flex flex-col divide-y divide-white/5">
                            {result?.groups.map((group, groupIndex) => {
                                const groupStart = result.groups
                                    .slice(0, groupIndex)
                                    .reduce((sum, g) => sum + g.items.length, 0);
                                return (
                                <div key={group.kind}>
                                    <p className="bg-surface-muted px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-content-muted">
                                        {KIND_ICON[group.kind] ?? '📄'} {group.label}
                                    </p>
                                    {group.items.map((item, itemIndex) => (
                                        <Link
                                            key={`${group.kind}-${item.url}`}
                                            href={item.url}
                                            onClick={onClose}
                                            onMouseEnter={() => setActive(groupStart + itemIndex)}
                                            className={`flex min-h-[52px] flex-col justify-center gap-0.5 px-4 py-3 transition hover:bg-surface-muted ${groupStart + itemIndex === active ? 'bg-surface-muted' : ''}`}
                                        >
                                            <span className="break-words font-medium text-sm text-content-primary">
                                                {item.title}
                                            </span>
                                            {item.description ? (
                                                <span className="break-words text-xs text-content-muted">
                                                    {item.description}
                                                </span>
                                            ) : null}
                                        </Link>
                                    ))}
                                </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p id="global-search-hint" className="shrink-0 px-4 pt-2 text-[10px] text-content-muted">
                    ↑↓ navigate · ↵ open · esc close
                </p>
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
