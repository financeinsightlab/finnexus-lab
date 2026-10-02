import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authorizeApi, ADMIN_ROLES } from '@/lib/auth-guards';
import { parseJsonBody } from '@/lib/validation';
import { revalidateProductContent } from '@/lib/product-content-admin';
import { logger } from '@/lib/logger';
import { listAdminPromotions, promotionInputSchema, savePromotion } from '@/lib/promotions/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

/** GET — every promotion with its effective targeting/placement rules. */
export async function GET() {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  try {
    const promotions = await listAdminPromotions();
    return NextResponse.json({ promotions }, { headers: NO_STORE });
  } catch (error) {
    logger.error('Admin promotion list failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Promotion content unavailable' }, { status: 503, headers: NO_STORE });
  }
}

/** POST — create or update a promotion together with its rules (validated server-side). */
export async function POST(request: Request) {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, promotionInputSchema);
  if (!parsed.ok) return parsed.response;
  try {
    const result = await savePromotion(parsed.data);
    try {
      revalidateProductContent({ type: 'PROMOTION' });
    } catch (revalError) {
      logger.warn('Promotion cache revalidation skipped', { error: revalError });
    }
    return NextResponse.json(
      { promotion: result.promotion, warning: result.warning },
      { status: result.created ? 201 : 200, headers: NO_STORE },
    );
  } catch (error) {
    logger.warn('Admin promotion save failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Promotion could not be saved' }, { status: 409, headers: NO_STORE });
  }
}

/** DELETE — permanently delete, or toggle `active` when `permanent` is false. */
export async function DELETE(request: Request) {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(
    request,
    z.object({
      id: z.string().min(1).max(64),
      permanent: z.boolean().optional(),
      active: z.boolean().optional(),
    }),
  );
  if (!parsed.ok) return parsed.response;
  try {
    if (parsed.data.permanent === true) {
      await prisma.promotion.delete({ where: { id: parsed.data.id } });
    } else {
      await prisma.promotion.update({ where: { id: parsed.data.id }, data: { active: parsed.data.active ?? false } });
    }
    try {
      revalidateProductContent({ type: 'PROMOTION' });
    } catch {
      // non-fatal
    }
    return NextResponse.json({ ok: true, deleted: parsed.data.permanent === true }, { headers: NO_STORE });
  } catch (error) {
    logger.warn('Promotion delete or deactivate failed', { error });
    return NextResponse.json({ error: 'Promotion was not found or could not be deleted' }, { status: 404, headers: NO_STORE });
  }
}
