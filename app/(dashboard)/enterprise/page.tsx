// FILE: app/enterprise/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Team & Enterprise Enquiries | Kunwar Analytics',
  description: 'Ask about organization-level access and current availability. Team and enterprise features, pricing, and service commitments are not offered through self-service checkout.',
  alternates: { canonical: 'https://kunwaranalytics.in/enterprise' },
};

export default function EnterprisePage() {
  return (
    <main className="min-h-screen">
      <section className="bg-brand-navy py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-teal">
            Team &amp; enterprise enquiries
          </p>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Organization access and availability
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-300">
            Team and enterprise packages are not available through self-service checkout. Contact us
            to ask about current availability; an enquiry is not an order or a service commitment.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-2">
          <article className="card p-8">
            <h2 className="text-2xl font-bold text-brand-navy dark:text-white">Available now</h2>
            <p className="mt-3 text-sm leading-6 text-brand-slate dark:text-slate-300">
              Self-service paid access is currently limited to Pro and Elite. Payments use manual UPI
              and remain pending until an administrator verifies and approves the transaction
              reference. Approval grants one calendar month; renewal requires another payment and
              approval.
            </p>
            <Link href="/pricing" className="btn-primary mt-6 inline-flex">
              See current pricing
            </Link>
          </article>

          <article className="card p-8">
            <h2 className="text-2xl font-bold text-brand-navy dark:text-white">Not a published offer</h2>
            <p className="mt-3 text-sm leading-6 text-brand-slate dark:text-slate-300">
              Seat billing, shared team dashboards, SSO, premium API limits, custom research,
              response-time guarantees, and service-level agreements are not currently offered through
              this page. No availability, price, or delivery timeline is promised for these features.
            </p>
            <p className="mt-4 text-sm leading-6 text-brand-slate dark:text-slate-300">
              If you have an organization enquiry, use the contact form. Any scope and terms must be
              confirmed separately in writing before payment or access is arranged.
            </p>
            <Link href="/contact?service=Enterprise%20%2F%20Team%20Plan" className="btn-primary mt-6 inline-flex">
              Make an enquiry
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
