"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// ─── Validation Schemas ────────────────────────────────────────────────────────

const materialSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description too long'),
  content: z.string().min(1, 'Content is required'),
  categoryId: z.string().min(1, 'Category is required'),
  type: z.enum(['ARTICLE', 'VIDEO', 'PDF', 'COURSE', 'NOTE']).default('ARTICLE'),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).default('BEGINNER'),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().url().optional().or(z.literal('')),
  resourceUrl: z.string().url().optional().or(z.literal('')),
  duration: z.number().int().min(0).optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
})

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().max(500).optional().or(z.literal('')),
  icon: z.string().max(10).optional().or(z.literal('')),
  color: z.string().max(20).optional().or(z.literal('')),
  order: z.number().int().default(0),
})

// ─── Material Actions ──────────────────────────────────────────────────────────

export async function createStudyMaterial(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Must be logged in")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) {
    throw new Error("Insufficient permissions")
  }

  const raw = {
    title: (formData.get('title') as string)?.trim(),
    description: (formData.get('description') as string)?.trim(),
    content: formData.get('content') as string,
    categoryId: formData.get('categoryId') as string,
    type: (formData.get('type') as string) || 'ARTICLE',
    difficulty: (formData.get('difficulty') as string) || 'BEGINNER',
    tags: ((formData.get('tags') as string) || '').split(',').map((t) => t.trim()).filter(Boolean),
    coverImage: (formData.get('coverImage') as string) || '',
    resourceUrl: (formData.get('resourceUrl') as string) || '',
    duration: formData.get('duration') ? Number(formData.get('duration')) : undefined,
    published: formData.get('published') === 'true',
    featured: formData.get('featured') === 'true',
  }

  const parsed = materialSchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? 'Invalid input')
  }

  const data = parsed.data
  const slug = `${slugify(data.title).slice(0, 60)}-${Date.now()}`

  await prisma.studyMaterial.create({
    data: {
      title: data.title,
      slug,
      description: data.description,
      content: data.content,
      categoryId: data.categoryId,
      authorId: session.user.id!,
      type: data.type,
      difficulty: data.difficulty,
      tags: data.tags,
      coverImage: data.coverImage || null,
      resourceUrl: data.resourceUrl || null,
      duration: data.duration ?? null,
      published: data.published,
      featured: data.featured,
      publishedAt: data.published ? new Date() : null,
    },
  })

  revalidatePath('/study')
  revalidatePath('/admin/study')
}

export async function updateStudyMaterial(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Must be logged in")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) {
    throw new Error("Insufficient permissions")
  }

  const id = formData.get('id') as string
  if (!id) throw new Error("Material ID is required")

  const raw = {
    title: (formData.get('title') as string)?.trim(),
    description: (formData.get('description') as string)?.trim(),
    content: formData.get('content') as string,
    categoryId: formData.get('categoryId') as string,
    type: (formData.get('type') as string) || 'ARTICLE',
    difficulty: (formData.get('difficulty') as string) || 'BEGINNER',
    tags: ((formData.get('tags') as string) || '').split(',').map((t) => t.trim()).filter(Boolean),
    coverImage: (formData.get('coverImage') as string) || '',
    resourceUrl: (formData.get('resourceUrl') as string) || '',
    duration: formData.get('duration') ? Number(formData.get('duration')) : undefined,
    published: formData.get('published') === 'true',
    featured: formData.get('featured') === 'true',
  }

  const parsed = materialSchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? 'Invalid input')
  }

  const data = parsed.data
  const existing = await prisma.studyMaterial.findUnique({ where: { id } })
  if (!existing) throw new Error("Material not found")

  const wasPublished = existing.published
  const nowPublished = data.published

  await prisma.studyMaterial.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      content: data.content,
      categoryId: data.categoryId,
      type: data.type,
      difficulty: data.difficulty,
      tags: data.tags,
      coverImage: data.coverImage || null,
      resourceUrl: data.resourceUrl || null,
      duration: data.duration ?? null,
      published: data.published,
      featured: data.featured,
      publishedAt: !wasPublished && nowPublished ? new Date() : existing.publishedAt,
    },
  })

  revalidatePath('/study')
  revalidatePath('/admin/study')
  revalidatePath(`/study/${existing.slug}`)
}

export async function deleteStudyMaterial(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Must be logged in")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) {
    throw new Error("Insufficient permissions")
  }

  const id = formData.get('id') as string
  if (!id) throw new Error("Material ID is required")

  await prisma.studyMaterial.delete({ where: { id } })

  revalidatePath('/study')
  revalidatePath('/admin/study')
}

// ─── Category Actions ──────────────────────────────────────────────────────────

export async function createStudyCategory(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Must be logged in")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) {
    throw new Error("Insufficient permissions")
  }

  const raw = {
    name: (formData.get('name') as string)?.trim(),
    description: (formData.get('description') as string) || '',
    icon: (formData.get('icon') as string) || '',
    color: (formData.get('color') as string) || '',
    order: formData.get('order') ? Number(formData.get('order')) : 0,
  }

  const parsed = categorySchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? 'Invalid input')
  }

  const data = parsed.data
  const slug = `${slugify(data.name)}-${Date.now().toString(36)}`

  await prisma.studyCategory.create({
    data: {
      name: data.name,
      slug,
      description: data.description || null,
      icon: data.icon || null,
      color: data.color || null,
      order: data.order,
    },
  })

  revalidatePath('/study')
  revalidatePath('/admin/study')
  revalidatePath('/admin/study/categories')
}

export async function updateStudyCategory(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Must be logged in")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) {
    throw new Error("Insufficient permissions")
  }

  const id = formData.get('id') as string
  if (!id) throw new Error("Category ID is required")

  const raw = {
    name: (formData.get('name') as string)?.trim(),
    description: (formData.get('description') as string) || '',
    icon: (formData.get('icon') as string) || '',
    color: (formData.get('color') as string) || '',
    order: formData.get('order') ? Number(formData.get('order')) : 0,
  }

  const parsed = categorySchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? 'Invalid input')
  }

  const data = parsed.data

  await prisma.studyCategory.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description || null,
      icon: data.icon || null,
      color: data.color || null,
      order: data.order,
    },
  })

  revalidatePath('/study')
  revalidatePath('/admin/study')
  revalidatePath('/admin/study/categories')
}

export async function deleteStudyCategory(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Must be logged in")
  if (!["ADMIN", "ANALYST"].includes(session.user.role as string)) {
    throw new Error("Insufficient permissions")
  }

  const id = formData.get('id') as string
  if (!id) throw new Error("Category ID is required")

  // Check if category has materials
  const count = await prisma.studyMaterial.count({ where: { categoryId: id } })
  if (count > 0) {
    throw new Error(`Cannot delete category with ${count} materials. Move or delete them first.`)
  }

  await prisma.studyCategory.delete({ where: { id } })

  revalidatePath('/study')
  revalidatePath('/admin/study')
  revalidatePath('/admin/study/categories')
}
