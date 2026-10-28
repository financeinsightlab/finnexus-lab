// lib/startup-financials-engine.ts
// India Startup Financial Intelligence Suite — 3-Statement Model, Runway Engine & VC Pitch Grader.

export type StartupArchetype =
  | 'B2B_SAAS'
  | 'D2C_ECOMMERCE'
  | 'MARKETPLACE'
  | 'FINTECH_LENDING'
  | 'QUICK_COMMERCE'
  | 'HEALTHTECH';

export type StartupStage = 'PRE_SEED' | 'SEED' | 'PRE_SERIES_A' | 'SERIES_A';

export interface StartupInputs {
  companyName: string;
  archetype: StartupArchetype;
  stage: StartupStage;
  currency: 'INR' | 'USD';
  currentMonthlyRevenue: number;     // ₹ Lakhs
  monthlyGrowthRate: number;         // % (e.g., 10%)
  grossMarginPct: number;            // % (e.g., 75%)
  customerAcquisitionCost: number;   // ₹ in thousands
  averageOrderValue: number;         // ₹ or ACV
  monthlyChurnPct: number;           // %
  currentCashInBank: number;         // ₹ Lakhs
  currentMonthlyBurn: number;        // ₹ Lakhs
  currentHeadcount: number;
  targetFundraiseAmount: number;     // ₹ Lakhs
  targetValuation: number;           // ₹ Lakhs pre-money
  esopPoolPct: number;               // % (default 10%)
}

export interface MonthlyProjection {
  month: number;
  label: string;
  revenue: number;           // ₹ Lakhs
  cogs: number;              // ₹ Lakhs
  grossProfit: number;       // ₹ Lakhs
  marketingExpense: number;  // ₹ Lakhs
  payrollExpense: number;    // ₹ Lakhs
  otherOpex: number;         // ₹ Lakhs
  totalExpenses: number;     // ₹ Lakhs
  ebitda: number;            // ₹ Lakhs
  gstCollected: number;      // ₹ Lakhs (18%)
  gstPaid: number;           // ₹ Lakhs (18% input credit on eligible opex)
  netCashFlow: number;       // ₹ Lakhs
  endingCash: number;        // ₹ Lakhs
  headcount: number;
}

export interface UnitEconomics {
  ltv: number;               // Lifetime value (₹)
  cac: number;               // Customer acquisition cost (₹)
  ltvCacRatio: number;       // e.g. 3.5x
  cacPaybackMonths: number;  // e.g. 11 months
  magicNumber: number;       // Sales efficiency
  grossMargin: number;       // %
  contributionMargin: number;// %
  monthlyBurnRate: number;   // Current ₹ Lakhs
  netBurnMultiple: number;   // Net burn / net new ARR
}

export interface RunwayAnalysis {
  runwayMonths: number;
  cashZeroDate: string;
  status: 'CRITICAL' | 'WARNING' | 'HEALTHY' | 'STRONG';
  burnMultiple: number;
  monthsToBreakeven: number | null;
}

export interface VCPitchVerdict {
  score: number;             // 0–100
  rating: 'TOP_TIER_READY' | 'FUNDABLE' | 'NEEDS_WORK' | 'UNFUNDABLE';
  summary: string;
  redFlags: string[];
  investorQuestions: string[];
  keyStrengths: string[];
  impliedValuationRange: { min: number; max: number }; // ₹ Lakhs
}

export interface StartupModelResult {
  inputs: StartupInputs;
  monthlyProjections: MonthlyProjection[];
  annualSummary: Array<{
    year: string;
    revenue: number;
    grossProfit: number;
    ebitda: number;
    endingCash: number;
    headcount: number;
  }>;
  unitEconomics: UnitEconomics;
  runway: RunwayAnalysis;
  vcVerdict: VCPitchVerdict;
  generatedAt: string;
}

// ─── Preset Benchmarks for Indian Startup Archetypes ─────────────────────────

export const ARCHETYPE_CONFIG: Record<
  StartupArchetype,
  {
    name: string;
    description: string;
    icon: string;
    defaultInputs: Partial<StartupInputs>;
    targetMultiples: { min: number; max: number; metric: 'ARR' | 'GMV' | 'REVENUE' };
    benchmarks: {
      grossMargin: string;
      cacPayback: string;
      typicalChurn: string;
      ltvCac: string;
    };
  }
> = {
  B2B_SAAS: {
    name: 'B2B SaaS / Enterprise',
    description: 'High gross margins, recurring annual contracts, negative working capital cycle.',
    icon: '💻',
    defaultInputs: {
      currentMonthlyRevenue: 15,     // ₹15L MRR (~$200k ARR)
      monthlyGrowthRate: 8,          // 8% MoM
      grossMarginPct: 80,            // 80%
      customerAcquisitionCost: 45000,// ₹45k CAC
      averageOrderValue: 120000,     // ₹1.2L ACV
      monthlyChurnPct: 1.5,          // 1.5%
      currentCashInBank: 150,        // ₹1.5 Cr
      currentMonthlyBurn: 18,        // ₹18L
      currentHeadcount: 14,
      targetFundraiseAmount: 800,    // ₹8 Cr (~$1M Seed)
      targetValuation: 3500,         // ₹35 Cr pre-money (~$4.2M)
      esopPoolPct: 10,
    },
    targetMultiples: { min: 8, max: 14, metric: 'ARR' },
    benchmarks: {
      grossMargin: '75–85%',
      cacPayback: '< 12 Months',
      typicalChurn: '< 1.5% Monthly',
      ltvCac: '> 3.5x',
    },
  },
  D2C_ECOMMERCE: {
    name: 'D2C & Consumer Brands',
    description: 'Direct-to-consumer physical brands with inventory, courier, and marketing loops.',
    icon: '🛍️',
    defaultInputs: {
      currentMonthlyRevenue: 35,     // ₹35L GMV
      monthlyGrowthRate: 12,
      grossMarginPct: 62,            // 62%
      customerAcquisitionCost: 650,  // ₹650 CAC
      averageOrderValue: 1450,       // ₹1,450 AOV
      monthlyChurnPct: 15,           // Repeat rate proxy
      currentCashInBank: 90,
      currentMonthlyBurn: 14,
      currentHeadcount: 10,
      targetFundraiseAmount: 500,    // ₹5 Cr
      targetValuation: 2000,         // ₹20 Cr
      esopPoolPct: 8,
    },
    targetMultiples: { min: 2, max: 4, metric: 'REVENUE' },
    benchmarks: {
      grossMargin: '55–68%',
      cacPayback: '< 4 Months',
      typicalChurn: '30%+ Repeat Orders',
      ltvCac: '> 2.5x',
    },
  },
  MARKETPLACE: {
    name: 'Multi-Sided Marketplace',
    description: 'Connecting buyers and sellers; monetization through take-rate commission.',
    icon: '🔄',
    defaultInputs: {
      currentMonthlyRevenue: 25,     // ₹25L Net Take Rate (~₹1.8 Cr GMV)
      monthlyGrowthRate: 14,
      grossMarginPct: 70,
      customerAcquisitionCost: 850,
      averageOrderValue: 2800,
      monthlyChurnPct: 8,
      currentCashInBank: 120,
      currentMonthlyBurn: 20,
      currentHeadcount: 16,
      targetFundraiseAmount: 1000,   // ₹10 Cr
      targetValuation: 4500,         // ₹45 Cr
      esopPoolPct: 10,
    },
    targetMultiples: { min: 4, max: 8, metric: 'REVENUE' },
    benchmarks: {
      grossMargin: '65–75%',
      cacPayback: '< 6 Months',
      typicalChurn: '< 5% Monthly',
      ltvCac: '> 3.0x',
    },
  },
  FINTECH_LENDING: {
    name: 'Fintech / NBFC & Pay',
    description: 'Credit dispersion, payments, or wealth infrastructure governed by RBI guidelines.',
    icon: '💳',
    defaultInputs: {
      currentMonthlyRevenue: 40,     // Net interest income / fees
      monthlyGrowthRate: 10,
      grossMarginPct: 58,
      customerAcquisitionCost: 1200,
      averageOrderValue: 25000,
      monthlyChurnPct: 4,
      currentCashInBank: 300,        // ₹3 Cr
      currentMonthlyBurn: 35,
      currentHeadcount: 22,
      targetFundraiseAmount: 2000,   // ₹20 Cr
      targetValuation: 8000,
      esopPoolPct: 12,
    },
    targetMultiples: { min: 5, max: 10, metric: 'REVENUE' },
    benchmarks: {
      grossMargin: '50–65%',
      cacPayback: '< 9 Months',
      typicalChurn: '< 3% Monthly',
      ltvCac: '> 3.5x',
    },
  },
  QUICK_COMMERCE: {
    name: 'Q-Commerce / Hyperlocal',
    description: '10–30 min delivery networks, dark store unit economics, delivery fleet management.',
    icon: '⚡',
    defaultInputs: {
      currentMonthlyRevenue: 60,     // Net GMV commission
      monthlyGrowthRate: 18,
      grossMarginPct: 28,            // Thin retail gross margin
      customerAcquisitionCost: 400,
      averageOrderValue: 480,
      monthlyChurnPct: 20,
      currentCashInBank: 250,
      currentMonthlyBurn: 50,
      currentHeadcount: 35,
      targetFundraiseAmount: 3000,   // ₹30 Cr
      targetValuation: 12000,
      esopPoolPct: 10,
    },
    targetMultiples: { min: 1.5, max: 3, metric: 'GMV' },
    benchmarks: {
      grossMargin: '22–32%',
      cacPayback: '< 3 Months',
      typicalChurn: '50%+ Repeat Orders',
      ltvCac: '> 2.0x',
    },
  },
  HEALTHTECH: {
    name: 'HealthTech & Bio-SaaS',
    description: 'Doctor SaaS, diagnostics, telemedicine, or pharmacy distribution.',
    icon: '🩺',
    defaultInputs: {
      currentMonthlyRevenue: 18,
      monthlyGrowthRate: 9,
      grossMarginPct: 72,
      customerAcquisitionCost: 18000,
      averageOrderValue: 65000,
      monthlyChurnPct: 2.0,
      currentCashInBank: 140,
      currentMonthlyBurn: 16,
      currentHeadcount: 12,
      targetFundraiseAmount: 700,
      targetValuation: 3000,
      esopPoolPct: 10,
    },
    targetMultiples: { min: 6, max: 12, metric: 'ARR' },
    benchmarks: {
      grossMargin: '65–78%',
      cacPayback: '< 10 Months',
      typicalChurn: '< 2.0% Monthly',
      ltvCac: '> 4.0x',
    },
  },
};

// ─── Projections & Modeling Engine ───────────────────────────────────────────

export function calculateStartupModel(inputs: StartupInputs): StartupModelResult {
  const months: MonthlyProjection[] = [];
  let currentCash = inputs.currentCashInBank;
  let currentRev = inputs.currentMonthlyRevenue;
  let currentHeadcount = inputs.currentHeadcount;

  const monthNames = [
    'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6',
    'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12',
    'Month 13', 'Month 14', 'Month 15', 'Month 16', 'Month 17', 'Month 18',
    'Month 19', 'Month 20', 'Month 21', 'Month 22', 'Month 23', 'Month 24',
    'Month 25', 'Month 26', 'Month 27', 'Month 28', 'Month 29', 'Month 30',
    'Month 31', 'Month 32', 'Month 33', 'Month 34', 'Month 35', 'Month 36',
  ];

  for (let m = 0; m < 36; m++) {
    // Apply monthly growth rate with slight deceleration curve over 3 years
    const growthDecay = Math.max(0.4, 1 - (m / 72));
    const effectiveGrowth = (inputs.monthlyGrowthRate * growthDecay) / 100;
    if (m > 0) {
      currentRev = currentRev * (1 + effectiveGrowth);
    }

    const cogs = currentRev * (1 - inputs.grossMarginPct / 100);
    const grossProfit = currentRev - cogs;

    // Headcount grows every 6 months if company is expanding
    if (m > 0 && m % 4 === 0) {
      currentHeadcount = Math.round(currentHeadcount * 1.15);
    }

    // Average Indian tech startup CTC: ~₹1.2L per employee per month (all-in)
    const payrollExpense = (currentHeadcount * 1.25);
    const marketingExpense = Math.max(inputs.currentMonthlyBurn * 0.35, currentRev * 0.25);
    const otherOpex = (currentRev * 0.08) + 2.5; // AWS/cloud, office, legal/accounting
    const totalExpenses = cogs + payrollExpense + marketingExpense + otherOpex;

    const ebitda = grossProfit - (payrollExpense + marketingExpense + otherOpex);

    // Indian GST calculation (18% output GST collected, eligible input tax credit on SaaS & servers)
    const gstCollected = currentRev * 0.18;
    const gstPaid = (marketingExpense + otherOpex) * 0.18;
    const netGstRemitted = Math.max(0, gstCollected - gstPaid);

    const netCashFlow = ebitda - netGstRemitted;
    currentCash = currentCash + netCashFlow;

    months.push({
      month: m + 1,
      label: monthNames[m],
      revenue: Math.round(currentRev * 10) / 10,
      cogs: Math.round(cogs * 10) / 10,
      grossProfit: Math.round(grossProfit * 10) / 10,
      payrollExpense: Math.round(payrollExpense * 10) / 10,
      marketingExpense: Math.round(marketingExpense * 10) / 10,
      otherOpex: Math.round(otherOpex * 10) / 10,
      totalExpenses: Math.round(totalExpenses * 10) / 10,
      ebitda: Math.round(ebitda * 10) / 10,
      gstCollected: Math.round(gstCollected * 10) / 10,
      gstPaid: Math.round(gstPaid * 10) / 10,
      netCashFlow: Math.round(netCashFlow * 10) / 10,
      endingCash: Math.round(currentCash * 10) / 10,
      headcount: currentHeadcount,
    });
  }

  // Calculate Runway
  const runwayMonths = calculateRunwayMonths(inputs.currentCashInBank, inputs.currentMonthlyBurn);
  const cashZeroDate = calculateCashZeroDate(runwayMonths);
  const runwayStatus: RunwayAnalysis['status'] =
    runwayMonths < 6 ? 'CRITICAL' : runwayMonths < 12 ? 'WARNING' : runwayMonths < 18 ? 'HEALTHY' : 'STRONG';

  // Unit Economics
  const safeChurn = Math.max(0.5, inputs.monthlyChurnPct) / 100;
  const ltv = Math.round((inputs.averageOrderValue * (inputs.grossMarginPct / 100)) / safeChurn);
  const cac = inputs.customerAcquisitionCost;
  const ltvCacRatio = cac > 0 ? Math.round((ltv / cac) * 10) / 10 : 0;
  const monthlyGrossProfitPerUser = (inputs.averageOrderValue * (inputs.grossMarginPct / 100));
  const cacPaybackMonths =
    monthlyGrossProfitPerUser > 0 ? Math.round((cac / monthlyGrossProfitPerUser) * 10) / 10 : 99;

  const unitEconomics: UnitEconomics = {
    ltv,
    cac,
    ltvCacRatio,
    cacPaybackMonths,
    magicNumber: Math.round((inputs.monthlyGrowthRate / 10) * (inputs.grossMarginPct / 100) * 10) / 10,
    grossMargin: inputs.grossMarginPct,
    contributionMargin: Math.max(15, inputs.grossMarginPct - 25),
    monthlyBurnRate: inputs.currentMonthlyBurn,
    netBurnMultiple: Math.round((inputs.currentMonthlyBurn / Math.max(1, inputs.currentMonthlyRevenue * 0.15)) * 10) / 10,
  };

  const runway: RunwayAnalysis = {
    runwayMonths,
    cashZeroDate,
    status: runwayStatus,
    burnMultiple: unitEconomics.netBurnMultiple,
    monthsToBreakeven: findBreakevenMonth(months),
  };

  // Annual Summary
  const y1 = months.slice(0, 12);
  const y2 = months.slice(12, 24);
  const y3 = months.slice(24, 36);

  const annualSummary = [
    {
      year: 'Year 1 (Next 12M)',
      revenue: Math.round(y1.reduce((acc, m) => acc + m.revenue, 0)),
      grossProfit: Math.round(y1.reduce((acc, m) => acc + m.grossProfit, 0)),
      ebitda: Math.round(y1.reduce((acc, m) => acc + m.ebitda, 0)),
      endingCash: y1[11].endingCash,
      headcount: y1[11].headcount,
    },
    {
      year: 'Year 2',
      revenue: Math.round(y2.reduce((acc, m) => acc + m.revenue, 0)),
      grossProfit: Math.round(y2.reduce((acc, m) => acc + m.grossProfit, 0)),
      ebitda: Math.round(y2.reduce((acc, m) => acc + m.ebitda, 0)),
      endingCash: y2[11].endingCash,
      headcount: y2[11].headcount,
    },
    {
      year: 'Year 3',
      revenue: Math.round(y3.reduce((acc, m) => acc + m.revenue, 0)),
      grossProfit: Math.round(y3.reduce((acc, m) => acc + m.grossProfit, 0)),
      ebitda: Math.round(y3.reduce((acc, m) => acc + m.ebitda, 0)),
      endingCash: y3[11].endingCash,
      headcount: y3[11].headcount,
    },
  ];

  // VC Verdict & Readiness
  const vcVerdict = generateVCVerdict(inputs, unitEconomics, runway, annualSummary[0].revenue);

  return {
    inputs,
    monthlyProjections: months,
    annualSummary,
    unitEconomics,
    runway,
    vcVerdict,
    generatedAt: new Date().toISOString(),
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calculateRunwayMonths(cash: number, burn: number): number {
  if (burn <= 0) return 36;
  return Math.round((cash / burn) * 10) / 10;
}

function calculateCashZeroDate(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() + Math.floor(months));
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

function findBreakevenMonth(months: MonthlyProjection[]): number | null {
  for (const m of months) {
    if (m.ebitda > 0) return m.month;
  }
  return null;
}

function generateVCVerdict(
  inputs: StartupInputs,
  ue: UnitEconomics,
  runway: RunwayAnalysis,
  arr12M: number
): VCPitchVerdict {
  let score = 70;
  const redFlags: string[] = [];
  const keyStrengths: string[] = [];
  const investorQuestions: string[] = [];

  // Runway checks
  if (runway.runwayMonths < 6) {
    score -= 25;
    redFlags.push(`Critical runway alert: only ${runway.runwayMonths} months of cash left before insolvency.`);
    investorQuestions.push('How will you bridge capital if funding takes 4–6 months to close?');
  } else if (runway.runwayMonths >= 14) {
    score += 10;
    keyStrengths.push(`Healthy runway buffer (${runway.runwayMonths} months) provides strong negotiating leverage.`);
  }

  // LTV : CAC checks
  if (ue.ltvCacRatio < 2.5) {
    score -= 15;
    redFlags.push(`LTV:CAC of ${ue.ltvCacRatio}x is below the institutional benchmark of 3.0x.`);
    investorQuestions.push('What is the strategy to improve organic customer acquisition or increase expansion revenue?');
  } else if (ue.ltvCacRatio >= 4.0) {
    score += 15;
    keyStrengths.push(`Exceptional customer unit economics with an LTV:CAC of ${ue.ltvCacRatio}x.`);
  }

  // CAC Payback checks
  if (ue.cacPaybackMonths > 14) {
    score -= 10;
    redFlags.push(`CAC Payback of ${ue.cacPaybackMonths} months ties up excessive working capital.`);
  } else if (ue.cacPaybackMonths <= 8) {
    score += 10;
    keyStrengths.push(`Lightning fast payback period of ${ue.cacPaybackMonths} months allows capital-efficient reinvestment.`);
  }

  // Margin checks
  if (inputs.grossMarginPct < 50 && inputs.archetype === 'B2B_SAAS') {
    score -= 15;
    redFlags.push('Gross margin below 50% indicates heavy human/service delivery costs, uncharacteristic of pure SaaS.');
  }

  // Standard Indian VC Partner questions
  investorQuestions.push('What are your collection DSO (Days Sales Outstanding) terms with Indian enterprise clients?');
  investorQuestions.push(`How will your current ${inputs.esopPoolPct}% ESOP pool handle upcoming senior executive hiring?`);

  const config = ARCHETYPE_CONFIG[inputs.archetype];
  const impliedMin = Math.round(arr12M * config.targetMultiples.min);
  const impliedMax = Math.round(arr12M * config.targetMultiples.max);

  const boundedScore = Math.min(96, Math.max(25, score));
  const rating: VCPitchVerdict['rating'] =
    boundedScore >= 80 ? 'TOP_TIER_READY' : boundedScore >= 65 ? 'FUNDABLE' : boundedScore >= 45 ? 'NEEDS_WORK' : 'UNFUNDABLE';

  const summary =
    rating === 'TOP_TIER_READY'
      ? 'Institutional VCs (Peak XV, Blume, Accel) will find these metrics highly attractive. The financial model shows solid capital efficiency and disciplined burn.'
      : rating === 'FUNDABLE'
      ? 'The business is viable and fundable, but expect pushback on unit economics or burn multiple during partner meetings. Address the red flags below.'
      : 'VCs are likely to pass in current state. Tighten customer acquisition costs, extend runway past 12 months, and improve gross margin before launching a raise.';

  return {
    score: boundedScore,
    rating,
    summary,
    redFlags,
    keyStrengths,
    investorQuestions,
    impliedValuationRange: { min: impliedMin, max: impliedMax },
  };
}
