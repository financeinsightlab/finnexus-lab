import type { Lecture } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM BA03 — Data Science using R
   Unit-wise lectures: overview → R basics & data structures →
   functions, I/O, control → graphics → statistical analysis
   ═══════════════════════════════════════════════════════════════ */

export const dataScienceRLectures: Lecture[] = [
  {
    slug: 'data-science-r-overview',
    number: 1,
    title: 'Data Science in Business & the R Ecosystem',
    minutes: 35,
    summary:
      'What data science means for business decisions, applications across functions, the R ecosystem and why it endures, the data-science workflow (manipulation → exploration → visualisation → modelling), and the statistical concepts that frame everything.',
    status: 'live',
    objectives: [
      'Define data science as decisions supported by evidence from data',
      'Map applications: marketing, finance, operations, HR, risk',
      'Tour the R ecosystem: CRAN, tidyverse, RStudio projects',
      'Frame the statistical vocabulary used throughout the course',
    ],
    sections: [
      {
        heading: '1. Data science in business',
        body: [
          '**Data science** = the discipline of turning raw data into decisions: statistics + programming + domain knowledge (the Venn diagram: the intersection is the job). In business, the unit of value is NOT the model but the DECISION — pricing, targeting, staffing, credit approval, churn intervention. Applications by function: marketing (segmentation, CLV, campaign uplift — BA05), finance (default scoring, fraud detection — F02 Unit 5, forecasting BA02), operations (demand forecasting, route/logistics optimisation, quality control), HR (attrition prediction, workforce planning), risk (market VaR, stress simulation — F06 Unit 5). The workflow every project follows: **question → collect → clean/manipulate → explore (EDA) → model → communicate → deploy/monitor** — the tidyverse tools map one-to-one onto these steps.',
          'Why R: born for statistics (Ihaka–Gentleman, Auckland 1993), free/open-source, ~20,000 CRAN packages (state-of-the-art statistical implementations arrive in R first — lm, glm, forecast, caret, tidymodels), unbeatable graphics (ggplot2 grammar — BA01\'s ideas were born here), reproducible research (R Markdown/Quarto — code + narrative + output in one document) — the standard in academia, pharma, banking research, official statistics. The R vs Python debate is largely a team-sport question: R for statistical depth and graphics, Python for production engineering — the modern analyst speaks at least one fluently and reads both. **RStudio** (Posit): the IDE — console, editor, environment pane, plots, and the killer habit: **projects** (one folder per analysis, relative paths, the session starts clean — reproducibility is a workflow, not an aspiration).',
        ],
        callout: {
          type: 'note',
          text: 'Statistical vocabulary that frames the course: population vs sample; parameter vs statistic; descriptive vs inferential; variable types (numeric/categorical/ordinal); central limit theorem (sample means → normal, SE = σ/√n — why n matters); confidence interval (range of plausible parameters); hypothesis test (decision under noise); correlation vs causation. Every R function later is a tool pointed at one of these ideas.',
        },
      },
      {
        heading: '2. The ecosystem and the tidyverse mental model',
        body: [
          'The **tidyverse** meta-package: a COHERENT grammar of data science — readr (import), dplyr (manipulate: select, filter, mutate, group_by, summarise, arrange — the six verbs that do 90% of wrangling), tidyr (reshape: pivot_longer/wider — tidy data: one variable per column, one observation per row), ggplot2 (visualise — the grammar of graphics: data + aesthetics + geoms + facets + scales), purrr (iterate), stringr/lubridate (text/dates), forcats (factors). Contrast with base R (perfectly capable; the tidyverse adds consistency and pipe-chains `%>%` or the native `|>`). The **pipe mental model**: `data |> f() |> g()` reads left-to-right as a recipe — the analysis becomes a readable sentence.',
          'Data manipulation & exploration in practice: import (read_csv keeps types), inspect (head, str, summary, glimpse), clean (missing values — is.na, na.omit or imputation; duplicates; type coercions), derive (mutate: ratios, date parts, categories with case_when), aggregate (group_by + summarise), join (left_join on keys — check row counts before/after!). Exploration (EDA): distributions (histograms, density), relationships (scatter + smooth), composition (bars), outliers, missingness patterns (naniar), and the discipline of WRITING DOWN hypotheses before plotting (else EDA becomes data-dredging — BA06\'s p-hacking trap). Visualisation in R: ggplot2 builds BA01\'s best charts programmatically; plotly for interactivity; rmarkdown/shiny for sharing live analyses. Preview of the course arc: Unit 2 the language and structures, Unit 3 functions and I/O, Unit 4 graphics, Unit 5 the statistics that pay salaries.',
        ],
        bullets: [
          'Data science = statistics + programming + domain, valued in DECISIONS',
          'Workflow: question → collect → clean → EDA → model → communicate → monitor',
          'R strengths: CRAN-first statistics, ggplot2, R Markdown, free',
          'RStudio projects: one folder, relative paths, clean session',
          'tidyverse: readr, dplyr (6 verbs), tidyr (tidy data), ggplot2, lubridate',
          'Pipe `|>`: data |> step1 |> step2 — the readable analysis sentence',
          'EDA discipline: hypotheses written BEFORE plotting',
          'CLT/SE/confidence/hypothesis vocabulary carries the whole course',
        ],
      },
    ],
    diagram: {
      title: 'The data-science workflow mapped to the R stack',
      caption: 'Each workflow stage has a tidyverse tool; the arc runs from question to monitored decision.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Data science workflow and R stack">
  <defs><marker id="ra" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="16" y="60" width="100" height="56" rx="10" fill="#e0f2fe"/><text x="66" y="82" fill="#0c4a6e" font-weight="600">Question</text><text x="66" y="100" fill="#075985">decision?</text>
    <rect x="140" y="60" width="100" height="56" rx="10" fill="#bbf7d0"/><text x="190" y="82" fill="#14532d" font-weight="600">Import</text><text x="190" y="100" fill="#166534">readr::read_csv</text>
    <rect x="264" y="60" width="100" height="56" rx="10" fill="#fef9c3"/><text x="314" y="82" fill="#713f12" font-weight="600">Wrangle</text><text x="314" y="100" fill="#a16207">dplyr · tidyr</text>
    <rect x="388" y="60" width="100" height="56" rx="10" fill="#fed7aa"/><text x="438" y="82" fill="#9a3412" font-weight="600">Explore</text><text x="438" y="100" fill="#c2410c">ggplot2 EDA</text>
    <rect x="512" y="60" width="100" height="56" rx="10" fill="#fee2e2"/><text x="562" y="82" fill="#7f1d1d" font-weight="600">Model</text><text x="562" y="100" fill="#991b1b">lm · glm · forecast</text>
    <rect x="636" y="60" width="80" height="56" rx="10" fill="#ede9fe"/><text x="676" y="82" fill="#4c1d95" font-weight="600">Share</text><text x="676" y="100" fill="#5b21b6">Quarto</text>
    <line x1="116" y1="88" x2="138" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#ra)"/>
    <line x1="240" y1="88" x2="262" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#ra)"/>
    <line x1="364" y1="88" x2="386" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#ra)"/>
    <line x1="488" y1="88" x2="510" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#ra)"/>
    <line x1="612" y1="88" x2="634" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#ra)"/>
    <path d="M676,116 C676,200 66,200 66,118" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#ra)"/>
    <text x="371" y="222" fill="#475569">monitor → new questions: the loop, not the line</text>
    <text x="360" y="40" fill="#334155" font-weight="600">pipe the stages: data |> read → wrangle → plot → model → report</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Standard error', expr: 'SE = s/√n', meaning: 'Why sample size buys precision' },
      { name: '95% CI', expr: 'x̄ ± 1.96 × SE', meaning: 'Plausible parameter range' },
      { name: 'Tidy data', expr: 'variables in columns · observations in rows · one type per column', meaning: 'The shape every tool expects' },
    ],
    examples: [
      {
        title: 'First R session: a readable analysis',
        given: ['sales.csv: columns date, region, units, price'],
        steps: [
          { text: 'Import + inspect', calc: 'sales <- read_csv("sales.csv"); glimpse(sales) — types and rows at a glance' },
          { text: 'Wrangle', calc: 'sales |> mutate(revenue = units*price, month = month(date)) |> filter(!is.na(units))' },
          { text: 'Aggregate', calc: 'sales |> group_by(region, month) |> summarise(rev = sum(revenue), .groups="drop")' },
          { text: 'Plot', calc: 'ggplot(monthly, aes(month, rev, colour=region)) + geom_line() — the BA01 line chart, three lines of grammar' },
        ],
        answer: 'Four pipes, one sentence-shaped analysis: this readability is why the tidyverse won.',
      },
      {
        title: 'SE intuition before statistics',
        given: ['Sample of 100 bills: mean ₹842, s ₹210. How precise is the mean?',
        ],
        steps: [
          { text: 'SE', calc: '210/√100 = 21 — the mean\'s own standard deviation across hypothetical samples' },
          { text: '95% CI', calc: '842 ± 1.96(21) = ₹801–883' },
          { text: 'Scale it', calc: 'n = 400 → SE 10.5 → CI ±₹21 — 4x the data buys 2x the precision (√n law)' },
          { text: 'Frame', calc: 'Every model coefficient later arrives with an SE — this one idea is half of Unit 5' },
        ],
        answer: '₹801–883: the sample has spoken, with honest volume.',
      },
    ],
    caseStudy: {
      title: 'Case — The dashboard number that nobody could reproduce',
      body: [
        'A monthly "conversion rate" circulates from an analyst\'s Excel: 4.6%. A new hire asks how it was computed; three versions of the spreadsheet disagree (4.6%, 4.2%, 5.1% depending on filters applied by hand). The metric forks; two teams act on different numbers.',
        'The fix: an R project — the import, cleaning, and metric definition in one scripted pipeline (readr + dplyr), versioned in Git, rendered to an R Markdown report each month with the code visible. All three spreadsheets retire.',
      ],
      questions: [
        'Which property of the analysis was missing?',
        'What made the R project able to restore it?',
        'What organisational habits keep it that way?',
      ],
      takeaways: [
        'Reproducibility: same data + same code = same number, forever — hand-filtered Excel breaks it silently',
        'R projects + scripts + R Markdown make the analysis a first-class artifact: the metric definition becomes code, reviewable and diff-able',
        'Habits: one project per analysis, relative paths, renv for package versions, code review for metric changes — data governance in practice (BA01 Unit 2\'s "certified source" theme)',
        'Exam line: data science differs from spreadsheet analysis by REPRODUCIBILITY and SCALE — that is the business case for R',
      ],
    },
    revision: [
      'Data science = statistics + programming + domain; value = decisions',
      'Workflow: question → import → wrangle → EDA → model → communicate → monitor',
      'R: CRAN ~20k packages, statistics-first, ggplot2, R Markdown, free',
      'RStudio projects: one folder, relative paths, clean sessions',
      'tidyverse: readr, dplyr, tidyr, ggplot2, purrr, stringr, lubridate, forcats',
      'dplyr verbs: select filter mutate group_by summarise arrange',
      'Pipe: data |> f() |> g() — the readable recipe',
      'Tidy data: variable = column, observation = row',
      'Population/sample; parameter/statistic; descriptive/inferential',
      'CLT → SE = s/√n; CI = x̄ ± 1.96·SE; √n precision law',
    ],
    practice: [
      { q: 'When would you choose R over Excel for a task?', a: 'Repeatability (monthly reruns), scale (1m rows), audit (code = method), statistics (regression/diagnostics), graphics (grammar-quality charts) — Excel wins for quick single-table human edits.' },
      { q: 'What does library(tidyverse) give you and why load it as one?', a: 'The core coherent packages (readr, dplyr, tidyr, ggplot2, tibble, purrr, stringr, forcats…) — one load, consistent design philosophy (tidy data in/out), fewer conflicts than cherry-picking packages with clashing conventions.' },
      { q: 'Your plot code works in one session and fails in another. Likely cause?', a: 'No project/relative paths — the script depends on the session\'s working directory and loaded objects; fix: RStudio project, here::here() for paths, restart-and-run-all as the reproducibility test.' },
      { q: 'Write the one-line dplyr chain for average revenue by region, sorted descending.', a: 'sales |> group_by(region) |> summarise(avg_rev = mean(revenue, na.rm = TRUE)) |> arrange(desc(avg_rev)) - group, aggregate, sort, with NA handled explicitly.' },
      { q: 'Why is reproducibility a business argument, not an academic one?', a: 'Audits, regulation and handover all require the same number from the same data on rerun - scripted R projects (relative paths, renv, restart-and-run-all) make the analysis an asset instead of a person.' },
    ],
  },
  {
    slug: 'r-basics-data-structures',
    number: 2,
    title: 'RStudio & R Basics: Objects, Vectors, Data Structures',
    minutes: 45,
    summary:
      'Working in RStudio, assigning values and the environment, vectors and atomic types, coercion rules, object types, and the five data structures — vectors, matrices, arrays, data frames, lists, plus factors for categorical data.',
    status: 'live',
    objectives: [
      'Use the console, editor, environment and help systems fluently',
      'Assign, name, subset vectors with index and logical vectors',
      'Build and subset matrices, arrays, lists, and data frames',
      'Create and order factors; understand coercion rules',
    ],
    sections: [
      {
        heading: '1. Assignment, vectors, coercion',
        body: [
          '**RStudio tour**: console (immediate execution; up-arrow history), editor (scripts — the professional habit: everything in a script), environment pane (what exists — your state), history/plots/help. Help: ?mean, ??search across packages, args() for signatures, and reading error messages LITERALLY (R tells you what broke). **Assignment**: x <- 5 (the R-idiomatic arrow; = also works in most contexts); case-sensitive names; `<-` in scripts for clarity. Objects live in the environment; ls(), rm(); everything in R is an object — data, functions, models, plots.',
          '**Vectors** — R\'s atom: c(2, 4, 6); atomic types: numeric (double), integer, character, logical (TRUE/FALSE), complex, raw. **Coercion rules** (the silent bug-maker): mixing types in one vector demotes upward — logical → numeric → character: c(1, "a") gives both character; TRUE + 1 = 2 (logical as 0/1); "5" stays text (as.numeric to convert). **Vectorisation**: operations apply element-wise WITHOUT loops — x*2, sqrt(x), ifelse(test, yes, no) — R\'s speed and idiom; Recycling: shorter vectors repeat (c(1,2)+c(1,2,3,4) works but warns — a classic silent bug). Subsetting: x[3] (position), x[-3] (exclude), x[c(1,3)] (set), x[x > 2] (LOGICAL mask — the most idiomatic filter), names(x) for name indexing. Missing data: NA is contagious (mean(x) → NA unless na.rm = TRUE); NULL vs NA distinction.',
        ],
        callout: {
          type: 'exam',
          text: 'The coercion ladder — memorise: logical < numeric < character. c(TRUE, 5) → numeric; c(5, "5") → character BOTH. Subsetting drill: x <- c(10, 20, 30, 40) — x[2] = 20 · x[-2] = 10 30 40 · x[x > 15] = 20 30 40 · x[c(TRUE,FALSE,TRUE,FALSE)] = 10 30. And NA arithmetic: mean(c(1,NA,3)) = NA; add na.rm = TRUE → 2.',
        },
      },
      {
        heading: '2. Matrices, arrays, lists, data frames, factors',
        body: [
          '**Matrix**: 2-D same-type — matrix(1:6, nrow=2, byrow=TRUE); dimnames; indexing m[1, ] (row 1), m[ ,2] (column 2), m[1,2]; matrix algebra: %*% (multiplication — NOT *), t() transpose, solve() inverse, diag() — the tools F06\'s covariance algebra uses (σp² = wᵀΣw → t(w) %*% Sigma %*% w). **Array**: n-D matrix (rare in practice; the home of contingency tables).',
          '**List**: ordered container of ANYTHING — list(a = 1:3, b = "text", c = lm(y~x)) — the return type of every statistical model (result$coefficients, result[[1]]: [[ ]] picks the element, $ picks by name). **Data frame**: the workhorse — list of equal-length vectors (columns can differ in type — the spreadsheet analogue); tibble = modern data frame (no row names, lazy printing, better subsetting); building: data.frame(x=..., y=...); indexing BOTH ways: df$col, df[["col"]], df[ , "col"], df[1, 2], df[df$units > 100, ] (row logical mask — the base-R dplyr::filter equivalent); str(), summary(), nrow(), names(). **Factors**: categorical data with FIXED levels — factor(c("low","high","low"), levels = c("low","medium","high")) — control ordering (matters for plots and regression contrasts); levels(), table(), forcats::fct_reorder for display order; stringsAsFactors history (R4 made it FALSE by default — create factors deliberately). Common structure bugs: columns as factors when you meant text (regression treats them differently); matrices coerced to character by one string element; df row-subset dropping to a vector (drop = FALSE).',
        ],
        bullets: [
          'Everything is an object; assign with <-; case-sensitive',
          'Vector types: numeric, integer, character, logical; atomic = one type',
          'Coercion: logical < numeric < character (silent!)',
          'Vectorised ops; recycling warnings; ifelse()',
          'Subsetting: [position], [negative], [logical mask], [names]',
          'NA contagious → na.rm = TRUE; NULL ≠ NA',
          'Matrix: one type, m[rows, cols]; %*% for algebra; t(), solve()',
          'List: anything, [[i]] and $; models return lists',
          'Data frame/tibble: columns of mixed type; df[mask, ] row filter',
          'Factor: levels ordered deliberately; drives plots and contrasts',
        ],
      },
    ],
    diagram: {
      title: 'The data-structure family tree',
      caption: 'Dimensionality × type-homogeneity defines every structure; the data frame (2-D, mixed) is where business data lives.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="R data structures">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="30" y="30" width="180" height="52" rx="10" fill="#e0f2fe"/><text x="120" y="50" fill="#0c4a6e" font-weight="600">VECTOR</text><text x="120" y="68" fill="#075985">1-D · one type · c()</text>
    <rect x="240" y="30" width="180" height="52" rx="10" fill="#bbf7d0"/><text x="330" y="50" fill="#14532d" font-weight="600">MATRIX</text><text x="330" y="68" fill="#166534">2-D · one type · m[i, j]</text>
    <rect x="450" y="30" width="180" height="52" rx="10" fill="#dcfce7"/><text x="540" y="50" fill="#14532d" font-weight="600">ARRAY</text><text x="540" y="68" fill="#166534">n-D · one type</text>
    <rect x="240" y="110" width="180" height="52" rx="10" fill="#fef9c3"/><text x="330" y="130" fill="#713f12" font-weight="600">LIST</text><text x="330" y="148" fill="#a16207">any dim · any types · [[i]] · $</text>
    <rect x="450" y="110" width="180" height="52" rx="10" fill="#ffedd5"/><text x="540" y="130" fill="#7c2d12" font-weight="600">DATA FRAME / tibble</text><text x="540" y="148" fill="#9a3412">2-D · mixed columns</text>
    <rect x="240" y="190" width="390" height="40" rx="10" fill="#ede9fe"/><text x="435" y="215" fill="#4c1d95" font-weight="600">FACTOR = categorical vector with fixed, ordered levels</text>
    <line x1="212" y1="56" x2="238" y2="56" stroke="#475569" stroke-width="1.5"/>
    <line x1="420" y1="56" x2="448" y2="56" stroke="#475569" stroke-width="1.5"/>
    <line x1="330" y1="82" x2="330" y2="108" stroke="#475569" stroke-width="1.5"/>
    <line x1="420" y1="136" x2="448" y2="136" stroke="#475569" stroke-width="1.5"/>
    <text x="120" y="130" fill="#475569">homogeneous types →</text>
    <text x="120" y="148" fill="#475569">math and speed</text>
    <text x="120" y="180" fill="#475569">mixed types →</text>
    <text x="120" y="198" fill="#475569">business tables</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Coercion ladder', expr: 'logical < numeric < character', meaning: 'Silent type demotion' },
      { name: 'Logical subset', expr: 'x[x > 2] — the mask idiom', meaning: 'Filter without loops' },
      { name: 'Matrix algebra', expr: 't(w) %*% Sigma %*% w', meaning: 'Covariance computations (F06 link)' },
    ],
    examples: [
      {
        title: 'Vectors: subset, recycle, coerce',
        given: ['x <- c(10, 20, 30, 40); y <- c(1, 2); w <- c("5", 6)'],
        steps: [
          { text: 'Masks', calc: 'x[x >= 20 & x < 40] → 20 30 (& combines element-wise — && does NOT vectorise: classic bug)' },
          { text: 'Positions', calc: 'x[-c(1, 4)] → 20 30; x[length(x)] → 40 (last element idiom)' },
          { text: 'Recycling', calc: 'x + y → 11 22 31 42 (y recycles 1,2,1,2 — intended? if not, a silent error)' },
          { text: 'Coercion', calc: 'w → "5" "6" (both character!); as.numeric(w) → 5 6; sum(w) errors until converted' },
        ],
        answer: 'Masks, negatives, recycling, coercion — the four vector behaviours that decide whether R code is right or just quiet.',
      },
      {
        title: 'Data frame surgery in base R',
        given: ['df: month, region, units, price (100 rows)'],
        steps: [
          { text: 'Inspect', calc: 'str(df); summary(df) — types and distributions first (factor columns? NA counts?)' },
          { text: 'Filter rows', calc: 'df[df$region == "South" & df$units > 50, ] — mask on rows, blank = all columns' },
          { text: 'Derive + aggregate', calc: 'df$rev <- df$units * df$price; aggregate(rev ~ region, df, sum) — base-R group-by' },
          { text: 'Tidyverse equivalent', calc: 'df |> filter(region=="South", units>50) |> mutate(rev=units*price) |> group_by(region) |> summarise(rev=sum(rev)) — same logic, readable left-to-right' },
        ],
        answer: 'Base masks and dplyr verbs do the same work; learn the mask idiom first (it IS the verbs\' engine), then write pipelines.',
      },
    ],
    caseStudy: {
      title: 'Case — The factor that quietly changed the regression',
      body: [
        'An analyst reads a CSV of loan data. A branch-code column (values "101"…"118") imports as text; a helper converts it with as.numeric() after an accidental factor() wrap: as.numeric(factor(x)) returns the LEVEL INDICES 1…18, not the branch codes. Downstream, a "branch risk" coefficient is fitted on meaningless 1–18 values and presented as significant.',
      ],
      questions: [
        'What exactly does as.numeric(factor(x)) return?',
        'What is the correct conversion?',
        'What check would have caught it immediately?',
      ],
      takeaways: [
        'as.numeric(factor(x)) yields the underlying integer codes (1..k in level order) — a classic silent corruption; correct: as.numeric(as.character(x)) or read the column as numeric at import (col_types)',
        'Defence-in-depth: str()/glimpse() after import; summary() sanity (branch code mean should be ~110, not ~9.5); value checks against the source (table() of first digits)',
        'Factor discipline: factors are for genuine categories (with deliberate level order for plots/contrasts); numeric identifiers should never be factors — readr\'s col_types and R 4.0 defaults reduce but do not eliminate the trap',
        'Exam line: know what [[ ]], $, [ , ] return on each structure — most "wrong number" bugs are structure bugs',
      ],
    },
    revision: [
      '<- assignment; case-sensitive; ls()/rm(); everything is an object',
      'Atomic types: numeric, integer, character, logical',
      'Coercion: logical < numeric < character; as.numeric/as.character deliberately',
      'Vectorised operations; recycling; ifelse()',
      'Subsets: [ ], negative, logical mask, names; & vs && (vectorised vs scalar)',
      'NA contagious: na.rm = TRUE; NULL ≠ NA',
      'Matrix m[i, j]; %*%, t(), solve(), diag()',
      'List [[i]] vs $; models return lists',
      'Data frame df[mask, ]; tibble modern defaults',
      'Factor levels ordered by design; table(); fct_reorder',
    ],
    practice: [
      { q: 'mean(c(1, 2, NA, 4)) returns NA. Why is this GOOD design?', a: 'R refuses to guess whether NA should be excluded, zero, or imputed — forcing the explicit decision (na.rm = TRUE) prevents silent wrong averages; the alternative (Excel-like skip) computes a number you never certified.' },
      { q: 'Difference between df[2] and df[[2]]?', a: 'df[2] returns a one-column DATA FRAME (still a table); df[[2]] returns the VECTOR itself — needed for arithmetic and modelling; $ behaves like [[ ]]. Mixing them up breaks code that expects a vector (e.g., mean(df[2]) errors).' },
      { q: 'Why does t(w) %*% Sigma %*% w work but w * Sigma fail?', a: '* is element-wise (with recycling — nonsense for portfolio maths); %*% is true matrix multiplication — dimensions must conform (1×n · n×n · n×1). This single distinction computes F06\'s σp² correctly or not at all.' },
      { q: 'What does sum(c(10, NA, 30)) return and how do you fix it?', a: 'NA - contamination is deliberate, R refuses to guess. Add na.rm = TRUE to get 40, or decide explicitly whether to impute: the error message is a design feature.' },
      { q: 'x is 1:10. Give two ways to select the even-position elements.', a: 'x[seq(2, 10, by = 2)] (positions) or x[seq_along(x) %% 2 == 0] (logical mask) - the mask version generalises to any condition.' },
    ],
  },
  {
    slug: 'r-functions-io-control',
    number: 3,
    title: 'Functions, Data I/O, Control Structures & Packages',
    minutes: 40,
    summary:
      'Reading and writing data from text, Excel and the web; writing your own functions; control structures (if-else, for, while, repeat); the apply family and purrr instead of loops; and the packages/libraries lifecycle.',
    status: 'live',
    objectives: [
      'Import text, Excel, web data; export results correctly',
      'Write functions with arguments, defaults and return values',
      'Use if/else, for, while — and know when to vectorise instead',
      'Manage the package lifecycle: install, library, versions',
    ],
    sections: [
      {
        heading: '1. Data in, data out',
        body: [
          '**Reading text**: read.csv (base) vs readr::read_csv (faster, types guessed sensibly, returns tibble, no string→factor surprises); arguments that matter: header, sep, na = c("", "NA", "-"), skip, col_types (explicit types = reproducibility). **Excel**: readxl::read_excel(path, sheet = , range = , col_types = ) — read ONE clean sheet per import (merged cells and footnotes belong to BA01\'s prep lecture; better to fix in the source). **Web**: read.csv on a URL; httr2/jsonlite for APIs (GET → content → fromJSON flattens JSON to data frames); rvest for HTML tables (html_table() — three lines to pull a listed table); APIs with keys: store keys in environment (.Renviron), NEVER in code.',
          '**Writing**: write_csv (text — the interchange format), readr::write_excel_csv (Excel-friendly), saveRDS/readRDS (single R object with types preserved — models, cleaned data), save/load (.RData — workspace snapshots, discouraged: opaque), openxlsx::write.xlsx for true Excel output. The reproducibility rule: raw data is READ-ONLY; every cleaned dataset is REGENERATED by script (cleaned_csv is a build artifact — never edit by hand).',
        ],
        callout: {
          type: 'note',
          text: 'Function-writing template to memorise: name <- function(arg1, arg2 = default) { body; return(value) }. The return() is implicit on the last expression — write it explicitly when there are multiple exits. Functions are verbs, arguments are nouns, defaults document intent. Test with the three cases you expect plus one you don\'t (NA, empty, wrong type).',
        },
      },
      {
        heading: '2. Control flow and the package system',
        body: [
          '**if / else**: if (cond) {...} else {...}; vectorised ifelse(cond, yes, no) and dplyr::case_when() for multi-way (the readable classifier); else if chains; && / || scalar AND/OR (single, in ifs) vs & / | vectorised (masks — the bug from Unit 2). **for loops**: for (i in 1:n) or the idiomatic for (x in vector); iterate over VALUES not indices where possible; pre-allocate results (out <- vector("list", n) then fill — growing objects in loops is quadratic pain). **while**: while (cond) {...} — convergence loops (bisection, IRR iteration — F06 links); **repeat + break** for do-while; next skips an iteration.',
          '**The loop-free way — apply family and purrr**: apply(X, MARGIN, FUN) on matrices; lapply(list, FUN) → list; sapply → simplified vector; tapply(X, INDEX, FUN) → by-group (the base group-by); **purrr::map** family (map, map_dbl, map_df) = lapply with type-guaranteed outputs and better errors — map_dbl(list_of_vectors, mean). The idiom: "if you are writing a for loop in R, ask whether map or vectorisation already exists" — loops remain right for: recursion-like flows, convergence (while), and side-effects (plots per group). **Packages**: install.packages("dplyr") once; library(dplyr) every session; conflicts (dplyr::filter vs stats::filter — use dplyr::filter explicitly); updates and reproducibility: sessionInfo(), renv::snapshot/restore pins versions per project (the answer to "it worked last year"); finding packages: CRAN task views (Finance, TimeSeries, MachineLearning), documentation (vignettes, ?help), citation().',
        ],
        bullets: [
          'read_csv: types, na strings, col_types explicit for reproducibility',
          'read_excel: one clean sheet; httr2/jsonlite APIs; rvest html_table()',
          'write_csv / saveRDS; raw data read-only; cleaned = regenerated',
          'function(args, defaults); explicit return; test the NA case',
          'if/else scalar; ifelse()/case_when() vectorised',
          '&& in ifs; & in masks — never swap',
          'for: pre-allocate; while: convergence; repeat+break: do-while',
          'lapply/sapply/tapply; purrr::map_dbl type-safe iteration',
          'install once, library each session; renv pins versions',
          'dplyr::filter vs stats::filter conflicts — qualify names',
        ],
      },
    ],
    diagram: {
      title: 'I/O, control and iteration map',
      caption: 'Data enters (csv/Excel/web), logic runs (functions with control flow), iteration goes vectorised-map-loop only when needed.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="R I/O and control flow map">
  <defs><marker id="rca" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="16" y="40" width="150" height="60" rx="10" fill="#e0f2fe"/><text x="91" y="62" fill="#0c4a6e" font-weight="600">INPUT</text><text x="91" y="78" fill="#075985">read_csv · read_excel</text><text x="91" y="92" fill="#075985">httr2 · rvest</text>
    <rect x="210" y="40" width="150" height="60" rx="10" fill="#dcfce7"/><text x="285" y="62" fill="#14532d" font-weight="600">FUNCTIONS</text><text x="285" y="78" fill="#166534">args + defaults</text><text x="285" y="92" fill="#166534">return(value)</text>
    <rect x="404" y="16" width="150" height="48" rx="10" fill="#fef9c3"/><text x="479" y="36" fill="#713f12" font-weight="600">if / else · case_when</text><text x="479" y="50" fill="#a16207">branching</text>
    <rect x="404" y="76" width="150" height="48" rx="10" fill="#ffedd5"/><text x="479" y="96" fill="#7c2d12" font-weight="600">for · while · repeat</text><text x="479" y="110" fill="#9a3412">loops when needed</text>
    <rect x="404" y="136" width="150" height="48" rx="10" fill="#fee2e2"/><text x="479" y="156" fill="#7f1d1d" font-weight="600">map / apply</text><text x="479" y="170" fill="#991b1b">vectorised iteration</text>
    <rect x="598" y="40" width="110" height="60" rx="10" fill="#ede9fe"/><text x="653" y="62" fill="#4c1d95" font-weight="600">OUTPUT</text><text x="653" y="78" fill="#5b21b6">write_csv</text><text x="653" y="92" fill="#5b21b6">saveRDS · Quarto</text>
    <line x1="166" y1="70" x2="208" y2="70" stroke="#475569" stroke-width="1.5" marker-end="url(#rca)"/>
    <line x1="360" y1="70" x2="402" y2="40" stroke="#475569" stroke-width="1.4"/>
    <line x1="360" y1="70" x2="402" y2="100" stroke="#475569" stroke-width="1.4"/>
    <line x1="360" y1="70" x2="402" y2="160" stroke="#475569" stroke-width="1.4"/>
    <line x1="554" y1="160" x2="590" y2="80" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line x1="554" y1="40" x2="596" y2="60" stroke="#475569" stroke-width="1.4"/>
    <line x1="554" y1="100" x2="596" y2="75" stroke="#475569" stroke-width="1.2" stroke-dasharray="4 3"/>
    <rect x="210" y="150" width="150" height="70" rx="10" fill="#f8fafc"/>
    <text x="285" y="172" fill="#334155" font-weight="600">PACKAGES</text>
    <text x="285" y="188" fill="#475569">install once · library always</text>
    <text x="285" y="204" fill="#475569">renv pins versions</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Function definition', expr: 'f <- function(x, mult = 2) { mult * x }', meaning: 'Verb with default noun' },
      { name: 'case_when classifier', expr: 'case_when(x > 100 ~ "H", x > 50 ~ "M", TRUE ~ "L")', meaning: 'Readable multi-way if' },
      { name: 'map idiom', expr: 'map_dbl(split(df, df$region), ~ mean(.x$units))', meaning: 'Group means without loops' },
      { name: 'Convergence loop', expr: 'while (abs(x2 − x1) > tol) { ... }', meaning: 'IRR/bisection pattern' },
    ],
    examples: [
      {
        title: 'Write a DSCR function and use it everywhere',
        given: ['Task: DSCR = CFADS / (interest + principal) across 30 project-period rows'],
        steps: [
          { text: 'Define', calc: 'dscr <- function(cfads, interest, principal, digits = 2) round(cfads / (interest + principal), digits)' },
          { text: 'Vectorise', calc: 'dscr(df$cfads, df$interest, df$principal) — 30 values at once, no loop' },
          { text: 'Guard', calc: 'add: if (any((interest+principal) == 0)) stop("debt service is zero") — fail loudly, not silently' },
          { text: 'Reuse', calc: 'min(dscr(...)) → the covenant number; which(df_period, dscr < 1.2) → breach periods — one function, every report' },
        ],
        answer: 'One tested function replaces copy-paste arithmetic in ten files — the unit of reuse is the function.',
      },
      {
        title: 'Loop vs map: compute per-region stats',
        given: ['df with 4 regions; want mean and sd of units per region'],
        steps: [
          { text: 'for-loop way', calc: 'for (r in unique(df$region)) { sub <- df[df$region == r, ]; print(c(r, mean(sub$units), sd(sub$units))) } — works, verbose' },
          { text: 'tapply way', calc: 'tapply(df$units, df$region, mean); tapply(df$units, df$region, sd)' },
          { text: 'purrr way', calc: 'df |> split(df$region) |> map(~ c(mean = mean(.x$units), sd = sd(.x$units))) |> map_dfr(bind_rows... or simply dplyr: group_by(region) |> summarise(m = mean(units), s = sd(units))' },
          { text: 'Verdict', calc: 'dplyr summarise is the business idiom; map for lists (e.g., 50 files), loops for convergence — choose by shape of the problem' },
        ],
        answer: 'Three grammars, one answer: group_by/summarise for data, map for lists, while for convergence.',
      },
    ],
    caseStudy: {
      title: 'Case — Fifty files, one function, one afternoon',
      body: [
        'A firm receives 50 monthly state-level CSVs (same schema, occasional surprises: one file has a notes row on top, another uses comma-decimals). Hand-processing history: two analyst-days per month, errors in 5–8% of files.',
        'An R pipeline: a read_one() function with defensive checks (type validation, row-count assertion, notes-row skip), list.files() |> map(read_one) |> list_rbind() to stack, a data-quality report of exceptions (which files broke WHICH rule), and write_csv of the tidy master. Runtime: 40 seconds; errors: surfaced, not hidden.',
      ],
      questions: [
        'Why did defensive checks matter more than the automation itself?',
        'What did map() replace, and what does it still not handle?',
        'How does this change the monthly analyst job?',
      ],
      takeaways: [
        'The surprises (notes rows, comma-decimals) were the real problem — asserts and explicit types convert silent corruption into loud failures with file names attached',
        'map over list.files replaces the copy-paste loop; it cannot decide what "right" looks like — that is the function\'s job (schema checks live IN read_one)',
        'The analyst shifts from running the process to improving the checks — exception-handling becomes the work; the pipeline runs on a schedule',
        'Exam link: read_* arguments (skip, na, col_types, locale = locale(decimal_mark = ",")) + functions with guards + map = the production-grade import pattern',
      ],
    },
    revision: [
      'read_csv(header, na, skip, col_types); read_excel(sheet, range)',
      'Web: httr2 + jsonlite::fromJSON; rvest::html_table(); keys in .Renviron',
      'write_csv, saveRDS/readRDS; raw read-only; artifacts regenerated',
      'function(arg, default = x) { ...; return(v) } — test NA/wrong-type cases',
      'if/else + && ||; ifelse(), case_when() for vectors',
      'for over values; pre-allocate; while for convergence; repeat+break',
      'lapply→list, sapply→vector, tapply→by group; purrr::map_dbl type-safe',
      'dplyr::filter vs stats::filter — qualify conflicting names',
      'install.packages once; library every session; renv for versions',
      'Loops right for: convergence, side-effects (plot per group)',
    ],
    practice: [
      { q: 'read_csv warns "parsing failures" on import. First action?', a: 'Read the problems attribute: problems(df) shows row/col/expected/got; fix with col_types (or na =) and re-read — never proceed on a partially-parsed table (the NA cells silently bias every summary).' },
      { q: 'Why prefer map_dbl(xs, f) over sapply(xs, f)?', a: 'sapply SIMPLIFIES unpredictably (vector, matrix, or list depending on outputs) — code that worked breaks when data changes shape; map_dbl GUARANTEES a numeric vector or a loud error: type-safety at scale.' },
      { q: 'Write a while-loop sketch for IRR by bisection.', a: 'lo <- -0.9; hi <- 10; repeat { mid <- (lo+hi)/2; npv_mid <- sum(cf/(1+mid)^(1:n)); if (abs(npv_mid) < 1e-9) break; if (npv_mid > 0) lo <- mid else hi <- mid } — convergence loop + tolerance + break: the F06 exercise in R clothing.' },
      { q: 'Your loop grows a data frame 10,000 times and takes minutes. Diagonalise the problem.', a: 'Pre-allocate: out <- vector(\'list\', n), fill by index, bind once with dplyr::bind_rows(out). Growing objects copies the whole structure each pass - quadratic pain for one line of prevention.' },
      { q: 'read_csv warns of 300 parsing failures. What is the responsible next step?', a: 'problems(df) to see rows/expected/actual, then fix with col_types or na = and re-read. Never proceed silently - coerced NAs bias every downstream summary and you will not know which ones.' },
    ],
  },
  {
    slug: 'r-graphics-grammar',
    number: 4,
    title: 'Graphical Representation in R: base, ggplot2 & Plots for Data Frames',
    minutes: 40,
    summary:
      'The full graphics toolkit: base R plots (plot, hist, barplot, boxplot), the ggplot2 grammar (data + aes + geoms + facets + scales + themes), the complete chart cabinet for analysis and communication, and data-frame computations that feed the plots.',
    status: 'live',
    objectives: [
      'Draw base plots fast (the five-minute analysis set)',
      'Compose ggplot2 graphics from the grammar deliberately',
      'Pick the right geom for each question (BA01 rules in R)',
      'Compute plot-ready summaries from data frames (dplyr → ggplot2)',
    ],
    sections: [
      {
        heading: '1. Base plots and the ggplot grammar',
        body: [
          '**Base graphics** — fast analysis, not presentation: plot(x, y) scatter; hist(x, breaks = , main = , xlab = ) distribution; boxplot(y ~ g) group comparison; barplot(table(g)) counts; pairs(df) scatter matrix (the 10-second EDA of a small data frame); lines(), points(), abline(lm(y~x)) additions; par(mfrow = c(2,2)) grids. Base plots are imperative — draw, add, done.',
          '**ggplot2** — the grammar of graphics, declarative: `ggplot(data, aes(x, y, colour = g)) + geom_point() + facet_wrap(~region) + scale_y_continuous(labels = comma) + labs(title = ...) + theme_minimal()`. The five layers: **data**, **aesthetics** (aes: which variables map to x/y/colour/size/shape), **geoms** (the mark: point, line, smooth, bar, col, histogram, density, boxplot, violin, tile, errorbar), **scales** (axes, legends, labels, limits — NEVER truncate a bar axis here either), **facets** (small multiples: facet_wrap/facet_grid — the honest way to show 12 categories), plus **themes** and **coord** (flip, polar for pies). The BA01 encoding ladder applies verbatim: position/length geoms for comparison, scatter for relationships, histogram/density/box for distributions, facets instead of 20-line spaghetti. Statistics through geoms: geom_smooth(method = "lm") draws the regression WITH its confidence band (uncertainty shown by default — the ethics built in); stat_summary for mean±CI bars.',
        ],
        callout: {
          type: 'exam',
          text: 'Grammar translation table (exam asks "write the ggplot for X"): comparison across categories → geom_col() (bar of values; geom_bar() counts); distribution → geom_histogram()/geom_density(); distribution by group → geom_boxplot()/geom_violin(); relationship → geom_point() + geom_smooth(method="lm"); composition over time → geom_area()/position="fill"; counts vs values → geom_bar (counts) vs geom_col (values); error bars → geom_errorbar with a computed summary. Facet rather than colour-cram 8+ categories.',
        },
      },
      {
        heading: '2. Data-frame computations → plots',
        body: [
          'The analysis pattern: **dplyr computes, ggplot2 communicates** — pipe summaries straight in: df |> group_by(region) |> summarise(rev = sum(units*price)) |> ggplot(aes(reorder(region, rev), rev)) + geom_col() + coord_flip() — sorted, horizontal (label-friendly), read in one line. Common computations feeding plots: percentages (mutate(pct = n/sum(n))), rolling means (zoo::rollmean / slider), cumulative values (cumsum), change vs baseline (index to 100), per-capita normalisation (BA01\'s choropleth rule), confidence intervals (mean ± 1.96·sd/√n for the errorbar), z-scores for outlier flagging.',
          'The chart cabinet for analysts: histogram + density overlay (shape); boxplot by group + jittered points (group distribution with the data visible); scatter + smooth (relationship, with the model); heatmap (geom_tile of correlation matrix — corrplot or ggplot; the model-selection screen for BA06 regression); line + ribbon (trend with confidence — ggplot\'s default ribbon IS good ethics); small multiples (facet_grid(year ~ region)); paired dumbbell/lollipop for before-after; bar + errorbar for group means with uncertainty. Export: ggsave("fig.png", width, height, dpi = 300) — sizes chosen for the slide, not the screen; theme_set() for report consistency. Interactive: plotly::ggplotly(p) — hover for IDs; note BA01 Unit 5 ethics applies (colour-blind palettes via scale_colour_viridis_d, direct labelling via ggrepel).',
        ],
        bullets: [
          'Base: plot, hist, boxplot(y~g), barplot(table), pairs, abline(lm())',
          'ggplot: data + aes + geom + scale + facet + theme, composed with +',
          'aes() MAPS variables; outside aes() sets constants (colour = "red")',
          'geom_col = values; geom_bar = counts; reorder() sorts bars',
          'geom_smooth(method="lm") draws regression + CI band by default',
          'Facets for many categories; never 12-colour spaghetti',
          'dplyr pipes feed ggplot: compute → communicate in one chain',
          'Compute for plots: %, cumsum, rolling, per-capita, CI, z-scores',
          'Heatmap of cor(df) = the regression pre-screen',
          'ggsave with real dimensions; viridis palettes; ggrepel direct labels',
        ],
      },
    ],
    diagram: {
      title: 'The ggplot grammar layers',
      caption: 'Every chart is data mapped to aesthetics, drawn by geoms, scaled, faceted, themed — compose the layers deliberately.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ggplot grammar layers">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="30" y="30" width="200" height="44" rx="9" fill="#e0f2fe"/><text x="130" y="50" fill="#0c4a6e" font-weight="600">DATA</text><text x="130" y="64" fill="#075985">the tidy data frame</text>
    <rect x="30" y="84" width="200" height="44" rx="9" fill="#bbf7d0"/><text x="130" y="104" fill="#14532d" font-weight="600">AES</text><text x="130" y="118" fill="#166534">x · y · colour · size · shape</text>
    <rect x="30" y="138" width="200" height="44" rx="9" fill="#fef9c3"/><text x="130" y="158" fill="#713f12" font-weight="600">GEOM</text><text x="130" y="172" fill="#a16207">point · line · col · box · smooth</text>
    <rect x="30" y="192" width="200" height="44" rx="9" fill="#fee2e2"/><text x="130" y="212" fill="#7f1d1d" font-weight="600">SCALE + FACET + THEME</text><text x="130" y="226" fill="#991b1b">axes · small multiples · look</text>
    <rect x="300" y="84" width="390" height="100" rx="12" fill="#f8fafc"/>
    <text x="495" y="110" fill="#334155" font-weight="600">EXAMPLE — all five layers</text>
    <text x="495" y="132" fill="#475569" font-size="11">ggplot(sales, aes(month, rev, colour = region)) +</text>
    <text x="495" y="148" fill="#475569" font-size="11">geom_line() + facet_wrap(~zone) +</text>
    <text x="495" y="164" fill="#475569" font-size="11">scale_y_continuous(labels = comma) + theme_minimal()</text>
    <line x1="230" y1="52" x2="298" y2="90" stroke="#475569" stroke-width="1.3"/>
    <line x1="230" y1="106" x2="298" y2="106" stroke="#475569" stroke-width="1.3"/>
    <line x1="230" y1="160" x2="298" y2="128" stroke="#475569" stroke-width="1.3"/>
    <line x1="230" y1="214" x2="298" y2="150" stroke="#475569" stroke-width="1.3"/>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Grammar', expr: 'ggplot(df, aes(x, y, colour = g)) + geom_*() + facet_*() + scale_*()', meaning: 'Layered composition' },
      { name: 'aes vs constant', expr: 'aes(colour = region) maps · colour = "red" sets', meaning: 'The classic beginner distinction' },
      { name: 'CI band', expr: 'geom_smooth(method = "lm") draws mean + 95% band', meaning: 'Uncertainty by default' },
      { name: 'Sorted bars', expr: 'aes(x = reorder(region, rev), y = rev)', meaning: 'Order carries meaning' },
    ],
    examples: [
      {
        title: 'One data frame, four questions, four geoms',
        given: ['df: store, region, month, units, price, satisfaction'],
        steps: [
          { text: 'Distribution', calc: 'ggplot(df, aes(units)) + geom_histogram(bins = 30, fill = "steelblue") — shape/outliers of demand' },
          { text: 'By group', calc: 'ggplot(df, aes(region, units)) + geom_boxplot() + geom_jitter(width = .1, alpha = .3) — group spread WITH data points' },
          { text: 'Relationship', calc: 'ggplot(df, aes(price, units)) + geom_point(alpha = .4) + geom_smooth() — price elasticity curvature with CI' },
          { text: 'Composition', calc: 'df |> group_by(region, month) |> summarise(rev = sum(units*price)) |> ggplot(aes(month, rev, fill = region)) + geom_area() — stacked trend' },
        ],
        answer: 'Distribution → box → scatter+smooth → stacked area: the four-question EDA set, one grammar.',
      },
      {
        title: 'Plot the regression honestly (feeds Unit 5)',
        given: ['model: lm(sales ~ ad_spend); want diagnostics, not just the line'],
        steps: [
          { text: 'Fit + plot line', calc: 'ggplot(df, aes(ad_spend, sales)) + geom_point() + geom_smooth(method = "lm") — slope visible with its band' },
          { text: 'Residuals', calc: 'aug <- broom::augment(m); ggplot(aug, aes(.fitted, .resid)) + geom_point() + geom_hline(yintercept = 0) — funnel = heteroscedasticity (BA06 LINE check)' },
          { text: 'Normality', calc: 'ggplot(aug, aes(sample = .resid)) + geom_qq() + geom_qq_line() — normal-probability plot for the assumptions' },
          { text: 'Pre-screen', calc: 'corrplot::corrplot(cor(df[num_cols])) — spot multicollinearity before the model, not after' },
        ],
        answer: 'broom::augment + three geoms = the complete regression audit trail, publishable as-is.',
      },
    ],
    caseStudy: {
      title: 'Case — The spaghetti plot that hid the pattern',
      body: [
        'A monthly report charts all 22 product lines in one colour-coded line chart — 22 legend entries, three similar blues, no pattern readable. Management concludes "no clear seasonal structure".',
        'An analyst re-plots: facet_wrap(~product, scales = "free_y") small multiples (22 mini-charts), the top-3 revenue lines highlighted in a separate summary panel. Seasonality is obvious in 14 products immediately; two products show structural breaks (relaunches) that the spaghetti rendered invisible.',
      ],
      questions: [
        'Which BA01 principle did the original violate?',
        'Why do small multiples scale where colour does not?',
        'What does the analyst\'s summary panel add?',
      ],
      takeaways: [
        'Encoding capacity: colour reliably separates ~5–7 classes; 22 lines overloads pre-attentive processing — the chart didn\'t lie, it just said nothing',
        'Facets give every series its own position-encoded canvas — capacity scales with panels; free_y admits different scales honestly (label it!)',
        'The summary panel serves the decision (top-3 revenue) — hierarchy: what matters most gets the biggest ink (Bertin\'s levels of information)',
        'ggplot2 grammar makes the fix a one-line change (facet_wrap) — the grammar exists so design decisions are explicit',
      ],
    },
    revision: [
      'Base: plot, hist(x, breaks), boxplot(y~g), barplot(table), pairs()',
      'ggplot layers: data, aes, geom, scale, facet, theme — joined by +',
      'aes() maps variables; constants set outside aes()',
      'geom_col (values) vs geom_bar (counts); reorder() for sorted bars',
      'histogram/density/box/violin for distributions; point+smooth for relations',
      'geom_smooth(method="lm") = line + 95% band by default',
      'Facets for many categories (scales = "free_y" labelled)',
      'dplyr chain |> ggplot(): compute then communicate',
      'Plot computations: %, cumsum, rollmeans, per-capita, CI, z-score',
      'broom::augment → residual/QQ plots; corrplot for collinearity',
      'ggsave sized for slide; viridis palettes; ggrepel labels',
    ],
    practice: [
      { q: 'Code: bar chart of average order value by city, sorted, with values labelled.', a: 'df |> group_by(city) |> summarise(aov = mean(order)) |> ggplot(aes(reorder(city, aov), aov)) + geom_col(fill="steelblue") + geom_text(aes(label = round(aov)), vjust = -0.3) + coord_flip() + labs(x = NULL, y = "Avg order ₹" )' },
      { q: 'Your geom_point shows a solid blue blob at high density. Fix?', a: 'Overplotting: alpha = 0.3 (transparency), geom_bin2d()/geom_hex() (2-D binning), or sample/zoom — and check whether the DENSITY is the message (then the hex IS the chart).' },
      { q: 'Why does ggplot draw a shaded band around geom_smooth?', a: 'It is the confidence band of the smooth — uncertainty shown by default (BA01 ethics). Removing it (se = FALSE) should be a deliberate, justified choice, not a cosmetic one.' },
      { q: 'Translate to ggplot: side-by-side boxplots of salary by department, with jittered points.', a: 'ggplot(df, aes(department, salary)) + geom_boxplot() + geom_jitter(width = 0.15, alpha = 0.35) - the box gives the summary, the jitter shows the data (BA01 honesty).' },
      { q: 'Which geom for counts of a categorical variable, and which for pre-computed values?', a: 'geom_bar() counts rows; geom_col() plots y values you supply. Mixing them up is the most common first-week ggplot error.' },
    ],
  },
  {
    slug: 'r-statistical-analysis-models',
    number: 5,
    title: 'Statistical Analysis in R: Tests, ANOVA, Non-parametric & Regression Family',
    minutes: 50,
    summary:
      'The statistics that pay salaries, in R: hypothesis tests (one/two-sample, paired), comparing means across groups with ANOVA, non-parametric alternatives when assumptions fail, simple and multiple linear regression with diagnostics, and logistic regression for yes/no outcomes.',
    status: 'live',
    objectives: [
      'Run t-tests, ANOVA and their non-parametric counterparts in R',
      'Fit lm() models: coefficients, CIs, R², predictions with intervals',
      'Diagnose linear models (residuals, influence, multicollinearity)',
      'Fit glm(logit) models: odds ratios, confusion matrix, ROC/AUC',
    ],
    sections: [
      {
        heading: '1. Tests and group comparisons in R',
        body: [
          'The hypothesis-testing engine (BA06 Unit 4 theory, now executable): **t-tests** — t.test(x, mu = 30) one-sample; t.test(y ~ group) two-sample (Welch default — var.test first if you must assume equality); t.test(before, after, paired = TRUE) paired — the same test chooser: value/independent/paired. **ANOVA**: aov(units ~ zone) |> summary();TukeyHSD(aov(...)) post-hoc with correction; the F, then WHICH pairs; effect size etaSquared (or report group means ± SD).',
          '**Non-parametric alternatives** (when normality/outliers/ordinal data break the t/ANOVA assumptions — test with shapiro.test and eyeball the Q-Q): **Wilcoxon signed-rank** (paired/one-sample median), **Mann–Whitney U / wilcox.test(y ~ g)** (two groups — rank-based), **Kruskal–Wallis** (3+ groups — rank ANOVA) + pairwise.wilcox.test with Bonferroni/Holm; chi-square for counts: chisq.test(table(g1, g2)) with expected ≥ 5 (fisher.test when not). The decision table to memorise: means + normal → t/ANOVA; medians/ranks/skew → Wilcoxon/MW/KW; counts → chisq/Fisher. Reporting discipline: statistic + p + effect size + CI, pre-registered hypothesis — R makes the arithmetic free so the thinking must be explicit.',
        ],
        callout: {
          type: 'exam',
          text: 'R test-name quiz: one-sample t → t.test(x, mu=); two groups → t.test(y~g); paired → t.test(a, b, paired=TRUE); 3+ means → aov(y~g)+TukeyHSD; skewed two groups → wilcox.test(y~g); skewed 3+ → kruskal.test(y~g); categorical association → chisq.test(table(x,y)). Non-parametric = ranks, fewer assumptions, slightly less power when parametric assumptions hold.',
        },
      },
      {
        heading: '2. Regression family in R',
        body: [
          '**Simple/multiple linear**: m <- lm(sales ~ ads + price + festival, data = df); summary(m) — coefficients (Estimate = effect holding others), Std. Error, t/p (keep if p < .05), R², adjusted R², F; confint(m) 95% CIs; predict(m, newdata, interval = "confidence"/"prediction") — the two interval types: mean vs individual outcome. **Diagnostics**: plot(m) four-panel (residuals-vs-fitted linearity/homoscedasticity, Q-Q normality, scale-location, Cook\'s distance influence); vif(m) car package (collinearity > 5–10 flag); broom::tidy/augment/glance for model-as-data-frame. **Feature care**: factors enter as dummy contrasts (treatment coding — base level\'s effect in the intercept); interactions y ~ x*z; polynomial/ splines for curvature; step()/AIC or domain-driven selection — parsimony wins.',
          '**Logistic regression** for binary outcomes (churn, default, response): g <- glm(churn ~ tenure + plan + complaints, family = binomial, data = df). Coefficients are LOG-ODDS — exponentiate: exp(coef(g)) gives **odds ratios** (1.25 = 25% higher odds per unit, others held). Prediction: predict(g, newdata, type = "response") → probabilities; classify at a threshold (0.5 default — choose by cost of false positive vs negative); evaluate: table(actual, predicted) confusion matrix — accuracy, precision, recall; ROC curve pROC::roc, AUC (0.5 = coin flip, 0.8 = good, 0.9 = suspicious — check leakage); calibration. The business framing: logistic regression IS the credit scorecard / churn model of industry (F02 Unit 5 links) — the coefficient table is a decision document (which lever, which sign, how big), not just a fit statistic.',
        ],
        bullets: [
          't.test: mu=, y~g, paired=TRUE; var.test for equality check',
          'aov + TukeyHSD (post-hoc with correction); report effect sizes',
          'Shapiro + Q-Q to justify parametric vs rank tests',
          'wilcox / kruskal / chisq / fisher — the assumption-failure family',
          'lm: Estimate = per-unit effect, others held; confint; two predict intervals',
          'plot(m): residual-fitted, Q-Q, scale-location, Cook\'s; vif() collinearity',
          'Factors → dummy contrasts; interactions x*z; parsimony by AIC/domain',
          'glm(binomial): exp(coef) = odds ratios; type="response" → probability',
          'Threshold by cost; confusion matrix: precision/recall; ROC-AUC',
          'Calibration > accuracy for decision use; watch data leakage',
        ],
      },
    ],
    diagram: {
      title: 'From question to model in R',
      caption: 'The test chooser and the regression ladder: continuous outcomes climb lm(), binary outcomes go logistic, assumption failures drop to ranks.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Question to model map">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="270" y="14" width="180" height="36" rx="9" fill="#f1f5f9"/><text x="360" y="37" fill="#334155" font-weight="600">What is the outcome?</text>
    <rect x="20" y="80" width="200" height="40" rx="9" fill="#e0f2fe"/><text x="120" y="98" fill="#0c4a6e">continuous — compare groups?</text><text x="120" y="112" fill="#075985">t.test · aov (+Tukey)</text>
    <rect x="20" y="140" width="200" height="40" rx="9" fill="#bbf7d0"/><text x="120" y="158" fill="#14532d">skewed / ordinal?</text><text x="120" y="172" fill="#166534">wilcox · kruskal</text>
    <rect x="20" y="200" width="200" height="40" rx="9" fill="#fef9c3"/><text x="120" y="218" fill="#713f12">counts / categories?</text><text x="120" y="232" fill="#a16207">chisq.test · fisher.test</text>
    <rect x="440" y="80" width="260" height="40" rx="9" fill="#fee2e2"/><text x="570" y="98" fill="#7f1d1d">continuous — explain/predict?</text><text x="570" y="112" fill="#991b1b">lm() + diagnostics + intervals</text>
    <rect x="440" y="140" width="260" height="40" rx="9" fill="#ede9fe"/><text x="570" y="158" fill="#4c1d95">binary (yes/no)?</text><text x="570" y="172" fill="#5b21b6">glm(binomial) → odds ratios, ROC</text>
    <line x1="300" y1="50" x2="130" y2="78" stroke="#475569" stroke-width="1.3"/>
    <line x1="420" y1="50" x2="560" y2="78" stroke="#475569" stroke-width="1.3"/>
    <line x1="120" y1="120" x2="120" y2="138" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3"/>
    <text x="360" y="230" fill="#475569" font-size="11">always: state H₀/H₁ first · effect size + CI with every p · pre-register the metric</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Linear model', expr: 'lm(y ~ x1 + x2, data) → ŷ = b₀ + b₁x₁ + b₂x₂', meaning: 'Effects holding others constant' },
      { name: 'Prediction intervals', expr: 'predict(m, newdata, interval = "confidence"|"prediction")', meaning: 'Mean band vs outcome band' },
      { name: 'Logistic', expr: 'glm(y ~ x, binomial): log(p/(1−p)) = b₀ + Σbᵢxᵢ', meaning: 'Binary outcome model' },
      { name: 'Odds ratio', expr: 'exp(bᵢ) — multiplier on the odds per unit x', meaning: 'The interpretable logistic coefficient' },
    ],
    examples: [
      {
        title: 'Churn model end-to-end',
        given: ['df: churn (0/1), tenure (months), complaints (count), plan (factor: basic/premium)'],
        steps: [
          { text: 'Fit', calc: 'g <- glm(churn ~ tenure + complaints + plan, family = binomial, data = df); summary(g)' },
          { text: 'Interpret', calc: 'exp(coef(g)): tenure OR 0.96 (4% lower odds per extra month); complaints OR 1.8; planpremium OR 0.7 — each with p-values' },
          { text: 'Predict + threshold', calc: 'df$prob <- predict(g, df, type="response"); classify at 0.4 (retention cost < churn cost → lower threshold)' },
          { text: 'Evaluate', calc: 'confusionMatrix: precision 0.62, recall 0.71; pROC::auc 0.81 — good; calibrate: decile plot of predicted vs actual churn' },
        ],
        answer: 'Coefficients name the levers (complaints!), the ROC prices the model, the threshold encodes the economics.',
      },
      {
        title: 'Multiple regression with a factor and a fix',
        given: ['m <- lm(sales ~ ads + price + zone, data = df); suspicious residual funnel; zone has 4 levels'],
        steps: [
          { text: 'Read summary', calc: 'ads +3.9 (p .001), price −11.2 (p .01), zoneNorth +52 vs base zoneEast (p .02) — dummy contrasts vs the base level' },
          { text: 'Diagnostics', calc: 'plot(m): residuals fan out with fitted → heteroscedasticity; refit on log(sales) — coefficients become elasticities (% effects)' },
          { text: 'Collinearity', calc: 'car::vif(m): ads VIF 4.8 (borderline — ads and zone size correlate); interpret ads cautiously or interact' },
          { text: 'Predict', calc: 'predict(m, newdata, interval = "prediction") → range for a NEW month (wider than the confidence band for the mean)' },
        ],
        answer: 'summary → plot → vif → predict with intervals: the four-step ritual every lm() deserves.',
      },
    ],
    caseStudy: {
      title: 'Case — The perfect churn model that couldn\'t work (leakage)',
      body: [
        'A team builds a churn model with AUC 0.97 — heroic. Deployment: useless. Post-mortem: the feature set included "days_since_last_contact_with_retention_team" — customers are CONTACTED BY RETENTION AS PART OF THE CHURN PROCESS after the decision to leave is visible internally. The feature encodes the label\'s future (target leakage): the model learned "already leaving" proxies, not churn drivers.',
        'Rebuilt with only pre-decision data (tenure, usage trend, complaints, plan, payments), AUC 0.79 — deployable, actionable.',
      ],
      questions: [
        'What is data leakage and why does it inflate AUC?',
        'How do you test for it before deployment?',
        'Which business question does the honest model answer better?',
      ],
      takeaways: [
        'Leakage = features correlated with the label through the OUTCOME\'s consequences, not its causes — the model becomes an expensive echo; suspiciously high AUC (0.95+) is a leakage alarm, not a celebration',
        'Test: time-split validation (train on older, test on future the model would face), feature-level "would we know this AT PREDICTION TIME?" audit, and permutation importance sanity',
        'The honest model ranks the levers management can pull BEFORE churn (usage decline, complaints) — 0.79 AUC with causal-ish features beats 0.97 with a crystal ball of hindsight',
        'Exam line: glm skill = fit + interpret (odds ratios) + evaluate (confusion/ROC) + validate (leakage, calibration) — the last step separates classroom from industry',
      ],
    },
    revision: [
      't.test(mu=, y~g, paired=TRUE); Welch default; var.test check',
      'aov(y~g) + TukeyHSD; report means ± SD and effect size',
      'Assumption checks: shapiro.test, Q-Q plot, residual plots',
      'Rank family: wilcox.test (1-2 groups), kruskal.test (3+), pairwise corrections',
      'Counts: chisq.test(table), expected ≥ 5 else fisher.test',
      'lm(): Estimate/SE/t/p; R², adj R²; confint(); F-statistic',
      'plot(m): residual-fitted, Q-Q, scale-location, Cook\'s; vif()',
      'Factors = dummies vs base; interactions x*z; AIC/parsimony',
      'predict(): confidence (mean) vs prediction (individual) intervals',
      'glm binomial: exp(coef) odds ratios; type="response" probabilities',
      'Threshold by cost; confusion matrix precision/recall; ROC-AUC',
      'Leakage test: "would I know this at prediction time?" + time-split',
    ],
    practice: [
      { q: 'Wilcoxon p = 0.03, t-test p = 0.07 on the same skewed data. Which do you report?', a: 'The rank test — skew violates t\'s normality (check Q-Q); report medians with the Wilcoxon. Do NOT test until one is significant (that is p-hacking); justify the test BEFORE running.' },
      { q: 'Model says complaints OR = 1.8. Translate for the CEO.', a: 'Each additional complaint raises the odds of churn by ~80%, holding tenure/plan constant — and with base churn 8%, odds 0.087→0.156 ≈ probability ~13.5%: significant, actionable (fix complaint resolution).' },
      { q: 'Adjusted R² rises when you delete a variable. Keep or delete?', a: 'Delete — its explanatory power was less than its penalty (noise or collinearity). Simpler models generalise; validate on holdout to confirm (BA06 link).' },
      { q: 'Comparing satisfaction scores across 4 store formats, data badly right-skewed. Test choice and follow-up?', a: 'kruskal.test(sat ~ format) (rank-based ANOVA), and if significant, pairwise.wilcox.test with Holm correction to locate which formats differ - report medians, not means.' },
      { q: 'A logistic model gives coefficient -0.05 on tenure (months). Interpret for a manager.', a: 'exp(-0.05) = 0.95: each extra month of tenure cuts the odds of churn by about 5 percent, holding other variables fixed. Long-tenure customers are stickier - protect them.' },
    ],
  },
];
