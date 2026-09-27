'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
    CERTIFICATE_VERIFY_BASE,
    type Certificate,
    type CertificateCategory,
    type CertificateLevel,
} from '@/lib/certificates';

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

function linkedInUrl(certificate: Certificate): string {
    const params = new URLSearchParams({
        startTask: 'CERTIFICATION_NAME',
        name: certificate.title,
        organizationName: 'Kunwar Analytics',
        issueYear: String(new Date().getFullYear()),
        certUrl: `${CERTIFICATE_VERIFY_BASE}/${certificate.slug}`,
        certId: certificate.slug,
    });
    certificate.skills.slice(0, 5).forEach((skill) => params.append('skill', skill));
    return `https://www.linkedin.com/profile/add?${params.toString()}`;
}

function VerifyWidget() {
    const [credentialId, setCredentialId] = useState('');
    const trimmed = credentialId.trim();
    const href = trimmed ? `${CERTIFICATE_VERIFY_BASE}/${encodeURIComponent(trimmed)}` : '';

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#111c31]">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Verify a credential</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Enter the credential ID printed on the certificate to confirm it was issued by Kunwar Analytics.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    value={credentialId}
                    onChange={(event) => setCredentialId(event.target.value)}
                    placeholder="e.g. financial-modelling-foundation"
                    aria-label="Credential ID"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-white/15 dark:bg-[#0f1522] dark:text-white"
                />
                <Link
                    href={href || '#'}
                    aria-disabled={!trimmed}
                    className={`inline-flex shrink-0 items-center justify-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${trimmed
                            ? 'bg-teal-600 text-white hover:bg-teal-700'
                            : 'pointer-events-none bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-slate-500'
                        }`}
                >
                    Verify →
                </Link>
            </div>
            {trimmed && (
                <p className="mt-3 break-all text-xs text-slate-400">
                    Verification record: <span className="font-mono text-slate-500 dark:text-slate-300">{href}</span>
                </p>
            )}
        </div>
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

    const freeCount = certificates.filter((certificate) => certificate.free).length;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a1120]">
            {/* Hero */}
            <header className="relative overflow-hidden bg-[#0f1c2d] text-white">
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-500/20 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />
                <div className="relative mx-auto max-w-6xl px-6 py-16">
                    <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
                        <Link href="/" className="transition-colors hover:text-white">Home</Link>
                        <span>/</span>
                        <span className="text-teal-300">Certificates</span>
                    </nav>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
                        Verifiable credentials
                    </p>
                    <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
                        Earn credentials that prove what you can actually do
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg text-white/70">
                        Each certificate maps to a learning track and is assessed on real deliverables.
                        {' '}{freeCount} of {certificates.length} credentials can be earned for free, and every
                        issued credential has a public verification record.
                    </p>
                </div>
            </header>

            {/* Filters */}
            <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-[#0f1522]/85">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {(['All', ...categories] as const).map((item) => (
                            <button
                                key={item}
                                onClick={() => setCategory(item)}
                                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${category === item
                                        ? 'border-teal-500 bg-teal-500 text-white shadow-sm shadow-teal-500/30'
                                        : 'border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-teal-300'
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
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-teal-500 dark:border-white/10 dark:bg-[#0f1522] dark:text-slate-200"
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
                                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-[#111c31]"
                            >
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${CATEGORY_STYLE[certificate.category]}`}>
                                        {certificate.category}
                                    </span>
                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${LEVEL_STYLE[certificate.level]}`}>
                                        {certificate.level}
                                    </span>
                                    {certificate.free && (
                                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                                            Free
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{certificate.title}</h2>
                                <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-300">
                                    {certificate.summary}
                                </p>

                                <dl className="mt-4 space-y-1 text-sm">
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">⏱ {certificate.hours}h</span>
                                        <span aria-hidden>•</span>
                                        <span>{certificate.assessment}</span>
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
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400"
                                    >
                                        {certificate.track.label}
                                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                    </Link>
                                    <a
                                        href={linkedInUrl(certificate)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium text-slate-400 transition-colors hover:text-[#0a66c2]"
                                    >
                                        Add to LinkedIn
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <div className="mt-12">
                    <VerifyWidget />
                </div>
            </main>
        </div>
    );
}
