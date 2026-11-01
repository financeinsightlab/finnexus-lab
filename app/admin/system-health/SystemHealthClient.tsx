'use client';

import React, { useState, useTransition } from 'react';
import {
  triggerManualFinancialIngest,
  triggerManualJobQueueDrain,
} from './actions';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Database,
  Cpu,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface SystemHealthData {
  dbConnected: boolean;
  dbLatencyMs: number;
  lastSuccessfulCron: string | null;
  nextScheduledCron: string;
  lastFailure: {
    at: string;
    message: string;
    provider?: string;
  } | null;
  jobs: {
    pending: number;
    running: number;
    failed: number;
    retried: number;
    total: number;
  };
  ingestion: {
    totalRuns: number;
    lastIngestionAt: string | null;
    durationMs: number | null;
    recordsFetched: number;
    recordsInserted: number;
    recordsUpdated: number;
    providers: Array<{
      name: string;
      slug: string;
      status: string;
      lastRun: string | null;
    }>;
  };
  predictions: {
    total: number;
    confirmed: number;
    incorrect: number;
    pending: number;
    overdue: number;
    weightedAccuracy: number;
  };
}

export default function SystemHealthClient({ initialData }: { initialData: SystemHealthData }) {
  const [data, setData] = useState(initialData);
  const [isPendingIngest, startTransitionIngest] = useTransition();
  const [isPendingJobs, startTransitionJobs] = useTransition();
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleManualIngest = () => {
    setActionMessage(null);
    startTransitionIngest(async () => {
      try {
        const res = await triggerManualFinancialIngest();
        setActionMessage(`Manual ingestion succeeded at ${new Date(res.at).toLocaleTimeString()}`);
      } catch (e) {
        setActionMessage(`Manual ingestion failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    });
  };

  const handleManualJobDrain = () => {
    setActionMessage(null);
    startTransitionJobs(async () => {
      try {
        const res = await triggerManualJobQueueDrain();
        setActionMessage(`Drained ${res.claimed} jobs (${res.succeeded} succeeded, ${res.failed} failed)`);
      } catch (e) {
        setActionMessage(`Job drain failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Action Message */}
      {actionMessage && (
        <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-mono flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-white">&times;</button>
        </div>
      )}

      {/* Manual Operation Controls */}
      <section className="rounded-2xl border border-white/10 bg-[#121624] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Administrative Trigger Controls</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Authorized manual dispatch. Manual executions are tagged separately from automated scheduled workflows.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleManualIngest}
              disabled={isPendingIngest}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-50 transition-all shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPendingIngest ? 'animate-spin' : ''}`} />
              <span>{isPendingIngest ? 'Ingesting...' : 'Run Financial Ingestion'}</span>
            </button>
            <button
              onClick={handleManualJobDrain}
              disabled={isPendingJobs}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 disabled:opacity-50 transition-all"
            >
              <Cpu className={`w-3.5 h-3.5 ${isPendingJobs ? 'animate-spin' : ''}`} />
              <span>{isPendingJobs ? 'Draining Queue...' : 'Drain Background Jobs'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Primary KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* DB Status */}
        <div className="rounded-xl border border-white/10 bg-[#121624] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Database Engine</span>
            <Database className="w-4 h-4 text-teal-400" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${data.dbConnected ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-red-400'}`} />
            <span className="text-xl font-extrabold text-white">{data.dbConnected ? 'Online' : 'Disconnected'}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">Ping Latency: {data.dbLatencyMs}ms</p>
        </div>

        {/* Next Scheduled Cron */}
        <div className="rounded-xl border border-white/10 bg-[#121624] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Next Scheduler Run</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xl font-extrabold text-white mt-3 font-mono">{data.nextScheduledCron}</p>
          <p className="text-[11px] text-slate-500 mt-1">Schedule: */10m GitHub Actions</p>
        </div>

        {/* Job Queue Status */}
        <div className="rounded-xl border border-white/10 bg-[#121624] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Job Queue</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">{data.jobs.pending}</span>
            <span className="text-xs text-slate-400">Pending</span>
            <span className="text-xs text-red-400 font-mono">({data.jobs.failed} failed)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{data.jobs.running} running &middot; {data.jobs.retried} retried</p>
        </div>

        {/* Prediction Accuracy */}
        <div className="rounded-xl border border-white/10 bg-[#121624] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Prediction Engine</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">{data.predictions.weightedAccuracy}%</span>
            <span className="text-xs text-slate-400">Weighted Acc</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{data.predictions.total} total &middot; {data.predictions.overdue} overdue</p>
        </div>
      </section>

      {/* Provider Availability & Ingestion Runs */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Providers */}
        <div className="rounded-2xl border border-white/10 bg-[#121624] p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center justify-between">
            <span>External Providers Availability</span>
            <span className="text-xs text-slate-500 font-mono font-normal">{data.ingestion.providers.length} registered</span>
          </h3>

          <div className="divide-y divide-white/5">
            {data.ingestion.providers.map((p) => (
              <div key={p.slug} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-slate-500 font-mono">
                    Last sync: {p.lastRun ? new Date(p.lastRun).toLocaleString('en-IN') : 'None recorded'}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${p.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ingestion & Cron Health */}
        <div className="rounded-2xl border border-white/10 bg-[#121624] p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Ingestion Pipeline Diagnostics
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Last Successful Sync</span>
              <span className="font-mono text-slate-200">
                {data.lastSuccessfulCron ? new Date(data.lastSuccessfulCron).toLocaleString('en-IN') : 'None'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Execution Duration</span>
              <span className="font-mono text-slate-200">{data.ingestion.durationMs ?? 180} ms</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Records Fetched / Inserted</span>
              <span className="font-mono text-slate-200">
                {data.ingestion.recordsFetched} fetched / {data.ingestion.recordsInserted} inserted
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Last Error</span>
              <span className="font-mono text-slate-400">
                {data.lastFailure ? `${data.lastFailure.message} (${new Date(data.lastFailure.at).toLocaleTimeString()})` : 'None recorded'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Vercel Cron Architecture</span>
              <span className="text-emerald-400 font-mono">Hobby Compliant (Daily Vercel + 10m GitHub Actions)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

