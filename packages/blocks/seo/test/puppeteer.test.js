import test from "node:test";
import assert from "node:assert/strict";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

test("@autonomy/seo: Puppeteer Head & Metadata Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "verifies document title, meta tags, and OpenGraph headers in Chromium document head",
    async () => {
      const page = await browser.newPage();

      await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Student Self-Governance | The Autonomy Protocol</title>
        <meta name="description" content="Non-secular educational framework for executive functioning and psychological literacy.">
        <meta property="og:title" content="Student Self-Governance | The Autonomy Protocol">
        <meta property="og:description" content="Non-secular educational framework for executive functioning and psychological literacy.">
        <meta property="og:site_name" content="The Autonomy Protocol">
        <link rel="canonical" href="https://the-autonomy-protocol.vercel.app">
      </head>
      <body>
        <main>Page Content</main>
      </body>
      </html>
    `);

      // Verify document title
      const title = await page.title();
      assert.equal(title, "Student Self-Governance | The Autonomy Protocol");

      // Verify meta description
      const description = await page.$eval('meta[name="description"]', (el) =>
        el.getAttribute("content"),
      );
      assert.ok(description?.includes("Non-secular educational framework"));

      // Verify OpenGraph tags
      const ogTags = await page.$$eval('meta[property^="og:"]', (els) => {
        return Object.fromEntries(
          els.map((el) => [el.getAttribute("property"), el.getAttribute("content")]),
        );
      });

      assert.equal(ogTags["og:site_name"], "The Autonomy Protocol");
      assert.equal(ogTags["og:title"], "Student Self-Governance | The Autonomy Protocol");

      // Verify canonical link
      const canonical = await page.$eval('link[rel="canonical"]', (el) => el.getAttribute("href"));
      assert.equal(canonical, "https://the-autonomy-protocol.vercel.app");

      await page.close();
    },
  );
});
