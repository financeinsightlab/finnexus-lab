import { getCourse as getPgdmCourse } from '@/lib/pgdm/learning-adapter';
import { prisma } from '@/lib/prisma';
import type { CourseDefinition } from '@/lib/learning-progress';

/** Resolve an existing PGDM course or published Study CMS course. Published
 * CMS lesson rows override the static lesson list for the same preserved slug. */
export async function resolveLearningCourse(courseSlug: string): Promise<CourseDefinition | undefined> {
  const pgdm = getPgdmCourse(courseSlug);
  const material = pgdm ? null : await prisma.studyMaterial.findFirst({
    where: { slug: courseSlug, type: 'COURSE', published: true },
    select: { slug: true, title: true, tags: true, category: { select: { slug: true } } },
  });
  if (!pgdm && !material) return undefined;

  const managedLessons = await prisma.courseLesson.findMany({
    where: { courseSlug, published: true },
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    select: { slug: true, title: true, durationMinutes: true },
  });

  const trackSlug = material?.category.slug ?? pgdm?.trackSlug;
  const tags = [...new Set([...(trackSlug ? [trackSlug] : []), ...(material?.tags ?? pgdm?.tags ?? [])])];
  const cmsLessons = managedLessons
    .filter((lesson) => !pgdm?.lessons.some((existing) => existing.slug === lesson.slug))
    .map((lesson, index) => ({
      slug: lesson.slug,
      title: lesson.title,
      minutes: lesson.durationMinutes ?? undefined,
      weight: Math.max(0, 10 - index),
      tags,
    }));
  if (pgdm) {
    return { ...pgdm, lessons: [...pgdm.lessons, ...cmsLessons], tags };
  }
  return {
    slug: courseSlug,
    title: material!.title,
    trackSlug,
    tags,
    lessons: managedLessons.map((lesson, index) => ({
      slug: lesson.slug,
      title: lesson.title,
      minutes: lesson.durationMinutes ?? undefined,
      weight: Math.max(0, 10 - index),
      tags,
    })),
  };
}
