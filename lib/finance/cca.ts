// lib/finance/cca.ts — Comparable Company Analysis (trading multiples).
// Fixes vs legacy: the median took the UPPER middle element on even peer
// counts (biasing value upward whenever a peer was excluded for
// non-positive EBITDA); blending silently fell back when a multiple was
// unavailable. Engine: N peers, proper median/mean/min/max per multiple,
// explicit validity, DLOM applied to equity value only (legacy got this
// right — preserved), football-field range from EBITDA-multiple extremes.
// Inputs in consistent currency units (e.g. $M) — engine is unit-agnostic.

export interface CcaPeer { name: string; marketCap: number; netDebt: number; revenue: number; ebitda: number }
export interface CcaInputs {
    peers: CcaPeer[];
    targetRevenue: number; targetEbitda: number; targetNetDebt: number;
    targetShares: number; dlom: number;
}

export interface MultipleStats { values: number[]; count: number; mean: number | null; median: number | null; min: number | null; max: number | null }

export interface CcaResult {
    errors: string[]; warnings: string[];
    peerStats: Array<{ name: string; enterpriseValue: number; evRevenue: number | null; evEbitda: number | null }>;
    evRevenueStats: MultipleStats; evEbitdaStats: MultipleStats;
    evFromRevenue: number | null; evFromEbitda: number | null; blendedEv: number | null;
    evRangeEbitda: { low: number; high: number } | null;
    preDiscountEquity: number | null; discountAmount: number | null;
    impliedEquityValue: number | null; impliedSharePrice: number | null;
}

export const CCA_DEFAULTS: CcaInputs = {
    peers: [
        { name: 'Competitor A', marketCap: 800, netDebt: 50, revenue: 100, ebitda: 20 },
        { name: 'Competitor B', marketCap: 400, netDebt: 100, revenue: 80, ebitda: 15 },
        { name: 'Competitor C', marketCap: 200, netDebt: 20, revenue: 60, ebitda: 10 },
    ],
    targetRevenue: 50, targetEbitda: 12, targetNetDebt: 15, targetShares: 10, dlom: 0.25,
};

/** Proper median: average of the two middle values on even counts. */
export function median(values: number[]): number | null {
    if (!values.length) return null;
    const s = [...values].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 === 1 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function stats(values: number[]): MultipleStats {
    return {
        values, count: values.length,
        mean: values.length ? values.reduce((a, b) => a + b, 0) / values.length : null,
        median: median(values),
        min: values.length ? Math.min(...values) : null,
        max: values.length ? Math.max(...values) : null,
    };
}

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function runCca(input: CcaInputs): CcaResult {
    const errors: string[] = []; const warnings: string[] = [];
    if (!Array.isArray(input.peers) || input.peers.length === 0) errors.push('At least one peer company is required.');
    for (const [k, v] of Object.entries(input)) if (k !== 'peers' && !fin(v)) errors.push(`${k} must be a finite number.`);
    input.peers?.forEach((p, idx) => {
        for (const k of ['marketCap', 'netDebt', 'revenue', 'ebitda'] as const) {
            if (!fin(p[k])) errors.push(`Peer ${idx + 1} ${k} must be a finite number.`);
        }
        if (fin(p.marketCap) && p.marketCap < 0) errors.push(`Peer ${idx + 1} market cap cannot be negative.`);
    });
    if (fin(input.targetShares) && input.targetShares <= 0) errors.push('Target shares must be greater than zero.');
    if (fin(input.dlom) && (input.dlom < 0 || input.dlom >= 1)) errors.push('DLOM must be between 0% and 100%.');
    if (fin(input.targetRevenue) && input.targetRevenue < 0) errors.push('Target revenue cannot be negative.');

    const peerStats = (input.peers ?? []).map((p) => {
        const ev = p.marketCap + p.netDebt;
        return {
            name: p.name, enterpriseValue: ev,
            evRevenue: p.revenue > 0 ? ev / p.revenue : null,
            evEbitda: p.ebitda > 0 ? ev / p.ebitda : null,
        };
    });
    const evRevenueStats = stats(peerStats.map((s) => s.evRevenue).filter((v): v is number => v !== null && v > 0));
    const evEbitdaStats = stats(peerStats.map((s) => s.evEbitda).filter((v): v is number => v !== null && v > 0));

    const empty: CcaResult = {
        errors, warnings, peerStats, evRevenueStats, evEbitdaStats,
        evFromRevenue: null, evFromEbitda: null, blendedEv: null, evRangeEbitda: null,
        preDiscountEquity: null, discountAmount: null, impliedEquityValue: null, impliedSharePrice: null,
    };
    if (errors.length) return empty;
    if (evRevenueStats.median === null && evEbitdaStats.median === null) {
        return { ...empty, errors: ['No usable peer multiples — every peer needs positive revenue or EBITDA and a positive enterprise value.'] };
    }

    const excludedRev = peerStats.length - evRevenueStats.count;
    const excludedEbitda = peerStats.length - evEbitdaStats.count;
    if (excludedEbitda > 0) warnings.push(`${excludedEbitda} peer(s) excluded from EV/EBITDA (non-positive EBITDA or EV) — median uses ${evEbitdaStats.count}.`);
    if (excludedRev > 0) warnings.push(`${excludedRev} peer(s) excluded from EV/Revenue.`);
    if (evEbitdaStats.min !== null && evEbitdaStats.max !== null && evEbitdaStats.max - evEbitdaStats.min > 15) {
        warnings.push(`Peer EV/EBITDA spread is ${(evEbitdaStats.max - evEbitdaStats.min).toFixed(1)}× — peers may not be truly comparable; tighten the peer group.`);
    }
    if (input.targetEbitda <= 0 && evEbitdaStats.median !== null) warnings.push('Target EBITDA is non-positive — the EBITDA multiple cannot value it; revenue multiple used where shown.');

    const evFromRevenue = evRevenueStats.median !== null ? input.targetRevenue * evRevenueStats.median : null;
    const evFromEbitda = evEbitdaStats.median !== null && input.targetEbitda > 0 ? input.targetEbitda * evEbitdaStats.median : null;
    const blendedEv = evFromRevenue !== null && evFromEbitda !== null
        ? (evFromRevenue + evFromEbitda) / 2 : (evFromEbitda ?? evFromRevenue);
    if (blendedEv === null) return { ...empty, warnings, errors: ['Target cannot be valued from the available multiples (needs positive target revenue or EBITDA).'] };

    const evRangeEbitda = evEbitdaStats.min !== null && evEbitdaStats.max !== null && input.targetEbitda > 0
        ? { low: input.targetEbitda * evEbitdaStats.min, high: input.targetEbitda * evEbitdaStats.max } : null;

    const preDiscountEquity = blendedEv - input.targetNetDebt;
    const discountAmount = preDiscountEquity > 0 ? preDiscountEquity * input.dlom : 0;
    const impliedEquityValue = Math.max(0, preDiscountEquity - discountAmount);
    if (preDiscountEquity <= 0) warnings.push('Implied enterprise value does not cover net debt — residual equity value is zero before any option value.');

    return {
        errors: [], warnings, peerStats, evRevenueStats, evEbitdaStats,
        evFromRevenue, evFromEbitda, blendedEv, evRangeEbitda,
        preDiscountEquity, discountAmount, impliedEquityValue,
        impliedSharePrice: impliedEquityValue / input.targetShares,
    };
}

function isFinNum(v: unknown): v is number {
    return typeof v === 'number' && Number.isFinite(v);
}

/** Tolerant parser for autosave JSON and share-link params (peers as JSON). */
export function parseCcaInputs(raw: Record<string, unknown> | null | undefined, base: CcaInputs = CCA_DEFAULTS): CcaInputs {
    const out: CcaInputs = { ...base, peers: base.peers.map((p) => ({ ...p })) };
    if (!raw || typeof raw !== 'object') return out;
    for (const k of ['targetRevenue', 'targetEbitda', 'targetNetDebt', 'targetShares', 'dlom'] as const) {
        const v = raw[k]; const n = typeof v === 'string' ? Number(v) : v;
        if (isFinNum(n)) out[k] = n;
    }
    let peersRaw: unknown = raw.peers;
    if (typeof peersRaw === 'string') { try { peersRaw = JSON.parse(peersRaw); } catch { peersRaw = undefined; } }
    if (Array.isArray(peersRaw) && peersRaw.length) {
        out.peers = peersRaw.slice(0, 12).map((p, idx) => {
            const src = (p && typeof p === 'object' ? p : {}) as Record<string, unknown>;
            const num = (v: unknown) => { const n = typeof v === 'string' ? Number(v) : v; return isFinNum(n) ? n : 0; };
            return {
                name: typeof src.name === 'string' && src.name.trim() ? src.name : `Peer ${idx + 1}`,
                marketCap: num(src.marketCap), netDebt: num(src.netDebt), revenue: num(src.revenue), ebitda: num(src.ebitda),
            };
        });
    }
    return out;
}

export function ccaInputsToQuery(i: CcaInputs): string {
    const p = new URLSearchParams();
    for (const k of ['targetRevenue', 'targetEbitda', 'targetNetDebt', 'targetShares', 'dlom'] as const) p.set(k, String(i[k]));
    p.set('peers', JSON.stringify(i.peers));
    return p.toString();
}
