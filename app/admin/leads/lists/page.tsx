// ─── Lists Management: Page ────────────────────────────────────────────────────
// /admin/leads/lists — Manage lead lists/segments

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import HeroBackground from "@/components/ui/HeroBackground"
import ListsClient from "./ListsClient"

export default async function ListsPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  const userRole = session.user.role as string
  if (!["ADMIN", "ANALYST"].includes(userRole)) redirect("/")

  const lists = await prisma.leadList.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { members: true } },
    },
  })

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <HeroBackground />
      <ListsClient lists={JSON.parse(JSON.stringify(lists))} />
    </div>
  )
}