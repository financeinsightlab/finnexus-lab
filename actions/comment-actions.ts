"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addCommentAction(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Must be logged in to comment")

  const content = formData.get("content") as string
  const postId = formData.get("postId") as string | null
  const predictionId = formData.get("predictionId") as string | null
  const path = formData.get("path") as string

  if (!content || !content.trim()) return

  await prisma.comment.create({
    data: {
      content: content.trim(),
      authorId: session.user.id!,
      postId: postId || null,
      predictionId: predictionId || null,
    }
  })

  if (path) revalidatePath(path)
}

export async function deleteCommentAction(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const commentId = formData.get("commentId") as string
  const path = formData.get("path") as string

  const comment = await prisma.comment.findUnique({ where: { id: commentId } })
  if (!comment) return

  // Only Admin or the Author can delete the comment
  if (comment.authorId !== session.user.id && session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  await prisma.comment.delete({ where: { id: commentId } })

  if (path) revalidatePath(path)
}
