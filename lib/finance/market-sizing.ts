// lib/finance/market-sizing.ts — TAM/SAM/SOM (top-down) with bottom-up
// convergence check. Fixes vs legacy: percentages were SILENTLY clamped to
// [0,100] for the money chain but the user counts used the raw typed
// values, so users and money described different assumptions; a 150% typo
// became 100% without a word. Engine: one validated path — out-of-range
// percentages are errors, and users/money always derive identically.

export interface MarketSizingInputs {
    totalPopulation: number; targetSegmentPct: number; addressablePct: number; obtainablePct: number;
    avgRevenuePerUser: number; marketGrowthRate: number;
    targetCustomers: number; avgTransactionValue: number; transactionsPerYear: number;
    projectionYears: number;
}

export interface MarketSizingResult {
    errors: string[]; warnings: string[];
    tamUsers: number | null; samUsers: number | null; somUsers: number | null;
    tam: number | null; sam: number | null; som: number | null;
    bottomUpRevenue: number | null;
    /** SOM ÷ bottom-up revenue; ~1 means the two methods agree. */
    convergenceRatio: number | null;
    impliedSomShareOfSamPct: number | null;
    projections: Array<{ year: number; tam: number; sam: number; som: number }>;
}

export const MS_DEFAULTS: MarketSizingInputs = {
    totalPopulation: 1_400_000_000, targetSegmentPct: 0.15, addressablePct: 0.40, obtainablePct: 0.05,
    avgRevenuePerUser: 5000, marketGrowthRate: 0.18,
    targetCustomers: 50_000, avgTransactionValue: 350, transactionsPerYear: 14, projectionYears: 5,
};

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function runMarketSizing(i: MarketSizingInputs): MarketSizingResult {
    const errors: string[] = []; const warnings: string[] = [];
    for (const [k, v] of Object.entries(i)) if (!fin(v)) errors.push(`${k} must be a finite number.`);
    if (!errors.length) {
        for (const [k, v] of [['targetSegmentPct', i.targetSegmentPct], ['addressablePct', i.addressablePct], ['obtainablePct', i.obtainablePct]] as const) {
            if (v < 0 || v > 1) errors.push(`${k} must be between 0% and 100% (no silent clamping — fix the assumption).`);
        }
        if (i.totalPopulation < 0 || i.avgRevenuePerUser < 0 || i.targetCustomers < 0 || i.avgTransactionValue < 0 || i.transactionsPerYear < 0) {
            errors.push('Population, customers and monetary inputs cannot be negative.');
        }
        if (i.marketGrowthRate <= -1) errors.push('Market growth rate must be greater than −100%.');
        if (!Number.isInteger(i.projectionYears) || i.projectionYears < 1 || i.projectionYears > 10) errors.push('Projection years must be a whole number between 1 and 10.');
    }
    const empty: MarketSizingResult = {
        errors, warnings, tamUsers: null, samUsers: null, somUsers: null, tam: null, sam: null, som: null,
        bottomUpRevenue: null, convergenceRatio: null, impliedSomShareOfSamPct: null, projections: [],
    };
    if (errors.length) return empty;

    const tamUsers = i.totalPopulation * i.targetSegmentPct;
    const samUsers = tamUsers * i.addressablePct;
    const somUsers = samUsers * i.obtainablePct;
    const tam = tamUsers * i.avgRevenuePerUser;
    const sam = samUsers * i.avgRevenuePerUser;
    const som = somUsers * i.avgRevenuePerUser;
    const bottomUpRevenue = i.targetCustomers * i.avgTransactionValue * i.transactionsPerYear;
    const convergenceRatio = bottomUpRevenue > 0 ? som / bottomUpRevenue : null;

    if (convergenceRatio !== null && convergenceRatio > 3) warnings.push(`Top-down SOM is ${convergenceRatio.toFixed(1)}× the bottom-up plan — the classic TAM-slide red flag: either the obtainable % is fantasy or the operating plan is far smaller than the story.`);
    if (convergenceRatio !== null && convergenceRatio < 0.5 && convergenceRatio > 0) warnings.push('Bottom-up plan exceeds the top-down SOM — the market definition or obtainable % is probably too narrow for the plan being pitched.');
    if (i.obtainablePct > 0.2) warnings.push('Obtainable share above 20% of SAM is rarely credible for an entrant — SOM should reflect obtainable share within ~3 years given real sales capacity.');
    if (i.targetCustomers > somUsers && somUsers > 0) warnings.push('Target customers exceed the entire SOM user count implied by your top-down chain.');

    const projections = Array.from({ length: i.projectionYears }, (_, y) => {
        const f = Math.pow(1 + i.marketGrowthRate, y);
        return { year: y + 1, tam: tam * f, sam: sam * f, som: som * f };
    });

    return {
        errors: [], warnings, tamUsers, samUsers, somUsers, tam, sam, som, bottomUpRevenue,
        convergenceRatio, impliedSomShareOfSamPct: sam > 0 ? (som / sam) * 100 : null, projections,
    };
}

const KEYS: Array<keyof MarketSizingInputs> = [
    'totalPopulation', 'targetSegmentPct', 'addressablePct', 'obtainablePct', 'avgRevenuePerUser',
    'marketGrowthRate', 'targetCustomers', 'avgTransactionValue', 'transactionsPerYear', 'projectionYears',
];
export function parseMarketSizingInputs(raw: Record<string, unknown> | null | undefined, base: MarketSizingInputs = MS_DEFAULTS): MarketSizingInputs {
    const out = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of KEYS) { const v = raw[k as string]; const n = typeof v === 'string' ? Number(v) : v; if (fin(n)) (out as unknown as Record<string, number>)[k] = n; }
    out.projectionYears = Math.min(10, Math.max(1, Math.round(out.projectionYears) || 5));
    return out;
}
export function marketSizingToQuery(i: MarketSizingInputs): string {
    const p = new URLSearchParams();
    for (const k of KEYS) p.set(k, String(i[k]));
    return p.toString();
}
