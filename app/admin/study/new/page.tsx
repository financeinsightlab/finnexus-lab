// app/admin/study/new/page.tsx — Create new study material

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import StudyFormClient from "../StudyFormClient"

export const dynamic = 'force-dynamic'

export default async function NewStudyMaterialPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) redirect("/")

  const categories = await prisma.studyCategory.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, name: true, icon: true },
  })

  return <StudyFormClient categories={categories} mode="create" />
}
