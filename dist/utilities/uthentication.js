"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createHash = exports.createToken = void 0;
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
        var salt = bcrypt_1["default"].genSaltSync(parseInt(SALT_ROUNDS));
        var hash = bcrypt_1["default"].hashSync((password + PEPPER), salt);
        return hash;
    }
    catch (err) {
        throw new Error("err in creating the hash, ".concat(err));
    }
};
exports.createHash = createHash;
// createToken('1');
