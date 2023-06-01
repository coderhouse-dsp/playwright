import { chromium } from "playwright";
describe("Launch Browser", () => {
  test("Open Letcode", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = browser.newContext();
    const page = await (await context).newPage();
    await page.goto("https://letcode.in/")
    await page.click("text=Log in");
    await page.fill("input[name='email']",'kaushik350@gmail.com')
    await page.fill("input[name='password']",'Pass123$')
    await page.click('button:text("LOGIN")')
    await page.click('"sign out"')
    await browser.close();
  });
});
