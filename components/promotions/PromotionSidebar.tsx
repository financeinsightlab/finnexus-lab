import { getPromotionForSlot, getPromotionHref } from '@/lib/promotions';
import PromotionCard from '@/components/promotions/PromotionCard';

/**
 * Server-rendered sticky sidebar promotion widget.
 * Drop this inside a CSS grid/flex layout alongside main content.
 * The sidebar promotion type must be set to placement "SIDEBAR" in the CMS.
 *
 * Example layout:
 *   <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-6">
 *     <main>…content…</main>
 *     <PromotionSidebar path="/research/my-post" contentType="RESEARCH" />
 *   </div>
 */
export default async function PromotionSidebar({
  path,
  contentType,
}: {
  path: string;
  contentType?: string;
}) {
  let promotion;
  try {
    promotion = await getPromotionForSlot({ placement: 'SIDEBAR', path, contentType });
  } catch {
    return null;
  }
  if (!promotion) return null;

  return (
    <div className="hidden lg:block">
      <div className="sticky top-24">
        <PromotionCard
          path={path}
          variant="sidebar"
          promotion={{
            id: promotion.id,
            brandName: promotion.brandName,
            title: promotion.title,
            shortDescription: promotion.shortDescription,
            logoUrl: promotion.logoUrl,
            imageUrl: promotion.imageUrl,
            videoUrl: promotion.videoUrl,
            lightCreativeUrl: promotion.lightCreativeUrl,
            darkCreativeUrl: promotion.darkCreativeUrl,
            ctaText: promotion.ctaText,
            disclosureType: promotion.disclosureType,
            disclosureText: promotion.disclosureText,
            href: getPromotionHref(promotion),
            mobileVisible: promotion.mobileVisible,
            desktopVisible: promotion.desktopVisible,
          }}
        />
      </div>
    </div>
  );
}
