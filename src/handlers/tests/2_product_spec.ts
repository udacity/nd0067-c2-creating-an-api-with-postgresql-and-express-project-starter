import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.a5qO7LWsBmWNZmQHVV-FsqA4g6Vf_4VxmlbOh0MDxHM';

describe('Product Handler', () => {
  it('expect to return created product', async () => {
    await request
      .post('/products')
      .send({
        name: 'Product Name',
        price: 10,
        category: 'cat1',
      })
      .set({Authorization: token})
      .expect(200)
      .expect({
        id: 1,
        name: 'Product Name',
        price: 10,
        category: 'cat1',
      });
  }),
    it('expect to return list of products', async () => {
      await request
        .get('/products')
        .expect(200)
        .expect([
          {
            id: 1,
            name: 'Product Name',
            price: 10,
            category: 'cat1',
          },
        ]);
    }),
    it('expect to return product with ID', async () => {
      await request
        .get('/products/1')
        .expect(200)
        .expect({
          id: 1,
          name: 'Product Name',
          price: 10,
          category: 'cat1',
        });
    });
});
