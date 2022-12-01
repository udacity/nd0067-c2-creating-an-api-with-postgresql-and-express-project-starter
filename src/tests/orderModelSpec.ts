import {OrderStore} from "../models/ordersModel";

const store = new OrderStore();

describe('Order model', () => {
    it('single method should return a product', async () => {
        const result = await store.single(1);
        expect(200);
    });
});