// lib/datasets.ts — Data Lab dataset registry (Pillar C3)
//
// The Data Lab used to hold its chart + download figures inline in the page.
// This module is the single source of truth for those figures so the same
// numbers power:
//
//   1. the interactive chart on /data-lab/[slug],
//   2. server-side CSV/JSON downloads at /api/datasets/[slug], and
//   3. schema.org `Dataset` JSON-LD with `distribution` + `variableMeasured`,
//      which makes the data citable by search engines and AI answer engines.
//
// All data is first-party and licensed CC BY 4.0, so it is free to reuse with
// attribution — no external service or key required.

import type { DataLabProject } from '@/types';

export const DATASET_BASE_URL = 'https://kunwaranalytics.in';

export type DatasetRow = Record<string, string | number | null>;

export interface ChartSeries {
    key: string;
    name: string;
    color: string;
    kind: 'line' | 'bar';
}

export interface DatasetChart {
    title: string;
    subtitle: string;
    xKey: string;
    type: 'line' | 'bar';
    series: ChartSeries[];
    data: DatasetRow[];
}

export interface DataLabVisual {
    chart: DatasetChart;
    download: DatasetRow[];
    simulator?: boolean;
}

const CC_BY = 'https://creativecommons.org/licenses/by/4.0/';

/** Extra schema.org metadata that isn't derivable from the rows themselves. */
interface DatasetMeta {
    temporalCoverage: string;
    spatialCoverage: string;
    unit: string;
    keywords: string;
}

export const DATA_LAB_VISUALS: Record<string, DataLabVisual> = {
    'qcommerce-unit-economics-model': {
        chart: {
            title: 'Contribution Margin vs. Daily Order Volume',
            subtitle:
                'Drag the model inputs in the simulator below to see live movement on this curve',
            xKey: 'orders',
            type: 'line',
            series: [
                { key: 'cm1', name: 'CM1 Margin %', color: '#22d3ee', kind: 'line' },
                { key: 'cm2', name: 'CM2 Margin %', color: '#a78bfa', kind: 'line' },
                { key: 'cogs', name: 'Product COGS ₹000s', color: '#f472b6', kind: 'bar' },
            ],
            data: [
                { orders: 200, cm1: -18.2, cm2: -34.5, cogs: 3348 },
                { orders: 260, cm1: -10.4, cm2: -24.1, cogs: 4352 },
                { orders: 320, cm1: -3.6, cm2: -14.8, cogs: 5357 },
                { orders: 380, cm1: 2.4, cm2: -6.4, cogs: 6361 },
                { orders: 410, cm1: 5.6, cm2: -1.2, cogs: 6863 },
                { orders: 450, cm1: 9.1, cm2: 4.9, cogs: 7533 },
                { orders: 520, cm1: 14.2, cm2: 11.6, cogs: 8705 },
                { orders: 600, cm1: 20.1, cm2: 19.2, cogs: 10044 },
            ],
        },
        download: [
            { orders_per_day: 200, revenue_inr: 133920, cm1_margin: -18.2, cm2_margin: -34.5, contribution_inr: -24373 },
            { orders_per_day: 260, revenue_inr: 174096, cm1_margin: -10.4, cm2_margin: -24.1, contribution_inr: -18106 },
            { orders_per_day: 320, revenue_inr: 214272, cm1_margin: -3.6, cm2_margin: -14.8, contribution_inr: -7714 },
            { orders_per_day: 380, revenue_inr: 254448, cm1_margin: 2.4, cm2_margin: -6.4, contribution_inr: 6107 },
            { orders_per_day: 410, revenue_inr: 274536, cm1_margin: 5.6, cm2_margin: -1.2, contribution_inr: 15374 },
            { orders_per_day: 450, revenue_inr: 301320, cm1_margin: 9.1, cm2_margin: 4.9, contribution_inr: 27420 },
            { orders_per_day: 520, revenue_inr: 348160, cm1_margin: 14.2, cm2_margin: 11.6, contribution_inr: 49438 },
            { orders_per_day: 600, revenue_inr: 401760, cm1_margin: 20.1, cm2_margin: 19.2, contribution_inr: 80753 },
        ],
        simulator: true,
    },

    'india-startup-funding-analysis': {
        chart: {
            title: 'Indian Startup Funding by Fiscal Year',
            subtitle: 'Total funding (₹ Bn) and deal count, FY20 → FY26',
            xKey: 'fy',
            type: 'bar',
            series: [
                { key: 'funding', name: 'Funding (₹ Bn)', color: '#8b5cf6', kind: 'bar' },
                { key: 'deals', name: 'Deals (#)', color: '#22d3ee', kind: 'line' },
            ],
            data: [
                { fy: 'FY20', funding: 421, deals: 1240 },
                { fy: 'FY21', funding: 683, deals: 1510 },
                { fy: 'FY22', funding: 1240, deals: 2050 },
                { fy: 'FY23', funding: 870, deals: 1680 },
                { fy: 'FY24', funding: 615, deals: 1290 },
                { fy: 'FY25', funding: 742, deals: 1450 },
                { fy: 'FY26E', funding: 520, deals: 980 },
            ],
        },
        download: [
            { fiscal_year: 'FY20', funding_inr_bn: 421, deals: 1240, avg_ticket_cr: 34, growth_ytd: null },
            { fiscal_year: 'FY21', funding_inr_bn: 683, deals: 1510, avg_ticket_cr: 45, growth_ytd: 62.2 },
            { fiscal_year: 'FY22', funding_inr_bn: 1240, deals: 2050, avg_ticket_cr: 60, growth_ytd: 81.6 },
            { fiscal_year: 'FY23', funding_inr_bn: 870, deals: 1680, avg_ticket_cr: 52, growth_ytd: -29.8 },
            { fiscal_year: 'FY24', funding_inr_bn: 615, deals: 1290, avg_ticket_cr: 48, growth_ytd: -29.3 },
            { fiscal_year: 'FY25', funding_inr_bn: 742, deals: 1450, avg_ticket_cr: 51, growth_ytd: 20.7 },
            { fiscal_year: 'FY26E', funding_inr_bn: 520, deals: 980, avg_ticket_cr: 53, growth_ytd: -29.9 },
        ],
    },

    'india-ev-penetration-model': {
        chart: {
            title: 'EV Penetration by Segment (Base Scenario)',
            subtitle: 'Share of annual sales, FY21 → FY30',
            xKey: 'fy',
            type: 'line',
            series: [
                { key: 'e2w', name: 'E2W Penetration %', color: '#10b981', kind: 'line' },
                { key: 'e4w', name: 'E4W Penetration %', color: '#22d3ee', kind: 'line' },
                { key: 'e3w', name: 'E3W Penetration %', color: '#f59e0b', kind: 'line' },
            ],
            data: [
                { fy: 'FY21', e2w: 1.0, e4w: 0.5, e3w: 7.0 },
                { fy: 'FY22', e2w: 3.4, e4w: 1.1, e3w: 15.0 },
                { fy: 'FY23', e2w: 5.3, e4w: 2.2, e3w: 28.0 },
                { fy: 'FY24', e2w: 9.0, e4w: 3.8, e3w: 42.0 },
                { fy: 'FY25', e2w: 12.5, e4w: 5.6, e3w: 55.0 },
                { fy: 'FY26E', e2w: 17.0, e4w: 7.5, e3w: 63.0 },
                { fy: 'FY28E', e2w: 28.0, e4w: 9.5, e3w: 72.0 },
                { fy: 'FY30E', e2w: 38.0, e4w: 12.0, e3w: 78.0 },
            ],
        },
        download: [
            { fiscal_year: 'FY21', e2w_pct: 1.0, e4w_pct: 0.5, e3w_pct: 7.0 },
            { fiscal_year: 'FY22', e2w_pct: 3.4, e4w_pct: 1.1, e3w_pct: 15.0 },
            { fiscal_year: 'FY23', e2w_pct: 5.3, e4w_pct: 2.2, e3w_pct: 28.0 },
            { fiscal_year: 'FY24', e2w_pct: 9.0, e4w_pct: 3.8, e3w_pct: 42.0 },
            { fiscal_year: 'FY25', e2w_pct: 12.5, e4w_pct: 5.6, e3w_pct: 55.0 },
            { fiscal_year: 'FY26E', e2w_pct: 17.0, e4w_pct: 7.5, e3w_pct: 63.0 },
            { fiscal_year: 'FY28E', e2w_pct: 28.0, e4w_pct: 9.5, e3w_pct: 72.0 },
            { fiscal_year: 'FY30E', e2w_pct: 38.0, e4w_pct: 12.0, e3w_pct: 78.0 },
        ],
    },

    'fintech-lending-risk-model': {
        chart: {
            title: 'Digital Lending Book Growth vs. Credit Risk',
            subtitle: 'Retail loan AUM (₹ Tn) and sector GNPA %, FY21 → FY26',
            xKey: 'fy',
            type: 'bar',
            series: [
                { key: 'aum', name: 'AUM (₹ Tn)', color: '#f59e0b', kind: 'bar' },
                { key: 'gnpa', name: 'GNPA %', color: '#ef4444', kind: 'line' },
            ],
            data: [
                { fy: 'FY21', aum: 1.1, gnpa: 3.9 },
                { fy: 'FY22', aum: 1.6, gnpa: 4.4 },
                { fy: 'FY23', aum: 2.4, gnpa: 3.6 },
                { fy: 'FY24', aum: 3.1, gnpa: 2.9 },
                { fy: 'FY25', aum: 3.7, gnpa: 2.7 },
                { fy: 'FY26E', aum: 4.2, gnpa: 2.9 },
            ],
        },
        download: [
            { fiscal_year: 'FY21', aum_inr_tn: 1.1, gnpa_pct: 3.9, loan_book_cagr: null },
            { fiscal_year: 'FY22', aum_inr_tn: 1.6, gnpa_pct: 4.4, loan_book_cagr: 45.5 },
            { fiscal_year: 'FY23', aum_inr_tn: 2.4, gnpa_pct: 3.6, loan_book_cagr: 50.0 },
            { fiscal_year: 'FY24', aum_inr_tn: 3.1, gnpa_pct: 2.9, loan_book_cagr: 29.2 },
            { fiscal_year: 'FY25', aum_inr_tn: 3.7, gnpa_pct: 2.7, loan_book_cagr: 19.4 },
            { fiscal_year: 'FY26E', aum_inr_tn: 4.2, gnpa_pct: 2.9, loan_book_cagr: 13.5 },
        ],
    },

    'mutual-fund-sip-analysis': {
        chart: {
            title: 'Monthly SIP Inflows (₹ Bn)',
            subtitle: 'Systematic investment plan inflows, FY20 → FY26',
            xKey: 'fy',
            type: 'bar',
            series: [
                { key: 'inflows', name: 'Monthly SIP (₹ Bn)', color: '#f59e0b', kind: 'bar' },
                { key: 'accounts', name: 'SIP Accounts (Mn)', color: '#22d3ee', kind: 'line' },
            ],
            data: [
                { fy: 'FY20', inflows: 82, accounts: 28 },
                { fy: 'FY21', inflows: 80, accounts: 35 },
                { fy: 'FY22', inflows: 106, accounts: 45 },
                { fy: 'FY23', inflows: 134, accounts: 59 },
                { fy: 'FY24', inflows: 173, accounts: 75 },
                { fy: 'FY25', inflows: 225, accounts: 91 },
                { fy: 'FY26E', inflows: 270, accounts: 110 },
            ],
        },
        download: [
            { fiscal_year: 'FY20', monthly_sip_inr_bn: 82, sip_accounts_mn: 28 },
            { fiscal_year: 'FY21', monthly_sip_inr_bn: 80, sip_accounts_mn: 35 },
            { fiscal_year: 'FY22', monthly_sip_inr_bn: 106, sip_accounts_mn: 45 },
            { fiscal_year: 'FY23', monthly_sip_inr_bn: 134, sip_accounts_mn: 59 },
            { fiscal_year: 'FY24', monthly_sip_inr_bn: 173, sip_accounts_mn: 75 },
            { fiscal_year: 'FY25', monthly_sip_inr_bn: 225, sip_accounts_mn: 91 },
            { fiscal_year: 'FY26E', monthly_sip_inr_bn: 270, sip_accounts_mn: 110 },
        ],
    },

    'stock-market-concentration': {
        chart: {
            title: 'Nifty Top-10 Weight Share',
            subtitle: 'Concentration of index returns in the top 10 stocks, FY15 → FY26',
            xKey: 'fy',
            type: 'line',
            series: [
                { key: 'top10', name: 'Top-10 Weight %', color: '#8b5cf6', kind: 'line' },
                { key: 'top50', name: 'Top-50 Weight %', color: '#22d3ee', kind: 'line' },
            ],
            data: [
                { fy: 'FY15', top10: 46, top50: 82 },
                { fy: 'FY17', top10: 48, top50: 84 },
                { fy: 'FY19', top10: 51, top50: 86 },
                { fy: 'FY21', top10: 49, top50: 85 },
                { fy: 'FY23', top10: 54, top50: 88 },
                { fy: 'FY25', top10: 57, top50: 90 },
                { fy: 'FY26E', top10: 58, top50: 91 },
            ],
        },
        download: [
            { fiscal_year: 'FY15', top10_weight_pct: 46, top50_weight_pct: 82 },
            { fiscal_year: 'FY17', top10_weight_pct: 48, top50_weight_pct: 84 },
            { fiscal_year: 'FY19', top10_weight_pct: 51, top50_weight_pct: 86 },
            { fiscal_year: 'FY21', top10_weight_pct: 49, top50_weight_pct: 85 },
            { fiscal_year: 'FY23', top10_weight_pct: 54, top50_weight_pct: 88 },
            { fiscal_year: 'FY25', top10_weight_pct: 57, top50_weight_pct: 90 },
            { fiscal_year: 'FY26E', top10_weight_pct: 58, top50_weight_pct: 91 },
        ],
    },

    'd2c-brand-unit-economics': {
        chart: {
            title: 'LTV:CAC vs. Repeat Rate',
            subtitle: 'Lifetime-value-to-CAC ratio at different repeat-purchase rates',
            xKey: 'repeat',
            type: 'bar',
            series: [
                { key: 'ltv', name: 'LTV:CAC', color: '#ec4899', kind: 'bar' },
                { key: 'margin', name: 'Contribution Margin %', color: '#22d3ee', kind: 'line' },
            ],
            data: [
                { repeat: '10%', ltv: 1.4, margin: 16 },
                { repeat: '20%', ltv: 2.1, margin: 19 },
                { repeat: '30%', ltv: 2.8, margin: 22 },
                { repeat: '40%', ltv: 3.4, margin: 24 },
                { repeat: '50%', ltv: 4.1, margin: 26 },
                { repeat: '60%', ltv: 4.8, margin: 28 },
            ],
        },
        download: [
            { repeat_rate_pct: '10%', ltv_cac: 1.4, contribution_margin_pct: 16 },
            { repeat_rate_pct: '20%', ltv_cac: 2.1, contribution_margin_pct: 19 },
            { repeat_rate_pct: '30%', ltv_cac: 2.8, contribution_margin_pct: 22 },
            { repeat_rate_pct: '40%', ltv_cac: 3.4, contribution_margin_pct: 24 },
            { repeat_rate_pct: '50%', ltv_cac: 4.1, contribution_margin_pct: 26 },
            { repeat_rate_pct: '60%', ltv_cac: 4.8, contribution_margin_pct: 28 },
        ],
    },
};

const DATASET_META: Record<string, DatasetMeta> = {
    'qcommerce-unit-economics-model': {
        temporalCoverage: '2024/2025',
        spatialCoverage: 'India',
        unit: 'INR / percentage',
        keywords: 'quick commerce, unit economics, contribution margin, CM1, CM2, India',
    },
    'india-startup-funding-analysis': {
        temporalCoverage: '2019/2026',
        spatialCoverage: 'India',
        unit: 'INR billion / count',
        keywords: 'venture capital, startup funding, deal count, India, private markets',
    },
    'india-ev-penetration-model': {
        temporalCoverage: '2020/2030',
        spatialCoverage: 'India',
        unit: 'percentage of sales',
        keywords: 'electric vehicles, EV penetration, E2W, E4W, E3W, India',
    },
    'fintech-lending-risk-model': {
        temporalCoverage: '2020/2026',
        spatialCoverage: 'India',
        unit: 'INR trillion / percentage',
        keywords: 'digital lending, fintech, GNPA, credit risk, retail loans, India',
    },
    'mutual-fund-sip-analysis': {
        temporalCoverage: '2019/2026',
        spatialCoverage: 'India',
        unit: 'INR billion / millions',
        keywords: 'mutual funds, SIP, systematic investment plan, retail investing, India',
    },
    'stock-market-concentration': {
        temporalCoverage: '2014/2026',
        spatialCoverage: 'India',
        unit: 'percentage of index weight',
        keywords: 'Nifty 50, index concentration, market breadth, equity markets, India',
    },
    'd2c-brand-unit-economics': {
        temporalCoverage: '2024/2025',
        spatialCoverage: 'India',
        unit: 'ratio / percentage',
        keywords: 'D2C, direct to consumer, LTV, CAC, contribution margin, e-commerce',
    },
};

const FALLBACK_META: DatasetMeta = {
    temporalCoverage: '2020/2026',
    spatialCoverage: 'India',
    unit: 'mixed',
    keywords: 'data lab, analytics, India',
};

/** Ordered union of keys across every row (stable for CSV headers + JSON-LD). */
export function datasetColumns(rows: readonly DatasetRow[]): string[] {
    const seen = new Set<string>();
    const columns: string[] = [];
    for (const row of rows) {
        for (const key of Object.keys(row)) {
            if (!seen.has(key)) {
                seen.add(key);
                columns.push(key);
            }
        }
    }
    return columns;
}

/** RFC-4180 CSV serialisation with proper quoting of commas, quotes and newlines. */
export function datasetToCsv(
    rows: readonly DatasetRow[],
    columns?: readonly string[],
): string {
    const cols = columns ?? datasetColumns(rows);
    const escape = (value: string | number | null | undefined): string => {
        if (value === null || value === undefined) return '';
        const text = String(value);
        return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    const lines = [
        cols.join(','),
        ...rows.map((row) => cols.map((column) => escape(row[column])).join(',')),
    ];
    return lines.join('\n');
}

export interface ResolvedDataset {
    slug: string;
    columns: string[];
    rows: DatasetRow[];
    rowCount: number;
    csvUrl: string;
    jsonUrl: string;
    pageUrl: string;
}

/** Resolve a dataset by slug for the /api/datasets endpoints. */
export function getDataset(slug: string): ResolvedDataset | null {
    const visual = DATA_LAB_VISUALS[slug];
    if (!visual) return null;
    const rows = visual.download;
    return {
        slug,
        columns: datasetColumns(rows),
        rows,
        rowCount: rows.length,
        csvUrl: `${DATASET_BASE_URL}/api/datasets/${slug}?format=csv`,
        jsonUrl: `${DATASET_BASE_URL}/api/datasets/${slug}?format=json`,
        pageUrl: `${DATASET_BASE_URL}/data-lab/${slug}`,
    };
}

export function listDatasetSlugs(): string[] {
    return Object.keys(DATA_LAB_VISUALS);
}

/**
 * schema.org Dataset JSON-LD. Because it advertises machine-readable
 * `distribution` links and `variableMeasured` columns, AI answer engines and
 * search crawlers can cite the figures directly — a free GEO/AEO win.
 */
export function datasetJsonLd(
    project: Pick<DataLabProject, 'slug' | 'title' | 'businessQuestion' | 'date' | 'image' | 'tools' | 'sector'>,
    visual: DataLabVisual | undefined,
): Record<string, unknown> {
    const meta = DATASET_META[project.slug] ?? FALLBACK_META;
    const columns = visual ? datasetColumns(visual.download) : [];

    return {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: project.title,
        description: project.businessQuestion,
        url: `${DATASET_BASE_URL}/data-lab/${project.slug}`,
        ...(project.image ? { image: `${DATASET_BASE_URL}${project.image}` } : {}),
        datePublished: project.date,
        creator: { '@type': 'Organization', name: 'Kunwar Analytics', url: DATASET_BASE_URL },
        keywords: [...project.tools, project.sector, meta.keywords].filter(Boolean).join(', '),
        temporalCoverage: meta.temporalCoverage,
        spatialCoverage: { '@type': 'Place', name: meta.spatialCoverage },
        license: CC_BY,
        isAccessibleForFree: true,
        ...(columns.length > 0
            ? {
                variableMeasured: columns.map((column) => ({
                    '@type': 'PropertyValue',
                    name: column,
                    unitText: meta.unit,
                })),
            }
            : {}),
        ...(visual
            ? {
                distribution: [
                    {
                        '@type': 'DataDownload',
                        encodingFormat: 'text/csv',
                        contentUrl: `${DATASET_BASE_URL}/api/datasets/${project.slug}?format=csv`,
                    },
                    {
                        '@type': 'DataDownload',
                        encodingFormat: 'application/json',
                        contentUrl: `${DATASET_BASE_URL}/api/datasets/${project.slug}?format=json`,
                    },
                ],
            }
            : {}),
    };
}
