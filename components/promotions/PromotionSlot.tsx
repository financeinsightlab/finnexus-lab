import PromotionCard from '@/components/promotions/PromotionCard';
import { SLOT_META, type PromotionSlot as PromotionSlotKey } from '@/lib/promotions/catalog';
import { getPromotionsForSlot } from '@/lib/promotions/engine';

/**
 * Server-rendered promotion slot.
 *
 * Every placement in the UI requests a named slot from the catalogue
 * (lib/promotions/catalog.ts). Selection happens once per request against the
 * cached promotion set; when nothing is eligible the slot renders nothing, so
 * layouts collapse cleanly.
 *
 *   <PromotionSlot slot="CONTENT_BOTTOM" path={`/research/${slug}`} tags={post.tags} />
 */
export default async function PromotionSlot({
  slot,
  path,
  tags,
  limit,
  variant,
  className,
}: {
  slot: PromotionSlotKey;
  /** Pathname of the page being rendered (used for targeting + analytics). */
  path: string;
  /** Optional content tags/categories for TAG targeting. */
  tags?: readonly string[] | null;
  /** Max promotions to render; defaults to the slot's catalogue value. */
  limit?: number;
  /** inline = full-width card; sidebar = compact widget. Defaults from the catalogue. */
  variant?: 'inline' | 'sidebar';
  /** Wrapper classes applied to every card (collapses with the card's visibility). */
  className?: string;
}) {
  const promotions = await getPromotionsForSlot({ slot, pathname: path, tags, limit });
  if (promotions.length === 0) return null;

  const meta = SLOT_META[slot];
  const resolvedVariant = variant ?? (meta.variant === 'sidebar' ? 'sidebar' : 'inline');
  const cardClass = className ?? (resolvedVariant === 'inline' ? 'mx-auto w-full max-w-5xl px-4 py-4 sm:px-6' : 'w-full');

  return (
    <div data-promotion-slot-container={slot} className="contents">
      {promotions.map((promotion) => (
        <PromotionCard key={promotion.id} promotion={promotion} path={path} variant={resolvedVariant} className={cardClass} />
      ))}
    </div>
  );
}
