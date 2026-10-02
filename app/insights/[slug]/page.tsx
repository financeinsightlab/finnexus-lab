import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import HeroBackground from '@/components/ui/HeroBackground';
import Link from 'next/link';
import SaveButton from '@/components/ui/SaveButton';
import { formatDate } from '@/lib/utils';
import { getInsightBySlug, getAllInsights } from '@/lib/content';
import { prisma } from '@/lib/prisma';
import { renderBlocks } from '@/lib/blocks/renderer';
import { markdownToBlocks, type Block } from '@/lib/blocks/registry';
import { extractHeadings } from '@/lib/content-toc';
import { ChevronLeft, Calendar, User, BookOpen, Clock, Tag as TagIcon, Share2, Sparkles, ShieldCheck, List } from 'lucide-react';
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
        title: `${dbPost.title} | Kunwar Analytics Insights`,
        description: dbPost.excerpt || 'Strategic commentary and executive market intelligence.',
        alternates: { canonical: `/insights/${slug}` },
        openGraph: {
          title: dbPost.title,
          description: dbPost.excerpt || '',
          url: `https://kunwaranalytics.in/insights/${slug}`,
          type: 'article',
          images: dbPost.featuredImage ? [{ url: dbPost.featuredImage }] : [],
        },
      };
    }
  } catch (e) {}

  const post = await getInsightBySlug(slug);
  if (!post) return { title: 'Insight Not Found | Kunwar Analytics' };

  return {
    title: `${post.title} | Kunwar Analytics Insights`,
    description: post.thesis,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: post.title,
      description: post.thesis,
      url: `https://kunwaranalytics.in/insights/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export async function generateStaticParams() {
  const allPosts = getAllInsights();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Check CMS post first
  let dbPost: any = null;
  try {
    dbPost = await (prisma as any).post.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });
  } catch (e) {}

  // 2. Fallback to Local MDX Insight
  const localPost = await getInsightBySlug(slug);

  if (!dbPost && !localPost) {
    notFound();
  }

  // Unified metadata resolution
  const title = dbPost?.title || localPost?.title || 'Executive Strategic Insight';
  const thesis = dbPost?.excerpt || localPost?.thesis || '';
  const category = (dbPost?.category || dbPost?.sector || localPost?.category || 'Sector Analysis') as string;
  const coverImage = dbPost?.featuredImage || localPost?.coverImage || undefined;
  const authorName = dbPost?.author?.name || localPost?.author || 'Kunwar Strategic Desk';
  const dateObj = dbPost?.publishedAt || dbPost?.createdAt || localPost?.date || new Date();
  const publishedDateStr = dateObj instanceof Date ? dateObj.toISOString() : String(dateObj);
  const readingTime = dbPost?.estimatedReadingTime || localPost?.readingTime || 7;
  const tags: string[] = Array.isArray(dbPost?.tags) && dbPost.tags.length > 0
    ? dbPost.tags
    : (localPost?.tags || []);

  // Resolve content blocks once — rendering + contents sidebar share the tree.
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

  // Related insights
  const allInsights = getAllInsights();
  const related = allInsights.filter((item) => item.slug !== slug).slice(0, 3);

  const postSchema = articleSchema({
    title,
    description: thesis,
    datePublished: publishedDateStr,
    url: `https://kunwaranalytics.in/insights/${slug}`,
    authorName,
    image: coverImage,
    keywords: tags,
  });

  const metadataRows: Array<[string, string]> = [
    ['Format', 'Strategic Brief'],
    ['Category', category],
    ['Reading time', `${readingTime} minutes`],
    ['Target audience', 'CXOs & Board Members'],
    ['Framework', 'Quantitative & Policy'],
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
                href="/insights"
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to All Insights
              </Link>
              <div className="flex items-center gap-3">
                <SaveButton slug={slug} type="insight" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  {category}
                </span>
                <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" /> {readingTime} min read
                </span>
                <span className="flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-[11px] text-secondary-foreground">
                  <ShieldCheck className="h-3 w-3 text-primary" /> Executive Brief
                </span>
              </div>

              <h1 className="max-w-[52ch] text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-[2.75rem]">
                {title}
              </h1>

              {thesis && (
                <div className="max-w-[80ch] rounded-2xl border border-border border-l-4 border-l-primary bg-secondary/40 p-5 shadow-sm">
                  <p className="mb-1 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-primary">
                    <Sparkles className="h-3.5 w-3.5" /> Executive Thesis
                  </p>
                  <p className="text-base italic leading-relaxed text-foreground md:text-lg">
                    &quot;{thesis}&quot;
                  </p>
                </div>
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
                className="h-56 w-full object-cover object-center md:h-[400px]"
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
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <BookOpen className="h-4 w-4" /> Insight Metadata
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

                {headings.length > 1 && (
                  <nav
                    aria-label="Insight contents"
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

                {related.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                      <Share2 className="h-4 w-4" /> Related Notes
                    </h3>
                    <div className="mt-4 space-y-3">
                      {related.map((rel) => (
                        <Link
                          key={rel.slug}
                          href={`/insights/${rel.slug}`}
                          className="group block rounded-xl border border-border bg-secondary/40 p-3 transition-colors hover:border-primary/40 hover:bg-accent"
                        >
                          {rel.coverImage && (
                            <div className="mb-2 h-16 w-full overflow-hidden rounded-lg border border-border bg-muted">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={rel.coverImage}
                                alt={rel.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <p className="mb-1 font-mono text-[10px] text-primary">{rel.category}</p>
                          <h4 className="line-clamp-2 text-xs font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                            {rel.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            }
          >
            <article className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-8 lg:p-10">
              <div
                className="cms-content prose-content article-body"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />

              {/* Tags */}
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
                  currentPath={`/insights/${slug}`}
                />
              </div>
            </article>
          </ContentLayout>
        </ContentPage>
      </div>
      <PromotionSlot placement="ARTICLE_PAGE" path={`/insights/${slug}`} contentType="INSIGHT" />
      <RelatedContentSection sourceType="INSIGHT" sourceSlug={slug} />
      <RelatedContentSection sourceType="INSIGHT" sourceSlug={slug} linkKind="CTA" />
      <ContentFaq relatedType="INSIGHT" relatedSlug={slug} />
    </>
  );
}
