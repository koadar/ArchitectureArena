import { 
  users, 
  challenges, 
  battles, 
  leaderboard,
  type User, 
  type UpsertUser,
  type Challenge,
  type InsertChallenge,
  type Battle,
  type InsertBattle,
  type LeaderboardEntry
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Challenge operations
  getChallenges(): Promise<Challenge[]>;
  getChallenge(id: number): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  
  // Battle operations
  createBattle(battle: InsertBattle): Promise<Battle>;
  getUserBattles(userId: string): Promise<Battle[]>;
  updateBattle(battleId: number, userId: string, updateData: Partial<Battle>): Promise<Battle | undefined>;
  
  // Leaderboard operations
  getLeaderboard(period: string): Promise<LeaderboardEntry[]>;
  
  // User stats
  getUserStats(userId: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getChallenges(): Promise<Challenge[]> {
    return await db.select().from(challenges).orderBy(desc(challenges.createdAt));
  }

  async getChallenge(id: number): Promise<Challenge | undefined> {
    const [challenge] = await db.select().from(challenges).where(eq(challenges.id, id));
    return challenge;
  }

  async createChallenge(challengeData: InsertChallenge): Promise<Challenge> {
    const [challenge] = await db
      .insert(challenges)
      .values(challengeData)
      .returning();
    return challenge;
  }

  async createBattle(battleData: InsertBattle): Promise<Battle> {
    const [battle] = await db
      .insert(battles)
      .values(battleData)
      .returning();
    return battle;
  }

  async getUserBattles(userId: string): Promise<Battle[]> {
    return await db
      .select()
      .from(battles)
      .where(eq(battles.userId, userId))
      .orderBy(desc(battles.createdAt));
  }

  async updateBattle(battleId: number, userId: string, updateData: Partial<Battle>): Promise<Battle | undefined> {
    const [battle] = await db
      .update(battles)
      .set(updateData)
      .where(and(eq(battles.id, battleId), eq(battles.userId, userId)))
      .returning();
    return battle;
  }

  async getLeaderboard(period: string): Promise<LeaderboardEntry[]> {
    return await db
      .select()
      .from(leaderboard)
      .where(eq(leaderboard.period, period))
      .orderBy(leaderboard.rank);
  }

  async getUserStats(userId: string): Promise<any> {
    const userBattles = await db
      .select()
      .from(battles)
      .where(eq(battles.userId, userId));

    const totalBattles = userBattles.length;
    const battlesWon = userBattles.filter(b => b.status === "COMPLETED").length;
    const winRate = totalBattles > 0 ? (battlesWon / totalBattles) * 100 : 0;
    
    const completedBattles = userBattles.filter(b => b.timeSpent);
    const avgCompletionTime = completedBattles.length > 0 
      ? completedBattles.reduce((sum, b) => sum + (b.timeSpent || 0), 0) / completedBattles.length
      : 0;

    // Calculate current streak
    const sortedBattles = userBattles
      .filter(b => b.status === "COMPLETED")
      .sort((a, b) => new Date(b.completedAt || 0).getTime() - new Date(a.completedAt || 0).getTime());
    
    let currentStreak = 0;
    for (const battle of sortedBattles) {
      if (battle.status === "COMPLETED") {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      totalBattles,
      battlesWon,
      winRate,
      avgCompletionTime,
      currentStreak,
      xpToNextTier: 1000 - ((battlesWon * 100) % 1000)
    };
  }
}

export const storage = new DatabaseStorage();