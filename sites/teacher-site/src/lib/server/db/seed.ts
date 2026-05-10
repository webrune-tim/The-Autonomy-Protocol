import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.ts";
import * as authSchema from "./auth.schema.ts";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const client = createClient({ url: process.env.DATABASE_URL });
const db = drizzle(client, { schema: { ...schema, ...authSchema } });

async function seed() {
  console.log("🌱 Seeding database...");

  // Add a sample task if none exist
  const existingTasks = await db.select().from(schema.task).limit(1);
  if (existingTasks.length === 0) {
    await db.insert(schema.task).values([
      { title: "Complete Project Setup", priority: 1 },
      { title: "Review The Autonomy Protocol", priority: 2 },
      { title: "Configure Codespaces", priority: 3 },
    ]);
    console.log("✅ Tasks seeded.");
  } else {
    console.log("⏭️ Tasks already exist, skipping.");
  }

  console.log("🏁 Seeding complete.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
