// FILE: app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().trim().email('Invalid email format').max(254, 'Email address is too long'),
  tag: z.string().trim().max(50).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 },
      );
    }

    // Legacy calculator forms used this endpoint as a client-side unlock toggle.
    // Do not persist or log the submitted address, and do not treat it as a
    // newsletter subscription. Protected tools are gated separately on the server.
    if (parsed.data.tag?.startsWith('unlocked_')) {
      return NextResponse.json({ success: true, subscriptionRecorded: false });
    }

    // No email provider or durable subscription store is configured. Fail
    // honestly instead of claiming that a newsletter signup was completed.
    return NextResponse.json(
      { error: 'Newsletter sign-up is currently unavailable. Your email was not saved.' },
      { status: 503 },
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
