import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { parseJsonBody } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { consumeRateLimit } from '@/lib/rate-limit';
import { requestRateLimitSubject } from '@/lib/request-rate-limit';
import { DEVICES, isPromotionSlot } from '@/lib/promotions/catalog';
import { normalizePath, resolvePageContext } from '@/lib/promotions/targeting';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const eventSchema = z.object({
  promotionId: z.string().min(1).max(64),
  eventType: z.enum(['IMPRESSION', 'CLICK']),
  path: z.string().min(1).max(2048).refine((path) => path.startsWith('/') && !path.startsWith('//')),
  slot: z.string().max(40).optional(),
  device: z.enum(DEVICES).optional(),
});

export async function POST(request: Request) {
  const parsed = await parseJsonBody(request, eventSchema);
  if (!parsed.ok) return parsed.response;

  try {
    const rate = await consumeRateLimit('promotion-event', requestRateLimitSubject(request), { limit: 120, windowSeconds: 60 });
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Too many promotion events. Please retry shortly.' }, {
        status: 429,
        headers: { 'Cache-Control': 'no-store', 'Retry-After': String(rate.retryAfterSeconds) },
      });
    }

    const campaign = await prisma.promotion.findFirst({
      where: {
        id: parsed.data.promotionId,
        active: true,
        OR: [{ startsAt: null }, { startsAt: { lte: new Date() } }],
        AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: new Date() } }] }],
      },
      select: { id: true },
    });
    if (!campaign) return NextResponse.json({ error: 'Promotion is not active' }, { status: 404 });

    const path = normalizePath(parsed.data.path);
    const slot = parsed.data.slot && isPromotionSlot(parsed.data.slot.toUpperCase()) ? parsed.data.slot.toUpperCase() : null;
    const { pageType } = resolvePageContext(path);
    const data = {
      promotionId: campaign.id,
      eventType: parsed.data.eventType,
      path,
      slot,
      device: parsed.data.device ?? null,
      pageType,
    };
    try {
      await prisma.promotionEvent.create({ data });
    } catch (error) {
      // Before the targeting migration runs the new columns do not exist yet —
      // keep recording the legacy shape rather than losing the event.
      if (!/slot|device|pageType/i.test(error instanceof Error ? error.message : String(error))) throw error;
      await prisma.promotionEvent.create({ data: { promotionId: campaign.id, eventType: parsed.data.eventType, path } });
    }
    return new NextResponse(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    logger.warn('Promotion event could not be recorded', {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: 'Tracking unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
