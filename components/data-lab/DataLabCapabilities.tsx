'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { Code2, Presentation, Sheet, BrainCircuit, Database, Workflow } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: BrainCircuit,
    title: 'Predictive Modelling',
    desc: 'Some project pages show forecasts or scenarios based on stored assumptions; they are illustrative, not validated predictions.',
    color: 'text-violet-700 dark:text-cinema-violet',
    glow: 'rgba(124,58,237,0.4)',
  },
  {
    icon: Database,
    title: 'Unit Economics',
    desc: 'Example unit-economics metrics appear in selected projects. Coverage and supporting evidence vary by project.',
    color: 'text-teal-700 dark:text-cinema-cyan',
    glow: 'rgba(6,182,212,0.4)',
  },
  {
    icon: Code2,
    title: 'Python & Pandas',
    desc: 'Python and data-analysis tools are referenced in selected project pages; code and source files are not provided on every page.',
    color: 'text-emerald-700 dark:text-cinema-aurora',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    icon: Presentation,
    title: 'Power BI & Dashboards',
    desc: 'Some project pages reference dashboard or visualization tools. A live external dashboard is not included unless a page explicitly says so.',
    color: 'text-amber-700 dark:text-cinema-amber',
    glow: 'rgba(245,158,11,0.4)',
  },
  {
    icon: Sheet,
    title: 'Excel & Financial Models',
    desc: 'Selected pages demonstrate financial formulas and model assumptions; this does not promise a custom model build.',
    color: 'text-blue-700 dark:text-cinema-glow-blue',
    glow: 'rgba(59,130,246,0.4)',
  },
  {
    icon: Workflow,
    title: 'Data Workflows',
    desc: 'Sources, methods, and available downloads vary. Review each project page for its actual contents and limitations.',
    color: 'text-teal-700 dark:text-cinema-cyan',
    glow: 'rgba(6,182,212,0.4)',
  },
];

export default function DataLabCapabilities() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 hidden cinema-grid opacity-20 dark:block" />
      <div className="content-page relative z-10 py-24">
        <ScrollReveal>
          <SectionHeader
            label="Examples in the Collection"
            title="Methods and Tools Shown on This Site"
            subtitle="These cards describe topics represented in existing content; they are not a commitment to provide a service or deliverable."
            align="center"
            light
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-14">
          {CAPABILITIES.map((cap, i) => (
            <ScrollReveal key={cap.title} delay={i * 80}>
              <div className="group relative h-full rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'hsl(var(--muted))' }}
                >
                  <cap.icon className={`w-7 h-7 ${cap.color}`} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">{cap.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 0 1px ${cap.glow}, 0 0 30px ${cap.glow}` }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
