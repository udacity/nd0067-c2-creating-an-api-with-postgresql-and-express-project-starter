import { ProductStore } from '../product'

const productStore = new ProductStore()

beforeAll(async () => {
  await productStore.create({
    name: 'Apple iPhone XR',
    price: 899,
    category: 'Mobile Phones'
  })
})

describe('Product Model', () => {
  it('create method should add a product', async () => {
    const result = await productStore.create({
      name: 'Mac Book Pro 2020 Model',
      price: 2599,
      category: 'Notebooks'
    })
    expect(result).toEqual({
      id: result.id,
      name: 'Mac Book Pro 2020 Model',
      price: 2599,
      category: 'Notebooks'
    })
  })

  it('index method should return a list of products', async () => {
    const product = await productStore.create({
      name: 'Apple iPad Air 2021',
      price: 699,
      category: 'Tablets'
    })
    const result = await productStore.index()
    expect(result).toContain(product)
  })

  it('show method should return the correct product', async () => {
    const product = await productStore.create({
      name: 'Apple iPad Air 2021',
      price: 699,
      category: 'Tablets'
    })
    const result = await productStore.show(product.id)
    expect(result).toEqual(product)
  })

  it('delete method should remove the product', async () => {
    const result = await productStore.create({
      name: 'Apple iPad Air 2021',
      price: 699,
      category: 'Tablets'
    })
    await productStore.delete(result.id)
    const items = await productStore.index()
    expect(items).not.toContain(result)
  })
})
