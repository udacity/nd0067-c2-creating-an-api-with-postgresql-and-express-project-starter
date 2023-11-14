import request from 'supertest'
import app from '~/app'
import { ProductDB } from '~/models/product'

let demoToken: string

beforeAll(async () => {
  demoToken = (await request(app).post('/users/demoUser').expect(201)).body
  await request(app)
    .post('/products')
    .send({
      name: 'Test product',
      price: 0,
      category: 'Test'
    })
    .auth(demoToken, { type: 'bearer' })
    .expect(201)
})

describe('GET /products', () => {
  it('should respond with 200', (done): void => {
    request(app).get('/products').auth(demoToken, { type: 'bearer' }).expect(200, done)
  })
})

describe('GET /products/:id', () => {
  it('should respond with 200', (done): void => {
    request(app).get('/products/1').auth(demoToken, { type: 'bearer' }).expect(200, done)
  })

  it('should respond with 404 if product does not exist', (done): void => {
    request(app).get('/product/1000').auth(demoToken, { type: 'bearer' }).expect(404, done)
  })
})

describe('POST /products', () => {
  it('should respond with 401 if called without auth token', (done): void => {
    request(app).post('/products').expect(401, done)
  })

  it('should create a product', (done): void => {
    request(app)
      .post('/products')
      .send({
        name: 'Test product 2',
        price: 0,
        category: 'Test'
      })
      .auth(demoToken, { type: 'bearer' })
      .expect(201, done)
  })

  it('should respond with 500 if called incorrect', (done): void => {
    request(app)
      .post('/products')
      .send({
        name: 'Test product 2'
      })
      .auth(demoToken, { type: 'bearer' })
      .expect(500, done)
  })
})

describe('PUT /products/:id', () => {
  it('should respond with 401 if called without auth token', (done): void => {
    request(app).put('/products/1').expect(401, done)
  })

  it('should update a product', async (): Promise<void> => {
    const result = (
      await request(app)
        .put('/products/1')
        .send({
          name: 'Test product 1',
          price: 0,
          category: 'Test'
        })
        .auth(demoToken, { type: 'bearer' })
        .expect(200)
    ).body
    expect(result).toEqual({
      id: 1,
      name: 'Test product 1',
      price: 0,
      category: 'Test'
    })
  })

  it('should respond with 500 if called incorrect', (done): void => {
    request(app)
      .put('/products/1')
      .send({
        name: 'Test product 1'
      })
      .auth(demoToken, { type: 'bearer' })
      .expect(500, done)
  })
})

describe('DELETE /products/:id', (): void => {
  it('should respond with 401 if called without auth token', (done): void => {
    request(app).delete('/products/1').expect(401, done)
  })

  it('should respond with 200', async (): Promise<void> => {
    const product: ProductDB = (
      await request(app)
        .post('/products')
        .send({
          name: 'Test product 2',
          price: 0,
          category: 'Test'
        })
        .auth(demoToken, { type: 'bearer' })
        .expect(201)
    ).body
    await request(app).delete(`/products/${product.id}`).auth(demoToken, { type: 'bearer' }).expect(200)
  })

  it('should respond with 404 if product does not exist', (done): void => {
    request(app).delete('/product/1000').auth(demoToken, { type: 'bearer' }).expect(404, done)
  })
})
