import { Product, ProductModel } from "../../models/product.model"

const model = new ProductModel

describe('Product Model', () => {

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
            name: 'P',
            category: 'Cat',
            price: 520,
            id: 0
        })
        const countAfter = (await model.index()).length
        expect(countAfter).toEqual(countBefore+1)
    })


})