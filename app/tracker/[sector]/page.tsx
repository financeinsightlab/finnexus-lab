import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSectorConsensus } from '@/lib/sentimentEngine';
import { getAllResearch } from '@/lib/content';

// ─── Sector registry ──────────────────────────────────────────────────────────

const SECTOR_META: Record<
  string,
  {
    name:       string;
    icon:       string;
    headline:   string;
    updatedAt:  string;
    publicMetrics: { label: string; value: string; unit: string; change: string; changeType: 'up' | 'down' | 'flat' }[];
    lockedMetrics: string[];
    subSectors?: { name: string; share: string; growth: string; keyPlayers: string[] }[];
    marketTrends?: { trend: string; impact: 'High' | 'Medium' | 'Low'; description: string }[];
    regulatoryUpdates?: { update: string; date: string; status: 'Implemented' | 'Pending' | 'Planned' }[];
    futureOutlook?: {
      marketSize2027: string;
      cagr: string;
      keyDrivers: string[];
      risks: string[];
    };
  }
> = {
  'quick-commerce': {
    name:      'Quick Commerce',
    icon:      '⚡',
    headline:  'Dark store networks expanding rapidly with ₹1T+ annual GMV potential',
    updatedAt: 'Q1 2026',
    publicMetrics: [
      { label: 'Gross Order Value', value: '₹1,12,000 Cr', unit: 'annualised', change: '+55% YoY', changeType: 'up' },
      { label: 'Dark Stores (Top 3)', value: '4,200+', unit: 'operational', change: '+180% YoY', changeType: 'up' },
      { label: 'Market Share Top 3', value: '95%+', unit: 'of total market', change: 'stable', changeType: 'flat' },
    ],
    lockedMetrics: ['Blinkit Contribution Margin %', 'Zepto EBITDA Trajectory', 'Average Order Value', 'Delivery Cost per Order'],
  },
  'fintech': {
    name:      'Fintech',
    icon:      '💳',
    headline:  'Digital payments penetration reaches 80% with UPI dominance — $1.3T market by 2027',
    updatedAt: 'Q1 2026',
    publicMetrics: [
      { label: 'UPI Monthly Transactions', value: '18.4B', unit: 'transactions/month', change: '+48% YoY', changeType: 'up' },
      { label: 'Digital Payments Penetration', value: '80%', unit: 'of retail', change: '+15pp YoY', changeType: 'up' },
      { label: 'Fintech Funding', value: '$2.1B', unit: 'FY25 total', change: '-12% YoY', changeType: 'down' },
      { label: 'Neobank Users', value: '45M', unit: 'active users', change: '+85% YoY', changeType: 'up' },
      { label: 'Insurtech Premiums', value: '₹12,500 Cr', unit: 'annual', change: '+62% YoY', changeType: 'up' },
      { label: 'Wealthtech AUM', value: '₹8,200 Cr', unit: 'assets under mgmt', change: '+110% YoY', changeType: 'up' },
    ],
    lockedMetrics: [
      'Per-Transaction Revenue by Platform',
      'BNPL Default Rates by Quarter',
      'Neobank CAC vs LTV Trends',
      'Payment Gateway Market Share',
      'Lending Fintech NIM Analysis',
      'Regulatory Compliance Costs',
      'Customer Acquisition Channels ROI'
    ],
    subSectors: [
      { name: 'Payments', share: '45%', growth: '+35% YoY', keyPlayers: ['PhonePe', 'Google Pay', 'Paytm', 'Razorpay'] },
      { name: 'Lending', share: '28%', growth: '+22% YoY', keyPlayers: ['Lendingkart', 'Capital Float', 'KreditBee', 'ZestMoney'] },
      { name: 'Insurtech', share: '12%', growth: '+62% YoY', keyPlayers: ['Policybazaar', 'Acko', 'Digit', 'Coverfox'] },
      { name: 'Wealthtech', share: '8%', growth: '+110% YoY', keyPlayers: ['Zerodha', 'Groww', 'Upstox', 'Smallcase'] },
      { name: 'Neobanking', share: '7%', growth: '+85% YoY', keyPlayers: ['Jupiter', 'Fi', 'Niyo', 'Open'] },
    ],
    marketTrends: [
      { trend: 'UPI 2.0 Adoption', impact: 'High', description: 'Credit on UPI driving new revenue streams' },
      { trend: 'Regulatory Sandbox Expansion', impact: 'Medium', description: 'RBI expanding testing frameworks' },
      { trend: 'Consolidation in Lending', impact: 'High', description: 'M&A activity increasing as funding tightens' },
      { trend: 'Cross-border Payments Growth', impact: 'Medium', description: 'International UPI gaining traction' },
    ],
    regulatoryUpdates: [
      { update: 'RBI Digital Lending Guidelines', date: 'Dec 2025', status: 'Implemented' },
      { update: 'DPDPA Compliance Deadline', date: 'Mar 2026', status: 'Pending' },
      { update: 'CBDC Pilot Expansion', date: 'Q2 2026', status: 'Planned' },
    ],
    futureOutlook: {
      marketSize2027: '$1.3T',
      cagr: '22%',
      keyDrivers: ['UPI innovation', 'Financial inclusion', 'API banking', 'AI-driven underwriting'],
      risks: ['Regulatory changes', 'Cybersecurity threats', 'Funding winter', 'Profitability pressure'],
    },
  },
  'ev': {
    name:      'Electric Vehicles',
    icon:      '🔋',
    headline:  'Two-wheeler EV sales surge 300% YoY with strong policy tailwinds',
    updatedAt: 'Q1 2026',
    publicMetrics: [
      { label: '2W EV Sales', value: '1.2M units', unit: 'FY25', change: '+300% YoY', changeType: 'up' },
      { label: 'EV Market Share (2W)', value: '8.3%', unit: 'of total 2W market', change: '+5pp YoY', changeType: 'up' },
      { label: 'Charging Points', value: '25,000+', unit: 'public chargers', change: '+120% YoY', changeType: 'up' },
    ],
    lockedMetrics: ['Battery Cost per kWh Trends', 'Ola vs Ather Market Share', 'FAME III Subsidy Impact'],
  },
  'food-delivery': {
    name:      'Food Delivery',
    icon:      '🍕',
    headline:  'Platform economics stabilizing with sharp focus on contribution margins',
    updatedAt: 'Q1 2026',
    publicMetrics: [
      { label: 'Gross Order Value', value: '₹35,000 Cr', unit: 'annualised', change: '+22% YoY', changeType: 'up' },
      { label: 'Zomato Contribution Margin', value: '+4.8%', unit: 'Q3 FY26', change: 'turning positive', changeType: 'up' },
      { label: 'Platform Market Share', value: '55/42%', unit: 'Swiggy/Zomato', change: 'stable', changeType: 'flat' },
    ],
    lockedMetrics: ['Commission Rate Trends', 'Restaurant Profitability', 'Delivery Partner Economics'],
  },
  'saas': {
    name:      'SaaS',
    icon:      '☁️',
    headline:  'Enterprise cloud adoption accelerating — $25B Indian SaaS market by 2027',
    updatedAt: 'Q1 2026',
    publicMetrics: [
      { label: 'Indian SaaS Revenue', value: '$13B', unit: 'FY25', change: '+35% YoY', changeType: 'up' },
      { label: 'SaaS Unicorns', value: '12', unit: 'as of 2025', change: '+3 YoY', changeType: 'up' },
      { label: 'Cloud Adoption Rate', value: '68%', unit: 'enterprise segment', change: '+18pp YoY', changeType: 'up' },
    ],
    lockedMetrics: ['Churn Rate Benchmarks', 'NRR by Segment', 'ARR Multiple Trends'],
  },
  'd2c': {
    name:      'D2C Brands',
    icon:      '🛍️',
    headline:  'Direct-to-consumer capturing 15% of retail — profitability the new battleground',
    updatedAt: 'Q1 2026',
    publicMetrics: [
      { label: 'D2C Market Size', value: '₹55,000 Cr', unit: 'FY25', change: '+40% YoY', changeType: 'up' },
      { label: 'D2C Market Share', value: '15%', unit: 'of organized retail', change: '+4pp YoY', changeType: 'up' },
      { label: 'EBITDA+ D2C Brands', value: '38%', unit: 'of tracked universe', change: '+12pp YoY', changeType: 'up' },
    ],
    lockedMetrics: ['Customer LTV by Category', 'ROAS Benchmarks', 'Offline Expansion Metrics'],
  },
  'healthcare': {
    name:      'HealthTech',
    icon:      '🏥',
    headline:  'Digital health adoption surges — ₹35,000 Cr addressable market by 2026',
    updatedAt: 'Q1 2026',
    publicMetrics: [
      { label: 'Digital Health Users', value: '280M', unit: 'active users', change: '+65% YoY', changeType: 'up' },
      { label: 'Telemedicine Consultations', value: '450M', unit: 'FY25', change: '+110% YoY', changeType: 'up' },
      { label: 'HealthTech Funding', value: '$1.8B', unit: 'FY25', change: '+22% YoY', changeType: 'up' },
    ],
    lockedMetrics: ['Unit Economics by Sub-segment', 'Insurance Penetration', 'Hospital Digitization Rate'],
  },
  'edtech': {
    name:      'EdTech',
    icon:      '📚',
    headline:  'Online learning stabilizing post-BYJU\'s — hybrid models emerging as winners',
    updatedAt: 'Q1 2026',
    publicMetrics: [
      { label: 'Online Learning Market', value: '₹50,000 Cr', unit: 'FY25', change: '+18% YoY', changeType: 'up' },
      { label: 'Active EdTech Users', value: '90M', unit: 'monthly', change: '+8% YoY', changeType: 'flat' },
      { label: 'Completion Rate (avg)', value: '22%', unit: 'across platforms', change: '-3pp YoY', changeType: 'down' },
    ],
    lockedMetrics: ['Cohort Retention by Platform', 'K-12 vs Higher Ed Split', 'Enterprise L&D Market'],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugToSectorName(slug: string): string {
  return SECTOR_META[slug]?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function temperatureColor(label: string) {
  if (label.startsWith('EXTREME BULL'))   return '#22c55e';
  if (label.startsWith('CONSENSUS BULL')) return '#16a34a';
  if (label.startsWith('EXTREME BEAR'))   return '#ef4444';
  if (label.startsWith('CONSENSUS BEAR')) return '#dc2626';
  return '#64748b';
}

function ChangeBadge({ change, changeType }: { change: string; changeType: 'up' | 'down' | 'flat' }) {
  const styles = {
    up:   'bg-green-100 text-green-800',
    down: 'bg-red-100 text-red-800',
    flat: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles[changeType]}`}>
      {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '→'} {change}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ sector: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sector } = await params;
  const meta = SECTOR_META[sector];
  if (!meta) return { title: 'Sector Tracker | Kunwar Analytics' };
  return {
    title: `${meta.name} Sector Tracker | Kunwar Analytics`,
    description: meta.headline,
  };
}

export async function generateStaticParams() {
  return Object.keys(SECTOR_META).map((sector) => ({ sector }));
}

export default async function SectorTrackerPage({ params }: Props) {
  const { sector } = await params;
  const meta = SECTOR_META[sector];
  if (!meta) notFound();

  // Consensus data from sentiment engine
  const consensus = getSectorConsensus(meta.name);
  const dotColor  = temperatureColor(consensus.label);

  // Related research
  const relatedResearch = getAllResearch()
    .filter((p) => p.sector === meta.name)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ─── Header ─── */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/tracker" className="text-brand-teal text-sm mb-8 block hover:underline">
            ← All Trackers
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-brand-teal font-medium mb-2">{meta.icon} {meta.name}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 max-w-2xl leading-tight">
                {meta.name} Sector Tracker
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl">{meta.headline}</p>
              <div className="flex gap-3 mt-4 flex-wrap">
                <span className="bg-brand-teal text-white text-sm font-medium px-3 py-1 rounded-full">
                  Data as of {meta.updatedAt}
                </span>
                <span className="text-gray-400 text-sm py-1">Updated quarterly</span>
              </div>
            </div>

            {/* Consensus Badge */}
            <div
              className="rounded-2xl border px-6 py-4 text-center flex-shrink-0"
              style={{
                background:   `${dotColor}12`,
                borderColor:  `${dotColor}30`,
              }}
            >
              <p className="text-2xl font-extrabold" style={{ color: dotColor }}>
                {consensus.temperature}°
              </p>
              <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: dotColor }}>
                {consensus.label.split(' — ')[0]}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">Consensus Temperature</p>
              {consensus.contrarian[0] && (
                <p className="text-[11px] text-amber-400 mt-2 max-w-[160px] italic">
                  ⚡ Ignored: <span className="capitalize">{consensus.contrarian[0]}</span>
                </p>
              )}
              <Link
                href="/radar"
                className="text-[11px] text-gray-500 hover:text-brand-teal block mt-2"
              >
                View full radar →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Public Metrics ─── */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="section-label mb-6">Public Metrics</p>
          <div className="grid gap-5 md:grid-cols-3">
            {meta.publicMetrics.map((m, i) => (
              <div key={i} className="card p-6 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{m.label}</p>
                <p className="text-4xl font-extrabold text-brand-navy mb-1">{m.value}</p>
                <p className="text-sm text-gray-500 mb-3">{m.unit}</p>
                <ChangeBadge change={m.change} changeType={m.changeType} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sub‑Sector Breakdown (Fintech‑specific) ─── */}
      {meta.subSectors && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <p className="section-label mb-6">Sub‑Sector Breakdown</p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {meta.subSectors.map((sub, i) => (
                <div key={i} className="card p-5 text-center">
                  <h4 className="font-bold text-brand-navy mb-2">{sub.name}</h4>
                  <p className="text-3xl font-extrabold text-brand-teal mb-1">{sub.share}</p>
                  <p className="text-xs text-gray-500 mb-3">Market Share</p>
                  <div className="text-sm text-gray-700 mb-3">
                    <span className="font-semibold">Growth:</span> {sub.growth}
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 mb-2">Key Players:</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {sub.keyPlayers.slice(0, 3).map((player, idx) => (
                        <li key={idx} className="truncate">• {player}</li>
                      ))}
                      {sub.keyPlayers.length > 3 && (
                        <li className="text-gray-500">+{sub.keyPlayers.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Market Trends ─── */}
      {meta.marketTrends && (
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <p className="section-label mb-6">Market Trends</p>
            <div className="grid gap-5 md:grid-cols-2">
              {meta.marketTrends.map((trend, i) => (
                <div key={i} className="card p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-brand-navy">{trend.trend}</h4>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      trend.impact === 'High' ? 'bg-red-100 text-red-800' :
                      trend.impact === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {trend.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{trend.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Regulatory Updates ─── */}
      {meta.regulatoryUpdates && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <p className="section-label mb-6">Regulatory Updates</p>
            <div className="space-y-4">
              {meta.regulatoryUpdates.map((update, i) => (
                <div key={i} className="card p-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-brand-navy mb-1">{update.update}</h4>
                    <p className="text-sm text-gray-500">Expected: {update.date}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    update.status === 'Implemented' ? 'bg-green-100 text-green-800' :
                    update.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {update.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Future Outlook ─── */}
      {meta.futureOutlook && (
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <p className="section-label mb-6">Future Outlook (2027)</p>
            <div className="card p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-brand-navy mb-4">Projections</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">Market Size</span>
                      <span className="font-bold text-2xl text-brand-teal">{meta.futureOutlook.marketSize2027}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-600">CAGR (2024‑27)</span>
                      <span className="font-bold text-xl text-green-600">{meta.futureOutlook.cagr}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy mb-4">Key Drivers & Risks</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-green-700 mb-2">Drivers</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {meta.futureOutlook.keyDrivers.map((driver, i) => (
                          <li key={i}>• {driver}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-700 mb-2">Risks</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {meta.futureOutlook.risks.map((risk, i) => (
                          <li key={i}>• {risk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Subscriber Gate ─── */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            <div className="bg-brand-silver rounded-2xl p-8">
              <h3 className="text-xl font-bold text-brand-navy mb-5">Subscriber Metrics</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {meta.lockedMetrics.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-600">
                    <span>🔒</span><span className="text-sm">{m}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 backdrop-blur-sm bg-white/75 flex items-center justify-center rounded-2xl">
              <div className="text-center px-6">
                <div className="text-5xl mb-4">🔒</div>
                <h4 className="text-xl font-bold text-brand-navy mb-2">Unlock with Pro</h4>
                <p className="text-gray-600 mb-6 max-w-sm text-sm">
                  Deep-dive profitability metrics, competitive benchmarks, and quarterly trend data.
                </p>
                <Link href="/pricing" className="btn-primary">
                  Subscribe from ₹999/month →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Related Research ─── */}
      {relatedResearch.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <p className="section-label mb-6">Related Research</p>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedResearch.map((post) => (
                <Link
                  key={post.slug}
                  href={`/research/${post.slug}`}
                  className="card p-5 hover:shadow-lg transition-shadow"
                >
                  <p className="text-xs text-brand-teal font-bold uppercase tracking-widest mb-2">
                    {post.sector}
                  </p>
                  <h3 className="text-sm font-bold text-brand-navy leading-snug mb-1 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400">{post.date.slice(0, 10)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
