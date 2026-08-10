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
import { markdownToBlocks } from '@/lib/blocks/registry';
import { ChevronLeft, Calendar, User, BookOpen, Clock, Tag as TagIcon, Share2, ShieldCheck } from 'lucide-react';
import React from 'react';
import { CommentSection } from '@/components/ui/CommentSection';
import JsonLd, { articleSchema } from '@/components/seo/JsonLd';

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
  let dbPost = null;
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

  // Render CMS blocks directly on server for optimal performance and styling
  let renderedHtml = '';
  if (dbPost?.blockContent?.blocks && Array.isArray(dbPost.blockContent.blocks) && dbPost.blockContent.blocks.length > 0) {
    renderedHtml = renderBlocks(dbPost.blockContent.blocks);
  } else if (dbPost?.content) {
    const generatedBlocks = markdownToBlocks(dbPost.content);
    renderedHtml = renderBlocks(generatedBlocks);
  } else if (localPost?.content) {
    const generatedBlocks = markdownToBlocks(localPost.content);
    renderedHtml = renderBlocks(generatedBlocks);
  }

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
                href="/research"
                className="inline-flex items-center gap-2 text-sm text-cinema-cyan hover:text-white transition-colors group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Research Library
              </Link>
              <div className="flex items-center gap-3">
                <SaveButton slug={slug} type="research" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Tag text={sector} variant="teal" />
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-gray-300">
                  {pageCount} Pages
                </span>
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cinema-cyan" /> {readingTimeText}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Institutional Grade
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                {title}
              </h1>

              {summary && (
                <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-4xl border-l-2 border-cinema-cyan/50 pl-5">
                  {summary}
                </p>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt={title}
                className="w-full h-64 md:h-[420px] object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* ── MAIN CONTENT & SIDEBAR ── */}
        <main className="wrap max-w-5xl py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            {/* Main Article Prose / CMS Blocks */}
            <article className="glass-cinema rounded-3xl p-6 md:p-12 border border-white/10 shadow-2xl overflow-hidden min-w-0">
              <div
                className="block-editor-content text-gray-200 text-sm md:text-base leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />

              {/* Topic Tags */}
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
                  currentPath={`/research/${slug}`}
                />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Report Info Card */}
              <div className="glass-cinema rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-bold text-cinema-cyan flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Institutional Metadata
                </h3>
                <div className="space-y-3 text-xs text-gray-400">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Classification:</span>
                    <span className="text-emerald-400 font-semibold">Institutional Grade</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Sector:</span>
                    <span className="text-gray-200 font-semibold">{sector}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Document Length:</span>
                    <span className="text-gray-200 font-semibold">{pageCount} Pages</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Target Audience:</span>
                    <span className="text-gray-200 font-semibold">Asset Managers & CXOs</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Methodology:</span>
                    <span className="text-gray-200 font-semibold">Quantitative & Field</span>
                  </div>
                </div>
              </div>

              {/* Related Research Reports */}
              {related.length > 0 && (
                <div className="glass-cinema rounded-2xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-cinema-cyan flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Related Research
                  </h3>
                  <div className="space-y-3">
                    {related.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/research/${rel.slug}`}
                        className="block group p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-cinema-cyan/30"
                      >
                        {rel.coverImage && (
                          <div className="h-20 w-full mb-2 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={rel.coverImage}
                              alt={rel.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <p className="text-[10px] text-cinema-cyan font-mono mb-1">{rel.sector}</p>
                        <h4 className="text-xs font-semibold text-white group-hover:text-cinema-cyan transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Desk Citation Notice */}
              <div className="p-4 rounded-2xl bg-[#0B101D] border border-white/10 text-[11px] text-gray-400 space-y-2">
                <p className="font-semibold text-gray-200">How to cite this report:</p>
                <p className="font-mono text-[10px] text-gray-400 bg-white/5 p-2 rounded-lg border border-white/5 break-words">
                  Kunwar Analytics (2026). &quot;{title}&quot;. Kunwar Strategic Industries Desk. https://kunwaranalytics.in/research/{slug}
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
