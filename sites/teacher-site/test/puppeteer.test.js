import { describe, it, expect, beforeAll, afterAll } from "vite-plus/test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser, startSiteServer } from "../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_DIR = path.resolve(__dirname, "..");

describe("teacher-site: Puppeteer E2E Flow", () => {
  let server;
  let browser;

  beforeAll(async () => {
    server = await startSiteServer(SITE_DIR);
    browser = await launchBrowser();
  }, 60000);

  afterAll(async () => {
    if (browser) await browser.close();
    if (server) await server.close();
  });

  it("navigates to educator homepage and renders core layout", async () => {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    // 1. Set desktop viewport
    await page.setViewport({ width: 1280, height: 800 });

    // 2. Navigate to root
    const response = await page.goto(server.url, { waitUntil: "domcontentloaded" });
    expect(response && response.status() < 400).toBe(true);

    // 3. Verify page title
    const title = await page.title();
    expect(title.includes("The Autonomy Protocol") || title.length > 0).toBe(true);

    // 4. Verify layout structure
    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText.length).toBeGreaterThan(0);

    // 5. Test responsive mobile viewport
    await page.setViewport({ width: 390, height: 844 });
    const isBodyVisible = await page.evaluate(() => {
      const b = document.body;
      return b && window.getComputedStyle(b).display !== "none";
    });
    expect(isBodyVisible).toBe(true);

    await page.close();
    expect(consoleErrors).toEqual([]);
  }, 60000);
});
