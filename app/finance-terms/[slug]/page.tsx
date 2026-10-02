import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import FinanceTermViewTracker from '@/components/finance-terms/FinanceTermViewTracker';
import { ContentPage, ContentLayout } from '@/components/content/ContentLayout';
import { getFinanceTermBySlug, getFinanceTermsBySlugs, getRelatedFinanceTerms, FINANCE_TERMS_BASE } from '@/lib/finance-terms';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = await getFinanceTermBySlug(slug).catch(() => null);
  if (!term || !term.seoVisible) return { title: 'Finance term not found | Kunwar Analytics', robots: { index: false, follow: true } };
  const description = term.simpleMeaning.replace(/\s+/g, ' ').slice(0, 158);
  return {
    title: `${term.term}: Meaning, Example & Interview Answer | Kunwar Analytics`,
    description,
    ...(term.seoVisible ? {} : { robots: { index: false, follow: true } }),
    alternates: { canonical: `${FINANCE_TERMS_BASE}/${term.slug}` },
    openGraph: { title: `${term.term} explained in simple words`, description, url: `${FINANCE_TERMS_BASE}/${term.slug}`, type: 'article' },
  };
}

export default async function FinanceTermDetailPage({ params }: Props) {
  const { slug } = await params;
  const term = await getFinanceTermBySlug(slug).catch(() => null);
  if (!term) notFound();
  const [relatedByContext, curatedRelated] = await Promise.all([
    getRelatedFinanceTerms({
      categories: [term.category],
      keywords: [term.slug, ...term.keywords, ...term.synonyms],
      excludeSlug: term.slug,
      limit: 8,
    }).catch(() => []),
    getFinanceTermsBySlugs(term.relatedTermSlugs).catch(() => []),
  ]);
  const related = [
    ...curatedRelated.filter((entry) => entry.slug !== term.slug),
    ...relatedByContext.filter((entry) => !curatedRelated.some((curated) => curated.slug === entry.slug)),
  ].slice(0, 5);
  const url = `${FINANCE_TERMS_BASE}/${term.slug}`;
  const termSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.simpleMeaning,
    termCode: term.slug,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Kunwar Analytics Finance Terms', url: FINANCE_TERMS_BASE },
    url,
  };
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://kunwaranalytics.in' },
    { name: 'Finance Terms', url: FINANCE_TERMS_BASE },
    { name: term.term, url },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={[termSchema, breadcrumbs]} />
      <FinanceTermViewTracker slug={term.slug} />

      <header className="border-b border-border bg-card">
        <ContentPage className="py-10 md:py-12">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link><span className="px-2">/</span><Link href="/finance-terms" className="hover:text-primary">Finance Terms</Link><span className="px-2">/</span><span aria-current="page" className="text-foreground">{term.term}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{term.category}</span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{term.difficulty.toLowerCase()}</span>
          </div>
          <h1 className="mt-4 max-w-[48ch] text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{term.term}</h1>
          <p className="mt-5 max-w-[72ch] text-lg leading-8 text-muted-foreground">{term.simpleMeaning}</p>
        </ContentPage>
      </header>

      <ContentPage className="py-10">
        <ContentLayout
          asideSticky
          aside={
            <>
              <nav aria-label="Explore related resources" className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Keep exploring</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <Link href="/pgdm" className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-accent">
                      Finance &amp; analytics courses <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools" className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-accent">
                      Finance calculators <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/research" className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-accent">
                      Research reports <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/ask" className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-accent">
                      Ask Kunwar <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                </ul>
              </nav>

              {term.keywords.length > 0 && (
                <section aria-label="Related keywords" className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Keywords</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {term.keywords.map((keyword) => <span key={keyword} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground">{keyword}</span>)}
                  </div>
                </section>
              )}
            </>
          }
        >
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8" aria-labelledby="simple-meaning-heading">
              <h2 id="simple-meaning-heading" className="text-xl font-bold text-foreground">Simple meaning</h2>
              <p className="mt-3 max-w-[78ch] whitespace-pre-line leading-7 text-muted-foreground">{term.simpleMeaning}</p>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8" aria-labelledby="example-heading">
              <h2 id="example-heading" className="text-xl font-bold text-foreground">Easy example</h2>
              <p className="mt-3 max-w-[78ch] whitespace-pre-line leading-7 text-muted-foreground">{term.example}</p>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8" aria-labelledby="interview-heading">
              <h2 id="interview-heading" className="text-xl font-bold text-foreground">Interview-ready explanation</h2>
              <blockquote className="mt-3 max-w-[78ch] border-l-4 border-primary pl-4 leading-7 text-foreground">{term.interviewAnswer}</blockquote>
            </section>

            {term.formula && (
              <section className="rounded-2xl border border-border bg-muted/50 p-6 md:p-8" aria-labelledby="formula-heading">
                <h2 id="formula-heading" className="text-xl font-bold text-foreground">Formula</h2>
                <p className="break-words [overflow-wrap:anywhere] mt-3 font-mono text-sm text-foreground">{term.formula}</p>
              </section>
            )}

            {related.length > 0 && (
              <section aria-labelledby="related-terms-heading">
                <h2 id="related-terms-heading" className="mb-4 text-2xl font-bold text-foreground">Related finance terms</h2>
                <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/finance-terms/${item.slug}`} className="block h-full rounded-xl border border-border bg-card p-4 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <span className="font-semibold text-foreground">{item.term}</span>
                        <span className="mt-1 block line-clamp-2 text-sm text-muted-foreground">{item.simpleMeaning}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </ContentLayout>
      </ContentPage>

      <RelatedContentSection sourceType="FINANCE_TERM" sourceSlug={term.slug} />
      <RelatedContentSection sourceType="FINANCE_TERM" sourceSlug={term.slug} linkKind="CTA" />
      <PromotionSlot placement="ARTICLE_PAGE" path={`/finance-terms/${term.slug}`} contentType="FINANCE_TERM" />
      <ContentFaq relatedType="FINANCE_TERM" relatedSlug={term.slug} />
    </div>
  );
}
