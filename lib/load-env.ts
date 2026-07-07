import { config } from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

/** Load .env.local first (Next.js convention), then .env — for scripts run outside Next.js */
export function loadEnvFiles() {
  const root = process.cwd();
  const localPath = resolve(root, ".env.local");
  const envPath = resolve(root, ".env");

  if (existsSync(localPath)) {
    config({ path: localPath });
  }
  if (existsSync(envPath)) {
    config({ path: envPath, override: false });
  }
}
