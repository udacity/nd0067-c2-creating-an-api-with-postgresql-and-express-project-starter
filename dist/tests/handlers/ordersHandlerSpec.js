"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const authentication_1 = require("../../utilities/authentication");
const userModel_1 = require("../../models/userModel");
const productModel_1 = require("../../models/productModel");
const orderModel_1 = require("../../models/orderModel");
describe("Suite for orders endpoints:", () => {
    const newProduct = {
        name: "ball",
        price: 100,
        category: "play",
    };
    const newUser = {
        firstname: "ahmed",
        lastname: "hisham",
        hash: "password123",
    };
    //to make of orders shorter I will run them all in one spec
    it("create order: POST orders/create", async () => {
        //create a user to create an order
        const user = await new userModel_1.UserModel().create(newUser);
        const token = (0, authentication_1.createToken)(user.id);
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/orders/create")
            .set("authorization", `Bearer ${token}`)
            .send();
        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual("active");
    });
    it("get order for a user: GET /orders/get-orders-for-user", async () => {
        //create a user to create an order
        const user = await new userModel_1.UserModel().create(newUser);
        const order = await new orderModel_1.OrderModel().create({
            userId: user.id,
        });
        const token = (0, authentication_1.createToken)(user.id);
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/orders/get-orders-for-user")
            .set("authorization", `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
    });
    it("[extra] set status of an order: POST /orders/set-status", async () => {
        //create a user to create an order
        const user = await new userModel_1.UserModel().create(newUser);
        const order = await new orderModel_1.OrderModel().create({
            userId: user.id,
        });
        const token = (0, authentication_1.createToken)(user.id);
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/orders/set-status")
            .set("authorization", `Bearer ${token}`)
            .send({ orderId: order.id, status: "complete" });
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
    });
    it("[optional] get complete orders: GET /orders/complete", async () => {
        //create a user to create an order
        const user = await new userModel_1.UserModel().create(newUser);
        const order = await new orderModel_1.OrderModel().create({
            userId: user.id,
        });
        const token = (0, authentication_1.createToken)(user.id);
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/orders/complete")
            .set("authorization", `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([]);
    });
    it("Add product to order: POST /orders/addproduct", async () => {
        //create a user to create an order
        const user = await new userModel_1.UserModel().create(newUser);
        const order = await new orderModel_1.OrderModel().create({
            userId: user.id,
        });
        const product = await new productModel_1.ProductModel().create(newProduct);
        const token = (0, authentication_1.createToken)(user.id);
        console.log({
            productId: product.id,
            orderId: order.id,
            quantity: 2,
        });
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/orders/addproduct")
            .set("authorization", `Bearer ${token}`)
            .send({
            productId: product.id,
            orderId: order.id,
            quantity: 2,
        });
        console.log(response.body);
        expect(response.status).toEqual(200);
        expect(response.body.orderid).toEqual(order.id);
    });
    // it("All products: GET /products/index", async (): Promise<void> => {
    //   //to make this test independent from the above test
    //   const product = new ProductModel().create(newProduct)
    //   const response = await request(app)
    //     .get("/products/index")
    //   // console.log(response.body)
    //   expect(response.status).toEqual(200);
    //   expect(response.body).toBeDefined();
    // });
    // it("Get one product: GET /products/show/:productId", async (): Promise<void> => {
    //   //we need a token to create the product, then we could test show product with the id created
    //   const token = createToken(1)
    //   const response1 = await request(app).post("/products/create").set('authorization', `Bearer ${token}`).send(newProduct);
    //   const response = await request(app)
    //     .get(`/products/show/${response1.body.id}`)
    //   // console.log(response.body)
    //   expect(response.status).toEqual(200);
    //   expect(response.body.id).toEqual(response1.body.id);
    // });
    // it("Get one product by category: GET /products/categories/:category", async (): Promise<void> => {
    //   //we need a token to create the product, then we could test show product with the id created
    //   const token = createToken(1)
    //   const response1 = await request(app).post("/products/create").set('authorization', `Bearer ${token}`).send(newProduct);
    //   const response = await request(app)
    //     .get(`/products/categories/${response1.body.category}`)
    //   // console.log(response.body)
    //   expect(response.status).toEqual(200);
    //   expect(response.body).toBeDefined();
    // });
    //   it("get one user: GET users/show/:userId", async (): Promise<void> => {
    //     const response1 = await request(app).post("/users/signup").send(newUser);
    //     const userId = response1.body.id;
    //     const token = createToken(userId);
    //     const response = await request(app)
    //       .get(`/users/show/${response1.body.id}`)
    //       .set("authorization", `Bearer ${token}`);
    //     // console.log(response.body)
    //     expect(response.status).toEqual(200);
    //     expect(response.body).toBeDefined();
    //   });
});
