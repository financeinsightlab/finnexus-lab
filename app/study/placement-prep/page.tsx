// app/study/placement-prep/page.tsx — Placement Preparation Tracker (inside Study section)

import type { Metadata } from 'next'
import PlacementPrepClient from '@/components/placement-prep/PlacementPrepClient'
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Placement Preparation Tracker | Study Material | Kunwar Analytics',
  description:
    'A free 60-day placement preparation plan for Finance (Major) + Business Analytics (Minor) students targeting 15 LPA+ roles. Daily tracker, learning material with Q&A, formulas, concepts, and a portfolio lab with project ideas for equity research, credit risk, and BFSI analytics.',
  alternates: { canonical: 'https://kunwaranalytics.in/study/placement-prep' },
  openGraph: {
    title: 'Placement Preparation Tracker | Study Material | Kunwar Analytics',
    description:
      '60-day placement prep plan with daily tracker, finance & analytics learning material, Q&A, formulas, and portfolio project ideas for 15 LPA+ roles.',
    type: 'website',
    url: 'https://kunwaranalytics.in/study/placement-prep',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Placement Preparation Tracker | Study Material | Kunwar Analytics',
    description:
      '60-day placement prep plan with daily tracker, finance & analytics learning material, Q&A, formulas, and portfolio project ideas for 15 LPA+ roles.',
  },
  keywords: [
    'placement preparation',
    'finance interview preparation',
    'business analytics placement',
    '60 day placement plan',
    'equity research interview',
    'credit risk analyst prep',
    'BFSI analytics',
    'DCF valuation interview questions',
    'SQL for finance',
    'Power BI for analytics',
    'aptitude preparation',
    'HR interview questions',
  ],
}

export const dynamic = 'force-dynamic'

export default function PlacementPrepPage() {
  const crumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Study Material', url: 'https://kunwaranalytics.in/study' },
    { name: 'Placement Preparation', url: 'https://kunwaranalytics.in/study/placement-prep' },
  ])

  const courseLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Placement Preparation Tracker — Road to 15 LPA+',
    description:
      'A 60-day placement preparation plan covering Finance, Business Analytics, English, Aptitude, HR/Resume, Future Skills, and Mock interviews. Includes daily tracker, learning material with Q&A, formulas, concepts, and a portfolio lab.',
    provider: {
      '@type': 'Organization',
      name: 'Kunwar Analytics',
      url: 'https://kunwaranalytics.in',
    },
    url: 'https://kunwaranalytics.in/study/placement-prep',
    inLanguage: 'en',
    educationalLevel: 'PGDM / MBA',
    about: [
      { '@type': 'Thing', name: 'Finance' },
      { '@type': 'Thing', name: 'Business Analytics' },
      { '@type': 'Thing', name: 'Aptitude' },
      { '@type': 'Thing', name: 'Interview Preparation' },
    ],
    hasPart: [
      { '@type': 'Course', name: 'Daily Tracker (60-day plan)' },
      { '@type': 'Course', name: 'Learning Material & Q&A' },
      { '@type': 'Course', name: 'Portfolio Lab' },
    ],
  }

  return (
    <>
      <JsonLd data={crumbs} />
      <JsonLd data={courseLd} />
      <PlacementPrepClient />
    </>
  )
}
