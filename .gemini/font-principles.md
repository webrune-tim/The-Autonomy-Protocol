# Font Principles & Typography Specification

## 1. Executive Summary & Pedagogical Alignment

Typography within **The Autonomy Protocol** serves as a core infrastructure element that reinforces behavioral literacy, cognitive clarity, and executive functioning. The design system must bridge two distinct operational contexts:

1. **Teacher & Administrator Portal (`sites/teacher-site`):** Requires a clean, authoritative, collegiate-grade visual hierarchy optimized for curriculum planning, rubric evaluation, data auditing, and administrative review.
2. **Student Portal (`sites/student-site`):** Requires an energetic, tech-forward, and engaging aesthetic that speaks to modern high school youth (Career Technical Education & Advisory pathways) while maintaining maximum legibility for reflective practicums, internal audits, and restorative exercises.

All typographic choices are sourced via **Google Fonts**, optimized for performance with variable axes and strict weight budgets, and rendered natively across our high-contrast, dark-theme interface.

---

## 2. Core Typographic Frameworks by Site Context

| Token / Role                                  | Teacher Site (`sites/teacher-site`)   | Student Site (`sites/student-site`)   | Pedagogical Rationale                                                                                                                                                      |
| :-------------------------------------------- | :------------------------------------ | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Display & Headings** (`--font-display`)     | **Plus Jakarta Sans** `wght@600..800` | **Space Grotesk** `wght@600..700`     | **Teacher:** Crisp collegiate authority and structural precision.<br>**Student:** Punchy, tech-forward neo-grotesque with deep ink traps and youth appeal.                 |
| **Body & Long-Form Text** (`--font-body`)     | **Inter** `opsz,wght@14..32,400..700` | **Plus Jakarta Sans** `wght@400..700` | **Teacher:** Unmatched UI neutrality, tabular numeral support, and optical sizing.<br>**Student:** Warm, open apertures that enhance reading endurance during self-audits. |
| **UI Labels & Badges** (`--font-ui`)          | **Plus Jakarta Sans** `wght@500..600` | **Space Grotesk** `wght@500..600`     | **Teacher:** Structured, scannable administrative metadata.<br>**Student:** Distinct, game-informed CTE status tags and action triggers.                                   |
| **Monospace / Audits / Code** (`--font-mono`) | **JetBrains Mono** `wght@400;600`     | **JetBrains Mono** `wght@400;600`     | Shared standard for technical literacy, step markers, and structured accountability logs.                                                                                  |

---

## 3. Detailed Font Stack Profiles

### 3.1. Teacher Portal (`sites/teacher-site`) — Clean & Professional

- **Primary Display / Headings:** `Plus Jakarta Sans`
  - _Characteristics:_ Contemporary geometric grotesque with refined proportions, clean vertices, and institutional authority without visual stiffness.
  - _Usage:_ `h1` through `h6`, modal titles, module summary headers.
- **Body & Form Infrastructure:** `Inter` (Variable with Optical Sizing)
  - _Characteristics:_ Engineered specifically for digital interfaces and dense information displays. Features tall x-height, distinct numeral shapes (`1` vs `I`, `0` vs `O`), and flawless tabular alignment.
  - _Usage:_ Curriculum text, rubric descriptions, data tables, audit inventories.
- **Monospace / Terminal Data:** `JetBrains Mono`
  - _Characteristics:_ High-legibility code font with intentional spacing and clean operator rendering.
  - _Usage:_ Module IDs, rubric metrics, JSON/Markdown previews.

### 3.2. Student Portal (`sites/student-site`) — Fun & Highly Readable

- **Primary Display / Headings:** `Space Grotesk`
  - _Characteristics:_ Expressive, tech-forward neo-grotesque featuring subtle idiosyncratic details (curved terminals, distinct character ink traps). Delivers an engaging, modern digital feel (evocative of modern developer tooling, gaming interfaces, and contemporary youth media) without sacrificing clarity.
  - _Usage:_ Module titles, hero callouts, card headers, step milestones.
- **Body & Reflective Reading:** `Plus Jakarta Sans`
  - _Characteristics:_ Friendly, modern geometric sans with generous counters and open apertures. Highly readable across sustained reading sessions in freshman advisory and CTE practicums.
  - _Usage:_ Reflection prompts, scenario case studies, lesson narratives.
- **Monospace / System Markers:** `JetBrains Mono`
  - _Characteristics:_ Provides a grounding "protocol" aesthetic for step numbering, timers, and interactive accountability cycles.
  - _Usage:_ Step indexes (`01`, `02`, etc.), time stamps, badge counts.

---

## 4. Google Fonts Implementation & Delivery Protocol

To maximize performance, eliminate render-blocking layout shifts (CLS), and maintain zero-latency theme transitions, use the following CDN delivery patterns:

### 4.1. CDN Resource Hints & Embed Codes

#### Teacher Portal Embed (`sites/teacher-site/src/app.html`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&family=Space+Grotesk:wght@500;600;700&display=swap"
  rel="stylesheet"
/>
```

_(Note: `Space Grotesk` is loaded in the Teacher Portal build to allow real-time runtime token preview switching in the System Style Guide)._

#### Student Portal Embed (`sites/student-site/src/app.html`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Plus+Jakarta+Sans:ital,wght@0,400..700;1,400..700&family=Space+Grotesk:wght@500;600;700&display=swap"
  rel="stylesheet"
/>
```

---

## 5. CSS Custom Property Architecture & Fallback Stacks

### 5.1. Token Mapping Contract (`packages/core/style/typography.css`)

```css
/* ==========================================================================
   GLOBAL / STUDENT BASELINE (Default Context)
   ========================================================================== */
:root {
  /* Core Typographic Roles */
  --font-display:
    "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body:
    "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-ui: "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Backward-Compatible Token Aliases */
  --font-thick: var(--font-display);
  --font-sans-1: var(--font-ui);
  --font-sans-2: var(--font-body);
  --font-serif: var(--font-mono);
  --font-header-sans-1: var(--font-display);
  --font-header-sans-2: var(--font-body);
  --font-header-serif: var(--font-mono);

  /* Fluid Scale Clamps */
  --font-size-1: clamp(2rem, 5svw, 4rem);
  --font-size-2: clamp(1.75rem, 4svw, 3.5rem);
  --font-size-3: clamp(1.25rem, 2.5svw, 2.25rem);
  --font-size-4: clamp(0.875rem, 2svw, 1.5rem);
}

/* ==========================================================================
   TEACHER PORTAL OVERRIDES (data-site="teacher")
   ========================================================================== */
:root[data-site="teacher"] {
  --font-display:
    "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-ui: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  --font-thick: var(--font-display);
  --font-sans-1: var(--font-ui);
  --font-sans-2: var(--font-body);
  --font-serif: var(--font-mono);
  --font-header-sans-1: var(--font-display);
  --font-header-sans-2: var(--font-body);
  --font-header-serif: var(--font-mono);
}
```

---

## 6. Rendering Optimization & High-Contrast Guidelines

1. **Subpixel Antialiasing:** Always include `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` on `body` to avoid heavy stroke blooming on dark backgrounds (`#2e3440` / `var(--black-80)`).
2. **Text Rendering:** Enforce `text-rendering: optimizeLegibility` across all text elements to enable kerning pairs and ligature enhancements.
3. **Weight Calibration for Dark Theme:** In dark interfaces, text optically appears heavier than on light backgrounds. Avoid using weights above `700` for body copy or above `800` for display headings to maintain crisp edge definitions.
4. **Print Stylesheet Isolation:** In physical print mode (`print.css`), swap dark-mode variables for solid `#000` ink targets and maintain high-fidelity font stacks with system sans-serif fallbacks.

---

## 7. Quality Assurance Checklist

- [x] Sourced 100% from Google Fonts CDN with valid variable font syntax.
- [x] Zero payload bloat: obsolete legacy weights (100, 200, 300, 900) and deprecated fonts (`Special Elite`, `Passion One`, static `Poppins`) fully purged.
- [x] Clean, collegiate, and professional stack implemented for `teacher-site` (`Plus Jakarta Sans` + `Inter` + `JetBrains Mono`).
- [x] Fun, energetic, and highly readable youth stack implemented for `student-site` (`Space Grotesk` + `Plus Jakarta Sans` + `JetBrains Mono`).
- [x] Complete backward compatibility maintained across all legacy design tokens (`--font-sans-1`, `--font-sans-2`, `--font-thick`, `--font-serif`).
- [x] Print stylesheets (`print.css`) aligned across both portals.
- [x] Dynamic style guide (`/style`) configured for live token verification between Student and Teacher contexts.
