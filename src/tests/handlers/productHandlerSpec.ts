import client from "../../db/db";
import request from "supertest";
import app from "../../server";
import { createToken } from "../../utilities/authentication";

describe("Suite for products endpoints:", (): void => {
  // beforeAll(() => {
  //   client.connect();
  // });

  const newProduct = {
    name: "ball",
    price: 100,
    category: "play",
  };

  it("create product: POST products/create", async (): Promise<void> => {
    const token = createToken(1);
    const response = await request(app)
      .post("/products/create")
      .set("authorization", `Bearer ${token}`)
      .send(newProduct);
    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
  });

  it("create product: POST products/create", async (): Promise<void> => {
    const token = createToken(1);
    const response = await request(app)
      .post("/products/create")
      .set("authorization", `Bearer ${token}`)
      .send(newProduct);
    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
  });

  it("All products: GET /products/index", async (): Promise<void> => {
    //to make this test independent from the above test
    const response = await request(app).get("/products/index");
    // console.log(response.body)
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });

  it("Get one product: GET /products/show/:productId", async (): Promise<void> => {
    //we need a token to create the product, then we could test show product with the id created
    const token = createToken(1);
    const response1 = await request(app)
      .post("/products/create")
      .set("authorization", `Bearer ${token}`)
      .send(newProduct);
    const response = await request(app).get(
      `/products/show/${response1.body.id}`
    );
    // console.log(response.body)
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(response1.body.id);
  });

  it("Get one product by category: GET /products/categories/:category", async (): Promise<void> => {
    //we need a token to create the product, then we could test show product with the id created
    const token = createToken(1);
    const response1 = await request(app)
      .post("/products/create")
      .set("authorization", `Bearer ${token}`)
      .send(newProduct);
    const response = await request(app).get(
      `/products/categories/${response1.body.category}`
    );
    // console.log(response.body)
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });
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
