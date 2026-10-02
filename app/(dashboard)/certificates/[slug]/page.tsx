import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CERTIFICATES, getCertificateBySlug } from '@/lib/certificates';
import { buildCertificatePathwayJsonLd } from '@/lib/credentials';
import JsonLd from '@/components/seo/JsonLd';
import PromotionSlot from '@/components/promotions/PromotionSlot';

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

    const description = `${certificate.summary} Certificate pathway catalogue entry only; this page is not an issued credential or completion record.`;
    return {
        title: `${certificate.title} Pathway | Kunwar Analytics`,
        description,
        alternates: { canonical: `https://kunwaranalytics.in/certificates/${certificate.slug}` },
        openGraph: {
            title: `${certificate.title} Pathway | Kunwar Analytics`,
            description,
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

    const pathwayJsonLd = buildCertificatePathwayJsonLd(certificate);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a1120]">
            <JsonLd data={pathwayJsonLd} />
            <header className="relative overflow-hidden bg-[#0f1c2d] text-white">
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-500/20 blur-[100px]" />
                <div className="relative mx-auto max-w-4xl px-6 py-14">
                    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                        <Link href="/" className="transition-colors hover:text-white">Home</Link>
                        <span>/</span>
                        <Link href="/certificates" className="transition-colors hover:text-white">Certificate pathways</Link>
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
                        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                            Pathway catalogue
                        </span>
                    </div>
                    <h1 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">{certificate.title} pathway</h1>
                    <p className="mt-4 max-w-2xl text-lg text-white/70">{certificate.summary}</p>
                    <p className="mt-4 max-w-2xl rounded-xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm text-amber-100/80">
                        This is a pathway catalogue listing, not an issued credential. Course completion records are separate, private, unsigned records earned only where a course has published lesson criteria and a final test; no public or cryptographic verification is provided.
                    </p>
                </div>
            </header>

            <PromotionSlot slot="CONTENT_TOP" path={`/certificates/${certificate.slug}`} tags={[certificate.category]} />

            <main className="mx-auto grid max-w-4xl gap-8 px-6 py-12 md:grid-cols-3">
                <div className="space-y-8 md:col-span-2">
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#111c31]">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Pathway outline</h2>
                        <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5">📚</span>
                                <span>
                                    Explore the related{' '}
                                    <Link href={certificate.track.href} className="font-semibold text-teal-600 hover:underline dark:text-teal-400">
                                        {certificate.track.label}
                                    </Link>{' '}
                                    material. The listed study time ({certificate.hours} hours) is an estimate, not tracked completion.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5">📝</span>
                                <span>Proposed assessment format, not currently available: {certificate.proposedAssessment}.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#111c31]">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Skills covered by this pathway</h2>
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
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Related pathways</h2>
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

                <aside className="md:col-span-1">
                    <div className="sticky top-24 rounded-2xl border border-amber-500/25 bg-gradient-to-b from-amber-500/5 to-transparent p-6">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                            Catalogue status
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                            This page describes a pathway; it is not a learner credential. Any course-completion record is private to the learner, unsigned, and not publicly verifiable.
                        </p>
                        <Link
                            href={certificate.track.href}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                        >
                            Explore related material →
                        </Link>
                        <Link
                            href="/certificates"
                            className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                        >
                            All certificate pathways
                        </Link>
                    </div>
                </aside>
            </main>
            <PromotionSlot slot="CONTENT_BOTTOM" path={`/certificates/${certificate.slug}`} tags={[certificate.category]} />
            <PromotionSlot slot="FOOTER" path={`/certificates/${certificate.slug}`} tags={[certificate.category]} />
        </div>
    );
}
