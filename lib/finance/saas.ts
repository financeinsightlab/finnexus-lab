// lib/finance/saas.ts — SaaS unit-economics engine (LTV / CAC / payback).
// Fixes vs legacy: the cumulative cohort curve now includes month-0 gross
// profit (legacy excluded it, understating cumulative profit by one month
// vs its own closed-form LTV); 0% churn is modelled honestly (infinite
// expected life → LTV reported as null with a capped-horizon figure)
// instead of a silent 0.1% floor; churn-adjusted payback (first month the
// decaying cohort repays CAC) reported alongside the simple CAC÷GP rule;
// optional monthly discounting for NPV-of-LTV. All rates are fractions.

export interface SaasInputs {
    arpuMonthly: number; grossMargin: number; monthlyChurn: number; cac: number;
    horizonMonths: number; monthlyDiscountRate: number;
}

export interface SaasMonth {
    month: number; survivalRate: number; expectedRevenue: number; expectedGrossProfit: number;
    discountedGrossProfit: number; cumulativeNet: number;
}

export interface SaasResult {
    errors: string[]; warnings: string[];
    monthlyGrossProfit: number | null;
    /** 1/churn; null when churn = 0 (infinite expected life). */
    expectedLifetimeMonths: number | null;
    /** Undiscounted closed-form LTV = GP/churn; null when churn = 0. */
    ltv: number | null;
    /** NPV of expected gross profit at the monthly discount rate. */
    discountedLtv: number | null;
    ltvCacRatio: number | null;
    /** CAC ÷ monthly GP (industry shorthand; ignores churn decay). */
    simplePaybackMonths: number | null;
    /** First month cumulative expected GP ≥ CAC; null if never within horizon. */
    churnAdjustedPaybackMonth: number | null;
    series: SaasMonth[];
}

export const SAAS_DEFAULTS: SaasInputs = {
    arpuMonthly: 100, grossMargin: 0.85, monthlyChurn: 0.025, cac: 400,
    horizonMonths: 36, monthlyDiscountRate: 0,
};

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function runSaas(input: SaasInputs): SaasResult {
    const errors: string[] = []; const warnings: string[] = [];
    const nums: Array<[string, number]> = Object.entries(input) as Array<[string, number]>;
    for (const [k, v] of nums) if (!fin(v)) errors.push(`${k} must be a finite number.`);
    if (!errors.length) {
        if (input.arpuMonthly < 0) errors.push('ARPU cannot be negative.');
        if (input.cac < 0) errors.push('CAC cannot be negative.');
        if (input.monthlyChurn < 0 || input.monthlyChurn > 1) errors.push('Monthly churn must be between 0% and 100%.');
        if (input.grossMargin < 0 || input.grossMargin > 1) errors.push('Gross margin must be between 0% and 100%.');
        if (!Number.isInteger(input.horizonMonths) || input.horizonMonths < 1 || input.horizonMonths > 120) errors.push('Horizon must be a whole number of months between 1 and 120.');
        if (input.monthlyDiscountRate < 0) errors.push('Discount rate cannot be negative.');
    }
    const empty: SaasResult = {
        errors, warnings, monthlyGrossProfit: null, expectedLifetimeMonths: null, ltv: null,
        discountedLtv: null, ltvCacRatio: null, simplePaybackMonths: null,
        churnAdjustedPaybackMonth: null, series: [],
    };
    if (errors.length) return empty;

    const gp = input.arpuMonthly * input.grossMargin;
    const c = input.monthlyChurn;
    const d = input.monthlyDiscountRate;

    const lifetime = c > 0 ? 1 / c : null;
    const ltv = c > 0 ? gp / c : null;
    // Discounted LTV: Σ_{t=0..∞} GP·((1−c)/(1+d))^t = GP / (1 − (1−c)/(1+d)) when ratio < 1
    const ratio = (1 - c) / (1 + d);
    const discountedLtv = ratio < 1 ? gp / (1 - ratio) : null;

    const series: SaasMonth[] = [];
    let cum = -input.cac;
    let adjustedPayback: number | null = null;
    for (let t = 0; t <= input.horizonMonths; t++) {
        const survival = Math.pow(1 - c, t);
        const egp = gp * survival;
        cum += egp;
        if (adjustedPayback === null && cum >= 0) adjustedPayback = t;
        series.push({
            month: t, survivalRate: survival, expectedRevenue: input.arpuMonthly * survival,
            expectedGrossProfit: egp, discountedGrossProfit: egp / Math.pow(1 + d, t), cumulativeNet: cum,
        });
    }

    if (c === 0) warnings.push('Churn is 0% — expected lifetime is infinite, so closed-form LTV is undefined. Judge the capped-horizon cumulative curve instead, and question any 0% churn assumption.');
    if (gp <= 0) warnings.push('Monthly gross profit is zero or negative — CAC can never be recovered at these inputs.');
    if (input.cac === 0) warnings.push('CAC is 0 — ratios are not meaningful; include fully-loaded sales & marketing cost per acquired customer.');
    if (adjustedPayback === null && gp > 0) warnings.push(`Cohort does not repay CAC within the ${input.horizonMonths}-month horizon.`);

    return {
        errors: [], warnings, monthlyGrossProfit: gp, expectedLifetimeMonths: lifetime, ltv,
        discountedLtv, ltvCacRatio: ltv !== null && input.cac > 0 ? ltv / input.cac : null,
        simplePaybackMonths: gp > 0 ? input.cac / gp : null,
        churnAdjustedPaybackMonth: adjustedPayback, series,
    };
}

const KEYS: Array<keyof SaasInputs> = ['arpuMonthly', 'grossMargin', 'monthlyChurn', 'cac', 'horizonMonths', 'monthlyDiscountRate'];
export function parseSaasInputs(raw: Record<string, unknown> | null | undefined, base: SaasInputs = SAAS_DEFAULTS): SaasInputs {
    const out = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of KEYS) { const v = raw[k as string]; const n = typeof v === 'string' ? Number(v) : v; if (fin(n)) (out as unknown as Record<string, number>)[k] = n; }
    out.horizonMonths = Math.min(120, Math.max(1, Math.round(out.horizonMonths) || 36));
    return out;
}
export function saasInputsToQuery(i: SaasInputs): string {
    const p = new URLSearchParams();
    for (const k of KEYS) p.set(k, String(i[k]));
    return p.toString();
}
