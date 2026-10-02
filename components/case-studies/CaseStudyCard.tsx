// FILE: components/case-studies/CaseStudyCard.tsx
'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, CalendarDays, Clock, Building2, Layers } from 'lucide-react';
import type { CaseStudy } from '@/types';

/* Theme-aware accent chips: each pairs a dark-ish text tone for light mode with
   a bright tone for dark mode, and never relies on dark-only surfaces. */
const ENGAGEMENT_ACCENTS: Record<string, string> = {
  'Market Entry + Growth Strategy': 'text-teal-700 dark:text-cinema-cyan border-teal-600/30 bg-teal-500/10',
  'Cost Transformation + Operations': 'text-amber-700 dark:text-cinema-amber border-amber-600/30 bg-amber-500/10',
  'M&A Due Diligence + 100-Day Plan': 'text-violet-700 dark:text-cinema-violet border-violet-600/30 bg-violet-500/10',
  'Pricing Strategy': 'text-emerald-700 dark:text-cinema-aurora border-emerald-600/30 bg-emerald-500/10',
  'Digital Transformation + Operating Model': 'text-blue-700 dark:text-cinema-glow-blue border-blue-600/30 bg-blue-500/10',
  'Supply Chain Optimization': 'text-teal-700 dark:text-cinema-cyan border-teal-600/30 bg-teal-500/10',
  'Go-to-Market Strategy': 'text-amber-700 dark:text-cinema-amber border-amber-600/30 bg-amber-500/10',
  'Turnaround & Restructuring': 'text-rose-700 dark:text-rose-400 border-rose-600/30 bg-rose-500/10',
};

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 }); // rotateX from Y movement, rotateY from X movement
  };

  const accent = ENGAGEMENT_ACCENTS[study.engagementType] ?? 'text-teal-700 dark:text-cinema-cyan border-teal-600/30 bg-teal-500/10';

  return (
    <div style={{ perspective: '1200px' }} className="h-full">
      <Link href={`/case-studies/${study.slug}`} className="block h-full">
        <div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
            setTilt({ x: 0, y: 0 });
          }}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hover ? 'translateY(-6px)' : ''}`,
            transformStyle: 'preserve-3d',
            transition: hover ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:border-primary/40 hover:shadow-lg"
        >
          {/* ═══ 3D COVER IMAGE ═══ */}
          <div className="relative h-44 md:h-48 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
            {study.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={study.coverImage}
                alt={study.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${hover ? 'scale-110' : 'scale-100'}`}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary/25 via-secondary to-muted" />
            )}
            {/* Gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            {/* Image parallax glow */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

            {/* Top badges */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border backdrop-blur-sm ${accent}`}>
                {study.engagementType}
              </span>
              {study.featured && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 backdrop-blur-sm dark:text-cinema-amber">
                  ★ Featured
                </span>
              )}
            </div>

            {/* Bottom meta on image */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-teal-300 dark:text-cinema-cyan" /> {study.clientType}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-teal-300 dark:text-cinema-cyan" /> {study.timeline ?? '—'}
              </span>
            </div>
          </div>

          {/* ═══ BODY ═══ */}
          <div className="p-5 md:p-6" style={{ transform: 'translateZ(24px)' }}>
            <div className="mb-2 flex items-center gap-2 text-[11px] text-muted-foreground">
              {study.industry && (
                <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-0.5">
                  {study.industry}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                {new Date(study.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>

            <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
              {study.title}
            </h3>

            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {study.outcome}
            </p>

            {/* Frameworks */}
            {study.frameworks && study.frameworks.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {study.frameworks.slice(0, 3).map((framework) => (
                  <span
                    key={framework}
                    className="inline-flex items-center gap-1 rounded-md border border-primary/25 bg-primary/5 px-2 py-0.5 text-[10px] text-primary"
                  >
                    <Layers className="w-2.5 h-2.5" /> {framework}
                  </span>
                ))}
                {study.frameworks.length > 3 && (
                  <span className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                    +{study.frameworks.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Tags */}
            {study.tags && study.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {study.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Briefcase className="w-3.5 h-3.5" /> Case Study
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                Read case study <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
