// FILE: app/tracker/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSectorConsensus } from '@/lib/sentimentEngine';

export const metadata: Metadata = {
  title: 'Sector Intelligence Trackers | FinNexus Lab',
  description: 'Live data and insights across 8+ Indian market sectors. Updated quarterly with comprehensive market intelligence.',
};

const TRACKERS = [
  { slug: 'quick-commerce', name: 'Quick Commerce', headline: 'Dark store networks expanding rapidly with ₹1T+ annual GMV potential', lastUpdated: 'Q1 2026', metrics: ['Gross Order Value', 'Dark Store Count', 'Market Concentration'], trend: 'up' as const, icon: '⚡' },
  { slug: 'fintech',        name: 'Fintech',        headline: 'Digital payments penetration reaches 80% with UPI dominance',         lastUpdated: 'Q1 2026', metrics: ['Transaction Volume', 'Active Users', 'Regulatory Changes'],            trend: 'up' as const, icon: '💳' },
  { slug: 'ev',             name: 'EV',             headline: 'Two-wheeler EV sales surge 300% YoY with policy tailwinds',           lastUpdated: 'Q1 2026', metrics: ['Vehicle Sales', 'Charging Infrastructure', 'Battery Costs'],           trend: 'up' as const, icon: '🔋' },
  { slug: 'food-delivery',  name: 'Food Delivery',  headline: 'Platform economics stabilizing with focus on profitability',          lastUpdated: 'Q1 2026', metrics: ['Order Volume', 'Merchant Economics', 'Delivery Times'],             trend: 'flat' as const, icon: '🍕' },
  { slug: 'saas',           name: 'SaaS',           headline: 'Enterprise adoption accelerating with cloud migration trends',        lastUpdated: 'Q1 2026', metrics: ['ARR Growth', 'Customer Acquisition', 'Churn Rates'],                trend: 'up' as const, icon: '☁️' },
  { slug: 'd2c',            name: 'D2C Brands',     headline: 'Direct-to-consumer models capturing 15% of retail market share',    lastUpdated: 'Q1 2026', metrics: ['Market Share', 'Customer LTV', 'Brand Performance'],              trend: 'up' as const, icon: '🛍️' },
  { slug: 'healthcare',     name: 'HealthTech',     headline: 'Digital health adoption grows 250% with telemedicine boom',          lastUpdated: 'Q1 2026', metrics: ['User Adoption', 'Funding Rounds', 'Regulatory Updates'],           trend: 'up' as const, icon: '🏥' },
  { slug: 'edtech',         name: 'EdTech',         headline: 'Online learning market reaches ₹50K Cr with hybrid models',          lastUpdated: 'Q1 2026', metrics: ['Student Enrollment', 'Platform Growth', 'Content Quality'],       trend: 'flat' as const, icon: '📚' },
];

// Sector name map (tracker slug → sentiment engine sector name)
const SECTOR_NAME_MAP: Record<string, string> = {
  'quick-commerce': 'Quick Commerce',
  'fintech':        'Fintech',
  'ev':             'EV',
  'food-delivery':  'Food Delivery',
  'saas':           'SaaS',
  'd2c':            'D2C',
  'healthcare':     'Healthcare',
  'edtech':         'EdTech',
};

function TrendArrow({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  const arrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
  const color  = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500';
  return <span className={`text-lg ${color}`}>{arrow}</span>;
}

function ConsensusBadge({ sectorSlug }: { sectorSlug: string }) {
  const sectorName = SECTOR_NAME_MAP[sectorSlug] ?? sectorSlug;
  const consensus  = getSectorConsensus(sectorName);

  const color =
    consensus.temperature > 80 ? '#22c55e' :
    consensus.temperature > 65 ? '#86efac' :
    consensus.temperature < 20 ? '#ef4444' :
    consensus.temperature < 35 ? '#fca5a5' :
    '#94a3b8';

  const shortLabel = consensus.label.split(' — ')[0];

  return (
    <div
      className="flex items-center gap-1.5 mt-2 px-2 py-1 rounded-md text-[10px] font-semibold"
      style={{ background: `${color}18`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
      {consensus.temperature}° · {shortLabel}
    </div>
  );
}

export default function TrackerIndexPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-brand-teal font-medium mb-4">Sector Intelligence Trackers</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Live Market Intelligence
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Live data updated quarterly across 8+ Indian market sectors.
            Comprehensive insights on trends, metrics, and competitive dynamics.
          </p>
          <div className="mt-6">
            <Link
              href="/radar"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-white border border-teal-800 hover:border-teal-400 px-5 py-2 rounded-full transition-all"
            >
              📡 View Contrarian Signal Radar →
            </Link>
          </div>
        </div>
      </section>

      {/* Trackers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRACKERS.map((tracker) => (
              <Link
                key={tracker.slug}
                href={`/tracker/${tracker.slug}`}
                id={`tracker-card-${tracker.slug}`}
                className="card p-5 cursor-pointer hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{tracker.icon}</span>
                  <TrendArrow trend={tracker.trend} />
                </div>

                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  {tracker.name}
                </h3>

                <p className="text-sm text-brand-slate mb-3 leading-relaxed flex-1">
                  {tracker.headline}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {tracker.metrics.map((metric, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Consensus temperature badge */}
                <ConsensusBadge sectorSlug={tracker.slug} />

                <div className="flex items-center justify-between mt-3">
                  <span className="text-[11px] text-gray-400">
                    Last updated: {tracker.lastUpdated}
                  </span>
                  <span className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded">
                    🔒 Pro
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}