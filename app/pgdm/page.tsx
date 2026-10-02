import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, BookOpen, Clock3, Layers, ArrowRight, FlaskConical, CircleDot } from 'lucide-react';
import { SUBJECTS, getLiveLectureCount, getTotalLectureCount } from '@/lib/pgdm/curriculum';
import { TRACK_META } from '@/lib/pgdm/types';

export const metadata: Metadata = {
  title: { absolute: 'PGDM Curriculum — Finance Major & Business Analytics Minor' },
  description:
    'The full PGDM Semester III curriculum: 14 subjects, 73 lectures, MCQ quizzes, cheat sheets and 16 calculators — Finance major and Business Analytics minor.',
  alternates: { canonical: '/pgdm' },
};

const TRACK_STYLE = {
  CORE: {
    icon: '🏛️',
    gradient: 'from-sky-500/15 via-cinema-blue/10 to-transparent',
    ring: 'border-sky-500/25',
    chip: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    num: 'from-sky-700 to-blue-700',
    glow: 'hover:shadow-[0_0_44px_rgba(14,165,233,0.20)]',
  },
  FINANCE: {
    icon: '💹',
    gradient: 'from-teal-500/15 via-cinema-cyan/10 to-transparent',
    ring: 'border-teal-500/25',
    chip: 'bg-teal-500/10 text-teal-300 border-teal-500/25',
    num: 'from-teal-700 to-emerald-700',
    glow: 'hover:shadow-[0_0_44px_rgba(13,110,110,0.20)]',
  },
  ANALYTICS: {
    icon: '📈',
    gradient: 'from-cinema-violet/15 via-indigo-500/10 to-transparent',
    ring: 'border-cinema-violet/25',
    chip: 'bg-cinema-violet/10 text-violet-300 border-cinema-violet/25',
    num: 'from-violet-700 to-indigo-700',
    glow: 'hover:shadow-[0_0_44px_rgba(124,58,237,0.20)]',
  },
} as const;

export default function PgdmPage() {
  const liveTotal = getLiveLectureCount();
  const lecturesTotal = getTotalLectureCount();
  const totalCredits = SUBJECTS.reduce((n, s) => n + s.credits, 0);

  const renderTrack = (track: 'CORE' | 'FINANCE' | 'ANALYTICS') => {
    const meta = TRACK_META[track];
    const style = TRACK_STYLE[track];
    const subjects = SUBJECTS.filter((s) => s.track === track);
    const live = subjects.reduce((n, s) => n + s.lectures.filter((l) => l.status === 'live').length, 0);
    const planned = subjects.reduce((n, s) => n + s.lectures.length, 0);

    return (
      <section className="space-y-5">
        {/* Track header */}
        <div className={`relative rounded-3xl border ${style.ring} bg-cinema-charcoal/60 backdrop-blur-md overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} pointer-events-none`} />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 p-6 md:p-7">
            <span className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${style.num} text-white flex items-center justify-center shadow-xl text-2xl`}>
              {style.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest border rounded-full px-2.5 py-0.5 ${style.chip}`}>
                  {meta.kind} Specialization
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  {subjects.length} papers · {subjects.reduce((n, s) => n + s.credits, 0)} credits
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{meta.label}</h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-3xl leading-relaxed">{meta.blurb}</p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-teal-300 font-mono font-semibold">
                <CircleDot className="w-3.5 h-3.5" /> {live} live
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-gray-400 font-mono">
                <Layers className="w-3.5 h-3.5" /> {planned} lectures
              </span>
            </div>
          </div>
        </div>

        {/* Subject cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((s) => {
            const liveCount = s.lectures.filter((l) => l.status === 'live').length;
            const total = s.lectures.length;
            const pct = total ? Math.round((liveCount / total) * 100) : 0;
            return (
              <Link
                key={s.slug}
                href={`/pgdm/${s.slug}`}
                className={`group relative flex flex-col h-full bg-cinema-graphite/70 backdrop-blur-sm border border-white/8 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${style.glow}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={`text-[10px] font-bold font-mono uppercase tracking-widest border rounded-full px-2.5 py-1 ${style.chip}`}>
                    {s.code}
                  </span>
                  {liveCount > 0 ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-300/90 bg-amber-500/10 border border-amber-500/25 rounded-full px-2 py-0.5">
                      BUILDING
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white leading-snug group-hover:text-brand-hover transition-colors">
                  {s.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{s.tagline}</p>

                <div className="mt-3 flex items-center gap-3 text-[11px] text-gray-500 font-mono">
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{s.credits} cr</span>
                  <span className="flex items-center gap-1"><Clock3 className="w-3.5 h-3.5" />{s.hours}h</span>
                  <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" />{s.units.length} units</span>
                </div>

                {/* progress */}
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mb-1.5">
                    <span>{liveCount > 0 ? `${liveCount} of ${total} lectures live` : 'syllabus mapped · lectures queued'}</span>
                    <span>{liveCount > 0 ? `${pct}%` : '0%'}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${style.num} transition-all duration-500`}
                      style={{ width: `${Math.max(pct, 3)}%` }}
                    />
                  </div>
                </div>

                <span className="absolute right-4 bottom-4 text-gray-600 group-hover:text-brand-hover group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-cinema-black text-gray-100">
      {/* ── HERO ── */}
      <header className="relative overflow-hidden bg-cinema-ink py-14 md:py-18 border-b border-white/5">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-300 text-xs font-bold rounded-full uppercase tracking-wider border border-teal-500/30">
                  <GraduationCap className="w-3.5 h-3.5" /> PGDM 2025–27
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Year II · Semester III — You are here
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Specialization Tracks
              </h1>
              <p className="text-sm md:text-base text-gray-300 max-w-2xl leading-relaxed">
                Your dual specialization — <span className="text-teal-300 font-semibold">Finance (Major)</span> and{' '}
                <span className="text-violet-300 font-semibold">Business Analytics (Minor)</span> — every paper mapped
                unit-by-unit from the handbook, with in-depth lectures, worked examples, case studies, diagrams and
                live modeling tools.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                <div className="text-lg font-bold text-white font-mono">14</div>
                <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Papers</div>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                <div className="text-lg font-bold text-teal-300 font-mono">{liveTotal}</div>
                <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Live Lectures</div>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                <div className="text-lg font-bold text-violet-300 font-mono">{lecturesTotal}</div>
                <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Lecture Slots</div>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
                <div className="text-lg font-bold text-emerald-400 font-mono">{totalCredits}</div>
                <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Credits</div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ── TRACKS ── */}
      <main className="max-w-[1200px] mx-auto px-6 py-12 md:py-14 space-y-12">
        {/* ── CROSS-SUBJECT SEARCH ── */}
        <form action="/pgdm/search" method="get" className="flex flex-col sm:flex-row gap-2 rounded-2xl border border-white/8 bg-cinema-charcoal/60 p-3">
          <input
            name="q"
            placeholder="Search all 14 subjects — lectures, formulas, revision notes, practice Q&A…"
            className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50"
          />
          <button
            type="submit"
            className="rounded-xl border border-teal-500/30 bg-teal-500/10 px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-teal-300 hover:bg-teal-500/20 transition-colors"
          >
            Search curriculum
          </button>
        </form>

        {renderTrack('CORE')}
        {renderTrack('FINANCE')}
        {renderTrack('ANALYTICS')}

        <p className="text-center text-xs text-gray-500 pb-4 flex items-center justify-center gap-2">
          <FlaskConical className="w-3.5 h-3.5" />
          Curriculum transcribed from the PGDM (2025–27) handbook · new lectures publish weekly — Finance major first
        </p>
      </main>
    </div>
  );
}
