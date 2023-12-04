const {test, expect} = require ('@playwright/test');

test('First Playwright test - fixtures', async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

});

test('First Playwright test - basic', async ({page})=> {
    await page.goto("https://google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")

});