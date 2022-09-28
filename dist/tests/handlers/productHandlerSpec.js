"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const authentication_1 = require("../../utilities/authentication");
describe("Suite for products endpoints:", () => {
    // beforeAll(() => {
    //   client.connect();
    // });
    const newProduct = {
        name: "ball",
        price: 100,
        category: 'play'
    };
    it("create product: POST products/create", async () => {
        const token = (0, authentication_1.createToken)(1);
        const response = await (0, supertest_1.default)(server_1.default).post("/products/create").set('authorization', `Bearer ${token}`).send(newProduct);
        expect(response.status).toEqual(200);
        expect(response.body.id).toBeDefined();
    });
    it("All products: GET /products/index", async () => {
        //to make this test independent from the above test 
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/products/index");
        // console.log(response.body)
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
    });
    it("Get one product: GET /products/show/:productId", async () => {
        //we need a token to create the product, then we could test show product with the id created 
        const token = (0, authentication_1.createToken)(1);
        const response1 = await (0, supertest_1.default)(server_1.default).post("/products/create").set('authorization', `Bearer ${token}`).send(newProduct);
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/products/show/${response1.body.id}`);
        // console.log(response.body)
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(response1.body.id);
    });
    it("Get one product by category: GET /products/categories/:category", async () => {
        //we need a token to create the product, then we could test show product with the id created 
        const token = (0, authentication_1.createToken)(1);
        const response1 = await (0, supertest_1.default)(server_1.default).post("/products/create").set('authorization', `Bearer ${token}`).send(newProduct);
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/products/categories/${response1.body.category}`);
        // console.log(response.body)
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
    });
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
