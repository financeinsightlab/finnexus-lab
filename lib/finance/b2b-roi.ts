// lib/finance/b2b-roi.ts — B2B marketing funnel economics engine.
// Fixes vs legacy: blended CAC displayed 0 when nothing closed (it is
// undefined/infinite, not zero); ROI was computed on gross first-year ACV
// with no margin or contract-duration dimension. Engine adds optional
// gross margin and expected contract years (defaults 100% / 1yr reproduce
// the legacy gross-revenue ROI exactly) and reports payback in months.

export interface B2bInputs {
    marketingSpend: number; totalLeads: number; sqlRate: number; winRate: number;
    acv: number; grossMargin: number; contractYears: number;
}

export interface B2bResult {
    errors: string[]; warnings: string[];
    costPerLead: number | null; sqls: number | null; costPerSql: number | null;
    closedWon: number | null; blendedCac: number | null;
    bookedRevenueFirstYear: number | null; lifetimeGrossProfitPerCustomer: number | null;
    lifetimeGrossProfit: number | null;
    /** (lifetime gross profit − spend) ÷ spend, in %. */
    roiPct: number | null;
    /** Months of per-customer gross profit to recover CAC. */
    cacPaybackMonths: number | null;
    ltvCacRatio: number | null;
}

export const B2B_DEFAULTS: B2bInputs = {
    marketingSpend: 50_000, totalLeads: 500, sqlRate: 0.20, winRate: 0.25,
    acv: 15_000, grossMargin: 1, contractYears: 1,
};

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const empty = (errors: string[], warnings: string[]): B2bResult => ({
    errors, warnings, costPerLead: null, sqls: null, costPerSql: null, closedWon: null, blendedCac: null,
    bookedRevenueFirstYear: null, lifetimeGrossProfitPerCustomer: null, lifetimeGrossProfit: null,
    roiPct: null, cacPaybackMonths: null, ltvCacRatio: null,
});

export function runB2bRoi(i: B2bInputs): B2bResult {
    const errors: string[] = []; const warnings: string[] = [];
    for (const [k, v] of Object.entries(i)) if (!fin(v)) errors.push(`${k} must be a finite number.`);
    if (!errors.length) {
        if (i.marketingSpend < 0 || i.acv < 0) errors.push('Spend and ACV cannot be negative.');
        if (i.totalLeads < 0) errors.push('Leads cannot be negative.');
        if (i.sqlRate < 0 || i.sqlRate > 1) errors.push('SQL rate must be between 0% and 100%.');
        if (i.winRate < 0 || i.winRate > 1) errors.push('Win rate must be between 0% and 100%.');
        if (i.grossMargin < 0 || i.grossMargin > 1) errors.push('Gross margin must be between 0% and 100%.');
        if (i.contractYears <= 0) errors.push('Contract years must be greater than zero.');
    }
    if (errors.length) return empty(errors, warnings);

    const sqls = i.totalLeads * i.sqlRate;
    const closedWon = sqls * i.winRate;
    const blendedCac = closedWon > 0 ? i.marketingSpend / closedWon : null;
    const ltvPerCustomer = i.acv * i.grossMargin * i.contractYears;
    const lifetimeGrossProfit = closedWon * ltvPerCustomer;
    const monthlyGpPerCustomer = (i.acv * i.grossMargin) / 12;

    if (closedWon === 0) warnings.push('Funnel closes zero deals at these rates — CAC and ROI are not meaningful (shown as such, not zero).');
    if (i.grossMargin === 1 && i.contractYears === 1) warnings.push('ROI is on gross first-year ACV (100% margin, 1-year life). Set gross margin and expected contract years for an economically honest figure.');
    if (blendedCac !== null && ltvPerCustomer > 0 && blendedCac > ltvPerCustomer) warnings.push('Blended CAC exceeds lifetime gross profit per customer — the funnel destroys value at any scale.');

    return {
        errors: [], warnings,
        costPerLead: i.totalLeads > 0 ? i.marketingSpend / i.totalLeads : null,
        sqls, costPerSql: sqls > 0 ? i.marketingSpend / sqls : null,
        closedWon, blendedCac,
        bookedRevenueFirstYear: closedWon * i.acv,
        lifetimeGrossProfitPerCustomer: ltvPerCustomer, lifetimeGrossProfit,
        roiPct: i.marketingSpend > 0 ? ((lifetimeGrossProfit - i.marketingSpend) / i.marketingSpend) * 100 : null,
        cacPaybackMonths: blendedCac !== null && monthlyGpPerCustomer > 0 ? blendedCac / monthlyGpPerCustomer : null,
        ltvCacRatio: blendedCac !== null && blendedCac > 0 ? ltvPerCustomer / blendedCac : null,
    };
}

const KEYS: Array<keyof B2bInputs> = ['marketingSpend', 'totalLeads', 'sqlRate', 'winRate', 'acv', 'grossMargin', 'contractYears'];
export function parseB2bInputs(raw: Record<string, unknown> | null | undefined, base: B2bInputs = B2B_DEFAULTS): B2bInputs {
    const out = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of KEYS) { const v = raw[k as string]; const n = typeof v === 'string' ? Number(v) : v; if (fin(n)) (out as unknown as Record<string, number>)[k] = n; }
    return out;
}
export function b2bInputsToQuery(i: B2bInputs): string {
    const p = new URLSearchParams();
    for (const k of KEYS) p.set(k, String(i[k]));
    return p.toString();
}
