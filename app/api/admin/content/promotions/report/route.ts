import { NextResponse } from 'next/server';
import { authorizeApi, ADMIN_ROLES } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { buildPromotionReport } from '@/lib/promotions/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET — promotion analytics. `?days=7|30|90` (default 30).
 * Impressions, clicks and CTR by promotion, campaign, page, slot, device, page
 * type and day. Conversions are reported as `null` ("Not configured") because
 * no conversion postback is wired up — numbers are never invented.
 */
export async function GET(request: Request) {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  const { searchParams } = new URL(request.url);
  const requestedDays = Number(searchParams.get('days') || 30);
  const days = [7, 14, 30, 60, 90].includes(requestedDays) ? requestedDays : 30;
  try {
    const report = await buildPromotionReport(days);
    // Legacy field kept for older clients.
    return NextResponse.json({ ...report, reports: report.byPromotion }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.error('Promotion report unavailable', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Promotion reporting unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
