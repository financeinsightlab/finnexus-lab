'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Props {
  currentPlan: string;
  signedIn: boolean;
}

export default function PricingClient({ currentPlan, signedIn }: Props) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'FREE',
      name: 'Free Access',
      badge: 'Community',
      price: '₹0',
      period: 'forever',
      description: 'Foundational insights for individual learners and casual market observers.',
      features: [
        'Public equity research & strategy notes',
        '16 interactive finance calculators',
        'Basic NSE/BSE company snapshots',
        '2 AI Mock Interview trials per session',
        'Access to plain-language finance glossary',
        'Community discussion access',
      ],
      notIncluded: [
        'AI Investment Thesis & Bull/Bear Cases',
        'Automated DCF & Sensitivity Tables',
        'Unlimited AI Interview War Room evaluations',
        'Downloadable Excel Financial Models',
        'Accounting Red Flag & Forensic Health Scores',
      ],
      cta: signedIn && currentPlan === 'FREE' ? 'Current Plan' : 'Get Started Free',
      href: signedIn ? '/company' : '/auth/signin',
      highlighted: false,
      buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
    },
    {
      id: 'PRO',
      name: 'Analyst Pro',
      badge: 'Most Popular',
      price: billingCycle === 'monthly' ? '₹999' : '₹799',
      period: '/month',
      description: 'The Bloomberg Terminal alternative for Indian finance students, equity analysts, and active investors.',
      features: [
        '⚡ Full India Company Intelligence Hub for all NSE/BSE companies',
        '🤖 AI Bull/Bear Thesis & Forensic Health Score (Ind AS compliant)',
        '🎯 Finance Interview War Room — Unlimited AI coaching (IB, PE, Equity Research, Big4)',
        '📊 Interactive DCF Valuation Studio with custom WACC & margin of safety',
        '🏢 Company-specific interview question sets (Goldman Sachs India, Kotak, Avendus)',
        '🔍 Peer Group Analysis & Sector Multiples',
        '🚀 Startup Financial Intelligence Suite — 36M P&L, Runway Engine & VC Pitch Memo',
        '📈 Pro-gated Sector Trackers & Monthly High-Conviction Research',
        '⚡ Instant UPI Access via PhonePe, Google Pay, or Paytm',
      ],
      notIncluded: [
        'Downloadable Institutional Excel & LBO models',
        '6-Round Mock Placement Day Simulation with Personal Mentor Review',
        'Priority API access for quantitative backtesting',
      ],
      cta: currentPlan === 'PRO' ? 'Current Plan' : 'Upgrade to Pro — Instant UPI',
      href: '/checkout/pro',
      highlighted: true,
      buttonStyle: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20',
    },
    {
      id: 'ELITE',
      name: 'Elite Institutional',
      badge: 'Maximum Power',
      price: billingCycle === 'monthly' ? '₹1,999' : '₹1,599',
      period: '/month',
      description: 'For investment bankers, corporate development teams, and top-tier B-school candidates targeting placement day offers.',
      features: [
        'Everything in Analyst Pro, plus:',
        '📑 Downloadable Unlocked Excel Financial Models (3-Statement + DCF)',
        '🤝 M&A Merger Model & LBO Model auto-generators for Indian deals',
        '🏛️ Full Mock Placement Day Simulator (6 comprehensive rounds)',
        '🔍 Red Flag Forensic Accounting deep scanner (Promoter pledges, related party)',
        '⚡ Multi-Company Portfolio Intelligence (track up to 25 firms simultaneously)',
        '💬 Direct WhatsApp Priority Channel for custom valuation requests',
        '🔑 REST API Access for automated research workflows',
      ],
      notIncluded: [],
      cta: currentPlan === 'ELITE' ? 'Current Plan' : 'Upgrade to Elite',
      href: '/checkout/elite',
      highlighted: false,
      buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 font-semibold',
    },
  ];

  const faqs = [
    {
      q: 'Why should I pay ₹999/month when Screener.in or YouTube is free?',
      a: 'Free platforms give raw historical numbers, but no models, no investment thesis, and no interview preparation. Kunwar Analytics gives you instant AI-driven DCF valuation with custom WACC, automated bull/bear cases, and real-time AI interview coaching graded against Indian standards (Ind AS, RBI policy, SEBI LODR) that would otherwise cost ₹25,000+ in bootcamps or ₹1.5L/month in institutional terminals.',
    },
    {
      q: 'How does payment and activation work?',
      a: 'We support instant UPI (Google Pay, PhonePe, Paytm, BHIM) via direct QR code scan and UPI ID. Once you submit your UTR / transaction ID on the checkout page, access is granted automatically to all Pro or Elite features.',
    },
    {
      q: 'Who uses the Finance Interview War Room?',
      a: 'MBA candidates at top B-schools (IIMs, ISB, XLRI, NMIMS), CA Finalists, CFA candidates, and lateral finance professionals preparing for Bulge Bracket Investment Banking, Indian Boutiques (Avendus, Kotak IB, ICICI Sec), Private Equity, and Big 4 Deal Advisory.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. Our monthly plans have zero lock-in contracts. You can upgrade, downgrade, or cancel at any time with one click from your account settings.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-brand/30 py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          💎 Institutional Quality for Every Indian Analyst
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Invest in Your Career &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
            Market Edge
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Get what global investment banks pay ₹1.5 Lakh/month for — Indian company intelligence,
          AI DCF financial modeling, and IIM-grade interview coaching — starting at ₹999/month.
        </p>

        {/* Billing cycle toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 bg-slate-800 rounded-full p-1 border border-slate-700 transition relative"
            aria-label="Toggle billing cycle"
          >
            <div
              className={`w-4 h-4 bg-amber-400 rounded-full transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-medium flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
            Annual <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">SAVE 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((p) => {
          const isCurrent = currentPlan === p.id;
          return (
            <div
              key={p.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                p.highlighted
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/80 shadow-2xl shadow-amber-500/10 md:-translate-y-2'
                  : 'bg-slate-900/70 border border-slate-800 shadow-xl'
              }`}
            >
              {/* Top Highlight Badge */}
              {p.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-md">
                  {p.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  {!p.highlighted && (
                    <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 font-medium border border-slate-700">
                      {p.badge}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white tracking-tight">{p.price}</span>
                  <span className="text-xs text-slate-400">{p.period}</span>
                </div>

                <p className="mt-3 text-xs text-slate-400 leading-relaxed min-h-[36px]">
                  {p.description}
                </p>

                <div className="w-full h-px bg-slate-800 my-6" />

                {/* Features List */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Included Capabilities
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {p.notIncluded.length > 0 && (
                    <div className="pt-3 space-y-2 text-xs text-slate-500">
                      {p.notIncluded.map((nf, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 list-none">
                          <span className="text-slate-600 font-bold shrink-0 mt-0.5">✕</span>
                          <span className="leading-snug line-through opacity-60">{nf}</span>
                        </li>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-4">
                <Link
                  href={p.href}
                  className={`w-full block py-3 px-4 rounded-xl text-center text-sm transition transform active:scale-95 ${p.buttonStyle}`}
                >
                  {isCurrent ? 'Current Plan' : p.cta}
                </Link>
                <div className="mt-2.5 text-center text-[11px] text-slate-500">
                  {p.id === 'FREE' ? 'No credit card needed' : 'Instant activation via UPI QR'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="max-w-5xl mx-auto mt-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Feature Comparison Matrix
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Compare tools and discover why India’s top finance candidates choose Pro.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 text-slate-300 font-semibold">
                <th className="p-4 sm:p-5">Platform Feature</th>
                <th className="p-4 sm:p-5 text-center">Free</th>
                <th className="p-4 sm:p-5 text-center text-amber-400 font-bold">Pro (₹999/mo)</th>
                <th className="p-4 sm:p-5 text-center text-amber-300">Elite (₹1,999/mo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr>
                <td className="p-4 font-medium text-white">NSE/BSE Company Intelligence Hub</td>
                <td className="p-4 text-center text-slate-400">Basic Overview</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">Full Deep-Dive</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">Full Deep-Dive</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">AI Bull & Bear Investment Thesis</td>
                <td className="p-4 text-center text-slate-600">✕</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Unlimited</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Interactive DCF Model & Sensitivity Studio</td>
                <td className="p-4 text-center text-slate-600">✕</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Included</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Included</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Finance Interview War Room (AI Coach)</td>
                <td className="p-4 text-center text-slate-400">2 Mock Evals</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Unlimited AI Evals</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Unlimited + 6 Rounds</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Startup Financial Intelligence Suite (VC Models)</td>
                <td className="p-4 text-center text-slate-400">12M Summary</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Full 36M + VC Memo</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Full + Unlocked Excel</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Indian Context (Ind AS, RBI policy, SEBI LODR)</td>
                <td className="p-4 text-center text-slate-400">Limited</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Full Coverage</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Full Coverage</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Downloadable Excel Financial Models</td>
                <td className="p-4 text-center text-slate-600">✕</td>
                <td className="p-4 text-center text-slate-600">✕</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Unlocked Excel</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">M&A Merger & LBO Deal Models</td>
                <td className="p-4 text-center text-slate-600">✕</td>
                <td className="p-4 text-center text-slate-600">✕</td>
                <td className="p-4 text-center text-emerald-400 font-semibold">✓ Included</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto mt-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="mt-2 text-sm text-slate-400">
            Clear answers about pricing, payment verification, and features.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {faq.q}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-5xl mx-auto mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/30 text-center relative overflow-hidden shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Ready to Crack Your Next Finance Placement or Investment Deal?
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
          Join hundreds of analysts and top B-school candidates preparing with India’s most specialized AI finance platform.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/checkout/pro"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl transition transform active:scale-95"
          >
            Get Analyst Pro — ₹999/mo (Instant UPI)
          </Link>
          <Link
            href="/company"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-sm font-semibold transition"
          >
            Explore Company Intelligence
          </Link>
        </div>
      </div>
    </div>
  );
}
