// app/api/follow/route.ts — follow / unfollow another user (Pillar D3)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { follow, followCounts, unfollow } from '@/lib/community-store';

export const runtime = 'nodejs';

const followSchema = z.object({
    userId: z.string().min(1),
});

export async function POST(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const parsed = await parseJsonBody(request, followSchema);
    if (!parsed.ok) return parsed.response;

    try {
        await follow(auth.user.id, parsed.data.userId);
        const counts = await followCounts(parsed.data.userId);
        return NextResponse.json({ following: true, counts });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes('Cannot follow yourself')) {
            return NextResponse.json({ error: message }, { status: 400 });
        }
        logger.error('Error following user', { error: message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const parsed = await parseJsonBody(request, followSchema);
    if (!parsed.ok) return parsed.response;

    try {
        await unfollow(auth.user.id, parsed.data.userId);
        const counts = await followCounts(parsed.data.userId);
        return NextResponse.json({ following: false, counts });
    } catch (error) {
        logger.error('Error unfollowing user', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
