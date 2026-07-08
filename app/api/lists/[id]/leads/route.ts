// ─── List Members API ──────────────────────────────────────────────────────────
// POST /api/lists/[id]/leads — add leads to a list
// DELETE /api/lists/[id]/leads — remove leads from a list

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { leadIds } = body

  if (!leadIds?.length) return NextResponse.json({ error: "leadIds required" }, { status: 400 })

  const results = await Promise.all(
    leadIds.map((leadId: string) =>
      prisma.leadListMember.upsert({
        where: { listId_leadId: { listId: id, leadId } },
        create: { listId: id, leadId },
        update: {},
      })
    )
  )

  return NextResponse.json({ added: results.length })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const { searchParams } = new URL(req.url)
  const leadIds = searchParams.get("leadIds")?.split(",") ?? []

  await prisma.leadListMember.deleteMany({
    where: { listId: id, leadId: { in: leadIds } },
  })

  return NextResponse.json({ success: true })
}