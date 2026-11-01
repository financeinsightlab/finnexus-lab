// lib/live-data.ts — live metric ingest from FREE public APIs
//
// Pillar C1. Static numbers are copyable; a live, cited, time-stamped metric is
// not. Every metric produced here carries full provenance (source, source URL,
// licence, as-of date) so the UI can show exactly where a number came from.
//
// All providers below are free and key-less:
//   • Frankfurter (ECB reference FX rates)  — https://frankfurter.dev
//   • World Bank Open Data                  — https://data.worldbank.org
//
// The parsers are pure and unit-tested; the network helpers are thin wrappers
// with timeouts so a provider outage can never hang a request or a cron job.

export interface MetricPoint {
    /** Stable key, e.g. `fx:usd-inr`. */
    key: string;
    label: string;
    value: number;
    unit: string;
    /** ISO date the value refers to. */
    asOf: string;
    source: string;
    sourceUrl: string;
    license: string;
}

export interface MetricProvenance {
    source: string;
    sourceUrl: string;
    license: string;
    asOf: string;
    /** Whole days between the metric's date and now (>= 0). */
    ageDays: number;
}

const DAY_MS = 86_400_000;

export function buildProvenance(point: MetricPoint, now: Date = new Date()): MetricProvenance {
    const asOfTime = new Date(point.asOf).getTime();
    const ageDays = Number.isFinite(asOfTime)
        ? Math.max(0, Math.floor((now.getTime() - asOfTime) / DAY_MS))
        : 0;
    return {
        source: point.source,
        sourceUrl: point.sourceUrl,
        license: point.license,
        asOf: point.asOf,
        ageDays,
    };
}

// ─── Frankfurter (FX) ─────────────────────────────────────────────────────────

export interface FrankfurterTimeseries {
    amount?: number;
    base: string;
    date?: string;
    start_date?: string;
    end_date?: string;
    rates: Record<string, number | Record<string, number>>;
}

/**
 * Parses either flat `/latest` ({ base: 'USD', date: '...', rates: { INR: 84.2 } })
 * or nested timeseries ({ rates: { '2026-10-30': { INR: 84.2 } } }).
 */
export function parseFrankfurterLatest(payload: FrankfurterTimeseries): MetricPoint[] {
    if (!payload || !payload.rates) return [];

    const base = (payload.base || 'USD').toUpperCase();
    const fallbackDate = payload.date || payload.end_date || new Date().toISOString().slice(0, 10);
    const keys = Object.keys(payload.rates);
    if (keys.length === 0) return [];

    const firstVal = payload.rates[keys[0]];
    const points: MetricPoint[] = [];

    if (typeof firstVal === 'number') {
        // Flat /latest structure
        for (const [currency, rate] of Object.entries(payload.rates as Record<string, number>)) {
            if (typeof rate !== 'number' || Number.isNaN(rate)) continue;
            const curr = currency.toUpperCase();
            points.push({
                key: `fx:${base.toLowerCase()}-${curr.toLowerCase()}`,
                label: `${base}/${curr}`,
                value: rate,
                unit: curr,
                asOf: fallbackDate,
                source: 'Frankfurter (European Central Bank)',
                sourceUrl: 'https://frankfurter.dev',
                license: 'ECB reference rates — free to reuse',
            });
        }
    } else {
        // Nested timeseries structure
        const dates = keys.sort();
        const latestDate = dates[dates.length - 1];
        const perCurrency = (payload.rates[latestDate] ?? {}) as Record<string, number>;

        for (const [currency, rate] of Object.entries(perCurrency)) {
            if (typeof rate !== 'number' || Number.isNaN(rate)) continue;
            const curr = currency.toUpperCase();
            points.push({
                key: `fx:${base.toLowerCase()}-${curr.toLowerCase()}`,
                label: `${base}/${curr}`,
                value: rate,
                unit: curr,
                asOf: latestDate,
                source: 'Frankfurter (European Central Bank)',
                sourceUrl: 'https://frankfurter.dev',
                license: 'ECB reference rates — free to reuse',
            });
        }
    }

    return points;
}

// ─── World Bank ───────────────────────────────────────────────────────────────

export interface WorldBankRow {
    indicator: { id: string; value: string };
    country: { id: string; value: string };
    countryiso3code: string;
    date: string;
    value: number | null;
}

/** Newest non-null observation per indicator/country pair. */
export function parseWorldBankLatest(rows: readonly WorldBankRow[]): MetricPoint[] {
    const newest = new Map<string, WorldBankRow>();
    for (const row of rows) {
        if (row.value === null || row.value === undefined) continue;
        const key = `${row.countryiso3code}:${row.indicator.id}`;
        const current = newest.get(key);
        if (!current || row.date > current.date) newest.set(key, row);
    }

    return [...newest.values()].map((row) => ({
        key: `wb:${row.countryiso3code.toLowerCase()}:${row.indicator.id}`,
        label: `${row.indicator.value} — ${row.country.value}`,
        value: row.value as number,
        unit: row.indicator.id.includes('CD') ? 'USD' : '%',
        asOf: `${row.date}-01-01`,
        source: 'World Bank Open Data',
        sourceUrl: `https://data.worldbank.org/indicator/${row.indicator.id}`,
        license: 'CC BY 4.0',
    }));
}

// ─── Network helper ───────────────────────────────────────────────────────────

/**
 * Fetch JSON with an abort-based timeout. Returns null on any failure so callers
 * degrade gracefully (a stale metric beats a 500).
 */
export async function fetchJson<T>(
    url: string,
    options: { timeoutMs?: number; fetchImpl?: typeof fetch } = {},
): Promise<T | null> {
    const timeoutMs = options.timeoutMs ?? 8000;
    const doFetch = options.fetchImpl ?? fetch;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await doFetch(url, {
            signal: controller.signal,
            headers: { accept: 'application/json' },
        });
        if (!response.ok) return null;
        return (await response.json()) as T;
    } catch {
        return null;
    } finally {
        clearTimeout(timer);
    }
}

/** Frankfurter latest rates for a base currency against the given symbols. */
export function frankfurterUrl(base: string, symbols: readonly string[]): string {
    const list = symbols.join(',');
    return `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(base)}&symbols=${encodeURIComponent(list)}`;
}

export function worldBankUrl(country: string, indicator: string): string {
    return `https://api.worldbank.org/v2/country/${encodeURIComponent(country)}/indicator/${encodeURIComponent(indicator)}?format=json&per_page=5&mrnev=1`;
}
