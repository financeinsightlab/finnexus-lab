// lib/research-content.ts — Canonical Research Discovery & Content Unification Layer (Server Only)
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { prisma } from '@/lib/prisma';
import type { ResearchPost } from '@/types';
import {
  type UnifiedResearchReport,
  type ReviewClassification,
  RESEARCH_COLLECTIONS,
  mapSectorToCollection,
} from '@/lib/research-collections';

export * from '@/lib/research-collections';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'research');

function countWords(str: string): number {
  return str.replace(/<[^>]*>?/gm, '').split(/\s+/).filter(Boolean).length;
}

/**
 * Load all file-backed MDX research reports.
 */
export function getLocalMdxResearch(): UnifiedResearchReport[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  const reports: UnifiedResearchReport[] = [];

  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const filePath = path.join(CONTENT_DIR, file);
    try {
      let raw = fs.readFileSync(filePath, 'utf8');
      raw = raw.replace(/^\/\/ FILE:.*\r?\n/, '');
      const { data, content } = matter(raw);

      const stats = readingTime(content);
      const words = countWords(content);
      const sector = typeof data.sector === 'string' ? data.sector : 'Strategic Research';
      const colSlug = mapSectorToCollection(sector);
      const colInfo = RESEARCH_COLLECTIONS[colSlug] || RESEARCH_COLLECTIONS['macro-economy'];

      // Honest page estimation: standard institutional report is ~450 words per typeset page
      const estimatedPages = typeof data.pageCount === 'number' && data.pageCount > 0
        ? data.pageCount
        : Math.max(1, Math.ceil(words / 450));

      reports.push({
        slug,
        title: typeof data.title === 'string' ? data.title : slug,
        date: typeof data.date === 'string' ? data.date : new Date().toISOString(),
        sector,
        tags: Array.isArray(data.tags) ? data.tags.filter((t): t is string => typeof t === 'string') : [],
        summary: typeof data.summary === 'string' ? data.summary : '',
        excerpt: typeof data.summary === 'string' ? data.summary : '',
        pageCount: estimatedPages,
        estimatedPages,
        author: typeof data.author === 'string' ? data.author : 'Kunwar Analytics Research Desk',
        featured: Boolean(data.featured),
        coverImage: typeof data.coverImage === 'string' ? data.coverImage : undefined,
        content,
        readingTime: stats.text,
        wordCount: words,
        source: 'mdx',
        collectionSlug: colSlug,
        collectionTitle: colInfo.title,
        reviewStatus: 'Quantitative Model Verified',
        isPublished: true,
      });
    } catch (err) {
      console.error(`Failed to parse research MDX file ${file}:`, err);
    }
  }

  return reports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Fetch all published CMS research posts from PostgreSQL.
 */
export async function getCmsResearch(): Promise<UnifiedResearchReport[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        type: 'RESEARCH',
        published: true,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((p) => {
      const words = p.content ? countWords(p.content) : 0;
      const readingMinutes = p.estimatedReadingTime || Math.max(1, Math.ceil(words / 225));
      const sector = p.tags?.[0] || 'Strategic Research';
      const colSlug = mapSectorToCollection(sector);
      const colInfo = RESEARCH_COLLECTIONS[colSlug] || RESEARCH_COLLECTIONS['macro-economy'];
      const estimatedPages = Math.max(1, Math.ceil(words / 450));

      return {
        slug: p.slug,
        title: p.title,
        date: (p.publishedAt || p.createdAt).toISOString(),
        updatedAt: p.updatedAt ? p.updatedAt.toISOString() : undefined,
        sector,
        tags: Array.isArray(p.tags) ? p.tags : [],
        summary: p.excerpt || '',
        excerpt: p.excerpt || '',
        pageCount: estimatedPages,
        estimatedPages,
        author: p.author?.name || 'Kunwar Analytics Research Desk',
        featured: p.viewCount > 50,
        coverImage: p.featuredImage || undefined,
        content: p.content,
        readingTime: `${readingMinutes} min read`,
        wordCount: words,
        source: 'cms',
        collectionSlug: colSlug,
        collectionTitle: colInfo.title,
        reviewStatus: 'Editorially Reviewed',
        isPublished: true,
      };
    });
  } catch (err) {
    // Database unavailable — degrade gracefully to empty array
    return [];
  }
}

/**
 * Get all unified research reports, deduplicated by slug.
 * CMS records override MDX records when slugs match.
 */
export async function getAllUnifiedResearch(): Promise<UnifiedResearchReport[]> {
  const [localReports, cmsReports] = await Promise.all([
    Promise.resolve(getLocalMdxResearch()),
    getCmsResearch(),
  ]);

  const cmsSlugs = new Set(cmsReports.map((r) => r.slug));
  const merged: UnifiedResearchReport[] = [
    ...cmsReports,
    ...localReports.filter((r) => !cmsSlugs.has(r.slug)),
  ];

  return merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single unified research report by slug.
 * Returns null if not found.
 */
export async function getUnifiedResearchBySlug(slug: string): Promise<UnifiedResearchReport | null> {
  // Check CMS first
  try {
    const p = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true } },
      },
    });

    if (p && p.published && p.type === 'RESEARCH') {
      const words = p.content ? countWords(p.content) : 0;
      const readingMinutes = p.estimatedReadingTime || Math.max(1, Math.ceil(words / 225));
      const sector = p.tags?.[0] || 'Strategic Research';
      const colSlug = mapSectorToCollection(sector);
      const colInfo = RESEARCH_COLLECTIONS[colSlug] || RESEARCH_COLLECTIONS['macro-economy'];
      const estimatedPages = Math.max(1, Math.ceil(words / 450));

      return {
        slug: p.slug,
        title: p.title,
        date: (p.publishedAt || p.createdAt).toISOString(),
        updatedAt: p.updatedAt ? p.updatedAt.toISOString() : undefined,
        sector,
        tags: Array.isArray(p.tags) ? p.tags : [],
        summary: p.excerpt || '',
        excerpt: p.excerpt || '',
        pageCount: estimatedPages,
        estimatedPages,
        author: p.author?.name || 'Kunwar Analytics Research Desk',
        featured: p.viewCount > 50,
        coverImage: p.featuredImage || undefined,
        content: p.content,
        readingTime: `${readingMinutes} min read`,
        wordCount: words,
        source: 'cms',
        collectionSlug: colSlug,
        collectionTitle: colInfo.title,
        reviewStatus: 'Editorially Reviewed',
        isPublished: true,
      };
    }
  } catch {
    // Database unavailable or not found, fall back to MDX
  }

  // Fallback to local MDX
  const localReports = getLocalMdxResearch();
  const match = localReports.find((r) => r.slug === slug);
  return match || null;
}

/**
 * Get published research entries specifically for XML sitemap generation.
 */
export async function getResearchSitemapEntries(): Promise<Array<{ url: string; lastModified: Date; changeFrequency: 'monthly'; priority: number }>> {
  const all = await getAllUnifiedResearch();
  const BASE = 'https://kunwaranalytics.in';

  return all.map((report) => ({
    url: `${BASE}/research/${report.slug}`,
    lastModified: report.updatedAt ? new Date(report.updatedAt) : new Date(report.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
}

/**
 * Get deduplicated search index records for Algolia or hybrid search.
 */
export async function getResearchSearchRecords(): Promise<Array<{
  objectID: string;
  type: 'research';
  slug: string;
  title: string;
  summary: string;
  sector: string;
  collection: string;
  tags: string[];
  date: string;
  author: string;
  url: string;
}>> {
  const all = await getAllUnifiedResearch();

  return all.map((r) => ({
    objectID: `research-${r.slug}`,
    type: 'research',
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    sector: r.sector,
    collection: r.collectionTitle,
    tags: r.tags,
    date: r.date,
    author: r.author,
    url: `/research/${r.slug}`,
  }));
}
