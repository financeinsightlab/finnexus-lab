import fs from 'node:fs';
import path from 'node:path';
import { runInNewContext } from 'node:vm';
import type { CourseDefinition, LessonDefinition } from '@/lib/learning-progress';
import { escapeMdxTextSyntax } from '@/lib/markdown-content';

const APP_DIR = path.join(process.cwd(), 'public', 'analyst-course');

export interface AnalystLevelLesson extends LessonDefinition {
  summary: string;
  content: string;
  practice: string;
  answer: string;
  interview?: string;
}

export interface AnalystLevelCourse extends CourseDefinition {
  level: number;
  icon: string;
  description: string;
  lessons: AnalystLevelLesson[];
}

export interface AnalystLevelCourseSummary {
  slug: string;
  title: string;
  description: string;
  level: number;
  lessonCount: number;
  estimatedMinutes: number;
  icon: string;
  href: string;
  source: 'ANALYST_COMPLETE';
}

interface LevelMeta {
  level: number;
  slug: string;
  title: string;
  icon: string;
  file: string;
  variable: string;
  description: string;
}

const LEVELS: LevelMeta[] = [
  { level: 0, slug: 'analyst-level-00', title: 'Analytics Orientation', icon: '🧭', file: 'app.bundle.js', variable: 'zeroCourse', description: 'Start with business questions, evidence, metrics, and the analyst’s role in decision-making.' },
  { level: 1, slug: 'analyst-level-01', title: 'Spreadsheet Analyst', icon: '📊', file: 'level1-engine.js', variable: 'spreadsheetCourse', description: 'Build reliable spreadsheets, analyze business data, and communicate the result.' },
  { level: 2, slug: 'analyst-level-02', title: 'Statistics for Business Decisions', icon: '📐', file: 'level2-engine.js', variable: 'statisticsCourse', description: 'Use distributions, experiments, and uncertainty to make evidence-led business decisions.' },
  { level: 3, slug: 'analyst-level-03', title: 'SQL Analyst', icon: '🗄️', file: 'level3-engine.js', variable: 'sqlCourse', description: 'Query relational data safely, validate results, and answer business questions.' },
  { level: 4, slug: 'analyst-level-04', title: 'Python Analyst', icon: '🐍', file: 'level4-engine.js', variable: 'pythonCourse', description: 'Use Python and Pandas for reproducible data analysis, cleaning, and visualization.' },
  { level: 5, slug: 'analyst-level-05', title: 'Data Quality & Preparation', icon: '🧹', file: 'level5-engine.js', variable: 'qualityCourse', description: 'Profile, clean, validate, and document data so that decisions rest on trustworthy evidence.' },
  { level: 6, slug: 'analyst-level-06', title: 'Business Intelligence', icon: '📈', file: 'level6-engine.js', variable: 'biCourse', description: 'Model data, define measures, and build decision-ready business intelligence.' },
  { level: 7, slug: 'analyst-level-07', title: 'Business Analytics', icon: '🧠', file: 'level7-engine.js', variable: 'businessCourse', description: 'Turn metrics and business evidence into prioritized actions and measurable recommendations.' },
  { level: 8, slug: 'analyst-level-08', title: 'Financial Analytics', icon: '💹', file: 'level8-engine.js', variable: 'financeCourse', description: 'Read financial statements, analyze unit economics, and support finance decisions.' },
  { level: 9, slug: 'analyst-level-09', title: 'Product Analytics', icon: '🧪', file: 'level9-engine.js', variable: 'productCourse', description: 'Measure user journeys, activation, retention, and experiments to guide product decisions.' },
  { level: 10, slug: 'analyst-level-10', title: 'Advanced Analytics', icon: '🤖', file: 'level10-engine.js', variable: 'advancedCourse', description: 'Choose, validate, and communicate models that improve a real decision.' },
  { level: 11, slug: 'analyst-level-11', title: 'Analytics Engineering', icon: '🧰', file: 'level11-engine.js', variable: 'engineeringCourse', description: 'Design tested, documented analytical data products and reliable transformation workflows.' },
  { level: 12, slug: 'analyst-level-12', title: 'AI & GenAI Analytics', icon: '✨', file: 'level12-engine.js', variable: 'aiCourse', description: 'Use AI-assisted analysis with verification, privacy safeguards, and human review.' },
  { level: 13, slug: 'analyst-level-13', title: 'Case & Consulting Lab', icon: '🗂️', file: 'level13-engine.js', variable: 'caseCourse', description: 'Structure ambiguous business problems and present concise, evidence-based recommendations.' },
  { level: 14, slug: 'analyst-level-14', title: 'Production Portfolio & Career', icon: '🏁', file: 'level14-engine.js', variable: 'productionCourse', description: 'Package end-to-end work into reproducible projects, a portfolio, and interview-ready evidence.' },
];

interface RawAnalystLesson {
  t?: string;
  time?: string;
  goal?: string;
  why?: string;
  analogy?: string;
  parts?: [string, string][];
  example?: string;
  practice?: string;
  answer?: string;
  interview?: string;
}

let cachedCourses: AnalystLevelCourse[] | undefined;
let cachedCourseBySlug: Map<string, AnalystLevelCourse> | undefined;

function minutesFrom(value?: string) {
  const minutes = value?.match(/(\d+)\s*min/i)?.[1];
  return minutes ? Math.max(5, Number(minutes)) : 25;
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function rawMarkdown(value?: string) {
  return (value ?? '').trim().replace(/\r\n/g, '\n');
}

function safeMarkdown(value?: string) {
  return escapeMdxTextSyntax(rawMarkdown(value));
}

/** Read only the array literal from the trusted, checked-in course engine. The
 * engine's UI code is deliberately not evaluated in the server process. */
function extractLessonArray(source: string, variable: string): RawAnalystLesson[] {
  const declaration = new RegExp(`(?:^|\\n)const\\s+${variable}\\s*=\\s*\\[`, 'm').exec(source);
  if (!declaration) throw new Error(`Course lesson array ${variable} was not found.`);

  const start = declaration.index + declaration[0].lastIndexOf('[');
  let depth = 0;
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }
      if (char === quote) quote = '';
      continue;
    }
    if (char === '/' && next === '/') {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === '\'' || char === '"' || char === '`') {
      quote = char;
      continue;
    }
    if (char === '[') depth += 1;
    if (char === ']') {
      depth -= 1;
      if (depth === 0) {
        const literal = source.slice(start, index + 1);
        const result = runInNewContext(`(${literal})`, Object.create(null), { timeout: 1000 }) as unknown;
        if (!Array.isArray(result)) throw new Error(`Course lesson array ${variable} is invalid.`);
        return result as RawAnalystLesson[];
      }
    }
  }
  throw new Error(`Course lesson array ${variable} is unterminated.`);
}

function renderLessonContent(lesson: RawAnalystLesson) {
  const sections = [
    lesson.goal ? `> **By the end:** ${safeMarkdown(lesson.goal)}` : '',
    lesson.why ? `## Why this matters in real work\n\n${safeMarkdown(lesson.why)}` : '',
    lesson.analogy ? `## A simple analogy\n\n> ${safeMarkdown(lesson.analogy)}` : '',
    Array.isArray(lesson.parts) && lesson.parts.length
      ? `## Chapter sections\n\n${lesson.parts.map(([heading, body]) => `### ${safeMarkdown(heading)}\n\n${safeMarkdown(body)}`).join('\n\n')}`
      : '',
    lesson.example ? `## Worked business example\n\n${safeMarkdown(lesson.example)}` : '',
    lesson.practice ? `## Try it yourself\n\n${safeMarkdown(lesson.practice)}` : '',
    lesson.answer
      ? `<details>\n<summary>Show the model response</summary>\n\n${safeMarkdown(lesson.answer)}\n\n</details>`
      : '',
    lesson.interview ? `## Interview practice\n\n${safeMarkdown(lesson.interview)}` : '',
  ].filter(Boolean);
  return sections.join('\n\n');
}

function loadCourses() {
  if (cachedCourses) return cachedCourses;

  cachedCourses = LEVELS.map((meta) => {
    const sourcePath = path.join(APP_DIR, meta.file);
    if (!fs.existsSync(sourcePath)) throw new Error(`Analyst curriculum source ${meta.file} is missing.`);
    const source = fs.readFileSync(sourcePath, 'utf8');
    const rawLessons = extractLessonArray(source, meta.variable);
    const lessons = rawLessons.map((raw, index): AnalystLevelLesson => {
      const title = raw.t?.trim() || `Lesson ${index + 1}`;
      const slug = `lesson-${String(index + 1).padStart(2, '0')}-${slugify(title)}`;
      const summary = rawMarkdown(raw.goal) || rawMarkdown(raw.why) || `Lesson ${index + 1} in ${meta.title}.`;
      return {
        slug,
        title,
        summary,
        content: renderLessonContent(raw),
        practice: rawMarkdown(raw.practice),
        answer: rawMarkdown(raw.answer),
        interview: rawMarkdown(raw.interview),
        minutes: minutesFrom(raw.time),
        weight: Math.max(0, 10 - index),
        tags: ['analyst-complete', `level-${meta.level}`],
      };
    });

    return {
      slug: meta.slug,
      title: `Level ${meta.level} · ${meta.title}`,
      level: meta.level,
      icon: meta.icon,
      description: lessons[0]?.summary || meta.description,
      trackSlug: 'analyst-complete',
      lessons,
      tags: ['analyst-complete', `level-${meta.level}`],
    };
  });

  cachedCourseBySlug = new Map(cachedCourses.map((course) => [course.slug, course]));
  return cachedCourses;
}

export function getAnalystLevelCourses(): AnalystLevelCourse[] {
  return loadCourses();
}

export function isAnalystLevelCourseSlug(courseSlug: string) {
  return LEVELS.some((level) => level.slug === courseSlug);
}

export function getAnalystLevelCourse(courseSlug: string): AnalystLevelCourse | undefined {
  if (!isAnalystLevelCourseSlug(courseSlug)) return undefined;
  loadCourses();
  return cachedCourseBySlug?.get(courseSlug);
}

export function getAnalystLevelCourseDefinition(courseSlug: string): CourseDefinition | undefined {
  const course = getAnalystLevelCourse(courseSlug);
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

export function getAnalystLevelCourseCatalog(): AnalystLevelCourseSummary[] {
  return loadCourses().map((course) => ({
    slug: course.slug,
    title: course.title,
    description: course.description,
    level: course.level,
    lessonCount: course.lessons.length,
    estimatedMinutes: course.lessons.reduce((total, lesson) => total + (lesson.minutes ?? 0), 0),
    icon: course.icon,
    href: `/study/course/${course.slug}`,
    source: 'ANALYST_COMPLETE',
  }));
}

export function isAnalystLevelCourse(courseSlug: string) {
  return Boolean(getAnalystLevelCourse(courseSlug));
}
