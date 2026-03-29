import type { Metadata } from 'next';
import AlgoliaSearch from '@/components/research/AlgoliaSearch';
import { getAllResearchFromCMS } from '@/lib/contentful';
import { prisma } from "@/lib/prisma"
import Link from 'next/link';
import React from "react"

export const metadata: Metadata = {
  title: 'Research | FinNexus Lab',
  description:
    'Search and explore in-depth research reports and strategic insights across India’s market sectors.',
};

export default async function ResearchPage() {
  // 1. Fetch from Contentful (Legacy)
  const legacyReports = await getAllResearchFromCMS();
  
  // 2. Fetch from our New In-House CMS (Prisma)
  let dbReports: any[] = []
  try {
    dbReports = await (prisma as any).post.findMany({
      where: { type: 'RESEARCH', published: true },
      orderBy: { createdAt: 'desc' }
    })
  } catch (e) {
    console.error("New CMS fetch failed (tables might not be ready):", e)
  }

  // Combine both for now to ensure no data loss during transition
  const allReports = [
    ...dbReports.map(r => ({
      slug: r.slug,
      title: r.title,
      summary: r.excerpt,
      sector: 'Strategic Research',
      author: 'FinNexus Admin',
      date: r.createdAt.toISOString(),
      featured: true, // New posts default to featured for visibility
      isNewCMS: true
    })),
    ...legacyReports
  ];

  const featuredReports = allReports.filter((r) => r.featured);

  return (
    <>
      {/* HERO SECTION */}
      <header className="bg-[#1A2B3C] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#0D6E6E] mb-5 text-sm font-semibold tracking-wide">
            Research Library
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            In-Depth Analysis
          </h1>

          <p className="text-xl text-white/80 max-w-2xl">
            Comprehensive research reports on Indian market sectors, with detailed analysis,
            data-driven insights, and strategic recommendations.
          </p>
        </div>
      </header>

      {/* FEATURED REPORTS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-[#1A2B3C] mb-6">
          Featured Reports
        </h2>

        {featuredReports.length === 0 ? (
          <p className="text-gray-500">No featured reports yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReports.map((report: any) => (
              <Link
                key={report.slug}
                href={report.isNewCMS ? `/research/${report.slug}` : `/research/${report.slug}`}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition group"
              >
                <div className="flex justify-between items-start">
                   <p className="text-sm text-[#0D6E6E] font-medium">
                    {report.sector}
                  </p>
                  {report.isNewCMS && (
                    <span className="px-2 py-0.5 bg-teal-500/10 text-teal-600 text-[10px] font-bold rounded uppercase tracking-wider">
                      New CMS
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-lg font-semibold text-[#1A2B3C] group-hover:text-teal-700 transition-colors">
                  {report.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {report.summary}
                </p>

                <div className="mt-4 text-xs text-gray-500 flex justify-between">
                  <span>{report.author}</span>
                  <span>{new Date(report.date).toDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* SEARCH (ALGOLIA) */}
      <AlgoliaSearch />
    </>
  );
}