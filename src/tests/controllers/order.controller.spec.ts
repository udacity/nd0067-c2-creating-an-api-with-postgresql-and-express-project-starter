import supertest from 'supertest'
import { Order, OrderStatus } from '../../models/order.model'
import app from '../../server'

const request = supertest(app)
let token: String;
describe('Order Controller', () => {

  beforeAll((done) => {

    request
      .post('/users/verify')
      .type('form')
      .send({
        username: 'djasnive',
        password: '123456',
      })
      .then((response) => {
        token = response.body.token as unknown as String;
        done()
      })
      .catch((error) => {
        console.log(error)
        done()
      })
  })



  it('It should respond with 200 status code on /orders', (done) => {
    request
      .get('/orders')
      .set('Authorization', 'Bearer ' + token)
      .then((response) => {
        expect(response.status).toBe(200)
        done()
      })
      .catch((error) => {
        console.log(error)
        done()
      })
    // expect(true).toBe(false)
    // done()
  })

  it('it should create New Order on POST /orders with token ', (done) => {
    const order: Order = {
      user_id: 1,
      product_id: 1,
      quantity: 2,
      status: OrderStatus.ACTIVE,
      id: 0,
    };

    request
      .post('/orders')
      .type('form')
      .set('Authorization', 'Bearer ' + token)
      .send(order)
      .then((response) => {

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        done()
      })
      .catch((error) => {
        console.log(error)
        done()
      })
  });


  it('it should get current user orders on GET /orders/currents_by_user/:user_id with token ', (done) => {

    request
      .get('/orders/currents_by_user/1')
      .type('form')
      .set('Authorization', 'Bearer ' + token)
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
  it('it should get completed user orders on GET /orders/completeds_by_user/:user_id with token ', (done) => {


    request
      .get('/orders/completeds_by_user/1')
      .type('form')
      .set('Authorization', 'Bearer ' + token)
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
})




