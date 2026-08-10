// ─────────────────────────────────────────────────────────────────────────────
// Sector Intelligence Tracker — central data model (multi-quarter)
// SINGLE SOURCE OF TRUTH for /tracker, /tracker/[sector], and the radar.
// ─────────────────────────────────────────────────────────────────────────────

export type Direction = 'up' | 'down' | 'flat';
export type Impact = 'High' | 'Medium' | 'Low';
export type Status = 'Implemented' | 'Pending' | 'Planned';

export interface QuarterRef {
  key: string;    // 'Q1-2026'
  label: string;  // 'Q1 2026'
  year: number;
  quarter: number;
  kind: 'Actual' | 'Projection';
}

export const QUARTERS: QuarterRef[] = [
  { key: 'Q1-2026', label: 'Q1 2026', year: 2026, quarter: 1, kind: 'Actual' },
  { key: 'Q2-2026', label: 'Q2 2026', year: 2026, quarter: 2, kind: 'Actual' },
  { key: 'Q3-2026', label: 'Q3 2026', year: 2026, quarter: 3, kind: 'Projection' },
  { key: 'Q4-2026', label: 'Q4 2026', year: 2026, quarter: 4, kind: 'Projection' },
];

export function getQuarterByKey(key?: string): QuarterRef {
  return QUARTERS.find((q) => q.key === key) ?? QUARTERS[0];
}

export interface KpiMetric {
  label: string;
  value: string;
  suffix?: string;
  change: string;
  changeType: Direction;
  sparkline: number[];
}

export interface SectorQuarter {
  temperature: number;
  consensus: string;
  headline: string;
  keyMetrics: KpiMetric[];
}

export interface SubSector { name: string; share: number; growth: string; cagr?: string; players: string[]; }
export interface CompetitiveItem { player: string; rank: number; metric: string; value: string; trend: Direction; note: string; }
export interface MarketTrend { title: string; impact: Impact; direction: Direction; description: string; }
export interface RegulatoryItem { title: string; date: string; status: Status; description: string; }
export interface SwotSet { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[]; }
export interface Outlook { marketSize2027: string; cagr: string; projection: { year: string; value: number }[]; drivers: string[]; risks: string[]; }
export interface Catalyst { title: string; timing: string; type: 'Catalyst' | 'Watch' | 'Risk'; }
export interface ProMetric { label: string; value: string; note: string; trend: Direction; }

export interface TrackerSector {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  tagline: string;
  coverGradient: [string, string];
  thesis: string;
  quarters: Record<string, SectorQuarter>;
  subSectors: SubSector[];
  competitive: CompetitiveItem[];
  trends: MarketTrend[];
  regulatory: RegulatoryItem[];
  swot: SwotSet;
  outlook: Outlook;
  catalysts: Catalyst[];
  proMetrics: ProMetric[];
}

export function getTrackerBySlug(slug: string): TrackerSector | undefined {
  return TRACKERS.find((t) => t.slug === slug);
}

export function getQuarter(t: TrackerSector, quarterKey?: string): SectorQuarter {
  const q = getQuarterByKey(quarterKey);
  return t.quarters[q.key] ?? t.quarters[Object.keys(t.quarters)[0]];
}

export function getLatestQuarter(t: TrackerSector): SectorQuarter {
  const keys = Object.keys(t.quarters);
  return t.quarters[keys[keys.length - 1]];
}

export function getBaselineConsensus(slug: string, quarterKey?: string): { temperature: number; label: string } | null {
  const t = getTrackerBySlug(slug);
  if (!t) return null;
  const q = getQuarter(t, quarterKey);
  return { temperature: q.temperature, label: q.consensus };
}

export const SECTOR_NAME_TO_SLUG: Record<string, string> = {
  'Quick Commerce': 'quick-commerce', Fintech: 'fintech', EV: 'ev', 'Food Delivery': 'food-delivery',
  SaaS: 'saas', D2C: 'd2c', Healthcare: 'healthcare', EdTech: 'edtech',
};

export function temperatureColor(temp: number, label: string): string {
  if (label.startsWith('EXTREME BULL'))   return '#16a34a';
  if (label.startsWith('CONSENSUS BULL')) return '#22c55e';
  if (label.startsWith('EXTREME BEAR'))   return '#dc2626';
  if (label.startsWith('CONSENSUS BEAR')) return '#ef4444';
  if (temp >= 55) return '#65a30d';
  if (temp >= 45) return '#ca8a04';
  return '#64748b';
}

export function labelForTemperature(temp: number): string {
  if (temp > 80) return 'EXTREME BULL — Contrarian caution warranted';
  if (temp > 65) return 'CONSENSUS BULL';
  if (temp < 20) return 'EXTREME BEAR — Contrarian opportunity watch';
  if (temp < 35) return 'CONSENSUS BEAR';
  return 'MIXED SIGNALS';
}

export function shortLabel(label: string): string {
  return label.split(' — ')[0];
}

export function getHeatMapData(quarterKey?: string) {
  return TRACKERS.map((t) => {
    const q = getQuarter(t, quarterKey);
    return {
      slug: t.slug, name: t.shortName, icon: t.icon, tagline: t.tagline,
      temperature: q.temperature, label: shortLabel(q.consensus),
      color: temperatureColor(q.temperature, q.consensus),
      headline: q.headline, latest: getLatestQuarter(t),
    };
  });
}

import { TRACKERS } from './trackerData.data';
