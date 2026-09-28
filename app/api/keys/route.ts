// app/api/keys/route.ts — issue & list API keys (Pillar A4/A5)
//
// GET  → the caller's personal keys plus keys for orgs they belong to
// POST { name, scopes?, orgId?, rateLimitPerMin? } → returns the secret ONCE

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { STAFF_ROLES, authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { issueApiKey, listApiKeysForUser } from '@/lib/api-key-store';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const issueSchema = z.object({
    name: z.string().trim().min(2).max(120),
    scopes: z.array(z.string().trim().min(1).max(60)).max(20).optional(),
    orgId: z.string().min(1).optional(),
    rateLimitPerMin: z.number().int().min(1).max(100_000).optional(),
});

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const memberships = await prisma.membership.findMany({
            where: { userId: auth.user.id },
            select: { orgId: true, role: true },
        });
        const orgIds = memberships.map((m) => m.orgId);

        const [personal, org] = await Promise.all([
            listApiKeysForUser(auth.user.id),
            orgIds.length > 0
                ? prisma.apiKey.findMany({ where: { orgId: { in: orgIds } }, orderBy: { createdAt: 'desc' } })
                : Promise.resolve([]),
        ]);

        const redact = (key: (typeof personal)[number]) => ({
            id: key.id,
            name: key.name,
            prefix: key.prefix,
            scopes: key.scopes,
            orgId: key.orgId,
            rateLimitPerMin: key.rateLimitPerMin,
            lastUsedAt: key.lastUsedAt,
            revokedAt: key.revokedAt,
            createdAt: key.createdAt,
        });

        return NextResponse.json({
            personal: personal.map(redact),
            organization: org.map(redact),
        });
    } catch (error) {
        logger.error('Error listing API keys', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const parsed = await parseJsonBody(request, issueSchema);
    if (!parsed.ok) return parsed.response;
    const { name, scopes, orgId, rateLimitPerMin } = parsed.data;

    try {
        if (orgId) {
            const membership = await prisma.membership.findUnique({
                where: { userId_orgId: { userId: auth.user.id, orgId } },
            });
            if (!membership) {
                return NextResponse.json({ error: 'You are not a member of that organization' }, { status: 403 });
            }
        }

        const { apiKey, secret } = await issueApiKey({
            name,
            scopes,
            orgId,
            userId: orgId ? undefined : auth.user.id,
            rateLimitPerMin,
        });

        return NextResponse.json(
            {
                key: {
                    id: apiKey.id,
                    name: apiKey.name,
                    prefix: apiKey.prefix,
                    scopes: apiKey.scopes,
                    orgId: apiKey.orgId,
                    createdAt: apiKey.createdAt,
                },
                // Shown exactly once — store it now, we only keep a hash.
                secret,
            },
            { status: 201 },
        );
    } catch (error) {
        logger.error('Error issuing API key', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing key id' }, { status: 400 });

    try {
        const key = await prisma.apiKey.findUnique({ where: { id } });
        if (!key) return NextResponse.json({ error: 'Key not found' }, { status: 404 });

        // Allow if it's the caller's own key, an org key they can administer, or staff.
        let allowed = key.userId === auth.user.id || STAFF_ROLES.includes(auth.user.role);
        if (!allowed && key.orgId) {
            const membership = await prisma.membership.findUnique({
                where: { userId_orgId: { userId: auth.user.id, orgId: key.orgId } },
            });
            allowed = Boolean(membership);
        }
        if (!allowed) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        await prisma.apiKey.update({ where: { id }, data: { revokedAt: new Date() } });
        return NextResponse.json({ success: true });
    } catch (error) {
        logger.error('Error revoking API key', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
