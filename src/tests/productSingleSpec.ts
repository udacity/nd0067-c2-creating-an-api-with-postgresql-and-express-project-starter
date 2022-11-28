import { Product, ProductStore } from "../models/productModel";

const store = new ProductStore();

describe('Product model', () => {
    it('should have an index method', () => {
        expect(store.single).toBeDefined();
    });

    it('index method should return a list of products', async () => {
        const result = await store.single(1);
        expect(result).toContain({ id: 1, name: 'ipad', price: 1000 });
    })
})