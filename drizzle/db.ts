import { getXataClient } from "@/xata";
import { drizzle } from "drizzle-orm/singlestore";

const xata = getXataClient; // Xata Client

export const db = drizzle(xata);
