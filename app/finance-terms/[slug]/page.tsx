import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';
import ContentFaq from '@/components/content/ContentFaq';
import RelatedContentSection from '@/components/content/RelatedContentSection';
import PromotionSlot from '@/components/promotions/PromotionSlot';
import FinanceTermViewTracker from '@/components/finance-terms/FinanceTermViewTracker';
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
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link><span className="px-2">/</span><Link href="/finance-terms" className="hover:text-primary">Finance Terms</Link><span className="px-2">/</span><span aria-current="page" className="text-foreground">{term.term}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{term.category}</span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{term.difficulty.toLowerCase()}</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{term.term}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{term.simpleMeaning}</p>
        </div>
      </header>
      <PromotionSlot slot="CONTENT_TOP" path={`/finance-terms/${term.slug}`} tags={[term.category]} />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm" aria-labelledby="simple-meaning-heading">
          <h2 id="simple-meaning-heading" className="text-xl font-bold text-foreground">Simple meaning</h2>
          <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">{term.simpleMeaning}</p>
        </section>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm" aria-labelledby="example-heading">
          <h2 id="example-heading" className="text-xl font-bold text-foreground">Easy example</h2>
          <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">{term.example}</p>
        </section>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm" aria-labelledby="interview-heading">
          <h2 id="interview-heading" className="text-xl font-bold text-foreground">Interview-ready explanation</h2>
          <blockquote className="mt-3 border-l-4 border-primary pl-4 leading-7 text-foreground">{term.interviewAnswer}</blockquote>
        </section>
        {term.formula && (
          <section className="rounded-2xl border border-border bg-muted/50 p-6" aria-labelledby="formula-heading">
            <h2 id="formula-heading" className="text-xl font-bold text-foreground">Formula</h2>
            <p className="mt-3 overflow-x-auto font-mono text-sm text-foreground">{term.formula}</p>
          </section>
        )}
        {term.keywords.length > 0 && (
          <section aria-label="Related keywords" className="flex flex-wrap gap-2">
            {term.keywords.map((keyword) => <span key={keyword} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">{keyword}</span>)}
          </section>
        )}
        {/* Promotion slot: FINANCE_TERM_RELATED — inside the related-resources area */}
        <PromotionSlot slot="FINANCE_TERM_RELATED" path={`/finance-terms/${term.slug}`} tags={[term.category]} className="w-full" />
        {related.length > 0 && (
          <section aria-labelledby="related-terms-heading">
            <h2 id="related-terms-heading" className="mb-4 text-2xl font-bold text-foreground">Related finance terms</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/finance-terms/${item.slug}`} className="block rounded-xl border border-border bg-card p-4 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <span className="font-semibold text-foreground">{item.term}</span>
                    <span className="mt-1 block line-clamp-2 text-sm text-muted-foreground">{item.simpleMeaning}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="flex flex-wrap gap-3 border-t border-border pt-6">
          <Link href="/pgdm" className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Explore finance courses</Link>
          <Link href="/tools" className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent">Use a finance calculator</Link>
          <Link href="/ask" className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent">Ask Kunwar</Link>
        </div>
      </main>
      <PromotionSlot slot="CONTENT_BOTTOM" path={`/finance-terms/${term.slug}`} tags={[term.category]} />
      <RelatedContentSection sourceType="FINANCE_TERM" sourceSlug={term.slug} />
      <RelatedContentSection sourceType="FINANCE_TERM" sourceSlug={term.slug} linkKind="CTA" />
      <ContentFaq relatedType="FINANCE_TERM" relatedSlug={term.slug} />
      <PromotionSlot slot="FOOTER" path={`/finance-terms/${term.slug}`} tags={[term.category]} />
    </div>
  );
}
