import { User, UserStore } from '../models/usersModel'
import bcrypt from 'bcrypt'
import { env } from 'process'

const store = new UserStore

describe('User Store Functionality', () => {
    beforeEach(async function() {
        await store.truncateUser();
        await store.createUser({
            user_id: 1,
            first_name: 'userSpec',
            last_name: 'testUser',
            pass_word: 'Jimothy123'
        })
    })

    it('showAllUsers (index) route should be defined', async () => {
        expect(store.showAllUsers).toBeDefined
    })

    it('showUser hould show a single user', async () => {
        const result = await store.showUser(1)
        expect(!!result).toBe(true)
    })

    it('truncateUser should reset the table identity', async () => {
        await store.truncateUser()
        expect(await store.showUser(1)).toThrow
      })
})