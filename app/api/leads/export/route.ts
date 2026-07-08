// ─── Leads Export ──────────────────────────────────────────────────────────────
// POST /api/leads/export — export filtered leads as CSV or Excel

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { generateCSVBlob, generateExcelBuffer, type ExportableLead } from "@/lib/leads/export"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { status, source, industry, listId, ids, format = "csv" } = body

  let leads

  if (ids && ids.length > 0) {
    leads = await prisma.lead.findMany({ where: { id: { in: ids } } })
  } else {
    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (source) where.source = source
    if (industry) where.industry = industry
    if (listId) where.listMemberships = { some: { listId } }

    leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 5000,
    })
  }

  // Log activity for each exported lead
  if (session.user.id) {
    await Promise.all(
      leads.slice(0, 100).map((l) =>
        prisma.leadActivity.create({
          data: {
            leadId: l.id,
            type: "EXPORTED" as never,
            summary: `Exported as ${format.toUpperCase()}`,
            userId: session.user.id,
          },
        })
      )
    )
  }

  const exportableLeads = leads as unknown as ExportableLead[]

  if (format === "xlsx") {
    const buffer = await generateExcelBuffer(exportableLeads)
    const uint8 = new Uint8Array(buffer)
    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="leads-export-${Date.now()}.xlsx"`,
      },
    })
  }

  // Default: CSV
  const blob = generateCSVBlob(exportableLeads)
  const arrayBuf = await blob.arrayBuffer()
  return new NextResponse(arrayBuf, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-export-${Date.now()}.csv"`,
    },
  })
}