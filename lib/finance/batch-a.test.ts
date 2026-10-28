import { describe, expect, it } from 'vitest';
import { TS_DEFAULTS, runThreeStatement } from '@/lib/finance/three-statement';
import { SAAS_DEFAULTS, runSaas } from '@/lib/finance/saas';
import { CCA_DEFAULTS, median, runCca } from '@/lib/finance/cca';
import { RATIO_DEFAULTS, runRatios } from '@/lib/finance/ratios';

// All constants independently derived (Python replication in
// docs/calculator-upgrades-batch.md workpapers).

describe('three-statement', () => {
    const r = runThreeStatement(TS_DEFAULTS);
    it('golden defaults (legacy-equivalent settings)', () => {
        expect(r.errors).toEqual([]);
        expect(r.years[0].netIncome).toBeCloseTo(1_080_000, 0);
        expect(r.years[0].endingCash).toBeCloseTo(2_635_068.49, 0);
        expect(r.years[4].revenue).toBeCloseTo(18_564_650, 0);
        expect(r.years[4].netIncome).toBeCloseTo(2_950_020.75, 2);
        expect(r.openingEquity).toBeCloseTo(2_000_000 + (5_000_000 * 45) / 365 - 1_500_000, 0);
    });
    it('balance sheet balances every year (identity, not a plug)', () => {
        for (const y of r.years) expect(Math.abs(y.balanceDifference)).toBeLessThan(0.01);
        const stressed = runThreeStatement({ ...TS_DEFAULTS, dioDays: 60, dpoDays: 30, debtRepaymentPct: 0.2, depreciationYears: 3, revenueGrowth: -0.05 });
        for (const y of stressed.years) expect(Math.abs(y.balanceDifference)).toBeLessThan(0.01);
    });
    it('depreciation vintages stop at end of useful life (legacy bug)', () => {
        const inp = { ...TS_DEFAULTS, baseRevenue: 1000, revenueGrowth: 0.1, capexPct: 0.1, depreciationYears: 3, cogsPct: 0, opexPct: 0, initialCash: 0, initialDebt: 0, dsoDays: 0, interestRate: 0, taxRate: 0 };
        const deps = runThreeStatement(inp).years.map((y) => y.depreciation);
        // capex: 110? base1000 growth10: rev 1100,1210,1331,1464.1,1610.51 capex 110,121,133.1,146.41,161.051
        // dep y4 counts vintages 2,3,4 only (vintage1 expired): (121+133.1+146.41)/3 = 133.5033
        expect(deps[3]).toBeCloseTo((121 + 133.1 + 146.41) / 3, 4);
        expect(deps[3]).not.toBeCloseTo((110 + 121 + 133.1 + 146.41) / 3, 2); // legacy over-depreciation
    });
    it('debt repayment reduces balance and flows through financing', () => {
        const rr = runThreeStatement({ ...TS_DEFAULTS, debtRepaymentPct: 0.5 });
        expect(rr.years[0].debtRepaid).toBeCloseTo(750_000, 0);
        expect(rr.years[0].totalDebt).toBeCloseTo(750_000, 0);
        expect(rr.years[1].interestExpense).toBeCloseTo(750_000 * 0.08, 0);
    });
    it('DCF handoff maps drivers (EBITDA margin = 1 − COGS% − OpEx%)', () => {
        expect(r.dcfHandoff?.ebitdaMargin).toBeCloseTo(0.25, 12);
        expect(r.dcfHandoff?.revenue0).toBe(5_000_000);
    });
    it('validation blocks nonsense', () => {
        expect(runThreeStatement({ ...TS_DEFAULTS, baseRevenue: 0 }).errors.length).toBeGreaterThan(0);
        expect(runThreeStatement({ ...TS_DEFAULTS, depreciationYears: 0 }).errors.length).toBeGreaterThan(0);
    });
});

describe('saas unit economics', () => {
    const r = runSaas(SAAS_DEFAULTS);
    it('golden defaults: LTV 3400, ratio 8.5, payback 4.71, life 40mo', () => {
        expect(r.ltv).toBeCloseTo(3400, 9);
        expect(r.ltvCacRatio).toBeCloseTo(8.5, 9);
        expect(r.simplePaybackMonths).toBeCloseTo(4.7059, 4);
        expect(r.expectedLifetimeMonths).toBe(40);
        expect(r.churnAdjustedPaybackMonth).toBe(4);
    });
    it('cumulative curve includes month-0 GP (legacy understated by 85)', () => {
        expect(r.series[36].cumulativeNet).toBeCloseTo(1667.55, 1);
        expect(r.series[0].cumulativeNet).toBeCloseTo(-400 + 85, 9);
    });
    it('series sum matches the geometric partial-sum closed form', () => {
        const long = runSaas({ ...SAAS_DEFAULTS, horizonMonths: 120 });
        const sum = long.series.reduce((s, m) => s + m.expectedGrossProfit, 0);
        // Σ_{t=0..120} GP(1−c)^t = GP·(1−(1−c)^121)/c
        expect(sum).toBeCloseTo((85 * (1 - Math.pow(0.975, 121))) / 0.025, 6);
    });
    it('zero churn is honest (null LTV) not silently floored', () => {
        const z = runSaas({ ...SAAS_DEFAULTS, monthlyChurn: 0 });
        expect(z.ltv).toBeNull();
        expect(z.warnings.some((w) => w.includes('infinite'))).toBe(true);
        expect(z.series[36].cumulativeNet).toBeCloseTo(-400 + 85 * 37, 9);
    });
    it('discounted LTV closed form', () => {
        const d = runSaas({ ...SAAS_DEFAULTS, monthlyDiscountRate: 0.01 });
        // GP / (1 − (1−c)/(1+d)) = 85 / (1 − 0.975/1.01)
        expect(d.discountedLtv).toBeCloseTo(85 / (1 - 0.975 / 1.01), 6);
    });
});

describe('cca', () => {
    it('proper median on even counts (legacy took upper middle)', () => {
        expect(median([10, 20])).toBe(15);
        expect(median([30, 10, 20])).toBe(20);
        expect(median([])).toBeNull();
    });
    it('golden defaults: blended EV 356.25, price 25.5938', () => {
        const r = runCca(CCA_DEFAULTS);
        expect(r.errors).toEqual([]);
        expect(r.evRevenueStats.median).toBeCloseTo(6.25, 9);
        expect(r.evEbitdaStats.median).toBeCloseTo(33.3333, 4);
        expect(r.blendedEv).toBeCloseTo(356.25, 9);
        expect(r.impliedSharePrice).toBeCloseTo(25.5938, 3);
        expect(r.evRangeEbitda).toEqual({ low: 264, high: 510 });
    });
    it('peer with negative EBITDA excluded with warning; median uses rest', () => {
        const inp = { ...CCA_DEFAULTS, peers: CCA_DEFAULTS.peers.map((p, i) => (i === 2 ? { ...p, ebitda: -5 } : p)) };
        const r = runCca(inp);
        expect(r.evEbitdaStats.count).toBe(2);
        expect(r.evEbitdaStats.median).toBeCloseTo((42.5 + 33.3333) / 2, 3); // proper even median
        expect(r.warnings.some((w) => w.includes('excluded'))).toBe(true);
    });
    it('distress: equity floored at zero with warning', () => {
        const r = runCca({ ...CCA_DEFAULTS, targetNetDebt: 9999 });
        expect(r.impliedEquityValue).toBe(0);
        expect(r.warnings.some((w) => w.includes('does not cover net debt'))).toBe(true);
    });
});

describe('ratios', () => {
    const r = runRatios(RATIO_DEFAULTS);
    it('golden defaults + DuPont identity', () => {
        expect(r.currentRatio).toBeCloseTo(1.5385, 4);
        expect(r.quickRatio).toBeCloseTo(1.0769, 4);
        expect(r.grossMarginPct).toBeCloseTo(40, 9);
        expect(r.roePct).toBeCloseTo(17.8947, 4);
        expect(r.rocePct).toBeCloseTo(21.6667, 4);
        expect(r.cashConversionCycleDays).toBeCloseTo(60.83, 2);
        const d = r.dupont!;
        expect(((d.netMarginPct as number) / 100) * (d.assetTurnover as number) * (d.equityMultiplier as number) * 100).toBeCloseTo(d.roePct as number, 8);
    });
    it('zero denominators give null, never NaN/Infinity', () => {
        const z = runRatios({ ...RATIO_DEFAULTS, currentLiabilities: 0, revenue: 0 });
        expect(z.currentRatio).toBeNull();
        expect(z.grossMarginPct).toBeNull();
        for (const v of Object.values(z)) if (typeof v === 'number') expect(Number.isFinite(v)).toBe(true);
    });
    it('consistency warnings catch impossible statements', () => {
        const bad = runRatios({ ...RATIO_DEFAULTS, inventory: 999 });
        expect(bad.warnings.some((w) => w.includes('Inventory exceeds'))).toBe(true);
        const ebitOff = runRatios({ ...RATIO_DEFAULTS, ebit: 999 });
        expect(ebitOff.warnings.some((w) => w.includes('≠ EBIT'))).toBe(true);
    });
    it('negative equity nulls ROE/D-E with warning', () => {
        const n = runRatios({ ...RATIO_DEFAULTS, equity: -50 });
        expect(n.roePct).toBeNull();
        expect(n.debtEquity).toBeNull();
        expect(n.warnings.some((w) => w.includes('negative'))).toBe(true);
    });
});
