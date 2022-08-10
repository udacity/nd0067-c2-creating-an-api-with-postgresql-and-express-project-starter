import supertest from "supertest"
import app from "../server"
import { OrderStore } from "../models/ordersModel"

const server = supertest(app)
const store = new OrderStore

describe('Endpoint Test', () => {
    it('Responds with 404 for index', async () => {
        const response = await server.get('/orders/')
        expect(response.status).toBe(404)
    })

    it('Responds status 200 for GET on existing order', async () => {
        await store.createOrder({
            order_id: 1,
            product_id: 10,
            quantity: 10,
            user_id: 10,
        })
        const response = await server.get('/orders/1')
        expect(response.status).toBe(200)
    })

})