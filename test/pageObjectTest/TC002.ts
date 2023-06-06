import { Browser, BrowserContext, Page, chromium } from "playwright";
import Env from "../../utils/environment";
import HeaderPage from "../../page/Header.page";
import LoginPage from "../../page/Login.page";
import CommonFunctions from "../../page/common.page";
import * as data from "../../data/login.cred.json";
import ReportUtils from "../../utils/reportUtils";

declare const page:Page;
declare const reporter : any;

describe("TC001", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  // my pages
  let header: HeaderPage;
  let login: LoginPage;
  let common: CommonFunctions;
  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(Env.test);
    header = new HeaderPage(page);
    login = new LoginPage(page);
    common = new CommonFunctions(page);
  });
  test("Login positive 102", async () => {
    await reporter.description("Login into letcode").story("JIRA101")
    await reporter.startStep("Navigate to letcode")
    expect(page.url()).toBe("https://letcode.in/");
    await ReportUtils.screenshot("navigation")
    await reporter.endStep();
    await reporter.startStep("Click login link")
    await header.clickLoginLink();
    reporter.endStep();
    expect(page.url()).toBe("https://letcode.in/");
    await reporter.startStep("enter Username")
    await login.enterUserName(data.email);
    await ReportUtils.screenshot("username")
    await reporter.endStep();
    await reporter.startStep("enter password")
    await login.enterUserPassword(data.pass);
    await ReportUtils.screenshot()
    await reporter.endStep();
    await login.clickLoginBtn();
    const toaster = await common.toaster;
    const toasterText = await toaster?.textContent();
    const username = extractUsername(toasterText); // Extracting the username
    expect(toasterText).toContain(`Welcome ${username}`);
    await reporter.startStep("Log out")
    await header.clickSignOutLink();
    await ReportUtils.screenshot("done")
    await reporter.endStep();
  });
  test("Login again", async () => {
    await page.goto(Env.test)
    await header.clickLoginLink()
    await login.login("koushik350@gmail.com", "Pass123$");
    expect(page.url()).toBe("https://letcode.in/");
    await ReportUtils.screenshot("done")
  });
});
function extractUsername(toasterText: string | null): string {
  if (toasterText === null || toasterText === undefined) {
    throw new Error("Toaster text is null or undefined.");
  }
  const startIndex = toasterText.indexOf("Welcome") + 8; // Adding 8 to skip "Welcome "
  const endIndex = toasterText.lastIndexOf(" "); // Finding the index of the last space
  const username = toasterText.substring(startIndex, endIndex);
  return username;
}
