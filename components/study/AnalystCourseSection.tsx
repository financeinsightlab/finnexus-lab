'use client'

import Link from 'next/link'
import {
  GraduationCap,
  BarChart3,
  Database,
  Code2,
  Brain,
  BookOpen,
  Star,
  ChevronRight,
  Target,
  TrendingUp,
  Briefcase,
} from 'lucide-react'

// ─── Course sections that match the actual course nav ──────────────────────
const COURSE_SECTIONS = [
  { icon: BarChart3,    label: 'Dashboard',          desc: 'Career readiness, streaks, skill signals & daily mission', color: '20,184,166' },
  { icon: Target,       label: 'Learning Path',       desc: 'Employability roadmap · Levels 0–14 · Personalized journey', color: '139,92,246' },
  { icon: Star,         label: 'Daily Mission',        desc: 'Focused 2-hour session · Learn → Practice → Case → Check', color: '245,158,11' },
  { icon: Database,     label: 'SQL Lab',             desc: 'Real queries on business data · E-commerce, SaaS, HR datasets', color: '59,130,246' },
  { icon: BookOpen,     label: 'Learning Library',     desc: 'Lesson-by-lesson curriculum · Levels 0–14 · Full content', color: '34,197,94' },
  { icon: Brain,        label: 'Assessments',          desc: 'Knowledge checks · Analyst-mindset feedback · XP tracking', color: '217,70,239' },
  { icon: Code2,        label: 'Projects',             desc: '40+ production projects · E-commerce, SaaS, finance, HR', color: '14,165,233' },
  { icon: Briefcase,    label: 'Case Studies',         desc: 'Ambiguous business problems · Frameworks · Executive briefs', color: '244,63,94' },
  { icon: TrendingUp,   label: 'Interview Center',     desc: 'SQL, Case & Behavioral simulators · 45 challenges', color: '249,115,22' },
  { icon: Star,         label: 'Portfolio Builder',    desc: 'Project proofs → GitHub, resume bullets, LinkedIn summaries', color: '132,204,22' },
  { icon: BarChart3,    label: 'Metrics Dictionary',   desc: 'CAC, LTV, Retention, MRR, AOV & 50+ business metrics', color: '236,72,153' },
]

// ─── Level overview pills ──────────────────────────────────────────────────
const LEVELS = [
  { id: 0, title: 'Analytics Orientation',        color: 'cyan' },
  { id: 1, title: 'Spreadsheet Analyst',           color: 'green' },
  { id: 2, title: 'Statistics for Business',       color: 'violet' },
  { id: 3, title: 'SQL Analyst',                   color: 'amber' },
  { id: 4, title: 'Python Analyst',                color: 'blue' },
  { id: 5, title: 'Data Quality & Preparation',    color: 'rose' },
  { id: 6, title: 'Business Intelligence',         color: 'orange' },
  { id: 7, title: 'Business Analytics',            color: 'teal' },
  { id: 8, title: 'Financial Analytics',           color: 'lime' },
  { id: 9, title: 'Product Analytics',             color: 'sky' },
  { id: 10, title: 'Advanced Analytics',           color: 'fuchsia' },
  { id: 11, title: 'Analytics Engineering',        color: 'indigo' },
  { id: 12, title: 'AI & GenAI Analytics',         color: 'pink' },
  { id: 13, title: 'Case & Consulting Lab',        color: 'emerald' },
  { id: 14, title: 'Production Portfolio & Career',color: 'yellow' },
]

const COLOR_MAP: Record<string, { badge: string; dot: string }> = {
  cyan:    { badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',       dot: 'bg-cyan-400' },
  green:   { badge: 'bg-green-500/15 text-green-400 border-green-500/25',    dot: 'bg-green-400' },
  violet:  { badge: 'bg-violet-500/15 text-violet-400 border-violet-500/25', dot: 'bg-violet-400' },
  amber:   { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25',    dot: 'bg-amber-400' },
  blue:    { badge: 'bg-blue-500/15 text-blue-400 border-blue-500/25',       dot: 'bg-blue-400' },
  rose:    { badge: 'bg-rose-500/15 text-rose-400 border-rose-500/25',       dot: 'bg-rose-400' },
  orange:  { badge: 'bg-orange-500/15 text-orange-400 border-orange-500/25', dot: 'bg-orange-400' },
  teal:    { badge: 'bg-teal-500/15 text-teal-400 border-teal-500/25',       dot: 'bg-teal-400' },
  lime:    { badge: 'bg-lime-500/15 text-lime-400 border-lime-500/25',       dot: 'bg-lime-400' },
  sky:     { badge: 'bg-sky-500/15 text-sky-400 border-sky-500/25',          dot: 'bg-sky-400' },
  fuchsia: { badge: 'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/25', dot: 'bg-fuchsia-400' },
  indigo:  { badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25', dot: 'bg-indigo-400' },
  pink:    { badge: 'bg-pink-500/15 text-pink-400 border-pink-500/25',       dot: 'bg-pink-400' },
  emerald: { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', dot: 'bg-emerald-400' },
  yellow:  { badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25', dot: 'bg-yellow-400' },
}

export default function AnalystCourseSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#090b12] to-[#0B0D13] py-14 border-t border-white/5">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.06] bg-teal-500" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.06] bg-violet-600" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">

        {/* ─── Header ─── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-full mb-4">
              <GraduationCap className="w-3 h-3" />
              SignalPath — Analyst Complete Course
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Business Analytics
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400">
                Zero → Expert Curriculum
              </span>
            </h2>
            <p className="text-slate-400 mt-3 max-w-2xl text-sm leading-relaxed">
              A complete structured path — 15 levels, 100+ lessons, 40+ projects.
              Dashboard · SQL Lab · Learning Library · Assessments · Projects · Case Studies ·
              Interview Center · Portfolio Builder · Metrics Dictionary.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6 shrink-0">
            {[
              { value: '15',   label: 'Levels' },
              { value: '100+', label: 'Lessons' },
              { value: '40+',  label: 'Projects' },
              { value: '11',   label: 'Sections' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white tabular-nums">{s.value}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Section Cards Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {COURSE_SECTIONS.map((section, i) => {
            const Icon = section.icon
            return (
              <Link
                key={i}
                href="/study/analyst-course"
                className="group relative rounded-2xl overflow-hidden border border-white/6 bg-[#111827]/80 hover:bg-[#1a2235]/90 hover:border-white/12 transition-all duration-300 p-5 flex items-start gap-4"
                style={{
                  boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at top left, rgba(${section.color}, 0.08) 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `rgba(${section.color}, 0.12)`,
                    borderColor: `rgba(${section.color}, 0.25)`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: `rgb(${section.color})` }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors leading-tight mb-1">
                    {section.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{section.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* ─── Level roadmap pills ─── */}
        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-3">
            15 Learning Levels
          </p>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((l) => {
              const c = COLOR_MAP[l.color]
              return (
                <span key={l.id} className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg border ${c.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  L{l.id}: {l.title}
                </span>
              )
            })}
          </div>
        </div>

        {/* ─── CTA Banner ─── */}
        <div className="relative rounded-2xl overflow-hidden border border-teal-500/20 bg-gradient-to-r from-teal-500/8 via-transparent to-violet-500/8 p-6">
          {/* Decorative corner glow */}
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-[60px] opacity-20 bg-teal-400 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-15 bg-violet-500 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-teal-400" />
                <span className="text-white font-extrabold">Open the Full Interactive Course</span>
              </div>
              <p className="text-slate-400 text-sm max-w-xl">
                Dashboard, SQL Lab, Learning Library, Assessments, 40+ Projects, Case Studies,
                Interview Center, Portfolio Builder & Metrics Dictionary — all in one place,
                styled to match this website.
              </p>
            </div>
            <Link
              href="/study/analyst-course"
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20"
            >
              Open Course
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
