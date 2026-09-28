// lib/kunwar-knowledge.ts
//
// Authoritative knowledge base for Kunwar Analytics:
// Features, Pricing, Payment (UPI & QR), Tools, Courses, and Contact info.
// Used by Ask Kunwar to deliver comprehensive, grounded answers.

import type { PassageSource } from './retrieval-qa';

export interface PlatformTopic {
  id: string;
  title: string;
  url: string;
  kind: string;
  keywords: string[];
  description: string;
  fullContent: string;
}

export const PLATFORM_TOPICS: PlatformTopic[] = [
  {
    id: 'features-overview',
    title: 'Kunwar Analytics Features & Capabilities',
    url: '/tools',
    kind: 'platform',
    keywords: ['feature', 'features', 'what do you do', 'what can you do', 'overview', 'capabilities', 'product', 'offerings', 'services'],
    description: 'Kunwar Analytics is an institutional-grade financial intelligence, quantitative valuation, and equity research platform founded by Sumit Singh.',
    fullContent: `Kunwar Analytics provides an institutional suite of finance tools:
1. **Quantitative Valuation & Financial Tools (/tools)**:
   - 3-Statement Projection Engine (P&L, Balance Sheet, Cash Flow)
   - Discounted Cash Flow (DCF) & Target Price Engine with WACC sensitivity
   - DuPont 5-Way Analysis & Comprehensive Financial Ratios
   - Autonomous Financial Workforce / AI Financial Analyst agent
   - Global Macro Forecasting & Live Ticker (/radar)
2. **Institutional Research Library (/research)**:
   - Deep-dive equity research notes, sector outlooks (Semiconductors, Green Hydrogen, EV, Fintech, AI Infrastructure), and downloadable PDF notes.
3. **Data Lab & Insights (/insights, /data-lab)**:
   - Macro datasets, industry benchmarks, and interactive valuation visualizations.
4. **Study Hub & Placement Prep (/study, /pgdm)**:
   - Full PGDM/MBA Finance curriculum, financial modeling masterclasses, placement interview prep, cheatsheets, and verified certification.
5. **Predictions Ledger (/predictions/ledger)**:
   - Track record of quantitative market forecasts with transparent Brier calibration scores.
6. **Ask Kunwar AI Assistant (/ask)**:
   - Sourced financial AI assistant answering equity research and platform questions.
7. **Global Search (Ctrl+K)**:
   - Instant search across all research, tools, courses, and insights.`,
  },
  {
    id: 'pricing-plans',
    title: 'Pricing Plans & Subscriptions',
    url: '/pricing',
    kind: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'plan', 'plans', 'subscription', 'how much', 'fee', 'charge', 'pro plan', 'free plan', 'tier'],
    description: 'Kunwar Analytics offers flexible pricing: Free Explorer tier, Pro Analyst tier (₹1,999/mo or ₹19,999/yr), and Enterprise custom engagements.',
    fullContent: `Kunwar Analytics offers three transparent tiers:
1. **Free / Explorer (₹0 / $0)**:
   - Public research summaries & insights
   - Basic valuation calculators
   - Platform search (Ctrl+K)
   - Introductory study notes
2. **Pro Analyst Plan**:
   - **Monthly**: ₹1,999 / month (or $29/mo)
   - **Annual**: ₹19,999 / year (Save ~17%, 2 months free!)
   - **What's included**:
     - Full access to all Institutional Research deep-dives and PDF downloads
     - Advanced DCF valuation models & 3-statement financial projection exports
     - Unlimited Ask Kunwar AI assistant access
     - Complete PGDM study hub, placement masterclasses, and verified certificates
     - Priority research desk support
3. **Enterprise & Corporate Desk**:
   - Custom pricing tailored to asset managers, family offices, and research teams.
   - Includes custom models, dedicated analyst support, team seats, and API access.
   - Contact: **kunwaranalytics@gmail.com**`,
  },
  {
    id: 'payment-methods',
    title: 'Payment Methods & UPI Checkout',
    url: '/checkout/pro',
    kind: 'billing',
    keywords: ['payment', 'pay', 'upi', 'qr', 'qr code', 'how to pay', 'gpay', 'phonepe', 'paytm', 'buy', 'upgrade', 'checkout'],
    description: 'Pay directly via UPI ID sumitsingh7445@ptyes or scan the UPI QR code on the checkout page. Confirmation via kunwaranalytics@gmail.com.',
    fullContent: `How to Pay & Upgrade to Pro Analyst:
1. **UPI Payment (Fastest & Recommended in India)**:
   - **Official UPI ID**: \`sumitsingh7445@ptyes\`
   - **UPI QR Code**: Available directly on the checkout page at \`/checkout/pro\`.
   - Supports Google Pay, PhonePe, Paytm, BHIM, and all UPI banking apps.
2. **Instant Activation**:
   - After completing the UPI transfer, email the transaction screenshot or UTR/Reference number to:
     **kunwaranalytics@gmail.com**
   - Your account will be upgraded to Pro Analyst status within 30 minutes!
3. **Cards & International**:
   - Credit/Debit cards accepted via online checkout at \`/checkout/pro\`.`,
  },
  {
    id: 'financial-tools',
    title: 'Financial Modelling & Valuation Tools',
    url: '/tools',
    kind: 'tools',
    keywords: ['tool', 'tools', 'dcf', 'valuation', 'model', 'wacc', 'projection', 'dupont', 'ratios', 'three-statement', 'financial model'],
    description: 'Explore interactive DCF models, 3-statement financial projections, DuPont analysis, and scenario matrices.',
    fullContent: `Kunwar Analytics provides professional valuation modeling tools:
- **DCF Valuation Engine**: Compute Enterprise Value, Equity Value, and Target Share Price with customizable WACC, terminal growth rate, and cash flows.
- **3-Statement Modeling**: Dynamic interlinked Income Statement, Balance Sheet, and Cash Flow Statement projections.
- **DuPont Analysis**: 3-stage and 5-stage decomposition of Return on Equity (ROE).
- **Sensitivity & Scenario Analysis**: Stress-test valuations against changing interest rates and growth assumptions.
- Access these tools at \`/tools\`.`,
  },
  {
    id: 'study-hub',
    title: 'Study Hub & Placement Prep',
    url: '/study',
    kind: 'education',
    keywords: ['study', 'course', 'courses', 'pgdm', 'placement', 'interview', 'learn', 'student', 'materials', 'cheatsheet', 'resume'],
    description: 'PGDM & MBA Finance curriculum, equity research interview preparation, financial modeling cheatsheets, and resume guides.',
    fullContent: `Kunwar Analytics Study Hub provides:
- **PGDM & MBA Finance Curriculum (/pgdm)**: Core corporate finance, financial analysis, portfolio management, and business analytics.
- **Placement Preparation (/study/placement-prep)**: Real investment banking and equity research interview questions, case studies, and technical screening tests.
- **Cheatsheets & Models**: Quick-reference valuation formulas, accounting adjustments, and Excel shortcuts.
- **Verified Certificates**: Earn course completion certificates validated directly on the blockchain/ledger.`,
  },
  {
    id: 'contact-support',
    title: 'Contact Kunwar Analytics & Research Desk',
    url: '/contact',
    kind: 'contact',
    keywords: ['contact', 'email', 'support', 'help', 'reach', 'phone', 'address', 'query', 'inquiry', 'message', 'kunwar email'],
    description: 'Contact Kunwar Analytics via email at kunwaranalytics@gmail.com or through our contact form at /contact.',
    fullContent: `Contact Details for Kunwar Analytics:
- **Official Email**: **kunwaranalytics@gmail.com** (all general inquiries, research requests, corporate partnerships, and payment confirmations).
- **Contact Form**: Available at \`/contact\`. Fill out the form with your project details or questions.
- **Response Time**: Same business day acknowledgement; detailed replies within 24–48 hours.
- **Location**: Connaught Place, New Delhi & Noida, India.`,
  },
];

/**
 * Searches the authoritative platform topics for relevance to a query.
 */
export function searchPlatformTopics(query: string): PlatformTopic[] {
  const q = query.toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);

  const scored = PLATFORM_TOPICS.map((topic) => {
    let score = 0;
    // Direct keyword match
    for (const kw of topic.keywords) {
      if (q.includes(kw)) score += 3;
    }
    // Token matches in title or description
    for (const token of tokens) {
      if (topic.title.toLowerCase().includes(token)) score += 2;
      if (topic.description.toLowerCase().includes(token)) score += 1;
      if (topic.fullContent.toLowerCase().includes(token)) score += 1;
    }
    return { topic, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.topic);
}

/**
 * Converts relevant platform topics into PassageSources with citations.
 */
export function getPlatformPassages(query: string): PassageSource[] {
  const matches = searchPlatformTopics(query);
  if (matches.length === 0) {
    // If query mentions broad platform words, return top topics
    const isGeneralPlatform = /kunwar|platform|website|service|about|help|hi|hello/i.test(query);
    if (isGeneralPlatform) {
      return PLATFORM_TOPICS.slice(0, 3).map((t) => ({
        title: t.title,
        url: t.url,
        kind: t.kind,
        description: t.description,
        score: 5,
      }));
    }
    return [];
  }

  return matches.slice(0, 4).map((t, idx) => ({
    title: t.title,
    url: t.url,
    kind: t.kind,
    description: t.fullContent,
    score: 10 - idx,
  }));
}

/**
 * Builds system prompt for the Hugging Face LLM (Mistral) with platform knowledge.
 */
export function getPlatformSystemPrompt(): string {
  return `You are "Ask Kunwar", the official AI financial research and platform intelligence assistant for Kunwar Analytics.
Founded by Sumit Singh, Kunwar Analytics is an institutional quantitative finance and equity research platform.
Official Contact Email: kunwaranalytics@gmail.com
Official UPI ID for Subscriptions: sumitsingh7445@ptyes

YOUR CORE KNOWLEDGE BASE:
1. FEATURES:
   - Quantitative Tools (/tools): 3-Statement Projection Engine, DCF Valuation Models (WACC, terminal growth), DuPont ROE Analysis, Scenario Matrices, Autonomous Financial Analyst AI.
   - Institutional Research (/research): Sector deep-dives (Semiconductors, Green Hydrogen, EV, Fintech, AI Infra) with downloadable PDF research notes.
   - Study Hub & Placement Prep (/study, /pgdm): Complete PGDM/MBA curriculum, valuation masterclasses, interview prep questions, and certificates.
   - Data Lab & Datasets (/insights, /data-lab): Macro and sector financial benchmarks.
   - Predictions Ledger (/predictions/ledger): Track record of market forecasts with transparent Brier calibration scores.
   - Global Search: Keyboard-driven search accessible with Ctrl+K / ⌘K anywhere on the site.

2. PRICING & PLANS (/pricing):
   - Free / Explorer: ₹0 / $0 — core research summaries, basic calculators, study notes.
   - Pro Analyst Plan: ₹1,999/month or ₹19,999/year (Save 2 months). Includes full institutional research, DCF models, Excel/PDF exports, unlimited Ask Kunwar AI, and placement course certificates.
   - Enterprise: Custom team pricing, dedicated research desk, and API access.

3. HOW TO PAY & UPGRADE (/checkout/pro):
   - UPI ID: sumitsingh7445@ptyes (or scan the UPI QR code at /checkout/pro).
   - After paying via Google Pay, PhonePe, Paytm, or BHIM: email the screenshot or UTR number to kunwaranalytics@gmail.com for activation within 30 minutes!

4. CONTACT & SUPPORT (/contact):
   - Email: kunwaranalytics@gmail.com
   - Contact Form: /contact (replies within 24-48 hours)

RESPONSE GUIDELINES:
- When asked about platform features, pricing, payment, tools, or contact info: answer thoroughly, warmly, and clearly using the knowledge above.
- When asked financial, market, or research questions: provide professional, data-backed quantitative insights and cite relevant sources with [number].
- Always format nicely using Markdown (bullet points, bold text).`;
}

/**
 * Generates an intelligent, high-quality local fallback answer when the external
 * LLM is unavailable or when the question directly matches platform topics.
 */
export function synthesizeLocalPlatformAnswer(query: string, passages: { title: string; url: string; description: string; index: number }[]): string | null {
  const q = query.toLowerCase();

  const isPricing = /price|pricing|cost|plan|subscription|how much|fee|charge|pro/i.test(q);
  const isPayment = /pay|payment|upi|qr|qr code|how to pay|gpay|phonepe|paytm|buy|upgrade/i.test(q);
  const isFeatures = /feature|features|what do you do|what is kunwar|about|tools|capabilities|offerings/i.test(q);
  const isContact = /contact|email|reach|support|phone|address|help|kunwaranalytics@gmail.com/i.test(q);
  const isStudy = /study|course|courses|pgdm|placement|interview|student/i.test(q);

  if (isPricing) {
    return `### Kunwar Analytics Pricing Plans [1]

Kunwar Analytics offers three distinct membership tiers designed for individual analysts, students, and institutions:

1. **Free / Explorer Plan (₹0 / $0)**:
   - Access to public research summaries & market insights
   - Basic valuation calculators and financial tools
   - Instant site search (\`Ctrl+K\`)
   - Introductory study notes and cheatsheets

2. **Pro Analyst Plan (Most Popular)**:
   - **Monthly**: ₹1,999 / month (or $29/mo)
   - **Annual**: ₹19,999 / year *(Save ~17% — get 2 months free!)*
   - **Included Features**:
     - Full access to institutional equity research notes & downloadable PDFs
     - Interactive DCF Valuation Models & 3-Statement financial projections
     - Unlimited queries with the **Ask Kunwar AI** assistant
     - Complete PGDM & Placement Prep masterclasses with verifiable certificates
     - Priority research desk assistance

3. **Enterprise & Corporate Desk**:
   - Custom institutional pricing for asset management teams, family offices, and universities.
   - Dedicated bespoke models, custom research notes, team seat management, and API access.
   - Inquire at **kunwaranalytics@gmail.com** [2].

You can view full details and upgrade directly at [/pricing](/pricing) or [/checkout/pro](/checkout/pro).`;
  }

  if (isPayment) {
    return `### How to Pay & Upgrade to Pro [1]

We offer quick, seamless payment methods tailored for users in India and globally:

1. **UPI Payment (Recommended — Instant)**:
   - **Official UPI ID**: \`sumitsingh7445@ptyes\`
   - **QR Code**: Scan the QR code available at checkout on [/checkout/pro](/checkout/pro).
   - Works with Google Pay, PhonePe, Paytm, BHIM, and any UPI banking app.

2. **Confirmation & Activation**:
   - Once payment is completed, send your transaction screenshot or UTR number to **kunwaranalytics@gmail.com** [2].
   - Your account will be upgraded to Pro Analyst status within **30 minutes**.

3. **Debit & Credit Cards**:
   - International and domestic cards are also supported via online checkout.

Visit [/checkout/pro](/checkout/pro) to get started!`;
  }

  if (isFeatures) {
    return `### Kunwar Analytics Platform Features [1]

Kunwar Analytics is an institutional financial research, quantitative valuation, and market intelligence platform founded by Sumit Singh. Here is what you can do on the platform:

- **Institutional Research (/research)**: Deep-dive quantitative research papers covering high-growth sectors (Semiconductors, Green Hydrogen, EV Fleets, Fintech Credit, AI Infra) with downloadable PDFs and citations.
- **Valuation & Modelling Tools (/tools)**:
  - 3-Statement Financial Modeling Engine (P&L, Balance Sheet, Cash Flow)
  - Discounted Cash Flow (DCF) & Target Price Engine with WACC sensitivity
  - DuPont 5-Way ROE Decomposition and financial ratio analysis
  - Autonomous Financial Analyst AI agent
- **Data Lab & Insights (/insights, /data-lab)**: Interactive financial datasets, valuation multiples, and industry benchmarks.
- **Study Hub & Placement Prep (/study, /pgdm)**: Full curriculum for PGDM & MBA Finance, Equity Research Analyst courses, interview questions, and cheatsheets.
- **Predictions Ledger (/predictions/ledger)**: Transparent market forecast ledger with verified calibration scores.
- **Global Search (\`Ctrl+K\`)**: Instant search across all research, tools, and courses.
- **Official Contact**: **kunwaranalytics@gmail.com** [2].`;
  }

  if (isContact) {
    return `### Contact Kunwar Analytics [1]

We are here to assist with research requests, enterprise engagements, modeling inquiries, and platform support:

- **Official Email**: **kunwaranalytics@gmail.com** *(for all general inquiries, corporate proposals, and payment confirmations)*
- **Contact Form**: Submit a message directly on our [/contact](/contact) page.
- **Response SLA**: Same business day acknowledgement; detailed research responses within 24–48 hours.
- **UPI Billing ID**: \`sumitsingh7445@ptyes\`
- **Office Location**: Connaught Place, New Delhi & Noida, India.`;
  }

  if (isStudy) {
    return `### Kunwar Analytics Study Hub & Courses [1]

Our Study Hub is designed specifically for PGDM & MBA Finance students and aspiring analysts:

- **PGDM Finance Curriculum (/pgdm)**: Master corporate finance, financial statement analysis, portfolio management, and business analytics with step-by-step notes.
- **Placement Preparation (/study/placement-prep)**: Practice real interview questions for Equity Research, Financial Analyst, and Credit Analyst roles.
- **Valuation Modeling Cheatsheets**: Downloadable templates, Excel shortcuts, and formula guides.
- **Verified Certificates**: Receive verified completion certificates for your LinkedIn profile and resume upon finishing modules.`;
  }

  return null;
}
