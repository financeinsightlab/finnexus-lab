'use client';

// Global command palette (⌘K / Ctrl-K) built on the unified search facade
// (`/api/search`). It gives keyboard-first users a single surface to jump to
// any page or content item without hunting through the nav clusters.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useModalAccessibility } from '@/components/ui/useModalAccessibility';
import type { SearchItem, SearchResult } from '@/lib/search';

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
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // CommandPalette is triggered by the visible button below.
    // Ctrl+K is handled by Navbar which opens GlobalSearch instead.
    useModalAccessibility(open, dialogRef, () => setOpen(false), {
        initialFocusRef: inputRef,
    });

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
                aria-expanded={open}
                aria-controls="command-palette-dialog"
                className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white md:inline-flex"
            >
                <span aria-hidden>🔍</span>
                <span>Search…</span>
                <kbd className="rounded border border-white/10 bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                    ⌘K
                </kbd>
            </button>

            {open && (
                <div
                    className="safe-area-overlay fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm"
                    onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
                    style={{
                        paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
                        paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
                        paddingTop: 'max(12vh, calc(env(safe-area-inset-top) + 1rem))',
                        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
                    }}
                    role="presentation"
                >
                    <div
                        ref={dialogRef}
                        id="command-palette-dialog"
                        className="viewport-dialog-panel ui-scroll-region flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1420] shadow-2xl"
                        style={{ maxHeight: 'calc(100dvh - max(12vh, calc(env(safe-area-inset-top) + 1rem)) - max(0.75rem, env(safe-area-inset-bottom)))' }}
                        onMouseDown={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Command palette"
                        tabIndex={-1}
                        data-lenis-prevent
                    >
                        <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-4">
                            <span aria-hidden className="text-slate-500">
                                🔍
                            </span>
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={onInputKeyDown}
                                placeholder="Search pages, research, lectures, tools…"
                                className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                            />
                            {loading && <span className="shrink-0 text-xs text-slate-500">…</span>}
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={() => setOpen(false)}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400"
                                aria-label="Close command palette"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <ul className="ui-scroll-region min-h-0 flex-1 overflow-y-auto overscroll-y-contain py-2" data-lenis-prevent>
                            {rows.length === 0 ? (
                                <li className="px-4 py-8 text-center text-sm text-slate-500">
                                    No matches. Try another term.
                                </li>
                            ) : (
                                rows.map((row, index) => (
                                    <li key={`${row.label}-${row.item.url}-${index}`}>
                                        <button
                                            type="button"
                                            onMouseEnter={() => setActive(index)}
                                            onClick={() => run(row.item)}
                                            className={`flex w-full min-w-0 items-start gap-3 px-4 py-2.5 text-left ${index === active ? 'bg-white/5' : ''
                                                }`}
                                        >
                                            <span aria-hidden className="text-base">
                                                {GROUP_ICON[row.item.kind] ?? '📄'}
                                            </span>
                                            <span className="min-w-0 flex-1 break-words">
                                                <span className="block break-words text-sm font-medium text-slate-100">
                                                    {row.item.title}
                                                </span>
                                                <span className="block break-words text-xs text-slate-500">
                                                    {row.item.description}
                                                </span>
                                            </span>
                                            <span className="max-w-[28%] shrink-0 break-words text-right text-[10px] uppercase tracking-widest text-slate-600">
                                                {row.label}
                                            </span>
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>

                        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-white/10 px-4 py-2 text-[10px] text-slate-500">
                            <span>↑↓ navigate · ↵ open · esc close</span>
                            <span>Kunwar Analytics</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
