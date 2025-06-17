# Architecture Arena - Replit Project Documentation

## Overview

Architecture Arena is a gamified platform for learning system design and architecture patterns. Users compete in timed challenges where they design system architectures using a visual drag-and-drop interface. The application features a leaderboard system, user progression tracking, and various difficulty levels ranging from beginner to boss-level challenges.

## System Architecture

The application follows a full-stack TypeScript architecture with clear separation between client, server, and shared code:

- **Frontend**: React 18 with Vite, TypeScript, and Tailwind CSS
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives

## Key Components

### Frontend Architecture
- **React Router**: Uses Wouter for lightweight client-side routing
- **State Management**: TanStack Query handles server state, React hooks for local state
- **Styling**: Tailwind CSS with custom cyber-themed design system
- **Component Library**: shadcn/ui components with custom theming
- **Design Canvas**: ReactFlow for visual architecture design interface

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **Authentication**: Passport.js with OpenID Connect strategy for Replit Auth
- **Session Management**: Express sessions with PostgreSQL store
- **Database Layer**: Drizzle ORM with connection pooling via Neon serverless

### Database Schema
- **Users**: Stores user profiles, XP, rankings, and progress tracking
- **Challenges**: Contains system design challenges with difficulty levels and time limits
- **Battles**: Tracks user attempts at challenges with architecture submissions
- **Sessions**: Required for Replit Auth session management

## Data Flow

1. **User Authentication**: Users authenticate via Replit OAuth, creating sessions stored in PostgreSQL
2. **Challenge Selection**: Users browse available challenges fetched from the database
3. **Battle Creation**: Starting a challenge creates a battle record with timer tracking
4. **Architecture Design**: Users build architectures using the ReactFlow canvas component
5. **Submission**: Completed architectures are saved to the battle record
6. **Progress Tracking**: XP and rankings are updated based on challenge completion

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database queries and migrations
- **@tanstack/react-query**: Server state management and caching
- **reactflow**: Visual node-based architecture design canvas
- **passport**: Authentication middleware
- **express-session**: Session management

### UI Dependencies
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **framer-motion**: Animation library for enhanced UX
- **wouter**: Lightweight React router

## Deployment Strategy

The application is configured for deployment on Replit's infrastructure:

- **Development**: `npm run dev` starts both Vite dev server and Express backend
- **Production Build**: `npm run build` compiles client assets and bundles server code
- **Runtime**: Node.js 20 with PostgreSQL 16 database provisioning
- **Port Configuration**: Server runs on port 5000, mapped to external port 80
- **Static Assets**: Client build output served from Express server in production

The deployment uses Replit's autoscale target with automatic database provisioning and environment variable management for secure configuration.

## Changelog

- June 16, 2025: Initial setup with complete working application
- June 16, 2025: Fixed critical database issues and implemented drag-and-drop functionality
- June 16, 2025: Added 6 sample challenges and working battle system
- June 16, 2025: Implemented functional simulation engine and component library

## Recent Changes

✓ Successfully migrated from Replit Agent to standard Replit environment
✓ Fixed auto-complete functionality with proper API integration
✓ Enhanced background visibility for challenge text and architecture elements
✓ Expanded seed script with 6 comprehensive editorials covering all challenges
✓ Created detailed README with complete setup and API documentation
✓ Implemented working EditorialPanel component for in-canvas hints
✓ Fixed all TypeScript errors and missing component references
✓ Completed database migrations and seeding with authentic content
✓ Added proper error handling and user feedback for all features

## Current Status

The application is fully functional with:
- Working authentication and user management
- Interactive drag-and-drop design canvas
- Real-time simulation with animated metrics
- Functional battle creation and management
- Working leaderboard and user statistics
- All navigation and quick actions working properly

## User Preferences

Preferred communication style: Simple, everyday language.