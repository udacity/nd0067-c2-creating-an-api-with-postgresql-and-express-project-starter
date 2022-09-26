"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var createToken = function (userId) {
    try {
        // console.log("token secret", process.env.TOKEN_SECRET_KEY);
        var token = jsonwebtoken_1["default"].sign({ userId: userId }, process.env.TOKEN_SECRET_KEY);
        return token;
    }
    catch (err) {
        throw new Error("err in creating a token, ".concat(err));
    }
};
exports.createToken = createToken;
var createHash = function (password) {
    try {
        var _a = process.env, SALT_ROUNDS = _a.SALT_ROUNDS, PEPPER = _a.PEPPER;
        var hash = bcrypt_1["default"].hashSync((password + PEPPER), SALT_ROUNDS);
        return hash;
    }
    catch (err) {
        throw new Error("err in creating the hash, ".concat(err));
    }
};
// createToken('1');
