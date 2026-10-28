import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TYPE_PATH: Record<string, string> = {
  RESEARCH: 'research', INSIGHT: 'insights', CASE_STUDY: 'case-studies', MEDIA: 'media', OTHER: 'research',
}

/** PART D — internal-link suggestions: published posts matching a query/tags. Read-only. */
export async function GET(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES)
  if (!auth.ok) return auth.response
  const url = new URL(request.url)
  const q = (url.searchParams.get('q') || '').trim().slice(0, 80)
  const excludeId = url.searchParams.get('excludeId') || undefined
  if (q.length < 2) return NextResponse.json({ suggestions: [] })
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        ...(excludeId ? { id: { not: excludeId } } : {}),
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { excerpt: { contains: q, mode: 'insensitive' } },
          { tags: { has: q.toLowerCase() } },
        ],
      },
      orderBy: { updatedAt: 'desc' },
      take: 8,
      select: { id: true, title: true, slug: true, type: true },
    })
    return NextResponse.json({
      suggestions: posts.map((p: any) => ({ ...p, href: `/${TYPE_PATH[p.type] ?? 'research'}/${p.slug}` })),
    })
  } catch {
    return NextResponse.json({ suggestions: [] }, { status: 200 })
  }
}
