"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (authorizationHeader === undefined) {
            throw new Error("Please give JWT into Headers");
        }
        else {
            var token = authorizationHeader.split(' ')[1];
            var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
            next();
        }
    }
    catch (error) {
        res.status(401).json("Check credentials");
        return;
    }
};
exports.verifyAuthToken = verifyAuthToken;
