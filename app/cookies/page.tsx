import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie and Browser Storage Information | Kunwar Analytics',
  description: 'Information about authentication cookies, locale preferences, and browser storage used by Kunwar Analytics.',
  alternates: { canonical: '/cookies' },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 dark:bg-[#0a1120]">
      <article className="prose prose-lg mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#111c31] dark:prose-invert">
        <p className="text-sm uppercase tracking-widest text-teal-600">Privacy information</p>
        <h1>Cookie and browser storage information</h1>
        <p>Last updated: October 2, 2026</p>
        <p>This page describes browser storage used by the current application. Storage can vary with the authentication provider and deployment configuration.</p>
        <h2>Cookies</h2>
        <ul>
          <li>Authentication and session cookies are used to keep signed-in accounts working.</li>
          <li>A locale preference cookie may be used to remember your language selection.</li>
          <li>Hosting and security layers may set additional operational cookies according to their configuration.</li>
        </ul>
        <h2>Browser storage</h2>
        <p>The application uses local storage for some client-side preferences and learning or placement-preparation notes. Session storage may hold a short-lived analytics session identifier. Clearing browser storage can remove locally saved state or require you to sign in again.</p>
        <h2>Choices</h2>
        <p>You can manage or clear cookies and browser storage in your browser settings. Blocking authentication cookies can prevent sign-in and account features from working. This notice does not claim that every deployment has been independently audited for cookie compliance.</p>
        <p>For questions, contact <a href="mailto:kunwaranalytics@gmail.com">kunwaranalytics@gmail.com</a>. See the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.</p>
      </article>
    </main>
  );
}
