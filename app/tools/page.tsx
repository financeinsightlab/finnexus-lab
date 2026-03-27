'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { Tool } from '@/components/tools/ToolModal';

// Dynamically import the modal to avoid loading it on initial page render
const ToolModal = dynamic(() => import('@/components/tools/ToolModal'), { ssr: false });

const TOOLS: Tool[] = [
  {
    id: 1,
    icon: '📊',
    title: 'DCF Valuation Model — Comprehensive',
    category: 'Valuation',
    tool: 'Excel',
    difficulty: 'Intermediate',
    gated: true,
    desc: 'Full DCF model with 3 scenarios, sensitivity analysis, and WACC calculator.',
    includes: ['Revenue projections (5-year)', 'WACC calculator', 'Sensitivity tables', '3 scenarios']
  },
  {
    id: 2,
    icon: '🚀',
    title: 'Startup 3-Statement Financial Model',
    category: 'Financial Model',
    tool: 'Excel',
    difficulty: 'Intermediate',
    gated: true,
    desc: 'Complete financial model for early-stage companies.',
    includes: ['P&L · Balance Sheet · Cash Flow', 'Headcount planner', 'Runway calculator', 'Unit economics']
  },
  {
    id: 3,
    icon: '🗺️',
    title: 'Market Sizing Framework (TAM/SAM/SOM)',
    category: 'Market Analysis',
    tool: 'Excel + PDF',
    difficulty: 'Beginner',
    gated: false,
    desc: 'Templates for market size estimation and analysis.',
    includes: ['Top-down template', 'Bottom-up template', 'India market data', 'Worked examples']
  },
  {
    id: 4,
    icon: '⚡',
    title: 'Q-Commerce Unit Economics Model',
    category: 'Sector Model',
    tool: 'Excel',
    difficulty: 'Advanced',
    gated: true,
    desc: 'Detailed unit economics for quick commerce businesses.',
    includes: ['Dark store P&L', 'Order volume scenarios', 'CM% waterfall chart', 'Breakeven calculator']
  },
  {
    id: 5,
    icon: '🏛️',
    title: "Porter's Five Forces Template",
    category: 'Strategy',
    tool: 'PowerPoint',
    difficulty: 'Beginner',
    gated: false,
    desc: 'Strategic analysis framework for competitive positioning.',
    includes: ['5-Forces visual template', 'Rating framework', 'India sector examples', 'Strategy notes']
  },
  {
    id: 6,
    icon: '📐',
    title: 'Comparable Company Analysis (CCA)',
    category: 'Valuation',
    tool: 'Excel',
    difficulty: 'Intermediate',
    gated: true,
    desc: 'Peer company comparison and valuation multiples.',
    includes: ['Peer comp table', 'Multiple normalisation', 'Sector medians', 'Visual benchmarks']
  }
];

const CATS = ['All', 'Valuation', 'Financial Model', 'Market Analysis', 'Sector Model', 'Strategy'];
const DIFF_CLS = {
  Beginner: 'tag tag-green',
  Intermediate: 'tag tag-gold',
  Advanced: 'tag tag-navy'
};

export default function ToolsPage() {
  const [cat, setCat] = useState('All');
  const [modal, setModal] = useState<Tool | null>(null);
  const [done, setDone] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    return cat === 'All' ? TOOLS : TOOLS.filter(tool => tool.category === cat);
  }, [cat]);

  const handleDownload = (tool: Tool) => {
    if (!tool.gated) {
      alert(`Downloading: ${tool.title}`);
      return;
    }
    setModal(tool);
  };

  const freeTools = TOOLS.filter(t => !t.gated).length;
  const gatedTools = TOOLS.filter(t => t.gated).length;

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <header className="bg-gradient-to-r from-brand-navy to-teal-800 py-20">
        <div className="wrap">
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
        <div className="wrap py-4">
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
      <main className="wrap py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <div key={tool.id} className="card p-6 flex flex-col">
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
                      onClick={() => handleDownload(tool)}
                      className="text-sm font-medium text-brand-teal hover:text-brand-navy transition-colors"
                    >
                      {tool.gated ? 'Get Access →' : 'Download Free →'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Email Gate Modal — dynamically loaded */}
      {modal && (
        <ToolModal
          tool={modal}
          onClose={() => setModal(null)}
          onSuccess={(id) => setDone(prev => new Set([...prev, id]))}
        />
      )}
    </div>
  );
}