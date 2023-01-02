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
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//const tokenSecret = process.env.TOKEN_SECRET;
const store = new order_1.MyOrderStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.show(req.params.id);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            status: req.body.status,
            user_id: req.body.user_id,
        };
        const newOrder = yield store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderProduct = yield store.addProduct(req.body.quantity, req.body.order_id, req.body.product_id);
        res.json(newOrderProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const currentUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.currentUserOrder(req.params.id);
        res.json(orders);
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
const myorder_routes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.post('/orders/:id/products', addProduct);
    app.get('/orderByUser/:id', verifyAuthToken, currentUserOrder);
};
exports.default = myorder_routes;
