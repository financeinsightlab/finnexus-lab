import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import HeroBackground from '@/components/ui/HeroBackground';
import Link from 'next/link';
import Tag from '@/components/ui/Tag';
import SaveButton from '@/components/ui/SaveButton';
import { formatDate } from '@/lib/utils';
import { getResearchBySlug, getAllResearch } from '@/lib/content';
import { prisma } from '@/lib/prisma';
import { renderBlocks } from '@/lib/blocks/renderer';
import { markdownToBlocks, type Block } from '@/lib/blocks/registry';
import { extractHeadings } from '@/lib/content-toc';
import { ChevronLeft, Calendar, User, BookOpen, Clock, Tag as TagIcon, Share2, ShieldCheck, List } from 'lucide-react';
import React from 'react';
import { CommentSection } from '@/components/ui/CommentSection';
import JsonLd, { articleSchema } from '@/components/seo/JsonLd';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import { ContentPage, ContentLayout } from '@/components/content/ContentLayout';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const dbPost = await (prisma as any).post.findUnique({ where: { slug } });
    if (dbPost && dbPost.published) {
      return {
        title: `${dbPost.title} | Kunwar Analytics Research`,
        description: dbPost.excerpt || 'Institutional market analysis and quantitative research.',
        alternates: { canonical: `/research/${slug}` },
        openGraph: {
          title: dbPost.title,
          description: dbPost.excerpt || '',
          url: `https://kunwaranalytics.in/research/${slug}`,
          type: 'article',
          images: dbPost.featuredImage ? [{ url: dbPost.featuredImage }] : [],
        },
      };
    }
  } catch (e) {}

  const post = await getResearchBySlug(slug);
  if (!post) return { title: 'Report Not Found | Kunwar Analytics' };

  return {
    title: `${post.title} | Kunwar Analytics Research`,
    description: post.summary,
    alternates: { canonical: `/research/${slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://kunwaranalytics.in/research/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export async function generateStaticParams() {
  const allPosts = getAllResearch();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ResearchReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Check CMS post first
  let dbPost: any = null;
  try {
    dbPost = await (prisma as any).post.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });
  } catch (e) {}

  // 2. Fetch local MDX post as fallback or metadata enrichment
  const localPost = await getResearchBySlug(slug);

  if (!dbPost && !localPost) {
    notFound();
  }

  // Unified metadata resolution
  const title = dbPost?.title || localPost?.title || 'Institutional Research Report';
  const summary = dbPost?.excerpt || localPost?.summary || '';
  const sector = dbPost?.sector || localPost?.sector || (dbPost?.tags?.[0] ? String(dbPost.tags[0]) : 'Strategic Research');
  const coverImage = dbPost?.featuredImage || localPost?.coverImage || undefined;
  const authorName = dbPost?.author?.name || localPost?.author || 'Kunwar Analytics Research Desk';
  const dateObj = dbPost?.publishedAt || dbPost?.createdAt || localPost?.date || new Date();
  const publishedDateStr = dateObj instanceof Date ? dateObj.toISOString() : String(dateObj);
  const pageCount = dbPost?.pageCount || localPost?.pageCount || 55;
  const tags: string[] = Array.isArray(dbPost?.tags) && dbPost.tags.length > 0
    ? dbPost.tags
    : (localPost?.tags || []);
  const readingTimeText = dbPost?.estimatedReadingTime
    ? `${dbPost.estimatedReadingTime} min read`
    : (localPost?.readingTime || '28 min read');

  // Resolve the content block tree once — used for rendering AND the contents sidebar.
  let contentBlocks: Block[] = [];
  if (dbPost?.blockContent?.blocks && Array.isArray(dbPost.blockContent.blocks) && dbPost.blockContent.blocks.length > 0) {
    contentBlocks = dbPost.blockContent.blocks;
  } else if (dbPost?.content) {
    contentBlocks = markdownToBlocks(dbPost.content);
  } else if (localPost?.content) {
    contentBlocks = markdownToBlocks(localPost.content);
  }
  const renderedHtml = renderBlocks(contentBlocks);
  const headings = extractHeadings(contentBlocks, 3);

  // Fetch related reports
  const allReports = getAllResearch();
  const related = allReports.filter((p) => p.slug !== slug).slice(0, 3);

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
    ['Classification', 'Institutional Grade'],
    ['Sector', sector],
    ['Document length', `${pageCount} pages`],
    ['Target audience', 'Asset Managers & CXOs'],
    ['Methodology', 'Quantitative & Field'],
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
              <Link
                href="/research"
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Research Library
              </Link>
              <div className="flex items-center gap-3">
                <SaveButton slug={slug} type="research" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Tag text={sector} variant="teal" />
                <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-xs text-secondary-foreground">
                  {pageCount} pages
                </span>
                <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" /> {readingTimeText}
                </span>
                <span className="flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-[11px] text-secondary-foreground">
                  <ShieldCheck className="h-3 w-3 text-primary" /> Institutional Grade
                </span>
              </div>

              {/* Long-form headings stay readable even on very wide screens */}
              <h1 className="max-w-[52ch] text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-[2.75rem]">
                {title}
              </h1>

              {summary && (
                <p className="max-w-[72ch] border-l-2 border-primary/50 pl-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {summary}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 border-t border-border pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{formatDate(publishedDateStr)}</span>
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
              />
            </div>
          </ContentPage>
        )}

        {/* ── MAIN CONTENT & SIDEBAR ── */}
        <ContentPage className="py-10 md:py-14">
          <ContentLayout
            asideSticky
            aside={
              <>
                {/* Institutional metadata */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <BookOpen className="h-4 w-4" /> Institutional Metadata
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

                {/* Contents — generated from the CMS block tree, no extra queries */}
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
                            className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                    Kunwar Analytics (2026). &quot;{title}&quot;. Kunwar Strategic Industries Desk. https://kunwaranalytics.in/research/{slug}
                  </p>
                </div>
              </>
            }
          >
            <article className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-8 lg:p-10">
              {/* Global CMS renderer output: prose stays readable, tables/figures/
                  diagrams/code automatically span the full article width. */}
              <div
                className="cms-content prose-content article-body"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />

              {/* Topic Tags */}
              {tags.length > 0 && (
                <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-7">
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
              <div className="mt-12 border-t border-border pt-10">
                <CommentSection
                  postId={dbPost?.id}
                  currentPath={`/research/${slug}`}
                />
              </div>
            </article>
          </ContentLayout>
        </ContentPage>
      </div>
      <PromotionSlot placement="RESEARCH_PAGE" path={`/research/${slug}`} contentType="RESEARCH" />
      <RelatedContentSection sourceType="RESEARCH" sourceSlug={slug} />
      <RelatedContentSection sourceType="RESEARCH" sourceSlug={slug} linkKind="CTA" />
      <ContentFaq relatedType="RESEARCH" relatedSlug={slug} />
    </>
  );
}
