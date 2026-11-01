'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BreadcrumbNav, { type BreadcrumbItem } from './BreadcrumbNav';

interface LearnSubNavProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
}

export default function LearnSubNav({
  breadcrumbs,
  title = 'Finance Learning & Career Development',
  subtitle = 'Institutional finance curriculum, PGDM syllabus, Skill Academy tracks, and AI Placement Day War Room.',
  badge = 'LEARNING ECOSYSTEM',
}: LearnSubNavProps) {
  const pathname = usePathname();

  const links = [
    { label: 'Study Material', href: '/study', icon: '📖' },
    { label: 'PGDM Curriculum', href: '/pgdm', icon: '🏛️' },
    { label: 'Skill Academy', href: '/study/skill-academy', icon: '⚡' },
    { label: 'Placement War Room 2.0', href: '/placement-day-war-room', icon: '🎯' },
    { label: '60-Day Prep Plan', href: '/study/placement-prep', icon: '🧳' },
    { label: 'Finance Terms', href: '/finance-terms', icon: '📚' },
    { label: 'Certificates', href: '/certificates', icon: '🏅' },
    { label: 'Podcast', href: '/podcast', icon: '🎙️' },
  ];

  const defaultBreadcrumbs: BreadcrumbItem[] = breadcrumbs ?? [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/study' },
  ];

  return (
    <div className="border-b border-border-subtle bg-surface-raised/40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <BreadcrumbNav items={defaultBreadcrumbs} className="mb-3" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-muted text-brand font-mono text-[10px] font-bold tracking-wider uppercase mb-1.5 border border-brand/20">
              <span>🎓</span>
              <span>{badge}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-content-primary tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-content-secondary mt-1 max-w-3xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Sub-Navigation Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto mt-5 pt-2 border-t border-border-subtle no-scrollbar">
          {links.map((link) => {
            const isActive =
              link.href === '/study'
                ? pathname === '/study'
                : pathname === link.href || pathname?.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-brand text-slate-950 font-bold shadow-sm'
                    : 'bg-surface/60 text-content-secondary hover:text-content-primary hover:bg-surface-raised border border-border-subtle'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

