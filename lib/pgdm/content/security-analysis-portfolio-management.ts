import type { Subject } from '../types';

/* ═══════════════════════════════════════════════════════════════
   SECURITY ANALYSIS & PORTFOLIO MANAGEMENT — Sem 3 · Finance Major
   ═══════════════════════════════════════════════════════════════ */

const frontierSvg = `
<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
  <defs>
    <linearGradient id="fshade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#134e4a" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#134e4a" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <line x1="70" y1="290" x2="720" y2="290" stroke="#334155" stroke-width="1.5"/>
  <line x1="70" y1="290" x2="70" y2="25" stroke="#334155" stroke-width="1.5"/>
  <text x="715" y="308" fill="#94a3b8" font-size="11" text-anchor="end">Risk (σ) →</text>
  <text x="85" y="32" fill="#94a3b8" font-size="11">Return (E[R]) →</text>

  <path d="M 130 240 C 210 175, 290 140, 380 132 C 470 125, 560 150, 640 100"
        fill="none" stroke="#2dd4bf" stroke-width="3"/>
  <path d="M 380 132 C 470 125, 560 150, 640 100 L 640 290 L 380 290 Z" fill="url(#fshade)" opacity="0.5"/>

  <circle cx="380" cy="132" r="8" fill="#fbbf24" stroke="#0a1120" stroke-width="2"/>
  <text x="396" y="128" fill="#fbbf24" font-size="12" font-weight="700">Minimum Variance Portfolio</text>
  <text x="396" y="144" fill="#64748b" font-size="10">lowest σ achievable</text>

  <circle cx="520" cy="121" r="8" fill="#a78bfa" stroke="#0a1120" stroke-width="2"/>
  <text x="536" y="117" fill="#a5b4fc" font-size="12" font-weight="700">Optimal (Market) Portfolio</text>
  <text x="536" y="133" fill="#64748b" font-size="10">highest Sharpe ratio</text>

  <line x1="90" y1="270" x2="516" y2="124" stroke="#f87171" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="90" cy="270" r="4" fill="#f87171"/>
  <text x="104" y="264" fill="#f87171" font-size="10.5">Rf</text>
  <text x="200" y="212" fill="#f87171" font-size="11" transform="rotate(-17 200 212)">Capital Market Line — combine Rf with the market portfolio</text>

  <text x="180" y="262" fill="#5eead4" font-size="11" font-weight="600">inefficient frontier</text>
  <text x="150" y="278" fill="#64748b" font-size="10">(same σ, lower return — nobody buys these)</text>

  <text x="600" y="212" fill="#5eead4" font-size="11" font-weight="600">efficient frontier</text>
  <text x="580" y="228" fill="#64748b" font-size="10">best return per unit of risk</text>
</svg>`;

export const securityAnalysisPortfolioManagement: Subject = {
  slug: 'security-analysis-portfolio-management',
  code: 'PGDM F04',
  name: 'Security Analysis & Portfolio Management',
  track: 'FINANCE',
  credits: 3,
  hours: 30,
  semester: 3,
  tagline: 'Price securities. Build portfolios. Measure everything.',
  description:
    'The investment discipline end-to-end: the investment environment and alternatives, fundamental and technical analysis with EMH, risk–return measurement, Markowitz through CAPM and APT, and portfolio evaluation and revision practice.',
  outcomes: [
    'Exhibit knowledge of investment alternatives — equity, debt, mutual funds, ULIPs and the markets that trade them',
    'Measure risk and return of securities and portfolios and analyse their relationship',
    'Conduct fundamental and technical analysis and evaluate portfolio performance for sound decisions',
    'Apply portfolio construction theories — Markowitz, Sharpe index model, CAPM, APT — to investment decisions',
    'Apply portfolio evaluation techniques (Sharpe, Treynor, Jensen) and revision discipline',
  ],
  units: [
    'Unit 1 — Investment Environment: investment vs speculation vs gambling; objectives, process, alternatives (MF & ULIP); markets & institutions; new issue & secondary markets',
    'Unit 2 — Fundamental & Technical Analysis: economic, industry, company analysis; technical analysis concepts & theories; Efficient Market Hypothesis',
    'Unit 3 — Risk and Return: systematic & unsystematic risk; measurement; historical & expected return; portfolio risk & return; attribution analysis',
    'Unit 4 — Portfolio Theory & Practice: construction objectives/constraints/approaches; Markowitz model, Sharpe index model, CAPM, Arbitrage Pricing Theory',
    'Unit 5 — Portfolio Evaluation & Revision: NAV, Sharpe/Treynor/Jensen indices; revision; international diversification; AI in trading, ESG investing, blockchain & crypto',
  ],
  books: [
    { title: 'Investments', author: 'Bodie, Kane & Mohanty — McGraw Hill' },
    { title: 'Security Analysis & Investment Management', author: 'Fischer & Jordon — Pearson' },
    { title: 'Investment Analysis and Portfolio Management', author: 'Prasanna Chandra' },
    { title: 'Security Analysis & Portfolio Management', author: 'Kevin S — Phi Learning' },
  ],
  heroImage: '/images/pgdm/sapm-hero.jpg',
  lectures: [
    /* ─────────── LECTURE 1 (FULL) ─────────── */
    {
      slug: 'risk-return-foundations',
      number: 1,
      title: 'Risk & Return: The Foundations of Portfolio Theory',
      minutes: 50,
      summary:
        'Measure return properly, measure risk honestly, and discover the one free lunch in finance — diversification — with the full covariance mathematics.',
      status: 'live',
      objectives: [
        'Compute holding-period, average, and expected returns the way the CFA does',
        'Quantify risk as variance and standard deviation of returns',
        'Use covariance and correlation to combine assets into portfolios',
        'Prove to yourself why correlation < +1 creates the diversification effect',
      ],
      sections: [
        {
          heading: '1. Return — three measures, three purposes',
          body: [
            'Holding-period return (HPR) measures what one round trip actually earned: (P₁ − P₀ + D)/P₀. Arithmetic mean of annual returns answers "what was the typical year?" Geometric mean answers "what constant annual return produced the same final wealth?" — and geometric is always ≤ arithmetic, with the gap growing in volatility (≈ σ²/2 per period, the variance drain).',
            'Expected return for the future is probability-weighted: E[R] = Σ pᵢ·Rᵢ across scenarios. In practice analysts anchor on the market-implied return or build scenario trees (bull/base/bear) — always with weights that sum to 1.',
          ],
          callout: {
            type: 'exam',
            text: 'A fund returns +50% then −50%. Arithmetic average = 0%. Actual wealth: 100 → 150 → 75, a 25% loss. The geometric mean (−13.4%/yr) is the truth; the arithmetic mean is the mirage.',
          },
        },
        {
          heading: '2. Risk — variance as the honest scorekeeper',
          body: [
            'Variance σ² = Σ pᵢ(Rᵢ − E[R])² is the probability-weighted squared distance from the mean; standard deviation σ is its square root, in the same units as return, which makes it the quotable "risk" number. Historical variance divides by n−1 (sample). Interpretation convention: roughly 2/3 of returns fall within E[R] ± σ, ~95% within ± 2σ, under normality.',
            'But σ measures TOTAL risk. The capital markets price only the part you cannot diversify away — systematic risk. The idiosyncratic part (a factory fire, a lost contract) earns no premium, because a diversified investor has already washed it out. This distinction powers everything from CAPM (Lecture 3) to fund evaluation (Sharpe uses σ, Treynor uses β).',
          ],
          bullets: [
            'Total risk = systematic (market, β) + unsystematic (firm-specific)',
            'Diversification kills unsystematic risk — ~30–40 stocks captures most of the benefit',
            'Only systematic risk carries a risk premium in equilibrium',
          ],
        },
        {
          heading: '3. Combining assets — covariance and correlation',
          body: [
            'Covariance measures how two returns move together: Cov(A,B) = Σ pᵢ(RAᵢ − E[RA])(RBᵢ − E[RB]). Correlation ρ = Cov(A,B)/(σA·σB) standardises it to [−1, +1] — the single most important number in portfolio construction.',
            'Two-asset portfolio return and risk: E[Rp] = wA·E[RA] + wB·E[RB] — a straight weighted average. But σp = √(wA²σA² + wB²σB² + 2wAwB·ρ·σA·σB) — NOT an average. The ρ term is where the magic lives: at ρ = +1 risk is the weighted average (no benefit); at ρ < +1 the cross-term shrinks and portfolio risk falls below the weighted average; at ρ = −1 risk can be engineered to zero with the right weights.',
          ],
          callout: {
            type: 'note',
            text: 'The diversification "free lunch": when ρ < 1, risk falls faster than return. You keep (almost) all expected return while σ drops. This is the ONLY genuinely free lunch in finance — every other return comes with priced risk.',
          },
        },
        {
          heading: '4. From two assets to the frontier',
          body: [
            'Sweep the weight w from 0% to 100% and plot each (σp, E[Rp]) pair: you trace a curved bullet — the minimum-variance frontier. Its upper half is the efficient frontier: portfolios offering the highest return for each risk level. Rational investors only hold frontier portfolios; which one depends on risk appetite. Adding a risk-free asset turns the choice into the Capital Market Line — one tangency portfolio (the "market") blended with lending/borrowing at Rf. That is Lecture 2\'s destination; today you own the machinery that draws the curve.',
          ],
        },
        {
          heading: '5. Practitioner reality — India edition',
          body: [
            'Correlations are regime-dependent: in crashes, everything correlates toward 1 ("the only thing that goes up in a down market is correlation"). Indian equity-large-cap correlations with global markets have historically been 0.3–0.5 in calm times, spiking in stress. Asset-class diversification (equity + debt + gold) works because the pairwise ρ is low precisely when you need it. Portfolio construction at every Indian MF house begins from this lecture\'s algebra.',
          ],
        },
      ],
      diagram: {
        title: 'The efficient frontier',
        caption:
          'Sweeping weights traces the bullet. Above the MVP, higher return requires higher risk; the tangency portfolio maximises the Sharpe ratio.',
        svg: frontierSvg,
      },
      formulas: [
        { name: 'HPR', expr: '(P₁ − P₀ + D)/P₀', meaning: 'Realised total return of one holding period' },
        { name: 'Expected return', expr: 'E[R] = Σ pᵢRᵢ', meaning: 'Probability-weighted future return' },
        { name: 'Variance / σ', expr: 'σ² = Σ pᵢ(Rᵢ−E[R])² · σ = √σ²', meaning: 'Dispersion of outcomes — total risk' },
        { name: 'Correlation', expr: 'ρ = Cov(A,B)/(σAσB)', meaning: 'Co-movement on a −1…+1 scale' },
        { name: 'Portfolio return', expr: 'E[Rp] = Σ wᵢE[Rᵢ]', meaning: 'Linear in weights' },
        { name: 'Portfolio risk', expr: 'σp = √(Σᵢ Σⱼ wᵢwⱼρᵢⱼσᵢσⱼ)', meaning: 'Sub-linear when ρ < 1 — the free lunch' },
      ],
      examples: [
        {
          title: 'Two-asset portfolio — stock + bond fund',
          given: [
            'Equity fund: E[R] 14%, σ 20% · Debt fund: E[R] 8%, σ 6%',
            'Correlation ρ = +0.2 · Weight: 60% equity / 40% debt',
          ],
          steps: [
            { text: 'Portfolio expected return (linear)', calc: 'E[Rp] = 0.6×14 + 0.4×8 = 8.4 + 3.2 = 11.6%' },
            { text: 'Variance pieces', calc: 'w₁²σ₁² = 0.36×400 = 144 · w₂²σ₂² = 0.16×36 = 5.76 · 2w₁w₂ρσ₁σ₂ = 2×0.6×0.4×0.2×20×6 = 11.52' },
            { text: 'Portfolio σ', calc: 'σp = √(144 + 5.76 + 11.52) = √161.28 = 12.7%' },
            { text: 'See the free lunch', calc: 'Weighted-average σ would be 0.6×20 + 0.4×6 = 14.4% → actual 12.7% — 1.7 points of risk removed at zero return cost' },
          ],
          answer:
            'E[Rp] = 11.6%, σp = 12.7% vs the 14.4% naive average. The gap IS diversification — quantified.',
        },
        {
          title: 'Perfect hedge — ρ = −1',
          given: ['Asset A: E[R] 12%, σ 15% · Asset B: E[R] 7%, σ 10% · ρ = −1'],
          steps: [
            { text: 'Zero-risk weight condition', calc: 'wA = σB/(σA+σB) = 10/25 = 0.4 → 40% A, 60% B' },
            { text: 'Portfolio return', calc: 'E[Rp] = 0.4×12 + 0.6×7 = 4.8 + 4.2 = 9%' },
            { text: 'Portfolio risk', calc: 'σp = |0.4×15 − 0.6×10| = |6 − 6| = 0%' },
          ],
          answer:
            '40/60 mix delivers 9% with zero risk — a synthetic risk-free asset. Perfect negative correlation is rare (insurance-like payoffs), which is why hedges are expensive and imperfect in practice.',
        },
      ],
      caseStudy: {
        title: 'Case — The concentrated promoter portfolio',
        body: [
          'Your client, a 52-year-old business owner, holds ₹50 cr: 80% in his own listed company\'s stock (bought at IPO, now 11×) and 20% in fixed deposits. His company\'s stock has σ = 35%, expected return 15%. The FD earns 7% risk-free. Correlation between his stock and the FD is 0. He has refused every wealth manager\'s advice to diversify: "I know this company best — why would I own businesses I don\'t understand?"',
          'His company is in textiles; 60% of revenue comes from two US retailers. A tariff shock would hit both orders and the stock simultaneously — precisely when his unlisted factory (his other big holding, human capital included) would also suffer.',
        ],
        questions: [
          'Compute the current portfolio\'s E[R] and σ. Then the same for a 40/60 stock/FD mix.',
          'Explain to the client, in his language, the difference between company risk and portfolio risk.',
          'What diversification would you recommend that does NOT require him to sell the concentrated position?',
        ],
        takeaways: [
          'Concentration is a risk × correlation problem: his stock, his factory and his human capital are the SAME bet three times',
          'Diversification reduces risk without a return sacrifice when correlations are low — arithmetic, not opinion',
          'Real portfolios include human capital; the correlation of your salary to your savings matters',
        ],
      },
      revision: [
        'Geometric mean ≤ arithmetic mean; gap ≈ σ²/2 (variance drain)',
        'σ = total risk; only systematic risk is priced',
        'ρ = Cov/σAσB; the portfolio risk cross-term 2wAwBρσAσB is where diversification lives',
        'ρ = +1 → no diversification; ρ < 1 → sub-linear risk; ρ = −1 → risk can hit zero',
        '~30–40 stocks removes most unsystematic risk',
        'Efficient frontier = upper half of the minimum-variance bullet',
      ],
      practice: [
        {
          q: 'Stock returns: +10%, +4%, −6%, +12%. Arithmetic and geometric mean?',
          a: 'Arithmetic = 20/4 = 5%. Geometric = [(1.10)(1.04)(0.94)(1.12)]^(1/4) − 1 = (1.2052)^(0.25) − 1 ≈ 4.77%.',
        },
        {
          q: 'E[R] 12%, σ 18%; risk-free 6%. What is the Sharpe ratio, and what does it mean?',
          a: 'Sharpe = (12−6)/18 = 0.33 — excess return per unit of total risk. Compare across funds: higher Sharpe = better risk-adjusted performance.',
        },
        {
          q: 'Two assets, ρ = 0.3, σA = 25%, σB = 25%, 50/50 mix. Is portfolio σ above, below, or equal to 25%? Why?',
          a: 'Below. σp² = 0.25²×(0.5²+0.5²+2×0.5×0.5×0.3) = 0.0625×(0.65) → σp = √0.040625 = 20.2%. Any ρ < 1 makes equal-σ assets diversify each other.',
        },
        {
          q: 'Why does the market pay you for beta but not for firm-specific risk?',
          a: 'Firm-specific risk vanishes in a diversified portfolio — investors can eliminate it free, so no one pays a premium to hold it. Market-wide risk cannot be diversified away; holding it must be compensated, and β scales that exposure.',
        },
        { q: 'Stock A SD 30 percent, Stock B SD 30 percent, correlation -0.4. What is the SD of a 50-50 portfolio - and why is it not 30 percent?', a: 'Diversification: variance terms average but the covariance term is negative, pulling portfolio SD to about 21 percent. Correlation, not individual SD, is the diversification lever.' },
        { q: 'Why is standard deviation an incomplete risk measure for a pension fund?', a: 'It treats upside and downside symmetrically and ignores tail shape and horizon liabilities. A pension fund cares about downside deviation, funding-gap risk at payout dates - semi-deviation and VaR/CVaR speak to that.' },
      ],
      tools: [
        { label: 'Portfolio Risk & Return Lab', href: '/tools/portfolio-risk-lab' },
      ],
    },

    /* ─────────── LECTURE 2 (Unit 1 · outline) ─────────── */
    {
      slug: 'investment-environment',
      number: 2,
      title: 'The Investment Environment: Alternatives, Markets & Process',
      minutes: 40,
      summary:
        'Investment vs speculation vs gambling; objectives and the investment process; the full menu of alternatives from equity and debt to mutual funds and ULIPs; primary vs secondary markets and the institutions between.',
      status: 'live',
      objectives: [
        'Distinguish investment from speculation and gambling by risk, return and time horizon',
        'Map the investment process: objectives → constraints → policy → portfolio → review',
        'Compare alternatives — equity, bonds, money market, MFs, ULIPs, REITs, gold',
        'Explain primary market mechanics (IPO, FPO) and secondary market microstructure',
      ],
      sections: [
        {
          heading: '1. Investment, speculation, gambling — and the process',
          body: [
            '**Investment**: funds committed after thorough analysis, positive expected return commensurate with risk borne, principal preservation a goal, horizon in years. **Speculation**: funds committed on anticipated price change, high risk, short horizon, analysis thin — a calculated bet. **Gambling**: risk is *created* for the thrill of it; expected value typically negative (house edge); no productive asset behind the payoff. The three-line exam answer: investment analyses existing risk for positive expected return; speculation assumes high risk for abnormal return; gambling manufactures risk. Same instrument can be any of the three — a share bought on tip with a one-week horizon is speculation; a lottery ticket is never investment.',
            '**The investment process** (cyclical, not linear): (1) set objectives (return requirement + risk tolerance, quantified); (2) identify constraints — time horizon, liquidity, tax, legal/regulatory, unique circumstances; (3) write the **policy** (asset allocation, diversification rules, benchmarks) — the IPS; (4) construct the portfolio (security selection vs allocation decision — allocation dominates); (5) monitor, evaluate against benchmark, **revise** (rebalance bands, tax-loss harvesting) — feeding back into objectives. Institutions matter: brokers, custodians, depositories (NSDL/CDSL), AMCs, market makers, SEBI as referee, clearing houses guaranteeing settlement (T+1 in India since 2023).',
          ],
          callout: {
            type: 'exam',
            text: 'Comparison questions love the risk–return–time–analysis grid across investment vs speculation vs gambling. Fill each cell explicitly: risk (assumed vs assumed vs manufactured), expected return (positive-commensurate vs uncertain abnormal vs negative), horizon (long vs short vs instant), analysis (fundamental vs partial vs none).',
          },
        },
        {
          heading: '2. The alternatives menu',
          body: [
            '**Equity**: ownership, residual claim, unlimited upside, dividends + capital gains; common vs preferred; direct stocks or ETFs. **Fixed income**: bonds (coupon, maturity, credit and duration risk), G-secs (sovereign), corporate bonds/debentures, money-market instruments (T-bills ≤364 days, CP, CD — F02 Unit 1 detail). **Mutual funds**: pooled, professional management, NAV-priced; open-ended vs closed; **active vs passive** (index funds/ETFs); equity, debt, hybrid, solution-oriented categories; costs — expense ratio, exit load, direct vs regular plans (commission difference compounds). **ULIPs**: insurance + investment bundled; costs = premium allocation + mortality + fund management + policy admin; the 4% illustrative return problem — IRDAI disclosure norms; generally beaten by term insurance + separate fund. **Real assets**: real estate (illiquid, lumpy, rental yield 2–4% metro), **REITs/InvITs** (listed, fractional, rental/toll cash flows, SEBI 80% occupancy rules), gold (hedge, no cash flow; SGB vs physical vs ETF), commodities. **Derivatives** (F03 in full): hedging or speculation instruments, not assets for the long-horizon investor.',
            '**Primary vs secondary markets**: primary creates securities — IPO via **book building** (price band, floor–cap ±20%, anchor book, QIB/HNI/retail quotas, cut-off price, ASBA/UPI application), FPO/rights issues, private placement/QIP; merchant bankers price and certify, SEBI disclosure (DRHP/RHP) disciplines. Secondary — NSE/BSE, the price-discovery machine: order book, bid–ask spread (liquidity cost), circuit breakers, STT, T+1 settlement, indices (Nifty 50 free-float market-cap weighted). The links: primary prices reference secondary comparables; secondary liquidity enables primary issuance.',
          ],
          bullets: [
            'Equity: residual claim, unlimited upside; bonds: finite claim, finite return',
            'Expense ratios compound: 1% annual fee ≈ 25–30% of terminal wealth over 30 yrs',
            'Direct MF plan = same fund, no distributor commission',
            'Book building: discover price in a band; fixed-price issues are the exception now',
            'REITs give listed real estate exposure with 80%+ mandated distribution',
          ],
        },
      ],
      diagram: {
        title: 'The investment process loop',
        caption: 'Policy sits between goals and portfolio; evaluation feeds revisions back to objectives — the loop never stops.',
        svg: `<svg viewBox="0 0 720 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Investment process loop">
  <defs><marker id="ia" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="80" width="130" height="50" rx="10" fill="#e0f2fe"/><text x="85" y="100" fill="#0c4a6e" font-weight="600">1 Objectives</text><text x="85" y="116" fill="#075985">return + risk</text>
    <rect x="185" y="80" width="130" height="50" rx="10" fill="#e0f2fe"/><text x="250" y="100" fill="#0c4a6e" font-weight="600">2 Constraints</text><text x="250" y="116" fill="#075985">horizon · liquidity · tax</text>
    <rect x="350" y="80" width="130" height="50" rx="10" fill="#dcfce7"/><text x="415" y="100" fill="#14532d" font-weight="600">3 Policy (IPS)</text><text x="415" y="116" fill="#166534">allocation + benchmarks</text>
    <rect x="515" y="80" width="130" height="50" rx="10" fill="#fef9c3"/><text x="580" y="100" fill="#713f12" font-weight="600">4 Portfolio</text><text x="580" y="116" fill="#a16207">selection + execution</text>
    <rect x="515" y="150" width="130" height="44" rx="10" fill="#fee2e2"/><text x="580" y="170" fill="#7f1d1d" font-weight="600">5 Evaluate</text><text x="580" y="184" fill="#991b1b">vs benchmark</text>
    <line x1="150" y1="105" x2="183" y2="105" stroke="#475569" stroke-width="1.5" marker-end="url(#ia)"/>
    <line x1="315" y1="105" x2="348" y2="105" stroke="#475569" stroke-width="1.5" marker-end="url(#ia)"/>
    <line x1="480" y1="105" x2="513" y2="105" stroke="#475569" stroke-width="1.5" marker-end="url(#ia)"/>
    <line x1="580" y1="130" x2="580" y2="148" stroke="#475569" stroke-width="1.5" marker-end="url(#ia)"/>
    <path d="M515,172 C300,196 120,196 85,132" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#ia)"/>
    <text x="300" y="205" fill="#475569" font-size="11">revise · rebalance · update objectives</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Mutual fund NAV', expr: 'NAV = (Assets − Liabilities) / Units outstanding', meaning: 'Price per unit, struck daily' },
        { name: 'Holding-period return', expr: 'HPR = (P₁ − P₀ + Income) / P₀', meaning: 'Total return over the period' },
        { name: 'Rental yield', expr: 'Annual rent / Property value', meaning: 'Income return on real estate' },
      ],
      examples: [
        {
          title: 'Term plan + ELSS vs ULIP, 25 years',
          given: ['Investor, 30, ₹1 cr life cover needed, ₹1,00,000/yr investable', 'ULIP: same premium, ~charges 1.25–2% effective, fund returns 10% gross', 'Alternative: term plan ₹12,000/yr (₹1 cr cover) + ₹88,000/yr in an index fund at 10%, TER 0.2%'],
          steps: [
            { text: 'ULIP FV (approx.)', calc: '₹1,00,000 growing at ~8.0% net for 25 yrs ≈ ₹1,00,000 × [(1.08²⁵−1)/0.08] ≈ ₹73.9 lakh' },
            { text: 'Term + fund FV', calc: '₹88,000 growing at ~9.7% net ≈ ₹88,000 × [(1.097²⁵−1)/0.097] ≈ ₹85.6 lakh' },
            { text: 'Cost of bundling', calc: '≈ ₹11.7 lakh over 25 years on the same ₹25 lakh of premiums — insurance and investment unbundled wins' },
            { text: 'Caveats', calc: 'ULIP adds discipline + tax-free switches + Section 80C parity now (post-2020 both EEE); if the investor would actually skip the SIP, bundling has behavioural value' },
          ],
          answer: 'Unbundling wins on arithmetic; bundling can win on behaviour. Know both and show the ₹-gap.',
        },
        {
          title: 'Read an IPO book-building',
          given: ['Company sets a ₹95–100 band; issue size ₹600 cr; QIB 50% / NII 15% / Retail 35%', 'Bids: QIB 3.2x (mostly at cap), NII 2.0x, retail 0.9x'],
          steps: [
            { text: 'Price discovery', calc: 'Strong QIB at cap → final price ₹100 (top of band)' },
            { text: 'Under-subscription', calc: 'Retail 0.9x < 1 → the retail portion is unfilled; options: extend days, reduce size (QIB/NII spillover), or refund — SEBI rules govern' },
            { text: 'Post-listing signal', calc: 'Institutional anchoring at cap + weak retail often → listing pop if float is small; but the cut-off price already captured the demand — grey-market premium is the tell' },
            { text: 'Investor decision', calc: 'Apply at cut-off only if the DCF/multiple thesis (F06 skill) supports ₹100 — subscription frenzy is not valuation' },
          ],
          answer: 'Book building aggregates information, but the anchor-book composition tells you *whose* conviction you are buying.',
        },
      ],
      caseStudy: {
        title: 'Case — Building the first IPS for a 29-year-old fintech employee',
        body: [
          'Salary ₹18 lakh, saves ₹6 lakh/yr, emergency fund done, no dependants, plans a startup at 33 (needs ₹40 lakh then), retirement at 58. Current portfolio: ₹9 lakh in six direct stocks (four are her employer\'s competitors), ₹3 lakh in an FD, crypto ₹2 lakh, plus an endowment policy maturing 2045.',
          'She asks for "aggressive growth" and shows a 12-stock watchlist of smallcaps.',
        ],
        questions: [
          'Write her objectives and constraints in IPS format.',
          'What is wrong with the current portfolio given the startup plan?',
          'Which vehicles serve the 4-year and 29-year horizons differently?',
        ],
        takeaways: [
          'Objectives: high total return, above-average risk tolerance (long horizon, human capital large) — but a hard ₹40 lakh liquidity constraint at year 4 dominates the allocation',
          'Constraint hierarchy: the 4-year startup goal caps equity to what a −40% drawdown would still cover; employer-concentrated smallcap overlap doubles career + capital risk in one sector',
          'Vehicles: 4-year money in arbitrage/short-duration debt + equity index SIP with a glide path that de-risks approaching year 4; 29-year money in equity index/DIY mix; crypto capped at ≤5% as an uncorrelated (or correlated-in-crises) satellite',
          'Process lesson: the IPS converts "aggressive growth" into numbers — target return, max drawdown, rebalancing bands — before any product is chosen',
        ],
      },
      revision: [
        'Investment (analysed, positive EV, long) vs speculation (high risk, short) vs gambling (created risk, negative EV)',
        'Process: objectives → constraints → policy → portfolio → evaluate/revise (a loop)',
        'Constraints: horizon, liquidity, tax, legal, unique',
        'NAV = (A − L)/units; direct plans beat regular plans on cost',
        'ULIP = insurance + investment bundle; charges erode the fund',
        'REITs: listed real estate, 80% occupancy + distribution rules',
        'Primary: book building (band, cut-off, QIB/NII/retail); secondary: order book, spread, T+1',
        'Asset allocation dominates security selection in explaining return variation',
      ],
      practice: [
        { q: 'A retiree wants "double money in 3 years" from smallcaps. Which process step is being skipped?', a: 'Objectives/constraints: the return requirement is unattainable at her risk tolerance and horizon; the IPS must reconcile the wish with a max-drawdown she can survive — or explicitly accept ruin risk in writing.' },
        { q: 'Why do index ETFs usually report lower tracking error than index funds?', a: 'ETFs trade intraday on the exchange (creation/redemption keeps price near NAV); index funds transact at end-day NAV with cash drag from subscription flows. Both beat most active largecap funds after costs over 10 years in India.' },
        { q: 'Fixed-price issue vs book building — who bears mispricing risk?', a: 'Fixed-price: issuer/company bears it (under-subscription if set too high); book building: bidders reveal demand within the band, so risk is shared — that is why book building dominates Indian IPOs.' },
        { q: 'A stock trades at Rs 480 cum-dividend; dividend Rs 20, ex-date tomorrow, no news. Ex-date price?', a: 'Around Rs 460 - the value leaves the price as the dividend leaves the stock. Any bigger drop is news, not the dividend (and note: dividends are distribution, not creation, of value).' },
        { q: 'Why do primary markets determine secondary-market confidence?', a: 'Fair allocation, disclosure standards and pricing discipline at IPO/FPO set the information baseline investors trade on later. A rigged primary market poisons the secondary pool - no one buys what they cannot trust.' },
      ],
      tools: [
        { label: 'Time Value Machine', href: '/tools/time-value-machine' },
        { label: 'Portfolio Risk & Return Lab', href: '/tools/portfolio-risk-lab' },
      ],
    },

    /* ─────────── LECTURE 3 (Unit 2 · outline) ─────────── */
    {
      slug: 'fundamental-technical-analysis',
      number: 3,
      title: 'Fundamental & Technical Analysis + the EMH Debate',
      minutes: 50,
      summary:
        'Top-down fundamental analysis (economy → industry → company), the technical analyst\'s toolkit (Dow theory, trends, moving averages, RSI, MACD, Elliott & Kitchin cycles), and the Efficient Market Hypothesis that argues both are useless.',
      status: 'live',
      objectives: [
        'Run the three-tier fundamental cascade with real ratios',
        'Read trendlines, supports, moving averages and momentum oscillators',
        'State weak, semi-strong and strong EMH and the evidence on both sides',
        'Decide when fundamentals, technicals, or both belong in a process',
      ],
      sections: [
        {
          heading: '1. Fundamental analysis: the top-down cascade',
          body: [
            '**Economy**: GDP growth (real vs nominal), inflation (CPI/WPI — drives rates), the rate cycle (repo → bond yields → equity discount rates), IIP/PMI (momentum), fiscal deficit and current account (external vulnerability), credit growth and savings flows (domestic liquidity — SIP flows). Macro sets the tide: high inflation + rising rates compress P/Es; easing cycles expand them. The **economy–markets disconnect** is real short-term (markets discount 6–9 months ahead) — that is why the cascade starts but does not end with macro.',
            '**Industry**: Porter five forces (rivalry, entrants, substitutes, supplier power, buyer power) + lifecycle stage (growth/maturity/decline) + policy exposure (tariffs, PLI, regulation). Industry determines the *profit pool*; company analysis only splits it. **Company** (links to F06): business model and moat, three-statement history, ratio grid — profitability (OPM, NPM, ROE/ROCE), efficiency (asset turns, working-capital days), leverage (D/E, interest cover), valuation (P/E, EV/EBITDA, P/B, dividend yield). Intrinsic value from DCF/multiples vs market price → margin of safety. The output is a **thesis with falsifiable triggers** (margin, market share, capex cycle), not a target price alone.',
          ],
          callout: {
            type: 'exam',
            text: 'Fundamental answers WHAT and at WHAT PRICE (undervalued/overvalued); technical answers WHEN (entry/exit timing). Examiners want both defined AND the EMH verdict on each: weak form kills pure technicals (past prices are in the price), semi-strong kills public-data fundamental screening — the anomalies below are the rebuttal evidence.',
          },
        },
        {
          heading: '2. Technical analysis and the EMH debate',
          body: [
            '**Assumptions**: price discounts everything (including fundamentals); prices move in trends; history repeats (psychology is stable). **Dow theory**: the market has primary (1+ yr), secondary (3 wk–3 mo) and minor trends; the primary is the tradable one; volume confirms trend; trends persist until definitive reversal. **Charts**: line/bar/candlestick (body = open–close, wicks = high–low); trendlines, **support/resistance** (demand/supply shelves); patterns — head & shoulders, double top/bottom, triangles, flags. **Moving averages**: 50-DMA/200-DMA — golden cross (50 above 200, bullish) and death cross; MAs smooth noise and lag by construction. **Momentum**: **RSI** (0–100; >70 overbought, <30 oversold — better as divergence tool than absolute level); **MACD** (12-EMA minus 26-EMA, signal-line crossovers); volume/price divergences. **Cycles**: Kitchin (inventory, ~3–4 yr), Juglar (~7–11 yr capex), Kondratieff (~50 yr); **Elliott wave** — 5 impulsive + 3 corrective waves driven by crowd psychology (fractal, subjective — use as context, not signal). Drill: open any index chart, mark the 200-DMA, identify the primary trend, locate the last golden/death cross, find RSI divergence at the last swing high.',
            '**EMH (Fama)**: weak form — past price data is already in prices (technical analysis cannot beat the market; tests: serial correlation, runs, filter rules); semi-strong — all public information is in prices (public-data fundamental analysis cannot beat; tests: event studies — post-earnings drift evidence is awkward); strong — even private information is priced (insiders do beat — hence SEBI PIT regulations). **Against EMH — the anomalies**: size effect (small caps outperform), **value effect** (low P/B beats glamour — Fama–French), January effect, momentum (3–12-month winners keep winning — Jegadeesh–Titman), post-earnings announcement drift, closed-end fund discounts, bubbles. **For EMH**: joint-hypothesis problem (a "beat" may be a bad risk model), survivorship bias in databases, transaction costs eat anomaly profits, and most active funds still trail their indices after fees. Settlement: markets are *largely* efficient with pockets of inefficiency that are costly or risky to arbitrage — exactly the **limits-to-arbitrage** bridge to behavioural finance (F01 Unit 2).',
          ],
          bullets: [
            'Cascade: economy (tide) → industry (profit pool) → company (share of pool)',
            'RSI >70 / <30 with price divergence beats absolute thresholds',
            'Golden cross = 50-DMA crossing above 200-DMA (lagging, not predictive)',
            'Weak form kills technicals; semi-strong kills public-data fundamentals',
            'Anomalies: size, value, momentum, January, PEAD — profits shrink after publication',
          ],
        },
      ],
      diagram: {
        title: 'Top-down fundamental cascade',
        caption: 'Each tier filters the next; the cascade ends in a priced thesis with falsifiable triggers.',
        svg: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Top-down fundamental analysis cascade">
  <defs><marker id="ta" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="18" width="680" height="52" rx="12" fill="#e0f2fe"/>
    <text x="360" y="40" fill="#0c4a6e" font-weight="600">ECONOMY — GDP · CPI · repo/yields · PMI · fiscal/CAD · SIP flows</text>
    <text x="360" y="58" fill="#075985">sets the discount rate &amp; the earnings tide</text>
    <rect x="60" y="90" width="600" height="52" rx="12" fill="#dcfce7"/>
    <text x="360" y="112" fill="#14532d" font-weight="600">INDUSTRY — Porter 5 forces · lifecycle · policy exposure</text>
    <text x="360" y="130" fill="#166534">sizes the profit pool and who keeps it</text>
    <rect x="130" y="162" width="460" height="52" rx="12" fill="#fef9c3"/>
    <text x="360" y="184" fill="#713f12" font-weight="600">COMPANY — moat · statements · ratio grid · DCF vs price</text>
    <text x="360" y="202" fill="#a16207">thesis + margin of safety + falsifiable triggers</text>
    <line x1="360" y1="70" x2="360" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#ta)"/>
    <line x1="360" y1="142" x2="360" y2="160" stroke="#475569" stroke-width="1.5" marker-end="url(#ta)"/>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'RSI (14)', expr: 'RSI = 100 − 100/(1 + RS), RS = avg gain / avg loss (14 periods)', meaning: 'Momentum in 0–100 band' },
        { name: 'MACD', expr: 'MACD = EMA₁₂ − EMA₂₆; signal = 9-EMA of MACD', meaning: 'Trend-momentum crossover' },
        { name: 'EMH verdict shorthand', expr: 'weak: charts dead · semi-strong: public screens dead · strong: insiders only', meaning: 'Which analysis EMH rules out' },
      ],
      examples: [
        {
          title: 'Cascade applied: should you buy a paint company now?',
          given: [
            'Macro: crude (30% of input cost) high, rural demand soft, rate-cut cycle beginning',
            'Industry: organised gaining share from unorganised (GST), 4 players hold 75% share',
            'Company: #2 player, OPM 16% vs 19% peak, ROCE 22%, P/E 45 vs 10-yr median 38',
          ],
          steps: [
            { text: 'Economy tier', calc: 'Rate cuts → lower discount rate (P/E support); crude high → margin headwind; rural soft → volume drag — mixed' },
            { text: 'Industry tier', calc: 'Structural share gain + rational oligopoly → premium multiples defendable' },
            { text: 'Company tier', calc: 'OPM 300 bps below peak = margin-recovery option; but P/E 45 vs median 38 already pays for much of it' },
            { text: 'Verdict', calc: 'Quality yes, price rich: half-position now; add below ~38x or when OPM prints >17% for two consecutive quarters (the falsifiable trigger)' },
          ],
          answer: 'The cascade converts "great company" into a priced decision with an invalidation rule.',
        },
        {
          title: 'Technical drill on one chart',
          given: ['Daily chart: price 412; 50-DMA 405 rising; 200-DMA 381 rising; RSI(14) 74; last swing high 420 made on declining volume'],
          steps: [
            { text: 'Trend', calc: 'Price > 50-DMA > 200-DMA, both rising ⇒ primary uptrend intact' },
            { text: 'Momentum', calc: 'RSI 74 = overbought; the 420 push came on FALLING volume — demand thinning (bearish volume divergence)' },
            { text: 'Levels', calc: 'Support 405 (50-DMA) then 381 (200-DMA); a high-volume break of 420 opens a measured move' },
            { text: 'Plan', calc: 'Trend-followers hold with a stop below 405; fresh entries wait for a pullback to 405 or the 420 breakout — no chasing at RSI 74' },
          ],
          answer: 'One chart, four tools, one rule: the trend is your friend until volume or the DMA says otherwise.',
        },
      ],
      caseStudy: {
        title: 'Case — The January effect meets transaction costs',
        body: [
          'A backtest shows smallcap Indian stocks returning +4.1% every January from 1995–2010 vs +1.2% in other months (illustrative). An MBA builds a strategy: sell in December, buy smallcaps for January.',
          'Reality check: the anomaly was documented in the US in the early 1980s and had halved by the 1990s; in India post-2005 most studies find the spread statistically indistinguishable from zero. Transaction costs (STT, brokerage, impact in illiquid smallcaps) run 1.5–2% per round trip.',
        ],
        questions: [
          'Why do anomalies decay after publication?',
          'Does the decay refute or support EMH?',
          'When can a real inefficiency persist?',
        ],
        takeaways: [
          'Publication itself arbitrages the anomaly away: practitioners trade it, prices adjust, the premium collapses — efficiency as a self-correcting equilibrium',
          'Decay SUPPORTS semi-strong EMH: the public information got priced. Persistent premiums (value, momentum) survive because exploiting them means bearing risk (value traps, momentum crashes) — a risk-based explanation, not free money',
          'Real inefficiencies persist where arbitrage is limited: small/illiquid names, short-constrained stocks, index-inclusion effects — the Grossman–Stiglitz point: perfectly efficient markets would leave no one paid to make them efficient',
          'For practice: trade an anomaly only after costs, capacity and crowding are accounted — a backtest is a hypothesis, not a promise',
        ],
      },
      revision: [
        'Cascade: economy → industry → company; each tier filters the next',
        'Macro drives discount rate + earnings; industry (Porter + lifecycle) sets the profit pool',
        'Company: ratio grid (OPM, ROE/ROCE, D/E, P/E, EV/EBITDA) + DCF vs price',
        'Dow: primary/secondary/minor trends; volume confirms',
        '50/200-DMA golden & death crosses (lagging); RSI 70/30; MACD 12-26-9',
        'Elliott: 5-3 wave crowd psychology; Kitchin ~4yr, Juglar ~10yr cycles',
        'EMH: weak/semi-strong/strong; joint-hypothesis problem protects it',
        'Anomalies: size, value, momentum, January, PEAD; they decay post-publication',
        'Fundamental = what & at what price; technical = when; a process can use both',
      ],
      practice: [
        { q: 'A chartist says "RSI 28, must buy." Give the correct use.', a: 'RSI <30 flags oversold momentum; the edge is a BULLISH DIVERGENCE (price makes a lower low, RSI a higher low) at support in an uptrend. RSI alone, against trend, is catching falling knives.' },
        { q: 'If markets are semi-strong efficient, why does fundamental analysis still add value?', a: 'Public data is priced on average and instantly, but analysts differ on forecasts and risk premia; careful forecasting + margin of safety + holding discipline can earn returns that compensate the risk taken. EMH rules out easy mechanical public-data profits, not all analysis.' },
        { q: 'Which EMH form do SEBI insider-trading prosecutions implicitly confirm?', a: 'Insiders profit — they are prosecuted for beating the market on private information — confirming that the STRONG form fails: private information is not fully priced.' },
        { q: 'Revenue growing 25 percent CAGR but receivable days climbing 40 to 68. Read-through?', a: 'Red flag - growth is being bought with credit quality (channel stuffing risk). Cash conversion is the auditor of revenue growth: if receivables outrun sales, discount the growth story hard.' },
        { q: 'A head-and-shoulders top forms while fundamentals still look fine. Which do you trust and why?', a: 'They answer different questions - fundamentals say what to own, technicals say when. A topping pattern after a huge run is sentiment exhausting; size down or tighten stops rather than flip the whole thesis.' },
      ],
    },

    /* ─────────── LECTURE 4 (Unit 4 · outline) ─────────── */
    {
      slug: 'markowitz-sharpe-capm-apt',
      number: 4,
      title: 'Markowitz, Sharpe Index Model, CAPM & APT',
      minutes: 55,
      summary:
        'Portfolio construction theory in full: Markowitz optimisation and its practical pains, Sharpe\'s single-index simplification, the CAPM equilibrium and its SML, and Ross\'s Arbitrage Pricing Theory with multiple factors.',
      status: 'live',
      objectives: [
        'Set up and interpret the Markowitz optimisation (max return, min variance)',
        'Build a single-index model and see why it cut covariance maths by 90%',
        'Derive and apply the SML; price mispriced securities',
        'Explain APT: no utility theory, arbitrage-free pricing, multiple betas',
      ],
      sections: [
        {
          heading: '1. Markowitz and the single-index shortcut',
          body: [
            '**Markowitz (1952)**: the portfolio\'s risk is not the average of asset risks — **covariance** is the whole game. Feasible set of (σ, E[R]) points from all weight combinations; the **efficient frontier** = top of the set (max return per σ). Diversification eliminates the idiosyncratic slice: σₚ falls toward average covariance as n grows — risk that diversification cannot kill is *systematic*. Optimisation inputs: E[Rᵢ] (n), σᵢ (n), and ρᵢⱼ (n(n−1)/2) — for 100 stocks that is 4,950 correlations, most estimated noisily. **Practical pains**: input-error maximisation (optimiser loads on estimation noise), corner solutions, instability across periods — hence constraints, resampling, or the Black–Litterman fix.',
            '**Sharpe\'s single-index model**: Rᵢ = αᵢ + βᵢRₘ + eᵢ — every stock co-moves with ONE index; cov(Rᵢ,Rⱼ) = βᵢβⱼσₘ². Inputs collapse from 4,950 to 3n (α, β, σₑ). βᵢ = ρᵢₘ·σᵢ/σₘ measures sensitivity to the market; σ²(eᵢ) is diversifiable. Estimation: regress 60 months of stock returns on index returns (slope = β, intercept = α). This is the workhorse of every risk system and the bridge from Markowitz (portfolio theory) to CAPM (equilibrium pricing).',
          ],
          callout: {
            type: 'exam',
            text: 'SML vs CML — the classic trap. CML: E[Rp] = Rf + σp·(Em−Rf)/σm — only EFFICIENT portfolios (total risk σp is priced; every point holds the market portfolio + lending/borrowing). SML: E[Ri] = Rf + βi(Em−Rf) — EVERY asset/portfolio, only SYSTEMATIC risk priced. A well-diversified inefficient portfolio lies on the SML but below the CML.',
          },
        },
        {
          heading: '2. CAPM and APT',
          body: [
            '**CAPM** derivation logic: everyone holds some mix of the market portfolio and the risk-free asset (two-fund separation); in equilibrium the market clears; so every asset\'s expected return compensates ONLY its covariance with the market: **E[Rᵢ] = Rf + βᵢ(E[Rₘ] − Rf)**. Beta of a portfolio = weighted average of betas (that is why fund risk is summarised by one number). Mispricing test: plot expected return against beta — the **security market line**; points above the line are underpriced (alpha positive), below are overpriced. Empirical record: Roll\'s critique (the true market portfolio is unobservable — the model is untestable as stated), beta-instability, size/value effects (Fama–French add SMB and HML factors) — CAPM survives as the cost-of-equity workhorse (F06 WACC) rather than as a precise forecaster.',
            '**APT (Ross 1976)**: no utility theory, one assumption — **no arbitrage**. Expected return is linear in K factor exposures: **E[Rᵢ] = Rf + βᵢ₁λ₁ + βᵢ₂λ₂ + …**. Intuition: if two assets have identical factor loadings but different expected returns, a zero-investment long-short portfolio earns riskless profit; arbitrage forces the linearity. Factors: inflation surprises, industrial production, term-structure shifts, default-risk changes (Chen–Roll–Ross), or the empirical Fama–French factors. CAPM = APT with one factor (the market). Difference in spirit: CAPM is an equilibrium story (everyone rational, market portfolio), APT an arbitrage story (a few arbitrageurs suffice). Worked two-factor arbitrage: build the zero-beta-of-each-factor portfolio and show the free lunch — then watch it close.',
          ],
          bullets: [
            'Frontier: max E[R] for each σ; diversification kills only unsystematic risk',
            'Single-index: cov(i,j) = βᵢβⱼσₘ² — 4,950 estimates become 300',
            'CAPM: E[R] = Rf + β(MRP); market risk premium = E[Rₘ] − Rf',
            'CML prices efficient portfolios with σ; SML prices every asset with β',
            'APT: E[R] = Rf + Σβₖλₖ, enforced by no-arbitrage, not utility',
            'Roll\'s critique: unobservable market portfolio ⇒ CAPM jointly untestable',
          ],
        },
      ],
      diagram: {
        title: 'CML, SML and mispriced assets',
        caption: 'The CML runs from Rf through the market portfolio M to the frontier; the SML in β-space prices all assets — above the line = cheap, below = dear.',
        svg: `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CML and SML diagram">
  <g font-family="inherit" font-size="12">
    <rect x="20" y="16" width="330" height="228" fill="#f8fafc" rx="10"/>
    <text x="40" y="38" fill="#334155" font-weight="600">CML — (σ, E[R]) space</text>
    <line x1="60" y1="220" x2="320" y2="220" stroke="#475569" stroke-width="1.5"/>
    <line x1="60" y1="220" x2="60" y2="40" stroke="#475569" stroke-width="1.5"/>
    <path d="M150,110 Q200,55 320,205" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
    <line x1="60" y1="180" x2="330" y2="60" stroke="#16a34a" stroke-width="2.5"/>
    <circle cx="196" cy="122" r="6" fill="#16a34a"/>
    <text x="204" y="122" fill="#14532d" font-weight="600">M (market)</text>
    <text x="66" y="176" fill="#166534">Rf</text>
    <text x="240" y="72" fill="#166534">CML</text>
    <text x="222" y="196" fill="#7c3aed">frontier</text>
    <text x="260" y="236" fill="#475569">total risk σ</text>
    <rect x="370" y="16" width="330" height="228" fill="#f8fafc" rx="10"/>
    <text x="390" y="38" fill="#334155" font-weight="600">SML — (β, E[R]) space</text>
    <line x1="410" y1="220" x2="670" y2="220" stroke="#475569" stroke-width="1.5"/>
    <line x1="410" y1="220" x2="410" y2="40" stroke="#475569" stroke-width="1.5"/>
    <line x1="410" y1="180" x2="650" y2="80" stroke="#16a34a" stroke-width="2.5"/>
    <circle cx="530" cy="130" r="5" fill="#16a34a"/>
    <text x="538" y="128" fill="#14532d">β = 1 (M)</text>
    <text x="416" y="176" fill="#166534">Rf</text>
    <circle cx="480" cy="140" r="5" fill="#dc2626"/>
    <text x="486" y="140" fill="#991b1b" font-weight="600">A — above line: UNDERPRICED (buy)</text>
    <circle cx="610" cy="130" r="5" fill="#dc2626"/>
    <text x="596" y="160" fill="#991b1b">B — below: OVERPRICED</text>
    <text x="560" y="236" fill="#475569">systematic risk β</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Portfolio return & risk', expr: 'E[Rp] = ΣwᵢE[Rᵢ]; σp² = ΣΣwᵢwⱼσᵢⱼ', meaning: 'Covariances drive risk' },
        { name: 'Single-index model', expr: 'Rᵢ = αᵢ + βᵢRₘ + eᵢ; cov(i,j) = βᵢβⱼσₘ²', meaning: 'One index explains co-movement' },
        { name: 'CAPM / SML', expr: 'E[Rᵢ] = Rf + βᵢ(E[Rₘ] − Rf)', meaning: 'Price of systematic risk' },
        { name: 'CML', expr: 'E[Rp] = Rf + σp·(E[Rₘ]−Rf)/σₘ', meaning: 'Efficient portfolios only' },
        { name: 'APT', expr: 'E[Rᵢ] = Rf + βᵢ₁λ₁ + … + βᵢₖλₖ', meaning: 'Multi-factor, no-arbitrage' },
      ],
      examples: [
        {
          title: 'Two-asset frontier by hand',
          given: ['A: E[R]=12%, σ=20%; B: E[R]=8%, σ=10%; ρ=+0.3; weights 50/50', 'Rf = 5%, E[Rₘ] = 11%, σₘ = 15%'],
          steps: [
            { text: 'Expected return', calc: 'E[Rp] = 0.5(12) + 0.5(8) = 10.0%' },
            { text: 'Variance', calc: 'σp² = .25(400) + .25(100) + 2(.5)(.5)(.3)(20)(10) = 100+25+30 = 155 ⇒ σp = 12.45%' },
            { text: 'Diversification gain', calc: 'Weighted σ = 15% → actual 12.45%: correlation <1 saved 2.55 points' },
            { text: 'Is it efficient?', calc: 'CML at σp: 5 + 12.45×(11−5)/15 = 9.98% ≈ 10.0% — this 50/50 sits essentially ON the CML (with ρ=0.3 the mix behaves like a near-market combo)' },
          ],
          answer: 'Return 10%, risk 12.45%; the covariance term did the work that averaging risks never can.',
        },
        {
          title: 'SML mispricing + an APT arbitrage',
          given: [
            'Stock X: analyst E[R] = 15%, β = 1.2, Rf = 6%, E[Rₘ] = 12%',
            'APT world: factors F1 (industrial production, λ₁ = 4%), F2 (default spread, λ₂ = 3%); asset P: β₁ = 1.0, β₂ = 0.5, E[R] = 12%; asset Q: identical betas, E[R] = 14%',
          ],
          steps: [
            { text: 'X vs SML', calc: 'Required = 6 + 1.2(12−6) = 13.2% < analyst 15% ⇒ X plots ABOVE the line — underpriced, buy (alpha +1.8%)' },
            { text: 'APT fair price', calc: 'E[R] fair = 6 + 1.0(4) + 0.5(3) = 11.5%; P at 12% is +0.5 rich, Q at 14% is +2.5 rich vs factor line' },
            { text: 'Arbitrage', calc: 'Short Q, buy P in equal factor-exposure notional (β-matched 1:1 on both factors) → collects 2% with zero net factor risk, zero investment' },
            { text: 'Closure', calc: 'Buying P lifts its price (return falls), shorting Q cuts its price (return rises) until both sit on the factor line — arbitrage, not utility, enforces APT' },
          ],
          answer: 'SML flags mispricing in beta space; APT closes it in factor space — same discipline, different number of dimensions.',
        },
      ],
      caseStudy: {
        title: 'Case — The optimiser\'s garbage-in feast',
        body: [
          'A fund runs a Markowitz optimisation on 80 stocks using 5-year historical means and covariances. The output: 62% in one midcap that happened to return 45% annually in the sample, 3% cash, remainder scattered. The CIO doubles risk limits to "capture the frontier". Next 12 months the portfolio returns −9% vs index +8%.',
          'Re-running with betas from a single-index model and shrunk expected returns (all E[Rᵢ] = CAPM-implied) produces a boring 22-stock portfolio that tracks within 1.5% of the index.',
        ],
        questions: [
          'Why did the unconstrained optimiser produce garbage?',
          'Why does shrinking expected returns toward CAPM help?',
          'When is full Markowitz still the right tool?',
        ],
        takeaways: [
          'Means are estimated with huge standard errors; the optimiser treats noise as truth and concentrates accordingly — error maximisation, not return maximisation',
          'CAPM-implied means are the market\'s aggregation — shrinking toward them is cheap insurance against estimation error (Black–Litterman in spirit)',
          'Full optimisation earns its keep on covariance-only problems (minimum-variance portfolios) and with high-conviction, error-aware inputs; otherwise constrained factor tilts dominate',
          'Exam link: single-index models exist precisely to cut the input problem from O(n²) to O(n) — that is Sharpe\'s contribution here',
        ],
      },
      revision: [
        'Markowitz: E[Rp]=ΣwE[R], σp²=ΣΣwwσᵢⱼ — covariances, not average σ',
        'Efficient frontier: max return per risk; diversification removes only unsystematic risk',
        'Inputs grow O(n²) — Sharpe single-index cuts to O(n): cov=βᵢβⱼσₘ²',
        'CAPM: E[R]=Rf+β·MRP; everyone holds M + risk-free (two-fund separation)',
        'SML prices every asset by β; CML only efficient portfolios by σ — classic exam trap',
        'Above SML = underpriced (positive alpha); below = overpriced',
        'Roll\'s critique: market portfolio unobservable ⇒ CAPM not testable alone',
        'APT: E[R]=Rf+Σβₖλₖ; no-arbitrage logic; CAPM = 1-factor APT',
        'Empirics: size & value effects ⇒ Fama–French SMB/HML factors',
      ],
      practice: [
        { q: 'Portfolio P: E[R] = 13%, β = 1.1, σ = 28%. Index: E[R] = 11%, β = 1, σ = 16%. Rf = 6%. Is P mispriced?', a: 'SML required = 6 + 1.1(5) = 11.5% < 13% ⇒ P is above the SML, underpriced by 1.5% expected alpha. Its σ=28% just means high total risk — SML ignores σ.' },
        { q: 'Why can a diversified portfolio have large σ but lie ON the SML?', a: 'SML prices only systematic risk (β); σ includes diversifiable noise. Every fairly-priced asset lies on the SML regardless of σ — only efficient portfolios also lie on the CML.' },
        { q: 'Name two practical failures of raw Markowitz and one fix each.', a: 'Input-error maximisation (fix: shrink means / Black–Litterman); corner concentrations and instability (fix: position and sector caps, resampled covariance).' },
        { q: 'Portfolio return 14 percent, SD 18 percent, Rf 6 percent; benchmark return 12 percent, SD 14 percent. Compare properly.', a: 'Sharpe: (14-6)/18 = 0.44 vs (12-6)/14 = 0.43 - nearly equal risk-adjusted despite the return gap. Raw return comparisons flatter risk-takers; Sharpe normalises the bragging.' },
        { q: 'Why is APT more general than CAPM, and what does it cost you?', a: 'APT allows multiple priced factors (inflation, term structure, cycles) without specifying them, but it does not tell you WHICH factors or their prices - empirically you must hunt and test them yourself.' },
      ],
      tools: [
        { label: 'Portfolio Risk & Return Lab', href: '/tools/portfolio-risk-lab' },
        { label: 'WACC Calculator (beta → cost of equity)', href: '/tools/wacc-calculator' },
      ],
    },

    /* ─────────── LECTURE 5 (Unit 5 · outline) ─────────── */
    {
      slug: 'portfolio-evaluation-revision',
      number: 5,
      title: 'Portfolio Evaluation & Revision: Sharpe, Treynor, Jensen + New Frontiers',
      minutes: 45,
      summary:
        'NAV mechanics, the three performance indices and when they disagree, revision triggers and constant-proportion strategies, international diversification, and the contemporary unit: AI in trading, ESG investing, blockchain & crypto.',
      status: 'live',
      objectives: [
        'Compute NAV and the three performance indices correctly',
        'Choose Sharpe vs Treynor by investor type (total vs systematic risk)',
        'Interpret Jensen\'s alpha as manager skill',
        'Apply revision triggers and constant-proportion strategies with costs',
        'Discuss AI trading, ESG screens and crypto through the same risk–return lens',
      ],
      sections: [
        {
          heading: '1. NAV and the three performance indices',
          body: [
            '**NAV** = (market value of assets − liabilities) / units — struck daily for open funds. Returns: NAV-to-NAV with dividends reinvested (total-return NAV). Performance must always be judged **against a benchmark** and after costs; look-through matters (what risks produced the return?).',
            'The three indices: **Sharpe** = (R̄p − Rf)/σp — excess return per unit of TOTAL risk; right measure when the portfolio is the investor\'s whole wealth (undiversified). **Treynor** = (R̄p − Rf)/βp — excess return per unit of SYSTEMATIC risk; right when the portfolio is one slice of a diversified whole. **Jensen\'s alpha** = R̄p − [Rf + βp(R̄m − Rf)] — did the manager beat the CAPM-fair return? Meanings: Sharpe ranks on efficiency; Treynor ranks on market-adjusted efficiency; alpha measures skill in expected-return points. When they disagree: high Sharpe + low Treynor ⇒ good diversification but market-correlated returns; low Sharpe + high Treynor ⇒ strong market-adjusted returns but unnecessary idiosyncratic risk (typical of concentrated managers — fine as a satellite, wrong as the core). Related tools: **M²** (Modigliani) restates Sharpe in return points; **information ratio** = alpha/tracking error for active management skill per unit of active risk; **Sortino** uses downside deviation (F01 audience: loss-aversion-consistent).',
          ],
          callout: {
            type: 'exam',
            text: 'Exam pattern: compute all three for two funds and RE-RANK. Rules: fully diversified investor ⇒ Treynor/Jensen agree; single-fund investor ⇒ Sharpe governs. Negative beta breaks Treynor (division by negative β flips sign — say so, don\'t just compute). And always subtract the right Rf per period (annualise consistently: monthly ×12 for returns, ×√12 for σ).',
          },
        },
        {
          heading: '2. Revision, international diversification, and the new frontier',
          body: [
            '**Revision**: triggers — drift beyond bands (e.g., 60/40 → 65/35 rebalance back; band width trades off discipline against transaction costs and taxes), cash-flow rebalancing (direct dividends/SIPs to underweights — zero cost), change in objectives or constraints (life events), or thesis invalidation (fundamental triggers from Unit 2). **Constant-proportion strategies**: constant-mix (rebalance to fixed weights — sells winners, buys losers, thrives in oscillating markets), **constant-proportion portfolio insurance (CPPI)**: stock exposure = m×(portfolio value − floor) — buys as markets rise, sells in falls; crashes hurt (gap risk through the floor), oscillations whipsaw it; buy-and-hold sits between. Costs and taxes decide how often to revise: rebalance when drift > band, not every calendar page.',
            '**International diversification**: adds low-correlation return sources (currency risk partly hedges — rupee depreciation boosts foreign-asset returns for an INR investor), but correlations rise exactly in crashes ("diversification fails when you need it"); practical routes: international feeder funds, ETFs, LRS limits. **New frontiers**: **AI/ML in trading** — signal discovery (order-book microstructure, alt-data NLP), execution algos (VWAP/IWAP), risk (fraud, position limits); evidence: most gains accrue in execution and market-making, not public alpha (crowding decays ML signals fast); risk = overfit backtests, regime shifts, black-box failures (flash crashes). **ESG investing** — screens, best-in-class, integration, stewardship; return evidence is mixed (no systematic sacrifice, no free lunch either); the real risks: greenwashing, divestment vs engagement debate, stranded assets. **Blockchain & crypto** — Bitcoin as censorship-resistant digital commodity (fixed supply), ETH as programmable settlement; risks: volatility, regulatory bans, custody hacks, 2022 cascade (Terra, FTX); through the portfolio lens: at small weights (<5%) improves frontier historically, but tail correlations in crises are high and recovery not guaranteed. Same framework for all three: expected return, risk, correlation, liquidity, governance — new instruments, old discipline.',
          ],
          bullets: [
            'Sharpe: total risk — whole-wealth investor; Treynor/Jensen: β — slice of a diversified portfolio',
            'Alpha = actual − CAPM-required return; IR = alpha/tracking error',
            'Rebalance on bands, not calendars; use cash flows to rebalance free',
            'CPPI: exposure = m(V − floor); gap risk in crashes; constant-mix wins in oscillation',
            'International: correlation benefits shrink in crises; currency adds a risk factor',
            'AI alpha decays with crowding; ESG ≠ automatic return drag; crypto = high-σ satellite at best',
          ],
        },
      ],
      diagram: {
        title: 'Performance map: Sharpe vs Treynor quadrants',
        caption: 'Where a fund sits in (systematic, unsystematic) risk space tells you which index the investor should trust.',
        svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sharpe versus Treynor decision map">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <line x1="120" y1="215" x2="640" y2="215" stroke="#475569" stroke-width="1.5"/>
    <line x1="120" y1="215" x2="120" y2="30" stroke="#475569" stroke-width="1.5"/>
    <text x="600" y="234" fill="#475569">systematic risk β →</text>
    <text x="70" y="40" fill="#475569" transform="rotate(-90 70 40)">unsystematic σ(e) →</text>
    <circle cx="200" cy="70" r="7" fill="#16a34a"/>
    <text x="214" y="66" fill="#14532d" font-weight="600">Index fund — high Sharpe AND Treynor</text>
    <text x="214" y="80" fill="#166534">perfect diversification, no idiosyncratic noise</text>
    <circle cx="330" cy="160" r="7" fill="#0ea5e9"/>
    <text x="344" y="156" fill="#0c4a6e" font-weight="600">Concentrated stock-picker — low Treynor, ok Sharpe?</text>
    <text x="344" y="170" fill="#075985">high σ(e): fine as satellite, wrong as core</text>
    <circle cx="520" cy="60" r="7" fill="#a855f7"/>
    <text x="534" y="56" fill="#581c87" font-weight="600">Levered market fund — high β</text>
    <text x="534" y="70" fill="#6b21a8">Treynor normalises it; Sharpe punishes the σ</text>
    <text x="160" y="120" fill="#475569" font-size="11">whole-wealth investor → read vertically (Sharpe)</text>
    <text x="160" y="136" fill="#475569" font-size="11">diversified investor → read horizontally (Treynor)</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'NAV', expr: '(Assets − Liabilities) / Units', meaning: 'Unit price struck daily' },
        { name: 'Sharpe ratio', expr: '(R̄p − Rf) / σp', meaning: 'Excess return per total risk' },
        { name: 'Treynor ratio', expr: '(R̄p − Rf) / βp', meaning: 'Excess return per systematic risk' },
        { name: 'Jensen\'s alpha', expr: 'α = R̄p − [Rf + βp(R̄m − Rf)]', meaning: 'Return beyond CAPM-fair' },
        { name: 'Information ratio', expr: 'IR = active return / tracking error', meaning: 'Skill per unit active risk' },
        { name: 'CPPI exposure', expr: 'Equityₜ = m × (Vₜ − Floor)', meaning: 'Dynamic insurance rule' },
      ],
      examples: [
        {
          title: 'Three funds, three verdicts',
          given: [
            'A: R̄=14%, σ=20%, β=0.9; B: R̄=16%, σ=33%, β=1.4; C(index): R̄=12%, σ=15%, β=1.0',
            'Rf = 6%',
          ],
          steps: [
            { text: 'Sharpe', calc: 'A: (14−6)/20 = 0.40 · B: (16−6)/33 = 0.30 · C: (12−6)/15 = 0.40 — A ties the index, B trails' },
            { text: 'Treynor', calc: 'A: 8/0.9 = 8.89 · B: 10/1.4 = 7.14 · C: 6/1.0 = 6.00 — both beat the index per unit of β; A leads' },
            { text: 'Jensen', calc: 'A: 14 − [6+0.9(6)] = +2.6% · B: 16 − [6+1.4(6)] = +1.6% · C: 0' },
            { text: 'Reconcile', calc: 'B\'s idiosyncratic σ(e) is huge (σ=33 at β=1.4 implies σ(e)≈29) — a diversified investor holding B as one of many funds is fine; B as the ONLY holding is a bad deal (Sharpe < index)' },
          ],
          answer: 'A wins everywhere; B wins per-beta but loses per-σ — the investor\'s context, not the manager\'s skill alone, picks the right index.',
        },
        {
          title: 'Rebalance or not: 60/40 gone to 68/32',
          given: ['Policy 60/40 with ±5 absolute bands; equity ₹68L, debt ₹32L (₹1 cr); round-trip cost 0.6%, LTCG 12.5%' ],
          steps: [
            { text: 'Band check', calc: 'Equity weight 68% > 65% upper band ⇒ rebalance trigger hit — sell ₹8L equity, buy debt' },
            { text: 'Cost', calc: '₹8L × 0.6% ≈ ₹4,800 transaction + LTCG on realised gains (say ₹3L gain ⇒ ₹37,500 tax) — total ≈ ₹42k, i.e., 0.42% of portfolio' },
            { text: 'Cash-flow alternative', calc: 'If a ₹8L SIP/redemption is due anyway, direct it to debt — rebalance at zero cost, no trigger needed' },
            { text: 'Do nothing math', calc: 'At 68/32, a further 20% equity fall costs 68×20% = 13.6% vs 12% at 60/40 — the band exists to cap this drift, not to time markets' },
          ],
          answer: 'Rebalance on the band with cash flows where possible; the band converts a market call into a policy rule.',
        },
      ],
      caseStudy: {
        title: 'Case — The star fund that was 1.6 betas of borrowed market',
        body: [
          'A midcap fund prints 34% CAGR over three years vs Nifty 50 at 15%. Marketing screams alpha. Your analysis: β vs Nifty 500 = 1.6, R² = 0.88, σ = 28% vs index 14%; the midcap index itself returned 27% CAGR over the period.',
          'Sharpe: (34−6)/28 = 1.00 vs midcap index (27−6)/16 = 1.31. Treynor: (34−6)/1.6 = 17.5 vs index 21/1.0 = 21. Jensen vs the right benchmark: 34 − [6 + 1.6(21)] = −5.6% — NEGATIVE alpha.',
        ],
        questions: [
          'Why did the marketing claim collapse?',
          'Which benchmark error did it exploit?',
          'What should the investor check before trusting performance claims?',
        ],
        takeaways: [
          'Benchmark mismatch: a 1.6-β midcap fund measured against a largecap index converts market beta into fake alpha — the oldest trick in performance reporting',
          'Right benchmark (midcap index) shows negative Jensen alpha AND worse Sharpe/Treynor — the "star" under-delivered its own risk class',
          'Checklist: correct peer benchmark, β and R², Sharpe AND Treynor, alpha after fees, style drift over time, and full-cycle (not bull-leg) windows',
          'Exam link: this is exactly why Treynor and Jensen (β-based) exist separately from Sharpe — risk adjustment is the whole game',
        ],
      },
      revision: [
        'NAV = (A−L)/units; compare only total-return, after-fee, vs right benchmark',
        'Sharpe = (R̄−Rf)/σ (total risk — whole-wealth); Treynor = (R̄−Rf)/β (systematic — slice)',
        'Jensen α = R̄p − CAPM-required; positive α = skill vs the model',
        'Disagreement Sharpe vs Treynor = un-diversified idiosyncratic risk in the fund',
        'IR = α/TE; M² restates Sharpe in return units; Sortino = downside-risk Sharpe',
        'Rebalance on bands; cash-flow rebalancing is free; taxes gate the calendar',
        'Constant-mix vs CPPI (m(V−floor), gap risk) vs buy-and-hold behaviour map',
        'International diversification: correlations rise in crises; currency is a factor',
        'AI edge lives in execution; ESG needs greenwash screens; crypto = <5% satellite at most',
      ],
      practice: [
        { q: 'Fund: R̄ = 18%, β = 1.5, σ = 25%; Rf = 7%, R̄m = 13%. Compute Sharpe, Treynor, Jensen.', a: 'Sharpe = 11/25 = 0.44; Treynor = 11/1.5 = 7.33; α = 18 − [7 + 1.5(6)] = 2% — positive alpha, but check whether σ=25 vs β-implied ~19.5 means idiosyncratic risk a whole-wealth investor pays for.' },
        { q: 'When does Treynor mislead?', a: 'Negative or near-zero β flips/destabilises the ratio (division by β); and Treynor ignores unpriced idiosyncratic risk entirely — it assumes the holder is diversified.' },
        { q: 'CPPI with m=2, V=₹100L, floor=₹80L. Equity exposure and what happens in a 25% crash?', a: 'Equity = 2×(100−80) = ₹40L. A 25% equity fall = −₹10L ⇒ V=₹90L, next exposure 2×10=₹20L — the rule SELLS into the fall as designed; a gap move below the floor (e.g., −55% before rebalancing) breaks the insurance — gap risk.' },
        { q: 'Fund beats index 3 of 5 years, tracking error 8 percent, beta 1.1. Is the alpha real?', a: 'Test information ratio (excess return over TE) - with 8 percent TE, three wins in five is coin-flip territory. A 1.0+ IR sustained is strong; this pattern is noise wearing a story.' },
        { q: 'Why does rebalancing a 60-40 portfolio ADD return in choppy, trendless markets?', a: 'Systematic contrarian trades: rebalancing sells what ran and buys what fell, harvesting volatility. In trending markets it lags (cuts winners early) - the discipline pays in ranges, costs in trends.' },
      ],
      tools: [
        { label: 'Portfolio Risk & Return Lab', href: '/tools/portfolio-risk-lab' },
      ],
    },
  ],
};
