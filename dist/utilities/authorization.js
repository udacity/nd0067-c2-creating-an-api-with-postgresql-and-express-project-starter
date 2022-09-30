"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authorizationMiddleWare = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authorizationMiddleWare = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        var data = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET_KEY);
        // console.log("data after verifying", data);
        //res.locals.userIdInToken will be used for functions that needs to know which user does this token has 
        //authority upon to update
        res.locals.userIdInToken = data.userId;
        next();
    }
    catch (err) {
        throw new Error("err in authorizing user (should provide a token), err: ".concat(err));
    }
};
exports.authorizationMiddleWare = authorizationMiddleWare;
