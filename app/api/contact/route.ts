// FILE: app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100, 'Name too long'),
  organisation: z.string().trim().max(200).optional(),
  email: z.string().trim().email('Invalid email format'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject too long'),
  budget: z.string().trim().max(100).optional(),
  message: z
    .string()
    .trim()
    .min(20, 'Please add a little more detail (at least 20 characters)')
    .max(5000, 'Message too long'),
  /** Honeypot field — legitimate submissions leave this empty. */
  website: z.string().optional(),
});

/**
 * Best-effort in-memory rate limiter. Serverless instances are ephemeral, so
 * this throttles bursts per lambda rather than providing a global guarantee —
 * good enough to blunt naive form spam without an external dependency.
 */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // crude memory guard
  return recent.length > RATE_LIMIT.max;
}

function clientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please wait a minute and try again.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 },
      );
    }

    const { name, organisation, email, subject, budget, message, website } = parsed.data;

    // Silently accept honeypot hits so bots don't learn to adapt.
    if (website && website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    // Save contact submission to persistent storage (Postgres DB + JSON fallback)
    const { createContactInquiry } = await import('@/lib/contact-inquiries');
    const saved = await createContactInquiry({
      name,
      organisation,
      email,
      subject,
      budget,
      message,
      ip,
    });

    console.log('Contact form submission saved:', {
      id: saved.id,
      name,
      organisation: organisation || 'Not provided',
      email,
      subject,
      budget: budget || 'Not provided',
      recipientEmail: 'kunwaranalytics@gmail.com',
      ip,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: saved.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
