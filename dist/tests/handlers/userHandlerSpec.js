"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const authentication_1 = require("../../utilities/authentication");
describe("Suite for users endpoints:", () => {
    beforeAll(() => {
        db_1.default.connect();
    });
    const newUser = {
        firstname: "ahmed",
        lastname: "hisham",
        password: "password123",
    };
    //this will be passed to the second test
    it("create user: POST users/signup", async () => {
        const response = await (0, supertest_1.default)(server_1.default).post("/users/signup").send(newUser);
        expect(response.status).toEqual(200);
        expect(response.body.id).toBeDefined();
    });
    it("User login: POST users/login", async () => {
        //to make this test independent from the above test 
        const response1 = await (0, supertest_1.default)(server_1.default).post("/users/signup").send(newUser);
        const userLoginData = {
            userId: response1.body.id,
            password: "password123",
        };
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/users/login")
            .send(userLoginData);
        // console.log(response.body)
        expect(response.status).toEqual(200);
        expect(response.body.accessToken).toBeDefined();
    });
    it("All users: GET users/index", async () => {
        const userId = 1;
        const token = (0, authentication_1.createToken)(userId);
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/users/index")
            .set("authorization", `Bearer ${token}`);
        // console.log(response.body)
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
    });
    it("get one user: GET users/show/:userId", async () => {
        const response1 = await (0, supertest_1.default)(server_1.default).post("/users/signup").send(newUser);
        const userId = response1.body.id;
        const token = (0, authentication_1.createToken)(userId);
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/users/show/${response1.body.id}`)
            .set("authorization", `Bearer ${token}`);
        // console.log(response.body)
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
    });
});
