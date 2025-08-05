# Overview

This is a full-stack web application for "Escola Fenda da Tundavala," an educational institution focused on Angola-China cultural exchange. The application serves as a comprehensive school website featuring information about educational programs, virtual tours, news updates, and includes interactive features like a tuition calculator and contact forms. Built with modern web technologies, it provides a bilingual educational platform that connects Angolan and Chinese students through various academic programs.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with **React** and **TypeScript**, utilizing a component-based architecture with the following key design decisions:

- **UI Framework**: Uses shadcn/ui components built on top of Radix UI primitives for consistent, accessible interface elements
- **Styling**: Tailwind CSS with custom CSS variables for theming, including Angola-China specific color schemes (angola-blue, china-yellow)
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and API interactions
- **Animations**: Framer Motion for smooth page transitions and component animations
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

The application follows a single-page application (SPA) pattern with component-based sections including navigation, hero, about, programs, calculator, virtual tour, gallery, news, contact, and footer sections.

## Backend Architecture

The backend uses **Express.js** with **TypeScript** in a modern ESM setup:

- **API Design**: RESTful API endpoints for contact form submissions, tuition calculations, and data retrieval
- **Request Handling**: Express middleware for JSON parsing, CORS handling, and request logging
- **Error Management**: Centralized error handling with proper HTTP status codes and error responses
- **Development Setup**: Vite integration for hot module replacement and development server proxy

The server implements in-memory storage with an interface-based design that allows for easy migration to persistent databases later.

## Data Storage Solutions

Currently implements **in-memory storage** with a well-defined interface pattern:

- **Storage Interface**: `IStorage` interface defines contracts for user, contact, and tuition calculation operations
- **Memory Implementation**: `MemStorage` class provides in-memory data persistence using Maps
- **Database Schema**: Drizzle ORM schema definitions prepared for PostgreSQL migration
- **Data Models**: Strongly typed with Zod schemas for validation and TypeScript interfaces

The architecture is designed for easy migration from memory storage to PostgreSQL using Drizzle ORM, with all database schemas already defined.

## Authentication and Authorization

Currently, the application includes user schema definitions but does not implement active authentication:

- **User Schema**: Prepared user table schema with username/password fields
- **Session Management**: Basic session structure defined but not actively used
- **Future-Ready**: Architecture supports adding authentication middleware when needed

## External Dependencies

The application integrates several external services and libraries:

- **Database**: Neon Database (serverless PostgreSQL) configured via Drizzle ORM
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS with PostCSS for styling pipeline
- **Development Tools**: Vite for build tooling and development server
- **Validation**: Zod for runtime type checking and form validation
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Configured for Replit environment with specific plugins and error handling

The application is structured to easily add authentication, persistent database storage, and additional external integrations as the school's digital needs grow.