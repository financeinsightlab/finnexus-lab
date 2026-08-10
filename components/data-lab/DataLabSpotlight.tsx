'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { DataLabProject } from '@/types';
import { ArrowUpRight, Sparkles, Clock } from 'lucide-react';

export default function DataLabSpotlight({ project }: { project: DataLabProject }) {
  return (
    <section className="relative overflow-hidden bg-cinema-black">
      <div className="absolute inset-0 cinema-mesh opacity-30" />
      <div className="absolute inset-0 cinema-noise" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-cinema-cyan/15 blur-[130px]" />
      <div className="wrap relative z-10 max-w-6xl py-24">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-cinema-amber" />
            <span className="text-cinema-amber text-sm font-semibold uppercase tracking-widest">
              Featured Project
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="glass-cinema group relative overflow-hidden rounded-3xl border border-white/10 shadow-cinema-xl">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="relative overflow-hidden min-h-[280px]">
                <Image
                  src={project.image ?? `/images/data-lab/${project.slug}.jpg`}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121419] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#121419]" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tools.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-200">
                      {t}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 rounded-lg bg-cinema-cyan/15 border border-cinema-cyan/30 text-xs font-medium text-cinema-cyan">
                    {project.sector}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-3 italic border-l-4 border-cinema-cyan pl-4">
                  {project.businessQuestion}
                </p>
                {project.summary && (
                  <p className="text-gray-400 leading-relaxed mb-6">{project.summary}</p>
                )}

                {/* KPIs */}
                {project.kpis && (
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {project.kpis.slice(0, 4).map(k => (
                      <div key={k.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                        <div className="text-xl font-bold cinema-text-glow">{k.value}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{k.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                    <Clock className="w-4 h-4" /> {project.duration}
                  </span>
                  <Link
                    href={`/data-lab/${project.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-cinema-cyan px-6 py-3 text-sm font-semibold text-cinema-ink hover:shadow-cinema-lg transition group/btn"
                  >
                    Open Interactive Model
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
