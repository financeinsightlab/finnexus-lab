// FILE: app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllResearch, getAllInsights, getAllDataLab, getAllCaseStudies, getAllPodcastEpisodes } from '@/lib/content';
import { SUBJECTS } from '@/lib/pgdm/curriculum';
import { TOOLS } from '@/lib/tools-registry';
import { CERTIFICATES } from '@/lib/certificates';

const BASE = 'https://kunwaranalytics.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const safeDate = (value: unknown) => {
    const d = value instanceof Date ? value : new Date(typeof value === 'string' || typeof value === 'number' ? value : '');
    return Number.isFinite(d.getTime()) ? d : new Date();
  };

  // ─── MDX Content ───
  const research = getAllResearch().map((post) => ({
    url: `${BASE}/research/${post.slug}`,
    lastModified: safeDate(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const insights = getAllInsights().map((post) => ({
    url: `${BASE}/insights/${post.slug}`,
    lastModified: safeDate(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const dataLab = getAllDataLab().map((project) => ({
    url: `${BASE}/data-lab/${project.slug}`,
    lastModified: safeDate(project.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const caseStudies = getAllCaseStudies().map((study) => ({
    url: `${BASE}/case-studies/${study.slug}`,
    lastModified: safeDate(study.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const podcasts = getAllPodcastEpisodes().map((episode) => ({
    url: `${BASE}/podcast/${episode.slug}`,
    lastModified: safeDate(episode.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // ─── Static utility pages ───
  const utilityPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/speaking`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // ─── PGDM curriculum (14 subjects · 73 lectures · 14 cheat sheets) ───
  const pgdmPages: MetadataRoute.Sitemap = SUBJECTS.flatMap((subject) => [
    { url: `${BASE}/pgdm/${subject.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...subject.lectures.map((l) => ({
      url: `${BASE}/pgdm/${subject.slug}/${l.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${BASE}/pgdm/${subject.slug}/cheatsheet`, changeFrequency: 'monthly' as const, priority: 0.6 },
  ]);

  // ─── Interactive tools ───
  const toolPages: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${BASE}/tools/${t.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ─── Public certificate-pathway catalogue pages ───
  const certificatePages: MetadataRoute.Sitemap = CERTIFICATES.map((c) => ({
    url: `${BASE}/certificates/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ─── Database-backed public learning and glossary content ───
  let studyMaterials: MetadataRoute.Sitemap = [];
  let financeTerms: MetadataRoute.Sitemap = [];
  let cmsLessons: MetadataRoute.Sitemap = [];
  try {
    // Keep file-backed routes available when the database is not configured.
    const { prisma } = await import('@/lib/prisma');
    const materials = await prisma.studyMaterial.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    });
    studyMaterials = materials.map((m) => ({
      url: `${BASE}/study/${m.slug}`,
      lastModified: safeDate(m.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // StudyMaterial table may not exist yet — skip silently.
  }
  try {
    const { prisma } = await import('@/lib/prisma');
    const terms = await prisma.financeTerm.findMany({
      where: { published: true, seoVisible: true },
      select: { slug: true, updatedAt: true },
      orderBy: { displayOrder: 'asc' },
      take: 5000,
    });
    financeTerms = terms.map((term) => ({
      url: `${BASE}/finance-terms/${term.slug}`,
      lastModified: safeDate(term.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    // The additive glossary migration may not be applied yet.
  }
  try {
    const { prisma } = await import('@/lib/prisma');
    const lessons = await prisma.courseLesson.findMany({
      where: { published: true },
      select: { courseSlug: true, slug: true, updatedAt: true },
      orderBy: [{ courseSlug: 'asc' }, { displayOrder: 'asc' }],
      take: 5000,
    });
    const pgdmCourseSlugs = new Set(SUBJECTS.map((subject) => subject.slug));
    cmsLessons = lessons.map((lesson) => ({
      url: pgdmCourseSlugs.has(lesson.courseSlug)
        ? `${BASE}/pgdm/${lesson.courseSlug}/lesson/${lesson.slug}`
        : `${BASE}/study/${lesson.courseSlug}/lessons/${lesson.slug}`,
      lastModified: safeDate(lesson.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    // The additive course-content migration may not be applied yet.
  }

  // ─── Static Pages ───
  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE}/research`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/insights`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/pgdm`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE}/study`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/finance-terms`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/study/placement-prep`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/data-lab`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/tracker`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/tools`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/predictions`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE}/predictions/ledger`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE}/ask`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/status`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.4 },
    { url: `${BASE}/podcast`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/enterprise`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/resume`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/certificates`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/cookies`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE}/gdpr`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE}/security`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE}/ethics`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/radar`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE}/data-freshness`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.5 },
  ];

  return [...statics, ...utilityPages, ...research, ...insights, ...dataLab, ...caseStudies, ...podcasts, ...studyMaterials, ...financeTerms, ...cmsLessons, ...pgdmPages, ...toolPages, ...certificatePages];
}
