import type { ReactNode } from 'react';
import PromotionCard from '@/components/promotions/PromotionCard';
import { getPromotionsForSlot } from '@/lib/promotions/engine';

/**
 * Course sidebar (slot COURSE_SIDEBAR).
 *
 * Single-column learning pages (PGDM subjects, lectures, lessons, study
 * courses) wrap their content in this layout. When a promotion is eligible the
 * page gains a sticky rail on ≥xl screens and an inline card below the content
 * on smaller screens; when nothing is eligible the children render untouched,
 * so the layout collapses completely.
 */
export default async function PromotionRailLayout({
  path,
  tags,
  children,
}: {
  path: string;
  tags?: readonly string[] | null;
  children: ReactNode;
}) {
  const promotions = await getPromotionsForSlot({ slot: 'COURSE_SIDEBAR', pathname: path, tags });
  if (promotions.length === 0) return <>{children}</>;

  return (
    <div className="mx-auto w-full max-w-[1320px] xl:grid xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-8 xl:px-6" data-promotion-slot-container="COURSE_SIDEBAR">
      <div className="min-w-0">{children}</div>
      <aside className="hidden xl:block" aria-label="Partner promotions">
        <div className="sticky top-24 space-y-4 py-10">
          {promotions.map((promotion) => (
            <PromotionCard key={promotion.id} promotion={promotion} path={path} variant="sidebar" />
          ))}
        </div>
      </aside>
      <div className="xl:hidden">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} promotion={promotion} path={path} variant="inline" className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6" />
        ))}
      </div>
    </div>
  );
}
