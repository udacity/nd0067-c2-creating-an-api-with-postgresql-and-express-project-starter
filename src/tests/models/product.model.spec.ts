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
    it('index should return items',async () => {
        const countBefore =  (await model.index()).length
        expect(countBefore).toBeGreaterThan(0)
    })
    it('should update one record on update',async () => {
        let data = await model.get_last();

        // Lets change the data name
        data.name = "ESCARGOT";
        let new_product = await model.edit(data.id,data);
        
        
        expect(new_product.name).toEqual("ESCARGOT");
    })
    it('should delete one record on delete',async () => {
        const countBefore =  (await model.index()).length
        let data = await model.get_last();
        await model.delete(data.id);
        
        const countAfter = (await model.index()).length
        expect(countAfter).toEqual(countBefore-1);
    })


})