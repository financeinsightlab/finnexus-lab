-- Pillar A1/A3 — Stripe billing: track the active subscription id on User.
--
-- Idempotent and additive so it can be applied to a live database without a
-- destructive reset. `IF NOT EXISTS` guards re-runs.

ALTER TABLE "User"
    ADD COLUMN IF NOT EXISTS "stripeSubscriptionId" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "User_stripeSubscriptionId_key"
    ON "User"("stripeSubscriptionId");
