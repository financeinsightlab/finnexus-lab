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
    <div className="glass-cinema rounded-2xl border border-white/10 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {series.some(s => s.kind === 'line' || s.kind === 'area' || type === 'line') && (
          <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-1">
            {(['bar', 'line', 'area'] as const).map(t => (
              <button
                key={t}
                onClick={() => setSelected(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selected === t ? 'bg-cinema-cyan/20 text-cinema-cyan' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t === 'bar' ? 'Bar' : t === 'line' ? 'Line' : 'Area'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ width: '100%', height }} className="text-gray-200">
        {!mounted && (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
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
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey={xKey}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={42}
            />
            <Tooltip
              contentStyle={{
                background: '#121419',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 12,
                color: '#fff',
              }}
              labelStyle={{ color: '#fff', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#d1d5db' }} />
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
