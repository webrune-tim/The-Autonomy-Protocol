import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{i as t,r as n}from"./react-Bl2r1tuC.js";import{a as r}from"./chunk-W22LQPXL-BnyiD7sv.js";import{a as i,o as a}from"./blocks-CLcjPkb3.js";function o(e){let n={p:`p`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i,{title:`Overview/Introduction`}),`
`,(0,c.jsx)(`style`,{children:`
.tap-intro {
  font-family: var(--font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
  color: var(--fg, #eceff4);
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 0 3rem 0;
}

.hero-card {
  position: relative;
  background: linear-gradient(135deg, rgba(24, 30, 42, 0.95) 0%, rgba(14, 19, 27, 0.98) 100%);
  border: 1px solid rgba(136, 192, 208, 0.25);
  border-radius: 16px;
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  margin-bottom: 2.5rem;
  overflow: hidden;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(136, 192, 208, 0.05);
}

.hero-card::before {
  content: '';
  position: absolute;
  top: -120px;
  right: -120px;
  width: 340px;
  height: 340px;
  background: radial-gradient(circle, rgba(136, 192, 208, 0.18) 0%, rgba(208, 135, 112, 0.05) 50%, transparent 70%);
  pointer-events: none;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #88c0d0;
  background: rgba(136, 192, 208, 0.1);
  border: 1px solid rgba(136, 192, 208, 0.3);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #88c0d0;
  box-shadow: 0 0 8px #88c0d0;
}

.hero-title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 1rem 0;
  color: #eceff4;
}

.hero-title span {
  background: linear-gradient(135deg, #88c0d0 0%, #81a1c1 50%, #d08770 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.1rem;
  line-height: 1.65;
  color: #d8dee9;
  max-width: 820px;
  margin: 0 0 2rem 0;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.stat-badge {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 0.9rem 1.2rem;
  backdrop-filter: blur(8px);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #88c0d0;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #8892b0;
  margin-top: 0.2rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #eceff4;
  margin: 0 0 0.35rem 0;
}

.section-header p {
  font-size: 0.95rem;
  color: #8892b0;
  margin: 0;
}

.layers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

@media (max-width: 600px) {
  .layers-grid {
    grid-template-columns: 1fr;
  }
}

.layer-card {
  position: relative;
  background: rgba(18, 24, 34, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.layer-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.6);
}

.layer-card.ui { border-top: 3px solid #88c0d0; }
.layer-card.blocks { border-top: 3px solid #81a1c1; }
.layer-card.content { border-top: 3px solid #d08770; }
.layer-card.core { border-top: 3px solid #a3be8c; }

.layer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.layer-tag {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
}

.layer-card.ui .layer-tag { background: rgba(136, 192, 208, 0.12); color: #88c0d0; border: 1px solid rgba(136, 192, 208, 0.3); }
.layer-card.blocks .layer-tag { background: rgba(129, 161, 193, 0.12); color: #81a1c1; border: 1px solid rgba(129, 161, 193, 0.3); }
.layer-card.content .layer-tag { background: rgba(208, 135, 112, 0.12); color: #d08770; border: 1px solid rgba(208, 135, 112, 0.3); }
.layer-card.core .layer-tag { background: rgba(163, 190, 140, 0.12); color: #a3be8c; border: 1px solid rgba(163, 190, 140, 0.3); }

.layer-count {
  font-size: 0.8rem;
  color: #8892b0;
  font-weight: 600;
}

.layer-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #eceff4;
  margin: 0 0 0.5rem 0;
}

.layer-desc {
  font-size: 0.9rem;
  line-height: 1.55;
  color: #8892b0;
  margin: 0 0 1.25rem 0;
}

.pill-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: auto;
}

.package-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #eceff4;
  text-decoration: none;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.package-pill:hover {
  background: rgba(136, 192, 208, 0.18);
  border-color: #88c0d0;
  color: #88c0d0;
}

.lexicon-card {
  background: rgba(18, 24, 34, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 1.75rem;
  margin-bottom: 3rem;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: 1rem;
}

.lexicon-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.lexicon-table th {
  text-align: left;
  padding: 0.85rem 1rem;
  background: rgba(0, 0, 0, 0.25);
  color: #88c0d0;
  font-weight: 700;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-bottom: 2px solid rgba(255, 255, 255, 0.08);
}

.lexicon-table td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #d8dee9;
  vertical-align: top;
}

.lexicon-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.standard-tag {
  color: #88c0d0;
  font-weight: 600;
}

.prohibited-tag {
  color: #bf616a;
  text-decoration: line-through;
  opacity: 0.75;
}

.commands-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
}

.command-card {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 1rem 1.25rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
}

.command-card .cmd-title {
  font-size: 0.75rem;
  color: #8892b0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.4rem;
  font-family: var(--font-body, sans-serif);
}

.command-card code {
  color: #a3be8c;
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.25rem;
}

.command-card .cmd-desc {
  font-size: 0.8rem;
  color: #8892b0;
  font-family: var(--font-body, sans-serif);
}
`}),`
`,(0,c.jsxs)(`div`,{className:`tap-intro`,children:[(0,c.jsxs)(`div`,{className:`hero-card`,children:[(0,c.jsxs)(`div`,{className:`eyebrow`,children:[(0,c.jsx)(`span`,{className:`pulse-dot`}),(0,c.jsx)(n.p,{children:`The Autonomy Protocol • Monorepo Workshop`})]}),(0,c.jsx)(`h1`,{className:`hero-title`,children:(0,c.jsxs)(n.p,{children:[`Curriculum Component Workshop & `,(0,c.jsx)(`span`,{children:`Presentation Suite`})]})}),(0,c.jsx)(`p`,{className:`hero-subtitle`,children:(0,c.jsx)(n.p,{children:`A non-secular, politically neutral educational framework designed to transition high school students
from external policing to internal self-governance. This interactive Storybook environment serves as the live
component inventory for Career Technical Education (CTE) pathways and general advisory periods.`})}),(0,c.jsxs)(`div`,{className:`stats-row`,children:[(0,c.jsxs)(`div`,{className:`stat-badge`,children:[(0,c.jsx)(`div`,{className:`stat-value`,children:`21`}),(0,c.jsx)(`div`,{className:`stat-label`,children:`Isolated Packages`})]}),(0,c.jsxs)(`div`,{className:`stat-badge`,children:[(0,c.jsx)(`div`,{className:`stat-value`,children:`4`}),(0,c.jsx)(`div`,{className:`stat-label`,children:`Architectural Layers`})]}),(0,c.jsxs)(`div`,{className:`stat-badge`,children:[(0,c.jsx)(`div`,{className:`stat-value`,children:`Svelte 5`}),(0,c.jsx)(`div`,{className:`stat-label`,children:`Runes & CSF Native`})]}),(0,c.jsxs)(`div`,{className:`stat-badge`,children:[(0,c.jsx)(`div`,{className:`stat-value`,children:`AAA`}),(0,c.jsx)(`div`,{className:`stat-label`,children:`Contrast Compliance`})]})]})]}),(0,c.jsxs)(`div`,{className:`section-header`,children:[(0,c.jsx)(`h2`,{children:`Architectural Layers`}),(0,c.jsx)(`p`,{children:`Select any package to open its dedicated interactive Storybook presentation, controls, and accessibility audit.`})]}),(0,c.jsxs)(`div`,{className:`layers-grid`,children:[(0,c.jsxs)(`div`,{className:`layer-card ui`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsxs)(`div`,{className:`layer-top`,children:[(0,c.jsx)(`span`,{className:`layer-tag`,children:`Layer 1 • UI Primitives`}),(0,c.jsx)(`span`,{className:`layer-count`,children:`8 Packages`})]}),(0,c.jsx)(`h3`,{className:`layer-title`,children:`Reactive Micro-Components`}),(0,c.jsx)(`p`,{className:`layer-desc`,children:(0,c.jsx)(n.p,{children:`Discrete, accessible, and reactive interface elements providing observable feedback, telemetry,
and session security without cognitive friction.`})})]}),(0,c.jsxs)(`div`,{className:`pill-cluster`,children:[(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/ui-batterylevel--docs`,children:`BatteryLevel`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/ui-horizontalscroll--docs`,children:`HorizontalScroll`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/ui-logo--docs`,children:`Logo`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/ui-pill--docs`,children:`Pill`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/ui-readingtime--docs`,children:`ReadingTime`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/ui-scrolltotop--docs`,children:`ScrollToTop`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/ui-sessionwarning--docs`,children:`SessionWarning`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/ui-themetoggle--docs`,children:`ThemeToggle`})]})]}),(0,c.jsxs)(`div`,{className:`layer-card blocks`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsxs)(`div`,{className:`layer-top`,children:[(0,c.jsx)(`span`,{className:`layer-tag`,children:`Layer 2 • Architectural Blocks`}),(0,c.jsx)(`span`,{className:`layer-count`,children:`8 Packages`})]}),(0,c.jsx)(`h3`,{className:`layer-title`,children:`Structural Layouts & Shells`}),(0,c.jsx)(`p`,{className:`layer-desc`,children:(0,c.jsx)(n.p,{children:`Composable layout primitives providing persistent sticky headers, responsive drawers,
advisory banners, and discovery metadata.`})})]}),(0,c.jsxs)(`div`,{className:`pill-cluster`,children:[(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/blocks-banner--docs`,children:`Banner`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/blocks-header--docs`,children:`Header`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/blocks-footer--docs`,children:`Footer`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/blocks-hero--docs`,children:`Hero`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/blocks-nav--docs`,children:`Nav`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/blocks-revealingimage--docs`,children:`RevealingImage`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/blocks-seo--docs`,children:`SEO`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/blocks-externallinks--docs`,children:`ExternalLinks`})]})]}),(0,c.jsxs)(`div`,{className:`layer-card content`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsxs)(`div`,{className:`layer-top`,children:[(0,c.jsx)(`span`,{className:`layer-tag`,children:`Layer 3 • Pedagogical Content`}),(0,c.jsx)(`span`,{className:`layer-count`,children:`2 Packages`})]}),(0,c.jsx)(`h3`,{className:`layer-title`,children:`Behavioral Frameworks`}),(0,c.jsx)(`p`,{className:`layer-desc`,children:(0,c.jsx)(n.p,{children:`Structured curricula refactoring traditional personal accountability models into objective,
collegiate-level self-governance and interpersonal repair.`})})]}),(0,c.jsxs)(`div`,{className:`pill-cluster`,children:[(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/content-integrityshield-4-agreements--docs`,children:`FourAgreements (Integrity Shield)`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/content-accountabilitycycle-12-steps--docs`,children:`TwelveSteps (Accountability Cycle)`})]})]}),(0,c.jsxs)(`div`,{className:`layer-card core`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsxs)(`div`,{className:`layer-top`,children:[(0,c.jsx)(`span`,{className:`layer-tag`,children:`Layer 4 • Core Infrastructure`}),(0,c.jsx)(`span`,{className:`layer-count`,children:`3 Packages`})]}),(0,c.jsx)(`h3`,{className:`layer-title`,children:`Design Tokens & Utilities`}),(0,c.jsx)(`p`,{className:`layer-desc`,children:(0,c.jsx)(n.p,{children:`Foundational CSS design tokens, APCA/WCAG mathematical contrast calculators, and predictive
speculative prefetch DOM actions.`})})]}),(0,c.jsxs)(`div`,{className:`pill-cluster`,children:[(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/core-styletokens--docs`,children:`@autonomy/style`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/core-utils--docs`,children:`@autonomy/utils`}),(0,c.jsx)(`a`,{className:`package-pill`,href:`./?path=/docs/core-actions--docs`,children:`@autonomy/actions`})]})]})]}),(0,c.jsxs)(`div`,{className:`lexicon-card`,children:[(0,c.jsxs)(`div`,{className:`section-header`,children:[(0,c.jsx)(`h2`,{children:`Curriculum Lexicon Transformation Matrix`}),(0,c.jsx)(`p`,{children:`The Autonomy Protocol replaces therapeutic, religious, or politicized terminology with collegiate-level pedagogical infrastructure:`})]}),(0,c.jsx)(`div`,{className:`table-wrapper`,children:(0,c.jsxs)(`table`,{className:`lexicon-table`,children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`th`,{children:`Prohibited Buzzword`}),(0,c.jsx)(`th`,{children:`Approved Pedagogical Standard`}),(0,c.jsx)(`th`,{children:`Functional Focus`})]})}),(0,c.jsxs)(`tbody`,{children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`prohibited-tag`,children:`Spirituality / Higher Power`})}),(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`standard-tag`,children:`Objective Standard / Collective Wisdom`})}),(0,c.jsx)(`td`,{children:`Referencing empirical benchmarks outside individual ego.`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`prohibited-tag`,children:`Sin / Character Defect`})}),(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`standard-tag`,children:`Behavioral Liability / Cognitive Distortion`})}),(0,c.jsx)(`td`,{children:`Systematic auditing of observable misalignments.`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`prohibited-tag`,children:`Apology / Forgiveness`})}),(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`standard-tag`,children:`Amends Protocol / Restorative Action`})}),(0,c.jsx)(`td`,{children:`Action-based repair of trust and interpersonal equilibrium.`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`prohibited-tag`,children:`Social Justice / Morality`})}),(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`standard-tag`,children:`Social Friction / Ethical Baseline`})}),(0,c.jsx)(`td`,{children:`Pragmatic resolution of interpersonal conflict in team environments.`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`prohibited-tag`,children:`Social-Emotional Learning (SEL)`})}),(0,c.jsx)(`td`,{children:(0,c.jsx)(`span`,{className:`standard-tag`,children:`Executive Functioning / Psychological Literacy`})}),(0,c.jsx)(`td`,{children:`Building professional resilience and workforce readiness.`})]})]})]})})]}),(0,c.jsxs)(`div`,{className:`section-header`,children:[(0,c.jsx)(`h2`,{children:`Monorepo CLI Quick Reference`}),(0,c.jsx)(`p`,{children:`Run these commands from the root directory of the workspace:`})]}),(0,c.jsxs)(`div`,{className:`commands-box`,children:[(0,c.jsxs)(`div`,{className:`command-card`,children:[(0,c.jsx)(`div`,{className:`cmd-title`,children:`Development Workshop`}),(0,c.jsx)(`code`,{children:`pnpm storybook`}),(0,c.jsx)(`div`,{className:`cmd-desc`,children:`Spins up live dev server at port 6006 with instant HMR.`})]}),(0,c.jsxs)(`div`,{className:`command-card`,children:[(0,c.jsx)(`div`,{className:`cmd-title`,children:`Static Production Build`}),(0,c.jsx)(`code`,{children:`pnpm build:storybook`}),(0,c.jsx)(`div`,{className:`cmd-desc`,children:`Generates optimized static bundle in storybook-static/.`})]}),(0,c.jsxs)(`div`,{className:`command-card`,children:[(0,c.jsx)(`div`,{className:`cmd-title`,children:`Package Verification`}),(0,c.jsx)(`code`,{children:`pnpm test:packages`}),(0,c.jsx)(`div`,{className:`cmd-desc`,children:`Executes headless Puppeteer tests across all packages.`})]})]})]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),a()})))()}l();export{s as default};