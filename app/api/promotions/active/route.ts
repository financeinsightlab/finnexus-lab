import { NextResponse } from 'next/server';
import { getSidebarPromotion, getPromotionForSlot, getPromotionHref } from '@/lib/promotions';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    const contentType = searchParams.get('contentType') || undefined;
    const placement = searchParams.get('placement') || undefined;

    const promo = placement
      ? await getPromotionForSlot({ placement, path, contentType })
      : await getSidebarPromotion({ path, contentType });
    if (!promo) {
      return NextResponse.json({ promotion: null });
    }

    return NextResponse.json(
      {
        promotion: {
          id: promo.id,
          brandName: promo.brandName,
          title: promo.title,
          shortDescription: promo.shortDescription,
          logoUrl: promo.logoUrl,
          imageUrl: promo.imageUrl,
          videoUrl: promo.videoUrl,
          lightCreativeUrl: promo.lightCreativeUrl,
          darkCreativeUrl: promo.darkCreativeUrl,
          ctaText: promo.ctaText,
          disclosureType: promo.disclosureType,
          disclosureText: promo.disclosureText,
          href: getPromotionHref(promo),
          mobileVisible: promo.mobileVisible,
          desktopVisible: promo.desktopVisible,
        },
      },
      {
        headers: {
          'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
        },
      },
    );
  } catch {
    return NextResponse.json({ promotion: null }, { status: 200 });
  }
}
