"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const db_1 = __importDefault(require("../db/db"));
class UserModel {
    async create(user) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "INSERT INTO users(firstname, lastname, hash) VALUES ($1, $2, $3) RETURNING id, firstname, lastname;";
            const result = await connnection.query(sql, [
                user.firstname,
                user.lastname,
                user.hash,
            ]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in creating user, err: ${err}`);
        }
    }
    async delete(userId) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "DELETE FROM users where id=$1;";
            const result = await connnection.query(sql, [userId]);
            connnection.release();
            console.log('user delete result rows', result.rows.length);
            return result.rows;
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in creating user, err: ${err}`);
        }
    }
    async index() {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT id, firstname, lastname FROM users;";
            const result = await connnection.query(sql);
            connnection.release();
            return result.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`err in fetching all usres, err: ${err}`);
        }
    }
    async show(userId) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT * FROM users WHERE id=$1;";
            const result = await connnection.query(sql, [userId]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in fetching user with userId ${userId}, err: ${err}`);
        }
    }
}
exports.UserModel = UserModel;
