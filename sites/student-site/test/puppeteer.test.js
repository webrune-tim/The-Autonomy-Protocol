import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser, startSiteServer } from "../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_DIR = path.resolve(__dirname, "..");

test("student-site: Puppeteer E2E Flow", async (t) => {
  let server;
  let browser;

  t.before(async () => {
    server = await startSiteServer(SITE_DIR);
    browser = await launchBrowser();
  });

  t.after(async () => {
    if (browser) await browser.close();
    if (server) await server.close();
  });

  await t.test("navigates to homepage and renders core elements", async () => {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    // 1. Set desktop viewport
    await page.setViewport({ width: 1280, height: 800 });

    // 2. Navigate to root
    const response = await page.goto(server.url, { waitUntil: "domcontentloaded" });
    assert.ok(
      response && response.status() < 400,
      `Expected successful response status, got ${response?.status()}`,
    );

    // 3. Verify page title
    const title = await page.title();
    assert.ok(
      title.includes("The Autonomy Protocol"),
      `Expected title to include "The Autonomy Protocol", got "${title}"`,
    );

    // 4. Verify layout structure
    const bodyText = await page.evaluate(() => document.body.innerText);
    assert.ok(bodyText.length > 0, "Document body should contain text");

    // 5. Test responsive mobile viewport
    await page.setViewport({ width: 390, height: 844 });
    const isBodyVisible = await page.evaluate(() => {
      const b = document.body;
      return b && window.getComputedStyle(b).display !== "none";
    });
    assert.equal(isBodyVisible, true, "Body should remain visible in mobile viewport");

    await page.close();
    assert.equal(consoleErrors.length, 0, `Unexpected page errors: ${consoleErrors.join(", ")}`);
  });
});
