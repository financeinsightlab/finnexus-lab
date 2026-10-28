// lib/finance/three-statement.ts — Linked 3-statement projection engine.
// Income statement → working capital → PP&E schedule → indirect cash flow →
// balance sheet, integrated so Assets = Liabilities + Equity every year by
// construction (verified in tests). Fixes vs the legacy component maths:
// depreciation vintages STOP at end of useful life (legacy depreciated old
// capex forever, masked by a PP&E floor at zero); inventory/payables days
// added (legacy modelled receivables only); optional scheduled debt
// repayment (legacy: financing ≡ 0); opening equity is returned explicitly
// as the plug it is. Disclosed simplifications: interest on beginning-of-
// year debt; tax = max(0, EBT×t) (no loss benefit/carry-forward); capex
// depreciates from its purchase year; WC days on 365-day year.

export interface ThreeStatementInputs {
    baseRevenue: number; revenueGrowth: number; cogsPct: number; opexPct: number; taxRate: number;
    initialCash: number; initialDebt: number; openingPpne: number;
    dsoDays: number; dioDays: number; dpoDays: number;
    interestRate: number; capexPct: number; depreciationYears: number;
    /** Fraction of beginning debt repaid each year (0 = bullet, legacy). */
    debtRepaymentPct: number; years: number;
}

export interface TsYear {
    year: number; revenue: number; cogs: number; grossProfit: number; grossMarginPct: number;
    opex: number; ebitda: number; ebitdaMarginPct: number; capex: number; depreciation: number;
    ebit: number; interestExpense: number; ebt: number; taxes: number; netIncome: number; netMarginPct: number;
    accountsReceivable: number; inventory: number; accountsPayable: number; ppne: number;
    totalAssets: number; totalDebt: number; equity: number; totalLiabEquity: number; balanceDifference: number;
    beginningCash: number; deltaWorkingCapital: number; cashFromOps: number; cashFromInvesting: number;
    cashFromFinancing: number; endingCash: number; debtRepaid: number;
}

export interface TsResult {
    errors: string[]; warnings: string[]; openingEquity: number | null; years: TsYear[];
    /** Drivers mapped for handoff into the DCF tool. */
    dcfHandoff: { revenue0: number; revenueGrowth: number; ebitdaMargin: number; taxRate: number; capexPctRevenue: number; daPctRevenue: number; nwcPctRevenue: number } | null;
}

export const TS_DEFAULTS: ThreeStatementInputs = {
    baseRevenue: 5_000_000, revenueGrowth: 0.30, cogsPct: 0.35, opexPct: 0.40, taxRate: 0.25,
    initialCash: 2_000_000, initialDebt: 1_500_000, openingPpne: 0,
    dsoDays: 45, dioDays: 0, dpoDays: 0, interestRate: 0.08,
    capexPct: 0.05, depreciationYears: 5, debtRepaymentPct: 0, years: 5,
};

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function validateTsInputs(i: ThreeStatementInputs): { errors: string[]; warnings: string[] } {
    const errors: string[] = []; const warnings: string[] = [];
    const nums: Array<[string, number]> = Object.entries(i) as Array<[string, number]>;
    for (const [k, v] of nums) if (!fin(v)) errors.push(`${k} must be a finite number.`);
    if (errors.length) return { errors, warnings };
    if (i.baseRevenue <= 0) errors.push('Base revenue must be greater than zero.');
    if (i.revenueGrowth <= -1) errors.push('Revenue growth must be greater than −100%.');
    if (i.taxRate < 0 || i.taxRate >= 1) errors.push('Tax rate must be between 0% and 100%.');
    if (i.initialDebt < 0 || i.initialCash < 0 || i.openingPpne < 0) errors.push('Opening cash, debt and PP&E cannot be negative.');
    if (i.dsoDays < 0 || i.dioDays < 0 || i.dpoDays < 0) errors.push('Working-capital days cannot be negative.');
    if (i.depreciationYears < 1) errors.push('Depreciation life must be at least 1 year.');
    if (!Number.isInteger(i.years) || i.years < 1 || i.years > 10) errors.push('Forecast years must be a whole number between 1 and 10.');
    if (i.debtRepaymentPct < 0 || i.debtRepaymentPct > 1) errors.push('Debt repayment must be between 0% and 100% of opening debt per year.');
    if (i.cogsPct + i.opexPct > 1) warnings.push('COGS + OpEx exceed 100% of revenue — EBITDA is negative in every year.');
    if (i.interestRate < 0) warnings.push('Negative interest rate entered — confirm this is intentional.');
    return { errors, warnings };
}

export function runThreeStatement(input: ThreeStatementInputs): TsResult {
    const { errors, warnings } = validateTsInputs(input);
    if (errors.length) return { errors, warnings, openingEquity: null, years: [], dcfHandoff: null };
    const i = input;

    const baseCogs = i.baseRevenue * i.cogsPct;
    let prevAR = (i.baseRevenue * i.dsoDays) / 365;
    let prevInv = (baseCogs * i.dioDays) / 365;
    let prevAP = (baseCogs * i.dpoDays) / 365;
    const openingEquity = i.initialCash + prevAR + prevInv + i.openingPpne - prevAP - i.initialDebt;

    let cash = i.initialCash;
    let debt = i.initialDebt;
    let equity = openingEquity;
    // Depreciation vintages: [amount, firstYear] — opening PP&E is a Yr-0 vintage
    // depreciating from Year 1; capex bought in year t depreciates from year t.
    const vintages: Array<{ amount: number; from: number }> = i.openingPpne > 0 ? [{ amount: i.openingPpne, from: 1 }] : [];
    let grossPpne = i.openingPpne;
    let accumDep = 0;

    const years: TsYear[] = [];
    const negativeCashYears: number[] = [];

    for (let t = 1; t <= i.years; t++) {
        const beginningCash = cash;
        const revenue = i.baseRevenue * Math.pow(1 + i.revenueGrowth, t);
        const cogs = revenue * i.cogsPct;
        const grossProfit = revenue - cogs;
        const opex = revenue * i.opexPct;
        const ebitda = grossProfit - opex;

        const capex = revenue * i.capexPct;
        vintages.push({ amount: capex, from: t });
        grossPpne += capex;
        const depreciation = vintages
            .filter((v) => t >= v.from && t < v.from + i.depreciationYears)
            .reduce((s, v) => s + v.amount / i.depreciationYears, 0);
        accumDep += depreciation;
        const ppne = Math.max(0, grossPpne - accumDep);

        const ebit = ebitda - depreciation;
        const interestExpense = debt * i.interestRate;
        const ebt = ebit - interestExpense;
        const taxes = Math.max(0, ebt * i.taxRate);
        const netIncome = ebt - taxes;

        const ar = (revenue * i.dsoDays) / 365;
        const inv = (cogs * i.dioDays) / 365;
        const ap = (cogs * i.dpoDays) / 365;
        const deltaWC = (ar - prevAR) + (inv - prevInv) - (ap - prevAP);

        const cashFromOps = netIncome + depreciation - deltaWC;
        const debtRepaid = Math.min(debt, debt * i.debtRepaymentPct);
        const cashFromFinancing = -debtRepaid;
        debt -= debtRepaid;
        cash = beginningCash + cashFromOps - capex + cashFromFinancing;
        if (cash < 0) negativeCashYears.push(t);
        equity += netIncome;

        const totalAssets = cash + ar + inv + ppne;
        const totalLiabEquity = ap + debt + equity;

        years.push({
            year: t, revenue, cogs, grossProfit, grossMarginPct: revenue ? (grossProfit / revenue) * 100 : 0,
            opex, ebitda, ebitdaMarginPct: revenue ? (ebitda / revenue) * 100 : 0,
            capex, depreciation, ebit, interestExpense, ebt, taxes, netIncome,
            netMarginPct: revenue ? (netIncome / revenue) * 100 : 0,
            accountsReceivable: ar, inventory: inv, accountsPayable: ap, ppne,
            totalAssets, totalDebt: debt, equity, totalLiabEquity,
            balanceDifference: totalAssets - totalLiabEquity,
            beginningCash, deltaWorkingCapital: deltaWC, cashFromOps,
            cashFromInvesting: -capex, cashFromFinancing, endingCash: cash, debtRepaid,
        });
        prevAR = ar; prevInv = inv; prevAP = ap;
    }

    const outWarnings = [...warnings];
    if (negativeCashYears.length) outWarnings.push(`Cash goes negative in year(s) ${negativeCashYears.join(', ')} — the model has an unfunded gap; real companies would draw a revolver or raise capital (not modelled).`);
    if (years.some((y) => y.ebt < 0)) outWarnings.push('Loss-making year(s): tax is floored at zero with no loss carry-forward (disclosed simplification).');
    if (openingEquity < 0) outWarnings.push('Opening equity (the balance-sheet plug) is negative — opening debt exceeds opening assets.');

    return {
        errors: [], warnings: outWarnings, openingEquity, years,
        dcfHandoff: {
            revenue0: i.baseRevenue, revenueGrowth: i.revenueGrowth,
            ebitdaMargin: 1 - i.cogsPct - i.opexPct, taxRate: i.taxRate, capexPctRevenue: i.capexPct,
            daPctRevenue: i.capexPct / i.depreciationYears, nwcPctRevenue: i.dsoDays / 365,
        },
    };
}

const NUMERIC_KEYS: Array<keyof ThreeStatementInputs> = [
    'baseRevenue', 'revenueGrowth', 'cogsPct', 'opexPct', 'taxRate', 'initialCash', 'initialDebt',
    'openingPpne', 'dsoDays', 'dioDays', 'dpoDays', 'interestRate', 'capexPct', 'depreciationYears',
    'debtRepaymentPct', 'years',
];
export function parseTsInputs(raw: Record<string, unknown> | null | undefined, base: ThreeStatementInputs = TS_DEFAULTS): ThreeStatementInputs {
    const out = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of NUMERIC_KEYS) {
        const v = raw[k as string]; const n = typeof v === 'string' ? Number(v) : v;
        if (fin(n)) (out as unknown as Record<string, number>)[k] = n;
    }
    out.years = Math.min(10, Math.max(1, Math.round(out.years) || 5));
    return out;
}
export function tsInputsToQuery(i: ThreeStatementInputs): string {
    const p = new URLSearchParams();
    for (const k of NUMERIC_KEYS) p.set(k, String(i[k]));
    return p.toString();
}
