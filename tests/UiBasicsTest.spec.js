const {test, expect} = require ('@playwright/test');

test('First Playwright test - fixtures', async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();

    const locator_username = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

    await locator_username.fill("rahulshetty");
    await page.locator('#password').fill("learning");
    await page.locator('#signInBtn').click();

    await expect(page.locator('[style="display: block;"]')).toContainText('Incorrect username/password.');

    await locator_username.fill("rahulshettyacademy");
    await page.locator('#signInBtn').click();
    await expect(page).toHaveTitle('ProtoCommerce');

    const pageTitle = await page.locator('h1').textContent();
    expect(pageTitle).toEqual('Shop Name');

    const locator_sideMenu = page.locator("a.list-group-item");
    const sideMenuOptions = await locator_sideMenu.allTextContents();
    console.log(sideMenuOptions);
    expect(sideMenuOptions).toHaveLength(3);

});

test('First Playwright test - basic', async ({page})=> {
    await page.goto("https://google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")
});

test('Waiting', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator('#password').fill("learning");
    await page.locator('#signInBtn').click();

    await page.locator('h1').waitFor();

    const pageTitle = await page.locator('h1').textContent();
    expect(pageTitle).toEqual('Shop Name');
});

test('Elements', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator('#password').fill("learning");

    await page.locator('input[value="user"]').click();
    await page.locator('#okayBtn').click();
    expect(await page.locator('input[value="user"]'), "User radio is not selected").toBeChecked();

    await page.locator('input[value="admin"]').click();
    expect(await page.locator('input[value="user"]').isChecked(), "User radio is not selected").toBeFalsy();
    
    await page.locator('select.form-control').selectOption('Consultant');

    await page.locator('#signInBtn').click();
    await page.locator('h1').waitFor();
    const pageTitle = await page.locator('h1').textContent();
    expect(pageTitle).toEqual('Shop Name');

    // Pause and debug
    //await page.pause();
});

test('Check attribute', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const locator_blinkingText = page.locator('[href*="documents-request"]');
    await expect(locator_blinkingText).toHaveAttribute('class', 'blinkingText');
});

test('New tab', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'), 
        page.locator('[href*="documents-request"]').click()
    ])

    const emailText = await newPage.locator('.red').locator('a').textContent();
    const splitText = emailText.split("@")[1].split(" ")[0];
    await page.locator('#username').fill(splitText);
    console.log(splitText);
});
