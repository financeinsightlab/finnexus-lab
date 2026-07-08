// ─── Leads Bulk Operations ─────────────────────────────────────────────────────
// PATCH /api/leads/bulk — bulk update status, tags, assign, add to list

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { leadIds, action, value } = body

  if (!leadIds?.length || !action) {
    return NextResponse.json({ error: "leadIds and action required" }, { status: 400 })
  }

  const updatedLeads: string[] = []

  switch (action) {
    case "status": {
      // Bulk status change
      const results = await Promise.all(
        leadIds.map(async (id: string) => {
          const existing = await prisma.lead.findUnique({ where: { id }, select: { status: true } })
          if (!existing || existing.status === value) return null

          await prisma.lead.update({ where: { id }, data: { status: value } })
          await prisma.leadActivity.create({
            data: {
              leadId: id,
              type: "STATUS_CHANGE",
              summary: `Bulk status change: ${existing.status} → ${value}`,
              metadata: { fromStatus: existing.status, toStatus: value },
              userId: session.user.id,
            },
          })
          return id
        })
      )
      updatedLeads.push(...(results.filter(Boolean) as string[]))
      break
    }

    case "assign": {
      await prisma.lead.updateMany({
        where: { id: { in: leadIds } },
        data: { assignedTo: value },
      })
      await Promise.all(
        leadIds.map((id: string) =>
          prisma.leadActivity.create({
            data: {
              leadId: id,
              type: "ASSIGNED",
              summary: `Assigned to ${value}`,
              metadata: { assignedTo: value },
              userId: session.user.id,
            },
          })
        )
      )
      updatedLeads.push(...leadIds)
      break
    }

    case "addTags": {
      const tags = Array.isArray(value) ? value : [value]
      for (const id of leadIds) {
        const lead = await prisma.lead.findUnique({ where: { id }, select: { tags: true } })
        if (!lead) continue
        const existingTags = (lead.tags as string[]) || []
        const newTags = [...new Set([...existingTags, ...tags])]
        await prisma.lead.update({ where: { id }, data: { tags: newTags } })
      }
      updatedLeads.push(...leadIds)
      break
    }

    case "removeTags": {
      const tags = Array.isArray(value) ? value : [value]
      for (const id of leadIds) {
        const lead = await prisma.lead.findUnique({ where: { id }, select: { tags: true } })
        if (!lead) continue
        const existingTags = (lead.tags as string[]) || []
        const newTags = existingTags.filter((t) => !tags.includes(t))
        await prisma.lead.update({ where: { id }, data: { tags: newTags } })
      }
      updatedLeads.push(...leadIds)
      break
    }

    case "addToList": {
      for (const id of leadIds) {
        await prisma.leadListMember.upsert({
          where: { listId_leadId: { listId: value, leadId: id } },
          create: { listId: value, leadId: id },
          update: {},
        })
        await prisma.leadActivity.create({
          data: {
            leadId: id,
            type: "ADDED_TO_LIST",
            summary: `Added to list`,
            metadata: { listId: value },
            userId: session.user.id,
          },
        })
      }
      updatedLeads.push(...leadIds)
      break
    }

    default:
      return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  }

  await prisma.leadActivity.create({
    data: {
      leadId: leadIds[0],
      type: "BULK_UPDATED",
      summary: `Bulk ${action} on ${updatedLeads.length} leads`,
      metadata: { action, value, count: updatedLeads.length },
      userId: session.user.id,
    },
  })

  return NextResponse.json({ updated: updatedLeads.length, leadIds: updatedLeads })
}