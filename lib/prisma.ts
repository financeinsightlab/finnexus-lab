import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

declare global {
  var prisma: PrismaClient | undefined
}

// Local/dev setup uses the WASM query compiler + pg driver adapter, so no
// native Prisma engine binaries are required at runtime.
const globalForPrisma = globalThis as unknown as { pgPool?: Pool }

const pool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,                    // Neon free-tier max connections
    idleTimeoutMillis: 30000,  // Close idle connections after 30s
    connectionTimeoutMillis: 5000, // Fail fast if DB unreachable
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.pgPool = pool

const adapter = new PrismaPg(pool)

const prisma = globalThis.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma

export { prisma }

