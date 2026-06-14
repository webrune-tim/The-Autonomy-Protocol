import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
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

export const modulesRelations = relations(modules, ({ many }) => ({
  sections: many(sections),
}));

export const sectionsRelations = relations(sections, ({ one }) => ({
  module: one(modules, {
    fields: [sections.moduleId],
    references: [modules.id],
  }),
}));

export type Module = typeof modules.$inferSelect;
export type Section = typeof sections.$inferSelect;
export type NewModule = typeof modules.$inferInsert;
export type NewSection = typeof sections.$inferInsert;
