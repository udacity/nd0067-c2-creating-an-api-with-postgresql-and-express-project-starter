import { ProductStore } from "../models/productModel";

const store = new ProductStore();

describe('Product model', () => {
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toContain({ id: 1, name: 'ipad', price: 1000 });
    });

    it('single method should return a product', async () => {
        const result = await store.single(1);
        expect(result).toContain({ id: 1, name: 'ipad', price: 1000 });
    });

    it('create method should return a count of 1', async () => {
        const result = await store.create('product', 5);
        expect(result).toBeDefined();
    });
});