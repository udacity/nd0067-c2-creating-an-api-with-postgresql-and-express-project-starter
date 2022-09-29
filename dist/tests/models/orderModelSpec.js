"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../../models/orderModel");
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
    it("test order model methods: ", async () => {
        const userCreated = await new userModel_1.UserModel().create(newUser);
        const order = {
            userId: userCreated.id,
        };
        //test for create method
        const createResult = await new orderModel_1.OrderModel().create(order);
        // console.log(createResult);
        //index method
        const indexResult = await new orderModel_1.OrderModel().getOrdersByUserId(userCreated.id.toString());
        // console.log("indexResult", indexResult);
        //completed orders by userId
        const completedOrders = await new orderModel_1.OrderModel().getCompletedOrdersByUserId(userCreated.id);
        // console.log("completedOrders", completedOrders);
        expect(createResult.userid).toEqual(userCreated.id);
        expect(indexResult[0].userid).toEqual(userCreated.id);
        expect(completedOrders).toEqual([]);
    });
});
