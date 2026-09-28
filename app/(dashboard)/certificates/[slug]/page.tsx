import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CERTIFICATES, getCertificateBySlug } from '@/lib/certificates';
import { buildCredential } from '@/lib/credentials';
import JsonLd from '@/components/seo/JsonLd';

// Stable epoch for the credential catalogue so the statically-generated
// JSON-LD is deterministic across builds (this is a definition, not an
// individually issued badge — issuance timestamps arrive with learner records).
const CREDENTIAL_EPOCH = new Date('2025-01-01T00:00:00.000Z');

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return CERTIFICATES.map((certificate) => ({ slug: certificate.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const certificate = getCertificateBySlug(slug);
    if (!certificate) return { title: 'Certificate not found | Kunwar Analytics' };

    return {
        title: `${certificate.title} Certificate | Kunwar Analytics`,
        description: certificate.summary,
        alternates: { canonical: `https://kunwaranalytics.in/certificates/${certificate.slug}` },
        openGraph: {
            title: `${certificate.title} | Kunwar Analytics`,
            description: certificate.summary,
            url: `https://kunwaranalytics.in/certificates/${certificate.slug}`,
            type: 'article',
        },
    };
}

export default async function CertificateDetailPage({ params }: Props) {
    const { slug } = await params;
    const certificate = getCertificateBySlug(slug);
    if (!certificate) notFound();

    const related = CERTIFICATES.filter(
        (c) => c.slug !== certificate.slug && c.category === certificate.category,
    ).slice(0, 3);

    const credential = buildCredential(certificate, { issuedOn: CREDENTIAL_EPOCH });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a1120]">
            <JsonLd data={credential} />
            <header className="relative overflow-hidden bg-[#0f1c2d] text-white">
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-500/20 blur-[100px]" />
                <div className="relative mx-auto max-w-4xl px-6 py-14">
                    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                        <Link href="/" className="transition-colors hover:text-white">Home</Link>
                        <span>/</span>
                        <Link href="/certificates" className="transition-colors hover:text-white">Certificates</Link>
                        <span>/</span>
                        <span className="text-teal-300">{certificate.title}</span>
                    </nav>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300">
                            {certificate.category}
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                            {certificate.level}
                        </span>
                        {certificate.free && (
                            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                                Free
                            </span>
                        )}
                    </div>
                    <h1 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">{certificate.title}</h1>
                    <p className="mt-4 max-w-2xl text-lg text-white/70">{certificate.summary}</p>
                </div>
            </header>

            <main className="mx-auto grid max-w-4xl gap-8 px-6 py-12 md:grid-cols-3">
                <div className="space-y-8 md:col-span-2">
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#111c31]">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">How you earn it</h2>
                        <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5">📚</span>
                                <span>
                                    Work through the{' '}
                                    <Link href={certificate.track.href} className="font-semibold text-teal-600 hover:underline dark:text-teal-400">
                                        {certificate.track.label}
                                    </Link>{' '}
                                    track (approx. {certificate.hours} hours).
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5">📝</span>
                                <span>Complete the assessment: {certificate.assessment}.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5">🏅</span>
                                <span>Receive a credential ID and a public verification record.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#111c31]">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Skills evidenced</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {certificate.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    {related.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Related credentials</h2>
                            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                {related.map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={`/certificates/${item.slug}`}
                                        className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-[#111c31]"
                                    >
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                                        <p className="mt-1 text-xs text-slate-400">{item.level}</p>
                                        <span className="mt-3 inline-block text-xs font-semibold text-teal-600 dark:text-teal-400">
                                            View →
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Verification panel */}
                <aside className="md:col-span-1">
                    <div className="sticky top-24 rounded-2xl border border-teal-500/30 bg-gradient-to-b from-teal-500/5 to-transparent p-6">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                            Credential verification
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                            This page is the public verification record for the credential ID:
                        </p>
                        <p className="mt-2 break-all rounded-lg bg-slate-100 px-3 py-2 font-mono text-xs text-slate-700 dark:bg-white/5 dark:text-slate-200">
                            {certificate.slug}
                        </p>
                        <Link
                            href={certificate.track.href}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                        >
                            Start the track →
                        </Link>
                        <Link
                            href="/certificates"
                            className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                        >
                            All certificates
                        </Link>
                    </div>
                </aside>
            </main>
        </div>
    );
}
