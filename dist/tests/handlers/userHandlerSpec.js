"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db/db"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe("Suite for users endpoints:", () => {
    beforeAll(() => {
        db_1.default.connect();
    });
    //this will be passed to the second test
    it("create user: POST users/signup", async () => {
        const newUser = {
            firstname: 'ahmed',
            lastname: 'hisham',
            password: 'password123'
        };
        const response = await (0, supertest_1.default)(server_1.default).post("/users/signup").send(newUser);
        expect(response.status).toEqual(200);
        expect(response.body.id).toBeDefined();
    });
    it("User login: POST users/login", async () => {
        const newUser = {
            userId: 1,
            password: 'password123'
        };
        const response = await (0, supertest_1.default)(server_1.default).post("/users/login").send(newUser);
        // console.log(response.body)
        expect(response.status).toEqual(200);
        expect(response.body.accessToken).toBeDefined();
    });
    afterAll(() => {
        db_1.default.end();
    });
});
