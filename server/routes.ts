import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertBattleSchema, insertEditorialSchema, insertSubmissionSchema, insertTutorialProgressSchema } from "@shared/schema";
import { componentMeta } from "@shared/componentMeta";
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
  const { difficulty, title } = challenge;

  // Special case for the Ride Sharing Service challenge
  if (title === 'Ride Sharing Service') {
    return {
      nodes: [
        { id: '1', type: 'component', position: { x: 500, y: 20 }, data: { label: 'Mobile / Web Client', icon: '📱', color: 'border-teal-400' } },
        { id: '2', type: 'component', position: { x: 500, y: 80 }, data: { label: 'CDN', icon: '🌐', color: 'border-sky-400' } },
        { id: '3', type: 'component', position: { x: 500, y: 140 }, data: { label: 'API Gateway', icon: '🚪', color: 'border-cyan-400' } },
        { id: '4', type: 'component', position: { x: 200, y: 260 }, data: { label: 'Auth Service', icon: '🔐', color: 'border-blue-400' } },
        { id: '5', type: 'component', position: { x: 400, y: 260 }, data: { label: 'User Service', icon: '👤', color: 'border-green-400' } },
        { id: '6', type: 'component', position: { x: 600, y: 260 }, data: { label: 'Driver Service', icon: '🚗', color: 'border-purple-400' } },
        { id: '7', type: 'component', position: { x: 800, y: 260 }, data: { label: 'Trip Service', icon: '🏁', color: 'border-orange-500' } },
        { id: '8', type: 'component', position: { x: 1000, y: 260 }, data: { label: 'Admin Service', icon: '🛠️', color: 'border-gray-500' } },
        { id: '9', type: 'component', position: { x: 300, y: 380 }, data: { label: 'Ride Matching', icon: '🔄', color: 'border-yellow-500' } },
        { id: '10', type: 'component', position: { x: 500, y: 380 }, data: { label: 'Pricing Engine', icon: '💹', color: 'border-red-500' } },
        { id: '11', type: 'component', position: { x: 700, y: 380 }, data: { label: 'Surge Engine', icon: '⚡', color: 'border-red-400' } },
        { id: '12', type: 'component', position: { x: 900, y: 380 }, data: { label: 'Geo Service', icon: '🌍', color: 'border-indigo-500' } },
        { id: '13', type: 'component', position: { x: 1100, y: 380 }, data: { label: 'Location Tracking', icon: '📍', color: 'border-indigo-400' } },
        { id: '14', type: 'component', position: { x: 1300, y: 380 }, data: { label: 'ETA Service', icon: '⏱️', color: 'border-indigo-300' } },
        { id: '15', type: 'component', position: { x: 300, y: 500 }, data: { label: 'Payment Service', icon: '💳', color: 'border-emerald-500' } },
        { id: '16', type: 'component', position: { x: 500, y: 500 }, data: { label: 'Wallet Service', icon: '👛', color: 'border-emerald-400' } },
        { id: '17', type: 'component', position: { x: 700, y: 500 }, data: { label: 'Fraud Detection', icon: '🔎', color: 'border-rose-500' } },
        { id: '18', type: 'component', position: { x: 900, y: 500 }, data: { label: 'Notification Svc', icon: '📩', color: 'border-amber-500' } },
        { id: '19', type: 'component', position: { x: 400, y: 620 }, data: { label: 'Kafka Event Bus', icon: '🔃', color: 'border-fuchsia-400' } },
        { id: '20', type: 'component', position: { x: 600, y: 620 }, data: { label: 'Service Mesh', icon: '🕸️', color: 'border-blue-300' } },
        { id: '21', type: 'component', position: { x: 800, y: 620 }, data: { label: 'Monitoring', icon: '📈', color: 'border-lime-400' } },
        { id: '22', type: 'component', position: { x: 1000, y: 620 }, data: { label: 'Central Logging', icon: '📜', color: 'border-lime-500' } },
        { id: '23', type: 'component', position: { x: 1200, y: 620 }, data: { label: 'Metrics & Alerting', icon: '📊', color: 'border-lime-300' } },
        { id: '24', type: 'component', position: { x: 200, y: 740 }, data: { label: 'User DB', icon: '🗃️', color: 'border-pink-500' } },
        { id: '25', type: 'component', position: { x: 400, y: 740 }, data: { label: 'Driver DB', icon: '🗃️', color: 'border-pink-500' } },
        { id: '26', type: 'component', position: { x: 600, y: 740 }, data: { label: 'Trip DB', icon: '🗃️', color: 'border-pink-500' } },
        { id: '27', type: 'component', position: { x: 800, y: 740 }, data: { label: 'Location TSDB', icon: '⏰', color: 'border-pink-500' } },
        { id: '28', type: 'component', position: { x: 1000, y: 740 }, data: { label: 'Redis Cache', icon: '⚡', color: 'border-yellow-400' } },
        { id: '29', type: 'component', position: { x: 1200, y: 740 }, data: { label: 'Search Index', icon: '🔍', color: 'border-purple-300' } },
        { id: '30', type: 'component', position: { x: 1400, y: 740 }, data: { label: 'Data Lake', icon: '💾', color: 'border-gray-400' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', style: { stroke: '#00D1FF', strokeWidth: 2 }, animated: true },
        { id: 'e2-3', source: '2', target: '3', style: { stroke: '#00D1FF', strokeWidth: 2 }, animated: true },
        { id: 'e3-4', source: '3', target: '4', style: { stroke: '#00D1FF', strokeWidth: 2 }, animated: true },
        { id: 'e3-5', source: '3', target: '5', style: { stroke: '#00D1FF', strokeWidth: 2 }, animated: true },
        { id: 'e3-6', source: '3', target: '6', style: { stroke: '#00D1FF', strokeWidth: 2 }, animated: true },
        { id: 'e3-7', source: '3', target: '7', style: { stroke: '#00D1FF', strokeWidth: 2 }, animated: true },
        { id: 'e3-8', source: '3', target: '8', style: { stroke: '#00D1FF', strokeWidth: 2 }, animated: true },
        { id: 'e3-15', source: '3', target: '15', style: { stroke: '#00D1FF', strokeWidth: 2 }, animated: true },
        { id: 'e7-9', source: '7', target: '9', style: { stroke: '#FF6B00', strokeWidth: 2 }, animated: true },
        { id: 'e9-6', source: '9', target: '6', style: { stroke: '#FF6B00', strokeWidth: 2 }, animated: true },
        { id: 'e9-10', source: '9', target: '10', style: { stroke: '#FF6B00', strokeWidth: 2 }, animated: true },
        { id: 'e10-11', source: '10', target: '11', style: { stroke: '#FF6B00', strokeWidth: 2 }, animated: true },
        { id: 'e11-9', source: '11', target: '9', style: { stroke: '#FF6B00', strokeWidth: 2 }, animated: true },
        { id: 'e12-29', source: '12', target: '29', style: { stroke: '#6C63FF', strokeWidth: 2 }, animated: true },
        { id: 'e13-9', source: '13', target: '9', style: { stroke: '#6C63FF', strokeWidth: 2 }, animated: true },
        { id: 'e13-27', source: '13', target: '27', style: { stroke: '#6C63FF', strokeWidth: 2 }, animated: true },
        { id: 'e14-13', source: '14', target: '13', style: { stroke: '#6C63FF', strokeWidth: 2 }, animated: true },
        { id: 'e15-17', source: '15', target: '17', style: { stroke: '#00FFAA', strokeWidth: 2 }, animated: true },
        { id: 'e15-16', source: '15', target: '16', style: { stroke: '#00FFAA', strokeWidth: 2 }, animated: true },
        { id: 'e16-5', source: '16', target: '5', style: { stroke: '#00FFAA', strokeWidth: 2 }, animated: true },
        { id: 'e9-19', source: '9', target: '19', style: { stroke: '#B580FF', strokeWidth: 2 }, animated: true },
        { id: 'e13-19', source: '13', target: '19', style: { stroke: '#B580FF', strokeWidth: 2 }, animated: true },
        { id: 'e18-19', source: '18', target: '19', style: { stroke: '#B580FF', strokeWidth: 2 }, animated: true },
        { id: 'e19-18', source: '19', target: '18', style: { stroke: '#B580FF', strokeWidth: 2 }, animated: true },
        { id: 'e4-24', source: '4', target: '24', style: { stroke: '#E91E63', strokeWidth: 2 }, animated: true },
        { id: 'e5-24', source: '5', target: '24', style: { stroke: '#E91E63', strokeWidth: 2 }, animated: true },
        { id: 'e6-25', source: '6', target: '25', style: { stroke: '#E91E63', strokeWidth: 2 }, animated: true },
        { id: 'e7-26', source: '7', target: '26', style: { stroke: '#E91E63', strokeWidth: 2 }, animated: true },
        { id: 'e13-27', source: '13', target: '27', style: { stroke: '#E91E63', strokeWidth: 2 }, animated: true },
        { id: 'e9-28', source: '9', target: '28', style: { stroke: '#FFD600', strokeWidth: 2 }, animated: true },
        { id: 'e10-28', source: '10', target: '28', style: { stroke: '#FFD600', strokeWidth: 2 }, animated: true },
        { id: 'e19-30', source: '19', target: '30', style: { stroke: '#888888', strokeWidth: 2 }, animated: true },
        { id: 'e20-9', source: '20', target: '9', style: { stroke: '#8BC34A', strokeWidth: 2 }, animated: true },
        { id: 'e20-7', source: '20', target: '7', style: { stroke: '#8BC34A', strokeWidth: 2 }, animated: true },
        { id: 'e21-22', source: '21', target: '22', style: { stroke: '#8BC34A', strokeWidth: 2 }, animated: true },
        { id: 'e22-23', source: '22', target: '23', style: { stroke: '#8BC34A', strokeWidth: 2 }, animated: true }
      ]
    };
  }

  const edgeStyle = { stroke: '#00D1FF', strokeWidth: 2 };

  const makeNode = (id: string, type: string, position: { x: number; y: number }) => {
    const meta = componentMeta[type] || { label: type, icon: '', color: 'border-cyan-400' };
    return {
      id,
      type: 'component',
      position,
      data: { label: meta.label, icon: meta.icon, color: meta.color }
    };
  };

  const makeEdge = (id: string, source: string, target: string) => ({
    id,
    source,
    target,
    style: edgeStyle,
    animated: true
  });

  const baseComponents = [
    makeNode('1', 'load-balancer', { x: 100, y: 50 }),
    makeNode('2', 'api-gateway', { x: 300, y: 50 }),
    makeNode('3', 'microservice', { x: 500, y: 50 }),
    makeNode('4', 'database', { x: 500, y: 200 }),
  ];

  const baseConnections = [
    makeEdge('e1-2', '1', '2'),
    makeEdge('e2-3', '2', '3'),
    makeEdge('e3-4', '3', '4'),
  ];

  // Add complexity based on difficulty
  if (difficulty === 'MEDIUM' || difficulty === 'HARD') {
    baseComponents.push(
      makeNode('5', 'cache', { x: 700, y: 50 }),
      makeNode('6', 'queue', { x: 300, y: 200 })
    );
    baseConnections.push(
      makeEdge('e3-5', '3', '5'),
      makeEdge('e2-6', '2', '6')
    );
  }

  if (difficulty === 'HARD' || difficulty === 'BOSS') {
    baseComponents.push(
      makeNode('7', 'monitoring', { x: 100, y: 200 }),
      makeNode('8', 'cdn', { x: 100, y: 350 })
    );
    baseConnections.push(
      makeEdge('e1-7', '1', '7'),
      makeEdge('e8-1', '8', '1')
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
