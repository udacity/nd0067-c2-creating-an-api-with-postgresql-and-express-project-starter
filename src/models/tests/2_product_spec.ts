import {MyProductStore} from '../product';

const store = new MyProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have filter method', () => {
    expect(store.filter).toBeDefined();
  });

  it('create method should add a product', async () => {
    console.log('------------ product create');
    const result = await store.create({
      name: 'Product Name',
      price: 10,
      category: 'cat1',
    });
    expect(result).toEqual({
      id: 2,
      name: 'Product Name',
      price: 10,
      category: 'cat1',
    });
  });
});

describe('Product Model 2', () => {
  it('index method should return a list of products', async () => {
    const result = await store.index();
    console.log('------------ product index');
    expect(result).toEqual([
      {
        id: 1,
        name: 'Product Name',
        price: 10,
        category: 'cat1',
      },
      {
        id: 2,
        name: 'Product Name',
        price: 10,
        category: 'cat1',
      },
    ]);
  });

  it('show method should return the correct product', async () => {
    console.log('------------ product show');
    const result = await store.show('2');
    expect(result).toEqual({
      id: 2,
      name: 'Product Name',
      price: 10,
      category: 'cat1',
    });
  });
});
