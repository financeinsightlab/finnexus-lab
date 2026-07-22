// app/admin/study/categories/page.tsx — Study category management

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import CategoriesClient from "./CategoriesClient"

export const dynamic = 'force-dynamic'

export default async function StudyCategoriesPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) redirect("/")

  const categories = await prisma.studyCategory.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: { select: { materials: true } },
    },
  })

  return <CategoriesClient categories={JSON.parse(JSON.stringify(categories))} />
}
