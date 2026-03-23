// FILE: app/enterprise/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise & B2B Solutions | FinNexus Lab',
  description: 'Research intelligence for organizations. Enterprise licenses, team plans, and B2B solutions with dedicated support and custom research capabilities.',
};

const PLANS = [
  {
    name: 'Team',
    price: '₹3,999',
    period: '/month',
    seats: 'up to 5 seats',
    features: [
      'All Pro features × 5 users',
      'Team dashboard & analytics',
      'Priority customer support',
      'Team usage reports',
      'Quarterly business reviews',
    ],
    cta: 'Contact for Team',
    href: '/contact?service=Team',
  },
  {
    name: 'Professional',
    price: '₹9,999',
    period: '/month',
    seats: 'up to 15 seats',
    features: [
      'Everything in Team',
      '1 custom research request per quarter',
      'Quarterly strategy consultation call',
      'Advance sector briefings (48h)',
      'Dedicated Slack channel',
    ],
    cta: 'Contact for Professional',
    href: '/contact?service=Professional',
  },
  {
    name: 'Enterprise',
    price: '₹24,999',
    period: '/month',
    seats: 'unlimited seats',
    recommended: true,
    features: [
      'Everything in Professional',
      '2 custom research requests per month',
      'Dedicated account manager',
      'API Professional (10,000 req/day)',
      'Contractual SLA guarantee',
      'Custom integrations available',
    ],
    cta: 'Contact for Enterprise',
    href: '/contact?service=Enterprise',
  },
  {
    name: 'API Only',
    price: '₹4,999',
    period: '/month',
    seats: 'N/A',
    features: [
      'API Professional access',
      'Full sector tracker data',
      'No-attribution commercial license',
      'JSON/CSV data exports',
      'Real-time webhook notifications',
    ],
    cta: 'Contact for API',
    href: '/contact?service=API',
  },
];

const B2B_BENEFITS = [
  {
    icon: '👨‍💼',
    title: 'Dedicated Account Manager',
    description: 'Single point of contact for all your research and intelligence needs.',
  },
  {
    icon: '🔬',
    title: 'Custom Research Requests',
    description: 'Bespoke research reports tailored to your specific business questions.',
  },
  {
    icon: '📊',
    title: 'Team Dashboard & Analytics',
    description: 'Comprehensive usage analytics and team performance insights.',
  },
  {
    icon: '⚡',
    title: 'Priority API Access',
    description: 'Higher rate limits and priority processing for time-sensitive requests.',
  },
  {
    icon: '📈',
    title: 'Advance Sector Briefings',
    description: 'Early access to sector updates and market intelligence briefings.',
  },
  {
    icon: '🤝',
    title: 'Contractual SLA',
    description: 'Guaranteed response times and service level agreements.',
  },
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-brand-teal font-medium mb-4">Enterprise & B2B</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Research Intelligence for Organizations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fixed pricing. Clear deliverables. One point of contact.
          </p>
        </div>
      </section>

      {/* Why Enterprise */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Why Choose Enterprise?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dedicated support, custom research, and enterprise-grade features
              designed for teams and organizations that need reliable market intelligence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {B2B_BENEFITS.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Enterprise Pricing Plans
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your organization's needs and scale.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`card p-6 flex flex-col ${
                  plan.recommended ? 'ring-2 ring-brand-teal' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="text-center mb-4">
                    <span className="bg-brand-teal text-white text-xs font-medium px-2.5 py-1 rounded-md">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${
                    plan.recommended ? 'text-brand-teal' : 'text-brand-navy'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-1">
                    <span className={`text-3xl font-bold ${
                      plan.recommended ? 'text-brand-teal' : 'text-brand-navy'
                    }`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-600 text-sm ml-1">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{plan.seats}</p>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-brand-teal mt-0.5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className="btn-primary w-full text-center"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-navy py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want a custom quote or a demo?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact our enterprise team to discuss custom solutions for your organization.
          </p>
          <Link href="/contact" className="btn-white">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}