// lib/promotions/page-registry.ts — the list of real public pages.
//
// Feeds the admin page-target selector, the targeting preview ("will appear
// on / will NOT appear on") and the debugger. Sources mirror app/sitemap.ts
// so the registry never advertises URLs that do not exist.

import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { getAllCaseStudies, getAllDataLab, getAllInsights, getAllPodcastEpisodes, getAllResearch } from '@/lib/content';
import { SUBJECTS } from '@/lib/pgdm/curriculum';
import { TOOLS } from '@/lib/tools-registry';
import { CERTIFICATES } from '@/lib/certificates';
import { logger } from '@/lib/logger';
import { PAGE_TYPE_META, type PageType } from './catalog';
import { resolvePageContext } from './targeting';

export interface RegisteredPage {
  path: string;
  title: string;
  pageType: PageType;
  isHub: boolean;
  contentKey: string | null;
  tags: string[];
}

export interface PageGroup {
  pageType: PageType;
  label: string;
  pages: RegisteredPage[];
}

const STATIC_PAGES: Array<[string, string]> = [
  ['/', 'Homepage'],
  ['/research', 'Research hub'],
  ['/insights', 'Insights hub'],
  ['/tools', 'Tools & models hub'],
  ['/finance-terms', 'Finance terms hub'],
  ['/pgdm', 'PGDM courses hub'],
  ['/study', 'Study materials hub'],
  ['/study/placement-prep', 'Placement prep'],
  ['/certificates', 'Certificates hub'],
  ['/data-lab', 'Data Lab hub'],
  ['/case-studies', 'Case studies hub'],
  ['/predictions', 'Predictions'],
  ['/predictions/ledger', 'Prediction ledger'],
  ['/podcast', 'Podcast hub'],
  ['/tracker', 'Sector trackers'],
  ['/radar', 'Signal radar'],
  ['/ask', 'Ask Kunwar'],
  ['/pricing', 'Pricing'],
  ['/enterprise', 'Enterprise'],
  ['/services', 'Services'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
  ['/projects', 'Projects'],
  ['/resume', 'Resume'],
  ['/speaking', 'Speaking'],
  ['/status', 'Status'],
  ['/data-freshness', 'Data freshness'],
  ['/dashboard', 'Member dashboard'],
];

function entry(path: string, title: string, tags: string[] = []): RegisteredPage {
  const ctx = resolvePageContext(path, { tags });
  return { path: ctx.pathname, title, pageType: ctx.pageType, isHub: ctx.isHub, contentKey: ctx.contentKey, tags: ctx.tags };
}

async function buildRegistry(): Promise<RegisteredPage[]> {
  const pages: RegisteredPage[] = STATIC_PAGES.map(([path, title]) => entry(path, title));

  const safe = <T,>(label: string, loader: () => T[]): T[] => {
    try {
      return loader();
    } catch (error) {
      logger.warn(`promotions: page registry could not load ${label}`, { error: String(error) });
      return [];
    }
  };

  for (const post of safe('research', getAllResearch)) pages.push(entry(`/research/${post.slug}`, post.title, [...(post.tags ?? []), post.sector].filter(Boolean)));
  for (const post of safe('insights', getAllInsights)) pages.push(entry(`/insights/${post.slug}`, post.title, [...(post.tags ?? []), post.category].filter(Boolean)));
  for (const project of safe('data-lab', getAllDataLab)) pages.push(entry(`/data-lab/${project.slug}`, project.title, [project.sector, ...(project.tools ?? [])].filter(Boolean)));
  for (const study of safe('case-studies', getAllCaseStudies)) pages.push(entry(`/case-studies/${study.slug}`, study.title, [...(study.tags ?? []), study.industry ?? ''].filter(Boolean)));
  for (const episode of safe('podcast', getAllPodcastEpisodes)) pages.push(entry(`/podcast/${episode.slug}`, episode.title, episode.tags ?? []));
  for (const tool of TOOLS) pages.push(entry(`/tools/${tool.slug}`, tool.title, [tool.category]));
  for (const subject of SUBJECTS) {
    pages.push(entry(`/pgdm/${subject.slug}`, `${subject.code} · ${subject.name}`, [subject.track]));
    for (const lecture of subject.lectures) pages.push(entry(`/pgdm/${subject.slug}/${lecture.slug}`, `${subject.name} → ${lecture.title}`, [subject.track]));
    pages.push(entry(`/pgdm/${subject.slug}/cheatsheet`, `${subject.name} → Cheat sheet`, [subject.track]));
  }
  for (const certificate of CERTIFICATES) pages.push(entry(`/certificates/${certificate.slug}`, certificate.title, [certificate.category]));

  try {
    const { prisma } = await import('@/lib/prisma');
    const [materials, terms] = await Promise.all([
      prisma.studyMaterial.findMany({ where: { published: true }, select: { slug: true, title: true, tags: true }, orderBy: { publishedAt: 'desc' }, take: 2000 }),
      prisma.financeTerm.findMany({ where: { published: true }, select: { slug: true, term: true, category: true }, orderBy: { displayOrder: 'asc' }, take: 5000 }),
    ]);
    for (const material of materials) pages.push(entry(`/study/${material.slug}`, material.title, material.tags));
    for (const term of terms) pages.push(entry(`/finance-terms/${term.slug}`, term.term, [term.category]));
  } catch (error) {
    logger.warn('promotions: page registry database lookup skipped', { error: String(error) });
  }

  const seen = new Set<string>();
  return pages.filter((page) => {
    if (seen.has(page.path) || PAGE_TYPE_META[page.pageType].blocked) return false;
    seen.add(page.path);
    return true;
  });
}

const cachedRegistry = unstable_cache(buildRegistry, ['promotion-page-registry-v1'], { revalidate: 300, tags: ['promotion-pages'] });

/** All known public pages (deduplicated, blocked types removed). Never throws. */
export const getPageRegistry = cache(async (): Promise<RegisteredPage[]> => {
  try {
    return await cachedRegistry();
  } catch {
    try {
      return await buildRegistry();
    } catch (error) {
      logger.error('promotions: page registry unavailable', { error: String(error) });
      return STATIC_PAGES.map(([path, title]) => entry(path, title));
    }
  }
});

export async function getPageGroups(): Promise<PageGroup[]> {
  const pages = await getPageRegistry();
  const groups = new Map<PageType, RegisteredPage[]>();
  for (const page of pages) {
    const list = groups.get(page.pageType) ?? [];
    list.push(page);
    groups.set(page.pageType, list);
  }
  return [...groups.entries()]
    .map(([pageType, list]) => ({ pageType, label: PAGE_TYPE_META[pageType].label, pages: list.sort((a, b) => Number(b.isHub) - Number(a.isHub) || a.title.localeCompare(b.title)) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
