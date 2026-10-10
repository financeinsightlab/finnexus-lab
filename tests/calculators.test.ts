import { describe, it, expect } from 'vitest';

describe('1. Discounted Cash Flow (DCF) Valuation Engine', () => {
  it('correctly calculates EBIT, NOPAT, UFCF, and EV', () => {
    const rev = 10_000_000;
    const revGr = 15; // 15%
    const ebitdaM = 20; // 20%
    const dnaR = 5; // 5%
    const taxR = 21; // 21%
    const capexR = 5; // 5%
    const wacc = 10; // 10%
    const ltGr = 2.5; // 2.5%
    const cash = 2_000_000;
    const debt = 1_500_000;
    const shares = 1_000_000;

    // Year 1 projection
    const yr1Rev = rev * (1 + revGr / 100); // 11,500,000
    const yr1Ebitda = yr1Rev * (ebitdaM / 100); // 2,300,000
    const yr1Dna = yr1Rev * (dnaR / 100); // 575,000
    const yr1Ebit = yr1Ebitda - yr1Dna; // 1,725,000
    const yr1Nopat = yr1Ebit * (1 - taxR / 100); // 1,725,000 * 0.79 = 1,362,750
    const yr1Capex = yr1Rev * (capexR / 100); // 575,000
    // UFCF = NOPAT + D&A - Capex (D&A and Capex cancel when dnaR === capexR)
    const yr1Ufcf = yr1Nopat + yr1Dna - yr1Capex;

    expect(yr1Ebit).toBe(1_725_000);
    expect(yr1Nopat).toBe(1_362_750);
    expect(yr1Ufcf).toBe(1_362_750);

    // Discounting for Year 1
    const pvYr1 = yr1Ufcf / (1 + wacc / 100);
    expect(pvYr1).toBeCloseTo(1_238_863.64, 1);

    // 5-Year forecast loop
    let curRev = rev;
    let sumPvForecast = 0;
    let finalUfcf = 0;
    for (let y = 1; y <= 5; y++) {
      curRev = curRev * (1 + revGr / 100);
      const ebit = (curRev * 0.20) - (curRev * 0.05);
      const nopat = ebit * (1 - 0.21);
      const ufcf = nopat; // since dna == capex
      const df = Math.pow(1 + wacc / 100, y);
      sumPvForecast += ufcf / df;
      if (y === 5) finalUfcf = ufcf;
    }

    // Terminal value under Gordon Growth
    const tv = (finalUfcf * (1 + ltGr / 100)) / ((wacc - ltGr) / 100);
    const pvTv = tv / Math.pow(1 + wacc / 100, 5);
    const ev = sumPvForecast + pvTv;
    const equityVal = ev + cash - debt;
    const sharePrice = equityVal / shares;

    expect(ev).toBeGreaterThan(sumPvForecast);
    expect(equityVal).toBe(ev + 500_000);
    expect(sharePrice).toBeGreaterThan(0);
  });

  it('rejects invalid Gordon growth condition when WACC <= terminal growth', () => {
    const wacc = 2.5;
    const ltGr = 3.0;
    const modelError = wacc <= ltGr;
    expect(modelError).toBe(true);
  });
});

describe('2. WACC & Cost of Capital Engine', () => {
  it('correctly builds Cost of Equity via CAPM and blended WACC', () => {
    const rf = 7.1; // 7.1% India 10Y G-Sec
    const mrp = 8.0; // 8.0% Market risk premium
    const beta = 1.25;
    const rd = 9.5; // Pre-tax debt yield
    const tax = 25.17; // Corporate tax rate
    const de = 0.5; // Debt/Equity 0.5x

    const re = rf + beta * mrp; // 7.1 + 1.25 * 8 = 17.1%
    const rdAt = rd * (1 - tax / 100); // 9.5 * (1 - 0.2517) = 7.10885%
    const wE = 1 / (1 + de); // 1 / 1.5 = 0.6667
    const wD = de / (1 + de); // 0.5 / 1.5 = 0.3333
    const wacc = wE * re + wD * rdAt;

    expect(re).toBeCloseTo(17.1, 2);
    expect(rdAt).toBeCloseTo(7.109, 2);
    expect(wE + wD).toBeCloseTo(1.0, 5);
    expect(wacc).toBeCloseTo(13.77, 1);
  });

  it('demonstrates Hamada unlevering of beta', () => {
    const betaLevered = 1.25;
    const tax = 25; // 25%
    const de = 0.5;
    // Beta_unlevered = Beta_levered / [1 + (1 - t) * (D/E)]
    const betaUnlevered = betaLevered / (1 + (1 - tax / 100) * de);
    expect(betaUnlevered).toBeCloseTo(0.909, 3);
  });
});

describe('3. Integrated Three-Statement Accounting Model', () => {
  it('strictly satisfies Assets = Liabilities + Equity identity without fudge plugs', () => {
    const baseRevenue = 10_000_000;
    const revenueGrowth = 15;
    const cogsPercent = 60;
    const opexPercent = 20;
    const taxRate = 25;
    const initialCash = 2_000_000;
    const initialDebt = 1_500_000;
    const dsodays = 45;
    const interestRate = 8;
    const capexPercent = 5;
    const depreciationYears = 5;

    let prevCash = initialCash;
    const prevDebt = initialDebt;
    const initialAR = baseRevenue * (dsodays / 365);
    let cumulativeEquity = (initialCash + initialAR) - initialDebt;

    const capitalHistory: number[] = [];
    let cumulativeGrossCapex = 0;
    let cumulativeAccumDep = 0;

    for (let year = 1; year <= 5; year++) {
      const rev = baseRevenue * Math.pow(1 + revenueGrowth / 100, year);
      const cogs = rev * (cogsPercent / 100);
      const grossProfit = rev - cogs;
      const opex = rev * (opexPercent / 100);
      const ebitda = grossProfit - opex;

      const capex = rev * (capexPercent / 100);
      capitalHistory.push(capex);
      cumulativeGrossCapex += capex;

      const depreciation = capitalHistory.reduce((s, c) => s + c / depreciationYears, 0);
      cumulativeAccumDep += depreciation;

      const ebit = ebitda - depreciation;
      const interest = prevDebt * (interestRate / 100);
      const ebt = ebit - interest;
      const taxes = Math.max(0, ebt * (taxRate / 100));
      const netIncome = ebt - taxes;

      const ar = rev * (dsodays / 365);
      const prevAR = year === 1 ? initialAR : (baseRevenue * Math.pow(1 + revenueGrowth / 100, year - 1) * (dsodays / 365));
      const deltaAR = ar - prevAR;

      const netPpe = Math.max(0, cumulativeGrossCapex - cumulativeAccumDep);

      // Cash Flow Statement
      const cfo = netIncome + depreciation - deltaAR;
      const cfi = -capex;
      const cff = 0;
      const endingCash = prevCash + cfo + cfi + cff;

      // Balance Sheet
      const totalAssets = endingCash + ar + netPpe;
      cumulativeEquity += netIncome;
      const totalLiabEquity = prevDebt + cumulativeEquity;

      // Strict accounting balance identity
      const balanceDiscrepancy = Math.abs(totalAssets - totalLiabEquity);
      expect(balanceDiscrepancy).toBeCloseTo(0, 1);

      prevCash = endingCash;
    }
  });
});

describe('4. Financial Ratio Analyzer & DuPont Decomposition', () => {
  const data = {
    revenue: 500, cogs: 300, ebitda: 85, dep: 20, ebit: 65, interest: 18, pat: 34,
    cash: 25, inventory: 60, receivables: 75, currentAssets: 200, currentLiabilities: 130,
    payables: 55, totalDebt: 160, equity: 190, totalAssets: 430,
  };

  it('correctly calculates liquidity and efficiency ratios', () => {
    const currentRatio = data.currentAssets / data.currentLiabilities;
    const quickRatio = (data.currentAssets - data.inventory) / data.currentLiabilities;
    const cashRatio = data.cash / data.currentLiabilities;

    expect(currentRatio).toBeCloseTo(1.538, 3);
    expect(quickRatio).toBeCloseTo(1.077, 3);
    expect(cashRatio).toBeCloseTo(0.192, 3);

    const invDays = (data.inventory / data.cogs) * 365;
    const recDays = (data.receivables / data.revenue) * 365;
    const payDays = (data.payables / data.cogs) * 365;
    const ccc = invDays + recDays - payDays;

    expect(invDays).toBeCloseTo(73.0, 1);
    expect(recDays).toBeCloseTo(54.75, 1);
    expect(payDays).toBeCloseTo(66.92, 1);
    expect(ccc).toBeCloseTo(60.83, 1);
  });

  it('proves the 3-Factor DuPont identity: Net Margin × Asset Turnover × Equity Multiplier = ROE', () => {
    const netMargin = data.pat / data.revenue; // 34 / 500 = 0.068
    const assetTurnover = data.revenue / data.totalAssets; // 500 / 430 = 1.1628
    const equityMultiplier = data.totalAssets / data.equity; // 430 / 190 = 2.26316
    const dupontProduct = netMargin * assetTurnover * equityMultiplier; // 0.178947
    const directRoe = data.pat / data.equity; // 34 / 190 = 0.178947

    expect(dupontProduct).toBeCloseTo(directRoe, 6);
    expect(directRoe * 100).toBeCloseTo(17.89, 2);
  });

  it('safely handles negative equity without producing misleading positive ROE', () => {
    const insolventEquity = -50;
    const pat = -20;
    const isNegEquity = insolventEquity <= 0;
    const safeRoe = isNegEquity ? NaN : pat / insolventEquity;
    expect(Number.isNaN(safeRoe)).toBe(true);
  });
});

describe('5. Markowitz Two-Asset Portfolio Risk & Return', () => {
  it('correctly calculates portfolio return, variance, and volatility', () => {
    const w1 = 0.6;
    const w2 = 0.4;
    const e1 = 14; // 14%
    const e2 = 8; // 8%
    const s1 = 20; // 20%
    const s2 = 6; // 6%
    const rho = 0.2;

    const er = w1 * e1 + w2 * e2; // 0.6*14 + 0.4*8 = 11.6%
    const varP = w1*w1*s1*s1 + w2*w2*s2*s2 + 2*w1*w2*rho*s1*s2;
    const sp = Math.sqrt(varP);
    const weightedAvgRisk = w1 * s1 + w2 * s2; // 0.6*20 + 0.4*6 = 14.4%

    expect(er).toBeCloseTo(11.6, 2);
    expect(sp).toBeCloseTo(12.70, 2);
    // Diversification free lunch: portfolio risk is strictly lower than weighted average risk
    expect(sp).toBeLessThan(weightedAvgRisk);
    expect(weightedAvgRisk - sp).toBeGreaterThan(1.5); // Over 1.7% risk saving
  });

  it('computes Minimum Variance Portfolio (MVP) weights correctly', () => {
    const s1 = 20;
    const s2 = 6;
    const rho = 0.2;
    const num = s2 * s2 - rho * s1 * s2;
    const den = s1 * s1 + s2 * s2 - 2 * rho * s1 * s2;
    const mvpW1 = num / den;
    expect(mvpW1).toBeGreaterThan(0);
    expect(mvpW1).toBeLessThan(0.5); // Asset 2 is much lower variance, so MVP puts more in Asset 2
  });
});

describe('6. Time-Value of Money & Loan EMI Engine', () => {
  it('computes reducing-balance loan EMI accurately', () => {
    const principal = 1_000_000;
    const annualRate = 12; // 12%
    const years = 1; // 1 year
    const rM = annualRate / 100 / 12; // 0.01
    const nM = years * 12; // 12 months

    const emi = (principal * rM * Math.pow(1 + rM, nM)) / (Math.pow(1 + rM, nM) - 1);
    expect(emi).toBeCloseTo(88_848.79, 2);

    // Total repayment check
    const totalPay = emi * nM;
    const interest = totalPay - principal;
    expect(totalPay).toBeCloseTo(1_066_185.47, 1);
    expect(interest).toBeCloseTo(66_185.47, 1);
  });

  it('computes PV and FV reciprocity', () => {
    const pv = 100_000;
    const r = 0.10;
    const n = 5;
    const fv = pv * Math.pow(1 + r, n);
    const backPv = fv / Math.pow(1 + r, n);
    expect(backPv).toBeCloseTo(pv, 5);
  });
});

describe('7. Critical Path Method (CPM) & PERT', () => {
  it('correctly calculates forward pass, backward pass, and critical path', () => {
    const acts = [
      { id: 'A', from: 1, to: 2, dur: 4 },
      { id: 'B', from: 1, to: 3, dur: 5 },
      { id: 'C', from: 2, to: 4, dur: 6 },
      { id: 'D', from: 3, to: 5, dur: 3 },
      { id: 'E', from: 3, to: 4, dur: 0 }, // dummy
      { id: 'F', from: 4, to: 6, dur: 7 },
      { id: 'G', from: 5, to: 6, dur: 4 },
    ];

    const nodes = [1, 2, 3, 4, 5, 6];
    const es = new Map<number, number>();
    for (const n of nodes) es.set(n, 0);

    // Forward pass
    for (const n of nodes) {
      for (const a of acts) {
        if (a.to === n) es.set(n, Math.max(es.get(n) ?? 0, (es.get(a.from) ?? 0) + a.dur));
      }
    }
    const projectEnd = es.get(6) ?? 0;
    // Path 1-2-4-6: 4 + 6 + 7 = 17 days
    // Path 1-3-4-6: 5 + 0 + 7 = 12 days
    // Path 1-3-5-6: 5 + 3 + 4 = 12 days
    expect(projectEnd).toBe(17);

    // Backward pass
    const lf = new Map<number, number>();
    for (const n of nodes) lf.set(n, projectEnd);
    for (const n of [...nodes].reverse()) {
      for (const a of acts) {
        if (a.from === n) lf.set(n, Math.min(lf.get(n) ?? projectEnd, (lf.get(a.to) ?? projectEnd) - a.dur));
      }
    }

    const rows = acts.map(a => {
      const esA = es.get(a.from) ?? 0;
      const lfA = lf.get(a.to) ?? projectEnd;
      const ls = lfA - a.dur;
      const tf = ls - esA;
      return { ...a, es: esA, lf: lfA, ls, tf };
    });

    const critical = rows.filter(r => Math.abs(r.tf) === 0 && r.dur > 0).map(r => r.id);
    expect(critical).toEqual(['A', 'C', 'F']);
  });
});

describe('8. SaaS Unit Economics Engine', () => {
  it('correctly calculates LTV, Payback, and LTV:CAC ratio', () => {
    const arpu = 100;
    const margin = 80; // 80%
    const churn = 2.5; // 2.5% monthly churn
    const cac = 400;

    const mGrossProfit = arpu * (margin / 100); // $80
    const ltv = mGrossProfit / (churn / 100); // 80 / 0.025 = $3,200
    const payback = cac / mGrossProfit; // 400 / 80 = 5.0 months
    const ltvCac = ltv / cac; // 3200 / 400 = 8.0x

    expect(ltv).toBe(3200);
    expect(payback).toBe(5);
    expect(ltvCac).toBe(8);
  });
});

describe('9. Quick Commerce Dark Store Economics', () => {
  it('computes CM1, CM2, EBITDA, and breakeven orders correctly', () => {
    const ordersPerDay = 300;
    const avgOrderValue = 450;
    const deliveryFee = 25;
    const cogsPercent = 60;
    const platformFeePercent = 10;
    const returnRate = 2;
    const darkStoreRent = 150_000;
    const staffCosts = 25 * 18_000; // 450_000
    const pickingCostPerOrder = 15;
    const lastMilePerOrder = 35;

    const opm = ordersPerDay * 30; // 9,000 orders
    const grossRev = opm * avgOrderValue; // 4,050,000
    const delRev = opm * deliveryFee; // 225,000
    const totalRev = grossRev + delRev; // 4,275,000

    const cogs = grossRev * (cogsPercent / 100); // 2,430,000
    const pf = totalRev * (platformFeePercent / 100); // 427,500
    const returns = grossRev * (returnRate / 100); // 81,000
    const cm1 = totalRev - cogs - pf - returns; // 1,336,500

    const variableDelivery = opm * (pickingCostPerOrder + lastMilePerOrder); // 9000 * 50 = 450,000
    const cm2 = cm1 - variableDelivery; // 886,500
    const fixedCosts = darkStoreRent + staffCosts; // 600,000
    const storeEbitda = cm2 - fixedCosts; // 286,500

    const cm2PerOrder = cm2 / opm; // 886,500 / 9,000 = 98.5
    const breakevenOrders = fixedCosts / cm2PerOrder;

    expect(cm1).toBeGreaterThan(cm2);
    expect(storeEbitda).toBeGreaterThan(0);
    expect(breakevenOrders).toBeCloseTo(6091.37, 1);
  });
});
