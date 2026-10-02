import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function CourseLessonsList({ courseSlug, courseType = 'PGDM' }: { courseSlug: string; courseType?: 'PGDM' | 'STUDY' }) {
  const lessons = await prisma.courseLesson.findMany({
    where: { courseSlug, published: true },
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    select: { slug: true, title: true, durationMinutes: true },
  }).catch(() => []);
  if (lessons.length === 0) return null;
  const hrefFor = (lessonSlug: string) => courseType === 'PGDM'
    ? `/pgdm/${encodeURIComponent(courseSlug)}/lesson/${encodeURIComponent(lessonSlug)}`
    : `/study/${encodeURIComponent(courseSlug)}/lessons/${encodeURIComponent(lessonSlug)}`;
  return (
    <section className="rounded-2xl border border-border bg-card p-6 text-card-foreground" aria-labelledby="course-lessons-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Course lessons</p>
          <h2 id="course-lessons-heading" className="mt-2 text-2xl font-bold text-foreground">Your learning path</h2>
        </div>
        <span className="text-sm text-muted-foreground">{lessons.length} published lessons</span>
      </div>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2">
        {lessons.map((lesson, index) => (
          <li key={lesson.slug}>
            <Link href={hrefFor(lesson.slug)} className="flex min-h-16 items-start gap-3 rounded-xl border border-border bg-background p-4 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
              <span className="min-w-0">
                <span className="block font-semibold text-foreground">{lesson.title}</span>
                {lesson.durationMinutes && <span className="mt-1 block text-xs text-muted-foreground">About {lesson.durationMinutes} minutes</span>}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
