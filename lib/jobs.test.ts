import { describe, expect, it } from 'vitest';
import {
    MAX_ATTEMPTS,
    MAX_BACKOFF_MS,
    backoffMs,
    isClaimable,
    nextRunAt,
    runJob,
    shouldRetry,
} from '@/lib/jobs';

describe('backoffMs', () => {
    it('grows exponentially from the base delay', () => {
        expect(backoffMs(1)).toBe(30_000);
        expect(backoffMs(2)).toBe(60_000);
        expect(backoffMs(3)).toBe(120_000);
    });

    it('caps at one hour', () => {
        expect(backoffMs(20)).toBe(MAX_BACKOFF_MS);
    });
});

describe('nextRunAt / shouldRetry', () => {
    it('schedules the next attempt after the backoff window', () => {
        const from = new Date('2026-09-28T00:00:00Z');
        expect(nextRunAt(1, from).toISOString()).toBe('2026-09-28T00:00:30.000Z');
    });

    it('stops retrying at the attempt ceiling', () => {
        expect(shouldRetry(MAX_ATTEMPTS - 1)).toBe(true);
        expect(shouldRetry(MAX_ATTEMPTS)).toBe(false);
    });
});

describe('isClaimable', () => {
    const now = new Date('2026-09-28T12:00:00Z');
    it('only claims due PENDING jobs', () => {
        expect(isClaimable({ status: 'PENDING', runAt: '2026-09-28T11:59:00Z' }, now)).toBe(true);
        expect(isClaimable({ status: 'PENDING', runAt: '2026-09-28T12:05:00Z' }, now)).toBe(false);
        expect(isClaimable({ status: 'RUNNING', runAt: '2026-09-28T11:00:00Z' }, now)).toBe(false);
    });
});

describe('runJob', () => {
    const job = {
        id: 'j1',
        type: 'ping',
        status: 'RUNNING',
        attempts: 1,
        runAt: new Date(),
        createdAt: new Date(),
    };

    it('runs the registered handler', async () => {
        let called = false;
        const res = await runJob(job, { ping: () => { called = true; } });
        expect(res.ok).toBe(true);
        expect(called).toBe(true);
    });

    it('captures handler errors', async () => {
        const res = await runJob(job, { ping: () => { throw new Error('boom'); } });
        expect(res.ok).toBe(false);
        expect(res.error).toBe('boom');
    });

    it('treats a missing handler as a no-op success', async () => {
        const res = await runJob({ ...job, type: 'unknown' }, {});
        expect(res.ok).toBe(true);
    });
});
