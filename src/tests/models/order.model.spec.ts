import { Order,OrderStatus ,OrderModel } from "../../models/order.model"

const model = new OrderModel

describe('Order Model', () => {
    it('index should exist',() => {
        expect(model.index).toBeDefined()
    })
    it('create should exist',() => {
        expect(model.create).toBeDefined()
    })
    it('show should exist',() => {
        expect(model.show).toBeDefined()
    })

    it('should add one record on create',async () => {
        const countBefore =  (await model.index()).length
        await model.create({
            product_id: 1,
            user_id: 1,
            quantity: 50,
            status: OrderStatus.ACTIVE,
            id: 0
        })
        const countAfter = (await model.index()).length
        expect(countAfter).toEqual(countBefore+1)
    })
    it('index should return items',async () => {
        await model.create({
            product_id: 1,
            user_id: 1,
            quantity: 20,
            status: OrderStatus.COMPLETED,
            id: 0
        })
        const countBefore =  (await model.index()).length
        expect(countBefore).toBeGreaterThan(0)
    })
    
    it('should have active order for given user',async () => {
        await model.create({
            product_id: 1,
            user_id: 1,
            quantity: 50,
            status: OrderStatus.ACTIVE,
            id: 0
        })
        const countData =  (await model.currentOrdersByUser(1)).length
        
        expect(countData).toBeGreaterThan(0);
    })
    it('should have active order for given user',async () => {
        await model.create({
            product_id: 1,
            user_id: 1,
            quantity: 10,
            status: OrderStatus.COMPLETED,
            id: 0
        })
        await model.create({
            product_id: 2,
            user_id: 1,
            quantity: 5,
            status: OrderStatus.COMPLETED,
            id: 0
        })
        const countData =  (await model.completedOrdersByUser(1)).length
        
        expect(countData).toBeGreaterThan(0);
    })

})