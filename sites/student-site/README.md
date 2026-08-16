# Student Site | The Autonomy Protocol

> **Public & Authenticated Student Learning Portal**  
> _SvelteKit 2 + Svelte 5 Runes application delivering interactive curriculum modules, cognitive inventory tools, progress tracking, and psychological literacy resources._

---

## 1. Overview & Pedagogical Purpose

The **Student Site** (`sites/student-site`) serves as the primary interactive interface for students participating in **The Autonomy Protocol**. It bridges theoretical executive functioning principles into daily practice through interactive module exercises, practicum responses, and progress analytics.

Students engage with the curriculum through two core learning systems:

- **The Accountability Cycle (Internal Regulation):** Guiding self-assessment, cognitive distortion identification, and restorative action planning.
- **The Integrity Protocol (Interpersonal Dynamics):** Practicing precision of speech, emotional neutrality, inquiry-based reality, and adaptive output.

---

## 2. Technology Stack

| Layer                  | Technology           | Specification / Role                                                 |
| :--------------------- | :------------------- | :------------------------------------------------------------------- |
| **Framework**          | Svelte 5 + SvelteKit | Forced Runes mode, fine-grained reactivity, `#lib/*` subpath imports |
| **Runtime & Language** | Node.js + TypeScript | `Node >=22.12.0`, `TypeScript ^6.0.3`                                |
| **Package Manager**    | `pnpm@11.22.0`       | Workspace integration with catalog dependency versions               |
| **Build & Tooling**    | Vite Plus            | `@voidzero-dev/vite-plus-core` with Vite imagetools                  |
| **Database & ORM**     | Drizzle ORM + LibSQL | `@libsql/client` (Turso engine) for module progress persistence      |
| **Authentication**     | Better-Auth          | Google OAuth client and server session validation                    |
| **Styling & Tokens**   | Pure Vanilla CSS     | Shared design tokens from `@autonomy/style` (Nord dark palette)      |
| **Content Processing** | MDSveX & Marked      | Interactive `.svx`/`.md` components and markdown rendering           |
| **Offline & PWA**      | Service Worker       | Asset caching and offline availability via `src/service-worker.ts`   |
| **Deployment**         | Vercel               | `@sveltejs/adapter-vercel`                                           |

---

## 3. Site Structure & Routes

```
sites/student-site/
├── src/
│   ├── app.html                 # HTML shell with theme initialization
│   ├── app.d.ts                 # Global SvelteKit & Better-Auth type declarations
│   ├── env.ts                   # Type-safe dynamic environment variable schemas
│   ├── service-worker.ts        # PWA caching & offline lifecycle
│   ├── hooks.client.ts          # Client-side hooks & telemetry
│   ├── hooks.server.ts          # Server session validation & authentication hooks
│   ├── lib/
│   │   ├── auth-client.ts       # Better-Auth client instance
│   │   ├── components/          # Student-specific components (ModuleCard, ThemeToggle)
│   │   ├── constants/           # Module categories & metadata definitions
│   │   ├── server/              # Server-side database clients & auth handlers
│   │   │   ├── auth.ts          # Better-Auth configuration
│   │   │   └── db/              # Drizzle ORM schemas & client instances
│   │   ├── stores/              # Svelte 5 runes state stores (moduleStore, theme)
│   │   └── utils/               # Markdown AST and formatting utilities
│   └── routes/
│       ├── +layout.svelte       # Root shell (navigation, footer, theme state)
│       ├── +page.svelte         # Public student landing page & overview
│       ├── about/               # Framework background & pedagogical foundations
│       ├── login/               # Google OAuth authentication entry point
│       ├── logout/              # Session termination endpoint
│       ├── resources/           # Public curriculum documents & reference guides
│       │   └── (docs)/          # Step-by-step & agreement documentation layouts
│       ├── (protected)/         # Authenticated student workspace
│       │   ├── +layout.server.ts# Session guard & authorization validator
│       │   ├── dashboard/       # Student dashboard (active modules & progress overview)
│       │   ├── modules/         # Interactive curriculum module browser
│       │   │   └── [slug]/      # Interactive module practicum & section runner
│       │   ├── assignments/     # Structured practicum assignments
│       │   ├── achievements/    # Milestone badges & completion tracking
│       │   ├── homework/        # Applied daily inventory prompts
│       │   └── settings/        # User profile & theme preferences
│       └── api/
│           ├── auth/[...auth]/  # Better-Auth API route handlers
│           └── theme/           # Server-synchronized theme preference endpoints
├── drizzle/                     # Drizzle SQL migration artifacts
├── drizzle.config.ts            # Drizzle ORM configuration
├── svelte.config.js            # SvelteKit preprocessor & adapter config
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts              # Vite Plus build configuration
```

---

## 4. Key Architectural Features

### Interactive Module Runner & Progress State

- Module definitions and multi-section curricula stored in database tables (`modules`, `sections`).
- Section completion and structured student responses saved in real-time to `user_progress`.
- Svelte 5 Runes state management (`moduleStore.svelte.ts`) providing instantaneous UI updates across sections.

### Unified Design System Integration

The portal imports standardized UI blocks and components from the `@autonomy/*` workspace packages:

| Workspace Package           | Integrated Usage                                                                     |
| :-------------------------- | :----------------------------------------------------------------------------------- |
| `@autonomy/style`           | Nord-themed dark palette, fluid typography, and angled container layouts.            |
| `@autonomy/actions`         | `foresight` (link prefetching), `thickMargins`, `autoContrast`, and `contrastColor`. |
| `@autonomy/nav`             | DropNav dropdowns, responsive mobile navigation drawer, and FooterNav.               |
| `@autonomy/theme-toggle`    | Animated icon theme switcher with persistent local and profile storage.              |
| `@autonomy/scroll-to-top`   | Floating back-to-top button with reading-time duration indicators.                   |
| `@autonomy/session-warning` | Modal alert for expiring authentication tokens and re-login triggers.                |
| `@autonomy/content/*`       | Canonical interactive components for the Four Agreements and Twelve Steps.           |

---

## 5. Quick Start & Development

### Prerequisites

- **Node.js:** `>=22.12.0`
- **pnpm:** `11.22.0`

### Environment Configuration

Create a `.env` file in `sites/student-site/`:

```env
# Database Persistence (LibSQL / Turso)
DATABASE_URL=libsql://your-instance.turso.io
DATABASE_AUTH_TOKEN=your-database-auth-token

# Authentication Secrets (Better-Auth)
BETTER_AUTH_SECRET=your-random-32-character-secret
STUDENT_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
STUDENT_GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application Origin
STUDENT_ORIGIN=http://localhost:5173
ORIGIN=http://localhost:5173
```

### Execution Commands

```bash
# Start development server from workspace root
pnpm dev:student-site

# Alternatively, run directly inside sites/student-site
cd sites/student-site
vp dev

# Type check & validate Svelte components
pnpm check

# Lint & code format
pnpm lint
pnpm format

# Production build
pnpm build
```

---

## 6. Database Operations

```bash
cd sites/student-site

# Push schema changes to development database
pnpm db:push

# Generate migration scripts
pnpm db:generate

# Execute migrations against remote database
pnpm db:migrate

# Launch Drizzle Studio GUI
pnpm db:studio

# Update Better-Auth schema
pnpm auth:schema
```

---

## 7. Deployment

The application is deployed via Vercel using `@sveltejs/adapter-vercel`. Ensure all environment variables listed above are properly set in your Vercel project dashboard.
