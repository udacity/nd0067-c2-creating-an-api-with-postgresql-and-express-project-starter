import supertest from "supertest";
import {app} from "../server";

const request = supertest(app);

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGF2aWQiLCJpYXQiOjE2Njk3NDMxMjd9.XISGVLkut860DV-5-pNjwXkPjIIksaiC8ZuJWmd3fkc';
describe('test user route', () => {
    it('should return all products', async () => {
        const resp = await request
            .get('/users')
            .set('Authorization', token)
            .expect(200);
    });

    it('should return a specific user', async () => {
        const resp = await request
            .get('/users/show?id=1')
            .set('Authorization', token)
            .expect(200);
    });

    it('should create the passed user', async () => {
        const user = {
            firstname: 'tucker',
            lastname: 'richards',
            password: '1234'
        }

        const resp = await request
            .post('/users')
            .set('Authorization', token)
            .send(user)
            .expect(200);
    });
});