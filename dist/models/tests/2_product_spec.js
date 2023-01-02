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
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.MyProductStore();
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have filter method', () => {
        expect(store.filter).toBeDefined();
    });
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('------------ product create');
        const result = yield store.create({
            name: 'Product Name',
            price: 10,
            category: 'cat1',
        });
        expect(result).toEqual({
            id: 2,
            name: 'Product Name',
            price: 10,
            category: 'cat1',
        });
    }));
});
describe('Product Model 2', () => {
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        console.log('------------ product index');
        expect(result).toEqual([
            {
                id: 1,
                name: 'Product Name',
                price: 10,
                category: 'cat1',
            },
            {
                id: 2,
                name: 'Product Name',
                price: 10,
                category: 'cat1',
            },
        ]);
    }));
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('------------ product show');
        const result = yield store.show('2');
        expect(result).toEqual({
            id: 2,
            name: 'Product Name',
            price: 10,
            category: 'cat1',
        });
    }));
});
