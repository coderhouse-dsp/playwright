 import test , {expect} from "./basePages"
import * as data from "../../Learn-playwright/data/login.cred.json"

test.beforeEach(async ({page})=>{
    await page.goto("https://letcode.in")
})

test("test 1",async({headerPage,loginPage,commonPage,page})=>{
    await headerPage.clickLoginLink();
    await headerPage.clickLoginLink();
    expect(page.url()).toBe("https://letcode.in/signin");
    await loginPage.enterUserName(data.email);
    await loginPage.enterUserPassword(data.pass);
    await loginPage.clickLoginBtn();
    const toaster = await commonPage.toaster;
    const toasterText = await toaster?.textContent();
    const username = extractUsername(toasterText); // Extracting the username
    expect(toasterText).toContain(`Welcome ${username}`);
    await headerPage.clickSignOutLink();
})
function extractUsername(toasterText: string | null): string {
    if (toasterText === null || toasterText === undefined) {
      throw new Error("Toaster text is null or undefined.");
    }
    const startIndex = toasterText.indexOf("Welcome") + 8; // Adding 8 to skip "Welcome "
    const endIndex = toasterText.lastIndexOf(" "); // Finding the index of the last space
    const username = toasterText.substring(startIndex, endIndex);
    return username;
  }
  
