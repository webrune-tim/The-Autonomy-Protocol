# Typography & Font Specification

This rule defines the core typography architecture, Google Font stacks, CSS token contracts, and high-contrast rendering guidelines across **The Autonomy Protocol** (`sites/student-site` and `sites/teacher-site`).

---

## 1. Typographic Role Matrix

| Token / Role                              | Teacher Site (`sites/teacher-site`)   | Student Site (`sites/student-site`)   | Design / Pedagogical Intent                                                                                                       |
| :---------------------------------------- | :------------------------------------ | :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| **Display / Headings** (`--font-display`) | **Plus Jakarta Sans** `wght@600..800` | **Space Grotesk** `wght@600..700`     | **Teacher:** Collegiate authority and structural precision.<br>**Student:** Punchy, tech-forward neo-grotesque with youth appeal. |
| **Body / Long-Form** (`--font-body`)      | **Inter** `opsz,wght@14..32,400..700` | **Plus Jakarta Sans** `wght@400..700` | **Teacher:** Tabular alignment, UI neutrality, optical sizing.<br>**Student:** Warm, open apertures enhancing reading endurance.  |
| **UI Labels & Badges** (`--font-ui`)      | **Plus Jakarta Sans** `wght@500..600` | **Space Grotesk** `wght@500..600`     | **Teacher:** Scannable administrative metadata.<br>**Student:** Game/CTE status tags and action triggers.                         |
| **Monospace / Audits** (`--font-mono`)    | **JetBrains Mono** `wght@400;600`     | **JetBrains Mono** `wght@400;600`     | Technical literacy, step markers, and structured accountability logs.                                                             |

---

## 2. CSS Custom Property Contract

Defined in [`packages/core/style/typography.css`](file:///Users/tithos/Dev/Local%20Web/the-autonomy-protocol/packages/core/style/typography.css):

### Global / Student Baseline (Default Context)

```css
:root {
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
}
```

### Teacher Portal Overrides (`data-site="teacher"`)

```css
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
}
```

---

## 3. High-Contrast Rendering & Performance Guidelines

1. **Subpixel Antialiasing:** Always maintain `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` on `body` to avoid heavy stroke blooming on dark backgrounds.
2. **Text Rendering:** Enforce `text-rendering: optimizeLegibility` across text elements for optimal kerning pairs and ligatures.
3. **Weight Calibration for Dark Theme:** In dark interfaces, text optically appears heavier than on light backgrounds. Avoid weights above `700` for body copy or above `800` for display headings to preserve clean edge definition.
4. **Google Fonts Delivery:** Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` with `crossorigin`. Load only variable axes within defined budget bounds.
