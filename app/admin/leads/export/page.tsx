// ─── Export Leads: Page ────────────────────────────────────────────────────────
// /admin/leads/export — Export filtered leads as CSV or Excel

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import HeroBackground from "@/components/ui/HeroBackground"
import ExportClient from "./ExportClient"

export default async function ExportPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  const userRole = session.user.role as string
  if (!["ADMIN", "ANALYST"].includes(userRole)) redirect("/")

  // Fetch stats for filter options
  const [statuses, sources, industries, totalLeads] = await Promise.all([
    prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.lead.groupBy({ by: ["source"], _count: { id: true } }),
    prisma.lead.groupBy({ by: ["industry"], _count: { id: true }, where: { industry: { not: null } }, orderBy: { _count: { id: "desc" } }, take: 20 }),
    prisma.lead.count(),
  ])

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <HeroBackground />
      <ExportClient
        statuses={JSON.parse(JSON.stringify(statuses))}
        sources={JSON.parse(JSON.stringify(sources))}
        industries={JSON.parse(JSON.stringify(industries))}
        totalLeads={totalLeads}
      />
    </div>
  )
}