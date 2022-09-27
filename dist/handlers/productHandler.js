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
var productModel_1 = require("../models/productModel");
var authorization_1 = require("../utilities/authorization");
//needs return type
var createProductHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, price, category, Product, product, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log("hit products/signup");
                _a = req.body, name_1 = _a.name, price = _a.price, category = _a.category;
                Product = new productModel_1.ProductModel();
                return [4 /*yield*/, Product.create({
                        name: name_1,
                        price: price,
                        category: category
                    })];
            case 1:
                product = _b.sent();
                //give a token
                return [2 /*return*/, res.send(__assign({}, product))];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, res.send("err in creating product, ".concat(err_1, " "))];
            case 3: return [2 /*return*/];
        }
    });
}); };
// const deleteproductHandler = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log("hit products/delete/:productId");
//     if (res.locals.productIdInToken != req.params.productId) {
//       return res.send(
//         `you don\'t have the authority to delete the product with id ${req.params.productId}`
//       );
//     }
//     const product = new productModel();
//     await product.delete(req.params.productId);
//     //even if product doesn't exist this will return the deletion statement of the product like with id=1000
//     return res.send("product is deleted");
//   } catch (err: unknown) {
//     return res.send(
//       `err in deleting product with id ${req.params.productId}, err: ${err} `
//     );
//   }
// };
var getAllProductsHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, products, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("hit products/index");
                product = new productModel_1.ProductModel();
                return [4 /*yield*/, product.index()];
            case 1:
                products = _a.sent();
                return [2 /*return*/, res.send(products)];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.send("err in getting all products, err: ".concat(err_2, " "))];
            case 3: return [2 /*return*/];
        }
    });
}); };
//[Optional]
var getOneProductByIdHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Product, product, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("hit products/show/:productId");
                Product = new productModel_1.ProductModel();
                return [4 /*yield*/, Product.show(req.params.productId)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.send("no product found with this productId")];
                }
                return [2 /*return*/, res.send(product)];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, res.send("err in getting product with Id ".concat(req.params.productId, ", err: ").concat(err_3, " "))];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOneProductByCategoryHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Product, product, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("hit products/categories/:category");
                Product = new productModel_1.ProductModel();
                return [4 /*yield*/, Product.fetchByCategory(req.params.category)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.send("no product found with this category")];
                }
                return [2 /*return*/, res.send(product)];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.send("err in getting product with category ".concat(req.params.productId, ", err: ").concat(err_4, " "))];
            case 3: return [2 /*return*/];
        }
    });
}); };
var productRouter = function (app) {
    app.post("/products/create", authorization_1.authorizationMiddleWare, createProductHandler);
    //   app.post("/products/delete/:productId", authorizationMiddleWare, deleteproductHandler);
    app.get("/products/index", getAllProductsHandler);
    app.get("/products/show/:productId", getOneProductByIdHandler);
    //[Optional]
    app.get("/products/categories/:category", getOneProductByCategoryHandler);
};
exports["default"] = productRouter;
