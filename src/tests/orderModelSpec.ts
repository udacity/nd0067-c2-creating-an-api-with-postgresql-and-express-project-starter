import {OrderStore} from "../models/ordersModel";

const store = new OrderStore();

describe('Order model', () => {
    it('single method should return a product', async () => {
        const result = await store.single(1);
        expect(result).toContain({
            id: 1,
            productids: [
                1,
                2,
                3,
                4
            ],
            productquantity: [
                2,
                5,
                1,
                1
            ],
            userid: 1,
            status: "active"
        });
    });
});