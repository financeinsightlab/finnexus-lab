// app/study/page.tsx — Study Material listing page

import type { Metadata } from 'next'
import {
  getPublishedStudyMaterials,
  getStudyCategories,
  serializeStudyMaterial,
  serializeStudyCategory,
  type StudyMaterialWithCategory,
  type StudyCategoryWithCount,
} from '@/lib/study'
import StudyClient from '@/components/study/StudyClient'
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd'
import PromotionSlot from '@/components/promotions/PromotionSlot'

export const metadata: Metadata = {
  title: 'Study Material | Kunwar Analytics',
  description: 'Structured study material for finance and analytics: concept notes, formula sheets, placement prep and revision courses for PGDM and CFA-style exams.',
  alternates: { canonical: 'https://kunwaranalytics.in/study' },
  openGraph: {
    images: ['/og/default.png'],
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
  let materials: StudyMaterialWithCategory[] = [];
  let categories: StudyCategoryWithCount[] = [];
  try {
    [materials, categories] = await Promise.all([
      getPublishedStudyMaterials({ limit: 100 }),
      getStudyCategories(),
    ]);
  } catch {
    // DB unreachable (local dev) — render the shell with empty shelves
  }

  // Serialize dates for the client component (Prisma returns Date objects).
  const serializedMaterials = materials.map(serializeStudyMaterial)
  const serializedCategories = categories.map(serializeStudyCategory)

  const crumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Study Material', url: 'https://kunwaranalytics.in/study' },
  ])

  return (
    <>
      <JsonLd data={crumbs} />
      <PromotionSlot slot="CONTENT_TOP" path="/study" />
      <StudyClient
        materials={serializedMaterials}
        categories={serializedCategories}
      />
      <PromotionSlot slot="CONTENT_BOTTOM" path="/study" />
      <PromotionSlot slot="FOOTER" path="/study" />
    </>
  )
}
