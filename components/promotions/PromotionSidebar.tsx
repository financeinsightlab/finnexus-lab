import PromotionSlot from '@/components/promotions/PromotionSlot';

/**
 * Article sidebar promotions (slot SIDEBAR_PRIMARY) for research reports and
 * insight articles. Rendered inside the existing `<aside>` column; hidden
 * below the `lg` breakpoint where the column stacks under the article.
 */
export default function PromotionSidebar({ path, tags }: { path: string; tags?: readonly string[] | null }) {
  return <PromotionSlot slot="SIDEBAR_PRIMARY" path={path} tags={tags} variant="sidebar" className="hidden w-full lg:block" />;
}
