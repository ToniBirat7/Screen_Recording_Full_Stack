import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "./.env" }); // Load the Envs from the .env file

export default defineConfig({
  schema: "./drizzle/schema.ts", // Schema Path
  out: "./drizzle/migrations", // Output Migration Path
  dialect: "postgresql", // Database Type
  dbCredentials: {
    url: process.env.DATABASE_URL_POSTGRES!, // PostgreSQL connection string
  },
});
