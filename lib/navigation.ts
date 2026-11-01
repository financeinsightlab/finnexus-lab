// lib/navigation.ts — single source of truth for site navigation.
//
// Architecture: 5 top-level hubs:
//   Research | Tools | Markets | Learn | Company

export interface NavItem {
    /** Display label. */
    label: string;
    /** Route path. */
    href: string;
    /** Optional short description used in dropdowns. */
    description?: string;
    /** Emoji icon (used in the navbar + mobile drawer). */
    icon?: string;
    /** Rendered as an external link when true. */
    external?: boolean;
}

export interface NavCluster {
    /** Stable id (used as a key). */
    id: string;
    /** Top-level label shown in the navbar. */
    label: string;
    /** Emoji icon for the cluster. */
    icon: string;
    /** Landing route when the label itself is clicked. */
    href: string;
    /** One-line summary shown in menus. */
    description: string;
    /** Child pages inside the cluster. */
    items: NavItem[];
}

export const NAV_CLUSTERS: NavCluster[] = [
    {
        id: 'research',
        label: 'Research',
        icon: '📊',
        href: '/research',
        description: 'Institutional research, sector insights and data-driven projects.',
        items: [
            { label: 'Research Reports', href: '/research', icon: '📚', description: 'In-depth sector and company research' },
            { label: 'Insights', href: '/insights', icon: '💡', description: 'Short, sharp strategy notes' },
            { label: 'Data Lab', href: '/data-lab', icon: '🔬', description: 'Reproducible analysis projects' },
            { label: 'Case Studies', href: '/case-studies', icon: '📁', description: 'Client engagements and outcomes' },
            { label: 'Projects', href: '/projects', icon: '🧪', description: 'Portfolio of analytics & modelling work' },
        ],
    },
    {
        id: 'tools',
        label: 'Tools',
        icon: '🧮',
        href: '/tools',
        description: 'Interactive valuation models and financial calculators.',
        items: [
            { label: 'All Calculators', href: '/tools', icon: '🧮', description: '16 interactive finance calculators' },
            { label: 'Company Intelligence', href: '/company', icon: '⚡', description: 'NSE/BSE AI analysis, DCF models & health scores' },
            { label: 'Startup Financials', href: '/startup-financials', icon: '🚀', description: 'VC-ready 3-statement models & runway engine' },
            { label: 'DCF Valuation Model', href: '/tools/dcf-valuation-model', icon: '📊', description: 'Full DCF with scenarios & sensitivity' },
            { label: '3-Statement Model', href: '/tools/3-statement-model', icon: '🚀', description: 'Integrated P&L, BS & Cash Flow' },
            { label: 'WACC Calculator', href: '/tools/wacc-calculator', icon: '⚖️', description: 'CAPM build-up with D/E sensitivity' },
            { label: 'SaaS LTV/CAC Lab', href: '/tools/saas-ltv-cac-model', icon: '💻', description: 'Unit economics & cohort analysis' },
        ],
    },
    {
        id: 'markets',
        label: 'Markets',
        icon: '📈',
        href: '/markets',
        description: 'Global financial market terminal, sector trackers and prediction ledger.',
        items: [
            { label: 'Market Terminal', href: '/markets', icon: '🖥️', description: 'Institutional global multi-asset terminal' },
            { label: 'Indian Equities', href: '/markets/india', icon: '🇮🇳', description: 'Nifty, Sensex, breadth, sectors & gainers' },
            { label: 'Stock Screener', href: '/markets/stocks', icon: '🔍', description: 'Institutional ratio & metric screener' },
            { label: 'Sector Heatmap', href: '/markets/sector-heatmap', icon: '🗺️', description: 'Market-cap weighted visual heatmap' },
            { label: 'Forex & Currencies', href: '/markets/forex', icon: '💱', description: 'Global FX rates & cross-currency matrix' },
            { label: 'Commodities', href: '/markets/commodities', icon: '🪙', description: 'Gold, Silver, Crude Oil, Natural Gas' },
            { label: 'Bonds & Yields', href: '/markets/bonds', icon: '🏛️', description: 'Sovereign yield curve & 10Y spreads' },
            { label: 'Derivatives (F&O)', href: '/markets/derivatives', icon: '⚡', description: 'Options chain, PCR, Max Pain & FII/DII' },
            { label: 'Macro Economy', href: '/markets/economy', icon: '📊', description: 'GDP, CPI inflation & policy benchmarks' },
            { label: 'Economic Calendar', href: '/markets/calendar', icon: '📅', description: 'Global macro announcements & central banks' },
            { label: 'Market News Wire', href: '/markets/news', icon: '📰', description: 'Curated institutional financial wire' },
            { label: 'Sector Trackers', href: '/tracker', icon: '📈', description: 'Quarterly KPIs across sectors' },
            { label: 'Contrarian Radar', href: '/radar', icon: '📡', description: 'Consensus temperature heatmap' },
            { label: 'Predictions', href: '/predictions', icon: '🎯', description: 'Live, timestamped calls board' },
            { label: 'Prediction Ledger', href: '/predictions/ledger', icon: '📒', description: 'Scored public track record (hits & misses)' },
            { label: 'Data Freshness', href: '/data-freshness', icon: '⏱️', description: 'Update SLAs for every dataset' },
        ],
    },
    {
        id: 'learn',
        label: 'Learn',
        icon: '🎓',
        href: '/study',
        description: 'Courses, study material and credentials.',
        items: [
            { label: 'Study Material', href: '/study', icon: '📖', description: 'Notes, formula sheets and revision' },
            { label: 'PGDM Program', href: '/pgdm', icon: '🏛️', description: '14 subjects, 73 lectures and quizzes' },
            { label: 'Finance Terms', href: '/finance-terms', icon: '📚', description: 'Plain-language finance definitions' },
            { label: 'Placement Prep', href: '/study/placement-prep', icon: '🧳', description: '60-day finance placement plan' },
            { label: 'Placement Day War Room', href: '/placement-day-war-room', icon: '🎯', description: "India's #1 AI finance interview simulator & war room" },
            { label: 'Certificates', href: '/certificates', icon: '🏅', description: 'Course completion credentials' },
            { label: 'Podcast', href: '/podcast', icon: '🎙️', description: 'The Kunwar Analytics Podcast' },
        ],
    },
    {
        id: 'company',
        label: 'Company',
        icon: '🏢',
        href: '/about',
        description: 'About the practice, services and ways to work together.',
        items: [
            { label: 'About', href: '/about', icon: 'ℹ️', description: 'Mission and approach' },
            { label: 'Services', href: '/services', icon: '🛠️', description: 'Research, modelling and advisory' },
            { label: 'Enterprise', href: '/enterprise', icon: '🏦', description: 'Custom engagements for teams' },
            { label: 'Pricing', href: '/pricing', icon: '💳', description: 'Plans for individuals and teams' },
            { label: 'Speaking', href: '/speaking', icon: '🎤', description: 'Talks, workshops and sessions' },
            { label: 'Résumé', href: '/resume', icon: '📄', description: 'Professional experience and skills' },
            { label: 'Contact', href: '/contact', icon: '✉️', description: 'Start a conversation' },
        ],
    },
];

/** Flattened list of every navigable route (used by the mobile drawer). */
export const NAV_LINKS: NavItem[] = NAV_CLUSTERS.flatMap((cluster) => cluster.items);

/** Primary call-to-action shown in the navbar and mobile drawer. */
export const NAV_CTA: NavItem = { label: 'Work With Me', href: '/contact', icon: '🚀' };

/**
 * "Jump to" destinations shown in global search before the user types.
 */
export const QUICK_ACTIONS: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: '🏠', description: 'Saved articles, progress and your plan' },
    { label: 'Market Terminal', href: '/markets', icon: '🖥️', description: 'Institutional global multi-asset terminal' },
    { label: 'Equity Screener', href: '/markets/stocks', icon: '🔍', description: 'Valuation & financial ratio screener' },
    { label: 'Sector Trackers', href: '/tracker', icon: '📈', description: 'Quarterly KPIs across sectors' },
    { label: 'Tools & calculators', href: '/tools', icon: '🧮', description: 'Valuation models and finance calculators' },
    { label: 'Ask Kunwar', href: '/ask', icon: '💬', description: 'Grounded Q&A over research and study content' },
    { label: 'Research library', href: '/research', icon: '📊', description: 'All research reports' },
    { label: 'Prediction Ledger', href: '/predictions/ledger', icon: '📒', description: 'Scored public track record' },
    { label: 'Pricing', href: '/pricing', icon: '💳', description: 'Plans and upgrade' },
];

/**
 * True when `pathname` is `href` or nested under it. The root path only
 * matches exactly, so "Home" is never current on every page.
 */
export function isNavActive(pathname: string | null | undefined, href: string): boolean {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
}
