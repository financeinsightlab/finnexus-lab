// Starts an embedded PostgreSQL server for local development,
// pre-initialised with an empty 'kunwar' database.
// Prisma connects to it via DATABASE_URL.
import EmbeddedPostgres from 'embedded-postgres';

const PORT = 5433;
const USER = 'postgres';
const PASSWORD = 'postgres';
const DB = 'kunwar';

async function main() {
  const pg = new EmbeddedPostgres({
    databaseDir: '/tmp/kunwar-pgdata',
    user: USER,
    password: PASSWORD,
    port: PORT,
    persistent: true,
  });

  await pg.initialise();
  await pg.start();
  console.log(`[embedded-pg] server started on 127.0.0.1:${PORT}`);

  const client = pg.getPgClient();
  await client.connect();
  const res = await client.query("SELECT datname FROM pg_database WHERE datname = $1", [DB]);
  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE ${DB}`);
    console.log(`[embedded-pg] created database '${DB}'`);
  } else {
    console.log(`[embedded-pg] database '${DB}' already exists`);
  }
  await client.end();

  console.log(`[embedded-pg] ready. DATABASE_URL=postgresql://${USER}:${PASSWORD}@127.0.0.1:${PORT}/${DB}`);

  // Keep the process alive; handle SIGTERM/SIGINT to stop postgres cleanly.
  const shutdown = async () => {
    console.log('[embedded-pg] stopping...');
    try { await pg.stop(); } catch (e) { console.error(e); }
    process.exit(0);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  setInterval(() => {}, 1 << 30);
}

main().catch((e) => {
  console.error('[embedded-pg] failed:', e);
  process.exit(1);
});
