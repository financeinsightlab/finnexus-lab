import type { Lecture } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM F02 — Banking, Insurance and Financial System
   Unit-wise lectures: banking system → retail/wholesale → insurance
   → microfinance & financial services → technology in BFSI
   ═══════════════════════════════════════════════════════════════ */

export const bankingInsuranceLectures: Lecture[] = [
  {
    slug: 'introduction-banking-rbi-toolkit',
    number: 1,
    title: 'Introduction to Banking: System, Bank Types & the RBI Toolkit',
    minutes: 45,
    summary:
      'What a bank is and does, the structure of the Indian banking system, bank types, RBI as central bank, NBFCs in the shadow, and the money-policy toolkit — CRR, SLR, repo/reverse repo and open market operations.',
    status: 'live',
    objectives: [
      'Explain banking functions and how banks create money',
      'Map the Indian system: RBI, SBI, PSBs, private, small-finance, payments banks, NBFCs',
      'Compute CRR/SLR effects on lendable deposits',
      'Trace repo/OMO transmission to loan rates',
    ],
    sections: [
      {
        heading: '1. Banks, the system and its cast',
        body: [
          'A **bank** accepts deposits repayable on demand and lends them at maturity-transformed terms — paying savers liquidity while giving borrowers term. Core functions: payments, intermediation (savings → investment), maturity & size transformation, risk transformation (many small deposits fund few large loans), and **money creation**: a new loan credits a deposit — credit expands until reserve requirements and capital bind. Characteristics: high leverage, information businesses (screening + monitoring borrowers), regulated because failure is systemic (deposit insurance via DICGC up to ₹5 lakh per depositor per bank).',
          'The cast: **RBI** (central bank, banker to banks and government, monetary authority, regulator); **SBI & associates** lineage; **public-sector banks** (majority government), **private banks** (HDFC/ICICI/Axis class), **foreign banks**; **regional rural banks**; **small finance banks** (financial-inclusion mandate, 75% priority-sector), **payments banks** (deposits ≤ ₹2L/customer, no lending); **cooperative banks**; and **NBFCs** — lend and invest like banks but take NO demand deposits (vehicle, gold, microfinance, infra finance; now scale-based regulation after IL&FS/DHFL). Labelling matters for exams: payments banks can\'t lend; NBFCs can\'t take chequable deposits.',
        ],
        callout: {
          type: 'exam',
          text: 'The deposit-multiplier chain: ΔDeposit → [(1 − CRR − SLR-ish drain)/reserve drain] rounds of lending → multiplied deposits. Numericals usually assume a simple legal reserve ratio r: multiplier = 1/r; ₹10,000 cr new reserves at 4% ⇒ potential deposit creation ₹2,50,000 cr. State the assumption, show two rounds, then the limit.',
        },
      },
      {
        heading: '2. The RBI toolkit',
        body: [
          '**CRR** — cash reserve ratio: % of NDTL (net demand & time liabilities) banks must hold as cash WITH RBI: earns no interest; a pure monetary lever (raise CRR → banks park more → less to lend). **SLR** — statutory liquidity ratio: % of NDTL in liquid assets (cash, gold, G-secs) held BY the bank: earns returns but locks lendable funds and guarantees a G-sec buyer base. **Repo rate** — RBI lends overnight to banks against G-secs (the policy rate in the LAF corridor); **reverse repo / SDF** — RBI absorbs liquidity. **Bank rate** — penal/refinance rate, now penalty-linked. **OMO** — outright G-sec purchases (inject durable liquidity) or sales (absorb); **VRR/VRRR auctions** fine-tune. **Transmission**: repo cut → MCLR/EBLR resets (external benchmarks reprice faster: ~1-month repo links vs 1-year MCLR lags) → EMI and corporate borrowing costs move → investment and demand. Impairments: bank balance-sheet stress, risk premia and credit demand weakness blunt the pass-through.',
          'Why the toolkit matters to a finance major: policy rates set the risk-free curve; every DCF (F06) and WACC inherits it. To the BA minor: CRR/SLR/repo are the strongest exogenous variables in any credit-growth model.',
        ],
        bullets: [
          'Bank = deposits (demand) + loans (term): maturity transformation at core',
          'Money creation: loans create deposits; multiplier = 1/r under simple assumptions',
          'CRR: cash at RBI, zero yield · SLR: liquid assets at bank, yields but locks funds',
          'Repo = policy rate; LAF corridor; OMO = durable liquidity',
          'EBLR-linked loans reprice in ~3 months; MCLR lags ~6–12',
          'NBFC: no demand deposits; payments banks: deposits but no lending',
        ],
      },
    ],
    diagram: {
      title: 'The RBI toolkit and transmission',
      caption: 'Policy rate and reserve ratios act on bank lendable funds; OMOs act on system liquidity; both reprice credit and then the real economy.',
      svg: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RBI monetary policy transmission">
  <defs><marker id="ba" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="16" y="85" width="150" height="60" rx="10" fill="#fef9c3"/><text x="91" y="107" fill="#713f12" font-weight="600">RBI</text><text x="91" y="123" fill="#a16207">repo · CRR · SLR</text><text x="91" y="137" fill="#a16207">OMO / LAF</text>
    <rect x="216" y="85" width="150" height="60" rx="10" fill="#e0f2fe"/><text x="291" y="107" fill="#0c4a6e" font-weight="600">Bank funds</text><text x="291" y="123" fill="#075985">lendable deposits</text><text x="291" y="137" fill="#075985">cost of funds</text>
    <rect x="416" y="85" width="150" height="60" rx="10" fill="#dcfce7"/><text x="491" y="107" fill="#14532d" font-weight="600">Lending rates</text><text x="491" y="123" fill="#166534">MCLR / EBLR</text><text x="491" y="137" fill="#166534">credit growth</text>
    <rect x="600" y="85" width="110" height="60" rx="10" fill="#fee2e2"/><text x="655" y="107" fill="#7f1d1d" font-weight="600">Economy</text><text x="655" y="123" fill="#991b1b">EMIs · capex</text><text x="655" y="137" fill="#991b1b">demand</text>
    <line x1="166" y1="115" x2="214" y2="115" stroke="#475569" stroke-width="1.5" marker-end="url(#ba)"/>
    <line x1="366" y1="115" x2="414" y2="115" stroke="#475569" stroke-width="1.5" marker-end="url(#ba)"/>
    <line x1="566" y1="115" x2="598" y2="115" stroke="#475569" stroke-width="1.5" marker-end="url(#ba)"/>
    <text x="360" y="40" fill="#475569">transmission lag: EBLR ~3 months · MCLR 6–12 · real economy 2–4 quarters</text>
    <text x="360" y="200" fill="#475569">CRR ↑ pulls lendable funds now · repo ↑ reprices marginal funds · OMO changes durable liquidity</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Deposit multiplier', expr: 'D_max = New reserves × (1/r)', meaning: 'Simple money-creation limit' },
      { name: 'Lendable deposits', expr: 'NDTL × (1 − CRR − SLR)', meaning: 'Funds actually available to lend' },
      { name: 'NDTL', expr: 'Demand + time deposits − interbank net', meaning: 'The base CRR/SLR apply to' },
    ],
    examples: [
      {
        title: 'CRR/SLR squeeze in numbers',
        given: ['Bank NDTL ₹1,00,000 cr; CRR 4%, SLR 18%'],
        steps: [
          { text: 'CRR', calc: '₹4,000 cr cash at RBI — dead money, zero interest' },
          { text: 'SLR', calc: '₹18,000 cr in G-secs/gold — earns ~7%, but not lendable to customers' },
          { text: 'Lendable', calc: '₹1,00,000 × (1 − .04 − .18) = ₹78,000 cr for loans (before capital and priority-sector earmarks)' },
          { text: 'Policy shock', calc: 'CRR +50 bps ⇒ ₹500 cr moves from lending to RBI — small per bank, system-wide ₹60,000+ cr of lendable funds at ~₹120 lakh-cr NDTL scale' },
        ],
        answer: 'Reserve ratios are blunt, instant and interest-blind — the reason RBI prefers repo for fine-tuning and CRR for large statements.',
      },
      {
        title: 'Money creation, two rounds and the limit',
        given: ['New deposit ₹10,000 cr; reserve requirement 10%; borrowers redeposit fully'],
        steps: [
          { text: 'Round 1', calc: 'Lend 9,000 → redeposited → deposits now 19,000' },
          { text: 'Round 2', calc: 'Lend 8,100 → deposits 27,100' },
          { text: 'Limit', calc: '10,000 × 1/0.10 = ₹1,00,000 cr total deposits — ₹90,000 cr of new credit-money created' },
          { text: 'Reality check', calc: 'Cash leakage, capital requirements and credit demand shrink the real multiplier — the identity is a ceiling, not a forecast' },
        ],
        answer: 'Loans create deposits; the multiplier is arithmetic telling you the system\'s maximum, not the economy\'s behaviour.',
      },
    ],
    caseStudy: {
      title: 'Case — Demonetisation month: deposits spike, credit does not',
      body: [
        'November 2016: ₹500/₹1,000 notes return to banks; deposit liabilities surge by ~₹3 lakh cr in weeks. With CRR 4% and SLR ~20.5%, lendable capacity jumped by the (1−.04−.205) share of the inflow.',
        'Yet bank credit growth FELL in the following months — the multiplier ceiling was raised while credit demand collapsed (cash-dependent businesses stalled).',
      ],
      questions: [
        'Why did lendable capacity and actual credit move in opposite directions?',
        'What did banks do with the surplus?',
        'Which toolkit variable would you have adjusted? Why?',
      ],
      takeaways: [
        'The multiplier is a ceiling set by regulation; actual credit is set by demand, risk appetite and capital — capacity ≠ lending',
        'Surplus flowed into G-secs and reverse-repo (SLR assets) — yields fell sharply; the "liquidity" never reached SMEs',
        'Policy lesson: repo/CRR act on supply of funds; reviving credit demand needs transmission plus confidence — a distinction central banks live by',
        'Exam link: deposits ↑ with credit flat proves money creation requires willing borrowers, not just reserves',
      ],
    },
    revision: [
      'Bank functions: payments, intermediation, maturity/size/risk transformation',
      'Loans create deposits; simple multiplier 1/r; real multiplier smaller',
      'CRR (cash at RBI, no yield) vs SLR (liquid assets at bank, yields, locks funds)',
      'NDTL is the base; lendable = NDTL×(1−CRR−SLR)',
      'Repo = policy rate in LAF; OMO = durable liquidity; bank rate = penal',
      'EBLR transmits ~3 months; MCLR 6–12 months',
      'Payments banks: no lending · NBFCs: no demand deposits',
      'SFB: 75% priority sector · DICGC cover ₹5 lakh/depositor',
    ],
    practice: [
      { q: 'RBI cuts repo 50 bps. Which loan reprices first and why?', a: 'EBLR-linked retail loans (repo-linked from Oct 2019 mandate) — reset within ~3 months; MCLR-linked corporate books reprice as their 1-year MCLR resets over 6–12 months; fixed-rate loans only on refinance.' },
      { q: 'Why does raising SLR hit banks less than raising CRR?', a: 'SLR assets earn G-sec yields (~7%); CRR earns nothing. SLR still shrinks lendable funds, but profitability survives — CRR is a pure tax on the balance sheet.' },
      { q: 'Can an NBFC create money like a bank?', a: 'No — money creation runs through the payments/deposit system. NBFC lending transfers existing deposits; only banks credit new deposits when they lend.' },
      { q: 'Deposits are Rs 1,00,000 crore, CRR 4 percent, SLR 18 percent. How much is lendable and what does each drain earn?', a: 'CRR parks Rs 4,000 crore as cash with the RBI earning nothing; SLR invests Rs 18,000 crore in approved securities earning interest. Lendable resources = Rs 78,000 crore - CRR is the costly one.' },
      { q: 'The RBI raises repo from 6.5 to 6.75 percent. Trace the transmission to a home-loan EMI.', a: 'RBI borrowing costs rise, so banks reprice MCLR-linked lending rates upward within a quarter, and floating-rate EMIs rise (or tenors stretch). Transmission speed depends on loan mix - floating rates pass through faster than fixed.' },
    ],
  },
  {
    slug: 'retail-wholesale-banking-products',
    number: 2,
    title: 'Retail & Wholesale Banking: Products and Customers',
    minutes: 40,
    summary:
      'The product shelf on both sides of the bank: savings/current/fixed deposits, lending products from personal loans to project finance, treasury, trade finance and forex, and the behavioural profiles of retail versus corporate customers.',
    status: 'live',
    objectives: [
      'Classify deposit and lending products by purpose, pricing and risk',
      'Explain the treasury function and trade-finance instruments',
      'Contrast retail and corporate customer behaviour and economics',
      'Compute a simple loan yield and deposit cost',
    ],
    sections: [
      {
        heading: '1. Deposits and lending products',
        body: [
          '**Deposits**: savings (3–4%, liquidity, limits on withdrawals), current (no interest, business operating accounts — the CASA base banks crave), fixed/term (tenor-priced, penalty on early break), recurring (goal savings). **CASA ratio** = (current+savings)/total deposits — the cheap-funds metric; a 45% CASA bank funds loans ~1.5–2% cheaper than a 25% CASA peer — the core of Indian retail-bank margins.',
          '**Lending**: retail — home (long tenor, collateral, teaser vs standard rates), vehicle, education, personal (unsecured, 12–24%), credit cards (revolving, 36–42% APR), gold (LTV ≤ 75–85% by RBI rules); and business — working capital (cash credit/OD against stock & debtors, drawing-power discipline), term loans (project finance, DSCR-gated — links to PGDM 301), bill discounting, LC/bank guarantees (fee income, contingent liability). Pricing = cost of funds + operating cost + credit premium + capital charge + margin (MCLR/EBLR + spread). The yield story: a 9% home loan and a 42% credit card sit on the same balance sheet — risk-based pricing in action.',
        ],
        callout: {
          type: 'exam',
          text: 'Compare-and-contrast banks\' four income sources: (1) NII = interest income − interest expense (margin business), (2) fees & commissions (LC, remittance, third-party distribution — no balance-sheet use), (3) treasury gains (investment book mark-to-market), (4) trading. Examiners love asking why fee income is "capital-light" vs why NII consumes capital through credit risk.',
        },
      },
      {
        heading: '2. Treasury, trade finance and customer behaviour',
        body: [
          '**Treasury** manages the bank\'s own liquidity and investments: ALM desk (matching asset/liability maturity buckets — the gap report), investment book (G-secs to SLR and beyond; AFS/HFT/HTM classification), forex desk (spot/forward positions, RBI position limits), and money-market desk (call, repo, CP/CD). **Trade & forex products**: LC (bank pays on documents — documentary credit; UCP 600 rules), bank guarantee, collection/bills, buyer\'s/supplier\'s credit, forward contracts and options for exporters/importers (F05 Unit 5 links). Trade finance earns fees with short self-liquidating risk — historically the safest credit class.',
          '**Customer behaviour**: retail — granular (law of large numbers smooths risk), sticky relationships, price-insensitive in emergencies, driven by convenience and trust, cross-sell economics (a customer with 3+ products rarely churns); corporate — lumpy exposures, negotiated pricing (the best credits bypass banks for CP/bonds — disintermediation), information-sophisticated, relationship = mandates + treasury business. Behavioural profile drives product design: retail wants speed and apps; corporate wants limits, structures and sector expertise. For the BA minor: retail banking is the analytics playground (default scoring, next-best-action, churn — BA04/BA05 link).',
        ],
        bullets: [
          'CASA = cheap funds; high CASA = structural margin advantage',
          'Yield ladder: home 8–9% · MSME 11–14% · personal 12–24% · cards 36–42%',
          'Working capital: drawing power vs sanctioned limit — lend against current assets',
          'LC/BG = fee income + contingent liability; trade risk is self-liquidating',
          'Treasury = ALM (gap report) + investments + forex + money markets',
          'Retail = granular/sticky; corporate = lumpy/negotiated/disintermediating',
        ],
      },
    ],
    diagram: {
      title: 'The bank product shelf and its risk gradient',
      caption: 'Deposits fund a lending ladder of rising risk and yield; fees and treasury income ride on top without balance-sheet use.',
      svg: `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bank products risk yield ladder">
  <g font-family="inherit" font-size="11" text-anchor="middle">
    <rect x="20" y="30" width="180" height="170" rx="10" fill="#e0f2fe"/>
    <text x="110" y="52" fill="#0c4a6e" font-weight="600">DEPOSITS (funding)</text>
    <text x="110" y="74" fill="#075985">current — 0%</text>
    <text x="110" y="94" fill="#075985">savings — 3%</text>
    <text x="110" y="114" fill="#075985">FD 1y — 6.5–7.5%</text>
    <text x="110" y="134" fill="#075985">recurring — goal saving</text>
    <text x="110" y="164" fill="#0c4a6e" font-size="10">CASA ratio = cheap funds</text>
    <rect x="260" y="176" width="140" height="26" fill="#dcfce7"/><text x="330" y="193" fill="#14532d">home 8–9%</text>
    <rect x="260" y="144" width="140" height="26" fill="#bbf7d0"/><text x="330" y="161" fill="#166534">vehicle 9–11%</text>
    <rect x="260" y="112" width="140" height="26" fill="#fef9c3"/><text x="330" y="129" fill="#713f12">MSME 11–14%</text>
    <rect x="260" y="80" width="140" height="26" fill="#fed7aa"/><text x="330" y="97" fill="#9a3412">personal 12–24%</text>
    <rect x="260" y="48" width="140" height="26" fill="#fee2e2"/><text x="330" y="65" fill="#7f1d1d">cards 36–42%</text>
    <text x="330" y="34" fill="#334155" font-weight="600">LENDING (risk ↑ yield ↑)</text>
    <rect x="470" y="48" width="230" height="80" rx="10" fill="#ede9fe"/>
    <text x="585" y="70" fill="#4c1d95" font-weight="600">FEE &amp; TREASURY</text>
    <text x="585" y="90" fill="#5b21b6">LC · BG · remittance · distribution</text>
    <text x="585" y="108" fill="#5b21b6">ALM · G-sec book · forex</text>
    <text x="585" y="126" fill="#5b21b6">capital-light income</text>
    <text x="530" y="176" fill="#475569">trade finance: fees +</text>
    <text x="530" y="192" fill="#475569">self-liquidating risk</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'NIM', expr: 'Net interest income / average earning assets', meaning: 'The margin business scoreboard' },
      { name: 'CASA ratio', expr: '(Current + Savings) / Total deposits', meaning: 'Cheap-funding advantage' },
      { name: 'Loan pricing build-up', expr: 'Rate = cost of funds + opex + credit premium + capital charge + margin', meaning: 'Why loans cost what they cost' },
    ],
    examples: [
      {
        title: 'Price a ₹30-lakh home loan and a card balance',
        given: ['Bank cost of funds 6.2%; home loan: opex 0.4%, credit premium 0.2%, capital+margin 0.8%; card: opex 2.5%, credit premium 8%, capital+margin 5%'],
        steps: [
          { text: 'Home loan', calc: '6.2 + 0.4 + 0.2 + 0.8 ≈ 7.6% → market forces ~8.5–9% with risk weight and tenor add-ons' },
          { text: 'Credit card', calc: '6.2 + 2.5 + 8.0 + 5.0 = 21.7% → plus revolve risk and rewards cost lands at 36–42% APR' },
          { text: 'Economics', calc: 'The card book\'s 15-point premium buys defaults (3–5%), rewards (1.5–2%) and fraud — residual is the real margin' },
          { text: 'Strategic read', calc: 'Secured books scale cheaply (home); unsecured books earn richly but consume capital (risk weight 125% vs 35% LTV-mortgage) — portfolios blend both' },
        ],
        answer: 'Same bank, same funds, 30-point rate gap: risk, opex and capital — not greed — build the price.',
      },
      {
        title: 'Drawing-power check on a working-capital account',
        given: ['MSME: stock ₹80L (paid), debtors ₹60L (≤90 days), creditors ₹30L; margin norms 25% stock, 40% debtors'],
        steps: [
          { text: 'Paid stock', calc: '₹80L is stated as paid → eligible 75% = ₹60L' },
          { text: 'Debtors', calc: 'eligible 60% × 60L = ₹36L' },
          { text: 'DP', calc: '60 + 36 − creditors not deducted here → DP = ₹96L (creditors-adjusted: deduct unpaid stock portion if included)' },
          { text: 'Sanction vs DP', calc: 'Limit ₹1 cr but DP ₹96L → bank funds ₹96L max this month; DP moves monthly with the current-asset statement — the banker\'s rolling collateral check' },
        ],
        answer: 'Working capital is lent against circulating assets, reassessed monthly by drawing power — structurally self-liquidating.',
      },
    ],
    caseStudy: {
      title: 'Case — The CASA moat: two banks, one repo cycle',
      body: [
        'Bank K: CASA 46%, cost of deposits 4.8%. Bank L: CASA 24%, cost of deposits 6.4%. Both lend to the same home-loan market at ~9%. RBI hikes repo 250 bps over a year; FD rates reprice up fastest.',
        'Bank L\'s NIM compresses from 3.4% to 2.6% as its deposit book reprices; Bank K\'s NIM moves 3.9% → 3.7% (savings rates moved only 50–200 bps).',
      ],
      questions: [
        'Why did the same policy shock hit L harder?',
        'Which behaviours build CASA, and at what cost?',
        'What should L\'s CFO do?',
      ],
      takeaways: [
        'CASA is a natural hedge: savings rates are admin-set and sticky; FD-led funding reprices at market speed — the margin gap between K and L IS the CASA difference',
        'CASA is built retail-behaviourally: payroll accounts, app experience, branch geography, product bundles — purchased reluctantly with rate cuts (savings rate cuts are unpopular and fast-copied)',
        'L\'s options: retail deposit franchise investment (slow), fee/treasury income mix shift, or accept structurally lower NIM with tighter credit costs',
        'Analyst rule: read CASA before NIM — the ratio explains margin durability across rate cycles',
      ],
    },
    revision: [
      'Deposits: current (0%) / savings / FD / recurring; CASA = cheap funds',
      'Lending ladder: home < vehicle < MSME < personal < cards (8% → 42%)',
      'Rate = CoF + opex + credit premium + capital charge + margin',
      'Working capital: drawing power from stock (75%) + debtors (60%) norms',
      'LC/BG: fees + contingent liabilities; UCP 600 governs documentary credit',
      'Treasury: ALM gap report, G-sec book (AFS/HFT/HTM), forex desk',
      'Retail: granular, sticky, cross-sell; corporate: lumpy, negotiated, disintermediating',
      'NIM = NII / earning assets; CASA drives NIM durability',
    ],
    practice: [
      { q: 'Why do banks push salary accounts so hard?', a: 'Payroll anchors the CASA base: balances sit at near-zero cost, cross-sell (mutual fund distribution, cards, loans) rides the relationship, and churn collapses — the cheapest deposits are behavioural, not rate-bought.' },
      { q: 'A top-rated corporate asks for a loan at 7.2%. Why might the bank refuse?', a: 'Below cost of funds + capital charge: at ~6.5% CoF the margin cannot cover opex + capital. The corporate belongs in the bond/CP market at 7.2% — disintermediation of the best credits is structural.' },
      { q: 'Credit card at 42% or home loan at 9%: which is more profitable per rupee of capital?', a: 'Depends on risk-weighted return: card RAROC ≈ (42% − funding 6.5% − defaults 4% − rewards 2% − opex 8%) / capital (125% RW × 9% CAR) can exceed 100%+; home loans earn ~3–4% spread on 35% RW capital. Per rupee of capital, cards usually win — per rupee of risk, home loans do.' },
      { q: 'Depositors want deposits back anytime; home-loan borrowers want 20 years. What resolves this clash, and what is its risk?', a: 'Maturity transformation: banks pool liquid short deposits into illiquid long loans. The risk is a run - all deposits claimed at once - which is why deposit insurance, LCR norms and the RBI lender-of-last-resort role exist.' },
      { q: 'What does a bank treasury actually do with the gap between deposits and loans?', a: 'It manages the residual: invests surplus in money market and SLR securities, funds deficits via call money and repo, runs the ALM book (duration gaps), and handles forex and trading positions - the bank\'s own balance-sheet desk.' },
    ],
  },
  {
    slug: 'insurance-principles-pricing',
    number: 3,
    title: 'Principles & Practices of Insurance: Risk to Premium',
    minutes: 45,
    summary:
      'Risk and how insurance transforms it; the legal principles (utmost good faith, insurable interest, indemnity, subrogation, contribution, proximate cause); life vs general products; costing and pricing of premiums; underwriting; conditions and warranties; loan amortisation as the allied financial arithmetic.',
    status: 'live',
    objectives: [
      'State the six legal principles with one example each',
      'Separate life (benefit) from general (indemnity) contracts',
      'Price a premium: expected loss + loading + expenses',
      'Explain underwriting, conditions, warranties and the actuarial loop',
    ],
    sections: [
      {
        heading: '1. Risk and the principles that make insurance work',
        body: [
          'Insurance converts **pure risk** (chance of loss, no gain) into a priced pooling arrangement: the insurer aggregates many homogeneous exposures, and the **law of large numbers** makes aggregate claims predictable — the risk is transferred, diversified, and (for the insurer) a business of float and discipline. Products: **life insurance** (term, endowment, ULIP, whole-life, annuities — benefit contracts: pay the SUM ASSURED on the event, no indemnity limit) and **general insurance** (fire, motor, health, marine, liability — indemnity contracts: restore the insured to pre-loss position, no profit from loss). Reinsurance spreads the insurer\'s own tail (treaty vs facultative).',
          'The six **principles** — exam gold: (1) **Utmost good faith (uberrimae fidei)** — the proposer must disclose all material facts; non-disclosure voids the claim (life proposals, health history). (2) **Insurable interest** — the insured must lose financially (own the car, the life insured\'s relationship); life: at inception; general: at claim (marine exception). (3) **Indemnity** — compensation = actual loss only (general); life is the exception (fixed benefit). (4) **Subrogation** — after paying, the insurer inherits the insured\'s rights against the wrongdoer (recover from the erring driver). (5) **Contribution** — multiple policies on the same risk share the loss proportionately (no double recovery). (6) **Proximate cause** — the nearest effective cause of loss must be covered (a storm drives a car into flood — which peril applies?).',
        ],
        callout: {
          type: 'exam',
          text: 'Definition one-liners: UNDERWRITING = selecting and classifying risks and pricing them (not just signing); ACTUARY = prices expected losses with mortality/morbidity tables + interest; PREMIUM = expected loss + loading (expenses, commission, profit, risk margin); WARRANTY = a condition the breach of which voids cover (strict); CONDITION = policy term governing claims process (e.g., 30-day notice). Life = benefit; general = indemnity. Subrogation + contribution prevent PROFIT from insurance.',
        },
      },
      {
        heading: '2. Costing, pricing, underwriting and amortisation arithmetic',
        body: [
          '**Costing** (the actuary): expected claim cost = frequency × severity (general) or mortality rate × sum assured discounted at the investment yield (life): net premium = Σ(prob × payout discounted). **Pricing**: gross premium = net premium + expenses (acquisition commission 5–15%, admin) + risk margin + profit loading; in India, IRDAI caps certain expense ratios and mandates standard products (e.g., Arogya Sanjeevani). Experience loops: actual vs expected claims (loss ratio = claims/premium; combined ratio = claims + expenses/premium — >100% = underwriting loss, the US-P&C discipline) reprice the next cycle.',
          '**Underwriting** in practice: classify (age, health, occupation, driving record, construction of building), price the class, impose extra premium or exclusions, decline the uninsurable — the anti-selection defence (if you price everyone at average, the bad risks buy and good risks walk). **Conditions & warranties** in policies: conditions precedent (claim documentation, notice periods), warranties (strict compliance — breach voids even if unrelated to the loss, e.g., burglar-alarm warranty); IRDAI has been softening unfair warranty clauses via standardisation. **Loan amortisation** (the allied arithmetic, links lecture 2): EMI = PMT structure; early EMIs are interest-heavy — a 20-year loan at 9% pays ~57% of total interest in the first 7 years — which is exactly why insurance-protected loans (decreasing cover matching the outstanding balance) exist.',
        ],
        bullets: [
          'Pure risk pooled; law of large numbers → predictable aggregate',
          'Life = benefit (sum assured); general = indemnity (actual loss)',
          'Six principles: disclosure, insurable interest, indemnity, subrogation, contribution, proximate cause',
          'Premium = expected loss + expenses + risk margin + profit',
          'Loss ratio / combined ratio close the pricing loop',
          'Warranty breach = void (strict); condition breach = disputes, not automatic void',
          'Decreasing term cover should track the amortisation curve',
        ],
      },
    ],
    diagram: {
      title: 'The insurance value loop',
      caption: 'Premiums in, invested; claims out; the loop between actuarial pricing and claims experience reprices next year.',
      svg: `<svg viewBox="0 0 720 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Insurance pricing loop">
  <defs><marker id="ib" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="60" width="150" height="56" rx="10" fill="#e0f2fe"/><text x="95" y="82" fill="#0c4a6e" font-weight="600">Many insureds</text><text x="95" y="98" fill="#075985">pay premiums</text>
    <rect x="220" y="60" width="150" height="56" rx="10" fill="#fef9c3"/><text x="295" y="82" fill="#713f12" font-weight="600">Insurer pool</text><text x="295" y="98" fill="#a16207">+ investment float</text>
    <rect x="420" y="60" width="150" height="56" rx="10" fill="#fee2e2"/><text x="495" y="82" fill="#7f1d1d" font-weight="600">Claims paid</text><text x="495" y="98" fill="#991b1b">frequency × severity</text>
    <rect x="220" y="160" width="350" height="48" rx="10" fill="#dcfce7"/><text x="395" y="180" fill="#14532d" font-weight="600">Actuarial loop: loss ratio · combined ratio → reprice</text><text x="395" y="196" fill="#166534">underwriting tightens or loosens class by class</text>
    <line x1="170" y1="88" x2="218" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#ib)"/>
    <line x1="370" y1="88" x2="418" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#ib)"/>
    <line x1="495" y1="116" x2="495" y2="158" stroke="#475569" stroke-width="1.5" marker-end="url(#ib)"/>
    <line x1="220" y1="184" x2="95" y2="120" stroke="#475569" stroke-width="1.5" marker-end="url(#ib)"/>
    <text x="360" y="40" fill="#475569">premium = expected loss + expenses + risk margin + profit</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Expected loss', expr: 'EL = frequency × severity', meaning: 'General-insurance costing core' },
      { name: 'Gross premium', expr: 'Net premium × (1 + expense & profit loading)', meaning: 'What the policyholder pays' },
      { name: 'Loss / combined ratio', expr: 'Claims/Premium · (Claims+Expenses)/Premium', meaning: 'Underwriting profitability' },
      { name: 'EMI', expr: 'EMI = P·r·(1+r)ⁿ/[(1+r)ⁿ − 1]', meaning: 'Amortisation payment' },
    ],
    examples: [
      {
        title: 'Price a motor own-damage portfolio',
        given: ['10,000 cars, SI ₹8L each; expected accident frequency 4%; average repair severity ₹60,000; total-loss (write-off) 0.4% of cars at SI; expenses 20% of premium; profit/risk margin 5%'],
        steps: [
          { text: 'Frequency losses', calc: '0.04 × 10,000 × 60,000 = ₹2.4 cr' },
          { text: 'Total losses', calc: '0.004 × 10,000 × 8,00,000 = ₹3.2 cr' },
          { text: 'Expected claims', calc: '₹5.6 cr → net premium/policy = ₹5,600' },
          { text: 'Gross premium', calc: '5,600 × 1.25 = ₹7,000 (loading 25%) — before no-claim-bonus discounts; loss ratio target 75–80% makes this a healthy motor book' },
        ],
        answer: 'Costing is frequency × severity; pricing adds the loadings; the loss ratio next year tells you if the assumptions held.',
      },
      {
        title: 'Term cover with an amortisation twist',
        given: ['Borrower 32, home loan ₹50L, 20 yrs, 9%; term cover quote ₹12,000/yr for ₹1 cr to age 72'],
        steps: [
          { text: 'Amortisation reality', calc: 'Outstanding balance falls on a curve: ₹50L → ~₹39L at yr 10 → ~₹0 at yr 20 (early EMIs 78% interest)' },
          { text: 'Cover matching', calc: 'Decreasing term ₹50L (matching balance) costs ~40% less than level ₹1 cr — but leaves family income unprotected after the loan ends' },
          { text: 'Human-capital view', calc: 'At 32 with ₹12L income, need ≈ 10–12× income = ₹1.2–1.4 cr total; loan cover is only one component' },
          { text: 'Recommendation', calc: 'Level ₹1 cr term (cheap at 32) covers loan AND income — insurance follows liabilities plus dependants, not just the bank\'s exposure' },
        ],
        answer: 'The bank wants decreasing cover; the family wants human capital replaced — price both, explain the difference.',
      },
    ],
    caseStudy: {
      title: 'Case — The non-disclosure that voided a ₹40-lakh claim',
      body: [
        'A proposer for health insurance did not disclose pre-existing hypertension and an earlier hospitalisation. Two years later, a stroke claim of ₹40 lakh is filed. The insurer repudiates citing violation of utmost good faith; IRDAI\'s ombudsman examines whether the insurer asked the right questions and whether non-disclosure was material.',
        'The claim is denied on material non-disclosure — but new IRDAI standardisation now limits insurers that did not conduct proper medical underwriting at entry.',
      ],
      questions: [
        'Why does uberrimae fidei bite harder in insurance than in ordinary contracts?',
        'What difference would the moratorium period (8 years under recent norms) have made?',
        'How should the underwriting process have de-risked both parties?',
      ],
      takeaways: [
        'The insurer cannot inspect the insured\'s body/life as a buyer inspects goods — asymmetric information is structural, hence disclosure is a condition of the contract itself',
        'Moratorium/freeze clauses (credit: health policies after 8 years of continuous cover) prevent late repudiation for old non-disclosures — regulation shifting risk to better entry underwriting',
        'Right process: entry medicals for high SI, questionnaires that ASK specifically (generic questions fail in ombudsman rulings), and documented underwriting',
        'Practical lesson for analysts: non-disclosure litigation risk is an insurance-company credit issue — repudiation ratios and claim-pending ratios are stock-analysis metrics',
      ],
    },
    revision: [
      'Pure risk → pooling → law of large numbers',
      'Life = benefit contract; general = indemnity (restore, not profit)',
      'Principles: utmost good faith · insurable interest · indemnity · subrogation · contribution · proximate cause',
      'EL = frequency × severity; premium = net + loading (expenses, commission, margin)',
      'Loss ratio, combined ratio (>100% = underwriting loss)',
      'Underwriting = classify, price, accept/decline — anti-selection defence',
      'Warranty (strict) vs condition (procedural)',
      'EMI: early payments interest-heavy → decreasing term matches balance',
      'Reinsurance: treaty (portfolio) vs facultative (single risk)',
    ],
    practice: [
      { q: 'An insured recovers from the third party after being indemnified by the insurer. Who keeps the money?', a: 'The insurer — subrogation: post-claim, rights against the wrongdoer transfer up to the claim paid; the insured cannot be indemnified twice (contribution/subrogation prevent profit).' },
      { q: 'Why can\'t life insurance be indemnity-based?', a: 'Life has no measurable market value — loss is not restorable. Hence fixed sum assured (benefit contract); the indemnity principle and its companions (subrogation, contribution) apply to general insurance.' },
      { q: 'Loss ratio 68%, expense ratio 31%. Assess.', a: 'Combined ratio 99% — barely profitable underwriting; investment income on the float is the profit engine. If combined goes 104%, the book is losing money before investments — reprice or tighten underwriting.' },
      { q: 'Expected claim cost is Rs 4,000 per policy. Why is the premium Rs 4,600 and not Rs 4,000?', a: 'Loadings: administrative expense, commission, contingency margin and the cost of capital. Pure premium covers expected loss; loaded premium keeps the insurer solvent when claims run above expectation.' },
      { q: 'A factory insured for Rs 5 crore burns down with actual loss Rs 3.2 crore. Indemnity pays what - and why does life insurance not work this way?', a: 'Indemnity pays Rs 3.2 crore - restore, do not profit. Life cover pays the full sum assured because life is not measurable value, so life contracts are benefit contracts, not indemnity.' },
    ],
  },
  {
    slug: 'microfinance-financial-services',
    number: 4,
    title: 'Microfinance, Merchant Banking, Leasing, VC & Credit Ratings',
    minutes: 45,
    summary:
      'The financial-services ecosystem beyond the bank: microfinance and SHG-bank linkage, merchant banking and issue management, leasing vs hire purchase, venture capital economics, the credit-rating agencies\' craft, and the retail-finance landscape.',
    status: 'live',
    objectives: [
      'Trace microfinance evolution: SHG–bank linkage to NBFC-MFIs and JLGs',
      'Detail merchant bankers\' role in issue management',
      'Distinguish leasing from hire purchase and price each',
      'Explain VC fund economics and read a credit rating',
    ],
    sections: [
      {
        heading: '1. Microfinance and the inclusion stack',
        body: [
          '**Microfinance** serves households outside bank credit\'s reach — small tickets (₹10k–₹80k, now regulated by RBI\'s 2024 MFI directions), no collateral, group-based enforcement. Evolution: **SHG–Bank Linkage Programme** (NABARD, 1992 — 10–20 women save internally, bank lends to the group; the group\'s social capital is the collateral) → Grameen-style **Joint Liability Groups (JLG)** adopted by NBFC-MFIs (individual loans cross-guaranteed by 5–7 members) → microfinance crisis 2010 (Andhra Pradesh: coercive recovery, multiple lending, borrower suicides → regulation) → today\'s scale-based MFI regime with pricing caps (base-rate-linked), household-income caps, and portfolio-at-risk discipline. The deep insight: peer selection and peer enforcement substitute for collateral — repayment rates above 95% at scale.',
          '**Merchant banking & issue management** (SEBI-registered): managing public issues end-to-end — due diligence, DRHP drafting, pricing (book building — links PGDM 302/F04), underwriting (firm vs best-efforts), syndication, listing compliance. Their certificate = credibility: the merchant banker vouches for disclosure quality. **Leasing vs hire purchase**: lease = lessor owns, lessee uses against rentals (operating lease = short, on-balance-sheet for lessee under Ind AS 116 now; financial lease = substance transfer); hire purchase = hirer buys on instalments, ownership transfers on the last payment; tax history (depreciation claims) shaped the Indian market. **Venture capital**: funds institutional money into early-stage, high-risk, high-upside ventures (PGDM 301 Unit 2 links: staging, syndication, convertible instruments, dilution arithmetic); economics = 2/20 (management 2%, carry 20% over hurdle 8%), J-curve, 7–10-year closed-end lives.',
        ],
        callout: {
          type: 'exam',
          text: 'Rating-symbol ladder, verbatim: AAA (highest safety) · AA (high) · A (adequate) · BBB (moderate — lowest investment grade) · BB and below (speculative/junk: vulnerable to default) with +/− modifiers; C = high risk, D = default. Ratings are opinions on PROBABILITY OF DEFAULT on the specific instrument, not buy recommendations; agencies: CRISIL, ICRA, CARE, India Ratings (Fitch), plus specialised SME/infra raters. For bank loans: Basel AAA to BB mapped risk weights.',
        },
      },
      {
        heading: '2. Credit ratings craft and retail finance',
        body: [
          '**How agencies rate**: quantitative (coverage ratios, leverage, liquidity, profitability, cash-flow adequacy) + qualitative (industry, management, group support, governance, liquidity backstops) → committee decision → surveillance (watchouts, upgrades/downgrades). Ratings move ratings-market prices: a downgrade to junk forces institutional exit (mandate clauses) — the 2018 IL&FS lesson of cliff effects. Rating ≠ guarantee: AAA issuers default rarely but not never; D arrives after the fact (information lags).',
          '**Retail finance** maps the household balance sheet: home and LAP (secured), vehicle, education, personal, cards, consumer durable/Buy-Now-Pay-Later, gold, micro-loans — underwritten by **bureau scores** (CIBIL 300–900; 750+ prime), income proxies, and alternate data (links Unit 5 fintech). The BA link: scorecards are the classic analytics product (logistic regression on default probability — BA03/BA04 territory); the finance link: securitisation pools these assets into pass-through certificates. Across the whole unit, one thread: every service here exists because banks alone cannot underwrite every risk — specialisation + information technology fills the gaps.',
        ],
        bullets: [
          'SHG: group savings → bank lends to group (NABARD 1992) — social capital as collateral',
          'JLG/MFI: cross-guarantee; AP 2010 crisis → RBI MFI regulation, pricing caps',
          'Merchant banker = issue manager: diligence, pricing, underwriting, certification',
          'Lease: owner-lessor, rentals · hire purchase: instalments, ownership at end',
          'VC: 2/20 economics, staging, convertibles, board seats, exit-driven',
          'Ratings: AAA→D ladder; PD opinions, not advice; downgrade cliff effects',
          'Bureau score 750+ = prime; scorecards = logistic-regression products',
        ],
      },
    ],
    diagram: {
      title: 'The financial-services map around the bank',
      caption: 'Each institution solves a financing failure of the plain bank loan — information, size, horizon, or collateral.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Financial services ecosystem map">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="270" y="100" width="180" height="56" rx="12" fill="#e0f2fe"/><text x="360" y="122" fill="#0c4a6e" font-weight="600">THE BANK</text><text x="360" y="140" fill="#075985">collateral credit, payments</text>
    <rect x="20" y="20" width="160" height="56" rx="10" fill="#dcfce7"/><text x="100" y="40" fill="#14532d" font-weight="600">Microfinance / SHG</text><text x="100" y="56" fill="#166534">no-collateral group credit</text>
    <rect x="20" y="180" width="160" height="56" rx="10" fill="#fef9c3"/><text x="100" y="200" fill="#713f12" font-weight="600">Merchant banking</text><text x="100" y="216" fill="#a16207">issue management</text>
    <rect x="280" y="20" width="160" height="56" rx="10" fill="#ede9fe"/><text x="360" y="40" fill="#4c1d95" font-weight="600">Leasing / HP</text><text x="360" y="56" fill="#5b21b6">asset finance off-collateral</text>
    <rect x="280" y="180" width="160" height="56" rx="10" fill="#fee2e2"/><text x="360" y="200" fill="#7f1d1d" font-weight="600">Venture capital</text><text x="360" y="216" fill="#991b1b">high-risk, staged equity</text>
    <rect x="540" y="20" width="160" height="56" rx="10" fill="#ffedd5"/><text x="620" y="40" fill="#7c2d12" font-weight="600">Credit rating</text><text x="620" y="56" fill="#9a3412">information for lenders</text>
    <rect x="540" y="180" width="160" height="56" rx="10" fill="#cffafe"/><text x="620" y="200" fill="#155e75" font-weight="600">Retail finance</text><text x="620" y="216" fill="#0e7490">bureau-scored households</text>
    <line x1="300" y1="100" x2="360" y2="78" stroke="#94a3b8" stroke-width="1.3"/>
    <line x1="330" y1="156" x2="200" y2="196" stroke="#94a3b8" stroke-width="1.3"/>
    <line x1="360" y1="100" x2="360" y2="78" stroke="#94a3b8" stroke-width="1.3"/>
    <line x1="360" y1="156" x2="360" y2="178" stroke="#94a3b8" stroke-width="1.3"/>
    <line x1="450" y1="130" x2="538" y2="56" stroke="#94a3b8" stroke-width="1.3"/>
    <line x1="450" y1="130" x2="538" y2="200" stroke="#94a3b8" stroke-width="1.3"/>
    <line x1="180" y1="48" x2="278" y2="48" stroke="#94a3b8" stroke-width="1.0" stroke-dasharray="4 3"/>
    <text x="360" y="244" fill="#475569">every box solves a bank-loan failure: information · size · horizon · collateral</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'SHG leverage', expr: 'Bank loan to group = savings × multiple (4–10×)', meaning: 'Thin capital, social collateral' },
      { name: 'Lease vs HP cash flow', expr: 'Compare PV of rentals vs PV of instalments (after-tax)', meaning: 'The lease-or-buy decision' },
      { name: 'VC fund carry', expr: 'Carry = 20% × max(0, exited value − contributed − hurdle)', meaning: 'Manager upside' },
      { name: 'Interest cover (rating input)', expr: 'EBIT / interest expense', meaning: 'Debt-service headroom — a rating driver' },
    ],
    examples: [
      {
        title: 'Lease or buy the machine?',
        given: ['Machine ₹100L, 5-yr life; lease rentals ₹26L/yr pre-tax; or bank loan at 10% with 5-yr EMI; tax rate 25%; depreciation SLM; pre-tax cost of debt 10%'],
        steps: [
          { text: 'Lease PV (after tax)', calc: 'Rental 26, tax shield 6.5 → net 19.5/yr; PV at 7.5% after-tax over 5 yrs ≈ ₹78.9L' },
          { text: 'Buy PV', calc: 'EMI = 26.38L; interest shield + depreciation shield (5L/yr dep → 1.25 tax save) → PV of net outflows ≈ ₹74.6L (excluding residual value)' },
          { text: 'Compare', calc: 'Buy ≈ ₹74.6L < Lease ₹78.9L → buy is cheaper IF residual value and balance-sheet usage don\'t matter' },
          { text: 'The real drivers', calc: 'Lease wins when: tax shields unusable (loss-making lessee), off-balance-sheet flexibility matters (pre-Ind AS 116), or lessor passes cheaper funding' },
        ],
        answer: 'Lease-vs-buy is a PV-of-shields comparison — the winner is usually the party who can USE the tax shields.',
      },
      {
        title: 'Read the rating committee file',
        given: ['Issuer: EBIT ₹140 cr, interest ₹70 cr, D/E 2.8x, FDs maturing 6 months ₹300 cr, cash ₹80 cr, industry cyclical; proposed: BBB+'],
        steps: [
          { text: 'Coverage', calc: 'Interest cover = 140/70 = 2.0x — adequate-not-strong; cyclical industry demands a cushion' },
          { text: 'Liquidity', calc: '₹300 cr vs ₹80 cr cash = refinancing cliff; the deciding qualitative factor' },
          { text: 'Committee logic', calc: 'BBB+ (moderate safety) balances adequate coverage against refinancing risk — a downgrade trigger if the FD rollover fails' },
          { text: 'Investor action', calc: 'Yield demanded > AAA curve by 150–250 bps; mandate-constrained funds cannot hold below BBB — the cliff effect is pre-priced' },
        ],
        answer: 'A rating is a probability-of-default opinion: ratios set the zone, liquidity and cycle set the modifier.',
      },
    ],
    caseStudy: {
      title: 'Case — SHG to scale: the Kudumbashree arc',
      body: [
        'Kerala\'s Kudumbashree (1998) organises women into neighbourhood SHGs, federates them at ward and district levels, and links them to banks and to enterprises (catering units, farms, retail chains). Lakhs of groups run thrift, internal lending and bank credit; the federation also bids for government service contracts.',
        'Contrast: NBFC-MFIs scaled faster with JLG individual-loan models — and hit repayment crises (2010 AP; 2020 COVID clusters) where SHG-heavy regions, with deeper internal savings, proved more shock-absorbent.',
      ],
      questions: [
        'Why does the SHG structure absorb shocks better?',
        'What limits SHG ticket size and growth?',
        'Which model should a bank partner with, and how?',
      ],
      takeaways: [
        'SHGs pre-fund credit with the members\' OWN savings — internal equity before external debt; JLGs go straight to external debt — thinner buffer, faster default cascades',
        'SHG limits: group size, ticket granularity, and governance overhead — scale comes by federating, not by enlarging loans',
        'Banks gain through SHG linkage: low-cost origination, NABARD refinance, priority-sector credit — analytics can layer early-warning (attendance thrift decay) onto groups',
        'Design principle across inclusion finance: enforcement can be social or contractual — pick the failure mode you can live with',
      ],
    },
    revision: [
      'SHG–bank linkage (NABARD 1992): group savings as collateral base',
      'JLG: cross-guaranteed individual loans; AP 2010 → RBI MFI caps',
      'Merchant banker: diligence, DRHP, book building, underwriting, certification',
      'Operating vs financial lease; HP = instalment purchase, ownership at end',
      'Lease-or-buy = PV of after-tax cash flows; tax shields decide',
      'VC: 2/20, hurdle 8%, staging, syndication, convertibles, J-curve',
      'Ratings AAA→D: PD opinions; investment grade floor BBB; cliff effects',
      'Interest cover, D/E, liquidity → rating zone; cycle → modifier',
      'Bureau 750+ = prime; retail credit is scorecard-underwritten',
    ],
    practice: [
      { q: 'A AAA-rated company asks why its bank loan costs more than the rating implies. Explain the wedge.', a: 'Rating covers default probability on the instrument; loan pricing adds capital cost, tenure premium, collateral/covenant structure and relationship economics — plus bank risk weights differ by tenor. Rating is an input, not a price.' },
      { q: 'Why did VC in India shift from convertible preference to safe-like instruments for seed rounds?', a: 'Speed and cost: negotiating priced rounds at seed valuations is slow and contentious; convertibles/safes defer valuation to a priced round with better information — at the price of valuation-cap disagreements later.' },
      { q: 'Micro-loan portfolio at risk (PAR>30) jumps from 1% to 6%. What happened and what do you do?', a: 'Multiple-lending clusters + a local shock (flood/job loss) or collections collapse; act: freeze fresh disbursement in affected geographies, restructure viable loans, loan-officer reallocation to collections, bureau-based multiple-lending checks — PAR is a leading indicator, act at PAR>30 not at write-off.' },
      { q: 'Why does joint-liability lending in SHGs recover better than collateral lending to the same households?', a: 'Peer selection screens risky borrowers before the loan, peer monitoring polices usage, and social collateral (group reputation) makes default costly. Joint liability converts neighbours into underwriters.' },
      { q: 'A company is upgraded from BBB to A. What happens to its borrowing cost and bond price?', a: 'Lower perceived default risk narrows the credit spread over the risk-free curve, so new borrowing costs less and existing bonds rally (price up, yield down). Ratings move markets before covenants do.' },
    ],
  },
  {
    slug: 'technology-bfsi-analytics-fraud',
    number: 5,
    title: 'Technology in BFSI: Payments Rails, Bureaus, Analytics, AI & Fraud',
    minutes: 40,
    summary:
      'The technology spine of modern BFSI: core banking and RBI\'s lead role, clearing/settlement (ACH, NEFT/RTGS/IMPS/UPI), MICR and cheque processing, credit information bureaus, automation, analytics and AI-powered services, and the fraud-mitigation stack.',
    status: 'live',
    objectives: [
      'Map India\'s payment rails by settlement cycle and use case',
      'Explain the credit-bureau mechanism and alternate data',
      'Describe AI/analytics use cases across BFSI value chains',
      'Detail the fraud typologies and the layered controls against them',
    ],
    sections: [
      {
        heading: '1. Rails, bureaus and RBI\'s lead',
        body: [
          'RBI has led payments infrastructure: **RTGS** (real-time gross settlement, large-value, instant, irrevocable), **NEFT** (deferred net batches, now half-hourly), **IMPS** (instant 24×7 retail, per-transfer caps), **ACH/e-NACH** (bulk recurring — EMIs, salaries, dividends), **UPI** (round-the-clock instant on mobile with virtual payment addresses; 13+ billion transactions/month era), **cards (RuPay/Visa/MC)**, and **MICR**-based cheque processing (magnetic ink characters route cheques through CTS — cheque truncation, images not paper). Settlement logic: gross vs net, real-time vs batch, irrevocability — the rails trade speed against finality risk. NPCI (RBI/IBA-promoted) operates most rails — public infrastructure the fintech layer builds on.',
          '**Credit information bureaus** (CICs: CIBIL, Experian, Equifax, CRIF): lenders report every loan\'s history monthly; bureaus fuse it into the **credit report and score** (300–900; 750+ prime), solving the information asymmetry that once made small-ticket lending unviable. Rights: one free report per bureau every month (post-2017 rule), dispute rectification timelines. The **account aggregator** framework (AA, RBI-regulated, consent-based data sharing) extends the same idea to bank statements/tax/GST data — alternate-data underwriting. **Automation/CBS**: core banking systems centralised branches into one ledger (anywhere banking), straight-through processing, and the API layer (open banking) that lets third parties initiate payments and fetch data with consent.',
        ],
        callout: {
          type: 'exam',
          text: 'Rails comparison table, one line each: RTGS — gross, real-time, large (≥₹2L), irrevocable · NEFT — net, batched, retail, any amount · IMPS — instant, 24×7, retail caps · ACH/e-NACH — bulk recurring mandates · UPI — instant, mobile, P2P/P2M, free to consumer · CTS/MICR — image-based cheque clearing. Exam question format: "which rail for X?" — answer with speed, finality and cost logic.',
        },
      },
      {
        heading: '2. Analytics, AI and the fraud stack',
        body: [
          '**Analytics & AI across the value chain**: customer acquisition (propensity models, next-best-action, digital ad targeting — BA05 link); underwriting (scorecards → ML models on bureau + alternate data; income estimation from GST/bank-flow; instant pre-approved offers); pricing (risk-based, elasticities by segment); servicing (churn prediction, collections prioritisation by propensity-to-pay; chatbots for level-1); fraud (below); ALM and treasury (deposit-behaviour modelling, prepayment models); surveillance (market-abuse detection for brokers — SEBI mandate). Governance that makes it legal: model risk management (fairness, explainability), DPDP-compliant data consent (PGDM 302 link), RBI\'s outsourcing and cloud directions.',
          '**Fraud typologies**: identity theft and synthetic identities; phishing/social-engineering account takeover; card skimming/CNP fraud; first-party fraud (wilful default by design, bureau-bust-out); loan-stacking via multiple apps; insider collusion; money mule networks laundering scam proceeds. **The layered defence**: preventive (KYC/CDD, video-KYC, device fingerprinting, encryption), detective (real-time rules + ML anomaly detection: velocity, geolocation, network-graph flags), responsive (transaction blocks, step-up authentication), and corrective (chargebacks, insurance, CICfraud alerts). Analytics is the weapon: supervised models on labelled fraud + unsupervised anomaly detection for novel patterns; graph analytics for mule rings; the arms race is constant — fraudsters adapt to every deployed rule (concept drift). Economics: fraud losses are a cost line to be minimised subject to customer friction — over-blocking costs real revenue.',
        ],
        bullets: [
          'RTGS gross/irrevocable; NEFT batched; IMPS/UPI instant; ACH bulk; CTS images',
          'Bureaus fuse lender-reported histories → score 300–900 (750+ prime)',
          'AA = consent-based data rails for alternate underwriting',
          'CBS + APIs = anywhere banking and open-banking layer',
          'AI: propensity, scorecards, churn, collections, ALM behaviour models',
          'Fraud: preventive KYC/device → detective rules+ML → responsive blocks → graph for mule rings',
          'Over-blocking = revenue loss; fraud control is an optimisation, not a ban',
        ],
      },
    ],
    diagram: {
      title: 'Fraud defence in layers',
      caption: 'Controls stack from prevention through detection to response; analytics powers every layer.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Layered fraud defence">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="40" y="30" width="640" height="44" rx="10" fill="#dcfce7"/><text x="360" y="50" fill="#14532d" font-weight="600">PREVENT — KYC / video-KYC · device fingerprint · encryption · consent (DPDP)</text><text x="360" y="66" fill="#166534">stop bad actors entering</text>
    <rect x="40" y="90" width="640" height="44" rx="10" fill="#fef9c3"/><text x="360" y="110" fill="#713f12" font-weight="600">DETECT — real-time rules · ML anomaly scores · velocity &amp; geo flags · graph mule-rings</text><text x="360" y="126" fill="#a16207">find them in the transaction stream</text>
    <rect x="40" y="150" width="640" height="44" rx="10" fill="#fee2e2"/><text x="360" y="170" fill="#7f1d1d" font-weight="600">RESPOND — block · step-up OTP/biometric · freeze · limit cut</text><text x="360" y="186" fill="#991b1b">contain in seconds</text>
    <rect x="40" y="210" width="640" height="32" rx="8" fill="#ede9fe"/><text x="360" y="231" fill="#4c1d95">CORRECT &amp; LEARN — chargebacks · bureau fraud flags · model retrain (concept drift)</text>
    <line x1="20" y1="30" x2="20" y2="242" stroke="#475569" stroke-width="1.5"/>
    <text x="14" y="140" fill="#475569" transform="rotate(-90 14 140)" font-size="10">analogy: castle walls → guards → gates → aftermath</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Bureau score use', expr: 'PD = f(score); odds double every ~40 points (industry rule of thumb)', meaning: 'Score-to-risk calibration' },
      { name: 'Fraud-detection trade-off', expr: 'Minimise fraud loss + friction cost subject to block-rate cap', meaning: 'The optimisation objective' },
      { name: 'Alert triage', expr: 'Precision = TP/(TP+FP) — investigator capacity binds', meaning: 'Why 99% accuracy lies' },
    ],
    examples: [
      {
        title: 'Pick the rail',
        given: ['(a) ₹4.5 cr supplier payment, urgent; (b) ₹8,000 to a friend at 11 pm; (c) 45,000 pension EMIs monthly; (d) one-off ₹70,000 to a vendor preferring net-banking'],
        steps: [
          { text: '(a)', calc: 'RTGS: large-value, immediate finality — irrevocable settlement removes counterparty risk' },
          { text: '(b)', calc: 'UPI: instant, 24×7, free, P2P' },
          { text: '(c)', calc: 'ACH/e-NACH mandates: bulk recurring — one mandate, monthly debits' },
          { text: '(d)', calc: 'IMPS or NEFT — instant (IMPS) or batched; cost negligible at this size' },
        ],
        answer: 'Rail choice = size × urgency × finality × recurrence — a table you can reason from, not memorise.',
      },
      {
        title: 'The fraud model\'s precision problem',
        given: ['1 cr transactions/day; true fraud 0.05% (5,000); model flags 50,000 alerts; investigators handle 5,000/day'],
        steps: [
          { text: 'Naive accuracy', calc: 'Model catching ALL fraud + 45,000 false alerts = "99.5% accurate" — and useless' },
          { text: 'Precision', calc: 'If 3,000 of 50,000 alerts are real fraud: precision 6%, recall 60% — investigator queue buried in false positives' },
          { text: 'Fix', calc: 'Rank by risk score, investigate top 5,000 (auto-block the top slice): precision ↑, recall trades off; auto-blocks need tight precision (friction cost)' },
          { text: 'Layer it', calc: 'Rules for known patterns (instant block), ML for risk-ranking (queues), graph for mule rings (investigation)' },
        ],
        answer: 'Fraud analytics is a queue-management problem: score, rank, and ration investigation capacity where precision is highest.',
      },
    ],
    caseStudy: {
      title: 'Case — The digital-lending app purge (2020–22)',
      body: [
        'Hundreds of loan apps harvested contacts, location and photos from borrowers\' phones, disbursed small loans at effective 60–100%+ rates, and used contact-list shaming for recovery. Defaults, suicides and a RBI working group follow; Google delists apps lacking lender licences; RBI issues 2025 digital-lending directions: loans must flow only through regulated entities or LSPs, data collection limited to need, recovery conduct codified.',
        'A compliant fintech redesigns: NBFC partner holds the loan, AA-based bank-statement underwriting replaces contact scraping, recovery via bureau reporting and legal channels only.',
      ],
      questions: [
        'Which failures were technological, and which were governance?',
        'What did the contact-scraping underwriting actually predict — and at what externality?',
        'How should a BA team build underwriting data within the new rules?',
      ],
      takeaways: [
        'The tech worked perfectly — the governance failed: data collected beyond purpose, pricing above regulated caps, recovery via extra-legal coercion. Technology amplifies intent, in both directions',
        'Contact-network signals do correlate with repayment — but the externality (privacy invasion, coerced repayments) is precisely what DPDP and the digital-lending rules price at infinity',
        'Compliant stack: RE/LSP architecture, consent-based AA data + bureau + GST/bank-flow models, explainable scores, audited model governance — alternate data is legal when consented and material',
        'Lesson for analysts: a feature that predicts well is not a feature you may use — legality, fairness and consent are model requirements, not afterthoughts',
      ],
    },
    revision: [
      'Rails: RTGS (gross, ≥₹2L, irrevocable) · NEFT (batch) · IMPS (instant retail) · UPI (mobile, 24×7) · ACH (bulk mandates) · CTS/MICR (cheque images)',
      'NPCI operates UPI/IMPS/ACH/RuPay — RBI-led public rails',
      'Bureaus: monthly reporting → report + score (300–900); free monthly reports; disputes timeline',
      'AA: consent-based financial-data sharing — alternate underwriting',
      'CBS + API/open banking = anywhere banking, fintech layer',
      'AI use cases: propensity, scorecards, churn, collections, ALM, surveillance',
      'Fraud: identity/CNP/ATO/first-party/loan-stacking/mule laundering',
      'Defence layers: prevent (KYC) → detect (rules+ML+graph) → respond (blocks) → correct (retrain)',
      'Precision/recall trade-off; investigator capacity binds; over-blocking costs revenue',
    ],
    practice: [
      { q: 'A merchant complains UPI settlements take T+1 while cards pay T+2. Why does the bank care?', a: 'Settlement float and risk: instant-payment rails carry irrevocability risk (fraud losses are the bank\'s, not a chargeback cycle); slower rails fund fraud checks. The bank optimises speed vs fraud — merchants price the float.' },
      { q: 'Your ML underwriting model rejects 70% of thin-file applicants. Business wants approvals up. Options?', a: 'Alternate consented data (AA flows, GST), start-then-grow limits, partnership origination — plus monitor early vintages tightly. Reject-rate tuning must track expected loss, not just volume targets; vintage curves are the guardrail.' },
      { q: 'Why do fraudsters open accounts weeks before using them?', a: 'Aging defeats velocity/new-account rules: many detection models weight account age and early-transaction normality. Counter: graph analytics linking new accounts to known mule clusters, and deposit-behaviour monitoring, not just transaction rules.' },
      { q: 'What do MICR and IFSC each identify?', a: 'MICR is the magnetic code on a cheque identifying the city/bank/branch for automated clearing; IFSC identifies a bank branch for electronic payment routing (NEFT, RTGS). One is cheque-era, one is rails-era.' },
      { q: 'Write a velocity rule that would catch a cloned card.', a: 'Flag if more than 3 transactions occur in 10 minutes across cities more than 500 km apart, or if spend exceeds 4x the trailing 30-day average - speed and geography are the cloned-card signature.' },
    ],
  },
];
