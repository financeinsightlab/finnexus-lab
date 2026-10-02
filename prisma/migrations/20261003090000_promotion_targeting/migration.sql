-- Promotion targeting engine (additive, idempotent).
--
-- Adds many-to-many page targeting (PromotionTarget), many-to-many slot
-- placement (PromotionPlacement), device/theme/rotation/frequency columns and
-- richer analytics dimensions on PromotionEvent. No rows are deleted or
-- rewritten; the legacy `placement`, `targetPages` and `targetContentTypes`
-- columns stay in place and are kept in sync by the admin API.
--
-- The backfill below converts every existing promotion's legacy columns into
-- explicit rules. It is intentionally identical to the runtime adapter in
-- lib/promotions/targeting.ts (legacyTargetsFromPromotion /
-- legacyPlacementsFromPromotion), so the app behaves the same whether it is
-- deployed before or after this migration runs.

-- ── 1. Promotion columns ─────────────────────────────────────────────────────
ALTER TABLE "Promotion" ADD COLUMN IF NOT EXISTS "videoUrl" TEXT;
ALTER TABLE "Promotion" ADD COLUMN IF NOT EXISTS "tabletVisible" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Promotion" ADD COLUMN IF NOT EXISTS "themeMode" TEXT NOT NULL DEFAULT 'ALL';
ALTER TABLE "Promotion" ADD COLUMN IF NOT EXISTS "rotationMode" TEXT NOT NULL DEFAULT 'PRIORITY';
ALTER TABLE "Promotion" ADD COLUMN IF NOT EXISTS "frequencyCap" INTEGER;

-- ── 2. PromotionEvent dimensions ─────────────────────────────────────────────
ALTER TABLE "PromotionEvent" ADD COLUMN IF NOT EXISTS "slot" TEXT;
ALTER TABLE "PromotionEvent" ADD COLUMN IF NOT EXISTS "device" TEXT;
ALTER TABLE "PromotionEvent" ADD COLUMN IF NOT EXISTS "pageType" TEXT;
CREATE INDEX IF NOT EXISTS "PromotionEvent_slot_createdAt_idx"
  ON "PromotionEvent"("slot", "createdAt");

-- ── 3. PromotionTarget ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "PromotionTarget" (
  "id" TEXT NOT NULL,
  "promotionId" TEXT NOT NULL,
  "mode" TEXT NOT NULL DEFAULT 'INCLUDE',
  "targetType" TEXT NOT NULL,
  "targetValue" TEXT NOT NULL DEFAULT '',
  "includeDescendants" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PromotionTarget_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "PromotionTarget_promotionId_mode_targetType_targetValue_key"
  ON "PromotionTarget"("promotionId", "mode", "targetType", "targetValue");
CREATE INDEX IF NOT EXISTS "PromotionTarget_targetType_targetValue_idx"
  ON "PromotionTarget"("targetType", "targetValue");
DO $$ BEGIN
  ALTER TABLE "PromotionTarget"
    ADD CONSTRAINT "PromotionTarget_promotionId_fkey"
    FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── 4. PromotionPlacement ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "PromotionPlacement" (
  "id" TEXT NOT NULL,
  "promotionId" TEXT NOT NULL,
  "slot" TEXT NOT NULL,
  "weight" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PromotionPlacement_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "PromotionPlacement_promotionId_slot_key"
  ON "PromotionPlacement"("promotionId", "slot");
CREATE INDEX IF NOT EXISTS "PromotionPlacement_slot_idx" ON "PromotionPlacement"("slot");
DO $$ BEGIN
  ALTER TABLE "PromotionPlacement"
    ADD CONSTRAINT "PromotionPlacement_promotionId_fkey"
    FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── 5. Backfill rules from the legacy columns ────────────────────────────────
-- Only promotions without any explicit rule rows are touched, so re-running
-- this migration (or running it after the admin UI has saved rules) is safe.
DO $$
DECLARE
  v_promo RECORD;
  v_entry TEXT;
  v_norm TEXT;
  v_path_entries TEXT[];
  v_page_types TEXT[];
  v_slots TEXT[];
  v_slot TEXT;
  v_page_type TEXT;
  v_weight INTEGER;
  v_placement_key TEXT;
  v_content_type TEXT;
BEGIN
  FOR v_promo IN
    SELECT p."id", p."placement", p."targetPages", p."targetContentTypes", p."displayFrequency"
    FROM "Promotion" p
  LOOP
    -- ── Targets ──
    IF NOT EXISTS (SELECT 1 FROM "PromotionTarget" t WHERE t."promotionId" = v_promo."id") THEN
      v_path_entries := ARRAY[]::TEXT[];
      FOREACH v_entry IN ARRAY COALESCE(v_promo."targetPages", ARRAY[]::TEXT[]) LOOP
        v_entry := btrim(v_entry);
        CONTINUE WHEN v_entry = '';
        CONTINUE WHEN lower(v_entry) IN ('all', '*', 'global', 'universal', 'all pages', 'everywhere');
        CONTINUE WHEN lower(v_entry) LIKE '%all pages%';
        -- normalizePath(): strip scheme+host, query, hash; lower-case; leading slash; no trailing slash.
        v_norm := lower(v_entry);
        v_norm := regexp_replace(v_norm, '^[a-z][a-z0-9+.-]*://[^/]*', '');
        v_norm := split_part(split_part(v_norm, '?', 1), '#', 1);
        v_norm := btrim(v_norm);
        IF v_norm IN ('', 'home', '/home') THEN
          v_norm := '/';
        END IF;
        IF left(v_norm, 1) <> '/' THEN
          v_norm := '/' || v_norm;
        END IF;
        v_norm := regexp_replace(v_norm, '/{2,}', '/', 'g');
        v_norm := regexp_replace(v_norm, '/+$', '');
        IF v_norm = '' THEN
          v_norm := '/';
        END IF;
        v_path_entries := array_append(v_path_entries, v_norm);
      END LOOP;

      IF array_length(v_path_entries, 1) > 0 THEN
        FOREACH v_norm IN ARRAY v_path_entries LOOP
          INSERT INTO "PromotionTarget" ("id", "promotionId", "mode", "targetType", "targetValue", "includeDescendants")
          VALUES ('pt_' || replace(gen_random_uuid()::text, '-', ''), v_promo."id", 'INCLUDE', 'PATH', v_norm, v_norm <> '/')
          ON CONFLICT ("promotionId", "mode", "targetType", "targetValue") DO NOTHING;
        END LOOP;
      ELSE
        v_page_types := ARRAY[]::TEXT[];
        IF NOT ('ALL' = ANY (SELECT upper(btrim(x)) FROM unnest(COALESCE(v_promo."targetContentTypes", ARRAY[]::TEXT[])) AS x)) THEN
          FOREACH v_content_type IN ARRAY COALESCE(v_promo."targetContentTypes", ARRAY[]::TEXT[]) LOOP
            v_content_type := upper(btrim(v_content_type));
            v_page_types := v_page_types || CASE v_content_type
              WHEN 'HOME' THEN ARRAY['HOME']
              WHEN 'PAGE' THEN ARRAY['PRICING', 'RADAR']
              WHEN 'RESEARCH' THEN ARRAY['RESEARCH']
              WHEN 'INSIGHT' THEN ARRAY['INSIGHT']
              WHEN 'ARTICLE' THEN ARRAY['INSIGHT']
              WHEN 'COURSE' THEN ARRAY['COURSE']
              WHEN 'PGDM' THEN ARRAY['COURSE']
              WHEN 'PGDM_COURSE' THEN ARRAY['COURSE']
              WHEN 'COURSE_LESSON' THEN ARRAY['COURSE', 'STUDY']
              WHEN 'STUDY' THEN ARRAY['STUDY']
              WHEN 'STUDY_COURSE' THEN ARRAY['STUDY']
              WHEN 'TOOL' THEN ARRAY['CALCULATOR', 'TOOL']
              WHEN 'CALCULATOR' THEN ARRAY['CALCULATOR']
              WHEN 'FINANCE_TERM' THEN ARRAY['FINANCE_TERM']
              WHEN 'CASE_STUDY' THEN ARRAY['CASE_STUDY']
              WHEN 'DATASET' THEN ARRAY['DATA_LAB']
              WHEN 'DATA_LAB' THEN ARRAY['DATA_LAB']
              WHEN 'TRACKER' THEN ARRAY['TRACKER']
              WHEN 'CERTIFICATE' THEN ARRAY['CERTIFICATE']
              WHEN 'PREDICTION' THEN ARRAY['PREDICTION']
              WHEN 'PODCAST' THEN ARRAY['PODCAST']
              WHEN 'DASHBOARD' THEN ARRAY['DASHBOARD']
              WHEN 'PLACEMENT_PREP' THEN ARRAY['PLACEMENT_PREP']
              WHEN 'PRICING' THEN ARRAY['PRICING']
              WHEN 'SERVICES' THEN ARRAY['SERVICES']
              WHEN 'ABOUT' THEN ARRAY['ABOUT']
              WHEN 'CONTACT' THEN ARRAY['CONTACT']
              WHEN 'RADAR' THEN ARRAY['RADAR']
              ELSE ARRAY[]::TEXT[]
            END;
          END LOOP;
        END IF;

        IF COALESCE(array_length(v_page_types, 1), 0) = 0 THEN
          v_placement_key := upper(COALESCE(v_promo."placement", ''));
          v_page_types := CASE v_placement_key
            WHEN 'HOME_HERO' THEN ARRAY['HOME']
            WHEN 'HOME_SECTION' THEN ARRAY['HOME']
            WHEN 'COURSE_PAGE' THEN ARRAY['COURSE', 'STUDY']
            WHEN 'TOOL_PAGE' THEN ARRAY['TOOL', 'CALCULATOR']
            WHEN 'CALCULATOR_PAGE' THEN ARRAY['CALCULATOR']
            WHEN 'RESEARCH_PAGE' THEN ARRAY['RESEARCH']
            WHEN 'ARTICLE_PAGE' THEN ARRAY['INSIGHT', 'FINANCE_TERM', 'CASE_STUDY', 'DATA_LAB']
            WHEN 'STUDY_PAGE' THEN ARRAY['STUDY']
            WHEN 'BETWEEN_CONTENT' THEN ARRAY['PRICING', 'RADAR', 'TRACKER', 'FINANCE_TERM']
            WHEN 'DASHBOARD' THEN ARRAY['DASHBOARD']
            ELSE ARRAY[]::TEXT[]
          END;
        END IF;

        IF COALESCE(array_length(v_page_types, 1), 0) > 0 THEN
          FOREACH v_page_type IN ARRAY v_page_types LOOP
            INSERT INTO "PromotionTarget" ("id", "promotionId", "mode", "targetType", "targetValue", "includeDescendants")
            VALUES ('pt_' || replace(gen_random_uuid()::text, '-', ''), v_promo."id", 'INCLUDE', 'PAGE_TYPE', v_page_type, false)
            ON CONFLICT ("promotionId", "mode", "targetType", "targetValue") DO NOTHING;
          END LOOP;
        ELSE
          INSERT INTO "PromotionTarget" ("id", "promotionId", "mode", "targetType", "targetValue", "includeDescendants")
          VALUES ('pt_' || replace(gen_random_uuid()::text, '-', ''), v_promo."id", 'INCLUDE', 'GLOBAL', '', false)
          ON CONFLICT ("promotionId", "mode", "targetType", "targetValue") DO NOTHING;
        END IF;
      END IF;
    END IF;

    -- ── Placements ──
    IF NOT EXISTS (SELECT 1 FROM "PromotionPlacement" pl WHERE pl."promotionId" = v_promo."id") THEN
      v_placement_key := upper(COALESCE(v_promo."placement", ''));
      v_slots := CASE v_placement_key
        WHEN 'ALL' THEN ARRAY['SIDEBAR', 'CONTENT_BOTTOM']
        WHEN 'GLOBAL' THEN ARRAY['SIDEBAR', 'CONTENT_BOTTOM']
        WHEN 'HOME_HERO' THEN ARRAY['HOME_HERO']
        WHEN 'HOME_SECTION' THEN ARRAY['HOME_SECTION']
        WHEN 'SIDEBAR' THEN ARRAY['SIDEBAR']
        WHEN 'DASHBOARD' THEN ARRAY['DASHBOARD']
        WHEN 'FOOTER' THEN ARRAY['FOOTER']
        WHEN 'CTA_BLOCK' THEN ARRAY['CTA_SECTION']
        ELSE ARRAY['CONTENT_BOTTOM']
      END;
      v_weight := LEAST(10, GREATEST(1, COALESCE(v_promo."displayFrequency", 1)));
      FOREACH v_slot IN ARRAY v_slots LOOP
        INSERT INTO "PromotionPlacement" ("id", "promotionId", "slot", "weight")
        VALUES ('pp_' || replace(gen_random_uuid()::text, '-', ''), v_promo."id", v_slot, v_weight)
        ON CONFLICT ("promotionId", "slot") DO NOTHING;
      END LOOP;
    END IF;
  END LOOP;
END $$;
