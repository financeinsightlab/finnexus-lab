import { NextResponse } from 'next/server';
import { authorizeApi, ADMIN_ROLES } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { PAGE_TYPE_META, PROMOTION_SLOTS, ROTATION_MODE_META, SELECTABLE_PAGE_TYPES, SLOT_META } from '@/lib/promotions/catalog';
import { getPageRegistry } from '@/lib/promotions/page-registry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GROUP_LIMIT = 400;

/**
 * GET — the vocabulary the admin UI needs: page types, slots, rotation modes
 * and the grouped list of real public pages (searchable with ?q=).
 */
export async function GET(request: Request) {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('q') || '').trim().toLowerCase();
    const registry = await getPageRegistry();
    const filtered = query
      ? registry.filter((page) => page.path.includes(query) || page.title.toLowerCase().includes(query) || page.tags.some((tag) => tag.includes(query)))
      : registry;

    const groups = new Map<string, { pageType: string; label: string; total: number; pages: Array<{ path: string; title: string; isHub: boolean; contentKey: string | null }> }>();
    for (const page of filtered) {
      const group = groups.get(page.pageType) ?? { pageType: page.pageType, label: PAGE_TYPE_META[page.pageType].label, total: 0, pages: [] };
      group.total += 1;
      if (group.pages.length < GROUP_LIMIT) group.pages.push({ path: page.path, title: page.title, isHub: page.isHub, contentKey: page.contentKey });
      groups.set(page.pageType, group);
    }

    return NextResponse.json(
      {
        query,
        totalPages: filtered.length,
        groups: [...groups.values()].sort((a, b) => a.label.localeCompare(b.label)),
        pageTypes: SELECTABLE_PAGE_TYPES.map((key) => ({ ...PAGE_TYPE_META[key], count: registry.filter((page) => page.pageType === key).length })),
        slots: PROMOTION_SLOTS.map((key) => ({ ...SLOT_META[key], pageTypes: SLOT_META[key].pageTypes === 'ALL_PUBLIC' ? 'ALL_PUBLIC' : SLOT_META[key].pageTypes })),
        rotationModes: Object.entries(ROTATION_MODE_META).map(([key, meta]) => ({ key, ...meta })),
      },
      { headers: { 'Cache-Control': 'private, no-store' } },
    );
  } catch (error) {
    logger.error('Promotion page registry failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Page registry unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
