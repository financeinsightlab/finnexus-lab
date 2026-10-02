'use client';

// Global command palette (⌘K / Ctrl-K) built on the unified search facade
// (`/api/search`). It gives keyboard-first users a single surface to jump to
// any page or content item without hunting through the nav clusters.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SearchItem, SearchResult } from '@/lib/search';
import { useDialogAccessibility } from '@/components/ui/useDialogAccessibility';

const STATIC_ACTIONS: SearchItem[] = [
    { kind: 'research', title: 'Dashboard', description: 'Your saved items and plan', url: '/dashboard', tags: ['account'], score: 1 },
    { kind: 'tool', title: 'Pricing', description: 'Plans and upgrade', url: '/pricing', tags: ['billing'], score: 1 },
    { kind: 'research', title: 'Research library', description: 'All research reports', url: '/research', tags: [], score: 1 },
    { kind: 'insight', title: 'Insights', description: 'Short-form analysis', url: '/insights', tags: [], score: 1 },
    { kind: 'pgdm-subject', title: 'PGDM curriculum', description: 'Subjects, lectures, cheat sheets', url: '/pgdm', tags: [], score: 1 },
    { kind: 'study', title: 'Study material', description: 'Notes, videos and courses', url: '/study', tags: [], score: 1 },
    { kind: 'study', title: 'Finance terms', description: 'Search definitions, formulas and interview explanations', url: '/finance-terms', tags: ['glossary', 'finance'], score: 1 },
    { kind: 'data-lab', title: 'Data Lab', description: 'Notebooks and datasets', url: '/data-lab', tags: [], score: 1 },
    { kind: 'tool', title: 'Tools & calculators', description: '16 analyst calculators', url: '/tools', tags: [], score: 1 },
    { kind: 'case-study', title: 'Case studies', description: 'Deep-dive business teardowns', url: '/case-studies', tags: [], score: 1 },
    { kind: 'podcast', title: 'Podcast', description: 'Audio analysis', url: '/podcast', tags: [], score: 1 },
    { kind: 'research', title: 'Prediction Ledger', description: 'Public track record', url: '/predictions/ledger', tags: ['predictions'], score: 1 },
    { kind: 'research', title: 'Sector tracker', description: 'Live sector dashboards', url: '/tracker', tags: [], score: 1 },
];

const GROUP_ICON: Record<string, string> = {
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

interface FlatRow {
    item: SearchItem;
    label: string;
}

export default function CommandPalette() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<SearchResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const dialogRef = useDialogAccessibility(open, () => setOpen(false));

    // CommandPalette is triggered by the visible button below.
    // Ctrl+K is handled by Navbar which opens GlobalSearch instead.

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    // Debounced remote search; falls back to the static action list when empty.
    useEffect(() => {
        if (!open) return;
        const q = query.trim();
        if (q.length < 2) {
            setResult(null);
            setLoading(false);
            return;
        }
        const controller = new AbortController();
        setLoading(true);
        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(q)}&perKind=5`, {
                    signal: controller.signal,
                });
                if (response.ok) setResult((await response.json()) as SearchResult);
            } catch {
                /* aborted or offline — keep previous results */
            } finally {
                setLoading(false);
            }
        }, 180);
        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [query, open]);

    const rows = useMemo<FlatRow[]>(() => {
        const q = query.trim().toLowerCase();
        if (!result) {
            const matches = q
                ? STATIC_ACTIONS.filter(
                    (item) =>
                        item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q),
                )
                : STATIC_ACTIONS;
            return matches.map((item) => ({ item, label: 'Jump to' }));
        }
        return result.groups.flatMap((group) =>
            group.items.map((item) => ({ item, label: group.label })),
        );
    }, [result, query]);

    useEffect(() => {
        setActive(0);
    }, [rows.length]);

    const run = useCallback(
        (item: SearchItem) => {
            setOpen(false);
            setQuery('');
            router.push(item.url);
        },
        [router],
    );

    const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActive((value) => Math.min(value + 1, rows.length - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActive((value) => Math.max(value - 1, 0));
        } else if (event.key === 'Enter' && rows[active]) {
            event.preventDefault();
            run(rows[active].item);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open command palette"
                className="hidden items-center gap-2 rounded-lg border border-border bg-surface-muted px-3 py-1.5 text-xs font-medium text-content-secondary transition-colors hover:border-border-strong hover:text-content-primary md:inline-flex"
            >
                <span aria-hidden>🔍</span>
                <span>Search…</span>
                <kbd className="rounded border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] text-content-muted">
                    ⌘K
                </kbd>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                    role="presentation"
                >
                    <div
                        ref={dialogRef}
                        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface-overlay shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Command palette"
                        tabIndex={-1}
                    >
                        <div className="flex items-center gap-3 border-b border-border px-4">
                            <span aria-hidden className="text-content-muted">
                                🔍
                            </span>
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={onInputKeyDown}
                                placeholder="Search pages, research, lectures, tools…"
                                className="w-full bg-transparent py-4 text-sm text-content-primary outline-none placeholder:text-content-muted"
                            />
                            {loading && <span className="text-xs text-content-muted">…</span>}
                        </div>

                        <ul className="max-h-[52vh] overflow-y-auto py-2">
                            {rows.length === 0 ? (
                                <li className="px-4 py-8 text-center text-sm text-content-muted">
                                    No matches. Try another term.
                                </li>
                            ) : (
                                rows.map((row, index) => (
                                    <li key={`${row.label}-${row.item.url}-${index}`}>
                                        <button
                                            type="button"
                                            onMouseEnter={() => setActive(index)}
                                            onClick={() => run(row.item)}
                                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left ${index === active ? 'bg-white/5' : ''
                                                }`}
                                        >
                                            <span aria-hidden className="text-base">
                                                {GROUP_ICON[row.item.kind] ?? '📄'}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate text-sm font-medium text-content-primary">
                                                    {row.item.title}
                                                </span>
                                                <span className="block truncate text-xs text-content-muted">
                                                    {row.item.description}
                                                </span>
                                            </span>
                                            <span className="shrink-0 text-[10px] uppercase tracking-widest text-content-muted">
                                                {row.label}
                                            </span>
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>

                        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[10px] text-content-muted">
                            <span>↑↓ navigate · ↵ open · esc close</span>
                            <span>Kunwar Analytics</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
