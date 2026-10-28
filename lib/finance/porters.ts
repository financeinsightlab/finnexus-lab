// lib/finance/porters.ts — Porter's Five Forces scoring engine.
// Qualitative framework, quantitative bookkeeping: validated 1–5 ratings,
// optional per-force weights (legacy averaged unweighted), attractiveness
// bands, dominant-force identification, and a spread warning for the
// classic failure mode — averaging away one brutal force (a 5 and four
// 1s average to a benign-looking 1.8 while the 5 kills the industry).

export const FORCE_IDS = ['newEntrants', 'supplierPower', 'buyerPower', 'substitutes', 'rivalry'] as const;
export type ForceId = (typeof FORCE_IDS)[number];
export type ForceRatings = Record<ForceId, number>;

export interface PortersResult {
    errors: string[]; warnings: string[];
    simpleAverage: number | null; weightedAverage: number | null;
    /** Score used for banding (weighted when weights supplied). */
    compositeScore: number | null;
    attractiveness: 'Very Unattractive' | 'Unattractive' | 'Moderately Attractive' | 'Highly Attractive' | null;
    attractivenessScore: 1 | 2 | 3 | 4 | null;
    dominantForce: ForceId | null; weakestForce: ForceId | null; spread: number | null;
}

export function attractivenessBand(score: number): { label: PortersResult['attractiveness']; score: 1 | 2 | 3 | 4 } {
    if (score >= 4.2) return { label: 'Very Unattractive', score: 1 };
    if (score >= 3.5) return { label: 'Unattractive', score: 2 };
    if (score >= 2.5) return { label: 'Moderately Attractive', score: 3 };
    return { label: 'Highly Attractive', score: 4 };
}

export function runPorters(ratings: ForceRatings, weights?: Partial<ForceRatings>): PortersResult {
    const errors: string[] = []; const warnings: string[] = [];
    for (const id of FORCE_IDS) {
        const v = ratings[id];
        if (typeof v !== 'number' || !Number.isFinite(v) || v < 1 || v > 5) {
            errors.push(`Rating for ${id} must be a number between 1 and 5.`);
        }
    }
    if (weights) {
        for (const id of FORCE_IDS) {
            const w = weights[id];
            if (w !== undefined && (!Number.isFinite(w) || w < 0)) errors.push(`Weight for ${id} must be a non-negative number.`);
        }
        const total = FORCE_IDS.reduce((s, id) => s + (weights[id] ?? 1), 0);
        if (total <= 0) errors.push('Force weights must sum to more than zero.');
    }
    const empty: PortersResult = {
        errors, warnings, simpleAverage: null, weightedAverage: null, compositeScore: null,
        attractiveness: null, attractivenessScore: null, dominantForce: null, weakestForce: null, spread: null,
    };
    if (errors.length) return empty;

    const values = FORCE_IDS.map((id) => ratings[id]);
    const simpleAverage = values.reduce((a, b) => a + b, 0) / 5;
    let weightedAverage: number | null = null;
    if (weights) {
        const total = FORCE_IDS.reduce((s, id) => s + (weights[id] ?? 1), 0);
        weightedAverage = FORCE_IDS.reduce((s, id) => s + ratings[id] * (weights[id] ?? 1), 0) / total;
    }
    const composite = weightedAverage ?? simpleAverage;
    const band = attractivenessBand(composite);
    const dominantForce = FORCE_IDS.reduce((a, b) => (ratings[a] >= ratings[b] ? a : b));
    const weakestForce = FORCE_IDS.reduce((a, b) => (ratings[a] <= ratings[b] ? a : b));
    const spread = Math.max(...values) - Math.min(...values);

    if (ratings[dominantForce] >= 4 && composite < 3) {
        warnings.push(`Averaging masks the threat: ${dominantForce} scores ${ratings[dominantForce]}/5 while the composite looks benign at ${composite.toFixed(1)}. In Porter's logic the STRONGEST force caps industry profitability — strategy must address it directly, whatever the average says.`);
    }
    if (values.every((v) => v === values[0])) warnings.push('All five forces rated identically — real industries almost never look like this; differentiate with evidence per force.');

    return {
        errors: [], warnings, simpleAverage, weightedAverage, compositeScore: composite,
        attractiveness: band.label, attractivenessScore: band.score, dominantForce, weakestForce, spread,
    };
}
