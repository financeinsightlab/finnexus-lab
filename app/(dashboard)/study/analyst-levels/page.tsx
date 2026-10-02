import type { Metadata } from 'next';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';
import StructuredCourseCatalog from '@/components/learning/StructuredCourseCatalog';
import { getAnalystCompleteLearningCatalog } from '@/lib/learning-course-catalog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Analyst Complete Course — Levels 0–14 | Kunwar Analytics',
  description: 'Choose from 15 individual Analyst Complete levels. Each level has its own lesson list, progress tracking, final assessment, and certificate.',
  alternates: { canonical: 'https://kunwaranalytics.in/study/analyst-levels' },
};

export default function AnalystLevelsPage() {
  const courses = getAnalystCompleteLearningCatalog();
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Study Material', url: 'https://kunwaranalytics.in/study' },
    { name: 'Analyst Complete Course', url: 'https://kunwaranalytics.in/study/analyst-complete' },
    { name: 'Levels 0–14', url: 'https://kunwaranalytics.in/study/analyst-levels' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <StructuredCourseCatalog
        courses={courses}
        eyebrow="Analyst Complete Course · Levels 0–14"
        title="Choose an Analyst Level"
        description="The Analyst Complete path remains available as one interactive program, and its 15 levels are also selectable as independent courses here. Every level has its own lessons, saved progress, final test, and course certificate."
        summary={[
          { value: String(courses.length), label: 'Independent Analyst levels' },
          { value: '0–14', label: 'Full learning path' },
        ]}
        links={[
          { href: '/study/analyst-complete', label: 'Analyst Complete program overview' },
          { href: '/study/analyst-course', label: 'Open the full interactive course' },
        ]}
      />
    </>
  );
}
