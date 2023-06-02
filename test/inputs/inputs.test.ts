import { Browser, BrowserContext, Page, chromium } from "playwright";

describe("Learn how to handle input fields", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    });
    context = await browser.newContext();
    page =await  context.newPage();
    await page.goto("https://letcode.in/edit")
  });
  test("Enter your full Name",async()=>{
    // await page.type("id=fullName","Deep Patel")
    const name = await page.$("#fullName")
    await name?.type("Deep Patel")
  })
  test("Append a text and press keyboard tab",async()=>{
    const join = await page.$("#join")
    // await join?.type("Human")
    // await join?.fill("Human") // -> removes existiong value
    await join?.focus()
    await page.keyboard.press("End")
    await join?.type(" Human")
  })
  test("what is inside the text box",async()=>{
    const text = await page.getAttribute("id=getMe","value")
    console.log(text)
  })
  test("Clear the text",async()=>{
    await page.fill("//input[@value='Koushik Chatterjee']","")
  })
  afterAll(async()=>{
    await page.close();
    await context.close()
    await browser.close()
  })
});
