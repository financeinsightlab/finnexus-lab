import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { computeCourseProgress, type LessonProgressState } from '@/lib/learning-progress';
import { getStructuredLearningCourse, getStructuredLearningCourseDefinition } from '@/lib/learning-course-catalog';
import CourseAssessmentPanel from '@/components/learning/CourseAssessmentPanel';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';
import { BookOpen, Clock3, ExternalLink, LockKeyhole, Trophy } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = { params: Promise<{ courseSlug: string }> };

function coursePresentation(course: NonNullable<ReturnType<typeof getStructuredLearningCourse>>) {
  const analyst = 'level' in course;
  return {
    section: analyst ? 'Analyst Complete' : 'Skill Academy',
    category: analyst ? 'Analyst Complete' : course.category,
    level: analyst ? course.level : undefined,
    estimatedMinutes: course.lessons.reduce((total, lesson) => total + (lesson.minutes ?? 0), 0),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getStructuredLearningCourse(courseSlug);
  if (!course) return { title: 'Course not found | Kunwar Analytics', robots: { index: false, follow: true } };
  const presentation = coursePresentation(course);
  return {
    title: `${course.title} | ${presentation.section} | Kunwar Analytics`,
    description: course.description,
    alternates: { canonical: `https://kunwaranalytics.in/study/course/${course.slug}` },
    openGraph: { title: course.title, description: course.description, url: `https://kunwaranalytics.in/study/course/${course.slug}`, type: 'article' },
  };
}

export default async function StructuredCoursePage({ params }: Props) {
  const { courseSlug } = await params;
  const course = getStructuredLearningCourse(courseSlug);
  if (!course) notFound();
  const definition = getStructuredLearningCourseDefinition(courseSlug);
  if (!definition) notFound();
  const presentation = coursePresentation(course);

  const session = await auth().catch(() => null);
  const userId = session?.user?.id;
  let progress: ReturnType<typeof computeCourseProgress> | null = null;
  let completedSlugs = new Set<string>();
  let certificate: { certificateId: string; status: string } | null = null;

  if (userId) {
    const [rows, activeCertificate] = await Promise.all([
      prisma.lessonProgress.findMany({
        where: { userId: userId as string, courseSlug, lessonSlug: { in: course.lessons.map((lesson) => lesson.slug) } },
        select: { lessonSlug: true, completed: true, secondsSpent: true, completedAt: true },
      }).catch(() => []),
      prisma.courseCertificate.findFirst({
        where: { userId: userId as string, courseSlug, status: 'ACTIVE' },
        select: { certificateId: true, status: true },
      }).catch(() => null),
    ]);
    const states: LessonProgressState[] = rows.map((row) => ({
      lessonSlug: row.lessonSlug,
      completed: row.completed,
      secondsSpent: row.secondsSpent,
      completedAt: row.completedAt?.toISOString() ?? null,
    }));
    progress = computeCourseProgress(definition, states);
    completedSlugs = new Set(states.filter((state) => state.completed).map((state) => state.lessonSlug));
    certificate = activeCertificate;
  }

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Study Material', url: 'https://kunwaranalytics.in/study' },
    { name: 'Skill Academy & Analyst Levels', url: 'https://kunwaranalytics.in/study/course' },
    { name: course.title, url: `https://kunwaranalytics.in/study/course/${course.slug}` },
  ]);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: { '@type': 'Organization', name: 'Kunwar Analytics', url: 'https://kunwaranalytics.in' },
    numberOfCredits: course.lessons.length,
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: `PT${presentation.estimatedMinutes}M` },
  };
  const resources = 'resources' in course ? course.resources : [];

  return (
    <div className="min-h-screen bg-gray-50 text-foreground dark:bg-[#0B0D13]">
      <JsonLd data={[jsonLd, breadcrumbs]} />
      <header className="relative overflow-hidden border-b border-white/5 bg-brand-navy py-12 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <Link href="/study" className="hover:text-teal-300">Study Material</Link><span>/</span>
            <Link href="/study/course" className="hover:text-teal-300">Skill Academy &amp; Analyst Levels</Link><span>/</span>
            <span aria-current="page" className="text-white">{course.title}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl" aria-hidden="true">{course.icon}</span>
            <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-200">{presentation.section}</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">{presentation.category}</span>
            {presentation.level !== undefined && <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">Level {presentation.level} of 14</span>}
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">{course.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-7 text-slate-300">{course.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4 text-teal-300" />{course.lessons.length} lessons</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-teal-300" />About {Math.ceil(presentation.estimatedMinutes / 60)} hours</span>
            <span className="inline-flex items-center gap-2"><Trophy className="h-4 w-4 text-teal-300" />Course-specific final test</span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#course-lessons" className="inline-flex min-h-11 items-center rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-400">Start this course</a>
            <a href="#final-test" className="inline-flex min-h-11 items-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5">Final test &amp; certificate</a>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-8">
          <section id="course-lessons" className="scroll-mt-24 rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-7" aria-labelledby="course-lessons-heading">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">{presentation.section} curriculum</p>
                <h2 id="course-lessons-heading" className="mt-2 text-2xl font-extrabold text-foreground">Lessons in this course</h2>
              </div>
              <span className="text-sm text-muted-foreground">{course.lessons.length} lessons · tracked separately</span>
            </div>
            {progress && (
              <div className="mt-5 rounded-xl bg-muted/70 p-4" aria-live="polite">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <p className="font-semibold text-foreground">Your progress</p>
                  <p className="font-bold text-primary">{progress.completedLessons} of {progress.totalLessons} · {progress.percent}%</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-background">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress.percent}%` }} />
                </div>
              </div>
            )}
            <ol className="mt-5 space-y-3">
              {course.lessons.map((lesson, index) => {
                const completed = completedSlugs.has(lesson.slug);
                return (
                  <li key={lesson.slug}>
                    <Link href={`/study/course/${course.slug}/${lesson.slug}`} className="group flex min-h-20 items-start gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/50 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${completed ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-primary/10 text-primary'}`} aria-label={completed ? 'Completed' : `Lesson ${index + 1}`}>
                        {completed ? '✓' : index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2 font-semibold text-foreground group-hover:text-primary">{lesson.title}{completed && <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300">Complete</span>}</span>
                        <span className="mt-1 block line-clamp-2 text-sm leading-5 text-muted-foreground">{lesson.summary}</span>
                        <span className="mt-2 block text-xs text-muted-foreground">About {lesson.minutes ?? 20} minutes</span>
                      </span>
                      <span className="shrink-0 pt-1 text-xs font-semibold text-primary">Open →</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>

          {resources.length > 0 && (
            <section className="rounded-2xl border border-border bg-card p-5 text-card-foreground sm:p-7" aria-labelledby="course-resources-heading">
              <h2 id="course-resources-heading" className="text-xl font-bold text-foreground">Supplementary resources</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Reference materials are available as optional extras and do not count as required lessons.</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {resources.map((resource) => (
                  <li key={resource.href}>
                    <Link href={resource.href} className="flex h-full items-start gap-3 rounded-xl border border-border bg-background p-4 hover:border-primary/40">
                      <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span><span className="block font-semibold text-foreground">{resource.title}</span><span className="mt-1 block text-sm text-muted-foreground">{resource.description}</span></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <CourseAssessmentPanel courseSlug={course.slug} returnTo={`/study/course/${course.slug}`} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <section className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Course progress</h2>
            {progress ? (
              <>
                <p className="mt-3 text-3xl font-extrabold text-primary">{progress.percent}%</p>
                <p className="mt-1 text-sm text-muted-foreground">{progress.completedLessons} / {progress.totalLessons} lessons completed</p>
                {progress.isComplete && <p className="mt-3 rounded-lg bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-800 dark:text-emerald-200">All course lessons complete. Pass the final test to earn your certificate.</p>}
              </>
            ) : (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Sign in to save this course’s progress independently and continue on another device.</p>
            )}
            {certificate && <Link href={`/certificates/course/${encodeURIComponent(course.slug)}`} className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">View your course certificate</Link>}
          </section>
          <section className="rounded-2xl border border-border bg-card p-5 text-card-foreground">
            <div className="flex items-center gap-2 text-primary"><LockKeyhole className="h-4 w-4" /><h2 className="text-sm font-bold text-foreground">Your work stays yours</h2></div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Lesson records, assessment attempts, and completion certificates are private to your signed-in account.</p>
          </section>
          <Link href="/study/course" className="block rounded-xl border border-border bg-background p-4 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary">← Browse all Skill Academy &amp; Analyst courses</Link>
        </aside>
      </main>
    </div>
  );
}
