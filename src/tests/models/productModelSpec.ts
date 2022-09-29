import { Product, ProductModel } from "../../models/productModel";

describe("Suite for product model:",  (): void => {
  // beforeAll(() => {
  //   client.connect();
  // });
  
  const newProduct = {
    name: "ball",
    price: 100,
    category: 'play'
  };
  const newUser = {
    firstname: "ahmed",
    lastname: "hisham",
    hash: "passwordHash",
  };

  const { firstname, lastname} = newUser
  const { name, price, category} = newProduct

  it("test product model methods: ", async (): Promise<void> => {
    //test for create method
    const createResult = await new ProductModel().create(newProduct);
    //index method
    const indexResult = await new ProductModel().index();
    //show method
    const showResult = await new ProductModel().show(((createResult as Product).id)!.toString());
    expect(createResult).toEqual(jasmine.objectContaining({name, price, category}));
    expect((indexResult as Product[])[0]).toEqual(jasmine.objectContaining({name, price, category}));
    expect((showResult)).toEqual(jasmine.objectContaining({name, price, category}));
  });

});