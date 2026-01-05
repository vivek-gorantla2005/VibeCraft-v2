import { integer, pgTable, timestamp, varchar, json, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().notNull(),
});


export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar({ length: 255 }).unique(),
  createdBy: varchar({ length: 255 }).references(() => usersTable.email),
  createdOn: timestamp().defaultNow(),
});


export const frameTable = pgTable("frames", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  frameId: varchar({ length: 255 }).unique(),
  designCode: text(),
  projectId: varchar({ length: 255 }),
  createdBy: varchar({ length: 255 }).references(() => usersTable.email),
  createdOn: timestamp().defaultNow(),
});

export const chatTable = pgTable("chats", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  chatMessage: json(),
  projectId: varchar({ length: 255 }),
  frameId: varchar({ length: 255 }),
  createdBy: varchar({ length: 255 }).references(() => usersTable.email),
  createdOn: timestamp().defaultNow(),
})