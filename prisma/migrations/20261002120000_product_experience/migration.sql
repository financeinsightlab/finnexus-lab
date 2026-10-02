-- Additive product-experience schema: CMS-managed FAQs and terms, courses/tests,
-- certificates, contextual links, and promotion analytics. No existing rows are
-- deleted or rewritten. The FAQ inserts below preserve current public FAQs while
-- moving them into the shared CMS-managed model.

ALTER TABLE "StudyMaterial"
  ADD COLUMN IF NOT EXISTS "learningOutcomes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS "prerequisites" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

ALTER TABLE "LessonProgress"
  ADD COLUMN IF NOT EXISTS "startedAt" TIMESTAMP(3);


CREATE TABLE IF NOT EXISTS "FaqItem" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "category" TEXT,
  "relatedType" TEXT NOT NULL,
  "relatedSlug" TEXT NOT NULL,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "seoVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "FaqItem_relatedType_relatedSlug_slug_key"
  ON "FaqItem"("relatedType", "relatedSlug", "slug");
CREATE INDEX IF NOT EXISTS "FaqItem_relatedType_relatedSlug_published_displayOrder_idx"
  ON "FaqItem"("relatedType", "relatedSlug", "published", "displayOrder");
CREATE INDEX IF NOT EXISTS "FaqItem_published_seoVisible_idx"
  ON "FaqItem"("published", "seoVisible");

CREATE TABLE IF NOT EXISTS "FinanceTerm" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "term" TEXT NOT NULL,
  "simpleMeaning" TEXT NOT NULL,
  "example" TEXT NOT NULL,
  "interviewAnswer" TEXT NOT NULL,
  "formula" TEXT,
  "category" TEXT NOT NULL,
  "difficulty" TEXT NOT NULL DEFAULT 'BEGINNER',
  "keywords" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "synonyms" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "relatedTermSlugs" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "searchText" TEXT NOT NULL DEFAULT '',
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "seoVisible" BOOLEAN NOT NULL DEFAULT true,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "FinanceTerm_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "FinanceTerm_slug_key" ON "FinanceTerm"("slug");
CREATE INDEX IF NOT EXISTS "FinanceTerm_published_displayOrder_idx"
  ON "FinanceTerm"("published", "displayOrder");
CREATE INDEX IF NOT EXISTS "FinanceTerm_category_published_displayOrder_idx"
  ON "FinanceTerm"("category", "published", "displayOrder");
CREATE INDEX IF NOT EXISTS "FinanceTerm_featured_published_idx"
  ON "FinanceTerm"("featured", "published");

CREATE TABLE IF NOT EXISTS "RelatedContent" (
  "id" TEXT NOT NULL,
  "sourceType" TEXT NOT NULL,
  "sourceSlug" TEXT NOT NULL,
  "targetType" TEXT NOT NULL,
  "targetSlug" TEXT NOT NULL,
  "anchorText" TEXT,
  "linkKind" TEXT NOT NULL DEFAULT 'RELATED',
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RelatedContent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "RelatedContent_sourceType_sourceSlug_targetType_targetSlug_key"
  ON "RelatedContent"("sourceType", "sourceSlug", "targetType", "targetSlug");
CREATE INDEX IF NOT EXISTS "RelatedContent_sourceType_sourceSlug_published_displayOrder_idx"
  ON "RelatedContent"("sourceType", "sourceSlug", "published", "displayOrder");
CREATE INDEX IF NOT EXISTS "RelatedContent_targetType_targetSlug_idx"
  ON "RelatedContent"("targetType", "targetSlug");

CREATE TABLE IF NOT EXISTS "CourseLesson" (
  "id" TEXT NOT NULL,
  "courseSlug" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT,
  "content" TEXT NOT NULL,
  "durationMinutes" INTEGER,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CourseLesson_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "CourseLesson_courseSlug_slug_key"
  ON "CourseLesson"("courseSlug", "slug");
CREATE INDEX IF NOT EXISTS "CourseLesson_courseSlug_published_displayOrder_idx"
  ON "CourseLesson"("courseSlug", "published", "displayOrder");

CREATE TABLE IF NOT EXISTS "CourseAssessment" (
  "id" TEXT NOT NULL,
  "courseSlug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "instructions" TEXT,
  "passPercentage" INTEGER NOT NULL DEFAULT 70,
  "maxAttempts" INTEGER,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CourseAssessment_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "CourseAssessment_courseSlug_key"
  ON "CourseAssessment"("courseSlug");
CREATE INDEX IF NOT EXISTS "CourseAssessment_published_idx"
  ON "CourseAssessment"("published");

CREATE TABLE IF NOT EXISTS "CourseAssessmentQuestion" (
  "id" TEXT NOT NULL,
  "assessmentId" TEXT NOT NULL,
  "prompt" TEXT NOT NULL,
  "options" JSONB NOT NULL,
  "correctOption" INTEGER NOT NULL,
  "explanation" TEXT NOT NULL,
  "marks" INTEGER NOT NULL DEFAULT 1,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CourseAssessmentQuestion_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "CourseAssessmentQuestion_assessmentId_displayOrder_idx"
  ON "CourseAssessmentQuestion"("assessmentId", "displayOrder");
DO $$ BEGIN
  ALTER TABLE "CourseAssessmentQuestion"
    ADD CONSTRAINT "CourseAssessmentQuestion_assessmentId_fkey"
    FOREIGN KEY ("assessmentId") REFERENCES "CourseAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "CourseAssessmentAttempt" (
  "id" TEXT NOT NULL,
  "assessmentId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "attemptNumber" INTEGER NOT NULL,
  "score" INTEGER NOT NULL,
  "maxScore" INTEGER NOT NULL,
  "percentage" INTEGER NOT NULL,
  "passed" BOOLEAN NOT NULL DEFAULT false,
  "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CourseAssessmentAttempt_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "CourseAssessmentAttempt_assessmentId_userId_attemptNumber_key"
  ON "CourseAssessmentAttempt"("assessmentId", "userId", "attemptNumber");
CREATE INDEX IF NOT EXISTS "CourseAssessmentAttempt_assessmentId_userId_submittedAt_idx"
  ON "CourseAssessmentAttempt"("assessmentId", "userId", "submittedAt");
CREATE INDEX IF NOT EXISTS "CourseAssessmentAttempt_userId_passed_idx"
  ON "CourseAssessmentAttempt"("userId", "passed");
DO $$ BEGIN
  ALTER TABLE "CourseAssessmentAttempt"
    ADD CONSTRAINT "CourseAssessmentAttempt_assessmentId_fkey"
    FOREIGN KEY ("assessmentId") REFERENCES "CourseAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  ALTER TABLE "CourseAssessmentAttempt"
    ADD CONSTRAINT "CourseAssessmentAttempt_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "CourseCertificate" (
  "id" TEXT NOT NULL,
  "certificateId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "courseSlug" TEXT NOT NULL,
  "studentName" TEXT NOT NULL,
  "courseTitle" TEXT NOT NULL,
  "completedAt" TIMESTAMP(3) NOT NULL,
  "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "status" TEXT NOT NULL DEFAULT 'ACTIVE',
  CONSTRAINT "CourseCertificate_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "CourseCertificate_certificateId_key"
  ON "CourseCertificate"("certificateId");
CREATE UNIQUE INDEX IF NOT EXISTS "CourseCertificate_userId_courseSlug_key"
  ON "CourseCertificate"("userId", "courseSlug");
CREATE INDEX IF NOT EXISTS "CourseCertificate_status_issuedAt_idx"
  ON "CourseCertificate"("status", "issuedAt");
DO $$ BEGIN
  ALTER TABLE "CourseCertificate"
    ADD CONSTRAINT "CourseCertificate_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "Promotion" (
  "id" TEXT NOT NULL,
  "brandName" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  "fullDescription" TEXT,
  "logoUrl" TEXT,
  "imageUrl" TEXT,
  "lightCreativeUrl" TEXT,
  "darkCreativeUrl" TEXT,
  "ctaText" TEXT NOT NULL DEFAULT 'Learn more',
  "destinationUrl" TEXT NOT NULL,
  "affiliateUrl" TEXT,
  "trackingUrl" TEXT,
  "category" TEXT NOT NULL,
  "placement" TEXT NOT NULL,
  "targetPages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "targetContentTypes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "startsAt" TIMESTAMP(3),
  "endsAt" TIMESTAMP(3),
  "active" BOOLEAN NOT NULL DEFAULT false,
  "priority" INTEGER NOT NULL DEFAULT 0,
  "displayFrequency" INTEGER NOT NULL DEFAULT 1,
  "mobileVisible" BOOLEAN NOT NULL DEFAULT true,
  "desktopVisible" BOOLEAN NOT NULL DEFAULT true,
  "disclosureType" TEXT NOT NULL DEFAULT 'SPONSORED',
  "disclosureText" TEXT NOT NULL DEFAULT 'Sponsored · Paid promotion',
  "campaignId" TEXT,
  "utmParameters" JSONB,
  "conversionTrackingUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "Promotion_placement_active_priority_idx"
  ON "Promotion"("placement", "active", "priority");
CREATE INDEX IF NOT EXISTS "Promotion_startsAt_endsAt_idx"
  ON "Promotion"("startsAt", "endsAt");
CREATE INDEX IF NOT EXISTS "Promotion_category_idx" ON "Promotion"("category");
CREATE INDEX IF NOT EXISTS "Promotion_campaignId_idx" ON "Promotion"("campaignId");

CREATE TABLE IF NOT EXISTS "PromotionEvent" (
  "id" TEXT NOT NULL,
  "promotionId" TEXT NOT NULL,
  "eventType" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PromotionEvent_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "PromotionEvent_promotionId_eventType_createdAt_idx"
  ON "PromotionEvent"("promotionId", "eventType", "createdAt");
CREATE INDEX IF NOT EXISTS "PromotionEvent_path_createdAt_idx"
  ON "PromotionEvent"("path", "createdAt");
DO $$ BEGIN
  ALTER TABLE "PromotionEvent"
    ADD CONSTRAINT "PromotionEvent_promotionId_fkey"
    FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Preserve existing public FAQs and ensure the new shared component can display
-- exactly the same content with matching, visible FAQPage structured data.
INSERT INTO "FaqItem" ("id", "slug", "question", "answer", "category", "relatedType", "relatedSlug", "displayOrder", "published", "seoVisible", "createdAt", "updatedAt") VALUES
('faq_home_what_is', 'what-is-kunwar-analytics', 'What is Kunwar Analytics?', 'Kunwar Analytics is a financial intelligence platform that provides data-driven insights on markets, strategy, and capital. It offers institutional-quality research, business analytics, investment analysis, and educational study materials covering finance, data science, economics, and research methods.', 'Platform', 'PAGE', 'home', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_home_topics', 'topics-covered', 'What topics does Kunwar Analytics cover?', 'Kunwar Analytics covers financial analysis, market research, business analytics, investment analysis, data science, economics, quantitative research methods, and portfolio management — with a focus on Indian and global markets.', 'Platform', 'PAGE', 'home', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_home_free', 'is-kunwar-analytics-free', 'Is Kunwar Analytics free to use?', 'Kunwar Analytics provides free research, insights, and study materials. Some paid features may be offered separately; access is activated only after manual payment review. Team and Enterprise packages are not available through self-service checkout, and no unlisted features or service levels are promised.', 'Platform', 'PAGE', 'home', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_home_study', 'available-study-materials', 'What study materials are available on Kunwar Analytics?', 'The Study Material section offers educational resources across categories including Finance, Business Analytics, Research Methods, Data Science, Economics, and Investment Analysis. Materials range from beginner to advanced difficulty and include articles, courses, videos, PDFs, and notes.', 'Learning', 'PAGE', 'home', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_home_audience', 'who-is-kunwar-analytics-for', 'Who is Kunwar Analytics for?', 'Kunwar Analytics serves retail investors, financial analysts, business strategists, MBA students, and data science professionals seeking rigorous, data-backed financial intelligence and market analysis.', 'Platform', 'PAGE', 'home', 4, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_pricing_payment', 'how-paid-access-works', 'How does paid access work?', 'Self-service checkout is available for Pro and Elite through manual UPI only. Submit the transaction reference and wait for administrator review; submission alone does not activate access. Approval grants one calendar month, and renewal requires another manual payment and approval.', 'Plans and payment', 'PAGE', 'pricing', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_pricing_cards', 'card-payments-and-renewals', 'Are card payments or automatic renewals available?', 'No. Card checkout, automatic payment verification, and recurring renewals are not active. The checkout page shows the current UPI instructions and plan amount.', 'Plans and payment', 'PAGE', 'pricing', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_pricing_teams', 'team-and-enterprise-availability', 'Are Team or Enterprise features available?', 'Team and Enterprise are not available through self-service checkout. Shared seats, SSO, premium API limits, service-level guarantees, and custom research are not currently included offers. Contact us to ask about current availability; any scope must be confirmed separately.', 'Plans and payment', 'PAGE', 'pricing', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_pricing_refunds', 'payment-terms-and-refunds', 'Where can I ask about payment terms or refunds?', 'The current checkout describes the manual UPI process and one-month access period. No general refund guarantee is advertised here; contact us before paying if you need clarification.', 'Plans and payment', 'PAGE', 'pricing', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_radar_what', 'what-is-the-radar', 'What is the Contrarian Signal Radar?', 'A visualization of site-defined quarter-keyed sector indicators, with a supplementary keyword-derived content signal when available. It is not a market-wide consensus survey.', 'Methodology', 'PAGE', 'radar', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_radar_source', 'radar-data-source', 'Where does the radar data come from?', 'Baseline values use the same stored tracker data as sector pages. Supplementary sentiment is derived by keyword scoring of local research and insight content, not live market feeds.', 'Methodology', 'PAGE', 'radar', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_radar_read', 'how-to-read-the-temperature', 'How do I read the temperature?', 'The 0–100 values and range labels are site-defined indicators, not verified market consensus, a forecast, or a buy/sell signal. Use them only as descriptive context.', 'Methodology', 'PAGE', 'radar', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_radar_quarters', 'compare-radar-quarters', 'Can I compare quarters?', 'Use the quarter selector to compare stored snapshots labeled Actual or Projection. Projection values may not match realized outcomes; refresh timing is not guaranteed.', 'Methodology', 'PAGE', 'radar', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("relatedType", "relatedSlug", "slug") DO NOTHING;


-- Move existing visible Contact and tracker FAQs into the contextual CMS.
-- The seeded answers retain the original on-page caveats and are not generated from live data.
INSERT INTO "FaqItem" ("id", "slug", "question", "answer", "category", "relatedType", "relatedSlug", "displayOrder", "published", "seoVisible", "createdAt", "updatedAt") VALUES
('faq_contact_can_i_enquire_about_a_project', 'can-i-enquire-about-a-project', 'Can I enquire about a project?', 'You may submit an enquiry about a research, modelling, or analytics topic. This does not confirm availability, acceptance, scope, price, timing, or a service.', 'Enquiries', 'PAGE', 'contact', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_contact_how_is_pricing_structured', 'how-is-pricing-structured', 'How is pricing structured?', 'The pricing page lists the self-service Pro and Elite access prices. Other project or organization-enquiry pricing is not published; any scope, fee, timing, deliverables, and terms must be separately confirmed in writing before work begins.', 'Enquiries', 'PAGE', 'contact', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_contact_can_you_work_under_an_nda', 'can-you-work-under-an-nda', 'Can you work under an NDA?', 'Do not send confidential material through this form. You may ask whether an NDA is possible; no NDA or other terms apply unless separately agreed in writing before any material is shared.', 'Enquiries', 'PAGE', 'contact', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_contact_student_or_academic_rates', 'student-or-academic-rates', 'Do you offer student or academic rates?', 'Some learning content is publicly accessible. No separate student or academic discount is advertised; check the relevant page for current access details.', 'Enquiries', 'PAGE', 'contact', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_tracker_index_1', 'what-are-sector-trackers', 'What are Kunwar Analytics sector trackers?', 'Sector pages display quarter-keyed snapshots and site-defined indicators. Coverage varies by sector; these are not an intraday market feed or a market-wide analyst survey.', 'Methodology', 'PAGE', 'tracker', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_tracker_index_2', 'tracker-refresh-schedule', 'How often is tracker data updated?', 'No guaranteed refresh interval or per-metric source timestamp is published here. The quarter selector displays stored snapshots labeled Actual or Projection.', 'Methodology', 'PAGE', 'tracker', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_tracker_index_3', 'tracker-temperature-indicator', 'What is the temperature indicator?', 'It is a site-defined 0–100 indicator shown with the selected snapshot, not a measured market-wide consensus or an investment signal.', 'Methodology', 'PAGE', 'tracker', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_tracker_index_4', 'tracker-financial-advice', 'Is this financial advice?', 'No. These trackers are for research and educational context; they are not investment advice or a recommendation to buy or sell any security.', 'Methodology', 'PAGE', 'tracker', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_quick-commerce_1', 'tracker-coverage', 'What does the Quick Commerce tracker cover?', 'This page presents the stored KPIs, sub-sector breakdowns, competitive entries, trends, regulatory information, SWOT, scenario estimates, and additional metric entries available for Quick Commerce. Coverage and source detail vary by section; this is not a live verified feed.', 'Methodology', 'TRACKER', 'quick-commerce', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_quick-commerce_2', 'tracker-indicator', 'What does the tracker indicator show?', 'The displayed 0–100 indicator and its label are site-defined summaries of the selected stored snapshot; they are not a measured market-wide consensus, forecast, or investment signal.', 'Methodology', 'TRACKER', 'quick-commerce', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_quick-commerce_3', 'refresh-schedule', 'What is the refresh schedule?', 'No guaranteed refresh interval or per-metric source timestamp is published for every value. The quarter selector displays stored snapshots labeled Actual or Projection.', 'Methodology', 'TRACKER', 'quick-commerce', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_quick-commerce_4', 'compare-quarters', 'How do I compare quarters?', 'Use the quarter selector to compare available stored snapshots. Projection values may not match realized outcomes.', 'Methodology', 'TRACKER', 'quick-commerce', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_quick-commerce_5', 'financial-advice', 'Is this financial advice?', 'No. These trackers are educational market-intelligence dashboards for research and analysis; they are not investment advice or a recommendation to buy or sell any security.', 'Methodology', 'TRACKER', 'quick-commerce', 4, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_fintech_1', 'tracker-coverage', 'What does the Fintech tracker cover?', 'This page presents the stored KPIs, sub-sector breakdowns, competitive entries, trends, regulatory information, SWOT, scenario estimates, and additional metric entries available for Fintech. Coverage and source detail vary by section; this is not a live verified feed.', 'Methodology', 'TRACKER', 'fintech', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_fintech_2', 'tracker-indicator', 'What does the tracker indicator show?', 'The displayed 0–100 indicator and its label are site-defined summaries of the selected stored snapshot; they are not a measured market-wide consensus, forecast, or investment signal.', 'Methodology', 'TRACKER', 'fintech', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_fintech_3', 'refresh-schedule', 'What is the refresh schedule?', 'No guaranteed refresh interval or per-metric source timestamp is published for every value. The quarter selector displays stored snapshots labeled Actual or Projection.', 'Methodology', 'TRACKER', 'fintech', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_fintech_4', 'compare-quarters', 'How do I compare quarters?', 'Use the quarter selector to compare available stored snapshots. Projection values may not match realized outcomes.', 'Methodology', 'TRACKER', 'fintech', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_fintech_5', 'financial-advice', 'Is this financial advice?', 'No. These trackers are educational market-intelligence dashboards for research and analysis; they are not investment advice or a recommendation to buy or sell any security.', 'Methodology', 'TRACKER', 'fintech', 4, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_ev_1', 'tracker-coverage', 'What does the Electric Vehicles tracker cover?', 'This page presents the stored KPIs, sub-sector breakdowns, competitive entries, trends, regulatory information, SWOT, scenario estimates, and additional metric entries available for Electric Vehicles. Coverage and source detail vary by section; this is not a live verified feed.', 'Methodology', 'TRACKER', 'ev', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_ev_2', 'tracker-indicator', 'What does the tracker indicator show?', 'The displayed 0–100 indicator and its label are site-defined summaries of the selected stored snapshot; they are not a measured market-wide consensus, forecast, or investment signal.', 'Methodology', 'TRACKER', 'ev', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_ev_3', 'refresh-schedule', 'What is the refresh schedule?', 'No guaranteed refresh interval or per-metric source timestamp is published for every value. The quarter selector displays stored snapshots labeled Actual or Projection.', 'Methodology', 'TRACKER', 'ev', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_ev_4', 'compare-quarters', 'How do I compare quarters?', 'Use the quarter selector to compare available stored snapshots. Projection values may not match realized outcomes.', 'Methodology', 'TRACKER', 'ev', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_ev_5', 'financial-advice', 'Is this financial advice?', 'No. These trackers are educational market-intelligence dashboards for research and analysis; they are not investment advice or a recommendation to buy or sell any security.', 'Methodology', 'TRACKER', 'ev', 4, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_food-delivery_1', 'tracker-coverage', 'What does the Food Delivery tracker cover?', 'This page presents the stored KPIs, sub-sector breakdowns, competitive entries, trends, regulatory information, SWOT, scenario estimates, and additional metric entries available for Food Delivery. Coverage and source detail vary by section; this is not a live verified feed.', 'Methodology', 'TRACKER', 'food-delivery', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_food-delivery_2', 'tracker-indicator', 'What does the tracker indicator show?', 'The displayed 0–100 indicator and its label are site-defined summaries of the selected stored snapshot; they are not a measured market-wide consensus, forecast, or investment signal.', 'Methodology', 'TRACKER', 'food-delivery', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_food-delivery_3', 'refresh-schedule', 'What is the refresh schedule?', 'No guaranteed refresh interval or per-metric source timestamp is published for every value. The quarter selector displays stored snapshots labeled Actual or Projection.', 'Methodology', 'TRACKER', 'food-delivery', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_food-delivery_4', 'compare-quarters', 'How do I compare quarters?', 'Use the quarter selector to compare available stored snapshots. Projection values may not match realized outcomes.', 'Methodology', 'TRACKER', 'food-delivery', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_food-delivery_5', 'financial-advice', 'Is this financial advice?', 'No. These trackers are educational market-intelligence dashboards for research and analysis; they are not investment advice or a recommendation to buy or sell any security.', 'Methodology', 'TRACKER', 'food-delivery', 4, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_saas_1', 'tracker-coverage', 'What does the Enterprise SaaS tracker cover?', 'This page presents the stored KPIs, sub-sector breakdowns, competitive entries, trends, regulatory information, SWOT, scenario estimates, and additional metric entries available for Enterprise SaaS. Coverage and source detail vary by section; this is not a live verified feed.', 'Methodology', 'TRACKER', 'saas', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_saas_2', 'tracker-indicator', 'What does the tracker indicator show?', 'The displayed 0–100 indicator and its label are site-defined summaries of the selected stored snapshot; they are not a measured market-wide consensus, forecast, or investment signal.', 'Methodology', 'TRACKER', 'saas', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_saas_3', 'refresh-schedule', 'What is the refresh schedule?', 'No guaranteed refresh interval or per-metric source timestamp is published for every value. The quarter selector displays stored snapshots labeled Actual or Projection.', 'Methodology', 'TRACKER', 'saas', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_saas_4', 'compare-quarters', 'How do I compare quarters?', 'Use the quarter selector to compare available stored snapshots. Projection values may not match realized outcomes.', 'Methodology', 'TRACKER', 'saas', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_saas_5', 'financial-advice', 'Is this financial advice?', 'No. These trackers are educational market-intelligence dashboards for research and analysis; they are not investment advice or a recommendation to buy or sell any security.', 'Methodology', 'TRACKER', 'saas', 4, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_d2c_1', 'tracker-coverage', 'What does the D2C Brands tracker cover?', 'This page presents the stored KPIs, sub-sector breakdowns, competitive entries, trends, regulatory information, SWOT, scenario estimates, and additional metric entries available for D2C Brands. Coverage and source detail vary by section; this is not a live verified feed.', 'Methodology', 'TRACKER', 'd2c', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_d2c_2', 'tracker-indicator', 'What does the tracker indicator show?', 'The displayed 0–100 indicator and its label are site-defined summaries of the selected stored snapshot; they are not a measured market-wide consensus, forecast, or investment signal.', 'Methodology', 'TRACKER', 'd2c', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_d2c_3', 'refresh-schedule', 'What is the refresh schedule?', 'No guaranteed refresh interval or per-metric source timestamp is published for every value. The quarter selector displays stored snapshots labeled Actual or Projection.', 'Methodology', 'TRACKER', 'd2c', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_d2c_4', 'compare-quarters', 'How do I compare quarters?', 'Use the quarter selector to compare available stored snapshots. Projection values may not match realized outcomes.', 'Methodology', 'TRACKER', 'd2c', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_d2c_5', 'financial-advice', 'Is this financial advice?', 'No. These trackers are educational market-intelligence dashboards for research and analysis; they are not investment advice or a recommendation to buy or sell any security.', 'Methodology', 'TRACKER', 'd2c', 4, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_healthcare_1', 'tracker-coverage', 'What does the HealthTech tracker cover?', 'This page presents the stored KPIs, sub-sector breakdowns, competitive entries, trends, regulatory information, SWOT, scenario estimates, and additional metric entries available for HealthTech. Coverage and source detail vary by section; this is not a live verified feed.', 'Methodology', 'TRACKER', 'healthcare', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_healthcare_2', 'tracker-indicator', 'What does the tracker indicator show?', 'The displayed 0–100 indicator and its label are site-defined summaries of the selected stored snapshot; they are not a measured market-wide consensus, forecast, or investment signal.', 'Methodology', 'TRACKER', 'healthcare', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_healthcare_3', 'refresh-schedule', 'What is the refresh schedule?', 'No guaranteed refresh interval or per-metric source timestamp is published for every value. The quarter selector displays stored snapshots labeled Actual or Projection.', 'Methodology', 'TRACKER', 'healthcare', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_healthcare_4', 'compare-quarters', 'How do I compare quarters?', 'Use the quarter selector to compare available stored snapshots. Projection values may not match realized outcomes.', 'Methodology', 'TRACKER', 'healthcare', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_healthcare_5', 'financial-advice', 'Is this financial advice?', 'No. These trackers are educational market-intelligence dashboards for research and analysis; they are not investment advice or a recommendation to buy or sell any security.', 'Methodology', 'TRACKER', 'healthcare', 4, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_edtech_1', 'tracker-coverage', 'What does the EdTech tracker cover?', 'This page presents the stored KPIs, sub-sector breakdowns, competitive entries, trends, regulatory information, SWOT, scenario estimates, and additional metric entries available for EdTech. Coverage and source detail vary by section; this is not a live verified feed.', 'Methodology', 'TRACKER', 'edtech', 0, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_edtech_2', 'tracker-indicator', 'What does the tracker indicator show?', 'The displayed 0–100 indicator and its label are site-defined summaries of the selected stored snapshot; they are not a measured market-wide consensus, forecast, or investment signal.', 'Methodology', 'TRACKER', 'edtech', 1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_edtech_3', 'refresh-schedule', 'What is the refresh schedule?', 'No guaranteed refresh interval or per-metric source timestamp is published for every value. The quarter selector displays stored snapshots labeled Actual or Projection.', 'Methodology', 'TRACKER', 'edtech', 2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_edtech_4', 'compare-quarters', 'How do I compare quarters?', 'Use the quarter selector to compare available stored snapshots. Projection values may not match realized outcomes.', 'Methodology', 'TRACKER', 'edtech', 3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('faq_sector_edtech_5', 'financial-advice', 'Is this financial advice?', 'No. These trackers are educational market-intelligence dashboards for research and analysis; they are not investment advice or a recommendation to buy or sell any security.', 'Methodology', 'TRACKER', 'edtech', 4, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("relatedType", "relatedSlug", "slug") DO NOTHING;
