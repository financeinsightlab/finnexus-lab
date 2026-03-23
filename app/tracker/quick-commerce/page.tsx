// FILE: app/tracker/quick-commerce/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quick Commerce Sector Tracker | FinNexus Lab',
  description: 'Comprehensive data and insights on India\'s quick commerce sector. Track dark stores, GMV growth, and competitive dynamics.',
};

const PUBLIC_METRICS = [
  {
    label: 'Gross Order Value',
    value: '₹1,12,000 Cr',
    unit: 'annualised',
    change: '+55% YoY',
    changeType: 'up' as const,
  },
  {
    label: 'Dark Stores (Blinkit+Zepto+Instamart)',
    value: '4,200+',
    unit: 'operational',
    change: '+180% YoY',
    changeType: 'up' as const,
  },
  {
    label: 'Combined Market Share Top 3',
    value: '95%+',
    unit: 'of total market',
    change: 'stable',
    changeType: 'flat' as const,
  },
];

const SUBSCRIBER_METRICS = [
  { label: 'Blinkit Contribution Margin %', locked: true },
  { label: 'Zepto EBITDA Trajectory', locked: true },
  { label: 'Average Order Value by Platform', locked: true },
  { label: 'Delivery Cost per Order', locked: true },
];

function ChangeBadge({ change, changeType }: { change: string; changeType: 'up' | 'down' | 'flat' }) {
  const bgColor = changeType === 'up' ? 'bg-green-100' : changeType === 'down' ? 'bg-red-100' : 'bg-gray-100';
  const textColor = changeType === 'up' ? 'text-green-800' : changeType === 'down' ? 'text-red-800' : 'text-gray-800';

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${bgColor} ${textColor}`}>
      {change}
    </span>
  );
}

export default function QuickCommerceTrackerPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-brand-teal font-medium mb-4">Quick Commerce</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ⚡ Quick Commerce Tracker
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="bg-brand-teal text-white text-sm font-medium px-3 py-1 rounded-full">
              Data as of Q1 2026
            </span>
            <span className="text-gray-300 text-sm">
              Updated quarterly
            </span>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track India's fastest-growing retail segment with comprehensive data on dark stores,
            order volumes, competitive dynamics, and profitability metrics.
          </p>
        </div>
      </section>

      {/* Public Metrics */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="section-label mb-8">Public Metrics</p>
          <div className="grid gap-6 md:grid-cols-3">
            {PUBLIC_METRICS.map((metric, index) => (
              <div key={index} className="card p-6 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                  {metric.label}
                </p>
                <p className="text-4xl font-bold text-brand-navy mb-2">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {metric.unit}
                </p>
                <ChangeBadge change={metric.change} changeType={metric.changeType} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscriber Gate */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            <div className="bg-brand-silver rounded-xl p-8 overflow-hidden">
              <h3 className="text-2xl font-bold text-brand-navy mb-6">
                Subscriber Metrics
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {SUBSCRIBER_METRICS.map((metric, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-gray-400">🔒</span>
                    <span className="text-gray-700">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/70 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h4 className="text-xl font-bold text-brand-navy mb-2">
                  Unlock with Pro Subscription
                </h4>
                <p className="text-gray-600 mb-6 max-w-md">
                  Get access to detailed profitability metrics, competitive analysis,
                  and quarterly trend reports for the quick commerce sector.
                </p>
                <Link href="/pricing" className="btn-primary">
                  Subscribe from ₹999/month →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}