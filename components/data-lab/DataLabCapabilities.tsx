'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { Code2, Presentation, Sheet, BrainCircuit, Database, Workflow } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: BrainCircuit,
    title: 'Predictive Modelling',
    desc: 'S-curve forecasts, penetration models, and scenario bands calibrated on real registrations and filings.',
    color: 'text-cinema-violet',
    glow: 'rgba(124,58,237,0.4)',
  },
  {
    icon: Database,
    title: 'Unit Economics',
    desc: 'Store-level and cohort-level P&L builds that pinpoint contribution-margin break-even thresholds.',
    color: 'text-cinema-cyan',
    glow: 'rgba(6,182,212,0.4)',
  },
  {
    icon: Code2,
    title: 'Python & Pandas',
    desc: 'Clean, reproducible data pipelines with scipy, matplotlib, and scikit-learn for serious analysis.',
    color: 'text-cinema-aurora',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    icon: Presentation,
    title: 'Power BI Dashboards',
    desc: 'Interactive executive dashboards that turn raw datasets into decision-ready visuals.',
    color: 'text-cinema-amber',
    glow: 'rgba(245,158,11,0.4)',
  },
  {
    icon: Sheet,
    title: 'Excel Financial Models',
    desc: 'Transparent, auditable model builds — every assumption surfaced, every driver adjustable.',
    color: 'text-cinema-glow-blue',
    glow: 'rgba(59,130,246,0.4)',
  },
  {
    icon: Workflow,
    title: 'End-to-End Workflows',
    desc: 'From raw data sourcing to validated insights — documented methodology on every project.',
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
            label="What We Build"
            title="The Full Analytics Toolkit"
            subtitle="Every Data Lab project ships with transparent methodology, interactive exploration, and downloadable data."
            align="center"
            light
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-14">
          {CAPABILITIES.map((cap, i) => (
            <ScrollReveal key={cap.title} delay={i * 80}>
              <div className="glass-cinema group h-full rounded-2xl border border-white/10 p-7 hover:border-white/25 transition-all duration-300 hover:-translate-y-1.5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <cap.icon className={`w-7 h-7 ${cap.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{cap.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{cap.desc}</p>
                {/* subtle glow on hover */}
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
