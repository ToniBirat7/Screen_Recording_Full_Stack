import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_POSTGRES,
});

export const db = drizzle(pool); // Export the DB connection
