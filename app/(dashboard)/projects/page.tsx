import type { Metadata } from 'next';
import { PROJECTS, PROJECT_CATEGORIES } from '@/lib/projects';
import ProjectsClient from './ProjectsClient';
import ResearchSubNav from '@/components/hub-navigation/ResearchSubNav';

export const metadata: Metadata = {
    title: 'Projects | Kunwar Analytics',
    description:
        'A portfolio of analytics, financial modelling, market research and automation projects — problem, approach and measured outcomes.',
    alternates: { canonical: 'https://kunwaranalytics.in/projects' },
    openGraph: {
        title: 'Projects | Kunwar Analytics',
        description:
            'Analytics, financial modelling and strategy projects with quantified outcomes.',
        url: 'https://kunwaranalytics.in/projects',
        type: 'website',
    },
};

export default function ProjectsPage() {
    return (
        <>
            <ResearchSubNav
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Research', href: '/research' },
                    { label: 'Projects', href: '/projects' },
                ]}
                title="Analytics & Modelling Portfolio Projects"
                subtitle="Quantified projects across valuation, econometric modeling, market research, and automation engines."
                badge="PORTFOLIO"
            />
            <ProjectsClient projects={PROJECTS} categories={PROJECT_CATEGORIES} />
        </>
    );
}
