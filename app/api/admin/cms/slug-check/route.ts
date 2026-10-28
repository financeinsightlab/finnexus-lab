import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authorizeApi, STAFF_ROLES } from '@/lib/auth-guards'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  slug: z.string().trim().min(2).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excludeId: z.string().optional(),
})

export async function GET(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES)
  if (!auth.ok) return auth.response
  const url = new URL(request.url)
  const slug = url.searchParams.get('slug')?.trim() || ''
  const excludeId = url.searchParams.get('excludeId')?.trim() || undefined

  const parsed = schema.safeParse({ slug, excludeId })
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid slug format. Use lowercase letters, numbers and hyphens.', available: false }, { status: 400 })
  }
  try {
    const existing = await prisma.post.findUnique({ where: { slug: parsed.data.slug }, select: { id: true, title: true, type: true } })
    if (!existing) return NextResponse.json({ ok: true, available: true })
    if (excludeId && existing.id === excludeId) return NextResponse.json({ ok: true, available: true, self: true })
    return NextResponse.json({ ok: true, available: false, collision: existing }, { status: 200 })
  } catch {
    return NextResponse.json({ ok: false, error: 'Slug check unavailable' }, { status: 503 })
  }
}

export async function POST(request: Request) {
  const auth = await authorizeApi(STAFF_ROLES)
  if (!auth.ok) return auth.response
  let body: unknown
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })}
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  try {
    const existing = await prisma.post.findUnique({ where: { slug: parsed.data.slug }, select: { id: true } })
    if (!existing) return NextResponse.json({ available: true })
    if (parsed.data.excludeId && existing.id === parsed.data.excludeId) return NextResponse.json({ available: true, self: true })
    return NextResponse.json({ available: false })
  } catch {
    return NextResponse.json({ error: 'Check failed' }, { status: 503 })
  }
}
