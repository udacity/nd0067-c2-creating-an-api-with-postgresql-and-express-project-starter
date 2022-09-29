"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../../models/productModel");
describe("Suite for product model:", () => {
    // beforeAll(() => {
    //   client.connect();
    // });
    const newProduct = {
        name: "ball",
        price: 100,
        category: 'play'
    };
    const newUser = {
        firstname: "ahmed",
        lastname: "hisham",
        hash: "passwordHash",
    };
    const { firstname, lastname } = newUser;
    const { name, price, category } = newProduct;
    it("test product model methods: ", async () => {
        //test for create method
        const createResult = await new productModel_1.ProductModel().create(newProduct);
        //index method
        const indexResult = await new productModel_1.ProductModel().index();
        //show method
        const showResult = await new productModel_1.ProductModel().show((createResult.id).toString());
        expect(createResult).toEqual(jasmine.objectContaining({ name, price, category }));
        expect(indexResult[0]).toEqual(jasmine.objectContaining({ name, price, category }));
        expect((showResult)).toEqual(jasmine.objectContaining({ name, price, category }));
    });
});
