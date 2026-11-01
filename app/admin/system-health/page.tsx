import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { getAllPredictions } from '@/lib/predictions';
import { buildCalibration } from '@/lib/calibration';
import { PROVIDERS } from '@/lib/financial-data';
import SystemHealthClient from './SystemHealthClient';

export const metadata: Metadata = {
  title: 'System Health & Pipeline Operations | Kunwar Analytics Admin',
  description: 'Operations, background job queue monitoring, cron scheduler status, and data pipeline diagnostics.',
};

export const dynamic = 'force-dynamic';

export default async function AdminSystemHealthPage() {
  // Test DB latency and connection
  const t0 = Date.now();
  let dbConnected = false;
  let dbLatencyMs = 0;

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbConnected = true;
    dbLatencyMs = Date.now() - t0;
  } catch {
    dbConnected = false;
    dbLatencyMs = Date.now() - t0;
  }

  // Load Job Queue Stats
  let jobs = { pending: 0, running: 0, failed: 0, retried: 0, total: 0 };
  try {
    const [pending, running, failed, retried, total] = await Promise.all([
      prisma.job.count({ where: { status: 'PENDING' } }),
      prisma.job.count({ where: { status: 'RUNNING' } }),
      prisma.job.count({ where: { status: 'FAILED' } }),
      prisma.job.count({ where: { attempts: { gt: 1 } } }),
      prisma.job.count(),
    ]);
    jobs = { pending, running, failed, retried, total };
  } catch {
    // Graceful fallback
  }

  // Load Ingestion Runs
  let lastSuccessfulCron: string | null = null;
  let lastFailure: { at: string; message: string; provider?: string } | null = null;
  let durationMs: number | null = null;
  let recordsFetched = 0;
  let recordsInserted = 0;
  let recordsUpdated = 0;
  let totalRuns = 0;

  try {
    const [latestDone, latestFailed, total] = await Promise.all([
      prisma.ingestionRun.findFirst({
        where: { status: 'DONE' },
        orderBy: { startedAt: 'desc' },
      }),
      prisma.ingestionRun.findFirst({
        where: { status: 'FAILED' },
        orderBy: { startedAt: 'desc' },
      }),
      prisma.ingestionRun.count(),
    ]);

    totalRuns = total;
    if (latestDone) {
      lastSuccessfulCron = latestDone.startedAt.toISOString();
      durationMs = latestDone.durationMs;
      recordsFetched = latestDone.recordsFetched;
      recordsInserted = latestDone.recordsInserted;
      recordsUpdated = latestDone.recordsUpdated;
    }

    if (latestFailed) {
      lastFailure = {
        at: latestFailed.startedAt.toISOString(),
        message: latestFailed.error || 'Unknown ingestion failure',
      };
    }
  } catch {
    // Graceful fallback
  }

  // Load Registered Providers
  let providersList: Array<{ name: string; slug: string; status: string; lastRun: string | null }> = [];
  try {
    const dbProviders = await prisma.dataProvider.findMany({
      include: {
        ingestionRuns: {
          orderBy: { startedAt: 'desc' },
          take: 1,
        },
      },
    });

    if (dbProviders.length > 0) {
      providersList = dbProviders.map((p) => ({
        name: p.name,
        slug: p.slug,
        status: p.status,
        lastRun: p.ingestionRuns[0]?.startedAt ? p.ingestionRuns[0].startedAt.toISOString() : null,
      }));
    } else {
      providersList = Object.values(PROVIDERS).map((p) => ({
        name: p.name,
        slug: p.slug,
        status: 'ACTIVE',
        lastRun: null,
      }));
    }
  } catch {
    providersList = Object.values(PROVIDERS).map((p) => ({
      name: p.name,
      slug: p.slug,
      status: 'ACTIVE',
      lastRun: null,
    }));
  }

  // Load Predictions Health
  let predictions = { total: 0, confirmed: 0, incorrect: 0, pending: 0, overdue: 0, weightedAccuracy: 0 };
  try {
    const allPreds = await getAllPredictions();
    const stats = buildCalibration(allPreds);
    predictions = {
      total: stats.total,
      confirmed: stats.confirmed,
      incorrect: stats.incorrect,
      pending: stats.pending,
      overdue: stats.overdue,
      weightedAccuracy: stats.weightedAccuracy,
    };
  } catch {
    // Graceful fallback
  }

  // Next scheduled estimation (runs every 10 minutes on GitHub Actions)
  const nextMin = Math.ceil(new Date().getMinutes() / 10) * 10;
  const nextScheduled = new Date();
  nextScheduled.setMinutes(nextMin, 0, 0);

  const initialData = {
    dbConnected,
    dbLatencyMs,
    lastSuccessfulCron,
    nextScheduledCron: nextScheduled.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    lastFailure,
    jobs,
    ingestion: {
      totalRuns,
      lastIngestionAt: lastSuccessfulCron,
      durationMs,
      recordsFetched,
      recordsInserted,
      recordsUpdated,
      providers: providersList,
    },
    predictions,
  };

  return (
    <div className="space-y-8 p-6 max-w-[1400px] mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Operations Control</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">System Health &amp; Pipeline Operations</h1>
        <p className="text-sm text-slate-400 mt-1">
          Real-time diagnostics across database connectivity, background job queue, cron dispatchers, and financial data ingestion.
        </p>
      </div>

      <SystemHealthClient initialData={initialData} />
    </div>
  );
}

