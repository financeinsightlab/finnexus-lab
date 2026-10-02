import { getPromotionForSlot, getPromotionHref, type PromotionPlacement } from '@/lib/promotions';
import PromotionCard from '@/components/promotions/PromotionCard';

export default async function PromotionSlot({
  placement,
  path,
  contentType,
  variant = 'inline',
}: {
  placement: PromotionPlacement;
  path: string;
  contentType?: string;
  /** inline = full-width between-content card; sidebar = compact sticky widget */
  variant?: 'inline' | 'sidebar';
}) {
  let promotion;
  try {
    promotion = await getPromotionForSlot({ placement, path, contentType });
  } catch {
    return null;
  }
  if (!promotion) return null;

  return (
    <PromotionCard
      path={path}
      variant={variant}
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
  );
}
