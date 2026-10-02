import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authorizeApi, ADMIN_ROLES } from '@/lib/auth-guards';
import { crawlWebsiteUrl } from '@/lib/crawl-promotion-url';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const crawlRequestSchema = z.object({
  url: z.string().trim().min(3).max(2048),
});

export async function POST(request: Request) {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;

  try {
    const json = await request.json().catch(() => ({}));
    const parsed = crawlRequestSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please provide a valid website URL.' }, { status: 400 });
    }

    const metadata = await crawlWebsiteUrl(parsed.data.url);
    return NextResponse.json({ ok: true, metadata }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    logger.warn('Promotion URL crawling failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not crawl website URL.' },
      { status: 422 },
    );
  }
}
