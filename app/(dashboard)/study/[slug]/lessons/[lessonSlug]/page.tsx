import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';
import ContentFaq from '@/components/content/ContentFaq';
import { scrollableTableComponents } from '@/components/content/scrollableTableComponents';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import LessonCompletionControl from '@/components/learning/LessonCompletionControl';
import { getStudyMaterialBySlug } from '@/lib/study';
import { prisma } from '@/lib/prisma';

interface Props { params: Promise<{ slug: string; lessonSlug: string }> }

async function getPublishedLesson(courseSlug: string, lessonSlug: string) {
  return prisma.courseLesson.findFirst({ where: { courseSlug, slug: lessonSlug, published: true } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const lesson = await getPublishedLesson(slug, lessonSlug).catch(() => null);
  const course = await getStudyMaterialBySlug(slug).catch(() => null);
  if (!lesson || !course || !course.published || course.type !== 'COURSE') return { title: 'Course lesson not found | Kunwar Analytics', robots: { index: false, follow: true } };
  const url = `https://kunwaranalytics.in/study/${slug}/lessons/${lessonSlug}`;
  return { title: `${lesson.title} | ${course.title} | Kunwar Analytics`, description: (lesson.summary || course.description).slice(0, 158), alternates: { canonical: url }, openGraph: { title: lesson.title, description: lesson.summary || course.description, url, type: 'article' } };
}

export default async function StudyCmsLessonPage({ params }: Props) {
  const { slug: courseSlug, lessonSlug } = await params;
  const [course, lesson] = await Promise.all([
    getStudyMaterialBySlug(courseSlug).catch(() => null),
    getPublishedLesson(courseSlug, lessonSlug).catch(() => null),
  ]);
  if (!course || !course.published || course.type !== 'COURSE' || !lesson) notFound();
  const url = `https://kunwaranalytics.in/study/${courseSlug}/lessons/${lessonSlug}`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: lesson.title,
      description: lesson.summary || lesson.title,
      url,
      learningResourceType: 'Lesson',
      isPartOf: { '@type': 'Course', name: course.title, url: `https://kunwaranalytics.in/study/${courseSlug}` },
      provider: { '@type': 'Organization', name: 'Kunwar Analytics' },
    },
    breadcrumbSchema([
      { name: 'Home', url: 'https://kunwaranalytics.in' },
      { name: 'Study', url: 'https://kunwaranalytics.in/study' },
      { name: course.title, url: `https://kunwaranalytics.in/study/${courseSlug}` },
      { name: lesson.title, url },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={structuredData} />
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted-foreground">
            <Link href="/study" className="hover:text-primary">Study</Link><span className="px-2">/</span><Link href={`/study/${courseSlug}`} className="hover:text-primary">{course.title}</Link><span className="px-2">/</span><span aria-current="page" className="text-foreground">{lesson.title}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Course lesson · {course.category.name}</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{lesson.title}</h1>
          {lesson.summary && <p className="mt-4 max-w-3xl text-lg leading-7 text-muted-foreground">{lesson.summary}</p>}
          {lesson.durationMinutes && <p className="mt-3 text-sm text-muted-foreground">Estimated lesson time: {lesson.durationMinutes} minutes</p>}
        </div>
      </header>
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <article className="prose prose-lg max-w-none rounded-2xl border border-border bg-card p-5 text-foreground dark:prose-invert sm:p-8">
          <MDXRemote source={lesson.content} components={scrollableTableComponents} />
        </article>
        <LessonCompletionControl courseSlug={courseSlug} lessonSlug={lessonSlug} returnTo={`/study/${courseSlug}/lessons/${lessonSlug}`} />
        <div className="flex flex-wrap gap-3">
          <Link href={`/study/${courseSlug}`} className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent">Back to course</Link>
        </div>
      </main>
      <PromotionSlot placement="COURSE_PAGE" path={`/study/${courseSlug}/lessons/${lessonSlug}`} contentType="COURSE" />
      <RelatedContentSection sourceType="STUDY_COURSE" sourceSlug={courseSlug} />
      <ContentFaq relatedType="COURSE_LESSON" relatedSlug={`${courseSlug}/${lessonSlug}`} />
    </div>
  );
}
