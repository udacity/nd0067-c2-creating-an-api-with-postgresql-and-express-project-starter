import supertest from "supertest";
import {app} from "../server";

const request = supertest(app);

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGF2aWQiLCJpYXQiOjE2Njk3NDMxMjd9.XISGVLkut860DV-5-pNjwXkPjIIksaiC8ZuJWmd3fkc';
describe('test product route', () => {
    it('should return all products', async () => {
        const resp = await request
            .get('/products')
            .expect(200);
    });

    it('should return a specific product', async () => {
        const resp = await request
            .get('/products/show?id=1')
            .expect(200);
    });

    it('should create the passed product', async () => {
        const product = {
            name: 'earbuds',
            price: 34
        }

        const resp = await request
            .post('/products')
            .set('Authorization', token)
            .send(product)
            .expect(200);
    });
})