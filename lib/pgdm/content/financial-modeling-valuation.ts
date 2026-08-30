import type { Subject } from '../types';

/* ═══════════════════════════════════════════════════════════════
   FINANCIAL MODELING & VALUATION — Semester 3 · Finance Major
   ═══════════════════════════════════════════════════════════════ */

const threeStatementSvg = `
<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
  <defs>
    <marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#5eead4"/>
    </marker>
    <marker id="arr2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#a78bfa"/>
    </marker>
  </defs>
  <rect x="10" y="150" width="200" height="120" rx="14" fill="#0f172a" stroke="#2dd4bf" stroke-width="1.5"/>
  <text x="110" y="185" fill="#5eead4" font-size="15" font-weight="700" text-anchor="middle">Income Statement</text>
  <text x="110" y="210" fill="#94a3b8" font-size="11" text-anchor="middle">Revenue → Costs</text>
  <text x="110" y="228" fill="#94a3b8" font-size="11" text-anchor="middle">→ EBITDA → EBIT</text>
  <text x="110" y="246" fill="#94a3b8" font-size="11" text-anchor="middle">→ Net Income</text>

  <rect x="280" y="20" width="200" height="120" rx="14" fill="#0f172a" stroke="#818cf8" stroke-width="1.5"/>
  <text x="380" y="55" fill="#a5b4fc" font-size="15" font-weight="700" text-anchor="middle">Cash Flow Statement</text>
  <text x="380" y="80" fill="#94a3b8" font-size="11" text-anchor="middle">CFO + CFI + CFF</text>
  <text x="380" y="98" fill="#94a3b8" font-size="11" text-anchor="middle">→ Net change in cash</text>
  <text x="380" y="116" fill="#94a3b8" font-size="11" text-anchor="middle">→ Ending cash balance</text>

  <rect x="280" y="280" width="200" height="120" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="380" y="315" fill="#fbbf24" font-size="15" font-weight="700" text-anchor="middle">Balance Sheet</text>
  <text x="380" y="340" fill="#94a3b8" font-size="11" text-anchor="middle">Assets = Liabilities</text>
  <text x="380" y="358" fill="#94a3b8" font-size="11" text-anchor="middle">+ Equity (always!)</text>
  <text x="380" y="376" fill="#94a3b8" font-size="11" text-anchor="middle">Snapshot at a date</text>

  <rect x="560" y="150" width="190" height="120" rx="14" fill="#134e4a" stroke="#2dd4bf" stroke-dasharray="4 3"/>
  <text x="655" y="185" fill="#5eead4" font-size="13" font-weight="700" text-anchor="middle">Supporting Schedules</text>
  <text x="655" y="208" fill="#94a3b8" font-size="10.5" text-anchor="middle">Debt · WC · Capex</text>
  <text x="655" y="224" fill="#94a3b8" font-size="10.5" text-anchor="middle">Depreciation · Taxes</text>
  <text x="655" y="240" fill="#94a3b8" font-size="10.5" text-anchor="middle">Revenue drivers</text>

  <line x1="212" y1="180" x2="278" y2="110" stroke="#5eead4" stroke-width="2" marker-end="url(#arr)"/>
  <text x="222" y="128" fill="#5eead4" font-size="10">Net Income → CFO</text>

  <line x1="212" y1="240" x2="278" y2="320" stroke="#5eead4" stroke-width="2" marker-end="url(#arr)"/>
  <text x="196" y="300" fill="#5eead4" font-size="10">Net Income → Retained Earnings</text>

  <line x1="380" y1="140" x2="380" y2="278" stroke="#a78bfa" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="390" y="205" fill="#a78bfa" font-size="10">Ending cash → Cash on BS</text>

  <line x1="482" y1="320" x2="558" y2="240" stroke="#a78bfa" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="470" y="300" fill="#a78bfa" font-size="10">BS balances ← schedules</text>

  <line x1="482" y1="80" x2="600" y2="148" stroke="#a78bfa" stroke-width="2" marker-end="url(#arr2)"/>
  <text x="500" y="98" fill="#a78bfa" font-size="10">CF drives debt paydown</text>

  <text x="380" y="410" fill="#64748b" font-size="11" text-anchor="middle">The model is ONE system — every arrow is a formula link, never a hard-coded number</text>
</svg>`;

const waccSvg = `
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
  <defs>
    <marker id="warr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#5eead4"/>
    </marker>
  </defs>
  <rect x="20" y="20" width="220" height="110" rx="14" fill="#0f172a" stroke="#2dd4bf" stroke-width="1.5"/>
  <text x="130" y="52" fill="#5eead4" font-size="14" font-weight="700" text-anchor="middle">Cost of Equity (Re)</text>
  <text x="130" y="78" fill="#94a3b8" font-size="11" text-anchor="middle">CAPM: Rf + β × MRP</text>
  <text x="130" y="98" fill="#64748b" font-size="10" text-anchor="middle">What shareholders demand</text>

  <rect x="20" y="190" width="220" height="110" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="130" y="222" fill="#fbbf24" font-size="14" font-weight="700" text-anchor="middle">Cost of Debt (Rd)</text>
  <text x="130" y="248" fill="#94a3b8" font-size="11" text-anchor="middle">Yield on lending · × (1 − t)</text>
  <text x="130" y="268" fill="#64748b" font-size="10" text-anchor="middle">Tax shield makes debt cheaper</text>

  <rect x="330" y="105" width="170" height="110" rx="16" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
  <text x="415" y="145" fill="#5eead4" font-size="20" font-weight="800" text-anchor="middle">WACC</text>
  <text x="415" y="172" fill="#94a3b8" font-size="10.5" text-anchor="middle">E/V · Re + D/V · Rd(1−t)</text>
  <text x="415" y="192" fill="#64748b" font-size="10" text-anchor="middle">blended hurdle rate</text>

  <line x1="242" y1="75" x2="328" y2="135" stroke="#5eead4" stroke-width="2" marker-end="url(#warr)"/>
  <text x="248" y="92" fill="#5eead4" font-size="10">weight E/V</text>
  <line x1="242" y1="245" x2="328" y2="185" stroke="#fbbf24" stroke-width="2" marker-end="url(#warr)"/>
  <text x="248" y="232" fill="#fbbf24" font-size="10">weight D/V</text>

  <rect x="560" y="120" width="180" height="86" rx="14" fill="#0f172a" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="650" y="152" fill="#a5b4fc" font-size="12" font-weight="700" text-anchor="middle">Discount rate for DCF</text>
  <text x="650" y="176" fill="#64748b" font-size="10" text-anchor="middle">FCFF ← WACC · FCFE ← Re</text>
  <line x1="502" y1="160" x2="558" y2="160" stroke="#a78bfa" stroke-width="2" marker-end="url(#warr)"/>

  <text x="380" y="320" fill="#64748b" font-size="11" text-anchor="middle">V = market value of equity + debt — use MARKET values, not book values</text>
</svg>`;

const dcfBridgeSvg = `
<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
  <defs>
    <marker id="darr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#5eead4"/>
    </marker>
  </defs>
  <rect x="15" y="30" width="215" height="150" rx="14" fill="#0f172a" stroke="#2dd4bf" stroke-width="1.5"/>
  <text x="122" y="62" fill="#5eead4" font-size="13.5" font-weight="700" text-anchor="middle">① Forecast FCFF</text>
  <text x="122" y="88" fill="#94a3b8" font-size="10.5" text-anchor="middle">EBIT × (1 − t)</text>
  <text x="122" y="105" fill="#94a3b8" font-size="10.5" text-anchor="middle">+ D&amp;A − Capex − ΔNWC</text>
  <text x="122" y="128" fill="#64748b" font-size="10" text-anchor="middle">usually 5 years explicit</text>
  <text x="122" y="146" fill="#64748b" font-size="10" text-anchor="middle">revenue-driven, not hope-driven</text>

  <rect x="15" y="200" width="215" height="115" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="122" y="232" fill="#fbbf24" font-size="13.5" font-weight="700" text-anchor="middle">② Terminal Value (TV)</text>
  <text x="122" y="258" fill="#94a3b8" font-size="10.5" text-anchor="middle">Gordon: FCFF₆ / (WACC − g)</text>
  <text x="122" y="276" fill="#94a3b8" font-size="10.5" text-anchor="middle">or Exit Multiple: EBITDA × m</text>
  <text x="122" y="296" fill="#64748b" font-size="10" text-anchor="middle">g &lt; long-run GDP growth!</text>

  <rect x="300" y="115" width="150" height="115" rx="16" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
  <text x="375" y="155" fill="#5eead4" font-size="15" font-weight="800" text-anchor="middle">Enterprise</text>
  <text x="375" y="177" fill="#5eead4" font-size="15" font-weight="800" text-anchor="middle">Value</text>
  <text x="375" y="202" fill="#64748b" font-size="10" text-anchor="middle">Σ PV(FCFF) + PV(TV)</text>
  <line x1="232" y1="105" x2="298" y2="150" stroke="#5eead4" stroke-width="2" marker-end="url(#darr)"/>
  <line x1="232" y1="257" x2="298" y2="195" stroke="#fbbf24" stroke-width="2" marker-end="url(#darr)"/>

  <rect x="505" y="60" width="230" height="90" rx="12" fill="#0f172a" stroke="#ef4444" stroke-width="1.5"/>
  <text x="620" y="92" fill="#f87171" font-size="12" font-weight="700" text-anchor="middle">− Net Debt</text>
  <text x="620" y="114" fill="#94a3b8" font-size="10" text-anchor="middle">debt − cash &amp; equivalents</text>
  <text x="620" y="132" fill="#64748b" font-size="10" text-anchor="middle">(also: minority int., prefs)</text>

  <rect x="505" y="185" width="230" height="90" rx="12" fill="#134e4a" stroke="#2dd4bf" stroke-width="2"/>
  <text x="620" y="217" fill="#5eead4" font-size="13" font-weight="800" text-anchor="middle">Equity Value</text>
  <text x="620" y="240" fill="#94a3b8" font-size="10" text-anchor="middle">÷ shares outstanding</text>
  <text x="620" y="258" fill="#94a3b8" font-size="10" text-anchor="middle">= value per share 🎯</text>
  <line x1="452" y1="160" x2="503" y2="115" stroke="#f87171" stroke-width="2" marker-end="url(#darr)"/>
  <line x1="452" y1="185" x2="503" y2="220" stroke="#5eead4" stroke-width="2" marker-end="url(#darr)"/>

  <text x="380" y="330" fill="#64748b" font-size="11" text-anchor="middle">Compare per-share value to market price → BUY / SELL / HOLD recommendation</text>
</svg>`;

export const financialModelingValuation: Subject = {
  slug: 'financial-modeling-valuation',
  code: 'PGDM F06',
  name: 'Financial Modeling & Valuation',
  track: 'FINANCE',
  credits: 3,
  hours: 30,
  semester: 3,
  tagline: 'Build the model. Value the business. Defend the number.',
  description:
    'The flagship finance-major lab: Excel modelling craft, statement forecasting, project appraisal with NPV/IRR, DCF and relative valuation, M&A/SOTP/LBO modelling, and portfolio metrics through to VaR.',
  outcomes: [
    'Apply the basic and advanced features of Excel used in financial modelling for business decisions',
    'Build financial models across finance — statement forecasts, appraisal, and analysis — in Excel',
    'Develop derivatives and portfolio models for valuations that serve diverse stakeholders',
    'Solve industry problems autonomously using financial modelling techniques',
    'Offer advisory and consultancy-grade valuation work',
  ],
  units: [
    'Unit 1 — Introduction to Financial Modelling: concept, relevance, rationale; Excel tools basic & advanced',
    'Unit 2 — Building Models in Finance: common-size statements from trial balance; forecasting financial statements; spreadsheet analysis',
    'Unit 3 — Risk Analysis in Project Appraisal: NPV, IRR & similar measures; simulation, scenario analysis, crossover rates',
    'Unit 4 — Business Valuation: DCF, relative valuation, sensitivity; M&A modelling, precedent transactions, SOTP, EPS accretion/dilution, LBO',
    'Unit 5 — Portfolio Valuation & Value Enhancement: returns, portfolio mean & variance, efficient portfolios, variance–covariance matrix, beta & SML, event study, Black–Scholes, binomial pricing, Greeks, VaR',
  ],
  books: [
    { title: 'Financial Modeling', author: 'Simon Benninga — The MIT Press' },
    { title: 'Mastering Financial Modelling in Microsoft Excel', author: 'Alastair Day — Pearson' },
    { title: 'Investment Valuation', author: 'Aswath Damodaran — John Wiley & Sons' },
    { title: 'Financial Modeling and Valuation (Wiley Finance)', author: 'Paul Pignataro' },
  ],
  heroImage: '/images/pgdm/fmv-hero.jpg',
  lectures: [
    /* ─────────── LECTURE 1 (Unit 1 outline) ─────────── */
    {
      slug: 'excel-modelling-toolkit',
      number: 1,
      title: 'The Modeller\'s Excel Toolkit (Unit 1)',
      minutes: 40,
      summary:
        'The concept and rationale of financial modelling, and the Excel arsenal — cell discipline, named ranges, lookup family, date & financial functions, data tables, goal seek, and scenario manager.',
      status: 'live',
      objectives: [
        'Define what a financial model is and the standards professionals hold it to',
        'Master the 20 Excel functions that build 95% of models',
        'Set up scenario manager, data tables, and goal seek for risk work',
        'Apply the formatting grammar that makes models auditable',
      ],
      sections: [
        {
          heading: '1. What a model is — and the functions that build one',
          body: [
            'A **financial model** = assumptions → mechanics → outputs, built to answer a decision (fund, buy, expand, hedge) and **auditable by a stranger in 30 minutes**. Standards: inputs separated from calculations (one input, one place, no hard-coding inside formulas), flow in one direction (no circular spaghetti without a switch), integrity checks (balance sheet balances, cash ties, sources = uses), version control, and documentation of assumption sources. The formatting grammar: **blue = hardcoded input, black = formula, green = cross-sheet link**, red = deleted/reserved; every sheet gets a check row that reads OK/ERROR. This grammar is the course standard — every later lecture assumes it.',
            '**The function 20**: LOOKUPS — `XLOOKUP` (modern) / `INDEX–MATCH` (the bulletproof classic: =INDEX(return_range, MATCH(lookup, lookup_range, 0)) — never breaks when columns are inserted; VLOOKUP only with FALSE exact match and a static column index); DATES — `EOMONTH`, `EDATE`, `DATE`, `YEARFRAC` (the engine of monthly column heads and coupon schedules); FINANCIAL — `NPV` (end-period!) vs `XNPV` (dated), `IRR` vs `XIRR`, `PMT/FV/PV` for annuities and EMIs; LOGIC — `IF`, `IFS`, `AND/OR`, `IFERROR`, `MIN/MAX`, `SUMIFS/COUNTIFS` (conditional aggregation — the workhorse of schedules); `EOMONTH`-driven flags (`--(dates<=period_end)`) for construction phasing; `CHOOSE`/`INDEX` for **scenario switches** (a single scenario cell picks the whole assumption set: =CHOOSE(scenario, base, bull, bear)). Data validation dropdowns on the scenario cell make the model safe for committees.',
          ],
          callout: {
            type: 'excel',
            text: 'The five that save careers: XNPV not NPV (dates, not equal periods); XIRR not IRR (same reason); INDEX–MATCH not VLOOKUP (insert-proof); SUMIFS not nested IFs (audit-friendly); CHOOSE-switch not copy-paste scenarios (one cell, three worlds). Test all five on a 6-row toy before the exam.',
          },
        },
        {
          heading: '2. What-if machinery: goal seek, data tables, scenario manager',
          body: [
            '**Goal Seek** (Data → What-If): solve one input to hit one output ("what growth makes NPV = 0?" → break-even growth; the result is your sensitivity headline). **Data Tables** (one-way and two-way): recompute the model across an input grid — build once: input cell reference in the top-left, input values down/across, select grid, Data Table, link the row/column input cell; two-way (e.g., WACC × growth → share price) is the standard valuation heat-map. Constraint: data tables need the model to recalc cleanly (no iterative circulars unless switched). **Scenario Manager**: saves named input sets (Base/Bull/Bear) and produces a summary sheet — though a CHOOSE/INDEX switch is more transparent and recalculates live; Scenario Manager wins for quick side-by-side prints.',
            '**Professional workflow**: build → check → stress. Checks first (BS balances every period; cash change ties to cash flow; dividends + retained = PAT), then base case, then the what-if layer. Two disciplines that separate practitioners from students: (1) never bury a number in a formula — an assumption you cannot see is an assumption you cannot defend; (2) label units and signs (₹ cr vs ₹ lakh, inflows positive) on every block — sign errors are the #1 model bug. Monte Carlo thinking arrives in lecture 7: NORM.INV(RAND(), mean, sd) driving volumes — the same model, distributions instead of point inputs.',
          ],
          bullets: [
            'One input one place; blue/black/green grammar; checks on every sheet',
            'INDEX–MATCH: =INDEX(range, MATCH(key, keys, 0)) — insert-proof lookups',
            'XNPV/XIRR for dated, irregular cash flows (all real-world cases)',
            'CHOOSE(scenario, base, bull, bear) = a whole assumption set in one cell',
            'Two-way data table (WACC × growth) is the valuation heat-map',
            'Goal-seek break-evens become the sensitivity table\'s rows',
          ],
        },
      ],
      diagram: {
        title: 'Model architecture: three zones, one direction',
        caption: 'Inputs feed calculations feed outputs; checks watch the balances; the scenario switch swaps the assumption block without touching mechanics.',
        svg: `<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Financial model architecture">
  <defs><marker id="ma" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="70" width="160" height="70" rx="10" fill="#e0f2fe"/>
    <text x="100" y="94" fill="#0c4a6e" font-weight="600">INPUTS (blue)</text>
    <text x="100" y="112" fill="#075985">assumptions block</text>
    <text x="100" y="128" fill="#075985">+ scenario switch</text>
    <rect x="240" y="70" width="180" height="70" rx="10" fill="#dcfce7"/>
    <text x="330" y="94" fill="#14532d" font-weight="600">CALCULATIONS (black)</text>
    <text x="330" y="112" fill="#166534">schedules → statements</text>
    <text x="330" y="128" fill="#166534">one direction, no circles</text>
    <rect x="480" y="70" width="200" height="70" rx="10" fill="#fef9c3"/>
    <text x="580" y="94" fill="#713f12" font-weight="600">OUTPUTS + WHAT-IF</text>
    <text x="580" y="112" fill="#a16207">DCF · ratios · data tables</text>
    <text x="580" y="128" fill="#a16207">goal seek · scenarios</text>
    <line x1="180" y1="105" x2="238" y2="105" stroke="#475569" stroke-width="1.5" marker-end="url(#ma)"/>
    <line x1="420" y1="105" x2="478" y2="105" stroke="#475569" stroke-width="1.5" marker-end="url(#ma)"/>
    <rect x="240" y="160" width="440" height="40" rx="8" fill="#fee2e2"/>
    <text x="460" y="185" fill="#7f1d1d" font-weight="600">CHECKS: BS balances · cash ties · sources = uses → OK / ERROR</text>
    <line x1="330" y1="140" x2="330" y2="158" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#ma)"/>
    <text x="360" y="40" fill="#334155" font-weight="600">audit rule: a stranger follows any number to its source in 30 seconds</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'INDEX–MATCH', expr: '=INDEX(return_range, MATCH(key, key_range, 0))', meaning: 'Insert-proof lookup' },
        { name: 'Dated NPV / IRR', expr: '=XNPV(rate, flows, dates) · =XIRR(flows, dates, [guess])', meaning: 'Real-world timing' },
        { name: 'Scenario switch', expr: '=CHOOSE(scenario_no, base, bull, bear)', meaning: 'One cell, three worlds' },
        { name: 'Two-way table', expr: 'Row input: WACC · Column input: g → price grid', meaning: 'Sensitivity heat-map' },
      ],
      examples: [
        {
          title: 'EMI schedule engine in four functions',
          given: ['Loan ₹50 lakh, 9% p.a., 20 years monthly', 'Build: EMI, month-wise interest/principal split, closing balance'],
          steps: [
            { text: 'EMI', calc: '=PMT(9%/12, 240, -5000000) → ₹44,986 (PMT sign convention: negative = outflow; feed −principal to get positive EMI)' },
            { text: 'Interest split', calc: 'Interestₜ = opening×0.09/12 = ₹37,500 in month 1; Principalₜ = EMI − Interest = ₹7,486' },
            { text: 'Cascade', calc: 'Closing = Opening − Principal; next Opening = prior Closing; one row, fill down 240 — the whole amortisation table is 5 formulas' },
            { text: 'Checks', calc: 'Final closing = 0 (exactly); Σ Principal = ₹50,00,000; Σ Interest = EMI×240 − 50,00,000 ≈ ₹57.97 lakh — interest exceeds principal: the time-value story in one number' },
          ],
          answer: 'PMT + one cascade row + three checks = a bank-grade amortisation schedule in ten minutes.',
        },
        {
          title: 'Break-even growth by goal seek',
          given: ['A 5-year revenue model where year-1 revenue grows at g for 4 years; base g = 12%; model output: 5-yr profit ₹32 cr; question: what g makes profit exactly ₹20 cr (the covenant threshold)?'],
          steps: [
            { text: 'Set up', calc: 'Profit cell = f(g); Data → What-If → Goal Seek; Set cell: Profit, To value: 20, By changing: g' },
            { text: 'Result', calc: 'Excel returns g ≈ 8.4% (say) — below that, the covenant trips' },
            { text: 'Frame it', calc: '"Growth can fall 3.6 points below base before the covenant breaks" — a sensitivity headline, not a forecast' },
            { text: 'Re-check', calc: 'Read the input cell: goal seek left g at 8.4% — restore base or add a note; stray goal-seek values are a classic audit finding' },
          ],
          answer: 'Goal seek converts a model into a break-even statement — the two numbers committees remember.',
        },
      ],
      caseStudy: {
        title: 'Case — The ₹900-crore typo: anatomy of a model accident',
        body: [
          'An analyst builds a leveraged acquisition model overnight. A revenue cell hard-codes 1,050 (₹ cr) instead of 150 inside a formula — invisible because it violates the blue-input rule. The model clears the investment committee; debt sizing is 6x too high on that segment\'s cash flows.',
          'Discovered in diligence two weeks later: the deal reprices, the team\'s credibility takes the hit. Post-mortem finds no checks existed (no cash tie, no sources=uses) and the file was "final_v7_ACTUAL_use_this.xlsx".',
        ],
        questions: [
          'Which three standards, followed, would have caught the error in minutes?',
          'Why do checks beat careful humans?',
          'What does the version-file name tell you about process?',
        ],
        takeaways: [
          'One-input-one-place + blue/black grammar makes the 1,050 visible as a hard-code inside a formula — the first rule exists exactly for this failure',
          'A sources=uses check (debt+equity = purchase price+fees) and a cash-flow tie would have flagged the imbalance automatically — checks are cheap, relentless, and never tired',
          'Version chaos (final_v7_ACTUAL) = no audit trail; dated versions + a change log is professional hygiene',
          'The modeller\'s hierarchy: correctness checks > transparency > sophistication — a simple model you can trust beats an elegant one you cannot',
        ],
      },
      revision: [
        'Model = assumptions → mechanics → outputs; auditable in 30 minutes',
        'Grammar: blue input · black formula · green cross-sheet link',
        'One input, one place; no hard-codes inside formulas',
        'INDEX–MATCH / XLOOKUP; EOMONTH/EDATE/YEARFRAC; SUMIFS',
        'XNPV/XIRR for dated flows; NPV/IRR assume equal end periods',
        'CHOOSE switch = scenario engine; data tables = sensitivity grids',
        'Goal seek = break-even finder; restore inputs after running',
        'Checks: BS balances, cash ties, sources = uses, OK/ERROR cells',
        'Sign conventions and units labelled on every block',
      ],
      practice: [
        { q: 'Why is =NPV(rate, A1:A10)+A0 the common beginner error?', a: 'Excel\'s NPV discounts the FIRST cell too — the year-0 outflow must be added undiscounted outside: NPV(rate, A1:A10) + A0. Or use XNPV with dates and never think about it again.' },
        { q: 'VLOOKUP vs INDEX–MATCH: give the two decisive arguments.', a: '(1) Insert-proof: VLOOKUP\'s column index breaks when someone inserts a column; INDEX–MATCH never does. (2) Direction: VLOOKUP only looks right; INDEX–MATCH looks any direction and only reads the two ranges it needs (faster).' },
        { q: 'Your two-way data table shows identical values in every cell. What happened?', a: 'Classic: the model\'s calculation chain was set to manual (data tables don\'t trigger recalc), or the row/column input cells point to the wrong cells (e.g., both to the same input). Fix: verify input-cell links, set calculation to Automatic except data tables and press F9.' },
        { q: 'Your model has Rs 45 hardcoded inside a tax formula three tabs deep. Why is that a firing offence in banking?', a: 'It breaks every audit and update: change the tax assumption and the model silently lies. Inputs live once, formulas reference them - integrity is a modelling ethic, not a style preference.' },
        { q: 'F2 shows precedents to another file that no longer exists. What happened and what is the fix?', a: 'A hard link to an external workbook - the model imports values without provenance. Consolidate the source data into the model\'s inputs tab and rebuild the reference internally.' },
      ],
      tools: [
        { label: 'Time Value Machine', href: '/tools/time-value-machine' },
        { label: 'WACC Calculator', href: '/tools/wacc-calculator' },
      ],
    },

    /* ─────────── LECTURE 2 (Unit 2 · FULL) ─────────── */
    {
      slug: 'three-statement-architecture',
      number: 2,
      title: 'The Three-Statement Model: Architecture & Linkages',
      minutes: 45,
      summary:
        'How the income statement, balance sheet, and cash flow statement lock together into one living system — and the professional standards that make a model auditable.',
      status: 'live',
      objectives: [
        'Explain the purpose of each financial statement and what question it answers',
        'Trace every linkage arrow between the three statements with exact line items',
        'Apply investment-banking formatting standards (inputs, formulas, checks)',
        'Build a minimal integrated model for a real company by hand',
      ],
      sections: [
        {
          heading: '1. Why models exist',
          body: [
            'A financial model is a translation of a business story into arithmetic. When your director asks "what happens to our cash if receivables slip by 15 days?", the model answers in seconds. Every valuation method you will learn this semester — DCF, multiples, LBO — sits on top of a three-statement engine. Weak engine, wrong valuation.',
            'The three statements answer three different questions about the same business. The income statement answers "did we earn a profit over a period?" The balance sheet answers "what do we own and owe at an instant?" The cash flow statement answers "where did cash actually go?" Profit is an opinion; cash is a fact — that tension is why the cash flow statement exists.',
          ],
          callout: {
            type: 'exam',
            text: 'A classic exam trap: "Profitable company, bankrupt anyway." Explanation — profit is accrual-based; if cash is locked in receivables and inventory, the company cannot pay salaries. Models exist to expose exactly this.',
          },
        },
        {
          heading: '2. The income statement: a waterfall, not a list',
          body: [
            'Read the income statement top-down as a waterfall of margins. Revenue minus cost of goods sold gives gross profit. Subtract operating expenses (selling, general, administrative) and depreciation & amortisation to reach EBITDA — earnings before interest, taxes, depreciation and amortisation — the raw operating engine, comparable across companies with different financing and tax situations.',
            'EBITDA minus D&A gives EBIT (operating profit) — the profit of the business as if it were debt-free. Subtract interest expense, add interest income, and you get pre-tax income (PBT). Apply the effective tax rate to reach net income — the number that belongs to shareholders, and the top line of the cash flow statement.',
          ],
          bullets: [
            'Revenue → COGS → **Gross profit** (pricing power vs production cost)',
            'Gross profit → opex + D&A → **EBITDA** (operating engine, pre-financing)',
            'EBITDA → D&A → **EBIT** (operating profit, debt-free view)',
            'EBIT → interest → **PBT** → tax → **Net income** (shareholders\' claim)',
            'Analyst habit: always compute the margin at every level (GM%, EBITDA%, EBIT%, NI%)',
          ],
        },
        {
          heading: '3. The linkages — the heart of the model',
          body: [
            'Three statements, five critical arrows. Net income flows from the bottom of the income statement into both (a) the first line of the cash flow statement and (b) retained earnings on the balance sheet. Depreciation is added back in the cash flow statement (it is non-cash) while it simultaneously reduces the carrying value of fixed assets. Capital expenditure in the cash flow statement increases gross PP&E on the balance sheet. The ending cash balance from the cash flow statement becomes cash on the balance sheet. New debt raised in the financing section increases debt on the balance sheet, which next year increases interest expense on the income statement — which changes net income — which changes cash. The system is circular, and that circularity is a feature, not a bug.',
          ],
          callout: {
            type: 'excel',
            text: 'Circular references (interest → net income → cash → debt → interest) are handled in Excel with iterative calculation (Formulas → Calculate Now with iteration ON) or broken elegantly with a "beginning-of-period debt" convention. Know both; interviewers ask.',
          },
        },
        {
          heading: '4. The balance sheet must balance — always',
          body: [
            'Assets = Liabilities + Equity is not an accounting formality; in a model it is your smoke detector. If the balance sheet does not balance to zero (assets minus liabilities minus equity = 0.00), some linkage above is broken. Professional models carry a dedicated "check" row on every schedule: balance check, cash-flow tie-out, share-count tie-out — each showing a green ✓ or a screaming red ✗.',
            'The cash flow statement is derived, not typed. Ending cash = beginning cash + CFO + CFI + CFF. CFO starts from net income, adds back non-cash items (D&A, stock-based compensation), and adjusts for working capital changes: an increase in receivables is a cash outflow; an increase in payables is a cash inflow. CFI is negative when the company invests (capex). CFF covers debt raised/repaid, equity issued/bought back, and dividends paid.',
          ],
          bullets: [
            'Working capital rule — use USES of cash: Receivables↑, Inventory↑ → cash ↓. Payables↑ → cash ↑',
            'Cash flow sign convention — inflows positive, outflows negative, no swapping signs mid-model',
            'Every hard-coded number must live on the assumptions sheet — operating sheets contain formulas only',
          ],
        },
        {
          heading: '5. Professional formatting standards',
          body: [
            'Models are read by people who did not build them, often at 2 a.m. before a board meeting. The universal convention: blue font for hard-coded inputs, black font for formulas, green for links to other worksheets. One column = one period, always. Units and signs stated in headers. A cover sheet listing version, builder, date, and purpose. These sound cosmetic; they are the difference between a model your team trusts and one they rebuild.',
          ],
          callout: {
            type: 'note',
            text: 'Interview reality: analysts have been sent home from super-days for hard-coding a number inside a formula ("=B4*1.10" — where does 1.10 come from?). Inputs live on the assumptions tab, labelled, sourced.',
          },
        },
      ],
      diagram: {
        title: 'The three-statement engine',
        caption:
          'One system, five arrows. Every arrow is a formula link; nothing on the balance sheet or cash flow statement is ever typed in.',
        svg: threeStatementSvg,
      },
      formulas: [
        { name: 'Gross profit', expr: 'Revenue − COGS', meaning: 'What pricing power leaves after production cost' },
        { name: 'EBITDA', expr: 'Gross profit − Opex (excl. D&A)', meaning: 'Operating engine before financing, tax, accounting policy' },
        { name: 'EBIT', expr: 'EBITDA − D&A', meaning: 'Operating profit as if the firm were debt-free' },
        { name: 'Net income', expr: '(EBIT − Interest) × (1 − t)', meaning: 'Shareholders\' accounting claim' },
        { name: 'Ending cash', expr: 'Beginning cash + CFO + CFI + CFF', meaning: 'The fact behind the profit opinion' },
        { name: 'Retained earnings', expr: 'RE(prev) + Net income − Dividends', meaning: 'Undistributed profit reinvested in the business' },
      ],
      examples: [
        {
          title: 'Mini integrated model — Sunrise Foods Ltd, Year 1',
          given: [
            'Revenue ₹100 cr (forecast to grow 10%/yr)',
            'COGS 60% of revenue · Opex 20% of revenue · D&A ₹5 cr flat',
            'Tax rate 25% · Interest 10% on opening debt of ₹40 cr',
            'Capex = D&A (steady state) · No working-capital change',
          ],
          steps: [
            { text: 'Build the income statement waterfall', calc: 'GP = 100 − 60 = ₹40 cr → EBITDA = 40 − 20 = ₹20 cr → EBIT = 20 − 5 = ₹15 cr' },
            { text: 'Interest on opening debt', calc: 'Interest = 10% × 40 = ₹4 cr → PBT = 15 − 4 = ₹11 cr' },
            { text: 'Tax and net income', calc: 'Tax = 25% × 11 = ₹2.75 cr → NI = ₹8.25 cr' },
            { text: 'Cash flow statement', calc: 'CFO = NI 8.25 + D&A 5 − ΔWC 0 = ₹13.25 cr; CFI = −5 (capex); CFF = 0 → Net change = +₹8.25 cr' },
            { text: 'Balance sheet tie-out', calc: 'Cash ↑ 8.25, PP&E flat (capex = D&A), RE ↑ 8.25 → Assets +8.25 = Equity +8.25 ✓ balances' },
          ],
          answer:
            'Sunrise Foods Year 1: Net income ₹8.25 cr, cash rises ₹8.25 cr, balance sheet balances to the paisa. That tie-out — done for all five forecast years — is the model\'s integrity proof.',
        },
        {
          title: 'Diagnosing an unbalanced balance sheet',
          given: [
            'Your model shows Assets ₹512 cr vs Liabilities + Equity ₹500 cr — a ₹12 cr hole',
            'You recently added a working-capital schedule',
          ],
          steps: [
            { text: 'Check the cash flow tie-out first — is ending cash on the BS equal to the CF statement ending cash?', calc: 'CF ending ₹77 cr vs BS cash ₹89 cr → ₹12 cr difference found' },
            { text: 'The ΔWC adjust in CFO must be the CHANGE in NWC, not the level', calc: 'Receivables went 45 → 57 (↑12). Correct CFO entry = −12 (a use). Model used +12 → sign flip' },
            { text: 'Fix the sign, re-run checks', calc: 'CFO − 24 → ending cash 77 → Assets 500 = L+E 500 ✓' },
          ],
          answer:
            '₹12 cr of receivables increase was flowing in with the wrong sign. Working capital uses of cash are negative in CFO. Checks caught it in minutes instead of in the boardroom.',
        },
      ],
      caseStudy: {
        title: 'Case — "The profit mirage" at a fashion e-tailer',
        body: [
          'GlamKart, a two-year-old fashion e-tailer, shows an income statement any founder would frame: revenue up 3.2× to ₹240 cr, and a maiden net profit of ₹6 cr. The founders are raising Series B on the strength of "profitability achieved". You are the analyst on the deal team, and the first thing you open is not the P&L — it is the cash flow statement.',
          'CFO is negative ₹58 cr. Receivables have ballooned from 30 to 96 days because GlamKart launched a "pay next season" scheme for its biggest wholesale buyers — revenue was pulled forward from the future. Inventory days rose from 60 to 105 as last season\'s stock aged. The profit is an accrual artefact; the business consumed ₹58 cr of cash in its "profitable" year.',
          'The founders argue "profit is proof of model economics". The cash flow statement says the model economics are still being subsidised by suppliers and buyers.',
        ],
        questions: [
          'Which specific line items convert GlamKart\'s ₹6 cr profit into a ₹58 cr cash outflow?',
          'Restate the situation for a founder with no accounting background in two sentences.',
          'What two covenants would you attach to the Series B to protect the investors?',
        ],
        takeaways: [
          'Net income is an opinion engineered by accrual timing; CFO is closer to truth',
          'Days metrics (DSO, DIO, DPO) are the early-warning radar of every operating model',
          'In any model you build, the cash flow statement is where fiction becomes impossible',
        ],
      },
      revision: [
        'IS = period · BS = snapshot · CF = cash truth over the period',
        'Five arrows: NI→CFO · NI→RE · ending cash→BS cash · capex→PP&E · debt→interest→NI (circular)',
        'EBITDA = operating engine; EBIT = debt-free operating profit',
        'Receivables/Inventory ↑ = cash ↓ · Payables ↑ = cash ↑',
        'Blue = input · Black = formula · Green = cross-sheet link — never hard-code mid-formula',
        'Balance check row on every schedule: Assets − L − E must equal 0.00',
      ],
      practice: [
        {
          q: 'Revenue ₹500 cr, COGS 55%, opex ₹150 cr, D&A ₹30 cr, interest ₹12 cr, tax 25%. Compute EBITDA, EBIT, net income.',
          a: 'GP = 500 − 275 = 225 → EBITDA = 225 − 150 = ₹75 cr → EBIT = 75 − 30 = ₹45 cr → PBT = 45 − 12 = 33 → NI = 33 × 0.75 = ₹24.75 cr',
        },
        {
          q: 'Inventory rises ₹18 cr, receivables rise ₹7 cr, payables rise ₹10 cr. Net working-capital impact on cash?',
          a: 'Uses: inventory +18 and receivables +7 = −25; source: payables +10 = +10. Net impact = −₹15 cr (cash decreases by ₹15 cr).',
        },
        {
          q: 'Why does depreciation appear in both the income statement and the cash flow statement with opposite effects?',
          a: 'On the IS it reduces profit (accounting cost of using assets). In the CF statement it is added back because no cash left the company. Net effect on cash: zero — which is precisely why EBITDA is a cash-flow proxy.',
        },
        {
          q: 'Your model balances in Year 1–3 but breaks by ₹4 cr in Year 4. Name the first three places you look.',
          a: '(1) Cash-flow tie-out — does BS cash equal CF ending cash? (2) The debt schedule — repayments applied to both statements? (3) D&A schedule vs capex — PP&E roll-forward (opening + capex − depreciation = closing) consistent on both BS and CF?',
        },
        { q: 'Interest expense drives cash, cash drives interest. What is the modelling solution?', a: 'Circularity: enable iterative calculation (or break the loop with a copied-as-value opening balance). Never let Excel error-tag the model into IFERROR mush - fix the architecture.' },
        { q: 'Net income up but cash fell. Which statement reconciles the two and what do you check?', a: 'The cash flow statement: working capital blowout (receivables/inventory), capex, or debt repayment. Profit is an opinion; the CF statement explains the cash reality - audit the WC lines first.' },
      ],
      tools: [
        { label: 'Interactive 3-Statement Model', href: '/tools/3-statement-model' },
      ],
    },

    /* ─────────── LECTURE 3 (Unit 4 foundation · FULL) ─────────── */
    {
      slug: 'time-value-money-and-wacc',
      number: 3,
      title: 'Time Value of Money & the Cost of Capital (WACC)',
      minutes: 50,
      summary:
        'Why ₹100 today beats ₹100 next year — the discounting machinery behind every valuation — and how to blend what equity holders and lenders demand into one hurdle rate.',
      status: 'live',
      objectives: [
        'Move any cash flow backwards (PV) and forwards (FV) in time with precision',
        'Price annuities, perpetuities, and growing perpetuities',
        'Estimate cost of equity with CAPM and after-tax cost of debt from market yields',
        'Compute WACC with market-value weights and defend each input',
      ],
      sections: [
        {
          heading: '1. The one idea everything rests on',
          body: [
            'A rupee today can be invested and earns a return, so it is worth more than a rupee tomorrow. Discounting is simply compounding run in reverse: Future Value = PV × (1 + r)ⁿ, therefore Present Value = FV ÷ (1 + r)ⁿ. The rate r is not just "interest" — it is the opportunity cost of capital, the return investors could earn elsewhere at similar risk. Every valuation number you will ever produce is an opinion about two things: the cash flows, and this rate.',
          ],
          callout: {
            type: 'exam',
            text: 'Units discipline: rate per period must match the period count. 12% annual = 1% monthly = 12 periods/year. Half the TVM errors in exams are unit mismatches, not concept failures.',
          },
        },
        {
          heading: '2. Annuities, perpetuities, and the patterns business uses',
          body: [
            'Real cash flows come in patterns. A level stream for n periods is an annuity (EMIs, leases, coupon bonds). A level stream forever is a perpetuity (preferred dividends). A stream growing at g forever is a growing perpetuity — and this one formula, PV = C₁ / (r − g), is the entire engine of the Gordon Growth terminal value you will use in Lecture 3.',
            'An annuity that starts later (say from year 4) is a deferred annuity: value it as a normal annuity at its start date, then discount that lump sum back to today. Always draw the timeline — seven seconds of drawing prevents most errors.',
          ],
          bullets: [
            'Annuity: PV = C × [1 − (1+r)⁻ⁿ] / r — note it values payments at END of each period (ordinary)',
            'Perpetuity: PV = C / r — the annuity formula as n → ∞',
            'Growing perpetuity: PV = C₁ / (r − g), valid only when r > g',
            'Growing annuity: PV = C₁/(r−g) × [1 − ((1+g)/(1+r))ⁿ]',
            'Net Present Value = Σ PV(inflows) − PV(outflows); accept when NPV > 0',
          ],
        },
        {
          heading: '3. Cost of equity — CAPM',
          body: [
            'Shareholders demand more than lenders because they sit last in liquidation. The Capital Asset Pricing Model prices that demand: Re = Rf + β × MRP. The risk-free rate is the 10-year government bond yield of the currency of the cash flows (for Indian companies, the 10-year G-sec — currently the reference is around 6.5–7%; always quote the date of your data). Beta measures how the stock moves with the market — levered beta from a regression, ideally re-levered to your company\'s capital structure from industry unlevered betas. The market (equity) risk premium is what investors demand for holding the equity market instead of the risk-free asset — Indian practice commonly uses 7–9% (historical) or an implied MRP; state your source.',
            'Beta discipline: a raw regression beta over 2 years weekly is noisy. Best practice — take several listed comparables, un-lever their betas (βu = βl ÷ [1 + (1−t)·D/E]), average them, then re-lever to your target D/E: βl = βu × [1 + (1−t)·D/E]. This Hamada dance is a favourite interview question.',
          ],
          callout: {
            type: 'note',
            text: 'Beta of a stock ≠ riskiness of the business. It measures co-movement with the market. A risky-looking airline can have a low beta if its crashes are uncorrelated with the market. Diversifiable risk is not compensated — only systematic risk earns the premium.',
          },
        },
        {
          heading: '4. Cost of debt & the tax shield',
          body: [
            'The cost of debt is the yield the company would pay to borrow today — not the coupon printed on old loans. For listed bonds, use the yield-to-maturity; for private companies, use the interest rate on recent borrowing or add a credit spread to the government yield. Interest is tax-deductible in India, so the effective cost is Rd × (1 − t): at a 25% tax rate, a 9% loan truly costs 6.75%. This tax shield is why modest debt lowers WACC — until distress risk takes over.',
          ],
        },
        {
          heading: '5. WACC — the blend',
          body: [
            'WACC = E/V × Re + D/V × Rd × (1 − t), where V = E + D at MARKET values. Market value of equity = share price × diluted shares. Market value of debt is usually approximated by book value when bonds are not traded — acceptable, but say so. WACC is the discount rate for free cash flow to the FIRM (FCFF) — cash flows belonging to all capital providers. Use it as the hurdle rate: projects earning above WACC create value; below it, they burn it.',
          ],
          callout: {
            type: 'excel',
            text: 'Build a small WACC block in every model: inputs (Rf, beta, MRP, Rd, t, D, E) on the assumptions sheet, WACC as one clean formula. Change one input cell and watch valuation move — this is the muscle memory sensitivity analysis depends on.',
          },
        },
      ],
      diagram: {
        title: 'The WACC build-up',
        caption:
          'Equity is expensive but tax-free of subsidy; debt is cheap because of the tax shield and seniority. Blend at market-value weights.',
        svg: waccSvg,
      },
      formulas: [
        { name: 'Future / Present value', expr: 'FV = PV(1+r)ⁿ · PV = FV/(1+r)ⁿ', meaning: 'Compounding and its reverse' },
        { name: 'Annuity PV', expr: 'C × [1 − (1+r)⁻ⁿ]/r', meaning: 'Level stream for n periods (end-of-period)' },
        { name: 'Perpetuity PV', expr: 'C/r', meaning: 'Level stream forever — preferred stock, consols' },
        { name: 'Growing perpetuity', expr: 'C₁/(r − g)', meaning: 'The Gordon engine behind terminal value' },
        { name: 'CAPM', expr: 'Re = Rf + β × (Rm − Rf)', meaning: 'Price of systematic (market) risk' },
        { name: 'Hamada re-levering', expr: 'βl = βu × [1 + (1−t)·D/E]', meaning: 'Adjust comparable betas to your capital structure' },
        { name: 'WACC', expr: 'E/V·Re + D/V·Rd(1−t)', meaning: 'Blended hurdle rate for FCFF discounting' },
      ],
      examples: [
        {
          title: 'EMI — the annuity in every Indian household',
          given: ['Home loan ₹50 lakh', 'Rate 9% p.a. → 0.75% per month', 'Tenure 20 years = 240 months'],
          steps: [
            { text: 'Monthly rate and count', calc: 'r = 0.09/12 = 0.0075 · n = 240' },
            { text: 'Annuity factor', calc: '[1 − 1.0075⁻²⁴⁰]/0.0075 = 111.145' },
            { text: 'EMI', calc: '₹50,00,000 ÷ 111.145 = ₹44,986 per month' },
            { text: 'Total paid', calc: '44,986 × 240 = ₹1.0797 cr → interest paid = ₹57.97 lakh — more than the loan itself' },
          ],
          answer:
            'EMI ≈ ₹44,986/month; total interest ₹57.97 lakh on a ₹50 lakh loan. Early EMIs are ~80% interest — the annuity structure front-loads the lender\'s return.',
        },
        {
          title: 'Full WACC build — Aether Industries (illustrative)',
          given: [
            'Risk-free (10-yr G-sec): 6.8% · Market risk premium: 8%',
            'Unlevered beta from 5 comparables: 0.95',
            'Target D/E = 0.5 (i.e., E/V = 2/3, D/V = 1/3) · Tax 25%',
            'Company can borrow today at 9.5%',
          ],
          steps: [
            { text: 'Re-lever beta (Hamada)', calc: 'βl = 0.95 × [1 + 0.75 × 0.5] = 0.95 × 1.375 = 1.306' },
            { text: 'Cost of equity (CAPM)', calc: 'Re = 6.8% + 1.306 × 8% = 6.8% + 10.45% = 17.25%' },
            { text: 'After-tax cost of debt', calc: 'Rd(1−t) = 9.5% × 0.75 = 7.125%' },
            { text: 'Blend at market weights', calc: 'WACC = (2/3)(17.25%) + (1/3)(7.125%) = 11.50% + 2.375% = 13.87%' },
          ],
          answer:
            'WACC ≈ 13.9%. Equity holders demand 17.25%, lenders 7.125% after tax; at a 2:1 equity-to-debt value mix the blended hurdle is 13.9%. Every Aether project must clear this bar.',
        },
        {
          title: 'Valuing a preferred dividend stream',
          given: ['Perpetual preferred dividend ₹12/share', 'Investors require 9% on this paper'],
          steps: [
            { text: 'Level perpetuity', calc: 'PV = C/r = 12/0.09 = ₹133.33' },
            { text: 'If dividends grow 2% (unusual but seen in REIT-style structures)', calc: 'PV = 12/(0.09 − 0.02) = ₹171.43' },
          ],
          answer: 'Flat: ₹133.33 per share. With 2% growth: ₹171.43 — the r − g denominator does the heavy lifting.',
        },
      ],
      caseStudy: {
        title: 'Case — Airport concession: what should the toll of time be?',
        body: [
          'A state authority is bidding out a 30-year airport concession. Your infrastructure fund must lodge a bid tomorrow: an upfront payment to the authority now, in exchange for ₹310 cr of free cash flow per year for 30 years, growing 5% per year after year 1 (first flow ₹310 cr arrives one year from now).',
          'Your fund\'s investment committee argues about the discount rate for four hours. The debt team says "our loans price at 8.2%, discount at that." The equity team says "our target return is 18%, use that." The summer intern (you) quietly opens the WACC schedule: project financing will be 70% debt at 8.2% and 30% equity at 18%, tax rate 25%.',
        ],
        questions: [
          'Compute the project WACC.',
          'Value the concession as a growing annuity at that WACC. What is the maximum bid that still clears your hurdle?',
          'The authority hints cash flows could grow 6% instead of 5%. How much does your bid move? Why is this number terrifying?',
        ],
        takeaways: [
          'Never discount total-project cash flows at the debt rate alone — that pretends equity is free',
          'WACC = 0.7 × 8.2% × 0.75 + 0.3 × 18% = 9.945% — the blended rate is the honest hurdle',
          'Valuation = 310/(0.09945 − 0.05) = ₹6,249 cr. At g = 6%: 310/(0.09945 − 0.06) = ₹7,877 cr — one point of growth moves the bid ₹1,600 cr. Small denominator changes are leverage on your judgement.',
        ],
      },
      revision: [
        'PV = FV/(1+r)ⁿ — r is opportunity cost, n must match r\'s period',
        'Growing perpetuity PV = C₁/(r−g) — the terminal-value engine',
        'CAPM: Re = Rf + β·MRP — only systematic risk is paid',
        'After-tax debt cost = Rd(1−t) — the tax shield is real money',
        'WACC = E/V·Re + D/V·Rd(1−t) at MARKET values',
        'Hamada: βl = βu[1 + (1−t)D/E] — unlever comparables, average, re-lever',
      ],
      practice: [
        {
          q: 'You will receive ₹1 cr in 4 years. Opportunity cost 13%. Present value?',
          a: 'PV = 1/(1.13)⁴ = 1/1.63047 = ₹61.3 lakh.',
        },
        {
          q: 'A machine yields ₹20 lakh/year for 7 years, no salvage. Discount 11%. Max purchase price?',
          a: 'Annuity factor = [1 − 1.11⁻⁷]/0.11 = 4.712 → PV = 20 × 4.712 = ₹94.2 lakh.',
        },
        {
          q: 'Rf = 6.5%, β = 1.2, MRP = 8.5%, Rd = 9%, t = 25%, D/E = 1. WACC?',
          a: 'Re = 6.5 + 1.2×8.5 = 16.7% · Rd(1−t) = 6.75% · E/V = D/V = 0.5 → WACC = 8.35 + 3.375 = 11.7%.',
        },
        {
          q: 'Why is YTM used instead of coupon rate for cost of debt?',
          a: 'The coupon is history — set when the bond was issued. YTM is what buyers of the company\'s risk demand TODAY. Cost of capital is a forward-looking, market-based concept: it prices new borrowing, not old contracts.',
        },
        { q: 'Rf 7 percent, MRP 8 percent, beta 1.3, debt at 10 percent pre-tax, tax 25 percent, target D/E 0.6. WACC?', a: 'Re = 7 + 1.3(8) = 17.4 percent. Weights: E 62.5, D 37.5 percent. After-tax Rd = 7.5. WACC = 0.625(17.4) + 0.375(7.5) = 13.7 percent.' },
        { q: 'Why must WACC weights be market values, not book values?', a: 'Investors price the capital at what it is worth today; book equity is historical cost. Using book weights (often understating equity) misprices the hurdle and accepts bad projects.' },
      ],
      tools: [
        { label: 'WACC Calculator', href: '/tools/wacc-calculator' },
        { label: 'Time-Value Machine', href: '/tools/time-value-machine' },
      ],
    },

    /* ─────────── LECTURE 4 (Unit 4 · FULL) ─────────── */
    {
      slug: 'dcf-valuation-fcff-to-share-price',
      number: 4,
      title: 'DCF Valuation: From FCFF to a Share Price',
      minutes: 60,
      summary:
        'The summit lecture — forecast free cash flow to the firm, cap it with a terminal value, discount at WACC, bridge enterprise to equity value, and defend a per-share number with sensitivity analysis.',
      status: 'live',
      objectives: [
        'Derive FCFF from EBIT and from net income — and know when each is faster',
        'Choose and defend a terminal value method (Gordon vs exit multiple) and check it for sanity',
        'Bridge enterprise value → equity value → per-share value precisely',
        'Build one-way and two-way sensitivity tables and present a valuation RANGE, not a point',
      ],
      sections: [
        {
          heading: '1. FCFF — the cash flow that belongs to everyone',
          body: [
            'Free cash flow to the firm is the cash generated by operations that is available to ALL capital providers — lenders and shareholders — after the company has reinvested to sustain and grow. From EBIT: FCFF = EBIT × (1 − t) + D&A − Capex − ΔNWC. From net income: FCFF = NI + Interest × (1 − t) + D&A − Capex − ΔNWC (add back after-tax interest because financing cost is deliberately excluded — WACC already prices it).',
            'Why start from EBIT? Because the DCF logic is: value the BUSINESS first (enterprise), then subtract what is owed to get the SHAREHOLDERS\' slice. Mixing financing into the cash flows while also discounting at WACC double-counts debt.',
          ],
          callout: {
            type: 'warning',
            text: 'Never discount FCFF at cost of equity, never discount FCFE at WACC. FCFF ↔ WACC (firm rate). FCFE ↔ Re (equity rate). This mismatch is the single most common valuation error in exams and in real analyst decks.',
          },
        },
        {
          heading: '2. The explicit forecast — long enough to reach steady state',
          body: [
            'You forecast explicitly until the business looks "boring": revenue growing at a stable rate, margins stable, capex converging toward depreciation (growth investment done). This is usually 5–10 years. The forecast must be DRIVER-based: units × price for revenue; % of revenue for costs; days ratios for working capital. A DCF driven by "management guidance" is a press release with spreadsheets.',
          ],
          bullets: [
            'Revenue: volume × realisation, or market size × share — pick the driver you can defend',
            'Margins: anchor on history, adjust for known catalysts (mix, leverage, competition)',
            'Capex: split maintenance vs growth; in steady state capex ≈ D&A + a little (inflation)',
            'ΔNWC: driven by DSO/DIO/DPO days — tie it back to Lecture 1\'s working-capital engine',
            'Tax: use the effective cash tax rate, not the statutory one, once profitable',
          ],
        },
        {
          heading: '3. Terminal value — where 60–75% of the answer hides',
          body: [
            'Gordon Growth: TV = FCFF₍ₙ₊₁₎ / (WACC − g), where FCFF₍ₙ₊₁₎ = FCFFₙ × (1+g). The growth rate g must be sustainable FOREVER: at or below long-run nominal GDP growth (for India, real ~5–6% plus inflation ~4–5% → nominal ~9–11%; a safe perpetual g is 4–6%, rarely higher). Exit multiple: TV = final-year EBITDA × peer trading multiple — pragmatic, but it smuggles market prices into a method whose entire point was independence from them.',
            'Sanity check every Gordon TV: at g = 5% and WACC = 12%, the implied multiple is (1+g)/(WACC−g) = 1.05/0.07 = 15× next-year FCFF. If peers trade at 9–10× EBITDA and your implied EV/EBITDA at exit is 18×, your g or your WACC is wrong, and now you know which lecture to reread.',
          ],
          callout: {
            type: 'exam',
            text: 'TV formula uses NEXT year\'s cash flow (FCFFₙ × (1+g)), then you discount TV back n periods — not n+1. Two marks lost to this every single exam season.',
          },
        },
        {
          heading: '4. The bridge — enterprise to equity to per share',
          body: [
            'Enterprise value = Σ PV(FCFF, years 1..n) + PV(TV). Then the bridge: Equity value = EV − net debt − preferred stock − minority interest + investments/associates (unconsolidated assets the market values separately). Net debt = total debt (including leases in modern practice) − cash & equivalents. Per share = equity value ÷ DILUTED shares (treasury method for options/ESOPs — yes, employees exercise when the price is above strike).',
            'Finally, the recommendation is comparative: per-share value vs market price. Value 15%+ above price → buy thesis; 15% below → sell/avoid; in between → hold. No DCF is precise enough to call a 4% gap.',
          ],
        },
        {
          heading: '5. Sensitivity — the honest analyst\'s signature',
          body: [
            'Change WACC ±1% and g ±0.5% around your base case and watch the equity value dance. Present the answer as a range with a base case, bull and bear. If your recommendation flips inside the range, say so — that integrity is what the job actually is. A one-page football field chart (DCF range, multiples range, 52-week trading range) is the standard visual summary.',
          ],
          callout: {
            type: 'excel',
            text: 'Excel: Data → What-If Analysis → Data Table, with WACC down the side and g across the top gives you the two-way table in ten seconds — once your model is driver-based, which is exactly why Lectures 1–2 existed.',
          },
        },
      ],
      diagram: {
        title: 'The DCF bridge',
        caption:
          'Forecast, cap with terminal value, discount, then strip out debt to reach what a share is worth.',
        svg: dcfBridgeSvg,
      },
      formulas: [
        { name: 'FCFF (from EBIT)', expr: 'EBIT(1−t) + D&A − Capex − ΔNWC', meaning: 'Cash to all capital providers' },
        { name: 'FCFF (from NI)', expr: 'NI + Int(1−t) + D&A − Capex − ΔNWC', meaning: 'Same animal, reconciled from the bottom line' },
        { name: 'Terminal value (Gordon)', expr: 'TV = FCFFₙ(1+g)/(WACC−g)', meaning: 'Steady-state value of everything after year n' },
        { name: 'Enterprise value', expr: 'EV = Σ PV(FCFF) + PV(TV)', meaning: 'Value of the operating business' },
        { name: 'Equity bridge', expr: 'EqV = EV − net debt − prefs − MI + associates', meaning: 'Shareholders\' slice of EV' },
        { name: 'Per share', expr: 'EqV ÷ diluted shares', meaning: 'The number the market quotes' },
      ],
      examples: [
        {
          title: 'Complete mini-DCF — NeoCap Retail Ltd',
          given: [
            'WACC 12% (from Lecture 2) · perpetual growth g = 5%',
            'FCFF forecasts (₹ cr): Y1 80, Y2 92, Y3 104, Y4 114, Y5 122',
            'Debt ₹300 cr · Cash ₹80 cr · Diluted shares 10 cr',
          ],
          steps: [
            { text: 'PV of explicit FCFF at 12%', calc: '80/1.12 + 92/1.2544 + 104/1.4049 + 114/1.5735 + 122/1.7623 = 71.4 + 73.3 + 74.0 + 72.5 + 69.2 = ₹360.4 cr' },
            { text: 'Terminal value at end of Y5', calc: 'TV = 122 × 1.05 / (0.12 − 0.05) = 128.1/0.07 = ₹1,830 cr' },
            { text: 'PV of TV', calc: '1,830/1.7623 = ₹1,038.4 cr' },
            { text: 'Enterprise value', calc: 'EV = 360.4 + 1,038.4 = ₹1,398.8 cr' },
            { text: 'Equity bridge', calc: 'EqV = 1,398.8 − (300 − 80) = 1,398.8 − 220 = ₹1,178.8 cr' },
            { text: 'Per share', calc: '1,178.8 ÷ 10 = ₹117.9 per share' },
          ],
          answer:
            'NeoCap is worth ≈ ₹118/share. Note the anatomy: PV(TV) is ₹1,038 cr of ₹1,399 cr EV — 74% of the valuation lives in the terminal value. Your g and WACC assumptions ARE the valuation.',
        },
        {
          title: 'Two-way sensitivity — NeoCap',
          given: ['Base: WACC 12%, g 5% → ₹118/share'],
          steps: [
            { text: 'WACC 11%, g 5%', calc: 'TV = 128.1/0.06 = 2,135 → PV(TV) = 1,211 → EqV ≈ 1,352 → ₹135/share' },
            { text: 'WACC 13%, g 5%', calc: 'TV = 128.1/0.08 = 1,601 → PV(TV) = 909 → EqV ≈ 1,050 → ₹105/share' },
            { text: 'WACC 12%, g 4%', calc: 'TV = 122×1.04/0.08 = 1,586 → PV(TV) = 900 → EqV ≈ 1,041 → ₹104/share' },
            { text: 'WACC 12%, g 6%', calc: 'TV = 122×1.06/0.06 = 2,155 → PV(TV) = 1,223 → EqV ≈ 1,363 → ₹136/share' },
          ],
          answer:
            'Range: ₹104–136/share around the ₹118 base. A ±1% WACC move swings value ~±12% — present the range, flag the drivers, and never pretend the point estimate is the truth.',
        },
      ],
      caseStudy: {
        title: 'Case — Should the fund buy "Bharat Logistics" at ₹240?',
        body: [
          'Bharat Logistics (BL) runs cold-chain warehousing across 14 cities. Revenue ₹900 cr growing 18% (industry 12% — BL is taking share). EBITDA margin 22%, guided to 25% by Y3 as new facilities ramp. The promoter family wants to sell 26% at ₹240/share; the stock trades at ₹207. Your fund\'s DCF (WACC 13%, g 4.5%) values BL at ₹262/share; at WACC 14% it drops to ₹221.',
          'The sell-side banker\'s deck shows a DCF at ₹289/share — built on 10 years of 20%+ growth (industry is 12%) and terminal growth of 6.5% "reflecting India\'s growth story". He calls your 13% WACC "overly conservative for a listed infrastructure platform".',
          'You get one slide at the investment committee: recommend, reject, or re-price — with reasons.',
        ],
        questions: [
          'Decompose the banker\'s ₹289 vs your ₹262 — which assumptions drive the gap?',
          'Is 6.5% perpetual growth defensible? Anchor your answer in nominal GDP logic.',
          'What would make YOU raise your valuation — i.e., which of your assumptions is actually soft?',
        ],
        takeaways: [
          'Most DCF disputes are really two-input disputes: g and WACC — the (WACC − g) denominator does the shouting',
          'Growth above nominal GDP forever implies the company eventually IS the economy — the reductio that kills heroic g',
          'A DCF is a structured opinion: your edge is disciplined inputs, not the formula',
        ],
      },
      revision: [
        'FCFF = EBIT(1−t) + D&A − Capex − ΔNWC — firm cash flow, discount at WACC',
        'TV = FCFFₙ(1+g)/(WACC−g) — discount back n years; g ≤ nominal GDP (~4–6%)',
        'EV = ΣPV(FCFF) + PV(TV); EqV = EV − net debt − prefs − MI + associates',
        'Per share = EqV ÷ DILUTED shares',
        'PV(TV) is typically 60–75% of EV — sanity-check the implied exit multiple',
        'Always present a sensitivity range; flip inside the range = say so',
      ],
      practice: [
        {
          q: 'EBIT ₹60 cr, t 25%, D&A ₹12 cr, capex ₹18 cr, ΔNWC ₹6 cr. FCFF?',
          a: '60×0.75 = 45 + 12 − 18 − 6 = ₹33 cr.',
        },
        {
          q: 'Y5 FCFF ₹150 cr, WACC 11%, g 4%. Terminal value and its PV?',
          a: 'TV = 150×1.04/(0.11−0.04) = 156/0.07 = ₹2,228.6 cr → PV = 2,228.6/1.11⁵ = 2,228.6/1.6851 = ₹1,322.7 cr.',
        },
        {
          q: 'EV ₹1,200 cr, debt ₹450 cr (incl. leases), cash ₹120 cr, minority interest ₹30 cr. Equity value? And with 8 cr diluted shares?',
          a: 'EqV = 1,200 − (450−120) − 30 = ₹840 cr → ₹105/share.',
        },
        {
          q: 'Your DCF says ₹300/share; market price ₹290. Recommend?',
          a: 'Value is ~3.4% above price — inside any honest DCF error band. Hold / indifferent. Take a view only when the gap exceeds your sensitivity range.',
        },
        { q: 'FCFF grows 5 percent into a WACC of 11 percent. Analyst uses g = 10.5 percent. What is wrong?', a: 'Terminal value explodes (denominator 0.5 percent) - g must stay below long-run nominal GDP growth (say 4-6 percent for India). A 10.5 percent perpetuity claims the company outgrows the economy forever.' },
        { q: 'EV Rs 5,000 cr, debt Rs 1,800 cr, cash Rs 300 cr, 10 cr shares. Value per share?', a: 'Equity = 5,000 - 1,800 + 300 = Rs 3,500 cr, i.e. Rs 350 per share. EV is the whole firm; walk down the waterfall to equity before dividing by share count.' },
      ],
      tools: [
        { label: 'Full DCF Valuation Model', href: '/tools/dcf-valuation-model' },
        { label: 'WACC Calculator', href: '/tools/wacc-calculator' },
        { label: 'Ratio Analyzer', href: '/tools/ratio-analyzer' },
      ],
    },

    /* ─────────── LECTURE 5 (Unit 4 · outline) ─────────── */
    {
      slug: 'relative-valuation-multiples',
      number: 5,
      title: 'Relative Valuation: Trading & Transaction Multiples',
      minutes: 40,
      summary:
        'EV/EBITDA, P/E, EV/Sales — when each is honest, how to build a comps set, and how to reconcile multiple-based value against your DCF.',
      status: 'live',
      objectives: [
        'Match the right multiple to the right business model',
        'Build a defensible comparable-company set with trailing vs forward metrics',
        'Control for growth and returns when comparing multiples',
        'Reconcile a multiples-based value against the DCF from lecture 3',
      ],
      sections: [
        {
          heading: '1. The multiples and when each is honest',
          body: [
            '**Enterprise multiples** (numerator EV = market cap + debt − cash): **EV/EBITDA** — the workhorse: capital-structure neutral, ignores depreciation politics, right for capital-heavy or levered businesses (infra, steel, telecom). **EV/EBIT** — adds back D&A only when capex ≈ D&A (a tax-honest variant). **EV/Sales** — for unprofitable-but-growing (SaaS, new-age platforms); dangerous without a margin view: always pair with EV/Sales-to-gross-profit or a growth adjustment. **EV/IC** (invested capital) — the value-to-book-of-operations test that exposes reinvestment intensity. **Equity multiples**: **P/E** — the retail default; honest when capital structure is clean and earnings are sustainable; broken by leverage swings, one-offs, cyclical trough EPS. **P/B** — banks and financials (book IS the asset base); meaningless for asset-light. **P/CF** (price/operating cash flow or FCF) — hardest to manipulate. Dividend yield — only for stable payers.',
            '**Four disciplines make comps honest**: (1) *consistent EV* — market cap at a single date + net debt from the LAST balance sheet (mismatched dates = garbage); (2) *denominator consistency* — EV pairs with pre-interest metrics (EBITDA, sales), price pairs with post-interest (PAT, EPS); mixing them is the classic beginner crime; (3) *normalise* the metric — strip one-offs (exceptional items, Ind-AS 116 effects, inventory windfalls) from BOTH your target and the peers; (4) *know your set* — same industry, same growth regime, same capital intensity; 6–12 genuine comparables beat 40 loose ones. Trailing (LTM) vs **forward (NTM)** multiples: forward prices expectations — use forward for growth businesses, and always say which you used.',
          ],
          callout: {
            type: 'exam',
            text: 'Multiple choice trap: "P/E is capital-structure neutral" — FALSE (leverage inflates P/E for a levered firm via equity-risk mechanics; EV/EBITDA is the neutral one). Also memorise: EV = market cap + debt + minority interest + preference − cash & investments; the four adjustments (minority, preference, non-core investments) are where accuracy lives.',
          },
        },
        {
          heading: '2. Comparables workflow and reconciliation to DCF',
          body: [
            '**Workflow**: define the target\'s economics (growth, margins, capital intensity) → screen peers (industry, size, geography) → collect LTM and NTM metrics from filings/screener → normalise → tabulate min/median/mean/max → apply with a reason ("target grows 4 pts faster than median; apply 75th percentile EV/EBITDA") → cross-check with a second multiple and a DCF. **Controlling for growth and returns**: PEG = P/E ÷ growth (rough growth-adjustment; honest only within similar risk classes); the cleaner logic — a company deserves a higher multiple than peers ONLY for higher growth OR higher incremental ROIC; if ROIC < WACC, growth DESTROYS value and deserves a lower multiple (the F06 Unit 2 link: g = ROIC × retention; value spreads = (ROIC − WACC) × IC/g). When growth is the whole story, move to EV/Sales × target margin ("if it earns peer margins at 3x sales, EV = peer EV/Sales × implied EBITDA").',
            '**Trading vs transaction comps**: trading multiples = where the market prices listed peers daily (transparent, contemporaneous); **transaction (deal) comps** = multiples paid in M&A of similar companies (include control premium, 20–30% typically, and synergies) — use for valuing a controlling stake; precedent transactions also anchor fairness opinions. Reconciliation: your DCF says ₹780/share; median comps say ₹650 and deal comps ₹820 — present all three on a **football field** (lecture 6); the DCF carries the thesis, the multiples carry the market\'s verdict, the gap is where the argument lives. If DCF and comps disagree by >20%, the error is usually in the DCF\'s terminal assumptions or in peer selection — triangulate, never average blindly.',
          ],
          bullets: [
            'EV/EBITDA: structure-neutral, capital-heavy businesses; P/E: clean-structure profitable ones',
            'EV/Sales only with a margin bridge; P/B for banks; P/CF hardest to cook',
            'EV pairs with pre-interest metrics; price with post-interest — never cross',
            'Normalise one-offs in target AND peers; state LTM vs NTM',
            'Deal comps carry control premia (20–30%) — do not mix with trading comps silently',
            'Higher multiple requires higher growth OR higher ROIC; growth below WACC deserves less',
          ],
        },
      ],
      diagram: {
        title: 'Comps workflow and the football-field reconciliation',
        caption: 'Screen → normalise → apply → cross-check; every method lands as a bar on the football field.',
        svg: `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comps workflow to football field">
  <defs><marker id="va" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="16" y="60" width="120" height="44" rx="9" fill="#e0f2fe"/><text x="76" y="78" fill="#0c4a6e" font-weight="600">1 Screen</text><text x="76" y="94" fill="#075985">industry · size</text>
    <rect x="156" y="60" width="120" height="44" rx="9" fill="#dcfce7"/><text x="216" y="78" fill="#14532d" font-weight="600">2 Normalise</text><text x="216" y="94" fill="#166534">strip one-offs</text>
    <rect x="296" y="60" width="120" height="44" rx="9" fill="#fef9c3"/><text x="356" y="78" fill="#713f12" font-weight="600">3 Apply</text><text x="356" y="94" fill="#a16207">median + reason</text>
    <rect x="436" y="60" width="140" height="44" rx="9" fill="#fee2e2"/><text x="506" y="78" fill="#7f1d1d" font-weight="600">4 Cross-check</text><text x="506" y="94" fill="#991b1b">2nd multiple + DCF</text>
    <line x1="136" y1="82" x2="154" y2="82" stroke="#475569" stroke-width="1.5" marker-end="url(#va)"/>
    <line x1="276" y1="82" x2="294" y2="82" stroke="#475569" stroke-width="1.5" marker-end="url(#va)"/>
    <line x1="416" y1="82" x2="434" y2="82" stroke="#475569" stroke-width="1.5" marker-end="url(#va)"/>
    <line x1="576" y1="82" x2="620" y2="120" stroke="#475569" stroke-width="1.5" marker-end="url(#va)"/>
    <rect x="16" y="150" width="560" height="66" rx="10" fill="#f8fafc"/>
    <text x="296" y="172" fill="#334155" font-weight="600">FOOTBALL FIELD — value per share (₹)</text>
    <line x1="46" y1="196" x2="546" y2="196" stroke="#94a3b8" stroke-width="1"/>
    <rect x="120" y="182" width="120" height="12" fill="#0ea5e9"/><text x="182" y="178" fill="#075985" font-size="10">comps (trading)</text>
    <rect x="170" y="182" width="150" height="12" fill="#16a34a"/><text x="245" y="178" fill="#14532d" font-size="10">deal comps</text>
    <rect x="140" y="182" width="260" height="12" fill="#7c3aed"/><text x="280" y="204" fill="#4c1d95" font-size="10">DCF (base)</text>
    <text x="600" y="188" fill="#334155">overlap =</text>
    <text x="600" y="202" fill="#334155">the defensible</text>
    <text x="600" y="216" fill="#334155">range</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Enterprise value', expr: 'EV = Mkt cap + Debt + Minority + Pref − Cash − Investments', meaning: 'Price of the whole business' },
        { name: 'EV/EBITDA application', expr: 'EV = peer multiple × target EBITDA; Equity = EV − net debt', meaning: 'Comps valuation bridge' },
        { name: 'PEG', expr: 'P/E ÷ expected growth (%)', meaning: 'Growth-adjusted P/E' },
        { name: 'Value spread logic', expr: 'Deserved multiple premium ⇔ higher g or higher (ROIC − WACC)', meaning: 'Why multiples differ' },
      ],
      examples: [
        {
          title: 'Comps table in practice (illustrative five names)',
          given: [
            'Peers EV/EBITDA (NTM): 9.2x, 10.5x, 11.8x, 8.7x, 12.6x → median 10.5x, mean 10.6x',
            'Target: LTM EBITDA ₹220 cr, net debt ₹980 cr, shares 10 cr',
            'Target grows 12% vs peer median 7%; ROIC 19% vs peer 14%; WACC 11%',
          ],
          steps: [
            { text: 'Pick the multiple with a reason', calc: 'Higher growth AND higher ROIC spread justify the 75th percentile ≈ 11.8x (not the median by default, not the max by hope)' },
            { text: 'Value the enterprise', calc: 'EV = 11.8 × 220 = ₹2,596 cr' },
            { text: 'Bridge to equity', calc: 'Equity = 2,596 − 980 = ₹1,616 cr ⇒ ₹161.6/share' },
            { text: 'Sanity checks', calc: 'P/E implied: assume PAT ₹120 cr → P/E = 13.5x vs peer median 15x — consistent, not heroic; if the DCF said ₹210, hunt the gap in terminal g/ROIC before concluding "market is wrong"' },
          ],
          answer: '₹161–162/share from comps; the discipline is the written reason for 11.8x — multiples are arguments, not averages.',
        },
        {
          title: 'EV/Sales with a margin bridge (loss-making SaaS)',
          given: ['Target: revenue ₹300 cr, EBITDA −₹40 cr, gross margin 68%', 'Peers: EV/Revenue 6–9x at 65–70% gross margins, growing 30%+'],
          steps: [
            { text: 'Cannot use EBITDA', calc: 'Negative denominator → EV/EBITDA meaningless; EV/Sales is the honest metric' },
            { text: 'Peer anchoring', calc: 'Median EV/Sales ≈ 7x for the growth band; target growth 28% (peer 30%) → apply 6.5x' },
            { text: 'Value', calc: 'EV = 6.5 × 300 = ₹1,950 cr' },
            { text: 'Margin bridge reality-check', calc: 'If mature EBITDA margin reaches 25% (peer steady state), implied EV/EBITDA = 1950/75 = 26x — rich vs mature software at 14–18x ⇒ either the market pays for growth beyond EBITDA, or 6.5x sales overprices the target: state both' },
          ],
          answer: 'EV/Sales gives ₹1,950 cr with a margin-bridge caveat — the bridge exposes what the multiple silently assumes.',
        },
      ],
      caseStudy: {
        title: 'Case — Two banks, one P/B: why the market pays 2.4x for one and 0.8x for the other',
        body: [
          'Bank A: ROE 17%, COE 13%, growth 12%, P/B 2.4x. Bank B: ROE 9%, COE 13%, growth 5%, P/B 0.8x. A trainee values a third bank at the sector median P/B of 1.6x.',
          'The justifiable P/B for a bank: (ROE − g)/(COE − g) — value grows from the spread of ROE over COE, discounted for how long growth can be sustained.',
        ],
        questions: [
          'Compute the justified P/B for A and B at g = 6%.',
          'Why is the median application wrong?',
          'What event would collapse A\'s premium?',
        ],
        takeaways: [
          'A: (17−6)/(13−6) = 1.57x fair vs 2.4x traded — market pays for quality duration/franchise beyond the simple formula; B: (9−6)/(13−6) = 0.43x vs 0.8x — even 0.8x embeds recovery hopes',
          'Median P/B ignores the ROE–COE spread that CREATES book value; for financials, justified P/B = (ROE − g)/(COE − g) is the sanity anchor',
          'A\'s premium collapses if ROE mean-reverts (credit-cycle NPA wave, margin compression) — exactly the 2019 Indian banking experience for high-P/B private banks was NOT collapse but the PSUs\' 0.4x books showed the floor is deep',
          'Lesson: multiples embed assumptions — reverse-engineer them (implied ROE/growth) before applying them',
        ],
      },
      revision: [
        'EV = mkt cap + debt + minority + pref − cash − investments',
        'EV multiples: EBITDA (structure-neutral), EBIT, Sales (pair with margin view), IC',
        'Equity multiples: P/E (clean structure), P/B (banks), P/CF (hard to cook), div yield',
        'NEVER mix EV with post-interest metrics or price with pre-interest',
        'Normalise one-offs; state LTM vs NTM; 6–12 true peers beat 40 loose ones',
        'PEG = P/E ÷ g; premium multiple needs premium growth or premium ROIC',
        'Growth below WACC destroys value — deserves LOWER multiple',
        'Deal comps carry 20–30% control premia; separate them from trading comps',
        'Justified P/B (banks) = (ROE − g)/(COE − g)',
        'Reconcile with DCF on a football field; >20% gap = check terminal assumptions',
      ],
      practice: [
        { q: 'Company: mkt cap ₹4,000 cr, debt ₹1,200 cr, cash ₹600 cr, minority ₹200 cr, EBITDA ₹700 cr. EV/EBITDA?', a: 'EV = 4000 + 1200 + 200 − 600 = ₹4,800 cr → 4800/700 = 6.9x.' },
        { q: 'A peer trades at 25x P/E, 40% growth; your target is 10% growth. Apply 25x?', a: 'No — PEG-logic: peer PEG ≈ 0.63; at your 10% growth the equivalent is ~6.3x P/E (or apply a sector-typical PEG to your growth). Copying a growth stock\'s P/E onto a slower grower imports expectations the target cannot deliver.' },
        { q: 'Why do transaction multiples exceed trading multiples?', a: 'Acquirers pay for control (redirect cash flows, replace management) and often synergies — the 20–30% premium is the price of that authority. Use transaction comps for control stakes, trading comps for minority positions.' },
        { q: 'Peer P/E 20, your target P/E 14 with identical growth. Cheap, or value trap?', a: 'Neither conclusion yet - check WHY: ROE, risk, governance, one-off earnings. A discount that persists without a reason is information; check PEG and EV/EBITDA before calling it mispriced.' },
        { q: 'When is EV/Sales the only usable multiple?', a: 'Distressed or early-stage companies with negative EBITDA and earnings - revenue is the last positive line. Then the multiple must be paired with margin-recovery assumptions to mean anything.' },
      ],
    },
    {
      slug: 'scenario-sensitivity-analysis',
      number: 6,
      title: 'Scenario, Sensitivity & Reality-Checks',
      minutes: 35,
      summary:
        'Football fields, Monte Carlo thinking without the maths degree, and the professional discipline of presenting valuation as a range.',
      status: 'live',
      objectives: [
        'Build three-scenario models with switched assumption sets',
        'Construct one-way and two-way data tables',
        'Assemble a football-field summary of valuation ranges',
        'Distinguish sensitivity (one variable) from scenario (many, internally consistent)',
      ],
      sections: [
        {
          heading: '1. Sensitivity vs scenarios vs simulation',
          body: [
            '**Sensitivity** — move ONE input, hold all else fixed: tornado charts (rank drivers by output swing) and two-way tables (WACC × terminal growth → price). Honest use: identifies WHICH assumption matters; dishonest use: "all else fixed" is never true (volume and price move together). **Scenario** — MANY inputs move together in an internally consistent story: Bear (demand −15%, margin −200 bps, receivable days +20) is not three random shocks but a recession narrative where those co-move. Base/Bull/Bear with **explicit probability weights** (e.g., 50/25/25) → probability-weighted value; the weights are judgements — say them out loud and defend them. **Simulation** (lecture 7 companion) — distributions on inputs, thousands of draws → distribution of outcomes: P(NPV<0), P5–P95 — the scenario method made continuous.',
            '**Break-even analysis**: goal-seek the assumption value at which the recommendation FLIPS (NPV = 0; covenant trips; equity value = offer price). The presentation rule professionals live by: *"Base ₹780; range ₹540–₹1,050; break-even utilisation is 58% vs planned 72%; downside is the debt covenant at DSCR 1.15"* — a range with named break-evens, never a lone point estimate. Point estimates transfer false confidence; ranges transfer understanding.',
          ],
          callout: {
            type: 'excel',
            text: 'The scenario switch pattern: put Base/Bull/Bear assumption values in three columns; the active column = INDEX(block, 0, MATCH(scenario_cell, headers, 0)); all formulas read the active column. Change ONE cell → whole model re-worlds. Then Data Table across scenario numbers 1–3 to print all three answers side by side.',
          },
        },
        {
          heading: '2. Football field and reality-checks',
          body: [
            '**Football field chart**: horizontal bars per method — 52-week trading range, analyst targets, trading comps (P25–P75), deal comps, DCF (bear–bull), LBO ability-to-pay — price axis common. The overlap zone is the defensible range; the DISAGREEMENTS are the agenda for the committee ("DCF is 30% above comps because terminal ROIC 18% vs market-implied 14% — which do we believe?"). Build it in Excel: stacked-bar hack (invisible base bar + visible range bar), method names on the y-axis, current price/offer as a vertical line.',
            '**Reality-check discipline** before any valuation ships: (1) implied expectations — reverse the DCF (goal-seek the growth that justifies TODAY\'S price) and ask if those expectations are reasonable (Mauboussin\'s expectations investing); (2) sanity ratios — implied P/E and EV/EBITDA at your value vs history and peers; (3) unit and sign audit; (4) what would have to be TRUE for the bear case — every number traceable to a driver someone can own. The three failure modes of models: garbage inputs (wrong data), garbage structure (broken links, sign errors), and garbage communication (a point estimate where a range was owed). Scenario work fixes the third — the most common one.',
          ],
          bullets: [
            'Sensitivity: one variable — finds the levers (tornado)',
            'Scenario: many variables, one narrative — bear/base/bull with weights',
            'Simulation: distributions → P(outcome) — continuous scenario',
            'Break-even: the input value where the decision flips — lead with it',
            'Football field: methods on rows, value on x, overlap = defensible range',
            'Reverse-DCF: what does today\'s price imply? — the best BS detector',
          ],
        },
      ],
      diagram: {
        title: 'From point estimate to football field',
        caption: 'One model feeds three scenarios, sensitivity grids and break-evens; every method lands as a bar — the overlap is the answer.',
        svg: `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Point estimate to football field">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="16" y="80" width="150" height="52" rx="10" fill="#e0f2fe"/><text x="91" y="102" fill="#0c4a6e" font-weight="600">One model</text><text x="91" y="120" fill="#075985">base assumptions</text>
    <rect x="230" y="16" width="170" height="44" rx="10" fill="#dcfce7"/><text x="315" y="34" fill="#14532d" font-weight="600">Scenario switch</text><text x="315" y="48" fill="#166534">bear / base / bull + weights</text>
    <rect x="230" y="84" width="170" height="44" rx="10" fill="#fef9c3"/><text x="315" y="102" fill="#713f12" font-weight="600">Sensitivity</text><text x="315" y="116" fill="#a16207">tornado · 2-way table</text>
    <rect x="230" y="152" width="170" height="44" rx="10" fill="#fee2e2"/><text x="315" y="170" fill="#7f1d1d" font-weight="600">Break-evens</text><text x="315" y="184" fill="#991b1b">goal-seek flips</text>
    <rect x="470" y="80" width="120" height="52" rx="10" fill="#ede9fe"/><text x="530" y="106" fill="#4c1d95" font-weight="600">Ranges</text>
    <rect x="610" y="66" width="94" height="80" rx="10" fill="#f8fafc"/>
    <text x="657" y="90" fill="#334155" font-weight="600">Football</text>
    <text x="657" y="104" fill="#334155" font-weight="600">field</text>
    <text x="657" y="122" fill="#334155" font-size="10">overlap =</text>
    <text x="657" y="134" fill="#334155" font-size="10">answer</text>
    <line x1="166" y1="106" x2="228" y2="106" stroke="#475569" stroke-width="1.5"/>
    <line x1="166" y1="98" x2="228" y2="38" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="166" y1="114" x2="228" y2="174" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="400" y1="38" x2="468" y2="96" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="400" y1="106" x2="468" y2="106" stroke="#475569" stroke-width="1.5"/>
    <line x1="400" y1="174" x2="468" y2="118" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="590" y1="106" x2="608" y2="106" stroke="#475569" stroke-width="1.5"/>
    <text x="91" y="160" fill="#475569" font-size="11">present ranges + break-evens,</text>
    <text x="91" y="176" fill="#475569" font-size="11">never a lone point estimate</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Probability-weighted value', expr: 'V̄ = Σ pₛ · Vₛ (e.g., .5V_base + .25V_bull + .25V_bear)', meaning: 'Expected value across scenarios' },
        { name: 'Tornado bar', expr: 'ΔOutput = Output(high input) − Output(low input)', meaning: 'Driver importance ranking' },
        { name: 'Break-even input', expr: 'Goal-seek: input* such that Output(input*) = threshold', meaning: 'Where the decision flips' },
      ],
      examples: [
        {
          title: 'Three scenarios, one switch',
          given: ['Value driver: volume growth, EBITDA margin, receivable days', 'Bear: −5% / 14% / 75d; Base: 8% / 17% / 60d; Bull: 15% / 19% / 50d', 'Model outputs: ₹410 / ₹780 / ₹1,180 per share'],
          steps: [
            { text: 'Weights', calc: 'Bear 25%, Base 50%, Bull 25% (must sum to 1 — say why: recession odds, capacity ramp)' },
            { text: 'Weighted value', calc: '0.25(410) + 0.50(780) + 0.25(1180) = 102.5 + 390 + 295 = ₹787.5' },
            { text: 'Tornado', calc: 'Growth ±: 1180−410 = 770 spread; margin ±: 640; days: 210 → growth is the dominant lever — where diligence hours go' },
            { text: 'Break-evens', calc: 'Goal-seek: growth at which value = offer ₹700 → 6.1%; margin break-even 15.8% — "we can afford to lose 120 bps of margin, not 300"' },
          ],
          answer: 'Present: weighted ₹788, range ₹410–1,180, break-evens named — the committee hears risk, not just price.',
        },
        {
          title: 'Two-way table on the terminal assumptions',
          given: ['DCF share price as f(WACC, terminal g); WACC 10–13%, g 3–6%'],
          steps: [
            { text: 'Build', calc: 'Row input cell = WACC, column input = g; 4×4 grid = 16 full model recalcs in one data table' },
            { text: 'Read the corners', calc: '₹960 (10%, 6%) vs ₹410 (13%, 3%) — a 2.4x swing on two assumptions you cannot observe directly' },
            { text: 'Discipline', calc: 'Terminal assumptions drive 60–70% of a typical DCF — cap g below long-run nominal GDP (~5–6% for India) and defend WACC separately (lecture 2)' },
            { text: 'Communicate', calc: 'Quote the grid centre, not a corner: "₹620–820 across reasonable terminal assumptions"' },
          ],
          answer: 'The two-way table is the honest face of a DCF — the assumptions you know least about move the answer most.',
        },
      ],
      caseStudy: {
        title: 'Case — The point estimate that sank the pitch',
        body: [
          'A team pitches a buyout at "exactly ₹84 billion" — one number, no range. Diligence later shows receivables at 90 days (model assumed 55) and margin 190 bps below plan. The model\'s own two-way table, never shown, had priced the miss: at 75 days and −150 bps the value fell 28%.',
          'The deal closes at the pitch price; the fund re-underwrites at year 2 at a 40% markdown. The IC minutes note: "valuation presented as certainty."',
        ],
        questions: [
          'Which two presentation rules were violated?',
          'How should the ₹84 bn have been presented?',
          'What does the receivables miss teach about scenario construction?',
        ],
        takeaways: [
          'Violated: present a range with named break-evens; and reverse-engineer what the price implies (at ₹84 bn the deal needed 60-day receivables — checkable in diligence)',
          'Correct pitch: "₹61–95 bn across bear-to-bull; break-even at 70-day receivables and margin ≥16.4%; we underwrite at the 25th percentile" — same model, survivable reality',
          'Receivables belongs IN the scenario set: working-capital stretch is a recession co-mover, not an isolated input — internally consistent narratives beat random single-variable shocks',
          'Scenario work is risk transfer: the committee can disagree with WEIGHTS, but only if it can see them',
        ],
      },
      revision: [
        'Sensitivity = one variable (tornado); scenario = consistent narrative (bear/base/bull)',
        'Probability weights must sum to 1 and be defended out loud',
        'Weighted value = Σ pₛVₛ; ranges + break-evens beat point estimates',
        'Two-way table (WACC × g) exposes terminal-assumption dominance',
        'Break-even = input value where the decision flips — lead with it',
        'Football field: methods as bars; overlap = defensible range; gaps = the debate',
        'Reverse-DCF: today\'s price implies expectations — test them',
        'Working capital is a scenario co-mover, not an isolated assumption',
      ],
      practice: [
        { q: 'Bear ₹300, base ₹700, bull ₹1,200 with weights 20/60/20. Weighted value?', a: '0.2(300) + 0.6(700) + 0.2(1200) = 60 + 420 + 240 = ₹720 — above base alone because the bull tail is fatter than the bear.' },
        { q: 'Your tornado shows WACC spread 500, growth 700, margin 620. Where do diligence hours go?', a: 'Growth first (largest swing) — validate volume/market-share evidence; but WACC matters if debt-heavy: a 1-point WACC error is systematic across all cases. Rank by spread, modulated by how much you can actually verify.' },
        { q: 'Committee asks "just give us the number." Professional answer?', a: 'Give the number AND its range with break-evens: "We recommend ₹780; it is ₹540–1,050 on credible assumptions; at 58% utilisation the case dies" — certainty theatre transfers no understanding and survives no diligence.' },
        { q: 'Tornado chart says price moves NPV most. What does the CFO actually want next?', a: 'A probability view on price: scenarios with weights, or a Monte Carlo on price giving P(NPV < 0). Tornado identifies the lever; distribution prices the risk.' },
        { q: 'Sensitivity holds volume flat while price moves. Why is that optimistic?', a: 'Price and volume are correlated through demand elasticity - a price fall usually buys volume. A one-way sensitivity that ignores the link understates downside NPV resilience.' },
      ],
      tools: [
        { label: 'WACC Calculator', href: '/tools/wacc-calculator' },
      ],
    },

    /* ─────────── LECTURE 7 (Unit 3 · outline) ─────────── */
    {
      slug: 'project-appraisal-npv-irr-simulation',
      number: 7,
      title: 'Project Appraisal: NPV, IRR, Simulation & Crossover Rates',
      minutes: 45,
      summary:
        'Risk analysis in project appraisal on Excel — NPV vs IRR and their famous fights, payback and discounted payback, scenario analysis and Monte Carlo simulation, and the crossover rate that explains NPV–IRR disagreements.',
      status: 'live',
      objectives: [
        'Compute NPV, IRR, MIRR, payback and discounted payback in Excel',
        'Explain why NPV and IRR rank projects differently (scale, timing, reinvestment)',
        'Find the crossover rate and interpret it',
        'Run scenario analysis and a basic Monte Carlo simulation on project cash flows',
      ],
      sections: [
        {
          heading: '1. The capital-budgeting toolkit and its fights',
          body: [
            '**NPV** = Σ CFₜ/(1+r)ᵗ − I₀ — absolute rupees of value created at the hurdle rate; additive across projects; the theoretically correct rule (value maximisation). **IRR** = the r making NPV = 0 — intuitive percentage; but breaks: (1) **multiple IRRs** when signs flip more than once (mine: outflow, inflows, closure outflow), (2) **no IRR** for pure sign patterns that never cross, (3) **scale blindness** — ₹1 at 100% beats ₹100 cr at 22% by IRR but not by NPV, (4) the **reinvestment assumption** — IRR implicitly reinvests interim flows AT the IRR (flattering), NPV at the hurdle (defensible). **MIRR** fixes (4): specify a finance rate for negatives and a reinvestment rate for positives, solve once — Excel =MIRR(flows, finance, reinvest). **Payback** = years to recover the outlay (liquidity screen, ignores time value and everything after the cut-off); **discounted payback** fixes time value, still blind to the tail — both are gates, never rankers.',
            '**The NPV–IRR ranking conflict**: two mutually exclusive projects, different scale or different timing (one front-loads flows) → IRR prefers the small/quick, NPV the large/long at low hurdles. **Crossover rate** = the discount rate where the two projects\' NPVs are EQUAL — below it one ranks first, above it the other. Find it: NPV the DIFFERENCE of the flows (A − B) and IRR that difference stream. Decision rule: at the actual hurdle rate, take the higher NPV — the percentage intuition of IRR is a communication device, not the decision criterion. Under **capital rationing** (budget-capped, projects divisible): rank by **profitability index** PI = PV(inflows)/I₀ and fill the budget; indivisible projects → solve the knapsack (Solver).',
          ],
          callout: {
            type: 'exam',
            text: 'The four-question IRR quiz, always: (1) scale conflict — small project higher IRR, lower NPV? (2) timing conflict — front-loaded vs back-loaded? (3) sign flips — multiple IRRs? (4) reinvestment — IRR at IRR vs NPV at hurdle? The crossover rate question: IRR the DIFFERENCE of the two cash-flow streams, then state which project wins BELOW and ABOVE it.',
          },
        },
        {
          heading: '2. Risk analysis: scenarios to Monte Carlo',
          body: [
            '**Scenario analysis** on projects (lecture 6\'s machinery applied to CF schedules): Bear/Base/Bull on volume, price, margin, working capital — with the project-finance additions that matter (F02/PGDM 301 links): **DSCR** (CFADS/Debt service — covenant 1.20 typical), **payback vs facility tenor**, and break-even **capacity utilisation**. **Sensitivity**: one-at-a-time swings; report as break-evens ("NPV = 0 at 61% utilisation") rather than value swings — break-evens are decisions.',
            '**Monte Carlo in Excel without add-ins**: (1) replace point inputs with draws — volume = NORM.INV(RAND(), 100, 12); price = triangular-ish via =base*(1+ (RAND()−0.5)*spread); (2) compute NPV/IRR from the drawn row; (3) press F9 repeatedly OR wrap the model in a **one-variable data table of 1,000 rows** (row i = recalc index) to harvest 1,000 trials; (4) read the output distribution: mean, P(NPV<0), P5/P50/P95 — =PERCENTILE(range, 0.05). Discipline: distributions need sources (historical vol, expert bands); **garbage distributions in, garbage distributions out**; correlations between volume and price must be modelled or the risk is understated (recessions hit both). Report: *"Mean NPV ₹38 cr; P5 −₹12 cr; 18% chance of value destruction — versus point-estimate NPV ₹45 cr and false certainty."* Simulation = distributions in, a decision out — not a forecast of the future, a map of what the model believes.',
          ],
          bullets: [
            'NPV = rupees created (the rule); IRR = % (the intuition); MIRR = the honest %',
            'Payback/discounted payback: liquidity gates, blind to tails — never rank',
            'Crossover rate: IRR of (A − B); winner flips across it',
            'Capital rationing: rank by PI = PV/I₀; indivisible → Solver knapsack',
            'Project health trio: NPV, DSCR ≥ 1.2, break-even utilisation',
            'Monte Carlo: NORM.INV(RAND(), μ, σ) × data-table trials → P(NPV<0)',
            'Model volume–price correlation or understate crash risk',
          ],
        },
      ],
      diagram: {
        title: 'NPV profiles and the crossover rate',
        caption: 'Both NPV curves fall with the discount rate; where they cross, the ranking flips — the answer to every NPV-vs-IRR conflict.',
        svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NPV profiles crossover diagram">
  <g font-family="inherit" font-size="12">
    <line x1="70" y1="200" x2="660" y2="200" stroke="#475569" stroke-width="1.5"/>
    <line x1="70" y1="200" x2="70" y2="24" stroke="#475569" stroke-width="1.5"/>
    <text x="620" y="220" fill="#475569">discount rate r →</text>
    <text x="30" y="34" fill="#475569">NPV</text>
    <path d="M110,60 C260,120 420,170 640,196" fill="none" stroke="#16a34a" stroke-width="3"/>
    <path d="M110,90 C240,130 380,168 600,200" fill="none" stroke="#7c3aed" stroke-width="3"/>
    <circle cx="410" cy="163" r="7" fill="#dc2626"/>
    <line x1="410" y1="163" x2="410" y2="200" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="4 3"/>
    <text x="418" y="214" fill="#dc2626" font-weight="600">crossover ~13%</text>
    <text x="130" y="52" fill="#16a34a" font-weight="600">A — larger, longer flows</text>
    <text x="130" y="120" fill="#7c3aed" font-weight="600">B — smaller, faster</text>
    <line x1="255" y1="200" x2="255" y2="96" stroke="#475569" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="238" y="214" fill="#475569">hurdle 10%</text>
    <text x="262" y="94" fill="#475569" font-size="11">at 10%: A above B → NPV picks A</text>
    <text x="262" y="110" fill="#475569" font-size="11">B hits zero later → IRR_B &gt; IRR_A → IRR picks B</text>
    <text x="80" y="238" fill="#475569" font-size="11">above the crossover the ranking flips; decision = NPV at the ACTUAL hurdle</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'NPV (dated)', expr: '=XNPV(rate, flows, dates)', meaning: 'Value created at the hurdle' },
        { name: 'IRR / MIRR', expr: '=XIRR(flows, dates) · =MIRR(flows, fin%, reinvest%)', meaning: 'Return measures — honest and default' },
        { name: 'Crossover rate', expr: 'IRR of the stream (CFᴬₜ − CFᴮₜ)', meaning: 'Where the ranking flips' },
        { name: 'Profitability index', expr: 'PI = PV(inflows) / Investment', meaning: 'Rationing ranker' },
        { name: 'Monte Carlo draw', expr: '=NORM.INV(RAND(), mean, sd)', meaning: 'Distribution into the model' },
      ],
      examples: [
        {
          title: 'The classic conflict, fully solved',
          given: [
            'A: −₹1,000; +₹700, +₹500, +₹300 (yrs 1–3)',
            'B: −₹400; +₹300, +₹200, +₹150',
            'Hurdle 10%',
          ],
          steps: [
            { text: 'NPVs at 10%', calc: 'A: −1000 + 636.4 + 413.2 + 225.4 = +₹275.0 · B: −400 + 272.7 + 165.3 + 112.7 = +₹150.7' },
            { text: 'IRRs', calc: 'A ≈ 24.9% · B ≈ 30.1% — IRR prefers B, NPV prefers A: scale conflict' },
            { text: 'Crossover', calc: 'Difference (A−B): −600, +400, +300, +150 → IRR ≈ 15.6%; below 15.6% A wins on NPV, above it B does' },
            { text: 'Decision', calc: 'At the 10% hurdle, take A (NPV ₹275 vs ₹151) — the company exists to make rupees, not percentages; B wins only if capital is capped (rationing → PI: B = 550.7/400 = 1.38 vs A = 1275/1000 = 1.28 — B fills a tight budget better)' },
          ],
          answer: 'NPV picks A, IRR picks B, crossover 15.6% explains everything, PI arbitrates rationing — one table, four tools.',
        },
        {
          title: 'Monte Carlo in fifteen minutes',
          given: ['Machine ₹10 cr; volume ~ N(100k, 15k) units; price fixed ₹150; variable cost ₹100; 5-yr life; 12% hurdle'],
          steps: [
            { text: 'Draw column', calc: 'Volume cell = NORM.INV(RAND(), 100000, 15000); contribution = (150−100)×volume −₹0.6 cr fixed' },
            { text: 'Harvest trials', calc: '1,000-row one-input data table on the NPV cell → 1,000 NPVs' },
            { text: 'Read output', calc: 'Mean NPV ≈ ₹2.1 cr; P(NPV<0) ≈ 22%; P5 ≈ −₹3.4 cr, P95 ≈ ₹7.6 cr (illustrative run)' },
            { text: 'Decide', calc: '22% ruin probability at a ₹10 cr bet — versus the point model\'s "NPV +₹2.4 cr, accept". The distribution turns accept/reject into a risk-appetite question' },
          ],
          answer: 'Same model, one RAND() — the point estimate hides the 22%; the simulation makes the committee price it.',
        },
      ],
      caseStudy: {
        title: 'Case — Multiple IRRs: the mine that returned two answers',
        body: [
          'A strip-mine project: −₹600 cr outlay, +₹310 cr/yr for 3 years, then −₹120 cr land-restoration outflow in year 4. Excel\'s IRR function returns 8.1% with the default guess; an analyst using guess = 0.5 finds a second root at 41%.',
          'The promoter quotes 41% in the deck. The hurdle rate is 12%.',
        ],
        questions: [
          'Why are there two IRRs, and which (if either) is meaningful?',
          'What does the NPV profile look like?',
          'How should the project be judged?',
        ],
        takeaways: [
          'Two sign changes in the flow stream can produce two mathematical roots — BOTH are arithmetically true and economically meaningless as "the return"; the reinvestment story breaks',
          'NPV profile: rises, peaks, falls, crosses zero twice — value is positive only between the two roots; quoting the high root without the interval is deception',
          'Judge by NPV at 12% (compute it — if negative, reject regardless of any IRR), or use MIRR with explicit 12% reinvestment to get ONE honest percentage',
          'Exam + practice rule: whenever a stream has a non-conventional sign pattern, plot the NPV profile before trusting any IRR',
        ],
      },
      revision: [
        'NPV = absolute value added at the hurdle — the decision rule',
        'IRR flaws: scale-blind, reinvest-at-IRR, multiple/no roots on sign flips',
        'MIRR: explicit finance + reinvestment rates → single root',
        'Payback/discounted payback: gates (liquidity), never rankings',
        'Mutually exclusive: compare NPVs; crossover = IRR of the difference stream',
        'Capital rationing (divisible): rank by PI = PV/I₀; indivisible: Solver',
        'Project trio: NPV, DSCR ≥ 1.2, break-even utilisation',
        'Monte Carlo: NORM.INV(RAND(), μ, σ) + data-table trials → P(NPV<0), P5/P95',
        'Model input correlations or understate crash risk',
      ],
      practice: [
        { q: 'Flows −50, +40, +40, −10. Why is IRR dangerous here?', a: 'Signs flip twice (out-in-out) ⇒ up to two IRRs; both may exist mathematically. Compute NPV at the hurdle instead, or MIRR with stated rates.' },
        { q: 'PI of A 1.28 and B 1.38, budget ₹1,400 cr, A costs ₹1,000, B ₹400. Choose.', a: 'Both fit together (₹1,400 exactly): total PV = 1275 + 550.7 vs A alone 1275 — take both; PI ranking matters only when the budget forces exclusion of a higher-PI project by an indivisible big one.' },
        { q: 'Your simulation shows P(NPV<0) = 18% but the CEO asks "so what\'s the number?"', a: 'Give mean + P5 + probability of loss, framed as decision: "expected +₹38 cr, one-in-five chance of losing ~₹12 cr; if that tail is unacceptable, the phased capex option cuts it to 8% for ₹4 cr lower expected value" — simulations exist to price risk, not to hide it.' },
        { q: 'Two projects: NPV Rs 40 cr (small), NPV Rs 38 cr (large), same capital. IRR ranks them backwards. What decides?', a: 'NPV decides - it measures absolute value added at the hurdle rate; IRR is a rate, biased against scale. If capital truly binds, compare incremental IRR of large-over-small.' },
        { q: 'Monte Carlo says P(NPV < 0) = 18 percent. Before approving, what does 18 percent NOT tell you?', a: 'It does not tell you WHERE the losses bite (one bad year vs steady bleed), nor correlation with your existing portfolio - a project 18 percent risky but counter-cyclical may REDUCE firm risk.' },
      ],
      tools: [
        { label: 'Critical Path Simulator (project risk)', href: '/tools/critical-path-simulator' },
      ],
    },

    /* ─────────── LECTURE 8 (Unit 5 · outline) ─────────── */
    {
      slug: 'portfolio-valuation-var-enhancement',
      number: 8,
      title: 'Portfolio Valuation & Value Enhancement: Beta, SML, Black–Scholes, VaR',
      minutes: 50,
      summary:
        'Unit 5 in Excel — portfolio mean and variance from the variance–covariance matrix, efficient portfolios, beta estimation and the SML, event studies, Black–Scholes and binomial option pricing with the Greeks, and Value at Risk.',
      status: 'live',
      objectives: [
        'Build a variance–covariance matrix and compute portfolio σ from it',
        'Estimate beta by regression and plot the SML in Excel',
        'Implement Black–Scholes and the binomial model with Greeks',
        'Compute parametric and historical VaR',
      ],
      sections: [
        {
          heading: '1. Portfolio algebra and beta regression in cells',
          body: [
            '**Portfolio mean/variance from the matrix**: column vector of returns R; weights w; E[Rp] = wᵀ·μ; **σp² = wᵀ Σ w** — in Excel: =MMULT(MMULT(TRANSPOSE(w), Sigma), w) entered as an array (or SUMPRODUCT for two assets). Build Σ from returns: =COVARIANCE.S over 60 monthly windows per pair, or Data Analysis ToolPak → Covariance (then divide by n−1 consistency check). Test your matrix: portfolio of everything equally weighted should be BELOW the average asset variance — if not, the matrix is broken.',
            '**Beta by regression**: stock monthly returns y, index returns x over 3–5 years: =SLOPE(y, x) = β, =INTERCEPT(y, x) = alpha (monthly), =RSQ(y, x) = fraction of variance the market explains (R²; 1−R² = idiosyncratic). Adjusted beta β̂ = 0.67β + 0.33 (Blume shrinkage toward 1 — betas mean-revert; standard practice for cost of equity). **SML in Excel**: plot each asset\'s (β, E[R]) as scatter; add the line from (0, Rf) to (1, Rm); points above the line = underpriced (F04 Unit 4 logic, now built in cells). **Event study template**: estimate normal returns over a clean window (α+β from before the event), abnormal return AR = actual − (α+β·market) on event days, cumulative CAR over the window — the standard M&A-announcement test.',
          ],
          callout: {
            type: 'excel',
            text: 'Array-formula survival kit: σp² = MMULT(MMULT(TRANSPOSE(w),Σ),w) — select one cell, type, Ctrl+Shift+Enter (legacy) or just Enter in 365. Beta = SLOPE(stock, index). N(d) = NORM.S.DIST(d, TRUE) — the TRUE is what everyone forgets; FALSE gives the density, off by orders of magnitude.',
          },
        },
        {
          heading: '2. Options in Excel and VaR',
          body: [
            '**Black–Scholes call** C = S·N(d₁) − K·e^(−rT)·N(d₂), d₁ = [ln(S/K) + (r + σ²/2)T]/(σ√T), d₂ = d₁ − σ√T. Excel: =S*NORM.S.DIST(d1,TRUE) − K*EXP(−r*T)*NORM.S.DIST(d2,TRUE). Put via put–call parity: P = C − S + K·e^(−rT). Assumptions (lognormal price, constant σ, European, no dividends) — violations are why practised markets use implied vol surfaces (F03). **Greeks in cells**: Δ(call) = N(d₁); Γ = φ(d₁)/(Sσ√T); Θ, Vega = S·φ(d₁)·√T, ρ — each a one-cell formula; hedge intuition: delta shares per option (F03 Unit 3 links). **Binomial two-step in cells**: up/down factors u = e^(σ√Δt), d = 1/u, p = (e^(rΔt) − d)/(u − d); build the price tree, then roll BACK the option value = e^(−rΔt)[p·Vᵤ + (1−p)·Vd] — convergence to BS as steps grow.',
            '**VaR — three methods**: (1) **Parametric (variance–covariance)**: VaR₉₅ = portfolio value × (z·σ − μ) over horizon h (scale: σ_h = σ_daily×√h) — fast, assumes normality (understates tails). (2) **Historical simulation**: sort the last 500 daily portfolio returns, take the 5th percentile loss — no distribution assumption, but history-bound. (3) **Monte Carlo**: simulate returns from a fitted (or t-) distribution — the only way to price path-dependent optionality in the book. Report format: *"₹100 cr book, 1-day 99% VaR ₹2.8 cr"* — meaning: in 99 of 100 normal days the loss stays below ₹2.8 cr; it says NOTHING about the 1% (how bad is the tail → **expected shortfall/CVaR** = average loss beyond VaR; Basel\'s preferred tail measure). VaR traps: comparing across horizons/confidences without scaling; ignoring that correlations spike in crashes; thinking VaR caps losses (it is a quantile, not a maximum).',
          ],
          bullets: [
            'σp² = wᵀΣw via MMULT/TRANSPOSE; test: diversified σ < average σ',
            'β = SLOPE(stock, index); adjusted β = 0.67β + 0.33',
            'BS: NORM.S.DIST(d, TRUE); put by parity, not a separate formula',
            'Greeks one cell each: Δ=N(d1), Vega=Sφ(d1)√T',
            'Binomial: u=e^(σ√dt), p=(e^(rdt)−d)/(u−d), roll values backwards',
            'VaR methods: parametric (fast, normal), historical (data-bound), Monte Carlo (flexible)',
            'ES/CVaR = mean loss BEYOND VaR — the tail measure regulators want',
          ],
        },
      ],
      diagram: {
        title: 'VaR: the quantile and the tail beyond it',
        caption: 'VaR marks the loss threshold at the confidence level; expected shortfall averages everything worse — the difference is why regulators moved to ES.',
        svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="VaR distribution diagram">
  <g font-family="inherit" font-size="12">
    <path d="M60,200 C140,80 240,60 340,64 C440,68 540,110 640,196" fill="none" stroke="#475569" stroke-width="2"/>
    <path d="M60,200 C140,80 240,60 340,64 C250,66 160,100 96,196 Z" fill="#fee2e2" opacity="0.85"/>
    <line x1="60" y1="200" x2="660" y2="200" stroke="#334155" stroke-width="1.5"/>
    <line x1="150" y1="200" x2="150" y2="52" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="118" y="44" fill="#dc2626" font-weight="600">−VaR (95%)</text>
    <text x="60" y="236" fill="#475569">big losses ←</text>
    <text x="480" y="236" fill="#475569">→ gains</text>
    <text x="185" y="120" fill="#991b1b">tail 5%: average = ES/CVaR</text>
    <circle cx="122" cy="128" r="4" fill="#991b1b"/>
    <line x1="126" y1="128" x2="183" y2="122" stroke="#991b1b" stroke-width="1"/>
    <text x="330" y="40" fill="#475569" font-weight="600">daily P/L distribution</text>
    <text x="330" y="222" fill="#475569">0</text>
    <text x="215" y="90" fill="#7f1d1d" font-size="11">VaR = quantile, not a maximum</text>
    <text x="400" y="180" fill="#334155" font-size="11">95% of days lose less than VaR</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Portfolio variance', expr: 'σp² = wᵀ Σ w', meaning: 'Matrix algebra of risk' },
        { name: 'Beta', expr: '=SLOPE(stock_returns, index_returns); adj β = 2/3·β + 1/3', meaning: 'Sensitivity + shrinkage' },
        { name: 'Black–Scholes call', expr: 'C = S·N(d₁) − K·e^(−rT)·N(d₂)', meaning: 'European option value' },
        { name: 'Binomial risk-neutral p', expr: 'p = (e^(rΔt) − d)/(u − d), u = e^(σ√Δt)', meaning: 'Backward induction input' },
        { name: 'Parametric VaR', expr: 'VaR = V × (z·σ − μ) × √h', meaning: 'Loss quantile at confidence' },
        { name: 'Expected shortfall', expr: 'ES = E[loss | loss > VaR]', meaning: 'Average of the tail' },
      ],
      examples: [
        {
          title: 'Two-asset σp² by MMULT, then beta and SML',
          given: ['Stocks X, Y: σ 24%, 18%, correlation 0.5; weights 60/40', 'X\'s monthly returns regressed on Nifty: SLOPE 1.15, RSQ 0.64; Rf 7%, E[Rm] 13%'],
          steps: [
            { text: 'σp²', calc: '0.36(0.0576) + 0.16(0.0324) + 2(0.6)(0.4)(0.5)(0.24)(0.18) = 0.020736 + 0.005184 + 0.008640 = 0.03456 ⇒ σp = 18.6%' },
            { text: 'Diversification test', calc: '18.6% < weighted avg 21.6% ✓ — covariance term did its job' },
            { text: 'Cost of equity (CAPM)', calc: 'Adjusted β = 0.67(1.15) + 0.33 = 1.10; Ke = 7 + 1.10(6) = 13.6%' },
            { text: 'SML read', calc: 'If analyst E[R_X] = 15% > 13.6% required ⇒ X plots ABOVE the line — underpriced by 1.4 points (alpha)' },
          ],
          answer: 'Matrix algebra gives risk; regression gives beta; the SML converts both into a mispricing verdict — F04\'s theory as F06\'s spreadsheet.',
        },
        {
          title: 'Black–Scholes + Greeks, and a 99% VaR',
          given: ['Option: S = 1,050, K = 1,000, r = 7%, σ = 18%, T = 0.5 yr', 'Book: ₹100 cr, daily σ 1.6%, mean ~0, z(99%) = 2.33'],
          steps: [
            { text: 'd₁, d₂', calc: 'd₁ = [ln(1.05) + (0.07 + 0.0162)(0.5)]/(0.18×0.707) = [0.0488 + 0.0431]/0.1273 = 0.722; d₂ = 0.722 − 0.127 = 0.595' },
            { text: 'Call', calc: 'C = 1050·N(0.722) − 1000·e^(−0.035)·N(0.595) = 1050(0.7649) − 965.6(0.7243) ≈ 803.1 − 699.3 ≈ 103.8 — the option trades ~₹104' },
            { text: 'Greeks', calc: 'Δ = N(d₁) = 0.765 → hold 0.765 shares per short call to hedge; Vega = S·φ(d₁)·√T ≈ 1050×0.3077×0.707 ≈ 229 → +1 vol point = +₹2.29 on the option' },
            { text: 'VaR', calc: 'VaR₉₉,1d = 100 cr × 2.33 × 1.6% = ₹3.73 cr; 10-day ≈ 3.73×√10 = ₹11.8 cr (Basel horizon)' },
          ],
          answer: 'One workbook prices the hedge (₹104, Δ 0.765) and sizes the risk (₹3.7 cr daily at 99%) — pricing and risk are the same mathematics.',
        },
      ],
      caseStudy: {
        title: 'Case — Normal VaR meets the fat tail',
        body: [
          'A risk desk runs a ₹500 cr equity book with daily σ = 1.8%, mean assumed 0. Parametric VaR: 500 × 2.33 × 0.018 = ₹21 cr at 99%/1-day. The desk holds this as "the" risk number for a year.',
          'A budget-day event delivers a −6.2% portfolio day — a ₹31 cr loss, 1.5× VaR. Management asks how a 99% number was breached.',
        ],
        questions: [
          'Was the VaR model wrong?',
          'What does historical simulation show on the same book?',
          'Which measure should the desk report alongside VaR?',
        ],
        takeaways: [
          'A 99%/1-day VaR IS expected to be exceeded ~2.5 times per trading year (1% of 250 days) — the breach alone is not evidence of a broken model; the SIZE of the breach is',
          'Normal VaR understates fat tails: equity daily returns have kurtosis; historical simulation on Indian index data puts 99% daily moves near 3–3.5σ, not 2.33σ → the honest VaR was ~₹27–31 cr',
          'Report Expected Shortfall (average loss beyond VaR) — it is tail-aware and the Basel Committee\'s replacement for VaR in market-risk capital; and stress-test (event VaR: "budget-day scenario = ₹31 cr")',
          'Modelling lessons: test distributional fit, scale horizons by √h only for iid, and never present VaR as a maximum loss — it is a quantile with a story beyond it',
        ],
      },
      revision: [
        'σp² = wᵀΣw — MMULT(TRANSPOSE(w), Σ), w); diversification test',
        'β = SLOPE(y, x); adjusted β = 0.67β + 0.33 (mean reversion to 1)',
        'SML scatter: above line = underpriced; alpha = intercept (annualised ×12)',
        'Event study: AR = actual − (α + β·market); CAR over the window',
        'BS call = S·N(d₁) − K·e^(−rT)·N(d₂); NORM.S.DIST(d, TRUE); put via parity',
        'Δ = N(d₁); Vega = Sφ(d₁)√T; binomial rolls back with risk-neutral p',
        'VaR parametric = V×z×σ×√h; historical = percentile of sorted returns; MC = simulated',
        'VaR is a quantile, not a cap; breaches expected ~1% of days; ES/CVaR for the tail',
        'Correlations spike in crashes — diversification VaR is optimistic VaR',
      ],
      practice: [
        { q: 'Two assets σ 20% & 20%, ρ = +1. Benefit of diversification?', a: 'None — σp = 20% at any weights. Diversification works only through ρ < 1; the lower the correlation, the bigger the risk reduction (at ρ=0, 50/50 gives σp ≈ 14.1%).' },
        { q: 'An at-the-money call has Δ ≈ 0.5 and you sold 200 calls. Hedge?', a: 'Buy 200 × 0.5 = 100 shares (delta-neutral); re-hedge as delta drifts (gamma) — the day-to-day of options desks, and exactly what the binomial tree\'s rollback is pricing.' },
        { q: 'Weekly VaR ₹5 cr converted to a 95% 1-day number? (z95 = 1.65)', a: 'You cannot convert confidence AND horizon blindly: 5 = V×2.33×σ×√5 ⇒ V×σ×2.33×2.236; 1-day 95% = V×1.65×σ = 5×(1.65/2.33)/√5 ≈ ₹1.58 cr. Scale by z-ratio and √time — show the steps.' },
        { q: 'Rs 95 percent one-day VaR is Rs 2 crore. Translate for a board member in one sentence.', a: 'On the worst 1 trading day in 100, expect to lose at least Rs 2 crore - and occasionally more; VaR is a floor on the bad tail, not a ceiling or a maximum.' },
        { q: 'Why does a 2-asset VaR model fail a 200-asset desk?', a: 'Correlation non-linearities, fat tails and crowded trades vanish in pairwise simplification - the 200x200 covariance matrix IS the risk model. Historical simulation keeps those joint behaviours alive.' },
      ],
      tools: [
        { label: 'Portfolio Risk & Return Lab', href: '/tools/portfolio-risk-lab' },
      ],
    },
  ],
};
