// lib/projects.ts — portfolio of hands-on analytics, modelling and strategy work.
//
// Static, typed catalogue rendered by app/(dashboard)/projects/page.tsx. Keep the
// shape stable so the page and any future API can share it.

export type ProjectCategory =
    | 'Financial Modelling'
    | 'Data Analytics'
    | 'Market Research'
    | 'Strategy'
    | 'Automation';

export interface Project {
    /** URL-safe identifier. */
    slug: string;
    title: string;
    /** ISO date (YYYY-MM-DD). */
    date: string;
    category: ProjectCategory;
    sector: string;
    /** One-line problem statement. */
    problem: string;
    /** What was built / done. */
    approach: string;
    /** 2–4 quantified outcomes. */
    outcomes: string[];
    /** Tools, languages and frameworks used. */
    tools: string[];
    /** Optional link to a related case study or data-lab project. */
    href?: string;
    featured?: boolean;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
    'Financial Modelling',
    'Data Analytics',
    'Market Research',
    'Strategy',
    'Automation',
];

export const PROJECTS: Project[] = [
    {
        slug: 'd2c-unit-economics-model',
        title: 'D2C Brand Unit-Economics Model',
        date: '2026-05-12',
        category: 'Financial Modelling',
        sector: 'Consumer / D2C',
        problem:
            'A digital-first brand could not tell which cohorts were actually profitable after CAC, returns and repeat rates were loaded in.',
        approach:
            'Built a driver-based three-statement-linked model with cohort-level contribution margin, LTV/CAC by acquisition channel, and a returns-adjusted payback clock.',
        outcomes: [
            'Identified 3 of 9 acquisition channels were value-destructive',
            'Raised blended contribution margin by 6.4pp in the restated forecast',
            'Cut modelled CAC payback from 14 to 9 months',
        ],
        tools: ['Excel', 'Power Query', 'Python (pandas)', 'Power BI'],
        href: '/data-lab/d2c-brand-unit-economics',
        featured: true,
    },
    {
        slug: 'stock-market-concentration',
        title: 'Market Concentration & Breadth Dashboard',
        date: '2026-06-02',
        category: 'Data Analytics',
        sector: 'Capital Markets',
        problem:
            'Headline index levels masked how narrow the rally had become, hiding real breadth risk for allocators.',
        approach:
            'Engineered a breadth pipeline (HHI, effective number of stocks, equal-weight vs cap-weight spread) with an interactive Power BI dashboard and regime flags.',
        outcomes: [
            'Surfaced a top-decile concentration regime 6 weeks before a drawdown',
            'Automated a previously manual 4-hour weekly process to under 5 minutes',
        ],
        tools: ['Python', 'SQL', 'Power BI', 'DAX'],
        href: '/data-lab/stock-market-concentration',
        featured: true,
    },
    {
        slug: 'quick-commerce-economics',
        title: 'Quick-Commerce Dark-Store Economics',
        date: '2026-04-18',
        category: 'Market Research',
        sector: 'Retail / Q-Commerce',
        problem:
            'Investors needed a defensible view on whether dark-store density could ever clear a profit hurdle.',
        approach:
            'Modelled per-store ramped P&L by order density, AOV and delivery cost, triangulated with public disclosures and a bottoms-up city TAM.',
        outcomes: [
            'Built a density-to-profitability bridge with break-even at ~1,150 orders/day/store',
            'Produced a 22-page research note with 8 charts',
        ],
        tools: ['Excel', 'Python', 'Public filings', 'Recharts'],
        href: '/insights/quick-commerce-dark-store-economics',
        featured: true,
    },
    {
        slug: 'three-statement-valuation-suite',
        title: 'Three-Statement + Valuation Calculator Suite',
        date: '2026-07-09',
        category: 'Financial Modelling',
        sector: 'Cross-sector',
        problem:
            'Users needed a fast, self-serve way to test DCF, WACC and ratio scenarios without rebuilding models.',
        approach:
            'Shipped 16 interactive calculators (DCF, WACC, TVM, ratios, portfolio risk, three-statement) with live recalculation and clean chart outputs.',
        outcomes: [
            '16 tools shipped, 0 server round-trips for recalculation',
            'Average session depth up materially on the Tools hub',
        ],
        tools: ['TypeScript', 'React', 'Recharts', 'Decimal math'],
        href: '/tools',
    },
    {
        slug: 'credit-risk-early-warning',
        title: 'Unsecured-Lending Early-Warning Monitor',
        date: '2026-08-21',
        category: 'Data Analytics',
        sector: 'BFSI',
        problem:
            'Rising unsecured retail credit needed an early-warning view before it showed up in reported GNPA.',
        approach:
            'Assembled a monitoring board tracking sectoral growth vs risk-weight changes, co-lending mix and bureau stress proxies with threshold alerts.',
        outcomes: [
            'Flagged the co-lending mix shift that preceded tighter risk weights',
            'Reusable alerting playbook for the credit desk',
        ],
        tools: ['Python', 'SQL', 'Power BI'],
        href: '/insights/rbi-unsecured-lending-risk-weights-colending',
    },
    {
        slug: 'placement-prep-tracker',
        title: 'Placement-Prep Progress Engine',
        date: '2026-03-30',
        category: 'Automation',
        sector: 'EdTech / Careers',
        problem:
            'Candidates lack a structured, measurable way to run a 60-day finance placement sprint.',
        approach:
            'Built a client-side daily tracker with task content, streaks, progress persistence and a portfolio lab of project briefs.',
        outcomes: [
            '60-day plan with daily deliverables and progress tracking',
            'Runs entirely offline via local persistence',
        ],
        tools: ['TypeScript', 'React', 'localStorage'],
        href: '/study/placement-prep',
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
    return PROJECTS.filter((project) => project.featured);
}
