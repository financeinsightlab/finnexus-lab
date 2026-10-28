"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { ArticleType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { publish } from "@/lib/publish"
import { enqueue } from "@/lib/jobs-store"

export type PostFormData = {
  title: string
  slug: string
  excerpt: string | null
  content: string
  type: ArticleType
  published: boolean
  featuredImage?: string | null

  // CMS Elite Meta
  seoTitle?: string | null
  metaDescription?: string | null
  focusKeywords?: string | null
  ogImage?: string | null
  ogTitle?: string | null
  tags?: string[]
  publishedAt?: Date | null

  // Enhanced Metadata
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT" | null
  targetAudience?: string[]
  contentStatus?: "DRAFT" | "REVIEW" | "APPROVED" | "PUBLISHED" | "ARCHIVED" | null
  estimatedReadingTime?: number | null

  // Scheduling
  scheduledPublishAt?: Date | null

  // Visual Editor Blocks
  contentType?: 'MARKDOWN' | 'BLOCKS'
  blockContent?: any
}

export async function createPost(formData: PostFormData) {
  const session = await auth()
  if (!session?.user || !["ADMIN", "ANALYST"].includes(session.user.role)) {
    throw new Error("Unauthorized")
  }

  const validAuthorId = session.user.id!;
  const existingUser = await prisma.user.findUnique({ where: { id: validAuthorId } });
  if (!existingUser) {
    console.warn("Cached session ID not found in database. Creating emergency dev user.");
    await prisma.user.create({
      data: {
        id: validAuthorId,
        email: `kunwaranalytics+dev-${validAuthorId}@gmail.com`,
        name: 'Admin Developer',
        role: 'ADMIN'
      }
    });
  }

  const post = await prisma.post.create({
    data: {
      ...formData,
      difficulty: formData.difficulty || "INTERMEDIATE",
      contentStatus: formData.contentStatus || "DRAFT",
      estimatedReadingTime: formData.estimatedReadingTime || 5,
      tags: formData.tags || [],
      targetAudience: formData.targetAudience || [],
      authorId: validAuthorId,
      publishedAt: formData.published ? new Date() : null,
      contentType: formData.contentType || "MARKDOWN",
      blockContent: formData.blockContent || null,
    },
  })

  await publish({
    entityType: "post",
    entityId: post.id,
    slug: post.slug,
    action: formData.published ? "published" : "created",
  })
  revalidatePath("/admin/cms")
  void enqueue("revalidate.path", { path: `/${formData.type.toLowerCase()}` }).catch(() => { })
  return post
}

export async function updatePost(id: string, formData: PostFormData) {
  const session = await auth()
  const userRole = session?.user?.role as string
  if (!session?.user || !["ADMIN", "ANALYST"].includes(userRole)) {
    throw new Error("Unauthorized")
  }

  const existingPost = await prisma.post.findUnique({ where: { id } })
  if (!existingPost) throw new Error("Post not found")
  if (userRole === "ANALYST" && existingPost.authorId !== session.user.id) {
    throw new Error("You can only modify your own content.")
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...formData,
      difficulty: formData.difficulty || "INTERMEDIATE",
      contentStatus: formData.contentStatus || "DRAFT",
      estimatedReadingTime: formData.estimatedReadingTime || 5,
      tags: formData.tags || [],
      targetAudience: formData.targetAudience || [],
      publishedAt: formData.published ? (formData.publishedAt || new Date()) : null,
      contentType: formData.contentType || "MARKDOWN",
      blockContent: formData.blockContent || null,
    },
  })

  await publish({ entityType: "post", entityId: post.id, slug: post.slug, action: "updated" })
  revalidatePath("/admin/cms")
  return post
}

export async function deletePost(id: string) {
  const session = await auth()
  const userRole = session?.user?.role as string
  if (!session?.user || !["ADMIN", "ANALYST"].includes(userRole)) {
    throw new Error("Unauthorized")
  }

  const existingPost = await prisma.post.findUnique({ where: { id } })
  if (!existingPost) throw new Error("Post not found")
  if (userRole === "ANALYST" && existingPost.authorId !== session.user.id) {
    throw new Error("You can only modify your own content.")
  }

  const post = await prisma.post.delete({
    where: { id },
  })

  await publish({ entityType: "post", entityId: post.id, slug: post.slug, action: "deleted" })
  revalidatePath("/admin/cms")
  return post
}

export async function togglePublishPost(id: string) {
  const session = await auth()
  const userRole = session?.user?.role as string
  if (!session?.user || !["ADMIN", "ANALYST"].includes(userRole)) {
    throw new Error("Unauthorized")
  }

  const post = await prisma.post.findUnique({
    where: { id },
  })

  if (!post) {
    throw new Error("Post not found")
  }
  if (userRole === "ANALYST" && post.authorId !== session.user.id) {
    throw new Error("You can only modify your own content.")
  }

  const nextPublished = !post.published
  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      published: nextPublished,
      contentStatus: nextPublished ? "PUBLISHED" : "DRAFT",
      publishedAt: nextPublished ? new Date() : null,
      // Publishing consumes any schedule; unpublishing clears stale scheduling.
      scheduledPublishAt: null,
    },
  })

  await publish({
    entityType: "post",
    entityId: updatedPost.id,
    slug: updatedPost.slug,
    action: updatedPost.published ? "published" : "unpublished",
  })
  revalidatePath("/admin/cms")
  return updatedPost
}

const WORKFLOW_STATES = ["DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "ARCHIVED"] as const
export type WorkflowState = (typeof WORKFLOW_STATES)[number]

/**
 * PART C — smallest coherent workflow transition on the EXISTING
 * `contentStatus` String column (no new status system, no migration).
 * `published` is derived: PUBLISHED => true, everything else => false.
 * Ownership rule mirrors updatePost/deletePost (ANALYST owns only own posts;
 * ADMIN may transition any). ARCHIVED keeps the row (recoverable via DRAFT).
 */
export async function transitionContentStatus(id: string, next: WorkflowState) {
  const session = await auth()
  const userRole = session?.user?.role as string
  if (!session?.user || !["ADMIN", "ANALYST"].includes(userRole)) throw new Error("Unauthorized")
  if (!WORKFLOW_STATES.includes(next)) throw new Error("Invalid workflow state")

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) throw new Error("Post not found")
  if (userRole === "ANALYST" && post.authorId !== session.user.id) {
    throw new Error("You can only modify your own content.")
  }

  const updated = await prisma.post.update({
    where: { id },
    data: {
      contentStatus: next,
      published: next === "PUBLISHED",
      publishedAt: next === "PUBLISHED" ? (post.publishedAt ?? new Date()) : null,
      ...(next === "PUBLISHED" ? { scheduledPublishAt: null } : {}),
    },
  })

  await publish({
    entityType: "post",
    entityId: updated.id,
    slug: updated.slug,
    action: next === "PUBLISHED" ? "published" : next === "ARCHIVED" ? "unpublished" : "updated",
  })
  revalidatePath("/admin/cms")
  revalidatePath("/admin")
  return updated
}

export async function transitionContentStatusForm(formData: FormData) {
  const id = formData.get("id") as string
  const next = formData.get("next") as WorkflowState
  await transitionContentStatus(id, next)
}

export async function togglePublishPostForm(formData: FormData) {
  const id = formData.get("id") as string
  await togglePublishPost(id)
}

export async function deletePostForm(formData: FormData) {
  const id = formData.get("id") as string
  await deletePost(id)
}
