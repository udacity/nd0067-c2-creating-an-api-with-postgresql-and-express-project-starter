import { User, UserStore } from '../user'

const userStore = new UserStore()

beforeAll(async () => {
  await userStore.create({
    first_name: 'Test',
    last_name: '1',
    email: 'test1@test.com',
    password: '1234'
  })
})

describe('User Model', () => {
  it('create method should add a user', async () => {
    const user: User = await userStore.create({
      first_name: 'Test',
      last_name: '1',
      email: 'test1@test.com',
      password: '1234'
    })
    expect(user).toEqual({
      id: user.id,
      first_name: 'Test',
      last_name: '1',
      email: 'test1@test.com',
      password: user.password
    })
  })

  it('get method should return a list of users', async () => {
    const user: User = await userStore.create({
      first_name: 'Test',
      last_name: '2',
      email: 'test2@test.com',
      password: '1234'
    })
    const result = await userStore.index()
    expect(result).toContain({
      id: user.id,
      first_name: 'Test',
      last_name: '2',
      email: 'test2@test.com'
    })
  })

  it('show method should return the correct user', async () => {
    const user: User = await userStore.create({
      first_name: 'Test',
      last_name: '3',
      email: 'test3@test.com',
      password: '1234'
    })
    const result = await userStore.show(user.id)
    expect(result).toEqual({
      id: user.id,
      first_name: 'Test',
      last_name: '3',
      email: 'test3@test.com'
    })
  })
})
