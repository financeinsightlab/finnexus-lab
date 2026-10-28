import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

declare global {
  var prisma: PrismaClient | undefined
  var pgPool: Pool | undefined
}

// Preview-safe Prisma: if client wasn't generated (e.g. no network for prisma generate),
// we degrade to a proxy that throws only when actually queried — letting pages
// that catch DB errors (like homepage) render from static MDX data.
let prisma: any

function createMockPrisma(): any {
  const handler = (path: string[] = []): any =>
    new Proxy(() => {}, {
      get(_t, prop: string) {
        if (prop === "then" || prop === "catch" || prop === "finally") return undefined
        return handler([...path, prop])
      },
      apply(_t, _this, _args) {
        // Any DB call rejects — caller should catch and fallback to static data
        return Promise.reject(new Error(`Prisma mock: ${path.join(".")} called without DB (preview mode)`))
      },
    })
  return handler()
}

try {
  const globalForPrisma = globalThis as unknown as { pgPool?: Pool; prisma?: PrismaClient }
  const pool =
    globalForPrisma.pgPool ??
    new Pool({
      connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/ci?sslmode=disable",
      max: 2,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
  if (process.env.NODE_ENV !== "production") globalForPrisma.pgPool = pool
  const adapter = new PrismaPg(pool)
  prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter } as any)
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
} catch (e) {
  console.warn("[prisma] preview fallback — using mock (no DB):", (e as Error)?.message)
  prisma = createMockPrisma()
}

export { prisma }
