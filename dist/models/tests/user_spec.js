"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new user_1.MyUserStore();
describe("User Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            first_name: "First Name",
            last_name: "Last Name",
            login_name: "Login Name"
        }, "Password");
        expect(result).toEqual({
            id: 1,
            first_name: "First Name",
            last_name: "Last Name",
            login_name: "Login Name"
        });
    }));
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([{
                id: 1,
                first_name: "First Name",
                last_name: "Last Name",
                login_name: "Login Name"
            }]);
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show("1");
        expect(result).toEqual({
            id: 1,
            first_name: "First Name",
            last_name: "Last Name",
            login_name: "Login Name"
        });
    }));
});
