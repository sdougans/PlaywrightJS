import { test, expect, request, Route } from "@playwright/test";
import { ApiUtils } from "./utils/ApiUtils";

const myUsername = "stuart.dougans@gmail.com";
const myPassword = "HelloWorld";
const loginPayload = { userEmail: myUsername, userPassword: myPassword };
const orderPayload = {
  orders: [
    { country: "United Kingdom", productOrderedId: "6581ca979fd99c85e8ee7faf" },
  ],
};

let token;
let apiUtils;

let response;

test.beforeAll("Login API", async () => {
  const apiContext = await request.newContext();
  apiUtils = new ApiUtils(apiContext, loginPayload);
  token = await apiUtils.getToken();
});

test("API testing", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");
  await expect(page.locator("#sidebar p")).toContainText("Home");

  page.on('request', request => {console.log(request.url())})
  page.on('response', response => {console.log(response.url() + " >>> " + response.status())})

  await page.route(
    "**/api/ecom/order/get-orders-for-customer/**",
    async route => {
      route.fulfill({
        json: {
          data: [
            {
              _id: "6722aad5ae2afd4c0bae589f",
              orderById: "6583415d9fd99c85e8ef9b33",
              orderBy: "stuart.dougans@gmail.com",
              productOrderedId: "Wed Oct 30",
              productName: "ADIDAS ORIGINAL",
              country: "United Kingdom",
              productDescription: "Adidas shoes for Men",
              productImage:
                "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg",
              orderDate: null,
              orderPrice: "31500",
              __v: 0,
            },
          ],
          count: 1,
          message: "Orders fetched for customer Successfully",
        },
      });
    }
  );

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
});

test("Order test", async ({ page }) => {
  response = await apiUtils.createOrder(orderPayload);
  await page.pause();
  console.log(response.orderId);
});
