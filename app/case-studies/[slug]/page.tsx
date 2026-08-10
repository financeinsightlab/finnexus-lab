// FILE: app/case-studies/[slug]/page.tsx (server async)
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ChevronLeft, CalendarDays, Clock, Briefcase, Building2, ArrowRight, Award, Download, Layers } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/content';
import JsonLd from '@/components/seo/JsonLd';
import { prisma } from '@/lib/prisma';
import ContentRenderer from '@/components/ContentRenderer';

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
  let dbPost = null;
  try {
    dbPost = await prisma.post.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });
  } catch (e) {}

  if (dbPost && dbPost.type === 'CASE_STUDY') {
    if (!dbPost.published) notFound();

    return (
      <div className="min-h-screen bg-cinema-black text-white">
        <header className="relative aurora-bg overflow-hidden pt-10 pb-14">
          <div className="absolute inset-0 opacity-[0.04] bg-grid pointer-events-none" />
          <div className="wrap max-w-4xl relative z-10">
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm text-cinema-cyan hover:text-white transition-colors mb-8">
              <ChevronLeft className="w-4 h-4" /> All Case Studies
            </Link>
            <span className="px-3 py-1 bg-cinema-cyan/10 text-cinema-cyan text-xs font-bold rounded-full uppercase tracking-widest border border-cinema-cyan/30">
              Case Study
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mt-4">{dbPost.title}</h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-3xl italic border-l-4 border-cinema-cyan/40 pl-6 mt-6">
              {dbPost.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-6 mt-6 text-sm text-gray-400 border-t border-white/10">
              <span className="inline-flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cinema-cyan" /> {dbPost.author?.name || 'Kunwar Analytics'}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-cinema-cyan" /> {new Date(dbPost.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </span>
            </div>
          </div>
        </header>
        <article className="wrap max-w-4xl pb-24">
          <div className="bg-cinema-charcoal rounded-3xl p-6 md:p-12 border border-white/10 shadow-cinema-lg">
            <ContentRenderer content={dbPost.content} contentType={dbPost.contentType} blocks={dbPost.blockContent} />
          </div>
        </article>
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
    <div className="min-h-screen bg-cinema-black text-white">
      <JsonLd data={episodeSchema} />

      {/* ═══════════ HEADER ═══════════ */}
      <header className="relative aurora-bg overflow-hidden pt-10 pb-16">
        <div className="absolute -top-24 right-1/4 w-[400px] h-[400px] rounded-full bg-cinema-cyan/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] bg-grid pointer-events-none" />

        <div className="wrap max-w-6xl relative z-10">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-cinema-cyan transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <Link href="/case-studies" className="hover:text-cinema-cyan transition-colors">Case Studies</Link>
            <span className="text-gray-600">/</span>
            <span className="text-cinema-cyan">{caseStudy.engagementType}</span>
          </nav>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            {/* Cover image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-cinema-cyan/25 to-cinema-violet/25 rounded-3xl blur-2xl opacity-60 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-cinema-lg aspect-[4/3]">
                {caseStudy.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={caseStudy.coverImage} alt={caseStudy.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cinema-mid-blue via-cinema-deep-blue to-cinema-black" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border border-cinema-amber/40 bg-cinema-amber/20 text-cinema-amber backdrop-blur-sm">
                    <Award className="w-3.5 h-3.5" /> Featured
                  </span>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border border-cinema-cyan/30 bg-cinema-cyan/10 text-cinema-cyan">
                  <Briefcase className="w-3.5 h-3.5" /> {caseStudy.engagementType}
                </span>
                {caseStudy.industry && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/15 bg-white/5 text-gray-300">
                    <Building2 className="w-3.5 h-3.5" /> {caseStudy.industry}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
                {caseStudy.title}
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="glass-cinema rounded-xl border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Client</p>
                  <p className="text-sm text-white font-semibold">{caseStudy.clientType}</p>
                </div>
                <div className="glass-cinema rounded-xl border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Date</p>
                  <p className="text-sm text-white font-semibold">{formatDate(caseStudy.date)}</p>
                </div>
                <div className="glass-cinema rounded-xl border border-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Timeline</p>
                  <p className="text-sm text-white font-semibold">{caseStudy.timeline ?? '—'}</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed border-l-4 border-cinema-cyan/50 pl-4">
                {caseStudy.outcome}
              </p>

              {/* Download PDF */}
              <div className="mt-6">
                <a
                  href={`/case-studies/${caseStudy.slug}/download`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cinema-cyan text-cinema-black font-bold text-sm shadow-glow-cyan hover:scale-[1.03] active:scale-95 transition-transform"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
                <span className="ml-3 text-xs text-gray-500">Consulting-style PDF, generated on demand</span>
              </div>

              {caseStudy.tags && caseStudy.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {caseStudy.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ FRAMEWORKS & METHODS ═══════════ */}
      {caseStudy.frameworks && caseStudy.frameworks.length > 0 && (
        <section className="border-b border-white/5 bg-cinema-ink/60">
          <div className="wrap max-w-4xl py-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cinema-cyan/10 border border-cinema-cyan/30 flex items-center justify-center">
                <Layers className="w-5 h-5 text-cinema-cyan" />
              </div>
              <div className="flex-grow">
                <span className="section-label text-cinema-cyan">Methodology</span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-1 mb-4">Frameworks &amp; Methods Used</h2>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.frameworks.map((framework) => (
                    <span
                      key={framework}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-cinema-cyan/25 bg-cinema-cyan/5 text-cinema-cyan"
                    >
                      <Layers className="w-3 h-3" /> {framework}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ BODY ═══════════ */}
      <div className="wrap max-w-4xl py-12 md:py-16">
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-300 prose-strong:text-white prose-em:text-gray-200 prose-li:text-gray-300 prose-hr:border-white/10 prose-blockquote:text-gray-400 prose-blockquote:border-cinema-cyan prose-table:text-gray-300 prose-th:text-white prose-thead:border-white/20 prose-td:border-white/10">
          {caseStudy.content ? (
            <MDXRemote source={caseStudy.content} />
          ) : (
            <p className="text-gray-500">Full case study content coming soon.</p>
          )}
        </div>
      </div>

      {/* ═══════════ MORE CASE STUDIES ═══════════ */}
      <section className="border-t border-white/5 bg-cinema-ink/60">
        <div className="wrap max-w-6xl py-14">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">More Case Studies</h2>
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cinema-cyan hover:gap-2.5 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllCaseStudies()
              .filter((s) => s.slug !== caseStudy.slug)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/case-studies/${s.slug}`}
                  className="group glass-cinema rounded-2xl border border-white/10 overflow-hidden hover:border-cinema-cyan/40 transition-all duration-300"
                >
                  <div className="h-36 overflow-hidden">
                    {s.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.coverImage} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cinema-mid-blue via-cinema-deep-blue to-cinema-black" />
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cinema-cyan">{s.engagementType}</span>
                    <h3 className="font-bold text-white text-sm leading-snug mt-1.5 line-clamp-2 group-hover:text-cinema-cyan transition-colors">
                      {s.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
