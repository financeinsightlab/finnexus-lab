// Contentful CMS integration for FinNexus Lab
//
// To use Contentful CMS instead of MDX files:
// 1. Replace imports in page files from '@/lib/content' to '@/lib/contentful'
// 2. Replace getAllResearch() with getAllResearchFromCMS()
//    Replace getResearchBySlug(slug) with getResearchBySlugFromCMS(slug)
//    Replace getAllInsights() with getAllInsightsFromCMS()
//    Replace getInsightBySlug(slug) with getInsightBySlugFromCMS(slug)
// 3. Start publishing content from your Contentful dashboard
//    (see docs/CONTENTFUL_SETUP.md for field configuration)

import { createClient, EntrySkeletonType, Entry } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { ResearchPost, InsightPost } from '@/types';

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const contentfulPreviewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: 'preview.contentful.com',
});

/** Returns the preview client when preview === true, otherwise the delivery client. */
export function getClient(preview = false) {
  return preview ? contentfulPreviewClient : contentfulClient;
}

// ---------------------------------------------------------------------------
// Helper – safely pull a string out of an entry field
// ---------------------------------------------------------------------------

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function num(value: unknown, fallback = 0): number {
  return typeof value === 'number' ? value : fallback;
}

function bool(value: unknown): boolean {
  return Boolean(value);
}

function strArr(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string');
  return [];
}

// ---------------------------------------------------------------------------
// Research Reports
// ---------------------------------------------------------------------------

interface ResearchReportFields extends EntrySkeletonType {
  contentTypeId: 'researchReport';
  fields: {
    title: string;
    slug: string;
    date: string;
    sector: string;
    tags: string[];
    summary: string;
    pageCount: number;
    author: string;
    featured: boolean;
    coverImage?: string;
    // Rich Text document from Contentful
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any;
  };
}

function mapResearchEntry(entry: Entry<ResearchReportFields>): ResearchPost {
  const f = entry.fields as ResearchReportFields['fields'];
  return {
    slug: str(f.slug, entry.sys.id),
    title: str(f.title, str(f.slug, entry.sys.id)),
    date: str(f.date, new Date().toISOString()),
    sector: str(f.sector, 'General'),
    tags: strArr(f.tags),
    summary: str(f.summary),
    pageCount: num(f.pageCount),
    author: str(f.author, 'FinNexus Lab'),
    featured: bool(f.featured),
    coverImage: typeof f.coverImage === 'string' ? f.coverImage : undefined,
    // The `content` field is intentionally left as undefined here so callers
    // can decide whether to render rich text (use getResearchBySlugFromCMS).
  };
}

/**
 * Fetches all research reports from Contentful, ordered newest-first.
 * Drop-in replacement for getAllResearch() in lib/content.ts.
 */
export async function getAllResearchFromCMS(preview = false): Promise<ResearchPost[]> {
  const client = getClient(preview);
  const entries = await client.getEntries<ResearchReportFields>({
    content_type: 'researchReport',
    // @ts-expect-error - contentful types are strict about order field strings
    order: ['-fields.date'],
  });
  return entries.items.map(mapResearchEntry);
}

/**
 * Fetches a single research report by its slug.
 * Returns null if not found.
 * The `content` field is populated as a rendered React node via documentToReactComponents.
 * Drop-in replacement for getResearchBySlug(slug) in lib/content.ts.
 */
export async function getResearchBySlugFromCMS(
  slug: string,
  preview = false,
): Promise<ResearchPost | null> {
  const client = getClient(preview);
  const entries = await client.getEntries<ResearchReportFields>({
    content_type: 'researchReport',
    // @ts-expect-error - contentful types for dynamic fields
    'fields.slug': slug,
    limit: 1,
  });

  if (!entries.items.length) return null;

  const entry = entries.items[0];
  const f = entry.fields as ResearchReportFields['fields'];
  const post = mapResearchEntry(entry);

  // Render Contentful Rich Text to a React node string representation,
  // or export raw richText and render in the page component.
  if (f.content) {
    // documentToReactComponents returns React elements; cast to string for the
    // ResearchPost.content field (plain string). For full Rich Text rendering,
    // use the raw field directly in the page component instead.
    const rendered = documentToReactComponents(f.content);
    post.content = JSON.stringify(rendered); // stored as serialised JSX string
    // Alternatively, export `rawContent: f.content` and call
    // documentToReactComponents(rawContent) inside the page component.
  }

  return post;
}

// ---------------------------------------------------------------------------
// Insight Articles
// ---------------------------------------------------------------------------

interface InsightArticleFields extends EntrySkeletonType {
  contentTypeId: 'insightArticle';
  fields: {
    title: string;
    slug: string;
    date: string;
    category: string;
    readingTime: number;
    thesis: string;
    author: string;
    featured: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any;
  };
}

function mapInsightEntry(entry: Entry<InsightArticleFields>): InsightPost {
  const f = entry.fields as InsightArticleFields['fields'];
  return {
    slug: str(f.slug, entry.sys.id),
    title: str(f.title, str(f.slug, entry.sys.id)),
    date: str(f.date, new Date().toISOString()),
    category: (str(f.category, 'Market Update')) as InsightPost['category'],
    readingTime: num(f.readingTime, 5),
    thesis: str(f.thesis),
    author: str(f.author, 'FinNexus Lab'),
    featured: bool(f.featured),
  };
}

/**
 * Fetches all insight articles from Contentful, ordered newest-first.
 * Drop-in replacement for getAllInsights() in lib/content.ts.
 */
export async function getAllInsightsFromCMS(preview = false): Promise<InsightPost[]> {
  const client = getClient(preview);
  const entries = await client.getEntries<InsightArticleFields>({
    content_type: 'insightArticle',
    // @ts-expect-error - contentful types are strict about order field strings
    order: ['-fields.date'],
  });
  return entries.items.map(mapInsightEntry);
}

/**
 * Fetches a single insight article by its slug.
 * Returns null if not found.
 * The `content` field is populated as a rendered React node via documentToReactComponents.
 * Drop-in replacement for getInsightBySlug(slug) in lib/content.ts.
 */
export async function getInsightBySlugFromCMS(
  slug: string,
  preview = false,
): Promise<InsightPost | null> {
  const client = getClient(preview);
  const entries = await client.getEntries<InsightArticleFields>({
    content_type: 'insightArticle',
    // @ts-expect-error - contentful types for dynamic fields
    'fields.slug': slug,
    limit: 1,
  });

  if (!entries.items.length) return null;

  const entry = entries.items[0];
  const f = entry.fields as InsightArticleFields['fields'];
  const post = mapInsightEntry(entry);

  if (f.content) {
    const rendered = documentToReactComponents(f.content);
    post.content = JSON.stringify(rendered);
  }

  return post;
}
