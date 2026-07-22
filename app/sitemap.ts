// FILE: app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllResearch, getAllInsights, getAllDataLab, getAllCaseStudies, getAllPodcastEpisodes } from '@/lib/content';
import { prisma } from '@/lib/prisma';

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

  // ─── Database Content: Study Materials ───
  let studyMaterials: MetadataRoute.Sitemap = [];
  try {
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
    // StudyMaterial table may not exist yet — skip silently
  }

  // ─── Static Pages ───
  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE}/research`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/insights`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/study`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/study/placement-prep`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/data-lab`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/tracker`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/tools`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/predictions`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE}/podcast`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/enterprise`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/resume`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/radar`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE}/data-freshness`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.5 },
  ];

  return [...statics, ...research, ...insights, ...dataLab, ...caseStudies, ...podcasts, ...studyMaterials];
}
