export type FinanceTermSlideData = {
  slug: string;
  term: string;
  simpleMeaning: string;
  example: string;
  interviewAnswer: string;
  formula: string | null;
  category: string;
  subCategory?: string | null;
  difficulty: string;
  keywords: string[];
};

export const COMPREHENSIVE_FINANCE_TERMS: FinanceTermSlideData[] = [
  /* ═══════════════════════════════════════════════════════════════
     1. CORPORATE FINANCE & CAPITAL STRUCTURE
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'free-cash-flow',
    term: 'Free Cash Flow (FCF)',
    category: 'Corporate Finance',
    subCategory: 'Cash Flow Analysis',
    difficulty: 'INTERMEDIATE',
    formula: 'FCFF = EBIT × (1 - t) + D&A - CapEx - ΔNWC',
    simpleMeaning:
      'The actual cash surplus a business generates after paying all day-to-day operating costs and necessary capital investments in equipment or facilities.',
    example:
      'If a manufacturing firm brings in ₹120 Cr in operating cash flow and spends ₹40 Cr buying new CNC machines, its Free Cash Flow is ₹80 Cr to pay off debt or distribute as dividends.',
    interviewAnswer:
      'Free Cash Flow is the truest gauge of corporate financial health because it excludes non-cash accounting accruals and accounts for the reinvestment required to protect competitive moats.',
    keywords: ['FCFF', 'FCFE', 'Cash Flow', 'Valuation', 'CapEx', 'Working Capital'],
  },
  {
    slug: 'weighted-average-cost-of-capital',
    term: 'Weighted Average Cost of Capital (WACC)',
    category: 'Corporate Finance',
    subCategory: 'Cost of Capital',
    difficulty: 'ADVANCED',
    formula: 'WACC = (E/V × Re) + (D/V × Rd × (1 - Tc))',
    simpleMeaning:
      'The blended average annual return a company is required to earn across all its funding sources (debt and equity) to satisfy both lenders and shareholders.',
    example:
      'A company funded with 60% equity expecting 14% return and 40% debt costing 9% (with a 25% corporate tax rate) has an after-tax WACC of 11.1%.',
    interviewAnswer:
      'WACC acts as both the hurdle rate for evaluating new capital projects and the discount rate in DCF models to determine enterprise value.',
    keywords: ['Cost of Equity', 'Cost of Debt', 'Tax Shield', 'Hurdle Rate', 'CAPM'],
  },
  {
    slug: 'net-present-value',
    term: 'Net Present Value (NPV)',
    category: 'Corporate Finance',
    subCategory: 'Capital Budgeting',
    difficulty: 'INTERMEDIATE',
    formula: 'NPV = Σ [C_t / (1 + r)^t] - Initial Outlay',
    simpleMeaning:
      'The net financial value created by taking on an investment. A positive NPV indicates that the project earns more than the company’s cost of capital.',
    example:
      'Investing ₹50 Lakhs into automated warehouse sorting that saves ₹18 Lakhs annually for 4 years at a 10% discount rate yields an NPV of +₹7.05 Lakhs.',
    interviewAnswer:
      'NPV is the gold standard of capital budgeting decisions because it directly measures incremental shareholder wealth created without reinvestment rate ambiguity.',
    keywords: ['Capital Budgeting', 'Discounting', 'DCF', 'Time Value of Money', 'IRR'],
  },
  {
    slug: 'internal-rate-of-return',
    term: 'Internal Rate of Return (IRR)',
    category: 'Corporate Finance',
    subCategory: 'Capital Budgeting',
    difficulty: 'INTERMEDIATE',
    formula: '0 = Σ [C_t / (1 + IRR)^t] - C_0',
    simpleMeaning:
      'The annualized compounding rate of return at which an investment’s projected cash inflows exactly equal its initial cash outlay (NPV = 0).',
    example:
      'If an expansion factory requiring ₹10 Cr produces cash flows yielding an IRR of 22% while the company’s WACC is 12%, the project clears the hurdle rate by 10%.',
    interviewAnswer:
      'While IRR is universally loved by executives and PE partners, it assumes interim cash flows are reinvested at the IRR itself, which often overstates real-world returns for high-yield projects compared to MIRR.',
    keywords: ['IRR', 'Hurdle Rate', 'NPV', 'Capital Budgeting', 'Private Equity'],
  },
  {
    slug: 'working-capital-cycle',
    term: 'Cash Conversion Cycle (CCC)',
    category: 'Corporate Finance',
    subCategory: 'Working Capital',
    difficulty: 'INTERMEDIATE',
    formula: 'CCC = DIO (Days Inventory) + DSO (Days Sales) - DPO (Days Payable)',
    simpleMeaning:
      'The number of days it takes for a company to convert its investments in inventory and other operational resources back into hard cash from customers.',
    example:
      'Amazon often operates with a negative Cash Conversion Cycle (-25 days) because it collects payment from shoppers before paying its suppliers.',
    interviewAnswer:
      'A compressing or negative Cash Conversion Cycle indicates immense operational efficiency and supplier bargaining power, providing interest-free supplier financing to fund growth.',
    keywords: ['Working Capital', 'DIO', 'DSO', 'DPO', 'Cash Flow', 'Liquidity'],
  },
  {
    slug: 'dupont-analysis',
    term: 'DuPont Analysis',
    category: 'Corporate Finance',
    subCategory: 'Financial Ratio Analysis',
    difficulty: 'INTERMEDIATE',
    formula: 'ROE = Net Profit Margin × Asset Turnover × Financial Leverage',
    simpleMeaning:
      'A diagnostic framework that breaks down Return on Equity (ROE) into three distinct engines: profitability (margin), asset efficiency (turnover), and leverage.',
    example:
      'Two retail chains both have 18% ROE: Chain A gets it through high 12% margins, while Chain B gets it through lightning 3.5x inventory turns with only 3% margin.',
    interviewAnswer:
      'DuPont analysis prevents misleading conclusions by showing whether a rising ROE is powered by operational excellence, superior asset velocity, or dangerous balance sheet debt.',
    keywords: ['ROE', 'Profit Margin', 'Asset Turnover', 'Financial Leverage', 'Decomposition'],
  },

  /* ═══════════════════════════════════════════════════════════════
     2. VALUATION & FINANCIAL MODELING
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'discounted-cash-flow',
    term: 'Discounted Cash Flow (DCF)',
    category: 'Valuation',
    subCategory: 'Intrinsic Valuation',
    difficulty: 'ADVANCED',
    formula: 'EV = Σ [FCF_t / (1 + WACC)^t] + Terminal Value / (1 + WACC)^n',
    simpleMeaning:
      'A valuation model that estimates the true intrinsic worth of a business by projecting its future cash flows and discounting them back to today’s rupee value.',
    example:
      'Valuing an IT services firm by forecasting 5-year free cash flows and discounting them at 10.5% WACC plus terminal value to establish a fair share price of ₹1,450.',
    interviewAnswer:
      'DCF values a company based on fundamental cash generation rather than market sentiment. Its Achilles heel is sensitivity to terminal value assumptions and the discount rate.',
    keywords: ['Intrinsic Value', 'WACC', 'Terminal Value', 'Gordon Growth', 'Modeling'],
  },
  {
    slug: 'ebitda',
    term: 'EBITDA',
    category: 'Valuation',
    subCategory: 'Operating Performance',
    difficulty: 'BEGINNER',
    formula: 'EBITDA = Operating Profit (EBIT) + Depreciation + Amortization',
    simpleMeaning:
      'Earnings Before Interest, Taxes, Depreciation, and Amortization. It shows core cash earnings from operations before capital structure and accounting choices intervene.',
    example:
      'Comparing two telecom operators where one recently built ₹5,000 Cr in cell towers (high depreciation) and the other leases them (lower reported assets).',
    interviewAnswer:
      'EBITDA enables standardized operational comparisons across firms with different capital structures, but Warren Buffett famously warns: does management think the tooth fairy pays for CapEx?',
    keywords: ['Operating Profit', 'EV/EBITDA', 'Cash Proxy', 'Depreciation', 'Multiples'],
  },
  {
    slug: 'price-to-earnings-ratio',
    term: 'P/E Ratio (Price-to-Earnings)',
    category: 'Valuation',
    subCategory: 'Relative Multiples',
    difficulty: 'BEGINNER',
    formula: 'P/E = Market Price per Share / Earnings per Share (EPS)',
    simpleMeaning:
      'A multiple measuring how many rupees investors are willing to pay today for each rupee of annual earnings the company generates.',
    example:
      'An FMCG stock trading at ₹1,200 with ₹40 EPS has a P/E of 30x. If its peer sector trades at 45x, it may be undervalued or growing slower.',
    interviewAnswer:
      'A high P/E implies expectations of rapid earnings expansion or exceptional moat stability, whereas a low P/E can indicate a bargain or a classic value trap.',
    keywords: ['Relative Valuation', 'EPS', 'Multiples', 'Growth Stocks', 'Value Trap'],
  },
  {
    slug: 'return-on-invested-capital',
    term: 'ROIC (Return on Invested Capital)',
    category: 'Valuation',
    subCategory: 'Capital Efficiency',
    difficulty: 'ADVANCED',
    formula: 'ROIC = NOPAT / (Total Debt + Total Equity - Cash)',
    simpleMeaning:
      'The percentage return a firm achieves on every rupee of debt and equity invested into its operating engine.',
    example:
      'A software company with ₹500 Cr in net operating assets generating ₹125 Cr NOPAT achieves a 25% ROIC. With a 10% cost of capital, its economic value spread is +15%.',
    interviewAnswer:
      'Growth only creates shareholder value when ROIC exceeds WACC. Growing a business whose ROIC is below its cost of capital actually accelerates value destruction.',
    keywords: ['NOPAT', 'Economic Moat', 'WACC Spread', 'Capital Allocation', 'Efficiency'],
  },
  {
    slug: 'enterprise-value',
    term: 'Enterprise Value (EV)',
    category: 'Valuation',
    subCategory: 'Capital Structure',
    difficulty: 'INTERMEDIATE',
    formula: 'EV = Market Cap + Total Debt + Minority Interest + Preferred Shares - Cash',
    simpleMeaning:
      'The total economic takeover price of a company, representing the theoretical cost to buy the entire business and clear all debts.',
    example:
      'A firm with ₹1,000 Cr market capitalization, ₹300 Cr debt, and ₹100 Cr cash in the bank has an Enterprise Value of ₹1,200 Cr.',
    interviewAnswer:
      'Enterprise Value is capital-structure neutral, making EV-based multiples like EV/EBITDA superior to Market Cap multiples when comparing companies with different leverage levels.',
    keywords: ['EV', 'Market Cap', 'Net Debt', 'M&A', 'Takeover Value'],
  },
  {
    slug: 'terminal-value',
    term: 'Terminal Value (TV)',
    category: 'Valuation',
    subCategory: 'DCF Modeling',
    difficulty: 'ADVANCED',
    formula: 'TV = [FCF_n × (1 + g)] / (WACC - g)',
    simpleMeaning:
      'The estimated total value of all future cash flows of a business beyond the explicit forecast period (usually year 5 or 10) into perpetuity.',
    example:
      'If year-5 cash flow is ₹100 Cr, long-term GDP growth rate g is 4%, and WACC is 11%, Terminal Value is (100 × 1.04) / (0.11 - 0.04) = ₹1,485 Cr.',
    interviewAnswer:
      'Terminal Value typically accounts for 65% to 85% of total DCF enterprise value. Therefore, long-term growth assumptions must never exceed the sustainable GDP growth rate of the host economy.',
    keywords: ['Gordon Growth', 'Exit Multiple', 'DCF', 'Perpetuity', 'Sensitivity'],
  },
  {
    slug: 'leveraged-buyout',
    term: 'Leveraged Buyout (LBO)',
    category: 'Valuation',
    subCategory: 'Private Equity',
    difficulty: 'EXPERT',
    formula: 'Target IRR = [(Exit Equity Value / Initial Sponsor Equity)^(1/t)] - 1',
    simpleMeaning:
      'The acquisition of a company using a significant amount of borrowed money (debt) with the target firm’s cash flows used to pay down the debt over time.',
    example:
      'A PE fund acquires a stable ₹1,000 Cr cash-flow firm using ₹700 Cr bank loans and ₹300 Cr equity, using 5 years of cash flows to repay debt, then exiting at 25% IRR.',
    interviewAnswer:
      'Ideal LBO candidates have predictable recurring cash flows, low existing leverage, minimal ongoing CapEx, and strong asset collateral to service the debt load.',
    keywords: ['Private Equity', 'Financial Sponsor', 'Debt Paydown', 'De-leveraging', 'Sponsor Returns'],
  },

  /* ═══════════════════════════════════════════════════════════════
     3. SECURITY ANALYSIS & PORTFOLIO MANAGEMENT
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'capital-asset-pricing-model',
    term: 'CAPM (Capital Asset Pricing Model)',
    category: 'Portfolio Management',
    subCategory: 'Asset Pricing',
    difficulty: 'INTERMEDIATE',
    formula: 'E(Ri) = Rf + βi × [E(Rm) - Rf]',
    simpleMeaning:
      'A foundational formula that calculates the expected return of an asset based on its sensitivity to broad market movements (beta) plus the risk-free rate.',
    example:
      'With a 7% risk-free G-sec yield, a 13% market return, and a stock beta of 1.4, its expected return is 7% + 1.4 × (13% - 7%) = 15.4%.',
    interviewAnswer:
      'CAPM establishes that investors are only compensated for non-diversifiable systematic risk (Beta); idiosyncratic company risk can and should be eliminated through diversification.',
    keywords: ['Beta', 'Risk Free Rate', 'Equity Risk Premium', 'Systematic Risk', 'Cost of Equity'],
  },
  {
    slug: 'beta-coefficient',
    term: 'Beta (β)',
    category: 'Portfolio Management',
    subCategory: 'Market Risk',
    difficulty: 'BEGINNER',
    formula: 'β = Cov(Ri, Rm) / Var(Rm)',
    simpleMeaning:
      'A measure of how violently an individual stock moves in comparison to swings in the broader benchmark index (like Nifty 50 or S&P 500).',
    example:
      'A high-growth fintech stock with Beta 1.6 tends to rise 16% when the index rallies 10%, but plunges 16% when the index drops 10%. A utility stock with Beta 0.5 moves half as much.',
    interviewAnswer:
      'Beta reflects systematic market sensitivity. Unlevering and relevering Beta (Hamada equation) is essential in corporate valuation to isolate pure business risk from financial leverage.',
    keywords: ['Volatility', 'Systematic Risk', 'Unlevered Beta', 'Covariance', 'Benchmarking'],
  },
  {
    slug: 'sharpe-ratio',
    term: 'Sharpe Ratio',
    category: 'Portfolio Management',
    subCategory: 'Performance Measurement',
    difficulty: 'INTERMEDIATE',
    formula: 'Sharpe = (Rp - Rf) / σp',
    simpleMeaning:
      'A ratio measuring excess return generated by an investment or fund manager for each unit of total volatility (standard deviation) endured.',
    example:
      'Fund A generates 16% return with 12% volatility (Sharpe = 0.75). Fund B delivers 14% return with only 6% volatility (Sharpe = 1.17). Fund B is mathematically superior.',
    interviewAnswer:
      'The Sharpe ratio penalizes both downside and upside volatility equally. For skewed return distributions with fat tails, the Sortino ratio is often preferred.',
    keywords: ['Risk Adjusted Return', 'Standard Deviation', 'Fund Ranking', 'Excess Return', 'Sortino'],
  },
  {
    slug: 'jensens-alpha',
    term: "Jensen's Alpha",
    category: 'Portfolio Management',
    subCategory: 'Performance Measurement',
    difficulty: 'ADVANCED',
    formula: 'α = Rp - [Rf + βp × (Rm - Rf)]',
    simpleMeaning:
      'The abnormal rate of return achieved by a portfolio manager beyond what is predicted by the market’s movements and the portfolio’s beta.',
    example:
      'If CAPM predicted a portfolio should return 12% based on its 1.2 beta, but the portfolio actually yielded 15.5%, the manager generated +3.5% pure Alpha.',
    interviewAnswer:
      'Alpha measures active managerial skill and stock-picking edge. In efficient markets, net alpha after active management fees tends to converge to zero over long horizons.',
    keywords: ['Alpha', 'Active Management', 'Outperformance', 'CAPM', 'Hedge Funds'],
  },
  {
    slug: 'value-at-risk',
    term: 'Value at Risk (VaR)',
    category: 'Portfolio Management',
    subCategory: 'Risk Modeling',
    difficulty: 'ADVANCED',
    formula: 'VaR_α = - [μ - Z_α × σ]',
    simpleMeaning:
      'A statistical estimate of the maximum monetary loss a portfolio could suffer over a given time horizon at a specific confidence level (e.g. 95% or 99%).',
    example:
      'A 1-day 99% VaR of ₹50 Lakhs means there is only a 1% chance the portfolio will lose more than ₹50 Lakhs on any given trading day under normal conditions.',
    interviewAnswer:
      'VaR is the regulatory standard for bank trading books, but it tells you nothing about the magnitude of losses beyond the cutoff; Conditional VaR (Expected Shortfall) is required to gauge extreme tail events.',
    keywords: ['VaR', 'Expected Shortfall', 'Risk Management', 'Stress Testing', 'Trading Book'],
  },
  {
    slug: 'macaulay-duration',
    term: 'Duration & Convexity',
    category: 'Portfolio Management',
    subCategory: 'Fixed Income',
    difficulty: 'ADVANCED',
    formula: 'ΔP / P ≈ - Modified Duration × Δy + 0.5 × Convexity × (Δy)^2',
    simpleMeaning:
      'Duration measures the sensitivity of a bond’s market price to interest rate changes. Convexity captures the curve in the price-yield relationship.',
    example:
      'A 10-year bond with Modified Duration of 7.2 years will drop roughly 7.2% in value if interest rates jump by 100 basis points (+1.0%).',
    interviewAnswer:
      'Bond portfolio managers use duration matching to immunize liabilities against interest rate shifts, and prefer high convexity because prices rise faster when yields fall than they drop when yields rise.',
    keywords: ['Bond Pricing', 'Interest Rate Risk', 'Immunization', 'Yield Curve', 'Convexity'],
  },

  /* ═══════════════════════════════════════════════════════════════
     4. FINANCIAL DERIVATIVES & RISK MANAGEMENT
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'black-scholes-model',
    term: 'Black-Scholes Model',
    category: 'Derivatives & Risk',
    subCategory: 'Option Pricing',
    difficulty: 'EXPERT',
    formula: 'C = S × N(d1) - K × e^(-rt) × N(d2)',
    simpleMeaning:
      'The mathematical formula used to calculate the theoretical fair market price of European call and put options based on volatility, time, strike, and rates.',
    example:
      'Calculating the exact fair value of a Nifty 24,000 call option expiring in 30 days given current spot at 24,100, implied volatility at 14%, and interest rate at 6.8%.',
    interviewAnswer:
      'Black-Scholes demonstrated that an option can be replicated through a dynamic self-financing portfolio of the underlying stock and risk-free borrowing, eliminating direction risk via delta hedging.',
    keywords: ['Option Pricing', 'Implied Volatility', 'Delta Hedging', 'Geometric Brownian', 'Greeks'],
  },
  {
    slug: 'option-greeks',
    term: 'The Option Greeks (Delta, Gamma, Vega, Theta)',
    category: 'Derivatives & Risk',
    subCategory: 'Option Sensitivities',
    difficulty: 'ADVANCED',
    formula: 'Δ = ∂V/∂S,  Γ = ∂²V/∂S²,  ν = ∂V/∂σ,  Θ = -∂V/∂t',
    simpleMeaning:
      'Financial risk sensitivities measuring how an option’s price changes in response to stock price shifts (Delta), acceleration (Gamma), volatility (Vega), and time decay (Theta).',
    example:
      'An option with Delta 0.50 gains ₹5 when the stock rises ₹10. Its Theta of -2.50 means it sheds ₹2.50 in value every night due to the relentless passage of time.',
    interviewAnswer:
      'Institutional options trading desks rarely bet on pure market direction; they structure portfolios to trade implied volatility vs realized volatility while maintaining a delta-neutral stance.',
    keywords: ['Delta', 'Gamma', 'Vega', 'Theta', 'Greeks', 'Hedging'],
  },
  {
    slug: 'straddle-options-strategy',
    term: 'Long Straddle',
    category: 'Derivatives & Risk',
    subCategory: 'Volatility Trading',
    difficulty: 'INTERMEDIATE',
    formula: 'Max Profit = Unlimited,  Max Loss = Call Premium + Put Premium',
    simpleMeaning:
      'A strategy of buying both a call option and a put option at the identical strike price and expiry, betting on an explosive price swing in either direction.',
    example:
      'Buying both a 500 Call and 500 Put on an earnings announcement day for a total cost of ₹30. If earnings surprise causes the stock to jump to 570 or plunge to 430, the trade turns huge profits.',
    interviewAnswer:
      'A straddle is a pure long volatility trade. The trader is indifferent to direction but requires realized volatility to exceed the implied volatility priced into the combined premiums.',
    keywords: ['Options Strategy', 'Volatility', 'Earnings Plays', 'Strangle', 'Break-even'],
  },
  {
    slug: 'interest-rate-swap',
    term: 'Interest Rate Swap (IRS)',
    category: 'Derivatives & Risk',
    subCategory: 'Swaps & Hedging',
    difficulty: 'ADVANCED',
    formula: 'Net Cash Flow = Notional × (Floating Rate - Fixed Swap Rate) × (Days / 360)',
    simpleMeaning:
      'A financial contract in which two counterparties exchange interest rate cash flows based on a specified notional principal—most commonly floating rate for fixed rate.',
    example:
      'A real estate developer with ₹200 Cr in floating bank loans swaps with an insurance company to pay a fixed 8.2% and receive floating MIBOR, locking in predictable debt servicing.',
    interviewAnswer:
      'IRS is the largest derivative market in the world, allowing corporations and banks to transform their liability profiles and hedge mismatch between floating assets and fixed liabilities without moving principal.',
    keywords: ['IRS', 'Fixed for Floating', 'SOFR', 'MIBOR', 'ALM', 'Hedging'],
  },
  {
    slug: 'credit-default-swap',
    term: 'Credit Default Swap (CDS)',
    category: 'Derivatives & Risk',
    subCategory: 'Credit Derivatives',
    difficulty: 'ADVANCED',
    formula: 'Payoff upon Default = Notional Principal × (100% - Recovery Rate)',
    simpleMeaning:
      'A financial derivative that acts like an insurance policy against the default or bankruptcy of a corporate borrower or sovereign nation.',
    example:
      'A bank holding ₹100 Cr in corporate bonds pays an annual premium of 180 basis points (₹1.8 Cr) to a hedge fund to protect against debt restructuring or bankruptcy.',
    interviewAnswer:
      'CDS spreads serve as the market’s pure barometer for credit risk and default probability, reacting far faster than credit rating agency downgrades.',
    keywords: ['Credit Risk', 'Default Protection', 'Bond Insurance', 'Counterparty Risk', 'Synthetic CDO'],
  },

  /* ═══════════════════════════════════════════════════════════════
     5. BANKING, INSURANCE & THE FINANCIAL SYSTEM
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'cash-reserve-ratio',
    term: 'Cash Reserve Ratio (CRR)',
    category: 'Banking & BFSI',
    subCategory: 'Monetary Policy',
    difficulty: 'BEGINNER',
    formula: 'CRR = Required Cash Reserve / Net Demand & Time Liabilities (NDTL)',
    simpleMeaning:
      'The minimum percentage of customer deposits that commercial banks are legally mandated to keep as idle cash reserves with the Reserve Bank of India.',
    example:
      'If CRR is 4.5% and a bank has ₹1,00,000 Cr in deposits, it must park ₹4,500 Cr with the RBI without earning any interest, keeping ₹95,500 Cr available for lending and operations.',
    interviewAnswer:
      'CRR is a direct liquidity absorption lever. When the central bank hikes CRR, it immediately drains lendable liquidity from the banking system to curb inflation without changing interest rates.',
    keywords: ['CRR', 'RBI', 'Monetary Policy', 'NDTL', 'Banking Liquidity'],
  },
  {
    slug: 'statutory-liquidity-ratio',
    term: 'Statutory Liquidity Ratio (SLR)',
    category: 'Banking & BFSI',
    subCategory: 'Prudential Regulation',
    difficulty: 'BEGINNER',
    formula: 'SLR = (Government Securities + Gold + Approved Assets) / NDTL',
    simpleMeaning:
      'The minimum proportion of deposits that banks must invest in safe, liquid assets like Central and State Government securities (G-Secs) and gold.',
    example:
      'With an 18% SLR mandate, a bank must ensure at least ₹18 out of every ₹100 in deposits is invested in sovereign bonds, safeguarding depositor solvency.',
    interviewAnswer:
      'While CRR sits in cash with the central bank earning zero return, SLR assets earn coupon yields for the bank while creating a guaranteed captive buyer base for government borrowing programs.',
    keywords: ['SLR', 'G-Sec', 'Treasury', 'RBI Mandate', 'Solvency'],
  },
  {
    slug: 'repo-rate',
    term: 'Repo Rate & Reverse Repo',
    category: 'Banking & BFSI',
    subCategory: 'Monetary Levers',
    difficulty: 'BEGINNER',
    formula: 'Policy Corridor = SDF / Reverse Repo Rate < Repo Rate < MSF Rate',
    simpleMeaning:
      'The key benchmark interest rate at which the central bank lends overnight funds to commercial banks against government securities.',
    example:
      'When inflation runs hot at 6.5%, the RBI raises the Repo Rate from 6.0% to 6.5%, causing home loan, car loan, and corporate borrowing rates to increase across the entire economy.',
    interviewAnswer:
      'The Repo Rate is the primary signaling rate for monetary policy transmission. Hikes ripple through the Marginal Cost of Funds Based Lending Rate (MCLR) to cool demand and anchor inflation expectations.',
    keywords: ['Repo Rate', 'Inflation Targeting', 'Monetary Transmission', 'RBI', 'Policy Rates'],
  },
  {
    slug: 'net-interest-margin',
    term: 'Net Interest Margin (NIM)',
    category: 'Banking & BFSI',
    subCategory: 'Bank Profitability',
    difficulty: 'INTERMEDIATE',
    formula: 'NIM = (Interest Income - Interest Expended) / Average Earning Assets',
    simpleMeaning:
      'The core profitability spread of a bank, showing the net return earned on loans and securities after paying interest to depositors.',
    example:
      'A leading private bank earns 8.5% on advances while paying 4.2% on deposits, resulting in a healthy Net Interest Margin of 4.3% across its earning asset base.',
    interviewAnswer:
      'NIM is the single most watched metric in banking quarterly earnings. Banks with high CASA ratios maintain superior NIMs even during aggressive rate-hiking cycles.',
    keywords: ['NIM', 'Spread', 'Cost of Funds', 'Yield on Advances', 'Banking Metrics'],
  },
  {
    slug: 'casa-ratio',
    term: 'CASA Ratio (Current & Savings Account)',
    category: 'Banking & BFSI',
    subCategory: 'Deposit Franchise',
    difficulty: 'BEGINNER',
    formula: 'CASA Ratio = (Current Deposits + Savings Deposits) / Total Deposits',
    simpleMeaning:
      'The percentage of a bank’s total deposits held in low-cost Current and Savings accounts rather than expensive Fixed Term Deposits.',
    example:
      'HDFC Bank or Kotak maintaining a 42% CASA ratio enjoys significantly lower blended cost of funds compared to a regional bank with only 25% CASA that must rely on expensive 7.5% fixed deposits.',
    interviewAnswer:
      'A high CASA ratio represents a bank’s structural franchise power. Because current accounts pay 0% and savings pay ~3%, it provides an unassailable low-cost funding moat.',
    keywords: ['CASA', 'Cost of Deposits', 'Franchise Moat', 'Banking Solvency', 'Liabilities'],
  },
  {
    slug: 'non-performing-assets',
    term: 'Gross & Net NPA (Non-Performing Assets)',
    category: 'Banking & BFSI',
    subCategory: 'Asset Quality',
    difficulty: 'INTERMEDIATE',
    formula: 'Net NPA = Gross NPA - Provisioning (PCR) - Dues Recovered',
    simpleMeaning:
      'Loans or advances where the borrower has stopped paying interest or principal installments for 90 days or longer, signaling credit distress.',
    example:
      'If a bank has ₹10,000 Cr in gross bad loans against an advance book of ₹2,00,000 Cr, its Gross NPA is 5%. With an 80% Provisioning Coverage Ratio, Net NPA is only 1%.',
    interviewAnswer:
      'Gross NPA reflects cumulative historical underwriting quality, while Net NPA reflects actual residual balance sheet vulnerability after accounting for provisions already expensed through the P&L.',
    keywords: ['NPA', 'PCR', 'Credit Quality', 'Stressed Assets', 'Insolvency'],
  },
  {
    slug: 'capital-adequacy-ratio',
    term: 'Capital Adequacy Ratio (CAR / CRAR)',
    category: 'Banking & BFSI',
    subCategory: 'Basel III Regulation',
    difficulty: 'ADVANCED',
    formula: 'CAR = (Tier 1 Capital + Tier 2 Capital) / Risk-Weighted Assets',
    simpleMeaning:
      'The regulatory cushion of equity and subordinated debt a bank must maintain relative to the riskiness of its loan book to withstand sudden financial shocks.',
    example:
      'Under Basel III and RBI norms requiring a minimum 11.5% CAR, a bank holding ₹100 Cr in Tier-1 equity can support up to ₹870 Cr in risk-weighted loan assets.',
    interviewAnswer:
      'Tier 1 Common Equity (CET-1) is the ultimate loss-absorbing capital because it protects depositors and taxpayers from bailouts during systemic banking panics.',
    keywords: ['Basel III', 'Tier 1 Capital', 'Risk Weighted Assets', 'CET1', 'Bank Solvency'],
  },

  /* ═══════════════════════════════════════════════════════════════
     6. INTERNATIONAL FINANCIAL MANAGEMENT & FOREX
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'purchasing-power-parity',
    term: 'Purchasing Power Parity (PPP)',
    category: 'International Finance',
    subCategory: 'Exchange Rate Determination',
    difficulty: 'INTERMEDIATE',
    formula: 'S_t / S_0 = (1 + Inflation_Domestic) / (1 + Inflation_Foreign)',
    simpleMeaning:
      'An economic theory stating that exchange rates between currencies are in equilibrium when their domestic purchasing powers are identical for an equivalent basket of goods.',
    example:
      'The famous Big Mac Index: if a burger costs $5 in the US and ₹200 in India, the implied PPP exchange rate is ₹40 per USD, suggesting the market rate of ₹83 makes the rupee fundamentally undervalued.',
    interviewAnswer:
      'While PPP rarely holds in the short run due to trade tariffs, transportation costs, and capital flows, it acts as a reliable multi-decade anchor for real effective exchange rate (REER) models.',
    keywords: ['PPP', 'Law of One Price', 'REER', 'Forex Equilibrium', 'Inflation Differential'],
  },
  {
    slug: 'interest-rate-parity',
    term: 'Interest Rate Parity (IRP)',
    category: 'International Finance',
    subCategory: 'Forex Arbitrage',
    difficulty: 'ADVANCED',
    formula: 'Forward Rate / Spot Rate = (1 + r_domestic) / (1 + r_foreign)',
    simpleMeaning:
      'A fundamental condition where the difference in nominal interest rates between two nations is exactly equal to the forward premium or discount on their exchange rate.',
    example:
      'If India’s 1-year rate is 7% and the US rate is 4%, the USD/INR 1-year forward contract must trade at an approximate 3% premium to prevent covered interest arbitrage.',
    interviewAnswer:
      'Covered Interest Rate Parity holds almost continuously due to automated high-frequency arbitrage by FX desks. Any deviation presents instantaneous riskless arbitrage profits.',
    keywords: ['IRP', 'Covered Arbitrage', 'Forward Premium', 'Spot Rate', 'FX Hedging'],
  },
  {
    slug: 'fx-exposure-types',
    term: 'Transaction, Translation & Economic Exposure',
    category: 'International Finance',
    subCategory: 'Corporate FX Risk',
    difficulty: 'ADVANCED',
    formula: 'Total Currency Risk = Transaction Risk + Translation Impact + Economic Vulnerability',
    simpleMeaning:
      'The three dimensions of currency risk: contractual cash flows due in foreign currency (transaction), consolidating overseas balance sheets (translation), and long-term competitiveness against global rivals (economic).',
    example:
      'An Indian exporter faces transaction risk on a $1M invoice due in 90 days, translation risk on its UK subsidiary’s balance sheet, and economic risk if the Chinese Yuan depreciates, making Chinese competitors cheaper.',
    interviewAnswer:
      'While transaction risk can be mechanically hedged using forwards or currency options, economic exposure requires operational hedging such as relocating factories or diversifying supply chain origins.',
    keywords: ['FX Hedging', 'Transaction Risk', 'Translation Risk', 'Economic Exposure', 'MNC Risk'],
  },
  {
    slug: 'letter-of-credit',
    term: 'Letter of Credit (LC)',
    category: 'International Finance',
    subCategory: 'Trade Finance',
    difficulty: 'BEGINNER',
    formula: 'Payment Trigger = Presentation of Complying Shipping & Customs Documents',
    simpleMeaning:
      'A formal letter from a buyer’s bank guaranteeing that payment will be transferred to an overseas exporter upon verified presentation of agreed shipping documents.',
    example:
      'A textile merchant in Mumbai exports ₹50 Lakhs of cotton to Germany backed by an irrevocable LC from Deutsche Bank, guaranteeing payment even if the buyer faces insolvency.',
    interviewAnswer:
      'Letters of Credit replace the commercial counterparty risk of an unknown foreign buyer with the sovereign and institutional creditworthiness of an international bank.',
    keywords: ['Trade Finance', 'LC', 'Bill of Lading', 'Incoterms', 'Exim Banking'],
  },

  /* ═══════════════════════════════════════════════════════════════
     7. BEHAVIOURAL FINANCE & COGNITIVE BIASES
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'loss-aversion',
    term: 'Loss Aversion (Prospect Theory)',
    category: 'Behavioural Finance',
    subCategory: 'Prospect Theory',
    difficulty: 'BEGINNER',
    formula: 'Utility(-x) ≈ 2.25 × |Utility(+x)|',
    simpleMeaning:
      'The psychological phenomenon where the emotional pain of losing ₹10,000 is twice as intense as the joy experienced from gaining the same ₹10,000.',
    example:
      'An investor refuses to sell a tumbling stock down 40% because doing so crystallizes an intolerable psychological loss, holding on until it goes bankrupt.',
    interviewAnswer:
      'Pioneered by Kahneman and Tversky, Prospect Theory disproved traditional rational expectation theory (von Neumann–Morgenstern) by proving that human utility curves are S-shaped and kinked at the reference point.',
    keywords: ['Prospect Theory', 'Kahneman', 'Asymmetric Utility', 'Risk Aversion', 'Psychology'],
  },
  {
    slug: 'anchoring-bias',
    term: 'Anchoring Bias',
    category: 'Behavioural Finance',
    subCategory: 'Cognitive Biases',
    difficulty: 'BEGINNER',
    formula: 'Perceived Fair Value = f(Arbitrary Initial Anchor Price)',
    simpleMeaning:
      'The cognitive tendency to over-rely on the first piece of information encountered (like the 52-week high or purchase price) when estimating value.',
    example:
      'Thinking a tech stock is a bargain at ₹800 simply because it once traded at its all-time peak of ₹1,600, ignoring that its business fundamentals have deteriorated.',
    interviewAnswer:
      'Anchoring leads to under-reaction in financial markets. Professional fundamental analysts counteract anchoring by performing zero-base valuation modeling without looking at past price history.',
    keywords: ['Cognitive Bias', 'Heuristics', 'Market Under-reaction', 'Behavioral Anomaly'],
  },
  {
    slug: 'disposition-effect',
    term: 'The Disposition Effect',
    category: 'Behavioural Finance',
    subCategory: 'Trading Psychology',
    difficulty: 'INTERMEDIATE',
    formula: 'PGR (Proportion of Gains Realized) > PLR (Proportion of Losses Realized)',
    simpleMeaning:
      'The bad trading habit of hastily selling winning stocks too early to secure a quick gain while stubbornly holding onto losing stocks in hopes of breaking even.',
    example:
      'Selling a stock as soon as it gains 8% to lock in satisfaction, while continuing to hold a losing stock down 45%, cutting your flowers and watering your weeds.',
    interviewAnswer:
      'The disposition effect arises from a combination of loss aversion and mental accounting. Quantitative momentum strategies systematically exploit this bias by letting winners run.',
    keywords: ['Trading Bias', 'Momentum', 'Loss Realization', 'Mental Accounting'],
  },

  /* ═══════════════════════════════════════════════════════════════
     8. BUSINESS FORECASTING & TIME SERIES
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'arima-forecasting',
    term: 'ARIMA (AutoRegressive Integrated Moving Average)',
    category: 'Business Forecasting',
    subCategory: 'Time Series Modeling',
    difficulty: 'ADVANCED',
    formula: 'ARIMA(p, d, q) where p = lags, d = differencing, q = error lags',
    simpleMeaning:
      'A statistical model that predicts future values of a metric (like quarterly sales) by analyzing its own past patterns, trend changes, and moving error shocks.',
    example:
      'Forecasting airline passenger traffic for the upcoming festival quarter by differencing the non-stationary historical series (d=1) and fitting autoregressive terms.',
    interviewAnswer:
      'ARIMA models require the underlying time series to be made stationary (constant mean and variance over time) through Box-Jenkins methodology before parameter identification via ACF and PACF plots.',
    keywords: ['Time Series', 'Box-Jenkins', 'Stationarity', 'Seasonality', 'Predictive Modeling'],
  },
  {
    slug: 'exponential-smoothing',
    term: 'Holt-Winters Exponential Smoothing',
    category: 'Business Forecasting',
    subCategory: 'Smoothing Methods',
    difficulty: 'INTERMEDIATE',
    formula: 'Forecast = Level(α) + Trend(β) + Seasonality(γ)',
    simpleMeaning:
      'A forecasting algorithm that gives progressively decreasing weights to older data points while simultaneously modeling both linear trend and recurring seasonal spikes.',
    example:
      'An e-commerce giant predicting AC and refrigerator unit demand across summer quarters by assigning 60% weight to recent months while capturing seasonal summer peaks.',
    interviewAnswer:
      'Holt-Winters triple exponential smoothing is ideal for operational supply chain forecasting because it adapts rapidly to short-term trend shifts without demanding heavy neural network compute.',
    keywords: ['Holt-Winters', 'Seasonality', 'Supply Chain', 'Smoothing Parameter', 'Demand Planning'],
  },
  {
    slug: 'forecast-accuracy-mape',
    term: 'Mean Absolute Percentage Error (MAPE)',
    category: 'Business Forecasting',
    subCategory: 'Accuracy Metrics',
    difficulty: 'BEGINNER',
    formula: 'MAPE = (1/n) × Σ |(Actual - Forecast) / Actual| × 100',
    simpleMeaning:
      'The average percentage error between forecasted projections and actual realized figures, providing an intuitive measure of prediction accuracy.',
    example:
      'If actual quarterly revenue was ₹100 Cr and the model projected ₹106 Cr, the absolute error is 6%. Averaged across 12 quarters, a MAPE of 4.2% indicates high model accuracy.',
    interviewAnswer:
      'MAPE is beloved by executives because it expresses accuracy as an intuitive percentage, but it produces infinite or undefined errors if actual values hit zero, requiring SMAPE or MASE alternatives.',
    keywords: ['MAPE', 'Forecast Accuracy', 'Tracking Signal', 'RMSE', 'Residual Analysis'],
  },

  /* ═══════════════════════════════════════════════════════════════
     9. BUSINESS ANALYTICS & DECISION SCIENCE
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'monte-carlo-simulation',
    term: 'Monte Carlo Simulation',
    category: 'Business Analytics',
    subCategory: 'Stochastic Modeling',
    difficulty: 'ADVANCED',
    formula: 'E[f(X)] ≈ (1/N) × Σ f(X_i) for i = 1 to N random draws',
    simpleMeaning:
      'A computational technique that runs thousands of randomized scenario trials to model the probability distribution of uncertain financial or operational outcomes.',
    example:
      'Simulating 10,000 project cash flow paths where raw material costs, interest rates, and sales demand all vary according to their historical statistical distributions.',
    interviewAnswer:
      'Unlike single-point base/bull/bear case financial models, Monte Carlo simulations provide an explicit probability distribution, allowing risk committees to quantify downside value at risk.',
    keywords: ['Simulation', 'Stochastic', 'Probability Distribution', 'Risk Analysis', 'Excel Solver'],
  },
  {
    slug: 'linear-programming-optimization',
    term: 'Linear Programming & Optimization',
    category: 'Business Analytics',
    subCategory: 'Prescriptive Analytics',
    difficulty: 'INTERMEDIATE',
    formula: 'Maximize Z = c^T x,  subject to: Ax ≤ b  and  x ≥ 0',
    simpleMeaning:
      'A mathematical method used to find the optimal allocation of scarce resources (like factory hours or marketing budget) to maximize profits or minimize costs.',
    example:
      'Using Excel Solver or Python PuLP to determine the exact product mix of 4 smartphone models that maximizes total operating profit under limited semiconductor chip supplies.',
    interviewAnswer:
      'Linear programming problems yield a convex feasible region where the optimal solution is guaranteed to lie at a vertex, solvable at massive scale via the Simplex or Interior Point algorithms.',
    keywords: ['Optimization', 'Solver', 'Simplex', 'Resource Allocation', 'Constraints'],
  },
  {
    slug: 'decision-trees-emv',
    term: 'Decision Trees & Expected Monetary Value (EMV)',
    category: 'Business Analytics',
    subCategory: 'Decision Analysis',
    difficulty: 'BEGINNER',
    formula: 'EMV = Σ (Probability_i × Payoff_i)',
    simpleMeaning:
      'A diagrammatic framework for choosing the best strategic option by multiplying the payoffs of uncertain future outcomes by their estimated probabilities.',
    example:
      'Deciding whether to launch a new product: 60% probability of ₹10 Cr profit and 40% probability of ₹3 Cr loss yields an EMV of (0.6 × 10) + (0.4 × -3) = +₹4.8 Cr.',
    interviewAnswer:
      'Expected Monetary Value provides a rational baseline for risk-neutral decision makers. For high-stakes decisions where failure threatens solvency, Expected Utility should replace pure EMV.',
    keywords: ['Decision Tree', 'EMV', 'Probability', 'Payoff Matrix', 'Strategic Decision'],
  },

  /* ═══════════════════════════════════════════════════════════════
     10. DATA MINING & PREDICTIVE ANALYTICS
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'logistic-regression',
    term: 'Logistic Regression & Odds Ratio',
    category: 'Machine Learning',
    subCategory: 'Classification',
    difficulty: 'INTERMEDIATE',
    formula: 'P(Y=1) = 1 / (1 + e^-(β0 + β1×X1 + ... + βk×Xk))',
    simpleMeaning:
      'A predictive modeling algorithm that calculates the probability (between 0% and 100%) that a particular binary event will occur—such as loan default or customer churn.',
    example:
      'Predicting whether a credit card applicant will default based on their credit score, debt-to-income ratio, and past late payments, outputting a 12% probability of default.',
    interviewAnswer:
      'Unlike black-box neural networks, logistic regression coefficients directly translate into log-odds ratios, making it the preferred benchmark in highly regulated credit scoring and insurance underwriting.',
    keywords: ['Logistic Regression', 'Classification', 'Credit Scoring', 'Sigmoid', 'Odds Ratio'],
  },
  {
    slug: 'k-means-clustering',
    term: 'K-Means Customer Segmentation',
    category: 'Machine Learning',
    subCategory: 'Unsupervised Learning',
    difficulty: 'INTERMEDIATE',
    formula: 'ArgMin Σ Σ ||x_i - μ_j||² for clusters j = 1 to k',
    simpleMeaning:
      'An unsupervised algorithm that automatically partitions customers or data points into K distinct groups based on behavioral and spending similarities.',
    example:
      'Grouping 50,000 banking customers into 4 behavioral clusters: Young High-Spenders, Wealthy Savers, Inactive Accounts, and Credit-Reliant Borrowers.',
    interviewAnswer:
      'The optimal number of clusters K is determined using the Elbow method (within-cluster sum of squares) combined with Silhouette score analysis to guarantee cluster cohesion and separation.',
    keywords: ['Clustering', 'Customer Segmentation', 'Unsupervised', 'Centroids', 'RFM'],
  },
  {
    slug: 'association-rules-market-basket',
    term: 'Market Basket Analysis (Lift, Support, Confidence)',
    category: 'Machine Learning',
    subCategory: 'Association Mining',
    difficulty: 'INTERMEDIATE',
    formula: 'Lift(A → B) = Confidence(A → B) / Support(B)',
    simpleMeaning:
      'A data mining technique that discovers which products are frequently bought together by analyzing millions of retail checkout transactions.',
    example:
      'If customers who buy baby diapers have a 70% probability of also buying craft beer, and beer is normally bought by 20% of shoppers, the Lift is 3.5x higher than random chance.',
    interviewAnswer:
      'A Lift value greater than 1.0 proves a genuine cross-selling association rather than coincidental co-occurrence, guiding retail shelf placement and targeted bundling discounts.',
    keywords: ['Apriori', 'Market Basket', 'Cross Selling', 'Support', 'Confidence', 'Lift'],
  },

  /* ═══════════════════════════════════════════════════════════════
     11. MARKETING ANALYTICS & CUSTOMER INTELLIGENCE
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'customer-lifetime-value',
    term: 'Customer Lifetime Value (CLV / LTV)',
    category: 'Marketing Analytics',
    subCategory: 'Customer Economics',
    difficulty: 'INTERMEDIATE',
    formula: 'CLV = (Average Order Value × Purchase Frequency × Gross Margin) / Churn Rate',
    simpleMeaning:
      'The total net profit a company expects to earn from a customer throughout the entire duration of their business relationship.',
    example:
      'A streaming subscriber paying ₹499/month with 80% gross margins who stays an average of 24 months has an expected Customer Lifetime Value of ₹9,580.',
    interviewAnswer:
      'The fundamental rule of sustainable unit economics is that CLV must be at least 3x Customer Acquisition Cost (LTV/CAC > 3.0x), with a CAC payback period under 12 months.',
    keywords: ['CLV', 'LTV', 'CAC', 'Unit Economics', 'Retention', 'Churn'],
  },
  {
    slug: 'customer-acquisition-cost',
    term: 'Customer Acquisition Cost (CAC)',
    category: 'Marketing Analytics',
    subCategory: 'Unit Economics',
    difficulty: 'BEGINNER',
    formula: 'CAC = Total Sales & Marketing Spend / Number of New Customers Acquired',
    simpleMeaning:
      'The total money spent on advertising, marketing campaigns, and sales salaries to win a single new paying customer.',
    example:
      'Spending ₹10 Lakhs on Google and LinkedIn ads in a month to acquire 500 new paying enterprise users results in a CAC of ₹2,000 per user.',
    interviewAnswer:
      'A declining CAC alongside scaling revenue indicates strong organic brand pull and word-of-mouth viral loops; a rising CAC signals saturation in target advertising channels.',
    keywords: ['CAC', 'Paid Marketing', 'Unit Economics', 'Blended CAC', 'Payback Period'],
  },
  {
    slug: 'price-elasticity-of-demand',
    term: 'Price Elasticity of Demand (PED)',
    category: 'Marketing Analytics',
    subCategory: 'Pricing Strategy',
    difficulty: 'BEGINNER',
    formula: 'PED = % Change in Quantity Demanded / % Change in Price',
    simpleMeaning:
      'A measure of how sensitive consumer purchase volume is to a price increase or discount on a product.',
    example:
      'If raising software subscription prices by 10% causes unit sales to drop by only 2%, PED is -0.2 (inelastic), meaning total revenue will expand significantly.',
    interviewAnswer:
      'Products with strong pricing power and brand moats display inelastic demand (|PED| < 1.0), allowing firms to pass rising inflationary costs onto consumers without sacrificing sales volumes.',
    keywords: ['Pricing Power', 'Elasticity', 'Revenue Optimization', 'Demand Curve'],
  },

  /* ═══════════════════════════════════════════════════════════════
     12. PROJECT MANAGEMENT & CORPORATE GOVERNANCE
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'critical-path-method',
    term: 'Critical Path Method (CPM & PERT)',
    category: 'Project Management',
    subCategory: 'Schedule Management',
    difficulty: 'INTERMEDIATE',
    formula: 'Critical Path = Longest sequence of dependent activities with Total Float = 0',
    simpleMeaning:
      'The sequence of dependent project milestones that determines the absolute minimum calendar time required to complete the entire project.',
    example:
      'In building a factory, foundation curing and machinery installation are on the critical path: any single day delay in these tasks delays the commercial opening date by a day.',
    interviewAnswer:
      'Project managers focus their daily executive attention and resources on critical path activities because non-critical tasks have float (slack time) and cannot delay final project delivery.',
    keywords: ['CPM', 'PERT', 'Float', 'Gantt Chart', 'Network Diagram', 'Project Delivery'],
  },
  {
    slug: 'earned-value-management',
    term: 'Earned Value Management (EVM - CPI & SPI)',
    category: 'Project Management',
    subCategory: 'Project Controls',
    difficulty: 'ADVANCED',
    formula: 'CPI = EV / Actual Cost (AC),  SPI = EV / Planned Value (PV)',
    simpleMeaning:
      'A project control methodology that integrates scope, schedule, and cost performance into standardized cost and schedule efficiency indexes.',
    example:
      'A metro rail phase with a Cost Performance Index (CPI) of 0.85 and Schedule Performance Index (SPI) of 0.90 is currently both 15% over budget and 10% behind schedule.',
    interviewAnswer:
      'A CPI under 1.0 signals cost overruns, while an SPI under 1.0 indicates schedule slippage. EVM allows project sponsors to forecast the realistic Estimate at Completion (EAC) months in advance.',
    keywords: ['EVM', 'CPI', 'SPI', 'Planned Value', 'Cost Overrun', 'Estimate at Completion'],
  },
];
