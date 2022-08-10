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

    it('Index route should be defined', async () => {
        expect(store.showAllUsers).toBeDefined
    })

    it('Should show a single user', async () => {
        const result = await store.showUser(1)
        expect(!!result).toBe(true)
})
})