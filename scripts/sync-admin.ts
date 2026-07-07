import { loadEnvFiles } from "../lib/load-env";

loadEnvFiles();

async function main() {
  const { syncAdminFromEnv } = await import("../lib/sync-admin");
  const { username } = await syncAdminFromEnv();
  console.log(`Admin user "${username}" synced from .env.local`);
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  })
  .finally(async () => {
    const { prisma } = await import("../lib/prisma");
    await prisma.$disconnect();
  });
