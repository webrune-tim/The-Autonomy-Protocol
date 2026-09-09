# Contributing to The Autonomy Protocol

> **A Collaborative Invitation for Educators, Academic Researchers, College Students, and Software Engineers**  
> _Architecting the open-source infrastructure for internal self-governance, executive functioning, and psychological literacy in modern education._

---

## 🏛️ Executive Welcome & Vision

**The Autonomy Protocol** is a collegiate-level, secular, and politically neutral pedagogical framework designed to transition secondary and post-secondary students from external behavioral policing to **internal self-governance**.

Engineered for implementation within **Career Technical Education (CTE)** pathways, **Freshman/Senior Advisory periods**, and **higher education leadership programs**, this monorepo unites two essential disciplines:

1. **Academic Pedagogy & Curriculum Design:** Formulating rigorous, evidence-based instructional modules, applied practicums, and developmental assessments.
2. **Modern Systems Engineering:** Building high-performance, modular web applications and interactive instructional software using **Svelte 5 Runes**, **TypeScript**, **Turborepo**, **Drizzle ORM**, **LibSQL/Turso**, and **Better-Auth**.

Whether you are a veteran classroom educator, a university student studying education or cognitive science, or a software engineer passionate about modern reactive web architecture, your contribution builds the operational infrastructure for self-governed learning.

---

## 🧭 Dual-Track Contribution Pathways

Select your contribution track below to view specialized onboarding guides, domain standards, and project opportunities:

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                               THE AUTONOMY PROTOCOL MONOREPO                             │
├─────────────────────────────────────────────┬────────────────────────────────────────────┤
│ 📚 TRACK 1: PEDAGOGY & CURRICULUM           │ 💻 TRACK 2: SOFTWARE ENGINEERING           │
├─────────────────────────────────────────────┼────────────────────────────────────────────┤
│ • Classroom Teachers & CTE Instructors      │ • Svelte 5 / SvelteKit Frontend Engineers  │
│ • Higher Ed Researchers & Graduate Students │ • TypeScript & Systems Programmers         │
│ • Undergraduate Curriculum Fellows          │ • Database & Backend Architects (Drizzle)  │
│ • Academic Administrators & Counselors      │ • UI/UX & Vanilla CSS Design Specialists   │
├─────────────────────────────────────────────┼────────────────────────────────────────────┤
│ Focus: Lesson plans, practicums, rubrics,   │ Focus: Monorepo apps, shared UI packages,  │
│ capstone pathways, student/staff materials. │ reactive runes, auth/RBAC, DB migrations.  │
└─────────────────────────────────────────────┴────────────────────────────────────────────┘
```

---

## 📚 Track 1: Curriculum Designers, Educators & College Researchers

We actively recruit secondary educators, collegiate researchers, curriculum fellows, and university students in education, psychology, cognitive science, and public policy to co-author and refine our open pedagogical assets.

### 1. Priority Contribution Domains

| Domain                             | Target Artifacts                                                                                                                           | Primary Workspace Target                   |
| :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| **Advisory & Core Modules**        | 50-minute structured lessons for 9th–12th grade advisory, homerooms, and leadership cohorts.                                               | `docs/curriculum/`, `packages/content/`    |
| **Industry Capstone Pathways**     | Vocational applied modules tailoring the protocol to specific fields (Computer Science, Healthcare, Engineering & Trades, Law & Business). | `docs/curriculum/pathways/`                |
| **Educator & Staff Guides**        | Facilitator onboarding guides, classroom de-escalation strategies, conflict mediation frameworks, and fidelity rubrics.                    | `docs/class-files/`, `sites/teacher-site/` |
| **Student Workbooks & Practicums** | Applied interactive worksheets, real-time cognitive debugging logs, peer-mentorship protocols, and case studies.                           | `sites/student-site/`, `docs/templates/`   |
| **Empirical Research & Efficacy**  | Assessment rubrics, observable behavioral data instruments, IRB-ready evaluation frameworks, and superintendent executive summaries.       | `docs/research/`                           |

---

### 2. Pedagogical Standards & Theoretical Foundations

All curriculum submissions must anchor directly in our two foundational pedagogical architectures:

#### A. The Accountability Cycle (Internal Self-Regulation)

_Refactored from the 12-Step Architecture into four sequential operational phases:_

1. **Orientation (Phases 1–3):** Acknowledging limits of control, sourcing an objective standard, and committing to cognitive alignment.
2. **The Internal Audit (Phases 4–7):** Objective self-assessment, behavioral liability identification, and proactive intervention.
3. **Restorative Practice (Phases 8–9):** Mapping interpersonal impact and executing concrete, action-based restitution (The Amends Protocol).
4. **Maintenance & Leadership (Phases 10–12):** Daily cognitive inventory, real-time conflict de-escalation, and peer mentorship.

#### B. The Integrity Protocol (Interpersonal Dynamics)

_Refactored from the Four Agreements into four baseline interaction standards:_

1. **Precision of Speech:** Absolute clarity, accountability, and congruency between commitments and execution.
2. **Emotional Neutrality:** Decoupling personal identity from external critique, peer friction, and environmental noise.
3. **Inquiry-Based Reality:** Validating empirical facts through clarifying questions before assuming intent.
4. **Baseline Fluctuation:** Continuously calibrating effort and execution relative to dynamic daily capacity.

---

### 3. Mandatory Lexicon Standard

To guarantee secular neutrality, academic rigor, and seamless adoption across public school CTE pathways and district boards, all content must adhere to the standardized academic translations:

| ❌ Prohibited / Legacy Concept    | ✅ Approved Academic Translation                             | Operational Curriculum Definition                                                                   |
| :-------------------------------- | :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| _Spirituality / Higher Power_     | **Universal Principles / Objective Standard**                | Sourcing an external, objective behavioral baseline beyond individual ego or short-term impulses.   |
| _Sin / Character Defect_          | **Cognitive Distortion / Behavioral Liability**              | Identifying maladaptive behavioral patterns and cognitive biases that compromise personal efficacy. |
| _Apology / Forgiveness_           | **Amends Protocol / Restorative Action**                     | Concrete, action-based restitution to repair interpersonal trust and eliminate relational friction. |
| _Social Justice / Morality_       | **Social Friction / Conflict Resolution / Ethical Baseline** | Pragmatic conflict mediation and systemic adherence to mutual integrity without partisan bias.      |
| _Social-Emotional Learning (SEL)_ | **Executive Functioning / Psychological Literacy**           | Systematic metacognitive training, emotional self-regulation, and professional resilience.          |

> [!IMPORTANT]
> **Behavioral Observation Rule:** Modules must never grade or evaluate subjective internal emotional states. Every rubric, prompt, and assessment must evaluate **observable behavioral shifts** (e.g., phrasing precision, reduction in defensive deflection, execution of restitution checklists).

---

### 4. Curriculum Authoring Workflow

1. **Review the Canonical Template:** Inspect [`docs/templates/LESSON_PLAN_TEMPLATE.md`](docs/templates/LESSON_PLAN_TEMPLATE.md) and [`docs/templates/EXAMPLE-ASSIGNMENT.md`](docs/templates/EXAMPLE-ASSIGNMENT.md).
2. **Structure the Module:** Every unit must include:
   - **Executive Summary:** Clear developmental justification (2–3 sentences).
   - **Target Behavioral Shift:** Contrasting _Current State_ vs. _Desired State_.
   - **Pedagogical Logic:** Cognitive-behavioral rationale and executive functioning benefits.
   - **Facilitation Guide:** Opening hook (5–10 min), Core concept delivery (15–20 min), and Lab/Practicum exercise (20 min).
   - **Operational Assessment:** Concrete primary and secondary indicators for educators.
3. **Submit via Git or GitHub:** Markdown (`.md`) or MDSveX (`.svx`) files can be submitted directly via Pull Request or drafted collaboratively in GitHub Discussions / Issues.

---

## 💻 Track 2: Software Engineers & Platform Architects

Our web platform is an enterprise-grade, high-performance monorepo delivering tailored portals for students and educators alongside modular Svelte component libraries.

```
the-autonomy-protocol/
├── sites/
│   ├── student-site/          # Public & student portal (interactive curriculum, progress tracking)
│   └── teacher-site/          # Educator portal (cohort management, auth, Drizzle DB, PDF tools)
├── packages/
│   ├── blocks/                # Compound UI blocks (nav, hero, banner, header, footer, revealing images)
│   ├── ui/                    # Atomic UI widgets (battery gauge, theme toggle, pill badges, scroll-to-top)
│   ├── core/                  # Shared foundations (actions, Nord design tokens, contrast utilities)
│   └── content/               # Pedagogical interactive modules (four-agreements, twelve-steps)
└── docs/                      # Curriculum assets, templates, and specifications
```

### 1. Technology Stack Overview

- **Framework:** [Svelte 5](https://svelte.dev/) with strict Runes mode (`$state`, `$derived`, `$props`, `$effect`) and [SvelteKit 2](https://kit.svelte.dev/).
- **Language & Runtime:** [TypeScript](https://www.typescriptlang.org/) `^6.0.3` (strict mode) on [Node.js](https://nodejs.org/) `>=22.12.0`.
- **Unified Toolchain & Package Management:** [Vite+](https://viteplus.dev/) (`vp` CLI combining Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task) with [pnpm](https://pnpm.io/) `11.22.0` catalogs and [Turborepo](https://turbo.build/) `^2.9.18`.
- **Styling System:** Pure **Vanilla CSS Design Tokens** (`@autonomy/style`) with the Nord color palette, fluid clamp typography, container queries, and view-timeline animations. _No TailwindCSS._
- **Data & ORM:** [Drizzle ORM](https://orm.drizzle.team/) + [LibSQL / Turso](https://turso.tech/) (distributed SQLite).
- **Authentication & RBAC:** [Better-Auth](https://www.better-auth.com/) with Google OAuth and multi-tiered roles (`superadmin`, `admin`, `teacher`, `user`).
- **Interactive Content:** [MDSveX](https://mdsvex.pngwn.io/) and [Marked](https://marked.js.org/) for Markdown AST manipulation.
- **Motion & Icons:** [Motion](https://motion.dev/), [Lucide Svelte](https://lucide.dev/), and [Morphicons](https://morphicons.com/).

---

### 2. Engineering Opportunities & Roadmap

We welcome issues and pull requests across the following engineering areas:

#### A. Applications (`sites/`)

- **Student Portal (`sites/student-site`):** Interactive module checklists, reflection journals, client-side progress persistence, streak tracking, and offline PWA capabilities.
- **Teacher Portal (`sites/teacher-site`):** Classroom and cohort administration, automated PDF syllabus generators, assignment rubric evaluations, student progress analytics, and multi-tenant school settings.

#### B. Component Architecture (`packages/`)

- **`packages/blocks`:** Expand accessible navigation patterns, contextual announcement systems, responsive hero layouts, and animated layout blocks.
- **`packages/ui`:** Build atomic widgets (e.g., energy/capacity gauges, micro-interaction buttons, status indicators, modal dialogs with native `<dialog>` and Popover API).
- **`packages/core`:** Expand Svelte actions (viewport observers, auto-contrast calculators, fluid typography helpers) and mathematical utility libraries.
- **`packages/content`:** Construct dynamic, interactive pedagogical exercises for the 12 Steps and 4 Agreements using Svelte 5 Runes.

#### C. Backend, Database & Security

- Drizzle schema enhancements, migration workflows, relational query optimization, seed generation scripts, and Better-Auth permission middleware.

---

### 3. Local Development Setup

#### Prerequisites

- **Node.js:** `>=22.12.0` (Managed automatically by Vite+ or system runtime)
- **Vite+ (`vp` CLI):** The unified toolchain for the web behind the `vp` CLI — combining Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task, plus runtime and package-manager management.

##### Install the `vp` CLI

Install `vp` if it is not already on your system:

- **macOS / Linux:**
  ```bash
  curl -fsSL https://vite.plus | bash
  ```
- **Windows (PowerShell):**
  ```powershell
  irm https://vite.plus/ps1 | iex
  ```

Then open a new terminal and verify:

```bash
vp help
```

> [!TIP]
> **Vite+ Day-to-Day Commands:**
>
> - `vp install` — Install workspace dependencies.
> - `vp dev` — Start the dev server in the current workspace package.
> - `vp check` — Run formatting, linting, and type-checking together.
> - `vp test` — Run JavaScript/TypeScript tests with Vitest.
> - `vp build` — Build production artifacts.
> - `vpr <script>` / `vp run <script>` — Run custom `package.json` scripts across workspaces.

#### Project Setup & Dependency Installation

```bash
# 1. Clone the repository
git clone https://github.com/webrune-tim/the-autonomy-protocol.git
cd the-autonomy-protocol

# 2. Install all monorepo dependencies
vp install
```

#### Running Development Servers

```bash
# Start the Student Portal (http://localhost:5173)
vpr dev:student-site

# Start the Teacher Portal (http://localhost:5174)
vpr dev:teacher-site

# Or launch specific sites using Vite+ directly from their package directory:
cd sites/teacher-site && vp dev
```

#### Database Setup & Offline Development Standard

The Autonomy Protocol supports **zero-credential offline local development**. External contributors do **not** need access to a live Turso database or cloud credentials.

##### 1. Offline Database Fallback (SQLite via LibSQL)

Both `sites/teacher-site` and `sites/student-site` configure LibSQL to fall back to a local SQLite database file (`file:local.db`) when run locally:

```bash
# Copy non-sensitive environment templates
cp sites/teacher-site/.env.example sites/teacher-site/.env
cp sites/student-site/.env.example sites/student-site/.env
```

The preconfigured non-sensitive defaults in `.env.example`:

```env
DATABASE_URL=file:local.db
DATABASE_AUTH_TOKEN=""
BETTER_AUTH_SECRET="dev_secret_at_least_32_characters_long_for_local_development"
```

##### 2. Execute Local Migrations and Seeding

With `file:local.db`, you can push schemas and seed sample records locally without credentials:

```bash
cd sites/teacher-site

# Push schema to local SQLite database
vpr db:push

# Or run the full migration + seed pipeline
vpr db:setup

# Inspect local database via Drizzle Studio GUI
vpr db:studio
```

> [!NOTE]
> **Optional Remote Database:** Connecting to a live Turso instance (`libsql://...`) is strictly optional for local development. External contributors are never expected to have or manage live Turso credentials.

---

### 4. Code Standards & Architecture Guidelines

To maintain collegiate-level software craftsmanship:

1. **Svelte 5 Runes:** Utilize `$state`, `$derived`, `$props`, and `$effect`. Avoid legacy Svelte 3/4 reactive declarations (`$:`) and `export let` props.
2. **Strict TypeScript:** No `any` types. Provide explicit types for all component props, server loaders, actions, and API payloads.
3. **Subpath Imports:** Use `#lib/*` internal imports within applications for clean module resolution.
4. **Vanilla CSS & Nord Theme:** Leverage CSS custom properties defined in `@autonomy/style`. All UI components must support dark and light modes with WCAG AAA contrast ratios.
5. **Validation Pipeline:** Always verify your changes before submitting:

```bash
# Run format, lint, and type-checks together with Vite+
vp check

# Run type checks, linters, and full production build across the entire monorepo
vpr ready

# Run linting and formatting on individual packages
vpr --filter teacher-site lint
vpr --filter teacher-site format
```

---

## 🤝 Universal Contribution Workflow

Whether contributing curriculum or code, follow this standardized progression:

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ 1. INQUIRY /    │ ───> │ 2. DRAFT &      │ ───> │ 3. VALIDATION   │ ───> │ 4. PEER REVIEW  │
│    ISSUE CLAIM  │      │    EXECUTION    │      │    PIPELINES    │      │    & MERGE      │
└─────────────────┘      └─────────────────┘      └─────────────────┘      └─────────────────┘
```

### Step 1: Claim or Open an Issue

- Browse active tasks on the [Project Kanban Board](https://github.com/users/webrune-tim/projects/1/views/1) or [GitHub Issues](https://github.com/webrune-tim/the-autonomy-protocol/issues).
- Before undertaking major architectural refactors or creating new vocational tracks, open an Issue labeled `rfc` or `curriculum-proposal` to coordinate with core maintainers.

### Step 2: Branching Strategy

- Branch from `main` using descriptive prefixes:
  - `feat/curriculum-healthcare-capstone`
  - `feat/student-progress-runes`
  - `fix/wcag-contrast-banner`
  - `docs/educator-onboarding-guide`

### Step 3: Pull Request Submission

- Open a Pull Request referencing the related Issue (e.g., `Resolves #42`).
- Complete the PR checklist:
  - [ ] Pedagogical submissions adhere to the **Approved Academic Lexicon** and **Observable Outcomes**.
  - [ ] Code submissions pass `vp check` and `vpr ready` (TypeScript checks, ESLint, builds).
  - [ ] Components are responsive and dark-theme optimized.

### Step 4: Automated GitHub PR Preview Process

Every Pull Request submitted from a fork integrates with our automated CI/CD and preview deployment workflow:

- **Automated Fork PR Previews:** Vercel automatically generates an isolated preview deployment for incoming Pull Requests from forked repositories once authorized by a repository maintainer.
- **Environment Secret Isolation:** Upstream production and staging secrets (e.g., Turso auth tokens, Google OAuth client secrets) are **never** exposed to fork builds or preview runtimes.
- **Personal Vercel Hobby Accounts (Optional):** External contributors can optionally deploy and test their personal forks using their own free Vercel Hobby accounts without requiring access to organizational teams or production secrets.

---

## 🔒 Deployment & Access Policy

To safeguard production systems while maintaining an open, friction-free contributor experience, The Autonomy Protocol enforces the following security and deployment boundaries:

| Policy Area                     | Standard                       | Operational Implementation                                                                                                          |
| :------------------------------ | :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **Zero External Vercel Access** | No Dashboard Access Required   | External open-source contributors do not need access to the Vercel dashboard, team membership, or production secrets.               |
| **Fork PR Deployments**         | Authorized Isolated Previews   | Vercel automatically creates isolated preview deployments for incoming PRs from forks once authorized by a maintainer.              |
| **Secret Isolation**            | Upstream Credentials Protected | Upstream production and staging secrets (Turso auth tokens, Google OAuth secrets) are never exposed to fork builds.                 |
| **Local Development Standard**  | Zero-Credential Offline SQLite | All local dev and testing runs offline via LibSQL using `DATABASE_URL=file:local.db` with non-sensitive defaults in `.env.example`. |

### Maintainer Configuration: Vercel Fork Protection

Repository maintainers must enforce fork authorization on both projects to safeguard build compute and prevent unauthorized execution:

1. In the [Vercel Dashboard](https://vercel.com/), select the target project:
   - **Teacher Site:** `the-autonomy-protocol` (`sites/teacher-site`)
   - **Student Site:** `the-autonomy-protocol-student` (`sites/student-site`)
2. Navigate to **Project Settings** → **Git**.
3. Under **Fork Protection** / **Deploy Hooks**:
   - Enable **Require Authorization for Fork Deployments** (or _Only build Pull Requests from forked repositories with authorization_).
4. Save the configuration. This ensures every PR from a fork requires maintainer sign-off before preview build compute is consumed.

---

## 🛡️ Community Code of Conduct: The Operational Integrity Standard

As contributors to an educational system dedicated to self-governance, we actively practice the behavioral principles we teach. All participants agree to uphold **The Integrity Protocol**:

1. **Precision of Speech (Impeccable Communication):**
   - Communicate technical issues, pedagogical reviews, and critiques with clarity, objectivity, and honesty.
   - Fulfill commitments or communicate early when capacity fluctuates.

2. **Emotional Neutrality (Objective Review):**
   - Code reviews and editorial feedback are systems-level optimizations, not personal evaluations.
   - De-escalate friction by focusing on observable metrics, code performance, and pedagogical efficacy.

3. **Inquiry-Based Reality (Empirical Clarification):**
   - Refrain from assuming intent in asynchronous discussions.
   - Ask clarifying questions before drawing conclusions on technical decisions or curriculum designs.

4. **Baseline Fluctuation (Calibrated Excellence):**
   - Strive for highest quality contributions relative to current capacity while honoring the foundational standards of the protocol.

---

## 📬 Recognition & Community Support

- **Academic Recognition:** Active educator and student contributors are formally acknowledged in curriculum publications, white papers, and institutional dissemination reports.
- **Developer Attribution:** Open-source contributors are listed in release notes and application credits.
- **Questions & Collaboration:** Join discussions via [GitHub Discussions](https://github.com/webrune-tim/the-autonomy-protocol/discussions) or open an inquiry issue.

---

_Thank you for contributing your pedagogical wisdom and engineering talent to building the foundation for human self-governance._
