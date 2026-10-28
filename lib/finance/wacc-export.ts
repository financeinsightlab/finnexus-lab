// lib/finance/wacc-export.ts — CSV export for the WACC calculator.
// Pure string building from engine output (same contract as dcf-export.ts):
// provenance first, assumptions, build-up steps, the relevered
// leverage sweep, diagnostics, and the resulting DCF handoff value.

import type { WaccInputs, WaccResult } from '@/lib/finance/wacc';

const esc = (v: string | number | null | undefined): string => {
    if (v === null || v === undefined) return '';
    const s = typeof v === 'number' ? (Number.isFinite(v) ? String(Math.round(v * 10000) / 10000) : '') : v;
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const row = (...cells: Array<string | number | null | undefined>) => cells.map(esc).join(',');
const pctTxt = (f: number | null) => (f === null ? '' : `${(f * 100).toFixed(4)}%`);

export function buildWaccCsv(inputs: WaccInputs, result: WaccResult, exportedAt: string): string {
    const L: string[] = [];
    L.push(row('Kunwar Analytics — WACC Build-Up'));
    L.push(row('Exported at', exportedAt));
    L.push(row('Source of inputs', 'User-entered assumptions (defaults are illustrative — not live market data)'));
    L.push('');

    L.push(row('ASSUMPTIONS'));
    L.push(row('Risk-free rate', pctTxt(inputs.riskFreeRate)));
    L.push(row('Market risk premium', pctTxt(inputs.marketRiskPremium)));
    L.push(row('Beta mode', inputs.betaMode));
    if (inputs.betaMode === 'levered') L.push(row('Levered beta (entered)', inputs.leveredBeta));
    if (inputs.betaMode === 'relevered') L.push(row('Unlevered (peer) beta', inputs.unleveredBeta));
    L.push(row('Size premium', pctTxt(inputs.sizePremium)));
    L.push(row('Company-specific premium', pctTxt(inputs.companySpecificPremium)));
    L.push(row('Country risk premium', pctTxt(inputs.countryRiskPremium)));
    L.push(row('Cost-of-debt mode', inputs.costOfDebtMode));
    if (inputs.costOfDebtMode === 'direct') L.push(row('Pre-tax cost of debt', pctTxt(inputs.preTaxCostOfDebt)));
    else L.push(row('Credit spread over Rf', pctTxt(inputs.creditSpread)));
    L.push(row('Tax rate', pctTxt(inputs.taxRate)));
    L.push(row('Weights mode', inputs.weightsMode));
    if (inputs.weightsMode === 'de') L.push(row('D/E ratio', inputs.debtEquityRatio));
    if (inputs.weightsMode === 'values') { L.push(row('Market value of equity', inputs.marketValueEquity)); L.push(row('Market value of debt', inputs.marketValueDebt)); }
    if (inputs.weightsMode === 'target') L.push(row('Target debt weight', pctTxt(inputs.targetDebtWeight)));
    L.push('');

    if (result.errors.length) {
        L.push(row('MODEL ERRORS (WACC not computed)'));
        result.errors.forEach((e) => L.push(row(e)));
        return L.join('\n');
    }

    L.push(row('BUILD-UP'));
    if (result.unleveredBeta !== null) L.push(row('Unlevered beta (anchor)', result.unleveredBeta));
    if (result.leveredBetaUsed !== null) L.push(row('Levered beta used', result.leveredBetaUsed));
    L.push(row('Cost of equity', pctTxt(result.costOfEquity)));
    L.push(row('Pre-tax cost of debt', pctTxt(result.preTaxCostOfDebt)));
    L.push(row('After-tax cost of debt', pctTxt(result.afterTaxCostOfDebt)));
    L.push(row('Weight of equity', pctTxt(result.weightEquity)));
    L.push(row('Weight of debt', pctTxt(result.weightDebt)));
    L.push(row('Implied D/E', result.debtEquityRatio));
    L.push(row('WACC', pctTxt(result.wacc)));
    L.push(row('WACC (fraction, for DCF handoff)', result.wacc));
    L.push('');

    L.push(row('LEVERAGE SWEEP (Hamada-relevered; Rd held constant)'));
    L.push(row('D/E', 'Levered beta', 'Cost of equity', 'wE', 'wD', 'WACC'));
    for (const s of result.sweep) {
        L.push(row(s.debtEquityRatio, s.leveredBeta === null ? 'n/a (build-up)' : s.leveredBeta, pctTxt(s.costOfEquity), pctTxt(s.weightEquity), pctTxt(s.weightDebt), pctTxt(s.wacc)));
    }
    L.push('');

    if (result.warnings.length) {
        L.push(row('DIAGNOSTICS / WARNINGS'));
        result.warnings.forEach((w) => L.push(row(w)));
    }
    return L.join('\n');
}
