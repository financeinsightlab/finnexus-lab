import { getAllResearch } from '@/lib/content';
import { getAllInsights } from '@/lib/content';
import type { ResearchPost, InsightPost } from '@/types';
import { SECTOR_NAME_TO_SLUG, getBaselineConsensus, labelForTemperature } from '@/lib/trackerData';

export interface ContentSentiment {
  slug: string;
  type: 'research' | 'insight';
  sector: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  signals: string[];
}

export interface SectorConsensus {
  sector: string;
  temperature: number; // 0–100, single source of truth from trackerData
  label: string;
  contrarian: string[];
  bullishCount: number;
  bearishCount: number;
  total: number;
  blended: boolean;
  liveTemperature: number | null;
  baselineTemperature: number | null;
}

const BULLISH_KEYWORDS = [
  'accelerating', 'milestone', 'positive ebitda', 'market leader', 'strong growth',
  'profitability', 'expanding', 'achieved', 'record', 'gaining share', 'outperforming',
  'breakeven', 'tailwind', 'momentum', 'surge', 'dominant', 'profitable', 'hypergrowth',
] as const;

const BEARISH_KEYWORDS = [
  'loss-making', 'declining', 'competition intensifies', 'margin pressure', 'slowing',
  'failed', 'regulatory risk', 'layoffs', 'correction', 'concerns', 'headwinds',
  'disappointing', 'writedown', 'impairment', 'downturn', 'contraction', 'losses widening',
  'burn rate',
] as const;

function extractSignals(text: string, keywords: readonly string[]): string[] {
  const lc = text.toLowerCase();
  return keywords.filter((kw) => lc.includes(kw));
}

function getTextToScore(post: ResearchPost | InsightPost): string {
  const title = post.title ?? '';
  const summary = ('summary' in post ? post.summary : post.thesis) ?? '';
  const content = (post.content ?? '').slice(0, 500);
  return `${title} ${summary} ${content}`.toLowerCase();
}

export function scoreContentSentiment(post: ResearchPost | InsightPost, type: 'research' | 'insight'): ContentSentiment {
  const text = getTextToScore(post);
  const bullSignals = extractSignals(text, BULLISH_KEYWORDS);
  const bearSignals = extractSignals(text, BEARISH_KEYWORDS);
  const bullCount = bullSignals.length;
  const bearCount = bearSignals.length;
  let sentiment: 'bullish' | 'bearish' | 'neutral';
  if (bullCount > bearCount + 2) sentiment = 'bullish';
  else if (bearCount > bullCount + 2) sentiment = 'bearish';
  else sentiment = 'neutral';
  const signals = sentiment === 'bullish' ? bullSignals : sentiment === 'bearish' ? bearSignals : [...bullSignals, ...bearSignals];
  return {
    slug: post.slug, type, sector: ('sector' in post ? post.sector : 'General') as string,
    sentiment, signals: [...new Set(signals)],
  };
}

export function getSectorConsensus(sector: string, quarterKey?: string): SectorConsensus {
  const slug = SECTOR_NAME_TO_SLUG[sector];
  const baseline = slug ? getBaselineConsensus(slug, quarterKey) : null;

  const allResearch = getAllResearch().filter((p) => p.sector === sector).slice(0, 10);
  const allInsights = getAllInsights().filter(() => sector === 'General').slice(0, 10);
  const scored = [
    ...allResearch.map((p) => scoreContentSentiment(p, 'research')),
    ...allInsights.map((p) => scoreContentSentiment(p, 'insight')),
  ];
  const total = scored.length;
  const bullishCount = scored.filter((s) => s.sentiment === 'bullish').length;
  const bearishCount = scored.filter((s) => s.sentiment === 'bearish').length;
  const liveTemperature = total === 0 ? null : Math.round((bullishCount / total) * 100);

  // SINGLE SOURCE OF TRUTH: trackerData.ts curated value. Radar mirrors tracker exactly.
  let temperature: number;
  let label: string;
  if (baseline) {
    temperature = baseline.temperature;
    label = baseline.label;
  } else if (liveTemperature !== null) {
    temperature = liveTemperature;
    label = labelForTemperature(temperature);
  } else {
    temperature = 50;
    label = 'MIXED SIGNALS';
  }

  const allBearSignals = scored.flatMap((s) => (s.sentiment === 'bearish' ? s.signals : []));
  const allBullSignals = scored.flatMap((s) => (s.sentiment === 'bullish' ? s.signals : []));
  const contrarian = temperature > 65 ? [...new Set(allBearSignals)].slice(0, 3) : [...new Set(allBullSignals)].slice(0, 3);

  return {
    sector, temperature, label, contrarian, bullishCount, bearishCount, total,
    blended: baseline !== null, liveTemperature, baselineTemperature: baseline?.temperature ?? null,
  };
}

export const TRACKED_SECTORS = [
  'Quick Commerce', 'Fintech', 'EV', 'Food Delivery', 'SaaS', 'D2C', 'Healthcare', 'EdTech',
] as const;

export function getAllSectorConsensus(quarterKey?: string): SectorConsensus[] {
  return TRACKED_SECTORS.map((s) => getSectorConsensus(s, quarterKey));
}
