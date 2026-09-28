// lib/api-key-store.ts — API key issuance & metered verification (Pillar A4/A5)
//
// Key material handling lives in `lib/api-keys.ts`; this module is the database
// + metering layer used by the public API routes.

import { prisma } from '@/lib/prisma';
import {
    checkUsage,
    generateApiKey,
    keyPrefix,
    rateLimitForPlan,
    verifyApiKey,
    type ApiKeyEnvironment,
    type UsageCheck,
} from '@/lib/api-keys';

export interface IssueKeyInput {
    name: string;
    scopes?: string[];
    userId?: string;
    orgId?: string;
    environment?: ApiKeyEnvironment;
    rateLimitPerMin?: number;
}

/** Create a key; the raw secret is returned exactly once and never stored. */
export async function issueApiKey(input: IssueKeyInput) {
    const generated = generateApiKey(input.environment ?? 'live');
    const record = await prisma.apiKey.create({
        data: {
            name: input.name,
            prefix: generated.prefix,
            hash: generated.hash,
            scopes: input.scopes ?? [],
            userId: input.userId ?? null,
            orgId: input.orgId ?? null,
            rateLimitPerMin: input.rateLimitPerMin ?? null,
        },
    });
    return { apiKey: record, secret: generated.secret };
}

export interface VerifiedKey {
    id: string;
    name: string;
    scopes: string[];
    userId: string | null;
    orgId: string | null;
    rateLimitPerMin: number | null;
}

/** Resolve a presented secret to a live (non-revoked) key record, or null. */
export async function verifyPresentedKey(presented: string): Promise<VerifiedKey | null> {
    const prefix = keyPrefix(presented);
    if (!prefix) return null;
    const record = await prisma.apiKey.findUnique({ where: { prefix } });
    if (!record || record.revokedAt) return null;
    if (!verifyApiKey(presented, record.hash)) return null;
    return {
        id: record.id,
        name: record.name,
        scopes: record.scopes,
        userId: record.userId,
        orgId: record.orgId,
        rateLimitPerMin: record.rateLimitPerMin,
    };
}

async function activePlanFor(key: VerifiedKey): Promise<string> {
    if (key.orgId) {
        const org = await prisma.organization.findUnique({ where: { id: key.orgId } });
        if (org?.plan) return org.plan;
    }
    if (key.userId) {
        const user = await prisma.user.findUnique({
            where: { id: key.userId },
            select: { subscriptionPlan: true, role: true },
        });
        if (user?.role === 'ADMIN') return 'ENTERPRISE';
        if (user?.subscriptionPlan) return user.subscriptionPlan;
    }
    return 'FREE';
}

// Best-effort fixed-window counters. Serverless instances are ephemeral, so this
// is a soft limiter; the DB-backed quota can layer on top later.
const windows = new Map<string, { count: number; start: number }>();

export async function touchAndCheck(key: VerifiedKey): Promise<UsageCheck> {
    const plan = await activePlanFor(key);
    const rule = key.rateLimitPerMin
        ? { limit: key.rateLimitPerMin, windowSeconds: 60 }
        : rateLimitForPlan(plan);

    const nowSec = Math.floor(Date.now() / 1000);
    const existing = windows.get(key.id);
    const entry = !existing || nowSec - existing.start >= rule.windowSeconds
        ? { count: 0, start: nowSec }
        : existing;
    entry.count += 1;
    windows.set(key.id, entry);

    void prisma.apiKey.update({ where: { id: key.id }, data: { lastUsedAt: new Date() } }).catch(() => { });

    return checkUsage(entry.count - 1, rule, entry.start);
}

export async function revokeApiKey(id: string) {
    return prisma.apiKey.update({ where: { id }, data: { revokedAt: new Date() } });
}

export async function listApiKeysForUser(userId: string) {
    return prisma.apiKey.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
}
