import request from 'supertest';
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.a5qO7LWsBmWNZmQHVV-FsqA4g6Vf_4VxmlbOh0MDxHM';

describe('Product Handler', () => {
  it('expect to return created product', async () => {
    await request('http://127.0.0.1:3000')
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
      await request('http://127.0.0.1:3000')
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
      await request('http://127.0.0.1:3000')
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
