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
exports.MyProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class MyProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield database_1.default.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error('Can not get Products ${err}');
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM products WHERE id=$1';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find product ${id}. Error: ${err}`);
            }
        });
    }
    create(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [b.name, b.price, b.category]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not add new Product . Error: ${err}`);
            }
        });
    }
    filter(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM products where category = '" + category + "'";
                const result = yield database_1.default.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error('Can not get Products ${err}');
            }
        });
    }
}
exports.MyProductStore = MyProductStore;
