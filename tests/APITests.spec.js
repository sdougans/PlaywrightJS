import { test, expect, request } from '@playwright/test';
 
const myUsername = "stuart.dougans@gmail.com";
const myPassword = "HelloWorld";
let token;

const loginPayload = {userEmail:myUsername, userPassword: myPassword};
const orderPayload = {orders:[{country:"United Kingdom",productOrderedId:"6581ca979fd99c85e8ee7faf"}]};

test.beforeAll('Login API', async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:loginPayload});
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
});

test('API testing', async ( {page} ) => {

    // const locator_username = page.locator('#userEmail');
    // const locator_password = page.locator('#userPassword');
    // const locator_loginBtn = page.locator('#login');

    // await page.goto("https://rahulshettyacademy.com/client/");
    // await expect(page.locator('.login-title')).toContainText("Log in")

    // await locator_username.fill(myUsername);
    // await locator_password.fill(myPassword);
    // await locator_loginBtn.click();

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await expect(page.locator("#sidebar p")).toContainText("Home");

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

test.only('Order test', async ({page}) => {
    const apiContext = await request.newContext();
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    );

    const orderJson = await orderResponse.json();
    console.log(orderJson.orders[0]);
    console.log(orderJson.productOrderId[0]);
    console.log(orderJson.message);

});