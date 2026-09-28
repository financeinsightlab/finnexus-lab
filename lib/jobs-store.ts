// lib/jobs-store.ts — database-backed job queue (Pillar G3)
//
// A tiny, dependency-light queue on the `Job` table. Vercel Cron hits
// `/api/cron/jobs` on a schedule; this module claims due jobs, runs them and
// applies the retry/backoff policy from `lib/jobs.ts`.

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import {
    nextRunAt,
    runJob,
    shouldRetry,
    type JobHandler,
    type JobRecord,
} from '@/lib/jobs';

/** Registered job types → handlers. Extend as new background work appears. */
export const JOB_HANDLERS: Record<string, JobHandler> = {
    'revalidate.path': (payload) => {
        const path = (payload as { path?: string } | null)?.path;
        if (path) revalidatePath(path);
    },
    'publish.notify': (payload) => {
        logger.info('Publish event', payload as Record<string, unknown>);
    },
};

export async function enqueue(type: string, payload?: unknown, runAt?: Date) {
    return prisma.job.create({
        data: { type, payload: (payload ?? undefined) as never, runAt: runAt ?? new Date() },
    });
}

/** Atomically claim up to `limit` due PENDING jobs, marking them RUNNING. */
export async function claimDueJobs(limit = 20): Promise<JobRecord[]> {
    const due = await prisma.job.findMany({
        where: { status: 'PENDING', runAt: { lte: new Date() } },
        orderBy: { runAt: 'asc' },
        take: limit,
    });

    const claimed: JobRecord[] = [];
    for (const job of due) {
        const res = await prisma.job.updateMany({
            where: { id: job.id, status: 'PENDING' },
            data: { status: 'RUNNING', startedAt: new Date(), attempts: { increment: 1 } },
        });
        if (res.count === 1) claimed.push({ ...job, status: 'RUNNING', attempts: job.attempts + 1 });
    }
    return claimed;
}

export interface DrainResult {
    claimed: number;
    succeeded: number;
    retried: number;
    failed: number;
}

/** Claim and process due jobs once. Safe to call repeatedly (idempotent claims). */
export async function processDueJobs(limit = 20): Promise<DrainResult> {
    const jobs = await claimDueJobs(limit);
    const result: DrainResult = { claimed: jobs.length, succeeded: 0, retried: 0, failed: 0 };

    for (const job of jobs) {
        const outcome = await runJob(job, JOB_HANDLERS);
        if (outcome.ok || !shouldRetry(job.attempts)) {
            if (outcome.ok) {
                result.succeeded += 1;
            } else {
                result.failed += 1;
            }
            await prisma.job.update({
                where: { id: job.id },
                data: {
                    status: outcome.ok ? 'DONE' : 'FAILED',
                    finishedAt: new Date(),
                    error: outcome.error ?? null,
                },
            });
        } else {
            result.retried += 1;
            await prisma.job.update({
                where: { id: job.id },
                data: { status: 'PENDING', runAt: nextRunAt(job.attempts), error: outcome.error ?? null },
            });
        }
    }

    return result;
}
