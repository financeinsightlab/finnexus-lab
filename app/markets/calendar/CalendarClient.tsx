'use client';

import React, { useState, useMemo } from 'react';
import { ECONOMIC_CALENDAR_EVENTS, type EconomicEvent } from '@/lib/markets-data';

export default function CalendarClient() {
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedImportance, setSelectedImportance] = useState<string>('ALL');

  const filteredEvents = useMemo(() => {
    return ECONOMIC_CALENDAR_EVENTS.filter((e) => {
      if (selectedCountry !== 'ALL' && e.country !== selectedCountry) return false;
      if (selectedImportance !== 'ALL' && e.importance !== selectedImportance) return false;
      return true;
    });
  }, [selectedCountry, selectedImportance]);

  return (
    <div className="space-y-4 font-sans text-neutral-200">
      {/* Filters Bar */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-3.5 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Country Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-neutral-400">Country:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Jurisdictions</option>
              <option value="IN">India (IN)</option>
              <option value="US">United States (US)</option>
              <option value="EU">Eurozone (EU)</option>
              <option value="UK">United Kingdom (UK)</option>
              <option value="JP">Japan (JP)</option>
              <option value="CN">China (CN)</option>
            </select>
          </div>

          {/* Importance Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-neutral-400">Impact:</span>
            <select
              value={selectedImportance}
              onChange={(e) => setSelectedImportance(e.target.value)}
              className="bg-[#080d1a] border border-neutral-800 rounded px-2.5 py-1 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Impact Levels</option>
              <option value="HIGH">High Impact Only (★★★)</option>
              <option value="MEDIUM">Medium Impact (★★☆)</option>
              <option value="LOW">Low Impact (★☆☆)</option>
            </select>
          </div>
        </div>

        <div className="text-xs font-mono text-neutral-400">
          Showing <strong className="text-white">{filteredEvents.length}</strong> releases
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[#080d1a] border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                <th className="py-2.5 px-3">Date / Time (IST)</th>
                <th className="py-2.5 px-3">Country</th>
                <th className="py-2.5 px-3">Impact</th>
                <th className="py-2.5 px-3">Economic Event</th>
                <th className="py-2.5 px-3 text-right">Actual</th>
                <th className="py-2.5 px-3 text-right">Forecast</th>
                <th className="py-2.5 px-3 text-right">Previous</th>
                <th className="py-2.5 px-3 text-right">Source Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {filteredEvents.map((evt: EconomicEvent) => {
                const isHigh = evt.importance === 'HIGH';
                const isMed = evt.importance === 'MEDIUM';

                return (
                  <tr key={evt.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-neutral-300 font-semibold whitespace-nowrap">
                      {evt.date} {evt.time}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-white">
                        {evt.country}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                          isHigh
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : isMed
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                        }`}
                      >
                        {evt.importance}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans font-medium text-white max-w-[280px]">
                      {evt.event}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                      {evt.actual ?? '—'}
                    </td>
                    <td className="py-2.5 px-3 text-right text-neutral-300">{evt.forecast}</td>
                    <td className="py-2.5 px-3 text-right text-neutral-400">{evt.previous}</td>
                    <td className="py-2.5 px-3 text-right text-neutral-500">{evt.source}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

