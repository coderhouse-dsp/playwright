import {expect , test} from "@playwright/test"

test("Basic UI Verification",async({page})=>{
    await page.goto("https://letcode.in/edit")
    // isDisabled()?
    expect(await page.isDisabled("#noEdit")).toBe(true)
    // isEditable()?
    
    // const edit = await page.isEditable("#dontwrite")
    // console.log("is edit?"+edit)
    // expect(edit).toBe(true)

    // isEnabled()?
    
    // await page.goto("https://letcode.in/buttons")
    // const ele = await page.$("#isDisabled")
    // console.log(await ele?.isEnabled())
    // console.log(await ele?.isVisible())

    // checkBox/radio isChecked?

    await page.goto("https://letcode.in/radio")
    await page.waitForSelector("input:below(:text('Find if the checkbbox is selected?'))")
    const checkBox = await page.$("input:below(:text('Find if the checkbbox is selected?'))")
    if(checkBox)
    {
        expect(await checkBox.isChecked()).toBe(true)
        await checkBox.uncheck();
    }
    else throw new Error("Element not found")
})
