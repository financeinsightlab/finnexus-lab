'use client';

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  calculateSMA,
  calculateEMA,
  calculateRSI,
  calculateBollingerBands,
  generateHistoricalCandles,
} from '@/lib/markets-data';

export interface CandlePoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface AdvancedChartProps {
  symbol: string;
  name: string;
  basePrice: number;
  currency?: string;
  initialCandles?: CandlePoint[];
  source?: string;
}

type Timeframe = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y' | 'MAX';
type ChartType = 'line' | 'area' | 'candle';

export default function AdvancedChart({
  symbol,
  name,
  basePrice,
  currency = '₹',
  initialCandles,
  source = 'NSE / Primary Exchange',
}: AdvancedChartProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>('3M');
  const [chartType, setChartType] = useState<ChartType>('area');
  const [showSMA, setShowSMA] = useState(true);
  const [showEMA, setShowEMA] = useState(false);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showRSI, setShowRSI] = useState(false);

  // Generate or use candles based on timeframe
  const candles = useMemo(() => {
    const daysMap: Record<Timeframe, number> = {
      '1D': 1,
      '1W': 7,
      '1M': 30,
      '3M': 90,
      '6M': 180,
      '1Y': 365,
      '5Y': 1250,
      MAX: 2000,
    };
    const days = daysMap[timeframe];
    if (initialCandles && initialCandles.length > 0 && timeframe === '3M') {
      return initialCandles;
    }
    return generateHistoricalCandles(basePrice, days);
  }, [basePrice, timeframe, initialCandles]);

  // Compute Technical Indicators
  const closePrices = useMemo(() => candles.map((c) => c.close), [candles]);
  const sma20 = useMemo(() => calculateSMA(closePrices, 20), [closePrices]);
  const ema50 = useMemo(() => calculateEMA(closePrices, 50), [closePrices]);
  const rsi14 = useMemo(() => calculateRSI(closePrices, 14), [closePrices]);
  const bollinger = useMemo(() => calculateBollingerBands(closePrices, 20, 2), [closePrices]);

  // Combined chart dataset
  const chartData = useMemo(() => {
    return candles.map((candle, idx) => {
      const isUp = candle.close >= candle.open;
      return {
        date: candle.date,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        volume: candle.volume,
        isUp,
        // High-Low candle range representation
        candleBottom: Math.min(candle.open, candle.close),
        candleBody: Math.abs(candle.close - candle.open) || 0.1,
        sma20: sma20[idx] ?? undefined,
        ema50: ema50[idx] ?? undefined,
        bbUpper: bollinger.upper[idx] ?? undefined,
        bbMiddle: bollinger.middle[idx] ?? undefined,
        bbLower: bollinger.lower[idx] ?? undefined,
        rsi: rsi14[idx] ?? undefined,
      };
    });
  }, [candles, sma20, ema50, bollinger, rsi14]);

  const minPrice = useMemo(() => {
    const lows = candles.map((c) => c.low);
    return Math.floor(Math.min(...lows) * 0.98);
  }, [candles]);

  const maxPrice = useMemo(() => {
    const highs = candles.map((c) => c.high);
    return Math.ceil(Math.max(...highs) * 1.02);
  }, [candles]);

  const currentQuote = candles[candles.length - 1];
  const firstQuote = candles[0];
  const totalChange = currentQuote && firstQuote ? currentQuote.close - firstQuote.open : 0;
  const totalChangePct = firstQuote && firstQuote.open !== 0 ? (totalChange / firstQuote.open) * 100 : 0;
  const isPositive = totalChange >= 0;

  return (
    <div className="bg-[#0e1626] border border-neutral-800 rounded-lg p-4 font-sans text-neutral-200 shadow-xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-white">{name}</h2>
            <span className="font-mono text-xs px-2 py-0.5 bg-neutral-800/80 text-cyan-400 rounded border border-neutral-700">
              {symbol}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-white">
              {currency}
              {currentQuote?.close.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`text-sm font-semibold font-mono flex items-center gap-1 ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <span>{isPositive ? '▲' : '▼'}</span>
              <span>{Math.abs(totalChange).toFixed(2)}</span>
              <span>({isPositive ? '+' : ''}{totalChangePct.toFixed(2)}%)</span>
            </span>
            <span className="text-xs text-neutral-400 ml-2">Period: {timeframe}</span>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe selector */}
          <div className="flex bg-neutral-900 border border-neutral-800 rounded p-0.5 text-xs font-mono">
            {(['1D', '1W', '1M', '3M', '6M', '1Y', '5Y', 'MAX'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 rounded transition-colors ${
                  timeframe === tf
                    ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Selector */}
          <div className="flex bg-neutral-900 border border-neutral-800 rounded p-0.5 text-xs">
            <button
              onClick={() => setChartType('area')}
              className={`px-2 py-1 rounded ${
                chartType === 'area' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2 py-1 rounded ${
                chartType === 'line' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('candle')}
              className={`px-2 py-1 rounded ${
                chartType === 'candle' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              OHLC / Bar
            </button>
          </div>
        </div>
      </div>

      {/* Indicator Badges / Toggles */}
      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono">
        <span className="text-neutral-400 text-[11px] uppercase tracking-wider mr-1">Overlays:</span>
        <button
          onClick={() => setShowSMA(!showSMA)}
          className={`px-2 py-0.5 rounded border transition-colors flex items-center gap-1.5 ${
            showSMA
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 font-medium'
              : 'border-neutral-800 text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <span className="w-2 h-0.5 bg-amber-400"></span>
          SMA 20
        </button>
        <button
          onClick={() => setShowEMA(!showEMA)}
          className={`px-2 py-0.5 rounded border transition-colors flex items-center gap-1.5 ${
            showEMA
              ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400 font-medium'
              : 'border-neutral-800 text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <span className="w-2 h-0.5 bg-indigo-400"></span>
          EMA 50
        </button>
        <button
          onClick={() => setShowBollinger(!showBollinger)}
          className={`px-2 py-0.5 rounded border transition-colors flex items-center gap-1.5 ${
            showBollinger
              ? 'bg-purple-500/10 border-purple-500/40 text-purple-400 font-medium'
              : 'border-neutral-800 text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <span className="w-2 h-0.5 bg-purple-400"></span>
          Bollinger (20, 2)
        </button>
        <button
          onClick={() => setShowRSI(!showRSI)}
          className={`px-2 py-0.5 rounded border transition-colors flex items-center gap-1.5 ${
            showRSI
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-medium'
              : 'border-neutral-800 text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <span className="w-2 h-0.5 bg-emerald-400"></span>
          RSI (14)
        </button>
      </div>

      {/* Main Chart Canvas */}
      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0.35} />
                <stop offset="95%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
              minTickGap={40}
            />
            <YAxis
              yAxisId="price"
              domain={[minPrice, maxPrice]}
              orientation="right"
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(v) => `${currency}${v.toLocaleString()}`}
            />
            <YAxis
              yAxisId="volume"
              orientation="left"
              domain={[0, (max: number) => max * 5]}
              hide={true}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#0b101b] border border-neutral-700/80 p-2.5 rounded shadow-2xl text-xs font-mono space-y-1">
                      <div className="text-neutral-400 border-b border-neutral-800 pb-1 mb-1 font-semibold">
                        {data.date}
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-neutral-200">
                        <div>Open: <span className="text-white font-bold">{currency}{data.open.toFixed(2)}</span></div>
                        <div>High: <span className="text-emerald-400 font-bold">{currency}{data.high.toFixed(2)}</span></div>
                        <div>Low: <span className="text-rose-400 font-bold">{currency}{data.low.toFixed(2)}</span></div>
                        <div>Close: <span className="text-cyan-400 font-bold">{currency}{data.close.toFixed(2)}</span></div>
                        <div className="col-span-2 text-neutral-400">
                          Vol: <span className="text-white">{data.volume.toLocaleString()}</span>
                        </div>
                      </div>
                      {(showSMA || showEMA || showBollinger) && (
                        <div className="border-t border-neutral-800 pt-1 mt-1 text-[11px] space-y-0.5">
                          {showSMA && data.sma20 && (
                            <div className="text-amber-400">SMA 20: {currency}{data.sma20.toFixed(2)}</div>
                          )}
                          {showEMA && data.ema50 && (
                            <div className="text-indigo-400">EMA 50: {currency}{data.ema50.toFixed(2)}</div>
                          )}
                          {showBollinger && data.bbUpper && (
                            <div className="text-purple-400">
                              BB: [{currency}{data.bbLower?.toFixed(2)} - {currency}{data.bbUpper?.toFixed(2)}]
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Volume bars on left axis */}
            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill="#374151"
              opacity={0.3}
            />

            {/* Main Price Render */}
            {chartType === 'area' && (
              <Area
                yAxisId="price"
                type="monotone"
                dataKey="close"
                stroke={isPositive ? '#10b981' : '#f43f5e'}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#chartGradient)"
              />
            )}

            {chartType === 'line' && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="close"
                stroke={isPositive ? '#10b981' : '#f43f5e'}
                strokeWidth={2}
                dot={false}
              />
            )}

            {chartType === 'candle' && (
              <Bar
                yAxisId="price"
                dataKey="candleBody"
                stackId="a"
                fill={isPositive ? '#10b981' : '#f43f5e'}
              />
            )}

            {/* Overlay indicators */}
            {showSMA && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="sma20"
                stroke="#fbbf24"
                strokeWidth={1.5}
                dot={false}
              />
            )}
            {showEMA && (
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="ema50"
                stroke="#818cf8"
                strokeWidth={1.5}
                dot={false}
              />
            )}
            {showBollinger && (
              <>
                <Line
                  yAxisId="price"
                  type="monotone"
                  dataKey="bbUpper"
                  stroke="#c084fc"
                  strokeDasharray="2 2"
                  strokeWidth={1}
                  dot={false}
                />
                <Line
                  yAxisId="price"
                  type="monotone"
                  dataKey="bbLower"
                  stroke="#c084fc"
                  strokeDasharray="2 2"
                  strokeWidth={1}
                  dot={false}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* RSI Sub-Chart if enabled */}
      {showRSI && (
        <div className="mt-3 pt-3 border-t border-neutral-800">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
            <span className="font-semibold text-emerald-400">RSI (14) Relative Strength Index</span>
            <span>Overbought: 70 | Oversold: 30</span>
          </div>
          <div className="h-[90px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#1f2937" vertical={false} />
                <YAxis domain={[0, 100]} orientation="right" stroke="#6b7280" fontSize={10} ticks={[30, 50, 70]} />
                <ReferenceLine y={70} stroke="#f43f5e" strokeDasharray="3 3" opacity={0.6} />
                <ReferenceLine y={50} stroke="#4b5563" strokeDasharray="2 2" opacity={0.4} />
                <ReferenceLine y={30} stroke="#10b981" strokeDasharray="3 3" opacity={0.6} />
                <Line type="monotone" dataKey="rsi" stroke="#34d399" strokeWidth={1.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Provenance footer */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-neutral-500 font-mono mt-3 pt-2 border-t border-neutral-800/80">
        <div>Feed: <span className="text-neutral-400">{source}</span> (EOD & Intra-day Delayed)</div>
        <div>Calculations: <span className="text-neutral-400">KunwarAnalytics Quantitative Engine</span></div>
      </div>
    </div>
  );
}

