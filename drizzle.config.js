import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const dbCredentials = process.env.DATABASE_URL
  ? { url: process.env.DATABASE_URL }
  : undefined;

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dbCredentials,
});
