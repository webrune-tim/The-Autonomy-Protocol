# Shared Architecture & Design Protocol

> **Note:** This specification is mirrored and actively enforced by Google Antigravity in [`.agents/rules/shared-protocol.md`](file:///Users/tithos/Dev/Local%20Web/the-autonomy-protocol/.agents/rules/shared-protocol.md).

This document details the global tech stack constraints, design languages, and interaction guardrails that apply to both the Teacher Site and the Student Site as outlined in "The Autonomy Protocol.md".

---

## 🚨 Core Interaction Protocol

- **Interactivity Rule:** The AI agent (Google Antigravity / Gemini) must never auto-implement features from the active backlog files without first prompting the user for structural, technical, or copy requirements.

---

## 🎨 Global Styling & Design Guidelines

### 👁️ Visual Theme

- **Theme Aesthetic:** Both systems strictly utilize a **Dark Theme aesthetic** as their core design baseline.
- **Theme Engine:** Implementation relies on native `light-dark()` CSS functions paired with a standardized, reusable `ThemeToggle` component.

### 🎨 Color Tokens

- **System Palette:** Adheres strictly to **Nord Colors** ([Nord Theme Usage Guide](https://www.nordtheme.com/docs/usage)) and local props [local css tokens](packages/core/style/tokens.css).
  - Student Site and Teacher Site have differentiated color schemes
- **Consistency:** Maintain standardized text-color rules (e.g., specific mapping for `h4` tags, elements, and consistent CTA border definitions) across both codebases.

### 🎬 Animations & UI Mechanics

- **Transitions:** Employs native browser **View Transitions** for fluid navigation experiences across paths and route changes.
