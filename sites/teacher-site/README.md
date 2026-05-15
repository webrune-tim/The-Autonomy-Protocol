# Teacher Site

> Authenticated teacher portal for The Autonomy Protocol curriculum management and resources.

## Overview

The teacher site is the authenticated portal for educators implementing The Autonomy Protocol curriculum. It provides access to curriculum materials, teacher resources, and administrative features. This SvelteKit application integrates with a libsql/turso database via Drizzle ORM and uses better-auth for Google OAuth authentication.

## Tech Stack

- **Framework:** Svelte 5 (runes mode) + SvelteKit
- **Build Tool:** vite-plus (custom Vite wrapper)
- **Language:** TypeScript
- **Database:** Drizzle ORM with libsql/turso
- **Authentication:** better-auth with Google OAuth
- **Deployment:** Vercel
- **Markdown:** mdsvex for curriculum content processing
- **Package Manager:** pnpm

## Site Structure

```
sites/teacher-site/
├── src/
│   ├── lib/
│   │   ├── assets/              # Images and static assets
│   │   ├── components/          # Teacher-specific components
│   │   │   ├── TeacherCta.svelte
│   │   │   ├── TeacherOnly.svelte
│   │   │   └── ThemeToggle.svelte
│   │   ├── docs/                # Curriculum documentation
│   │   │   ├── agreements/      # Five Agreements content
│   │   │   └── steps/           # Twelve Steps content
│   │   ├── server/              # Server-side code
│   │   │   ├── auth.ts          # better-auth configuration
│   │   │   └── db/              # Database schema and client
│   │   └── auth-client.ts       # Client-side auth utilities
│   └── routes/                  # SvelteKit routes
│       ├── (protected)/        # Protected routes (require auth)
│       │   └── dashboard/
│       ├── api/                # API routes
│       │   ├── auth/[...auth]/ # better-auth endpoints
│       │   └── theme/           # Theme preferences
│       ├── curriculum/         # Curriculum pages
│       ├── contact/            # Contact form
│       ├── join-us/            # Join team page
│       ├── login/              # Login page
│       ├── logout/             # Logout endpoint
│       ├── mission/            # Mission statement
│       ├── resources/          # Teacher resources
│       └── road-map/           # Project roadmap
├── drizzle.config.ts            # Drizzle ORM configuration
├── svelte.config.js            # SvelteKit configuration
└── vite.config.ts              # Vite configuration
```

## Quick Start

### Prerequisites

- Node.js >=22.12.0
- pnpm 11.0.9
- libsql/turso database (or local SQLite for development)
- Google OAuth credentials

### Environment Variables

Create `.env` in the teacher-site directory:

```env
DATABASE_URL=libsql://your-database-url
DATABASE_AUTH_TOKEN=your-auth-token
BETTER_AUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ORIGIN=http://localhost:5173
```

### Installation

From the monorepo root:

```bash
vp install
```

### Development

Start the development server:

```bash
vp dev
```

Or from the monorepo root:

```bash
vp run teacher-site#dev
```

### Build

Build for production:

```bash
vp build
```

Preview production build:

```bash
vp preview
```

## Database Setup

The teacher site uses Drizzle ORM with libsql/turso for data persistence.

### Initial Setup

```bash
# Generate migrations
vp exec drizzle-kit generate

# Push schema to database
vp exec drizzle-kit push

# Seed database with initial data
vp node --experimental-strip-types --env-file .env src/lib/server/db/seed.ts

# Open Drizzle Studio for database inspection
vp exec drizzle-kit studio
```

### Database Schema

The schema is defined in `src/lib/server/db/schema.ts` and includes:

- User authentication tables (managed by better-auth)
- Session management
- Any custom application data

### Auth Schema Generation

Generate better-auth database schema:

```bash
better-auth generate --config src/lib/server/auth.ts --output src/lib/server/db/auth.schema.ts --yes
```

## Authentication

The teacher site uses better-auth with the following configuration:

### Features

- Google OAuth provider
- Drizzle adapter for libsql
- Admin plugin with role-based access control
- SvelteKit cookies integration
- Theme preference storage

### Roles

- `admin` - Full administrative access
- `superadmin` - Highest level access
- `user` - Standard teacher access

### Protected Routes

Routes in `(protected)` directory require authentication. The `+layout.server.ts` file handles session validation.

## Package Scripts

- `vp dev` - Start development server
- `vp build` - Build for production
- `vp preview` - Preview production build
- `vp exec drizzle-kit push` - Push schema to database
- `vp exec drizzle-kit generate` - Generate migrations
- `vp exec drizzle-kit migrate` - Run migrations
- `vp exec drizzle-kit studio` - Open Drizzle Studio
- `vp node --experimental-strip-types --env-file .env src/lib/server/db/seed.ts` - Seed database
- `better-auth generate --config src/lib/server/auth.ts --output src/lib/server/db/auth.schema.ts --yes` - Generate better-auth schema
- `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json` - Run svelte-check
- `prettier --check . && eslint .` - Run ESLint and Prettier checks
- `prettier --write .` - Format code with Prettier

## Key Features

### Curriculum Content

- The Integrity Shield (Five Agreements) - Tier 1 prevention framework
- The Accountability Cycle (Twelve Steps) - Tier 2 restoration framework
- Markdown-based curriculum documentation in `src/lib/docs/`
- Processed via mdsvex for seamless integration

### Teacher Resources

- Dashboard for authenticated teachers
- Curriculum access and navigation
- Resource library with downloadable materials
- Contact form for support

### Authentication Flow

1. Teachers sign in via Google OAuth
2. Session managed via better-auth with SvelteKit cookies
3. Protected routes validate session server-side
4. Theme preferences stored in user profile

## Shared Packages

The teacher site imports shared packages from the monorepo:

- `@autonomy/actions` - Svelte actions (thickMargins)
- `@autonomy/banner` - Banner component
- `@autonomy/footer` - Footer component
- `@autonomy/footer-nav` - Footer navigation
- `@autonomy/four-agreements` - Four Agreements content
- `@autonomy/header` - Header component
- `@autonomy/hero` - Hero component
- `@autonomy/horizontal-scroll` - Horizontal scroll component
- `@autonomy/logo` - Logo component
- `@autonomy/nav` - Navigation component
- `@autonomy/pill` - Pill component
- `@autonomy/style` - Shared CSS (tokens, reset, functions)
- `@autonomy/twelve-steps` - Twelve Steps content

## Deployment

The teacher site deploys to Vercel via the SvelteKit adapter. Configure the following environment variables in your Vercel project:

- `DATABASE_URL`
- `DATABASE_AUTH_TOKEN`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ORIGIN` (production URL)

## Development Notes

### Svelte Configuration

- Runes mode forced for all files except node_modules
- mdsvex preprocessor for `.md` and `.svx` files
- Path aliases: `$components`, `$docs`, `$images`, `$stores`

### TypeScript Configuration

- Includes `drizzle.config.ts` in TypeScript compilation
- Uses native TypeScript preview

### Memory Considerations

- Development server runs with increased Node memory: `--max-old-space-size=4096`
