import { test } from "@playwright/test";
import * as auth from "./auth.json";
import nodemailer from "nodemailer";

const url =
  "https://www.amazon.in/Samsung-Galaxy-Storage-Without-Charger/dp/B0BS17HY8N/ref=asc_df_B0BS17HY8N/?tag=googleshopdes-21&linkCode=df0&hvadid=619684970763&hvpos=&hvnetw=g&hvrand=9825473221001670727&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9061746&hvtargid=pla-1952611720219&psc=1";

test("Amazon Price Drop Notification", async ({ page }) => {
  // Navigate to the Amazon Product page
  await page.goto(url);
  // Get the price of the product
  const price = await page.$eval(".a-price-whole", (el) => el.textContent);
  console.log(price);
  if (Number(price) < 18000) {
    sendEmailNotification(price);
  }
});
// send the email using nodemailer
function sendEmailNotification(price: string | null) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: auth.email,
      pass: auth.password,
    },
  });
  transporter.sendMail(
    {
      from: auth.email,
      to: "deep.patel@synoverge.com",
      subject: "Amazon Price Drop Notification",
      text: `The price of the product ${url} has dropped to ${price}`,
      html: `<p>The price of the product has dropped to ${price}</p> Click to open <a href=${url}></a>`,
    },
    (err: any, info: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );
}
