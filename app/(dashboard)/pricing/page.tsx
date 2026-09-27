// FILE: app/(dashboard)/pricing/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroBackground from '@/components/ui/HeroBackground';
import {
  PLAN_CATALOG,
  getPlanDefinition,
  getPlanPricing,
  type PlanId,
} from '@/lib/entitlements';

export const metadata: Metadata = {
  title: 'Pricing | Kunwar Analytics',
  description: 'Simple, transparent pricing for financial intelligence. Start free and upgrade as you grow.',
};

/** Presentation-only styling per plan; commercial + feature data comes from the catalog. */
const PLAN_STYLES: Record<PlanId, { color: string; accent: string; recommended?: boolean }> = {
  FREE: { color: 'bg-gray-50', accent: 'text-gray-700' },
  PRO: { color: 'bg-teal-50', accent: 'text-teal-800', recommended: true },
  ELITE: { color: 'bg-purple-50', accent: 'text-purple-800' },
  TEAM: { color: 'bg-amber-50', accent: 'text-amber-800' },
  ENTERPRISE: { color: 'bg-slate-50', accent: 'text-slate-800' },
};

/**
 * The pricing grid is generated from `lib/entitlements` so the public page can
 * never drift from the plans used for authorization. Annual/quarterly billing is
 * a billing option on the Pro plan, not a separate entitlement.
 */
const PLANS = (Object.keys(PLAN_CATALOG) as PlanId[]).map((id) => {
  const plan = getPlanDefinition(id);
  const pricing = getPlanPricing(id);
  const style = PLAN_STYLES[id];
  return {
    id,
    name: plan.name,
    price: pricing.price,
    period: pricing.period,
    description: pricing.description,
    cta: pricing.cta,
    href: pricing.href,
    features: plan.benefits,
    ...style,
  };
});

const FAQS = [
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won\'t be charged for the next cycle.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), UPI, and bank transfers. All payments are processed securely through our payment partners.',
  },
  {
    question: 'What is the API access included in Pro plans?',
    answer: 'Pro subscribers get access to our REST API for programmatic access to research data, market insights, and analytical tools. The API includes 100 requests per day with higher limits available for Elite plans.',
  },
  {
    question: 'Can I get a refund if I\'m not satisfied?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not completely satisfied with our service, contact our support team within 30 days of your first payment for a full refund.',
  },
  {
    question: 'Is there a student or academic discount?',
    answer: 'Yes! We offer 50% off for verified students and academic institutions. Contact our team with your academic credentials to apply for the discount.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-navy py-20 text-center">
        <HeroBackground />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <p className="text-brand-teal font-medium mb-4">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`card border p-7 flex flex-col ${plan.color} ${plan.recommended ? 'ring-2 ring-brand-teal' : ''
                  }`}
              >
                {plan.recommended && (
                  <div className="text-center mb-4">
                    <span className="inline-block bg-brand-teal text-white text-sm font-medium px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold ${plan.accent} mb-2`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className={`text-4xl font-bold ${plan.accent}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${plan.accent} ml-1`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
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

                <div className="mt-auto">
                  <Link
                    href={plan.href}
                    className={`w-full text-center block ${plan.recommended ? 'btn-primary' : 'btn-outline'
                      }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-brand-silver py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-brand-navy mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((faq, index) => (
              <div key={index} className="card p-5">
                <h3 className="text-lg font-bold text-brand-navy mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="bg-brand-navy py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a team or enterprise plan?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Custom solutions for large teams and enterprises with advanced features and dedicated support.
          </p>
          <Link href="/enterprise" className="btn-white">
            Learn About Enterprise
          </Link>
        </div>
      </section>
    </div>
  );
}