import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.a5qO7LWsBmWNZmQHVV-FsqA4g6Vf_4VxmlbOh0MDxHM';

describe('Order Handler', () => {
  it('expect to return created order', async () => {
    await request
      .post('/orders')
      .send({
        status: 'active',
        user_id: '1',
      })
      .set({Authorization: token})
      .expect(200)
      .expect({
        id: 1,
        status: 'active',
        user_id: '1',
      });
  }),
    it('expect to return current order by user', async () => {
      await request
        .get('/orderByUser/1')
        .set({Authorization: token})
        .expect(200)
        .expect({
          id: 1,
          status: 'active',
          user_id: '1',
        });
    });
});
