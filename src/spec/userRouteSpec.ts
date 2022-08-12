import supertest from "supertest"
import app from "../server"
import { UserStore } from "../models/usersModel"

const server = supertest(app)
const store = new UserStore

describe('Endpoint Test', () => {
    it('Responds with 401 for index without token', async () => {
        const response = await server.get('/users/')
        expect(response.status).toBe(401)
    })

    it('Responds status 401 for GET without token', async () => {
        await store.createUser({
            user_id: 1,
            first_name: 'Testy',
            last_name: 'McTesterson',
            pass_word: 'Jimothy123'
        })
        const response = await server.get('/users/1')
        expect(response.status).toBe(401)
    })

})