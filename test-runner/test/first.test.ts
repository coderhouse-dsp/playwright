import {expect, test} from "@playwright/test"
test("Open letcode and verify title",async({page})=>{
    await page.goto("https://letcode.in")
    const title = await page.title()
    expect(title).toBe("LetCode with Koushik")
})