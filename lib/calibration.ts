// lib/calibration.ts — Public Prediction Ledger mathematics
//
// Pure, dependency-free functions that turn a set of predictions into the
// trust metrics shown on the public ledger. Kept pure (no Prisma / no env) so
// they are trivially unit-testable and so the same numbers can be produced by
// a route handler, a server component, or an export job.
//
// Scoring conventions (documented deliberately — a "track record" is only a
// trust asset if the method is public and stable):
//   • CONFIRMED → outcome 1
//   • PARTIAL   → outcome 0.5 (a prediction that directionally landed)
//   • INCORRECT → outcome 0
//   • PENDING   → excluded from every rate until it resolves
//
//   weightedAccuracy = mean(outcome) * 100
//   Brier score      = mean((outcome - 1)^2)   (lower is better, 0 = perfect)
//
// The Brier score intentionally grades confidence honestly: because every
// published prediction is a directional call we treat the forecast probability
// as 1.0, so the penalty for a miss is the full 1.0.

import type { PredictionStatus } from '@prisma/client';

/** Minimal prediction shape the calibration maths needs. */
export interface LedgerPrediction {
    slug: string;
    claim: string;
    sector: string;
    resolveDate: Date | string;
    status: PredictionStatus;
    resolutionNote?: string | null;
}

export interface StatusCounts {
    total: number;
    confirmed: number;
    incorrect: number;
    partial: number;
    pending: number;
    /** Predictions with a final verdict (CONFIRMED | INCORRECT | PARTIAL). */
    resolved: number;
    /** Still PENDING but past its resolve date — a transparency red flag. */
    overdue: number;
}

export interface CalibrationStats extends StatusCounts {
    /** mean(outcome) * 100, rounded to one decimal. Higher is better. */
    weightedAccuracy: number;
    /** Brier score in [0, 1] where 0 is perfect. Lower is better. */
    brierScore: number;
    /** Longest run of consecutive CONFIRMED results, by resolve date. */
    longestStreak: number;
    /** Length of the currently open CONFIRMED streak. */
    currentStreak: number;
    /** Number of distinct sectors represented. */
    distinctSectors: number;
    /** Earliest / latest resolve dates in the set (null when empty). */
    earliestResolve: Date | null;
    latestResolve: Date | null;
    /** The instant the ledger was computed — surfaced as "as of". */
    asOf: Date;
}

export interface SectorBreakdown {
    sector: string;
    total: number;
    resolved: number;
    confirmed: number;
    incorrect: number;
    partial: number;
    /** weightedAccuracy for the sector, or null when nothing has resolved. */
    weightedAccuracy: number | null;
}

/** Coerce a stored date (Date | ISO string) into a Date. */
function toDate(value: Date | string): Date {
    return value instanceof Date ? value : new Date(value);
}

/** Outcome in [0, 1] for a resolved prediction; null while PENDING. */
export function outcomeOf(status: PredictionStatus): number | null {
    switch (status) {
        case 'CONFIRMED':
            return 1;
        case 'PARTIAL':
            return 0.5;
        case 'INCORRECT':
            return 0;
        default:
            return null;
    }
}

function round(value: number, decimals: number): number {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
}

/** Tally predictions by status. `asOf` drives the overdue count. */
export function countByStatus(
    predictions: readonly LedgerPrediction[],
    asOf: Date = new Date(),
): StatusCounts {
    let confirmed = 0;
    let incorrect = 0;
    let partial = 0;
    let pending = 0;
    let overdue = 0;

    for (const prediction of predictions) {
        switch (prediction.status) {
            case 'CONFIRMED':
                confirmed += 1;
                break;
            case 'INCORRECT':
                incorrect += 1;
                break;
            case 'PARTIAL':
                partial += 1;
                break;
            default: {
                pending += 1;
                if (toDate(prediction.resolveDate).getTime() < asOf.getTime()) overdue += 1;
            }
        }
    }

    return {
        total: predictions.length,
        confirmed,
        incorrect,
        partial,
        pending,
        resolved: confirmed + incorrect + partial,
        overdue,
    };
}

/** Mean squared error against the binary-style outcomes. 0 is perfect. */
export function brierScore(
    predictions: readonly LedgerPrediction[],
): number {
    const outcomes = predictions
        .map((prediction) => outcomeOf(prediction.status))
        .filter((value): value is number => value !== null);

    if (outcomes.length === 0) return 0;

    const sum = outcomes.reduce((acc, outcome) => acc + (outcome - 1) ** 2, 0);
    return round(sum / outcomes.length, 3);
}

/** Longest and currently-open runs of CONFIRMED results (ordered by resolve date). */
export function streaks(
    predictions: readonly LedgerPrediction[],
    asOf: Date = new Date(),
): { longest: number; current: number } {
    const resolved = predictions
        .filter((prediction) => prediction.status !== 'PENDING')
        .slice()
        .sort(
            (a, b) => toDate(a.resolveDate).getTime() - toDate(b.resolveDate).getTime(),
        );

    let longest = 0;
    let current = 0;
    for (const prediction of resolved) {
        if (prediction.status === 'CONFIRMED') {
            current += 1;
            longest = Math.max(longest, current);
        } else {
            current = 0;
        }
    }

    void asOf;
    return { longest, current };
}

/** Per-sector hit rates, ordered by volume then accuracy. */
export function sectorBreakdown(
    predictions: readonly LedgerPrediction[],
    asOf: Date = new Date(),
): SectorBreakdown[] {
    const bySector = new Map<string, LedgerPrediction[]>();
    for (const prediction of predictions) {
        const bucket = bySector.get(prediction.sector) ?? [];
        bucket.push(prediction);
        bySector.set(prediction.sector, bucket);
    }

    return [...bySector.entries()]
        .map(([sector, bucket]) => {
            const counts = countByStatus(bucket, asOf);
            const outcomes = bucket
                .map((prediction) => outcomeOf(prediction.status))
                .filter((value): value is number => value !== null);
            const weightedAccuracy = outcomes.length
                ? round((outcomes.reduce((acc, value) => acc + value, 0) / outcomes.length) * 100, 1)
                : null;
            return {
                sector,
                total: counts.total,
                resolved: counts.resolved,
                confirmed: counts.confirmed,
                incorrect: counts.incorrect,
                partial: counts.partial,
                weightedAccuracy,
            };
        })
        .sort((a, b) => b.total - a.total || (b.weightedAccuracy ?? -1) - (a.weightedAccuracy ?? -1));
}

/** The full ledger: status counts + derived trust metrics. */
export function buildCalibration(
    predictions: readonly LedgerPrediction[],
    asOf: Date = new Date(),
): CalibrationStats {
    const counts = countByStatus(predictions, asOf);
    const outcomes = predictions
        .map((prediction) => outcomeOf(prediction.status))
        .filter((value): value is number => value !== null);

    const weightedAccuracy = outcomes.length
        ? round((outcomes.reduce((acc, value) => acc + value, 0) / outcomes.length) * 100, 1)
        : 0;

    const resolveTimes = predictions
        .map((prediction) => toDate(prediction.resolveDate).getTime())
        .filter((time) => Number.isFinite(time));

    const { longest, current } = streaks(predictions, asOf);

    return {
        ...counts,
        weightedAccuracy,
        brierScore: brierScore(predictions),
        longestStreak: longest,
        currentStreak: current,
        distinctSectors: new Set(predictions.map((prediction) => prediction.sector)).size,
        earliestResolve: resolveTimes.length ? new Date(Math.min(...resolveTimes)) : null,
        latestResolve: resolveTimes.length ? new Date(Math.max(...resolveTimes)) : null,
        asOf,
    };
}

/**
 * schema.org `Dataset` descriptor for the ledger — machine-readable provenance
 * for search engines and AI answer engines (GEO-native).
 */
export function toJsonLdDataset(
    predictions: readonly LedgerPrediction[],
    stats: CalibrationStats,
    baseUrl = 'https://kunwaranalytics.in',
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'Kunwar Analytics Public Prediction Ledger',
        description:
            'A timestamped, publicly resolved ledger of every prediction made by Kunwar Analytics analysts, including calibration metrics (weighted accuracy, Brier score, streaks).',
        url: `${baseUrl}/predictions/ledger`,
        creator: {
            '@type': 'Organization',
            name: 'Kunwar Analytics',
            url: baseUrl,
        },
        license: `${baseUrl}/terms`,
        isAccessibleForFree: true,
        keywords: [
            'prediction ledger',
            'analyst calibration',
            'forecast accuracy',
            'Brier score',
            'financial predictions',
        ],
        temporalCoverage: stats.earliestResolve
            ? `${stats.earliestResolve.toISOString().slice(0, 10)}/${(
                stats.latestResolve ?? stats.earliestResolve
            )
                .toISOString()
                .slice(0, 10)}`
            : undefined,
        variableMeasured: [
            { '@type': 'PropertyValue', name: 'Total predictions', value: stats.total },
            { '@type': 'PropertyValue', name: 'Resolved predictions', value: stats.resolved },
            { '@type': 'PropertyValue', name: 'Weighted accuracy (%)', value: stats.weightedAccuracy },
            { '@type': 'PropertyValue', name: 'Brier score', value: stats.brierScore },
            { '@type': 'PropertyValue', name: 'Longest win streak', value: stats.longestStreak },
        ],
        dateModified: stats.asOf.toISOString(),
        distribution: predictions.map((prediction) => ({
            '@type': 'DataDownload',
            name: prediction.claim,
            contentUrl: `${baseUrl}/predictions/ledger#${prediction.slug}`,
        })),
    };
}
