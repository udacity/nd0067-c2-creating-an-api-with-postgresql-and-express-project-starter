import supertest from "supertest"
import app from "../server"
import { ProductStore } from "../models/productsModel"

const server = supertest(app)
const store = new ProductStore

describe('Endpoint Test', () => {
    it('Responds with 200 for index', async () => {
        const response = await server.get('/products/')
        expect(response.status).toBe(200)
    })

    it('throws if GET on non-existent product', async () => {
        expect(await server.get('/products/10')).toThrow
    })

    it('Responds status 200 for GET on existing product', async () => {
        await store.createProduct({
            product_id: 1,
            name: "Wrench",
            price: 10.99,
            category: "Tools"
        })
        const response = await server.get('/products/1')
        expect(response.status).toBe(200)
    })

    it('Responds with status 200', async () => {
        const response = await server.post('/products/')
        expect(response.status).toBe(200)
    })
})