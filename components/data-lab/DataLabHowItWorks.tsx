'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { Database, BrainCircuit, SlidersHorizontal, Download } from 'lucide-react';

const STEPS = [
  {
    icon: Database,
    step: '01',
    title: 'Open a Project',
    desc: 'Read the question, summary, tools, and scope information actually shown on that project page.',
    color: 'text-teal-700 dark:text-cinema-cyan',
  },
  {
    icon: BrainCircuit,
    step: '02',
    title: 'Inspect the View',
    desc: 'Charts and interactive controls differ by page. Values may be stored examples or estimates, not live observations.',
    color: 'text-violet-700 dark:text-cinema-violet',
  },
  {
    icon: SlidersHorizontal,
    step: '03',
    title: 'Check Limitations',
    desc: 'Review source and methodology details where provided; references and timestamps are not available for every value.',
    color: 'text-emerald-700 dark:text-cinema-aurora',
  },
  {
    icon: Download,
    step: '04',
    title: 'Download If Available',
    desc: 'Some project pages include files for download. Availability is indicated on the relevant page and varies by project.',
    color: 'text-amber-700 dark:text-cinema-amber',
  },
];

export default function DataLabHowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 overflow-hidden bg-muted/40">
      <div className="absolute inset-0 hidden cinema-grid opacity-15 dark:block" />
      <div className="content-page relative z-10 py-24">
        <ScrollReveal>
          <SectionHeader
            label="How to Use the Collection"
            title="Explore Each Project Page"
            subtitle="Project detail, interactivity, source notes, and downloads vary by page."
            align="center"
            light
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-14">
          {STEPS.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 90}>
              <div className="group relative h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-secondary">
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <span className="bg-gradient-to-br from-foreground/25 to-foreground/5 bg-clip-text text-4xl font-bold text-transparent">
                    {s.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
