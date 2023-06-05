import {
  Browser,
  BrowserContext,
  Frame,
  Page,
  chromium,
  firefox,
} from "playwright";

describe("Launch local browser", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
      // channel: "chrome"
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/");
  });
  xtest("my test", async () => {
    await page.goto("https://letcode.in/dropable");
    const src = await page.$("#draggable");
    const dst = await page.$("#droppable");
    if (src && dst) {
      const srcBound = await src.boundingBox();
      const dstBound = await dst.boundingBox();
      if (srcBound && dstBound) {
        await page.mouse.move(
          srcBound.x + srcBound.width / 2,
          srcBound.y + srcBound.height / 2
        );
        await page.mouse.down();
        await page.mouse.move(
          dstBound.x + dstBound.width / 2,
          dstBound.y + dstBound.height / 2
        );
        await page.mouse.down();
      } else {
        throw new Error("No Element found");
      }
    }
  });
  test("my test", async () => {
    await page.goto("https://jqueryui.com/droppable");
    // switch to frame
    const frame = page.frame({
      url: "https://jqueryui.com/resources/demos/droppable/default.html",
    });
    if (frame) {
      const src = await frame.$("#draggable");
      const dst = await frame.$("#droppable");
      if (src && dst) {
        const srcBound = await src.boundingBox();
        const dstBound = await dst.boundingBox();
        if (srcBound && dstBound) {
          await page.mouse.move(
            srcBound.x + srcBound.width / 2,
            srcBound.y + srcBound.height / 2
          );
          await page.mouse.down();
          await page.mouse.move(
            dstBound.x + dstBound.width / 2,
            dstBound.y + dstBound.height / 2
          );
          await page.mouse.down();
        } else {
          throw new Error("No Element found");
        }
      }
    }
  });
});
