"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, host = _a.host, database = _a.database, database_test = _a.database_test, user = _a.user, password = _a.password, ENV = _a.ENV;
var client = new pg_1.Pool({
    host: host,
    database: ENV === "test" ? database_test : database,
    user: user,
    password: password
});
exports["default"] = client;
