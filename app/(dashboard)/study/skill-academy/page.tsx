import type { Metadata } from 'next';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';
import StructuredCourseCatalog from '@/components/learning/StructuredCourseCatalog';
import { getSkillAcademyLearningCatalog } from '@/lib/learning-course-catalog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Skill Academy — Zero to Expert | Kunwar Analytics',
  description: 'Explore 54 separately selectable Skill Academy tracks with 383 lessons, individual progress, final assessments, and course certificates.',
  alternates: { canonical: 'https://kunwaranalytics.in/study/skill-academy' },
};

export default function SkillAcademyPage() {
  const courses = getSkillAcademyLearningCatalog();
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Study Material', url: 'https://kunwaranalytics.in/study' },
    { name: 'Skill Academy — Zero → Expert', url: 'https://kunwaranalytics.in/study/skill-academy' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <StructuredCourseCatalog
        courses={courses}
        eyebrow="Skill Academy · Zero → Expert"
        title="Skill Academy — Zero → Expert"
        description="Choose from 54 focused courses across analytics, English, aptitude, finance, and accounting. Each track keeps its existing lessons and has independent progress, a final test, and its own completion certificate."
        summary={[
          { value: String(courses.length), label: 'Individual Skill Academy tracks' },
          { value: '383', label: 'Existing lessons' },
        ]}
        links={[
          { href: '/study/course', label: 'View the full 69-course directory' },
          { href: '/study', label: 'Back to the three Study programs' },
        ]}
      />
    </>
  );
}
