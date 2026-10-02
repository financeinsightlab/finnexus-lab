import fs from 'node:fs';
import path from 'node:path';
import type { CourseDefinition, LessonDefinition } from '@/lib/learning-progress';
import { escapeMdxTextSyntax } from '@/lib/markdown-content';

const SOURCE_DIR = path.join(process.cwd(), 'PowerBI-Zero-to-Expert');

export type SkillAcademyCategory =
  | 'Business Analytics'
  | 'English'
  | 'Aptitude'
  | 'Finance Core'
  | 'Accounting & Reporting';

export interface SkillAcademyLesson extends LessonDefinition {
  summary: string;
  content: string;
  sourceFile: string;
}

export interface SkillAcademyResource {
  title: string;
  href: string;
  description: string;
}

export interface SkillAcademyCourse extends CourseDefinition {
  description: string;
  category: SkillAcademyCategory;
  icon: string;
  prefix: string;
  lessons: SkillAcademyLesson[];
  resources: SkillAcademyResource[];
}

export interface SkillAcademyCourseSummary {
  slug: string;
  title: string;
  description: string;
  category: SkillAcademyCategory;
  icon: string;
  lessonCount: number;
  estimatedMinutes: number;
  href: string;
  source: 'SKILL_ACADEMY';
}

interface CourseMeta {
  slug: string;
  title: string;
  category: SkillAcademyCategory;
  icon: string;
}

const COURSE_META: Record<string, CourseMeta> = {
  Module: { slug: 'academy-power-bi', title: 'Power BI — Zero to Expert', category: 'Business Analytics', icon: '⚡' },
  Excel: { slug: 'academy-excel', title: 'Excel for Analytics & Finance', category: 'Business Analytics', icon: '📗' },
  PQ: { slug: 'academy-power-query', title: 'Power Query', category: 'Business Analytics', icon: '🧹' },
  SQL: { slug: 'academy-sql', title: 'SQL for Analytics', category: 'Business Analytics', icon: '🗄️' },
  Tableau: { slug: 'academy-tableau', title: 'Tableau', category: 'Business Analytics', icon: '📊' },
  Python: { slug: 'academy-python-finance', title: 'Python for Finance', category: 'Business Analytics', icon: '🐍' },
  Stats: { slug: 'academy-statistics-finance', title: 'Statistics for Finance', category: 'Business Analytics', icon: '📐' },
  Viz: { slug: 'academy-data-visualization', title: 'Data Visualization', category: 'Business Analytics', icon: '🎨' },
  TS: { slug: 'academy-time-series', title: 'Time Series & Forecasting', category: 'Business Analytics', icon: '🔮' },

  English: { slug: 'academy-basic-english', title: 'Basic English', category: 'English', icon: '📕' },
  BNS: { slug: 'academy-business-news-speaking', title: 'Business News Speaking', category: 'English', icon: '🗞️' },
  BV: { slug: 'academy-business-vocabulary', title: 'Business Vocabulary', category: 'English', icon: '📖' },
  EW: { slug: 'academy-email-writing', title: 'Email Writing', category: 'English', icon: '✉️' },
  GR: { slug: 'academy-interview-grammar', title: 'Grammar for Interviews', category: 'English', icon: '📝' },
  RP: { slug: 'academy-english-reading', title: 'English Reading Practice', category: 'English', icon: '📚' },
  GD: { slug: 'academy-group-discussion', title: 'Group Discussion Skills', category: 'English', icon: '👥' },
  'IC:interview': { slug: 'academy-interview-communication', title: 'Interview Communication', category: 'English', icon: '🎤' },
  PR: { slug: 'academy-pronunciation', title: 'Pronunciation & Voice Recording', category: 'English', icon: '🎙️' },
  SI: { slug: 'academy-self-introduction', title: 'Self-Introduction Speaking', category: 'English', icon: '👋' },
  FL: { slug: 'academy-spoken-english-fluency', title: 'Spoken English Fluency', category: 'English', icon: '🗣️' },

  AVG: { slug: 'academy-averages', title: 'Averages', category: 'Aptitude', icon: '🧮' },
  BR: { slug: 'academy-blood-relations', title: 'Blood Relations', category: 'Aptitude', icon: '🩸' },
  DI: { slug: 'academy-data-interpretation', title: 'Data Interpretation', category: 'Aptitude', icon: '📊' },
  PC: { slug: 'academy-percentages', title: 'Percentages', category: 'Aptitude', icon: '💯' },
  LR: { slug: 'academy-logical-reasoning', title: 'Logical Reasoning Puzzles', category: 'Aptitude', icon: '🧩' },
  NS: { slug: 'academy-number-series', title: 'Number Series', category: 'Aptitude', icon: '🔢' },
  PP: { slug: 'academy-permutations-combinations', title: 'Permutations & Combinations', category: 'Aptitude', icon: '🎲' },
  PB: { slug: 'academy-probability', title: 'Probability', category: 'Aptitude', icon: '🎰' },
  PL: { slug: 'academy-profit-loss', title: 'Profit & Loss', category: 'Aptitude', icon: '💰' },
  RA: { slug: 'academy-ratio-proportion', title: 'Ratio & Proportion', category: 'Aptitude', icon: '⚖️' },
  INT: { slug: 'academy-simple-compound-interest', title: 'Simple & Compound Interest', category: 'Aptitude', icon: '🏦' },
  SY: { slug: 'academy-syllogisms', title: 'Syllogisms', category: 'Aptitude', icon: '🔗' },
  TSD: { slug: 'academy-time-speed-distance', title: 'Time, Speed & Distance', category: 'Aptitude', icon: '🚄' },
  TW: { slug: 'academy-time-work', title: 'Time & Work', category: 'Aptitude', icon: '⏱️' },

  AC: { slug: 'academy-accounting', title: 'Accounting', category: 'Finance Core', icon: '📒' },
  CF: { slug: 'academy-corporate-finance', title: 'Corporate Finance', category: 'Finance Core', icon: '🏦' },
  BF: { slug: 'academy-behavioral-finance', title: 'Behavioral Finance', category: 'Finance Core', icon: '🧠' },
  DV: { slug: 'academy-derivatives', title: 'Derivatives', category: 'Finance Core', icon: '📉' },
  FA: { slug: 'academy-financial-statement-analysis', title: 'Financial Statement Analysis', category: 'Finance Core', icon: '📊' },
  FI: { slug: 'academy-fixed-income', title: 'Fixed Income', category: 'Finance Core', icon: '🛡️' },
  IN2: { slug: 'academy-indian-markets', title: 'Indian Markets', category: 'Finance Core', icon: '🇮🇳' },
  EC: { slug: 'academy-economics', title: 'Micro & Macro Economics', category: 'Finance Core', icon: '🌍' },
  PM: { slug: 'academy-portfolio-management', title: 'Portfolio Management', category: 'Finance Core', icon: '🧺' },
  RT: { slug: 'academy-ratio-analysis', title: 'Ratio Analysis', category: 'Finance Core', icon: '🔍' },
  TV: { slug: 'academy-time-value-money', title: 'Time Value of Money', category: 'Finance Core', icon: '⏳' },
  WM: { slug: 'academy-wealth-management', title: 'Wealth Management', category: 'Finance Core', icon: '💎' },
  CB: { slug: 'academy-capital-budgeting', title: 'Capital Budgeting', category: 'Finance Core', icon: '🏗️' },

  IA: { slug: 'academy-ind-as-ifrs', title: 'Ind AS & IFRS', category: 'Accounting & Reporting', icon: '📜' },
  RR: { slug: 'academy-revenue-recognition', title: 'Revenue Recognition', category: 'Accounting & Reporting', icon: '💰' },
  LS: { slug: 'academy-lease-accounting', title: 'Lease Accounting', category: 'Accounting & Reporting', icon: '🔑' },
  'IC:inventory': { slug: 'academy-inventory-cogs', title: 'Inventory & COGS', category: 'Accounting & Reporting', icon: '📦' },
  DP: { slug: 'academy-depreciation-ppe', title: 'Depreciation & PP&E', category: 'Accounting & Reporting', icon: '🏭' },
  DT: { slug: 'academy-deferred-tax', title: 'Deferred Tax', category: 'Accounting & Reporting', icon: '🧾' },
  CS: { slug: 'academy-consolidated-financials', title: 'Consolidated Financials', category: 'Accounting & Reporting', icon: '🏢' },
};

const OMITTED_FILES = new Set([
  '00_START_HERE_Roadmap.md',
  'PLANNED_COURSES.md',
  'DAX_Cheat_Sheet.md',
  'Resources_Certification_Career.md',
]);

let cachedCourses: SkillAcademyCourse[] | undefined;
let cachedCourseBySlug: Map<string, SkillAcademyCourse> | undefined;

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function plainText(value: string) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractLessonTitle(markdown: string, filename: string) {
  const heading = markdown.match(/^#\s+(.+)\s*$/m)?.[1]?.trim();
  return heading ? plainText(heading) : filename.replace(/\.md$/i, '').replace(/[_-]+/g, ' ');
}

function extractLessonSummary(markdown: string) {
  const objectiveHeading = /^##\s+[^\n]*objectives?[^\n]*\n/im.exec(markdown);
  if (objectiveHeading) {
    const rest = markdown.slice(objectiveHeading.index + objectiveHeading[0].length);
    const block = rest.split(/\n\s*\n|\n##\s/)[0];
    const summary = plainText(block.replace(/^\s*[-*+]\s+/gm, ''));
    if (summary) return summary.slice(0, 360);
  }

  const quote = markdown.match(/^>\s*\*?([^\n]+)\*?\s*$/m)?.[1];
  if (quote) return plainText(quote).slice(0, 360);

  const body = markdown
    .replace(/^#.*$/m, '')
    .split(/\n\s*\n/)
    .map(plainText)
    .find((part) => part.length > 35);
  return body?.slice(0, 360) ?? 'A structured, lesson-by-lesson course with practical exercises and a final assessment.';
}

function estimateMinutes(markdown: string) {
  const lab = markdown.match(/^##\s+[^\n]*\bLAB\b[^\n]*?(\d{1,3})\s*min/mi)?.[1];
  if (lab) return Math.max(5, Number(lab));
  const duration = markdown.match(/\b(\d{1,3})\s*(?:minutes?|min)\b/i)?.[1];
  return duration ? Math.max(5, Number(duration)) : 20;
}

function courseKeyForFile(filename: string) {
  const stem = filename.replace(/\.md$/i, '');
  if (stem.startsWith('IC_')) {
    return /Interview_Foundations|Answer_Frameworks|Thinking_Under_Fire|Mock_Interview_Lab|Finance_Rounds/i.test(stem)
      ? 'IC:interview'
      : 'IC:inventory';
  }
  return stem.split('_')[0];
}

function loadCourses() {
  if (cachedCourses) return cachedCourses;
  if (!fs.existsSync(SOURCE_DIR)) return [];

  const files = fs.readdirSync(SOURCE_DIR)
    .filter((filename) => filename.toLowerCase().endsWith('.md') && !OMITTED_FILES.has(filename))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' }));
  const grouped = new Map<string, { meta: CourseMeta; files: string[] }>();

  for (const filename of files) {
    const key = courseKeyForFile(filename);
    const meta = COURSE_META[key];
    if (!meta) continue;
    const group = grouped.get(meta.slug) ?? { meta, files: [] };
    group.files.push(filename);
    grouped.set(meta.slug, group);
  }

  cachedCourses = [...grouped.values()].map(({ meta, files: lessonFiles }) => {
    const lessons = lessonFiles.map((sourceFile, index): SkillAcademyLesson => {
      const markdown = fs.readFileSync(path.join(SOURCE_DIR, sourceFile), 'utf8');
      const title = extractLessonTitle(markdown, sourceFile);
      const body = escapeMdxTextSyntax(markdown.replace(/^#\s+[^\n]*\n?/, '').trim());
      const slug = slugify(sourceFile.replace(/\.md$/i, ''));
      return {
        slug,
        title,
        summary: extractLessonSummary(markdown),
        content: body,
        sourceFile,
        minutes: estimateMinutes(markdown),
        weight: Math.max(0, 10 - index),
        tags: [meta.category.toLowerCase(), meta.title.toLowerCase()],
      };
    });

    const firstLesson = lessons[0];
    const description = firstLesson?.summary ?? 'A complete track with structured modules, practice, and a course-specific final assessment.';
    const isPowerBi = meta.slug === 'academy-power-bi';
    const resources = isPowerBi
      ? [
          {
            title: 'DAX Cheat Sheet',
            href: '/study/courses/DAX_Cheat_Sheet.md',
            description: 'A compact reference for common DAX patterns.',
          },
          {
            title: 'Certification & Career Resources',
            href: '/study/courses/Resources_Certification_Career.md',
            description: 'PL-300 preparation, interview practice, and next steps.',
          },
        ]
      : [];

    return {
      ...meta,
      trackSlug: slugify(meta.category),
      description,
      lessons,
      resources,
      tags: [slugify(meta.category), meta.slug],
      prefix: lessonFiles[0]?.split('_')[0] ?? '',
    };
  }).sort((a, b) => {
    const order: SkillAcademyCategory[] = ['Business Analytics', 'English', 'Aptitude', 'Finance Core', 'Accounting & Reporting'];
    const categoryOrder = order.indexOf(a.category) - order.indexOf(b.category);
    return categoryOrder || a.title.localeCompare(b.title, 'en');
  });

  cachedCourseBySlug = new Map(cachedCourses.map((course) => [course.slug, course]));
  return cachedCourses;
}

export function getSkillAcademyCourses(): SkillAcademyCourse[] {
  return loadCourses();
}

export function isSkillAcademyCourseSlug(courseSlug: string) {
  return Object.values(COURSE_META).some((course) => course.slug === courseSlug);
}

export function getSkillAcademyCourse(courseSlug: string): SkillAcademyCourse | undefined {
  if (!isSkillAcademyCourseSlug(courseSlug)) return undefined;
  loadCourses();
  return cachedCourseBySlug?.get(courseSlug);
}

export function getSkillAcademyCourseDefinition(courseSlug: string): CourseDefinition | undefined {
  const course = getSkillAcademyCourse(courseSlug);
  if (!course) return undefined;
  return {
    slug: course.slug,
    title: course.title,
    trackSlug: course.trackSlug,
    lessons: course.lessons.map(({ slug, title, minutes, prerequisites, weight, tags }): LessonDefinition => ({
      slug,
      title,
      minutes,
      prerequisites,
      weight,
      tags,
    })),
    tags: course.tags,
  };
}

export function getSkillAcademyCourseCatalog(): SkillAcademyCourseSummary[] {
  return loadCourses().map((course) => ({
    slug: course.slug,
    title: course.title,
    description: course.description,
    category: course.category,
    icon: course.icon,
    lessonCount: course.lessons.length,
    estimatedMinutes: course.lessons.reduce((total, lesson) => total + (lesson.minutes ?? 0), 0),
    href: `/study/course/${course.slug}`,
    source: 'SKILL_ACADEMY',
  }));
}

export function isSkillAcademyCourse(courseSlug: string) {
  return Boolean(getSkillAcademyCourse(courseSlug));
}

export function getSkillAcademyFileResource(filename: string) {
  if (!['DAX_Cheat_Sheet.md', 'Resources_Certification_Career.md'].includes(filename)) return undefined;
  return fs.existsSync(path.join(SOURCE_DIR, filename)) ? fs.readFileSync(path.join(SOURCE_DIR, filename), 'utf8') : undefined;
}
