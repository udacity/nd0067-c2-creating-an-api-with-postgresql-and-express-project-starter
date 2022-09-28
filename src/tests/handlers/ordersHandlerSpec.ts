import client from "../../db/db";
import request from "supertest";
import app from "../../server";
import { createToken } from "../../utilities/authentication";
import { User, UserModel } from "../../models/userModel";
import { NewLineKind } from "typescript";
import { Product, ProductModel } from "../../models/productModel";
import { Order, OrderModel } from "../../models/orderModel";

describe("Suite for orders endpoints:", (): void => {
  const newProduct = {
    name: "ball",
    price: 100,
    category: "play",
  };
  const newUser = {
    firstname: "ahmed",
    lastname: "hisham",
    hash: "password123",
  };

  //to make of orders shorter I will run them all in one spec
  it("create order: POST orders/create", async (): Promise<void> => {
    //create a user to create an order
    const user = await new UserModel().create(newUser);
    const token = createToken((user as User).id as number);
    const response = await request(app)
      .post("/orders/create")
      .set("authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual("active");
  });

  it("get order for a user: GET /orders/get-orders-for-user", async (): Promise<void> => {
    //create a user to create an order
    const user = await new UserModel().create(newUser);
    const order = await new OrderModel().create({
      userId: (user as User).id as number,
    });
    const token = createToken((user as User).id as number);
    const response = await request(app)
      .get("/orders/get-orders-for-user")
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });

  it("[extra] set status of an order: POST /orders/set-status", async (): Promise<void> => {
    //create a user to create an order
    const user = await new UserModel().create(newUser);
    const order = await new OrderModel().create({
      userId: (user as User).id as number,
    });
    const token = createToken((user as User).id as number);
    const response = await request(app)
      .post("/orders/set-status")
      .set("authorization", `Bearer ${token}`)
      .send({ orderId: (order as Order).id, status: "complete" });
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });

  it("[optional] get complete orders: GET /orders/complete", async (): Promise<void> => {
    //create a user to create an order
    const user = await new UserModel().create(newUser);
    const order = await new OrderModel().create({
      userId: (user as User).id as number,
    });
    const token = createToken((user as User).id as number);
    const response = await request(app)
      .get("/orders/complete")
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it("Add product to order: POST /orders/addproduct", async (): Promise<void> => {
    //create a user to create an order
    const user = await new UserModel().create(newUser);
    const order = await new OrderModel().create({
      userId: (user as User).id as number,
    });
    const product = await new ProductModel().create(newProduct);
    const token = createToken((user as User).id as number);
    // console.log({
    //     productId: (product as Product).id,
    //     orderId: (order as Order).id,
    //     quantity: 2,
    //   })
    const response = await request(app)
      .post("/orders/addproduct")
      .set("authorization", `Bearer ${token}`)
      .send({
        productId: (product as Product).id,
        orderId: (order as Order).id,
        quantity: 2,
      });
      // console.log(response.body)
    expect(response.status).toEqual(200);
    expect(response.body.orderid).toEqual((order as Order).id);
  });
  // it("All products: GET /products/index", async (): Promise<void> => {
  //   //to make this test independent from the above test
  //   const product = new ProductModel().create(newProduct)
  //   const response = await request(app)
  //     .get("/products/index")
  //   // console.log(response.body)
  //   expect(response.status).toEqual(200);
  //   expect(response.body).toBeDefined();
  // });

  // it("Get one product: GET /products/show/:productId", async (): Promise<void> => {
  //   //we need a token to create the product, then we could test show product with the id created
  //   const token = createToken(1)
  //   const response1 = await request(app).post("/products/create").set('authorization', `Bearer ${token}`).send(newProduct);
  //   const response = await request(app)
  //     .get(`/products/show/${response1.body.id}`)
  //   // console.log(response.body)
  //   expect(response.status).toEqual(200);
  //   expect(response.body.id).toEqual(response1.body.id);
  // });

  // it("Get one product by category: GET /products/categories/:category", async (): Promise<void> => {
  //   //we need a token to create the product, then we could test show product with the id created
  //   const token = createToken(1)
  //   const response1 = await request(app).post("/products/create").set('authorization', `Bearer ${token}`).send(newProduct);
  //   const response = await request(app)
  //     .get(`/products/categories/${response1.body.category}`)
  //   // console.log(response.body)
  //   expect(response.status).toEqual(200);
  //   expect(response.body).toBeDefined();
  // });
  //   it("get one user: GET users/show/:userId", async (): Promise<void> => {
  //     const response1 = await request(app).post("/users/signup").send(newUser);
  //     const userId = response1.body.id;
  //     const token = createToken(userId);
  //     const response = await request(app)
  //       .get(`/users/show/${response1.body.id}`)
  //       .set("authorization", `Bearer ${token}`);
  //     // console.log(response.body)
  //     expect(response.status).toEqual(200);
  //     expect(response.body).toBeDefined();
  //   });
});
