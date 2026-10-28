// lib/finance/ai-roi.ts — AI augmentation ROI engine (shared maths for
// the AI Agent ROI tool). Legacy assumed automation % of payroll converts
// to cash saved from month 1 at 100% realisation. Engine adds two
// professional correctives, both defaulting to the legacy behaviour so
// goldens hold: `rampMonths` (savings scale in linearly as the workflow is
// adopted) and `savingsRealisationPct` (fraction of theoretical time saved
// that actually leaves the cost base — redeployed time is not cash).
// ROI here is first-year net savings ÷ upfront capex (labelled as such).

export interface AiRoiInputs {
    humanSalaryAnnual: number; teamSize: number; automationPct: number;
    aiMonthlyCost: number; capex: number; horizonMonths: number;
    rampMonths: number; savingsRealisationPct: number;
}

export interface AiRoiResult {
    errors: string[]; warnings: string[];
    humanCostMonthly: number | null; grossSavingsMonthlySteady: number | null;
    netMonthlySavingsSteady: number | null; netSavingsYear1: number | null;
    roiYear1Pct: number | null;
    /** First month cumulative net ≥ 0 (ramp-aware); null if never in horizon. */
    paybackMonth: number | null;
    series: Array<{ month: number; cumulativeHumanCost: number; cumulativeAiScenarioCost: number; cumulativeNet: number; monthlyNet: number }>;
}

export const AI_ROI_DEFAULTS: AiRoiInputs = {
    humanSalaryAnnual: 85_000, teamSize: 5, automationPct: 0.40, aiMonthlyCost: 2000,
    capex: 15_000, horizonMonths: 36, rampMonths: 0, savingsRealisationPct: 1,
};

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function runAiRoi(i: AiRoiInputs): AiRoiResult {
    const errors: string[] = []; const warnings: string[] = [];
    for (const [k, v] of Object.entries(i)) if (!fin(v)) errors.push(`${k} must be a finite number.`);
    if (!errors.length) {
        if (i.humanSalaryAnnual < 0 || i.aiMonthlyCost < 0 || i.capex < 0) errors.push('Costs cannot be negative.');
        if (i.teamSize < 0) errors.push('Team size cannot be negative.');
        if (i.automationPct < 0 || i.automationPct > 1) errors.push('Automation % must be between 0% and 100%.');
        if (i.savingsRealisationPct < 0 || i.savingsRealisationPct > 1) errors.push('Savings realisation must be between 0% and 100%.');
        if (!Number.isInteger(i.horizonMonths) || i.horizonMonths < 1 || i.horizonMonths > 120) errors.push('Horizon must be a whole number of months between 1 and 120.');
        if (i.rampMonths < 0 || i.rampMonths > i.horizonMonths) errors.push('Ramp months must lie between 0 and the horizon.');
    }
    const empty: AiRoiResult = {
        errors, warnings, humanCostMonthly: null, grossSavingsMonthlySteady: null, netMonthlySavingsSteady: null,
        netSavingsYear1: null, roiYear1Pct: null, paybackMonth: null, series: [],
    };
    if (errors.length) return empty;

    const humanMonthly = (i.humanSalaryAnnual * i.teamSize) / 12;
    const steadyGross = humanMonthly * i.automationPct * i.savingsRealisationPct;
    const steadyNet = steadyGross - i.aiMonthlyCost;

    const series: AiRoiResult['series'] = [];
    let cumHuman = 0;
    let cumAi = i.capex;
    let cumNet = -i.capex;
    let paybackMonth: number | null = i.capex === 0 ? 0 : null;
    let year1Net = 0;
    for (let m = 0; m <= i.horizonMonths; m++) {
        if (m === 0) {
            series.push({ month: 0, cumulativeHumanCost: 0, cumulativeAiScenarioCost: i.capex, cumulativeNet: cumNet, monthlyNet: -i.capex });
            continue;
        }
        const rampFactor = i.rampMonths > 0 ? Math.min(1, m / i.rampMonths) : 1;
        const grossSaved = steadyGross * rampFactor;
        const monthlyNet = grossSaved - i.aiMonthlyCost;
        cumHuman += humanMonthly;
        cumAi += humanMonthly - grossSaved + i.aiMonthlyCost;
        cumNet += monthlyNet;
        if (m <= 12) year1Net += monthlyNet;
        if (paybackMonth === null && cumNet >= 0) paybackMonth = m;
        series.push({ month: m, cumulativeHumanCost: cumHuman, cumulativeAiScenarioCost: cumAi, cumulativeNet: cumNet, monthlyNet });
    }

    if (steadyNet <= 0) warnings.push('At steady state the AI running cost meets or exceeds realised labour savings — this deployment never pays back; renegotiate cost or find a higher-automation workflow.');
    if (i.savingsRealisationPct === 1) warnings.push('Savings realisation is 100% — every automated hour is assumed to leave the cost base. If staff are redeployed rather than removed, lower this (50–70% is a common planning factor).');
    if (i.automationPct > 0.6) warnings.push('Automation above 60% of a knowledge-work role is aggressive — evidence it with a timed pilot before committing capex.');

    return {
        errors: [], warnings, humanCostMonthly: humanMonthly, grossSavingsMonthlySteady: steadyGross,
        netMonthlySavingsSteady: steadyNet, netSavingsYear1: year1Net,
        roiYear1Pct: i.capex > 0 ? (year1Net / i.capex) * 100 : null,
        paybackMonth, series,
    };
}

const KEYS: Array<keyof AiRoiInputs> = ['humanSalaryAnnual', 'teamSize', 'automationPct', 'aiMonthlyCost', 'capex', 'horizonMonths', 'rampMonths', 'savingsRealisationPct'];
export function parseAiRoiInputs(raw: Record<string, unknown> | null | undefined, base: AiRoiInputs = AI_ROI_DEFAULTS): AiRoiInputs {
    const out = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of KEYS) { const v = raw[k as string]; const n = typeof v === 'string' ? Number(v) : v; if (fin(n)) (out as unknown as Record<string, number>)[k] = n; }
    out.horizonMonths = Math.min(120, Math.max(1, Math.round(out.horizonMonths) || 36));
    return out;
}
export function aiRoiToQuery(i: AiRoiInputs): string {
    const p = new URLSearchParams();
    for (const k of KEYS) p.set(k, String(i[k]));
    return p.toString();
}
