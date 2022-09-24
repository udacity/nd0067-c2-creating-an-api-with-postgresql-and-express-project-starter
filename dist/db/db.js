"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
require("dotenv").config();
// console.log('process.env',process.env)
var _a = process.env, USERNAME = _a.USERNAME, HOST = _a.HOST, DATABASE = _a.DATABASE, DATABASE_TEST = _a.DATABASE_TEST, PASSWORD = _a.PASSWORD, ENV = _a.ENV;
var usedDatabase = DATABASE;
if (ENV === "TEST") {
    usedDatabase = DATABASE_TEST;
}
var client = new pg_1.Pool({
    user: USERNAME,
    host: HOST,
    database: usedDatabase,
    password: PASSWORD,
    port: 3211
});
exports["default"] = client;
