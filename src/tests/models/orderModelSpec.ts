import { Order, OrderModel } from "../../models/orderModel";
import { Product, ProductModel } from "../../models/productModel";
import { User, UserModel } from "../../models/userModel";

describe("Suite for order model:", (): void => {
  // beforeAll(() => {
  //   client.connect();
  // });

  const newProduct = {
    name: "ball",
    price: 100,
    category: "play",
  };
  const newUser = {
    firstname: "ahmed",
    lastname: "hisham",
    hash: "passwordHash",
  };

  const { firstname, lastname } = newUser;
  const { name, price, category } = newProduct;

  it("test order model methods: ", async (): Promise<void> => {
    const userCreated = await new UserModel().create(newUser);
    const order = {
      userId: (userCreated as User).id,
    };
    //test for create method
    const createResult = await new OrderModel().create(order as Order);
    //index method
    const indexResult = await new OrderModel().getOrdersByUserId(
      (userCreated as User).id!.toString()
    );
    //completed orders by userId
    const completedOrders = await new OrderModel().getCompletedOrdersByUserId(
      (userCreated as User).id as number
    );
    expect(createResult).toEqual(
      jasmine.objectContaining({ userId: (userCreated as User).id })
    );
    expect((indexResult as Order[])[0]).toEqual(
      jasmine.objectContaining({ userId: (userCreated as User).id })
    );
    expect((completedOrders as Order[])[0]).toEqual(
      jasmine.objectContaining({ orderId: (createResult as Order).id })
    );
  });
});
