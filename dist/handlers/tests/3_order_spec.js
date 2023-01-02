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
describe('Order Handler', () => {
    it('expect to return created order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post('/orders')
            .send({
            status: 'active',
            user_id: '1',
        })
            .set({ Authorization: token })
            .expect(200)
            .expect({
            id: 1,
            status: 'active',
            user_id: '1',
        });
    })),
        it('expect to return current order by user', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get('/orderByUser/1')
                .set({ Authorization: token })
                .expect(200)
                .expect({
                id: 1,
                status: 'active',
                user_id: '1',
            });
        }));
});
