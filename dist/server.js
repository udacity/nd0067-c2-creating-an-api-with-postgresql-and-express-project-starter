"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var userHanlder_1 = __importDefault(require("./handlers/userHanlder"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
var dotenv_1 = __importDefault(require("dotenv"));
var productHandler_1 = __importDefault(require("./handlers/productHandler"));
var orderHandler_1 = __importDefault(require("./handlers/orderHandler"));
dotenv_1["default"].config();
// createHash('1');
app.use((0, cors_1["default"])());
(0, userHanlder_1["default"])(app);
(0, productHandler_1["default"])(app);
(0, orderHandler_1["default"])(app);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
