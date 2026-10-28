// lib/finance/qcommerce.ts — Quick-commerce dark-store P&L engine.
// KEY FIX vs legacy: break-even volume. Legacy contribution per order
// omitted the returns loss AND revenue-linked marketing, understating
// break-even by ~9.6× at the defaults (legacy ≈348 orders/day vs
// correct ≈3,333/day) — advice-grade wrong. Engine computes a complete
// per-order waterfall (AOV + delivery fee − COGS − platform fee − returns
// − picking − last-mile − marketing) and break-even = fixed ÷ that
// contribution. Disclosed simplifications: 30-day month; staff/rent are
// step-fixed (held constant across volume scenarios); returns loss valued
// at gross merchandise value.

export interface QCommerceInputs {
    ordersPerDay: number; avgOrderValue: number; deliveryFee: number;
    darkStoreRentMonthly: number; staffCount: number; avgStaffSalaryMonthly: number;
    pickingCostPerOrder: number; lastMileCostPerOrder: number;
    cogsPct: number; platformFeePct: number; returnRatePct: number; marketingPct: number;
    daysPerMonth: number;
}

export interface QcScenario { ordersPerDay: number; revenue: number; storeEbitdaAfterMarketing: number; ebitdaMarginPct: number }

export interface QcResult {
    errors: string[]; warnings: string[];
    ordersPerMonth: number | null; grossRevenue: number | null; deliveryRevenue: number | null; totalRevenue: number | null;
    productCogs: number | null; platformFees: number | null; returnsLoss: number | null;
    cm1: number | null; cm1MarginPct: number | null;
    pickingCosts: number | null; lastMileCosts: number | null; cm2: number | null; cm2MarginPct: number | null;
    staffCosts: number | null; totalFixedCosts: number | null; storeEbitda: number | null; storeEbitdaMarginPct: number | null;
    marketingSpend: number | null; netStoreProfit: number | null; netMarginPct: number | null;
    perOrder: {
        revenue: number; cogs: number; platformFee: number; returns: number; picking: number;
        lastMile: number; marketing: number; contributionAfterMarketing: number; fixedAllocated: number; profit: number;
    } | null;
    /** Orders/day at which store profit (after marketing) = 0; null if contribution ≤ 0 (never breaks even by scaling). */
    breakEvenOrdersPerDay: number | null;
    scenarios: QcScenario[];
}

export const QC_DEFAULTS: QCommerceInputs = {
    ordersPerDay: 300, avgOrderValue: 450, deliveryFee: 25,
    darkStoreRentMonthly: 150_000, staffCount: 25, avgStaffSalaryMonthly: 18_000,
    pickingCostPerOrder: 18, lastMileCostPerOrder: 35,
    cogsPct: 0.62, platformFeePct: 0.18, returnRatePct: 0.03, marketingPct: 0.08, daysPerMonth: 30,
};

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

function monthPnl(i: QCommerceInputs, ordersPerDay: number) {
    const opm = ordersPerDay * i.daysPerMonth;
    const grossRevenue = opm * i.avgOrderValue;
    const deliveryRevenue = opm * i.deliveryFee;
    const totalRevenue = grossRevenue + deliveryRevenue;
    const productCogs = grossRevenue * i.cogsPct;
    const platformFees = totalRevenue * i.platformFeePct;
    const returnsLoss = grossRevenue * i.returnRatePct;
    const cm1 = totalRevenue - productCogs - platformFees - returnsLoss;
    const pickingCosts = opm * i.pickingCostPerOrder;
    const lastMileCosts = opm * i.lastMileCostPerOrder;
    const cm2 = cm1 - pickingCosts - lastMileCosts;
    const staffCosts = i.staffCount * i.avgStaffSalaryMonthly;
    const totalFixedCosts = i.darkStoreRentMonthly + staffCosts;
    const storeEbitda = cm2 - totalFixedCosts;
    const marketingSpend = totalRevenue * i.marketingPct;
    const netStoreProfit = storeEbitda - marketingSpend;
    return { opm, grossRevenue, deliveryRevenue, totalRevenue, productCogs, platformFees, returnsLoss, cm1, pickingCosts, lastMileCosts, cm2, staffCosts, totalFixedCosts, storeEbitda, marketingSpend, netStoreProfit };
}

const emptyQc = (errors: string[], warnings: string[]): QcResult => ({
    errors, warnings, ordersPerMonth: null, grossRevenue: null, deliveryRevenue: null, totalRevenue: null,
    productCogs: null, platformFees: null, returnsLoss: null, cm1: null, cm1MarginPct: null,
    pickingCosts: null, lastMileCosts: null, cm2: null, cm2MarginPct: null, staffCosts: null,
    totalFixedCosts: null, storeEbitda: null, storeEbitdaMarginPct: null, marketingSpend: null,
    netStoreProfit: null, netMarginPct: null, perOrder: null, breakEvenOrdersPerDay: null, scenarios: [],
});

export function runQCommerce(input: QCommerceInputs, scenarioOrders: number[] = [150, 300, 500, 800, 1200, 1800]): QcResult {
    const errors: string[] = []; const warnings: string[] = [];
    for (const [k, v] of Object.entries(input)) if (!fin(v)) errors.push(`${k} must be a finite number.`);
    if (!errors.length) {
        if (input.ordersPerDay < 0 || input.avgOrderValue < 0 || input.deliveryFee < 0) errors.push('Orders, AOV and delivery fee cannot be negative.');
        for (const k of ['cogsPct', 'platformFeePct', 'returnRatePct', 'marketingPct'] as const) {
            if (input[k] < 0 || input[k] > 1) errors.push(`${k} must be between 0% and 100%.`);
        }
        if (input.staffCount < 0 || input.avgStaffSalaryMonthly < 0 || input.darkStoreRentMonthly < 0) errors.push('Staffing and rent cannot be negative.');
        if (input.daysPerMonth < 1 || input.daysPerMonth > 31) errors.push('Days per month must be between 1 and 31.');
    }
    if (errors.length) return emptyQc(errors, warnings);

    const m = monthPnl(input, input.ordersPerDay);
    const marginPct = (v: number) => (m.totalRevenue > 0 ? (v / m.totalRevenue) * 100 : null);
    const per = m.opm > 0 ? {
        revenue: m.totalRevenue / m.opm, cogs: m.productCogs / m.opm, platformFee: m.platformFees / m.opm,
        returns: m.returnsLoss / m.opm, picking: input.pickingCostPerOrder, lastMile: input.lastMileCostPerOrder,
        marketing: m.marketingSpend / m.opm,
        contributionAfterMarketing: 0, fixedAllocated: m.totalFixedCosts / m.opm, profit: m.netStoreProfit / m.opm,
    } : null;
    if (per) per.contributionAfterMarketing = per.revenue - per.cogs - per.platformFee - per.returns - per.picking - per.lastMile - per.marketing;

    const breakEvenOrdersPerDay = per && per.contributionAfterMarketing > 0
        ? m.totalFixedCosts / per.contributionAfterMarketing / input.daysPerMonth : null;

    if (per && per.contributionAfterMarketing <= 0) {
        warnings.push('Contribution per order (after returns and marketing) is not positive — no order volume breaks this store even; fix price/COGS/fees before chasing scale.');
    }
    if (m.netStoreProfit < 0 && breakEvenOrdersPerDay !== null) {
        warnings.push(`Store loses money at ${input.ordersPerDay} orders/day; break-even needs ≈${Math.ceil(breakEvenOrdersPerDay)} orders/day at current per-order economics (fixed costs held constant).`);
    }

    const scenarios: QcScenario[] = scenarioOrders.map((opd) => {
        const s = monthPnl(input, opd);
        return {
            ordersPerDay: opd, revenue: s.totalRevenue, storeEbitdaAfterMarketing: s.netStoreProfit,
            ebitdaMarginPct: s.totalRevenue > 0 ? (s.netStoreProfit / s.totalRevenue) * 100 : 0,
        };
    });

    return {
        errors: [], warnings, ordersPerMonth: m.opm, grossRevenue: m.grossRevenue, deliveryRevenue: m.deliveryRevenue,
        totalRevenue: m.totalRevenue, productCogs: m.productCogs, platformFees: m.platformFees, returnsLoss: m.returnsLoss,
        cm1: m.cm1, cm1MarginPct: marginPct(m.cm1), pickingCosts: m.pickingCosts, lastMileCosts: m.lastMileCosts,
        cm2: m.cm2, cm2MarginPct: marginPct(m.cm2), staffCosts: m.staffCosts, totalFixedCosts: m.totalFixedCosts,
        storeEbitda: m.storeEbitda, storeEbitdaMarginPct: marginPct(m.storeEbitda), marketingSpend: m.marketingSpend,
        netStoreProfit: m.netStoreProfit, netMarginPct: marginPct(m.netStoreProfit),
        perOrder: per, breakEvenOrdersPerDay, scenarios,
    };
}

const KEYS: Array<keyof QCommerceInputs> = [
    'ordersPerDay', 'avgOrderValue', 'deliveryFee', 'darkStoreRentMonthly', 'staffCount', 'avgStaffSalaryMonthly',
    'pickingCostPerOrder', 'lastMileCostPerOrder', 'cogsPct', 'platformFeePct', 'returnRatePct', 'marketingPct', 'daysPerMonth',
];
export function parseQcInputs(raw: Record<string, unknown> | null | undefined, base: QCommerceInputs = QC_DEFAULTS): QCommerceInputs {
    const out = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of KEYS) { const v = raw[k as string]; const n = typeof v === 'string' ? Number(v) : v; if (fin(n)) (out as unknown as Record<string, number>)[k] = n; }
    return out;
}
export function qcInputsToQuery(i: QCommerceInputs): string {
    const p = new URLSearchParams();
    for (const k of KEYS) p.set(k, String(i[k]));
    return p.toString();
}
