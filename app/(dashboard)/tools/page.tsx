'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import CardImageBanner from '@/components/ui/CardImageBanner';
import HeroBackground from '@/components/ui/HeroBackground';
import { TOOLS, type Tool } from '@/lib/tools-registry';

export type { Tool };
// Simplified approach w/ direct routing to calculators



const CATS = ['All', 'Valuation', 'Financial Model', 'Market Analysis', 'Sector Model', 'Strategy', 'SaaS & Tech', 'AI Strategy', 'Web3', 'Growth & Marketing'];
const DIFF_CLS = {
  Beginner: 'tag tag-green',
  Intermediate: 'tag tag-gold',
  Advanced: 'tag tag-navy'
};

export default function ToolsPage() {
  const router = useRouter();
  const [cat, setCat] = useState('All');
  const [modal, setModal] = useState<Tool | null>(null);
  const [done, setDone] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    return cat === 'All' ? TOOLS : TOOLS.filter(tool => tool.category === cat);
  }, [cat]);

  const handleDownload = (tool: Tool) => {
    router.push(`/tools/${tool.slug}`);
  };

  const freeTools = TOOLS.filter(t => !t.gated).length;
  const gatedTools = TOOLS.filter(t => t.gated).length;

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-brand-navy to-teal-800 py-20">
        <HeroBackground />
        <div className="content-page relative z-10">
          <p className="section-label text-teal-300 mb-5">Financial Tools</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Tools &amp; Models
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mb-8">
            Professional-grade financial models, templates, and frameworks for investment analysis and strategic planning.
          </p>

          {/* Stats Row */}
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
              {freeTools} Free Tools
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
              {gatedTools} Premium Tools
            </span>
          </div>
        </div>
      </header>

      {/* Sticky Category Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="content-page py-4">
          <div className="flex flex-wrap gap-2">
            {CATS.map((category) => (
              <button
                key={category}
                id={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setCat(category)}
                className={`pill ${cat === category ? 'pill-on' : 'pill-off'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <main className="content-page py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <div
              key={tool.id}
              onClick={() => router.push(`/tools/${tool.slug}`)}
              className="card flex flex-col border border-gray-200 dark:border-white/10 rounded-xl hover:shadow-lg transition-all cursor-pointer overflow-hidden group bg-white dark:bg-[#111827]"
            >
              {/* ── Image Banner ── */}
              <div className="relative h-32 w-full border-b border-gray-200 dark:border-white/10">
                <CardImageBanner
                  src={
                    tool.slug === 'dcf-valuation-model' ? '/card-dcf-model.png' :
                    tool.slug === '3-statement-model' ? '/card-startup-model.png' :
                    tool.slug === 'market-sizing-framework' ? '/card-market-sizing.png' :
                    tool.category.includes('Web3') ? '/card-web3-3d.png' :
                    tool.category.includes('SaaS') || tool.category.includes('AI') || tool.category.includes('Sector') || tool.category.includes('Growth') ? '/card-saas-3d.png' :
                    '/card-valuation-3d.png'
                  }
                  alt={tool.title}
                  icon={tool.icon}
                  gradientFrom="from-[#1a1f2e]"
                  gradientTo="to-[#2d3748]"
                  overlayOpacity="opacity-50"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Top Section */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      tool.gated ? 'bg-gold-100 text-gold-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {tool.gated ? 'Premium' : 'Free'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${DIFF_CLS[tool.difficulty]}`}>
                      {tool.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-brand-navy mb-2">{tool.title}</h3>
                <p className="text-sm text-brand-slate mb-4 flex-1">{tool.desc}</p>

                {/* Includes */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-brand-navy mb-2">Includes:</p>
                  <ul className="text-xs text-brand-slate space-y-1">
                    {tool.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-green-600 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-500">{tool.tool}</span>
                    {done.has(tool.id) ? (
                      <span className="text-sm font-medium text-green-600">✓ Link Sent!</span>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDownload(tool); }}
                        className="text-sm font-medium text-brand-teal hover:text-brand-navy transition-colors"
                      >
                        View Tool →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}