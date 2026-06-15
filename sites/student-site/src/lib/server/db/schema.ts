import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { sql, relations } from "drizzle-orm";
import { user } from "./auth.schema.ts";
export * from "./auth.schema.ts";

export const modules = sqliteTable("modules", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  cardColor: text("card_color").notNull().default("primary"),
  order: integer("order").notNull().default(0),
});

export const sections = sqliteTable("sections", {
  id: text("id").primaryKey(),
  moduleId: text("module_id")
    .notNull()
    .references(() => modules.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  order: integer("order").notNull().default(0),
});

export const userProgress = sqliteTable(
  "user_progress",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    sectionId: text("section_id")
      .notNull()
      .references(() => sections.id, { onDelete: "cascade" }),
    completed: integer("completed", { mode: "boolean" }).notNull().default(false),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.sectionId] })],
);

export const modulesRelations = relations(modules, ({ many }) => ({
  sections: many(sections),
}));

export const sectionsRelations = relations(sections, ({ one, many }) => ({
  module: one(modules, {
    fields: [sections.moduleId],
    references: [modules.id],
  }),
  userProgress: many(userProgress),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(user, {
    fields: [userProgress.userId],
    references: [user.id],
  }),
  section: one(sections, {
    fields: [userProgress.sectionId],
    references: [sections.id],
  }),
}));

export type Module = typeof modules.$inferSelect;
export type Section = typeof sections.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewModule = typeof modules.$inferInsert;
export type NewSection = typeof sections.$inferInsert;
export type NewUserProgress = typeof userProgress.$inferInsert;
