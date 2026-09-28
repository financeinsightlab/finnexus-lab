// app/api/admin/inquiries/reply/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isStaff } from '@/lib/auth-guards';
import { replyToContactInquiry } from '@/lib/contact-inquiries';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const replySchema = z.object({
  id: z.string().min(1, 'Inquiry ID is required'),
  replyText: z.string().trim().min(5, 'Reply must be at least 5 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !isStaff(user)) {
      return NextResponse.json({ error: 'Unauthorized — Staff access required' }, { status: 403 });
    }

    const body = await request.json();
    const parsed = replySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const { id, replyText } = parsed.data;
    const result = await replyToContactInquiry({
      id,
      replyText,
      repliedBy: user.name || user.email || 'Admin',
    });

    if (!result.success) {
      return NextResponse.json({ error: 'Inquiry not found or could not be updated' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      inquiry: result.inquiry,
      notifiedInApp: result.notifiedInApp,
      notifiedEmail: result.notifiedEmail,
      message: result.notifiedInApp
        ? 'Reply recorded and user notified via in-app notification & email dispatch!'
        : 'Reply recorded and notification dispatched to user email!',
    });
  } catch (error) {
    console.error('Failed to send reply to inquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
