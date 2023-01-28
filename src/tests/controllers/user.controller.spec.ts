import supertest from 'supertest'
import { User } from '../../models/user.model';
import app from '../../server'

const request = supertest(app)
describe('User Controller', () => {
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
  });

  it('It should return token when hit on /users/verify', (done) => {
    request
      .post('/users/verify')
      .type('form')
      .send({
        username: 'djasnive',
        password: '123456',
      })
      .then((response) => {


        expect(response.status).toBe(200)
        expect(response.body.token).toBeDefined()

        done()
      })
      .catch((error) => {
        console.log(error)
        done()
      })
  })

  it('it should create user on post /users with token ', (done) => {
    request
      .post('/users/verify')
      .type('form')
      .send({
        username: 'djasnive',
        password: '123456',
      })
      .then((response) => {
        const token = response.body.token;
        const user: User = {
          firstname: 'User 1',
          lastname: 'LastName of 1',
          username: 'user1',
          password: '123456',
          id: 0,
        };

        request
          .post('/users')
          .type('form')
          .set('Authorization', 'Bearer ' + token)
          .send(user)
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


})
