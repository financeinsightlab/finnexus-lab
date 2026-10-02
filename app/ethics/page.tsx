import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial and Research Ethics | Kunwar Analytics',
  description: 'Editorial principles and limitations for Kunwar Analytics research, predictions, and optional AI-assisted answers.',
  alternates: { canonical: '/ethics' },
};

export default function EthicsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 dark:bg-[#0a1120]">
      <article className="prose prose-lg mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#111c31] dark:prose-invert">
        <p className="text-sm uppercase tracking-widest text-teal-600">Editorial information</p>
        <h1>Editorial and research ethics</h1>
        <p>Last updated: October 2, 2026</p>
        <ul>
          <li>Research, market information, predictions, and calculator outputs are informational and educational, not individualized investment advice or a promise of results.</li>
          <li>Where available, source links and data timestamps should be shown so readers can check context and freshness.</li>
          <li>Prediction outcome statistics are based on recorded outcomes. No Brier score is shown unless forecast probabilities are actually stored.</li>
          <li>Ask Kunwar uses retrieved site sources and local platform knowledge. External inference is off by default and must not be described as live unless a provider response has been verified.</li>
          <li>Catalogue pathways are not earned certificates; no credential should be represented as issued or independently verifiable unless the relevant assessment and issuance process exists.</li>
        </ul>
        <p>For a correction or editorial question, use the <Link href="/contact">contact form</Link>. See the <Link href="/privacy">Privacy Policy</Link>.</p>
      </article>
    </main>
  );
}
