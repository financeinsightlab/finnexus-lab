// lib/freshness-sla.ts — per-content-type staleness SLAs (Pillar C4)
//
// The existing freshness check measures `<FreshStat>` decay inside a report.
// This module adds the *operational* layer: each content type has a service
// level for how stale it may get before someone should refresh it, and the
// evaluator turns a list of items into a prioritised, severity-tagged worklist.
//
// Pure and dependency-free so it can run inside the cron route, an admin page,
// or a test.

export type ContentType =
    | 'research'
    | 'insight'
    | 'data-lab'
    | 'case-study'
    | 'tracker'
    | 'study'
    | 'prediction';

export interface SlaDefinition {
    /** Days after which the item is considered aging. */
    warnAfterDays: number;
    /** Days after which the item is a breach and should be refreshed. */
    breachAfterDays: number;
    /** Human label, e.g. for a dashboard column. */
    label: string;
}

/**
 * SLAs encode editorial intent: fast-moving market commentary rots quickly,
 * evergreen study material does not. Tune here, not in the cron.
 */
export const SLA_BY_TYPE: Record<ContentType, SlaDefinition> = {
    research: { warnAfterDays: 90, breachAfterDays: 180, label: 'Research report' },
    insight: { warnAfterDays: 30, breachAfterDays: 60, label: 'Market insight' },
    'data-lab': { warnAfterDays: 120, breachAfterDays: 240, label: 'Data Lab project' },
    'case-study': { warnAfterDays: 365, breachAfterDays: 730, label: 'Case study' },
    tracker: { warnAfterDays: 7, breachAfterDays: 14, label: 'Sector tracker' },
    study: { warnAfterDays: 365, breachAfterDays: 730, label: 'Study material' },
    prediction: { warnAfterDays: 0, breachAfterDays: 0, label: 'Prediction (resolve by date)' },
};

export type SlaStatus = 'ok' | 'warning' | 'breach';

export interface SlaInput {
    type: ContentType;
    title: string;
    slug: string;
    /** When the item was last updated/published. */
    updatedAt: Date | string;
    /** Optional explicit due date (used by predictions). */
    dueAt?: Date | string | null;
}

export interface SlaResult {
    type: ContentType;
    title: string;
    slug: string;
    status: SlaStatus;
    ageDays: number;
    /** Days until breach (negative when already breached). */
    daysRemaining: number;
    sla: SlaDefinition;
}

const DAY_MS = 86_400_000;

export function evaluateSla(item: SlaInput, now: Date = new Date()): SlaResult {
    const sla = SLA_BY_TYPE[item.type];
    const reference = item.dueAt ?? item.updatedAt;
    const referenceTime = reference instanceof Date
        ? reference.getTime()
        : new Date(reference).getTime();

    const ageDays = Number.isFinite(referenceTime)
        ? Math.max(0, Math.floor((now.getTime() - referenceTime) / DAY_MS))
        : 0;

    // Predictions are driven by their resolve-by date instead of decay windows.
    if (item.type === 'prediction' && item.dueAt) {
        const dueTime = item.dueAt instanceof Date ? item.dueAt.getTime() : new Date(item.dueAt).getTime();
        const overdueDays = Math.floor((now.getTime() - dueTime) / DAY_MS);
        return {
            type: item.type,
            title: item.title,
            slug: item.slug,
            status: overdueDays > 0 ? 'breach' : overdueDays > -7 ? 'warning' : 'ok',
            ageDays: Math.max(0, overdueDays),
            daysRemaining: -overdueDays,
            sla,
        };
    }

    let status: SlaStatus = 'ok';
    if (ageDays >= sla.breachAfterDays) status = 'breach';
    else if (ageDays >= sla.warnAfterDays) status = 'warning';

    return {
        type: item.type,
        title: item.title,
        slug: item.slug,
        status,
        ageDays,
        daysRemaining: sla.breachAfterDays - ageDays,
        sla,
    };
}

const SEVERITY: Record<SlaStatus, number> = { breach: 2, warning: 1, ok: 0 };

/** Evaluate many items and return only those needing attention, worst first. */
export function slaWorklist(items: readonly SlaInput[], now: Date = new Date()): SlaResult[] {
    return items
        .map((item) => evaluateSla(item, now))
        .filter((result) => result.status !== 'ok')
        .sort(
            (a, b) =>
                SEVERITY[b.status] - SEVERITY[a.status] ||
                b.ageDays - a.ageDays,
        );
}

/** Counts by status — handy for a cron summary or an admin badge. */
export function slaSummary(results: readonly SlaResult[]): Record<SlaStatus, number> {
    const summary: Record<SlaStatus, number> = { ok: 0, warning: 0, breach: 0 };
    for (const result of results) summary[result.status] += 1;
    return summary;
}
