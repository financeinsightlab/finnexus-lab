-- Base schema for local development, hand-derived from prisma/schema.prisma.
-- (Used because prisma migrate/db push need the native schema-engine binary,
--  which cannot be downloaded in this sandbox.)
-- NOTE: add_cms_enhancements migration is already reflected in schema.prisma,
--  so applying this file alone yields the correct final state.

-- ── Enums ────────────────────────────────────────────────────────────────────
CREATE TYPE "UserRole" AS ENUM ('MEMBER', 'VIEWER', 'ADMIN', 'ANALYST');
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PAST_DUE', 'CANCELED', 'TRIALING');
CREATE TYPE "ArticleType" AS ENUM ('RESEARCH', 'INSIGHT', 'CASE_STUDY', 'MEDIA', 'OTHER');
CREATE TYPE "PageStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "HomePageSection" AS ENUM ('RESEARCH', 'INSIGHTS', 'PILLARS', 'TRACKERS', 'PODCAST', 'HERO_STATS');
CREATE TYPE "PredictionStatus" AS ENUM ('PENDING', 'CONFIRMED', 'INCORRECT', 'PARTIAL');

-- ── Tables ───────────────────────────────────────────────────────────────────
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "customBadge" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "stripeCustomerId" TEXT,
    "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'INACTIVE',
    "subscriptionPlan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "purchasedServices" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "SavedArticle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SavedArticle_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "type" "ArticleType" NOT NULL DEFAULT 'RESEARCH',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featuredImage" TEXT,
    "authorId" TEXT NOT NULL,
    "seoTitle" TEXT,
    "metaDescription" TEXT,
    "focusKeywords" TEXT,
    "ogImage" TEXT,
    "ogTitle" TEXT,
    "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "difficulty" TEXT NOT NULL DEFAULT 'INTERMEDIATE',
    "targetAudience" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "contentStatus" TEXT NOT NULL DEFAULT 'DRAFT',
    "estimatedReadingTime" INTEGER NOT NULL DEFAULT 5,
    "scheduledPublishAt" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "blockContent" JSONB,
    "contentType" TEXT NOT NULL DEFAULT 'MARKDOWN',
    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "altText" TEXT,
    "caption" TEXT,
    "description" TEXT,
    "uploadedBy" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ContentBlock" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "attributes" JSONB,
    "order" INTEGER NOT NULL,
    "parentId" TEXT,
    "postId" TEXT,
    "pageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContentBlock_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "BlockTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "preview" TEXT,
    "data" JSONB NOT NULL,
    "category" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BlockTemplate_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB,
    "htmlContent" TEXT,
    "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
    "seoTitle" TEXT,
    "metaDescription" TEXT,
    "featuredImage" TEXT,
    "authorId" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT NOT NULL,
    "durationMs" INTEGER NOT NULL DEFAULT 0,
    "referrer" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LoginEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'credentials',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LoginEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FeaturedContent" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FeaturedContent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HomePageAuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "section" TEXT,
    "itemId" TEXT,
    "userId" TEXT NOT NULL,
    "oldValue" JSONB,
    "newValue" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HomePageAuditLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HomePageConfig" (
    "id" TEXT NOT NULL,
    "section" "HomePageSection" NOT NULL,
    "config" JSONB NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HomePageConfig_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HomePageItem" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "link" TEXT,
    "color" TEXT,
    "order" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HomePageItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "claim" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "resolveDate" TIMESTAMP(3) NOT NULL,
    "status" "PredictionStatus" NOT NULL DEFAULT 'PENDING',
    "resolutionNote" TEXT,
    "reportSlug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AnalystScore" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "totalPredictions" INTEGER NOT NULL DEFAULT 0,
    "confirmed" INTEGER NOT NULL DEFAULT 0,
    "incorrect" INTEGER NOT NULL DEFAULT 0,
    "partial" INTEGER NOT NULL DEFAULT 0,
    "calibrationScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastCalculated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AnalystScore_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT,
    "predictionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StudyCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyCategory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StudyMaterial" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'ARTICLE',
    "difficulty" TEXT NOT NULL DEFAULT 'BEGINNER',
    "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "coverImage" TEXT,
    "resourceUrl" TEXT,
    "duration" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyMaterial_pkey" PRIMARY KEY ("id")
);

-- ── Unique constraints / indexes ─────────────────────────────────────────────
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
CREATE UNIQUE INDEX "SavedArticle_userId_slug_type_key" ON "SavedArticle"("userId", "slug", "type");
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");
CREATE UNIQUE INDEX "HomePageConfig_section_key" ON "HomePageConfig"("section");
CREATE UNIQUE INDEX "FeaturedContent_section_contentId_key" ON "FeaturedContent"("section", "contentId");
CREATE UNIQUE INDEX "HomePageItem_section_order_key" ON "HomePageItem"("section", "order");
CREATE UNIQUE INDEX "Prediction_slug_key" ON "Prediction"("slug");
CREATE UNIQUE INDEX "AnalystScore_authorId_key" ON "AnalystScore"("authorId");
CREATE UNIQUE INDEX "StudyCategory_name_key" ON "StudyCategory"("name");
CREATE UNIQUE INDEX "StudyCategory_slug_key" ON "StudyCategory"("slug");
CREATE UNIQUE INDEX "StudyMaterial_slug_key" ON "StudyMaterial"("slug");

CREATE INDEX "Post_type_idx" ON "Post"("type");
CREATE INDEX "Post_published_idx" ON "Post"("published");
CREATE INDEX "Post_slug_idx" ON "Post"("slug");
CREATE INDEX "Media_uploadedAt_idx" ON "Media"("uploadedAt");
CREATE INDEX "Media_mimeType_idx" ON "Media"("mimeType");
CREATE INDEX "Media_uploadedBy_idx" ON "Media"("uploadedBy");
CREATE INDEX "ContentBlock_postId_idx" ON "ContentBlock"("postId");
CREATE INDEX "ContentBlock_pageId_idx" ON "ContentBlock"("pageId");
CREATE INDEX "ContentBlock_parentId_idx" ON "ContentBlock"("parentId");
CREATE INDEX "ContentBlock_type_idx" ON "ContentBlock"("type");
CREATE INDEX "ContentBlock_order_idx" ON "ContentBlock"("order");
CREATE INDEX "BlockTemplate_category_idx" ON "BlockTemplate"("category");
CREATE INDEX "BlockTemplate_type_idx" ON "BlockTemplate"("type");
CREATE INDEX "BlockTemplate_isPublic_idx" ON "BlockTemplate"("isPublic");
CREATE INDEX "BlockTemplate_createdBy_idx" ON "BlockTemplate"("createdBy");
CREATE INDEX "Page_slug_idx" ON "Page"("slug");
CREATE INDEX "Page_status_idx" ON "Page"("status");
CREATE INDEX "Page_authorId_idx" ON "Page"("authorId");
CREATE INDEX "Page_publishedAt_idx" ON "Page"("publishedAt");
CREATE INDEX "PageView_path_idx" ON "PageView"("path");
CREATE INDEX "PageView_userId_idx" ON "PageView"("userId");
CREATE INDEX "PageView_sessionId_idx" ON "PageView"("sessionId");
CREATE INDEX "PageView_createdAt_idx" ON "PageView"("createdAt");
CREATE INDEX "PageView_updatedAt_idx" ON "PageView"("updatedAt");
CREATE INDEX "PageView_sessionId_path_idx" ON "PageView"("sessionId", "path");
CREATE INDEX "LoginEvent_userId_idx" ON "LoginEvent"("userId");
CREATE INDEX "LoginEvent_createdAt_idx" ON "LoginEvent"("createdAt");
CREATE INDEX "LoginEvent_provider_idx" ON "LoginEvent"("provider");
CREATE INDEX "FeaturedContent_section_order_idx" ON "FeaturedContent"("section", "order");
CREATE INDEX "HomePageAuditLog_action_idx" ON "HomePageAuditLog"("action");
CREATE INDEX "HomePageAuditLog_createdAt_idx" ON "HomePageAuditLog"("createdAt");
CREATE INDEX "HomePageAuditLog_section_idx" ON "HomePageAuditLog"("section");
CREATE INDEX "HomePageAuditLog_userId_idx" ON "HomePageAuditLog"("userId");
CREATE INDEX "HomePageConfig_enabled_idx" ON "HomePageConfig"("enabled");
CREATE INDEX "HomePageConfig_order_idx" ON "HomePageConfig"("order");
CREATE INDEX "HomePageConfig_section_idx" ON "HomePageConfig"("section");
CREATE INDEX "HomePageItem_section_enabled_idx" ON "HomePageItem"("section", "enabled");
CREATE INDEX "HomePageItem_section_idx" ON "HomePageItem"("section");
CREATE INDEX "HomePageItem_section_order_idx" ON "HomePageItem"("section", "order");
CREATE INDEX "Prediction_authorId_idx" ON "Prediction"("authorId");
CREATE INDEX "Prediction_status_idx" ON "Prediction"("status");
CREATE INDEX "Prediction_sector_idx" ON "Prediction"("sector");
CREATE INDEX "Prediction_resolveDate_idx" ON "Prediction"("resolveDate");
CREATE INDEX "AnalystScore_authorId_idx" ON "AnalystScore"("authorId");
CREATE INDEX "AnalystScore_calibrationScore_idx" ON "AnalystScore"("calibrationScore");
CREATE INDEX "Comment_authorId_idx" ON "Comment"("authorId");
CREATE INDEX "Comment_postId_idx" ON "Comment"("postId");
CREATE INDEX "Comment_predictionId_idx" ON "Comment"("predictionId");
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");
CREATE INDEX "StudyMaterial_categoryId_idx" ON "StudyMaterial"("categoryId");
CREATE INDEX "StudyMaterial_published_idx" ON "StudyMaterial"("published");
CREATE INDEX "StudyMaterial_slug_idx" ON "StudyMaterial"("slug");
CREATE INDEX "StudyMaterial_type_idx" ON "StudyMaterial"("type");
CREATE INDEX "StudyMaterial_difficulty_idx" ON "StudyMaterial"("difficulty");
CREATE INDEX "StudyMaterial_featured_idx" ON "StudyMaterial"("featured");
CREATE INDEX "StudyMaterial_publishedAt_idx" ON "StudyMaterial"("publishedAt");
CREATE INDEX "StudyCategory_slug_idx" ON "StudyCategory"("slug");
CREATE INDEX "StudyCategory_order_idx" ON "StudyCategory"("order");

-- ── Foreign keys ─────────────────────────────────────────────────────────────
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SavedArticle" ADD CONSTRAINT "SavedArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Media" ADD CONSTRAINT "Media_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ContentBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "BlockTemplate" ADD CONSTRAINT "BlockTemplate_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Page" ADD CONSTRAINT "Page_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AnalystScore" ADD CONSTRAINT "AnalystScore_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_predictionId_fkey" FOREIGN KEY ("predictionId") REFERENCES "Prediction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyMaterial" ADD CONSTRAINT "StudyMaterial_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "StudyCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyMaterial" ADD CONSTRAINT "StudyMaterial_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
