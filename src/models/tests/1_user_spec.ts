import {MyUserStore} from '../user';

const store = new MyUserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('create method should add a user', async () => {
    console.log('------------ user create');
    const result = await store.create(
      {
        first_name: 'First Name',
        last_name: 'Last Name',
        login_name: 'Login Name',
      },
      'Password'
    );
    expect(result).toEqual({
      id: 2,
      first_name: 'First Name',
      last_name: 'Last Name',
      login_name: 'Login Name',
    });
  });

  it('index method should return a list of users', async () => {
    console.log('------------ user index');
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        first_name: 'First Name',
        last_name: 'Last Name',
        login_name: 'Login Name',
      },
      {
        id: 2,
        first_name: 'First Name',
        last_name: 'Last Name',
        login_name: 'Login Name',
      },
    ]);
  });

  it('show method should return the correct user', async () => {
    console.log('------------ user show');
    const result = await store.show('2');

    expect(result).toEqual({
      id: 2,
      first_name: 'First Name',
      last_name: 'Last Name',
      login_name: 'Login Name',
    });
  });
});
