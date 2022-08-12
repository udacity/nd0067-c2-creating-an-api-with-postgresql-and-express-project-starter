import supertest from "supertest"
import app from "../server"
import { OrderStore } from "../models/ordersModel"

const server = supertest(app)
const store = new OrderStore

describe('Endpoint Test', () => {
    it('GET responds with 404 when no orders present', async () => {
        const response = await server.get('/orders/')
        expect(response.status).toBe(404)
    })

    it('GET orderbyID responds status 200', async () => {
        const response = await server.get('/orders/1')
        expect(response.status).toBe(200)
    })

    it('Order by Product should status 200', async () => {
        const response = await server.get('/orders/product/1')
        expect(response.status).toBe(200)
    })

    it('Order by User should status 401 without token', async () => {
        const response = await server.get('/orders/user/1')
        expect(response.status).toBe(401)
    })

    it('DELETE 404s when called on non-existing order', async () => {
        const response = await server.delete('/orders/1')
        expect(response.status).toBe(404)
    })

    it('Post responds with 401 if no token', async () => {
        const response = await server.post('/orders/')
        expect(response.status).toBe(401)
    })

})