import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getPredictionsByAuthor, getAnalystScore } from '@/lib/predictions';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

// Find user by slugified name
async function getUserBySlug(slug: string) {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
  });
  const slugify = (s: string) =>
    (s ?? '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return users.find((u) => slugify(u.name ?? '') === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const user = await getUserBySlug(slug);
  if (!user) return { title: 'Analyst Not Found' };
  return {
    title: `${user.name} | FinNexus Lab Analyst`,
    description: `Track ${user.name}'s prediction accuracy, calibration score, and research on FinNexus Lab.`,
  };
}

const STATUS_CONFIG = {
  CONFIRMED: { label: 'Confirmed', icon: '✅', color: 'text-green-600' },
  INCORRECT: { label: 'Incorrect', icon: '❌', color: 'text-red-500' },
  PARTIAL:   { label: 'Partial',   icon: '🟡', color: 'text-amber-500' },
  PENDING:   { label: 'Pending',   icon: '⏳', color: 'text-gray-400' },
} as const;

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  const user = await getUserBySlug(slug);
  if (!user) notFound();

  const [predictions, score, posts] = await Promise.all([
    getPredictionsByAuthor(user.id),
    getAnalystScore(user.id),
    prisma.post.findMany({
      where: { authorId: user.id, published: true },
      orderBy: { publishedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, slug: true, type: true, publishedAt: true },
    }),
  ]);

  const lastFive = predictions
    .filter((p) => p.status !== 'PENDING')
    .sort((a, b) => new Date(b.resolveDate).getTime() - new Date(a.resolveDate).getTime())
    .slice(0, 5);

  const initials = (user.name ?? '?')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ─── Header ─── */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/predictions" className="text-brand-teal text-sm hover:underline mb-8 block">
            ← Back to Predictions Board
          </Link>
          <div className="flex items-center gap-6 flex-wrap">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt={user.name ?? ''} className="w-full h-full rounded-2xl object-cover" />
              ) : (
                initials
              )}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                {user.name}
              </h1>
              <p className="text-gray-400 mt-1 text-sm">
                Financial Analyst · FinNexus Lab
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Member since {new Date(user.createdAt).getFullYear()}
              </p>
            </div>

            {/* Score Badge */}
            {score && (
              <div className="ml-auto text-center bg-white/5 border border-white/10 rounded-2xl px-8 py-5">
                <p className="text-5xl font-extrabold text-teal-400">
                  {score.calibrationScore.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-400 mt-1 font-medium">
                  Prediction Accuracy
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {score.totalPredictions} predictions tracked
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-[1fr_320px]">
        {/* ─── Left column ─── */}
        <div className="space-y-8">
          {/* Calibration breakdown */}
          {score && (
            <div className="card p-6">
              <h2 className="text-lg font-bold text-brand-navy mb-5">
                📊 Calibration Breakdown
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center mb-5">
                {[
                  { label: 'Confirmed', value: score.confirmed,  color: 'text-green-600' },
                  { label: 'Partial',   value: score.partial,    color: 'text-amber-500' },
                  { label: 'Incorrect', value: score.incorrect,  color: 'text-red-500'   },
                ].map((s) => (
                  <div key={s.label}>
                    <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Accuracy bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Accuracy</span>
                  <span className="font-bold text-teal-600">{score.calibrationScore.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all"
                    style={{ width: `${score.calibrationScore}%` }}
                  />
                </div>
              </div>

              {score.longestStreak > 0 && (
                <p className="text-xs text-gray-500 mt-4">
                  🔥 Longest win streak: <strong className="text-brand-navy">{score.longestStreak}</strong> correct predictions in a row
                </p>
              )}

              <p className="text-[10px] text-gray-400 mt-2">
                Last calculated: {new Date(score.lastCalculated).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Prediction Timeline — last 5 resolved */}
          {lastFive.length > 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-bold text-brand-navy mb-5">
                🕒 Recent Resolved Predictions
              </h2>
              <ol className="space-y-4 relative border-l border-gray-200 ml-2">
                {lastFive.map((p) => {
                  const cfg = STATUS_CONFIG[p.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING;
                  return (
                    <li key={p.id} className="ml-5 relative">
                      {/* Timeline dot */}
                      <span
                        className="absolute -left-[26px] top-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[10px]"
                        style={{
                          background:
                            p.status === 'CONFIRMED' ? '#dcfce7' :
                            p.status === 'INCORRECT' ? '#fee2e2' : '#fef3c7',
                        }}
                      >
                        {cfg.icon}
                      </span>
                      <p className={`text-sm font-medium leading-snug ${cfg.color}`}>
                        {cfg.icon} {p.claim}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Resolved {new Date(p.resolveDate).toLocaleDateString()}
                        {p.reportSlug && (
                          <Link
                            href={`/research/${p.reportSlug}`}
                            className="ml-2 text-brand-teal hover:underline"
                          >
                            Source →
                          </Link>
                        )}
                      </p>
                      {p.resolutionNote && (
                        <p className="text-xs text-gray-500 italic mt-1 border-l-2 border-gray-200 pl-2">
                          {p.resolutionNote}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>

              <Link
                href={`/predictions?author=${slug}`}
                className="mt-5 text-sm font-semibold text-brand-teal hover:underline block"
              >
                View all {predictions.length} predictions →
              </Link>
            </div>
          )}

          {predictions.length === 0 && (
            <div className="card p-8 text-center text-gray-400">
              <div className="text-4xl mb-3">🎯</div>
              <p className="font-medium">No predictions published yet.</p>
            </div>
          )}
        </div>

        {/* ─── Right column ─── */}
        <div className="space-y-6">
          {/* Open predictions */}
          {predictions.filter((p) => p.status === 'PENDING').length > 0 && (
            <div className="card p-5">
              <h3 className="text-sm font-bold text-brand-navy mb-4">⏳ Open Predictions</h3>
              <ul className="space-y-3">
                {predictions
                  .filter((p) => p.status === 'PENDING')
                  .slice(0, 4)
                  .map((p) => {
                    const daysLeft = Math.ceil(
                      (new Date(p.resolveDate).getTime() - Date.now()) / 86_400_000,
                    );
                    return (
                      <li key={p.id} className="text-xs border-l-2 border-yellow-400 pl-3 space-y-0.5">
                        <p className="text-brand-navy font-medium leading-snug">{p.claim}</p>
                        <p className="text-gray-400">
                          {daysLeft < 0
                            ? `${Math.abs(daysLeft)}d overdue`
                            : `${daysLeft}d remaining`}
                        </p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}

          {/* Recent posts */}
          {posts.length > 0 && (
            <div className="card p-5">
              <h3 className="text-sm font-bold text-brand-navy mb-4">📄 Recent Research</h3>
              <ul className="space-y-3">
                {posts.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/${p.type === 'RESEARCH' ? 'research' : 'insights'}/${p.slug}`}
                      className="text-xs font-medium text-brand-navy hover:text-brand-teal transition-colors leading-snug block"
                    >
                      {p.title}
                    </Link>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
