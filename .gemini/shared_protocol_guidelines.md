# Shared Architecture & Design Protocol

This file details the global tech stack constraints, design languages, and interaction guardrails that apply to both the Teacher Site and the Student Site as outlined in "The Autonomy Protocol.md".

---

## 🚨 Core Interaction Protocol

- **Interactivity Rule:** Gemini must never auto-implement features from the active backlog files without first prompting the user for structural, technical, or copy requirements.

---

## 🎨 Global Styling & Design Guidelines

### 👁️ Visual Theme

- **Theme Aesthetic:** Both systems strictly utilize a **Dark Theme aesthetic** as their core design baseline.
- **Theme Engine:** Implementation relies on native `light-dark()` CSS functions paired with a standardized, reusable `ThemeToggle` component.

### 🎨 Color Tokens

- **System Palette:** Adheres strictly to **Nord Colors** ([Nord Theme Usage Guide](https://www.nordtheme.com/docs/usage)) and local props [local css tokens](packages/core/style/tokens.css).
  - Student Site and Teacher Site have different color schemes
- **Consistency:** Maintain standardized text-color rules (e.g., specific mapping for `h4` tags, elements, and consistent CTA border definitions) across both codebases.

### 🎬 Animations & UI Mechanics

- **Transitions:** Employs native browser **View Transitions** for fluid navigation experiences across paths and route changes.
