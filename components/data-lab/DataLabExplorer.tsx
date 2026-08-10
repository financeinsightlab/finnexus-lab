'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { DataLabProject } from '@/types';
import { Search, SlidersHorizontal, X, ArrowUpRight, Clock, FolderOpen } from 'lucide-react';

const SECTOR_COLORS: Record<string, string> = {
  'Venture Capital': 'text-cinema-violet',
  'Quick Commerce': 'text-cinema-cyan',
  'Electric Vehicles': 'text-cinema-aurora',
  'Fintech': 'text-cinema-amber',
};

const GLOWS: Record<string, string> = {
  'Venture Capital': 'violet',
  'Quick Commerce': 'cyan',
  'Electric Vehicles': 'aurora',
  'Fintech': 'amber',
};

export default function DataLabExplorer({ projects }: { projects: DataLabProject[] }) {
  const [query, setQuery] = useState('');
  const [tool, setTool] = useState('All');
  const [sector, setSector] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const allTools = useMemo(
    () => Array.from(new Set(projects.flatMap(p => p.tools))).sort(),
    [projects]
  );
  const allSectors = useMemo(
    () => Array.from(new Set(projects.map(p => p.sector))).sort(),
    [projects]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(p => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.businessQuestion.toLowerCase().includes(q) ||
        p.summary?.toLowerCase().includes(q) ||
        p.tools.join(' ').toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q);
      const matchTool = tool === 'All' || p.tools.includes(tool);
      const matchSector = sector === 'All' || p.sector === sector;
      return matchQ && matchTool && matchSector;
    });
  }, [projects, query, tool, sector]);

  const featured = useMemo(() => filtered.filter(p => p.featured), [filtered]);
  const others = useMemo(() => filtered.filter(p => !p.featured), [filtered]);

  return (
    <div>
      {/* Search + Filter Bar */}
      <div className="glass-cinema rounded-2xl border border-white/10 p-5 md:p-6 sticky top-20 z-30 shadow-cinema-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search projects, questions, tools…"
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cinema-cyan/60 focus:ring-1 focus:ring-cinema-cyan/40 transition"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Toggle filters (mobile) */}
          <button
            onClick={() => setShowFilters(v => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-200 hover:border-cinema-cyan/50 transition md:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {(tool !== 'All' || sector !== 'All') && (
              <span className="w-2 h-2 rounded-full bg-cinema-cyan" />
            )}
          </button>

          {/* Desktop filters */}
          <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col sm:flex-row gap-4 md:items-center`}>
            <select
              value={tool}
              onChange={e => setTool(e.target.value)}
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-cinema-cyan/60 transition cursor-pointer appearance-none pr-8"
            >
              <option value="All" className="bg-cinema-ink">All Tools</option>
              {allTools.map(t => <option key={t} value={t} className="bg-cinema-ink">{t}</option>)}
            </select>
            <select
              value={sector}
              onChange={e => setSector(e.target.value)}
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-cinema-cyan/60 transition cursor-pointer appearance-none pr-8"
            >
              <option value="All" className="bg-cinema-ink">All Sectors</option>
              {allSectors.map(s => <option key={s} value={s} className="bg-cinema-ink">{s}</option>)}
            </select>
          </div>
        </div>

        {/* Active filter chips */}
        {(tool !== 'All' || sector !== 'All') && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tool !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cinema-cyan/15 text-cinema-cyan text-xs border border-cinema-cyan/30">
                Tool: {tool}
                <button onClick={() => setTool('All')} className="hover:text-white"><X className="w-3 h-3" /></button>
              </span>
            )}
            {sector !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cinema-violet/15 text-cinema-violet text-xs border border-cinema-violet/30">
                Sector: {sector}
                <button onClick={() => setSector('All')} className="hover:text-white"><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between mt-8 mb-6 text-sm text-gray-400">
        <span className="inline-flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-cinema-cyan" />
          <span className="text-white font-medium">{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      )}

      {/* Others */}
      {others.length > 0 && (
        <>
          {featured.length > 0 && (
            <h3 className="text-lg font-semibold text-gray-300 mt-12 mb-5">More Projects</h3>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-24 glass-cinema rounded-2xl border border-white/10">
          <div className="text-5xl mb-4">🔬</div>
          <h3 className="text-2xl font-bold text-white mb-2">No projects match</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Try clearing your search or filters to explore all Data Lab projects.</p>
          <button
            onClick={() => { setQuery(''); setTool('All'); setSector('All'); }}
            className="inline-flex items-center gap-2 rounded-xl bg-cinema-cyan/15 border border-cinema-cyan/30 text-cinema-cyan px-5 py-2.5 text-sm hover:bg-cinema-cyan/25 transition"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: DataLabProject }) {
  const color = SECTOR_COLORS[project.sector] ?? 'text-cinema-cyan';
  const glow = GLOWS[project.sector] ?? 'cyan';
  const fallback = `/images/data-lab/${project.slug}.jpg`;

  return (
    <Link
      href={`/data-lab/${project.slug}`}
      className="glass-cinema group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cinema-xl"
    >
      {/* Image banner */}
      <div className="relative overflow-hidden" style={{ height: 160 }}>
        <Image
          src={project.image ?? fallback}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121419] via-transparent to-transparent" />
        {/* Tools row */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
          {project.tools.slice(0, 3).map(t => (
            <span key={t} className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur text-[10px] font-medium text-gray-200 border border-white/10">
              {t}
            </span>
          ))}
          {project.tools.length > 3 && (
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur text-[10px] text-gray-300 border border-white/10">+{project.tools.length - 3}</span>
          )}
        </div>
        {/* Arrow */}
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-cinema-cyan/20 backdrop-blur flex items-center justify-center text-white border border-cinema-cyan/30 transition-all duration-300 group-hover:bg-cinema-cyan group-hover:shadow-cinema-md">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold uppercase tracking-wider ${color}`}>{project.sector}</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
            <Clock className="w-3 h-3" /> {project.duration}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white leading-snug mb-2 group-hover:text-cinema-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
          {project.summary || project.businessQuestion}
        </p>

        {/* KPIs */}
        {project.kpis && project.kpis.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
            {project.kpis.slice(0, 2).map(k => (
              <div key={k.label}>
                <div className="text-xl font-bold cinema-text-gradient">{k.value}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{k.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
