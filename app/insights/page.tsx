import type { Metadata } from 'next';
import { getAllInsights } from '@/lib/content';
import InsightsClient from '../../components/insights/InsightsClient';
import { prisma } from "@/lib/prisma";
import React from "react";

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Timely market analysis, strategic commentary, and data-driven perspectives on Indian business sectors.',
};

export default async function InsightsPage() {
  // 1. Legacy data
  const legacyPosts = getAllInsights();

  // 2. New CMS data
  let dbPosts: any[] = [];
  try {
    dbPosts = await (prisma as any).post.findMany({
      where: { type: 'INSIGHT', published: true },
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.error("Insights DB fetch failed:", e);
  }

  // 3. Merge
  const allPosts = [
    ...dbPosts.map(p => ({
      slug: p.slug,
      title: p.title,
      thesis: p.excerpt || 'New strategic commentary.',
      category: 'Sector Analysis' as const,
      author: 'FinNexus Admin',
      date: p.createdAt.toISOString(),
      readingTime: 5,
      featured: true,
      isNewCMS: true
    })),
    ...legacyPosts
  ];

  return <InsightsClient posts={allPosts} />;
}