import { describe, expect, it } from 'vitest';
import {
    WACC_DEFAULTS,
    capitalWeights,
    parseWaccInputs,
    releverBeta,
    runWacc,
    unleverBeta,
    validateWaccInputs,
    waccInputsToQuery,
    type WaccInputs,
} from '@/lib/finance/wacc';

// Expected values derived independently (Python replication + closed forms,
// see docs/wacc-calculator-upgrade.md) — never from the engine itself.

describe('golden regression — legacy defaults', () => {
    const r = runWacc(WACC_DEFAULTS);
    it('Re 16.40%, after-tax Rd 7.125%, WACC 13.3083%', () => {
        expect(r.errors).toEqual([]);
        expect(r.costOfEquity).toBeCloseTo(0.164, 10);
        expect(r.afterTaxCostOfDebt).toBeCloseTo(0.07125, 10);
        expect(r.weightEquity).toBeCloseTo(2 / 3, 10);
        expect(r.wacc).toBeCloseTo(0.133083, 5);
    });
});

describe('Hamada unlever / relever', () => {
    it('βU of the defaults is 1.2/1.375 = 0.872727…', () => {
        expect(unleverBeta(1.2, 0.5, 0.25)).toBeCloseTo(0.8727272727, 9);
        expect(runWacc(WACC_DEFAULTS).unleveredBeta).toBeCloseTo(0.8727272727, 9);
    });
    it('round-trips at any leverage', () => {
        for (const de of [0, 0.3, 1, 2.5]) {
            expect(releverBeta(unleverBeta(1.45, de, 0.3), de, 0.3)).toBeCloseTo(1.45, 10);
        }
    });
    it('at zero debt βL = βU; at zero tax relevering is undamped', () => {
        expect(releverBeta(0.9, 0, 0.25)).toBeCloseTo(0.9, 12);
        expect(releverBeta(0.9, 2, 0)).toBeCloseTo(2.7, 10);
        expect(unleverBeta(2.7, 2, 0)).toBeCloseTo(0.9, 10);
    });
});

describe('corrected leverage sweep (the legacy bug)', () => {
    const r = runWacc(WACC_DEFAULTS);
    const at = (de: number) => r.sweep.find((s) => s.debtEquityRatio === de)!;
    it('anchor point (D/E 0.5) matches the headline WACC', () => {
        expect(at(0.5).wacc).toBeCloseTo(r.wacc as number, 10);
        expect(at(0.5).leveredBeta).toBeCloseTo(1.2, 9);
    });
    it('D/E 0 gives the unlevered cost of capital, not the levered-beta Re', () => {
        // Legacy showed 16.40% (error +2.62pp); correct is Rf + βU·MRP = 13.7818%.
        expect(at(0).wacc).toBeCloseTo(0.137818, 5);
        expect(at(0).costOfEquity).toBeCloseTo(0.068 + 0.8727272727 * 0.08, 9);
    });
    it('D/E 1 and 2 match the independent relevered table', () => {
        expect(at(1).leveredBeta).toBeCloseTo(1.5273, 4);
        expect(at(1).wacc).toBeCloseTo(0.130716, 5); // legacy: 11.7625% (−1.31pp error)
        expect(at(2).wacc).toBeCloseTo(0.128348, 5); // legacy: 10.2167% (−2.62pp error)
    });
    it('relevered WACC is nearly flat vs leverage (tax shield ≈ equity-risk offset)', () => {
        const spread = Math.max(...r.sweep.map((s) => s.wacc)) - Math.min(...r.sweep.map((s) => s.wacc));
        expect(spread).toBeLessThan(0.015); // legacy sweep spanned 6.18pp
    });
    it('build-up mode sweeps with fixed Re and null betas', () => {
        const bu = runWacc({ ...WACC_DEFAULTS, betaMode: 'buildup', sizePremium: 0.03, companySpecificPremium: 0.02 });
        expect(bu.sweep.every((s) => s.leveredBeta === null)).toBe(true);
        expect(bu.sweep.every((s) => s.costOfEquity === bu.costOfEquity)).toBe(true);
    });
});

describe('beta modes & cost of debt modes (independent cases)', () => {
    it('relevered peer mode: βU 0.85 at D/E 0.8 → βL 1.36, WACC 12.9333%', () => {
        const r = runWacc({
            ...WACC_DEFAULTS, betaMode: 'relevered', unleveredBeta: 0.85,
            riskFreeRate: 0.07, debtEquityRatio: 0.8, preTaxCostOfDebt: 0.09,
        });
        expect(r.leveredBetaUsed).toBeCloseTo(1.36, 10);
        expect(r.costOfEquity).toBeCloseTo(0.1788, 10);
        expect(r.wacc).toBeCloseTo(0.129333, 5);
    });
    it('build-up + spread debt + target weights: WACC 13.14%', () => {
        const r = runWacc({
            ...WACC_DEFAULTS, betaMode: 'buildup', riskFreeRate: 0.07, marketRiskPremium: 0.05,
            sizePremium: 0.03, companySpecificPremium: 0.02, costOfDebtMode: 'spread',
            creditSpread: 0.035, taxRate: 0.30, weightsMode: 'target', targetDebtWeight: 0.4,
        });
        expect(r.costOfEquity).toBeCloseTo(0.17, 12);
        expect(r.preTaxCostOfDebt).toBeCloseTo(0.105, 12);
        expect(r.afterTaxCostOfDebt).toBeCloseTo(0.0735, 12);
        expect(r.wacc).toBeCloseTo(0.1314, 10);
        expect(r.leveredBetaUsed).toBeNull();
    });
    it('market-value weights with CAPM premiums: WACC 15.1403%', () => {
        const r = runWacc({
            ...WACC_DEFAULTS, weightsMode: 'values', marketValueEquity: 850, marketValueDebt: 150,
            riskFreeRate: 0.069, marketRiskPremium: 0.075, leveredBeta: 1.1,
            sizePremium: 0.01, companySpecificPremium: 0.005, preTaxCostOfDebt: 0.088, taxRate: 0.2517,
        });
        expect(r.weightEquity).toBeCloseTo(0.85, 12);
        expect(r.costOfEquity).toBeCloseTo(0.1665, 10);
        expect(r.wacc).toBeCloseTo(0.151403, 5);
        expect(r.debtEquityRatio).toBeCloseTo(150 / 850, 10);
    });
    it('capitalWeights handles every mode and rejects invalid structures', () => {
        expect(capitalWeights({ ...WACC_DEFAULTS, weightsMode: 'target', targetDebtWeight: 0.25 })?.de).toBeCloseTo(1 / 3, 10);
        expect(capitalWeights({ ...WACC_DEFAULTS, weightsMode: 'target', targetDebtWeight: 1 })).toBeNull();
        expect(capitalWeights({ ...WACC_DEFAULTS, weightsMode: 'values', marketValueEquity: 0 })).toBeNull();
        expect(capitalWeights({ ...WACC_DEFAULTS, debtEquityRatio: -0.5 })).toBeNull();
    });
});

describe('validation & warnings', () => {
    const errCases: Array<[string, Partial<WaccInputs>, RegExp]> = [
        ['tax 100%', { taxRate: 1 }, /Tax rate must be between/],
        ['negative D/E', { debtEquityRatio: -0.5 }, /cannot be negative/],
        ['zero equity value', { weightsMode: 'values', marketValueEquity: 0 }, /greater than zero/],
        ['target weight 100%', { weightsMode: 'target', targetDebtWeight: 1 }, /below 100%/],
        ['negative Rd', { preTaxCostOfDebt: -0.02 }, /cannot be negative/],
        ['NaN beta', { leveredBeta: Number.NaN }, /finite number/],
    ];
    it.each(errCases)('%s blocks the result', (_n, patch, msg) => {
        const r = runWacc({ ...WACC_DEFAULTS, ...patch });
        expect(r.errors.some((e) => msg.test(e))).toBe(true);
        expect(r.wacc).toBeNull();
    });
    it('Rd below Rf warns about the implied negative credit spread', () => {
        const v = validateWaccInputs({ ...WACC_DEFAULTS, preTaxCostOfDebt: 0.05 });
        expect(v.errors).toEqual([]);
        expect(v.warnings.some((w) => w.includes('negative credit spread'))).toBe(true);
    });
    it('D/E = −1 (legacy divide-by-zero) is an error, not Infinity', () => {
        const r = runWacc({ ...WACC_DEFAULTS, debtEquityRatio: -1 });
        expect(r.errors.length).toBeGreaterThan(0);
        expect(r.wacc).toBeNull();
    });
    it('extreme leverage warns about Hamada heroics', () => {
        const r = runWacc({ ...WACC_DEFAULTS, debtEquityRatio: 6 });
        expect(r.warnings.some((w) => w.includes('distressed'))).toBe(true);
    });
    it('zero-debt company values at the unlevered cost (no crash, no shield)', () => {
        const r = runWacc({ ...WACC_DEFAULTS, debtEquityRatio: 0 });
        expect(r.errors).toEqual([]);
        expect(r.weightDebt).toBe(0);
        expect(r.wacc).toBeCloseTo(r.costOfEquity as number, 12);
    });
});

describe('serialisation', () => {
    it('round-trips modes and numbers', () => {
        const custom: WaccInputs = {
            ...WACC_DEFAULTS, betaMode: 'relevered', costOfDebtMode: 'spread',
            weightsMode: 'values', riskFreeRate: 0.0715, unleveredBeta: 0.92,
        };
        expect(parseWaccInputs(Object.fromEntries(new URLSearchParams(waccInputsToQuery(custom))))).toEqual(custom);
    });
    it('garbage modes/numbers fall back per-field', () => {
        const p = parseWaccInputs({ betaMode: 'magic', riskFreeRate: 'abc', taxRate: '0.3' });
        expect(p.betaMode).toBe(WACC_DEFAULTS.betaMode);
        expect(p.riskFreeRate).toBe(WACC_DEFAULTS.riskFreeRate);
        expect(p.taxRate).toBeCloseTo(0.3, 12);
        expect(parseWaccInputs(null)).toEqual(WACC_DEFAULTS);
    });
});
