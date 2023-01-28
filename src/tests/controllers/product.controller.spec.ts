import supertest from 'supertest'
import app from '../../server'

import { Product } from '../../models/product.model'

const request = supertest(app)
describe('Product Controller', () => {
  it('It should respond with 200 status code on /products', (done) => {
    request
      .get('/products')
      .then((response) => {
        expect(response.status).toBe(200)
        done()
      })
      .catch((error) => {
        console.log(error)
        done()
      })
  })

  it('It should return product list /products', (done) => {
    request
      .get('/products')
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        done()
      })
      .catch((error) => {
        console.log(error)
        done()
      })
  })

  it('It should show product on GET /products/:id_product', (done) => {
    request
      .get('/products/1')
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        done()
      })
      .catch((error) => {
        console.log(error)
        done()
      })
  })


  it('it should create Product on POST /products with token ', (done) => {
    request
      .post('/users/verify')
      .type('form')
      .send({
        username: 'djasnive',
        password: '123456',
      })
      .then((response) => {
        const token = response.body.token;
        const product: Product = {
          name: 'Chiken',
          category: 'Animals',
          price: 1520,
          id: 0,
        };

        request
          .post('/products')
          .type('form')
          .set('Authorization', 'Bearer ' + token)
          .send(product)
          .then((response) => {
           
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)

            done()
          })
          .catch((error) => {
            console.log(error)
            done()
          })
      })
      .catch((error) => {
        console.log(error)
        done()
      })
  })

  it('it should edit Product on POST /products/:id_product with token ', (done) => {
    request
      .post('/users/verify')
      .type('form')
      .send({
        username: 'djasnive',
        password: '123456',
      })
      .then((response) => {
        const token = response.body.token;
        

        request
          .put('/products/1')
          .type('form')
          .set('Authorization', 'Bearer ' + token)
          .send({
            name: 'MODIFIED NAME',
            price: 520
          })
          .then((response) => {
           
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.name).toEqual('MODIFIED NAME');
            expect(Number(response.body.price)).toEqual(520);

            done()
          })
          .catch((error) => {
            console.log(error)
            done()
          })
      })
      .catch((error) => {
        console.log(error)
        done()
      })
  })

})
