const {test, expect} = require ('@playwright/test');

const myUsername = "stuart.dougans@gmail.com";
const myPassword = "HelloWorld";

test.only('Login and shop test', async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();

    const locator_username = page.locator('#userEmail');
    const locator_password = page.locator('#userPassworduserPassword');
    const locator_loginBtn = page.locator('#login');

    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    await expect(page.locator('h1')).toContainText("Log in")

    await locator_username.fill(myUsername);
    await locator_password.fill(myPassword);
    await locator_username.click();
    await expect(page.locator('h3')).toContainText("Automation")


});