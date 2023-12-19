const {test, expect} = require ('@playwright/test');

test('First Playwright test - fixtures', async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

    await page.locator('#username').fill("rahulshetty");
    await page.locator('#password').fill("learning");
    await page.locator('#signInBtn').click();

    await expect(page.locator('[style="display: block;"]')).toContainText('Incorrect username/password.');

    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator('#signInBtn').click();
    await expect(page).toHaveTitle('ProtoCommerce');
});

// test('First Playwright test - basic', async ({page})=> {
//     await page.goto("https://google.com/");
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Google")

// });