import type { Lecture } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM F05 — International Financial Management
   Unit-wise lectures: intl financial system → FX markets →
   exposure & hedging → foreign investment → foreign operations
   ═══════════════════════════════════════════════════════════════ */

export const internationalFinanceLectures: Lecture[] = [
  {
    slug: 'international-financial-system',
    number: 1,
    title: 'The International Financial System: Bretton Woods to Today',
    minutes: 40,
    summary:
      'The monetary system\'s evolution — gold standard, Bretton Woods, the 1971 break and floating — the IMF\'s activities and quotas, exchange-rate regimes, the European Monetary System and euro, and how FX movements drive trade and capital flows.',
    status: 'live',
    objectives: [
      'Trace the system: gold standard → Bretton Woods → floats',
      'Explain IMF roles, quotas, SDRs and conditionality',
      'Classify exchange-rate regimes and India\'s position',
      'Connect exchange-rate moves to trade and capital flows',
    ],
    sections: [
      {
        heading: '1. From gold to floats',
        body: [
          '**Gold standard** (1870s–1914): currencies fixed to gold at mint par; adjustment via price–specie flows — elegant, but subordinated domestic policy to external balance. Inter-war chaos → **Bretton Woods (1944)**: dollar pegged to gold at $35/oz, all else pegged to dollar (adjustable pegs); the **IMF** created to lend to deficit countries and police the system; the World Bank for reconstruction. Triffin dilemma (dollar liquidity vs confidence) → **1971 Nixon closes the gold window** → Smithsonian attempt → **1973 generalised floating** — the world most of this syllabus lives in. Plaza (1985) and Louvre accords mark coordinated intervention eras.',
          '**Regimes**: hard peg (currency board, dollarisation/euro-isation), soft peg (fixed but adjustable, crawling peg/band — China\'s managed float, earlier India), and **free float** with the impossible trinity governing all: fixed rate + free capital flows + independent monetary policy — pick TWO. India: a **managed float** (RBI intervenes to smooth volatility, no target level) with progressively freer capital flows — the rupee floats but is "managed" via FX reserves (~$600bn+ era) and occasional NDF-signal operations. The European arc: EMS (1979, ECU + exchange-rate mechanism) → Maastricht 1992 → **euro 1999/2002**: the ultimate fixed regime — one money, one ECB, surrendered national monetary policy.',
        ],
        callout: {
          type: 'exam',
          text: 'The impossible trinity (Mundell): you cannot have (1) a fixed exchange rate, (2) free capital mobility, and (3) autonomous monetary policy. China historically chose 1+3 (capital controls); Hong Kong 1+2 (currency board imports US policy); India floats (2+3, intervention to smooth); the euro zone is the 1+2 extreme taken to one currency. Every regime question resolves to this triangle.',
        },
      },
      {
        heading: '2. IMF, and how FX moves hit trade and flows',
        body: [
          '**IMF**: quota-based capital subscriptions (voting power roughly quota-proportional — the governance critique); **lends** for balance-of-payments support with **conditionality** (structural programmes; Asian-crisis 1997 critique of austerity-forcing), **Surveillance** (Article IV consultations), **SDRs** (reserve asset, basket USD/EUR/JPY/GBP/CNY); crisis facilities (EFF, SBA, FCL). Post-2008/2020 roles: SDR allocations ($650bn 2021) and pandemic lines. India 1991 — the BoP crisis, IMF loan, rupee devaluation, gold airlift — the pivot to liberalisation (links PGDM 302 L2).',
          '**FX and flows**: depreciation makes exports cheaper/imports dearer in foreign currency — BUT pass-through and elasticities decide (J-curve: trade balance worsens first, improves later — Marshall–Lerner condition: sum of export+import demand elasticities > 1). **Capital flows**: rate differentials and expectations drive portfolio flows (carry trades); currency expectations affect FDI and FPI timing; sudden stops reverse everything (2013 taper tantrum — the Fragile Five with India; defence: reserves, FCNR(B) swaps). For a finance major: every offshore instrument (ADR, masala bond, FCCB — Unit 5) is a bet on this system\'s plumbing.',
        ],
        bullets: [
          'Bretton Woods: $35/oz gold, dollar pegs, adjustable; died 1971 (Triffin)',
          'IMF: quotas, voting, lending + conditionality, surveillance, SDR basket',
          'Regimes: hard peg / soft peg / managed float / free float',
          'Impossible trinity: fixed + free flows + autonomy — choose two',
          'Euro = monetary union without fiscal union (the 2012 fault line)',
          'J-curve + Marshall–Lerner condition the trade-response theory',
          'Sudden stops & taper tantrum: reserves and swap lines are the defence',
        ],
      },
    ],
    diagram: {
      title: 'The impossible trinity',
      caption: 'A country can anchor any two corners — never all three. Every regime choice, including India\'s managed float, sits on this triangle.',
      svg: `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Impossible trinity triangle">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <polygon points="360,30 130,200 590,200" fill="none" stroke="#475569" stroke-width="2"/>
    <rect x="280" y="14" width="160" height="34" rx="9" fill="#e0f2fe"/><text x="360" y="36" fill="#0c4a6e" font-weight="600">Fixed rate</text>
    <rect x="30" y="184" width="200" height="34" rx="9" fill="#dcfce7"/><text x="130" y="206" fill="#14532d" font-weight="600">Free capital flows</text>
    <rect x="490" y="184" width="200" height="34" rx="9" fill="#fef9c3"/><text x="590" y="206" fill="#713f12" font-weight="600">Monetary autonomy</text>
    <circle cx="245" cy="115" r="8" fill="#7c3aed"/><text x="258" y="112" fill="#4c1d95" font-weight="600">China (pre-reform)</text><text x="258" y="126" fill="#5b21b6">fixed + autonomy, controls</text>
    <circle cx="475" cy="115" r="8" fill="#ea580c"/><text x="462" y="112" fill="#9a3412" font-weight="600">Hong Kong</text><text x="462" y="126" fill="#c2410c">fixed + flows (imports policy)</text>
    <circle cx="360" cy="196" r="8" fill="#16a34a"/><text x="360" y="232" fill="#14532d" font-weight="600">India: managed float — flows + autonomy</text>
    <text x="360" y="252" fill="#475569">move toward one corner and you must give up another</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Real exchange rate', expr: 'RER = e·P*/P (₹ per $ × US price / India price)', meaning: 'Competitiveness measure' },
      { name: 'Marshall–Lerner', expr: '|εx| + |εm| > 1 → depreciation improves trade', meaning: 'J-curve condition' },
      { name: 'Effective depreciation', expr: 'NEER/REER = trade-weighted currency index', meaning: 'Overall competitiveness' },
    ],
    examples: [
      {
        title: 'Does depreciation fix the trade balance?',
        given: ['₹ depreciates 10% (83→91.3/$); export elasticity 0.6, import elasticity 0.7; exports $300bn, imports $450bn'],
        steps: [
          { text: 'Elasticity sum', calc: '0.6 + 0.7 = 1.3 > 1 → Marshall–Lerner satisfied in the long run' },
          { text: 'Short run', calc: 'Import bill in ₹ jumps ~10% on contracted volumes → trade balance WORSENS first (J-curve)' },
          { text: 'Volume effects', calc: 'Over 12–24 months: exports +6% volume, imports −7% volume → balance improves IF capacities and pass-through cooperate' },
          { text: 'Rupee specifics', calc: 'India\'s import basket (oil, gold, electronics) is inelastic short-run — the J-curve is long and shallow; depreciation is NOT a free lunch' },
        ],
        answer: 'Elasticities + pass-through + time — depreciation improves trade only through the J-curve and only if Marshall–Lerner holds.',
      },
      {
        title: 'Taper tantrum stress test',
        given: ['May 2013: US taper hints; CAD 4.8% of GDP; ₹ falls from 55 to 68/$; reserves ~$280bn'],
        steps: [
          { text: 'Diagnosis', calc: 'Wide CAD + heavy FPI dependence = sudden-stop vulnerability (Fragile Five)' },
          { text: 'Transmission', calc: 'FPI outflows → ₹ pressure → imported inflation → forced rate defence (RBI hiked 300bps emergency)' },
          { text: 'Defence deployed', calc: 'FX sales, FCNR(B) deposit window (~$34bn raised), gold import curbs → stabilisation by year-end' },
          { text: 'Lesson quantified', calc: 'Post-2013: reserves tripled, CAD compressed, inflation targeting adopted — resilience is built in calm years, spent in crises' },
        ],
        answer: 'Same system, better buffers: the 2022 global tightening saw the rupee fall modestly with a fraction of 2013\'s stress — buffers are policy.',
      },
    ],
    caseStudy: {
      title: 'Case — 1991: the crisis that changed India\'s financial system',
      body: [
        'By mid-1991: Gulf-war oil spike + collapsing exports + political instability → FX reserves down to ~2 weeks of imports; sovereign credit strained; gold physically airlifted to BoE as collateral. Rupee devalued ~18–19% in two steps; IMF loans with conditionality; the moment became the mandate for reform — de-licensing, trade liberalisation, and the market-determined exchange rate (LERMS 1992 → unified float 1993).',
      ],
      questions: [
        'Which leg of the trinity did pre-1991 India try to hold?',
        'Why did devaluation alone not fix the BoP?',
        'What institutional legacy did 1991 leave?',
      ],
      takeaways: [
        'Pre-1991: a pegged, overvalued rupee with capital controls — the trinity forced monetary policy to defend the peg until reserves broke; the fix was regime change (float) not just the rate level',
        'Devaluation without structural change fails while elasticities stay low (ELR J-curve): the accompanying reforms (tariff cuts, de-licensing) raised the elasticity base',
        'Legacies: RBI\'s reserve-accumulation doctrine, the managed float, FEMA replacing FERA, and the political economy of reform — 1991 is the hinge of every later finance-policy lecture',
        'Exam link: 1991 = BoP crisis anatomy: reserves, CAD, oil shock, confidence — and the IMF as lender-with-conditions',
      ],
    },
    revision: [
      'Gold standard: mint par, specie flows; Bretton Woods: $35/oz, adjustable pegs',
      'Triffin dilemma killed Bretton Woods; 1973 generalised float',
      'IMF: quotas→votes, BoP lending + conditionality, Article IV, SDR basket',
      'Regimes: hard peg / soft/crawling / managed float / free float',
      'Impossible trinity — choose two (memorise country examples)',
      'Euro: EMS→ERM→Maastricht→1999/2002; no fiscal union',
      'Marshall–Lerner > 1; J-curve worsening-then-improving',
      'RER = e·P*/P; NEER/REER trade-weighted',
      '1991 India: reserves crisis → float + liberalisation; 2013 taper → buffer doctrine',
    ],
    practice: [
      { q: 'The euro zone crisis of 2010–12: which trinity corner was missing?', a: 'Monetary autonomy — one ECB for many fiscal sovereigns; debtor states (Greece) had no devaluation tool left (fixed = one currency), so adjustment came through internal devaluation (wages/ unemployment). No fiscal union deepened it.' },
      { q: 'RBI holds $600bn reserves — a costless safety net?', a: 'Not costless: low-yield assets vs rupee borrowing (sterilisation cost), valuation risk, opportunity cost of domestic investment. Justified as sudden-stop insurance — the 2013-vs-2022 natural experiment supports it.' },
      { q: 'Why does a strong rupee worry exporters even if their inputs are imported?', a: 'Export contracts priced in dollars earn fewer rupees; imported-input relief is partial and lagged; competitiveness vs (say) Vietnamese peers erodes in third markets — REER matters more than the bilateral $ rate.' },
      { q: 'Why did Bretton Woods collapse in one sentence - and what replaced it?', a: 'The dollar-gold anchor broke when US inflation made the dollar overvalued (Triffin pressure); the Smithsonian attempt failed and major currencies moved to floating with IMF surveillance - the system we still have.' },
      { q: 'Explain the impossible trinity in the rupee context.', a: 'India cannot have a fixed exchange rate, free capital flows and independent monetary policy at once. It chooses a managed float (partial rate flexibility) with capital controls partly retained to keep the repo lever.' },
    ],
  },
  {
    slug: 'fx-markets-parity-arbitrage',
    number: 2,
    title: 'Foreign Exchange Markets: Quotes, Cross Rates, BOP & Parity',
    minutes: 50,
    summary:
      'FX market structure and participants, the balance of payments as the demand–supply ledger, two-way quotes and spreads, cross rates and locational arbitrage, settlement, and the parity conditions — PPP, interest-rate parity, and forwards as forecasters.',
    status: 'live',
    objectives: [
      'Read two-way quotes, compute cross rates and arb profits',
      'Map the balance of payments to rupee demand/supply',
      'Derive and apply PPP and covered/uncovered IRP',
      'Judge whether forwards forecast or merely price',
    ],
    sections: [
      {
        heading: '1. Market mechanics: quotes, cross rates, arbitrage',
        body: [
          'FX = the largest market (~$7.5tn/day global turnover; India ~$60–90bn/day era). Participants: banks/EDs (market makers quoting **two-way quotes**: bid — the price they BUY base currency at / ask/offer — the price they SELL; **spread = ask − bid**, the market-maker\'s gross margin, ~2–5 paise in interbank ₹/$, wider for corporates/retail), central banks (intervention), corporates (trade/FDI), funds/speculators, brokers. **Base/quote convention**: USD/INR 83.20/83.24 — $1 buys ₹83.20 (bank buys $) to ₹83.24 (bank sells $). Settlement: spot T+2; forwards cash-settled (India) or deliverable; NDF markets offshore.',
          'Balance of payments = the rupee demand/supply ledger: **current account** (goods, services — IT exports!, primary/secondary income) and **capital/financial account** (FPI, FDI, NRI deposits, ECBs, remittances-investments); reserve movements absorb the gap. CAD + FPI inflow is the structural Indian pattern — exports of services fund goods deficits; capital-flow volatility (not trade) drives spot. **Cross rates**: EUR/INR = EUR/USD × USD/INR; **arbitrage**: if a quoted cross deviates from the computed cross beyond costs, buy the cheap route, sell the dear one (triangular arbitrage — modern algos keep deviations within paise; exams want the arithmetic). **Locational arbitrage** (two banks quoting inconsistent pairs) is the same logic.',
        ],
        callout: {
          type: 'exam',
          text: 'Quote arithmetic rules: (1) always convert THROUGH the bank\'s side that hurts you less — the bank buys low, sells high; (2) cross rate chain: A/C = A/B × B/C; (3) arb profit per unit = |quoted cross − computed cross| − costs, × contract size. State bid/ask discipline explicitly ("bank buys $ at bid") — examiners award the method, not just the answer.',
        },
      },
      {
        heading: '2. Parity theories and forwards as forecasts',
        body: [
          '**PPP (purchasing power parity)**: absolute — the law of one price: S = P_domestic/P_foreign; **relative** — %ΔS ≈ π_domestic − π_foreign: the 4–5% inflation gap predicts ~4–5% annual rupee crawl — a decent 10-year average (the rupee\'s long-run drift), poor 6-month forecast (Big Mac index = the comic relief of PPP). Fails short-run because goods are sticky, baskets differ (non-tradables), and capital flows dominate trade.',
          '**Interest-rate parity**: **covered (CIP)** — an arbitrage LAW: F = S·(1+i₹)/(1+i$) — the forward is the spot plus the rate gap; otherwise covered arbitrage runs (borrow low-rate, convert, invest, cover forward). CIP holds tightly (it is enforced); the forward premium/discount = interest differential. **Uncovered (UIP)** — the same without cover: expected spot = forward; holds only if speculators are neutral — empirically weak (the forward-premium puzzle: high-yield currencies don\'t depreciate enough — the carry trade\'s existence). **Fisher effect** (i ≈ r + πᵉ) links them: real rates equalise globally. **Forwards as forecasters**: the forward PRICES the rate gap (CIP), it does not FORECAST — unbiasedness (UIP) fails; better practice: forwards hedge, forecasts come from REER, flows, terms-of-trade and momentum models — and even those explain little at short horizons. Exchange-rate determination (asset approach): rates, current accounts, expectations, intervention.',
        ],
        bullets: [
          'Two-way quote: bid (bank buys base) / ask (bank sells); spread = margin',
          'Cross: A/C = A/B × B/C; deviations → triangular arbitrage',
          'BOP: CA (trade, services) + FA (FPI/FDI/NRI/ECB) = ΔReserves',
          'PPP: S = P/P*; %ΔS ≈ π − π*; long-run drift, short-run failure',
          'CIP (law): F = S(1+i₹)/(1+i$) — enforced by arbitrage',
          'UIP (hypothesis): E[S_T] = F — empirically shaky (carry trade)',
          'Fisher: i ≈ r + πᵉ; real-rate convergence',
          'Forwards price the rate gap; they do not promise a forecast',
        ],
      },
    ],
    diagram: {
      title: 'Parity theories map',
      caption: 'Goods markets link via PPP, money markets via IRP, expectations via UIP; Fisher connects rates to inflation across countries.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parity conditions map">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="40" y="30" width="180" height="52" rx="10" fill="#e0f2fe"/><text x="130" y="50" fill="#0c4a6e" font-weight="600">Spot rate S</text><text x="130" y="66" fill="#075985">today\'s market price</text>
    <rect x="500" y="30" width="180" height="52" rx="10" fill="#fef9c3"/><text x="590" y="50" fill="#713f12" font-weight="600">Forward rate F</text><text x="590" y="66" fill="#a16207">covered future price</text>
    <rect x="270" y="30" width="180" height="52" rx="10" fill="#dcfce7"/><text x="360" y="50" fill="#14532d" font-weight="600">Expected spot E[S_T]</text><text x="360" y="66" fill="#166534">the forecast</text>
    <line x1="220" y1="45" x2="268" y2="45" stroke="#475569" stroke-width="1.5"/>
    <text x="244" y="36" fill="#475569" font-size="10">UIP</text>
    <line x1="450" y1="45" x2="498" y2="45" stroke="#475569" stroke-width="1.5"/>
    <text x="474" y="36" fill="#475569" font-size="10">≈?</text>
    <rect x="40" y="150" width="180" height="52" rx="10" fill="#ede9fe"/><text x="130" y="170" fill="#4c1d95" font-weight="600">Inflation π vs π*</text><text x="130" y="186" fill="#5b21b6">PPP: Δs ≈ π − π*</text>
    <rect x="270" y="150" width="180" height="52" rx="10" fill="#ffedd5"/><text x="360" y="170" fill="#7c2d12" font-weight="600">Interest i vs i*</text><text x="360" y="186" fill="#9a3412">CIP: F/S = (1+i)/(1+i*)</text>
    <rect x="500" y="150" width="180" height="52" rx="10" fill="#cffafe"/><text x="590" y="170" fill="#155e75" font-weight="600">Fisher effect</text><text x="590" y="186" fill="#0e7490">i ≈ r + πᵉ</text>
    <line x1="130" y1="102" x2="130" y2="148" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="150" y="130" fill="#7c3aed" font-size="10">goods markets (slow)</text>
    <line x1="360" y1="102" x2="360" y2="148" stroke="#ea580c" stroke-width="1.5"/>
    <text x="380" y="130" fill="#ea580c" font-size="10">money markets (tight)</text>
    <line x1="590" y1="102" x2="590" y2="148" stroke="#0891b2" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="540" y="130" fill="#0891b2" font-size="10">links both</text>
    <text x="360" y="232" fill="#475569">PPP explains the decade · IRP explains the forward · UIP is the weak link</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Cross rate', expr: 'A/C = (A/B) × (B/C)', meaning: 'Chain multiplication' },
      { name: 'Relative PPP', expr: '%ΔS ≈ π_domestic − π_foreign', meaning: 'Inflation-differential drift' },
      { name: 'Covered IRP', expr: 'F = S · (1 + i₹)/(1 + i$)', meaning: 'Arbitrage-enforced forward' },
      { name: 'Forward premium', expr: '(F − S)/S × 12/n annualised', meaning: 'The priced rate gap' },
    ],
    examples: [
      {
        title: 'Two-way quotes and the corporate\'s worst side',
        given: ['ED quotes USD/INR 83.10/83.16 spot, 3-m fwd 83.60/83.70; importer buys $1m forward; exporter sells $1m forward'],
        steps: [
          { text: 'Importer (buys $)', calc: 'Pays the ASK: 83.70 × 1m = ₹8.37 cr — the worse side, always' },
          { text: 'Exporter (sells $)', calc: 'Receives the BID: 83.60 × 1m = ₹8.36 cr — a 10-paise × $ spread the ED earns' },
          { text: 'Forward premium', calc: '(83.65 mid − 83.13 mid)/83.13 × 4 ≈ 2.5% annualised — should ≈ the ₹–$ deposit rate gap (CIP check)' },
          { text: 'Cross rate', calc: 'EUR/USD 1.0850/58 → EUR/INR = 1.0850×83.10 / 1.0858×83.16 = 90.16/90.29 — quote both sides, never a point' },
        ],
        answer: 'Bid/ask discipline + CIP sanity check = the whole quoting game; the spread is the bank\'s margin on both sides.',
      },
      {
        title: 'Covered arbitrage test',
        given: ['Spot 83.20; 6-m forward 84.10; 6-m ₹ deposit 6.8%, $ deposit 5.0%; $10m available'],
        steps: [
          { text: 'CIP fair forward', calc: 'F = 83.20 × (1+0.068/2)/(1+0.05/2) = 83.20 × 1.034/1.025 ≈ 83.93' },
          { text: 'Market vs fair', calc: '84.10 > 83.93 → forward too rich: $ is overpriced forward' },
          { text: 'Arbitrage', calc: 'Borrow ₹, convert to $ at 83.20, invest at 5%, sell $ forward at 84.10, repay ₹ loan: on $10m → gain ≈ (84.10−83.93) × 10m ≈ ₹17L locked, riskless' },
          { text: 'Reality', calc: 'Dealing spreads, CRR-type costs, and lines shrink 17L to a few lakhs — algos close it faster than you can dial the ED' },
        ],
        answer: 'CIP is a no-arbitrage law; residuals beyond costs are the market\'s way of saying "check your inputs".',
      },
    ],
    caseStudy: {
      title: 'Case — The Big Mac index, rupee edition',
      body: [
        'The Economist\'s Big Mac index (a light PPP) repeatedly shows the rupee 50–60% "undervalued" vs the dollar on raw prices; adjusted for GDP per capita (the "adjusted" index), the undervaluation narrows toward 15–25%.',
      ],
      questions: [
        'Why does raw PPP overstate rupee undervaluation?',
        'Can a fund "buy the undervaluation"?',
        'What does PPP actually predict for the rupee?',
      ],
      takeaways: [
        'The Balassa–Samuelson effect: non-tradables (rent, services) are cheap in poorer economies — a burger bundles local wages with traded inputs, so raw PPP confounds development level with misalignment',
        'PPP is a long-run anchor, not a trade: convergence can take decades and no instrument pays you the gap (UIP fails; the forward never prices PPP)',
        'PPP\'s practical use: predicting the rupee\'s long-run DRIFT ≈ inflation differential (~3–4%/yr historically) — a planning input for offshore cash flows, not a trading signal',
        'Exam framing: absolute vs relative PPP; state the failure modes (non-tradables, baskets, taxes, transport) — then the corrected use',
      ],
    },
    revision: [
      'Two-way quote: bid = bank buys base; ask = bank sells; spread = margin',
      'Corporates always transact at their worse side — identify it first',
      'Cross rate A/C = A/B × B/C; deviation = triangular arb',
      'BOP: CA + FA + errors = Δ reserves; services exports fund India\'s goods CAD',
      'PPP: absolute (law of one price) / relative (Δs ≈ π−π*); long-run drift only',
      'CIP: F = S(1+i)/(1+i*) — arbitrage-enforced law',
      'UIP: E[S]=F — weak (forward-premium puzzle, carry trade)',
      'Fisher: i ≈ r + πᵉ; real rates roughly converge',
      'Forwards price rate gaps, not future spots — hedge with them, don\'t forecast',
    ],
    practice: [
      { q: 'USD/INR 83.05/83.12; GBP/USD 1.2630/38. Compute GBP/INR two-way.', a: 'GBP/INR bid (bank buys £) = 1.2630 × 83.05 ≈ 104.89; ask = 1.2638 × 83.12 ≈ 105.05. Quote 104.89/105.05.' },
      { q: '6-m ₹ rate 6.5%, $ rate 5.2%, spot 83.50. Fair forward?', a: 'F = 83.50 × (1.0325)/(1.026) ≈ 84.03 — a ~1.27% annualised premium ≈ the rate gap; any quoted forward materially different (beyond spread) is an arb.' },
      { q: 'Why do carry trades exist if CIP is a law?', a: 'CIP kills COVERED rate-gap profits exactly. Carry is UNCOVERED: borrow yen at 0.5%, invest rupee at 6.5%, ride the depreciation risk — profitable until crash years (2008, 2013, 2022) deliver 10–20% losses: negative skew for a positive mean.' },
      { q: 'EUR/USD 1.10, USD/INR 83.20. A bank quotes EUR/INR 91.00. Trade?', a: 'Computed cross = 1.10 x 83.20 = 91.52. Buy euros cheap at 91.00, sell via the cross at 91.52 - about 52 paise per euro before costs: triangular arbitrage.' },
      { q: 'Spot USD/INR 83.00, 1-year forward 85.30, rupee rate 7 percent, dollar rate 5 percent. Is CIP holding?', a: 'CIP forward = 83 x 1.07/1.05 = 84.58. Quoted 85.30 exceeds it - borrow dollars, convert, invest rupees, sell forward: about 0.85 percent locked-in arbitrage before transaction costs.' },
    ],
  },
  {
    slug: 'fx-exposure-hedging',
    number: 3,
    title: 'FX Risk: Transaction, Translation & Economic Exposure — and Hedging',
    minutes: 45,
    summary:
      'Forecasting honestly, the three exposures — transaction, translation, economic — with evaluation for firms, and the hedging toolkit: forwards, futures, options, money-market hedges, and natural hedges with costs and choices.',
    status: 'live',
    objectives: [
      'Distinguish the three exposures with firm examples',
      'Measure transaction exposure on a receivable/payable',
      'Hedge with forward, money market, and option — and compare costs',
      'Decide hedge ratio: natural hedges, netting, and no-hedge cases',
    ],
    sections: [
      {
        heading: '1. The three exposures',
        body: [
          '**Transaction exposure**: contracted future cash flows in foreign currency — the ₹ value of a $1m receivable moves with spot until settlement; symmetric, measurable, hedgeable. **Translation exposure**: consolidating foreign subsidiaries\' financials into the parent\'s currency — the balance sheet restates (current/noncurrent, monetary/temporal, current-rate methods — Ind AS 21functional-currency logic); paper P&L (CTA in reserves), no cash — hedge only to manage reported volatility optics. **Economic (operating) exposure**: the present value of FUTURE operating cash flows changes with exchange-rate MOVEMENTS — competitive exposure (a weak yuan makes a competitor cheaper in third markets); not on any statement, uncontracted, the hardest to hedge — managed by matching cost and revenue currencies, sourcing flexibility, and product pricing power.',
          'For evaluation: list exposures by currency, tenor and certainty; transaction exposure gets hedged (it is a known date-amount); economic exposure gets MANAGED (operational matching) not speculatively hedged; translation gets a policy (hedge net investment if covenant/reporting pressure — Ind AS/AS 11 rules on capital-account hedges). Forecasting honestly: parity says forecasts barely beat the forward at short horizons (UIP weak, random-walk strong) — so hedging is INSURANCE against ruin, not a bet on direction; state a currency view, a tolerance (max adverse move), then choose the instrument.',
        ],
        callout: {
          type: 'exam',
          text: 'The hedge-comparison table every numerical resolves into: Forward — locks rate exactly, zero premium, gives up upside. Money-market hedge — borrow/lend to replicate the lock (cost = rate differential). Option (buy put on receivable / call on payable) — pays premium, floor + upside. Futures — exchange-traded forward, margin/liquidity risk. Always compute "effective rupee realised" under strong/weak/unchanged scenarios — the exam wants the scenario table, not the instrument name.',
        },
      },
      {
        heading: '2. Hedging in practice',
        body: [
          '**Forward**: bank-dated to match the flow — the default for firm commitments. **Money-market hedge**: exporter with $1m in 3m borrows $ at $-rate, converts spot to ₹, invests in ₹; repayment matches the receivable — mechanically replicates the forward (cost differences = CIP deviations, usually small). **Options**: premium buys insurance plus upside — right when the exposure is contingent (a bid that may not win) or direction unclear. **Futures** (exchange currency derivatives): standard dates/sizes, margined — liquidity for SMEs; basis and lot mismatch vs the underlying flow. **Natural hedges**: match currency of revenues and costs (invoice exports in a basket, borrow in the dollar you earn, locate production), **netting** (intra-group offsets — MNC treasury 101), **leading and lagging** payment timing (contractual, watch tax/transfer-pricing). **Hedge ratio** decisions: 100% on firm commitments typical; layered/rolling hedges for forecast flows (hedge 40% of 12-month forecast now, add as certainty grows); leave residual exposure if competitive position benefits from volatility.',
          'Indian plumbing: FEMA rules (contracts against genuine exposure, cancellation/rebooking limits), RBI\'s hedging relaxations for residents (past performance caps moved, dynamic hedging for exporters/importers 2020s); currency futures/options on NSE/BSE; cross-currency options OTC with EDs. Cost of hedging = forward points (≈ rate differential) + option premium — a real P&L line: hedging the rupee\'s ~3–4% annual drift costs ~3–4%/yr — the CFO conversation is "pay the drift, or wear the volatility?"',
        ],
        bullets: [
          'Transaction: contracted flows — hedge fully; symmetric risk',
          'Translation: consolidation paper P&L — policy hedge only (net investment)',
          'Economic: future competitiveness — manage operationally (matching)',
          'Forward locks; option floors; MM hedge replicates forward; futures = margined forwards',
          'Contingent exposure → option (no obligation to use)',
          'Netting, leading/lagging, currency matching = free hedges',
          'Hedge cost = forward points ≈ rate gap; state it in the P&L',
          'Scenario table (strong/weak/flat) beats instrument names',
        ],
      },
    ],
    diagram: {
      title: 'Three exposures, three responses',
      caption: 'Transaction exposure sits on contracts and is hedged; translation on statements and is policy-hedged; economic on competitiveness and is managed by matching.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three FX exposures">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="30" width="212" height="180" rx="12" fill="#e0f2fe"/>
    <text x="126" y="52" fill="#0c4a6e" font-weight="600">TRANSACTION</text>
    <text x="126" y="74" fill="#075985">contracted flows</text>
    <text x="126" y="94" fill="#075985">$ receivable / payable</text>
    <text x="126" y="120" fill="#0c4a6e">measurable · dated</text>
    <text x="126" y="150" fill="#166534" font-weight="600">→ HEDGE</text>
    <text x="126" y="170" fill="#166534">forward / MM / option</text>
    <text x="126" y="196" fill="#475569" font-size="11">scenario table decides</text>
    <rect x="254" y="30" width="212" height="180" rx="12" fill="#fef9c3"/>
    <text x="360" y="52" fill="#713f12" font-weight="600">TRANSLATION</text>
    <text x="360" y="74" fill="#a16207">subsidiary statements</text>
    <text x="360" y="94" fill="#a16207">consolidation restatement</text>
    <text x="360" y="120" fill="#713f12">paper P&L · no cash</text>
    <text x="360" y="150" fill="#166534" font-weight="600">→ POLICY HEDGE</text>
    <text x="360" y="170" fill="#166534">net-investment hedge</text>
    <text x="360" y="196" fill="#475569" font-size="11">only if reporting needs it</text>
    <rect x="488" y="30" width="212" height="180" rx="12" fill="#fee2e2"/>
    <text x="594" y="52" fill="#7f1d1d" font-weight="600">ECONOMIC</text>
    <text x="594" y="74" fill="#991b1b">future competitiveness</text>
    <text x="594" y="94" fill="#991b1b">PV of operating CFs</text>
    <text x="594" y="120" fill="#7f1d1d">uncontracted · strategic</text>
    <text x="594" y="150" fill="#166534" font-weight="600">→ MANAGE</text>
    <text x="594" y="170" fill="#166534">match rev &amp; cost currencies</text>
    <text x="594" y="196" fill="#475569" font-size="11">sourcing + pricing power</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Receivable risk', expr: '₹ value = $1m × S_settlement (uncertain until paid)', meaning: 'Transaction exposure' },
      { name: 'MM hedge (exporter)', expr: 'Borrow $ = PV of receivable; convert spot; invest ₹', meaning: 'Replicates the forward' },
      { name: 'Option floor', expr: 'Min ₹ = K × notional − premium', meaning: 'Insured worst case + upside' },
      { name: 'Hedge cost', expr: '(F − S)/S annualised ≈ i₹ − i$', meaning: 'The insurance premium in bps' },
    ],
    examples: [
      {
        title: 'Hedge a $ receivable three ways',
        given: ['$1m receivable in 3 months; spot 83.20; 3-m forward 83.55; $ 3-m rate 5.2%, ₹ 3-m 6.6%; ATM put premium 1.1% (strike 83.20)'],
        steps: [
          { text: 'Forward', calc: 'Locks 83.55 × 1m = ₹8.355 cr — certain, no premium, no upside' },
          { text: 'Money market', calc: 'Borrow $ PV = 1m/1.013 = $987,167; convert at 83.20 → ₹8.213 cr; invest at 6.6%/4 → ₹8.349 cr ≈ forward (CIP: 83.20×1.0165/1.013 = 83.48–83.55 band with spreads)' },
          { text: 'Put option', calc: 'Floor 83.20 − premium 0.92 → ₹8.228 cr worst case; if ₹ weakens to 85, sell spot: 85 − 0.92 = 84.08 effective → ₹8.408 cr — upside kept' },
          { text: 'Scenario table', calc: 'S_T = 80: fwd 83.55 / opt 80−0.92=79.08 (fwd wins); S_T = 86: fwd 83.55 / opt 85.08 (opt wins) — insurance vs certainty, priced fairly' },
        ],
        answer: 'Effective ₹ under {80, 83.55, 86}: forward constant 83.55; option 79.08 / 82.28 / 85.08 — the choice is a premium-vs-upside decision, stated in scenarios.',
      },
      {
        title: 'Economic exposure: the third-market competitor',
        given: ['Indian exporter competes with a Chinese supplier in EU markets; INR appreciates 6% vs EUR while CNY stays flat'],
        steps: [
          { text: 'No transaction exposure', calc: 'Prices contract €-quarterly — transaction hedged fully' },
          { text: 'Economic hit', calc: 'Indian euro-cost +6% vs rival\'s flat → margin squeeze or share loss in 2–3 quarters — nothing on today\'s statements' },
          { text: 'Manage', calc: 'Partial €-denominated sourcing/borrowing (natural match), capacity in a euro-linked geography, or price-band contracts with EU clients (share the risk)' },
          { text: 'What NOT to do', calc: 'Don\'t hedge speculative future volumes with forwards — that is a currency bet, not a hedge; use operational matching' },
        ],
        answer: 'Economic exposure is managed with the operating model (currencies of cost and revenue), not with derivatives on hypothetical volumes.',
      },
    ],
    caseStudy: {
      title: 'Case — To hedge or not: the IT services treasury debate',
      body: [
        'An Indian IT firm earns 60% in USD, costs ~85% in INR. The board splits: the CFO hedges ~70% of next-four-quarter receivables on a rolling basis; the founder argues the rupee "always depreciates long-run" so hedging forfeits margin.',
        'Over three years: two years of rupee slide reward the unhedged; one year (a 7% appreciation) crushes unhedged peers\' margins and triggers guidance cuts. The firm\'s hedged book compounds smoothly; a rival unhedged competitor swings ±450 bps in EBITDA margin across years.',
      ],
      questions: [
        'Which exposure does the rolling 70% hedge address?',
        'Was the founder\'s drift argument wrong?',
        'What determines the right hedge ratio?',
      ],
      takeaways: [
        'Transaction exposure on forecast receivables — layered rolling hedges (70% near-quarter, declining for outer quarters) convert most of the risk without betting',
        'The drift argument is RIGHT on average (PPP) and IRRELEVANT to decision-making: hedging is about variance, not mean — the year of appreciation nearly killed the unhedged P&L; margin stability is priced by clients, analysts, and employees',
        'Hedge ratio = f(certainty of flow, competitive currency match, covenant headroom, treasury capability) — write the policy in calm years, execute it mechanically',
        'Exam link: distinguish forecast-based hedging (allowed partially) from speculation (forwards on nonexistent exposures) — FEMA and treasury policy both draw that line',
      ],
    },
    revision: [
      'Transaction: contracted, dated — full hedge toolkit',
      'Translation: consolidation paper P&L (Ind AS 21; CTA) — net-investment policy hedge',
      'Economic: competitiveness of future CFs — operational matching',
      'Forward locks; MM hedge replicates (CIP); option = floor + upside for premium',
      'Futures: standard lots, margin — SME liquidity, basis risk',
      'Natural: currency matching, netting, leading/lagging',
      'Hedge cost ≈ forward points ≈ interest differential',
      'Layered ratios on forecast flows; no forwards on nonexistent exposure',
      'Forecasts barely beat forwards — hedge for variance, not direction',
    ],
    practice: [
      { q: 'Importer with $2m payable in 2m. Spot 83.40, fwd 83.75. Cost to hedge?', a: 'Forward locks 83.75: hedge cost = (83.75−83.40)/83.40 × 6 ≈ 2.5% annualised ≈ ₹–$ rate gap; the importer pays the drift as insurance against a spike — quantify: ₹7L for 2 months on $2m.' },
      { q: 'Bid submitted in EUR; 40% win chance, decision in 3m. Hedge?', a: 'Contingent exposure → BUY A EUR PUT (or call on INR): if the bid fails, lose only premium (~1–1.5%); a forward would create a naked position if you lose the bid — obligation without exposure = speculation.' },
      { q: 'Why did RBI ease rebooking limits for exporters?', a: 'To let treasuries cancel-and-rebook hedges as forecasts change, making hedging less one-way — deepening the domestic FX market and reducing the perception that forwards are directional bets. Policy supports genuine hedging; the deep market reduces volatility for everyone.' },
      { q: 'The rupee falls 8 percent; your export subsidiary\'s translated profits jump. Cash impact?', a: 'None today - translation exposure restates consolidated accounts, it does not move cash. Over time it feeds pricing and competitiveness questions, which is why hedging it is a policy choice, not a must.' },
      { q: 'Exporter with a 90-day dollar receivable, spot 83. Forward available at 83.50. Compare with doing nothing if spot lands at 81.', a: 'Forward locks 83.50 regardless; unhedged realises 81, losing Rs 2.50 per dollar. Hedging is certain - the choice is insurance, not speculation, and should be judged against budget rate, not hindsight.' },
    ],
  },
  {
    slug: 'foreign-investment-fdi-corporate-finance',
    number: 4,
    title: 'Foreign Investment: FDI, Theories, Foreign Capital Budgeting & Cost of Capital',
    minutes: 45,
    summary:
      'Why firms go abroad — market-structure, product life cycle, Hymer, internalisation, eclectic theory — entry modes from turnkey to wholly-owned subsidiaries, FDI flows and policy, venture capital across borders, foreign-project appraisal with country risk, and the multinational cost of capital.',
    status: 'live',
    objectives: [
      'Compare FDI theories: Hymer, Vernon, internalisation, Dunning',
      'Choose entry mode: turnkey, JV, greenfield, acquisition',
      'Appraise a foreign project with country-risk adjustments',
      'Build a multinational WACC and judge financing currency',
    ],
    sections: [
      {
        heading: '1. Theories and entry modes',
        body: [
          'Why go abroad at all? **Market-structure/oligopoly theories**: follow-the-leader — rivals match moves to preserve shares (knock-knee FDI). **Vernon\'s product life cycle**: innovate at home → export → produce abroad as the product matures → import in decline — FDI as a lifecycle stage (US→Europe classic arc). **Hymer (1960)**: firms must hold **firm-specific advantages** (technology, brand, management) sufficient to beat local firms\' home turf — FDI is exploitation of advantage, not arbitrage. **Internalisation (Buckley–Casson)**: where markets for intermediate goods/know-how fail (transaction costs, leakage), firms replace contract with ownership — FDI internalises the market for knowledge. **Dunning\'s eclectic OLI**: Ownership advantages + Location advantages + Internalisation advantages jointly explain the where-and-how of FDI. **Uppsala** incremental commitment: export agent → subsidiary → production.',
          'Entry modes as control-risk ladders: **turnkey projects** (design-build-hand over — low control, no market risk, e.g., EPC contractors), **licensing/franchising** (low investment, royalty, IP leakage risk), **export** (minimal commitment, tariff/logistics walls), **joint venture** (shared control, local partner\'s knowledge and political cover — conflict risk), **acquisition** (instant scale and customers — integration risk, price), **greenfield wholly-owned** (full control, slowest, full country risk). India\'s FDI policy: automatic vs approval routes, sectoral caps (retail, insurance, defence moving), Press Note 3 for land-border countries; outbound: LRS for individuals, ODI rules for corporates. Cross-border **venture capital / PE**: same economics as PGDM 301 Unit 2 (staging, syndication, board seats, exit) with FX, legal-system and exit-market risk added.',
        ],
        callout: {
          type: 'exam',
          text: 'Theory one-liners: Hymer — firm-specific advantage must exist for FDI (else license/export). Vernon — FDI follows the product\'s maturity. Internalisation — ownership replaces failing markets for know-how. OLI — ownership + location + internalisation. Uppsala — incremental commitment. Exam favourite: "company X licenses know-how abroad; leaks; next time it should ___" → internalise (own the subsidiary).',
        },
      },
      {
        heading: '2. Foreign capital budgeting and multinational cost of capital',
        body: [
          '**Foreign project appraisal**: NPV as at home (F06 methods) + three layers — (1) cash flows in host currency, discounted at host-currency rate OR convert at forecast rates (parity-consistent) and discount at home rate — the two must agree if parity holds; (2) **country/political risk**: expropriation, transfer/conversion freezes, tax surprises — handle by risk-adjusted discount rate (+2–6% by rating), expected-value scenarios (expropriation probability ×), or Aboishe/adjusted-PV (separate guaranteed and risky components); (3) blocked funds & repatriation constraints: value only what returns (dividends, royalties, fees) after host taxes; terminal value with exit multiple or perpetuity under repatriation rules.',
          '**Multinational WACC**: components — home equity premium with international CAPM refinements: does global diversification lower the cost of equity for a MNC? (partially — segmentation vs integration of markets); debt in multiple currencies: the currency of borrowing matters (a $ loan for $ revenues is a hedge — F05 Unit 3 logic); subsidised host loans (concessional finance as project NPV input); **the currency decision** — borrow where cash flows are (natural hedge), tax (withholding, interest deductibility), and swap availability complete it. Fallback rule: discount host-currency flows at host rates; the equity cost should reflect the project\'s systematic risk (global beta for integrated markets), not the parent\'s historic beta.',
        ],
        bullets: [
          'Hymer: FDI requires firm-specific advantage; internalisation: own when markets leak',
          'Vernon: FDI as product maturity; OLI: ownership+location+internalisation',
          'Entry ladder: turnkey → license → export → JV → M&A → greenfield',
          'India: automatic/approval routes, sectoral caps, Press Note 3',
          'Foreign NPV: currency + country risk (RAROC/discount adder/scenarios) + repatriation',
          'Blocked funds: value repatriable flows only',
          'MNC WACC: project beta (global), debt in revenue currencies, subsidised loans',
          'Host flows at host rates = home flows at home rates if parity holds',
        ],
      },
    ],
    diagram: {
      title: 'Entry-mode ladder: control vs risk',
      caption: 'Each rung buys more control and takes more country/asset risk; theories explain which rung a firm\'s advantages justify.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Entry mode ladder">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="30" y="200" width="170" height="36" rx="9" fill="#dcfce7"/><text x="115" y="223" fill="#14532d" font-weight="600">Turnkey / EPC</text>
    <rect x="220" y="163" width="170" height="36" rx="9" fill="#bbf7d0"/><text x="305" y="186" fill="#166534" font-weight="600">License / franchise</text>
    <rect x="410" y="126" width="170" height="36" rx="9" fill="#fef9c3"/><text x="495" y="149" fill="#713f12" font-weight="600">Export → subsidiary</text>
    <rect x="600" y="89" width="110" height="36" rx="9" fill="#fed7aa"/><text x="655" y="112" fill="#9a3412" font-weight="600">JV</text>
    <rect x="460" y="52" width="170" height="36" rx="9" fill="#fecaca"/><text x="545" y="75" fill="#7f1d1d" font-weight="600">Acquisition</text>
    <rect x="250" y="15" width="170" height="36" rx="9" fill="#fee2e2"/><text x="335" y="38" fill="#7f1d1d" font-weight="600">Greenfield 100%</text>
    <line x1="200" y1="215" x2="256" y2="188" stroke="#475569" stroke-width="1.4"/>
    <line x1="390" y1="178" x2="446" y2="151" stroke="#475569" stroke-width="1.4"/>
    <line x1="580" y1="140" x2="636" y2="115" stroke="#475569" stroke-width="1.4"/>
    <line x1="600" y1="100" x2="580" y2="78" stroke="#475569" stroke-width="1.4"/>
    <line x1="460" y1="65" x2="422" y2="46" stroke="#475569" stroke-width="1.4"/>
    <text x="90" y="60" fill="#475569">← low control · low risk</text>
    <text x="90" y="76" fill="#475569">fast, no exposure</text>
    <text x="480" y="230" fill="#475569">high control · high commitment →</text>
    <text x="480" y="246" fill="#475569">theory (Hymer/OLI) decides the justified rung</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Two-route NPV identity', expr: 'NPV = Σ E[CFₜ(host)]/(1+r_host)ᵗ = Σ E[CFₜ(home)]/(1+r_home)ᵗ (parity)', meaning: 'Same value both ways' },
      { name: 'Country-risk adder', expr: 'r* = r + CRP (sovereign spread-based)', meaning: 'Simplified risk pricing' },
      { name: 'Expected-value risk', expr: 'NPV = Σ pᵢ · NPVᵢ (expropriation scenarios)', meaning: 'Scenario pricing of politics' },
      { name: 'MNC WACC', expr: 'WACC = wₑ·Ke(global beta) + w_d·Kd(currency-matched)·(1−t)', meaning: 'Project-relevant capital charge' },
    ],
    examples: [
      {
        title: 'Appraise a Bangladesh garment unit',
        given: ['Capex $8m; 5-yr after-tax host CF $2.6m/yr; host discount rate 14%; expropriation/transfer risk assessed 10% by year 3 (confiscation of unrecovered capital); parent currency USD'],
        steps: [
          { text: 'Base NPV @14%', calc: '2.6m × [1−1.14⁻⁵]/0.14 = 2.6 × 3.433 = $8.93m → NPV = +$0.93m' },
          { text: 'Risk scenario', calc: 'If expropriation at end-yr 3 (p=0.10): CF years 1–3 only = 2.6×2.322 = $6.04m → NPV = −$1.96m' },
          { text: 'Expected NPV', calc: '0.9(0.93) + 0.1(−1.96) = $0.64m — positive but thin; sensitivity: 1-pt rate rise kills it' },
          { text: 'Risk-adjusted alternative', calc: 'Add 3% CRP: 2.6×[1−1.17⁻⁵]/.17 − 8 = 2.6×3.199−8 = +$0.32m — same verdict, cruder tool; scenario method also shows WHERE the risk bites' },
        ],
        answer: 'Scenario pricing beats a blunt adder: same decision, but it names the loss event and lets insurance/partnering target it.',
      },
      {
        title: 'Which currency should fund it?',
        given: ['US parent; project earns BDT with USD-linked garment contracts (85% of revenue $-denominated); options: $ loan 6.5%, BDT loan 11%, INR loan 8% swapped to $'],
        steps: [
          { text: 'Revenue currency', calc: 'Cash flows are ~USD — a $ loan is naturally hedged: no translation mismatch' },
          { text: 'Cost ranking', calc: 'BDT 11% nominal but ~5% devaluation trend → effective ~6% in $ terms with high volatility; $ 6.5% certain' },
          { text: 'Decision', calc: 'Borrow $ (match + certainty); keep a small BDT working-capital line for local costs — currency of borrowing follows currency of cash flows' },
          { text: 'Add-ons', calc: 'Concessional host finance (if offered at 8% BDT) is a subsidy to be valued separately in the APV — take it within the natural-hedge limit' },
        ],
        answer: 'Financing currency = revenue currency; exotic-currency borrowing is a speculative devaluation bet unless flows match.',
      },
    ],
    caseStudy: {
      title: 'Case — License or own? The know-how leak',
      body: [
        'A German specialty-chemicals firm enters India by licensing its coating technology to a local producer for a 5% royalty. Within four years the licensee\'s affiliate sells near-identical coatings in Southeast Asia; the licence\'s exclusivity clause proves unenforceable in practice. Revenues lost far exceed royalties earned.',
        'The next technology generation goes in through a wholly-owned subsidiary despite 3× the capital commitment.',
      ],
      questions: [
        'Which theory predicted exactly this?',
        'When is licensing still the right mode?',
        'What contract design mitigates leakage if licensing is chosen?',
      ],
      takeaways: [
        'Internalisation theory: markets for know-how leak (tacit knowledge can\'t be perfectly contracted) — ownership internalises the advantage; Hymer adds that the firm-specific advantage was the reason it could own',
        'Licensing fits: immature/uncertain markets (low stakes), strong IP enforcement, non-core technologies, or where local partners\' distribution is the binding advantage',
        'Mitigants: staged technology transfer (old generation licensed, newest retained), black-box components supplied from home, cross-licensing, equity stakes in licensees — turning leakage into shared upside',
        'Exam link: entry-mode choice = firm-specific advantage × contractual enforceability × country risk — a table, not a preference',
      ],
    },
    revision: [
      'Hymer: firm-specific advantage enables FDI; else license/export',
      'Vernon product life cycle: innovate → export → produce abroad',
      'Internalisation: own when know-how markets fail/leak',
      'OLI = Ownership + Location + Internalisation (Dunning)',
      'Uppsala: incremental commitment; follow-the-leader oligopoly FDI',
      'Modes: turnkey (low) → license → export → JV → M&A → greenfield (high control/risk)',
      'India FDI: automatic vs approval routes; sectoral caps; PN3',
      'Foreign NPV: host flows/host rates = home flows/home rates (parity); blocked funds repatriable only',
      'Country risk: scenario EV beats discount adders; both must name the event',
      'MNC WACC: global project beta, revenue-currency debt, subsidised loans in APV',
    ],
    practice: [
      { q: 'Project CF in EUR; parent in India. Which discounting is consistent?', a: 'Either discount EUR flows at a EUR-denominated rate (risk-adjusted), or forecast INR-converted flows via parity and discount at INR rate — the parity chain keeps them equal; mixing (EUR flows at INR rates) is the classic error.' },
      { q: 'Why might a JV beat a 100% subsidiary in a regulated market?', a: 'Local partner supplies licences/relationships/political cover and shares country risk; caps on foreign ownership may leave no choice. Cost: divided control, technology leakage, exit friction — JV when you need what you can\'t buy.' },
      { q: 'Global integration of markets should lower a MNC\'s cost of equity. Why only partially?', a: 'Integration lowers beta-based costs where markets are truly integrated; segmentation (capital controls, home bias, illiquidity) and the fact that investors price crash/country risk keep a premium — empirical MNC costs sit between fully segmented and fully integrated benchmarks.' },
      { q: 'Why value an overseas project with APV rather than one big NPV rate?', a: 'APV separates the base all-equity NPV from financing side-effects (subsidised host loans, interest tax shields, blocked-fund timing) - each risk gets its own adjustment instead of a fudged discount rate.' },
      { q: 'A US parent with rupee revenues asks: borrow in dollars or rupees?', a: 'Rupees - the debt service then matches the cash flows (natural hedge). Dollar debt on rupee earnings adds leverage and currency mismatch, doubling the exposure the finance team cannot manage passively.' },
    ],
  },
  {
    slug: 'foreign-operations-instruments',
    number: 5,
    title: 'Foreign Operations: Euro Markets, GDR/ADR, LCs & Invoicing',
    minutes: 45,
    summary:
      'International banking and the euro-credit/euro-bond markets, GDR/ADR equity financing, euro notes and commercial paper, currency of invoicing, multi-currency final accounts, letters of credit and bills of exchange, international project risks, and cross-border accounting & taxation.',
    status: 'live',
    objectives: [
      'Explain euro-currency, euro-credit and euro-bond markets',
      'Compare GDR and ADR programmes and their Indian arc',
      'Structure trade payment: LC types and bills of exchange',
      'Handle invoicing currency and multi-currency accounts; map double taxation',
    ],
    sections: [
      {
        heading: '1. Euro markets and offshore financing',
        body: [
          '**Euro-currency market**: deposits in a currency OUTSIDE its home country (eurodollars, and in the classic texts even "euro-rupees") — offshore, lightly regulated, wholesale; the interbank chain creates the euro-credit market (offshore syndicated term loans, LIBOR + spread — now SOFR-based pricing). **Euro-bond market**: bonds issued outside the currency\'s jurisdiction (a USD bond in London); bearer format historically, stamp-duty advantages, syndicated placement; MTN programmes under the same umbrella. **Euro notes / ECP**: short-term offshore paper — note-issuance facilities (NIFs), revolving underwriting — the commercial paper of the euro market. Why issuers go offshore: escape domestic regulation/reserve costs, deeper pools, pricing arbitrage; the costs: information, documentation (ISDA/ trust deeds), FX if not naturally hedged.',
          '**GDR/ADR equity**: **ADR** — American depositary receipt: US bank holds shares, issues receipts in USD, trades on NYSE/NASDAQ; SEC registration (Level 1 OTC unsponsored to Level 3 capital-raising) — full disclosure burden (20-F). **GDR** — global DR, typically Luxembourg/London listings, lighter disclosure — the route Indian companies favoured in the 1990s–2000s (Infosys, ICICI waves). **FCCB** — foreign currency convertible bonds; **masala bonds** — rupee-denominated offshore bonds (the FX risk stays with the INVESTOR — a policy innovation). Indian arc: GDR boom → ADR listings (Infosys 1999) → regulatory tightening after abuse → ECB framework with all-in-cost caps, end-use restrictions, maturity floors. Depositary arithmetic: 1 ADR = n shares (ratio set for US price conventions); fungibility across lines.',
        ],
        callout: {
          type: 'exam',
          text: 'LC types to name precisely: revocable/irrevocable · confirmed (confirming bank adds its credit) · at-sight vs usance · revolving · transferable · back-to-back · standby (guarantee-like). Parties: applicant (importer), beneficiary (exporter), issuing bank, advising, confirming, negotiating banks. Bills of exchange: sight vs usance; documents against payment/acceptance (D/P, D/A) in collections. One line each + one use case each = complete marks.',
        },
      },
      {
        heading: '2. Payments, invoicing, accounts, tax',
        body: [
          '**Trade payment ladder** (exporter risk ↓, importer cost ↑): open account (importer pays later — exporter carries all risk) → **collection/bills** (banks handle documents; D/P pays on documents, D/A on acceptance — title control without payment guarantee) → **letter of credit** (bank\'s conditional payment promise against documents — UCP 600; the confirming bank removes even issuing-bank/country risk) → advance payment (importer carries all risk). **Currency of invoicing**: who bears FX risk between the parties; heuristics — invoice in your currency if you\'re the stronger negotiator or in a seller\'s market; in vehicle currencies ($ for commodities) when both sides avoid the other\'s currency; or split/local-currency price with a hedge embedded in the margin — the pricing decision IS a hedging decision (F05 Unit 3 link).',
          '**Multi-currency final accounts**: translate each foreign operation\'s trial balance at closing rate (current method) with P&L at average rate, differences to the **foreign-currency translation reserve** (CTA); net-investment hedge offsets (Ind AS 21/(AS) 11 logic). **International project risks** (links PGDM 301 SCBA + F05 Unit 4): political (expropriation, transfer risk), commercial, FX, force majeure — mitigated by MIGA/ECGC insurance, BITs, offshore escrow, multi-sourcing. **Taxation**: worldwide vs territorial systems; **double taxation relieved by DTAA treaties** (India\'s ~95): exemption or credit method; transfer pricing (arm\'s length on intra-group flows), POEM for residence, GAAR against treaty shopping. The operating theme: every cross-border flow is a contract + a currency + a tax — design all three together.',
        ],
        bullets: [
          'Euro-currency: offshore deposits in the currency; euro-credit: syndicated offshore loans',
          'Euro-bond: issued outside currency\'s jurisdiction; MTN/ECP for shorter paper',
          'ADR: US-listed, SEC disclosure (20-F); GDR: Europe-listed, lighter',
          'FCCB: convertible debt; masala bond: INR-denominated offshore (investor holds FX)',
          'ECB framework: all-in-cost caps, end-use norms, maturity floors',
          'Payment ladder: open account → D/P–D/A collections → LC → advance',
          'LC: UCP 600; confirmations remove issuing-bank + country risk',
          'Invoicing currency = risk allocation between the parties',
          'Translation: closing + average rates → CTA reserve (Ind AS 21)',
          'DTAA: exemption vs credit; transfer pricing at arm\'s length; MIGA/ECGC cover',
        ],
      },
    ],
    diagram: {
      title: 'Trade payment risk ladder',
      caption: 'From open account to advance payment, risk shifts from exporter to importer; the LC cluster shares it through banks.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Trade payment methods risk ladder">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="30" width="150" height="170" rx="12" fill="#fee2e2"/>
    <text x="95" y="55" fill="#7f1d1d" font-weight="600">OPEN ACCOUNT</text>
    <text x="95" y="80" fill="#991b1b">importer pays later</text>
    <text x="95" y="100" fill="#991b1b">exporter: all risk</text>
    <text x="95" y="160" fill="#475569" font-size="11">trusted</text>
    <text x="95" y="176" fill="#475569" font-size="11">repeat buyers</text>
    <rect x="195" y="30" width="150" height="170" rx="12" fill="#fed7aa"/>
    <text x="270" y="55" fill="#9a3412" font-weight="600">COLLECTIONS</text>
    <text x="270" y="80" fill="#c2410c">D/P · D/A bills</text>
    <text x="270" y="100" fill="#c2410c">title control only</text>
    <text x="270" y="160" fill="#475569" font-size="11">banks handle</text>
    <text x="270" y="176" fill="#475569" font-size="11">documents</text>
    <rect x="370" y="30" width="150" height="170" rx="12" fill="#fef9c3"/>
    <text x="445" y="55" fill="#713f12" font-weight="600">LETTER OF CREDIT</text>
    <text x="445" y="80" fill="#a16207">bank pays on docs</text>
    <text x="445" y="100" fill="#a16207">UCP 600 · confirmable</text>
    <text x="445" y="160" fill="#475569" font-size="11">risk shared</text>
    <text x="445" y="176" fill="#475569" font-size="11">through banks</text>
    <rect x="545" y="30" width="150" height="170" rx="12" fill="#dcfce7"/>
    <text x="620" y="55" fill="#14532d" font-weight="600">ADVANCE PAYMENT</text>
    <text x="620" y="80" fill="#166534">pay before shipment</text>
    <text x="620" y="100" fill="#166534">importer: all risk</text>
    <text x="620" y="160" fill="#475569" font-size="11">new suppliers</text>
    <text x="620" y="176" fill="#475569" font-size="11">small orders</text>
    <text x="360" y="230" fill="#475569">exporter risk falls → · importer risk rises → · LC cluster = bank-intermediated middle</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'ADR ratio', expr: '1 ADR = n local shares (ratio set at issuance)', meaning: 'Fungibility across markets' },
      { name: 'LC payment condition', expr: 'Pay on compliant DOCUMENTS, not goods', meaning: 'The documentary principle' },
      { name: 'Credit-method relief', expr: 'India tax = Indian liability − min(foreign tax, Indian tax on that income)', meaning: 'DTAA double-tax relief' },
      { name: 'Translation reserve', expr: 'CTA = closing-rate BS + avg-rate P/L effect → reserves', meaning: 'Ind AS 21 paper P&L' },
    ],
    examples: [
      {
        title: 'Pick the payment instrument',
        given: ['Exporter: Indian auto-parts maker; importer: a 2-year-old Vietnamese assembler; order $400k; both banks unknown to each other'],
        steps: [
          { text: 'Risk read', calc: 'New counterparty, thin local bank credit → open account unacceptable; advance unacceptable to buyer' },
          { text: 'Instrument', calc: 'Irrevocable LC at sight, issued by a Vietnamese bank and CONFIRMED by a first-class international bank — confirmation removes issuing-bank and country risk' },
          { text: 'Documents', calc: 'Invoice, BL, packing list, insurance, origin certificate — payment on compliant documents (UCP 600 Art. 15); discrepancies = refusal risk: pre-check documents' },
          { text: 'Cost', calc: 'LC + confirmation ≈ 0.75–1.5% of value — $3–6k on $400k; price it into the margin, or offer a discount for a confirmed LC vs D/A' },
        ],
        answer: 'The confirmation fee is the cheapest insurance in the ladder; the documentary principle makes compliance (not quality) the payment trigger.',
      },
      {
        title: 'Masala bond vs FCCB for an Indian issuer',
        given: ['Indian infra company needs $300m for 5 years; masala bonds quote 7.5% coupon; USD bonds at 6% (FX hedge cost ~2%/yr); FCCB at 2% coupon, conversion premium 30%'],
        steps: [
          { text: 'Masala bond', calc: '7.5% all-in in INR — FX risk stays with offshore investors; no hedge cost; if rupee depreciates, investor bears it (higher demanded coupon reflects it)' },
          { text: 'USD bond + hedge', calc: '6% + ~2% hedge ≈ 8% INR-equivalent — slightly worse, and hedge accounting adds volatility' },
          { text: 'FCCB', calc: '2% cash coupon — but dilution at 30% premium is the real cost; if the stock never converts, refinance risk at 2%→ market rates (the 2008 Yen-FCCB trap)' },
          { text: 'Decision frame', calc: 'Match cash-flow currency first (INR revenues → INR-denominated debt = masala), then weigh equity-option value (FCCB) vs certainty' },
        ],
        answer: 'Masala bonds win the currency-matching test; FCCB is an equity-linked bet; plain USD borrowing is a devaluation short.',
      },
    ],
    caseStudy: {
      title: 'Case — The 2008 yen-FCCB trap',
      body: [
        'Indian companies (real estate, infra) issued FCCBs in 2006–07 denominated in USD/CHF/JPY with 5-year maturities, betting stocks would double and convert the debt into equity. 2008: stocks crashed 60–80%; conversion impossible; simultaneously the rupee fell ~25%, ballooning the rupee cost of redemption; refinancing windows slammed shut. Companies restructured, sold assets, or failed; RBI eased refinancing norms as a systemic response.',
      ],
      questions: [
        'Name the three risks that compounded in one instrument.',
        'Why did the currency choice magnify the equity risk?',
        'Design rules for FCCB issuance going forward.',
      ],
      takeaways: [
        'FCCB stacked equity risk (conversion), FX risk (foreign-currency principal), and refinancing risk (bullet maturity) — each alone survivable, together fatal',
        'Conversion probability is correlated with the rupee cycle and the equity cycle (both peaked together) — the hedge you thought you had (equity conversion) disappears exactly when the currency loss appears',
        'Rules: issue in revenue-currency where possible (masala bonds); size the bullet to refinancable levels; structure put/calls conservatively; treat the FX leg as a separate explicit hedge decision',
        'Exam link: instruments carry bundled risks — unbundle (equity option + FX loan + maturity wall) before judging them',
      ],
    },
    revision: [
      'Euro-currency: offshore currency deposits; euro-credit: syndicated offshore loans',
      'Euro-bond: outside the currency\'s jurisdiction; ECP/NIF for short paper',
      'ADR (US, SEC 20-F, levels 1–3) vs GDR (Europe, lighter) — ratio fungibility',
      'FCCB = debt + equity option + FX exposure; masala = INR-denominated offshore',
      'ECB rules: all-in-cost caps, end-use, maturity floors',
      'Payment ladder: open account → D/P–D/A → LC (UCP 600) → advance',
      'LC parties and types; confirmation removes issuing-bank/country risk',
      'Documents, not goods, trigger payment — pre-check compliance',
      'Invoicing currency allocates FX risk between the parties',
      'Ind AS 21: closing/average rates; CTA to reserves',
      'DTAA exemption vs credit; transfer pricing; MIGA/ECGC political-risk cover',
    ],
    practice: [
      { q: 'Why does a confirming bank charge more than an advising bank?', a: 'Advising = transmission only (no payment obligation); confirmation = a second, independent payment undertaking — the confirming bank prices issuing-bank credit + country risk + its own capital: that fee IS an insurance premium.' },
      { q: 'Exporter invoices in INR to avoid hedging. Has risk vanished?', a: 'For the exporter, yes — but the importer now carries INR risk and will either demand a discount (passing the cost back) or hedge in a thinner market — invoicing currency shifts risk; markets reprice it back through the price.' },
      { q: 'An Indian subsidiary earns EUR; parent reports INR. Rate moves 83→87. What happens?', a: 'Subsidiary\'s EUR statements are untranslated (EUR is its functional currency); consolidation translates at closing rate: assets/liabilities restate, CTA reserve absorbs the difference — paper, not cash; net-investment hedge (EUR borrowing) can offset within reserve.' },
      { q: 'Walk an LC through: who pays first and against what?', a: 'The issuing bank pays the exporter\'s bank against COMPLIANT DOCUMENTS (bill of lading, invoice, inspection), not against goods. The bank\'s credit substitutes for the importer\'s - documents are everything.' },
      { q: 'Why would an Indian issuer pick a GDR over an ADR?', a: 'GDRs list in London/Luxembourg with lighter disclosure and cost than a US ADR Level III, suiting issuers not ready for SEC-grade reporting; ADRs buy deeper US liquidity at that price.' },
    ],
  },
];
