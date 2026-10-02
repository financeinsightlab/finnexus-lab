import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroBackground from '@/components/ui/HeroBackground';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import ContactForm from './ContactForm';
import ContentFaq from '@/components/content/ContentFaq';

export const metadata: Metadata = {
  title: 'Contact | Kunwar Analytics',
  description:
    'Submit a research, modelling, analytics, or organization enquiry. Availability, response timing, scope, and terms are not guaranteed.',
  alternates: { canonical: 'https://kunwaranalytics.in/contact' },
  openGraph: {
    title: 'Contact | Kunwar Analytics',
    description:
      'Submit a research, modelling, analytics, or organization enquiry. Availability and response timing are not guaranteed.',
    url: 'https://kunwaranalytics.in/contact',
    type: 'website',
  },
};

const CHANNELS = [
  {
    icon: '📧',
    label: 'General enquiries',
    value: 'kunwaranalytics@gmail.com',
    href: 'mailto:kunwaranalytics@gmail.com',
    note: 'Research and product questions',
  },
  {
    icon: '🏢',
    label: 'Organization enquiries',
    value: 'kunwaranalytics@gmail.com',
    href: 'mailto:kunwaranalytics@gmail.com',
    note: 'No published team features or service levels',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: '/company/kunwaranalytics',
    href: 'https://linkedin.com/company/kunwaranalytics',
    note: 'Social channel',
  },
];

const ROUTING = [
  { icon: '🔬', title: 'Research enquiry', desc: 'Ask about current availability for a defined research question.', href: '/services' },
  { icon: '🧮', title: 'Modelling & analytics enquiry', desc: 'View enquiry topics; no project is confirmed by listing.', href: '/services' },
  { icon: '🏦', title: 'Organization enquiry', desc: 'Contact-only; no published team feature set or service level.', href: '/enterprise' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a1120]">
      {/* Header */}
      <header className="relative overflow-hidden bg-brand-navy py-16">
        <HeroBackground />
        <div className="wrap relative z-10">
          <p className="section-label mb-5 text-teal-300">Get in Touch</p>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl">
            Start a Conversation
          </h1>
          <p className="max-w-2xl text-xl text-white/80">
            Use the form or email us with a non-confidential question. An enquiry does not confirm availability, pricing, response timing, or an engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              ⏱ Response timing not guaranteed
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              🔒 Do not submit confidential material
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              ✉️ Enquiry only — not a booking
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <section className="wrap py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Form */}
          <div className="md:col-span-2">
            <Suspense fallback={<div className="card p-8 text-sm text-slate-400">Loading form…</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="mb-4 font-semibold text-brand-navy dark:text-white">Direct Contact</h3>
              <ul className="space-y-4">
                {CHANNELS.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-start gap-3"
                    >
                      <span className="text-lg leading-none">{channel.icon}</span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {channel.label}
                        </span>
                        <span className="block truncate text-sm font-medium text-brand-teal group-hover:underline">
                          {channel.value}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-400">{channel.note}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="mb-4 font-semibold text-brand-navy dark:text-white">What can I help with?</h3>
              <ul className="space-y-3">
                {ROUTING.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className="group flex items-start gap-3">
                      <span className="text-lg leading-none">{item.icon}</span>
                      <span>
                        <span className="block text-sm font-medium text-slate-700 group-hover:text-brand-teal dark:text-slate-200">
                          {item.title}
                        </span>
                        <span className="block text-xs text-slate-400">{item.desc}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="mb-4 font-semibold text-brand-navy dark:text-white">Before you write</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Share only non-confidential information. Any potential scope, fee, delivery timing, and terms must be confirmed separately in writing. Submitting this form does not create a booking or service commitment.
              </p>
            </div>
          </div>
        </div>

        <ContentFaq relatedType="PAGE" relatedSlug="contact" title="Contact questions" />
      </section>
      <PromotionSlot slot="FOOTER" path="/contact" />
    </div>
  );
}
