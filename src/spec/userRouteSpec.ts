import supertest from "supertest"
import app from "../server"
import { UserStore } from "../models/usersModel"

const server = supertest(app)
const store = new UserStore

describe('Endpoint Test', () => {
    it('Responds with 200 for index', async () => {
        const response = await server.get('/users/')
        expect(response.status).toBe(200)
    })

    it('Responds status 200 for GET on existing user', async () => {
        await store.createUser({
            user_id: 1,
            first_name: 'Testy',
            last_name: 'McTesterson',
            pass_word: 'Jimothy123'
        })
        const response = await server.get('/users/1')
        expect(response.status).toBe(200)
    })

})