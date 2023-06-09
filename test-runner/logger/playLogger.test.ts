import {chromium,test} from "@playwright/test"

test("Logger",async({page})=>{
    const consoleLogs:any = [];
    page.on("console",msg=>{
        if(msg.type()=="error")
        {
            console.log(msg.text())
            consoleLogs.push(msg.text())
        }
    })
    await page.goto("https://letcode.in/elements")
    const btn = page.locator('#search')
    await btn.click()
    await page.goto("https://www.amazon.in/asas")
})