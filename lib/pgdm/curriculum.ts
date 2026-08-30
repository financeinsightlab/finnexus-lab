import type { Subject } from './types';
import { financialModelingValuation } from './content/financial-modeling-valuation';
import { securityAnalysisPortfolioManagement } from './content/security-analysis-portfolio-management';
import { businessAnalyticsExcel } from './content/business-analytics-decision-science';
import { projectManagement } from './content/project-management';
import { legalBusinessEnvironment } from './content/legal-business-environment';
import { behaviouralFinance } from './content/behavioural-finance';
import { bankingInsuranceLectures } from './content/banking-insurance';
import { financialDerivativesLectures } from './content/financial-derivatives';
import { internationalFinanceLectures } from './content/international-finance';
import { dataVisualizationLectures } from './content/data-visualization';
import { businessForecastingLectures } from './content/business-forecasting';
import { dataScienceRLectures } from './content/data-science-r';
import { dataMiningLectures } from './content/data-mining';
import { marketingAnalyticsLectures } from './content/marketing-analytics';

/* ═══════════════════════════════════════════════════════════════
   PGDM (2025–27) · Year II · Semester III — handbook order:
   Core (301, 302) → Finance Major (F01–F06) → BA Minor (BA01–BA06)
   Subject data transcribed from the college handbook.
   ═══════════════════════════════════════════════════════════════ */

const outline = (s: Omit<Subject, 'lectures'> & { lectures?: Subject['lectures'] }): Subject => ({
  ...s,
  lectures: s.lectures ?? [],
});

export const SUBJECTS: Subject[] = [
  /* ─────────── HANDBOOK ORDER: Core (PGDM 301–302) → Finance (F01–F06) → Analytics (BA01–BA06) ─────────── */
  projectManagement,                 // PGDM 301
  legalBusinessEnvironment,          // PGDM 302
  behaviouralFinance,                // PGDM F01

  /* ─────────── PGDM F02 ─────────── */
  /* ─────────── PGDM F02 — Banking, Insurance & Financial System ─────────── */
  outline({
    slug: 'banking-insurance-financial-system',
    code: 'PGDM F02',
    name: 'Banking, Insurance and Financial System',
    track: 'FINANCE',
    credits: 3,
    hours: 30,
    semester: 3,
    tagline: 'The BFSI machine — from CRR to credit rating.',
    description:
      'The Indian banking system and RBI toolkit (CRR, SLR, repo, OMO), retail & wholesale banking products, insurance principles and pricing, microfinance and the financial services ecosystem, and the technology redefining BFSI — analytics, AI and fraud mitigation.',
    outcomes: [
      'Summarise foundational concepts of banking, insurance & financial services',
      'Analyse financial products and services in the global and economic environment',
      'Evaluate risk and insurance in the financial business environment',
      'Compare financial services and their components in a competitive market',
      'Assess technological dynamics and developments in the BFSI industry',
    ],
    units: [
      'Unit 1 — Introduction to Banking: definition & characteristics; Indian banking system; types of banks; RBI as central bank; NBFCs; CRR, SLR, repo & reverse repo, open market operations',
      'Unit 2 — Retail & Wholesale Banking: accounts & deposits (savings, current, FD); lending products; treasury, trade & forex; behavioural profile of retail and corporate customers',
      'Unit 3 — Principles & Practices of Insurance: risk and insurance; general & life insurance; costing and pricing of products; loan amortisation; premium calculation; underwriting; conditions & warranties',
      'Unit 4 — Microfinance & Financial Services: evolution of microfinance & SHGs; merchant banking and issue management; leasing & hire purchase; venture capital; credit ratings; retail finance',
      'Unit 5 — Technology in BFSI: IT in banking; RBI\'s lead role; ACH, MICR, credit information bureaus; automation; analytics & AI-powered financial services; fraud mitigation',
    ],
    lectures: bankingInsuranceLectures,
    books: [
      { title: 'Banking Law and Practice', author: 'P.N. Varshney — Himalaya Publication' },
      { title: 'Financial Markets and Institutions', author: 'Sultan Chand & Sons' },
      { title: 'Financial Services', author: 'M.Y. Khan — McGraw Hill' },
      { title: 'Management of Banking and Financial Services', author: 'Suresh — Pearson' },
    ],
  }),

  /* ─────────── PGDM F03 ─────────── */
  /* ─────────── PGDM F03 — Financial Derivatives ─────────── */
  outline({
    slug: 'financial-derivatives',
    code: 'PGDM F03',
    name: 'Financial Derivatives',
    track: 'FINANCE',
    credits: 3,
    hours: 30,
    semester: 3,
    tagline: 'Forwards, futures, options, swaps — pricing and hedging.',
    description:
      'The derivatives universe from first principles: market mechanics and trader types, forwards and futures with the cost-of-carry model and margining, options strategies with the Greeks and Black–Scholes, interest-rate and currency swaps, and credit & exotic derivatives.',
    outcomes: [
      'Demonstrate knowledge of derivative instruments and why they exist',
      'Analyse trading mechanics, risks, costs — and calculate payoffs for decisions',
      'Evaluate trading strategies using option valuation and the Greeks',
      'Develop investment strategies through swaps and combined instruments',
      'Integrate derivatives for risk management and communicate the solutions',
    ],
    units: [
      'Unit 1 — Introduction: derivative markets past & present; concept, purpose, types; hedgers, arbitrageurs, speculators; exchange-traded vs OTC',
      'Unit 2 — Forwards & Futures: terminology; differences; contract specifications; cost-of-carry pricing; margins & mark-to-market; long/short positions',
      'Unit 3 — Options: market mechanics; types; strategies — bull/bear/butterfly spreads, straddles, strips & straps, strangles; Greeks (delta, theta, gamma, vega, rho); Black–Scholes valuation',
      'Unit 4 — Swaps & Interest-Rate Derivatives: IRS mechanics & valuation; currency swaps; interest-rate futures; bond & T-bill futures; forward rate agreements',
      'Unit 5 — Credit & Other Derivatives: credit default swaps; total return swaps; CDS forwards & options; CDOs; weather, energy and other contracts',
    ],
    lectures: financialDerivativesLectures,
    books: [
      { title: 'Fundamentals of Futures and Options', author: 'John Hull — Pearson Education' },
      { title: 'Derivatives and Risk Management', author: 'Dhanesh Khatri — Prentice-Hall of India' },
      { title: 'Fundamentals of Financial Derivatives', author: 'N.R. Parasuraman — Wiley India' },
    ],
  }),
  securityAnalysisPortfolioManagement,// PGDM F04

  /* ─────────── PGDM F05 ─────────── */
  /* ─────────── PGDM F05 — International Financial Management ─────────── */
  outline({
    slug: 'international-financial-management',
    code: 'PGDM F05',
    name: 'International Financial Management',
    track: 'FINANCE',
    credits: 3,
    hours: 30,
    semester: 3,
    tagline: 'Bretton Woods to invoices — finance without borders.',
    description:
      'The international monetary system from Bretton Woods to today, FX markets with two-way quotes and cross rates, parity theories (PPP, IRP) and forecasting, transaction/translation/economic exposure and hedging, FDI theories, and the instruments of foreign operations — LCs, GDRs/ADRs, euro markets.',
    outcomes: [
      'Summarise the evolution of the international financial and monetary system',
      'Analyse foreign-exchange rate determination and FX market functioning',
      'Apply strategies for foreign economic and operating exposures',
      'Compare theories of international business and operations',
      'Assess international financing instruments and their documentation',
    ],
    units: [
      'Unit 1 — International Financial System: Bretton Woods; IMF activities; exchange-rate regimes; European Monetary System; FX movements and trade & investment flows; global capital markets',
      'Unit 2 — Foreign Exchange Markets: balance of payments; participants; two-way quotes, spreads, cross rates; settlements; demand & supply; arbitrage; PPP and interest-rate parity; forward rates as forecasters',
      'Unit 3 — FX Risk, Exposure & Management: forecasting; transaction, translation & economic exposure; evaluation for firms; hedging in forward, futures and options markets',
      'Unit 4 — Foreign Investment: market-structure theories; product life cycle; Hymer\'s theory; internalisation; turnkey projects; FDI; venture capital; foreign capital budgeting; multinational cost of capital; international securities',
      'Unit 5 — Foreign Operations: international banking; euro-credit & euro-bond markets; GDR/ADR equity financing; euro notes; currency of invoicing; multi-currency final accounts; letters of credit & bills of exchange; international project risks; international accounting & taxation',
    ],
    lectures: internationalFinanceLectures,
    books: [
      { title: 'International Financial Management', author: 'Vyuptakesh Sharan — Pearson' },
      { title: 'International Financial Management', author: 'P.K. Jain, S. Yadav — Macmillan' },
      { title: 'International Financial Management (XI Edition)', author: 'Alan C. Shapiro, Peter Moles & Jayanta Kumar Seal' },
      { title: 'International Financial Management: Text & Cases', author: 'Madhu Vij — Taxmann' },
    ],
  }),
  financialModelingValuation,        // PGDM F06

  /* ─────────── PGDM BA01 ─────────── */
  /* ─────────── PGDM BA01 — Data Visualization for Managers ─────────── */
  outline({
    slug: 'data-visualization-managers',
    code: 'PGDM BA01',
    name: 'Data Visualization for Managers',
    track: 'ANALYTICS',
    credits: 3,
    hours: 30,
    semester: 3,
    tagline: 'Charts that argue, dashboards that decide.',
    description:
      'Visual perception and design principles, the Power BI workflow (tables, dashboards, AI insights, Q&A), Tableau end-to-end — connections, prep, calculations, filters, parameters, sets, forecasting — dashboard and story construction, and the ethics of what we draw.',
    outcomes: [
      'Explain design principles and build Power BI dashboards and visual reports',
      'Apply Tableau fundamentals — connections, preparation, basic visualisations',
      'Use advanced Tableau: filters, forecasting, sets, R/Python integration',
      'Create interactive dashboards and compelling data stories',
      'Evaluate trends, ethics and strategy of visualisation in business',
    ],
    units: [
      'Unit 1 — Visualization Overview & Power BI: need, types, benefits; perception; design principles & standards; effective vs ineffective visuals; data models & variables; data ethics; Power BI — tables, dashboards, reports, AI insights, Q&A',
      'Unit 2 — Tableau Fundamentals: interface; data connections & imports; data types; preparation with text & Excel files; table preparation; charts; Tableau Prep for cleaning',
      'Unit 3 — Tableau Calculations & Filters: maps; filter types; parameters; groups & sets; trend analysis, forecasting, reference lines; annotations; advanced calculations; R/Python integration',
      'Unit 4 — Dashboards in Tableau: building dashboards; Excel vs Tableau; formatting; dashboard filters & objects; trend and reference lines; stories and storytelling to influence decisions',
      'Unit 5 — Trends & Ethics: AI & automation; augmented analytics; mobile & embedded platforms; real-time & streaming; privacy & compliance; bias in data and visuals; ethical colour & design',
    ],
    lectures: dataVisualizationLectures,
    books: [
      { title: 'The Visual Display of Quantitative Information (2nd Ed.)', author: 'E. Tufte — Graphics Press' },
      { title: 'Tableau Your Data!', author: 'Daniel G. Murray et al.' },
      { title: 'Data Visualization: A Practical Introduction', author: 'Kieran Healy — Princeton University Press' },
      { title: 'Introducing Microsoft Power BI', author: 'Alberto Ferrari & Marco Russo' },
    ],
  }),

  /* ─────────── PGDM BA02 ─────────── */
  /* ─────────── PGDM BA02 — Business Forecasting ─────────── */
  outline({
    slug: 'business-forecasting',
    code: 'PGDM BA02',
    name: 'Business Forecasting',
    track: 'ANALYTICS',
    credits: 3,
    hours: 30,
    semester: 3,
    tagline: 'See around corners — with error bars.',
    description:
      'The forecasting system: data collection and accuracy metrics, time-series methods from moving averages and exponential smoothing to decomposition and ARIMA, qualitative methods (Delphi, scenario planning, decision trees), ML and ensemble forecasting, and applications across demand, budgeting and risk.',
    outcomes: [
      'Understand data collection for business forecasting',
      'Apply standard time-series analysis techniques',
      'Critically evaluate business forecasting scenarios',
      'Integrate forecasting concepts across functions',
      'Analyse and interpret numerical data proficiently',
    ],
    units: [
      'Unit 1 — Introduction: importance & benefits; types of forecasts; forecasting system components; data collection & analysis; accuracy and performance metrics',
      'Unit 2 — Quantitative Methods: time-series techniques; moving averages & exponential smoothing; trend analysis & decomposition; ARIMA; seasonality',
      'Unit 3 — Qualitative Methods: expert judgment; Delphi; market research & surveys; scenario planning & decision trees; technology & industry trend analysis',
      'Unit 4 — Advanced Techniques: multiple regression forecasting; ML & AI forecasting; combination & ensemble methods; new-product & PLC forecasting; supply-chain & inventory forecasting',
      'Unit 5 — Applications: demand & sales forecasting; financial forecasting & budgeting; strategic planning; risk & uncertainty management; real-world applications',
    ],
    lectures: businessForecastingLectures,
    books: [
      { title: 'Applied Business Statistics', author: 'Ken Black — Wiley' },
      { title: 'Data Science for Business', author: 'Foster Provost & Tom Fawcett — O\'Reilly' },
      { title: 'Statistics for Management', author: 'Levin & Rubin — Pearson' },
    ],
  }),

  /* ─────────── PGDM BA03 ─────────── */
  /* ─────────── PGDM BA03 — Data Science using R ─────────── */
  outline({
    slug: 'data-science-using-r',
    code: 'PGDM BA03',
    name: 'Data Science using R',
    track: 'ANALYTICS',
    credits: 3,
    hours: 30,
    semester: 3,
    tagline: 'From vectors to verdicts — in R.',
    description:
      'R and RStudio from zero: data structures and programming basics, reading data from files and the web, control structures and packages, the full graphics toolkit (histograms, barplots, boxplots, scatter), and statistical analysis — hypothesis tests, ANOVA, and regression family.',
    outcomes: [
      'Apply data science concepts and methods',
      'Use R libraries for effective data analysis',
      'Analyse data from different sources with R packages',
      'Plot charts and graphs in R for understanding',
      'Conduct hypothesis tests to achieve organisational goals',
    ],
    units: [
      'Unit 1 — Data Science & R Overview: applications in business; R ecosystem; data manipulation & exploration; visualisation in R; statistical concepts',
      'Unit 2 — RStudio & R Basics: installation; interface; assigning values; vectors; objects & types; data structures — matrices, arrays, data frames, lists, factors',
      'Unit 3 — Functions of R: reading & writing data (text, Excel, web); control structures (if-else, for, while); looping functions; packages & libraries',
      'Unit 4 — Graphical Representation: plots; histogram; barplot; boxplots; data-frame computations; scatter plots',
      'Unit 5 — Data Analysis: hypothesis testing; comparing means; ANOVA; non-parametric tests; simple & multiple regression; logistic regression',
    ],
    lectures: dataScienceRLectures,
    books: [
      { title: 'Business Analytics Using R — A Practical Approach', author: 'Umesh R. Hodeghatta & Umesh Nayak — Apress' },
      { title: 'Business Analytics for Managers (Use R)', author: 'Wolfgang Jank — Springer' },
      { title: 'R for Everyone: Advanced Analytics & Graphics', author: 'Jared P. Lander — Pearson' },
    ],
  }),

  /* ─────────── PGDM BA04 ─────────── */
  /* ─────────── PGDM BA04 — Data Mining ─────────── */
  outline({
    slug: 'data-mining',
    code: 'PGDM BA04',
    name: 'Data Mining',
    track: 'ANALYTICS',
    credits: 3,
    hours: 30,
    semester: 3,
    tagline: 'Patterns, rules, and segments hiding in the data.',
    description:
      'The knowledge-discovery process: preprocessing and quality assessment, cleaning and classification with decision trees, clustering and association-rule mining, OLAP and visualisation infrastructure, and the application file — CRM, market basket, fraud, risk and web mining.',
    outcomes: [
      'Comprehend the concept of data mining',
      'Apply techniques on realistic datasets with modern frameworks',
      'Use data mining tools to extract information from large datasets',
      'Develop proficiency with mining tools and models',
      'Construct quantitative analysis reports for decisions',
    ],
    units: [
      'Unit 1 — Introduction: overview & applications; stages of the mining process; techniques; knowledge representation; preprocessing; exploration & visualisation; quality assessment',
      'Unit 2 — Cleaning & Classification: missing values, noisy & inconsistent data; integration & transformation; reduction, dimensionality, compression, discretisation; decision trees & rule-based systems',
      'Unit 3 — Clustering & Association Rules: similarity & distance measures; hierarchical, partitional, model-based clustering; association-rule mining; evaluation of both',
      'Unit 4 — Visualization & Aggregation: visualisation & aggregation; historical/legacy data; query facilities; OLAP functions, tools & servers (ROLAP, MOLAP, HOLAP); mining interface; security; backup & recovery; neural networks & classification models',
      'Unit 5 — Applications: CRM; market-basket analysis; fraud detection; risk management; web mining — classifying pages, extracting knowledge from the web',
    ],
    lectures: dataMiningLectures,
    books: [
      { title: 'Data Mining: Concepts and Techniques', author: 'Han, Kamber & Pei — Morgan Kaufmann' },
      { title: 'Data Mining for Business Intelligence (XLMiner)', author: 'Shmueli, Patel & Bruce — Wiley' },
      { title: 'Introduction to Data Mining', author: 'Pang-Ning Tan — Pearson' },
      { title: 'Data Science for Business', author: 'Provost & Fawcett — O\'Reilly' },
    ],
  }),

  /* ─────────── PGDM BA05 ─────────── */
  /* ─────────── PGDM BA05 — Marketing Analytics ─────────── */
  outline({
    slug: 'marketing-analytics',
    code: 'PGDM BA05',
    name: 'Marketing Analytics',
    track: 'ANALYTICS',
    credits: 3,
    hours: 30,
    semester: 3,
    tagline: 'Every rupee of marketing, accounted for.',
    description:
      'Analytics as the engine of marketing strategy: data collection and ethics, descriptive analytics (segmentation, pricing, positioning), predictive customer analytics with CLV and retention, digital analytics across SEO/social/email/Google Analytics, and the frontier — cloud, ROI measurement and credibility challenges.',
    outcomes: [
      'Explain the role of analytics in marketing strategy and decisions',
      'Apply data analysis across customer, product, pricing and segmentation profiles',
      'Define predictive analysis for customer retention problems',
      'Use frameworks in an integrated way for strategic marketing problems',
      'Analyse marketing analytics trends for future challenges',
    ],
    units: [
      'Unit 1 — Introduction: overview; role in decision-making; key concepts & techniques; analytics as enabler of strategy; data collection & management; ethics',
      'Unit 2 — Descriptive Analytics: EDA for insights; market research & survey design; customer profiling & segmentation; product & pricing analysis; competitive analysis & positioning',
      'Unit 3 — Predictive Analytics: predictive modelling; customer analytics & loyalty data; customer lifetime value; prediction methods; loyalty metrics; retention strategies',
      'Unit 4 — Digital Marketing Analytics: web analytics & behaviour tracking; SEO analysis; social & sentiment analytics; email analytics; Google, Facebook/Instagram, YouTube/Twitter analytics; reporting & insights',
      'Unit 5 — Challenges & Trends: marketing & cloud computing; impact; credibility; ROI measurement challenges; the future of marketing analytics',
    ],
    lectures: marketingAnalyticsLectures,
    books: [
      { title: 'Marketing Analytics: A Practical Guide to Real Marketing Science', author: 'Michael Grigsby — Kogan Page' },
      { title: 'Marketing Analytics Roadmap', author: 'Jerry Rackley' },
      { title: 'Marketing Analytics: Data-Driven Techniques with Excel', author: 'Wayne L. Winston — Wiley' },
      { title: 'Digital Marketing Analytics', author: 'Hemann & Burbary — Que Publishing' },
    ],
  }),
  businessAnalyticsExcel,            // PGDM BA06
];

/* ── getters ── */

export const getSubjects = () => SUBJECTS;

export const getSubjectsByTrack = (track: 'CORE' | 'FINANCE' | 'ANALYTICS') =>
  SUBJECTS.filter((s) => s.track === track);

export const getSubject = (slug: string) => SUBJECTS.find((s) => s.slug === slug);

export const getLecture = (subjectSlug: string, lectureSlug: string) => {
  const subject = getSubject(subjectSlug);
  if (!subject) return undefined;
  const lecture = subject.lectures.find((l) => l.slug === lectureSlug);
  return lecture ? { subject, lecture } : undefined;
};

export const getLiveLectureCount = (track?: 'CORE' | 'FINANCE' | 'ANALYTICS') =>
  SUBJECTS.filter((s) => !track || s.track === track).reduce(
    (n, s) => n + s.lectures.filter((l) => l.status === 'live').length,
    0
  );

export const getTotalLectureCount = (track?: 'CORE' | 'FINANCE' | 'ANALYTICS') =>
  SUBJECTS.filter((s) => !track || s.track === track).reduce(
    (n, s) => n + s.lectures.length,
    0
  );

