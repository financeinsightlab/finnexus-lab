import { describe, expect, it } from 'vitest';
import { WACC_DEFAULTS, runWacc } from '@/lib/finance/wacc';
import { buildWaccCsv } from '@/lib/finance/wacc-export';

describe('buildWaccCsv', () => {
    const result = runWacc(WACC_DEFAULTS);
    const csv = buildWaccCsv(WACC_DEFAULTS, result, '2026-10-28T00:00:00.000Z');

    it('carries provenance and the golden WACC', () => {
        expect(csv).toContain('Kunwar Analytics — WACC Build-Up');
        expect(csv).toContain('not live market data');
        expect(csv).toContain('WACC,13.3083%');
        expect(csv).toContain('for DCF handoff');
    });

    it('sweep shows the relevered (not legacy) values', () => {
        // D/E = 0 row: WACC must be the unlevered cost 13.7818%, never 16.4000%.
        expect(csv).toContain('13.7818%');
        expect(csv).not.toContain('0,1.2,16.4000%');
        expect(csv).toContain('Hamada-relevered');
    });

    it('exports errors instead of numbers for invalid inputs', () => {
        const bad = { ...WACC_DEFAULTS, taxRate: 1.5 };
        const out = buildWaccCsv(bad, runWacc(bad), '2026-10-28T00:00:00.000Z');
        expect(out).toContain('MODEL ERRORS');
        expect(out).not.toContain('BUILD-UP');
    });
});
