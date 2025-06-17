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
  },
  {
    challengeId: 3,
    title: "Social Media Feed Architecture",
    complexity: "EXPERT",
    estimatedReadTime: 25,
    keyInsights: [
      "Implement hybrid push-pull model for optimal feed generation",
      "Use machine learning for content ranking and personalization",
      "Deploy graph databases for social relationship management",
      "Implement event-driven architecture for real-time updates",
      "Use distributed caching for sub-200ms feed latency"
    ],
    content: `# Social Media Feed System Design

## System Scale
- 100M active users
- 500M posts per day
- <200ms feed generation latency
- Personalized content ranking

## Architecture Components

### 1. Feed Generation
- **Timeline Service**: Generates personalized feeds
- **Ranking Algorithm**: ML-based content scoring
- **Fan-out Service**: Distributes posts to followers

### 2. Content Storage
- **Post Database**: Distributed SQL for post metadata
- **Media Storage**: CDN + Object storage for images/videos
- **Graph Database**: Neo4j for social relationships

### 3. Real-time Updates
- **Event Stream**: Kafka for real-time notifications
- **WebSocket Service**: Live feed updates
- **Push Notifications**: Mobile engagement

## Feed Generation Strategies

### Push Model (Fan-out on Write)
- Pre-compute feeds when posts are created
- Fast read performance
- High storage overhead for popular users

### Pull Model (Fan-out on Read)
- Generate feeds on request
- Lower storage cost
- Higher read latency

### Hybrid Approach
- Push for regular users (<1000 followers)
- Pull for celebrities (>1M followers)
- Combine approaches for optimal performance

## Database Design

### Posts Table
\`\`\`sql
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  content TEXT,
  media_urls TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  engagement_score FLOAT DEFAULT 0,
  visibility VARCHAR(20) DEFAULT 'public'
);
\`\`\`

### Timeline Cache (Redis)
\`\`\`redis
ZADD timeline:user:123 1634567890 post:456
EXPIRE timeline:user:123 86400
\`\`\`

## Machine Learning Pipeline

### Content Ranking
- User engagement history
- Content similarity scores
- Temporal relevance decay
- Social signals (likes, shares, comments)

### Personalization Features
- User interests and preferences
- Social graph analysis
- Behavioral patterns
- Content consumption history

## Performance Optimizations

### Caching Strategy
- **L1 Cache**: Application-level feed cache
- **L2 Cache**: Redis distributed cache
- **L3 Cache**: CDN for media content

### Database Optimization
- Read replicas for feed queries
- Sharding by user_id
- Denormalized views for fast reads`,
    optimalArchitecture: {
      "nodes": [
        {
          "id": "1",
          "type": "component",
          "position": { "x": 100, "y": 100 },
          "data": { "label": "API Gateway", "type": "service" }
        },
        {
          "id": "2",
          "type": "component",
          "position": { "x": 300, "y": 50 },
          "data": { "label": "Timeline Service", "type": "service" }
        },
        {
          "id": "3",
          "type": "component",
          "position": { "x": 300, "y": 150 },
          "data": { "label": "Fan-out Service", "type": "service" }
        },
        {
          "id": "4",
          "type": "component",
          "position": { "x": 500, "y": 50 },
          "data": { "label": "Redis Cache", "type": "database" }
        },
        {
          "id": "5",
          "type": "component",
          "position": { "x": 500, "y": 150 },
          "data": { "label": "PostgreSQL", "type": "database" }
        },
        {
          "id": "6",
          "type": "component",
          "position": { "x": 700, "y": 100 },
          "data": { "label": "ML Ranking", "type": "service" }
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
          "id": "e1-3",
          "source": "1",
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
          "id": "e3-5",
          "source": "3",
          "target": "5",
          "type": "smoothstep"
        },
        {
          "id": "e2-6",
          "source": "2",
          "target": "6",
          "type": "smoothstep"
        }
      ]
    }
  },
  {
    challengeId: 4,
    title: "Netflix for Mars - Interplanetary Streaming",
    complexity: "LEGENDARY",
    estimatedReadTime: 35,
    keyInsights: [
      "Pre-position content using predictive algorithms",
      "Implement differential synchronization for bandwidth optimization",
      "Use erasure coding for data integrity across space",
      "Deploy edge computing nodes on Mars surface",
      "Create autonomous content curation system"
    ],
    content: `# Netflix for Mars System Design

## Unique Constraints
- 4-24 minute communication delay
- Limited bandwidth (1-100 Mbps)
- Intermittent connectivity
- Radiation-induced data corruption
- Power constraints on Mars

## Architecture Overview

### Earth Infrastructure
- **Content Origin**: Master content repository
- **Mission Control**: System monitoring and control
- **Uplink Scheduler**: Optimizes data transmission windows
- **ML Predictor**: Predicts Mars viewing preferences

### Mars Infrastructure
- **Local CDN**: Distributed content cache
- **Edge Servers**: Surface-based computing nodes
- **Offline Player**: Standalone playback system
- **Sync Service**: Handles content synchronization

### Space Communication
- **Deep Space Network**: Primary communication channel
- **Relay Satellites**: Mars orbit communication hubs
- **Error Correction**: Advanced FEC coding
- **Compression Engine**: Adaptive bitrate encoding

## Content Strategy

### Pre-positioning Algorithm
\`\`\`python
def predict_content_demand():
    factors = [
        user_viewing_history,
        seasonal_preferences,
        crew_rotation_schedule,
        earth_trending_content,
        psychological_factors
    ]
    return ml_model.predict(factors)
\`\`\`

### Differential Sync
- Only sync content changes/deltas
- Prioritize by predicted demand
- Compress aggressively (90%+ reduction)
- Use bloom filters for efficient checking

## Storage Architecture

### Mars Local Storage
- **Hot Storage**: SSD for actively watched content
- **Cold Storage**: HDD for archived content  
- **Distributed Storage**: Across multiple Mars locations
- **Redundancy**: 3x replication with erasure coding

### Content Catalog
\`\`\`sql
CREATE TABLE mars_content (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  size_gb NUMERIC,
  priority_score FLOAT,
  last_accessed TIMESTAMP,
  sync_status VARCHAR(20),
  earth_version_hash VARCHAR(64)
);
\`\`\`

## Synchronization Protocol

### Communication Windows
- **Optimal Windows**: When Mars-Earth alignment is best
- **Emergency Sync**: Critical updates during suboptimal windows
- **Batch Processing**: Accumulate changes between windows

### Error Recovery
- **Forward Error Correction**: Reed-Solomon coding
- **Automatic Retry**: Exponential backoff with jitter
- **Partial Recovery**: Resume interrupted transfers
- **Integrity Checks**: SHA-256 verification

## Offline Capabilities

### Autonomous Operation
- 6-month fully offline capability
- Local content recommendation engine
- User preference learning
- Automatic quality adjustment

### Content Curation
- AI-driven content selection
- Mood-based recommendations
- Social viewing patterns
- Cultural event integration

## Performance Optimizations

### Bandwidth Management
- **Adaptive Streaming**: Dynamic quality adjustment
- **Predictive Caching**: ML-based content pre-loading
- **Compression**: H.265/AV1 with custom profiles
- **Deduplication**: Cross-content similarity detection

### Power Optimization
- **Sleep Scheduling**: Power-aware content sync
- **Quality Scaling**: Lower quality during power constraints
- **Processing Offload**: Use Earth resources when possible`,
    optimalArchitecture: {
      "nodes": [
        {
          "id": "1",
          "type": "component",
          "position": { "x": 100, "y": 100 },
          "data": { "label": "Earth Content Origin", "type": "service" }
        },
        {
          "id": "2",
          "type": "component",
          "position": { "x": 300, "y": 100 },
          "data": { "label": "Deep Space Network", "type": "infrastructure" }
        },
        {
          "id": "3",
          "type": "component",
          "position": { "x": 500, "y": 100 },
          "data": { "label": "Mars Relay Satellites", "type": "infrastructure" }
        },
        {
          "id": "4",
          "type": "component",
          "position": { "x": 700, "y": 50 },
          "data": { "label": "Mars Edge CDN", "type": "service" }
        },
        {
          "id": "5",
          "type": "component",
          "position": { "x": 700, "y": 150 },
          "data": { "label": "Mars Storage", "type": "database" }
        },
        {
          "id": "6",
          "type": "component",
          "position": { "x": 900, "y": 100 },
          "data": { "label": "Offline Player", "type": "service" }
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
          "id": "e3-4",
          "source": "3",
          "target": "4",
          "type": "smoothstep"
        },
        {
          "id": "e4-5",
          "source": "4",
          "target": "5",
          "type": "smoothstep"
        },
        {
          "id": "e4-6",
          "source": "4",
          "target": "6",
          "type": "smoothstep"
        }
      ]
    }
  },
  {
    challengeId: 5,
    title: "E-commerce Search Engine Architecture",
    complexity: "ADVANCED",
    estimatedReadTime: 20,
    keyInsights: [
      "Use Elasticsearch with custom analyzers for fuzzy search",
      "Implement real-time inventory sync with event sourcing",
      "Deploy ML-based personalization with collaborative filtering",
      "Use Redis for sub-100ms search result caching",
      "Implement A/B testing framework for search ranking"
    ],
    content: `# E-commerce Search Engine Design

## Requirements
- 10M products in catalog
- <100ms search latency
- Personalized recommendations  
- Real-time inventory updates
- Advanced filtering and sorting

## Search Architecture

### Search Engine (Elasticsearch)
- **Custom Analyzers**: Handle product names, descriptions
- **Fuzzy Matching**: Typo tolerance and phonetic search
- **Faceted Search**: Dynamic filtering by attributes
- **Auto-complete**: Real-time search suggestions

### Index Structure
\`\`\`json
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "product_analyzer"
      },
      "category": {
        "type": "keyword"
      },
      "price": {
        "type": "scaled_float",
        "scaling_factor": 100
      },
      "inventory_count": {
        "type": "integer"
      },
      "rating": {
        "type": "float"
      }
    }
  }
}
\`\`\`

## Personalization Engine

### User Profiling
- **Behavioral Data**: Search history, clicks, purchases
- **Demographic Data**: Age, location, preferences
- **Session Data**: Current session context
- **Real-time Updates**: Streaming profile updates

### Recommendation Algorithms
- **Collaborative Filtering**: User-based and item-based
- **Content-Based**: Product feature similarity
- **Matrix Factorization**: Latent factor modeling
- **Deep Learning**: Neural collaborative filtering

## Real-time Inventory

### Event Sourcing Pattern
\`\`\`python
class InventoryEvent:
    def __init__(self, product_id, quantity_change, timestamp):
        self.product_id = product_id
        self.quantity_change = quantity_change
        self.timestamp = timestamp

def update_search_index(event):
    elasticsearch.update(
        index='products',
        id=event.product_id,
        body={'doc': {'inventory_count': get_current_inventory(event.product_id)}}
    )
\`\`\`

### Data Pipeline
- **Kafka Streams**: Real-time inventory events
- **Change Data Capture**: Database change monitoring
- **Elasticsearch Sync**: Index updates within seconds
- **Cache Invalidation**: Clear stale search results

## Performance Optimization

### Caching Strategy
- **Query Cache**: Redis for frequent searches
- **Result Cache**: Pre-computed popular queries
- **Filter Cache**: Cached facet counts
- **Personalization Cache**: User-specific recommendations

### Search Optimization
- **Index Sharding**: Distribute across multiple nodes
- **Replica Sets**: Read scaling and high availability
- **Query Optimization**: Efficient query structures
- **Bulk Operations**: Batch index updates

## A/B Testing Framework

### Experiment Design
- **Search Ranking**: Different scoring algorithms
- **UI Components**: Search result layouts
- **Personalization**: Recommendation strategies
- **Performance**: Caching vs real-time trade-offs

### Metrics Collection
- **Click-through Rate**: Search result effectiveness
- **Conversion Rate**: Search to purchase funnel
- **Revenue Impact**: A/B test business metrics
- **User Engagement**: Time spent, pages viewed`,
    optimalArchitecture: {
      "nodes": [
        {
          "id": "1",
          "type": "component",
          "position": { "x": 100, "y": 100 },
          "data": { "label": "Search API", "type": "service" }
        },
        {
          "id": "2",
          "type": "component",
          "position": { "x": 300, "y": 50 },
          "data": { "label": "Elasticsearch", "type": "database" }
        },
        {
          "id": "3",
          "type": "component",
          "position": { "x": 300, "y": 150 },
          "data": { "label": "Redis Cache", "type": "database" }
        },
        {
          "id": "4",
          "type": "component",
          "position": { "x": 500, "y": 100 },
          "data": { "label": "ML Recommender", "type": "service" }
        },
        {
          "id": "5",
          "type": "component",
          "position": { "x": 700, "y": 100 },
          "data": { "label": "Inventory Service", "type": "service" }
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
          "id": "e1-3",
          "source": "1",
          "target": "3",
          "type": "smoothstep"
        },
        {
          "id": "e1-4",
          "source": "1",
          "target": "4",
          "type": "smoothstep"
        },
        {
          "id": "e1-5",
          "source": "1",
          "target": "5",
          "type": "smoothstep"
        }
      ]
    }
  },
  {
    challengeId: 6,
    title: "Ride Sharing Service Architecture",
    complexity: "EXPERT",
    estimatedReadTime: 25,
    keyInsights: [
      "Use geospatial indexing (R-tree, Quadtree) for driver matching",
      "Implement event-driven architecture for real-time tracking",
      "Deploy machine learning for dynamic pricing algorithms",
      "Use WebSocket connections for live location updates",
      "Implement circuit breakers for payment service resilience"
    ],
    content: `# Ride Sharing Service Design

## Core Requirements
- 100K concurrent rides
- <30s driver-rider matching
- 10m location accuracy
- Dynamic pricing (surge)
- Payment processing integration

## Geospatial Architecture

### Location Services
- **GPS Tracking**: Real-time driver/rider positions
- **Geospatial Indexing**: R-tree for efficient range queries
- **Map Services**: Integration with Google Maps/OpenStreetMap
- **Route Optimization**: A* algorithm with traffic data

### Matching Algorithm
\`\`\`python
def find_nearby_drivers(rider_location, radius=5km):
    # Use geospatial index for O(log n) lookup
    drivers = geospatial_index.range_query(
        center=rider_location,
        radius=radius
    )
    
    # Score drivers by distance, rating, ETA
    scored_drivers = []
    for driver in drivers:
        score = calculate_match_score(driver, rider_location)
        scored_drivers.append((driver, score))
    
    return sorted(scored_drivers, key=lambda x: x[1], reverse=True)
\`\`\`

## Real-time Communication

### WebSocket Architecture
- **Connection Manager**: Handle driver/rider connections
- **Location Broker**: Distribute position updates
- **Trip Coordinator**: Manage ride lifecycle
- **Notification Service**: Push updates to mobile apps

### Event-Driven Design
- **Ride Requested**: Trigger driver matching
- **Driver Assigned**: Update both parties
- **Trip Started**: Begin tracking and billing
- **Trip Completed**: Process payment and ratings

## Dynamic Pricing Engine

### Surge Algorithm
\`\`\`python
def calculate_surge_multiplier(area, time):
    demand = get_ride_requests(area, time)
    supply = get_available_drivers(area)
    
    demand_supply_ratio = demand / max(supply, 1)
    
    # Exponential surge curve
    if demand_supply_ratio > 2.0:
        return min(demand_supply_ratio * 0.5, 5.0)  # Cap at 5x
    else:
        return 1.0  # No surge
\`\`\`

### Price Optimization
- **Historical Data**: Past pricing and demand patterns
- **Weather Impact**: Rain/snow increases demand
- **Event Detection**: Concerts, games, airport delays
- **Competitor Analysis**: Market pricing intelligence

## Payment Processing

### Payment Flow
1. **Pre-authorization**: Hold funds at trip start
2. **Fare Calculation**: Distance + time + surge
3. **Payment Capture**: Charge actual fare
4. **Driver Payout**: Transfer to driver account
5. **Dispute Handling**: Refund/adjustment process

### Payment Architecture
- **Payment Gateway**: Stripe, PayPal integration
- **Wallet Service**: Store payment methods
- **Fraud Detection**: ML-based risk scoring
- **PCI Compliance**: Secure data handling

## Database Design

### Trip Management
\`\`\`sql
CREATE TABLE trips (
  id UUID PRIMARY KEY,
  rider_id UUID NOT NULL,
  driver_id UUID,
  pickup_location GEOGRAPHY(POINT),
  dropoff_location GEOGRAPHY(POINT),
  status VARCHAR(20),
  fare_amount DECIMAL(10,2),
  surge_multiplier DECIMAL(3,2),
  created_at TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE INDEX idx_trips_location ON trips 
USING GIST (pickup_location);
\`\`\`

### Driver Tracking
\`\`\`sql
CREATE TABLE driver_locations (
  driver_id UUID,
  location GEOGRAPHY(POINT),
  bearing INTEGER,
  speed DECIMAL(5,2),
  updated_at TIMESTAMP,
  PRIMARY KEY (driver_id, updated_at)
);
\`\`\`

## Scalability Solutions

### Horizontal Scaling
- **Geographic Sharding**: Partition by city/region
- **Service Decomposition**: Separate matching, payment, tracking
- **Load Balancing**: Distribute traffic across regions
- **Auto-scaling**: Dynamic capacity based on demand

### Performance Optimization
- **Location Caching**: Redis for active driver positions
- **Route Caching**: Pre-computed common routes
- **Database Partitioning**: Time-based trip partitioning
- **CDN Integration**: Static map tiles and assets

## Reliability & Monitoring

### Circuit Breakers
- **Payment Service**: Fallback to cash payments
- **Map Service**: Use cached routes
- **Notification Service**: Queue for retry
- **Driver Matching**: Expand search radius

### Monitoring Metrics
- **Matching Time**: Average time to find driver
- **Success Rate**: Completed vs cancelled trips
- **Payment Failures**: Transaction error rates
- **Location Accuracy**: GPS precision metrics`,
    optimalArchitecture: {
      "nodes": [
        {
          "id": "1",
          "type": "component",
          "position": { "x": 100, "y": 100 },
          "data": { "label": "Mobile Apps", "type": "client" }
        },
        {
          "id": "2",
          "type": "component",
          "position": { "x": 300, "y": 100 },
          "data": { "label": "API Gateway", "type": "service" }
        },
        {
          "id": "3",
          "type": "component",
          "position": { "x": 500, "y": 50 },
          "data": { "label": "Matching Service", "type": "service" }
        },
        {
          "id": "4",
          "type": "component",
          "position": { "x": 500, "y": 150 },
          "data": { "label": "Location Service", "type": "service" }
        },
        {
          "id": "5",
          "type": "component",
          "position": { "x": 700, "y": 50 },
          "data": { "label": "Payment Service", "type": "service" }
        },
        {
          "id": "6",
          "type": "component",
          "position": { "x": 700, "y": 150 },
          "data": { "label": "PostgreSQL", "type": "database" }
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
        },
        {
          "id": "e3-6",
          "source": "3",
          "target": "6",
          "type": "smoothstep"
        },
        {
          "id": "e4-6",
          "source": "4",
          "target": "6",
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