'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, TrendingUp, Zap, Target, ArrowRight } from 'lucide-react';

const POPULAR_COMPANIES = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Conglomerate' },
  { symbol: 'TCS', name: 'TCS', sector: 'IT Services' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking' },
  { symbol: 'INFY', name: 'Infosys', sector: 'IT Services' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking' },
  { symbol: 'WIPRO', name: 'Wipro', sector: 'IT Services' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', sector: 'NBFC' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', sector: 'Automobiles' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', sector: 'Automobiles' },
  { symbol: 'ONGC', name: 'ONGC', sector: 'Oil & Gas' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharma', sector: 'Pharma' },
  { symbol: 'LT', name: 'Larsen & Toubro', sector: 'Infrastructure' },
];

const FEATURES = [
  { icon: <TrendingUp size={22} className="text-cinema-cyan" />, title: 'Financial Health Score', desc: 'Instant 0–100 score across profitability, leverage, growth & efficiency' },
  { icon: <Zap size={22} className="text-amber-400" />, title: 'AI Investment Thesis', desc: 'Bull case, bear case, key risks & AI analyst verdict — PRO' },
  { icon: <Target size={22} className="text-violet-400" />, title: 'Auto DCF Model', desc: '5-year DCF with sensitivity table, India-specific WACC — ELITE' },
];

export default function CompanySearchClient() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = useCallback((symbol: string) => {
    if (!symbol.trim()) return;
    setLoading(true);
    router.push(`/company/${symbol.trim().toUpperCase()}`);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="min-h-screen bg-cinema-ink">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 cinema-mesh opacity-40" />
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-cinema-glow-blue/15 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-cinema-violet/15 blur-[100px]" />

        <div className="wrap relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-cinema-light border border-cinema-cyan/30 text-cinema-cyan text-sm font-medium mb-8">
            <Zap size={14} />
            India Company Intelligence Hub
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            The Bloomberg Terminal<br />
            <span className="cinema-text-gradient">for Every Indian Investor</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Search any NSE/BSE listed company. Get instant AI-powered financial analysis,
            health scores, peer comparisons, and DCF models — at <span className="text-cinema-cyan font-semibold">₹999/month</span> instead of ₹1.5L.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-4">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value.toUpperCase())}
                placeholder="Enter NSE symbol (e.g. RELIANCE, TCS, HDFCBANK)"
                className="w-full pl-12 pr-36 py-4 text-base bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cinema-cyan/50 focus:ring-2 focus:ring-cinema-cyan/20 transition-all"
                disabled={loading}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-cinema-cyan text-black font-semibold text-sm rounded-xl hover:bg-cinema-cyan/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>Analyze <ArrowRight size={14} /></>
                )}
              </button>
            </div>
          </form>
          <p className="text-xs text-gray-600 mb-16">
            Free: Health score + snapshot &nbsp;|&nbsp; PRO: AI analysis + peers &nbsp;|&nbsp; ELITE: DCF model + sensitivity table
          </p>

          {/* Feature Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass-cinema-light border border-white/10 rounded-2xl p-4 text-left">
                <div className="mb-2">{f.icon}</div>
                <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Companies */}
      <section className="py-16 relative">
        <div className="absolute inset-0 cinema-grid opacity-20" />
        <div className="wrap relative z-10">
          <h2 className="text-lg font-semibold text-gray-400 mb-6 text-center uppercase tracking-wider">
            Popular Companies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {POPULAR_COMPANIES.map((co) => (
              <button
                key={co.symbol}
                onClick={() => handleSearch(co.symbol)}
                className="glass-cinema-light border border-white/10 rounded-xl p-4 text-left hover:border-cinema-cyan/40 hover:bg-white/5 transition-all group"
              >
                <div className="text-xs font-mono font-bold text-cinema-cyan mb-1 group-hover:text-white transition-colors">
                  {co.symbol}
                </div>
                <div className="text-xs text-white font-medium truncate">{co.name}</div>
                <div className="text-xs text-gray-600 mt-0.5 truncate">{co.sector}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 border-t border-white/5">
        <div className="wrap">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { num: '5,000+', label: 'NSE/BSE Companies', desc: 'Every listed Indian company available' },
              { num: '3 Tiers', label: 'Of Intelligence', desc: 'Free → PRO → ELITE, each with more depth' },
              { num: '₹999/mo', label: 'vs ₹1.5L/mo Bloomberg', desc: 'Institutional-grade at consumer price' },
            ].map((stat) => (
              <div key={stat.label} className="glass-cinema-light border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-black cinema-text-gradient mb-2">{stat.num}</div>
                <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
