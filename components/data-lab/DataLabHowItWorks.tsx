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
    color: 'text-cinema-cyan',
  },
  {
    icon: BrainCircuit,
    step: '02',
    title: 'Inspect the View',
    desc: 'Charts and interactive controls differ by page. Values may be stored examples or estimates, not live observations.',
    color: 'text-cinema-violet',
  },
  {
    icon: SlidersHorizontal,
    step: '03',
    title: 'Check Limitations',
    desc: 'Review source and methodology details where provided; references and timestamps are not available for every value.',
    color: 'text-cinema-aurora',
  },
  {
    icon: Download,
    step: '04',
    title: 'Download If Available',
    desc: 'Some project pages include files for download. Availability is indicated on the relevant page and varies by project.',
    color: 'text-cinema-amber',
  },
];

export default function DataLabHowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-cinema-ink scroll-mt-24">
      <div className="absolute inset-0 cinema-grid opacity-15" />
      <div className="wrap relative z-10 max-w-6xl py-24">
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
              <div className="glass-cinema group relative h-full rounded-2xl border border-white/10 p-6 hover:border-white/25 transition-all duration-300 hover:-translate-y-1.5">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-muted border border-border flex items-center justify-center">
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <span className="text-4xl font-bold text-brand">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
