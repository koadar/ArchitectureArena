import { db } from "./db";
import { challenges, editorials } from "@shared/schema";

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

const sampleEditorials = [
  {
    challengeId: 1,
    title: "Complete URL Shortener Architecture",
    complexity: "INTERMEDIATE",
    estimatedReadTime: 15,
    keyInsights: [
      "Use Base62 encoding for short codes to maximize URL space",
      "Implement cache-aside pattern with Redis for sub-50ms response times",
      "Partition database by URL hash for horizontal scaling",
      "Use CDN for global distribution and edge caching",
      "Implement rate limiting to prevent abuse and DDoS attacks"
    ],
    content: `# URL Shortener System Design

## Overview
This system handles URL shortening with high read traffic, fast redirects, and analytics.

## Core Components

### 1. Load Balancer
- **Purpose**: Distributes incoming requests across multiple servers
- **Technology**: AWS ALB, HAProxy, or Nginx
- **Configuration**: Round-robin with health checks

### 2. Web Servers
- **Purpose**: Handle HTTP requests and business logic
- **Technology**: Node.js, Python Django, or Java Spring
- **Scaling**: Auto-scaling groups with 3+ instances

### 3. Database Layer
- **Primary DB**: PostgreSQL for metadata (URLs, users, analytics)
- **Read Replicas**: 2-3 replicas for read scaling
- **Sharding**: Partition by URL hash for horizontal scaling

### 4. Caching Layer
- **Redis Cluster**: Cache popular URLs for 24h TTL
- **CDN**: CloudFlare/CloudFront for global distribution
- **Application Cache**: In-memory cache for frequently accessed data

### 5. Analytics Service
- **Purpose**: Track clicks, user agents, geolocation
- **Technology**: Apache Kafka + ClickHouse
- **Real-time**: Stream processing for instant analytics

## Architecture Flow

1. **URL Shortening**:
   - User submits long URL
   - Generate unique short code (Base62 encoding)
   - Store mapping in database
   - Cache in Redis
   - Return short URL

2. **URL Redirection**:
   - Check Redis cache first
   - If miss, query database
   - Log analytics data
   - Perform 301/302 redirect

## Key Design Decisions

### Short Code Generation
- Use Base62 (a-z, A-Z, 0-9) for URL-safe codes
- 6-character codes = 62^6 = 56 billion combinations
- Counter-based or hash-based generation

### Database Schema
\`\`\`sql
CREATE TABLE urls (
  id BIGSERIAL PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  long_url TEXT NOT NULL,
  user_id BIGINT,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  click_count BIGINT DEFAULT 0
);

CREATE INDEX idx_short_code ON urls(short_code);
CREATE INDEX idx_user_id ON urls(user_id);
\`\`\`

### Rate Limiting
- 100 requests per minute per IP
- 1000 requests per minute per user
- Sliding window algorithm

## Performance Optimizations

1. **Caching Strategy**:
   - Cache-aside pattern
   - Batch cache warming
   - Cache invalidation on updates

2. **Database Optimization**:
   - Connection pooling
   - Read replicas for analytics
   - Partitioning by date

3. **CDN Integration**:
   - Static asset caching
   - Geographic distribution
   - Edge caching for popular URLs

## Monitoring & Alerts

- **Metrics**: Response time, error rate, cache hit ratio
- **Alerts**: High error rate, database connection issues
- **Logging**: Structured logging with correlation IDs

## Security Considerations

- **Input Validation**: Sanitize URLs, prevent XSS
- **Rate Limiting**: Prevent abuse and DDoS
- **HTTPS**: Enforce SSL/TLS encryption
- **Authentication**: JWT tokens for API access`,
    optimalArchitecture: {
      "nodes": [
        {
          "id": "1",
          "type": "component",
          "position": { "x": 100, "y": 100 },
          "data": { "label": "Load Balancer", "type": "infrastructure" }
        },
        {
          "id": "2",
          "type": "component",
          "position": { "x": 300, "y": 100 },
          "data": { "label": "Web Servers", "type": "service" }
        },
        {
          "id": "3",
          "type": "component",
          "position": { "x": 500, "y": 50 },
          "data": { "label": "Redis Cache", "type": "database" }
        },
        {
          "id": "4",
          "type": "component",
          "position": { "x": 500, "y": 150 },
          "data": { "label": "PostgreSQL", "type": "database" }
        },
        {
          "id": "5",
          "type": "component",
          "position": { "x": 700, "y": 100 },
          "data": { "label": "Analytics Service", "type": "service" }
        }
      ],
      "edges": [
        {
          "id": "e1-2",
          "source": "1",
          "target": "2",
          "type": "smoothstep"
        },
        {
          "id": "e2-3",
          "source": "2",
          "target": "3",
          "type": "smoothstep"
        },
        {
          "id": "e2-4",
          "source": "2",
          "target": "4",
          "type": "smoothstep"
        },
        {
          "id": "e2-5",
          "source": "2",
          "target": "5",
          "type": "smoothstep"
        }
      ]
    }
  },
  {
    challengeId: 2,
    title: "Real-time Chat System Architecture",
    complexity: "ADVANCED",
    estimatedReadTime: 20,
    keyInsights: [
      "Use WebSocket connections with sticky sessions for real-time communication",
      "Implement message ordering with vector clocks and sequence numbers",
      "Use Cassandra for horizontal scaling of message storage",
      "Deploy Redis for real-time presence management",
      "Implement end-to-end encryption for privacy and security"
    ],
    content: `# Real-time Chat System Design

## System Requirements
- Support 1M concurrent users
- Real-time message delivery
- Message ordering guarantee
- Offline message support
- Group chats up to 1000 members

## Core Architecture

### 1. Gateway Layer
- **WebSocket Gateway**: Handles persistent connections
- **Load Balancer**: Distributes connections across gateways
- **Connection Manager**: Tracks user sessions and routing

### 2. Message Processing
- **Message Broker**: Apache Kafka for reliable message queuing
- **Message Processor**: Handles business logic and validation
- **Delivery Service**: Ensures message delivery to all recipients

### 3. Storage Layer
- **Message Database**: Cassandra for horizontal scaling
- **User Database**: PostgreSQL for user profiles and relationships
- **Presence Service**: Redis for real-time user status

### 4. Notification System
- **Push Notifications**: FCM/APNS for mobile devices
- **Email Notifications**: For offline users
- **SMS Notifications**: For critical messages

## Message Flow

1. **Message Sending**:
   - Client sends message via WebSocket
   - Gateway validates and adds to Kafka queue
   - Message processor handles business logic
   - Delivery service routes to recipients

2. **Message Delivery**:
   - Check recipient online status
   - If online: deliver via WebSocket
   - If offline: store for later delivery
   - Send push notification

## Database Design

### Message Storage (Cassandra)
\`\`\`cql
CREATE TABLE messages (
  chat_id UUID,
  message_id TIMEUUID,
  sender_id UUID,
  content TEXT,
  message_type VARCHAR,
  created_at TIMESTAMP,
  PRIMARY KEY (chat_id, message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);
\`\`\`

### User Presence (Redis)
\`\`\`redis
SET user:123:status online
SET user:123:last_seen 1634567890
EXPIRE user:123:status 300
\`\`\`

## Scalability Solutions

### Horizontal Scaling
- **Sharding**: Partition by chat_id
- **Replication**: 3x replication for fault tolerance
- **Load Balancing**: Consistent hashing for connection distribution

### Performance Optimization
- **Message Batching**: Batch messages for better throughput
- **Connection Pooling**: Reuse database connections
- **Caching**: Cache frequently accessed data

## Real-time Features

### Message Ordering
- **Vector Clocks**: Ensure causal ordering
- **Sequence Numbers**: Per-chat message ordering
- **Conflict Resolution**: Last-writer-wins strategy

### Presence Management
- **Heartbeat**: 30-second intervals
- **Graceful Disconnection**: Cleanup on disconnect
- **Status Broadcasting**: Notify contacts of status changes

## Security & Privacy

- **End-to-End Encryption**: Signal protocol implementation
- **Authentication**: JWT with refresh tokens
- **Rate Limiting**: Prevent spam and abuse
- **Message Retention**: Configurable retention policies`,
    optimalArchitecture: {
      "nodes": [
        {
          "id": "1",
          "type": "component",
          "position": { "x": 100, "y": 100 },
          "data": { "label": "WebSocket Gateway", "type": "service" }
        },
        {
          "id": "2",
          "type": "component",
          "position": { "x": 300, "y": 100 },
          "data": { "label": "Message Broker", "type": "infrastructure" }
        },
        {
          "id": "3", 
          "type": "component",
          "position": { "x": 500, "y": 50 },
          "data": { "label": "Cassandra", "type": "database" }
        },
        {
          "id": "4",
          "type": "component", 
          "position": { "x": 500, "y": 150 },
          "data": { "label": "Redis Presence", "type": "database" }
        },
        {
          "id": "5",
          "type": "component",
          "position": { "x": 700, "y": 100 },
          "data": { "label": "Notification Service", "type": "service" }
        }
      ],
      "edges": [
        {
          "id": "e1-2",
          "source": "1",
          "target": "2",
          "type": "smoothstep"
        },
        {
          "id": "e2-3",
          "source": "2",
          "target": "3",
          "type": "smoothstep"
        },
        {
          "id": "e2-4",
          "source": "2",
          "target": "4",
          "type": "smoothstep"
        },
        {
          "id": "e2-5",
          "source": "2",
          "target": "5",
          "type": "smoothstep"
        }
      ]
    }
  }
];

export async function seedDatabase() {
  try {
    console.log("Seeding database with sample challenges...");
    
    // Insert sample challenges
    await db.insert(challenges).values(sampleChallenges);
    
    console.log("Seeding database with editorials...");
    
    // Insert sample editorials
    await db.insert(editorials).values(sampleEditorials);
    
    console.log(`Successfully seeded ${sampleChallenges.length} challenges and ${sampleEditorials.length} editorials`);
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