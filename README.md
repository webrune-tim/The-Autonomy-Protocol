# The Autonomy Protocol | v0.2.0

> **A Collegiate-Level Framework for Internal Self-Governance, Executive Functioning, and Psychological Literacy**  
> _Architected as a high-performance, modular SvelteKit monorepo powered by Svelte 5 Runes, Turborepo, Vite Plus, Drizzle ORM, and Better-Auth._

---

## 1. Executive Summary & Pedagogical Mission

**The Autonomy Protocol** is a non-secular, politically neutral educational curriculum engineered to transition high school students from external behavioral policing to internal self-governance. Targeted for implementation across public school **Career Technical Education (CTE)** pathways and **Advisory periods**, the protocol translates established behavioral dynamics into practical executive functioning and psychological literacy tools.

### Approved Academic Lexicon Standard

To maintain academic rigor, secular neutrality, and professional applicability in public school systems, traditional recovery and self-help concepts have been refactored into a standardized collegiate lexicon:

| Traditional / Legacy Concept        | Approved Academic Translation                                | Operational Definition                                                                              |
| :---------------------------------- | :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| **Spirituality / Higher Power**     | **Universal Principles / Objective Standard**                | Sourcing an external, objective behavioral baseline beyond individual ego or short-term impulses.   |
| **Sin / Character Defect**          | **Cognitive Distortion / Behavioral Liability**              | Identifying maladaptive behavioral patterns and cognitive biases that compromise personal efficacy. |
| **Apology / Forgiveness**           | **Amends Protocol / Restorative Action**                     | Concrete, action-based restitution to repair interpersonal trust and eliminate relational friction. |
| **Social Justice / Morality**       | **Social Friction / Conflict Resolution / Ethical Baseline** | Pragmatic conflict mediation and systemic adherence to mutual integrity without partisan bias.      |
| **Social-Emotional Learning (SEL)** | **Executive Functioning / Psychological Literacy**           | Systematic metacognitive training, emotional self-regulation, and professional resilience.          |

---

## 2. Core Pedagogical Frameworks

The curriculum is built upon two complementary pedagogical architectures that guide students through individual regulation and interpersonal dynamics:

### A. The Accountability Cycle (Internal Regulation)

_Refactored from the 12-Step Architecture into four sequential operational blocks:_

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           THE ACCOUNTABILITY CYCLE                               │
├───────────────────┬───────────────────┬───────────────────┬──────────────────────┤
│ 1. ORIENTATION    │ 2. INTERNAL AUDIT │ 3. RESTORATIVE    │ 4. MAINTENANCE &     │
│    (Steps 1–3)    │    (Steps 4–7)    │    PRACTICE       │    LEADERSHIP        │
│                   │                   │    (Steps 8–9)    │    (Steps 10–12)     │
├───────────────────┼───────────────────┼───────────────────┼──────────────────────┤
│ • Limits of       │ • Objective self- │ • Mapping impact  │ • Daily cognitive    │
│   control check   │   inventory       │   on peers/system │   inventory          │
│ • Sourcing an     │ • Identifying     │ • Action-based    │ • Real-time conflict │
│   objective norm  │   liabilities     │   Amends Protocol │   de-escalation      │
│ • Commitment to   │ • Behavioral      │ • Restoring trust │ • Peer mentorship    │
│   active alignment│   intervention    │   mechanics       │   and stewardship    │
└───────────────────┴───────────────────┴───────────────────┴──────────────────────┘
```

### B. The Integrity Protocol (Interpersonal Dynamics)

_Refactored from the Four Agreements into four baseline interaction standards:_

1. **Precision of Speech:** Operating with absolute clarity, reliability, and alignment between verbal commitments and concrete execution.
2. **Emotional Neutrality:** Decoupling personal identity from external actions, peer critiques, and environmental friction.
3. **Inquiry-Based Reality:** Validating empirical facts and asking clarifying questions before formulating behavioral assumptions.
4. **Baseline Fluctuation:** Continuously optimizing effort and output relative to dynamic capacity while maintaining core standards.

---

## 3. Technology Stack

The monorepo leverages modern web standards, fine-grained reactivity, and modular package isolation:

| Layer                     | Technology                   | Specification / Configuration                                                                        |
| :------------------------ | :--------------------------- | :--------------------------------------------------------------------------------------------------- |
| **Runtime & Language**    | Node.js + TypeScript         | `Node >=22.12.0`, `TypeScript ^6.0.3` with strict type checking                                      |
| **Package Manager**       | `pnpm@11.22.0`               | Workspace catalogs, strict peer dependency management, and architecture filtering                    |
| **Monorepo Engine**       | Turborepo + Vite Plus        | `turbo ^2.9.18` task pipelines with `@voidzero-dev/vite-plus-core` wrapper                           |
| **Frontend Framework**    | Svelte 5 + SvelteKit         | Forced Svelte 5 Runes mode, `#lib/*` subpath imports, and `@sveltejs/kit`                            |
| **Design System & CSS**   | Pure Vanilla CSS Tokens      | `@autonomy/style` (Nord color palette, fluid clamp typography, view-timeline animations)             |
| **Database & ORM**        | Drizzle ORM + LibSQL         | `drizzle-orm ^0.45.2`, `drizzle-kit ^0.31.10`, and `@libsql/client` (Turso SQLite engine)            |
| **Authentication & RBAC** | Better-Auth                  | `better-auth ~1.4.22` with Google OAuth provider and RBAC (`superadmin`, `admin`, `teacher`, `user`) |
| **Content & Parsing**     | MDSveX & Marked              | Interactive `.svx`/`.md` components and markdown AST processing                                      |
| **Motion & Iconography**  | Motion + Lucide + Morphicons | `@lucide/svelte`, `lucide`, `morphicons`, `canvas-confetti`, and `motion`                            |
| **Deployment Target**     | Vercel                       | `@sveltejs/adapter-vercel` with automated environment pipeline                                       |

---

## 4. Monorepo Architecture & Directory Structure

```
the-autonomy-protocol/
├── sites/
│   ├── student-site/          # Public & authenticated student portal (curriculum & progress)
│   └── teacher-site/          # Authenticated educator portal (curriculum, DB, auth, PDF parser)
├── packages/
│   ├── blocks/                # High-level compound UI blocks
│   │   ├── banner/            # Contextual notification & broadcast banners
│   │   ├── external_links/    # Categorized external resource links & foresight actions
│   │   ├── footer/            # Canonical application footer
│   │   ├── header/            # Application header layout block
│   │   ├── hero/              # High-contrast hero section with CTA slots
│   │   ├── nav/               # DropNav, Drawer Nav, FooterNav & portal switcher
│   │   └── revealing_image/   # Scroll-driven CSS reveal animation image container
│   ├── ui/                    # Atomic interface components & widgets
│   │   ├── battery-level/     # Energy / capacity indicator widget
│   │   ├── horizontal-scroll/ # Touch & pointer horizontal layout container
│   │   ├── logo/              # Vector insignia and brand marks
│   │   ├── pill/              # Metadata status badges and category tags
│   │   ├── reading-time/      # Dynamic word-count & reading duration estimator
│   │   ├── scroll-to-top/     # Floating back-to-top trigger with time-read indicator
│   │   ├── session-warning/   # Client session expiration & re-authentication modal
│   │   └── theme-toggle/      # Nord palette & dark/light theme state manager
│   ├── core/                  # Shared foundations, actions, styles, and utilities
│   │   ├── actions/           # Svelte actions (thickMargins, contrastColor, autoContrast, foresight)
│   │   ├── style/             # Global vanilla CSS (tokens, typography, Nord palette, reset, functions)
│   │   └── utils/             # WCAG contrast computation & text calculation utilities
│   └── content/               # Framework pedagogical interactive components
│       ├── four-agreements/   # The Integrity Protocol interactive module components
│       └── twelve-steps/      # The Accountability Cycle interactive module components
├── docs/                      # Curriculum documentation, mission statements, and templates
│   ├── curriculum/            # Pedagogical guides and inquiry documentation
│   └── templates/             # LESSON_PLAN_TEMPLATE.md & EXAMPLE-ASSIGNMENT.md
├── pnpm-workspace.yaml        # Workspace catalog definitions & dependency rules
├── turbo.json                 # Turbo pipeline tasks (build, check, test, lint, dev)
├── vite.config.ts             # Root Vite Plus configuration
└── package.json               # Root scripts, devDependencies, and package manager config
```

### Workspace Packages Summary

| Package Name                | Location                           | Description                                                                                     |
| :-------------------------- | :--------------------------------- | :---------------------------------------------------------------------------------------------- |
| `@autonomy/style`           | `packages/core/style`              | Design token system, Nord theme variables, responsive typography, and layout classes.           |
| `@autonomy/actions`         | `packages/core/actions`            | Reusable Svelte actions: `thickMargins`, `autoContrast`, `contrastColor`, and `foresight`.      |
| `@autonomy/utils`           | `packages/core/utils`              | Pure TypeScript mathematical and color contrast utilities.                                      |
| `@autonomy/theme-toggle`    | `packages/ui/theme-toggle`         | Svelte 5 runes-based theme manager with persistent state and animated icon toggle.              |
| `@autonomy/nav`             | `packages/blocks/nav`              | Complete responsive navigation suite with desktop DropNav, mobile drawer, and portal switching. |
| `@autonomy/hero`            | `packages/blocks/hero`             | Angled container hero section supporting dark-mode contrast and high-priority CTAs.             |
| `@autonomy/banner`          | `packages/blocks/banner`           | Global and contextual alert banners with dismissal tracking.                                    |
| `@autonomy/footer`          | `packages/blocks/footer`           | Unified footer with dynamic copyright, quick links, and theme toggle anchors.                   |
| `@autonomy/four-agreements` | `packages/content/four-agreements` | Interactive instructional components for The Integrity Protocol.                                |
| `@autonomy/twelve-steps`    | `packages/content/twelve-steps`    | Interactive instructional components for The Accountability Cycle.                              |

---

## 5. Quick Start & Developer Guide

### Prerequisites

- **Node.js:** `>=22.12.0`
- **pnpm:** `11.22.0` (Enforced via `packageManager` and Corepack)

```bash
# Enable corepack (if not already active)
corepack enable

# Install all workspace dependencies
pnpm install
```

### Development Servers

Launch individual applications or entire pipelines:

```bash
# Start Student Portal (http://localhost:5173 by default)
pnpm dev:student-site

# Start Teacher Portal (requires local .env configuration)
pnpm dev:teacher-site

# Alternatively, run via Vite Plus inside a specific workspace directory
cd sites/teacher-site && vp dev
```

### Build & Verification Pipelines

Run workspace-wide pipeline tasks via Turborepo:

```bash
# Full validation: type checking, testing, and production builds
pnpm ready

# Production build across all packages and sites
pnpm build

# Automated linting and formatting
pnpm --filter teacher-site lint
pnpm --filter teacher-site format
```

---

## 6. Environment Variables & Database Operations

### Environment Configuration

For local development in `sites/teacher-site/` (and authenticated student workflows in `sites/student-site/`), configure a `.env` file:

```env
# LibSQL / Turso Database Credentials
DATABASE_URL=libsql://your-instance.turso.io
DATABASE_AUTH_TOKEN=your-database-auth-token

# Better-Auth Authentication Secret
BETTER_AUTH_SECRET=your-random-32-character-secret

# Google OAuth Provider Credentials
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Application Origin URL
ORIGIN=http://localhost:5173
```

### Drizzle ORM Workflows

The schema includes modules, sections, student progress, document management, and Better-Auth identity tables.

```bash
cd sites/teacher-site

# Push schema directly to the database (development)
pnpm db:push

# Generate SQL migration files
pnpm db:generate

# Execute pending database migrations
pnpm db:migrate

# Seed database with initial curriculum modules and demo users
pnpm db:seed

# Complete DB setup (migrate + seed)
pnpm db:setup

# Launch interactive Drizzle Studio database browser
pnpm db:studio

# Regenerate Better-Auth schema definitions
pnpm auth:schema
```

---

## 7. Curriculum Authoring & Content Contribution

All curriculum modules must adhere to the **Internal Self-Governance** pedagogical standards and the **Approved Academic Lexicon**.

### Contributing New Modules

1. **Utilize the Canonical Template:** Copy [`docs/templates/LESSON_PLAN_TEMPLATE.md`](docs/templates/LESSON_PLAN_TEMPLATE.md) for all new module drafts.
2. **Define Observable Behavioral Outcomes:** Frame lessons around concrete behavioral shifts rather than subjective emotional states.
3. **Draft the Practicum:** Provide high-school-ready applied learning exercises, conflict resolution scenarios, or system debugging logs.
4. **Implement UI Components:** Connect module content to reusable components in `packages/content/`.
5. **Adhere to Contribution Guidelines:** Refer to [`CONTRIBUTING.md`](./CONTRIBUTING.md) for pull request requirements and the community code of conduct.

---

## 8. Deployment & CI/CD

Both `student-site` and `teacher-site` are configured for automatic deployment via **Vercel** using `@sveltejs/adapter-vercel`.

- Configure workspace root settings with Turborepo caching enabled.
- Ensure all environment variables (`DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ORIGIN`) are mapped in the Vercel dashboard.

---

## 9. License

This project is licensed under the terms described in [LICENSE.md](./LICENSE.md).
