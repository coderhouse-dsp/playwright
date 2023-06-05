import { Browser, BrowserContext, Page, chromium } from "playwright";
import Env from "../../utils/environment";
import HeaderPage from "../../page/Header.page";
import LoginPage from "../../page/Login.page";
import CommonFunctions from "../../page/common.page";

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
  test("Login positive _ JIRA101", async () => {
    expect(page.url()).toBe("https://letcode.in/");
    await header.clickLoginLink();
    expect(page.url()).toBe("https://letcode.in/signin");
    await login.enterUserName("koushik350@gmail.com");
    await login.enterUserPassword("Pass123$");
    await login.clickLoginBtn();
    const toaster = await common.toaster;
    const toasterText = await toaster?.textContent();
    const username = extractUsername(toasterText); // Extracting the username
    expect(toasterText).toContain(`Welcome ${username}`);
    await header.clickSignOutLink();
  });
  test("Login again", async () => {
    await login.login("koushik350@gmail.com", "Pass123$");
    expect(page.url()).toBe("https://letcode.in/")
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
