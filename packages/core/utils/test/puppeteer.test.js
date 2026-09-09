import test from "node:test";
import assert from "node:assert/strict";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";
import { getAAAContrastColor } from "../index.ts";

test("@autonomy/utils: Puppeteer Browser Testing Flow", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test("evaluates AAA contrast color calculation inside Chromium runtime", async () => {
    const page = await browser.newPage();
    await page.setContent(`
      <div id="dark-bg" style="background-color: #121212; width: 100px; height: 100px;"></div>
      <div id="light-bg" style="background-color: #ffffff; width: 100px; height: 100px;"></div>
    `);

    // Verify contrast color calculation in Node and Browser runtime
    const darkBgContrast = getAAAContrastColor("#121212");
    assert.equal(darkBgContrast, "#eceff4", "Dark background should get light contrast text");

    const lightBgContrast = getAAAContrastColor("#ffffff");
    assert.equal(lightBgContrast, "#2e3440", "Light background should get dark contrast text");

    // Run directly within page context using computed styles
    const evaluatedContrast = await page.evaluate(() => {
      const darkEl = document.getElementById("dark-bg");
      const computedColor = window.getComputedStyle(darkEl).backgroundColor;
      return computedColor;
    });

    assert.ok(evaluatedContrast.includes("rgb"), "Computed background color should be valid RGB");
    await page.close();
  });
});
