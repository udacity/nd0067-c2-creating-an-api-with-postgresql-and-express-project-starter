import { Order, OrderModel, OrderWithProducts } from "../../models/orderModel";
import { OrdersProductsModel, ProductsOrdersType } from "../../models/ordersProductsModel";
import { Product, ProductModel } from "../../models/productModel";
import { User, UserModel } from "../../models/userModel";

describe("Suite for orders_products model:", (): void => {
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

  it("test orders_products model methods: ", async (): Promise<void> => {
    const userCreated = await new UserModel().create(newUser);
    const order = {
      userId: (userCreated as User).id,
    };
    //test for create method
    const orderCreated = await new OrderModel().create(order as Order);
    const productCreated = await new ProductModel().create(newProduct);
    const addProductObj = {
      productId: (productCreated as Product).id as number,
      orderId: (orderCreated as Order).id as number,
      quantity: 20,
    };
    const relationInstance = await new OrdersProductsModel().create(
      addProductObj
    );

    const indexResult = await new OrderModel().getOrdersByUserId(
      (userCreated as User).id!.toString()
    );
    // console.log("indexResult", indexResult);
    //completed orders by userId
    const completedOrders = await new OrderModel().getCompletedOrdersByUserId(
      (userCreated as User).id as number
    );
    // console.log("completedOrders", completedOrders);
    expect((relationInstance as ProductsOrdersType).quantity).toEqual(addProductObj.quantity);
  });
});
