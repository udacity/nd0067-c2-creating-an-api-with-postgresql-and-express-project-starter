"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersProductsModel = void 0;
const db_1 = __importDefault(require("../db/db"));
class OrdersProductsModel {
    async create({ productId, orderId, quantity, }) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "INSERT INTO orders_products(orderId, productId, quantity) VALUES ($1, $2, $3) RETURNING *;";
            const result = await connnection.query(sql, [
                orderId,
                productId,
                quantity,
            ]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in adding product to order, err: ${err}`);
        }
    }
}
exports.OrdersProductsModel = OrdersProductsModel;
