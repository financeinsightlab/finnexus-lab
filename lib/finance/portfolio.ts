// lib/finance/portfolio.ts — Two-asset Markowitz engine (fractions
// internally). Adds vs legacy: correlation/sigma validation (ρ outside
// [−1,1] previously yielded negative variance that a sqrt-clamp silently
// hid), and the tangency (maximum-Sharpe) portfolio — closed form verified
// against a grid search in tests. MVP weight is clamped to [0,1]
// (no shorting) with the unconstrained value also returned for teaching.

export interface TwoAssetInputs {
    expectedReturn1: number; sigma1: number; expectedReturn2: number; sigma2: number;
    correlation: number; riskFreeRate: number;
}

export interface PortfolioPoint { weight1: number; expectedReturn: number; sigma: number; sharpe: number | null }

export interface PortfolioResult {
    errors: string[]; warnings: string[];
    minimumVariance: (PortfolioPoint & { unconstrainedWeight1: number }) | null;
    tangency: PortfolioPoint | null;
    frontier: PortfolioPoint[];
}

export const PORTFOLIO_DEFAULTS: TwoAssetInputs = {
    expectedReturn1: 0.14, sigma1: 0.20, expectedReturn2: 0.08, sigma2: 0.06,
    correlation: 0.2, riskFreeRate: 0.065,
};

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function portfolioStats(w1: number, i: TwoAssetInputs): PortfolioPoint {
    const w2 = 1 - w1;
    const er = w1 * i.expectedReturn1 + w2 * i.expectedReturn2;
    const variance = w1 ** 2 * i.sigma1 ** 2 + w2 ** 2 * i.sigma2 ** 2 + 2 * w1 * w2 * i.correlation * i.sigma1 * i.sigma2;
    const sigma = Math.sqrt(Math.max(variance, 0));
    return { weight1: w1, expectedReturn: er, sigma, sharpe: sigma > 0 ? (er - i.riskFreeRate) / sigma : null };
}

/** Minimum-variance weight (unconstrained); caller clamps for no-shorting. */
export function minimumVarianceWeight(i: TwoAssetInputs): number {
    const num = i.sigma2 ** 2 - i.correlation * i.sigma1 * i.sigma2;
    const den = i.sigma1 ** 2 + i.sigma2 ** 2 - 2 * i.correlation * i.sigma1 * i.sigma2;
    return den === 0 ? 0.5 : num / den;
}

/** Tangency (max-Sharpe) weight in Asset 1, clamped to [0,1]. */
export function tangencyWeight(i: TwoAssetInputs): number {
    const e1 = i.expectedReturn1 - i.riskFreeRate;
    const e2 = i.expectedReturn2 - i.riskFreeRate;
    const cov = i.correlation * i.sigma1 * i.sigma2;
    const num = e1 * i.sigma2 ** 2 - e2 * cov;
    const den = e1 * i.sigma2 ** 2 + e2 * i.sigma1 ** 2 - (e1 + e2) * cov;
    if (den === 0) return 0.5;
    return Math.min(1, Math.max(0, num / den));
}

export function runPortfolio(input: TwoAssetInputs, frontierPoints = 21): PortfolioResult {
    const errors: string[] = []; const warnings: string[] = [];
    for (const [k, v] of Object.entries(input)) if (!fin(v)) errors.push(`${k} must be a finite number.`);
    if (!errors.length) {
        if (input.correlation < -1 || input.correlation > 1) errors.push('Correlation must lie between −1 and +1 — outside that range the covariance matrix is invalid and variance can go negative.');
        if (input.sigma1 < 0 || input.sigma2 < 0) errors.push('Volatilities (σ) cannot be negative.');
    }
    if (errors.length) return { errors, warnings, minimumVariance: null, tangency: null, frontier: [] };

    const mvpRaw = minimumVarianceWeight(input);
    const mvpW = Math.min(1, Math.max(0, mvpRaw));
    if (mvpRaw < 0 || mvpRaw > 1) warnings.push(`Unconstrained minimum-variance weight is ${(mvpRaw * 100).toFixed(1)}% (implies shorting) — shown clamped to the no-shorting range.`);
    if (input.sigma1 === 0 || input.sigma2 === 0) warnings.push('A zero-volatility asset makes several portfolio statistics degenerate — treat it as the risk-free asset instead.');
    if (Math.abs(input.correlation) === 1) warnings.push('Perfect (±1) correlation: with ρ = +1 there is no diversification benefit; with ρ = −1 a zero-variance hedge exists.');

    const frontier = Array.from({ length: frontierPoints }, (_, k) => portfolioStats(k / (frontierPoints - 1), input));
    return {
        errors: [], warnings,
        minimumVariance: { ...portfolioStats(mvpW, input), unconstrainedWeight1: mvpRaw },
        tangency: portfolioStats(tangencyWeight(input), input),
        frontier,
    };
}

const KEYS: Array<keyof TwoAssetInputs> = ['expectedReturn1', 'sigma1', 'expectedReturn2', 'sigma2', 'correlation', 'riskFreeRate'];
export function parsePortfolioInputs(raw: Record<string, unknown> | null | undefined, base: TwoAssetInputs = PORTFOLIO_DEFAULTS): TwoAssetInputs {
    const out = { ...base };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of KEYS) { const v = raw[k as string]; const n = typeof v === 'string' ? Number(v) : v; if (fin(n)) out[k] = n; }
    return out;
}
export function portfolioInputsToQuery(i: TwoAssetInputs): string {
    const p = new URLSearchParams();
    for (const k of KEYS) p.set(k, String(i[k]));
    return p.toString();
}
