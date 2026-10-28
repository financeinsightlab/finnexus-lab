// lib/finance/wacc.ts — Weighted Average Cost of Capital engine.
//
// Pure, framework-free domain logic for /tools/wacc-calculator, designed to
// feed lib/finance/dcf.ts. All rates are fractions internally; the UI
// converts percentages once at the boundary.
//
// Methods implemented:
//   Cost of equity — CAPM with (a) a directly-entered levered beta, or
//   (b) a peer unlevered beta relevered at the capital structure in use
//   (Hamada):  βU = βL / [1 + (1−t)·D/E],  βL = βU · [1 + (1−t)·D/E];
//   (c) the build-up method for private companies:
//       Re = Rf + ERP + size premium + company-specific premium (+ CRP).
//   Optional size / CSRP / country-risk add-ons also apply to CAPM.
//   Cost of debt — direct pre-tax Rd, or Rf + credit spread; after tax ×(1−t).
//   Weights — D/E ratio, market values, or target debt weight. Professional
//   practice is TARGET MARKET-VALUE weights (using the valuation's own
//   output as E is circular); the modes exist so users can express that.
//   WACC = wE·Re + wD·Rd·(1−t).
//
// Disclosed simplifications: Hamada relevering assumes a permanent debt
// level and a riskless tax shield (Miles–Ezzell/Harris–Pringle variants are
// not offered); Rd is held constant across the leverage sweep (in reality
// credit spreads widen with leverage, which would raise the swept WACC at
// high D/E); preferred stock and other capital tranches are not modelled.

export type BetaMode = 'levered' | 'relevered' | 'buildup';
export type CostOfDebtMode = 'direct' | 'spread';
export type WeightsMode = 'de' | 'values' | 'target';

export interface WaccInputs {
    riskFreeRate: number;
    /** Market/equity risk premium (ERP in build-up mode). */
    marketRiskPremium: number;
    betaMode: BetaMode;
    leveredBeta: number;
    unleveredBeta: number;
    sizePremium: number;
    companySpecificPremium: number;
    countryRiskPremium: number;
    costOfDebtMode: CostOfDebtMode;
    preTaxCostOfDebt: number;
    creditSpread: number;
    taxRate: number;
    weightsMode: WeightsMode;
    debtEquityRatio: number;
    marketValueEquity: number;
    marketValueDebt: number;
    targetDebtWeight: number;
}

export interface SweepRow {
    debtEquityRatio: number;
    /** Null in build-up mode (no beta to relever). */
    leveredBeta: number | null;
    costOfEquity: number;
    weightEquity: number;
    weightDebt: number;
    wacc: number;
}

export interface WaccResult {
    errors: string[];
    warnings: string[];
    costOfEquity: number | null;
    /** Beta actually used in CAPM (after relevering, if applicable). */
    leveredBetaUsed: number | null;
    /** Anchored unlevered beta (derived or entered); null in build-up mode. */
    unleveredBeta: number | null;
    preTaxCostOfDebt: number | null;
    afterTaxCostOfDebt: number | null;
    weightEquity: number | null;
    weightDebt: number | null;
    /** D/E implied by the chosen weights (the relevering anchor). */
    debtEquityRatio: number | null;
    wacc: number | null;
    sweep: SweepRow[];
}

export const WACC_DEFAULTS: WaccInputs = {
    riskFreeRate: 0.068,
    marketRiskPremium: 0.08,
    betaMode: 'levered',
    leveredBeta: 1.2,
    unleveredBeta: 0.85,
    sizePremium: 0,
    companySpecificPremium: 0,
    countryRiskPremium: 0,
    costOfDebtMode: 'direct',
    preTaxCostOfDebt: 0.095,
    creditSpread: 0.027,
    taxRate: 0.25,
    weightsMode: 'de',
    debtEquityRatio: 0.5,
    marketValueEquity: 1000,
    marketValueDebt: 500,
    targetDebtWeight: 1 / 3,
};

export const DEFAULT_SWEEP_POINTS = [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3];

const isFiniteNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const pctTxt = (f: number) => `${(f * 100).toFixed(2)}%`;

/** Hamada: strip leverage from a peer's observed (levered) beta. */
export function unleverBeta(leveredBeta: number, debtEquityRatio: number, taxRate: number): number {
    return leveredBeta / (1 + (1 - taxRate) * debtEquityRatio);
}

/** Hamada: re-apply leverage at a target capital structure. */
export function releverBeta(unleveredBeta: number, debtEquityRatio: number, taxRate: number): number {
    return unleveredBeta * (1 + (1 - taxRate) * debtEquityRatio);
}

/** Capital-structure weights for the selected mode; null when undefined. */
export function capitalWeights(input: WaccInputs): { wE: number; wD: number; de: number } | null {
    if (input.weightsMode === 'de') {
        const de = input.debtEquityRatio;
        if (!Number.isFinite(de) || de < 0) return null;
        return { wE: 1 / (1 + de), wD: de / (1 + de), de };
    }
    if (input.weightsMode === 'values') {
        const { marketValueEquity: e, marketValueDebt: d } = input;
        if (!Number.isFinite(e) || !Number.isFinite(d) || e < 0 || d < 0 || e + d <= 0 || e === 0) return null;
        return { wE: e / (e + d), wD: d / (e + d), de: d / e };
    }
    const wD = input.targetDebtWeight;
    if (!Number.isFinite(wD) || wD < 0 || wD >= 1) return null;
    return { wE: 1 - wD, wD, de: wD / (1 - wD) };
}

export function validateWaccInputs(input: WaccInputs): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];
    const numeric: Array<[string, number]> = [
        ['riskFreeRate', input.riskFreeRate], ['marketRiskPremium', input.marketRiskPremium],
        ['leveredBeta', input.leveredBeta], ['unleveredBeta', input.unleveredBeta],
        ['sizePremium', input.sizePremium], ['companySpecificPremium', input.companySpecificPremium],
        ['countryRiskPremium', input.countryRiskPremium], ['preTaxCostOfDebt', input.preTaxCostOfDebt],
        ['creditSpread', input.creditSpread], ['taxRate', input.taxRate],
        ['debtEquityRatio', input.debtEquityRatio], ['marketValueEquity', input.marketValueEquity],
        ['marketValueDebt', input.marketValueDebt], ['targetDebtWeight', input.targetDebtWeight],
    ];
    for (const [name, value] of numeric) {
        if (!isFiniteNum(value)) errors.push(`${name} must be a finite number.`);
    }
    if (errors.length) return { errors, warnings };

    if (input.taxRate < 0 || input.taxRate >= 1) errors.push('Tax rate must be between 0% and 100%.');
    if (input.weightsMode === 'de' && input.debtEquityRatio < 0) errors.push('D/E ratio cannot be negative.');
    if (input.weightsMode === 'values') {
        if (input.marketValueEquity < 0 || input.marketValueDebt < 0) errors.push('Market values cannot be negative.');
        if (input.marketValueEquity === 0) errors.push('Market value of equity must be greater than zero (WACC weights and beta relevering need an equity base).');
        if (input.marketValueEquity + input.marketValueDebt <= 0) errors.push('Total capital (E + D) must be greater than zero.');
    }
    if (input.weightsMode === 'target' && (input.targetDebtWeight < 0 || input.targetDebtWeight >= 1)) {
        errors.push('Target debt weight must be at least 0% and below 100%.');
    }
    const rd = input.costOfDebtMode === 'direct' ? input.preTaxCostOfDebt : input.riskFreeRate + input.creditSpread;
    if (rd < 0) errors.push('Pre-tax cost of debt cannot be negative.');

    const beta = input.betaMode === 'relevered' ? input.unleveredBeta : input.leveredBeta;
    if (input.betaMode !== 'buildup') {
        if (beta < 0) warnings.push('Negative beta implies the stock moves against the market — rare outside gold/defensives; check the source regression.');
        if (beta > 3) warnings.push('Beta above 3 is extreme — check whether the peer regression is stale or the peer is distressed.');
    }
    if (input.marketRiskPremium <= 0) warnings.push('A non-positive market risk premium contradicts the CAPM premise — check the ERP source.');
    if (input.riskFreeRate < 0) warnings.push('Negative risk-free rate entered (seen in some EUR/JPY eras) — confirm this matches the valuation currency and date.');
    if (input.costOfDebtMode === 'direct' && rd < input.riskFreeRate) {
        warnings.push(`Pre-tax cost of debt (${pctTxt(rd)}) is below the risk-free rate (${pctTxt(input.riskFreeRate)}) — an implied negative credit spread; confirm the borrowing rate.`);
    }
    if (input.creditSpread < 0 && input.costOfDebtMode === 'spread') warnings.push('Negative credit spread — only top-rated sovereign-linked borrowers price through the sovereign; double-check.');
    if ([input.sizePremium, input.companySpecificPremium, input.countryRiskPremium].some((p) => p < 0)) {
        warnings.push('A negative risk premium reduces the cost of equity — only defensible with explicit evidence; usually these are ≥ 0.');
    }
    if (input.taxRate > 0.4) warnings.push('Tax rate above 40% — confirm surcharge/cess treatment for the subject company.');
    return { errors, warnings };
}

function costOfEquityFor(input: WaccInputs, leveredBeta: number | null): number {
    const premiums = input.sizePremium + input.companySpecificPremium + input.countryRiskPremium;
    if (input.betaMode === 'buildup') return input.riskFreeRate + input.marketRiskPremium + premiums;
    return input.riskFreeRate + (leveredBeta ?? 0) * input.marketRiskPremium + premiums;
}

/** Leverage sweep with Hamada relevering around the anchored unlevered beta. */
export function debtEquitySweep(
    input: WaccInputs,
    unleveredBetaAnchor: number | null,
    baseCostOfEquity: number,
    afterTaxCostOfDebt: number,
    points: number[] = DEFAULT_SWEEP_POINTS,
): SweepRow[] {
    return points.map((de) => {
        const wE = 1 / (1 + de);
        const wD = de / (1 + de);
        if (input.betaMode === 'buildup' || unleveredBetaAnchor === null) {
            return { debtEquityRatio: de, leveredBeta: null, costOfEquity: baseCostOfEquity, weightEquity: wE, weightDebt: wD, wacc: wE * baseCostOfEquity + wD * afterTaxCostOfDebt };
        }
        const betaL = releverBeta(unleveredBetaAnchor, de, input.taxRate);
        const re = costOfEquityFor(input, betaL);
        return { debtEquityRatio: de, leveredBeta: betaL, costOfEquity: re, weightEquity: wE, weightDebt: wD, wacc: wE * re + wD * afterTaxCostOfDebt };
    });
}

const empty = (errors: string[], warnings: string[]): WaccResult => ({
    errors, warnings, costOfEquity: null, leveredBetaUsed: null, unleveredBeta: null,
    preTaxCostOfDebt: null, afterTaxCostOfDebt: null, weightEquity: null, weightDebt: null,
    debtEquityRatio: null, wacc: null, sweep: [],
});

/** Compute WACC. Pure and total: invalid input → errors, never throws. */
export function runWacc(input: WaccInputs): WaccResult {
    const { errors, warnings } = validateWaccInputs(input);
    if (errors.length) return empty(errors, warnings);

    const weights = capitalWeights(input);
    if (!weights) return empty(['Capital structure weights could not be derived from the inputs.'], warnings);
    const { wE, wD, de } = weights;

    const rd = input.costOfDebtMode === 'direct' ? input.preTaxCostOfDebt : input.riskFreeRate + input.creditSpread;
    const rdAt = rd * (1 - input.taxRate);

    let betaUsed: number | null = null;
    let betaU: number | null = null;
    if (input.betaMode === 'levered') {
        betaUsed = input.leveredBeta;
        betaU = unleverBeta(input.leveredBeta, de, input.taxRate);
    } else if (input.betaMode === 'relevered') {
        betaU = input.unleveredBeta;
        betaUsed = releverBeta(input.unleveredBeta, de, input.taxRate);
    }

    const re = costOfEquityFor(input, betaUsed);
    const wacc = wE * re + wD * rdAt;
    if (!Number.isFinite(wacc) || !Number.isFinite(re)) {
        return empty(['Calculation produced a non-finite value — check extreme inputs.'], warnings);
    }

    const outWarnings = [...warnings];
    if (wacc < 0.02 || wacc > 0.40) outWarnings.push(`WACC of ${pctTxt(wacc)} sits outside the usual 2–40% sanity band — re-examine Rf, beta and premiums before use in a DCF.`);
    if (re < rdAt) outWarnings.push('Cost of equity is below the after-tax cost of debt — economically unusual (equity is junior to debt); check beta/premiums or the borrowing rate.');
    if (de > 3) outWarnings.push(`D/E of ${de.toFixed(2)}× is distressed-level leverage; a constant Rd and perpetual tax shield (Hamada) are heroic assumptions here.`);
    if (input.betaMode === 'levered' && de > 0) {
        outWarnings.push('Direct levered beta is only valid at the leverage it was estimated at. If your target structure differs, use the peer (unlevered β) mode so beta relevers consistently.');
    }

    return {
        errors: [], warnings: outWarnings,
        costOfEquity: re, leveredBetaUsed: betaUsed, unleveredBeta: betaU,
        preTaxCostOfDebt: rd, afterTaxCostOfDebt: rdAt,
        weightEquity: wE, weightDebt: wD, debtEquityRatio: de,
        wacc, sweep: debtEquitySweep(input, betaU, re, rdAt),
    };
}

// ── Serialisation (share links / autosave), same pattern as the DCF engine ──

const NUMERIC_KEYS: Array<keyof WaccInputs> = [
    'riskFreeRate', 'marketRiskPremium', 'leveredBeta', 'unleveredBeta', 'sizePremium',
    'companySpecificPremium', 'countryRiskPremium', 'preTaxCostOfDebt', 'creditSpread',
    'taxRate', 'debtEquityRatio', 'marketValueEquity', 'marketValueDebt', 'targetDebtWeight',
];

export function parseWaccInputs(raw: Record<string, unknown> | null | undefined): WaccInputs {
    const out: WaccInputs = { ...WACC_DEFAULTS };
    if (!raw || typeof raw !== 'object') return out;
    for (const key of NUMERIC_KEYS) {
        const v = raw[key as string];
        const n = typeof v === 'string' ? Number(v) : v;
        if (isFiniteNum(n)) (out as unknown as Record<string, number>)[key] = n;
    }
    if (raw.betaMode === 'levered' || raw.betaMode === 'relevered' || raw.betaMode === 'buildup') out.betaMode = raw.betaMode;
    if (raw.costOfDebtMode === 'direct' || raw.costOfDebtMode === 'spread') out.costOfDebtMode = raw.costOfDebtMode;
    if (raw.weightsMode === 'de' || raw.weightsMode === 'values' || raw.weightsMode === 'target') out.weightsMode = raw.weightsMode;
    return out;
}

export function waccInputsToQuery(input: WaccInputs): string {
    const params = new URLSearchParams();
    for (const key of NUMERIC_KEYS) params.set(key, String(input[key]));
    params.set('betaMode', input.betaMode);
    params.set('costOfDebtMode', input.costOfDebtMode);
    params.set('weightsMode', input.weightsMode);
    return params.toString();
}
