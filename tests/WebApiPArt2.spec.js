const { test, expect } = require("@playwright/test");

const myUsername = "stuart.dougans@gmail.com";
const myPassword = "HelloWorld";

test.beforeAll("", async ({ browser }) => {
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
});

test.only("Login", async ({ browser }) => {
  // const context = await browser.newContext();
  // const page = await context.newPage();
});
