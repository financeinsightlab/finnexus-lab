import type { Metadata } from 'next';
import { PROJECTS, PROJECT_CATEGORIES } from '@/lib/projects';
import ProjectsClient from './ProjectsClient';

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
    return <ProjectsClient projects={PROJECTS} categories={PROJECT_CATEGORIES} />;
}
