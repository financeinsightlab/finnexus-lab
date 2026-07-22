import React from 'react'

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Renders JSON-LD structured data as a <script type="application/ld+json"> tag.
 * Use this component to add schema.org structured data to any page for SEO/GEO.
 *
 * @example
 * <JsonLd data={{
 *   '@context': 'https://schema.org',
 *   '@type': 'Article',
 *   headline: 'My Article',
 *   ...
 * }} />
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Pre-built Organization schema for the entire site.
 * Rendered once in the root layout.
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kunwar Analytics',
  url: 'https://kunwaranalytics.in',
  logo: 'https://kunwaranalytics.in/icons/icon-512.png',
  description:
    'Financial intelligence platform providing data-driven insights on markets, strategy, and capital. Institutional-quality research, business analytics, and educational study materials.',
  sameAs: [
    'https://kunwaranalytics.in',
  ],
  areaServed: 'Global',
  knowsAbout: [
    'Financial Analysis',
    'Market Research',
    'Business Analytics',
    'Investment Analysis',
    'Data Science',
    'Economics',
    'Quantitative Research',
    'Portfolio Management',
  ],
}

/**
 * Pre-built WebSite schema with SearchAction for sitelinks search box.
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kunwar Analytics',
  url: 'https://kunwaranalytics.in',
  description:
    'Data-driven insights on markets, strategy and capital. Institutional-quality research, business analytics, and study materials.',
  publisher: {
    '@type': 'Organization',
    name: 'Kunwar Analytics',
    url: 'https://kunwaranalytics.in',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://kunwaranalytics.in/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

/**
 * BreadcrumbList schema generator.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Article schema generator for blog/research posts.
 */
export function articleSchema(opts: {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  authorName?: string
  keywords?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    datePublished: opts.datePublished,
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    author: {
      '@type': 'Person',
      name: opts.authorName || 'Kunwar Analytics',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kunwar Analytics',
      url: 'https://kunwaranalytics.in',
    },
    ...(opts.keywords ? { keywords: opts.keywords.join(', ') } : {}),
  }
}

/**
 * Course schema generator for study materials.
 */
export function courseSchema(opts: {
  title: string
  description: string
  url: string
  image?: string
  providerName?: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: opts.title,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    provider: {
      '@type': 'Organization',
      name: opts.providerName || 'Kunwar Analytics',
      url: 'https://kunwaranalytics.in',
    },
    ...(opts.category ? { about: opts.category } : {}),
  }
}

/**
 * FAQPage schema generator for question-based content (great for GEO).
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
