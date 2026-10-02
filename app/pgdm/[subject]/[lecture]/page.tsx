import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight, Clock3, Target, Lightbulb, AlertTriangle, Table2, GraduationCap,
  Sigma, FileText, Briefcase, ClipboardCheck, HelpCircle, Wrench, Construction, ListChecks,
} from 'lucide-react';
import { SUBJECTS, getLecture } from '@/lib/pgdm/curriculum';
import JsonLd from '@/components/seo/JsonLd';
import LessonCompletionControl from '@/components/learning/LessonCompletionControl';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import RelatedFinanceTerms from '@/components/finance-terms/RelatedFinanceTerms';
import { TRACK_META } from '@/lib/pgdm/types';

interface PageProps {
  params: Promise<{ subject: string; lecture: string }>;
}

export function generateStaticParams() {
  return SUBJECTS.flatMap((s) =>
    s.lectures.map((l) => ({ subject: s.slug, lecture: l.slug }))
  );
}

const titleCap = (parts: string, max = 62) => {
  if (parts.length <= max) return parts;
  const cut = parts.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[ —|:-]+$/, '');
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject, lecture } = await params;
  const found = getLecture(subject, lecture);
  if (!found) return {};
  return {
    title: { absolute: titleCap(`${found.lecture.title} — ${found.subject.code} Lecture`) },
    description: found.lecture.summary.slice(0, 150),
  };
}

/* ── tiny **bold** renderer ── */
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-white font-semibold">{p}</strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

const CALLOUT_STYLE = {
  note: { icon: Lightbulb, cls: 'border-blue-500/30 bg-blue-500/[0.07]', label: 'Note', labelCls: 'text-blue-700 dark:text-blue-300' },
  warning: { icon: AlertTriangle, cls: 'border-red-500/30 bg-red-500/[0.07]', label: 'Watch out', labelCls: 'text-red-700 dark:text-red-300' },
  excel: { icon: Table2, cls: 'border-emerald-500/30 bg-emerald-500/[0.07]', label: 'Excel craft', labelCls: 'text-emerald-700 dark:text-emerald-300' },
  exam: { icon: GraduationCap, cls: 'border-amber-500/30 bg-amber-500/[0.07]', label: 'Exam edge', labelCls: 'text-amber-700 dark:text-amber-300' },
} as const;

export default async function LecturePage({ params }: PageProps) {
  const { subject: subjectSlug, lecture: lectureSlug } = await params;
  const found = getLecture(subjectSlug, lectureSlug);
  if (!found) notFound();
  const { subject, lecture } = found;
  const meta = TRACK_META[subject.track];
  const accent = subject.track === 'FINANCE' ? 'teal' : 'violet';
  const chip =
    accent === 'teal'
      ? 'bg-primary/10 text-primary border-primary/25'
      : 'bg-cinema-violet/10 text-violet-700 dark:text-violet-300 border-cinema-violet/25';
  const num = accent === 'teal' ? 'from-teal-500 to-emerald-500' : 'from-violet-500 to-indigo-500';

  const BASE = 'https://kunwaranalytics.in';
  const lectureSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: lecture.title,
      description: lecture.summary,
      url: `${BASE}/pgdm/${subject.slug}/${lecture.slug}`,
      learningResourceType: 'Lecture',
      educationalLevel: 'Postgraduate (PGDM, Semester III)',
      teaches: lecture.objectives,
      timeRequired: `PT${lecture.minutes}M`,
      isPartOf: {
        '@type': 'Course',
        name: `${subject.code} — ${subject.name}`,
        url: `${BASE}/pgdm/${subject.slug}`,
      },
      provider: { '@type': 'Organization', name: 'Kunwar Analytics' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'PGDM', item: `${BASE}/pgdm` },
        { '@type': 'ListItem', position: 2, name: subject.name, item: `${BASE}/pgdm/${subject.slug}` },
        { '@type': 'ListItem', position: 3, name: lecture.title, item: `${BASE}/pgdm/${subject.slug}/${lecture.slug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={lectureSchemas} />
      {/* ── HEADER ── */}
      <header className="relative overflow-hidden border-b border-border bg-card/70 py-12">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="content-page relative z-10">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground mb-5 font-medium">
            <Link href="/pgdm" className="hover:text-primary transition-colors">PGDM</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/pgdm/${subject.slug}`} className="hover:text-primary transition-colors truncate max-w-[240px]">
              {subject.code} {subject.name}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-muted-foreground">Lecture {lecture.number}</span>
          </nav>

          <div className="flex items-start gap-4">
            <span className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${num} text-white font-mono font-extrabold text-xl flex items-center justify-center shadow-xl`}>
              {lecture.number}
            </span>
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-bold font-mono uppercase tracking-widest border rounded-full px-2.5 py-1 ${chip}`}>
                  {subject.code} · {subject.track === 'CORE' ? 'Core' : `${meta.label} ${meta.kind.toLowerCase()}`}
                </span>
                {lecture.status === 'live' ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> FULL LECTURE
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/25 rounded-full px-2.5 py-1">
                    IN PROGRESS
                  </span>
                )}
                <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                  <Clock3 className="w-3 h-3" /> {lecture.minutes} min read
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                {lecture.title}
              </h1>
              <p className="text-sm text-foreground leading-relaxed">{lecture.summary}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="content-page py-10">
        <div className="content-layout content-layout--aside-right">
          <div className="content-main space-y-10">
        {lecture.status === 'building' && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] p-4">
            <Construction className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[13px] text-foreground leading-relaxed">
              <span className="text-amber-700 dark:text-amber-300 font-semibold">This lecture is being authored.</span> The outline
              below shows what is coming — objectives, scope and revision notes are already locked to the handbook unit.
              Live papers to explore now: <Link href="/pgdm/financial-modeling-valuation" className="text-primary hover:underline">F06 Financial Modeling & Valuation</Link> and <Link href="/pgdm/security-analysis-portfolio-management" className="text-primary hover:underline">F04 Security Analysis</Link>.
            </p>
          </div>
        )}

        {/* ── OBJECTIVES ── */}
        {lecture.objectives.length > 0 && (
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground mb-4">
              <Target className="w-4 h-4 text-primary" /> Learning Objectives
            </h2>
            <ul className="space-y-2">
              {lecture.objectives.map((o, i) => (
                <li key={i} className="flex gap-3 text-[13.5px] text-foreground leading-relaxed">
                  <span className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${num}`} />
                  {o}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── SECTIONS ── */}
        {lecture.sections.map((sec, i) => (
          <section key={i} className="space-y-4">
            <h2 className="text-xl font-extrabold tracking-tight text-foreground pt-2 border-t border-border">
              <span className={`mr-2 text-sm font-mono align-middle bg-gradient-to-r ${num} bg-clip-text text-transparent`}>
                §{i + 1}
              </span>
              {sec.heading}
            </h2>
            {sec.body.map((p, j) => (
              <p key={j} className="text-[14.5px] text-foreground leading-[1.85]">
                <RichText text={p} />
              </p>
            ))}
            {sec.bullets && (
              <ul className="space-y-2 rounded-2xl border border-border bg-muted/50 p-5">
                {sec.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-[13.5px] text-foreground leading-relaxed">
                    <span className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${num}`} />
                    <span><RichText text={b} /></span>
                  </li>
                ))}
              </ul>
            )}
            {sec.callout && (() => {
              const c = CALLOUT_STYLE[sec.callout.type];
              const Icon = c.icon;
              return (
                <div className={`flex items-start gap-3 rounded-2xl border p-4 ${c.cls}`}>
                  <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${c.labelCls}`} />
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${c.labelCls} mb-1`}>{c.label}</p>
                    <p className="text-[13.5px] text-foreground leading-relaxed"><RichText text={sec.callout.text} /></p>
                  </div>
                </div>
              );
            })()}
          </section>
        ))}

        {/* ── DIAGRAM ── */}
        {lecture.diagram && (
          <section className="rounded-2xl border border-border bg-card p-5 overflow-hidden">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground mb-4">
              <Sigma className="w-4 h-4 text-violet-600 dark:text-violet-400" /> {lecture.diagram.title}
            </h2>
            <div
              className="w-full [&_svg]:w-full [&_svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: lecture.diagram.svg }}
            />
            <p className="text-[11.5px] text-muted-foreground text-center mt-3 leading-relaxed italic">
              {lecture.diagram.caption}
            </p>
          </section>
        )}

        {/* ── FORMULAS ── */}
        {lecture.formulas && lecture.formulas.length > 0 && (
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground">
              <Sigma className="w-5 h-5 text-primary" /> Formula Sheet
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {lecture.formulas.map((f, i) => (
                <div key={i} className="rounded-2xl border border-border bg-muted/50 p-4">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{f.name}</p>
                  <p className={`mt-1.5 font-mono text-[14px] font-bold bg-gradient-to-r ${num} bg-clip-text text-transparent break-words`}>
                    {f.expr}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed">{f.meaning}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── WORKED EXAMPLES ── */}
        {lecture.examples.length > 0 && (
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground">
              <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Worked Examples
            </h2>
            {lecture.examples.map((ex, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className={`px-5 py-3 bg-gradient-to-r ${num} bg-opacity-10 border-b border-border`}>
                  <h3 className="text-sm font-bold text-foreground">
                    <span className="font-mono mr-2">Ex {i + 1}.</span>{ex.title}
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Given</p>
                    <ul className="space-y-1">
                      {ex.given.map((g, j) => (
                        <li key={j} className="text-[13px] text-foreground font-mono flex gap-2">
                          <span className="text-gray-600">›</span>{g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Solution</p>
                    <ol className="space-y-2.5">
                      {ex.steps.map((s, j) => (
                        <li key={j} className="flex gap-3 items-start">
                          <span className={`shrink-0 w-5 h-5 rounded-md bg-gradient-to-br ${num} text-white text-[10px] font-mono font-bold flex items-center justify-center`}>
                            {j + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[13px] text-foreground leading-relaxed">{s.text}</p>
                            {s.calc && (
                              <p className="text-[12.5px] font-mono text-primary/90 bg-teal-500/[0.06] border border-teal-500/15 rounded-lg px-3 py-1.5 mt-1 break-words">
                                {s.calc}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300 mb-1">Answer</p>
                    <p className="text-[13.5px] text-foreground leading-relaxed">{ex.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ── CASE STUDY ── */}
        {lecture.caseStudy && (
          <section className="rounded-2xl border border-violet-500/25 bg-violet-500/[0.04] overflow-hidden">
            <div className="px-6 py-4 border-b border-violet-500/20 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <h3 className="text-base font-extrabold text-foreground">Case Study — {lecture.caseStudy.title}</h3>
            </div>
            <div className="p-6 space-y-4">
              {lecture.caseStudy.body.map((p, i) => (
                <p key={i} className="text-[14px] text-foreground leading-[1.85]">{p}</p>
              ))}
              <div className="rounded-xl bg-muted/50 border border-border p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-violet-700 dark:text-violet-300 mb-2">Your task</p>
                <ol className="space-y-1.5">
                  {lecture.caseStudy.questions.map((q, i) => (
                    <li key={i} className="text-[13px] text-foreground flex gap-2.5">
                      <span className="text-violet-600 dark:text-violet-400 font-mono font-bold">{Q(i)}</span>{q}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300 mb-2">Takeaways</p>
                <ul className="space-y-1.5">
                  {lecture.caseStudy.takeaways.map((t, i) => (
                    <li key={i} className="text-[13px] text-foreground flex gap-2.5">
                      <span className="text-emerald-600 dark:text-emerald-400">✓</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ── REVISION ── */}
        {lecture.revision.length > 0 && (
          <section className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.04] p-6">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground mb-4">
              <ListChecks className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Rapid Revision — the night-before list
            </h2>
            <ul className="space-y-2">
              {lecture.revision.map((r, i) => (
                <li key={i} className="flex gap-3 text-[13.5px] text-foreground leading-relaxed">
                  <span className="shrink-0 w-4 h-4 mt-0.5 rounded border border-amber-500/40 text-amber-600 dark:text-amber-400 text-[10px] flex items-center justify-center">✓</span>
                  <span><RichText text={r} /></span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── PRACTICE ── */}
        {lecture.practice.length > 0 && (
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground">
              <ClipboardCheck className="w-5 h-5 text-primary" /> Practice Questions
            </h2>
            {lecture.practice.map((p, i) => (
              <details key={i} className="group rounded-2xl border border-border bg-muted/50 overflow-hidden">
                <summary className="flex items-start gap-3 p-4 cursor-pointer list-none">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-[13.5px] text-foreground leading-relaxed flex-1">
                    <span className="font-mono text-muted-foreground mr-2">Q{i + 1}.</span>{p.q}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground group-open:hidden shrink-0 mt-1 uppercase tracking-wider">Show answer</span>
                  <span className="hidden text-[10px] font-bold text-primary group-open:inline shrink-0 mt-1 uppercase tracking-wider">Hide</span>
                </summary>
                <div className="px-4 pb-4 pt-1 border-t border-border">
                  <p className="text-[13px] text-foreground leading-[1.8] pl-7 font-mono bg-primary/5 rounded-xl p-3.5 border border-primary/20">
                    {p.a}
                  </p>
                </div>
              </details>
            ))}
          </section>
        )}

        {/* ── TOOLS ── */}
        {lecture.tools && lecture.tools.length > 0 && (
          <section className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground mb-3">
              <Wrench className="w-4 h-4 text-primary" /> Practice on the live Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {lecture.tools.map((t, i) => (
                <Link
                  key={i}
                  href={t.href}
                  className="text-[12.5px] font-semibold text-primary bg-primary/10 border border-primary/25 rounded-xl px-4 py-2 hover:bg-primary/20 transition-colors"
                >
                  {t.label} →
                </Link>
              ))}
            </div>
          </section>
        )}

        {lecture.status === 'live' && (
          <LessonCompletionControl
            courseSlug={subject.slug}
            lessonSlug={lecture.slug}
            returnTo={`/pgdm/${subject.slug}/${lecture.slug}`}
          />
        )}
        <RelatedFinanceTerms categories={[subject.track, TRACK_META[subject.track].label]} keywords={[subject.slug, subject.code.toLowerCase()]} title="Key finance terms in this lecture" limit={3} />

        {/* ── NEXT ── */}
        <nav className="flex items-center justify-between border-t border-border pt-6">
          <Link href={`/pgdm/${subject.slug}`} className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary">
            ← All {subject.code} lectures
          </Link>
          <Link href="/pgdm" className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary">
            Specialization tracks →
          </Link>
        </nav>
          </div>

          {/* ── COURSE NAVIGATION SIDEBAR ── */}
          <aside className="content-aside content-aside--sticky">
            <nav aria-label="Course lectures" className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{subject.code} · Course navigation</p>
              <h2 className="mt-1 text-sm font-bold leading-snug text-foreground">{subject.name}</h2>
              <ol className="mt-4 space-y-1.5">
                {subject.lectures.map((item) => {
                  const isCurrent = item.slug === lecture.slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/pgdm/${subject.slug}/${item.slug}`}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-xs leading-snug transition-colors ${
                          isCurrent
                            ? 'border-primary/40 bg-primary/10 font-semibold text-foreground'
                            : 'border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground'
                        }`}
                      >
                        <span className="mt-px font-mono text-[10px] text-primary">{String(item.number).padStart(2, '0')}</span>
                        <span className="min-w-0">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
              <Link
                href={`/pgdm/${subject.slug}#final-test`}
                className="mt-4 flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
              >
                Course final test <span aria-hidden="true">→</span>
              </Link>
            </nav>
          </aside>
        </div>
      </main>
      <PromotionSlot placement="COURSE_PAGE" path={`/pgdm/${subject.slug}/${lecture.slug}`} contentType="COURSE" />
      <RelatedContentSection sourceType="COURSE_LESSON" sourceSlug={`${subject.slug}/${lecture.slug}`} />
      <RelatedContentSection sourceType="COURSE_LESSON" sourceSlug={`${subject.slug}/${lecture.slug}`} linkKind="CTA" />
      <ContentFaq relatedType="COURSE_LESSON" relatedSlug={`${subject.slug}/${lecture.slug}`} />
    </div>
  );
}

function Q(i: number) {
  return `${['a', 'b', 'c', 'd'][i] ?? '>'})`;
}
