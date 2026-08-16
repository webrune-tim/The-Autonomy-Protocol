# Teacher Site | The Autonomy Protocol

> **Authenticated Educator & Administrative Portal**  
> _SvelteKit 2 + Svelte 5 Runes application delivering curriculum management, role-based pedagogical administration, document collaboration, and PDF-to-Markdown conversion pipelines._

---

## 1. Overview & Pedagogical Purpose

The **Teacher Site** (`sites/teacher-site`) is the administrative and pedagogical operating center for educators, counselors, and CTE pathway leads implementing **The Autonomy Protocol**. It provides authorized instructors with tools to deliver lesson plans, inspect student progress, author curriculum assets, and adapt traditional educational materials into the **Approved Academic Lexicon**.

### Core Pedagogical Capabilities

- **Curriculum Navigation & Delivery:** Full access to collegiate-level syllabi for Freshman Advisory and Senior Industry Capstones (Computer Science, Healthcare, Skilled Trades).
- **Document Management & Sharing:** Collaborative authoring of lesson plans, classroom practicums, and student prompts with multi-user sharing and one-click Markdown export.
- **Legacy Ingestion Engine (`pdf-to-md`):** Automated pipeline for converting legacy educational PDFs into clean, structured Markdown ready for MDSveX integration.
- **Administrative Role Enforcement:** Strict role-based access control protecting educator-only notes, grading criteria, and administrative metrics.

---

## 2. Technology Stack

| Layer                     | Technology                   | Specification / Role                                                                |
| :------------------------ | :--------------------------- | :---------------------------------------------------------------------------------- |
| **Framework**             | Svelte 5 + SvelteKit         | Forced Runes mode, `#lib/*` subpath imports, and `@sveltejs/kit`                    |
| **Runtime & Language**    | Node.js + TypeScript         | `Node >=22.12.0`, `TypeScript ^6.0.3`                                               |
| **Package Manager**       | `pnpm@11.22.0`               | Workspace catalogs and version pinning                                              |
| **Build & Tooling**       | Vite Plus                    | `@voidzero-dev/vite-plus-core` with imagetools and staged linting                   |
| **Database & ORM**        | Drizzle ORM + LibSQL         | `@libsql/client` (Turso engine) for relational persistence and migrations           |
| **Authentication & RBAC** | Better-Auth                  | Google OAuth provider with role plugins (`superadmin`, `admin`, `teacher`, `user`)  |
| **Design System & CSS**   | Pure Vanilla CSS             | Shared tokens from `@autonomy/style` (Nord palette, angled boxes, fluid typography) |
| **Content Processing**    | MDSveX & Marked              | Interactive `.svx` components and markdown rendering                                |
| **Animation & Visuals**   | Motion + Lucide + Morphicons | Micro-interactions, matrix staggering, animated theme icons, and confetti           |
| **Deployment Target**     | Vercel                       | `@sveltejs/adapter-vercel`                                                          |

---

## 3. Site Structure & Routes

```
sites/teacher-site/
├── src/
│   ├── app.html                 # HTML shell with theme initialization
│   ├── app.d.ts                 # Global SvelteKit & Better-Auth type declarations
│   ├── env.ts                   # Type-safe dynamic environment variable schemas
│   ├── service-worker.ts        # PWA offline asset caching
│   ├── hooks.client.ts          # Client-side hooks & telemetry
│   ├── hooks.server.ts          # Session validation, cookie handling & RBAC verification
│   ├── lib/
│   │   ├── actions/             # Page animations (motion, matrixStagger)
│   │   ├── auth-client.ts       # Better-Auth client instance
│   │   ├── components/          # Educator components (TeacherCta, TeacherOnly, ThemeToggle)
│   │   ├── constants/           # Module categories & metadata definitions
│   │   ├── docs/                # Built-in curriculum Markdown documents
│   │   │   ├── freshman/        # Freshman advisory lesson plans
│   │   │   ├── senior/          # Senior CTE capstone modules
│   │   │   ├── agreements/      # The Integrity Protocol curriculum files
│   │   │   └── steps/           # The Accountability Cycle curriculum files
│   │   ├── server/              # Server-side database clients & auth configurations
│   │   │   ├── auth.ts          # Better-Auth engine & RBAC schema
│   │   │   └── db/              # Drizzle ORM schema, migrations, and seed script
│   │   └── utils/               # Markdown processing & PDF conversion utilities
│   └── routes/
│       ├── +layout.svelte       # Root shell (navigation, footer, theme state)
│       ├── +page.svelte         # Public landing page with curriculum highlights
│       ├── curriculum/          # Public curriculum directory & overview
│       ├── mission/             # Institutional mission & pedagogical abstract
│       ├── road-map/            # Project evolution & upcoming milestone schedule
│       ├── join-us/             # Educator & researcher onboarding information
│       ├── contact/             # Support & institutional inquiries
│       ├── donate/              # Institutional sponsorship & contribution page
│       │   └── thank-you/       # Post-contribution confirmation
│       ├── style/               # Design token showcase & typography guide
│       ├── test/                # Component testing & visual validation harness
│       ├── login/               # Google OAuth authentication entry point
│       ├── logout/              # Session termination endpoint
│       ├── resources/           # Educator resources and downloadable guides
│       │   └── (docs)/          # Step-by-step & agreement documentation layouts
│       ├── (protected)/         # Authenticated educator workspace
│       │   ├── +layout.server.ts# Session guard & role-based route protection
│       │   ├── dashboard/       # Document manager, sharing center, and quick actions
│       │   ├── modules/         # Module management and section inspector
│       │   │   └── [id]/        # Module editing & detail view
│       │   ├── pdf-to-md/       # PDF parsing & Markdown generation pipeline
│       │   └── settings/        # Educator profile & theme preferences
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

## 4. Authentication & Role-Based Permissions

Authentication is powered by **Better-Auth** with Google OAuth and the Drizzle ORM adapter.

### Role Hierarchy & Permissions

| Role         | Access Scope                                                                                      |
| :----------- | :------------------------------------------------------------------------------------------------ |
| `superadmin` | Global administrative control, full user management, schema migration execution.                  |
| `admin`      | Curriculum publication, document management across all educators, analytics access.               |
| `teacher`    | Protected educator routes, document authoring/sharing, PDF ingestion pipeline, module inspection. |
| `user`       | Standard authenticated access with restricted administrative capabilities.                        |

Session states are validated server-side in `src/hooks.server.ts` and `src/routes/(protected)/+layout.server.ts`.

---

## 5. Quick Start & Development

### Prerequisites

- **Node.js:** `>=22.12.0`
- **pnpm:** `11.22.0`
- **LibSQL / Turso Database** (or local SQLite file)
- **Google Cloud Console OAuth 2.0 Client Credentials**

### Environment Configuration

Create a `.env` file in `sites/teacher-site/`:

```env
# LibSQL / Turso Database Credentials
DATABASE_URL=libsql://your-instance.turso.io
DATABASE_AUTH_TOKEN=your-database-auth-token

# Better-Auth Authentication Secret
BETTER_AUTH_SECRET=your-random-32-character-secret

# Google OAuth Provider Credentials
TEACHER_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
TEACHER_GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application Origin URL
TEACHER_ORIGIN=http://localhost:5173
ORIGIN=http://localhost:5173
```

### Execution Commands

```bash
# Start development server from workspace root
pnpm dev:teacher-site

# Alternatively, run directly inside sites/teacher-site
cd sites/teacher-site
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

## 6. Database Operations & Seeding

The application uses Drizzle ORM with LibSQL. The schema models modules, sections, student progress, documents, document shares, and conversion tasks.

```bash
cd sites/teacher-site

# Push schema directly to the database (development mode)
pnpm db:push

# Generate SQL migration files from schema changes
pnpm db:generate

# Execute pending database migrations
pnpm db:migrate

# Seed database with initial curriculum modules and demo accounts
pnpm db:seed

# Complete DB setup pipeline (migrate + seed)
pnpm db:setup

# Launch interactive Drizzle Studio database browser
pnpm db:studio

# Generate Better-Auth database schema
pnpm auth:schema
```

---

## 7. Document Pipeline (`pdf-to-md`)

The `(protected)/pdf-to-md` route allows educators to upload traditional PDF syllabus materials and transform them into structured Markdown:

1. PDF is uploaded via multipart form data.
2. The server processes text streams, extracts section headers, and sanitizes character encoding.
3. Content is converted into standard Markdown compatible with the `LESSON_PLAN_TEMPLATE.md` structure.
4. The generated document is saved to the `document` table and made immediately editable in the Teacher Dashboard.

---

## 8. Deployment

The teacher site deploys automatically to **Vercel** via `@sveltejs/adapter-vercel`.

- Configure the project root to `sites/teacher-site` (or root with workspace build filters).
- Map all environment variables (`DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ORIGIN`) in the Vercel project settings.
