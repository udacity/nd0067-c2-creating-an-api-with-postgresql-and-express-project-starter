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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.a5qO7LWsBmWNZmQHVV-FsqA4g6Vf_4VxmlbOh0MDxHM';
describe('Product Handler', () => {
    it('expect to return created product', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post('/products')
            .send({
            name: 'Product Name',
            price: 10,
            category: 'cat1',
        })
            .set({ Authorization: token })
            .expect(200)
            .expect({
            id: 1,
            name: 'Product Name',
            price: 10,
            category: 'cat1',
        });
    })),
        it('expect to return list of products', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get('/products')
                .expect(200)
                .expect([
                {
                    id: 1,
                    name: 'Product Name',
                    price: 10,
                    category: 'cat1',
                },
            ]);
        })),
        it('expect to return product with ID', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get('/products/1')
                .expect(200)
                .expect({
                id: 1,
                name: 'Product Name',
                price: 10,
                category: 'cat1',
            });
        }));
});
