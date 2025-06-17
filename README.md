# Architecture Arena

A gamified platform for learning system design and architecture patterns. Users compete in timed challenges where they design system architectures using a visual drag-and-drop interface.

## Features

- **Interactive Design Canvas**: Visual drag-and-drop architecture building with ReactFlow
- **Real-time Simulation**: Animated metrics showing system performance
- **Progressive Challenges**: From beginner URL shorteners to boss-level Mars streaming
- **Battle System**: Timed challenges with scoring and leaderboards
- **Educational Content**: Detailed editorials explaining optimal solutions
- **User Progression**: XP system with rankings and achievement tracking

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, ReactFlow
- **Backend**: Express.js, TypeScript, PostgreSQL, Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect
- **Database**: PostgreSQL with connection pooling
- **Deployment**: Replit with autoscaling

## Setup Instructions

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Replit account (for authentication)

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Database connection (use a standard PostgreSQL connection string)
DATABASE_URL=postgresql://username:password@host:port/database
PGHOST=localhost
PGPORT=5432
PGUSER=username
PGPASSWORD=password
PGDATABASE=database_name

# Replit Auth (automatically configured)
REPLIT_CLIENT_ID=your_client_id
REPLIT_CLIENT_SECRET=your_client_secret
```

3. Initialize the database:
```bash
npm run db:push
npx tsx server/seed.ts   # optional
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility libraries
├── server/                 # Express backend
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   ├── auth.ts             # Authentication setup
│   └── seed.ts             # Database seeding
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema definitions
└── README.md
```

## Database Schema

The application uses PostgreSQL with the following main tables:

- **users**: User profiles and progress tracking
- **challenges**: System design challenges with constraints
- **battles**: User attempts at challenges
- **editorials**: Detailed solution explanations
- **submissions**: User architecture submissions
- **leaderboard**: Ranking and competition data

## API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user
- `POST /auth/login` - Login via Replit Auth
- `POST /auth/logout` - Logout user

### Challenges
- `GET /api/challenges` - List all challenges
- `GET /api/challenges/:id` - Get specific challenge

### Battles
- `POST /api/battles` - Start new battle
- `GET /api/battles/user` - Get user's battles
- `PATCH /api/battles/:id` - Update battle progress

### Editorials
- `GET /api/editorials/:challengeId` - Get challenge editorial
- `GET /api/editorials` - List all editorials

### Submissions
- `GET /api/submissions` - Get user submissions
- `POST /api/submissions` - Submit architecture

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard data
- `GET /api/user/stats` - Get user statistics

## Development

### Adding New Challenges

1. Define the challenge in `server/seed.ts`:
```typescript
{
  title: "Your Challenge Name",
  description: "Detailed challenge description",
  difficulty: "EASY|MEDIUM|HARD|BOSS",
  timeLimit: 30, // minutes
  xpReward: 100,
  constraints: {
    // Challenge-specific constraints
  }
}
```

2. Create corresponding editorial:
```typescript
{
  challengeId: newChallengeId,
  title: "Editorial Title",
  content: "Detailed solution explanation",
  keyInsights: ["Key learning point 1", "Key learning point 2"],
  complexity: "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
  estimatedReadTime: 15
}
```

3. Run the seed script:
```bash
npm run db:seed
```

### Component Library

The design canvas includes these draggable components:

**Infrastructure**
- Load Balancer, CDN, API Gateway, Message Queue

**Services**
- Web Server, Microservice, Auth Service, File Upload

**Databases**
- SQL Database, NoSQL Database, Cache, Search Engine

**Storage**
- Object Storage, File System, Data Warehouse

**Monitoring**
- Logging, Metrics, Alerting, Tracing

### Styling

The application uses a cyber-themed design with:
- Dark gradients (slate-900 to purple-900)
- Neon accents (purple, blue, green)
- Glassmorphism effects
- Smooth animations and transitions

## Deployment

The application is configured for deployment on Replit:

1. Push code to Replit repository
2. Replit automatically provisions PostgreSQL database
3. Environment variables are configured automatically
4. Application runs on port 5000 (mapped to port 80)

## Contributing

1. Follow TypeScript best practices
2. Use the existing component library
3. Maintain the cyber aesthetic
4. Add appropriate tests for new features
5. Update this README for significant changes

## License

This project is licensed under the MIT License.