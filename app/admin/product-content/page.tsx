import { prisma } from '@/lib/prisma';
import { SUBJECTS } from '@/lib/pgdm/curriculum';
import ProductContentAdminClient, { type AdminCourseOption } from './ProductContentAdminClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductContentAdminPage() {
  let studyCourses: { slug: string; title: string; published: boolean }[] = [];
  try {
    studyCourses = await prisma.studyMaterial.findMany({
      where: { type: 'COURSE' },
      orderBy: [{ title: 'asc' }],
      select: { slug: true, title: true, published: true },
    });
  } catch {
    // Static PGDM courses remain editable if the CMS database is unavailable.
  }

  const pgdmCourses: AdminCourseOption[] = SUBJECTS.map((subject) => ({
    slug: subject.slug,
    title: `${subject.code} — ${subject.name}`,
    kind: 'PGDM',
    published: true,
  }));
  const pgdmSlugs = new Set(pgdmCourses.map((course) => course.slug));
  const courses = [
    ...pgdmCourses,
    ...studyCourses.filter((course) => !pgdmSlugs.has(course.slug)).map((course) => ({
      ...course,
      kind: 'STUDY' as const,
    })),
  ];

  return <ProductContentAdminClient courses={courses} />;
}
