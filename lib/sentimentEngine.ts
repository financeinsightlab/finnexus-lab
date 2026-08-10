import { getAllResearch } from '@/lib/content';
import { getAllInsights } from '@/lib/content';
import type { ResearchPost, InsightPost } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContentSentiment {
  slug:      string;
  type:      'research' | 'insight';
  sector:    string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  signals:   string[];
}

export interface SectorConsensus {
  sector:      string;
  temperature: number; // 0–100
  label:       string;
  contrarian:  string[];
  bullishCount: number;
  bearishCount: number;
  total:       number;
}

// ─── Keyword Dictionaries ─────────────────────────────────────────────────────

const BULLISH_KEYWORDS = [
  'accelerating',
  'milestone',
  'positive ebitda',
  'market leader',
  'strong growth',
  'profitability',
  'expanding',
  'achieved',
  'record',
  'gaining share',
  'outperforming',
  'breakeven',
  'tailwind',
  'momentum',
  'surge',
  'dominant',
  'profitable',
  'hypergrowth',
] as const;

const BEARISH_KEYWORDS = [
  'loss-making',
  'declining',
  'competition intensifies',
  'margin pressure',
  'slowing',
  'failed',
  'regulatory risk',
  'layoffs',
  'correction',
  'concerns',
  'headwinds',
  'disappointing',
  'writedown',
  'impairment',
  'downturn',
  'contraction',
  'losses widening',
  'burn rate',
] as const;

// ─── Scoring ──────────────────────────────────────────────────────────────────

function extractSignals(text: string, keywords: readonly string[]): string[] {
  const lc = text.toLowerCase();
  return keywords.filter((kw) => lc.includes(kw));
}

function getTextToScore(post: ResearchPost | InsightPost): string {
  const title   = post.title ?? '';
  const summary = ('summary' in post ? post.summary : post.thesis) ?? '';
  const content = (post.content ?? '').slice(0, 500);
  return `${title} ${summary} ${content}`.toLowerCase();
}

export function scoreContentSentiment(
  post: ResearchPost | InsightPost,
  type: 'research' | 'insight',
): ContentSentiment {
  const text         = getTextToScore(post);
  const bullSignals  = extractSignals(text, BULLISH_KEYWORDS);
  const bearSignals  = extractSignals(text, BEARISH_KEYWORDS);
  const bullCount    = bullSignals.length;
  const bearCount    = bearSignals.length;

  let sentiment: 'bullish' | 'bearish' | 'neutral';
  if (bullCount > bearCount + 2)      sentiment = 'bullish';
  else if (bearCount > bullCount + 2) sentiment = 'bearish';
  else                                 sentiment = 'neutral';

  const signals = sentiment === 'bullish'
    ? bullSignals
    : sentiment === 'bearish'
      ? bearSignals
      : [...bullSignals, ...bearSignals];

  return {
    slug:      post.slug,
    type,
    sector:    ('sector' in post ? post.sector : 'General') as string,
    sentiment,
    signals:   [...new Set(signals)],
  };
}

// ─── Sector Consensus ─────────────────────────────────────────────────────────

export function getSectorConsensus(sector: string): SectorConsensus {
  const allResearch = getAllResearch()
    .filter((p) => p.sector === sector)
    .slice(0, 10);
  const allInsights = getAllInsights()
    .filter((p) => {
      // InsightPost has no sector — include all if sector === 'General', else skip
      return sector === 'General';
    })
    .slice(0, 10);

  const scored = [
    ...allResearch.map((p) => scoreContentSentiment(p, 'research')),
    ...allInsights.map((p) => scoreContentSentiment(p, 'insight')),
  ];

  const total       = scored.length;
  const bullishCount = scored.filter((s) => s.sentiment === 'bullish').length;
  const bearishCount = scored.filter((s) => s.sentiment === 'bearish').length;

  const temperature  = total === 0 ? 50 : Math.round((bullishCount / total) * 100);

  let label: string;
  if      (temperature > 80) label = 'EXTREME BULL — Contrarian caution warranted';
  else if (temperature > 65) label = 'CONSENSUS BULL';
  else if (temperature < 20) label = 'EXTREME BEAR — Contrarian opportunity watch';
  else if (temperature < 35) label = 'CONSENSUS BEAR';
  else                        label = 'MIXED SIGNALS';

  // Contrarian signals: top bearish if bull consensus, top bullish if bear consensus
  const allBearSignals  = scored.flatMap((s) => s.sentiment === 'bearish' ? s.signals : []);
  const allBullSignals  = scored.flatMap((s) => s.sentiment === 'bullish' ? s.signals : []);
  const contrarian = temperature > 65
    ? [...new Set(allBearSignals)].slice(0, 3)
    : [...new Set(allBullSignals)].slice(0, 3);

  return { sector, temperature, label, contrarian, bullishCount, bearishCount, total };
}

// ─── All-Sector Overview ──────────────────────────────────────────────────────

export const TRACKED_SECTORS = [
  'Quick Commerce',
  'Fintech',
  'EV',
  'Food Delivery',
  'SaaS',
  'D2C',
  'Healthcare',
  'EdTech',
] as const;

export function getAllSectorConsensus(): SectorConsensus[] {
  return TRACKED_SECTORS.map((s) => getSectorConsensus(s));
}
