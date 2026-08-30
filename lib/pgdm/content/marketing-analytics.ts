import type { Lecture } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM BA05 — Marketing Analytics
   Unit-wise lectures: overview & data/ethics → descriptive
   (EDA, segmentation, pricing, positioning) → predictive (CLV,
   retention) → digital analytics (web/SEO/social/email) →
   challenges & trends (cloud, ROI, credibility, future)
   ═══════════════════════════════════════════════════════════════ */

export const marketingAnalyticsLectures: Lecture[] = [
  {
    slug: 'marketing-analytics-foundations-data-ethics',
    number: 1,
    title: 'Marketing Analytics Foundations: Strategy, Data & Ethics',
    minutes: 40,
    summary:
      'What marketing analytics is and where it sits in decisions, key concepts and technique families, analytics as the enabler of marketing strategy, data collection and management (first/second/third-party), and the ethics line — privacy, consent and dark patterns.',
    status: 'live',
    objectives: [
      'Define marketing analytics and its role in the marketing decision process',
      'Place technique families: descriptive, predictive, prescriptive',
      'Design the data foundation: sources, collection, management, quality',
      'Apply the ethics test to data, targeting and measurement',
    ],
    sections: [
      {
        heading: '1. What it is and what it decides',
        body: [
          '**Marketing analytics** = the practice of Measuring, managing and analysing marketing performance to maximise effectiveness and optimise return — every rupee of marketing, accounted for. It differs from reporting (what happened) by answering THREE questions: what happened (descriptive — dashboards, segments), what will happen (predictive — churn, CLV, response models), what should we do (prescriptive — budget allocation, next-best-action, price). Where it sits in decisions: the marketing plan loop — situation analysis (market sizing, share) → strategy (STP: segmentation-targeting-positioning, Unit 2) → mix (4Ps with price/promotion analytics) → execution (digital channels, Unit 4) → measurement (attribution, ROI, Unit 5) → learning (experiments feed back). Decisions it serves: who to target, what to offer, at what price, through which channel, with what message, and how much to spend.',
          '**Key concepts & techniques** (the vocabulary of the course): metrics funnel (impressions → clicks → visits → leads → orders → revenue — conversion rates between stages), CAC/LTV economics (Unit 3\'s heart), attribution (which touch gets credit — Unit 4), experimentation (A/B tests — the only causal instrument), segmentation (Unit 2), brand/equity measurement (surveys, share-of-voice, Unit 2 positioning), MMM vs MTA (top-down econometric vs bottom-up user-level — Unit 5\'s ROI debate). **Analytics as enabler of strategy**: strategy = differentiated choices; analytics makes the choices EVIDENCE-based — precise segments (k-means, BA04), price fences (elasticity), budget allocation by marginal ROI, and the feedback discipline (kill what cannot be measured). The maturity curve: reporting → analysis → experimentation → optimisation → automated (next-best-action engines); most firms sit at stage 2.',
        ],
        callout: {
          type: 'note',
          text: 'The marketing data stack — know the source types: FIRST-party (your own: transactions, CRM, web/app behaviour, email — the gold: consented, exclusive), SECOND-party (a partner\'s first-party shared contractually), THIRD-party (aggregated from many sites — cookies/device graphs, now dying with privacy regulation and deprecation). The first-party shift is THE data-strategy story of the decade: own the relationship, collect consented data, activate it (CDP — customer data platform unifying IDs).',
        },
      },
      {
        heading: '2. Data collection, management, and the ethics line',
        body: [
          '**Collection**: transactional (POS/e-com — the truth of behaviour), behavioural (web/app events, BA04 Unit 5\'s logs; clickstream sessionisation), attitudinal (surveys, NPS, reviews — the "why"), experimental (A/B, holdouts — the only causal source), syndicated (Nielsen/IRS panels — reach and share), and market/scraped (competitor prices, social listening). Survey design essentials (Unit 2 uses them): sampling frame vs target population, questionnaire bias (leading questions, order effects), scale design (Likert 5/7, anchors), pre-testing. **Management**: the single customer view — identity resolution (email/phone/device stitching — BA04\'s entity resolution), the CDP vs CRM distinction (CRM = managed record of relationship; CDP = unified behavioural profile for activation), data quality (BA04 Unit 1\'s dimensions apply: completeness, consistency, timeliness), consent and purpose flags carried with EVERY record.',
          '**Ethics** — the line marketers keep crossing: privacy law baseline (India DPDP Act 2023: consent notice, purpose limitation, opt-out; GDPR in EU reach: lawful basis, right to erasure), the BEHAVIOURAL line beyond law — inferential harm (targeting the vulnerable: payday loans to the indebted, "congrats on the baby" before the family knows — Target\'s pregnancy prediction), dark patterns (forced continuity, disguised ads, confirm-shaming — regulated increasingly, reputationally fatal always), facial/attribute discrimination (excluding groups from housing/credit/job ads — the Facebook adjudications), and measurement ethics (dark ads invisible to competitors/regulators; A/B tests on users without debrief — emotional-contagion study). The working test — "the front-page test" (would this campaign survive being explained on the front page?) plus the fairness audit (BA01 Unit 5\'s bias checks on targeting variables). Ethical data practice is also DURABLE practice: consented first-party data survives the cookie\'s death; trust compounds.',
        ],
        bullets: [
          'Three questions: descriptive (what happened), predictive (what will), prescriptive (what to do)',
          'Plan loop: analysis → STP → mix → execution → measurement → learning',
          'Metrics funnel: impressions → clicks → visits → leads → orders → revenue',
          'Core economics: CAC, LTV, ROAS, attribution (Units 3–5)',
          'Data types: first (gold) / second (partner) / third (dying cookie)',
          'Sources: transactional, behavioural, attitudinal, experimental, syndicated',
          'Identity resolution → single customer view (CDP over CRM)',
          'Consent + purpose flags travel WITH the record (DPDP/GDPR)',
          'Ethics traps: inferential harm, dark patterns, attribute discrimination',
          'The front-page test + fairness audit before every campaign',
        ],
      },
    ],
    diagram: {
      title: 'Analytics in the marketing engine',
      caption: 'Data (consented, unified) feeds the three analytics tiers; decisions return outcomes that retrain the models — ethics wraps the loop.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Marketing analytics engine">
  <defs><marker id="ma" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="11" text-anchor="middle">
    <rect x="16" y="95" width="140" height="60" rx="10" fill="#e0f2fe"/><text x="86" y="117" fill="#0c4a6e" font-weight="600">DATA</text><text x="86" y="133" fill="#075985">1st party · consented</text><text x="86" y="147" fill="#075985">unified ID (CDP)</text>
    <rect x="196" y="30" width="150" height="50" rx="10" fill="#dcfce7"/><text x="271" y="50" fill="#14532d" font-weight="600">DESCRIPTIVE</text><text x="271" y="66" fill="#166534">segments · funnels · price</text>
    <rect x="196" y="100" width="150" height="50" rx="10" fill="#fef9c3"/><text x="271" y="120" fill="#713f12" font-weight="600">PREDICTIVE</text><text x="271" y="136" fill="#a16207">CLV · churn · propensity</text>
    <rect x="196" y="170" width="150" height="50" rx="10" fill="#fee2e2"/><text x="271" y="190" fill="#7f1d1d" font-weight="600">PRESCRIPTIVE</text><text x="271" y="206" fill="#991b1b">budget · NBA · price</text>
    <rect x="386" y="100" width="150" height="50" rx="10" fill="#ede9fe"/><text x="461" y="120" fill="#4c1d95" font-weight="600">DECIDE + RUN</text><text x="461" y="136" fill="#5b21b6">campaigns · A/B tests</text>
    <rect x="576" y="100" width="128" height="50" rx="10" fill="#ffedd5"/><text x="640" y="120" fill="#7c2d12" font-weight="600">MEASURE</text><text x="640" y="136" fill="#9a3412">attribution · ROI</text>
    <line x1="156" y1="112" x2="194" y2="60" stroke="#475569" stroke-width="1.4" marker-end="url(#ma)"/>
    <line x1="156" y1="125" x2="194" y2="125" stroke="#475569" stroke-width="1.4" marker-end="url(#ma)"/>
    <line x1="156" y1="138" x2="194" y2="190" stroke="#475569" stroke-width="1.4" marker-end="url(#ma)"/>
    <line x1="346" y1="55" x2="440" y2="98" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#ma)"/>
    <line x1="346" y1="125" x2="384" y2="125" stroke="#475569" stroke-width="1.4" marker-end="url(#ma)"/>
    <line x1="346" y1="195" x2="440" y2="152" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#ma)"/>
    <line x1="536" y1="125" x2="574" y2="125" stroke="#475569" stroke-width="1.4" marker-end="url(#ma)"/>
    <path d="M640,150 C640,225 86,225 86,157" fill="none" stroke="#475569" stroke-width="1.4" marker-end="url(#ma)"/>
    <text x="360" y="243" fill="#475569">outcomes retrain the models — ethics (consent · fairness · front-page test) wraps the whole loop</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Conversion rate', expr: 'conv = orders / visits (per stage of the funnel)', meaning: 'The funnel\'s vital signs' },
      { name: 'CAC', expr: 'CAC = marketing spend / new customers acquired', meaning: 'What a customer costs' },
      { name: 'ROAS', expr: 'ROAS = attributed revenue / ad spend', meaning: 'Channel-level efficiency (Unit 4)' },
      { name: 'Rule ofthumb LTV:CAC', expr: 'LTV/CAC ≥ 3 with payback < 12 months', meaning: 'Unit economics gate (Unit 3)' },
    ],
    examples: [
      {
        title: 'The metrics funnel on real numbers',
        given: ['Campaign: 2.4m impressions → 48k clicks → 31k visits → 3,100 leads → 620 orders; avg order ₹2,600; spend ₹7.8L'],
        steps: [
          { text: 'Stage rates', calc: 'CTR 2.0% · click→visit 64.6% (14% bot/lost clicks — check tracking) · visit→lead 10% · lead→order 20%' },
          { text: 'End-to-end', calc: 'visit→order = 2.0%; CPM ₹325; CPC ₹16.25; cost per order = 7.8L/620 = ₹1,258' },
          { text: 'Unit economics', calc: 'AOV ₹2,600, gross margin 35% → ₹910/order — CAC ₹1,258 EXCEEDS first-order margin: the campaign must rely on repeat (LTV, Unit 3)' },
          { text: 'Diagnosis', calc: 'Weakest relative stage vs benchmark = lead→order (20% vs 35% typical) — fix nurture/conversion before buying more traffic' },
        ],
        answer: 'Funnel math localises the leak: here conversion, not traffic — and first-order economics demand retention to pay.',
      },
      {
        title: 'First-party data audit',
        given: ['D2C brand: 40% of ad targeting on third-party audiences; cookie deprecation kills 60% of that signal'],
        steps: [
          { text: 'Inventory', calc: 'First-party assets: 180k customer emails, 12% email opt-in rate on site, purchase history 3 years, app events 25k MAU' },
          { text: 'Value the consent gap', calc: 'At 12% opt-in you activate 22k of 180k — each point of opt-in ≈ 1,800 profiles: consent UX IS a growth lever' },
          { text: 'Build', calc: 'CDP stitches email+phone+device → 210k unified profiles; suppression lists (opt-outs) enforced at activation' },
          { text: 'Replace', calc: 'Look-alike seeds from TOP-DECILE first-party buyers (margin-qualified) replace generic third-party segments — smaller, sharper audiences' },
        ],
        answer: 'Privacy change becomes advantage for whoever owns consented relationships — the audit converts a threat into a moat.',
      },
    ],
    caseStudy: {
      title: 'Case — Target\'s pregnancy score and the ethics of inference',
      body: [
        'Target\'s analytics team built a pregnancy-prediction score from ~25 products (unscented lotion, vitamin supplements in early pregnancy…) and mailed coupon books accordingly. A Minneapolis father discovered his teenage daughter\'s pregnancy from the mailing — the model KNEW before the family did. Target\'s response: keep the model, but MASK it — mix pregnancy ads among unrelated items so the targeting feels like chance.',
      ],
      questions: [
        'Was the inference itself unethical, or the use?',
        'Does masking (the "camouflage" fix) satisfy the front-page test?',
        'Design an ethical use of the same score.',
      ],
      takeaways: [
        'The inference (legitimate predictive analytics — Unit 3\'s models) was legal; the HARM was unconsented, sensitive, identity-revealing targeting — inferential harm: the model discloses what the person chose not to share',
        'Masking fails the front-page test: it hides the practice rather than consent to it — "we make the surveillance invisible" is the definition of the problem, not the cure',
        'Ethical design: sensitive-category flags (pregnancy, health, finances) require EXPLICIT opt-in, use limitations (prenatal content, not third-party sharing), and disclosure ("based on your shopping, you may find…"); DPDP purpose-limitation codifies this for India',
        'Exam line: analytics ethics is about the USE of inference — sensitivity of category, consent, and disclosure — not about the modelling technique',
      ],
    },
    revision: [
      'Marketing analytics = measurement + analysis to maximise effectiveness/ROI',
      'Three tiers: descriptive → predictive → prescriptive',
      'Plan loop: analysis → STP → mix → execution → measurement → learning',
      'Funnel: impressions → clicks → visits → leads → orders → revenue',
      'Key metrics: CTR, conv rates, CPM/CPC, CAC, ROAS, AOV, LTV:CAC ≥ 3',
      'Data: first-party (gold, consented) / second (partner) / third (dying)',
      'Sources: transactional, behavioural, attitudinal, experimental, syndicated',
      'Identity resolution → CDP single customer view; consent flags travel with data',
      'DPDP 2023: consent notice, purpose limitation, opt-out; GDPR for EU reach',
      'Ethics: inferential harm, dark patterns, attribute discrimination, front-page test',
      'Consent rate is a growth metric — own the relationship, survive the cookie',
    ],
    practice: [
      { q: 'Your CMO asks for "more data-driven marketing". Which maturity-stage moves matter first?', a: 'Instrument the funnel (clean tracking, single ID), build descriptive dashboards (know conversion by stage/channel), THEN experiment (A/B culture), THEN predictive (CLV/churn) — jumping to models without measurement infrastructure produces confident nonsense (BA04 Unit 1 logic).' },
      { q: 'Third-party cookie deprecation announced. One-sentence strategy response?', a: 'Accelerate first-party data: value exchange for consent (loyalty, personalisation), CDP identity unification, and contextual + look-alike modelling on owned seeds as replacement targeting.' },
      { q: 'An A/B test idea: change the checkout button to "Buy now, risk-free". Ethical review?', a: '"Risk-free" is fine IF returns are genuinely frictionless; check for dark-pattern adjacency (pre-checked add-ons, hidden charges at payment) — the claim must match the policy, and the front-page test applies to the dark variant names too.' },
      { q: 'Campaign: 2m impressions, 40k clicks, 25k visits, 500 orders, spend Rs 6L, order margin Rs 800. Verdict?', a: 'CTR 2 percent, click-to-visit 62.5 percent (tracking leak - investigate), visit-to-order 2 percent. CAC = Rs 1,200 vs first-order margin Rs 800: underwater on first purchase - the campaign needs repeat (LTV) to justify.' },
      { q: 'Cookie deprecation kills your third-party audiences. Name the replacement stack.', a: 'Consented first-party data (value exchange for opt-in), CDP identity stitching, look-alike models seeded on own best customers, contextual targeting, and clean-room collaboration with partners.' },
    ],
  },
  {
    slug: 'descriptive-analytics-segmentation-pricing-positioning',
    number: 2,
    title: 'Descriptive Analytics: EDA, Segmentation, Pricing & Positioning',
    minutes: 45,
    summary:
      'Descriptive analytics in action: exploratory data analysis for marketing insight, market research and survey design, customer profiling and segmentation (RFM to k-means, personas), product and pricing analysis (elasticity, price fences, promo analysis), and competitive analysis with positioning maps.',
    status: 'live',
    objectives: [
      'Run EDA that produces marketing insight, not just charts',
      'Design surveys that survive method review',
      'Segment customers: RFM scoring, k-means, personas that activate',
      'Analyse price: elasticity, fences, promotions; map competitive position',
    ],
    sections: [
      {
        heading: '1. EDA, research, segmentation',
        body: [
          '**EDA for insight** (BA03\'s tools, marketing questions): distributions by segment (revenue concentration — the 80/20 check: usually the top decile IS half the revenue), trends and seasonality (BA02\'s decomposition on sales), correlation screens (discount depth vs margin), funnel cohort views (acquisition-month cohorts — do festive customers retain worse?). The EDA discipline: hypotheses written first (BA03 Unit 1), every chart answers a NAMED question, and anomalies investigated (spike = tracking bug or real campaign?). **Market research & survey design**: when surveys vs behavioural data (behaviour = what they DO, surveys = what they SAY — both biased differently); design — sampling (frame vs population, quota vs random; non-response bias), questionnaire (screeners, funnel from easy to hard, one concept per question, balanced scales, pre-test with 10 respondents), sample size for proportions (n ≈ (z²p(1−p))/e² — ±5% at 95% needs ~384), and validity threats (leading wording, order effects, self-selection).',
          '**Customer profiling & segmentation**: requirements — actionable (differ in response/margin), identifiable (data exists to assign), substantial (big enough to serve), stable enough to operate; methods ladder: heuristics (new vs repeat; high/med/low value), **RFM** (recency, frequency, monetary — quintile scores 555 = best; fast, transparent, univariate), **k-means on behavioural features** (BA04 Unit 3 — multi-dimensional, discovers shapes RFM misses; requires scaling, k by silhouette + interpretability), latent-class/model-based (probabilistic, softer boundaries); then the PERSONA layer — name the segments ("festive deal-hunters", "loyal replenishers", "one-stop families"), profile by margin/product/channel/daypart, and ACTIVATE: differentiated offers, creative, service tiers. Segmentation failure modes: too many segments to operationalise (the 8-campaign trap, BA04), descriptive-but-not-predictive segments (segments must differ on OUTCOMES — validate!), and re-segmenting so often the org loses memory (refresh quarterly, track migrations).',
        ],
        callout: {
          type: 'exam',
          text: 'RFM scoring drill: score each customer 1–5 (quintile) on Recency (higher score = more recent), Frequency, Monetary → concatenate: 555 champions · 551 recent big spenders lapsing in frequency · 155 "win-back: high value, long gone" · 111 dead. Then map actions: 555 → VIP/early access; 355 → loyalty tiers; 155 → win-back with margin-aware offers; 111 → suppress (stop paying to reach them). The exam asks you to score, name the segment, and prescribe the action.',
        },
      },
      {
        heading: '2. Product, pricing, and positioning',
        body: [
          '**Product analytics**: assortment (sales-rank curves, long-tail contribution, dead-stock flags), cross-sell affinity (BA04\'s association rules → bundles), launch analysis (trial → repeat curves: repeat rate < 20% = trial spike then death), product-market fit proxies for SaaS/apps (retention curves flattening, cohort NPS). **Pricing analysis**: the vocabulary — cost-plus (lazy but safe), value-based (price to delivered value), competition-based; **price elasticity** (PED = %ΔQ/%ΔP; elastic |PED|>1: price cuts raise revenue; inelastic: raise price) estimated from historical variation (regression on log-log: log Q = a + b log P, b = elasticity — careful: correlation from promotions confounds; best evidence = randomised price tests or clean natural experiments); **price fences** (versioning: student/good-better-best/early-bird — capture willingness-to-pay WITHOUT arbitrage); promo analysis (uplift vs baseline — BA02\'s baseline forecasting: did the festival discount GROW the category or just time-shift?; halo/cannibalisation across SKUs; stockpile effect in CPG — the 2-month dip after the promo).',
          '**Competitive analysis & positioning**: data sources (price scraping, share-of-voice from ad intelligence, review mining for attribute sentiment, syndicated panels for share), and the **positioning (perceptual) map**: pick two attributes that DRIVE choice (price vs premium, convenience vs selection), plot brands from survey ratings (attribute means) or derived (correspondence analysis on preference data), locate the EMPTY space (differentiation opportunity) and the CROWDED space (commoditisation risk); track movement over time (did the reposition move perceptions?). Positioning analytics answers: who do we win against (win/loss analysis), on what attribute are we losing (review-sentiment gaps by attribute), and is the attribute worth winning (driver analysis — regression of preference on attribute ratings; importance vs performance = the quadrant chart that prioritises product investment).',
        ],
        bullets: [
          'EDA: hypotheses first; every chart answers a named question',
          '80/20 revenue concentration check; cohort funnels (acquisition-month)',
          'Survey: frame, quotas, funnel design, balanced scales, pre-test; n≈384 for ±5%',
          'Behaviour vs attitude: both biased differently — triangulate',
          'Segment criteria: actionable, identifiable, substantial, stable',
          'RFM quintiles 555→111 with named actions; k-means for multi-dimensional',
          'Personas profile by margin/channel/daypart — then activate',
          'Validate: segments must differ on outcomes (response, churn, margin)',
          'PED = %ΔQ/%ΔP; log-log regression b; randomised price tests > history',
          'Fences capture WTP: versioning, early-bird, student — no arbitrage',
          'Promo uplift vs baseline; halo, cannibalisation, stockpiling',
          'Positioning map: choice-driving attributes, empty vs crowded space; driver analysis',
        ],
      },
    ],
    diagram: {
      title: 'From data to positioning map',
      caption: 'Behavioural + attitudinal data meet in the STP flow: segments from transactions and surveys, each profiled, priced, and placed on the perceptual map.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="STP flow to positioning map">
  <defs><marker id="sta" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="11" text-anchor="middle">
    <rect x="16" y="30" width="150" height="52" rx="10" fill="#e0f2fe"/><text x="91" y="50" fill="#0c4a6e" font-weight="600">TRANSACTIONS</text><text x="91" y="66" fill="#075985">RFM · k-means</text>
    <rect x="16" y="120" width="150" height="52" rx="10" fill="#dcfce7"/><text x="91" y="140" fill="#14532d" font-weight="600">SURVEYS</text><text x="91" y="156" fill="#166534">attributes · NPS</text>
    <rect x="206" y="75" width="150" height="52" rx="10" fill="#fef9c3"/><text x="281" y="95" fill="#713f12" font-weight="600">SEGMENTS</text><text x="281" y="111" fill="#a16207">profiled · validated</text>
    <rect x="396" y="75" width="150" height="52" rx="10" fill="#fed7aa"/><text x="471" y="95" fill="#9a3412" font-weight="600">TARGET + PRICE</text><text x="471" y="111" fill="#c2410c">fences · elasticity</text>
    <line x1="166" y1="56" x2="204" y2="85" stroke="#475569" stroke-width="1.4" marker-end="url(#sta)"/>
    <line x1="166" y1="146" x2="204" y2="117" stroke="#475569" stroke-width="1.4" marker-end="url(#sta)"/>
    <line x1="356" y1="101" x2="394" y2="101" stroke="#475569" stroke-width="1.4" marker-end="url(#sta)"/>
    <rect x="396" y="165" width="308" height="70" rx="12" fill="#f8fafc"/>
    <line x1="416" y1="185" x2="590" y2="185" stroke="#475569" stroke-width="1.2"/>
    <line x1="416" y1="185" x2="416" y2="222" stroke="#475569" stroke-width="1.2"/>
    <text x="520" y="180" fill="#475569" font-size="10">price / value →</text>
    <text x="410" y="232" fill="#475569" font-size="10">convenience ↑</text>
    <circle cx="470" cy="196" r="7" fill="#dc2626"/><text x="470" cy="192" fill="#dc2626" font-size="9" dominant-baseline="auto"></text>
    <circle cx="540" cy="206" r="7" fill="#2563eb"/><circle cx="575" cy="192" r="7" fill="#16a34a"/>
    <text x="620" y="180" fill="#94a3b8" font-size="10">empty space?</text>
    <text x="550" y="236" fill="#475569" font-size="10">positioning map: brands × choice attributes</text>
      </g>
</svg>`,
    },
    formulas: [
      { name: 'Price elasticity', expr: 'PED = (%ΔQ)/(%ΔP); log Q = a + b·log P → b', meaning: 'Price lever strength' },
      { name: 'Survey size', expr: 'n = z²p(1−p)/e²  (±5%, 95% ≈ 384)', meaning: 'How many respondents' },
      { name: 'RFM score', expr: 'quintiles (1–5) on Recency, Frequency, Monetary', meaning: '555 champions … 111 dead' },
      { name: 'Promo uplift', expr: 'uplift = actual − forecast baseline (BA02)', meaning: 'Real incrementality' },
      { name: 'Optimal markup (monopoly)', expr: '(P − MC)/P = 1/|PED|', meaning: 'Elasticity caps price power' },
    ],
    examples: [
      {
        title: 'Elasticity from a price test',
        given: ['Two matched store groups: control keeps ₹100; test ₹115 for 4 weeks. Control volume 8,000 units; test 6,880'],
        steps: [
          { text: '% changes', calc: 'ΔP = +15%; ΔQ = (6880−8000)/8000 = −14%' },
          { text: 'PED', calc: '−14%/+15% ≈ −0.93 — roughly unit elastic (revenue-neutral), margin-positive' },
          { text: 'Margin check', calc: 'Unit cost ₹60 → control margin ₹40×8000 = ₹3.2L; test ₹55×6880 = ₹3.78L → +18% margin with ~flat revenue' },
          { text: 'Caveats', calc: 'One category, 4 weeks, no stockpiling window; check cannibalisation of adjacent SKUs and repeat the test before national rollout' },
        ],
        answer: '|PED| ≈ 0.93 → raise price: the +15% test lifts margin 18% — a randomised price test beats a year of historical regression.',
      },
      {
        title: 'Positioning map from review mining',
        given: ['Your D2C brand vs 3 competitors; 12,000 reviews tagged by attribute (delivery speed, price, quality, support); preference survey n = 420'],
        steps: [
          { text: 'Attribute sentiment', calc: 'Brand sentiment by attribute: you lead on quality (4.6/5) but trail on delivery (3.1 vs competitor 4.5)' },
          { text: 'Driver analysis', calc: 'Regression: preference ~ attributes → delivery β 0.42 (largest!), quality β 0.19 — delivery MATTERS more than you lead on' },
          { text: 'Map', calc: 'Axes: perceived value vs delivery reliability → your brand sits high-value/low-reliability; the empty cell is mid-price/high-reliability' },
          { text: 'Decide', calc: 'Invest in delivery SLA (the driver), reposition creative on reliability once fixed — don\'t shout quality louder (already believed)' },
        ],
        answer: 'Reviews + a survey locate you; driver analysis says which gap is worth closing — perception is a measurable, movable asset.',
      },
    ],
    caseStudy: {
      title: 'Case — The discount that trained the customers',
      body: [
        'A furniture e-tailer runs ever-deeper festive sales (30–60% off) for three years. EDA shows: revenue flat, margin down 9 points, and a growing share of orders from "wait-for-sale" customers whose inter-purchase gap stretches to exactly the sale calendar. NPS among full-price buyers falls ("I feel stupid paying full price").',
        'The fix: elasticity-informed fences — keep ONE flagship sale, move other discounts to loyalty-locked and clearance styles (member pricing, not broadcast), and test value messaging (free redesign service) on a price-insensitive segment.',
      ],
      questions: [
        'Which descriptive signals were visible in the data all along?',
        'Why did broadcast discounts destroy more than they gave?',
        'How do fences repair willingness-to-pay?',
      ],
      takeaways: [
        'Signals: widening full-price vs sale-order mix, inter-purchase gaps synchronising to the promo calendar, falling full-price NPS — EDA on COHORTS (not aggregates) reveals behavioural change that monthly totals hide',
        'Broadcast discounts reset REFERENCE prices for everyone (behavioural — BA06 anchoring), attract deal-prone switchers (lowest LTV), and train waiting — the uplift BA02 would measure is partly borrowed from next quarter',
        'Fences (member pricing, clearance separation, bundles) price-discriminate: discount reaches the price-elastic without re-anchoring the inelastic — recovering WTP is slower than destroying it (quarters vs one sale)',
        'Exam line: descriptive analytics (mix shifts, cohort gaps, sentiment by attribute) is the diagnosis layer — the pricing decision then needs elasticity + fences + experiments',
      ],
    },
    revision: [
      'EDA discipline: hypotheses first, named question per chart, investigate anomalies',
      'Cohort views beat aggregates (acquisition-month retention, price-mix drift)',
      'Survey: frame/quotas; funnel wording; balanced scales; pre-test; n≈384 (±5%)',
      'Say vs do gap: triangulate surveys with behaviour',
      'Segment criteria: actionable, identifiable, substantial, stable',
      'RFM quintile scores; 555/155/111 actions (VIP, win-back, suppress)',
      'k-means on scaled behaviours; validate by outcome differences',
      'Personas = named, margin-profiled, activated (offers/creative/tiers)',
      'PED = %ΔQ/%ΔP; log-log slope; randomised tests beat history',
      '(P−MC)/P = 1/|PED|; fences capture WTP without arbitrage',
      'Promo analysis: baseline uplift, halo, cannibalisation, stockpiling',
      'Positioning map on choice-driving attributes; driver analysis ranks fixes',
      'Share-of-voice, review mining, price scraping = competitive data layer',
    ],
    practice: [
      { q: 'RFM gives segment "513". Describe and prescribe.', a: 'Recent purchase (R5), one-time buyer (F1), high spend (M3): a NEW big basket — onboarding moment: cross-sell affinity bundle (BA04 rules), second-purchase nudge within 30 days (the habit window), and measure conversion to F2 (the single best predictor of future value).' },
      { q: 'Historical regression says PED = −2.5. CMO wants a 10% price cut. Your counsel?', a: 'Challenge the estimate: historical price variation is confounded with promotions/seasonality (BA03/BA06 causation); demand a randomised price test in matched stores first — an elasticity wrong by a factor ruins a quarter; also check margin at higher volume and competitor response.' },
      { q: 'Segmentation is done; CMO asks "now what?" — the activation answer?', a: 'Map each segment to: offer (margin-aware), channel/daypart, creative message, service tier, and a CONTROL group per segment to measure incremental response — segments that don\'t change the marketing mix are decoration.' },
      { q: 'Matched-store price test: +15 percent price, volume -14 percent, unit cost 60 percent of old price. Raise or revert?', a: 'PED = -0.93 (near unit elastic, revenue-flat) but margin per unit rises - total margin up. Roll out in waves, watching cannibalisation and competitor response before national.' },
      { q: 'Positioning map puts you high-quality/low-delivery and driver analysis says delivery drives preference. What is the strategy?', a: 'Fix delivery performance FIRST (it is the preference driver), then reposition messaging on reliability once true - shouting quality louder wastes money on an already-believed attribute.' },
    ],
  },
  {
    slug: 'predictive-analytics-clv-retention',
    number: 3,
    title: 'Predictive Customer Analytics: CLV, Loyalty & Retention',
    minutes: 45,
    summary:
      'Predictive modelling for customers: propensity and churn models (BA03/BA04 engines applied), customer analytics with loyalty-programme data, customer lifetime value (contractual and non-contractual, BG/NBD thinking), prediction methods in practice, loyalty metrics, and retention strategies that prove their lift.',
    status: 'live',
    objectives: [
      'Build propensity/churn scores and operationalise them (Unit 1\'s EV)',
      'Compute CLV: formula, drivers, retention/discount-rate sensitivity',
      'Model non-contractual customers: BG/NBD logic, predicted CLV',
      'Run loyalty analytics: metrics, tiers, and measured retention lift',
    ],
    sections: [
      {
        heading: '1. Propensity, churn, and CLV',
        body: [
          '**Predictive modelling** (the BA03/BA04 engines, customer targets): propensity models (P(buy | features) — logistic/trees on recency-frequency-monetary, browses, cart adds, channel; use: rank the file for a campaign, compute expected value per contact — Unit 1\'s formula), **churn models** (P(leave | features) — contract businesses: cancellation is observed, model directly withglm/trees + survival analysis (time-to-churn, hazard curves — WHEN not just who); non-contractual (retail): churn is INVISIBLE (no contract ends) — model "alive" probability instead: **BG/NBD** (beta-geometric/negative binomial) class of models using recency + frequency to estimate P(alive): a customer with 6 orders, last week → alive ~0.9; 6 orders, 18 months ago → alive ~0.2 — the framework that powers predicted CLV in retail). Deployment discipline from BA03/BA04: train/validation/test by TIME (not random — leakage!), calibration for EV math, retrain on drift.',
          '**Customer lifetime value** — the concept: the present value of expected future margin from a customer relationship. **The formula**: CLV = Σₜ [ m · rᵗ / (1+d)ᵗ ] — margin per period m, retention rate r, discount rate d, horizon t (or infinite-life closed form: CLV = m·r / (1 + d − r)). **Drivers**: margin (what they buy), retention (how long), discount rate (cost of capital — F06 link), plus acquisition only in the FULL equation (CLV − CAC = customer equity contribution). Sensitivity intuition: retention beats acquisition economics — a 5-point retention gain often outweighs a 20% CAC cut (and costs less); at r → 1 CLV explodes (the loyalty economics). Measuring inputs: m from margins by segment; r from cohort survival curves (BA02-style retention curves — the retention RATE is the slope); d = WACC (tools link: wacc-calculator). **Predicted vs historical CLV**: historical (past value — trailing 12-month margin) for reporting; PREDICTED (model-based) for decisions — segment the file by predicted CLV deciles and spend where the future is.',
        ],
        callout: {
          type: 'exam',
          text: 'CLV numerical (guaranteed): m = ₹2,000 margin/yr, r = 80%, d = 10%. Closed form: CLV = m·r/(1+d−r) = 2000(0.8)/(1.10−0.80) = 1600/0.30 = ₹5,333. Sensitivity: r → 85%: 1700/0.25 = ₹6,800 (+28% from 5 retention points!); d → 12%: 1600/0.28 = ₹5,714; m +10% → CLV +10% (linear). The exam wants the formula, the arithmetic, and the retention-beats-everything insight.',
        },
      },
      {
        heading: '2. Loyalty data, metrics, retention that works',
        body: [
          '**Customer analytics with loyalty data**: the programme is an IDENTIFICATION layer (unified basket across visits — without it, most retail behaviour is anonymous) + a data asset (tiers, redemptions, points liability — an accounting item!) + a treatment (member pricing, earn events). Analytics on loyalty data: member vs non-member baselines (selection bias! members were already better customers — compare like-for-like or with matched controls), earn/burn elasticity (does 2x points shift behaviour or subsidise?), tier migration analysis (which tier crossing changes behaviour — the status jump), points breakage (liability + engagement signal). **Loyalty metrics**: repeat rate, inter-purchase time, share-of-wallet (your share of the category spend — the growth room), redemption rate, active-member rate, programme ROI (incremental margin vs programme cost — measured against matched non-member controls, BA02\'s holdout logic).',
          '**Retention strategies — what actually works (evidence-based)**: identify WHO (churn scores × value = the Unit 1 EV queue), intervene EARLY (leading indicators: declining engagement, support friction, payment failures — the survival model\'s hazard window), match offer to REASON (exit surveys + reason codes: price → value bundle; service → recovery; moved → ignore; each reason has a different playbook), measure with HOLDOUTS (randomly withhold the intervention from a control slice — incremental save rate is the only honest number; beware the "retention saved them" fallacy: many would have stayed anyway), and fix the PRODUCT root causes (the top churn drivers are often CX defects, not pricing). The loyalty-programme evidence in one line: programmes work when they deliver REAL value and identification-driven personalisation; they fail as discount machines wearing loyalty clothes. Prediction methods wrap-up: ensembles win benchmarks (BA02 Unit 4), but the deployment stack is score → EV → playbook → holdout → retrain — the model is one-fifth of the system.',
        ],
        bullets: [
          'Propensity = P(buy); churn = P(leave); rank file by expected value',
          'Contract churn: observed → glm/trees + survival (hazard = WHEN)',
          'Non-contractual: BG/NBD P(alive) from recency + frequency',
          'Time-based splits; calibration; retrain on drift',
          'CLV = Σ m·rᵗ/(1+d)ᵗ; closed form m·r/(1+d−r)',
          'Retention is the super-linear driver; margin linear; d matters',
          'Historical CLV reports; predicted CLV decides (decile the file)',
          'Loyalty = identification + data asset + treatment; points = liability',
          'Member vs non-member: selection bias — matched controls only',
          'Loyalty metrics: repeat rate, share-of-wallet, redemption, active rate, ROI',
          'Retention: early warning × reason-matched playbooks × holdout lift',
          'Root causes are often CX defects — fix product before offers',
        ],
      },
    ],
    diagram: {
      title: 'The retention economics engine',
      caption: 'Churn and value scores meet in the expected-value queue; reason-matched playbooks deploy with holdouts; measured saves and CLV updates flow back.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Retention economics engine">
  <defs><marker id="pa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="11" text-anchor="middle">
    <rect x="16" y="40" width="150" height="52" rx="10" fill="#e0f2fe"/><text x="91" y="60" fill="#0c4a6e" font-weight="600">CHURN SCORE</text><text x="91" y="76" fill="#075985">P(leave) · hazard when</text>
    <rect x="16" y="140" width="150" height="52" rx="10" fill="#dcfce7"/><text x="91" y="160" fill="#14532d" font-weight="600">VALUE SCORE</text><text x="91" y="176" fill="#166534">predicted CLV · margin</text>
    <rect x="210" y="90" width="160" height="52" rx="10" fill="#fef9c3"/><text x="290" y="110" fill="#713f12" font-weight="600">EV QUEUE</text><text x="290" y="126" fill="#a16207">p × margin × take − cost</text>
    <rect x="414" y="90" width="150" height="52" rx="10" fill="#fee2e2"/><text x="489" y="110" fill="#7f1d1d" font-weight="600">PLAYBOOKS</text><text x="489" y="126" fill="#991b1b">reason-matched offers</text>
    <rect x="608" y="90" width="96" height="52" rx="10" fill="#ede9fe"/><text x="656" y="110" fill="#4c1d95" font-weight="600">HOLDOUT</text><text x="656" y="126" fill="#5b21b6">true lift</text>
    <line x1="166" y1="66" x2="208" y2="95" stroke="#475569" stroke-width="1.4" marker-end="url(#pa)"/>
    <line x1="166" y1="166" x2="208" y2="137" stroke="#475569" stroke-width="1.4" marker-end="url(#pa)"/>
    <line x1="370" y1="116" x2="412" y2="116" stroke="#475569" stroke-width="1.4" marker-end="url(#pa)"/>
    <line x1="564" y1="116" x2="606" y2="116" stroke="#475569" stroke-width="1.4" marker-end="url(#pa)"/>
    <path d="M656,142 C656,215 290,215 290,144" fill="none" stroke="#475569" stroke-width="1.3" marker-end="url(#pa)"/>
    <text x="470" y="205" fill="#475569">measured saves update CLV + the model (the loop)</text>
    <text x="360" y="30" fill="#334155" font-weight="600">retention is a queue problem: rank by EV, ration by budget, prove by holdout</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'CLV (sum form)', expr: 'CLV = Σₜ m·rᵗ/(1+d)ᵗ', meaning: 'Discounted expected margin stream' },
      { name: 'CLV (constant r)', expr: 'CLV = m·r/(1 + d − r)', meaning: 'The exam closed form' },
      { name: 'Campaign EV', expr: 'EV = p_churn × margin × take_rate − offer_cost', meaning: 'Targeting threshold' },
      { name: 'Retention lift (holdout)', expr: 'lift = save_rate(treated) − save_rate(control)', meaning: 'The only honest retention number' },
      { name: 'P(alive) heuristic', expr: 'f(recency, frequency): recent + frequent → alive', meaning: 'Non-contractual "churn"' },
    ],
    examples: [
      {
        title: 'CLV arithmetic and the retention lever',
        given: ['Subscription: margin ₹2,000/yr; retention 80%; d = 10%; CAC ₹4,000'],
        steps: [
          { text: 'Base CLV', calc: '2000×0.8/(1.10−0.80) = ₹5,333 → CLV:CAC = 1.33 (below the ≥3 rule: weak economics!)' },
          { text: 'Retention lever', calc: 'r → 85% (loyalty/CX programme): 2000×0.85/0.25 = ₹6,800 → ratio 1.70 (+28%)' },
          { text: 'Margin lever', calc: 'm +20% (mix/upsell): 2400×0.8/0.3 = ₹6,400 → +20% (linear, as expected)' },
          { text: 'Combine', calc: 'r 85% + m +20%: 2400×0.85/0.25 = ₹8,160 → ratio 2.04 — retention is the super-linear driver' },
        ],
        answer: '₹5,333 base; every retention point compounds while margin moves linearly — and CAC discipline completes the triangle.',
      },
      {
        title: 'Non-contractual: who is "churned" in retail?',
        given: ['Two customers: A — 9 orders, last order 2 weeks ago, median gap 5 weeks; B — 9 orders, last order 7 months ago'],
        steps: [
          { text: 'A', calc: 'Recency 2w < median gap 5w and frequency high → P(alive) ≈ 0.95: active, growing value — serve, don\'t discount' },
          { text: 'B', calc: '7 months ≈ 6× the median gap → P(alive) ≈ 0.15: treat as lapsing — win-back economics ONLY if predicted residual CLV justifies (EV formula)' },
          { text: 'Act on the file', calc: 'Score all 180k customers: 62k alive-high-value (growth plays), 41k alive-low (nurture), 28k lapsing-worth-winning (win-back EV), 49k effectively dead (suppress — save the send cost)' },
          { text: 'Instrument', calc: 'Track migration monthly: alive→lapsing flow is the early-warning metric (BA02\'s leading-indicator logic)' },
        ],
        answer: 'Retail "churn" = P(alive) from recency×frequency — and suppression of the dead is the highest-ROI analytics decision available.',
      },
    ],
    caseStudy: {
      title: 'Case — The loyalty programme that paid its best customers to stay',
      body: [
        'An airline-style points programme at a grocery chain costs ₹40Cr/yr. Member-vs-non-member analysis shows members spend 2.3x — the board celebrates. A matched-control study (members vs look-alike non-members on pre-enrolment behaviour) finds members would have out-spent anyway by 2.1x: the programme\'s TRUE incremental lift is ~9%, costing 3.1% of member margin. Worse, earn-events on staples subsidise the highest-P(alive) customers — paying for behaviour that would happen anyway.',
        'Redesign: earn concentrated on category shifts and second-store visits (measurable incremental behaviours), tier benefits aimed at the lapsing-high-value cell (P(alive) 0.4–0.7), and a permanent 5% holdout panel for every future claim.',
      ],
      questions: [
        'Which bias produced the 2.3x claim?',
        'Why were earn-events on staples value-destroying?',
        'What makes the 5% holdout panel the programme\'s most valuable asset?',
      ],
      takeaways: [
        'Selection bias: members self-selected from already-heavy buyers — only matched controls (or pre-post with comparison series) identify INCREMENTAL effect; the 2.3x was selection, not causation',
        'Staples earn = subsidising certain behaviour (high base-rate purchases) — incentives must target MARGINAL behaviours (category expansion, frequency, reactivation) where the counterfactual differs from the action',
        'The holdout panel prices every future question (tier changes, earn changes, pricing) with experimental evidence — a standing measurement asset beats one-off analyses; BA02 Unit 1\'s FVA logic applied to programme features',
        'Exam line: loyalty analytics = identification + incentives + INCREMENTALITY measurement; member-vs-non-member raw gaps are propaganda',
      ],
    },
    revision: [
      'Propensity ranks P(buy); churn ranks P(leave); deploy via EV',
      'Contract churn: observed event, survival/hazard for timing',
      'Non-contractual: BG/NBD P(alive) = f(recency, frequency)',
      'Time-based validation splits; calibrate; monitor drift',
      'CLV = Σ m·rᵗ/(1+d)ᵗ = m·r/(1+d−r) for constant r',
      'Sensitivity: retention super-linear; margin linear; d from WACC',
      'CLV:CAC ≥ 3, payback < 12 months (unit economics gate)',
      'Historical CLV reports the past; predicted CLV drives spend',
      'Loyalty = identification + data + treatment; points = liability',
      'Member-vs-member bias: matched controls or holdouts only',
      'Loyalty metrics: repeat rate, share-of-wallet, redemption, ROI',
      'Retention: EV queue → reason-matched playbook → holdout lift',
      'Many churn drivers are CX defects — fix product, not just offers',
    ],
    practice: [
      { q: 'r = 90%, d = 8%, m = ₹5,000. CLV and the r-sensitivity?', a: 'CLV = 5000×0.9/(1.08−0.90) = 4500/0.18 = ₹25,000. r → 92%: 4600/0.16 = ₹28,750 (+15% from two points); r → 88%: 4400/0.20 = ₹22,000 (−12%) — near-1 retention is explosive both ways.' },
      { q: 'Retention campaign "saved" 1,200 of 3,000 targeted. Control group save rate was 31%. True impact?', a: 'Treated save rate 40% → incremental lift = 9 points ≈ 270 genuine saves; 930 "saves" were deadweight (would have stayed) — cost per TRUE save = programme cost/270, often 3-4x the naive number; this is why holdouts are non-negotiable.' },
      { q: 'Your churn model AUC is 0.85 but the retention programme loses money. Diagnose.', a: 'AUC ≠ economics: check (1) calibration (EV thresholds wrong), (2) the value side — saving low-margin churners, (3) take-rate assumptions, (4) offer cost vs margin saved, (5) deadweight (no holdout). Fix the EV queue, not necessarily the model.' },
      { q: 'Margin Rs 3,000/yr, retention 75 percent, discount rate 12 percent. CLV, and the effect of retention at 85 percent?', a: 'CLV = 3000(0.75)/(1.12-0.75) = Rs 6,081. At 85 percent: 3000(0.85)/0.27 = Rs 9,444 - ten retention points add 55 percent to lifetime value: the loyalty economics in one line.' },
      { q: 'Retention campaign saved 1,000 of 3,000 targeted; control-group save rate 28 percent. What did the campaign really save?', a: 'Treated 33 percent vs control 28 percent = 5 points incremental = ~150 genuine saves; 850 were deadweight stays. Cost per TRUE save = programme cost / 150 - usually several times the naive figure.' },
    ],
  },
  {
    slug: 'digital-marketing-analytics',
    number: 4,
    title: 'Digital Marketing Analytics: Web, SEO, Social, Email & Platforms',
    minutes: 45,
    summary:
      'The digital measurement stack: web analytics and behaviour tracking (GA4 events, sessions, funnels), SEO analysis (queries, rankings, technical and content audits), social and sentiment analytics, email analytics, the ad platforms (Google/Meta, YouTube/X), and reporting that turns metrics into insights.',
    status: 'live',
    objectives: [
      'Instrument and read web analytics: events, sessions, funnels, cohorts',
      'Audit SEO: technical, content, authority; measure rank and CTR',
      'Mine social: listening, sentiment, share-of-voice, creator analytics',
      'Run email and platform analytics; build reports that decide',
    ],
    sections: [
      {
        heading: '1. Web analytics and SEO',
        body: [
          '**Web analytics & behaviour tracking**: the measurement model — events (page_view, click, add_to_cart, purchase with value), sessions (grouping window ~30 min), users vs sessions vs events (deduplication by ID), parameters (GA4 event properties); implementation discipline — tag management, a tracked DATA PLAN (every event named, documented, QA\'d — the silent-failure problem: 20–40% of tags misfire; BA04\'s bot filtering applies: bots are half of traffic), consent mode (post-DPDP/GDPR: consent-gated measurement, modelled conversions). Core analyses: **funnels** (step conversions, drop-off localisation — BA04 Unit 5), **cohorts** (acquisition-date retention/LTV curves — do Google-traffic customers retain?), **segmented trends** (channel × device × landing page), UTM discipline (source/medium/campaign tags — else attribution is noise), site search mining (what visitors WANT and can\'t find), heatmaps/session replays (qualitative layer, sampled).',
          '**SEO analysis**: the funnel is impressions → ranking → CTR → traffic → conversion; measure in Search Console (queries, positions, CTR, impressions) — analytics: keyword opportunity (volume vs difficulty vs intent match — informational/navigational/transactional), position-vs-CTR curves (rank 1 ≈ 25–30% CTR, rank 5 ≈ 6%, page 2 ≈ invisible — the value of #1), content gap analysis (competitor queries you don\'t rank for), technical audit (crawlability, indexation, Core Web Vitals/speed, mobile, structured data/schema, canonical hygiene), on-page analysis (title/H1/intent alignment, internal-link architecture — PageRank flow, BA04 structure mining), authority (backlink count/quality — the off-page layer), and SERP features (featured snippets, local pack — rank ≠ visibility). The SEO analytics loop: rank tracking → CTR and click-yield by query → content/technical fixes → measure movement — SEO compounds like an asset (unlike paid, traffic survives spend pauses).',
        ],
        callout: {
          type: 'exam',
          text: 'The attribution models — memorise with one-line bias each: LAST-click (default, credits closing channel — over-rewards brand search/remarking), FIRST-click (credits discovery — over-rewards social/content), LINEAR (everything equally — dilutes), TIME-DECAY (recency-weighted), POSITION-based (first+last 40/40), DATA-DRIVEN (algorithmic, needs volume — the gold standard where available). The exam question: "which channel does last-click undervalue?" → upper-funnel (display, social discovery, content) — because users click brand search LAST.',
        },
      },
      {
        heading: '2. Social, email, platforms, reporting',
        body: [
          '**Social & sentiment analytics**: owned metrics (reach, impressions, engagement rate = engagements/reach, video retention curves, follower quality), PAID social (CPM, CTR, hook rate 3s, hold rate, CPA, ROAS by creative — creative IS the targeting in the post-cookie era), **listening** (brand mentions, share-of-voice vs competitors, sentiment by aspect — the BA03 text-mining stack: lexicons → transformers; sarcasm and code-mixing keep accuracy honest ~75-85%), trend detection (rising topics, crisis early-warning — mention velocity), influencer/creator analytics (audience authenticity — fake-follower audits, engagement vs follower anomaly, brand-safety screening, attributed conversions via UTM/codes). Platform specifics: Instagram/Facebook (Reels retention, saves as intent signal), YouTube (CTR×retention matrix — thumbnail vs content problem diagnosis; watch-time analytics), X/Twitter (amplification rate, reply sentiment).',
          '**Email analytics**: deliverability FIRST (bounce, spam complaints < 0.1%, list hygiene — BA04 dedup), open rate (post-Apple-MPP inflated — treat as directional), **click rate → conversion** (the honest funnel), list growth and churn (unsubscribes, complaints), A/B discipline (subject lines, send time, one variable), lifecycle performance (welcome series vs nurture vs win-back — automated flows carry the revenue), segmentation effects (RFM-targeted sends vs blast — the Unit 2/3 payoff). **Reporting & insights**: the metric tree (North-star: revenue/profit → drivers: traffic, conversion, AOV, retention → operational: CTR, uptime, deliverability) — every reported number owns a DECISION; cadence (weekly ops dashboard, monthly business review, quarterly strategy); the insight format — "so what": metric → comparison (vs target/benchmark/period) → cause (segmented) → recommendation (owner + action); vanity-metric purge (impressions, raw pageviews, follower counts without outcomes); self-serve dashboards (BA01) with certified metrics (the Unit 1 single-source discipline).',
        ],
        bullets: [
          'GA4: events + parameters; sessions window; consent-gated measurement',
          'Tag QA + data plan; bot filtering; UTM discipline',
          'Funnels, acquisition cohorts, segmented trends, site-search mining',
          'SEO funnel: impressions → rank → CTR → traffic → conversion',
          'Position-CTR curve: #1 ≈ 25-30%, page 2 ≈ invisible',
          'Audits: technical (CWV, crawl), content (gaps, intent), authority (links)',
          'SEO compounds (asset); paid stops when spend stops',
          'Attribution: last/first/linear/time-decay/position/data-driven + biases',
          'Social: engagement rate, retention curves, sentiment-by-aspect, SOV',
          'Creator analytics: authenticity audit, CTR×retention matrix (YouTube)',
          'Email: deliverability, click→conversion, lifecycle flows, A/B one variable',
          'Reports: metric tree, insight = metric + comparison + cause + action',
        ],
      },
    ],
    diagram: {
      title: 'The digital measurement stack',
      caption: 'One behaviour stream, five measurement lenses (web, search, social, email, ads) reconciled by attribution into a metric tree that reports decisions.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Digital measurement stack">
  <defs><marker id="da" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="11" text-anchor="middle">
    <rect x="250" y="16" width="220" height="40" rx="10" fill="#e0f2fe"/><text x="360" y="40" fill="#0c4a6e" font-weight="600">BEHAVIOUR STREAM (consented events)</text>
    <rect x="16" y="90" width="126" height="46" rx="9" fill="#dcfce7"/><text x="79" y="108" fill="#14532d" font-weight="600">WEB</text><text x="79" y="124" fill="#166534">funnels · cohorts</text>
    <rect x="158" y="90" width="126" height="46" rx="9" fill="#fef9c3"/><text x="221" y="108" fill="#713f12" font-weight="600">SEO</text><text x="221" y="124" fill="#a16207">rank · CTR · gaps</text>
    <rect x="300" y="90" width="126" height="46" rx="9" fill="#ffedd5"/><text x="363" y="108" fill="#7c2d12" font-weight="600">SOCIAL</text><text x="363" y="124" fill="#9a3412">SOV · sentiment</text>
    <rect x="442" y="90" width="126" height="46" rx="9" fill="#fee2e2"/><text x="505" y="108" fill="#7f1d1d" font-weight="600">EMAIL</text><text x="505" y="124" fill="#991b1b">flows · deliverability</text>
    <rect x="584" y="90" width="120" height="46" rx="9" fill="#ede9fe"/><text x="644" y="108" fill="#4c1d95" font-weight="600">ADS</text><text x="644" y="124" fill="#5b21b6">ROAS · creative</text>
    <rect x="230" y="170" width="260" height="46" rx="10" fill="#f8fafc"/><text x="360" y="188" fill="#334155" font-weight="600">ATTRIBUTION + METRIC TREE</text><text x="360" y="204" fill="#475569">revenue → drivers → operational</text>
    <line x1="300" y1="56" x2="79" y2="88" stroke="#475569" stroke-width="1.2" marker-end="url(#da)"/>
    <line x1="320" y1="56" x2="225" y2="88" stroke="#475569" stroke-width="1.2" marker-end="url(#da)"/>
    <line x1="360" y1="56" x2="363" y2="88" stroke="#475569" stroke-width="1.2" marker-end="url(#da)"/>
    <line x1="400" y1="56" x2="505" y2="88" stroke="#475569" stroke-width="1.2" marker-end="url(#da)"/>
    <line x1="420" y1="56" x2="640" y2="88" stroke="#475569" stroke-width="1.2" marker-end="url(#da)"/>
    <line x1="79" y1="136" x2="240" y2="180" stroke="#475569" stroke-width="1.1"/>
    <line x1="221" y1="136" x2="280" y2="178" stroke="#475569" stroke-width="1.1"/>
    <line x1="363" y1="136" x2="360" y2="168" stroke="#475569" stroke-width="1.1"/>
    <line x1="505" y1="136" x2="440" y2="178" stroke="#475569" stroke-width="1.1"/>
    <line x1="644" y1="136" x2="480" y2="180" stroke="#475569" stroke-width="1.1"/>
    <text x="360" y="238" fill="#475569">every number in the tree owns a decision — vanity metrics need not apply</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Engagement rate', expr: 'engagements / reach (per post, per period)', meaning: 'Owned-social quality' },
      { name: 'CTR by position', expr: '#1 ≈ 25–30% · #5 ≈ 6% · page 2 ≈ 0', meaning: 'Rank → click yield' },
      { name: 'ROAS', expr: 'conversion value / ad spend (by campaign/creative)', meaning: 'Paid efficiency at the right grain' },
      { name: 'Email funnel', expr: 'delivered → open (directional) → click → convert', meaning: 'Where email leaks' },
      { name: 'Attribution credit', expr: 'Σ model(channel) = 1 per conversion', meaning: 'Models reallocate, never create' },
    ],
    examples: [
      {
        title: 'Attribution model changes the channel story',
        given: ['100 conversions; touchpaths: display-click → social-ad → brand-search-click → convert (60 such), social-ad → convert direct (40)'],
        steps: [
          { text: 'Last-click', calc: 'brand search 60, social 40, display 0 — "kill display, it converts nothing"' },
          { text: 'First-click', calc: 'display 60, social 40, brand search 0 — "brand search is worthless"' },
          { text: 'Linear', calc: '3-touch paths: display 20, social 20+13.3=33.3, brand 20 — every channel "fine"' },
          { text: 'Truth-seeking', calc: 'Run geo-holdout experiments on display (BA02 logic): display-off regions −18% conversions → display DOES assist; model it incrementality, not just credit' },
        ],
        answer: 'Same data, three stories — models allocate credit; only experiments reveal causation.',
      },
      {
        title: 'SEO: from rank to revenue',
        given: ['Query "best budget laptop": position 4.2, 22k impressions/mo, CTR 6%, position-1 CTR 28%; page converts 3% on 18k avg order'],
        steps: [
          { text: 'Current', calc: '22,000 × 6% = 1,320 clicks → 40 orders ≈ ₹7.1L/mo revenue' },
          { text: 'Position 1 upside', calc: '22,000 × 28% = 6,160 clicks → 185 orders ≈ ₹33.3L/mo — 4.7x on ONE query' },
          { text: 'Effort triage', calc: 'Content refresh + schema + internal links from 3 authority pages; difficulty mid (DR gap small) → weeks, not months' },
          { text: 'Portfolio view', calc: 'Repeat across top-50 queries: rank 5-15 cluster is the ROI band (page-2 invisible → page-1 paid-off); track CTR vs expected-by-position to find title/snippet wins without rank moves' },
        ],
        answer: 'SEO analytics converts "rankings" into ₹: impressions × CTR(position) × conversion — and triages effort to the 5-15 band.',
      },
    ],
    caseStudy: {
      title: 'Case — The dashboard of 40 metrics and no decisions',
      body: [
        'A performance-marketing team sends a weekly report with 40 metrics across 6 channels. In review meetings, nobody can say what to DO differently; the CMO asks "so is marketing working?" and receives 15 minutes of channel narration. Meanwhile a failing creative (fatigued, frequency 9) hides inside average ROAS.',
        'Rebuild: metric tree (North-star: CAC-blended and payback → drivers by channel → operational), exception-based reporting (only movements beyond control limits get narrative — BA02\'s tracking-signal logic), a creative-fatigue panel (frequency × CTR decay curves), and every row with an owner + next action.',
      ],
      questions: [
        'Why did 40 metrics produce zero decisions?',
        'What does exception-based reporting change socially?',
        'Where did the creative-fatigue problem belong in the tree?',
      ],
      takeaways: [
        'Metrics without hierarchy and thresholds are narration — a decision needs comparison (target/benchmark/period) and an owner; 40 flat metrics optimise for effort, not insight',
        'Exception reporting inverts attention: signals, not status — meetings start with "what moved and what we\'ll do", the dashboard does the monitoring silently (BA01\'s alert design)',
        'Creative fatigue is an OPERATIONAL metric under paid-social drivers (frequency, CTR-decay) — invisible in channel averages; the grain of measurement must match the grain of the DECISION (creative-level ROAS)',
        'Exam line: reporting = metric tree + comparisons + causes + recommendations; attribution uncertainty belongs in footnotes, decisions belong in headlines',
      ],
    },
    revision: [
      'GA4: events/parameters, session window, consent-gated data',
      'Tag QA + data plan; bot filtering; UTMs on every campaign link',
      'Funnels, cohorts, segmented trends, site-search mining',
      'SEO funnel: impressions → position → CTR → conversion',
      'Position-CTR curve; SERP features; page 2 ≈ invisible',
      'Audits: technical/Core Web Vitals, content gaps/intent, backlink authority',
      'Attribution models + biases; last-click undervalues upper funnel',
      'Experiments (geo-holdout) reveal incrementality models can\'t',
      'Social: engagement/reach, retention curves, sentiment by aspect, SOV',
      'YouTube: CTR × retention matrix; creators: authenticity audit',
      'Email: deliverability gate; opens directional (MPP); flows carry revenue',
      'Reporting: metric tree, exceptions, owner + action per row; no vanity metrics',
    ],
    practice: [
      { q: 'Traffic fell 12% week-over-week but conversions held. Where do you look first?', a: 'Segment by channel/landing page/device and check rank/CTR drops (algorithm or lost SERP feature), tag/consent changes (measurement loss ≠ traffic loss — compare server logs/orders), and bot-mix shifts; conversions holding suggests low-value traffic changed, not demand.' },
      { q: 'Meta ROAS 4.1, Google brand-search ROAS 9. Budget shift?', a: 'Not yet — brand search harvests existing intent that Meta CREATED (attribution bias from Unit 4); run incrementality tests (pause/geo-holdout) before shifting: cutting Meta often collapses brand-search volume, and blended CAC/payback is the arbiter, not channel ROAS.' },
      { q: 'Open rate jumped from 22% to 41% after iOS changes. Celebrate?', a: 'No — Apple Mail Privacy Protection auto-fetches images, inflating opens (they are now directional at best); move the email funnel to click-rate → conversion, keep deliverability hygiene (complaints < 0.1%), and judge campaigns on revenue per delivered email.' },
      { q: 'Last-click says brand search ROAS 9, display ROAS 0.4. The CFO wants display cut. Your evidence plan?', a: 'Run a geo-holdout: remove display in matched regions and watch total conversions including brand search. Display likely feeds the search harvest - judge on blended incrementality, not channel ROAS.' },
      { q: 'Email open rate jumped 22 to 41 percent after an iOS update. Report what?', a: 'Apple MPP auto-fetches inflate opens - report click-to-conversion and revenue per delivered email instead, with opens flagged directional. The list did not suddenly fall in love.' },
    ],
  },
  {
    slug: 'marketing-analytics-challenges-trends',
    number: 5,
    title: 'Challenges & Trends: Cloud, ROI Measurement, Credibility & the Future',
    minutes: 40,
    summary:
      'The frontier and the friction: marketing on cloud computing infrastructure (CDPs, martech, activation), the impact of analytics on marketing practice, the credibility crisis (bad data, bad inferences, vanity metrics), ROI measurement challenges (attribution, incrementality, MMM renaissance), and the future — AI, privacy-first analytics, first-party strategy.',
    status: 'live',
    objectives: [
      'Explain the cloud/martech stack and what it unlocks (and costs)',
      'Diagnose the credibility crisis and its cures',
      'Frame ROI measurement honestly: attribution vs incrementality vs MMM',
      'Sketch the future: generative AI, privacy-first, automated analytics',
    ],
    sections: [
      {
        heading: '1. Cloud, martech, and impact',
        body: [
          '**Marketing & cloud computing**: the martech stack lives in the cloud — collection (tag managers, SDKs, CDP for identity), storage/compute (data warehouses/lakehouses — BA04 Unit 4), analysis (BI, notebooks, ML platforms), activation (ad platforms, email/push, personalisation engines), orchestration (journey tools, next-best-action) — integration by API, elastic compute for burst workloads (festival-season scoring), and the buy-vs-build economics (SaaS seats vs data-team builds; total cost = licences + integration + people). What the cloud unlocked: real-time personalisation (score → decide → serve in milliseconds), unified identity at scale, experimentation at industrial volume — and what it COSTS: data gravity and lock-in, integration debt (the stack only works if IDs join), privacy concentration risk, and skill inflation (every marketer half-analyst now).',
          '**The impact of analytics on marketing practice** (the before/after): budgeting by rank (last year +10%) → allocation by marginal ROI; creative by gut → creative tested at volume (the A/B culture, Unit 4); mass segments → person-level propensities and next-best-action (Units 2-3); annual plans → continuous experimentation loops; brand vs performance silos → measurement spanning both (brand tracked as an asset: lift studies, search-branded demand). The organisational consequence: the analytics translator role (business questions ↔ data science), decision rights shifting to whoever owns the experiment platform, and the democratisation tension (self-serve BI — BA01 — spreads capability AND error surface).',
        ],
        callout: {
          type: 'exam',
          text: 'MMM vs MTA vs experiments — the ROI-measurement triangle (memorise trade-offs): **MTA** (multi-touch attribution) = user-level, digital-only, cookie-dependent, model-biased — dying with privacy; **MMM** (marketing mix modelling) = aggregate econometrics (regression of sales on channel spend + controls), privacy-proof, measures ALL marketing incl. offline, but coarse (needs years of weekly data, weak for small channels) — enjoying a RENAISSANCE because of privacy; **experiments** (geo-holdouts, dark-market tests, platform lift studies) = the causal gold standard, expensive and not always feasible. Exam answer: triangulate — MMM for allocation, experiments for validation, attribution for tactical user journeys.',
        },
      },
      {
        heading: '2. Credibility, ROI, and what comes next',
        body: [
          '**The credibility crisis** — why boards distrust marketing numbers: (1) bad data (tracking loss 20-40%, consent gaps, identity fragmentation — the denominator is uncertain); (2) bad inference (correlation as causation, no holdouts, survivorship in reports); (3) vanity metrics (impressions, engagements unlinked to money); (4) attribution theatre (channel ROAS that double-counts the same conversion); (5) reproducibility failure (analyst leaves, number changes). The cures map one-to-one: certified metrics + data plan (BA01 Unit 2), experiment-by-default with holdouts (BA02), metric trees with money at the top (Unit 4), incrementality as the tie-breaker, versioned analyses (BA03 reproducibility), and the humility of ranges ("CAC ₹310 ± 40") over false precision. **ROI measurement challenges**: the attribution/incrementality gap (models allocate, experiments identify — Unit 4); long-run effects (brand investment pays over quarters-years — lifetime-based measurement, lagged models); interaction/synergy (channels multiply, not add — MMM interaction terms); organic baseline (what would sell with zero marketing — the counterfactual problem at the heart of ROI); frequency and saturation curves (diminishing returns per channel — the S-curve response, budget at the flat part); privacy erosion of measurement itself (consent gaps bias samples — modelled conversions with stated uncertainty).',
          '**The future of marketing analytics**: generative AI across the stack (creative volume × personalisation — synthetic variants tested by bandits; copy and image generation collapsing production cost; analytics copilots writing queries — but bias/hallucination governance, BA01 Unit 5 ethics); **privacy-first analytics** (first-party data moats, clean rooms — matched-key collaboration without data sharing, on-device/modelled measurement, contextual targeting renaissance); automated/autonomous marketing (bandits replacing static A/B, real-time budget reallocation — with governance guardrails); causal AI (uplift modelling at scale — treat only the persuadables, Unit 3\'s EV logic per individual); sustainability/attention metrics (attention-over-impressions measurement, carbon of digital media); and the perennial skill demand: translators who speak both strategy and statistics — the exact profile this whole PGDM analytics minor is building. The one-sentence exam conclusion: the future belongs to teams that can MEASURE HONESTLY (incrementality, uncertainty) and ACT QUICKLY (automation, experiments) on consented first-party data.',
        ],
        bullets: [
          'Cloud martech: collect (CDP) → warehouse → analyse → activate → orchestrate',
          'Unlocked: real-time personalisation, identity at scale, industrial experiments',
          'Costs: integration debt, lock-in, privacy concentration, skill inflation',
          'Impact: marginal-ROI budgets, tested creative, person-level NBA, loops',
          'Credibility failures: bad data, no holdouts, vanity, attribution theatre',
          'Cures: certified metrics, experiments, money-top metric trees, ranges',
          'MMM: aggregate, privacy-proof, all channels, coarse — renaissance',
          'MTA: user-level, digital-only, dying with cookies',
          'Experiments: causal gold standard, costly — triangulate all three',
          'ROI challenges: baseline counterfactual, lagged brand effects, saturation',
          'Future: genAI creative + copilots, clean rooms, bandits, uplift/causal AI',
          'The winning profile: honest measurement + fast action on owned data',
        ],
      },
    ],
    diagram: {
      title: 'The ROI measurement triangle and the privacy shift',
      caption: 'Three imperfect instruments — MMM, attribution, experiments — triangulate true ROI; privacy regulation pushed measurement from user-level back to aggregate + experimental.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ROI measurement triangle">
  <g font-family="inherit" font-size="11" text-anchor="middle">
    <path d="M360,40 L520,190 L200,190 Z" fill="none" stroke="#475569" stroke-width="1.6"/>
    <rect x="300" y="16" width="120" height="44" rx="10" fill="#fef9c3"/><text x="360" y="34" fill="#713f12" font-weight="600">EXPERIMENTS</text><text x="360" y="50" fill="#a16207">causal gold · costly</text>
    <rect x="470" y="186" width="180" height="46" rx="10" fill="#dcfce7"/><text x="560" y="204" fill="#14532d" font-weight="600">MTA (user-level)</text><text x="560" y="220" fill="#166534">digital-only · cookie-dependent</text>
    <rect x="70" y="186" width="180" height="46" rx="10" fill="#e0f2fe"/><text x="160" y="204" fill="#0c4a6e" font-weight="600">MMM (aggregate)</text><text x="160" y="220" fill="#075985">privacy-proof · all channels</text>
    <text x="360" y="130" fill="#334155" font-weight="600">TRIANGULATE</text>
    <text x="360" y="148" fill="#475569">allocation · journeys · validation</text>
    <rect x="16" y="60" width="150" height="80" rx="10" fill="#ede9fe"/>
    <text x="91" y="82" fill="#4c1d95" font-weight="600">PRIVACY SHIFT</text>
    <text x="91" y="100" fill="#5b21b6">3rd-party → 1st-party</text>
    <text x="91" y="116" fill="#5b21b6">clean rooms</text>
    <text x="91" y="132" fill="#5b21b6">modelled measurement</text>
    <line x1="170" y1="100" x2="240" y2="150" stroke="#7c3aed" stroke-width="1.2" stroke-dasharray="4 3"/>
    <text x="590" y="60" fill="#475569">saturation S-curve: spend at the knee,</text>
    <text x="590" y="76" fill="#475569">not the flat top — marginal ROI decides</text>
    <text x="360" y="238" fill="#475569">the counterfactual ("what without marketing?") is the question every method answers differently</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Marketing ROI', expr: 'ROI = (incremental margin − marketing cost)/marketing cost', meaning: 'The board number — INCREMENTAL is the load-bearing word' },
      { name: 'Marginal ROI', expr: 'mROI = Δ(incremental margin)/Δ(spend) at the margin', meaning: 'Allocation decisions live here' },
      { name: 'Adstock (MMM)', expr: 'Aₜ = spendₜ + λ·Aₜ₋₁ (carryover)', meaning: 'MMM\'s memory term' },
      { name: 'Saturation', expr: 'response = 1 − e^(−β·spend) (S-curve)', meaning: 'Diminishing returns per channel' },
      { name: 'Uplift (persuadables)', expr: 'upliftᵢ = P(y|treat) − P(y|control), modelled per person', meaning: 'Causal AI targeting' },
    ],
    examples: [
      {
        title: 'Triangulate a ₹12Cr budget decision',
        given: ['MMM says TV 0.4x marginal ROI, paid social 1.8x; platform attribution says social ROAS 4.1; a geo-holdout on social shows +₹1.9Cr on ₹3Cr spend (0.63x incremental)',
        ],
        steps: [
          { text: 'Reconcile', calc: 'Attribution 4.1x OVERSTATES (views-through, cookie credit); holdout 0.63x is the causal estimate; MMM 1.8x is average not marginal — all three true at their grain' },
          { text: 'Allocate', calc: 'Shift ₹1Cr TV → social IF marginal (not average) social ROI > 1 at the new spend level — check the saturation curve\'s knee first' },
          { text: 'Validate', calc: 'Re-run geo-holdout at the new level after 8 weeks — the allocation is a hypothesis (BA02 discipline)' },
          { text: 'Report', calc: 'Incremental revenue ₹1.9Cr ± 0.4 on ₹3Cr — ranges beat false precision; the ± comes from the experiment design' },
        ],
        answer: 'Three instruments, one decision: models allocate, experiments validate, uncertainty is reported — that is credible ROI.',
      },
      {
        title: 'Marginal vs average: the saturation trap',
        given: ['Channel response curve fitted: response = 100(1 − e^(−0.0015·spend)) in ₹L; current monthly spend ₹2,000 (₹ thousands of spend? — read as units)'],
        steps: [
          { text: 'Average ROI now', calc: 'Response at 2000 = 100(1−e^(−3)) ≈ 95 → average 95/2000 ≈ 0.047 per unit — looks healthy' },
          { text: 'Marginal ROI', calc: 'd/ds = 100(0.0015)e^(−0.0015s); at s = 2000: 0.15 × 0.0498 ≈ 0.0075 — marginal return is ~6x below average: deep in diminishing returns' },
          { text: 'Find the knee', calc: 'Second derivative maxim around s ≈ 667 units (1/β·ln… region): past it, each rupee buys less response than the last' },
          { text: 'Decide', calc: 'Reallocate until MARGINAL ROI equalises across channels (Baumol-style equilibrium) — not until averages look good; that is the optimisation MMM feeds' },
        ],
        answer: 'Average ROI flatters saturated channels — allocate on the derivative, not the ratio.',
      },
    ],
    caseStudy: {
      title: 'Case — The CMO who reported uncertainty (and kept the budget)',
      body: [
        'Confronted with a 15% budget review, a CMO replaces the usual ROAS deck with: an experiment-backed incremental view (two geo-holdouts, one platform lift study), MMM with credible intervals, and a stated measurement gap ("37% of journeys are consent-dark; modelled ±"). Finance stress-tests the numbers for a week — they hold. Marketing keeps its budget with strings: a standing holdout panel and quarterly incrementality readouts.',
        'A year later, marketing is the only function reporting causal numbers in the board pack — its credibility compounds while competitors\' attribution decks attract cut-after-cut cycles.',
      ],
      questions: [
        'Why did admitting uncertainty INCREASE credibility?',
        'What institutional asset did the "strings" create?',
        'What does this imply for the analyst\'s job description?',
      ],
      takeaways: [
        'Honest ranges from designed experiments beat precise-looking attribution theatre — credibility comes from method transparency and numbers that survive stress-testing (the front-page test applied to metrics)',
        'The standing holdout panel and quarterly readouts convert measurement from an argument into an institution — incremental credibility compounds like brand equity itself',
        'The analyst\'s job: design measurements that answer CAUSAL questions (Unit 4 experiments, MMM triangulation), report uncertainty, and translate to decisions — the translator profile of Unit 5\'s future',
        'Exam line: ROI measurement challenges (baseline counterfactual, attribution bias, lagged effects, saturation, consent gaps) are met with triangulation + experiments + honest intervals — never with a single-source dashboard',
      ],
    },
    revision: [
      'Cloud stack: collect/CDP → warehouse → analyse → activate → orchestrate',
      'Unlocks: real-time personalisation, identity, industrial experiments',
      'Costs: integration debt, lock-in, privacy concentration, skills',
      'Impact: marginal-ROI budgets, tested creative, NBA, continuous loops',
      'Credibility failures: bad data, no causation, vanity, theatre, irreproducibility',
      'Cures: certified metrics, holdouts, money-top trees, ranges, versioned analyses',
      'MMM: aggregate regression + adstock + saturation — privacy-proof renaissance',
      'MTA: user-level, digital-only, biased by model — declining with cookies',
      'Experiments: gold standard; triangulate all three for ROI truth',
      'ROI challenges: counterfactual baseline, lagged brand, synergy, saturation, consent gaps',
      'GenAI: creative volume, copilots — with bias/hallucination governance',
      'Privacy-first: first-party moats, clean rooms, modelled measurement, contextual',
      'Future: bandits/automation, uplift modelling, attention metrics, translators win',
    ],
    practice: [
      { q: 'MMM shows email ROI 6x but the channel gets 2% of budget. Why not 20%?', a: 'Average vs marginal: 6x on tiny spend sits on the steep part of the saturation curve — at 10x spend the marginal response likely falls below other channels; also email\'s reach ceiling (list size) binds. Scale gradually, measure the curve, equalise MARGINAL ROI.' },
      { q: 'Cookies die, MTA collapses. One-sentence replacement strategy?', a: 'First-party data + clean-room collaboration + MMM for allocation + experiments (geo/platform lift) for causation — measure less granularly but more truthfully.' },
      { q: 'GenAI writes your ad variants and your reports. What still needs the analyst?', a: 'Judgment: metric-tree design and vanity-purge (what to measure), experiment design and validity checks (what the AI cannot verify about itself), bias/hallucination governance, causal interpretation, and the decision translation — automation raises the analyst\'s altitude, it doesn\'t remove the seat.' },
      { q: 'MMM says channel X ROI 6x average. Why not immediately triple its budget?', a: 'That 6x is average, not marginal - the saturation curve likely flattens; tripling spend may earn a fraction of it. Move budget stepwise, re-fit response curves, and stop when marginal ROI equals alternatives.' },
      { q: 'What is a data clean room and what problem does it solve?', a: 'A neutral environment where two parties match encrypted first-party data (e.g., brand + platform) without exchanging raw user records - measurement and activation that survive privacy law where cookie-level tracking cannot.' },
    ],
  },
];
