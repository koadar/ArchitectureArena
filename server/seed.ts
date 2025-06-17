import { db } from "./db";
import { challenges } from "@shared/schema";

const sampleChallenges = [
  {
    title: "Design a URL Shortener",
    description: "Build a scalable URL shortening service like bit.ly. Handle high read traffic, ensure fast redirects, and provide analytics. Consider caching strategies, database sharding, and rate limiting.",
    difficulty: "EASY",
    timeLimit: 30,
    xpReward: 100,
    constraints: {
      "max_url_length": 2048,
      "cache_ttl": "24h",
      "read_write_ratio": "100:1",
      "target_latency": "<50ms"
    }
  },
  {
    title: "Chat Application Backend",
    description: "Design a real-time chat system supporting millions of users. Handle message delivery, user presence, group chats, and message history. Consider WebSocket connections, message ordering, and offline message delivery.",
    difficulty: "MEDIUM",
    timeLimit: 45,
    xpReward: 200,
    constraints: {
      "concurrent_users": 1000000,
      "message_ordering": "required",
      "offline_support": true,
      "max_group_size": 1000
    }
  },
  {
    title: "Social Media Feed",
    description: "Build a scalable news feed system like Twitter/Facebook. Handle user posts, following relationships, feed generation, and real-time updates. Consider fan-out strategies, content ranking, and personalization.",
    difficulty: "HARD",
    timeLimit: 60,
    xpReward: 300,
    constraints: {
      "users": 100000000,
      "posts_per_day": 500000000,
      "feed_latency": "<200ms",
      "personalization": "required"
    }
  },
  {
    title: "Netflix for Mars",
    description: "Design a video streaming platform for Mars colonists. Handle extreme latency (4-24 minute delays), intermittent connectivity, limited bandwidth, and content synchronization between Earth and Mars.",
    difficulty: "BOSS",
    timeLimit: 90,
    xpReward: 500,
    constraints: {
      "earth_mars_latency": "4-24 minutes",
      "bandwidth": "limited",
      "offline_viewing": "required",
      "content_sync": "bidirectional"
    }
  },
  {
    title: "E-commerce Search Engine",
    description: "Design a product search and recommendation system for an e-commerce platform. Handle fuzzy search, filters, sorting, personalized recommendations, and real-time inventory updates.",
    difficulty: "MEDIUM",
    timeLimit: 45,
    xpReward: 250,
    constraints: {
      "products": 10000000,
      "search_latency": "<100ms",
      "personalization": true,
      "real_time_inventory": true
    }
  },
  {
    title: "Ride Sharing Service",
    description: "Build the backend for a ride-sharing app like Uber. Handle driver-rider matching, real-time location tracking, pricing algorithms, and payment processing. Consider geospatial indexing and surge pricing.",
    difficulty: "HARD",
    timeLimit: 75,
    xpReward: 400,
    constraints: {
      "concurrent_rides": 100000,
      "matching_time": "<30s",
      "location_accuracy": "10m",
      "payment_processing": "required"
    }
  }
];

export async function seedDatabase() {
  try {
    console.log("Seeding database with sample challenges...");
    
    // Insert sample challenges
    await db.insert(challenges).values(sampleChallenges);
    
    console.log(`Successfully seeded ${sampleChallenges.length} challenges`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
seedDatabase()
  .then(() => {
    console.log("Database seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Database seeding failed:", error);
    process.exit(1);
  });