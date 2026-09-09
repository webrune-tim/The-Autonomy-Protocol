# Shared Architecture & Design Protocol

This rule governs global tech stack constraints, design languages, and interaction guardrails that apply across the monorepo, including both the Teacher Site (`sites/teacher-site`) and Student Site (`sites/student-site`).

---

## 1. Core Interaction Protocol (Anti-Hallucination Interlock)

- **Backlog Guardrail:** The AI agent must **never** auto-implement features or architectural changes from active backlog/todo files without first prompting the user for structural, technical, or copy requirements and receiving explicit confirmation.
- **Workflow Assumption:** Desktop-oriented workflow. Provide structured, comprehensive, collegiate-level analysis with high-contrast, dark-theme formatting.

---

## 2. Global Styling & Design Guidelines

### 2.1. Visual Theme

- **Dark Theme Baseline:** All portals strictly utilize a **high-contrast Dark Theme aesthetic** as their core design baseline.
- **Theme Engine:** State management and styles rely on native `light-dark()` CSS functions paired with a standardized, reusable `ThemeToggle` component.

### 2.2. Color Tokens

- **System Palette:** Adheres strictly to **Nord Colors** ([Nord Theme Usage Guide](https://www.nordtheme.com/docs/usage)) and local tokens defined in [`packages/core/style/tokens.css`](file:///Users/tithos/Dev/Local%20Web/the-autonomy-protocol/packages/core/style/tokens.css).
- **Portal Differentiation:** Maintain dedicated color schemes for Student Site vs. Teacher Site while retaining shared token naming conventions.
- **Consistency:** Maintain standardized text-color rules (e.g., specific mapping for `h4` tags, elements, and consistent CTA border definitions) across both codebases.

### 2.3. Animations & UI Mechanics

- **Transitions:** Employ native browser **View Transitions** for fluid navigation experiences across paths and route changes.
- **Micro-Animations:** Use subtle, performance-oriented CSS transitions without causing layout shifts (CLS).
