import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * PART G — media discoverability insights. Read-only aggregation.
 * Sources: Media rows (authoritative list) + Post.featuredImage/content + blockContent JSON text.
 * Usage is a best-effort text match and is labelled as such in the UI — never used to auto-delete.
 */
export async function GET() {
  const auth = await authorizeApi(STAFF_ROLES)
  if (!auth.ok) return auth.response
  try {
    const [total, missingAlt, posts] = await Promise.all([
      prisma.media.count(),
      prisma.media.count({ where: { OR: [{ altText: null }, { altText: '' }] } }),
      prisma.post.findMany({
        select: { featuredImage: true, content: true, blockContent: true },
        take: 2000,
      }),
    ])

    const blob = posts
      .map((p: any) => `${p.featuredImage ?? ''}\n${p.content ?? ''}\n${p.blockContent ? JSON.stringify(p.blockContent) : ''}`)
      .join('\n')

    const sample = await prisma.media.findMany({
      orderBy: { uploadedAt: 'desc' },
      take: 500,
      select: { id: true, url: true, path: true, altText: true, mimeType: true },
    })

    let used = 0
    const unusedIds: string[] = []
    for (const m of sample) {
      const needle = (m.path || m.url || '').split('/').pop() || m.url
      const isUsed = needle ? blob.includes(needle) || blob.includes(m.url) : false
      if (isUsed) used += 1
      else if (unusedIds.length < 200) unusedIds.push(m.id)
    }

    const byMime = await prisma.media.groupBy({ by: ['mimeType'], _count: { id: true } }).catch(() => [] as any[])

    return NextResponse.json(
      {
        total,
        missingAlt,
        sampled: sample.length,
        usedInSampledPosts: used,
        unusedSampleIds: unusedIds,
        byMime: (byMime as any[]).map((g: any) => ({ mimeType: g.mimeType, count: g._count.id })),
        note: 'Usage is a best-effort filename/URL match across up to 2000 posts (featuredImage, content, blockContent). Unused never auto-deletes — confirm before removing.',
      },
      { headers: { 'Cache-Control': 'private, no-store' } },
    )
  } catch {
    return NextResponse.json({ error: 'Media insights unavailable' }, { status: 503 })
  }
}
