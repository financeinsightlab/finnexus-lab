// app/api/notifications/route.ts — notifications inbox (Pillar D3)

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { listNotifications, markNotificationsRead, unreadCount } from '@/lib/community-store';

export const runtime = 'nodejs';

const readSchema = z.object({
    ids: z.array(z.string().min(1)).optional(),
});

export async function GET() {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    try {
        const [notifications, unread] = await Promise.all([
            listNotifications(auth.user.id),
            unreadCount(auth.user.id),
        ]);
        return NextResponse.json({ notifications, unread });
    } catch (error) {
        logger.error('Error listing notifications', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const auth = await authorizeApi();
    if (!auth.ok) return auth.response;

    const parsed = await parseJsonBody(request, readSchema);
    if (!parsed.ok) return parsed.response;

    try {
        const result = await markNotificationsRead(auth.user.id, parsed.data.ids);
        const unread = await unreadCount(auth.user.id);
        return NextResponse.json({ marked: result.count, unread });
    } catch (error) {
        logger.error('Error marking notifications read', {
            error: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
