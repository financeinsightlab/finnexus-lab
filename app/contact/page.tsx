import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroBackground from '@/components/ui/HeroBackground';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact | Kunwar Analytics',
  description:
    'Get in touch for research inquiries, financial modelling projects, data analytics and enterprise engagements. Typical response within one business day.',
  alternates: { canonical: 'https://kunwaranalytics.in/contact' },
  openGraph: {
    title: 'Contact | Kunwar Analytics',
    description:
      'Research inquiries, financial modelling, data analytics and enterprise engagements.',
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
    note: 'Research, projects and collaborations',
  },
  {
    icon: '🏢',
    label: 'Enterprise & teams',
    value: 'kunwaranalytics@gmail.com',
    href: 'mailto:kunwaranalytics@gmail.com',
    note: 'Custom engagements, SLAs and invoicing',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: '/company/kunwaranalytics',
    href: 'https://linkedin.com/company/kunwaranalytics',
    note: 'Fastest for quick questions',
  },
];

const ROUTING = [
  { icon: '🔬', title: 'Research request', desc: 'Sector deep-dives, market sizing, company notes.', href: '/research' },
  { icon: '🧮', title: 'Modelling & analysis', desc: 'Three-statement models, valuation, dashboards.', href: '/tools' },
  { icon: '🏦', title: 'Enterprise engagement', desc: 'Retainers, custom research desks, team licences.', href: '/enterprise' },
];

const SLAS = [
  { label: 'Acknowledge', value: 'Same business day' },
  { label: 'Detailed reply', value: 'Within 24–48 hours' },
  { label: 'Scoping call', value: 'Within 3 business days' },
];

const FAQS = [
  {
    q: 'Do you take on one-off projects?',
    a: 'Yes. One-off research notes, models and dashboards are welcome alongside ongoing retainers.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Fixed-fee for scoped deliverables and monthly retainers for ongoing work. See the pricing page for plan-level detail.',
  },
  {
    q: 'Can you work under an NDA?',
    a: 'Absolutely. Share your template when you write in and we can execute before any sensitive material changes hands.',
  },
  {
    q: 'Do you offer student or academic rates?',
    a: 'Many learning tracks and several certificates are free. For supervised student projects, mention it in your message.',
  },
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
            Have a research question, need custom analysis, or want to discuss a project?
            Tell me what you're trying to decide and I'll point you in the right direction.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              ⏱ Replies within 24–48 hours
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              🔒 NDA-friendly
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              🌍 Remote, worldwide
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
              <h3 className="mb-4 font-semibold text-brand-navy dark:text-white">Response SLA</h3>
              <dl className="space-y-3">
                {SLAS.map((sla) => (
                  <div key={sla.label} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0 dark:border-white/5">
                    <dt className="text-sm text-slate-500 dark:text-slate-400">{sla.label}</dt>
                    <dd className="text-sm font-semibold text-slate-700 dark:text-slate-200">{sla.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-brand-navy dark:text-white">Frequently asked questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-lg dark:border-white/10 dark:bg-[#111c31]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {faq.q}
                  <span className="text-slate-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
