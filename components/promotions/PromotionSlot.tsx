import { getPromotionForSlot, getPromotionHref, type PromotionPlacement } from '@/lib/promotions';
import PromotionCard from '@/components/promotions/PromotionCard';

export default async function PromotionSlot({
  placement,
  path,
  contentType,
}: {
  placement: PromotionPlacement;
  path: string;
  contentType?: string;
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
      promotion={{
        id: promotion.id,
        brandName: promotion.brandName,
        title: promotion.title,
        shortDescription: promotion.shortDescription,
        logoUrl: promotion.logoUrl,
        imageUrl: promotion.imageUrl,
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
