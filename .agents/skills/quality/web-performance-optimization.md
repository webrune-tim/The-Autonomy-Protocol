---
name: web-performance-optimization
description: Audit, streamline, and eliminate unnecessary payload bytes (code, media, scripts, and server queries) to accelerate page load speed, improve Core Web Vitals, and boost conversion rates.
target: Gemini & Google Antigravity
triggers:
  - web performance audits
  - frontend asset optimization
  - payload reduction
  - page load speed enhancement
  - Core Web Vitals remediation
---

# Web Performance & Asset Payload Optimization

## 1. Executive Performance Targets & Rationale

- **Conversion Impact:** Every 1-second delay in page load time reduces conversions by approximately 7%.
- **Latency Benchmark:** Strive for 0–2 seconds total load time (3 seconds maximum allowable threshold).
- **SEO & Ranking:** Site speed is an algorithmic search ranking factor. Latency directly degrades SERP placement and spikes bounce rates.
- **Mobile Traffic Priority:** Over 58% of global traffic occurs on mobile devices over fluctuating wireless networks; prioritize lean assets for bandwidth-constrained environments.

---

## 2. Core Optimization Pillars

### A. Code Optimization & Minification

- **Minification:** Strip all unnecessary whitespace, line breaks, comments, and unused elements from HTML, CSS, and JavaScript.
- **Variable & Syntax Compression:** Condense expressions (e.g., using fallback evaluation expressions over verbose conditional branching) and leverage build-time identifier shortening.
- **Algorithmic Refactoring:** Streamline inefficient loops, eliminate redundant DOM interactions, and avoid client-side CPU bottlenecks.

### B. Media & Asset Pipeline

- **Asset Size Threshold:** Keep images strictly under 500 KB (target 100–150 KB for standard web graphics).
- **Next-Gen Formats:** Convert legacy JPEG/PNG images to WebP or AVIF for 40%–70% payload savings without perceptual quality degradation.
- **Pre-Scaling:** Resize images to their exact target layout dimensions (e.g., standard hero cap at 1200x800) before deployment instead of serving oversized raw files.
- **Native Lazy Loading:** Attach `loading="lazy"` to offscreen images, media embeds, and iframes.
- **Hosted Video Embeds:** Avoid hosting raw video files directly; offload streaming players to dedicated CDN or video hosting providers.

### C. Script & Dependency Governance

- **Plugin Auditing:** Deactivate and purge unused dependencies, themes, and legacy plugins.
- **Lightweight Replacements:** Replace heavy UI modules (e.g., script-intensive carousel builders) with lightweight, native CSS alternatives.
- **Tag Management:** Use container managers (e.g., Google Tag Manager) to defer tracking scripts and third-party analytics until primary page content renders.
- **Workflow Offloading:** Shift continuous event tracking or data integrations to server-side automation tools (e.g., webhooks) rather than front-loading heavy client-side SDKs.

### D. Server Infrastructure & Edge Delivery

- **Server-Side Compression:** Ensure Brotli or Gzip compression is active across all HTTP text responses.
- **Database Observability & Caching:** Clean transient records, eliminate non-indexed queries, and cache repetitive SQL queries in memory.
- **Edge Caching & CDN:** Distribute static assets globally via a Content Delivery Network to minimize network round-trip time (RTT).

---

## 3. Tooling Matrix

| Tool                          | Category             | Key Capability                                                                                                        |
| :---------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **Google PageSpeed Insights** | Diagnostics          | Benchmarks mobile/desktop performance (0–100), identifying render-blocking resources and Core Web Vitals bottlenecks. |
| **Minifier**                  | Code Compactor       | Automatically condenses HTML, CSS, JavaScript, and JSON payloads.                                                     |
| **TinyPNG / Squoosh**         | Image Compression    | Applies lossy compression to PNG, JPEG, and WebP while maintaining visual fidelity.                                   |
| **PNG to WebP Converter**     | Format Modernization | Transcodes legacy bitmap graphics to modern, high-density WebP formats.                                               |
| **Cloudflare**                | Edge CDN & Security  | Provides edge caching, auto-minification, HTTP/3, and fast DNS resolution.                                            |

---

## 4. Agent Execution Checklist for Codebase Audits

1. **Benchmark:** Run baseline audits (Lighthouse / PageSpeed Insights) to capture FCP, LCP, and CLS scores.
2. **Bundle & Asset Audit:**
   - Scan `/public` or static directories for images > 500 KB.
   - Verify next-gen format conversion (WebP/AVIF) and `loading="lazy"` attributes.
   - Ensure build toolchains (Vite, Rollup, webpack) are configured for tree-shaking and minification.
3. **Third-Party Review:**
   - Review `package.json` for redundant or heavy libraries.
   - Defer third-party tracking scripts behind user interaction or load events.
4. **Network & Cache Review:**
   - Verify response headers include `Content-Encoding: br` or `gzip`.
   - Ensure explicit cache headers (`Cache-Control: public, max-age=31536000, immutable`) are set for static assets.
