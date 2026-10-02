'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { DataLabProject } from '@/types';
import { Search, SlidersHorizontal, X, ArrowUpRight, Clock, FolderOpen } from 'lucide-react';

const SECTOR_COLORS: Record<string, string> = {
  'Venture Capital': 'text-violet-700 dark:text-cinema-violet',
  'Quick Commerce': 'text-teal-700 dark:text-cinema-cyan',
  'Electric Vehicles': 'text-emerald-700 dark:text-cinema-aurora',
  'Fintech': 'text-amber-700 dark:text-cinema-amber',
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
      <div className="sticky top-20 z-30 rounded-2xl border border-border bg-card/95 p-5 shadow-sm backdrop-blur-xl md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search projects, questions, tools…"
              className="w-full rounded-xl border border-input bg-background py-3 pl-12 pr-4 text-foreground transition placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Toggle filters (mobile) */}
          <button
            onClick={() => setShowFilters(v => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-secondary-foreground transition hover:border-primary/50 md:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {(tool !== 'All' || sector !== 'All') && (
              <span className="h-2 w-2 rounded-full bg-primary" />
            )}
          </button>

          {/* Desktop filters */}
          <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col sm:flex-row gap-4 md:items-center`}>
            <select
              value={tool}
              onChange={e => setTool(e.target.value)}
              className="cursor-pointer appearance-none rounded-xl border border-input bg-background px-4 py-3 pr-8 text-sm text-foreground transition focus:border-primary/60 focus:outline-none"
            >
              <option value="All">All Tools</option>
              {allTools.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
              value={sector}
              onChange={e => setSector(e.target.value)}
              className="cursor-pointer appearance-none rounded-xl border border-input bg-background px-4 py-3 pr-8 text-sm text-foreground transition focus:border-primary/60 focus:outline-none"
            >
              <option value="All">All Sectors</option>
              {allSectors.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Active filter chips */}
        {(tool !== 'All' || sector !== 'All') && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tool !== 'All' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                Tool: {tool}
                <button onClick={() => setTool('All')} className="hover:opacity-70"><X className="h-3 w-3" /></button>
              </span>
            )}
            {sector !== 'All' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-600/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-700 dark:border-cinema-violet/30 dark:text-cinema-violet">
                Sector: {sector}
                <button onClick={() => setSector('All')} className="hover:opacity-70"><X className="h-3 w-3" /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Result count */}
      <div className="mb-6 mt-8 flex items-center justify-between text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''} found
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
            <h3 className="mb-5 mt-12 text-lg font-semibold text-foreground">More Projects</h3>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-border bg-card py-24 text-center shadow-sm">
          <div className="text-5xl mb-4">🔬</div>
          <h3 className="mb-2 text-2xl font-bold text-foreground">No projects match</h3>
          <p className="mx-auto mb-6 max-w-md text-muted-foreground">Try clearing your search or filters to explore all Data Lab projects.</p>
          <button
            onClick={() => { setQuery(''); setTool('All'); setSector('All'); }}
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm text-primary transition hover:bg-primary/20"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: DataLabProject }) {
  const color = SECTOR_COLORS[project.sector] ?? 'text-teal-700 dark:text-cinema-cyan';
  const glow = GLOWS[project.sector] ?? 'cyan';
  const fallback = `/images/data-lab/${project.slug}.jpg`;

  return (
    <Link
      href={`/data-lab/${project.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Tools row */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
          {project.tools.slice(0, 3).map(t => (
            <span key={t} className="rounded-md border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-medium text-gray-100 backdrop-blur">
              {t}
            </span>
          ))}
          {project.tools.length > 3 && (
            <span className="rounded-md border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] text-gray-100 backdrop-blur">+{project.tools.length - 3}</span>
          )}
        </div>
        {/* Arrow */}
        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur transition-all duration-300 group-hover:bg-primary">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold uppercase tracking-wider ${color}`}>{project.sector}</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" /> {project.duration}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.summary || project.businessQuestion}
        </p>

        {/* KPIs */}
        {project.kpis && project.kpis.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
            {project.kpis.slice(0, 2).map(k => (
              <div key={k.label}>
                <div className="text-xl font-bold text-foreground">{k.value}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{k.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
