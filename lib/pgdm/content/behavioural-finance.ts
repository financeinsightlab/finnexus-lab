import type { Subject } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM F01 — BEHAVIOURAL FINANCE · Finance Major · Semester III
   ═══════════════════════════════════════════════════════════════ */

const prospectSvg = `
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
  <defs><marker id="barr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
    <path d="M0,0 L8,3 L0,6 Z" fill="#5eead4"/></marker></defs>
  <line x1="380" y1="20" x2="380" y2="300" stroke="#475569" stroke-width="1.5"/>
  <line x1="60" y1="160" x2="720" y2="160" stroke="#475569" stroke-width="1.5" marker-end="url(#barr)"/>
  <text x="705" y="150" fill="#64748b" font-size="11">gains →</text>
  <text x="390" y="32" fill="#64748b" font-size="11">losses</text>

  <path d="M 380 160 C 300 155, 220 120, 150 55"
        fill="none" stroke="#f87171" stroke-width="3.5"/>
  <path d="M 380 160 C 430 185, 500 210, 620 230"
        fill="none" stroke="#34d399" stroke-width="3.5"/>

  <text x="150" y="42" fill="#f87171" font-size="12" font-weight="700">STEEP — losses hurt ~2× gains</text>
  <text x="150" y="58" fill="#94a3b8" font-size="10">loss aversion: λ ≈ 2.25</text>
  <text x="480" y="255" fill="#34d399" font-size="12" font-weight="700">SHALLOW — gains savoured less</text>
  <text x="480" y="271" fill="#94a3b8" font-size="10">risk-seeking in gains? no — cautious</text>

  <circle cx="380" cy="160" r="6" fill="#fbbf24"/>
  <text x="396" y="152" fill="#fbbf24" font-size="11" font-weight="700">Reference point (NOT zero-wealth)</text>
  <text x="396" y="167" fill="#94a3b8" font-size="9.5">= purchase price / target / peers — it MOVES</text>

  <text x="120" y="115" fill="#fca5a5" font-size="10.5" transform="rotate(-38 120 115)">risk-SEEKING over losses</text>
  <text x="505" y="205" fill="#6ee7b7" font-size="10.5" transform="rotate(14 505 205)">risk-AVERSE over gains</text>

  <text x="380" y="322" fill="#64748b" font-size="11" text-anchor="middle">Prospect theory value function v(x): S-shape, loss-averse, reference-dependent — the behavioural answer to EUT</text>
</svg>`;

export const behaviouralFinance: Subject = {
  slug: 'behavioural-finance',
  code: 'PGDM F01',
  name: 'Behavioural Finance',
  track: 'FINANCE',
  credits: 3,
  hours: 30,
  semester: 3,
  tagline: 'Why real investors don\'t act like textbooks.',
  description:
    'Standard finance and expected utility as the baseline, the behavioural turn — limits to arbitrage, prospect theory and loss aversion, market anomalies — investor personality and risk perception, the complete bias catalogue with de-biasing strategies, and the new frontier from neurofinance to robo-advisory.',
  outcomes: [
    'Summarise standard finance and utility functions as investment decision tools',
    'Interpret behavioural aspects of financial markets and investment decisions',
    'Analyse investment risk through investor personality traits',
    'Assess how heuristics and biases shape investor decision-making',
    'Describe recent advances in individual and corporate behavioural finance',
  ],
  units: [
    'Unit 1 — Standard Finance & Utility Functions: market efficiency; Expected Utility Theory; decision-making under risk and uncertainty; theories built on EUT; investor rationality',
    'Unit 2 — Introduction to Behavioural Finance: history; are markets efficient?; limits to arbitrage — fundamental risk, noise-trader risk; prospect theory; loss aversion; market anomalies',
    'Unit 3 — Investor Behaviour: investor types and objectives; factors influencing decisions and personality; risk perception and attitude; Big 5 traits; models of investor personality',
    'Unit 4 — Behavioural Biases & Irrational Investing: representativeness, availability, affect, similarity heuristics; cognitive & emotional biases; strategies to overcome biases',
    'Unit 5 — Recent Advances: neurofinance; Behavioural CAPM; Behavioural Portfolio Theory; emotional investing; group psychology; digital-age biases; ESG behaviour; fintech & robo-advisory',
  ],
  books: [
    { title: 'Understanding Behavioral Finance', author: 'Lucy Ackert — Cengage' },
    { title: 'Behavioral Finance', author: 'William Forbes — Wiley India' },
    { title: 'Value Investing and Behavioral Finance', author: 'Parag Parikh — TMH' },
    { title: 'Behavioural Finance: Insights into Irrational Minds and Markets', author: 'J. Monitor — Oxford University Press' },
  ],
  lectures: [
    /* ─────────── LECTURE 1 (Unit 1 · outline) ─────────── */
    {
      slug: 'standard-finance-expected-utility',
      number: 1,
      title: 'Standard Finance & Expected Utility Theory',
      minutes: 40,
      summary:
        'The rational baseline you must master before you criticise it: market efficiency in its three forms, utility functions and risk aversion, EUT under uncertainty, and the theories erected on it.',
      status: 'live',
      objectives: [
        'State EUT and compute expected utility for gambles',
        'Link utility curvature to risk aversion and certainty equivalents',
        'Present the three forms of market efficiency and their tests',
        'Explain why EUT survives as the backbone of modern asset pricing',
      ],
      sections: [
        {
          heading: '1. Utility and risk aversion',
          body: [
            'Standard finance assumes a **rational economic agent** with complete, transitive preferences who maximises **expected utility** Σ pᵢ·u(wᵢ) — not expected wealth. The shape of u does everything: **concave** utility → diminishing marginal utility of wealth → **risk aversion** (a certain ₹50 beats a 50/50 shot at ₹0/₹100); linear → risk neutrality; convex → risk seeking. The gap between expected value and the certainty equivalent (CE) is the **risk premium** you would pay to avoid the gamble — the entire insurance and derivatives industries exist inside that gap.',
            '**Arrow–Pratt**: absolute risk aversion R(w) = −u″(w)/u′(w) — how fast marginal utility falls. Applications: invest some wealth in risky assets even as risk aversion falls with wealth; optimal to hold a diversified fund; how much to pay to hedge. Utility functions you should recognise: log (constant relative risk aversion — "multiply your wealth, feel the same"), exponential (constant absolute), quadratic (mean-variance world — but only locally useful).',
            '**Von Neumann–Morgenstern axioms** behind EUT: completeness, transitivity, continuity, independence. The independence axiom is the load-bearing wall — and the one Prospect Theory demolishes in Unit 2 (Allais paradox: people prefer sure gains but flip preferences when both options become gambles, violating independence).',
          ],
          callout: {
            type: 'exam',
            text: 'Compute EUT in two columns: wealth outcome | utility u(w). Multiply by probabilities, sum. Compare utilities, NEVER expected wealth vs utility directly — a rational risk-averter can prefer the lower-EV option with higher EU. Then invert the winning utility through u to get the certainty equivalent in rupees.',
          },
        },
        {
          heading: '2. Market efficiency — the other pillar',
          body: [
            '**Fama (1970)**: prices fully reflect available information. Three forms: **weak** (past prices — technical analysis useless; tests: runs, filters, autocorrelation), **semi-strong** (all public information — fundamental analysis useless; tests: event studies on earnings/split/dividend announcements), **strong** (all information, including inside — even insiders can\'t win). The joint-hypothesis problem: any test of efficiency is a test of efficiency AND a model of expected return — an "anomaly" might be inefficiency or a wrong risk model. That escape hatch is why the debate never fully closes.',
            'Built on EUT + efficiency: Markowitz mean-variance (F04 Unit 4), CAPM, and the Black–Scholes engine (F03). Behavioural finance does not overturn this scaffolding — it documents systematic, predictable departures (Unit 2 anomalies, Unit 4 biases) and asks which can survive limits to arbitrage. Master the baseline first: you cannot diagnose a deviation without a model of the normal.',
          ],
          bullets: [
            'Risk-averse ⇔ concave utility ⇔ CE < EV ⇔ positive risk premium',
            'Independence axiom: adding a common lottery to both options shouldn\'t flip preference (Allais shows it does)',
            'Weak/semi-strong/strong = past / public / all information',
            'Joint hypothesis: anomaly = inefficiency OR mis-specified risk model',
          ],
        },
      ],
      diagram: {
        title: 'Utility of wealth and the certainty equivalent',
        caption: 'Concave utility: the chord (EV) sits below the curve — the gap is the risk premium the investor pays to escape the gamble.',
        svg: `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Concave utility function">
  <g font-family="inherit" font-size="12">
    <line x1="60" y1="200" x2="660" y2="200" stroke="#475569" stroke-width="1.5"/>
    <line x1="60" y1="200" x2="60" y2="24" stroke="#475569" stroke-width="1.5"/>
    <text x="640" y="220" fill="#475569">wealth w</text>
    <text x="30" y="30" fill="#475569">u(w)</text>
    <path d="M60,200 Q280,90 640,40" fill="none" stroke="#7c3aed" stroke-width="3"/>
    <line x1="200" y1="200" x2="200" y2="137" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="460" y1="200" x2="460" y2="72" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="60" y1="137" x2="200" y2="137" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="60" y1="72" x2="460" y2="72" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="200" y1="137" x2="460" y2="72" stroke="#0ea5e9" stroke-width="2.5"/>
    <line x1="330" y1="200" x2="330" y2="100" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="5 4"/>
    <line x1="60" y1="100" x2="330" y2="100" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="5 4"/>
    <circle cx="330" cy="100" r="5" fill="#16a34a"/>
    <circle cx="330" cy="146" r="5" fill="#dc2626"/>
    <circle cx="200" cy="137" r="4" fill="#0ea5e9"/>
    <circle cx="460" cy="72" r="4" fill="#0ea5e9"/>
    <text x="316" y="216" fill="#16a34a">EV</text>
    <text x="410" y="190" fill="#dc2626" font-weight="600">CE</text>
    <text x="340" y="130" fill="#dc2626">risk premium = EV − CE</text>
    <text x="150" y="160" fill="#0ea5e9">u(w₁)</text>
    <text x="470" y="66" fill="#0ea5e9">u(w₂)</text>
    <text x="380" y="60" fill="#7c3aed" font-weight="600">concave u(w)</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Expected utility', expr: 'EU = Σ pᵢ · u(wᵢ)', meaning: 'Rank gambles by utility, not rupees' },
        { name: 'Certainty equivalent', expr: 'CE = u⁻¹(EU)', meaning: 'Sure amount as good as the gamble' },
        { name: 'Risk premium', expr: 'π = EV − CE', meaning: 'What risk aversion costs / is worth' },
        { name: 'Arrow–Pratt ARA', expr: 'R(w) = −u″(w) / u′(w)', meaning: 'Local strength of risk aversion' },
      ],
      examples: [
        {
          title: 'EUT in action: take the sure ₹50 or flip?',
          given: ['u(w) = ln(w), wealth irrelevant to the choice', 'Option A: ₹50 for sure', 'Option B: ₹100 or ₹0 with p = 0.5 each'],
          steps: [
            { text: 'Utility of A', calc: 'u(50) = ln 50 = 3.912' },
            { text: 'Expected utility of B', calc: 'EU(B) = 0.5·ln 100 + 0.5·ln 0 → −∞ on the zero branch' },
            { text: 'Repair the problem', calc: 'Never offer rupee-zero with log utility; use ₹1/₹99: EU = 0.5·ln 1 + 0.5·ln 99 = 0 + 2.295 = 2.295 < 3.912' },
            { text: 'Certainty equivalent of the repaired B', calc: 'CE = e^2.295 ≈ ₹9.9 — a risk-averter would sell the 50/50 (₹1 or ₹99) gamble for under ₹10' },
          ],
          answer: 'The sure ₹50 wins; the gap between EV (₹50) and CE (₹9.9) is the risk premium — enormous, because log utility punishes low wealth brutally.',
        },
        {
          title: 'Allais paradox — the crack in the wall',
          given: [
            'Choice 1: A = ₹100 cr sure; B = 89% ₹100 cr, 10% ₹500 cr, 1% ₹0',
            'Choice 2: C = 11% ₹100 cr / 89% ₹0; D = 10% ₹500 cr / 90% ₹0',
          ],
          steps: [
            { text: 'Most people', calc: 'Pick A over B (certainty effect), but D over C' },
            { text: 'EUT bookkeeping', calc: 'A > B ⇒ u(100) > 0.89u(100) + 0.10u(500) + 0.01u(0) ⇒ 0.11u(100) > 0.10u(500) (using u(0)≈0)' },
            { text: 'Same person picking D > C', calc: '0.10u(500) > 0.11u(100) — the strict opposite' },
            { text: 'Diagnosis', calc: 'Common consequence shifted both options into gamble territory and flipped preference — a violation of the independence axiom' },
          ],
          answer: 'Preferences are consistent under EUT only if A>B and C>D — real subjects violate it systematically. This is the doorway to Prospect Theory (Unit 2).',
        },
      ],
      caseStudy: {
        title: 'Case — Insuring the ₹6-lakh phone-camera: rational or not?',
        body: [
          'A manager earns ₹24 lakh a year. Her new phone-camera kit costs ₹60,000; the retailer offers damage insurance at ₹4,500/year with a ₹2,000 deductible. She also holds ₹8 lakh in equity index funds and refuses to hedge it.',
          'Using u(w) = ln(w) with total wealth ₹40 lakh (incl. human-capital approximation), price both risks.',
        ],
        questions: [
          'What risk premium does log utility imply for the kit-loss gamble?',
          'Is ₹4,500 fair, exploitative, or justified?',
          'Why does she insure the small risk but not the large one?',
        ],
        takeaways: [
          'For a small ₹60k risk on ₹40 lakh wealth, log utility implies a risk premium of pennies — rationally she should self-insure and decline',
          'Retail insurance priced at 7.5% of insured value per year carries a huge loading over actuarial value — bought for peace of mind (emotional utility), not wealth utility',
          'Refusing to hedge ₹8 lakh of equity while insuring ₹60k of hardware inverts the priority a risk-averse agent would choose — probability weighting (Unit 3 risk perception) explains it: vivid, small, knowable risks feel insurable; diffuse market risk feels controllable',
          'Lesson for advisors: suitability starts with the client\'s actual utility curvature, not the product shelf',
        ],
      },
      revision: [
        'EUT: rank gambles by Σ pᵢ·u(wᵢ); concave u ⇒ risk aversion',
        'CE = u⁻¹(EU); risk premium = EV − CE > 0 for the risk-averse',
        'Arrow–Pratt R(w) = −u″/u′; log utility = constant relative risk aversion',
        'vNM axioms; independence axiom is what Allais violates',
        'Efficiency: weak (past prices) / semi-strong (public info) / strong (all info)',
        'Joint-hypothesis problem: anomaly tests efficiency AND the return model',
        'CAPM, Black–Scholes, Markowitz all stand on the EUT-rationality base',
      ],
      practice: [
        { q: 'u(w) = √w. Gamble: ₹10,000 or ₹40,000, 50/50. EV and CE?', a: 'EV = ₹25,000. EU = 0.5√10000 + 0.5√40000 = 50 + 100 = 150 ⇒ CE = 150² = ₹22,500. Risk premium ₹2,500 — moderate risk aversion.' },
        { q: 'A fund claims 3 consecutive market-beating years refute semi-strong efficiency. Respond.', a: 'No: with thousands of funds, 3-year streaks occur by chance alone (survivorship + multiple comparisons); efficiency predicts a distribution of outcomes, not that every fund loses. Check persistence out-of-sample and fees.' },
        { q: 'Why does the joint-hypothesis problem protect efficient-marketers from every anomaly?', a: 'Any excess return is measured against a benchmark model (CAPM, Fama-French). A positive alpha means the model is wrong OR the market is — you can\'t tell which without a third, unquestioned model. It\'s honest humility, not a trick.' },
        { q: 'Bet A: certain Rs 5 lakh. Bet B: 50-50 Rs 12 lakh or zero. EV of B is higher - which does expected utility predict, and which do people take?', a: 'EV(B) = Rs 6 lakh beats A, but concave utility (risk aversion) makes A\'s utility higher for most - people take A. Risk aversion is the rational, curvature-driven answer, not an error.' },
        { q: 'A trader rejects a 50-50 lose Rs 5,000 / win Rs 15,000 bet yet buys lottery tickets. What two effects are on display?', a: 'Loss aversion in the near-domain (the 5k looms larger than the 15k) and probability-weighting overrounds in the tiny-probability domain (overweighting the jackpot). Same brain, two different distortions.' },
      ],
      tools: [
        { label: 'Time Value Machine (risk vs certainty)', href: '/tools/time-value-machine' },
      ],
    },

    /* ─────────── LECTURE 2 (Unit 2 · FULL) ─────────── */
    {
      slug: 'limits-to-arbitrage-prospect-theory',
      number: 2,
      title: 'Limits to Arbitrage, Prospect Theory & Market Anomalies',
      minutes: 50,
      summary:
        'The behavioural turn: why "smart money will correct it" fails (fundamental risk, noise-trader risk, implementation costs), Kahneman–Tversky\'s prospect theory with loss aversion, and the anomaly file that refuses to close.',
      status: 'live',
      objectives: [
        'Explain why arbitrage cannot fully correct mispricing',
        'Draw and interpret the prospect-theory value function',
        'Compute simple value-function decisions and predict loss-averse choices',
        'Catalogue the major market anomalies and their behavioural drivers',
      ],
      sections: [
        {
          heading: '1. The crack in the efficient-market wall',
          body: [
            'Standard finance rests on two pillars: investors are rational, and even if they are not, **arbitrageurs** will price assets correctly by taking the other side. Behavioural finance attacks the second pillar first, because it is the load-bearing one: if arbitrage is limited, irrationality is not corrected and mispricing can persist — and even be created — by noise traders.',
            '**Limits to arbitrage** (Shleifer & Vishny): (1) **Fundamental risk** — you short an overvalued stock, and the market rallies or the company surprises positively; arbitrage is not risk-free. (2) **Noise-trader risk** — mispricing can WIDEN before it narrows ("markets can stay irrational longer than you can stay solvent"); arbitrageurs with finite horizons and nervous clients get liquidated at the worst moment. (3) **Implementation costs** — shorting is costly, many assets cannot be shorted, and closed-end fund discounts can persist for years. Arbitrage works best on close substitutes (futures vs cash) and worst on stocks as a class — exactly where the anomalies live.',
          ],
          callout: {
            type: 'exam',
            text: 'The classic illustration: the 3Com/Palm spin-off (2000) — Palm\'s implied standalone value exceeded 3Com\'s entire market cap by billions, an obvious "arbitrage" (long 3Com, short Palm) that stayed open for weeks because Palm was hard/short and the mispricing widened first. Perfect for "explain limits to arbitrage with an example."',
          },
        },
        {
          heading: '2. Prospect theory — the value function',
          body: [
            'Kahneman & Tversky (1979) replaced EUT with three empirical moves: outcomes are evaluated as **gains and losses from a reference point** (not final wealth); the function is **loss-averse** — the pain of a ₹1 lakh loss exceeds the pleasure of a ₹1 lakh gain, by a factor λ ≈ 2.25; and it is **S-shaped** — concave over gains (risk-averse), convex over losses (risk-SEEKING: we gamble to avoid booking a loss).',
            'The consequences explain half of observed investor behaviour: **disposition effect** (sell winners too early, ride losers too long — booking the gain feels good, realising the loss hurts), breaking-even escalation, and the equity premium puzzle (loss aversion + frequent evaluation makes equity pain 2× its volatility). The reference point is movable — purchase price, a target, a peer\'s return — which is why FRAMING the same wealth change differently changes decisions.',
          ],
          bullets: [
            'v(x) over gains/losses x from reference point; v′ steeper in losses (λ ≈ 2.25)',
            'Concave in gains → risk-averse for profits; convex in losses → risk-seeking to escape losses',
            'Diminishing sensitivity: the ₹10k→₹20k jump feels bigger than ₹110k→₹120k',
            'Probability weighting: small probabilities overweighted (lotteries AND insurance bought simultaneously)',
          ],
        },
        {
          heading: '3. The anomaly file',
          body: [
            'Momentum (3–12-month winners keep winning), reversal and value (long-term losers outperform glamour), post-earnings-announcement drift, the IPO long-run underperformance, size effect, calendar/January effect, and closed-end fund discounts. Each has a standard-finance rescue attempt (risk premium! data mining!) and a behavioural driver (under-reaction → momentum; over-reaction → reversal; disposition → PEAD). The honest exam answer presents both and notes that the debate is empirical, not ideological.',
          ],
          callout: {
            type: 'note',
            text: 'India evidence: momentum and value premia are documented on NSE data; the disposition effect is strong among Indian retail investors (studies of demat accounts show winners sold ~50% faster than losers). Use "documented on Indian data" in answers — it converts a textbook line into an analyst\'s answer.',
          },
        },
        {
          heading: '4. Using it — as an analyst, not a victim',
          body: [
            'Behavioural finance is not a licence to mock retail investors; it is a checklist for your own process: pre-commit to exit rules (kills disposition), measure decisions from the reference point of YOUR mandate not your cost basis, distrust "it will come back" (convexity of losses), and treat momentum/reversal horizons as risk factors in portfolio construction (links to F04 Unit 4\'s factor view).',
          ],
        },
      ],
      diagram: {
        title: 'The prospect-theory value function',
        caption:
          'S-shaped around a movable reference point, steeper for losses — loss aversion, risk-seeking in the loss zone, diminishing sensitivity throughout.',
        svg: prospectSvg,
      },
      formulas: [
        { name: 'Loss aversion', expr: 'λ = |v(−x)| / v(+x) ≈ 2.25', meaning: 'Losses loom ~2.25× larger than equal gains' },
        { name: 'Prospect value', expr: 'V = Σ w(pᵢ)·v(xᵢ)', meaning: 'Probability-weighted value of gains/losses' },
        { name: 'Certainty equivalent gap', expr: 'CE < E[x] for concave u', meaning: 'Risk-averse agents pay a spread to avoid gambles' },
        { name: 'Disposition tilt', expr: 'P(sell | gain) / P(sell | loss) > 1', meaning: 'Empirical disposition-effect statistic' },
      ],
      examples: [
        {
          title: 'The coin flip most people refuse — and accept',
          given: ['Flip A: win ₹50,000 on heads, lose ₹50,000 on tails', 'Flip B: lose ₹25,000 on heads, lose ₹75,000 on tails (forced to play one)'],
          steps: [
            { text: 'Expected value of A', calc: 'EV = 0.5(+50k) + 0.5(−50k) = 0 — symmetric, yet most refuse A (loss aversion makes the loss side weigh ~2.25×)' },
            { text: 'Expected value of B', calc: 'EV = −50k — strictly worse than A, yet many ACCEPT B' },
            { text: 'Why', calc: 'Both B outcomes are losses → convex loss zone → risk-SEEKING over losses. A mixes gain and loss → the steep loss side dominates → refusal' },
          ],
          answer:
            'Refusing the fair flip A while accepting the worse flip B is irrational under EUT and exactly what prospect theory predicts: risk-averse over mixed gambles, risk-seeking when everything is a loss. This is "doubling down to break even."',
        },
        {
          title: 'Disposition effect in a demat account',
          given: [
            'Stock P: bought ₹400, now ₹520 (gain) · Stock Q: bought ₹400, now ₹310 (loss)',
            'Portfolio needs ₹50k rebalancing; empirical P(sell|gain) ≈ 2× P(sell|loss)',
          ],
          steps: [
            { text: 'Rational rule (tax & portfolio logic)', calc: 'Sell the LOSER: books a capital loss usable against gains, frees margin in a deteriorating thesis' },
            { text: 'Behavioural prediction', calc: 'Retail sells P at ~2× the rate of Q — realising the gain feels like closing a win; realising Q converts paper pain into fact' },
            { text: 'Cost of the bias', calc: 'Winners cut early forfeit momentum compounding; losers held absorb further drawdown — the sell-winners/hold-losers combo is systematically value-destroying' },
          ],
          answer:
            'The investor sells the winner. Expected-value math says sell the loser; prospect theory predicts — and demat data confirms — the winner goes first. Pre-committed exit rules at purchase are the known cure.',
        },
      ],
      caseStudy: {
        title: 'Case — Averaging down at "Suresh Metals"',
        body: [
          'A seasoned CFO, personal portfolio ₹80 lakh, buys Suresh Metals at ₹240 (target ₹300, stop "if thesis breaks"). The stock slides: ₹200 (he buys more — "cheaper"), ₹160 (buys again — "averaging down"), ₹120 ( thesis IS broken — a key customer defected, disclosed publicly). He holds: "It will come back; I\'ve lost too much to sell now." At ₹95 he finally sells to "stop the bleeding" — having converted a 20% disciplined loss into a 60% disaster, with position size tripled on the way down.',
          'Autopsy through this lecture: convex value function over losses → risk-seeking to avoid booking pain; reference point anchored at the ₹240 cost (a sunk number the market has forgotten); loss aversion λ≈2.25 made "₹95 realised" feel worse than "₹145 paper" — though paper and realised are the same wealth. The client\'s fundamental-risk defence ("averaging is rational if the thesis holds") collapsed precisely when the thesis broke — the bias had captured the stop-loss rule.',
        ],
        questions: [
          'Which two prospect-theory features jointly produced the averaging-down spiral?',
          'Design the pre-commitment structure that would have saved 40 percentage points (rules set BEFORE the first purchase).',
          'Where in this story do you see "noise-trader risk" — and does it excuse any of the behaviour?',
        ],
        takeaways: [
          'Loss aversion + convexity over losses = averaging down and holding losers past thesis-break',
          'The market does not know your cost basis — reference points are psychological, not fundamental',
          'Stops/thesis-reviews must be written pre-entry; in-the-moment rules are written by the bias itself',
        ],
      },
      revision: [
        'Limits to arbitrage: fundamental risk, noise-trader risk, implementation costs',
        'Mispricing persists where close substitutes and cheap shorting do not exist',
        'Prospect theory: reference dependence, loss aversion (λ≈2.25), S-shape, probability weighting',
        'Risk-averse over gains, risk-SEEKING over losses',
        'Disposition effect: sell winners ~2× faster than losers (Indian demat evidence exists)',
        'Anomalies: momentum (under-reaction), reversal/value (over-reaction), PEAD, IPO underperformance',
        'Pre-commitment — not willpower — is the de-biasing tool that works',
      ],
      practice: [
        {
          q: 'Why can\'t arbitrageurs simply correct an overpriced growth stock?',
          a: 'Three limits: fundamental risk (news can justify the price), noise-trader risk (it can get MORE overpriced and the arbitrageur faces margin calls/redemptions at the worst time), and implementation costs (borrow is expensive/scarce). Correction requires a near-perfect substitute and a survivable horizon.',
        },
        {
          q: 'A fund is up 18% YTD, then loses 3% in a week. Clients call in panic although the fund is still beating its benchmark. Explain with two behavioural concepts.',
          a: 'Narrow framing (evaluating one week instead of the horizon) + loss aversion (the 3% week registers as a loss from the recent reference point, weighted ~2.25×). Wider evaluation windows (quarterly, vs mandate) defuse both.',
        },
        {
          q: 'Investors buy BOTH lottery tickets and insurance. Which prospect-theory feature explains the pair?',
          a: 'Probability weighting — small probabilities are overweighted, making tiny chances of huge gains attractive (lottery) and tiny chances of ruin frightening (insurance). Expected-value logic cannot hold both simultaneously.',
        },
        {
          q: 'Momentum and long-term reversal coexist. Reconcile them in one paragraph.',
          a: 'Different horizons, different drivers: under-reaction to news produces 3–12-month momentum (prices drift toward fair value too slowly); accumulated over-reaction to long-run performance produces multi-year reversal when glamour mean-reverts. Same investors, opposite errors at different frequencies — which is why factor models carry both momentum and value terms.',
        },
        { q: 'Mispricing is 8 percent, borrow cost and short fees eat 9 percent. Does the mispricing persist?', a: 'Yes - arbitrage is not free. When the cost of the position exceeds the gap, rational money stays home and the anomaly survives: limits to arbitrage explain why inefficiency is not instantly cleaned.' },
        { q: 'Why can momentum persist for months if arbitrageurs see it?', a: 'Early unwinding costs money (noise-trader risk: it can run further before reversing), plus crowding makes exits ugly. Rational traders ride late and exit early - persistence is equilibrium behaviour, not blindness.' },
      ],
      tools: [
        { label: 'Portfolio Risk & Return Lab', href: '/tools/portfolio-risk-lab' },
      ],
    },

    /* ─────────── LECTURE 3 (Unit 3 · outline) ─────────── */
    {
      slug: 'investor-behaviour-personality',
      number: 3,
      title: 'Investor Behaviour, Risk Perception & the Big 5',
      minutes: 40,
      summary:
        'Investor types and objectives, factors influencing decisions and personality, behavioural views of risk, and the Big 5 personality traits with models of investor personality.',
      status: 'live',
      objectives: [
        'Segment investors by type, objective and constraint',
        'Separate risk perception from risk attitude — and measure both',
        'Map the Big 5 traits to predictable investment behaviour',
        'Design a risk-profiling process that resists gaming',
      ],
      sections: [
        {
          heading: '1. Investor types, objectives and influences',
          body: [
            'Classify investors along two axes: **individual vs institutional**, and within individuals — the **defensive** (capital protection first), **income** (regular cash flows), **balanced**, **growth** (capital appreciation, tolerates volatility), and **aggressive/speculative** (concentrated bets, uses leverage and derivatives). Institutional: mutual funds (relative-return, benchmark-hugging), pension funds (liability-matched, long horizon), insurance (duration-heavy), endowments (perpetual horizon, illiquidity-seeking). Objectives (return requirement vs risk tolerance) and constraints — **time horizon, liquidity, taxes, legal/regulatory, unique circumstances** — produce the IPS; that framework carries into F04 Unit 5 portfolio management.',
            'Factors influencing individual decisions: demographic (age, income, wealth, gender — women trade less and earn better net returns on average), financial literacy and numeracy, sources of advice (family, social media, advisor), experience (burned investors trade less — sometimes over-cautiously), and **personality**, which is stable where circumstances are not. The behavioural contribution: the same objective situation is filtered through subjective lenses — framing, mental accounting, experience recall — before it becomes a decision (Unit 4\'s catalogue).',
          ],
          callout: {
            type: 'exam',
            text: 'Risk ATTITUDE (how much risk you accept — a preference, fairly stable, personality-linked) ≠ risk PERCEPTION (how risky it feels — a judgement, volatile, driven by affect, recency, media). A client can be risk-tolerant but risk-perception-skewed: 2008 veterans under-invest for a decade not because attitude changed but because perceived risk was permanently re-anchored.',
          },
        },
        {
          heading: '2. The Big 5 and investor personality models',
          body: [
            '**Big 5 / OCEAN** — the replicated trait structure: **Openness** (curiosity, preference for novelty → early adoption, innovation overweight, crypto susceptibility), **Conscientiousness** (discipline, planning → better diversification, lower panic-selling, plan adherence), **Extraversion** (sociability, optimism → trading frequency up, overconfidence channel), **Agreeableness** (trust, cooperation → susceptibility to advice and herding; anchoring on advisor narratives), **Neuroticism** (anxiety, negative emotionality → amplified loss aversion, panic selling at bottoms, holding losers to avoid regret). Traits are continuous, not types; behaviour is trait × situation — neuroticism hurts most exactly when volatility spikes.',
            '**Investor personality models**: the classical Myers–Briggs style typologies (INTJ "analyst" etc.) are popular with advisors but weakly validated — use them as conversation starters. Better-evidenced: risk-tolerance questionnaires (Grable–Lytton style) validated against actual behaviour; BarNew/psychometric tools measuring composure, market engagement, perceived financial sophistication; and behavioural segmentation by observed biases — "fail-safe/conservative, anxious, reluctant, follower, overconfident" archetypes. **Risk-profiling design**: separate capacity (balance sheet, horizon, obligations — objective) from tolerance (psychometric — subjective) from need (return required to reach goals); require all three, use scale-anchored items with reverse-scored checks, re-test after major life events, and never let the profile be an excuse for unsuitable concentration.',
          ],
          bullets: [
            'IPS = objectives (return, risk) + constraints (horizon, liquidity, tax, legal, unique)',
            'High neuroticism × volatility = loss-realisation avoidance and bottom-selling',
            'Profile capacity (objective), tolerance (psychometric) and need (goal maths) separately',
            'Personality informs suitability; it never predicts a single trade',
          ],
        },
      ],
      diagram: {
        title: 'Trait → bias → behaviour map',
        caption: 'Each Big 5 trait loads specific biases; the resulting behaviour shows up in portfolio statistics an advisor can observe.',
        svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Big Five traits mapped to biases and behaviours">
  <defs><marker id="oa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="20" width="150" height="38" rx="9" fill="#ede9fe"/><text x="95" y="44" fill="#4c1d95" font-weight="600">Openness ↑</text>
    <rect x="20" y="72" width="150" height="38" rx="9" fill="#e0f2fe"/><text x="95" y="96" fill="#0c4a6e" font-weight="600">Conscientiousness ↑</text>
    <rect x="20" y="124" width="150" height="38" rx="9" fill="#dcfce7"/><text x="95" y="148" fill="#14532d" font-weight="600">Extraversion ↑</text>
    <rect x="20" y="176" width="150" height="38" rx="9" fill="#fef9c3"/><text x="95" y="200" fill="#713f12" font-weight="600">Agreeableness ↑</text>
    <rect x="20" y="228" width="150" height="0" fill="none"/>
    <rect x="20" y="212" width="150" height="38" rx="9" fill="#fee2e2"/><text x="95" y="236" fill="#7f1d1d" font-weight="600">Neuroticism ↑</text>
    <rect x="270" y="20" width="170" height="38" rx="9" fill="#f8fafc"/><text x="355" y="39" fill="#334155">novelty overweight,</text><text x="355" y="52" fill="#334155">narrative buying</text>
    <rect x="270" y="72" width="170" height="38" rx="9" fill="#f8fafc"/><text x="355" y="91" fill="#334155">plan adherence,</text><text x="355" y="104" fill="#334155">diversification</text>
    <rect x="270" y="124" width="170" height="38" rx="9" fill="#f8fafc"/><text x="355" y="143" fill="#334155">overconfidence,</text><text x="355" y="156" fill="#334155">high turnover</text>
    <rect x="270" y="176" width="170" height="38" rx="9" fill="#f8fafc"/><text x="355" y="195" fill="#334155">advice-taking,</text><text x="355" y="208" fill="#334155">herding</text>
    <rect x="270" y="212" width="170" height="38" rx="9" fill="#f8fafc"/><text x="355" y="231" fill="#334155">loss aversion amplified,</text><text x="355" y="244" fill="#334155">regret avoidance</text>
    <rect x="530" y="20" width="170" height="38" rx="9" fill="#ffedd5"/><text x="615" y="44" fill="#7c2d12" font-weight="600">chases themes</text>
    <rect x="530" y="72" width="170" height="38" rx="9" fill="#ffedd5"/><text x="615" y="96" fill="#7c2d12" font-weight="600">stays the course</text>
    <rect x="530" y="124" width="170" height="38" rx="9" fill="#ffedd5"/><text x="615" y="148" fill="#7c2d12" font-weight="600">overtrades, pays costs</text>
    <rect x="530" y="176" width="170" height="38" rx="9" fill="#ffedd5"/><text x="615" y="200" fill="#7c2d12" font-weight="600">buys what friends buy</text>
    <rect x="530" y="212" width="170" height="38" rx="9" fill="#ffedd5"/><text x="615" y="236" fill="#7c2d12" font-weight="600">sells at the bottom</text>
    <line x1="170" y1="39" x2="268" y2="39" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="170" y1="91" x2="268" y2="91" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="170" y1="143" x2="268" y2="143" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="170" y1="195" x2="268" y2="195" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="170" y1="231" x2="268" y2="231" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="440" y1="39" x2="528" y2="39" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="440" y1="91" x2="528" y2="91" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="440" y1="143" x2="528" y2="143" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="440" y1="195" x2="528" y2="195" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="440" y1="231" x2="528" y2="231" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Risk-profiling triad', expr: 'Suitability = min(Capacity, Tolerance) vs Need', meaning: 'The binding constraint governs allocation' },
        { name: 'Observed risk attitude', expr: 'Risk behaviour = attitude × perception × situation', meaning: 'Behaviour is the product, not the attitude alone' },
        { name: 'Turnover cost drag', expr: 'Net alpha = gross alpha − turnover × trade cost', meaning: 'Why extraverts\' activity underperforms' },
      ],
      examples: [
        {
          title: 'Profile a client with the triad',
          given: ['Age 34, ₹1.2 cr portfolio, no dependants, 26-year horizon', 'Psychometric tolerance: high (composure, market engagement)', 'Goal: ₹8 cr in 26 years implies ~7.5% p.a. required'],
          steps: [
            { text: 'Capacity', calc: 'Long horizon, zero liquidity needs, high surplus ⇒ capacity HIGH' },
            { text: 'Tolerance', calc: 'High measured composure; no 2008-style trauma in history ⇒ HIGH' },
            { text: 'Need', calc: '₹1.2 cr → ₹8 cr in 26 yrs = (8/1.2)^(1/26) − 1 ≈ 7.4% ⇒ needs meaningful equity, not heroic risk' },
            { text: 'Suitability', calc: 'min(capacity, tolerance) comfortably above need ⇒ ~60–70% growth assets; not 100%, because need doesn\'t demand it' },
          ],
          answer: 'A disciplined 65/35 with rebalancing rules — the triad prevents both the "he can take risk so give him 5x leverage" and the "goal is modest so cash it" errors.',
        },
        {
          title: 'Perception shock: the 2020 March client',
          given: ['Balanced-fund investor, profiled risk-tolerant in Jan 2020', 'March 2020: portfolio −32% in five weeks; client calls demanding full exit to FDs'],
          steps: [
            { text: 'Diagnose', calc: 'Attitude unchanged (stable trait); PERCEPTION spiked — vivid drawdown, media amplification, availability cascade' },
            { text: 'Counter-move', calc: 'Re-anchor on the plan: show drawdown-recovery history, pre-commitment rules ("rebalance INTO the decline" is already in the IPS)' },
            { text: 'If she still exits', calc: 'Partial de-risking with automatic re-entry schedule — avoids the worst of capitulation-regret cycles' },
            { text: 'Post-mortem', calc: 'Re-profile after the event; documented episodes update capacity assessments ( Sequence-of-returns risk near drawdowns )' },
          ],
          answer: 'The right variable to manage in a crash is perception (through framing and pre-commitment), not the portfolio.',
        },
      ],
      caseStudy: {
        title: 'Case — The overconfident follower: two brothers, one portfolio each',
        body: [
          'Brothers, both 41, inherit ₹50 lakh each in 2019. A (high extraversion, high openness): day-trades F&O tips from a Telegram channel, 8x leverage peaks, concentrated in two midcaps. B (high agreeableness, average else): buys exactly what his cousin\'s CA recommends — three Nifty-50 stocks and gold.',
          'By mid-2022: A is at ₹31 lakh after costs and a margin call; B is at ₹66 lakh but 62% concentrated in one stock that his cousin\'s firm banks.',
          'Their sister (high conscientiousness, moderate everything): index SIP + rebalancing, ₹50 → ₹74 lakh with two hours a year of effort.',
        ],
        questions: [
          'Which biases does each brother display, and which traits load them?',
          'Why did the "best" investor do the least work?',
          'Design one intervention per brother.',
        ],
        takeaways: [
          'A: overconfidence + herding + narrative buying (extraversion × openness channelled by Telegram) — leverage converts bias into ruin',
          'B: advice-taking and familiarity without position limits (agreeableness) — his risk is concentration he cannot see',
          'The sister wins by PROCESS, not insight: rules beat traits when the rules encode diversification and cost discipline',
          'Interventions — A: hard leverage cap + trade journal (feedback kills overconfidence); B: single-position ceiling (e.g., 15%) + a second, disinterested opinion loop',
          'Suitability is behavioural engineering, not stock picking',
        ],
      },
      revision: [
        'Investor types: defensive / income / balanced / growth / aggressive + institutional mandates',
        'IPS: return & risk objectives + horizon, liquidity, tax, legal, unique constraints',
        'Risk attitude (stable preference) ≠ risk perception (volatile judgement)',
        'Big 5: O-C-E-A-N; each trait loads identifiable biases',
        'Neuroticism ↑ ⇒ loss aversion amplified, bottom-selling; conscientiousness ↑ ⇒ plan adherence',
        'Suitability = min(capacity, tolerance) vs need — capacity is objective, tolerance psychometric',
        'Re-profile after life events and drawdowns; document why',
        'Typology tools (MBTI-style) are conversation starters, not science — use validated scales',
      ],
      practice: [
        { q: 'A client with high capacity and high tolerance needs only 6% p.a. Why not 95% equity?', a: 'Need doesn\'t justify the shortfall risk; min(capacity, tolerance) exceeds need, so the optimal portfolio takes only the risk required — surplus risk capacity is better held as insurance against goal failure than spent on volatility.' },
        { q: 'Your risk questionnaire is filled before a big product pitch. What gaming risk arises?', a: 'Response bias: clients shade answers toward the product being sold (impression management). Mitigate: separate profiling from product pitch, use reverse-scored consistency items, and reconcile stated tolerance with observed behaviour (past panic sales).' },
        { q: 'Which Big 5 trait pair predicts panic selling, and why?', a: 'High neuroticism (anxiety amplifies loss pain) — with LOW conscientiousness (no plan or rules to fall back on). Together: emotion surge without procedural brakes at exactly the worst moment.' },
        { q: 'Moderately cautious client, first bear market, suddenly wants 100 percent equity to recover losses. What is happening?', a: 'Risk tolerance did not change - risk PERCEPTION and the reference point did (below the reference, people become risk-SEEKING to get back). Re-anchor the plan to goals, not to the loss account.' },
        { q: 'Why should an advisor ask about a client\'s debt and savings before recommending products?', a: 'Behaviours and constraints (mental accounts: bonus money is \'fun\' money) shape suitability more than questionnaires. Advice that ignores how the household actually buckets money gets undone in the first emergency.' },
      ],
    },

    /* ─────────── LECTURE 4 (Unit 4 · FULL) ─────────── */
    {
      slug: 'heuristics-and-bias-catalogue',
      number: 4,
      title: 'The Bias Catalogue: Heuristics, Cognitive & Emotional Biases — and De-biasing',
      minutes: 55,
      summary:
        'The full Unit 4 armoury — the four heuristics, cognitive biases (belief-preserving) vs emotional biases (feeling-driven), one-line recognitions for each of the handbook\'s biases, and the de-biasing strategies that actually survive contact with a portfolio.',
      status: 'live',
      objectives: [
        'Distinguish heuristics from biases, and cognitive from emotional biases',
        'Recognise the handbook\'s named biases in scenario form',
        'Classify biases by their diagnostic signature (belief vs preference errors)',
        'Apply process-level de-biasing: pre-commitment, base rates, decision journals',
      ],
      sections: [
        {
          heading: '1. Heuristics — the shortcuts that bias the trip',
          body: [
            'A heuristic is a fast frugal rule that usually serves well and occasionally fails systematically. The handbook\'s four: **Representativeness** (judging by resemblance to a prototype — "this founder IS Steve Jobs" → base-rate neglect: the probability of being Jobs-shaped AND succeeding is tiny); **Availability** (judging likelihood by ease of recall — post-crash, investors overweight crashes because they are vivid and recent); **affect** (deciding by instant likes — "good company, therefore good stock" at any price); **similarity** (a sub-form of representativeness: matching on surface features — hot sector = good bet, regardless of cash flows).',
            'Heuristics are cognitive — errors of BELIEF, and therefore trainable with statistics and checklists. Emotional biases — errors of PREFERENCE driven by feeling — respond less to information and more to process design. This cognitive/emotional split (CFA Institute\'s framing, and the handbook\'s) determines your de-biasing strategy: educate beliefs, but structure around feelings.',
          ],
          callout: {
            type: 'exam',
            text: 'One-line signatures worth memorising: Overconfidence → trades more, earns less. Self-attribution → wins = skill, losses = bad luck. Hindsight → "it was obvious." Confirmation → research as ammunition, not test. Anchoring → fixated on purchase price/52-week high. Mental accounting → salary is safe-to-spend, bonus is fun-money. Endowment → demand more to sell what you own. Status quo → the default wins. Regret aversion → "I\'ll wait for it to come back." Ambiguity aversion → home bias. Conservatism → underweight new earnings news. Cognitive dissonance → reinterpret losses as "long-term". Optimism → my projections, personally.',
          },
        },
        {
          heading: '2. Cognitive biases in the wild',
          body: [
            'Overconfidence arrives in three flavours — overestimation (of ability), overplacement ("above-average driver", every fund thinks it beats median), and overprecision (too-narrow confidence intervals: 95% intervals that contain the truth 60% of the time). Its financial fingerprint: high turnover, options selling, and concentrated "sure-thing" portfolios. **Anchoring** makes the 52-week high and the purchase price act as gravity wells for limit orders. **Conservatism** (the analyst\'s bias) means estimates move toward new information too slowly — the engine of post-earnings drift from Lecture 2. **Confirmation** turns research desks into prosecution teams: the thesis is the accused\'s enemy is the evidence that acquits.',
            'Mental accounting deserves special attention because it is structural, not personal: households run a 24% car loan and a 7% FD simultaneously — a -17% arbitrage against themselves — because "loan account" and "savings account" live in separate mental drawers. Corporations do the same with sunk-cost framing and divisional budgets.',
          ],
          bullets: [
            'Cognitive = belief errors → fix with data, base rates, checklists, premortems',
            'Anchoring is why "round numbers" and reference prices anchor order books',
            'Conservatism + representativeness = the under-/over-reaction pair behind momentum and reversal',
            'Mental accounting violates fungibility — the single most expensive household bias',
          ],
        },
        {
          heading: '3. Emotional biases — when feeling writes the trade',
          body: [
            'Loss aversion and its children (disposition, break-even effect) you met in Lecture 2. **Regret aversion** prevents both entries (post-loss paralysis) and exits ("I\'ll sell when it gets back to even"). **Endowment** makes owned assets feel worth more — the promoter who "knows what this company is really worth" against every DCF. **Status quo** prefers the current portfolio to any change, because change can be blamed and inaction cannot. **Self-control** fails exactly when it must hold: systematic plans (SIPs, auto-rebalancing) exist because December-human cannot trust March-human. **Illusion of control** grows with activity — more clicks, more dashboard, more false authorship of returns.',
          ],
          callout: {
            type: 'warning',
            text: 'De-biasing trap: "I know about biases, therefore I am unbiased" is the bias blind spot — we diagnose biases in others and immunity in ourselves. The only reliable defence is PROCESS that does not depend on in-the-moment willpower.',
          },
        },
        {
          heading: '4. De-biasing that survives Monday morning',
          body: [
            'Strategy layer: (1) **Pre-commitment** — write entry thesis, kill-criteria, and position size BEFORE buying (attacks self-attribution, hindsight, disposition). (2) **Base-rate discipline** — before any projection, write the reference class outcome ("what happens to hot IPOs in year 3?") and justify deviation (attacks representativeness, optimism, planning fallacy). (3) **Disconfirming quota** — for every supporting data point, find one against (attacks confirmation). (4) **Decision journal** — log the decision, the reasoning, the confidence; review at 6 months (attacks hindsight, teaches your own error pattern). (5) **Automation** — SIPs, auto-rebalance, collar rules (removes self-control and status-quo failure points). (6) **Premortem** — "it is 12 months from now and this position failed; write the obituary" (legitimises pessimism, surfaces ignored risks).',
          ],
        },
      ],
      formulas: [
        { name: 'Bias-blind spot', expr: 'detected(bias in others) > detected(bias in self)', meaning: 'Knowing biases ≠ immunity to them' },
        { name: 'Overprecision test', expr: 'hit-rate of 90% intervals ≪ 90%', meaning: 'Confidence intervals too narrow — calibrate them' },
        { name: 'Turnover drag', expr: 'excess trades × (cost + timing error) < benchmark', meaning: 'Overconfidence\'s P&L signature' },
      ],
      examples: [
        {
          title: 'Name that bias — six scenarios',
          given: [
            '(i) "I knew demonetisation would move consumer stocks."',
            '(ii) Analyst keeps EPS at ₹42 despite a tariff shock because "my model has been right so far."',
            '(iii) Won\'t sell a -35% stock "until it comes back to my price."',
            '(iv) Keeps bonus in savings but carries a 24% credit-card balance.',
            '(v) Buys the sector making news headlines this month.',
            '(vi) "My two years of option selling proves I\'m good at it."',
          ],
          steps: [
            { text: 'Map each', calc: '(i) Hindsight · (ii) Conservatism + confirmation · (iii) Anchoring + regret aversion + disposition · (iv) Mental accounting (fungibility failure) · (v) Availability/affect · (vi) Self-attribution + overprecision (survivor of a tail risk)' },
            { text: 'Classify', calc: 'Cognitive: ii, v (+ partially i, vi as belief errors) — trainable. Emotional: iii, iv, vi(in part) — process fixes' },
            { text: 'Prescribe', calc: 'ii → pre-set revision triggers on new data · iii → written kill-criteria at entry · iv → single balance-sheet view · v → base-rate check on sector fads · vi → decision journal + tail-risk accounting' },
          ],
          answer:
            'Every scenario is diagnosable AND fixable — but only (ii) and (v) yield to more data; the rest require pre-committed structure. That classification IS the exam answer\'s second half.',
        },
        {
          title: 'The mental-accounting arbitrage',
          given: ['FD ₹10 lakh @ 7% (taxable → ~4.9% post-tax) · Car loan ₹10 lakh @ 24% remaining 3 years'],
          steps: [
            { text: 'The synthetic trade', calc: 'Break FD, prepay loan: "earn" 24% risk-free vs 4.9% — +19.1% on ₹10 lakh' },
            { text: 'Three-year value', calc: '≈ ₹6+ lakh of family wealth created by one transfer — no risk, no alpha needed' },
            { text: 'Why it doesn\'t happen', calc: '"Savings drawer must stay full" + loss aversion on losing the FD\'s maturity value + status quo. Pure mental accounting, hugely expensive' },
          ],
          answer:
            'Money is fungible; mental accounts are not. The single most profitable "trade" most Indian households can do is internal: net their drawers against each other.',
        },
      ],
      caseStudy: {
        title: 'Case — The committee that was right for the wrong reason',
        body: [
          'An investment committee passed on a fintech IPO in 2021 ("overpriced, governance questions") — a decision that looked genius by 2023. Riding the validation, the committee then rejected three 2023 deals using the SAME heuristic — "fintech = 2021 = pain" — availability and representativeness wearing the costume of discipline. Two of the three rejected companies are now thriving at 3× the discussed entry.',
          'Meanwhile, the one deal they DID do was championed by the loudest member with the best war stories (affect + authority), entered without kill-criteria (no pre-commitment), and was held through a broken thesis "for symmetry with our public stance" (cognitive dissonance + status quo). The fund\'s official post-mortem blamed "market conditions."',
        ],
        questions: [
          'Identify at least five distinct biases in the story, with the exact sentence that evidences each.',
          'The 2021 rejection was RIGHT. Does a right outcome vindicate a biased process? Why do firms institutionalise outcome-based learning?',
          'Rewrite the committee\'s process with three structural changes that would have caught the 2023 errors.',
        ],
        takeaways: [
          'Right outcomes from biased processes are the most dangerous teachers — they fund the bias',
          'Availability + representativeness can masquerade as "pattern recognition"; only base rates unmask them',
          'Process beats prophecy: criteria set before the decision, judged on process after it',
        ],
      },
      revision: [
        'Heuristics: representativeness, availability, affect, similarity — shortcuts with systematic failures',
        'Cognitive biases = belief errors (trainable); emotional = preference errors (structure around them)',
        'Overconfidence triple: overestimation, overplacement, overprecision → turnover drag',
        'Anchoring → reference-price gravity; conservatism → slow estimate revision (PEAD engine)',
        'Mental accounting violates fungibility — net your drawers',
        'Regret aversion, endowment, status quo, self-control, illusion of control = emotional family',
        'De-bias: pre-commitment, base rates, disconfirming quota, decision journal, automation, premortem',
        'Bias blind spot: knowing is not immunity — process or nothing',
      ],
      practice: [
        {
          q: 'Classify as cognitive or emotional: (i) holding a loser to avoid regret, (ii) ignoring a base rate, (iii) demanding 20% extra to sell an inherited plot.',
          a: '(i) Emotional (regret aversion). (ii) Cognitive (representativeness/base-rate neglect). (iii) Emotional (endowment). Educate (ii); structure around (i) and (iii).',
        },
        {
          q: 'Why do SIPs and auto-rebalancing work as de-biasing tools?',
          a: 'They remove the decision point where biases act: no in-the-moment choice to delay (self-control), no active admission of a loss when rebalancing sells losers (disposition), and defaults defeat status quo by making discipline the path of least resistance.',
        },
        {
          q: 'Your team\'s 90% confidence intervals for FY forecasts contained the actual 62% of the time over 40 quarters. Diagnosis and cure?',
          a: 'Overprecision. Cure: widen intervals to historical hit-rate (calibration training), track interval hits publicly, and add explicit bear-case drivers — not "more analysis" of the central case.',
        },
        {
          q: 'An investor only buys companies whose products he uses and likes. Name the heuristic and the risk it creates.',
          a: 'Affect heuristic — liking the product substitutes for valuation. Risk: paying any price for "good companies"; the bias conflates business quality with investment merit (price discipline dies first).',
        },
        { q: 'An IPO doubles on listing. Two years later the stock still cannot fall in your model. Which biases?', a: 'Availability (the vivid doubling anchors the story) plus confirmation (seeking bull-case evidence) and anchoring on the peak. Triangulate with base rates of post-IPO performance to break the spell.' },
        { q: 'Your analyst team unanimously agrees on a target within minutes. Should you be reassured?', a: 'No - groupthink and information cascades produce confident, correlated answers fast. Require independent written estimates BEFORE discussion; the dispersion between them is free risk information.' },
      ],
    },

    /* ─────────── LECTURE 5 (Unit 5 · outline) ─────────── */
    {
      slug: 'advances-neurofinance-behavioural-capm',
      number: 5,
      title: 'Recent Advances: Neurofinance, Behavioural CAPM, BPT & Robo-Advisory',
      minutes: 40,
      summary:
        'Neuroscience in investing, the Behavioural CAPM and Behavioural Portfolio Theory, emotional and group investing, digital-age biases, ESG behaviour, and behavioural design in fintech & robo-advisory.',
      status: 'live',
      objectives: [
        'Summarise what neurofinance actually establishes (and does not)',
        'Contrast Behavioural Portfolio Theory with Markowitz mean-variance',
        'Explain Shefrin\'s behavioural CAPM and sentiment beta',
        'Identify behavioural design patterns in fintech and robo-advisory',
      ],
      sections: [
        {
          heading: '1. Neurofinance and group dynamics',
          body: [
            '**Neurofinance** images the deciding brain: amygdala activation precedes risk-taking and loss processing (lesion patients with damaged amygdalae take absurd risks); the prefrontal cortex handles valuation and self-control; dopamine reward circuits respond to *prediction error*, not outcome — the engine of gambling-like trading. Cortisol rises with volatility and biases toward inaction; testosterone loads risk-taking (the winner effect on trading floors). Established: emotional circuits materially shape risk decisions, and individual differences are measurable. NOT established: "buy when the fMRI says fear" — neural signals are noisy, group-level, and not a tradable edge.',
            '**Emotional and group investing**: mood contagion (sunny-day optimism effects on returns), social proof and herding (Unit 2), bubbles as collective narrative plus price feedback (price ↑ → story improves → new buyers → price ↑). **ESG behaviour**: stated-vs-revealed preference gap (people say values, buy returns); identity signalling drives ESG fund flows more than impact maths; greenwashing exploits warm-glow. **Digital-age biases**: app design (streaks, confetti on wins, one-tap buy) manufactures dopamine loops; finfluencer herding; doom-scrolling amplifies availability; gamification raises turnover and lowers returns for exactly the users it recruits.',
          ],
          callout: {
            type: 'exam',
            text: 'One-line answers examiners want: neurofinance shows WHERE and HOW bias is generated (amygdala = fear/loss, prefrontal = control, dopamine = prediction error); behavioural design shows WHAT to do about it (defaults, friction, cool-offs, framing). Pair a mechanism with an intervention and you have full marks.',
          },
        },
        {
          heading: '2. BPT and the behavioural CAPM',
          body: [
            '**Shefrin–Statman Behavioural Portfolio Theory (BPT)**: investors hold **layered pyramids**, not one mean-variance portfolio. Each layer has an aspiration: a *safety layer* (FDs, insurance, "never go broke") and a *rich layer* (lottery-like bets, one concentrated hero stock), mental accounts with separate risk attitudes — risk-averse AND risk-seeking simultaneously (exactly the Allais pattern from Unit 1). Consequence: covariance between layers is ignored; the portfolio as a whole is inefficient even when every layer "makes sense". BPT explains the observed barbell: fixed deposits plus crypto in the same account.',
            '**Behavioural CAPM (Shefrin)**: decompose expected return into a **fundamental component** (rational payoff beta) and a **sentiment premium** from aggregate misreaction — the security market line tilts. Some assets carry a **sentiment beta**: hard-to-value, story-rich, lottery-skew stocks trade above rational value when sentiment is high; the line undershoots for narrative-poor value names. Testable implication: sentiment-sensitive stocks underperform after high-sentiment periods (Baker–Wurgler evidence). **Robo-advisory as de-biasing product**: defaults into diversified portfolios (status-quo bias harnessed), automatic rebalancing (disposition effect bypassed), fractional SIPs (mental accounting used well), cool-off periods and friction on panic exits (System 2 re-engaged), goal frames instead of performance-chasing frames. The design IS the alpha for retail.',
          ],
          bullets: [
            'BPT: mental-accounted pyramid — safety layer + aspiration layer; ignores cross-layer covariance',
            'Behavioural CAPM: E(r) = rational beta premium + sentiment premium; sentiment beta varies by asset',
            'Prediction-error dopamine: why trading feels like a slot machine',
            'Design patterns: defaults, auto-rebalance, friction on panic, goal framing',
          ],
        },
      ],
      diagram: {
        title: 'The BPT pyramid vs the efficient frontier',
        caption: 'Mean-variance optimises one portfolio on the frontier; BPT stacks aspiration layers whose combination never reaches the frontier.',
        svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BPT pyramid beside Markowitz frontier">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <polygon points="160,215 100,215 130,175" fill="#dcfce7"/>
    <polygon points="130,175 190,175 160,215" fill="#fef9c3"/>
    <polygon points="100,215 40,215 70,175" fill="#dcfce7"/>
    <polygon points="40,215 70,175 100,215" fill="#fef9c3"/>
    <polygon points="70,175 130,175 100,135" fill="#e0f2fe"/>
    <polygon points="100,135 130,175 160,215 130,135" fill="#e0f2fe"/>
    <polygon points="100,135 130,135 100,95" fill="#ede9fe"/>
    <polygon points="100,95 130,135 130,95" fill="#ede9fe"/>
    <polygon points="100,95 130,95 115,55" fill="#fbcfe8"/>
    <polygon points="100,95 130,95 115,55" fill="#fbcfe8"/>
    <text x="95" y="208" fill="#14532d" font-size="10">FD / insurance</text>
    <text x="100" y="158" fill="#075985" font-size="10">balanced funds</text>
    <text x="115" y="118" fill="#4c1d95" font-size="10">growth / midcap</text>
    <text x="115" y="72" fill="#9d174d" font-size="10">hero bets</text>
    <text x="100" y="238" fill="#334155" font-weight="600">BPT: layered aspirations</text>
    <path d="M430,210 C430,120 520,55 640,45" fill="none" stroke="#7c3aed" stroke-width="3"/>
    <circle cx="528" cy="93" r="6" fill="#16a34a"/>
    <text x="560" y="88" fill="#16a34a" font-weight="600">Markowitz: ONE portfolio</text>
    <circle cx="560" cy="150" r="6" fill="#dc2626"/>
    <text x="470" y="172" fill="#dc2626">actual BPT stack —</text>
    <text x="470" y="186" fill="#dc2626">below the frontier</text>
    <line x1="420" y1="215" x2="660" y2="215" stroke="#475569" stroke-width="1.5"/>
    <line x1="420" y1="215" x2="420" y2="35" stroke="#475569" stroke-width="1.5"/>
    <text x="630" y="232" fill="#475569">risk σ</text>
    <text x="390" y="40" fill="#475569">E(r)</text>
    <text x="545" y="238" fill="#334155" font-weight="600">Mean-variance world</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Behavioural CAPM (Shefrin)', expr: 'E(rᵢ) = r + βᵢᴿ·(fundamental premium) + βᵢˢ·(sentiment premium)', meaning: 'Return = rational beta + sentiment beta loadings' },
        { name: 'BPT layer utility', expr: 'U = Σₗ [ pₗ · u(aspirationₗ reached) − costₗ ]', meaning: 'Mental accounts priced separately' },
        { name: 'Gamification cost', expr: 'Net return = gross return − excess turnover × cost − attention taxes', meaning: 'App design shows up in returns' },
      ],
      examples: [
        {
          title: 'Audit a two-layer portfolio as a BPT stack',
          given: ['Client: ₹30 lakh in FDs + PPF (safety layer); ₹8 lakh in three smallcap "story" stocks and some crypto (rich layer)', 'Correlation between the layers: ignored by the client entirely'],
          steps: [
            { text: 'Aspirations', calc: 'Layer 1: "never lose retirement"; Layer 2: "₹8 lakh → ₹1 cr in 3 years" (lottery framing)' },
            { text: 'Mean-variance view', calc: 'Combined ₹38 lakh, 79% defensive — for a 32-year-old with 28-year horizon this sits far inside any efficient frontier' },
            { text: 'BPT view', calc: 'Both layers internally "satisfy" their mental accounts — the client refuses rebalancing because selling winners "kills the dream layer"' },
            { text: 'Redesign', calc: 'Keep the two-account structure (it is real psychology) but re-specify layers: core index SIP as the growth engine; cap the hero layer at ≤10% with a written "lottery ticket" memo' },
          ],
          answer: 'BPT\'s lesson is not "destroy the pyramid" — it is to price each layer honestly and cap the layers whose EV is negative after the story premium.',
        },
        {
          title: 'Robo-advisor de-biasing map',
          given: ['Features: default 60/40 fund kit, monthly auto-debit SIP, auto-rebalance bands ±5%, 48-hour cool-off on full redemptions, goal frames ("retire at 55") not return frames'],
          steps: [
            { text: 'Defaults', calc: 'Status-quo bias → good portfolio; inertia becomes an ally' },
            { text: 'Auto-rebalance', calc: 'Disposition effect bypassed — sells high / buys low mechanically' },
            { text: 'Cool-off', calc: 'Inserts System-2 delay exactly when panic (hot state) would transact' },
            { text: 'Goal framing', calc: 'Reference point moves from daily NAV (loss-aversion trigger) to goal progress (gain frame)' },
          ],
          answer: 'Every feature is a mapped bias fix — that is the product thesis of behavioural fintech.',
        },
      ],
      caseStudy: {
        title: 'Case — Sentiment beta in the meme cycle (2021–22)',
        body: [
          'A retail favourite trades at 30x sales during the 2021 momentum melt-up; a profitable compounder in the same sector trades at 12x earnings and goes nowhere. Through 2022 the sentiment cycle turns: the story stock falls 85%, the compounder ends flat-to-up.',
          'A behavioural-CAPM reading: during high sentiment, narrative-rich names (high sentiment beta) command a premium above any fundamental value; the premium unwinds predictably as sentiment mean-reverts (Baker–Wurgler).',
        ],
        questions: [
          'What distinguishes a high-sentiment-beta stock from a high-fundamental-beta one?',
          'How would you test the sentiment-premium hypothesis?',
          'What robo-advisor design would have protected the holder?',
        ],
        takeaways: [
          'Sentiment beta loads on story-amenity (narrative simplicity, lottery skew, low institutional ownership), not on market covariance — the two premiums coexist in Shefrin\'s decomposition',
          'Test: sort stocks on sentiment proxies (IPO waves, retail flow, share turnover) at t; measure subsequent returns — high-sentiment cohorts underperform',
          'Design fixes: position caps on single names, cool-off on momentum-chasing deposits, default diversified kit — the product decides whether bias is amplified or neutralised',
          'The exam point: behavioural CAPM keeps the SML but adds a sentiment tilt — a correction, not a demolition, of Unit 1\'s baseline',
        ],
      },
      revision: [
        'Neurofinance: amygdala (fear/loss), prefrontal (control/valuation), dopamine (prediction error → addictive trading)',
        'Cortisol ↑ with volatility → inaction bias; testosterone → risk-taking',
        'BPT (Shefrin–Statman): mental-accounted pyramid; risk-averse AND risk-seeking at once; covariance ignored',
        'BPT portfolio sits INSIDE the efficient frontier; explains barbells (FD + crypto)',
        'Behavioural CAPM: E(r) = rational premium + sentiment premium; sentiment beta high for story/lottery stocks',
        'Baker–Wurgler: high-sentiment periods precede underperformance of sentiment-sensitive stocks',
        'Robo design: defaults, auto-rebalance, cool-offs, goal framing = de-biasing as product',
        'ESG behaviour: stated-vs-revealed gap, warm-glow, greenwashing exploits affect',
        'Gamification raises turnover — design is a return variable',
      ],
      practice: [
        { q: 'Why does BPT predict FDs and lottery stocks in one portfolio?', a: 'Mental accounts carry separate aspirations and separate risk attitudes; the safety layer satisfies "don\'t go broke" while the rich layer pursues "get rich" — mean-variance\'s single risk parameter is abandoned, so inconsistent risk postures coexist.' },
        { q: 'A fund manager says neuro findings are unusable. Fair summary?', a: 'Right about trading signals (no reliable edge from imaging); wrong about product and process — neuro evidence justifies friction, cool-offs and limit-reminders that block hot-state trades, which measurably improve client outcomes.' },
        { q: 'In Shefrin\'s bCAPM, why do boring value stocks sit below the rational line during euphoria?', a: 'Their sentiment premium is negative: attention and flows chase story stocks, starving narrative-poor names; compensation must rise — then reverses when sentiment mean-reverts.' },
        { q: 'What falsifiable prediction does behavioural asset pricing make that standard CAPM does not?', a: 'Anomalies (momentum, value) predict returns AFTER controlling for beta, with payoffs concentrated where arbitrage capital is constrained - testable patterns standard CAPM says should not exist.' },
        { q: 'Why is neurofinance a complement, not a substitute, to survey and market data?', a: 'Brain and body signals (amygdala activity, cortisol, skin conductance) show WHEN stress drives decisions, but prediction needs market and survey data. The lab localises the mechanism; the field prices it.' },
      ],
      tools: [
        { label: 'Portfolio Risk & Return Lab', href: '/tools/portfolio-risk-lab' },
      ],
    },
  ],
};
