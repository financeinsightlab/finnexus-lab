"use client"

import React from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

interface AnalyticsChartsProps {
  monthlyData: Array<{
    month: string
    users: number
    pageviews: number
    sessions: number
  }>
  trafficSources: Array<{
    name: string
    value: number
    color: string
  }>
  topPages: Array<{
    page: string
    views: number
    bounce: string
    avgTime: string
  }>
  bounceRate: string
  topCountry: string
}

export default function AnalyticsCharts({
  monthlyData,
  trafficSources,
  topPages,
  bounceRate,
  topCountry
}: AnalyticsChartsProps) {
  const chartColors = {
    primary: 'hsl(var(--brand))',
    secondary: 'hsl(var(--info))',
    accent: 'hsl(var(--success))',
  }

  return (
    <>
      {/* Main Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Traffic Overview */}
        <div className="lg:col-span-2 bg-surface rounded-3xl border border-border p-8 md:p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-content-primary">Traffic Overview</h3>
            <div className="flex items-center gap-4">
              <span className="text-xs text-content-muted font-semibold">Last 30 days</span>
              <span className="text-xs text-brand font-semibold underline decoration-2 underline-offset-4">+18.7% growth</span>
            </div>
          </div>
          
          {/* Area Chart for Page Views */}
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} stroke="hsl(var(--border-subtle))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--content-muted))', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--content-muted))', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--surface-overlay))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--content-primary))'
                  }}
                  formatter={(value: unknown) => {
                    const num = typeof value === 'number' ? value : 0;
                    return [num.toLocaleString(), ''];
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="pageviews" 
                  stroke={chartColors.primary} 
                  fillOpacity={1} 
                  fill="url(#colorPageviews)" 
                  strokeWidth={2}
                  name="Page Views"
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke={chartColors.secondary} 
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                  strokeWidth={2}
                  name="Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
            <div>
              <p className="text-sm text-content-muted">Bounce Rate</p>
              <p className="text-2xl font-bold text-content-primary">{bounceRate}</p>
            </div>
            <div>
              <p className="text-sm text-content-muted">Top Country</p>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-content-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-2xl font-bold text-content-primary">{topCountry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-gradient-to-br from-surface to-surface-muted rounded-3xl border border-border p-8 md:p-10 shadow-2xl">
          <h3 className="text-xl font-bold text-content-primary mb-8">Traffic Sources</h3>
          
          {/* Pie Chart for Traffic Sources */}
          <div className="h-48 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  labelLine={false}
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: unknown) => {
                    const num = typeof value === 'number' ? value : 0;
                    return [`${num}%`, 'Percentage'];
                  }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--surface-overlay))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--content-primary))'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', color: 'hsl(var(--content-muted))' }}
                  formatter={(value) => <span style={{ color: 'hsl(var(--content-secondary))' }}>{value}</span>}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-10 pt-6 border-t border-border">
            <h4 className="text-sm font-bold text-content-muted uppercase tracking-widest mb-4">Top Pages</h4>
            <div className="space-y-3">
              {topPages.map((page, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-surface-muted rounded-xl hover:bg-accent transition-all">
                  <div>
                    <p className="text-sm font-semibold text-content-secondary">{page.page}</p>
                    <p className="text-xs text-content-muted">{page.views.toLocaleString()} views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-content-primary">{page.bounce} bounce</p>
                    <p className="text-xs text-content-muted">{page.avgTime} avg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}