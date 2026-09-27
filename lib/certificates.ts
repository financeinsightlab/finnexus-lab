// lib/certificates.ts — verifiable credential catalogue.
//
// Each certificate maps to a learning track (a subset of the PGDM / study
// curriculum). Issued credentials are verifiable by ID; users can also generate a
// shareable LinkedIn "Add to profile" link from the certificates page.

export type CertificateLevel = 'Foundation' | 'Intermediate' | 'Advanced' | 'Professional';

export type CertificateCategory = 'Finance' | 'Analytics' | 'Strategy' | 'Tools';

export interface Certificate {
    /** URL-safe identifier (also used as the credential slug). */
    slug: string;
    title: string;
    category: CertificateCategory;
    level: CertificateLevel;
    /** One-line summary. */
    summary: string;
    /** Estimated hours of study/assessment. */
    hours: number;
    /** Assessment format, e.g. "40-question proctored quiz". */
    assessment: string;
    /** Skills evidenced by the credential (also used for LinkedIn skills). */
    skills: string[];
    /** Source learning track this maps to. */
    track: { label: string; href: string };
    /** Whether the credential can be earned for free. */
    free: boolean;
}

export const CERTIFICATE_CATEGORIES: CertificateCategory[] = [
    'Finance',
    'Analytics',
    'Strategy',
    'Tools',
];

export const CERTIFICATES: Certificate[] = [
    {
        slug: 'financial-modelling-foundation',
        title: 'Financial Modelling Foundation',
        category: 'Finance',
        level: 'Foundation',
        summary:
            'Build a clean, driver-based three-statement model from a blank sheet — structure, schedules, and sanity checks.',
        hours: 18,
        assessment: '30-question quiz + a submitted model',
        skills: ['Three-statement modelling', 'Excel', 'Forecasting', 'Model auditing'],
        track: { label: 'Study Material', href: '/study' },
        free: true,
    },
    {
        slug: 'valuation-and-dcf',
        title: 'Valuation & DCF',
        category: 'Finance',
        level: 'Intermediate',
        summary:
            'From free cash flow to enterprise value — WACC, terminal value, sensitivity tables and defensible assumptions.',
        hours: 22,
        assessment: '40-question quiz + a DCF assignment',
        skills: ['DCF', 'WACC', 'Sensitivity analysis', 'Terminal value'],
        track: { label: 'Calculators', href: '/tools' },
        free: true,
    },
    {
        slug: 'data-analytics-with-python',
        title: 'Data Analytics with Python',
        category: 'Analytics',
        level: 'Intermediate',
        summary:
            'Load, clean, analyse and visualise real financial data with pandas, then tell the story with charts.',
        hours: 26,
        assessment: 'Notebook submission + auto-graded exercises',
        skills: ['Python', 'pandas', 'Data visualisation', 'EDA'],
        track: { label: 'Data Lab', href: '/data-lab' },
        free: true,
    },
    {
        slug: 'sql-for-analysts',
        title: 'SQL for Analysts',
        category: 'Analytics',
        level: 'Foundation',
        summary:
            'Query, join and aggregate like an analyst — window functions, CTEs and performance-minded patterns.',
        hours: 16,
        assessment: '35 auto-graded SQL challenges',
        skills: ['SQL', 'Window functions', 'CTEs', 'Query optimisation'],
        track: { label: 'Placement Prep', href: '/study/placement-prep' },
        free: true,
    },
    {
        slug: 'power-bi-dashboards',
        title: 'Power BI Dashboards',
        category: 'Tools',
        level: 'Intermediate',
        summary:
            'Model, DAX and ship decision-ready dashboards — from data model to a published report.',
        hours: 20,
        assessment: 'Dashboard submission + rubric review',
        skills: ['Power BI', 'DAX', 'Data modelling', 'Storytelling'],
        track: { label: 'Calculators', href: '/tools' },
        free: true,
    },
    {
        slug: 'market-sizing-and-strategy',
        title: 'Market Sizing & Strategy',
        category: 'Strategy',
        level: 'Advanced',
        summary:
            'TAM/SAM/SOM, Porter’s Five Forces and business-case structuring for real strategic decisions.',
        hours: 24,
        assessment: 'Case submission + 45-question quiz',
        skills: ['Market sizing', 'Porter’s Five Forces', 'Business cases', 'Strategy'],
        track: { label: 'Case Studies', href: '/case-studies' },
        free: false,
    },
    {
        slug: 'pgdm-strategy-professional',
        title: 'PGDM Strategy Professional',
        category: 'Strategy',
        level: 'Professional',
        summary:
            'Capstone credential covering all 14 PGDM subjects with a portfolio project and interview-forge defence.',
        hours: 120,
        assessment: 'Capstone project + proctored exam',
        skills: ['Corporate finance', 'Strategy', 'Analytics', 'Communication'],
        track: { label: 'PGDM Program', href: '/pgdm' },
        free: false,
    },
    {
        slug: 'excel-for-finance',
        title: 'Excel for Finance',
        category: 'Tools',
        level: 'Foundation',
        summary:
            'Master the finance workhorse: lookup patterns, dynamic arrays, pivot models and error-proofing.',
        hours: 14,
        assessment: '25-question quiz + workbook exercises',
        skills: ['Excel', 'Lookups', 'Dynamic arrays', 'Pivot tables'],
        track: { label: 'Study Material', href: '/study' },
        free: true,
    },
];

export function getCertificateBySlug(slug: string): Certificate | undefined {
    return CERTIFICATES.find((certificate) => certificate.slug === slug);
}

export function getFreeCertificates(): Certificate[] {
    return CERTIFICATES.filter((certificate) => certificate.free);
}

/**
 * Public credential base URL. Issued certificates append the credential ID so a
 * verifier can confirm authenticity.
 */
export const CERTIFICATE_VERIFY_BASE = 'https://kunwaranalytics.in/certificates';
