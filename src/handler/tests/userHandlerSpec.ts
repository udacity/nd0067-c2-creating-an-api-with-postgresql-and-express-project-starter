import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '~/app'
import { User } from '~/models/user'

type UserJWT = {
  user: User
  iat: number
}

let demoToken: string
let demoUser: UserJWT

const { TEST_USER_PASSWORD } = process.env

beforeAll(async () => {
  demoToken = (await request(app).post('/users/demoUser').expect(201)).body
  demoUser = jwt.decode(demoToken) as UserJWT
})

describe('GET /users', () => {
  it('should respond with 401 if called without auth token', (done): void => {
    request(app).get('/users').expect(401, done)
  })

  it('should respond with 200', (done): void => {
    request(app).get('/users').auth(demoToken, { type: 'bearer' }).expect(200, done)
  })
})

describe('POST /users/register', () => {
  it('should create a user', (done): void => {
    request(app)
      .post('/users/register')
      .auth(demoToken, { type: 'bearer' })
      .send({
        first_name: 'test',
        last_name: '5',
        email: 'test5@test.com',
        password: '1234'
      })
      .expect(201, done)
  })

  it('should respond with 500 if called incorrect', (done): void => {
    request(app)
      .post('/users/register')
      .auth(demoToken, { type: 'bearer' })
      .send({
        first_name: 'test',
        email: 'test5@test.com',
        password: '1234'
      })
      .expect(500, done)
  })
})

describe('GET /users/:id', () => {
  it('should respond with 401 if called without auth token', (done): void => {
    request(app).get('/users/1').expect(401, done)
  })

  it('should respond with 200', (done): void => {
    request(app).get('/users/1').auth(demoToken, { type: 'bearer' }).expect(200, done)
  })

  it('should respond with 404 if user does not exist', (done): void => {
    request(app).get('/users/1000').auth(demoToken, { type: 'bearer' }).expect(404, done)
  })
})

describe('POST /users/login', () => {
  it('should respond with 200', (done): void => {
    request(app)
      .post('/users/login')
      .auth(demoToken, { type: 'bearer' })
      .send({
        email: 'sang.pham@test.com',
        password: TEST_USER_PASSWORD
      })
      .expect(200, done)
  })

  it('should respond with 500 if user does not exist', (done): void => {
    request(app)
      .post('/users/login')
      .auth(demoToken, { type: 'bearer' })
      .send({
        email: 'testTrial@test.com',
        password: '1234'
      })
      .expect(500, done)
  })

  it('should respond with 500 if credentials are wrong', (done): void => {
    request(app)
      .post('/users/login')
      .auth(demoToken, { type: 'bearer' })
      .send({
        email: 'sang1.pham@test.com',
        password: '1234'
      })
      .expect(500, done)
  })
})
