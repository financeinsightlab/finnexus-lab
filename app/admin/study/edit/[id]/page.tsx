// app/admin/study/edit/[id]/page.tsx — Edit existing study material

import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import StudyFormClient from "../../StudyFormClient"

export const dynamic = 'force-dynamic'

export default async function EditStudyMaterialPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) redirect("/")

  const { id } = await params

  const [material, categories] = await Promise.all([
    prisma.studyMaterial.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        categoryId: true,
        type: true,
        difficulty: true,
        tags: true,
        coverImage: true,
        resourceUrl: true,
        duration: true,
        published: true,
        featured: true,
      },
    }),
    prisma.studyCategory.findMany({
      orderBy: { order: 'asc' },
      select: { id: true, name: true, icon: true },
    }),
  ])

  if (!material) notFound()

  return <StudyFormClient categories={categories} material={material} mode="edit" />
}
