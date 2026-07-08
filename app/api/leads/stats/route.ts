// ─── Leads Stats ───────────────────────────────────────────────────────────────
// GET /api/leads/stats — dashboard summary stats

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [
    totalLeads,
    newThisWeek,
    byStatus,
    bySource,
    byIndustry,
    avgScore,
    recentImports,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.lead.groupBy({ by: ["source"], _count: { id: true } }),
    prisma.lead.groupBy({
      by: ["industry"],
      _count: { id: true },
      where: { industry: { not: null } },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.lead.aggregate({ _avg: { score: true } }),
    prisma.importLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, fileName: true, totalRows: true, importedRows: true, createdAt: true },
    }),
  ])

  return NextResponse.json({
    totalLeads,
    newThisWeek,
    byStatus: byStatus.map((s) => ({ status: s.status, count: s._count.id })),
    bySource: bySource.map((s) => ({ source: s.source, count: s._count.id })),
    byIndustry,
    avgScore: Math.round(avgScore._avg.score ?? 0),
    recentImports,
  })
}