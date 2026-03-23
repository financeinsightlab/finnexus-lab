import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ResearchPost, InsightPost } from '@/types';

const CONTENT = path.join(process.cwd(), 'content');

function readDir(dir: string): { slug: string; filePath: string }[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace('.mdx', ''),
      filePath: path.join(dir, file),
    }));
}

export function getAllResearch(): ResearchPost[] {
  const researchDir = path.join(CONTENT, 'research');
  const files = readDir(researchDir);
  return files
    .map(({ slug, filePath }) => {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return { ...data, slug } as ResearchPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getResearchBySlug(slug: string): Promise<ResearchPost | null> {
  const filePath = path.join(CONTENT, 'research', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { ...data, slug, content } as ResearchPost;
}

export function getFeaturedResearch(n = 3): ResearchPost[] {
  return getAllResearch().filter((post) => post.featured).slice(0, n);
}

export function getRelatedResearch(currentSlug: string, sector: string, n = 3): ResearchPost[] {
  return getAllResearch()
    .filter((post) => post.sector === sector && post.slug !== currentSlug)
    .slice(0, n);
}

export function getAllInsights(): InsightPost[] {
  const insightsDir = path.join(CONTENT, 'insights');
  const files = readDir(insightsDir);
  return files
    .map(({ slug, filePath }) => {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return { ...data, slug } as InsightPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getInsightBySlug(slug: string): Promise<InsightPost | null> {
  const filePath = path.join(CONTENT, 'insights', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { ...data, slug, content } as InsightPost;
}

export function getFeaturedInsights(n = 3): InsightPost[] {
  return getAllInsights().filter((post) => post.featured).slice(0, n);
}

export function getContentCounts(): { research: number; insights: number } {
  return {
    research: getAllResearch().length,
    insights: getAllInsights().length,
  };
}