import { sqliteTable, text, integer, primaryKey, index } from "drizzle-orm/sqlite-core";
import { sql, relations } from "drizzle-orm";
import { user, session, account } from "./auth.schema.ts";

export * from "./auth.schema.ts";

// =========================================================================
// CONTENT & CURRICULUM (Student Site)
// =========================================================================

export const modules = sqliteTable("modules", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull().default("step"),
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
    moduleId: text("module_id").references(() => modules.id, { onDelete: "cascade" }),
    started: integer("started", { mode: "boolean" }).notNull().default(false),
    completed: integer("completed", { mode: "boolean" }).notNull().default(false),
    response: text("response"),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.sectionId] })],
);

// =========================================================================
// DOCUMENT & TASK ARCHITECTURE (Teacher Site)
// =========================================================================

export const task = sqliteTable("task", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  priority: integer("priority").notNull().default(1),
});

export const document = sqliteTable(
  "document",
  {
    id: text("id")
      .primaryKey()
      .default(sql`(lower(hex(randomblob(16))))`),
    title: text("title").notNull(),
    content: text("content").notNull(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("document_ownerId_idx").on(table.ownerId)],
);

export const documentShare = sqliteTable(
  "document_share",
  {
    id: text("id")
      .primaryKey()
      .default(sql`(lower(hex(randomblob(16))))`),
    documentId: text("document_id")
      .notNull()
      .references(() => document.id, { onDelete: "cascade" }),
    sharedWithUserId: text("shared_with_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
  },
  (table) => [
    index("share_documentId_idx").on(table.documentId),
    index("share_sharedWithUserId_idx").on(table.sharedWithUserId),
  ],
);

export const conversionTask = sqliteTable(
  "conversion_task",
  {
    id: text("id")
      .primaryKey()
      .default(sql`(lower(hex(randomblob(16))))`),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    originalFileName: text("original_file_name").notNull(),
    status: text("status", {
      enum: ["pending", "processing", "completed", "failed"],
    })
      .default("pending")
      .notNull(),
    errorMessage: text("error_message"),
    associatedDocumentId: text("associated_document_id").references(() => document.id, {
      onDelete: "set null",
    }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("conversion_userId_idx").on(table.userId)],
);

// =========================================================================
// RELATIONS
// =========================================================================

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
  module: one(modules, {
    fields: [userProgress.moduleId],
    references: [modules.id],
  }),
}));

export const documentRelations = relations(document, ({ one, many }) => ({
  owner: one(user, {
    fields: [document.ownerId],
    references: [user.id],
  }),
  shares: many(documentShare),
  conversions: many(conversionTask),
}));

export const documentShareRelations = relations(documentShare, ({ one }) => ({
  document: one(document, {
    fields: [documentShare.documentId],
    references: [document.id],
  }),
  sharedWith: one(user, {
    fields: [documentShare.sharedWithUserId],
    references: [user.id],
  }),
}));

export const conversionTaskRelations = relations(conversionTask, ({ one }) => ({
  user: one(user, {
    fields: [conversionTask.userId],
    references: [user.id],
  }),
  document: one(document, {
    fields: [conversionTask.associatedDocumentId],
    references: [document.id],
  }),
}));

// Update user relations to include everything
export const extendedUserRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  documents: many(document),
  shares: many(documentShare),
  conversions: many(conversionTask),
  progress: many(userProgress),
}));

export type Module = typeof modules.$inferSelect;
export type Section = typeof sections.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewModule = typeof modules.$inferInsert;
export type NewSection = typeof sections.$inferInsert;
export type NewUserProgress = typeof userProgress.$inferInsert;
