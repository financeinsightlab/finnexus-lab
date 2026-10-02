-- Additive manual UPI payment workflow.
-- No existing records are rewritten or deleted. Do not run this against
-- production without the owner's approved deployment/migration window.

ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "subscriptionExpiresAt" TIMESTAMP(3);

DO $$ BEGIN
  CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "PaymentMethod" AS ENUM ('MANUAL_UPI');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "PaymentAuditAction" AS ENUM ('SUBMITTED', 'APPROVED', 'REJECTED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "PaymentSubmission" (
  "id" TEXT NOT NULL,
  "userId" TEXT,
  "plan" TEXT NOT NULL,
  "amountMinor" INTEGER NOT NULL CHECK ("amountMinor" > 0),
  "currency" TEXT NOT NULL DEFAULT 'INR',
  "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'MANUAL_UPI',
  "transactionReference" TEXT NOT NULL,
  "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
  "activeKey" TEXT,
  "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "verifiedAt" TIMESTAMP(3),
  "verifiedById" TEXT,
  "rejectionReason" TEXT,
  "expiresAt" TIMESTAMP(3),
  CONSTRAINT "PaymentSubmission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "PaymentAuditEvent" (
  "id" TEXT NOT NULL,
  "paymentId" TEXT NOT NULL,
  "actorId" TEXT,
  "action" "PaymentAuditAction" NOT NULL,
  "fromStatus" "PaymentStatus",
  "toStatus" "PaymentStatus" NOT NULL,
  "reason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PaymentAuditEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RateLimitBucket" (
  "key" TEXT NOT NULL,
  "count" INTEGER NOT NULL DEFAULT 0,
  "windowStartedAt" TIMESTAMP(3) NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("key")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PaymentSubmission_transactionReference_key"
  ON "PaymentSubmission"("transactionReference");
CREATE UNIQUE INDEX IF NOT EXISTS "PaymentSubmission_activeKey_key"
  ON "PaymentSubmission"("activeKey");
CREATE INDEX IF NOT EXISTS "PaymentSubmission_userId_submittedAt_idx"
  ON "PaymentSubmission"("userId", "submittedAt");
CREATE INDEX IF NOT EXISTS "PaymentSubmission_userId_status_idx"
  ON "PaymentSubmission"("userId", "status");
CREATE INDEX IF NOT EXISTS "PaymentSubmission_status_submittedAt_idx"
  ON "PaymentSubmission"("status", "submittedAt");
CREATE INDEX IF NOT EXISTS "PaymentSubmission_verifiedById_idx"
  ON "PaymentSubmission"("verifiedById");
CREATE INDEX IF NOT EXISTS "PaymentAuditEvent_paymentId_createdAt_idx"
  ON "PaymentAuditEvent"("paymentId", "createdAt");
CREATE INDEX IF NOT EXISTS "PaymentAuditEvent_actorId_createdAt_idx"
  ON "PaymentAuditEvent"("actorId", "createdAt");

DO $$ BEGIN
  ALTER TABLE "PaymentSubmission"
    ADD CONSTRAINT "PaymentSubmission_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "PaymentSubmission"
    ADD CONSTRAINT "PaymentSubmission_verifiedById_fkey"
    FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "PaymentAuditEvent"
    ADD CONSTRAINT "PaymentAuditEvent_paymentId_fkey"
    FOREIGN KEY ("paymentId") REFERENCES "PaymentSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "PaymentAuditEvent"
    ADD CONSTRAINT "PaymentAuditEvent_actorId_fkey"
    FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
