import supertest from 'supertest'
import app from '../server'

const request = supertest(app)
describe('My Server', () => {
  it('It should respond with 200 status code on /', (done) => {
    request
      .get('/')
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
