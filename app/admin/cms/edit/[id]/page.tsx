import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import EditClient from "./EditClient"
import React from "react"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  const { id } = await params

  if (!session?.user || !["ADMIN", "ANALYST"].includes(session.user.role as string)) redirect("/")

  // Fetch the post
  let post = null
  try {
    const postModel = (prisma as any).post
    if (postModel) {
      post = await postModel.findUnique({
        where: { id },
        include: { author: { select: { name: true } } }
      })
    }
  } catch (e) {
    console.error("Failed to fetch post:", e)
  }

  if (!post) {
    redirect("/admin/cms")
  }

  // Analysts can only edit their own posts
  if (session.user.role === "ANALYST" && post.authorId !== session.user.id) {
    redirect("/admin/cms")
  }

  return (
    <div className="-mx-6 -my-6 h-[calc(100dvh-4rem)] min-w-0 overflow-hidden bg-[#0B1C2C] md:-mx-10 md:-my-10">
      <EditClient post={post} />
    </div>
  )
}