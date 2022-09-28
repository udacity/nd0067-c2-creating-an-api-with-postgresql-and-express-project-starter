"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.createHash = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken = (userId) => {
    try {
        // console.log("token secret", process.env.TOKEN_SECRET_KEY);
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.TOKEN_SECRET_KEY);
        return token;
    }
    catch (err) {
        throw new Error(`err in creating a token, ${err}`);
    }
};
exports.createToken = createToken;
const createHash = (password) => {
    try {
        const { SALT_ROUNDS, PEPPER } = process.env;
        // const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS as string))
        const hash = bcrypt_1.default.hashSync((password + PEPPER), parseInt(SALT_ROUNDS));
        // console.log("hash", hash);
        return hash;
    }
    catch (err) {
        throw new Error(`err in creating the hash, ${err}`);
    }
};
exports.createHash = createHash;
const compareHash = async (password, hash) => {
    try {
        const { PEPPER } = process.env;
        const result = bcrypt_1.default.compareSync(password + PEPPER, hash);
        // console.log("result = ", result);
        return result;
    }
    catch (err) {
        throw new Error(`userId or password is not correct, ${err}`);
        // return false
    }
};
exports.compareHash = compareHash;
// createToken('1');
