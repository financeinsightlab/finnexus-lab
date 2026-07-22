// Embedded learning material — no external links needed
export type LearningItem = {
  title: string;
  type: "Concept" | "Formula" | "Q&A" | "Script" | "Cheatsheet" | "Example";
  content?: string; // plain text or markdown-ish
  qa?: { q: string; a: string }[];
};

export type LearningModule = {
  id: string;
  category: "Finance" | "Analytics" | "English" | "Aptitude" | "HR/Resume";
  icon: string;
  title: string;
  summary: string;
  items: LearningItem[];
};

// ============ FINANCE MODULES ============

const financeModules: LearningModule[] = [
  {
    id: "fin-tvm",
    category: "Finance",
    icon: "💰",
    title: "Time Value of Money (TVM)",
    summary: "The most important concept in finance — ₹1 today > ₹1 tomorrow",
    items: [
      {
        title: "Core Idea",
        type: "Concept",
        content:
          "A rupee today is worth more than a rupee tomorrow because of:\n• Inflation (prices rise)\n• Opportunity cost (you could invest it)\n• Risk of not getting it later\n\nThis is WHY we calculate PV / FV.",
      },
      {
        title: "Key Formulas",
        type: "Formula",
        content:
          "Let FV = Future Value, PV = Present Value, r = rate, n = periods\n\n1) FV = PV × (1 + r)^n\n2) PV = FV / (1 + r)^n\n3) FV of Annuity = A × [(1+r)^n − 1] / r\n4) PV of Annuity = A × [1 − (1+r)^−n] / r\n5) Perpetuity PV = A / r",
      },
      {
        title: "Practice Q&A",
        type: "Q&A",
        qa: [
          {
            q: "Q1: Invest ₹10,000 at 10% p.a. for 3 years. FV = ?",
            a: "FV = 10,000 × (1.10)^3 = 10,000 × 1.331 = ₹13,310",
          },
          {
            q: "Q2: What is PV of ₹1,00,000 received after 5 years at 8%?",
            a: "PV = 1,00,000 / (1.08)^5 = 1,00,000 / 1.469 = ₹68,058 approx.",
          },
          {
            q: "Q3: ₹5,000/year for 10 years at 9% — PV of annuity?",
            a: "PV = 5000 × [1 − 1.09^-10]/0.09 = 5000 × 6.4177 = ₹32,085 approx.",
          },
          {
            q: "Q4: What is the Rule of 72?",
            a: "Time to double your money ≈ 72 ÷ rate. So at 8%, money doubles in ~9 years.",
          },
          {
            q: "Q5: Difference between Simple Interest and Compound Interest?",
            a: "SI: interest only on principal → A = P(1 + rt). CI: interest on interest → A = P(1+r)^t. Over long periods, CI grows exponentially (this is the wealth magic).",
          },
        ],
      },
    ],
  },
  {
    id: "fin-ratios",
    category: "Finance",
    icon: "📊",
    title: "Ratio Analysis — ALL Ratios you must know",
    summary: "Memorize these formulas. Every finance interview has ratio questions.",
    items: [
      {
        title: "Liquidity Ratios",
        type: "Formula",
        content:
          "1) Current Ratio = Current Assets / Current Liabilities   (ideal: 2:1)\n2) Quick Ratio / Acid Test = (CA − Inventory) / CL   (ideal: 1:1)\n3) Cash Ratio = Cash / CL",
      },
      {
        title: "Profitability Ratios",
        type: "Formula",
        content:
          "1) Gross Profit Margin = (GP / Revenue) × 100\n2) Operating Margin = (EBIT / Revenue) × 100\n3) Net Profit Margin = (PAT / Revenue) × 100\n4) ROA = PAT / Total Assets\n5) ROE = PAT / Shareholders' Equity  (most important!)\n6) ROCE = EBIT / Capital Employed",
      },
      {
        title: "Solvency / Leverage",
        type: "Formula",
        content:
          "1) Debt-to-Equity = Total Debt / Total Equity   (ideal < 1)\n2) Debt-to-Assets = Total Debt / Total Assets\n3) Interest Coverage = EBIT / Interest Expense  (must be > 3)\n4) DSCR = (EBIT + Depreciation) / (Interest + Principal repayments)",
      },
      {
        title: "Efficiency / Turnover",
        type: "Formula",
        content:
          "1) Inventory Turnover = COGS / Average Inventory\n2) DOH (Days Inventory Held) = 365 / Inv. Turnover\n3) Receivables Turnover = Revenue / Avg. Receivables\n4) DSO (Days Sales Outstanding) = 365 / Rec. Turnover\n5) Asset Turnover = Revenue / Total Assets\n6) Cash Conversion Cycle = DOH + DSO − Days Payable Outstanding",
      },
      {
        title: "Top 5 Interview Q&A",
        type: "Q&A",
        qa: [
          { q: "Which ratio tells me if a company can pay its short-term bills?", a: "Current Ratio and Quick Ratio. Quick Ratio is more reliable because it removes inventory (which may be hard to sell quickly)." },
          { q: "ROE is 20%, what does it mean?", a: "For every ₹100 of shareholders' money, the company generated ₹20 of profit. 20%+ ROE is very good — it's Buffett's favorite metric." },
          { q: "What is a good Debt-to-Equity ratio?", a: "General rule: < 1 is safe. But capital-heavy industries (infrastructure, power) can have 2-3. Compare with industry peers, not in absolute terms." },
          { q: "Inventory turnover of 2 vs 20 — which is better?", a: "20 is better. It means inventory sells 20 times a year (≈ every 18 days). A turnover of 2 means goods sit for ~183 days — tying up cash." },
          { q: "What does negative Working Capital mean?", a: "Current Liabilities > Current Assets. Can be BAD (liquidity crunch) or GOOD (companies like retail/FMCG that collect from customers before paying suppliers — e.g., D-Mart)." },
        ],
      },
    ],
  },
  {
    id: "fin-derivatives",
    category: "Finance",
    icon: "📉",
    title: "Derivatives — Futures & Options",
    summary: "High-frequency interview topic for IB / Trading / Risk roles",
    items: [
      {
        title: "What is a Derivative?",
        type: "Concept",
        content: "A contract whose value depends on (derives from) an underlying asset — stock, index, currency, commodity. The 4 types: Forwards, Futures, Options, Swaps.",
      },
      {
        title: "Future vs Forward",
        type: "Concept",
        content:
          "• Forwards: Private, customized contract between 2 parties, OTC traded.\n• Futures: Standardized, traded on exchange, mark-to-market daily, has margins.\n\nKey difference: Futures eliminate counterparty risk. Forwards have credit risk.",
      },
      {
        title: "Options — Call & Put",
        type: "Concept",
        content:
          "Call Option: Right (not obligation) to BUY underlying at strike price. Buyer of Call = bullish.\n\nPut Option: Right (not obligation) to SELL underlying at strike price. Buyer of Put = bearish.\n\nBuyer's loss is limited to premium paid. Seller's loss can be unlimited.\n\nITM (In The Money): Strike is favorable vs current price.\nOTM (Out of The Money): Strike is unfavorable.\nATM (At The Money): Strike ≈ current price.",
      },
      {
        title: "Margins in Futures",
        type: "Concept",
        content:
          "When you take a futures position, you deposit:\n• Initial Margin: ~10-15% of contract value (security deposit)\n• Maintenance Margin: lower threshold — if balance falls here, you get a margin call\n• Mark-to-Market (MTM): Daily profit/loss is settled to your account.\n\nThis is why futures carry unlimited risk if wrong way.",
      },
      {
        title: "Top 5 Interview Q&A",
        type: "Q&A",
        qa: [
          { q: "I expect Nifty to go up from 22,000 to 23,000. What 2 option trades?", a: "1) Buy a Call Option at strike 22,000 (limited loss, unlimited upside). 2) Sell a Put Option at strike 22,000 (collect premium, limited profit)." },
          { q: "What is Option Premium made of?", a: "Premium = Intrinsic Value (if ITM) + Time Value. As expiry nears, time value decays — called Theta decay." },
          { q: "What is Delta in Options Greeks?", a: "Delta = how much option price changes when underlying changes by ₹1. Deep ITM call ≈ delta 1. ATM call ≈ delta 0.5. OTM call ≈ low delta." },
          { q: "Hedging: I hold 100 shares of Reliance at ₹2,500. How to protect downside?", a: "Buy a Put Option at strike ₹2,400. If price falls below 2,400, you can sell at 2,400. Cost is just the premium." },
          { q: "Why do 90% of option traders lose money?", a: "Most retail buyers buy OTM options expecting big moves. Most of the time the stock doesn't move enough, time value decays to zero, and premium is lost. Sellers win statistically." },
        ],
      },
    ],
  },
  {
    id: "fin-bonds",
    category: "Finance",
    icon: "🏛️",
    title: "Bonds & Yield to Maturity (YTM)",
    summary: "Fixed-income essentials — critical for finance roles",
    items: [
      {
        title: "Bond Basics",
        type: "Concept",
        content:
          "Bond = loan to company/government. Investor is lender, issuer pays interest.\n• Face Value = ₹1,000 typically\n• Coupon Rate = fixed interest % on face value\n• Maturity = years when principal is repaid\n• Bond Price in market = PV of all future cash flows\n\nPrice and Yield move INVERSELY — a CRITICAL relationship.",
      },
      {
        title: "Yield to Maturity (YTM)",
        type: "Formula",
        content:
          "YTM = total return if bond is held to maturity (annualized). It is the IRR of the bond.\n\nApproximate YTM formula:\nYTM ≈ [C + (F − P)/n] / [(F + P)/2]\n\nwhere C = coupon, F = face value, P = price, n = years.\n\nIf Price = Face Value → YTM = Coupon Rate.\nIf Price < Face Value (discount bond) → YTM > Coupon.\nIf Price > Face Value (premium bond) → YTM < Coupon.",
      },
      {
        title: "Duration",
        type: "Concept",
        content:
          "Duration = sensitivity of bond price to interest rate change (roughly: % price change per 1% rate change).\n\n• Higher duration = more sensitive (higher risk)\n• Longer-maturity bonds = higher duration\n• Lower-coupon bonds = higher duration\n• Zero-coupon bond: duration = maturity\n\nModified Duration = Macaulay Duration / (1 + YTM)",
      },
      {
        title: "Interview Q&A",
        type: "Q&A",
        qa: [
          { q: "If RBI raises repo rate, what happens to bond prices?", a: "Bond prices FALL. When new bonds are issued at higher rates, old lower-coupon bonds become less valuable — price drops until YTM matches new rates." },
          { q: "A 10-year 8% bond at face value — what is YTM?", a: "Exactly 8%. When price = face value, YTM = coupon rate." },
          { q: "Which bond is riskier: 5-year 9% or 20-year zero-coupon?", a: "20-year zero-coupon — longest duration (duration = 20 years). Very sensitive to rate changes." },
          { q: "What is a G-Sec?", a: "Government Security — bond issued by Govt of India. Virtually zero default risk (sovereign guarantee). Benchmark rates in India are based on 10-year G-Sec yield." },
        ],
      },
    ],
  },
  {
    id: "fin-dcf",
    category: "Finance",
    icon: "📈",
    title: "Valuation — DCF & Relative Valuation",
    summary: "The MOST asked finance topic in equity research / IB interviews",
    items: [
      {
        title: "DCF in 5 Steps",
        type: "Concept",
        content:
          "DCF = value of company = PV of ALL future free cash flows.\n\nStep 1: Project Free Cash Flow to Firm (FCFF) for 5-10 years\n  FCFF = EBIT × (1 − Tax) + Depreciation − CapEx − ΔWorking Capital\n\nStep 2: Calculate WACC (discount rate)\n  WACC = (E/V) × Re + (D/V) × Rd × (1 − T)\n  where Re from CAPM: Re = Rf + β × (Rm − Rf)\n  Rf = risk-free rate (≈ 10-yr G-Sec = 7%), β = volatility vs market, ERP ≈ 5-7%\n\nStep 3: Calculate Terminal Value (TV) at end of projection period\n  Method A (Gordon Growth): TV = FCF_last × (1 + g) / (WACC − g), where g ≈ 2-3% (long-term GDP growth)\n  Method B (Exit Multiple): TV = EBITDA_final × (EV/EBITDA multiple of peers)\n\nStep 4: PV of FCF + PV of TV = Enterprise Value (EV)\n\nStep 5: Equity Value = EV − Net Debt → divide by shares = Fair Price per share",
      },
      {
        title: "Relative Valuation Multiples",
        type: "Formula",
        content:
          "P/E Ratio = Share Price / EPS    (most common; use for profitable companies)\n\nP/B = Price / Book Value per share   (use for banks, NBFCs, financials)\n\nEV/EBITDA = Enterprise Value / EBITDA   (best cross-company comparison; capital-structure neutral)\n\nEV/Sales = use when EBITDA is negative\n\nPEG Ratio = P/E / Earnings Growth   (PEG < 1 = undervalued)\n\nKey: Compare multiples with INDUSTRY PEERS, not in isolation!",
      },
      {
        title: "Top 10 Interview Q&A",
        type: "Q&A",
        qa: [
          { q: "Walk me through a DCF.", a: "Build 5-yr FCFF projections, calc WACC, find terminal value using Gordon growth or exit multiple, discount everything back to today → get EV, subtract net debt for equity value, divide by shares for price target." },
          { q: "Which is better: DCF or multiples?", a: "Both! DCF = intrinsic value (what company is really worth). Multiples = relative value (what market pays for similar). DCF is more rigorous but sensitive to assumptions. Use both for cross-check." },
          { q: "Why do we use WACC not just cost of equity?", a: "WACC reflects cost of ALL capital (debt + equity). FCFF is cash available to both debt and equity holders, so we discount at WACC. If we were using FCFE (only for equity holders), we'd use Re." },
          { q: "Good WACC number for India?", a: "Typically 11-14% for most large Indian companies. Higher for smaller/riskier firms, lower for stable / low-debt firms." },
          { q: "What is Beta?", a: "Measure of systematic (market) risk. β = 1 → same risk as market. β > 1 → more volatile (tech). β < 1 → less volatile (FMCG, utilities). Negative β → moves opposite to market (very rare)." },
          { q: "Terminal value is 70% of my DCF — is that ok?", a: "Yes, normal. But if it's > 80%, double-check your growth assumption. A too-high terminal growth rate creates unrealistic valuations." },
          { q: "A company has P/E of 40 — expensive?", a: "Depends on growth! A company growing at 40% with P/E 40 (PEG=1) is fine. But 40 P/E at 5% growth = very expensive. Always look at PEG, not P/E alone." },
          { q: "Why subtract Net Debt from EV to get Equity?", a: "Enterprise value = what it costs to buy the whole business (equity + debt). If you buy the company, you take on its debt but get its cash. So Equity Value = EV − Debt + Cash = EV − Net Debt." },
          { q: "Which multiple for a loss-making startup?", a: "EV/Sales or EV/GMV. P/E and EV/EBITDA are meaningless when profits are negative." },
          { q: "Sensitivity analysis — what is it?", a: "Change 1 assumption (WACC ± 1%, growth ± 1%) and see how much your valuation changes. Shows interviewer you understand DCF is not one number — it's a range." },
        ],
      },
    ],
  },
  {
    id: "fin-fundamental",
    category: "Finance",
    icon: "🔍",
    title: "Fundamental Analysis (Equity Research)",
    summary: "EIC framework + stock pitch structure — for ER analyst roles",
    items: [
      {
        title: "EIC Framework — Top-Down",
        type: "Concept",
        content:
          "E = Economy first: GDP growth, interest rates, inflation, policy (like PLI schemes)\nI = Industry analysis: Porter's 5 Forces (competition, supplier/buyer power, threat of new entry & substitutes), growth drivers, regulatory risks\nC = Company analysis: Moat (brand, cost, network effect), management quality, corporate governance, financials (revenue, margins, ROE, debt)\n\nOnly if all 3 check out → BUY recommendation with target price.",
      },
      {
        title: "Porter's 5 Forces",
        type: "Concept",
        content:
          "1) Rivalry among existing competitors\n2) Threat of new entrants\n3) Threat of substitutes\n4) Bargaining power of suppliers\n5) Bargaining power of buyers\n\nWhen all forces are weak = attractive industry (high margins, e.g., FMCG premium category)\nWhen forces are strong = tough industry (low margins, e.g., airlines)",
      },
      {
        title: "Management Quality — red flags to check",
        type: "Concept",
        content:
          "Bad signs:\n• Frequent auditor changes\n• High promoter pledge (> 20%)\n• Related-party transactions that look suspicious\n• Consistently missing guidance / changing accounting policies\n• Divergence between cash flow from operations and reported profits\n\nGood signs:\n• Long track record, clean governance\n• Skin in the game (promoter holding > 40%)\n• Capital allocation: buybacks, dividends, sensible acquisitions",
      },
      {
        title: "Interview: Pitch me a stock",
        type: "Q&A",
        qa: [
          {
            q: "Memorize this 2-minute stock pitch template",
            a:
              "'I recommend BUYING [Company] at current price ₹___ with a 12-month target of ₹___ (~___% upside).\n\n1) Investment Thesis: [Company] is the #2 player in the ___ sector. With tailwinds from ___ (e.g., premiumization / govt. policy / lower input costs), it will grow revenue at 15% CAGR for 3 years.\n\n2) Moat: Strong brand + distribution reach in rural India.\n\n3) Financials: ~28% ROE, debt-to-equity < 0.3, improving EBITDA margins from 12% → 16%.\n\n4) Valuation: Currently trading at 18x P/E vs sector average 25x — discount ~30%. PEG < 1.\n\n5) Key risks: Raw material price volatility, regulatory changes. Mitigated by…\n\nTarget price: Based on DCF + 20x exit multiple — ₹___.'",
          },
          { q: "Stock pitch example — HDFC Bank (if you want to learn structure)", a: "Buy HDFC Bank at ₹1,500, target ₹1,800. Thesis: #1 private bank, CASA ratio ~50%, NIM > 4%. Credit cost normalizing after merger. Currently 17x P/E vs 5-yr avg of 22x — re-rating candidate. Risks: NPA cycle, RBI action." },
        ],
      },
    ],
  },
  {
    id: "fin-technical",
    category: "Finance",
    icon: "📉",
    title: "Technical Analysis Basics",
    summary: "Charts, candlesticks, indicators — asked in trading roles",
    items: [
      {
        title: "Core Assumptions of Technical Analysis",
        type: "Concept",
        content:
          "1) Market discounts everything — price reflects all available info\n2) Prices move in trends (not random)\n3) History repeats — human psychology creates recognizable patterns\n\nNote: Fundamental analysis = 'WHAT to buy'. Technical analysis = 'WHEN to buy'.",
      },
      {
        title: "Candlesticks 101",
        type: "Concept",
        content:
          "Each candle shows: Open, High, Low, Close (OHLC) for a time period.\n\nGreen (white / hollow): Close > Open — bullish\nRed (black / filled): Close < Open — bearish\n\nBody = Open ↔ Close\nWicks (shadows) = High and Low extremes\n\nKey patterns:\n• Hammer (lower long wick, small body at top): BOTTOM reversal\n• Shooting Star (upper long wick, small body at bottom): TOP reversal\n• Doji (open ≈ close): Indecision — possible trend reversal\n• Engulfing: A large candle that 'swallows' previous candle(s) — strong reversal signal",
      },
      {
        title: "Support & Resistance",
        type: "Concept",
        content:
          "Support: Price level where buyers consistently outnumber sellers → price bounces UP. Previous swing lows.\n\nResistance: Price level where sellers consistently outnumber buyers → price bounces DOWN. Previous swing highs.\n\nOnce broken:\n• Old resistance becomes new support\n• Old support becomes new resistance\n\nTrend lines: Connect higher lows (uptrend) or lower highs (downtrend). Price breaking the trend line = trend change warning.",
      },
      {
        title: "Top Indicators",
        type: "Concept",
        content:
          "Moving Averages (MA / EMA):\n• 200-day MA = long-term trend filter\n• 50-day MA = medium term\n• 50-day crossing ABOVE 200-day = Golden Cross (bullish)\n• 50-day crossing BELOW 200-day = Death Cross (bearish)\n\nRSI (Relative Strength Index, 0-100):\n• > 70 = Overbought → might correct\n• < 30 = Oversold → might bounce\n• Divergence: Price makes higher high but RSI makes lower high = bearish divergence → top incoming\n\nMACD: Line + signal line. Line crossing signal from BELOW = buy. From ABOVE = sell.\n\nVolume: Confirm price moves on HIGH volume; suspect moves on LOW volume.",
      },
      {
        title: "Interview Q&A",
        type: "Q&A",
        qa: [
          { q: "Fundamental vs Technical analysis — which wins?", a: "Depends on holding period! Long-term investor (3+ years): Fundamental. Short-term trader (days/weeks): Technical. Best combo: use fundamentals to pick, technicals to time entry/exit." },
          { q: "What is a 'Golden Cross'?", a: "When the 50-day moving average crosses UP through the 200-day moving average. Classic bullish signal for long-term trend change." },
          { q: "RSI is 78 — buy or wait?", a: "WAIT. RSI > 70 is overbought — stock may correct or consolidate. Better entry would be after a pullback or RSI cooling to 40-50." },
          { q: "What is 'volume confirmation'?", a: "If stock breaks above resistance on HIGH volume (2x avg) = genuine breakout. If on LOW volume = likely a false breakout — avoid chasing.",
          },
        ],
      },
    ],
  },
  {
    id: "fin-capm",
    category: "Finance",
    icon: "📐",
    title: "CAPM, WACC, Capital Budgeting",
    summary: "Project finance + cost of capital — must-know for FP&A roles",
    items: [
      {
        title: "CAPM — Cost of Equity",
        type: "Formula",
        content:
          "Re = Rf + β × (Rm − Rf)\n\nRf = risk-free rate (10-yr G-Sec ~7%)\nβ = systematic risk of stock\nRm − Rf = Equity Risk Premium (5-7% for India)\n\nExample: Rf = 7%, β = 1.2, ERP = 6%\nRe = 7% + 1.2 × 6% = 14.2%",
      },
      {
        title: "WACC — Weighted Avg Cost of Capital",
        type: "Formula",
        content:
          "WACC = (E/V) × Re + (D/V) × Rd × (1 − T)\n\nE = market cap of equity\nD = market value of debt\nV = E + D\nRd = pre-tax cost of debt\nT = corporate tax rate\n\nExample: E = 1000, D = 400, Re = 15%, Rd = 10%, T = 30%\nWACC = (1000/1400) × 15% + (400/1400) × 10% × 0.7\n     = 10.71% + 2.00% = 12.71%",
      },
      {
        title: "Capital Budgeting Decision Rules",
        type: "Concept",
        content:
          "1) NPV (Net Present Value): PV of inflows − PV of outflows.\n   Accept if NPV > 0. BEST single measure — tells you rupee wealth created.\n\n2) IRR (Internal Rate of Return): Discount rate that makes NPV = 0.\n   Accept if IRR > cost of capital.\n   Problem: Multiple IRRs possible for unconventional cash flows.\n\n3) Payback Period: Time to recover initial investment. Accept if < threshold.\n   Simple, but ignores cash flows after payback and time value of money.\n\n4) Discounted Payback: Same as payback but uses discounted CFs.\n\n5) Profitability Index = PV of CFs / Initial Investment. Accept if > 1.\n\nReal-world priority: NPV > IRR > Payback.",
      },
      {
        title: "Capital Budgeting Q&A",
        type: "Q&A",
        qa: [
          { q: "Project A: NPV = ₹10,000, IRR = 15%. Project B: NPV = ₹30,000, IRR = 12%. Cost of capital = 10%. Which if mutually exclusive?", a: "Choose Project B. NPV is the supreme rule for mutually exclusive projects — it maximizes total shareholder wealth. IRR can mislead when project sizes differ." },
          { q: "NPV = 0, should we accept?", a: "Indifferent point. Project earns exactly the cost of capital — it neither creates nor destroys wealth. In practice, you'd only accept if strategic reasons." },
          { q: "What is Capital Rationing?", a: "When a company has limited funds to invest but multiple positive-NPV projects. Rank by Profitability Index (NPV per ₹ invested) to maximize total NPV." },
          { q: "Sunk cost — include or exclude in NPV analysis?", a: "EXCLUDE. Sunk costs are already spent and irrelevant. Only FUTURE cash flows matter." },
        ],
      },
    ],
  },
  {
    id: "fin-mf",
    category: "Finance",
    icon: "🪙",
    title: "Mutual Funds & Capital Markets",
    summary: "Basics every finance student must know for wealth management roles",
    items: [
      {
        title: "Mutual Fund Categories",
        type: "Concept",
        content:
          "SEBI classification (2018):\n\nEquity Schemes (invest in stocks):\n• Large Cap (top 100 companies by market cap)\n• Mid Cap (101-250)\n• Small Cap (251+)\n• Multi Cap, Flexi Cap, Large & Mid Cap, Value, Contra, Dividend Yield, ELSS (3-yr lock-in, tax benefit)\n\nDebt Schemes (bonds / fixed income):\n• Overnight, Liquid, Ultra Short, Short Duration, Medium Duration, Long Duration, Dynamic Bond, Gilt, Credit Risk, etc.\n\nHybrid: Balanced Advantage (dynamic asset allocation), Aggressive Hybrid (75% equity), Conservative Hybrid\n\nSolution-oriented: Retirement, Children's (5 year lock-in)\n\nIndex Funds / ETFs: Track Nifty 50 / Sensex",
      },
      {
        title: "Key Terms",
        type: "Formula",
        content:
          "NAV = (Total Assets − Total Liabilities) / Number of Outstanding Units\n\nExpense Ratio = Annual fund expenses / Average fund assets (lower is better)\nAMC = Asset Management Company (e.g., HDFC AMC, SBI Funds)\nSIP = Systematic Investment Plan (monthly auto-invest)\nSTP = Systematic Transfer Plan (shift between funds)\nSWP = Systematic Withdrawal Plan\n\nExit Load = Fee if you redeem before specified period\n\nActive Return = Fund return − Benchmark return\nAlpha = Active return adjusted for beta risk\n\nHow AMCs make money: Expense ratio × AUM (asset under management)",
      },
      {
        title: "IPO Process",
        type: "Concept",
        content:
          "IPO = company issues shares for the first time to public.\n\nProcess:\n1) Company hires a merchant banker (e.g., Kotak, Axis Capital)\n2) DRHP filed with SEBI (Draft Red Herring Prospectus)\n3) SEBI approval, then roadshows to big investors (FII, mutual funds)\n4) Price band decided (e.g., ₹2,000-2,100)\n5) 3-day issue window\n6) Allotment after basis of allotment\n7) Listing on BSE/NSE (T+3 now)\n\nCategories in IPO:\n• QIB (Qualified Institutional Buyers) — 50% reserved\n• NII (Non-Institutional, HNIs) — 15% reserved\n• Retail (≤ ₹2 lakh) — 35% reserved\n\nAnchor Investors: Large QIBs who invest before issue opens — signals confidence.",
      },
      {
        title: "Capital Markets Q&A",
        type: "Q&A",
        qa: [
          { q: "Difference between Primary and Secondary market?", a: "Primary: New securities issued (IPO, FPO). Company gets money. Secondary: Buying/selling existing securities on exchanges (NSE/BSE). Money goes from one investor to another — company is not involved." },
          { q: "What is an Index? How is Nifty 50 calculated?", a: "Index = basket of representative stocks. Nifty 50 = top 50 large-cap Indian stocks, weighted by FREE-FLOAT market capitalization (not total market cap). So a stock's weight = free-float cap / total of all 50." },
          { q: "Mutual Fund with 2% expense ratio vs 0.5% — which is better?", a: "Depends! Index funds should have LOW expense ratio (0.1-0.5% is ideal for Nifty 50 index fund). Active funds: if fund consistently beats benchmark by 3-4% AFTER expense, then 1.5-2% is acceptable. Otherwise, cheaper is better — every 1% extra cost compounds over decades." },
          { q: "What is SEBI's role?", a: "Regulator of securities market in India. Protects investors' interests. Regulates stock exchanges, brokers, mutual funds, FIIs, insider trading, etc." },
          { q: "Difference between FII and DII?", a: "FII = Foreign Institutional Investor (foreign mutual funds, hedge funds, pension funds investing in India). DII = Domestic Institutional Investor (LIC, mutual funds, banks, insurance companies). When FIIs sell heavily, markets fall — but DIIs (especially mutual funds via SIPs) are now stabilizing force." },
        ],
      },
    ],
  },
  {
    id: "fin-risk",
    category: "Finance",
    icon: "⚠️",
    title: "Risk Management & Performance Ratios",
    summary: "VaR, Sharpe, Beta — for Risk Analyst roles",
    items: [
      {
        title: "Types of Financial Risk",
        type: "Concept",
        content:
          "Market Risk: Loss from changes in prices, interest rates, FX\nCredit Risk: Counterparty fails to pay (default)\nLiquidity Risk: Cannot sell asset quickly without big discount\nOperational Risk: Loss from failed processes, people, systems, fraud\n\nSub-types: Interest rate risk, FX risk, commodity risk, concentration risk, systemic risk",
      },
      {
        title: "Value at Risk (VaR)",
        type: "Concept",
        content:
          "VaR answers: 'What's the maximum I can lose with X% confidence in Y days?'\n\nExample: 1-day 95% VaR = ₹1 crore means: 95% of the time, daily loss ≤ ₹1 crore. In 5% of days (≈ 12 trading days/year), loss > ₹1 crore.\n\n3 methods to calculate VaR:\n1) Variance-Covariance (parametric): assumes normal distribution\n2) Historical Simulation: use actual past returns\n3) Monte Carlo Simulation: simulate thousands of scenarios\n\nCVaR (Conditional VaR / Expected Shortfall): Average loss WHEN VaR is breached — better than VaR alone.",
      },
      {
        title: "Portfolio Performance Ratios",
        type: "Formula",
        content:
          "Sharpe Ratio = (Portfolio Return − Risk-Free Rate) / Portfolio Std Dev\n  → Excess return per unit of TOTAL risk. Higher = better. Sharpe > 1 = good, > 2 = very good.\n\nSortino Ratio = (Return − Rf) / Downside Std Dev\n  → Like Sharpe but only penalizes DOWNWARD volatility. Better for asymmetrical returns.\n\nTreynor Ratio = (Return − Rf) / Beta\n  → Excess return per unit of SYSTEMATIC (market) risk. Use when portfolio is well-diversified.\n\nJensen's Alpha = Actual Return − [Rf + β(Rm − Rf)]\n  → Excess return over CAPM prediction. Positive alpha = fund manager beat the market (adjusted for beta risk). This is THE metric to judge fund manager skill.",
      },
      {
        title: "Risk Q&A",
        type: "Q&A",
        qa: [
          { q: "Sharpe ratio of a fund is 1.8 — what does it mean?", a: "For every 1 unit of total risk (volatility), fund earned 1.8 units of excess return over risk-free rate. 1.8 is solid — suggests good risk-adjusted performance." },
          { q: "If a fund has negative alpha, should you invest?", a: "No. Negative alpha means the fund UNDERPERFORMED its benchmark after adjusting for beta risk. You'd be better off in a low-cost index fund of similar beta." },
          { q: "VaR at 95% is ₹2 crore. Does that mean maximum loss is ₹2 crore?", a: "No — it means 95% of the time loss ≤ ₹2 crore. In the remaining 5% of cases, loss CAN be MUCH higher than ₹2 crore. VaR doesn't say anything about tail losses. That's why CVaR is better." },
          { q: "Difference between Beta and Standard Deviation?", a: "Std Dev = TOTAL risk (systematic + unsystematic). Measures volatility of the investment itself. Beta = only SYSTEMATIC (market) risk — sensitivity vs market. For a well-diversified portfolio, unsystematic risk is eliminated and beta ≈ relevant measure." },
          { q: "What is diversification?", a: "Spreading investments across different asset classes/sectors/stocks to reduce risk without proportionally reducing return. 'Don't put all eggs in one basket.' Works because assets don't move perfectly together (low/negative correlation reduces portfolio variance). However, systematic (market) risk CANNOT be diversified away.",
          },
        ],
      },
    ],
  },
  {
    id: "fin-ibanking",
    category: "Finance",
    icon: "🏦",
    title: "Investment Banking & M&A Basics",
    summary: "For front-office finance roles paying 15-25 LPA",
    items: [
      {
        title: "What does an IB do?",
        type: "Concept",
        content:
          "Investment Bank acts as INTERMEDIARY between companies needing capital and investors with capital.\n\nCore services:\n1) Capital Raising: IPOs, FPOs, Rights Issues, Debt issuances\n2) M&A Advisory: Buy-side, Sell-side, Mergers, Acquisitions\n3) Advisory: Restructuring, corporate strategy\n4) Underwriting: Guaranteeing IPO sale (risk-bearing)\n\nKey roles: Analyst → Associate → VP → Director → MD\n\nFront office (revenue-generating): M&A, ECM, DCM, Sales & Trading, Research\nMiddle office: Risk, Compliance, Treasury\nBack office: Operations, IT, Finance",
      },
      {
        title: "M&A Types",
        type: "Concept",
        content:
          "By direction:\n• Horizontal: Competitor merger (Vodafone + Idea)\n• Vertical: Supplier / Customer merger (e.g., a car company buying a parts supplier)\n• Conglomerate: Unrelated businesses (e.g., Reliance into retail, telecom, oil)\n\nBy form:\n• Friendly: Both boards agree\n• Hostile: Target's board opposes; buyer goes to shareholders directly\n• Reverse Merger: Private company goes public via merging with listed shell\n\nAcquisition Structures:\n• Share Purchase: Buy shares of target (simpler, but inherit all liabilities)\n• Asset Purchase: Select which assets to buy (cleaner, but complex and tax implications)",
      },
      {
        title: "Synergy in M&A",
        type: "Formula",
        content:
          "Synergy = Value(Combined) − [Value(A) + Value(B)]\n\nSynergies are THE reason companies merge. Two types:\n\n1) Revenue Synergies: Cross-selling, higher prices, new markets. Harder to achieve but valuable.\n\n2) Cost Synergies: Layoffs (redundant jobs), shared IT/HR, bulk purchasing. Easier to achieve.\n\nIf deal value paid exceeds [Value(B) + Synergies] → overpaid → deal destroys value.\n\nAccretion/Dilution Analysis:\n• If pro-forma EPS > Acquirer's pre-deal EPS → ACCRETIVE (good)\n• If pro-forma EPS < Acquirer's pre-deal EPS → DILUTIVE (bad)\n\nGenerally: Using stock to acquire → more likely dilutive (more shares). Using cash → more likely accretive (interest cost is usually lower than earnings yield).",
      },
      {
        title: "IB Interview Q&A",
        type: "Q&A",
        qa: [
          { q: "Why Investment Banking?", a: "Keep it short and genuine: 'I want to work on real, high-stakes transactions. I enjoy the rigor of modeling, the intensity of deal-making, and learning from sharp people. Long-term, I want to specialize in [sector: e.g., BFSI/Infrastructure/Retail] M&A.' — do NOT say 'for the money' or 'because it's prestigious'." },
          { q: "Walk me through a pitch book", a: "Typical structure: 1) Cover page with team & credentials 2) Situation overview & market context 3) Valuation analysis (trading comps, transaction comps, DCF) 4) Strategic alternatives & recommendations 5) Transaction structure 6) Execution plan 7) Fees & timeline. Basically, a sales document showing why client should hire YOU." },
          { q: "How do you value a private company?", a: "Same framework but harder: no public share price, limited disclosures, illiquidity discount. Use: 1) Comparable company analysis (trading comps) using public peers 2) Precedent transactions of similar size 3) DCF using industry WACC. Then apply 20-30% illiquidity discount (can't sell quickly at fair value)." },
          { q: "What's the difference between Enterprise Value and Equity Value?", a: "Equity Value = price to buy just the equity (what shareholders own). EV = price to buy the WHOLE business (equity + debt − cash). When analyzing a company's operations (EBITDA multiples, DCF), use EV. When valuing only shareholders' stake (P/E, P/B), use Equity Value." },
          { q: "A company buys another for $100M — Walk me through 3 statements on Day 1", a: "Income Statement: NO change on day 1 (no operating activity yet). Balance Sheet: Assets up by $100M (Goodwill + fair value of assets acquired). Cash down by $100M (or Debt up if debt-financed, or Equity up if stock-financed). Cash Flow Statement: Investing Cash Flow shows $100M outflow for acquisition. Financing section shows inflow from debt/equity issuance if used. The financing of the deal determines the exact changes." },
          { q: "Which valuation method gives the highest value?", a: "Typically (highest to lowest): 1) Precedent Transactions (usually include takeover premium + synergy expectations) 2) DCF (optimistic assumptions can push value up) 3) Trading Comps (market value of peers) 4) Book Value (usually lowest for healthy companies). But this can flip — DCF can be lowest if pessimistic." },
        ],
      },
    ],
  },
  {
    id: "fin-nbfc",
    category: "Finance",
    icon: "🏛️",
    title: "Indian Banking & NBFC — Sector Knowledge",
    summary: "Critical for credit analyst, banking roles, and interviews on Indian context",
    items: [
      {
        title: "RBI & Monetary Policy",
        type: "Concept",
        content:
          "RBI = Reserve Bank of India, India's central bank (est. 1935, nationalized 1949).\n\nKey functions:\n1) Monetary policy: control inflation + growth\n2) Issue currency (except ₹1 note + coins — MoF)\n3) Banker to banks and to government\n4) Foreign exchange management (FEMA)\n5) Supervision / regulation of banks & NBFCs\n\nMPC (Monetary Policy Committee): 6 members (3 from RBI, 3 appointed by GoI) — sets repo rate bi-monthly.\n\nKey rates (as of 2024):\n• Repo Rate: 6.5% (rate at which banks borrow from RBI) ← KEY policy rate\n• Reverse Repo: ~3.35% (RBI borrows from banks)\n• SDF (Standing Deposit Facility): 6.25%\n• MSF (Marginal Standing Facility): 6.75%\n• CRR (Cash Reserve Ratio): 4.5% — fraction of deposits banks must keep with RBI (no interest)\n• SLR (Statutory Liquidity Ratio): 18% — fraction in govt securities\n\nRBI Stance: 'Withdrawal of Accommodation' → fighting inflation. Target CPI: 4% ± 2% band (2-6%).",
      },
      {
        title: "Bank Financials — Key Terms",
        type: "Formula",
        content:
          "For a bank, income is NOT 'revenue' — it's:\n• Net Interest Income (NII) = Interest Income − Interest Expense  ← MOST IMPORTANT\n• Non-Interest Income = Fees, commissions, trading gains\n\nNet Interest Margin (NIM) = NII / Average Earning Assets   (Best measure of bank profitability. 3.5-4% = strong)\n\nCASA Ratio = (Current A/c + Savings A/c Deposits) / Total Deposits\n• Higher CASA = lower cost of funds = higher margins\n• SBI ~45%, HDFC Bank ~48%, Kotak ~53%\n\nAsset Quality:\n• Gross NPA Ratio = Gross NPAs / Total Advances   (below 2% is excellent)\n• Net NPA Ratio = Net NPAs / Total Advances\n• PCR (Provision Coverage Ratio) = Provisions / Gross NPAs   (70%+ required ideally)\n\nKey Banking Ratios:\n• Capital Adequacy Ratio (CAR) = (Tier 1 + Tier 2 Capital) / Risk-Weighted Assets. Min 11.5% as per Basel III.\n• Tier 1 CAR = highest-quality (equity) capital / RWA\n• ROA = PAT / Total Assets — for banks, 1%+ is excellent\n• ROE — 15-20% is great",
      },
      {
        title: "NBFC vs Bank",
        type: "Concept",
        content:
          "NBFC (Non-Banking Financial Company) registered under Companies Act, regulated by RBI.\n\nSimilar to banks: lends, accepts deposits (only NBFCs rated 'investment grade' and with min ₹100 Cr net worth can accept public deposits).\n\nDifferences from banks:\n1) Cannot issue demand deposits (savings/current accounts) — no cheque facility\n2) NBFCs do NOT form part of payment and settlement system\n3) NBFC depositors do NOT have Deposit Insurance (DICGC) protection\n4) NBFCs can lend for activities banks are restricted from (e.g., margin funding for stocks)\n5) Lower regulatory burden vs banks (but RBI tightening)\n\nNBFC types in India:\n• Asset Finance Company (AFC) — vehicle, equipment loans\n• Investment Company\n• Loan Company — personal/gold/business loans (Bajaj, Muthoot)\n• Infrastructure Finance Company (IFC)\n• Non-Operative Financial Holding Company (NOFHC)\n• Housing Finance Companies (HFC) — now regulated by RBI\n\nTop NBFCs: Bajaj Finance, HDFC (now merged with HDFC Bank), L&T Finance, Cholamandalam, Shriram Finance, Muthoot.\n\nNBFC Crisis (2018): IL&FS default → DHFL default → Yes Bank crisis → RBI tightened NBFC regulations significantly.",
      },
      {
        title: "Banking & NBFC — Interview Q&A",
        type: "Q&A",
        qa: [
          { q: "Explain NPA in simple terms", a: "A loan becomes NPA (Non-Performing Asset) when borrower stops paying principal or interest for 90+ days. It's a 'bad loan'. Provisioning (setting aside money) eats into bank profits — that's why NPAs matter so much for bank stocks." },
          { q: "If repo rate rises, what happens to bank NIM?", a: "Depends! If bank's loans reprice faster than deposits → NIM expands (good). If deposits reprice faster (or bank holds lots of long-maturity fixed loans) → NIM compresses (bad). Also, higher rates can push marginal borrowers into default, raising NPAs." },
          { q: "Why do banks fail? Recent Indian examples?", a: "3 main reasons: 1) Gross NPAs from reckless corporate lending (e.g., Yes Bank's big exposure to DHFL/IL&FS-adjacent groups) 2) Asset-Liability Mismatch — funding long-term loans with short-term deposits (IL&FS) 3) Governance failure (PMC Bank). Resolution: RBI moratorium + merger with stronger bank (SBI for Yes Bank, HDFC for crisis HFCs) or write-off." },
          { q: "What is CRR and SLR in plain English?", a: "CRR: Banks keep 4.5% of deposits as cash with RBI (earns zero interest) — forces banks to stay liquid. SLR: Banks invest 18% in government bonds — forces banks to lend to government. Both are regulatory tools to control credit creation and ensure bank safety." },
          { q: "CASA 50% vs 30% — which bank has better profitability?", a: "50% CASA bank. Current/Savings deposits cost the bank only 2-3% (savings rate), while fixed deposits cost 6-7%. Higher CASA means lower 'cost of funds' → higher NIM → higher profitability. This is why HDFC Bank and Kotak are premium banking stocks." },
          { q: "What is PCA framework by RBI?", a: "Prompt Corrective Action. RBI imposes restrictions (no new lending, no dividend, management changes) on banks breaching thresholds for Capital, NPAs, or ROA. Designed to prevent bank failure. Recently tightened; many PSBs moved out of PCA in 2022-24 as NPAs declined." },
          { q: "Credit Analyst Interview: How do you decide if a company should get a loan?", a: "Use the 5 Cs: 1) Character (management, past repayment record — CIBIL/Credit Rating) 2) Capacity (ability to repay — DSCR > 1.2, interest coverage > 3) 3) Capital (owner's stake in business) 4) Collateral (secondary repayment source — value, liquidity) 5) Conditions (industry/economic outlook). Output: credit rating + approved limit + pricing (spread over benchmark)." },
        ],
      },
    ],
  },
];

// ============ ANALYTICS MODULES ============

const analyticsModules: LearningModule[] = [
  {
    id: "ana-excel",
    category: "Analytics",
    icon: "📊",
    title: "Excel for Finance & Analytics",
    summary: "The #1 tool every finance analyst uses daily — master these functions",
    items: [
      {
        title: "10 Most-Used Functions (memorize all)",
        type: "Formula",
        content:
          "1) =SUM(range) — total of a range\n2) =SUMIF(range, criteria, sum_range) — sum with 1 condition\n3) =SUMIFS(sum_range, range1, crit1, range2, crit2) — sum with MULTIPLE conditions\n4) =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]) — find in columns\n   Pro tip: Always use FALSE (or 0) for exact match!\n5) =INDEX(table, row_num, col_num) + =MATCH(lookup_value, range, 0) — BEST combo. Replaces VLOOKUP.\n   =INDEX(return_range, MATCH(lookup_value, lookup_range, 0))\n6) =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found]) — modern replacement (Office 365). Can look left OR right.\n7) =IF(condition, true_value, false_value) — logic test. Can nest: =IF(A1>100,'Big', IF(A1>50,'Medium','Small'))\n8) =IFS(cond1, val1, cond2, val2, ...) — cleaner multiple IFs (Office 306)\n9) =AVERAGE, =COUNT, =COUNTA, =COUNTIF, =COUNTIFS — stats\n10) =ROUND(number, decimals), =ROUNDUP, =ROUNDDOWN\n\nExcel Shortcuts (memorize):\n• Ctrl + C / Ctrl + V = Copy/Paste\n• Ctrl + Z / Ctrl + Y = Undo/Redo\n• Ctrl + Arrow Key = Jump to end of data\n• Ctrl + Shift + Arrow = Select range\n• Ctrl + ; = Insert today's date\n• F2 = Edit cell\n• F4 = Toggle absolute reference ($A$1 vs A1)\n• Alt + = = Auto SUM\n• Ctrl + Home = Go to A1\n• Ctrl + Shift + L = Toggle filters\n• Alt + F1 = Insert chart\n• Ctrl + T = Convert to Table (life-changing!)\n• Ctrl + Shift + PivotTable = Pivot (actually, Alt+N+V+T)",
      },
      {
        title: "Financial Functions — Interview Favorites",
        type: "Formula",
        content:
          "=NPV(rate, value1, value2, ...) — Net Present Value of future cash flows at given discount rate.\n   Note: NPV assumes FIRST cash flow happens at period 1, not 0! If your initial investment is at time 0, add it OUTSIDE NPV: =NPV(10%, B3:B10) + B2\n\n=XNPV(rate, cash_flows, dates) — NPV with irregular dates (REAL WORLD uses this, not NPV)\n\n=IRR(range) — Internal Rate of Return (rate that makes NPV=0). Works for regular intervals.\n\n=XIRR(cash_flows, dates) — IRR with specific dates. Use this for real portfolios (stocks bought at different times).\n\n=MIRR(range, finance_rate, reinvest_rate) — Modified IRR. Realistic because it assumes intermediate CFs reinvested at WACC, not at project IRR.\n\n=PV(rate, nper, pmt, [fv], [type]) — Present Value\n=FV(rate, nper, pmt, [pv], [type]) — Future Value\n\n=PMT(rate, nper, pv, [fv], [type]) — Monthly loan payment. E.g., =PMT(9%/12, 240, -5000000) = monthly EMI for ₹50L loan at 9% for 20 yrs.\n\n=PMT gives total monthly installment.\n=IPMT(rate, per, nper, pv) = interest component of a specific period's EMI\n=PPMT(rate, per, nper, pv) = principal component of a specific period's EMI\n\n=CAGR formula manually = (End/Start)^(1/n) − 1. Excel has =RRI(nper, pv, fv) for this.",
      },
      {
        title: "Pivot Tables in 5 Steps",
        type: "Concept",
        content:
          "Step 1: Click anywhere in your dataset → Ctrl+A to select → Ctrl+T to convert to an Excel Table (IMPORTANT — makes dynamic).\n\nStep 2: Alt+N+V or Insert tab → Pivot Table. Select 'New Worksheet'.\n\nStep 3: Drag fields into 4 areas:\n• ROWS: What you want rows to be (e.g., Region, Product)\n• COLUMNS: Column headers (e.g., Year, Month)\n• VALUES: What you want to aggregate (Revenue, Quantity). Defaults to SUM. Can change to COUNT, AVG, MAX, MIN by right-clicking → Summarize Values By.\n• FILTERS: What you want to filter by (e.g., Country)\n\nStep 4: Right-click Pivot → Refresh when source data changes.\n\nStep 5: Add slicers (PivotAnalyze tab → Insert Slicer) for interactive filtering, and timelines for date fields.\n\nUse 'Show Values As' to get % of total, running total, difference from previous, % difference — these make your pivot tables go from 'data dump' to 'insight'.",
      },
      {
        title: "Data Cleaning Essentials",
        type: "Concept",
        content:
          "Before any analysis, CLEAN your data! Spend 80% of time cleaning, 20% analyzing.\n\nCleaning steps:\n1) Remove duplicates: Data tab → Remove Duplicates\n2) Find & fix blank cells: Go To Special → Blanks → type 0 or 'N/A' → Ctrl+Enter\n3) Fix text: =TRIM(A1) removes extra spaces; =PROPER(A1) capitalizes first letter; =UPPER(), =LOWER(); =CLEAN(A1) removes non-printable chars\n4) Split columns: Text to Columns (Data tab) or =TEXTBEFORE/TEXTAFTER (Office 365)\n5) Fix dates: =DATEVALUE(text) + format cell as date. Or =TEXT(date, 'mmmm d, yyyy') to format\n6) Fix numbers: =VALUE(text) converts text number to number; remove commas with Find/Replace\n7) Handle outliers: Sort → find min/max → investigate. Use IOR/StdDev method to flag.\n8) Power Query: Data → Get & Transform (best tool for advanced cleaning in Excel): automated, repeatable steps.\n\nText functions cheat sheet:\n=LEFT(text, num_chars) → 'ABCDE' → LEFT(2) = 'AB'\n=RIGHT(text, num_chars) → RIGHT(2) = 'DE'\n=MID(text, start_num, num_chars) → MID(2, 3) = 'BCD'\n=LEN(text) → count of characters\n=FIND('x', text) → position of 'x' (case-sensitive)\n=SEARCH('x', text) → position of 'x' (case-insensitive)\n=SUBSTITUTE(text, old, new) → replace specific text\n=CONCAT(A1, ' ', B1) or =A1 & ' ' & B1 → combine\n=TEXTBEFORE(text, delimiter) / =TEXTAFTER(text, delimiter) — NEW in 365, game-changer!\n=TEXTSPLIT(text, delimiter) — splits into rows/columns",
      },
      {
        title: "Excel Exercise — solve this!",
        type: "Q&A",
        qa: [
          {
            q: "You have sales data: Column A=Date, B=Region, C=Product, D=Qty, E=Price. How do you find total revenue for North region, Product 'Laptop'?",
            a:
              "Quickest: Add Column F = D * E (Revenue per row). Then use SUMIFS:\n=SUMIFS(F:F, B:B, 'North', C:C, 'Laptop')\n\nBetter: Make Pivot Table. Drag Region to Filters, Product to Rows, Revenue to Values. Select North in filter → done.\n\nDynamic (Office 365): =SUMPRODUCT((B:B='North')*(C:C='Laptop')*(D:D)*(E:E))",
          },
          {
            q: "VLOOKUP vs INDEX-MATCH — which is better and why?",
            a:
              "INDEX-MATCH is BETTER, always:\n1) VLOOKUP can only look from LEFT column → INDEX-MATCH looks anywhere\n2) VLOOKUP breaks if you insert a column between lookup and return column (column index becomes wrong) → INDEX-MATCH never breaks\n3) INDEX-MATCH is actually FASTER on large datasets\n4) For horizontal data, VLOOKUP needs HLOOKUP → INDEX-MATCH works both ways\n\nOnly use VLOOKUP if your company has old-school standards. Otherwise, INDEX(XLOOKUP) is the new modern standard.",
          },
          {
            q: "Calculate CAGR: Revenue grew from ₹100 Cr (2019) to ₹180 Cr (2024). CAGR = ?",
            a:
              "CAGR = (End / Start)^(1/n) − 1 = (180/100)^(1/5) − 1\n= 1.8^0.2 − 1 = 1.1247 − 1 = 12.47%\n\nIn Excel: =RRI(5, 100, 180) = 12.47%\nOr: =POWER(180/100, 1/5) − 1",
          },
          {
            q: "₹50,00,000 home loan at 9.25% p.a. for 20 years. EMI = ?",
            a:
              "=PMT(rate, nper, pv, [fv], [type])\nRate = 9.25%/12 per month = 0.007708\nnper = 20 × 12 = 240 months\npv = ₹50,00,000 (as negative)\n\n=PMT(9.25%/12, 240, -5000000) = ₹45,935/month\n\nTotal paid over 20 years = ₹45,935 × 240 = ₹1,10,24,400\nTotal interest = ₹1,10,24,400 − ₹50,00,000 = ₹60,24,400\n\nTry changing tenure to 15 years: EMI = ₹51,300 but total interest drops to ₹42,34,000.",
          },
        ],
      },
    ],
  },
  {
    id: "ana-sql",
    category: "Analytics",
    icon: "🗄️",
    title: "SQL — Top 20 Queries You Must Write Blindfolded",
    summary: "SQL is tested in ~80% of analytics + finance interviews. Practice all below.",
    items: [
      {
        title: "SQL Fundamentals",
        type: "Concept",
        content:
          "Read order (how DB actually runs query):\n1. FROM / JOIN — get base data\n2. WHERE — filter rows\n3. GROUP BY — aggregate\n4. HAVING — filter groups\n5. SELECT — compute columns, aliases\n6. ORDER BY — sort\n7. LIMIT — cap rows\n\nWrite order (what YOU type):\nSELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT\n\nGolden rule: WHERE filters ROWS before aggregation. HAVING filters GROUPS after aggregation.",
      },
      {
        title: "20 Practice Queries — Write, test, memorize",
        type: "Cheatsheet",
        content:
          "Schema for all queries:  employees(id, name, dept_id, salary, hire_date, manager_id)  departments(id, dept_name, location)\n\n1) Show all employees:\n   SELECT * FROM employees;\n\n2) Show names of employees earning > ₹80,000:\n   SELECT name FROM employees WHERE salary > 80000;\n\n3) Unique departments:\n   SELECT DISTINCT dept_id FROM employees;\n\n4) Top 5 highest paid employees:\n   SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5;\n\n5) Count employees per department:\n   SELECT dept_id, COUNT(*) AS emp_count FROM employees GROUP BY dept_id;\n\n6) Departments with > 10 employees:\n   SELECT dept_id, COUNT(*) FROM employees GROUP BY dept_id HAVING COUNT(*) > 10;\n\n7) Average salary by department (with dept names):\n   SELECT d.dept_name, AVG(e.salary) AS avg_salary FROM employees e JOIN departments d ON e.dept_id = d.id GROUP BY d.dept_name;\n\n8) Employees with their manager name (self-join):\n   SELECT e.name AS emp, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;\n\n9) Employees hired after 2020-01-01:\n   SELECT name, hire_date FROM employees WHERE hire_date > '2020-01-01';\n\n10) Second highest salary in company:\n    SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);\n    -- OR with window fn: SELECT salary FROM (SELECT salary, RANK() OVER (ORDER BY salary DESC) r FROM employees) x WHERE r = 2;\n\n11) Employees who earn more than department average:\n    SELECT e.name, e.salary FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);\n\n12) Department total salary bill:\n    SELECT dept_id, SUM(salary) AS total FROM employees GROUP BY dept_id ORDER BY total DESC;\n\n13) Employees with no manager (CEO/top of chain):\n    SELECT name FROM employees WHERE manager_id IS NULL;  -- IMPORTANT: use IS NULL, not = NULL\n\n14) Total employees, total salary, avg salary across whole company:\n    SELECT COUNT(*) AS total_emp, SUM(salary) AS total_sal, ROUND(AVG(salary), 2) AS avg_sal FROM employees;\n\n15) Employees whose name starts with 'A':\n    SELECT name FROM employees WHERE name LIKE 'A%';\n\n16) Employees in departments 'Sales' or 'Finance' (IN operator):\n    SELECT e.name FROM employees e JOIN departments d ON e.dept_id = d.id WHERE d.dept_name IN ('Sales', 'Finance');\n\n17) Count of employees by year of joining:\n    SELECT EXTRACT(YEAR FROM hire_date) AS hire_year, COUNT(*) FROM employees GROUP BY hire_year ORDER BY hire_year;\n\n18) Running total of salaries (window function):\n    SELECT name, salary, SUM(salary) OVER (ORDER BY salary DESC) AS running_total FROM employees;\n\n19) Salary ranking within each department:\n    SELECT dept_id, name, salary, RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank FROM employees;\n\n20) Find duplicate rows in a table:\n    SELECT name, dept_id, COUNT(*) FROM employees GROUP BY name, dept_id HAVING COUNT(*) > 1;\n\nBonus — JOINS refresher:\n- INNER JOIN: only rows matching BOTH tables\n- LEFT JOIN: ALL rows from left table, matched from right (nulls if no match)\n- RIGHT JOIN: opposite of LEFT\n- FULL OUTER JOIN: everything from both tables\n- CROSS JOIN: Cartesian product (every row × every row)",
      },
      {
        title: "SQL Interview Q&A",
        type: "Q&A",
        qa: [
          { q: "WHERE vs HAVING — EXACT difference?", a: "WHERE filters individual rows BEFORE grouping/aggregation happens. HAVING filters groups AFTER aggregation. You cannot use aggregate functions (SUM/COUNT/AVG) in WHERE — they only make sense after GROUP BY. You CAN only use aggregates in HAVING. Order of execution: WHERE → GROUP BY → HAVING." },
          { q: "INNER JOIN vs LEFT JOIN?", a: "INNER JOIN: only rows where BOTH tables have a match. If an employee has no dept_id match, they disappear. LEFT JOIN: ALL rows from left table. Rows with no match get NULL for right-table columns. Use LEFT JOIN when you DON'T want to lose rows from the first table (e.g., show ALL employees, even those without a manager)." },
          { q: "COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column)?", a: "COUNT(*) = counts ALL rows, including NULLs in any column. COUNT(column) = counts rows where column is NOT NULL. COUNT(DISTINCT column) = counts UNIQUE non-null values. So COUNT(DISTINCT dept_id) gives number of distinct departments in the data." },
          { q: "How to find nth highest salary (not just 2nd)?", a: "Best: use window functions. For nth highest: SELECT DISTINCT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) r FROM employees) x WHERE r = n; Use DENSE_RANK (not RANK) to handle ties. Example: n=3 gives 3rd distinct highest salary." },
          { q: "What is a Primary Key? Foreign Key?", a: "Primary Key (PK): Column (or set of columns) that uniquely identifies each row in a table. Cannot be NULL. Must be unique. Each table has max one PK. Foreign Key (FK): Column in table B that refers to PK of table A. Enforces referential integrity — you cannot insert a dept_id in employees that doesn't exist in departments." },
          { q: "What is a Window Function (OVER clause)?", a: "Window functions perform calculations across a SET of rows related to current row — but unlike GROUP BY, they do NOT collapse rows. Each row keeps its identity. Syntax: function() OVER (PARTITION BY column ORDER BY column). Functions: ROW_NUMBER, RANK, DENSE_RANK, SUM, AVG, LAG, LEAD. This is THE most-asked advanced SQL concept in analyst interviews." },
          { q: "LAG vs LEAD?", a: "LAG(n): get value from n rows BEFORE current row in window. LEAD(n): get value from n rows AFTER current row. Used heavily for period-over-period analysis (compare this month's revenue to last month's revenue in same row)." },
          { q: "UNION vs UNION ALL?", a: "UNION: combines two SELECTs, removes duplicates. Slower. UNION ALL: combines two SELECTs, keeps all rows including duplicates. Faster. Always use UNION ALL unless you explicitly need de-duplication." },
          { q: "What is an INDEX in SQL?", a: "Like a book index — helps DB find rows FAST without scanning entire table. Huge performance difference on big tables. CREATE INDEX idx_name ON table(column); Too many indexes slow down writes (INSERT/UPDATE). Balance is key." },
        ],
      },
      {
        title: "SQL Exercise — for you to write",
        type: "Q&A",
        qa: [
          {
            q: "Table: orders(order_id, customer_id, order_date, amount, status). Write a query showing each customer's total order amount for 2024, only for customers with total > ₹10,000. Sort by total descending.",
            a:
              "SELECT customer_id, SUM(amount) AS total FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2024 AND status = 'completed' GROUP BY customer_id HAVING SUM(amount) > 10000 ORDER BY total DESC;",
          },
          {
            q: "How do you find customers who placed NO orders in 2024?",
            a:
              "Two ways:\n\n1) LEFT JOIN + NULL check:\nSELECT c.id, c.name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id AND EXTRACT(YEAR FROM o.order_date) = 2024 WHERE o.order_id IS NULL;\n\n2) NOT IN / NOT EXISTS:\nSELECT c.id, c.name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND EXTRACT(YEAR FROM o.order_date) = 2024);",
          },
          {
            q: "Show month-on-month revenue growth for 2024.",
            a:
              "WITH monthly AS ( SELECT EXTRACT(MONTH FROM order_date) AS m, SUM(amount) AS revenue FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2024 GROUP BY m ), with_prev AS ( SELECT m, revenue, LAG(revenue) OVER (ORDER BY m) AS prev_rev FROM monthly ) SELECT m, revenue, ROUND((revenue - prev_rev) * 100.0 / prev_rev, 2) AS growth_pct FROM with_prev;",
          },
        ],
      },
    ],
  },
  {
    id: "ana-powerbi",
    category: "Analytics",
    icon: "📈",
    title: "Power BI & Data Visualization Essentials",
    summary: "Build dashboards that get you hired — structure, DAX basics, design principles",
    items: [
      {
        title: "Power BI Workflow — 8 steps",
        type: "Concept",
        content:
          "1) GET DATA: Home → Get Data → choose source (Excel, CSV, SQL Server, web, etc.)\n2) TRANSFORM: Open Power Query Editor. Clean data: remove rows/columns, change types, filter, merge, unpivot\n3) MODEL: Go to Model view. Create relationships between tables (drag key columns). Usually a STAR schema (one fact table in center connected to dimension tables)\n4) MEASURES: Right-click → New measure. Write DAX calculations (these are POWER of Power BI)\n5) VISUALIZE: Report view. Drag visual (bar, line, card, matrix, KPI, donut, scatter). Drag fields to the visual\n6) INTERACT: Add slicers for filtering. Set up drill-through / tooltips\n7) FORMAT: Clean titles, colors (stick to 2-3 color palette + brand). Conditional formatting\n8) PUBLISH: Publish to workspace. Create App. Share with team.\n\nBest practice: 1 report, 1 story. Don't try to squeeze everything into one dashboard. Different dashboards for different audiences (C-suite summary vs operational details).",
      },
      {
        title: "Top 10 DAX Measures",
        type: "Formula",
        content:
          "DAX = Data Analysis Expressions. Formula language for Power BI measures.\n\n1) Total Sales = SUM(Sales[Amount])\n\n2) Total Cost = SUM(Sales[Cost])\n\n3) Profit = [Total Sales] − [Total Cost]\n\n4) Profit Margin = DIVIDE([Profit], [Total Sales], 0)  — third arg = fallback if div by 0\n\n5) YTD Sales = TOTALYTD([Total Sales], 'Date'[Date])  — requires a proper Date table\n\n6) YoY Sales Growth = VAR Current = [Total Sales] VAR Prev = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date])) RETURN DIVIDE(Current - Prev, Prev, 0)\n\n7) Previous Month Sales = CALCULATE([Total Sales], PREVIOUSMONTH('Date'[Date]))\n\n8) Average Order Value = DIVIDE([Total Sales], DISTINCTCOUNT(Sales[OrderID]))\n\n9) Running Total = CALCULATE([Total Sales], FILTER(ALL('Date'[Date]), 'Date'[Date] <= MAX('Date'[Date])))\n\n10) Top 5 Products by Sales = CALCULATE([Total Sales], TOPN(5, ALL(Products[ProductName]), [Total Sales]))\n\nKey DAX concepts:\n• CALCULATE = 'brain' of DAX — changes filter context\n• ALL vs ALLEXCEPT vs ALLSELECTED — remove/keep filters\n• VAR — define temp variables in a measure (cleaner code)\n• RELATED — bring column from one side of relationship to many side (like VLOOKUP in calculated columns)\n• Date table: Mark as Date table! Use CALENDARAUTO() to generate one.",
      },
      {
        title: "Design Rules for Good Dashboards",
        type: "Concept",
        content:
          "1) Put MOST IMPORTANT metric at TOP-LEFT (eye lands there first). Big KPI cards with a trend arrow.\n\n2) Limit to 3-5 KPIs at top. Then supporting detail charts below. Z-shaped reading pattern.\n\n3) Use consistent color palette. 2-3 main colors + gray. Never rainbow charts. Color should MEAN something (e.g., red = bad, green = good).\n\n4) One slicer panel on left OR top. Don't scatter slicers. Use 'Single select' slicers for cleaner filters.\n\n5) Bar charts for comparing categories. Line charts for time-series trends. Pie charts ONLY for 3-5 categories and showing parts-to-whole relationships (avoid generally — bar is clearer).\n\n6) Sort bar charts — always in descending order (so highest bar is at top, or left). It's easier on the eyes.\n\n7) Avoid 3D charts — they distort perception.\n\n8) Label values directly on chart OR use tooltip — never both cluttering the page.\n\n9) Title: ONE sentence that tells reader exactly what dashboard shows, with date range.\n\n10) Always add a 'Data as of' date footer.\n\nBonus: For FINANCE dashboards, show YoY comparison, variance to budget, and top/bottom performers — these are what CFOs look at first.",
      },
      {
        title: "Project Idea — Build This and Show Recruiters",
        type: "Concept",
        content:
          "Portfolio Project: 'Sales Performance Dashboard' (6-8 hours of work, shows everything interviewers want)\n\nDATA: Download Kaggle 'Sample Superstore' dataset (free, 10k rows, classic)\n\nStep 1: Import into Power BI. Clean in Power Query: check data types, remove errors, add a proper Date table with CALENDARAUTO()\n\nStep 2: Create measures:\n• Total Sales\n• Total Profit\n• Profit Margin\n• YoY Sales Growth\n• YoY Profit Growth\n• Avg Order Value\n• Top 5 Products\n\nStep 3: Create 4-page report:\nPage 1 — Executive Summary: 4 KPI cards + YoY bars + Top/Bottom Products\nPage 2 — Sales by Region: Map visual + regional bar chart + segment donut\nPage 3 — Product Analysis: Category drill-down, scatter of Sales vs Profit by product\nPage 4 — Customer Analysis: Top customers, discount analysis, ship-mode comparison\n\nStep 4: Apply consistent theme (e.g., blue primary, gray neutrals, red/green for variances)\n\nStep 5: Document in PDF — 'Dashboard Narrative': your approach, insights found (e.g., 'Tables sub-category is losing money'), recommendations\n\nStore this on: 1) GitHub repo with PDF report 2) Power BI Public workspace (publish and share link) 3) Share on LinkedIn with the narrative\n\nIn interviews, walk through: 'Problem → Data → Cleaning → Measures → Dashboard → Insights → Recommendations'. This is how you differentiate from 100s of candidates who only say 'I know Power BI'.",
      },
    ],
  },
  {
    id: "ana-stats",
    category: "Analytics",
    icon: "📐",
    title: "Statistics & Hypothesis Testing — Interview Essentials",
    summary: "You DON'T need PhD stats. But you must nail these conceptual questions.",
    items: [
      {
        title: "Descriptive Stats Every Analyst Should Know",
        type: "Formula",
        content:
          "Central Tendency:\nMean (μ or x̄) = Σx / n  — average. Affected by outliers.\nMedian = middle value when sorted. NOT affected by outliers → BEST for skewed data (income, house prices).\nMode = most frequent value. Use for categorical data.\n\nDispersion:\nRange = Max − Min\nVariance (σ²) = Σ(x − μ)² / N   (population) or / n-1 (sample, Bessel's correction)\nStandard Deviation (σ or s) = √Variance   — in same units as data, unlike variance\nCoefficient of Variation (CV) = SD / Mean   — compare volatility across assets with different prices\n\nPercentiles & Quartiles:\nQ1 = 25th percentile, Q2 = 50th (Median), Q3 = 75th\nIQR (Interquartile Range) = Q3 − Q1   — robust measure of spread\nOutliers by IQR rule: any value < Q1 − 1.5×IQR or > Q3 + 1.5×IQR\n\nShape:\nSkewness: measure of asymmetry. Positive skew (right tail long): mean > median (income). Negative skew (left tail long): mean < median.\nKurtosis: 'tailed-ness'. Leptokurtic (kurtosis > 3): fat tails = more extreme events (common in stock returns — this is why VaR using normal distribution underestimates true risk).",
      },
      {
        title: "Probability Distributions",
        type: "Concept",
        content:
          "Normal Distribution (Gaussian): Symmetric bell curve. ~68% data within μ ± 1σ, ~95% within μ ± 2σ, ~99.7% within μ ± 3σ.\n\nStandard Normal: μ = 0, σ = 1. Convert any normal to standard with z-score:\nz = (x − μ) / σ\n\nBinomial: n independent trials, each with success prob p. e.g., 'Probability of 7 heads in 10 coin flips'\n\nUniform: All outcomes equally likely in range.\n\nPoisson: Count of events in fixed interval (rate λ). e.g., 'Customers arriving per hour'\n\nCentral Limit Theorem (CLT): The sampling distribution of the MEAN becomes normal as sample size grows (n > 30), REGARDLESS of the original population distribution. This is WHY we can use normal-based tests even when original data isn't normal — as long as sample is big enough.",
      },
      {
        title: "Hypothesis Testing — the 5-step method",
        type: "Concept",
        content:
          "Step 1: State the hypotheses\nH₀ (Null Hypothesis): 'Status quo / no effect / no difference'. The thing you're trying to DISPROVE.\nH₁ or Hₐ (Alternative): 'There IS an effect / difference'. The thing you're trying to PROVE.\nNever have = in H₁. H₀ always has =, ≤, or ≥.\n\nStep 2: Choose significance level (α)\nCommon: α = 0.05 (5%). Sometimes 0.01 or 0.10.\nα = probability of Type I error (false positive: rejecting H₀ when it's actually true)\nβ = Type II error (false negative)\n\nStep 3: Choose test & compute test statistic\n• z-test: population SD known, n > 30 (theoretical)\n• t-test (Student's t): population SD unknown, estimated from sample (REAL WORLD: 95% of cases). One-sample t, two-sample t, paired t\n• Chi-square (χ²): Test association between 2 categorical variables (e.g., 'Gender vs Brand Preference')\n• ANOVA (F-test): Compare means of 3+ groups\n\nStep 4: Find p-value (or critical value)\np-value = probability of observing test-statistic AS EXTREME or more extreme than calculated, ASSUMING H₀ is true.\n\nStep 5: Decision\nIf p-value < α → REJECT H₀ ('statistically significant' result)\nIf p-value ≥ α → FAIL TO REJECT H₀ (not enough evidence)\n\nNEVER say 'accept H₀'. We only 'reject' or 'fail to reject'.",
      },
      {
        title: "Regression Basics — what every finance analyst knows",
        type: "Concept",
        content:
          "Simple Linear Regression:  y = β₀ + β₁ × x + ε\nβ₀ = y-intercept\nβ₁ = slope (change in y for 1 unit change in x)\nε = error term\n\nEstimated line: ŷ = b₀ + b₁x. Found by minimizing sum of squared errors (OLS — Ordinary Least Squares).\n\nCoefficient of Determination, R² = % of variation in y explained by the model. 0 ≤ R² ≤ 1. Higher = better fit. But adding more variables always raises R² — so use Adjusted R² which penalizes useless variables.\n\nAdjusted R² = 1 − [(1−R²)(n−1)/(n−k−1)] where k = # of predictors.\n\nInterpretation of coefficients: 'β₁ = 5 means: holding all else constant, for a 1-unit increase in x, y increases by 5 on average.'\n\nAssumptions of Linear Regression (LINE):\nL — Linearity (true relationship is linear)\nI — Independence of errors (no autocorrelation — check Durbin-Watson ≈ 2)\nN — Normality of errors\nE — Equal variance of errors (homoscedasticity, not heteroscedasticity)\n\np-value for each coefficient: tests if that predictor is statistically significant. If p < 0.05, variable matters in explaining y.",
      },
      {
        title: "Interview Q&A — most asked",
        type: "Q&A",
        qa: [
          { q: "p-value = 0.03. Interpret it in plain English.", a: "If the null hypothesis (no effect) were actually true, the probability of seeing data THIS extreme or more extreme is only 3%. Since that's below our 5% threshold (α), we say the result is statistically significant and we reject H₀. In short: low p-value = strong evidence against null hypothesis." },
          { q: "What's more important: statistical significance or practical significance?", a: "Both! But practical matters MORE. With huge sample sizes, tiny irrelevant differences can become 'statistically significant' (p < 0.05) even though the effect is too small to matter for business decisions. Always ask: 'Is the effect SIZE big enough to be worth acting on?'. In finance, we care about ECONOMIC significance, not just statistical." },
          { q: "R² = 0.85. Is that 'good'?", a: "Depends entirely on field. In physics/engineering, 0.85 might be poor (they expect 0.99). In social science / finance / marketing with noisy human data, R² = 0.15-0.30 is often publishable-quality, and 0.85 would be ASTOUNDINGLY good. Don't judge in vacuum — compare to similar studies in your domain. In stock-return forecasting, R² of 5% would actually be impressive!" },
          { q: "Explain Type I vs Type II error with business example", a: "Type I (False Positive): You THINK a marketing campaign works but it doesn't. Cost: waste money continuing failed campaign. Type II (False Negative): You MISS a real effect — stop a campaign that actually worked. Cost: missed opportunity. Which is worse? Depends on cost! In cancer screening, Type II is catastrophic (miss a real cancer). In finance: both matter — you try to balance with appropriate α." },
          { q: "When to use t-test vs z-test?", a: "Use z-test only if: (1) population SD σ is known AND (2) n > 30. Otherwise (95% of real cases), use t-test — which accounts for using sample SD and works for small samples too. Both assume normality or large samples (CLT)." },
          { q: "R² is 0.70 and Adjusted R² is 0.55. What's happening and what does it mean?", a: "Adjusted R² << R² means you have too many PREDICTOR variables in your model, and some are not adding value. R² can only go UP when you add variables (even junk). Adjusted R² penalizes adding useless variables. Big gap = your model is OVERFITTING to noise with redundant features. Solution: remove variables with high p-values or use feature selection." },
          { q: "Confidence Interval: 95% CI for mean revenue is [₹1,200, ₹1,500]. What does this mean?", a: "If we collected 100 different samples and built 100 confidence intervals, ~95 of them would contain the TRUE population mean revenue. We are 95% confident the true mean is between ₹1,200 and ₹1,500. It does NOT mean '95% of revenues fall in this range' — that's a prediction interval, which is much wider. This distinction is heavily tested!" },
          { q: "How would you check if a dice is fair?", a: "Roll it 600 times, record counts per face. Use a Chi-Square Goodness-of-Fit test: H₀ = dice is fair (each face probability = 1/6). Expected frequency per face = 100. Compute χ² = Σ(Observed − Expected)² / Expected. Compare to critical χ² with 5 degrees of freedom (6-1). If χ² > critical value → reject H₀: dice is biased. This is the standard interview test for 'is a distribution what we expect?'.",
          },
        ],
      },
    ],
  },
  {
    id: "ana-python",
    category: "Analytics",
    icon: "🐍",
    title: "Python Pandas — Cheatsheet for Finance",
    summary: "15 most useful operations. For financial analyst roles, focus on pandas & matplotlib.",
    items: [
      {
        title: "Pandas Quick Reference",
        type: "Cheatsheet",
        content:
          "import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n1) Read data:\ndf = pd.read_csv('sales.csv')\ndf = pd.read_excel('file.xlsx', sheet_name='Sheet1')\n\n2) Quick look:\ndf.head(10)       # first 10 rows\ndf.tail()\ndf.shape           # (rows, cols)\ndf.info()          # dtypes + memory\ndf.describe()      # stats summary\ndf['col'].value_counts()\n\n3) Columns & selection:\ndf.columns\ndf.rename(columns={'Old': 'New'}, inplace=True)\ndf['Revenue'] = df['Qty'] * df['Price']        # new column\ndf = df.drop(['unwanted'], axis=1)              # drop col\n\nSelect subset of cols: df[['A', 'B', 'C']]\nFilter rows: df[df['Revenue'] > 1000]\nMultiple filters: df[(df['Year'] == 2024) & (df['Region'] == 'North')]\nSelect specific value: df.loc[row_label, col_label]\nSelect by position: df.iloc[0:10, 0:3]\n\n4) Handle missing data:\ndf.isna().sum()            # count NAs per col\ndf2 = df.dropna()          # drop rows with any NA\ndf['col'] = df['col'].fillna(df['col'].mean())  # fill with mean\ndf['col'] = df['col'].ffill()   # forward fill (for time series)\n\n5) Date handling:\ndf['Date'] = pd.to_datetime(df['Date'])\ndf = df.set_index('Date')         # great for time-series\ndf['Year'] = df.index.year\ndf['Month'] = df.index.month_name()\ndf.resample('M').sum()            # monthly aggregation\n\n6) Group by:\ndf.groupby('Region')['Revenue'].sum()\ndf.groupby(['Region', 'Product'])['Revenue'].agg(['sum', 'mean', 'count'])\ndf.groupby('Region').agg(TotalRev=('Revenue','sum'), AvgPrice=('Price','mean')).sort_values('TotalRev', ascending=False)\n\n7) Sorting:\ndf = df.sort_values('Revenue', ascending=False)\ndf.nlargest(10, 'Revenue')\n\n8) Merge / Join:\ncombined = pd.merge(orders, customers, on='customer_id', how='left')\n\n9) Pivot table:\npivot = df.pivot_table(values='Revenue', index='Region', columns='Year', aggfunc='sum', margins=True)\n\n10) Basic plot (matplotlib):\ndf.groupby('Month')['Revenue'].sum().plot(kind='line', figsize=(10, 4), title='Monthly Revenue')\nplt.tight_layout()\nplt.show()\n\ndf.groupby('Region')['Revenue'].sum().plot(kind='barh')  # horizontal bar\n\n11) Rolling window (finance):\ndf['MA20'] = df['Close'].rolling(window=20).mean()   # 20-day moving average\ndf['DailyReturn'] = df['Close'].pct_change()          # percent change\ndf['CumReturn'] = (1 + df['DailyReturn']).cumprod()  # cumulative\n\n12) String operations:\ndf['Name'].str.upper()\ndf['Name'].str.strip()\ndf[df['Name'].str.contains('Ltd', case=False)]\n\n13) Write output:\ndf.to_csv('output.csv', index=False)\ndf.to_excel('output.xlsx', sheet_name='Summary', index=False)\n\n14) Get unique values:\ndf['Region'].unique()\ndf['Region'].nunique()\n\n15) Apply function to column:\nimport math\ndf['LogRevenue'] = df['Revenue'].apply(math.log)\n\nOR use lambda for custom:\ndf['Category'] = df['Revenue'].apply(lambda x: 'High' if x > 5000 else 'Low')",
      },
      {
        title: "Finance-specific Mini Project in Python",
        type: "Concept",
        content:
          "Stock Analysis — build this in Jupyter Notebook:\n\n1) !pip install yfinance pandas matplotlib\n\n2) Download stock data:\nimport yfinance as yf\ntickers = ['RELIANCE.NS', 'HDFCBANK.NS', 'INFY.NS', 'NESTLEIND.NS']\ndata = yf.download(tickers, start='2019-01-01', end='2024-12-31')['Close']\n\n3) Calculate daily returns:\nreturns = data.pct_change().dropna()\n\n4) Performance table:\nprint('Annualized Return:', (1 + returns.mean()) ** 252 - 1)\nprint('Annualized Volatility:', returns.std() * (252 ** 0.5))\nprint('Cumulative Return:', (1 + returns).cumprod() - 1)\n\n5) 200-day moving average chart for RELIANCE:\nrel = yf.download('RELIANCE.NS', start='2019-01-01')['Close']\nrel_df = pd.DataFrame(rel)\nrel_df['MA50'] = rel_df['Close'].rolling(50).mean()\nrel_df['MA200'] = rel_df['Close'].rolling(200).mean()\nrel_df[['Close', 'MA50', 'MA200']].plot(figsize=(12, 5), title='Reliance — Moving Averages')\nplt.show()\n\n6) Correlation heatmap between stocks:\nimport seaborn as sns\nsns.heatmap(returns.corr(), annot=True, cmap='coolwarm')\nplt.title('Return Correlation')\nplt.show()\n\nThis is a solid mini-project. Make a PDF with: introduction, charts, interpretation of correlations, and a 'which stock is best' recommendation. Share on GitHub/LinkedIn with narrative. You can tell interviewers you did this during your placement prep and it demonstrates both finance knowledge + analytical skills.",
      },
      {
        title: "Python Interview Q&A (analyst level)",
        type: "Q&A",
        qa: [
          { q: "List vs Tuple in Python?", a: "Lists: [square brackets], MUTABLE (can add/remove items), slower. Tuples: (parentheses), IMMUTABLE (can't change after creation), faster. Use tuple for fixed data that shouldn't be accidentally changed (e.g., coordinates, database row). Use list for collections you'll modify." },
          { q: "What is a DataFrame in pandas?", a: "2-dimensional labeled data structure with rows and columns — like an Excel table or SQL table. Think dictionary of Series objects that share the same index. Has columns (variable names), index (row labels), and values (2D array)." },
          { q: ".loc vs .iloc — exact difference?", a: "This is the MOST asked pandas question. .loc = LABEL-based indexing. Uses row/column NAMES (df.loc['2024-01-01', 'Revenue']). .iloc = POSITION-based (integer-location). Uses numeric indexes starting from 0 (df.iloc[0, 2]). With .loc, slicing is INCLUSIVE on both ends. With .iloc, slicing is EXCLUSIVE on end (like Python lists)." },
          { q: "How to handle missing values in pandas?", a: "3 options: (1) REMOVE rows/columns with .dropna() — only if few missing and data is plentiful. (2) FILL with .fillna() — use mean (for normal numeric), median (for skewed data or with outliers), mode (for categorical), forward/back fill (for time series, .ffill() / .bfill()). (3) IMPUTE using model-based methods (KNN Imputer, MICE) — more advanced. Never blindly fill with 0 (distorts distribution). Always check df.isna().sum() first to see WHERE and HOW MUCH missing data exists." },
          { q: "How to do groupby in pandas like a Pivot Table?", a: "Step 1: df.groupby(['Region', 'Product'])['Revenue'].sum() — gives multi-index Series. Step 2: Use .agg() for multiple stats simultaneously: df.groupby('Region').agg(total=('Revenue','sum'), avg=('Price','mean'), count=('OrderID','nunique')). Step 3: .unstack() to pivot the multi-index into rows+columns 2D layout like a pivot table. Or use df.pivot_table(values='Revenue', index='Region', columns='Year', aggfunc='sum')." },
          { q: "What's the difference between pandas apply() and vectorized operations?", a: "Vectorized operations = FAST. Pandas is built on NumPy — operations like df['A'] + df['B'] or df['A'] * 2 run in optimized C code under the hood. Always prefer these! .apply() = SLOW. It runs a Python function row-by-row or column-by-column in a Python loop — fine for 100 rows but deadly for 1M rows. Rule of thumb: only use .apply() if there's NO vectorized way to do it. Common beginner mistake: using apply() for operations that could simply be df['new'] = df['A'] / df['B']." },
          { q: "What does resample() do and why is it useful in finance?", a: "resample() changes the frequency of time-series data. Convert daily stock prices to weekly, monthly or quarterly with df.resample('M').last() (get last price of month) or .mean() (average). Used heavily in finance to: compute monthly returns from daily data, aggregate high-frequency data to quarterly for reporting, and align different datasets to same frequency before correlation analysis. Common resample codes: 'D' daily, 'W' weekly, 'M' month end, 'Q' quarter end, 'Y' year end, 'MS' month start." },
        ],
      },
    ],
  },
];

// ============ ENGLISH MODULES ============

const englishModules: LearningModule[] = [
  {
    id: "eng-selfintro",
    category: "English",
    icon: "🎤",
    title: "Self Introduction Scripts — MEMORIZE these 3",
    summary: "Tell me about yourself is the first question. Master 3 versions.",
    items: [
      {
        title: "90-Second Elevator Pitch (standard interview)",
        type: "Script",
        content:
          "'Good morning / afternoon, sir / ma'am. Thank you for this opportunity.\n\nMy name is Sumit Singh. I am a PGDM student at [College Name], specializing in FINANCE with a minor in Business Analytics. I will be graduating in [Month Year].\n\nBefore my PGDM, I completed my [graduation name, e.g., B.Com] from [University]. During that time, I developed an interest in how businesses make investment decisions — which is why I chose finance for my PGDM.\n\nOver the past [1.5 years], I have strengthened my skills in financial analysis, ratio analysis, equity research, and valuation. On the analytics side, I am comfortable working with advanced Excel, SQL, and Power BI. I recently completed a stock valuation project on [Company X] where I built a 3-statement projection model and arrived at a target price of ₹___.\n\nI am particularly interested in the role of an Equity Research Analyst / Financial Analyst because it combines my strengths: number-crunching, logical thinking, and attention to detail. I am looking for an organization where I can contribute to real business decisions and grow my expertise in finance.\n\nOutside academics, I [1 personal trait: e.g., read business news daily / follow markets / have a small personal investment portfolio]. This habit keeps me grounded in the practical side of finance.\n\nThat's a brief about me. I'd be happy to answer any questions you have.'\n\nPRACTICE TIP: Record yourself on phone. Do NOT memorize word-by-word (you'll sound robotic). Memorize the structure and key points. Speak it every morning in mirror 3 times — till it sounds NATURAL.",
      },
      {
        title: "30-Second Version (for Group Discussion intro or elevator)",
        type: "Script",
        content:
          "'Hi, I'm Sumit. I'm a PGDM Finance student at [College] with a strong interest in equity research and financial modeling. I've recently done a valuation project on [Sector/Company] and I'm comfortable with Excel modeling, SQL, and Power BI dashboards. I'm looking to start my career as a Financial Analyst in an organization that values data-driven decision-making.'",
      },
      {
        title: "2-Minute Detailed Version (for HR round)",
        type: "Script",
        content:
          "'I grew up in [City/Town]. I was always good at mathematics and logical subjects — which made me choose commerce in 11th grade. I did my [B.Com / BBA] from [College/University] and graduated with [mention % / CGPA if > 7].\n\nDuring my graduation, I realized that while I was good at academics, I wasn't confident in my spoken English. So I deliberately started participating in debates, presentations, and college committees. I'm still improving, but I'm comfortable speaking in professional settings now.\n\nI chose PGDM because I wanted to learn how business decisions are actually made — not just theory. I chose FINANCE as my specialization because I enjoy analyzing numbers, and I believe finance is the backbone of every business. I added Business Analytics as a minor because I strongly believe that the future of finance is data-driven. Finance professionals who can work with data will have the best opportunities.\n\nDuring my PGDM, I completed a summer internship at [Company Name / mention project if none] where I worked on [describe 1-2 lines]. I also did a live project on [topic]. These experiences taught me how finance works in real companies, not just textbooks.\n\nMy strengths: I am diligent, I ask questions, and I follow through on what I start. My areas of improvement: public speaking and sometimes overthinking small decisions — but I'm working on both through consistent practice.\n\nMy short-term goal (next 3 years): Join a reputable firm as a Financial Analyst and learn the fundamentals of the job thoroughly. Long-term goal (5-10 years): Become a domain expert in [Equity Research / Risk / FP&A] and contribute to strategic decision-making.\n\nThat's me in a nutshell — a hard-working student who loves finance and wants to build a serious career in this field.'",
      },
      {
        title: "Body Language Tips while speaking",
        type: "Concept",
        content:
          "SIT STRAIGHT, shoulders back. Hands can rest on table. Do NOT fidget (pen clicking, leg shaking, hair touching — all are nervous tells).\n\nMaintain EYE CONTACT with all interviewers. If you're nervous, look at the BRIDGE of their nose instead of pupils — they won't know the difference.\n\nSMILE slightly when greeting. It makes you appear calm and confident (even if you're terrified inside — fake it till you make it).\n\nMODULATE your voice. Don't speak in monotone. Emphasize important words. Speak SLOWER than your instinct — nervous people speak too fast. Pause after important sentences.\n\nGESTICULATE when you speak (use hands to emphasize points). It releases nervous energy and makes you look more confident and expressive. Don't keep hands locked on your lap.\n\nVOICE MODULATION exercise: Read 1 news article aloud daily, but CHANGE your speed — fast for action parts, slow for serious parts. This trains your voice to have rhythm, which makes you 10× more engaging to listen to.",
      },
      {
        title: "Common mistakes & fixes",
        type: "Q&A",
        qa: [
          { q: "I forget my lines mid-introduction — what do I do?", a: "Do NOT panic. Do NOT say 'sorry I forgot' or 'let me start again'. Simply PAUSE for 2 seconds, take a breath, and continue from where you were. This happens to everyone occasionally. The interviewer won't even notice if you handle it calmly. Pro tip: don't memorize every word — memorize key points and the FLOW so you can recover easily." },
          { q: "My English is not fluent, how much will this hurt me?", a: "It will hurt — but only if you sound UNINTELLIGIBLE or HESITATE so much that the interviewer loses the thread of what you're saying. HOWEVER: most good Indian companies don't expect you to speak with a British or American accent. They expect you to be CLEAR, CONFIDENT, and RELEVANT. You can have a noticeable Hindi accent and still get a 15 LPA job. Focus on 3 things: (1) speaking slowly and clearly, (2) using correct grammar (especially tenses), (3) sounding confident — no 'sorry for my English' apologies. Practice makes permanent." },
          { q: "Should I mention my English is weak?", a: "NEVER directly apologize for your English in an interview. It puts a negative thought in their head before you've even started. If they ask about areas of improvement, you can frame it: 'I've been working on improving my spoken communication — I read business articles aloud daily and practice speaking on random topics.' This tells them (a) you're self-aware, (b) you're actively improving. Recruiters respect people who work on their weaknesses — it shows maturity." },
          { q: "How to answer 'Tell me something NOT in your resume'?", a: "Pick 1 personal trait + story: e.g., 'Outside academics, I've been reading business news every morning for the past 18 months — Mint and Economic Times. I maintain a small notebook where I jot down interesting companies. This habit is what made me choose finance. It keeps me grounded in real-world business, not just textbook theory.' OR talk about a sport / hobby you do seriously — anything that shows DISCIPLINE outside studies." },
        ],
      },
    ],
  },
  {
    id: "eng-hrqa",
    category: "English",
    icon: "📝",
    title: "HR Questions with Model Answers — MEMORIZE these",
    summary: "These 10 questions come in EVERY interview. Have your answers ready.",
    items: [
      {
        title: "Top 10 HR Answers — write & practice each",
        type: "Q&A",
        qa: [
          {
            q: "1. Tell me about yourself / Walk me through your resume.",
            a: "Use the 90-second script from the previous module. Tailor the last sentence to the role: 'I'm looking to start as an Equity Research Analyst because it combines my finance knowledge with analytical skills.' / 'I want to work as a Financial Analyst in your FP&A team because I enjoy budgeting and variance analysis.' KEY: End with why THIS job specifically.",
          },
          {
            q: "2. Why do you want this job? / Why this company?",
            a: "Do your research! Never say generic things. Structure: '(1) I've followed [Company] for some time. I was particularly impressed with [recent news: e.g., your Q2 results showing 18% loan growth / your entry into the mutual fund business / the acquisition of X company]. (2) From what I've read, the company values rigorous analysis and long-term thinking — which aligns with how I approach finance. (3) I understand the role involves [describe role — e.g., analyzing the retail lending portfolio / covering the FMCG sector], which is exactly the kind of work I want to build my expertise in. (4) For these reasons, I'm genuinely excited about this opportunity.' BONUS: Mention one specific thing about the company from their latest annual report / recent news. This 1 thing will set you apart from 90% of candidates.",
          },
          {
            q: "3. Why Finance? / Why not Marketing or HR?",
            a: "'I chose finance because I genuinely enjoy working with numbers and understanding how businesses create (or destroy) value. When I look at a company's financial statements, I can see the story behind the business — what's working, what's not, and where the opportunities are. I find this analytical, fact-driven approach to decision-making very satisfying. Also, finance opens doors to a wide variety of long-term careers — research, investment banking, corporate finance, risk — and I wanted to keep my options open while developing a genuine specialization. Lastly, I find financial markets endlessly fascinating — they reflect real-world business, policy, and human behavior — and I read about them with genuine curiosity, not just for studies.'",
          },
          {
            q: "4. What are your Strengths and Weaknesses?",
            a: "Strengths (pick 2-3, with brief examples): 'My strengths: First, I'm diligent and consistent — once I commit to something, I follow through. For example, I've been reading business news daily for 18 months. Second, I'm comfortable with numbers and detail-oriented — during my summer project, I caught a calculation error in a template that saved the team from presenting wrong data. Third, I genuinely enjoy learning — this website/tracker that I'm using to prepare for placements is an example.'\n\nWeakness (IMPORTANT — only ONE, and show how you're FIXING it): 'An area I've been actively working on is my spoken English. I wasn't very confident when I started PGDM, so I made a deliberate effort: I read articles aloud daily, I record myself speaking and review the recording, and I participate in GD practice sessions. I've improved significantly in the past year, and I'm continuing to work on it because I know how important clear communication is in a corporate role.'\n\nPRO TIP: NEVER say 'I'm a perfectionist' or 'I work too hard' — these are fake-sounding cliches. Interviewers see right through them. Give a REAL weakness + your plan to overcome it. This shows emotional maturity and is actually MORE impressive than listing fake strengths.",
          },
          {
            q: "5. Where do you see yourself in 5 years?",
            a: "'In the next 3 years, I want to become really good at this role — whatever it takes. I want to learn the business, the products, the processes thoroughly, and become someone my team can rely on for quality analysis. In 5 years, I'd like to be in a position where I'm handling more complex assignments independently — perhaps as a Senior Analyst or Team Lead — and contributing to decisions that matter to the business. Long-term, I want to build expertise in [specific area: e.g., credit risk for NBFCs / equity research covering consumer sector] and eventually move into leadership in that area. But honestly, the next 5 years are mostly about learning as much as I can and proving myself — the rest will follow.'",
          },
          {
            q: "6. Why should we hire you?",
            a: "'Three reasons. First: I have the right technical foundation — a PGDM in Finance with strong fundamentals in financial analysis, valuation, ratios, and working knowledge of Excel modeling, SQL and Power BI. Second: I'm genuinely interested in this ROLE and this COMPANY — I've done my research on what you do, and I know this is the kind of work I want to build my career in. Third: I'm diligent and humble. I know I still have a lot to learn, and I'm not here with any assumptions. I'm here to learn fast, work hard, and make myself useful as quickly as possible. If given this opportunity, I will give it my best.'",
          },
          {
            q: "7. Describe a difficult situation and how you handled it.",
            a: "Use STAR method: Situation, Task, Action, Result. Example: 'During my summer internship, I was given a project to analyze the credit portfolio of a particular region. About 1 week into the project, I realized the data template had errors — the columns were misaligned. (S) My task was to deliver a correct analysis within 2 weeks. (T) Rather than complaining, I: (1) reported the issue to my mentor, (2) took ownership to rebuild the template properly, (3) worked extra 2 hours every evening for 3 days to make up for lost time, (4) cross-checked every number twice, (5) delivered the presentation on schedule with the corrected data. (A) My mentor thanked me for catching the error and handling it professionally. The presentation went to senior management without issues. (R) This experience taught me: quality > speed, take ownership, and always double-check your data.'",
          },
          {
            q: "8. Do you have any questions for us?",
            a: "ALWAYS have at least 2 questions. NOT asking = lack of interest. Good questions:\n(a) 'What does success look like in this role in the first 6 months? What would you expect a new joiner to have accomplished?'\n(b) 'Could you tell me about the team I'd be working with — the structure, the kind of people?'\n(c) 'What are the biggest challenges the team / department is facing right now?'\n(d) 'How would you describe the culture here? And what does the company do to support learning and growth for junior employees?'\n(e) 'Based on what we've discussed today, do you have any feedback or areas where I could improve?' (ask this only in final HR round — shows maturity)\n\nNEVER ask about salary, leave policy, or work hours in the FIRST round. Those are for when you have a clear offer signal.",
          },
          {
            q: "9. What is your expected salary?",
            a: "'Right now, my priority is getting the right opportunity — one where I can learn and grow. I'm sure your company has a fair compensation structure for this role, and I would be comfortable with whatever is offered based on my profile and the industry standards. If the opportunity is good, we will find a number that works for both of us.'\n\nIf they PRESS for a number: 'Based on my research for similar roles in similar companies, the range is typically ₹10-15 LPA for a fresh PGDM finance graduate from a college of similar standing. I would be comfortable in that range.' — give a RANGE, not a single number. Aim high within the range but realistic for your college's placement record. Never under-sell yourself. KEY: confidence in your value.",
          },
          {
            q: "10. Why is there a gap in your education? / Why low marks in X year? / What about your backlogs?",
            a: "Be HONEST but FRAME it positively. Never blame others. Example for low marks: 'In my first year of graduation, I was still figuring out what I wanted to do long-term — I was exploring different things including sports, college societies and debating. As a result, my academic performance was average that year. Once I decided on finance and my PGDM, I became much more focused — you can see the improvement in my second year and PGDM marks. I've also compensated by doing additional certifications and self-study projects in finance and analytics — which I believe is more important for this job than marks alone.' KEY: acknowledge, don't defend; show improvement; redirect to strengths.",
          },
        ],
      },
      {
        title: "STAR Stories — prepare 5 of these for behavioral questions",
        type: "Concept",
        content:
          "Behavioral questions ('Tell me about a time when…') are best answered with STAR:\nS — Situation (context)\nT — Task (what you needed to do)\nA — Action (what YOU did, not 'we')\nR — Result (outcome + what you learned)\n\nHave at least 5 stories ready — you can use them for different questions:\n1) Leadership: 'Led a team during a college project/event'\n2) Teamwork / Conflict: 'Worked in a team where we had disagreements — how we resolved it'\n3) Failure: 'Worked hard on something and it did not succeed — what I learned'\n4) Achievement: 'Accomplished something I was proud of (academic, sport, project, personal)'\n5) Challenge under pressure: 'Had tight deadline and limited resources — how I delivered'\n\nWRITE each story down on paper in ~200 words. Practice saying each out loud 3 times. Having them pre-thought means you won't blank on interview day.",
      },
      {
        title: "Tricky questions — and how to handle them",
        type: "Q&A",
        qa: [
          { q: "Why should we take you over someone from IIM / top B-school?", a: "Be respectful, then present your differentiator: 'I recognize that students from top institutes come with strong fundamentals and exposure. However, I have three things that make me a strong candidate: (1) I have built specific technical skills — I've done extra courses and projects in financial modeling, Excel, SQL, and Power BI — which means I can contribute productively from Day 1. (2) I know my strengths and my areas of improvement — I am not over-confident. I will come in, learn the business quickly, and work hard. (3) I genuinely want THIS ROLE and THIS COMPANY — I'm not just interviewing for a salary, I'm interviewing for a career. Often, hunger and fit matter more than college brand name.'",
            },
          { q: "You have a minor in Analytics — why not apply for data analyst roles?", a: "'I added Analytics as a minor to strengthen my finance profile, not to replace it. I believe the most valuable finance professionals of the future will be those who can work with data. Many finance decisions — from credit risk to investment research — are becoming data-intensive. By combining my finance fundamentals with SQL, Excel, and Power BI, I can add value that a pure-finance candidate without analytics training would struggle with. For example, in my internship/mini-project I analyzed [X data] to arrive at [Y insight]. So analytics is my STRENGTH for a finance role — not an alternative to it.'",
            },
          { q: "Do you plan to do an MBA / further studies later?", a: "'Right now, my full focus is on starting my professional career and learning as much as I can in the next 3-5 years. I believe the best learning for me right now will be on the job. Whether I pursue further studies later will depend on where my career takes me and whether there's a specific skill or qualification that would genuinely add value. For the foreseeable future, I am fully committed to working.' KEY: Do NOT say 'yes I will do MBA in 2 years' — it makes employers worry you will leave. Show commitment to THIS role now." },
          { q: "Sell me this pen / Sell me water / Sell me something.", a: "This is a classic 'test' question. The POINT is not to sell — it's to show you understand the principle: first UNDERSTAND the buyer, THEN sell. Wrong answer: 'This pen writes well, buy it.' RIGHT answer: 'Before I tell you about this pen, may I ask — what do you currently use to write? And what's the most important thing you look for in a pen? [Wait for answer] Ah, I see — you value [X] and you're currently frustrated by [Y]. This pen specifically addresses that because [point out one benefit]. Would something like that be useful for you?' The principle: ASK QUESTIONS first, then position the product around the buyer's needs. This is how you answer ANY 'sell me X' question, and the interviewer will be impressed.",
            },
          { q: "What will you do if you don't get this job?", a: "'I have done my best in this interview — if it doesn't work out, I will first ask for your honest feedback about where I need to improve. Then I will take that feedback seriously and work on those areas, apply to other opportunities, and keep improving. Ultimately, I believe that if someone is willing to learn and work hard, good opportunities come. But having said that, I genuinely hope it works out with your company because I'm excited about this role.'",
          },
        ],
      },
    ],
  },
  {
    id: "eng-gd",
    category: "English",
    icon: "💬",
    title: "Group Discussion Guide — with 15 common topics + points",
    summary: "GDs are elimination rounds. Speak well, structure your points, lead the group.",
    items: [
      {
        title: "How to approach ANY GD — 5 strategies",
        type: "Concept",
        content:
          "1) INITIATE (first speaker) if you can — advantage: you set the direction of discussion. Say: 'Good morning everyone. Let me start by defining this topic…' → lay out the framework (economic / social / industry / individual perspectives). BUT only initiate if you actually have something intelligent to say — initiating with empty words hurts you.\n\n2) If you CAN'T initiate (someone already spoke), LISTEN. After 2-3 people have spoken, SAY: 'I'd like to build on what [Name] mentioned…' → then add a NEW point. Building on others is HIGHLY valued in GDs — it shows listening skills + teamwork.\n\n3) AGREE or DISAGREE gracefully — NEVER shout. 'Interesting point, [Name]. Another perspective to consider is…' is much better than 'I disagree' or 'You're wrong'. Politeness + substance beats aggression EVERY time.\n\n4) If the group is going OFF-TOPIC, steer them back — this is a LEADERSHIP signal. 'All these are important points — let's also remember the original topic was [X]. May I propose we focus on that?' Showing you can manage the group quality impresses assessors.\n\n5) SUMMARIZE at the end. If time is almost up: 'Let me try to summarize what we've discussed — we covered [A], [B], and [C]. Our general consensus was / we remain divided on…' Being the summarizer = you are seen as organized and clear.",
      },
      {
        title: "Speaking Frameworks — use these to structure any point",
        type: "Concept",
        content:
          "Before speaking, mentally pick ONE structure:\n\nA) PROS vs CONS (for / against)\n- On one hand… [3 points in favor]\n- On the other hand… [3 points against]\n- In my view… [your stand + why]\n\nB) PESTLE (Economic topics)\nP — Political (govt policy, regulations)\nE — Economic (GDP, employment, inflation, growth)\nS — Social (people, lifestyle, demographics)\nT — Technological (digital, AI, automation)\nL — Legal (laws, compliance)\nE — Environmental (climate, ESG)\nPick 3-4 of these most relevant to the topic.\n\nC) SHORT-TERM vs LONG-TERM\n- In the short run (next 1-2 years):\n- In the long run (next 5-10 years):\n- Net effect on [topic]:\n\nD) WHO BENEFITS, WHO LOSES?\n- Winners from this change:\n- Losers from this change:\n- Net impact on society / economy:\n\nE) 3-LAYER\n1) What is the problem?\n2) What causes it?\n3) What are 2-3 practical solutions?\n\nHaving a structure means you never say 'I don't know' or ramble. Even if you don't have deep knowledge, a structured shallow answer beats an unstructured brilliant-sounding one.",
      },
      {
        title: "15 Common GD Topics — for each, 3 FOR + 3 AGAINST points",
        type: "Cheatsheet",
        content:
          "1) Is AI going to take away jobs?\nFOR automation: (a) Productivity surge — less time on repetitive tasks, more on thinking (b) New industries will emerge (AI trainers, prompt engineers) (c) India can leapfrog in services exports\nAGAINST: (a) Short-term displacement: entry-level BPO, data-entry, paralegal jobs at immediate risk (b) India's demographic dividend needs job-rich growth, not jobless growth (c) WIDENING inequality — only skilled workers benefit, others left behind\n\n2) Make in India vs Make for the world\nFOR local: (a) Self-reliance in defense, pharma, electronics reduces import dependency (b) PLI schemes creating manufacturing jobs (c) China+1 strategy offers once-in-generation opportunity\nFOR global: (a) India's domestic market alone can't employ 1.3B — export-led growth (like China, Vietnam) is must (b) Competitive pressure improves quality (c) Services exports already $300B+ — need to push manufacturing exports\n\n3) Cryptocurrency — ban or regulate?\nBAN side: (a) No intrinsic value, highly volatile — retail investors lose money (b) Money laundering / terror financing risk (c) RBI has repeatedly warned\nREGULATE side: (a) Ban pushes activity underground — regulation brings transparency (b) Web3 / blockchain have real uses beyond speculation (c) Countries like Dubai, Singapore are becoming crypto hubs — India loses talent and tax revenue\n\n4) Startups — bubble or genuine innovation?\nYES bubble: (a) Loss-making companies getting billion-dollar valuations (b) Easy money era of 2020-22 funded unsustainable business models (c) Large layoffs in 2023-24 show real business models are fewer\nREAL innovation: (a) Genuine companies (Zomato, Nykaa, Zerodha) have created real value and millions of indirect jobs (b) India now has the 3rd largest startup ecosystem in world (c) Many are solving real Indian problems (fintech inclusion, logistics, agritech)\n\n5) Privatization of PSUs — good or bad?\nGOOD: (a) Many PSUs are loss-making, draining taxpayer money (b) Private management brings efficiency and performance culture (c) Govt can focus scarce resources on education, health, infrastructure\nBAD: (a) Public welfare objectives (cheap banking for poor, affordable power) get diluted (b) Monopolies can replace government control (e.g., private airports raising prices) (c) Strategic sectors (defense, railways, banking) need careful approach\n\n6) Work-from-home vs Office — which is better?\nWFH: (a) Productivity equal or higher for individual contributor roles (b) Saves commute time + cost, improves work-life balance (c) Enables hiring talent from tier-2/3 cities\nOFFICE: (a) Team cohesion, mentoring, and culture are harder remotely (b) Junior employees lose 'on-the-job' learning by watching seniors (c) Collaboration, brainstorming and creativity benefit from in-person\nHYBRID (most realistic answer): Best is a hybrid model — structured office days (2-3/week) for meetings, mentoring, and collaboration; remote days for focused work. Companies offering this get best of both.\n\n7) Union Budget 2024 / Recent budget — hits and misses\nHITS: (a) Continued capex push (infrastructure multiplier = ₹1 spent → ₹3-4 in economy) (b) Personal tax rationalization leaves more disposable income (c) PLI expansions in new sectors\nMISSES: (a) Not enough on education / healthcare (b) Disinvestment targets often missed (c) Rural / agriculture spending needs more focus\n\n8) India becoming $5-trillion economy — realistic by 2029?\nFAVOR: (a) Currently $3.7T — need ~10% nominal growth (7% real + 3% inflation) for 5 years — achievable (b) Manufacturing share rising from 15% → 25% target (c) Demographics: 50% population < 25 — massive workforce entering\nAGAINST: (a) Global headwinds (recession, commodity prices) can derail (b) India's exports share of GDP is falling, not rising (c) Jobless growth is a risk — growth without enough jobs fails to lift living standards\n\n9) NPA crisis in Indian banking — behind us or still lurking?\nBEHIND US: (a) Gross NPAs fallen from 11.5% (2018) to ~3.9% (2024) — massive improvement (b) PCR (provision coverage ratio) at 10-year high (c) Most large accounts resolved through IBC/NCLT\nSTILL LURKING: (a) Retail NPAs (credit cards, personal loans) rising fast (b) NBFC stress still possible (c) If corporate capex cycle disappoints, fresh NPAs can emerge\n\n10) Inflation in India — who is to blame?\nARGUMENTS: (a) Supply-side factors (food, fuel) — global commodity prices (b) MSP hikes and rural wages (c) Demand-side: post-Covid revenge spending + govt capex\nWHO HURTS MOST: Poor and middle class — food + fuel are ~60% of their spending. Fixed-income earners (salaried, retirees) see real value of savings erode.\nSOLUTIONS: (a) Monetary policy (rate hikes — but hurts growth) (b) Fiscal measures (cut fuel taxes, ban exports of food items temporarily) (c) Long-term: improving agri supply chain, cold storage\n\n11) ESG investing — fad or the future?\nFAD: (a) Ratings are inconsistent, subjective, easy to 'green-wash' (b) Adding ESG constraints may hurt returns by eliminating certain industries\nFUTURE: (a) Regulators forcing disclosure (SEBI's BRSR framework) (b) Global capital (FIIs) allocating more to ESG-compliant companies (c) Climate change is real — companies ignoring it will face real physical and regulatory risks\n\n12) Digital India / UPI — India's biggest success story?\nYES: (a) UPI now ~13 B transactions/month (b) Zero-fee, instant, bank-to-bank — no other country has anything similar at this scale (c) Jan-Dhan + Aadhar + Mobile (JAM) trio brought millions into formal banking\nCONCERNS: (a) Data privacy concerns (b) Cybersecurity risk — a failure at this scale would be catastrophic (c) Financial exclusion of those without smartphones\n\n13) China vs India — who wins the next decade?\nINDIA: (a) Demographics — youngest large nation (b) China's working-age population shrinking (c) China+1 policy shifting manufacturing investment\nCHINA: (a) Far higher per-capita income ($12K vs $2.5K) (b) Much deeper manufacturing base, R&D spending (c) Infrastructure 10 years ahead\nREALISTIC VIEW: China will remain economically larger in absolute terms, but INDIA will grow faster and narrow the gap. The opportunity for India is to grow FAST, create jobs, and improve per-capita income.\n\n14) Impact of social media on youth\nFOR: (a) Access to free learning (YouTube, Coursera) (b) Community building for niche interests (c) New career paths (influencers, creators)\nAGAINST: (a) Attention spans collapsing (b) Mental health issues (comparison culture, FOMO, anxiety) (c) Misinformation spreads faster than facts\n\n15) Should college placements be abolished?\nAGAINST abolishing: (a) Placements give students a safety net and clear target (b) Campus hiring is most efficient channel for companies meeting entry-level talent\nNEED TO IMPROVE: (a) Current system over-emphasizes salary package, not learning or fit (b) Pressure culture hurts mental health (c) Better approach: increase internship conversion, alumni network, and self-placement support alongside campus hiring\n\nFOR EACH TOPIC: Pick 3 strong points FOR, 3 strong points AGAINST, and your CLEAR stand with one reason. Don't sit on the fence — taking a clear position makes you memorable in a GD.",
      },
      {
        title: "English Improvement Daily Routine",
        type: "Concept",
        content:
          "Follow this DAILY for 60 days — you will transform. Consistency > intensity.\n\nMorning (30 min):\n1) Read 1 news article ALOUD from Mint / Economic Times (10 min)\n2) Record yourself speaking for 2 minutes on a RANDOM topic (use topic generator) (5 min)\n3) Review the recording — notice: did you pause too much? Use too many 'aaaa' fillers? Speak too fast? (5 min)\n4) Learn 5 new words, write them in sentences in a small notebook. Revise previous 5 days' words. (10 min)\n\nAfternoon / Evening (15-20 min):\n5) Watch 10-15 min of English news / TED talk WITH subtitles. Write down 5 new phrases (collocations like 'given that', 'on the flip side', 'by and large'). Use each in your own sentence.\n6) Shadow a 5-min podcast or news clip: pause after every sentence, repeat EXACTLY what you heard with same rhythm and intonation. This trains your mouth to make English sounds naturally. This single exercise fixed my pronunciation. YouTube 'BBC 6-Minute English' is ideal.\n\nWeekly (1 hour every Sunday):\n7) Write 1-page personal letter to yourself in English: 'What did I learn this week? What were my wins? What will I improve next week?' This forces you to structure sentences from scratch.\n8) Do a JAM (Just A Minute) session in front of mirror: speak non-stop for 1 minute on a random topic. NO Hindi. NO long pauses. If you get stuck, say anything — keep going. This is how you train fluency.\n9) Join a GD practice group or find 1 friend who also wants to improve — do a mock GD on Zoom once a week.\n\nKey rules:\na) THINK in English, not Hindi → translate in your head. Stop 'Hindi → English translation' habit. Think directly in English. Even if simple, it's better.\nb) Surround yourself: set phone, social media, and YouTube to English. After 1 week, you will not want to go back.\nc) Read 5-10 pages of an English book before bed (start with a simple novel — 'The Alchemist', 'Who Moved My Cheese?', 'Rich Dad Poor Dad').\nd) Speak to yourself in English when alone (walking, cooking, dressing up). Describe what you're doing: 'Now I'm making tea. I need to boil water first. Then add the tea leaves and sugar.' — it feels silly but it trains fluency like nothing else.\ne) Speak English in college with your friends, even if they laugh at you or make fun. By placement time, you will be the confident one and they will be the ones nervous. Short-term embarrassment for long-term gain.",
      },
      {
        title: "GD Opening Lines — have these ready",
        type: "Cheatsheet",
        content:
          "To INITIATE:\n'Good morning everyone. Let me start by framing this topic…'\n'I'd like to set the context for this discussion. The topic can be understood from three angles — economic, social, and industry-wise.'\n\nTo ENTER mid-discussion:\n'I'd like to build on what [Name] just said…'\n'Interesting point. Another angle to consider is…'\n'If I may add to that…'\n'Moving from the economic side to the social impact…'\n\nTo DISAGREE politely:\n'That's a valid perspective. Another way to look at it, though, is…'\n'I see where you're coming from, but I'm not sure I fully agree because…'\n'While that is true in the short run, over the long term…'\n\nTo bring group back on track:\n'We're making some very important points. Let me also remind everyone our topic is [X] — may I suggest we refocus there?'\n'We've discussed the pros quite well — who'd like to present the other side?'\n\nTo SUMMARIZE / CONCLUDE:\n'Let me try to quickly summarize our discussion. We covered [A, B, C]. The general view was…'\n'Thank you everyone — to wrap up, the key points that emerged were…'\n\nFILLERS to buy time (use these instead of 'aaaa' / silent pauses):\n'That's a good question.'\n'Interesting topic. Let me think about this for a moment.'\n'If I look at it from a practical standpoint…'\n'Broadly speaking…'\n'By and large…'\n'Given the context…'\n'All things considered…'\n'On the flip side…'\n'That said…'\n\nReplace your 'aaaa' pauses with these professional-sounding phrases, and your speaking level will instantly sound 2 levels higher.",
      },
    ],
  },
  {
    id: "eng-vocab",
    category: "English",
    icon: "📚",
    title: "50 Finance/Business Vocab Words + Daily Grammar",
    summary: "Interview, GD and reading vocab — learn 3-5 per day",
    items: [
      {
        title: "50 Business & Finance Vocab Words — 10 per day",
        type: "Cheatsheet",
        content:
          "Use each in your own sentence to remember it. Daily target: 5 words.\n\nDay 1-5\n1. Volatility — tendency to change quickly and unpredictably (e.g., stock market volatility)\n2. Liquidity — how easily an asset can be sold without affecting price (cash is most liquid)\n3. Leverage — borrowing money to invest; using debt to amplify returns\n4. Valuation — process of determining how much a company / asset is worth\n5. Arbitrage — buying in one market, selling in another for risk-free profit\n6. Dilution — reduction in ownership percentage (new shares issued in FPO / rights issue)\n7. Default — failure to repay debt / fulfill contract terms\n8. Exposure — amount invested in a particular asset / sector (risk concentration)\n9. Margin — cash/securities deposited with broker; also profit percentage (EBITDA margin)\n10. Arbitrage — risk-less simultaneous buy-sell across markets for small profit\n\nDay 6-10\n11. Hedging — reducing risk by taking an offsetting position (e.g., buy put to protect stock)\n12. Speculation — taking high-risk bets on price movements\n13. Diversification — spreading investments to reduce risk\n14. Yield — income return from an investment (bond coupon yield, dividend yield)\n15. Premium — price above face value (bond trading at premium); insurance premium; option premium\n16. Discount — price below face value / NAV\n17. Yield Curve — plot of yields of similar-risk bonds across different maturities\n18. Spread — difference between two interest rates / yields (corporate bond yield − govt bond yield)\n19. Duration — sensitivity of bond price to a 1% change in interest rates\n20. Beta — measure of systematic risk of a stock vs market (β=1 same as market)\n\nDay 11-15\n21. Alpha — excess return of a fund compared to its benchmark (skill of fund manager)\n22. Sharpe Ratio — excess return per unit of total risk; measure of risk-adjusted performance\n23. Yield-to-Maturity (YTM) — total return if bond is held until maturity\n24. Face Value / Par Value — stated value of a bond (usually ₹1000) or share (₹10)\n25. NAV — Net Asset Value (for mutual funds: total assets / number of units)\n26. Expense Ratio — annual cost of mutual fund as % of assets (lower is better)\n27. Asset Allocation — distributing investments across asset classes (equity, debt, gold)\n28. Rebalancing — periodically bringing portfolio back to target asset allocation\n29. Tax Harvesting — booking losses to offset capital gains and reduce tax\n30. SIP — Systematic Investment Plan; regular monthly investment in mutual fund\n\nDay 16-20\n31. NPA — Non-Performing Asset; loan on which borrower has stopped making payments\n32. CASA — Current Account + Savings Account; low-cost bank deposits\n33. NIM — Net Interest Margin; (interest income − interest expense) / earning assets\n34. PCR — Provision Coverage Ratio; provisions set aside as % of gross NPAs\n35. CAR / CRAR — Capital Adequacy Ratio; bank capital / risk-weighted assets (Basel III)\n36. Repo Rate — rate at which banks borrow from RBI; primary policy rate\n37. Reverse Repo / SDF — rate banks get for parking money with RBI\n38. CRR — Cash Reserve Ratio; fraction of deposits banks must keep with RBI (no interest)\n39. SLR — Statutory Liquidity Ratio; fraction banks must invest in government securities\n40. MPC — Monetary Policy Committee; 6-member body setting repo rate\n\nDay 21-25\n41. Inflation — general rise in prices; reduces purchasing power of money\n42. CPI — Consumer Price Index; headline inflation measure in India (RBI target 4% ± 2%)\n43. WPI — Wholesale Price Index; earlier used as headline measure\n44. GDP — Gross Domestic Product; total value of goods and services produced in a year\n45. Fiscal Deficit — excess of total govt expenditure over revenue (as % of GDP; target < 4.5%)\n46. CAD — Current Account Deficit; excess of imports over exports (plus services/transfers)\n47. FDI — Foreign Direct Investment; long-term foreign investment in productive assets\n48. FPI / FII — Foreign Portfolio Investment; short-term foreign investment in stocks / bonds\n49. PLI — Production-Linked Incentive; Govt scheme to promote domestic manufacturing\n50. Disinvestment — Govt selling its stake in public sector companies\n\nWrite 3-5 of these EVERY DAY in your vocab notebook with a sentence. After 60 days, you will OWN business English.",
      },
      {
        title: "5 Common Grammar Mistakes Indians Make + Fixes",
        type: "Concept",
        content:
          "1) TENSE confusion — biggest issue.\nWRONG: 'I am working here since 2023.'\nRIGHT: 'I have been working here since 2023.' (Present Perfect Continuous for action started in past, still continuing)\n\nRule: Use 'since' with a POINT in time (since Monday, since 2023, since I joined). Use 'for' with a DURATION (for 3 months, for 2 years). 'Since' usually pairs with Perfect tenses (has/have + verb).\n\nMore examples:\nI have lived in Delhi for 5 years. (still live there)\nI lived in Delhi for 5 years. (no longer live there — simple past)\nI had lived in Delhi for 5 years before I moved to Bangalore. (past perfect — BEFORE another past action)\n\n2) ARTICLES (a / an / the / nothing)\nWRONG: 'I am PGDM student.'\nRIGHT: 'I am a PGDM student.' (consonant sound P → 'a')\nWRONG: 'I have MBA degree.'\nRIGHT: 'I have an MBA degree.' (M starts with vowel SOUND 'em' → 'an')\nWRONG: 'I work in the finance.'\nRIGHT: 'I work in finance.' (no article before names of fields/subjects)\nWRONG: 'I work in finance department.'\nRIGHT: 'I work in the finance department.' (specific department — use 'the')\n\nRough rules: 'a/an' = one of many, general. 'the' = specific, unique. Nothing = general concept / plural / uncountable nouns used generally.\n\n3) PREPOSITION confusion (in / on / at / for / since)\nTime prepositions: IN months/years/centuries (in June, in 2024), ON specific days/dates (on Monday, on June 15), AT specific time (at 9 AM, at night).\nPlace prepositions: IN room/city/country, ON surface, AT specific point (at the door, at home).\n\n4) Subject-verb agreement\nWRONG: 'The number of students are increasing.'\nRIGHT: 'The number of students is increasing.' ('The number' is SINGULAR — takes 'is')\nWRONG: 'A number of students is here.'\nRIGHT: 'A number of students are here.' ('A number' = many — takes 'are')\nWRONG: 'Rice and curry are my favorite dish.'\nRIGHT: 'Rice and curry is my favorite dish.' (considered ONE meal — singular)\nWRONG: 'Neither of the candidates were suitable.'\nRIGHT: 'Neither of the candidates was suitable.' ('Neither' = singular)\n\n5) Double negatives and incorrect phrasing\nWRONG: 'I don't know nothing about it.' / 'I didn't did it.' / 'I had went there.'\nRIGHT: 'I don't know anything about it.' / 'I didn't do it.' / 'I went there.'\n\nWRONG: 'I am agree with you.'\nRIGHT: 'I agree with you.' (agree is a VERB — doesn't take 'am')\nWRONG: 'I am interesting in finance.'\nRIGHT: 'I am interested in finance.' (-ed = how YOU feel; -ing = what CAUSES the feeling: 'The topic is interesting. I am interested.')\nWRONG: 'I discussed about the topic with my friend.'\nRIGHT: 'I discussed the topic with my friend.' (discuss takes direct object — no 'about')\nWRONG: 'I look forward to meet you.'\nRIGHT: 'I look forward to meeting you.' ('to' here is a preposition, not infinitive — takes -ing)\n\nRead this list every 3 days. After a few weeks, these mistakes will stop coming out of your mouth naturally.",
      },
      {
        title: "20 Fill-in-the-blank Grammar Exercise",
        type: "Q&A",
        qa: [
          { q: "1) I ___ working in Delhi since 2022. (am / have been / was)", a: "have been — action started in past, still continues." },
          { q: "2) She ___ to the office yesterday. (has gone / went / gone)", a: "went — yesterday = finished past time, simple past." },
          { q: "3) By the time we arrived, the movie ___. (started / had started / has started)", a: "had started — past perfect for action COMPLETED before another past action." },
          { q: "4) Neither of the proposals ___ acceptable. (is / are)", a: "is — 'neither' takes singular verb." },
          { q: "5) Rice and beans ___ a nutritious meal. (is / are)", a: "is — treated as ONE combined meal." },
          { q: "6) She is ___ MBA from IIM. (a / an / the)", a: "an — 'em' sound is a vowel SOUND." },
          { q: "7) He works in ___ finance department. (a / an / the / no article)", a: "the — specific department, takes 'the'." },
          { q: "8) I am interested ___ learning SQL. (in / on / at)", a: "in — interested IN." },
          { q: "9) The meeting is ___ 9 AM ___ Monday. (at / on / in)", a: "at, on — AT specific time, ON specific day." },
          { q: "10) I have lived here ___ 5 years. (since / for)", a: "for — duration of time." },
          { q: "11) I have lived here ___ 2019. (since / for)", a: "since — specific point in time." },
          { q: "12) ___ students were absent today. (The number of / A number of)", a: "A number of — 'many' → plural verb 'were'." },
          { q: "13) ___ students present today is 42. (The number of / A number of)", a: "The number of — specific count → singular verb 'is'." },
          { q: "14) The news ___ true. (is / are)", a: "is — 'news' is uncountable, singular." },
          { q: "15) Everyone ___ happy with the results. (was / were)", a: "was — 'everyone' is singular." },
          { q: "16) He doesn't know ___ about it. (nothing / anything)", a: "anything — never double-negative ('not' + 'nothing' = wrong)." },
          { q: "17) I look forward to ___ you. (meet / meeting)", a: "meeting — 'to' here is preposition, needs -ing form." },
          { q: "18) The topic is ___. (interesting / interested)", a: "interesting — topic CAUSES the feeling (it's -ing)." },
          { q: "19) I ___ in this project. (am interesting / am interested)", a: "am interested — how YOU feel (-ed form)." },
          { q: "20) By next year, I ___ my PGDM. (will finish / will have finished)", a: "will have finished — future perfect for action COMPLETED by a future date.",
          },
        ],
      },
    ],
  },
];

// ============ APTITUDE MODULES ============

const aptitudeModules: LearningModule[] = [
  {
    id: "apt-shortcuts",
    category: "Aptitude",
    icon: "🧮",
    title: "Aptitude Shortcuts — top 12 types",
    summary: "Speed matters. Memorize these shortcuts — 30 sec per question is the target.",
    items: [
      {
        title: "1) Percentages",
        type: "Formula",
        content:
          "Shortcut: x% of y = y% of x. So 8% of 50 = 50% of 8 = 4. Easier!\n\nIf a number is increased by x% and then by y%, effective increase =\nx + y + (x × y)/100\n\nExample: Salary up 10% then 20% = 10 + 20 + (10×20)/100 = 32% effective increase (NOT 30%).\n\nDecrease: use negative signs. Increase by x% then decrease by x%: net change = −(x²/100)%. Always a net LOSS.\n\nA is what % of B: (A/B) × 100\nA is how much % more than B: (A − B)/B × 100\nA is how much % less than B: (A − B)/B × 100 (negative)\n\nTo find B when you know A is x% of B: B = A × 100 / x\n\nFraction ↔ % equivalents to MEMORIZE:\n1/2 = 50%\n1/3 = 33.33%\n2/3 = 66.67%\n1/4 = 25%\n3/4 = 75%\n1/5 = 20%\n2/5 = 40%\n1/6 = 16.67%\n1/7 = 14.28% (VERY useful — 2/7 = 28.57%, 3/7 = 42.85%...)\n1/8 = 12.5%\n1/9 = 11.11%\n1/11 = 9.09%\n1/12 = 8.33%\n1/15 = 6.67%\n1/20 = 5%\n\nKnowing these, 62.5% = 5/8 instantly, 37.5% = 3/8, etc. Saves time.",
      },
      {
        title: "2) Profit & Loss",
        type: "Formula",
        content:
          "SP = Selling Price, CP = Cost Price, MP = Marked / List Price\n\nProfit = SP − CP\nLoss = CP − SP\nProfit% = (Profit / CP) × 100\nLoss% = (Loss / CP) × 100\n\nSP = CP × (100 + Profit%) / 100\nSP = CP × (100 − Loss%) / 100\nCP = SP × 100 / (100 + Profit%)\nCP = SP × 100 / (100 − Loss%)\n\nDiscount = MP − SP\nDiscount% = (Discount / MP) × 100\nAfter discount d%: SP = MP × (100 − d)/100\nAfter 2 successive discounts d1 and d2: effective = d1 + d2 − d1×d2/100\n\nIf SP of x items = CP of y items:\nProfit% = [(y − x)/x] × 100\n\nExample: SP of 20 pens = CP of 25 pens. Profit% = (25−20)/20 × 100 = 25%.\n\nFalse weight: Shopkeeper sells '1 kg' but uses 800 gm weight.\nProfit% = (Claimed weight − Actual weight) / Actual weight × 100 = 200/800 × 100 = 25%.\n\nRule: If you get confused, ALWAYS assume CP = ₹100 and work from there.",
      },
      {
        title: "3) Simple & Compound Interest",
        type: "Formula",
        content:
          "SI = (P × R × T) / 100\nAmount A = P + SI = P(1 + RT/100)\n\nCI: A = P(1 + R/100)^n\nCI = A − P\n\nWhen compounded half-yearly: rate halved, periods doubled: A = P(1 + R/(2×100))^(2n)\nWhen compounded quarterly: A = P(1 + R/(4×100))^(4n)\n\nDifference CI − SI for 2 years = P(R/100)^2\nDifference CI − SI for 3 years = P(R/100)²(R/100 + 3)\n\nRule of 72: Time to double ≈ 72 / R. So at 8%, money doubles in ~9 years. At 12%, ~6 years.\n\nInstallments: When equal installments given, value per installment X such that:\nP = X/(1+R/100) + X/(1+R/100)^2 + ... for n installments.\n\nApproximate (simple-interest installment): Total repaid = nX. Effective interest embedded. For approximate problems, installments are usually 'find X such that P(1+RT/100) = sum of installments + their interest from their date to final date' — but exact formula requires PV. For interview-level, memorize: X ≈ P(1+RT/100)/n works for simple cases.",
      },
      {
        title: "4) Time, Speed & Distance",
        type: "Formula",
        content:
          "Distance = Speed × Time\nSpeed = Distance / Time\nTime = Distance / Speed\n\n1 km/hr = 5/18 m/s\n1 m/s = 18/5 km/hr = 3.6 km/hr\n\nAverage speed over same distance twice (one way at speed x, return at speed y):\nAvg speed = 2xy / (x + y)\n(NOT the simple average!)\n\nExample: A → B at 40 km/hr, B → A at 60 km/hr. Avg speed = 2×40×60/(40+60) = 4800/100 = 48 km/hr (NOT 50).\n\nRelative speed:\n• Same direction: subtract (S1 − S2)\n• Opposite direction: add (S1 + S2)\n\nTrains:\n• Train crossing a stationary object (pole / man): distance = length of train\n• Train crossing another train / platform / bridge: distance = sum of both lengths\n• Time = Total length / Relative speed\n\nBoats & Streams:\nDownstream speed (with flow) = B + S\nUpstream speed (against flow) = B − S\nwhere B = boat speed in still water, S = stream speed\n\nB = (Downstream + Upstream) / 2\nS = (Downstream − Upstream) / 2\n\nRaces & Games:\nIf A beats B by x meters in 100m race: A runs 100m in same time B runs (100−x)m.\nSpeed ratio A : B = 100 : (100 − x)",
      },
      {
        title: "5) Time & Work",
        type: "Formula",
        content:
          "Work problems: Use LCM method. Take LCM of all 'days' as total work units. Find per-day work of each person. Add or divide.\n\nExample: A can do work in 10 days, B in 15 days. Together = ?\nLCM(10,15) = 30 units total.\nA does 30/10 = 3 units/day\nB does 30/15 = 2 units/day\nTogether = 5 units/day\nDays together = 30/5 = 6 days.\n\nPipes & Cisterns: Same as work. Inlet pipe = +work, outlet pipe = −work.\n\nMen × Days = constant (if same work). So M1×D1 = M2×D2\nWith hours: M1×D1×H1 = M2×D2×H2\n\nEfficiency inversely proportional to time: If A is 2× efficient as B, A takes half the time of B.\n\nWages are divided in ratio of work done (which = ratio of per-day work × days worked each). So if A works 3 days at 4 units/day and B works 2 days at 5 units/day: ratio = 12 : 10 = 6:5.",
      },
      {
        title: "6) Ratio, Proportion, Partnership",
        type: "Formula",
        content:
          "Ratio a : b means a/b. Remember: ratio only meaningful when units same.\n\nIf a : b = c : d, then ad = bc (cross-multiply)\n\nIf a/b = c/d, then by rules of componendo & dividendo:\n(a+b)/(a−b) = (c+d)/(c−d)\n\nThree numbers in ratio a:b:c with total T:\nFirst = a/(a+b+c) × T\n\nIf two ratios given a:b and b:c, make b common to get a:b:c:\na:b = 2:3 and b:c = 4:5 → make b = 12 (LCM of 3,4). So a:b = 8:12, b:c = 12:15, so a:b:c = 8:12:15.\n\nPartnership: Profit divided in ratio of (Investment × Time) for each partner.\nA invests ₹10,000 for 12 months, B invests ₹15,000 for 8 months.\nRatio A:B = 10000×12 : 15000×8 = 120000 : 120000 = 1:1. Equal profit!",
      },
      {
        title: "7) Permutation & Combination",
        type: "Formula",
        content:
          "Permutation (nPr) = arrangements where ORDER matters (e.g., arranging letters, seating)\nnPr = n! / (n − r)!\n\nCombination (nCr) = selections where ORDER doesn't matter (e.g., forming a team, choosing)\nnCr = n! / r!(n − r)!\nnC0 = 1, nCn = 1, nCr = nC(n−r)\n\nnPn = n! (arranging all n items)\nnC1 = n (choosing 1 out of n)\n\nArrangements with repetition: Total permutations of word MISSISSIPPI = 11! / (4!×4!×2!) — divide by factorials of duplicates.\n\nCircular arrangements: (n−1)! (because rotations of same circle are identical). For necklaces (symmetric both sides): (n−1)! / 2.\n\nGrid: Going from corner A to B moving only right/up: permutations of repeated moves = (total_moves)! / (rights! × ups!)\n\nSelection examples: Out of 5 men and 4 women, committee of 3 men + 2 women = 5C3 × 4C2 = 10 × 6 = 60.\n\nAt least problems: easier to calculate as '1 − opposite'. E.g., 'at least 1 woman' in 3-person committee from 4M, 3W = Total ways − all men = 7C3 − 4C3 = 35 − 4 = 31.\n\nKey words to distinguish:\n'How many ways to form a committee' = COMBINATION (no order)\n'How many ways to arrange' = PERMUTATION (order matters)\n'How many words can be formed' = PERMUTATION",
      },
      {
        title: "8) Probability",
        type: "Formula",
        content:
          "P(Event) = Favourable outcomes / Total outcomes\n\n0 ≤ P(E) ≤ 1\nP(Not E) = 1 − P(E)\n\nMutually exclusive events (cannot happen together):\nP(A or B) = P(A) + P(B)\n\nIndependent events (one doesn't affect other):\nP(A and B) = P(A) × P(B)\n\nGeneral: P(A ∪ B) = P(A) + P(B) − P(A ∩ B)\n\nConditional: P(A|B) = P(A ∩ B) / P(B) — probability of A GIVEN B has happened.\n\nExamples:\nCoin: P(H) = 1/2, P(T) = 1/2. Each toss independent.\nDice: P(rolling 6) = 1/6. P(even) = 3/6 = 1/2.\nCards: Standard 52 cards. 26 red, 26 black. 13 of each suit (♠♥♦♣). 4 of each rank. P(ace) = 4/52 = 1/13. P(heart) = 13/52 = 1/4.\n\nBinomial probability: If p = prob of success in one trial, n trials:\nP(exactly k successes) = nCk × p^k × (1−p)^(n−k)\n\nExample: 10 coin flips, P(exactly 7 heads) = 10C7 × (1/2)^7 × (1/2)^3 = 120 × 1/1024 ≈ 0.117.\n\nExpected value = sum of (value × probability). For fair game: Expected value of ticket = prize × P(winning) − ticket price. If negative, don't play (mathematically).\n\nProbability shortcuts: 'At least 1' = 1 − P(none). 'At most 1' = P(0) + P(1).",
      },
      {
        title: "9) Number System + HCF/LCM",
        type: "Formula",
        content:
          "Divisibility rules (FAST check):\n• 2: last digit even\n• 3: sum of digits divisible by 3\n• 4: last 2 digits divisible by 4\n• 5: last digit 0 or 5\n• 6: divisible by BOTH 2 and 3\n• 9: sum of digits divisible by 9\n• 11: alternating sum divisible by 11 (subtract and add digits alternately)\n\nHCF (Highest Common Factor) = largest number dividing both given numbers.\nLCM (Lowest Common Multiple) = smallest number divisible by both.\n\nProduct of two numbers = HCF × LCM\n\nTo find HCF / LCM quickly: Prime factorization.\nHCF = product of LOWEST powers of common prime factors.\nLCM = product of HIGHEST powers of ALL prime factors.\n\nExample: 60 = 2² × 3 × 5, 84 = 2² × 3 × 7\nHCF = 2² × 3 = 12\nLCM = 2² × 3 × 5 × 7 = 420\nCheck: 60 × 84 = 5040 and 12 × 420 = 5040 ✓\n\nApplication problems:\n• Bells ring at intervals — next simultaneous ring after LCM seconds.\n• Largest tile to cover a hall = HCF of length & breadth.\n• Smallest 4-digit number divisible by a,b,c = smallest multiple of LCM(a,b,c) > 999.\n\nRemainders:\n(a + b) % n = [(a%n) + (b%n)] % n\n(a × b) % n = [(a%n) × (b%n)] % n\n\nLast digit problems: Pattern of last digit repeats in cycle. 7^1=7, 7^2=9, 7^3=3, 7^4=1, cycle repeats every 4. So 7^21 = 7^(4×5+1) = last digit same as 7^1 = 7.",
      },
      {
        title: "10) Data Interpretation Strategy",
        type: "Concept",
        content:
          "DI is the HIGHEST-weightage topic in most aptitude exams and screening tests.\n\nApproach EVERY DI set with this 5-step mental routine:\n\nStep 1: SCAN the data (1 min). What are the axes? What is the unit? What period? Don't read questions yet.\nStep 2: READ the first question. Understand what's being asked.\nStep 3: LOCATE the data. Which table / chart / bar / slice do you need?\nStep 4: COMPUTE. Approximate where possible (don't calculate 2 decimal places if answer choices are far apart).\nStep 5: MARK and move. Don't double-check till end.\n\nKey tips:\n• Look at options first. If they are far apart (100, 250, 500, 800), you can approximate heavily.\n• Use fractions instead of decimals: 12.5% = 1/8, 33.3% = 1/3, etc.\n• Compare ratios: instead of calculating A/B × 100 for each, cross-multiply to compare — faster.\n• 'Approximately what %' questions: use BASE-10 method. 10% of X = move decimal one left. 1% = move 2 left. Build up.\n• Growth% = (New − Old)/Old × 100. Always divide by OLD, not new!\n• Common mistake: reading the wrong bar / wrong year. SLOW DOWN on the 'locate' step.\n\nDI TYPES you will encounter:\na) Bar charts — easiest. Comparison across categories.b) Line charts — trends over time. Watch for steepness (slope = rate of change).c) Pie charts — parts to whole. Total = 100% or 360°. If in degrees: value = slice/360 × total. If in %: value = slice% × total.d) Tables — most information-rich. But easy to misread row/column. Use finger/pen.e) Caselet / paragraph-based DI — convert paragraph into your OWN rough table first, then solve.\n\nCommon DI calculations you must do FAST:\n1) 17.5% of 2,400 = 10% + 7.5% = 240 + 180 = 420\n2) Ratio comparison: 43/140 vs 31/110. Cross multiply: 43×110=4730, 31×140=4340. So 43/140 > 31/110.\n3) Growth from 280 to 350: 70/280 = 1/4 = 25%. Growth from 350 to 280: −70/350 = −20%. (Note: same absolute change, different % because denominator changes.)",
      },
      {
        title: "11) Logical Reasoning",
        type: "Concept",
        content:
          "Most common types in finance/BFSI screening tests:\n\na) Seating arrangements (circular, linear, rectangular)\n- Draw clear diagrams\n- Count positions carefully\n- Use 'definite' clues first, then 'relative' clues\n- For circular: draw a circle, mark positions; remember people face the CENTER (unless specified otherwise)\n- For linear: people facing north = your left = their left. Facing south = flipped.\n\nb) Blood relations:\n- Use symbols: + for male, − for female, — for siblings, ═ for couples, ↓ for parent-child\n- Make family tree. Use generations: Grandparents → Parents → Siblings/Spouse → Children\n- Common coded relations: 'A + B' means A is father of B. Decode each symbol into a line on tree.\n- 'Mother's only child' = that person. 'Father's wife' = mother. Use these quick simplifications.\n\nc) Syllogisms: 2-3 statements, what conclusions follow? METHOD: Draw Venn diagrams for each statement. Check if conclusion MUST be true (not just 'can be'). 'All A are B' → circle A inside circle B. 'Some A are B' → overlapping circles. 'No A is B' → separate circles. Be wary of 'possibility' conclusions.\n\nd) Number / letter series:\n- Check difference (AP), ratio (GP), squares / cubes of natural numbers with adjustments\n- Alternating series: separate odd and even positions into two series\n- Look at 1st differences, 2nd differences, signs\n- Pattern of squares: 1,4,9,16,25,36,49,64,81,100,121,144,169,196,225\n- Pattern of cubes: 1,8,27,64,125,216,343,512,729,1000\n- Pattern of primes: 2,3,5,7,11,13,17,19,23,29,31\n\ne) Direction / distance problems:\n- Draw compass. North = up. Use Pythagoras theorem for shortest distance back.\n- 'Person facing North, turns 90° clockwise → faces East. Another 90° clockwise → South.'\n- Left/right turns depend on facing direction.\n\nf) Coding-decoding:\n- Same letter → same code, find mapping\n- Positions in alphabet (A=1, B=2… Z=26). Memorize E=5, J=10, O=15, T=20 as reference points.\n- Opposite positions: A↔Z, B↔Y, C↔X (sum = 27)\n- Reverse of word, skip pattern, sum/difference of adjacent letters.",
      },
      {
        title: "12) Number Series Practice — 20 patterns",
        type: "Q&A",
        qa: [
          { q: "1) 2, 4, 8, 16, 32, ?", a: "64 — GP with ratio 2. Each ×2." },
          { q: "2) 1, 4, 9, 16, 25, ?", a: "36 — squares of 1,2,3,4,5,6" },
          { q: "3) 2, 3, 5, 7, 11, 13, ?", a: "17 — prime numbers in sequence" },
          { q: "4) 1, 1, 2, 3, 5, 8, 13, ?", a: "21 — Fibonacci: each = sum of previous two" },
          { q: "5) 3, 6, 11, 18, 27, ?", a: "38 — differences are 3,5,7,9,11 (odd numbers)" },
          { q: "6) 2, 12, 36, 80, 150, ?", a: "252 — pattern: n²(n+1). For n=6: 36×7=252." },
          { q: "7) 30, 15, 15, 22.5, 45, ?", a: "112.5 — multipliers: 0.5, 1, 1.5, 2, 2.5..." },
          { q: "8) 1, 3, 6, 10, 15, 21, ?", a: "28 — triangular numbers, differences increase by 1 each (2,3,4,5,6,7)" },
          { q: "9) 100, 50, 50, 75, 150, ?", a: "375 — pattern ×0.5, ×1, ×1.5, ×2, ×2.5" },
          { q: "10) 5, 9, 17, 33, 65, ?", a: "129 — each = previous ×2 −1" },
          { q: "11) 7, 14, 28, 56, 112, ?", a: "224 — ×2 each" },
          { q: "12) 1, 8, 27, 64, 125, ?", a: "216 — cubes of 1,2,3,4,5,6" },
          { q: "13) 3, 7, 15, 31, 63, ?", a: "127 — pattern: 2^(n+1) −1 or previous×2+1" },
          { q: "14) 2, 5, 12, 27, 58, ?", a: "121 — each = previous×2 + (1,2,3,4,5)" },
          { q: "15) 1, 2, 5, 14, 41, ?", a: "122 — differences multiply by 3 (1,3,9,27,81)" },
          { q: "16) 5, 8, 14, 26, 50, ?", a: "98 — differences double: 3,6,12,24,48" },
          { q: "17) 4, 9, 20, 43, 90, ?", a: "185 — each = previous×2 + (1,2,3,4,5)" },
          { q: "18) 1, 4, 13, 40, 121, ?", a: "364 — pattern ×3 +1 each" },
          { q: "19) 5, 8, 13, 21, 34, 55, ?", a: "89 — Fibonacci variant: each = sum of previous two" },
          { q: "20) 10, 10, 20, 60, 240, ?", a: "1200 — multipliers: 1,2,3,4,5,6" },
        ],
      },
    ],
  },
  {
    id: "apt-mixed",
    category: "Aptitude",
    icon: "✏️",
    title: "30 Mixed Practice Questions with Solutions",
    summary: "Solve these. Cover all topic types. Set a timer — 40 min target.",
    items: [
      {
        title: "30 Problems — all with detailed solutions",
        type: "Q&A",
        qa: [
          { q: "1) A shopkeeper sells at 10% profit. If he had bought at 10% less and sold at ₹2 less, he would have made 16⅔% profit. Find original CP.", a: "Let CP = x, so SP = 1.1x. New CP = 0.9x, new SP = 1.1x − 2. New profit% = (New SP / New CP − 1) × 100 = 50/3. So (1.1x − 2)/0.9x − 1 = 50/300 = 1/6. (1.1x − 2)/0.9x = 7/6. Cross multiply: 6(1.1x−2) = 6.3x → 6.6x − 12 = 6.3x → 0.3x = 12 → x = ₹40." },
          { q: "2) A sum of money doubles itself in 8 years at SI. In how many years will it triple?", a: "Doubling means SI = P in 8 years. So P = (P×R×8)/100 → R = 100/8 = 12.5%. Tripling means SI = 2P. 2P = (P×12.5×T)/100 → T = 200/12.5 = 16 years. Shortcut: time doubles in 8, tripling takes another 8 = 16 (SI is linear in time)." },
          { q: "3) Train A is 200 m long, speed 72 km/hr. Train B is 300 m long, speed 54 km/hr, same direction. Time for A to cross B?", a: "Same direction: relative speed = 72−54 = 18 km/hr = 5 m/s. Distance = 200+300 = 500 m. Time = 500/5 = 100 seconds." },
          { q: "4) Boat goes 30 km downstream and comes back in 4 hours 30 min. Boat speed in still water is 15 km/hr. Find stream speed.", a: "Let stream = S. Downstream = 15+S, upstream = 15−S. 30/(15+S) + 30/(15−S) = 4.5. LCM denominator: 30×30 / (225−S²) = 4.5 → 900/4.5 = 225−S² → 200 = 225−S² → S²=25 → S = 5 km/hr." },
          { q: "5) A can do work in 10 days. A and B together in 6 days. B alone in how many days?", a: "LCM(10,6)=30. A=3 units/day, Together=5 units/day. So B=2 units/day. B alone = 30/2 = 15 days." },
          { q: "6) Ratio of incomes A:B = 4:3. Ratio of expenditures 3:2. Each saves ₹5,000. Find A's income.", a: "Incomes: 4x, 3x. Expenditures: 3y, 2y. Savings: 4x−3y=5000 and 3x−2y=5000. Solve: 8x−6y=10000 and 9x−6y=15000. Subtract: x=5000. So A income = 4x = ₹20,000." },
          { q: "7) Compound interest on a sum for 2 years is ₹410, simple interest for same time and rate is ₹400. Find rate and principal.", a: "SI = 400 → year1 SI = 200, year2 SI = 200. CI adds 'interest on interest' on year1's SI = 410 − 400 = 10. So 10 = R% of 200 → R = 5%. Principal: 400 = (P×5×2)/100 → P = ₹4,000." },
          { q: "8) How many words can be formed using all letters of 'TRIANGLE'?", a: "8 distinct letters → 8! = 40320. With T at start and E at end: fix both, arrange remaining 6 = 6! = 720." },
          { q: "9) From 6 men and 4 women, committee of 5 with at least 2 women?", a: "Cases: 2W+3M, 3W+2M, 4W+1M. = 4C2×6C3 + 4C3×6C2 + 4C4×6C1 = 6×20 + 4×15 + 1×6 = 120+60+6 = 186." },
          { q: "10) Probability of getting exactly 2 heads in 5 coin flips?", a: "5C2 × (1/2)^5 = 10/32 = 5/16." },
          { q: "11) Bag has 5 red, 4 blue, 3 green balls. 2 drawn randomly. P(both same color)?", a: "Total ways = 12C2 = 66. Same color: 5C2 + 4C2 + 3C2 = 10 + 6 + 3 = 19. P = 19/66." },
          { q: "12) HCF and LCM of two numbers are 12 and 420. If one number is 84, find the other.", a: "Product = HCF × LCM. 84 × other = 12 × 420. Other = 5040/84 = 60." },
          { q: "13) A man covers half distance at 30 km/hr and remaining half at 60 km/hr. Avg speed?", a: "Avg speed = 2xy/(x+y) = 2×30×60/(30+60) = 3600/90 = 40 km/hr." },
          { q: "14) A's salary is 30% more than B's. B's salary is how much % less than A's?", a: "Let B = 100, A = 130. B less than A = (130−100)/130 × 100 = 30/130 × 100 = 23.08%. NOT 30%!" },
          { q: "15) Population increased by 20% first year, decreased by 10% second year. Net change over 2 years?", a: "Effective = 20 − 10 + (20×−10)/100 = 10 − 2 = 8% increase. Check: 100 → 120 → 108. Net +8%." },
          { q: "16) A sells to B at 20% profit, B sells to C at 10% profit. C pays ₹6600. What did A pay?", a: "Work backwards: B's SP = 6600 = 110% of B's CP → B's CP = 6000 = A's SP. A's SP = 6000 = 120% of A's CP → A's CP = 6000 × 100/120 = ₹5000." },
          { q: "17) 3 pipes A, B, C can fill tank in 30, 20, 10 min. All open together for 5 min, then C closed. Total time to fill?", a: "LCM=60. A=2, B=3, C=6 units/min. In 5 min together: 11×5 = 55 units. Remaining = 5 units with A+B (5 units/min) = 1 more min. Total = 6 minutes." },
          { q: "18) What is the angle between hour and minute hands at 3:15 PM?", a: "At 3:15, minute at 90°. Hour at 3 + 15/60 = 3.25 on clock. Each hour = 30°. Hour hand = 3.25 × 30 = 97.5°. Angle = 97.5 − 90 = 7.5°." },
          { q: "19) Day of week on 15 August 1947?", a: "Odd days method. 1600 years = 0 odd days. 300 years = 1 odd day. 46 years = 35 ordinary + 11 leap = 35 + 22 = 57 = 1 odd day (57/7 rem 1). Jan 1 to Aug 15 = 31+28+31+30+31+30+31+15 = 227 days = 227/7 = 3 odd days. Total odd = 0+1+1+3 = 5. 0=Sun, 1=Mon, ... 5=Fri. So FRIDAY." },
          { q: "20) If '+' means '×', '−' means '+', '×' means '÷', '÷' means '−', evaluate 15 − 3 × 5 + 6 ÷ 4", a: "Replace symbols with new meanings: 15 + 3 ÷ 5 × 6 − 4. Now normal order: 15 + (3/5×6) − 4 = 15 + 3.6 − 4 = 14.6 = 73/5." },
          { q: "21) Average of 11 numbers is 60. Avg of first 6 is 59, avg of last 6 is 62. Find the 6th number.", a: "Sum of 11 = 660. Sum first 6 = 354. Sum last 6 = 372. Sum(first 6 + last 6) = Sum(11) + 6th (counted twice). 354+372 = 660 + 6th. 6th = 726−660 = 66." },
          { q: "22) Mixture of 40 liters has milk:water = 3:1. How much water to add to make ratio 2:1?", a: "Milk = 30 L, water = 10 L. Add x water: 30/(10+x) = 2/1 → 30 = 20+2x → x = 5 liters." },
          { q: "23) A can do work in 12 days, B in 18 days. They work alternately starting with A. Total days?", a: "LCM=36. A=3, B=2 units. 2-day cycle = 5 units. 7 cycles (14 days) = 35 units. Day 15: A does 1 more unit → total 36. Answer = 15 days." },
          { q: "24) Income tax rate 10% up to ₹5L, 20% on next ₹5L, 30% beyond. Person earns ₹18L. Tax?", a: "0 on first 2.5L (standard deduction). Then: 2.5L @ 5% (old regime) / 0@5%, 5L@20%, 8L@30%... Depends on regime. For NEW regime (simpler 2023-24): 0-3L nil, 3-6L @5%, 6-9L @10%, 9-12L @15%, 12-15L @20%, >15L @30%. So 18L: 0+15K+30K+45K+60K+90K = ₹2.4L + cess." },
          { q: "25) A and B can complete work in 30 days. After 20 days, A left. B finished remaining in 20 more days. B alone in how many days?", a: "Work = 30(A+B). Done: 20(A+B). Remaining: 10(A+B) = 20B. So 10A+10B = 20B → 10A = 10B → A = B. Since A+B takes 30 days and A = B, each alone takes 60 days." },
          { q: "26) 729 ml mixture has milk and water in ratio 7:2. How much water to add to get ratio 7:3?", a: "Milk = 7/9×729 = 567. Water = 162. Add x water: 567/(162+x) = 7/3 → 1701 = 1134+7x → x = 567/7 = 81 ml." },
          { q: "27) What comes next: 2, 12, 30, 56, 90, ?", a: "Pattern: 1×2, 3×4, 5×6, 7×8, 9×10, next = 11×12 = 132." },
          { q: "28) If 10 men complete work in 20 days, 20 women in 15 days. 5 men + 10 women in how many days?", a: "Work = 200 man-days = 300 woman-days. So 1 man-day = 1.5 woman-days. 5 men + 10 women = 7.5+10 = 17.5 women/day. Days = 300/17.5 ≈ 17.14 days = 18 days (rounded up). As fraction: 120/7 or 17 1/7." },
          { q: "29) At what time between 4 and 5 o'clock are hands of clock in opposite direction (straight line)?", a: "At 4, hour at 120°. Need 180° separation → total hour-minute gap = 120+180 = 300°. Minute catches up at 11/2° per minute (5.5°/min). Time = 300 / 5.5 = 600/11 ≈ 54.54 min past 4. So 4:54:32 approximately." },
          { q: "30) The difference between CI and SI on a sum for 2 years at 10% p.a. is ₹200. Principal?", a: "CI−SI for 2 years = P(R/100)². So 200 = P(10/100)² = P×0.01 → P = ₹20,000. Check: SI = 4000, CI = 4200, diff = 200. ✓",
          },
        ],
      },
    ],
  },
];

// ============ HR / RESUME MODULES ============

const hrModules: LearningModule[] = [
  {
    id: "hr-resume",
    category: "HR/Resume",
    icon: "📄",
    title: "Resume Building — Templates + Do's and Don'ts",
    summary: "Your resume is your first impression. Get it RIGHT.",
    items: [
      {
        title: "1-Page Resume Template (fill this EXACTLY)",
        type: "Script",
        content:
          "NAME (bold, 14-16pt, centered)\nMobile: +91 xxxxx xxxxx | Email: your.professional.email@gmail.com | Location: City, State\nLinkedIn: linkedin.com/in/yourprofile  |  GitHub: github.com/username\n\nPROFILE SUMMARY (2-3 sentences, tailored per company)\nFinance PGDM student at [College] with specialization in FINANCE and a minor in Business Analytics. Proficient in financial analysis, ratio analysis, and valuation, with hands-on experience in advanced Excel, SQL, and Power BI. Seeking an Equity Research Analyst / Financial Analyst role to apply analytical skills and grow with an organization that values rigorous analysis.\n\nKEY SKILLS (3 columns, match job description)\n• Financial Modeling & Valuation\n• Ratio Analysis, Equity Research\n• NPV / DCF, Capital Budgeting\n• Credit Risk Analysis\n• Financial Statement Analysis\n• Time Value of Money, Bonds, Derivatives\n\nANALYTICS SKILLS\n• Advanced Excel (Pivot, XLOOKUP, INDEX-MATCH, DAX)\n• SQL (joins, window functions, aggregations)\n• Power BI (data modeling, dashboards, DAX measures)\n• Python / Pandas (data cleaning, analysis, visualization)\n• Statistics (hypothesis testing, regression, descriptive stats)\n\nEDUCATION\n[Year-Year]  PGDM (Finance + Analytics), [B-School Name], [City]  | CGPA / Percentile: ___ / ___ %\n[Year-Year]  [B.Com / BBA / B.Sc], [College Name], [University]  | Percentage: ___ %\n[Year-Year]  12th (Commerce), [School Name], [Board]  | Percentage: ___ %\n[Year-Year]  10th, [School Name], [Board]  | Percentage: ___ %\n\nCERTIFICATIONS (add real ones)\n• Financial Modeling & Valuation Analyst (FMVA) — CFI  |  [Or any real cert you do]\n• Excel for Finance — Corporate Finance Institute\n• SQL for Data Analysis — Coursera / freeCodeCamp\n• Power BI Desktop — Microsoft Learn\n• Python for Finance — Investopedia Academy\n\nINTERNSHIP / LIVE PROJECTS\n[Month-Year to Month-Year]  Summer Intern — Finance, [Company Name], [City]\n• Analyzed [X] entries in loan portfolio to identify [Y] pattern\n• Built [describe Excel model / dashboard] reducing [manual effort]\n• Presented findings to [mentor / team] resulting in [action / recommendation]\n\n[Month-Year]  Live Project — Equity Valuation of [Company Name]  (self / college)\n• Built 3-statement projection model (P&L, BS, CFS) in Excel\n• Performed DCF valuation with WACC of ___%, arriving at target price of ₹___\n• Performed sensitivity analysis on growth rate and WACC\n• Built comparable company analysis using 6 peer multiples\n\n[Month-Year]  Live Project — Sales Dashboard using Power BI\n• Imported and cleaned [X] rows of sales data using Power Query\n• Built 4-page interactive dashboard with YoY comparison and top products\n• Created DAX measures for revenue, profit margin, and growth\n\nACADEMIC PROJECTS & ACHIEVEMENTS (1-2 lines each)\n• Won 1st / 2nd / participated in [Finance Case Study competition], [College]\n• Best project / team award for [topic]\n• Top 10% / merit scholarship — mention any academic distinction\n• Read and analyzed 10+ annual reports of listed Indian companies\n\nEXTRA-CURRICULAR / POSITIONS OF RESPONSIBILITY\n• [Club / committee role] — brief impact\n• [Sport / activity] — if relevant\n\nPERSONAL PROFILE (optional, shorter version of Tell-Me-About-Yourself)\n• Interests: Reading business news, equity markets, following Indian economy\n• Languages: English (professional working), Hindi (native)\n\nTIPS:\n1) Use BULLET points with action verbs: Analyzed, Built, Created, Led, Designed, Evaluated, Improved, Managed, Presented, Streamlined\n2) Quantify everything! 'Improved efficiency' → BAD. 'Reduced manual reporting time by 40% (from 5 hrs to 3 hrs)' → GOOD\n3) Keep to 1 PAGE. Recruiters spend 6-10 seconds on first pass.\n4) Reverse-chronological (latest first).\n5) Save as PDF. Never send .docx file.\n6) File name: 'Sumit_Singh_Finance_Analyst_Resume.pdf' (never 'resume.pdf' or 'CV new 2024 final latest.docx')\n7) Customize profile summary for EACH company. Yes, it takes 5 minutes. Yes, it matters.\n8) NO typos. No 'hobbies: listening to music, traveling' — meaningless unless you have a real achievement in it.\n9) NO photo on resume (unprofessional in India for professional roles unless explicitly asked).\n10) Do NOT lie. Every point can and will be probed in technical interview. If you write 'expert in DCF', be ready for a 15-min grilling on WACC, terminal value, beta.",
      },
      {
        title: "Resume Red Flags — avoid these at all cost",
        type: "Concept",
        content:
          "MISTAKES that get a resume rejected INSTANTLY (I see these every year):\n\n1) TYPOs and grammar errors — even ONE is enough for entry-level roles. Proofread 3 times + get a friend to read.\n\n2) Long paragraphs instead of bullet points — recruiters don't 'read', they SCAN. Short bullets only.\n\n3) 3+ pages — unless you're PhD or 20+ years experienced, 1 page is MAXIMUM for entry level.\n\n4) Generic objective like 'Looking for challenging role…' — meaningless fluff. Replace with specific profile summary.\n\n5) Irrelevant details — 12th class marks when you have PGDM, primary school achievements, 'hobbies: reading, music' with no real achievement.\n\n6) Using 'I' / 'me' in bullets — 'I analyzed' → just start with verb 'Analyzed'.\n\n7) Exaggeration / lying — 'Expert in machine learning' when you've done 1 online course. Interviewer will catch this.\n\n8) Inconsistent dates / gaps — if you have a 6-month gap, acknowledge it in cover letter/HR interview (don't try to hide by removing months).\n\n9) Fancy designs, colored boxes, photos — unless applying to design/creative fields, clean black-on-white is ALWAYS better. Use Canva for a clean template.\n\n10) Email like 'coolsumit99@gmail.com' or 'sumit.singh_1999@yahoo.com' — create a new one: firstname.lastname.2024@gmail.com or sumitsingh.2025@gmail.com.\n\n11) Missing contact info or dead LinkedIn link — make sure everything works.\n\n12) No specific projects — just 'interned at X company' without saying WHAT you did, OUTCOME you delivered.\n\n13) Using 'etc.' or 'and others' — if you can't name it, don't put it.\n\n14) ALL CAPS words for emphasis — one page, no yelling needed.\n\n15) Font size < 10pt or weird font (Comic Sans, Papyrus). Stick to: Calibri 10-11pt (safe corporate default) or Arial 10-11pt.",
      },
      {
        title: "Cover Letter Template",
        type: "Script",
        content:
          "Date\n\n[Hiring Manager / HR Name — if you can find it, otherwise 'Hiring Team']\n[Company Name]\n[Address]\n\nSubject: Application for the role of [Role Name]\n\nDear Sir / Ma'am,\n\nI am writing to express my strong interest in the [Role Name] position at [Company Name] as advertised through [campus placement drive / company website / referral from X]. As a PGDM Finance student at [College] with hands-on experience in financial analysis and analytics, I believe I would be a valuable addition to your team.\n\nOver the past [18 months], I have developed strong fundamentals in financial modeling, equity research, ratio analysis, and valuation. During my summer internship at [Company], I [brief impact: e.g., analyzed the retail lending portfolio and built a dashboard that reduced manual reporting by ~2 hours per week]. I complement this finance foundation with technical analytics skills: advanced Excel modeling, SQL, and Power BI for dashboarding. I recently completed a self-driven project on equity valuation of [Company] using a 3-statement DCF model.\n\nWhat draws me specifically to [Company Name] is [1-2 specific sentences about the company — recent news, financial results, culture, or a particular business area]. I've been following the company's work and I am excited about the prospect of contributing to [specific department / business line].\n\nI would be grateful for an opportunity to discuss how my background, skills, and enthusiasm can contribute to [Company Name]'s continued success. I am available for an interview at your convenience and would be happy to provide any additional information.\n\nThank you for considering my application.\n\nSincerely,\nSumit Singh\nMobile: +91 xxxxx xxxxx\nEmail: your.email@gmail.com\nLinkedIn: linkedin.com/in/yourprofile\n\nNOTE: Customize the middle paragraph and the 'What draws me to…' line for EACH company. Don't mass-send one cover letter. Spending 5 minutes reading the company's latest annual report or press release for one specific point will get you noticed.",
      },
      {
        title: "LinkedIn Optimization — 10 steps",
        type: "Concept",
        content:
          "Your LinkedIn is as important as your resume. Do these 10 things today:\n\n1) HEADLINE (120 characters): Do NOT write 'Student at X College'. Write what you want to BE and what you can DO. Example: 'PGDM Finance & Analytics Student | Equity Research | Financial Modeling | Advanced Excel, SQL, Power BI | Seeking Entry-Level Finance Analyst Opportunities'\n\n2) ABOUT section (200-300 words). 3-paragraph structure:\nPara 1: Who you are, what you're studying, your focus area.\nPara 2: Your technical skills + 1 project example with impact.\nPara 3: What you're looking for (specific roles, companies you admire, how you can add value) + call to action ('Feel free to connect — always open to learning and opportunities.')\n\n3) PROFILE PHOTO: Professional headshot (formal shirt, plain background, face clear, smiling). No selfies, no group photos, no sunglasses.\n\n4) EXPERIENCE section: Add internship, live projects, freelance work — same format as resume with quantified bullet points.\n\n5) EDUCATION: Add PGDM and graduation, with CGPA / % if strong.\n\n6) SKILLS: Add 15-25 skills. Finance: Financial Analysis, Valuation, Equity Research, DCF, Ratio Analysis, Financial Modeling, NPV, WACC, Capital Budgeting, Risk Analysis, Mutual Funds, Derivatives, Bonds. Analytics: Excel, Power BI, SQL, Python, Pandas, Data Analysis, Data Visualization, DAX, Statistics. Soft: Communication, Teamwork, Analytical Skills, Problem Solving. Get peers to ENDORSE your skills.\n\n7) LICENSES & CERTIFICATIONS: Add every real certificate — even free ones from Coursera / freeCodeCamp. Attach link.\n\n8) PROJECTS: Add your best 2-3 projects (DCF Valuation, Power BI Dashboard, SQL Analysis). Use the 'Projects' section (add from 'Add profile section').\n\n9) NETWORK STRATEGY: Send 10 connection requests DAILY to:\n• People in finance roles at your target companies (with a polite note: 'Hi [Name], I came across your profile — I'm a PGDM Finance student preparing for campus placements and admire your career path. Would love to connect and learn from your journey.')\n• Alumni of your college (find via 'Alumni' on college LinkedIn page)\n• HR / Recruitment professionals at target companies\nNever spam. Personalize every request. Build relationships, don't just collect connections.\n\n10) CONTENT: Share 2-3 posts per week. It doesn't have to be original thought — share:\n• Article from Mint / ET with your 1-sentence take: 'Interesting read on the state of banking NPAs. The improvement in PCR is encouraging — suggests better preparedness than 2018 cycle.'\n• A chart / snippet from your live project: 'Recently finished a DCF valuation on [Company]. One insight: the terminal value assumptions drive ~65% of my valuation — reminder to always do sensitivity analysis.'\n• A question: 'Curious what working professionals think — for entry-level finance roles, how important is SQL vs Excel? Would love to hear from recruiters and analysts.'\n\nLinkedIn is long-term. The profile takes 2-3 hours to build well, but it's a career-long asset. Recruiters WILL look at your LinkedIn before shortlisting — make sure they see a professional, serious candidate.",
      },
    ],
  },
  {
    id: "hr-current",
    category: "HR/Resume",
    icon: "📰",
    title: "Current Affairs & Business News — Top Interview Themes",
    summary: "Finance interviews ALWAYS test current affairs knowledge. Read this before every interview.",
    items: [
      {
        title: "Top 10 Business / Economic Themes 2024-2026",
        type: "Concept",
        content:
          "1) INDIA GROWTH STORY — India overtaking UK/Germany/Japan to become 3rd largest economy by 2027-29 (currently ~$3.7T, target $5T by 2029). Nominal GDP growth 10-12% (7% real + 3-4% inflation). 'Modi 3.0' continuity reforms driving sentiment.\n\n2) MANUFACTURING REVIVAL — PLI scheme (14 sectors, ₹1.97L Cr outlay). Sectors with traction: electronics (Apple making iPhones in India via Foxconn), auto, pharmaceuticals, specialty chemicals, textiles. Manufacturing share of GDP rising from 15% to 17-18%. Future target 25% (long way to go).\n\n3) BANKING HEALTH AT DECADE-BEST — Gross NPAs fallen from peak 11.5% (2018) to ~3.9% (2024). PCR (provision coverage) at 10-yr high. Private banks (HDFC, Kotak, ICICI) leading. PSU banks (SBI, BoB) re-rated. Corporate credit growth accelerating — capex cycle pick up.\n\n4) RBI MONETARY POLICY STANCE — CPI inflation at 4-5% (within RBI's 2-6% band, close to 4% target). Repo rate held at 6.5% through most of 2024. Market expecting rate CUTS starting late 2024/early 2025 — good for NBFCs, real estate, rate-sensitive stocks.\n\n5) GOVT FISCAL CONSOLIDATION — Fiscal deficit target 4.5% of GDP by FY26 (from ~5.9% FY24). Govt reducing revenue expenditure, pushing productive capex (₹11.11L Cr in FY25). Capital expenditure multiplier ~3 (each ₹1 spent generates ~₹3 in economy).\n\n6) CORPORATE EARNINGS AT PEAK — Nifty earnings CAGR ~16% over 3 years. Banks, industrials, consumer discretionary leading. IT sector facing slowdown from US/EU spending.\n\n7) FDI + FPI FLOWS — India among largest FDI recipients in emerging markets (~$50-70B/yr). FPI flows volatile: strong inflows when global rates fall, outflows when they rise + dollar strengthens. India's weight in MSCI EM index rising.\n\n8) DIGITAL INDIA LEADERSHIP — UPI at 13B+ transactions/month (world's largest real-time payments system). Account Aggregator framework, ONDC, DigiLocker, Digital Public Infrastructure (DPI). India exporting this stack globally — GIFT City, cross-border UPI.\n\n9) GLOBAL RISKS — (a) US-China trade/tech war, (b) Geopolitical (Russia-Ukraine, West Asia affecting energy prices), (c) Global growth slowdown (especially Europe/China), (d) El Niño and monsoon risk for India food inflation, (e) Crude oil prices ($70-90 range manageable; spike to $100+ = bad).\n\n10) SECTORS IN FOCUS FOR NEXT 3-5 YEARS — (a) Manufacturing / Industrials (capex cycle), (b) Banking & Financials (credit growth), (c) Consumer Discretionary (income growth, premiumization), (d) Renewable Energy + EVs (energy transition), (e) Defense (Make in India + exports), (f) Specialty Chemicals (China+1). OUT of favor: IT services (global slowdown), Commodities (global growth uncertainty).\n\nFor EVERY interview, read: 1) Latest RBI policy review summary 2) Last 2 issues of Mint for top news 3) 1 recent major market event 4) Union Budget highlights if during Budget season 5) Any major merger/acquisition happening currently\n\nRule: If you don't know the answer to a current affairs question, SAY 'I'm not fully up to date on this specific development, but from what I have read, my understanding is… [give your best] — I'd be interested to learn more about it after the interview.' Never blatantly lie or make up numbers."
      },
      {
        title: "Specific Question Bank — prepare 1-line opinion on each",
        type: "Q&A",
        qa: [
          { q: "Is India a $5-trillion economy by 2029 realistic?", a: "From current ~$3.7T, need 10-11% nominal growth CAGR. India has been growing at 7-8% real + 3-4% inflation = 10-12% nominal. So YES, achievable IF policy continues to support growth and there's no major global shock. The bigger question is whether GDP growth translates into JOBS and per-capita income improvement — India's per-capita is still only ~$2,500 vs China's ~$12,000." },
          { q: "What's your view on the banking sector?", a: "Banking is in its best health in a decade. Gross NPA at 3.9%, PCR at 72%+, credit growth at 15%+. Corporate credit cycle reviving as private capex picks up. Private banks (HDFC, Kotak, ICICI) continue gaining market share. PSU banks (SBI) re-rated after clean-up. Risk to watch: rising retail NPAs in unsecured lending (personal loans, credit cards) and whether corporate credit growth sustains." },
          { q: "What is your take on RBI keeping repo rate at 6.5%?", a: "RBI is in a 'wait and watch' or 'withdrawal of accommodation' stance. With CPI falling to 4-5% (within the 4% ± 2% band), the case for rate cuts is building. However, RBI is being cautious because of (a) food inflation volatility from monsoon risk, (b) global rate trajectory (if Fed cuts slower, RBI may not cut aggressively to prevent rupee pressure), and (c) crude oil prices. My view: first rate cut likely by end of this year / early next — good for NBFCs, consumer durables, real estate." },
          { q: "Should India focus on manufacturing or services?", a: "Both. Services already contribute 55%+ of GDP and $300B+ exports — IT/BPO, fintech, BFSI are India's strength. But services alone cannot employ India's 1.3 billion people — especially those moving out of agriculture. For mass job creation, manufacturing needs to grow from current 17% to 25% of GDP. PLI, Make-in-India, and China+1 opportunity provide a once-in-a-generation tailwind. In short: services = short-term growth engine, manufacturing = long-term employment engine." },
          { q: "What is the biggest risk to the Indian stock market?", a: "Three risks in order: (1) Global: US Fed rate trajectory and dollar strength — higher-for-longer rates → FPI outflows, currency pressure, EM sell-off. (2) Domestic: Monsoon failure → food inflation spike → RBI unable to cut rates → rural demand slowdown. (3) Valuation: Nifty trading at ~20-21x forward PE — slightly above 5-yr average (~18-19x). Not bubble territory, but leaves less margin of safety. However, India's long-term structural story (demographics, reforms, digitization) remains intact and any correction would be a buying opportunity." },
          { q: "Are valuations expensive right now?", a: "Nifty 50 forward P/E of 20-21x vs 5-yr average of ~18-19x = slightly expensive but not in bubble territory. Mid/small caps have run up faster and many are trading well above historical averages — where the REAL risk lies. Sectors like industrials, capital goods, renewables, defense — expensive multiples priced in. Value available in large-cap banks (trading at ~15x forward P/E, growing at 15-20%), PSU banks, and parts of consumption. My advice: stick to quality large-caps; be very selective in mid/small caps." },
          { q: "Your sector picks for next 1-2 years and why?", a: "OVERWEIGHT: (1) BANKING & NBFCs: Credit growth 14-15%, NPA cycle at bottom, rate cuts coming = margin expansion tailwind. (2) CAPITAL GOODS / INFRASTRUCTURE: Govt capex at all-time high, private capex reviving, order books strong (L&T, BHEL, Thermax, Voltas). (3) CONSUMER DISCRETIONARY: Discretionary spending rises with per-capita income; premiumization theme strong (Jubilant, Voltas, Titan, Sapphire Foods). NEUTRAL / UNDERWEIGHT: (a) IT SERVICES — US/EU discretionary spend slowdown, deal pipeline weak. (b) COMMODITIES — global growth uncertainty + China slowdown. (c) FMCG — high valuations, volume growth just recovering." },
          { q: "Impact of elections on markets?", a: "Market discounted BJP/NDA victory well before results. After 2019 and 2024 elections, markets rallied because continuity of reforms was the expectation. The real driver is POLICY CONTINUITY, not who wins — markets hate uncertainty. Pre-election rally often followed by 'buy on rumor, sell on news'. From a long-term perspective, elections matter less than structural reforms (GST, IBC, PLI, digital infrastructure), which have been bipartisan in direction (though pace differs by government).",
          },
          { q: "Your view on the Union Budget?", a: "Focus areas of recent budgets: (1) Continued CAPEX push — ₹11.11L Cr in FY25, 11% of GDP, with focus on roads, railways, renewable energy. (2) Personal income tax simplification — New regime made default with lower slabs, aiming to boost disposable income and shift people from old to new regime. (3) Fiscal consolidation target — 4.5% of GDP by FY26, credible path. (4) Sector specific: PLI expansion, EV ecosystem, fisheries, tourism, defense production. (5) Infrastructure status to data centers — signals seriousness about AI/digital economy. Overall, budgets have become more growth-oriented and less populist recently — a structural positive for markets." },
          { q: "Is there a recession risk in India?", a: "Very low for India. India's growth is primarily DOMESTIC consumption-driven (60% of GDP), not export-driven. Even during 2008 and 2020 global recessions, India only slowed (to ~3-4%) but never contracted. The US/EU slowdown would impact IT services exports (already visible) but unlikely to cause India-wide recession. However, a global financial crisis / crude spike above $120 would pressure CAD, rupee, and create imported inflation — that scenario would be negative. But base case: India grows 6-7%+ even in a mild global slowdown — fastest among large economies." },
        ],
      },
      {
        title: "HR Interview — Most Common 15 Questions with Model Answers",
        type: "Q&A",
        qa: [
          { q: "1) Introduce yourself", a: "Use 90-second script. End with: 'That briefly covers my background — I'd be happy to go deeper on anything.' Do NOT ramble for 5 minutes." },
          { q: "2) What are your greatest strengths?", a: "'Two strengths that I've consistently gotten feedback on: first, I'm detail-oriented with numbers — in my internship my mentor mentioned that my financial models had fewer errors than average for a summer intern. Second, I'm genuinely curious — I read business news and follow markets daily outside of academics, and I ask a lot of questions to understand the 'why' behind things.'" },
          { q: "3) What is your greatest weakness?", a: "'I've been working on my spoken English. Coming from a Hindi-medium background, I was not naturally confident speaking in professional settings. Over the past 18 months I've worked on this deliberately: I read articles aloud daily, record myself speaking, and practice with friends. I've improved significantly and I'm continuing to work on it because I know clear communication is essential in a corporate role.' KEY: weakness + action + progress." },
          { q: "4) Where do you see yourself in 5 years?", a: "'In the next 3 years, I want to master this role completely — whatever it takes. Then in 5 years, I'd like to be handling more complex assignments independently as a senior analyst. Beyond that, I want to build deep expertise in equity research / risk analysis / whatever the role is — and eventually contribute to strategic decisions. But the next 5 years are really about learning as much as I can and proving myself. The title will follow.'" },
          { q: "5) Why should we hire you over other candidates?", a: "'Three reasons. First, I have the right technical mix: strong finance fundamentals with working knowledge of Excel, SQL, and Power BI. Second, I'm genuinely interested in THIS specific role and COMPANY — I've done my homework and I know this is where I want to build my career. Third, I'm humble and hard-working. I know I still have a lot to learn, and I'm not coming in with any assumptions. I will come in, learn quickly, and make myself useful as soon as possible. If given this opportunity, I will give it my best.'" },
          { q: "6) Why finance? Why not marketing / HR / operations?", a: "'I genuinely enjoy working with numbers and understanding how businesses create or destroy value. When I look at a company's financials, I can see the real story behind the business. Also, finance is one of those rare fields where your decisions have direct impact — right or wrong is measurable. I like that rigor. Finally, I read markets and business news with genuine curiosity, not just for studies. Finance never feels like 'work' to me — it feels interesting.'" },
          { q: "7) What do you know about our company?", a: "'I've been following [Company] for a while. Some recent things I've noted: [mention 2-3 specific points: latest quarterly results — revenue growth X%, margins Y; recent announcement / acquisition; key business segments; mention of something from annual report]. I also know [Company] is known for [industry reputation / culture / specific strength]. The role of [role name] interests me because [specific alignment with your skills].' — this is where 10 minutes of reading the company's website pays off. DO NOT answer with generic 'you are a leading company'." },
          { q: "8) Are you willing to relocate?", a: "'Yes, absolutely. My preference is [City 1 / City 2] because [brief reason: family / industry concentration], but I'm open to any location that offers the right opportunity. For the right role, I would be happy to relocate.' — even if you have strong preferences, give flexibility first." },
          { q: "9) What are your salary expectations?", a: "'At this stage, my priority is finding the right opportunity where I can learn and contribute. I'm sure your company has a fair compensation structure for this role, and I would be comfortable with whatever is appropriate based on my profile and industry standards.' If pushed for a number: 'Based on my research for similar roles in comparable companies, the typical range for PGDM finance freshers is ₹8-15 LPA depending on role and company. I'd be comfortable within that range.' — give a RANGE, not a single number." },
          { q: "10) How do you handle pressure or stressful situations?", a: "'I stay calm by breaking the problem into steps. When I feel overwhelmed, I list what needs to be done in order of priority and tackle one thing at a time. During my internship, I had a deadline clash — my mentor needed an analysis by end of day on the same day another team was expecting a different output. I communicated the conflict, prioritized based on business impact, and stayed an extra 2 hours to ensure both were delivered. Since then, I plan tasks in advance to avoid such situations, but when they do arise, I stay organized, communicate, and prioritize.'",
            },
          { q: "11) Describe a time you failed or made a mistake", a: "STAR story: 'During a college finance case study competition, my team and I over-relied on one data source and missed an important industry shift. We finished outside the top 3. (S/T) After the competition, I went through the winning teams' presentations and realized our gap was not in analysis depth but in checking our assumptions against multiple sources. (A) Since then, I've made it a habit to cross-verify any claim with at least two independent sources and do a sensitivity test on key assumptions — which I carried into my internship and live projects. (R) This experience taught me that being wrong is fine if you learn from it, and rigor is more important than speed.'",
            },
          { q: "12) How do you stay updated on business / markets?", a: "'I follow a few sources daily: Mint and Economic Times for news, Bloomberg Quint / Moneycontrol for markets, and Finshots for a quick daily summary. For deeper understanding, I occasionally read company annual reports — recently went through [Company]'s report. On weekends, I watch one long-form video from an expert like [Damodaran / Any Indian market expert] and read one detailed ET Prime / Mint Long Story. I also maintain a small spreadsheet of companies I find interesting — it keeps me engaged. I don't just consume — I take notes and form opinions.'" },
          { q: "13) Do you plan to do an MBA / further studies?", a: "'Right now my full focus is on starting my career and learning as much as I can on the job over the next 3-5 years. The best learning for me right now will be in a real finance role with real responsibilities. Whether I pursue additional qualifications later — CFA, FRM, or executive programs — will depend on where my career takes me and whether there's genuine value addition. For now, I am fully committed to this role.' NEVER say 'I will do an MBA in 2 years'.",
            },
          { q: "14) What are your hobbies?", a: "'Outside academics, I read business news and follow Indian markets daily — I find it genuinely interesting. I also [mention 1 REAL activity with consistency: e.g., play cricket every weekend with friends / maintain a running habit of 20 km/week / read one non-fiction book per month]. I believe consistency in a hobby says more than a long list.'",
            },
          { q: "15) Do you have any questions for us?", a: "ALWAYS ask at least 2. Never say 'No, thank you.' Good ones: (a) 'What would success look like in this role in the first 6 months? What should a new joiner have accomplished?' (b) 'Could you tell me more about the team I'd be working with — the culture, the background of team members, how projects are structured?' (c) 'What are the biggest challenges the team or department is currently working through?' (d) 'How would you describe the culture here? And what does the company do to support learning for junior employees?' (e) 'Based on our conversation today, do you have any feedback on areas where I could improve?' — use this only in final rounds." },
        ],
      },
    ],
  },
];

// ALL modules combined + sorted by category order
export const ALL_MODULES: LearningModule[] = [
  ...financeModules,
  ...analyticsModules,
  ...englishModules,
  ...aptitudeModules,
  ...hrModules,
];

export const CATEGORY_ORDER = [
  "Finance",
  "Analytics",
  "English",
  "Aptitude",
  "HR/Resume",
] as const;
