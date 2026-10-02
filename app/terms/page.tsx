import { Scale } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Kunwar Analytics',
  description: 'Current product terms and limitations for Kunwar Analytics accounts, public content, community features, and manually reviewed UPI access.',
  alternates: { canonical: '/terms' },
};

const updated = 'October 2, 2026';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-surface-muted/50">
      <div className="wrap py-20">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8 flex items-center gap-4">
            <Scale className="h-12 w-12 text-brand-teal" />
            <div>
              <span className="section-label">Platform information</span>
              <h1 className="mt-2 text-4xl font-bold text-gray-900">Terms of Use</h1>
              <p className="mt-2 text-gray-600">Last updated: {updated}</p>
            </div>
          </header>

          <aside className="mb-8 rounded-2xl border border-warning/30 bg-warning-muted p-6 text-sm leading-6 text-content-primary">
            This is a provisional product notice, not jurisdiction-specific legal advice. The service
            operator should obtain legal review before relying on it as a complete contract.
          </aside>

          <article className="prose prose-lg max-w-none rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <h2>1. Using the platform</h2>
            <p>Kunwar Analytics publishes research, educational material, predictions, and interactive tools. Use the service lawfully, respect other users, and do not attempt to bypass access controls, disrupt the service, or misuse another person's information.</p>

            <h2>2. Research and tool limitations</h2>
            <p>Content and calculator outputs are general information for educational purposes. They are not personalized investment, tax, legal, or financial advice, and they do not guarantee future outcomes. Verify source data, assumptions, and dates before relying on them.</p>

            <h2>3. Public submissions</h2>
            <p>Comments, public profile fields, and public predictions may be visible to visitors according to the relevant visibility settings. Do not submit passwords, payment screenshots, card data, or sensitive personal information in public fields. Moderators may hide or remove content under the platform's moderation controls.</p>

            <h2>4. Paid access and manual UPI review</h2>
            <p>Self-service paid checkout is currently available only for Pro and Elite through manual UPI. A submitted transaction reference remains pending until an administrator verifies the transfer. Submission alone does not grant access. Approval grants one calendar month from the approval time; renewal requires another manual payment and approval. There is no active card checkout, automatic verification, or recurring renewal.</p>
            <p>Team and Enterprise are not available through self-service checkout. Their prices, feature scope, and availability are not published or guaranteed. Contact us before relying on any organization-level feature or term.</p>

            <h2>5. Availability and changes</h2>
            <p>Pages, tools, source data, and features may change. The service does not make a general uptime or response-time guarantee on this page. Contact support if a feature or payment status appears incorrect.</p>

            <h2>6. Contact and applicable terms</h2>
            <p>For account or payment questions, use the <Link href="/contact">contact form</Link> or email <a href="mailto:kunwaranalytics@gmail.com">kunwaranalytics@gmail.com</a>. A legally reviewed version should specify the service operator and applicable governing law; this page does not assert a jurisdiction that has not been confirmed.</p>
          </article>

          <nav className="mt-10 flex flex-wrap gap-3" aria-label="Related policies">
            <Link href="/privacy" className="btn-secondary">Privacy Policy</Link>
            <Link href="/cookies" className="btn-secondary">Cookie information</Link>
            <Link href="/gdpr" className="btn-secondary">Privacy requests</Link>
            <Link href="/security" className="btn-secondary">Security information</Link>
            <Link href="/ethics" className="btn-secondary">Editorial &amp; ethics</Link>
            <Link href="/" className="btn-primary">Return to platform</Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
