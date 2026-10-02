import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getStructuredLearningCourse } from '@/lib/learning-course-catalog';
import { scrollableTableComponents } from '@/components/content/scrollableTableComponents';
import LessonCompletionControl from '@/components/learning/LessonCompletionControl';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = { params: Promise<{ courseSlug: string; lessonSlug: string }> };

function findLesson(courseSlug: string, lessonSlug: string) {
  const course = getStructuredLearningCourse(courseSlug);
  if (!course) return null;
  const lessonIndex = course.lessons.findIndex((item) => item.slug === lessonSlug);
  if (lessonIndex < 0) return null;
  return { course, lesson: course.lessons[lessonIndex], lessonIndex };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const found = findLesson(courseSlug, lessonSlug);
  if (!found) return { title: 'Course lesson not found | Kunwar Analytics', robots: { index: false, follow: true } };
  const url = `https://kunwaranalytics.in/study/course/${courseSlug}/${lessonSlug}`;
  return {
    title: `${found.lesson.title} | ${found.course.title} | Kunwar Analytics`,
    description: found.lesson.summary.slice(0, 158),
    alternates: { canonical: url },
    openGraph: { title: found.lesson.title, description: found.lesson.summary, url, type: 'article' },
  };
}

export default async function StructuredCourseLessonPage({ params }: Props) {
  const { courseSlug, lessonSlug } = await params;
  const found = findLesson(courseSlug, lessonSlug);
  if (!found) notFound();
  const { course, lesson, lessonIndex } = found;
  const previous = course.lessons[lessonIndex - 1];
  const next = course.lessons[lessonIndex + 1];
  const url = `https://kunwaranalytics.in/study/course/${courseSlug}/${lessonSlug}`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: lesson.title,
      description: lesson.summary,
      url,
      learningResourceType: 'Lesson',
      isPartOf: { '@type': 'Course', name: course.title, url: `https://kunwaranalytics.in/study/course/${course.slug}` },
      provider: { '@type': 'Organization', name: 'Kunwar Analytics' },
    },
    breadcrumbSchema([
      { name: 'Home', url: 'https://kunwaranalytics.in' },
      { name: 'Study', url: 'https://kunwaranalytics.in/study' },
      { name: course.title, url: `https://kunwaranalytics.in/study/course/${course.slug}` },
      { name: lesson.title, url },
    ]),
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-foreground dark:bg-[#0B0D13]">
      <JsonLd data={structuredData} />
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-9 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/study" className="hover:text-primary">Study</Link><span>/</span>
            <Link href="/study/course" className="hover:text-primary">Courses</Link><span>/</span>
            <Link href={`/study/course/${course.slug}`} className="hover:text-primary">{course.title}</Link><span>/</span>
            <span aria-current="page" className="text-foreground">{lesson.title}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">{course.icon} {course.title} · Lesson {lessonIndex + 1} of {course.lessons.length}</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{lesson.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-7 text-muted-foreground">{lesson.summary}</p>
          <p className="mt-3 text-sm text-muted-foreground">Estimated lesson time: {lesson.minutes ?? 20} minutes</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 px-4 py-9 sm:px-6 lg:px-8">
        <article className="prose prose-lg max-w-none rounded-2xl border border-border bg-card p-5 text-foreground shadow-sm dark:prose-invert sm:p-8">
          <MDXRemote source={lesson.content} components={scrollableTableComponents} />
        </article>
        <LessonCompletionControl courseSlug={course.slug} lessonSlug={lesson.slug} returnTo={`/study/course/${course.slug}/${lesson.slug}`} />
        <nav aria-label="Course lesson navigation" className="grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link href={`/study/course/${course.slug}/${previous.slug}`} className="flex min-h-16 items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary">
              <ArrowLeft className="h-4 w-4 shrink-0" /><span><span className="block text-xs font-normal text-muted-foreground">Previous lesson</span>{previous.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/study/course/${course.slug}/${next.slug}`} className="flex min-h-16 items-center justify-end gap-3 rounded-xl border border-border bg-card p-4 text-right text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary">
              <span><span className="block text-xs font-normal text-muted-foreground">Next lesson</span>{next.title}</span><ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : (
            <Link href={`/study/course/${course.slug}#final-test`} className="flex min-h-16 items-center justify-end gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4 text-right text-sm font-semibold text-primary hover:bg-primary/10">
              <span><span className="block text-xs font-normal text-muted-foreground">Up next</span>Course final test</span><ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          )}
        </nav>
        <div className="flex flex-wrap gap-3">
          <Link href={`/study/course/${course.slug}`} className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent">Back to course overview</Link>
          <Link href="/study/course" className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent">Browse all courses</Link>
        </div>
      </main>
    </div>
  );
}
