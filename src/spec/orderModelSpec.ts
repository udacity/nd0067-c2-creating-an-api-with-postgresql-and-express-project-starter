import {Order, OrderStore} from '../models/ordersModel'
import { UserStore } from '../models/usersModel'
import { ProductStore } from '../models/productsModel'

const o_store = new OrderStore
const p_store = new ProductStore
const u_store = new UserStore

describe('Order Store Functionality', () => {
    beforeEach(async function () {
        await o_store.truncateOrder(),
        await p_store.truncateProduct(),
        await u_store.truncateUser(),
        await p_store.createProduct({
            product_id: 10,
            name: "Order Test Product",
            price: 99.99,
            category: "Tools"
        }),
        await u_store.createUser({
            user_id: 10,
            first_name: 'Order Test User',
            last_name: 'Orderson',
            pass_word: "Jimothy123"
        })
    })

    it('Should add a new order', async () => {
        const newOrder = {
            order_id: 1,
            product_id: 10,
            quantity: 18,
            user_id: 10
        }
        const result = await o_store.createOrder(newOrder)
        expect(result[0]).toEqual({
            id: 1,
            order_id: 1,
            product_id: 1,
            quantity: 18,
            user_id: 1
        })
    })

    it('Should return a single order', async () => {
        const newOrder = {
            order_id: 1,
            product_id: 10,
            quantity: 18,
            user_id: 10
        }
        await o_store.createOrder(newOrder)
        const result = await o_store.showOrder(newOrder.order_id)
        expect(!!result).toBe(true)
    })

    it('Should return orders organized by userID', async () => {
        const newOrder = {
            order_id: 1,
            product_id: 10,
            quantity: 18,
            user_id: 10
        }
        await o_store.createOrder(newOrder)
        const result = await o_store.showOrderByUser(1)
        expect(result[0]).toEqual({
            id: 1,
            order_id: 1,
            product_id: 1,
            quantity: 18,
            user_id: 1
        })
    })
})
