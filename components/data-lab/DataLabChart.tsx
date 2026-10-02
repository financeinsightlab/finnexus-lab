'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Area,
} from 'recharts';

// Generic interactive financial-intelligence chart used across Data Lab pages.
// Data is supplied per project from the MDX file.

interface Row { [k: string]: string | number }

export default function DataLabChart({
  title,
  subtitle,
  data,
  xKey,
  series,
  type = 'bar',
  height = 360,
}: {
  title?: string;
  subtitle?: string;
  data: Row[];
  xKey: string;
  series: { key: string; name: string; color: string; kind?: 'bar' | 'line' | 'area' }[];
  type?: 'bar' | 'line' | 'area';
  height?: number;
}) {
  const [selected, setSelected] = useState<string>(type === 'line' ? 'line' : type);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="glass-cinema rounded-2xl border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          {title && <h3 className="text-lg font-bold text-content-primary">{title}</h3>}
          {subtitle && <p className="text-sm text-content-muted mt-1">{subtitle}</p>}
        </div>
        {series.some(s => s.kind === 'line' || s.kind === 'area' || type === 'line') && (
          <div className="inline-flex rounded-xl bg-surface-muted border border-border p-1">
            {(['bar', 'line', 'area'] as const).map(t => (
              <button
                key={t}
                onClick={() => setSelected(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selected === t ? 'bg-brand-muted text-brand' : 'text-content-muted hover:text-content-primary'
                }`}
              >
                {t === 'bar' ? 'Bar' : t === 'line' ? 'Line' : 'Area'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ width: '100%', height }} className="text-content-secondary">
        {!mounted && (
          <div className="w-full h-full flex items-center justify-center text-content-muted text-sm">
            Loading chart…
          </div>
        )}
        {mounted && (
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
            <defs>
              {series.filter(s => s.kind === 'area' || selected === 'area').map(s => (
                <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-subtle))" />
            <XAxis
              dataKey={xKey}
              tick={{ fill: 'hsl(var(--content-muted))', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--content-muted))', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={42}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--surface-overlay))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 12,
                color: 'hsl(var(--content-primary))',
              }}
              labelStyle={{ color: 'hsl(var(--content-primary))', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: 'hsl(var(--content-secondary))' }} />
            {series.map(s => {
              const kind = s.kind === 'line' || selected === 'line' ? 'line' : selected === 'area' ? 'area' : 'bar';
              if (kind === 'line') {
                return (
                  <Line key={s.key} type="monotone" dataKey={s.key} name={s.name}
                    stroke={s.color} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                );
              }
              if (kind === 'area') {
                return (
                  <Area key={s.key} type="monotone" dataKey={s.key} name={s.name}
                    stroke={s.color} fill={`url(#grad-${s.key})`} strokeWidth={2.5} />
                );
              }
              return (
                <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color}
                  radius={[6, 6, 0, 0]} />
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
