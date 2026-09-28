'use client';

// Filter + export controls for the public Prediction Ledger. Navigation is
// driven through the URL (shallow routing) so a filtered view is shareable and
// the server can pre-render the exact slice that was requested.

import { useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { PredictionStatus } from '@prisma/client';
import type { LedgerPrediction } from '@/lib/calibration';
import { buildLedgerQuery, toCsv, type LedgerFilters, type LedgerWindow } from './ledger-utils';

interface LedgerFiltersProps {
    filters: LedgerFilters;
    sectors: string[];
    rows: LedgerPrediction[];
}

const WINDOW_OPTIONS: { value: LedgerWindow; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'open', label: 'Open' },
    { value: 'resolved', label: 'Resolved' },
];

const STATUS_OPTIONS: { value: PredictionStatus | null; label: string }[] = [
    { value: null, label: 'Any status' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'INCORRECT', label: 'Incorrect' },
    { value: 'PARTIAL', label: 'Partial' },
    { value: 'PENDING', label: 'Pending' },
];

export default function LedgerFilters({ filters, sectors, rows }: LedgerFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();

    const navigate = (patch: Partial<LedgerFilters>) => {
        // Shallow routing keeps scroll position and avoids a server round-trip
        // for the filter chip itself (the list is re-rendered from state below).
        const query = buildLedgerQuery({ ...filters, ...patch });
        window.history.pushState(null, '', `${pathname}${query}`);
        router.refresh();
    };

    const csvHref = useMemo(() => {
        const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' });
        return URL.createObjectURL(blob);
    }, [rows]);

    const chip = (active: boolean) =>
        `rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${active
            ? 'border-teal-500/40 bg-teal-500/15 text-teal-300'
            : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white'
        }`;

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">Window</span>
                {WINDOW_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => navigate({ window: option.value })}
                        className={chip(filters.window === option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="sr-only">Sector</span>
                    <select
                        value={filters.sector ?? ''}
                        onChange={(event) => navigate({ sector: event.target.value || null })}
                        className="rounded-lg border border-white/10 bg-[#0f1c2d] px-3 py-2 text-xs font-semibold text-slate-200 outline-none focus:border-teal-500/50"
                    >
                        <option value="">All sectors</option>
                        {sectors.map((sector) => (
                            <option key={sector} value={sector}>
                                {sector}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="sr-only">Status</span>
                    <select
                        value={filters.status ?? ''}
                        onChange={(event) =>
                            navigate({ status: (event.target.value as PredictionStatus) || null })
                        }
                        className="rounded-lg border border-white/10 bg-[#0f1c2d] px-3 py-2 text-xs font-semibold text-slate-200 outline-none focus:border-teal-500/50"
                    >
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option.label} value={option.value ?? ''}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>

                <a
                    href={csvHref}
                    download="kunwar-prediction-ledger.csv"
                    className="rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-2 text-xs font-semibold text-teal-300 transition-colors hover:bg-teal-500/20"
                >
                    ⬇ Export CSV
                </a>
            </div>
        </div>
    );
}
