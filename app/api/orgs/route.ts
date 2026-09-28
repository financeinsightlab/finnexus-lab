// app/api/orgs/route.ts — organizations & membership (Pillar A4)
//
// GET  → organizations the signed-in user belongs to (with their role)
// POST { name, slug? } → create an organization and become its OWNER

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const createOrgSchema = z.object({
    name: z.string().trim().min(2).max(120),
    slug: z
        .string()
        .trim()
        .regex(/^[a-z0-9][a-z0-9-]{1,58}[a-z0-9]$/, 'Slug must be lowercase letters, numbers or dashes')
        .optional(),
});

function slugify(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60);
}

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const memberships = await prisma.membership.findMany({
            where: { userId: auth.user.id },
            include: { org: true },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            organizations: memberships.map((m) => ({
                id: m.org.id,
                name: m.org.name,
                slug: m.org.slug,
                plan: m.org.plan,
                seats: m.org.seats,
                role: m.role,
                createdAt: m.org.createdAt,
            })),
        });
    } catch (error) {
        logger.error('Error listing organizations', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const parsed = await parseJsonBody(request, createOrgSchema);
    if (!parsed.ok) return parsed.response;

    const slug = parsed.data.slug ?? slugify(parsed.data.name);
    if (!slug) {
        return NextResponse.json({ error: 'Could not derive a slug from the name' }, { status: 400 });
    }

    try {
        const existing = await prisma.organization.findUnique({ where: { slug } });
        if (existing) {
            return NextResponse.json({ error: 'That slug is already taken' }, { status: 409 });
        }

        const org = await prisma.organization.create({
            data: {
                name: parsed.data.name,
                slug,
                memberships: { create: { userId: auth.user.id, role: 'OWNER' } },
            },
        });

        return NextResponse.json({ organization: org }, { status: 201 });
    } catch (error) {
        logger.error('Error creating organization', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
