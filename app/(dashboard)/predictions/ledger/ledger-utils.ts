// app/(dashboard)/predictions/ledger/ledger-utils.ts
//
// Pure helpers behind the public Prediction Ledger. Kept free of React and
// Prisma so both the server page (initial render) and the client filter bar can
// share one definition of "what the filters mean" — and so this logic is unit
// tested rather than reimplemented in two places.

import type { PredictionStatus } from '@prisma/client';
import type { LedgerPrediction } from '@/lib/calibration';

export const LEDGER_STATUSES = ['CONFIRMED', 'INCORRECT', 'PARTIAL', 'PENDING'] as const;

export type LedgerWindow = 'all' | 'open' | 'resolved';

export interface LedgerFilters {
    sector: string | null;
    status: PredictionStatus | null;
    window: LedgerWindow;
}

export const DEFAULT_FILTERS: LedgerFilters = { sector: null, status: null, window: 'all' };

const WINDOWS: readonly LedgerWindow[] = ['all', 'open', 'resolved'];

/** Parse the three query params into a validated filter object. */
export function parseLedgerFilters(params: {
    sector?: string | string[] | null;
    status?: string | string[] | null;
    window?: string | string[] | null;
}): LedgerFilters {
    const first = (value: string | string[] | null | undefined): string | null => {
        if (Array.isArray(value)) return value[0] ?? null;
        return value ?? null;
    };

    const statusRaw = first(params.status);
    const status =
        statusRaw && (LEDGER_STATUSES as readonly string[]).includes(statusRaw.toUpperCase())
            ? (statusRaw.toUpperCase() as PredictionStatus)
            : null;

    const windowRaw = first(params.window);
    const window =
        windowRaw && (WINDOWS as readonly string[]).includes(windowRaw as LedgerWindow)
            ? (windowRaw as LedgerWindow)
            : 'all';

    const sector = first(params.sector);

    return { sector: sector && sector !== 'All' ? sector : null, status, window };
}

/** Apply the filter set to a prediction list. */
export function filterLedger(
    predictions: readonly LedgerPrediction[],
    filters: LedgerFilters,
): LedgerPrediction[] {
    return predictions.filter((prediction) => {
        if (filters.sector && prediction.sector !== filters.sector) return false;
        if (filters.status && prediction.status !== filters.status) return false;
        if (filters.window === 'open' && prediction.status !== 'PENDING') return false;
        if (filters.window === 'resolved' && prediction.status === 'PENDING') return false;
        return true;
    });
}

/**
 * Serialise a filter selection into a query string, dropping defaults so the
 * canonical (unfiltered) ledger keeps a clean, cacheable URL.
 */
export function buildLedgerQuery(patch: Partial<LedgerFilters>): string {
    const merged: LedgerFilters = { ...DEFAULT_FILTERS, ...patch };
    const params = new URLSearchParams();
    if (merged.sector) params.set('sector', merged.sector);
    if (merged.status) params.set('status', merged.status);
    if (merged.window !== 'all') params.set('window', merged.window);
    const query = params.toString();
    return query ? `?${query}` : '';
}

/** RFC-4180 field escaping. */
function csvField(value: string): string {
    return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** Render the ledger as a download-ready CSV. */
export function toCsv(predictions: readonly LedgerPrediction[]): string {
    const header = ['slug', 'sector', 'status', 'resolveDate', 'claim', 'resolutionNote'];
    const rows = predictions.map((prediction) => [
        prediction.slug,
        prediction.sector,
        prediction.status,
        new Date(prediction.resolveDate).toISOString().slice(0, 10),
        prediction.claim,
        prediction.resolutionNote ?? '',
    ]);
    return [header, ...rows].map((row) => row.map((field) => csvField(String(field))).join(',')).join('\r\n');
}
