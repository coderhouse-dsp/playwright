import { Browser, BrowserContext, Page, chromium } from "playwright";

describe("Learn how to handle dropdown", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/frame");
  });
  test("Interact with frames", async () => {
    const frame = page.frame({ name: "firstFr" });
    // frame?.fill("")
    if (frame != null) {
      await frame.fill("input[name='fname']", "koushik");
      await frame.fill("input[name='lname']", "chatterjee");

      // inner frame
      const frames = frame.childFrames();
      console.log("No. of inner frames:" + frames.length);
      if (frames != null) {
        await frames[0].fill("input[name='email']", "koushik@gmail.com");
      } else {
        console.log("wrong frame");
      }
      const parent = frames[0].parentFrame()

      await parent?.fill("input[name='lname']", "Let code");
      const filledFirstName = await frame.$eval(
        "input[name='fname']",
        (input) => (input as HTMLInputElement).value
      );
      const filledLastName = await frame.$eval(
        "input[name='lname']",
        (input) => (input as HTMLInputElement).value
      );
      console.log("Filled First Name:", filledFirstName);
      console.log("Filled Last Name:", filledLastName);
    } else throw new Error("No such frame");
  });
  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
