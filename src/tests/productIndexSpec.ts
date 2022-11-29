import { Product, ProductStore } from "../models/productModel";

const store = new ProductStore();

describe('Product model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toContain({ id: 1, name: 'ipad', price: 1000 });
    })
})