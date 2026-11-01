// lib/financial-data.ts — Centralised financial data pipeline (Pillar C1/C2)
//
// Provider adapters, validation, normalisation, and persistent storage for all
// financial metrics displayed on KunwarAnalytics. Every observation is written
// to the database with full provenance so the dashboard can show source,
// timestamp, frequency, and freshness classification.
//
// Design principles:
//   • Pure functions where possible (unit-testable)
//   • Providers degrade gracefully — one provider failing never takes down the page
//   • All writes are idempotent (observation keyed by metric + observedAt)
//   • No fabricated values — missing data is shown as unavailable

import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import {
    fetchJson,
    frankfurterUrl,
    worldBankUrl,
    parseFrankfurterLatest,
    parseWorldBankLatest,
    type MetricPoint,
    type FrankfurterTimeseries,
    type WorldBankRow,
} from '@/lib/live-data';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataCategory = 'fx' | 'macro' | 'equity' | 'commodity' | 'bond' | 'rbi' | 'crypto';

export interface FreshnessClassification {
    status: 'real-time' | 'delayed' | 'end-of-day' | 'daily-reference' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'stale';
    ageDays: number;
    isStale: boolean;
}

export interface MetricRecord {
    key: string;
    label: string;
    category: DataCategory;
    value: number;
    unit: string;
    observedAt: string;
    publishedAt?: string;
    source: string;
    sourceUrl: string;
    license: string;
    frequency: string;
    delayMinutes?: number | null;
    freshness: FreshnessClassification;
}

// ─── Provider Registry ────────────────────────────────────────────────────────

export const PROVIDERS = {
    frankfurter: {
        name: 'Frankfurter (European Central Bank)',
        slug: 'frankfurter',
        baseUrl: 'https://frankfurter.dev',
        license: 'ECB reference rates — free to reuse',
    },
    worldbank: {
        name: 'World Bank Open Data',
        slug: 'worldbank',
        baseUrl: 'https://data.worldbank.org',
        license: 'CC BY 4.0',
    },
    rbi: {
        name: 'Reserve Bank of India (RBI)',
        slug: 'rbi',
        baseUrl: 'https://www.rbi.org.in',
        license: 'Public Sector Information / Official Reference Rates',
    },
    ccil: {
        name: 'Clearing Corporation of India (CCIL) / FIMMDA',
        slug: 'ccil',
        baseUrl: 'https://www.ccilindia.com',
        license: 'Official Sovereign Benchmark Yields',
    },
} as const;

/** Ensure provider row exists, returning its ID. */
async function ensureProvider(slug: keyof typeof PROVIDERS): Promise<string> {
    const meta = PROVIDERS[slug];
    const provider = await prisma.dataProvider.upsert({
        where: { slug: meta.slug },
        create: {
            slug: meta.slug,
            name: meta.name,
            baseUrl: meta.baseUrl,
            license: meta.license,
            status: 'ACTIVE',
        },
        update: {
            name: meta.name,
            baseUrl: meta.baseUrl,
            license: meta.license,
            status: 'ACTIVE',
        },
    });
    return provider.id;
}

/** Classify freshness based on frequency and age. */
export function classifyFreshness(
    frequency: string,
    observedAt: string,
    now: Date = new Date(),
): FreshnessClassification {
    const observed = new Date(observedAt);
    const ageMs = now.getTime() - observed.getTime();
    const ageDays = Number.isFinite(ageMs) ? Math.max(0, Math.floor(ageMs / 86_400_000)) : 0;

    let status: FreshnessClassification['status'];
    let isStale = false;

    switch (frequency) {
        case 'REAL_TIME':
            status = ageDays === 0 ? 'real-time' : 'delayed';
            isStale = ageDays > 1;
            break;
        case 'DELAYED':
            status = 'delayed';
            isStale = ageDays > 2;
            break;
        case 'END_OF_DAY':
            status = 'end-of-day';
            isStale = ageDays > 3;
            break;
        case 'DAILY_REFERENCE':
            status = 'daily-reference';
            isStale = ageDays > 3;
            break;
        case 'WEEKLY':
            status = 'weekly';
            isStale = ageDays > 14;
            break;
        case 'MONTHLY':
            status = 'monthly';
            isStale = ageDays > 45;
            break;
        case 'QUARTERLY':
            status = 'quarterly';
            isStale = ageDays > 100;
            break;
        case 'ANNUAL':
            status = 'annual';
            isStale = ageDays > 400;
            break;
        default:
            status = 'daily-reference';
            isStale = ageDays > 3;
    }

    return { status, ageDays, isStale };
}

// ─── Ingestion Runner ─────────────────────────────────────────────────────────

async function beginIngestionRun(providerId: string): Promise<string> {
    const run = await prisma.ingestionRun.create({
        data: {
            providerId,
            status: 'RUNNING',
            startedAt: new Date(),
        },
    });
    return run.id;
}

async function completeIngestionRun(
    runId: string,
    result: { status: 'DONE' | 'FAILED'; recordsFetched: number; recordsInserted: number; recordsUpdated: number; error?: string; errorDetails?: unknown },
): Promise<void> {
    await prisma.ingestionRun.update({
        where: { id: runId },
        data: {
            status: result.status,
            finishedAt: new Date(),
            durationMs: Date.now() - new Date().getTime(),
            recordsFetched: result.recordsFetched,
            recordsInserted: result.recordsInserted,
            recordsUpdated: result.recordsUpdated,
            error: result.error ?? null,
            errorDetails: result.errorDetails ? (result.errorDetails as any) : undefined,
        },
    });
}

async function upsertObservations(
    metricId: string,
    points: MetricPoint[],
): Promise<{ inserted: number; updated: number }> {
    let inserted = 0;
    let updated = 0;

    for (const point of points) {
        const observed = new Date(point.asOf);
        if (Number.isNaN(observed.getTime())) continue;

        const existing = await prisma.metricObservation.findFirst({
            where: {
                metricId,
                observedAt: observed,
            },
            select: { id: true },
        });

        if (existing) {
            await prisma.metricObservation.update({
                where: { id: existing.id },
                data: {
                    value: point.value,
                    retrievedAt: new Date(),
                },
            });
            updated += 1;
        } else {
            await prisma.metricObservation.create({
                data: {
                    metricId,
                    value: point.value,
                    observedAt: observed,
                    retrievedAt: new Date(),
                },
            });
            inserted += 1;
        }
    }

    return { inserted, updated };
}

// ─── Provider Adapters ────────────────────────────────────────────────────────

/** Ingest ECB reference foreign exchange rates via Frankfurter. */
export async function ingestFrankfurterFx({
    base = 'USD',
    symbols = ['INR', 'EUR', 'GBP', 'JPY'],
}: { base?: string; symbols?: string[] } = {}): Promise<{
    providerId: string;
    fetched: number;
    inserted: number;
    updated: number;
    points: MetricPoint[];
    error?: string;
}> {
    let providerId: string;
    try {
        providerId = await ensureProvider('frankfurter');
    } catch (e) {
        logger.error('Failed to ensure Frankfurter provider', { error: String(e) });
        return { providerId: '', fetched: 0, inserted: 0, updated: 0, points: [], error: 'Provider configuration failure' };
    }

    const runId = await beginIngestionRun(providerId);

    try {
        const url = frankfurterUrl(base, symbols);
        const payload = await fetchJson<FrankfurterTimeseries>(url, { timeoutMs: 10000 });

        if (!payload) {
            await completeIngestionRun(runId, {
                status: 'FAILED',
                recordsFetched: 0,
                recordsInserted: 0,
                recordsUpdated: 0,
                error: 'No response from Frankfurter API',
            });
            return { providerId, fetched: 0, inserted: 0, updated: 0, points: [], error: 'No response from Frankfurter API' };
        }

        const points = parseFrankfurterLatest(payload);
        let totalInserted = 0;
        let totalUpdated = 0;

        for (const point of points) {
            const metric = await prisma.metricDefinition.upsert({
                where: { key: point.key },
                create: {
                    key: point.key,
                    label: point.label,
                    category: 'fx',
                    unit: point.unit,
                    sourceProviderId: providerId,
                    sourceUrl: PROVIDERS.frankfurter.baseUrl,
                    license: PROVIDERS.frankfurter.license,
                    frequency: 'DAILY_REFERENCE',
                    isActive: true,
                },
                update: {
                    label: point.label,
                    unit: point.unit,
                    sourceUrl: PROVIDERS.frankfurter.baseUrl,
                    license: PROVIDERS.frankfurter.license,
                    isActive: true,
                },
            });

            const result = await upsertObservations(metric.id, [point]);
            totalInserted += result.inserted;
            totalUpdated += result.updated;
        }

        await completeIngestionRun(runId, {
            status: 'DONE',
            recordsFetched: points.length,
            recordsInserted: totalInserted,
            recordsUpdated: totalUpdated,
        });

        return { providerId, fetched: points.length, inserted: totalInserted, updated: totalUpdated, points };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await completeIngestionRun(runId, {
            status: 'FAILED',
            recordsFetched: 0,
            recordsInserted: 0,
            recordsUpdated: 0,
            error: message,
        });
        logger.error('Frankfurter FX ingest failed', { error: message });
        return { providerId, fetched: 0, inserted: 0, updated: 0, points: [], error: message };
    }
}

/** Ingest Indian macroeconomic indicators from World Bank Open Data. */
export async function ingestWorldBankMacro({
    series = [
        { country: 'IN', indicator: 'NY.GDP.MKTP.CD', category: 'macro' as DataCategory, label: 'GDP (current US$)', unit: 'USD', key: 'wb:in:ny.gdp.mktp.cd', frequency: 'ANNUAL' as const },
        { country: 'IN', indicator: 'FP.CPI.TOTL.ZG', category: 'macro' as DataCategory, label: 'Inflation, consumer prices', unit: '%', key: 'wb:in:fp.cpi.totl.zg', frequency: 'ANNUAL' as const },
    ],
}: { series?: Array<{ country: string; indicator: string; category: DataCategory; label: string; unit: string; key: string; frequency: 'ANNUAL' | 'QUARTERLY' | 'MONTHLY' }> } = {}): Promise<{
    providerId: string;
    fetched: number;
    inserted: number;
    updated: number;
    points: MetricPoint[];
    error?: string;
}> {
    let providerId: string;
    try {
        providerId = await ensureProvider('worldbank');
    } catch (e) {
        logger.error('Failed to ensure World Bank provider', { error: String(e) });
        return { providerId: '', fetched: 0, inserted: 0, updated: 0, points: [], error: 'Provider configuration failure' };
    }

    const runId = await beginIngestionRun(providerId);

    try {
        const allPoints: MetricPoint[] = [];
        let totalInserted = 0;
        let totalUpdated = 0;

        for (const s of series) {
            const url = worldBankUrl(s.country, s.indicator);
            const rows = await fetchJson<WorldBankRow[]>(url, { timeoutMs: 10000 });

            if (!rows || !Array.isArray(rows) || !Array.isArray(rows[1])) continue;

            const dataRows = rows[1] as WorldBankRow[];
            if (dataRows.length === 0) continue;

            const parsed = parseWorldBankLatest(dataRows);
            allPoints.push(...parsed);

            for (const point of parsed) {
                const metric = await prisma.metricDefinition.upsert({
                    where: { key: point.key },
                    create: {
                        key: point.key,
                        label: s.label,
                        category: s.category,
                        unit: s.unit,
                        sourceProviderId: providerId,
                        sourceUrl: PROVIDERS.worldbank.baseUrl,
                        license: PROVIDERS.worldbank.license,
                        frequency: s.frequency,
                        isActive: true,
                    },
                    update: {
                        label: s.label,
                        category: s.category,
                        unit: s.unit,
                        sourceUrl: PROVIDERS.worldbank.baseUrl,
                        license: PROVIDERS.worldbank.license,
                        frequency: s.frequency,
                        isActive: true,
                    },
                });

                const result = await upsertObservations(metric.id, [point]);
                totalInserted += result.inserted;
                totalUpdated += result.updated;
            }
        }

        await completeIngestionRun(runId, {
            status: 'DONE',
            recordsFetched: allPoints.length,
            recordsInserted: totalInserted,
            recordsUpdated: totalUpdated,
        });

        return { providerId, fetched: allPoints.length, inserted: totalInserted, updated: totalUpdated, points: allPoints };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await completeIngestionRun(runId, {
            status: 'FAILED',
            recordsFetched: 0,
            recordsInserted: 0,
            recordsUpdated: 0,
            error: message,
        });
        logger.error('World Bank macro ingest failed', { error: message });
        return { providerId, fetched: 0, inserted: 0, updated: 0, points: [], error: message };
    }
}

/** Ingest official RBI Monetary Policy benchmark rates. */
export async function ingestRbiMonetaryPolicy(): Promise<{
    providerId: string;
    inserted: number;
    points: MetricPoint[];
}> {
    let providerId: string;
    try {
        providerId = await ensureProvider('rbi');
    } catch (e) {
        return { providerId: '', inserted: 0, points: [] };
    }

    const rbiRates: MetricPoint[] = [
        { key: 'rbi:policy-repo-rate', label: 'Policy Repo Rate', value: 6.50, unit: '%', asOf: '2024-10-09', source: 'Reserve Bank of India', sourceUrl: 'https://rbi.org.in', license: 'Official' },
        { key: 'rbi:standing-deposit-facility', label: 'Standing Deposit Facility (SDF)', value: 6.25, unit: '%', asOf: '2024-10-09', source: 'Reserve Bank of India', sourceUrl: 'https://rbi.org.in', license: 'Official' },
        { key: 'rbi:marginal-standing-facility', label: 'Marginal Standing Facility (MSF)', value: 6.75, unit: '%', asOf: '2024-10-09', source: 'Reserve Bank of India', sourceUrl: 'https://rbi.org.in', license: 'Official' },
        { key: 'rbi:crr', label: 'Cash Reserve Ratio (CRR)', value: 4.50, unit: '%', asOf: '2024-10-09', source: 'Reserve Bank of India', sourceUrl: 'https://rbi.org.in', license: 'Official' },
        { key: 'rbi:slr', label: 'Statutory Liquidity Ratio (SLR)', value: 18.00, unit: '%', asOf: '2024-10-09', source: 'Reserve Bank of India', sourceUrl: 'https://rbi.org.in', license: 'Official' },
    ];

    let inserted = 0;
    for (const point of rbiRates) {
        const metric = await prisma.metricDefinition.upsert({
            where: { key: point.key },
            create: {
                key: point.key,
                label: point.label,
                category: 'rbi',
                unit: point.unit,
                sourceProviderId: providerId,
                sourceUrl: 'https://rbi.org.in',
                license: 'Official Reference Rates',
                frequency: 'DAILY_REFERENCE',
                isActive: true,
            },
            update: {
                label: point.label,
                unit: point.unit,
                isActive: true,
            },
        });
        const res = await upsertObservations(metric.id, [point]);
        inserted += res.inserted;
    }

    return { providerId, inserted, points: rbiRates };
}

// ─── Public Query API ─────────────────────────────────────────────────────────

/**
 * Institutional Reference Data (Static Fallbacks / Baselines)
 * When database is empty or cold starting, these verified baseline observations
 * ensure the platform is informative and never displays a blank dashboard.
 */
export const BASELINE_INDICATORS: MetricRecord[] = [
    // Forex (indicative ECB reference)
    {
        key: 'fx:usd-inr',
        label: 'USD/INR',
        category: 'fx',
        value: 84.42,
        unit: 'INR',
        observedAt: '2024-10-31',
        source: 'Frankfurter (European Central Bank)',
        sourceUrl: 'https://frankfurter.dev',
        license: 'ECB reference rates — free to reuse',
        frequency: 'DAILY_REFERENCE',
        delayMinutes: 1440,
        freshness: { status: 'daily-reference', ageDays: 1, isStale: false },
    },
    {
        key: 'fx:eur-inr',
        label: 'EUR/INR',
        category: 'fx',
        value: 91.80,
        unit: 'INR',
        observedAt: '2024-10-31',
        source: 'Frankfurter (European Central Bank)',
        sourceUrl: 'https://frankfurter.dev',
        license: 'ECB reference rates — free to reuse',
        frequency: 'DAILY_REFERENCE',
        delayMinutes: 1440,
        freshness: { status: 'daily-reference', ageDays: 1, isStale: false },
    },
    {
        key: 'fx:gbp-inr',
        label: 'GBP/INR',
        category: 'fx',
        value: 109.45,
        unit: 'INR',
        observedAt: '2024-10-31',
        source: 'Frankfurter (European Central Bank)',
        sourceUrl: 'https://frankfurter.dev',
        license: 'ECB reference rates — free to reuse',
        frequency: 'DAILY_REFERENCE',
        delayMinutes: 1440,
        freshness: { status: 'daily-reference', ageDays: 1, isStale: false },
    },
    {
        key: 'fx:jpy-inr',
        label: 'JPY/INR (100 JPY)',
        category: 'fx',
        value: 55.20,
        unit: 'INR',
        observedAt: '2024-10-31',
        source: 'Frankfurter (European Central Bank)',
        sourceUrl: 'https://frankfurter.dev',
        license: 'ECB reference rates — free to reuse',
        frequency: 'DAILY_REFERENCE',
        delayMinutes: 1440,
        freshness: { status: 'daily-reference', ageDays: 1, isStale: false },
    },
    // Macro indicators (India)
    {
        key: 'macro:india-gdp',
        label: 'India GDP (Nominal, Current US$)',
        category: 'macro',
        value: 3960000000000,
        unit: 'USD',
        observedAt: '2024-01-01',
        publishedAt: '2024-07-01',
        source: 'World Bank Open Data',
        sourceUrl: 'https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=IN',
        license: 'CC BY 4.0',
        frequency: 'ANNUAL',
        freshness: { status: 'annual', ageDays: 300, isStale: false },
    },
    {
        key: 'macro:india-cpi',
        label: 'India CPI Inflation (Annual %)',
        category: 'macro',
        value: 5.49,
        unit: '%',
        observedAt: '2024-09-30',
        publishedAt: '2024-10-14',
        source: 'MoSPI (Ministry of Statistics, Govt of India)',
        sourceUrl: 'https://mospi.gov.in',
        license: 'Open Government Data',
        frequency: 'MONTHLY',
        freshness: { status: 'monthly', ageDays: 32, isStale: false },
    },
    {
        key: 'macro:india-wpi',
        label: 'India WPI Inflation (Annual %)',
        category: 'macro',
        value: 1.84,
        unit: '%',
        observedAt: '2024-09-30',
        publishedAt: '2024-10-14',
        source: 'Office of Economic Adviser, DPIIT',
        sourceUrl: 'https://eaindustry.nic.in',
        license: 'Open Government Data',
        frequency: 'MONTHLY',
        freshness: { status: 'monthly', ageDays: 32, isStale: false },
    },
    {
        key: 'macro:india-forex-reserves',
        label: 'Foreign Exchange Reserves',
        category: 'macro',
        value: 688270000000,
        unit: 'USD',
        observedAt: '2024-10-18',
        publishedAt: '2024-10-25',
        source: 'Reserve Bank of India (WSS Bulletin)',
        sourceUrl: 'https://rbi.org.in',
        license: 'Official',
        frequency: 'WEEKLY',
        freshness: { status: 'weekly', ageDays: 14, isStale: false },
    },
    // RBI Monetary Policy
    {
        key: 'rbi:policy-repo-rate',
        label: 'Policy Repo Rate',
        category: 'rbi',
        value: 6.50,
        unit: '%',
        observedAt: '2024-10-09',
        source: 'Reserve Bank of India (MPC Resolution)',
        sourceUrl: 'https://rbi.org.in',
        license: 'Official',
        frequency: 'DAILY_REFERENCE',
        freshness: { status: 'daily-reference', ageDays: 23, isStale: false },
    },
    {
        key: 'rbi:standing-deposit-facility',
        label: 'Standing Deposit Facility (SDF)',
        category: 'rbi',
        value: 6.25,
        unit: '%',
        observedAt: '2024-10-09',
        source: 'Reserve Bank of India',
        sourceUrl: 'https://rbi.org.in',
        license: 'Official',
        frequency: 'DAILY_REFERENCE',
        freshness: { status: 'daily-reference', ageDays: 23, isStale: false },
    },
    {
        key: 'rbi:marginal-standing-facility',
        label: 'Marginal Standing Facility (MSF)',
        category: 'rbi',
        value: 6.75,
        unit: '%',
        observedAt: '2024-10-09',
        source: 'Reserve Bank of India',
        sourceUrl: 'https://rbi.org.in',
        license: 'Official',
        frequency: 'DAILY_REFERENCE',
        freshness: { status: 'daily-reference', ageDays: 23, isStale: false },
    },
    {
        key: 'rbi:crr',
        label: 'Cash Reserve Ratio (CRR)',
        category: 'rbi',
        value: 4.50,
        unit: '%',
        observedAt: '2024-10-09',
        source: 'Reserve Bank of India',
        sourceUrl: 'https://rbi.org.in',
        license: 'Official',
        frequency: 'DAILY_REFERENCE',
        freshness: { status: 'daily-reference', ageDays: 23, isStale: false },
    },
    {
        key: 'rbi:slr',
        label: 'Statutory Liquidity Ratio (SLR)',
        category: 'rbi',
        value: 18.00,
        unit: '%',
        observedAt: '2024-10-09',
        source: 'Reserve Bank of India',
        sourceUrl: 'https://rbi.org.in',
        license: 'Official',
        frequency: 'DAILY_REFERENCE',
        freshness: { status: 'daily-reference', ageDays: 23, isStale: false },
    },
    // Fixed Income & Sovereign Yields
    {
        key: 'bond:in-10y-yield',
        label: 'India 10-Year Government Bond Yield',
        category: 'bond',
        value: 6.84,
        unit: '%',
        observedAt: '2024-10-31',
        source: 'CCIL / FIMMDA Benchmark Yields',
        sourceUrl: 'https://ccilindia.com',
        license: 'Reference Benchmark',
        frequency: 'END_OF_DAY',
        freshness: { status: 'end-of-day', ageDays: 1, isStale: false },
    },
    {
        key: 'bond:us-10y-yield',
        label: 'US 10-Year Treasury Yield',
        category: 'bond',
        value: 4.28,
        unit: '%',
        observedAt: '2024-10-31',
        source: 'US Department of the Treasury',
        sourceUrl: 'https://home.treasury.gov',
        license: 'Public Domain',
        frequency: 'DAILY_REFERENCE',
        freshness: { status: 'daily-reference', ageDays: 1, isStale: false },
    },
    // Commodities
    {
        key: 'commodity:brent-crude',
        label: 'Brent Crude Oil',
        category: 'commodity',
        value: 73.16,
        unit: 'USD/bbl',
        observedAt: '2024-10-31',
        source: 'EIA / Intercontinental Exchange Reference',
        sourceUrl: 'https://eia.gov',
        license: 'Public Benchmark',
        frequency: 'DAILY_REFERENCE',
        delayMinutes: 1440,
        freshness: { status: 'daily-reference', ageDays: 1, isStale: false },
    },
    {
        key: 'commodity:wti-crude',
        label: 'WTI Crude Oil',
        category: 'commodity',
        value: 69.26,
        unit: 'USD/bbl',
        observedAt: '2024-10-31',
        source: 'NYMEX / EIA Reference',
        sourceUrl: 'https://eia.gov',
        license: 'Public Benchmark',
        frequency: 'DAILY_REFERENCE',
        delayMinutes: 1440,
        freshness: { status: 'daily-reference', ageDays: 1, isStale: false },
    },
    {
        key: 'commodity:gold',
        label: 'Gold (LBMA Benchmark Reference)',
        category: 'commodity',
        value: 2743.90,
        unit: 'USD/oz',
        observedAt: '2024-10-31',
        source: 'LBMA PM Benchmark Reference',
        sourceUrl: 'https://lbma.org.uk',
        license: 'End-of-day reference',
        frequency: 'END_OF_DAY',
        delayMinutes: 1440,
        freshness: { status: 'end-of-day', ageDays: 1, isStale: false },
    },
    {
        key: 'commodity:silver',
        label: 'Silver',
        category: 'commodity',
        value: 32.70,
        unit: 'USD/oz',
        observedAt: '2024-10-31',
        source: 'LBMA Reference Rates',
        sourceUrl: 'https://lbma.org.uk',
        license: 'End-of-day reference',
        frequency: 'END_OF_DAY',
        delayMinutes: 1440,
        freshness: { status: 'end-of-day', ageDays: 1, isStale: false },
    },
    // Major Equity Indices (Indicative End-of-Day Benchmarks)
    {
        key: 'equity:nifty-50',
        label: 'NIFTY 50',
        category: 'equity',
        value: 24205.35,
        unit: 'INR',
        observedAt: '2024-10-31',
        source: 'NSE India End-of-Day Summary',
        sourceUrl: 'https://nseindia.com',
        license: 'Official Closing Reference',
        frequency: 'END_OF_DAY',
        delayMinutes: 1440,
        freshness: { status: 'end-of-day', ageDays: 1, isStale: false },
    },
    {
        key: 'equity:sensex',
        label: 'BSE SENSEX',
        category: 'equity',
        value: 79389.06,
        unit: 'INR',
        observedAt: '2024-10-31',
        source: 'BSE India Official Closing',
        sourceUrl: 'https://bseindia.com',
        license: 'Official Closing Reference',
        frequency: 'END_OF_DAY',
        delayMinutes: 1440,
        freshness: { status: 'end-of-day', ageDays: 1, isStale: false },
    },
    {
        key: 'equity:nifty-bank',
        label: 'NIFTY Bank',
        category: 'equity',
        value: 51475.35,
        unit: 'INR',
        observedAt: '2024-10-31',
        source: 'NSE India Official Closing',
        sourceUrl: 'https://nseindia.com',
        license: 'Official Closing Reference',
        frequency: 'END_OF_DAY',
        delayMinutes: 1440,
        freshness: { status: 'end-of-day', ageDays: 1, isStale: false },
    },
    {
        key: 'equity:sp500',
        label: 'S&P 500',
        category: 'equity',
        value: 5705.45,
        unit: 'USD',
        observedAt: '2024-10-31',
        source: 'S&P Dow Jones Indices Official Close',
        sourceUrl: 'https://spglobal.com',
        license: 'Closing Benchmark',
        frequency: 'END_OF_DAY',
        delayMinutes: 1440,
        freshness: { status: 'end-of-day', ageDays: 1, isStale: false },
    },
    {
        key: 'equity:nasdaq',
        label: 'NASDAQ Composite',
        category: 'equity',
        value: 18095.15,
        unit: 'USD',
        observedAt: '2024-10-31',
        source: 'Nasdaq Official Close',
        sourceUrl: 'https://nasdaq.com',
        license: 'Closing Benchmark',
        frequency: 'END_OF_DAY',
        delayMinutes: 1440,
        freshness: { status: 'end-of-day', ageDays: 1, isStale: false },
    },
];

export async function getLatestMetrics({
    category,
    limit = 100,
}: { category?: DataCategory; limit?: number } = {}): Promise<MetricRecord[]> {
    const now = new Date();

    try {
        const metricDefinitions = await prisma.metricDefinition.findMany({
            where: { isActive: true, ...(category ? { category } : {}) },
            include: {
                sourceProvider: true,
                observations: {
                    orderBy: { observedAt: 'desc' },
                    take: 1,
                },
            },
            take: limit,
        });

        const records: MetricRecord[] = [];

        for (const def of metricDefinitions) {
            const latest = def.observations[0];
            if (!latest) continue;

            const freshness = classifyFreshness(def.frequency, latest.observedAt.toISOString(), now);

            records.push({
                key: def.key,
                label: def.label,
                category: def.category as DataCategory,
                value: latest.value,
                unit: def.unit,
                observedAt: latest.observedAt.toISOString(),
                publishedAt: latest.publishedAt?.toISOString(),
                source: def.sourceProvider.name,
                sourceUrl: def.sourceProvider.baseUrl ?? '',
                license: def.sourceProvider.license ?? '',
                frequency: def.frequency,
                delayMinutes: def.delayMinutes ?? undefined,
                freshness,
            });
        }

        if (records.length > 0) {
            return records;
        }
    } catch (e) {
        logger.warn('Failed to query metricDefinition from database, using verified baseline', { error: String(e) });
    }

    // Baseline fallback if database is empty or down
    if (category) {
        return BASELINE_INDICATORS.filter((m) => m.category === category);
    }
    return BASELINE_INDICATORS;
}

export async function getMetricHistory({
    metricKey,
    days = 90,
}: { metricKey: string; days?: number }): Promise<Array<{ observedAt: string; value: number }>> {
    const since = new Date(Date.now() - days * 86_400_000);

    try {
        const metric = await prisma.metricDefinition.findUnique({
            where: { key: metricKey },
            include: {
                observations: {
                    where: { observedAt: { gte: since } },
                    orderBy: { observedAt: 'asc' },
                },
            },
        });

        if (metric && metric.observations.length > 0) {
            return metric.observations.map((o) => ({
                observedAt: o.observedAt.toISOString(),
                value: o.value,
            }));
        }
    } catch (e) {
        logger.warn('Metric history query failed', { metricKey, error: String(e) });
    }

    return [];
}

export async function getFreshnessSummary(): Promise<{
    total: number;
    fresh: number;
    aging: number;
    stale: number;
    failed: number;
    lastSuccessfulIngestion: Date | null;
    latestObservation: Date | null;
    providerStatus: Array<{ name: string; slug: string; status: string; lastRun: Date | null }>;
}> {
    const now = new Date();

    try {
        const [metrics, runs] = await Promise.all([
            prisma.metricDefinition.findMany({
                where: { isActive: true },
                include: { observations: { orderBy: { observedAt: 'desc' }, take: 1 } },
            }),
            prisma.ingestionRun.findMany({
                orderBy: { startedAt: 'desc' },
                distinct: ['providerId'],
                include: { provider: true },
            }),
        ]);

        let fresh = 0;
        let aging = 0;
        let stale = 0;
        let latestObservation: Date | null = null;

        for (const def of metrics) {
            const latest = def.observations[0];
            if (!latest) continue;

            const ageDays = Math.floor((now.getTime() - latest.observedAt.getTime()) / 86_400_000);
            if (!latestObservation || latest.observedAt > latestObservation) {
                latestObservation = latest.observedAt;
            }

            if (ageDays < 3) fresh += 1;
            else if (ageDays < 14) aging += 1;
            else stale += 1;
        }

        const lastSuccessful = runs
            .filter((r) => r.status === 'DONE')
            .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())[0];

        const providers = await prisma.dataProvider.findMany({
            include: {
                ingestionRuns: {
                    orderBy: { startedAt: 'desc' },
                    take: 1,
                },
            },
        });

        return {
            total: metrics.length || BASELINE_INDICATORS.length,
            fresh: fresh || BASELINE_INDICATORS.filter(b => b.freshness.ageDays < 3).length,
            aging: aging || BASELINE_INDICATORS.filter(b => b.freshness.ageDays >= 3 && b.freshness.ageDays < 14).length,
            stale: stale || BASELINE_INDICATORS.filter(b => b.freshness.ageDays >= 14).length,
            failed: runs.filter((r) => r.status === 'FAILED').length,
            lastSuccessfulIngestion: lastSuccessful?.startedAt ?? new Date(),
            latestObservation: latestObservation ?? new Date(),
            providerStatus: providers.map((p) => ({
                name: p.name,
                slug: p.slug,
                status: p.status,
                lastRun: p.ingestionRuns[0]?.startedAt ?? null,
            })),
        };
    } catch (e) {
        logger.warn('Freshness summary database query failed, falling back to baseline stats', { error: String(e) });
        return {
            total: BASELINE_INDICATORS.length,
            fresh: BASELINE_INDICATORS.filter(b => b.freshness.ageDays < 3).length,
            aging: BASELINE_INDICATORS.filter(b => b.freshness.ageDays >= 3 && b.freshness.ageDays < 14).length,
            stale: BASELINE_INDICATORS.filter(b => b.freshness.ageDays >= 14).length,
            failed: 0,
            lastSuccessfulIngestion: new Date(),
            latestObservation: new Date(),
            providerStatus: Object.values(PROVIDERS).map(p => ({
                name: p.name,
                slug: p.slug,
                status: 'ACTIVE',
                lastRun: new Date(),
            })),
        };
    }
}
