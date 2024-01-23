import { test, expect, request } from '@playwright/test';
import { ApiUtils } from './utils/ApiUtils';

const myUsername = "stuart.dougans@gmail.com";
const myPassword = "HelloWorld";
const loginPayload = {userEmail:myUsername, userPassword: myPassword};
const orderPayload = {orders:[{country:"United Kingdom",productOrderedId:"6581ca979fd99c85e8ee7faf"}]};

let token;
let apiUtils;

let response;

test.beforeAll('Login API', async () => {
    
    const apiContext = await request.newContext();
    apiUtils = new ApiUtils(apiContext, loginPayload);
    token = await apiUtils.getToken();

    // const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:loginPayload});
    // expect(loginResponse.ok()).toBeTruthy();
    // const loginResponseJson = await loginResponse.json();
    // token = loginResponseJson.token;
});

test('API testing', async ( {page} ) => {

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
    response = await apiUtils.createOrder(orderPayload);
    console.log(response.orderId);
});