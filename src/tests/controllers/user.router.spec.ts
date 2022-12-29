import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)
describe('User routes', () => {
  it('It should berespond with 200 status code on /users', (done) => {
    request
      .get('/users')
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
