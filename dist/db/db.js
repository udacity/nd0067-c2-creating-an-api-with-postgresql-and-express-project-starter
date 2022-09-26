"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
// console.log('process.env',process.env)
var _a = process.env, USERNAME = _a.USERNAME, HOST = _a.HOST, DATABASE = _a.DATABASE, DATABASE_TEST = _a.DATABASE_TEST, PASSWORD = _a.PASSWORD, ENV = _a.ENV;
var usedDatabase = DATABASE;
if (ENV === "TEST") {
    usedDatabase = DATABASE_TEST;
}
var client = new pg_1.Pool({
    user: 'postgres',
    host: HOST,
    database: usedDatabase,
    password: PASSWORD,
    port: 5432
});
exports["default"] = client;
