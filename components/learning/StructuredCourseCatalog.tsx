'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Clock3, Search } from 'lucide-react';
import type { LearningCatalogItem } from '@/lib/learning-course-catalog';

interface StructuredCourseCatalogProps {
  courses: LearningCatalogItem[];
  eyebrow: string;
  title: string;
  description: string;
  summary: Array<{ value: string; label: string }>;
  links?: Array<{ href: string; label: string }>;
}

export default function StructuredCourseCatalog({
  courses,
  eyebrow,
  title,
  description,
  summary,
  links = [],
}: StructuredCourseCatalogProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All courses');

  const filters = useMemo(() => {
    const categories = [...new Set(courses.map((course) => course.category))];
    categories.sort((left, right) => {
      const leftOrder = courses.find((course) => course.category === left)?.categoryOrder ?? 0;
      const rightOrder = courses.find((course) => course.category === right)?.categoryOrder ?? 0;
      return leftOrder - rightOrder;
    });
    return ['All courses', ...categories];
  }, [courses]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesFilter = filter === 'All courses' || course.category === filter;
      const matchesSearch = !query || `${course.title} ${course.description} ${course.category}`.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [courses, filter, search]);

  const groups = useMemo(() => {
    const result = new Map<string, LearningCatalogItem[]>();
    for (const course of filtered) {
      const current = result.get(course.category) ?? [];
      current.push(course);
      result.set(course.category, current);
    }
    return [...result.entries()].sort((a, b) => (a[1][0]?.categoryOrder ?? 0) - (b[1][0]?.categoryOrder ?? 0));
  }, [filtered]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/5 bg-brand-navy py-14">
        <div className="mx-auto max-w-[1400px] px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-400">
            <Link href="/study" className="hover:text-teal-300">Study Material</Link>
            <span className="px-2">/</span>
            <span aria-current="page" className="text-white">{title}</span>
          </nav>
          <p className="inline-flex rounded-full border border-teal-500/25 bg-teal-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-teal-300">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
          <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
            {summary.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-extrabold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-teal-400/40 hover:bg-teal-500/10"
                >
                  {link.label}<ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-white/5 bg-[#0f1522] py-4 lg:sticky lg:top-16 lg:z-30">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="relative max-w-xl">
            <Search aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses, skills, or topics…"
              aria-label={`Search ${title}`}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-teal-500/50"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter courses by category">
            {filters.map((item) => {
              const count = item === 'All courses' ? courses.length : courses.filter((course) => course.category === item).length;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                  className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${filter === item ? 'border-teal-500/30 bg-teal-500/20 text-teal-300' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:text-white'}`}
                >
                  {item} <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-slate-500" aria-live="polite">Showing {filtered.length} of {courses.length} courses</p>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] space-y-12 px-6 py-12">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="font-semibold text-white">No courses match that search.</p>
            <button type="button" onClick={() => { setSearch(''); setFilter('All courses'); }} className="mt-3 text-sm font-semibold text-teal-300 hover:text-teal-200">Clear filters</button>
          </div>
        ) : groups.map(([group, items]) => (
          <section key={group} aria-labelledby={`course-group-${items[0].categoryOrder}`}>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-400">{items[0].section}</p>
                <h2 id={`course-group-${items[0].categoryOrder}`} className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">{group}</h2>
              </div>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">{items.length} courses</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((course) => (
                <Link
                  key={course.slug}
                  href={course.href}
                  className="group flex min-h-64 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-lg dark:border-white/10 dark:bg-[#151c29]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-2xl" aria-hidden="true">{course.icon}</span>
                    <span className="rounded-full border border-teal-600/15 bg-teal-600/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-teal-700 dark:text-teal-300">
                      {course.level !== undefined ? `Level ${course.level}` : 'Skill track'}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-snug text-gray-900 group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300">{course.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-gray-600 dark:text-slate-400">{course.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-white/10 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />{course.lessonCount} lessons</span>
                    <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{Math.ceil(course.estimatedMinutes / 60)} hours</span>
                    <span className="ml-auto inline-flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-300">Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
