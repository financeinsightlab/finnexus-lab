import type { Subject } from '../types';

/* ═══════════════════════════════════════════════════════════════
   BUSINESS ANALYTICS & DECISION SCIENCE — Sem 3 · BA Minor
   ═══════════════════════════════════════════════════════════════ */

const analyticsStackSvg = `
<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
  <defs>
    <marker id="aarr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 Z" fill="#5eead4"/>
    </marker>
  </defs>

  <!-- pyramid -->
  <polygon points="380,20 470,90 290,90" fill="#134e4a" stroke="#2dd4bf" stroke-width="1.5"/>
  <polygon points="280,100 480,100 530,170 230,170" fill="#0f172a" stroke="#2dd4bf" stroke-width="1.5"/>
  <polygon points="220,180 540,180 590,260 170,260" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="380" y="66" fill="#5eead4" font-size="13" font-weight="700" text-anchor="middle">Prescriptive</text>
  <text x="380" y="140" fill="#5eead4" font-size="13" font-weight="700" text-anchor="middle">Predictive</text>
  <text x="380" y="225" fill="#fbbf24" font-size="13" font-weight="700" text-anchor="middle">Descriptive / Diagnostic</text>
  <text x="380" y="84" fill="#94a3b8" font-size="10" text-anchor="middle">what SHOULD we do?</text>
  <text x="380" y="158" fill="#94a3b8" font-size="10" text-anchor="middle">what WILL happen?</text>
  <text x="380" y="245" fill="#94a3b8" font-size="10" text-anchor="middle">what HAPPENED & why?</text>

  <!-- CRISP-DM side -->
  <g font-size="11">
    <rect x="580" y="40" width="165" height="30" rx="8" fill="#0f172a" stroke="#334155"/>
    <text x="662" y="59" fill="#94a3b8" text-anchor="middle">1 · Business understanding</text>
    <rect x="580" y="80" width="165" height="30" rx="8" fill="#0f172a" stroke="#334155"/>
    <text x="662" y="99" fill="#94a3b8" text-anchor="middle">2 · Data understanding</text>
    <rect x="580" y="120" width="165" height="30" rx="8" fill="#0f172a" stroke="#334155"/>
    <text x="662" y="139" fill="#94a3b8" text-anchor="middle">3 · Data preparation</text>
    <rect x="580" y="160" width="165" height="30" rx="8" fill="#0f172a" stroke="#334155"/>
    <text x="662" y="179" fill="#94a3b8" text-anchor="middle">4 · Modelling</text>
    <rect x="580" y="200" width="165" height="30" rx="8" fill="#0f172a" stroke="#334155"/>
    <text x="662" y="219" fill="#94a3b8" text-anchor="middle">5 · Evaluation</text>
    <rect x="580" y="240" width="165" height="30" rx="8" fill="#0f172a" stroke="#334155"/>
    <text x="662" y="259" fill="#94a3b8" text-anchor="middle">6 · Deployment</text>
    <line x1="578" y1="55" x2="545" y2="70" stroke="#334155" stroke-width="1.2"/>
    <line x1="578" y1="95" x2="490" y2="135" stroke="#334155" stroke-width="1.2"/>
    <line x1="578" y1="175" x2="548" y2="215" stroke="#334155" stroke-width="1.2"/>
    <line x1="578" y1="255" x2="545" y2="240" stroke="#334155" stroke-width="1.2"/>
    <text x="662" y="292" fill="#64748b" font-size="10" text-anchor="middle">CRISP-DM lifecycle — loops, never ends</text>
  </g>

  <!-- base arrow -->
  <rect x="20" y="300" width="720" height="34" rx="10" fill="#134e4a" stroke="#2dd4bf"/>
  <text x="380" y="322" fill="#5eead4" font-size="12" font-weight="600" text-anchor="middle">DATA → INFORMATION → INSIGHT → DECISION → VALUE</text>
  <line x1="380" y1="262" x2="380" y2="298" stroke="#5eead4" stroke-width="2" marker-end="url(#aarr)"/>
</svg>`;

export const businessAnalyticsExcel: Subject = {
  slug: 'business-analytics-using-excel',
  code: 'PGDM BA06',
  name: 'Business Analytics using Excel',
  track: 'ANALYTICS',
  credits: 3,
  hours: 30,
  semester: 3,
  tagline: 'Turn raw data into decisions that move P&L — in Excel.',
  description:
    'The analytics operating system for managers: how managers use business analytics, charts and graphs that analyse and present, descriptive statistics, inferential testing (t, chi-square, ANOVA), and correlation & regression — all hands-on in Excel.',
  outcomes: [
    'Assess how managers use business analytics across functions',
    'Use charts and graphs efficiently to analyse and present data',
    'Apply Excel and its add-ins (Analysis ToolPak, Solver) to business problems',
    'Work through analytical frameworks from Excel basics to advanced modelling',
    'Use statistical inference to make evidence-based judgements of business scenarios',
  ],
  units: [
    'Unit 1 — Introduction to Business Analytics: overview, concepts, terminology, significance; BI vs BA; the analytics & decision-making process; tools',
    'Unit 2 — Graphical Representation of Data: bar diagrams (sub-divided, multiple), pie charts, graphs, scatter diagram, histogram and OGIVE',
    'Unit 3 — Descriptive Statistics: descriptive vs inferential; mean, median, mode, range, standard deviation, skewness, kurtosis',
    'Unit 4 — Inferential Statistics: large vs small sample tests; t-test (single, independent, dependent samples); chi-square; ANOVA',
    'Unit 5 — Correlation & Regression: bivariate and multivariate data; regression lines (Y on X, X on Y); multiple regression',
  ],
  books: [
    { title: 'Statistics for Management', author: 'Levin & Rubin — Pearson' },
    { title: 'Applied Business Statistics', author: 'Ken Black — Wiley' },
    { title: 'Business Statistics', author: 'Naval Bajpai — Pearson' },
  ],
  heroImage: '/images/pgdm/ba-hero.jpg',
  lectures: [
    /* ─────────── LECTURE 1 (FULL) ─────────── */
    {
      slug: 'analytics-foundations-framework',
      number: 1,
      title: 'Analytics Foundations: The Decision Stack & CRISP-DM',
      minutes: 45,
      summary:
        'What analytics actually is (and is not), the four-layer decision stack, the lifecycle that industrialises it, and the KPI tree that ties every model to rupees.',
      status: 'live',
      objectives: [
        'Define analytics by the decision it changes, not the tool it uses',
        'Place any business question correctly on the descriptive→prescriptive stack',
        'Map a project onto CRISP-DM and identify its likely failure point',
        'Build a KPI tree linking a model metric to a financial outcome',
      ],
      sections: [
        {
          heading: '1. Analytics is a decision science, not a tool skill',
          body: [
            'A dashboard nobody changes a decision from is art, not analytics. The working definition for this course: analytics is the disciplined use of data, statistics and models to change decisions and measurably improve outcomes. The unit of account is not the model accuracy — it is the decision improved. A churn model with 75% accuracy that retention offers act on beats a 95% model nobody deploys.',
            'This is why analytics interviews (and this subject\'s exams) start with framing: "What decision will this analysis change? Who makes it? What happens today without it? What is the value of changing it?" If those questions have no answers, the project is a hobby.',
          ],
          callout: {
            type: 'exam',
            text: 'Exam pattern: given a scenario ("marketing wants to know why Northern-zone sales fell"), identify (a) the stack layer, (b) the decision it serves, (c) the data required, (d) the metric of success. Practise this four-part structure until automatic.',
          },
        },
        {
          heading: '2. The four-layer stack',
          body: [
            'Descriptive analytics answers WHAT HAPPENED — revenue dashboards, cohort tables, averages. Diagnostic answers WHY — drill-downs, driver trees, correlation, root-cause analysis. Predictive answers WHAT WILL HAPPEN — regression, classification, forecasting; the layer where machine learning lives. Prescriptive answers WHAT SHOULD WE DO — optimisation, simulation, recommendation engines, A/B-tested policies that close the loop automatically.',
            'Value and difficulty both rise up the stack, but so does organisational maturity required. Most Indian mid-market companies today are climbing from descriptive to predictive; the differentiating skill is knowing which layer a problem actually needs. Not every problem needs AI — some need a pivot table and a hard conversation.',
          ],
          bullets: [
            'Descriptive → reports & dashboards (BI teams own this)',
            'Diagnostic → driver trees, funnel analysis, root-cause (analysts)',
            'Predictive → churn, default, demand, price models (data scientists)',
            'Prescriptive → pricing engines, routing, inventory optimisation, offers (decision scientists + engineers)',
          ],
        },
        {
          heading: '3. CRISP-DM — the industrial lifecycle',
          body: [
            'Cross-Industry Standard Process for Data Mining: six phases — business understanding, data understanding, preparation, modelling, evaluation, deployment. The dirty secret: preparation is 60–80% of every real project (joining messy sources, fixing schemas, handling missing values), and BUSINESS understanding is where most failures are born. A perfectly executed model of the wrong question is exactly worth zero.',
            'Note the arrows people forget: evaluation loops back to business understanding (does the model actually move the decision metric?), and deployment is a beginning — models decay as the world drifts (a pre-pandemic demand model is a museum piece). Monitoring and retraining are part of the lifecycle, not an afterthought.',
          ],
          callout: {
            type: 'note',
            text: 'Model decay (concept drift): customer behaviour, competition and macro shift under your feet. Every deployed model needs a freshness metric and an owner — the analytics equivalent of a balance-sheet check row from your finance lectures.',
          },
        },
        {
          heading: '4. KPI trees — from model to money',
          body: [
            'A KPI tree decomposes a financial outcome into levers a model can move. Example: Profit = Traffic × Conversion × AOV × Margin − Costs. A recommendation engine moves Conversion; a pricing model moves AOV and Margin together; a demand forecast moves inventory Costs. Writing the tree forces the value question: if conversion rises from 2.1% to 2.3% on ₹80 cr GMV, what is that worth per year? That number is the project\'s budget ceiling.',
            'Good KPIs are RUMBA — Reasonable, Understandable, Measurable, Behavioural (they improve when the team acts), and Agreed. Vanity metrics (total registered users) fail RUMBA; decision metrics (active paying users, contribution margin per order) pass.',
          ],
        },
        {
          heading: '5. Data reality — types, quality, and the analyst\'s oath',
          body: [
            'Structured vs unstructured; internal vs external; transactional (what happened) vs behavioural (how users acted) vs attitudinal (what they say — surveys). Every variable has a measurement scale — nominal, ordinal, interval, ratio — and the scale dictates legal arithmetic: means on ordinal data are a crime committed daily in corporate dashboards.',
            'Data quality dimensions to check before ANY modelling: completeness (missingness pattern — random or informative?), validity, consistency across systems, timeliness, uniqueness (duplicate customers destroy joins). The analyst\'s oath: you may not model data you have not profiled. Profiling = distributions, nulls, outliers, cardinality, and cross-source reconciliation — the analytics sibling of "the balance sheet must balance".',
          ],
          callout: {
            type: 'excel',
            text: 'Practical profiling kit: COUNT/COUNT DISTINCT per column, % nulls, MIN/MAX/quantiles, top-10 value frequencies, and a join-key duplicate check across every table you touch. Automate it once, reuse it forever.',
          },
        },
      ],
      diagram: {
        title: 'The analytics stack & CRISP-DM lifecycle',
        caption:
          'Left: the four layers with their questions. Right: the six CRISP-DM phases mapped to the layers — value rises up the pyramid, effort concentrates in preparation.',
        svg: analyticsStackSvg,
      },
      formulas: [
        { name: 'Lift of a decision', expr: 'Value = Δ(decision metric) × volume × margin', meaning: 'The budget ceiling for any analytics project' },
        { name: 'Conversion rate', expr: 'orders ÷ sessions', meaning: 'Model-movable lever in the e-commerce KPI tree' },
        { name: 'Missingness flag', expr: 'P(missing | outcome) ≠ P(missing)', meaning: 'Informative missingness — impute with care or model it' },
        { name: 'Contribution margin', expr: '(price − variable cost) × units', meaning: 'Connects model output to profit' },
      ],
      examples: [
        {
          title: 'Frame a churn problem end-to-end',
          given: [
            'D2C subscription brand: 18,000 subscribers, monthly churn 6.5%',
            'Average subscriber lifetime value ₹4,200 · retention offer costs ₹300',
            'Today: same offer blasted to ALL subscribers each month',
          ],
          steps: [
            { text: 'Decision & stack layer', calc: 'Decision: who gets the ₹300 offer. Layer: predictive (who churns) + prescriptive (who gets the offer given cost)' },
            { text: 'Baseline economics', calc: 'Current: 18,000 × ₹300 = ₹54 lakh/month spent on offers — including ~40% who would not churn anyway' },
            { text: 'Value framing', calc: 'Targeting the top-30% risk decile: spend 5,400×300 = ₹16.2 lakh. If churn in that group falls 6.5% → 4.5%: saved subscribers = 5,400 × 2% = 108/month × ₹4,200 LTV = ₹4.5 lakh new LTV/month' },
            { text: 'Success metric', calc: 'NOT model AUC — monthly churn rate and retention ROI (LTV saved ÷ offer spend). Model is a means; the KPI tree is the end.' },
          ],
          answer:
            'Reframed: a churn-SCORED offer policy. Same ₹300 offer, aimed. Spend falls ₹54 lakh → ₹16 lakh/month; saved-LTV becomes measurable; success is churn-rate movement, not model accuracy.',
        },
        {
          title: 'Spot the scale crime',
          given: ['Survey column "satisfaction": 1=Very dissatisfied … 5=Very satisfied', 'Dashboard shows "Average satisfaction = 3.7, up from 3.4"'],
          steps: [
            { text: 'Identify the scale', calc: 'Ordinal — categories with order, not equal-spaced quantities' },
            { text: 'Why the mean is shaky', calc: 'The gap 3→4 and 4→5 need not be equal "satisfaction units"; arithmetic on codes assumes they are' },
            { text: 'Legal alternatives', calc: 'Report the distribution (top-2-box % = % of 4s and 5s), median, or net score (promoters − detractors)' },
          ],
          answer:
            'Report top-2-box: if 46% score 4–5 now vs 38% before, that is defensible. "Average rose 0.3" on ordinal data is a statistic wearing a fake moustache.',
        },
      ],
      caseStudy: {
        title: 'Case — The Diwali dashboard that lied',
        body: [
          'Festival season, and the CEO\'s pet dashboard shows daily orders up 32% week-on-week. Marketing claims victory for its ₹9 cr campaign. Finance disagrees — contribution margin per order has collapsed. You are handed the raw data at 11 p.m. before the board call.',
          'Three hours of profiling reveal: (1) 22% of "orders" are the same items re-ordered after payment failures and cancellations — the order table counts intents, not sales; (2) the campaign discount stacked with a payment-app cashback, so blended discount reached 41% on campaign SKUs; (3) returns historically arrive with a 12-day lag and are recorded in a different table the dashboard does not read.',
          'Rebuilt with delivered-net-of-returns revenue and stacked-discount margin, the "32% order growth" is 9% revenue growth at one-third the usual margin — a ₹4.1 cr swing in festival contribution profit.',
        ],
        questions: [
          'Which CRISP-DM phase failed, and where should the check have lived?',
          'Redesign the KPI tree so this lie is structurally impossible.',
          'Write the two-sentence message you send the CEO before the board call.',
        ],
        takeaways: [
          'Dashboards inherit every defect of their joins — decision metrics must be defined at the semantic layer, not the chart',
          'Net-of-returns, net-of-discount contribution is truth; gross orders is theatre',
          'The analyst\'s job is sometimes to subtract 23 percentage points of hope from a dashboard — do it early, do it in writing',
        ],
      },
      revision: [
        'Analytics = changing decisions with data; value = Δmetric × volume × margin',
        'Stack: descriptive (what) → diagnostic (why) → predictive (will) → prescriptive (should)',
        'CRISP-DM: business & data understanding → prep → model → evaluate → deploy (loops!)',
        'Preparation is 60–80% of effort; business framing is where projects die',
        'KPIs must be RUMBA; vanity metrics fail the behavioural test',
        'Scale discipline: nominal/ordinal/interval/ratio decides legal arithmetic',
        'Profile before you model: nulls, distributions, duplicates, cross-source ties',
      ],
      practice: [
        {
          q: '"Which branch will breach its cash next quarter?" — which stack layer, and what data do you need?',
          a: 'Predictive (forecasting). Need: branch-level cash flows, deposit/withdrawal seasonality, local events, and current liquidity buffers. Decision served: pre-emptive cash transfer / credit line sizing.',
        },
        {
          q: 'Model A: 91% accuracy, never deployed. Model B: 78% accuracy, deployed, saves ₹2.1 cr/yr. Which is the better analytics project?',
          a: 'B, unambiguously. Analytics is judged by decision value, not model metrics. Accuracy on imbalanced data is often vanity (91% can mean "always predict the majority class").',
        },
        {
          q: 'Your churn model\'s AUC drifted from 0.84 to 0.71 over two quarters. Name three plausible causes.',
          a: '(1) Concept drift — a competitor changed switching behaviour; (2) data pipeline change — a feature is computed differently upstream; (3) population shift — a new segment joined after a marketing push the model never saw.',
        },
        {
          q: 'Traffic 1.2M sessions/mo, conversion 2.1%, AOV ₹1,450, contribution margin 18%. Model lifts conversion to 2.3% — annual value?',
          a: 'Δorders = 1.2M × 0.2% = 2,400/mo × ₹1,450 × 18% = ₹62.6 lakh/mo ≈ ₹7.5 cr/year. That is the project\'s value ceiling — now cost it honestly.',
        },
        { q: 'Classify: a churn score, a sales dashboard, a budget optimiser.', a: 'Predictive (churn probability from history), descriptive (dashboard reports what happened), prescriptive (optimiser recommends the allocation) - the three-tier maturity ladder every analytics syllabus opens with.' },
        { q: 'Why does BI not equal analytics?', a: 'BI is the reporting layer - what happened, sliced fast. Analytics adds statistical explanation and prediction on top. Companies with BI but no analytics have faster answers to the wrong questions.' },
      ],
      tools: [
        { label: 'Analytics Playground (FreshStat)', href: '/tools' },
      ],
    },

    /* ─────────── LECTURE 2 (Unit 2 · outline) ─────────── */
    {
      slug: 'graphical-representation-excel',
      number: 2,
      title: 'Graphical Representation of Data: Bars, Pies, Histograms & OGIVE',
      minutes: 40,
      summary:
        'Choosing the right visual for the question: bar families (simple, sub-divided, multiple), pie discipline, scatter plots for relationships, histograms for distributions, and the OGIVE curve for "how many below?" questions.',
      status: 'live',
      objectives: [
        'Match chart type to data type and question',
        'Build sub-divided and multiple bar diagrams correctly',
        'Construct a frequency histogram and cumulative frequency OGIVE in Excel',
        'Avoid the classic distortions (truncated axes, 3-D pies, dual scales)',
      ],
      sections: [
        {
          heading: '1. The chart-choice decision tree',
          body: [
            'Every visual answers ONE question type. **Comparing categories** → bar family: simple bars (one series across categories), **sub-divided/stacked bars** (parts of a whole per category — good when totals matter AND composition matters), **multiple/grouped bars** (two or more series side-by-side per category — best for direct series comparison; stacked hides the inner series\' trend), **percentage bars** (composition normalised to 100% — use when totals differ wildly). **Part-of-a-whole for ONE period, ≤5 slices** → pie — and only then; a pie with 9 slices or across 5 time periods is a table pretending to be a chart (3-D pies distort area perception: banned in professional practice). **Time** → line (trend is the slope; the eye reads it instantly). **Relationship between two numeric variables** → scatter (add trendline + R²). **Distribution of ONE numeric variable** → histogram (adjacent bars; area = frequency; bin width is an analyst decision that CHANGES the story). **Cumulative questions ("how many below X?")** → the **OGIVE**.',
            '**Histogram vs bar chart — the exam trap**: bars compare *categories* (gaps matter — the categories are separate); histogram bars are *adjacent* because the variable is continuous and bins touch. And the frequency density point: with equal bins, height = frequency; with unequal bins, plot DENSITY (frequency ÷ width) or the area lies.',
          ],
          callout: {
            type: 'exam',
            text: 'Decision tree, one line each: categories → bar (compare) / pie (whole, ≤5) / stacked (composition + total) / grouped (series vs series); time → line; two numerics → scatter; one numeric\'s shape → histogram; "how many below" → OGIVE. If the question names a QUESTION ("which region fell?"), name the chart and the reason.',
          },
        },
        {
          heading: '2. Building the histogram and OGIVE',
          body: [
            '**Histogram workflow (Excel)**: raw column (e.g., 200 daily sales figures) → bins (equal width; Sturges\' rule k ≈ 1 + 3.322·log₁₀(n); n=200 → k ≈ 9) → COUNTIFS per bin (="COUNTIFS(data,\">=\"&lo, data,\"<\"&hi)) → column chart with gap width set to 0% → label "Sales (₹\'000)" with bin edges. Read the shape: unimodal/bimodal (two customer segments!), left/right-skewed (retail sales typically right-skewed: floor at zero, long tail of big days), uniform, outliers.',
            '**OGIVE**: sort data → cumulative frequencies two ways — **less-than** (running total from the bottom: "≤ upper boundary") and **more-than** (from the top). Plot less-than cumulative vs upper bin boundary → S-shaped rising curve; more-than → falling. Uses: read any percentile (find 60 on the y-axis, drop to x — the 60th percentile), find the median (where less-than = n/2), count below a target ("days with sales < ₹85k"), and compare two distributions on one grid. **Where the two OGIVEs cross = the median** (less-than = more-than there) — a classic exam one-liner. Excel: =PERCENTILE.INC(data, p) verifies what you read off the curve.',
          ],
          bullets: [
            'Bars compare, lines trend, scatters relate, histograms show shape, OGIVEs count-below',
            'Stacked = composition + total; grouped = series comparison; 100% stacked = composition only',
            'Pie discipline: one period, ≤5 slices, no 3-D',
            'Histogram bins touch; unequal bins → plot frequency density',
            'Sturges: k ≈ 1 + 3.322 log₁₀ n',
            'Less-than OGIVE rises; more-than falls; intersection = median',
          ],
        },
      ],
      diagram: {
        title: 'Histogram with its OGIVE',
        caption: 'Same daily-sales data twice: bars show where values cluster; the cumulative curve answers "how many below X?" — and passes through the median.',
        svg: `<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Histogram and ogive curve">
  <g font-family="inherit" font-size="11">
    <line x1="70" y1="200" x2="400" y2="200" stroke="#475569" stroke-width="1.5"/>
    <line x1="70" y1="200" x2="70" y2="30" stroke="#475569" stroke-width="1.5"/>
    <rect x="70" y="176" width="42" height="24" fill="#93c5fd"/>
    <rect x="112" y="158" width="42" height="42" fill="#60a5fa"/>
    <rect x="154" y="118" width="42" height="82" fill="#3b82f6"/>
    <rect x="196" y="70" width="42" height="130" fill="#2563eb"/>
    <rect x="238" y="86" width="42" height="114" fill="#3b82f6"/>
    <rect x="280" y="128" width="42" height="72" fill="#60a5fa"/>
    <rect x="322" y="162" width="42" height="38" fill="#93c5fd"/>
    <rect x="364" y="184" width="36" height="16" fill="#bfdbfe"/>
    <text x="235" y="220" fill="#475569">daily sales (₹\'000) — right-skewed</text>
    <text x="30" y="34" fill="#475569">freq</text>
    <line x1="430" y1="200" x2="690" y2="200" stroke="#475569" stroke-width="1.5"/>
    <line x1="430" y1="200" x2="430" y2="30" stroke="#475569" stroke-width="1.5"/>
    <path d="M430,200 L470,192 L510,176 L550,148 L590,104 L630,74 L670,58 L690,52" fill="none" stroke="#dc2626" stroke-width="2.5"/>
    <circle cx="590" cy="104" r="5" fill="#dc2626"/>
    <line x1="590" y1="104" x2="590" y2="200" stroke="#dc2626" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="430" y1="115" x2="590" y2="104" stroke="#475569" stroke-width="1" stroke-dasharray="3 3"/>
    <text x="436" y="112" fill="#475569" font-size="10">n/2 = median</text>
    <text x="556" y="218" fill="#dc2626">median ≈ 96</text>
    <text x="500" y="240" fill="#475569">less-than OGIVE (cumulative)</text>
    <text x="560" y="40" fill="#dc2626">S-curve: read any percentile</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Sturges\' bin count', expr: 'k ≈ 1 + 3.322 · log₁₀(n)', meaning: 'Starting point for bins' },
        { name: 'Frequency density', expr: 'density = frequency / bin width', meaning: 'Honest heights for unequal bins' },
        { name: 'Less-than cumulative', expr: 'CF(< xᵤ) = Σ freq(bins ≤ xᵤ)', meaning: 'OGIVE y-value' },
      ],
      examples: [
        {
          title: 'Frequency table → histogram → OGIVE',
          given: ['Daily sales (₹\'000) of 40 days binned: 60–70: 3, 70–80: 6, 80–90: 10, 90–100: 12, 100–110: 5, 110–120: 4'],
          steps: [
            { text: 'Cumulative (less-than)', calc: '≤70: 3 · ≤80: 9 · ≤90: 19 · ≤100: 31 · ≤110: 36 · ≤120: 40' },
            { text: 'Median from OGIVE', calc: 'n/2 = 20 falls in the ≤100 run: between 19 and 31 ⇒ median in (90,100]; interpolate: 90 + (20−19)/12×10 ≈ ₹90.8k' },
            { text: 'Percentile check', calc: '=PERCENTILE.INC(data, 0.5) ≈ same ₹90–91k — the curve and the function must agree' },
            { text: 'Business read', calc: 'Right-skewed: most days cluster ₹80–100k; the >100k tail (9 days) plans inventory spikes — mean (₹91.5k) exceeds median (₹90.8k), confirming skew' },
          ],
          answer: 'Table → histogram (shape) → OGIVE (percentiles): the standard three-step pipeline for any numeric variable.',
        },
        {
          title: 'Choose the chart and defend it',
          given: [
            'Q1: market share of 4 telecom players this quarter',
            'Q2: monthly revenue of 3 product lines for 2 years',
            'Q3: does ad spend relate to footfall?',
            'Q4: how are 500 loan ticket sizes distributed?',
          ],
          steps: [
            { text: 'Q1', calc: 'Pie (one period, 4 slices) or a single bar — pie acceptable; add data labels with %' },
            { text: 'Q2', calc: 'Multiple/grouped bars per quarter (3 lines vs lines? — 3 series × time could also be 3 lines; bars when quarters are categorical snapshots, lines when trend is the message — say which and why)' },
            { text: 'Q3', calc: 'Scatter with trendline + R² — relationship question' },
            { text: 'Q4', calc: 'Histogram (shape of one numeric) + OGIVE for "what share of loans below ₹5 lakh"' },
          ],
          answer: 'Every chart choice = question type + data type; the defence sentence is the deliverable.',
        },
      ],
      caseStudy: {
        title: 'Case — The truncated axis that sold a turnaround',
        body: [
          'A regional manager presents quarterly same-store sales: a bar chart shows this quarter\'s bar 3x the previous — the y-axis starts at ₹88 lakh, not ₹0; actual growth is 4% (₹91L vs ₹87.6L). The committee approves an expansion budget on the visual.',
          'A second analyst re-plots from zero, adds a 12-quarter line with seasonal bands, and shows the quarter is ordinary. The expansion is re-scoped.',
        ],
        questions: [
          'Which perceptual rule did the original chart exploit?',
          'When is a non-zero baseline acceptable?',
          'What chart would have served the committee\'s actual question?',
        ],
        takeaways: [
          'Bar length encodes magnitude — truncating the baseline multiplies apparent differences (3x visual for 4% actual); lines may use non-zero baselines (slope is the signal), bars may not',
          'Non-zero baselines are acceptable only when explicitly flagged AND the honest alternative is shown alongside',
          'The committee\'s question was "is the trend accelerating?" — a 12-quarter line with context (seasonality, category benchmark), not a two-bar snapshot',
          'Ethics rule: a chart is an argument — every design choice either supports or subverts the reader\'s ability to see the truth (links to BA01 Unit 5)',
        ],
      },
      revision: [
        'Bars = categories; lines = time; scatter = relationship; histogram = distribution; OGIVE = cumulative',
        'Stacked (composition+total), grouped (series vs series), 100% stacked (composition only)',
        'Pie: one period, ≤5 slices, no 3-D, label values',
        'Histogram bins touch; equal bins → height=freq; unequal → density',
        'Sturges k ≈ 1 + 3.322 log₁₀ n',
        'OGIVE: less-than rises, more-than falls; cross = median; read percentiles by drop-down',
        'Truncated bar axes distort; 3-D anything distorts; dual axes need clear flags',
        'Excel: COUNTIFS bins → column chart, gap 0%; PERCENTILE.INC to verify',
      ],
      practice: [
        { q: 'Stacked vs grouped bars for "sales by region, by product" — which when?', a: 'Grouped when comparing products WITHIN regions (inner series comparison); stacked when the region TOTAL and rough composition are the message. Never use 100%-stacked if totals matter — they vanish.' },
        { q: 'How do you find Q1 and Q3 from an OGIVE?', a: 'Read the curve at n/4 and 3n/4 on the cumulative axis, drop to the x-axis; IQR = Q3 − Q1 — or intersect less-than and more-than curves at n/4 for Q1 directly.' },
        { q: 'Your histogram with 5 bins hides a bimodal shape. What happened?', a: 'Over-binning smoothing: bin width too coarse merged two modes. Re-bin (Sturges is a start, not a verdict): try 8–12 bins; if bimodality persists across sensible widths, it is real (two customer segments) — then investigate the cause.' },
        { q: 'When is a sub-divided (stacked) bar better than a pie, and when is it misleading?', a: 'Stacked bars compare composition ACROSS categories (region-wise revenue mix) which pies cannot; they mislead when segment counts differ wildly or readers must compare non-adjacent segments - then use small multiples.' },
        { q: 'From an OGIVE, how do you read the median?', a: 'The x-value where cumulative frequency crosses 50 percent - drop a vertical from that intersection. Quartiles read the same way at 25 and 75 percent.' },
      ],
    },

    /* ─────────── LECTURE 3 (Unit 3 · outline) ─────────── */
    {
      slug: 'descriptive-statistics-excel',
      number: 3,
      title: 'Descriptive Statistics: Centres, Spread, Skewness & Kurtosis',
      minutes: 45,
      summary:
        'Mean vs median vs mode and when each lies; range and standard deviation as spread; the skewness sign convention; kurtosis and fat tails; reading Excel and the Analysis ToolPak descriptive-statistics output like a pro.',
      status: 'live',
      objectives: [
        'Choose the right centre for skewed data',
        'Compute and interpret standard deviation and coefficient of variation',
        'Interpret skewness and kurtosis values from Excel output',
        'Explain the descriptive vs inferential statistics boundary',
      ],
      sections: [
        {
          heading: '1. Centres and spread — and when each lies',
          body: [
            '**Centres**: **mean** (uses every value; symmetric data\'s centre of gravity; dragged by outliers — one ₹100-crore order wrecks "average order value"), **median** (middle rank; robust — right choice for income, house prices, engagement times), **mode** (most frequent; the only centre for categorical data — modal payment method; bimodal data = two segments hiding). Relationships in a right-skewed distribution: **mean > median > mode** (income); left-skewed reverses. Symmetric: all three coincide. Choosing wrong is the most common statistical lie in business — "average salary" quoted where the median belongs.',
            '**Spread**: range (max−min; outlier-hostage), **standard deviation σ** (typical distance from the mean; units = data units), variance σ² (squared units — mathematically necessary, communicatively useless), **IQR** (Q3−Q1; robust middle-50% spread), **coefficient of variation CV = σ/mean** (unit-free — THE comparison tool across series of different scale: "branch A sales σ ₹4L on ₹50L mean (CV 8%) is riskier than branch B σ ₹7L on ₹140L (CV 5%)"). Excel: =STDEV.S (sample — default; STDEV.P only for a full population), =QUARTILE.INC, =AVERAGE, =MEDIAN, =MODE.SNGL. The **empirical rule**: bell-shaped data → ~68% within ±1σ, ~95% ±2σ, ~99.7% ±3σ; **z-score** = (x − mean)/σ = "how many sigmas from the mean" — the universal standardiser (this month\'s 2.1σ sales day is exceptional; ±1σ days are routine).',
          ],
          callout: {
            type: 'exam',
            text: 'The five-number summary + boxplot: MIN, Q1, median, Q3, MAX; box = IQR, whiskers extend to 1.5×IQR, points beyond = outliers. Skew read: mean vs median position, and which whisker is longer. In Excel there is no native boxplot in older versions — Insert → Statistic Chart → Box and Whisker (2016+) does it. Memorise: Q1 = 25th, Q3 = 75th percentile; IQR = Q3 − Q1; outlier fence = Q1 − 1.5×IQR / Q3 + 1.5×IQR.',
          },
        },
        {
          heading: '2. Shape: skewness, kurtosis, and the boundary with inference',
          body: [
            '**Skewness** (Excel =SKEW): 0 symmetric; **positive** = long right tail (incomes, sales, insurance claims, web session times — the default shape of business data); **negative** = long left tail (error rates bounded at 0, scores capped high). |skew| > 1 = seriously skewed — prefer median/IQR reporting and non-parametric tests (lecture 4). **Kurtosis** (=KURT, excess): 0 normal; **positive** = fat tails + peaked (returns! option pricing worlds — big surprises more common than the bell promises); negative = flat. Finance rule: daily stock returns show excess kurtosis 2–20 — the reason normal-VaR underestimates tail risk (F06 lecture 8). Shape tells you WHICH statistical machinery is legal: symmetric → means, t-tests, regression assumptions; skewed → medians, transforms (log), rank tests.',
            '**Descriptive vs inferential boundary**: **descriptive** = describe THIS dataset (mean of these 200 days — no generalisation); **inferential** = use a SAMPLE to make a probability-backed claim about the POPULATION (estimation ± margin of error; hypothesis tests). The bridge: sampling distributions and the standard error σ/√n — the single most important idea in Unit 4. Descriptive statistics summarise what happened; inferential statistics gamble (quantifiably) on what will. **Reading the ToolPak output**: Data → Data Analysis → Descriptive Statistics → Summary statistics: you get mean, standard error (σ/√n), median, mode, SD, sample variance, kurtosis, skewness, range, min, max, sum, count — annotate which are centre (mean/median/mode), spread (SD/variance/range/IQR), shape (skew/kurtosis), and which feed inference (SE). Excel\'s mode is fragile (returns #N/A if no repeats) and kurtosis is EXCESS (normal = 0, not 3) — both classic gotchas.',
          ],
          bullets: [
            'Right-skew: mean > median > mode (report the median); left-skew reverses',
            'σ = typical deviation; CV = σ/mean for cross-scale comparison; IQR = robust spread',
            'Empirical rule 68/95/99.7; z = (x−μ)/σ',
            'Boxplot: box=IQR, whiskers=1.5×IQR, dots=outliers',
            'SKEW>0 right tail (business default); KURT>0 fat tails (returns)',
            'SE = σ/√n — the bridge from description to inference',
            'Excel: STDEV.S, QUARTILE.INC, SKEW, KURT (excess: normal=0)',
          ],
        },
      ],
      diagram: {
        title: 'Three shapes and where the mean, median live',
        caption: 'Symmetric: centres coincide. Right-skewed: mean dragged right of median — the signature of incomes and sales. Fat tails: extremes are not rare.',
        svg: `<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Distribution shapes">
  <g font-family="inherit" font-size="11">
    <path d="M40,180 C70,60 110,58 140,180" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <line x1="30" y1="180" x2="150" y2="180" stroke="#475569" stroke-width="1.2"/>
    <line x1="90" y1="180" x2="90" y2="62" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="80" y="205" fill="#334155" font-weight="600">symmetric</text>
    <text x="66" y="218" fill="#dc2626">mean=median=mode</text>
    <path d="M220,180 C250,80 275,66 300,100 C330,150 370,172 430,178" fill="none" stroke="#16a34a" stroke-width="2.5"/>
    <line x1="205" y1="180" x2="440" y2="180" stroke="#475569" stroke-width="1.2"/>
    <line x1="285" y1="180" x2="285" y2="72" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3"/>
    <line x1="305" y1="180" x2="305" y2="95" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="268" y="205" fill="#334155" font-weight="600">right-skewed</text>
    <text x="240" y="218" fill="#dc2626">mode</text>
    <text x="298" y="218" fill="#7c3aed">median</text>
    <text x="345" y="218" fill="#334155">mean pulled right →</text>
    <path d="M470,180 C520,178 560,168 590,140 C615,112 628,70 636,66 C644,70 652,120 660,178" fill="none" stroke="#ea580c" stroke-width="2.5"/>
    <line x1="460" y1="180" x2="690" y2="180" stroke="#475569" stroke-width="1.2"/>
    <text x="540" y="205" fill="#334155" font-weight="600">fat tails (kurtosis &gt; 0)</text>
    <text x="505" y="218" fill="#7c2d12">extremes more common than normal</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Standard deviation (sample)', expr: 's = √[ Σ(xᵢ − x̄)² / (n−1) ]', meaning: 'Typical distance from mean' },
        { name: 'Coefficient of variation', expr: 'CV = s / x̄', meaning: 'Unit-free risk comparison' },
        { name: 'z-score', expr: 'z = (x − x̄) / s', meaning: 'Standardised distance' },
        { name: 'Outlier fences', expr: '[Q1 − 1.5·IQR, Q3 + 1.5·IQR]', meaning: 'Boxplot whisker limits' },
        { name: 'Standard error', expr: 'SE = s / √n', meaning: 'Bridge to inference' },
      ],
      examples: [
        {
          title: 'Two branches, one CV verdict',
          given: ['Branch A: mean weekly sales ₹50L, σ ₹4L · Branch B: mean ₹140L, σ ₹7L'],
          steps: [
            { text: 'Raw σ comparison', calc: 'B looks riskier (7 > 4)' },
            { text: 'CV', calc: 'A: 4/50 = 8.0% · B: 7/140 = 5.0% — A is riskier RELATIVE to its scale' },
            { text: 'Interpretation', calc: 'Inventory buffers should key off CV, not σ: A needs proportionally deeper safety stock despite smaller absolute swings' },
            { text: 'Add z context', calc: 'A bad week at ₹42L = (42−50)/4 = −2σ (2.3% probability); B at ₹126L = −2σ too — same z, different rupees' },
          ],
          answer: 'σ sizes the swing, CV sizes the risk, z sizes the surprise — three numbers, three decisions.',
        },
        {
          title: 'Salary data: mean lies, median reports',
          given: ['Ten salaries (₹L): 3, 3.5, 4, 4, 4.5, 5, 5.5, 6, 7, 90'],
          steps: [
            { text: 'Centres', calc: 'Mean = 132.5/10 = ₹13.25L · Median = (4.5+5)/2 = ₹4.75L · Mode = ₹4L' },
            { text: 'Skew check', calc: 'Mean ≫ median ⇒ extreme right skew (the ₹90L CEO pulls the mean 3x above the median)' },
            { text: 'Spread', calc: 'Range 3–90 (worthless); IQR ≈ Q3 5.875 − Q1 3.875 ≈ ₹2L (honest); σ ≈ ₹26.7L dominated by the outlier' },
            { text: 'Boxplot', calc: 'Upper fence = Q3 + 1.5×IQR ≈ ₹8.9L → 90 is a flagged outlier dot; the box tells the true story of the other nine' },
          ],
          answer: 'Report median ₹4.75L with IQR ₹2L; the mean would mislead every policy discussion. One outlier, three corrupted statistics.',
        },
      ],
      caseStudy: {
        title: 'Case — "Average delivery time 34 minutes" — a complaint file',
        body: [
          'A food-delivery hub reports mean delivery 34 minutes, σ 9. The marketing team promises "most orders in about 35 minutes". Complaints spike on weekends.',
          'You pull 500 orders: median 29 minutes, mean 34, skewness +1.6, kurtosis 4.1 — a long right tail of 70–90 minute disasters concentrated in weekend peaks.',
        ],
        questions: [
          'Why did the promise fail even though the mean was honest?',
          'Which descriptive set belongs in the SLA?',
          'What does the kurtosis value add?',
        ],
        takeaways: [
          'Right-skewed service times: the mean sits above the typical (median 29) experience — "about 35" described the average including disasters, not the customer\'s typical wait',
          'SLA needs the median + a tail percentile: "50% under 29 min, 90% under 48 min" — percentiles speak to experience; means speak to aggregates',
          'Kurtosis 4.1 = fat tails: extreme delays are several times more likely than a normal curve implies — staffing for ±2σ (52 min) still leaves real 1% tail victims; buffer capacity at peaks is the operational fix',
          'General lesson: for any bounded-at-zero, long-right-tail business metric (wait, session, claim, resolution times), lead with median and P90 — the mean is for finance, not for promises',
        ],
      },
      revision: [
        'Mean (all values, outlier-dragged) · median (rank, robust) · mode (frequency, categorical)',
        'Right-skew: mean > median > mode; left-skew reversed; report median for skew',
        'σ vs IQR vs range; CV = σ/mean for cross-scale comparisons',
        'Empirical rule 68/95/99.7; z = (x − x̄)/s',
        'Boxplot five-number summary; fences at 1.5×IQR',
        'SKEW > 0 long right tail; KURT > 0 fat tails (returns, service times)',
        'SE = s/√n; descriptive = this data, inferential = claim about population',
        'Excel: STDEV.S / QUARTILE.INC / SKEW / KURT(excess) / ToolPak summary',
      ],
      practice: [
        { q: 'Series A: mean 100, σ 5. Series B: mean 10, σ 1. Which is more stable?', a: 'CV: A = 5%, B = 10% — A is relatively more stable despite the larger absolute σ. Compare dispersion with CV whenever scales differ.' },
        { q: 'A z-score of −3 on a "normal" day\'s defect count. Two explanations?', a: '(1) Genuine 3-sigma event (0.13% probability — investigate for a cause); (2) the data is not normal — if defect counts are Poisson/skewed, the z-math overstates rarity. Check the shape before believing the z.' },
        { q: 'When is the mean actually the right centre for skewed data?', a: 'When totals matter: costs, capacity, inventory — the mean times n gives the total load (mean order value × orders = revenue). Report BOTH: median for "typical", mean for "aggregate planning".' },
        { q: 'Two suppliers: same mean delivery 10 days, SD 1 versus 4. Which do you prefer for JIT?', a: 'SD 1 - variability, not the average, breaks just-in-time. The 4-day supplier is late a fifth of the time; consistency wins process design even at equal means.' },
        { q: 'Mean Rs 52,000, median Rs 38,000, mode Rs 30,000. Describe the distribution.', a: 'Right-skewed (mean above median above mode): a few very large values drag the mean - typical of income data. Report the median for the typical case and note which average is honest.' },
      ],
    },

    /* ─────────── LECTURE 4 (Unit 4 · outline) ─────────── */
    {
      slug: 'inferential-statistics-excel',
      number: 4,
      title: 'Inferential Statistics: t-tests, Chi-square & ANOVA',
      minutes: 50,
      summary:
        'From sample to population with stated confidence: hypothesis testing logic, one-sample / independent / paired t-tests, chi-square for categorical association and goodness-of-fit, and one-way ANOVA for comparing 3+ means.',
      status: 'live',
      objectives: [
        'Structure null and alternative hypotheses for business questions',
        'Choose the right test by data type and design',
        'Run t-tests, chi-square and ANOVA in the Analysis ToolPak',
        'Interpret p-values and avoid p-hacking traps',
      ],
      sections: [
        {
          heading: '1. Hypothesis-testing logic and the test chooser',
          body: [
            'The ritual, every time: (1) **H₀** = no effect / no difference / no association (the status quo the data must defeat); **H₁** = what you suspect. (2) Choose α (significance — usually 0.05: the false-positive rate you accept). (3) Pick the test from data type + design (the chooser below). (4) Compute the statistic (t, χ², F) — a signal-to-noise ratio. (5) The **p-value** = probability of data THIS extreme if H₀ were true. (6) p < α → reject H₀ ("statistically significant"); p ≥ α → fail to reject (never "accept H₀" — absence of evidence is not evidence of absence). **Type I error (α)** = false positive — rejecting a true H₀ (launching a dud). **Type II (β)** = false negative — missing a real effect; **power = 1 − β** (typically target 80%), grows with sample size and effect size. One-tailed tests (directional claim, H₁: μ > x) are stronger but must be justified BEFORE seeing data — switching tails after is cheating.',
            '**The chooser**: one numeric variable vs a value → **one-sample t** (is mean delivery ≠ 30 min?). Two group means, independent groups → **two-sample t** (equal variance: ToolPak "t-Test: Two-Sample Assuming Equal Variances"; =T.TEST(range1, range2, tails, type=2/3)). Same units measured twice (before/after) → **paired t** (type = 1 — test the DIFFERENCES; more powerful because each subject is its own control). Categorical vs categorical (association in a contingency table) → **chi-square** =CHISQ.TEST(observed, expected) or ToolPak "Correlation- none — use CHISQ" — expected counts = row×col/total, rule: all expected ≥ 5. Comparing 3+ group means → **one-way ANOVA** (F = between-group variance / within-group variance) — significant F says "at least one differs", then post-hoc (Tukey) or pairwise t with Bonferroni α/k to find WHICH. Numeric vs numeric relationship → regression (lecture 5).',
          ],
          callout: {
            type: 'exam',
            text: 'The p-value catechism — write it correctly or lose the mark: p = P(data this extreme | H₀ true), NOT P(H₀ true | data). "p = 0.03" means: if there were truly no effect, you\'d see a result this big 3% of the time — rare enough to doubt H₀ at α = 0.05. It does NOT mean the effect is 97% likely, nor that the effect is large (significance ≠ magnitude: with n huge, trivial effects turn "significant" — report effect size: Cohen\'s d, the difference itself, Cramér\'s V).',
          },
        },
        {
          heading: '2. Three Excel runs and the p-hacking traps',
          body: [
            '**A/B test (two-sample t)**: landing-page A 120 sessions, mean order value ₹842, s ₹210; B 120 sessions, ₹908, s ₹230. Pooled SE ≈ √(210²/120 + 230²/120) ≈ 28.2; t = (908−842)/28.2 ≈ 2.34; df ≈ 236 → p ≈ 0.020 (two-tailed) → reject H₀ at 5%: B lifts AOV by ~₹66. Effect size: d ≈ 66/220 ≈ 0.30 — small-to-moderate, commercially meaningful at scale. **Chi-square (association)**: 4 branches × {promoter, passive, detractor} counts; χ² = Σ (O−E)²/E across cells; p < 0.05 → branch and satisfaction are associated; Cramér\'s V = √(χ²/(n·min(r−1,c−1))) sizes the association. **ANOVA (4 zones)**: F = MS_between/MS_within; significant F, then pairwise t-tests with Bonferroni (α/6 for 4 groups = 6 pairs) to locate the gap. In Excel: Data Analysis → the three t-Test tools and "Anova: Single Factor"; CHISQ.TEST needs the expected table built by row×col/total.',
            '**Traps that end careers**: (1) **p-hacking** — testing until something hits p<.05 (20 tests = one false positive on average at α=.05); fix: pre-register the hypothesis, one primary metric. (2) **Multiple comparisons** — 6 pairwise tests at .05 each ≈ 26% chance of a "finding"; Bonferroni/FDR correction. (3) **Stopping rules** — peeking at a running test and stopping when significant inflates false positives; fix: fixed sample size or sequential boundaries. (4) **HARKing** — hypothesising after results are known. (5) Confusing statistical with practical significance (a 0.1% lift, p<.001, n=2M — real but worthless). The honest report: hypothesis stated in advance, test chosen by design, effect size + confidence interval, and the sentence "we can reject no-difference at the 5% level" — not "the test proves B is better".',
          ],
          bullets: [
            'H₀ = no effect; reject only with p < α; never "accept" H₀',
            'One-sample / two-sample / paired t: value · independent groups · before-after',
            'Chi-square: categorical association; all expected ≥ 5; Cramér\'s V for strength',
            'ANOVA: 3+ means; F significant → post-hoc with correction',
            'α = false positive; β = false negative; power = 1 − β (n and effect drive it)',
            'Significance ≠ magnitude: always report the effect size + CI',
            'Pre-register, correct multiples, no peeking — or the p is theatre',
          ],
        },
      ],
      diagram: {
        title: 'The test chooser',
        caption: 'Data type + question → test. Numeric-mean questions go to the t/F family; categorical counts to chi-square; relationships to regression.',
        svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Statistical test chooser flowchart">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="270" y="12" width="180" height="36" rx="9" fill="#f1f5f9"/><text x="360" y="35" fill="#334155" font-weight="600">What is the question?</text>
    <rect x="20" y="80" width="200" height="40" rx="9" fill="#e0f2fe"/><text x="120" y="98" fill="#0c4a6e">one group vs a number?</text><text x="120" y="112" fill="#075985">→ one-sample t</text>
    <rect x="240" y="80" width="200" height="40" rx="9" fill="#dcfce7"/><text x="340" y="98" fill="#14532d">two group means?</text><text x="340" y="112" fill="#166534">→ two-sample t (paired if same units)</text>
    <rect x="460" y="80" width="200" height="40" rx="9" fill="#fef9c3"/><text x="560" y="98" fill="#713f12">3+ group means?</text><text x="560" y="112" fill="#a16207">→ one-way ANOVA → post-hoc</text>
    <rect x="120" y="150" width="200" height="40" rx="9" fill="#fee2e2"/><text x="220" y="168" fill="#7f1d1d">counts by categories</text><text x="220" y="182" fill="#991b1b">→ chi-square (E ≥ 5)</text>
    <rect x="380" y="150" width="200" height="40" rx="9" fill="#ede9fe"/><text x="480" y="168" fill="#4c1d95">numeric vs numeric?</text><text x="480" y="182" fill="#5b21b6">→ correlation / regression (L5)</text>
    <line x1="300" y1="48" x2="130" y2="78" stroke="#475569" stroke-width="1.4"/>
    <line x1="360" y1="48" x2="345" y2="78" stroke="#475569" stroke-width="1.4"/>
    <line x1="420" y1="48" x2="565" y2="78" stroke="#475569" stroke-width="1.4"/>
    <line x1="330" y1="48" x2="230" y2="148" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="400" y1="48" x2="470" y2="148" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3"/>
    <rect x="180" y="212" width="360" height="32" rx="8" fill="#f8fafc"/>
    <text x="360" y="233" fill="#475569">always: state H₀/H₁ first · α before data · report effect size + CI</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 't statistic', expr: 't = (x̄ − μ₀) / (s/√n) · two-sample: Δ / SE(pooled)', meaning: 'Mean difference in SE units' },
        { name: 'Chi-square', expr: 'χ² = Σ (O − E)²/E, E = row·col/total', meaning: 'Association signal' },
        { name: 'ANOVA F', expr: 'F = MS(between) / MS(within)', meaning: '3+ means comparison' },
        { name: 'Cohen\'s d', expr: 'd = (mean diff) / pooled SD', meaning: 'Effect size for t-tests' },
        { name: 'Bonferroni', expr: 'α\' = α / number of comparisons', meaning: 'Multiplicity correction' },
      ],
      examples: [
        {
          title: 'A/B test, run honestly',
          given: ['Variant A: n=120, mean ₹842, s ₹210 · Variant B: n=120, mean ₹908, s ₹230', 'Pre-registered: H₁ two-tailed, α=0.05'],
          steps: [
            { text: 'Hypotheses', calc: 'H₀: μA = μB · H₁: μA ≠ μB (stated BEFORE data — that is what makes the p meaningful)' },
            { text: 'Statistic', calc: 'SE = √(210²/120 + 230²/120) ≈ 28.2 → t = 66/28.2 ≈ 2.34, df ≈ 236' },
            { text: 'Decision', calc: 'p ≈ 0.020 < 0.05 → reject H₀: evidence of a difference' },
            { text: 'Effect + CI', calc: 'Lift ₹66 (95% CI ≈ ₹10–122); d ≈ 0.30 — statistically significant AND commercially sized; roll out, monitor the CI in production' },
          ],
          answer: 'The verdict sentence: "B lifts AOV by ₹66 (95% CI 10–122), p = .02, d = .30" — difference, precision, significance, magnitude, all four in one line.',
        },
        {
          title: 'Chi-square on a promo table',
          given: ['Contingency table (branches × buy/no-buy after a WhatsApp promo): χ² = 9.8, df = 3, n = 800'],
          steps: [
            { text: 'Expected rule check', calc: 'All expected cells = row×col/800 ≥ 5 ✓ (required for χ² validity)' },
            { text: 'Decision', calc: 'χ²crit(3 df, .05) = 7.815; 9.8 > 7.815 (p ≈ .02) → reject independence: response differs by branch' },
            { text: 'Strength', calc: 'Cramér\'s V = √(9.8/(800×2)) ≈ 0.078 — significant but WEAK association: branch matters, modestly' },
            { text: 'Follow-up', calc: 'Standardised residuals per cell ((O−E)/√E): the one cell at +2.1 is the branch driving the association — investigate that branch\'s list quality' },
          ],
          answer: 'χ² flags association, residuals locate it, V sizes it — three-layer reading of one table.',
        },
      ],
      caseStudy: {
        title: 'Case — Twenty metrics, one winner: anatomy of a false lift',
        body: [
          'A growth team A/B-tests a checkout redesign on 50/50 traffic, 2 weeks. The primary metric (conversion) shows p = 0.34 — no effect. The team then scans 20 secondary metrics (time-on-page, add-to-cart, scrolls, segment-wise conversions…), finds "conversion for mobile users in week 2" at p = 0.04, and ships the redesign claiming a win for "mobile power users".',
          'A re-analysis on fresh traffic finds nothing.',
        ],
        questions: [
          'Why was the p = 0.04 almost certainly a false positive?',
          'What should the team have done at design time?',
          'How do you test a sub-group claim honestly?',
        ],
        takeaways: [
          '20 tests at α = .05 ⇒ ~64% chance at least one "significant" result under a true no-effect; the subgroup × time-window cut multiplies opportunities — the look-elsewhere effect',
          'Design-time discipline: one pre-registered primary metric + required sample size (power calculation), secondary metrics labelled exploratory, no stopping on first significance',
          'Honest subgroup testing: declare the subgroup hypothesis in advance, correct for the number of subgroup tests (Bonferroni: .05/6 ≈ .008), and demand replication on out-of-sample traffic',
          'Cultural lesson: "significant" ≠ "true" — significance is a property of the PROCEDURE, and p-hacking quietly changes the procedure after the data arrive',
        ],
      },
      revision: [
        'H₀ no-effect; reject when p < α; never "accept H₀" (fail to reject)',
        'p = P(extreme data | H₀), not P(H₀ | data) — the catechism',
        'Type I = false positive (α); Type II = false negative (β); power = 1−β',
        'One-sample t (vs value) · two-sample t (groups) · paired t (same units)',
        'Chi-square (categories; E ≥ 5; Cramér\'s V) · ANOVA F (3+ means → post-hoc)',
        'Effect size + confidence interval beside every p (d, Cramér\'s V, lift ₹)',
        'Bonferroni α/k for multiple comparisons; pre-register primary metric',
        'No peeking/stopping on significance; HARKing = hypotheses after results',
        'Statistical ≠ practical significance — big n makes dust significant',
      ],
      practice: [
        { q: 'Before/after training scores for the SAME 25 employees — which test and why?', a: 'Paired t: each employee is their own control; the test runs on the 25 difference scores, removing person-to-person variance and boosting power vs an independent two-sample t.' },
        { q: 'ANOVA on 4 branches gives p = 0.01. What do you know and not know?', a: 'You know: at least one branch mean differs (reject equality). You do NOT know which pairs differ — run post-hoc pairwise comparisons with Bonferroni (α/6 for six pairs).' },
        { q: 'n = 2 million users, lift 0.05%, p < 0.001. Ship it?', a: 'Statistically real, practically negligible — model the business impact (0.05% of revenue) against integration and maintenance cost. Significance answers detectability, not desirability.' },
        { q: 'p = 0.03 on a two-group t-test. What does it and does it not tell you?', a: 'It says the observed difference is unlikely under no-difference (evidence of an effect); it does NOT give effect size, practical importance or replication certainty - report means, CI and p together.' },
        { q: 'When does the t-distribution matter versus the normal?', a: 'Small samples (roughly n under 30) with unknown sigma - t has fatter tails so intervals widen honestly. As n grows t converges to normal, which is why large-sample tests use z.' },
      ],
    },

    /* ─────────── LECTURE 5 (Unit 5 · outline) ─────────── */
    {
      slug: 'correlation-regression-excel',
      number: 5,
      title: 'Correlation & Regression: From Scatter Plot to Prediction',
      minutes: 50,
      summary:
        'Pearson correlation and its traps, least-squares regression lines (Y on X vs X on Y — they are NOT the same line), R² interpretation, and multiple regression with dummy variables for business forecasting.',
      status: 'live',
      objectives: [
        'Compute and interpret correlation and R²',
        'Fit and read a regression output (coefficients, standard errors, p-values)',
        'Explain why Y-on-X and X-on-Y lines differ',
        'Build a small multiple-regression forecasting model',
        'Run residual diagnostics and respect the causation boundary',
      ],
      sections: [
        {
          heading: '1. Correlation and the least-squares line',
          body: [
            '**Pearson r** = covariance standardised into [−1, +1]: =CORREL(x, y). Reading: |r| < 0.3 weak, 0.3–0.7 moderate, > 0.7 strong — but r measures LINEAR association only (a perfect U-shaped relation can have r ≈ 0 — always scatter-plot FIRST: Anscombe\'s quartet is four datasets with identical r and completely different shapes). **R² = r²** in simple regression = the share of Y\'s variance the line explains (r = 0.8 → R² = 0.64 → 64% explained). Correlation traps: **outliers manufacture r** (one leverage point can create or destroy it); **restricted range shrinks it** (test only top performers and r collapses); **ecological fallacy** — group-level r need not hold for individuals.',
            '**Least squares**: the regression line ŷ = a + bx minimises the SUM OF SQUARED VERTICAL deviations; b = r·(sy/sx) = slope (units: Δy per unit x); a = ȳ − b·x̄. **Y-on-X vs X-on-Y are different lines** — each minimises errors in its OWN dependent variable\'s direction; they coincide only when r = ±1. (Exam classic: predicting sales from ads uses sales-on-ads; the reverse line answers a different question and gives different numbers.) **Reading the Excel regression output** (Data Analysis → Regression): **Coefficients** (b, a — the model), **Standard Error** of each coefficient (precision), **t Stat / P-value** (is the coefficient distinguishable from zero? p < 0.05 → keep), **R Square** (fit), **Adjusted R²** (fit penalised for predictor count — THE comparison metric between models; raw R² never falls when you add junk), **Standard Error of the regression** (typical prediction error in Y-units — often the most decision-relevant number), F-statistic (overall model significance), and the **residuals** (the part your model cannot explain — inspect, don\'t discard).',
          ],
          callout: {
            type: 'exam',
            text: 'The four LINE assumptions, in order of exam frequency: **Linearity** (scatter first!), **Independence** of errors (no autocorrelation — time series: Durbin–Watson ≈ 2), **Normality** of residuals (histogram/normal-prob plot), **Equal variance** (homoscedastic — residuals vs fitted should be a formless band; a funnel shape = heteroscedasticity, suspicious significance). Break linearity and every number downstream is fiction.',
          },
        },
        {
          heading: '2. Multiple regression, dummies, and the causation boundary',
          body: [
            '**Multiple regression** ŷ = b₀ + b₁x₁ + … + bₖxₖ: each coefficient is the effect of ITS variable **holding the others constant** — that "controlled" is the entire value (the ad-sales relation changes when you control for seasonality; the omitted-variable bias disappears when the confounder enters the model). Build a small forecaster: sales ~ ad spend + price + festival dummy + Q2/Q3/Q4 dummies. **Dummy variables**: k categories need k−1 binaries (one is the base — its effect lives in the intercept); the dummy coefficient = shift vs the base quarter. Interpretation drill on output: "₹1L more ad spend → +₹2.4L sales, price and season held constant (p=.003); festival week adds ₹18L (p=.01)". Prediction: feed next quarter\'s inputs into the fitted equation; report the standard error band, not the point alone.',
            '**Correlation ≠ causation — the discipline**: regression finds CONDITIONAL ASSOCIATION; causal claims need design — randomisation (A/B tests, lecture 4), natural experiments, or explicit causal graphs (BA02/BA04 territory: difference-in-differences, IV). The deadly trio: **confounders** (ice cream & drownings — heat drives both; fix: control for the confounder), **reverse causality** (do police cause crime?), **selection bias** (only observed units enter). Spurious correlation generators are legendary (US cheese consumption vs deaths-by-bedsheets) — the statistical relationship is real, the causal story absent. Business rule: use regression for PREDICTION freely (the model need not be causal to forecast); demand causal design before using it for POLICY ("raise ads 10% → sales +2.4L" is only licensed by an experiment).',
          ],
          bullets: [
            'r: linear only, [−1,1]; R² = explained variance share; always scatter first',
            'Slope b = r·(sy/sx); Y-on-X ≠ X-on-Y (each minimises its own direction)',
            'Adjusted R² compares models; raw R² rewards junk predictors',
            'Coefficient p < .05 → keep; standard error of regression = typical forecast error',
            'LINE: linearity, independence, normality, equal variance — check residuals',
            'Multiple regression = each coefficient "holding others constant"',
            'k categories → k−1 dummies; coefficient = shift vs base',
            'Predict freely; prescribe only with causal design',
          ],
        },
      ],
      diagram: {
        title: 'Scatter, line, residuals — and the two regression lines',
        caption: 'Left: least squares absorbs vertical errors; the residual is what the line misses. Right: Y-on-X and X-on-Y cross at (x̄, ȳ) and disagree everywhere else.',
        svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Regression lines and residuals">
  <g font-family="inherit" font-size="11">
    <rect x="20" y="14" width="330" height="216" fill="#f8fafc" rx="10"/>
    <text x="40" y="36" fill="#334155" font-weight="600">least squares: minimise vertical errors</text>
    <circle cx="80" cy="180" r="4" fill="#2563eb"/><circle cx="110" cy="160" r="4" fill="#2563eb"/><circle cx="140" cy="168" r="4" fill="#2563eb"/><circle cx="165" cy="130" r="4" fill="#2563eb"/><circle cx="195" cy="120" r="4" fill="#2563eb"/><circle cx="225" cy="96" r="4" fill="#2563eb"/><circle cx="255" cy="90" r="4" fill="#2563eb"/><circle cx="285" cy="60" r="4" fill="#2563eb"/><circle cx="310" cy="52" r="4" fill="#2563eb"/>
    <line x1="70" y1="190" x2="320" y2="45" stroke="#dc2626" stroke-width="2.5"/>
    <line x1="255" y1="90" x2="255" y2="117" stroke="#0891b2" stroke-width="2" stroke-dasharray="4 3"/>
    <text x="262" y="110" fill="#0891b2">residual = y − ŷ</text>
    <text x="120" y="210" fill="#475569">ŷ = a + bx · slope b, intercept a</text>
    <rect x="380" y="14" width="320" height="216" fill="#f8fafc" rx="10"/>
    <text x="400" y="36" fill="#334155" font-weight="600">two regression lines</text>
    <circle cx="470" cy="180" r="4" fill="#7c3aed"/><circle cx="500" cy="150" r="4" fill="#7c3aed"/><circle cx="530" cy="150" r="4" fill="#7c3aed"/><circle cx="560" cy="110" r="4" fill="#7c3aed"/><circle cx="590" cy="95" r="4" fill="#7c3aed"/><circle cx="620" cy="70" r="4" fill="#7c3aed"/><circle cx="650" cy="72" r="4" fill="#7c3aed"/>
    <line x1="450" y1="196" x2="670" y2="40" stroke="#16a34a" stroke-width="2.5"/>
    <line x1="440" y1="206" x2="680" y2="86" stroke="#ea580c" stroke-width="2.5"/>
    <circle cx="560" cy="118" r="6" fill="none" stroke="#334155" stroke-width="2"/>
    <text x="572" y="132" fill="#334155">(x̄, ȳ) — lines cross here</text>
    <text x="452" y="66" fill="#16a34a">Y on X (predict Y)</text>
    <text x="580" y="200" fill="#ea580c">X on Y (predict X)</text>
    <text x="400" y="224" fill="#475569">same data, two questions, different slopes (r &lt; 1)</text>
  </g>
</svg>`,
      },
      formulas: [
        { name: 'Correlation', expr: 'r = CORREL(x, y) ∈ [−1, 1]', meaning: 'Standardised linear association' },
        { name: 'Slope & intercept', expr: 'b = r·(s_y/s_x) · a = ȳ − b·x̄', meaning: 'Least-squares line' },
        { name: 'R² / adjusted R²', expr: 'R² = 1 − SSE/SST · adj R² = 1 − (1−R²)(n−1)/(n−k−1)', meaning: 'Fit quality, penalised' },
        { name: 'Multiple regression', expr: 'ŷ = b₀ + b₁x₁ + … + bₖxₖ', meaning: 'Effects holding others constant' },
        { name: 'Dummies', expr: 'k categories → k−1 binaries', meaning: 'Categoricals in regression' },
      ],
      examples: [
        {
          title: 'Ad spend → sales, end to end',
          given: ['24 months: ad spend (₹L) and sales (₹L); r = 0.86; s_sales = 38, s_ad = 12; x̄ = 40, ȳ = 310', 'Regression output: intercept 154 (p .001), slope 3.9 (p < .001), R² .74, SE of regression 21'],
          steps: [
            { text: 'Slope check', calc: 'b = r·sy/sx = 0.86×38/12 ≈ 2.7… vs output 3.9 — discrepancy means the output included other predictors or months differ; trust the OUTPUT (multi-variable) and read its meaning' },
            { text: 'Simple model', calc: 'Sales = 154 + 3.9·Ad: ₹1L more ads → +₹3.9L sales, month-to-month noise ±₹21L typical' },
            { text: 'Fit', calc: 'R² .74 → ads explain ~74% of monthly sales variance; forecast band ±~₹42L at 95%' },
            { text: 'Predict', calc: 'Next month ads ₹52L → 154 + 3.9(52) = ₹357L ± 42 — report the band, never the point' },
            { text: 'Diagnostics', calc: 'Residuals vs fitted: funnel shape → heteroscedasticity (variance grows with sales) → log-transform sales or weighted LS before trusting the p-values' },
          ],
          answer: 'Coefficient + precision + band + diagnostics = a regression anyone can act on.',
        },
        {
          title: 'Add dummies: seasonality enters the model',
          given: ['Same data + quarter dummies Q2, Q3, Q4 (Q1 base) + festival flag', 'New output: Ad 2.6 (p .004) · Q2 +21 (p .03) · Q3 +34 (p .006) · Q4 +52 (p .001) · Festival +19 (p .02) · Adj R² .88'],
          steps: [
            { text: 'Read the shift', calc: 'Q4 adds ₹52L vs an identical Q1 month; festival week adds ₹19L — planning numbers, not correlations' },
            { text: 'Ad effect falls', calc: '3.9 → 2.6: Q4 ad bursts were inflating the naive slope — omitted-variable bias in action' },
            { text: 'Model comparison', calc: 'Adj R² .74 → .88 — the dummies earn their keep (raw R² would have risen anyway; adjusted is the honest judge)' },
            { text: 'Forecast', calc: 'Q4, festival, ads 50: 142 + 2.6(50) + 52 + 19 = ₹344L with a tighter band' },
          ],
          answer: 'Dummies convert a calendar into coefficients — and the ad coefficient becomes trustworthy once season stops masquerading as advertising.',
        },
      ],
      caseStudy: {
        title: 'Case — The ₹2-crore correlation: price discounts "caused" churn',
        body: [
          'A telecom analyst regresses churn on discount depth across 40 circles: r = −0.62 — deeper discounts, LOWER churn. The CMO proposes ₹2 cr/month of deeper discounts to cut churn 15%.',
          'A natural experiment intervenes: two circles ran out of promo budget in one month (discount forced to zero for new renewals — close to random assignment). Churn in those circles barely moved (−1%), while a matching-pair analysis showed the discount effect near zero.',
          'The original r was confounded: promo budget was allocated to HIGH-VALUE, ENGAGED circles — engagement caused both discounts and loyalty.',
        ],
        questions: [
          'Name the bias that produced r = −0.62.',
          'Why did the budget-outage month function as an experiment?',
          'What regression + design would have prevented the ₹2 cr proposal?',
        ],
        takeaways: [
          'Omitted-variable/confounder bias: engagement drove both discount depth and retention; correlation absorbed the confounder',
          'The outage was as-good-as-random assignment to discount levels — a natural experiment; the difference in churn isolates the causal effect in a way no observational slope can',
          'Prevention: control for engagement (usage, tenure, ARPU) in the multiple regression AND test causal claims with experiments/diff-in-diff before spending',
          'Rule: regression coefficients are conditional associations — promoted to causal claims only by design; prediction (forecast churn) is safe, prescription (set discounts) needs randomisation',
        ],
      },
      revision: [
        'r = linear association, [−1,1]; scatter FIRST (Anscombe)',
        'R² = explained share; adjusted R² for model comparison',
        'b = r·sy/sx; a = ȳ − b·x̄; least squares = vertical errors',
        'Y-on-X ≠ X-on-Y — each predicts its own dependent variable',
        'Output: coefficient, SE, p (keep if < .05), SE of regression = typical error',
        'LINE assumptions via residual plots; funnel = heteroscedasticity',
        'Multiple regression: "holding others constant"; omitted-variable bias',
        'k categories → k−1 dummies; coefficient = shift vs base',
        'Confounding, reverse causality, selection — the causal trio',
        'Predict with association; prescribe only with randomisation/design',
      ],
      practice: [
        { q: 'r = 0.5 between ad spend and sales. Someone reports "25% of sales explained". Correct?', a: 'Yes — R² = r² = 0.25 in SIMPLE regression. In multiple regression, R² is computed from the model (1 − SSE/SST) and exceeds any single r².' },
        { q: 'Height and salary correlate r = 0.3 in a dataset of CEOs. Two hypotheses?', a: 'Causal-chain confounding (height proxies for confidence/discrimination early in career) or common causes (nutrition, schooling). Nothing in r licenses "grow taller → earn more"; find the mechanism or the design.' },
        { q: 'Your model\'s adjusted R² rises when you DELETE a predictor. Verdict?', a: 'The predictor\'s explanatory power was less than its penalty — it was noise (or collinear with better predictors). Delete it; simpler models generalise better (overfitting guard — the bridge to BA02 forecasting).' },
        { q: 'r = 0.8 between ad spend and sales. Someone claims ads cause 80 percent of sales. Correct both errors.', a: 'r-squared (0.64), not r, is the explained share - and even that is association, not causation: seasonality or pricing could drive both. Only designed experiments identify causation.' },
        { q: 'Two regression lines: sales-on-ads and ads-on-sales. Why are they different?', a: 'Each least-squares line minimises errors in its own dependent variable\'s direction; they coincide only when r is plus or minus 1. Predicting sales requires sales-on-ads - mixing them is the classic trap.' },
      ],
    },
  ],
};
