// ─── Pipeline Kanban: Page ─────────────────────────────────────────────────────
// /admin/leads/pipeline — Drag-and-drop kanban board for lead pipeline

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import HeroBackground from "@/components/ui/HeroBackground"
import PipelineKanban from "@/components/admin/PipelineKanban"

export default async function PipelinePage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  const userRole = session.user.role as string
  if (!["ADMIN", "ANALYST"].includes(userRole)) redirect("/")

  const leads = await prisma.lead.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      fullName: true,
      companyName: true,
      jobTitle: true,
      emails: true,
      phones: true,
      city: true,
      state: true,
      status: true,
      score: true,
      source: true,
      aiEnriched: true,
      tags: true,
    },
    take: 500,
  })

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <HeroBackground />
      <div className="relative z-10 max-w-full mx-auto px-6 py-8">
        <PipelineKanban leads={JSON.parse(JSON.stringify(leads))} />
      </div>
    </div>
  )
}