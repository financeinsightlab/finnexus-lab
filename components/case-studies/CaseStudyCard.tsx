// FILE: components/case-studies/CaseStudyCard.tsx
'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, CalendarDays, Clock, Building2, Layers } from 'lucide-react';
import type { CaseStudy } from '@/types';

const ENGAGEMENT_ACCENTS: Record<string, string> = {
  'Market Entry + Growth Strategy': 'text-brand border-brand/30 bg-brand-muted',
  'Cost Transformation + Operations': 'text-warning border-warning/30 bg-warning-muted',
  'M&A Due Diligence + 100-Day Plan': 'text-accent-violet border-accent-violet/30 bg-accent-violet-muted',
  'Pricing Strategy': 'text-success border-success/30 bg-success-muted',
  'Digital Transformation + Operating Model': 'text-info border-info/30 bg-info-muted',
  'Supply Chain Optimization': 'text-brand border-brand/30 bg-brand-muted',
  'Go-to-Market Strategy': 'text-warning border-warning/30 bg-warning-muted',
  'Turnaround & Restructuring': 'text-error border-error/30 bg-error-muted',
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

  const accent = ENGAGEMENT_ACCENTS[study.engagementType] ?? 'text-brand border-brand/30 bg-brand-muted';

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
          className="group relative h-full glass-cinema rounded-2xl border border-white/10 overflow-hidden hover:border-cinema-cyan/40 hover:shadow-cinema-lg"
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
              <div className="w-full h-full bg-gradient-to-br from-cinema-mid-blue via-cinema-deep-blue to-cinema-black" />
            )}
            {/* Gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-cinema-charcoal via-cinema-charcoal/30 to-transparent" />
            {/* Image parallax glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-cinema-cyan/25 to-transparent pointer-events-none`} />

            {/* Top badges */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border backdrop-blur-sm ${accent}`}>
                {study.engagementType}
              </span>
              {study.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border border-warning/40 bg-warning text-content-inverse backdrop-blur-sm">
                  ★ Featured
                </span>
              )}
            </div>

            {/* Bottom meta on image */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] !text-white">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 !text-cyan-300" /> {study.clientType}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 !text-cyan-300" /> {study.timeline ?? '—'}
              </span>
            </div>
          </div>

          {/* ═══ BODY ═══ */}
          <div className="p-5 md:p-6" style={{ transform: 'translateZ(24px)' }}>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2">
              {study.industry && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                  {study.industry}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                {new Date(study.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>

            <h3 className="font-bold text-content-primary text-lg leading-snug mb-2 group-hover:text-brand transition-colors line-clamp-2">
              {study.title}
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
              {study.outcome}
            </p>

            {/* Frameworks */}
            {study.frameworks && study.frameworks.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {study.frameworks.slice(0, 3).map((framework) => (
                  <span
                    key={framework}
                    className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md border border-brand/20 bg-brand-muted text-brand"
                  >
                    <Layers className="w-2.5 h-2.5" /> {framework}
                  </span>
                ))}
                {study.frameworks.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-gray-500">
                    +{study.frameworks.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Tags */}
            {study.tags && study.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {study.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-500">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                <Briefcase className="w-3.5 h-3.5" /> Case Study
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cinema-cyan group-hover:gap-3 transition-all">
                Read case study <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
