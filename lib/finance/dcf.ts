// lib/finance/dcf.ts — Discounted Cash Flow (FCFF) valuation engine.
//
// Pure, framework-free domain logic for the DCF tool
// (/tools/dcf-valuation-model). The React component owns input state and
// rendering; every number it displays comes from here so the maths can be
// unit-tested against independently derived closed forms (see dcf.test.ts)
// and reused (CSV export, sensitivity, scenarios) without duplication.
//
// Model (unlevered free cash flow / FCFF), for t = 1..N:
//   Rev_t    = Rev_{t-1} × (1 + g_t)         g_t may fade linearly to g_term
//   EBITDA   = Rev × margin
//   EBIT     = EBITDA − D&A                  D&A  = Rev × da%
//   NOPAT    = EBIT − Tax                    Tax  = EBIT × taxRate
//   UFCF     = NOPAT + D&A − Capex − ΔNWC    Capex = Rev × capex%
//                                            NWC_t = Rev_t × nwc%; ΔNWC = NWC_t − NWC_{t-1}
//   PV_t     = UFCF_t × (1+WACC)^-(t − adj)  adj = 0.5 with mid-year discounting, else 0
//   TV (Gordon) = UFCF_N × (1 + g) / (WACC − g), discounted at (N − adj)
//   TV (exit)   = EBITDA_N × EV/EBITDA multiple (cross-check only)
//   EV = Σ PV_t + PV(TV);  Equity = EV + Cash − Debt;  Price = Equity / Shares
//
// Conventions & disclosures:
// - All rates are fractions inside the engine (0.10 = 10%); the UI converts
//   percentages exactly once at the boundary.
// - Money amounts are in the currency unit of the inputs ("actuals"). The
//   engine is currency-agnostic; currency is a presentation label only.
// - Negative EBIT: with `taxBenefitOnLosses: false` (default) no tax credit
//   is recognised in loss years and there is no loss carry-forward. This is
//   a disclosed simplification suitable for a single-entity view.
// - Years are annual periods. No stub-period / partial-year adjustment.
// - IEEE-754 doubles are used deliberately: at DCF magnitudes (< 1e13,
//   < 40 periods) relative error stays below 1e-12, far inside presentation
//   rounding. Non-finite intermediates are surfaced as validation errors.

export interface DcfInputs {
    /** Latest actual (LTM / Yr-0) revenue, in currency units. Must be > 0. */
    revenue0: number;
    /** Revenue growth in the explicit period, fraction (0.15 = 15%). */
    revenueGrowth: number;
    /** EBITDA margin, fraction of revenue. */
    ebitdaMargin: number;
    /** Depreciation & amortisation, fraction of revenue. */
    daPctRevenue: number;
    /** Cash tax rate on EBIT, fraction in [0, 1). */
    taxRate: number;
    /** Capital expenditure, fraction of revenue. */
    capexPctRevenue: number;
    /** Net working capital level, fraction of revenue (ΔNWC is derived). */
    nwcPctRevenue: number;
    /** Perpetual growth rate after the explicit period. Must be < WACC. */
    terminalGrowth: number;
    /** Discount rate (WACC for FCFF), fraction > 0. */
    wacc: number;
    /** Cash & equivalents added in the equity bridge. */
    cash: number;
    /** Interest-bearing debt deducted in the equity bridge. */
    debt: number;
    /** Fully diluted shares outstanding. Must be > 0. */
    shares: number;
    /** Explicit forecast horizon, integer years 3–10. */
    forecastYears: number;
    /** Apply the mid-year discounting convention (flows mid-period). */
    midYearDiscounting: boolean;
    /** Fade revenue growth linearly from `revenueGrowth` to `terminalGrowth`
     *  across the explicit period (year N grows at terminalGrowth). */
    growthFade: boolean;
    /** Recognise an immediate tax credit in EBIT-negative years. */
    taxBenefitOnLosses: boolean;
    /** EV/EBITDA exit multiple on final-year EBITDA (cross-check). > 0. */
    exitMultiple: number;
}

export interface DcfYear {
    year: number;
    growthRate: number;
    revenue: number;
    ebitda: number;
    da: number;
    ebit: number;
    tax: number;
    nopat: number;
    capex: number;
    nwcLevel: number;
    deltaNwc: number;
    ufcf: number;
    discountFactor: number;
    presentValue: number;
}

export interface DcfResult {
    /** Hard errors — when non-empty, all valuation outputs are null. */
    errors: string[];
    /** Soft diagnostics that don't block the result. */
    warnings: string[];
    /** Yr-0 context column (actuals). Never included in PV. */
    baseYear: {
        revenue: number;
        ebitda: number;
        da: number;
        ebit: number;
        tax: number;
        nopat: number;
        capex: number;
        nwcLevel: number;
        ufcf: number;
    } | null;
    years: DcfYear[];
    sumPvExplicit: number | null;
    /** Gordon-growth terminal value (undiscounted, at end of year N). */
    terminalValue: number | null;
    pvTerminalValue: number | null;
    enterpriseValue: number | null;
    equityValue: number | null;
    impliedSharePrice: number | null;
    /** PV of terminal value as % of EV (0–100+). Key speculation gauge. */
    terminalValueSharePct: number | null;
    /** Exit-multiple cross-checks (present whenever computable). */
    exitMultipleCheck: {
        terminalValueExit: number;
        pvTerminalValueExit: number;
        enterpriseValueExit: number;
        impliedSharePriceExit: number;
        /** Perpetuity growth implied by the exit multiple. */
        impliedTerminalGrowth: number;
        /** EV/EBITDA multiple implied by the Gordon TV on final EBITDA. */
        impliedExitMultiple: number;
    } | null;
    impliedMultiples: { evToRevenue0: number; evToEbitda0: number } | null;
}

export const DCF_DEFAULTS: DcfInputs = {
    revenue0: 10_000_000,
    revenueGrowth: 0.15,
    ebitdaMargin: 0.20,
    daPctRevenue: 0.05,
    taxRate: 0.21,
    capexPctRevenue: 0.05,
    nwcPctRevenue: 0.0,
    terminalGrowth: 0.025,
    wacc: 0.10,
    cash: 2_000_000,
    debt: 1_500_000,
    shares: 1_000_000,
    forecastYears: 5,
    midYearDiscounting: false,
    growthFade: false,
    taxBenefitOnLosses: false,
    exitMultiple: 10,
};

const isFiniteNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

/** Validate inputs. Errors block valuation; warnings flag implausible-but-legal values. */
export function validateDcfInputs(input: DcfInputs): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];
    const fields: Array<[string, number]> = [
        ['revenue0', input.revenue0], ['revenueGrowth', input.revenueGrowth],
        ['ebitdaMargin', input.ebitdaMargin], ['daPctRevenue', input.daPctRevenue],
        ['taxRate', input.taxRate], ['capexPctRevenue', input.capexPctRevenue],
        ['nwcPctRevenue', input.nwcPctRevenue], ['terminalGrowth', input.terminalGrowth],
        ['wacc', input.wacc], ['cash', input.cash], ['debt', input.debt],
        ['shares', input.shares], ['exitMultiple', input.exitMultiple],
    ];
    for (const [name, value] of fields) {
        if (!isFiniteNum(value)) errors.push(`${name} must be a finite number.`);
    }
    if (errors.length) return { errors, warnings };

    if (input.revenue0 <= 0) errors.push('Revenue (Yr 0) must be greater than zero.');
    if (input.shares <= 0) errors.push('Shares outstanding must be greater than zero.');
    if (input.wacc <= 0) errors.push('WACC must be greater than zero.');
    if (input.terminalGrowth >= input.wacc) {
        errors.push(`Terminal growth (${pct(input.terminalGrowth)}) must be strictly below WACC (${pct(input.wacc)}) — otherwise the Gordon terminal value is infinite.`);
    }
    if (input.taxRate < 0 || input.taxRate >= 1) errors.push('Tax rate must be between 0% and 100%.');
    if (input.revenueGrowth <= -1) errors.push('Revenue growth must be greater than −100%.');
    if (input.terminalGrowth <= -1) errors.push('Terminal growth must be greater than −100%.');
    if (!Number.isInteger(input.forecastYears) || input.forecastYears < 3 || input.forecastYears > 10) {
        errors.push('Forecast years must be a whole number between 3 and 10.');
    }
    if (input.exitMultiple <= 0) errors.push('Exit EV/EBITDA multiple must be greater than zero.');
    if (input.cash < 0) errors.push('Cash & equivalents cannot be negative (use Debt for overdrafts).');
    if (input.debt < 0) errors.push('Total debt cannot be negative.');

    if (input.ebitdaMargin > 1) warnings.push('EBITDA margin above 100% of revenue is implausible — check the input.');
    if (input.ebitdaMargin < 0) warnings.push('Negative EBITDA margin: the business is loss-making at operating level in every forecast year.');
    if (input.daPctRevenue < 0 || input.daPctRevenue > 0.5) warnings.push('D&A outside 0–50% of revenue is unusual — check the input.');
    if (input.capexPctRevenue < 0) warnings.push('Negative capex implies net asset sales every year — check the input.');
    if (input.nwcPctRevenue < 0) warnings.push('Negative NWC % means suppliers/customers fund the business (possible, e.g. marketplaces) — confirm this is intended.');
    if (input.terminalGrowth > 0.05) warnings.push('Terminal growth above 5% exceeds long-run nominal GDP growth for most economies — the terminal value will dominate.');
    if (input.wacc > 0.4) warnings.push('WACC above 40% is venture-style discounting; the explicit-period PVs will be small.');
    if (input.revenueGrowth > 1) warnings.push('Revenue growth above 100%/yr sustained over the whole forecast is aggressive.');

    return { errors, warnings };
}

function pct(fraction: number): string {
    return `${(fraction * 100).toFixed(2)}%`;
}

/** Growth applied in year t (1-based), honouring the optional linear fade. */
export function growthForYear(input: DcfInputs, t: number): number {
    if (!input.growthFade || input.forecastYears <= 1) return input.revenueGrowth;
    const frac = t / input.forecastYears;
    return input.revenueGrowth + (input.terminalGrowth - input.revenueGrowth) * frac;
}

function emptyResult(errors: string[], warnings: string[]): DcfResult {
    return {
        errors, warnings, baseYear: null, years: [],
        sumPvExplicit: null, terminalValue: null, pvTerminalValue: null,
        enterpriseValue: null, equityValue: null, impliedSharePrice: null,
        terminalValueSharePct: null, exitMultipleCheck: null, impliedMultiples: null,
    };
}

/** Run the FCFF DCF. Pure and total: invalid input → errors, never throws. */
export function runDcf(input: DcfInputs): DcfResult {
    const { errors, warnings } = validateDcfInputs(input);
    if (errors.length) return emptyResult(errors, warnings);

    const adj = input.midYearDiscounting ? 0.5 : 0;
    const taxFor = (ebit: number) =>
        ebit < 0 && !input.taxBenefitOnLosses ? 0 : ebit * input.taxRate;

    // Yr-0 actuals (context column; tax follows the same loss rule).
    const bEbitda = input.revenue0 * input.ebitdaMargin;
    const bDa = input.revenue0 * input.daPctRevenue;
    const bEbit = bEbitda - bDa;
    const bTax = taxFor(bEbit);
    const bNopat = bEbit - bTax;
    const bCapex = input.revenue0 * input.capexPctRevenue;
    const bNwc = input.revenue0 * input.nwcPctRevenue;
    const baseYear = {
        revenue: input.revenue0, ebitda: bEbitda, da: bDa, ebit: bEbit,
        tax: bTax, nopat: bNopat, capex: bCapex, nwcLevel: bNwc,
        ufcf: bNopat + bDa - bCapex, // ΔNWC undefined for the base year itself
    };

    const years: DcfYear[] = [];
    let revenue = input.revenue0;
    let prevNwc = bNwc;
    let sumPv = 0;

    for (let t = 1; t <= input.forecastYears; t++) {
        const g = growthForYear(input, t);
        revenue = revenue * (1 + g);
        const ebit = revenue * input.ebitdaMargin - revenue * input.daPctRevenue;
        const tax = taxFor(ebit);
        const nopat = ebit - tax;
        const da = revenue * input.daPctRevenue;
        const capex = revenue * input.capexPctRevenue;
        const nwcLevel = revenue * input.nwcPctRevenue;
        const deltaNwc = nwcLevel - prevNwc;
        const ufcf = nopat + da - capex - deltaNwc;
        const discountFactor = Math.pow(1 + input.wacc, -(t - adj));
        const presentValue = ufcf * discountFactor;
        if (!Number.isFinite(presentValue)) {
            return emptyResult(['Calculation produced a non-finite value — check extreme inputs (growth/WACC).'], warnings);
        }
        sumPv += presentValue;
        years.push({
            year: t, growthRate: g, revenue, ebitda: revenue * input.ebitdaMargin,
            da, ebit, tax, nopat, capex, nwcLevel, deltaNwc, ufcf,
            discountFactor, presentValue,
        });
        prevNwc = nwcLevel;
    }

    const last = years[years.length - 1];
    const terminalValue = (last.ufcf * (1 + input.terminalGrowth)) / (input.wacc - input.terminalGrowth);
    const tvDiscountFactor = Math.pow(1 + input.wacc, -(input.forecastYears - adj));
    const pvTerminalValue = terminalValue * tvDiscountFactor;
    if (!Number.isFinite(terminalValue) || !Number.isFinite(pvTerminalValue)) {
        return emptyResult(['Terminal value is non-finite — check WACC vs terminal growth.'], warnings);
    }

    const enterpriseValue = sumPv + pvTerminalValue;
    const equityValue = enterpriseValue + input.cash - input.debt;
    const impliedSharePrice = equityValue / input.shares;
    const terminalValueSharePct = enterpriseValue !== 0 ? (pvTerminalValue / enterpriseValue) * 100 : null;

    // Exit-multiple cross-checks.
    const tvExit = last.ebitda * input.exitMultiple;
    const pvTvExit = tvExit * tvDiscountFactor;
    const evExit = sumPv + pvTvExit;
    // Implied g from TV = FCF_N(1+g)/(WACC−g)  ⇒  g = (TV·WACC − FCF_N)/(TV + FCF_N)
    const impliedG = (tvExit * input.wacc - last.ufcf) / (tvExit + last.ufcf);
    const exitMultipleCheck = Number.isFinite(impliedG) && last.ebitda !== 0 ? {
        terminalValueExit: tvExit,
        pvTerminalValueExit: pvTvExit,
        enterpriseValueExit: evExit,
        impliedSharePriceExit: (evExit + input.cash - input.debt) / input.shares,
        impliedTerminalGrowth: impliedG,
        impliedExitMultiple: terminalValue / last.ebitda,
    } : null;

    const resultWarnings = [...warnings];
    if (terminalValueSharePct !== null && terminalValueSharePct > 85) {
        resultWarnings.push(`Terminal value is ${terminalValueSharePct.toFixed(0)}% of enterprise value — the valuation rests almost entirely on post-forecast assumptions.`);
    }
    if (equityValue < 0) resultWarnings.push('Implied equity value is negative (debt exceeds enterprise value plus cash). In practice equity has option value ≥ 0 — treat the per-share figure as "no residual value".');
    const negativeYears = years.filter((y) => y.ufcf < 0).map((y) => y.year);
    if (negativeYears.length) {
        resultWarnings.push(`Free cash flow is negative in year(s) ${negativeYears.join(', ')} — funding needs are not modelled in this tool.`);
    }
    if (years.some((y) => y.ebit < 0) && !input.taxBenefitOnLosses) {
        resultWarnings.push('Loss-making year(s): no tax credit recognised and losses are not carried forward (disclosed simplification).');
    }

    return {
        errors: [], warnings: resultWarnings, baseYear, years,
        sumPvExplicit: sumPv, terminalValue, pvTerminalValue,
        enterpriseValue, equityValue, impliedSharePrice,
        terminalValueSharePct, exitMultipleCheck,
        impliedMultiples: baseYear.ebitda !== 0 ? {
            evToRevenue0: enterpriseValue / input.revenue0,
            evToEbitda0: enterpriseValue / baseYear.ebitda,
        } : null,
    };
}

// ── Scenarios ────────────────────────────────────────────────────────────────

export interface ScenarioDeltas {
    /** Added to revenue growth (fraction points, e.g. −0.05 = −5pp). */
    growthDelta: number;
    /** Added to EBITDA margin (fraction points). */
    marginDelta: number;
    /** Added to WACC (fraction points). */
    waccDelta: number;
}

export interface ScenarioOutcome {
    name: 'Bear' | 'Base' | 'Bull';
    inputs: DcfInputs;
    result: DcfResult;
}

export const DEFAULT_SCENARIO_DELTAS: Record<'bear' | 'bull', ScenarioDeltas> = {
    bear: { growthDelta: -0.05, marginDelta: -0.03, waccDelta: 0.015 },
    bull: { growthDelta: 0.05, marginDelta: 0.03, waccDelta: -0.015 },
};

/** Apply scenario deltas to a copy of the base inputs (growth floored above −100%). */
export function applyScenario(base: DcfInputs, deltas: ScenarioDeltas): DcfInputs {
    return {
        ...base,
        revenueGrowth: Math.max(-0.999, base.revenueGrowth + deltas.growthDelta),
        ebitdaMargin: base.ebitdaMargin + deltas.marginDelta,
        wacc: base.wacc + deltas.waccDelta,
    };
}

export function runScenarios(
    base: DcfInputs,
    deltas: Record<'bear' | 'bull', ScenarioDeltas> = DEFAULT_SCENARIO_DELTAS,
): ScenarioOutcome[] {
    const bearIn = applyScenario(base, deltas.bear);
    const bullIn = applyScenario(base, deltas.bull);
    return [
        { name: 'Bear', inputs: bearIn, result: runDcf(bearIn) },
        { name: 'Base', inputs: base, result: runDcf(base) },
        { name: 'Bull', inputs: bullIn, result: runDcf(bullIn) },
    ];
}

// ── Sensitivity ──────────────────────────────────────────────────────────────

export interface SensitivityGrid {
    /** WACC values (rows), terminal growth values (columns), fractions. */
    waccValues: number[];
    growthValues: number[];
    /** Implied share price per [waccIdx][growthIdx]; null where invalid (g ≥ WACC). */
    sharePrice: (number | null)[][];
}

/**
 * Share-price sensitivity to the two terminal assumptions. Steps default to
 * ±2.0pp WACC (0.5pp steps) × ±1.0pp terminal growth (0.5pp steps) → 5×5.
 * Cells whose inputs are invalid are null — never extrapolated or fabricated.
 */
export function sensitivityGrid(
    base: DcfInputs,
    waccDeltas: number[] = [-0.02, -0.01, 0, 0.01, 0.02],
    growthDeltas: number[] = [-0.01, -0.005, 0, 0.005, 0.01],
): SensitivityGrid {
    const waccValues = waccDeltas.map((d) => base.wacc + d);
    const growthValues = growthDeltas.map((d) => base.terminalGrowth + d);
    const sharePrice = waccValues.map((w) =>
        growthValues.map((g) => {
            const r = runDcf({ ...base, wacc: w, terminalGrowth: g });
            return r.errors.length ? null : r.impliedSharePrice;
        }),
    );
    return { waccValues, growthValues, sharePrice };
}

// ── Serialisation (URL sharing / JSON import-export / saved analyses) ───────

const NUMERIC_KEYS: Array<keyof DcfInputs> = [
    'revenue0', 'revenueGrowth', 'ebitdaMargin', 'daPctRevenue', 'taxRate',
    'capexPctRevenue', 'nwcPctRevenue', 'terminalGrowth', 'wacc', 'cash',
    'debt', 'shares', 'forecastYears', 'exitMultiple',
];
const BOOLEAN_KEYS: Array<keyof DcfInputs> = ['midYearDiscounting', 'growthFade', 'taxBenefitOnLosses'];

/**
 * Parse untrusted partial input (URL params / imported JSON / localStorage)
 * over `base` (defaults unless a saved state is supplied — the WACC→DCF
 * handoff relies on this so a lone `?wacc=` overrides only the discount
 * rate). Unknown/garbage values are ignored field-by-field, so a tampered
 * share link degrades gracefully instead of breaking the model.
 */
export function parseDcfInputs(
    raw: Record<string, unknown> | null | undefined,
    base: DcfInputs = DCF_DEFAULTS,
): DcfInputs {
    const out: DcfInputs = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const key of NUMERIC_KEYS) {
        const v = raw[key as string];
        const n = typeof v === 'string' ? Number(v) : v;
        if (isFiniteNum(n)) (out as unknown as Record<string, number>)[key] = n;
    }
    for (const key of BOOLEAN_KEYS) {
        const v = raw[key as string];
        if (v === true || v === 'true' || v === '1') (out as unknown as Record<string, boolean>)[key] = true;
        else if (v === false || v === 'false' || v === '0') (out as unknown as Record<string, boolean>)[key] = false;
    }
    out.forecastYears = Math.min(10, Math.max(3, Math.round(out.forecastYears) || 5));
    return out;
}

/** Compact query-string encoding of every assumption (fractions as given). */
export function dcfInputsToQuery(input: DcfInputs): string {
    const params = new URLSearchParams();
    for (const key of NUMERIC_KEYS) params.set(key, String(input[key]));
    for (const key of BOOLEAN_KEYS) params.set(key, input[key] ? '1' : '0');
    return params.toString();
}
