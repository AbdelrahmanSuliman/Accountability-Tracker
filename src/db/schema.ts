import * as t from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm";

const timestamps = {
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
  deletedAt: t.timestamp("deleted_at"),
};

export const users = t.pgTable("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  email: t.varchar({ length: 255 }).notNull().unique(),
  username: t.varchar({ length: 255}).notNull(),
  passwordHash: t.varchar("password_hash", { length: 255 }).notNull(),
  isOnboarded: t.boolean("is_onboarded").default(false),
  ...timestamps,
});

export const addictions = t.pgTable("addictions", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 255 }).notNull(),
  userId: t.integer("user_id").references(() => users.id),
  partnerId: t.integer("partner_id").references(() => users.id),
  ...timestamps,
});

export const journalEntries = t.pgTable("journal_entries", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  content: t.text(),
  succeeded: t.boolean(),
  date: t.date(),
  addictionId: t.integer("addiction_id").references(() => addictions.id),
  ...timestamps,
});

export const relations = defineRelations({ users, addictions, journalEntries }, (r) => ({
  addictions: {
    user: r.one.users({
      from: r.addictions.userId,
      to: r.users.id,
      alias: "user_addictions"
    }),
    partner: r.one.users({
      from: r.addictions.partnerId,
      to: r.users.id,
      alias: "partner_addictions"
    }),
    journalEntries: r.many.journalEntries()
  },
  journalEntries: {
    addiction: r.one.addictions({
      from: r.journalEntries.addictionId,
      to: r.addictions.id
    })
  },
  users: {
    myAddictions: r.many.addictions({
      alias: "user_addictions"
    }),
    partneredAddictions: r.many.addictions({
      alias: "partner_addictions"
    })
  }
}));
