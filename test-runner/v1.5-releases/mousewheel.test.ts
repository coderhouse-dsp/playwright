import { test } from "@playwright/test";

test("Color scheme", async ({ page,browser }) => {
  await page.goto("https://playwright.dev");
  console.log(await page.title());
  let git = page.locator("text=Discord");
  const box = await git.boundingBox();
  if (box) {
    const y = box.y;
    await page.mouse.wheel(0, y);
  }
  await git.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000);
  await new Promise(() => {});
  await browser.close();
});
