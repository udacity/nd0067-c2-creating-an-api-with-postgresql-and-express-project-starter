"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var userHanlder_1 = __importDefault(require("./handlers/userHanlder"));
var authentication_1 = require("./utilities/authentication");
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
var dotenv_1 = __importDefault(require("dotenv"));
var productHandler_1 = __importDefault(require("./handlers/productHandler"));
dotenv_1["default"].config();
(0, authentication_1.createHash)('1');
(0, userHanlder_1["default"])(app);
(0, productHandler_1["default"])(app);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
