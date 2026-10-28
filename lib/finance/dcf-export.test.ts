import { describe, expect, it } from 'vitest';
import { DCF_DEFAULTS, runDcf, runScenarios, sensitivityGrid } from '@/lib/finance/dcf';
import { buildDcfCsv } from '@/lib/finance/dcf-export';

// The export must never diverge from the engine's on-screen numbers, and
// must carry provenance (currency, timestamp, input source) on its face.

describe('buildDcfCsv', () => {
    const result = runDcf(DCF_DEFAULTS);
    const csv = buildDcfCsv(DCF_DEFAULTS, result, runScenarios(DCF_DEFAULTS), sensitivityGrid(DCF_DEFAULTS), {
        currency: 'INR', exportedAt: '2026-10-28T00:00:00.000Z',
    });

    it('carries provenance headers', () => {
        expect(csv).toContain('Kunwar Analytics — DCF Valuation (FCFF)');
        expect(csv).toContain('2026-10-28T00:00:00.000Z');
        expect(csv).toContain('INR');
        expect(csv).toContain('not live market data');
    });

    it('bridge figures match the engine (rounded to 2dp)', () => {
        const ev = Math.round((result.enterpriseValue as number) * 100) / 100;
        expect(csv).toContain(`Enterprise value,${ev}`);
        expect(csv).toContain('Implied share price,27.51'); // golden: 27.5095 → 27.51
    });

    it('projection excludes Yr 0 from PV and says so', () => {
        expect(csv).toContain('Present value,excluded from PV');
        expect(csv).toContain('Yr 0 (actuals)');
    });

    it('includes scenario and sensitivity sections with n/a for invalid cells', () => {
        expect(csv).toContain('SCENARIOS');
        expect(csv).toContain('Bear');
        expect(csv).toContain('SENSITIVITY');
        const tightInputs = { ...DCF_DEFAULTS, wacc: 0.03, terminalGrowth: 0.025 };
        const tight = buildDcfCsv(tightInputs, runDcf(tightInputs), null, sensitivityGrid(tightInputs), {
            currency: 'USD', exportedAt: '2026-10-28T00:00:00.000Z',
        });
        expect(tight).toContain('n/a');
    });

    it('exports model errors instead of numbers when inputs are invalid', () => {
        const badInputs = { ...DCF_DEFAULTS, wacc: 0.02, terminalGrowth: 0.03 };
        const bad = buildDcfCsv(badInputs, runDcf(badInputs), null, null, {
            currency: 'INR', exportedAt: '2026-10-28T00:00:00.000Z',
        });
        expect(bad).toContain('MODEL ERRORS');
        expect(bad).not.toContain('VALUATION BRIDGE');
    });
});
