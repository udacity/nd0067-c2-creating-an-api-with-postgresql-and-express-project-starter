import {UserStore} from "../models/userModel";

const store = new UserStore();

describe('User model', () => {
    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toContain({
            "id": 1,
            "firstname": "matt",
            "lastname": "richards",
            "password": "1234"
        });
    });

    it('single method should return a user', async () => {
        const result = await store.single(1);
        expect(result).toContain({
            "id": 1,
            "firstname": "matt",
            "lastname": "richards",
            "password": "1234"
        });
    });

    it('create method should return a count of 1', async () => {
        const result = await store.create('tucker', 'richards', '1234');
        expect(result).toBeDefined();
    });
});