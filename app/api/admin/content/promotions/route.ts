import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { authorizeApi, ADMIN_ROLES } from '@/lib/auth-guards';
import { parseJsonBody, toInputJson } from '@/lib/validation';
import { isHttpUrl, revalidateProductContent } from '@/lib/product-content-admin';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const placementValues = [
  'ALL',
  'GLOBAL',
  'HOME_HERO',
  'HOME_SECTION',
  'SIDEBAR',
  'COURSE_PAGE',
  'TOOL_PAGE',
  'CALCULATOR_PAGE',
  'RESEARCH_PAGE',
  'ARTICLE_PAGE',
  'STUDY_PAGE',
  'DASHBOARD',
  'FOOTER',
  'BETWEEN_CONTENT',
  'CTA_BLOCK',
] as const;

const optionalUrl = z.string().trim().max(2048).nullable().optional();
const optionalDateTime = z.string().datetime().or(z.literal('')).nullable().optional();

const campaignSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  brandName: z.string().trim().min(1).max(120),
  title: z.string().trim().min(3).max(180),
  shortDescription: z.string().trim().min(10).max(500),
  fullDescription: z.string().trim().max(6000).nullable().optional(),
  logoUrl: optionalUrl,
  imageUrl: optionalUrl,
  videoUrl: optionalUrl,
  lightCreativeUrl: optionalUrl,
  darkCreativeUrl: optionalUrl,
  ctaText: z.string().trim().min(1).max(60),
  destinationUrl: z.string().trim().url().max(2048),
  affiliateUrl: optionalUrl,
  trackingUrl: optionalUrl,
  category: z.string().trim().min(1).max(80),
  placement: z.enum(placementValues),
  targetPages: z.array(z.string().trim().min(1).max(2048)).max(60).default([]),
  targetContentTypes: z.array(z.string().trim().toUpperCase().min(1).max(60)).max(30).default([]),
  startsAt: optionalDateTime,
  endsAt: optionalDateTime,
  active: z.boolean().default(false),
  priority: z.number().int().min(-100).max(1000).default(0),
  displayFrequency: z.number().int().min(1).max(10).default(1),
  mobileVisible: z.boolean().default(true),
  desktopVisible: z.boolean().default(true),
  disclosureType: z.string().trim().min(1).max(40).default('SPONSORED'),
  disclosureText: z.string().trim().min(6).max(120).default('Sponsored · Paid promotion'),
  campaignId: z.string().trim().max(120).nullable().optional(),
  utmParameters: z.record(z.union([z.string().max(200), z.number().finite()])).nullable().optional(),
}).superRefine((campaign, ctx) => {
  for (const key of ['destinationUrl', 'affiliateUrl', 'trackingUrl', 'logoUrl', 'imageUrl', 'videoUrl', 'lightCreativeUrl', 'darkCreativeUrl'] as const) {
    const value = campaign[key];
    if (typeof value === 'string' && value.trim().length > 0 && !isHttpUrl(value.trim())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: [key], message: 'Only http and https URLs are allowed' });
    }
  }
  if (campaign.startsAt && campaign.endsAt && new Date(campaign.startsAt) >= new Date(campaign.endsAt)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['endsAt'], message: 'End time must be later than start time' });
  }
});

export async function GET() {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: [{ active: 'desc' }, { priority: 'desc' }, { createdAt: 'desc' }],
      take: 200,
    });
    return NextResponse.json({ promotions }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    logger.error('Admin promotion list failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Promotion content unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

export async function POST(request: Request) {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(request, campaignSchema);
  if (!parsed.ok) return parsed.response;
  const { id, ...raw } = parsed.data;
  const data = {
    ...raw,
    fullDescription: raw.fullDescription?.trim() || null,
    logoUrl: raw.logoUrl?.trim() || null,
    imageUrl: raw.imageUrl?.trim() || null,
    videoUrl: raw.videoUrl?.trim() || null,
    lightCreativeUrl: raw.lightCreativeUrl?.trim() || null,
    darkCreativeUrl: raw.darkCreativeUrl?.trim() || null,
    affiliateUrl: raw.affiliateUrl?.trim() || null,
    trackingUrl: raw.trackingUrl?.trim() || null,
    campaignId: raw.campaignId?.trim() || null,
    startsAt: raw.startsAt && raw.startsAt.trim() ? new Date(raw.startsAt) : null,
    endsAt: raw.endsAt && raw.endsAt.trim() ? new Date(raw.endsAt) : null,
    utmParameters: raw.utmParameters === undefined
      ? undefined
      : raw.utmParameters === null
        ? Prisma.DbNull
        : toInputJson(raw.utmParameters),
  };
  const { videoUrl, ...dataWithoutVideo } = data;
  try {
    let promotion: any;
    try {
      promotion = id
        ? await prisma.promotion.update({ where: { id }, data })
        : await prisma.promotion.create({ data });
    } catch (saveErr) {
      const msg = saveErr instanceof Error ? saveErr.message : String(saveErr);
      if (msg.includes('videoUrl') || msg.includes('Unknown argument')) {
        promotion = id
          ? await prisma.promotion.update({ where: { id }, data: dataWithoutVideo })
          : await prisma.promotion.create({ data: dataWithoutVideo });
        if (videoUrl !== undefined) {
          try {
            await prisma.$executeRawUnsafe(
              `UPDATE "Promotion" SET "videoUrl" = $1 WHERE "id" = $2`,
              videoUrl,
              promotion.id,
            );
            promotion.videoUrl = videoUrl;
          } catch {
            // non-fatal
          }
        }
      } else {
        throw saveErr;
      }
    }

    try {
      revalidateProductContent({ type: 'PROMOTION' });
    } catch (revalError) {
      logger.warn('Promotion cache revalidation skipped', { error: revalError });
    }
    return NextResponse.json({ promotion }, { status: id ? 200 : 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    logger.warn('Admin promotion save failed', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Promotion could not be saved' },
      { status: 409 },
    );
  }
}

export async function DELETE(request: Request) {
  const auth = await authorizeApi(ADMIN_ROLES);
  if (!auth.ok) return auth.response;
  const parsed = await parseJsonBody(
    request,
    z.object({
      id: z.string().min(1).max(64),
      permanent: z.boolean().optional(),
      active: z.boolean().optional(),
    }),
  );
  if (!parsed.ok) return parsed.response;
  try {
    if (parsed.data.permanent === true) {
      // Permanently delete campaign and associated records
      await prisma.promotion.delete({ where: { id: parsed.data.id } });
    } else {
      // Toggle active status (deactivate by default)
      await prisma.promotion.update({
        where: { id: parsed.data.id },
        data: { active: parsed.data.active ?? false },
      });
    }
    try {
      revalidateProductContent({ type: 'PROMOTION' });
    } catch {
      // non-fatal
    }
    return NextResponse.json({ ok: true, deleted: parsed.data.permanent === true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    logger.warn('Promotion delete or deactivate failed', { error });
    return NextResponse.json({ error: 'Promotion was not found or could not be deleted' }, { status: 404 });
  }
}
