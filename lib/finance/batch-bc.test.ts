import { describe, expect, it } from 'vitest';
import { computeEmi, computePvFv, gordonValue } from '@/lib/finance/tvm';
import { PORTFOLIO_DEFAULTS, portfolioStats, runPortfolio, tangencyWeight } from '@/lib/finance/portfolio';
import { MS_DEFAULTS, runMarketSizing } from '@/lib/finance/market-sizing';
import { QC_DEFAULTS, runQCommerce } from '@/lib/finance/qcommerce';
import { B2B_DEFAULTS, runB2bRoi } from '@/lib/finance/b2b-roi';
import { AI_ROI_DEFAULTS, runAiRoi } from '@/lib/finance/ai-roi';
import { WORKFORCE_DEFAULTS, runWorkforce } from '@/lib/finance/workforce';
import { TOKENOMICS_DEFAULTS, runTokenomics } from '@/lib/finance/tokenomics';
import { runPorters } from '@/lib/finance/porters';
import { CPM_DEFAULT_ACTIVITIES, probabilityOnOrBefore, runCpm } from '@/lib/finance/cpm';

// Constants independently derived (Python, session workpapers for
// docs/calculator-upgrades-batch.md).

describe('tvm', () => {
    it('EMI golden: ₹50L, 9%, 20y → 44,986.30; schedule amortises to 0', () => {
        const r = computeEmi(5_000_000, 0.09, 20);
        expect(r.emi).toBeCloseTo(44_986.30, 2);
        expect(r.totalInterest).toBeCloseTo(5_796_711.47, 0);
        expect(r.schedule).toHaveLength(240);
        expect(r.schedule[239].balance).toBeCloseTo(0, 6);
        expect(r.schedule[0].interest).toBeCloseTo(37_500, 6);
    });
    it('r=0 special case and PV/FV symmetry + guard rails', () => {
        expect(computeEmi(12_000, 0, 1).emi).toBeCloseTo(1000, 9);
        const pv = computePvFv(1_000_000, 0.13, 4);
        expect(pv.presentValue).toBeCloseTo(613_318.73, 1);
        expect(pv.futureValue).toBeCloseTo(1_630_473.61, 1);
        expect(computePvFv(1000, -1.2, 4).errors.length).toBeGreaterThan(0);
        expect(computeEmi(1000, 0.1, 0).errors.length).toBeGreaterThan(0);
        expect(gordonValue(128.1, 0.12, 0.05).value).toBeCloseTo(1830, 6);
        expect(gordonValue(100, 0.05, 0.06).value).toBeNull();
    });
});

describe('portfolio', () => {
    it('golden point w=60%: E[R] 11.6%, σ 12.70%, Sharpe 0.4016', () => {
        const p = portfolioStats(0.6, PORTFOLIO_DEFAULTS);
        expect(p.expectedReturn).toBeCloseTo(0.116, 12);
        expect(p.sigma).toBeCloseTo(0.126996, 5);
        expect(p.sharpe).toBeCloseTo(0.4016, 4);
    });
    it('MVP weight 3.09%; tangency closed form matches grid search', () => {
        const r = runPortfolio(PORTFOLIO_DEFAULTS);
        expect(r.minimumVariance?.weight1).toBeCloseTo(0.030928, 5);
        expect(r.tangency?.weight1).toBeCloseTo(0.357798, 5);
        let bestW = 0; let bestS = -Infinity;
        for (let k = 0; k <= 1000; k++) {
            const p = portfolioStats(k / 1000, PORTFOLIO_DEFAULTS);
            if ((p.sharpe ?? -Infinity) > bestS) { bestS = p.sharpe ?? -Infinity; bestW = p.weight1; }
        }
        expect(Math.abs(bestW - tangencyWeight(PORTFOLIO_DEFAULTS))).toBeLessThan(0.002);
    });
    it('invalid correlation is an error, not silently clamped (legacy bug)', () => {
        expect(runPortfolio({ ...PORTFOLIO_DEFAULTS, correlation: 1.4 }).errors.length).toBeGreaterThan(0);
    });
});

describe('market sizing', () => {
    it('golden defaults + convergence red flag fires', () => {
        const r = runMarketSizing(MS_DEFAULTS);
        expect(r.tam).toBeCloseTo(1.05e12, -6);
        expect(r.som).toBeCloseTo(2.1e10, -6);
        expect(r.bottomUpRevenue).toBe(245_000_000);
        expect(r.convergenceRatio).toBeCloseTo(85.7143, 3);
        expect(r.warnings.some((w) => w.includes('red flag'))).toBe(true);
        expect(r.somUsers).toBeCloseTo(4_200_000, 0);
    });
    it('percentage above 100% is an error (legacy silently clamped)', () => {
        expect(runMarketSizing({ ...MS_DEFAULTS, obtainablePct: 1.5 }).errors.length).toBeGreaterThan(0);
    });
});

describe('qcommerce', () => {
    const r = runQCommerce(QC_DEFAULTS);
    it('golden P&L at 300 orders/day', () => {
        expect(r.cm1).toBeCloseTo(873_000, 0);
        expect(r.cm2).toBeCloseTo(396_000, 0);
        expect(r.storeEbitda).toBeCloseTo(-204_000, 0);
        expect(r.netStoreProfit).toBeCloseTo(-546_000, 0);
    });
    it('break-even correctly ≈3,333/day (legacy claimed ≈348 by omitting returns+marketing)', () => {
        expect(r.perOrder?.contributionAfterMarketing).toBeCloseTo(6.0, 9);
        expect(r.breakEvenOrdersPerDay).toBeCloseTo(100_000 / 30, 3);
    });
    it('negative contribution → no break-even, explicit warning', () => {
        const bad = runQCommerce({ ...QC_DEFAULTS, cogsPct: 0.95 });
        expect(bad.breakEvenOrdersPerDay).toBeNull();
        expect(bad.warnings.length).toBeGreaterThan(0);
    });
});

describe('b2b roi', () => {
    it('golden defaults: CAC 2000, ROI 650%', () => {
        const r = runB2bRoi(B2B_DEFAULTS);
        expect(r.closedWon).toBe(25);
        expect(r.blendedCac).toBe(2000);
        expect(r.roiPct).toBeCloseTo(650, 9);
        expect(r.cacPaybackMonths).toBeCloseTo(1.6, 9);
    });
    it('zero closes → CAC null not 0 (legacy bug)', () => {
        const z = runB2bRoi({ ...B2B_DEFAULTS, winRate: 0 });
        expect(z.blendedCac).toBeNull();
        expect(z.warnings.length).toBeGreaterThan(0);
    });
    it('margin & contract life change ROI honestly', () => {
        const m = runB2bRoi({ ...B2B_DEFAULTS, grossMargin: 0.7, contractYears: 3 });
        expect(m.lifetimeGrossProfitPerCustomer).toBeCloseTo(31_500, 9);
        expect(m.roiPct).toBeCloseTo(((25 * 31_500 - 50_000) / 50_000) * 100, 6);
    });
});

describe('ai roi + workforce', () => {
    it('AI ROI golden: net ₹12,166.67/mo, year1 ₹146,000, payback month 2', () => {
        const r = runAiRoi(AI_ROI_DEFAULTS);
        expect(r.netMonthlySavingsSteady).toBeCloseTo(12_166.67, 1);
        expect(r.netSavingsYear1).toBeCloseTo(146_000, 0);
        expect(r.roiYear1Pct).toBeCloseTo(973.33, 1);
        expect(r.paybackMonth).toBe(2); // −15,000 + 2×12,166.67 ≥ 0
        const ramped = runAiRoi({ ...AI_ROI_DEFAULTS, rampMonths: 6, savingsRealisationPct: 0.6 });
        expect(ramped.netSavingsYear1 as number).toBeLessThan(r.netSavingsYear1 as number);
    });
    it('workforce golden incl. BOTH multiples (current was dead in legacy)', () => {
        const r = runWorkforce(WORKFORCE_DEFAULTS);
        expect(r.requiredAgents).toBe(13);
        expect(r.annualCostSaving).toBeCloseTo(4_594_000, 0);
        expect(r.totalRestructuringCost).toBeCloseTo(1_437_500, 0);
        expect(r.valueAtProjectedMultiple).toBeCloseTo(39_908_500, 0);
        expect(r.valueAtCurrentMultiple).toBeCloseTo(4_594_000 * 4.5 - 1_437_500, 0);
        expect(r.paybackMonths).toBeCloseTo(3.755, 2);
        expect(r.warnings.some((w) => w.includes('100%'))).toBe(true);
    });
});

describe('tokenomics', () => {
    const r = runTokenomics(TOKENOMICS_DEFAULTS);
    it('golden schedule: TGE 6.5%, month13 team starts, 100% by month48', () => {
        expect(r.day1CirculatingPct).toBeCloseTo(6.5, 9);
        expect(r.fdv).toBeCloseTo(1e8, 0);
        expect(r.series[12].team).toBe(0);
        expect(r.series[13].team).toBeCloseTo(0.2e9 / 24, 0);
        expect(r.series[24].circulatingPct).toBeCloseTo(60.75, 2);
        expect(r.fullyVestedMonth).toBe(48);
    });
    it('allocation mismatch warns loudly (legacy silently renormalised)', () => {
        const bad = runTokenomics({ ...TOKENOMICS_DEFAULTS, teamPct: 0.3 }); // sums to 110%
        expect(bad.warnings.some((w) => w.includes('renormalised'))).toBe(true);
        expect((bad.allocations?.team ?? 0) / 1e9).toBeCloseTo(0.3 / 1.1, 6);
    });
});

describe('porters + cpm', () => {
    it('banding + dominant-force masking warning', () => {
        const r = runPorters({ newEntrants: 5, supplierPower: 1, buyerPower: 1, substitutes: 1, rivalry: 1 });
        expect(r.simpleAverage).toBeCloseTo(1.8, 9);
        expect(r.attractiveness).toBe('Highly Attractive');
        expect(r.dominantForce).toBe('newEntrants');
        expect(r.warnings.some((w) => w.includes('STRONGEST'))).toBe(true);
        expect(runPorters({ newEntrants: 4.2, supplierPower: 4.2, buyerPower: 4.2, substitutes: 4.2, rivalry: 4.2 }).attractiveness).toBe('Very Unattractive');
        expect(runPorters({ newEntrants: 7 as unknown as number, supplierPower: 3, buyerPower: 3, substitutes: 3, rivalry: 3 }).errors.length).toBeGreaterThan(0);
    });
    it('CPM golden network: 17, critical A-C-F, floats 5 for B/D/E/G', () => {
        const r = runCpm(CPM_DEFAULT_ACTIVITIES, false);
        expect(r.errors).toEqual([]);
        expect(r.projectDuration).toBe(17);
        expect(r.criticalPath).toEqual(['A', 'C', 'F']);
        const byId = Object.fromEntries(r.rows.map((x) => [x.id, x]));
        for (const id of ['B', 'D', 'E', 'G']) expect(byId[id].totalFloat).toBeCloseTo(5, 9);
    });
    it('PERT: σ 1.833, P(≤20) ≈ 84%', () => {
        const r = runCpm(CPM_DEFAULT_ACTIVITIES, true);
        expect(r.projectDuration).toBeCloseTo(18.1667, 3);
        expect(r.criticalPathSigma).toBeCloseTo(1.8333, 3);
        expect(probabilityOnOrBefore(20, r.projectDuration as number, r.criticalPathSigma)).toBeCloseTo(0.8413, 3);
    });
    it('topological robustness: renumbered nodes still schedule correctly; cycles are errors', () => {
        // same network, nodes relabelled so numeric order is NOT topological
        const relabel: Record<number, number> = { 1: 40, 2: 10, 3: 30, 4: 20, 5: 50, 6: 60 };
        const acts = CPM_DEFAULT_ACTIVITIES.map((a) => ({ ...a, from: relabel[a.from], to: relabel[a.to] }));
        const r = runCpm(acts, false);
        expect(r.projectDuration).toBe(17);
        expect(r.criticalPath).toEqual(['A', 'C', 'F']);
        const cyclic = runCpm([...CPM_DEFAULT_ACTIVITIES, { id: 'H', from: 6, to: 1, duration: 1 }], false);
        expect(cyclic.errors.some((e) => e.includes('cycle'))).toBe(true);
    });
});
