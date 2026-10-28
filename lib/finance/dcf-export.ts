// lib/finance/dcf-export.ts — CSV workbook export for the DCF tool.
//
// Produces one Excel/Sheets-openable CSV with clearly separated sections
// (assumptions → projection → bridge → scenarios → sensitivity → sources).
// Pure string building from engine output so it is unit-testable and can
// never diverge from the on-screen numbers.

import type {
    DcfInputs,
    DcfResult,
    ScenarioOutcome,
    SensitivityGrid,
} from '@/lib/finance/dcf';

const esc = (v: string | number | null | undefined): string => {
    if (v === null || v === undefined) return '';
    const s = typeof v === 'number' ? (Number.isFinite(v) ? String(Math.round(v * 100) / 100) : '') : v;
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const row = (...cells: Array<string | number | null | undefined>) => cells.map(esc).join(',');
const pctTxt = (f: number) => `${(f * 100).toFixed(2)}%`;

export interface DcfExportMeta {
    currency: string;
    /** ISO timestamp of export; passed in so the function stays deterministic. */
    exportedAt: string;
    sourceNote?: string;
}

export function buildDcfCsv(
    inputs: DcfInputs,
    result: DcfResult,
    scenarios: ScenarioOutcome[] | null,
    grid: SensitivityGrid | null,
    meta: DcfExportMeta,
): string {
    const L: string[] = [];
    L.push(row('Kunwar Analytics — DCF Valuation (FCFF)'));
    L.push(row('Exported at', meta.exportedAt));
    L.push(row('Currency (input unit — no FX conversion applied)', meta.currency));
    L.push(row('Source of inputs', meta.sourceNote ?? 'User-entered assumptions (not live market data)'));
    L.push('');

    L.push(row('ASSUMPTIONS'));
    L.push(row('Revenue (Yr 0)', inputs.revenue0));
    L.push(row('Revenue growth', pctTxt(inputs.revenueGrowth)));
    L.push(row('Growth fade to terminal', inputs.growthFade ? 'Yes' : 'No'));
    L.push(row('EBITDA margin', pctTxt(inputs.ebitdaMargin)));
    L.push(row('D&A % revenue', pctTxt(inputs.daPctRevenue)));
    L.push(row('Tax rate', pctTxt(inputs.taxRate)));
    L.push(row('Capex % revenue', pctTxt(inputs.capexPctRevenue)));
    L.push(row('NWC % revenue (level)', pctTxt(inputs.nwcPctRevenue)));
    L.push(row('WACC', pctTxt(inputs.wacc)));
    L.push(row('Terminal growth', pctTxt(inputs.terminalGrowth)));
    L.push(row('Forecast years', inputs.forecastYears));
    L.push(row('Mid-year discounting', inputs.midYearDiscounting ? 'Yes' : 'No'));
    L.push(row('Tax benefit on losses', inputs.taxBenefitOnLosses ? 'Yes' : 'No'));
    L.push(row('Exit EV/EBITDA multiple (cross-check)', inputs.exitMultiple));
    L.push(row('Cash & equivalents', inputs.cash));
    L.push(row('Total debt', inputs.debt));
    L.push(row('Shares outstanding', inputs.shares));
    L.push('');

    if (result.errors.length) {
        L.push(row('MODEL ERRORS (valuation not computed)'));
        result.errors.forEach((e) => L.push(row(e)));
        return L.join('\n');
    }

    const heads = ['Line item', 'Yr 0 (actuals)', ...result.years.map((y) => `Year ${y.year}`)];
    L.push(row('PROJECTION & DISCOUNTING'));
    L.push(row(...heads));
    const b = result.baseYear!;
    const line = (label: string, base: number | string, pick: (y: (typeof result.years)[number]) => number) =>
        L.push(row(label, base as never, ...result.years.map(pick)));
    line('Revenue', b.revenue, (y) => y.revenue);
    line('EBITDA', b.ebitda, (y) => y.ebitda);
    line('Less: D&A', -b.da, (y) => -y.da);
    line('EBIT', b.ebit, (y) => y.ebit);
    line('Less: Tax', -b.tax, (y) => -y.tax);
    line('NOPAT', b.nopat, (y) => y.nopat);
    line('Add: D&A', b.da, (y) => y.da);
    line('Less: Capex', -b.capex, (y) => -y.capex);
    L.push(row('Less: Change in NWC', 'n/a', ...result.years.map((y) => -y.deltaNwc)));
    line('Unlevered Free Cash Flow', b.ufcf, (y) => y.ufcf);
    L.push(row('Discount factor', 'excluded from PV', ...result.years.map((y) => Math.round(y.discountFactor * 10000) / 10000)));
    L.push(row('Present value', 'excluded from PV', ...result.years.map((y) => y.presentValue)));
    L.push('');

    L.push(row('VALUATION BRIDGE'));
    L.push(row('Sum of PV (explicit period)', result.sumPvExplicit));
    L.push(row('Terminal value (Gordon, undiscounted)', result.terminalValue));
    L.push(row('PV of terminal value', result.pvTerminalValue));
    L.push(row('Enterprise value', result.enterpriseValue));
    L.push(row('Plus: Cash & equivalents', inputs.cash));
    L.push(row('Less: Total debt', -inputs.debt));
    L.push(row('Implied equity value', result.equityValue));
    L.push(row('Shares outstanding', inputs.shares));
    L.push(row('Implied share price', result.impliedSharePrice));
    L.push(row('Terminal value share of EV', result.terminalValueSharePct !== null ? `${result.terminalValueSharePct.toFixed(1)}%` : ''));
    if (result.exitMultipleCheck) {
        const x = result.exitMultipleCheck;
        L.push(row('— Exit-multiple cross-check —'));
        L.push(row('TV at exit multiple', x.terminalValueExit));
        L.push(row('EV at exit multiple', x.enterpriseValueExit));
        L.push(row('Share price at exit multiple', x.impliedSharePriceExit));
        L.push(row('Implied perpetuity growth of exit multiple', pctTxt(x.impliedTerminalGrowth)));
        L.push(row('Implied exit multiple of Gordon TV', `${x.impliedExitMultiple.toFixed(1)}x`));
    }
    L.push('');

    if (scenarios) {
        L.push(row('SCENARIOS', 'Growth', 'EBITDA margin', 'WACC', 'Enterprise value', 'Equity value', 'Share price'));
        for (const s of scenarios) {
            L.push(row(
                s.name, pctTxt(s.inputs.revenueGrowth), pctTxt(s.inputs.ebitdaMargin), pctTxt(s.inputs.wacc),
                s.result.enterpriseValue, s.result.equityValue, s.result.impliedSharePrice,
            ));
        }
        L.push('');
    }

    if (grid) {
        L.push(row('SENSITIVITY — implied share price', ...grid.growthValues.map((g) => `g ${pctTxt(g)}`)));
        grid.waccValues.forEach((w, i) => {
            L.push(row(`WACC ${pctTxt(w)}`, ...grid.sharePrice[i].map((v) => (v === null ? 'n/a' : v))));
        });
        L.push('');
    }

    if (result.warnings.length) {
        L.push(row('DIAGNOSTICS / WARNINGS'));
        result.warnings.forEach((w) => L.push(row(w)));
    }
    return L.join('\n');
}
