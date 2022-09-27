"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var orderModel_1 = require("../models/orderModel");
var authorization_1 = require("../utilities/authorization");
//needs return type
var createOrderHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Order, order, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("hit Orders/signup");
                Order = new orderModel_1.OrderModel();
                return [4 /*yield*/, Order.create({
                        userId: res.locals.userIdInToken
                    })];
            case 1:
                order = _a.sent();
                //give a token
                return [2 /*return*/, res.send(__assign(__assign({}, order), { products: [] }))];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.send("err in creating Order, ".concat(err_1, " "))];
            case 3: return [2 /*return*/];
        }
    });
}); };
// const deleteOrderHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log("hit Orders/delete/:OrderId");
//     if (res.locals.OrderIdInToken != req.params.OrderId) {
//       return res.send(
//         `you don\'t have the authority to delete the Order with id ${req.params.OrderId}`
//       );
//     }
//     const Order = new OrderModel();
//     await Order.delete(req.params.OrderId);
//     //even if Order doesn't exist this will return the deletion statement of the Order like with id=1000
//     return res.send("Order is deleted");
//   } catch (err: unknown) {
//     return res.send(
//       `err in deleting Order with id ${req.params.OrderId}, err: ${err} `
//     );
//   }
// };
var getAllOrdersHandlerByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Order, Orders, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("hit Orders/index");
                Order = new orderModel_1.OrderModel();
                return [4 /*yield*/, Order.getOrderByUserId(res.locals.userIdInToken)];
            case 1:
                Orders = _a.sent();
                return [2 /*return*/, res.send(Orders)];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.send("err in getting all Orders, err: ".concat(err_2, " "))];
            case 3: return [2 /*return*/];
        }
    });
}); };
//[Optional]
// const getOneOrderByIdHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log("hit Orders/show/:OrderId");
//     const Order = new OrderModel();
//     const Order = await Order.show(req.params.OrderId);
//     if (!Order) {
//       return res.send("no Order found with this OrderId");
//     }
//     return res.send(Order);
//   } catch (err: unknown) {
//     return res.send(
//       `err in getting Order with Id ${req.params.OrderId}, err: ${err} `
//     );
//   }
// };
// const getOneOrderByCategoryHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log("hit Orders/categories/:category");
//     const Order = new OrderModel();
//     const Order = await Order.fetchByCategory(req.params.category);
//     if (!Order) {
//       return res.send("no Order found with this category");
//     }
//     return res.send(Order);
//   } catch (err: unknown) {
//     return res.send(
//       `err in getting Order with category ${req.params.OrderId}, err: ${err} `
//     );
//   }
// };
var OrderRouter = function (app) {
    app.post("/orders/create", authorization_1.authorizationMiddleWare, createOrderHandler);
    //   app.post("/Orders/delete/:OrderId", authorizationMiddleWare, deleteOrderHandler);
    //index for one user
    app.get("/orders/indexforuser", authorization_1.authorizationMiddleWare, getAllOrdersHandlerByUserId);
    //   app.get("/Orders/show/:OrderId", getOneOrderByIdHandler);
    //   //[Optional]
    //   app.get("/Orders/categories/:category", getOneOrderByCategoryHandler);
};
exports["default"] = OrderRouter;
