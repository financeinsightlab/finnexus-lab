'use client';

import { Download, Check } from 'lucide-react';
import { useState } from 'react';

export default function DataLabDownload({
  filename,
  data,
  columns,
  label = 'Download Dataset (CSV)',
}: {
  filename: string;
  data: Record<string, unknown>[];
  columns?: string[];
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
    <button
      onClick={download}
      type="button"
      className="inline-flex items-center gap-2 rounded-xl bg-cinema-aurora/15 border border-cinema-aurora/30 text-cinema-aurora px-4 py-2.5 text-sm font-medium hover:bg-cinema-aurora/25 transition"
    >
      {done ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
      {done ? 'Downloaded!' : label}
    </button>
  );
}
