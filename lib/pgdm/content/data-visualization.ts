import type { Lecture } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM BA01 — Data Visualization for Managers
   Unit-wise lectures: viz overview + Power BI → Tableau basics →
   calculations & filters → dashboards & stories → trends & ethics
   ═══════════════════════════════════════════════════════════════ */

export const dataVisualizationLectures: Lecture[] = [
  {
    slug: 'visualization-overview-power-bi',
    number: 1,
    title: 'Visualization Overview, Perception & Power BI',
    minutes: 45,
    summary:
      'Why visualisation works and when it fails: the need for visualisation, types and benefits, perception research (pre-attentive attributes, Gestalt), design principles and standards, effective vs ineffective visuals, data models and variables, data ethics — and the Power BI workflow: tables, dashboards, reports, AI insights and Q&A.',
    status: 'live',
    objectives: [
      'Explain why visual encoding beats tables for specific questions',
      'Apply perception research: pre-attentive attributes and Gestalt laws',
      'Separate effective from ineffective visuals with named criteria',
      'Build the Power BI basics: data model, report, AI insights, Q&A',
    ],
    sections: [
      {
        heading: '1. Perception and design principles',
        body: [
          'Why visualise: the human visual cortex processes position/colour/shape pre-attentively (within ~250 ms, without conscious search) — **Anscombe\'s quartet**: four datasets identical means/variances/correlation (0.816) yet wildly different shapes; the table lies by omission, the scatter tells the truth. Benefits: pattern detection (trends, outliers, clusters), communication (a chart lands faster than a paragraph), exploration (hypothesis generation before testing — BA06 links), monitoring (dashboards). Types by question: comparison (bar), distribution (histogram/box), relationship (scatter), composition over time (stacked/area), geography (choropleth), flow (sankey/funnel).',
          '**Perception** facts that govern design: **Stevens\' power law** — position and length are judged most accurately; angle/slope less; area worse; colour-volume worst — hence bars beat pies, and pies beat donuts-of-3D-cakes never. **Pre-attentive attributes**: colour hue, intensity, size, orientation, motion — use ONE to highlight the message (the red bar in a grey series). **Gestalt laws**: proximity (group by space), similarity (same colour = same class), enclosure (boxes), connection (lines), continuity, closure. **Design principles/standards**: Tufte\'s data-ink ratio (maximise ink that carries data; erase chartjunk), lie factor = (size of effect shown)/(size of effect in data) = 1 for honest charts, Tukey\'s exploratory ethos; Cleveland & McGill\'s ranking of encodings; accessibility (colour-blind-safe palettes — never red/green alone); labelled axes/units/titles as claims ("Sales fell 12% after the price rise" beats "Sales"). **Effective vs ineffective** checklist: right chart for question ✓ honest baseline ✓ no dual-axis traps ✓ labelled directly (no legend hunting) ✓ one message per chart ✓ — the anti-patterns: 3-D, truncated bars, rainbow colour, gauge gauges, ten-slice pies.',
        ],
        callout: {
          type: 'exam',
          text: 'Memorise the encoding-accuracy ladder (Cleveland–McGill, via Stevens): POSITION > LENGTH > ANGLE > AREA > COLOUR-VOLUME > COLOUR HUE (for magnitude). Exam questions: "which chart for comparing 7 categories" (bar: length) vs "share of 4" (pie ok) vs "3-D exploded pie" (never — area/volume distortion). Anscombe\'s quartet is the one-example proof of why visualisation precedes statistics.',
        },
      },
      {
        heading: '2. Data models, ethics and the Power BI workflow',
        body: [
          '**Data models & variables**: every visualisation sits on a model — tables, fields, types: **categorical/nominal** (region, product), **ordinal** (small/medium/large), **numeric interval/ratio** (revenue, temperature), **time**; measures vs dimensions; star schemas (fact table of events + dimension tables — the model Power BI/Tabular wants; relationships one-to-many; avoid many-to-many surprises). **Data ethics**: consent and provenance (whose data is this?), privacy (aggregate to protect individuals — small-N suppression), bias in collection (survivorship, sampling), representation harms (choropleths that stigmatise regions), uncertainty communication (show intervals, not false precision) — links BA06 Unit 1 and BA05 Unit 1.',
          '**Power BI workflow**: (1) **Power Query** — connect (Excel/CSV/web/SQL), clean (types, splits, unpivot — the single most powerful transform: wide months-table → tidy date rows), model; (2) relationships form the star; (3) **report canvas** — visuals (tables, matrices, cards, bar/line/scatter/map, decomposition tree), slicers, bookmarks; DAX measures (SUM/SUMX, CALCULATE — filter context is the core concept); (4) **dashboards** pin live tiles from reports (a dashboard is a monitoring surface; a report is an analysis surface); (5) **AI insights**: key influencers (drivers of a selected outcome), decomposition tree, anomaly detection, smart narratives (auto-generated text), Q&A visual (natural language → chart — great for execs, dangerous when the model is badly named); Power BI Service: refresh schedules, RLS (row-level security — the ethics enforcement point). The professional standard: name fields in business language before enabling Q&A.',
        ],
        bullets: [
          'Pre-attentive attributes: use ONE to carry the message',
          'Encoding ladder: position > length > angle > area > colour',
          'Gestalt: proximity, similarity, enclosure, connection',
          'Data-ink ratio; lie factor = 1; no chartjunk; label axes/units',
          'Anti-patterns: 3-D, truncated baselines, dual axes, rainbow, gauge',
          'Star schema: facts + dimensions; tidy data (unpivot) before visuals',
          'Ethics: consent, aggregate small-N, sampling bias, show uncertainty',
          'Power BI: Power Query → model → report → dashboard → Service/RLS',
          'AI insights: key influencers, decomposition tree, anomalies, Q&A',
        ],
      },
    ],
    diagram: {
      title: 'The Power BI workflow and the encoding ladder',
      caption: 'Data flows through Query and Model to the report; the encoding ladder decides which visual deserves the message.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Power BI workflow">
  <defs><marker id="da" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="16" y="40" width="130" height="56" rx="10" fill="#e0f2fe"/><text x="81" y="62" fill="#0c4a6e" font-weight="600">Connect</text><text x="81" y="80" fill="#075985">Excel · SQL · web</text>
    <rect x="170" y="40" width="130" height="56" rx="10" fill="#bbf7d0"/><text x="235" y="62" fill="#14532d" font-weight="600">Power Query</text><text x="235" y="80" fill="#166534">clean · unpivot</text>
    <rect x="324" y="40" width="130" height="56" rx="10" fill="#fef9c3"/><text x="389" y="62" fill="#713f12" font-weight="600">Model</text><text x="389" y="80" fill="#a16207">star · relationships</text>
    <rect x="478" y="40" width="130" height="56" rx="10" fill="#fed7aa"/><text x="543" y="62" fill="#9a3412" font-weight="600">Report</text><text x="543" y="80" fill="#c2410c">visuals · DAX · slicers</text>
    <rect x="610" y="40" width="94" height="56" rx="10" fill="#fee2e2"/><text x="657" y="62" fill="#7f1d1d" font-weight="600">Service</text><text x="657" y="80" fill="#991b1b">share · RLS</text>
    <line x1="146" y1="68" x2="168" y2="68" stroke="#475569" stroke-width="1.5" marker-end="url(#da)"/>
    <line x1="300" y1="68" x2="322" y2="68" stroke="#475569" stroke-width="1.5" marker-end="url(#da)"/>
    <line x1="454" y1="68" x2="476" y2="68" stroke="#475569" stroke-width="1.5" marker-end="url(#da)"/>
    <line x1="608" y1="68" x2="608" y2="68" stroke="none"/>
    <line x1="600" y1="68" x2="608" y2="68" stroke="#475569" stroke-width="1.5" marker-end="url(#da)"/>
    <rect x="40" y="150" width="640" height="76" rx="12" fill="#f8fafc"/>
    <text x="360" y="174" fill="#334155" font-weight="600">ENCODING ACCURACY LADDER — pick the highest rung your question allows</text>
    <text x="360" y="198" fill="#475569">position → length → angle → area → colour-volume → hue</text>
    <text x="360" y="216" fill="#475569">scatter/bars best · pies only for ≤5 shares · 3-D never</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Data-ink ratio', expr: 'ink(data) / ink(total) → maximise', meaning: 'Tufte\'s parsimony test' },
      { name: 'Lie factor', expr: '(effect shown in size) / (effect in data) — honest = 1', meaning: 'Distortion detector' },
      { name: 'Pre-attentive pop', expr: 'highlight = 1 attribute × 1 element', meaning: 'One message per chart' },
    ],
    examples: [
      {
        title: 'Anscombe audit: table vs scatter',
        given: ['Four datasets: means x̄=9, ȳ=7.5; σ same; r = 0.816; identical regression ŷ = 3 + 0.5x'],
        steps: [
          { text: 'The table says', calc: 'All four "identical" — a manager reading the summary approves the model' },
          { text: 'The scatters say', calc: 'I: normal cloud; II: a perfect curve (linear model wrong); III: one outlier drives the slope; IV: all variance from one x — regression meaningless' },
          { text: 'Decision consequences', calc: 'Same fitted line, four different forecasting policies — the visual is the model-check' },
          { text: 'Rule', calc: 'Plot before you model; every regression gets its residual scatter (BA06 L5 links)' },
        ],
        answer: 'Summary statistics compress; visuals reveal what the compression destroyed — the founding argument for this subject.',
      },
      {
        title: 'Rescue a broken executive chart',
        given: ['Current: 3-D exploding pie, 9 slices, legend on the right, rainbow colours, title "Revenue"'],
        steps: [
          { text: 'Diagnose', calc: 'Area/volume encoding (worst rungs) + 9 categories (over pie limit) + legend hunting + title with no claim' },
          { text: 'Redesign', calc: 'Horizontal sorted bar: top 5 named + "others"; one accent colour on the story slice; direct value labels; title "Product A alone drives 42% of FY25 revenue"' },
          { text: 'Why bars', calc: 'Length (2nd-best encoding) with a common baseline — comparisons read in milliseconds' },
          { text: 'Add the second chart', calc: 'Trend line by month for the hero product — composition + trend = the full story' },
        ],
        answer: 'Sort, simplify, label directly, claim in the title — the four rescue moves that fix 90% of bad charts.',
      },
    ],
    caseStudy: {
      title: 'Case — The dashboard nobody used',
      body: [
        'A BI team ships a 14-tile dashboard: gauges, pies, dual-axis lines, red-green conditional colouring, auto-refresh. Adoption after 3 months: near zero. Interviews: "I can\'t find my region", "which number do I act on?", "colours look broken" (two regional heads are colour-blind).',
        'A redesign: one persona (regional sales head), three decisions (chase which laggard, approve which discount, escalate which stock-out), five charts — sorted bars, one trend, a decomposition tree, a map — with a claimed title per tile and a slicer defaulting to the user\'s region (RLS). Adoption triples in six weeks.',
      ],
      questions: [
        'Which design failures killed version 1?',
        'Why did "decisions first" restructure the layout?',
        'What does the accessibility miss cost?',
      ],
      takeaways: [
        'Failure inventory: no audience/persona, gauges+dual axes+pies (low rungs), no visual hierarchy (nothing pre-attentive), colour-only encoding (8% male colour-blindness — and red-green exactly the trap), no claims',
        'Dashboards are decision surfaces, not data wallpaper: design backwards from the three actions the persona must take — chart count falls, usage rises',
        'Defaults matter: landing filtered to "my region" removes the first 30 seconds of friction — the analytics adoption battle is behavioural (F01\'s domain)',
        'Ethics/quality crossover: small-N suppression (a region with 3 customers reveals individuals) and honest baselines — the redesign session is where ethics gets implemented',
      ],
    },
    revision: [
      'Why visualise: pre-attentive processing; Anscombe\'s quartet proof',
      'Encoding ladder: position > length > angle > area > hue; bars > pies; 3-D never',
      'Gestalt: proximity, similarity, enclosure, connection, continuity',
      'Tufte: data-ink ratio, chartjunk, lie factor = 1',
      'Anti-patterns: truncated baselines (bars), dual axes, rainbow, gauges, 9-slice pies',
      'Variables: nominal, ordinal, interval/ratio, time; facts vs dimensions; star schema',
      'Ethics: consent, aggregate small-N, sampling bias, uncertainty bands',
      'Power BI: Power Query → model → report (DAX CALCULATE) → dashboard → Service',
      'AI insights: key influencers, decomposition tree, anomalies, Q&A (name fields well)',
      'Dashboard = decision surface: persona → decisions → charts',
    ],
    practice: [
      { q: 'You must show "market share of 5 telecom players, this quarter". Pie or bar?', a: 'Either works (≤5, one period); the bar is safer — sorted, labelled, colour-blind-proof; the pie adds only if the "part of whole" reading is essential. Never 3-D. Lead with a claimed title: "Top-2 players hold 63%".' },
      { q: 'What is a Power BI "measure" vs a "column"?', a: 'Column = row-level calculated value stored in the table (e.g., margin per order line); measure = DAX expression evaluated at query time in filter context (e.g., total margin, margin %) — measures respond to slicers and are the analytics layer; heavy row logic in columns bloats the model.' },
      { q: 'A chart shows revenue up 40% but the axis starts at 90%. Assess.', a: 'Lie factor: visual effect (bar nearly doubled) vs data effect (40%) — distortion by truncation. Acceptable only for line charts with flagged baselines; for bars the baseline must be zero or the reader is being manipulated.' },
      { q: 'Your CEO wants a gauge chart for market share. Push back or comply?', a: 'Comply with a caveat or better: angles decode poorly (Cleveland-McGill), so offer a big number with a benchmark bar - share vs rival as length reads instantly, the gauge is decoration.' },
      { q: 'In Power BI, why does the same measure show different values on different visuals?', a: 'Each visual carries its own filter context (slicer, axis, cross-highlight). DAX measures evaluate inside that context - the number is right in each place, computed for different subsets.' },
    ],
  },
  {
    slug: 'tableau-fundamentals-prep',
    number: 2,
    title: 'Tableau Fundamentals: Connections, Data Types & Prep',
    minutes: 40,
    summary:
      'The Tableau interface and paradigm (VizQL — drag and drop to query), data connections and live vs extract, data types and roles (dimension vs measure, discrete vs continuous), preparing text and Excel files, basic charts, and Tableau Prep for cleaning.',
    status: 'live',
    objectives: [
      'Navigate the Tableau paradigm: shelves, marks, VizQL',
      'Choose live vs extract with reasons',
      'Classify fields: dimension/measure × discrete/continuous',
      'Prepare messy Excel/text data and clean it with Tableau Prep',
    ],
    sections: [
      {
        heading: '1. The Tableau paradigm',
        body: [
          'Tableau\'s core idea: every drag-and-drop IS a query (VizQL translates marks onto shelves). Interface anatomy: **Data pane** (dimensions above — blue pills; measures below — green pills), **shelves** (Columns/Rows), **Marks card** (colour, size, label, detail, tooltip, shape), **Filters**, Show Me (chart suggestions — use as a learner, outgrow it fast), sheets → dashboards → stories (Unit 4). Mental model: dimensions slice; measures aggregate (SUM by default — change deliberately to AVG/MEDIAN/COUNT DISTINCT).',
          'Field types, the exam favourite: **dimension** (categorical — slices: Region, Product) vs **measure** (numeric — aggregates: Sales); **discrete** (blue — headers/categories) vs **continuous** (green — axes/ranges). The 2×2: continuous date on Columns = axis with a line; DISCRETE date = headers per month (bars) — same data, different question. **Connections**: file (Excel/CSV) or server (SQL, cloud); **live** (query at source — always fresh, load on the DB) vs **extract** (.hyper — fast aggregation, offline, incremental refresh; enable for big data or slow sources). Data types: number (decimal/whole), string, date, datetime, boolean, geographic (auto-recognised — maps in Unit 3); roles convertible (# icon/Abc).',
        ],
        callout: {
          type: 'exam',
          text: 'The pill-colour quiz: BLUE = discrete (headers, categorical layout); GREEN = continuous (axes, ranges). Dimension vs measure is about WHAT (category vs number); discrete vs continuous is about HOW it lays out (headers vs axis). Convert by right-click; the four combinations of a Date field answer four different questions — memorise the 2×2.',
        },
      },
      {
        heading: '2. Preparation and cleaning',
        body: [
          '**Preparing text & Excel files**: the Data Interpreter (banishes merged-cell headers and footnotes in Excel), header-row promotion, data-type fixes BEFORE charts (strings that should be numbers — the "1,234" comma trap), split (auto/custom delimiter — "City, State"), pivot (wide→tidy), join/union in the physical layer; alias values; hide unused columns. Every cleaning step lives in the data source page and is REPLAYABLE (the extract refresh re-runs the script — reproducibility is the professional difference from hand-cleaning).',
          '**Tableau Prep**: purpose-built cleaning flow — steps: input → clean (profile pane shows value distributions, nulls, outliers instantly) → aggregate/join/union/pivot → output (hyper extract or published data source). Prep\'s killer feature: the PROFILE — you SEE the nulls, the duplicate city spellings ("Mumbai"/"mumbai "/"Bombay"), the 999-codes-as-nulls, before they become wrong charts. Group-and-replace (manual or fuzzy) fixes spellings; fixed calculations standardise (TRIM, UPPER, DATEPARSE for "12-Mar-25" strings). Workflow discipline: raw file → cleaned extract → published source → everyone builds on the same truth (governance — Unit 5 ethics link).',
        ],
        bullets: [
          'Drag = query; shelves + Marks card generate VizQL',
          'Dimensions slice (blue pills); measures aggregate (green, SUM default)',
          'Discrete = headers; continuous = axes; the date 2×2 is the exam',
          'Live = fresh + DB load; extract = fast + offline + incremental',
          'Interpreter, split, pivot (wide→tidy), type fixes — all replayable',
          'Prep: profile pane sees nulls/spellings; group-replace; output hyper',
          'Publish one governed source — everyone charts the same truth',
        ],
      },
    ],
    diagram: {
      title: 'The pill 2×2 and the prep flow',
      caption: 'Left: the dimension/measure × discrete/continuous grid that answers "why did my chart change shape?". Right: the Prep pipeline from raw files to a governed extract.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tableau pill types and prep flow">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="16" y="16" width="330" height="216" rx="12" fill="#f8fafc"/>
    <text x="181" y="38" fill="#334155" font-weight="600">THE PILL 2×2 (Date field)</text>
    <rect x="40" y="56" width="140" height="70" rx="9" fill="#e0f2fe"/><text x="110" y="78" fill="#0c4a6e" font-weight="600">DISCRETE</text><text x="110" y="96" fill="#075985">blue pill · headers</text><text x="110" y="112" fill="#075985">bars per month</text>
    <rect x="192" y="56" width="140" height="70" rx="9" fill="#dcfce7"/><text x="262" y="78" fill="#14532d" font-weight="600">CONTINUOUS</text><text x="262" y="96" fill="#166534">green pill · axis</text><text x="262" y="112" fill="#166534">trend line</text>
    <text x="110" y="148" fill="#475569" font-size="11">DIMENSION = slices (blue zone)</text>
    <text x="110" y="166" fill="#475569" font-size="11">MEASURE = aggregates (green zone)</text>
    <text x="181" y="196" fill="#7c2d12" font-size="11">same data, four layouts — the question picks</text>
    <text x="181" y="214" fill="#7c2d12" font-size="11">right-click pill to convert</text>
    <rect x="380" y="56" width="76" height="56" rx="10" fill="#e0f2fe"/><text x="418" y="78" fill="#0c4a6e" font-weight="600">Input</text><text x="418" y="96" fill="#075985">raw files</text>
    <rect x="472" y="56" width="76" height="56" rx="10" fill="#fef9c3"/><text x="510" y="78" fill="#713f12" font-weight="600">Clean</text><text x="510" y="96" fill="#a16207">profile</text>
    <rect x="564" y="56" width="76" height="56" rx="10" fill="#fed7aa"/><text x="602" y="78" fill="#9a3412" font-weight="600">Pivot/Join</text><text x="602" y="96" fill="#c2410c">tidy</text>
    <rect x="656" y="56" width="56" height="56" rx="10" fill="#fee2e2"/><text x="684" y="78" fill="#7f1d1d" font-weight="600">Out</text><text x="684" y="96" fill="#991b1b">.hyper</text>
    <line x1="456" y1="84" x2="470" y2="84" stroke="#475569" stroke-width="1.5"/>
    <line x1="548" y1="84" x2="562" y2="84" stroke="#475569" stroke-width="1.5"/>
    <line x1="640" y1="84" x2="654" y2="84" stroke="#475569" stroke-width="1.5"/>
    <text x="560" y="150" fill="#475569">publish ONE governed source</text>
    <text x="560" y="168" fill="#475569">reproducible: refresh replays</text>
    <text x="560" y="186" fill="#475569">the whole cleaning flow</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Pill logic', expr: 'Dimension = slice · Measure = aggregate (SUM/AVG/COUNTD)', meaning: 'The building grammar' },
      { name: 'Extract vs live', expr: 'Extract (fast, offline, incremental) vs Live (fresh, DB load)', meaning: 'Connection choice' },
      { name: 'Tidy data rule', expr: '1 variable per column · 1 observation per row', meaning: 'Pivot target shape' },
    ],
    examples: [
      {
        title: 'The same date field, four questions',
        given: ['Monthly sales data with Order Date and Sales'],
        steps: [
          { text: 'Q: trend?', calc: 'Continuous (green) YEAR/MONTH on Columns + SUM(Sales) on Rows → line with axis' },
          { text: 'Q: compare months?', calc: 'Discrete (blue) MONTH on Columns → headers → bars' },
          { text: 'Q: by year × quarter?', calc: 'Discrete YEAR then QUARTER on Columns → nested headers' },
          { text: 'Q: growth rate?', calc: 'Continuous month + table-calculation (RUNNING/SUM or % difference) — Unit 3 territory' },
        ],
        answer: 'One field, four layouts: the pill colour IS the design decision.',
      },
      {
        title: 'Rescue a monthly Excel report file',
        given: ['Excel: merged title cells, months as COLUMNS (Jan–Dec across), a footnote row, "1,234" formatted numbers'],
        steps: [
          { text: 'Interpreter + header', calc: 'Data Interpreter clears merged title/notes; promote row 3 as headers' },
          { text: 'Unpivot', calc: 'Select the 12 month columns → Pivot → [Month] rows × [Value] column — tidy: one row per region-month' },
          { text: 'Types & parse', calc: 'Value → number (comma handling), Month → DATEPARSE("MMM", [Month]) with YEAR from the file name; TRIM/UPPER the region names' },
          { text: 'Publish', calc: 'Output a .hyper extract as the governed source — refresh replays all steps; no more hand-cleaning every month' },
        ],
        answer: 'Interpreter → pivot → parse → publish: the monthly file becomes a self-updating pipeline.',
      },
    ],
    caseStudy: {
      title: 'Case — The five sales reports that disagreed',
      body: [
        'Five regional managers each maintain their own Excel export from the CRM. At the monthly review, "North revenue" reads ₹41.2 cr, ₹39.8 cr, ₹43.0 cr, ₹40.5 cr and ₹42.1 cr — same month, same region. Causes found: different pull dates, "Delhi/NCR" vs "Delhi" spellings, one manager excluded cancelled orders, another included pending.',
      ],
      questions: [
        'What is the root cause — technical or organisational?',
        'Which Prep/Tableau features fix it?',
        'What governance prevents recurrence?',
      ],
      takeaways: [
        'Root cause: no single governed definition — the technical mess (spellings, dates, filters) is a symptom of undefined metrics ("revenue" = which orders, as of when?)',
        'Fixes: one published data source (extract refresh), group-and-replace for spellings, a filter locked at source, and a data dictionary naming each measure',
        'Governance: certified data sources (badge in Server), single owner per metric, extract refresh schedule — visualisation ethics begins before the first chart',
        'Lesson: in practice, 70–80% of visualisation work is preparation — the syllabus puts Prep here for that reason',
      ],
    },
    revision: [
      'VizQL: drag-and-drop = query; shelves and Marks card',
      'Dimension (blue zone, slices) vs Measure (green, aggregates)',
      'Discrete (blue, headers) vs continuous (green, axes); date 2×2',
      'Live vs extract: freshness/DB load vs speed/offline/incremental',
      'Types: number, string, date, datetime, boolean, geo (auto-maps)',
      'Interpreter, split, pivot, join/union — replayable cleaning',
      'Prep: profile pane; group-replace (fuzzy); DATEPARSE/TRIM/UPPER',
      'Tidy data: variable per column, observation per row',
      'Publish certified sources; metric definitions in a data dictionary',
    ],
    practice: [
      { q: 'Your bar chart of months shows SUM(Sales) with gaps. Why?', a: 'Likely the date pill is CONTINUOUS (axis with empty slots for missing months) — convert to DISCRETE for headers, or check nulls/missing months in the data (Prep profile shows them immediately).' },
      { q: 'When is a live connection the right choice over an extract?', a: 'Real-time operational needs (intraday inventory, support queues), small-to-moderate data, and strong DB capacity — freshness beats speed; extracts win for large/slow sources, offline work, and heavy aggregation.' },
      { q: '"Mumbai", "mumbai ", and "Bombay" appear in the City field. Fix at which layer?', a: 'At Prep/source: group-and-replace (fuzzy match) with a documented mapping; fixing only in the chart (aliases) leaves every future dashboard wrong — clean at the source, alias only for display.' },
      { q: 'Excel has a merged-cell header block and monthly sheets. How do you get this into Tableau cleanly?', a: 'Do not fight it in Tableau - clean in Prep or Power Query: unmerge, promote one header row, pivot the monthly columns into a Month field, union the sheets into one tidy table (one row per month per entity).' },
      { q: 'Live connection versus extract - when would you pick each?', a: 'Live for small, real-time operational data on a fast source; extract (hyper) for large slow sources, complex calculations and offline work - refresh on schedule. Volume plus freshness decides.' },
    ],
  },
  {
    slug: 'tableau-calculations-filters-forecasting',
    number: 3,
    title: 'Tableau Calculations, Filters, Sets, Maps & Forecasting',
    minutes: 45,
    summary:
      'The analytical layer: geographic mapping, filter types and order of operations, parameters, groups and sets, trend lines and reference lines, annotations, table calculations and LOD expressions, forecasting, and R/Python integration via TabPy.',
    status: 'live',
    objectives: [
      'Build maps: symbols, filled, dual-axis with layers',
      'Apply the correct filter type and respect order of operations',
      'Drive interactivity with parameters, groups, and sets',
      'Compute table calcs and LODs; add trend, reference lines, forecast; call R/Python',
    ],
    sections: [
      {
        heading: '1. Maps, filters, parameters, sets',
        body: [
          '**Maps**: Tableau auto-recognises geographic fields (the globe icon) — assign roles (city/state/pincode) when recognition fails. Types: symbol maps (points — stores), **filled/choropleth** (regions shaded by measure — normalise! shade by per-capita, not totals, or you just map population), dual-axis (points + shading), density/heatmaps, and multiple data LAYERS (spatial files, drive-time). WMS/background images for custom geographies. Map layer ethics: scales matter — sequential palette for magnitude, diverging only around a meaningful midpoint.',
          '**Filters, by scope**: extract (source-level), data-source, context (indexed — the fix for "my TOP N ignores my date filter"), dimension (aggregate after; can be wildcards/conditions/top-N), measure (range sliders), table-calc filters (last). **Order of operations** (the exam): extract → data-source → context → dimension → measure → table-calcs — a Top-10 chart filtered on the WRONG level shows a different Top-10 than intended; context filters force priority. **Parameters**: workbook variables (a What-if growth %, a metric switcher, a date anchor) — pair with calculated fields and parameter ACTIONS from dashboards. **Groups** (combine dimension members — "North+Northeast") vs **Sets** (dynamic membership, IN/OUT; combined sets intersect/compare) — sets can be COMPUTED (top-N by sales, updated with data) or fixed; the IN/OUT set on colour is the analyst\'s scalpel.',
        ],
        callout: {
          type: 'exam',
          text: 'The order of operations ladder, memorise verbatim: EXTRACT → DATA SOURCE → CONTEXT → DIMENSION (incl. Top N) → MEASURE → TABLE-CALC. Classic exam trap: "Top 10 products by sales shows different members after I add a date filter" — because dimension filters apply BEFORE Top-N only if context-ranked; fix = make the date filter a CONTEXT filter. State the ladder, name the fix.',
        },
      },
      {
        heading: '2. Calculations, trends, forecasting, R/Python',
        body: [
          '**Table calculations** (computed ON THE QUERY RESULT): RUNNING_SUM, % OF TOTAL, YEAR-OVER-YROW GROWTH, RANK, WINDOW_AVG — addressed by compute-using (table down/across/cell/specific dimensions); quick and context-dependent. **LOD expressions** (computed at a SPECIFIED granularity, independent of the view): FIXED (ignores view filters except context), INCLUDE, EXCLUDE — FIXED [Customer]: MAX([Order Date]) finds each customer\'s last purchase in any chart; the cohort analyst\'s tool. **Level of detail ≠ level of chart** is the whole idea.',
          '**Trend & reference lines**: add trend (linear/log/poly — read R² and p; the same regression discipline as BA06 Unit 5), reference lines (constant, average, per-cell by dimension — targets per region), bands (confidence intervals — uncertainty honesty), distributions (percentile box). **Annotations**: mark a point/band with text — "GST launched" on the dip — context turns a line into a story (Unit 4 storytelling link). **Forecasting**: Tableau\'s built-in exponential smoothing (ETS models: level/trend/seasonality; choose multiplicative vs additive; hold-out validation, prediction intervals shown — wider = honest); describe vs forecast (the model explains decomposition — BA02 Unit 2 links deeply). Extend with **R/Python (TabPy/Rserve)**: SCRIPT_REAL calls return vectors — run an ARIMA, a cluster (k-means from BA04), a churn logistic model — inside the viz, live: the bridge between BA03/BA04 models and BA01 displays. Governance note: external scripts mean external compute and security review.',
        ],
        bullets: [
          'Map types: symbol, filled (normalise!), dual-axis, density, layers',
          'Filters: extract → source → context → dimension → measure → table-calc',
          'Top-N + date filter conflicts: fix with context',
          'Parameters = workbook variables; parameter actions from dashboards',
          'Groups combine members; sets have IN/OUT + computed membership',
          'Table calcs: running, % total, YoY, rank — query-result level',
          'LOD: FIXED/INCLUDE/EXCLUDE — granularity independent of the view',
          'Trend lines with R²; reference lines/bands; annotate the cause',
          'Forecast: ETS smoothing, holdout, show prediction intervals',
          'TabPy/Rserve: SCRIPT_* runs R/Python models inside the viz',
        ],
      },
    ],
    diagram: {
      title: 'Filter order of operations and calculation depths',
      caption: 'Filters fire in a fixed ladder (context beats dimension-level Top-N); calculations live at three depths — row level, view level (table calcs), and LOD.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Order of operations and calculation depths">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="20" width="330" height="210" rx="12" fill="#f8fafc"/>
    <text x="185" y="42" fill="#334155" font-weight="600">FILTER LADDER (fires top→down)</text>
    <rect x="50" y="56" width="270" height="24" rx="6" fill="#e0f2fe"/><text x="185" y="72" fill="#0c4a6e">1 Extract filters</text>
    <rect x="50" y="86" width="270" height="24" rx="6" fill="#bbf7d0"/><text x="185" y="102" fill="#14532d">2 Data-source filters</text>
    <rect x="50" y="116" width="270" height="24" rx="6" fill="#fef9c3"/><text x="185" y="132" fill="#713f12">3 CONTEXT filters ← Top-N fix</text>
    <rect x="50" y="146" width="270" height="24" rx="6" fill="#fed7aa"/><text x="185" y="162" fill="#9a3412">4 Dimension filters · Top N</text>
    <rect x="50" y="176" width="270" height="24" rx="6" fill="#fee2e2"/><text x="185" y="192" fill="#7f1d1d">5 Measure filters</text>
    <rect x="50" y="206" width="270" height="20" rx="6" fill="#f1f5f9"/><text x="185" y="220" fill="#475569" font-size="10">6 Table-calc filters (last)</text>
    <rect x="380" y="56" width="320" height="160" rx="12" fill="#f8fafc"/>
    <text x="540" y="80" fill="#334155" font-weight="600">CALC DEPTHS</text>
    <rect x="400" y="94" width="280" height="30" rx="7" fill="#dcfce7"/><text x="540" y="113" fill="#14532d">ROW-LEVEL — [Margin] per row</text>
    <rect x="400" y="132" width="280" height="30" rx="7" fill="#e0f2fe"/><text x="540" y="151" fill="#0c4a6e">VIEW-LEVEL — table calcs (RUNNING, YoY, RANK)</text>
    <rect x="400" y="170" width="280" height="30" rx="7" fill="#ede9fe"/><text x="540" y="189" fill="#4c1d95">LOD — FIXED/INCLUDE/EXCLUDE (grain-free)</text>
    <text x="540" y="212" fill="#475569" font-size="10">row is stored · table calc is view-scoped · LOD is independent</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'YoY table calc', expr: '(SUM(x) − LOOKUP(SUM(x), −12)) / LOOKUP(SUM(x), −12)', meaning: 'Growth on the query result' },
      { name: 'FIXED LOD', expr: '{ FIXED [Customer] : MAX([Order Date]) }', meaning: 'Per-customer grain, view-independent' },
      { name: 'Top-N with dates', expr: 'Make date a CONTEXT filter → Top-N ranks within it', meaning: 'The classic fix' },
    ],
    examples: [
      {
        title: 'The Top-10 that kept changing',
        given: ['Sheet: Top 10 products by sales; a dashboard date-range filter (dimension) is added; members stop matching the manual list'],
        steps: [
          { text: 'Diagnose', calc: 'Date filter is a DIMENSION filter; Top-N is also dimension-level — ranking competes with filtering at the same stage depending on order — and every dashboard change reshuffles' },
          { text: 'Fix', calc: 'Right-click date filter → Add to Context: context filters apply BEFORE dimension-level Top-N — the top 10 is now computed WITHIN the selected dates' },
          { text: 'Verify', calc: 'Compare with a manual table for one month — match; keep a validation tab (governance)' },
          { text: 'Extra', calc: 'Want "Top 10 overall, then their monthly trend"? Use a SET (computed Top-10 by sales) and filter the trend sheet by the SET — membership fixed once, trend honest' },
        ],
        answer: 'Context filters + computed sets separate "who is in the club" from "what the club did" — the standard pattern.',
      },
      {
        title: 'LOD: repeat-purchase cohorts',
        given: ['Orders table: Customer, Order Date, Sales; question: what share of FY25 revenue came from customers acquired in FY22?'],
        steps: [
          { text: 'Acquisition date per customer', calc: '{ FIXED [Customer] : MIN(YEAR([Order Date])) } → cohort field' },
          { text: 'Revenue by cohort', calc: 'SUM(Sales) by cohort year → view: rows = cohort, columns = order year (a cohort triangle)' },
          { text: 'The answer', calc: 'Filter order year = 2025, read the 2022-cohort row share — a FIXED LOD computed at customer grain inside any chart' },
          { text: 'Why not a table calc', calc: 'Table calcs address the VIEW\'s grain; acquisition date must survive every layout — LOD fixes it at the right level regardless of pills' },
        ],
        answer: 'FIXED LODs stamp facts at their natural grain (customer acquisition) and then let the view ask anything.',
      },
    ],
    caseStudy: {
      title: 'Case — The choropleth that campaigned for a lie',
      body: [
        'A state government map shows district "development index" as totals: the big cities glow green, rural districts red — and the housing budget follows the map. A analyst re-maps per-capita: the ranking inverts — several small districts lead; the metros sit mid-table.',
      ],
      questions: [
        'What normalisation failure occurred?',
        'Which palette choices also mattered?',
        'Write the display rule for choropleths.',
      ],
      takeaways: [
        'Totals on maps mostly display population — always normalise by the denominator (per-capita, per-household, density) before shading polygons',
        'Sequential single-hue ramp for magnitude; diverging ONLY when a meaningful midpoint exists (target, zero change); colour-blind-safe ramps; label outliers',
        'Rule: choropleth = normalised measure + sequential ramp + legend units stated — totals belong in symbol (circle-size) maps',
        'Ethics is not a Unit-5 afterthought: the FIRST map moved real budgets — visualisation is allocation of attention AND money',
      ],
    },
    revision: [
      'Maps: symbol vs filled (normalise!), dual-axis, density, layers; assign geo roles',
      'Filter order: extract → source → context → dimension → measure → table-calc',
      'Top-N vs date filter: date → CONTEXT',
      'Parameters + parameter actions drive What-if and metric switchers',
      'Groups = manual member bundles; Sets = IN/OUT, computed (Top-N), combined',
      'Table calcs: RUNNING_SUM, % OF TOTAL, YoY via LOOKUP, RANK — view-level',
      'LOD: FIXED/INCLUDE/EXCLUDE — grain independence; cohort pattern',
      'Trend line: read R²; reference lines/bands = targets and uncertainty',
      'Annotations turn lines into narratives ("GST launched")',
      'Forecast: ETS (level/trend/seasonality), holdout validation, show intervals',
      'TabPy/Rserve: SCRIPT_REAL — R/Python models inside the viz',
    ],
    practice: [
      { q: 'Difference between a group and a set, one line each.', a: 'Group merges dimension members into one label (static, display-oriented); set defines membership of a bucket (IN/OUT — can be computed dynamically, combined with others, used as a filter without changing the dimension).' },
      { q: 'Reference band vs reference line vs box plot on a monthly trend.', a: 'Line = single target/average; band = a range (e.g., ±10% corridor or confidence interval — shows uncertainty); box plot = distribution summary of the values (quartiles/outliers) — use when the question is "is this month abnormal for this month-of-year?"' },
      { q: 'You need an ARIMA forecast with custom regressors, not ETS. How?', a: 'Build it in Python (statsmodels) served by TabPy: SCRIPT_REAL returns the forecast vector into the viz; or forecast outside and join the results as a column. State the governance: external runtime, refresh, security review.' },
      { q: 'A top-10 products filter returns the wrong ten. Why?', a: 'Tableau applies dimension filters before table calculations and some LODs - if the ranking computes after the filter, you get the top ten OF THE FILTERED SET or a cyclic trap. Fix with a context filter or FIXED LOD ranking.' },
      { q: 'When would you use INCLUDE rather than FIXED?', a: 'INCLUDE aggregates at a finer level than the view but still respects view dimensions - e.g., average per-customer sales on a region sheet. FIXED locks to the stated dimension regardless of the view.' },
    ],
  },
  {
    slug: 'tableau-dashboards-stories',
    number: 4,
    title: 'Dashboards & Stories in Tableau: Telling Decisions',
    minutes: 40,
    summary:
      'Building dashboards (containers, layout, device designer), Tableau vs Excel for dashboards, formatting standards, dashboard actions and filters, objects (web, image, download, extension), trend and reference lines at dashboard scale, and the story point method for influencing decisions.',
    status: 'live',
    objectives: [
      'Assemble dashboards with tiled/floating containers and device layouts',
      'Wire filter and highlight actions across sheets',
      'Format to a standard grid (the "governed look")',
      'Structure a story that moves a decision',
    ],
    sections: [
      {
        heading: '1. Dashboard construction and mechanics',
        body: [
          'Dashboard anatomy: **containers** (tiled — responsive grid; floating — absolute; horizontal/vertical nesting; the pro pattern: floating layout INSIDE one tiled container), size (1000×650+ for laptops; enable scrolling deliberately), **device designer** (phone/tablet/desktop layouts — managers read on phones: stack vertical, one KPI band + one chart), objects (text, image, web-page, blank, download/PDF button, extensions — governance!), and **Show sheets as tabs** off for published stories.',
          '**Actions** — the interactivity layer: **filter actions** (click a region → other sheets filter; scoped source/target sheets), **highlight actions** (cross-dimensions emphasis without filtering — great for "where does this product sell?"), **URL actions** (drill to detail pages), **parameter actions** (write a value on click — the slickest What-if), and **menu-only** vs hover-vs-select discipline. Dashboard-level **quick filters** (apply to selected worksheets; the "apply to all relevant" trap — define relevance!). **Tableau vs Excel** for dashboards: Excel = personal, formula-transparent, offline, weak at scale/refresh/interactivity/security; Tableau = governed source, live interactivity, RLS, server scheduling, mobile — the dividing line is AUDIENCE and REFRESH, not beauty. **Formatting standard**: font hierarchy (title 12 bold / header 10 / label 9), one colour story per dashboard, gridline discipline, consistent number formats (₹ cr, no mixed units), tooltips as mini-reports (the "Details" home), no legends when direct labels exist.',
        ],
        callout: {
          type: 'exam',
          text: 'Action-type quiz: FILTER (changes data on other sheets) · HIGHLIGHT (emphasises common members, keeps context) · URL (external drill) · PARAMETER (writes a value — enables What-if). Design rule: highlight for exploration, filter for decision paths, parameter for simulation. Container rule: tiled for structure, floating only for polish inside a tiled parent.',
        },
      },
      {
        heading: '2. Stories that move decisions',
        body: [
          'A **story point** = a dashboard snapshot + caption — the narrative layer: title → context slide → discovery slides (each ONE claim) → decision slide. Method (the "assertion-evidence" structure): (1) the DECISION the audience owns (reallocate media budget); (2) the one-number hook (CAC up 31%); (3) three evidence slides, each titled as a claim ("Paid search drives clicks, not installs" — not "Search metrics"); (4) the options slide with costs; (5) the ask. Story titles are written LAST, in the audience\'s verbs, and every slide passes the "so what?" test.',
          'Trend/reference lines at dashboard scale: consistent targets across sheets (the same ₹42L/month reference line everywhere; parameters as targets so finance can turn the dial), bands for acceptable corridors, annotations on breaks ("festival shift"). Practice pattern for the exam: given a dataset and a manager persona, design a 3-5 tile dashboard (KPI band + trend + composition + detail) AND a 4-slide story with claim titles — say which ACTION each element serves. Delivery: publish to Server/Cloud with subscriptions (Monday 8am email), RLS by region, download controls, and a certified-data badge — distribution design is part of the visualisation, not an afterthought.',
        ],
        bullets: [
          'Containers: tiled for grid, floating inside; device designer for phones',
          'Objects: text/image/web/download/extensions (governance on extensions)',
          'Filter vs highlight vs URL vs parameter actions — pick by intent',
          'Quick filters scoped deliberately; "all relevant" is often wrong',
          'Excel vs Tableau: audience, refresh, security, scale — not beauty',
          'Format standard: font hierarchy, one colour story, units, tooltip reports',
          'Story = claim-titled slides + decision ask; titles last',
          'Targets as parameters; consistent reference lines across sheets',
          'Publish: subscriptions, RLS, certified badge, download policy',
        ],
      },
    ],
    diagram: {
      title: 'From dashboard to story',
      caption: 'A dashboard answers exploration; a story drives a decision — captions carry claims, the last slide carries the ask.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dashboard to story structure">
  <defs><marker id="ta2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="16" y="40" width="300" height="170" rx="12" fill="#f8fafc"/>
    <text x="166" y="64" fill="#334155" font-weight="600">DASHBOARD (explore)</text>
    <rect x="36" y="80" width="260" height="26" rx="6" fill="#e0f2fe"/><text x="166" y="97" fill="#0c4a6e">KPI band + vs-target deltas</text>
    <rect x="36" y="112" width="260" height="26" rx="6" fill="#dcfce7"/><text x="166" y="129" fill="#14532d">trend + reference corridor</text>
    <rect x="36" y="144" width="260" height="26" rx="6" fill="#fef9c3"/><text x="166" y="161" fill="#713f12">composition + map</text>
    <rect x="36" y="176" width="260" height="26" rx="6" fill="#fee2e2"/><text x="166" y="193" fill="#7f1d1d">detail table (last)</text>
    <line x1="316" y1="125" x2="360" y2="125" stroke="#475569" stroke-width="1.8" marker-end="url(#ta2)"/>
    <rect x="366" y="40" width="338" height="170" rx="12" fill="#f8fafc"/>
    <text x="535" y="64" fill="#334155" font-weight="600">STORY (decide)</text>
    <text x="535" y="88" fill="#475569">1. Hook: "CAC up 31% this quarter"</text>
    <text x="535" y="110" fill="#475569">2. Claim: "Paid search buys clicks, not installs"</text>
    <text x="535" y="132" fill="#475569">3. Claim: "Organic + referral convert 3.2x"</text>
    <text x="535" y="154" fill="#475569">4. Options: shift ₹40L / hold / +budget</text>
    <text x="535" y="176" fill="#7c2d12" font-weight="600">5. ASK: approve the shift by Friday</text>
    <text x="535" y="196" fill="#475569">captions claim; the ask closes</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'KPI band', expr: 'Measure · Δ vs target · % · trend spark — one row', meaning: 'The five-second read' },
      { name: 'Story title test', expr: 'Title = claim with a verb + number', meaning: 'Not "Sales by region"' },
      { name: 'Target parameter', expr: 'Reference line = [Target Param] — one dial, all sheets', meaning: 'Consistency across tiles' },
    ],
    examples: [
      {
        title: 'Design a CMO dashboard in five tiles',
        given: ['Persona: CMO; decisions: allocate ₹6 cr quarterly across channels; watch CAC and LTV'],
        steps: [
          { text: 'Tile 1 KPI band', calc: 'Spend, CAC (Δ vs ₹1,400 target), LTV:CAC ratio, pipeline — the 5-second status' },
          { text: 'Tile 2 trend', calc: 'CAC by month by channel + target band; annotate the campaign that spiked it' },
          { text: 'Tile 3 composition', calc: 'Spend vs installs scatter (bubble = channel) — efficiency quadrant' },
          { text: 'Tile 4 detail', calc: 'Campaign table (filter action from tiles 2–3) — the drill home' },
          { text: 'Actions', calc: 'Click channel → filter 2–4; hover → highlight cross-tile; parameter sets the target line on all sheets' },
        ],
        answer: 'Five tiles, four actions, one persona: every element answers "what do I change this quarter?"',
      },
      {
        title: 'Story-board a price-rise decision',
        given: ['Board owns: approve a 6% price rise on the flagship SKU'],
        steps: [
          { text: 'Slide 1 hook', calc: '"Flagship margin fell 240 bps in 3 quarters" — one number, one chart' },
          { text: 'Slide 2 cause', calc: '"Input costs +11%, competition +8% price, we held" — the cost-price scissors' },
          { text: 'Slide 3 elasticity', calc: '"At −0.6 elasticity, a 6% rise lifts margin ₹31 cr even after 3.6% volume loss" — scenario bands' },
          { text: 'Slide 4 risk', calc: '"Top-20 customers (38% revenue) renew in Q4 — staged rise caps churn" — the mitigation' },
          { text: 'Slide 5 ask', calc: '"Approve 4% now + 2% at renewal" — decision, date, owner' },
        ],
        answer: 'Claim-titled slides, each one chart; the board votes on slide 5, having believed slides 2–4.',
      },
    ],
    caseStudy: {
      title: 'Case — The beautiful dashboard that changed no behaviour',
      body: [
        'A analytics team builds a 22-tile, real-time, auto-refreshing operations dashboard — technically excellent. Six months later: the plant still runs its morning meeting off a printed Excel sheet. Observers find the daily huddle is 15 minutes; the dashboard needs 10 clicks to answer "which line do we fix first?"',
        'The fix: a single-screen "morning huddle" view — one line-status grid (green/amber/red), the three yesterday-breakers, and a one-click drill. The printed sheet dies in a month.',
      ],
      questions: [
        'What did the team optimise, and what should they have optimised?',
        'Why did the printed sheet win for so long?',
        'Generalise the design rule.',
      ],
      takeaways: [
        'They optimised data coverage and refresh; the huddle optimises DECISION SPEED — the interface that answers the meeting\'s first question in 5 seconds wins',
        'The printed sheet was: one screen, zero clicks, tuned to the daily question — familiarity + fitness beat features; adoption is behavioural (F01) before it is technical',
        'Rule: design for the DECISION OCCASION (huddle, monthly review, board) — tile count is a cost; every element must serve the occasion\'s question sequence',
        'Exam link: dashboards (explore, interactive, many questions) vs stories (decide, linear, one ask) — the syllabus separates them for exactly this failure mode',
      ],
    },
    revision: [
      'Containers: tiled grid; floating inside tiled parent; device designer (phone-first)',
      'Objects: text/image/web/download/extensions — governance on extensions',
      'Actions: filter (change data) · highlight (keep context) · URL · parameter',
      'Quick filters: scope deliberately; relevance is a choice, not a default',
      'Excel vs Tableau: personal+static vs governed+interactive+RLS+refresh',
      'Formatting: font hierarchy, one colour story, unit consistency, tooltip reports',
      'Story points: claim-titled snapshots; hook → evidence → options → ask',
      'Titles as claims with numbers; write last; "so what?" every slide',
      'Reference targets as shared parameters — one dial, all sheets',
      'Publish: subscriptions, RLS, certified data, download policy',
    ],
    practice: [
      { q: 'When should a tile use highlight instead of filter action?', a: 'When the reader needs CONTEXT preserved — e.g., "where does this product sell?" should dim non-matching regions but keep the national map visible; filtering would redraw to only the matches and destroy the comparison.' },
      { q: 'Your dashboard looks different on the CEO\'s laptop. What did you miss?', a: 'Fixed pixel size without device/range testing: use a tiled container with automatic sizing + the device designer for phone/tablet, and test at 1366×768 (the boardroom projector) — floating objects drift first.' },
      { q: 'Convert "Sales by Region" into a story-grade slide title.', a: '"South overtook West in Q3 — now 34% of revenue": claim + number + time. The chart then exists to support the sentence, not the other way round.' },
      { q: 'A user clicks a state on the map but the KPI cards do not respond. First thing to check?', a: 'Dashboard action scope: the filter action must target the KPI sheets (all worksheets vs selected) and the fields must map - most dead dashboards are actions targeting the wrong sheets or relevant fields unchecked.' },
      { q: 'Twelve charts, one screen, no hierarchy. What is the design fix?', a: 'Container layout with a governing question: one hero visual answering the main question, supporting charts in a grid beneath, filters global. Attention is a budget - spend it on the decision.' },
    ],
  },
  {
    slug: 'viz-trends-ethics-future',
    number: 5,
    title: 'Trends & Ethics: AI, Augmented Analytics, Streaming & Responsible Design',
    minutes: 35,
    summary:
      'Where visualisation is going — AI and automation, augmented analytics, mobile and embedded platforms, real-time and streaming dashboards — and the ethics that bind it all: privacy and compliance, bias in data and visuals, and ethical colour and design.',
    status: 'live',
    objectives: [
      'Define augmented analytics and its workflow implications',
      'Design mobile-first and embedded visualisation experiences',
      'Build real-time/streaming views and know their failure modes',
      'Apply privacy, bias and colour-ethics rules to a real dashboard',
    ],
    sections: [
      {
        heading: '1. The frontier: AI, mobile, embedded, streaming',
        body: [
          '**AI & automation in viz**: auto-chart suggestion (Show Me → ML), natural-language generation (smart narratives: auto-text of what the chart shows), natural-language queries (Power BI Q&A, Tableau Ask Data), anomaly detection (streaming alerts), insight discovery ("Explain This" — the drivers behind a point), and **augmented analytics** — ML woven into the workflow (auto-clustering, auto-forecasting, smart data prep: Prep Builder suggestions). Implication: the analyst\'s job shifts from MAKING charts to FRAMING questions, validating machine insights and curating trust — the "analytics translator" role. **Mobile & embedded**: mobile-first (phone layouts, one KPI band + one chart; touch targets ≥44px), and **embedded analytics** — dashboards inside the product the user already lives in (CRM, ERP, banking app): JWT/SSO, row-level security per tenant, performance budgets; embedded is where most business analytics now actually runs.',
          '**Real-time & streaming**: live dashboards on streams (IoT lines, clickstreams, support queues, trading) — architectures: streaming source (Kafka) → aggregation layer → live extract/ push (Tableau / Power BI streaming datasets); design differences: snapshot windows (last 15 min, last hour), pre-aggregation (you cannot query millions of events per paint), anomaly bands not raw points, and DECISION cadence — a real-time dashboard is only useful if a human or system acts at that cadence. Failure modes: alert fatigue (too many, badly-thresholded), p-values on streams, and the seduction of motion (charts that move but say nothing).',
        ],
        callout: {
          type: 'exam',
          text: 'Augmented analytics (Gartner\'s term) = ML embedded in the analytics workflow — auto data prep, auto insight discovery, auto NL explanations. One-line exam contrast: traditional BI = human asks, machine draws; augmented = machine SUGGESTS (anomalies, drivers, clusters) and EXPLAINS in prose. The analyst\'s new skills: question framing, validation, curation of trust.',
        },
      },
      {
        heading: '2. Ethics: privacy, bias, colour, compliance',
        body: [
          '**Privacy & compliance**: data-minimisation (chart only what is needed), aggregation thresholds (no cells below N=5–10 — small-N suppression), anonymisation vs pseudonymisation (re-identification risk from quasi-identifiers: zip+dob+gender), purpose limitation (marketing data re-used for HR — forbidden), retention limits, and the law of the land: India\'s **DPDP Act 2023** (consent, data-fiduciary duties, penalties — PGDM 302 Unit 4 links) plus GDPR for EU users; dashboards are personal-data disclosures too — RLS is a compliance mechanism, not a convenience. **Bias in data and visuals**: sampling bias (who is missing?), measurement bias (proxies — "arrests" ≠ "crime"), algorithmic bias (models trained on skewed history), survivorship (only active customers), and presentation bias: axis truncation, cherry-picked windows, misleading dual axes, maps of totals (population fallacy). **Ethical colour & design**: colour-blind-safe palettes (deuteranopia hits ~5% of men; red/green together fails — use blue/orange), cultural colour meanings (red = danger/luck depending on market), sufficient contrast (WCAG), not encoding sensitive categories in loud colours (stigmatising choropleths), and HONEST uncertainty — show confidence bands and label estimates as estimates. The professional checklist before publication: consent ✓ minimised ✓ aggregated ✓ un-biased windows ✓ accessible palette ✓ uncertainty shown ✓ claim in title is supported ✓.',
          'Closing frame: visualisation is an argument with a duty of care. The trends (AI, streaming, embedding) amplify reach — and therefore amplify the harm a single dishonest encoding can do. The last skill of this subject is saying "no, that chart would mislead" — and being able to prove it with the vocabulary of Units 1–4.',
        ],
        bullets: [
          'Augmented analytics: ML inside the workflow — suggests, forecasts, explains',
          'Analyst 2.0: frames questions, validates insights, curates trust',
          'Mobile-first: one KPI band + one chart; 44px targets; device designer',
          'Embedded: dashboards inside the product; SSO, tenant RLS, performance budget',
          'Streaming: window, pre-aggregate, anomaly bands, decision cadence',
          'Alert fatigue is the failure mode of real-time everything',
          'Privacy: minimise, aggregate (N≥5), suppress small cells, DPDP/GDPR',
          'Bias: sampling, measurement, algorithmic, survivorship, presentation',
          'Colour ethics: colour-blind-safe (blue/orange), contrast (WCAG), neutral maps',
          'Uncertainty shown — bands and "estimate" labels',
        ],
      },
    ],
    diagram: {
      title: 'The ethics checklist gate',
      caption: 'Every published visual passes the gate: privacy, bias, encoding honesty, accessibility, uncertainty.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ethics checklist gate">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="90" width="140" height="60" rx="10" fill="#e0f2fe"/><text x="90" y="114" fill="#0c4a6e" font-weight="600">Draft chart</text><text x="90" y="132" fill="#075985">any stage</text>
    <rect x="230" y="24" width="200" height="44" rx="9" fill="#dcfce7"/><text x="330" y="42" fill="#14532d" font-weight="600">Privacy: minimised · aggregated</text><text x="330" y="58" fill="#166534">small-N suppressed · consented</text>
    <rect x="230" y="80" width="200" height="44" rx="9" fill="#fef9c3"/><text x="330" y="98" fill="#713f12" font-weight="600">Bias: sampling · windows</text><text x="330" y="114" fill="#a16207">honest baselines · full context</text>
    <rect x="230" y="136" width="200" height="44" rx="9" fill="#fed7aa"/><text x="330" y="154" fill="#9a3412" font-weight="600">Encoding: ladder-rung right</text><text x="330" y="170" fill="#c2410c">lie factor = 1 · no dual-axis traps</text>
    <rect x="230" y="192" width="200" height="44" rx="9" fill="#fee2e2"/><text x="330" y="210" fill="#7f1d1d" font-weight="600">Access: colour-blind-safe</text><text x="330" y="226" fill="#991b1b">contrast · direct labels</text>
    <rect x="490" y="80" width="210" height="52" rx="10" fill="#ede9fe"/><text x="595" y="102" fill="#4c1d95" font-weight="600">Uncertainty shown?</text><text x="595" y="118" fill="#5b21b6">bands · estimate labels</text>
    <rect x="490" y="152" width="210" height="48" rx="10" fill="#16a34a"/><text x="595" y="174" fill="#f8fafc" font-weight="600">PUBLISH — with the claim</text><text x="595" y="190" fill="#dcfce7">in the title</text>
    <line x1="160" y1="120" x2="228" y2="46" stroke="#475569" stroke-width="1.2"/>
    <line x1="160" y1="120" x2="228" y2="102" stroke="#475569" stroke-width="1.2"/>
    <line x1="160" y1="120" x2="228" y2="158" stroke="#475569" stroke-width="1.2"/>
    <line x1="160" y1="120" x2="228" y2="214" stroke="#475569" stroke-width="1.2"/>
    <line x1="430" y1="106" x2="488" y2="106" stroke="#475569" stroke-width="1.4"/>
    <line x1="430" y1="106" x2="488" y2="172" stroke="#475569" stroke-width="1.4"/>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Small-N suppression', expr: 'Hide/aggregate cells with n < 5', meaning: 'Re-identification guard' },
      { name: 'Alert budget', expr: 'alerts/day ≤ what responders can action', meaning: 'Anti-fatigue rule' },
      { name: 'Contrast (WCAG)', expr: 'text/visual contrast ≥ 4.5:1 (AA)', meaning: 'Accessibility floor' },
    ],
    examples: [
      {
        title: 'Audit a HR diversity dashboard',
        given: ['Dashboard: promotion rates by community, per department, per year, small departments (4–12 staff)'],
        steps: [
          { text: 'Privacy', calc: 'A 6-person department with 1 promotion identifies the person → suppress cells n<5, aggregate departments into bands' },
          { text: 'Bias', calc: 'Promotion rate needs the eligible pool denominator (not headcount); check window completeness (include deferred cycles)' },
          { text: 'Encoding', calc: 'Rates as bars with CI whiskers — a 33% vs 25% gap on n=12 is noise; show intervals' },
          { text: 'Colour & framing', calc: 'Neutral sequential palette (not red=community X), claim title "Promotion parity holds in large units; gaps concentrate in 3 small teams"' },
        ],
        answer: 'Same data, publishable: suppressed cells, right denominator, intervals, neutral palette, an actionable claim.',
      },
      {
        title: 'Real-time ops view that people trust',
        given: ['Assembly line: 40 sensors/second; morning-shift engineers; goal: cut stoppage response time'],
        steps: [
          { text: 'Cadence check', calc: 'Do they act in seconds? No — minutes: design 60-sec windows with 15-min rolling context, not per-event flicker' },
          { text: 'Pre-aggregate', calc: 'Stream → per-minute aggregates + anomaly band (±2σ of the hour) — paint thousands of points and nobody sees anything' },
          { text: 'Alerts', calc: 'Alert only on band-breaches persisting >2 min (kills flicker fatigue); route by line owner' },
          { text: 'Failure-mode review', calc: 'Track alert volume weekly: if >15/day/person, thresholds or routing are wrong — the dashboard gets a dashboard' },
        ],
        answer: 'Real-time design = window, band, threshold discipline; motion is only useful when a decision runs at that speed.',
      },
    ],
    caseStudy: {
      title: 'Case — Ask Data tells the CFO something wrong',
      body: [
        'The CFO types into a natural-language viz tool: "show me profitable customers". The tool plots COUNT of customers by segment where profit > 0 — but the "profit" field excludes freight recovery, and "customer" resolves to customer-type, not account. The CFO presents the chart to the board; the error surfaces in diligence.',
      ],
      questions: [
        'Which layer failed — the AI, the model, or the process?',
        'How do you make NL answers trustworthy?',
        'What belongs in the ethics checklist for augmented features?',
      ],
      takeaways: [
        'The MODEL layer failed (field semantics: profit definition, grain of "customer"); the AI faithfully answered the wrong question — augmented analytics inherits every data-governance sin',
        'Trustworthiness: certified semantic layer (business-named fields, documented definitions), synonyms mapping, answer provenance (click through to the query the NL generated), and certification of which NL surfaces are board-safe',
        'Checklist for augmented features: validated field definitions, provenance on every answer, confidence handling for ambiguity ("did you mean X?"), and human review gates for external/board use',
        'The frontier amplifies: AI-authored charts at scale mean errors at scale — Units 1–4\'s disciplines become MORE valuable, not less',
      ],
    },
    revision: [
      'Augmented analytics: ML in workflow — suggests, forecasts, explains (NLG)',
      'Analyst role shifts: frame, validate, curate trust',
      'Mobile-first: one KPI band + one chart; 44px targets',
      'Embedded analytics: in-product dashboards; SSO, tenant RLS',
      'Streaming: windows, pre-aggregation, anomaly bands, decision cadence',
      'Alert fatigue: volume ≤ actionable; persistence thresholds',
      'Privacy: minimise, aggregate N≥5, purpose limit, DPDP/GDPR; RLS = compliance',
      'Bias: sampling, measurement, algorithmic, survivorship, presentation',
      'Presentation honesty: baselines, windows, dual axes, map normalisation',
      'Colour: colour-blind-safe (blue/orange), WCAG contrast, neutral maps, uncertainty bands',
    ],
    practice: [
      { q: 'A streaming dashboard shows every single click. Why is that a design failure?', a: 'No decision runs at click cadence — it is motion without meaning: pre-aggregate to the decision window (minute/shift), overlay anomaly bands, alert only on persistence. Real-time must map to a real-time decision.' },
      { q: 'Name two augmented-analytics features you have used and their validation need.', a: 'e.g., anomaly detection (validate: is the band seasonality-aware?) and smart narratives (validate: does the auto-text state the caveat — sample, window, definition?). Trust = feature + verification path.' },
      { q: 'Your choropleth of loan defaults by pincode is accurate and colour-blind-safe. Ethical concern remaining?', a: 'Stigmatisation and proxy discrimination: mapping defaults by area can redline neighbourhoods; show approval-vs-default fairness rates, aggregate pincodes to wards, add context variables (income, access) — accuracy is not the only axis of harm.' },
      { q: 'A streaming IoT dashboard repaints every second and users cannot read it. Fix?', a: 'Aggregate in the stream layer (windowed counts, not raw events), design for glanceability (alerts and sparklines, not dense tables), and throttle repaint - streaming shows state and exceptions, not every datum.' },
      { q: 'Which is the bigger ethics failure: ugly colour or a truncated bar axis?', a: 'Truncated axis - it lies about magnitude (bar ratios distort). Bad colour is a usability bug; a chopped baseline is a data-integrity bug. Bars start at zero, always.' },
    ],
  },
];
