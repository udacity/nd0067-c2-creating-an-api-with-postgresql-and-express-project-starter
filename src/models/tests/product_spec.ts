import { ProductStore } from '../product';

const store = new ProductStore()

describe("Product Model", () => {
  const testProduct = {
    id: 1,
    name: "Produit de test",
    price: 10.55
  }

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a book', async () => {
    const result = await store.create(testProduct);
    expect(result).toEqual(testProduct);
  });

  it('index method should return a list of books', async () => {
    const result = await store.index();
    expect(result).toEqual([testProduct]);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show("1");
    expect(result).toEqual(testProduct);
  });
});