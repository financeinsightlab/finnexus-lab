import { describe, expect, it } from 'vitest';
import {
    buildProvenance,
    fetchJson,
    frankfurterUrl,
    parseFrankfurterLatest,
    parseWorldBankLatest,
    worldBankUrl,
    type WorldBankRow,
} from './live-data';

describe('parseFrankfurterLatest', () => {
    it('returns the latest date\'s rate per currency with provenance', () => {
        const points = parseFrankfurterLatest({
            base: 'USD',
            start_date: '2026-01-01',
            end_date: '2026-01-02',
            rates: {
                '2026-01-01': { INR: 85.1, EUR: 0.92 },
                '2026-01-02': { INR: 85.4, EUR: 0.93 },
            },
        });
        expect(points).toHaveLength(2);
        const inr = points.find((p) => p.key === 'fx:usd-inr');
        expect(inr?.value).toBe(85.4);
        expect(inr?.asOf).toBe('2026-01-02');
        expect(inr?.source).toContain('Frankfurter');
    });

    it('returns an empty list for empty rates', () => {
        expect(parseFrankfurterLatest({ base: 'USD', start_date: '', end_date: '', rates: {} })).toEqual([]);
    });
});

describe('parseWorldBankLatest', () => {
    const rows: WorldBankRow[] = [
        {
            indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP' },
            country: { id: 'IN', value: 'India' },
            countryiso3code: 'IND',
            date: '2023',
            value: 3.5e12,
        },
        {
            indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP' },
            country: { id: 'IN', value: 'India' },
            countryiso3code: 'IND',
            date: '2024',
            value: 3.9e12,
        },
        {
            indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP' },
            country: { id: 'IN', value: 'India' },
            countryiso3code: 'IND',
            date: '2025',
            value: null,
        },
    ];

    it('keeps the newest non-null value per country+indicator', () => {
        const points = parseWorldBankLatest(rows);
        expect(points).toHaveLength(1);
        expect(points[0].value).toBe(3.9e12);
        expect(points[0].asOf).toBe('2024-01-01');
        expect(points[0].license).toBe('CC BY 4.0');
    });
});

describe('buildProvenance', () => {
    it('computes age in whole days', () => {
        const prov = buildProvenance(
            {
                key: 'fx:usd-inr',
                label: 'USD/INR',
                value: 85,
                unit: 'INR',
                asOf: '2026-01-01',
                source: 'Frankfurter',
                sourceUrl: 'https://frankfurter.dev',
                license: 'ECB',
            },
            new Date('2026-01-11T00:00:00Z'),
        );
        expect(prov.ageDays).toBe(10);
    });
});

describe('fetchJson', () => {
    it('returns parsed JSON on success', async () => {
        const fake = (async () => ({ ok: true, json: async () => ({ hello: 'world' }) })) as unknown as typeof fetch;
        const data = await fetchJson<{ hello: string }>('https://example.test', { fetchImpl: fake });
        expect(data).toEqual({ hello: 'world' });
    });

    it('returns null on a non-ok response and on a thrown error', async () => {
        const notOk = (async () => ({ ok: false })) as unknown as typeof fetch;
        expect(await fetchJson('https://x.test', { fetchImpl: notOk })).toBeNull();
        const boom = (async () => { throw new Error('network'); }) as unknown as typeof fetch;
        expect(await fetchJson('https://x.test', { fetchImpl: boom })).toBeNull();
    });
});

describe('url builders', () => {
    it('builds encoded provider URLs', () => {
        expect(frankfurterUrl('USD', ['INR', 'EUR'])).toContain('base=USD&symbols=INR%2CEUR');
        expect(worldBankUrl('IN', 'NY.GDP.MKTP.CD')).toContain('/country/IN/indicator/NY.GDP.MKTP.CD');
    });
});
