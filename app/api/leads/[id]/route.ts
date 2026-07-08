// ─── Lead Detail: Get, Update, Delete ──────────────────────────────────────────
// GET /api/leads/[id] — full lead detail with activity timeline
// PATCH /api/leads/[id] — update lead fields, auto-recalculates score
// DELETE /api/leads/[id] — soft-delete (archive) a lead

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { calculateScore } from "@/lib/leads/scoring"
import { auth } from "@/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      activities: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      listMemberships: {
        include: { list: true },
      },
      scrapeJob: {
        select: { id: true, type: true, searchKeyword: true, searchLocation: true },
      },
    },
  })

  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 })

  return NextResponse.json({ lead })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const existing = await prisma.lead.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: "Lead not found" }, { status: 404 })

  // Track status change for activity log
  const statusChanged = body.status && body.status !== existing.status

  // Recalculate score if fields changed
  const { score, breakdown } = calculateScore({ ...existing, ...body })

  const lead = await prisma.lead.update({
    where: { id },
    data: {
      ...body,
      score,
      scoreBreakdown: JSON.parse(JSON.stringify(breakdown)),
      fullName: (body.fullName ?? [body.firstName ?? existing.firstName, body.lastName ?? existing.lastName].filter(Boolean).join(" ")) || existing.fullName,
    },
  })

  // Log activity
  if (statusChanged) {
    await prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        type: "STATUS_CHANGE",
        summary: `Status changed from ${existing.status} to ${body.status}`,
        metadata: { fromStatus: existing.status, toStatus: body.status },
        userId: session.user.id,
      },
    })
  } else {
    await prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        type: "FIELD_UPDATED",
        summary: "Lead fields updated",
        metadata: { updatedFields: Object.keys(body) },
        userId: session.user.id,
      },
    })
  }

  return NextResponse.json({ lead })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  await prisma.lead.delete({ where: { id } })

  return NextResponse.json({ success: true })
}