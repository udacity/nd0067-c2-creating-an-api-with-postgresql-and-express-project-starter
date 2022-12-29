import { User, UserModel } from "../../models/user.model"

const model = new UserModel

describe('User Model', () => {
    it('index should exist',() => {
        expect(model.index).toBeDefined()
    })
    it('create should exist',() => {
        expect(model.create).toBeDefined()
    })
    it('show should exist',() => {
        expect(model.show).toBeDefined()
    })

})