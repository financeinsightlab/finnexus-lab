// lib/finance/workforce.ts — Autonomous-workforce restructuring economics.
// Audit findings vs legacy: the `currentMultiple` input was DEAD (never
// used in the maths — the "re-rating" used only the projected multiple);
// "gross margin expansion %" was actually a cost-reduction %; and value
// creation silently assumed the entire headcount is replaced. Engine:
// explicit `replacementSharePct` (share of headcount actually replaced;
// default 100% reproduces legacy), both multiples used with their roles
// labelled — savings valued at the PROJECTED multiple is an arbitrage
// framing that assumes the market re-rates the whole earnings stream;
// the conservative figure at the CURRENT multiple is also reported.

export interface WorkforceInputs {
    currentHeadcount: number; avgLoadedSalary: number; replacementSharePct: number;
    replacementRatio: number; apiCostPerAgentAnnual: number; upfrontCapex: number;
    severanceMonths: number; currentMultiple: number; projectedMultiple: number; horizonMonths: number;
}

export interface WorkforceResult {
    errors: string[]; warnings: string[];
    headsReplaced: number | null; requiredAgents: number | null;
    legacyAnnualRunRate: number | null; swarmAnnualRunRate: number | null; retainedHumanRunRate: number | null;
    severanceCost: number | null; totalRestructuringCost: number | null;
    annualCostSaving: number | null; costReductionPct: number | null;
    valueAtCurrentMultiple: number | null; valueAtProjectedMultiple: number | null;
    paybackMonths: number | null;
    series: Array<{ month: number; cumulativeLegacyCost: number; cumulativeNewCost: number }>;
}

export const WORKFORCE_DEFAULTS: WorkforceInputs = {
    currentHeadcount: 50, avgLoadedSalary: 95_000, replacementSharePct: 1, replacementRatio: 4,
    apiCostPerAgentAnnual: 12_000, upfrontCapex: 250_000, severanceMonths: 3,
    currentMultiple: 4.5, projectedMultiple: 9, horizonMonths: 60,
};

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const empty = (errors: string[], warnings: string[]): WorkforceResult => ({
    errors, warnings, headsReplaced: null, requiredAgents: null, legacyAnnualRunRate: null,
    swarmAnnualRunRate: null, retainedHumanRunRate: null, severanceCost: null, totalRestructuringCost: null,
    annualCostSaving: null, costReductionPct: null, valueAtCurrentMultiple: null,
    valueAtProjectedMultiple: null, paybackMonths: null, series: [],
});

export function runWorkforce(i: WorkforceInputs): WorkforceResult {
    const errors: string[] = []; const warnings: string[] = [];
    for (const [k, v] of Object.entries(i)) if (!fin(v)) errors.push(`${k} must be a finite number.`);
    if (!errors.length) {
        if (i.currentHeadcount < 0 || i.avgLoadedSalary < 0 || i.apiCostPerAgentAnnual < 0 || i.upfrontCapex < 0) errors.push('Headcount and costs cannot be negative.');
        if (i.replacementRatio <= 0) errors.push('Replacement ratio must be greater than zero.');
        if (i.replacementSharePct < 0 || i.replacementSharePct > 1) errors.push('Replacement share must be between 0% and 100%.');
        if (i.severanceMonths < 0) errors.push('Severance months cannot be negative.');
        if (i.currentMultiple < 0 || i.projectedMultiple < 0) errors.push('Valuation multiples cannot be negative.');
        if (!Number.isInteger(i.horizonMonths) || i.horizonMonths < 1 || i.horizonMonths > 120) errors.push('Horizon must be a whole number of months between 1 and 120.');
    }
    if (errors.length) return empty(errors, warnings);

    const legacyRunRate = i.currentHeadcount * i.avgLoadedSalary;
    const headsReplaced = i.currentHeadcount * i.replacementSharePct;
    const retainedRunRate = legacyRunRate - headsReplaced * i.avgLoadedSalary;
    const requiredAgents = Math.ceil(headsReplaced / i.replacementRatio);
    const swarmRunRate = requiredAgents * i.apiCostPerAgentAnnual;
    const severanceCost = headsReplaced * (i.avgLoadedSalary / 12) * i.severanceMonths;
    const totalRestructuring = i.upfrontCapex + severanceCost;
    const annualSaving = legacyRunRate - retainedRunRate - swarmRunRate;

    if (i.replacementSharePct === 1) warnings.push('Replacement share is 100% — every role is assumed fully replaced with zero human oversight, QA or exception handling cost. Partial replacement is usually the credible plan.');
    if (annualSaving <= 0) warnings.push('Agent run-rate meets or exceeds the payroll it replaces at these inputs — there is no cost arbitrage to value.');
    if (i.projectedMultiple > i.currentMultiple) warnings.push(`Valuing savings at the projected ${i.projectedMultiple}× (vs current ${i.currentMultiple}×) assumes the market re-rates the whole company — the current-multiple figure is the conservative case; don't underwrite the gap without evidence.`);

    const series: WorkforceResult['series'] = [];
    for (let m = 0; m <= i.horizonMonths; m += 3) {
        series.push({
            month: m,
            cumulativeLegacyCost: (legacyRunRate / 12) * m,
            cumulativeNewCost: totalRestructuring + ((retainedRunRate + swarmRunRate) / 12) * m,
        });
    }

    return {
        errors: [], warnings, headsReplaced, requiredAgents, legacyAnnualRunRate: legacyRunRate,
        swarmAnnualRunRate: swarmRunRate, retainedHumanRunRate: retainedRunRate,
        severanceCost, totalRestructuringCost: totalRestructuring, annualCostSaving: annualSaving,
        costReductionPct: legacyRunRate > 0 ? (annualSaving / legacyRunRate) * 100 : null,
        valueAtCurrentMultiple: Math.max(0, annualSaving * i.currentMultiple - totalRestructuring),
        valueAtProjectedMultiple: Math.max(0, annualSaving * i.projectedMultiple - totalRestructuring),
        paybackMonths: annualSaving > 0 ? totalRestructuring / (annualSaving / 12) : null,
        series,
    };
}

const KEYS: Array<keyof WorkforceInputs> = [
    'currentHeadcount', 'avgLoadedSalary', 'replacementSharePct', 'replacementRatio', 'apiCostPerAgentAnnual',
    'upfrontCapex', 'severanceMonths', 'currentMultiple', 'projectedMultiple', 'horizonMonths',
];
export function parseWorkforceInputs(raw: Record<string, unknown> | null | undefined, base: WorkforceInputs = WORKFORCE_DEFAULTS): WorkforceInputs {
    const out = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of KEYS) { const v = raw[k as string]; const n = typeof v === 'string' ? Number(v) : v; if (fin(n)) (out as unknown as Record<string, number>)[k] = n; }
    out.horizonMonths = Math.min(120, Math.max(1, Math.round(out.horizonMonths) || 60));
    return out;
}
export function workforceToQuery(i: WorkforceInputs): string {
    const p = new URLSearchParams();
    for (const k of KEYS) p.set(k, String(i[k]));
    return p.toString();
}
