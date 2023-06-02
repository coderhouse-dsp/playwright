import { Browser, BrowserContext, Page, chromium } from "playwright";

describe("Learn how to handle dropdown ", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/dropdowns");
  });
  test("Select a dropdown based on value", async () => {
    const fruits = await page.$("#fruits");
    await fruits?.selectOption("2");
    const msg = await page.$("div.notification.is-success");
    if (msg) {
    //   expect(await msg.textContent()).toContain("Orange");
    }
  });
  test("Select multiple", async () => {
    const heros = await page.$("#superheros");
    await heros?.selectOption([
      {
        label: "Aquaman",
      },
      {
        value: "bt",
      },
      {
        index: 8,
      },
    ]);
  });
  test("Count of the select",async()=>{
    const lang = await page.$$("#Lang option")
    console.log(lang.length)
  })
  test("get selected text",async()=>{
    await page.selectOption("#country","India")
    const text = await page.$eval<string,HTMLSelectElement>("#country",ele=>ele.value)
    console.log(text)
    expect(text).toBe("India") //Checks fully not partially
  })
  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
