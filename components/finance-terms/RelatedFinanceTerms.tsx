import Link from 'next/link';
import { getRelatedFinanceTerms } from '@/lib/finance-terms';

export default async function RelatedFinanceTerms({
  categories,
  keywords,
  title = 'Related finance terms',
  limit = 4,
}: {
  categories?: string[];
  keywords?: string[];
  title?: string;
  limit?: number;
}) {
  let terms;
  try {
    terms = await getRelatedFinanceTerms({ categories, keywords, excludeSlug: '', limit });
  } catch {
    return null;
  }
  if (terms.length === 0) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="related-finance-terms-heading">
      <h2 id="related-finance-terms-heading" className="mb-4 text-2xl font-bold text-foreground">{title}</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {terms.map((term) => (
          <li key={term.slug}>
            <Link href={`/finance-terms/${term.slug}`} className="block h-full rounded-xl border border-border bg-card p-4 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{term.category}</span>
              <span className="mt-1 block font-bold text-foreground">{term.term}</span>
              <span className="mt-2 block line-clamp-2 text-sm leading-5 text-muted-foreground">{term.simpleMeaning}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
