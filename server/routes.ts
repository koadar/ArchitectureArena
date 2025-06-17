import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertBattleSchema, insertEditorialSchema, insertSubmissionSchema, insertTutorialProgressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Challenge routes
  app.get("/api/challenges", async (req, res) => {
    try {
      const challenges = await storage.getChallenges();
      res.json(challenges);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      res.status(500).json({ message: "Failed to fetch challenges" });
    }
  });

  app.get("/api/challenges/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const challenge = await storage.getChallenge(id);
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      res.json(challenge);
    } catch (error) {
      console.error("Error fetching challenge:", error);
      res.status(500).json({ message: "Failed to fetch challenge" });
    }
  });

  // Battle routes
  app.post("/api/battles", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const battleData = insertBattleSchema.parse({
        ...req.body,
        userId,
      });
      const battle = await storage.createBattle(battleData);
      res.json(battle);
    } catch (error) {
      console.error("Error creating battle:", error);
      res.status(500).json({ message: "Failed to create battle" });
    }
  });

  app.get("/api/battles/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const battles = await storage.getUserBattles(userId);
      res.json(battles);
    } catch (error) {
      console.error("Error fetching user battles:", error);
      res.status(500).json({ message: "Failed to fetch battles" });
    }
  });

  app.patch("/api/battles/:id", isAuthenticated, async (req: any, res) => {
    try {
      const battleId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      const updateData = req.body;
      
      const battle = await storage.updateBattle(battleId, userId, updateData);
      if (!battle) {
        return res.status(404).json({ message: "Battle not found or unauthorized" });
      }
      
      res.json(battle);
    } catch (error) {
      console.error("Error updating battle:", error);
      res.status(500).json({ message: "Failed to update battle" });
    }
  });

  // Leaderboard routes
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const period = (req.query.period as string) || "WEEKLY";
      const leaderboard = await storage.getLeaderboard(period);
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  // User stats
  app.get("/api/user/stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  // Editorial routes
  app.get("/api/editorials", async (req, res) => {
    try {
      const editorials = await storage.getAllEditorials();
      res.json(editorials);
    } catch (error) {
      console.error("Error fetching editorials:", error);
      res.status(500).json({ message: "Failed to fetch editorials" });
    }
  });

  app.get("/api/editorials/:challengeId", async (req, res) => {
    try {
      const challengeId = parseInt(req.params.challengeId);
      const editorial = await storage.getEditorial(challengeId);
      if (!editorial) {
        return res.status(404).json({ message: "Editorial not found" });
      }
      res.json(editorial);
    } catch (error) {
      console.error("Error fetching editorial:", error);
      res.status(500).json({ message: "Failed to fetch editorial" });
    }
  });

  app.post("/api/editorials", isAuthenticated, async (req: any, res) => {
    try {
      const validatedData = insertEditorialSchema.parse(req.body);
      const editorial = await storage.createEditorial(validatedData);
      res.status(201).json(editorial);
    } catch (error) {
      console.error("Error creating editorial:", error);
      res.status(500).json({ message: "Failed to create editorial" });
    }
  });

  // Submission routes
  app.get("/api/submissions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const submissions = await storage.getUserSubmissions(userId);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.get("/api/submissions/challenge/:challengeId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const challengeId = parseInt(req.params.challengeId);
      const submissions = await storage.getChallengeSubmissions(challengeId, userId);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching challenge submissions:", error);
      res.status(500).json({ message: "Failed to fetch challenge submissions" });
    }
  });

  app.post("/api/submissions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertSubmissionSchema.parse({
        ...req.body,
        userId
      });
      const submission = await storage.createSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating submission:", error);
      res.status(500).json({ message: "Failed to create submission" });
    }
  });

  // Tutorial progress routes
  app.get("/api/tutorial/progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getTutorialProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching tutorial progress:", error);
      res.status(500).json({ message: "Failed to fetch tutorial progress" });
    }
  });

  app.post("/api/tutorial/progress", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { stepId, completed } = req.body;
      const progress = await storage.updateTutorialProgress(userId, stepId, completed);
      res.json(progress);
    } catch (error) {
      console.error("Error updating tutorial progress:", error);
      res.status(500).json({ message: "Failed to update tutorial progress" });
    }
  });

  // Auto-complete architecture endpoint
  app.post("/api/challenges/:challengeId/auto-complete", isAuthenticated, async (req: any, res) => {
    try {
      const challengeId = parseInt(req.params.challengeId);
      const challenge = await storage.getChallenge(challengeId);
      
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      // Generate optimal architecture based on challenge constraints
      const optimalArchitecture = generateOptimalArchitecture(challenge);
      
      res.json({
        architecture: optimalArchitecture,
        explanation: getArchitectureExplanation(challenge, optimalArchitecture)
      });
    } catch (error) {
      console.error("Error auto-completing architecture:", error);
      res.status(500).json({ message: "Failed to auto-complete architecture" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions for auto-completion
function generateOptimalArchitecture(challenge: any) {
  const { difficulty, constraints } = challenge;
  
  // Base architecture components
  const baseComponents = [
    { id: '1', type: 'load-balancer', position: { x: 100, y: 50 }, data: { label: 'Load Balancer' } },
    { id: '2', type: 'api-gateway', position: { x: 300, y: 50 }, data: { label: 'API Gateway' } },
    { id: '3', type: 'microservice', position: { x: 500, y: 50 }, data: { label: 'User Service' } },
    { id: '4', type: 'database', position: { x: 500, y: 200 }, data: { label: 'Database' } },
  ];

  const baseConnections = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
  ];

  // Add complexity based on difficulty
  if (difficulty === 'MEDIUM' || difficulty === 'HARD') {
    baseComponents.push(
      { id: '5', type: 'cache', position: { x: 700, y: 50 }, data: { label: 'Redis Cache' } },
      { id: '6', type: 'queue', position: { x: 300, y: 200 }, data: { label: 'Message Queue' } }
    );
    baseConnections.push(
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e2-6', source: '2', target: '6' }
    );
  }

  if (difficulty === 'HARD' || difficulty === 'BOSS') {
    baseComponents.push(
      { id: '7', type: 'monitoring', position: { x: 100, y: 200 }, data: { label: 'Monitoring' } },
      { id: '8', type: 'cdn', position: { x: 100, y: 350 }, data: { label: 'CDN' } }
    );
    baseConnections.push(
      { id: 'e1-7', source: '1', target: '7' },
      { id: 'e8-1', source: '8', target: '1' }
    );
  }

  return {
    nodes: baseComponents,
    edges: baseConnections
  };
}

function getArchitectureExplanation(challenge: any, architecture: any) {
  const explanations = [
    "This architecture follows best practices for scalable web applications.",
    "The load balancer distributes traffic across multiple instances for high availability.",
    "The API gateway provides a single entry point and handles cross-cutting concerns like authentication.",
    "Microservices architecture allows for independent scaling and deployment.",
    "Database is optimized for the expected load and data consistency requirements."
  ];

  if (challenge.difficulty === 'MEDIUM' || challenge.difficulty === 'HARD') {
    explanations.push(
      "Redis cache improves response times by storing frequently accessed data.",
      "Message queue enables asynchronous processing and better system resilience."
    );
  }

  if (challenge.difficulty === 'HARD' || challenge.difficulty === 'BOSS') {
    explanations.push(
      "Monitoring system provides observability and alerting capabilities.",
      "CDN reduces latency by serving static content from edge locations."
    );
  }

  return {
    overview: "This solution demonstrates a comprehensive understanding of distributed system design patterns.",
    keyPoints: explanations,
    tradeoffs: [
      "Increased complexity in exchange for better scalability",
      "Higher infrastructure costs but improved fault tolerance",
      "More operational overhead but better maintainability"
    ]
  };
}
