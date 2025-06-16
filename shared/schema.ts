import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  rank: integer("rank").default(0),
  xp: integer("xp").default(0),
  battlesWon: integer("battles_won").default(0),
  currentStreak: integer("current_streak").default(0),
  tier: varchar("tier").default("Rookie"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  difficulty: varchar("difficulty").notNull(), // EASY, MEDIUM, HARD, BOSS
  timeLimit: integer("time_limit").notNull(), // in minutes
  xpReward: integer("xp_reward").notNull(),
  constraints: jsonb("constraints"), // JSON object with challenge constraints
  createdAt: timestamp("created_at").defaultNow(),
});

export const battles = pgTable("battles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id).notNull(),
  status: varchar("status").notNull(), // ACTIVE, COMPLETED, FAILED
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  timeSpent: integer("time_spent"), // in seconds
  score: integer("score"),
  architecture: jsonb("architecture"), // JSON representation of the design
  createdAt: timestamp("created_at").defaultNow(),
});

export const leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  period: varchar("period").notNull(), // WEEKLY, MONTHLY, ALL_TIME
  rank: integer("rank").notNull(),
  totalXp: integer("total_xp").notNull(),
  battlesWon: integer("battles_won").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = typeof challenges.$inferInsert;
export type Battle = typeof battles.$inferSelect;
export type InsertBattle = typeof battles.$inferInsert;
export type LeaderboardEntry = typeof leaderboard.$inferSelect;

export const insertChallengeSchema = createInsertSchema(challenges);
export const insertBattleSchema = createInsertSchema(battles);
