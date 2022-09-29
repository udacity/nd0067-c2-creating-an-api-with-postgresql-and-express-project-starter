"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../models/userModel");
describe("Suite for user model:", () => {
    const newUser = {
        firstname: "ahmed",
        lastname: "hisham",
        hash: "passwordHash",
    };
    const { firstname, lastname } = newUser;
    it("test user model methods: ", async () => {
        //test for create method
        const createResult = await new userModel_1.UserModel().create(newUser);
        //index method
        const indexResult = await new userModel_1.UserModel().index();
        //show method
        const showResult = await new userModel_1.UserModel().show((createResult.id).toString());
        expect(createResult).toEqual(jasmine.objectContaining({ firstname, lastname }));
        expect(indexResult[0]).toEqual(jasmine.objectContaining({ firstname, lastname }));
        expect((showResult)).toEqual(jasmine.objectContaining({ firstname, lastname }));
    });
});
