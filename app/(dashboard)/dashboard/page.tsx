import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { getInsightBySlug, getResearchBySlug } from '@/lib/content';
import {
  getPlanDefinition,
  isFreeUser,
  planBenefits,
  resolvePlan,
} from '@/lib/entitlements';
import { activeStreak, computeCourseProgress, rankNextLessons } from '@/lib/learning-progress';
import { getActivityDates, listEnrollments } from '@/lib/learning-store';
import { getCourse, getCourses } from '@/lib/pgdm/learning-adapter';
import { resolveLearningCourse } from '@/lib/learning-courses';
import { isStructuredLearningCourse } from '@/lib/learning-course-catalog';
import {
  collectFreshContent,
  insightToItem,
  researchToItem,
  studyToItem,
} from '@/lib/recent-activity';
import { getAllInsights, getAllResearch } from '@/lib/content';
import { getPublishedStudyMaterials } from '@/lib/study';
import { readLastVisit } from '@/lib/visit-store';
import VisitMarker from '@/components/dashboard/VisitMarker';
import FocusSwitcher, { FOCUS_COOKIE, type DashboardFocus } from '@/components/dashboard/FocusSwitcher';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import { TOOLS } from '@/lib/tools-registry';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function initialsFrom(nameOrEmail: string | null | undefined) {
  const str = (nameOrEmail ?? '').trim();
  if (!str) return 'F';
  const parts: string[] = str.includes('@') ? [str.split('@')[0]] : str.split(/\\s+/);
  const letters = parts
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .filter(Boolean)
    .join('');
  return letters || 'F';
}

type Persona = DashboardFocus;

// Determine workspace persona from available signals. This is only the
// DEFAULT — the user can override it via FocusSwitcher (cookie-backed),
// because any inference here is a guess about intent.
function getWorkspacePersona({
  hasEnrollments,
  hasSaved,
  planName,
  isFree,
}: {
  hasEnrollments: boolean;
  hasSaved: boolean;
  planName: string;
  isFree: boolean;
}) {
  if (hasEnrollments) return 'learner';
  if (hasSaved || !isFree) return 'analyst';
  return 'business';
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/signin');

  const userId = session.user.id as string;
  const [saved, member] = await Promise.all([
    prisma.savedArticle.findMany({
      where: { userId },
      orderBy: { savedAt: 'desc' },
      take: 10,
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { createdAt: true },
    }),
  ]);
  // Badges are decorative: a failure here must never take the dashboard
  // down. `null` renders an explicit "unavailable" note instead of a 500.
  const userBadges = await prisma.userBadge.findMany({
    where: { userId },
    include: { badge: true },
    orderBy: { awardedAt: 'desc' },
    take: 6,
  }).catch(() => null);

  const savedWithMeta = await Promise.all(
    saved.map(async (item: any) => {
      const slug = item.slug;
      const type = item.type as string;
      const url = type === 'insight' ? `/insights/${slug}` : `/research/${slug}`;
      const post =
        type === 'insight' ? await getInsightBySlug(slug) : await getResearchBySlug(slug);
      return {
        id: item.id,
        slug,
        type,
        savedAt: item.savedAt,
        url,
        title: post?.title ?? slug,
      };
    })
  );

  const displayName =
    session.user.name ?? session.user.email ?? 'Kunwar Analytics Member';

  const plan = resolvePlan(session.user);
  const planDef = getPlanDefinition(plan);
  const freeUser = isFreeUser(session.user);
  const subscriptionStatus = session.user.subscriptionStatus as string | undefined;
  const avatarInitials = initialsFrom(displayName);
  const memberSince = member?.createdAt
    ? new Date(member.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : '';

  // Learning progress — each source degrades independently so one failing
  // store yields an honest empty state, not a broken dashboard.
  const [enrollments, activityDates, lessonRows] = await Promise.all([
    listEnrollments(userId).catch(() => []),
    getActivityDates(userId).catch(() => [] as string[]),
    prisma.lessonProgress.findMany({
      where: { userId },
      select: {
        courseSlug: true,
        lessonSlug: true,
        completed: true,
        secondsSpent: true,
        completedAt: true,
      },
    }).catch(() => []),
  ]);

  const toStates = (courseSlug: string) =>
    lessonRows
      .filter((row: any) => row.courseSlug === courseSlug)
      .map((row: any) => ({
        lessonSlug: row.lessonSlug,
        completed: row.completed,
        secondsSpent: row.secondsSpent,
        completedAt: row.completedAt ? row.completedAt.toISOString() : null,
      }));

  const streak = activeStreak(activityDates, new Date().toISOString().slice(0, 10));

  const resolvedCourseProgress = await Promise.all(enrollments.map(async (enrollment: any) => {
    const course = await resolveLearningCourse(enrollment.courseSlug).catch(() => undefined);
    if (!course) return null;
    const progress = computeCourseProgress(course, toStates(course.slug));
    const nextLesson = course.lessons.find((lesson) => lesson.slug === progress.nextLessonSlug) ?? null;
    const isPgdm = Boolean(getCourse(course.slug));
    return {
      course,
      progress,
      nextLesson,
      isPgdm,
      isStructured: !isPgdm && isStructuredLearningCourse(course.slug),
    };
  }));
  const courseProgress = resolvedCourseProgress.filter((value): value is NonNullable<typeof value> => value !== null);
  const activeCourse =
    courseProgress.find((course) => !course.progress.isComplete) ?? courseProgress[0] ?? null;
  const recommendationCourse = activeCourse?.course ?? getCourses()[0];
  const recommendationIsPgdm = activeCourse?.isPgdm ?? Boolean(recommendationCourse && getCourse(recommendationCourse.slug));
  const recommendationIsStructured = activeCourse?.isStructured ?? Boolean(recommendationCourse && !recommendationIsPgdm && isStructuredLearningCourse(recommendationCourse.slug));
  const recommendations = recommendationCourse
    ? rankNextLessons(recommendationCourse, toStates(recommendationCourse.slug), {
      recentTags: recommendationCourse.tags,
      limit: 3,
    })
    : [];
  const recommendationCourseSlug = recommendationCourse?.slug ?? '';
  const courseHref = (courseSlug: string, lessonSlug?: string | null, pgdm = true, structured = false) => {
    if (pgdm) return lessonSlug ? `/pgdm/${courseSlug}/${lessonSlug}` : `/pgdm/${courseSlug}`;
    if (structured) return lessonSlug ? `/study/course/${courseSlug}/${lessonSlug}` : `/study/course/${courseSlug}`;
    return lessonSlug ? `/study/${courseSlug}/lessons/${lessonSlug}` : `/study/${courseSlug}`;
  };

  // Fresh content
  const lastVisit = await readLastVisit();
  const studyMaterials = await getPublishedStudyMaterials({ limit: 8 }).catch(() => []);
  const fresh = collectFreshContent(
    [
      getAllResearch().map(researchToItem),
      getAllInsights().map(insightToItem),
      studyMaterials.map(studyToItem),
    ],
    lastVisit.since,
    { limit: 6 },
  );

  const inferredPersona: Persona = getWorkspacePersona({
    hasEnrollments: courseProgress.length > 0,
    hasSaved: savedWithMeta.length > 0,
    planName: planDef.name,
    isFree: freeUser,
  });
  const focusCookie = (await cookies()).get(FOCUS_COOKIE)?.value;
  const persona: Persona =
    focusCookie === 'business' || focusCookie === 'analyst' || focusCookie === 'learner'
      ? focusCookie
      : inferredPersona;

  // Persona-aware tool recommendations
  const recommendedTools = (() => {
    if (persona === 'learner') {
      return TOOLS.filter(t => ['wacc-calculator', 'time-value-machine', 'ratio-analyzer', 'portfolio-risk-lab'].includes(t.slug));
    }
    if (persona === 'analyst') {
      return TOOLS.filter(t => ['dcf-valuation-model', 'cca-valuation', 'saas-ltv-cac-model', 'ratio-analyzer'].includes(t.slug));
    }
    // business default: founder/SME essentials
    return TOOLS.filter(t => ['dcf-valuation-model', '3-statement-model', 'market-sizing-framework', 'wacc-calculator'].includes(t.slug));
  })();

  const benefits = planBenefits(session.user);

  // Layer 2 — the three primary actions differ by workspace focus. A
  // business owner is never led with "Continue learning"; a learner is
  // never led with advisory. Every action maps to a real workflow.
  const continueLearning = {
    href: activeCourse ? courseHref(activeCourse.course.slug, activeCourse.nextLesson?.slug, activeCourse.isPgdm, activeCourse.isStructured) : '/pgdm',
    icon: '🎓',
    chip: courseProgress.length > 0 ? `${activeCourse?.progress.percent ?? 0}%` : '14 subjects',
    title: activeCourse ? `Continue: ${activeCourse.course.title}` : 'Continue learning',
    desc: activeCourse ? `${activeCourse.progress.completedLessons} of ${activeCourse.progress.totalLessons} lessons · ${activeCourse.nextLesson?.title ?? 'Review'}` : 'PGDM finance, analytics and placement prep — pick up where you left off.',
    cta: activeCourse ? 'Resume →' : 'Browse courses →',
  };
  const startModel = {
    href: '/tools',
    icon: '🧮',
    chip: `${TOOLS.length} models`,
    title: 'Start a model',
    desc: 'DCF, 3-statement, WACC, SaaS — all calculators run in the browser with no setup.',
    cta: 'Open calculators →',
  };
  const exploreResearch = {
    href: '/research',
    icon: '📊',
    chip: 'Research',
    title: 'Explore research',
    desc: 'Sector reports, strategy notes and Data Lab projects — save for later.',
    cta: 'Browse research →',
  };
  const primaryActions =
    persona === 'learner'
      ? [continueLearning, startModel, exploreResearch]
      : persona === 'analyst'
        ? [startModel, exploreResearch, {
            href: '/predictions',
            icon: '🎯',
            chip: 'Markets',
            title: 'Check predictions',
            desc: 'Live, timestamped calls — and the scored public ledger of hits and misses.',
            cta: 'View predictions →',
          }]
        : [startModel, {
            href: '/tools/dcf-valuation-model',
            icon: '📈',
            chip: 'DCF',
            title: 'Value a business',
            desc: 'Full DCF with scenarios and sensitivity — the fastest route to a valuation view.',
            cta: 'Open DCF model →',
          }, {
            href: '/services',
            icon: '🤝',
            chip: 'Advisory',
            title: 'Talk to us',
            desc: 'Research, modelling and board-ready analysis for your team or deal.',
            cta: 'See services →',
          }];

  // Layer 7 — secondary discovery, ordered by relevance to the focus.
  const discoverItems =
    persona === 'learner'
      ? [
          { href: '/certificates', icon: '🏅', title: 'Certificates', desc: 'Course completion records' },
          { href: '/study/placement-prep', icon: '🧳', title: 'Placement Prep', desc: '60-day finance placement plan' },
          { href: '/finance-terms', icon: '📚', title: 'Finance Terms', desc: '70+ plain-language definitions' },
          { href: '/ask', icon: '💬', title: 'Ask Kunwar', desc: 'Grounded Q&A over site knowledge' },
          { href: '/podcast', icon: '🎙️', title: 'Podcast', desc: 'Market and strategy episodes' },
        ]
      : persona === 'analyst'
        ? [
            { href: '/data-lab', icon: '🔬', title: 'Data Lab', desc: 'Reproducible analysis projects' },
            { href: '/predictions/ledger', icon: '📒', title: 'Prediction Ledger', desc: 'Scored public track record' },
            { href: '/tracker', icon: '📈', title: 'Sector Trackers', desc: 'Quarterly KPIs across sectors' },
            { href: '/ask', icon: '💬', title: 'Ask Kunwar', desc: 'Grounded Q&A over site knowledge' },
            { href: '/data-freshness', icon: '⏱️', title: 'Data Freshness', desc: 'SLAs for every dataset' },
          ]
        : [
            { href: '/enterprise', icon: '🏦', title: 'Enterprise', desc: 'Custom engagements for teams' },
            { href: '/case-studies', icon: '📁', title: 'Case Studies', desc: 'Client engagements and outcomes' },
            { href: '/ask', icon: '💬', title: 'Ask Kunwar', desc: 'Grounded Q&A over site knowledge' },
            { href: '/finance-terms', icon: '📚', title: 'Finance Terms', desc: '70+ plain-language definitions' },
            { href: '/podcast', icon: '🎙️', title: 'Podcast', desc: 'Market and strategy episodes' },
          ];

  return (
    <div className="min-h-screen bg-background">
      <VisitMarker />

      {/* 1 — Workspace context */}
      <div className="border-b border-border bg-surface">
        <div className="wrap max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-sm shrink-0">
                {avatarInitials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg font-bold text-content-primary leading-none">Workspace</h1>
                  <span className="hidden sm:inline text-content-muted">·</span>
                  <span className="text-sm text-content-muted truncate">{displayName}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${freeUser ? 'bg-surface-muted text-content-muted border-border' : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'}`}>
                    {planDef.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-content-muted flex-wrap">
                  <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {subscriptionStatus ?? 'INACTIVE'}</span>
                  {memberSince && <><span className="opacity-40">·</span><span>Member since {memberSince}</span></>}
                  {persona === 'learner' ? (
                    <><span className="opacity-40">·</span><span className="inline-flex items-center gap-1">🔥 {streak}d streak</span></>
                  ) : (
                    <><span className="opacity-40">·</span><span className="inline-flex items-center gap-1">{savedWithMeta.length} saved {savedWithMeta.length === 1 ? 'article' : 'articles'}</span></>
                  )}
                  <span className="hidden sm:inline-flex items-center gap-1 opacity-60">· {persona === 'learner' ? 'Learner workspace' : persona === 'analyst' ? 'Analyst workspace' : 'Business workspace'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {freeUser ? (
                <Link href="/pricing" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm">
                  Upgrade to Pro →
                </Link>
              ) : (
                <Link href="/pricing" className="inline-flex items-center px-4 py-2 rounded-xl border border-border bg-surface text-sm font-medium hover:bg-accent transition-colors">
                  Manage billing
                </Link>
              )}
              <Link href="/account" className="hidden sm:inline-flex items-center px-3 py-2 rounded-xl border border-border bg-surface text-sm font-medium hover:bg-accent transition-colors">
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb + workspace focus override */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Breadcrumbs
            className=""
            items={[
              { label: 'Home', href: '/' },
              { label: 'Dashboard' },
            ]}
          />
          <FocusSwitcher current={persona} />
        </div>

        {/* 2 — Primary actions (persona-aware, see primaryActions above) */}
        <section aria-labelledby="primary-actions-heading" className="mb-8">
          <h2 id="primary-actions-heading" className="sr-only">Primary actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {primaryActions.map((action) => (
              <Link key={action.href + action.title} href={action.href} className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 hover:border-brand/30 hover:bg-brand-muted/30 transition-all flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="h-9 w-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">{action.icon}</div>
                  <span className="text-xs font-medium text-content-muted bg-surface-muted border border-border px-2 py-1 rounded-full">{action.chip}</span>
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-content-primary group-hover:text-brand transition-colors">{action.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-content-muted">{action.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2 transition-all">{action.cta}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left column — 8 cols */}
          <div className="lg:col-span-8 space-y-6">
            {/* 3 — Saved articles (only research/insights persist today;
                calculator runs are stateless — see tools section note) */}
            <section className="rounded-2xl border border-border bg-surface overflow-hidden" aria-labelledby="saved-heading">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h2 id="saved-heading" className="text-sm font-bold text-content-primary">Saved articles</h2>
                  <span className="text-xs text-content-muted bg-surface-muted border border-border px-2 py-0.5 rounded-full">{savedWithMeta.length}</span>
                </div>
                <Link href="/research" className="text-xs font-semibold text-brand hover:text-brand-hover">Browse →</Link>
              </div>
              {savedWithMeta.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-content-muted">No saved articles yet. Save research to find it here.</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <Link href="/research" className="inline-flex items-center px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors">Browse research</Link>
                    <Link href="/insights" className="inline-flex items-center px-3 py-2 rounded-xl border border-border bg-surface text-sm font-medium hover:bg-accent transition-colors">View insights</Link>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {savedWithMeta.map((item) => (
                    <li key={item.id} className="px-5 py-4 hover:bg-surface-muted/50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${item.type === 'insight' ? 'bg-brand-muted text-brand border-brand/20' : 'bg-surface-muted text-content-muted border-border'}`}>{item.type}</span>
                            <span className="text-xs text-content-muted">{new Date(item.savedAt).toLocaleDateString('en-IN')}</span>
                          </div>
                          <Link href={item.url} className="mt-2 block text-[14px] font-semibold text-content-primary hover:text-brand line-clamp-2 leading-snug">{item.title}</Link>
                        </div>
                        <Link href={item.url} className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border bg-surface text-xs font-semibold hover:bg-accent transition-colors">
                          Open →
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {/* Fresh content — new since last visit */}
              {fresh.items.length > 0 && (
                <div className="border-t border-border bg-surface-muted/40 px-5 py-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-content-muted">{lastVisit.hasPriorVisit ? 'New since your last visit' : 'Latest'}</h3>
                    <span className="text-[11px] text-content-muted">{fresh.total} updates</span>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {fresh.items.slice(0, 4).map((entry) => (
                      <li key={entry.id} className="flex gap-3">
                        <span className="mt-0.5 text-xs shrink-0">{entry.kind === 'Research' ? '📚' : entry.kind === 'Insight' ? '💡' : '📖'}</span>
                        <div className="min-w-0">
                          <Link href={entry.href} className="text-xs font-semibold text-content-primary hover:text-brand line-clamp-2 leading-snug">{entry.title}</Link>
                          <p className="text-[11px] text-content-muted mt-0.5">{entry.meta ?? new Date(entry.date).toLocaleDateString('en-IN')}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* 4 — Relevant tools & workflows */}
            <section className="rounded-2xl border border-border bg-surface overflow-hidden" aria-labelledby="tools-heading">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3">
                <h2 id="tools-heading" className="text-sm font-bold text-content-primary">
                  {persona === 'learner' ? 'Study tools' : persona === 'analyst' ? 'Analyst toolkit' : 'Recommended tools'}
                </h2>
                <Link href="/tools" className="text-xs font-semibold text-brand hover:text-brand-hover">View all {TOOLS.length} →</Link>
              </div>
              <div className="p-4 grid gap-3 sm:grid-cols-2">
                {recommendedTools.map((tool) => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group flex gap-3 p-3 rounded-xl border border-border bg-surface hover:border-brand/20 hover:bg-brand-muted/20 transition-all">
                    <span className="h-8 w-8 rounded-lg bg-surface-muted border border-border flex items-center justify-center text-sm shrink-0 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors">{tool.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-content-primary group-hover:text-brand leading-tight line-clamp-1">{tool.title.split('—')[0].trim()}</p>
                      <p className="text-xs text-content-muted mt-1 line-clamp-2 leading-relaxed">{tool.desc}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${tool.gated ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'}`}>{tool.gated ? 'Pro' : 'Free'}</span>
                        <span className="text-[10px] text-content-muted">{tool.difficulty}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-border bg-surface-muted/30 flex items-center justify-between">
                <p className="text-xs text-content-muted">Calculators run in your browser — runs aren&rsquo;t saved to your account yet, so keep a copy of key inputs.</p>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-content-muted border border-border bg-surface px-2 py-1 rounded-lg">⌘ K</span>
              </div>
            </section>

            {/* 5 — Reports / learning / activity */}
            {activeCourse ? (
              <section className="rounded-2xl border border-border bg-surface overflow-hidden" aria-labelledby="learning-heading">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3">
                  <h2 id="learning-heading" className="text-sm font-bold text-content-primary">Learning progress</h2>
                  <Link href="/pgdm" className="text-xs font-semibold text-brand hover:text-brand-hover">All courses →</Link>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-content-primary line-clamp-1">{activeCourse.course.title}</h3>
                    <span className="text-xs font-semibold text-brand bg-brand-muted border border-brand/20 px-2 py-0.5 rounded-full">{activeCourse.progress.percent}%</span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-muted border border-border">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${activeCourse.progress.percent}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-content-muted">{activeCourse.progress.completedLessons} of {activeCourse.progress.totalLessons} lessons · {streak > 0 ? `🔥 ${streak}d streak` : 'Keep going'}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={courseHref(activeCourse.course.slug, activeCourse.nextLesson?.slug, activeCourse.isPgdm, activeCourse.isStructured)} className="inline-flex items-center px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors">
                      {activeCourse.nextLesson ? `Resume: ${activeCourse.nextLesson.title}` : 'Review course'} →
                    </Link>
                    <Link href="/pgdm" className="inline-flex items-center px-4 py-2 rounded-xl border border-border bg-surface text-sm font-medium hover:bg-accent transition-colors">Browse PGDM</Link>
                  </div>
                  {recommendations.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-border">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-content-muted mb-3">Recommended next</h4>
                      <ul className="space-y-2.5">
                        {recommendations.map((rec) => (
                          <li key={rec.lesson.slug} className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link href={courseHref(recommendationCourseSlug, rec.lesson.slug, recommendationIsPgdm, recommendationIsStructured)} className="text-sm font-semibold text-content-primary hover:text-brand leading-tight line-clamp-1">{rec.lesson.title}</Link>
                              <p className="text-xs text-content-muted mt-0.5">{rec.reason}{rec.lesson.minutes ? ` · ${rec.lesson.minutes} min` : ''}</p>
                            </div>
                            <span className="text-xs text-content-muted shrink-0">{rec.lesson.minutes ? `${rec.lesson.minutes}m` : ''}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            ) : (
              <section className="rounded-2xl border border-border bg-surface overflow-hidden" aria-labelledby="activity-heading">
                <div className="px-5 py-4 border-b border-border">
                  <h2 id="activity-heading" className="text-sm font-bold text-content-primary">Where to start</h2>
                  <p className="text-xs text-content-muted mt-1">Pick a path — or change your workspace focus above.</p>
                </div>
                <div className="p-4 grid gap-3 sm:grid-cols-3">
                  <Link href="/tools/dcf-valuation-model" className="p-4 rounded-xl border border-border bg-surface hover:border-brand/20 hover:bg-brand-muted/20 transition-colors">
                    <p className="text-sm font-semibold text-content-primary">Value a business</p><p className="text-xs text-content-muted mt-1">DCF + comps + market sizing</p><p className="text-xs font-semibold text-brand mt-3">Start →</p>
                  </Link>
                  <Link href="/research" className="p-4 rounded-xl border border-border bg-surface hover:border-brand/20 hover:bg-brand-muted/20 transition-colors">
                    <p className="text-sm font-semibold text-content-primary">Read research</p><p className="text-xs text-content-muted mt-1">Sector notes and Data Lab</p><p className="text-xs font-semibold text-brand mt-3">Explore →</p>
                  </Link>
                  {persona === 'business' ? (
                    <Link href="/services" className="p-4 rounded-xl border border-border bg-surface hover:border-brand/20 hover:bg-brand-muted/20 transition-colors">
                      <p className="text-sm font-semibold text-content-primary">Get advisory help</p><p className="text-xs text-content-muted mt-1">Research and modelling for your team</p><p className="text-xs font-semibold text-brand mt-3">See services →</p>
                    </Link>
                  ) : persona === 'analyst' ? (
                    <Link href="/data-lab" className="p-4 rounded-xl border border-border bg-surface hover:border-brand/20 hover:bg-brand-muted/20 transition-colors">
                      <p className="text-sm font-semibold text-content-primary">Open Data Lab</p><p className="text-xs text-content-muted mt-1">Reproducible analysis projects</p><p className="text-xs font-semibold text-brand mt-3">Explore →</p>
                    </Link>
                  ) : (
                    <Link href="/finance-terms" className="p-4 rounded-xl border border-border bg-surface hover:border-brand/20 hover:bg-brand-muted/20 transition-colors">
                      <p className="text-sm font-semibold text-content-primary">Learn a concept</p><p className="text-xs text-content-muted mt-1">Plain-language finance terms</p><p className="text-xs font-semibold text-brand mt-3">Browse →</p>
                    </Link>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right column — 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            {/* 6 — Billing & account status */}
            <section className="rounded-2xl border border-border bg-surface overflow-hidden" aria-labelledby="billing-heading">
              <div className="px-5 py-4 border-b border-border">
                <h2 id="billing-heading" className="text-sm font-bold text-content-primary">Subscription</h2>
                <p className="text-xs text-content-muted mt-1">Plan & billing</p>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-content-muted">Current plan</span>
                  <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${freeUser ? 'bg-surface-muted text-content-muted border-border' : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'}`}>{planDef.name}</span>
                </div>
                <p className="mt-3 text-lg font-bold text-content-primary">{planDef.name}</p>
                <p className="text-xs text-content-muted mt-1">{planDef.tagline}</p>
                <ul className="mt-4 space-y-2">
                  {benefits.slice(0, 3).map((b) => (
                    <li key={b} className="flex gap-2 text-xs text-content-muted"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand shrink-0" /><span>{b}</span></li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-col gap-2">
                  {freeUser ? (
                    <Link href="/pricing" className="inline-flex justify-center items-center px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors">Upgrade to Pro →</Link>
                  ) : (
                    <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 px-3 py-2 text-xs text-emerald-800">✓ Pro access active — {subscriptionStatus ?? 'ACTIVE'}</div>
                  )}
                  <Link href="/pricing" className="inline-flex justify-center items-center px-4 py-2 rounded-xl border border-border bg-surface text-sm font-medium hover:bg-accent transition-colors">View pricing & billing</Link>
                </div>
              </div>
            </section>

            {/* Profile summary */}
            <section className="rounded-2xl border border-border bg-surface overflow-hidden" aria-labelledby="profile-heading">
              <div className="p-5">
                <h2 id="profile-heading" className="text-sm font-bold text-content-primary">Profile</h2>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-surface-muted border border-border flex items-center justify-center text-sm font-bold text-content-primary">{avatarInitials}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-content-primary truncate">{displayName}</p>
                    <p className="text-xs text-content-muted truncate">{session.user.email}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link href="/dashboard/edit" className="inline-flex justify-center items-center px-3 py-2 rounded-xl border border-border bg-surface text-xs font-semibold hover:bg-accent transition-colors">Edit profile</Link>
                  <Link href="/account" className="inline-flex justify-center items-center px-3 py-2 rounded-xl border border-border bg-surface text-xs font-semibold hover:bg-accent transition-colors">Account →</Link>
                </div>
                {userBadges === null ? (
                  <p className="mt-5 pt-5 border-t border-border text-xs text-content-muted">Badges are temporarily unavailable.</p>
                ) : userBadges.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-border">
                    <p className="text-xs font-bold uppercase tracking-widest text-content-muted mb-2">Badges · {userBadges.length}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {userBadges.map((ub: any) => (
                        <span key={ub.id} title={ub.badge.description || ub.badge.name} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-surface-muted border border-border text-xs font-medium">
                          <span>{ub.badge.icon || '🏅'}</span> {ub.badge.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 7 — Discover secondary */}
            <section className="rounded-2xl border border-border bg-surface overflow-hidden" aria-labelledby="discover-heading">
              <div className="px-5 py-4 border-b border-border">
                <h2 id="discover-heading" className="text-sm font-bold text-content-primary">Discover</h2>
                <p className="text-xs text-content-muted mt-1">More capabilities</p>
              </div>
              <div className="p-2">
                {discoverItems.map((item) => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-muted transition-colors group">
                    <span className="h-8 w-8 rounded-lg bg-surface-muted border border-border flex items-center justify-center text-sm group-hover:bg-brand-muted group-hover:border-brand/20 transition-colors">{item.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-content-primary group-hover:text-brand">{item.title}</p>
                      <p className="text-xs text-content-muted">{item.desc}</p>
                    </div>
                    <span className="text-content-muted group-hover:text-brand">→</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-content-muted">
          <span>Quick search</span>
          <kbd className="px-2 py-1 rounded-lg border border-border bg-surface-muted font-mono text-[11px]">⌘K</kbd>
          <span className="hidden sm:inline">to find tools, research, study material and pages</span>
        </div>
      </div>

      <PromotionSlot slot="DASHBOARD" path="/dashboard" />
    </div>
  );
}
