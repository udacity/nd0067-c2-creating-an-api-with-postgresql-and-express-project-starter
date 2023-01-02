import { Order, MyOrderStore } from '../order';

const store = new MyOrderStore()

describe("Order Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a get current user order method', () => {
    expect(store.currentUserOrder).toBeDefined();
  });


  it('create method should add an order', async () => {
    console.log('------------ order create');
    const result = await store.create({
        status: 'active',
        user_id: "1"
    });
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: "1"
    });
  });

  it('index method should return a list of orders', async () => {
    console.log('------------ order index');
    const result = await store.index();
    expect(result).toEqual([{
        id: 1,
        status: 'active',
        user_id: "1"
    }]);
  });

  it('show method should return the correct Order', async () => {
    console.log('------------ order show');
    const result = await store.show("1");
    expect(result).toEqual({
        id: 1,
        status: 'active',
        user_id: '1'
    });
  });

  it('show method should return current order by user', async () => {
    console.log('------------ order by user');
    const result = await store.currentUserOrder("1");
    expect(result).toEqual({
        id: 1,
        status: 'active',
        user_id: '1'
    });
  });



});