'use client';

import React, { useMemo } from 'react';
import { NIFTY_OPTIONS_CHAIN, type OptionStrike } from '@/lib/markets-data';

export default function OptionsChainView() {
  const { spotPrice, expiryDate, pcr, maxPain, totalCallOI, totalPutOI, strikes } = NIFTY_OPTIONS_CHAIN;

  const maxOI = useMemo(() => {
    let max = 1;
    strikes.forEach((s) => {
      if (s.callOI > max) max = s.callOI;
      if (s.putOI > max) max = s.putOI;
    });
    return max;
  }, [strikes]);

  return (
    <div className="space-y-4 font-sans text-neutral-200">
      {/* Options Chain Summary Card */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="font-bold text-sm text-white tracking-wide uppercase">
              NIFTY 50 Derivatives & Options Matrix
            </h3>
            <span className="text-xs px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded font-mono">
              Expiry: {expiryDate}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              Spot Price: <span className="font-bold text-white">₹{spotPrice.toLocaleString()}</span>
            </div>
            <div>
              Max Pain: <span className="font-bold text-amber-400">₹{maxPain.toLocaleString()}</span>
            </div>
            <div>
              PCR (OI):{' '}
              <span className={`font-bold ${pcr > 1.0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {pcr.toFixed(2)} ({pcr > 1.0 ? 'Bullish/Supportive' : 'Bearish/Resistance'})
              </span>
            </div>
          </div>
        </div>

        {/* OI Ratio Bar */}
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-[11px] text-neutral-400">
            <span>Total Call OI: <strong className="text-rose-400">{(totalCallOI / 100000).toFixed(2)} Lakhs</strong></span>
            <span>Total Put OI: <strong className="text-emerald-400">{(totalPutOI / 100000).toFixed(2)} Lakhs</strong></span>
          </div>
          <div className="w-full h-2 rounded bg-neutral-900 overflow-hidden flex">
            <div
              className="bg-rose-500/80 h-full"
              style={{ width: `${(totalCallOI / (totalCallOI + totalPutOI)) * 100}%` }}
              title="Call OI"
            />
            <div
              className="bg-emerald-500/80 h-full"
              style={{ width: `${(totalPutOI / (totalCallOI + totalPutOI)) * 100}%` }}
              title="Put OI"
            />
          </div>
        </div>
      </div>

      {/* Options Ladder Table */}
      <div className="bg-[#0e1626] border border-neutral-800 rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-[#070b14] border-b border-neutral-800 text-[11px] font-mono uppercase tracking-wider">
                <th colSpan={4} className="py-2 px-3 text-rose-400 bg-rose-950/20 border-r border-neutral-800">
                  CALL OPTIONS (CE)
                </th>
                <th className="py-2 px-4 text-cyan-300 bg-cyan-950/30">STRIKE</th>
                <th colSpan={4} className="py-2 px-3 text-emerald-400 bg-emerald-950/20 border-l border-neutral-800">
                  PUT OPTIONS (PE)
                </th>
              </tr>
              <tr className="bg-[#0a0f1d] border-b border-neutral-800 text-[10px] text-neutral-400 font-mono">
                {/* Calls */}
                <th className="py-2 px-3 text-right">OI (Contracts)</th>
                <th className="py-2 px-3 text-right">Chg in OI</th>
                <th className="py-2 px-2 text-right">IV (%)</th>
                <th className="py-2 px-3 text-right border-r border-neutral-800">LTP (₹)</th>
                {/* Strike */}
                <th className="py-2 px-4 text-center text-white bg-neutral-900/60 font-bold">Strike Price</th>
                {/* Puts */}
                <th className="py-2 px-3 text-left border-l border-neutral-800">LTP (₹)</th>
                <th className="py-2 px-2 text-left">IV (%)</th>
                <th className="py-2 px-3 text-left">Chg in OI</th>
                <th className="py-2 px-3 text-left">OI (Contracts)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono text-xs">
              {strikes.map((s: OptionStrike) => {
                const isATM = Math.abs(s.strikePrice - spotPrice) < 50;
                const isMaxPain = s.strikePrice === maxPain;
                const isITMCall = s.strikePrice < spotPrice;
                const isITMPut = s.strikePrice > spotPrice;

                const callWidth = `${(s.callOI / maxOI) * 100}%`;
                const putWidth = `${(s.putOI / maxOI) * 100}%`;

                return (
                  <tr
                    key={s.strikePrice}
                    className={`transition-colors hover:bg-neutral-800/40 ${
                      isATM ? 'bg-cyan-950/30 font-semibold' : ''
                    }`}
                  >
                    {/* Call OI with relative bar background */}
                    <td className={`py-2 px-3 text-right relative ${isITMCall ? 'bg-amber-950/10' : ''}`}>
                      <div
                        className="absolute inset-y-1 right-0 bg-rose-500/15 rounded-l"
                        style={{ width: callWidth }}
                      />
                      <span className="relative z-10 text-neutral-200">
                        {s.callOI.toLocaleString()}
                      </span>
                    </td>
                    <td
                      className={`py-2 px-3 text-right ${
                        s.callChangeOI >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {s.callChangeOI >= 0 ? '+' : ''}
                      {s.callChangeOI.toLocaleString()}
                    </td>
                    <td className="py-2 px-2 text-right text-neutral-400">
                      {s.callIV.toFixed(1)}%
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-white border-r border-neutral-800">
                      {s.callLtp.toFixed(2)}
                    </td>

                    {/* Strike */}
                    <td
                      className={`py-2 px-4 text-center font-bold font-mono ${
                        isATM
                          ? 'bg-cyan-500 text-black shadow'
                          : isMaxPain
                          ? 'bg-amber-900/60 text-amber-200 border-x border-amber-600'
                          : 'bg-neutral-900/90 text-white'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>{s.strikePrice}</span>
                        {isMaxPain && <span className="text-[9px] bg-amber-400 text-black px-1 rounded">PAIN</span>}
                        {isATM && <span className="text-[9px] bg-black text-cyan-300 px-1 rounded">ATM</span>}
                      </div>
                    </td>

                    {/* Put */}
                    <td className="py-2 px-3 text-left font-bold text-white border-l border-neutral-800">
                      {s.putLtp.toFixed(2)}
                    </td>
                    <td className="py-2 px-2 text-left text-neutral-400">
                      {s.putIV.toFixed(1)}%
                    </td>
                    <td
                      className={`py-2 px-3 text-left ${
                        s.putChangeOI >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {s.putChangeOI >= 0 ? '+' : ''}
                      {s.putChangeOI.toLocaleString()}
                    </td>
                    <td className={`py-2 px-3 text-left relative ${isITMPut ? 'bg-amber-950/10' : ''}`}>
                      <div
                        className="absolute inset-y-1 left-0 bg-emerald-500/15 rounded-r"
                        style={{ width: putWidth }}
                      />
                      <span className="relative z-10 text-neutral-200">
                        {s.putOI.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-[#0a0f1a] border-t border-neutral-800 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div>Source: NSE India Delayed Options Matrix (15-min Delay)</div>
          <div>Yellow shaded cells indicate In-The-Money (ITM) options</div>
        </div>
      </div>
    </div>
  );
}

