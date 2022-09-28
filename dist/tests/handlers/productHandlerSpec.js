"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const authentication_1 = require("../../utilities/authentication");
describe("Suite for products endpoints:", () => {
    beforeAll(() => {
        db_1.default.connect();
    });
    const newProduct = {
        name: "ball",
        price: 100,
        category: 'play'
    };
    //this will be passed to the second test
    it("create product: POST products/create", async () => {
        const token = (0, authentication_1.createToken)(1);
        const response = await (0, supertest_1.default)(server_1.default).post("/products/create").set('authorization', `Bearer ${token}`).send(newProduct);
        expect(response.status).toEqual(200);
        expect(response.body.id).toBeDefined();
    });
    it("All products: POST products/index", async () => {
        //to make this test independent from the above test 
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/products/index");
        // console.log(response.body)
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
    });
    //   it("All users: GET users/index", async (): Promise<void> => {
    //     const userId = 1;
    //     const token = createToken(userId);
    //     const response = await request(app)
    //       .get("/users/index")
    //       .set("authorization", `Bearer ${token}`);
    //     // console.log(response.body)
    //     expect(response.status).toEqual(200);
    //     expect(response.body).toBeDefined();
    //   });
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
