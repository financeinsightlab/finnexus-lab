import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';

const trackSchema = z.object({
  path: z.string().min(1).max(2048),
  sessionId: z.string().min(1).max(256),
  durationMs: z.number().int().nonnegative().max(1000 * 60 * 60 * 24).optional(),
  referrer: z.string().max(2048).nullish(),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = await parseJsonBody(req, trackSchema);
    if (!parsed.ok) return parsed.response;

    const { path, sessionId, durationMs, referrer } = parsed.data;

    const session = await auth();
    const userId = session?.user?.id ?? null;
    const userAgent = req.headers.get('user-agent') ?? undefined;

    // Upsert: update duration if same session+path, else create
    const existing = await prisma.pageView.findFirst({
      where: { sessionId, path },
    });

    if (existing) {
      await prisma.pageView.update({
        where: { id: existing.id },
        data: {
          durationMs: Math.max(existing.durationMs, durationMs ?? 0),
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.pageView.create({
        data: {
          path,
          sessionId,
          userId,
          durationMs: durationMs ?? 0,
          referrer: referrer ?? null,
          userAgent: userAgent ?? null,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Analytics is non-critical: never surface tracking failures to the client
    // (e.g. local dev without a database running).
    logger.warn('Analytics track skipped', {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ ok: true });
  }
}
