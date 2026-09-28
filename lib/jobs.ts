// lib/jobs.ts — background job scheduling primitives (Pillar G3)
//
// Pure, dependency-light helpers so the retry/backoff policy can be unit tested.
// The database side lives in `lib/jobs-store.ts`; the Vercel Cron worker in
// `app/api/cron/jobs/route.ts` drains the queue.

export type JobStatus = 'PENDING' | 'RUNNING' | 'DONE' | 'FAILED';

export interface JobRecord {
    id: string;
    type: string;
    payload?: unknown;
    status: JobStatus | string;
    attempts: number;
    runAt: Date | string;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    error?: string | null;
    createdAt: Date | string;
}

export const MAX_ATTEMPTS = 5;
/** Base delay for exponential backoff, in milliseconds. */
export const BASE_BACKOFF_MS = 30_000;
/** Upper bound on backoff so retries never stall for days. */
export const MAX_BACKOFF_MS = 60 * 60 * 1000;

/**
 * Exponential backoff with jitter-free determinism (attempt 1 → 30s, 2 → 60s,
 * 3 → 120s … capped at one hour).
 */
export function backoffMs(attempt: number): number {
    const exp = Math.max(0, attempt - 1);
    return Math.min(BASE_BACKOFF_MS * 2 ** exp, MAX_BACKOFF_MS);
}

/** When a failed job should next run, given it has already run `attempts` times. */
export function nextRunAt(attempts: number, from: Date = new Date()): Date {
    return new Date(from.getTime() + backoffMs(attempts));
}

export function shouldRetry(attempts: number): boolean {
    return attempts < MAX_ATTEMPTS;
}

/** A job is claimable when it is due and not already running or finished. */
export function isClaimable(job: Pick<JobRecord, 'status' | 'runAt'>, now: Date = new Date()): boolean {
    if (job.status !== 'PENDING') return false;
    const due = typeof job.runAt === 'string' ? new Date(job.runAt) : job.runAt;
    return due.getTime() <= now.getTime();
}

export interface JobHandler<T = unknown> {
    (payload: T): Promise<void> | void;
}

/** Dispatch one job to its registered handler; unknown types are a no-op. */
export async function runJob(
    job: JobRecord,
    handlers: Record<string, JobHandler>,
): Promise<{ ok: boolean; error?: string }> {
    const handler = handlers[job.type];
    if (!handler) return { ok: true, error: `no handler for ${job.type}` };
    try {
        await handler(job.payload);
        return { ok: true };
    } catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : String(error) };
    }
}
