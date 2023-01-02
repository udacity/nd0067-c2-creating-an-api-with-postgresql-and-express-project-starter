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
exports.MyOrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class MyOrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield database_1.default.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error('Can not get orders ${err}');
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. Error: ${err}`);
            }
        });
    }
    create(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [b.status, b.user_id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not add new order . Error: ${err}`);
            }
        });
    }
    currentUserOrder(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM orders WHERE user_id=$1 and status = 'active'";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find orders for user ${userId}. Error: ${err}`);
            }
        });
    }
    completedUserOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE user_id=($1) and status = "complete" ';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not find orders for user ${userId}. Error: ${err}`);
            }
        });
    }
    addProduct(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [quantity, orderId, productId]);
                const orderProduct = result.rows[0];
                conn.release();
                return orderProduct;
            }
            catch (err) {
                throw new Error('Can not add product ${productId} to order ${orderId}: ${err}');
            }
        });
    }
}
exports.MyOrderStore = MyOrderStore;
