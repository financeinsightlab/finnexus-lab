import type { Lecture } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM F03 — Financial Derivatives
   Unit-wise lectures: intro → forwards & futures → options →
   swaps & rate derivatives → credit & other derivatives
   ═══════════════════════════════════════════════════════════════ */

export const financialDerivativesLectures: Lecture[] = [
  {
    slug: 'derivatives-introduction-participants',
    number: 1,
    title: 'Introduction: Markets, Participants, ETD vs OTC',
    minutes: 35,
    summary:
      'What derivatives are and why they exist, the historical arc from Chicago grain pits to NSE screen trading, the three participant tribes — hedgers, speculators, arbitrageurs — and the exchange-traded vs OTC divide.',
    status: 'live',
    objectives: [
      'Define a derivative and its payoff logic in one sentence',
      'Classify instruments: forwards, futures, options, swaps',
      'Distinguish the motives and risk positions of hedgers, speculators, arbitrageurs',
      'Compare ETD and OTC markets on contract, clearing and counterparty risk',
    ],
    sections: [
      {
        heading: '1. What a derivative is and why markets built them',
        body: [
          'A **derivative** = a contract whose value is DERIVED from an underlying — equity index, stock, commodity, currency, interest rate, credit event, even weather. The canonical payoff logic: zero-cost entry (forward/future) or premium entry (option) on the future price of the underlying. History: 1848 Chicago Board of Trade grain forwards → 1865 standardised futures → 1973 CBOE options + Black–Scholes → post-1991 India: NSE 2000 index futures, options 2001; single-stock derivatives 2000s; currency derivatives and comdex after; G-Sec and IRF (2023-14 era launches). Today NSE/BSE derivatives dwarf cash turnover — the tail wags the liquidity dog.',
          '**Why they exist**: transfer risk to those willing to bear it (farmer locks grain price; exporter locks dollars; fund hedges beta), price discovery (futures aggregate expectations — often leads cash), operational leverage (small margin controls big exposure), and completion of markets (payoff states otherwise untradeable). **The four families**: forwards (OTC, custom, bilateral), futures (ETD, standardised, margined), options (right-not-obligation, asymmetric payoff, premium), swaps (exchange of streams over time — rates, currencies, credit).',
        ],
        callout: {
          type: 'exam',
          text: 'Participant table, memorise the risk column: HEDGER — has/needs the underlying, wants to LOCK price; derivative OFFSETS an existing exposure (risk-averse to the underlying). SPECULATOR — no underlying exposure; derivative CREATES the exposure for profit (risk-seeking, provides liquidity). ARBITRAGEUR — simultaneous offsetting trades in mispriced related markets; profit without risk; their activity ENFORCES pricing laws (cost-of-carry, put–call parity). One line each + example each = full marks.',
        },
      },
      {
        heading: '2. ETD vs OTC and the plumbing',
        body: [
          '**Exchange-traded (ETD)**: standardised contracts (lot sizes, expiries — NSE weekly/monthly expiries for indices), central counterparty (**CCP**) clearing becomes buyer to every seller and seller to every buyer — counterparty risk collapses into clearing-house risk, defended by **margins** (initial + exposure/EXT), daily **mark-to-market** settlement, and settlement guarantees. Price discovery is public (order book). **OTC**: bespoke notional and dates negotiated bilaterally (forwards, swaps, structured notes); post-2008 reforms — reporting to trade repositories, central clearing mandates for standardised IRS/CDS, margin for non-cleared — narrowed but never removed counterparty risk (documentation under ISDA Master Agreement).',
          'India\'s plumbing: NSE F&O segment; SEBI position limits (client, market-wide, member); lot sizes set to notional bands (revised with index levels); cash-settled index derivatives; physically-settled stock derivatives (since 2019); margins span SPAN + exposure; surveillance (additional margins on volatility). The BA angle: every element — expiry calendars, basis, open interest — is quantifiable; the finance angle: derivatives are the completion of the risk market F04 builds portfolios in. Nothing here is an "asset" in the long-horizon investor\'s sense — it is a lens on the underlying.',
        ],
        bullets: [
          'Derivative = payoff derived from underlying; zero or premium entry',
          'Families: forwards · futures · options · swaps',
          'Functions: risk transfer, price discovery, leverage, market completion',
          'ETD: standardised + CCP + margins + daily MTM · OTC: bespoke + bilateral + ISDA',
          'Post-2008: OTC reporting, clearing mandates, margin rules',
          'Hedger/speculator/arbitrageur — the risk column is the exam',
        ],
      },
    ],
    diagram: {
      title: 'The three tribes around one contract',
      caption: 'Every open position is one of three motives; the market needs all three to function.',
      svg: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Derivatives market participants">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="30" y="80" width="190" height="90" rx="12" fill="#dcfce7"/><text x="125" y="102" fill="#14532d" font-weight="600">HEDGER</text><text x="125" y="122" fill="#166534">has the exposure</text><text x="125" y="140" fill="#166534">locks price · gives up upside</text><text x="125" y="158" fill="#166534">e.g. exporter sells $ fwd</text>
    <rect x="265" y="80" width="190" height="90" rx="12" fill="#fee2e2"/><text x="360" y="102" fill="#7f1d1d" font-weight="600">SPECULATOR</text><text x="360" y="122" fill="#991b1b">takes the view</text><text x="360" y="140" fill="#991b1b">creates exposure · pays no premium (fwd)</text><text x="360" y="158" fill="#991b1b">provides liquidity</text>
    <rect x="500" y="80" width="190" height="90" rx="12" fill="#e0f2fe"/><text x="595" y="102" fill="#0c4a6e" font-weight="600">ARBITRAGEUR</text><text x="595" y="122" fill="#075985">simultaneous legs</text><text x="595" y="140" fill="#075985">riskless mispricing harvest</text><text x="595" y="158" fill="#075985">enforces pricing laws</text>
    <rect x="230" y="200" width="260" height="26" rx="8" fill="#f1f5f9"/><text x="360" y="217" fill="#475569">market needs all three tribes</text>
    <line x1="220" y1="125" x2="263" y2="125" stroke="#475569" stroke-width="1.4"/>
    <line x1="455" y1="125" x2="498" y2="125" stroke="#475569" stroke-width="1.4"/>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Forward payoff (long)', expr: 'Π = S_T − F', meaning: 'Linear, zero-cost entry' },
      { name: 'Option payoff (long call)', expr: 'Π = max(S_T − K, 0) − premium', meaning: 'Asymmetric — right, not obligation' },
      { name: 'Notional leverage', expr: 'Notional / margin posted', meaning: 'Small capital, big exposure' },
    ],
    examples: [
      {
        title: 'One underlying, three tribes',
        given: ['Nifty futures at 24,800; exporter, trader, and quant desk all trade the same contract'],
        steps: [
          { text: 'Hedger', calc: 'An FI fund holding ₹100 cr equity sells Nifty futures ≈ 408 cr notional adjusted by beta 0.95 → locks portfolio value; gives up upside beyond the hedge' },
          { text: 'Speculator', calc: 'Buys 1 lot (75) on 15% margin ~₹2.8L: 1% Nifty move = ±₹18,600 ≈ ±6.6% on margin — leverage without owning shares' },
          { text: 'Arbitrageur', calc: 'Spot-futures basis exceeds carry cost → buy basket, sell futures, pocket the convergence; thousands of such trades keep F ≈ spot×carry' },
        ],
        answer: 'Same contract, three motives: transfer risk, take risk, harvest mispricing — the ecology of every derivatives market.',
      },
      {
        title: 'ETD or OTC for each need?',
        given: ['(a) fund hedges index beta monthly; (b) exporter locks USD 2.1 cr for 87 days; (c) company converts floating ₹500 cr loan to fixed; (d) insurer tail-hedges a crash'],
        steps: [
          { text: '(a)', calc: 'ETD index futures — liquid, standard expiries, CCP' },
          { text: '(b)', calc: 'ODD date + odd amount → interbank forward (OTC) — banks quote custom dates' },
          { text: '(c)', calc: 'OTC interest-rate swap, matched to loan reset dates' },
          { text: '(d)', calc: 'ETD deep-OTM puts (liquid strikes) or OTC structures (knock-out barriers) for exact tenor' },
        ],
        answer: 'Standard → ETD for liquidity and clearing; bespoke → OTC for fit, accepting counterparty/documentation risk.',
      },
    ],
    caseStudy: {
      title: 'Case — 1995: the counterparty risk lesson (Barings & OTC failures)',
      body: [
        'Nick Leeson in SGX-SIMEX/Nikkei arbitrage ran unauthorized directional straddles; losses hidden in error account 88888 sank Barings (233 years old) in weeks — exchange margining worked, internal governance did not. The same decade: Orange County (leveraged inverse-floaters, MTM losses), Metallgesellschaft (stack-and-roll hedging vs short-dated liquidity).',
        'Post-2008, the Lehman lesson re-taught OTC counterparty risk: bilateral swaps with a dead dealer become unsecured creditor claims — hence CCP mandates and ISDA close-out netting.',
      ],
      questions: [
        'Which risks did these failures expose — market, credit, operational, or governance?',
        'How does CCP clearing change the failure mode?',
        'What governance rules prevent a Barings today?',
        ],
      takeaways: [
        'Barings = operational + governance (unsegregated front/back office); Orange County = market risk on leverage; MG = liquidity risk in a sound economic hedge — label risk types precisely',
        'CCP mutualises and nets counterparty risk, but converts it into margin/liquidity risk on volatile days (variation calls) — clearing does not remove risk, it re-locates it',
        'Modern defences: segregation of duties, position limits, independent risk reporting, margin automation — and ISDA netting + collateral (CSA) for OTC',
        'The enduring exam line: derivatives do not create risk; they move, magnify and rename it',
      ],
    },
    revision: [
      'Derivative: value derived from underlying; payoff logic zero/premium cost',
      'Families: forwards (OTC custom) · futures (ETD standard) · options (asymmetric) · swaps (streams)',
      'Functions: risk transfer, discovery, leverage, market completion',
      'Hedger offsets existing exposure; speculator creates it; arbitrageur harvests mispricing',
      'ETD: CCP, margins, daily MTM, position limits · OTC: bespoke, ISDA, post-2008 clearing mandates',
      'India: NSE F&O 2000, cash-settled index, physically-settled stocks, SPAN+exposure margins',
      'History: CBOT 1848 → CBOE 1973 → NSE 2000',
    ],
    practice: [
      { q: 'A farmer sells wheat futures; a bread maker buys them. Who hedges what?', a: 'Farmer (long the crop) sells futures — locks sale price, protects against price falls. Baker (short wheat via future needs) buys — locks input cost, protects against rises. Both hedgers; their opposite exposures make the market.' },
      { q: 'Why can speculators be socially useful?', a: 'They supply liquidity and take the other side when hedgers imbalance (all farmers want to sell); without them hedges are unfillable or overpriced. The externality: leverage-driven defaults and manias — hence margins, limits, surveillance.' },
      { q: 'Counterparty risk of a futures position vs an OTC forward with the same dealer?', a: 'Futures: the CCP is your counterparty — dealer default doesn\'t touch you (margin already posted). Forward: bilateral exposure to the dealer until settlement — mitigated by ISDA netting/collateral, never eliminated.' },
      { q: 'Same futures position - a hedger, a speculator and an arbitrageur each hold it. What distinguishes their purpose?', a: 'The hedger offsets an existing underlying exposure (wants risk down), the speculator takes naked exposure for profit (risk up), the arbitrageur locks a mispricing against the underlying (no net risk).' },
      { q: 'Why did exchanges with clearing houses largely kill counterparty default risk that plagued forwards?', a: 'Central clearing becomes counterparty to both sides, collects initial margin and settles variation daily - default risk is mutualised and capped at one day\'s move instead of the losing party\'s full balance.' },
    ],
  },
  {
    slug: 'forwards-futures-cost-of-carry',
    number: 2,
    title: 'Forwards & Futures: Cost-of-Carry Pricing, Margins & MTM',
    minutes: 45,
    summary:
      'Forward and futures terminology, the differences that matter, contract specifications on NSE, the cost-of-carry model with and without yield, basis and convergence, the margining and mark-to-market machine, and long/short position arithmetic.',
    status: 'live',
    objectives: [
      'Price a forward/future by cost of carry (with income and storage)',
      'Explain basis, convergence and cash-futures arbitrage',
      'Walk the daily MTM and margin-call mechanics with numbers',
      'Contrast forward vs futures on cash-flow timing risk',
    ],
    sections: [
      {
        heading: '1. Cost of carry and the pricing law',
        body: [
          'Terminology: **long/short**, **spot S**, **futures F**, expiry T; **basis = S − F** (or F − S by convention — state yours). Contract specs (NSE): lot size, expiry (last Tuesday/Thursday cycles per current rules), cash vs physical settlement, position limits, SPAN margin. **Forward vs futures**: custom vs standard, bilateral vs CCP, settlement at expiry vs daily MTM, counterparty vs margin risk — economically similar, cash-flow-wise different.',
          '**Cost-of-carry model**: F = S·e^((r+c−y)T) — carry the underlying to expiry: financing r + storage c (commodities) − income y (dividends, convenience). The logic is arbitrage: if F > carry price, buy spot-sell futures (cash-and-carry); if F < , reverse (reverse cash-and-carry when shorting/holding is feasible). **Basis converges to zero at expiry** (S_T = F_T) — the anchor of every arbitrage. Equities: y = dividend yield (index futures trade at discount around record dates). Commodities: contango (F > S, carry-dominated) vs backwardation (F < S, scarcity/convenience yield — oil in squeezes). Currency: covered interest parity — F = S·(1+i₹)/(1+i$) (F05\'s territory, same law).',
        ],
        callout: {
          type: 'exam',
          text: 'The three-line pricing law: F = S(1 + r − y)^T (discrete) or S·e^{(r−y)T}. Cash-and-carry: F too HIGH → buy spot, sell future. Reverse cash-and-carry: F too LOW → sell spot (or short), buy future. Then basis: starts at carry, must reach 0 at expiry — basis risk is what hedges actually bear.',
        },
      },
      {
        heading: '2. Margins, MTM and living with basis',
        body: [
          'The margin machine: **initial/SPAN margin** (portfolio value-at-risk-based) + exposure margin posted at entry; **daily mark-to-market**: at each day\'s settlement price, gains credited, losses debited; account falling below **maintenance** triggers a **margin call** (restore to initial; fail = squared-up). MTM is the CCP\'s defence: losses never accumulate beyond a day\'s move. But it creates **liquidity risk** — a correct long-term hedge can bleed daily cash before expiry ( Metallgesellschaft\'s lesson: economically hedged, liquidity-dead). Futures vs forward pricing can diverge slightly when rates correlate with the underlying (via interest on daily settlement flows) — ignore for exams, know for interviews.',
          '**Long/short arithmetic & hedging with basis risk**: hedger holds asset, sells futures → effective price = S_T + (F₀ − F_T) = F₀ + basis_T — you lock F₀ PLUS the terminal basis; if basis ≠ 0 (quality/location/timing mismatch), residual risk remains. **Roll risk**: expiring hedges must roll to next contract at unknown basis. Speculative arithmetic: 1 lot Nifty (75) bought 24,800, sold 25,050 → +250×75 = ₹18,750 on ~₹3L margin (~6%); the same leverage on the downside explains why 90%+ of retail F&O traders lose money (SEBI\'s own study).',
        ],
        bullets: [
          'F = S·e^{(r+c−y)T}; carry = financing + storage − income',
          'F > carry → cash-and-carry arb; F < → reverse (if shortable)',
          'Basis → 0 at expiry; hedgers bear basis risk, not price risk',
          'MTM daily: gains credited, losses debited, margin calls restore initial',
          'MTM = liquidity risk for correct hedges (MG lesson)',
          'Contango: F > S (carry); backwardation: F < S (scarcity)',
          'Effective hedge price = F₀ + terminal basis',
        ],
      },
    ],
    diagram: {
      title: 'Basis convergence and the arbitrage corridor',
      caption: 'Basis starts at the carry spread and is forced to zero at expiry; outside the corridor, arbitrage trades pull it back.',
      svg: `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Basis convergence diagram">
  <g font-family="inherit" font-size="12">
    <line x1="60" y1="190" x2="660" y2="190" stroke="#475569" stroke-width="1.5"/>
    <line x1="60" y1="190" x2="60" y2="30" stroke="#475569" stroke-width="1.5"/>
    <text x="600" y="210" fill="#475569">time → expiry T</text>
    <text x="20" y="40" fill="#475569">price</text>
    <path d="M80,80 C300,110 520,150 640,160" fill="none" stroke="#16a34a" stroke-width="2.5"/>
    <path d="M80,100 C300,130 520,152 640,160" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6 4"/>
    <path d="M80,62 C300,90 520,140 640,160" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2 4"/>
    <path d="M80,118 C300,146 520,152 640,160" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2 4"/>
    <circle cx="640" cy="160" r="6" fill="#7c3aed"/>
    <text x="590" y="142" fill="#4c1d95" font-weight="600">S_T = F_T</text>
    <text x="95" y="70" fill="#16a34a">spot S</text>
    <text x="95" y="120" fill="#dc2626">futures F</text>
    <text x="150" y="66" fill="#475569">basis = S − F starts at carry</text>
    <line x1="152" y1="70" x2="152" y2="112" stroke="#0891b2" stroke-width="2"/>
    <text x="160" y="100" fill="#0891b2">carry spread</text>
    <text x="240" y="60" fill="#94a3b8">arbitrage corridor (costs): outside it, cash-and-carry trades fire</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Cost of carry', expr: 'F = S · e^{(r + c − y)T}', meaning: 'No-arbitrage futures price' },
      { name: 'Basis', expr: 'Basis = S − F (→ 0 at expiry)', meaning: 'The hedger\'s residual risk' },
      { name: 'Effective hedge price', expr: 'P_eff = F₀ + Basis_T', meaning: 'What a short hedge actually locks' },
      { name: 'MTM cash flow', expr: 'Daily CF = (Settleₜ − Settleₜ₋₁) × lot × sides', meaning: 'The liquidity machine' },
    ],
    examples: [
      {
        title: 'Price the index future and arb it',
        given: ['Nifty spot 24,000; r 7%; dividend yield 1.2%; 3 months to expiry; fair F vs market 24,250'],
        steps: [
          { text: 'Fair futures', calc: 'F = 24000 × e^{(0.07−0.012)(0.25)} = 24000 × e^{0.0145} ≈ 24,351' },
          { text: 'Market vs fair', calc: '24,250 < 24,351 → future UNDERPRICED by ~101 points' },
          { text: 'Arbitrage', calc: 'Reverse cash-and-carry: buy futures, short/sell the index basket (or sell held basket), hold to expiry; capture ≈ 101 pts minus costs (impact, stamp, funding)' },
          { text: 'Check costs', calc: 'Round-trip basket cost ~15–25 pts + fees; net ~60–70 pts per lot = ₹4,500–5,250 per 75-lot — real desks run this in size' },
        ],
        answer: 'Carry gives the fair line; deviations beyond transaction cost are arbitrage; otherwise it is noise.',
      },
      {
        title: 'Margins and MTM on one lot',
        given: ['Buy 1 Nifty lot (75) at 24,800; SPAN+exposure margin ₹2.9L; daily settles: 24,700, 24,850, 25,050'],
        steps: [
          { text: 'Day 1', calc: 'MTM = (24,700 − 24,800)×75 = −₹7,500 debited; balance ₹2.82L (above maintenance — no call)' },
          { text: 'Day 2', calc: 'MTM = +150×75 = +₹11,250 credited' },
          { text: 'Day 3', calc: 'MTM = +200×75 = +₹15,000; cumulative +₹18,750 ≈ +6.5% on margin in 3 days' },
          { text: 'Reverse case', calc: 'A three-day −350-pt slide = −₹26,250 MTM: deposit more or get squared — the hedge that was RIGHT can still die of liquidity' },
        ],
        answer: 'Futures P&L is paid daily, not at expiry — profit paths are smooth, hedge paths can be cash-starved.',
      },
    ],
    caseStudy: {
      title: 'Case — Metallgesellschaft: the hedge that was right and nearly fatal',
      body: [
        'MG (1993) sold 10-year fixed-price oil supply contracts (long-dated short forwards to customers) and hedged with long near-month futures rolled monthly ("stack and roll"). The hedge was economically sound: futures gains should offset forward losses.',
        'Oil prices fell; near-month long futures bled daily MTM cash while offsetting customer-contract gains were unrealised for years. Margin calls hit hundreds of millions; the board liquidated the hedge at the worst moment, crystalising ~$1.3bn losses.',
      ],
      questions: [
        'Was the position a hedge or a speculation?',
        'Why did cash and accounting diverge from economics?',
        'What design keeps such hedges alive?',
      ],
      takeaways: [
        'Economically hedged (duration-matched in expectation) — killed by term-structure and cash-flow timing: short-dated MTM vs long-dated illiquid offset',
        'Basis + roll risk: contango rolls raised hedge cost precisely when prices fell; IFRS/US-GAAP at the time couldn\'t book the offsetting forward gains — optics forced the liquidation',
        'Design: term-matched OTC swaps instead of stacks, pre-funded liquidity buffers, treasury mandate that separates hedge-accounting designation from margin capacity',
        'Exam line: derivatives risk is not one risk — price, basis, roll, liquidity, margin, accounting: name all six',
      ],
    },
    revision: [
      'F = S·e^{(r+c−y)T}: financing + storage − income; index: y = div yield',
      'F high → cash-and-carry; F low → reverse; costs create the corridor',
      'Basis = S − F; converges to 0; hedger bears basis + roll risk',
      'Effective price of short hedge = F₀ + Basis_T',
      'Margins: SPAN+exposure at entry; daily MTM; calls restore to initial',
      'Forward = expiry settlement; future = daily cash flows → liquidity risk',
      'Contango (carry) vs backwardation (scarsity/convenience)',
      'Leverage cuts both ways: ±6% on margin for a 1% index move',
    ],
    practice: [
      { q: 'Stock ₹1,000, r 6%, no dividends, 4-month future quotes 1,030. Trade?', a: 'Fair F = 1000×e^{0.06×(4/12)} ≈ 1,020.2 → future 10 pts rich: cash-and-carry — buy stock, sell future, hold to expiry, net ~₹10 minus costs.' },
      { q: 'A hedger sells futures at F₀ = 25,000; at expiry S_T = 24,300 and F_T = 24,300. What is achieved if the asset is sold at spot?', a: 'Spot sale 24,300 + futures gain (25,000 − 24,300 = 700) = effective 25,000 = F₀ + basis(0). Perfect lock because basis converged to zero; a live-wheat vs index-futures mismatch would leave residual basis risk.' },
      { q: 'Why do index futures trade at a discount before large dividends?', a: 'Expected dividends raise y (income from holding spot), cutting the carry: F = S·e^{(r−y)T}. Holders of spot receive dividends; futures holders do not — the discount is the prepaid dividend.' },
      { q: 'Spot Rs 1,000, risk-free 8 percent, one year, no dividends. Fair futures price - and what if the market quotes Rs 1,090?', a: 'Fair F = 1000 x 1.08 = Rs 1,080. At 1,090, cash-and-carry: borrow, buy spot, short futures, pocket Rs 10 locked in at expiry.' },
      { q: 'Why does a hedger prefer futures over forwards despite basis risk?', a: 'Liquidity, low entry cost, no counterparty credit line needed, and standardised size - the price of that convenience is basis risk and daily cash-flow noise from marking to market.' },
    ],
  },
  {
    slug: 'options-strategies-greeks-black-scholes',
    number: 3,
    title: 'Options: Strategies, Greeks & Black–Scholes',
    minutes: 55,
    summary:
      'Option mechanics and the strategy zoo — bull/bear spreads, butterflies, straddles, strangles, strips and straps — the five Greeks and their hedging meaning, binomial logic, and Black–Scholes valuation with its assumptions and abuses.',
    status: 'live',
    objectives: [
      'Price payoffs and breakevens for every core strategy',
      'Choose a strategy for a stated market view (direction × volatility)',
      'Compute and hedge with delta, gamma, theta, vega, rho',
      'Apply Black–Scholes and binomial valuation, and know when they lie',
    ],
    sections: [
      {
        heading: '1. Mechanics and the strategy zoo',
        body: [
          '**Options**: buyer pays premium for a RIGHT (not obligation) — call = buy at K; put = sell at K; seller/writer collects premium, bears obligation. American (exercise anytime) vs European (expiry only); Indian index options European-cash-settled; stock options American-physical. **Moneyness**: ITM/ATM/OTM; intrinsic vs time value (premium = intrinsic + time). Four naked positions: long call (limited loss, unlimited gain), short call (limited gain, unlimited loss), long put, short put.',
          '**Strategies = structured views**: **Bull call spread** (buy K₁ call, sell K₂ call): cheaper bullish bet, gains capped — view: up, moderately. **Bear put spread**: mirror for declines. **Butterfly** (buy K₁, sell 2 K₂, buy K₃): bet on STAYING near K₂ — low-volatility view with capped risk. **Straddle** (call + put same K): big move, direction agnostic — earnings, budget, verdicts. **Strangle** (OTM call + OTM put): cheaper, needs a BIGGER move. **Strip** (2 puts + 1 call) and **strap** (2 calls + 1 put): skewed straddles — likely-big move with a directional tilt. **Covered call** (stock + short call) and **protective put** (stock + long put): single-underlying overlays. Exam skill: for each — draw the hockey sticks, compute max profit/loss, breakeven(s), and state the view it encodes.',
        ],
        callout: {
          type: 'exam',
          text: 'The universal two-line method for ANY strategy: (1) table of leg payoffs at expiry across S_T (use S_T = K, K±lots); (2) add columns. Breakeven = S_T where total payoff = total premium paid. Then classify the view: direction (bull/bear/neutral) × magnitude (small/large) × volatility (buy/sell). Every strategy question is answered by this table.',
        },
      },
      {
        heading: '2. Greeks and valuation',
        body: [
          '**The Greeks** (option sensitivities): **Delta (Δ)** — ∂V/∂S: call 0→1, put −1→0; ATM ≈ 0.5; delta = hedge ratio (0.5-delta call ↔ 2 calls per 100 shares) AND ≈ probability of finishing ITM. **Gamma (Γ)** — ∂Δ/∂S: curvature; highest ATM near expiry; gamma = how often you must re-hedge; a gamma-long book profits from movement. **Theta (Θ)** — time decay: option melts toward intrinsic; short-theta = rent paid for optionality; accelerates near expiry ATM. **Vega** — ∂V/∂σ: the volatility exposure (per 1-vol-point); long options = long volatility; crush after events (post-earnings IV collapse) is a vega loss. **Rho** — rate sensitivity (calls +, puts −; smallest). Portfolio management = managing the Greek vector: delta-neutral (direction-safe) still carries gamma/theta/vega — the market-maker\'s business model is selling theta, hedging gamma.',
          '**Valuation**: **Binomial** (Cox–Ross–Rubinstein): discrete up/down tree with risk-neutral probability p = (e^{rΔt} − d)/(u − d); roll values backward — handles American exercise and dividends naturally. **Black–Scholes**: C = S·N(d₁) − K·e^{−rT}·N(d₂); P = K·e^{−rT}·N(−d₂) − S·N(−d₁); d₁ = [ln(S/K) + (r + σ²/2)T]/(σ√T), d₂ = d₁ − σ√T. N(d₂) = risk-neutral P(finish ITM); S·N(d₁) = hedge-adjusted expected stock leg. **Assumptions**: European, constant σ, lognormal, frictionless, constant r — all false somewhere; hence implied vol surfaces (smile/skew) and GARCH/real-world models. Put–call parity (European): C − P = S − K·e^{−rT} — the arbitrage spine that ties all four instruments together (F06 lecture 8 implements it in Excel).',
        ],
        bullets: [
          'Premium = intrinsic + time; time decays (theta) toward expiry',
          'Spreads cap both sides; straddles/strangles buy movement; butterflies sell it',
          'Strip = straddle + put tilt; strap = straddle + call tilt',
          'Δ = hedge ratio & P(ITM); Γ = re-hedge burden; Θ = decay; vega = vol exposure',
          'Binomial: p = (e^{rΔt} − d)/(u − d), roll back; handles American',
          'BS: C = S·N(d₁) − K·e^{−rT}·N(d₂); N(d₂) = risk-neutral P(ITM)',
          'Parity: C − P = S − K·e^{−rT} — violations are arbitrage',
          'IV smile/skew = the market\'s vote that BS assumptions are false',
        ],
      },
    ],
    diagram: {
      title: 'Payoff zoo: the six core shapes',
      caption: 'Hockey sticks at expiry for spreads, straddle, strangle and butterfly — each encodes a direction × volatility view.',
        svg: `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Option strategy payoffs">
  <g font-family="inherit" font-size="10">
    <rect x="16" y="12" width="224" height="112" fill="#f8fafc" rx="8"/>
    <text x="128" y="28" fill="#334155" font-weight="600" text-anchor="middle">bull call spread</text>
    <line x1="40" y1="80" x2="100" y2="80" stroke="#16a34a" stroke-width="2.5"/>
    <line x1="100" y1="80" x2="180" y2="40" stroke="#16a34a" stroke-width="2.5"/>
    <line x1="180" y1="40" x2="216" y2="40" stroke="#16a34a" stroke-width="2.5"/>
    <line x1="40" y1="90" x2="216" y2="90" stroke="#94a3b8" stroke-width="1"/>
    <text x="70" y="104" fill="#475569">max loss = net premium</text>
    <rect x="248" y="12" width="224" height="112" fill="#f8fafc" rx="8"/>
    <text x="360" y="28" fill="#334155" font-weight="600" text-anchor="middle">straddle (long)</text>
    <line x1="290" y1="50" x2="360" y2="90" stroke="#7c3aed" stroke-width="2.5"/>
    <line x1="360" y1="90" x2="430" y2="50" stroke="#7c3aed" stroke-width="2.5"/>
    <line x1="272" y1="90" x2="448" y2="90" stroke="#94a3b8" stroke-width="1"/>
    <text x="300" y="106" fill="#475569">breakevens K ± premium</text>
    <rect x="480" y="12" width="224" height="112" fill="#f8fafc" rx="8"/>
    <text x="592" y="28" fill="#334155" font-weight="600" text-anchor="middle">strangle (long)</text>
    <line x1="520" y1="60" x2="560" y2="90" stroke="#ea580c" stroke-width="2.5"/>
    <line x1="560" y1="90" x2="624" y2="90" stroke="#ea580c" stroke-width="2.5"/>
    <line x1="624" y1="90" x2="664" y2="60" stroke="#ea580c" stroke-width="2.5"/>
    <line x1="504" y1="90" x2="680" y2="90" stroke="#94a3b8" stroke-width="1"/>
    <text x="524" y="106" fill="#475569">cheaper, needs bigger move</text>
    <rect x="16" y="136" width="224" height="112" fill="#f8fafc" rx="8"/>
    <text x="128" y="152" fill="#334155" font-weight="600" text-anchor="middle">butterfly (long)</text>
    <line x1="40" y1="70" x2="80" y2="70" stroke="#0891b2" stroke-width="2.5" transform="translate(0,90)"/>
    <line x1="80" y1="160" x2="128" y2="196" stroke="#0891b2" stroke-width="2.5"/>
    <line x1="128" y1="196" x2="176" y2="160" stroke="#0891b2" stroke-width="2.5"/>
    <line x1="176" y1="160" x2="216" y2="160" stroke="#0891b2" stroke-width="2.5"/>
    <line x1="40" y1="216" x2="216" y2="216" stroke="#94a3b8" stroke-width="1"/>
    <text x="60" y="232" fill="#475569">peak profit at K₂, capped risk</text>
    <rect x="248" y="136" width="224" height="112" fill="#f8fafc" rx="8"/>
    <text x="360" y="152" fill="#334155" font-weight="600" text-anchor="middle">long call</text>
    <line x1="300" y1="204" x2="372" y2="204" stroke="#16a34a" stroke-width="2.5"/>
    <line x1="372" y1="204" x2="440" y2="156" stroke="#16a34a" stroke-width="2.5"/>
    <line x1="272" y1="216" x2="448" y2="216" stroke="#94a3b8" stroke-width="1"/>
    <text x="292" y="232" fill="#475569">loss capped at premium</text>
    <rect x="480" y="136" width="224" height="112" fill="#f8fafc" rx="8"/>
    <text x="592" y="152" fill="#334155" font-weight="600" text-anchor="middle">short call (covered/uncovered)</text>
    <line x1="528" y1="196" x2="608" y2="196" stroke="#dc2626" stroke-width="2.5"/>
    <line x1="608" y1="196" x2="676" y2="244" stroke="#dc2626" stroke-width="2.5"/>
    <line x1="504" y1="216" x2="680" y2="216" stroke="#94a3b8" stroke-width="1"/>
    <text x="520" y="186" fill="#475569">premium income, unlimited tail risk</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Black–Scholes call', expr: 'C = S·N(d₁) − K·e^{−rT}·N(d₂)', meaning: 'European call value' },
      { name: 'd₁ / d₂', expr: 'd₁ = [ln(S/K)+(r+σ²/2)T]/(σ√T); d₂ = d₁ − σ√T', meaning: 'The standardized moneyness terms' },
      { name: 'Put–call parity', expr: 'C − P = S − K·e^{−rT}', meaning: 'The four-instrument arbitrage spine' },
      { name: 'Binomial p', expr: 'p = (e^{rΔt} − d)/(u − d), u = e^{σ√Δt}', meaning: 'Risk-neutral probability' },
      { name: 'Strategy breakeven', expr: 'S_T where Σ leg payoffs = Σ premiums', meaning: 'The death-or-glory price' },
    ],
    examples: [
      {
        title: 'Straddle before the verdict',
        given: ['Stock 500; 500-strike call ₹18, put ₹16, 1 month; expected event in 2 weeks'],
        steps: [
          { text: 'Cost', calc: '₹34 per share straddle' },
          { text: 'Breakevens', calc: '500 ± 34 → 466 / 534 — stock must move ±6.8% to profit' },
          { text: 'Post-event', calc: 'Stock jumps to 540: payoff 40 − 34 = +6; implied vol crush usually means the 540-arrived price was PRICED — big moves can still lose if IV was richer' },
          { text: 'Alternative', calc: 'Strangle (480P + 540C for ₹9+₹8 = ₹17) profits beyond 463/557 — cheaper but needs a monster move; strap (2C+1P = 52, breakevens 477/518) for a bullish tilt' },
        ],
        answer: 'Straddle buys MOVEMENT: profit = |S_T − K| − premium − IV-crush; the view is magnitude, not direction.',
      },
      {
        title: 'BS by hand + the Greek hedge',
        given: ['S 1,050, K 1,000, r 7%, σ 18%, T 0.5 (from F06 lecture 8 — compute and hedge)'],
        steps: [
          { text: 'd-terms', calc: 'd₁ = [ln(1.05) + (0.07+0.0162)(0.5)]/(0.18·0.7071) ≈ 0.722; d₂ ≈ 0.595' },
          { text: 'Call', calc: 'C = 1050(0.7649) − 1000·e^{−0.035}(0.7243) ≈ 803.1 − 699.3 ≈ ₹103.8' },
          { text: 'Delta hedge', calc: 'Δ = N(d₁) ≈ 0.765 → short 100 calls ≈ short 76.5 shares; re-hedge as S moves (gamma)' },
          { text: 'Vega', calc: 'S·φ(d₁)·√T ≈ 1050(0.3077)(0.7071) ≈ 229 → +1 vol pt = +₹2.29/option — the silent risk before events' },
        ],
        answer: 'BS prices, delta hedges direction, vega prices volatility — a market-maker\'s day in four formulas.',
      },
    ],
    caseStudy: {
      title: 'Case — The seller of 5-rupee safety: naked OTM writing blow-ups',
      body: [
        'A trader sells deep-OTM weekly index options (delta 0.05) collecting ₹5–8 per lot per week — "small, consistent income". Win rate 92% over 40 weeks; equity curve climbs smoothly.',
        'Week 41: an event gap moves the index 4%; short puts go deep ITM; leverage (margin ~1:8) converts the move into a loss equal to 11 months of premium. Account destroyed (the classic option-seller ruin distribution: many small wins, rare catastrophic loss).',
      ],
      questions: [
        'Why does the 92% win rate tell you nothing about the strategy\'s quality?',
        'Which Greek was actually being sold, and at what price?',
        'Repair the strategy without abandoning premium selling.',
      ],
      takeaways: [
        'Expected value ≠ win rate: P/L distribution matters — short gamma/short vega has negatively skewed payoffs; judge strategies by max loss × frequency, not hit rate',
        'The trader sold gamma and vega (tail insurance) at prices set by IMPLIED vol; if realised crashes exceed implied over time, the trade is +EV — the ruin comes from sizing and leverage, not the concept',
        'Repairs: defined-risk structures (credit SPREADS — the short leg is covered by a further OTM buy), position sizing so the worst week loses ≤2% of capital, no naked shorts around events',
        'Same lesson as futures margins: the payoff tail, not the P&L average, decides survival — risk management is the strategy',
      ],
    },
    revision: [
      'Call/put = right not obligation; writer = obligation, premium income',
      'Premium = intrinsic + time; theta decays, fastest ATM near expiry',
      'Bull call / bear put spreads: capped cost, capped gain — moderate views',
      'Butterfly: sell movement around K₂; straddle: buy big move; strangle: cheaper, bigger move needed',
      'Strip 2P+1C (bearish tilt); strap 2C+1P (bullish tilt)',
      'Δ hedge ratio ≈ P(ITM); Γ re-hedge rate; Θ decay; vega per vol point; rho rates',
      'Binomial: u = e^{σ√dt}, p = (e^{rdt}−d)/(u−d), roll back; handles American',
      'BS assumptions (const σ, lognormal) → IV smile/skew exists',
      'Parity: C − P = S − K·e^{−rT}',
      'Short-vol payoffs are negatively skewed — size for the tail',
    ],
    practice: [
      { q: 'Buy 100-strike call ₹6, sell 110-strike call ₹2. Max profit, max loss, breakeven?', a: 'Bull call spread: cost 4 → max loss 4; max profit (110−100)−4 = 6; breakeven 104. View: bullish, willing to cap gains above 110 for a cheaper entry.' },
      { q: 'Why is an ATM option\'s delta ≈ 0.5 but its gamma highest near expiry?', a: '0.5 = coin-flip odds of finishing ITM; gamma measures how FAST that delta shifts with S — near expiry, the ITM/OTM boundary sharpens, so tiny spot moves flip delta violently. Gamma hedging costs are why expiry weeks are wild.' },
      { q: 'Implied vol is 28%, you expect realised 20%. Which trade and which risk?', a: 'Sell vega: short strangle/credit spreads (or buy butterfly). Risks: negatively skewed payoffs, short gamma, vol spikes on events — size small, avoid naked shorts around catalysts, define max loss with spreads.' },
      { q: 'Stock at Rs 500. Buy the 500 call for Rs 18 and the 500 put for Rs 15. Breakevens and the bet?', a: 'Straddle costs Rs 33 - breakevens 467 and 533. You profit only if the stock moves beyond that band by expiry: a volatility bet, not a direction bet.' },
      { q: 'Your portfolio delta is -400. What does that mean and how do you neutralise it with stock?', a: 'A Re 1 rise in the underlying loses Rs 400. Buy 400 shares (delta 1 each) to flatten to zero - delta hedging is share-count arithmetic.' },
    ],
  },
  {
    slug: 'swaps-interest-rate-derivatives',
    number: 4,
    title: 'Swaps & Interest-Rate Derivatives: IRS, Currency Swaps, IRF, FRAs',
    minutes: 45,
    summary:
      'Interest-rate swap mechanics and valuation, currency swaps, interest-rate futures and bond/T-bill futures on Indian exchanges, forward rate agreements, and how corporates convert liability structures.',
    status: 'live',
    objectives: [
      'Structure a plain-vanilla IRS and value it mid-life',
      'Distinguish currency swap from IRS and from a series of forwards',
      'Price an FRA and settle it in cash',
      'Hedge a floating-rate loan with IRS/IRF and quantify the fix',
    ],
    sections: [
      {
        heading: '1. Interest-rate swaps and FRAs',
        body: [
          '**Plain-vanilla IRS**: exchange fixed for floating on a notional (never exchanged) — net-settled periodically on MIFOR/MCLR/repo-linked resets (once MIFOR; now generally benchmarked to TREPS/MIBOR/MIFOR variants and the shifted to alternate reference rates). A company paying floating (repo + 250 bps) enters a pay-fixed swap: converts a variable liability to a fixed one — synthetic fixed-rate debt without refinancing. **Valuation mid-life**: an IRS = a portfolio of FRAs; value = PV(fixed leg) − PV(float leg), where the float leg (just after a reset) values at par — so swap value ≈ fixed-bond value minus notional-par. If rates rise after you pay fixed, your swap shows a gain (you\'d lock today\'s higher fixed).',
          '**FRA (forward rate agreement)**: OTC, cash-settled bet on a specific future LIBOR-era/now MIBOR-style rate for a 3/6-month period (e.g., 3×9 FRA fixes the 6-month rate starting in 3 months). Settlement at the rate-fixing date: (Reference − FRA rate) × notional × period, discounted — paid to the party hurt by the rise if it borrowed. Pricing: FRA rate = implied forward from the spot curve — (1+r_L)^(T_L) = (1+r_S)^(T_S)(1+f)^(T_L−T_S). Banks quote FRAs to hedge loan resets; corporates use them to cap a refinancing window.',
        ],
        callout: {
          type: 'exam',
          text: 'Two memorised structures: (1) IRS = exchange fixed↔floating on notional, net settled; value = ΣPV(fixed) − PV(float) and the float leg ≈ par at reset — so a pay-fixed swap gains when rates RISE. (2) Currency swap = exchange PRINCIPALS at start/end + interest in two currencies — compare to a series of forwards: forwards hedge flows separately at forward rates; the swap locks ONE fixed rate and re-exchanges principals — credit-efficient, bespoke, ISDA-documented.',
        },
      },
      {
        heading: '2. Currency swaps and exchange-traded rate products',
        body: [
          '**Currency swap**: parties exchange principal in two currencies at inception (at spot), pay each other\'s interest, re-exchange at the ORIGINAL rate at maturity — a synthetic foreign-currency borrowing. Use: an Indian AAA raises cheap dollars, swaps into rupees for a project (or vice versa); matches F05\'s financing instruments. Versus **IRS**: no principal exchange in IRS; versus **forwards**: one structure covers all periods and principal, at a single locked rate with netting (credit-efficient).',
          '**Exchange-traded rate products in India**: **Interest-rate futures** on 10Y G-sec (NSE/BSE, cash-settled, 91-day T-bill futures history) — hedging duration: DV01 logic (price change per 1bp) — bond price falls when yields rise; a bank holding G-secs sells IRF to hedge duration (or uses OTC G-sec forwards). **Overnight index swaps (OIS)** swap fixed vs overnight MIBOR-compounded — the short-end standard. Corporate playbook: floating loan + pay-fixed IRS = certain cost; fixed assets funded floating + asset-swap; refinancing window + FRA; bond portfolio + IRF/DV01 hedge. The treasury desk manages the resulting net Greek (delta/duration) book — the rate-market mirror of equity options desks.',
        ],
        bullets: [
          'IRS: notional never exchanged; net cash flows; pay-fixed gains when rates rise',
          'Value mid-life = PV(fixed leg) − PV(float leg); float ≈ par at reset',
          'FRA: cash-settled forward on a period rate; priced off the spot curve',
          'Currency swap: principals exchanged at start/end + interest both ways',
          'IRF on 10Y G-sec: duration hedge via DV01',
          'OIS: fixed vs overnight — the short-end swap standard',
          'Floating→fixed = pay-fixed IRS; fixed→floating = receive-fixed',
        ],
      },
    ],
    diagram: {
      title: 'The swap family on one page',
      caption: 'IRS exchanges interest streams on one currency; the currency swap exchanges principals and interest across two — both net-settled, both ISDA-governed.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Swap structures">
  <defs><marker id="sa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="20" width="320" height="190" rx="12" fill="#f8fafc"/>
    <text x="180" y="42" fill="#334155" font-weight="600">INTEREST-RATE SWAP</text>
    <rect x="48" y="66" width="110" height="46" rx="9" fill="#e0f2fe"/><text x="103" y="86" fill="#0c4a6e">Company A</text><text x="103" y="100" fill="#075985">pays FIXED 7%</text>
    <rect x="202" y="66" width="110" height="46" rx="9" fill="#dcfce7"/><text x="257" y="86" fill="#14532d">Bank B</text><text x="257" y="100" fill="#166534">pays FLOATING</text>
    <line x1="158" y1="82" x2="200" y2="82" stroke="#475569" stroke-width="1.6" marker-end="url(#sa)"/>
    <line x1="202" y1="96" x2="160" y2="96" stroke="#475569" stroke-width="1.6" marker-end="url(#sa)"/>
    <text x="180" y="140" fill="#475569">notional ₹500 cr — NEVER exchanged</text>
    <text x="180" y="160" fill="#475569">net settlement each period</text>
    <text x="180" y="184" fill="#7c2d12">A converts its floating loan to fixed</text>
    <rect x="380" y="20" width="320" height="190" rx="12" fill="#f8fafc"/>
    <text x="540" y="42" fill="#334155" font-weight="600">CURRENCY SWAP</text>
    <rect x="408" y="66" width="110" height="46" rx="9" fill="#e0f2fe"/><text x="463" y="86" fill="#0c4a6e">Indian co.</text><text x="463" y="100" fill="#075985">₹ interest</text>
    <rect x="562" y="66" width="110" height="46" rx="9" fill="#dcfce7"/><text x="617" y="86" fill="#14532d">Foreign co.</text><text x="617" y="100" fill="#166534">$ interest</text>
    <line x1="518" y1="82" x2="560" y2="82" stroke="#475569" stroke-width="1.6" marker-end="url(#sa)"/>
    <line x1="562" y1="96" x2="520" y2="96" stroke="#475569" stroke-width="1.6" marker-end="url(#sa)"/>
    <text x="540" y="136" fill="#475569">principals exchanged at start ($ spot)</text>
    <text x="540" y="156" fill="#475569">re-exchanged at ORIGINAL rate at maturity</text>
    <text x="540" y="184" fill="#7c2d12">synthetic ₹ borrowing from $ funds</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'IRS value', expr: 'V = PV(fixed leg) − PV(float leg); float ≈ par at reset', meaning: 'Mid-life mark' },
      { name: 'FRA settlement', expr: '(Ref − FRA) × notional × t, discounted to fixing date', meaning: 'Cash settlement' },
      { name: 'Implied forward rate', expr: '(1+r_L)^{T_L} = (1+r_S)^{T_S}·(1+f)^{T_L−T_S}', meaning: 'FRA pricing from curve' },
      { name: 'DV01 hedge', expr: 'Hedge units = Bond DV01 / Futures DV01', meaning: 'Duration-neutral book' },
    ],
    examples: [
      {
        title: 'Convert a floating loan to fixed',
        given: ['₹500 cr loan at overnight-repo-linked (current all-in 8.4%); treasury fears +100 bps in a year; 5-yr pay-fixed IRS quoted 7.3%'],
        steps: [
          { text: 'Structure', calc: 'Pay bank fixed 7.3% on ₹500 cr; receive floating (same repo benchmark); loan + swap: floating out + fixed net = synthetic 7.3% + 110 bps spread ≈ 8.4% FIXED' },
          { text: 'If rates rise 150 bps', calc: 'Loan cost 9.9%; swap pays you (floating 9.05% − 7.3%) ≈ +1.75% → net stays ~8.4% — insured' },
          { text: 'If rates FALL 100 bps', calc: 'Loan 6.9%; swap costs (7.3% − 7.05%) ≈ 0.25% → net ~8.15%+spread — you still pay ~8.4%: insurance has a price' },
            { text: 'Mark-to-market', calc: 'Rates +150 bps → the pay-fixed swap is IN THE MONEY: the fixed 7.3% you pay is now below market — value = PV(fixed@7.3%) − PV(float@par) > 0, an asset on the books' },
        ],
        answer: 'The swap converts uncertainty into certainty at the cost of the floating path — treasury decides which risk it is paid to hold.',
      },
      {
        title: 'FRA for a refinancing window',
        given: ['Company must roll ₹100 cr at 6-month MIBOR in 3 months; fears the roll rate; 3×9 FRA quoted 7.2%; at fixing the 6-month rate prints 7.9%'],
        steps: [
          { text: 'Position', calc: 'BUY the FRA (pay fixed 7.2%, receive reference) — hedges a future BORROWING' },
          { text: 'Settlement', calc: '(7.9% − 7.2%) × 100 cr × 0.5 = ₹35L received at fixing (discounted slightly for early payment)' },
          { text: 'Net', calc: 'Borrow at 7.9% − 0.35 compensation = 7.2% effective: the hedge worked before the loan even started' },
          { text: 'If rates FELL to 6.8%', calc: 'Pay (6.8−7.2)×0.5 = ₹20L; borrow at 6.8 + 0.2 cost = 7.2% — symmetric lock' },
        ],
        answer: 'An FRA is a one-period swap: cash-settled, curve-priced, perfect for a dated exposure window.',
      },
    ],
    caseStudy: {
      title: 'Case — The ill-timed fix: swapping at the trough',
      body: [
        'A housing-finance company funds itself with 1-year repo-linked borrowings and lends 15-year fixed mortgages — a structural short-duration-liability/long-duration-asset mismatch. In a falling-rate era it earns fat margins and decides NOT to pay-fixed ("floating is cheap").',
        'The cycle turns: policy rates +300 bps over 18 months. Funding reprices within months while mortgage book yields are locked for years; NIM collapses and MTM losses on the bond book add to the pain. A belated pay-fixed swap at peak rates locked the worst level; recapitalisation follows.',
      ],
      questions: [
        'Diagnose the two risks the ALCO failed to separate.',
        'What hedge structure fit the mismatch?',
        'When should the swap have been done, and how does one avoid fixing at the top?',
      ],
      takeaways: [
        'Rate risk on FUNDING (repricing gap) and duration risk on ASSETS (bond book) are different exposures needing different hedges: pay-fixed swaps for the former, IRF/DV01 for the latter',
        'Fit: swap a PORTION of floating funding to fixed so that asset-liability repricing buckets roughly match — not all-or-nothing; layered/laddered swaps average the fix rate',
        'Fixing at the top is avoided by policy: hedge ratios decided by ALM gap limits in advance, not by rate views under stress — hedging is insurance, not forecasting',
        'Exam line: the matcher of durations is the swap/IRF family; the lesson is that timing risk belongs to policy, not to the treasurer\'s instinct',
      ],
    },
    revision: [
      'IRS: exchange fixed↔floating, notional untouched, net settlement',
      'Pay-fixed = synthetic fixed borrower; gains when rates rise (V>0)',
      'V(IRS) = PV(fixed) − PV(float); float leg ≈ par just after reset',
      'FRA: one-period rate lock; settled (Ref − FRA)×notional×t at fixing',
      'Forward rate from curve: (1+r_L)^{TL} chain',
      'Currency swap: principals exchanged at start, re-exchanged at original FX rate',
      'Currency swap vs forwards: single rate, netting, credit-efficient',
      'IRF 10Y G-sec: duration hedge, DV01 matching',
      'OIS: overnight-compounded floating leg — short-end standard',
    ],
    practice: [
      { q: 'You will RECEIVE 6-month floating on ₹50 cr from month 6. FRA action?', a: 'SELL the 6×12 FRA (receive fixed, pay reference): if rates fall below the FRA rate you collect the difference — locking the receivable rate symmetric to a borrower\'s buy.' },
      { q: 'Why is the float leg of a swap valued at par just after a reset?', a: 'Immediately after setting, the floating leg pays the then-market rate each period — a bond resetting to market always trades at par; hence swap value collapses to the fixed leg vs par.' },
      { q: 'A bank holds ₹800 cr G-secs, DV01 ₹7L/bp. It fears a 40 bp rise. IRF trade?', a: 'Sell IRFs to neutralise duration: contracts = bond DV01/futures DV01 ≈ 7L/2,300 (typical 10Y IRF DV01 per ₹2L notional ≈ ₹85–90; compute with the live contract) — sell enough to offset ₹7L/bp; the basis between CTD bond and portfolio is residual risk.' },
      { q: 'Why do two companies with equal borrowing appetite still swap?', a: 'Comparative advantage in fixed versus floating markets leaves a total saving on the table; splitting it via a swap leaves both cheaper than borrowing straight - the classic swap motivation example.' },
      { q: 'A treasurer must lock a borrowing rate for money needed in 6 months. FRA 6x12 quotes 7.2/7.5. What is agreed?', a: 'Buy the FRA at the offer 7.5 percent. At settlement, if the reference rate fixes above 7.5 the bank pays the difference on the notional - effectively borrowing at 7.5 whatever happens.' },
    ],
  },
  {
    slug: 'credit-exotic-derivatives',
    number: 5,
    title: 'Credit & Other Derivatives: CDS, TRS, CDOs, Weather & Energy',
    minutes: 40,
    summary:
      'Credit default swaps and their settlement, total return swaps, CDS options and forwards, the CDO securitisation machine and its 2008 verdict, and the beyond-finance frontier — weather, energy and event derivatives.',
    status: 'live',
    objectives: [
      'Explain CDS mechanics, premium and settlement (physical/cash/auction)',
      'Contrast TRS as synthetic ownership',
      'Describe CDO tranching and waterfall risk transfer',
      'Survey weather/energy/event derivatives and their users',
    ],
    sections: [
      {
        heading: '1. The credit derivative family',
        body: [
          '**CDS (credit default swap)**: insurance-like protection on a reference entity — buyer pays a running premium (in bps on notional); seller pays on a **credit event** (bankruptcy, failure to pay, obligation acceleration/restructuring per ISDA definitions). Settlement: physical (deliver any deliverable obligation, receive par — deprecated), **cash** (par − recovery), or **auction-settled** (industry auction fixes recovery). CDS = short credit: naked CDS speculation on default; hedged CDS by bondholders. Premium quotes IS the market-implied default probability strip: roughly CDS spread ≈ annual default probability × (1 − recovery) — a 400 bp quote on 40% recovery ≈ 6.7% annual default hazard. India: corporate CDS is dormant (limited ISDA participation); credit risk transfers via **CRMs** (credit default swaps under RBI 2022 framework, guarantees, credit-enhancement) — know the global instrument, the Indian plumbing.',
          '**Total return swap (TRS)**: exchange the TOTAL return of an asset (coupons + price change) for a funding rate (MIBOR + spread) — synthetic ownership/leverage without buying: the TRS buyer is long the bond economically; the seller earns spread on their balance sheet. Used by funds to gain exposure to assets they can\'t hold (foreign bonds, restricted names) and by banks to shed exposure temporarily. **CDS forwards and options**: forwards on future CDS spread; payer/receiver swaptions on credit — volatility of credit itself traded. **ISDA documentation** governs the family; the 2014/2020 credit-derivative determinations committees decide what counts as a credit event (the Pnote/EM saga cases).',
        ],
        callout: {
          type: 'exam',
          text: 'CDS in one table: buyer pays premium (spread × notional × time), seller pays [Notional × (1 − Recovery)] on credit event. Settlement: physical (deliver bonds, get par) / cash (pay difference) / auction (post-2008 standard). TRS differs: NO default trigger needed — the TOTAL-RETURN leg pays for price DECLINES too, like owning the asset; CDS pays only on credit events. That distinction is a favourite exam contrast.',
        },
      },
      {
        heading: '2. CDOs and the frontier: weather, energy, events',
        body: [
          '**CDO (collateralised debt obligation)**: securitisation machinery — a pool of loans/bonds/CDS (synthetic CDO) is tranched: **senior (AAA)**, **mezzanine**, **equity/junior**; interest waterfall pays senior first; losses hit equity first. Tranching ≠ diversification magic: correlation drives mezzanine risk — the 2008 failure was CDO² and Gaussian-copula mispricing of correlated housing defaults (senior tranches rated AAA carried far more systematic risk than ratings implied; LGD and correlation were tail-wrong). Post-crisis: skin-in-the-game rules, risk-retention, ratings reform; India\'s version: loan securitisation (priority-sector loan (PSL) securitisation pass-through certificates — RBI rules; large corporate loan pools).',
          '**Beyond finance**: **weather derivatives** — HDD/CDD (heating/cooling degree-day) swaps and options: pay on temperature deviations from strike; users — power utilities (warm winter = low demand), agri (monsoon indices in India: rainfall-indexed insurance), beverages (cool summer hurts colas). **Energy derivatives** — the deepest commodity complex: WTI/Brent/Henry Hub futures, spark spreads (power vs gas), locational spreads; Indian MCX crude/gas contracts; users hedge input costs (airlines — jet fuel crack spreads) and producers hedge output. **Event/exotic**: cat bonds (insurance-linked: investors take earthquake/hurricane loss for high coupon), pandemics, elections-outcome markets, GDP-linked bonds (Argentina), inflation swaps (CPI-leg — now standard in treasury). The frontier is the same pricing logic as F03 everywhere: identify the underlying, the payoff, and who naturally holds the opposite risk.',
        ],
        bullets: [
          'CDS = premium for protection; pays LGD = notional × (1−recovery)',
          'Settlement: auction standard post-2008; physical/cash variants',
          'CDS spread ≈ PD × (1−R): 400bp at 40% recovery ≈ 6.7% hazard',
          'TRS = synthetic ownership: total return vs funding rate, no trigger needed',
          'CDO: waterfall tranches; correlation kills mezzanine; 2008 = copula + ratings failure',
          'India: PSL securitisation PTCs, RBI CRM framework; CDS market thin',
          'Weather: HDD/CDD, monsoon indices · Energy: crude/gas/power spreads · Cat bonds, inflation swaps',
        ],
      },
    ],
    diagram: {
      title: 'CDO waterfall: who loses first',
      caption: 'Losses climb from equity to senior; interest flows the opposite way. Tranching reallocates, never reduces, total risk.',
      svg: `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CDO tranche waterfall">
  <defs><marker id="ca" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#991b1b"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="60" y="30" width="600" height="50" rx="8" fill="#dcfce7"/><text x="360" y="50" fill="#14532d" font-weight="600">SENIOR AAA (say 80% of pool)</text><text x="360" y="66" fill="#166534">last to lose · lowest coupon</text>
    <rect x="60" y="95" width="600" height="50" rx="8" fill="#fef9c3"/><text x="360" y="115" fill="#713f12" font-weight="600">MEZZANINE A/BBB (say 15%)</text><text x="360" y="131" fill="#a16207">correlation-sensitive — the 2008 landmine</text>
    <rect x="60" y="160" width="600" height="50" rx="8" fill="#fee2e2"/><text x="360" y="180" fill="#7f1d1d" font-weight="600">EQUITY / FIRST-LOSS (say 5%)</text><text x="360" y="196" fill="#991b1b">first rupee of loss · highest yield</text>
    <line x1="46" y1="185" x2="46" y2="55" stroke="#991b1b" stroke-width="2" marker-end="url(#ca)"/>
    <text x="30" y="130" fill="#991b1b" transform="rotate(-90 30 130)" font-size="10">losses climb</text>
    <line x1="678" y1="55" x2="678" y2="185" stroke="#16a34a" stroke-width="2"/>
    <text x="696" y="130" fill="#14532d" transform="rotate(90 696 130)" font-size="10">interest waterfall: senior paid first</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'CDS payoff', expr: 'Payout = Notional × (1 − Recovery)', meaning: 'Loss-given-default transfer' },
      { name: 'CDS spread ≈ hazard', expr: 'Spread ≈ PD_per_year × (1 − R)', meaning: 'Default-probability reading' },
      { name: 'TRS legs', expr: 'Buyer receives TR(asset) − funding spread', meaning: 'Synthetic ownership carry' },
      { name: 'Tranche loss', expr: 'Loss hits [0, equity] first, then mezzanine cap', meaning: 'Waterfall attachment/detachment' },
    ],
    examples: [
      {
        title: 'Read a CDS quote as a default probability',
        given: ['5-yr CDS on a corporate: 420 bps; recovery assumption 40%; ₹50 cr bond holding'],
        steps: [
          { text: 'Implied hazard', calc: 'PD ≈ 4.2%/(1 − 0.40) = 7.0% per year' },
          { text: 'Cumulative', calc: '5-yr survival ≈ (0.93)⁵ ≈ 69.6% → ~30% chance of default over 5 years (approximation ignoring curve shape)' },
          { text: 'Hedge', calc: 'Buy ₹50 cr protection: cost 21L/yr; on event receive 50 cr × 60% = ₹3 cr — bond loss largely offset' },
          { text: 'Basis check', calc: 'If the bond yields 9.5% while funding is 7%, the cash bond is CHEAPER than CDS-implied (negative basis) — basis traders buy bond + CDS protection for near-arbitrage' },
        ],
        answer: 'CDS turns credit into a price: 420 bps is the market\'s 7% hazard quote — the bond analyst\'s Rosetta stone.',
      },
      {
        title: 'Structure a small CDO and locate the landmine',
        given: ['₹1,000 cr pool; tranches: equity 5%, mezzanine 15% (8% coupon), senior 80% (6%); pool yield 9%'],
        steps: [
          { text: 'No-loss world', calc: 'Pool earns 90 cr; senior 48 + mezz 12 + equity residual 30 cr → equity earns 60% on 50 cr — the first-loss premium' },
          { text: 'Loss scenario 6%', calc: '60 cr losses: equity 50 cr wiped, mezzanine absorbs 10 cr (its notional falls to 140 cr) — senior untouched' },
          { text: 'Correlation scenario', calc: 'If defaults are CORRELATED (crisis), losses hit 12% = 120 cr: equity + most of mezzanine gone; senior now thin — the rating agencies\' independent-defaults assumption was the 2008 error' },
          { text: 'Design lesson', calc: 'Tranche thickness and correlation assumptions decide everything; demand loss data by scenario, not just the waterfall in the base case' },
        ],
        answer: 'Waterfalls shift who dies first; correlation decides how many die together — price both.',
      },
    ],
    caseStudy: {
      title: 'Case — 2008: the instrument that failed its assumptions',
      body: [
        'Synthetic CDOs and CDO² packaged mortgage CDS into rated tranches. The Gaussian-copula correlation (calibrated on a boom period) priced senior tranches as near-riskless; ratings agencies stamped AAA; insurers (AIG) wrote protection with insufficient collateral. Housing fell nationally — defaults were far MORE correlated than the model — AAA tranches wrote down; AIG\'s CDS book required a government bailout; Lehman\'s default triggered CDS auction settlements that the auction mechanism (just introduced) barely survived.',
      ],
      questions: [
        'Which assumption — recovery, correlation, or liquidity — did the most damage?',
        'What did naked CDS positions contribute?',
        'Which reforms addressed each failure?',
      ],
      takeaways: [
        'Correlation was the killer: tranching assumes imperfectly correlated defaults; a nationwide housing bust turned senior tranches into concentrated systematic risk — model risk at civilisational scale',
        'Naked CDS let traders short names synthetically beyond the outstanding bonds — the "side bet" multiplier that amplified losses and forced the EU ban on sovereign naked CDS (2012)',
        'Reforms: central clearing for standardised CDS, auction settlement, trade reporting, risk-retention (skin in the game), ratings regulation — moving OTC credit toward the ETD playbook of Unit 1',
        'The exam-closing line: derivatives transfer risk; models DECIDE who bears it — when the model is wrong, the transfer was a mirage',
      ],
    },
    revision: [
      'CDS: premium (bps) vs payout Notional×(1−R) on credit event',
      'Credit events: bankruptcy, failure to pay, restructuring (ISDA)',
      'Settlement: auction (standard), physical (deliver for par), cash',
      'Spread ≈ PD × (1−R); basis trades bond vs CDS',
      'TRS: total return vs funding — synthetic ownership, no trigger needed',
      'CDS options/forwards trade the volatility of credit',
      'CDO: waterfall tranches (senior/mezz/equity); correlation = mezzanine landmine',
      '2008: copula correlation, ratings, AIG counterparty, naked shorts',
      'India: RBI CRM framework, PSL securitisation; CDS thin',
      'Weather HDD/CDD & monsoon · energy crack/spark spreads · cat bonds · inflation swaps',
    ],
    practice: [
      { q: 'Bondholder vs naked CDS buyer — same trade, what differs morally and economically?', a: 'Bondholder hedging owns the exposure (insurable interest); the naked buyer is speculating on default — economically both add pricing information, but naked positions multiply gross exposure beyond the bonds outstanding (the 2012 EU ban rationale). India restricts CDS to hedging/risk-transfer uses.' },
      { q: 'TRS buyer on a falling bond: what happens and why is it NOT a default claim?', a: 'Price decline flows through the total-return leg — buyer pays funding + the price loss to the seller (negative carry). No credit event needed: TRS is synthetic OWNERSHIP; CDS needs a trigger event. Same bond, two different contracts.' },
      { q: 'An airline wants to cap FY fuel cost. Which instrument and what is the hedge ratio logic?', a: 'Buy crude calls or collar (long call, short call/collar to cap) on MCX/Brent proxy: hedge ratio = annual consumption in barrels ÷ contract size, adjusted by jet-fuel crack correlation (~0.95 to crude); leave 10–15% basis unhedged or hedge the crack separately.' },
      { q: 'A 5-year Rs 10 crore CDS trades at 300 basis points. Who pays whom, and when does money move?', a: 'The protection buyer pays Rs 30 lakh a year to the seller; nothing else moves unless the reference entity defaults, when the seller pays face minus recovery. It is tradable insurance priced in spread.' },
      { q: 'Name one weather derivative structure and the business that would buy it.', a: 'A HDD call pays per degree-day below a winter threshold - a power utility hedges a warm winter compressing heating demand. Payouts index to weather station data, not to loss.' },
    ],
  },
];
