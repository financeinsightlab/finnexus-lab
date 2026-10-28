// lib/finance/cpm.ts — Critical Path Method + PERT engine (AOA networks).
// Fixes vs legacy: forward/backward passes iterated nodes in numeric order,
// which is only correct while node numbering happens to be topological;
// cycles or renumbered nodes silently produced wrong floats. Engine does a
// Kahn topological sort, reports cycles and disconnected nodes as errors,
// and adds the PERT deliverable professionals actually quote: probability
// of finishing on/before a target date (normal approximation on the
//critical path, per classic PERT assumptions).

export interface CpmActivity {
    id: string; from: number; to: number; duration: number;
    optimistic?: number; mostLikely?: number; pessimistic?: number;
}

export interface CpmRow extends CpmActivity {
    effectiveDuration: number; earliestStart: number; earliestFinish: number;
    latestStart: number; latestFinish: number; totalFloat: number;
    isCritical: boolean; pertVariance: number;
}

export interface CpmResult {
    errors: string[]; warnings: string[];
    rows: CpmRow[]; projectDuration: number | null; criticalPath: string[];
    /** σ of the critical path under PERT (0 in pure CPM mode). */
    criticalPathSigma: number;
    /** Node ids in topological order (empty when a cycle exists). */
    topologicalOrder: number[];
}

export const CPM_DEFAULT_ACTIVITIES: CpmActivity[] = [
    { id: 'A', from: 1, to: 2, duration: 4, optimistic: 2, mostLikely: 4, pessimistic: 8 },
    { id: 'B', from: 1, to: 3, duration: 5, optimistic: 3, mostLikely: 5, pessimistic: 9 },
    { id: 'C', from: 2, to: 4, duration: 6, optimistic: 4, mostLikely: 6, pessimistic: 10 },
    { id: 'D', from: 3, to: 5, duration: 3, optimistic: 2, mostLikely: 3, pessimistic: 6 },
    { id: 'E', from: 3, to: 4, duration: 0 },
    { id: 'F', from: 4, to: 6, duration: 7, optimistic: 5, mostLikely: 7, pessimistic: 12 },
    { id: 'G', from: 5, to: 6, duration: 4, optimistic: 2, mostLikely: 4, pessimistic: 7 },
];

export const pertExpected = (o: number, m: number, p: number) => (o + 4 * m + p) / 6;
export const pertVariance = (o: number, p: number) => ((p - o) / 6) ** 2;

/** Standard normal CDF (Abramowitz–Stegun 7.1 via erf approximation). */
export function normalCdf(z: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const poly = t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    const upper = Math.exp(-(z * z) / 2) / Math.sqrt(2 * Math.PI) * poly;
    return z >= 0 ? 1 - upper : upper;
}

/** P(finish ≤ target) under PERT's normal approximation on the critical path. */
export function probabilityOnOrBefore(target: number, expectedDuration: number, sigma: number): number | null {
    if (!Number.isFinite(target) || !Number.isFinite(expectedDuration) || !Number.isFinite(sigma)) return null;
    if (sigma <= 0) return target >= expectedDuration ? 1 : 0;
    return normalCdf((target - expectedDuration) / sigma);
}

function topoSort(nodes: number[], acts: CpmActivity[]): { order: number[]; cyclic: boolean } {
    const indeg = new Map(nodes.map((n) => [n, 0]));
    for (const a of acts) indeg.set(a.to, (indeg.get(a.to) ?? 0) + 1);
    const queue = nodes.filter((n) => (indeg.get(n) ?? 0) === 0);
    const order: number[] = [];
    while (queue.length) {
        const n = queue.shift() as number;
        order.push(n);
        for (const a of acts.filter((x) => x.from === n)) {
            indeg.set(a.to, (indeg.get(a.to) ?? 0) - 1);
            if ((indeg.get(a.to) ?? 0) === 0) queue.push(a.to);
        }
    }
    return { order, cyclic: order.length !== nodes.length };
}

const fin = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function runCpm(activities: CpmActivity[], usePert: boolean): CpmResult {
    const errors: string[] = []; const warnings: string[] = [];
    if (!activities.length) return { errors: ['At least one activity is required.'], warnings, rows: [], projectDuration: null, criticalPath: [], criticalPathSigma: 0, topologicalOrder: [] };
    const ids = new Set<string>();
    for (const a of activities) {
        if (ids.has(a.id)) errors.push(`Duplicate activity id "${a.id}".`);
        ids.add(a.id);
        if (!fin(a.duration) || a.duration < 0) errors.push(`Activity ${a.id}: duration must be a finite number ≥ 0.`);
        if (a.from === a.to) errors.push(`Activity ${a.id}: self-loop (from = to) is not a valid network arc.`);
        if (usePert && (a.optimistic === undefined || a.mostLikely === undefined || a.pessimistic === undefined) && a.duration > 0) {
            warnings.push(`Activity ${a.id} has no PERT three-point estimate — deterministic duration used, contributing zero variance.`);
        }
        if (a.optimistic !== undefined && a.pessimistic !== undefined && a.optimistic > a.pessimistic) {
            errors.push(`Activity ${a.id}: optimistic exceeds pessimistic — three-point estimates are swapped or mistyped.`);
        }
    }
    if (errors.length) return { errors, warnings, rows: [], projectDuration: null, criticalPath: [], criticalPathSigma: 0, topologicalOrder: [] };

    const effective = activities.map((a) => ({
        ...a,
        effectiveDuration: usePert && a.optimistic !== undefined && a.mostLikely !== undefined && a.pessimistic !== undefined
            ? pertExpected(a.optimistic, a.mostLikely, a.pessimistic) : a.duration,
    }));

    const nodes = Array.from(new Set(effective.flatMap((a) => [a.from, a.to]))).sort((x, y) => x - y);
    const { order, cyclic } = topoSort(nodes, effective);
    if (cyclic) {
        return { errors: ['The activity network contains a cycle — no valid schedule exists. Break the loop before computing floats.'], warnings, rows: [], projectDuration: null, criticalPath: [], criticalPathSigma: 0, topologicalOrder: [] };
    }

    const es = new Map<number, number>(nodes.map((n) => [n, 0]));
    for (const n of order) {
        for (const a of effective.filter((x) => x.from === n)) {
            es.set(a.to, Math.max(es.get(a.to) ?? 0, (es.get(n) ?? 0) + a.effectiveDuration));
        }
    }
    const projectDuration = Math.max(...nodes.map((n) => es.get(n) ?? 0));
    const lf = new Map<number, number>(nodes.map((n) => [n, projectDuration]));
    for (const n of [...order].reverse()) {
        for (const a of effective.filter((x) => x.to === n)) {
            lf.set(a.from, Math.min(lf.get(a.from) ?? projectDuration, (lf.get(n) ?? projectDuration) - a.effectiveDuration));
        }
    }

    const rows: CpmRow[] = effective.map((a) => {
        const earliestStart = es.get(a.from) ?? 0;
        const latestFinish = lf.get(a.to) ?? projectDuration;
        const totalFloat = latestFinish - a.effectiveDuration - earliestStart;
        return {
            ...a, effectiveDuration: a.effectiveDuration, earliestStart,
            earliestFinish: earliestStart + a.effectiveDuration,
            latestStart: latestFinish - a.effectiveDuration, latestFinish, totalFloat,
            isCritical: Math.abs(totalFloat) < 1e-9,
            pertVariance: usePert && a.optimistic !== undefined && a.pessimistic !== undefined ? pertVariance(a.optimistic, a.pessimistic) : 0,
        };
    });

    const criticalPath = rows.filter((r) => r.isCritical && r.effectiveDuration > 0).map((r) => r.id);
    const criticalPathSigma = usePert
        ? Math.sqrt(rows.filter((r) => criticalPath.includes(r.id)).reduce((s, r) => s + r.pertVariance, 0)) : 0;

    // Disconnected-node check: every node should reach the sink component.
    const sinkNodes = nodes.filter((n) => !effective.some((a) => a.from === n));
    if (sinkNodes.length > 1) warnings.push(`Network has ${sinkNodes.length} terminal nodes (${sinkNodes.join(', ')}) — activities not feeding the final node don't affect the finish date; add dummies to a single sink for textbook CPM.`);

    return { errors: [], warnings, rows, projectDuration, criticalPath, criticalPathSigma, topologicalOrder: order };
}
