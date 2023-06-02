import { Browser, BrowserContext, Page, chromium } from "playwright";

describe("Learn how to handle dropdown", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/windows");
  });
  test("Home Page", async () => {
    console.log(await page.title());
    expect(await page.title()).toBe("Window handling - LetCode");
  });
  xtest("Single page handling", async () => {
    const [newWindow] = await Promise.all([
      context.waitForEvent("page"),
      await page.click("#home"),
    ]);
    await newWindow.waitForLoadState();
    expect(newWindow.url()).toContain("test");
    await newWindow.click('"Log in"');
    await newWindow.waitForNavigation();
    expect(newWindow.url()).toContain("signin");
    await page.bringToFront();
    await page.click('"LetXPath"');
  });
  test("Multi page handling", async () => {
    const [multipage] = await Promise.all([
      context.waitForEvent("page"),
      await page.click("#multi"),
    ]);
    await multipage.waitForLoadState();
    const allwindows = multipage.context().pages();
    console.log("No.of windows: "+allwindows.length);
    allwindows.forEach((page: { url: () => any; }) => {
      console.log(page.url());
    });
    await allwindows[1].bringToFront();
    allwindows[1].on("dialog",(dialog)=>{
        console.log('Message: '+dialog.message())
        dialog.accept();
    })
    await allwindows[1].click("id=accept")
  });
  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
