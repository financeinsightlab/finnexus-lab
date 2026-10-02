import type { Metadata } from 'next';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';
import StructuredCourseCatalog from '@/components/learning/StructuredCourseCatalog';
import { getLearningCatalog } from '@/lib/learning-course-catalog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Skill Academy & Analyst Levels | Kunwar Analytics',
  description: 'Browse all 54 individual Skill Academy tracks and 15 Analyst Levels, each with its own lessons, progress tracking, final assessment, and private certificate.',
  alternates: { canonical: 'https://kunwaranalytics.in/study/course' },
};

export default function StructuredCoursesPage() {
  const courses = getLearningCatalog();
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Study Material', url: 'https://kunwaranalytics.in/study' },
    { name: 'All individual courses', url: 'https://kunwaranalytics.in/study/course' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <StructuredCourseCatalog
        courses={courses}
        eyebrow="All 69 individually selectable courses"
        title="Skill Academy & Analyst Levels"
        description="Browse the full directory of 54 Skill Academy tracks and 15 Analyst Complete levels. Each course has its own lessons, progress, final assessment, and certificate; use the dedicated program pages to focus on one learning path. PGDM remains separate."
        summary={[
          { value: '54', label: 'Skill Academy tracks' },
          { value: '15', label: 'Analyst Levels · 0–14' },
        ]}
        links={[
          { href: '/study/skill-academy', label: 'Skill Academy — Zero → Expert' },
          { href: '/study/analyst-complete', label: 'Analyst Complete Course' },
        ]}
      />
    </>
  );
}
