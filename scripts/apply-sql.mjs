// Applies one or more SQL files to the database in DATABASE_URL, in order.
// Local-development helper only (the sandbox has no psql binary). Each file is
// executed inside its own transaction so a failure leaves nothing half-applied.
//
//   DATABASE_URL=postgresql://... node scripts/apply-sql.mjs prisma/sql/base-schema.sql prisma/migrations/x/migration.sql
import { readFileSync } from 'node:fs';
import pg from 'pg';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage: node scripts/apply-sql.mjs <file.sql> [...more.sql]');
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  for (const file of files) {
    const sql = readFileSync(file, 'utf8');
    await client.query('BEGIN');
    try {
      await client.query(sql);
      await client.query('COMMIT');
      console.log(`[apply-sql] applied ${file}`);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(`[apply-sql] FAILED ${file}: ${error instanceof Error ? error.message : String(error)}`);
      process.exitCode = 1;
      break;
    }
  }
} finally {
  await client.end();
}
