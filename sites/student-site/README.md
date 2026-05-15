# Student Site

> Public-facing student portal for The Autonomy Protocol curriculum and resources.

> **⚠️ Status: Not yet under active development**

This site is currently in early development and is not actively being worked on. The teacher-site is the primary focus for curriculum implementation and resource management.

## Overview

The student site is the public-facing portal for students accessing The Autonomy Protocol curriculum. It provides a simplified interface for students to engage with the curriculum materials without authentication requirements. This SvelteKit application leverages shared component libraries from the monorepo for consistency with the teacher portal.

## Tech Stack

- **Framework:** Svelte 5 (runes mode) + SvelteKit
- **Build Tool:** vite-plus (custom Vite wrapper)
- **Language:** TypeScript
- **Deployment:** Vercel
- **Markdown:** mdsvex for curriculum content processing
- **Package Manager:** pnpm
- **Testing:** Vitest with Playwright browser mode

## Site Structure

```
sites/student-site/
├── src/
│   ├── lib/
│   │   ├── assets/              # Images and static assets
│   │   ├── components/          # Student-specific components
│   │   │   └── ThemeToggle.svelte
│   │   └── stores/              # Svelte stores
│   │       └── theme.svelte.js  # Theme preference store
│   └── routes/                  # SvelteKit routes
│       ├── +layout.svelte       # Root layout
│       ├── +page.svelte         # Home page
│       └── global.css          # Global styles
├── svelte.config.js            # SvelteKit configuration
└── vite.config.ts              # Vite configuration
```

## Quick Start

### Prerequisites

- Node.js >=22.12.0
- pnpm 11.0.9

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
vp run student-site#dev
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

## Package Scripts

- `vp dev` - Start development server
- `vp build` - Build for production
- `vp preview` - Preview production build
- `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json` - Run svelte-check
- `prettier --check . && eslint .` - Run ESLint and Prettier checks
- `prettier --write .` - Format code with Prettier

## Key Features

### Curriculum Content

- Public access to curriculum materials
- The Integrity Shield (Five Agreements) content
- The Accountability Cycle (Twelve Steps) content
- Simplified interface optimized for student engagement

### Theme Support

- Dark/light theme toggle
- Theme preference persisted via local storage
- Consistent theming with teacher-site

## Shared Packages

The student site imports shared packages from the monorepo:

- `@autonomy/banner` - Banner component
- `@autonomy/footer` - Footer component
- `@autonomy/four-agreements` - Four Agreements content
- `@autonomy/header` - Header component
- `@autonomy/hero` - Hero component
- `@autonomy/logo` - Logo component
- `@autonomy/nav` - Navigation component
- `@autonomy/pill` - Pill component
- `@autonomy/style` - Shared CSS (tokens, reset, functions)
- `@autonomy/twelve-steps` - Twelve Steps content

## Deployment

The student site deploys to Vercel via the SvelteKit adapter. No environment variables are required as the site is public-facing without authentication.

## Development Notes

### Svelte Configuration

- Runes mode forced for all files except node_modules
- mdsvex preprocessor for `.md` and `.svx` files
- Path aliases: `$components`, `$images`, `$stores`

### Testing

- Vitest configured with Playwright browser mode for component testing
- Unit and component test capabilities

## Future Development

Planned features for when active development resumes:

- Interactive curriculum modules
- Student progress tracking
- Gamification elements
- Mobile-responsive design enhancements
- Accessibility improvements
