import { drizzle } from "drizzle-orm/neon-http";
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL environment variable is missing! Check your .env.local file.");
}

export const db = drizzle(databaseUrl, {schema, logger: true})

