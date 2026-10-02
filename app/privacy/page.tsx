import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Information | Kunwar Analytics',
  description: 'What information Kunwar Analytics uses for accounts, public profiles, community features, learning progress, contact requests, payments, and optional AI inference.',
  alternates: { canonical: '/privacy' },
};

const updated = 'October 2, 2026';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="wrap py-20">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8 flex items-center gap-4">
            <Shield className="h-12 w-12 text-brand-teal" />
            <div>
              <span className="section-label">Privacy information</span>
              <h1 className="mt-2 text-4xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="mt-2 text-gray-600">Last updated: {updated}</p>
            </div>
          </header>

          <aside className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-950">
            This notice describes current product behavior. It does not claim GDPR, CCPA, DPDP Act,
            ISO 27001, or SOC 2 certification or compliance, and it is not a substitute for
            jurisdiction-specific legal review.
          </aside>

          <div className="mb-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <Lock className="mb-3 h-6 w-6 text-brand-teal" />
              <h2 className="font-bold text-gray-900">Account and security</h2>
              <p className="mt-2 text-sm text-gray-600">Account details support sign-in, access control, and service operation.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <Eye className="mb-3 h-6 w-6 text-brand-teal" />
              <h2 className="font-bold text-gray-900">Public visibility</h2>
              <p className="mt-2 text-sm text-gray-600">Public profiles and visible comments are separated from private account fields.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <FileText className="mb-3 h-6 w-6 text-brand-teal" />
              <h2 className="font-bold text-gray-900">Payment records</h2>
              <p className="mt-2 text-sm text-gray-600">Manual UPI review stores a transaction reference, not a payment screenshot or card data.</p>
            </div>
          </div>

          <article className="prose prose-lg max-w-none rounded-2xl border border-gray-200 bg-white p-8">
            <h2>1. Information handled by the service</h2>
            <ul>
              <li><strong>Account and profile:</strong> sign-in identifiers and the profile information you choose to provide. Profile details are displayed publicly only when the profile is marked public.</li>
              <li><strong>Community and learning:</strong> comments, reactions, saved items, predictions, enrollments, lesson progress, and related activity needed to provide those features.</li>
              <li><strong>Contact requests:</strong> the name, email address, organization (if supplied), subject, budget range (if supplied), and message you submit. New contact submissions do not persist the IP address used for transient rate limiting.</li>
              <li><strong>Manual UPI payments:</strong> plan, amount, currency, normalized transaction reference, status, submission and approval dates, reviewer, audit events, and an optional rejection reason. The checkout does not request or store card data or payment screenshots.</li>
              <li><strong>Technical and usage data:</strong> page-view and operational events, session identifiers, locale preferences, and rate-limit counters may be processed to operate, secure, and understand use of the site.</li>
            </ul>

            <h2>2. Public content and private fields</h2>
            <p>Only comments with a visible moderation status are returned to public comment views. A private-profile commenter is shown as a private member in public views; staff moderation views may show the information needed to moderate. Public prediction and author pages use a limited public projection and do not publish account email addresses or private profile fields.</p>
            <p>Anything you intentionally publish as a public comment, prediction, or public profile field can be seen by visitors. Avoid posting sensitive personal or financial information.</p>

            <h2>3. Cookies and browser storage</h2>
            <p>The site uses authentication/session cookies and may store a locale preference. Some learning notes, placement-preparation progress, sidebar preferences, and other interface state are stored in your browser using local storage; session analytics may use session storage. Clearing browser storage can remove locally saved state. See <Link href="/cookies">Cookie information</Link>.</p>

            <h2>4. How information is used</h2>
            <p>Information is used to operate accounts and site features, display content according to visibility settings, review manual payments, moderate community content, save learning progress, limit abusive requests, respond to contact requests, and maintain service security and reliability.</p>

            <h2>5. Optional AI inference and third parties</h2>
            <p>Ask Kunwar uses site retrieval and local knowledge by default. External Hugging Face inference is off by default and is attempted only when the deployment explicitly enables <code>HUGGINGFACE_INFERENCE_ENABLED=true</code>, the existing server-side credential is configured, and relevant sources are available. If an operator enables it, the question and retrieved site passages needed to answer it may be sent to the configured inference provider. Do not include sensitive personal information in a question. No live provider response is claimed by this notice.</p>
            <p>The site also relies on the hosting, database, authentication, and media-storage services configured by its operator. Their processing is governed by the operator's deployment and provider settings; this page does not claim a particular certification or legal status for those providers.</p>

            <h2>6. Email and newsletter status</h2>
            <p>Newsletter sign-up and email delivery are not currently configured. The public newsletter form is disabled, and the subscribe endpoint does not store submitted addresses. Contact replies may create an in-app notification for a registered user; they are not emailed.</p>

            <h2>7. Retention and privacy requests</h2>
            <p>Information is retained as needed to operate the relevant account or feature, maintain payment and moderation records, and meet operational requirements. The service does not currently publish a fixed deletion schedule. To ask for access, correction, or deletion of account information, contact <a href="mailto:kunwaranalytics@gmail.com">kunwaranalytics@gmail.com</a> from the address associated with the account and identify the request. Requests are handled under applicable law and operational constraints; no particular legal status or response time is promised here.</p>

            <h2>8. Security</h2>
            <p>Access checks and data minimization are used in application code, but no service can promise perfect security. No independent security audit, ISO 27001 certification, SOC 2 report, or uptime guarantee is represented by this page. See <Link href="/security">Security information</Link> for the current scope.</p>

            <h2>9. Contact and legal review</h2>
            <p>For privacy questions, contact <a href="mailto:kunwaranalytics@gmail.com">kunwaranalytics@gmail.com</a>. This page does not identify a statutory Data Protection Officer or corporate address. The service operator should obtain legal review for applicable jurisdictions and update this notice before making compliance representations.</p>
          </article>

          <nav className="mt-10 flex flex-wrap gap-3" aria-label="Related policies">
            <Link href="/terms" className="btn-secondary">Terms of Use</Link>
            <Link href="/cookies" className="btn-secondary">Cookie information</Link>
            <Link href="/gdpr" className="btn-secondary">Privacy rights</Link>
            <Link href="/security" className="btn-secondary">Security information</Link>
            <Link href="/ethics" className="btn-secondary">Editorial &amp; ethics</Link>
            <Link href="/" className="btn-primary">Return to platform</Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
