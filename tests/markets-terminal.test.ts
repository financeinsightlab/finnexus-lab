import { describe, it, expect } from 'vitest';
import {
  calculateSMA,
  calculateEMA,
  calculateRSI,
  calculateBollingerBands,
  generateHistoricalCandles,
  TOP_TICKER_ITEMS,
  STOCK_UNIVERSE,
  NIFTY_OPTIONS_CHAIN,
  INDIAN_SECTORAL_INDICES,
  FII_DII_FLOWS,
  ECONOMIC_CALENDAR_EVENTS,
} from '../lib/markets-data';

describe('Markets Terminal — Quantitative Calculations & Indicators', () => {
  it('calculates SMA correctly with null padding for initial periods', () => {
    const data = [10, 20, 30, 40, 50];
    const sma3 = calculateSMA(data, 3);

    expect(sma3[0]).toBeNull();
    expect(sma3[1]).toBeNull();
    expect(sma3[2]).toBe(20); // (10+20+30)/3 = 20
    expect(sma3[3]).toBe(30); // (20+30+40)/3 = 30
    expect(sma3[4]).toBe(40); // (30+40+50)/3 = 40
  });

  it('calculates EMA with initial SMA seed and exponential weighting', () => {
    const data = [10, 20, 30, 40, 50, 60];
    const ema3 = calculateEMA(data, 3);

    expect(ema3[0]).toBeNull();
    expect(ema3[1]).toBeNull();
    expect(ema3[2]).toBe(20); // Initial SMA seed
    // multiplier = 2 / (3 + 1) = 0.5
    // ema[3] = (40 - 20) * 0.5 + 20 = 30
    expect(ema3[3]).toBe(30);
    // ema[4] = (50 - 30) * 0.5 + 30 = 40
    expect(ema3[4]).toBe(40);
  });

  it('calculates RSI bounded within [0, 100]', () => {
    // Generate trending prices
    const prices = [100, 102, 104, 103, 105, 107, 106, 108, 110, 112, 111, 114, 116, 118, 120, 122];
    const rsi14 = calculateRSI(prices, 14);

    expect(rsi14.length).toBe(prices.length);
    for (let i = 0; i < 14; i++) {
      expect(rsi14[i]).toBeNull();
    }
    const finalRsi = rsi14[15];
    expect(finalRsi).not.toBeNull();
    expect(finalRsi!).toBeGreaterThan(0);
    expect(finalRsi!).toBeLessThanOrEqual(100);
    // Because prices mostly climbed, RSI should be elevated (> 60)
    expect(finalRsi!).toBeGreaterThan(60);
  });

  it('calculates Bollinger Bands with correct upper, middle, and lower bands', () => {
    const prices = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const bb = calculateBollingerBands(prices, 5, 2);

    expect(bb.middle.length).toBe(prices.length);
    expect(bb.upper.length).toBe(prices.length);
    expect(bb.lower.length).toBe(prices.length);

    // After period 5, middle = SMA(5), and upper >= middle >= lower
    for (let i = 4; i < prices.length; i++) {
      expect(bb.middle[i]).not.toBeNull();
      expect(bb.upper[i]).not.toBeNull();
      expect(bb.lower[i]).not.toBeNull();
      expect(bb.upper[i]!).toBeGreaterThanOrEqual(bb.middle[i]!);
      expect(bb.middle[i]!).toBeGreaterThanOrEqual(bb.lower[i]!);
    }
  });

  it('generates consistent candle bars with high >= open/close and low <= open/close', () => {
    const candles = generateHistoricalCandles(24000, 30);
    expect(candles.length).toBeGreaterThan(15);
    expect(candles.length).toBeLessThanOrEqual(31);

    for (const c of candles) {
      expect(c.high).toBeGreaterThanOrEqual(Math.max(c.open, c.close));
      expect(c.low).toBeLessThanOrEqual(Math.min(c.open, c.close));
      expect(c.volume).toBeGreaterThan(0);
      expect(typeof c.date).toBe('string');
    }
  });
});

describe('Markets Terminal — Reference Feeds & Universe Data Integrity', () => {
  it('ensures all top ticker items have valid prices and attributes', () => {
    expect(TOP_TICKER_ITEMS.length).toBeGreaterThan(10);
    for (const item of TOP_TICKER_ITEMS) {
      expect(item.symbol).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.price).toBeGreaterThan(0);
      expect(typeof item.change).toBe('number');
      expect(typeof item.changePercent).toBe('number');
      expect(['India', 'US', 'Europe', 'Asia', 'Global']).toContain(item.region);
      expect(item.marketStatus).toBeTruthy();
      expect(item.timezone).toBeTruthy();
    }
  });

  it('ensures stock screener universe has required institutional fundamental fields', () => {
    expect(STOCK_UNIVERSE.length).toBeGreaterThanOrEqual(10);
    for (const stock of STOCK_UNIVERSE) {
      expect(stock.symbol).toBeTruthy();
      expect(stock.name).toBeTruthy();
      expect(stock.sector).toBeTruthy();
      expect(stock.marketCapCr).toBeGreaterThan(0);
      expect(stock.price).toBeGreaterThan(0);
      expect(stock.peRatio).toBeGreaterThan(0);
      expect(stock.financials.revenue.length).toBeGreaterThanOrEqual(3);
      expect(stock.financials.pat.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('validates NIFTY options chain structure, PCR, and Max Pain', () => {
    expect(NIFTY_OPTIONS_CHAIN.spotPrice).toBeGreaterThan(20000);
    expect(NIFTY_OPTIONS_CHAIN.pcr).toBeGreaterThan(0.5);
    expect(NIFTY_OPTIONS_CHAIN.pcr).toBeLessThan(3.0);
    expect(NIFTY_OPTIONS_CHAIN.strikes.length).toBeGreaterThanOrEqual(5);

    // Max pain should match one of the strike prices
    const strikePrices = NIFTY_OPTIONS_CHAIN.strikes.map((s) => s.strikePrice);
    expect(strikePrices).toContain(NIFTY_OPTIONS_CHAIN.maxPain);
  });

  it('ensures FII / DII flows data is formatted correctly', () => {
    expect(FII_DII_FLOWS.length).toBeGreaterThan(0);
    for (const flow of FII_DII_FLOWS) {
      expect(flow.date).toMatch(/^\d{1,2}-[A-Za-z]{3}-\d{4}$/);
      expect(typeof flow.fiiNet).toBe('number');
      expect(typeof flow.diiNet).toBe('number');
    }
  });

  it('ensures Indian sectoral indices are populated with valid values and valuations', () => {
    expect(INDIAN_SECTORAL_INDICES.length).toBeGreaterThan(5);
    for (const sec of INDIAN_SECTORAL_INDICES) {
      expect(sec.symbol).toBeTruthy();
      expect(sec.value).toBeGreaterThan(0);
      expect(sec.peRatio).toBeGreaterThan(0);
    }
  });

  it('ensures Economic calendar events have proper schemas', () => {
    expect(ECONOMIC_CALENDAR_EVENTS.length).toBeGreaterThan(0);
    for (const evt of ECONOMIC_CALENDAR_EVENTS) {
      expect(evt.id).toBeTruthy();
      expect(evt.event).toBeTruthy();
      expect(['IN', 'US', 'EU', 'UK', 'JP', 'CN']).toContain(evt.country);
      expect(['HIGH', 'MEDIUM', 'LOW']).toContain(evt.importance);
    }
  });
});

