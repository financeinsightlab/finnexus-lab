import {
  getSkillAcademyCourseCatalog,
  getSkillAcademyCourse,
  getSkillAcademyCourseDefinition,
  isSkillAcademyCourseSlug,
  type SkillAcademyCategory,
} from '@/lib/skill-academy-catalog';
import {
  getAnalystLevelCourseCatalog,
  getAnalystLevelCourse,
  getAnalystLevelCourseDefinition,
  isAnalystLevelCourseSlug,
} from '@/lib/analyst-level-catalog';
import type { CourseDefinition } from '@/lib/learning-progress';

export interface LearningCatalogItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryOrder: number;
  icon: string;
  lessonCount: number;
  estimatedMinutes: number;
  href: string;
  source: 'SKILL_ACADEMY' | 'ANALYST_COMPLETE';
  section: 'Skill Academy' | 'Analyst Complete';
  level?: number;
}

const SKILL_CATEGORY_ORDER: SkillAcademyCategory[] = [
  'Business Analytics',
  'English',
  'Aptitude',
  'Finance Core',
  'Accounting & Reporting',
];

export function getLearningCatalog(): LearningCatalogItem[] {
  const skillAcademy = getSkillAcademyCourseCatalog().map((course) => ({
    ...course,
    categoryOrder: SKILL_CATEGORY_ORDER.indexOf(course.category),
    section: 'Skill Academy' as const,
  }));
  const analystLevels = getAnalystLevelCourseCatalog().map((course) => ({
    ...course,
    category: 'Analyst Complete',
    categoryOrder: 5,
    section: 'Analyst Complete' as const,
  }));
  return [...skillAcademy, ...analystLevels];
}

/** Distinct, independently navigable cluster catalogs for the Study Hub. */
export function getSkillAcademyLearningCatalog(): LearningCatalogItem[] {
  return getLearningCatalog().filter((course) => course.source === 'SKILL_ACADEMY');
}

export function getAnalystCompleteLearningCatalog(): LearningCatalogItem[] {
  return getLearningCatalog().filter((course) => course.source === 'ANALYST_COMPLETE');
}

export function getStructuredLearningCourse(courseSlug: string) {
  if (isSkillAcademyCourseSlug(courseSlug)) return getSkillAcademyCourse(courseSlug);
  if (isAnalystLevelCourseSlug(courseSlug)) return getAnalystLevelCourse(courseSlug);
  return undefined;
}

export function getStructuredLearningCourseDefinition(courseSlug: string): CourseDefinition | undefined {
  if (isSkillAcademyCourseSlug(courseSlug)) return getSkillAcademyCourseDefinition(courseSlug);
  if (isAnalystLevelCourseSlug(courseSlug)) return getAnalystLevelCourseDefinition(courseSlug);
  return undefined;
}

export function isStructuredLearningCourse(courseSlug: string) {
  return isSkillAcademyCourseSlug(courseSlug) || isAnalystLevelCourseSlug(courseSlug);
}
