const { test, expect } = require("@playwright/test");

const myUsername = "stuart.dougans@gmail.com";
const myPassword = "HelloWorld";

let webContext;

test.beforeAll("Get Web Context", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const locator_username = page.locator("#userEmail");
  const locator_password = page.locator("#userPassword");
  const locator_loginBtn = page.locator("#login");

  await page.goto("https://rahulshettyacademy.com/client/");
  await expect(page.locator(".login-title")).toContainText("Log in");
  await locator_username.fill(myUsername);
  await locator_password.fill(myPassword);
  await locator_loginBtn.click();
  await expect(page.locator("#sidebar p")).toContainText("Home");
  await context.storageState({ path: "state.json" });

  webContext = await browser.newContext({storageState: 'state.json'});

});

test.only("Test login using Web Context", async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    const locator_itemCards = page.locator(".card-body h5");
    await expect(locator_itemCards.last()).toBeVisible();
    const count = await locator_itemCards.count();
    const randomProduct = Math.floor(Math.random() * count);
    const productText = await locator_itemCards.nth(randomProduct).textContent();

    const locator_viewButton = page.locator(".card-body").nth(randomProduct).locator("button").first();
    await locator_viewButton.click();
    await page.waitForURL("**/product-details/**");
    await expect(page.locator("h2")).toHaveText(productText);
});
