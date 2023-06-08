import {expect,test} from "@playwright/test"

test("first test",async({page})=>{
    console.log("first test running")
    await page.goto("https://letcode.in")
    console.log("first test completed")
})
test.only("second test",async({page,browserName})=>{
    // test.slow();
    console.log("second test running")
    await page.goto("https://playwright.dev")
    console.log("second test completed")
})
test.only("third test",async({page,browserName})=>{
    console.log("Name:"+browserName)
    if(browserName=="chromium")
    {
        test.skip()
    }
    console.log("third test running")
    await page.goto("https://letcode.in")
    console.log("third test completed")
})