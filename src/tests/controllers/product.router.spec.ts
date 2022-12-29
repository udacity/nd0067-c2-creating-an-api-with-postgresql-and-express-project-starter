import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)
describe('Product routes', () => {
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
  

})
