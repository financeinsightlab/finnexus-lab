// app/api/notifications/preferences/route.ts — notification opt-ins (Pillar D3)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { getNotificationPreferences, updateNotificationPreferences } from '@/lib/community-store';

export const runtime = 'nodejs';

const prefsSchema = z.object({
    emailDigest: z.boolean().optional(),
    productUpdates: z.boolean().optional(),
    comments: z.boolean().optional(),
    follows: z.boolean().optional(),
    marketing: z.boolean().optional(),
});

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const preferences = await getNotificationPreferences(auth.user.id);
        return NextResponse.json({ preferences });
    } catch (error) {
        logger.error('Error loading notification preferences', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const parsed = await parseJsonBody(request, prefsSchema);
    if (!parsed.ok) return parsed.response;

    try {
        const preferences = await updateNotificationPreferences(auth.user.id, parsed.data);
        return NextResponse.json({ preferences });
    } catch (error) {
        logger.error('Error updating notification preferences', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
