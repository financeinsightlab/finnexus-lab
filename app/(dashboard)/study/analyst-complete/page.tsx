import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Layers3, Sparkles, Trophy } from 'lucide-react';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Analyst Complete Course | Kunwar Analytics',
  description: 'The standalone Analyst Complete program: explore the interactive 15-level curriculum or study each level as an independent course with separate progress, final test, and certificate.',
  alternates: { canonical: 'https://kunwaranalytics.in/study/analyst-complete' },
};

const OPTIONS = [
  {
    icon: Sparkles,
    eyebrow: 'Full interactive experience',
    title: 'Open Analyst Complete Course',
    description: 'Continue into the original SignalPath workspace with its dashboard, learning library, SQL Lab, projects, case studies, assessments, interview center, and portfolio tools.',
    details: ['15 levels', '100+ lessons', '40+ projects'],
    href: '/study/analyst-course',
    action: 'Open full course',
    accent: 'violet',
  },
  {
    icon: Layers3,
    eyebrow: 'Independent course records',
    title: 'Choose a Level · 0–14',
    description: 'Open any level as its own course. Lessons, progress, final assessment, and the completion certificate are tracked separately for each level.',
    details: ['15 selectable courses', 'Level-specific progress', 'Course certificates'],
    href: '/study/analyst-levels',
    action: 'Browse all 15 levels',
    accent: 'teal',
  },
];

export default function AnalystCompletePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Study Material', url: 'https://kunwaranalytics.in/study' },
    { name: 'Analyst Complete Course', url: 'https://kunwaranalytics.in/study/analyst-complete' },
  ]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0B0D13]">
      <JsonLd data={breadcrumbs} />
      <section className="relative overflow-hidden border-b border-white/5 bg-brand-navy py-14 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-28 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-slate-400">
            <Link href="/study" className="hover:text-teal-300">Study Material</Link>
            <span className="px-2">/</span>
            <span aria-current="page" className="text-white">Analyst Complete Course</span>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-violet-200">
            <BookOpen className="h-3.5 w-3.5" /> SignalPath · 15 learning levels
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Analyst Complete Course</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            A dedicated learning path from analytics orientation to a production-ready portfolio. Keep using the complete interactive workspace, or select an individual level and track it as its own course.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-slate-200">
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"><Layers3 className="h-4 w-4 text-violet-300" />Levels 0–14</span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"><BookOpen className="h-4 w-4 text-teal-300" />100+ lessons</span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"><Trophy className="h-4 w-4 text-amber-300" />40+ projects</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-12" aria-label="Choose how to study Analyst Complete">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">One program · Two ways to learn</p>
          <h2 className="mt-2 text-2xl font-extrabold text-gray-900 dark:text-white">Choose your Analyst Complete experience</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {OPTIONS.map((option) => {
            const Icon = option.icon;
            const isViolet = option.accent === 'violet';
            return (
              <article key={option.href} className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#151c29] sm:p-7">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${isViolet ? 'bg-violet-500/10 text-violet-600 dark:text-violet-300' : 'bg-teal-500/10 text-teal-700 dark:text-teal-300'}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <p className={`mt-5 text-xs font-bold uppercase tracking-widest ${isViolet ? 'text-violet-700 dark:text-violet-300' : 'text-teal-700 dark:text-teal-300'}`}>{option.eyebrow}</p>
                <h3 className="mt-2 text-xl font-extrabold text-gray-900 dark:text-white">{option.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600 dark:text-slate-400">{option.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${option.title} details`}>
                  {option.details.map((detail) => <li key={detail} className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 dark:border-white/10 dark:text-slate-300">{detail}</li>)}
                </ul>
                <Link href={option.href} className={`mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-colors ${isViolet ? 'bg-violet-600 hover:bg-violet-500' : 'bg-teal-600 hover:bg-teal-500'}`}>
                  {option.action}<ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="font-bold text-gray-900 dark:text-white">Looking for the other study programs?</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">Skill Academy and Placement Preparation remain separate from this Analyst Complete curriculum.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/study/skill-academy" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-teal-500/30 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-500/10 dark:text-teal-300">Skill Academy<ArrowRight className="h-4 w-4" /></Link>
            <Link href="/study/placement-prep" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-teal-500/30 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-500/10 dark:text-teal-300">Placement Prep<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
