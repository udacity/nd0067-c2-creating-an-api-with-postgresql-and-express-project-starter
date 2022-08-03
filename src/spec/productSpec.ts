import { Product, ProductStore } from '../models/productsModel';

const store = new ProductStore()

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a Product', async () => {
    const result = await store.create({
      name: 'Wrench',
      price: 11.99,
      category: 'Tools'
    });
    expect(result[0]).toEqual({
      name: 'Wrench',
      price: 11.99,
      category: 'Tools'
    });
  });

//   it('index method should return a list of books', async () => {
//     const result = await store.index();
//     expect(result).toEqual([{
//       id: "1",
//       title: 'Bridge to Terabithia',
//       totalPages: 250,
//       author: 'Katherine Paterson',
//       summary: 'Childrens'
//     }]);
//   });

//   it('show method should return the correct book', async () => {
//     const result = await store.show("1");
//     expect(result).toEqual({
//       id: "1",
//       title: 'Bridge to Terabithia',
//       totalPages: 250,
//       author: 'Katherine Paterson',
//       summary: 'Childrens'
//     });
//   });

});