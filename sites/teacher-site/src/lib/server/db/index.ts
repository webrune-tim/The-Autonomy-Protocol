import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from "$app/env/private";

const url = DATABASE_URL || "file::memory:";
const client = createClient({
  url,
  authToken: DATABASE_AUTH_TOKEN || undefined,
});

export const db = drizzle(client, { schema });
