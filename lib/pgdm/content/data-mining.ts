import type { Lecture } from '../types';

/* ═══════════════════════════════════════════════════════════════
   PGDM BA04 — Data Mining
   Unit-wise lectures: KDD process & preprocessing → cleaning &
   classification (trees/rules) → clustering & association rules →
   OLAP & visualisation infrastructure → application domains
   ═══════════════════════════════════════════════════════════════ */

export const dataMiningLectures: Lecture[] = [
  {
    slug: 'kdd-process-preprocessing-quality',
    number: 1,
    title: 'The KDD Process: Mining, Preprocessing & Data Quality',
    minutes: 40,
    summary:
      'Data mining as knowledge discovery in databases: overview and applications, the stages of the mining process, technique families, knowledge representation, preprocessing (cleaning, integration, transformation, reduction), exploration/visualisation, and data-quality assessment.',
    status: 'live',
    objectives: [
      'Define KDD and place mining within it',
      'Walk the stages: selection → preprocessing → transformation → mining → interpretation',
      'Preprocess a real table: missing values, outliers, normalisation, discretisation',
      'Assess data quality: completeness, accuracy, consistency, timeliness',
    ],
    sections: [
      {
        heading: '1. What mining is and the KDD pipeline',
        body: [
          '**Data mining** = the (semi-)automatic extraction of PATTERNS — rules, clusters, models, anomalies — that are valid, novel, potentially useful, ultimately understandable (Fayyad\'s definition) — from LARGE data. It is one STEP inside **KDD (Knowledge Discovery in Databases)**: the whole discipline of turning raw stores into actionable knowledge. It sits on statistics (BA06), machine learning (BA02/BA03 modelling), and database technology (this unit\'s OLAP layer). Applications: CRM (next-buy, churn — BA05), risk (credit scoring, fraud — F02), retail (basket, planograms), manufacturing (defect patterns), web (search, recommendation), healthcare (diagnosis patterns). **Technique families**: classification (supervised, labels — decision trees, rules, kNN, naive Bayes, logistic, neural); regression (supervised, continuous); **clustering** (unsupervised groups); **association rules** (co-occurrence); **anomaly detection** (outliers); **sequential patterns** (order of events).',
          '**The KDD stages** (memorise as a pipeline with feedback): (1) develop UNDERSTANDING of the application domain and the decision to be improved; (2) create the TARGET dataset (selection — which tables, which cases); (3) **data cleaning and preprocessing** (missing, noise, types — 60–80% of project time lives here); (4) **data reduction and projection** (feature selection, sampling, dimensionality, encoding); (5) choose the mining function (classify/cluster/associate?); (6) choose the algorithm and parameters; (7) **mining**; (8) **interpretation/evaluation** (does the pattern hold out-of-sample? is it USEFUL? — lift, support, accuracy, business lift); (9) deployment of knowledge (rules into systems, scores into CRM — CRISP-DM is the industry lifecycle wrapper). **Knowledge representation**: rules (IF-THEN — auditable), trees (hierarchical rules), clusters + centroids, linear model coefficients, neural nets (black box — pay the interpretability tax), visualisations.',
        ],
        callout: {
          type: 'exam',
          text: 'Supervised vs unsupervised, the gate question: labels present → classification/regression (train, validate, measure accuracy/lift); no labels → clustering/association (discover structure, evaluate by cohesion + business sense). Every technique in this subject answers first "do I have a target variable?" — answer that before any algorithm talk.',
        },
      },
      {
        heading: '2. Preprocessing, exploration, quality',
        body: [
          '**Cleaning**: missing values — diagnose the MECHANISM (MCAR/MAR/MNAR: missing completely at random vs related to observed vs related to the missing value itself — e.g., income unreported BECAUSE high); handle: delete rows (if <5% and MCAR), impute (mean/median/mode; kNN or model-based imputation for MAR; flag-and-dummy for informative missingness — "income_missing" can itself predict default); NOISE — binning/smoothing, regression smoothing; duplicates and inconsistent codes ("M"/"male"/"Male"). **Integration**: joining sources — entity resolution (same customer, three spellings), schema mapping, and redundancy/correlation checks post-join. **Transformation**: normalisation (min-max to [0,1] — sensitive to outliers; z-score standardisation — kNN/k-means need it: unscaled ₹-salary dominates distance), encoding (one-hot for nominal, ordinal codes for ordered), **discretisation** (equal-width vs equal-frequency binning; entropy-based cuts), feature construction (ratios, dates → parts, aggregates).',
          '**Reduction**: dimensionality (correlation pruning, PCA, feature importance from trees), numerosity (sampling — stratified for rare classes), aggregation (daily → monthly). **Exploration & visualisation before mining** (BA01/BA03 tools): distributions, correlation heatmap (the redundant-feature screen), class balance, segment plots — "the shape of the data rules out half the algorithms". **Data quality assessment**: **completeness** (missing rates by field/period), **accuracy** (vs source checks, value ranges), **consistency** (cross-field: age 7 with occupation "engineer"), **timeliness** (how stale?), uniqueness (duplicate keys), validity (types, domains) — scored per field, reported as a quality dashboard with thresholds; the mining GO/NO-GO decision is made here: garbage in, confident nonsense out.',
        ],
        bullets: [
          'Mining = pattern extraction; KDD = the full knowledge pipeline',
          'Stages: domain → selection → cleaning → reduction → method → mining → evaluation → deployment',
          'Families: classification, regression, clustering, association, anomalies, sequences',
          'Supervised ⟺ labels present — the gate question',
          'Missingness: MCAR/MAR/MNAR decides delete/impute/flag',
          'Scale for distance algorithms (kNN, k-means): z-score/min-max',
          'One-hot nominal, ordinal codes for ordered; binning = discretisation',
          'Reduction: PCA, feature importance, stratified sampling for rare classes',
          'Explore first: distributions, correlations, class balance',
          'Quality dimensions: completeness, accuracy, consistency, timeliness, uniqueness',
        ],
      },
    ],
    diagram: {
      title: 'The KDD pipeline',
      caption: 'Selection to deployment with a feedback loop — preprocessing occupies most of the timeline and most of the errors.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="KDD pipeline">
  <defs><marker id="ka" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="11" text-anchor="middle">
    <rect x="16" y="60" width="120" height="56" rx="10" fill="#e0f2fe"/><text x="76" y="82" fill="#0c4a6e" font-weight="600">1 Understand</text><text x="76" y="98" fill="#075985">domain + decision</text>
    <rect x="156" y="60" width="120" height="56" rx="10" fill="#bbf7d0"/><text x="216" y="82" fill="#14532d" font-weight="600">2 Select</text><text x="216" y="98" fill="#166534">target dataset</text>
    <rect x="296" y="60" width="120" height="56" rx="10" fill="#fef9c3"/><text x="356" y="82" fill="#713f12" font-weight="600">3 Clean</text><text x="356" y="98" fill="#a16207">missing · noise · types</text>
    <rect x="436" y="60" width="120" height="56" rx="10" fill="#fed7aa"/><text x="496" y="82" fill="#9a3412" font-weight="600">4 Reduce</text><text x="496" y="98" fill="#c2410c">features · encode</text>
    <rect x="576" y="60" width="120" height="56" rx="10" fill="#fee2e2"/><text x="636" y="82" fill="#7f1d1d" font-weight="600">5-6 Mine</text><text x="636" y="98" fill="#991b1b">classify/cluster/assoc</text>
    <rect x="200" y="170" width="150" height="52" rx="10" fill="#ede9fe"/><text x="275" y="192" fill="#4c1d95" font-weight="600">7 Evaluate</text><text x="275" y="208" fill="#5b21b6">holdout · lift · business</text>
    <rect x="400" y="170" width="150" height="52" rx="10" fill="#dcfce7"/><text x="475" y="192" fill="#14532d" font-weight="600">8 Deploy</text><text x="475" y="208" fill="#166534">scores into systems</text>
    <line x1="136" y1="88" x2="154" y2="88" stroke="#475569" stroke-width="1.4" marker-end="url(#ka)"/>
    <line x1="276" y1="88" x2="294" y2="88" stroke="#475569" stroke-width="1.4" marker-end="url(#ka)"/>
    <line x1="416" y1="88" x2="434" y2="88" stroke="#475569" stroke-width="1.4" marker-end="url(#ka)"/>
    <line x1="556" y1="88" x2="574" y2="88" stroke="#475569" stroke-width="1.4" marker-end="url(#ka)"/>
    <path d="M636,116 C636,150 480,150 476,168" fill="none" stroke="#475569" stroke-width="1.4" marker-end="url(#ka)"/>
    <line x1="400" y1="196" x2="352" y2="196" stroke="#475569" stroke-width="1.4" marker-end="url(#ka)"/>
    <path d="M275,168 C275,140 76,140 76,118" fill="none" stroke="#475569" stroke-width="1.4" marker-end="url(#ka)"/>
    <text x="360" y="36" fill="#334155" font-weight="600" font-size="12">60–80% of project time is stage 3–4: preprocessing decides everything downstream</text>
    <text x="360" y="238" fill="#475569">feedback loops: evaluation sends you back — bad lift means revisit features, not just parameters</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Min-max normalisation', expr: "x' = (x − min)/(max − min)", meaning: 'Scale to [0,1] — outlier-sensitive' },
      { name: 'Z-score standardisation', expr: "z = (x − μ)/σ", meaning: 'Distance algorithms need scale neutrality' },
      { name: 'Missing rate gate', expr: 'field missing > ~40–50% → drop or flag-only', meaning: 'Imputation cannot resurrect a variable' },
      { name: 'Signal check', expr: 'target rate | missing ≠ target rate | observed → MNAR → flag it', meaning: 'Informative missingness detector' },
    ],
    examples: [
      {
        title: 'Triage a raw lending table',
        given: ['10,000 rows; income missing 22% (missing rows default at 31% vs 9% overall); age 7 and 112 present; city in 14 spellings; loan_amount in ₹, income in lakh-units'],
        steps: [
          { text: 'Missingness', calc: 'Default rates differ (31% vs 9%) → NOT MCAR — imputing the median would erase a risk signal: add income_missing flag + median impute for the value' },
          { text: 'Outliers', calc: 'Ages 7/112: range-check → invalid (not rare-but-real): set NA + route to verification, don\'t delete silently' },
          { text: 'Consistency', calc: 'Group 14 city spellings by fuzzy matching → canonical + alias table (BA01 Prep logic, now at scale)' },
          { text: 'Scale', calc: 'income (lakh) 1–500 vs loan_amount (₹) 50k–50L → z-score both before ANY distance-based method (else loan_amount dominates everything)' },
        ],
        answer: 'Four decisions, each documented: flag-don\'t-impute the signal, verify-don\'t-delete the impossible, canonicalise the chaos, standardise the scales.',
      },
      {
        title: 'Feature reduction that keeps meaning',
        given: ['85 candidate features, 3,000 rows, binary target; correlation heatmap shows 6 pairs > 0.9; tree importance ranks 30 features at ~0'],
        steps: [
          { text: 'Redundancy', calc: 'Of each correlated pair keep the business-meaningful one (drop derived duplicates) — 85 → 61' },
          { text: 'Importance', calc: 'Tree-based ranking + domain review keeps 24 — random forests must confirm on holdout (importance overfits too)' },
          { text: 'Optional PCA', calc: 'For distance methods: top-10 components explain 82% variance — but interpretability drops; keep PCA for k-means, keep names for trees/rules' },
          { text: 'Sampling', calc: 'Positive class 6% → stratified split so train/test both carry 6% — never random-split rare events blindly' },
        ],
        answer: '85 → 24 named features: redundancy first, importance second, PCA only where distance demands it.',
      },
    ],
    caseStudy: {
      title: 'Case — The model that learned your data-entry habits',
      body: [
        'A hospital-chain model predicts readmission risk with excellent validation accuracy. On deployment across a NEW hospital, performance collapses. Investigation: the strongest features were operator IDs and entry timestamps — the OLD hospital\'s clerks entered data differently for patients doctors already worried about. The model read the RECORDING process, not the patient.',
      ],
      questions: [
        'Which KDD stage failed?',
        'How should validation have been designed?',
        'Which features survived the rebuild?',
      ],
      takeaways: [
        'Stage-1/7 failure: domain understanding and evaluation design — site-specific leakage features (operator, timestamp patterns) passed because validation shared the same data-generating process',
        'Design: validate OUT-OF-SITE (train on hospital A, test on hospital B) — the deployment distribution is the test distribution; that single change exposes process features instantly',
        'Survivors: clinical variables with plausible mechanisms (comorbidity count, prior admissions, lab flags) — interpretability is not a nicety, it is the leakage screen',
        'Exam line: a pattern is knowledge only if VALID on unseen data FROM THE DEPLOYMENT PROCESS and USEFUL — Fayyad\'s definition is a checklist',
      ],
    },
    revision: [
      'Data mining = pattern extraction; KDD = full pipeline (9 stages)',
      'Techniques: classification, regression, clustering, association, anomaly, sequence',
      'Supervised ⟺ labels; unsupervised = structure discovery',
      'CRISP-DM = industry lifecycle wrapper around KDD',
      'Cleaning: MCAR delete/impute; MAR impute (kNN/model); MNAR flag+impute',
      'Noise: binning, smoothing; consistency: cross-field rules',
      'Transform: min-max vs z-score (distance methods); one-hot; discretisation',
      'Reduction: correlation prune, importance, PCA, stratified sampling',
      'Representation: rules/trees readable; NN = interpretability tax',
      'Quality dimensions: completeness, accuracy, consistency, timeliness, uniqueness, validity',
    ],
    practice: [
      { q: 'Why must features be scaled for k-means but not for decision trees?', a: 'k-means uses DISTANCES — an unscaled ₹-crore feature outvotes a 0–1 flag; trees split one feature at a time on thresholds, scale-invariant by construction.' },
      { q: 'A field is 45% missing. Median-impute?', a: 'No: beyond ~40% imputation fabricates most of the variable. Options: drop it; keep a missing-flag only; or segment-model (with/without the field). First test if missingness itself predicts the target (MNAR).' },
      { q: 'Distinguish data cleaning from data reduction with one example each.', a: 'Cleaning fixes WRONG data (city "Delhy" → "Delhi"); reduction shrinks SIZE while keeping signal (dropping one of two 0.95-correlated features). Different stages of KDD, different failure modes.' },
      { q: 'Income is missing 30 percent of records, and missingness correlates strongly with default. Drop or impute?', a: 'Neither alone: the missingness is informative (MNAR), so keep an income_missing flag AND impute the value (median or model-based). Deleting rows removes your riskiest segment and biases the model.' },
      { q: 'Why does every KDD diagram have an arrow from evaluation back to selection?', a: 'Bad lift usually means the wrong question, features or data - not the algorithm. The loop encodes the reality that most failures are upstream of mining, revisited after evaluation proves it.' },
    ],
  },
  {
    slug: 'cleaning-classification-decision-trees',
    number: 2,
    title: 'Cleaning & Classification: Decision Trees and Rule Systems',
    minutes: 45,
    summary:
      'The supervised core: handling missing/noisy/inconsistent data, integration and transformation, reduction/compression/discretisation — then decision-tree induction (entropy, information gain, Gini), pruning and overfitting, rule-based classifiers, and honest evaluation with train/test splits and confusion matrices.',
    status: 'live',
    objectives: [
      'Complete the preprocessing chain for supervised learning',
      'Compute entropy, information gain, Gini for a split',
      'Grow, prune and read a decision tree; convert to rules',
      'Evaluate with holdout, cross-validation, confusion matrix, ROC',
    ],
    sections: [
      {
        heading: '1. From clean data to a tree',
        body: [
          'The supervised setup: features X, label y (churn 0/1, default 0/1, segment names); a LEARNER maps X → y from labelled history; generalisation (new data) is the only metric that matters — hence the discipline of SPLITTING data (train / validation / test; k-fold cross-validation for small data; stratified for class imbalance) BEFORE looking at anything. **Decision tree induction** (CART: classification and regression trees; ID3/C4.5 lineage): recursively pick the feature+threshold that best separates classes, split, repeat until pure or small. **Split criteria**: **entropy** H(S) = −Σpᵢ log₂pᵢ (0 pure, 1 maximum at 50/50); **information gain** = H(parent) − weighted H(children) (ID3; biased to many-valued features — gain ratio corrects); **Gini impurity** = 1 − Σpᵢ² (CART default — faster, similar behaviour). Regression trees split on variance reduction.',
          'Numeric features: candidate thresholds at midpoints, binary splits; categorical: multi-way or grouped. **Overfitting and pruning**: a fully-grown tree memorises noise (99% train, 61% test accuracy — the signature); controls: **max_depth**, **min_samples_leaf**, **min_impurity_decrease** (pre-pruning/hyperparameters) and **cost-complexity pruning** (post-pruning: penalise leaves, pick α by cross-validation — CART\'s ccp_alpha). **Rule-based systems**: trees ARE rule sets (each root-to-leaf path = IF-THEN); RIPPER/FOIL-style sequential covering induces rules directly; rules are auditable, editable by domain experts, deployable in policy engines (credit approval reason codes!) — the interpretability advantage that keeps trees/rules alive against black boxes in regulated industries.',
        ],
        callout: {
          type: 'exam',
          text: 'The entropy/information-gain numerical (guaranteed exam question): H(S) = −Σp log₂p; Gain = H(parent) − Σ(nₖ/n)H(childₖ). Classic: 9 yes / 5 no → H = 0.940 bits. Split A gives (6Y,2N | 3Y,3N): Gain = 0.940 − [0.5(0.811) + 0.5(1.0)] = 0.940 − 0.906 = 0.034 (weak). Split B gives (9Y,1N | 0Y,4N): Gain ≈ 0.940 − 0.347 = 0.593 (strong) — B wins the root. Compute two splits, compare, choose, state why.',
        },
      },
      {
        heading: '2. Evaluation and the rest of the preprocessing chain',
        body: [
          '**Evaluation protocol**: hold-out test (70/30, stratified), k-fold CV (k=5/10: every point tested once), and NEVER let test touch training (the leakage case from Unit 1). **Confusion matrix**: accuracy = (TP+TN)/n — lies under imbalance (99% non-churn: predict-none = 99% accurate, zero value); **precision** = TP/(TP+FP) — of flagged, how many true; **recall** = TP/(TP+FN) — of true, how many caught; F1 balance; **ROC-AUC** — ranking quality across thresholds (0.5 coin, 0.8 good); lift/ gains charts for marketing (BA05\'s language). Choose threshold by COST matrix (missed fraud ₹9, false alarm ₹1 → threshold shifts to recall).',
          'Remaining preprocessing for supervised tasks: **integration** — join transactions to demographics, entity-resolve customers (Unit 1), check post-join redundancy; **transformation** — encoding (trees take ordinal/nominal natively in CART-style; sklearn wants one-hot), discretisation for rules (equal-frequency vs entropy-optimal bins — bins become rule thresholds), target engineering (binary flag from multi-state), date features (tenure, recency, frequency); **reduction/compression** — feature selection (filter: correlation/chi²; wrapper: RFE with CV; embedded: tree importances / LASSO), record sampling with class balancing (over/undersample, SMOTE — synthesise minority points; ALWAYS evaluate on the true distribution, never on the balanced set); **dimensionality/discretisation** trade interpretability for variance. Sequence discipline: fit preprocessing on TRAIN only (imputation means, scalers, SMOTE — else leakage through the pipeline; sklearn Pipeline enforces this).',
        ],
        bullets: [
          'Split FIRST (train/val/test, stratified); test is sacred',
          'Entropy H = −Σp log₂p; Gain = H(parent) − weighted child entropy',
          'Gini = 1 − Σp² (CART); gain ratio fixes many-valued bias',
          'Overfit signature: train 99% vs test 61% → prune',
          'Pre-prune: max_depth, min_samples_leaf; post-prune: cost-complexity α',
          'Each root-to-leaf path = one IF-THEN rule (reason codes)',
          'Confusion: precision vs recall vs accuracy-under-imbalance',
          'ROC-AUC = ranking quality; threshold by cost matrix',
          'k-fold CV for small data; SMOTE balances — evaluate on true mix',
          'Fit imputers/scalers/SMOTE on TRAIN only (Pipeline) — leakage guard',
        ],
      },
    ],
    diagram: {
      title: 'Tree growth, impurity and the overfit cliff',
      caption: 'Each split buys purity; past the sweet spot the tree memorises — train accuracy keeps rising while test falls: the pruning argument.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decision tree overfitting">
  <g font-family="inherit" font-size="12">
    <rect x="16" y="16" width="300" height="216" rx="12" fill="#f8fafc"/>
    <text x="166" y="38" fill="#334155" font-weight="600" text-anchor="middle">A TREE (churn)</text>
    <rect x="60" y="52" width="180" height="30" rx="7" fill="#e0f2fe"/><text x="150" y="71" fill="#0c4a6e" text-anchor="middle">tenure &lt; 6 mo?</text>
    <rect x="30" y="106" width="110" height="30" rx="7" fill="#dcfce7"/><text x="85" y="125" fill="#14532d" text-anchor="middle">complaints≥2 → CHURN</text>
    <rect x="170" y="106" width="110" height="30" rx="7" fill="#fef9c3"/><text x="225" y="125" fill="#713f12" text-anchor="middle">plan = prepaid?</text>
    <rect x="150" y="160" width="90" height="30" rx="7" fill="#fee2e2"/><text x="195" y="179" fill="#7f1d1d" text-anchor="middle">yes → churn</text>
    <rect x="240" y="160" width="90" height="30" rx="7" fill="#dcfce7"/><text x="285" y="179" fill="#14532d" text-anchor="middle">no → stay</text>
    <line x1="150" y1="82" x2="85" y2="104" stroke="#475569" stroke-width="1.3"/>
    <line x1="150" y1="82" x2="225" y2="104" stroke="#475569" stroke-width="1.3"/>
    <line x1="225" y1="136" x2="195" y2="158" stroke="#475569" stroke-width="1.3"/>
    <line x1="225" y1="136" x2="285" y2="158" stroke="#475569" stroke-width="1.3"/>
    <text x="166" y="212" fill="#475569" text-anchor="middle" font-size="11">each path = IF-THEN rule with counts</text>
    <rect x="350" y="16" width="354" height="216" rx="12" fill="#f8fafc"/>
    <line x1="380" y1="200" x2="680" y2="200" stroke="#475569" stroke-width="1.4"/>
    <line x1="380" y1="200" x2="380" y2="36" stroke="#475569" stroke-width="1.4"/>
    <text x="640" y="218" fill="#475569">tree size →</text>
    <text x="352" y="40" fill="#475569">accuracy</text>
    <path d="M380,60 C480,55 580,48 680,44" fill="none" stroke="#16a34a" stroke-width="2.5"/>
    <path d="M380,70 C450,80 500,86 540,90 C590,96 640,120 680,140" fill="none" stroke="#dc2626" stroke-width="2.5"/>
    <circle cx="540" cy="90" r="6" fill="#7c3aed"/>
    <line x1="540" y1="90" x2="540" y2="200" stroke="#7c3aed" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="500" y="212" fill="#7c3aed">prune here</text>
    <text x="480" y="56" fill="#14532d">train keeps rising</text>
    <text x="560" y="130" fill="#7f1d1d">test falls — overfit</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Entropy', expr: 'H(S) = −Σ pᵢ log₂ pᵢ', meaning: 'Impurity in bits (0 pure, 1 at 50/50)' },
      { name: 'Information gain', expr: 'Gain = H(parent) − Σ (nₖ/n) H(childₖ)', meaning: 'Split quality' },
      { name: 'Gini', expr: 'G = 1 − Σ pᵢ²', meaning: 'CART split criterion' },
      { name: 'Precision / recall', expr: 'TP/(TP+FP) · TP/(TP+FN)', meaning: 'The imbalance-proof pair' },
    ],
    examples: [
      {
        title: 'Entropy split by hand',
        given: ['Parent: 9 yes, 5 no (H = 0.940). Feature "tenure<6": left (6Y,2N), right (3Y,3N). Feature "plan=prepaid": left (9Y,1N), right (0Y,4N)'],
        steps: [
          { text: 'H(left/right) tenure', calc: 'H(6,2) = 0.811; H(3,3) = 1.000' },
          { text: 'Gain(tenure)', calc: '0.940 − [8/14(0.811) + 6/14(1.0)] = 0.940 − 0.892 = 0.048' },
          { text: 'Gain(plan)', calc: 'H(9,1) = 0.469; H(0,4) = 0 → 0.940 − [10/14(0.469) + 0] = 0.940 − 0.335 = 0.605' },
          { text: 'Decision', calc: 'plan=prepaid gains 0.605 ≫ 0.048 → root split on plan — the math formalises intuition' },
        ],
        answer: 'Compute both, compare, choose: 0.605 vs 0.048 — the exam question is solved in four lines.',
      },
      {
        title: 'Prune a tree and prove it',
        given: ['Full tree: train accuracy 99.2%, test 61.4%. Cost-complexity sweep: α mid-range tree (17 leaves): train 88.1%, test 68.9%'],
        steps: [
          { text: 'Diagnose', calc: 'Train−test gap 37.8 pts = variance/overfit — the full tree memorised the training noise' },
          { text: 'Prune', calc: 'ccp_alpha by 5-fold CV on TRAIN selects the 17-leaf subtree' },
          { text: 'Re-evaluate', calc: 'Test rises 61.4 → 68.9 — LESS tree, MORE signal; the gap narrows to 19.2 (still watch it)' },
          { text: 'Deploy as rules', calc: '17 paths → 17 IF-THEN rules with counts, e.g. "IF plan=prepaid AND complaints≥2 AND tenure<6 THEN churn (182/240 = 76%)" — reason codes for the retention team' },
        ],
        answer: 'Pruning trades memorisation for generalisation, and the pruned tree doubles as an auditable rulebook.',
      },
    ],
    caseStudy: {
      title: 'Case — Reason codes: the tree that regulators could read',
      body: [
        'A lender must explain every credit rejection (RBI fair-practices code; global: adverse-action notices). A gradient-boosting black box hits AUC 0.84; the tree/rules system AUC 0.79. The bank deploys the TREE as the decision engine and the black box as a second-opinion risk flag.',
      ],
      questions: [
        'Why deploy the weaker-AUC model for decisions?',
        'How do rules serve operations beyond compliance?',
        'When would the reverse (black-box primary) be defensible?',
      ],
      takeaways: [
        'Explainability is a HARD constraint in regulated decisions — an unverifiable model cannot send decline letters; 5 AUC points bought compliance, trust, and editable policy',
        'Rules serve operations: credit policy analysts EDIT thresholds with governance (versioned rules), dispute handling maps to rule paths, monitoring is per-rule drift — maintainability beats 5 AUC points',
        'Reverse defensible when: no explanation mandate (marketing targeting, recommendation), humans-in-loop review, and explanation layers (SHAP) satisfy governance — a cost-benefit, not a fashion choice',
        'Exam line: representation of knowledge (rules vs black box) is a DEPLOYMENT requirement, not a modelling detail',
      ],
    },
    revision: [
      'Trees: recursive best-split on entropy gain or Gini; leaves = classes',
      'H = −Σp log₂p; Gain = H(parent) − ΣwₖHₖ; Gini = 1−Σp²',
        'Numeric splits at thresholds; many-valued bias → gain ratio',
      'Overfit: train/test gap; pre-prune (depth, min_leaf) vs post-prune (ccp α)',
      'Path = rule; rules editable, auditable, reason codes',
      'Holdout stratified; k-fold CV; test set sacred',
      'Accuracy lies under imbalance; precision/recall/F1; ROC-AUC ranking',
      'Threshold by cost matrix; lift charts for marketing',
      'Encoding, discretisation, target engineering before modelling',
      'Filter/wrapper/embedded feature selection; SMOTE on train, evaluate true mix',
      'Fit preprocessing on train only — Pipeline discipline',
    ],
    practice: [
      { q: 'Parent 50/50 (H = 1.0). A split yields children (25/25) and (25/25). Gain?', a: 'Each child H = 1.0 → Gain = 1.0 − 1.0 = 0: the feature separates nothing (children mirror the parent mix) — the math says "not this feature".' },
      { q: 'Fraud 0.5% of transactions. Model A: accuracy 99.5%, recall 12%. Model B: accuracy 97.8%, recall 71%. Which and why?', a: 'Model B — accuracy is meaningless at 0.5% base (predicting "never fraud" gives 99.5%); recall at a workable precision is the deliverable, tuned by the cost matrix (missed fraud ≫ false review).' },
      { q: 'Why fit SMOTE only on training folds?', a: 'SMOTE synthesises minority points from neighbours; doing it before splitting leaks test-neighbour information into training (and evaluating on balanced data misstates real-world performance) — the imbalance belongs in the model, the evaluation in reality.' },
      { q: 'Parent: 8 yes, 12 no. A split gives (8Y,2N) and (0Y,10N). Compute the information gain.', a: 'H(parent) = 0.971. Children: H(8,2) = 0.722, H(0,10) = 0. Gain = 0.971 - 0.2(0.722) = 0.827 bits - an excellent split, near-pure children.' },
      { q: 'Why can a smaller tree beat the full-grown one on new data?', a: 'The full tree memorises training noise (variance); pruning trades a little bias for a lot of variance - the pruned subtree generalises better, which is the only accuracy that pays.' },
    ],
  },
  {
    slug: 'clustering-association-rules',
    number: 3,
    title: 'Clustering & Association Rules: Unsupervised Discovery',
    minutes: 45,
    summary:
      'Finding structure without labels: similarity and distance measures, hierarchical and partitional (k-means/k-medoids) and model-based clustering, choosing k and validating clusters, association-rule mining (support, confidence, lift) with Apriori, and evaluating both families honestly.',
    status: 'live',
    objectives: [
      'Choose distance/similarity by data type (Euclidean, Manhattan, cosine, Jaccard)',
      'Run hierarchical and k-means clustering; read dendrograms and elbow/silhouette',
      'Mine rules with support/confidence/lift; prune the interesting ones',
      'Validate clusters and rules beyond the algorithm',
    ],
    sections: [
      {
        heading: '1. Distances, clustering families, validation',
        body: [
          'Clustering groups objects so intra-group similarity is high, inter-group low — NO labels: discovery, not prediction. **Distance first** (it defines everything): **Euclidean** (straight-line, default for scaled numeric), **Manhattan** (robust to outliers, grid-like), **Minkowski** generalisation, **cosine similarity** (orientation not magnitude — text/recommendation), **Jaccard** (sets: |A∩B|/|A∪B| — market baskets), **Hamming** (binary strings); mixed data → Gower distance. Rules: scale numeric features (Unit 1); choose distance by MEANING (customer value gap vs behaviour-shape gap).',
          '**Hierarchical** (agglomerative): start n singletons, merge closest pair by LINKAGE (single = min distance — chains; complete = max — tight clusters; average; Ward = variance-minimising — usually best for business segments), produce the **dendrogram**; cut at height = k; no k needed upfront (exploratory). **Partitional: k-means** — choose k centroids → assign points to nearest → recompute centroids → iterate to convergence; FAST, scales, needs k, assumes roughly spherical/equal-variance clusters (fails on rings/bananas, outlier-sensitive — **k-medoids/PAM** robust alternative; DBSCAN density-based for arbitrary shapes + noise). Choosing k: **elbow** (within-cluster SS vs k), **silhouette** (−1..1; how well each point sits: (b−a)/max(a,b)), gap statistic, AND business interpretability (the CEO test: can you NAME each cluster?). **Model-based** (Gaussian mixtures): clusters as probability distributions — soft assignments, BIC-selected count — the statistical version. Validation stability: bootstrap/consensus (do clusters survive resampling?), cross-tab with ex-post outcomes (do segments differ in margin? else why segment?).',
        ],
        callout: {
          type: 'exam',
          text: 'Association-rule measures — memorise with interpretations: **support** = P(A∩B) — how often the pair occurs; **confidence** = P(B|A) — rule reliability; **lift** = confidence/P(B) — vs random: lift > 1 (interesting), = 1 (independent), < 1 (substitute effect!). Apriori property: all subsets of a frequent itemset are frequent — prune the search. The classic numerical: 100 baskets, 20 contain bread+butter, 30 butter, 25 bread → support 20%, confidence(butter→bread) = 20/30 = 0.67, lift = 0.67/0.25 = 2.67 — strong.',
        },
      },
      {
        heading: '2. Association rules and honest evaluation',
        body: [
          '**Market-basket mining** (Apriori, FP-growth for scale): enumerate frequent itemsets (min support), form rules A→B (min confidence), rank by **lift** and business actionability; the LHS is the antecedent (trigger), RHS consequent (what to place/promote). Pitfalls: high-confidence trivial rules (cigarettes→lighter when lighter is in 90% of baskets — lift ≈ 1, prune); rare-item cutoffs (min support too high kills the long tail, too low explodes combinatorics); **redundant rules** (subsets of bigger itemsets); correlation ≠ causation (diapers→beer is a data artifact story, not a mechanism); time/confounders (promotions create co-purchases). Extensions: sequential patterns (A then B — clickstreams), multi-level rules with category hierarchies.',
          '**Evaluating both families**: clustering — internal metrics (silhouette, Dunn) + STABILITY (resampling) + external usefulness (segments differ on outcomes you care about: CLV, churn, margin — BA05\'s segmentation bridge); rules — lift + coverage, then A/B-test the action (place the products together: does basket size move?) — mining proposes, experiments dispose. Visualisation: dendrograms, silhouette plots, t-SNE/UMAP 2-D maps (cluster SHAPES are display artifacts — validate in original space), scatter with centroids, rule networks. The recurring unsupervised trap: algorithms ALWAYS return clusters/rules (k-means finds k clusters in noise too) — the null-model test (cluster on shuffled labels: same silhouette?) separates structure from artefact.',
        ],
        bullets: [
          'Distances: Euclidean/Manhattan numeric (scaled), cosine text, Jaccard sets',
          'Hierarchical: linkage (Ward/complete/average), dendrogram cut = k',
          'k-means: iterate assign-update; needs k; spherical assumption; scale!',
          'k-medoids robust; DBSCAN for shapes + noise; GMM = soft, model-based',
          'Choose k: elbow + silhouette + gap + business interpretability',
          'Validate: stability (resample), outcome differences, null-model test',
          'Rules: support = P(A∩B), confidence = P(B|A), lift = conf/P(B)',
          'Lift ≈ 1 = trivial; < 1 = substitutes; prune by lift + actionability',
          'Apriori: subsets of frequent itemsets are frequent',
          'Mining proposes, experiments dispose — A/B the cross-sell action',
        ],
      },
    ],
    diagram: {
      title: 'Clustering and the rule-measure space',
      caption: 'Left: k-means iterations converge to centroids; the silhouette panel asks "how well does each point belong?". Right: the support-confidence-lift cube — only the high-lift corner is interesting.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clustering and association rules">
  <g font-family="inherit" font-size="11" text-anchor="middle">
    <rect x="16" y="16" width="340" height="216" rx="12" fill="#f8fafc"/>
    <text x="186" y="38" fill="#334155" font-weight="600">K-MEANS + VALIDATION</text>
    <circle cx="90" cy="100" r="5" fill="#dc2626"/><circle cx="110" cy="120" r="5" fill="#dc2626"/><circle cx="80" cy="130" r="5" fill="#dc2626"/><circle cx="120" cy="90" r="5" fill="#dc2626"/>
    <circle cx="220" cy="70" r="5" fill="#2563eb"/><circle cx="240" cy="90" r="5" fill="#2563eb"/><circle cx="210" cy="95" r="5" fill="#2563eb"/>
    <circle cx="160" cy="190" r="5" fill="#16a34a"/><circle cx="180" cy="205" r="5" fill="#16a34a"/><circle cx="140" cy="200" r="5" fill="#16a34a"/>
    <path d="M100,110 L225,85 L160,198 Z" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
    <rect x="90" y="102" width="6" height="6" fill="#dc2626"/><rect x="223" y="85" width="6" height="6" fill="#2563eb"/><rect x="160" y="198" width="6" height="6" fill="#16a34a"/>
    <text x="186" y="236" fill="#475569">centroids = segment means → name each segment (the CEO test)</text>
    <rect x="380" y="16" width="324" height="216" rx="12" fill="#f8fafc"/>
    <text x="542" y="38" fill="#334155" font-weight="600">RULE QUALITY CUBE</text>
    <text x="542" y="70" fill="#475569">confidence →</text>
    <text x="420" y="120" fill="#475569" font-size="10">high conf, low lift: TRIVIAL</text>
    <text x="420" y="136" fill="#475569" font-size="10">(popular consequent)</text>
    <text x="620" y="120" fill="#14532d" font-weight="600" font-size="10">high conf, high lift:</text>
    <text x="620" y="136" fill="#14532d" font-weight="600" font-size="10">ACTIONABLE ★</text>
    <text x="542" y="176" fill="#475569" font-size="10">low confidence: weak triggers — prune</text>
    <rect x="590" y="100" width="90" height="50" rx="8" fill="#dcfce7" opacity="0.85"/>
    <text x="542" y="206" fill="#475569" font-size="10">support sets feasibility (enough baskets to matter)</text>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Euclidean distance', expr: 'd = √Σ(aᵢ − bᵢ)²', meaning: 'Default numeric distance (scaled!)' },
      { name: 'Silhouette', expr: 's = (b − a)/max(a, b)', meaning: 'Cluster fit per point (−1..1)' },
      { name: 'Support', expr: 'P(A ∩ B) = count(both)/N', meaning: 'Rule frequency' },
      { name: 'Confidence', expr: 'P(B | A) = count(both)/count(A)', meaning: 'Rule reliability' },
      { name: 'Lift', expr: 'conf / P(B)', meaning: 'vs random — >1 interesting' },
    ],
    examples: [
      {
        title: 'Segment customers with k-means, then NAME the segments',
        given: ['RFM features (recency, frequency, monetary — z-scored), 40k customers, k = 4 (silhouette 0.38 peak, elbow 4)'],
        steps: [
          { text: 'Fit', calc: 'kmeans(scaled_rfm, centers = 4, nstart = 25) — nstart avoids bad local minima' },
          { text: 'Profile', calc: 'Cluster means: C1 high-R low-F/M "at-risk big spenders"; C2 low-R high-F "loyal core"; C3 mid everything "steady"; C4 low everything "dormant"' },
          { text: 'Validate', calc: 'Silhouette 0.38 (moderate); stability 82% (bootstrap consensus); outcome check: churn rates 34/6/11/61% — segments DIFFER on what matters' },
          { text: 'Act', calc: 'C1 win-back offers; C4 reactivation or deprioritise; C2 loyalty tiers — the segmentation earns its budget' },
        ],
        answer: 'Clusters become strategy only when profiled, stable, and outcome-different — k-means proposes, the business disposes.',
      },
      {
        title: 'Bread, butter, and the trivial-rule trap',
        given: ['1,000 baskets: bread in 300, butter in 250, both in 180; milk in 700, bread+milk in 240'],
        steps: [
          { text: 'Butter→bread', calc: 'support 18%, confidence 180/250 = 72%, lift = 0.72/0.30 = 2.4 — strong: butter buyers buy bread far more than average' },
          { text: 'Milk→bread', calc: 'confidence 240/700 = 34%, lift = 0.34/0.30 = 1.15 ≈ 1 — TRIVIAL: milk is in 70% of baskets, the "rule" is popularity, not association' },
          { text: 'Prune', calc: 'Set min lift 1.2 (and min confidence): milk rules die, butter rules survive — lift, not confidence, is the interestingness filter' },
          { text: 'Action', calc: 'Bundle butter-bread positioning, test via A/B on basket size (mining proposed, experiment disposes)' },
        ],
        answer: 'Confidence flatters popular items; lift exposes real association — always report both plus support.',
      },
    ],
    caseStudy: {
      title: 'Case — Eight segments that were really three',
      body: [
        'A retailer runs k-means on 60 behavioural features and announces 8 micro-segments; marketing builds 8 campaigns. Response is poor; costs are high. Re-analysis: silhouette peaks at 3 (0.41) not 8 (0.19); five of the eight segments fail the stability test (resampling reshuffles their members); the "segments" were noise partitions of a continuum.',
        'Rebuilt on 7 business-meaningful RFM-plus features, k = 3 stable segments + a rules layer (top-lift product affinities per segment) — campaign costs fall 60%, response rises 2.1x.',
      ],
      questions: [
        'Which validation failures were ignored in version 1?',
        'Why did fewer features help?',
        'What is the right role for the 60-feature dataset?',
      ],
      takeaways: [
        'Ignored: silhouette (8 was weak), stability (segments reshuffled), and the outcome check (no behavioural meaning) — internal validity metrics exist to kill weak segmentations BEFORE campaign spend',
        'Sixty correlated behavioural features create noise dimensions that dominate distance; 7 curated features encode the business definition of "segment type" — feature choice IS the segmentation strategy',
        'Role for the 60 features: per-segment AFFINITY RULES (which products co-occur) and propensity MODELS within segments — description with few features, prediction with many',
        'Exam line: k is chosen by elbow/silhouette/gap + stability + interpretability — never by "more segments look sophisticated"',
      ],
    },
    revision: [
      'Distances: Euclidean, Manhattan, Minkowski, cosine, Jaccard, Gower (mixed)',
      'Scale before distance; distance choice = meaning choice',
      'Hierarchical: agglomerative, linkage (Ward best default), dendrogram cut',
      'k-means: assign-update loop, needs k, spherical, outlier-sensitive, nstart',
      'k-medoids robust; DBSCAN shapes+noise; GMM soft/probabilistic, BIC for k',
      'k selection: elbow, silhouette, gap, interpretability',
      'Stability (bootstrap/consensus) + outcome differentiation = real validation',
      'Null-model test: cluster on shuffled data — same score ⇒ artefact',
      'Rules: support P(A∩B); confidence P(B|A); lift = conf/P(B)',
      'Lift ≈1 trivial, <1 substitutes; Apriori property prunes itemsets',
      'Sequential patterns for order; category hierarchies for multi-level rules',
      'A/B-test cross-sell actions — mining proposes, experiments dispose',
    ],
    practice: [
      { q: 'Two customers have identical purchase PATTERNS but one spends 10x. Which distance?', a: 'Cosine on purchase vectors — orientation (what they buy) ignores magnitude (how much): pattern segmentation. Add monetary value as a separate feature if spend matters to the segment meaning.' },
      { q: 'Rule {diapers→beer} lift 1.8, support 2%. Actionable?', a: 'Check confounds first: is a promotion/time-of-day driving both? Test placement in a few stores with matched controls — 2% support may be too thin to fund shelf changes; high lift + low support = niche opportunity, not a strategy.' },
      { q: 'Silhouette 0.55 on t-SNE coordinates vs 0.31 in original space. Which is true?', a: 'Original space — t-SNE distorts distances to make 2-D pictures; clustering quality must be measured where the clusters live (or the algorithm was run on the embedding, which is sometimes valid — say which space, consistently).' },
      { q: 'k-means on revenue (rupees) and visit count (single digits) - what goes wrong?', a: 'Revenue dominates every distance: clusters become revenue bands and behaviour structure vanishes. Z-score both features first - scaling is not optional for distance-based methods.' },
      { q: 'Rule: support 4 percent, confidence 80 percent, lift 0.9. Interpret and act.', a: 'Trivial-to-negative: lift below 1 means the items appear together LESS than independence - substitutes, not complements. Do not merchandise them together; consider substitute-aware pricing.' },
    ],
  },
  {
    slug: 'olap-warehouse-infrastructure',
    number: 4,
    title: 'OLAP, Warehousing & the Mining Infrastructure Layer',
    minutes: 40,
    summary:
      'The infrastructure that feeds mining: visualisation and aggregation, historical/legacy data, query facilities, OLAP functions and operations (ROLAP, MOLAP, HOLAP), OLAP servers and tools, the mining interface, security, backup and recovery, plus neural networks and classification models at the infrastructure frontier.',
    status: 'live',
    objectives: [
      'Model data as cubes: facts, dimensions, hierarchies',
      'Run the OLAP operations: roll-up, drill-down, slice, dice, pivot',
      'Compare ROLAP / MOLAP / HOLAP architectures',
      'Place security, backup/recovery, and legacy integration in the pipeline',
    ],
    sections: [
      {
        heading: '1. Cubes and OLAP operations',
        body: [
          'OLAP (online analytical processing) = multi-dimensional ANALYSIS at interactive speed — the analyst\'s side of the warehouse, pre-aggregating what dashboards and mining need. The **cube**: FACTS (measurable events — sales ₹, units) indexed by DIMENSIONS (product, store, time, channel) with HIERARCHIES (day→month→quarter→year; city→state→region; SKU→category→department). Star schema (facts in the centre, dimension tables around — BA01\'s model, now named) and snowflake (normalised dimensions).',
          'The **operations** (memorise with one example each): **roll-up** (aggregate UP a hierarchy — stores→regions: "consolidate to zone totals"), **drill-down** (the reverse — region→city→store: "what drives the North decline?"), **slice** (fix one dimension — month = March), **dice** (sub-cube — March AND North AND category = snacks), **pivot/rotate** (re-orient the view), drill-through (to detail rows). Aggregation is PRE-COMPUTED (materialised views/cube caches) — that is the speed trick; the trade: storage vs latency. Query facilities: SQL with GROUP BY is the degenerate OLAP; MDX for native cubes; modern SQL extensions (GROUPING SETS, CUBE, ROLLUP operators; window functions for running totals/ranks — the "OLAP functions" of SQL:3rd-party engines). Legacy/historical data: ETL ingests mainframe exports, old ERPs, flat files — the warehouse is the RECONCILIATION layer where "one version of the truth" is built (BA01 Prep\'s five-reports problem solved structurally).',
        ],
        callout: {
          type: 'exam',
          text: 'The operation-identification drill: "view March only" = SLICE (one dimension fixed); "March, North, snacks" = DICE (multi-dimension sub-cube); "monthly → quarterly totals" = ROLL-UP; "region → city detail" = DRILL-DOWN; "swap rows and columns" = PIVOT. And the server taxonomy: ROLAP = relational storage + SQL (scales, slower), MOLAP = array cubes (fast, explosion risk), HOLAP = hybrid (ROLAP detail + MOLAP aggregates).',
        },
      },
      {
        heading: '2. Servers, security, neural models on the platform',
        body: [
          '**Architectures**: warehouse (Inmon: enterprise-integrated, 3NF, top-down) vs data marts (Kimball: dimensional star schemas per business process, bottom-up — most analytics teams live Kimball); lake/lakehouse (raw + schema-on-read) as the modern extension — the syllabus\'s warehouse concepts carry over. **OLAP servers/tools**: ROLAP (relational engine, middleware generates SQL — scales to huge data, moderate latency), **MOLAP** (compressed multi-dimensional arrays — instant answers, cube-splosion when sparse), **HOLAP** (aggregates in MOLAP, detail in ROLAP — the pragmatic default); tools: SSAS/Power BI, Apache Kylin, ClickHouse-style engines; the BA01 dashboards CONSUME this layer.',
          '**Mining interface**: the warehouse serves the features (a "customer 360" table = the Unit 1 target dataset); scheduling (batch scoring — nightly churn scores into CRM), model metadata, feature stores. **Security**: role-based access and ROW-LEVEL security (region managers see their region — the compliance mechanism BA01 Unit 5 invoked), column masking (PII), audit logs, DPDP/GDPR alignment (purpose limitation enforced at the access layer). **Backup & recovery**: the analytics estate inherits enterprise standards — snapshots/replication, point-in-time recovery, DR RTO/RPO; a lost cube is rebuilt from the warehouse (idempotent ETL — the rebuild rule: every artifact is regenerable, BA03\'s reproducibility at platform scale). **Neural networks & classification models** on the platform: MLPs (feed-forward, backprop) for tabular classification — powerful, opaque, compute-hungry; the infrastructure questions: training data plumbing, GPU capacity, MLOps (versioning, monitoring, drift detection), governance for black boxes (explainability stacks — SHAP) — the tree/rules vs NN trade (Unit 2) is ultimately an infrastructure + governance decision as much as a statistical one.',
        ],
        bullets: [
          'Cube = facts × dimensions (with hierarchies); star/snowflake schemas',
          'Roll-up ↑ hierarchy, drill-down ↓, slice (1 dim), dice (sub-cube), pivot',
          'Pre-aggregation (materialised views) = the speed trade',
          'SQL: GROUPING SETS/CUBE/ROLLUP + window functions = OLAP in SQL',
          'Warehouse (Inmon 3NF) vs marts (Kimball stars) vs lakehouse',
          'ROLAP scales / MOLAP speed / HOLAP hybrid default',
          'Mining interface: customer-360 tables, batch scoring, feature stores',
          'Security: RLS, masking, audit, purpose limitation (DPDP/GDPR)',
          'Recovery: snapshots, DR, idempotent ETL — artifacts regenerable',
          'Neural nets: power at the cost of opacity — MLOps + explainability required',
        ],
      },
    ],
    diagram: {
      title: 'The analytics stack: sources to OLAP to mining',
      caption: 'ETL builds the dimensional warehouse; cubes serve OLAP at speed; mining and dashboards consume the same governed truth; security wraps every layer.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Analytics infrastructure stack">
  <defs><marker id="oa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#475569"/></marker></defs>
  <g font-family="inherit" font-size="11" text-anchor="middle">
    <rect x="16" y="90" width="130" height="70" rx="10" fill="#e0f2fe"/><text x="81" y="112" fill="#0c4a6e" font-weight="600">SOURCES</text><text x="81" y="128" fill="#075985">ERP · CRM · legacy</text><text x="81" y="144" fill="#075985">files · web</text>
    <rect x="180" y="90" width="130" height="70" rx="10" fill="#bbf7d0"/><text x="245" y="112" fill="#14532d" font-weight="600">ETL</text><text x="245" y="128" fill="#166534">clean · conform</text><text x="245" y="144" fill="#166534">schedule</text>
    <rect x="344" y="90" width="140" height="70" rx="10" fill="#fef9c3"/><text x="414" y="112" fill="#713f12" font-weight="600">WAREHOUSE</text><text x="414" y="128" fill="#a16207">star schemas</text><text x="414" y="144" fill="#a16207">one truth</text>
    <rect x="518" y="30" width="186" height="56" rx="10" fill="#fed7aa"/><text x="611" y="50" fill="#9a3412" font-weight="600">OLAP CUBES</text><text x="611" y="66" fill="#c2410c">roll-up · drill · slice · dice</text>
    <rect x="518" y="120" width="186" height="56" rx="10" fill="#fee2e2"/><text x="611" y="140" fill="#7f1d1d" font-weight="600">MINING + DASHBOARDS</text><text x="611" y="156" fill="#991b1b">BA04 models · BA01 viz</text>
    <line x1="146" y1="125" x2="178" y2="125" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="310" y1="125" x2="342" y2="125" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="484" y1="115" x2="516" y2="66" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="484" y1="135" x2="516" y2="146" stroke="#475569" stroke-width="1.5" marker-end="url(#oa)"/>
    <rect x="180" y="200" width="356" height="34" rx="8" fill="#ede9fe"/><text x="358" y="222" fill="#4c1d95" font-weight="600">SECURITY: RLS · masking · audit · backup/DR — every layer</text>
    <line x1="414" y1="160" x2="414" y2="198" stroke="#7c3aed" stroke-width="1.2" stroke-dasharray="4 3"/>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Cube cell', expr: 'cell(d₁…dₖ) = aggregate(fact | dimension values)', meaning: 'Pre-computed answer' },
      { name: 'Storage-_latency trade', expr: '#aggregates grows ∝ Π(hierarchy levels)', meaning: 'Cube-splosion risk (MOLAP)' },
      { name: 'Window function', expr: 'SUM(x) OVER (PARTITION BY dim ORDER BY t)', meaning: 'SQL OLAP: running totals' },
    ],
    examples: [
      {
        title: 'One cube, five questions',
        given: ['Sales cube: facts = revenue; dims = time (day→qtr), product (SKU→cat), store (store→zone)'],
        steps: [
          { text: '"North zone total, FY"', calc: 'ROLL-UP store→zone, time→year; slice zone = North' },
          { text: '"Which city in North fell?"', calc: 'DRILL-DOWN zone→city on the same view' },
          { text: '"March, snacks, North"', calc: 'DICE (three dimensions constrained)' },
          { text: '"Category trend by month"', calc: 'PIVOT (categories to rows, months to columns) after roll-up SKU→category' },
        ],
        answer: 'Every management question is a composition of five verbs over the cube — that is OLAP literacy.',
      },
      {
        title: 'Pick the server architecture',
        given: ['2TB facts, 40 analysts, sub-second dashboards on aggregates, occasional drill to invoice rows'],
        steps: [
          { text: 'MOLAP alone?', calc: 'Fast but the sparse cube (store×SKU×day) explodes storage — risky' },
          { text: 'ROLAP alone?', calc: 'Handles detail and scale, but sub-second on every aggregate needs heavy SQL — risky latency' },
          { text: 'HOLAP', calc: 'Aggregates (zone×month×category) in MOLAP arrays — instant; drill-through to ROLAP for invoice rows — the standard pattern for this profile' },
          { text: 'Add', calc: 'Materialise the top-20 dashboard queries; RLS by zone; nightly ETL with idempotent rebuild' },
        ],
        answer: 'HOLAP: speed where it is hit constantly, relational where it is hit rarely — architecture follows the query mix.',
      },
    ],
    caseStudy: {
      title: 'Case — The night the cube died (and nobody noticed for a week)',
      body: [
        'A retail analytics team serves 300 dashboards from an ETL-fed cube. A silent change in the source ERP (a renamed store-status code) causes the "active stores" filter to exclude 400 stores from Wednesday\'s load. Dashboards show a mysterious sales DROP of 9%. Two regional teams reconcile against their own Excel exports before anyone checks the pipeline; a price-promotion investigation starts on phantom data.',
        'Post-fix: reconciliation totals (fact counts vs source, per load), anomaly alerts on metric jumps > 3σ at load time, and a data-quality dashboard make the pipeline failure LOUD within minutes, not weeks.',
      ],
      questions: [
        'Which layer failed — and which layer SHOULD have caught it?',
        'Why did the Excel shadow-process make things worse?',
        'Design the three controls that prevent recurrence.',
      ],
      takeaways: [
        'ETL conformance failed (no schema-change contract with the ERP team); the WAREHOUSE layer should have caught it — reconciliation checks are part of the ETL, not an audit afterthought',
        'Shadow spreadsheets fork the truth (BA03\'s case again): they delayed trust in the (correct) post-fix numbers and multiplied reconciliation cost — one governed source, visible quality metrics',
        'Controls: (1) per-load reconciliation (row counts, control totals vs source), (2) load-time anomaly detection on key metrics (3σ alarm), (3) lineage + schema-change versioning between upstream and ETL teams',
        'Exam link: backup/recovery is not just about losing data — SILENT data corruption is the analytics platform\'s worst failure; the rebuild must be regenerable AND verifiable',
      ],
    },
    revision: [
      'Cube: facts × dimensions; hierarchies; star vs snowflake',
      'Roll-up ↑ / drill-down ↓ / slice (1 dim) / dice (sub-cube) / pivot',
      'Pre-aggregation = speed; cube-splosion in sparse MOLAP',
      'SQL OLAP: GROUPING SETS, CUBE, ROLLUP operators, window functions',
      'Inmon (3NF warehouse, top-down) vs Kimball (dimensional marts)',
      'ROLAP relational (scale) / MOLAP arrays (speed) / HOLAP hybrid',
      'Mining interface: customer-360, batch scoring, feature stores',
      'Legacy via ETL: the warehouse reconciles one version of truth',
      'Security: RLS, column masking, audit, DPDP purpose limitation',
      'Backup/DR: snapshots, RTO/RPO, idempotent rebuildable ETL',
      'Reconciliation controls per load — silent corruption is the killer',
      'Neural nets: power vs opacity; MLOps + SHAP governance to deploy',
    ],
    practice: [
      { q: 'Why is drill-down slow on a ROLAP server even when roll-ups are fast?', a: 'Roll-ups hit pre-computed aggregates; drill-down must assemble detail rows relationally — the storage-omission at the detail level is exactly what makes aggregates fast; HOLAP drill-through is the standard remedy.' },
      { q: 'A manager should see only her region. Which mechanism, at which layer?', a: 'Row-level security at the warehouse/cube access layer (filter dimension rows by user→region mapping) — enforced centrally, inherited by every dashboard and mining extract; per-dashboard filters are cosmetic and leakable.' },
      { q: 'Your nightly mining job takes 9 hours and often fails at the join step. Fix order?', a: '(1) Verify join keys/types and skew (one exploding key dominates), (2) pre-aggregate/cluster the extract (push computation to the warehouse), (3) checkpoint the ETL for restartability, (4) only then consider bigger compute — most "ML" problems here are pipeline problems.' },
      { q: 'Give the OLAP operations for: (a) quarterly totals for the North zone, (b) only snack SKUs in March in the North.', a: '(a) Roll-up time to quarter and product to category, slice zone = North. (b) Dice - constrain three dimensions at once (time = March, zone = North, category = snacks).' },
      { q: 'Why do most analytics teams run HOLAP despite MOLAP being faster?', a: 'Sparse cubes explode storage (store x SKU x day mostly empty), so aggregates go to MOLAP for speed and detail stays relational for drill-through - the pragmatic hybrid.' },
    ],
  },
  {
    slug: 'data-mining-applications',
    number: 5,
    title: 'Applications: CRM, Basket, Fraud, Risk & Web Mining',
    minutes: 40,
    summary:
      'The application file: CRM analytics (acquisition, retention, next-best-action), market-basket and cross-sell, fraud detection, risk management, and web mining — classifying pages, extracting knowledge from server logs and content, with war stories from each domain.',
    status: 'live',
    objectives: [
      'Map mining techniques to CRM decisions across the lifecycle',
      'Run a basket/cross-sell programme from rules to A/B test',
      'Design a fraud pipeline: labels, imbalance, precision/recall economics',
      'Mine the web: log analysis, page classification, content extraction',
    ],
    sections: [
      {
        heading: '1. CRM and market basket',
        body: [
          '**CRM mining** across the customer lifecycle: acquisition (look-alike modelling — classify prospects by resemblance to best customers, careful of selection bias), **cross-sell/next-best-action** (association rules + propensity models — recommend what similar customers bought next; BA05\'s recommendation logic), **retention/churn** (classification — Unit 2 trees, BA03 logistic; intervention targeting by expected value: churn_prob × margin_saved × conversion_of_offer − offer_cost), segmentation (Unit 3 clusters feeding differentiated service tiers), customer-360 as the data foundation (the OLAP layer\'s mining interface). The CRM stack IS this subject assembled: warehouse → features → models → campaign systems → measured outcomes → re-training.',
          '**Market-basket analysis to cross-sell programme**: mine rules (Unit 3) → filter by lift and margin (interesting AND profitable) → place products/prompt at checkout → A/B test basket impact → scale winners; the honest chain: association ≠ causation, the experiment licenses the action. Retail extensions: planogram affinity, promotion design (which items anchor a basket), private-label adjacency. War story: a grocer finds atta→oil lift 2.1 and repositions; basket +3.4% in test stores; a "chips→cola" rule turns out promotion-driven (lift collapses post-promo) — temporal validation of rules matters.',
        ],
        callout: {
          type: 'exam',
          text: 'Fraud/risk evaluation = the cost matrix: missed fraud costs ₹9,999 avg, false review ₹1 — the optimal threshold is NOT 0.5 and accuracy is NOT the metric: maximise expected value = Σ (benefit·TP − cost·FP) across thresholds; report precision at the chosen operating point and recall against fraud ₹ recovered. One-line exam answer: "fraud models are ranked by money caught per false alarm, not by accuracy."',
        },
      },
      {
        heading: '2. Fraud, risk, web',
        body: [
          '**Fraud detection**: labels are adversarial (fraudsters adapt — concept drift is the defining property), rare (0.1–1%: the imbalance regime — Unit 2\'s balancing + evaluation on true mix), and delayed (charges surface weeks later — label latency). Pipeline: features (velocity — 5 transactions in 2 minutes across cities; device fingerprints; network/graph features — shared devices/IPs expose mule rings; behavioural baselines per user), hybrid rules + ML (rules for known patterns, models for scores), **anomaly detection** for novel patterns (isolation forests, autoencoders), graph analytics for organised fraud (rings visible only in the network, not the transaction row — F02 Unit 5\'s layers), alert triage by precision (investigator capacity — the queue problem), feedback loops (dispositions retrain). Metrics: precision@k (top alerts actually investigated), recall in ₹ (fraud value caught), false-positive rate per 1,000 good customers (the friction cost).',
          '**Risk management mining**: credit scoring (logistic/trees on bureau + cash-flow features — F02 Unit 4/5), early-warning (leading indicators clustering into risk states), stress-testing scenarios mined from historical co-movements, model risk governance (the reason-code requirement — Unit 2). **Web mining**, three families: (1) **web CONTENT mining** — classify pages (topic, sentiment — the NLP bridge to BA05), extract structured knowledge (entity/relation extraction from HTML tables and text: prices, specs), deduplicate near-identical pages; (2) **web USAGE mining** — server/clickstream logs: sessionisation, funnel analysis (where users drop), path patterns (sequential-rule mining), recommendation signals (co-visitation), bot filtering (bots are 40–60% of traffic — misfiltered bots poison every metric); (3) **web STRUCTURE mining** — PageRank-style link analysis (authority/hub scores), crawling prioritisation. War story: a support portal "redesigns" based on usage mining that included bots — human funnels were actually fine; bot filtering reversed the decision.',
        ],
        bullets: [
          'CRM lifecycle: acquisition look-alikes, NBA propensities, churn EV targeting',
          'Retention targeting = churn_prob × margin × take-rate − offer cost',
          'Basket programme: rules → lift × margin filter → A/B → scale',
          'Fraud: adversarial drift, 0.1–1% labels, label latency',
          'Fraud features: velocity, device, graph (rings), behavioural baselines',
          'Rules for known + ML scores + anomaly detection for novel',
          'Metrics: precision@k, recall-in-₹, FP per 1,000 good customers',
          'Credit scoring + early-warning = the risk-mining core',
          'Web: content (classify/extract), usage (sessions/funnels/bot filter), structure (links)',
          'Bots are half of traffic — filter before believing any web metric',
        ],
      },
    ],
    diagram: {
      title: 'One platform, five application domains',
      caption: 'The same pipeline (features → models → decisions → measured outcomes) serves CRM, basket, fraud, risk and web — only the labels and economics differ.',
      svg: `<svg viewBox="0 0 720 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mining application domains">
  <g font-family="inherit" font-size="12" text-anchor="middle">
    <rect x="250" y="96" width="220" height="58" rx="12" fill="#e0f2fe"/><text x="360" y="118" fill="#0c4a6e" font-weight="600">THE PLATFORM</text><text x="360" y="136" fill="#075985">warehouse → features → models → outcomes</text>
    <rect x="16" y="20" width="200" height="52" rx="10" fill="#dcfce7"/><text x="116" y="40" fill="#14532d" font-weight="600">CRM</text><text x="116" y="56" fill="#166534">segments · churn EV · next-best-action</text>
    <rect x="16" y="92" width="200" height="52" rx="10" fill="#fef9c3"/><text x="116" y="112" fill="#713f12" font-weight="600">MARKET BASKET</text><text x="116" y="128" fill="#a16207">lift × margin → A/B → planograms</text>
    <rect x="16" y="164" width="200" height="52" rx="10" fill="#fee2e2"/><text x="116" y="184" fill="#7f1d1d" font-weight="600">FRAUD</text><text x="116" y="200" fill="#991b1b">velocity · graph rings · precision@k</text>
    <rect x="504" y="20" width="200" height="52" rx="10" fill="#ffedd5"/><text x="604" y="40" fill="#7c2d12" font-weight="600">RISK</text><text x="604" y="56" fill="#9a3412">scores · early warning · governance</text>
    <rect x="504" y="92" width="200" height="52" rx="10" fill="#ede9fe"/><text x="604" y="112" fill="#4c1d95" font-weight="600">WEB</text><text x="604" y="128" fill="#5b21b6">funnels · page classify · link ranks</text>
    <rect x="504" y="164" width="200" height="52" rx="10" fill="#cffafe"/><text x="604" y="184" fill="#155e75" font-weight="600">THE LOOP</text><text x="604" y="200" fill="#0e7490">dispositions retrain the models</text>
    <line x1="216" y1="46" x2="290" y2="100" stroke="#475569" stroke-width="1.3"/>
    <line x1="216" y1="118" x2="248" y2="122" stroke="#475569" stroke-width="1.3"/>
    <line x1="216" y1="190" x2="290" y2="146" stroke="#475569" stroke-width="1.3"/>
    <line x1="470" y1="100" x2="502" y2="50" stroke="#475569" stroke-width="1.3"/>
    <line x1="470" y1="122" x2="502" y2="118" stroke="#475569" stroke-width="1.3"/>
    <line x1="470" y1="146" x2="502" y2="184" stroke="#475569" stroke-width="1.3"/>
  </g>
</svg>`,
    },
    formulas: [
      { name: 'Churn campaign EV', expr: 'EV = p_churn × margin_saved × take_rate − offer_cost', meaning: 'Who gets the retention call' },
      { name: 'Fraud threshold value', expr: 'V(τ) = ₹caught(τ) − review_cost × FP(τ)', meaning: 'Pick τ by money, not accuracy' },
      { name: 'Rule value', expr: 'lift × margin impacted × exposure', meaning: 'Basket-rule shortlist filter' },
      { name: 'Funnel conversion', expr: 'step_conv = users(stepᵢ)/users(stepᵢ₋₁)', meaning: 'Where the web leaks' },
    ],
    examples: [
      {
        title: 'Target the retention budget',
        given: ['10,000 subscribers; churn model AUC 0.83; margin at risk ₹4,800/customer; offer cost ₹350; take-rate 25%; p threshold to decide'],
        steps: [
          { text: 'EV per customer', calc: 'p × 4800 × 0.25 − 350 > 0 → p > 29.2% — offer only where churn risk exceeds ~29%' },
          { text: 'Count', calc: 'Say 1,850 customers above 0.29 → budget ₹6.5L; expected saves ≈ Σp×0.25 over the group ≈ 240 saves ≈ ₹11.5L margin retained' },
          { text: 'Calibration matters', calc: 'If model over-predicts (calibration curve off), EV is fiction — recalibrate (Platt/isotonic) before budgeting' },
          { text: 'Holdout', calc: '10% no-offer control to measure TRUE lift of the campaign — the model\'s EV is a hypothesis until tested' },
        ],
        answer: 'The threshold is an EV calculation, not a probability convention — and the control group proves it.',
      },
      {
        title: 'Fraud alert queue economics',
        given: ['Model scores 1,000 alerts/day; investigators action 300; avg fraud ₹12,000; false-review cost ₹150 (customer friction included)'],
        steps: [
          { text: 'Rank by score', calc: 'Take top-300 alerts: precision 0.34 → ~102 frauds caught ≈ ₹12.2L/day; 198 false reviews ≈ ₹29,700 cost' },
          { text: 'Improve', calc: 'Add graph features (device rings): precision@300 → 0.46 → ₹16.6L caught — the ring signal was worth more than the model tune' },
          { text: 'Auto-block the top slice', calc: 'Scores > 0.97 with precision 0.95+: block without review — the friction calculus shifts because precision is near-certain' },
          { text: 'Drift watch', calc: 'Weekly precision@k trend — fraudsters probe; a falling curve means new patterns (anomaly detection + retrain)' },
        ],
        answer: 'Fraud mining is queue economics: rank, ration, and retrain — measured in rupees caught per false alarm.',
      },
    ],
    caseStudy: {
      title: 'Case — The acquisition model that targeted the wrong "best"',
      body: [
        'A subscription business builds a look-alike model on its top-decile CURRENT customers and acquires 50,000 "ideal" prospects. Churn among the cohort is 2x average within six months. Diagnosis: the "best customers" were mostly survivors of a legacy unlimited plan — their features (usage patterns, tenure, acquisition channel) described a plan no longer offered; the model learned a historical artefact.',
        'Rebuild: the target redefined as "profitable at CURRENT plan economics", trained on cohorts acquired under today\'s pricing, with channel-holdout validation.',
      ],
      questions: [
        'Which mining failure is this (name it precisely)?',
        'Why did holdout-by-cohort fix it?',
        'What ongoing control prevents recurrence?',
      ],
      takeaways: [
        'Population/label drift: the training label ("best customers") was defined by a dead regime — look-alike models copy history, including its artefacts; question WHAT the label represents before HOW to model it',
        'Cohort-based validation (train on old-acquisition, test on new-plan cohorts) exposes regime dependence immediately — the deployment distribution again (Unit 1\'s case logic)',
        'Control: periodic label audits (is "best" still defined by today\'s economics?), cohort-graded model monitoring, and a policy economics layer over the model score',
        'Exam line: applications fail at the label-definition and validation-design stage far more often than at the algorithm — the KDD stage-1 lesson, now with a ₹ price tag',
      ],
    },
    revision: [
      'CRM: acquisition look-alikes (bias watch), NBA, churn EV targeting',
      'Retention EV: p × margin × take − cost → threshold, calibrated + holdout',
      'Basket: lift × margin filter → placement → A/B → scale; temporal validation',
      'Fraud: rare + adversarial + delayed labels; concept drift constant',
      'Fraud features: velocity, device, behavioural baseline, GRAPH rings',
      'Hybrid: rules (known) + ML (scores) + anomaly (novel); alert triage precision@k',
      'Metrics: recall-in-₹, FP per 1,000 good; auto-block only near-certain',
      'Risk: scorecards, early-warning clusters, stress scenarios, governance',
      'Web content: page classification, entity/relation extraction, dedup',
      'Web usage: sessionisation, funnels, path/sequence rules, BOT FILTERING first',
      'Web structure: link authority (PageRank-class), crawl priority',
    ],
    practice: [
      { q: 'Basket rule lift 2.2 between two private-label products. Before repositioning, what do you check?', a: 'Promotion confounding (was a promo running in the window?), margin impact (lift on low-margin pair may destroy value), store/channel consistency, and then A/B the placement — the rule is a hypothesis until the experiment.' },
      { q: 'Why does a churn model need a control group in every campaign?', a: 'To measure the campaign\'s true incremental lift: some "saves" would have stayed anyway (deadweight), some offers TEACH churn (customers learn offers follow threats). Only treated-vs-control differences identify causation — the BA06 discipline applied to CRM.' },
      { q: 'Your web funnel shows 80% drop at checkout. First check?', a: 'Bot/filter integrity and sessionisation bugs (bots hitting checkout pages, broken session stitching from cross-device) — validate the FUNNEL MEASUREMENT before redesigning the page; usage mining\'s first deliverable is trustworthy measurement.' },
      { q: 'Churn model AUC 0.96 on validation. Good news or alarm?', a: 'Alarm - suspect leakage (a feature that knows the outcome, like retention-team contact). Audit every feature for availability at prediction time and validate on a time-based split before celebrating.' },
      { q: 'Write the EV formula deciding who gets a retention offer.', a: 'EV = p(churn) x margin_saved x take_rate - offer_cost; contact customers where EV > 0, ranked by EV. Calibration matters as much as ranking - uncalibrated probabilities make the EV fiction.' },
    ],
  },
];
