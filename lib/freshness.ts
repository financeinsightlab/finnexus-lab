import type { ResearchPost } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FreshnessStatus = 'fresh' | 'aging' | 'stale';

export interface ParsedFreshStat {
  value:       string;
  date:        string;
  halfLifeDays: number;
  source?:     string;
  updateUrl?:  string;
  daysOld:     number;
  freshnessRatio: number;
  status:      FreshnessStatus;
}

// ─── Core Logic ───────────────────────────────────────────────────────────────

export function computeFreshness(
  date: string,
  halfLifeDays: number,
): { daysOld: number; freshnessRatio: number; status: FreshnessStatus } {
  const daysOld = Math.floor(
    (Date.now() - new Date(date).getTime()) / 86_400_000,
  );
  const freshnessRatio = Math.max(0, 1 - daysOld / (halfLifeDays * 2));

  let status: FreshnessStatus;
  if (daysOld < halfLifeDays)           status = 'fresh';
  else if (daysOld < halfLifeDays * 1.5) status = 'aging';
  else                                   status = 'stale';

  return { daysOld, freshnessRatio, status };
}

// ─── MDX Parser ───────────────────────────────────────────────────────────────

/**
 * Regex-extracts all <FreshStat ... /> usages from MDX source.
 * Only runs server-side (content parsing).
 */
export function parseFreshStats(mdxContent: string): ParsedFreshStat[] {
  const results: ParsedFreshStat[] = [];

  // Match all <FreshStat ... /> tags (multiline)
  // Use [\s\S]*? instead of dotAll flag (not available in ES2017 target)
  const tagPattern = /<FreshStat\s([\s\S]*?)\/>/g;
  let match: RegExpExecArray | null;

  while ((match = tagPattern.exec(mdxContent)) !== null) {
    const attrs = match[1];

    const getValue  = (key: string) => {
      const m = new RegExp(`${key}=['"]([^'"]*?)['"]`).exec(attrs);
      return m?.[1];
    };
    const getNumber = (key: string) => {
      const m = new RegExp(`${key}=\\{([\\d.]+)\\}`).exec(attrs);
      return m ? Number(m[1]) : undefined;
    };

    const value       = getValue('value');
    const date        = getValue('date');
    const halfLife    = getNumber('halfLifeDays');
    const source      = getValue('source');
    const updateUrl   = getValue('updateUrl');

    if (!value || !date || !halfLife) continue;

    const { daysOld, freshnessRatio, status } = computeFreshness(date, halfLife);

    results.push({
      value,
      date,
      halfLifeDays: halfLife,
      source,
      updateUrl,
      daysOld,
      freshnessRatio,
      status,
    });
  }

  // 2. Match NEW CMS styled blockquotes
  // Example: <strong>Live Tracked Data:</strong> 2,027</p> ... (Collected: 2026-04-05 | Decay Rate: 45d)
  const cmsPattern = /Live Tracked Data:<\/strong>\s*(.*?)\s*<\/p>[\s\S]*?\(Collected:\s*([^ |]+)\s*\|\s*Decay Rate:\s*(\d+)d\)/g;
  let cmsMatch: RegExpExecArray | null;

  while ((cmsMatch = cmsPattern.exec(mdxContent)) !== null) {
    const value = cmsMatch[1].trim();
    const date = cmsMatch[2].trim();
    const halfLife = Number(cmsMatch[3]);
    
    if (!value || !date || !halfLife) continue;
    
    const { daysOld, freshnessRatio, status } = computeFreshness(date, halfLife);
    
    results.push({
      value,
      date,
      halfLifeDays: halfLife,
      daysOld,
      freshnessRatio,
      status,
    });
  }

  return results;
}

// ─── Report Freshness Score ───────────────────────────────────────────────────

/**
 * Returns 0–100. If no FreshStat tags found, returns 100 (no data to decay).
 */
export function calculateReportFreshness(post: ResearchPost): number {
  if (!post.content) return 100;

  const stats = parseFreshStats(post.content);
  if (stats.length === 0) return 100;

  const avg = stats.reduce((sum, s) => sum + s.freshnessRatio, 0) / stats.length;
  return Math.round(avg * 100);
}
