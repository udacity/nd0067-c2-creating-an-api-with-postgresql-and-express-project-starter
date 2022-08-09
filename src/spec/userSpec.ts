import { User, UserStore } from '../models/usersModel'
import bcrypt from 'bcrypt'
import { env } from 'process'

const store = new UserStore

describe('User Store Functionality', () => {
    beforeAll(async function() {
        await store.truncateUser();
    })

    it('Index route should be defined', async () => {
        expect(store.showAllUsers).toBeDefined
    })

    it('Should create a new user', async () => {
        const result = await store.createUser({
            first_name: 'Danny',
            last_name: 'Dannyson',
            pass_word: 'Jimothy123'
        })
        expect(!!result).toBe(true)
        const userField = Object.keys(result)
        expect(userField.length).toBe(4)
    })

    it('Should show a single user', async () => {
        const result = await store.showUser(1)
        expect(!!result).toBe(true)
})
})