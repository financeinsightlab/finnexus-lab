'use client'

import { useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Target,
  GraduationCap,
  BarChart3,
  ArrowRight,
  Clock,
  BookOpen,
  Layers,
  ChevronRight,
  Zap,
  Trophy,
  Brain,
} from 'lucide-react'

// ─── Course data ─────────────────────────────────────────────────────────────

const COURSES = [
  {
    id: 'placement',
    href: '/study/placement-prep',
    image: '/course-placement-prep.png',
    accent: '20,184,166',          // teal
    accentClass: 'teal',
    borderHover: 'hover:border-teal-500/50',
    badge: 'bg-teal-500/15 text-teal-400 border-teal-500/25',
    badgeLabel: '60-Day Plan',
    tagline: 'FREE · STRUCTURED · CAREER-READY',
    title: 'Placement Preparation Tracker',
    subtitle: 'Finance + Business Analytics · 15 LPA+ Roles',
    description:
      'A free 60-day placement prep plan for Finance & Business Analytics students. Daily tracker, Q&A-driven learning material, and a portfolio lab packed with project ideas to land your dream role.',
    icon: Target,
    stats: [
      { icon: Clock,    value: '60 Days',  label: 'Structured Plan' },
      { icon: BookOpen, value: 'Daily',    label: 'Tracker + Q&A'  },
      { icon: Trophy,   value: '15 LPA+',  label: 'Target Roles'   },
    ],
    cta: 'Start Preparing',
    gradient: 'from-teal-600/20 via-teal-500/5 to-transparent',
    glow: 'rgba(20,184,166,0.15)',
  },
  {
    id: 'skill-academy',
    href: '/study/courses',
    image: '/course-skill-academy.png',
    accent: '245,158,11',          // amber
    accentClass: 'amber',
    borderHover: 'hover:border-amber-500/50',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    badgeLabel: '25+ Tracks',
    tagline: 'FREE · ZERO → EXPERT · 148+ MODULES',
    title: 'Skill Academy — Zero → Expert',
    subtitle: 'Power BI · Excel · SQL · Python · Tableau · Statistics',
    description:
      '148+ free modules covering Power BI, Excel, SQL, Tableau, Python, Statistics, English Communication, and Aptitude. Every track takes you from absolute zero to world-class expert.',
    icon: GraduationCap,
    stats: [
      { icon: Layers,   value: '148+',     label: 'Free Modules'   },
      { icon: BookOpen, value: '25+',      label: 'Course Tracks'  },
      { icon: Zap,      value: 'Zero→Pro', label: 'All Levels'     },
    ],
    cta: 'Explore Courses',
    gradient: 'from-amber-600/20 via-amber-500/5 to-transparent',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    id: 'analyst-complete',
    href: '/study/analyst-course',
    image: '/course-analyst-complete.png',
    accent: '139,92,246',          // violet
    accentClass: 'violet',
    borderHover: 'hover:border-violet-500/50',
    badge: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
    badgeLabel: '15 Levels',
    tagline: 'FREE · SIGNALPATH · 100+ LESSONS',
    title: 'Analyst Complete Course',
    subtitle: 'Analytics Orientation → Production Portfolio',
    description:
      'A complete structured path — 15 levels, 100+ lessons, 40+ projects. Dashboard, SQL Lab, Learning Library, Assessments, Case Studies, Interview Center, Portfolio Builder, Metrics Dictionary.',
    icon: Brain,
    stats: [
      { icon: Layers,   value: '15',      label: 'Levels'          },
      { icon: BookOpen, value: '100+',    label: 'Lessons'         },
      { icon: BarChart3,value: '40+',     label: 'Projects'        },
    ],
    cta: 'Open Course',
    gradient: 'from-violet-600/20 via-violet-500/5 to-transparent',
    glow: 'rgba(139,92,246,0.15)',
  },
]

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────

function CourseCard({ course, index }: { course: (typeof COURSES)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef  = useRef<number>(0)
  const Icon    = course.icon

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const rotY =  ((x / rect.width)  - 0.5) * 14
      const rotX = -((y / rect.height) - 0.5) * 10
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return
        cardRef.current.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`
        cardRef.current.style.boxShadow = `0 30px 70px rgba(${course.accent},0.25), 0 0 0 1px rgba(${course.accent},0.3)`
      })
    },
    [course.accent]
  )

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return
      cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
      cardRef.current.style.boxShadow = `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)`
    })
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative rounded-2xl overflow-hidden transition-[transform,box-shadow] duration-300 ease-out"
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
        background: 'linear-gradient(160deg, #111827 0%, #0d1117 100%)',
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* ── Image Banner ── */}
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        {/* Gradient fade to card body */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(${course.accent},0.12) 0%, rgba(13,17,23,0.75) 70%, #0d1117 100%)`,
          }}
        />
        {/* Top-left tagline */}
        <div className="absolute top-3 left-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-white/50 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10">
            {course.tagline}
          </span>
        </div>
        {/* Top-right badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border backdrop-blur-sm ${course.badge}`}>
            {course.badgeLabel}
          </span>
        </div>
        {/* Bottom-left icon */}
        <div
          className="absolute bottom-3 left-4 w-10 h-10 rounded-xl flex items-center justify-center border backdrop-blur-sm"
          style={{
            background: `rgba(${course.accent}, 0.18)`,
            borderColor: `rgba(${course.accent}, 0.4)`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: `rgb(${course.accent})` }} />
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5" style={{ transform: 'translateZ(20px)' }}>
        {/* Subtitle */}
        <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: `rgb(${course.accent})` }}>
          {course.subtitle}
        </p>

        {/* Title */}
        <h3 className="text-lg font-extrabold text-white leading-tight mb-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-[12px] text-slate-400 leading-relaxed mb-4">
          {course.description}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-4" />

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-5">
          {course.stats.map((stat) => {
            const StatIcon = stat.icon
            return (
              <div key={stat.label} className="flex items-center gap-1.5">
                <StatIcon className="w-3.5 h-3.5 text-slate-600" />
                <div>
                  <div className="text-xs font-black text-white leading-none">{stat.value}</div>
                  <div className="text-[10px] text-slate-600 leading-none mt-0.5">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <Link
          href={course.href}
          className="group/btn flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
          style={{
            background: `linear-gradient(135deg, rgba(${course.accent},0.2), rgba(${course.accent},0.1))`,
            border: `1px solid rgba(${course.accent},0.3)`,
            color: `rgb(${course.accent})`,
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = `rgba(${course.accent},0.25)`
            ;(e.currentTarget as HTMLElement).style.borderColor = `rgba(${course.accent},0.5)`
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, rgba(${course.accent},0.2), rgba(${course.accent},0.1))`
            ;(e.currentTarget as HTMLElement).style.borderColor = `rgba(${course.accent},0.3)`
          }}
        >
          {course.cta}
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </div>

      {/* Corner accent glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none opacity-30"
        style={{ background: `rgb(${course.accent})` }}
      />
    </div>
  )
}

// ─── Main Exported Section ────────────────────────────────────────────────────

export default function CoursesSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#0a0c12] to-[#0B0D13] py-14 border-b border-white/5">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.05] bg-teal-400" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.05] bg-amber-400" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.05] bg-violet-500" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-4">
            <ChevronRight className="w-3 h-3" />
            Featured Courses & Programs
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-violet-400 to-amber-400">
              Become an Analyst
            </span>
          </h2>
          <p className="text-slate-500 mt-3 text-sm max-w-xl mx-auto">
            Three free, structured programs — pick your path and start learning today.
          </p>
        </div>

        {/* ── 3D Course Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {COURSES.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>

        {/* ── Bottom tagline ── */}
        <p className="text-center text-[11px] text-slate-700 mt-8 font-medium">
          All programs are completely free · No sign-up required to browse
        </p>
      </div>
    </section>
  )
}
