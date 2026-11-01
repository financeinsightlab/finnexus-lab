// app/(dashboard)/case-studies/[slug]/page.tsx — Institutional Case Study Narrative
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/content';
import { prisma } from '@/lib/prisma';
import { markdownToBlocks } from '@/lib/blocks/registry';
import { renderBlocks } from '@/lib/blocks/renderer';
import JsonLd, { articleSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import ResearchSubNav from '@/components/hub-navigation/ResearchSubNav';
import BreadcrumbNav from '@/components/hub-navigation/BreadcrumbNav';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // 1. Check CMS Post
  try {
    const dbPost = await prisma.post.findUnique({
      where: { slug },
      select: { title: true, excerpt: true, featuredImage: true, published: true, type: true },
    });
    if (dbPost && dbPost.published && dbPost.type === 'CASE_STUDY') {
      return {
        title: `${dbPost.title} | Case Studies | Kunwar Analytics`,
        description: dbPost.excerpt || 'Corporate strategy and financial transformation case study.',
        alternates: { canonical: `https://kunwaranalytics.in/case-studies/${slug}` },
        openGraph: {
          title: dbPost.title,
          description: dbPost.excerpt || '',
          url: `https://kunwaranalytics.in/case-studies/${slug}`,
          type: 'article',
          images: dbPost.featuredImage ? [{ url: dbPost.featuredImage }] : ['/og/default.png'],
        },
      };
    }
  } catch {}

  // 2. Check local MDX
  const study = await getCaseStudyBySlug(slug);
  if (!study) {
    return { title: 'Case Study Not Found | Kunwar Analytics' };
  }

  return {
    title: `${study.title} | Case Studies | Kunwar Analytics`,
    description: study.outcome || 'Strategic transformation, operations, and financial analysis case study.',
    alternates: { canonical: `https://kunwaranalytics.in/case-studies/${slug}` },
    openGraph: {
      title: study.title,
      description: study.outcome || '',
      url: `https://kunwaranalytics.in/case-studies/${slug}`,
      type: 'article',
      images: study.coverImage ? [{ url: study.coverImage }] : ['/og/default.png'],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;

  // Check CMS post first
  let dbPost: any = null;
  try {
    dbPost = await prisma.post.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });
  } catch {}

  const localStudy = await getCaseStudyBySlug(slug);

  if ((!dbPost || !dbPost.published) && !localStudy) {
    notFound();
  }

  const title = dbPost?.title || localStudy?.title || 'Case Study';
  const industry = dbPost?.category || localStudy?.industry || 'Strategic Advisory';
  const engagementType = localStudy?.engagementType || 'Corporate Strategy';
  const clientType = localStudy?.clientType || 'Enterprise Client';
  const timeline = localStudy?.timeline || 'Multi-Week Engagement';
  const outcome = dbPost?.excerpt || localStudy?.outcome || '';
  const dateStr = dbPost?.publishedAt?.toISOString() || dbPost?.createdAt?.toISOString() || localStudy?.date || new Date().toISOString();
  const frameworks = localStudy?.frameworks || ['Value Driver Trees', 'Scenario Modeling', 'Unit Economics Optimization'];
  const tags = dbPost?.tags || localStudy?.tags || [];

  // Content conversion to HTML
  let contentHtml = '';
  if (dbPost?.content) {
    const blocks = markdownToBlocks(dbPost.content);
    contentHtml = renderBlocks(blocks);
  } else if (localStudy?.content) {
    const blocks = markdownToBlocks(localStudy.content);
    contentHtml = renderBlocks(blocks);
  }

  const allStudies = getAllCaseStudies();
  const relatedStudies = allStudies.filter((s) => s.slug !== slug).slice(0, 3);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Research', href: '/research' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: title },
  ];

  const jsonLdArticle = articleSchema({
    title,
    description: outcome,
    datePublished: dateStr,
    url: `https://kunwaranalytics.in/case-studies/${slug}`,
    authorName: 'Kunwar Analytics Strategic Advisory',
    keywords: tags,
  });

  const jsonLdBreadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Case Studies', url: 'https://kunwaranalytics.in/case-studies' },
    { name: title, url: `https://kunwaranalytics.in/case-studies/${slug}` },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={jsonLdArticle} />
      <JsonLd data={jsonLdBreadcrumbs} />

      <ResearchSubNav
        breadcrumbs={breadcrumbs}
        title="Engagement Case Study"
        subtitle="Empirical transformation narrative, strategic framework execution, and verified operational outcomes."
        badge="CASE STUDY"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <BreadcrumbNav items={breadcrumbs} className="mb-6" />

        {/* ── HERO BANNER ── */}
        <header className="rounded-3xl border border-border bg-card p-6 md:p-10 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand/10 text-brand border border-brand/20">
              {industry}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-surface-muted text-content-muted border border-border">
              {engagementType}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-content-muted border border-border">
              ⏱️ {timeline}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-content-primary mb-4 leading-tight max-w-4xl">
            {title}
          </h1>

          {outcome && (
            <div className="border-l-4 border-brand pl-4 py-1.5 my-4 bg-brand/5 rounded-r-xl max-w-4xl">
              <p className="text-sm md:text-base font-medium text-content-primary leading-relaxed">
                <span className="font-bold text-brand uppercase text-xs tracking-wider block mb-1">Key Outcome Delivered</span>
                {outcome}
              </p>
            </div>
          )}

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border text-xs">
            <div>
              <span className="text-content-muted block mb-1">Client Profile</span>
              <span className="font-semibold text-content-primary flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-brand" /> {clientType}
              </span>
            </div>
            <div>
              <span className="text-content-muted block mb-1">Sector Focus</span>
              <span className="font-semibold text-content-primary flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-brand" /> {industry}
              </span>
            </div>
            <div>
              <span className="text-content-muted block mb-1">Delivery Timeframe</span>
              <span className="font-semibold text-content-primary flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand" /> {timeline}
              </span>
            </div>
            <div>
              <span className="text-content-muted block mb-1">Review Standard</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Executive Verified
              </span>
            </div>
          </div>
        </header>

        <PromotionSlot slot="CONTENT_TOP" path={`/case-studies/${slug}`} tags={tags} />

        {/* ── TWO COLUMN BODY: Article Body + Sidebar ── */}
        <div className="grid gap-8 lg:grid-cols-12 mt-6">
          {/* Main Case Content */}
          <article className="lg:col-span-8 rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-sm">
            <div
              className="cms-content prose-content article-body"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Frameworks Applied */}
            {frameworks.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-bold uppercase tracking-wider text-content-muted mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand" /> Quantitative Frameworks Applied
                </h3>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map((fw) => (
                    <span
                      key={fw}
                      className="px-3 py-1.5 rounded-xl border border-border bg-surface text-xs font-semibold text-content-primary"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Commercial In-Article Conversion Banner */}
            <div className="mt-12 rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 via-surface to-surface p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand mb-2">
                <Award className="w-4 h-4" /> Strategic Advisory &amp; Due Diligence
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-content-primary mb-2">
                Need similar analytical depth for your team or deal?
              </h3>
              <p className="text-xs sm:text-sm text-content-muted leading-relaxed mb-6">
                Commission custom valuation models, competitor benchmarking, unit economics teardowns, or board-ready investment presentations.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/contact?subject=Custom+Research+Inquiry:+${encodeURIComponent(title)}&budget=Enterprise`}
                  className="px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-colors shadow-sm inline-flex items-center gap-1.5"
                >
                  Request Advisory Proposal <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/services"
                  className="px-4 py-2.5 rounded-xl border border-border bg-surface text-xs font-semibold text-content-primary hover:bg-surface-muted transition-colors"
                >
                  Explore Advisory Services
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Commercial Inquiry Card */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand mb-3">
                <TrendingUp className="w-4 h-4" /> Commission Analysis
              </div>
              <h4 className="text-sm font-bold text-content-primary mb-2">
                Bespoke Research Engagements
              </h4>
              <p className="text-xs text-content-muted leading-relaxed mb-4">
                We work directly with founders, investment funds, and corporate strategy teams on confidential modeling and market-entry analysis.
              </p>
              <Link
                href="/contact?subject=Commission+Custom+Financial+Research"
                className="w-full text-center block px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm"
              >
                Inquire With Research Desk →
              </Link>
            </div>

            {/* Related Case Studies */}
            {relatedStudies.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-brand" /> Related Engagements
                </h4>
                <div className="space-y-3">
                  {relatedStudies.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/case-studies/${r.slug}`}
                      className="group block p-3 rounded-xl border border-border bg-surface hover:border-brand/40 hover:bg-brand-muted/20 transition-all"
                    >
                      <span className="text-[10px] font-mono text-brand block mb-1">{r.industry}</span>
                      <h5 className="text-xs font-semibold text-content-primary group-hover:text-brand line-clamp-2 leading-snug">
                        {r.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Citation box */}
            <div className="rounded-2xl border border-border bg-surface p-4 text-xs text-content-muted">
              <span className="font-semibold text-content-primary block mb-1">Citation Format</span>
              <p className="font-mono text-[11px] bg-card p-2 rounded-lg border border-border break-words">
                Kunwar Analytics (2026). &quot;{title}&quot;. Case Study Series. https://kunwaranalytics.in/case-studies/{slug}
              </p>
            </div>
          </aside>
        </div>

        <PromotionSlot slot="CONTENT_BOTTOM" path={`/case-studies/${slug}`} tags={tags} />
        <RelatedContentSection sourceType="PAGE" sourceSlug="case-studies" />
        <ContentFaq relatedType="PAGE" relatedSlug="case-studies" />
        <PromotionSlot slot="FOOTER" path={`/case-studies/${slug}`} tags={tags} />
      </div>
    </div>
  );
}
