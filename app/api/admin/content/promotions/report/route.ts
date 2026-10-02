import { NextResponse } from 'next/server';
import { authorizeApi, ADMIN_ROLES } from '@/lib/auth-guards';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  try {
    const [campaigns, events] = await Promise.all([
      prisma.promotion.findMany({ orderBy: [{ active: 'desc' }, { createdAt: 'desc' }], take: 200, select: { id: true, brandName: true, title: true, active: true, campaignId: true } }),
      prisma.promotionEvent.groupBy({ by: ['promotionId', 'eventType'], where: { createdAt: { gte: since } }, _count: { _all: true } }),
    ]);
    const report = campaigns.map((campaign) => {
      const impressions = events.find((event) => event.promotionId === campaign.id && event.eventType === 'IMPRESSION')?._count._all ?? 0;
      const clicks = events.find((event) => event.promotionId === campaign.id && event.eventType === 'CLICK')?._count._all ?? 0;
      return { ...campaign, impressions, clicks, ctr: impressions ? Math.round((clicks / impressions) * 10000) / 100 : 0 };
    });
    return NextResponse.json({ since: since.toISOString(), reports: report, note: 'Raw viewable impression and click events from the last 30 days. Not unique reach or conversions.' }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.error('Promotion report unavailable', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Promotion reporting unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
