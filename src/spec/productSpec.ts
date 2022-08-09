import { Product, ProductStore } from '../models/productsModel';


const store = new ProductStore()

describe("Product Store Functionality", () => {
  beforeAll(async function() {
    await store.truncateProduct()
  })

  it('index route should be defined', async () => {
    expect(store.showCatalog).toBeDefined
  })

  it('create method should add a Product', async () => {
    const result = await store.createProduct({
      name: 'Wrench',
      price: 11.99,
      category: 'Tools'
    });
    expect(result[0]).toEqual({
      id: 1,
      name: 'Wrench',
      price: 11.99,
      category: 'Tools'
    });
  });

  it('Should return a single product', async () => {
    await store.createProduct({
      name: 'Wrench',
      price: 11.99,
      category: 'Tools'
    });
    const result = await store.showProduct(1)
    expect(result[0]).toEqual({
      id: 1,
      name: 'Wrench',
      price: 11.99,
      category: 'Tools'
    })
  })

  it('Should return empty array for the deleted product', async () => {
    const result = await store.deleteProduct(1)
    expect(result[0]).toBeUndefined
  })

  it('Should reset the table identity', async () => {
    await store.truncateProduct()
    expect(await store.showProduct(1)).toThrow
  })
})