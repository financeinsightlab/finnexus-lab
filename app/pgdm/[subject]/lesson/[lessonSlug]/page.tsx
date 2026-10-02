import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';
import ContentFaq from '@/components/content/ContentFaq';
import { scrollableTableComponents } from '@/components/content/scrollableTableComponents';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import { ContentPage } from '@/components/content/ContentLayout';
import LessonCompletionControl from '@/components/learning/LessonCompletionControl';
import { getSubject } from '@/lib/pgdm/curriculum';
import { prisma } from '@/lib/prisma';

interface Props { params: Promise<{ subject: string; lessonSlug: string }> }

async function getPublishedLesson(courseSlug: string, lessonSlug: string) {
  return prisma.courseLesson.findFirst({ where: { courseSlug, slug: lessonSlug, published: true } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, lessonSlug } = await params;
  const lesson = await getPublishedLesson(subject, lessonSlug).catch(() => null);
  if (!lesson) return { title: 'Course lesson not found | Kunwar Analytics', robots: { index: false, follow: true } };
  const url = `https://kunwaranalytics.in/pgdm/${subject}/lesson/${lessonSlug}`;
  return {
    title: `${lesson.title} | PGDM Course Lesson | Kunwar Analytics`,
    description: (lesson.summary || lesson.title).slice(0, 158),
    alternates: { canonical: url },
    openGraph: { title: lesson.title, description: lesson.summary || lesson.title, url, type: 'article' },
  };
}

export default async function PgdmCmsLessonPage({ params }: Props) {
  const { subject: courseSlug, lessonSlug } = await params;
  const subject = getSubject(courseSlug);
  if (!subject) notFound();
  const lesson = await getPublishedLesson(courseSlug, lessonSlug).catch(() => null);
  if (!lesson) notFound();
  const url = `https://kunwaranalytics.in/pgdm/${courseSlug}/lesson/${lessonSlug}`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: lesson.title,
      description: lesson.summary || lesson.title,
      url,
      learningResourceType: 'Lesson',
      isPartOf: { '@type': 'Course', name: `${subject.code} — ${subject.name}`, url: `https://kunwaranalytics.in/pgdm/${courseSlug}` },
      provider: { '@type': 'Organization', name: 'Kunwar Analytics' },
    },
    breadcrumbSchema([
      { name: 'Home', url: 'https://kunwaranalytics.in' },
      { name: 'PGDM', url: 'https://kunwaranalytics.in/pgdm' },
      { name: subject.name, url: `https://kunwaranalytics.in/pgdm/${courseSlug}` },
      { name: lesson.title, url },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={structuredData} />
      <header className="border-b border-border bg-card">
        <ContentPage className="py-10">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted-foreground">
            <Link href="/pgdm" className="hover:text-primary">PGDM</Link><span className="px-2">/</span><Link href={`/pgdm/${courseSlug}`} className="hover:text-primary">{subject.name}</Link><span className="px-2">/</span><span aria-current="page" className="text-foreground">{lesson.title}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">{subject.code} · CMS lesson</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{lesson.title}</h1>
          {lesson.summary && <p className="mt-4 max-w-[72ch] text-lg leading-7 text-muted-foreground">{lesson.summary}</p>}
          {lesson.durationMinutes && <p className="mt-3 text-sm text-muted-foreground">Estimated lesson time: {lesson.durationMinutes} minutes</p>}
        </ContentPage>
      </header>
      <ContentPage as="main" className="space-y-8 py-10">
        <article className="cms-content prose-content rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
          <MDXRemote source={lesson.content} components={scrollableTableComponents} />
        </article>
        <LessonCompletionControl courseSlug={courseSlug} lessonSlug={lessonSlug} returnTo={`/pgdm/${courseSlug}/lesson/${lessonSlug}`} />
        <div className="flex flex-wrap gap-3">
          <Link href={`/pgdm/${courseSlug}`} className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent">Back to {subject.code}</Link>
          <Link href={`/pgdm/${courseSlug}#final-test`} className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">Course final test</Link>
        </div>
      </ContentPage>
      <PromotionSlot placement="COURSE_PAGE" path={`/pgdm/${courseSlug}/lesson/${lessonSlug}`} contentType="COURSE" />
      <RelatedContentSection sourceType="COURSE" sourceSlug={courseSlug} />
      <ContentFaq relatedType="COURSE_LESSON" relatedSlug={`${courseSlug}/${lessonSlug}`} />
    </div>
  );
}
