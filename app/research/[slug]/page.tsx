import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';
import HeroBackground from '@/components/ui/HeroBackground';
import Link from 'next/link';
import Tag from '@/components/ui/Tag';
import SaveButton from '@/components/ui/SaveButton';
import { formatDate } from '@/lib/utils';
import { getUnifiedResearchBySlug, getAllUnifiedResearch, mapSectorToCollection, RESEARCH_COLLECTIONS } from '@/lib/research-content';
import { renderBlocks } from '@/lib/blocks/renderer';
import { markdownToBlocks, type Block } from '@/lib/blocks/registry';
import { extractHeadings } from '@/lib/content-toc';
import {
  Calendar,
  User,
  BookOpen,
  Clock,
  Tag as TagIcon,
  Share2,
  ShieldCheck,
  List,
  Wrench,
  TrendingUp,
  ArrowRight,
  Award,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import React from 'react';
import CommentsSection from '@/components/comments/CommentsSection';
import { auth } from '@/auth';
import JsonLd, { articleSchema, breadcrumbSchema, speakableSchema } from '@/components/seo/JsonLd';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import { ContentPage, ContentLayout } from '@/components/content/ContentLayout';
import PromotionSidebar from '@/components/promotions/PromotionSidebar';
import ExplainThisWidget from '@/components/ai/ExplainThisWidget';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getUnifiedResearchBySlug(slug);

  if (!post) {
    return { title: 'Report Not Found | Kunwar Analytics' };
  }

  const title = `${post.title} | Research Intelligence | Kunwar Analytics`;
  const description = post.summary || 'Institutional market analysis and quantitative research.';

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `https://kunwaranalytics.in/research/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://kunwaranalytics.in/research/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      section: post.sector,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : ['/og/default.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.coverImage ? [post.coverImage] : ['/og/default.png'],
    },
  };
}

export async function generateStaticParams() {
  const allPosts = await getAllUnifiedResearch();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ResearchReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();

  const report = await getUnifiedResearchBySlug(slug);

  if (!report) {
    notFound();
  }

  const title = report.title;
  const summary = report.summary;
  const sector = report.sector;
  const coverImage = report.coverImage;
  const authorName = report.author;
  const publishedDateStr = report.date;
  const tags: string[] = report.tags || [];
  const readingTimeText = report.readingTime || `${Math.max(1, Math.ceil(report.wordCount / 225))} min read`;
  const pageCountText = `${report.pageCount} pages`;
  const reviewStatus = report.reviewStatus;

  // Resolve the content block tree
  let contentBlocks: Block[] = [];
  if (report.content) {
    contentBlocks = markdownToBlocks(report.content);
  }
  const renderedHtml = renderBlocks(contentBlocks);
  const headings = extractHeadings(contentBlocks, 3);

  // Fetch related reports
  const allReports = await getAllUnifiedResearch();
  const related = allReports.filter((p) => p.slug !== slug).slice(0, 3);

  // Contextual financial tools mapping
  const collectionKey = report.collectionSlug || mapSectorToCollection(sector);
  const relevantTools = (() => {
    if (collectionKey === 'quick-commerce') {
      return [
        { title: 'Quick Commerce Unit Economics Model', href: '/tools/q-commerce-model', desc: 'Dark store density & EBITDA model' },
        { title: 'DCF Valuation Studio', href: '/tools/dcf-valuation-model', desc: 'Enterprise cash flow forecasting' },
      ];
    }
    if (collectionKey === 'fintech-payments' || collectionKey === 'banking-bfsi') {
      return [
        { title: '3-Statement Financial Model', href: '/tools/3-statement-model', desc: 'Integrated P&L, balance sheet & cash flow' },
        { title: 'Financial Ratio Analyzer', href: '/tools/ratio-analyzer', desc: 'DuPont breakdown & solvency KPIs' },
      ];
    }
    if (collectionKey === 'tech-ai') {
      return [
        { title: 'AI Agent ROI Calculator', href: '/tools/ai-agent-roi-calculator', desc: 'Enterprise labor & compute payback' },
        { title: 'SaaS LTV/CAC Engine', href: '/tools/saas-ltv-cac-model', desc: 'Unit economic retention curves' },
      ];
    }
    return [
      { title: 'DCF Valuation Studio', href: '/tools/dcf-valuation-model', desc: 'Institutional cash flow valuation' },
      { title: 'WACC & Capital Cost Lab', href: '/tools/wacc-calculator', desc: 'Cost of equity & debt calibration' },
    ];
  })();

  const postSchema = articleSchema({
    title,
    description: summary,
    datePublished: publishedDateStr,
    url: `https://kunwaranalytics.in/research/${slug}`,
    authorName,
    image: coverImage,
    keywords: tags,
  });

  const metadataRows: Array<[string, string]> = [
    ['Review Standard', reviewStatus],
    ['Sector Focus', sector],
    ['Collection', report.collectionTitle],
    ['Document Length', pageCountText],
    ['Target Audience', 'Asset Managers, CXOs & Analysts'],
    ['Data Provenance', 'Verified Primary Filings & Micro-Data'],
  ];

  return (
    <>
      <JsonLd data={postSchema} />
      <div className="min-h-screen bg-background text-foreground">
        {/* ── HEADER HERO ── */}
        <header className="relative overflow-hidden border-b border-border bg-card/60 py-10 md:py-14">
          <HeroBackground />
          <ContentPage className="relative z-10">
            <div className="mb-7 flex items-center justify-between gap-4">
              <Breadcrumbs
                className=""
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Research', href: '/research' },
                  { label: title },
                ]}
              />
              <div className="flex items-center gap-3">
                <SaveButton slug={slug} type="research" title={title} />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Tag text={sector} variant="teal" />
                <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-xs text-secondary-foreground">
                  {pageCountText}
                </span>
                <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" /> {readingTimeText}
                </span>
                <span className="flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-[11px] text-secondary-foreground">
                  <ShieldCheck className="h-3 w-3 text-primary" /> {reviewStatus}
                </span>
              </div>

              {/* Title */}
              <h1 className="max-w-[54ch] text-2xl sm:text-3xl md:text-[2.75rem] font-extrabold leading-tight tracking-tight text-foreground">
                {title}
              </h1>

              {/* Executive Summary Box */}
              {summary && (
                <div className="max-w-[76ch] border-l-4 border-brand bg-brand/5 p-4 rounded-r-2xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand block mb-1">
                    Executive Summary &amp; Thesis
                  </span>
                  <p className="text-sm md:text-base leading-relaxed text-content-primary">
                    {summary}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-6 border-t border-border pt-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Published {formatDate(publishedDateStr)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-emerald-500" />
                  <span>{report.wordCount.toLocaleString()} words</span>
                </div>
              </div>
            </div>
          </ContentPage>
        </header>

        {/* ── COVER IMAGE ── */}
        {coverImage && (
          <ContentPage className="relative z-20 -mt-6">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt={title}
                className="h-56 w-full object-cover object-center md:h-[420px]"
                loading="eager"
              />
            </div>
          </ContentPage>
        )}

        {/* Promotion slot: CONTENT_TOP */}
        <PromotionSlot slot="CONTENT_TOP" path={`/research/${slug}`} tags={[...tags, sector]} />

        {/* ── MAIN CONTENT & SIDEBAR ── */}
        <ContentPage className="py-10 md:py-14">
          <ContentLayout
            asideSticky
            aside={
              <>
                <PromotionSidebar path={`/research/${slug}`} tags={[...tags, sector]} />

                {/* Institutional specifications */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <BookOpen className="h-4 w-4" /> Report Specifications
                  </h3>
                  <dl className="mt-4 space-y-2.5 text-xs">
                    {metadataRows.map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-3 border-b border-border/70 pb-2 last:border-b-0 last:pb-0">
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="text-right font-semibold text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Custom Research Advisory CTA Card */}
                <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 via-card to-card p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand mb-2">
                    <TrendingUp className="w-4 h-4" /> Commission Analysis
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-1">
                    Need Custom Modeling for This Sector?
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Commission tailored DCF models, competitor benchmarking, or board memos with our research desk.
                  </p>
                  <Link
                    href={`/contact?subject=Custom+Research+Inquiry:+${encodeURIComponent(title)}&budget=Enterprise`}
                    className="w-full text-center block px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm"
                  >
                    Request Scoping Proposal →
                  </Link>
                </div>

                {/* Grounded AI Tutor */}
                <ExplainThisWidget contextTitle={title} />

                {/* Contextual Financial Tools */}
                {relevantTools.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                      <Wrench className="h-4 w-4" /> Relevant Financial Models
                    </h3>
                    <div className="mt-3 space-y-2.5">
                      {relevantTools.map((t) => (
                        <Link
                          key={t.href}
                          href={t.href}
                          className="group block p-3 rounded-xl border border-border bg-secondary/40 hover:border-brand/40 hover:bg-accent transition-all"
                        >
                          <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                            {t.title} <ArrowRight className="w-3 h-3" />
                          </span>
                          <span className="text-[11px] text-muted-foreground block mt-0.5">
                            {t.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contents — generated from the block tree */}
                {headings.length > 1 && (
                  <nav
                    aria-label="Report contents"
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                      <List className="h-4 w-4" /> Contents
                    </h3>
                    <ol className="mt-3 space-y-2 text-sm">
                      {headings.map((heading) => (
                        <li key={heading.id} className={heading.level === 3 ? 'pl-4' : ''}>
                          <a
                            href={`#${heading.id}`}
                            className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-xs leading-snug block"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                {/* Related research */}
                {related.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                      <Share2 className="h-4 w-4" /> Related Research
                    </h3>
                    <div className="mt-4 space-y-3">
                      {related.map((rel) => (
                        <Link
                          key={rel.slug}
                          href={`/research/${rel.slug}`}
                          className="group block rounded-xl border border-border bg-secondary/40 p-3 transition-colors hover:border-primary/40 hover:bg-accent"
                        >
                          {rel.coverImage && (
                            <div className="mb-2 h-20 w-full overflow-hidden rounded-lg border border-border bg-muted">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={rel.coverImage}
                                alt={rel.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <p className="mb-1 font-mono text-[10px] text-primary">{rel.sector}</p>
                          <h4 className="line-clamp-2 text-xs font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                            {rel.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Citation */}
                <div className="space-y-2 rounded-2xl border border-border bg-secondary/50 p-4 text-[11px] text-muted-foreground">
                  <p className="font-semibold text-foreground">How to cite this report</p>
                  <p className="break-words rounded-lg border border-border bg-card p-2 font-mono text-[10px]">
                    Kunwar Analytics (2026). &quot;{title}&quot;. Research Intelligence Desk. https://kunwaranalytics.in/research/{slug}
                  </p>
                </div>
              </>
            }
          >
            {/* SEO/GEO: BreadcrumbList + Article + Speakable structured data */}
            <JsonLd data={breadcrumbSchema([
              { name: 'Home', url: 'https://kunwaranalytics.in' },
              { name: 'Research', url: 'https://kunwaranalytics.in/research' },
              { name: title, url: `https://kunwaranalytics.in/research/${slug}` },
            ])} />
            <JsonLd data={articleSchema({
              title,
              description: summary,
              url: `https://kunwaranalytics.in/research/${slug}`,
              image: coverImage,
              authorName: authorName || 'Kunwar Analytics',
              keywords: tags,
            })} />
            <JsonLd data={speakableSchema(['.cms-content', '.article-body'])} />

            <article className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-8 lg:p-10">
              {/* Global CMS renderer output */}
              <div
                className="cms-content prose-content article-body"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />

              {/* Promotion slot: CONTENT_MIDDLE */}
              <PromotionSlot slot="CONTENT_MIDDLE" path={`/research/${slug}`} tags={[...tags, sector]} className="mt-10 w-full" />

              {/* Research Methodology & Independence Disclosures (GEO + Credibility standard) */}
              <div className="mt-12 rounded-2xl border border-border bg-surface p-6 text-xs text-muted-foreground space-y-3">
                <div className="flex items-center gap-2 font-bold text-foreground uppercase tracking-wider text-[11px]">
                  <AlertCircle className="w-4 h-4 text-brand" /> Research Methodology &amp; Analytical Disclosures
                </div>
                <p className="leading-relaxed">
                  <strong>Data Sources &amp; Verification:</strong> Primary inputs for this publication were synthesized from published corporate filings (MCA, BSE, NSE), audited annual reports, conference call transcripts, and ground-level micro-fulfillment telemetry. Projections reflect scenario-based mathematical modeling and do not represent guaranteed forward outcomes.
                </p>
                <p className="leading-relaxed">
                  <strong>Research Independence:</strong> Kunwar Analytics operates as an independent research publisher. The research desk does not accept corporate sponsorship to produce favorable coverage on any covered instrument or issuer.
                </p>
                <p className="leading-relaxed text-[11px]">
                  <strong>Non-Advisory Notice:</strong> This document is intended exclusively for educational and strategic analysis. It does not constitute investment advice, equity brokerage solicitation, or tax advisory services.
                </p>
              </div>

              {/* Commercial In-Article Conversion Banner */}
              <div className="mt-8 rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 via-surface to-surface p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand mb-2">
                  <Award className="w-4 h-4" /> Bespoke Research &amp; Financial Modeling
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-content-primary mb-2">
                  Need tailored financial models or due diligence on this sector?
                </h3>
                <p className="text-xs sm:text-sm text-content-muted leading-relaxed mb-6">
                  Our research analysts work directly with corporate strategy desks, PE/VC funds, and founders on confidential financial modeling, competitor benchmarking, and market-entry analysis.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/contact?subject=Custom+Research+Inquiry:+${encodeURIComponent(title)}&budget=Enterprise`}
                    className="px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    Request Research Scoping Proposal <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/services"
                    className="px-4 py-2.5 rounded-xl border border-border bg-surface text-xs font-semibold text-content-primary hover:bg-surface-muted transition-colors"
                  >
                    View Advisory Capabilities
                  </Link>
                </div>
              </div>

              {/* Topic Tags */}
              {tags.length > 0 && (
                <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
                  <span className="mr-2 flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground">
                    <TagIcon className="h-3.5 w-3.5 text-primary" /> Topics:
                  </span>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-border bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:bg-accent"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-10 border-t border-border pt-8">
                <CommentsSection
                  postId={slug}
                  isLoggedIn={Boolean(session?.user)}
                />
              </div>
            </article>
          </ContentLayout>
        </ContentPage>
      </div>

      <PromotionSlot slot="CONTENT_BOTTOM" path={`/research/${slug}`} tags={[...tags, sector]} />
      <RelatedContentSection sourceType="RESEARCH" sourceSlug={slug} />
      <RelatedContentSection sourceType="RESEARCH" sourceSlug={slug} linkKind="CTA" />
      <ContentFaq relatedType="RESEARCH" relatedSlug={slug} />
      <PromotionSlot slot="FOOTER" path={`/research/${slug}`} tags={[...tags, sector]} />
    </>
  );
}
