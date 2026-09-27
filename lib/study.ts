// lib/study.ts — Study Material data access layer

import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

// ─── Types ────────────────────────────────────────────────────────────────────

export type StudyMaterialWithCategory = Awaited<ReturnType<typeof getPublishedStudyMaterials>>[number];
export type StudyMaterialWithDetails = Awaited<ReturnType<typeof getStudyMaterialBySlug>>;
export type StudyCategoryWithCount = Awaited<ReturnType<typeof getStudyCategories>>[number];

// ─── Client-safe serialized shapes ─────────────────────────────────────────────
// Prisma returns `Date` objects; client components need serializable strings.
// These explicit types replace the previous `as any` pass-through in the page.

export type SerializedStudyMaterial = Omit<
  StudyMaterialWithCategory,
  'publishedAt' | 'createdAt' | 'updatedAt'
> & {
  publishedAt: string | null;
};

export type SerializedStudyCategory = StudyCategoryWithCount;

export function serializeStudyMaterial(material: StudyMaterialWithCategory): SerializedStudyMaterial {
  const { createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = material;
  return {
    ...rest,
    publishedAt: material.publishedAt ? material.publishedAt.toISOString() : null,
  };
}

export function serializeStudyCategory(category: StudyCategoryWithCount): SerializedStudyCategory {
  return category;
}

// ─── Read: Public ──────────────────────────────────────────────────────────────

export async function getStudyCategories() {
  return prisma.studyCategory.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: {
          materials: {
            where: { published: true },
          },
        },
      },
    },
  });
}

export async function getPublishedStudyMaterials(options?: {
  categoryId?: string;
  type?: string;
  difficulty?: string;
  search?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'newest' | 'popular' | 'featured';
}) {
  const {
    categoryId,
    type,
    difficulty,
    search,
    limit = 24,
    offset = 0,
    orderBy = 'newest',
  } = options || {};

  const where = {
    published: true,
    ...(categoryId ? { categoryId } : {}),
    ...(type ? { type } : {}),
    ...(difficulty ? { difficulty } : {}),
    ...(search
      ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
          { tags: { has: search } },
        ],
      }
      : {}),
  };

  const order: Prisma.StudyMaterialOrderByWithRelationInput | Prisma.StudyMaterialOrderByWithRelationInput[] =
    orderBy === 'popular'
      ? { viewCount: 'desc' }
      : orderBy === 'featured'
        ? [{ featured: 'desc' }, { publishedAt: 'desc' }]
        : { publishedAt: 'desc' };

  return prisma.studyMaterial.findMany({
    where,
    orderBy: order,
    take: limit,
    skip: offset,
    include: {
      category: { select: { id: true, name: true, slug: true, icon: true, color: true } },
      author: { select: { id: true, name: true } },
    },
  });
}

export async function getStudyMaterialBySlug(slug: string) {
  return prisma.studyMaterial.findUnique({
    where: { slug },
    include: {
      category: { select: { id: true, name: true, slug: true, icon: true, color: true } },
      author: { select: { id: true, name: true } },
    },
  });
}

export async function getFeaturedStudyMaterials(limit = 6) {
  return prisma.studyMaterial.findMany({
    where: { published: true, featured: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
    include: {
      category: { select: { id: true, name: true, slug: true, icon: true, color: true } },
      author: { select: { id: true, name: true } },
    },
  });
}

export async function getRelatedStudyMaterials(currentSlug: string, categoryId: string, limit = 4) {
  return prisma.studyMaterial.findMany({
    where: {
      published: true,
      categoryId,
      slug: { not: currentSlug },
    },
    orderBy: { publishedAt: 'desc' },
    take: limit,
    include: {
      category: { select: { id: true, name: true, slug: true, icon: true, color: true } },
      author: { select: { id: true, name: true } },
    },
  });
}

export async function incrementStudyMaterialView(id: string) {
  await prisma.studyMaterial.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });
}

// ─── Read: Admin ────────────────────────────────────────────────────────────────

export async function getAllStudyMaterials(options?: {
  categoryId?: string;
  type?: string;
  published?: boolean;
  search?: string;
}) {
  const { categoryId, type, published, search } = options || {};

  return prisma.studyMaterial.findMany({
    where: {
      ...(categoryId ? { categoryId } : {}),
      ...(type ? { type } : {}),
      ...(published !== undefined ? { published } : {}),
      ...(search
        ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      author: { select: { id: true, name: true } },
    },
  });
}

export async function getStudyMaterialById(id: string) {
  return prisma.studyMaterial.findUnique({
    where: { id },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      author: { select: { id: true, name: true } },
    },
  });
}

export async function getAllStudyCategoriesAdmin() {
  return prisma.studyCategory.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: { select: { materials: true } },
    },
  });
}
