// lib/finance/tokenomics.ts — Token supply/vesting simulator engine.
// Fixes vs legacy: allocations were SILENTLY renormalised to 100% (a typo
// became a different tokenomics with no signal); the TGE unlock (10%) and
// 48-month community vesting were hard-coded constants presented as model
// behaviour. Engine: TGE % and community vesting months are inputs;
// allocation mismatch is a loud warning + renormalisation, never silent;
// market-cap figures carry the constant-price disclosure (price is held
// flat — supply-side simulation only, inflows say nothing about price).

export interface TokenomicsInputs {
    totalSupply: number; tokenPrice: number;
    teamPct: number; investorPct: number; communityPct: number;
    teamCliffMonths: number; teamVestingMonths: number;
    investorCliffMonths: number; investorVestingMonths: number;
    communityTgePct: number; communityVestingMonths: number; horizonMonths: number;
}

export interface TokenomicsResult {
    errors: string[]; warnings: string[];
    fdv: number | null;
    allocations: { team: number; investor: number; community: number } | null;
    allocationSumPct: number | null;
    series: Array<{ month: number; team: number; investor: number; community: number; circulating: number; circulatingPct: number; marketCap: number }>;
    day1CirculatingPct: number | null; day1MarketCap: number | null;
    fullyVestedMonth: number | null;
}

export const TOKENOMICS_DEFAULTS: TokenomicsInputs = {
    totalSupply: 1_000_000_000, tokenPrice: 0.10,
    teamPct: 0.20, investorPct: 0.15, communityPct: 0.65,
    teamCliffMonths: 12, teamVestingMonths: 24, investorCliffMonths: 6, investorVestingMonths: 18,
    communityTgePct: 0.10, communityVestingMonths: 48, horizonMonths: 48,
};

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

/** Linear post-cliff unlock fraction at a month: 0 through the cliff month,
 *  then (month−cliff)/vesting capped at 1. vesting=0 → all unlocks at cliff+1. */
export function unlockFraction(month: number, cliffMonths: number, vestingMonths: number): number {
    if (month <= cliffMonths) return 0;
    if (vestingMonths <= 0) return 1;
    return Math.min(1, (month - cliffMonths) / vestingMonths);
}

export function runTokenomics(i: TokenomicsInputs): TokenomicsResult {
    const errors: string[] = []; const warnings: string[] = [];
    for (const [k, v] of Object.entries(i)) if (!fin(v)) errors.push(`${k} must be a finite number.`);
    if (!errors.length) {
        if (i.totalSupply <= 0) errors.push('Total supply must be greater than zero.');
        if (i.tokenPrice < 0) errors.push('Token price cannot be negative.');
        for (const k of ['teamPct', 'investorPct', 'communityPct', 'communityTgePct'] as const) {
            if (i[k] < 0 || i[k] > 1) errors.push(`${k} must be between 0% and 100%.`);
        }
        if (i.teamPct + i.investorPct + i.communityPct <= 0) errors.push('Allocations must sum to more than zero.');
        if (i.teamCliffMonths < 0 || i.investorCliffMonths < 0 || i.teamVestingMonths < 0 || i.investorVestingMonths < 0 || i.communityVestingMonths < 0) {
            errors.push('Cliff and vesting months cannot be negative.');
        }
        if (!Number.isInteger(i.horizonMonths) || i.horizonMonths < 1 || i.horizonMonths > 120) errors.push('Horizon must be a whole number of months between 1 and 120.');
    }
    const empty: TokenomicsResult = {
        errors, warnings, fdv: null, allocations: null, allocationSumPct: null, series: [],
        day1CirculatingPct: null, day1MarketCap: null, fullyVestedMonth: null,
    };
    if (errors.length) return empty;

    const sum = i.teamPct + i.investorPct + i.communityPct;
    let { teamPct, investorPct, communityPct } = i;
    if (Math.abs(sum - 1) > 1e-9) {
        warnings.push(`Allocations sum to ${(sum * 100).toFixed(1)}% — renormalised to 100% for the simulation. Fix the inputs so the published tokenomics match what you model.`);
        teamPct /= sum; investorPct /= sum; communityPct /= sum;
    }
    const totals = { team: i.totalSupply * teamPct, investor: i.totalSupply * investorPct, community: i.totalSupply * communityPct };

    const series: TokenomicsResult['series'] = [];
    let fullyVestedMonth: number | null = null;
    for (let m = 0; m <= i.horizonMonths; m++) {
        const team = totals.team * unlockFraction(m, i.teamCliffMonths, i.teamVestingMonths);
        const investor = totals.investor * unlockFraction(m, i.investorCliffMonths, i.investorVestingMonths);
        const communityVestedShare = i.communityTgePct + (1 - i.communityTgePct) * (i.communityVestingMonths > 0 ? Math.min(1, m / i.communityVestingMonths) : 1);
        const community = totals.community * (m === 0 ? i.communityTgePct : communityVestedShare);
        const circulating = team + investor + community;
        if (fullyVestedMonth === null && circulating >= i.totalSupply * (1 - 1e-12)) fullyVestedMonth = m;
        series.push({
            month: m, team, investor, community, circulating,
            circulatingPct: (circulating / i.totalSupply) * 100, marketCap: circulating * i.tokenPrice,
        });
    }

    const day1 = series[0];
    if (day1 && day1.circulatingPct < 10) warnings.push(`Only ${day1.circulatingPct.toFixed(1)}% of supply circulates at TGE — a low-float launch: the FDV/float gap is where most post-listing drawdowns come from.`);
    if (i.teamCliffMonths < 12) warnings.push('Team cliff under 12 months is below the market-standard alignment signal investors look for.');
    warnings.push('Market-cap figures hold the token price constant — this is a supply schedule, not a price forecast. Unlocks change float; demand sets price.');

    return {
        errors: [], warnings, fdv: i.totalSupply * i.tokenPrice, allocations: totals, allocationSumPct: sum * 100,
        series, day1CirculatingPct: day1?.circulatingPct ?? null, day1MarketCap: day1?.marketCap ?? null, fullyVestedMonth,
    };
}

const KEYS: Array<keyof TokenomicsInputs> = [
    'totalSupply', 'tokenPrice', 'teamPct', 'investorPct', 'communityPct', 'teamCliffMonths', 'teamVestingMonths',
    'investorCliffMonths', 'investorVestingMonths', 'communityTgePct', 'communityVestingMonths', 'horizonMonths',
];
export function parseTokenomicsInputs(raw: Record<string, unknown> | null | undefined, base: TokenomicsInputs = TOKENOMICS_DEFAULTS): TokenomicsInputs {
    const out = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of KEYS) { const v = raw[k as string]; const n = typeof v === 'string' ? Number(v) : v; if (fin(n)) (out as unknown as Record<string, number>)[k] = n; }
    out.horizonMonths = Math.min(120, Math.max(1, Math.round(out.horizonMonths) || 48));
    return out;
}
export function tokenomicsToQuery(i: TokenomicsInputs): string {
    const p = new URLSearchParams();
    for (const k of KEYS) p.set(k, String(i[k]));
    return p.toString();
}
