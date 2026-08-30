import type { Lecture } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM BA02 — Business Forecasting
   Unit-wise lectures: forecasting system → time-series methods →
   qualitative methods → advanced techniques → applications
   ═══════════════════════════════════════════════════════════════ */

export const businessForecastingLectures: Lecture[] = [
  {
    slug: 'forecasting-system-accuracy-metrics',
    number: 1,
    title: 'The Forecasting System: Data, Types & Accuracy Metrics',
    minutes: 40,
    summary:
      'What forecasting is and why it pays, types of forecasts by time horizon and method, the components of a forecasting system, data collection and preparation, and the accuracy scoreboard — MAE, MSE/RMSE, MAPE and their honest comparisons.',
    status: 'live',
    objectives: [
      'Match forecast types to planning decisions (horizon × granularity)',
      'Design the forecasting system: data → model → monitor → revise',
      'Collect and prepare data that a model can learn from',
      'Compute MAE, RMSE, MAPE and pick the right metric for the decision',
    ],
    sections: [
      {
        heading: '1. Why forecast and what a system contains',
        body: [
          'Benefits (the business case): inventory and working-capital optimisation (the ₹ of one point of forecast accuracy), capacity and staffing plans, budget credibility, supplier collaboration, risk buffers sized by variance not folklore. Types by **horizon**: immediate/operational (hours–weeks: SKUs, staffing — statistical, automated), short term (months–2 yrs: sales, budgets — statistical + judgment), medium (2–5 yrs: capacity, product — causal + scenarios), long/strategic (5+ yrs: scenarios, Delphi — structural judgment). By **method**: quantitative (time-series: extrapolate the past; causal: explain the driver — regression, econometrics) vs qualitative (expert judgment, Delphi, market research) — the law: quantitative where history is rich and structure stable; qualitative where the product/regime is new.',
          '**The forecasting system** (not just a model): (1) **data collection & preparation** — the right grain (SKU-week for replenishment; region-month for S&OP), definitions frozen (what IS a sale: gross/net, booked/shipped?), history long enough to contain seasonality (2–3 full cycles), outlier treatment (document, never silently delete — COVID years get flagged and damped, not erased), missing values, calendar effects (festivals moving, leap weeks — 53-week years), product lifecycle (new SKUs have no history: analog forecasting); (2) **model selection & fitting**; (3) **forecast generation with uncertainty** (a NUMBER is half a forecast; intervals are the other half); (4) **monitoring** — tracking signals, error dashboards, forecast-value-added analysis (does the process beat a naive benchmark? does the human override add or destroy accuracy?); (5) **revision policy** — who overrides, with what evidence. The organisational lesson (Makridakis, M-competitions): simple models + good data + monitored process beat sophisticated models on neglected process.',
        ],
        callout: {
          type: 'exam',
          text: 'Accuracy metrics with formulas and traps: MAE = Σ|e|/n (robust, rupee-interpretable); MSE/RMSE = √(Σe²/n) (punishes big misses — stockout territory); MAPE = Σ|e|/y×100/n (scale-free BUT explodes when y→0 — never for intermittent demand; symmetric MAPE fixes bias); MASE = MAE/naive-MAE (<1 beats naive — the honest benchmark). Exam pattern: compute two models\' MAE+RMSE, see them rank differently, explain (RMSE punishes Model B\'s rare huge errors).',
        },
      },
      {
        heading: '2. The metrics in practice and the benchmark discipline',
        body: [
          'Every accuracy number means nothing without a **benchmark**: the naive forecast (tomorrow = today; next month = same month last year — seasonal naive) defines zero-skill; MASE < 1 or % better-than-naive is the honest claim ("our model is 22% more accurate than last-year-same-week" — the sentence a CFO funds). **Bias vs variance of errors**: Mean Error ≈ 0 required (a model that always over-forecasts is biased — fix the bias first, it is free accuracy); then reduce dispersion. **Forecast value added (FVA)**: measure accuracy at each stage — statistical → analyst override → sales consensus → management sign-off; any stage that degrades accuracy is theatre (the most common finding in practice: consensus meetings add optimism, not accuracy).',
          'Data collection realities: demand history ≠ sales history (censored by stockouts — record DEMAND, unconstrained, or the model learns to forecast your shortages); promotion flags, price changes, holiday calendars as **event variables**; hierarchy consistency (SKU forecasts should sum near region forecasts — reconcile top-down and bottom-up: hierarchical forecasting). Monitoring: **tracking signal** = cumulative error / MAD, alarm beyond ±4; error-percentile dashboards by SKU class (A items get model attention, C items get naive); re-fit cadence vs drift. The cultural rule that closes the unit: forecast accuracy is a SHARED process metric, not a salesperson\'s KPI — punishing honest forecasts buys you lies as inputs.',
        ],
        bullets: [
          'Horizons: operational (weeks) / tactical (months) / strategic (years) → method choice',
          'Quantitative (time-series, causal) vs qualitative (Delphi, scenarios)',
          'System = data → model → intervals → monitoring → revision policy',
          'Grain and frozen definitions BEFORE modelling; demand not sales',
          'Outliers documented and damped; 2–3 seasonal cycles of history',
          'MAE (robust) · RMSE (punishes tails) · MAPE (no low-volume data) · MASE (vs naive)',
          'Benchmark vs naive; bias (ME≈0) before dispersion; FVA per stage',
          'Tracking signal ±4; SKU-classed attention; accuracy is a process KPI',
        ],
      },
    ],
    diagram: {
      title: 'The forecasting system loop',
      caption: 'Data feeds the model; the forecast carries intervals; monitoring measures error against naive benchmarks and feeds revision — continuously.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Forecasting system loop">
  <defs><marker id="fa2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="20" y="60" width="150" height="64" rx="10" fill="#e0f2fe"/><text x="95" y="82" fill="#0c4a6e" font-weight="600">DATA</text><text x="95" y="98" fill="#075985">demand · events</text><text x="95" y="112" fill="#075985">clean · right grain</text>
    <rect x="210" y="60" width="150" height="64" rx="10" fill="#dcfce7"/><text x="285" y="82" fill="#14532d" font-weight="600">MODEL</text><text x="285" y="98" fill="#166534">fit · holdout test</text><text x="285" y="112" fill="#166534">simple first</text>
    <rect x="400" y="60" width="150" height="64" rx="10" fill="#fef9c3"/><text x="475" y="82" fill="#713f12" font-weight="600">FORECAST</text><text x="475" y="98" fill="#a16207">number + interval</text><text x="475" y="112" fill="#a16207">by SKU · period</text>
    <rect x="590" y="60" width="120" height="64" rx="10" fill="#fee2e2"/><text x="650" y="82" fill="#7f1d1d" font-weight="600">MONITOR</text><text x="650" y="98" fill="#991b1b">error · bias</text><text x="650" y="112" fill="#991b1b">FVA · signal ±4</text>
    <line x1="170" y1="92" x2="208" y2="92" stroke="#475569" stroke-width="1.5" marker-end="url(#fa2)"/>
    <line x1="360" y1="92" x2="398" y2="92" stroke="#475569" stroke-width="1.5" marker-end="url(#fa2)"/>
    <line x1="550" y1="92" x2="588" y2="92" stroke="#475569" stroke-width="1.5" marker-end="url(#fa2)"/>
    <path d="M650,124 C650,200 95,200 95,126" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#fa2)"/>
    <text x="372" y="212" fill="#475569">revise: re-fit on drift · override with evidence · benchmark vs naive always</text>
    <text x="360" y="36" fill="#334155" font-weight="600">accuracy = MAE/RMSE/MAPE vs naive (MASE) — the scoreboard funds the system</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'MAE', expr: 'Σ|y − ŷ| / n', meaning: 'Typical miss, robust' },
      { name: 'RMSE', expr: '√(Σ(y − ŷ)²/n)', meaning: 'Punishes large errors' },
      { name: 'MAPE', expr: 'Σ|y − ŷ|/y × 100/n', meaning: 'Scale-free % (fails at y≈0)' },
      { name: 'MASE', expr: 'MAE(model) / MAE(naive) — <1 beats naive', meaning: 'The honest benchmark' },
      { name: 'Tracking signal', expr: 'Σe / MAD — alarm |TS| > 4', meaning: 'Bias runaway detector' },
    ],
    examples: [
      {
        title: 'Two models, three metrics, one decision',
        given: ['10 periods; errors — Model A: 3,2,4,3,2,3,4,2,3,4 · Model B: 1,0,2,1,0,9,1,0,2,10'],
        steps: [
          { text: 'MAE', calc: 'A = 30/10 = 3.0 · B = 26/10 = 2.6 — B looks better (typical miss smaller)' },
          { text: 'RMSE', calc: 'A = √(98/10) = 3.13 · B = √(192/10) = 4.38 — A wins: B\'s two blowouts dominate' },
          { text: 'Interpretation', calc: 'If big misses cost asymmetrically (stockouts/airfreight/expedite fees), RMSE is the right metric → choose A despite worse MAE' },
          { text: 'Check bias', calc: 'ME: A = 0 (unbiased) · B = +1.3 (over-forecast bias) — fixing B\'s bias first would cut both metrics' },
        ],
        answer: 'Metric choice = loss function: MAE for symmetric costs, RMSE when tails hurt disproportionately — and bias correction is always free.',
      },
      {
        title: 'FVA: does the consensus meeting add anything?',
        given: ['Monthly process accuracy (MAPE): statistical 18% → analyst override 16% → sales consensus 21% → exec sign-off 22%'],
        steps: [
          { text: 'Stage FVA', calc: 'Analyst adds −2 pts (value ✓); consensus adds +5 pts of ERROR; exec adds another +1' },
          { text: 'Diagnosis', calc: 'The consensus layer injects optimism (sales sandbagging then over-correcting; execs anchor on targets)' },
          { text: 'Reform', calc: 'Keep analyst override; replace consensus-number-setting with consensus-ASSUMPTION review (promotions, launches); measure sign-off impact quarterly' },
          { text: 'Benchmark line', calc: 'Seasonal naive MAPE = 24% → the statistical model itself beats naive by 6 pts; state that in every review' },
        ],
        answer: 'FVA turns process politics into arithmetic: stages that add error get simplified; the system keeps only what measurably helps.',
      },
    ],
    caseStudy: {
      title: 'Case — Forecasting the sales that never happened (stockout censoring)',
      body: [
        'A consumer-electronics retailer forecasts from SALES history. A star SKU stocked out for 5 of 12 weeks (recorded sales = 0 or low shelf-availability). The model dutifully learns "demand falls in those weeks" and under-forecasts the next cycle — orders shrink — stockouts worsen: a self-fulfilling decline.',
      ],
      questions: [
        'What is the statistical name for the data problem?',
        'How should demand be reconstructed?',
        'What monitoring would have caught it early?',
      ],
      takeaways: [
        'Censored data: sales are a lower bound on demand when inventory binds — models trained on censored history forecast the shortage, not the market',
        'Reconstruct demand: lost-sales estimation from out-of-stock windows (interpolate from comparable SKUs/stores, uplift by availability %), record demand at order-capture (orders placed = demand signal), flag stockout weeks as events',
        'Monitoring: bias by SKU (persistent negative error = under-forecast), fill-rate vs forecast error joint dashboard — when fill-rate falls and error turns negative together, censoring is the diagnosis',
        'System lesson (Unit 1\'s core): the expensive failure was in DATA, upstream of any model — most forecast improvements are data repairs',
      ],
    },
    revision: [
      'Horizon → method: weeks statistical, months stat+judgment, years scenarios/Delphi',
      'Quantitative (time-series/causal) vs qualitative; stability decides',
      'System: data → model → intervals → monitoring → revision',
      'Right grain, frozen definitions, demand-not-sales, event flags',
      '2–3 seasonal cycles of history; outliers documented/damped',
      'MAE robust · RMSE tails · MAPE no low-volume · MASE vs naive',
      'Bias (ME≈0) before precision; tracking signal ±4',
      'FVA per stage: kill stages that add error',
      'Accuracy is a process metric — punish lying inputs, not honest misses',
    ],
    practice: [
      { q: 'MAPE on 10 periods: model 12%, naive 15%. Pitch it honestly.', a: '"20% error reduction vs the last-year benchmark" — and state the loss context (what 1% accuracy is worth in inventory ₹), plus bias ≈ 0. MASE = 12/15 = 0.8 < 1: genuinely skillful.' },
      { q: 'Why can RMSE prefer the model with the WORSE MAE?', a: 'RMSE squares errors: one 10-unit miss hurts as much as a hundred 1-unit misses. For lumpy/asymmetric-cost demand (stockouts, airfreight), tail control matters more than the typical miss.' },
      { q: 'A new SKU launches in 3 weeks. Which method and why?', a: 'No history → qualitative/analog: forecast from similar SKUs\' launch curves (analog forecasting), corrected by distribution reach and launch marketing weight; switch to statistical after ~2 cycles of actuals; track early-life bias by analogy class.' },
      { q: 'Model A: MAPE 12 percent, bias -3 percent. Model B: MAPE 15 percent, bias 0. Which do you ship?', a: 'A, after fixing bias - persistent bias is worse than scatter because it compounds in inventory and cash planning. Recalibrate A (bias adjustment layer) and you likely beat B on both metrics.' },
      { q: 'Why is a holdout window mandatory before believing any accuracy statistic?', a: 'Fitted accuracy on training data rewards overfitting - a model can look great in-sample and fail out-of-sample. The holdout simulates the future the model will actually face; report only that error.' },
    ],
  },
  {
    slug: 'time-series-methods-smoothing-decomposition-arima',
    number: 2,
    title: 'Quantitative Methods: Smoothing, Decomposition & ARIMA',
    minutes: 50,
    summary:
      'The time-series toolkit in depth: components of a series, moving averages and single/double/triple (Holt–Winters) exponential smoothing, classical decomposition, trend and seasonality handling, and Box–Jenkins ARIMA modelling with the identification discipline.',
    status: 'live',
    objectives: [
      'Decompose a series into trend, seasonal, cyclical, irregular parts',
      'Apply MA, single/double/triple exponential smoothing with formulas',
      'Read an ACF/PACF to identify ARIMA(p,d,q) orders',
      'Choose between smoothing, decomposition and ARIMA by data and need',
    ],
    sections: [
      {
        heading: '1. Smoothing and decomposition',
        body: [
          'A series Yₜ = T (trend) × S (seasonal, fixed period) × C (cycle, years) × I (irregular) — multiplicative when seasonal swing grows with level (business default), additive when constant. **Moving averages**: SMA(n) smooths but lags by (n−1)/2 and needs n history points to start; WMA weights recent periods more. **Exponential smoothing** — the industrial workhorse: **single (SES)**: Fₜ₊₁ = αYₜ + (1−α)Fₜ — forecast = weighted average of all history with geometrically declining weights; α from minimising error (0.1–0.3 typical); works for flat series only. **Double (Holt)**: adds a level + trend equations (α, β) — linear-growth series. **Triple (Holt–Winters)**: level + trend + seasonality (α, β, γ), additive or multiplicative season — the SKU-level default for retail/CPG demand (handles the Christmas/Diwali hump). Smoothing models are cheap, robust, auto-tunable across thousands of SKUs — that is why they run the replenishment world.',
          '**Classical decomposition**: estimate T by MA-of-length-season → de-trend → average same-period residuals → S → remainder = C+I. Uses: seasonal INDICES (month-of-year multipliers: Jan = 0.92 of average) that plug into planning; deseasonalising for regression on true trend; X-13/SEATS (Census) as institutional versions. **Seasonality handling**: test with seasonal sub-series plots and autocorrelation at lag 12; calendar adjustments (moving festivals — Easter/Diwali regressors; trading days per month) before blaming the model. Cycle (years-long, economy) is NOT seasonality — handled by causal variables or judgment (Unit 3 scenarios).',
        ],
        callout: {
          type: 'exam',
          text: 'The three smoothing models and WHEN: SES — no trend, no season (α only); Holt — trend, no season (α, β); Holt–Winters — trend AND season (α, β, γ; additive vs multiplicative season). Numeric drill: Fₜ₊₁ = αYₜ + (1−α)Fₜ — two recursions by hand (α = 0.2) is the classic 6-mark question. And ARIMA identification: ACF tail + PACF cut → AR; ACF cut + PACF tail → MA; both tail → ARMA; difference (d) until stationary.',
        },
      },
      {
        heading: '2. Box–Jenkins ARIMA',
        body: [
          '**ARIMA(p, d, q)**: AR(p) — regressive on own past values; I(d) — differenced d times for stationarity; MA(q) — regressive on past ERRORS. The Box–Jenkins discipline: (1) **stationarity check** — plot, ADF test; difference (or log for variance stabilisation) until mean/variance/autocovariance are time-invariant; seasonal differencing (lag 12) for monthly S; (2) **identification** — ACF/PACF shape (AR(p): PACF cuts at p, ACF tails; MA(q): ACF cuts at q, PACF tails; ARMA: both tail; SARIMA adds seasonal orders (P,D,Q)₁₂); (3) **estimation** (MLE); (4) **diagnostics** — residuals must be white noise (Ljung–Box); leftover structure = go back to (2); (5) forecast with intervals that WIDEN with horizon.',
          'Choosing the toolkit: smoothing — thousands of SKUs, automation, short horizons (speed, robustness); decomposition — when you need EXPLAINABLE seasonal indices for planning; ARIMA — fewer series, longer horizons, best statistical efficiency when well-specified; **SARIMA + regressors (ARIMAX)** when promotions/price move demand (statistical + causal hybrid); ETS (error-trend-seasonal state-space) unifies smoothing theory and rivals ARIMA in automated selection. Empirics (M-competitions): on monthly business data, ETS vs ARIMA differences are modest; data quality, event handling and process (Unit 1) dominate. The exam-favourite contrast: smoothing extrapolates the pattern; ARIMA models the autocorrelation structure; causal methods (Unit 4) explain it with drivers.',
        ],
        bullets: [
          'Y = T × S × C × I (multiplicative) or + (additive)',
          'SES: Fₜ₊₁ = αYₜ + (1−α)Fₜ — flat series; Holt adds trend; Winters adds season',
          'Decomposition → seasonal indices (Jan = 0.92) for planning + deseasonalising',
          'Calendar: trading days, moving festivals — adjust before modelling',
          'ARIMA: stationarity → identify (ACF/PACF) → estimate → Ljung–Box residuals',
          'AR: PACF cuts; MA: ACF cuts; both tail: ARMA; lag-12 spike: seasonal',
          'SARIMA(p,d,q)(P,D,Q)₁₂; ARIMAX with promotion regressors',
          'Forecast intervals widen with horizon — report them',
          'M-competitions: simple + well-processed data beat clever models',
        ],
      },
    ],
    diagram: {
      title: 'Series components and the model chooser',
      caption: 'Decompose first: the pattern present (trend? season? both?) selects the smoothing model; autocorrelation structure selects the ARIMA.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Time series decomposition and model chooser">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="16" y="16" width="220" height="216" rx="12" fill="#f8fafc"/>
    <text x="126" y="38" fill="#334155" font-weight="600">COMPONENTS</text>
    <path d="M36,190 C90,170 160,120 216,80" fill="none" stroke="#16a34a" stroke-width="2.5"/>
    <text x="126" y="206" fill="#14532d">Trend T</text>
    <path d="M36,120 C56,90 76,150 96,110 C116,70 136,140 156,100 C176,60 196,130 216,95" fill="none" stroke="#7c3aed" stroke-width="2"/>
    <text x="126" y="150" fill="#5b21b6">Season S + noise</text>
    <text x="126" y="222" fill="#475569" font-size="11">Y = T × S × C × I</text>
    <rect x="262" y="16" width="210" height="216" rx="12" fill="#f8fafc"/>
    <text x="367" y="38" fill="#334155" font-weight="600">SMOOTHING</text>
    <rect x="282" y="56" width="170" height="34" rx="8" fill="#e0f2fe"/><text x="367" y="78" fill="#0c4a6e">SES — flat (α)</text>
    <rect x="282" y="100" width="170" height="34" rx="8" fill="#bbf7d0"/><text x="367" y="122" fill="#14532d">Holt — trend (α,β)</text>
    <rect x="282" y="144" width="170" height="34" rx="8" fill="#fef9c3"/><text x="367" y="166" fill="#713f12">Winters — +season (α,β,γ)</text>
    <text x="367" y="204" fill="#475569" font-size="11">thousands of SKUs, automated</text>
    <rect x="498" y="16" width="206" height="216" rx="12" fill="#f8fafc"/>
    <text x="601" y="38" fill="#334155" font-weight="600">ARIMA</text>
    <rect x="518" y="56" width="166" height="34" rx="8" fill="#fed7aa"/><text x="601" y="78" fill="#9a3412">d: difference to stationarity</text>
    <rect x="518" y="100" width="166" height="34" rx="8" fill="#fee2e2"/><text x="601" y="122" fill="#7f1d1d">ACF cut → MA(q); PACF cut → AR(p)</text>
    <rect x="518" y="144" width="166" height="34" rx="8" fill="#ede9fe"/><text x="601" y="166" fill="#4c1d95">SARIMA (P,D,Q)₁₂</text>
    <text x="601" y="204" fill="#475569" font-size="11">residuals white (Ljung–Box)</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'SES recursion', expr: 'Fₜ₊₁ = αYₜ + (1−α)Fₜ', meaning: 'Geometrically weighted history' },
      { name: 'Holt level/trend', expr: 'Lₜ = αYₜ + (1−α)(Lₜ₋₁+bₜ₋₁) · bₜ = β(Lₜ−Lₜ₋₁) + (1−β)bₜ₋₁', meaning: 'Local linear trend' },
      { name: 'Holt–Winters', expr: 'adds Sₜ = γ(Yₜ/Lₜ) + (1−γ)Sₜ₋ₘ', meaning: 'Multiplicative season update' },
      { name: 'ARIMA(p,d,q)', expr: 'AR: Yₜ = c + ΣφᵢYₜ₋ᵢ + εₜ · MA: + Σθⱼεₜ₋ⱼ', meaning: 'Autocorrelation model' },
      { name: 'Seasonal index', expr: 'Sₘ = (avg of month m) / (overall avg)', meaning: 'Month multiplier for planning' },
    ],
    examples: [
      {
        title: 'SES two recursions by hand',
        given: ['α = 0.3; F₁ = 40 (initial); actuals Y₁ = 44, Y₂ = 38, Y₃ = 47'],
        steps: [
          { text: 'Step 1', calc: 'F₂ = 0.3(44) + 0.7(40) = 13.2 + 28 = 41.2' },
          { text: 'Step 2', calc: 'F₃ = 0.3(38) + 0.7(41.2) = 11.4 + 28.84 = 40.24' },
          { text: 'Step 3', calc: 'F₄ = 0.3(47) + 0.7(40.24) = 14.1 + 28.17 = 42.27 — the forecast follows the level, smoothing shocks' },
          { text: 'α sensitivity', calc: 'α = 0.7 → F₄ = 44.5: higher α chases the data (reactive, noisy); α = 0.1 → 40.9 (stable, lagging) — α is the stability/reactivity dial' },
        ],
        answer: 'F₂ = 41.2, F₃ = 40.24, F₄ = 42.27 — two lines of arithmetic, the whole SES model.',
      },
      {
        title: 'Seasonal indices into a plan',
        given: ['Quarterly deseasonalised trend forecast next year: 1,000/quarter; indices Q1 0.85, Q2 1.00, Q3 0.95, Q4 1.20'],
        steps: [
          { text: 'Check', calc: 'Indices sum to 4.00 ✓ (must average 1)' },
          { text: 'Seasonal forecast', calc: 'Q1 = 850 · Q2 = 1,000 · Q3 = 950 · Q4 = 1,200 — the festive quarter carries the year' },
          { text: 'Deseasonalising actuals', calc: 'A strong Q4 of 1,150 ÷ 1.20 = 958 deseasonalised — BELOW the 1,000 trend: the "great Q4" was seasonal, not growth' },
          { text: 'Use', calc: 'Inventory/staffing keyed to indices; performance judged on DESEASONALISED numbers — seasonality is weather, not skill' },
        ],
        answer: 'Indices split planning from evaluation: forecast WITH season, judge WITHOUT it.',
      },
    ],
    caseStudy: {
      title: 'Case — The air-conditioner series: season, trend, or both?',
      body: [
        'Monthly AC unit sales, 4 years: winter troughs near zero, summer spikes growing each year (10,200 → 13,900 peak). A team fits SES; RMSE is terrible in May–June every year (under-forecast) and in winter (over-forecast). A second analyst decomposes: multiplicative season (index June = 2.1) on a growing trend; fits Holt–Winters (multiplicative); errors drop 46%. Adding a pre-summer promotion regressor (ARIMAX) removes most remaining bias.',
      ],
      questions: [
        'Why did SES fail structurally?',
        'Why multiplicative rather than additive season?',
        'What did the regressor capture that the time-series structure could not?',
      ],
      takeaways: [
        'SES assumes a flat level — this series has trend × season; model families must match the decomposition (Holt–Winters), a diagnostics-first lesson',
        'Multiplicative: the summer hump GROWS with the level (2.1x of a rising base) — additive would under-forecast every summer more than the last',
        'The promotion is a CAUSAL driver outside the series\' autocorrelation — ARIMAX/regressors handle events; pure time-series models cannot see decision variables',
        'Chooser in practice: plot/decompose → smoothing family for scale → ARIMA/ARIMAX for the few series where statistical efficiency pays → document all choices',
      ],
    },
    revision: [
      'Components T, S, C, I; multiplicative when swing grows with level',
      'SMA smooths but lags; WMA emphasises recent',
      'SES: F = αY + (1−α)F — flat; α = stability/reactivity dial',
      'Holt (α,β) trend; Winters (α,β,γ) + season; additive vs multiplicative',
      'Decomposition: seasonal indices (avg 1, sum = periods) for planning',
      'Judge performance on deseasonalised numbers',
      'Calendar adjustments: trading days, moving festivals',
      'ARIMA: difference to stationarity (ADF), ACF/PACF: AR→PACF cuts, MA→ACF cuts',
      'Ljung–Box: residuals white; SARIMA (P,D,Q)₁₂; ARIMAX + regressors',
      'ETS state-space ≈ smoothing formalised; M-competitions: process beats cleverness',
    ],
    practice: [
      { q: 'Monthly data, ACF spikes at lags 1 and 12. What do you specify?', a: 'Non-seasonal structure at lag 1 plus SEASONAL structure at lag 12 → SARIMA(p,d,q)(P,D,Q)₁₂; test seasonal differencing (D=1) and seasonal AR/MA terms from the seasonal lags of ACF/PACF.' },
      { q: 'Why do ARIMA forecast intervals widen with horizon?', a: 'Each step feeds forecast values (with their errors) into the next: variance compounds like a random walk\'s — the model is honest about knowing less further out; plot the fan, not just the line.' },
      { q: 'Your Holt–Winters forecast missed a moving festival (Diwali in Oct vs Nov). Fix?', a: 'Calendar adjustment: a festival-date regressor (days-from-Diwali by period) or moving-festival dummy in an ARIMAX/ETS-with-regressors — deterministic date effects belong as variables, not residual mysteries.' },
      { q: 'Demand: strong festive spike, flat trend. Name the model you fit and why.', a: 'Holt-Winters with additive or multiplicative seasonality (depending on whether spike size grows) or SARIMA with seasonal differencing - both handle level plus yearly seasonality without regressors.' },
      { q: 'ACF tails off, PACF cuts at lag 1. What ARMA structure is suggested?', a: 'AR(1) - a PACF shutting off after lag p points to autoregression of that order. PACF tailing with ACF cutting suggests MA instead; both tailing suggests ARMA(p,q).' },
    ],
  },
  {
    slug: 'qualitative-methods-delphi-scenarios',
    number: 3,
    title: 'Qualitative Methods: Judgment, Delphi, Scenarios & Decision Trees',
    minutes: 40,
    summary:
      'When numbers run out: expert judgment and its documented biases, the Delphi method, market research and surveys as forecast inputs, scenario planning, technology and industry trend analysis, and decision trees that price uncertainty into choices.',
    status: 'live',
    objectives: [
      'Know when qualitative methods are the RIGHT methods',
      'Run a Delphi round properly and interpret its convergence',
      'Design surveys/market research that yield forecastable inputs',
      'Build scenario sets and value decisions with trees (EMV)',
    ],
    sections: [
      {
        heading: '1. Judgment, Delphi, research',
        body: [
          'Qualitative forecasting is not a concession — it is the only tool for: new products/technologies (no history), regime breaks (policy, pandemics), long horizons (structure, not noise), and rare events (base rates absent). **Expert judgment**, documented strengths (context, causal reasoning, early signals) and calibrated biases: optimism/strategic misrepresentation (plans-of-record), anchoring (last number seen), availability (recent vivid events overweighted), over-confidence intervals too narrow — fixes: calibration training (feedback on past Brier scores), reference-class forecasting (base rates from similar past cases — Flyvbjerg\'s infrastructure tool), structured analogies.',
          '**Delphi method**: anonymous expert panel — Round 1: independent forecasts with reasons; facilitator aggregates (median + IQR); Round 2: experts see the distribution, revise or defend outliers; iterate 2–4 rounds until stable; anonymity kills groupthink and HiPPO effects, the statistical aggregation kills the loudest-voice bias; use for technology adoption, regulatory timing, long-range demand. **Market research & surveys**: intent-to-buy surveys (calibrate stated→revealed intent — historic ratio ~0.6–0.8 for durable launches), conjoint analysis (feature/price trade-offs → demand curves for designs that don\'t exist), concept tests, panel data, social listening; validity threats (hypothetical bias, sample frame, question framing — survey design matters more than sample size). **Technology/industry trend analysis**: S-curves of adoption (fit logistic curves to early data), patent/trial pipelines, experience curves (cost falls ~15–25% per doubling of cumulative volume — solar/battery), expert elicitations (Delphi again) — the structured extrapolation of structural change.',
        ],
        callout: {
          type: 'exam',
          text: 'Delphi steps, exam-perfect: (1) select diverse experts, anonymity guaranteed; (2) Round 1 independent estimates + rationale; (3) aggregate — median and inter-quartile range, feed back ALL summaries; (4) revise in light of the distribution, outliers explain or move; (5) repeat 2–4 rounds to stability; report median + spread + dissent. The three design features that do the work: ANONYMITY, ITERATION with controlled feedback, STATISTICAL aggregation (no negotiation).',
        },
      },
      {
        heading: '2. Scenarios and decision trees',
        body: [
          '**Scenario planning** (Shell school): not forecasts — internally consistent STORIES about structurally different futures, typically 3–4 built on the two most important UNCERTAIN and IMPACTFUL drivers (2×2 logic); each scenario gets: narrative, quantified parameters (growth, FX, rates feeding the finance models), early-warning indicators (which world are we in?), and pre-decided responses (triggers → actions). Scenario-blocking beats single-point planning because strategies are stress-tested across the set ("robust" = acceptable in all, "betting" = great in one, fatal in another).',
          '**Decision trees**: decisions (squares) + chance nodes (circles) + outcomes with payoffs; solve by **expected monetary value (EMV)** folding backward: at chance nodes take probability-weighted average; at decision nodes take the max. Add: the value of information (EVPI = EMV(perfect info) − EMV(no info) — the ceiling on what market research can be worth — this makes the Unit\'s market-research spend rational), risk attitudes (utility or certainty-equivalents — a loss-averse firm rejects positive-EMV bets; F01 links), and sensitivity of the choice to probabilities (which p flips the decision — the break-even probability). Trees + scenarios combine: scenario probabilities at chance nodes.',
        ],
        bullets: [
          'Qualitative when: no history, regime breaks, long horizons, rare events',
          'Judgment fixes: calibration training, reference-class base rates, structured analogies',
          'Delphi: anonymous → independent → aggregate (median/IQR) → revise → converge',
          'Surveys: stated vs revealed intent (×0.6–0.8), conjoint for non-existent products',
          'S-curves (logistic) for adoption; experience curves for cost trends',
          'Scenarios: 2 driving uncertainties × 2×2 → 3–4 narratives + early-warning triggers',
          'Robust strategy = acceptable across scenarios; betting strategy = one',
          'Trees: fold back EMV; EVPI = value ceiling of information',
          'Break-even probability: the p at which the decision flips',
        ],
      },
    ],
    diagram: {
      title: 'Decision tree with EMV fold-back',
      caption: 'Squares decide, circles chance; fold backward — expected values at circles, best choice at squares; EVPI prices the research before you buy it.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decision tree">
  <g font-family="inherit" font-size="11" text-anchor="middle">
    <rect x="20" y="105" width="16" height="16" fill="#334155"/><text x="28" y="96" fill="#334155" font-weight="600">LAUNCH?</text>
    <circle cx="180" cy="60" r="8" fill="#dc2626"/><text x="180" y="44" fill="#991b1b">demand</text>
    <circle cx="180" cy="170" r="8" fill="#dc2626"/><text x="180" y="154" fill="#991b1b">test result</text>
    <rect x="180" y="222" width="14" height="14" fill="#334155"/><text x="150" y="240" fill="#475569">no launch → 0</text>
    <line x1="36" y1="113" x2="172" y2="60" stroke="#475569" stroke-width="1.5"/>
    <line x1="36" y1="113" x2="172" y2="170" stroke="#475569" stroke-width="1.5"/>
    <line x1="36" y1="113" x2="173" y2="229" stroke="#475569" stroke-width="1.5"/>
    <text x="96" y="76" fill="#475569">launch</text>
    <text x="96" y="150" fill="#475569">pilot test</text>
    <line x1="188" y1="55" x2="320" y2="26" stroke="#475569" stroke-width="1.3"/><text x="256" y="20" fill="#14532d">high 0.3 → +₹80 cr</text>
    <line x1="188" y1="63" x2="320" y2="58" stroke="#475569" stroke-width="1.3"/><text x="262" y="52" fill="#7f1d1d">low 0.7 → −₹20 cr</text>
    <line x1="188" y1="164" x2="320" y2="130" stroke="#475569" stroke-width="1.3"/><text x="256" y="124" fill="#14532d">good 0.5 → EMV +₹8 cr</text>
    <line x1="188" y1="176" x2="320" y2="200" stroke="#475569" stroke-width="1.3"/><text x="256" y="216" fill="#7f1d1d">bad 0.5 → −₹2 cr (test cost)</text>
    <rect x="470" y="105" width="230" height="110" rx="10" fill="#f8fafc"/>
    <text x="585" y="128" fill="#334155" font-weight="600">FOLD BACK</text>
    <text x="585" y="150" fill="#475569">direct launch EMV</text>
    <text x="585" y="166" fill="#475569">= .3(80) + .7(−20) = +₹10 cr</text>
    <text x="585" y="188" fill="#475569">test branch = .5(8) + .5(−2) = +₹3 cr</text>
    <text x="585" y="206" fill="#7c2d12">launch directly — EMV ₹10 cr</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'EMV', expr: 'EMV = Σ pᵢ × payoffᵢ', meaning: 'Fold-back expectation' },
      { name: 'EVPI', expr: 'EVWPI − EMV (max info value)', meaning: 'Research spend ceiling' },
      { name: 'Logistic S-curve', expr: 'Yₜ = L / (1 + e^{−k(t−t₀)})', meaning: 'Adoption path' },
      { name: 'Experience curve', expr: 'Cost falls x% per doubling of cumulative volume', meaning: 'Structural cost trend' },
    ],
    examples: [
      {
        title: 'Price the market research (EVPI)',
        given: ['Launch now: 0.3 success (+₹80 cr) / 0.7 fail (−₹20 cr); perfect research would tell you which'],
        steps: [
          { text: 'EMV without info', calc: '0.3(80) + 0.7(−20) = 24 − 14 = +₹10 cr' },
          { text: 'EMV with PERFECT info', calc: '0.3(80) + 0.7(0 — you walk away) = +₹24 cr' },
          { text: 'EVPI', calc: '24 − 10 = ₹14 cr — no survey/test can be worth more; a test with 80% accuracy is worth less (EVSI)' },
          { text: 'Decision', calc: 'A ₹3 cr pilot that resolves ~60% of the uncertainty: worth ~₹8 cr of value — buy it IF it doesn\'t cost the launch window' },
        ],
        answer: 'EMV ₹10 cr; perfect information ₹14 cr more — that ceiling makes research budgets rational instead of ritual.',
      },
      {
        title: 'Delphi on regulatory timing',
        given: ['Question: year of India\'s comprehensive crypto regulation; Round 1 medians: 2026, 2027, 2025, 2029, 2026, 2027'],
        steps: [
          { text: 'Aggregate', calc: 'Median 2026.5, IQR 2026–2027; two outliers (2025, 2029) submit rationales' },
          { text: 'Round 2', calc: 'Panel sees distribution + reasons (election cycle vs global-FATF pressure); revisions: 2025→2026, 2029→2028; new median 2027, tighter IQR' },
          { text: 'Round 3 stability', calc: 'No movement → report median 2027, IQR 2026–2028, with the dissenting structural arguments attached' },
          { text: 'Use', calc: 'Planning input with EXPLICIT spread: contingency plans for 2026 compliance build, not a point promise' },
        ],
        answer: 'Delphi output = median + spread + recorded dissent — a distribution you can plan around, not a false point.',
      },
    ],
    caseStudy: {
      title: 'Case — Shell\'s scenarios: planning without predicting',
      body: [
        'In the early 1970s Shell\'s planners (Wack, de Geus) built scenarios including an "oil crisis" world (OPEC shock). They did not PREDICT 1973 — they made the outcome PLANNABLE: pre-positioned responses (fleet, refining mix, speed of decision) let Shell navigate the shock from relative strength while rivals improvised; Shell rose from 7th/8th to 2nd among the oil majors through the decade.',
      ],
      questions: [
        'What is the difference between a scenario and a forecast?',
        'Which design features made the exercise actionable?',
        'Where does the quantitative toolkit re-enter?',
      ],
      takeaways: [
        'A forecast assigns probabilities to one future; scenarios build decision-relevant STORIES across several — the deliverable is preparedness, not accuracy',
        'Actionability came from: driven by the two highest-impact uncertainties, quantified enough to run the finance models, tied to early-warning indicators with PRE-DECIDED moves (the crisis plan existed before the crisis)',
        'Quantitative re-entry: scenario parameters (price, volume, FX) feed the Unit 2/4 models — scenario-consistent forecasts; probabilities at decision-tree chance nodes',
        'Exam line: scenarios beat single-point plans by making strategies ROBUST — test each strategy across the set; "betting" strategies need named hedges',
      ],
    },
    revision: [
      'Qualitative right when: no history, breaks, long horizons, rare events',
      'Judgment biases: optimism, anchoring, availability, narrow intervals',
      'Fixes: calibration feedback, reference-class forecasting, structured analogies',
      'Delphi: anonymity + iteration + statistical aggregation; median/IQR output',
      'Surveys: stated vs revealed (0.6–0.8 durable launches); conjoint for new products',
      'S-curve logistic adoption; experience curve cost declines',
      'Scenarios: 2×2 on top uncertainties; narratives + triggers + pre-decisions',
      'Robust vs betting strategies across the set',
      'Trees: EMV fold-back; EVPI = research ceiling; break-even probability',
      'Loss aversion can reject +EMV — use utility when stakes are existential',
    ],
    practice: [
      { q: 'Why does Delphi forbid face-to-face debate?', a: 'Debate imports hierarchy and confidence-display (HiPPO, groupthink); anonymity + statistical aggregation keep the information (private rationales, outlier arguments) while discarding the status dynamics — convergence by evidence, not authority.' },
      { q: 'EMV of a bet is +₹2 cr but the board rejects it. Two rational reasons?', a: '(1) Risk/utility: a −₹50 cr branch may threaten survival — the utility of ruin swamps EMV (concave utility, F01); (2) probability disagreement: the board\'s p of the bad branch is higher — the break-even probability analysis should be shown, not just the point EMV.' },
      { q: 'How do you forecast demand for a product category that does not exist (EVs in 2015)?', a: 'Layered qualitative-quantitative: S-curve adoption from analogous technologies (hybrids), Delphi on the kink points (battery cost, charging infra), experience curves on the cost driver, conjoint on price sensitivity — then feed the scenario parameters into the models as they mature.' },
      { q: 'When is Delphi better than a single expert, and what can still break it?', a: 'Panels beat individuals on noisy judgment tasks and anonymity kills dominance bias. It still breaks with correlated experts (same wrong model), poor questions and dropouts - consensus is not truth.' },
      { q: 'You have three scenarios with probabilities 0.5/0.3/0.2. What decision rule applies?', a: 'Expected value with dominance checks: maximise EV across scenario-weighted payoffs, but verify no scenario makes the choice catastrophic - then EV alone is not enough, add a min-regret pass.' },
    ],
  },
  {
    slug: 'advanced-ml-ensemble-forecasting',
    number: 4,
    title: 'Advanced Techniques: Regression, ML, Ensembles & New Products',
    minutes: 45,
    summary:
      'Multiple regression as causal forecasting, machine learning for forecasting (why and when trees/forests/boosting help), combination and ensemble methods, Bass diffusion and PLC forecasting for new products, and supply-chain/inventory forecasting with lead-time and safety-stock integration.',
    status: 'live',
    objectives: [
      'Build a regression forecast with drivers and lags, and test it honestly',
      'Judge when ML beats classical methods (and when it is theatre)',
      'Combine forecasts and understand why ensembles win',
      'Forecast new products with Bass diffusion; tie forecasts to safety stock',
    ],
    sections: [
      {
        heading: '1. Causal regression and ML forecasting',
        body: [
          '**Multiple regression forecasting** (BA06 Unit 5 machinery, forecasting use): sales ~ price, promotions, ad stock (carryover-transformed advertising), distribution, GDP — each coefficient a causal lever for SIMULATION ("what if we cut price 5%") which pure time-series cannot do. Forecasting discipline: use LAGGED drivers you will actually KNOW at forecast time (GDPₜ₋₁ or a forecast, not GDPₜ); check residual autocorrelation (Durbin–Watson; if present — dynamic regression/ARIMA errors); out-of-sample rolling-origin validation, not R² worship; watch multicollinearity between price and promotion (VIF) — forecasts can survive it, decisions cannot.',
          '**ML forecasting** — the honest framing: classical statistical methods still win most pure-extrapolation tasks on monthly business data (M-competitions, M5); ML (trees, random forests, gradient boosting, and lately global-deep models) earns its complexity with: MANY related series trained JOINTLY (one model across 10,000 SKUs learns shared seasonality and price elasticity), rich EXOGENOUS features (weather, search trends, promotions), nonlinear interactions (holiday × price × region), and hierarchical/cross-sectional structure (M5 winners: LightGBM + engineered features). Practice stack: gradient boosting on panel data with lag/rolling features; feature engineering IS the craft (lags, rolling means, event flags, target encoding of SKU/store); global models pool sparse histories. **Combination/ensemble forecasting** — the most robust empirical result in the field (Bates–Granger onward, every M-competition): averaging 3–5 diverse methods (ETS + ARIMA + ML + judgment) beats most individual models — errors partly cancel; trim the worst performer or weight by inverse recent error; the forecast committee\'s political version (consensus) is NOT this — statistical combination is disciplined.',
        ],
        callout: {
          type: 'exam',
          text: 'Bass diffusion (new-product exam favourite): F(t) = (p + q·Y/L)(L − Y) — p = coefficient of innovation (advertising-driven early adopters, ~0.03), q = imitation (word-of-mouth, ~0.38), L = market potential; peak sales at t* = ln(q/p)/(p+q). Plugs: fit p,q from early launch analogs; peak timing is what capacity planners need.',
        },
      },
      {
        heading: '2. New products, supply chain, inventory',
        body: [
          '**New-product & PLC forecasting**: **Bass diffusion** for first-purchase durable adoption (above); PLC stages (intro-growth-maturity-decline) with different methods per stage — introduction: analogs + Bass + conjoint; growth: trend-corrected analog + early actuals (Bayesian updating of Bass parameters); maturity: time-series + share models; decline: saturation curves + exit scenarios. Fashion/short-lifecycle: analog clustering + judgment adjustments (documented!).',
          '**Supply-chain & inventory forecasting**: the forecast\'s job is not "the number" but the SERVICE LEVEL: demand during lead time D̄ = μ × LT; **safety stock = z × σ_d × √LT** (σ_d per-period demand SD); reorder point = D̄ + SS; forecast ERROR (not demand) SD drives buffers — better forecasts → smaller buffers → the ₹ link from Unit 1. Intermittent/lumpy demand (spare parts — many zeros): Croston\'s method (separate size/interval forecasts), SBA correction; MSE/MAPE mislead — use bias and service metrics. Multi-echelon: forecasts at each node differ; the bullwhip effect amplifies upstream (order variance > demand variance from batching, price promotions, rationing games) — POS-based forecasting and shared visibility dampen it. Collaborative forecasting (CPFR): retailer-manufacturer shared numbers beat either alone.',
        ],
        bullets: [
          'Regression forecasts enable SIMULATION (levers), time-series only extrapolate',
          'Use lagged/known-at-forecast drivers; rolling-origin validation',
          'ML wins on: many series jointly, rich features, nonlinear interactions',
          'M-competitions: classical still strong for pure extrapolation',
          'Global gradient-boosting models: pooled SKUs + engineered lags',
          'Ensembles: average 3–5 diverse models — the most robust result in forecasting',
          'Bass: p innovation + q imitation; peak at ln(q/p)/(p+q)',
          'PLC stage → method mapping; Bayesian updates as actuals arrive',
          'Safety stock = z·σ_error·√LT — forecast error, not demand, sizes buffers',
          'Croston/SBA for intermittent demand; bullwhip from batching/promos/games',
        ],
      },
    ],
    diagram: {
      title: 'Bass diffusion and the buffer link',
      caption: 'Left: innovation + imitation produce the S-curve and a predictable sales peak. Right: forecast error (not demand) sizes the safety stock.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bass diffusion and safety stock">
  <g font-family="inherit" font-size="12">
    <rect x="16" y="16" width="340" height="216" rx="12" fill="#f8fafc"/>
    <text x="186" y="38" fill="#334155" font-weight="600" text-anchor="middle">BASS ADOPTION</text>
    <path d="M46,190 C120,185 160,150 186,110 C212,70 260,45 330,40" fill="none" stroke="#16a34a" stroke-width="2.5"/>
    <path d="M46,110 C90,130 140,150 186,150 C240,150 290,120 330,100" fill="none" stroke="#7c3aed" stroke-width="2"/>
    <circle cx="186" cy="130" r="5" fill="#dc2626"/>
    <text x="196" y="128" fill="#991b1b">peak t* = ln(q/p)/(p+q)</text>
    <text x="60" y="96" fill="#4c1d95">adoptions/period (bell)</text>
    <text x="220" y="70" fill="#14532d">cumulative S-curve</text>
    <text x="186" y="216" fill="#475569" text-anchor="middle" font-size="11">p ~ 0.03 advertising · q ~ 0.38 word-of-mouth</text>
    <rect x="380" y="16" width="324" height="216" rx="12" fill="#f8fafc"/>
    <text x="542" y="38" fill="#334155" font-weight="600" text-anchor="middle">FORECAST → SAFETY STOCK</text>
    <line x1="410" y1="180" x2="680" y2="180" stroke="#475569" stroke-width="1.4"/>
    <line x1="410" y1="180" x2="410" y2="60" stroke="#475569" stroke-width="1.4"/>
    <path d="M410,150 L680,120" stroke="#16a34a" stroke-width="2"/>
    <path d="M410,120 C480,118 560,140 680,90" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="5 4"/>
    <rect x="560" y="126" width="120" height="36" fill="#fef9c3" opacity="0.9"/>
    <text x="620" y="140" fill="#713f12" font-size="10" text-anchor="middle">safety stock band</text>
    <text x="620" y="152" fill="#713f12" font-size="10" text-anchor="middle">z·σ_error·√LT</text>
    <text x="542" y="206" fill="#475569" font-size="11" text-anchor="middle">better forecast (smaller σ_error) → thinner buffers → less working capital</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Bass model', expr: 'f(t) = (p + q·Y/L)(L − Y); peak t* = ln(q/p)/(p+q)', meaning: 'New-product adoption' },
      { name: 'Safety stock', expr: 'SS = z × σ_error × √LT', meaning: 'Buffer sized by forecast error' },
      { name: 'Reorder point', expr: 'ROP = μ_demand × LT + SS', meaning: 'When to reorder' },
      { name: 'Ensemble', expr: 'F = ΣwᵢFᵢ (equal or inverse-error weights)', meaning: 'Combination beats components' },
    ],
    examples: [
      {
        title: 'Bass for a new EV launch',
        given: ['L = 12 lakh potential buyers; p = 0.02, q = 0.35 (from analogous launches)'],
        steps: [
          { text: 'Peak timing', calc: 't* = ln(0.35/0.02)/(0.37) = ln(17.5)/0.37 ≈ 2.86/0.37 ≈ 7.7 months — plan capacity ramp around month 7–8' },
          { text: 'Peak volume', calc: 'Peak adoptions ≈ L(p+q)²/(4q) = 12L×0.1369/1.4 ≈ 1.17 lakh/month — dealership and charging build-out sized to this' },
          { text: 'Bayesian update', calc: 'After 3 months of actuals, re-fit (p,q) — early shortfalls usually mean q is lower (weak word-of-mouth) or L optimistic' },
          { text: 'Caveat', calc: 'Bass = FIRST purchases only; add replacement + fleet dynamics for long-run volumes' },
        ],
        answer: 'The peak is a date and a number months before it happens — that is what capacity planners pay for.',
      },
      {
        title: 'Ensemble three models for one SKU',
        given: ['Recent MAPE: ETS 14%, ARIMA 16%, ML (boosting) 13%; equal-weight average of the three: 11%'],
        steps: [
          { text: 'Why averaging wins', calc: 'Errors partially cancel (each model misses differently — level, autocorrelation, features)' },
          { text: 'Weighting', calc: 'Inverse-error weights or rolling-window optimal weights can shave another 0.5–1 pt; trim any model that is persistently biased' },
          { text: 'Governance', calc: 'Keep the ensemble auditable: component forecasts stored, weights documented, FVA tracked against the best single model' },
          { text: 'What NOT to ensemble', calc: 'Three copies of the same ARIMA family — diversity (method AND inputs) is the active ingredient' },
        ],
        answer: 'Averaging diverse forecasts is the highest ROI trick in forecasting — robust, cheap, and 60 years of evidence.',
      },
    ],
    caseStudy: {
      title: 'Case — Bullwhip in the noodle chain',
      body: [
        'A FMCG noodle brand: retail POS grows 4%/yr steadily. Distributor orders swing ±25% quarter to quarter; factory orders to suppliers swing ±40%. Root causes found: batch ordering (fortnightly), trade-promotion loading (buy 3 months ahead at discounts), and shortage gaming during a past stockout (orders inflated to get allocation). Factory inventories and obsolescence balloon; service still suffers.',
      ],
      questions: [
        'Why does variance amplify upstream?',
        'Which forecasting/planning fixes attack each cause?',
        'Quantify the prize.',
      ],
      takeaways: [
        'Bullwhip: batching + price promotion + rationing gaming + overreaction to signals each add variance; the factory forecasts ORDERS (distorted demand) instead of DEMAND',
        'Fixes map to causes: POS-based forecasting (demand signal), everyday-low-price/promo discipline or forward-buy models, credible allocation rules (order history-based, killing the gaming incentive), smaller batches (lower order cost), CPFR data sharing',
        'Prize: safety stocks set by σ of the DEMAND forecast error rather than order swings — a 25% order swing to an 8% demand error typically halves working capital in the chain',
        'Exam line: supply-chain forecasting forecasts DEMAND at each node; policy (pricing, batching, allocation) determines whether orders transmit or amplify it',
      ],
    },
    revision: [
      'Regression = causal levers (simulation); use drivers known at forecast time',
      'Validate rolling-origin, not R²; Durbin–Watson for residual autocorrelation',
      'ML wins on joint many-series, rich features, interactions (M5: boosting)',
      'Classical still strong on pure extrapolation (M-competitions)',
      'Ensemble/combination forecasting: average diverse models — most robust result',
      'Bass: p (ads) + q (word-of-mouth); peak ln(q/p)/(p+q); L potential',
      'PLC: intro-analogs → growth-Bayesian update → maturity-time-series → decline-exit',
      'SS = z·σ_error·√LT; ROP = μLT + SS; error, not demand, sizes buffers',
      'Croston/SBA for intermittent demand (spares); service metrics over MAPE',
      'Bullwhip: batching, promo loading, gaming; POS forecasting + CPFR dampen',
    ],
    practice: [
      { q: 'Daily demand SD 40 units, lead time 9 days, z(95%) = 1.65. Safety stock?', a: 'SS = 1.65 × 40 × √9 = 198 units; ROP = daily mean × 9 + 198. Halve the forecast error (σ→20) and SS halves to 99 — accuracy is inventory money.' },
      { q: 'Why train ONE gradient boosting model on 10,000 SKUs rather than 10,000 models?', a: 'Pooled learning: shared seasonality/elasticity parameters regularise sparse SKUs (a new SKU borrows strength from analogs); one pipeline, one monitoring scheme — and global models dominate M5-type competitions for exactly this reason.' },
      { q: 'Your ensemble member ARIMA went biased after a policy change. Action?', a: 'Monitor component bias (Unit 1 tracking) — down-weight or drop the biased member, re-fit with intervention dummies/regressors for the break; document the regime change so history doesn\'t silently poison other components.' },
      { q: 'Why do gradient-boosted trees often beat ARIMA on retail SKU demand?', a: 'They absorb promotions, price, calendar and holiday features (events ARIMA cannot see without regressors) and capture interactions and nonlinearities - but they extrapolate trends poorly, so pair with a trend model.' },
      { q: 'What does safety stock stockout protection actually depend on?', a: 'Forecast error standard deviation over lead time, service-level z (95 percent = 1.65), and lead-time variance: SS = z x sqrt(L x sigma_d^2 + d^2 x sigma_L^2). Better forecasts shrink sigma, which shrinks inventory permanently.' },
    ],
  },
  {
    slug: 'forecasting-applications-finance-risk',
    number: 5,
    title: 'Applications: Demand, Finance & Budgeting, Strategy, Risk',
    minutes: 40,
    summary:
      'The application layer: demand and sales forecasting operations (S&OP), financial forecasting and budgeting (revenue to cash flows), strategic-planning forecasting under uncertainty, risk and uncertainty management (buffers, stress scenarios), and real-world war stories.',
    status: 'live',
    objectives: [
      'Run the S&OP demand-forecasting cycle with roles and metrics',
      'Build a driver-based financial forecast (revenue → 3 statements)',
      'Forecast for strategy: robust plans under deep uncertainty',
      'Use forecasts for risk management: buffers, stress tests, early warnings',
    ],
    sections: [
      {
        heading: '1. Demand/S&OP and financial forecasting',
        body: [
          '**Demand & sales forecasting (S&OP)**: the monthly cadence — statistical baseline → (only where measured to add value — Unit 1 FVA) market intelligence/promotions input → consensus review at FAMILY level (SKU detail stays statistical) → supply plan → executive sign-off on gaps; metrics: forecast accuracy at the lag decisions lock (lag-1/lag-3), bias by segment, service level, inventory days; the one-number principle (sales, finance, operations plan off the same forecast with documented deltas). CPFR with retailers extends it upstream.',
          '**Financial forecasting & budgeting**: driver-based — revenue = volume × price × mix (volume from the demand engine above); costs: variable (rate × volume) + fixed + step-costs (capacity additions); working capital from receivable/payable/inventory days; capex from capacity plans — rolling through to a **three-statement projection** (F06 Unit 2 architecture: IS → BS → CF, balanced by construction) and a 13-week cash-flow bridge for treasury. Budget vs forecast discipline: the budget is a TARGET (fixed, incentive-linked), the rolling forecast is an ESTIMATE (updated monthly) — conflating them corrupts both; re-forecast cadence monthly, driver-level variance bridges (volume/price/mix/rate — the language of the monthly review).',
        ],
        callout: {
          type: 'exam',
          text: 'The variance-bridge drill examiners love: actual vs budget revenue decomposed into VOLUME (Δq × budget price), PRICE (Δp × actual q... or budget q — state convention), MIX (shift toward higher/lower-margin lines), RATE (input costs), FX — each in rupees, summing to the total gap. Draw the waterfall; a bridge that doesn\'t tie is a wrong bridge.',
        },
      },
      {
        heading: '2. Strategy, risk, and war stories',
        body: [
          '**Strategic planning**: forecast the STRUCTURE (market size, competitive entry, technology substitution — Unit 3 S-curves and scenarios), not the quarterly wiggle; horizon-matched methods (5–10 yr scenarios with quantified parameters feeding the models); strategy under uncertainty = robust (acceptable across scenarios) vs adaptive (option-preserving: staged capex, pilots) choices — links PGDM 301 Unit 1 and F06 Unit 6 break-evens.',
          '**Risk & uncertainty management**: forecasts deliver DISTRIBUTIONS, not points — decision-relevant outputs: P(stockout), P(revenue < budget), cash-at-risk (P5 of the 13-week cash line); buffers priced (safety stock = z·σ√LT from Unit 4; contingency % on capex by stage-gate — PGDM 301 practice); **stress scenarios** (demand −20%, FX +10%, rate +150 bps simultaneously — coherent, not random) with pre-agreed responses; early-warning indicators wired from Unit 3 scenario work (leading indicators: order cancellations, distributor inventory, search trends). **War stories** to know: (1) the retailer whose promotion forecast ignored cannibalisation (baseline + uplift, never uplift alone); (2) the pharma launch forecast anchored on a blockbuster analog (reference-class correction after calibration review); (3) COVID: demand-history rupture handled by outlier-flagging + regime dummies + scenario weights — the models that survived were monitored, not clever; (4) the S&OP one-number firm that cut forecast error a third AND inventory a fifth in a year (process, not algorithm). Closing frame: forecasting is a decision-support system — accuracy is the means, decisions are the product.',
        ],
        bullets: [
          'S&OP: statistical base → measured-value judgment → consensus at family level → one number',
          'Accuracy measured at the lag that locks decisions (lag-1/lag-3)',
          'Budget = target (fixed); rolling forecast = estimate (monthly) — never conflate',
          'Driver-based: volume × price × mix; WC by days; 13-week cash bridge',
          'Variance bridge: volume / price / mix / rate / FX — sums to the gap',
          'Strategy: forecast structure with scenarios; robust vs adaptive choices',
          'Outputs are distributions: P(stockout), cash-at-risk P5, P(< budget)',
          'Stress scenarios coherent and pre-answered; early-warning leading indicators',
          'Promotion forecasts = baseline + uplift − cannibalisation',
          'Forecasting = decision support; decisions are the product',
        ],
      },
    ],
    diagram: {
      title: 'From demand forecast to the boardroom',
      caption: 'One demand engine feeds S&OP, the three-statement forecast, risk buffers and strategy scenarios — the one-number principle.',
        svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Forecast applications map">
  <defs><marker id="fb2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="250" y="20" width="220" height="56" rx="12" fill="#e0f2fe"/><text x="360" y="42" fill="#0c4a6e" font-weight="600">DEMAND ENGINE</text><text x="360" y="60" fill="#075985">statistical + judgment (FVA-checked)</text>
    <rect x="20" y="120" width="200" height="56" rx="10" fill="#dcfce7"/><text x="120" y="142" fill="#14532d" font-weight="600">S&amp;OP</text><text x="120" y="160" fill="#166534">supply plan · service · inventory</text>
    <rect x="260" y="120" width="200" height="56" rx="10" fill="#fef9c3"/><text x="360" y="142" fill="#713f12" font-weight="600">FINANCIAL FORECAST</text><text x="360" y="160" fill="#a16207">drivers → 3 statements · 13-wk cash</text>
    <rect x="500" y="120" width="200" height="56" rx="10" fill="#fee2e2"/><text x="600" y="142" fill="#7f1d1d" font-weight="600">RISK &amp; STRATEGY</text><text x="600" y="160" fill="#991b1b">buffers · stress · scenarios</text>
    <line x1="300" y1="76" x2="140" y2="118" stroke="#475569" stroke-width="1.5" marker-end="url(#fb2)"/>
    <line x1="360" y1="76" x2="360" y2="118" stroke="#475569" stroke-width="1.5" marker-end="url(#fb2)"/>
    <line x1="420" y1="76" x2="580" y2="118" stroke="#475569" stroke-width="1.5" marker-end="url(#fb2)"/>
    <rect x="180" y="206" width="360" height="34" rx="8" fill="#ede9fe"/><text x="360" y="228" fill="#4c1d95" font-weight="600">ONE NUMBER principle — deltas documented, never forked</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Driver-based revenue', expr: 'Rev = Σ (volume × price) by SKU/mix', meaning: 'Forecast from levers' },
      { name: 'Variance bridge', expr: 'ΔRev = volume + price + mix + FX (in ₹, sums to gap)', meaning: 'The monthly review language' },
      { name: 'Cash-at-risk', expr: 'P5 of the 13-week cash distribution', meaning: 'Treasury early warning' },
      { name: 'Contingency by stage', expr: 'Capex buffer % falls with stage-gate maturity', meaning: 'PGDM 301 practice' },
    ],
    examples: [
      {
        title: 'Bridge the budget miss',
        given: ['Budget revenue ₹500 cr (100 units × ₹5 cr); actual ₹468 cr (92 units × ₹5.15 cr); mix shift −₹7 cr; FX −₹3 cr'],
        steps: [
          { text: 'Volume', calc: '−8 units × ₹5 cr = −₹40 cr' },
          { text: 'Price', calc: '+₹0.15 cr × 92 = +₹13.8 cr (price overcame part of the volume fall — elasticity story for Unit 4)' },
          { text: 'Stack the bridge', calc: '500 − 40 + 13.8 − 7 − 3 = ₹463.8 ≈ 468 (residual ₹4.2 cr = new-segment timing — named, not buried)' },
            { text: 'Read', calc: 'Volume-driven miss (demand problem), price partially compensating (brand pricing power) — the conversation is demand stimulation, not price restoration' },
        ],
        answer: 'The bridge turns "we missed by ₹32 cr" into three named, ownable causes — that is decision support.',
      },
      {
        title: '13-week cash forecast with risk quantified',
        given: ['Opening cash ₹40 cr; weekly net burn −₹2 to +₹1 cr; receivable spike of ₹28 cr due week 9 (client "usually pays 2 weeks late")'],
        steps: [
          { text: 'Base path', calc: 'Trough week 8 ≈ ₹26–28 cr before the receivable lands' },
          { text: 'Risk-adjusted', calc: 'Model payment lag as a distribution (weeks 9/10/11 with p = .5/.3/.2) → P(cash < ₹20 cr) ≈ 25% — cash-at-risk quantified' },
          { text: 'Actions', calc: 'Pre-agreed: draw ₹15 cr WC line if week-8 cash < ₹25 cr; escalate collection at week 7 — triggers, not heroics' },
          { text: 'Governance', calc: 'Roll forward weekly; compare distribution vs actuals (calibration) — the forecast improves only if its misses are scored' },
        ],
        answer: 'A 13-week cash line with P5 and pre-agreed triggers is what a CFO can act on — the point estimate alone cannot.',
      },
    ],
    caseStudy: {
      title: 'Case — The promotion that "beat forecast" and still lost money',
      body: [
        'A grocery brand runs a 20%-off promo on its flagship biscuit. Sales +38% vs the promo forecast of +25% — a "win". Post-mortem: (a) 60% of the uplift was pantry-loading (next month\'s baseline fell 18%), (b) cannibalisation of the premium variant (−₹1.9 cr margin), (c) forward-buying by distributors inflated sell-out further, (d) trade spend overran. Net margin impact: negative.',
      ],
      questions: [
        'Which forecasting error was largest: baseline, uplift, or scope?',
        'How should promotion forecasts be built?',
        'What process change makes the post-mortem routine?',
      ],
      takeaways: [
        'Largest error: SCOPE — the model forecast incremental units, not incremental MARGIN net of pantry-load reversal, cannibalisation and forward-buy — units are not value',
        'Build: baseline (no-promo counterfactual) + uplift (event model/analogs) − cannibalisation − pantry-reversal, at MARGIN level, with distribution-sell-out vs sell-through separated',
        'Process: promotion post-mortems as standing agenda (did/should analysis), causal uplift models re-fit quarterly, promo calendar in the forecast engine as events — promotions are decisions, so their forecasts must be decision-grade',
        'Exam line: demand forecasting serves P&L decisions — forecast the economics, not just the units',
      ],
    },
    revision: [
      'S&OP monthly cycle: statistical base → FVA-checked judgment → family consensus → one number',
      'Accuracy at decision-lock lag; bias by segment; service + inventory metrics',
      'Budget = target; rolling forecast = estimate — keep them separate',
      'Driver-based models: volume × price × mix; WC days; 13-week cash bridge',
      'Variance bridge: volume/price/mix/FX in ₹ — must sum to the gap',
      'Three-statement projection architecture = F06 Unit 2',
      'Strategy forecasts structure (scenarios/S-curves); robust vs adaptive plans',
      'Risk outputs: P(stockout), P(< budget), cash P5; buffers priced by error',
      'Coherent stress scenarios with pre-agreed responses; leading indicators wired',
      'Promo forecast = baseline + uplift − cannibalisation − pantry-load, at margin',
      'Forecasting is decision support — decisions are the product',
    ],
    practice: [
      { q: 'Sales says "we will hit budget because Q4 always spikes". Respond with the system view.', a: 'Test the seasonality claim against seasonal indices (is Q4 index > 1 and stable?), check current bias (if year-to-date is −8%, a seasonal spike alone rarely closes), and re-forecast bottom-up — hope is not a driver; document whatever judgment is added for FVA scoring.' },
      { q: 'Why does a good forecast REDUCE safety stock?', a: 'SS = z·σ_error·√LT: better forecasts shrink σ_error directly — accuracy converts into working capital; that is the standing business case for the whole subject (and why CFOs fund forecasting teams).' },
      { q: 'Give one robust and one adaptive response to demand-regime uncertainty post-launch.', a: 'Robust: capacity plan that stays acceptable across high/base/low scenarios (multi-sourced, deferrable capex). Adaptive: stage-gated rollout with option value — small line first, expand on defined demand triggers; state the trigger levels and the option premium paid.' },
      { q: 'Driver-based budget: revenue forecast up 12 percent, but the driver (dealer adds) is flat. What is the number worth?', a: 'Little - driver integrity is the whole model. If dealers flat and productivity flat, 12 percent needs price or mix evidence; a driver-inconsistent budget is a spreadsheet with ambition.' },
      { q: 'How does S&OP stop the bullwhip at your company?', a: 'One consensus number per period shared by sales, operations and finance - overrides are logged and measured (FVA), orders are planned from the demand signal not from last month\'s shortage panic.' },
    ],
  },
];
