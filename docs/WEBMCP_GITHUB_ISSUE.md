# [Feature / Hacktoberfest] Expand WebMCP Agentic Simulations for Student Competency Proofs

## 🎯 Context & Overview

In branch `agentic-evaluation`, we introduced an experimental implementation of **Google WebMCP (Web Model Context Protocol)** in `sites/student-site`.

**The Autonomy Protocol** transitions high school students from external behavioral policing to internal self-governance. Rather than relying on static multiple-choice questionnaires, WebMCP turns student assessments into **interactive, agent-driven practical simulations**. An autonomous evaluator agent (running locally in-page, via the Chrome Model Context Tool Inspector Extension, or through browser agents) communicates with the student's tab using standardized WebMCP tools (`document.modelContext`) to audit cognitive liabilities, verify restorative restitution, and issue verifiable proofs of competency.

---

## 🛠 What's Built So Far

1. **WebMCP Client Core & Lifecycle (`src/lib/webmcp/client.ts`)**:
   - Primary binding to `document.modelContext` with backward fallback to `navigator.modelContext`.
   - Dynamic and static Origin Trial token registration configured for `the-autonomy-protocol-student.vercel.app`.
   - Signal-based lifecycle teardown via `AbortController.abort()` to prevent memory leaks.
   - Built-in fallback runtime so simulations run 100% reliably in any browser.

2. **The Accountability Cycle Simulation Engine (`src/lib/webmcp/simulationEngine.svelte.ts`)**:
   - Svelte 5 runes (`$state`) modeling the 4 core phases:
     - **Orientation (Steps 1–3)**: Limits of control, objective standard committal.
     - **Internal Audit (Steps 4–7)**: Identification & refactoring of cognitive distortions (Externalized Blame, Catastrophizing, Assumptive Projection).
     - **Restorative Practice (Steps 8–9)**: Impact mapping and action-based Amends Protocol.
     - **Maintenance & Leadership (Steps 10–12)**: Conflict de-escalation under environmental friction.
   - 6 registered atomic WebMCP tools:
     - `get_student_competency_profile`
     - `inspect_state_machine`
     - `inject_environmental_friction`
     - `audit_cognitive_alignment`
     - `verify_amends_protocol`
     - `record_proof_of_competency`

3. **Collegiate Desktop UI Workbench (`/simulation`)**:
   - Real-time **Status Banner** with live tool counter & token configuration.
   - **Accountability Cycle Pipeline Visualizer** tracking active state nodes.
   - **Student Interactive Control Deck** to input refactorings and restorative plans.
   - **Autonomous Evaluator Agent Harness** to trigger proctor runs and view signed proof-of-competency certificates.
   - **Agent Telemetry Stream** showing real-time JSON payloads and tool executions.

---

## 🚀 How You Can Contribute (Open Opportunities)

We welcome pull requests from developers, Hacktoberfest participants, and educational strategists! Here are high-impact areas ready for extension:

### 1. Industry-Specific Capstone Pathways (Beginner / Intermediate)
Currently, the simulation defaults to a Computer Science sprint delivery scenario.
- [ ] Add scenario templates for **Healthcare / Nursing** (e.g., patient boundary triage, charting dispute de-escalation).
- [ ] Add scenario templates for **Construction / Skilled Trades** (e.g., subcontractor supply delays, safety liability audits).
- [ ] Implement a pathway switcher dropdown on `/simulation`.

### 2. IndexedDB / Local Persistence for Competency Proofs (Intermediate)
- [ ] Persist `CompetencyVerificationRecord` objects in browser IndexedDB or `localStorage`.
- [ ] Wire the records into the student portal's existing database / achievements store (`src/lib/stores/moduleStore.svelte.ts`) so credentials persist across sessions.

### 3. Declarative WebMCP Form Annotations (Intermediate)
Chromium WebMCP supports both Imperative JavaScript tools and Declarative HTML annotations:
- [ ] Add declarative HTML form annotations (`toolname`, `tooldescription`, `toolparameter`) to the student input forms as a secondary registration surface.

### 4. Interactive Integrity Protocol Calibrator (Intermediate)
- [ ] Build interactive calibration sliders or linguistic diff highlighters for the 4 Integrity Protocol tenets:
  - *Precision of Speech*
  - *Emotional Neutrality*
  - *Inquiry-Based Reality*
  - *Baseline Fluctuation*
- [ ] Expose an additional WebMCP tool `evaluate_speech_precision` that audits student text for subjective adjectives vs. objective telemetry metrics.

### 5. Prompt Templates & Inspector Integration (Beginner)
- [ ] Author a set of recommended evaluator agent prompts for the [Chrome Model Context Tool Inspector Extension](https://chromewebstore.google.com/detail/model-context-tool-inspec/gbpdfapgefenggkahomfgkhfehlcenpd).
- [ ] Add a "Copy Suggested Agent Prompts" drawer to the UI.

---

## 💻 Getting Started Locally

```bash
# 1. Clone & checkout the branch
git checkout agentic-evaluation

# 2. Install monorepo dependencies
pnpm install

# 3. Launch the student site dev server
pnpm --filter student-site dev

# 4. Open the simulation workbench
open http://localhost:6173/simulation
```

### Optional: Enable Native Chrome WebMCP Flags
- Navigate to `chrome://flags/#enable-webmcp-testing` in Chromium 146+.
- Set to **Enabled** and relaunch to test native browser actuation without polyfills.

---

## 📋 Contribution Guidelines
- Follow the pedagogical constraints in [`GEMINI.md`](GEMINI.md): Maintain academic, professional, non-secular framing (focus on observable behavioral metrics rather than subjective emotional states).
- Follow Svelte 5 Runes standards (`$state`, `$derived`, `$props`).
- Test locally with `pnpm --filter student-site check` and `pnpm --filter student-site build`.
