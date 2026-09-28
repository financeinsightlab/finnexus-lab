import { NextResponse } from 'next/server';
import { getAllResearch } from '@/lib/content';
import { parseFreshStats } from '@/lib/freshness';
import { requireCron } from '@/lib/auth-guards';
import { logger } from '@/lib/logger';
import { slaSummary, slaWorklist, type SlaInput } from '@/lib/freshness-sla';

/**
 * Vercel Cron endpoint — runs Mondays at 09:00 IST (03:30 UTC)
 * Checks all research reports for newly-stale FreshStat tags.
 * Returns a JSON summary (email integration can be added later).
 *
 * Vercel cron config → vercel.json:
 * { "crons": [{ "path": "/api/cron/freshness-check", "schedule": "30 3 * * 1" }] }
 */

import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  // Validate cron secret (shared guard — standardized across every /api/cron/*)
  const unauthorized = requireCron(request);
  if (unauthorized) return unauthorized;

  // 1. Fetch MDX/Legacy reports
  const mdxPosts = getAllResearch();

  // 2. Fetch CMS/Database reports
  let dbPosts: { title: string, slug: string, content: string, updatedAt: Date }[] = [];
  try {
    dbPosts = await prisma.post.findMany({
      where: { type: 'RESEARCH', published: true },
      select: { title: true, slug: true, content: true, updatedAt: true }
    });
  } catch (e) {
    logger.error('Freshness check: DB fetch failed', {
      error: e instanceof Error ? e.message : String(e),
    });
  }

  const posts = [...mdxPosts, ...dbPosts];
  const staleThisWeek: {
    reportTitle: string;
    reportSlug: string;
    stat: string;
    daysOld: number;
    source?: string;
    updateUrl?: string;
  }[] = [];

  for (const post of posts) {
    if (!post.content) continue;

    // Unescape HTML for CMS content
    const rawContent = post.content
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');

    const stats = parseFreshStats(rawContent);
    for (const s of stats) {
      // Newly stale = crossed into stale within the last 7 days
      const halfLife = s.halfLifeDays;
      const staleThreshold = halfLife * 1.5;
      if (s.daysOld >= staleThreshold && s.daysOld < staleThreshold + 7) {
        staleThisWeek.push({
          reportTitle: post.title,
          reportSlug: post.slug,
          stat: s.value,
          daysOld: s.daysOld,
          source: s.source,
          updateUrl: s.updateUrl,
        });
      }
    }
  }

  // 3. Per-content-type SLA worklist (Pillar C4). Where the FreshStat check
  // measures decay *inside* a report, the SLA layer flags whole documents that
  // have aged past their type's service level and need refreshing.
  const slaInputs: SlaInput[] = mdxPosts.map((post) => ({
    type: 'research',
    title: post.title,
    slug: post.slug,
    updatedAt: post.date,
  }));

  for (const post of dbPosts) {
    slaInputs.push({
      type: 'research',
      title: post.title,
      slug: post.slug,
      updatedAt: post.updatedAt,
    });
  }

  const worklist = slaWorklist(slaInputs);

  const summary = {
    checkedAt: new Date().toISOString(),
    totalReports: posts.length,
    newlyStale: staleThisWeek.length,
    stats: staleThisWeek,
    sla: {
      counts: slaSummary(worklist),
      breaches: worklist.filter((item) => item.status === 'breach').length,
      worklist: worklist.slice(0, 25),
    },
    message:
      staleThisWeek.length > 0
        ? `${staleThisWeek.length} statistics became stale this week — review needed.`
        : 'All statistics are within freshness thresholds.',
  };

  // TODO: Add email sending here once email is configured site-wide
  // e.g. await sendEmail({ to: process.env.ADMIN_EMAIL, subject: summary.message, data: summary });

  return NextResponse.json(summary, { status: 200 });
}
