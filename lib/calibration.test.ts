import { describe, expect, it } from 'vitest';
import {
    buildCalibration,
    countByStatus,
    outcomeOf,
    sectorBreakdown,
    streaks,
    toJsonLdDataset,
    type LedgerPrediction,
} from './calibration';

const AS_OF = new Date('2026-06-01T00:00:00.000Z');

function prediction(
    status: LedgerPrediction['status'],
    overrides: Partial<LedgerPrediction> = {},
): LedgerPrediction {
    return {
        slug: `p-${Math.random().toString(36).slice(2, 8)}`,
        claim: 'A claim',
        sector: 'Fintech',
        resolveDate: '2026-01-01T00:00:00.000Z',
        status,
        ...overrides,
    };
}

describe('outcomeOf', () => {
    it('maps resolved statuses to their outcome and PENDING to null', () => {
        expect(outcomeOf('CONFIRMED')).toBe(1);
        expect(outcomeOf('PARTIAL')).toBe(0.5);
        expect(outcomeOf('INCORRECT')).toBe(0);
        expect(outcomeOf('PENDING')).toBeNull();
    });
});

describe('countByStatus', () => {
    it('tallies each status and marks overdue pending predictions', () => {
        const counts = countByStatus(
            [
                prediction('CONFIRMED'),
                prediction('INCORRECT'),
                prediction('PARTIAL'),
                prediction('PENDING', { resolveDate: '2025-01-01T00:00:00.000Z' }),
                prediction('PENDING', { resolveDate: '2027-01-01T00:00:00.000Z' }),
            ],
            AS_OF,
        );

        expect(counts).toMatchObject({
            total: 5,
            confirmed: 1,
            incorrect: 1,
            partial: 1,
            pending: 2,
            resolved: 3,
            overdue: 1,
        });
    });
});

describe('streaks', () => {
    it('finds the longest and current runs of confirmed results', () => {
        const result = streaks(
            [
                prediction('CONFIRMED', { resolveDate: '2026-01-01T00:00:00.000Z' }),
                prediction('CONFIRMED', { resolveDate: '2026-02-01T00:00:00.000Z' }),
                prediction('INCORRECT', { resolveDate: '2026-03-01T00:00:00.000Z' }),
                prediction('CONFIRMED', { resolveDate: '2026-04-01T00:00:00.000Z' }),
                prediction('CONFIRMED', { resolveDate: '2026-05-01T00:00:00.000Z' }),
                prediction('PENDING', { resolveDate: '2026-07-01T00:00:00.000Z' }),
            ],
            AS_OF,
        );

        expect(result.longest).toBe(2);
        expect(result.current).toBe(2);
    });
});

describe('buildCalibration', () => {
    it('combines counts, accuracy and derived metrics', () => {
        const stats = buildCalibration(
            [
                prediction('CONFIRMED', { sector: 'Fintech' }),
                prediction('PARTIAL', { sector: 'Fintech' }),
                prediction('INCORRECT', { sector: 'EV' }),
                prediction('PENDING', { sector: 'EV', resolveDate: '2027-01-01T00:00:00.000Z' }),
            ],
            AS_OF,
        );

        expect(stats.total).toBe(4);
        expect(stats.resolved).toBe(3);
        // (1 + 0.5 + 0) / 3 * 100 = 50
        expect(stats.weightedAccuracy).toBe(50);
        // Strict hit rate is 1 confirmed out of 3 resolved predictions.
        expect(stats.hitRate).toBe(33.3);
        expect(stats.distinctSectors).toBe(2);
        expect(stats.earliestResolve?.toISOString()).toBe('2026-01-01T00:00:00.000Z');
    });

    it('reports zeroed metrics for an empty ledger', () => {
        const stats = buildCalibration([], AS_OF);
        expect(stats.total).toBe(0);
        expect(stats.weightedAccuracy).toBe(0);
        expect(stats.hitRate).toBeNull();
        expect(stats.earliestResolve).toBeNull();
    });
});

describe('sectorBreakdown', () => {
    it('groups by sector and orders by volume', () => {
        const rows = sectorBreakdown(
            [
                prediction('CONFIRMED', { sector: 'Fintech' }),
                prediction('CONFIRMED', { sector: 'Fintech' }),
                prediction('INCORRECT', { sector: 'EV' }),
            ],
            AS_OF,
        );

        expect(rows[0]).toMatchObject({ sector: 'Fintech', total: 2, weightedAccuracy: 100 });
        expect(rows[1]).toMatchObject({ sector: 'EV', total: 1, weightedAccuracy: 0 });
    });
});

describe('toJsonLdDataset', () => {
    it('emits a schema.org Dataset with the key metrics', () => {
        const predictions = [prediction('CONFIRMED')];
        const stats = buildCalibration(predictions, AS_OF);
        const jsonLd = toJsonLdDataset(predictions, stats);

        expect(jsonLd['@type']).toBe('Dataset');
        expect(jsonLd.url).toBe('https://kunwaranalytics.in/predictions/ledger');
        expect(jsonLd.variableMeasured).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: 'Weighted accuracy (%)', value: 100 }),
            ]),
        );
    });
});
