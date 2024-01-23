class ApiUtils{
    
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: this.loginPayload
        });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    }

    async createOrder(orderPayload)
    {
        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        }
        );

        const orderJson = await orderResponse.json();
        console.log(orderJson.orders[0]);
        console.log(orderJson.productOrderId[0]);
        console.log(orderJson.message);

        response.orderId = orderJson.orders[0];

        return response;
    }
}

module.exports = {ApiUtils}