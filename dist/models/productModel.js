"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const db_1 = __importDefault(require("../db/db"));
class ProductModel {
    async index() {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT * FROM products;";
            const result = await connnection.query(sql);
            connnection.release();
            return result.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`err in fetching all products, err: ${err}`);
        }
    }
    async show(id) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT * FROM products WHERE id=$1;";
            const result = await connnection.query(sql, [id]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in fetching product with id ${id}, err: ${err}`);
        }
    }
    async create(product) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "INSERT INTO products(name, price, category) VALUES ($1, $2, $3) RETURNING *;";
            const result = await connnection.query(sql, [
                product.name,
                product.price,
                product.category,
            ]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in creating product, err: ${err}`);
        }
    }
    // [Extra] dangerous (ON DELETE CASCADE)
    async delete(productId) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "DELETE FROM products where id=$1;";
            const result = await connnection.query(sql, [productId]);
            connnection.release();
            return result.rows;
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in creating product, err: ${err}`);
        }
    }
    //[Optional] 
    async fetchByCategory(category) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT * FROM products WHERE category=$1;";
            const result = await connnection.query(sql, [category]);
            connnection.release();
            return result.rows;
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in fetching products by category, err: ${err}`);
        }
    }
}
exports.ProductModel = ProductModel;
