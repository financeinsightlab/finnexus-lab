'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Certificate, CertificateCategory, CertificateLevel } from '@/lib/certificates';

interface CertificatesClientProps {
    certificates: Certificate[];
    categories: CertificateCategory[];
}

const LEVELS: CertificateLevel[] = ['Foundation', 'Intermediate', 'Advanced', 'Professional'];

const CATEGORY_STYLE: Record<CertificateCategory, string> = {
    Finance: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/20',
    Analytics: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20',
    Strategy: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20',
    Tools: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
};

const LEVEL_STYLE: Record<CertificateLevel, string> = {
    Foundation: 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300',
    Intermediate: 'bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
    Advanced: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300',
    Professional: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
};

function CredentialStatusNotice() {
    return (
        <aside className="rounded-2xl border border-amber-300/30 bg-amber-50 p-6 dark:border-amber-400/20 dark:bg-amber-500/5">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Credential status</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                These pages are pathway catalogue listings, not proof of completion. Where a course has a published final test, a private completion record is created only after all published lessons are completed and the learner passes. That record is unsigned and has no public or cryptographic verification. Do not list a pathway entry as an earned certificate.
            </p>
        </aside>
    );
}

export default function CertificatesClient({ certificates, categories }: CertificatesClientProps) {
    const [category, setCategory] = useState<'All' | CertificateCategory>('All');
    const [level, setLevel] = useState<'All' | CertificateLevel>('All');

    const filtered = useMemo(
        () =>
            certificates.filter(
                (certificate) =>
                    (category === 'All' || certificate.category === category) &&
                    (level === 'All' || certificate.level === level),
            ),
        [certificates, category, level],
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background">
            {/* Hero */}
            <header className="relative overflow-hidden bg-surface-raised text-content-primary">
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-500/20 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />
                <div className="relative mx-auto max-w-6xl px-6 py-16">
                    <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
                        <Link href="/" className="transition-colors hover:text-content-primary">Home</Link>
                        <span>/</span>
                        <span className="text-teal-300">Certificate pathways</span>
                    </nav>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
                        Learning-pathway catalogue
                    </p>
                    <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
                        Explore finance, analytics and strategy pathways
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg text-content-secondary">
                        These entries describe learning pathways and proposed assessments; they are not themselves credentials. Separately, an enabled course may issue a private, unsigned completion record after the published lesson criteria and final test are passed. No public credential verification is provided.
                    </p>
                </div>
            </header>

            {/* Filters */}
            <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-surface/85">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {(['All', ...categories] as const).map((item) => (
                            <button
                                key={item}
                                onClick={() => setCategory(item)}
                                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${category === item
                                        ? 'border-primary bg-primary text-primary-foreground shadow-sm shadow-brand/30'
                                        : 'border-slate-200 text-slate-600 hover:border-teal-400 hover:text-brand-hover dark:border-white/10 dark:text-slate-300 dark:hover:text-brand-hover'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <label htmlFor="level-filter" className="text-sm text-slate-500 dark:text-slate-400">
                            Level
                        </label>
                        <select
                            id="level-filter"
                            value={level}
                            onChange={(event) => setLevel(event.target.value as 'All' | CertificateLevel)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-teal-500 dark:border-white/10 dark:bg-surface dark:text-slate-200"
                        >
                            {(['All', ...LEVELS] as const).map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <main className="mx-auto max-w-6xl px-6 py-12">
                {filtered.length === 0 ? (
                    <p className="py-20 text-center text-slate-500">No credentials match these filters yet.</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((certificate) => (
                            <article
                                key={certificate.slug}
                                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-surface-raised"
                            >
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${CATEGORY_STYLE[certificate.category]}`}>
                                        {certificate.category}
                                    </span>
                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${LEVEL_STYLE[certificate.level]}`}>
                                        {certificate.level}
                                    </span>
                                </div>

                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{certificate.title}</h2>
                                <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-300">
                                    {certificate.summary}
                                </p>

                                <dl className="mt-4 space-y-1 text-sm">
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">⏱ {certificate.hours}h</span>
                                        <span aria-hidden>•</span>
                                        <span>Proposed assessment (not available): {certificate.proposedAssessment}</span>
                                    </div>
                                </dl>

                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {certificate.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
                                    <Link
                                        href={certificate.track.href}
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-brand-hover dark:text-teal-400"
                                    >
                                        {certificate.track.label}
                                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                    </Link>
                                    <Link
                                        href={`/certificates/${certificate.slug}`}
                                        className="text-xs font-medium text-slate-400 transition-colors hover:text-brand-hover"
                                    >
                                        Pathway details →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <div className="mt-12">
                    <CredentialStatusNotice />
                </div>
            </main>
        </div>
    );
}
