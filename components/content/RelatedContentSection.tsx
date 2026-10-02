import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { getRelatedContent, relatedContentHref } from '@/lib/related-content';

export default async function RelatedContentSection({
  sourceType,
  sourceSlug,
  linkKind = 'RELATED',
  title,
}: {
  sourceType: string;
  sourceSlug: string;
  linkKind?: 'RELATED' | 'CTA';
  title?: string;
}) {
  let relations;
  try {
    relations = await getRelatedContent(sourceType, sourceSlug, linkKind);
  } catch {
    return null;
  }

  const items = relations.flatMap((relation) => {
    const href = relatedContentHref(relation.targetType, relation.targetSlug);
    if (!href) return [];
    const label = relation.anchorText?.trim() || relation.targetSlug.replace(/[-_]+/g, ' ');
    return [{ id: relation.id, href, label, type: relation.targetType }];
  });
  if (items.length === 0) return null;

  const heading = title ?? (linkKind === 'CTA' ? 'What to do next' : 'Related content');
  return (
    <section className="content-page w-full py-10" aria-label={heading}>
      <div className="mb-5 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-bold text-foreground">{heading}</h2>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="group flex h-full min-h-16 items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-card-foreground transition-colors hover:border-primary/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.type.replaceAll('_', ' ').toLowerCase()}
                </span>
                <span className="font-medium text-foreground group-hover:text-primary">{item.label}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
