import test from "node:test";
import assert from "node:assert/strict";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";
import { getAAAContrastColor } from "@autonomy/utils";

test("@autonomy/actions: Puppeteer Browser Testing Flow", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test("verifies autoContrast and DOM styling in real Chromium DOM", async () => {
    const page = await browser.newPage();
    await page.setContent(`
      <div id="target" style="background-color: rgb(20, 20, 20); padding: 10px;">
        Action Target Node
      </div>
    `);

    // Simulate autoContrast action execution in browser
    await page.evaluate((fnSource) => {
      const node = document.getElementById("target");
      const getContrast = new Function("return " + fnSource)();
      const bg = window.getComputedStyle(node).backgroundColor;
      node.style.color = getContrast(bg);
    }, getAAAContrastColor.toString());

    // Check applied text color
    const textColor = await page.$eval("#target", (el) => el.style.color);
    assert.ok(
      textColor === "rgb(236, 239, 244)" || textColor === "#eceff4",
      `Expected light contrast color, got: ${textColor}`,
    );

    await page.close();
  });
});
