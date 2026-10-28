// lib/finance/tvm.ts — Time-value-of-money engine: EMI/amortisation,
// PV/FV/annuity factors, Gordon growth. Formulas were already correct in the
// legacy component (incl. the r=0 branches); the engine adds the missing
// guard rails (years ≤ 0 and rate ≤ −100% previously produced ∞/NaN) and a
// complete amortisation schedule instead of a hard-coded 6 rows.

export interface EmiResult {
    errors: string[]; monthlyRate: number | null; months: number | null;
    emi: number | null; totalPayment: number | null; totalInterest: number | null;
    schedule: Array<{ month: number; interest: number; principal: number; balance: number }>;
}
export interface TvmResult { errors: string[]; presentValue: number | null; futureValue: number | null; annuityFactor: number | null }

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function computeEmi(principal: number, annualRate: number, years: number): EmiResult {
    const errors: string[] = [];
    if (!fin(principal) || !fin(annualRate) || !fin(years)) errors.push('Principal, rate and years must be finite numbers.');
    else {
        if (principal < 0) errors.push('Principal cannot be negative.');
        if (years <= 0) errors.push('Tenure must be greater than zero years.');
        if (annualRate <= -1) errors.push('Interest rate must be greater than −100%.');
        if (annualRate < 0) errors.push('Negative interest rates are not supported for EMI schedules.');
    }
    if (errors.length) return { errors, monthlyRate: null, months: null, emi: null, totalPayment: null, totalInterest: null, schedule: [] };

    const rM = annualRate / 12;
    const nM = Math.round(years * 12);
    if (nM < 1) return { errors: ['Tenure rounds to less than one month.'], monthlyRate: null, months: null, emi: null, totalPayment: null, totalInterest: null, schedule: [] };
    const emi = rM > 0 ? (principal * rM) / (1 - Math.pow(1 + rM, -nM)) : principal / nM;

    const schedule: EmiResult['schedule'] = [];
    let bal = principal;
    for (let m = 1; m <= nM; m++) {
        const interest = bal * rM;
        const prin = Math.min(emi - interest, bal);
        bal = Math.max(0, bal - prin);
        schedule.push({ month: m, interest, principal: prin, balance: bal });
    }
    const totalPayment = emi * nM;
    return { errors: [], monthlyRate: rM, months: nM, emi, totalPayment, totalInterest: totalPayment - principal, schedule };
}

export function computePvFv(cashFlow: number, rate: number, periods: number): TvmResult {
    const errors: string[] = [];
    if (!fin(cashFlow) || !fin(rate) || !fin(periods)) errors.push('Cash flow, rate and periods must be finite numbers.');
    else {
        if (rate <= -1) errors.push('Rate must be greater than −100% (the discount base 1+r must be positive).');
        if (periods < 0) errors.push('Periods cannot be negative.');
    }
    if (errors.length) return { errors, presentValue: null, futureValue: null, annuityFactor: null };
    const base = Math.pow(1 + rate, periods);
    return {
        errors: [],
        presentValue: cashFlow / base,
        futureValue: cashFlow * base,
        annuityFactor: rate > 0 ? (1 - Math.pow(1 + rate, -periods)) / rate : periods,
    };
}

/** Gordon growth value of a perpetuity: C1 / (r − g). Null unless r > g. */
export function gordonValue(nextPeriodCashFlow: number, discountRate: number, growthRate: number): { value: number | null; error: string | null } {
    if (!fin(nextPeriodCashFlow) || !fin(discountRate) || !fin(growthRate)) return { value: null, error: 'Inputs must be finite numbers.' };
    if (discountRate <= growthRate) return { value: null, error: 'Discount rate must exceed the perpetual growth rate, otherwise value is infinite.' };
    return { value: nextPeriodCashFlow / (discountRate - growthRate), error: null };
}
