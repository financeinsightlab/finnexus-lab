// FILE: app/case-studies/[slug]/page.tsx (server async)
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ChevronLeft, CalendarDays, Briefcase, Building2, ArrowRight, Award, Download, Layers } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/content';
import JsonLd from '@/components/seo/JsonLd';
import { prisma } from '@/lib/prisma';
import ContentRenderer from '@/components/ContentRenderer';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import { ContentPage, ContentLayout } from '@/components/content/ContentLayout';

const BASE = 'https://kunwaranalytics.in';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const dbPost = await prisma.post.findUnique({ where: { slug } });
    if (dbPost?.published) {
      return {
        title: `${dbPost.title} | Case Study`,
        description: dbPost.excerpt || '',
      };
    }
  } catch (e) {}

  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return { title: 'Not Found' };
  return { title: `${caseStudy.title} | Case Study`, description: caseStudy.outcome };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. New CMS
  let dbPost: any = null;
  try {
    dbPost = await prisma.post.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });
  } catch (e) {}

  if (dbPost && dbPost.type === 'CASE_STUDY') {
    if (!dbPost.published) notFound();

    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border bg-card/60 py-10 md:py-14">
          <ContentPage>
            <Link href="/case-studies" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground">
              <ChevronLeft className="h-4 w-4" /> All Case Studies
            </Link>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Case Study
            </span>
            <h1 className="mt-4 max-w-[52ch] text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              {dbPost.title}
            </h1>
            <p className="mt-5 max-w-[76ch] border-l-4 border-primary/50 pl-5 text-lg italic leading-relaxed text-muted-foreground">
              {dbPost.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-border pt-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> {dbPost.author?.name || 'Kunwar Analytics'}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" /> {new Date(dbPost.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </span>
            </div>
          </ContentPage>
        </header>

        <ContentPage className="py-10 md:py-14">
          <ContentLayout>
            <article className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-8 lg:p-10">
              <ContentRenderer content={dbPost.content} contentType={dbPost.contentType} blocks={dbPost.blockContent} />
            </article>
          </ContentLayout>
        </ContentPage>

        <PromotionSlot placement="ARTICLE_PAGE" path={`/case-studies/${slug}`} contentType="CASE_STUDY" />
        <RelatedContentSection sourceType="CASE_STUDY" sourceSlug={slug} />
        <RelatedContentSection sourceType="CASE_STUDY" sourceSlug={slug} linkKind="CTA" />
        <ContentFaq relatedType="CASE_STUDY" relatedSlug={slug} />
      </div>
    );
  }

  // 2. Legacy MDX
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const episodeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.outcome,
    datePublished: caseStudy.date,
    url: `${BASE}/case-studies/${caseStudy.slug}`,
    author: { '@type': 'Organization', name: 'Kunwar Analytics' },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={episodeSchema} />

      {/* ═══════════ HEADER ═══════════ */}
      <header className="relative overflow-hidden border-b border-border bg-card/60 pt-8 pb-12">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />

        <ContentPage className="relative z-10">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/case-studies" className="transition-colors hover:text-primary">Case Studies</Link>
            <span>/</span>
            <span className="text-primary">{caseStudy.engagementType}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Cover image */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
                {caseStudy.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={caseStudy.coverImage} alt={caseStudy.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-secondary via-muted to-card" />
                )}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 backdrop-blur-sm dark:text-amber-300">
                    <Award className="h-3.5 w-3.5" /> Featured
                  </span>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                  <Briefcase className="h-3.5 w-3.5" /> {caseStudy.engagementType}
                </span>
                {caseStudy.industry && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-secondary-foreground">
                    <Building2 className="h-3.5 w-3.5" /> {caseStudy.industry}
                  </span>
                )}
              </div>

              <h1 className="mb-5 max-w-[52ch] text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                {caseStudy.title}
              </h1>

              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Client</p>
                  <p className="text-sm font-semibold text-foreground">{caseStudy.clientType}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Date</p>
                  <p className="text-sm font-semibold text-foreground">{formatDate(caseStudy.date)}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Timeline</p>
                  <p className="text-sm font-semibold text-foreground">{caseStudy.timeline ?? '—'}</p>
                </div>
              </div>

              <p className="max-w-[76ch] border-l-4 border-primary/50 pl-4 leading-relaxed text-muted-foreground">
                {caseStudy.outcome}
              </p>

              {/* Download PDF */}
              <div className="mt-6">
                <a
                  href={`/case-studies/${caseStudy.slug}/download`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </a>
                <span className="ml-3 text-xs text-muted-foreground">Consulting-style PDF, generated on demand</span>
              </div>

              {caseStudy.tags && caseStudy.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ContentPage>
      </header>

      {/* ═══════════ FRAMEWORKS & METHODS ═══════════ */}
      {caseStudy.frameworks && caseStudy.frameworks.length > 0 && (
        <section className="border-b border-border bg-muted/40">
          <ContentPage className="py-10">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-grow">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Methodology</span>
                <h2 className="mb-4 mt-1 text-xl font-bold text-foreground md:text-2xl">Frameworks &amp; Methods Used</h2>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.frameworks.map((framework) => (
                    <span
                      key={framework}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary"
                    >
                      <Layers className="h-3 w-3" /> {framework}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ContentPage>
        </section>
      )}

      {/* ═══════════ BODY ═══════════ */}
      <ContentPage className="py-10 md:py-14">
        <ContentLayout>
          <article className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-8 lg:p-10">
            {/* MDX body: global typography + automatic wide tables/figures */}
            <div className="cms-content prose-content article-body">
              {caseStudy.content ? (
                <MDXRemote source={caseStudy.content} />
              ) : (
                <p className="text-muted-foreground">Full case study content coming soon.</p>
              )}
            </div>
          </article>
        </ContentLayout>
      </ContentPage>

      {/* ═══════════ MORE CASE STUDIES ═══════════ */}
      <section className="border-t border-border bg-muted/40">
        <ContentPage className="py-14">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">More Case Studies</h2>
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {getAllCaseStudies()
              .filter((s) => s.slug !== caseStudy.slug)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/case-studies/${s.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="h-36 overflow-hidden bg-muted">
                    {s.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.coverImage} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-secondary via-muted to-card" />
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{s.engagementType}</span>
                    <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {s.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </ContentPage>
      </section>

      <PromotionSlot placement="ARTICLE_PAGE" path={`/case-studies/${caseStudy.slug}`} contentType="CASE_STUDY" />
      <RelatedContentSection sourceType="CASE_STUDY" sourceSlug={caseStudy.slug} />
      <RelatedContentSection sourceType="CASE_STUDY" sourceSlug={caseStudy.slug} linkKind="CTA" />
      <ContentFaq relatedType="CASE_STUDY" relatedSlug={caseStudy.slug} />
    </div>
  );
}
