import { describe, expect, it } from 'vitest';
import { buildLedgerQuery, filterLedger, parseLedgerFilters, toCsv } from './ledger-utils';
import type { LedgerPrediction } from '@/lib/calibration';

function p(
    status: LedgerPrediction['status'],
    overrides: Partial<LedgerPrediction> = {},
): LedgerPrediction {
    return {
        slug: 'slug',
        claim: 'A claim',
        sector: 'Fintech',
        resolveDate: '2026-01-01T00:00:00.000Z',
        status,
        ...overrides,
    };
}

describe('parseLedgerFilters', () => {
    it('defaults to no filtering', () => {
        expect(parseLedgerFilters({})).toEqual({ sector: null, status: null, window: 'all' });
    });

    it('normalises case, arrays and the literal "All" sentinel', () => {
        expect(parseLedgerFilters({ status: 'confirmed', window: 'OPEN', sector: 'All' })).toEqual({
            sector: null,
            status: 'CONFIRMED',
            window: 'open',
        });
    });

    it('rejects unknown values', () => {
        expect(parseLedgerFilters({ status: 'NOPE', window: 'nope' })).toEqual({
            sector: null,
            status: null,
            window: 'all',
        });
    });
});

describe('filterLedger', () => {
    const rows = [
        p('CONFIRMED', { sector: 'Fintech' }),
        p('PENDING', { sector: 'EV' }),
        p('INCORRECT', { sector: 'Fintech' }),
    ];

    it('filters by sector, status and window', () => {
        expect(filterLedger(rows, { sector: 'Fintech', status: null, window: 'all' })).toHaveLength(2);
        expect(filterLedger(rows, { sector: null, status: 'PENDING', window: 'all' })).toHaveLength(1);
        expect(filterLedger(rows, { sector: null, status: null, window: 'open' })).toHaveLength(1);
        expect(filterLedger(rows, { sector: null, status: null, window: 'resolved' })).toHaveLength(2);
    });
});

describe('buildLedgerQuery', () => {
    it('omits defaults and encodes selections', () => {
        expect(buildLedgerQuery({})).toBe('');
        expect(buildLedgerQuery({ sector: 'Fintech', window: 'open' })).toBe('?sector=Fintech&window=open');
    });
});

describe('toCsv', () => {
    it('escapes quotes, commas and newlines', () => {
        const csv = toCsv([p('CONFIRMED', { claim: 'Rates, "cut" soon\nmaybe' })]);
        const lines = csv.split('\r\n');
        expect(lines[0]).toBe('slug,sector,status,resolveDate,claim,resolutionNote');
        expect(lines[1]).toContain('"Rates, ""cut"" soon');
    });
});
