import { Config } from "./config";

export function validateConfig(config: Config): void {
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      console.error(`❌ Missing environment variable: ${key}`);
      process.exit(1);
    }
  }
  console.log("✅ Environment variables loaded successfully");
}
