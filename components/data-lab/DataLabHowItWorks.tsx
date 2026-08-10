'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { Database, BrainCircuit, SlidersHorizontal, Download } from 'lucide-react';

const STEPS = [
  {
    icon: Database,
    step: '01',
    title: 'Source the Data',
    desc: 'Every project begins with raw, verifiable data — company filings, RBI/VAHAN statistics, and industry reports. Sources are cited in the methodology.',
    color: 'text-cinema-cyan',
  },
  {
    icon: BrainCircuit,
    step: '02',
    title: 'Build the Model',
    desc: 'We construct transparent, reproducible models in Python, Excel, or Power BI — every assumption surfaced, every driver adjustable.',
    color: 'text-cinema-violet',
  },
  {
    icon: SlidersHorizontal,
    step: '03',
    title: 'Explore Interactively',
    desc: 'Adjust inputs with live simulators, switch chart views, and interrogate the numbers — then download the dataset to verify.',
    color: 'text-cinema-aurora',
  },
  {
    icon: Download,
    step: '04',
    title: 'Take It Away',
    desc: 'Every project ships a downloadable CSV and a documented write-up so you can reuse the analysis in your own work.',
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
            label="How It Works"
            title="From Raw Data to Interactive Insight"
            subtitle="A transparent, four-step process behind every Data Lab project."
            align="center"
            light
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-14">
          {STEPS.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 90}>
              <div className="glass-cinema group relative h-full rounded-2xl border border-white/10 p-6 hover:border-white/25 transition-all duration-300 hover:-translate-y-1.5">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white/25 to-white/5">
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
