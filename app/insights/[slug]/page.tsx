import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import HeroBackground from '@/components/ui/HeroBackground';
import Link from 'next/link';
import SaveButton from '@/components/ui/SaveButton';
import { formatDate } from '@/lib/utils';
import { getInsightBySlug, getAllInsights } from '@/lib/content';
import { prisma } from '@/lib/prisma';
import { renderBlocks } from '@/lib/blocks/renderer';
import { markdownToBlocks } from '@/lib/blocks/registry';
import { ChevronLeft, Calendar, User, BookOpen, Clock, Tag as TagIcon, Share2, Sparkles, ShieldCheck } from 'lucide-react';
import React from 'react';
import { CommentSection } from '@/components/ui/CommentSection';
import JsonLd, { articleSchema } from '@/components/seo/JsonLd';

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
  let dbPost = null;
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

  // Render content via Server-side Block Engine
  let renderedHtml = '';
  if (dbPost?.blockContent?.blocks && Array.isArray(dbPost.blockContent.blocks) && dbPost.blockContent.blocks.length > 0) {
    renderedHtml = renderBlocks(dbPost.blockContent.blocks);
  } else if (dbPost?.content) {
    renderedHtml = renderBlocks(markdownToBlocks(dbPost.content));
  } else if (localPost?.content) {
    renderedHtml = renderBlocks(markdownToBlocks(localPost.content));
  }

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

  return (
    <>
      <JsonLd data={postSchema} />
      <div className="min-h-screen bg-cinema-black text-gray-100">
        {/* ── HEADER HERO ── */}
        <header className="relative overflow-hidden bg-cinema-ink py-14 md:py-20 border-b border-white/5">
          <HeroBackground />
          <div className="wrap max-w-5xl relative z-10">
            <div className="flex items-center justify-between gap-4 mb-8">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm text-cinema-cyan hover:text-white transition-colors group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to All Insights
              </Link>
              <div className="flex items-center gap-3">
                <SaveButton slug={slug} type="insight" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-cinema-cyan/15 text-cinema-cyan text-xs font-bold font-mono rounded-full uppercase tracking-wider border border-cinema-cyan/30">
                  {category}
                </span>
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cinema-cyan" /> {readingTime} min read
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Executive Brief
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                {title}
              </h1>

              {thesis && (
                <div className="p-5 rounded-2xl bg-[#090E18] border-l-4 border-cinema-cyan border-r border-y border-white/10 shadow-xl">
                  <p className="text-sm uppercase tracking-wider font-bold text-cinema-cyan mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Executive Thesis
                  </p>
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed italic">
                    &quot;{thesis}&quot;
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-400 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cinema-cyan" />
                  <span className="font-medium text-gray-200">{authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cinema-cyan" />
                  <span>{formatDate(publishedDateStr)}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── 3D COVER IMAGE HERO BANNER ── */}
        {coverImage && (
          <div className="wrap max-w-5xl -mt-8 relative z-20">
            <div className="overflow-hidden rounded-3xl shadow-2xl border border-white/15 bg-[#080D1A]">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-64 md:h-[400px] object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* ── MAIN CONTENT & SIDEBAR ── */}
        <main className="wrap max-w-5xl py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            {/* Main Article Prose / Blocks */}
            <article className="glass-cinema rounded-3xl p-6 md:p-12 border border-white/10 shadow-2xl overflow-hidden min-w-0">
              <div
                className="block-editor-content text-gray-200 text-sm md:text-base leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap gap-2 items-center">
                  <span className="text-xs uppercase tracking-wider text-gray-400 mr-2 flex items-center gap-1">
                    <TagIcon className="w-3.5 h-3.5 text-cinema-cyan" /> Topics:
                  </span>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 font-mono transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-14 pt-10 border-t border-white/10">
                <CommentSection
                  postId={dbPost?.id}
                  currentPath={`/insights/${slug}`}
                />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Insight Metadata Card */}
              <div className="glass-cinema rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-bold text-cinema-cyan flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Insight Metadata
                </h3>
                <div className="space-y-3 text-xs text-gray-400">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Format:</span>
                    <span className="text-emerald-400 font-semibold">Strategic Brief</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Category:</span>
                    <span className="text-gray-200 font-semibold">{category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Reading Time:</span>
                    <span className="text-gray-200 font-semibold">{readingTime} Minutes</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Target Audience:</span>
                    <span className="text-gray-200 font-semibold">CXOs & Board Members</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Framework:</span>
                    <span className="text-gray-200 font-semibold">Quantitative & Policy</span>
                  </div>
                </div>
              </div>

              {/* Related Insights */}
              {related.length > 0 && (
                <div className="glass-cinema rounded-2xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-cinema-cyan flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Related Notes
                  </h3>
                  <div className="space-y-3">
                    {related.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/insights/${rel.slug}`}
                        className="block group p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-cinema-cyan/30"
                      >
                        {rel.coverImage && (
                          <div className="h-16 w-full mb-2 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                            <img
                              src={rel.coverImage}
                              alt={rel.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <p className="text-[10px] text-cinema-cyan font-mono mb-1">{rel.category}</p>
                        <h4 className="text-xs font-semibold text-white group-hover:text-cinema-cyan transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
