import { Product, ProductStore } from '../models/productsModel';


const store = new ProductStore()

describe("Product Store Functionality", () => {
  beforeEach(async function() {
    await store.truncateProduct()
    await store.createProduct({
      product_id: 1,
      name: 'Test Product',
      price: 11.99,
      category: 'Tools'
    })
  })

  it('showCatalog (index) route should be defined', async () => {
    expect(store.showCatalog).toBeDefined
  })

  it('showProduct should return a single product', async () => {
    const result = await store.showProduct(1)
    expect(result[0]).toEqual({
      id: 1,
      product_id: 1,
      name: 'Test Product',
      price: 11.99,
      category: 'Tools'
    })
  })

  it('deleteProduct should return empty array for the deleted product', async () => {
    const result = await store.deleteProduct(1)
    expect(result[0]).toBeUndefined
  })

  it('showByCategory should return product Product', async () => {
    const result = await store.showProductByCat("Tools")
    expect(result[0]).toEqual({
      id: 1,
      product_id: 1,
      name: 'Test Product',
      price: 11.99,
      category: 'Tools'
    })
  })

  it('truncateProduct should reset the table identity', async () => {
    await store.truncateProduct()
    expect(await store.showProduct(1)).toThrow
  })

})