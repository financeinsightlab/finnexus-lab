'use client';

// components/tracker/LiveMacroTicker.tsx — Live Free Macro & FX Indicators (Pillar C1)
//
// Consumes /api/metrics/live with full provenance (Frankfurter/ECB + World Bank).
// Renders live cards with sources, timestamps, and licenses.

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, RefreshCw, ShieldCheck, TrendingUp } from 'lucide-react';

interface MetricPoint {
  key: string;
  label: string;
  value: number;
  unit: string;
  asOf: string;
  source: string;
  sourceUrl: string;
  license: string;
  provenance: {
    source: string;
    sourceUrl: string;
    license: string;
    asOf: string;
    ageDays: number;
  };
}

interface LiveMetricsResponse {
  updatedAt: string;
  count: number;
  metrics: MetricPoint[];
}

export default function LiveMacroTicker() {
  const [data, setData] = useState<LiveMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/metrics/live');
      if (!res.ok) throw new Error('Failed to load metrics');
      const json = await res.json();
      setData(json);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const formatValue = (metric: MetricPoint) => {
    if (metric.key.includes('NY.GDP')) {
      // GDP in Trillions USD
      const inTrillions = metric.value / 1e12;
      return `$${inTrillions.toFixed(2)}T`;
    }
    if (metric.key.includes('FP.CPI')) {
      // Inflation percentage
      return `${metric.value.toFixed(2)}%`;
    }
    if (metric.key.startsWith('fx:')) {
      return metric.value.toFixed(2);
    }
    return metric.value.toLocaleString();
  };

  return (
    <div className="mb-10 rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Live Macro &amp; Reference Indicators
            </h2>
            <p className="text-xs text-muted-foreground">
              Keyless public feeds with full source provenance (ECB &middot; World Bank Open Data)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/data-freshness"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Freshness SLAs
          </Link>
          <button
            type="button"
            onClick={fetchMetrics}
            disabled={loading}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50"
            title="Refresh metrics"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {loading && !data && (
        <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4 lg:grid-cols-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-muted/40" />
          ))}
        </div>
      )}

      {error && !data && (
        <div className="py-4 text-center text-xs text-muted-foreground">
          Reference data is temporarily refreshing. Cached benchmarks remain active.
        </div>
      )}

      {data && data.metrics && data.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.metrics.map((metric) => (
            <div
              key={metric.key}
              className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-background/50 p-3.5 transition-all hover:border-primary/40 hover:bg-accent/30"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold uppercase tracking-wider text-[11px] truncate" title={metric.label}>
                    {metric.label.split('—')[0].trim()}
                  </span>
                  <a
                    href={metric.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 transition-opacity group-hover:opacity-100 text-primary hover:text-primary/80"
                    title={`Source: ${metric.source} (${metric.license})`}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="mt-1.5 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                  {formatValue(metric)}
                  {metric.unit && !['$', '%'].includes(metric.unit) && (
                    <span className="ml-1 text-xs font-normal text-muted-foreground">{metric.unit}</span>
                  )}
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-border/40 pt-2 text-[10px] text-muted-foreground">
                <span className="truncate max-w-[130px]" title={metric.source}>
                  {metric.source.replace('Open Data', '').replace('(European Central Bank)', 'ECB').trim()}
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {metric.provenance.ageDays === 0
                    ? 'today'
                    : `${metric.provenance.ageDays}d ago`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
