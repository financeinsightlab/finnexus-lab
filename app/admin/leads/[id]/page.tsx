// ─── Lead Detail Page ──────────────────────────────────────────────────────────
// /admin/leads/[id] — 360° lead view with editable fields, timeline, and lists

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import HeroBackground from "@/components/ui/HeroBackground"
import LeadDetailClient from "./LeadDetailClient"

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")

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

  if (!lead) return <div className="text-white">Lead not found</div>

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <HeroBackground />
      <LeadDetailClient lead={JSON.parse(JSON.stringify(lead))} />
    </div>
  )
}