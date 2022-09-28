import client from "../../db/db";
import request from "supertest";
import app from "../../server";

describe("Suite for users endpoints:", (): void => {
  beforeAll(() => {
    client.connect();
  });
  //this will be passed to the second test
  it("create user: POST users/signup", async  ():Promise<void> => {
    const newUser = {
       firstname: 'ahmed',
       lastname: 'hisham',
       password: 'password123' 
    };
    const response = await request(app).post("/users/signup").send(newUser);
    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
  });

  it("User login: POST users/login", async  ():Promise<void> => {
    const newUser = {
        userId: 1,
       password: 'password123' 
    };
    const response = await request(app).post("/users/login").send(newUser);
    // console.log(response.body)
    expect(response.status).toEqual(200);
    expect(response.body.accessToken).toBeDefined();
  });

  afterAll(() => {
    client.end();
  });
}); 
