import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  GraduationCap, BookOpen, Clock3, Layers, Target, ListTree, Library,
  PlayCircle, Construction, ChevronRight, FlaskConical,
} from 'lucide-react';
import { SUBJECTS, getSubject } from '@/lib/pgdm/curriculum';
import { QUIZZES } from '@/lib/pgdm/quizzes';
import Quiz from '@/components/pgdm/Quiz';
import { TRACK_META } from '@/lib/pgdm/types';
import JsonLd from '@/components/seo/JsonLd';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import CourseLessonsList from '@/components/learning/CourseLessonsList';
import CourseAssessmentPanel from '@/components/learning/CourseAssessmentPanel';
import RelatedFinanceTerms from '@/components/finance-terms/RelatedFinanceTerms';

interface PageProps {
  params: Promise<{ subject: string }>;
}

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.slug }));
}

const titleCap = (parts: string, max = 62) => {
  if (parts.length <= max) return parts;
  const cut = parts.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[ —|:-]+$/, '');
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject: slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return {};
  return {
    title: { absolute: titleCap(`${subject.code} — ${subject.name} | Lectures & Syllabus`) },
    description: subject.description.slice(0, 155),
  };
}

const TRACK_STYLE = {
  CORE: {
    chip: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    num: 'from-sky-500 to-blue-500',
    gradient: 'from-sky-500/15 via-cinema-blue/10 to-transparent',
    ring: 'border-sky-500/25',
  },
  FINANCE: {
    chip: 'bg-teal-500/10 text-teal-300 border-teal-500/25',
    num: 'from-teal-500 to-emerald-500',
    gradient: 'from-teal-500/15 via-cinema-cyan/10 to-transparent',
    ring: 'border-teal-500/25',
  },
  ANALYTICS: {
    chip: 'bg-cinema-violet/10 text-violet-300 border-cinema-violet/25',
    num: 'from-violet-500 to-indigo-500',
    gradient: 'from-cinema-violet/15 via-indigo-500/10 to-transparent',
    ring: 'border-cinema-violet/25',
  },
} as const;

export default async function SubjectPage({ params }: PageProps) {
  const { subject: slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  const meta = TRACK_META[subject.track];
  const style = TRACK_STYLE[subject.track];
  const liveLectures = subject.lectures.filter((l) => l.status === 'live');
  const buildingLectures = subject.lectures.filter((l) => l.status === 'building');

  return (
    <div className="min-h-screen bg-cinema-black text-gray-100">
      {/* ── HEADER ── */}
      <header className="relative overflow-hidden bg-cinema-ink py-12 md:py-16 border-b border-white/5">
        {subject.heroImage && (
          <>
            <Image
              src={subject.heroImage}
              alt={`${subject.name} — ${subject.code} course hero`}
              fill
              priority
              className="object-cover opacity-25 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cinema-ink via-cinema-ink/80 to-cinema-ink/40 pointer-events-none" />
          </>
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} pointer-events-none`} />
        <div className="content-page relative z-10">
          {/* breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-5 font-medium">
            <Link href="/pgdm" className="hover:text-teal-300 transition-colors">PGDM</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400">{subject.track === 'CORE' ? 'Semester III Core' : `${meta.label} ${meta.kind.toLowerCase()}`}</span>
          </nav>

          <div className="flex items-start gap-4">
            <span className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${style.num} text-white flex items-center justify-center shadow-xl text-2xl`}>
              {meta.icon}
            </span>
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-bold font-mono uppercase tracking-widest border rounded-full px-2.5 py-1 ${style.chip}`}>
                  {subject.code}
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-2.5 py-1">
                  Semester III · Live
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-gray-500">
                  <BookOpen className="w-3 h-3" /> {subject.credits} credits
                  <span className="mx-1">·</span> <Clock3 className="w-3 h-3" /> {subject.hours} hours
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">{subject.name}</h1>
              <p className="text-sm text-teal-300/90 font-medium italic">{subject.tagline}</p>
              <p className="max-w-[72ch] text-sm leading-relaxed text-foreground">{subject.description}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a href="#quiz" className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-300 hover:bg-violet-500/20 transition-colors">
                  ✦ MCQ quiz ({QUIZZES[subject.slug]?.length ?? 0} Qs)
                </a>
                <Link href={`/pgdm/${subject.slug}/cheatsheet`} className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 hover:bg-teal-500/20 transition-colors">
                  ⌘ Cheat sheet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: `${subject.code} — ${subject.name}`,
            description: subject.description,
            url: `https://kunwaranalytics.in/pgdm/${subject.slug}`,
            educationalLevel: 'Postgraduate (PGDM, Semester III)',
            provider: { '@type': 'Organization', name: 'Kunwar Analytics', url: 'https://kunwaranalytics.in' },
            teaches: subject.outcomes,
            numberOfCredits: subject.credits,
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'online',
              courseWorkload: `PT${subject.hours}H`,
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'PGDM', item: 'https://kunwaranalytics.in/pgdm' },
              { '@type': 'ListItem', position: 2, name: subject.name, item: `https://kunwaranalytics.in/pgdm/${subject.slug}` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${subject.code} lectures`,
            itemListElement: subject.lectures.map((l, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: l.title,
              url: `https://kunwaranalytics.in/pgdm/${subject.slug}/${l.slug}`,
            })),
          },
        ]}
      />

      <main className="content-page py-10">
        {/* ── COURSE OUTCOMES ── */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/8 bg-cinema-charcoal/60 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest mb-4">
              <Target className="w-4 h-4 text-teal-400" /> Course Outcomes
            </h2>
            <ol className="space-y-2.5">
              {subject.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3 text-[13px] text-gray-300 leading-relaxed">
                  <span className={`shrink-0 w-5 h-5 rounded-md bg-gradient-to-br ${style.num} text-white text-[10px] font-mono font-bold flex items-center justify-center`}>
                    CO{i + 1}
                  </span>
                  {o}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-white/8 bg-cinema-charcoal/60 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest mb-4">
              <ListTree className="w-4 h-4 text-violet-400" /> Detailed Syllabus — Units
            </h2>
            <ol className="space-y-2.5">
              {subject.units.map((u, i) => (
                <li key={i} className="flex gap-3 text-[12.5px] text-gray-300 leading-relaxed">
                  <span className="shrink-0 w-5 h-5 rounded-md bg-white/5 border border-white/10 text-violet-300 text-[10px] font-mono font-bold flex items-center justify-center">
                    U{i + 1}
                  </span>
                  {u}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── LECTURES ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-white tracking-tight">
              <GraduationCap className="w-5 h-5 text-teal-400" /> Lectures
            </h2>
            <span className="text-xs font-mono text-gray-500">
              {liveLectures.length} live · {buildingLectures.length} in progress
            </span>
          </div>

          {subject.lectures.length === 0 ? (
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6 text-center">
              <Construction className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">
                Syllabus fully mapped above. Full lectures for this paper are being authored next —
                Finance major papers publish first.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...liveLectures, ...buildingLectures].map((lec) => (
                <Link
                  key={lec.slug}
                  href={`/pgdm/${subject.slug}/${lec.slug}`}
                  className={`group flex items-start gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                    lec.status === 'live'
                      ? 'border-white/10 bg-cinema-graphite/70 hover:border-teal-500/40'
                      : 'border-white/6 bg-cinema-charcoal/40 hover:border-white/15'
                  }`}
                >
                  <span className={`shrink-0 w-10 h-10 rounded-xl font-mono font-bold text-white flex items-center justify-center text-sm ${
                    lec.status === 'live' ? `bg-gradient-to-br ${style.num}` : 'bg-white/5 border border-white/10 text-gray-400'
                  }`}>
                    {lec.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className={`font-bold leading-snug ${lec.status === 'live' ? 'text-white group-hover:text-teal-300' : 'text-gray-300'} transition-colors`}>
                        {lec.title}
                      </h3>
                      {lec.status === 'live' ? (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-2 py-0.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> FULL LECTURE
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                          BUILDING
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{lec.summary}</p>
                    <div className="mt-2 flex items-center gap-3 text-[10px] font-mono text-gray-500">
                      <span className="flex items-center gap-1"><Clock3 className="w-3 h-3" />{lec.minutes} min</span>
                      {lec.status === 'live' && (
                        <>
                          <span>{lec.sections.length} sections</span>
                          <span>{lec.examples.length} worked examples</span>
                          {lec.caseStudy && <span>case study</span>}
                          {lec.diagram && <span>diagram</span>}
                          <span>{lec.practice.length} practice Qs</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="shrink-0 w-4 h-4 text-gray-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all mt-3" />
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── REFERENCE BOOKS ── */}
        {subject.books && subject.books.length > 0 && (
          <section className="rounded-2xl border border-white/8 bg-cinema-charcoal/60 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest mb-4">
              <Library className="w-4 h-4 text-amber-400" /> Reference Books (handbook)
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {subject.books.map((b, i) => (
                <li key={i} className="text-[12.5px] text-gray-300 bg-white/[0.03] border border-white/5 rounded-xl px-3.5 py-2.5">
                  <span className="text-white font-medium">{b.title}</span>
                  <span className="text-gray-500"> — {b.author}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {QUIZZES[subject.slug] && (
          <Quiz questions={QUIZZES[subject.slug]} subjectName={subject.code} />
        )}

        <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
          <FlaskConical className="w-3.5 h-3.5" />
          Modeling tools for this paper live on the <Link href="/tools" className="text-teal-400 hover:underline">Tools page</Link>
        </p>
        <CourseLessonsList courseSlug={subject.slug} courseType="PGDM" />
        <CourseAssessmentPanel courseSlug={subject.slug} returnTo={`/pgdm/${subject.slug}`} />
        <RelatedFinanceTerms categories={[subject.track, meta.label]} keywords={[subject.slug, subject.code.toLowerCase()]} title="Finance terms used in this course" />
      </main>
      <PromotionSlot placement="COURSE_PAGE" path={`/pgdm/${subject.slug}`} contentType="COURSE" />
      <RelatedContentSection sourceType="COURSE" sourceSlug={subject.slug} />
      <RelatedContentSection sourceType="COURSE" sourceSlug={subject.slug} linkKind="CTA" />
      <ContentFaq relatedType="COURSE" relatedSlug={subject.slug} />
    </div>
  );
}
