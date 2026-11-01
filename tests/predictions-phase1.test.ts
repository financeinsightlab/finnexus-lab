import { describe, it, expect } from 'vitest';
import {
  buildCalibration,
  countByStatus,
  streaks,
  sectorBreakdown,
  toJsonLdDataset,
  type LedgerPrediction,
} from '@/lib/calibration';
import {
  parseLedgerFilters,
  filterLedger,
  toCsv,
} from '@/app/(dashboard)/predictions/ledger/ledger-utils';
import { toPublicPredictionAuthor } from '@/lib/public-prediction-author';

describe('Phase 1: Prediction System and Ledger Resilience', () => {
  // Test 1 & 2: Anonymous and Authenticated Visitor Access / Author Privacy
  it('handles public author privacy for anonymous and authenticated viewers', () => {
    // Private profile
    const privateAuthor = toPublicPredictionAuthor({
      id: 'usr_1',
      name: 'Secret Analyst',
      role: 'ANALYST',
      customBadge: 'PRO',
      profile: { isPublic: false },
    });
    expect(privateAuthor.id).toBe('private');
    expect(privateAuthor.name).toBe('Private analyst');
    expect(privateAuthor.customBadge).toBeNull();

    // Public profile
    const publicAuthor = toPublicPredictionAuthor({
      id: 'usr_2',
      name: 'Open Analyst',
      role: 'ADMIN',
      customBadge: 'LEAD',
      profile: { isPublic: true },
    });
    expect(publicAuthor.id).toBe('usr_2');
    expect(publicAuthor.name).toBe('Open Analyst');
    expect(publicAuthor.customBadge).toBe('LEAD');

    // Null/undefined author safety
    const nullAuthor = toPublicPredictionAuthor(null);
    expect(nullAuthor.id).toBe('private');
    expect(nullAuthor.name).toBe('Private analyst');
  });

  // Test 3: Empty prediction database
  it('handles empty prediction sets cleanly without throwing or NaN', () => {
    const empty: LedgerPrediction[] = [];
    const stats = buildCalibration(empty);

    expect(stats.total).toBe(0);
    expect(stats.confirmed).toBe(0);
    expect(stats.incorrect).toBe(0);
    expect(stats.pending).toBe(0);
    expect(stats.resolved).toBe(0);
    expect(stats.overdue).toBe(0);
    expect(stats.weightedAccuracy).toBe(0);
    expect(stats.hitRate).toBeNull();
    expect(stats.longestStreak).toBe(0);
    expect(stats.currentStreak).toBe(0);
    expect(stats.distinctSectors).toBe(0);
    expect(stats.earliestResolve).toBeNull();
    expect(stats.latestResolve).toBeNull();

    const breakdown = sectorBreakdown(empty);
    expect(breakdown).toEqual([]);

    const csv = toCsv(empty);
    expect(csv).toContain('slug,sector,status,resolveDate,claim,resolutionNote');

    const jsonLd = toJsonLdDataset(empty, stats);
    expect(jsonLd['@type']).toBe('Dataset');
    expect(jsonLd.distribution).toEqual([]);
  });

  // Test 4: Database containing pending and overdue predictions
  it('correctly tallies pending and overdue predictions', () => {
    const asOf = new Date('2026-06-01T00:00:00Z');
    const predictions: LedgerPrediction[] = [
      {
        slug: 'p-future',
        claim: 'NIFTY will cross 26000',
        sector: 'Equities',
        resolveDate: new Date('2026-12-01T00:00:00Z'),
        status: 'PENDING',
      },
      {
        slug: 'p-overdue',
        claim: 'RBI will cut repo rate by 25bps',
        sector: 'Macro',
        resolveDate: new Date('2026-05-01T00:00:00Z'),
        status: 'PENDING',
      },
    ];

    const stats = buildCalibration(predictions, asOf);
    expect(stats.total).toBe(2);
    expect(stats.pending).toBe(2);
    expect(stats.overdue).toBe(1);
    expect(stats.resolved).toBe(0);
    expect(stats.weightedAccuracy).toBe(0);
  });

  // Test 5: Database containing resolved predictions with streaks
  it('computes weighted accuracy and streaks for resolved calls', () => {
    const predictions: LedgerPrediction[] = [
      {
        slug: 'p-1',
        claim: 'Claim 1',
        sector: 'Tech',
        resolveDate: new Date('2026-01-10T00:00:00Z'),
        status: 'CONFIRMED',
      },
      {
        slug: 'p-2',
        claim: 'Claim 2',
        sector: 'Tech',
        resolveDate: new Date('2026-01-20T00:00:00Z'),
        status: 'CONFIRMED',
      },
      {
        slug: 'p-3',
        claim: 'Claim 3',
        sector: 'Finance',
        resolveDate: new Date('2026-02-01T00:00:00Z'),
        status: 'PARTIAL', // 0.5
      },
      {
        slug: 'p-4',
        claim: 'Claim 4',
        sector: 'Finance',
        resolveDate: new Date('2026-02-15T00:00:00Z'),
        status: 'INCORRECT', // 0
      },
    ];

    const stats = buildCalibration(predictions);
    expect(stats.total).toBe(4);
    expect(stats.resolved).toBe(4);
    expect(stats.confirmed).toBe(2);
    expect(stats.partial).toBe(1);
    expect(stats.incorrect).toBe(1);
    // (1 + 1 + 0.5 + 0) / 4 = 2.5 / 4 = 62.5%
    expect(stats.weightedAccuracy).toBe(62.5);
    // hitRate = 2 / 4 = 50%
    expect(stats.hitRate).toBe(50);
    expect(stats.longestStreak).toBe(2);
    expect(stats.currentStreak).toBe(0);
  });

  // Test 6 & 7: Missing/nullable fields, invalid dates, and malformed filter parameters
  it('resiliently handles invalid dates and malformed filters without crashing', () => {
    const malformedParams = {
      sector: ['All', 'Unknown'],
      status: 'NOT_A_REAL_STATUS',
      window: 'invalid_window_value',
    };
    const parsed = parseLedgerFilters(malformedParams);
    expect(parsed.sector).toBeNull();
    expect(parsed.status).toBeNull();
    expect(parsed.window).toBe('all');

    const edgePredictions: LedgerPrediction[] = [
      {
        slug: 'edge-1',
        claim: 'Invalid date prediction',
        sector: '',
        resolveDate: 'not-a-valid-date' as any,
        status: 'PENDING',
      },
      {
        slug: 'edge-2',
        claim: 'Null date prediction',
        sector: 'General',
        resolveDate: null as any,
        status: 'CONFIRMED',
      },
    ];

    const stats = buildCalibration(edgePredictions);
    expect(stats.total).toBe(2);
    expect(stats.confirmed).toBe(1);

    // CSV generation with invalid date must not crash
    const csv = toCsv(edgePredictions);
    expect(csv).toContain('edge-1');
    expect(csv).toContain('edge-2');

    // JSON-LD generation with invalid date must not crash
    const jsonLd = toJsonLdDataset(edgePredictions, stats);
    expect(jsonLd.name).toBe('Kunwar Analytics Public Prediction Ledger');
  });

  // Test 8: Sector and status filters
  it('filters ledger rows accurately by sector, status, and window', () => {
    const dataset: LedgerPrediction[] = [
      { slug: '1', claim: 'A', sector: 'Fintech', status: 'CONFIRMED', resolveDate: new Date() },
      { slug: '2', claim: 'B', sector: 'Fintech', status: 'PENDING', resolveDate: new Date() },
      { slug: '3', claim: 'C', sector: 'EV', status: 'INCORRECT', resolveDate: new Date() },
    ];

    const fintechOnly = filterLedger(dataset, { sector: 'Fintech', status: null, window: 'all' });
    expect(fintechOnly.map((p) => p.slug)).toEqual(['1', '2']);

    const resolvedOnly = filterLedger(dataset, { sector: null, status: null, window: 'resolved' });
    expect(resolvedOnly.map((p) => p.slug)).toEqual(['1', '3']);

    const openOnly = filterLedger(dataset, { sector: null, status: null, window: 'open' });
    expect(openOnly.map((p) => p.slug)).toEqual(['2']);
  });

  // Test 9: CSV export formatting
  it('escapes special characters properly in CSV export according to RFC-4180', () => {
    const predictions: LedgerPrediction[] = [
      {
        slug: 'csv-1',
        claim: 'Claim with, comma and "quotes" and \n newline',
        sector: 'Fintech',
        status: 'CONFIRMED',
        resolveDate: new Date('2026-03-15T00:00:00Z'),
        resolutionNote: 'Note with "quotes"',
      },
    ];

    const csv = toCsv(predictions);
    expect(csv).toContain('"Claim with, comma and ""quotes"" and \n newline"');
    expect(csv).toContain('"Note with ""quotes"""');
    expect(csv).toContain('2026-03-15');
  });

  // Test 10: JSON-LD generation
  it('generates valid Schema.org Dataset structure for search and GEO engines', () => {
    const dataset: LedgerPrediction[] = [
      {
        slug: 'p-jsonld',
        claim: 'Forecasting GDP Growth',
        sector: 'Macro',
        status: 'CONFIRMED',
        resolveDate: new Date('2026-01-01T00:00:00Z'),
      },
    ];
    const stats = buildCalibration(dataset);
    const jsonLd = toJsonLdDataset(dataset, stats);

    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('Dataset');
    expect(jsonLd.url).toBe('https://kunwaranalytics.in/predictions/ledger');
    expect(jsonLd.variableMeasured).toEqual(
      expect.arrayContaining([
        { '@type': 'PropertyValue', name: 'Total predictions', value: 1 },
        { '@type': 'PropertyValue', name: 'Resolved predictions', value: 1 },
        { '@type': 'PropertyValue', name: 'Weighted accuracy (%)', value: 100 },
        { '@type': 'PropertyValue', name: 'Hit rate (% confirmed / resolved)', value: 100 },
      ]),
    );
  });
});

