// app/admin/study/page.tsx — Study Material admin management

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Star } from "lucide-react"
import StudyAdminClient from "./StudyAdminClient"

export const dynamic = 'force-dynamic'

export default async function StudyAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; status?: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) redirect("/")

  const params = await searchParams
  const search = params.search || ""
  const categoryId = params.category || ""
  const status = params.status

  const where = {
    ...(categoryId ? { categoryId } : {}),
    ...(status === "published" ? { published: true } : status === "draft" ? { published: false } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  }

  const [materials, categories, total] = await Promise.all([
    prisma.studyMaterial.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { id: true, name: true, slug: true, icon: true } },
        author: { select: { id: true, name: true } },
      },
    }),
    prisma.studyCategory.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { materials: true } } },
    }),
    prisma.studyMaterial.count({ where }),
  ])

  return (
    <StudyAdminClient
      materials={JSON.parse(JSON.stringify(materials))}
      categories={JSON.parse(JSON.stringify(categories))}
      total={total}
      search={search}
      activeCategory={categoryId}
      activeStatus={status || ""}
    />
  )
}
