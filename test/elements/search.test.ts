import { Browser, BrowserContext, Page, chromium } from "playwright";


describe("Learn how to handle Elements", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/elements");
  });
  test("Enter Git username", async () => {
    const header = await page.$("nav[role='navigation']")
    header?.screenshot({path:"header.png"})
    const ele = await page.$("input[name='username']");
    await ele?.fill("ortonikc");
    await ele?.press("Enter");
  });
  test("Print all the repos", async () => {
    await page.waitForSelector("app-gitrepos ol li", { timeout: 5000 });
    const repos = await page.$$("app-gitrepos ol li");
    console.log(repos.length);

    // for await

    // for await (const repo of repos)
    // {
    //     console.log(await repo.innerText())

    // }

    // map
    const allUrls = Promise.all(
      repos.map(async (repo, i) => {
        return await repo.innerText();
      })
    );
    console.log(allUrls);
    await page.screenshot({path:"fs.png",fullPage:true})
    const buffer = await page.screenshot();
    console.log(buffer.toString('base64'));
  });
  afterEach(async () => {
    await page.screenshot({ path: Date.now() + "screentshot.png" });
  });
  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
