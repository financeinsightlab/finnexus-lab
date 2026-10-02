'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { Code2, Presentation, Sheet, BrainCircuit, Database, Workflow } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: BrainCircuit,
    title: 'Predictive Modelling',
    desc: 'Some project pages show forecasts or scenarios based on stored assumptions; they are illustrative, not validated predictions.',
    color: 'text-cinema-violet',
    glow: 'rgba(124,58,237,0.4)',
  },
  {
    icon: Database,
    title: 'Unit Economics',
    desc: 'Example unit-economics metrics appear in selected projects. Coverage and supporting evidence vary by project.',
    color: 'text-cinema-cyan',
    glow: 'rgba(6,182,212,0.4)',
  },
  {
    icon: Code2,
    title: 'Python & Pandas',
    desc: 'Python and data-analysis tools are referenced in selected project pages; code and source files are not provided on every page.',
    color: 'text-cinema-aurora',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    icon: Presentation,
    title: 'Power BI & Dashboards',
    desc: 'Some project pages reference dashboard or visualization tools. A live external dashboard is not included unless a page explicitly says so.',
    color: 'text-cinema-amber',
    glow: 'rgba(245,158,11,0.4)',
  },
  {
    icon: Sheet,
    title: 'Excel & Financial Models',
    desc: 'Selected pages demonstrate financial formulas and model assumptions; this does not promise a custom model build.',
    color: 'text-cinema-glow-blue',
    glow: 'rgba(59,130,246,0.4)',
  },
  {
    icon: Workflow,
    title: 'Data Workflows',
    desc: 'Sources, methods, and available downloads vary. Review each project page for its actual contents and limitations.',
    color: 'text-cinema-cyan',
    glow: 'rgba(6,182,212,0.4)',
  },
];

export default function DataLabCapabilities() {
  return (
    <section className="relative overflow-hidden bg-cinema-ink">
      <div className="absolute inset-0 cinema-grid opacity-20" />
      <div className="wrap relative z-10 max-w-6xl py-24">
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
              <div className="glass-cinema group h-full rounded-2xl border border-white/10 p-7 hover:border-white/25 transition-all duration-300 hover:-translate-y-1.5">
                <div
                  className="w-14 h-14 rounded-2xl border border-border bg-surface-muted flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                >
                  <cap.icon className={`w-7 h-7 ${cap.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{cap.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{cap.desc}</p>
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
