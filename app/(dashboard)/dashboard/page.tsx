import Link from 'next/link';
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
import HeroBackground from '@/components/ui/HeroBackground';
import { activeStreak, computeCourseProgress, rankNextLessons } from '@/lib/learning-progress';
import { getActivityDates, listEnrollments } from '@/lib/learning-store';
import { getCourse, getCourses } from '@/lib/pgdm/learning-adapter';
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

function initialsFrom(nameOrEmail: string | null | undefined) {
  const str = (nameOrEmail ?? '').trim();
  if (!str) return 'F';
  const parts: string[] = str.includes('@') ? [str.split('@')[0]] : str.split(/\s+/);
  const letters = parts
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .filter(Boolean)
    .join('');
  return letters || 'F';
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

  const savedWithMeta = await Promise.all(
    saved.map(async (item) => {
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

  // Entitlements are derived from subscription state (not the permission role):
  // `resolvePlan` falls back to FREE unless the subscription is active.
  const plan = resolvePlan(session.user);
  const planDef = getPlanDefinition(plan);
  const freeUser = isFreeUser(session.user);
  const subscriptionStatus = session.user.subscriptionStatus as string | undefined;

  const avatarInitials = initialsFrom(displayName);

  const planName = planDef.name;
  const benefits = planBenefits(session.user);

  const memberSince = member?.createdAt
    ? new Date(member.createdAt).toLocaleDateString('en-IN')
    : '';

  // ─── Learning progress (Pillar E1 persistence + E3 adaptive next lesson) ────
  const [enrollments, activityDates, lessonRows] = await Promise.all([
    listEnrollments(userId),
    getActivityDates(userId),
    prisma.lessonProgress.findMany({
      where: { userId },
      select: {
        courseSlug: true,
        lessonSlug: true,
        completed: true,
        secondsSpent: true,
        completedAt: true,
      },
    }),
  ]);

  const toStates = (courseSlug: string) =>
    lessonRows
      .filter((row) => row.courseSlug === courseSlug)
      .map((row) => ({
        lessonSlug: row.lessonSlug,
        completed: row.completed,
        secondsSpent: row.secondsSpent,
        completedAt: row.completedAt ? row.completedAt.toISOString() : null,
      }));

  const streak = activeStreak(activityDates, new Date().toISOString().slice(0, 10));

  const courseProgress = enrollments
    .map((enrollment) => {
      const course = getCourse(enrollment.courseSlug);
      if (!course) return null;
      const progress = computeCourseProgress(course, toStates(course.slug));
      const nextLesson = course.lessons.find((l) => l.slug === progress.nextLessonSlug) ?? null;
      return { course, progress, nextLesson };
    })
    .filter((value): value is NonNullable<typeof value> => value !== null);

  const activeCourse =
    courseProgress.find((c) => !c.progress.isComplete) ?? courseProgress[0] ?? null;

  const recommendationCourse = activeCourse?.course ?? getCourses()[0];
  const recommendations = recommendationCourse
    ? rankNextLessons(recommendationCourse, toStates(recommendationCourse.slug), {
      recentTags: recommendationCourse.tags,
      limit: 3,
    })
    : [];
  const recommendationCourseSlug = recommendationCourse?.slug ?? '';

  // ─── New since your last visit (Pillar F4) ──────────────────────────────────
  // `readLastVisit` returns the marker recorded on the previous visit; on a
  // first visit it is null so everything dated counts as new.
  const lastVisit = await readLastVisit();
  const studyMaterials = await getPublishedStudyMaterials({ limit: 8 });
  const fresh = collectFreshContent(
    [
      getAllResearch().map(researchToItem),
      getAllInsights().map(insightToItem),
      studyMaterials.map(studyToItem),
    ],
    lastVisit.since,
    { limit: 6 },
  );

  return (
    <div>
      <VisitMarker />
      <header className="relative overflow-hidden bg-brand-navy py-16">
        <HeroBackground />
        <div className="wrap relative z-10">
          <h1 className="text-white text-3xl md:text-4xl font-extrabold">
            Welcome back, {displayName}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="tag tag-teal">{planDef.name}</span>
            <span className="text-white/80 text-sm">
              Status: {subscriptionStatus ?? 'INACTIVE'}
            </span>
          </div>

          {freeUser ? (
            <div className="mt-6">
              <Link href="/pricing" className="btn btn-primary inline-flex">
                Upgrade to Pro →
              </Link>
            </div>
          ) : null}
        </div>
      </header>

      <section className="wrap py-14 grid md:grid-cols-3 gap-8">
        {/* Card 0 — Continue learning (Pillar E1/E3) */}
        <div className="card p-6 md:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-extrabold text-brand-navy text-lg">Continue learning</h2>
            <div className="flex items-center gap-3">
              <span className="tag tag-teal">🔥 {streak}-day streak</span>
              <Link href="/pgdm" className="text-sm font-semibold text-brand-teal hover:underline">
                Browse curriculum →
              </Link>
            </div>
          </div>

          {activeCourse ? (
            <div className="mt-5 grid gap-8 md:grid-cols-2">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-bold text-brand-navy">{activeCourse.course.title}</h3>
                  <span className="text-sm text-brand-slate">{activeCourse.progress.percent}%</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-silver">
                  <div
                    className="h-full rounded-full bg-brand-teal"
                    style={{ width: `${activeCourse.progress.percent}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-brand-slate">
                  {activeCourse.progress.completedLessons} of {activeCourse.progress.totalLessons} lessons
                  complete
                </p>
                <Link
                  href={`/pgdm/${activeCourse.course.slug}${activeCourse.nextLesson ? `/${activeCourse.nextLesson.slug}` : ''
                    }`}
                  className="btn btn-primary mt-4 inline-flex"
                >
                  {activeCourse.nextLesson
                    ? `Resume: ${activeCourse.nextLesson.title}`
                    : 'Review course'}{' '}
                  →
                </Link>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-brand-slate">
                  Recommended next
                </h3>
                <ul className="mt-3 space-y-3">
                  {recommendations.length === 0 ? (
                    <li className="text-sm text-brand-slate">
                      You're all caught up. Explore a new subject in the PGDM program.
                    </li>
                  ) : (
                    recommendations.map((rec) => (
                      <li key={rec.lesson.slug}>
                        <Link
                          href={`/pgdm/${recommendationCourseSlug}/${rec.lesson.slug}`}
                          className="font-semibold text-brand-navy hover:text-brand-teal line-clamp-1"
                        >
                          {rec.lesson.title}
                        </Link>
                        <p className="text-xs text-brand-slate">
                          {rec.reason}
                          {rec.lesson.minutes ? ` · ${rec.lesson.minutes} min` : ''}
                        </p>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-brand-slate">
                No courses in progress yet. Start with the PGDM curriculum to build your streak.
              </p>
              <Link href="/pgdm" className="btn btn-primary mt-4 inline-flex">
                Start learning →
              </Link>
            </div>
          )}

          {courseProgress.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-100 pt-4">
              {courseProgress.map((c) => (
                <Link
                  key={c.course.slug}
                  href={`/pgdm/${c.course.slug}`}
                  className="text-xs font-semibold text-brand-slate hover:text-brand-teal"
                >
                  {c.course.title} · {c.progress.percent}%
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* Card 0b — New since your last visit (Pillar F4) */}
        <div className="card p-6 md:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-brand-navy">
              {lastVisit.hasPriorVisit ? 'New since your last visit' : 'Latest across the platform'}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(fresh.counts).map(([kind, count]) => (
                <span key={kind} className="tag tag-teal">
                  {count} {kind}
                </span>
              ))}
            </div>
          </div>

          {fresh.items.length === 0 ? (
            <div className="mt-4">
              <p className="text-sm text-brand-slate">
                You're all caught up — nothing new since your last visit. We'll flag fresh
                research, insights and study material here.
              </p>
              <Link href="/research" className="btn btn-outline mt-4 inline-flex">
                Browse the archive →
              </Link>
            </div>
          ) : (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fresh.items.map((entry) => (
                <li key={entry.id} className="border-b border-gray-100 pb-3 sm:border-none sm:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="tag tag-navy">{entry.kind}</span>
                    {entry.meta ? (
                      <span className="text-xs text-brand-slate">{entry.meta}</span>
                    ) : null}
                  </div>
                  <Link
                    href={entry.href}
                    className="mt-2 block font-semibold text-brand-navy hover:text-brand-teal line-clamp-2"
                  >
                    {entry.title}
                  </Link>
                  <p className="mt-1 text-xs text-brand-slate">
                    {new Date(entry.date).toLocaleDateString('en-IN')}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {fresh.total > fresh.items.length ? (
            <p className="mt-4 text-xs text-brand-slate">
              +{fresh.total - fresh.items.length} more update
              {fresh.total - fresh.items.length === 1 ? '' : 's'} available in the archive.
            </p>
          ) : null}
        </div>

        {/* Card 1 — Account */}
        <div className="card p-6">
          <div className="flex items-start gap-4">
            {session.user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt="Profile"
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-brand-silver flex items-center justify-center text-brand-navy font-extrabold">
                {avatarInitials}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="font-extrabold text-brand-navy truncate">{displayName}</h2>
              <p className="text-sm text-brand-slate break-words">
                {session.user.email}
              </p>
              <p className="mt-2 text-sm text-brand-slate">
                Member since {memberSince || '—'}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link href="/dashboard/edit" className="btn btn-outline w-full">
              Edit Profile
            </Link>
            <Link href="/account" className="btn btn-outline w-full">
              Account & API keys
            </Link>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="btn btn-outline w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Card 2 — Subscription */}
        <div className="card p-6">
          <h2 className="font-extrabold text-brand-navy text-lg">Subscription</h2>
          <div className="mt-3">
            <div className="text-sm text-brand-slate">Current plan</div>
            <div className="font-extrabold text-brand-navy text-xl">{planName}</div>
            <div className="text-sm text-brand-slate mt-1">
              Status: {subscriptionStatus ?? 'INACTIVE'}
            </div>
          </div>

          <div className="mt-5">
            {freeUser ? (
              <div className="space-y-3">
                <p className="text-sm text-brand-slate">
                  Upgrade to unlock premium research and insights.
                </p>
                <Link href="/pricing" className="btn btn-primary w-full justify-center inline-flex">
                  Upgrade to Pro →
                </Link>
              </div>
            ) : (
              <ul className="space-y-2 text-sm text-brand-slate">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-teal" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6">
            <Link href="/pricing" className="btn btn-outline w-full justify-center inline-flex">
              Manage Billing
            </Link>
          </div>
        </div>

        {/* Card 3 — Saved Articles */}
        <div className="card p-6 md:col-span-1">
          <h2 className="font-extrabold text-brand-navy text-lg">Saved Articles</h2>

          <div className="mt-4">
            {savedWithMeta.length === 0 ? (
              <div className="text-center">
                <p className="text-sm text-brand-slate">
                  No saved articles yet. Start reading!
                </p>
                <Link
                  href="/research"
                  className="btn btn-primary mt-4 w-full justify-center inline-flex"
                >
                  Browse Research
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {savedWithMeta.map((item) => (
                  <li key={item.id} className="pb-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={
                              item.type === 'insight' ? 'tag tag-navy' : 'tag tag-teal'
                            }
                          >
                            {item.type}
                          </span>
                        </div>
                        <div className="mt-2 font-semibold text-brand-navy line-clamp-2">
                          {item.title}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Link
                        href={item.url}
                        className="focus-ring inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-brand-navy hover:border-brand-teal hover:text-brand-teal"
                      >
                        Read →
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

