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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderModel = void 0;
var db_1 = __importDefault(require("../db/db"));
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    OrderModel.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, connnection, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userId = order.userId;
                        return [4 /*yield*/, db_1["default"].connect()];
                    case 1:
                        connnection = _a.sent();
                        sql = "INSERT INTO orders (userId) VALUES ($1) RETURNING *;";
                        return [4 /*yield*/, connnection.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        connnection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        console.log("err");
                        throw new Error("err in creating order, err: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.getOrdersByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connnection, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1["default"].connect()];
                    case 1:
                        connnection = _a.sent();
                        sql = "SELECT o_p.productId, u.id as userId, o.id as orderId, o.status, o_p.quantity FROM users u INNER JOIN orders o ON u.id = o.userId LEFT JOIN orders_products o_p ON o.id = o_p.orderId WHERE u.id =$1;";
                        return [4 /*yield*/, connnection.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        connnection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_2 = _a.sent();
                        console.log("err");
                        throw new Error("err in fetching order with userId ".concat(userId, ", err: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.checkIfUserOwnThisOrder = function (userId, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var connnection, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1["default"].connect()];
                    case 1:
                        connnection = _a.sent();
                        sql = "SELECT * FROM orders WHERE userId=$1 AND id=$2;";
                        return [4 /*yield*/, connnection.query(sql, [userId, orderId])];
                    case 2:
                        result = _a.sent();
                        connnection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        console.log("err");
                        throw new Error("err in fetching order with orderId and userId ".concat(userId, ", err: ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //optional method
    OrderModel.prototype.getCompletedOrdersByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connnection, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1["default"].connect()];
                    case 1:
                        connnection = _a.sent();
                        sql = "SELECT o_p.productId, u.id as userId, o.id as orderId, o.status, o_p.quantity FROM users u INNER JOIN orders o ON u.id = o.userId LEFT JOIN orders_products o_p ON o.id = o_p.orderId WHERE u.id=$1 AND o.status='complete';";
                        return [4 /*yield*/, connnection.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        connnection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_4 = _a.sent();
                        console.log("err");
                        throw new Error("err in fetching order with userId ".concat(userId, ", err: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //optional method
    OrderModel.prototype.setOrderStatus = function (orderId, userId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var connnection, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1["default"].connect()];
                    case 1:
                        connnection = _a.sent();
                        sql = "UPDATE orders SET status=$1 WHERE id=$2 AND userId=$3;";
                        return [4 /*yield*/, connnection.query(sql, [status, orderId, userId])];
                    case 2:
                        result = _a.sent();
                        connnection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        console.log("err");
                        throw new Error("err in fetching order with userId ".concat(userId, ", err: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.OrderModel = OrderModel;
