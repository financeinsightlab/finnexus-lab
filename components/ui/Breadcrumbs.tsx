import Link from 'next/link';
import { Fragment } from 'react';

export interface BreadcrumbItem {
    label: string;
    /** Omit on the current page (last item) — it renders as plain text. */
    href?: string;
}

/**
 * Shared visible breadcrumb trail. Mirrors the markup/classes previously
 * hand-rolled on individual pages (nav + separators) but with correct
 * semantics: an ordered list and `aria-current="page"` on the last item.
 *
 * Usage:
 *   <Breadcrumbs items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Research', href: '/research' },
 *     { label: post.title },
 *   ]} />
 *
 * Pair with `breadcrumbSchema()` from components/seo/JsonLd when the page
 * also emits BreadcrumbList JSON-LD — keep both lists in the same order.
 */
export default function Breadcrumbs({
    items,
    className = 'mb-4',
}: {
    items: BreadcrumbItem[];
    className?: string;
}) {
    if (items.length === 0) return null;
    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <Fragment key={`${item.label}-${index}`}>
                            {index > 0 && <span aria-hidden="true">/</span>}
                            <li className="min-w-0">
                                {isLast || !item.href ? (
                                    <span
                                        aria-current={isLast ? 'page' : undefined}
                                        className="font-medium text-foreground truncate block max-w-[200px] sm:max-w-none"
                                    >
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link href={item.href} className="hover:text-foreground transition-colors">
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}
