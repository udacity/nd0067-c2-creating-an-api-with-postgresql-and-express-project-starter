"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const db_1 = __importDefault(require("../db/db"));
class OrderModel {
    async create(order) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "INSERT INTO orders (userId) VALUES ($1) RETURNING *;";
            const result = await connnection.query(sql, [order.userId]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in creating order, err: ${err}`);
        }
    }
    async getOrdersByUserId(userId) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT o_p.productId, u.id as userId, o.id as orderId, o.status, o_p.quantity FROM users u INNER JOIN orders o ON u.id = o.userId INNER JOIN orders_products o_p ON o.id = o_p.orderId WHERE u.id =$1;";
            const result = await connnection.query(sql, [userId]);
            connnection.release();
            return result.rows;
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in fetching order with userId ${userId}, err: ${err}`);
        }
    }
    async checkIfUserOwnThisOrder(userId, orderId) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT * FROM orders WHERE userId=$1 AND id=$2;";
            const result = await connnection.query(sql, [userId, orderId]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in fetching order with orderId and userId ${userId}, err: ${err}`);
        }
    }
    //optional method
    async getCompletedOrdersByUserId(userId) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT o_p.productId, u.id as userId, o.id as orderId, o.status, o_p.quantity FROM users u INNER JOIN orders o ON u.id = o.userId INNER JOIN orders_products o_p ON o.id = o_p.orderId WHERE u.id=$1 AND o.status='complete';";
            const result = await connnection.query(sql, [userId]);
            connnection.release();
            return result.rows;
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in fetching order with userId ${userId}, err: ${err}`);
        }
    }
    //optional method
    async setOrderStatus(orderId, userId, status) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "UPDATE orders SET status=$1 WHERE id=$2 AND userId=$3;";
            const result = await connnection.query(sql, [status, orderId, userId]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in fetching order with userId ${userId}, err: ${err}`);
        }
    }
}
exports.OrderModel = OrderModel;
