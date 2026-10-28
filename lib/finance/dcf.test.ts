import { describe, expect, it } from 'vitest';
import {
    DCF_DEFAULTS,
    applyScenario,
    dcfInputsToQuery,
    growthForYear,
    parseDcfInputs,
    runDcf,
    runScenarios,
    sensitivityGrid,
    validateDcfInputs,
    type DcfInputs,
} from '@/lib/finance/dcf';

// Every expected value below was derived independently of this engine
// (closed forms + a separate Python replication, documented in
// docs/dcf-valuation-upgrade.md) — never by running runDcf twice.

const close = (actual: number | null, expected: number, tol = 1) => {
    expect(actual).not.toBeNull();
    expect(Math.abs((actual as number) - expected)).toBeLessThanOrEqual(tol);
};

describe('golden regression — legacy defaults reproduce exactly', () => {
    // Legacy model lumped Capex+ΔNWC at 5% of revenue. With capex 5% and
    // NWC 0% (ΔNWC = 0) the new engine must reproduce the independently
    // replicated legacy figures to the rupee.
    const r = runDcf(DCF_DEFAULTS);
    it('matches ΣPV, TV, EV, equity value and share price', () => {
        expect(r.errors).toEqual([]);
        close(r.sumPvExplicit, 6_783_621.40, 2);
        close(r.terminalValue, 32_573_929.65, 2);
        close(r.pvTerminalValue, 20_225_847.50, 2);
        close(r.enterpriseValue, 27_009_468.89, 2);
        close(r.equityValue, 27_509_468.89, 2);
        expect(r.impliedSharePrice).toBeCloseTo(27.5095, 3);
        expect(r.terminalValueSharePct).toBeCloseTo(74.88, 1);
    });
    it('base year is context only — its FCF never enters PV', () => {
        // Legacy UI displayed Yr-0 FCF (1,185,000) in the PV row; EV excluded it.
        expect(r.baseYear?.ufcf).toBeCloseTo(1_185_000, 0);
        const pvSum = r.years.reduce((s, y) => s + y.presentValue, 0);
        close(r.sumPvExplicit, pvSum, 1e-6);
    });
});

describe('asymmetric case with working capital (Python replication B)', () => {
    const inputs: DcfInputs = {
        ...DCF_DEFAULTS,
        revenue0: 50e6, revenueGrowth: 0.08, ebitdaMargin: 0.25, daPctRevenue: 0.04,
        taxRate: 0.25, capexPctRevenue: 0.06, nwcPctRevenue: 0.10, terminalGrowth: 0.03,
        wacc: 0.11, cash: 5e6, debt: 12e6, shares: 8e6, forecastYears: 6, exitMultiple: 8,
    };
    const r = runDcf(inputs);
    it('year 1 fully reconciles', () => {
        const y = r.years[0];
        expect(y.revenue).toBe(54_000_000);
        expect(y.ufcf).toBeCloseTo(7_025_000, 0);
        expect(y.presentValue).toBeCloseTo(6_328_828.83, 1);
        // Row identity: NOPAT + D&A − Capex − ΔNWC = UFCF, EBIT − Tax = NOPAT
        expect(y.nopat + y.da - y.capex - y.deltaNwc).toBeCloseTo(y.ufcf, 1e-6);
        expect(y.ebit - y.tax).toBeCloseTo(y.nopat, 1e-6);
        expect(y.deltaNwc).toBeCloseTo(400_000, 0); // 10% × ΔRev (4.0M)
    });
    it('valuation outputs match the independent replication', () => {
        close(r.sumPvExplicit, 35_497_836.70, 5);
        close(r.terminalValue, 132_896_132.90, 10);
        close(r.enterpriseValue, 106_549_536.31, 10);
        expect(r.impliedSharePrice).toBeCloseTo(12.4437, 3);
    });
    it('exit-multiple cross-check round-trips implied growth', () => {
        const x = r.exitMultipleCheck!;
        close(x.terminalValueExit, 158_687_432.29, 10);
        expect(x.impliedTerminalGrowth).toBeCloseTo(0.042208, 5);
        expect(x.impliedExitMultiple).toBeCloseTo(6.6998, 3);
        expect(x.impliedSharePriceExit).toBeCloseTo(14.1673, 3);
        // Round trip: Gordon TV at implied g must return the exit TV.
        const last = r.years[r.years.length - 1];
        const tv = (last.ufcf * (1 + x.impliedTerminalGrowth)) / (inputs.wacc - x.impliedTerminalGrowth);
        expect(tv).toBeCloseTo(x.terminalValueExit, 1);
    });
});

describe('closed-form checks', () => {
    it('constant FCF (g=0) matches the annuity formula; ΔNWC = 0 at zero growth', () => {
        const r = runDcf({
            ...DCF_DEFAULTS, revenue0: 20e6, revenueGrowth: 0, ebitdaMargin: 0.20,
            daPctRevenue: 0.05, taxRate: 0.20, capexPctRevenue: 0.05, nwcPctRevenue: 0.10,
            terminalGrowth: 0, wacc: 0.09, forecastYears: 5,
        });
        expect(r.errors).toEqual([]);
        expect(r.years.every((y) => y.ufcf === 2_400_000)).toBe(true);
        expect(r.years.every((y) => y.deltaNwc === 0)).toBe(true);
        close(r.sumPvExplicit, 9_335_163.03, 2); // F × (1 − 1.09^-5)/0.09
    });
    it('zero terminal growth gives the perpetuity TV = FCF/WACC', () => {
        const r = runDcf({ ...DCF_DEFAULTS, terminalGrowth: 0 });
        const lastUfcf = r.years[r.years.length - 1].ufcf;
        expect(r.terminalValue).toBeCloseTo(lastUfcf / DCF_DEFAULTS.wacc, 1e-6);
    });
    it('mid-year discounting scales explicit PV by √(1+WACC)', () => {
        const end = runDcf(DCF_DEFAULTS);
        const mid = runDcf({ ...DCF_DEFAULTS, midYearDiscounting: true });
        expect((mid.sumPvExplicit as number) / (end.sumPvExplicit as number))
            .toBeCloseTo(Math.sqrt(1.10), 10);
        close(mid.sumPvExplicit, 7_114_722.15, 25); // Python: 6,783,621.40 × √1.1
    });
    it('bridge identity holds: ΣPV + PV(TV) = EV; EV + Cash − Debt = Equity', () => {
        const r = runDcf(DCF_DEFAULTS);
        expect((r.sumPvExplicit as number) + (r.pvTerminalValue as number)).toBeCloseTo(r.enterpriseValue as number, 1e-6);
        expect((r.enterpriseValue as number) + DCF_DEFAULTS.cash - DCF_DEFAULTS.debt).toBeCloseTo(r.equityValue as number, 1e-6);
        expect((r.equityValue as number) / DCF_DEFAULTS.shares).toBeCloseTo(r.impliedSharePrice as number, 1e-9);
    });
    it('growth fade reaches terminal growth in the final year', () => {
        const inp = { ...DCF_DEFAULTS, revenueGrowth: 0.20, terminalGrowth: 0.02, forecastYears: 4, growthFade: true };
        expect(growthForYear(inp, 1)).toBeCloseTo(0.155, 10);
        expect(growthForYear(inp, 4)).toBeCloseTo(0.02, 10);
        const flat = { ...inp, growthFade: false };
        expect(growthForYear(flat, 4)).toBe(0.20);
    });
});

describe('tax treatment of losses (case F)', () => {
    const lossy: DcfInputs = {
        ...DCF_DEFAULTS, revenue0: 10e6, revenueGrowth: 0, ebitdaMargin: 0.05,
        daPctRevenue: 0.10, taxRate: 0.30, capexPctRevenue: 0.02, nwcPctRevenue: 0,
        terminalGrowth: 0.02, wacc: 0.10, forecastYears: 3,
    };
    it('no tax credit by default; credit only when opted in', () => {
        expect(runDcf(lossy).years[0].ufcf).toBeCloseTo(300_000, 0);
        expect(runDcf({ ...lossy, taxBenefitOnLosses: true }).years[0].ufcf).toBeCloseTo(450_000, 0);
        expect(runDcf(lossy).warnings.some((w) => w.includes('tax credit'))).toBe(true);
    });
});

describe('validation & edge cases', () => {
    const errCases: Array<[string, Partial<DcfInputs>, RegExp]> = [
        ['WACC ≤ g', { wacc: 0.02, terminalGrowth: 0.025 }, /Terminal growth .* below WACC/],
        ['WACC = 0', { wacc: 0 }, /WACC must be greater than zero/],
        ['revenue 0', { revenue0: 0 }, /Revenue \(Yr 0\)/],
        ['negative revenue', { revenue0: -5 }, /Revenue \(Yr 0\)/],
        ['shares 0', { shares: 0 }, /Shares outstanding/],
        ['tax 100%', { taxRate: 1 }, /Tax rate must be between/],
        ['growth −100%', { revenueGrowth: -1 }, /greater than −100%/],
        ['years 2', { forecastYears: 2 }, /between 3 and 10/],
        ['years 11', { forecastYears: 11 }, /between 3 and 10/],
        ['multiple 0', { exitMultiple: 0 }, /Exit EV\/EBITDA/],
        ['negative cash', { cash: -1 }, /cannot be negative/],
        ['NaN input', { revenue0: Number.NaN }, /finite number/],
        ['Infinity input', { wacc: Number.POSITIVE_INFINITY }, /finite number/],
    ];
    it.each(errCases)('%s blocks valuation with a clear error', (_n, patch, msg) => {
        const r = runDcf({ ...DCF_DEFAULTS, ...patch });
        expect(r.errors.some((e) => msg.test(e))).toBe(true);
        expect(r.enterpriseValue).toBeNull();
        expect(r.impliedSharePrice).toBeNull();
    });
    it('declining business (negative growth, g<0) still values', () => {
        const r = runDcf({ ...DCF_DEFAULTS, revenueGrowth: -0.05, terminalGrowth: -0.02 });
        expect(r.errors).toEqual([]);
        expect(r.enterpriseValue as number).toBeGreaterThan(0);
    });
    it('zero margin / zero capex are legal', () => {
        expect(runDcf({ ...DCF_DEFAULTS, ebitdaMargin: 0, capexPctRevenue: 0 }).errors).toEqual([]);
    });
    it('negative equity warns instead of pretending', () => {
        const r = runDcf({ ...DCF_DEFAULTS, debt: 1e9 });
        expect(r.equityValue as number).toBeLessThan(0);
        expect(r.warnings.some((w) => w.includes('equity value is negative'))).toBe(true);
    });
    it('validateDcfInputs warns (not errors) on implausible margin > 100%', () => {
        const v = validateDcfInputs({ ...DCF_DEFAULTS, ebitdaMargin: 1.4 });
        expect(v.errors).toEqual([]);
        expect(v.warnings.some((w) => w.includes('100%'))).toBe(true);
    });
});

describe('scenarios', () => {
    it('bear < base < bull under default deltas', () => {
        const [bear, base, bull] = runScenarios(DCF_DEFAULTS);
        expect(bear.result.impliedSharePrice as number).toBeLessThan(base.result.impliedSharePrice as number);
        expect(bull.result.impliedSharePrice as number).toBeGreaterThan(base.result.impliedSharePrice as number);
    });
    it('deltas apply additively in fraction points', () => {
        const s = applyScenario(DCF_DEFAULTS, { growthDelta: -0.05, marginDelta: -0.03, waccDelta: 0.015 });
        expect(s.revenueGrowth).toBeCloseTo(0.10, 10);
        expect(s.ebitdaMargin).toBeCloseTo(0.17, 10);
        expect(s.wacc).toBeCloseTo(0.115, 10);
    });
    it('scenario that pushes WACC ≤ g surfaces an error, not a price', () => {
        // Bull lowers WACC by 1.5pp: 3.0% − 1.5pp = 1.5% < g of 2.5% → invalid.
        const outcomes = runScenarios({ ...DCF_DEFAULTS, wacc: 0.03, terminalGrowth: 0.025 });
        const bull = outcomes[2];
        expect(bull.result.errors.length).toBeGreaterThan(0);
        expect(bull.result.impliedSharePrice).toBeNull();
        expect(outcomes[0].result.errors).toEqual([]); // Bear raises WACC → stays valid
    });
});

describe('sensitivity grid', () => {
    const grid = sensitivityGrid(DCF_DEFAULTS);
    it('is 5×5, centred on the base case', () => {
        expect(grid.waccValues).toHaveLength(5);
        expect(grid.growthValues).toHaveLength(5);
        expect(grid.sharePrice[2][2]).toBeCloseTo(27.5095, 3);
    });
    it('price falls as WACC rises and rises as terminal growth rises', () => {
        for (let i = 1; i < 5; i++) expect(grid.sharePrice[i][2] as number).toBeLessThan(grid.sharePrice[i - 1][2] as number);
        for (let j = 1; j < 5; j++) expect(grid.sharePrice[2][j] as number).toBeGreaterThan(grid.sharePrice[2][j - 1] as number);
    });
    it('invalid cells (g ≥ WACC) are null, never fabricated', () => {
        const tight = sensitivityGrid({ ...DCF_DEFAULTS, wacc: 0.03, terminalGrowth: 0.025 });
        // lowest WACC row (1%) vs highest g column (3.5%) is invalid
        expect(tight.sharePrice[0][4]).toBeNull();
        expect(tight.sharePrice.flat().some((v) => v === null)).toBe(true);
    });
});

describe('serialisation', () => {
    it('query round-trips every assumption', () => {
        const custom: DcfInputs = { ...DCF_DEFAULTS, revenue0: 42e6, forecastYears: 7, midYearDiscounting: true, growthFade: true };
        const parsed = parseDcfInputs(Object.fromEntries(new URLSearchParams(dcfInputsToQuery(custom))));
        expect(parsed).toEqual(custom);
    });
    it('partial params merge over a supplied base (WACC→DCF handoff)', () => {
        const autosaved: DcfInputs = { ...DCF_DEFAULTS, revenue0: 42e6, wacc: 0.10 };
        const merged = parseDcfInputs({ wacc: '0.133083' }, autosaved);
        expect(merged.wacc).toBeCloseTo(0.133083, 10);
        expect(merged.revenue0).toBe(42e6); // only the handed-off field changes
    });
    it('garbage in → per-field defaults, never a crash', () => {
        const parsed = parseDcfInputs({ revenue0: 'abc', wacc: '0.12', forecastYears: '99', extra: 'x', midYearDiscounting: 'yes' });
        expect(parsed.revenue0).toBe(DCF_DEFAULTS.revenue0);
        expect(parsed.wacc).toBeCloseTo(0.12, 10);
        expect(parsed.forecastYears).toBe(10); // clamped
        expect(parsed.midYearDiscounting).toBe(false);
        expect(parseDcfInputs(null)).toEqual(DCF_DEFAULTS);
        expect(parseDcfInputs(undefined)).toEqual(DCF_DEFAULTS);
    });
});
