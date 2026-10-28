import Link from 'next/link';

export default function FlagshipProductsSection() {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden border-t border-b border-slate-850">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span>🔥 3 FLAGSHIP MONETIZED SUITES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            High-Value Products{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
              Built for India
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Stop relying on generic US spreadsheets and free table scrapers. We engineered three institutional-grade finance suites built specifically for Indian regulations, placement committees, and venture capital.
          </p>
        </div>

        {/* 3 Flagship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* PRODUCT 1 CARD */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 p-7 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  ⚡ Product 1 · Markets
                </span>
                <span className="text-[11px] text-slate-400 font-medium">From ₹999/mo</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Company Intelligence & AI DCF Studio
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                The Bloomberg Terminal alternative for Indian equities. Type any NSE/BSE stock for instant AI bull/bear thesis, Ind AS forensic health scores, and an automated DCF model.
              </p>

              {/* Feature Points */}
              <div className="my-5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>AI Investment Thesis:</strong> Bull & Bear cases with analyst ratings</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Auto DCF Valuation:</strong> 5-yr projections & sensitivity matrix</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Red Flag Audit:</strong> Ind AS accounting quality score</span>
                </div>
              </div>

              {/* Tickers */}
              <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl mb-6">
                <div className="text-[10px] text-slate-400 mb-1 uppercase font-semibold">Try Indian Tickers:</div>
                <div className="flex flex-wrap gap-1">
                  {['RELIANCE', 'TCS', 'HDFCBANK', 'INFY'].map((sym) => (
                    <Link
                      key={sym}
                      href={`/company/${sym}`}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-mono transition"
                    >
                      {sym}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/company"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg text-center transition transform active:scale-95"
            >
              Analyze Any Company →
            </Link>
          </div>

          {/* PRODUCT 2 CARD */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-orange-500/50 p-7 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  🎯 Product 2 · Careers
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Free Trial · Pro Unltd</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-orange-300 transition-colors">
                Finance Interview War Room
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                India’s #1 AI finance interview simulator. Practice high-stakes questions from Goldman Sachs India, Avendus Capital, Kotak IB, and Big 4 TAS with real-time AI scoring.
              </p>

              {/* Feature Points */}
              <div className="my-5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span><strong>7 Core Roles:</strong> IB, PE, Equity Research, Big 4 TAS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span><strong>India Regulatory Engine:</strong> Ind AS 116, RBI repo, SEBI</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span><strong>Instant AI Scorecard:</strong> Score / 10 + VP model answers</span>
                </div>
              </div>

              {/* Firm tags */}
              <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl mb-6">
                <div className="text-[10px] text-slate-400 mb-1 uppercase font-semibold">Firm Banks:</div>
                <div className="flex flex-wrap gap-1 text-[10px] font-medium text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Goldman India</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Avendus</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Kotak IB</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Deloitte TAS</span>
                </div>
              </div>
            </div>

            <Link
              href="/interview-war-room"
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 hover:border-orange-500/50 text-center transition transform active:scale-95"
            >
              Enter War Room →
            </Link>
          </div>

          {/* PRODUCT 3 CARD */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/50 p-7 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  🚀 Product 3 · Startups
                </span>
                <span className="text-[11px] text-slate-400 font-medium">VC-Ready In 10 Min</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                Startup Financial Intelligence Suite
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Build institutional 3-statement models, runway projections, and unit economics without hiring a ₹1 Lakh/mo CFO. Benchmarked against Peak XV, Blume, and Accel metrics.
              </p>

              {/* Feature Points */}
              <div className="my-5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>3-Year P&L & Cash Flow:</strong> 36-month monthly projections</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Runway & Burn Engine:</strong> Cash-zero date & breakeven timeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>AI VC Pitch Memo:</strong> Peak XV / Blume partner readiness score</span>
                </div>
              </div>

              {/* Archetypes tags */}
              <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl mb-6">
                <div className="text-[10px] text-slate-400 mb-1 uppercase font-semibold">Archetypes Supported:</div>
                <div className="flex flex-wrap gap-1 text-[10px] font-medium text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">B2B SaaS</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">D2C Brands</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Marketplaces</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Fintech</span>
                </div>
              </div>
            </div>

            <Link
              href="/startup-financials"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg text-center transition transform active:scale-95"
            >
              Build Startup Model →
            </Link>
          </div>
        </div>

        {/* Pricing conversion strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-white">
              Unlock All 3 Flagship Products with Analyst Pro (₹999/month)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Includes Company Intelligence, Interview War Room, and Startup Financial Suite. Instant UPI activation.
            </p>
          </div>
          <Link
            href="/pricing"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shrink-0 transition"
          >
            View Pro Plans & Pricing →
          </Link>
        </div>
      </div>
    </section>
  );
}
