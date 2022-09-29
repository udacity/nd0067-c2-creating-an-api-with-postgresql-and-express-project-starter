"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../../models/orderModel");
const ordersProductsModel_1 = require("../../models/ordersProductsModel");
const productModel_1 = require("../../models/productModel");
const userModel_1 = require("../../models/userModel");
describe("Suite for order model:", () => {
    // beforeAll(() => {
    //   client.connect();
    // });
    const newProduct = {
        name: "ball",
        price: 100,
        category: "play",
    };
    const newUser = {
        firstname: "ahmed",
        lastname: "hisham",
        hash: "passwordHash",
    };
    const { firstname, lastname } = newUser;
    const { name, price, category } = newProduct;
    it("test orders_products model methods: ", async () => {
        const userCreated = await new userModel_1.UserModel().create(newUser);
        const order = {
            userId: userCreated.id,
        };
        //test for create method
        const orderCreated = await new orderModel_1.OrderModel().create(order);
        const productCreated = await new productModel_1.ProductModel().create(newProduct);
        const addProductObj = {
            productId: productCreated.id,
            orderId: orderCreated.id,
            quantity: 20,
        };
        const relationInstance = await new ordersProductsModel_1.OrdersProductsModel().create(addProductObj);
        const indexResult = await new orderModel_1.OrderModel().getOrdersByUserId(userCreated.id.toString());
        // console.log("indexResult", indexResult);
        //completed orders by userId
        const completedOrders = await new orderModel_1.OrderModel().getCompletedOrdersByUserId(userCreated.id);
        // console.log("completedOrders", completedOrders);
        expect(relationInstance.quantity).toEqual(addProductObj.quantity);
    });
});
