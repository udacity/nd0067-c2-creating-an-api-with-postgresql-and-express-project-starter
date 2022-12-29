import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)
describe('Order routes', () => {
  it('It should respond with 200 status code on /orders', (done) => {
    request
      .get('/orders')
      .then((response) => {
        expect(response.status).toBe(200)
        done()
      })
      .catch((error) => {
        console.log(error)
        done()
      })
  })
  

})
