import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllResearch } from '@/lib/content';
import { parseFreshStats, calculateReportFreshness, type ParsedFreshStat } from '@/lib/freshness';

export const metadata: Metadata = {
  title: 'Data Freshness Dashboard | FinNexus Lab',
  description:
    'Monitor the freshness of all statistics cited across FinNexus Lab research. Identify stale data before it misleads.',
};

// Only runs server-side — reads MDX files
function getStatusLabel(status: ParsedFreshStat['status']) {
  if (status === 'fresh') return '🟢 Fresh';
  if (status === 'aging') return '⚠️ Aging';
  return '🔴 Stale';
}

function StatusBadge({ status }: { status: ParsedFreshStat['status'] }) {
  const styles = {
    fresh: 'bg-green-100 text-green-800 border-green-200',
    aging: 'bg-amber-100 text-amber-800 border-amber-200',
    stale: 'bg-red-100  text-red-800   border-red-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
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

import { prisma } from '@/lib/prisma';

export default async function DataFreshnessDashboard() {
  // 1. Fetch MDX/Legacy reports
  const mdxPosts = getAllResearch();

  // 2. Fetch CMS/Database reports
  let dbPosts: any[] = [];
  try {
    const rawDbPosts = await prisma.post.findMany({
      where: { type: 'RESEARCH', published: true },
      select: { title: true, slug: true, content: true, createdAt: true, author: { select: { name: true } } }
    });
    
    dbPosts = rawDbPosts.map(p => ({
      slug: p.slug,
      title: p.title,
      // Provide dummy fields required for ResearchPost type matching
      date: p.createdAt.toISOString(),
      sector: 'CMS Content',
      tags: [],
      summary: '',
      pageCount: 0,
      author: p.author?.name || 'FinNexus',
      featured: false,
      content: p.content, // HTML from CMS
    }));
  } catch (e) {
    console.error("DB Fetch failed:", e);
  }

  // Combine both sources
  const posts = [...mdxPosts, ...dbPosts];

  // Parse all FreshStat usages across all research posts (server-only)
  const rows: StatRow[] = [];
  for (const post of posts) {
    if (!post.content) continue;
    
    // We unescape HTML to handle `<FreshStat>` typed into TinyMCE/TipTap
    const rawContent = post.content
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
      
    const stats = parseFreshStats(rawContent);
    for (const s of stats) {
      rows.push({
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
  }

  const fresh = rows.filter((r) => r.status === 'fresh');
  const aging = rows.filter((r) => r.status === 'aging');
  const stale = rows.filter((r) => r.status === 'stale');

  // Per-report freshness scores
  const reportScores = posts
    .map((p) => ({ ...p, freshScore: calculateReportFreshness({ ...p, content: p.content?.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"') }) }))
    .filter((p) => p.content) // only include reports with content
    .sort((a, b) => a.freshScore - b.freshScore); // worst first

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-brand-navy py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="section-label">Data Integrity</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4">
            📊 Data Freshness Dashboard
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Every statistic tagged with{' '}
            <code className="text-teal-300 bg-white/5 px-2 py-0.5 rounded text-sm">&lt;FreshStat&gt;</code>{' '}
            in our research is tracked here. Know what's current — and what to verify.
          </p>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-10">
            {[
              { label: 'Fresh',  count: fresh.length,  color: 'text-green-400' },
              { label: 'Aging',  count: aging.length,  color: 'text-amber-400' },
              { label: 'Stale',  count: stale.length,  color: 'text-red-400'   },
            ].map((s) => (
              <div key={s.label} className="stat-card p-5 rounded-xl text-center">
                <p className={`text-3xl font-extrabold ${s.color}`}>{s.count}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- SCROLLING TICKER --- */}
        {fresh.length > 0 && (
          <div className="mt-16 w-full overflow-hidden bg-black/20 border-y border-white/5 relative flex">
            <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#1A2B3D] to-transparent z-10"></div>
            <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#1A2B3D] to-transparent z-10"></div>
            
            <div className="whitespace-nowrap py-3 flex animate-marquee hover:animation-play-state-paused w-max">
              {[...fresh, ...fresh, ...fresh].map((row, i) => (
                <div key={i} className="inline-flex items-center gap-3 px-8 text-sm border-r border-white/10 last:border-0">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                  <span className="font-mono text-gray-100 font-bold tracking-tight">{row.stat}</span>
                  <span className="text-gray-500 text-xs">IN</span>
                  <Link href={`/research/${row.reportSlug}`} className="text-teal-400 hover:text-teal-300 font-medium tracking-wide">
                    {row.reportTitle}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* ─── No stats yet ─── */}
        {rows.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg font-medium">No FreshStat tags found in research content yet.</p>
            <p className="text-sm mt-2">
              Add{' '}
              <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                {'<FreshStat value="..." date="..." halfLifeDays={45} />'}
              </code>{' '}
              to your MDX research files.
            </p>
          </div>
        )}

        {/* ─── Stale ─── */}
        {stale.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
              🔴 Stale Statistics
              <span className="text-sm font-normal text-gray-400">— Action required</span>
            </h2>
            <StatTable rows={stale} />
          </section>
        )}

        {/* ─── Aging ─── */}
        {aging.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
              ⚠️ Aging Statistics
              <span className="text-sm font-normal text-gray-400">— Verify before citing</span>
            </h2>
            <StatTable rows={aging} />
          </section>
        )}

        {/* ─── Fresh ─── */}
        {fresh.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
              🟢 Fresh Statistics
            </h2>
            <StatTable rows={fresh} />
          </section>
        )}

        {/* ─── Report Freshness Scores ─── */}
        {reportScores.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-brand-navy mb-6">
              📄 Report Freshness Scores
            </h2>
            <div className="card overflow-hidden divide-y divide-gray-100">
              {reportScores.map((p) => (
                <div key={p.slug} className="flex items-center gap-4 px-6 py-4">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      background:
                        p.freshScore > 70 ? '#22c55e' :
                        p.freshScore > 40 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                  <Link
                    href={`/research/${p.slug}`}
                    className="flex-1 text-sm font-medium text-brand-navy hover:text-brand-teal transition-colors truncate"
                  >
                    {p.title}
                  </Link>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="w-24">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${p.freshScore}%`,
                            background:
                              p.freshScore > 70 ? '#22c55e' :
                              p.freshScore > 40 ? '#f59e0b' : '#ef4444',
                          }}
                        />
                      </div>
                    </div>
                    <span
                      className="text-xs font-bold w-10 text-right"
                      style={{
                        color:
                          p.freshScore > 70 ? '#16a34a' :
                          p.freshScore > 40 ? '#d97706' : '#dc2626',
                      }}
                    >
                      {p.freshScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function StatTable({ rows }: { rows: StatRow[] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Statistic</th>
            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Report</th>
            <th className="text-center px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Age</th>
            <th className="text-center px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-3 font-semibold text-brand-navy max-w-[200px] truncate">
                {row.stat}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/research/${row.reportSlug}`}
                  className="text-brand-teal hover:underline text-xs leading-snug line-clamp-2"
                >
                  {row.reportTitle}
                </Link>
              </td>
              <td className="px-4 py-3 text-center text-xs text-gray-500 whitespace-nowrap">
                {row.daysOld}d old
                <span className="text-gray-300 ml-1">/ {row.halfLife}d HL</span>
              </td>
              <td className="px-4 py-3 text-center">
                <StatusBadge status={row.status} />
              </td>
              <td className="px-4 py-3 text-xs">
                {row.updateUrl ? (
                  <a
                    href={row.updateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-teal hover:underline font-semibold"
                  >
                    Update →
                  </a>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
