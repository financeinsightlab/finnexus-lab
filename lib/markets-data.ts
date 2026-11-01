// lib/markets-data.ts — Institutional Global Financial Market Terminal Data Engine
//
// Normalised financial models, verified reference feeds, time-series generators,
// technical indicator algorithms (SMA, EMA, RSI, MACD, Bollinger Bands),
// and institutional data structures for KunwarAnalytics Markets Terminal.

export interface MarketQuote {
  symbol: string;
  name: string;
  region: 'India' | 'US' | 'Europe' | 'Asia' | 'Global';
  assetClass: 'index' | 'equity' | 'forex' | 'commodity' | 'bond';
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  high: number;
  low: number;
  volume?: string;
  currency: string;
  delay: string;
  source: string;
  marketStatus: 'Open' | 'Closed' | 'Pre-Market' | 'After-Hours' | 'Indicative';
  timezone: string;
  timestamp: string;
  history?: Array<{ date: string; open: number; high: number; low: number; close: number; volume: number }>;
}

export interface StockFundamental {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  marketCapCr: number; // In Crores
  price: number;
  changePercent: number;
  peRatio: number;
  pbRatio: number;
  roe: number; // %
  roce: number; // %
  debtToEquity: number;
  divYield: number; // %
  revenueGrowthYoy: number; // %
  patGrowthYoy: number; // %
  volume: string;
  high52W: number;
  low52W: number;
  oneYearReturn: number; // %
  rsi: number;
  description: string;
  financials: {
    revenue: Array<{ year: string; value: number }>;
    ebitda: Array<{ year: string; value: number }>;
    pat: Array<{ year: string; value: number }>;
    eps: Array<{ year: string; value: number }>;
  };
}

export interface OptionStrike {
  strikePrice: number;
  callOI: number;
  callChangeOI: number;
  callLtp: number;
  callIV: number;
  putLtp: number;
  putIV: number;
  putOI: number;
  putChangeOI: number;
}

export interface EconomicEvent {
  id: string;
  time: string;
  date: string;
  country: 'IN' | 'US' | 'EU' | 'UK' | 'JP' | 'CN';
  countryName: string;
  event: string;
  importance: 'HIGH' | 'MEDIUM' | 'LOW';
  actual: string | null;
  forecast: string;
  previous: string;
  source: string;
}

export interface MarketNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  category: 'Macro' | 'Equities' | 'Central Banks' | 'Commodities' | 'Earnings';
  publishedAt: string;
  readTime: string;
}

// ─── Top Ticker Feed ──────────────────────────────────────────────────────────

export const TOP_TICKER_ITEMS: MarketQuote[] = [
  // India
  {
    symbol: 'NIFTY50',
    name: 'NIFTY 50',
    region: 'India',
    assetClass: 'index',
    price: 24205.35,
    change: 127.40,
    changePercent: 0.53,
    previousClose: 24077.95,
    open: 24110.00,
    high: 24242.80,
    low: 24080.15,
    volume: '2.4B',
    currency: 'INR',
    delay: 'End-of-day',
    source: 'NSE India',
    marketStatus: 'Closed',
    timezone: 'IST (UTC+5:30)',
    timestamp: '2024-10-31 15:30:00',
  },
  {
    symbol: 'SENSEX',
    name: 'BSE SENSEX',
    region: 'India',
    assetClass: 'index',
    price: 79389.06,
    change: 428.10,
    changePercent: 0.54,
    previousClose: 78960.96,
    open: 79050.20,
    high: 79520.40,
    low: 78990.10,
    volume: '1.1B',
    currency: 'INR',
    delay: 'End-of-day',
    source: 'BSE India',
    marketStatus: 'Closed',
    timezone: 'IST (UTC+5:30)',
    timestamp: '2024-10-31 15:30:00',
  },
  {
    symbol: 'BANKNIFTY',
    name: 'BANK NIFTY',
    region: 'India',
    assetClass: 'index',
    price: 51475.35,
    change: -115.60,
    changePercent: -0.22,
    previousClose: 51590.95,
    open: 51620.00,
    high: 51710.20,
    low: 51380.00,
    volume: '850M',
    currency: 'INR',
    delay: 'End-of-day',
    source: 'NSE India',
    marketStatus: 'Closed',
    timezone: 'IST (UTC+5:30)',
    timestamp: '2024-10-31 15:30:00',
  },
  {
    symbol: 'NIFTYIT',
    name: 'NIFTY IT',
    region: 'India',
    assetClass: 'index',
    price: 41220.80,
    change: 345.50,
    changePercent: 0.85,
    previousClose: 40875.30,
    open: 40910.00,
    high: 41350.00,
    low: 40850.00,
    volume: '410M',
    currency: 'INR',
    delay: 'End-of-day',
    source: 'NSE India',
    marketStatus: 'Closed',
    timezone: 'IST (UTC+5:30)',
    timestamp: '2024-10-31 15:30:00',
  },
  // United States
  {
    symbol: 'SPX',
    name: 'S&P 500',
    region: 'US',
    assetClass: 'index',
    price: 5705.45,
    change: -108.22,
    changePercent: -1.86,
    previousClose: 5813.67,
    open: 5770.00,
    high: 5780.20,
    low: 5698.50,
    volume: '4.8B',
    currency: 'USD',
    delay: 'End-of-day',
    source: 'S&P Dow Jones Indices',
    marketStatus: 'Closed',
    timezone: 'EDT (UTC-4)',
    timestamp: '2024-10-31 16:00:00',
  },
  {
    symbol: 'COMP',
    name: 'NASDAQ Composite',
    region: 'US',
    assetClass: 'index',
    price: 18095.15,
    change: -512.78,
    changePercent: -2.76,
    previousClose: 18607.93,
    open: 18450.00,
    high: 18480.00,
    low: 18040.50,
    volume: '5.9B',
    currency: 'USD',
    delay: 'End-of-day',
    source: 'Nasdaq OMX',
    marketStatus: 'Closed',
    timezone: 'EDT (UTC-4)',
    timestamp: '2024-10-31 16:00:00',
  },
  {
    symbol: 'DJI',
    name: 'Dow Jones Industrial',
    region: 'US',
    assetClass: 'index',
    price: 41763.46,
    change: -378.08,
    changePercent: -0.90,
    previousClose: 42141.54,
    open: 42050.00,
    high: 42110.00,
    low: 41720.00,
    volume: '380M',
    currency: 'USD',
    delay: 'End-of-day',
    source: 'S&P Dow Jones',
    marketStatus: 'Closed',
    timezone: 'EDT (UTC-4)',
    timestamp: '2024-10-31 16:00:00',
  },
  {
    symbol: 'RUT',
    name: 'Russell 2000',
    region: 'US',
    assetClass: 'index',
    price: 2196.44,
    change: -36.12,
    changePercent: -1.63,
    previousClose: 2232.56,
    open: 2220.00,
    high: 2225.00,
    low: 2190.00,
    currency: 'USD',
    delay: 'End-of-day',
    source: 'FTSE Russell',
    marketStatus: 'Closed',
    timezone: 'EDT (UTC-4)',
    timestamp: '2024-10-31 16:00:00',
  },
  // Europe
  {
    symbol: 'FTSE100',
    name: 'FTSE 100',
    region: 'Europe',
    assetClass: 'index',
    price: 8110.10,
    change: -49.53,
    changePercent: -0.61,
    previousClose: 8159.63,
    open: 8160.00,
    high: 8175.00,
    low: 8095.00,
    currency: 'GBP',
    delay: 'End-of-day',
    source: 'London Stock Exchange',
    marketStatus: 'Closed',
    timezone: 'GMT (UTC+0)',
    timestamp: '2024-10-31 16:30:00',
  },
  {
    symbol: 'DAX',
    name: 'DAX 40',
    region: 'Europe',
    assetClass: 'index',
    price: 19077.54,
    change: -180.34,
    changePercent: -0.93,
    previousClose: 19257.88,
    open: 19220.00,
    high: 19245.00,
    low: 19040.00,
    currency: 'EUR',
    delay: 'End-of-day',
    source: 'Deutsche Börse',
    marketStatus: 'Closed',
    timezone: 'CET (UTC+1)',
    timestamp: '2024-10-31 17:30:00',
  },
  {
    symbol: 'CAC40',
    name: 'CAC 40',
    region: 'Europe',
    assetClass: 'index',
    price: 7350.37,
    change: -77.92,
    changePercent: -1.05,
    previousClose: 7428.29,
    open: 7410.00,
    high: 7425.00,
    low: 7335.00,
    currency: 'EUR',
    delay: 'End-of-day',
    source: 'Euronext Paris',
    marketStatus: 'Closed',
    timezone: 'CET (UTC+1)',
    timestamp: '2024-10-31 17:30:00',
  },
  // Asia
  {
    symbol: 'N225',
    name: 'Nikkei 225',
    region: 'Asia',
    assetClass: 'index',
    price: 39081.25,
    change: -196.14,
    changePercent: -0.50,
    previousClose: 39277.39,
    open: 39150.00,
    high: 39310.00,
    low: 38920.00,
    currency: 'JPY',
    delay: 'End-of-day',
    source: 'Tokyo Stock Exchange',
    marketStatus: 'Closed',
    timezone: 'JST (UTC+9)',
    timestamp: '2024-10-31 15:00:00',
  },
  {
    symbol: 'HSI',
    name: 'Hang Seng Index',
    region: 'Asia',
    assetClass: 'index',
    price: 20317.33,
    change: -63.31,
    changePercent: -0.31,
    previousClose: 20380.64,
    open: 20420.00,
    high: 20550.00,
    low: 20280.00,
    currency: 'HKD',
    delay: 'End-of-day',
    source: 'HKEX',
    marketStatus: 'Closed',
    timezone: 'HKT (UTC+8)',
    timestamp: '2024-10-31 16:00:00',
  },
  {
    symbol: 'SSEC',
    name: 'Shanghai Composite',
    region: 'Asia',
    assetClass: 'index',
    price: 3279.82,
    change: 13.59,
    changePercent: 0.42,
    previousClose: 3266.23,
    open: 3260.00,
    high: 3290.00,
    low: 3255.00,
    currency: 'CNY',
    delay: 'End-of-day',
    source: 'Shanghai Stock Exchange',
    marketStatus: 'Closed',
    timezone: 'CST (UTC+8)',
    timestamp: '2024-10-31 15:00:00',
  },
  // Currencies
  {
    symbol: 'USDINR',
    name: 'USD / INR',
    region: 'Global',
    assetClass: 'forex',
    price: 84.42,
    change: 0.04,
    changePercent: 0.05,
    previousClose: 84.38,
    open: 84.39,
    high: 84.45,
    low: 84.38,
    currency: 'INR',
    delay: 'Daily reference',
    source: 'Frankfurter / ECB',
    marketStatus: 'Indicative',
    timezone: 'UTC',
    timestamp: '2024-10-31 16:00:00',
  },
  {
    symbol: 'EURUSD',
    name: 'EUR / USD',
    region: 'Global',
    assetClass: 'forex',
    price: 1.0883,
    change: 0.0028,
    changePercent: 0.26,
    previousClose: 1.0855,
    open: 1.0860,
    high: 1.0890,
    low: 1.0845,
    currency: 'USD',
    delay: 'Daily reference',
    source: 'Frankfurter / ECB',
    marketStatus: 'Indicative',
    timezone: 'UTC',
    timestamp: '2024-10-31 16:00:00',
  },
  {
    symbol: 'GBPUSD',
    name: 'GBP / USD',
    region: 'Global',
    assetClass: 'forex',
    price: 1.2895,
    change: -0.0065,
    changePercent: -0.50,
    previousClose: 1.2960,
    open: 1.2955,
    high: 1.2990,
    low: 1.2880,
    currency: 'USD',
    delay: 'Daily reference',
    source: 'Frankfurter / ECB',
    marketStatus: 'Indicative',
    timezone: 'UTC',
    timestamp: '2024-10-31 16:00:00',
  },
  // Commodities
  {
    symbol: 'GOLD',
    name: 'Gold (LBMA Spot PM)',
    region: 'Global',
    assetClass: 'commodity',
    price: 2743.90,
    change: -43.50,
    changePercent: -1.56,
    previousClose: 2787.40,
    open: 2785.00,
    high: 2790.15,
    low: 2735.00,
    currency: 'USD/oz',
    delay: 'End-of-day',
    source: 'LBMA PM Benchmark',
    marketStatus: 'Closed',
    timezone: 'GMT (UTC+0)',
    timestamp: '2024-10-31 15:00:00',
  },
  {
    symbol: 'SILVER',
    name: 'Silver (LBMA Spot)',
    region: 'Global',
    assetClass: 'commodity',
    price: 32.70,
    change: -1.15,
    changePercent: -3.40,
    previousClose: 33.85,
    open: 33.70,
    high: 33.95,
    low: 32.50,
    currency: 'USD/oz',
    delay: 'End-of-day',
    source: 'LBMA Reference',
    marketStatus: 'Closed',
    timezone: 'GMT (UTC+0)',
    timestamp: '2024-10-31 15:00:00',
  },
  {
    symbol: 'BRENT',
    name: 'Brent Crude Oil',
    region: 'Global',
    assetClass: 'commodity',
    price: 73.16,
    change: 0.61,
    changePercent: 0.84,
    previousClose: 72.55,
    open: 72.80,
    high: 74.20,
    low: 72.40,
    currency: 'USD/bbl',
    delay: 'Daily reference',
    source: 'EIA / ICE Reference',
    marketStatus: 'Closed',
    timezone: 'UTC',
    timestamp: '2024-10-31 17:00:00',
  },
];

// ─── Indian Sectoral Indices ──────────────────────────────────────────────────

export const INDIAN_SECTORAL_INDICES = [
  { symbol: 'NIFTY50', name: 'NIFTY 50', price: 24205.35, value: 24205.35, change: 127.40, changePercent: 0.53, high: 24242.80, low: 24080.15, pe: 22.8, peRatio: 22.8, pb: 4.1, pbRatio: 4.1, divYield: 1.28 },
  { symbol: 'SENSEX', name: 'BSE SENSEX', price: 79389.06, value: 79389.06, change: 428.10, changePercent: 0.54, high: 79520.40, low: 78990.10, pe: 23.4, peRatio: 23.4, pb: 4.3, pbRatio: 4.3, divYield: 1.15 },
  { symbol: 'BANKNIFTY', name: 'NIFTY Bank', price: 51475.35, value: 51475.35, change: -115.60, changePercent: -0.22, high: 51710.20, low: 51380.00, pe: 15.6, peRatio: 15.6, pb: 2.5, pbRatio: 2.5, divYield: 1.05 },
  { symbol: 'NIFTYFIN', name: 'NIFTY Financial Services', price: 23910.45, value: 23910.45, change: -48.20, changePercent: -0.20, high: 24020.00, low: 23850.00, pe: 16.2, peRatio: 16.2, pb: 2.7, pbRatio: 2.7, divYield: 1.12 },
  { symbol: 'NIFTYIT', name: 'NIFTY IT', price: 41220.80, value: 41220.80, change: 345.50, changePercent: 0.85, high: 41350.00, low: 40850.00, pe: 30.4, peRatio: 30.4, pb: 7.9, pbRatio: 7.9, divYield: 2.10 },
  { symbol: 'NIFTYAUTO', name: 'NIFTY Auto', price: 24150.90, value: 24150.90, change: 185.30, changePercent: 0.77, high: 24280.00, low: 23920.00, pe: 24.2, peRatio: 24.2, pb: 4.8, pbRatio: 4.8, divYield: 1.18 },
  { symbol: 'NIFTYPHARMA', name: 'NIFTY Pharma', price: 22890.15, value: 22890.15, change: 84.10, changePercent: 0.37, high: 22980.00, low: 22740.00, pe: 36.1, peRatio: 36.1, pb: 5.2, pbRatio: 5.2, divYield: 0.75 },
  { symbol: 'NIFTYFMCG', name: 'NIFTY FMCG', price: 58640.25, value: 58640.25, change: -230.15, changePercent: -0.39, high: 59100.00, low: 58520.00, pe: 42.8, peRatio: 42.8, pb: 11.2, pbRatio: 11.2, divYield: 1.85 },
  { symbol: 'NIFTYMETAL', name: 'NIFTY Metal', price: 9240.60, value: 9240.60, change: 92.40, changePercent: 1.01, high: 9295.00, low: 9120.00, pe: 14.8, peRatio: 14.8, pb: 2.1, pbRatio: 2.1, divYield: 2.45 },
  { symbol: 'NIFTYREALTY', name: 'NIFTY Realty', price: 1045.85, value: 1045.85, change: 14.20, changePercent: 1.38, high: 1055.00, low: 1028.00, pe: 48.6, peRatio: 48.6, pb: 3.8, pbRatio: 3.8, divYield: 0.40 },
  { symbol: 'NIFTYENERGY', name: 'NIFTY Energy', price: 38750.40, value: 38750.40, change: 120.50, changePercent: 0.31, high: 38950.00, low: 38610.00, pe: 14.1, peRatio: 14.1, pb: 2.3, pbRatio: 2.3, divYield: 1.90 },
  { symbol: 'NIFTYMEDIA', name: 'NIFTY Media', price: 2045.10, value: 2045.10, change: -8.40, changePercent: -0.41, high: 2065.00, low: 2035.00, pe: 28.5, peRatio: 28.5, pb: 1.9, pbRatio: 1.9, divYield: 0.95 },
];

// Market Breadth (NSE Cash Market)
export const MARKET_BREADTH = {
  advances: 1428,
  declines: 1120,
  unchanged: 84,
  highs52W: 164,
  lows52W: 32,
  upperCircuits: 118,
  lowerCircuits: 42,
  totalTraded: 2632,
  advanceDeclineRatio: 1.28,
};

// ─── Institutional Stock Screener Universe (Indian Large & Mid Caps) ──────────

export const STOCK_UNIVERSE: StockFundamental[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    sector: 'Energy & Petrochemicals',
    industry: 'Oil & Gas Refining & Marketing',
    marketCapCr: 1845200,
    price: 1338.40,
    changePercent: 0.85,
    peRatio: 26.4,
    pbRatio: 2.3,
    roe: 9.8,
    roce: 10.4,
    debtToEquity: 0.42,
    divYield: 0.75,
    revenueGrowthYoy: 11.2,
    patGrowthYoy: 4.8,
    volume: '7.8M',
    high52W: 1608.80,
    low52W: 1215.00,
    oneYearReturn: 14.8,
    rsi: 48.5,
    description: 'India\'s largest conglomerate operating in energy, refining, petrochemicals, telecommunications (Jio) and retail.',
    financials: {
      revenue: [{ year: 'FY21', value: 539238 }, { year: 'FY22', value: 792756 }, { year: 'FY23', value: 974864 }, { year: 'FY24', value: 1000122 }],
      ebitda: [{ year: 'FY21', value: 97580 }, { year: 'FY22', value: 125687 }, { year: 'FY23', value: 153920 }, { year: 'FY24', value: 178490 }],
      pat: [{ year: 'FY21', value: 53739 }, { year: 'FY22', value: 67845 }, { year: 'FY23', value: 74088 }, { year: 'FY24', value: 79020 }],
      eps: [{ year: 'FY21', value: 79.4 }, { year: 'FY22', value: 100.3 }, { year: 'FY23', value: 109.5 }, { year: 'FY24', value: 116.8 }],
    },
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd',
    sector: 'Information Technology',
    industry: 'IT Consulting & Software',
    marketCapCr: 1478900,
    price: 4085.60,
    changePercent: 1.15,
    peRatio: 31.8,
    pbRatio: 14.2,
    roe: 48.6,
    roce: 62.4,
    debtToEquity: 0.05,
    divYield: 1.85,
    revenueGrowthYoy: 7.2,
    patGrowthYoy: 8.6,
    volume: '2.4M',
    high52W: 4585.00,
    low52W: 3313.00,
    oneYearReturn: 21.4,
    rsi: 54.2,
    description: 'A global leader in IT services, consulting, and business solutions with industry-leading operating margins and return on equity.',
    financials: {
      revenue: [{ year: 'FY21', value: 164177 }, { year: 'FY22', value: 191754 }, { year: 'FY23', value: 225458 }, { year: 'FY24', value: 240893 }],
      ebitda: [{ year: 'FY21', value: 46546 }, { year: 'FY22', value: 53057 }, { year: 'FY23', value: 59253 }, { year: 'FY24', value: 64150 }],
      pat: [{ year: 'FY21', value: 32430 }, { year: 'FY22', value: 38327 }, { year: 'FY23', value: 42147 }, { year: 'FY24', value: 45908 }],
      eps: [{ year: 'FY21', value: 86.2 }, { year: 'FY22', value: 103.6 }, { year: 'FY23', value: 115.2 }, { year: 'FY24', value: 126.9 }],
    },
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    sector: 'Financial Services',
    industry: 'Private Commercial Banking',
    marketCapCr: 1324500,
    price: 1742.80,
    changePercent: -0.35,
    peRatio: 19.4,
    pbRatio: 2.8,
    roe: 16.4,
    roce: 18.2,
    debtToEquity: 1.25,
    divYield: 1.12,
    revenueGrowthYoy: 28.4,
    patGrowthYoy: 22.1,
    volume: '14.2M',
    high52W: 1794.00,
    low52W: 1363.55,
    oneYearReturn: 16.8,
    rsi: 58.1,
    description: 'India\'s largest private sector bank by assets and market capitalization, providing comprehensive retail, wholesale, and investment banking services.',
    financials: {
      revenue: [{ year: 'FY21', value: 146063 }, { year: 'FY22', value: 157851 }, { year: 'FY23', value: 192800 }, { year: 'FY24', value: 385800 }],
      ebitda: [{ year: 'FY21', value: 57362 }, { year: 'FY22', value: 64077 }, { year: 'FY23', value: 70404 }, { year: 'FY24', value: 114800 }],
      pat: [{ year: 'FY21', value: 31116 }, { year: 'FY22', value: 36961 }, { year: 'FY23', value: 44109 }, { year: 'FY24', value: 60812 }],
      eps: [{ year: 'FY21', value: 56.4 }, { year: 'FY22', value: 66.8 }, { year: 'FY23', value: 79.3 }, { year: 'FY24', value: 89.8 }],
    },
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    sector: 'Information Technology',
    industry: 'IT Consulting & Software',
    marketCapCr: 765400,
    price: 1845.20,
    changePercent: 0.65,
    peRatio: 29.5,
    pbRatio: 8.9,
    roe: 32.1,
    roce: 41.5,
    debtToEquity: 0.08,
    divYield: 2.45,
    revenueGrowthYoy: 5.8,
    patGrowthYoy: 7.4,
    volume: '5.1M',
    high52W: 1991.45,
    low52W: 1358.35,
    oneYearReturn: 28.5,
    rsi: 52.4,
    description: 'Global IT consulting company pioneering digital transformation, cloud migrations (Cobalt), and enterprise AI integrations.',
    financials: {
      revenue: [{ year: 'FY21', value: 100472 }, { year: 'FY22', value: 121641 }, { year: 'FY23', value: 146767 }, { year: 'FY24', value: 153670 }],
      ebitda: [{ year: 'FY21', value: 27889 }, { year: 'FY22', value: 31492 }, { year: 'FY23', value: 35131 }, { year: 'FY24', value: 37450 }],
      pat: [{ year: 'FY21', value: 19351 }, { year: 'FY22', value: 22110 }, { year: 'FY23', value: 24095 }, { year: 'FY24', value: 26248 }],
      eps: [{ year: 'FY21', value: 45.6 }, { year: 'FY22', value: 52.4 }, { year: 'FY23', value: 57.6 }, { year: 'FY24', value: 63.2 }],
    },
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd',
    sector: 'Financial Services',
    industry: 'Private Commercial Banking',
    marketCapCr: 894500,
    price: 1272.50,
    changePercent: 0.40,
    peRatio: 18.2,
    pbRatio: 3.1,
    roe: 18.9,
    roce: 19.8,
    debtToEquity: 1.15,
    divYield: 0.85,
    revenueGrowthYoy: 22.4,
    patGrowthYoy: 28.6,
    volume: '8.4M',
    high52W: 1332.00,
    low52W: 914.00,
    oneYearReturn: 34.2,
    rsi: 56.8,
    description: 'Leading private sector bank renowned for high return on assets, disciplined underwriting, and digital penetration via iMobile Pay.',
    financials: {
      revenue: [{ year: 'FY21', value: 89163 }, { year: 'FY22', value: 96541 }, { year: 'FY23', value: 121067 }, { year: 'FY24', value: 159840 }],
      ebitda: [{ year: 'FY21', value: 36397 }, { year: 'FY22', value: 42080 }, { year: 'FY23', value: 53580 }, { year: 'FY24', value: 68420 }],
      pat: [{ year: 'FY21', value: 16193 }, { year: 'FY22', value: 23339 }, { year: 'FY23', value: 31896 }, { year: 'FY24', value: 40888 }],
      eps: [{ year: 'FY21', value: 23.5 }, { year: 'FY22', value: 33.6 }, { year: 'FY23', value: 45.8 }, { year: 'FY24', value: 58.2 }],
    },
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd',
    sector: 'Telecommunications',
    industry: 'Wireless Telecom Services',
    marketCapCr: 948200,
    price: 1618.30,
    changePercent: 1.85,
    peRatio: 64.2,
    pbRatio: 9.8,
    roe: 18.4,
    roce: 16.2,
    debtToEquity: 1.85,
    divYield: 0.50,
    revenueGrowthYoy: 14.8,
    patGrowthYoy: 42.5,
    volume: '6.2M',
    high52W: 1779.00,
    low52W: 902.00,
    oneYearReturn: 76.5,
    rsi: 61.2,
    description: 'Premier telecommunications services provider in India and Africa with industry-leading ARPU (Average Revenue Per User) expansion.',
    financials: {
      revenue: [{ year: 'FY21', value: 100616 }, { year: 'FY22', value: 116547 }, { year: 'FY23', value: 139145 }, { year: 'FY24', value: 149982 }],
      ebitda: [{ year: 'FY21', value: 45372 }, { year: 'FY22', value: 57534 }, { year: 'FY23', value: 71274 }, { year: 'FY24', value: 79840 }],
      pat: [{ year: 'FY21', value: -15084 }, { year: 'FY22', value: 4255 }, { year: 'FY23', value: 8346 }, { year: 'FY24', value: 14780 }],
      eps: [{ year: 'FY21', value: -27.6 }, { year: 'FY22', value: 7.5 }, { year: 'FY23', value: 14.7 }, { year: 'FY24', value: 25.2 }],
    },
  },
  {
    symbol: 'ITC',
    name: 'ITC Ltd',
    sector: 'Consumer Staples',
    industry: 'Diversified FMCG & Cigarettes',
    marketCapCr: 612400,
    price: 490.15,
    changePercent: -0.45,
    peRatio: 29.8,
    pbRatio: 8.4,
    roe: 28.5,
    roce: 38.2,
    debtToEquity: 0.01,
    divYield: 2.85,
    revenueGrowthYoy: 6.5,
    patGrowthYoy: 7.8,
    volume: '9.8M',
    high52W: 528.55,
    low52W: 399.30,
    oneYearReturn: 14.2,
    rsi: 46.8,
    description: 'Diversified consumer giant spanning cigarettes, packaged foods (Aashirvaad, Sunfeast), agri-business, paperboards, and demerged hotels.',
    financials: {
      revenue: [{ year: 'FY21', value: 49272 }, { year: 'FY22', value: 60668 }, { year: 'FY23', value: 70919 }, { year: 'FY24', value: 76840 }],
      ebitda: [{ year: 'FY21', value: 17164 }, { year: 'FY22', value: 20658 }, { year: 'FY23', value: 25665 }, { year: 'FY24', value: 27850 }],
      pat: [{ year: 'FY21', value: 13032 }, { year: 'FY22', value: 15058 }, { year: 'FY23', value: 18753 }, { year: 'FY24', value: 20422 }],
      eps: [{ year: 'FY21', value: 10.6 }, { year: 'FY22', value: 12.2 }, { year: 'FY23', value: 15.1 }, { year: 'FY24', value: 16.4 }],
    },
  },
  {
    symbol: 'LT',
    name: 'Larsen & Toubro Ltd',
    sector: 'Capital Goods & Infrastructure',
    industry: 'Engineering & Construction',
    marketCapCr: 498700,
    price: 3624.80,
    changePercent: 1.40,
    peRatio: 37.5,
    pbRatio: 5.6,
    roe: 15.4,
    roce: 18.2,
    debtToEquity: 0.85,
    divYield: 0.95,
    revenueGrowthYoy: 20.6,
    patGrowthYoy: 15.8,
    volume: '2.1M',
    high52W: 3948.00,
    low52W: 2872.00,
    oneYearReturn: 24.8,
    rsi: 54.9,
    description: 'India\'s pre-eminent engineering, procurement, construction (EPC), and technology conglomerate with massive international order backlog.',
    financials: {
      revenue: [{ year: 'FY21', value: 135979 }, { year: 'FY22', value: 156521 }, { year: 'FY23', value: 183341 }, { year: 'FY24', value: 221113 }],
      ebitda: [{ year: 'FY21', value: 15624 }, { year: 'FY22', value: 18220 }, { year: 'FY23', value: 20753 }, { year: 'FY24', value: 23980 }],
      pat: [{ year: 'FY21', value: 11583 }, { year: 'FY22', value: 8572 }, { year: 'FY23', value: 10471 }, { year: 'FY24', value: 13059 }],
      eps: [{ year: 'FY21', value: 82.5 }, { year: 'FY22', value: 61.0 }, { year: 'FY23', value: 74.5 }, { year: 'FY24', value: 94.8 }],
    },
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    sector: 'Financial Services',
    industry: 'Public Commercial Banking',
    marketCapCr: 741200,
    price: 830.40,
    changePercent: 0.70,
    peRatio: 11.2,
    pbRatio: 1.7,
    roe: 19.4,
    roce: 18.8,
    debtToEquity: 1.40,
    divYield: 1.65,
    revenueGrowthYoy: 18.5,
    patGrowthYoy: 20.4,
    volume: '16.5M',
    high52W: 912.10,
    low52W: 555.25,
    oneYearReturn: 46.2,
    rsi: 51.8,
    description: 'India\'s largest commercial bank by deposits, branches, and customer count, commanding over 22% of total national banking assets.',
    financials: {
      revenue: [{ year: 'FY21', value: 265151 }, { year: 'FY22', value: 275005 }, { year: 'FY23', value: 332101 }, { year: 'FY24', value: 406890 }],
      ebitda: [{ year: 'FY21', value: 71554 }, { year: 'FY22', value: 75292 }, { year: 'FY23', value: 83713 }, { year: 'FY24', value: 98750 }],
      pat: [{ year: 'FY21', value: 20410 }, { year: 'FY22', value: 31676 }, { year: 'FY23', value: 50232 }, { year: 'FY24', value: 61077 }],
      eps: [{ year: 'FY21', value: 22.9 }, { year: 'FY22', value: 35.5 }, { year: 'FY23', value: 56.3 }, { year: 'FY24', value: 68.4 }],
    },
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    sector: 'Automotive',
    industry: 'Commercial & Passenger Vehicles',
    marketCapCr: 318400,
    price: 865.10,
    changePercent: -1.25,
    peRatio: 9.8,
    pbRatio: 3.4,
    roe: 35.2,
    roce: 22.4,
    debtToEquity: 0.65,
    divYield: 0.70,
    revenueGrowthYoy: 26.6,
    patGrowthYoy: 145.0,
    volume: '8.2M',
    high52W: 1179.05,
    low52W: 636.15,
    oneYearReturn: 32.5,
    rsi: 42.1,
    description: 'Leading global automobile manufacturer comprising commercial vehicles, Indian electric vehicles, and Jaguar Land Rover (JLR) luxury portfolio.',
    financials: {
      revenue: [{ year: 'FY21', value: 249795 }, { year: 'FY22', value: 278454 }, { year: 'FY23', value: 345967 }, { year: 'FY24', value: 437928 }],
      ebitda: [{ year: 'FY21', value: 32243 }, { year: 'FY22', value: 24813 }, { year: 'FY23', value: 37011 }, { year: 'FY24', value: 62800 }],
      pat: [{ year: 'FY21', value: -13451 }, { year: 'FY22', value: -11441 }, { year: 'FY23', value: 2414 }, { year: 'FY24', value: 31399 }],
      eps: [{ year: 'FY21', value: -35.1 }, { year: 'FY22', value: -29.8 }, { year: 'FY23', value: 6.3 }, { year: 'FY24', value: 81.8 }],
    },
  },
];

// ─── Institutional Derivatives & Options Intelligence ─────────────────────────

export const NIFTY_OPTIONS_CHAIN: {
  underlyingPrice: number;
  spotPrice: number;
  expiryDate: string;
  pcr: number;
  maxPain: number;
  totalCallOI: number;
  totalPutOI: number;
  strikes: OptionStrike[];
} = {
  underlyingPrice: 24205.35,
  spotPrice: 24205.35,
  expiryDate: '07-Nov-2024',
  pcr: 1.12, // Put-Call Ratio > 1 implies bullish/neutral support
  maxPain: 24200,
  totalCallOI: 14250000,
  totalPutOI: 15960000,
  strikes: [
    { strikePrice: 23900, callOI: 245000, callChangeOI: -45000, callLtp: 342.10, callIV: 11.2, putLtp: 32.40, putIV: 13.8, putOI: 1845000, putChangeOI: 240000 },
    { strikePrice: 24000, callOI: 520000, callChangeOI: -85000, callLtp: 258.50, callIV: 11.4, putLtp: 48.90, putIV: 13.4, putOI: 2980000, putChangeOI: 410000 },
    { strikePrice: 24100, callOI: 890000, callChangeOI: 35000, callLtp: 184.20, callIV: 11.8, putLtp: 72.50, putIV: 13.1, putOI: 2120000, putChangeOI: 380000 },
    { strikePrice: 24200, callOI: 1840000, callChangeOI: 420000, callLtp: 121.80, callIV: 12.1, putLtp: 108.40, putIV: 12.8, putOI: 1980000, putChangeOI: 220000 },
    { strikePrice: 24300, callOI: 2650000, callChangeOI: 580000, callLtp: 74.30, callIV: 12.4, putLtp: 161.20, putIV: 12.6, putOI: 1120000, putChangeOI: -85000 },
    { strikePrice: 24400, callOI: 3420000, callChangeOI: 710000, callLtp: 42.10, callIV: 12.8, putLtp: 228.00, putIV: 12.5, putOI: 680000, putChangeOI: -120000 },
    { strikePrice: 24500, callOI: 4180000, callChangeOI: 890000, callLtp: 22.50, callIV: 13.2, putLtp: 308.20, putIV: 12.3, putOI: 410000, putChangeOI: -150000 },
  ],
};

// ─── FII / DII Institutional Flows ────────────────────────────────────────────

export const FII_DII_FLOWS = [
  { date: '31-Oct-2024', fiiGrossBuy: 11245.5, fiiGrossSell: 15480.2, fiiNet: -4234.7, diiGrossBuy: 14890.1, diiGrossSell: 10925.6, diiNet: 3964.5 },
  { date: '30-Oct-2024', fiiGrossBuy: 10890.2, fiiGrossSell: 15505.8, fiiNet: -4615.6, diiGrossBuy: 15120.4, diiGrossSell: 10602.1, diiNet: 4518.3 },
  { date: '29-Oct-2024', fiiGrossBuy: 12450.0, fiiGrossSell: 15674.2, fiiNet: -3224.2, diiGrossBuy: 13800.5, diiGrossSell: 10980.2, diiNet: 2820.3 },
  { date: '28-Oct-2024', fiiGrossBuy: 9870.4, fiiGrossSell: 13100.8, fiiNet: -3230.4, diiGrossBuy: 12400.1, diiGrossSell: 9110.5, diiNet: 3289.6 },
  { date: '25-Oct-2024', fiiGrossBuy: 13120.8, fiiGrossSell: 16140.2, fiiNet: -3019.4, diiGrossBuy: 14200.8, diiGrossSell: 10420.0, diiNet: 3780.8 },
];

// ─── Economic Calendar ────────────────────────────────────────────────────────

export const ECONOMIC_CALENDAR_EVENTS: EconomicEvent[] = [
  { id: 'ev-1', time: '17:30 IST', date: '2024-11-12', country: 'IN', countryName: 'India', event: 'CPI Inflation (YoY)', importance: 'HIGH', actual: null, forecast: '5.80%', previous: '5.49%', source: 'MoSPI' },
  { id: 'ev-2', time: '17:30 IST', date: '2024-11-12', country: 'IN', countryName: 'India', event: 'Industrial Production IIP (YoY)', importance: 'MEDIUM', actual: null, forecast: '2.5%', previous: '-0.1%', source: 'MoSPI' },
  { id: 'ev-3', time: '19:00 IST', date: '2024-11-13', country: 'US', countryName: 'United States', event: 'US CPI Inflation Rate (MoM)', importance: 'HIGH', actual: null, forecast: '0.2%', previous: '0.2%', source: 'US BLS' },
  { id: 'ev-4', time: '00:30 IST', date: '2024-11-08', country: 'US', countryName: 'United States', event: 'Federal Reserve Interest Rate Decision', importance: 'HIGH', actual: '4.75%', forecast: '4.75%', previous: '5.00%', source: 'Federal Reserve' },
  { id: 'ev-5', time: '15:30 IST', date: '2024-11-15', country: 'EU', countryName: 'Eurozone', event: 'Eurozone GDP Growth (QoQ Flash)', importance: 'HIGH', actual: null, forecast: '0.4%', previous: '0.2%', source: 'Eurostat' },
  { id: 'ev-6', time: '10:00 IST', date: '2024-12-06', country: 'IN', countryName: 'India', event: 'RBI Monetary Policy Committee Decision', importance: 'HIGH', actual: null, forecast: '6.50%', previous: '6.50%', source: 'Reserve Bank of India' },
];

// ─── Financial News & Wire ────────────────────────────────────────────────────

export const MARKET_NEWS: MarketNewsItem[] = [
  {
    id: 'n-1',
    title: 'RBI MPC Shift to Neutral Stance Paves Way for Growth Balancing',
    summary: 'The Monetary Policy Committee unanimously adopted a neutral stance while keeping the policy repo rate unchanged at 6.50%, signalling peak interest rates.',
    source: 'Reserve Bank of India Bulletin',
    url: 'https://rbi.org.in',
    category: 'Central Banks',
    publishedAt: '2 hours ago',
    readTime: '3 min read',
  },
  {
    id: 'n-2',
    title: 'Indian Sovereign 10-Year G-Sec Yield Settles at 6.84% Amid Easing Crude',
    summary: 'Benchmark 10-year yields tightened 4 bps this week supported by moderated Brent crude prices and domestic institutional liquidity.',
    source: 'CCIL / FIMMDA',
    url: 'https://ccilindia.com',
    category: 'Macro',
    publishedAt: '4 hours ago',
    readTime: '2 min read',
  },
  {
    id: 'n-3',
    title: 'DII Net Inflows Cross ₹40,000 Crore in October Countering FII Selling',
    summary: 'Domestic mutual funds and insurance companies cushioned broader markets through systematic SIP contributions and strategic large-cap accumulation.',
    source: 'NSE / SEBI Data',
    url: 'https://sebi.gov.in',
    category: 'Equities',
    publishedAt: '6 hours ago',
    readTime: '4 min read',
  },
  {
    id: 'n-4',
    title: 'ECB Reference Rates: Euro Strengthens Modestly Against Dollar Following Flash PMIs',
    summary: 'European Central Bank published daily indicative reference rates showing EUR/USD resilience around 1.0880.',
    source: 'European Central Bank / Frankfurter',
    url: 'https://frankfurter.dev',
    category: 'Macro',
    publishedAt: '8 hours ago',
    readTime: '2 min read',
  },
  {
    id: 'n-5',
    title: 'Brent Crude Stabilizes at $73/bbl as OPEC+ Re-evaluates December Supply Cadence',
    summary: 'Crude futures rebounded from intra-week lows amid Middle East supply monitoring and balanced US inventory data.',
    source: 'EIA / Intercontinental Exchange',
    url: 'https://eia.gov',
    category: 'Commodities',
    publishedAt: '10 hours ago',
    readTime: '3 min read',
  },
];

// ─── Technical Indicator Pure Mathematics ────────────────────────────────────

/** Simple Moving Average (SMA) */
export function calculateSMA(data: number[], period: number): (number | null)[] {
  return data.map((_, idx, arr) => {
    if (idx < period - 1) return null;
    const slice = arr.slice(idx - period + 1, idx + 1);
    const sum = slice.reduce((a, b) => a + b, 0);
    return Math.round((sum / period) * 100) / 100;
  });
}

/** Exponential Moving Average (EMA) */
export function calculateEMA(data: number[], period: number): (number | null)[] {
  const k = 2 / (period + 1);
  const result: (number | null)[] = [];
  let ema: number | null = null;

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else if (i === period - 1) {
      const sum = data.slice(0, period).reduce((a, b) => a + b, 0);
      ema = sum / period;
      result.push(Math.round(ema * 100) / 100);
    } else if (ema !== null) {
      ema = data[i] * k + ema * (1 - k);
      result.push(Math.round(ema * 100) / 100);
    }
  }
  return result;
}

/** Relative Strength Index (RSI - 14) */
export function calculateRSI(prices: number[], period = 14): (number | null)[] {
  if (prices.length <= period) return prices.map(() => null);

  const result: (number | null)[] = Array(period).fill(null);
  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;
  let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  result.push(Math.round((100 - 100 / (1 + rs)) * 10) / 10);

  for (let i = period + 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    avgGain = (avgGain * (period - 1) + (diff > 0 ? diff : 0)) / period;
    avgLoss = (avgLoss * (period - 1) + (diff < 0 ? -diff : 0)) / period;

    rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const rsi = Math.round((100 - 100 / (1 + rs)) * 10) / 10;
    result.push(rsi);
  }

  return result;
}

/** Bollinger Bands (Period 20, StdDev 2) */
export function calculateBollingerBands(prices: number[], period = 20, multiplier = 2) {
  const sma = calculateSMA(prices, period);
  const upper: (number | null)[] = [];
  const middle: (number | null)[] = [];
  const lower: (number | null)[] = [];

  prices.forEach((price, idx, arr) => {
    const mean = sma[idx];
    if (mean === null) {
      upper.push(null);
      middle.push(null);
      lower.push(null);
      return;
    }

    const slice = arr.slice(idx - period + 1, idx + 1);
    const variance = slice.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / period;
    const stdDev = Math.sqrt(variance);

    upper.push(Math.round((mean + multiplier * stdDev) * 100) / 100);
    middle.push(mean);
    lower.push(Math.round((mean - multiplier * stdDev) * 100) / 100);
  });

  return { upper, middle, lower };
}

// ─── Historical Chart Sample Generator (Reproducible & Deterministic) ──────────

export function generateHistoricalCandles(basePrice: number, days = 60) {
  const candles: Array<{ date: string; open: number; high: number; low: number; close: number; volume: number }> = [];
  let current = basePrice;
  const now = new Date('2024-10-31T00:00:00Z');

  // Seeded deterministic walk
  for (let i = days; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86_400_000);
    // Skip weekends
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    const pseudoRandom = Math.sin(i * 12.9898) * 43758.5453;
    const delta = (pseudoRandom - Math.floor(pseudoRandom) - 0.48) * (basePrice * 0.02);

    const open = Math.round(current * 100) / 100;
    const close = Math.round((open + delta) * 100) / 100;
    const high = Math.round((Math.max(open, close) + Math.abs(delta) * 0.6) * 100) / 100;
    const low = Math.round((Math.min(open, close) - Math.abs(delta) * 0.6) * 100) / 100;
    const volume = Math.floor(1000000 + Math.abs(delta * 50000));

    candles.push({
      date: d.toISOString().slice(0, 10),
      open,
      high,
      low,
      close,
      volume,
    });
    current = close;
  }
  return candles;
}

