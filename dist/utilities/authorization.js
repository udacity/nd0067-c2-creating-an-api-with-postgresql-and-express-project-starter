"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizationMiddleWare = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        const data = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_KEY);
        // console.log("data after verifying", data);
        //res.locals.userIdInToken will be used for functions that needs to know which user does this token has 
        //authority upon to update
        res.locals.userIdInToken = data.userId;
        next();
    }
    catch (err) {
        throw new Error(`err in authorizing user (should provide a token), err: ${err}`);
    }
};
exports.authorizationMiddleWare = authorizationMiddleWare;
