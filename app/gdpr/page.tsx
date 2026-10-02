import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Rights | Kunwar Analytics',
  description: 'How to contact Kunwar Analytics about access, correction, or deletion requests where applicable under privacy law.',
  alternates: { canonical: '/gdpr' },
};

export default function PrivacyRightsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 dark:bg-[#0a1120]">
      <article className="prose prose-lg mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#111c31] dark:prose-invert">
        <p className="text-sm uppercase tracking-widest text-teal-600">Privacy information</p>
        <h1>Privacy requests</h1>
        <p>Last updated: October 2, 2026</p>
        <p>This page explains how to submit a privacy request. It is not a certification or a claim that a particular privacy law applies to every visitor.</p>
        <h2>Requests</h2>
        <p>Where applicable law gives you rights, you may ask about access to, correction of, or deletion of personal information associated with your account. Send the request from the account email address, describe what you need, and include the page or feature involved.</p>
        <h2>Contact</h2>
        <p>Email <a href="mailto:kunwaranalytics@gmail.com">kunwaranalytics@gmail.com</a>. Do not send payment screenshots, card numbers, passwords, or authentication codes. A transaction reference is sufficient for a UPI payment enquiry.</p>
        <p>The service does not currently identify a statutory Data Protection Officer or publish a fixed response-time guarantee. Some records may need to be retained for account, payment-review, security, or moderation operations; requests are handled under applicable law.</p>
        <p>See the <Link href="/privacy">Privacy Policy</Link>, <Link href="/cookies">Cookie information</Link>, and <Link href="/security">Security information</Link>.</p>
      </article>
    </main>
  );
}
