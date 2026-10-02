'use client';

import { Download, Check, FileJson } from 'lucide-react';
import { useState } from 'react';

/**
 * Data Lab download control (Pillar C3).
 *
 * Generates a CSV in the browser so it works even offline, and — when a
 * `slug` is provided — also links to the machine-readable server endpoints
 * (`/api/datasets/{slug}?format=csv|json`) whose metadata is advertised in the
 * page's schema.org Dataset JSON-LD.
 */
export default function DataLabDownload({
  filename,
  data,
  columns,
  slug,
  label = 'Download Dataset (CSV)',
}: {
  filename: string;
  data: Record<string, unknown>[];
  columns?: string[];
  slug?: string;
  label?: string;
}) {
  const [done, setDone] = useState(false);

  const toCsv = (): string => {
    const keys = columns ?? (data.length ? Object.keys(data[0]) : []);
    const header = keys.join(',');
    const rows = data.map(row =>
      keys.map(k => {
        const v = row[k];
        if (v == null) return '';
        const s = String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
      }).join(',')
    );
    return [header, ...rows].join('\n');
  };

  const download = () => {
    const csv = toCsv();
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    // Delay cleanup so the download isn't cancelled before it starts
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);

    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={download}
        type="button"
        className="inline-flex items-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-500/20 dark:border-cinema-aurora/30 dark:bg-cinema-aurora/15 dark:text-cinema-aurora"
      >
        {done ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
        {done ? 'Downloaded!' : label}
      </button>

      {slug && (
        <a
          href={`/api/datasets/${slug}?format=json`}
          download
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition hover:bg-accent"
        >
          <FileJson className="w-4 h-4" />
          JSON
        </a>
      )}
    </div>
  );
}
