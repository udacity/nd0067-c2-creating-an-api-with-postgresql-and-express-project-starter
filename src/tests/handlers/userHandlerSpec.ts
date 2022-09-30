import client from "../../db/db";
import request from "supertest";
import app from "../../server";
import { createToken } from "../../utilities/authentication";

describe("Suite for users endpoints:", (): void => {
  // beforeAll(() => {
  //   client.connect();
  // });
  const newUser = {
    firstname: "ahmed",
    lastname: "hisham",
    password: "password123",
  };

  it("create user: POST users/signup", async (): Promise<void> => {
    const response = await request(app).post("/users/signup").send(newUser);
    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
  });

  it("User login: POST users/login", async (): Promise<void> => {
    //to make this test independent from the above test
    const response1 = await request(app).post("/users/signup").send(newUser);
    const userLoginData = {
      userId: response1.body.id,
      password: "password123",
    };
    const response = await request(app)
      .post("/users/login")
      .send(userLoginData);
    // console.log(response.body)
    expect(response.status).toEqual(200);
    expect(response.body.accessToken).toBeDefined();
  });

  it("All users: GET users/index", async (): Promise<void> => {
    const userId = 1;
    const token = createToken(userId);
    const response = await request(app)
      .get("/users/index")
      .set("authorization", `Bearer ${token}`);
    // console.log(response.body)
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });

  it("get one user: GET users/show/:userId", async (): Promise<void> => {
    const response1 = await request(app).post("/users/signup").send(newUser);
    const userId = response1.body.id;
    const token = createToken(userId);
    const response = await request(app)
      .get(`/users/show/${response1.body.id}`)
      .set("authorization", `Bearer ${token}`);
    // console.log(response.body)
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });
});
