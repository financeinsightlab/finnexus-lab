// ─── List Detail: Page ─────────────────────────────────────────────────────────
// /admin/leads/lists/[id] — View a list's leads with bulk actions

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import HeroBackground from "@/components/ui/HeroBackground"
import ListDetailClient from "./ListDetailClient"

export default async function ListDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  const userRole = session.user.role as string
  if (!["ADMIN", "ANALYST"].includes(userRole)) redirect("/")

  const { id } = await params

  const list = await prisma.leadList.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          lead: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              fullName: true,
              companyName: true,
              jobTitle: true,
              industry: true,
              status: true,
              score: true,
              source: true,
              emails: true,
              phones: true,
              city: true,
              state: true,
              aiEnriched: true,
              tags: true,
              createdAt: true,
            },
          },
        },
        orderBy: { addedAt: "desc" },
      },
      _count: { select: { members: true } },
    },
  })

  if (!list) return (
    <div className="min-h-screen bg-[#0A0F1A] flex items-center justify-center">
      <HeroBackground />
      <p className="text-slate-400">List not found</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <HeroBackground />
      <ListDetailClient list={JSON.parse(JSON.stringify(list))} />
    </div>
  )
}