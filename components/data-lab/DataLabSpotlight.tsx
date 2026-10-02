'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { DataLabProject } from '@/types';
import { ArrowUpRight, Sparkles, Clock } from 'lucide-react';

export default function DataLabSpotlight({ project }: { project: DataLabProject }) {
  return (
    <section className="relative overflow-hidden bg-muted/40">
      <div className="absolute inset-0 hidden cinema-mesh opacity-30 dark:block" />
      <div className="absolute inset-0 hidden cinema-noise dark:block" />
      <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-teal-500/10 blur-[130px] dark:bg-cinema-cyan/15" />
      <div className="content-page relative z-10 py-24">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="h-5 w-5 text-amber-600 dark:text-cinema-amber" />
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-700 dark:text-cinema-amber">
              Featured Project
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
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
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-card" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tools.map(t => (
                    <span key={t} className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                  <span className="rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {project.sector}
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-bold leading-snug text-foreground md:text-3xl">
                  {project.title}
                </h3>
                <p className="mb-3 border-l-4 border-primary pl-4 italic leading-relaxed text-muted-foreground">
                  {project.businessQuestion}
                </p>
                {project.summary && (
                  <p className="mb-6 leading-relaxed text-muted-foreground">{project.summary}</p>
                )}

                {/* KPIs */}
                {project.kpis && (
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {project.kpis.slice(0, 4).map(k => (
                      <div key={k.label} className="rounded-xl border border-border bg-secondary p-3">
                        <div className="text-xl font-bold text-foreground">{k.value}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{k.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> {project.duration}
                  </span>
                  <Link
                    href={`/data-lab/${project.slug}`}
                    className="group/btn inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:shadow-lg"
                  >
                    View Project Page
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
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
