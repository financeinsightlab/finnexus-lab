import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { getFeaturedDataLab } from '@/lib/content';
import { ArrowUpRight, FlaskConical, Download, SlidersHorizontal } from 'lucide-react';

export default function HomeDataLabSection() {
  const projects = getFeaturedDataLab(3);

  if (projects.length === 0) return null;

  return (
    <section className="relative py-24 bg-cinema-black overflow-hidden">
      <div className="absolute inset-0 cinema-mesh opacity-25" />
      <div className="absolute inset-0 cinema-grid opacity-15" />
      <div className="absolute inset-0 cinema-noise" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-cinema-aurora/15 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cinema-violet/15 blur-[120px]" />

      <div className="wrap relative z-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <ScrollReveal>
            <SectionHeader
              label="Data Lab"
              title="Interactive Models & Dashboards"
              subtitle="Explore the quantitative engine behind our research — live charts, simulators, and downloadable datasets."
              align="left"
              light
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Link
              href="/data-lab"
              className="inline-flex items-center gap-2 text-cinema-cyan hover:gap-3 transition-all text-sm font-medium whitespace-nowrap"
            >
              Visit the Data Lab <ArrowUpRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-12">
          {projects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 80}>
              <Link
                href={`/data-lab/${p.slug}`}
                className="glass-cinema group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cinema-xl block h-full"
              >
                <div className="relative overflow-hidden" style={{ height: 170 }}>
                  <Image
                    src={p.image ?? `/images/data-lab/${p.slug}.jpg`}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121419] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur text-[11px] font-medium text-cinema-aurora border border-white/10">
                    <FlaskConical className="w-3 h-3" /> Data Lab
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-cinema-cyan uppercase tracking-wider">{p.sector}</span>
                  <h3 className="mt-2 text-lg font-bold text-white leading-snug group-hover:text-cinema-cyan transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tools.slice(0, 2).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/10 text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1.5"><SlidersHorizontal className="w-3.5 h-3.5" /> Interactive</span>
                    <span className="inline-flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> CSV data</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
