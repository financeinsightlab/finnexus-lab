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
    <section className="relative overflow-hidden bg-muted/40 py-24">
      <div className="absolute inset-0 hidden cinema-mesh opacity-25 dark:block" />
      <div className="absolute inset-0 hidden cinema-grid opacity-15 dark:block" />
      <div className="absolute inset-0 hidden cinema-noise dark:block" />
      <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px] dark:bg-cinema-aurora/15" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px] dark:bg-cinema-violet/15" />

      <div className="content-page relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <ScrollReveal>
            <SectionHeader
              label="Data Lab"
              title="Interactive Models & Dashboards"
              subtitle="Browse selected project pages with interactive views and downloads where available. Source details and update timing vary by page."
              align="left"
              light
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Link
              href="/data-lab"
              className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-primary transition-all hover:gap-3"
            >
              Visit the Data Lab <ArrowUpRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-12">
          {projects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 80}>
              <Link
                href={`/data-lab/${p.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-emerald-300 backdrop-blur dark:text-cinema-aurora">
                    <FlaskConical className="h-3 w-3" /> Data Lab
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.sector}</span>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tools.slice(0, 2).map(t => (
                      <span key={t} className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><SlidersHorizontal className="h-3.5 w-3.5" /> Interactive</span>
                    <span className="inline-flex items-center gap-1.5"><Download className="h-3.5 w-3.5" /> CSV data</span>
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
