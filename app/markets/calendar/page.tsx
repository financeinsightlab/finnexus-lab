import React from 'react';
import type { Metadata } from 'next';
import CalendarClient from './CalendarClient';

export const metadata: Metadata = {
  title: 'Economic Calendar — Global Macro Announcements & Central Banks | KunwarAnalytics',
  description:
    'Institutional economic release schedule tracking RBI policy rate decisions, US Fed FOMC meetings, CPI inflation prints, GDP figures, and employment reports.',
};

export default function CalendarPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>TERMINAL</span>
            <span>/</span>
            <span className="text-cyan-400">ECONOMIC CALENDAR</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Global Economic Calendar & Central Bank Schedules
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded">
            Scheduled Releases
          </span>
          <span className="text-cyan-400 font-semibold">• IST SYNCHRONIZED</span>
        </div>
      </div>

      <CalendarClient />
    </div>
  );
}

