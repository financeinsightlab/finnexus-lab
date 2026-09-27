'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Project, ProjectCategory } from '@/lib/projects';

interface ProjectsClientProps {
    projects: Project[];
    categories: ProjectCategory[];
}

const CATEGORY_STYLE: Record<ProjectCategory, string> = {
    'Financial Modelling': 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/20',
    'Data Analytics': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20',
    'Market Research': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
    Strategy: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20',
    Automation: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20',
};

function formatDate(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

export default function ProjectsClient({ projects, categories }: ProjectsClientProps) {
    const [active, setActive] = useState<'All' | ProjectCategory>('All');

    const filtered = useMemo(
        () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
        [active, projects],
    );

    const featuredCount = projects.filter((p) => p.featured).length;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a1120]">
            {/* Hero */}
            <header className="relative overflow-hidden bg-[#0f1c2d] text-white">
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-500/20 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
                <div className="relative mx-auto max-w-6xl px-6 py-16">
                    <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-teal-300">Projects</span>
                    </nav>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
                        Portfolio
                    </p>
                    <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
                        Analytics, modelling and strategy work — with measured outcomes
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg text-white/70">
                        Every project below follows the same discipline: a real problem, a defensible approach,
                        and outcomes you can check. {featuredCount} featured engagements and{' '}
                        {projects.length} in total.
                    </p>
                </div>
            </header>

            {/* Filters */}
            <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-[#0f1522]/85">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-4">
                    {(['All', ...categories] as const).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${active === cat
                                    ? 'border-teal-500 bg-teal-500 text-white shadow-sm shadow-teal-500/30'
                                    : 'border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-teal-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                    <span className="ml-auto text-sm text-slate-400">
                        {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
                    </span>
                </div>
            </div>

            {/* Grid */}
            <main className="mx-auto max-w-6xl px-6 py-12">
                {filtered.length === 0 ? (
                    <p className="py-20 text-center text-slate-500">No projects in this category yet.</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {filtered.map((project) => (
                            <article
                                key={project.slug}
                                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-[#111c31]"
                            >
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${CATEGORY_STYLE[project.category]}`}>
                                        {project.category}
                                    </span>
                                    <span className="text-xs text-slate-400">{project.sector}</span>
                                    <span className="ml-auto text-xs text-slate-400">{formatDate(project.date)}</span>
                                </div>

                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {project.title}
                                </h2>

                                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="font-semibold text-slate-500 dark:text-slate-400">Problem. </span>
                                    {project.problem}
                                </p>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="font-semibold text-slate-500 dark:text-slate-400">Approach. </span>
                                    {project.approach}
                                </p>

                                <ul className="mt-4 space-y-1.5">
                                    {project.outcomes.map((outcome) => (
                                        <li key={outcome} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-5 flex flex-wrap gap-1.5">
                                    {project.tools.map((tool) => (
                                        <span
                                            key={tool}
                                            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>

                                {project.href && (
                                    <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/10">
                                        <Link
                                            href={project.href}
                                            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400"
                                        >
                                            View related work
                                            <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                        </Link>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
