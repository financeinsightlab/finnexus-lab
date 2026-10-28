// lib/finance/ratios.ts — Financial ratio analysis engine (18 ratios +
// DuPont). Formulas are the standard textbook set the legacy component used;
// the engine's added value is validation and CONSISTENCY warnings: the 15
// inputs are independent fields, so users can (and do) enter statements
// whose components exceed their totals or that don't balance — ratios then
// describe a company that cannot exist. Every ratio is null (not NaN/∞)
// when its denominator is zero or the ratio is not meaningful (e.g. ROE on
// negative equity). Units: consistent currency amounts; margins in %.

export interface RatioInputs {
    revenue: number; cogs: number; ebitda: number; dep: number; ebit: number; interest: number; pat: number;
    cash: number; inventory: number; receivables: number; currentAssets: number; currentLiabilities: number;
    payables: number; totalDebt: number; equity: number; totalAssets: number;
}

export interface RatioResult {
    errors: string[]; warnings: string[];
    currentRatio: number | null; quickRatio: number | null; cashRatio: number | null;
    grossMarginPct: number | null; ebitdaMarginPct: number | null; operatingMarginPct: number | null;
    netMarginPct: number | null; roaPct: number | null; roePct: number | null; rocePct: number | null;
    capitalEmployed: number;
    debtEquity: number | null; debtRatio: number | null; interestCoverage: number | null;
    inventoryDays: number | null; receivableDays: number | null; payableDays: number | null;
    cashConversionCycleDays: number | null; assetTurnover: number | null;
    dupont: { netMarginPct: number | null; assetTurnover: number | null; equityMultiplier: number | null; roePct: number | null } | null;
}

export const RATIO_DEFAULTS: RatioInputs = {
    revenue: 500, cogs: 300, ebitda: 85, dep: 20, ebit: 65, interest: 18, pat: 34,
    cash: 25, inventory: 60, receivables: 75, currentAssets: 200, currentLiabilities: 130,
    payables: 55, totalDebt: 160, equity: 190, totalAssets: 430,
};

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const div = (a: number, b: number): number | null => (b === 0 || !Number.isFinite(a / b) ? null : a / b);

export function runRatios(i: RatioInputs): RatioResult {
    const errors: string[] = []; const warnings: string[] = [];
    for (const [k, v] of Object.entries(i)) if (!fin(v)) errors.push(`${k} must be a finite number.`);
    if (!errors.length) {
        if (i.revenue < 0 || i.totalAssets < 0 || i.currentAssets < 0 || i.currentLiabilities < 0) {
            errors.push('Revenue and balance-sheet totals cannot be negative.');
        }
    }
    if (errors.length) {
        return {
            errors, warnings, currentRatio: null, quickRatio: null, cashRatio: null, grossMarginPct: null,
            ebitdaMarginPct: null, operatingMarginPct: null, netMarginPct: null, roaPct: null, roePct: null,
            rocePct: null, capitalEmployed: 0, debtEquity: null, debtRatio: null, interestCoverage: null,
            inventoryDays: null, receivableDays: null, payableDays: null, cashConversionCycleDays: null,
            assetTurnover: null, dupont: null,
        };
    }

    const negEquity = i.equity <= 0;
    const capitalEmployed = i.totalAssets - i.currentLiabilities;
    const pct = (v: number | null) => (v === null ? null : v * 100);

    const invDays = i.cogs > 0 ? (i.inventory / i.cogs) * 365 : null;
    const recDays = i.revenue > 0 ? (i.receivables / i.revenue) * 365 : null;
    const payDays = i.cogs > 0 ? (i.payables / i.cogs) * 365 : null;
    const assetTurnover = div(i.revenue, i.totalAssets);
    const netMargin = div(i.pat, i.revenue);
    const roe = negEquity ? null : div(i.pat, i.equity);
    const eqMult = negEquity ? null : div(i.totalAssets, i.equity);

    // Consistency diagnostics — the statements must describe one company.
    if (i.inventory > i.currentAssets) warnings.push('Inventory exceeds total current assets — components cannot exceed their total; check the balance-sheet inputs.');
    if (i.cash > i.currentAssets) warnings.push('Cash exceeds total current assets — check the inputs.');
    if (i.receivables > i.currentAssets) warnings.push('Receivables exceed total current assets — check the inputs.');
    if (i.payables > i.currentLiabilities) warnings.push('Payables exceed total current liabilities — check the inputs.');
    const claimsGap = i.totalAssets - (i.equity + i.totalDebt + i.currentLiabilities);
    if (claimsGap < -0.005 * Math.max(1, i.totalAssets)) {
        warnings.push('Equity + debt + current liabilities exceed total assets — these statements cannot balance; at least one input is wrong.');
    }
    if (Math.abs(i.ebitda - i.dep - i.ebit) > 0.02 * Math.max(1, Math.abs(i.ebitda))) {
        warnings.push('EBITDA − depreciation ≠ EBIT in your inputs — the three profit lines are inconsistent.');
    }
    if (negEquity) warnings.push('Equity is zero or negative — ROE, D/E and the DuPont multiplier are not meaningful and are shown as such.');
    if (i.interest === 0 && i.totalDebt > 0) warnings.push('Debt is outstanding but interest is zero — interest coverage is shown as not applicable.');

    return {
        errors: [], warnings,
        currentRatio: div(i.currentAssets, i.currentLiabilities),
        quickRatio: div(i.currentAssets - i.inventory, i.currentLiabilities),
        cashRatio: div(i.cash, i.currentLiabilities),
        grossMarginPct: pct(div(i.revenue - i.cogs, i.revenue)),
        ebitdaMarginPct: pct(div(i.ebitda, i.revenue)),
        operatingMarginPct: pct(div(i.ebit, i.revenue)),
        netMarginPct: pct(netMargin),
        roaPct: pct(div(i.pat, i.totalAssets)),
        roePct: pct(roe),
        rocePct: pct(div(i.ebit, capitalEmployed)),
        capitalEmployed,
        debtEquity: negEquity ? null : div(i.totalDebt, i.equity),
        debtRatio: div(i.totalDebt, i.totalAssets),
        interestCoverage: i.interest === 0 ? null : div(i.ebit, i.interest),
        inventoryDays: invDays, receivableDays: recDays, payableDays: payDays,
        cashConversionCycleDays: invDays !== null && recDays !== null && payDays !== null ? invDays + recDays - payDays : null,
        assetTurnover,
        dupont: roe === null ? null : {
            netMarginPct: pct(netMargin), assetTurnover, equityMultiplier: eqMult, roePct: pct(roe),
        },
    };
}

const KEYS: Array<keyof RatioInputs> = [
    'revenue', 'cogs', 'ebitda', 'dep', 'ebit', 'interest', 'pat', 'cash', 'inventory',
    'receivables', 'currentAssets', 'currentLiabilities', 'payables', 'totalDebt', 'equity', 'totalAssets',
];
export function parseRatioInputs(raw: Record<string, unknown> | null | undefined, base: RatioInputs = RATIO_DEFAULTS): RatioInputs {
    const out = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of KEYS) { const v = raw[k as string]; const n = typeof v === 'string' ? Number(v) : v; if (fin(n)) out[k] = n; }
    return out;
}
export function ratioInputsToQuery(i: RatioInputs): string {
    const p = new URLSearchParams();
    for (const k of KEYS) p.set(k, String(i[k]));
    return p.toString();
}
