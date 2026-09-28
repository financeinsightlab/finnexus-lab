// app/api/profile/route.ts — the signed-in user's own profile (Pillar D2)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { followCounts, upsertProfile } from '@/lib/community-store';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const profileSchema = z.object({
    headline: z.string().trim().max(160).optional(),
    bio: z.string().trim().max(2000).optional(),
    location: z.string().trim().max(120).optional(),
    website: z.string().url().max(300).optional().or(z.literal('')),
    twitter: z.string().trim().max(60).optional(),
    linkedin: z.string().url().max(300).optional().or(z.literal('')),
    github: z.string().trim().max(60).optional(),
    isPublic: z.boolean().optional(),
});

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const [profile, counts] = await Promise.all([
            prisma.profile.findUnique({ where: { userId: auth.user.id } }),
            followCounts(auth.user.id),
        ]);
        return NextResponse.json({ profile, counts });
    } catch (error) {
        logger.error('Error loading own profile', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const parsed = await parseJsonBody(request, profileSchema);
    if (!parsed.ok) return parsed.response;

    try {
        const profile = await upsertProfile(auth.user.id, parsed.data);
        return NextResponse.json({ profile });
    } catch (error) {
        logger.error('Error updating profile', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
