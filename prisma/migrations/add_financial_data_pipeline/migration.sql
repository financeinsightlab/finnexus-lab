-- Pillar C1/C2 — Financial Data Pipeline
-- Adds DataProvider, MetricDefinition, MetricObservation, IngestionRun tables
-- for persistent, auditable financial metric ingestion.
-- All changes are additive and idempotent (IF NOT EXISTS guards).

-- CreateEnum — DataProviderStatus
DO $$ BEGIN
  CREATE TYPE "DataProviderStatus" AS ENUM ('ACTIVE', 'DEGRADED', 'INACTIVE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateEnum — MetricFrequency
DO $$ BEGIN
  CREATE TYPE "MetricFrequency" AS ENUM ('REAL_TIME', 'DELAYED', 'END_OF_DAY', 'DAILY_REFERENCE', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateEnum — IngestionStatus
DO $$ BEGIN
  CREATE TYPE "IngestionStatus" AS ENUM ('PENDING', 'RUNNING', 'DONE', 'FAILED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateTable: DataProvider
CREATE TABLE IF NOT EXISTS "DataProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "baseUrl" TEXT,
    "apiKeyRequired" BOOLEAN NOT NULL DEFAULT false,
    "rateLimitPerMin" INTEGER,
    "status" "DataProviderStatus" NOT NULL DEFAULT 'ACTIVE',
    "description" TEXT,
    "license" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable: MetricDefinition
CREATE TABLE IF NOT EXISTS "MetricDefinition" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "sourceProviderId" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "license" TEXT,
    "frequency" "MetricFrequency" NOT NULL DEFAULT 'DAILY_REFERENCE',
    "delayMinutes" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable: MetricObservation
CREATE TABLE IF NOT EXISTS "MetricObservation" (
    "id" TEXT NOT NULL,
    "metricId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "observedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "retrievedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawPayload" JSONB,
    "isEstimate" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MetricObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable: IngestionRun
CREATE TABLE IF NOT EXISTS "IngestionRun" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "status" "IngestionStatus" NOT NULL DEFAULT 'PENDING',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    "recordsFetched" INTEGER NOT NULL DEFAULT 0,
    "recordsInserted" INTEGER NOT NULL DEFAULT 0,
    "recordsUpdated" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "errorDetails" JSONB,

    CONSTRAINT "IngestionRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "DataProvider_slug_key" ON "DataProvider"("slug");
CREATE INDEX IF NOT EXISTS "DataProvider_status_idx" ON "DataProvider"("status");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "MetricDefinition_key_key" ON "MetricDefinition"("key");
CREATE INDEX IF NOT EXISTS "MetricDefinition_category_idx" ON "MetricDefinition"("category");
CREATE INDEX IF NOT EXISTS "MetricDefinition_sourceProviderId_idx" ON "MetricDefinition"("sourceProviderId");
CREATE INDEX IF NOT EXISTS "MetricDefinition_isActive_idx" ON "MetricDefinition"("isActive");
CREATE INDEX IF NOT EXISTS "MetricDefinition_category_isActive_idx" ON "MetricDefinition"("category", "isActive");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "MetricObservation_metricId_observedAt_idx" ON "MetricObservation"("metricId", "observedAt");
CREATE INDEX IF NOT EXISTS "MetricObservation_observedAt_idx" ON "MetricObservation"("observedAt");
CREATE INDEX IF NOT EXISTS "MetricObservation_metricId_retrievedAt_idx" ON "MetricObservation"("metricId", "retrievedAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "IngestionRun_providerId_status_idx" ON "IngestionRun"("providerId", "status");
CREATE INDEX IF NOT EXISTS "IngestionRun_startedAt_idx" ON "IngestionRun"("startedAt");
CREATE INDEX IF NOT EXISTS "IngestionRun_status_idx" ON "IngestionRun"("status");

-- AddForeignKey
ALTER TABLE "MetricDefinition"
    ADD CONSTRAINT "MetricDefinition_sourceProviderId_fkey"
    FOREIGN KEY ("sourceProviderId") REFERENCES "DataProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricObservation"
    ADD CONSTRAINT "MetricObservation_metricId_fkey"
    FOREIGN KEY ("metricId") REFERENCES "MetricDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngestionRun"
    ADD CONSTRAINT "IngestionRun_providerId_fkey"
    FOREIGN KEY ("providerId") REFERENCES "DataProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;