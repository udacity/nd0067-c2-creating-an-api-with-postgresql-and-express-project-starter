import request from 'supertest';
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.a5qO7LWsBmWNZmQHVV-FsqA4g6Vf_4VxmlbOh0MDxHM';

describe('User Handler', () => {
  it('expect to return created user', async () => {
    await request('http://127.0.0.1:3000')
      .post('/users')
      .send({
        first_name: 'First Name',
        last_name: 'Last Name',
        login_name: 'Login Name',
        password: 'Password',
      })
      .set({Authorization: token})
      .expect(200)
      .expect({
        id: 1,
        first_name: 'First Name',
        last_name: 'Last Name',
        login_name: 'Login Name',
      });
  }),
    it('expect to return list of users', async () => {
      await request('http://127.0.0.1:3000')
        .get('/users')
        .set({Authorization: token})
        .expect(200)
        .expect([
          {
            id: 1,
            first_name: 'First Name',
            last_name: 'Last Name',
            login_name: 'Login Name',
          },
        ]);
    }),
    it('expect to return user with ID', async () => {
      await request('http://127.0.0.1:3000')
        .get('/users/1')
        .set({Authorization: token})
        .expect(200)
        .expect({
          id: 1,
          first_name: 'First Name',
          last_name: 'Last Name',
          login_name: 'Login Name',
        });
    });
});
