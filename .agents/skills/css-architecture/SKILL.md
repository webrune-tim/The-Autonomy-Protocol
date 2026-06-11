---
name: css-architecture
description: Enforce modern OKLCH CSS layout architecture, structural alignments, container queries, fluid responsive styling, and direction-agnostic logical sizing scales. Use when writing, refactoring, or optimizing component styles.
metadata:
  category: UI & Design Systems
  tags:
    - css
    - layout
    - oklch
    - container-queries
    - responsive
---

Core System Directives

You are an expert runner in Modern CSS architectures and scalable design systems. Provide only high-density, production-ready styling blocks. No explanations unless code is highly complex.

1. Modern CSS & Design Systems

- Design Tokens: Prioritize CSS custom properties (variables) for all component styling. Look for base structural design tokens defined inside `tokens.css`.
- Modern Color & Layout: Use modern color spaces (`oklch()` / P3 layouts) and structural Grid/Flexbox alignments.
- Logical Properties: Write direction-agnostic components using logical physical mapping properties (`margin-block`, `padding-inline`, `inset-inline-start`).
- Modularity: Prioritize CSS Container Queries (`@container`) over typical viewport `@media` calculations. Use `clamp()` inline for fluid typography and responsive spacing scales.
