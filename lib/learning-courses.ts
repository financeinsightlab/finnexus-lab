import { getCourse as getPgdmCourse } from '@/lib/pgdm/learning-adapter';
import {
  getStructuredLearningCourseDefinition,
  isStructuredLearningCourse,
} from '@/lib/learning-course-catalog';
import { prisma } from '@/lib/prisma';
import type { CourseDefinition } from '@/lib/learning-progress';

/** Resolve PGDM subjects, the 69 static Skill Academy / Analyst courses, or a
 * published Study CMS course. Static curricula are authoritative; PGDM and CMS
 * courses can still append separately managed lesson rows. */
export async function resolveLearningCourse(courseSlug: string): Promise<CourseDefinition | undefined> {
  const pgdm = getPgdmCourse(courseSlug);
  const structured = !pgdm && isStructuredLearningCourse(courseSlug)
    ? getStructuredLearningCourseDefinition(courseSlug)
    : undefined;
  const material = pgdm || structured ? null : await prisma.studyMaterial.findFirst({
    where: { slug: courseSlug, type: 'COURSE', published: true },
    select: { slug: true, title: true, tags: true, category: { select: { slug: true } } },
  });
  if (!pgdm && !structured && !material) return undefined;

  const managedLessons = pgdm || material ? await prisma.courseLesson.findMany({
    where: { courseSlug, published: true },
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    select: { slug: true, title: true, durationMinutes: true },
  }) : [];

  const trackSlug = material?.category.slug ?? pgdm?.trackSlug ?? structured?.trackSlug;
  const tags = [...new Set([...(trackSlug ? [trackSlug] : []), ...(material?.tags ?? pgdm?.tags ?? structured?.tags ?? [])])];
  const cmsLessons = managedLessons
    .filter((lesson) => !pgdm?.lessons.some((existing) => existing.slug === lesson.slug))
    .map((lesson, index) => ({
      slug: lesson.slug,
      title: lesson.title,
      minutes: lesson.durationMinutes ?? undefined,
      weight: Math.max(0, 10 - index),
      tags,
    }));

  if (structured) {
    return { ...structured, lessons: structured.lessons, tags };
  }
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

/** Link helper used by learner dashboards and private completion records. */
export function learningCourseHref(courseSlug: string) {
  if (getPgdmCourse(courseSlug)) return `/pgdm/${encodeURIComponent(courseSlug)}`;
  if (isStructuredLearningCourse(courseSlug)) return `/study/course/${encodeURIComponent(courseSlug)}`;
  return `/study/${encodeURIComponent(courseSlug)}`;
}
