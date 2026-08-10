// app/study/page.tsx — Study Material listing page

import type { Metadata } from 'next'
import { getPublishedStudyMaterials, getStudyCategories } from '@/lib/study'
import StudyClient from '@/components/study/StudyClient'
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Study Material | Kunwar Analytics',
  description:
    'Free study resources on finance, business analytics, research methods, data science, economics, and investment analysis. Articles, videos, courses, and downloadable notes for analysts, investors, and students.',
  alternates: { canonical: 'https://kunwaranalytics.in/study' },
  openGraph: {
    title: 'Study Material | Kunwar Analytics',
    description:
      'Free study resources on finance, business analytics, research methods, data science, economics, and investment analysis.',
    type: 'website',
    url: 'https://kunwaranalytics.in/study',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Material | Kunwar Analytics',
    description:
      'Free study resources on finance, business analytics, research methods, and investment analysis.',
  },
}

export const dynamic = 'force-dynamic'

export default async function StudyPage() {
  const [materials, categories] = await Promise.all([
    getPublishedStudyMaterials({ limit: 100 }),
    getStudyCategories(),
  ])

  // Serialize dates for client component (Prisma returns Date objects, client needs strings)
  const serializedMaterials = materials.map((m: any) => ({
    ...m,
    publishedAt: m.publishedAt?.toISOString() ?? null,
  }))

  const serializedCategories = categories.map((c: any) => ({
    ...c,
    _count: { materials: c._count?.materials ?? 0 },
  }))

  const crumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Study Material', url: 'https://kunwaranalytics.in/study' },
  ])

  return (
    <>
      <JsonLd data={crumbs} />
      <StudyClient
        materials={serializedMaterials as any}
        categories={serializedCategories as any}
      />
    </>
  )
}
