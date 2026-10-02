import type { Metadata } from 'next';
import { ContentPage } from '@/components/content/ContentLayout';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Security Information | Kunwar Analytics',
  description: 'Security and access-control information for Kunwar Analytics. No certification or independent audit is claimed.',
  alternates: { canonical: '/security' },
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <ContentPage width="reading">
        <article className="cms-content prose-content rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm uppercase tracking-widest text-teal-600">Platform information</p>
        <h1>Security information</h1>
        <p>Last updated: October 2, 2026</p>
        <p>This page describes application-level controls and does not represent an independent audit, penetration test, ISO 27001 certification, SOC 2 report, or uptime guarantee.</p>
        <h2>Current application controls</h2>
        <ul>
          <li>Staff and administrator routes use role checks; payment review is restricted to administrators.</li>
          <li>Paid customer access is determined server-side from the stored plan, status, and expiry.</li>
          <li>Public comment responses include visible comments only; moderation views require staff access.</li>
          <li>Public author and prediction responses use limited projections rather than account email fields.</li>
          <li>Selected write endpoints use validation and database-backed rate limits.</li>
        </ul>
        <p>These controls depend on the deployed database schema and environment configuration. Operators should verify them in each deployment; this page is not evidence of a completed external security review.</p>
        <h2>Report a concern</h2>
        <p>For a security concern, email <a href="mailto:kunwaranalytics@gmail.com">kunwaranalytics@gmail.com</a>. Do not include passwords, secret keys, authentication codes, card data, or payment screenshots. No response-time commitment is offered by this page.</p>
        <p>See the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.</p>
        </article>
      </ContentPage>
    </main>
  );
}
