# The Autonomy Protocol | v0.2.0

> A scalable, non-secular framework for personal accountability and social integrity, built as a modern monorepo with SvelteKit.

## Overview

The Autonomy Protocol is a socio-emotional curriculum framework designed for high school implementation. This monorepo contains two SvelteKit applications (student and teacher portals) and shared component libraries implementing the curriculum's "Human Operating System" methodology.

## Tech Stack

- **Package Manager:** pnpm@11.0.9 with workspace support
- **Framework:** Svelte 5 (runes mode) + SvelteKit
- **Build Tool:** vite-plus (custom Vite wrapper)
- **Language:** TypeScript
- **Database:** Drizzle ORM with libsql/turso (teacher-site only)
- **Authentication:** better-auth with Google OAuth (teacher-site only)
- **Deployment:** Vercel
- **Node:** >=22.12.0

## Monorepo Structure

```
the-autonomy-project/
├── sites/
│   ├── student-site/          # Public-facing student portal
│   └── teacher-site/          # Authenticated teacher portal with database
├── packages/
│   ├── blocks/                # Reusable UI blocks
│   │   ├── banner/
│   │   ├── footer/
│   │   ├── footer-nav/
│   │   ├── header/
│   │   ├── hero/
│   │   └── nav/
│   ├── content/               # Curriculum content components
│   │   ├── four-agreements/   # The Integrity Shield content
│   │   └── twelve-steps/      # The Accountability Cycle content
│   ├── core/                  # Core utilities
│   │   ├── actions/           # Svelte actions (e.g., thickMargins)
│   │   ├── style/             # Shared CSS (tokens, reset, functions)
│   │   └── utils/             # Utility functions
│   └── ui/                    # UI components
│       ├── horizontal-scroll/
│       ├── logo/
│       └── pill/
├── docs/
│   ├── curriculum/            # Curriculum documentation
│   └── templates/              # Lesson plan templates
├── vite.config.ts             # Root vite-plus configuration
├── pnpm-workspace.yaml        # Workspace configuration
└── package.json               # Root scripts and dependencies
```

## Quick Start

### Prerequisites

- Node.js >=22.12.0
- pnpm 11.0.9

### Installation

```bash
vp install
```

### Development

Start the student site:

```bash
vp run student-site#dev
```

Start the teacher site (requires environment variables):

```bash
vp run teacher-site#dev
```

### Build & Test

Run checks across all packages:

```bash
vp ready
```

This runs:

- `vp check` - Type checking and linting
- `vp run -r test` - Tests across workspace
- `vp run -r build` - Build all packages

## Environment Variables

### Teacher Site

Create `.env` in `sites/teacher-site/`:

```env
DATABASE_URL=libsql://your-database-url
DATABASE_AUTH_TOKEN=your-auth-token
BETTER_AUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ORIGIN=http://localhost:5173
```

## Database Setup (Teacher Site)

The teacher site uses Drizzle ORM with libsql/turso:

```bash
cd sites/teacher-site

# Generate migrations
vp exec drizzle-kit generate

# Push schema
vp exec drizzle-kit push

# Seed database
vp node --experimental-strip-types --env-file .env src/lib/server/db/seed.ts

# Open Drizzle Studio
vp exec drizzle-kit studio
```

## Package Scripts

### Root

- `vp ready` - Check, test, and build all packages
- `vp run student-site#dev` - Start student site dev server
- `vp run teacher-site#dev` - Start teacher site dev server
- `vp config` - Configure vite-plus

### Student Site

- `vp dev` - Start dev server
- `vp build` - Build for production
- `vp preview` - Preview production build
- `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json` - Run svelte-check
- `prettier --check . && eslint .` - Run ESLint and Prettier checks
- `prettier --write .` - Format code with Prettier

### Teacher Site

- All student site scripts, plus:
- `vp exec drizzle-kit push` - Push schema to database
- `vp exec drizzle-kit generate` - Generate migrations
- `vp exec drizzle-kit migrate` - Run migrations
- `vp exec drizzle-kit studio` - Open Drizzle Studio
- `vp node --experimental-strip-types --env-file .env src/lib/server/db/seed.ts` - Seed database
- `better-auth generate --config src/lib/server/auth.ts --output src/lib/server/db/auth.schema.ts --yes` - Generate better-auth schema

## Workspace Configuration

The monorepo uses pnpm workspaces with the following catalog dependencies (defined in `pnpm-workspace.yaml`):

- `@lucide/svelte` ^1.14.0
- `typescript` ^5
- `vite` (via vite-plus)
- `vitest` (via vite-plus)
- `sharp` ^0.34.5 (with platform-specific variants)

## Key Architectural Decisions

### Svelte 5 Runes Mode

All apps force runes mode (except in node_modules) for modern reactivity. This can be removed in Svelte 6.

### Shared Components

UI blocks and content components are published as workspace packages with `@autonomy/*` scope, enabling reuse across both sites.

### Markdown Processing

Both sites use mdsvex for processing `.md` and `.svx` files, enabling curriculum content to be authored in Markdown.

### Authentication (Teacher Site)

The teacher site uses better-auth with:

- Google OAuth provider
- Drizzle adapter for libsql
- Admin plugin with role-based access control
- SvelteKit cookies integration

## Curriculum Structure

The curriculum is organized into two main frameworks:

### The Accountability Cycle (Internal Engine)

Derived from the Generalized 12 Steps:

- Radical Ownership
- The Amends Protocol
- Daily Inventory

### The Integrity Shield (External Interface)

Derived from the Four Agreements:

- Precision of Speech
- Emotional Neutrality
- Inquiry-Based Reality

Content for these frameworks is implemented as Svelte components in `packages/content/` and documented in `docs/curriculum/`.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:

- Philosophical alignment requirements
- Content standards and lexicon
- Module drafting process
- Code of conduct

When adding new curriculum content:

1. Use the template in `docs/templates/LESSON_PLAN_TEMPLATE.md`
2. Follow the "Human Operating System" terminology from `GEMINI.md`
3. Create corresponding components in `packages/content/`

## Deployment

Both sites deploy to Vercel via the SvelteKit adapter. Configure environment variables in your Vercel project settings.

## License

See [LICENSE.md](./LICENSE.md)
