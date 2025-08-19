import { drizzle } from "drizzle-orm/xata-http";
import { getXataClient } from "../xata";

export const db = drizzle(getXataClient()); // Export the DB connection
