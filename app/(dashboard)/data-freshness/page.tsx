import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllResearch } from '@/lib/content';
import { parseFreshStats, type ParsedFreshStat } from '@/lib/freshness';
import { getFreshnessSummary } from '@/lib/financial-data';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { captureError } from '@/lib/observability';
import LiveMacroTicker from '@/components/tracker/LiveMacroTicker';

export const metadata: Metadata = {
  title: 'Data Freshness & SLA Dashboard | Kunwar Analytics',
  description:
    'Monitor the freshness of all financial indicators, research content, and background data ingestion runs across Kunwar Analytics.',
};

export const dynamic = 'force-dynamic';

function getStatusLabel(status: ParsedFreshStat['status']) {
  if (status === 'fresh') return '🟢 Fresh';
  if (status === 'aging') return '⚠️ Aging';
  return '🔴 Stale';
}

function StatusBadge({ status }: { status: ParsedFreshStat['status'] }) {
  const styles = {
    fresh: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    aging: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    stale: 'bg-red-500/10 text-red-400 border-red-500/30',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {getStatusLabel(status)}
    </span>
  );
}

interface StatRow {
  reportTitle: string;
  reportSlug:  string;
  stat:        string;
  daysOld:     number;
  halfLife:    number;
  status:      ParsedFreshStat['status'];
  source?:     string;
  updateUrl?:  string;
}

interface ReportFreshnessEvaluation {
  slug: string;
  title: string;
  date: string;
  ageDays: number;
  score: number;
  status: 'fresh' | 'aging' | 'stale';
  freshStatCount: number;
  author: string;
  adminEditUrl: string;
}

interface FreshnessErrorProps {
  error: Error;
  message?: string;
}

function FreshnessError({ error, message }: FreshnessErrorProps) {
  captureError(error, {
    source: 'data-freshness.page',
    level: 'error',
  });

  return (
    <div className="min-h-screen bg-[#0B0D13] text-slate-200 py-16 px-6">
      <div className="max-w-2xl mx-auto text-center border border-white/10 bg-white/5 rounded-2xl p-8">
        <span className="text-4xl mb-4 block">⚠️</span>
        <h2 className="text-xl font-bold text-white mb-2">Data Freshness Dashboard Unavailable</h2>
        <p className="text-sm text-slate-400 mb-6">{message ?? 'Could not load data freshness statistics.'}</p>
        <a
          href="/data-freshness"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-hover transition-all"
        >
          <span>Refresh</span>
          <span>&rarr;</span>
        </a>
      </div>
    </div>
  );
}

export default async function DataFreshnessDashboard() {
  let financialFreshness: Awaited<ReturnType<typeof getFreshnessSummary>>;

  try {
    financialFreshness = await getFreshnessSummary();
  } catch (error) {
    logger.error('Data Freshness: financial freshness summary query failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    return (
      <FreshnessError
        error={error instanceof Error ? error : new Error(String(error))}
        message="Unable to load financial data freshness. Please try refreshing shortly."
      />
    );
  }

  // 1. Research-content freshness — evaluate the ENTIRE published content library
  let mdxPosts: any[] = [];
  try {
    mdxPosts = getAllResearch();
  } catch (error) {
    logger.warn('Data Freshness: MDX research fetch failed', {
      error: error instanceof Error ? error.message : String(error),
    });
  }

  let dbPosts: any[] = [];
  try {
    const rawDbPosts = await prisma.post.findMany({
      where: { type: 'RESEARCH', published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: { select: { name: true } },
      },
    });

    dbPosts = rawDbPosts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      date: p.updatedAt ? p.updatedAt.toISOString() : p.createdAt.toISOString(),
      sector: 'Research',
      tags: [],
      summary: '',
      pageCount: 0,
      author: p.author?.name || 'Kunwar Analytics',
      featured: false,
      content: p.content,
    }));
  } catch (e) {
    logger.warn('Data Freshness: CMS database posts query failed', { error: String(e) });
  }

  const allPublishedPosts = [...mdxPosts, ...dbPosts];
  const now = Date.now();

  // Parse all FreshStat usages
  const statRows: StatRow[] = [];
  const evaluatedReports: ReportFreshnessEvaluation[] = [];

  for (const post of allPublishedPosts) {
    const rawContent = (post.content || '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');

    const stats = parseFreshStats(rawContent);
    for (const s of stats) {
      statRows.push({
        reportTitle: post.title,
        reportSlug:  post.slug,
        stat:        s.value,
        daysOld:     s.daysOld,
        halfLife:    s.halfLifeDays,
        status:      s.status,
        source:      s.source,
        updateUrl:   s.updateUrl,
      });
    }

    const postDate = new Date(post.date || post.createdAt || now);
    const postAgeDays = Math.max(0, Math.floor((now - postDate.getTime()) / 86_400_000));

    let score = 100;
    let status: 'fresh' | 'aging' | 'stale' = 'fresh';

    if (stats.length > 0) {
      const avgRatio = stats.reduce((acc, s) => acc + s.freshnessRatio, 0) / stats.length;
      score = Math.round(avgRatio * 100);
      if (score >= 70) status = 'fresh';
      else if (score >= 40) status = 'aging';
      else status = 'stale';
    } else {
      // Do not treat absence of FreshStat tags as proof of freshness
      if (postAgeDays <= 60) {
        score = 100;
        status = 'fresh';
      } else if (postAgeDays <= 180) {
        score = Math.max(40, 100 - Math.round(((postAgeDays - 60) / 120) * 50));
        status = 'aging';
      } else {
        score = Math.max(10, 40 - Math.round(((postAgeDays - 180) / 180) * 30));
        status = 'stale';
      }
    }

    evaluatedReports.push({
      slug: post.slug,
      title: post.title,
      date: postDate.toISOString().slice(0, 10),
      ageDays: postAgeDays,
      score,
      status,
      freshStatCount: stats.length,
      author: post.author || 'Kunwar Analytics',
      adminEditUrl: post.id ? `/admin/cms/edit/${post.id}` : `/research/${post.slug}`,
    });
  }

  // Reports requiring review (Aging and Stale)
  const reportsRequiringReview = evaluatedReports
    .filter((r) => r.status !== 'fresh')
    .sort((a, b) => a.score - b.score);

  const freshReportCount = evaluatedReports.filter((r) => r.status === 'fresh').length;
  const agingReportCount = evaluatedReports.filter((r) => r.status === 'aging').length;
  const staleReportCount = evaluatedReports.filter((r) => r.status === 'stale').length;

  return (
    <div className="min-h-screen bg-[#0B0D13] text-content-primary">
      {/* Header */}
      <section className="relative overflow-hidden bg-surface-raised border-b border-white/5 py-16">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
              Data SLA &amp; Integrity System
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-3">
              📊 Data Freshness &amp; Quality
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto">
              Real-time monitoring of financial indicators, research content half-lives, and background ingestion health.
              Full provenance, verified timestamps, and operational SLAs.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Tracked Indicators</p>
              <p className="text-2xl md:text-3xl font-extrabold text-white mt-1">{financialFreshness.total}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">FX, Macro &amp; Benchmarks</p>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Fresh Metrics</p>
              <p className="text-2xl md:text-3xl font-extrabold text-emerald-400 mt-1">{financialFreshness.fresh}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Within SLA schedule</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Aging Metrics</p>
              <p className="text-2xl md:text-3xl font-extrabold text-amber-400 mt-1">{financialFreshness.aging}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Approaching SLA window</p>
            </div>
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-red-400">Stale / Failed</p>
              <p className="text-2xl md:text-3xl font-extrabold text-red-400 mt-1">{financialFreshness.stale}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{financialFreshness.failed} failed runs</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 py-12 space-y-14">
        {/* Live Macro Ticker */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span>📡</span> Live Financial Data Feed
            </h2>
            <Link href="/financial-intelligence" className="text-xs font-semibold text-teal-400 hover:text-teal-300">
              Open Financial Terminal &rarr;
            </Link>
          </div>
          <LiveMacroTicker />
        </section>

        {/* ─── Pillar 1: Financial Data Freshness & Provider Availability ─── */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🏛️</span> 1. Financial Data Pipeline SLA
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                External provider availability, observation lag, and ingestion status.
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Last Sync: {financialFreshness.lastSuccessfulIngestion ? new Date(financialFreshness.lastSuccessfulIngestion).toLocaleString('en-IN') : 'Recent'}
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/10">
                <tr>
                  <th className="px-5 py-3">Provider</th>
                  <th className="px-5 py-3">Data Category</th>
                  <th className="px-5 py-3">Cadence</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Last Ingestion</th>
                  <th className="px-5 py-3">License</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {financialFreshness.providerStatus.map((provider) => (
                  <tr key={provider.slug} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4 font-semibold text-white">{provider.name}</td>
                    <td className="px-5 py-4">{provider.slug === 'frankfurter' ? 'Foreign Exchange (ECB Reference)' : provider.slug === 'worldbank' ? 'Macroeconomics & GDP' : 'Monetary Policy & Yields'}</td>
                    <td className="px-5 py-4">{provider.slug === 'frankfurter' ? 'Daily' : provider.slug === 'worldbank' ? 'Annual / Periodic' : 'Policy Meetings'}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold text-[10px] ${provider.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${provider.status === 'ACTIVE' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        {provider.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-400">
                      {provider.lastRun ? new Date(provider.lastRun).toLocaleString('en-IN') : 'Active'}
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-[11px]">{provider.slug === 'frankfurter' ? 'ECB Reference Rates' : provider.slug === 'worldbank' ? 'CC BY 4.0' : 'Official Publication'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Pillar 2: Research-Content Freshness & Worklist ─── */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📚</span> 2. Published Research Content Freshness
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluates all {allPublishedPosts.length} published reports across MDX files and database CMS posts. Absence of &lt;FreshStat&gt; tags is assessed via article age.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-bold text-emerald-400">
                {freshReportCount} Fresh
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] font-bold text-amber-400">
                {agingReportCount} Aging
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-[11px] font-bold text-red-400">
                {staleReportCount} Stale
              </span>
            </div>
          </div>

          {reportsRequiringReview.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span>⚠️</span> Reports Requiring Review &amp; Re-verification ({reportsRequiringReview.length})
                </h3>
                <span className="text-xs text-slate-500">Sorted by lowest freshness score</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="px-5 py-3">Report Title</th>
                      <th className="px-5 py-3">Author</th>
                      <th className="px-5 py-3">Last Updated</th>
                      <th className="px-5 py-3">Age</th>
                      <th className="px-5 py-3">Score</th>
                      <th className="px-5 py-3">Freshness</th>
                      <th className="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {reportsRequiringReview.map((r) => (
                      <tr key={r.slug} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4 font-semibold text-white max-w-xs truncate">
                          <Link href={`/research/${r.slug}`} className="hover:text-teal-400 transition-colors">
                            {r.title}
                          </Link>
                          {r.freshStatCount === 0 && (
                            <span className="ml-2 inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-slate-400">
                              No &lt;FreshStat&gt;
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-slate-400">{r.author}</td>
                        <td className="px-5 py-4 font-mono text-slate-400">{r.date}</td>
                        <td className="px-5 py-4 font-mono">{r.ageDays}d</td>
                        <td className="px-5 py-4 font-mono font-bold text-amber-400">{r.score}%</td>
                        <td className="px-5 py-4">
                          <StatusBadge status={r.status} />
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            href={r.adminEditUrl}
                            className="inline-flex items-center gap-1 rounded-lg border border-teal-500/30 bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-400 hover:bg-teal-500/20 transition-colors"
                          >
                            <span>Review</span>
                            <span>&rarr;</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center text-emerald-400">
              <span className="text-3xl block mb-2">✅</span>
              <p className="font-semibold text-sm">All published research reports are currently fresh.</p>
              <p className="text-xs text-slate-400 mt-1">No articles currently exceed decay half-lives or aging thresholds.</p>
            </div>
          )}
        </section>

        {/* ─── Pillar 3: Tagged Micro-Statistics ─── */}
        {statRows.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span>🏷️</span> Tracked &lt;FreshStat&gt; Data Points ({statRows.length})
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="px-5 py-3">Stat Value</th>
                    <th className="px-5 py-3">Article</th>
                    <th className="px-5 py-3">Age</th>
                    <th className="px-5 py-3">Half-Life</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {statRows.map((row, idx) => (
                    <tr key={`${row.reportSlug}-${idx}`} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3.5 font-bold font-mono text-white">{row.stat}</td>
                      <td className="px-5 py-3.5 text-slate-300">
                        <Link href={`/research/${row.reportSlug}`} className="hover:text-teal-400 transition-colors">
                          {row.reportTitle}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 font-mono">{row.daysOld}d</td>
                      <td className="px-5 py-3.5 font-mono">{row.halfLife}d</td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-5 py-3.5 text-slate-400">
                        {row.source || 'Report Citation'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
