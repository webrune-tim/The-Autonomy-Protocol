# Developer TODO: Teacher Site Operating Center

> **Status:** Alpha Development / Pre-Release  
> **Last Updated:** August 2026

This document tracks pending architectural features, database workflows, and pedagogical tools for the **Teacher Site** (`sites/teacher-site`).

---

## 🎯 Phase 1: Authentication & Role Enforcement

- [ ] **District Domain Whitelisting:** Implement automatic role assignment (`teacher` / `admin`) for verified school district email domains (e.g. `@*.k12.ca.us`, `@district.edu`).
- [ ] **Better-Auth Session Hardening:** Enforce strict session timeout and multi-factor authentication (MFA) requirements for administrative accounts.
- [ ] **Teacher Onboarding Route:** Create verification intake workflow for independent instructors and charter educators.

---

## 📚 Phase 2: Curriculum Management & Lesson Authoring

- [ ] **Module Editor (`/modules/[id]`):** Implement rich Markdown / MDSveX editor with live preview for lesson plans and section content.
- [ ] **Practicum Rubric Builder:** Add custom grading and observable behavioral assessment criteria per module.
- [ ] **CTE Pathway Tagging:** Enable tagging lesson plans by industry track (Computer Science, Healthcare, Skilled Trades, General Advisory).

---

## 📄 Phase 3: Automated Ingestion Pipeline (`pdf-to-md`)

- [ ] **Multi-page PDF Parsing:** Enhance PDF parser with layout-aware section header detection and OCR fallback for scanned district syllabi.
- [ ] **Template Sanitization:** Ensure converted markdown automatically aligns with the `LESSON_PLAN_TEMPLATE.md` structure and approved collegiate lexicon.
- [ ] **Batch Ingestion Worker:** Allow bulk uploading of entire course syllabi.

---

## 👥 Phase 4: Multi-Educator Collaboration & Sharing

- [ ] **Document Co-Authoring:** Implement document permission delegation (viewer vs. editor permissions in `document_share` table).
- [ ] **District Resource Library:** Centralized repository for shared school-wide advisory lesson plans.
- [ ] **One-Click Export:** Support export to PDF, Google Docs format, and LMS Common Cartridge (Canvas/Google Classroom).

---

## 📊 Phase 5: Student Progress Telemetry & Analytics

- [ ] **Student Cohort Dashboard:** Class-level view of student completion percentages, streak stats, and Autonomy Scores.
- [ ] **Friction Map Analytics:** Aggregate common friction points and cognitive distortion patterns submitted in student practicums.
- [ ] **Intervention Triggers:** Automated alerts for students falling behind in daily executive functioning check-ins.

---

## 🛠️ Quick Developer Commands

```bash
# Start teacher site in development mode
pnpm --filter teacher-site dev

# Run database schema migrations
pnpm --filter teacher-site db:migrate

# Seed demo curriculum & accounts
pnpm --filter teacher-site db:seed

# Type-check and build production bundle
pnpm --filter teacher-site build
```
