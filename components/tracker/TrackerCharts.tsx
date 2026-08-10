'use client';

import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const tooltipStyle = { background: '#0f1c2d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 12, color: '#e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.35)' };
const axisTick = { fill: '#94a3b8', fontSize: 11 };

export function Sparkline({ data, color = '#0d6e6e' }: { data: number[]; color?: string }) {
  const points = data.map((value, i) => ({ i, value }));
  const gid = `spark-${color.replace('#', '')}`;
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={points} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#${gid})`} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const DONUT_COLORS = ['#0d6e6e', '#2563eb', '#ea580c', '#7c3aed', '#db2777', '#059669', '#ca8a04', '#64748b'];

export function SubSectorDonut({ data }: { data: { name: string; share: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="share" nameKey="name" innerRadius={64} outerRadius={96} paddingAngle={2} stroke="none">
          {data.map((_, i) => <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, 'Share']} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ProjectionChart({ data, color = '#0d6e6e', unit = '' }: { data: { year: string; value: number }[]; color?: string; unit?: string }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 20, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
        <XAxis dataKey="year" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={44} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(13,110,110,0.08)' }} formatter={(value) => [`${value}${unit}`, 'Market size']} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => <Cell key={i} fill={i === data.length - 1 ? color : `${color}55`} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MetricTrendChart({ data, color, unit }: { data: { label: string; value: number }[]; color: string; unit?: string }) {
  const gid = `trend-${color.replace('#', '')}`;
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={40} />
        <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}${unit ?? ''}`, 'Value']} />
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} fill={`url(#${gid})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TemperatureGauge({ value, color }: { value: number; color: string }) {
  const pct = Math.max(0, Math.min(100, value));
  const r = 68;
  const circumference = Math.PI * r;
  return (
    <svg viewBox="0 0 160 96" className="w-full max-w-[200px] mx-auto">
      <path d="M 12 88 A 68 68 0 0 1 148 88" fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="12" strokeLinecap="round" />
      <path d="M 12 88 A 68 68 0 0 1 148 88" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
        strokeDasharray={`${((pct / 100) * circumference).toFixed(1)} ${circumference.toFixed(1)}`} />
      <text x="80" y="66" textAnchor="middle" fontSize="30" fontWeight="800" fill={color}>{pct}°</text>
      <text x="80" y="84" textAnchor="middle" fontSize="10" fill="#94a3b8" letterSpacing="1">CONSENSUS TEMP</text>
    </svg>
  );
}
