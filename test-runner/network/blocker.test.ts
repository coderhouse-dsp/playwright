import { request, test } from "@playwright/test";
test("Block images - Network Intercept", async ({ page }) => {
//   await page.route("**/*", (request) => {
//     return request.request().resourceType() === "image"
//       ? request.abort
//       : request.continue();
//   });
//   await page.goto("https://unsplash.com/t/people");


    await page.route("**/*",(request)=>{
        return request.request().url().startsWith("https://googleads.g.doubleclick.net/pagead/ads")?request.abort() : request.continue()
    })
    await page.goto("https://letcode.in/test")
    // await page.evaluate(()=>{
    //     const adContainer = document.querySelector(".section has-text-centered is-vcentered")
    //     if(adContainer)
    //     {
    //         console.log("Successfully done")
    //         adContainer.remove()

    //     }
    // })
  await page.waitForTimeout(5000);
});
