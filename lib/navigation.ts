// lib/navigation.ts — single source of truth for site navigation.
//
// Pages are clustered into a handful of top-level "hubs". Each hub renders as a
// single navbar entry with a hover dropdown, one collapsible group in the left
// sidebar, and one column group in the footer. Add a page here once and it
// appears everywhere automatically.

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
        label: 'Research & Insights',
        icon: '📊',
        href: '/research',
        description: 'Institutional research, market insights and data-driven projects.',
        items: [
            { label: 'Research Reports', href: '/research', icon: '📚', description: 'In-depth sector and company research' },
            { label: 'Insights', href: '/insights', icon: '💡', description: 'Short, sharp strategy notes' },
            { label: 'Data Lab', href: '/data-lab', icon: '🔬', description: 'Reproducible analysis projects' },
            { label: 'Projects', href: '/projects', icon: '🧪', description: 'Portfolio of analytics & modelling work' },
            { label: 'Case Studies', href: '/case-studies', icon: '📁', description: 'Client engagements and outcomes' },
        ],
    },
    {
        id: 'intelligence',
        label: 'Data & Tools',
        icon: '🧭',
        href: '/tools',
        description: 'Live trackers, interactive calculators and market signals.',
        items: [
            { label: 'Calculators', href: '/tools', icon: '🧮', description: '16 interactive finance calculators' },
            { label: 'Sector Trackers', href: '/tracker', icon: '📈', description: 'Quarterly KPIs across sectors' },
            { label: 'Contrarian Radar', href: '/radar', icon: '📡', description: 'Consensus temperature heatmap' },
            { label: 'Predictions', href: '/predictions', icon: '🎯', description: 'Public, timestamped prediction ledger' },
            { label: 'Data Freshness', href: '/data-freshness', icon: '⏱️', description: 'Update SLAs for every dataset' },
        ],
    },
    {
        id: 'learn',
        label: 'Learn',
        icon: '🎓',
        href: '/study',
        description: 'Structured courses, study material and credentials.',
        items: [
            { label: 'Study Material', href: '/study', icon: '📖', description: 'Notes, formula sheets and revision' },
            { label: 'PGDM Program', href: '/pgdm', icon: '🏛️', description: '14 subjects, 73 lectures and quizzes' },
            { label: 'Placement Prep', href: '/study/placement-prep', icon: '🧳', description: '60-day finance placement plan' },
            { label: 'Certificates', href: '/certificates', icon: '🏅', description: 'Verifiable course completion credentials' },
            { label: 'Podcast', href: '/podcast', icon: '🎙️', description: 'The Kunwar Analytics Podcast' },
        ],
    },
    {
        id: 'portfolio',
        label: 'Portfolio',
        icon: '🧑‍💼',
        href: '/resume',
        description: 'Professional profile, work and verifiable credentials.',
        items: [
            { label: 'Résumé', href: '/resume', icon: '📄', description: 'Professional experience and skills' },
            { label: 'Projects', href: '/projects', icon: '🧪', description: 'Analytics and modelling portfolio' },
            { label: 'Certificates', href: '/certificates', icon: '🏅', description: 'Credentials and achievements' },
            { label: 'Speaking', href: '/speaking', icon: '🎤', description: 'Talks, workshops and sessions' },
        ],
    },
    {
        id: 'company',
        label: 'Company',
        icon: '🏢',
        href: '/about',
        description: 'About the practice, services and ways to work together.',
        items: [
            { label: 'Your Account', href: '/account', icon: '👤', description: 'Profile, badges, notifications and API keys' },
            { label: 'About', href: '/about', icon: 'ℹ️', description: 'Mission and approach' },
            { label: 'Services', href: '/services', icon: '🛠️', description: 'Research, modelling and advisory' },
            { label: 'Enterprise', href: '/enterprise', icon: '🏦', description: 'Custom engagements for teams' },
            { label: 'Pricing', href: '/pricing', icon: '💳', description: 'Plans for individuals and teams' },
            { label: 'Contact', href: '/contact', icon: '✉️', description: 'Start a conversation' },
        ],
    },
];

/** Flattened list of every navigable route (used by the mobile drawer). */
export const NAV_LINKS: NavItem[] = NAV_CLUSTERS.flatMap((cluster) => cluster.items);

/** Primary call-to-action shown in the navbar and mobile drawer. */
export const NAV_CTA: NavItem = { label: 'Work With Me', href: '/contact', icon: '🚀' };
