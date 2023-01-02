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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//const tokenSecret = process.env.TOKEN_SECRET;
const store = new user_1.MyUserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.show(req.params.id);
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            login_name: req.body.login_name,
        };
        const newUser = yield store.create(user, req.body.password);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            next();
        }
        else {
            res.status(401);
            res.json('No token ');
        }
    }
    catch (error) {
        res.status(401);
        res.json('Invalid token ${error}');
        return;
    }
};
const myuser_routes = (app) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
};
exports.default = myuser_routes;
